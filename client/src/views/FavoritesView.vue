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
// import {BASE_URL, API_KEY} from "../../api_key.js"
import MovieOnHome from '@/components/MovieOnHome/MovieOnHome.vue';
import Footer from '@/components/Footer/Footer.vue';

export default {
  name: "Favorite Movies View",
  components: { NewHeader, MovieOnHome, Footer },
  data() {
    return {
      movie: "Your Favorite Movies",
      movieApi : "empty",
      tvShow: "Your Favorite TV Shows",
      tvApi: "empty",
      page: 1,
      showAll: true
    }
  },
}
</script>

