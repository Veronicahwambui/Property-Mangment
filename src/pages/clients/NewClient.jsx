/* global $ */
import React, { useEffect, useState } from "react";
import requestsServiceService from "../../services/requestsService.service";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from "react-router-dom";

export default function NewClient() {
  const [clientTypes, setClientTypes] = useState([]);
  const [clients, setClients] = useState([]);
  const [tenancyStatuses, setTenancyStatuses] = useState([]);

  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [othername, setOtherName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [clientUrl, setClientUrl] = useState("");
  const [clientTypeId, setClientTypeId] = useState(null);
  const [tenancyStatus, setTenancyStatus] = useState("");
  const [clientAdd, setClientAdd] = useState(true);
  const [clientType, setClientType] = useState({
    name: "",
    id: "",
  });
  const [name, setName] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };


  const navigate = useNavigate();
  const [banks, setBanks] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [bankName, setBankName] = useState("");
  const [bankAccountNumber, setbankAccountNumber] = useState("");
  const [bankId, setbankId] = useState(null);
  const [percentageRemuneration, setPercentageRemuneration] = useState(null);
  const setbankAccountDetails = (value) => {
    setbankId(value.split(":")[0]);
    setBankName(value.split(":")[1]);
  };
  useEffect(() => {
    requestsServiceService.getClientTypes().then((res) => {
      setClientTypes(res.data.data);
    });
    requestsServiceService.getBanks().then((res) => {
      setBanks(res.data.data);
    });
    requestsServiceService.getTenancyStatuses().then((res) => {
      setTenancyStatuses(res.data.data);
    });
    getAllClients();
  }, []);

  const getAllClients = () => {
    requestsServiceService.getClients().then((res) => {
      setClients(res.data.data);
    });
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [editAccountShow, seteditAccountShow] = useState(false);
  const handleEditAccountShow = () => seteditAccountShow(true);
  const handleEditAccountClose = () => seteditAccountShow(false);
  const editBankAccountDetails = (value) => {
    setEditBankId(value.split(":")[0]);
    setEditBankName(value.split(":")[1]);
  };
  const [editBankId, setEditBankId] = useState(null);
  const [editBankName, setEditBankName] = useState("");
  const [editBankAccount, setEditBankAccount] = useState("");
  const [editpercentageRemuneration, setEditPercentageRemuneration] =
    useState(null);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [arr_index, setArr_Index] = useState(0);
  const getOneAccount = (id) => {
    let acc = accounts.find((account) => account.bankId == id);
    setEditBankName(acc.bankName);
    setEditPercentageRemuneration(acc.percentageRemuneration);
    setEditBankAccount(acc.bankAccountNumber);
    setEditBankId(acc.bankId);
    handleEditAccountShow();
  };

  const handleEditAccount = (event) => {
    event.preventDefault();
    let data = {
      bankName: editBankName,
      active: true,
      bankAccountNumber: editBankAccount,
      bankId: editBankId,
      id: null,
      clientId: null,
      percentageRemuneration: editpercentageRemuneration,
    };
    let d = accounts;
    d[arr_index] = data;
    setAccounts(d);
    handleEditAccountClose();
  };
  const [error, setError] = useState({
    message: "",
    color: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      adminEmail: email,
      adminFirstName: firstname,
      adminLastName: lastname,
      adminOtherName: othername,
      adminPhoneNumber: phone,
      adminUserName: username,
      clientBaseUrl: clientUrl,
      clientTypeId: clientTypeId,
      createAdminUser: isChecked,
      unitVacancyRestrictionStatus: tenancyStatus,
      name: name,
      id: null,
      status: true,
    };
    const clientdata = JSON.stringify({
      clientAccounts: accounts,
      clientDTo: data,
    });
    requestsServiceService
      .createClient(clientdata, isChecked)
      .then((res) => {
        console.log(res);
        if (res.data.status == true) {
          confirmAlert({
            message: res.data.message,
            buttons: [
              {
                label: "OK",
                onClick: (e) => {
                  navigate("/clients", { replace: true });
                },
              },
            ],
          });
        } else {
          confirmAlert({
            message: res.data.message,
            buttons: [{ label: "OK" }],
          });
        }
      })
      .catch((err) => {
        confirmAlert({
          message: err.message,
          buttons: [{ label: "OK" }],
        });
      });
  };
  const handleAccountSubmit = (event) => {
    event.preventDefault();
    let data = {
      bankName: bankName,
      active: true,
      bankAccountNumber: bankAccountNumber,
      bankId: bankId,
      id: null,
      clientId: null,
      percentageRemuneration: percentageRemuneration,
    };
    setAccounts((accounts) => [...accounts, data]);
    setbankAccountNumber("");
    setBankName("");
    setbankId(null);
    setPercentageRemuneration(0);
    setShow(false);
  };

  // LOADER ANIMATION
  useEffect(() => {
    $("#spinner").removeClass("d-none");
    setTimeout(() => {
      $("#spinner").addClass("d-none");
    }, 1000);
  }, [])

  // reset link 

  const [ useThisPortal, setUseThisPortal] = useState( false );
  const handleUseThisPortal = () => {
    setUseThisPortal(!useThisPortal);

    if (!useThisPortal) {
      let url = window.location.origin + "/#/resetpassword"
      setClientUrl(url)
    } else {
      setClientUrl(undefined)
    }
  };

  return (
    <>
      <div className="page-content">
        <div className="content-fluid">
          {/* <!-- start page title --> */}
          <div className="row">
            {/* <!-- Loader --> */}
            <div id="spinner">
              <div id="status">
                <div class="spinner-chase">
                  <div class="chase-dot"></div>
                  <div class="chase-dot"></div>
                  <div class="chase-dot"></div>
                  <div class="chase-dot"></div>
                  <div class="chase-dot"></div>
                  <div class="chase-dot"></div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18 text-capitalize">
                  Client Registration
                </h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="property-list.html">Clients</a>
                    </li>
                    <li className="breadcrumb-item active">Add a Client</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {error.color !== "" && (
              <div className={"alert alert-" + error.color} role="alert">
                {error.message}
              </div>
            )}
            <div className="col-lg-12">
              <div className="card">
                <div className="card-body">
                  <div className="create-property" id="kev-step-form">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                      <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                      >
                        <span className="navbar-toggler-icon"></span>
                      </button>
                      <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                      >
                        <ul className="navbar-nav mr-auto">
                          <li className="nav-item active">
                            <a className="nav-link active" href="#">
                              1. Client details{" "}
                              <span className="sr-only">(current)</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" >
                              2. Account details
                            </a>
                          </li>
                        </ul>
                      </div>
                    </nav>
                    {/*section add client details*/}
                    <form id="client-form" onSubmit={handleSubmit}>
                      <section className={"step-cont active-step"}>
                        <p>
                          Fill in the form correctly. Fields with an Asterisk{" "}
                          <strong className="text-danger">*</strong> are
                          mandatory fields.
                        </p>
                        <div className="col-12">
                          <div className="bg-primary border-2 bg-soft p-3 mb-4">
                            <p className="fw-semibold mb-0 pb-0 text-uppercase">
                              Client details
                            </p>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="mb-3">
                              <label
                                htmlFor="landlord-type"
                                className="form-label"
                              >
                                Client type.{" "}
                                <strong className="text-danger">*</strong>
                              </label>
                              {clientTypes && (
                                <div className="form-group mb-4">
                                  <select
                                    className="form-control"
                                    onChange={(e) =>
                                      setClientTypeId(e.target.value)
                                    }
                                    required={true}
                                  >
                                    <option className="text-black font-semibold ">
                                      Select client type
                                    </option>
                                    {clientTypes?.map((client, index) => (
                                      <option
                                        key={client.id}
                                        value={parseInt(client.id)}
                                      >
                                        {client.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              )}
                            </div>
                          </div>
                        
                        </div>
                        <div className="row personal-landlord ">
                          <div className="col-12">
                            <div className="bg-primary border-2 bg-soft p-3 mb-4">
                              <p className="fw-semibold mb-0 pb-0 text-uppercase">
                                Personal details
                              </p>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="mb-4">
                              <label htmlFor="">
                                Name. <strong className="text-danger">*</strong>
                              </label>
                              <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                                placeholder="Enter client name"
                                required
                              />
                            </div>
                          </div>
                       
                      
                         <div className="col-lg-6 col-md-6">
                            <div  className="mb-4">
                              <label htmlFor="" className="d-flex gap-lg-4">
                                <div>
                                Reset password link.<strong className="text-danger">*</strong>
                                </div>
                                <div className={"col-lg-auto col-md-auto my-auto"}>
                            <input
                              type="checkbox"
                              checked={useThisPortal}
                              onChange={handleUseThisPortal}
                              className='mx-1'
                            />
                            Use this portal 
                          </div>
                              </label>
                            { !useThisPortal && 
                              <input
                                type="url"
                                value={clientUrl}
                                onChange={(e) => setClientUrl(e.target.value)}
                                className="form-control"
                                placeholder="Enter reset url"
                                required
                              />
                            }
                            </div>
                            
                          </div>
                          <div className={"col-lg-12 col-md-12  pb-3"}>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={handleOnChange}
                            />
                            Create admin
                          </div>
                          {isChecked && (
                            <div className="col-12">
                              <div className="bg-primary border-2 bg-soft p-3 mb-4">
                                <p className="fw-semibold mb-0 pb-0 text-uppercase">
                                  Admin details
                                </p>
                              </div>
                              <div className="row">
                                <div className="col-6">
                                  <div className="form-group mb-4">
                                    <label htmlFor="">
                                      Email.{" "}
                                      <strong className="text-danger">*</strong>
                                    </label>
                                    <input
                                      type="email"
                                      value={email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      className="form-control"
                                      placeholder="Enter admin email"
                                      required={true}
                                    />
                                  </div>
                                  <div className="form-group mb-4">
                                    <label htmlFor="">
                                      Username.{" "}
                                      <strong className="text-danger">*</strong>
                                    </label>
                                    <input
                                      type="text"
                                      value={username}
                                      onChange={(e) =>
                                        setUsername(e.target.value)
                                      }
                                      className="form-control"
                                      placeholder="Enter admin username"
                                      required={true}
                                    />
                                  </div>
                                  <div className="form-group mb-4">
                                    <label htmlFor="">Other Name</label>
                                    <input
                                      type="text"
                                      value={othername}
                                      onChange={(e) =>
                                        setOtherName(e.target.value)
                                      }
                                      className="form-control"
                                      placeholder="Enter admin username"
                                    />
                                  </div>
                                </div>
                                <div className="col-6">
                                  <div className="form-group mb-4">
                                    <label htmlFor="">
                                      Phone Number.{" "}
                                      <strong className="text-danger">*</strong>
                                    </label>
                                    <input
                                      type="text"
                                      value={phone}
                                      onChange={(e) => setPhone(e.target.value)}
                                      className="form-control"
                                      placeholder="Enter admin phone number"
                                      required={true}
                                    />
                                  </div>
                                  <div className="form-group mb-4">
                                    <label htmlFor="">
                                      First Name.{" "}
                                      <strong className="text-danger">*</strong>
                                    </label>
                                    <input
                                      type="text"
                                      value={firstname}
                                      onChange={(e) =>
                                        setFirstName(e.target.value)
                                      }
                                      className="form-control"
                                      placeholder="Enter admin first name"
                                      required={true}
                                    />
                                  </div>
                                  <div className="form-group mb-4">
                                    <label htmlFor="">
                                      Last Name.{" "}
                                      <strong className="text-danger">*</strong>
                                    </label>
                                    <input
                                      type="text"
                                      value={lastname}
                                      onChange={(e) =>
                                        setLastName(e.target.value)
                                      }
                                      className="form-control"
                                      placeholder="Enter admin lastname"
                                      required={true}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </section>

                      {/*add bank accounts*/}
                      <section className={"step-cont d-none"}>
                        <div className="col-12">
                          <div className="bg-primary border-2 bg-soft p-3 mb-4">
                            <p className="fw-semibold mb-0 pb-0 text-uppercase">
                              CLIENT ACCOUNT DETAILS
                            </p>
                          </div>
                          <div className="table-responsive table-responsive-md">
                            <table className="table table-editable-1 align-middle table-edits">
                              <thead className="table-light">
                                <tr className="text-uppercase table-dark">
                                  <th>#</th>
                                  <th>Bank</th>
                                  <th className="">Bank Acc</th>
                                  <th className="">% Remuneration</th>
                                  <th>Status</th>
                                  <th>Actions</th>
                                  <th></th>
                                </tr>
                              </thead>
                              <tbody>
                                {accounts.length > 0 &&
                                  accounts.map((account, index) => {
                                    return (
                                      <tr data-id="1">
                                        <td style={{ width: "80px" }}>
                                          {index + 1}
                                        </td>
                                        <td>{account.bankName}</td>
                                        <td>{account.bankAccountNumber}</td>
                                        <td>
                                          {account.percentageRemuneration}
                                        </td>
                                        <td data-field="unit-num ">
                                          {account.active ? (
                                            <span className="badge-soft-success badge">
                                              Active
                                            </span>
                                          ) : (
                                            <span className="badge-soft-danger badge">
                                              Inactive
                                            </span>
                                          )}
                                        </td>
                                        <td className="text-right cell-change text-nowrap ">
                                          <div className="d-flex">
                                            <a
                                              data-bs-toggle="modal"
                                              onClick={() =>
                                                getOneAccount(account.bankId)
                                              }
                                              data-bs-target="#update-modal"
                                              className="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit "
                                              title="Edit "
                                            >
                                              <i className="bx bx-edit-alt "></i>
                                            </a>
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                              <tfoot>
                                <tr>
                                  <td colSpan="7" onClick={handleShow}>
                                    <span className="d-flex align-items-center ">
                                      <i className="dripicons-plus mr-5 d-flex justify-content-center align-items-center font-21 "></i>
                                      <span className="pl-5 ">Add A Bank</span>
                                    </span>
                                  </td>
                                </tr>
                              </tfoot>
                            </table>
                          </div>
                        </div>
                      </section>
                    </form>
                    <div className="button-navigators">
                      <button
                        disabled
                        className="btn btn-primary waves-effect kev-prev me-2"
                      >
                        <i className="mdi-arrow-left mdi font-16px ms-2 me-2"></i>{" "}
                        Previous{" "}
                      </button>
                      <button className="btn btn-primary waves-effect kev-nxt me-2">
                        Next{" "}
                        <i className="mdi mdi-arrow-right font-16px ms-2 me-2"></i>
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success kev-submit me-2 d-none"
                        form={"client-form"}
                      >
                        Submit{" "}
                        <i className="mdi mdi-check-all me-2 font-16px"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          className={"modal fade"}
          centered
        >
          <form onSubmit={handleAccountSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Add account details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-12">
                  <div className="form-group mb-4">
                    <label htmlFor="">
                      Select Bank. <strong className="text-danger ">*</strong>
                    </label>
                    <select
                      className="form-control"
                      onChange={(e) => {
                        setbankAccountDetails(e.target.value);
                      }}
                      name="bank account"
                      required={true}
                    >
                      <option className="text-black font-semibold ">
                        select..
                      </option>
                      {banks?.map((bank) => {
                        return (
                          <option
                            key={bank.id}
                            value={bank?.id + ":" + bank.bankName}
                          >
                            {bank?.bankName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="">
                      Bank account number.{" "}
                      <strong className="text-danger ">*</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={bankAccountNumber}
                      onChange={(e) => setbankAccountNumber(e.target.value)}
                      placeholder="Enter account number"
                      required={true}
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="">
                      Percentage renumeration.{" "}
                      <strong className="text-danger ">*</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={percentageRemuneration}
                      onChange={(e) =>
                        setPercentageRemuneration(e.target.value)
                      }
                      placeholder="Enter % renumeration"
                      required={true}
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                className={"btn btn-grey"}
                onClick={handleClose}
              >
                Close
              </Button>
              <Button
                variant="primary"
                className={"btn btn-primary"}
                type={"submit"}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
        <div>
          <Modal
            show={editAccountShow}
            onHide={handleEditAccountClose}
            className={"modal fade"}
            centered
          >
            <form onSubmit={handleEditAccount}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Account</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="row">
                  <div className="col-12">
                    <div className="form-group mb-4">
                      <label htmlFor="">
                        Select Bank.<strong className="text-danger ">*</strong>
                      </label>
                      <select
                        className="form-control"
                        onChange={(e) => {
                          editBankAccountDetails(e.target.value);
                        }}
                        name="bank account"
                        required={true}
                      >
                        <option className="text-black font-semibold ">
                          {editBankName}
                        </option>
                        {banks?.map((bank) => {
                          return (
                            <option
                              key={bank.id}
                              value={bank.id + ":" + bank.bankName}
                            >
                              {bank.bankName}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">
                        Bank account number.{" "}
                        <strong className="text-danger ">*</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={editBankAccount}
                        onChange={(e) => setEditBankAccount(e.target.value)}
                        placeholder="Enter account number"
                        required={true}
                      />
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">
                        Percentage renumeration.{" "}
                        <strong className="text-danger ">*</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={editpercentageRemuneration}
                        onChange={(e) =>
                          setEditPercentageRemuneration(e.target.value)
                        }
                        placeholder="Enter % renumeration"
                        required={true}
                      />
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  className={"btn btn-grey"}
                  onClick={handleEditAccountClose}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  className={"btn btn-primary"}
                  type={"submit"}
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
}
