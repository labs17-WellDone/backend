const bcrypt = require("bcryptjs");

const router = require("express").Router();
const Accounts = require("./accounts.model.js");
const { authenticate } = require("../middleware/middleware");
const { generateToken } = require("../auth/auth.helpers");

// * get all accounts - DONE
// ! only for super users
router.get("/", authenticate, async (req, res) => {
  try {
    const accounts = await Accounts.find();
    accounts
      ? res.status(200).json(accounts)
      : res.status(400).json({ error: "No accounts in database" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// * get account by id - DONE
// ! only for logged in users
router.get("/:account_id", authenticate, async (req, res) => {
  try {
    const { account_id } = req.params;
    const account = await Accounts.findById(account_id);
    account
      ? res.status(200).json(account)
      : res.status(400).json({ error: "No account found" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// * create account - DONE
// ! only for super users
router.post("/", async (req, res) => {
  try {
    const account = req.body;
    const hash = bcrypt.hashSync(account.password, 10); // 2 ^ n
    account.password = hash;
    await Accounts.insert(account);
    const token = generateToken(account);
    res.status(200).json(token);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// * update account - DONE
// ! only for super users
router.put("/:account_id", authenticate, async (req, res) => {
  try {
    const { account_id } = req.params;
    const changes = req.body;
    const updatedAccount = await Accounts.update(account_id, changes);
    res.status(200).json(updatedAccount);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

// * delete account - DONE
// ! only for super users
router.delete("/:account_id", authenticate, async (req, res) => {
  try {
    const { account_id } = req.params;
    const removedAccount = await Accounts.remove(account_id);
    res.status(200).json(removedAccount);
  } catch (err) {
    console.log(err.message);
    res.status(400).json(err.message);
  }
});

module.exports = router;
