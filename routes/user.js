const router = require('express').Router();

// external imports
const authenticated = require('../utilies/authenticated');

router.put('/id', authenticated, (req, res) => {

})

module.exports = router;