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
