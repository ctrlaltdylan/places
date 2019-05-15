var express = require('express')
var app = express()
const path = require('path');
const fs = require('fs');
var port = process.env.PORT || 3000;


app.use('/img', express.static(__dirname + '/img'));
app.use('/public', express.static(__dirname + '/public'));
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/api/images', function(req, res) {
  fs.readdir(path.join(__dirname, 'img'), function (err, files) {

    res.send(JSON.stringify(files.filter(function(file) {
      var parts = file.split('.');
      return parts[1] == 'jpg';
    })));
  });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
