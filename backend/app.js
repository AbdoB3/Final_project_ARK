const express = require('express');
require('dotenv').config();

const port = process.env.PORT;
const uri = process.env.MONGODB_URI;

const app = express();




app.listen(port, () => {
    console.log(`listening to port ${port}`)
});