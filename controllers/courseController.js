const CourseModel = require('../models/course'); // Use a single import
const nodemailer= require("nodemailer") //npm i nodemailer

class courseController {
  
  // Method to insert a course
  static courseInsert = async (req, res) => {
    try {
      const { id } = req.userData; // Get user ID
      const { name, email, phone, dob, address, gender, education, course } = req.body;

      const data = await CourseModel.create({
        name,
        email,
        phone,
        dob,
        address,
        gender,
        education,
        course,
        user_id: id,
      });
this.sendEmail(name,email,course);

      res.redirect("/display");
    } catch (error) {
      console.log(error);
    }
  };

  // Method to display all courses
  static courseDisplay = async (req, res) => {
    try {
      const { name, email, image } = req.userData;

      const data = await CourseModel.find(); // Fetch all course data
      res.render("course/display", { d: data, n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };

  // Method to update a course
  static courseUpdate = async (req, res) => {
    try {
      const id = req.params.id;
      const { name, email, phone, dob, address, gender, education, course } = req.body; // Correct destructuring

      // Update course data by ID
      const data = await CourseModel.findByIdAndUpdate(id, {
        name,
        email,
        phone,
        dob,
        address,
        gender,
        education,
        course
      });

      res.redirect("/display");
    } catch (error) {
      console.log(error);
    }
  };

  static courseEdit = async (req, res) => {
    try {
      const { name, email, image } = req.userData;
      const id = req.params.id;
      const data = await CourseModel.findById(id); // Find course by ID
      res.render("course/edit", { d: data, n: name, e:email });
    } catch (error) {
      console.log(error);
    }
  };
  static courseView = async (req, res) => {
    try {
      const { name, email, image } = req.userData;
      const id = req.params.id;
      //console.log(id)
      const data = await CourseModel.findById(id)
      console.log(data) 
      res.render("course/view",{d:data,e:email,i:image,n:name});
    } catch (error) {
      console.log(error);
    }
  };

  // Method to delete a course
  static courseDelete = async (req, res) => {
    try {
      
      const id = req.params.id;
     const data= await CourseModel.findByIdAndDelete(id); 
      res.redirect("/display");

    } catch (error) {
      console.log(error);
    }
  };


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


module.exports = courseController;
