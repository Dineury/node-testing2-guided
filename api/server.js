const express = require("express");

const Hobbits = require("./hobbits/hobbits-model.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/hobbits", (req, res) => {
  Hobbits.getAll()
    .then(hobbits => {
      res.status(200).json(hobbits);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.get("/hobbits/:id", async  (req, res) => {
 const hobi = await Hobbits.getById(req.params.id)
  res.json(hobi)
});

server.post("/hobbits", async (req, res) => {
  res.status(201).json(await Hobbits.insert(req.body))
});

server.delete("/hobbits/:id", async (req, res) => {
  await Hobbits.remove(req.params.id)
  res.json(await Hobbits.getAll())
});

server.put("/hobbits/:id", async (req, res) => {
  await Hobbits.update(req.params.id, req.body)
  res.json(await Hobbits.getById(req.params.id))
});

module.exports = server;
