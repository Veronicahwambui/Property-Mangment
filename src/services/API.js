import axios from 'axios';

import authService from './services/auth.service';

var headers;
if (authService.getCurrentUserAccessToken()) {
  headers = {

    'Authorization': authService.getCurrentUserAccessToken(),
    'Content-Type': 'application/json'
  };
} else {
headers = {

    'Content-Type': 'application/json'
};
}

export const axiosInstance = axios.create({
    headers: headers,
    timeout: 20000,
});

export const baseUrl = "http://142.93.231.97:8081";
