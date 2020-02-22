const { Driver, validate } = require('../../models/Driver');
const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../../utils/verifyJwtToken')
const router = express.Router();
const passport = require('passport')
router.get('/test', (req, res) => res.json('Hello from driver API'))

router.post('/register', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let driver = await Driver.findOne({ phone: req.body.phone });
    if (driver) {
        return res.status(400).json({message: "That driver already exisits!"});
    } else {
        newDriver = new Driver({
            fullname: req.body.fullname,
            email: req.body.email,
            phone: req.body.phone
        });
        await newDriver.save();
        res.json(newDriver);
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

    // let driver = await Driver.findOne({phone:req.body.phone}).select({fullname: 1, email: 1, _id: 0})
    let driver = await Driver.findOne({phone:req.body.phone})
    // console.log("Driver", driver)
    if(!driver) {
        return res.status(404).json({message: "That driver not exisits!"})
    }else{
      jwt.sign({driver}, 'secretkey', { expiresIn: '2h' }, (err, token) => {
        res.json({
          token
        });
      });
    }
    // res.send(driver)
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
        res.status(404).json({ message: `Driver with ${driver._id} not found.` });
      }
      res.json(driver);
    });
})

router.put('/:id', async (req, res) => {
  const _id = req.params.id;

  Driver.findOneAndUpdate({ _id },
    req.body,
    { new: true },
    (err, driver) => {
    if (err) {
      res.status(400).json(err);
    }
    res.json(driver);
  });
}) 

router.delete("/trash/:id", async (req, res) =>{

  const _id = req.params.id;
  Driver.findOneAndRemove({ _id }, (err, driver) => {
      if (err) {
        res.status(400).json(err);
      }
      if (!driver) {
        res.status(404).json({ message: 'driver not found.' });
      }
      res.json({ message: `driver ${driver._id} deleted.` });
    });

})

// Problem in below end point

// router.get('/iam', passport.authenticate('jwt', { session: false }), (req, res) => {
//     res.send("HI")
//   }
// );

module.exports = router;


