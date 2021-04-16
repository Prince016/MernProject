const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const validator = require("validator");



// Creating the schema 
const employeeSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,

    },
    lastname: {
        type: String,
        required: true,

    },
    phone: {
        type: String,
        required: true,
        // unique :true    

    },
    email: {
        type: String,
        required: true,
        // unique :true   

    },
    password: {
        type: String,
        required: true,


    },

    gender: {
        type: String,
        required: true,

    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]

})

// generating tokens
employeeSchema.methods.generateAuthToken = async function () {
    try {
        console.log(this._id);
        // id():id(database vali hai )
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY)
         //                             ({ token(database):  token(just upper vala jwt vala )})
        this.tokens = this.tokens.concat({token:token});
       
        // to store in the database 
        await this.save();
        return token;

    } catch (err) {
        res.send(err)
        console.log(err);
    }

}



// generating the password into hash
employeeSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        // const passwordHash = await bcrypt.hash(password, 4);
        console.log(`The current password is ${this.password}`);       // this.password = user enter in site
        this.password = await bcrypt.hash(this.password, 4)  // converting the passsword in to hashing
        console.log(`The current password is ${this.password}`);       // this.password = user enter in site

    }

    next();       // calling the next() so it move futher otherwise it will stuck in this or do in loop or loading


})


//  Creating  a new collections 
const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;