const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.SECRET_OF_DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const itemsSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemsSchema);

app.get("/", (req, res) => {
  Item.find()
    .then((items) => res.json(items))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem
    .save()
    .then(() => res.json("Item added successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
  res.redirect("/");
});

app.delete("/:_id", (req, res) => {
  Item.findByIdAndRemove(req.params._id)
    .then(() => res.json("Item deleted successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
});

app.patch("/:_id/:name", (req, res) => {
  Item.update({ _id: req.params._id }, { $set: { name: req.params.name } })
    .then(() => res.json("Item updated successfully"))
    .catch((err) => res.status(400).json("Error: " + err));
  res.redirect("/");
});

app.listen(port, () => console.log(`Listening on port ${port}`));
