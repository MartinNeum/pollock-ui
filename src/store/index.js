import { reactive } from 'vue';
import api from "../services/api"

const state = reactive({
    username: null,
    apiKey: null,
    polls: []
});

const methods = {

    setUsername(username) {
        state.username = username
    },

    setApiKey(key) {
        state.apiKey = key
    },

    addPoll(poll) {
        state.polls.push({"title": poll.title, "description": poll.description, "date": poll.deadline, "share": poll.share, "admin": poll.admin})
    }

    // getName(){
    //     return state.username
    // },
    // async userIsLoggedIn(){
    //     const response = await apiCall.requests.checkSession(state.sessionKey)
    //     if(response.status == 200){
    //         if(response.data['Succuess'] != false){
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     }
    // }
}

export default {
    state,
    methods,
    api
};