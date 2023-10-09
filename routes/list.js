
const router = require('express').Router();
const List = require("../models/List");
const authenticated = require('../utilies/authenticated');


router.post('/', authenticated, async (req, res) => {
    if(req.user.role === 'Admin'){
        const list = new List(req.body);
        try{
            await list.save();
            return res.status(200).json("List created successfull.");
        }catch(err){
            return res.status(401).json(err);
        }
    }else{
        return res.status(403).json("You are not authenticated!");
    }
});

router.delete('/:id', authenticated, async (req, res) => {
    if(req.user.role === 'Admin'){
        try{
            await List.findByIdAndDelete(req.params.id);
            return res.status(200).json("The List has been deleted.");
        }catch(err){
            return res.status(401).json(err);
        }
    }else{
        return res.status(403).json("You are not authenticated!");
    }
});

router.get('/', authenticated, async (req, res) => {
    const typeQuery = req.params.type;
    const genreQuery = req.params.genre;
    let lists = [];
    try{
        if(typeQuery){
            if(genreQuery){
                lists = await List.aggregate([
                    {$sample: {size: 10}},
                    {$match: {type: typeQuery, genre: genreQuery}},
                ]);
            }else{
                lists = await List.aggregate([
                    {$sample: {size: 10}},
                    {$match: {type: typeQuery}},
                ]);
            }
        }else{
            lists = await List.aggregate([{$sample: {size: 10}}]);
        }
        return res.status(200).json(lists);
    }catch(err){
        return res.status(401).json(err);
    }
});

module.exports = router;