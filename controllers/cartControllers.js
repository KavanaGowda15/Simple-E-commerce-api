const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    cart = new Cart({ userId: req.user._id, items: [] });
  }

  const index = cart.items.findIndex((item) => item.productId == productId);

  if (index > -1) {
    cart.items[index].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  await cart.save();
  res.json(cart);
};

exports.updateCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) return res.status(404).send("Cart not found");

  const index = cart.items.findIndex((item) => item.productId == productId);
  if (index === -1) return res.status(404).send("Product not in cart");

  cart.items[index].quantity = quantity;
  await cart.save();
  res.json(cart);
};

exports.removeFromCart = async (req, res) => {
  const { productId } = req.body;
  let cart = await Cart.findOne({ userId: req.user._id });

  cart.items = cart.items.filter((item) => item.productId != productId);
  await cart.save();
  res.json(cart);
};

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate(
    "items.productId"
  );
  res.json(cart);
};
