<template>
    <Login v-if="isLoginPage" />
    <Register v-else />
</template>

<script>
import Login from "../components/Authentication/Login.vue"
import Register from "../components/Authentication/Register.vue"
export default {
    name: "Login View",
    components: {
        Login,
        Register
    },
    data() {
        return {
            isLoginPage: this.$route.name == 'login'

        }
    }
}
</script>
