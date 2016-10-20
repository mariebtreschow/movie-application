var express = require('express');
var pug = require('pug');
var fs = require('fs');
var app = express();

var movieInMemory = JSON.parse(fs.readFileSync('data.json').toString())['movies'];


var findMovie = function(slug) {
  for (var i = 0; i < movieInMemory.length; i++) {
    if (movieInMemory[i].slug === slug) {
      return movieInMemory[i];
    }
  }
};

app.use(express.static('public'));

app.get('/', function(request, response) {
  response.redirect('/movies');
});

app.get('/movies', function(req, res) {
  console.log('Requesting /books');
  res.send(pug.renderFile('views/index.pug', { movies: movieInMemory }));
});

app.get('/movies/*', function(req, res) {
  console.log('Requesting /movie');
  var foundMovie = findMovie(req.params[0]);
  res.send(pug.renderFile('views/movie.pug', { movie: foundMovie }));
});

app.listen(3001, function() {
  console.log('Example app listening on port 3001!!!');
});
