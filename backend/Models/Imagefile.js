const mongoos = require("mongoose")
const {Schema} = mongoos
const ImageSchema = new Schema({
    folderId: {
        type: String
    },
    photographerId : {
        type: String,
    },
    pathname : {
        type: String,
    }
})
module.exports = mongoos.model('Imagefile', ImageSchema)