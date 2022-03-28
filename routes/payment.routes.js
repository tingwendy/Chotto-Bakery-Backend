const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const isLoggedIn = require("../../middleware/isLoggedIn");
const isLoggedOut = require("../../middleware/isLoggedOut");
const { token } = require('morgan');


router.post("/paying", isLoggedIn, (req, res)=> {
    return stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd",
        },
        (stripeErr, stripeRes) => {
            if(stripeErr) {
                res.status(500).json(stripeErr);
            } else {
                res.status(200).json(stripeRes);
            }
        }
    );
});

module.exports = router;