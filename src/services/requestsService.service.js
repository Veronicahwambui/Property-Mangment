import { axiosInstance, baseUrl } from "../services/API";

class RequestsService {
    getAllRoles() {
        return axiosInstance.get(baseUrl + "/roles");
    }
    getOneRole(roleId) {
        return axiosInstance.get(baseUrl + "/roles?roleId=" + roleId);
    }

    ViewOneRole(roleId) {
        return axiosInstance.get(baseUrl + "/roles/view/" + roleId);
    }

    EditRole(data) {
        return axiosInstance.post(baseUrl + "/roles/editrole", data);
    }

    AddRole(data) {
        return axiosInstance.post(baseUrl + "/roles/addrole", data);
    }
   getAllPreviledges(){
        return axiosInstance.get(baseUrl + "/privileges");      
   }
   createPreviledge(data){
        return axiosInstance.post(baseUrl + "/privileges" , data);      
   }
   addUser(data) {
    return axiosInstance.post(baseUrl + "/users/create", data);
    }

 getData(data){
    return axiosInstance.get(baseUrl + "/users" , data);      
}
 getUserRoles() {
    return axiosInstance.get(baseUrl + "/roles");
}
editUserDetails(data){
    return axiosInstance.post(baseUrl +"/users/update", data);
}
userTypeData(){
    return axiosInstance.get(baseUrl +"/user-types");
}
// getUserType(data){
//     return axiosInstance.get(baseUrl +"/user-types" ,data);

// }

createUserType(data){
    return axiosInstance.post(baseUrl +"/user-types",data);
}
updateUser(data){
    return axiosInstance.post(baseUrl +"/user-types/update", data);
}

getUser(id){

    return axiosInstance.get(baseUrl + "/users/view/" + id);   
}
activateUser(userName){
    return axiosInstance.get(baseUrl +"/users/enable?userName="+userName)
}
deactivateUser(userId){
    return axiosInstance.get(baseUrl + "/users/deactivateUser/" +userId) 
}
unlockUserAccount(userId) {
    return axiosInstance.get(baseUrl +"/accounts/unlockUserAccount/"+ userId) 
}
// addRole(){
//     return axiosInstance.put(baseUrl +"/user-types");
// }
deactiveUser(userId){
    return axiosInstance.get(baseUrl +"/users/deactivateUser/"+ userId)
}
  
}













 
export default new RequestsService();

