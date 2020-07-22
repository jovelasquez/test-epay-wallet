const express = require("express"),
  http = require("http"),
  bodyParser = require("body-parser"),
  cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Routes services (API)
app.use(require("./routes"));

// Error Handle
app.use(function (req, res, next) {
  var err = new Error("¡Ha ocurrido un error, recurso no encontrado!");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    code: err.status || 500,
    message: err.message,
    error: [],
  });
});

// Running Server
const port = process.env.PORT || 8010;
var server = app.listen(port, function () {
  console.log("Running " + server.address().port);
});
