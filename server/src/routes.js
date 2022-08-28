const AuthenticationController = require("./controllers/AuthenticationController");
const AuthenticationControllerPolicy = require("./policies/AuthenticationControllerPolicy");
const FavoriteController = require("./controllers/FavoriteController");

module.exports = (app) => {
  app.post(
    "/register",
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  );
  app.post("/login", AuthenticationController.login);
  app.post("/favorite", FavoriteController.addMovie);
  app.get("/favorite/:ownerId", FavoriteController.getMovie);
  app.delete("/favorite/:id", FavoriteController.deleteMovie);
};
