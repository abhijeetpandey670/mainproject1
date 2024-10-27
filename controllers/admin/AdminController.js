const CourseModel = require('../../models/course');
const UserModel = require('../../models/user')

const cloudinary = require("cloudinary").v2;
const nodemailer =require("nodemailer")

// Configuration
cloudinary.config({
  cloud_name: "dclltwlph",
  api_key: "343467267116581",
  api_secret: "Lsbg3k9_0-AdITWFQvcmMG5Ti9Y", // Click 'View API Keys' above to copy your API secret
});
class AdminController {
  static dashboard = async (req, res) => {
    try {
      const {name,image} =req.userData
      res.render("admin/dashboard",{n:name,i:image});
    } catch (error) {
      console.log(error);
    }
  };

  static display = async (req, res) => {
    try {
      const {name,image} =req.userData
      const data =await UserModel.find()
      //console.log(data)
      res.render("admin/display",{d:data,n:name,i:image});
    } catch (error) {
      console.log(error);
    }
  };
  static adduser = async (req, res) => {
    try {
      res.render("admin/adduser");
    } catch (error) {
      console.log(error);
    }
  };
  static viewUser = async (req, res) => {
    try {
      const id = req.params.id;
      //console.log(id)
      const data = await UserModel.findById(id)
      console.log(data) 
      res.render("admin/viewUser",{d:data});
    } catch (error) {
      console.log(error);
    }
  };
  static editUser = async (req, res) => {
    try {
      const id = req.params.id;
      //console.log(id)
      const data = await UserModel.findById(id)
      // console.log(data) 
      res.render("admin/editUser",{d:data});
    } catch (error) {
      console.log(error);
    }
  };
  static updateUser = async (req, res) => {
    try {
      const id = req.params.id;
      const {n,p,e}=req.body
      console.log(req.body)
      // console.log(id)
      const data = await UserModel.findByIdAndUpdate(id,{
        name:n,
        email:e,
        password:p
      })
      // console.log(data) 
      res.redirect("/admin/studentDisplay");//route
    } catch (error) {
      console.log(error);
    }
  };
  static deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      // console.log(id)
      const data = await UserModel.findByIdAndDelete(id)
      // console.log(data) 
      res.redirect("/admin/studentDisplay");//route
    } catch (error) {
      console.log(error);
    }
  };
  static userInsert = async (req, res) => {
    try {
        console.log(req.body);
        IMAGE 
        const file = req.files.image;
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "profile"
      });
        const {n,e,p,cp} = req.body
      
        const result = new UserModel({
          name:n,
          email:e,
          password:p,
          image:{
            public_id:imageUpload.public_id,
            url:imageUpload.secure_url
          }
        })
        await result.save()
        res.redirect('/admin/studentDisplay')//route ka url h
    } catch (error) {
      console.log(error);
    }
  };

  //course dispay
  static courseDisplay = async (req, res) => {
    try {
      const {name,image} =req.userData
      const data =await CourseModel.find()
      //console.log(data)
      res.render("admin/course/display",{d:data,n:name,i:image});
    } catch (error) {
      console.log(error);
    }

    
};
static courseDelete = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id)
    const data = await CourseModel.findByIdAndDelete(id)
    // console.log(data) 
    res.redirect("/admin/courseDisplay");//route
  } catch (error) {
    console.log(error);
  }
}
static courseView = async (req, res) => {
  try {
    const id = req.params.id;
    //console.log(id)
    const data = await CourseModel.findById(id)
    console.log(data) 
    res.render("admin/course/view",{d:data});
  } catch (error) {
    console.log(error);
  }
};
 static statusupdate =async (req, res) => {
  try {
    const {name,email,status,comment} = req.body;
      const id = req.params.id;
      this.sendEmail(name,email,status,comment);
      await  CourseModel.findByIdAndUpdate(id,{
        status:status,
        comment:comment
      });
      res.redirect('/admin/courseDisplay')
  } catch (error) {
    console.log(error)
  }
 }
 static sendEmail = async (name, email, course) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user:"abhijeetpandey669@gmail.com",
       pass:"jbaeqgiamirivnhe"
    },
  });

  let info = await transporter.sendMail({
    from: "test@gmail.com", //sender address
    to: email, //list of receivers
    subject: `course ${course}`, //subject line
    text: "hello", //plain text body
    html: `<b>${name}</b>course <b>${course}</b> insert successfully <br>`, //html body
  });
};
}

module.exports = AdminController;