import React, { useContext } from 'react'
import {BsGrid1X2Fill} from 'react-icons/bs'
import { Link, useLocation } from 'react-router-dom'
import dataContext from '../Context/dataContext'

function Sidebar({openSidebarToggle, OpenSidebar}) {
    const { logout } = useContext(dataContext)
    let location = useLocation()

    const handlerLogout = () => {
        logout()
    }

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
            <i className="fa-solid fa-atom"></i> SelfiSnap
            </div>
            <i className="fa-solid fa-xmark" onClick={OpenSidebar}></i>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to='/' className={`${location.pathname === "/" ? "active" : ""}`}>
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to='/dashboard/folder' className={`${location.pathname === "/dashboard/folder" || location.pathname === "/dashboard/folder/open" ? "active" : ""}`}>
                    <i className="fa-solid fa-folder"></i> Folder
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <a href="" className='text-warning' onClick={handlerLogout} >
                <i className="fa-solid fa-right-from-bracket"></i> Logout
                </a>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar
