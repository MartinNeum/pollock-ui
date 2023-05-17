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
                variant="outlined"
                placeholder="Worum geht es?"
            ></v-text-field>

            <h3>Beschreibung</h3>
            <v-textarea
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
                    <h2>Optionen*</h2>
                </v-col>
                <v-col class="text-right">
                    <v-btn id="add-option" color="lime-lighten-2" size="small" append-icon="mdi-plus" @click="showTextField = true">Hinzufügen</v-btn>
                </v-col>
            </v-row>

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

            <v-text-field 
                v-model="newOption" 
                append-icon="mdi-check" 
                v-if="showTextField" 
                label="Neue Option" 
                outlined
                @click:append="addOption"
                @keydown.enter="addOption()">
            </v-text-field>

            <p v-if="options.length === 0">Keine Optionen erstellt.</p>
        </v-form>
    </v-sheet>

    <!-- Personen -->
    <v-sheet border>
        <v-form>
            <h2>Personen</h2>

            <p>Keine Personen verfügbar.</p>
        </v-form>
    </v-sheet>

    <!-- Einstellungen -->
    <v-sheet border>
        <v-form>
            <h2>Einstellungen</h2>
            <v-checkbox color="blue-darken-3" hide-details label="Öffentlich"></v-checkbox>
            <v-checkbox color="blue-darken-3" hide-details label="Frist festlegen"></v-checkbox>
        </v-form>
    </v-sheet>

    <!-- Buttons -->
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

    import { ref } from 'vue';

    const options = ref([]);
    const newOption = ref('');
    const showTextField = ref(false);

    function addOption() {
        if (newOption.value.trim() !== '') {
            options.value.push(newOption.value.trim());
            newOption.value = '';
            showTextField.value = false;
        }
    }

    const deleteOption = (index) => {
        options.value.splice(index, 1);
    };

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

    #add-option {

    }

</style>
