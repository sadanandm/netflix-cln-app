module.exports = app => {
    const movie = require("../controllers/movie.controller.js");

    var router = require("express").Router();

    // Retrieve all Genre
    router.get("/", movie.findAll);

    // Create a new Genre
    router.post("/", movie.create);

    // Delete a Genre with id
    router.delete("/:id", movie.delete);

    // Retrieve a single Genre with id
    router.get("/:id", movie.findOne);

    app.use('/api/movie', router);
  

};
