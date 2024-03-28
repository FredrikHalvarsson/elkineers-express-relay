require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require('axios'); //
const app = express();
const port = 3001;

const notion = require("./notion");
const auth = require("./Auth");
app.use(express.json());
app.use(cors());

app.use("/notion/api", notion);

app.use("/auth", auth);

app.listen(port, () => console.log(`App listening on port ${port}`));
//Hosting on cyclic https://easy-teal-adder-ring.cyclic.app