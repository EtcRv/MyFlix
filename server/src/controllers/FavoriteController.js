const { Favorite } = require("../models");

module.exports = {
  async addMovie(req, res) {
    try {
      const isMovieExist = await Favorite.findOne({
        where: {
          ownerId: req.body.ownerId,
          movieId: req.body.movieId,
        },
      });

      if (isMovieExist) {
        return res.status(403).send({
          error: "Movie Exist",
        });
      }

      const movie = await Favorite.create(req.body);
      const movieJson = movie.toJSON();

      res.send({
        movie: movieJson,
      });
    } catch (err) {
      console.log("error: ", err);
      res.status(403).send({
        error: "Something error!",
      });
    }
  },
  async getMovie(req, res) {
    try {
      const ownerId = req.params.ownerId;
      let movies = await Favorite.findAll({
        where: {
          ownerId: ownerId,
        },
      });

      res.send(movies);
    } catch (err) {
      console.log("error: ", err);
      res.status(500).send({
        error: "Something error!",
      });
    }
  },
  async deleteMovie(req, res) {
    try {
      const favoriteId = req.params.id;
      console.log("favoriteId: ", favoriteId);

      const movie = await Favorite.findByPk(favoriteId);
      await movie.destroy();
      res.send(movie);
    } catch (err) {
      console.log("error: ", err);
      res.status(500).send({
        error: "An error has occured trying to delete the favorite movies",
      });
    }
  },
};
