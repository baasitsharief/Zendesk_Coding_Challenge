require("dotenv").config();

const express = require("express");
const cors = require("cors");
var request = require("request");
const { response } = require("express");

var options = {
  url: process.env.URL,
  auth: {
    user: process.env.USER,
    pass: process.env.TOKEN,
  },
};

const app = express();
const port = 8000;

app.use(cors());

app.get("/getAllTickets", function (req, res) {
  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(JSON.stringify(body));
    } else {
      res.status(404).send("API unavailable. Sorry for the inconvenience.");
    }
  });
});

app.get("/getTicket/:id", function (req, res) {
  request(
    {
      url: process.env.TICKET_URL.concat(`${req.params.id}.json`),
      auth: {
        user: process.env.USER,
        pass: process.env.TOKEN,
      },
    },
    (error, response, body) => {
      if (!error && response.statusCode == 200) {
        res.send(JSON.stringify(body));
      } else {
        res.status(404).send(JSON.stringify(null));
      }
    }
  );
});

app.listen(port, () => {
  console.log("We are live on " + port);
});
