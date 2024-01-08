const connectToMongoose = require("./config")
const express = require("express")
const cors = require("cors")
connectToMongoose()

const app = express()
const port = 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use("/api/user", require("./Routers/user"))
app.use('/images', express.static('uploads'));
app.use('/api/mobile' , require("./Routers/mobileaip"))
app.use('/api/dashboard', require('./Routers/dashboardapi'))

app.listen(port, () => {
    console.log(`Server start at http://localhost:${port}/api`)
})

