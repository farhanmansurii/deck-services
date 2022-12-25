const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectID = mongoose.Types.ObjectId;
const Deck = new Schema({
  title: String,
  cards: [String],
});
const DeckModel = mongoose.model("Deck", Deck);

module.exports = DeckModel;
