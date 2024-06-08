const axios = require("axios");
require("dotenv").config();

const authService = {
  getAuthToken: async () => {
    try {
      const response = await axios.post(process.env.AUTH_API_URL, {
        companyName: process.env.COMPANY_NAME,
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        ownerName: process.env.OWNER_NAME,
        ownerEmail: process.env.OWNER_EMAIL,
        rollNo: process.env.ROLL_NO,
      });

      return response.data.token;
    } catch (error) {
      console.error("Error getting auth token:", error);
      throw error;
    }
  },
};

module.exports = authService;
