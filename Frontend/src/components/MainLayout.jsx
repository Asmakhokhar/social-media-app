import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftSideBar from './leftSideBar' 

const MainLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <LeftSideBar />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
