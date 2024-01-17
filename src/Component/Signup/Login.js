import React, { useContext, useState } from 'react'
import Lottie from 'lottie-react'
import { Link, useNavigate } from 'react-router-dom'
import AnimationForLogin from './img/AnimationForLogin.json'
import dataContext from '../../Context/dataContext'

function Login() {
    const url = "http://localhost:4000/api/user"
    // const url = "https://44bxzm91-4000.inc1.devtunnels.ms/api/user"
    const navigate = useNavigate()
    const { updatePhotographerId } = useContext(dataContext)
    const [pass1Type, setPass1Type] = useState({
        action: "password"
    })
    const [msg, setMsg] = useState("")
    const [check, setCheck] = useState(false);
    const [field, setField] = useState({
        email: localStorage.getItem('email'),
        password: localStorage.getItem('auth')
    })

    const handleOnChange = (e) => {
        setField({ ...field, [e.target.name]: e.target.value })
    }
    const handleLogin = async (event) => {

        event.preventDefault();
        const response = await fetch(`${url}/loginPhotographer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(field)
        })
        const json = await response.json()
        if (json.status) {
            localStorage.setItem('PhotographerId', json.authToken)
            if (check) {
                localStorage.setItem('email', field.email)
                localStorage.setItem('auth', field.password)
            }
            updatePhotographerId()
            navigate('/')
        }
        else {
            setMsg(json.message)
        }
    }
    const handlePass1Type = () => {
        if (pass1Type.action === "password") {
            setPass1Type({
                action: "text"
            })
        }
        else {
            setPass1Type({
                action: "password"
            })
        }
    }
    const handlerOnChack = (e) => {
        if (e.target.checked) {
            setCheck(true)
        }
        else {
            setCheck(false)
        }
    }



    return (
        <div>
            <div className="outer-form container-fluid">
                <div className="inner-form container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12 class anim">
                            <div className='loginAnimation'>
                                <Lottie animationData={AnimationForLogin} loop={true} />
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                            <div className="form">
                                <div className="heading">
                                    <h2 className='text-center'>SelfiSnap</h2>
                                    <p className='login'>Login</p>
                                    <p>Stay with login and enjoy our Products. We appreciate your subscription.</p>
                                </div>
                                <p className='text-warning'>{msg}</p>
                                <div className="form-body">
                                    <form onSubmit={handleLogin}>
                                        <input className='form-control my-3' name='email' type='text' placeholder='Email' onChange={(e) => handleOnChange(e)} value={`${field.email != null ? field.email : ''}`} required />
                                        <input className='form-control mt-3' name='password' type={`${pass1Type.action}`}placeholder='Pass****' onChange={(e) => handleOnChange(e)} value={`${field.password != null ? field.password : ''}`} />
                                        <div className='password-type-change'><i className={`fa-solid fa-eye ${pass1Type.action === "text" ? "d-none" : ""}`} onClick={handlePass1Type}></i><i className={`fa-solid fa-eye-slash ${pass1Type.action === "password" ? "d-none" : ""}`} onClick={handlePass1Type}></i></div><br></br>

                                        <div className="row">
                                            <div className="col-6">
                                                <input type='checkbox' onClick={(e) => handlerOnChack(e)} /><label className='text-light mx-2'>Save login info</label>
                                            </div>
                                            <div className="col-6">
                                                <Link to='/'>Forgot Password</Link>
                                            </div>
                                        </div>
                                        <button className='btn login-btn' type='submit'>Login</button>
                                        <p className='text-center'>Does not have account yet? <Link to='/signup'>Register</Link></p>
                                    </form>
                                    <Link className='back-btn' to={'/'}>Go To Home</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
