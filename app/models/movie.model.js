const Genre = require('./genre.model');

module.exports = (sequelize, Sequelize) => {
    const Movie = sequelize.define("movie", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        releaseDate: {
            // in Date only format (yyyy-mm-dd)
            type: Sequelize.DATEONLY
        },
        duration: {
            type: Sequelize.INTEGER
        },
        rating: {
            type: Sequelize.INTEGER
        }


    });



    //Movie.sync({ force: true })
    return Movie;

};
