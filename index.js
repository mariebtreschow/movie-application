var express = require('express');
var pug = require('pug');
var app = express();


var movieInMemory = [
{
  title: 'Blow',
  slug: 'blow',
  imageURL: 'https://upload.wikimedia.org/wikipedia/en/b/bf/Blow_poster.jpg',
  director: 'Ted Demme',
  description: 'The story of George Jung, the man who established the American cocaine market in the 1970s.',
  mainCharacter: 'Johnny Depp',
  minutesLong: 124
},

 {
  title: 'The Godfather',
  slug: 'the-godfather',
  imageURL: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNTUxOTdjMDMtMWY1MC00MjkxLTgxYTMtYTM1MjU5ZTJlNTZjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_UY268_CR3,0,182,268_AL_.jpg',
  director: 'Francis Ford Coppola',
  description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
  mainCharacters: 'Marlon Brando',
  minutesLong: 175
},

{
  title: 'True Romance',
  slug: 'luftslottet-som-sprangdes',
  imageURL: 'https://i.jeded.com/i/true-romance.26061.jpg',
  director: 'Tony Scott',
  description: 'In Detroit, loner Clarence marries a call girl named Alabama, steals cocaine from her pimp, and tries to sell it in Hollywood. Meanwhile, the owners of the cocaine, the mob, track them down and try to reclaim it.',
  minutesLong: 120
},
];

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
  res.send(pug.renderFile('views/movie.pug', { movie: foundMovie}));
});

app.listen(3001, function() {
  console.log('Example app listening on port 3001!!!');
});
