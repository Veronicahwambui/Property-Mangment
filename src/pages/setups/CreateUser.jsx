import React, { useEffect } from 'react'
import requestsServiceService from '../../services/requestsService.service'

function CreateUser() {
  
  useEffect(()=>{

    requestsServiceService.getAllRoles().then((res)=>{
       console.log(res.data);
    }).catch((err)=>{
      console.log(err);
    })
   
  })

  const AddARole = ()=>{
    requestsServiceService.AddRole().then((res)=>{
      console.log(res.data);
   }).catch((err)=>{
     console.log(err);
   })
  }

  const editARole = ()=>{
    requestsServiceService.EditRole().then((res)=>{
      console.log(res.data);
   }).catch((err)=>{
     console.log(err);
   })
  }


  const getOneRole = ()=>{
    requestsServiceService.getOneRole().then((res)=>{
      console.log(res.data);
   }).catch((err)=>{
     console.log(err);
   })
  }

  const viewARole = ()=>{
    requestsServiceService.ViewOneRole().then((res)=>{
      console.log(res.data);
   }).catch((err)=>{
     console.log(err);
   })
  }


  return (
    <div>CreateUser</div>
  )
}

export default CreateUser