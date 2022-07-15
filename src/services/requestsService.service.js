import { axiosInstance, baseUrl } from "./API";

class RequestsService {
    // roles
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
        return axiosInstance.post(baseUrl + "/roles/editrole", data);
    }

    AddRole(data) {
        return axiosInstance.post(baseUrl + "/roles/addrole", data);
    }
    // priviledges
    getAllPreviledges() {
        return axiosInstance.get(baseUrl + "/privileges");
    }

    addUser(data) {
        return axiosInstance.post(baseUrl + "/users/create", data);
    }

    getData(data) {
        return axiosInstance.get(baseUrl + "/users", data);
    }
    getUserRoles() {
        return axiosInstance.get(baseUrl + "/roles");
    }
    editUserDetails(data) {
        return axiosInstance.post(baseUrl + "/users/update", data);
    }
    userTypeData() {
        return axiosInstance.get(baseUrl + "/user-types");
    }
    getUserType(data) {
        return axiosInstance.get(baseUrl + "/user-types", data);
    }

    createPreviledge(data) {
        return axiosInstance.post(baseUrl + "/privileges", data);
    }

    editUserDetails(data) {
        return axiosInstance.post(baseUrl + "/users/update", data);
    }
    userTypeData() {
        return axiosInstance.get(baseUrl + "/user-types");
    }

    createUserType(data) {
        return axiosInstance.post(baseUrl + "/user-types", data);
    }

    updateUserType(data) {
        return axiosInstance.post(baseUrl + "/user-types/update", data);
    }

    getUser(id) {

        return axiosInstance.get(baseUrl + "/users/view/" + id);
    }
    activateUser(userName) {
        return axiosInstance.get(baseUrl + "/users/enable?userName=" + userName)
    }
    deactivateUser(userId) {
        return axiosInstance.get(baseUrl + "/users/deactivateUser/" + userId)
    }
    unlockUserAccount(userId) {
        return axiosInstance.get(baseUrl + "/accounts/unlockUserAccount/" + userId)
    }
    viewOneUser(userId){
        return axiosInstance.get(baseUrl+"/users/view/" + userId)

    }
    // addRole(){
    //     return axiosInstance.put(baseUrl +"/user-types");
    // }
    deactiveUser(userId) {
        return axiosInstance.get(baseUrl + "/users/deactivateUser/" + userId)
    }


    // counties

    getAllCounties() {
        return axiosInstance.get(baseUrl + "/setup/counties");
    }

    getClientCounties() {
        return axiosInstance.get(baseUrl + "/setup/clientCounties");
    }
    deactivateCounty(id) {
        return axiosInstance.get(
            baseUrl + "/setup/clientCounties/toogleStatus/" + id
        );
    }

    createCounty(data) {
        return axiosInstance.post(baseUrl + "/setup/clientCounties", data);
    }

    //    zones
    createZone(data) {
        return axiosInstance.post(baseUrl + "/setup/zones", data);
    }

    getAllZones() {
        return axiosInstance.get(baseUrl + "/setup/zones");
    }

    getOneZone(id) {
        return axiosInstance.get(baseUrl + "/setup/zones/" + id);
    }

    editZone(data) {
        return axiosInstance.post(baseUrl + "/setup/zones", data);
    }

    deactivateZone(id) {
        return axiosInstance.get(baseUrl + "/setup/zones/toogleStatus/" + id);
    }

    //    estates
    createEstate(data) {
        return axiosInstance.post(baseUrl + "/setup/estates", data);
    }

    getAllEstates() {
        return axiosInstance.get(baseUrl + "/setup/estates");
    }

    getOneEstate(id) {
        return axiosInstance.get(baseUrl + "/setup/estates/" + id);
    }

    editEstate(data) {
        return axiosInstance.post(baseUrl + "/setup/estates", data);
    }

    deactivateEstate(id) {
        return axiosInstance.get(baseUrl + "/setup/estates/toogleStatus/" + id);
    }
    //user

    getUser(id) {
        return axiosInstance.get(baseUrl + "/users/view/" + id);
    }
    confirmDeactivateUser(userId) {
        return axiosInstance.get(baseUrl + "/users/deactivateUser/" + userId);
    }
    confirmActivateUser(userId) {
        return axiosInstance.get(baseUrl + "/users/deactivateUser/" + userId);
    }
    confirmUnlockUserAccount(userId) {
        return axiosInstance.get(baseUrl + "/users/deactivateUser/" + userId);
    }
    // addRole(){
    //     return axiosInstance.put(baseUrl +"/user-types");
    // }
    deactiveUser(userId) {
        return axiosInstance.get(baseUrl + "/users/deactivateUser/" + userId);
    }

    updateClientType(data) {
        return axiosInstance.post(baseUrl + "/client-types/update", data);
    }
    createClientType(data) {
        return axiosInstance.post(baseUrl + "/client-types", data);
    }
    getClientTypes() {
        return axiosInstance.get(baseUrl + "/client-types");
    }

    // premise
    getAllpremises() {
      return axiosInstance.get(baseUrl + "/premises")
    }

    createPremise(data) {
      return axiosInstance.post(baseUrl + "/premises", data)
    }

    updatePremise(id ,data) {
      return axiosInstance.post(baseUrl + "/premises/update/" + id , data)
    }

    viewPremise(id) {
      return axiosInstance.get(baseUrl + "/premises/" + id)
     }

    togglePremiseStatus(id) {
      return axiosInstance.get(baseUrl + "/premises/toogleStatus/" + id)
    }

    // premise  units
    // allpremisesUnits() {
    //   return axiosInstance.get(baseUrl + "/premisesUnits")
    // }

    // createPremise( premiseId ,data) {
    //   return axiosInstance.post(baseUrl + "/premisesUnits/" + premiseId + "/unit", data)
    // }

    // updatePremiseUnit(premiseId,data) {
    //   return axiosInstance.put(baseUrl + "/premisesUnits/" + premiseId + "/unit", data)
    // }

    // viewPremiseUnit( premiseId ,id) {
    //   return axiosInstance.get(baseUrl + "/premisesUnits/" + premiseId + "/unit/" + id )
    // }

    // togglePremiseUnitStatus(id) {
    //   return axiosInstance.get(baseUrl + "/premisesUnits/" + premiseId + "/unit/" + id + "/toogleStatus" )
    // }

    // findPremiseUnits(premiseId){
    //   return axiosInstance.get(baseUrl + "/premiseUnits/" + premiseId + "/units")
    // }

    // applicable charges

    allApplicableCharges() {
        return axiosInstance.get(baseUrl + "/setup/applicableCharges");
    }

    applicableChargeTypes() {
        return axiosInstance.get(baseUrl + "/setup/applicableChargeTypes");
    }

    createApplicableCharges(data) {
        return axiosInstance.post(baseUrl + "/setup/applicableCharges", data);
    }

    viewApplicableCharge(id) {
        return axiosInstance.get(baseUrl + "/setup/applicableCharges/" + id);
    }

    toogleApplicableCharge(id) {
        return axiosInstance.get(
            baseUrl + "/setup/applicableCharges/toogleStatus/" + id
        );
    }

    updateApplicableCharges(data) {
        return axiosInstance.post(
            baseUrl + "/setup/applicableCharges/update",
            data
        );
    }
    //  premise types

    allPremiseTypes() {
        return axiosInstance.get(baseUrl + "/setup/premiseTypes");
    }

    createPremiseTypes(data) {
        return axiosInstance.post(baseUrl + "/setup/premiseTypes", data);
    }

    viewPremiseType(id) {
        return axiosInstance.get(baseUrl + "/setup/premiseTypes" + id);
    }

    tooglePremiseType(id) {
        return axiosInstance.get(
            baseUrl + "/setup/premiseTypes/toogleStatus/" + id
        );
    }

    updatePremiseType(data) {
        return axiosInstance.post(
            baseUrl + "/setup/premiseTypes/update",
            data
        );
    }

    // premise usetypes 

    allPremiseUseTypes() {
        return axiosInstance.get(baseUrl + "/setup/premiseUses");
    }

    createPremiseUseTypes(data) {
        return axiosInstance.post(baseUrl + "/setup/premiseUses", data);
    }

    viewPremiseUseType(id) {
        return axiosInstance.get(baseUrl + "/setup/premiseUses" + id);
    }

    tooglePremiseUse(id) {
        return axiosInstance.get(
            baseUrl + "/setup/premiseUses/toogleStatus/" + id
        );
    }

    updatePremiseUseType(data) {
        return axiosInstance.post(
            baseUrl + "/setup/premiseUses/update",
            data
        );
    }

    // unit types Unit

    allUnitTypes() {
        return axiosInstance.get(baseUrl + "/setup/unitTypes");
    }

    createUnitTypes(data) {
        return axiosInstance.post(baseUrl + "/setup/unitTypes", data);
    }

    viewUnitType(id) {
        return axiosInstance.get(baseUrl + "/setup/unitTypes" + id);
    }

    toogleUnitType(id) {
        return axiosInstance.get(
            baseUrl + "/setup/unitTypes/toogleStatus/" + id
        );
    }

    updateUnitType(data) {
        return axiosInstance.post(
            baseUrl + "/setup/unitTypes/update",
            data
        );
    }

    // document types Document

    allDocumentTypes() {
        return axiosInstance.get(baseUrl + "/setup/documentTypes");
    }

    createDocumentTypes(data) {
        return axiosInstance.post(baseUrl + "/setup/documentTypes", data);
    }

    viewDocumentType(id) {
        return axiosInstance.get(baseUrl + "/setup/documentTypes" + id);
    }

    toogleDocumentType(id) {
        return axiosInstance.get(
            baseUrl + "/setup/documentTypes/toogleStatus/" + id
        );
    }

    updateDocumentType(data) {
        return axiosInstance.post(
            baseUrl + "/setup/documentTypes/update",
            data
        );
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

    getAllTenants() {
        return axiosInstance.get(baseUrl + "/tenants");
    }

    toggleTenantStatus() {
        // return axiosInstance.get(baseUrl + "/client-types");
    }


    allPremises() {
        return axiosInstance.get(baseUrl + "/premises");
    }
    getPremise(id) {
        return axiosInstance.get(baseUrl + "/premises/"+id);
    }

    createTenant(data){
        return axiosInstance.post(baseUrl+"/tenants", data);
    }



    download(name){
        return axiosInstance.get(baseUrl + "​/documents​/download?docName=" + name )
    }

    viewLandlord(id) {
        return axiosInstance.get(baseUrl + "/landlord/" + id)
       }

    viewTenant(id) {
        return axiosInstance.get(baseUrl + "/tenants/" + id)
       }
  
    //landlord agreement types

    createAgreementType(data) {
        return axiosInstance.post(baseUrl + "/setup/landLordAgreementTypes", data);
    }

    getAllAgreementTypes() {
        return axiosInstance.get(baseUrl + "/setup/landLordAgreementTypes");
    }

    getOneAgreementType(id) {
        return axiosInstance.get(baseUrl + "/setup/landLordAgreementTypes/" + id);
    }

    editAgreementType(data) {
        return axiosInstance.post(baseUrl + "/setup/landLordAgreementTypes/update", data);
    }

    deactivateAgreementType(id) {
        return axiosInstance.get(baseUrl + "/setup/landLordAgreementTypes/toogleStatus/" + id);
    }
    getCurrentUserClient() {
        let temp = JSON.parse(localStorage.getItem("user"));
        let uc = temp.client
        return uc
    }

    //landlords
    getDocumentOwnerTypes() {
        return axiosInstance.get(baseUrl + "/setup/documentOwnerTypes")
    }

    createLandLord(data) {
        return axiosInstance.post(baseUrl + "/landlord/create", data)
    }
    updateLandLord(data) {
        return axiosInstance.post(baseUrl + "/landlord/update", data)
    }

    createLandLordAccounts(data) {
        return axiosInstance.post(baseUrl+ "/landlord/accounts/create", data)
    }
    updateLandLordAccounts(data) {
        return axiosInstance.post(baseUrl+ "/landlord/accounts/update", data)
    }
    getLandLords() {
        return axiosInstance.get(baseUrl + "/landlord");
    }
    getLandlord(id){
        return axiosInstance.get(baseUrl + "/landlord/" + id);
    }
    getDocumentTypes() {
        return axiosInstance.get(baseUrl + "/setup/documentTypes");
    }
    getBanks() {
        return axiosInstance.get(baseUrl + "/setup/banks");
    }
    getLandlordTypes() {
        return axiosInstance.get(baseUrl + "/setup/landLordTypes")
    }
    createDocuments(data) {
        return axiosInstance.post(baseUrl + "/documents", data)
    }
    downloadDocuments(data) {
        return axiosInstance.get(baseUrl + "/documents/download?docName=" + data)
    }

}

export default new RequestsService();
