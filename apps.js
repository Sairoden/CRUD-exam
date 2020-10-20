const path = require("path");
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();

// MySQL connection
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Sairoden12",
  database: "inventory",
});

// Connecting database
connection.connect(function (error) {
  if (!!error) console.log(error);
  else console.log("Database Connected!");
});

//set views file
app.set("views", path.join(__dirname, "views"));

//set view engine
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Home page
app.get("/", (req, res) => {
  let sql = "SELECT * FROM items";
  let query = connection.query(sql, (err, rows) => {
    if (err) throw err;
    res.render("index", {
      title: "Inventory",
      items: rows,
    });
  });
});

// Item get

app.get("/items", (req, res) => {
  res.render("item_add", {
    title: "ADD Item to Inventory",
  });
});

// save route
app.post("/save", (req, res) => {
  let data = {
    Name: req.body.Name,
    Quantity: req.body.Quantity,
    Amount: req.body.Amount,
  };
  let sql = "INSERT INTO items SET ?";
  let query = connection.query(sql, data, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// edit
app.get("/edit/:itemID", (req, res) => {
  const itemID = req.params.itemID;
  let sql = `SELECT * FROM items WHERE ID = ${itemID}`;
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    res.render("item_edit", {
      title: "Edit Item in your Inventory",
      items: result[0],
    });
  });
});

// update
app.post("/update", (req, res) => {
  const itemID = req.body.ID;
  let sql =
    "UPDATE items SET Name='" +
    req.body.Name +
    "',  Quantity='" +
    req.body.Quantity +
    "',  Amount='" +
    req.body.Amount +
    "' WHERE ID =" +
    itemID;
  let query = connection.query(sql, (err, results) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// Server Listening
app.listen(8700, () => {
  console.log("Server is running at port 8700");
});
