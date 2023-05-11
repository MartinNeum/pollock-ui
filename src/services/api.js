import axios from 'axios'

const requests = {

    register(password, email, username){
      const response = axios.post('http://127.0.0.1:8000/api/createUser', {
          password: password,
          email: email,
          username: username
        }
      )
      
      return response;
    },

    insertMeasurementData(token, petID, bloodSugar, insulinDose) {
      const date = new Date();
      
      const response = axios.post('http://127.0.0.1:8000/api/insertMeasurementData', {
          access_token: token,
          petid: petID,
          bloodSugar: bloodSugar,
          insulinDose: insulinDose,
          measureDate: date
        }
      )

      return response;
    }

}

export default {
    requests
};