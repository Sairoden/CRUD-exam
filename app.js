const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();

app.get('/', (req, res) =>{
    res.send('asdasdasd');
});

// Server Listening
app.listen(3000, () => {
console.log('Server is running at port 3000');
});