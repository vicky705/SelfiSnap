import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import dataContext from '../Context/dataContext'

function Foldercard(props) {
  const {loadPhoto} = useContext(dataContext)
 
  const handkeUserIdChange = async(value) =>{
    loadPhoto(value)
  }
  return (
    <div>
        <Link to='/dashboard/folder/open' onClick={() => handkeUserIdChange(props.name._id)}>
          <div className='folder-card'>
              <i className='fa-solid fa-folder'></i>
              <p>{props.name.folderName}</p>
          </div>
        </Link>
    </div>
  )
}

export default Foldercard
