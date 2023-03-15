const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json())
app.use('/users', require('./routes/users'));
app.use('/dates', require('./routes/dates'));

const { dbConnection } = require("./config/config")
dbConnection()
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));