import {axiosInstance, baseUrl} from './API';

class AuthService {
    getCurrentUserName() {
        let temp = JSON.parse(localStorage.getItem("user"));
        let username = temp.firstName + " " + temp.lastName
        return username
        // return JSON.parse(localStorage.getItem("user"));
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user")).userName;
    }
    getCurrentUserId() {
        return JSON.parse(localStorage.getItem("user")).id;
    }
    getInitials(){
        let x = this.getCurrentUserName().split(" ");
        let y = x[0].charAt(0);
        let z = x[1].charAt(0)
        return y+z
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