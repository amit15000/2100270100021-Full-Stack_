const axios = require("axios");
const authService = require("./authService");
require("dotenv").config();

const productService = {
  getProducts: async (
    company,
    category,
    top,
    minPrice,
    maxPrice,
    page,
    sort,
    order
  ) => {
    const token = await authService.getAuthToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        top,
        minPrice,
        maxPrice,
        page,
        sort,
        order,
      },
    };

    try {
      const response = await axios.get(
        `${process.env.PRODUCTS_API_URL}/${company}/categories/${category}/products`,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  getProductDetails: async (company, category, productId) => {
    const token = await authService.getAuthToken();
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.get(
        `${process.env.PRODUCTS_API_URL}/${company}/categories/${category}/products/${productId}`,
        config
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching product details:", error);
      throw error;
    }
  },
};

module.exports = productService;
