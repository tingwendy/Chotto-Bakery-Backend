var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log({ this: "this" });
  res.json({ title: "hello!" });
});

router.put("edit/:id", (req, res, next) => {
  res.json("wrong put");
});
module.exports = router;
