<template>

  <div class="create">

    <router-link to="/home" class="back-link">Zurück</router-link>

    <h1>Umfrage</h1>

    <v-sheet border>
        <v-form>
            <h2>Allgemeine Informationen</h2>

            <h3>Titel</h3>
            <v-text-field
                v-model="title"
                variant="outlined"
                placeholder="Worum geht es?"
            ></v-text-field>

            <h3>Beschreibung</h3>
            <v-textarea
                v-model="description"
                variant="outlined"
                placeholder="Hier kannst du Anweisungen oder Details hinzufügen."
                auto-grow
            ></v-textarea>
        </v-form>
    </v-sheet>

    <v-sheet border>
        <v-form>
            <h2>Optionen</h2>

            <p>Keine Optionen verfügbar.</p>
        </v-form>
    </v-sheet>

    <v-sheet border>
        <v-form>
            <h2>Personen</h2>

            <p>Keine Personen verfügbar.</p>
        </v-form>
    </v-sheet>

    <v-sheet border>
        <v-form>
            <h2>Einstellungen</h2>
            <v-checkbox color="blue-darken-3" hide-details label="Öffentlich"></v-checkbox>
            <v-checkbox color="blue-darken-3" hide-details label="Frist festlegen"></v-checkbox>
        </v-form>
    </v-sheet>

    <v-row class="button-row" justify="end">
        <v-col cols="auto">
            <v-btn type="cancel" color="blue-grey-lighten-4">Abbrechen</v-btn>
        </v-col>
        <v-col cols="auto">
            <v-btn type="submit" color="success">Umfrage erstellen</v-btn>
        </v-col>
    </v-row>

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
      margin-bottom: 20px;
      padding: 15px;
    }

    .v-sheet h2 {
      font-weight: 500;
      font-size: large;
      padding-bottom: 15px;
    }

    .v-form h3 {
        font-weight: 400;
        font-size: medium;
        padding-bottom: 5px;
    }

    .back-link {
        text-decoration: underline;
        color: black;
    }

    h1 {
      text-align: left;
      margin: 20px 0 20px 0;
      font-weight: 400;
    }

</style>
