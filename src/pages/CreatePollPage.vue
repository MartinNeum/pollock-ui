<template>

  <div class="create">

    <router-link to="/home" class="back-link">Zurück</router-link>

    <h1>Umfrage erstellen</h1>

    <!-- Allgemeine Infos -->
    <v-sheet border>
        <v-form>
            <h2>Allgemeine Informationen</h2>

            <h3>Titel*</h3>
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

    <!-- Optionen -->
    <v-sheet border>
        <v-form>
            <v-row>
                <v-col cols="auto">
                    <h2>Optionen (min. 2)*</h2>
                </v-col>
                <v-col class="text-right">
                    <v-btn color="lime-lighten-2" size="small" append-icon="mdi-plus" @click="showTextField = true">Hinzufügen</v-btn>
                </v-col>
            </v-row>

            <v-text-field 
                v-model="newOption" 
                append-icon="mdi-check" 
                v-if="showTextField" 
                label="Neue Option" 
                outlined
                @click:append="addOption"
                @keydown.enter="addOption()">
            </v-text-field>

            <v-list>
                <v-list-item v-for="(option, index) in options" :key="index">
                    <v-row>
                        <v-col cols="auto">
                            <v-list-item-content>{{ option }}</v-list-item-content>
                        </v-col>
                        <v-col class="text-right">
                            <v-icon @click="deleteOption(index)">mdi-close</v-icon>
                        </v-col>
                    </v-row>
                </v-list-item>
            </v-list>

            <p v-if="options.length === 0">Keine Optionen erstellt.</p>
        </v-form>
    </v-sheet>

    <!-- Personen -->
    <v-sheet border>
        <v-form>
            <v-row>
                <v-col cols="auto">
                    <h2>Personen</h2>
                </v-col>
                <v-col class="text-right">
                    <v-btn color="lime-lighten-2" size="small" append-icon="mdi-plus" @click="showPersonTextField = true">Hinzufügen</v-btn>
                </v-col>
            </v-row>

            <v-text-field 
                v-model="newPerson" 
                append-icon="mdi-check" 
                v-if="showPersonTextField" 
                label="Neue Person" 
                outlined
                @click:append="addPerson()"
                @keydown.enter="addPerson()">
            </v-text-field>

            <v-row>
                <div v-for="(person, index) in persons" :key="index">
                    <v-col>
                        <v-chip color="indigo" text-color="white" size="large" closable @click:close="deletePerson(index)">{{ person }}</v-chip>
                    </v-col>
                </div>
            </v-row>

            <p v-if="persons.length === 0">Keine Personen hinzugefügt.</p>
        </v-form>
    </v-sheet>

    <!-- Einstellungen -->
    <v-sheet border>
        <v-form>
            <h2>Einstellungen</h2>
            <v-checkbox v-model="publicPoll" color="blue-darken-3" hide-details label="Öffentlich"></v-checkbox>
            <v-checkbox v-model="setDeadline" color="blue-darken-3" label="Frist festlegen"></v-checkbox>

            <div v-if="setDeadline">
                <h3>Datum auswählen</h3>
                <VueDatePicker 
                    v-model="date"
                    class="datepicker"
                ></VueDatePicker>
            </div>
        </v-form>
    </v-sheet>

    <!-- Buttons -->
    <v-row class="button-row" justify="end">
        <v-col cols="auto">
            <v-btn type="cancel" color="blue-grey-lighten-4" @click="router.push('/home')">Abbrechen</v-btn>
        </v-col>
        <v-col cols="auto">
            <v-btn type="submit" color="success" @click="create()">Umfrage erstellen</v-btn>
        </v-col>
    </v-row>

  </div>
  
</template>

<script setup>

    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import VueDatePicker from '@vuepic/vue-datepicker';
    import store from "../store/index.js"
    import '@vuepic/vue-datepicker/dist/main.css'

    const title = ref('')
    const description = ref('')
    const publicPoll = ref(false)
    const options = ref([]);
    const persons = ref([]);
    const date = ref();

    const router = useRouter();
    const setDeadline = ref(false)
    const newOption = ref('');
    const showTextField = ref(false);
    const newPerson = ref('');
    const showPersonTextField = ref(false);

    function addOption() {
        if (newOption.value.trim() !== '') {
            options.value.push(newOption.value.trim());
            newOption.value = '';
            showTextField.value = false;
        }
    }

    function addPerson() {
        if (newPerson.value.trim() !== '') {
            persons.value.push(newPerson.value.trim());
            newPerson.value = '';
            showPersonTextField.value = false;
        }
    }

    const deleteOption = (index) => {
        options.value.splice(index, 1);
    };

    const deletePerson = (index) => {
        // TODO: Fix multiple Deletions
        persons.value = persons.value.splice(index, 1);
    };

    async function create() {

        const setting = { "voices": 1, "worst": false, "deadline": date.value }
        const fixed = [0]
        const owner = {"name": store.state.username, "lock": true}
        let visibility = "lock";
        if (publicPoll.value) {
            visibility = "lack";
        }
        const optionsDic = options.value.map((text, id) => ({ id, text }));
        const personsDic = persons.value.map((name) => ({ name, "lock": false}));

        store.api.requests.createPoll(title.value, description.value, optionsDic, setting, fixed, owner, personsDic, visibility)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data)
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
        font-weight: 500;
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

    .datepicker {
        width: 80%;
        z-index: 1;
        position: relative;
    }

</style>
