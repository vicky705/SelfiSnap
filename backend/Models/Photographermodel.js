const mongoos = require("mongoose")
const {Schema} = mongoos
const PhotographerScheme = new Schema({
    name : {
        type: String, require: true
    },
    email: {
        type: String, require: true
    },
    phone: {
        type: String, require: true
    },
    password: {
        type: String, require: true
    },
    subscription: {
        type: Number, require: true
    }
})
module.exports = mongoos.model('Photographermodel', PhotographerScheme)