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
        return axiosInstance.put(baseUrl + "/roles/editrole", data);
    }

    AddRole(data) {
        return axiosInstance.post(baseUrl + "/roles/addrole", data);
    }


}

export default new RequestsService();