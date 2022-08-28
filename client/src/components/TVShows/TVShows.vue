<template>
    <div class="movie">
        <div class="movie-poster" :style="{'background-image': 'url(' + poster + ')'}" >
        </div>
        <div class="movie-detail">
            <div class="movie-detail-rating">
                <img :src="poster" />
                <div class="movie-detail-rating-rate">
                    <button class="like-btn">Like</button>
                    <button class="dislike-btn">Dislike</button>
                </div>
            </div>
            <div class="movie-detail-right">
                <div class="movie-detail-right-btn">
                    <button class="watch">Watch now</button>
                    <button class="add" @click="addMovieToFavorite" v-if="favorite">Add to favorite</button>
                    <button class="add" @click="removeMovieFromFavorite" v-if="!favorite">Remove from favorite</button>
                </div>
                <h2>{{name}}</h2>
                <div class="movie-detail-watch-rate">
                    <button>Trailer</button>
                    <button>HD</button>
                    <button class="imdb">IMDB: {{imdb}}</button>
                </div>
                <div class="movie-detail-watch-info">
                    <div class="left">
                        <div>
                            <strong>Released: </strong>
                            <span>{{release_date}}</span>
                        </div>
                        <div>
                            <strong>Genre: </strong>
                            <span>{{genres}}</span>
                        </div>
                        <div>
                            <strong>Seasons: </strong>
                            <span>{{seasons}} seasons</span>
                        </div>
                    </div>
                    <div class="right">
                        <div>
                            <strong>Country: </strong>
                            <span>{{country}}</span>
                        </div>
                        <div>
                            <strong>Production: </strong>
                            <span>{{production}}</span>
                        </div>
                        <div>
                            <strong class="overview">Overview: </strong>
                            <span>{{overview}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
// import {BASE_URL, API_KEY} from '../../../api_key'
import FavoriteServices from '@/services/FavoriteServices';

export default {
    name: "TV Shows",
    props: ["apiPath"],
    data() {
        return {
            movie: null,
            name: null,
            poster: null,
            release_date: null,
            genres: [],
            seasons: null,
            country: [],
            imdb: null,
            production: [],
            overview: null,
            favorite: true
        }
    },
    methods: {
        async addMovieToFavorite() {
            if(this.$store.state.user) {
                try{
                    const movieAdd = {
                        ownerId: this.$store.state.user.id,
                        movieId: this.movie.id,
                        isTVShows: this.$route.path.includes('tv')
                    }
                    await FavoriteServices.addMovie(movieAdd)
                    this.favorite = false
                }catch(err) {
                    console.log("error: ", err)
                }
            }else{
                this.$router.push('/login')
            }
        },
        async removeMovieFromFavorite() {
            if(this.$store.state.user){
                try{
                    const responses = (await FavoriteServices.getMovie(this.$store.state.user.id)).data
                    let movieFavoriteId = null;
                    responses.forEach((response) => {
                        if(response.movieId == this.movie.id) movieFavoriteId = response.id
                    })
                    await FavoriteServices.delMovie(movieFavoriteId)
                    this.favorite = true
                }catch(err) {
                    console.log("error: ", err)
                }
            }
        }
    },
    async mounted() {
        this.movie = null
        this.name = null
        this.poster = null
        this.release_date = null
        this.genres = null
        this.duration = null
        this.country = null
        this.imdb = null
        this.production = null
        this.overview = null


        const data = (await axios.get(this.apiPath)).data
        this.movie = data
        this.name = data.name
        this.poster = `https://www.themoviedb.org/t/p/w300_and_h450_bestv2${data.poster_path}`
        this.release_date = data.first_air_date
        // console.log("movie: ", data)

        this.genres = []
        data.genres.forEach(gen => {
            this.genres.push(gen.name)
        });
        this.genres = this.genres.join(', ')
        this.seasons = data.number_of_seasons

        this.country = []
        data.production_countries.forEach(country => {
            this.country.push(country.name)
        });
        this.country = this.country.join(', ')

        this.imdb = data.vote_average

        this.production = []
        data.production_companies.forEach(production => {
            this.production.push(production.name)
        });
        this.production = this.production.join(', ')

        this.overview = data.overview

        //Favorite
        if(this.$store.state.user) {
            const userId = this.$store.state.user.id
            try{
                const responses = (await FavoriteServices.getMovie(userId)).data
                
                responses.forEach((response) => {
                    if(response.movieId == this.movie.id) this.favorite = false
                })

            }catch(err) {
                console.log("error: ",err)
            }

        }
    }
    
}
</script>

<style scoped lang="scss">

.movie {
    width: 100%;
    // margin-top: 25px;
    // padding-top: 25px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    
    .movie-poster {
        width: 100%;
        // background-image: url(this.poster);
        background-position: 50% 10%;
        background-size: cover;
        // position: absolute;
        // top: 0;
        // left: 0;
        // right: 0;
        height: 100%;
        min-height: 800px;
        z-index: 1;
    }

    .movie-poster:hover {

    }

    .movie-detail {
        position: absolute;
        top: 600px;
        width: 80vw;
        padding: 30px;
        background: #fff;
        border-radius: 20px;
        box-shadow: 0 10px 20px rgb(0, 0 , 5%);
        min-height: 410px;
        z-index: 2;
        display: flex;
        // justify-content: space-between;

        .movie-detail-rating {
            width: 300px;
            top: 30px;
            left: 30px;
            margin-right: 20px;

            img {
                width: 100%;
                overflow: hidden;
                border-radius: 10px;
            }

            .movie-detail-rating-rate {
                margin-top: 15px;
                display: flex;

                button {
                    cursor: pointer;
                    width: 48%;
                    padding: 0.5rem 0.5rem;
                    font-size: .875rem;
                    line-height: 1.5;
                    margin: 2px 4px;
                    border-radius: 2px;
                    border: none;
                }

                .like-btn {
                    background: #3e8afa!important;
                    color: #fff!important;
                }

                .dislike-btn {
                    background: #444!important;
                    color: #fff;
                }
            }
        }

        .movie-detail-right {
            // display: block;
            width: 100%;
            padding: 0 40px;

            .movie-detail-right-btn {
                display: flex;
                justify-content: space-between;
                margin-bottom: 15px;
                width: 100%;

                button {
                    cursor: pointer;
                    border-radius: 30px;
                    display: inline-block;
                    font-weight: 400;
                    text-align: center;
                    white-space: nowrap;
                    vertical-align: middle;
                    user-select: none;
                    border: 1px solid transparent;
                    padding: 0.375rem 0.75rem;
                    font-size: 1rem;
                    line-height: 1.5;
                    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
                }

                .watch {
                    background: #3e8afa!important;
                    color: #fff!important;
                    border-color: #3e8afa!important;
                }
            }

            h2 {
                text-align: start;
                font-size: 2.5em;
                line-height: 1.3em;
                margin: 0 0 15px;
                font-weight: 300;
            }

            .movie-detail-watch-rate {
                display: flex;
                justify-content: flex-start;
                align-items: center;

                button {
                    padding: 0.25rem 0.5rem;
                    font-size: 16px;
                    line-height: 1.5;
                    border-radius: 0.2rem;
                    background: #fff!important;
                    color: #111!important;
                    border: 1px solid #111!important;
                    display: inline-block;
                    font-weight: 400;
                    text-align: center;
                    white-space: nowrap;
                    vertical-align: middle;
                    margin: 0 8px 0 0;
                    cursor: pointer;
                }

                .imdb {
                    background: 0 0!important;
                    color: #ffa600!important;
                    font-weight: 600;
                    border-color: transparent!important;
                }
            }

            .movie-detail-watch-info {
                display: flex;

                
                .left {
                    width: 50%;

                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    
                    div {
                        display: flex;
                        font-size: 15px;
                        z-index: 5;
                        position: relative;
                        line-height: 1.3em;
                        align-items: center;
                        margin: 10px 0;

                        strong {
                            padding: 0 4px;
                        }

                        span {
                            text-align: left;
                            padding: 0 0 0 4px ;
                            margin: 10px 0;
                        }
                    }
                }

                .right{

                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    width: 50%;

                    div {
                        display: flex;
                        font-size: 15px;
                        z-index: 5;
                        position: relative;
                        line-height: 1.3em;
                        align-items: center;
                        margin: 10px 0;


                        strong {
                            padding: 0 4px;
                        }

                        span {
                            text-align: left;
                            padding: 0 0 0 4px ;
                            margin: 10px 0;

                        }

                    }

                    
                }
            }
        }
    }
}
</style>