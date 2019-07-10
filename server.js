const express = require("express");
const helmet = require("helmet");

const server = express();

server.use(helmet());
server.use(express.json());

server.get("/", (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  console.log(`Pascals log ${req.method} ${req.originalUrl} ${new Date()}`);

  res.on("finish", () => {
    console.log(
      `${res.statusCode} ${res.statusMessage}; ${res.get("Content-Length") ||
        0}b sent`
    );
  });

  next();
}

server.use(logger);
module.exports = server;
