const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const urlRoutes = require("./routes/urlRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const Url = require("./models/Url");

const app = express();

/* -----------------------
   MIDDLEWARE
----------------------- */

app.use(cors());
app.use(express.json());

/* -----------------------
   MongoDB Connection
----------------------- */

mongoose.connect("mongodb://127.0.0.1:27017/urlShortener")
.then(()=>{
console.log("MongoDB Connected ✅");
})
.catch(err=>{
console.log("Mongo Error ❌:", err);
});


/* -----------------------
   API Routes
----------------------- */

app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);
app.use("/api/payment", paymentRoutes);


/* -----------------------
   Redirect Short URL
----------------------- */

app.get("/4diti/:code", async (req,res)=>{

try{

const code = req.params.code.trim();

console.log("Searching for:", code);

const url = await Url.findOne({ shortUrl: code });

console.log("Found:", url);

if(url){
return res.redirect(url.originalUrl);
}

res.status(404).send("Link not found ❌");

}
catch(err){
res.status(500).send(err.message);
}

});


/* -----------------------
   Test Route 
----------------------- */

app.get("/", (req,res)=>{
res.send("URL Shortener Backend Running 🚀");
});


/* -----------------------
   Start Server
----------------------- */

app.listen(5000, ()=>{
console.log("Server running on http://localhost:5000 🚀");
});