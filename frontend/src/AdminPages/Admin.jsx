import React from 'react'
import { Outlet } from 'react-router-dom'
const Admin = () => {
  return (
    <div>
        heyyyyyy duuuude this is Admin
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default Admin