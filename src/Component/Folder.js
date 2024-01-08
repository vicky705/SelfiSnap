import React, { useContext, useState, useEffect } from 'react'
import dataContext from '../Context/dataContext'
import Foldercard from './Foldercard'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify'

function Folder() {
    const {folder, addFolder, fetchAllFolder} = useContext(dataContext)
    useEffect(() => {
        fetchAllFolder()
      }, []);
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    let folderName = "";
    const getData = (e) => {
        folderName = e.target.value;
    }
    const createFolder = () => {
        if(folderName){
            addFolder(folderName)
            handleClose()
        }
        else{
            toast("Please geve me the name of folder.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                })
        }
    }
  return (
    <main className='main-container'>
        <ToastContainer/>
        <div className="d-flex">
        <h2>Folder</h2><div className='addFolderBtn'><p onClick={handleClickOpen}><i className="fa-regular fa-add"></i>Add Folder</p></div>
        </div>
        <div className="row">
            {folder.map((data) => {
                return  <div className="col-lg-2 col-md-3 col-sm-3 col-3">
                    <Foldercard name={data}/>
                </div>
            })}
        </div>
        {/* Dialog */}
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Folder</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter Folder name for crating new Folder.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin='dense'
                        id='name'
                        label='Enter Folder Name'
                        type='text'
                        fullWidth
                        variant='standard'
                        onChange={getData}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancle</Button>
                    <Button onClick={createFolder}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    </main>
  )
}

export default Folder
