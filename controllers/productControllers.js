const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(product);
};

exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.send("Product deleted");
};

exports.getAllProducts = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;

  const query = {
    name: { $regex: search, $options: "i" },
  };

  const products = await Product.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const count = await Product.countDocuments(query);

  res.json({ total: count, products });
};
