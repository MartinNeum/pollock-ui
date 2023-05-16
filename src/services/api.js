import axios from 'axios'

const requests = {

    register(username, password){
      const response = axios.post('http://127.0.0.1:3000/user', {
          name: username,
          password: password
        }
      )
      return response;
    },

    login(username){
      const response = axios.get('http://127.0.0.1:3000/user/' + username)
      return response;
    },

    getPollByToken(token){
      // const response = axios.get('http://127.0.0.1:3000/poll/lock/' + token)
      const response = axios.get('http://127.0.0.1:3000/poll/lack/' + token)
      return response;
    },

}

export default {
    requests
};