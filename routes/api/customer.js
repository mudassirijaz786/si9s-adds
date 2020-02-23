const { Customer, validate } = require('../../models/Customer');
const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../utils/verifyJwtToken')
const router = express.Router();

router.get('/current', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'current customer',
        customer: authData
      });
    }
  });
}); 

router.post('/register', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let customer = await Customer.findOne({ phone: req.body.phone });
    if (customer) {
        return res.status(400).json({message: "That customer already exisits!"});
    } else {
        await Customer.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone
        },
        function (err, customer) {
          if (err){
            return res.status(500).json({message: "There was a problem registering the customer."})
          } 
          const token = jwt.sign({ id: customer._id }, "secretkey", {
            expiresIn: '2h' 
          });
          return res.status(200).json({ auth: true, token: token, customer: customer });
        });
    }
});

router.post('/authenticated', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'authenticated',
        driver: authData
      });
    }
  });
});

router.post("/login", async (req, res) =>{

    let customer = await Customer.findOne({phone:req.body.phone})
    if(!customer) {
        return res.status(404).json({message: "That customer not exisits!"})
    }else{
        const token = jwt.sign({ id: customer._id }, "secretkey", {
          expiresIn: '2h' 
        });
        return res.status(200).json({ auth: true, token: token, customer: customer });
    }

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
        res.status(404).json({ message: `Customer with ID ${_id} not found.` });
      }
      res.json(customer);
    });
})

router.put('/:id', verifyToken, async (req, res) => {
  const _id = req.params.id;
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      Customer.findOneAndUpdate({ _id },
        req.body,
        { new: true },
        (err) => {
        if (err) {
          res.status(404).json({ message: 'customer with given id not found.' });
        }
        res.json({
          message: 'customer updated',
          driver: authData
        });      
      });
    }
  });
}) 

router.delete("/trash/:id", verifyToken, async (req, res) =>{
  const _id = req.params.id;
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      Customer.findOneAndRemove({ _id }, (err, customer) => {
        if (err) {
          res.status(400).json(err);
        }
        if (!customer) {
          res.status(404).json({ message: 'customer with given id not found.' });
        }
        res.json({
          message: `customer with ID ${ _id } deleted`,
          driver: authData
        });
      });
    }
  });
 
  

})

module.exports = router;


