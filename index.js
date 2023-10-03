const express = require('express');
const dotEnv = require('dotenv');

// external imports
const dbConnection = require('./db/connection');

const app = express();
dotEnv.config();
dbConnection();

app.listen(process.env.PORT || 5000, (req, res) => {
    console.log(`Server is running on port ` + process.env.PORT);
});