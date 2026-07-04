const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

email: {
type: String,
required: true
},

password: {
type: String,
required: true
},

plan: {
type: String,
default: "free"   // 🔥 free by default
}

});

module.exports = mongoose.model("User", userSchema);