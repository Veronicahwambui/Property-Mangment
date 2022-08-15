import React from 'react'
import AuthService from '../services/auth.service'

function Profile() {
clientId= AuthService.getClientId()

  return (
    <div>Profile</div>
  )
}

export default Profile