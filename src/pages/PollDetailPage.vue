<template>

  <div class="create">

    <router-link to="/home" class="back-link">Zurück</router-link>

    <v-sheet border>
      <div class="title-row">
        <h1>{{ title }}</h1>
        <v-btn size="small" density="default" icon="mdi-pencil" @click="edit()"></v-btn>
      </div>

      <div v-if="deadline" class="date-info">
        <v-icon size="x-small" icon="mdi-calendar-range"></v-icon>
        <p id="deadline">Läuft bis: {{ deadline }}</p>
      </div>

      <h2>Beschreibung</h2>
      <p>{{ description }}</p>
    </v-sheet>

    <v-sheet border>
      <h2>Optionen</h2>
      <v-form>
        <v-list>
          <v-list-item v-for="(option, index) in options" :key="index">
            <input type="checkbox" v-model="checkedItems[index]">
            {{ option }}
          </v-list-item>
        </v-list>
      </v-form>
    </v-sheet>

    <!-- Buttons -->
    <v-row class="button-row" justify="end">
      <v-col cols="auto">
        <v-btn type="submit" color="success" @click="vote()">Abstimmen</v-btn>
      </v-col>
    </v-row>

  </div>

  <!-- Dialog Create -->
  <v-dialog v-model="dialog" width="auto" persistent>
    <v-card>
      <v-card-text>
        <h1>Glückwunsch!</h1>
        <p>Deine Abstimmung wurde erfolgreich abgegeben.</p>
        <p class="hint"><strong>Hinweis:</strong> Bitte stelle sicher, den Edit-Token zu speichern. Du wirst ihn nicht erneut abrufen können.</p>
      </v-card-text>

      <v-container>
        <v-text-field
          v-model="editToken"
          readonly
          :append-icon="editTokenCopied ? 'mdi-check' : 'mdi-content-copy'"
          @click:append="copyEditToken"
          variant="outlined"
        ></v-text-field>
      </v-container>

      <v-card-actions>
          <v-btn color="success" block @click="router.push('/home')">Weiter</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <!-- Dialog Edit -->
  <v-dialog v-model="dialogEdit" width="auto">
    <v-card>
      <v-card-text>
        <h1>Admin Token benötigt</h1>
        <p>Bitte gib deinen Admin Token zum bearbeiten ein:</p>
      </v-card-text>

      <v-text-field
        v-model="adminToken"
        variant="outlined"
        class="adminToken"
      ></v-text-field>

      <v-card-actions>
        <v-btn color="success" block @click="continueToEdit()">Weiter zur Bearbeitung</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  
</template>

<script setup>

  import { onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { ref } from 'vue';
  import store from "../store/index.js"

  const route = useRoute();
  const router = useRouter();
  const title = ref('')
  const description = ref('')
  const deadline = ref()
  const options = ref([])
  const voices = ref()
  const checkedItems = ref(new Array(options.value.length).fill(false));
  const editToken = ref()
  let editTokenCopied = ref(false)
  const dialog = ref(false)
  const dialogEdit = ref(false)
  const adminToken = ref()

  onMounted(() => {
    getPollDetails();
  })

  async function getPollDetails() {
    store.api.requests.getPollByToken(route.params.token)
      .then(response => {
        if (response.status === 200) {
          title.value = response.data.poll.body.title
          description.value = response.data.poll.body.description
          voices.value = response.data.poll.body.setting.voices

          // Datum lesen, Füge führende Nullen hinzu
          let date = null
          if (response.data.poll.body.setting.deadline) {
            date = new Date(response.data.poll.body.setting.deadline)
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            day = day < 10 ? "0" + day : day;
            month = month < 10 ? "0" + month : month;
            year = year < 10 ? "0" + year : year;
            deadline.value = day + "." + month + "." + year
          }
          options.value = response.data.poll.body.options.map(option => option.text)

        }
      })
      .catch(error => {
        console.log(error);
    });
  }

  async function vote() {
    let voteChoices = []

    checkedItems.value.forEach((element, index) => {
      if (element) {
        voteChoices.push({"id": index, "worst": false})
      }
    });

    let username = null
    store.state.username ? username = store.state.username : 'Guest'

    store.api.requests.votePoll(route.params.token, {name: username, lock: true}, voteChoices)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data)
          
          editToken.value = response.data.edit.value
          dialog.value = true
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const copyEditToken = () => {
    navigator.clipboard.writeText(editToken.value)
      .then(function() {
        editTokenCopied.value = true
        setTimeout(function() {editTokenCopied.value = false;}, 2000);
        // Erfolgreich kopiert
      })
  };

  function edit() {
    dialogEdit.value = true
  }

  function continueToEdit() {
    if(adminToken.value != null) {
      store.methods.setAdminToken(adminToken.value)
      router.push('/poll/' + route.params.token + '/edit')
    }
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
    padding: 5px 0 15px 0;
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

  .title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .adminToken {
    max-width: 90%;
    margin-left: 20px;
  }

</style>
