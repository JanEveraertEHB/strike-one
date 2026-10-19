import express, { Request, Response } from "express";

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
  res.send(items)
});

app.post("/api/footage", (req: Request , res: Response) => {
  const footageInstance = {
    eventName: req.body.eventName,
    eventDate: req.body.eventDate, 
    footageURI: req.body.footageURI
  };
  items.push(footageInstance);
  res.send({message: "OK"})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
