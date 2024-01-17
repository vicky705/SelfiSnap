const mongoos = require("mongoose")
const url = "mongodb+srv://vickykumar776655:Uttam123@cluster0.89yiavx.mongodb.net/Selfisnap?retryWrites=true&w=majority"
const connectToMongoose = () =>{
    mongoos.connect(url).then(() => {
        console.log("Connected...")
    }).catch((err) => {
        console.log(err.toString())
    })
}
module.exports = connectToMongoose