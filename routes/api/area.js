const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const verifyToken = require('../../utils/verifyJwtToken')
const { Area, validate } = require('../../models/Area');

router.get('/test', (req, res) => res.json('Hello from area API'))

router.post('/add', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let area = await Area.findOne({ name: req.body.name });
    if (area) {
        return res.status(404).json({message: "That area already exisits!"});
    } else {
        newArea = new Area({
            name: req.body.name
        });
        await newArea.save();
        res.json(newArea);
    }
});

router.get("/all", async (req, res)=>{
   Area.find({}, (err, area) =>{
       if(err){
           res.status(400).json(err)
       }
       res.json(area)
   })
})

router.get("/:id", async (req, res)=>{
    const _id = req.params.id;
    Area.findOne({ _id }, (err, area) => {
        if (err) {
          res.status(400).json(err);
        }
        if (!area) {
          res.status(404).json({ message: `area with ${driver._id} not found.` });
        }
        res.json(area);
      });
})

router.put('/:id', async (req, res) => {
    const _id = req.params.id;

    Area.findOneAndUpdate({ _id },
      req.body,
      { new: true },
      (err, area) => {
      if (err) {
        res.status(400).json(err);
      }
      res.json(area);
    });
}) 

router.delete("/trash/:id", async (req, res) =>{

    const _id = req.params.id;
    Area.findOneAndRemove({ _id }, (err, area) => {
        if (err) {
          res.status(400).json(err);
        }
        if (!area) {
          res.status(404).json({ message: 'area not found.' });
        }
        res.json({ message: `area ${area._id} deleted.` });
      });

})
    
module.exports = router;


