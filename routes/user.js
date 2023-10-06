const router = require('express').Router();
const bcrypt = require('bcrypt');

// external imports
const authenticated = require('../utilies/authenticated');
const User = require("../models/User");

router.put('/:id', authenticated, async (req, res) => {
    if(req.params.id === req.user.id || req.user.role === 'Admin'){
        if(req.body.password){
            await bcrypt.hash(req.body.password, 10).then(hashedPassword => {
                req.body.password = hashedPassword;
            }).catch(err =>{
                return res.status(404).json(err);
            });
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, {new: true});
            return res.status(200).json(user);
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You are not authorize for this action!");
    }
})

router.get('/find/:id', async (req, res) => {
    try{
        const user = await User.findOne({_id: req.params.id});
        const {password, ...info} =user._doc;
        return res.status(200).json(info);
    }catch(err){
        return res.status(500).json(err);
    }
})

router.get('/', authenticated, async (req, res) => {
    if(req.user.role === 'Admin'){
        try{
            const users = req.query.new ? await User.find().sort({_id: -1}).limit(10) : await User.find();
            return res.status(200).json(users);
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(500).json("You can't see all users!")
    }
})

router.delete('/:id', authenticated, async (req, res) => {
    if(req.params.id === req.user.id || req.user.role === "Admin"){
        try{
            await User.findByIdAndDelete({_id: req.params.id})
            return res.status(200).json("User has been deleted.");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(500).json("You are not able to perform this action!");
    }
})

router.get('/stats', authenticated, async (req, res) => {
    try{
        const data = await User.aggregate([
            {$project: {
                month: {$year: "$createdAt"},
            }},
            {
                $group: {
                    _id: "$month",
                    total: {$sum: 1},
                }
            }
        ]);
        return res.status(200).json(data);
    }catch(err){
        return res.status(500).json(err);
    }
})

module.exports = router;