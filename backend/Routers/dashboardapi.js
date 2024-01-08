const express = require("express")
const Foldermodel = require("../Models/Foldermodel")
const Imagefile = require("../Models/Imagefile")
const route = express.Router()


route.post("/getForDashboard", async(req, res) => {
    const pId = req.body.photographerId
    
    let status = false
    try{
        const fol = (await Foldermodel.find({"photographerId" : pId})).length;
        const pho = (await Imagefile.find({"folderId": pId})).length;
        status = true
        res.status(200).json({status, fol, pho})
    }
    catch(error){
        res.status(200).json({status, error: "Something Wrong."})
    }
})

module.exports = route