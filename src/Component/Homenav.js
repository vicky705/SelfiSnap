import React, { useState } from 'react'
import './Homenav.css'
import video from '../assets/HomePageVideo.gif'
import { Link } from 'react-router-dom'

const Homenav = () => {
    const [isActive, setIsActive] = useState(false)

  return (
    <div className='home-parent' id='home'>
        <div className="container-fulid homenav">
            <div className="container inner">
                <div className="logo">
                    <p className=''>Selfi<strong>Snap</strong></p>
                </div>
                <div className={`menu ${isActive ? 'active' : ''}`}>
                    <ul>
                        <li><a href='#home'>Home</a></li>
                        <li><a>About</a></li>
                        <li><a>Service</a></li>
                        <li><a href='#price'>Price</a></li>
                        <li><a>Contact Us</a></li>
                        <li className='getStart'><Link to='/login'>Get Start</Link></li>
                    </ul>
                </div>
                <div className="mobile">
                    <i class={`fa-solid fa-bars ${isActive ? 'd-none' : ''}`} onClick={() => setIsActive(!isActive)}></i>
                    <i class={`fa-solid fa-xmark ${isActive ? '' : 'd-none'}`} onClick={() => setIsActive(!isActive)}></i>
                </div>
            </div>
        </div>
        <div className="container-fulid info-section">
            <div className="container inner">
                <div className="row">
                    <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                        <p className='title'>DELIVER IMAGES FASTER , BETTER</p>
                        <p className='sub-title'>Powered by <strong>AI</strong></p>
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                <div className="card-op">
                                    <div className="icon d-flex">
                                        <i class="fa-regular fa-object-group"></i>
                                        <p>Select</p>
                                    </div>
                                    <p className='text'>Rate upto 4000 images in one hour, fully automated! Intelligent AI that culls like you.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                <div className="card-op">
                                    <div className="icon d-flex">
                                    <i class="fa-regular fa-pen-to-square"></i>
                                        <p>Edit</p>
                                    </div>
                                    <p className='text'>Automate your lightroom editing using AI that learns your style and saves you time. Edit upto 3000 images in an hour!</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                                <div className="card-op">
                                    <div className="icon d-flex">
                                    <i class="fa-regular fa-share-from-square"></i>
                                        <p>Share</p>
                                    </div>
                                    <p className='text'>Make images reach every event attendee privately and securely using facial recognition. Generate leads and print sales like never before.</p>
                                </div>
                            </div>
                        </div>
                        <div className="subscribe">
                            <form>
                                <input type='email' placeholder='Your Email Here...'/>
                                <button>GET START</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                        <img className='home-video' src={video} />
                    </div>
                </div>
            </div>
        </div>

        <div className="container-fluid price" id='price'>
            <div className="container">
                <p className='title'>Price</p>
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                        <div className="price-card">
                            <div className="card-price">
                                <p>Free </p>
                            </div>
                            <div className="card-details">
                                <ul>
                                    <li>5GB Memory Space (HDD)</li>
                                    <li>Basic Speed of Downloading.</li>
                                    <li>Basic Speed of Uploading.</li>
                                    <li>Basic Security.</li>
                                    <li>24 / 7 Online Chat Support.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                        <div className="price-card">
                            <div className="card-price">
                                <p>&#8377; 399 /-</p>
                            </div>
                            <div className="card-details">
                                <ul>
                                    <li>50GB Memory Space ( SSD )</li>
                                    <li>High Speed of Downloading.</li>
                                    <li>High Speed of Uploading.</li>
                                    <li>High Security.</li>
                                    <li>24 / 7 Online Chat and Customer care Support.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                        <div className="price-card">
                            <div className="card-price">
                                <p>&#8377; 499 /-</p>
                            </div>
                            <div className="card-details">
                                <ul>
                                    <li>100GB Memory Space ( SSD )</li>
                                    <li>High Speed of Downloading.</li>
                                    <li>High Speed of Uploading.</li>
                                    <li>High Security.</li>
                                    <li>24 / 7 Online Chat and Customer care Support.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Homenav
