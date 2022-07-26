import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { baseUrl } from "../../services/API";

function ViewLandlord() {
  const [activeLink, setActiveLink] = useState(1);
  const [landlord, setLandlord] = useState([]);
  const [accountsData, setAccountsData] = useState([]);
  const [documents, setDocuments] = useState([])
  const [agreementtypes, setAgreementTypes] = useState([])
  const [landlordtypes, setLandlordTypes] = useState([]);
  const [banks, setBanks] = useState([]);
  const [documentTypes, setdocumentTypes] = useState([]);

  const { id } = useParams();
  const userId = id;

  //landlord edits
  const [editlandlordemail, seteditlandlordemail] = useState("");
  const [editlandlordgender, seteditlandlordgender] = useState("")
  const [editlandlordidnumber, seteditlandlordidnumber] = useState("")
  const [editlandlordfilenumber, seteditlandlordfilenumber] = useState("")
  const [editlandlordfirstname, seteditlandlordfirstname] = useState("")
  const [editlandlordlastname, seteditlandlordlastname] = useState("")
  const [editlandlordphonenumber, seteditlandlordphonenumber] = useState("")
  const [editlandlordagreementtype, seteditlandlordagreementtype] = useState("");
  const [editlandlordothername, seteditlandlordothername] = useState("");
  const [editlandlordremuneration, seteditlandlordremuneration] = useState(null)
  const [editagreementperiod, seteditagreementperiod] = useState(null)
  const [editlandlordtypename, seteditlandlordtypename] = useState("")

  //document edits
  const [editdocumentname, seteditdocumentname] = useState("");
  const [editdocumenttypeid, seteditdocumenttypeid] = useState(null);
  const [editdocument, seteditdocument] = useState("");

  //documents create
  const [docName, setdocName] = useState("")
  const [document, setdocument] = useState("")
  const [documentTypeId, setdocumentTypeId] = useState(null)

  //accounts edit
  const [editBankId, setEditBankId] = useState(null)
  const [editBankName, setEditBankName] = useState("")
  const [editBankAccount, setEditBankAccount] = useState("")
  const [editpercentageRemuneration, setEditPercentageRemuneration] = useState(null)
  const [acc_id, setacc_id] = useState(null);

  const editBankAccountDetails = (value) => {
    setEditBankId(value.split(":")[0]);
    setEditBankName(value.split(":")[1]);
  }
  //accounts create
  const [bankname, setbankname] = useState("")
  const [bankAccountNumber, setbankAccountNumber] = useState("");
  const [bankId, setbankId] = useState(null);
  const [percentageRemuneration, setPercentageRemuneration] = useState(null);

  const setbankAccountDetails = (value) => {
    setbankId(value.split(":")[0]);
    setbankname(value.split(":")[1]);
  };
  // const seteditbankAccountDetails = (value) => {
  //   seteditbankid(value.split(":")[0]);
  //   seteditbankname(value.split(":")[1]);
  // };
  //modals

  const [show_landlord, setshowlandlord] = useState(false);
  const [show_doc, set_show_doc] = useState(false);
  const [show_acc, set_show_acc] = useState(false);
  const [edittypename, setedittypename] = useState("");


  const landlordshow = () => {
    seteditlandlordemail(landlord.email)
    seteditlandlordgender(landlord.gender)
    seteditlandlordidnumber(landlord.idNumber)
    seteditlandlordfilenumber(landlord.fileNumber)
    seteditlandlordfirstname(landlord.firstName)
    seteditlandlordlastname(landlord.lastName)
    seteditlandlordphonenumber(landlord.phoneNumber)
    setedittypename(landlord.landLordAgreementType?.name)
    seteditlandlordagreementtype(landlord.landLordAgreementType?.id)
    seteditlandlordothername(landlord.otherName)
    seteditlandlordremuneration(landlord.remunerationPercentage)
    seteditagreementperiod(landlord.agreementPeriod)
    seteditlandlordtypename(landlord.landLordType)
    setshowlandlord(true)
  };
  const landlordclose = () => setshowlandlord(false);
  const docshow = () => set_show_doc(true);
  const docclose = () => set_show_doc(false);

  const accshow = (id) => {
    let acc = accountsData.find(account => account.id === id)
    setEditBankName(acc.bank.bankName);
    setEditPercentageRemuneration(acc.percentageRemuneration);
    setEditBankAccount(acc.bankAccountNumber);
    setEditBankId(acc.bank.id)
    setacc_id(id);
    set_show_acc(true);
  }
  const accclose = () => set_show_acc(false);


  useEffect(() => {
    getlandlords();
    requestsServiceService.getAllAgreementTypes().then((res) => {
      setAgreementTypes(res.data.data);
    })
    requestsServiceService.getLandlordTypes().then((res) => {
      setLandlordTypes(res.data.data)
    })
    requestsServiceService.getBanks().then((res) => {
      setBanks(res.data.data);
    })
    requestsServiceService.getDocumentTypes().then((res) => {
      setdocumentTypes(res.data.data);
    })
  }, []);

  const getlandlords = () => {
    requestsServiceService.getLandlord(userId).then((res) => {
      if (res.status) {
        let data = res.data.data;
        setLandlord(data.landLord);
        setAccountsData(data.accounts);
        console.log(accountsData)
        setDocuments(data.documents);
      }
    });
  }
  // console.log(landlord)
  const download = (x) => {
    requestsServiceService.downloadDocuments(x).then((res) => {
      console.log(res);
    });
  };
  //modals
  const showEditLandLord = () => {
    console.log("clicked")
  }
  const [error, setError] = useState({
    message: "",
    color: ""
  });

  const handlelandlordsubmit = (event) => {
    event.preventDefault();
    let data = JSON.stringify({
      active: true,
      agreementPeriod: editagreementperiod,
      email: editlandlordemail,
      fileNumber: editlandlordfilenumber,
      firstName: editlandlordfirstname,
      gender: editlandlordgender,
      id: userId,
      idNumber: editlandlordidnumber,
      landLordAgreementTypeId: editlandlordagreementtype,
      landLordTypeName: editlandlordtypename,
      lastName: editlandlordlastname,
      otherName: editlandlordothername,
      phoneNumber: editlandlordphonenumber,
      remunerationPercentage: editlandlordremuneration
    });
    console.log(data);

    requestsServiceService.updateLandLord(data).then((res) => {
      console.log(res);
      setError({
        ...error,
        message: res.data.message,
        color: "success"
      })
      landlordclose();
      setTimeout(() => {
        setError({
          ...error,
          message: "",
          color: ""
        })
      }, 3000);
      getlandlords();
    }).catch((err) => {
      setError({
        ...error,
        message: err.response.data.message,
        color: "danger"
      })
    })

  }

  const handleaccountsubmit = (event) => {
    event.preventDefault()
    let data = JSON.stringify({
      id: acc_id,
      active: true,
      bankAccountNumber: editBankAccount,
      bankId: editBankId,
      landLordId: userId,
      percentageRemuneration: editpercentageRemuneration,
      bankName: editBankName,
    });
    requestsServiceService.updateLandLordAccounts(data).then((res) => {
      setError({
        ...error,
        message: res.data.message,
        color: "success"
      })
      accclose();
      setTimeout(() => {
        setError({
          ...error,
          message: "",
          color: ""
        })
      }, 3000);
      getlandlords();
    });
  }
  const handleAccountSubmit = (event) => {
    event.preventDefault()
    let data = {
      bankName: bankname,
      active: true,
      bankAccountNumber: bankAccountNumber,
      bankId: bankId,
      id: null,
      landLordId: userId,
      percentageRemuneration: percentageRemuneration
    }
    requestsServiceService.createLandLordAccounts(data).then((res) => {
      setError({
        ...error,
        message: res.data.message,
        color: "success"
      })
      getlandlords();
      docclose();
      setTimeout(() => {
        setError({
          ...error,
          message: "",
          color: ""
        })
      }, 3000);
    })
  }
  const handleFileRead = async (event) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    setdocument(base64);
  }
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }
  const [docShow, setdocShow] = useState(false);
  const handleDocShow = () => setdocShow(true);
  const handleDocClose = () => setdocShow(false);

  const handleDocumentSubmit = (event) => {
    event.preventDefault();
    let data = JSON.stringify({
      docName: docName,
      document: document,
      documentOwnerTypeName: "LANDLORD",
      documentTypeId: documentTypeId,
      id: null,
      ownerEntityId: userId
    })
    requestsServiceService.createDocuments(data).then((res) => {
      setError({
        ...error,
        message: res.data.message,
        color: "success"
      })
      handleDocClose();
      setTimeout(() => {
        setError({
          ...error,
          message: "",
          color: ""
        })
      }, 3000);
      getlandlords();
    }).catch((err) => {
      console.log(err)
      setError({
        ...error,
        message: err.message,
        color: "danger"
      })
      handleDocClose()
      setTimeout(() => {
        setError({
          ...error,
          message: "",
          color: ""
        })
      }, 3000);
    })
  }
  const [activeId, setActiveId] = useState('')

  const deactivate = (id) => {
    let docOwnerType = "LANDLORD"
    let entity = userId
    let documentId = id
    requestsServiceService.deactivateDocuments(docOwnerType, entity, documentId).then((res) => {
      getlandlords();
    })
  }
  const deactivateAcc = (id) => {
    requestsServiceService.deactivateAccounts(id).then((res) => {
      getlandlords();
    })
  }

  return (
    <>
      <div className="page-content">
        <div className="content-fluid">
          {/* <!-- start page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">
                </h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="">Dashboards</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="">All Properties</a>
                    </li>
                    <li class="breadcrumb-item active">
                      {landlord.firstName && landlord.lastName}
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body pt-2 pb-3">
                  <nav className="navbar navbar-expand-md navbar-white bg-white py-2">
                    <button
                      className="navbar-toggler btn btn-sm px-3 font-size-16 header-item waves-effect h-auto text-primary"
                      type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                      aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="mdi mdi-menu" />
                    </button>
                    <div className="collapse navbar-collapse justify-content-between" id="navbarNavAltMarkup">
                      <div className="navbar-nav">
                        <a
                          onClick={() => setActiveLink(1)}
                          className={
                            activeLink === 1
                              ? "nav-item nav-link active cursor-pointer"
                              : "nav-item cursor-pointer nav-link"
                          }
                        >
                          Landlord Details<span className="sr-only"></span>
                        </a>
                        <a
                          onClick={() => setActiveLink(2)}
                          className={
                            activeLink === 2
                              ? "nav-item nav-link active cursor-pointer"
                              : "nav-item cursor-pointer nav-link"
                          }
                        >
                          Landlord Accounts
                        </a>
                        <a
                          onClick={() => setActiveLink(3)}
                          className={
                            activeLink === 3
                              ? "nav-item nav-link active cursor-pointer"
                              : "nav-item cursor-pointer nav-link"
                          }
                        >
                          Landlord Documents
                        </a>
                      </div>
                    </div>
                  </nav>
                </div>
              </div>
            </div>

            {/*LANDLORD DETAILS*/}
          </div>
          {activeLink === 1 &&
            <div className="row">
              <div className="col-12">
                {error.color !== "" &&
                  <div className={"alert alert-" + error.color} role="alert">
                    {error.message}
                  </div>
                }
                <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                  <div className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                    role="toolbar">
                    <div className="d-flex align-items-center flex-grow-1">
                      <h4 className="mb-0  bg-transparent  p-0 m-0">
                        Landlord Details
                      </h4>
                    </div>
                    <div className="d-flex align-items-center flex-grow-1">
                    </div>
                    <div className="d-flex">
                      <button type="button"
                        onClick={() => landlordshow()}
                        className="btn btn-primary dropdown-toggle option-selector">
                        <i className="dripicons-plus font-size-16"></i> <span
                          className="pl-1 d-md-inline">Edit Landlord details</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card calc-h-3px">
                  <div className="card-body pb-5">
                    <div>
                      <div className="mb-4 me-3">
                        <i className="mdi mdi-account-circle text-primary h1"></i>
                      </div>
                      <div>
                        <h5 className="text-capitalize">{landlord?.firstName} {landlord?.lastName} {landlord?.otherName}
                          {landlord.active ?
                            <span className="badge-soft-success badge">Active</span> :
                            <span className="badge-soft-danger badge">Inactive</span>
                          }
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="card-body border-top">
                    <p className="text-muted mb-0 d-flex align-items-center">
                      <a href="tel:0704549859" className="d-flex align-items-center"><i
                        className="mdi mdi-phone me-2 font-size-18" /> {landlord.phoneNumber}</a> <span
                          className="px-3 px-3">|</span>
                      <a className="d-flex align-items-center" href={"mailto:" + landlord.email}><i
                        className="mdi mdi-email-outline font-size-18 me-2" />{landlord.email}</a>
                    </p>
                  </div>
                  <div className={"d-flex"}>
                    <div className="card-body border-top">
                      <p className="p-0 m-0"><span className="text-muted">National ID No. </span>{landlord.idNumber}</p>
                    </div>
                    <div className="card-body">
                      <p className="p-0 m-0"><span className="text-muted">File Number. </span>{landlord.fileNumber}</p>
                    </div>
                    <div className="card-body border-top">
                      <p className="p-0 m-0"><span className="text-muted">Landlord Type. </span>{landlord.landLordType}</p>
                    </div>
                    <div className="card-body border-top">
                      <p className="p-0 m-0"><span className="text-muted">Other Name. </span>{landlord.otherName}</p>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="card-body border-top">
                      <p className="p-0 m-0"><span className="text-muted">Remuneration. </span>{landlord.remunerationPercentage} %</p>
                    </div>
                    <div className="card-body border-top">
                      <p className="p-0 m-0"><span className="text-muted">Gender. </span>{landlord.gender}</p>
                    </div>
                    <div className="card-body border-top">
                      <p className="p-0 m-0"><span className="text-muted">Agreement Period. </span>{landlord.agreementPeriod} months</p>
                    </div>
                    <div className="card-body border-top">
                      <p className="p-0 m-0"><span className="text-muted">Agreement Type. </span>{landlord?.landLordAgreementType?.name}</p>
                    </div>
                  </div>
                </div>
                {/*<div className="row">*/}
                {/*  <div className="col-12 float-end">*/}
                {/*    <button type={"submit"} className={"btn btn-primary float-end"} form={"my-form"}>Update</button>*/}
                {/*    <button onClick={() => setActiveLink(1)}>Back</button>*/}
                {/*    <button onClick={() => setActiveLink(2)}>Next</button>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
            </div>
            // <div className="row">
            //   <div className="row">
            //     <div className="col-12 float-end">
            //     </div>
            //   </div>
            //
            // </div>
          }
          {
            activeLink === 2 &&
            <div className={"row"}>
              <div className="col-12">
                <div className="card calc-h-3px">
                  <div>
                    <div className="row">
                      <div className="col-12">
                        <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                          <div
                            className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                            role="toolbar">
                            <div className="d-flex align-items-center flex-grow-1">
                              <h4 className="mb-0  bg-transparent  p-0 m-0">
                                Landlord Accounts
                              </h4>
                            </div>
                            <div className="d-flex">
                              <button
                                type="button"
                                className="btn btn-primary waves-effect btn-label waves-light me-3"
                                data-bs-toggle="modal"
                                onClick={() => docshow()}
                                data-bs-target="#add-new-agreementType"
                              >
                                <i className="mdi mdi-plus label-icon"></i> Add Account
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="row">
                            {error.color !== "" &&
                              <div className={"alert alert-" + error.color} role="alert">
                                {error.message}
                              </div>
                            }
                            <div className="col-12">
                              <div className="table-responsive">
                                <table
                                  className="table align-middle table-nowrap table-hover mb-0">
                                  <thead>
                                    <tr className="text-uppercase table-dark">
                                      <th scope="col">#</th>
                                      <th scope="col">Bank</th>
                                      <th scope="col">Account No</th>
                                      <th scope="col">% Remuneration</th>
                                      <th scope="col">Status</th>
                                      <th className="text-right">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {accountsData?.map((acc, index) => (
                                      <tr data-id={index} key={index}>
                                        <td style={{ width: "80px" }}>{index + 1}</td>
                                        <td data-field="estate">{acc.bank.bankName}</td>
                                        <td data-field="unit-num ">{acc.bankAccountNumber}</td>
                                        <td data-field="unit-num ">{acc.percentageRemuneration}</td>
                                        <td data-field="unit-num ">{acc.active ?
                                          <span className="badge-soft-success badge">Active</span> :
                                          <span className="badge-soft-danger badge">Inactive</span>}
                                        </td>
                                        <td className="text-right cell-change ">
                                          <div className="d-flex align-items-center">
                                            <a className="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit" data-bs-toggle="modal" data-bs-target="#edit-client"
                                              title="Edit" onClick={() => accshow(acc.id)}><i className="bx bx-edit-alt " /></a>
                                              {acc.active ? <button
                                                className="btn btn-danger btn-sm btn-rounded waves-effect waves-light"
                                                title="deactivate"
                                                data-bs-toggle="modal"
                                                data-bs-target="#confirm-acc-deactivate"
                                                style={{ marginLeft: "8px" }}
                                                onClick={() => setActiveId(acc.id)}
                                              >
                                                Deactivate
                                              </button> : <button
                                                className="btn btn-success btn-sm btn-rounded waves-effect waves-light"
                                                title="deactivate"
                                                data-bs-toggle="modal"
                                                data-bs-target="#confirm-acc-activate"
                                                style={{ marginLeft: "8px" }}
                                                onClick={() => setActiveId(acc.id)}
                                              >
                                                Activate
                                              </button>
                                              }
                                          </div>
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          {activeLink === 3 &&
            <div className={"row"}>
              <div className="col-12">
                <div className="card">
                  <div className="col-12">
                    <div className="card calc-h-3px">
                      <div>
                        <div className="row">
                          <div className="col-12">
                            <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                              <div
                                className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                                role="toolbar">
                                <div className="d-flex align-items-center flex-grow-1">
                                  <h4 className="mb-0  bg-transparent  p-0 m-0">
                                    Landlord Documents
                                  </h4>
                                </div>
                                <div className="d-flex">
                                  <button
                                    type="button"
                                    className="btn btn-primary waves-effect btn-label waves-light me-3"
                                    data-bs-toggle="modal"
                                    onClick={handleDocShow}
                                    data-bs-target="#add-new-agreementType"
                                  >
                                    <i className="mdi mdi-plus label-icon"></i> Add Document
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="row">
                              {error.color !== "" &&
                                <div className={"alert alert-" + error.color} role="alert">
                                  {error.message}
                                </div>
                              }
                              <div className="col-12">
                                <div className="table-responsive">
                                  <table
                                    className="table align-middle table-nowrap table-hover mb-0">
                                    <thead>
                                      <tr className="text-uppercase table-dark">
                                        <th scope="col">#</th>
                                        <th scope="col">Document Name</th>
                                        <th scope="col">Document Type</th>
                                        <th scope="col">Status</th>
                                        <th className="text-right">Actions</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {documents?.map((doc, index) => (
                                        <tr data-id={index} key={index}>
                                          <td style={{ width: "80px" }}>{index + 1}</td>
                                          <td data-field="estate">{doc.docName}</td>
                                          <td data-field="unit-num ">{doc.documentType?.name}</td>
                                          <td data-field="unit-num ">
                                            {doc.active ?
                                              <span className="badge-soft-success badge">Active</span> :
                                              <span className="badge-soft-danger badge">Inactive</span>
                                            }
                                          </td>
                                          <td className="text-right cell-change ">
                                            <div className="d-flex align-items-center">
                                              <a href={baseUrl + "/documents/download?docName=" + `${doc.docName}`}
                                                className="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit"
                                                target="_blank"><i className="bx bx-download" />
                                              </a>
                                              {doc.active ? <button
                                                className="btn btn-danger btn-sm btn-rounded waves-effect waves-light"
                                                title="deactivate"
                                                data-bs-toggle="modal"
                                                data-bs-target="#confirm-deactivate"
                                                style={{ marginLeft: "8px" }}
                                                onClick={() => setActiveId(doc.id)}
                                              >
                                                Deactivate
                                              </button> : <button
                                                className="btn btn-success btn-sm btn-rounded waves-effect waves-light"
                                                title="deactivate"
                                                data-bs-toggle="modal"
                                                data-bs-target="#confirm-activate"
                                                style={{ marginLeft: "8px" }}
                                                onClick={() => setActiveId(doc.id)}
                                              >
                                                Activate
                                              </button>
                                              }
                                            </div>
                                          </td>

                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>

        {/*edit landlord modals*/}
        <Modal show={show_landlord} onHide={landlordclose} className={"modal fade"} centered>
          <form onSubmit={handlelandlordsubmit}>
            <Modal.Header closeButton onClick={() => landlordclose()}>
              <Modal.Title>Update Landlord</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-6">
                  <div className="form-group mb-4">
                    <label htmlFor="">Landlord Type <strong className="text-danger ">*</strong></label>
                    <select className="form-control" value={editlandlordtypename} onChange={(e) => seteditlandlordtypename(e.target.value)} required={true}>
                      <option className="text-black font-semibold ">
                        {editlandlordtypename}
                      </option>
                      {
                        landlordtypes.map((item, index) => (
                          <option value={item}>{item}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="">Agreement Type. <strong className="text-danger ">*</strong></label>
                    <select className="form-control" value={editlandlordagreementtype} onChange={(e) => seteditlandlordagreementtype(e.target.value)} required={true}>
                      <option className="text-black font-semibold ">
                        {edittypename}
                      </option>
                      {
                        agreementtypes?.map((item, index) => (
                          <option value={item.id}>{item.name}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="">File Num. <strong className="text-danger ">*</strong></label>
                    <input type="text" value={editlandlordfilenumber} onChange={(e) => seteditlandlordfilenumber(e.target.value)} className="form-control"
                      required={true} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group mb-4">
                    <label htmlFor="">ID Num. <strong className="text-danger ">*</strong></label>
                    <input type="text" value={editlandlordidnumber} onChange={(e) => seteditlandlordidnumber(e.target.value)} className="form-control"
                      required={true} />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="">First Name. <strong className="text-danger ">*</strong></label>
                    <input type="text" value={editlandlordfirstname} onChange={(e) => seteditlandlordfirstname(e.target.value)}
                      className="form-control"
                      required={true} />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="">Last Name. <strong className="text-danger ">*</strong></label>
                    <input type="text" value={editlandlordlastname} onChange={(e) => seteditlandlordlastname(e.target.value)}
                      className="form-control"
                      required={true} />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group mb-4">
                    <label htmlFor="">Email. <strong className="text-danger ">*</strong></label>
                    <input type="email" value={editlandlordemail} onChange={(e) => seteditlandlordemail(e.target.value)}
                      className="form-control"
                      required={true} />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="">Other Name.</label>
                    <input type="text" value={editlandlordothername} onChange={(e) => seteditlandlordothername(e.target.value)}
                      className="form-control"
                       />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group mb-3">
                    <label htmlFor="">Phone Number. <strong className="text-danger ">*</strong></label>
                    <input type="text" value={editlandlordphonenumber} onChange={(e) => seteditlandlordphonenumber(e.target.value)}
                      className="form-control"
                      required={true} />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor=" " className=" ">Gender: <strong className="text-danger ">*</strong></label>
                    <div className="d-flex ">
                      <div className="form-check me-3">
                        <input className="form-check-input" type="radio" name="gender" checked={editlandlordgender === "male"} value={"male"} onChange={(e) => seteditlandlordgender(e.target.value)} id="gender-male" />
                        <label className="form-check-label" htmlFor="gender-male">
                          Male
                        </label>
                      </div>
                      <div className="form-check me-3">
                        <input className="form-check-input" type="radio" name="gender" checked={editlandlordgender === "female"} value={"female"} onChange={(e) => seteditlandlordgender(e.target.value)} id="gender-female" />
                        <label className="form-check-label" htmlFor="gender-female">
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="form-group mb-4">
                  <label htmlFor="">Remuneration %. <strong className="text-danger ">*</strong></label>
                  <input type="number" value={editlandlordremuneration} onChange={(e) => seteditlandlordremuneration(e.target.value)}
                    className="form-control"
                    required={true} />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">Agreement Period. <strong className="text-danger ">*</strong></label>
                  <input type="number" value={editagreementperiod} onChange={(e) => seteditagreementperiod(e.target.value)}
                    className="form-control"
                    required={true} />
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" className={"btn btn-grey"} onClick={landlordclose}>
                Close
              </Button>
              <Button variant="primary" className={"btn btn-primary"} type={"submit"}>
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
        {/*edit accounts modal*/}
        <Modal show={show_acc} onHide={accclose} className={"modal fade"} centered>
          <form onSubmit={handleaccountsubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Edit account details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-12">
                  <div className="form-group mb-4">
                    <label htmlFor="">Select Bank/  <strong className="text-danger ">*</strong></label>
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
                            value={
                              bank.id +
                              ":" +
                              bank.bankName
                            }
                          >
                            {bank.bankName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="">Bank account number. <strong className="text-danger ">*</strong></label>
                    <input type="text" className="form-control" value={editBankAccount} onChange={(e) => setEditBankAccount(e.target.value)} placeholder="Enter account number" required={true} />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="">Percentage renumeration.  <strong className="text-danger ">*</strong></label>
                    <input type="text" className="form-control" value={editpercentageRemuneration} onChange={(e) => setEditPercentageRemuneration(e.target.value)} placeholder="Enter % renumeration" required={true} />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" className={"btn btn-grey"} onClick={() => accclose()}>
                Close
              </Button>
              <Button variant="primary" className={"btn btn-primary"} type={"submit"}>
                Save Changes
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
      {/*add accounts modal*/}
      <Modal show={show_doc} onHide={docclose} className={"modal fade"} centered>
        <form onSubmit={handleAccountSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add account details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12">
                <div className="form-group mb-4">
                  <label htmlFor="">Select Bank.  <strong className="text-danger ">*</strong></label>
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
                    {banks.map((bank) => {
                      return (
                        <option
                          key={bank.id}
                          value={
                            bank.id +
                            ":" +
                            bank.bankName
                          }
                        >
                          {bank.bankName}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">Bank account number.  <strong className="text-danger ">*</strong></label>
                  <input type="text" className="form-control" value={bankAccountNumber} onChange={(e) => setbankAccountNumber(e.target.value)} placeholder="Enter account number" required={true} />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">Percentage renumeration.  <strong className="text-danger ">*</strong></label>
                  <input type="text" className="form-control" value={percentageRemuneration} onChange={(e) => setPercentageRemuneration(e.target.value)} placeholder="Enter % renumeration" required={true} />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className={"btn btn-grey"} onClick={() => docclose()}>
              Close
            </Button>
            <Button variant="primary" className={"btn btn-primary"} type={"submit"}>
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      {/*add documents*/}
      <Modal show={docShow} onHide={handleDocClose} className={"modal fade"} centered>
        <form onSubmit={handleDocumentSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add Documents</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-12">
                <div className="form-group mb-4">
                  <label htmlFor="">Select Document Type.  <strong className="text-danger ">*</strong></label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      setdocumentTypeId(e.target.value);
                    }}
                    name="document type"
                    required={true}
                  >
                    <option className="text-black font-semibold ">
                      select document type..
                    </option>
                    {documentTypes.map((dT) => {
                      return (
                        <option
                          key={dT.id}
                          value={dT.id}
                        >
                          {dT.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">Document Name.  <strong className="text-danger ">*</strong></label>
                  <input type="text" className="form-control" value={docName} onChange={(e) => setdocName(e.target.value)} placeholder="Enter document name" required={true} />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="">Document Upload.  <strong className="text-danger ">*</strong></label>
                  <div className="input-group mb-0">
                    <label className="input-group-text bg-info text-white cursor-pointer"
                      htmlFor="document1-1">
                      <i className="font-14px mdi mdi-paperclip" /> Attach File
                    </label>
                    <input type="file" className="form-control" id="document1-1" onChange={e => handleFileRead(e)} required={true} />
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" className={"btn btn-grey"} onClick={handleDocClose}>
              Close
            </Button>
            <Button variant="primary" className={"btn btn-primary"} type={"submit"}>
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <div
        className="modal fade"
        id="confirm-deactivate"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        centered="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <center>
                <h5>Deactivate Document ?</h5>
              </center>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                no
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => deactivate(activeId)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* confirm dactivate  */}
      <div
        className="modal fade"
        id="confirm-activate"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        centered="false"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <center>
                <h5>Activate Document ?</h5>
              </center>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                no
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => deactivate(activeId)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* confirm ACCOUNT  */}
      <div
        className="modal fade"
        id="confirm-acc-activate"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        centered="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <center>
                <h5>Activate Account ?</h5>
              </center>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                no
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => deactivateAcc(activeId)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* confirm dactivate  */}
      <div
        className="modal fade"
        id="confirm-acc-deactivate"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
        centered="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <center>
                <h5>Deactivate Account ?</h5>
              </center>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                no
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => deactivateAcc(activeId)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}

export default ViewLandlord;
