<template>
    <div class="header">
        <div class="header-head">
            <h1 class="header-head-logo" @click="navigateTo('/')" >
                MyFlix
            </h1>
            <ul class="header-head-type">
                <li @click="navigateTo('/')">HOME</li>
                <li class="genre">
                    GENRE
                    <div class="header_menu-sub">
                        <ul class="sub-menu">
                            <li v-for="genre in genres" :key="genre.id" @click="navigateTo(`/genre/${genre.name.toLowerCase()}`)">
                                {{genre.name}}
                            </li>
                        </ul>
                    </div>
                </li>
                <li @click="navigateTo('/movie')">MOVIES</li>
                <li @click="navigateTo('/tv')">TV SHOWS</li>
                <li @click="navigateTo('/topImdb')">TOP IMDB</li>
            </ul>
    
            <div class="header-head-user">
                <button @click="navigateTo('/login')" v-if="!this.$store.state.isUserLoggedIn" >Login</button>
                <div class="user-loggedIn" v-if="this.$store.state.isUserLoggedIn">
                    <div class="user-info">👨 Hi, {{this.$store.state.user.name}}</div>
                    <div class="user-features">
                        <div @click="navigateTo('/favorite')">Favorite</div>
                        <div @click="logout">Logout</div>
                    </div>
                </div>
            </div>

        </div>
        <div class="header-down">
            <div class="header-down-title">Find Movies, TV shows and more</div>
            <div class="header-down-search">
                <input type="text" placeholder="Enter Keywords..." v-model="search" />
                <button @click="searchMovies">Find</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import {BASE_URL, API_KEY} from '../../../api_key.js'

export default {
    name: "Header",
    data() {
        return {
            search: null,
            genres: null,
            movieGenresApi: `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`,
            tvGenresApi: `${BASE_URL}/genre/tv/list?api_key=${API_KEY}`,
        }
    },
    methods: {
        navigateTo(route) {
            this.$router.push(route)
        },
        searchMovies() {
            if(this.search) {
                this.navigateTo(`/search/${this.search}`)
            }
        },
        logout() {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.$router.push("/")
        }
    },
    async mounted() {
        this.genres = []

        let tvGenres = (await axios.get(this.tvGenresApi)).data.genres
        let movieGenres = (await axios.get(this.movieGenresApi)).data.genres
        tvGenres.map(gen => {
            this.genres.push(gen)
        })

        movieGenres.map(gen => {
            if(this.genres.indexOf(gen) < 0) this.genres.push(gen)
        })
        this.genres.sort((a,b) => b.name - a.name)
    }
}
</script>

<style scoped lang="scss">
.header {
    display: block;
    position: relative;
    width: 100%;
    height: 250px;
    background-image: url(../../assets/picture/header-bg.jpg);
    background-repeat: no-repeat, repeat;
    background-size: cover; /* Resize the background image to cover the entire container */

    .header-head {
        display: flex;
        width: 100%;
        justify-content: space-around;
        align-items: center;

        h1 {
            color: #e50914;
            cursor: pointer;

        }

        .header-head-type {
            display: flex;
            list-style-type: none;

            li {
                cursor: pointer;
                padding: 0 24px;
                color: white;

                .header_menu-sub {
                    position: relative;
                    display: none;
                    .sub-menu {
                        position: absolute;
                        top: 30px;
                        left: -20px;
                        width: 800px;
                        background: #fff;
                        z-index: 102;
                        padding: 10px;
                        text-align: left;
                        box-shadow: 0 0 3px rgb(0, 0, 10%);
                        list-style: none;
                        overflow: hidden;
                        li {
                            width: 18%;
                            float: left;
                            margin: 0 1%;
                            height: 30px;
                            color: #111;
                            line-height: 30px;
                            padding: 0 20px;
                            display: block;
                            font-size: 15px;
                            white-space: nowrap;
                            max-width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                        }

                        li:hover {
                            background-color: #007bff;
                        }
                    }
                }

                .header_menu-sub::before {
                    content: '';
                    position: absolute;
                    top: -5px;
                    left: 0;
                    height: 50px;
                    width: 100%;
                }


            }

            .genre:hover {
                .header_menu-sub {
                    display: block;
                }
            }

        }

        .header-head-user {
            position: relative;

            button {
                margin: 5px;
                padding: 5px;
            }

            .user-loggedIn {
                position: absolute;
                top: -18px;
                cursor: pointer;
                background-color: #fff;
                border-radius: 4px;
                display: inline-block;
                font-weight: 400;
                // text-align: center;
                white-space: nowrap;
                vertical-align: middle;
                user-select: none;
                border: 1px solid transparent;
                padding: 0.375rem 0.75rem;
                font-size: 1rem;
                line-height: 1.5;
                transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;

                .user-info {

                }

                .user-features {
                    display: none;
                    margin: 8px 0 0 0;

                    div {
                        padding: 8px 0;
                    }

                    div:hover {
                        background-color: #007bff;
                    }
                }

            }
            .user-loggedIn:hover  {
                .user-features {
                    display: block;

                }
            }
        }  
    }

    .header-down {
        position: absolute;
        bottom: -40px;
        left: auto;
        right: auto;
        margin: auto;
        color: white;
        width: 100%;

        .header-down-title {
            font-size: 40px;
            padding: 20px;
        }

        .header-down-search {
            input {
                min-width: 900px;
                height: 70px;
                margin: 0;
                border-radius: 45px;
                padding-right: 85px;
                background: #fff;
                color: #cfcfcf;
                border: none;
                font-size: 1.8em;
                font-weight: 300;
                padding-left: 65px;
                box-shadow: 0 20px 20px rgba(0,0,0,.05)!important;
            }

            input:focus {
                border: none;
            }

            button {
                height: 70px;
                width: 70px;
                border-radius: 35px;
                margin: 0 20px;
                border: none;
                font-size: 1.8em;
                font-weight: 300;
                box-shadow: 0 20px 20px rgba(0,0,0,.05)!important;
                background: #3e8afa!important;
                color: #fff!important;
                border-color: #3e8afa!important;
                
            }

            button:hover {
                cursor: pointer;
            }
        }
    }
}


</style>
