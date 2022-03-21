var express = require("express");
var router = express.Router();
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

router.get("/", isLoggedIn, function (req, res, next) {
   
   User.findById(req.user._id)
    .populate("orders")
    .then((userData)=> {
      res.json({success: true, user: userData});
    });
});



module.exports = router;
