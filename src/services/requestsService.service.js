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

   getAllCounties(){
    return axiosInstance.get(baseUrl + "/setup/counties")
   }

   getClientCounties(){
    return axiosInstance.get(baseUrl + "/setup/clientCounties")
   }
   deactivateCounty(id){
    return axiosInstance.get(baseUrl + "/setup/clientCounties/toogleStatus/" + id)
   }

   createCounty(data){
     return axiosInstance.post(baseUrl + "/setup/clientCounties", data)
   }


}

export default new RequestsService();


