const express = require("express");

const server = express();

const port = 3000;

server.get("/", (req, res) => {
  return res.send("Welcome to Inventry app");
});

server.listen(port, () => {
  console.log("server is listening on port", port);
});
