const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const DeckModel = require("./Schema/Deck");
const app = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("WelcomeBoy to the API new");
});

// //DECK endpoints
app.delete("/deck/:deckId", async (req, res) => {
  const deckId = req.params.deckId;
  const deck = await DeckModel.findByIdAndDelete(deckId);
  res.json(deck);
});

app.post("/deck", async (req, res) => {
  const newDeck = new DeckModel({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

app.get("/deck", async (req, res) => {
  const deck = await DeckModel.find();
  res.status(200).json(deck);
});

// //Card endpoints
app.post("/deck/:deckId/card", async (req, res) => {
  const deckId = req.params.deckId;
  const deck = await DeckModel.findById(deckId);
  if (!deck) return res.status(400).send("No deck of this id found");
  const { text } = req.body;
  deck.cards.push(text);
  await deck.save();
  res.json(deck);
});
app.delete("/deck/:deckId/card/:index", async (req, res) => {
  const deckId = req.params.deckId;
  const index = req.params.index;
  const deck = await DeckModel.findById(deckId);
  if (!deck) return res.status(400).send("No deck of this id found");
  deck.cards.splice(parseInt(index), 1);
  await deck.save();
  res.json(deck);
});
app.get("/deck/:deckId/card", async (req, res) => {
  const deckId = req.params.deckId;
  const deck = await DeckModel.findById(deckId);
  res.json(deck);
});

mongoose
  .connect(
    "mongodb+srv://farhan:farhan@cluster0.23dxfen.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected to DB");
  });
app.listen(5000, () => console.log("listening on port 5000"));
