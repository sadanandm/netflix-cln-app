const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  operatorsAliases: false,


  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.movie = require("./movie.model.js")(sequelize, Sequelize);
db.genre = require("./genre.model.js")(sequelize, Sequelize);
db.movieGenre = require("./moviegenre.js")(sequelize, Sequelize);


db.movie.belongsToMany(
  db.genre,
  {
    through: 'MovieGenres',
    as: 'movieId',
    foreignKey: 'movieId'
  }
);

db.genre.belongsToMany(
  db.movie,
  {
    through: 'MovieGenres',
    as: 'genreId',
    foreignKey: 'genreId'
  }
);




module.exports = db;
