const router = require("./auth.routes");
const Order = require("../models/Order.model");
// const paypal = require("paypal")(process.env.Paypal_Key)

const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

router.get("/summary", isLoggedIn, (req, res, next)=> {
    res.json("hitting checkout route")
})

// router.post("/summary", isLoggedIn, (req, res, next)=> {
//     Order.create({

//     })
// })
module.exports = router;