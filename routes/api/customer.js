const { Customer, validate } = require('../../models/Customer');
const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/test', (req, res) => res.send('Hello from customer API'))

router.post('/register', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let customer = await Customer.findOne({ phone: req.body.phone });
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


router.post("/login", async (req, res) =>{
    // const { error } = validate(req.body);
    // if (error) {
    //     return res.status(400).send(error.details[0].message);
    // }
    // const phone = req.body.phone
   // let customer = await Customer.findOne({phone: req.body.phone})
   let cust= await Customer.findOne({phone:req.body.phone}).select({firstname:1,lastname:1,_id:0})

    if(!cust) {
        res.status(404).send('err')
    }else{
        res.send(cust)
        // const payload = {id: customer.id, phone: customer.phone }
        // jwt.sign(
        //     payload,
        //     "si9ssecret",
        //     { expiresIn: 3600 },
        //     (err, token) => {
        //         res.json({
        //           success: true,
        //           token: 'Bearer ' + token
        //         });
        //     }
        // ) 
    }
})

module.exports = router;


