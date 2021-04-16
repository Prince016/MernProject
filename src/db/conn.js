const mongoose = require("mongoose");


// connection creation and creating the a new db 
mongoose.connect("mongodb://localhost:27017/youtubeRegistration", { 
    useNewUrlParser: true, 
    useUnifiedTopology:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useCreateIndex:true

}).then(() => console.log("connection succesfull .... "))
.catch((err) =>{

    console.log(err);
} )

    