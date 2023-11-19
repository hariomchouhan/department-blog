const express = require("express")

const router = express.Router()

const authRoute = require("./auth")
const storyRoute = require("./story")
const userRoute = require("./user")
const commentRoute = require("./comment")
const adminRouter = require("./admin")
const adminAuthRouter = require("./adminAuth")

router.use("/auth",authRoute)
router.use("/auth",adminAuthRouter)
router.use("/story",storyRoute)
router.use("/user",userRoute)
router.use("/comment",commentRoute)
router.use("/admin",adminRouter)


module.exports = router