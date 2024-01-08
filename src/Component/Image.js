import React, { useContext, useState } from 'react'
import dataContext from '../Context/dataContext'
import Imagecard from './Imagecard'
import { DialogContent, DialogTitle, Dialog, DialogActions, Button } from '@mui/material'
import axios from 'axios'
const url = 'http://localhost:4000/api/user'
// const url = "https://44bxzm91-4000.inc1.devtunnels.ms/api/user"


function Image() {
  const { userId, addNewPhoto, phId } = useContext(dataContext)
  const {photo} = useContext(dataContext)
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const [file, setFile] = useState()
  const fileOnChange = (event) => {
    setFile(event.target.files[0])
    
  }
  let formData
  const onUpload = async() => {
     formData = {
      folderId: phId,
      photographerId : userId,
      "image" : file
     }
    axios.post(`${url}/uploadFile`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      const data = response.data
      addNewPhoto(data.data);
    })
    .catch((error) => {
      console.log(error)
    })
    handleClose()
  }

  return (
    <main className='main-container'>
        <div className='d-flex'>
        <h2>Photos</h2><div className='addFolderBtn' onClick={handleClickOpen}><p><i className="fa-regular fa-add"></i> Add</p></div>
        </div>
        <div className="row">
            {photo.map((data) => {
                return  <div className="col-lg-2 col-md-3 col-sm-3 col-3">
                  <Imagecard photo={data} />
                </div>
            })}
        </div>

        {/* Dialog */}
        <div>
            <Dialog open={open}>
                <DialogTitle>Upload Photo</DialogTitle>

                <DialogContent>
                    {/* <DialogContentText>
                        Enter Folder name for crating new Folder.
                      </DialogContentText> */}
                    <input className='form-control' name='image' type='file' accept='image/jpeg, image/png, image/webp' onChange={fileOnChange}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancle</Button>
                    <Button onClick={onUpload}>upload</Button>
                </DialogActions>
            </Dialog>
        </div>
    </main>
  )
}

export default Image
