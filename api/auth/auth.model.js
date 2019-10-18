const db = require("../../data/dbConfig.js");

//* get account by email - DONE
const findByEmail = email_address => {
  try {
    return db("accounts")
      .where({ email_address })
      .first();
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { findByEmail };
