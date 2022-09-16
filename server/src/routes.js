const AuthenticationController = require("./controllers/AuthenticationController");
const AuthenticationControllerPolicy = require("./policies/AuthenticationControllerPolicy");
const FavoriteController = require("./controllers/FavoriteController");
const TokenRequire = require("./policies/TokenRequire");
module.exports = (app) => {
  app.post(
    "/register",
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  );
  app.post("/login", AuthenticationController.login);
  app.post("/favorite", TokenRequire.auth, FavoriteController.addMovie);
  app.get("/favorite/:ownerId", TokenRequire.auth, FavoriteController.getMovie);
  app.delete(
    "/favorite/:id",
    TokenRequire.auth,
    FavoriteController.deleteMovie
  );
};
