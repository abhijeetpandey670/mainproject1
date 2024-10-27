const UserModel = require("../models/user")
const bcrypt = require("bcrypt");   //for password
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken");
const courseController = require("./courseController");
const CourseModel = require("../models/course");

// Configuration
cloudinary.config({
    cloud_name: 'dxzwu2zho',
    api_key: '946887159716699',
    api_secret: 'JdsopJ0A72BUd2QWumWM6pcqS0M' // Click 'View API Keys' above to copy your API secret
});


class FrontController {
    static home = async (req, res) => {
        try {
            const {name ,image,email,id ,role} =req.userData;
            const btech =await CourseModel.findOne({user_id: id,course:"btech"});
            const BCA =await CourseModel.findOne({user_id: id,course:"BCA"});
            const MCA =await CourseModel.findOne({user_id: id,course:"MCA"})
            res.render("home",{
              n:name,
              i:image,
              e:email,
              btech:btech,
              BCA:BCA,
              MCA:MCA,
              r:role,
        });
        
        } catch (error) {
            console.log(error)
        }
    }
    static about = async (req, res) => {
        try {
            const {name ,image} =req.userData;
            res.render("about",{
                n:name,
                i:image,
            });
        } catch (error) {
            console.log(error)
        }
    }
    static Login = async (req, res) => {
        try {
            res.render("login", {
                msg: req.flash("success"),
                // message: req.flash("success"),
                msg1: req.flash("error"),

            });
        } catch (error) {
            console.log(error)
        }
    }
    static register = async (req, res) => {
        try {

            res.render("register", { message: req.flash('error') });
        } catch (error) {
            console.log(error)
        }
    }
    static contact = async (req, res) => {
   
        try {
            const {name ,image} =req.userData;
            res.render("contact",{
                n:name,
                i:image,
            });
           
           
        } catch (error) {
            console.log(error)
        }

    }

    //data insert
    static userInsert = async (req, res) => {
        try {
            // const file =req.files.image
            // const imageUplaod=await cloudinary.uploader.upload(file.tempFilePath,{
            //     folder:"profile"
            // })
            // console.log(imageUplaod)

            // console.log(req.files)
            //   console.log(req.body)
            const { n, e, p, cp } = req.body    // req.body =data uth ke ata h jo ham  input m dete h

            const user = await UserModel.findOne({ email: e })
            if (user) {
                req.flash('error', 'email dal chuka h tu ')
                res.redirect('/register')
            }
            else {
                if (n && e && p && cp) {
                    if (p == cp) {
                        const file = req.files.image
                        const imageUplaod = await cloudinary.uploader.upload(file.tempFilePath, {
                            folder: "profile"
                        }
                        );
                        const hashPassword = await bcrypt.hash(p, 10)    // 10 make thepasswrod more stronger
                        const result = new UserModel({
                            name: n,
                            email: e,
                            password: hashPassword,
                            image: {
                                public_id: imageUplaod.public_id,
                                url: imageUplaod.secure_url
                            }
                        })
                        // to save data
                        await result.save();
                        req.flash("success", "successfully registered")
                        res.redirect('/')
                    } else {
                        req.flash("error", "password and confirm not match")
                        res.redirect("/register")
                    }

                } else {
                    req.flash("error", "All fields are required")
                    res.redirect("/register")
                }
            }

        } catch (error) {
            console.log(error)
        }

    };
    static verifylogin = async (req, res) => {
        try {
            // console.log(req.body)
            const { email, password } = req.body;
            const user = await UserModel.findOne({ email: email })
            if (user != null) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    if (user.role == "admin") {
                        // token
                        const token = jwt.sign({ ID: user._id }, "mjnbvrydctfvyijmkol")
                        // console.log(token)
                        res.cookie("token", token)
                        res.redirect("/admin/dashboard")

                    }
                    if (user.role == "user") {
                        // token
                        const token = jwt.sign({ ID: user._id }, "mjnbvrydctfvyijmkol")
                        // console.log(token)
                        res.cookie("token", token)
                        res.redirect("/home")

                    }

                } else {
                    req.flash("error", "email or passwrod is not valid");
                    res.redirect("/")
                }
            } else {
                req.flash("error", "you are not registered user")
                res.redirect("/")
            }
        } catch (error) {
            console.log(error);
        }
    };
    static logout = async (req, res) => {
        try {
            res.clearCookie("token");
            res.redirect("/")
        } catch {
            console.log(error)
        }
    };

    static profile = async (req, res) => {
        try {
          const {name ,image,email} =req.userData;
          res.render("profile",{
            n:name,
            i:image,
            e:email
          });
        } catch (error) {
          console.log(error);
        }
      };

      static changepassword= async(req,res)=>{
        try {
            const{id}=req.userData;
            console.log(req.body)
            const{op,np,cp} =req.body;
            if(op &&np &&cp){
                const user =await UserModel.findById(id);
                const isMatched =await bcrypt.compare(op,user.password);
                //console.log(isMatched)
                if (!isMatched){
                    req.flash("error","current password is incorrect");
                    res.redirect("/profile");
                }else {
                    if(np!=cp){
                        req.flash("error","password does not match");
                        res.redirect("/profile");
                    }else{
                        const newHashPassword =await bcrypt.hash(np, 10);
                        await UserModel.findByIdAndUpdate(id,{
                            password: newHashPassword,
                        })
                        req.flash("success","password updated succesfully")
                         res.redirect("/")
                    }
                }
            } else{
                req.flash("error", "all fields are equired");
                res.redirect("/profile")
            }
        } catch (error) {
            console.log(error);
        }

      }
    //   static updateProfile= async(req,res)=>{
    //  try {
    //     const{id}=req.userData;
    //     const{name, email}=req.body;
    //     if(req.files){
    //         const user =await UserModel.findById(id);
    //         const imageID = user.image.public_id;
    //         console.log(imageID);
    //         //deleting image from cloudniary
    //         await cloudinary.uploader.destroy(imageID);
    //         //new image update;
    //         const imagefile =req.files.image;
    //         const imageupload= await cloudinary.uploader.upload(imagefile.tempFilePath,{
    //             folder: "userprofile",
    //         })
    //         var data= {
    //             name: name,
    //             email:email,
    //             image:{
    //                 public_id: imageupload.public_id,
    //                 url: imageupload.secure_url,
    //             },
    //         }
    //     }
    //  } catch (error) {
    //     console.log(error)
    //  }
           
    // }

}
module.exports = FrontController;