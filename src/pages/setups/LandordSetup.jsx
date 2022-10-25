/* global $ */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
import requestsServiceService from "../../services/requestsService.service";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import ReactPaginate from "react-paginate";

function LandlordSetup() {
  const [list, setList] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [activeLink, setActiveLink] = useState(1);
  const [createName, setCreateName] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [chargeTypes, setChargeTypes] = useState([]);
  const [chargeType, setChargeType] = useState("");
  const [updateChargeType, setUpdateChargeType] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [updateCheck, setUpdateCheck] = useState(false);

  const [error, setError] = useState({
    message: "",
    color: "",
  });
  const [manualVal, setManualVal] = useState(false);
  const [newManualVal, setNewManualVal] = useState(false);
  const [incomeType, setIncomeType] = useState("");
  const [lineFeeId, setLineFeeId] = useState("");
  const [lineChartAccountNo, setLineChartAccountNo] = useState("");
  const [chargeDueAfterDays, setChargeDueAfterDays] = useState("");
  const[entityType, setEntityType]=useState("");

  useEffect(() => {
    fetchTypes();
    fetchAll();
  }, []);
  // PAGINATION
  const sortSize = (e) => {
    setSize(parseInt(e.target.value));
    setPage(0);
    setItemOffset(0);
  };
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [applicableCharges, setApplicableCharges] = useState([]);

  useEffect(() => {
    const endOffset = parseInt(itemOffset) + parseInt(size);
    setApplicableCharges(list?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list?.length / size));
  }, [itemOffset, size, list]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * size) % list.length;
    setItemOffset(newOffset);
    setPage(event.selected);
  };

  // fetch list function
  const fetchAll = () => {
    requestsServiceService.allApplicableCharges("LANDLORD").then((res) => {
      setList(res.data.data);
    });
  };

  const fetchTypes = () => {
    requestsServiceService.applicableChargeTypes().then((res) => {
      setChargeTypes(res.data.data);
    });
  };

  // create function
  const create = () => {
    let data = JSON.stringify({
      active: true,
      applicableChargeTypeName: chargeType,
      clientId: authService.getClientId(),
      expectManualValues: manualVal,
      entityType: "LANDLORD",
      chargeDueAfterDays: chargeDueAfterDays,
      id: null,
      incomeType: incomeType,
      lineChartAccountNo: lineChartAccountNo,
      lineFeeId: lineFeeId,
      name: createName,
      refundable: isChecked,
    });
    requestsServiceService
      .createApplicableCharges(data)
      .then((res) => {
        fetchAll();
        $("#add-new-charge").modal("hide");
        if (res.data.status) {
          setError({
            ...error,
            message: res.data.message,
            color: "success",
          });
        } else {
          setError({
            ...error,
            message: res.data.message,
            color: "warning",
          });
        }

        setTimeout(() => {
          clear();
        }, 3000);
      })
      .catch((res) => {
        $("#add-new-charge").modal("hide");

        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });

        setTimeout(() => {
          clear();
        }, 3000);
      });
     
      setApplicableCharges("")
      createName("")
  };

  const clear = () => {
    setError({
      ...error,
      message: "",
      color: "",
    });
  };

  // toggle function
  const toggleStatus = () => {
    requestsServiceService.toogleApplicableCharge(activeId).then((res) => {
      fetchAll();
    });
  };

  // update function
  const Update = () => {
    let data = JSON.stringify({
      active: true,
      applicableChargeTypeName: updateChargeType,
      clientId: authService.getClientId(),
      expectManualValues: newManualVal,
      id: activeId,
      incomeType: incomeType,
      lineChartAccountNo: lineChartAccountNo,
      lineFeeId: lineFeeId,
      name: updateName,
      refundable: updateCheck,
      entityType: entityType,
    
    });
    requestsServiceService
      .updateApplicableCharges(data)
      .then((res) => {
        fetchAll();
        $("#update-charge").modal("hide");

        if (res.data.status) {
          setError({
            ...error,
            message: res.data.message,
            color: "success",
          });
        } else {
          setError({
            ...error,
            message: res.data.message,
            color: "warning",
          });
        }

        setTimeout(() => {
          clear();
        }, 3000);
      })
      .catch((res) => {
        $("#update-charge").modal("hide");

        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });

        setTimeout(() => {
          clear();
        }, 3000);
      });
  };
  const handleOnChange = () => {
    setIsChecked(!isChecked);
    setUpdateCheck(!updateCheck);
  };

  // document types
  const [lists, setLists] = useState([]);

  const [createNames, setCreateNames] = useState("");
  const [updateNames, setUpdateNames] = useState("");
  // const [error, setError] = useState({
  //   message: "",
  //   color: "",
  // });

  useEffect(() => {
    fetchAllDocument();
  }, []);

  // fetch list function
  const fetchAllDocument = () => {
    requestsServiceService.allDocumentTypes("LANDLORD").then((res) => {
      setLists(res.data.data != null ? res.data.data : []);
      // setList([])
    });
  };
  // PAGINATION
  const sortSizes = (e) => {
    setSizes(parseInt(e.target.value));
    setPages(0);
    setItemOffset(0);
  };
  const [pages, setPages] = useState(0);
  const [sizes, setSizes] = useState(10);
  const [pageCounts, setPageCounts] = useState(1);
  const [itemOffsets, setItemOffsets] = useState(0);
  const [documentTypes, setDocumentTypes] = useState([]);

  useEffect(() => {
    const endOffset = parseInt(itemOffsets) + parseInt(size);
    setDocumentTypes(lists?.slice(itemOffsets, endOffset));
    setPageCounts(Math.ceil(lists.length / size));
  }, [itemOffsets, size, lists]);

  const handlePageClicks = (event) => {
    const newOffset = (event.selected * size) % lists.length;
    setItemOffset(newOffset);
    setPage(event.selected);
  };

  // create function
  const createDocs = () => {
    let data = JSON.stringify({
      active: true,
      clientId: authService.getClientId(),
      id: 0,
      name: createNames,
      entityType: "LANDLORD",
    });

    requestsServiceService
      .createDocumentTypes(data)
      .then((res) => {
        fetchAllDocument();
        $("#add-new-zone").modal("hide");

        if (res.data.status) {
          setError({
            ...error,
            message: res.data.message,
            color: "success",
          });
        } else {
          setError({
            ...error,
            message: res.data.message,
            color: "warning",
          });
        }

        setTimeout(() => {
          clear();
        }, 3000);
      })
      .catch((res) => {
        $("#add-new-zone").modal("hide");

        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });

        setTimeout(() => {
          clears();
        }, 3000);
      });
  };

  const clears = () => {
    setError({
      ...error,
      message: "",
      color: "",
    });
  };

  // toggle function
  const toggleStatuses = () => {
    requestsServiceService.toogleDocumentType(activeId).then((res) => {
      fetchAllDocument();
    });
  };

  // update function
  const UpdateDocs = () => {
    let data = JSON.stringify({
      active: true,
      clientId: authService.getClientId(),
      id: activeId,
      name: updateNames,
      entityType:entityType,
    });
    requestsServiceService
      .updateDocumentType(data)
      .then((res) => {
        fetchAllDocument();
        $("#update-modal").modal("hide");

        if (res.data.status) {
          setError({
            ...error,
            message: res.data.message,
            color: "success",
          });
        } else {
          setError({
            ...error,
            message: res.data.message,
            color: "warning",
          });
        }

        setTimeout(() => {
          clear();
        }, 3000);
      })
      .catch((res) => {
        $("#update-modal").modal("hide");

        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });

        setTimeout(() => {
          clear();
        }, 3000);
      });
  };

  // landord  Agreement types

  const [agreementTypes, setAgreementTypes] = useState([]);
  const [agreementTypeName, setagreementTypeName] = useState("");
  const [clients, setClients] = useState([]);
  const [selectedClient, setselectedClient] = useState({});

  const [editAgreementTypeName, setEditAgreementTypeName] = useState("");
  const [editSelectedClient, setEditSelectedClient] = useState("");
  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editClientId, setEditClientId] = useState("");
  const [editType, setEditType] = useState({
    name: "",
    id: "",
  });

  useEffect(() => {
    getAgreementTypes();
    getClients();
  }, []);

  // PAGINATION
  // const sortSize = (e) => {
  //   setSize(parseInt(e.target.value));
  //   setPage(0);
  //   setItemOffset(0);
  // };
  // const [page, setPage] = useState(0);
  // const [size, setSize] = useState(10);
  // const [pageCount, setPageCount] = useState(1);
  // const [itemOffset, setItemOffset] = useState(0);
  const [listn, setlistn] = useState([]);

  useEffect(() => {
    const endOffset = parseInt(itemOffset) + parseInt(size);
    setAgreementTypes(listn?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(listn?.length / size));
  }, [itemOffset, size, listn]);

  const handlePageClic = (event) => {
    const newOffset = (event.selected * size) % listn?.length;
    setItemOffset(newOffset);
    setPage(event.selected);
  };

  const getClients = () => {
    const client = {
      name: requestsServiceService.getCurrentUserClient().name,
      id: requestsServiceService.getCurrentUserClient().id,
    };

    setselectedClient(client);

    requestsServiceService.getClients().then((res) => {
      setClients(res.data.data);
    });
  };
  // console.log(agreementTypes);
  // create agreementType
  // const [error, setError] = useState({
  //   message: "",
  //   color: "",
  // });
  const [show, setShow] = useState(false);
  const [editshow, seteditShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const editShow = () => seteditShow(true);
  const editClose = () => seteditShow(false);
  const createAgreementType = (event) => {
    event.preventDefault();
    let data = JSON.stringify({
      active: true,
      clientId: selectedClient.id,
      id: null,
      name: agreementTypeName,
    });
    requestsServiceService
      .createAgreementType(data)
      .then((res) => {
        console.log(res);
        if (res.data.status === false) {
          setError({
            ...error,
            message: res.data.message,
            color: "danger",
          });
        } else {
          setError({
            ...error,
            message: res.data.message,
            color: "success",
          });
          getAgreementTypes();
        }
        setTimeout(() => {
          setError({
            ...error,
            message: "",
            color: "",
          });
          handleClose();
        }, 2000);
      })
      .catch((err) => {
        setError({
          ...error,
          message: err.data.message,
          color: "danger",
        });
      });
  };

  // get all agreementTypes

  const getAgreementTypes = () => {
    requestsServiceService.getAllAgreementTypes().then((res) => {
      setlistn(res.data.data);
    });
  };

  // update agreementType

  const getOneAgreementType = (id) => {
    let agreementType = agreementTypes.find((aT) => aT.id === id);
    setEditAgreementTypeName(agreementType.name);
    setEditId(id);
    editShow();
  };

  const updateAgreementType = (event) => {
    event.preventDefault();
    let data = JSON.stringify({
      active: true,
      clientId: parseInt(authService.getClientId()),
      id: activeId,
      name: editAgreementTypeName,
    });
    requestsServiceService
      .editAgreementType(data)
      .then((res) => {
        let message = res.data.message;
        if (res.data.status === false) {
          setError({
            ...error,
            message: message,
            color: "danger",
          });
        } else {
          setError({
            ...error,
            message: message,
            color: "success",
          });
          editClose();
          getAgreementTypes();
        }
        setTimeout(() => {
          setError({
            ...error,
            message: "",
            color: "",
          });
        }, 2000);
      })
      .catch((err) => {
        setError({
          ...error,
          message: err.data.message,
          color: "success",
        });
      });
  };
  let num = 0;

  //   const deactivate

  const deactivate = (id) => {
    requestsServiceService.deactivateAgreementType(id).then((res) => {
      getAgreementTypes();
    });
  };

  const handleEdit = (id, name) => {
    setEditName(name);
    setEditId(id);
    console.log(name, editId);
  };

  return (
    <>
      <div class="page-content">
        <div class="container-fluid">
          {/* <!-- start page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">LandLord Settings</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <Link to="/">Dashboard </Link>
                    </li>
                    <li class="breadcrumb-item">Set Ups</li>
                    <li class="breadcrumb-item active">Landlord</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- end page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-body pt-2 pb-3 align-items-center d-flex">
                  <div
                    class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                    role="toolbar"
                  >
                    <nav class="navbar navbar-expand-md navbar-white bg-white py-2">
                      <div
                        className="collapse navbar-collapse justify-content-between"
                        id="navbarNavAltMarkup"
                      >
                        <div className="navbar-nav">
                          <a
                            onClick={() => setActiveLink(1)}
                            className={
                              activeLink === 1
                                ? "nav-item nav-link active cursor-pointer"
                                : "nav-item cursor-pointer nav-link"
                            }
                          >
                            Applicable Charges<span className="sr-only"></span>
                          </a>
                          <a
                            onClick={() => setActiveLink(2)}
                            className={
                              activeLink === 2
                                ? "nav-item nav-link active cursor-pointer"
                                : "nav-item cursor-pointer nav-link"
                            }
                          >
                            Agreement Types
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
              {activeLink === 1 && (
                <div>
                  <div className="row">
                    <div className="col-12">
                      <div className="card calc-h-3px">
                        <div>
                          <div className="row">
                            <div className="col-12">
                              <div className="card-body bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                                <div
                                  className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                                  role="toolbar"
                                >
                                  <div className="d-flex align-items-center flex-grow-1">
                                    <h4 className="mb-0  bg-transparent  p-0 m-0">
                                      Applicable Charges
                                    </h4>
                                  </div>
                                  <div class="d-flex">
                                    <button
                                      onClick={() => {
                                        setManualVal(false);
                                        chargeTypes &&
                                          setChargeType(chargeTypes[0]);
                                        fetchTypes();
                                      }}
                                      type="button"
                                      class="btn btn-primary waves-effect btn-label waves-light me-3"
                                      data-bs-toggle="modal"
                                      data-bs-target="#add-new-charge"
                                    >
                                      <i class="mdi mdi-plus label-icon"></i>{" "}
                                      Add Applicable Charge
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <div class="card-body">
                                  {error.color !== "" && (
                                    <div
                                      className={"alert alert-" + error.color}
                                      role="alert"
                                    >
                                      {error.message}
                                    </div>
                                  )}
                                  <div class="table-responsive table-responsive-md">
                                    <table class="table table-editable align-middle table-edits">
                                      <thead class="table-light">
                                        <tr class="text-uppercase table-dark">
                                          <th>#</th>
                                          <th>Property Type</th>
                                          <th>Charge type</th>
                                          <th>Accept Manual Values</th>
                                          <th>Status</th>
                                          <th>Date Created</th>
                                          <th class="text-center">Actions</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {list &&
                                          list.map((val, index) => {
                                            return (
                                              <tr data-id="1" key={val}>
                                                <td style={{ width: "80px" }}>
                                                  {index + 1}
                                                </td>
                                                <td className="text-capitalize">
                                                  {val.name}
                                                </td>
                                                <td className="text-capitalize">
                                                  {val.applicableChargeType !=
                                                    null &&
                                                    val.applicableChargeType
                                                      .toLowerCase()
                                                      .replace(/_/g, " ")}
                                                </td>
                                                <td>
                                                  {val.expectManualValues
                                                    ? "Yes"
                                                    : "No"}{" "}
                                                </td>

                                                <td data-field="unit-num ">
                                                  {val.active ? (
                                                    <span class="badge-soft-success badge">
                                                      Active
                                                    </span>
                                                  ) : (
                                                    <span class="badge-soft-danger badge">
                                                      Inactive
                                                    </span>
                                                  )}
                                                </td>
                                                <td>
                                                  {moment(
                                                    val.dateTimeCreated
                                                  ).format("YYYY-MM-DD HH:mm")}
                                                </td>
                                                <td class="text-center cell-change text-nowrap ">
                                                  <div class="d-flex align-items-center justify-content-between">
                                                    <a
                                                      onClick={() => {
                                                        setActiveId(val.id);
                                                        setUpdateName(val.name);
                                                        setUpdateChargeType(
                                                          val.applicableChargeType
                                                        );
                                                        setNewManualVal(
                                                          val.expectManualValues
                                                        );
                                                        setIncomeType(
                                                          val.incomeType
                                                        );
                                                        setLineFeeId(
                                                          val.lineFeeId
                                                        );
                                                        setLineChartAccountNo(
                                                          val.lineChartAccountNo
                                                        );
                                                        setEntityType(val.entityType);
                                                      
                                                        setUpdateCheck(val.updateCheck);

                                                      }}
                                                      data-bs-toggle="modal"
                                                      data-bs-target="#update-charge"
                                                      class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit "
                                                      title="Edit "
                                                    >
                                                      <i class="bx bx-edit-alt "></i>
                                                    </a>

                                                    {val.active ? (
                                                      <button
                                                        class="btn btn-danger btn-sm text-uppercase px-2 mx-3"
                                                        title="deactivate"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#confirm-deactivate"
                                                        onClick={() =>
                                                          setActiveId(val.id)
                                                        }
                                                      >
                                                        Deactivate
                                                      </button>
                                                    ) : (
                                                      <button
                                                        class="btn btn-success btn-sm  text-uppercase px-3 py-0 mx-3"
                                                        title="deactivate"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#confirm-activate"
                                                        onClick={() =>
                                                          setActiveId(val.id)
                                                        }
                                                      >
                                                        Activate
                                                      </button>
                                                    )}
                                                  </div>
                                                </td>
                                              </tr>
                                            );
                                          })}
                                      </tbody>
                                    </table>
                                    <div className="d-flex justify-content-between align-items-center">
                                      {pageCount !== 0 && (
                                        <>
                                          <select
                                            className="btn btn-md btn-primary"
                                            title="Select A range"
                                            onChange={(e) => sortSize(e)}
                                            value={size}
                                          >
                                            <option
                                              className="bs-title-option"
                                              value=""
                                            >
                                              Select A range
                                            </option>
                                            <option value="10">10 Rows</option>
                                            <option value="30">30 Rows</option>
                                            <option value="50">50 Rows</option>
                                          </select>
                                          <nav
                                            aria-label="Page navigation comments"
                                            className="mt-4"
                                          >
                                            <ReactPaginate
                                              previousLabel="<"
                                              nextLabel=">"
                                              breakLabel="..."
                                              breakClassName="page-item"
                                              breakLinkClassName="page-link"
                                              pageCount={pageCount}
                                              pageRangeDisplayed={4}
                                              marginPagesDisplayed={2}
                                              containerClassName="pagination justify-content-center"
                                              pageClassName="page-item"
                                              pageLinkClassName="page-link"
                                              previousClassName="page-item"
                                              previousLinkClassName="page-link"
                                              nextClassName="page-item"
                                              nextLinkClassName="page-link"
                                              activeClassName="active"
                                              onPageChange={(data) =>
                                                handlePageClick(data)
                                              }
                                              forcePage={page}
                                            />
                                          </nav>
                                        </>
                                      )}
                                    </div>
                                    {pageCount !== 0 && (
                                      <p className="font-medium  text-muted">
                                        showing page{" "}
                                        <span className="text-primary">
                                          {pageCount === 0 ? page : page + 1}
                                        </span>{" "}
                                        of
                                        <span className="text-primary">
                                          {" "}
                                          {pageCount}
                                        </span>{" "}
                                        pages
                                      </p>
                                    )}
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
              )}

              {activeLink === 3 && (
                <div>
                  <div class="row">
                    <div class="col-12">
                      <div class="card">
                        <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                          <div
                            class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                            role="toolbar"
                          >
                            <div class="d-flex align-items-center flex-grow-1">
                              <h4 class="mb-0  bg-transparent  p-0 m-0">
                                Document Type Register
                              </h4>
                            </div>
                            <div class="d-flex">
                              <button
                                onClick={() => {
                                  setCreateNames("");
                                }}
                                type="button"
                                class="btn btn-primary waves-effect btn-label waves-light me-3"
                                data-bs-toggle="modal"
                                data-bs-target="#add-new-zone"
                              >
                                <i class="mdi mdi-plus label-icon"></i> Add
                                Document Type
                              </button>
                            </div>
                          </div>
                        </div>
                        <div class="card-body">
                          {error.color !== "" && (
                            <div
                              className={"alert alert-" + error.color}
                              role="alert"
                            >
                              {error.message}
                            </div>
                          )}
                          <div class="table-responsive table-responsive-md">
                            <table class="table table-editable align-middle table-edits">
                              <thead class="table-light">
                                <tr class="text-uppercase table-dark">
                                  <th>#</th>
                                  <th>Document Type</th>
                                  <th>Status</th>
                                  <th>Date Created</th>

                                  <th class="text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {documentTypes &&
                                  documentTypes?.map((val, index) => {
                                    return (
                                      <tr data-id="1" key={val.id}>
                                        <td style={{ width: "80px" }}>
                                          {index + 1}
                                        </td>
                                        <td
                                          data-field="unit-num "
                                          className="text-capitalize"
                                        >
                                          {val.name}
                                        </td>
                                        <td data-field="unit-num ">
                                          {val.active ? (
                                            <span class="badge-soft-success badge">
                                              Active
                                            </span>
                                          ) : (
                                            <span class="badge-soft-danger badge">
                                              Inactive
                                            </span>
                                          )}
                                        </td>
                                        <td>
                                          {moment(val.dateTimeCreated).format(
                                            "YYYY-MM-DD HH:mm"
                                          )}
                                        </td>

                                        <td class="text-right cell-change text-nowrap ">
                                          <div className="d-flex align-items-center justify-content-between">
                                            <a
                                              onClick={() => {
                                                setActiveId(val.id);
                                                setUpdateNames(val.name);
                                                setEntityType(val.entityType);
                                              }}
                                              data-bs-toggle="modal"
                                              data-bs-target="#update-modal"
                                              class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit "
                                              title="Edit "
                                            >
                                              <i class="bx bx-edit-alt "></i>
                                            </a>

                                            {val.active ? (
                                              <button
                                                class="btn btn-danger btn-sm btn-rounded text-uppercase px-2 mx-3"
                                                title="deactivate"
                                                data-bs-toggle="modal"
                                                data-bs-target="#confirm-deactivate3"
                                                onClick={() =>
                                                  setActiveId(val.id)
                                                }
                                              >
                                                Deactivate
                                              </button>
                                            ) : (
                                              <button
                                                class="btn btn-success btn-sm btn-rounded  text-uppercase px-3 py-0 mx-3"
                                                title="deactivate"
                                                data-bs-toggle="modal"
                                                data-bs-target="#confirm-activate3"
                                                onClick={() =>
                                                  setActiveId(val.id)
                                                }
                                              >
                                                Activate
                                              </button>
                                            )}
                                          </div>
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                            <div className="d-flex justify-content-between align-items-center">
                              {pageCount !== 0 && (
                                <>
                                  <select
                                    className="btn btn-md btn-primary"
                                    title="Select A range"
                                    onChange={(e) => sortSize(e)}
                                    value={size}
                                  >
                                    <option
                                      className="bs-title-option"
                                      value=""
                                    >
                                      Select A range
                                    </option>
                                    <option value="10">10 Rows</option>
                                    <option value="30">30 Rows</option>
                                    <option value="50">50 Rows</option>
                                  </select>
                                  <nav
                                    aria-label="Page navigation comments"
                                    className="mt-4"
                                  >
                                    <ReactPaginate
                                      previousLabel="<"
                                      nextLabel=">"
                                      breakLabel="..."
                                      breakClassName="page-item"
                                      breakLinkClassName="page-link"
                                      pageCount={pageCount}
                                      pageRangeDisplayed={4}
                                      marginPagesDisplayed={2}
                                      containerClassName="pagination justify-content-center"
                                      pageClassName="page-item"
                                      pageLinkClassName="page-link"
                                      previousClassName="page-item"
                                      previousLinkClassName="page-link"
                                      nextClassName="page-item"
                                      nextLinkClassName="page-link"
                                      activeClassName="active"
                                      onPageChange={(data) =>
                                        handlePageClicks(data)
                                      }
                                      forcePage={page}
                                    />
                                  </nav>
                                </>
                              )}
                            </div>
                            {pageCount !== 0 && (
                              <p className="font-medium  text-muted">
                                showing page{" "}
                                <span className="text-primary">
                                  {pageCount === 0 ? page : page + 1}
                                </span>{" "}
                                of
                                <span className="text-primary">
                                  {" "}
                                  {pageCount}
                                </span>{" "}
                                pages
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!-- end col --> */}
                  </div>
                </div>
              )}
              {activeLink === 2 && (
                <div class="row">
                  <div class="col-12">
                    <div class="card">
                      <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                        <div
                          class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                          role="toolbar"
                        >
                          <div class="d-flex align-items-center flex-grow-1">
                            <h4 class="mb-0  bg-transparent  p-0 m-0">
                              Agreement Type Register
                            </h4>
                          </div>
                          <div class="d-flex">
                            <button
                              onClick={handleShow}
                              type="button"
                              class="btn btn-primary waves-effect btn-label waves-light me-3"
                            >
                              <i class="mdi mdi-plus label-icon"></i> Add
                              Agreement Type
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="card-body">
                        <div class="table-responsive table-responsive-md">
                          <table class="table table-editable align-middle table-edits table-striped">
                            <thead class="table-light">
                              <tr class="text-uppercase table-dark">
                                <th>#</th>
                                <th>Agreement Type</th>
                                <th>Status</th>
                                <th>Date Created</th>

                                <th class="text-right">Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {agreementTypes?.map((aT, num) => {
                                return (
                                  <tr data-id="1" key={aT.id}>
                                    <td style={{ width: "80px" }}>{num + 1}</td>
                                    <td data-field="unit-num ">{aT.name}</td>
                                    <td data-field="unit-num ">
                                      {aT.active ? (
                                        <span class="badge-soft-success badge">
                                          Active
                                        </span>
                                      ) : (
                                        <span class="badge-soft-danger badge">
                                          Inactive
                                        </span>
                                      )}
                                    </td>
                                    <td>
                                      {moment(aT.dateTimeCreated).format(
                                        "YYYY-MM-DD HH:mm"
                                      )}
                                    </td>

                                    <td class="text-right cell-change text-nowrap ">
                                      <div className="d-flex align-items-center justify-content-between">
                                        <a
                                          onClick={() => {
                                            getOneAgreementType(aT.id);
                                            setActiveId(aT.id);
                                          }}
                                          data-bs-toggle="modal"
                                          data-bs-target="#update-agree"
                                          className="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit "
                                          title="Edit "
                                        >
                                          <i className="bx bx-edit-alt "></i>
                                        </a>
                                        {aT.active ? (
                                          <button
                                            class="btn btn-danger btn-sm btn-rounded  text-uppercase px-2 mx-3"
                                            title="deactivate"
                                            data-bs-toggle="modal"
                                            data-bs-target="#confirm-deactivate2"
                                            onClick={() => setActiveId(aT.id)}
                                          >
                                            Deactivate
                                          </button>
                                        ) : (
                                          <button
                                            class="btn btn-success btn-sm btn-rounded w-5 text-uppercase px-3 mx-3"
                                            title="deactivate"
                                            data-bs-toggle="modal"
                                            data-bs-target="#confirm-activate2"
                                            onClick={() => setActiveId(aT.id)}
                                          >
                                            Activate
                                          </button>
                                        )}
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                          <div className="d-flex justify-content-between align-items-center">
                            {pageCount !== 0 && (
                              <>
                                <select
                                  className="btn btn-md btn-primary"
                                  title="Select A range"
                                  onChange={(e) => sortSize(e)}
                                  value={size}
                                >
                                  <option className="bs-title-option" value="">
                                    Select A range
                                  </option>
                                  <option value="10">10 Rows</option>
                                  <option value="30">30 Rows</option>
                                  <option value="50">50 Rows</option>
                                </select>
                                <nav
                                  aria-label="Page navigation comments"
                                  className="mt-4"
                                >
                                  <ReactPaginate
                                    previousLabel="<"
                                    nextLabel=">"
                                    breakLabel="..."
                                    breakClassName="page-item"
                                    breakLinkClassName="page-link"
                                    pageCount={pageCount}
                                    pageRangeDisplayed={4}
                                    marginPagesDisplayed={2}
                                    containerClassName="pagination justify-content-center"
                                    pageClassName="page-item"
                                    pageLinkClassName="page-link"
                                    previousClassName="page-item"
                                    previousLinkClassName="page-link"
                                    nextClassName="page-item"
                                    nextLinkClassName="page-link"
                                    activeClassName="active"
                                    onPageChange={(data) =>
                                      handlePageClic(data)
                                    }
                                    forcePage={page}
                                  />
                                </nav>
                              </>
                            )}
                          </div>
                          {pageCount !== 0 && (
                            <p className="font-medium  text-muted">
                              showing page{" "}
                              <span className="text-primary">
                                {pageCount === 0 ? page : page + 1}
                              </span>{" "}
                              of
                              <span className="text-primary">
                                {" "}
                                {pageCount}
                              </span>{" "}
                              pages
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- end col --> */}
                </div>
              )}
            </div>
          </div>
          {/* <!-- end col --> */}
        </div>
        {/* <!-- end row --> */}

        {/* <!-- container-fluid --> */}

        {/* <!-- modals --> */}

        {/* create modal */}
        <div
          class="modal fade"
          id="add-new-charge"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  create();
                }}
              >
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">
                    New Applicable Charge
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-12">
                      <div class="form-group mb-4">
                        <label for="">
                          Applicable Charge Name{" "}
                          <strong class="text-danger">*</strong>{" "}
                        </label>
                        <input
                          required
                          value={createName}
                          onChange={(e) => setCreateName(e.target.value)}
                          type="text"
                          class="form-control"
                          placeholder="Enter applicable charge name"
                        />
                      </div>
                    </div>

                    <div class="col-12">
                      <div class="form-group mb-4">
                        <label for="">
                          ChargeDueAfterDays{" "}
                        </label>
                        <input
                          
                          value={chargeDueAfterDays}
                          onChange={(e) =>
                            setChargeDueAfterDays(e.target.value)
                          }
                          type="number"
                          class="form-control"
                          placeholder="Enter ChargeDueAfterDays"
                        />
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group mb-4">
                        <label for="">IncomeType</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter IncomeType"
                          onChange={(event) =>
                            setIncomeType(event.target.value)
                          }
                          value={incomeType}
                        />
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group mb-4">
                        <label for="">LineFeeId</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter LineFeeId"
                          onChange={(event) => setLineFeeId(event.target.value)}
                          value={lineFeeId}
                        />
                      </div>
                    </div>

                    <div class="col-12">
                      <div class="form-group mb-4">
                        <label for="">LineChartAccountNo</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Enter LineChartAccountNo"
                          onChange={(event) =>
                            setLineChartAccountNo(event.target.value)
                          }
                          value={lineChartAccountNo}
                        />
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="">Accept Manual charges </label>
                      <select
                        class="form-control"
                        data-live-search="true"
                        title=""
                        required="required"
                        onChange={(e) => {
                          setManualVal(e.target.value);
                        }}
                      >
                        <option value="false">Yes</option>
                        <option value="true" selected>No</option>
                      </select>
                    </div>
                    <div class="col-12">
                      <label for="">
                        Charge Type <strong class="text-danger">*</strong>
                      </label>
                      <select
                        class="form-control text-capitalize"
                        data-live-search="true"
                        required="required"
                        title="Select Applicable Charge Type"
                        onChange={(e) => {
                          setChargeType(e.target.value);
                        }}
                      >
                        <option>Select Charge Type</option>
                        {chargeTypes &&
                          chargeTypes.map((charge) => {
                            return (
                              <option key={charge} value={charge}>
                                {charge?.toLowerCase().replace(/_/g, " ")}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="col-12 p-4">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={handleOnChange}
                      />{" "}
                      Refundable?
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* update modal  */}
        <div
          class="modal fade"
          id="update-charge"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  Update();
                }}
              >
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">
                    Update Applicable Charges
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-12">
                      <div class="form-group mb-4">
                        <label for=""> Applicable Charge Name </label>
                        <input
                          value={updateName}
                          onChange={(e) => setUpdateName(e.target.value)}
                          type="text"
                          class="form-control"
                          placeholder="Enter create name"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group mb-4">
                        <label for="">ChargeDueAfterDays </label>
                        <input
                          value={chargeDueAfterDays}
                          onChange={(e) =>
                            setChargeDueAfterDays(e.target.value)
                          }
                          type="text"
                          class="form-control"
                          placeholder="Enter ChargeDueAfterDays"
                          required
                        />
                      </div>
                    </div>

                    <div class="col-12">
                      <div class="form-group mb-4">
                        <label for="">IncomeType</label>
                        <input
                          type="number"
                          class="form-control"
                          onChange={(event) =>
                            setIncomeType(event.target.value)
                          }
                          value={incomeType}
                        />
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group mb-4">
                        <label for="">LineFeeId</label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={(event) => setLineFeeId(event.target.value)}
                          value={lineFeeId}
                        />
                      </div>
                    </div>

                    <div class="col-12">
                      <div class="form-group mb-4">
                        <label for="">LineChartAccountNo</label>
                        <input
                          type="text"
                          class="form-control"
                          onChange={(event) =>
                            setLineChartAccountNo(event.target.value)
                          }
                          value={lineChartAccountNo}
                        />
                      </div>
                    </div>

                    <div class="col-12">
                      <label for="">Accept Manual charges </label>
                      <select
                        class="form-control"
                        data-live-search="true"
                        title=""
                        onChange={(e) => setNewManualVal(e.target.value)}
                      >
                        <option
                          value="true"
                          selected={newManualVal ? "selected" : ""}
                        >
                        Yes
                        </option>
                        <option
                          value="false"
                          selected={!newManualVal ? "selected" : ""}
                        >
                          No
                        </option>
                      </select>
                    </div>

                    <div class="col-12">
                      <label for="">Charge Type </label>
                      <select
                        class="form-control text-capitalize"
                        data-live-search="true"
                        title="Select Applicable Charge Type"
                        onChange={(e) => setUpdateChargeType(e.target.value)}
                      >
                     <option>Select Charge Type</option>

                        {chargeTypes &&
                          chargeTypes.map((charge) => {
                            return (
                              <option
                                key={charge}
                                value={charge}
                                selected={
                                  charge === updateChargeType ? "selected" : ""
                                }
                                className="text-capitalize"
                              >
                                {charge?.toLowerCase().replace(/_/g, " ")}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                    <div className="col-12 p-4">
                      <input
                        type="checkbox"
                        checked={updateCheck}
                        onChange={handleOnChange}
                      />{" "}
                      Refundable?
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* confirm deactivate  */}
        <div
          class="modal fade"
          id="confirm-deactivate"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <center>
                  <h5>Deactivate this Applicable Charges?</h5>
                </center>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  no
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => toggleStatus()}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>

      

        {/* confirm dactivate  */}
        <div
          class="modal fade"
          id="confirm-activate"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <center>
                  <h5>Activate this Applicable Charges ?</h5>
                </center>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  no
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => toggleStatus()}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* create modal */}
        <div
          class="modal fade"
          id="add-new-zone"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createDocs();
                }}
              >
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">
                    New Document Type
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-12">
                      <div class="form-group mb-4">
                        <label for="">
                          {" "}
                          Document Type <strong class="text-danger">
                            *
                          </strong>{" "}
                        </label>
                        <input
                          required
                          value={createNames}
                          onChange={(e) => setCreateNames(e.target.value)}
                          type="text"
                          class="form-control"
                          placeholder="Enter document type"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* edit modal  */}
        <div
          class="modal fade"
          id="update-modal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  UpdateDocs();
                }}
              >
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">
                    Document Type
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="row">
                    <div class="col-12">
                      <div class="form-group mb-4">
                        <label for="">
                          Document Type <strong class="text-danger">*</strong>
                        </label>
                        <input
                          required
                          value={updateNames}
                          onChange={(e) => setUpdateNames(e.target.value)}
                          type="text"
                          class="form-control"
                          placeholder="Enter update type"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-light"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" class="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* confirm deactivate  */}
        <div
          class="modal fade"
          id="confirm-deactivate3"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <center>
                  <h5>Deactivate this Document type?</h5>
                </center>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  no
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => toggleStatuses()}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* confirm dactivate  */}
        <div
          class="modal fade"
          id="confirm-activate3"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <center>
                  <h5>Activate this Document type?</h5>
                </center>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  no
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => toggleStatuses()}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/*ADD MODAL*/}
        <Modal
          show={show}
          onHide={handleClose}
          className={"modal fade"}
          centered
        >
          <form onSubmit={createAgreementType}>
            <Modal.Header closeButton>
              <Modal.Title>Add agreement type</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                {error.color !== "" && (
                  <div className={"alert alert-" + error.color} role="alert">
                    {error.message}
                  </div>
                )}
                <div className="col-12">
                  <div className="form-group mb-4">
                    <label htmlFor="">
                      Agreement type name.{" "}
                      <strong className="text-danger ">*</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={agreementTypeName}
                      onChange={(e) => setagreementTypeName(e.target.value)}
                      placeholder="Enter agreement type name"
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
        {/*EDIT MODAL*/}
        <Modal
          show={editshow}
          onHide={editClose}
          className={"modal fade"}
          centered
        >
          <form onSubmit={updateAgreementType}>
            <Modal.Header closeButton>
              <Modal.Title>Update agreement type</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                {error.color !== "" && (
                  <div className={"alert alert-" + error.color} role="alert">
                    {error.message}
                  </div>
                )}
                <div className="col-12">
                  <div className="form-group mb-4">
                    <label htmlFor="">
                      Agreement type name.{" "}
                      <strong className="text-danger ">*</strong>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={editAgreementTypeName}
                      onChange={(e) => setEditAgreementTypeName(e.target.value)}
                      placeholder="Enter agreement type name"
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
                onClick={editClose}
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

        {/* confirm deactivate  */}
        <div
          class="modal fade"
          id="confirm-deactivate2"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <center>
                  <h5>Deactivate this Agreement Type ?</h5>
                </center>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  no
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
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
          class="modal fade"
          id="confirm-activate2"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          role="dialog"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">
                <center>
                  <h5>Activate this Agreement Type ?</h5>
                </center>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  no
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => deactivate(activeId)}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LandlordSetup;
