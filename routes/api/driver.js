const { Driver, validate } = require('../../models/Driver');
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
        message: 'current driver',
        driver: authData
      });
    }
  });
}); 

router.post('/register', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let driver = await Driver.findOne({ phone: req.body.phone });
    if (driver) {
        return res.status(400).json({message: "That driver already exisits!"});
    } else {
        await Driver.create({
            fullname: req.body.fullname,
            email: req.body.email,
            phone: req.body.phone
        },
        function (err, driver) {
          if (err){
            return res.status(500).json({message: "There was a problem registering the driver."})
          } 
          const token = jwt.sign({ id: driver._id }, "secretkey", {
            expiresIn: '2h' 
          });
          return res.status(200).json({ auth: true, token: token, driver: driver });
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

    let driver = await Driver.findOne({phone:req.body.phone})
    if(!driver) {
        return res.status(404).json({message: "That driver not exisits!"})
    }else{
        const token = jwt.sign({ id: driver._id }, "secretkey", {
          expiresIn: '2h' 
        });
        return res.status(200).json({ auth: true, token: token, driver: driver });
    }

})

router.get("/all", async (req, res)=>{
  Driver.find({}, (err, driver) =>{
      if(err){
          res.status(400).json(err)
      }
      res.json(driver)
  })
})

router.get("/:id", async (req, res)=>{
  const _id = req.params.id;
  Driver.findOne({ _id }, (err, driver) => {
      if (err) {
        res.status(400).json(err);
      }
      if (!driver) {
        res.status(404).json({ message: `Driver with ID ${_id} not found.` });
      }
      res.json(driver);
    });
})

router.put('/:id', verifyToken, async (req, res) => {
  const _id = req.params.id;
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      Driver.findOneAndUpdate({ _id },
        req.body,
        { new: true },
        (err) => {
        if (err) {
          res.status(404).json({ message: 'driver with given id not found.' });
        }
        res.json({
          message: 'driver updated',
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
      Driver.findOneAndRemove({ _id }, (err, driver) => {
        if (err) {
          res.status(400).json(err);
        }
        if (!driver) {
          res.status(404).json({ message: 'driver with given id not found.' });
        }
        res.json({
          message: `driver with ID ${ _id } deleted`,
          driver: authData
        });
      });
    }
  });
 
  

})

module.exports = router;


