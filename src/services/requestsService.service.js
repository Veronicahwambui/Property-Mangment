import { axiosInstance, baseUrl } from "../services/API";

class RequestsService {
    getAllRoles() {
        return axiosInstance.get(baseUrl + "/roles");
    }
    getOneRole(roleId) {
        return axiosInstance.get(baseUrl + "/roles?roleId=" + roleId);
    }

    ViewOneRole(roleId) {
        return axiosInstance.get(baseUrl + "/roles/view?roleId=" + roleId);
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
getUserType(data){
    return axiosInstance.get(baseUrl +"/user-types" ,data);

}
getUser(id){

    return axiosInstance.get(baseUrl + "/users/view/" + id);   
}
confirmDeactivateUser(userId){
    return axiosInstance.get(baseUrl +"/users/deactivateUser/"+userId)
}
confirmActivateUser(userId){
    return axiosInstance.get(baseUrl + "/users/deactivateUser/" +userId) 
}
confirmUnlockUserAccount(userId) {
    return axiosInstance.get(baseUrl + "/users/deactivateUser/" +userId)
}
// addRole(){
//     return axiosInstance.put(baseUrl +"/user-types");
// }
deactiveUser(userId){
    return axiosInstance.get(baseUrl +"/users/deactivateUser/"+ userId)
}
  
}













 
export default new RequestsService();
   
// getAllRoles() {
//     return axiosInstance.get(baseUrl + "/roles");
// }
// getOneRole(roleId) {
//     return axiosInstance.get(baseUrl + "/roles?roleId=" + roleId);
// }

// ViewOneRole(roleId) {
//     return axiosInstance.get(baseUrl + "/roles/view?roleId=" + roleId);
// }

// EditRole(data) {
//     return axiosInstance.put(baseUrl + "/roles/editrole", data);
// }

// AddRole(data) {
//     return axiosInstance.post(baseUrl + "/roles/addrole", data);
// }


// }
