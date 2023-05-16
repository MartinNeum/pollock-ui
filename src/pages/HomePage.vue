<template>

  <div class="home">
    <div class="welcome-container">
      <h2>Willkommen, {{ username }}!</h2>
    </div>
    <v-card class="survey-card">
      <v-card-title>Meine Umfragen</v-card-title>
      <v-card-text>
        <div v-if="createdSurveys.length === 0">
          Du hast noch keine Umfragen erstellt.
        </div>
        <ul v-else>
          <li v-for="survey in createdSurveys" :key="survey.id">{{ survey.title }}</li>
        </ul>
      </v-card-text>
    </v-card>
    <v-card class="survey-card">
      <v-card-title>Eingeladene Umfragen</v-card-title>
      <v-card-text>
        <div v-if="invitedSurveys.length === 0">
          Du wurdest zu keiner Umfrage eingeladen.
        </div>
        <ul v-else>
          <li v-for="survey in invitedSurveys" :key="survey.id">{{ survey.title }}</li>
        </ul>
      </v-card-text>
    </v-card>
    <v-btn @click="createSurvey" color="primary" icon>
      <v-icon>mdi-plus</v-icon>
      Umfrage erstellen
    </v-btn>
  </div>
  
</template>

<script setup>

    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const username = ref('John Doe'); // Hier den tatsächlichen Benutzernamen setzen
    const createdSurveys = ref([]); // Hier die tatsächliche Liste der selbst erstellten Umfragen setzen
    const invitedSurveys = ref([]); // Hier die tatsächliche Liste der eingeladenen Umfragen setzen

    const router = useRouter();

    function createSurvey() {
        // Hier die Logik hinzufügen, um zur UmfragePage weiterzuleiten
        router.push('/umfrage-erstellen');
    }

</script>

<style scoped>

    .home {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
    }

    .welcome-container {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }

    .survey-card {
        margin-bottom: 20px;
    }

    h2 {
        text-align: left;
        margin-bottom: 10px;
    }

</style>
