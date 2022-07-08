import { axiosInstance, baseUrl } from "../services/API";

class RequestsService {

    getAllRoles() {
        return axiosInstance.get(baseUrl + "/roles");
    }

    getOneRole(roleId) {
        return axiosInstance.get(baseUrl + "/roles/" + roleId);
    }

    ViewOneRole(roleId) {
        return axiosInstance.get(baseUrl + "/roles/view/" + roleId);
    }

    EditRole(data) {
        return axiosInstance.put(baseUrl + "/roles/editrole", data);
    }

    AddRole(data) {
        return axiosInstance.post(baseUrl + "/roles/addrole", data);
    }

   getAllPreviledges(){
        return axiosInstance.get(baseUrl + "/privileges");      
   }

   createPreviledge(data){
        return axiosInstance.post(baseUrl + "/privileges", data);      
   }

   addUser(data){
        return axiosInstance.post(baseUrl + "/users/create", data);      
   }

}

export default new RequestsService();


