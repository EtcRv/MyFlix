<template>
  <div>
    <NewHeader />
    <MovieOnHome :title="movie" :apiPath="movieApi" :showAll="showAll" />
    <MovieOnHome :title="tvShow" :apiPath="tvApi" :showAll="showAll" />
    <Footer />
  </div>
</template>

<script>
import NewHeader from '@/components/NewHeader/NewHeader.vue';
import {BASE_URL, API_KEY} from "../../api_key.js"
import MovieOnHome from '@/components/MovieOnHome/MovieOnHome.vue';
import Footer from '@/components/Footer/Footer.vue';

export default {
  name: "Search Movies View",
  components: { NewHeader, MovieOnHome, Footer },
  data() {
    return {
      movie: "Movies",
      movieApi : null,
      tvShow: "TV Shows",
      tvApi: null,
      page: 1,
      showAll: true
    }
  },
    created() {
    const name = this.$route.params.name
    this.movieApi = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${name}&page=1`
    this.tvApi = `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${name}&page=1`
  }
}
</script>

