import express, { Request, Response } from "express";
import knex from 'knex'
import knexfile from './knexfile.js'


const db = knex(knexfile);


const app = express()
const port = 3000

type Footage = {
  eventName: String,
  eventDate: String,
  footageURI:  String
}
const items: Footage[] = [];

app.use(express.json())

app.use(express.static('public'));

app.get("/api/footage",  (req: Request , res: Response) => {

  db.select("*").table("footage").where({archived: false}).then((data) => {
    res.send(data);
  }).catch((e) => {
    console.log(e)
    res.status(500).send()
  })

});

app.patch("/api/footage/:id", (req: Request , res: Response) => {
    const requestBody = req.body;
    const id = req.params.id;

    console.log(id, requestBody);
    db.update(requestBody).where({ id: id}).table("footage").then((data) => {
      console.log(data);
      res.send(201)
    }).catch((e) => {
      res.status(500).send(e)
    })
})
app.post("/api/footage", (req: Request , res: Response) => {
  const footageInstance = {
    eventName: req.body.eventName,
    eventDate: req.body.eventDate, 
    footageURI: req.body.footageURI,
  };

  db.insert(footageInstance).table("footage").returning("*").then((data) => {
    res.send(data);
  }).catch((e) => {
    res.status(500).send()
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
