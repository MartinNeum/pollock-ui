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
      console.log(response)
      
      return response;
    },

    // insertMeasurementData(token, petID, bloodSugar, insulinDose) {
    //   const date = new Date();
      
    //   const response = axios.post('http://127.0.0.1:8000/api/insertMeasurementData', {
    //       access_token: token,
    //       petid: petID,
    //       bloodSugar: bloodSugar,
    //       insulinDose: insulinDose,
    //       measureDate: date
    //     }
    //   )

    //   return response;
    // }

}

export default {
    requests
};