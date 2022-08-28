<template>
  <div>
    <NewHeader />
    <MovieOnHome :title="movie" :apiPath="movieApi" :showAll="showAll" />
    <MovieOnHome :title="tvShow" :apiPath="tvApi" :showAll="showAll" />
    <Footer />
  </div>
</template>

<script>
import axios from 'axios';
import NewHeader from '@/components/NewHeader/NewHeader.vue';
import {BASE_URL, API_KEY} from "../../api_key.js"
import Movie from '@/components/Movie/Movie.vue';
import MovieOnHome from '@/components/MovieOnHome/MovieOnHome.vue';
import Footer from '@/components/Footer/Footer.vue';

export default {
  name: "All Genre Movie View",
  components: { NewHeader, Movie, MovieOnHome, Footer },
  data() {
    return {
      movie: "Movies",
      movieApi : null,
      tvShow: "TV Shows",
      tvApi: null,
      page: 1,
      showAll: true,
      genreId: null,
      movieGenresApi: `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
      tvGenresApi: `${BASE_URL}/genre/tv/list?api_key=${API_KEY}`,
    }
  },
  async created() {
    // this.movieApi = null
    // this.tvApi = null
    this.genreId = null
    let nameGenre = this.$route.params.name;
    
    let tvGenres = (await axios.get(this.tvGenresApi)).data.genres
    let movieGenres = (await axios.get(this.movieGenresApi)).data.genres

    console.log("nameGenre: ", nameGenre)

    tvGenres.map(gen => {
      if(gen.name.toLowerCase() == nameGenre) {
        this.genreId = gen.id
        this.tvApi = `${BASE_URL}/discover/tv?api_key=${API_KEY}&page=${this.page}&with_genres=${this.genreId}`
      }
    })

    movieGenres.map(gen => {
      if(gen.name.toLowerCase() == nameGenre) {
        this.genreId = gen.id
        this.movieApi = `${BASE_URL}/discover/movie?api_key=${API_KEY}&page=${this.page}&with_genres=${this.genreId}`
      }
    })
  }
}
</script>

