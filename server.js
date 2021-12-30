require("dotenv").config('.env');
const express = require("express");
const cors = require("cors");

const app = express(); 
var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const db = require("./app/models");
db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});
// routes of movies and genre 
require("./app/routes/genre.routes")(app); 
require("./app/routes/movie.routes")(app); 



// set port, listen for requests
const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
