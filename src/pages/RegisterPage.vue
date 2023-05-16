<template>
  <div class="register">
    <h2>Registrierung</h2>
    <v-text-field v-model="username" label="Username"></v-text-field>
    <v-text-field v-model="password" label="Passwort" type="password"></v-text-field>
    <div class="button-container">
        <v-btn @click="register" color="blue-darken-3">Registrieren</v-btn>
    </div>
    <p><router-link class="router-link" to="/">Zurück zum Login</router-link></p>
  </div>
</template>

<script setup>

    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import store from "../store/index.js"

    const username = ref('');
    const password = ref('');

    const router = useRouter();

    async function register() {
        try {
            const response = await store.api.requests.register(username.value, password.value)
            console.log(response.status)
        } catch (error) {
            console.log(error)
        }
        router.push('/');
    }

</script>

<style scoped>

    .register {
        max-width: 400px;
        margin: 0 auto;
        margin-top: 50px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #fff;
    }

    h2 {
        text-align: center;
        margin-bottom: 20px;
    }

    .router-link {
        display: block;
        margin-top: 20px;
        text-align: center;
        font-size: small;
    }

    .button-container {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }

</style>
