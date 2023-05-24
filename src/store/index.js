import { reactive } from 'vue';
import api from "../services/api"

const state = reactive({
    username: null,
    apiKey: null,
    adminToken: null,
    polls: [],
    usePollockEndpoints: null
});

const methods = {

    setUsername(username) {
        state.username = username
    },

    setApiKey(key) {
        state.apiKey = key
    },

    setAdminToken(token) {
        state.adminToken = token
    },

    setUsePollockEndpoints(value) {
        state.usePollockEndpoints = value
    },

    addPoll(poll) {
        state.polls.push({"title": poll.title, "description": poll.description, "share": poll.share, "admin": poll.admin})
    }
}

export default {
    state,
    methods,
    api
};