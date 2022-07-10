import { axiosInstance, baseUrl } from "./API";

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

    updateClientType(data) {
        return axiosInstance.post(baseUrl + "/client-types/update", data)
    }
    createClientType(data) {
        return axiosInstance.post(baseUrl + "/client-types", data);
    }
    getClientTypes() {
        return axiosInstance.get(baseUrl + "/client-types");
    }
    getClients() {
        return axiosInstance.get(baseUrl + "/clients");
    }
    createClient(data, x) {
        return axiosInstance.post(baseUrl + `/clients?createUSer=${x}`, data)
    }
    updateClient(data) {
        return axiosInstance.post(baseUrl + "/clients/update", data)
    }
    getClient(id) {
        return axiosInstance.get(baseUrl + `/clients/${id}`)
    }
}

export default new RequestsService();