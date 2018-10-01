import axios from 'axios';

export const sendPostRequest = (url, data, isForImageUpload, token) => {
  return new Promise((resolve, reject) => {
    console.log('token ', token);
    let config;
    if (isForImageUpload) {
      config = {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      };
    }
    else {
      config = {
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json'
        }
      };
    }

    axios.post(url, data, config)
      .then(function (response) {
        if (response.status === 200)
          resolve(response.data);
        else
          reject(response.data)
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      });
  })
}


export const sendGetRequest = (url, token) => {
  return new Promise((resolve, reject) => {
    let config = {
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      }
    };
    axios.get(url, config)
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        reject(error);
        console.log(error);
      });
  })
}