const mongoos = require("mongoose")
const {Schema} = mongoos
const FoldermodelSchema = new Schema({
    folderName : {
        type: String,
    },
    photographerId : {
        type: String,
    }
})
module.exports = mongoos.model('Foldermodel', FoldermodelSchema)