const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const { dbConnection } = require("./config/config")

app.use(express.json())

app.use('/users', require('./routes/users'));

dbConnection()

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));