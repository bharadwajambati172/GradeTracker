const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const routes = require("./routers/gradeTracker.router")
const cors = require('cors')
app.use(bodyParser.json({ type: "*/*" }));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors())
app.use(routes)
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.listen(1111);