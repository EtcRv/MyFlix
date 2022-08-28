<template>
  <div>
    <Header />
    <div class="home">
      <MovieOnHome :title="Trending" :apiPath="moviesTrending" :showAll="showAll" />
      <MovieOnHome :title="tvTrending" :apiPath="tvsTrending" :showAll="showAll" />
      <!-- <MovieOnHome :title="topRated" :apiPath="topRatedMovies" /> -->
      <MovieOnHome :title="upComing" :apiPath="upComingApi" :showAll="showAll" />
    </div>
    <Footer />
  </div>
</template>

<script>
import MovieOnHome from '@/components/MovieOnHome/MovieOnHome.vue';
import {BASE_URL, API_KEY} from "../../api_key.js"
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/Footer.vue';
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {
    MovieOnHome,
    Header,
    Footer
},
  data() {
    return {
      showAll: false,
      Trending: "Movies Trending",
      // moviesTrending:`${BASE_URL}/trending/all/day?api_key=${API_KEY}`,
      moviesTrending: `${BASE_URL}/movie/popular?api_key=${API_KEY}`,
      tvTrending: "TV Shows Trending",
      tvsTrending: `${BASE_URL}/tv/popular?api_key=${API_KEY}`,
      topRated: "Top Rated",
      topRatedMovies: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
      upComing: "Up Coming",
      upComingApi: `${BASE_URL}/movie/upcoming?api_key=${API_KEY}`

    }
  },
 
};
</script>

<style scoped>
.home {
  margin: 60px 0;
}
</style>