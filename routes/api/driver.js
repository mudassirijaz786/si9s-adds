const { Driver, validate } = require('../../models/Driver');
const express = require('express');
const router = express.Router();

router.get("/drivers", (req, res, next) =>({
  // res.send({type: "GET"})
}))

router.post("/drivers", async (req, res) =>{

  const { error } = validate(req.body);
  
  if (error) {
      return res.status(400).send(error.details[0].message);
  }

  let driver = await Driver.findOne({ email: req.body.email });

  if (driver) {
      return res.status(400).send('Driver already exisits!');
  } else {
      newDriver = new Driver({
          fullname: req.body.fullname,
          email: req.body.email,
      });
      await newDriver.save();
      res.send(newDriver);
  }

})

router.put("/drivers/:id", (req, res, next) =>({
  // res.send({type: "PUT"})
}))

router.delete("/drivers/:id", (req, res, next) =>({
  // res.send({type: "DELETE"})
}))

module.exports = router;
