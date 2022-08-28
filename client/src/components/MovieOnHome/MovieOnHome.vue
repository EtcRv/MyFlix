<template>
    <div class="movies">
        <div class="movie-title">
            <h1>{{title}}</h1>
        </div>
        <div class="movie-movies" >  
            <div v-for="movie,idx in movies" :key="movie.id" class="movie-movie">
                <MovieShow :movie="movie" :isTv="isTv" v-if="showAll || idx < 15" />
            </div>
        </div>
    </div>
</template>

<script>
import MovieShow from './MovieShow.vue';
import axios from 'axios';
import FavoriteServices from '@/services/FavoriteServices';
import { BASE_URL, API_KEY } from '../../../api_key';

export default {
    name:"Movie On Home Page",
    components: {
        MovieShow
    },
    props: ["title", "apiPath", "showAll"],
    data() {
        return {
            movies: null,
            isTv: false,
        }
    },
    async mounted() {
        if(this.apiPath && this.apiPath != "empty") {
            const data = (await axios.get(this.apiPath)).data
            this.movies = data.results
            if(this.apiPath.includes('tv')) this.isTv = true
        }else if (this.apiPath == "empty"){
            try{ 
                this.movies = []
                const responses = (await FavoriteServices.getMovie(this.$store.state.user.id)).data
                if(!this.title.includes("TV")) {
                    responses.map(async (response) => {
                        if(!response.isTVShows){
                            let apiGetMovie = `${BASE_URL}/movie/${response.movieId}?api_key=${API_KEY}`
                            const movie = (await axios.get(apiGetMovie)).data
                            // console.log("movie: ", movie)
                            this.movies.push(movie)
                            this.isTv = false
                        }
                    })
                }else{
                    responses.map(async (response) => {
                        if(response.isTVShows){
                            let apiGetMovie = `${BASE_URL}/tv/${response.movieId}?api_key=${API_KEY}`
                            const movie = (await axios.get(apiGetMovie)).data
                            this.movies.push(movie)
                            this.isTv = true
                        }
                    })
                }

            }catch(err) {
                console.log("error: ",err)
            }
        }
    },
    watch: {
        async apiPath(newData){
            console.log("newData: ", newData)
            const data = (await axios.get(newData)).data
            this.movies = data.results
            if(newData.includes('tv')) this.isTv = true
        }
    }
}
</script>

<style scoped lang="scss">
.movies {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 100px 100px;
    width: 100vw;

    .movie-title {
        display: flex;
        justify-content: flex-start;
    }

    .movie-movies {
        display: flex;
        width: 100%;
        flex-wrap: wrap;

        .movie-movie {
            width: 19%;
        }
    }

    
}
</style>