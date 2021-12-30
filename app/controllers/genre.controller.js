const { movie } = require("../models");
const db = require("../models");
const Op = db.Sequelize.Op;

const Genre = db.genre

// Create and Save a new genre
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Genre
  const genre = {
    name: req.body.name,
    description: req.body.description,
  };

  // Save Genre in the database
  Genre.create(genre)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Genre."
      });
    });
};

//Retrieve all Genres from the database.
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Genre.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving genres.."
      });
    });
};

// Find a single Genre with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Genre.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Genre with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Genre.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Genre was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Genre with id=${id}. Maybe Genre was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Genre with id=" + id
      });
    });
};

