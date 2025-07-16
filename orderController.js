const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Place order from cart
const placeOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const totalAmount = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      items: cart.items.map(({ product, quantity }) => ({ product, quantity })),
      totalAmount
    });

    // Clear cart after ordering
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: 'Order placement failed', error: err.message });
  }
};

// Get all orders for user
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};

module.exports = { placeOrder, getOrders };