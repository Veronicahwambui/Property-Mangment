/* global $*/
import moment from "moment";
import React, { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import requestsServiceService from "../../services/requestsService.service";
import { Button, Modal } from "react-bootstrap";
import { Link,useParams } from "react-router-dom";
import AuthService from "../../services/auth.service";

import ReactPaginate from "react-paginate";

function IssuesTypes() {
  const [issueTypes, setIssueTypes] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [activeLink, setActiveLink] = useState(1);
  



  useEffect(() => {
    getIssueTypes();
    getAll ()
    getApplicable();
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
  const [lists, setlists] = useState([]);

  useEffect(() => {
    const endOffset = parseInt(itemOffset) + parseInt(size);
    setIssueTypes(lists.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(lists.length / size));
  }, [itemOffset, size, lists]);

  const handlePageClicks = (event) => {
    const newOffset = (event.selected * size) % lists.length;
    setItemOffset(newOffset);
    setPage(event.selected);
  };

  const getIssueTypes = () => {
    requestsServiceService.getTenancyIssuesTypes().then((res) => {
      setlists(res.data.data);
      $("#spinner").addClass("d-none");
    });
  };

  const deactivate = (x) => {
    requestsServiceService.toggleIssueType(x).then((res) => {
      if (res.data.status === true) {
        getIssueTypes();
      }
    });
  };

//  general  settings


const[bouncedChequeChargeId,setBouncedChequeChargeId]=useState("")
const[chequeProcessingPeriod,setChequeProcessingPeriod]=useState("")
const[invoicePaymentPriority,setInvoicePaymentPriority]=useState("")
const[landlordSettlementChargeId,setLandlordSettlementChargeId]=useState("")
const[penaltyChargeId,setPenaltyChargeId]=useState("")
const[penaltyChargeRate,setpenaltyChargeRate]=useState("")
const[propertyTaxChargeId,setPropertyTaxChargeId]=useState("")
const[senderId,setSenderId]=useState("")
const[propertyTaxRate,setPropertyTaxRate]=useState("")
const[settlementPeriod,setsettlementPeriod]=useState("")
const[visitationChargeDay,setvisitationChargeDay]=useState("")
const[visitationChargeId,setvisitationChargeId]=useState("")
const[invo,setInvo]= useState([])
const [client, setClient] = useState([]);


const[]=useState("")
const createGeneral =() =>{
  let data = JSON.stringify({

   bouncedChequeChargeId: parseInt(bouncedChequeChargeId),
  chequeProcessingPeriod: chequeProcessingPeriod,
  id: clientId,
  invoicePaymentPriority:invoicePaymentPriority,
  landlordSettlementChargeId: landlordSettlementChargeId,
  penaltyChargeId: penaltyChargeId,
  penaltyChargeRate: penaltyChargeRate,
  propertyTaxChargeId: propertyTaxChargeId,
  propertyTaxRate: propertyTaxRate,
  senderId: senderId,
  settlementPeriod: settlementPeriod,
  visitationChargeDay: visitationChargeDay,
  visitationChargeId: visitationChargeId,
  });
  // console.log(data)
  requestsServiceService.createSettings(data).then((res) => {
    getAll()
    $("#add-new-settings").modal("hide");

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
        $("#add-new-settings").modal("hide");

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
   

  

}
let clientId= AuthService.getClientId()
const getApplicable =() => {
  requestsServiceService.allApplicableCharges("TENANT").then((res) => {
    setInvo(res.data.data)
    
  
  })
}
const getAll = () => {
  requestsServiceService.getClient(clientId).then((res) => {
    setClient(res.data.data.client);
  });
}
const [ac, setAC] = useState([]);
const [tmp, stmp] = useState([]);
const [chargeNames, setChargeNames] = useState([]);
const handleACchange = (e, i) => {
  let id = e.target.value.split("-")[0];
  let name = e.target.value.split("-")[1];
  if (tmp?.includes(id)) {
    //
  } else {
    stmp([...tmp, id]);
  }
  if (chargeNames.includes(name)) {
  } else {
    setChargeNames([...chargeNames, name]);
  }
};


// ALL Roles
const [allRoles, setAllRoles] = useState([]);
const [roleName, setRoleName] = useState("");
const [oneRole, setOneRole] = useState([]);
const [editName, setEditName] = useState("");
const [privileges, setPrivileges] = useState([]);
const [roleAdd, setRoleAdd] = useState(true);
const [priveledgeNames, setPrivilegeNames] = useState([]);
const [rolePriveledges, setRolePriveledges] = useState([]);
const [editPriveledges, setEditPriveledges] = useState([]);
const [roleID, setRoleID] = useState("");
const [error, setError] = useState({
  message: "",
  color: "",
});

useEffect(() => {
  getAllRoles();
  getAllPreviledges();
}, []);

// PAGINATION
const sortSizes = (e) => {
  setSize(parseInt(e.target.value));
  setPage(0);
  setItemOffset(0);
};
// const [page, setPage] = useState(0);
// const [size, setSize] = useState(10);
// const [pageCount, setPageCount] = useState(1);
// const [itemOffset, setItemOffset] = useState(0);
const [lis, setlis] = useState([]);

useEffect(() => {
  const endOffset = parseInt(itemOffset) + parseInt(size);
  setAllRoles(lis.slice(itemOffset, endOffset));
  setPageCount(Math.ceil(lis.length / size));
}, [itemOffset, size, lis]);

const handlePageClick = (event) => {
  const newOffset = (event.selected * size) % lis.length;
  setItemOffset(newOffset);
  setPage(event.selected);
};

useEffect(() => {
  getAllRoles();
  //    getAllPreviledges()
}, [roleAdd]);

// get all priveledges
const getAllPreviledges = () => {
  requestsServiceService
    .getAllPreviledges()
    .then((res) => {
      // console.log(res.data.data);
      setPrivileges(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const handleEdit = (id) => {
  getOneRole(id);

  setRoleID(id);
};

// add a new role
const AddARole = () => {
  const data = JSON.stringify({
    id: null,
    name: roleName,
    permissions: priveledgeNames,
  });

  requestsServiceService
    .AddRole(data)
    .then((res) => {
      setPrivilegeNames([]);
      getAllRoles();

      $("#add-new-role").modal("hide");
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

  setRoleAdd(!roleAdd);
  setPrivilegeNames([]);
  setRoleName("");
};

const clears = () => {
  setError({
    ...error,
    message: "",
    color: "",
  });
};

// fetch one role
const getOneRole = (iD) => {
  requestsServiceService
    .getOneRole(iD)
    .then((res) => {
      setOneRole(res.data.data);
      setRolePriveledges(res.data.data.permissions);
      setEditPriveledges(res.data.data.permissions);
      setEditName(res.data.data.name);
    })
    .catch((err) => {
      console.log(err);
    });
};

//   get all roles

const getAllRoles = () => {
  requestsServiceService
    .getAllRoles()
    .then((res) => {
      setlis(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

//  edit a role
const editARole = () => {
  const data = JSON.stringify({
    id: roleID,
    name: editName,
    permissions: editPriveledges,
  });
  requestsServiceService
    .EditRole(data)
    .then((res) => {
      getAllRoles();
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
        clear();
      }, 3000);
    });
};
const handleRoleChange = (index, event) => {
  const { checked, value } = event.target;

  if (checked) {
    setPrivilegeNames([...priveledgeNames, privileges[index].name]);
  } else {
    setPrivilegeNames(
      priveledgeNames.filter(
        (priveledgeName) => priveledgeName !== privileges[index].name
      )
    );
  }
};

const handleEditRole = (index, event) => {
  const { checked, value } = event.target;

  if (checked) {
    setEditPriveledges([...editPriveledges, privileges[index].name]);
  } else {
    setEditPriveledges(
      editPriveledges.filter(
        (priveledgeName) => priveledgeName !== privileges[index].name
      )
    );
  }
};

//  CLlents countries
const [allCounties, setAllCounties] = useState([]);
const [clientCounties, setClientCounties] = useState([]);
const [selectedCounty, setSelectedCounty] = useState("");


useEffect(() => {
  getClientCounties();
  getCounties();
}, []);
// PAGINATION
// const sotSize = (e) => {
//   setSize(parseInt(e.target.value));
//   setPage(0);
//   setItemOffset(0);
// };
// const [page, setPage] = useState(0);
// const [size, setSize] = useState(10);
// const [pageCount, setPageCount] = useState(1);
// const [itemOffset, setItemOffset] = useState(0);
const [listed, setlisted] = useState([]);

useEffect(() => {
  const endOffset = parseInt(itemOffset) + parseInt(size);
  setClientCounties(listed.slice(itemOffset, endOffset));
  setPageCount(Math.ceil(listed.length / size));
}, [itemOffset, size, listed]);

const handlPageClick = (event) => {
  const newOffset = (event.selected * size) % listed.length;
  setItemOffset(newOffset);
  setPage(event.selected);
};

//   const deactivate

const deactivates= (id) => {
  requestsServiceService.deactivateCounty(id).then((res) => {
    console.log(res);
    getClientCounties();
  });
};

// create client county
const createCounty = () => {
  const data = JSON.stringify({
    active: true,
    clientId: authService.getClientId(),
    countyId: selectedCounty,
    id: 0,
  });

  requestsServiceService
    .createCounty(data)
    .then((res) => {
      getClientCounties();

      $("#add-new-country").modal("hide");

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
      $("#add-new-country").modal("hide");

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

// get client counties
const getClientCounties = () => {
  requestsServiceService.getClientCounties().then((res) => {
    setlisted(res.data.data);
  });
};
//  get all counties
const getCounties = () => {
  requestsServiceService.getAllCounties().then((res) => {
    setAllCounties(res.data.data);
  });
};


//====== All Zones=============
const [zones, setZones] = useState([]);
  const [zoneName, setZoneName] = useState("");

 
  const [editNames, setEditNames] = useState("");
  const [newCounty, setNewCounty] = useState("");
  const [zoneId, setZoneId] = useState("");

  const handleEdits = (name, id, zonId) => {
    setEditNames(name);
    setNewCounty(id);
    setZoneId(zonId);
  };

  console.log(newCounty);

  useEffect(() => {
    getZones();
    getClientCounties();
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
  const [list, setlist] = useState([]);

  useEffect(() => {
    const endOffset = parseInt(itemOffset) + parseInt(size);
    setZones(list.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list.length / size));
  }, [itemOffset, size, list]);

  const handlePageClck = (event) => {
    const newOffset = (event.selected * size) % list.length;
    setItemOffset(newOffset);
    setPage(event.selected);
  };

  // get client counties
  // const getClientCounties = () => {
  //   requestsServiceService.getClientCounties().then((res) => {
  //     setClientCounties(res.data.data);
  //   });
  // };
  // console.log(zones);
  // create zone

  const createZone = () => {
    let data = JSON.stringify({
      active: true,
      clientCountyId: parseInt(selectedCounty),
      id: 0,
      name: zoneName,
    });

    requestsServiceService
      .createZone(data)
      .then((res) => {
        getZones();
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
          clea();
        }, 3000);
      })
      .catch((res) => {
        $("#add-new-zone").modal("hide");

        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });
      });
  };

  const clea = () => {
    setError({
      ...error,
      message: "",
      color: "",
    });
  };
  // get all zones

  const getZones = () => {
    requestsServiceService.getAllZones().then((res) => {
      console.log(res.data);
      setlist(res.data.data);
    });
  };

  // update zone

  const updateZone = () => {
    let data = JSON.stringify({
      active: true,
      clientCountyId: newCounty,
      id: zoneId,
      name: editName,
    });

    requestsServiceService
      .editZone(data)
      .then((res) => {
        // console.log(res.data);
        getZones();
        $("#edit-zone").modal("hide");

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
        $("#edit-zone").modal("hide");

        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });
      });
  };

  //   const deactivate

  const deactivte = (id) => {
    requestsServiceService.deactivateZone(id).then((res) => {
      getZones();
    });
  };

  //=============== All Estates=========================

  const [estates, setEstates] = useState([]);
 
  const [estateName, setEstateName] = useState("");
 
  const [selectedZone, setSelectedZone] = useState("");

  const handleEdit1 = (name, id, zonId) => {
    setEditName1(name);
    setNewZone(id);
    setEstateId(zonId);
  };

  const [editName1, setEditName1] = useState("");
  const [newZone, setNewZone] = useState("");
  const [estateId, setEstateId] = useState("");


  useEffect(() => {
    getZones();
    getEstates();
  }, []);

  // PAGINATION
  const sortSize1 = (e) => {
    setSize(parseInt(e.target.value));
    setPage(0);
    setItemOffset(0);
  };
  // const [page, setPage] = useState(0);
  // const [size, setSize] = useState(10);
  // const [pageCount, setPageCount] = useState(1);
  // const [itemOffset, setItemOffset] = useState(0);
  const [list1, setlist1] = useState([]);

  useEffect(() => {
    const endOffset = parseInt(itemOffset) + parseInt(size);
    setEstates(list1.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list1.length / size));
  }, [itemOffset, size, list1]);

  const handlePageClick1 = (event) => {
    const newOffset = (event.selected * size) % list1.length;
    setItemOffset(newOffset);
    setPage(event.selected);
  };

  // get all zones

  const getZones1 = () => {
    requestsServiceService.getAllZones().then((res) => {
      setZones(res.data.data);
    });
  };

  // create estate

  const createEstates = () => {
    let data = JSON.stringify({
      active: true,
      id: null,
      name: estateName,
      zoneId: newZone,
    });
    requestsServiceService
      .createEstate(data)
      .then((res) => {
        getEstates();
        $("#add-new-estate").modal("hide");

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
          clear1();
        }, 3000);
      })
      .catch((res) => {
        $("#add-new-estate").modal("hide");

        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });
      });
  };

  const clear1 = () => {
    setError({
      ...error,
      message: "",
      color: "",
    });
  };
  // get all estates

  const getEstates = () => {
    requestsServiceService.getAllEstates().then((res) => {
      setlist1(res.data.data);
    });
  };

  //   const deactivate

  const deactivate1 = (id) => {
    requestsServiceService.deactivateEstate(id).then((res) => {
      getEstates();
    });
  };

  // update zone

  const updateEstate = () => {
    let data = JSON.stringify({
      active: true,
      id: estateId,
      name: editName,
      zoneId: newZone,
    });

    requestsServiceService
      .editEstate(data)
      .then((res) => {
        getEstates();
        $("#edit-estate").modal("hide");

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
        $("#edit-estate").modal("hide");

        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });
      });
  };









  return (
    <>
      <div class="page-content">
        <div class="container-fluid">
          <div id="spinner" className={""}>
            <div id="status">
              <div className="spinner-chase">
                <div className="chase-dot"></div>
                <div className="chase-dot"></div>
                <div className="chase-dot"></div>
                <div className="chase-dot"></div>
                <div className="chase-dot"></div>
                <div className="chase-dot"></div>
              </div>
            </div>
          </div>
          {/* <!-- start page title --> */}
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">Issue Types</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <Link to="/">Dashboard </Link>
                    </li>
                    <li class="breadcrumb-item">Set Ups</li>
                    <li class="breadcrumb-item active">Issue Types</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
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
                          Issues Types<span className="sr-only"></span>
                        </a>
                       
                        <a
                          onClick={() => setActiveLink(2)}
                          className={
                            activeLink === 2
                              ? "nav-item nav-link active cursor-pointer"
                              : "nav-item cursor-pointer nav-link"
                          }
                        >
                          General 
                        </a>
                          
                        <a
                          onClick={() => setActiveLink(3)}
                          className={
                            activeLink === 3
                              ? "nav-item nav-link active cursor-pointer"
                              : "nav-item cursor-pointer nav-link"
                          }
                        >
                         Roles and Permissions
                        </a>
                      
                     
                        <a
                          onClick={() => setActiveLink(4)}
                          className={
                            activeLink === 4
                              ? "nav-item nav-link active cursor-pointer"
                              : "nav-item cursor-pointer nav-link"
                          }
                        >
                       Client Countries
                        </a>

                        <a
                          onClick={() => setActiveLink(5)}
                          className={
                            activeLink === 5
                              ? "nav-item nav-link active cursor-pointer"
                              : "nav-item cursor-pointer nav-link"
                          }
                        >
                         Zones
                        </a>
                        <a
                          onClick={() => setActiveLink(6)}
                          className={
                            activeLink === 6
                              ? "nav-item nav-link active cursor-pointer"
                              : "nav-item cursor-pointer nav-link"
                          }
                        >
                         Estates
                        </a>
                        
                        
                      </div>
                    </div>
                </nav>
                  </div>
                </div>
              </div>
          {/* <!-- end page title --> */}
          {activeLink === 1 &&(

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
                        {/*Issue Types Register*/}
                      </h4>
                    </div>
                    <div class="d-flex">
                      <Link to="/create-issue-type">
                        <button
                          type="button"
                          className="btn btn-primary waves-effect btn-label waves-light me-3"
                        >
                          <i className="mdi mdi-plus label-icon"></i> Add Issue
                          Type
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="table-responsive table-responsive-md">
                    <table class="table table-editable align-middle table-edits table-striped">
                      <thead class="table-light">
                        <tr class="text-uppercase table-light">
                          <th>#</th>
                          <th>Name</th>
                          <th>Initial Status</th>
                          <th>Resolved Status</th>
                          <th>Status</th>
                          <th>Date Created</th>

                          <th class="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {issueTypes?.map((iT, index) => {
                          return (
                            <tr
                              data-id="1"
                              key={index}
                              className={"text-uppercase"}
                            >
                              <td style={{ width: "80px" }}>{index + 1}</td>
                              <td data-field="unit-num ">{iT.name}</td>
                              <td data-field="unit-num ">{iT.initialStatus}</td>
                              <td data-field="unit-num ">{iT.resolveStatus}</td>
                              <td data-field="unit-num ">
                                {iT.active ? (
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
                                {moment(iT.dateTimeCreated).format(
                                  "YYYY-MM-DD HH:mm"
                                )}
                              </td>

                              <td class="text-right cell-change text-nowrap ">
                                <div className="d-flex align-items-center">
                                  <Link
                                    to={`/issuestypes/${iT.id}`}
                                    state={{ issueType: iT }}
                                  >
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-sm btn-rounded waves-effect waves-light"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit"
                                      onClick={() => {}}
                                      style={{ marginLeft: "8px" }}
                                    >
                                      View Details
                                    </button>
                                  </Link>
                                  {iT.active ? (
                                    <button
                                      class="btn btn-danger btn-sm btn-rounded text-uppercase px-2 mx-3"
                                      title="deactivate"
                                      data-bs-toggle="modal"
                                      data-bs-target="#confirm-deactivate"
                                      onClick={() => setActiveId(iT.id)}
                                    >
                                      Deactivate
                                    </button>
                                  ) : (
                                    <button
                                      class="btn btn-success btn-sm btn-rounded w-5 text-uppercase px-3 mx-3"
                                      title="deactivate"
                                      data-bs-toggle="modal"
                                      data-bs-target="#confirm-activate"
                                      onClick={() => setActiveId(iT.id)}
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
                              onPageChange={(data) => handlePageClick(data)}
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
                        <span className="text-primary"> {pageCount}</span> pages
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
                            <div className="row">
              <div className="col-12">
                <div className="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                  <div
                    className="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                    role="toolbar"
                  >
                    <div className="d-flex align-items-center flex-grow-1">
                      <h4 className="mb-0  bg-transparent  p-0 m-0">
                        
                      </h4>
                    </div>
                    <div className="d-flex align-items-center flex-grow-1"></div>
                    <div className="d-flex">
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#add-new-settings"
                     
                        className="btn btn-primary dropdown-toggle option-selector"
                      >
                        <i className="dripicons-plus font-size-16"></i>{" "}
                        <span className="pl-1 d-md-inline">
                       Add General Settings
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="card calc-h-3px">
                  <div className={"d-flex"}>
                    <div className="card-body border-top">
                      <p className="p-0 m-0">
                        <span className="text-muted">BouncedChequeChargeId :</span>
                        {client?.bouncedChequeCharge.name}
                      </p>
                    </div>
                    <div className="card-body border-top">
                      <p className="p-0 m-0">
 ChequeProcessingPeriod :
                        <span className="text-muted"></span>
                        {client?.chequeProcessingPeriod}
                      </p>
                    </div>
                    <div className="card-body border-top">
                      <p className="p-0 m-0">
                        <span className="text-muted">
                        InvoicePaymentPriority:{" "}
                        </span>
                        {client?. invoicePaymentPriority}
                      </p>
                    </div>
                   
                  </div>
                  <div className={"d-flex"}>
                  <div className="card-body ">
                      <p className="p-0 m-0">
                        <span className="text-muted">  LandlordSettlementChargeId:
 </span>
                        {client?.landlordSettlementCharge.name}
                      </p>
                    </div>
                    <div className="card-body ">
                      <p className="p-0 m-0">
                      PenaltyChargeId:
                        <span className="text-muted"></span>
                        {client?.penaltyCharge.name}
                    
                      </p>
                    </div>
                    <div className="card-body ">
                      <p className="p-0 m-0">
                        <span className="text-muted">
                        PenaltyChargeRate:{" "}
                        </span>
                        {client?.penaltyChargeRate}
                      </p>
                    </div>
                    </div>


                    <div className={"d-flex"}>
                  <div className="card-body ">
                      <p className="p-0 m-0">
                        <span className="text-muted"> PropertyTaxCharge:
 </span>
                        {client?.propertyTaxCharge.name}
                      </p>
                    </div>
                    <di v className="card-body ">
                      <p className="p-0 m-0">
                      Sender:
                        <span className="text-muted"></span>
                        {client?.senderId}
                    
                      </p>
                    </di>
                    <div className="card-body ">
                      <p className="p-0 m-0">
                        <span className="text-muted">
                        PropertyTaxRate:{" "}
                        </span>
                        {client?.propertyTaxRate}
                      </p>
                    </div>
                    </div>

                    <div className={"d-flex"}>
                  <div className="card-body ">
                      <p className="p-0 m-0">
                        <span className="text-muted"> SettlementPeriod:
 </span>
                        {client?.settlementPeriod}
                      </p>
                    </div>
                    <di v className="card-body ">
                      <p className="p-0 m-0">
                      VisitationChargeDay:
                        <span className="text-muted"></span>
                        {client?.visitationChargeDay}
                    
                      </p>
                    </di>
                    <div className="card-body ">
                      <p className="p-0 m-0">
                        <span className="text-muted">
                        VisitationCharge :{" "}
                        </span>
                        {client?.visitationCharge.name}
                      </p>
                    </div>
                    </div>
                    
                   
                   
                  </div>
                </div>
              </div>
            </div>







                       
            )}

{activeLink === 3 &&(
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
                        Permissions Register
                      </h4>
                    </div>
                    <div class="d-flex">
                      <button
                        type="button"
                        class="btn btn-primary waves-effect btn-label waves-light me-3"
                        data-bs-toggle="modal"
                        data-bs-target="#add-new-role"
                      >
                        <i class="mdi mdi-plus label-icon"></i> Add A role
                      </button>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  {error.color !== "" && (
                    <div className={"alert alert-" + error.color} role="alert">
                      {error.message}
                    </div>
                  )}
                  <div class="table-responsive table-responsive-md">
                    <table class="table table-editable align-middle table-edits">
                      <thead class="table-light">
                        <tr class="text-uppercase table-dark">
                          <th>#</th>
                          <th>Role Name</th>
                          <th>Status</th>
                          <th>Date Created</th>
                          <th class="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allRoles &&
                          allRoles?.map((role, index) => (
                            <tr data-id={index} key={index}>
                              <td style={{ width: "80px" }}>{index + 1}</td>
                              <td data-field="estate">{role.name}</td>
                              <td data-field="unit-num ">
                                <span class="badge-soft-success badge">
                                  Active
                                </span>
                              </td>
                              <td>
                                {moment(role.dateTimeCreated).format(
                                  "YYYY-MM-DD HH:mm"
                                )}
                              </td>

                              <td class="text-right">
                                <div class="dropdown">
                                  <a
                                    class="text-muted font-size-16"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                  >
                                    <i class="bx bx-dots-vertical-rounded"></i>
                                  </a>

                                  <div class="dropdown-menu dropdown-menu-end text-capitalize">
                                    <p
                                      onClick={() => getOneRole(role.id)}
                                      class="dropdown-item"
                                      data-bs-toggle="modal"
                                      data-bs-target="#role-permissions"
                                      href="#"
                                    >
                                      <i class="font-size-15 mdi mdi-eye-outline me-3"></i>
                                      View Permissions
                                    </p>
                                    <p
                                      onClick={() => handleEdit(role.id)}
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit-role"
                                      class="dropdown-item"
                                      href="#"
                                    >
                                      <i class="font-size-15 mdi mdi-pencil me-3"></i>
                                      Edit
                                    </p>
                                    {/* <a class="dropdown-item text-danger" href="#"><i class="font-size-15 mdi mdi-close-circle me-3"></i>Deactivate</a> */}
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
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
                              onPageChange={(data) => handlePageClicks(data)}
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
                        <span className="text-primary"> {pageCount}</span> pages
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
      

      {activeLink === 4 &&(
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
                        County Register
                      </h4>
                    </div>
                    <div class="d-flex">
                      <button
                        onClick={() => {
                          allCounties && setSelectedCounty(allCounties[0].id);
                        }}
                        type="button"
                        class="btn btn-primary waves-effect btn-label waves-light me-3"
                        data-bs-toggle="modal"
                        data-bs-target="#add-new-country"
                      >
                        <i class="mdi mdi-plus label-icon"></i> Add a county
                      </button>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  {error.color !== "" && (
                    <div className={"alert alert-" + error.color} role="alert">
                      {error.message}
                    </div>
                  )}
                  <div class="table-responsive table-responsive-md">
                    <table class="table table-editable align-middle table-edits">
                      <thead class="table-light">
                        <tr class="text-uppercase table-dark">
                          <th>#</th>
                          <th>County</th>
                          <th>Status</th>
                          <th>Date Created</th>
                          <th class="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientCounties &&
                          clientCounties?.map((cou, index) => {
                            let county = cou.county;
                            return (
                              <tr data-id="1" key={county.id}>
                                <td style={{ width: "80px" }}>{index + 1}</td>
                                <td data-field="unit-num ">{county.name}</td>
                                <td data-field="unit-num ">
                                  {cou.active ? (
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
                                  {moment(cou.dateTimeCreated).format(
                                    "YYYY-MM-DD HH:mm"
                                  )}
                                </td>

                                <td class=" align-items-center text-right cell-change text-nowrap ">
                                  {cou.active ? (
                                    <button
                                      class="btn btn-danger btn-sm btn-rounded  text-uppercase px-2 mx-3"
                                      title="deactivate"
                                      data-bs-toggle="modal"
                                      data-bs-target="#confirm-deactivate1"
                                      onClick={() => setActiveId(county.id)}
                                    >
                                      Deactivate
                                    </button>
                                  ) : (
                                    <button
                                      class="btn btn-success btn-sm btn-rounded w-5 text-uppercase px-3 mx-3"
                                      title="deactivate"
                                      data-bs-toggle="modal"
                                      data-bs-target="#confirm-activate1"
                                      onClick={() => setActiveId(county.id)}
                                    >
                                      Activate
                                    </button>
                                  )}
                                </td>
                              </tr>
                            );
                          })}

                        <tr class="cloneCharges d-none">
                          <td style={{ width: "80px" }} class="categoryIndex ">
                            #
                          </td>
                          <td>
                            <input
                              type="text "
                              class="form-control "
                              placeholder="estate Name"
                            />
                          </td>

                          <td>
                            <select
                              class="form-select"
                              style={{ width: "130px" }}
                            >
                              <option value="">Nairobi</option>
                              <option value="">Mombasa</option>
                              <option value="">Nakuru</option>
                            </select>
                          </td>
                          <td>-</td>
                          <td>-</td>
                          <td>-</td>

                          <td class="text-right cell-change d-flex align-items-center justify-content-end">
                            <button
                              class="btn btn-primary btn-sm text-uppercase px-3 save-new-btn mx-3 "
                              title="save "
                            >
                              Add
                            </button>
                            <a
                              class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent cancel-new-category "
                              title="Cancel "
                            >
                              <i class="bx bx-x "></i>
                            </a>
                          </td>
                        </tr>
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
                              onPageChange={(data) => handlPageClick(data)}
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
                        <span className="text-primary"> {pageCount}</span> pages
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


{activeLink === 5 &&(
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
                        Zone Register
                      </h4>
                    </div>
                    <div class="d-flex">
                      <button
                        onClick={() => {
                          setZoneName("");
                          clientCounties &&
                            setSelectedCounty(clientCounties[0].id);
                          getClientCounties();
                        }}
                        type="button"
                        class="btn btn-primary waves-effect btn-label waves-light me-3"
                        data-bs-toggle="modal"
                        data-bs-target="#add-new-zone"
                      >
                        <i class="mdi mdi-plus label-icon"></i> Add Zone
                      </button>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  {error.color !== "" && (
                    <div className={"alert alert-" + error.color} role="alert">
                      {error.message}
                    </div>
                  )}
                  <div class="table-responsive table-responsive-md">
                    <table class="table table-editable align-middle table-edits">
                      <thead class="table-light">
                        <tr class="text-uppercase table-dark">
                          <th>#</th>
                          <th>Zone</th>
                          <th>County</th>
                          <th>Status</th>
                          <th>Date Created</th>
                          <th class="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {zones &&
                          zones.map((zon, index) => {
                            return (
                              <tr data-id="1" key={zon.id}>
                                <td style={{ width: "80px" }}>{index + 1}</td>
                                <td
                                  data-field="unit-numv "
                                  className="text-capitalize"
                                >
                                  {zon.name}
                                </td>
                                <td
                                  data-field="unit-numv "
                                  className="text-capitalize"
                                >
                                  {zon?.clientCounty.county.name
                                    ?.toLowerCase()
                                    ?.replace(/_/g, " ")}
                                </td>
                                <td data-field="unit-num ">
                                  {zon.active ? (
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
                                  {moment(zon.dateTimeCreated).format(
                                    "YYYY-MM-DD HH:mm"
                                  )}
                                </td>

                                <td class="text-right cell-change text-nowrap ">
                                  <div className="d-flex align-items-center">
                                    <a
                                      onClick={() => {
                                        handleEdits(
                                          zon.name,
                                          zon.clientCounty.id,
                                          zon.id
                                        );
                                      }}
                                      class="btn btn-light btn-sm btn-rounded waves-effect btn-circle btn-transparent edit "
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit-zone"
                                      title="Edit "
                                    >
                                      <i class="bx bx-edit-alt "></i>
                                    </a>
                                    {zon.active ? (
                                      <button
                                        class="btn btn-danger btn-sm btn-rounded text-uppercase px-2 mx-3"
                                        title="deactivate"
                                        data-bs-toggle="modal"
                                        data-bs-target="#confirm-deactivate2"
                                        onClick={() => setActiveId(zon.id)}
                                      >
                                        Deactivate
                                      </button>
                                    ) : (
                                      <button
                                        class="btn btn-success btn-sm w-5 text-uppercase px-3 mx-3"
                                        title="deactivate"
                                        data-bs-toggle="modal"
                                        data-bs-target="#confirm-activate2"
                                        onClick={() => setActiveId(zon.id)}
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
                              onPageChange={(data) => handlePageClck(data)}
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
                        <span className="text-primary"> {pageCount}</span> pages
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

{activeLink === 6 &&(


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
                        Estate Register
                      </h4>
                    </div>
                    <div class="d-flex">
                      <button
                        onClick={() => {
                          zones && setSelectedZone(zones[0].id);
                          setEstateName("");
                          getZones1();
                        }}
                        type="button"
                        class="btn btn-primary waves-effect btn-label waves-light me-3"
                        data-bs-toggle="modal"
                        data-bs-target="#add-new-estate"
                      >
                        <i class="mdi mdi-plus label-icon"></i> Add Estate
                      </button>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  {error.color !== "" && (
                    <div className={"alert alert-" + error.color} role="alert">
                      {error.message}
                    </div>
                  )}
                  <div class="table-responsive table-responsive-md">
                    <table class="table table-editable align-middle table-edits">
                      <thead class="table-light">
                        <tr class="text-uppercase table-dark">
                          <th>#</th>
                          <th>Estate</th>
                          <th>Zone</th>
                          <th>County</th>
                          <th>Status</th>
                          <th>Date Created</th>

                          <th class="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {estates &&
                          estates.map((estate, index) => {
                            return (
                              <tr data-id="1" key={estate.id}>
                                <td style={{ width: "80px" }}>{index + 1}</td>
                                <td className="text-capitalize">
                                  {estate.name}
                                </td>
                                <td className="text-capitalize">
                                  {estate.zone.name}
                                </td>
                                <td className="text-capitalize">
                                  {estate.zone.clientCounty.county.name.toLowerCase()}
                                </td>
                                <td>
                                  {estate.active ? (
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
                                  {moment(estate.dateTimeCreated).format(
                                    "YYYY-MM-DD HH:mm"
                                  )}
                                </td>

                                <td class="text-right cell-change text-nowrap">
                                  <div className=" align-items-center d-flex">
                                    <a
                                      onClick={() => {
                                        handleEdit1(
                                          estate.name,
                                          estate.zone.id,
                                          estate.id
                                        );
                                      }}
                                      class="btn btn-light btn-sm btn-rounded waves-effect btn-circle btn-transparent edit"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit-estate"
                                      title="Edit "
                                    >
                                      <i class="bx bx-edit-alt "></i>
                                    </a>
                                    {estate.active ? (
                                      <button
                                        class="btn btn-danger btn-sm btn-rounded  text-uppercase px-2 mx-3"
                                        title="deactivate"
                                        data-bs-toggle="modal"
                                        data-bs-target="#confirm-deactivate3"
                                        onClick={() => setActiveId(estate.id)}
                                      >
                                        Deactivate
                                      </button>
                                    ) : (
                                      <button
                                        class="btn btn-success btn-sm w-5 text-uppercase px-3 mx-3"
                                        title="deactivate"
                                        data-bs-toggle="modal"
                                        data-bs-target="#confirm-activate3"
                                        onClick={() => setActiveId(estate.id)}
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
                              onPageChange={(data) => handlePageClick1(data)}
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
                        <span className="text-primary"> {pageCount}</span> pages
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


          {/* <!-- end row --> */}
        </div>
        {/* <!-- container-fluid --> */}
      </div>

      {/*MODALS*/}


            {/* <!-- modals --> */}
            <div
        class="modal fade"
        id="add-new-estate"
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
                createEstates();
              }}
            >
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  New Estate
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
                        Estate Name <strong class="text-danger">*</strong>
                      </label>
                      <input
                        required
                        value={estateName}
                        onChange={(e) => setEstateName(e.target.value)}
                        type="text"
                        class="form-control"
                        placeholder="Enter estate name"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <label for=""> Zone </label>
                    <select
                      class="form-control"
                      data-live-search="true"
                      title="Select county where the zone is"
                      onChange={(e) => setNewZone(e.target.value)}
                    >
                      <option value="">Select Estate</option>
                      {zones &&
                        zones.map((zon, index) => (
                          <option key={index} value={zon.id}>
                            {zon.name}
                          </option>
                        ))}
                    </select>
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

      {/* edit zone  */}

      <div
        class="modal fade"
        id="edit-estate"
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
                updateEstate();
              }}
            >
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Edit Estate
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
                        Estate Name <strong class="text-danger">*</strong>
                      </label>
                      <input
                        required
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        type="text"
                        class="form-control"
                        placeholder="Enter estate name"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <label for=""> Zone </label>
                    <select
                      class="form-control"
                      data-live-search="true"
                      title="Select county where the zone is"
                      onChange={(e) => setSelectedZone(e.target.value)}
                    >
                      {zones &&
                        zones.map((zon, index) => {
                          let zone = zon;

                          return (
                            <option
                              key={index}
                              value={zone.id}
                              selected={zone.id === newZone ? "selected" : ""}
                            >
                              {zone.name}
                            </option>
                          );
                        })}
                    </select>
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
                <h5>Deactivate this Estate ?</h5>
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
                onClick={() => deactivate1(activeId)}
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
                <h5>Activate this Estate ?</h5>
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
                onClick={() => deactivate1(activeId)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>

       {/* <!-- modals --> */}
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
                createZone();
              }}
            >
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  New Zone
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
                        Zone Name <strong class="text-danger">*</strong>
                      </label>
                      <input
                        required
                        value={zoneName}
                        onChange={(e) => setZoneName(e.target.value)}
                        type="text"
                        class="form-control"
                        placeholder="Enter zone name"
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <label for="">
                      County <strong class="text-danger">*</strong>
                    </label>
                    <select
                      class="form-control"
                      data-live-search="true"
                      title="Select county where the zone is"
                      onChange={(e) => setSelectedCounty(e.target.value)}
                    >
                      <option value=""> Select County</option>
                      {clientCounties &&
                        clientCounties.map((cou, index) => {
                          let county = cou.county;
                          return (
                            <option key={index} value={cou.id}>
                              {county.name}
                            </option>
                          );
                        })}
                    </select>
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
      {/* edit zone  */}
      <div
        class="modal fade"
        id="edit-zone"
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
                updateZone();
              }}
            >
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Edit Zone
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
                        Zone Name <strong class="text-danger">*</strong>
                      </label>
                      <input
                        required
                        value={editNames}
                        onChange={(e) => setEditNames(e.target.value)}
                        type="text"
                        class="form-control"
                        placeholder="Enter zone name"
                      />
                    </div>
                  </div>

                  <div class="col-12">
                    <label for="">
                      County <strong class="text-danger">*</strong>
                    </label>
                    <select
                      class="form-control"
                      data-live-search="true"
                      title="Select county where the zone is"
                      onChange={(e) => setNewCounty(e.target.value)}
                    >
                      {clientCounties &&
                        clientCounties.map((cou, index) => {
                          let county = cou.county;
                          return (
                            <option
                              key={index}
                              value={cou.id}
                              selected={cou.id === newCounty ? "selected" : ""}
                            >
                              {county.name}
                            </option>
                          );
                        })}
                    </select>
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
      {/* edit zone  */}
      <div
        class="modal fade"
        id="edit-zone"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Edit Zone
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
                    <label for="">Zone Name</label>
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      type="text"
                      class="form-control"
                      placeholder="Enter zone name"
                    />
                  </div>
                </div>

                <div class="col-12">
                  <label for="">County</label>
                  <select
                    class="form-control"
                    data-live-search="true"
                    title="Select county where the zone is"
                    onChange={(e) => setNewCounty(e.target.value)}
                  >
                    <option> County</option>
                    {clientCounties &&
                      clientCounties.map((cou, index) => {
                        let county = cou.county;
                        return (

                          <option
                            key={index}
                            value={cou.id}
                            selected={cou.id === newCounty ? "selected" : ""}
                          >
                            {county.name}
                          </option>
                        );
                      })}
                  </select>
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
                onClick={updateZone}
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Save
              </button>
            </div>
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
                <h5>Deactivate this Zone ?</h5>
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
                onClick={() => deactivte(activeId)}
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
                <h5>Activate this Zone ?</h5>
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
                onClick={() => deactivte(activeId)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
   {/* <!-- modals --> */}
   <div
        class="modal fade"
        id="add-new-country"
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
                createCounty();
              }}
            >
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  New County
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
                    <label for="">County</label>
                    <select
                      class="form-control"
                      data-live-search="true"
                      title="Select county where the zone is"
                      onChange={(e) => setSelectedCounty(e.target.value)}
                    >
                      <option>Select County</option>
                      {allCounties &&
                        allCounties.map((county) => {
                          return (
                            <option key={county.id} value={county.id}>
                              {county.name}
                            </option>
                          );
                        })}
                    </select>
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
        id="confirm-deactivate1"
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
                <h5>Deactivate this county?</h5>
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
                onClick={() => deactivates(activeId)}
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
        id="confirm-activate1"
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
                <h5>Activate this county?</h5>
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
                onClick={() => deactivates(activeId)}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>



        {/* <!-- Roles permission Modal --> */}
      {/* <!-- modals --> */}
      <div
        class="modal fade"
        id="role-permissions"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Role Permissions
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {rolePriveledges.length !== 0 && (
              <div class="modal-body">
                <h6 class="text-info font-14px mb-2">
                  {oneRole.name !== undefined && oneRole.name}
                </h6>
                <div class="plan-features">
                  <div className="row">
                    {rolePriveledges &&
                      rolePriveledges.map((prive) => (
                        <div className="col-4">
                          <p key={prive}>
                            <i class="bx bx-check text-primary"></i>{" "}
                            {prive.toLowerCase().replace(/_/g, "  ")}{" "}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
            <div class="modal-footer">
              <button
                onClick={() => setRolePriveledges([])}
                type="button"
                class="btn btn-light"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- adding roles modal --> */}
      <div
        class="modal fade"
        id="add-new-role"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div class="modal-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                AddARole();
              }}
            >
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  New Role
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
                        Role Name <strong class="text-danger">*</strong>
                      </label>
                      <input
                        type="text"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        class="form-control"
                        placeholder="Enter the role Name"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-12 text-capitalize">
                    <div class="form-group mb-0">
                      <h6 class="font-16px text-info">
                        Select permissions Specific to the role{" "}
                        <strong class="text-danger">*</strong>
                      </h6>
                    </div>
                  </div>
                  <div class="col-12 text-capitalize">
                    <div class="row">
                      {privileges &&
                        privileges.map((priv, index) => (
                          <div class="col-4" key={priv.id}>
                            <div class="form-check mb-3">
                              <input
                                class="form-check-input"
                                onChange={(event) =>
                                  handleRoleChange(index, event)
                                }
                                type="checkbox"
                                id="formCheck1"
                              />
                              <label class="form-check-label" for="formCheck1">
                                {priv.name.toLowerCase().replace(/_/g, " ")}
                              </label>
                            </div>
                          </div>
                        ))}
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
                  data-bs-dismiss="modavxbxcvd"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* <!-- editing roles modal --> */}

      <div
        class="modal fade"
        id="edit-role"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div class="modal-content">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editARole();
              }}
            >
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  Edit Role
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
                        Role Name <strong class="text-danger">*</strong>
                      </label>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        class="form-control"
                        placeholder="Enter the role Name"
                        required
                      />
                    </div>
                  </div>
                  <div class="col-12 text-capitalize">
                    <div class="form-group mb-0">
                      <h6 class="font-16px text-info">
                        Edit permissions Specific to the role{" "}
                        <strong class="text-danger">*</strong>
                      </h6>
                    </div>
                  </div>
                  <div class="col-12 text-capitalize">
                    <div class="row">
                      {privileges &&
                        privileges.map((priv, index) => (
                          <div className="col-4">
                            <div className="checkbox" key={priv.id}>
                              <input
                                checked={editPriveledges.includes(priv.name)}
                                type="checkbox"
                                id={index}
                                onChange={(event) =>
                                  handleEditRole(index, event)
                                }
                              />
                              <label
                                className="checkbox__label"
                                htmlFor={index}
                              >
                                {priv.name.toLowerCase().replace(/_/g, " ")}
                              </label>
                            </div>
                          </div>
                        ))}
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

  {/* create modal */}
  <div
        class="modal fade"
        id="add-new-settings"
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
                createGeneral();
              }}
            >
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">
                  General Settings
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
                    <label for="">
                    BouncedChequeChargeId <strong class="text-danger">*</strong>
                    </label>
                    <select
                      class="form-control text-capitalize"
                                           title="Select Applicable Charge Type"
                      onChange={(e) => {
                        setBouncedChequeChargeId(e.target.value);
                      }}
                    >
                      <option>-------Select BouncedChequeChargeId -------</option>
                      {invo?.map((item) => (
                        <option value={item.id} key={item.id}>
                        {item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div class="col-12">
                    <div class="form-group mb-4">
                      <label for="">
                      ChequeProcessingPeriod{" "}
                        <strong class="text-danger">*</strong>{" "}
                      </label>
                      <input
                        required
                        min="1"
                        max="30"
                        value={chequeProcessingPeriod}
                        onChange={(e) => setChequeProcessingPeriod(e.target.value)}
                        type="number"
                        class="form-control"
                        placeholder="Enter  ChequeProcessingPeriod"
                      />
                    </div>
                  </div>

                  <div className="col-12">
                           
                              <label htmlFor=""> Invoice Payment Priority</label>
                              <br />
                              <select
                                name=""
                                onChange={(e) => handleACchange(e)}
                                id=""
                                className={"form-control"}
                              >
                                <option>Select Applicable Charges</option>
                                {invo?.map((item) => (
                                  <option value={item.id + "-" + item.name}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                            
                          </div>
                          <div className="row">
                            <div className="mb-4">
                              <label htmlFor="basicpill-lastname-input ">
                               Applicable Charges
                              </label>
                              <div className="alert alert-info bg-soft">
                                {chargeNames.length > 0
                                  ? chargeNames.join("  -->  ")
                                  : chargeNames}
                              </div>
                            </div>
                            </div>
                  <div class="col-12">
                    <label for="">
                    Base(rent)Charge<strong class="text-danger">*</strong>
                    </label>
                    <select
                      class="form-control text-capitalize"
                                           title="Select Applicable Charge Type"
                      onChange={(e) => {
                        setLandlordSettlementChargeId(e.target.value);
                      }}
                    >
                      <option>---Select  Base(rent)Charge-----</option>
                      {invo?.map((item) => (
                        <option value={item.id} key={item.id}>
                        {item.name}</option>
                      ))}
                    </select>
                  </div>
                
              
                  <div class="col-12">
                    <label for="">
                   PenaltyCharge <strong class="text-danger">*</strong>
                    </label>
                    <select
                      class="form-control text-capitalize"
                                           title="Select Applicable Charge Type"
                      onChange={(e) => {
                        setPenaltyChargeId(e.target.value)
                        (e.target.value);
                      }}
                    >
                      <option>---Select  PenaltyChargeId-----</option>
                      {invo?.map((item) => (
                        <option value={item.id} key={item.id}>
                        {item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div class="col-12">
                    <div class="form-group mb-4">
                      <label for="">PenaltyChargeRate</label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        class="form-control"
                        placeholder="Enter PenaltyChargeRate"
                        onChange={(event) =>
                          setpenaltyChargeRate(event.target.value)
                        }
                        value={penaltyChargeRate}
                      />
                    </div>
                  </div>
                 
                
                  <div class="col-12">
                    <label for="">
                    PropertyTaxCharge<strong class="text-danger">*</strong>
                    </label>
                    <select
                      class="form-control text-capitalize"
                                           title="Select Applicable Charge Type"
                      onChange={(e) => {
                        setPropertyTaxChargeId(e.target.value)
                        (e.target.value);
                      }}
                    >
                      <option value="">Select PropertyTaxCharge --</option>
                      {invo?.map((item) => (
                        <option value={item.id} key={item.id}>
                        {item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div class="col-12">
                    <div class="form-group mb-4">
                      <label for="">PropertyTaxRate</label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        class="form-control"
                        placeholder="Enter PropertyTaxRate"
                        onChange={(event) =>
                          setPropertyTaxRate(event.target.value)
                        }
                        value={propertyTaxRate}
                      />
                    </div>
                  </div>
                  <div class="col-12">
                    <label for="">
                    VisitationCharge<strong class="text-danger">*</strong>
                    </label>
                    <select
                      class="form-control text-capitalize"
                                           title="Select VisitationChargeId"
                      onChange={(e) => {
                        setvisitationChargeId(e.target.value)
                        (e.target.value);
                      }}
                    >
                      <option>Select VisitationCharge ----</option>
                      {invo
                      ?.map((item) => (
                        <option value={item.id} key={item.id}>
                        {item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div class="col-12">
                    <div class="form-group mb-4">
                      <label for="">VisitationChargeDay</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter SettlementPeriod"
                        onChange={(event) =>
                          setvisitationChargeDay(event.target.value)
                        }
                        value={visitationChargeDay}
                      />
                    </div>
                  </div>
                
                  <div class="col-12">
                    <div class="form-group mb-4">
                      <label for="">SettlementPeriod</label>
                      
 <select
                              className="form-control"
                              onChange={(e) => {
                                setsettlementPeriod(e.target.value)
                                (e.target.value);
                              }}
                              name="settlementPeriod"
                            >
                              <option value="YEAR"> Select settlementPeriod </option>
                              <option value="MONTH">Monthly</option>
                              <option value="YEAR">Yearly</option>
                            </select>


                    </div>
                  </div>
                  <div class="col-12">
                    <div class="form-group mb-4">
                      <label for="">SenderId</label>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Enter SenderId"
                        onChange={(event) =>
                          setSenderId(event.target.value)
                        }
                        value={senderId}
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
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>






      {/*deactivate activate modals*/}
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
                <h5>Deactivate this Issue Type ?</h5>
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
                <h5>Activate this Issue Type?</h5>
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
      </div>
    </>
  );
}

export default IssuesTypes;
