const express = require("express")

const {register,login,forgotpassword,resetpassword,getPrivateData} = require("../Controllers/auth.js");

const { getAccessToRoute } = require("../Middlewares/Authorization/auth.js");

const router = express.Router() ;


router.post("/register",register)

router.post("/login",login)

router.post("/forgotpassword",forgotpassword)

router.put("/resetpassword",resetpassword)

router.get("/private",getAccessToRoute,getPrivateData)


module.exports = router