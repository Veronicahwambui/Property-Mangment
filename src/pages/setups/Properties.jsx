/* global $ */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
import requestsServiceService from "../../services/requestsService.service";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { Modal } from "react-bootstrap";

function Properties() {
  const [list, setList] = useState([]);
  const [activeLink, setActiveLink] = useState(1);
  const [activeId, setActiveId] = useState("");
  const [createName, setCreateName] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [error, setError] = useState({
    message: "",
    color: "",
  });

  let key = authService.getAppKey();

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
  const [premiseTypes, setPremiseTypes] = useState([]);

  useEffect(() => {
    const endOffset = parseInt(itemOffset) + parseInt(size);
    setPremiseTypes(list?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list?.length / size));
  }, [itemOffset, size, list]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * size) % list?.length;
    setItemOffset(newOffset);
    setPage(event.selected);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  // fetch list function
  const fetchAll = () => {
    requestsServiceService.allPremiseTypes().then((res) => {
      console.log(res.data);
      setList(res.data.data);
    });
  };

  // create function
  const create = () => {
    let data = JSON.stringify({
      active: true,
      clientId: authService.getClientId(),
      id: 0,
      name: createName,
    });

    requestsServiceService
      .createPremiseTypes(data)
      .then((res) => {
        fetchAll();
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
          clear();
        }, 3000);
      });
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
    requestsServiceService.tooglePremiseType(activeId).then((res) => {
      console.log(res.data);
      fetchAll();
    });
  };

  // update function
  const Update = () => {
    let data = JSON.stringify({
      active: true,
      clientId: authService.getClientId(),
      id: activeId,
      name: updateName,
    });
    requestsServiceService
      .updatePremiseType(data)
      .then((res) => {
        fetchAll();
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
  // Premise  Use Type

  const [lists, setLists] = useState([]);
  // const [activeId, setActiveId] = useState("");
  const [createNames, setCreateNames] = useState("");
  const [updateNames, setUpdateNames] = useState("");

  // const [error, setError] = useState({
  //   message: "",
  //   color: "",
  // });
  // PAGINATION
  // const sortSize = (e) => {
  //   setPage(0);
  //   setItemOffset(0);
  //   setSize(parseInt(e.target.value));
  // };
  // const [page, setPage] = useState(0);
  // const [size, setSize] = useState(10);
  // const [pageCount, setPageCount] = useState(1);
  // const [itemOffset, setItemOffset] = useState(0);
  const [premiseUseTypes, setPremiseUseTypes] = useState([]);

  useEffect(() => {
    const endOffset = parseInt(itemOffset) + parseInt(size);
    setPremiseUseTypes(lists?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(lists?.length / size));
  }, [itemOffset, size, lists]);

  const handlePageClicks = (event) => {
    const newOffset = (event.selected * size) % lists?.length;
    setItemOffset(newOffset);
    setPage(event.selected);
  };

  useEffect(() => {
    fetchAllPremise();
  }, []);

  // fetch list function
  const fetchAllPremise = () => {
    requestsServiceService.allPremiseUseTypes().then((res) => {
      setLists(res.data.data);
    });
  };

  // create function
  const createPremise = () => {
    let data = JSON.stringify({
      active: true,
      clientId: authService.getClientId(),
      id: 0,
      name: createNames,
    });

    requestsServiceService
      .createPremiseUseTypes(data)
      .then((res) => {
        fetchAllPremise();
        $("#add-new-premise").modal("hide");

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
        $("#add-new-premise").modal("hide");

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

  // toggle function
  const toggleStatuses = () => {
    requestsServiceService
      .tooglePremiseUse(activeId)
      .then((res) => {
        fetchAllPremise();
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

  // update function
  const UpdatePremise = () => {
    let data = JSON.stringify({
      active: true,
      clientId: authService.getClientId(),
      id: activeId,
      name: updateNames,
    });
    requestsServiceService
      .updatePremiseUseType(data)
      .then((res) => {
        fetchAllPremise();
        $("#update-premise").modal("hide");

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
        $("#update-premise").modal("hide");

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
  // UnitTypes

  const [listUnit, setListUnit] = useState([]);
  //  const [activeId, setActiveId] = useState("");
  const [createNam, setCreateNam] = useState("");
  const [updateNam, setUpdateNam] = useState("");
  const [chargeTypes, setChargeTypes] = useState([]);
  const [selectedChargeTypes, setSelectedChargeTypes] = useState([]);
  const [chargeType, setChargeType] = useState("");
  const [createArr, setCreateArr] = useState();
  const [updateArr, setUpdateArr] = useState([]);

  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [purpose, setPurpose] = useState("");
  const [squarage, setSquarage] = useState("");
  const [monthCountForTenancyRenewal, setMonthCountForTenancyRenewal] =
    useState("");

  useEffect(() => {
    localStorage.setItem("activeId", activeId);
  }, [activeId]);

  useEffect(() => {
    fetchTypes();
    fetchAllUnit();
    let oldId = localStorage.getItem("activeId");
    setActiveId(oldId);
  }, []);
  // PAGINATION
  //  const sortSize = (e) => {
  //    setSize(parseInt(e.target.value));
  //    setPage(0);
  //    setItemOffset(0);
  //  };
  //  const [page, setPage] = useState(0);
  //  const [size, setSize] = useState(10);
  //  const [pageCount, setPageCount] = useState(1);
  //  const [itemOffset, setItemOffset] = useState(0);
  const [unitTypes, setUnitTypes] = useState([]);

  useEffect(() => {
    const endOffset = parseInt(itemOffset) + parseInt(size);
    setUnitTypes(listUnit?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(listUnit?.length / size));
  }, [itemOffset, size, listUnit]);

  const handlePageClic = (event) => {
    const newOffset = (event.selected * size) % listUnit?.length;
    setItemOffset(newOffset);
    setPage(event.selected);
  };

  // fetch list function
  const fetchAllUnit = () => {
    requestsServiceService.allUnitTypes().then((res) => {
      setListUnit(res.data.data);
    });
  };

  const fetchTypes = () => {
    requestsServiceService.allApplicableCharges("TENANT").then((res) => {
      setChargeTypes(res.data.data);
    });
  };

  // create function
  const createUnit = () => {
    let data = JSON.stringify({
      active: true,
      clientId: parseInt(authService.getClientId()),
      id: null,
      monthCountForTenancyRenewal: monthCountForTenancyRenewal,
      name: createNam,
      numberOfRooms: numberOfRooms,
      purpose: purpose,
      squarage: squarage,
      unitTypeApplicableCharges: selectedChargeTypes,
    });

    requestsServiceService
      .createUnitTypes(data)
      .then((res) => {
        fetchAllUnit();
        $("#add-new-unit").modal("hide");

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
        $("#add-new-unit").modal("hide");

        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });

        setTimeout(() => {
          cleared();
        }, 3000);
      });
  };

  const cleared = () => {
    setError({
      ...error,
      message: "",
      color: "",
    });
  };

  // toggle function
  const toggleStat = () => {
    requestsServiceService.toogleUnitType(activeId).then((res) => {
      fetchAllUnit();
    });
  };

  // update function
  const UpdateUnit = () => {
    let data = JSON.stringify({
      active: true,
      clientId: authService.getClientId(),
      id: activeId,
      monthCountForTenancyRenewal: monthCountForTenancyRenewal,
      name: updateNam,
      numberOfRooms: numberOfRooms,
      purpose: purpose,
      squarage: squarage,
      unitTypeApplicableCharges: selectedChargeTypes,
    });
    requestsServiceService
      .updateUnitType(data)
      .then((res) => {
        $("#update-unit").modal("hide");

        fetchAllUnit();

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
        $("#update-unit").modal("hide");

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

  const setChargeTypes1 = (el) => {
    let options = el.target.options;
    let userGroups = [];

    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        console.log("option ++ " + options[i].value);
        userGroups.push(parseInt(options[i].value));
      }
    }

    setSelectedChargeTypes(userGroups);
  };

  // TENANT DOCUMENTS

  // modals
  const [showDoc, setShow] = useState(false);
  const [showEditDoc, setShowEdit] = useState(false);
  const showDocumentModal = () => setShow(true);
  const hideDocumentModal = () => setShow(false);
  const showEditDocumentModal = () => setShowEdit(true);
  const hideEditDocumentModal = () => setShowEdit(false);
  useEffect(() => {
    fetchAllDocument();
  }, []);

  // document vars
  const [documentTypes, setDocumentTypes] = useState([]);
  const [docTypeName, setDocTypeName] = useState("");
  const [editDocTypeName, setEditDocTypeName] = useState("");

  const fetchAllDocument = () => {
    requestsServiceService.allDocumentTypes("PREMISE", true).then((res) => {
      setDocumentTypes(res.data.data != null ? res.data.data : []);
    });
  };
  const createDocument = (e) => {
    e.preventDefault();
    let data = {
      active: true,
      clientId: authService.getClientId(),
      id: null,
      name: docTypeName,
      entityType: "PREMISE",
    };
    requestsServiceService
      .createDocumentTypes(data)
      .then((res) => {
        fetchAllDocument();
        if (res.data.status) {
          setError({
            ...error,
            message: res.data.message,
            color: "success",
          });
          setTimeout(() => {
            hideDocumentModal();
          }, 1500);
          setDocTypeName("");
        } else {
          setError({
            ...error,
            message: res.data.message,
            color: "warning",
          });
        }
      })
      .catch((res) => {
        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });
      });
  };
  const updateDocument = (e) => {
    e.preventDefault();
    let data = {
      active: true,
      clientId: authService.getClientId(),
      id: activeId,
      name: editDocTypeName,
      entityType: "PREMISE",
    };
    requestsServiceService
      .updateDocumentType(data)
      .then((res) => {
        fetchAllDocument();
        if (res.data.status) {
          setError({
            ...error,
            message: res.data.message,
            color: "success",
          });
          setTimeout(() => {
            hideEditDocumentModal();
          }, 1500);
          setEditDocTypeName("");
        } else {
          setError({
            ...error,
            message: res.data.message,
            color: "warning",
          });
        }
      })
      .catch((res) => {
        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });
      });
  };
  useEffect(() => {
    setTimeout(() => {
      setError({
        ...error,
        message: "",
        color: "",
      });
    }, 3000);
  }, [error]);

  const toggleDocument = (activeId) => {
    requestsServiceService.toogleDocumentType(activeId).then((res) => {
      fetchAllDocument();
    });
  };

  return (
    <>
      <div class="page-content">
        <div class="container-fluid">
          {/* <!-- start page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">Property Settings</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <Link to="/">Dashboard </Link>
                    </li>
                    <li class="breadcrumb-item">Set Ups</li>

                    <li class="breadcrumb-item active">
                      Registered Property Types
                    </li>
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
                            Property Types <span className="sr-only"></span>
                          </a>

                          <a
                            onClick={() => setActiveLink(2)}
                            className={
                              activeLink === 2
                                ? "nav-item nav-link active cursor-pointer"
                                : "nav-item cursor-pointer nav-link"
                            }
                          >
                            Property Use Types
                          </a>
                          <a
                            onClick={() => setActiveLink(3)}
                            className={
                              activeLink === 3
                                ? "nav-item nav-link active cursor-pointer"
                                : "nav-item cursor-pointer nav-link"
                            }
                          >
                            Unit Types
                          </a>
                          <a
                            onClick={() => setActiveLink(4)}
                            className={
                              activeLink === 4
                                ? "nav-item nav-link active cursor-pointer"
                                : "nav-item cursor-pointer nav-link"
                            }
                          >
                            Documents
                          </a>
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>

              {activeLink === 1 && (
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
                                Property Type Register
                              </h4>
                            </div>

                            <div class="d-flex">
                              <button
                                onClick={() => {
                                  setCreateName("");
                                  fetchAll();
                                }}
                                type="button"
                                class="btn btn-primary waves-effect btn-label waves-light me-3"
                                data-bs-toggle="modal"
                                data-bs-target="#add-new-zone"
                              >
                                <i class="mdi mdi-plus label-icon"></i> Add
                                Property Type
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
                                  <th>Property Type</th>
                                  <th>Status</th>
                                  <th>Date Created</th>

                                  <th class="text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {premiseTypes &&
                                  premiseTypes?.map((val, index) => {
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
                                          <div class="d-flex align-items-center">
                                            <a
                                              onClick={() => {
                                                setActiveId(val.id);
                                                setUpdateName(val.name);
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
                                                data-bs-target="#confirm-deactivate"
                                                onClick={() =>
                                                  setActiveId(val.id)
                                                }
                                              >
                                                Deactivate
                                              </button>
                                            ) : (
                                              <button
                                                class="btn btn-success btn-sm btn-rounded text-uppercase px-3 py-0 mx-3"
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
                    {/* <!-- end col --> */}
                  </div>
                </div>
              )}

              {activeLink === 2 && (
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
                                Property Use Type Register
                              </h4>
                            </div>
                            <div class="d-flex">
                              <button
                                onClick={() => {
                                  setCreateNames("");
                                  fetchAllPremise();
                                }}
                                type="button"
                                class="btn btn-primary waves-effect btn-label waves-light me-3"
                                data-bs-toggle="modal"
                                data-bs-target="#add-new-premise"
                              >
                                <i class="mdi mdi-plus label-icon"></i> Add
                                Property Use Type
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
                                  <th>Property Use Type</th>
                                  <th>Status</th>
                                  <th>Date Created</th>

                                  <th class="text-right">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {premiseUseTypes &&
                                  premiseUseTypes?.map((val, index) => {
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
                                          <div class="d-flex align-items-center">
                                            <a
                                              onClick={() => {
                                                setActiveId(val.id);
                                                setUpdateNames(val.name);
                                              }}
                                              data-bs-toggle="modal"
                                              data-bs-target="#update-premise"
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
                                                data-bs-target="#confirm-deactivate2"
                                                onClick={() =>
                                                  setActiveId(val.id)
                                                }
                                              >
                                                Deactivate
                                              </button>
                                            ) : (
                                              <button
                                                class="btn btn-success btn-sm btn-rounded text-uppercase px-3 py-0 mx-3"
                                                title="deactivate"
                                                data-bs-toggle="modal"
                                                data-bs-target="#confirm-activate2"
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
              {activeLink === 3 && (
                <div>
                  <div class="row">
                    <div class="col-12">
                      <div class="card">
                        <div className="card-body">
                          {error.color !== "" && (
                            <div
                              className={"alert alert-" + error.color}
                              role="alert"
                            >
                              {error.message}
                            </div>
                          )}
                          <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                            <div
                              class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                              role="toolbar"
                            >
                              <div class="d-flex align-items-center flex-grow-1">
                                <h4 class="mb-0  bg-transparent  p-0 m-0">
                                  Unit Types
                                </h4>
                              </div>
                              <div class="d-flex">
                                <button
                                  onClick={() => {
                                    setMonthCountForTenancyRenewal("");
                                    setPurpose("");
                                    setNumberOfRooms("");
                                    setSquarage("");
                                  }}
                                  type="button"
                                  class="btn btn-primary waves-effect btn-label waves-light me-3"
                                  data-bs-toggle="modal"
                                  data-bs-target="#add-new-unit"
                                >
                                  <i class="mdi mdi-plus label-icon"></i> Add
                                  Unit Type
                                </button>
                              </div>
                            </div>
                          </div>
                          <div class="card-body">
                            <div class="table-responsive table-responsive-md">
                              <table class="table table-editable align-middle table-edits">
                                <thead class="table-light">
                                  <tr class="text-uppercase table-dark">
                                    <th>#</th>
                                    <th>Unit Type</th>
                                    <th>purpose</th>
                                    <th>no of rooms</th>
                                    <th>unit size</th>
                                    <th>months to renewal</th>
                                    <th>Status</th>
                                    <th>Date Created</th>

                                    <th class="text-center">Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {unitTypes &&
                                    unitTypes?.map((val, index) => {
                                      return (
                                        <tr data-id="1" key={index}>
                                          <td style={{ width: "80px" }}>
                                            {index + 1}
                                          </td>
                                          <td
                                            data-field="unit-num "
                                            className="text-capitalize"
                                          >
                                            {val.name}
                                          </td>
                                          <td className="text-capitalize">
                                            {val.purpose}
                                          </td>
                                          <td>{val.numberOfRooms} rooms</td>
                                          <td>
                                            {val.squarage} M <sup>2</sup>
                                          </td>
                                          <td>
                                            {val.monthCountForTenancyRenewal}
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

                                          <td class="text-center cell-change text-nowrap ">
                                            <div class="d-flex align-items-center justify-content-between">
                                              <a
                                                onClick={() => {
                                                  setActiveId(val.id);
                                                  setUpdateNam(val.name);
                                                  setMonthCountForTenancyRenewal(
                                                    val.monthCountForTenancyRenewal
                                                  );
                                                  setPurpose(val.purpose);
                                                  setNumberOfRooms(
                                                    val.numberOfRooms
                                                  );
                                                  setSquarage(val.squarage);
                                                }}
                                                data-bs-toggle="modal"
                                                data-bs-target="#update-unit"
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
                                                  class="btn btn-success btn-sm  btn-rounded text-uppercase px-3 py-0 mx-3"
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
                    </div>
                    {/* <!-- end col --> */}
                  </div>
                </div>
              )}

              {activeLink === 4 && (
                <>
                  <div>
                    <div className="row">
                      <div className="col-12">
                        <div className="card">
                          <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                            <div
                              className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                              role="toolbar"
                            >
                              <div className="d-flex align-items-center flex-grow-1">
                                <h4 className="mb-0  bg-transparent  p-0 m-0">
                                  Document Type Register
                                </h4>
                              </div>
                              <div className="d-flex">
                                <button
                                  onClick={() => {
                                    setCreateNames("");
                                    showDocumentModal();
                                  }}
                                  type="button"
                                  className="btn btn-primary waves-effect btn-label waves-light me-3"
                                >
                                  <i className="mdi mdi-plus label-icon"></i>{" "}
                                  Add Document Type
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="table-responsive table-responsive-md">
                              <table className="table table-editable align-middle table-edits">
                                <thead className="table-light">
                                  <tr className="text-uppercase table-dark">
                                    <th>#</th>
                                    <th>Document Type</th>
                                    <th>Status</th>
                                    <th>Date Created</th>

                                    <th className="text-right">Actions</th>
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
                                              <span className="badge-soft-success badge">
                                                Active
                                              </span>
                                            ) : (
                                              <span className="badge-soft-danger badge">
                                                Inactive
                                              </span>
                                            )}
                                          </td>
                                          <td>
                                            {moment(val.dateTimeCreated).format(
                                              "YYYY-MM-DD HH:mm"
                                            )}
                                          </td>

                                          <td className="text-right cell-change text-nowrap ">
                                            <div className="d-flex align-items-center justify-content-between">
                                              <a
                                                onClick={() => {
                                                  setActiveId(val.id);
                                                  setEditDocTypeName(val.name);
                                                  showEditDocumentModal();
                                                }}
                                                className="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit "
                                                title="Edit "
                                              >
                                                <i className="bx bx-edit-alt "></i>
                                              </a>

                                              {val.active ? (
                                                <button
                                                  className="btn btn-danger btn-sm btn-rounded text-uppercase px-2 mx-3"
                                                  title="deactivate"
                                                  onClick={() =>
                                                    toggleDocument(val.id)
                                                  }
                                                >
                                                  Deactivate
                                                </button>
                                              ) : (
                                                <button
                                                  className="btn btn-success btn-sm btn-rounded  text-uppercase px-3 py-0 mx-3"
                                                  title="deactivate"
                                                  onClick={() =>
                                                    toggleDocument(val.id)
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
                                {documentTypes?.length > 0 && pageCount !== 0 && (
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
                              {documentTypes?.length > 0 && pageCount !== 0 && (
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
                </>
              )}
              {/* <!-- end row --> */}
            </div>
            {/* <!-- container-fluid --> */}
          </div>

          {/* <!-- modals --> */}

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
                    create();
                  }}
                >
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                      New Property Type
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
                            Property Type <strong class="text-danger">
                              *
                            </strong>{" "}
                          </label>
                          <input
                            required
                            value={createName}
                            onChange={(e) => setCreateName(e.target.value)}
                            type="text"
                            class="form-control"
                            placeholder="Enter Property Type Name"
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
                    Update();
                  }}
                >
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                      Update Property Type
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
                            Property Type <strong class="text-danger">*</strong>
                          </label>
                          <input
                            required
                            value={updateName}
                            onChange={(e) => setUpdateName(e.target.value)}
                            type="text"
                            class="form-control"
                            placeholder="Enter Property Type name"
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
                    <h5>Deactivate this property type?</h5>
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
                    <h5>Activate this property type?</h5>
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
            id="add-new-premise"
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
                    createPremise();
                  }}
                >
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                      New Property Use Type
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
                            Property Use Type{" "}
                            <strong class="text-danger">*</strong>
                          </label>
                          <input
                            required
                            value={createNames}
                            onChange={(e) => setCreateNames(e.target.value)}
                            type="text"
                            class="form-control"
                            placeholder="Enter Property Use Type Name"
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
                    <button
                      type="submit"
                      class="btn btn-primary"
                      data-bs-dismiss="modal"
                    >
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
            id="update-premise"
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
                    UpdatePremise();
                  }}
                >
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                      Update Property Use Type
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
                            Property Use Type{" "}
                            <strong class="text-danger">*</strong>
                          </label>
                          <input
                            required
                            value={updateNames}
                            onChange={(e) => setUpdateNames(e.target.value)}
                            type="text"
                            class="form-control"
                            placeholder="Enter update name"
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
                    <h5>Deactivate this property use type?</h5>
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
                    <h5>Activate this property use type?</h5>
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

          {/* create modal */}
          <div
            class="modal fade"
            id="add-new-unit"
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
                    createUnit();
                  }}
                >
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                      New Unit Type
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
                            Unit Type Name{" "}
                            <strong class="text-danger">*</strong>
                          </label>
                          <input
                            required
                            value={createNam}
                            onChange={(e) => setCreateNam(e.target.value)}
                            type="text"
                            class="form-control"
                            placeholder="Enter unit type name"
                          />
                        </div>
                      </div>
                      <div class="col-12">
                        <label for="">
                          Charge Type <strong class="text-danger">*</strong>{" "}
                        </label>
                        <select
                          class=" form-control"
                          multiple
                          onChange={(e) => setChargeTypes1(e)}
                        >
                          {chargeTypes &&
                            chargeTypes
                              ?.sort((a, b) => a.name.localeCompare(b.name))
                              ?.map((charge, index) => {
                                return (
                                  <option
                                    key={index}
                                    value={charge.id}
                                    selected={selectedChargeTypes.includes(
                                      charge.name
                                    )}
                                  >
                                    {charge.name}
                                  </option>
                                );
                              })}
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="">
                          Purpose <strong class="text-danger">*</strong>
                        </label>
                        <input
                          required
                          type="text"
                          value={purpose}
                          className="form-control"
                          onChange={(event) => setPurpose(event.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">
                          Number of Rooms <strong class="text-danger">*</strong>
                        </label>
                        <input
                          required
                          type="text"
                          value={numberOfRooms}
                          className="form-control"
                          onChange={(event) =>
                            setNumberOfRooms(event.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">
                          unit size in M<sup>2</sup>{" "}
                          <strong class="text-danger">*</strong>
                        </label>
                        <input
                          required
                          type="text"
                          value={squarage}
                          className="form-control"
                          onChange={(event) => setSquarage(event.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="">
                          Months to renewal{" "}
                          <strong class="text-danger">*</strong>
                        </label>
                        <input
                          required
                          type="text"
                          value={monthCountForTenancyRenewal}
                          className="form-control"
                          onChange={(event) =>
                            setMonthCountForTenancyRenewal(event.target.value)
                          }
                        />
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
            id="update-unit"
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
                    UpdateUnit();
                  }}
                >
                  <div class="modal-header">
                    <h5 class="modal-title" id="staticBackdropLabel">
                      Update Unit Type
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
                            Unit Type Name{" "}
                            <strong class="text-danger">*</strong>
                          </label>
                          <input
                            required
                            value={updateNam}
                            onChange={(e) => setUpdateNam(e.target.value)}
                            type="text"
                            class="form-control"
                            placeholder="Enter update name"
                          />
                        </div>
                      </div>
                      <div class="col-12">
                        <label for="">
                          Charge Type <strong class="text-danger">*</strong>{" "}
                        </label>
                        <select
                          class="form-control"
                          data-live-search="true"
                          title="Select Applicable Charge Type"
                          multiple
                          onChange={(e) => setChargeTypes1(e)}
                        >
                          {chargeTypes &&
                            chargeTypes?.map((charge, index) => {
                              return (
                                <option
                                  key={index}
                                  value={charge.id}
                                  selected={selectedChargeTypes.includes(
                                    charge.name
                                  )}
                                  className="text-capitalize"
                                >
                                  {charge.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="">
                          Purpose <strong class="text-danger">*</strong>
                        </label>
                        <input
                          required
                          type="text"
                          value={purpose}
                          className="form-control"
                          onChange={(event) => setPurpose(event.target.value)}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">
                          Number of Rooms <strong class="text-danger">*</strong>
                        </label>
                        <input
                          required
                          type="text"
                          value={numberOfRooms}
                          className="form-control"
                          onChange={(event) =>
                            setNumberOfRooms(event.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="">
                          unit size in M<sup>2</sup>{" "}
                          <strong class="text-danger">*</strong>
                        </label>
                        <input
                          required
                          type="text"
                          value={squarage}
                          className="form-control"
                          onChange={(event) => setSquarage(event.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="">
                          Months to renewal{" "}
                          <strong class="text-danger">*</strong>
                        </label>
                        <input
                          required
                          type="text"
                          value={monthCountForTenancyRenewal}
                          className="form-control"
                          onChange={(event) =>
                            setMonthCountForTenancyRenewal(event.target.value)
                          }
                        />
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
                    <h5>Deactivate this Unit type?</h5>
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
                    onClick={() => toggleStat()}
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
                    <h5>Activate this Unit type?</h5>
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
                    onClick={() => toggleStat()}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <>
        {/*MODALS*/}

        <Modal show={showDoc} onHide={hideDocumentModal} centered>
          <form onSubmit={createDocument}>
            <Modal.Header closeButton>
              <h5 className="modal-title" id="staticBackdropLabel">
                New Document Type
              </h5>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-12">
                  <div className="form-group mb-4">
                    <label htmlFor="">
                      Document Type <strong className="text-danger">*</strong>{" "}
                    </label>
                    <input
                      required
                      defaultValue={docTypeName}
                      onChange={(e) => setDocTypeName(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Enter document type"
                    />
                  </div>
                </div>
                {error.color !== "" && (
                  <div
                    className={"mt-4 alert alert-" + error.color}
                    role="alert"
                  >
                    {error.message}
                  </div>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-light"
                onClick={hideDocumentModal}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </Modal.Footer>
          </form>
        </Modal>
        <Modal show={showEditDoc} onHide={hideEditDocumentModal} centered>
          <form onSubmit={updateDocument}>
            <Modal.Header closeButton>
              <h5 className="modal-title" id="staticBackdropLabel">
                New Document Type
              </h5>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-12">
                  <div className="form-group mb-4">
                    <label htmlFor="">
                      Document Type <strong className="text-danger">*</strong>{" "}
                    </label>
                    <input
                      required
                      defaultValue={editDocTypeName}
                      onChange={(e) => setEditDocTypeName(e.target.value)}
                      type="text"
                      className="form-control"
                      placeholder="Enter document type name"
                    />
                  </div>
                </div>
                {error.color !== "" && (
                  <div
                    className={"mt-4 alert alert-" + error.color}
                    role="alert"
                  >
                    {error.message}
                  </div>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                type="button"
                className="btn btn-light"
                onClick={hideEditDocumentModal}
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    </>
  );
}

export default Properties;
