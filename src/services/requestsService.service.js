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
        return axiosInstance.post(baseUrl + "/setup/zones/update", data);
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
        return axiosInstance.post(baseUrl + "/setup/estates/update", data);
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

//    one premise things  caretaker 

    caretakerTypes(){
        return axiosInstance.get(baseUrl + "/setup/caretakerTypes" )
    }

    toggleCaretaker(premiseId , caretakerId){
        return axiosInstance.get(baseUrl + "/premises/" + premiseId + "/caretaker/" + caretakerId + "/deactivate")
    }
   
    updateCaretaker(premiseId , caretakerId , data){
    return axiosInstance.post(baseUrl + "/premises/" + premiseId + "/caretaker/" + caretakerId + "/update" , data )
    }

    createCaretaker( premiseId , data){
        return axiosInstance.post(baseUrl + "/premises/" + premiseId + "/caretaker/create" , data)
    }

    allCareTakers(premiseId ){
        return axiosInstance.get(baseUrl +  "/premises/" + premiseId + "/caretakers")
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

    // premise use typres 

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
    updateTenant(data){
        return axiosInstance.post(baseUrl + "/tenants/tenancy/update", data)
  
    }
    deactivateTenancies(tenantId){
        return axiosInstance.get(baseUrl+ "/tenants/tenancy/" + tenantId + "/deactivate")
    }
    updateTenantsDetails(data){
        return axiosInstance.post(baseUrl+ "/tenants/update", data)

    }
    getContactpersons(){
        return axiosInstance.get(baseUrl + "/setup/contactPersonTypes" )


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

    updateContactPersons(data){
        return axiosInstance.post(baseUrl+"/tenants/contactpersons/update", data);
    }
    createContactPerson(data){
        return axiosInstance.post(baseUrl+ "/tenants/contactpersons/create",data);
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
    getLandLordByFileNumber(id){
        return axiosInstance.get(baseUrl + "/landlord/findByFileNumber?landLordFileNumber=" + id);
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
    findByFile(data) {
        return axiosInstance.get(baseUrl + "/landlord/findByFileNumber?landLordFileNumber=" + data)
    }
    deactivateLandlord(data) {
        return axiosInstance.get(baseUrl + "/landlord/toogleStatus/" + data)
    }
    deactivateDocuments(x,y,z) {
        return axiosInstance.get(baseUrl + `/documents/${x}/entity/${y}/deactivate/${z}`);
    }
    deactivateAccounts(data){
        return axiosInstance.get(baseUrl + "/landlord/accounts/deactivate/" + data);
    }

    // premise unit start 
     findPremiseUnits(premiseId){
        return axiosInstance.get( baseUrl + "/premiseUnits/"+ premiseId + "/units")
     }

     tooglePremiseUnitStatus( id ,premiseId){
        return axiosInstance.get( baseUrl + "/premiseUnits/"+ premiseId + "/unit/" + id + "/toogleStatus")
     }
    
     updatePremiseUnit(premiseId ,data){
        return axiosInstance.post(baseUrl + "/premiseUnits/"+ premiseId +"/unit/update", data)
     }
     
     createPremiseUnit(premiseId ,data){
        return axiosInstance.post(baseUrl + "/premiseUnits/"+ premiseId +"/unit", data)
     }
     viewOnePremiseUnit( premiseId , id){
        return axiosInstance.get(baseUrl + "/premiseUnits/" +premiseId+ "/unit/" + id)
     }

     toggleThePremise(premiseId){
        return axiosInstance.get(baseUrl + "/premises/toogleStatus/"+ premiseId)
     }

    // premise unit end 

    // premise charges start 
    createPremiseUnitTypeCharges(data){
        return axiosInstance.post(baseUrl + "/premiseUnitTypeCharges" , data)
    }
    updatePremiseUnitTypeCharges(data){
        return axiosInstance.post(baseUrl + "/premiseUnitTypeCharges/update" , data)
    }
    tooglePremiseUnitTypeChargestatus(id){
        return axiosInstance.get(baseUrl + "/premiseUnitTypeCharges" + id + "/toogleStatus")
    }
    findPremiseUnitTypeCharges(prem){
        return axiosInstance.get(baseUrl + "/premiseUnitTypeCharges/premise/" + prem)
    }
    getChargeConstraints(){
        return axiosInstance.get(baseUrl + "/setup/chargeConstraints")
    }
    // premise charges end

    getTenancyStatuses(){
        return axiosInstance.get(baseUrl + "/setup/tenancyStatuses");
    }
    getClientAccounts(data){
        return axiosInstance.get(baseUrl + `/clients/${data}/accounts`);
    }
    createClientAccount(data) {
        return axiosInstance.post(baseUrl + "/clients/accounts/create", data);
    }
    updateClientAccount(data) {
        return axiosInstance.post(baseUrl + "/clients/accounts/update", data);
    }
    deactivateClientAccount(data) {
        return axiosInstance.get(baseUrl + "/clients/accounts/deactivate/"+ data)
    }
    //INVOICING
    createInvoice(data) {
        return axiosInstance.post(baseUrl + "/payments/invoice/new", data)
    }
    getTenant(data) {
        return axiosInstance.get(baseUrl + "/tenants/" + data)
    }
    getInvoices(data) {
        return axiosInstance.post(baseUrl + `/payments/invoice/transactions?page=${data.page}&size=${data.size}`, data)
    }
    viewTenancy(tenancyId){
        return axiosInstance.get(baseUrl + "/tenants/tenancy/" + tenancyId)
    }
    getClientAccounts(clientId){
        return axiosInstance.get(baseUrl + "/clients/"+clientId+ "/accounts")
    }
    getLandlordAccounts(fileNo){
        return axiosInstance.get(baseUrl + "/landlord/findByFileNumber?landLordFileNumber=" + fileNo )
    }
    toggleChargeunitStatuses(premiseUnitTypeChargeId){
        return axiosInstance.get(baseUrl + "/premiseUnitTypeCharges/"+premiseUnitTypeChargeId+"/toogleStatus" )
    }
    createTenancyCharges(tenancyId,data){
        return axiosInstance.post(baseUrl + "/tenants/tenancy/"+tenancyId+"/charge/create-update" , data)
    }
    // premise charges end
    

  //INVOICING
  createInvoice(data) {
    return axiosInstance.post(baseUrl + "/payments/invoice/new", data);
  }
  getTenant(data) {
    return axiosInstance.get(baseUrl + "/tenants/" + data);
  }
  getInvoices(data) {
    return axiosInstance.post(
      baseUrl +
        `/payments/invoice/transactions?page=${data.page}&size=${data.size}`,
      data
    );
  }
  getParentInvoices(data) {
    return axiosInstance.post(
      baseUrl +
        `/payments/parents/transactions?page=${data.page}&size=${data.size}`,
      data
    );
  }
  getParentInvoice(id) {
    return axiosInstance.get(baseUrl + `/payments/parents/${id}`);
  }

}

export default new RequestsService();
