const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const pumpRoute = require("./pumpRoute");
const orgRoute = require("./orgRoute");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use("/api/pump", pumpRoute);
//server.use("/api/org", orgRoute);

server.get("/", (req, res) => {
  res.send(`
    <h2>Welcome to the Jungle 🌴</h2>
    `);
});

module.exports = server;
