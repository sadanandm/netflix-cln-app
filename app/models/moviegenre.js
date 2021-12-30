module.exports = (sequelize, Sequelize) => {
    const MovieGenre = sequelize.define("MovieGenre", {
      movieId: {
        type: Sequelize.INTEGER
      },
      genreId: {
        type: Sequelize.INTEGER
      }
    });
    
   
    //MovieGenre.sync({force: true})

    return MovieGenre;
  };
  