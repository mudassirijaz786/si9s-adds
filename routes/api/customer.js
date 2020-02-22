const { Customer, validate } = require('../../models/Customer');
const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../utils/verifyJwtToken')
const router = express.Router();

router.get('/test', (req, res) => res.json('Hello from customer API'))

router.post('/register', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let customer = await Customer.findOne({ phone: req.body.phone });
    if (customer) {
        return res.status(404).json({message: "That customer already exisits!"});
    } else {
        newCustomer = new Customer({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone
        });
        await newCustomer.save();
        res.json(newCustomer);
    }
});

router.post('/posts', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

router.post("/login", async (req, res) =>{

    // let customer = await Customer.findOne({phone:req.body.phone}).select({firstname:1,lastname:1,_id:0})
    let customer = await Customer.findOne({phone:req.body.phone})
    // console.log("Customer", customer)
    if(!customer) {
        return res.status(404).json({message: "That customer not exisits!"})
    }else{
      jwt.sign({customer}, 'secretkey', { expiresIn: '2h' }, (err, token) => {
        res.json({
          token
        });
      });
    }
    // res.send(customer)

})

router.get("/all", async (req, res)=>{
   Customer.find({}, (err, customer) =>{
       if(err){
           res.status(400).json(err)
       }
       res.json(customer)
   })
})

router.get("/:id", async (req, res)=>{
    const _id = req.params.id;
    Customer.findOne({ _id }, (err, customer) => {
        if (err) {
          res.status(400).json(err);
        }
        if (!customer) {
          res.status(404).json({ message: `Customer with ${driver._id} not found.` });
        }
        res.json(customer);
      });
})

router.put('/:id', async (req, res) => {
    const _id = req.params.id;

    Customer.findOneAndUpdate({ _id },
      req.body,
      { new: true },
      (err, customer) => {
      if (err) {
        res.status(400).json(err);
      }
      res.json(customer);
    });
}) 

router.delete("/trash/:id", async (req, res) =>{

    const _id = req.params.id;
    Customer.findOneAndRemove({ _id }, (err, customer) => {
        if (err) {
          res.status(400).json(err);
        }
        if (!customer) {
          res.status(404).json({ message: 'customer not found.' });
        }
        res.json({ message: `customer ${customer._id} deleted.` });
      });

})
    
module.exports = router;


