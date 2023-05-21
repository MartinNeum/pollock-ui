<template>

  <div class="home">

    <h1 v-if="username">Willkommen, {{ username }}!</h1>
    <h1 v-else>Willkommen, Gast!</h1>

    <div class="search-container">
      <div class="search-field">
        <v-text-field @keydown.enter="search()" v-model="searchPoll" placeholder="Nach Umfrage suchen..." variant="solo"></v-text-field>
      </div>

      <div class="search-button">
        <v-btn color="success" @click="search()">
          Suchen
          <v-icon center>mdi-magnify</v-icon>
        </v-btn>
      </div>
    </div>

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
        }
      })
      .catch(error => {
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

  .search-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .search-field {
    width: 80%;
  }

  .search-button {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
  }

</style>
