const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();

// MySQL connection
const mysql = require('mysql');
const connection=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sairoden12',
    database: 'inventory',
});

// Connecting database
connection.connect(function(error){
if(!!error) console.log(error);
else console.log('Database Connected!');
}); 

//set views file
app.set('views',path.join(__dirname,'views'));

//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/items', (req, res) =>{
    res.render('index');
});

// Server Listening
app.listen(3000, () => {
console.log('Server is running at port 3000');
});


