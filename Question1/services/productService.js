const { apiClient, authenticate } = require("../utils/apiClient");

let token = "";

const getAuthToken = async () => {
  if (!token) {
    token = await authenticate();
    apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
};

const getProducts = async (
  companyName,
  categoryName,
  top,
  minPrice,
  maxPrice
) => {
  await getAuthToken();
  const response = await apiClient.get(
    `/${companyName}/categories/${categoryName}/products`,
    {
      params: {
        top,
        minPrice,
        maxPrice,
      },
    }
  );
  return response.data;
};

const getProductById = async (companyName, categoryName, productId) => {
  await getAuthToken();
  const response = await apiClient.get(
    `/${companyName}/categories/${categoryName}/products/${productId}`
  );
  return response.data;
};

module.exports = {
  getProducts,
  getProductById,
};
