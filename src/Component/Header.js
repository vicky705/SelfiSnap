import React from 'react'

function Header({OpenSidebar}) {
  return (
    <header className='header'>
        <div className='menu-icon'>
            {/* <BsJustify className='icon' onClick={OpenSidebar}/> */}
            <i className="fa-solid fa-bars-staggered" onClick={OpenSidebar}></i>
        </div>
        <div className='header-left'>
            {/* <input type='text' placeholder='Search here....'/> */}
            {/* <i className="fa-solid fa-magnifying-glass"></i> */}
        </div>
        
    </header>
  )
}

export default Header
