import Api from "./Api";
import store from "@/store/index";
const headers = {
  Authorization: `Bearer ${store.getters.getToken}`,
};
export default {
  addMovie(data) {
    return Api().post("favorite", data, { headers });
  },
  getMovie(userId) {
    console.log("headers: ", headers);
    return Api().get(`/favorite/${userId}`, { headers });
  },
  delMovie(id) {
    return Api().delete(`/favorite/${id}`, { headers });
  },
};
