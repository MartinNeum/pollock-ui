import { reactive } from 'vue';
import api from "../services/api"

const state = reactive({
    username: null
    // sessionKey: null,
});

const methods = {

    setUsername(username) {
        state.username = username
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