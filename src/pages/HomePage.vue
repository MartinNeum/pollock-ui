<template>

  <div class="home">

    <h1 v-if="username">Willkommen, {{ username }}!</h1>
    <h1 v-else>Willkommen, Gast!</h1>

    <v-row class="search-area" justify="center">
      <v-col cols="auto">
        <v-text-field @keydown.enter="search()" v-model="searchPoll" placeholder="Nach Umfrage suchen..." variant="solo"></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-btn @click="search()" color="success" density="default" icon="mdi-magnify"></v-btn>
      </v-col>
    </v-row>

    <v-sheet border>
      <h2>Meine Umfragen</h2>
      <p>Du hast noch keine Umfragen erstellt.</p>
    </v-sheet>

  </div>
  
</template>

<script setup>

  import { ref } from 'vue';
  import store from "../store/index.js"
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const username = ref(store.state.username);
  const searchPoll = ref('')

  async function search() {
    store.api.requests.getPollByToken(searchPoll.value)
      .then(response => {
      if (response.status === 200) {
        router.push('/poll/' + searchPoll.value);
      } else if (response.status === 400 || response.status === 404) {
        // showError('Falscher Username oder Passwort. Response: ' + response.status);
      }
    })
    .catch(error => {
      // showError('Falscher Username oder Passwort.');
      console.log(error);
    });
  }



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

  .v-text-field {
    width: 750PX;
  }

  .search-area {
    margin: 40px
  }

</style>
