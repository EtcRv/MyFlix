<template>
    <div class="footer">
        <h1 @click="navigateTo('/')" >MyFlix</h1>
        <div class="footer-info">
            <p>MyFlixer is a Free Movies streaming site with zero ads. We let you watch movies online without having to register or paying, with over 10000 movies and TV-Series. You can also Download full movies from MyFlixer and watch it later if you want.</p>
            <div class="footer-info-rule">
                <a href="/">Terms of service</a>
                <a href="/">Contact</a>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: "Footer",
    methods: {
        navigateTo(route) {
            this.$router.push(route)
        }
    }
}
</script>

<style scoped lang="scss">
.footer {
    background: #000;
    display: flex;
    color: #fff;
    align-items: center;
    padding: 30px 10px;

    h1 {
        flex:2;
        color: #e50914;
        cursor: pointer;
    }

    .footer-info {
        flex: 8;

        p {
            padding: 5px;
            font-size: 16px;
            text-align: left;
        }

        .footer-info-rule {
            padding: 5px;

            a {
                margin: 5px;
                color: #fff;
                text-decoration: none;
            }
        }
    }
}
</style>