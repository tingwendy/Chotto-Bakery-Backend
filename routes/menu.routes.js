const router = require("./auth.routes");
const Menu = require("../models/Menu.model");

router.get("/", (req, res, next) => {
  res.json("hitting menu");
});

router.post("/create", (req, res) => {
  Menu.create({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  })
    .then((createdMenu) => {
      res.json(createdMenu);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

router.get("/view-all", (req, res) => {
  Menu.find()
    .then((foundMenu) => {
      res.json(foundMenu);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

router.get("/view/:id", (req, res) => {
  Menu.findById(req.params.id)
    .then((foundMenu) => {
      res.json(foundMenu);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

router.put("/update/:id", (req, res) => {
  Menu.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updatedMenu) => {
      res.json(updatedMenu);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

router.delete("/delete/:id", (req, res) => {
  Menu.findByIdAndDelete(req.params.id)
    .then((updatedMenu) => {
      res.json(updatedMenu);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

module.exports = router;
