const { Compaign, validate } = require('../../models/Compaign');
const express = require('express');
const router = express.Router();
const verifyToken = require('../../utils/verifyJwtToken')


router.post('/create', verifyToken, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let compaign = await Compaign.findOne({url: req.body.url})
    console.log("compaign", compaign)
    if (compaign) {
        return res.status(400).json({message: 'That compaign already exisits!'});
    } else {
        newCompaign = new Compaign({
            price: req.body.price,
            url: req.body.url,
            price: req.body.price,
            // postedBy: req.customer.id,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            area: req.body.area,
            numberOfCars: req.body.numberOfCars
        });
        
        await newCompaign.save();
        res.send(newCompaign);

        // jwt.verify(req.token, 'secretkey', (err, authData) => {
        //     if(err) {
        //       res.sendStatus(403);
        //     } else {
        //       res.json({
        //         message: 'Post created...',
        //         authData
        //       });
        //     }
        // });

    }
});

module.exports = router;
