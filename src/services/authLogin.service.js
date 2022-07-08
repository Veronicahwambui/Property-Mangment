import {axiosInstance, baseUrl} from './API';

class AuthService {
    getCurrentUserName() {
        let temp = JSON.parse(localStorage.getItem("user"));
        let username = temp.firstName + " " + temp.lastName
        return username
        // return JSON.parse(localStorage.getItem("user"));
    }

    getCurrentUserAccessToken() {

        return localStorage.getItem("token");

    }

    getCurrentUserRoles() {

        return localStorage.getItem("roles");

    }

    login(data){
        return axiosInstance.post(baseUrl + "/auth", data);
    }
    recoverPassword(data) {
        return axiosInstance.post(baseUrl + "/accounts/forgotpassword", data);
    }
    resetPassword(data) {
        return axiosInstance.post(baseUrl + "/accounts/resetpassword", data)
    }
}

export default new AuthService();