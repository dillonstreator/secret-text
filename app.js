const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/health", (_, res) => res.status(200).send("Healthy"));

app.post("/secret", (req, res) => {
  const { password } = req.body;

  if (password === process.env.PASSWORD) {
    return res.send(process.env.SECRET);
  } else {
    return res.status(401).send("Wrong password...");
  }
});

app.use(express.static(path.join(__dirname, "public")));
app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
