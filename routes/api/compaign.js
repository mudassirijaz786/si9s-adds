const { Compaign, validate } = require('../../models/Video');
const express = require('express');
const router = express.Router();

router.post('/create', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    if (customer) {
        return res.status(400).send('That customer already exisits!');
    } else {
        newCustomer = new Customer({
            phone: req.body.phone
        });
        await newCustomer.save();
        res.send(newCustomer);
    }
});