import React, { useContext, useEffect, useState } from 'react'
import dataContext from '../Context/dataContext'

function Home() {
    const url = "http://localhost:4000/api/dashboard"
    // const url = "https://44bxzm91-4000.inc1.devtunnels.ms/api/dashboard"
    const {phId} = useContext(dataContext)
    const [data, setData] = useState({})
    useEffect(() => {
        getData()
    }, [])
    const getData = async() => {
        const response = await fetch(`${url}/getForDashboard`, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({photographerId : phId})
        })
        const json = await response.json()
        setData(json)
    }

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards details'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Folder</h3>
                    <i className="fa-solid fa-folder"></i>
                </div>
                <h1>{data.fol}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Photos</h3>
                    <i className="fa-regular fa-image"></i>
                </div>
                <h1>{data.pho}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Downloads</h3>
                    <i className="fa-solid fa-download"></i>
                </div>
                <h1>3300</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Storage</h3>
                    <i className="fa-solid fa-sd-card"></i>
                </div>
                <h1>42GB</h1>
            </div>
        </div>

        
    </main>
  )
}

export default Home
