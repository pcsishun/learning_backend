require('dotenv').config();
require('./config/connection').connect();

const express = require('express');
const bcrypt = require("bcrypt");
const User = require('./model/users');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(express.json());
app.use(cors()); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const enryptRound = 10;

app.post('/register', async(req, res) => {
    const { firstname, lastname, email, password} = req.body;
    // console.log(req.body)
    if(!(firstname && lastname && email && password)){
        const replyText = {
            registerStatus: false,
            text: "all input must not be empty."
        }
        res.status(400).send(replyText)
    } 
    try{
        const userExist = await User.findOne({email});
        const hashPassword = bcrypt.hashSync(password, enryptRound);
        if(userExist){
            const replyText = {
                registerStatus: false, 
                text: "this email alreadly register."
            }
            res.status(400).send(replyText)
        }else{
            await User.create({
                firstname: firstname, 
                lastname: lastname,
                email: email,
                password: hashPassword
            })
            const replyText = {
                registerStatus: true,
                text: "register success."
            }
            res.status(200).send(replyText)
        }}catch(err){
            const replyText = {
                registerStatus: false, 
                text: "Opps something wrong on server!"
            }
            res.status(501).send(replyText)
        }
    }
)

app.post('/login', async(req, res) => {
    const { email, password } = req.body;
    try{
        const setEmail =  await User.findOne({email});
        if(setEmail && (await bcrypt.compare(password, setEmail.password))){
            const genToken = jwt.sign(
                {userId: setEmail._id, email},
                process.env.TOKEN_KEY,
                {expiresIn: "1h"}
            )
            const replyLogin = {
                firstname: setEmail.firstname,
                lastname: setEmail.lastname,
                email: setEmail.email,
                token: genToken
            }
            console.log(replyLogin)
            res.status(201).send(replyLogin)
        }
    }catch(err){
        const replyText = {
            loginStatus: false,
            text: "Invalid email or password."
        }
        res.status(401).send(replyText)
    }
})

app.post('/checkauth', auth, async(req, res)=>{
    console.log("Hello World");
    res.status(200).send("Hello World")
})

module.exports = app;