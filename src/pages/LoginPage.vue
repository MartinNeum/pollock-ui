<template>

  <div class="login">

    <h2>Login</h2>
    <v-text-field v-model="username" label="Username"></v-text-field>
    <v-text-field v-model="password" label="Password" type="password"></v-text-field>
    <v-text-field v-model="apiKey" label="API Key" type="text"></v-text-field>
    <div class="button-container">
      <v-btn @click="login" color="blue-darken-3">Login</v-btn>
    </div>
    <p class="router-link">Noch keinen Account? <router-link to="/register">Hier registrieren!</router-link></p>
    <v-divider></v-divider>
    <!-- <p class="router-link">Ohne Account <router-link to="/home">fortfahren</router-link>.</p> -->
    <div class="button-container">
      <v-btn size="small" @click="handleNoAccount">Ohne Account fortfahren</v-btn>
    </div>

  </div>

  <!-- Dialog Ohne Account -->
  <v-dialog v-model="dialog" width="50%">
    <v-card>
      <v-card-text>
        <h1>Hallo Gast!</h1>
        <p>Bitte gib deinen Namen ein:</p>
      </v-card-text>

      <v-text-field
        v-model="guestName"
        autofocus
        @keydown.enter="continueWithoutAccount()"
        variant="outlined"
        class="dialog"
        placeholder="Wie möchtest du genannt werden?"
      ></v-text-field>

      <v-card-actions>
        <v-btn color="success" block @click="continueWithoutAccount">Los geht's!</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script setup>

  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import store from "../store/index.js"

  const router = useRouter();

  const username = ref('');
  const password = ref('');
  const apiKey = ref('')
  const dialog = ref()
  const guestName = ref()

  async function login() {
    store.api.requests.login(username.value, apiKey.value)
      .then(response => {
        if (response.status === 200) {
          store.methods.setUsername(username.value);
          router.push('/home');
        } else if (response.status === 400 || response.status === 404) {
          // showError('Falscher Username oder Passwort. Response: ' + response.status);
        }
      })
      .catch(error => {
        // showError('Falscher Username oder Passwort.');
        console.log(error);
      });
  }

  function handleNoAccount() {
    dialog.value = true
  }

  function continueWithoutAccount() {
    store.methods.setUsername(guestName.value)
    router.push('/home')
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

  .v-divider {
    margin: 20px
  }

  .dialog {
    max-width: 90%;
    margin-left: 20px;
  }

</style>
