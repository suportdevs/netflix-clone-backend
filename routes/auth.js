const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    console.log(req.body);
    const {username, email, password} = req.body;
    await bcrypt.hash(password, 10).then(hashedPassword => {
        const newUser = new User({username, email, password: hashedPassword});
        newUser.save().then(user => {
            return res.status(200).json(user);
        }).catch(err => {
            return res.status(500).json(err);
        })
    }).catch(err =>{
        return res.status(500).json(err)
    })
});

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(401).send({message: "User not found!"});
        const match = await bcrypt.compare(req.body.password, user.password);
        if(!match) return res.status(400).send({
            message: "Passwords do not match!"
          });

        const accessToken = jwt.sign({id: user._id, username: user.username, email: user.email, role: user.role}, process.env.JWT_SECRET, {expiresIn: "1d"});
        const {password, ...info} = user._doc;
        return res.status(200).json({info, accessToken, message: "Authentication successfull"});
    }catch(err){
        return res.status(500).send(err);
    }
})

module.exports = router;