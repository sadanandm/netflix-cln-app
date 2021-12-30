module.exports = app => {
    const genre = require("../controllers/genre.controller.js");

    var router = require("express").Router();

    // Retrieve all Genre
    router.get("/", genre.findAll);

    // Create a new Genre
    router.post("/", genre.create);

    //Retrieve a single Genre with id
    router.get("/:id", genre.findOne);

    // Delete a Genre with id
    router.delete("/:id", genre.delete);



    app.use('/api/genres', router);


};
