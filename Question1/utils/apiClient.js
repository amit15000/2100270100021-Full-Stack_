const axios = require("axios");
require("dotenv").config();

const apiClient = axios.create({
  baseURL: process.env.PRODUCTS_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const authenticate = async () => {
  const response = await axios.post(process.env.AUTH_API_URL, {
    companyName: process.env.COMPANY_NAME,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    ownerName: process.env.OWNER_NAME,
    ownerEmail: process.env.OWNER_EMAIL,
    rollNo: process.env.ROLL_NO,
  });
  return response.data["access_token"];
};

module.exports = { apiClient, authenticate };
