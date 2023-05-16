<template>

  <v-app-bar color="blue-darken-3">

    <v-img src="../assets/logo-weiß.png"></v-img>
    <v-app-bar-title>Pollock</v-app-bar-title>

    <v-btn color="black" @click="createSurvey" class="survey-create-button">
      Erstellen
      <v-icon class="create-icon" left>mdi-pencil</v-icon>
    </v-btn>

    <div id="spacer"></div>

  </v-app-bar>

</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function createSurvey() {
  // Hier die Logik hinzufügen, um zur Umfrage-Erstellungsseite zu navigieren
  router.push('/create');
}
</script>

<style scoped>

  #spacer {
    margin-right: 13.5%;
  }

  .v-app-bar {
    height: 75px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .v-app-bar-title {
    font-size: xx-large;
  }

  .create-icon {
    margin-left: 5px;
  }

  .v-img {
    max-height: 35px;
    max-width: 35px;
    margin-left: 13.5%;
  }

  .logo {
    margin-left: 75px;
    height: 50px;
    width: 50px;
  }

  .header-link {
    color: white;
    margin: 15px;
    text-decoration: none;
  }

  #home-link {
    color: white;
    margin: 15px;
    text-decoration: none;
    width: 400px;
  }

  .survey-create-button {
    text-transform: none;
    background-color: white;
    font-weight: 400;
  }

</style>
