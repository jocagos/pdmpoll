var express = require("express");
var app = express();
var port = 3000;

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/mydb';
console.log('url is ' + url)

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log('Database created!');
    db.close();
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/../index.html');
})

app.listen(port, () => {
    console.log('Server listening on port ' + port + ' and url is ' + url);
})