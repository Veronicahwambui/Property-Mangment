import React, { useState, useEffect } from "react";
import requestsServiceService from "../../services/requestsService.service";

function UseTypes() {
  const [userType, setUserType] = useState([]);
  const [addUserType, setAddUserType] = useState([]);
  // const[ name ,setName]=useState("")

  const userTypeData = () => {
    const data = JSON.stringify({
      clientId: 2,
      id: null,
      name: "string",
    });

    requestsServiceService.userTypeData().then((res) => {
      setUserType(res.data);
    });
  };

  const getUserType = () => {
    requestsServiceService.getUserType().then((res) => {
      setAddUserType(res.data.data);
    });
  };

  useEffect(() => {
    userTypeData();
  }, []);

  return (
    <div class="">
      <div class="page-content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">UseTypes</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="index.html">Dashboards</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="#">System Users</a>
                    </li>
                    <li class="breadcrumb-item active">UserType</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
            <div
              class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
              role="toolbar"
            >
              <div class="d-flex align-items-center flex-grow-1">
                <h4 class="mb-0  bg-transparent  p-0 m-0">UseTypes</h4>
              </div>
            </div>

            <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
              <div
                class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                role="toolbar"
              >
                <div class="d-flex align-items-center flex-grow-1">
                  <h4 class="mb-0  bg-transparent  p-0 m-0">
                   
                  </h4>
                </div>
                <div class="d-flex">
                  <button
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
          </div>
          <div class="card-body" onSubmit={userTypeData}>
            <div class="table-responsive table-responsive-md">
              <table class="table table-editable align-middle table-edits">
                <thead class="table-light">
                  <tr class="text-uppercase table-dark">
                    <th>#</th>
                    <th>Name</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {(userType !== null) | undefined &&
                    userType.map((list, index) => {
                      return (
                        <tr data-id="1">
                          <td data-field="estate">{++index}</td>
                          <td data-field="estate">{list.name}</td>

                          <td class="text-right cell-change ">
                            <a
                              class="btn btn-light btn-rounded waves-effect btn-circle btn-transparent edit "
                              title="Edit "
                            >
                              <i class="bx bx-edit-alt "></i>
                            </a>

                            <button
                              class="btn btn-primary btn-sm text-uppercase px-3 save-tbl-btn mx-3 d-none "
                              title="save "
                            >
                              Save
                            </button>
                            <a
                              class="btn btn-light btn-circle waves-effect font-18px btn-transparent cancel-changes d-none "
                              title="Cancel "
                            >
                              <i class="bx bx-x "></i>
                            </a>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="7" class="bg-light add-field ">
                      <span class="d-flex align-items-center ">
                        <i class="dripicons-plus mr-5 d-flex justify-content-center align-items-center font-21 "></i>
                        <span class="pl-5 text-capitalize">Add userTypes</span>
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UseTypes;
