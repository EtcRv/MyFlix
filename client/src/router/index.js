import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MovieView from "../views/MovieView.vue";
import TVShowsView from "../views/TVShowsView.vue";
import AllMovieView from "../views/AllMovieView.vue";
import AllTVShowsView from "../views/AllTVShowsView.vue";
import TopIMDBView from "../views/TopIMDBView.vue";
import GenreView from "../views/GenreView.vue";
import AuthenticationView from "../views/AuthenticationView";
import FavoritesView from "../views/FavoritesView.vue";
import SearchMovieView from "../views/SearchMovieView.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/movie",
    name: "all movie",
    component: AllMovieView,
  },
  {
    path: "/movie/:movieId",
    name: "movie",
    component: MovieView,
  },
  {
    path: "/tv",
    name: "all TV shows",
    component: AllTVShowsView,
  },
  {
    path: "/tv/:tvId",
    name: "TV shows",
    component: TVShowsView,
  },
  {
    path: "/topimdb",
    name: "Top IMDB",
    component: TopIMDBView,
  },
  {
    path: "/genre/:name",
    name: "Search by genre",
    component: GenreView,
  },
  {
    path: "/login",
    name: "login",
    component: AuthenticationView,
  },
  {
    path: "/register",
    name: "Register",
    component: AuthenticationView,
  },
  {
    path: "/favorite",
    name: "Favorite view",
    component: FavoritesView,
  },
  {
    path: "/search/:name",
    name: "Search View",
    component: SearchMovieView
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
