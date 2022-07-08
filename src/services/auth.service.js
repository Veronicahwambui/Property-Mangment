import {baseUrl, axiosInstance} from './API';

class AuthService {
    getCurrentUserName() {
        return localStorage.getItem("user");
    }

    getUserLoggedInAt() {

        return localStorage.getItem("expiry");
    }
    
    getCurrentUserAccessToken() {

        return localStorage.getItem("token");

    }
    getAppKey() {
        return localStorage.getItem("App-Key")
    }
}

export default new AuthService();