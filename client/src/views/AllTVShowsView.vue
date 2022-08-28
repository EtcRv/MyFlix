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
import Movie from '@/components/Movie/Movie.vue';
import MovieOnHome from '@/components/MovieOnHome/MovieOnHome.vue';
import Footer from '@/components/Footer/Footer.vue';

export default {
  name: "All TV Shows View",
  components: { NewHeader, Movie, MovieOnHome, Footer },
  data() {
    return {
      movie: "Popular TV Shows",
      movieApi : null,
      page: 1,
      showAll: true
    }
  },
  created() {
    this.movieApi = `${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${this.page}`
  }
}
</script>

