import Api from "./Api";

export default {
  addMovie(data) {
    return Api().post("favorite", data);
  },
  getMovie(userId) {
    return Api().get(`/favorite/${userId}`);
  },
  delMovie(id) {
    return Api().delete(`/favorite/${id}`);
  },
};
