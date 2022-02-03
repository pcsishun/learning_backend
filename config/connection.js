const mongoose = require('mongoose');
const { MONGODB } = process.env

exports.connect = () => {
     // Connect to mongodb // 
     mongoose.connect(MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
     }).then(()=>{
         console.log("connecting to mongodb")
     }).catch((err)=>{
         console.log("fail to connect error at "+ err)
         process.exit(1)
     })
}