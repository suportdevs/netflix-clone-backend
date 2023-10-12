const express = require('express');
const dotEnv = require('dotenv');
const cors = require('cors');

// external imports
const dbConnection = require('./db/connection');
const authRouter = require('./routes/auth');
const userRouter = require("./routes/user");
const movieRouter = require("./routes/movie");
const listRouter = require("./routes/list");

const app = express();
dotEnv.config();
app.use(express.json());
app.use(cors());
// database connection
dbConnection();

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);
app.use('/api/lists', listRouter);

app.use('/', (req, res) => {
    res.send('working');
});

app.listen(process.env.PORT || 5000, (req, res) => {
    console.log(`Server is running on port ` + process.env.PORT);
});