require("dotenv").config();
const express = require('express');
require("./model/db");
const app = express();
const router = require("./router/router");
const cors = require("cors");
const port = process.env.PORT || 3000;

// Middleware for JSON request bodies
app.use(cors());
app.use(express.json());
app.use(router);



app.get("/", (req, res) => {
    res.json("server start")
})
// Start the server
app.listen(port, () => {
    console.log('Server listening on port 3000');
});