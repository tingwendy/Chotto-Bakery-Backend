const router = require("./auth.routes");
const Order = require("../models/Order.model");
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

router.get("/summary", isLoggedIn, (req, res, next)=> {
    res.json("hitting checkout route")
})

router.post("/add", isLoggedIn, (req, res, next)=> {
    Order.create(req.body)
    .then((createdOrderSummery) => {
        res.json(createdOrderSummery);
      })
      .catch((err) => {
        res.json(err.message);
      });
  });


router.post("/payment", (req, res)=> {
    stripe.charges.create(
        {
            source: req.body.tokenId,
            amount: req.body.amount,
            currency: "usd"
        },
        (stripeErr, stripeRes) => {
            if(stripeErr) {
                res.json(stripeErr);
            } else {
                res.json(stripeRes);
            }
        }
    );
});

module.exports = router;