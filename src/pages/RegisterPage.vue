<template>
  <div class="register">
    <h2>Registrierung</h2>
    <v-text-field v-model="username" label="Username"></v-text-field>
    <v-text-field v-model="password" label="Passwort" type="password"></v-text-field>
    <div class="button-container">
        <v-btn @click="register" color="blue-darken-3">Registrieren</v-btn>
    </div>
    <p><router-link class="router-link" to="/">Zurück zum Login</router-link></p>
  </div>

  <!-- Dialog -->
    <v-dialog v-model="dialog" width="auto" persistent>
        <v-card>
            <v-card-text>
                <h1>Willkommen!</h1>
                <p>Du hast dich erfolgreich registriert!</p>
                <p class="hint"><strong>Hinweis:</strong> Bitte stelle sicher, den API Key zu speichern. Du wirst ihn nicht erneut abrufen können.</p>
            </v-card-text>

            <v-container>
                <v-text-field
                    v-model="apiKey"
                    readonly
                    :append-icon="apiKeyCopied ? 'mdi-check' : 'mdi-content-copy'"
                    @click:append="copyApiKey"
                    variant="outlined"
                ></v-text-field>
            </v-container>

            <v-card-actions>
                <v-btn color="success" block @click="router.push('/')">Weiter</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup>

    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import store from "../store/index.js"

    const username = ref('');
    const password = ref('');
    const apiKey = ref()
    const apiKeyCopied = ref(false)
    const dialog = ref(false)

    const router = useRouter();

    async function register() {
        try {
            const response = await store.api.requests.register(username.value, password.value)
            
            if (response.status === 200) {
                dialog.value = true
                apiKey.value = response.data
            }
            // store.methods.setApiKey(response.data)
        } catch (error) {
            console.log(error)
        }
        // router.push('/');
    }

    const copyApiKey = () => {
        navigator.clipboard.writeText(apiKey.value)
            .then(function() {
                apiKeyCopied.value = true
                setTimeout(function() {apiKeyCopied.value = false;}, 2000);
                // Erfolgreich kopiert
            })
    };

</script>

<style scoped>

    .register {
        max-width: 400px;
        margin: 0 auto;
        margin-top: 50px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: #fff;
    }

    h2 {
        text-align: center;
        margin-bottom: 20px;
    }

    .router-link {
        display: block;
        margin-top: 20px;
        text-align: center;
        font-size: small;
    }

    .button-container {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
    }

</style>
