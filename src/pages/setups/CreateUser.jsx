import React, { useEffect, useState } from 'react'
import requestsServiceService from '../../services/requestsService.service'

function CreateUser() {
  const [allRoles , setAllRoles] = useState([])
  const [privileges , setPrivileges] = useState([])
  const [privilege , setPrivilege] = useState('')
  const [roleName , setRoleName] = useState('')
  const [roleID , setRoleID] = useState(3)
 

  useEffect(()=>{


  // getAllRoles()
  getAllPreviledges()
  // createPreviledge()
  },[])

  // create priveledge 
  const createPreviledge = ()=>{

    const data = JSON.stringify([
       privilege
    ])

    requestsServiceService.createPreviledge(data).then((res)=>{
      console.log(res);
   }).catch((err)=>{
     console.log(err);
   })
  }

// get all priveledges 
const getAllPreviledges = ()=>{

  requestsServiceService.getAllPreviledges().then((res)=>{
    // console.log(res.data.data);
    setPrivileges(res.data.data)
 }).catch((err)=>{
   console.log(err);
 })
}


  // add a new role

  const AddARole = ()=>{
    const data = JSON.stringify({
        "id": null,
        "name": roleName,
        "permissions": priveledgeNames
    })

    requestsServiceService.AddRole(data).then((res)=>{
      console.log(res.data);
   }).catch((err)=>{
     console.log(err);
   })
  }

  // get all roles 
  const getAllRoles = ()=>{   
    requestsServiceService.getAllRoles().then((res)=>{
      console.log(res.data.data);
      setAllRoles(res.data.data)
   }).catch((err)=>{
     console.log(err);
   })
  }

  // fetch one role 
  const getOneRole = ()=>{
    requestsServiceService.getOneRole(roleID).then((res)=>{
      console.log(res.data);
   }).catch((err)=>{
     console.log(err);
   })
  }


//  edit a role 
  const editARole = ()=>{
    requestsServiceService.EditRole().then((res)=>{
      console.log(res.data);
   }).catch((err)=>{
     console.log(err);
   })
  }



  // view a role 
  const viewARole = ()=>{
    requestsServiceService.ViewOneRole(roleID).then((res)=>{
      console.log(res.data);
   }).catch((err)=>{
     console.log(err);
   })
  }

  
  
  const [priveledgeNames , setPrivilegeNames] = useState([])
  const handleRoleChange = (index, event) => {
    const { checked, value } = event.target;

    if (checked) {
     setPrivilegeNames([...priveledgeNames, privileges[index].name]);
    } else {
      setPrivilegeNames(
        priveledgeNames.filter((priveledgeName) => priveledgeName !== privileges[index].name)
      );
    }
  };


  return (
    <div className='page-content'>
    <div>
      <h2>create privilege</h2>
      <div>
        <input type="text" value={privilege} onChange={(e)=> setPrivilege(e.target.value.toUpperCase())}/>
        <input type="submit" value="create priveledges" onClick={createPreviledge} />
      </div>
    </div>

    <div>
      <h2>show all privileges</h2>
      <div>
       <button onClick={getAllPreviledges}> get all priveledges</button>
      {privileges.map((pri)=> (
         <h1>{pri.name}</h1>
      ))}

      </div>
    </div>

    <div>
      <h2>add new role </h2>
      <div>
        <label htmlFor=""> enter role name </label>
        <input type="text" value={roleName} onChange={(e)=> setRoleName(e.target.value)}/>
        {privileges.map((priv, index) => (
                          <div className="checkbox" key={priv.id}>
                            <input
                              type="checkbox"
                              id={index}
                              onChange={(event) =>
                                handleRoleChange(index, event)
                              }
                            />
                            <label className="checkbox__label" htmlFor={index}>
                              {priv.name}
                            </label>
                          </div>
         ))}



        <input type="submit" value="create role" onClick={AddARole} />
      </div>
    </div>

    <div>
      <h2>show all roles</h2>
      <div>
       <button onClick={getAllRoles}> get all roles</button>
      {allRoles.map((role)=> (
         <h1>{role.name}</h1>
      ))}

      </div>
    </div>


    <div>
      <h2>search Role</h2>
      <div>
        <input type="text" value={roleID} onChange={(e)=> setRoleID(e.target.value)}/>
        <input type="submit" value="view a role" onClick={viewARole} />
      </div>
    </div>
      
    </div>
  )
}

export default CreateUser