var express = require('express')
var app = express()
const path = require('path');
const fs = require('fs');
var port = process.env.PORT || 3000;


const isDirectory = source => lstatSync(source).isDirectory()

app.use('/img', express.static(__dirname + '/img'));
app.use('/public', express.static(__dirname + '/public'));
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/api/images', function(req, res) {

  // for getting all albums and not caring about order 
  // fs.readdir(path.join(__dirname, 'img/storyline'), function (err, albums) {
    // var albums = albums.filter((album) => album != '.DS_Store')
  var albums = ['seattle, wa', 'astoria, oregon', 'cannon beach, oregon', 'cape meares, oregon'];

    var json = albums.reduce(function(albums, album) {
        var images = fs.readdirSync(path.join(__dirname, 'img/storyline', album), function(err, files) {
          return files.map((file) => path.join(__dirname, 'img/storyline', file));
        });

        return albums.concat({ album, images });
      }, []);

    res.send(JSON.stringify(json));
  // });
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
