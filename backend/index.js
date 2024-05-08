import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'

const PORT = process.env.PORT || 5000
const app = express()

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Connected to db and Server running on port ${PORT}`);
    })
})
.catch(error => {
    console.log(error);
})
