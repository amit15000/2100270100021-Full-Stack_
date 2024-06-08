const { v4: uuidv4 } = require("uuid");
const productService = require("../services/productService");

const getProducts = async (req, res) => {
  const { companyName, categoryName } = req.params;
  const { top = 10, minPrice = 0, maxPrice = Infinity, page = 1 } = req.query;

  try {
    const products = await productService.getProducts(
      companyName,
      categoryName,
      top,
      minPrice,
      maxPrice
    );
    const paginatedProducts = paginate(products, top, page);
    const productsWithId = paginatedProducts.map((product) => ({
      ...product,
      id: uuidv4(),
    }));
    res.json(productsWithId);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProductById = async (req, res) => {
  const { companyName, categoryName, productId } = req.params;

  try {
    const product = await productService.getProductById(
      companyName,
      categoryName,
      productId
    );
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const paginate = (items, top, page) => {
  const offset = (page - 1) * top;
  return items.slice(offset, offset + top);
};

module.exports = {
  getProducts,
  getProductById,
};
