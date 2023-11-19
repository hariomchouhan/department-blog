const asyncErrorWrapper = require("express-async-handler")
const CustomError = require("../Helpers/error/CustomError");
const { sendToken } = require("../Helpers/auth/tokenHelpers");
const sendEmail = require("../Helpers/Libraries/sendEmail");
const { validateUserInput,comparePassword } = require("../Helpers/input/inputHelpers");
const Admin = require("../Models/admin");

const getPrivateData = asyncErrorWrapper((req,res,next) =>{

    return res.status(200).json({
        success:true ,
        message : "You got access to the private data in this route ",
        user : req.user

    })

})

const register = asyncErrorWrapper (async  (req,res,next) => {

    const { username,email , password} = req.body  ;
    
    const newAdmin = await Admin.create({
        username,
        email,
        password
    })
    
    sendToken(newAdmin ,201,res)
  

})

const login  = asyncErrorWrapper (async(req,res,next) => {

    const {email,password} = req.body 

    if(!validateUserInput(email,password)) {

        return next(new CustomError("Please check your inputs",400))
    }

    const admin = await Admin.findOne({email}).select("+password")

    if(!admin) {
        
        return next(new CustomError("Invalid credentials",404))
    }

    if(!comparePassword(password,admin.password)){
        return next(new CustomError("Please check your credentails",404))
    }

    if(!admin.active) {
        return next(new CustomError("Your Account is Deactivated", 404))
    }

    sendToken(admin ,200,res)  ;
    
})




const forgotpassword  = asyncErrorWrapper( async (req,res,next) => {
    const {URI,EMAIL_USERNAME} = process.env ; 

    const resetEmail = req.body.email  ;

    const admin = await Admin.findOne({email : resetEmail})

    if(!admin ) {
        return next(new CustomError( "There is no admin with that email",400))
    }

    const resetPasswordToken = admin.getResetPasswordTokenFromUser();

    await admin.save()  ;

    const resetPasswordUrl = `${URI}/resetpassword?resetPasswordToken=${resetPasswordToken}`

    const emailTemplate = `
    <h3 style="color : red "> Reset Your Password </h3>
    <p> This <a href=${resetPasswordUrl}   
     target='_blank'  >Link </a> will expire in 1 hours </p> 
    `;

    try {

        sendEmail({
            from: EMAIL_USERNAME,
            to: resetEmail, 
            subject: " ✔ Reset Your Password  ✔", 
            html: emailTemplate
        })

        return res.status(200)
        .json({
            success: true,
            message: "Email Send"
        })

    }

    catch(error ) {

        admin.resetPasswordToken = undefined ;
        admin.resetPasswordExpire = undefined  ;

        await admin.save();
   
        return next(new CustomError('Email could not be send ', 500))
    }



})


const resetpassword  =asyncErrorWrapper(  async (req,res,next) => {

    const newPassword = req.body.newPassword || req.body.password

    const {resetPasswordToken} = req.query

    if(!resetPasswordToken) {

        return next(new CustomError("Please provide a valid token ",400))
    }

    const admin = await Admin.findOne({

        resetPasswordToken :resetPasswordToken ,
        resetPasswordExpire : { $gt: Date.now() }

    })
    
    if(!admin) {
        return next(new CustomError("Invalid token or Session Expired" ,400))
    }


    admin.password = newPassword ; 

    admin.resetPasswordToken = undefined 
    admin.resetPasswordExpire = undefined

    await admin.save() ; 

    return res.status(200).json({
        success :true ,
        message : "Reset Password access successfull"
    })

})


module.exports ={
    register,
    login,
    resetpassword,
    forgotpassword,
    getPrivateData
}