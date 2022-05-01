const router = require("./auth.routes");
const Custom = require("../models/Custom.model");
const isLoggedIn = require("../middleware/isLoggedIn");

const fileUploader = require('../config/cloudinary.config');
const User = require("../models/User.model");


router.get("/customorder", isLoggedIn, (req, res, next) => {
  res.json("hitting custom order menu");
});

router.post("/new", isLoggedIn, (req, res) => {
  console.log("REQ BODY", req.body);
  Custom.create({
    user: req.user._id,
    phone: req.body.phone,
    pickUpTime: req.body.pickUpTime,
    productNeededBy: req.body.productNeededBy,
    typeOfProduct: req.body.typeOfProduct,
    quantityNeeded: req.body.quantityNeeded,
    description: req.body.description,
    foodAllergies: req.body.foodAllergies,
    image: req.body.image,
  })
    .then((createdCustomOrder) => {
      User.findByIdAndUpdate(
        req.user._id, 
        {$push:{orders: createdCustomOrder._id}}
        )
        .then(() => {
        })
        .catch((err) => {
          res.json(err.message);
        });
      res.json(createdCustomOrder);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

router.get("/view-order", isLoggedIn, (req, res) => {
  Custom.find({user: req.user._id})
    .then((foundCustomOrder) => {
      res.json(foundCustomOrder);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

router.put("/edit/:id", isLoggedIn, (req, res) => {
  console.log({ custom: "custom routes" });
  Custom.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedCustomOrder) => {
      res.json(updatedCustomOrder);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

router.delete("/cancel/:id", isLoggedIn, (req, res) => {
  Custom.findByIdAndDelete(req.params.id)
    .then((updatedCustomOrder) => {
      res.json(updatedCustomOrder);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

router.post("/upload-image", fileUploader.single("imageUrl"),(req, res)=> {
  console.log("FILE", req.file);
  res.json(req.file);
});

module.exports = router;
