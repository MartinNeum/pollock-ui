/* eslint-disable */
import axios from 'axios'

const baseURL = 'http://127.0.0.1:3000'

const requests = {

    register(username, password){
      const response = axios.post(baseURL + '/user', {
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

      const response = axios.get(baseURL + '/user/' + username, config)
      return response;
    },

    /** ######################## */
    /** ### POST /poll/lack  ### */
    /** ######################## */
    createPoll(title, description, options, setting, fixed, owner, users, visibility) {
      const response = axios.post(baseURL + '/poll/lack/', {
        title: title,
        description: description,
        options: options,
        setting: setting,
        fixed: fixed
      })
      // const response = axios.post(baseURL + '/poll/lock/', {
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

    /** ############################## */
    /** ### GET /poll/lack/:token  ### */
    /** ############################## */
    getPollByShareToken(token){
      // const response = axios.get(baseURL + '/poll/lock/' + token)
      const response = axios.get(baseURL + '/poll/lack/' + token)
      return response;
    },

    /** ###############################*/
    /** ### PUT /poll/lack/:token  ### */
    /** ###############################*/
    updatePoll(adminToken, title, description, options, setting, fixed, owner, users, visibility) {
      const response = axios.put(baseURL + '/poll/lack/' + adminToken, {
        title: title,
        description: description,
        options: options,
        setting: setting,
        fixed: fixed
      })
      return response;
    },

    /** ######################## */
    /** DELETE /poll/lack/:token */
    /** ######################## */
    deletePoll(adminToken) {
      const response = axios.delete(baseURL + '/poll/lack/' + adminToken)
      return response;
    },

    /** ########################## */
    /** ### POST /vote/lack/:token */
    /** ########################## */
    createVote(token, user, choice){
      const response = axios.post(baseURL + '/vote/lack/' + token, {
        owner: user,
        choice: choice
      })
      return response;
    },

    /** ##################### */
    /** GET /vote/lack/:token */
    /** ##################### */
    getVote(token) {
      const response = axios.get(baseURL + '/vote/lack/' + token)
      return response;
    },

    /** ##################### */
    /** PUT /vote/lack/:token */
    /** ##################### */
    updateVote(token, user, choice) {
      const response = axios.put(baseURL + '/vote/lack/' + token, {
        owner: user,
        choice: choice
      })
      return response;
    },

    /** ######################## */
    /** DELETE /vote/lack/:token */
    /** ######################## */
    deleteVote(token) {
      const response = axios.delete(baseURL + '/vote/lack/' + token)
      return response;
    }

}

export default {
    requests
};