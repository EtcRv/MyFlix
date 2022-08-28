<template>
    <div class="new-header">
        <h1 class="new-header-logo" @click="navigateTo('/')">
            MyFlix
        </h1>
        <ul class="new-header-type">
            <li @click="navigateTo('/')">HOME</li>
            <li class="genre">
                GENRE
                <div class="header_menu-sub">
                    <ul class="sub-menu">
                        <li v-for="genre,idx in genres" :key="idx" @click="navigateTo(`/genre/${genre.name.toLowerCase()}`)">
                            {{genre.name}}
                        </li>
                    </ul>
                </div>
            </li>
            <li @click="navigateTo('/movie')">MOVIES</li>
            <li @click="navigateTo('/tv')">TV SHOWS</li>
            <li @click="navigateTo('/topImdb')">TOP IMDB</li>
        </ul>


        <div class="new-header-user">
            <input type="text" autocomplete="off" name="keyword" placeholder="Enter keywords..." class="new-header-search" v-model="search" @keyup.enter="searchMovies"/>
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
</template>

<script>
import axios from 'axios';
import {BASE_URL, API_KEY} from '../../../api_key.js'
export default {
    name: "New Header",
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
            window.location.href = route
        },
        logout() {
            this.$store.dispatch('setToken', null)
            this.$store.dispatch('setUser', null)
            this.$router.push("/")
        },
        searchMovies() {

            if(this.search) {
                this.navigateTo(`/search/${this.search}`)
            }
        },
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
.new-header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    width: 100%;
    height: 65px;
    background: #144184;

    .new-header-logo {
        color: #e50914;
        cursor: pointer;

    }

    .new-header-type {
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
                    top: 20px;
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
                height: 100px;
                width: 100%;
            }
            
        }

        .genre:hover {
            .header_menu-sub {
                display: block;
            }
        }
    }

    .new-header-user {
        position: relative;

        .new-header-search {
            height: 38px;
            color: #111;
            padding-left: 40px;
            font-size: 14px;
            font-weight: 300;
            background: #fff;
            border-radius: 30px;
            border: none;
            box-shadow: none!important;
            margin: 0 20px 0 0;
        }

        button {
            margin: 5px;
            padding: 5px;
        }
        
        .user-loggedIn {
            position: absolute;
            z-index: 10000;
            // top: -18px;
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

</style>
