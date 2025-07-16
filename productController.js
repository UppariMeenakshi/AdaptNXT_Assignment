const getProducts = async (req, res) => {
  try {
    // Your product listing logic here
    res.json([{ name: 'Whey Protein' }, { name: 'Creatine' }]); // Sample response
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// This part is critical:
module.exports = {
  getProducts
};