const mongoose = require('mongoose')
// console.log(mongoose)
const local_url='mongodb://127.0.0.1:27017/ADMISSION_PORTAL'
const live_url="mongodb+srv://abhijeetpandey669:abhijeet123@cluster0.l8ezk.mongodb.net/ADMISSION_PORTAL?retryWrites=true&w=majority&appName=Cluster0"
const connectDb= ()=>{
    return mongoose.connect(live_url)
    .then(()=>{
        console.log('connected')
    }).catch((error)=>{
        console.log(error)
    })
}
module.exports=connectDb;