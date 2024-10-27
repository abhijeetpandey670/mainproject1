const express=require('express')
// console.log(express)
const app=express()
const port=4000
const web=require('./routes/web')
const connectDb=require('./database/connectDb')
//connect flash and session
const session =require('express-session')
const flash = require('connect-flash')
//cookie parser
const cookieparser =require('cookie-parser')
app.use(cookieparser())



app.use(flash())
//message
app.use(session({
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true,
}))
//image 
const fileupload = require('express-fileupload')
//css image link
app.use(express.static('public'))
//image 
//file upload
app.use(fileupload({
    limit: { fileSize: 50 * 1024 * 1024 },
    useTempFiles :true
}));


//html css setr
app.set('view engine','ejs')
//connecting database
connectDb()

//data insert
app.use(express.urlencoded({extended: true}));    //urlencoded is converted data from 

// routing
app.use('/',web)
// server start
app.listen(port,()=>{
    console.log(`server start local host: ${port}`)
})
