const express = require("express");

const User = require("../models/User");
const auth = require("../middleware/auth");

const router = express.Router();


/* =========================
   UPGRADE TO PRO
========================= */

router.post("/upgrade", auth, async (req,res)=>{

try{

const user = await User.findById(req.user.id);

user.plan = "pro";   // 🔥 UPGRADE

await user.save();

res.send("User upgraded to Pro");

}
catch(err){
res.status(500).send(err.message);
}

});


module.exports = router;