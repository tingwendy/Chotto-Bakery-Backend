const router = require("../auth.routes");
const Custom = require("../../models/Custom.model");
const Menu = require("../../models/Menu.model");
const Order = require("../../models/Order.model");

const isLoggedIn = require("../../middleware/isLoggedIn");
const isLoggedOut = require("../../middleware/isLoggedOut");

router.post("/cart", isLoggedIn, async (req, res, next) => {
  let itemPrices = 0;
  let totalPrice = 0;
  const items = await Promise.all(
    req.body.orderItems.map(
      async (item) =>
        await Menu.findById(item.product).then((product) => {
          itemPrices += Number(product.price);
          totalPrice += Number(product.price) * item.quantity;
          return { product, quantity: item.quantity };
        })
    )
  );
  console.log({ body: req.body, items, itemPrices, totalPrice });
  if (req.body.orderItems.length === 0) {
    res.json("Cart is empty");
  } else {
    console.log(req.body);
    Order.create({
      orderItems: req.body.orderItems,
      itemsPrice: itemPrices, // req.body.itemsPrice,
      totalPrice: totalPrice, // req.body.totalPrice,
      user: req.user._id,
    })
      .then((createdOrder) => {
        res.json(createdOrder);
      })
      .catch((err) => {
        res.json(err.message);
      });
  }
});

router.get("/cart", isLoggedIn, (req, res, next) => {
  Order.findOne({ user: req.user._id, isPaid: false })
    .populate("orderItems.product")
    .then((cart) => {
      res.json(cart);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

router.post("/edit-order/:cartId", isLoggedIn, async (req, res) => {
  let itemsPrice = 0;
  let totalPrice = 0;
  const items = await Promise.all(
    req.body.orderItems.map(
      async (item) =>
        await Menu.findById(item.product).then((product) => {
          itemsPrice += Number(product.price);
          totalPrice += Number(product.price) * item.quantity;
          return { product, quantity: item.quantity };
        })
    )
  );
  console.log({ body: { ...req.body, itemsPrice, totalPrice } });
  Order.findByIdAndUpdate(
    req.params.cartId,
    { ...req.body, itemsPrice, totalPrice },
    { new: true }
  )
    .then((updatedCart) => {
      console.log({ updatedCart });
      res.json(updatedCart);
    })
    .catch((err) => {
      console.log({ err });
      res.json(err.message);
    });
});

router.delete("/cancel-order/:id", isLoggedIn, (req, res, next) => {
  console.log(req.body);
  Order.findByIdAndDelete(req.params.id)
    .then((updatedCart) => {
      res.json(updatedCart);
    })
    .catch((err) => {
      res.json(err.message);
    });
});

module.exports = router;
