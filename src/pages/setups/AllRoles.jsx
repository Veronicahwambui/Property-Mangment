import React, { useEffect , useState } from 'react'
import requestsServiceService from '../../services/requestsService.service'
import {Link} from 'react-router-dom'
function AllRoles() {
    const [allRoles , setAllRoles] = useState([])

   useEffect(()=>{
       getAllRoles()
    },[])
    
           const getAllRoles = ()=>{   
               requestsServiceService.getAllRoles().then((res)=>{
                 console.log(res.data.data);
                 setAllRoles(res.data.data)
              }).catch((err)=>{
                console.log(err);
              })
             }

  return (
    <div className='page-content'>
           <div class="card-body">
                                    <table class="table align-middle table-nowrap table-hover dt-responsive contacts-table" id="datatable-buttons">
                                        <thead class="table-light">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Role Id</th>
                                                <th scope="col">Role Name </th>
                                                <th scope="col">Ip Address</th>
                                                <th scope="col">Date created</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        { (allRoles !== null) &&
                                           
                                           allRoles.map((role,index)=>{return(
                                            
                                            <tr key={index}>
                                                <td class="text-capitalize">{index + 1}</td>
                                                <td class="text-capitalize">
                                                    <Link to={"/allroles/" + role.id} title="View Details">{role.id}</Link>
                                                </td>
                                                <td>
                                                    {role.name}
                                                </td>
                                                <td class="text-capitalize">
                                                    {role.ipAddress}
                                                </td>

                                                <td>
                                                    {role.dateTimeCreated}
                                                </td>
                                               

                                                <td>
                                                    <div class="dropdown">
                                                        <a class="text-muted font-size-16" role="button" data-bs-toggle="dropdown" aria-haspopup="true">
                                                            <i class="bx bx-dots-vertical-rounded"></i>
                                                        </a>

                                                        <div class="dropdown-menu dropdown-menu-end text-capitalize">
                                                            
                                                            <Link class="dropdown-item" to={"/allroles/" + role.id}><i class="font-size-15 mdi mdi-eye-plus-outline me-3"></i>View This Role</Link>
                                                            {/* <a class="dropdown-item" href="tenant-compliant-by-pemises.html"><i class="font-size-15 mdi mdi-account-multiple-check me-3"></i>Compliant Tenants</a> */}
                                                            {/* <a class="dropdown-item" href="tenant-uncompliant-by-pemises.html"><i class="font-size-15 mdi mdi-account-multiple-remove me-3"></i>Uncompliant tenants</a> */}
                                                            {/* <a class="dropdown-item" href="tenant-distress-by-pemises.html"><i class="font-size-15 mdi mdi-account-cancel me-3 text-danger"></i>Tenants under distress</a> */}
                                                            {/* <a class="dropdown-item write-msg-btn" href="#"><i class="font-size-15 mdi mdi-chat-processing-outline me-3 text-info"></i>Message all tenants</a> */}


                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            
                                           )})


}


                                        </tbody>
                                    </table>
                                </div>
    </div>
  )
}

export default AllRoles