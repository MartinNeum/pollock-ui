import { reactive } from 'vue';
import api from "../services/api"

const state = reactive({
    username: null,
    polls: []
});

const methods = {

    setUsername(username) {
        state.username = username
    },

    addPoll(poll) {
        state.polls.push({"share": poll.share, "admin": poll.admin})
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