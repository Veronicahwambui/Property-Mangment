import React, { useEffect, useState } from 'react'
import requestsServiceService from '../../services/requestsService.service'

function ApplicableCharges() {

  const [list , setList]=useState([])
  const [activeId, setActiveId] = useState('')
  const [createName, setCreateName]= useState('')
  const [updateName, setUpdateName]= useState('')

  useEffect(()=>{

    fetchAll()
  },[])

  // fetch list function 
  const fetchAll = ()=>{
    requestsServiceService.allApplicableCharges().then((res)=>{
       console.log(res.data);
      //  setList(res.data)
    })
  }

  // create function 
  const create = ()=>{
   let data = JSON.stringify({
    active: true,
    clientId: 1,
    id: 0,
    name: createName
  })
   
   requestsServiceService.createApplicableCharges(data).then((res)=>{
     console.log(res.data)
     fetchAll()
   })
  }
  
  // toggle function 
  const toggleStatus = ()=>{
    
    requestsServiceService.toogleApplicableCharge(activeId).then((res)=>{
      console.log(res.data);
      fetchAll()
    })
  }
 
  // update function 
  const Update = ()=>{
     let data = JSON.stringify({
      active: true,
      clientId: 1,
      id: 0,
      name: updateName
    })
    requestsServiceService.updateApplicableCharges(data).then((res)=>{
     fetchAll()
    })
  }
  

  return (
    <div className="page-content">ApplicableCharges</div>
  )
}

export default ApplicableCharges