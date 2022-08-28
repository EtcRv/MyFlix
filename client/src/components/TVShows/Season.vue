<template>
    <div class="season" >
        <dropdown :options="arrayOfObjects" :selected="object" v-on:updateOption="methodToRunOnSelect" ></dropdown>
        <div class="season-content">
            <ul  >
                <li v-for="ep,idx in episodes" :key="ep.id" >
                    <strong>Eps {{idx+1}}: </strong>
                    {{ep.name}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import dropdown from 'vue-dropdowns';
import axios from 'axios';
import {BASE_URL, API_KEY} from '../../../api_key'

export default {
    name: 'Season',
    components: {
        dropdown
    },
    props: ["apiPath"],
    data() {
        return {
            arrayOfObjects: [{
                name: 'Season 1'
            }],
            object: {
              name: 'Season 1',
            },
            seasonSeletect: 1,
            episodes: []
        }
    },
    methods: {
        async methodToRunOnSelect(payload) {
            this.object = payload;
            this.seasonSeletect = this.arrayOfObjects.indexOf(this.object) +1
            this.getEpisodes()
        },
        async getEpisodes() {
            const tvId = this.$route.params.tvId;
            let api = `${BASE_URL}/tv/${tvId}/season/${this.seasonSeletect}?api_key=${API_KEY}`
            const respon = (await axios.get(api)).data
            this.episodes = []
            respon.episodes.map(ep => {
                if(ep.runtime) {
                    this.episodes.push({
                        id: ep.id,
                        name: ep.name
                    })
                }else {
                    this.episodes.push({
                        id: ep.id,
                        name: "Coming Soon"
                    })
                }
            })
            console.log("respon: ", respon)
        }
    },
    async mounted() {
        const data = (await axios.get(this.apiPath)).data
        const number_of_seasons = data.number_of_seasons
        this.arrayOfObjects = []
        for(let i =0; i< number_of_seasons; i++){
            this.arrayOfObjects.push({name:`Season ${i+1}`})
        }

        this.getEpisodes()

    }
}

</script>


<style scoped lang="scss" >

.season {
    width: 80vw;
    background: #fff!important;
    box-shadow: 0 10px 20px rgb(0, 0,5%);
    border-radius: 20px;
    padding: 30px;
    font-size: 1.1em;
    line-height: 1.2em;
    display: block;
    margin: auto;
    // flex-direction: column;

    .season-content {
        
        ul {
            display: flex;
            flex-direction: row;
            align-items: center;
            width: 100%;
            flex-wrap: wrap;
            li {
                cursor: pointer;
                width: 19%;
                margin-bottom: 10px;
                border-radius: 3px;
                background: rgba(22,22,22,.05);
                justify-content: center;
                align-items: center;    
                text-align: left;
                padding: 12px 20px;
                color: #111;
                border: none!important;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: 300;
                margin: 8px;
            }

        }

    }
}

</style>