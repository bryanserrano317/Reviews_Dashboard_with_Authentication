const express = require('express')
const app = express()
const path = require('path')
const bcrypt = require('bcrypt')
const collection = require('./src/config')

const users = []

app.listen(process.env.PORT || 3001, '0.0.0.0', () => {
    console.log("Server is running.");
  });
  

app.set('view-engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.get('/internal/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/internal/login', async (req, res) => {
    try {
        const check = await collection.findOne({name: req.body.name})

        if(!check){
            console.log("User not found");
            res.sendStatus(500);
            return;
        }

        const isPasswordmatch = await bcrypt.compare(req.body.password, check.password)

        if(isPasswordmatch){
            console.log("Logged In")
            res.render('index.ejs')
        } else {
            // res.send("Password incorrect")
            console.log("Password incorrect");
            res.sendStatus(500);
            return;
        }
    } catch {
        // res.send("Issue logging user in")
        console.log("Issue logging user in");
        res.sendStatus(500);
        return;
    }
})

// app.get('/internal/register', (req, res) => {
//     res.render('register.ejs')
// })

// app.post('/internal/register', async (req, res) => {
//     const data = {
//         name: req.body.name,
//         password: req.body.password
//     }

//     const existingUser = await collection.findOne({name: data.name})

//     if(existingUser){
//         res.send("User already exists. Please choose a different username. ");
//     } else {
//         const salt = 10;
//         const hashPassword = await bcrypt.hash(data.password, salt);
//         data.password = hashPassword
//         const userData = await collection.insertMany(data)
//         console.log(userData)
//     }

    
// })

// const uri = "";

// const mongoose = require('mongoose')
// mongoose.connect(uri)

// const db = mongoose.connection
// db.on('error', () => console.error(error))
// db.once('open', () => console.log('Connected'))

const host = '0.0.0.0';
const port = process.env.PORT || 5000;
