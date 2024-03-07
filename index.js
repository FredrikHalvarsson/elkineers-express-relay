require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const app = express();
const port = 3001;

const notion = require("./notion");
const auth = require("./Auth");
app.use(express.json());

const whitelist = ['http://127.0.0.1', 'http://127.0.0.1:5500', 'https://www.notion.so/Elkineers-6f642cd872e74b21a5d479153768b844'];
const corsOptions = {
    origin: (origin, callback) => {
        if(!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

const limiter = rateLimit({
    windowsMs: 100,
    max: 1
});
app.use(limiter);

//test route
app.get("/", (req, res) => res.json({success: "Hello World!" }));

app.use("/notion/api", notion);
app.use("/auth", auth);

app.listen(port, () => console.log(`App listening on port ${port}`));