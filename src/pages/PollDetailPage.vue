<template>

  <div class="create">

    <router-link to="/home" class="back-link">Zurück</router-link>

    <v-sheet border>
        <h1>{{ title }}</h1>
        <p>{{ description }}</p>

        <h2>Optionen</h2>
        <p>Keine Optionen verfügbar.</p>

        <h2>Personen</h2>
        <p>Keine Personen verfügbar.</p>
        
        <h2>Einstellungen</h2>
        <v-checkbox color="blue-darken-3" hide-details label="Öffentlich"></v-checkbox>
        <v-checkbox color="blue-darken-3" hide-details label="Frist festlegen"></v-checkbox>
    </v-sheet>

  </div>
  
</template>

<script setup>

    import { onMounted } from 'vue';
    import { useRoute} from 'vue-router';
    import { ref } from 'vue';
    import store from "../store/index.js"

    const route = useRoute();
    const title = ref('')
    const description = ref('')

    onMounted(() => {
        getPollDetails();
    })

    async function getPollDetails() {
        store.api.requests.getPollByToken(parseInt(route.params.token))
            .then(response => {
                if (response.status === 200) {
                    title.value = response.data.body.title
                    description.value = response.data.body.description
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

</script>

<style scoped>

    .create {
      max-width: 75%;
      margin: 0 auto;
      padding: 20px;
    }

    .v-sheet {
      margin: 20px 0 20px 0;
      padding: 15px;
    }

    .back-link {
        text-decoration: underline;
        color: black;
    }

    h1 {
        text-align: left;
        font-weight: 400;
        padding-bottom: 15px;
    }

    h2 {
      font-weight: 500;
      font-size: large;
      padding: 15px 0 15px 0;
    }

</style>
