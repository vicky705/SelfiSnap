const mongoos = require("mongoose")
const {Schema} = mongoos
const UserSchema = new Schema({
    name: {
        type : String, 
        require : true
    },
    email: {
        type: String, 
        require: true
    },
    password: {
        type: String,
        require: true
    },
    timeStamp: {
        type: Date,
        require: true
    }
})
module.exports = mongoos.model('Users', UserSchema)