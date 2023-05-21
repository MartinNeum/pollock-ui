/* eslint-disable */
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

    login(username, apikey){
      const config = {
        headers: {
          'API-KEY': apikey
        }
      }

      const response = axios.get('http://127.0.0.1:3000/user/' + username, config)
      return response;
    },

    createPoll(title, description, options, setting, fixed, owner, users, visibility) {
      const response = axios.post('http://127.0.0.1:3000/poll/lack/', {
        title: title,
        description: description,
        options: options,
        setting: setting,
        fixed: fixed
      })
      // const response = axios.post('http://127.0.0.1:3000/poll/lock/', {
      //   title: title,
      //   description: description,
      //   options: options,
      //   setting: setting,
      //   fixed: fixed,
      //   owner: owner,
      //   users: users,
      //   visibility: visibility
      // })
      return response;
    },

    updatePoll(adminToken, title, description, options, setting, fixed, owner, users, visibility) {
      const response = axios.put('http://127.0.0.1:3000/poll/lack/' + adminToken, {
        title: title,
        description: description,
        options: options,
        setting: setting,
        fixed: fixed
      })
      return response;
    },

    getPollByToken(token){
      // const response = axios.get('http://127.0.0.1:3000/poll/lock/' + token)
      const response = axios.get('http://127.0.0.1:3000/poll/lack/' + token)
      return response;
    },

    votePoll(token, user, choice){
      const response = axios.post('http://127.0.0.1:3000/vote/lack/' + token, {
        owner: user,
        choice: choice
      })
      return response;
    },

}

export default {
    requests
};