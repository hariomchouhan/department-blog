const express = require("express")

const imageUpload = require("../Helpers/Libraries/imageUpload");

const {profile,editProfile,changePassword} = require("../Controllers/user");
const { getAccessToRoute } = require("../Middlewares/Authorization/auth");
const { getAllUsers, updateUserByAdmin } = require("../Controllers/admin");
const { checkUserExist } = require("../Middlewares/database/databaseErrorhandler");


const adminRouter = express.Router() ;

adminRouter.get("/profile",getAccessToRoute ,profile)

adminRouter.post("/editProfile",[getAccessToRoute ,imageUpload.single("photo")],editProfile)

adminRouter.put("/changePassword",getAccessToRoute,changePassword)

// adminRouter.post("/:slug/addStoryToReadList",getAccessToRoute ,addStoryToReadList)

// adminRouter.get("/readList",getAccessToRoute ,readListPage)

adminRouter.get("/getAllUsers",getAccessToRoute, getAllUsers)

adminRouter.put("/updateUserByAdmin", getAccessToRoute, checkUserExist, updateUserByAdmin)


module.exports = adminRouter