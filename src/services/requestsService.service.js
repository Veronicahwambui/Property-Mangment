import { axiosInstance, baseUrl } from "./API";
import { communicationService, communicationBaseUrl } from "./CommunicationAPI";
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

  getData(type, data) {
    return axiosInstance.get(baseUrl + "/users?type=" + type, data);
  }
  getAuctioneer() {
    return axiosInstance.get(baseUrl + "/users?type=AUCTIONEER");
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
  getUserTypes() {
    return axiosInstance.get(baseUrl + "/users/user-types");
  }

  getUser(id) {
    return axiosInstance.get(baseUrl + "/users/view/" + id);
  }
  activateUser(userName) {
    return axiosInstance.get(baseUrl + "/users/enable?userName=" + userName);
  }
  deactivateUser(userId) {
    return axiosInstance.get(baseUrl + "/users/deactivateUser/" + userId);
  }
  unlockUserAccount(userId) {
    return axiosInstance.get(baseUrl + "/accounts/unlockUserAccount/" + userId);
  }
  viewOneUser(userId) {
    return axiosInstance.get(baseUrl + "/users/view/" + userId);
  }
  // addRole(){
  //     return axiosInstance.put(baseUrl +"/user-types");
  // }
  deactiveUser(userId) {
    return axiosInstance.get(baseUrl + "/users/deactivateUser/" + userId);
  }

  // applicable charges

  allApplicableCharges(type) {
    return axiosInstance.get(baseUrl + "/setup/applicableCharges?entityType=" + type );
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
  getAllpremises(page, size, data) {
    return axiosInstance.post(
      baseUrl + "/premises/list?page=" + page + "&size=" + size,
      data
    );
  }

  createPremise(data) {
    return axiosInstance.post(baseUrl + "/premises", data);
  }

  updatePremise(id, data) {
    return axiosInstance.post(baseUrl + "/premises/update/" + id, data);
  }

  viewPremise(id) {
    return axiosInstance.get(baseUrl + "/premises/" + id);
  }

  togglePremiseStatus(id) {
    return axiosInstance.get(baseUrl + "/premises/toogleStatus/" + id);
  }
  getCaretakerTypes() {
    return axiosInstance.get(baseUrl + "/setup/caretakerTypes");
  }
  //    one premise things  caretaker

  caretakerTypes() {
    return axiosInstance.get(baseUrl + "/setup/caretakerTypes");
  }

  toggleCaretaker(premiseId, caretakerId) {
    return axiosInstance.get(
      baseUrl +
        "/premises/" +
        premiseId +
        "/caretaker/" +
        caretakerId +
        "/deactivate"
    );
  }

  updateCaretaker(premiseId, caretakerId, data) {
    return axiosInstance.post(
      baseUrl +
        "/premises/" +
        premiseId +
        "/caretaker/" +
        caretakerId +
        "/update",
      data
    );
  }

  createCaretaker(premiseId, data) {
    return axiosInstance.post(
      baseUrl + "/premises/" + premiseId + "/caretaker/create",
      data
    );
  }

  allCareTakers(premiseId) {
    return axiosInstance.get(
      baseUrl + "/premises/" + premiseId + "/caretakers"
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
    return axiosInstance.post(baseUrl + "/setup/premiseTypes/update", data);
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
    return axiosInstance.get(baseUrl + "/setup/premiseUses/toogleStatus/" + id);
  }

  updatePremiseUseType(data) {
    return axiosInstance.post(baseUrl + "/setup/premiseUses/update", data);
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
    return axiosInstance.get(baseUrl + "/setup/unitTypes/toogleStatus/" + id);
  }

  updateUnitType(data) {
    return axiosInstance.post(baseUrl + "/setup/unitTypes/update", data);
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
    return axiosInstance.post(baseUrl + "/setup/documentTypes/update", data);
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
  getClients() {
    return axiosInstance.get(baseUrl + "/clients");
  }
  createClient(data, x) {
    return axiosInstance.post(baseUrl + `/clients?createUSer=${x}`, data);
  }
  updateClient(data) {
    return axiosInstance.post(baseUrl + "/clients/update", data);
  }
  getClient(id) {
    return axiosInstance.get(baseUrl + `/clients/${id}`);
  }

  getAllTenants(searchTerm, page, size, data) {
    return axiosInstance.post(
      baseUrl + "/tenants/list?page=" + page + "&size=" + size,
      data
    );
  }
  updateTenant(data) {
    return axiosInstance.post(baseUrl + "/tenants/tenancy/update", data);
  }
  createTenancies(data) {
    return axiosInstance.post(baseUrl + "/tenants/tenancy/create", data);
  }
  deactivateTenancies(tenantId, endReason) {
    return axiosInstance.get(
      baseUrl +
        "/tenants/tenancy/" +
        tenantId +
        "/deactivate?endReason=" +
        endReason
    );
  }
  updateTenantsDetails(data) {
    return axiosInstance.post(baseUrl + "/tenants/update", data);
  }
  getTenantStatus() {
    return axiosInstance.get(baseUrl + "/setup/tenancyStatuses");
  }
  getContactpersons() {
    return axiosInstance.get(baseUrl + "/setup/contactPersonTypes");
  }
  toggleTenantStatus() {
    // return axiosInstance.get(baseUrl + "/client-types");
  }

  allPremises(data) {
    return axiosInstance.post(baseUrl + "/premises", data);
  }
  getPremise(id) {
    return axiosInstance.get(baseUrl + "/premises/" + id);
  }

  createTenant(data) {
    return axiosInstance.post(baseUrl + "/tenants", data);
  }

  updateContactPersons(data) {
    return axiosInstance.post(baseUrl + "/tenants/contactpersons/update", data);
  }
  createContactPerson(data) {
    return axiosInstance.post(baseUrl + "/tenants/contactpersons/create", data);
  }

  download(name) {
    return axiosInstance.get(baseUrl + "​/documents​/download?docName=" + name);
  }

  viewLandlord(id) {
    return axiosInstance.get(baseUrl + "/landlord/" + id);
  }

  viewTenant(id) {
    return axiosInstance.get(baseUrl + "/tenants/" + id);
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
    return axiosInstance.post(
      baseUrl + "/setup/landLordAgreementTypes/update",
      data
    );
  }

  deactivateAgreementType(id) {
    return axiosInstance.get(
      baseUrl + "/setup/landLordAgreementTypes/toogleStatus/" + id
    );
  }
  getCurrentUserClient() {
    let temp = JSON.parse(localStorage.getItem("user"));
    let uc = temp.client;
    return uc;
  }

  //landlords
  getDocumentOwnerTypes() {
    return axiosInstance.get(baseUrl + "/setup/documentOwnerTypes");
  }

  createLandLord(data) {
    return axiosInstance.post(baseUrl + "/landlord/create", data);
  }
  updateLandLord(data) {
    return axiosInstance.post(baseUrl + "/landlord/update", data);
  }

  createLandLordAccounts(data) {
    return axiosInstance.post(baseUrl + "/landlord/accounts/create", data);
  }
  updateLandLordAccounts(data) {
    return axiosInstance.post(baseUrl + "/landlord/accounts/update", data);
  }
  getLandLords(page, size, data) {
    return axiosInstance.post(
      baseUrl + "/landlord/list?page=" + page + "&size=" + size,
      data
    );
  }
  getLandlord(id) {
    return axiosInstance.get(baseUrl + "/landlord/" + id);
  }
  getLandLordByFileNumber(id) {
    return axiosInstance.get(
      baseUrl + "/landlord/findByFileNumber?landLordFileNumber=" + id
    );
  }
  getDocumentTypes() {
    return axiosInstance.get(baseUrl + "/setup/documentTypes");
  }
  getBanks() {
    return axiosInstance.get(baseUrl + "/setup/banks");
  }
  getLandlordTypes() {
    return axiosInstance.get(baseUrl + "/setup/landLordTypes");
  }
  createDocuments(data) {
    return axiosInstance.post(baseUrl + "/documents", data);
  }
  downloadDocuments(data) {
    return axiosInstance.get(baseUrl + "/documents/download?docName=" + data);
  }
  findByFile(data) {
    return axiosInstance.get(
      baseUrl + "/landlord/findByFileNumber?landLordFileNumber=" + data
    );
  }
  deactivateLandlord(data) {
    return axiosInstance.get(baseUrl + "/landlord/toogleStatus/" + data);
  }
  deactivateDocuments(x, y, z) {
    return axiosInstance.get(
      baseUrl + `/documents/${x}/entity/${y}/deactivate/${z}`
    );
  }
  deactivateAccounts(data) {
    return axiosInstance.get(baseUrl + "/landlord/accounts/deactivate/" + data);
  }

  // premise unit start
  findPremiseUnits(premiseId) {
    return axiosInstance.get(baseUrl + "/premiseUnits/" + premiseId + "/units");
  }

  tooglePremiseUnitStatus(id, premiseId) {
    return axiosInstance.get(
      baseUrl + "/premiseUnits/" + premiseId + "/unit/" + id + "/toogleStatus"
    );
  }

  updatePremiseUnit(premiseId, data) {
    return axiosInstance.post(
      baseUrl + "/premiseUnits/" + premiseId + "/unit/update",
      data
    );
  }

  createPremiseUnit(premiseId, data) {
    return axiosInstance.post(
      baseUrl + "/premiseUnits/" + premiseId + "/unit",
      data
    );
  }
  viewOnePremiseUnit(premiseId, id) {
    return axiosInstance.get(
      baseUrl + "/premiseUnits/" + premiseId + "/unit/" + id
    );
  }

  toggleThePremise(premiseId) {
    return axiosInstance.get(baseUrl + "/premises/toogleStatus/" + premiseId);
  }

  // premise unit end

  // premise charges start
  createPremiseUnitTypeCharges(data) {
    return axiosInstance.post(baseUrl + "/premiseUnitTypeCharges", data);
  }
  updatePremiseUnitTypeCharges(data) {
    return axiosInstance.post(baseUrl + "/premiseUnitTypeCharges/update", data);
  }
  tooglePremiseUnitTypeChargestatus(id) {
    return axiosInstance.get(
      baseUrl + "/premiseUnitTypeCharges" + id + "/toogleStatus"
    );
  }
  findPremiseUnitTypeCharges(prem) {
    return axiosInstance.get(
      baseUrl + "/premiseUnitTypeCharges/premise/" + prem
    );
  }
  getChargeConstraints() {
    return axiosInstance.get(baseUrl + "/setup/chargeConstraints");
  }
  // premise charges end

  getTenancyStatuses() {
    return axiosInstance.get(baseUrl + "/setup/tenancyStatuses");
  }
  getClientAccounts(data) {
    return axiosInstance.get(baseUrl + `/clients/${data}/accounts`);
  }
  createClientAccount(data) {
    return axiosInstance.post(baseUrl + "/clients/accounts/create", data);
  }
  updateClientAccount(data) {
    return axiosInstance.post(baseUrl + "/clients/accounts/update", data);
  }
  deactivateClientAccount(data) {
    return axiosInstance.get(baseUrl + "/clients/accounts/deactivate/" + data);
  }
  //INVOICING
  createInvoice(data) {
    return axiosInstance.post(baseUrl + "/payments/invoice/new", data);
  }
  createNewInvoice(data) {
    return axiosInstance.post(baseUrl + "/payments/entityInvoice/new", data);
  }
  createBulkInvoice(data) {
    return axiosInstance.post(baseUrl + "/payments/invoice/new/bulk", data);
  }
  getTenant(data) {
    return axiosInstance.get(baseUrl + "/tenants/" + data);
  }
  adjustPaymentTransactionItemDueDate(invoiceNo, dueDate) {
    return axiosInstance.post(
      baseUrl +
        "/payments/invoice/adjustDueDate?invoiceNo=" +
        invoiceNo +
        "&dueDate=" +
        dueDate
    );
  }
  getInvoices(data) {
    return axiosInstance.post(
      baseUrl +
        `/payments/invoice/transactions?page=${data.page}&size=${data.size}`,
      data
    );
  }
  viewTenancy(tenancyId) {
    return axiosInstance.get(baseUrl + "/tenants/tenancy/" + tenancyId);
  }
  getClientAccounts(clientId) {
    return axiosInstance.get(baseUrl + "/clients/" + clientId + "/accounts");
  }
  getLandlordAccounts(fileNo) {
    return axiosInstance.get(
      baseUrl + "/landlord/findByFileNumber?landLordFileNumber=" + fileNo
    );
  }
  toggleChargeunitStatuses(premiseUnitTypeChargeId) {
    return axiosInstance.get(
      baseUrl +
        "/premiseUnitTypeCharges/" +
        premiseUnitTypeChargeId +
        "/toogleStatus"
    );
  }
  createTenancyCharges(tenancyId, data) {
    return axiosInstance.post(
      baseUrl + "/tenants/tenancy/" + tenancyId + "/charge/create-update",
      data
    );
  }
  getTenancyStatuses() {
    return axiosInstance.get(baseUrl + "/setup/tenancyStatuses");
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
  getParentInvoicesPrem(page, size, data) {
    return axiosInstance.post(
      baseUrl + `/payments/parents/transactions?page=${page}&size=${size}`,
      data
    );
  }
  getParentInvoice(id) {
    return axiosInstance.get(baseUrl + `/payments/parents/${id}`);
  }
  getUnits() {
    return axiosInstance.get(baseUrl + "/premiseUnits");
  }

  viewTransactionItem(id) {
    return axiosInstance.get(baseUrl + "/payments/parents/item/" + id);
  }
  // TENANCY ISSUES

  createTenancyIssue(data) {
    return axiosInstance.post(baseUrl + "/tenants/tenancyIssue/create", data);
  }

  findAllTenancyIssueTypes() {
    return axiosInstance.get(baseUrl + "/setup/tenancyIssueTypes");
  }
  getTenancyStatusesIssues() {
    return axiosInstance.get(baseUrl + "/setup/tenancyIssueTypes");
  }
  findAllTenancyGroupIssueTypes(premiseUnitId) {
    return axiosInstance.get(
      baseUrl + "/tenants/tenancyIssue/group/" + premiseUnitId
    );
  }

  createUnitTenancyIssue(data) {
    return axiosInstance.post(
      baseUrl + "/tenants/tenancyIssue/group/create",
      data
    );
  }
  //  ADMIN DASHBOARD
  adminDashboard() {
    return axiosInstance.get(baseUrl + "/reports/dashboard/admin");
  }

  adminAgedArrearsReports() {
    return axiosInstance.get(baseUrl + "/reports/adminAgedArrearsReport");
  }

  occupancyReport() {
    return axiosInstance.get(baseUrl + "/reports/occupancyReport");
  }

  newUnitsExpectedIncomeReportResponse() {
    return axiosInstance.get(baseUrl + "/reports/newUnitsExpectedIncomeReport");
  }

  //   DASHBOARD

  getClientDashboardGraphs(startDate, endDate) {
    return axiosInstance.get(
      baseUrl +
        "/reports/dashboard/graphs?startDate=" +
        startDate +
        "&endDate=" +
        endDate
    );
  }
  getClientDashboard(startDate, endDate) {
    return axiosInstance.get(
      baseUrl +
        "/reports/dashboard?startDate=" +
        startDate +
        "&endDate=" +
        endDate
    );
  }

  getPremDashboardGraphs(startDate, endDate, premise) {
    return axiosInstance.get(
      baseUrl +
        "/reports/dashboard/graphs?startDate=" +
        startDate +
        "&endDate=" +
        endDate +
        "&premise=" +
        premise
    );
  }
  getPremDashboard(startDate, endDate, premise) {
    return axiosInstance.get(
      baseUrl +
        "/reports/dashboard?startDate=" +
        startDate +
        "&endDate=" +
        endDate +
        "&premise=" +
        premise
    );
  }

  //start of statements
  getStatements(data) {
    return axiosInstance.get(
      baseUrl +
        `/payments/statements?startDate=${data.startDate}&endDate=${data.endDate}`
    );
  }

  moveTenancyIssueToNextState(tenancyIssueId, data) {
    return axiosInstance.post(
      baseUrl + "/tenants/tenancyIssue/" + tenancyIssueId + "/moveToNextState",
      data
    );
  }

  fetchDocuments(docOwnerType, entity) {
    return axiosInstance.get(
      baseUrl + "/documents/" + docOwnerType + "/entity/" + entity
    );
  }

  updateStatus(premiseId, data) {
    return axiosInstance.post(
      baseUrl + "/premiseUnits/" + premiseId + "/units/updateStatus",
      data
    );
  }

  findVacatPremise(premiseId) {
    return axiosInstance.get(
      baseUrl + "/premiseUnits/" + premiseId + "/units/vacant"
    );
  }

  //tenancy issues
  getTenancyIssuesTypes() {
    return axiosInstance.get(baseUrl + "/setup/tenancyIssueTypes");
  }
  getTenancyIssuesStatuses() {
    return axiosInstance.get(baseUrl + "/setup/tenancyStatuses");
  }

  createTenancyIssuesTypes(data) {
    return axiosInstance.post(baseUrl + "/setup/tenancyIssueTypes", data);
  }
  getTemplateNames(clientId) {
    return communicationService.get(
      communicationBaseUrl + "/comm/templates/" + clientId
    );
  }
  getIssueStates(id) {
    return axiosInstance.get(baseUrl + `/setup/tenancyIssueTypes/${id}/states`);
  }
  updateTenancyIssueStates(data, id) {
    return axiosInstance.post(
      baseUrl + `/setup/tenancyIssueTypes/${id}/state/update`,
      data
    );
  }
  createTenancyIssueStates(data, id) {
    return axiosInstance.post(
      baseUrl + `/setup/tenancyIssueTypes/${id}/state`,
      data
    );
  }
  toggleIssueState(id) {
    return axiosInstance.get(
      baseUrl + "/setup/tenancyIssueTypes/state/toogleStatus/" + id
    );
  }
  toggleIssueType(id) {
    return axiosInstance.get(
      baseUrl + "/setup/tenancyIssueTypes/toogleStatus/" + id
    );
  }

  // communication

  getEntityCommunication(entityId, page, size, type, client) {
    return communicationService.get(
      communicationBaseUrl +
        "/comm/v1/communication/" +
        entityId +
        "?page=" +
        page +
        "&size=" +
        size +
        "&type=" +
        type +
        "&client=" +
        client
    );
  }


  // STATEMENTS 

  getAllSettlements(page, size, startDate , endDate,landlordId) {
    return axiosInstance.get(
      baseUrl +
        "/settlements?page=" +
        page +
        "&size=" +
        size +
        "&startDate=" +
        startDate +
        "&endDate=" +
        endDate +(landlordId != undefined ? "&landlordId=" + landlordId:'')
    );
  }

  getOneSettlement(settlementRef){
    return axiosInstance.get(
      baseUrl + "/settlements/" + settlementRef
    );
  }

  createSettlementPayouts(data){
    return axiosInstance.post( baseUrl + "/settlements/payouts" , data)
  }
  
  // MESSANGER API
  createMessageTemplate(data) {
    return communicationService.post(
      communicationBaseUrl + "/comm/templates",
      data
    );
  }
  getMessageTemplate(clientId) {
    return communicationService.get(
      communicationBaseUrl + "/comm/templates/" + clientId
    );
  }
  getSMS(page, size, type, client) {
    return communicationService.get(
      communicationBaseUrl +
        "/comm/v1/sms?page=" +
        page +
        "&size=" +
        size +
        "&type=" +
        type +
        "&client=" +
        client
    );
  }

  getEmails(page, size, type, client) {
    return communicationService.get(
      communicationBaseUrl +
        "/comm/v1/emails?page=" +
        page +
        "&size=" +
        size +
        "&type=" +
        type +
        "&client=" +
        client
    );
  }

  utilize(data) {
    return axiosInstance.post(baseUrl + "/payments/statements/utilize", data);
  }

  //SEND EMAILS
  sendEmail(m, data) {
    return communicationService.post(
      communicationBaseUrl +
        "/comm/v1/email?contact=" +
        data.contact +
        "&entity=" +
        data.entity +
        "&client=" +
        data.client +
        "&entityType=" +
        data.entityType +
        "&createdBy=" +
        data.createdBy,
      m
    );
  }
  sendSms(m, data) {
    return communicationService.post(
      communicationBaseUrl +
        "/comm/v1/sms?contact=" +
        data.contact +
        "&entity=" +
        data.entity +
        "&client=" +
        data.client +
        "&entityType=" +
        data.entityType +
        "&createdBy=" +
        data.createdBy,
      m
    );
  }

  // LANDLORD PREMISES / DASHBOARD
  getLandLordPremises(data) {
    return axiosInstance.post(baseUrl + "/premises/list/", data);
  }
  getLandlordDashboard(landlordId, sdate, edate) {
    return axiosInstance.get(
      baseUrl +
        "/reports/dashboard?startDate=" +
        sdate +
        "&endDate=" +
        edate +
        "&landlord=" +
        landlordId
    );
  }
  getLandlordGraph(landlordId, sdate, edate) {
    return axiosInstance.get(
      baseUrl +
        "/reports/dashboard/graphs?landlord=" +
        landlordId +
        "&startDate=" +
        sdate +
        "&endDate=" +
        edate
    );
  }
  // TENANT DASHBOARD, STATEMENTS AND RECEIPTS
  getTenantDashboard(tenantId, sdate, edate) {
    return axiosInstance.get(
      baseUrl +
        "/reports/dashboard?startDate=" +
        sdate +
        "&endDate=" +
        edate +
        "&tenant=" +
        tenantId
    );
  }
  getTenantGraph(tenantId, sdate, edate) {
    return axiosInstance.get(
      baseUrl +
        "/reports/dashboard/graphs?tenant=" +
        tenantId +
        "&startDate=" +
        sdate +
        "&endDate=" +
        edate
    );
  }
  getTenantStatements(id, sD, eD) {
    return axiosInstance.get(
      baseUrl +
        "/payments/statements/" +
        id +
        "?startDate=" +
        sD +
        "&endDate=" +
        eD
    );
  }
  // BULK MESSAGING
  createBulkMessage(data) {
    return axiosInstance.post(baseUrl + "/communication/new/bulk", data);
  }

  getBulkInvoices(page ,size) {
    return axiosInstance.get(baseUrl + "/payments/bulk?page=" + page + "&size=" + size );
  }

  getBulkMessages() {
    return axiosInstance.get(baseUrl + "/communication/bulk");
  }

  // reports arrears
  fetchArrears() {
    return axiosInstance.get(baseUrl + "/reports/adminAgedArrearsReport");
  }
  getReportData(x, y, z) {
    return axiosInstance.get(
      baseUrl +
        "/reports/adminAgedArrearsReport?clientCountyId=" +
        x +
        "&zoneId=" +
        y +
        "&estateId=" +
        z
    );
  }
  // reports newUnits
  getNewUnitsReport() {
    return axiosInstance.get(baseUrl + "/reports/newUnitsExpectedIncomeReport");
  }
  filterNewUnitsReport(w, x, y, startDate, endDate) {
    return axiosInstance.get(
      baseUrl +
        "/reports/newUnitsExpectedIncomeReport?clientCountyId=" +
        w +
        "&zoneId=" +
        x +
        "&estateId=" +
        y +
        "&startDate=" +
        startDate +
        "&endDate=" +
        endDate
    );
  }
  // occupancyReport
  getOccupancyReport() {
    return axiosInstance.get(baseUrl + "/reports/occupancyReport");
  }
  filterOccupancyReport(w, x, y, startDate, endDate) {
    return axiosInstance.get(
      baseUrl +
        "/reports/occupancyReport?clientCountyId=" +
        w +
        "&zoneId=" +
        x +
        "&estateId=" +
        y +
        "&startDate=" +
        startDate +
        "&endDate=" +
        endDate
    );
  }
  receivePayment(data) {
    return axiosInstance.post(baseUrl + "/payments/invoice/callback", data);
  }
  createCreditNote(data) {
    return axiosInstance.post(baseUrl + "/payments/credit-notes/new", data);
  }
  getNotes(d, page , size ) {
    return axiosInstance.get(baseUrl + "/payments/payment-notes?type=" + d + "&page"+ page + "&size" + size);
  }
  getTransactions(d) {
    return axiosInstance.post(baseUrl + "/payments/invoice/transactions", d);
  }
  getPremiseTenancies(data) {
    return axiosInstance.get(
      baseUrl + "/tenants/tenancy/premiseActive/" + data
    );
  }
  createDebitNote(data) {
    return axiosInstance.post(baseUrl + "/payments/debit-notes/new", data);
  }
  createSettlements(data) {
    return axiosInstance.post(baseUrl + "/settlements", data);
  }
  

  toogleRegenerateReference(invoiceNo){

    return axiosInstance.get(baseUrl+ "/payments/parents/item/" + invoiceNo + "/regenerateReference")
  }
}

export default new RequestsService();
