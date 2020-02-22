
const { TestingAPI, validate } = require('../../models/TestingAPI');
const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.send('Hello World!'))
 
router.post('/register', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    let testingAPI = await TestingAPI.findOne({ email: req.body.email });
    if (testingAPI) {
        return res.status(400).send('That user already exisits!');
    } else {
        testingAPI = new TestingAPI({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });
        await testingAPI.save();
        res.send(testingAPI);
    }
});
 
module.exports = router;