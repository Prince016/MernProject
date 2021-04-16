require('dotenv').config();
const express = require("express")
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");
const Register = require("./models/registers");
const bcrypt = require("bcryptjs");

const port = process.env.PORT || 3000;


const static_Path = path.join(__dirname, "../public")
const templates_Path = path.join(__dirname, "../templates/views")
const partials_Path = path.join(__dirname, "../templates/partials")


app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use(express.static(static_Path))

//  this is for the code use present in the views folder 
app.set("view engine", "hbs")

//  views folder postion is change so we have to tell where it is store with which name
app.set("views", templates_Path)

//  for tell that we are using hbs partials files 
hbs.registerPartials(partials_Path)


console.log(process.env.SECRET_KEY);


app.get("/", (req, res) => {
    // res.send(" hello from the Rocky!! ")
    //-------- render(file name (which file u want to render ))
    res.render("index")
})

app.get("/register", (req, res) => {

    res.render("register")
})

app.get("/login", (req, res) => {

    res.render("login")
})



app.post("/register", async (req, res) => {

    try {

        const registerEmployee = new Register({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
        })

        //  Password hashing 

        // generating the token 
        console.log("succes part" + registerEmployee);
        const token = await registerEmployee.generateAuthToken();
        console.log("the token part " + token);

        const registered = await registerEmployee.save();
        console.log("the page part " + registered);

        res.status(201).render("index")

    } catch (e) {
        res.status(400).send(e);
    }

})





app.post("/login", async (req, res) => {

    try {


        const email = req.body.email;
        const password = req.body.password;

        //   email(database);(user add in the site )
        const usermail = await Register.findOne({ email: email })

        const isMatch = await bcrypt.compare(password, usermail.password)

        const token = await usermail.generateAuthToken();
        console.log("the token part " + token);

        if (isMatch) {
            res.status(201).render("home");
        } else {
            res.send("password are not matching ")
        }

    } catch (e) {
        res.status(400).send(e);
    }

})

// password is kop of rock















app.listen(port, () => {
    console.log(` server is running at port no ${port} `);
})



