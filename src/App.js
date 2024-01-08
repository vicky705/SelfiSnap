import React, {useContext, useState} from 'react';
import './App.css';
import Header from './Component/Header';
import Sidebar from './Component/Sidebar';
import Home from './Component/Home'
import Folder from './Component/Folder';
import { Route, Routes } from 'react-router-dom';
import Image from './Component/Image';
import Login from './Component/Signup/Login';
import Signup from './Component/Signup/Signup';
import dataContext from './Context/dataContext';
import Mainhome from './Component/Mainhome';
import Homenav from './Component/Homenav'

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  const {phId, updatePhotographerId} = useContext(dataContext)
  updatePhotographerId()
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div>
      
      {!phId ? 
      <Routes>
        <Route path='/' element={<Homenav/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
      :    
        <div className='grid-container'>
          <Header OpenSidebar={OpenSidebar}/>
          <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/dashboard/folder' element={<Folder/>}/>
            <Route path='/dashboard/folder/open' element={<Image/>}/>
          </Routes>
        </div>}
    </div>
  );
}

export default App;
