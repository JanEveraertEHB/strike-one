import express, { Request, Response } from "express";
import knex from "knex";
import knexfile from "./knexfile.js";

const db = knex(knexfile);

const app = express();
const port = 3000;

// parse JSON request bodies into req.body
app.use(express.json());

// serve the frontend (index.html, script.js, ...) from the public folder
app.use(express.static("public"));

// GET all footage that is not archived
app.get("/api/footage", (req: Request, res: Response) => {
  db.select("*").table("footage").where({ archived: false })
    .then((data) => {
      res.send(data);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send();
    });
});

// POST a new footage item
app.post("/api/footage", (req: Request, res: Response) => {
  const footageInstance = {
    eventName: req.body.eventName,
    eventDate: req.body.eventDate,
    footageURI: req.body.footageURI,
  };

  db.insert(footageInstance).table("footage").returning("*")
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send();
    });
});

// PATCH (partially update) one footage item, e.g. to archive it
app.patch("/api/footage/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  // only pick the fields we allow to be changed, never pass req.body straight to the database
  const changes = {
    archived: req.body.archived,
  };

  db.update(changes).table("footage").where({ id: id })
    .then((updatedRows) => {
      res.send({ updated: updatedRows });
    })
    .catch((e) => {
      console.error(e);
      res.status(500).send();
    });
});

app.listen(port, () => {
  console.log(`Strike one is running on http://localhost:${port}`);
});
