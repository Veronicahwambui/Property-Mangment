import axios from 'axios';
let username = "admin";
let password = "password";
const encodedToken = window.btoa(username + ':' + password);

var headers = {
  'Authorization': 'Basic ' + encodedToken,
  'Content-Type': 'application/json'
};


export const communicationService = axios.create({
  headers: headers,
  timeout: 25000
});

export const communicationBaseUrl = "http://142.93.231.97:8083";