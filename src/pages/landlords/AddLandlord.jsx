import React, { useEffect, useState } from "react";
import requestsServiceService from "../../services/requestsService.service";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

export default function AddLandlord() {
  const [agreementTypes, setAgreementTypes] = useState([]);
  const [banks, setBanks] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [bankName, setBankName] = useState("");
  const [landlordtypes, setlandlordtypes] = useState([]);
  const [documentTypes, setdocumentTypes] = useState([]);
  const [landlordDocuments, setLandlordDocuments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    requestsServiceService.getAllAgreementTypes().then((res) => {
      setAgreementTypes(res.data.data);
    });
    requestsServiceService.getBanks().then((res) => {
      setBanks(res.data.data);
    });
    requestsServiceService.getLandlordTypes().then((res) => {
      setlandlordtypes(res.data.data);
    });
    requestsServiceService.getDocumentTypes().then((res) => {
      setdocumentTypes(res.data.data);
    });
  }, []);

  //landlord details
  const [agreementPeriod, setagreementPeriod] = useState(null);
  const [email, setEmail] = useState("");
  const [fileNumber, setFileNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otherName, setOtherName] = useState("");
  const [gender, setGender] = useState("");
  const [landLordAgreementTypeId, setlandLordAgreementTypeId] = useState(null);
  const [landLordTypeName, setLandLordTypeName] = useState("");
  const [idNumber, setidNumber] = useState("");
  const [remunerationPercentage, setremunerationPercentage] = useState(null);
  const [phoneNumber, setphoneNumber] = useState("");

  //modals
  const [show, setShow] = useState(false);
  const [docShow, setdocShow] = useState(false);

  const [editAccountShow, seteditAccountShow] = useState(false);
  const [editDocShow, seteditDocShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleDocShow = () => setdocShow(true);
  const handleDocClose = () => setdocShow(false);

  const handleEditShow = () => seteditDocShow(true);
  const handleEditClose = () => seteditDocShow(false);

  const handleEditAccountShow = () => seteditAccountShow(true);
  const handleEditAccountClose = () => seteditAccountShow(false);

  // document details
  const [docName, setdocName] = useState("");
  const [document, setdocument] = useState("");
  const [documentTypeId, setdocumentTypeId] = useState(null);

  const [bankAccountNumber, setbankAccountNumber] = useState("");
  const [bankId, setbankId] = useState(null);
  const [percentageRemuneration, setPercentageRemuneration] = useState(null);

  const setbankAccountDetails = (value) => {
    setbankId(value.split(":")[0]);
    setBankName(value.split(":")[1]);
  };
  const editBankAccountDetails = (value) => {
    setEditBankId(value.split(":")[0]);
    setEditBankName(value.split(":")[1]);
  };

  //bank edits
  const [editBankId, setEditBankId] = useState(null);
  const [editBankName, setEditBankName] = useState("");
  const [editBankAccount, setEditBankAccount] = useState("");
  const [editpercentageRemuneration, setEditPercentageRemuneration] =
    useState(null);
  const [selectedAccount, setSelectedAccount] = useState({});
  const [arr_index, setArr_Index] = useState(0);

  const getOneAccount = (id) => {
    setArr_Index(id);
    setEditBankName(selectedAccount.bankName);
    handleEditAccountShow();
  };
  const areAllFieldsFilled =
    email !== "" &&
    phoneNumber !== "" &&
    remunerationPercentage !== undefined &&
    phoneNumber !== "" &&
    fileNumber !== "" &&
    landLordAgreementTypeId !== null &&
    agreementPeriod !== null;

  useEffect(() => {
    console.log(areAllFieldsFilled);
  }, [areAllFieldsFilled]);
  const handleDocumentSubmit = (event) => {
    event.preventDefault();
    let data = {
      docName: docName,
      document: document,
      documentOwnerTypeName: "LANDLORD",
      documentTypeId: documentTypeId,
      id: null,
      ownerEntityId: null,
    };
    setLandlordDocuments((landlordDocuments) => [...landlordDocuments, data]);
    handleDocClose();
  };

  const getDoc = (id) => {
    console.log(accounts[id]);
  };

  const handleEditDocument = (event) => {
    event.preventDefault();
    console.log(accounts);
  };
  const [error, setError] = useState({
    message: "",
    color: "",
  });

  //accounts edit

  const handleEditAccount = (event) => {
    event.preventDefault();
    let data = {
      bankName: editBankName,
      active: true,
      bankAccountNumber: editBankAccount,
      bankId: editBankId,
      id: null,
      landLordId: null,
      percentageRemuneration: editpercentageRemuneration,
    };
    let d = accounts;
    d[arr_index] = data;
    setAccounts(d);
    handleEditAccountClose();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      active: true,
      agreementPeriod: agreementPeriod,
      email: email,
      fileNumber: fileNumber,
      firstName: firstName,
      gender: gender,
      id: null,
      idNumber: idNumber,
      landLordAgreementTypeId: landLordAgreementTypeId,
      landLordTypeName: landLordTypeName,
      lastName: lastName,
      otherName: otherName,
      phoneNumber: phoneNumber,
      remunerationPercentage: remunerationPercentage,
    };
    let new_t = {
      documents: landlordDocuments,
      landLord: data,
      landLordAccounts: accounts,
    };
    requestsServiceService
      .createLandLord(new_t)
      .then((res) => {
        if (res.data.status === true) {
          confirmAlert({
            message: res.data.message,
            buttons: [
              {
                label: "OK",
                onClick: (e) => {
                  navigate("/landlords", { replace: true });
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
  const removeDoc = (id) => {
    setLandlordDocuments(
      landlordDocuments.filter((landlorddoc) => landlorddoc.docName !== id)
    );
  };

  const handleFileRead = async (event) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    setdocument(base64);
  };
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
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
      landLordId: null,
      percentageRemuneration: percentageRemuneration,
    };
    setAccounts((accounts) => [...accounts, data]);
    setbankAccountNumber("");
    setBankName("");
    setbankId(null);
    setPercentageRemuneration(0);
    setShow(false);
  };
  return (
    <>
      <div className="page-content">
        <div className="content-fluid">
          {/* <!-- start page title --> */}
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18 text-capitalize">
                  Landlord Registration
                </h4>

                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="property-list.html">Landlords</a>
                    </li>
                    <li className="breadcrumb-item active">Add a landlord</li>
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
                            <a className="nav-link active">
                              1. Landlord details{" "}
                              <span className="sr-only">(current)</span>
                            </a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link">2. Account details</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link">3. Document attachments</a>
                          </li>
                        </ul>
                      </div>
                    </nav>
                    {/*section add landlord details*/}
                    <form id="my-form" onSubmit={handleSubmit}>
                      <section className={"step-cont active-step"}>
                        <p>
                          Fill in the form correctly. Fields with an Asterisk{" "}
                          <strong className="text-danger">*</strong> are
                          mandatory fields.
                        </p>
                        <div className="col-12">
                          <div className="bg-primary border-2 bg-soft p-3 mb-4">
                            <p className="fw-semibold mb-0 pb-0 text-uppercase">
                              Landlord details
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="mb-3">
                            <label
                              htmlFor="landlord-type"
                              className="form-label"
                            >
                              Landlord type.{" "}
                              <strong className="text-danger">*</strong>
                            </label>
                            {landlordtypes && (
                              <div className="form-group mb-4">
                                <select
                                  className="form-control text-capitalize"
                                  value={landLordTypeName}
                                  onChange={(e) =>
                                    setLandLordTypeName(e.target.value)
                                  }
                                  required={true}
                                >
                                  <option className="text-black font-semibold ">
                                    select landlord type
                                  </option>
                                  {landlordtypes.map((item, index) => (
                                    <option value={item}>
                                      {item?.toLowerCase()?.replace(/_/g, " ")}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            )}
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
                          <div className="col-lg-3 col-md-6 ">
                            <div className="mb-4 ">
                              <label htmlFor=" ">
                                ID Num.{" "}
                                <strong className="text-danger">*</strong>
                              </label>
                              <input
                                type="text "
                                className="form-control "
                                id=" "
                                value={idNumber}
                                onChange={(e) => setidNumber(e.target.value)}
                                placeholder="Enter ID Num"
                                required={true}
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6 ">
                            <div className="mb-4 ">
                              <label htmlFor="basicpill-firstname-input ">
                                First name{" "}
                                <strong className="text-danger ">*</strong>
                              </label>
                              <input
                                type="text "
                                className="form-control"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                id="basicpill-firstname-input "
                                placeholder="Enter Your First Name "
                                required={true}
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6 ">
                            <div className="mb-4 ">
                              <label htmlFor="basicpill-lastname-input ">
                                Last Name{" "}
                                <strong className="text-danger ">*</strong>
                              </label>
                              <input
                                type="text "
                                className="form-control"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                id="basicpill-lastname-input "
                                placeholder="Enter Your Last Name "
                                required={true}
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6 ">
                            <div className="mb-4 ">
                              <label htmlFor=" ">Other Name(s)</label>
                              <input
                                type="text "
                                className="form-control "
                                value={otherName}
                                onChange={(e) => setOtherName(e.target.value)}
                                id=" "
                                placeholder="Enter Your Other Name "
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6">
                            <label htmlFor=" " className=" ">
                              Gender:{" "}
                              <strong className="text-danger ">*</strong>
                            </label>
                            <div className="d-flex ">
                              <div className="form-check me-3">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="gender"
                                  value={"male"}
                                  onChange={(e) => setGender(e.target.value)}
                                  id="gender-male"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="gender-male"
                                >
                                  Male
                                </label>
                              </div>
                              <div className="form-check me-3">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="gender"
                                  value={"female"}
                                  onChange={(e) => setGender(e.target.value)}
                                  id="gender-female"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="gender-female"
                                >
                                  Female
                                </label>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6 ">
                            <div className="mb-4 ">
                              <label htmlFor="basicpill-phoneno-input ">
                                Phone{" "}
                                <strong className="text-danger ">*</strong>
                              </label>
                              <input
                                type="text "
                                className="form-control "
                                id="basicpill-phoneno-input "
                                value={phoneNumber}
                                onChange={(e) => setphoneNumber(e.target.value)}
                                placeholder="Enter Your Phone No. "
                                required={true}
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6 ">
                            <div className="mb-4 ">
                              <label htmlFor="basicpill-email-input ">
                                Email{" "}
                                <strong className="text-danger ">*</strong>
                              </label>
                              <input
                                type="email "
                                className="form-control "
                                id="basicpill-email-input "
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter Your Email ID "
                                required={true}
                              />
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-6 ">
                            <div className="mb-4 ">
                              <label htmlFor="basicpill-email-input ">
                                File Number{" "}
                                <strong className="text-danger ">*</strong>
                              </label>
                              <input
                                type="text"
                                className="form-control "
                                id="basicpill-email-input "
                                value={fileNumber}
                                onChange={(e) => setFileNumber(e.target.value)}
                                placeholder="Enter File Number "
                                required={true}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="bg-primary border-2 bg-soft p-3 mb-4">
                            <p className="fw-semibold mb-0 pb-0 text-uppercase">
                              PROPERTY AGREEMENT DETAILS
                            </p>
                          </div>
                          <div className="col-lg-4">
                            <div className="mb-4 ">
                              <label htmlFor=" " className=" ">
                                Agreement Type
                                <strong className="text-danger ">*</strong>
                              </label>
                              {agreementTypes && (
                                <div className="input-group" id="">
                                  <select
                                    className="form-control text-capitalize"
                                    required={true}
                                    onChange={(e) => {
                                      setlandLordAgreementTypeId(
                                        e.target.value
                                      );
                                    }}
                                  >
                                    <option className="text-black font-semibold">
                                      select agreement type
                                    </option>
                                    {agreementTypes
                                      .sort((a, b) =>
                                        a.name.localeCompare(b.name)
                                      )
                                      .map((aT) => {
                                        return (
                                          <option value={aT.id}>
                                            {aT.name
                                              ?.toLowerCase()
                                              ?.replace(/_/g, " ")}
                                          </option>
                                        );
                                      })}
                                  </select>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="col-lg-3 col-md-4 col-sm-12 per-commision">
                            <div className="mb-4 ">
                              <label htmlFor="basicpill-lastname-input ">
                                Percentage renumeration
                                <strong className="text-danger ">*</strong>
                              </label>
                              <input
                                type="number"
                                min="1"
                                max="99"
                                value={remunerationPercentage}
                                onChange={(e) =>
                                  setremunerationPercentage(e.target.value)
                                }
                                className="form-control "
                                placeholder="Percentage renumeration % "
                                required={true}
                              />
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="mb-4 ">
                              <label htmlFor="basicpill-lastname-input ">
                                Agreement Period
                                <strong className="text-danger ">*</strong>
                              </label>
                              <input
                                type="number"
                                min="1"
                                max="99"
                                value={agreementPeriod}
                                onChange={(e) =>
                                  setagreementPeriod(e.target.value)
                                }
                                className="form-control "
                                placeholder="Agreement period (months)"
                                required={true}
                              />
                            </div>
                          </div>
                        </div>
                      </section>

                      {/*add bank accounts*/}
                      <section className={"step-cont d-none"}>
                        <div className="col-12">
                          <div className="table-responsive table-responsive-md">
                            <div className="bg-primary border-2 bg-soft p-3 mb-4">
                              <p className="fw-semibold mb-0 pb-0 text-uppercase">
                                BANKING DETAILS
                              </p>
                            </div>
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
                                                getOneAccount(index)
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

                      {/*add documents */}
                      <section className={"step-cont d-none"}>
                        <div className="col-12">
                          <div className="bg-primary border-2 bg-soft p-3 mb-4">
                            <p className="fw-semibold mb-0 pb-0 text-uppercase">
                              Document Attachments{" "}
                            </p>
                          </div>
                        </div>
                        <h6>
                          Upload document and don't forget to specify whose the
                          document is for. ie{" "}
                          <strong>Landlord or Premises</strong>
                        </h6>
                        <div className="table-responsive table-responsive-md">
                          <table className="table table-editable-file align-middle table-edits">
                            <thead className="table-light">
                              <tr className="text-uppercase table-dark">
                                <th className="vertical-align-middle">#</th>
                                <th className="vertical-align-middle">
                                  Document owner
                                </th>
                                <th className="vertical-align-middle">
                                  Document Type
                                </th>
                                <th className="vertical-align-middle">
                                  Actions
                                </th>
                                <th className="text-right"></th>
                              </tr>
                            </thead>
                            <tbody>
                              {landlordDocuments != "" &&
                                landlordDocuments.length > 0 &&
                                landlordDocuments.map((doc, index) => {
                                  return (
                                    <tr data-id="1" key={index}>
                                      <td style={{ width: "80px" }}>
                                        {index + 1}
                                      </td>
                                      <td>{doc.documentOwnerTypeName}</td>
                                      <td>{doc.docName}</td>
                                      <td className="text-right cell-change text-nowrap ">
                                        <div className="d-flex">
                                          <a
                                            data-bs-toggle="modal"
                                            data-bs-target="#update-modal"
                                            onClick={() =>
                                              removeDoc(doc.docName)
                                            }
                                            className="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit "
                                            title="Delete"
                                          >
                                            <i className="bx bxs-trash"></i>
                                          </a>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                            <tfoot>
                              <tr>
                                <td colSpan="7" onClick={handleDocShow}>
                                  <span className="d-flex align-items-center ">
                                    <i className="dripicons-plus mr-5 d-flex justify-content-center align-items-center font-21 "></i>
                                    <span className="pl-5 ">
                                      Add A Document
                                    </span>
                                  </span>
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </section>
                    </form>
                    <div className="button-navigators">
                      <button
                        disabled
                        className="btn btn-primary waves-effect kev-prev me-3"
                      >
                        <i className="mdi-arrow-left mdi font-16px ms-2 me-2"></i>{" "}
                        Previous{" "}
                      </button>
                      <button
                        className="btn btn-primary waves-effect kev-nxt me-3"
                        disabled={!areAllFieldsFilled}
                      >
                        Next{" "}
                        <i className="mdi mdi-arrow-right font-16px ms-2 me-2"></i>
                      </button>
                      <button
                        type="submit"
                        className="btn btn-success kev-submit me-3 d-none"
                        form={"my-form"}
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
        <div>
          {/* <!-- Add Bank details Modal --> */}
          <div>
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
                          Select Bank.{" "}
                          <strong className="text-danger ">*</strong>
                        </label>
                        <select
                          className="form-control text-capitalize"
                          onChange={(e) => {
                            setbankAccountDetails(e.target.value);
                          }}
                          name="bank account"
                          required={true}
                        >
                          <option className="text-black font-semibold ">
                            select..
                          </option>
                          {banks
                            ?.sort((a, b) =>
                              a.bankName.localeCompare(b.bankName)
                            )
                            .map((bank) => {
                              return (
                                <option
                                  key={bank.id}
                                  value={bank.id + ":" + bank.bankName}
                                >
                                  {bank.bankName
                                    ?.toLowerCase()
                                    ?.replace(/_/g, " ")}
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
          </div>
          {/*edit bank details modal*/}
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
                          Select Bank.
                          <strong className="text-danger ">*</strong>
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
                          {banks.map((bank) => {
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

          {/*document attachment modal*/}
          <div>
            <Modal
              show={docShow}
              onHide={handleDocClose}
              className={"modal fade"}
              centered
            >
              <form onSubmit={handleDocumentSubmit}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Documents</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group mb-4">
                        <label htmlFor="">
                          Select Document Type.{" "}
                          <strong className="text-danger ">*</strong>
                        </label>
                        <select
                          className="form-control text-capitalize"
                          onChange={(e) => {
                            setdocumentTypeId(e.target.value);
                          }}
                          name="document type"
                          required={true}
                        >
                          <option className="text-black font-semibold ">
                            select..
                          </option>
                          {documentTypes
                            .sort((a, b) => a.name.localeCompare(b.name))
                            ?.map((dT) => {
                              return (
                                <option key={dT.id} value={dT.id}>
                                  {dT.name?.toLowerCase()}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="">
                          Document Name.{" "}
                          <strong className="text-danger ">*</strong>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={docName}
                          onChange={(e) => setdocName(e.target.value)}
                          placeholder="Enter document name"
                          required={true}
                        />
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="">
                          Document Upload.{" "}
                          <strong className="text-danger ">*</strong>
                        </label>
                        <div className="input-group mb-0">
                          <label
                            className="input-group-text bg-info text-white cursor-pointer"
                            htmlFor="document1-1"
                          >
                            <i className="font-14px mdi mdi-paperclip"></i>{" "}
                            Attach File
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="document1-1"
                            onChange={(e) => handleFileRead(e)}
                            required={true}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    className={"btn btn-grey"}
                    onClick={handleDocClose}
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
      </div>
    </>
  );
}
