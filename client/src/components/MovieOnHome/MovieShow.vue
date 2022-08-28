<template>
    <div class="movie">
        <div class="movie-top" @click="navigateTo()">
            <div>HD</div>
            <img :src="imageUrl" class="movie-top-picture" />
        </div>
        <div class="movie-detail" @click="navigateTo(`/movie/${movie.id}`)">
            <h3 v-if="movie.title" class="movie-detail-title">{{movie.title}}</h3>
            <h3 v-if="movie.name" class="movie-detail-title">{{movie.name}}</h3>
            <div class="movie-detail-info">
                <p v-if="movie.release_date">{{movie.release_date}}</p>
                <p v-if="movie.first_air_date">{{movie.first_air_date}}</p>
                <h3>⭐{{movie.vote_average}}</h3>
            </div>
        </div>
    </div>
</template>

<script>
// import {BASE_URL} from "../../../api_key"

export default {
    name: "Movie Show On Home Page",
    props: ["movie", "isTv"],
    data() {
        return {
            imageUrl: `https://www.themoviedb.org/t/p/w220_and_h330_face/${this.movie.poster_path}`
        }
    },
    methods: {
        navigateTo() {
            if(!this.isTv) {
                window.location.href = `/movie/${this.movie.id}`
            }else {
                window.location.href = `/tv/${this.movie.id}`
            }
        }
    }
}
</script>

<style scoped lang="scss">
.movie {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 10px;
    width: 100%;

    .movie-top {
        position: relative;
        cursor: pointer;

        div {
            position: absolute;
            top: 8px;
            right: 8px;
            background-color: #fff;
            padding: 4px;
            font-weight: 700;
            border-radius: 6px;
        }

        img {
            width: 100%;
            height: 100%;
            border-radius: 10px;
        }
    }

    .movie-detail {
        display: flex;
        flex-direction: column;
        justify-content: start;
        width: 100%;
        cursor: pointer;

        .movie-detail-title {
            overflow: hidden;
            text-overflow: ellipsis;
            margin: 4px;
            width: 220px;
        }

        .movie-detail-info {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            margin: 6px;
            width: 70%;

            p{
                font-size: 18px;
                font-weight: 600;
                margin: 6px 0 0 0;
            }

            h3 {
                margin: 0;
            }
        }
    }
}
</style>