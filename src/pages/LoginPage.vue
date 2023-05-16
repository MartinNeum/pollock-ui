<template>

  <div class="login">
    <h2>Login</h2>
    <v-text-field v-model="username" label="Username"></v-text-field>
    <v-text-field v-model="password" label="Password" type="password"></v-text-field>
    <div class="button-container">
      <v-btn @click="login" color="blue-darken-3">Login</v-btn>
    </div>
    <p class="router-link">Noch keinen Account? <router-link to="/register">Hier registrieren!</router-link></p>
  </div>

</template>

<script setup>

  import { ref } from 'vue';

  const username = ref('');
  const password = ref('');

  function login() {
    console.log('Login clicked!');
  }

</script>

<style scoped>

  .login {
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
