import React, { useEffect , useState } from 'react'
import {useParams} from 'react-router-dom'
import requestsServiceService from '../../services/requestsService.service';

function OneRole() {
  const [role , setRole] = useState([]) 
  const [privileges , setPrivileges] = useState([])

  const  [rolePriveledges ,setRolePriveledges]  = useState([])

  let { id } = useParams();
  let userId = id;

 useEffect(()=>{
    getAllPreviledges()
      getOneRole()
 },[])
  
 // get all priveledges 
const getAllPreviledges = ()=>{

    requestsServiceService.getAllPreviledges().then((res)=>{
      // console.log(res.data.data);
      setPrivileges(res.data.data)
   }).catch((err)=>{
     console.log(err);
   })
  }
  
    // fetch one role 
    const getOneRole = ()=>{
        requestsServiceService.getOneRole(userId).then((res)=>{
        //   console.log(res.data.data);
          setRole(res.data.data)
          setRolePriveledges(res.data.data.permissions)
       }).catch((err)=>{
         console.log(err);
       })
      }

  return (
    <div className='page-content'>

     <h3>{role.name}</h3>

     {privileges.map((priv, index) => (
                          <div className="checkbox" key={priv.id}>
                            <input
                            checked={rolePriveledges.includes(priv.name)}
                              type="checkbox"
                              id={index}
                            />
                            <label className="checkbox__label" htmlFor={index}>
                              {priv.name}
                            </label>
                          </div>
         ))}

    </div>
  )
}

export default OneRole