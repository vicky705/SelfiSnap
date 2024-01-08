import React from 'react'

function Imagecard(props) {
  const url = "http://localhost:4000/images"
  // const url = "https://44bxzm91-4000.inc1.devtunnels.ms/images"
  return (
    <div>
      <div className="photo-card mt-2">
        <img src={`${url}/${props.photo.pathname}`}/>
      </div>
    </div>
  )
}
export default Imagecard
