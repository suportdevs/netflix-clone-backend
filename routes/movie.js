const { verify } = require('jsonwebtoken');
const router = require('express').Router();
const Movie = require("../models/Movie");


router.post('/', verify, async (req, res) => {
    if(req.user.role === 'Admin'){
        const movie = new Movie(req.body);
        try{
            await movie.save();
            return res.status(200).json("Movie created successfull.");
        }catch(err){
            return res.status(401).json(err);
        }
    }else{
        return res.status(403).json("You are not authenticated!");
    }
})

router.put('/:id', verify, async (req, res) => {
    if(req.user.role === 'Admin'){
        try{
            const movie = await Movie.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {new: true});
            return res.status(200).json(movie);
        }catch(err){
            return res.status(401).json(err);
        }
    }else{
        return res.status(403).json("You are not authenticated!");
    }
})

router.delete('/:id', verify, async (req, res) => {
    if(req.user.role === 'Admin'){
        try{
            await Movie.findByIdAndDelete(req.params.id);
            return res.status(200).json("Movie has been deleted!");
        }catch(err){
            return res.status(401).json(err);
        }
    }else{
        return res.status(403).json("You are not authenticated!");
    }
})

router.get('/find/:id', verify, async (req, res) => {
        try{
            const movie = await Movie.findById(req.params.id);
            return res.status(200).json(movie);
        }catch(err){
            return res.status(401).json(err);
        }
})

router.get('/random', verify, async (req, res) => {
    const type = req.params.type;
        try{
            const movie = await Movie.aggregate([
                {$match: {type: type}},
                {$sample: {size: 1}}
            ]);
            return res.status(200).json(movie);
        }catch(err){
            return res.status(401).json(err);
        }
})


router.get('/', verify, async (req, res) => {
    if(req.user.role === 'Admin'){
        try{
            const movies = await Movie.find();
            return res.status(200).json(movies);
        }catch(err){
            return res.status(401).json(err);
        }
    }else{
        return res.status(403).json("You are not authenticated!");
    }
})

module.exports = router;