const express = require("express");
const router = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const SALT_ROUNDS = 10;

// require the user model !!!!
const User = require("../models/User.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const Custom = require("../models/Custom.model");

router.post("/signup", (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    res.json({ message: "Provide username and password" });
    return;
  }

  // make sure passwords are strong:
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.json({
      errorMessage:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    });
    return;
  }

  bcrypt
    .genSalt(SALT_ROUNDS)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        // username: username
        username,
        // password => this is the key from the User model
        //     ^
        //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
        password: hashedPassword,
        email,
      });
    })
    .then((userFromDB) => {
      console.log("Newly created user is: ", userFromDB);
      // Send the user's information to the frontend
      // We can use also: res.status(200).json(req.user);
      res.status(200).json(userFromDB);
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.json({ errorMessage: error.message });
      } else if (error.code === 11000) {
        res.json({
          errorMessage:
            "Username and email need to be unique. Either username or email is already used.",
        });
      } else {
        next(error);
      }
    }); // close .catch()
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.post("/logout", (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

router.get("/loggedin", isLoggedIn, (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    Custom.find({user:req.user._id})
    .then((allCustomOrders) => {
      res.status(200).json({user: req.user, customOrders: allCustomOrders});
    })
    .catch((err) => {
      res.json(err.message);
    });
    
  }else{
    res.status(403).json({ message: "Unauthorized" });

  }
});

module.exports = router;
