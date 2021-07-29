var express = require("express");
var app = express();
var mongoose = require("mongoose");
var port = 8000;
var bodyParser = require("body-parser");
var cors = require("cors");
var customerRoutes = require("./backend/routes/customer");
var divisionRoutes = require("./backend/routes/division");
var transactionRoutes = require("./backend/routes/transaction");
var path = require("path");
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

//BackendApiRoutes

app.use("/api", customerRoutes);
app.use("/api", divisionRoutes);
app.use("/api", transactionRoutes);
app.use(express.static("public"));
//Frontend Routes\
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// server Connection
app.listen(port, () => {
  console.log(`App is listening to http://localhost:${port}`);
});
