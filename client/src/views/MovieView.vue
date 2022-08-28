<template>
  <div class="about">
    <NewHeader />
    <Movie :apiPath="movieApi" />
    <MovieOnHome :title="similar" :apiPath="moviesSimilar" :showAll="showAll" style="margin-top:400px" />
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
  name: "Movie View",
  components: { NewHeader, Movie, MovieOnHome, Footer },
  data() {
    return {
      similar: "You may also like",
      moviesSimilar: null,
      movieApi : null,
      showAll: false
    }
  },
  created() {
    const movieId = this.$route.params.movieId;
    console.log("movieId: ", movieId)
    this.moviesSimilar = `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}`
    this.movieApi = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  }
}
</script>

