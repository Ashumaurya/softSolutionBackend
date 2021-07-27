var express = require("express");
var app = express();
var mongoose = require("mongoose");
var port = 8000;
var bodyParser = require("body-parser");
var cors = require("cors");
var customerRoutes = require("./routes/customer");

//Database Connection
mongoose
  .connect("mongodb://localhost:27017/customer", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("CONNECTED"))
  .catch((err) => err);

//Middlewares

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes

app.use("/api", customerRoutes);
app.listen(port, () => {
  console.log(`App is listening to http://localhost:${port}`);
});
