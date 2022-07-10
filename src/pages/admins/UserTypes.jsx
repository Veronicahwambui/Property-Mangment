import requestsServiceService from "../../services/requestsService.service";
import { useEffect, useId, useState } from "react";

function UserTypes() {
  const [userType, setUserType] = useState([]);
  const[userTypeName, setuserTypeName]=useState("")
  const[editName, setEditName]=useState("")
  const[id, setId]=useState("")

 
  
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

  // const getUserType = () => {
  //   requestsServiceService.getUserType().then((res) => {
  //     setAddUserType(res.data.data);
  //   });
  // };
  const addUserType =()=>{
    requestsServiceService.createUserType().then((res) => {
        // setuserTypeName(res.data.data);

        console.log(res.data)

      });
    
}

const updateUser=()=>{
  let data=JSON.stringify({
    id: id,
    name: editName
  })

  requestsServiceService.updateUserType(data).then((res)=>{
    console.log(res)
   
  }
  ) 

}




const deactivateUser =(userId)=>{
    requestsServiceService.deactiveUser(userId).then((res) => {
      console.log(res);
    
        
      });
    
}








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
                <h4 class="mb-sm-0 font-size-18">Use Types</h4>

                <div class="page-title-right">
                  <ol class="breadcrumb m-0">
                    <li class="breadcrumb-item">
                      <a href="index.html">Dashboards</a>
                    </li>
                    <li class="breadcrumb-item">
                      <a href="#">System user</a>
                    </li>
                    <li class="breadcrumb-item active">User Types</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-12">
              <div class="card">
                <div class="card-header bg-white pt-0 pr-0 p-0 d-flex justify-content-between align-items-center w-100 border-bottom">
                  <div
                    class="btn-toolbar p-3 d-flex justify-content-between align-items-center w-100"
                    role="toolbar"
                  >
                     <div class="d-flex align-items-center flex-grow-1">
                                           
                      </div>
                    
                    <div class="d-flex">
                      <button
                        type="button"
                        class="btn btn-primary waves-effect btn-label waves-light me-3"
                        data-bs-toggle="modal"
                        data-bs-target="#add-new-zone"
                      >
                        <i class="mdi mdi-plus label-icon"></i> Add A UserType
                      </button>
                    </div>
                  </div>
                </div>
                <div class="card-body" onSubmit={userTypeData}>
                  <div class="table-responsive table-responsive-md">
                    <table class="table table-editable align-middle table-edits">
                      <thead class="table-light">
                        <tr class="text-uppercase table-dark">
                          <th>#</th>
                          <th>UserTypeName</th>
                          <th>Edit</th>

                          <th class="text-right"></th>
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
                                     
                                      <a   data-bs-toggle="modal" data-bs-target="#Edit-modal"  
                                      
                                      
                                      class="dropdown-item" href="#" onClick={()=>{setEditName(list.name); setId(list.id)}}>


                                        <i class="font-size-15 mdi mdi-pencil me-3"></i>
                                        Edit
                                      </a>
                                      <a
                                        class="dropdown-item text-danger"
                                        href="# " onClick={()=>deactivateUser(list.id)}>
                                        <i class="font-size-15 mdi mdi-close-circle me-3" ></i>

                                        Deactivate
                                      </a>
                                    </div>
                                  </div>
                                </td>

                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
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
        tabindex="-1"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                User Type
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
                    <label for="">UserType Name</label>
                    <input

                      type="text"
                      class="form-control"
                      placeholder="Enter UserTypeName"
                      onChange={(event) =>setuserTypeName(event.target.value)}
                      value={userTypeName}
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
              <button type="button" class="btn btn-primary" onClick={addUserType }>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- modals end --> */}


      <div
        class="modal fade"
        id="Edit-modal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        role="dialog"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Edit UserType
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
                    <label for="">UserTypeName</label>
                    <input

                      type="text"
                      class="form-control"
                      placeholder="Enter zone name"
                      onChange={(event) => setEditName(event.target.value)}
                      value={editName}
                    
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
              <button type="button" class="btn btn-primary"  onClick={updateUser} >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer class="footer">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6">
              <script>document.write(new Date().getFullYear())</script> ©
              RevenueSure.
            </div>
            <div class="col-sm-6">
              <div class="text-sm-end d-sm-block">
                Developed by Nouveta LTD.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default UserTypes;
