const router = require("./auth.routes");
const Custom = require("../models/Custom.model");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/customorder", isLoggedIn, (req, res, next) => {
  res.json("hitting custom order menu");
});

router.post("/new", isLoggedIn, (req, res) => {
  Custom.create({
    user: req.user._id,
    phone: req.body.phone,
    pickUpTime: req.body.pickUpTime,
    productNeededBy: req.body.productNeededBy,
    typeOfProduct: req.body.typeOfProduct,
    quantityNeeded: req.body.quantityNeeded,
    description: req.body.description,
    foodAllergies: req.body.foodAllergies,
    picUrl: req.body.picUrl,
  })
    .then((createdCustomOrder) => {
      res.json(createdCustomOrder);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

router.put("/edit/:id", isLoggedIn, (req, res) => {
  console.log({ customShyte: "custom routes" });
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

module.exports = router;
