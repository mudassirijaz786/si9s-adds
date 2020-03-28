const { Payment, validate } = require("../../models/Payment");
const express = require("express");
const router = express.Router();

const stripe = require("stripe")("sk_test_tgB9gfnzWwXvw9AGQ5Wwg7Jr00ZQordDJ9");

router.post("/pay", (req, res) => {
  return stripe.charges
    .create({
      amount: req.body.amount, // Unit: cents
      currency: "eur",
      description: "Test payment"
    })
    .then(result => res.status(200).json(result));
});

module.exports = router;
