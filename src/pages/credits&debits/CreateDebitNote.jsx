/* global $ */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Modal, ModalFooter } from "react-bootstrap";
import CloseButton from "react-bootstrap/CloseButton";
import requestsServiceService from "../../services/requestsService.service";
import moment from "moment";
import StatusBadge from "../../components/StatusBadge";

function CreateDebitNote() {
  const [creditTenancy, setCreditTenancy] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [landlords, setLandlords] = useState([]);
  // error handling
  const [error, setError] = useState({
    message: "",
    color: "",
  });

  // navigation
  const navigate = useNavigate();

  // tenant details
  const [landlordId, setlandlordId] = useState(undefined);
  const [tenancies, settenancies] = useState([]);
  const [tenancyId, settenancyId] = useState(undefined);
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const [premiseId, setPremiseId] = useState(undefined);

  // modals and loaders
  const [invoice_show, setinvoice_show] = useState(false);
  const [debitShow, setdebitShow] = useState(true);
  const hideDebitModal = () => setdebitShow(false);
  const showInvoice = () => setinvoice_show(true);
  const closeInvoice = () => setinvoice_show(false);

  const [loading, setloading] = useState(false);
  const [loaded, setloaded] = useState(false);
  const [loading2, setloading2] = useState(false);
  const [fetched, setfetched] = useState(false);
  // check ischecked
  const [isChecked, setIsChecked] = useState(false);
  const [premises, setPremises] = useState([]);

  const getPremisesTenancies = () => {
    requestsServiceService.getPremiseTenancies(premiseId).then((res) => {
      settenancies(res.data.data);
    });
  };

  useEffect(() => {
    console.log(tenancyId);
    if (tenancyId) {
      let data = {
        startDate: moment().startOf("year").toISOString(),
        endDate: moment(new Date()).toISOString(),
        tenancyId: parseInt(tenancyId),
      };
      requestsServiceService.getTransactions(data).then((res) => {
        settransactions(res.data.data);
      });
    }
  }, [tenancyId]);

  useEffect(() => {
    premiseId !== undefined && getPremisesTenancies(premiseId);
  }, [premiseId]);

  useEffect(() => {
    console.log();
  });
  const getLandlords = () => {
    let page = 0,
      size = 100;
    let data = {
      dateCreatedEnd: new Date(),
      dateCreatedStart: moment(new Date()).startOf("year").format(),
      search: searchTerm?.trim(),
    };
    setloading2(true);
    requestsServiceService.getLandLords(page, size, data).then((res) => {
      setLandlords(res.data.data);
      setloading(false);
      setloading2(false);
      setloaded(true);
      setfetched(true);
    });
  };
  const [transactions, settransactions] = useState([]);

  // get tenancies etc
  const getPremises = (x) => {
    let startdate = moment(new Date()).startOf("year").format("YYYY/MM/DD");
    let enddate = moment(new Date()).format("YYYY/MM/DD");
    let data = {
      dateCreatedEnd: moment(enddate).format(),
      dateCreatedStart: moment(startdate).format(),
      landlordEmail: x.email?.trim(),
    };
    requestsServiceService
      .getLandLordPremises(data)
      .then((res) => {
        console.log(res.data.data);
        let temp = res.data.data;
        if (res.data?.data?.length > 0) {
          setPremises(temp);
          setloading(false);
          setloaded(true);
          setIsChecked(true);
          setError({
            ...error,
            message: "",
            color: "",
          });
        } else {
          setloading(false);
          setError({
            ...error,
            message: "Landlord has no properties!",
            color: "danger",
          });
        }
      })
      .catch((err) => {
        setloading(false);
        setError({
          ...error,
          message: "Landlord has no properties!",
          color: "danger",
        });
      });
  };
  // autofill
  const autofill = (x) => {
    setlandlordId(x.id);
    setfetched(false);
    setloaded(false);
    setloading(true);
    getPremises(x);
  };

  // search for invoice/tenant
  const handleSubmit = (e) => {
    e.preventDefault();
    setfetched(false);
    setError({
      ...error,
      message: "",
      color: "",
    });
    setloaded(false);
    setloading2(true);
    getLandlords();
  };

  const handleFinalSubmit = () => {
    if (creditTenancy) {
      var data = {
        amount: parseInt(amount),
        creditTenancy: creditTenancy,
        landlordId: landlordId,
        parentInvoiceNumber: "",
        reason: reason,
        tenancyId: parseInt(tenancyId),
        transactionValues: datas,
      };
    }
    if (!creditTenancy) {
      var data = {
        amount: parseInt(amount),
        creditTenancy: creditTenancy,
        landlordId: landlordId,
        parentInvoiceNumber: "",
        reason: reason,
        tenancyId: "",
        transactionValues: [],
      };
    }
    requestsServiceService
      .createDebitNote(data)
      .then((res) => {
        if (res.data.status === true) {
          setError({
            ...error,
            color: "success",
            message: res.data.message,
          });
          setTimeout(() => {
            navigate("/notes", { replace: true });
          }, 2500);
        } else {
          setError({
            ...error,
            color: "danger",
            message: res.data.message,
          });
        }
      })
      .catch((err) => {
        setError({
          ...error,
          color: "danger",
          message: err.message,
        });
      });
  };

  const total = () => {
    let sum = 0;
    let paid = 0;
    transactions?.transactionItems?.map((item) => {
      sum += item.billAmount;
      paid += item.billPaidAmount;
    });
    return { sum: sum, paid: paid, balance: sum - paid };
  };

  const formatCurrency = (x) => {
    let formatCurrency = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES",
    });
    return formatCurrency.format(x);
  };

  const [datas, setdatas] = useState([]);
  function handleForm(e, index, transaction) {
    let newArr = [...datas];
    newArr[index] = {
      code: transaction.transactionItemId,
      name: transaction.applicableChargeName,
      value: parseInt(e.target.value),
    };
    setdatas(newArr);
  }
  const debitTotal = () => {
    let sum = 0;
    datas?.map((item) => {
      sum += parseInt(item.value);
    });
    return sum;
  };

  useEffect(() => {
    debitTotal();
  }, [datas]);
  useEffect(() => {
    console.log(!(tenancyId !== "" || amount !== ""));
  });

  return (
    <>
      <div className="page-content">
        <div className="container-fluid">
          {/* <!-- start page title --> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18 text-capitalize">
                  Debit Note
                </h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">Debit & Debit Notes</li>
                    <li className="breadcrumb-item active">
                      Create Debit note
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end page title --> */}

          {/* <!-- eTransactions table --> */}

          <div className="row">
            <div className="col-lg-12">
              <div className="card p-5">
                <div className="card-body ">
                  <div className="row d-flex align-items-center justify-content-center ">
                    <div className="col-sm-12 col-md-7 col-lg-8">
                      <div className="d-flex justify-items-center align-items-center">
                        <div className="card-body border-1 invoice-form credit-form p-5">
                          <h4 className="card-title mb-4">
                            Enter the details below
                          </h4>
                          <div className="row">
                            <div className=" col-12 ">
                              <div className="mb-1 ">
                                <label className="text-capitalize ">
                                  Debit this amount to the tenant
                                </label>
                                <div className="row ">
                                  <div className="col-auto ">
                                    <div className="form-check mb-3">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        checked={creditTenancy}
                                        onChange={() => setCreditTenancy(true)}
                                        disabled
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="debit-yes"
                                      >
                                        Yes
                                      </label>
                                    </div>
                                  </div>

                                  <div className="col-auto ">
                                    <div className="form-check mb-3">
                                      <input
                                        className="form-check-input"
                                        type="radio"
                                        checked={!creditTenancy}
                                        onChange={(e) =>
                                          setCreditTenancy(false)
                                        }
                                        disabled
                                      />
                                      <label
                                        className="form-check-label"
                                        htmlFor="debit-no"
                                      >
                                        No
                                      </label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {creditTenancy && (
                              <div className="row">
                                <div className="col-7">
                                  <div className="mb-4 ">
                                    <label htmlFor="agreement-type">
                                      Select tenant's premises
                                    </label>
                                    <select
                                      className="form-control"
                                      title="Select tenant"
                                      required={true}
                                      disabled
                                    >
                                      {tenancies?.map((item, index) => (
                                        <option
                                          value={parseInt(item.id)}
                                          key={item.id}
                                          defaultValue={item.id === tenancyId}
                                        >
                                          {
                                            item.premiseUnit?.premise
                                              ?.premiseName
                                          }
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>

                                <div className="col-5 ">
                                  <div className="mb-4 ">
                                    <label htmlFor="agreement-type">
                                      Hse/Unit No.
                                    </label>
                                    <select className="form-control " disabled>
                                      {tenancies?.map((item, index) => (
                                        <option
                                          value={parseInt(item.id)}
                                          key={item.id}
                                          defaultValue={item.id === tenancyId}
                                        >
                                          {item.premiseUnit?.unitName +
                                            " - " +
                                            item.premiseUnit?.unitType.name}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* <!-- landlord's credit note --> */}

                          {/* <!-- invoices credit note --> */}

                          <div className="row">
                            <div className="col-12 ">
                              <div className="mb-4 ">
                                <label
                                  for="agreement-type "
                                  className="text-capitalize"
                                >
                                  Reason for creating the Debit Note
                                </label>
                                <textarea
                                  name=" "
                                  placeholder="Enter the reason"
                                  id=""
                                  cols="30"
                                  rows="3"
                                  className="form-control"
                                  required={true}
                                  maxLength="255"
                                  onChange={(e) => setReason(e.target.value)}
                                ></textarea>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="mb-3">
                                <label htmlFor="" className="form-label">
                                  Amount To Debit
                                </label>
                                <input
                                  type="text"
                                  className="form-control credit-amount"
                                  id=""
                                  placeholder="KES"
                                  onChange={(e) => setAmount(e.target.value)}
                                  required={true}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="col-12">
                            <div className="">
                              {creditTenancy && (
                                <button
                                  type="button"
                                  onClick={showInvoice}
                                  disabled={amount === "" || reason === ""}
                                  className="btn btn-success w-md"
                                >
                                  Next
                                </button>
                              )}
                              {!creditTenancy && (
                                <button
                                  type="button"
                                  onClick={handleFinalSubmit}
                                  disabled={amount === "" || reason === ""}
                                  className="btn btn-success w-md"
                                >
                                  Create Debit Note
                                </button>
                              )}
                              {error.color !== "" && (
                                <div
                                  className={"mt-1 alert alert-" + error.color}
                                  role="alert"
                                >
                                  {error.message}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- end card body --> */}
              </div>
              {/* <!-- end card --> */}
            </div>
            {/* <!-- end col --> */}
          </div>

          {/* <!-- end row --> */}
        </div>
        {/* <!-- container-fluid --> */}
      </div>
      {/* <!-- End Page-content --> */}

      {/*MODAL START*/}
      <Modal
        show={debitShow}
        onHide={hideDebitModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <h5 className="modal-title" id="myLargeModalLabel">
            Create Debit Note
          </h5>
        </Modal.Header>
        <Modal.Body>
          <div className="col-lg-12">
            <div className="card-body p-2">
              <h4 className="card-title mb-4">Enter the debit note details</h4>
              <div className="row">
                <div className="text-center pt-2">
                  <div className="row justify-content-end">
                    <div className="col-xl-12">
                      <div className="row">
                        <div className="col-12">
                          <>
                            <form
                              onSubmit={handleSubmit}
                              id={"debit-search-form"}
                            >
                              <div className="app-search d-none d-lg-block d-flex">
                                <div className="position-relative">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={"Search Landlord"}
                                    required={true}
                                    onChange={(e) =>
                                      setSearchTerm(e.target.value)
                                    }
                                  />
                                  <span className="bx bx-search-alt"></span>
                                </div>
                              </div>
                            </form>
                            <div className="form-group">
                              <div className="d-flex align-items-center justify-content-center">
                                <div className="text-end">
                                  <button
                                    form={"debit-search-form"}
                                    type="submit"
                                    disabled={loading2 || searchTerm === ""}
                                    className="btn btn-primary btn-rounded"
                                  >
                                    {loading2 && (
                                      <i
                                        className="fa fa-refresh fa-spin"
                                        style={{ marginRight: "5px" }}
                                      />
                                    )}
                                    {loading2 && (
                                      <>
                                        <span className="d-none d-sm-inline-block me-2">
                                          Searching...
                                        </span>
                                      </>
                                    )}
                                    {!loading2 && (
                                      <>
                                        <span className="d-none d-sm-inline-block me-2">
                                          Search
                                        </span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        </div>
                        <>
                          <div className={"mt-2 mb-2"}>
                            {fetched && landlords.length < 1 && (
                              <span className={"text-danger"}>
                                Landlord not found!
                              </span>
                            )}
                            {fetched && landlords.length > 5 && (
                              <span className={"text-danger"}>
                                Too many results. Specify a landlord name
                              </span>
                            )}
                            <span className={"text-" + error.color}>
                              {error.message}
                            </span>
                          </div>
                          <div className="overflow-visible">
                            <table className="table align-middle table-hover contacts-table table-striped ">
                              <thead className="table-light">
                                {landlords.length > 0 && landlords.length <= 5 && (
                                  <tr>
                                    <th width="8px">Select</th>
                                    <th span={"col-6"}>Landlord Type</th>
                                    <th span={"col-3"}>Name</th>
                                    <th span={"col-3"}>Email</th>
                                  </tr>
                                )}
                              </thead>
                              <tbody>
                                {landlords.length > 0 && (
                                  <>
                                    {landlords.length <= 5 && (
                                      <>
                                        {landlords?.map((item) => (
                                          <tr key={item.id}>
                                            <td>
                                              <div className="d-flex  align-items-center">
                                                <div className="the-mail-checkbox pr-4">
                                                  <input
                                                    className="form-check-input mt-0 pt-0 form-check-dark"
                                                    type="checkbox"
                                                    id="formCheck1"
                                                    onChange={() => {
                                                      autofill(item);
                                                    }}
                                                    checked={
                                                      loaded &&
                                                      item.id === landlordId
                                                    }
                                                  />
                                                </div>
                                              </div>
                                            </td>
                                            <td>{item.landLordType}</td>
                                            <td className="text-capitalize">
                                              <a href="javascript:void(0)">
                                                {item.firstName} {item.lastName}
                                              </a>
                                            </td>
                                            <td>{item.email}</td>
                                          </tr>
                                        ))}
                                      </>
                                    )}
                                  </>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className=" col-12 ">
                <div className="mb-1 ">
                  <label className="text-capitalize ">
                    Debit this amount to the tenant
                  </label>
                  <div className="row ">
                    <div className="col-auto ">
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          checked={creditTenancy}
                          onChange={() => setCreditTenancy(true)}
                        />
                        <label className="form-check-label" htmlFor="debit-yes">
                          Yes
                        </label>
                      </div>
                    </div>

                    <div className="col-auto ">
                      <div className="form-check mb-3">
                        <input
                          className="form-check-input"
                          type="radio"
                          checked={!creditTenancy}
                          onChange={(e) => setCreditTenancy(false)}
                        />
                        <label className="form-check-label" htmlFor="debit-no">
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {creditTenancy && (
                <div className="row">
                  <div className="col-7">
                    <div className="mb-4 ">
                      <label htmlFor="agreement-type">
                        Select tenant's premises
                      </label>
                      <select
                        className="form-control"
                        title="Select tenant"
                        defaultValue={premiseId}
                        onChange={(e) => setPremiseId(e.target.value)}
                        required={true}
                      >
                        <option value="">Select premises..</option>
                        {premises?.map((item, index) => (
                          <option value={parseInt(item.id)} key={item.id}>
                            {item.premiseName}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-5 ">
                    <div className="mb-4 ">
                      <label htmlFor="agreement-type">Hse/Unit No.</label>
                      <select
                        className="form-control"
                        title="Select tenant"
                        required={true}
                        defaultValue={tenancyId}
                        onChange={(e) => settenancyId(e.target.value)}
                        disabled={tenancies?.length === 0}
                      >
                        <option value="">Select units...</option>
                        {tenancies?.map((item, index) => (
                          <option value={parseInt(item.id)} key={item.id}>
                            {item.premiseUnit?.unitName +
                              " - " +
                              item.premiseUnit?.unitType.name}
                            {item.id}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
              <div className="col-12">
                <div
                  className="col-12 d-flex justify-content-end"
                  style={{
                    minHeight: "40px",
                    maxHeight: "50px",
                  }}
                >
                  {creditTenancy && (
                    <button
                      className="btn btn-primary cursor-pointer"
                      type={"button"}
                      onClick={hideDebitModal}
                      disabled={tenancyId === undefined}
                    >
                      Continue
                    </button>
                  )}
                  {!creditTenancy && (
                    <button
                      className="btn btn-primary cursor-pointer"
                      type={"button"}
                      onClick={hideDebitModal}
                      disabled={landlordId === undefined}
                    >
                      Continue
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="modal-body loading-cont">
            <div className="row">
              <div className="col-12 mt-5 mb-5">
                <div className="d-flex justify-content-center align-items-center justify-content-center flex-column">
                  <div
                    className="spinner-border text-info m-1 mb-4"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                  <div className="text-center">
                    <h4 className="text-uppercase text-info">loading</h4>
                    <p>Please wait as your request is being processed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-body d-none">
            <div className="text-center mt-5 mb-5">
              <div className="avatar-md mx-auto mb-4 ">
                <div className="avatar-title bg-light rounded-circle text-success h1 ">
                  <i className="mdi mdi-check-bold "></i>
                </div>
              </div>

              <div className="row justify-content-center ">
                <div className="col-xl-10 ">
                  <h4 className="text-success text-uppercase">
                    Created successfully
                  </h4>
                  <p className="text-muted  mb-4 ">
                    The credit note has been created successfully
                  </p>
                </div>
                <div className="col-10">
                  <a
                    href="src/pages/credits&debits/CreateDebitNote#"
                    type="button"
                    className="btn btn-primary waves-effect waves-light w-100 text-capitalize"
                  >
                    <i className="mdi mdi-printer font-size-18 align-middle me-2"></i>{" "}
                    Print Debit Note
                  </a>
                  <a
                    href="src/pages/credits&debits/CreateDebitNote#"
                    type="button"
                    className="btn btn-primary waves-effect waves-light w-100 text-capitalize mt-3"
                  >
                    <i className="mdi mdi-printer font-size-18 align-middle me-2"></i>{" "}
                    Print Debit Note
                  </a>

                  <button
                    type="button"
                    className="btn btn-outline-secondary waves-effect waves-light w-100 mt-3 text-capitalize stay-on-page"
                  >
                    <i className="mdi mdi-window-close font-size-18 align-middle me-2"></i>{" "}
                    Close this section
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <div
        className="modal fade"
        id="creditNoteModalLoad"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header border-bottom-0 d-none">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body loading-cont">
              <div className="row">
                <div className="col-12 mt-5 mb-5">
                  <div className="d-flex justify-content-center align-items-center justify-content-center flex-column">
                    <div
                      className="spinner-border text-info m-1 mb-4"
                      role="status"
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                    <div className="text-center">
                      <h4 className="text-uppercase text-info">loading</h4>
                      <p>Please wait as your request is being processed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body d-none">
              <div className="text-center mt-5 mb-5">
                <div className="avatar-md mx-auto mb-4 ">
                  <div className="avatar-title bg-light rounded-circle text-success h1 ">
                    <i className="mdi mdi-check-bold "></i>
                  </div>
                </div>

                <div className="row justify-content-center ">
                  <div className="col-xl-10 ">
                    <h4 className="text-success text-uppercase">
                      Created successfully
                    </h4>
                    <p className="text-muted  mb-4 ">
                      The credit note has been created successfully
                    </p>
                  </div>
                  <div className="col-10">
                    <a
                      href="#"
                      type="button"
                      className="btn btn-primary waves-effect waves-light w-100 text-capitalize"
                    >
                      <i className="mdi mdi-printer font-size-18 align-middle me-2"></i>{" "}
                      Print Debit Note
                    </a>
                    <a
                      href="#"
                      type="button"
                      className="btn btn-primary waves-effect waves-light w-100 text-capitalize mt-3"
                    >
                      <i className="mdi mdi-printer font-size-18 align-middle me-2"></i>{" "}
                      Print Debit Note
                    </a>

                    <button
                      type="button"
                      className="btn btn-outline-secondary waves-effect waves-light w-100 mt-3 text-capitalize stay-on-page"
                    >
                      <i className="mdi mdi-window-close font-size-18 align-middle me-2"></i>{" "}
                      Close this section
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*DEBIT MODE*/}
      <Modal show={invoice_show} onHide={closeInvoice} size="lg" centered>
        <Modal.Header closeButton>
          <h5 className="modal-title" id="myLargeModalLabel">
            Distribute the Debited amount to the correct invoice accounts
          </h5>
        </Modal.Header>
        <Modal.Body>
          <StatusBadge type={transactions?.transaction?.paymentStatus} />
          <div className="col-12">
            <address>
              <strong>Billed To:</strong>
              <br />
              {transactions?.transaction?.tenantName} <br />
              {/*{activeInvoice?.transactionCustomerEmail}<br/>*/}
              {transactions?.transaction?.premiseName} -{" "}
              {transactions?.transaction?.premiseUnitName}
              <br />
              <br />
              {moment(transactions?.transaction?.invoiceDate).format(
                "dddd, MMMM Do YYYY, h:mm a"
              )}
            </address>
            {/*<p>Title: {activeInvoice?.transactionTitle}</p>*/}
            <p>
              Description: {transactions?.transaction?.invoicePeriodDescription}
            </p>
          </div>
          <div className="col-12">
            <div className="py-2 mt-3">
              <h3 className="font-size-15 fw-bold">
                Charges Breakdown ({" "}
                <span className="text-primary fw-medium">
                  {transactions?.transaction?.transactionId}
                </span>
                )
              </h3>
            </div>
          </div>
          <div className="col-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th style={{ width: "70px" }}>No.</th>
                  <th>Charge name</th>
                  <th>Quantity</th>
                  <th>Unit Cost</th>
                  <th>Paid Amount</th>
                  <th></th>
                  <th className={"text-end"}>Bill Amount</th>
                  <th className="" style={{ width: "150px" }}>
                    Assign Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions?.length > 0 &&
                  transactions?.map((item, index) => (
                    <tr data-id={item.id} key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.applicableChargeName}</td>
                      <td>{item.quantity}</td>
                      <td>{formatCurrency(item.unitCost)}</td>
                      <td>{formatCurrency(item.billPaidAmount)}</td>
                      <td></td>
                      <td className="text-end">
                        {formatCurrency(item.billAmount)}
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control form-control-sm text-right"
                          // placeholder="Input amount"
                          placeholder="KES"
                          onChange={(e) => handleForm(e, index, item)}
                        />
                      </td>
                    </tr>
                  ))}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td colSpan="2" className="text-end">
                    Total
                  </td>
                  <td className="text-end fw-bold">{formatCurrency(amount)}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td colSpan="2" className="text-end">
                    Paid
                  </td>
                  <td className="text-end fw-bold">
                    {formatCurrency(debitTotal())}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td colSpan="2" className="text-end">
                    <strong>Balance</strong>
                  </td>
                  <td className="text-end fw-bold">
                    {formatCurrency(parseInt(amount) - debitTotal())}
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td colSpan={"2"} className="text-end"></td>
                  <td className="text-end fw-bold text-danger">
                    {debitTotal() > amount ? (
                      <>
                        <span>Amount exceeded!</span>
                      </>
                    ) : (
                      <></>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-12">
            <div className="alert alert-warning" role="alert">
              <i className="mdi mdi-alert-outline me-2 "></i> A debit note with
              these details will be created and information will be sent to the
              tenant on the same via SMS
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="float-end">
            <button
              onClick={handleFinalSubmit}
              disabled={parseInt(amount) < debitTotal()}
              className="btn btn-primary w-md waves-effect waves-light submit-credit-details"
            >
              Submit Details
            </button>
          </div>
          {error.color !== "" && (
            <div className={"alert alert-" + error.color} role="alert">
              {error.message}
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateDebitNote;
