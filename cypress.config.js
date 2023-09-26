const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    env: {
      "username": "standard_user",
      "password": "secret_sauce",
      "recp_fname": "James",
      "recp_lname": "Bond",
      "recp_postal_code": "90210",
      "item_list": ["Sauce Labs Backpack", "Sauce Labs Bike Light"],
      // "item_data-test_key": []
    },
    testIsolation: false
  },
});
