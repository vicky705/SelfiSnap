const express = require("express")
const route = express.Router()
const jwt = require('jsonwebtoken')
const bcript = require('bcryptjs')

const Imagefile = require("../Models/Imagefile")
const User = require('../Models/User')


const JWT_SECRITE = "thisisVicky"

route.post('/createuser', async(req, res) => {
    const data = req.body
    let status = false
    try{
        const users = await User.findOne({"email": data.email})
        if(users){
            return res.status(200).json({status, error: "User already exisit."})
        }
        const salt = await bcript.genSalt(10)
        const newPass = await bcript.hash(data.password, salt)
        const Users = await User.create({
            name: data.name,
            email: data.email,
            password: newPass
        })
        const userId = {
            user: {
                id: Users.id
            }
        }
        const authToken = jwt.sign(userId, JWT_SECRITE)
        status = true
        return res.json({status, authToken})
    }
    catch(error) {
        return res.status(500).json({status, error : "Something went wrong."})
    }
})

route.post("/loginuser", async(req, res) => {
    let status = false
    const {email, password} = req.body
    const user = await User.findOne({email})
    
    try{
        if(!user){
            return res.status(200).json({status, error : "Inavid Credential."})
        }
        const isUser = await bcript.compare(password, user.password)
        if(!isUser){
            return res.status(200).json({status, error: "Invalid Credential."})
        }
        const userId = {
            user: {
                id : user._id
            }
        }
        const authToken = jwt.sign(userId, JWT_SECRITE)
        
        status = true
        return res.status(200).json({status, authToken})
    }
    catch(error){
        res.status(200).json({status, error:"Somrthing went wrong."})
    }
})

route.get('/getAllImage', async(req, res) => {
    try{
        const image = await Imagefile.find()
        return res.status(200).json({image})
    }
    catch(error){
        return res.status(400).json({error: "No Image Found."})
    }
    // res.status(200).json({msg : "Success"})
})

module.exports = route