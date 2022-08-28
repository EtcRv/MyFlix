<template>
  <div class="about">
    <NewHeader />
    <TVShows :apiPath="tvShowsApi" />
    <Season :apiPath="tvShowsApi"  style="margin-top:400px" />
    <MovieOnHome :title="similar" :apiPath="tvShowsSimilar" :showAll="showAll" style="margin-top:100px" />
    <Footer />
  </div>
</template>

<script>
import NewHeader from '@/components/NewHeader/NewHeader.vue';
import {BASE_URL, API_KEY} from "../../api_key.js"
import MovieOnHome from '@/components/MovieOnHome/MovieOnHome.vue';
import TVShows from '../components/TVShows/TVShows.vue';
import Season from '@/components/TVShows/Season.vue';
import Footer from '@/components/Footer/Footer.vue';

export default {
  name: "TV Shows View",
  components: { NewHeader, MovieOnHome, TVShows, Season, Footer },
  data() {
    return {
      similar: "You may also like",
      tvShowsSimilar: null,
      tvShowsApi : null,
      showAll: false
    }
  },
  created() {
    const tvId = this.$route.params.tvId;
    this.tvShowsSimilar = `${BASE_URL}/tv/${tvId}/similar?api_key=${API_KEY}`
    this.tvShowsApi = `${BASE_URL}/tv/${tvId}?api_key=${API_KEY}`
  }
}
</script>

