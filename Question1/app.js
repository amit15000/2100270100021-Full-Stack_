const express = require("express");
const productService = require("./services/productService");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/categories/:categoryName/products", async (req, res) => {
  const { categoryName } = req.params;
  const {
    company,
    top = 10,
    minPrice,
    maxPrice,
    page,
    sort,
    order,
  } = req.query;

  try {
    const products = await productService.getProducts(
      company,
      categoryName,
      top,
      minPrice,
      maxPrice,
      page,
      sort,
      order
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
});

app.get(
  "/api/categories/:categoryName/products/:productId",
  async (req, res) => {
    const { categoryName, productId } = req.params;
    const { company } = req.query;

    try {
      const product = await productService.getProductDetails(
        company,
        categoryName,
        productId
      );
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Error fetching product details" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
