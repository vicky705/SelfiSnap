import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import dataContext from '../../Context/dataContext';

function Signup() {
  const url = "http://localhost:4000/api/user/"
  // const url = "https://44bxzm91-4000.inc1.devtunnels.ms/api/user"
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    subscription: ''
  })
  const [activeCard, setActiveCard] = useState(false)
  const [cardSelect, setCardSelect] = useState(-1)
  const [isValidPass, setIsValidPass] = useState(false)
  const {updatePhotographerId} = useContext(dataContext)

  const onChangeHandler = (e) => {
    setUserDetails({...userDetails, [e.target.name] : e.target.value})
  }

  const handleCardActive = (event) => {
    event.preventDefault();
    if(isValidPass){ 
      setActiveCard(!activeCard)
    }
  }

  const selectCardHanler = (id) => {
    setCardSelect(id)
    setUserDetails({...userDetails, subscription : id})
  }
  
  const validatePassword = (pass) => {
    if(userDetails.password === pass){
      setIsValidPass(true)
    }
    else{
      setIsValidPass(false)
    }
  }

  const handlerSignupBtn = async(event) => {
    event.preventDefault();
    if(cardSelect == -1){
      toastAMessage("Please select any one plane.")
    }
    else{
      const response = await fetch(`${url}/createPhotographer`, {
        method: "POST",
        headers : {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify(userDetails)
      })
      const json = await response.json()
      // console.log(json)
      if(json.status){
        localStorage.setItem('PhotographerId', json.authToken)
        updatePhotographerId()
        toastAMessage('Login Successfully.')
        navigate('/')
      }
      else{
        console.log(json.message)
        toastAMessage(json.message) 
      }
    }
  }
  const toastAMessage = (msg) => {
    toast(msg , {
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

  return (
    <div>
      <div className="signup-outer container-fluid">
        <div className="signup-inner container">
          <ToastContainer/>
          <h2>Sign Up</h2>

          <form onSubmit={handleCardActive}>          
            <div className="form">
              <input type='text' className='form-control mt-3' name='name' placeholder='Name' onChange={(e) => onChangeHandler(e)} required/>
              <input type='tel' className='form-control mt-3' pattern="[0-9]{3}[0-9]{3}[0-9]{4}" maxLength='10' title='Enter valid phone number.' name='phone' placeholder='Phone number' onChange={(e) => onChangeHandler(e)} required/>
              <input type='email' className='form-control mt-3' name='email' placeholder='Email' onChange={(e) => onChangeHandler(e)} required/>
              <input type='password' className='form-control mt-3' pattern='(?=.*\d)(?=.*[a-z](?=.*[A-Z]).{8, 20})' title='Must containt atleast one uppercase one lowercase one digit and one spacial character.' name='password' placeholder='Pass****' onChange={(e) => onChangeHandler(e)} required/>
              <input type='password' className={`form-control mt-3 ${isValidPass ? "" : "border-warning"}`} pattern='(?=.*\d)(?=.*[a-z](?=.*[A-Z]).{8, 20})' title='Must containt atleast one uppercase one lowercase one digit and one spacial character.' name='re-password' placeholder='Re-Pass****' onChange={(e) => validatePassword(e.target.value)} required/>
            </div>
            <button className={`custom-btn ${activeCard ? 'd-none':''}`} type='submit'>Next</button>
          </form>

          <form onSubmit={handlerSignupBtn}>
          <div className={`price-card mt-3 ${activeCard === true ? '' : 'd-none'}`}>
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                <div className={`card-inner ${cardSelect === 0 ? "active-card" : ""}`} onClick={() => selectCardHanler(0)}>
                  <div className="heading-card">
                    <h5>Free </h5>
                  </div><hr></hr>
                  <div className="body-card">
                    <p>Features</p>
                    <ul>
                      <li>5 Gb Memory Space</li>
                      <li>Basic Speed of Downloads.</li>
                      <li>Basic Speed of Uploads.</li>
                      <li>Basic Security.</li>
                      <li>24 / 7 Online Chat Support.</li>
                    </ul>
                  </div><hr></hr>
                  <div className="footer-card">
                    <p>Select</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                <div className={`card-inner ${cardSelect === 1 ? "active-card" : ""}`} onClick={() => selectCardHanler(1)}>
                  <div className="heading-card">
                    <h5>&#8377;399/- per months </h5>
                  </div><hr></hr>
                  <div className="body-card">
                    <p>Features</p>
                    <ul>
                      <li>50 Gb Memory Space (SSD)</li>
                      <li>High Speed of Downloads.</li>
                      <li>High Speed of Uploads.</li>
                      <li>High Security.</li>
                      <li>24 / 7 Human Support.</li>
                    </ul>
                  </div><hr></hr>
                  <div className="footer-card">
                    <p>Select</p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12 col-12 mt-3">
                <div className={`card-inner ${cardSelect === 2 ? "active-card" : ""}`} onClick={() => selectCardHanler(2)}>
                  <div className="heading-card">
                    <h5>&#8377;499/- per month </h5>
                  </div><hr></hr>
                  <div className="body-card">
                    <p>Features</p>
                    <ul>
                      <li>100 Gb Memory Space(SSD)</li>
                      <li>High Speed of Downloads.</li>
                      <li>High Speed of Uploads.</li>
                      <li>High Security.</li>
                      <li>24 / 7 Human Support.</li>
                    </ul>
                  </div><hr></hr>
                  <div className="footer-card">
                    <p>Select</p>
                  </div>
                </div>
              </div>
            </div>
          <button className='custom-btn' type='submit'>Continue</button>
          </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
