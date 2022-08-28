<template>
  <div>
    <NewHeader />
    <MovieOnHome :title="movie" :apiPath="movieApi" :showAll="showAll" />
    <Footer />
  </div>
</template>

<script>
import NewHeader from '@/components/NewHeader/NewHeader.vue';
import {BASE_URL, API_KEY} from "../../api_key.js"
import MovieOnHome from '@/components/MovieOnHome/MovieOnHome.vue';
import Footer from '@/components/Footer/Footer.vue';

export default {
  name: "Top IMDB View",
  components: { NewHeader, MovieOnHome, Footer },
  data() {
    return {
      movie: "Top IMDB Movies",
      movieApi : null,
      page: 1,
      showAll: true
    }
  },
  created() {
    this.movieApi = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${this.page}`
  }
}
</script>

