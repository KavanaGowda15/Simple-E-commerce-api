const Cart = require("../models/Cart");
const Order = require("../models/Order");

exports.placeOrder = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id });

  if (!cart || cart.items.length === 0) {
    return res.status(400).send("Cart is empty");
  }

  const total = cart.items.reduce((sum, item) => sum + item.quantity * 100, 0); // You can fetch actual product price if needed

  const order = await Order.create({
    userId: req.user._id,
    items: cart.items,
    total,
  });

  cart.items = [];
  await cart.save();

  res.status(201).json(order);
};

exports.getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user._id }).populate(
    "items.productId"
  );
  res.json(orders);
};
