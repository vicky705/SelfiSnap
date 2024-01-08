const express = require("express")
const route = express.Router()
const jwt = require('jsonwebtoken')
const bcript = require('bcryptjs')
const multer = require("multer")
const Imagefile = require("../Models/Imagefile")
const Foldermodel = require('../Models/Foldermodel')
const Photographermodel = require('../Models/Photographermodel')

const JWT_SECRITE = "thisisVicky"

let fileNamePath = ""
const storage = multer.diskStorage({
    destination : function (req, fill, cb){
        return cb(null, './uploads')
    },
    filename: function (req, file, cb){
        const fileName = `${Date.now()}-${file.originalname}`
        fileNamePath = fileName
        return cb(null, fileName)
    }
})

const upload = multer({storage})
route.post('/uploadFile', upload.single('image'), async (req, res) => {
    const data = req.body;
    const file = await Imagefile.create({
        folderId : data.folderId,
        photographerId: data.photographerId.id,
        pathname: fileNamePath
    })

    res.status(200).json({status: true, data: file})
})

const storageForSelfi = multer.diskStorage({
    destination: function (req, file, cb){
        return cb(null, './selfiPhoto')
    },
    filename: function(req, fill, cb){
        const fileName = `${Date.now()}-${file.originalname}`
        fileNamePath = fileName
        return cb(null, fileName)
    }
})
const uploadSelfi = multer(storageForSelfi)
route.post('/uploadSelfi', uploadSelfi.single('image'), async (req, res) => {
    return res.status(200).json({status: true, fileName: fileNamePath})
})

route.post('/getAllImage', async(req, res) => {
    const data = req.body;
    try{
        const image = await Imagefile.find({photographerId : data.id})
        res.status(200).json({image})
    }
    catch(error){
        res.status(200).json({message: "Image not found."})
    }
})



route.post('/createFolder', async(req, res) => {
    const {folderName} = req.body;
    let folder = await Foldermodel.findOne({folderName})
    if(folder){
        res.status(200).json({message: "Folder already exist."})
    }
    else{
        folder = await Foldermodel.create({
            folderName : req.body.folderName,
            photographerId : req.body.photographerId
        })
        res.status(200).json(folder)
    }
})
route.post('/getAllFolder', async(req, res) => {
    const data = req.body
    try{
        const folder = await Foldermodel.find({photographerId: data.photographerId})
        res.status(200).json({folder})
    }
    catch(error){
        res.status(200).json({error})
    }
})

route.post('/createPhotographer', async(req, res) => {
    const data = req.body
    let status = false
    try{
        const Photographer = await Photographermodel.findOne({"email": data.email})
        if(Photographer){
            return res.status(200).json({status, message: "Email Id aleardy exist."})
        }
        else{
            const salt = await bcript.genSalt(10)
            const newPass = await bcript.hash(data.password, salt)
            const user = await Photographermodel.create({
                name: data.name,
                email: data.email,
                phone: data.phone,
                password: newPass,
                subscription: data.subscription
            })
            console.log(user)
            const userId = {
                id: user._id
            }
            const authToken = jwt.sign(userId, JWT_SECRITE)
            status = true
            return res.status(200).json({status, authToken})
        }
    }
    catch(error){
        return res.status(200).json({status, message : "Something worng"})
    }
})
route.post('/loginPhotographer', async(req, res)=> {
    let status = false
    try{
        const data = req.body
        const user = await Photographermodel.findOne({email: data.email})
        if(!user) return res.status(200).json({status, message: "Invalid Credential."})
        const isUser = await bcript.compare(data.password, user.password)
        if(!isUser) return res.status(200).json({status, message: "Invalid Credential."})
        const userId = {
            id : user._id
        }
        const authToken = jwt.sign(userId, JWT_SECRITE)
        status = true
        return res.status(200).json({status, authToken})
    }
    catch(error){
        return res.status(200).json({status, message: "Something wrong."})
    }
})
route.post('/tokenToUserId', (req, res) => {
    let status = false
    try{
        const decode = jwt.verify(req.body.token, JWT_SECRITE)
        if(!decode) res.status(200).json({status, message: "Invalid Auth Token"})
        status = true
        res.status(200).json({status, decode})
    }
    catch(error){
        res.status(200).json({status, message: "Invalid Auth Token."})
    }
})


module.exports = route