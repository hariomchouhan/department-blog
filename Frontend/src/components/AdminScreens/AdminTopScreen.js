import React from 'react'
import '../../Css/Dashboard.css';

const AdminTopScreen = () => {
  return (
    <div style={{width: '100%'}}>
      <div style={{display: 'flex', justifyContent: "space-between", fontWeight: 600, fontSize: '1.09rem'}}>
        <div>Username</div>
        <div>Email</div>
        <div>Password</div>
      </div>
    </div>
  )
}

export default AdminTopScreen
