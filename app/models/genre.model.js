const Movie = require('./movie.model');
module.exports = (sequelize, Sequelize) => {
    const Genre = sequelize.define("genre", {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        }
    });




    //Genre.sync({ force: true })

    return Genre;
};
