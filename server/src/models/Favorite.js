module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define("Favorite", {
    ownerId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER,
    isTVShows: DataTypes.BOOLEAN,
  });

  return Favorite;
};
