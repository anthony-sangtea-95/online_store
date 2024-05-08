const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Schema = require("./schemas/Schema");

const PORT = process.env.PORT || 5000;
const app = express();

const saveUser = async (data, schema) => {
    const hashedPwd = await bcrypt.hash(data.password, 10); // 10 is the number of salt rounds
    // Create a new user document
    const newUser = new schema({
        name: data.name,
        email: data.email,
        password: hashedPwd,
        is_admin: data.is_admin
    });
    
    // Save the user document to the database
    await newUser.save()
        .then((result) => {
        console.log('User saved successfully:', result);
    })
        .catch((error) => {
        console.error('Error saving user:', error);
    });
}

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(PORT, () => {
        console.log(`Connected to db and Server running on port ${PORT}`);
        // const response = Schema.makeSchema('User');
        // if(response.ok){
        //     const userData = {
        //         "name": "Anthony",
        //         "email": "sangatea2017@gmail.com",
        //         "password": "adminSanga@24",
        //         "is_admin": true
        //     };
        //     saveUser(userData, response.schema);
        // } else {
        //     console.log(response.error)
        // }

    });
})
.catch(error => {
    console.log(error);
})


