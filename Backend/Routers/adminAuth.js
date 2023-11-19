const express = require("express")

// const {register,login,forgotpassword,resetpassword,getPrivateData} = require("../Controllers/auth.js");

const { getAccessToRoute } = require("../Middlewares/Authorization/auth.js");
const { register, login, forgotpassword, resetpassword, getPrivateData } = require("../Controllers/adminAuth.js");

const adminAuthRouter = express.Router() ;


adminAuthRouter.post("/admin/register",register)

adminAuthRouter.post("/admin/login",login)

adminAuthRouter.post("/admin/forgotpassword",forgotpassword)

adminAuthRouter.put("/admin/resetpassword",resetpassword)

adminAuthRouter.get("/admin/private",getAccessToRoute,getPrivateData)


module.exports = adminAuthRouter