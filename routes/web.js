const express=require("express")
const FrontController = require("../controllers/Frontcontroller")
const AdminController = require("../controllers/admin/AdminController")
const checkUserAuth =require('../middleware/checkauth')
const courseController =require("../controllers/courseController")
const route=express.Router()
// route.get('/',(req,res)=>{
//     res.send('hello world')
// })
// route.get('/about',(req,res)=>{
//     res.send("heyyyyy")
// })


route.get('/about',checkUserAuth ,FrontController.about)
route.get('/home',checkUserAuth ,FrontController.home)
route.get('/',FrontController.Login)
route.get('/register',FrontController.register)
route.get('/contact',checkUserAuth ,FrontController.contact)
//insert data
route.post('/userInsert',FrontController.userInsert)
//for login
route.post('/verifylogin',FrontController.verifylogin)
//for logout
route.get("/logout",FrontController.logout)



//admincontrollercheckUserAuth ,
route.get('/admin/dashboard',checkUserAuth,AdminController.dashboard)
route.get('/admin/studentDisplay',checkUserAuth,AdminController.display)
route.get('/admin/adduser',checkUserAuth,AdminController.adduser)
route.post('/admin/userInsert',checkUserAuth,AdminController.userInsert)

//courseadmin dispolay
route.get('/admin/courseDisplay',checkUserAuth,AdminController.courseDisplay)
route.get("/admin/courseDelete/:id",checkUserAuth,AdminController.courseDelete)
route.get("/admin/courseView/:id",checkUserAuth,AdminController.courseView);
route.post("/admin/statusUpdate/:id", checkUserAuth,AdminController.statusupdate)

//for delete edit 
route.get('/admin/viewUser/:id',checkUserAuth,AdminController.viewUser)
route.get('/admin/editUser/:id',checkUserAuth,AdminController.editUser)
route.post('/admin/UpdateUser/:id',checkUserAuth,AdminController.updateUser)
route.get("/admin/deleteUser/:id",checkUserAuth,AdminController.deleteUser)




//courses
route.post("/courseInsert", checkUserAuth, courseController.courseInsert);
route.get("/display", checkUserAuth, courseController.courseDisplay);
route.get("/course/edit/:id", checkUserAuth, courseController.courseEdit);
route.post("/courseUpdate/:id", checkUserAuth, courseController.courseUpdate);
route.get("/course/delete/:id", checkUserAuth, courseController.courseDelete);
route.get("/course/view/:id", checkUserAuth, courseController.courseView);


//profile
route.get("/profile", checkUserAuth, FrontController.profile);
route.post("/ChangePassword", checkUserAuth, FrontController.changepassword);
// route.post("/updateProfile",checkUserAuth,FrontController.updateProfile);




module.exports=route
