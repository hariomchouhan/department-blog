const bycrpt = require("bcryptjs")

const validateUserInput =(email,password) =>{

    return(
        email && password
    )

}

const validateUserInputForUpdate =( newPassword) =>{

    return(
        newPassword
    )

}

const comparePassword =  (password , hashedPassword) =>{

    return  bycrpt.compareSync(password,hashedPassword)

}

module.exports ={
    validateUserInput,
    validateUserInputForUpdate,
    comparePassword
}