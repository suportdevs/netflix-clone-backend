const express = require('express');
const dotEnv = require('dotenv');

// external imports
const dbConnection = require('./db/connection');
const authRouter = require('./routes/auth');
const userRouter = require("./routes/user");

const app = express();
dotEnv.config();
app.use(express.json());
// database connection
dbConnection();

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/', (req, res) => {
    res.send('working');
});

app.listen(process.env.PORT || 5000, (req, res) => {
    console.log(`Server is running on port ` + process.env.PORT);
});