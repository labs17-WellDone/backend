const router = require("express").Router();
const bcrypt = require("bcryptjs");

const Auth = require("./auth.model.js");
const { generateToken } = require("../auth/auth.helpers.js");

// * log in account - DONE
router.post("/login", async (req, res) => {
  try {
    let { email_address, password } = req.body;
    const account = await Auth.findByEmail(email_address);
    if (account && bcrypt.compareSync(password, account.password)) {
      const token = generateToken(account);
      res.status(200).json({ token });
    }
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ message: "Invalid Credentials" });
  }
});

module.exports = router;
