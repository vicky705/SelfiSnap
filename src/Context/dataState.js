import React, { useEffect, useState } from "react"
import dataContext from "./dataContext"
import { useNavigate } from "react-router-dom"


const DataState = (props) =>{
    const navigate = useNavigate()
    const url = 'http://localhost:4000/api/user'
    // const url = "https://44bxzm91-4000.inc1.devtunnels.ms/api/user"

    const [userId, setUserId] = useState({
        id : ""
    })

    const [phId, setPhId] = useState("")
    const setPhographerId = (id) => {
        setPhId(id)
    }
    useEffect(() => {
        if(localStorage.getItem('PhotographerId')){
            updatePhotographerId()
        } 
    }, [])
    const updatePhotographerId = async() => {
        const response = await fetch(`${url}/tokenToUserId`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            
            body : JSON.stringify({token: localStorage.getItem('PhotographerId')})
        })
        const json = await response.json()
        if(json.status){
            setPhId(json.decode.id)
            // console.log(json.decode.id)
        }
    }
    const logout = () => {
        if(phId){
            localStorage.removeItem('PhotographerId')
            navigate('/login')
        }
    }
    const [folder, setFolder] = useState([])

    const addFolder = async(folderName) => {
        const response = await fetch(`${url}/createFolder`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({photographerId : phId, folderName: folderName})
        })
        const json = await response.json()
        setFolder(folder.concat(json))
    }
    
    const fetchAllFolder = async() => {
        const response = await fetch(`${url}/getAllFolder`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({photographerId : phId})
        })
        const json = await response.json()
        setFolder(json.folder)
    }

    const [photo, setPhoto] = useState([])
    
    
    const fetchAllPhoto = async(id) => {
        const response = await fetch(`${url}/getAllImage`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(id)
        })
        const json = await response.json()
        setPhoto(json.image)
    }
    const loadPhoto = (user) => {
        setUserId({
            id : user
        })
        setPhoto([])
        fetchAllPhoto({id: user})
    }
    const addNewPhoto = (ph) => {
        setPhoto(photo.concat(ph))
    }
    // console.log(phId)
    return (
        <dataContext.Provider value={{folder,setUserId, addFolder, photo, loadPhoto, userId, addNewPhoto, fetchAllFolder, phId, setPhographerId, logout, updatePhotographerId}}>
            {props.children}
        </dataContext.Provider>
    )
}
export default DataState