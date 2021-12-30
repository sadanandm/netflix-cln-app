const db = require("../models");
const Op = db.Sequelize.Op;

const Movie = db.movie;
const movieGenre = db.movieGenre;
const Genre = db.genre;

// Create and Save a new movie
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // check if genre is passed 
    const genre = req.body.genre;
    if (!genre && req.body.genre.length < 1) {
        res.status(400).send({
            message: "Movie must belong to atleast one genre"
        });
        return;
    }
    // Create a Genre
    const movie = {
        name: req.body.name,
        description: req.body.description,
        releaseDate: req.body.releaseDate,
        duration: req.body.duration,
        rating: req.body.rating,
        genre: genre
    };

    // Save Genre in the database
    Movie.create(movie)
        .then(data => {
            associateGenre(data.id, genre, res);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Movie."
            });
        });
};

//Retrieve all Genres from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Movie.findAll({
        where: condition,
        // include: [
        //     { model: Genre, through:'MovieGenre' , as : 'genreId'}
        // ]
    
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Movie.."
            });
        });
};

// associate Genres to Movie 
const associateGenre = function (movieId, genre, res) {
    console.log("genre... ", genre)
    let rowData = genre.map(genreId => {
        return { movieId, genreId }
    });
    movieGenre.bulkCreate(rowData).then(data => {
        res.send(data);
    });

}


// Find a single Movie with an id
exports.findOne = (req, res) => {
    const id = req.params.id;  
    Movie.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Genre with id=" + id
        });
      });
  };
  
  // delete a single movie
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Movie.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Movie was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Movie with id=${id}. Maybe Movie was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Movie with id=" + id
        });
      });
  };
