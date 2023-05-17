<template>

  <div class="create">

    <router-link to="/home" class="back-link">Zurück</router-link>

    <v-sheet border>

      <h1>{{ title }}</h1>

      <div class="date-info">
        <v-icon size="x-small" icon="mdi-calendar-range"></v-icon>
        <p id="deadline">Läuft bis: {{ deadline }}</p>
      </div>

      <h2>Beschreibung</h2>
      <p>{{ description }}</p>

      <h2>Optionen</h2>
      <v-form>
        <v-list>
          <v-list-item v-for="(option, index) in options" :key="index">
            <v-list-item-content>{{ option }}</v-list-item-content>
          </v-list-item>
        </v-list>
      </v-form>

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
    const deadline = ref()
    const options = ref([])

    onMounted(() => {
        getPollDetails();
    })

    async function getPollDetails() {
      store.api.requests.getPollByToken(route.params.token)
        .then(response => {
          if (response.status === 200) {
            title.value = response.data.poll.body.title
            description.value = response.data.poll.body.description

            // Datum lesen
            let date = new Date(response.data.poll.body.setting.deadline)
            deadline.value = date.getDate() + "." + date.getMonth() + "." + date.getFullYear()
            options.value = response.data.poll.body.options.map(option => option.text)
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
  }

  h2 {
    font-weight: 500;
    font-size: large;
    padding: 15px 0 15px 0;
  }

  .date-info {
    display: flex;
    font-size: small;
    align-items: center;
    margin-bottom: 20px;
  }

  .date-info .v-icon {
    margin-right: 5px;
  }

</style>
