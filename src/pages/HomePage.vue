<template>

  <div class="home">

    <h1>Willkommen, {{ username }}!</h1>

    <v-sheet border>
      <h2>Meine Umfragen</h2>
      <p>Du hast noch keine Umfragen erstellt.</p>
    </v-sheet>

    <v-sheet border>
      <h2>Eingeladene Umfragen</h2>
      <p>Du wurdest zu keiner Umfrage eingeladen.</p>
    </v-sheet>

  </div>
  
</template>

<script setup>

    import { ref } from 'vue';
    import store from "../store/index.js"

    const username = ref(store.state.username);
    // const createdSurveys = ref([]);
    // const invitedSurveys = ref([]);

</script>

<style scoped>

    .home {
      max-width: 75%;
      margin: 0 auto;
      padding: 20px;
    }

    .v-sheet {
      margin-bottom: 20px;
      padding: 15px;
    }

    .v-sheet h2 {
      font-weight: 500;
      font-size: large;
      padding-bottom: 15px;
    }

    h1 {
      text-align: left;
      margin: 20px 0 20px 0;
      font-weight: 400;
    }

</style>
