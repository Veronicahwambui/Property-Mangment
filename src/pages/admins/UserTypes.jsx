import requestsServiceService from "../../services/requestsService.service";
import { useEffect, useId, useState } from "react";
import authService from "../../services/auth.service";

function UserTypes() {
  const [userType, setUserType] = useState([]);
  const[userTypeName, setUserTypeName]=useState("")
  const[editName, setEditName]=useState("")
  const[id, setId]=useState("")
  const [error, setError] = useState({
    message: "",
    color: ""
  });

 
  
  const userTypesData = () => {
    const data = JSON.stringify({
      clientId: parseInt(authService.getClientId()),
      id: null,
      name: "string",
    });

    requestsServiceService.userTypeData(data).then((res) => {
      setUserType(res.data);
    });
  };

 
  const addUserType =()=>{

    let data=JSON.stringify({
    clientId:  parseInt(authService.getClientId()),
  id: null,
  name:userTypeName,

    })
    requestsServiceService.createUserType(data).then((res) => {
       console.log(res.data)
        userTypesData()


        if(res.data.status){
          setError({
            ...error,
            message: res.data.message,
            color: "success"
          }) } else {
    
            setError({
              ...error,
              message: res.data.message,
              color: "warning"
            }) 
          }
    
          setTimeout(() => {
            clear()
          }, 3000)
          
        }).catch((res)=>{
    
          setError({
            ...error,
            message: res.data.message,
            color: "danger"
          })
    
        })
      }
    
      const clear = ()=> {
        setError({
          ...error,
          message: "",
          color: ""
        });
      }
    

const updateUser=()=>{
  let data=JSON.stringify({
    id: id,
    clientId: parseInt(authService.getClientId()),
    name: editName
  })

  requestsServiceService.updateUserType(data).then((res)=>{
    console.log(res)
    userTypesData()
   
   
  }
  ) 

}


const deactivateUser =(userId)=>{
    requestsServiceService.deactiveUser(userId).then((res) => {
      console.log(res);
    
     
        
      });
    
}


  useEffect(() => {
 
    userTypesData();
  }, []);

  return (
    <div class="">
      <div class="page-content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 class="mb-sm-0 font-size-18">User Types</h4>

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



                <div div class="card-body" onSubmit={userTypesData}>
               
                {error.color !== "" &&
                  <div className={"alert alert-" + error.color} role="alert">
                    {error.message}
                    </div>
                }

                  <div class="table-responsive table-responsive-md">
                    <table class="table table-editable align-middle table-edits">
                      <thead class="table-light">
                        <tr class="text-uppercase table-dark">
                          <th>#</th>
                          <th>UserTypeName</th>
                          <th className="text-right">Edit</th>

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
                    <label for="">UserType</label>
                    <input
                     
                      type="text"
                      class="form-control"
                      placeholder="Enter UserTypeName"
                      onChange={(event) =>setUserTypeName(event.target.value)}
                      value={userTypeName}
                      required
                     
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
              <button type="button" class="btn btn-primary" 
                data-bs-dismiss="modal" onClick={addUserType }>
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
                      placeholder="Enter name"
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
              <button type="button" class="btn btn-primary" 
                data-bs-dismiss="modal" onClick={updateUser} >
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
