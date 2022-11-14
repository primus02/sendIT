require("dotenv").config();
const express = require("express");

const app = express();
const path= require("path");
const cors= require("cors");

const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;


const customerRoute = require("./routes/signup");

const signinRoute = require("./routes/signin");

const adminRoute = require("./routes/admin");

const adminSigninRoute = require("./routes/adminSignin");

const orderRoute = require("./routes/orders"); 

const allordersRoute = require("./routes/allorders");

const mongoose = require("mongoose");

// mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, ()=>
//  console.log("DB connected")
// );
mongoose.connect(process.env.DB_CONNECTION).catch(err=> console.log(err));


mongoose.Promise = global.Promise;


//solving cors issue
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*")
    // res.header("Access-Control-Allow-Credentials: true") 
    res.header("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    // res.header("Access-Control-Max-Age", "1000")
    if (req.method == "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
        return res.status(200).json({})
    }
    next()
})

app.use(cors());

app.use(bodyParser.json());

app.use("/signup", customerRoute);

app.use("/admin/signup", adminRoute);

app.use("/signin", signinRoute);

app.use("/admin/signin", adminSigninRoute);

app.use("/", orderRoute);

app.use("/", allordersRoute);

if(process.env.NODE_ENV === "production"){
    app.use(express.static("sendit-react-frontend/build"));
    app.get("*", (req, res, next)=> {
        res.sendFile(path.resolve(__dirname, "sendit-react-frontend", "build", "index.html"));
    })
}


app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
});
