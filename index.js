require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const axios = require('axios'); //
const app = express();
const port = 3001;

const notion = require("./notion");
const auth = require("./Auth");
app.use(express.json());
app.use(cors());

// const whitelist = ['http://127.0.0.1', 'http://127.0.0.1:5500', 'https://www.notion.so/Elkineers-6f642cd872e74b21a5d479153768b844'];
// const corsOptions = {
//     origin: (origin, callback) => {
//         if(!origin || whitelist.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     optionsSuccessStatus: 200
// }

// app.use(cors(corsOptions));

// const limiter = rateLimit({
//     windowsMs: 100,
//     max: 2
// });
// app.use(limiter);

//test route
app.post('/api/notion', async (req, res)=>{
    try 
    {
     const response = await axios.post(`${process.env.NOTION_API_BASE_URL}/databases/${process.env.DATABASE_ID_TIMEREPORTS}/query`, req.body,{
        headers: {
            'Authorization': `Bearer ${process.env.NOTION_TOKEN}`, 
            'Notion-Version': '2022-06-28' 
        }
     });
    res.json(response.data);    
    } 
    catch (error) 
    { 
        console.log(error);
        res.status(500).json({message: 'Server error'});
    } 
});

app.get("/", (req, res) => res.json({success: "Hello World!" }));

app.use("/notion/api", notion);

app.use("/auth", auth);

app.listen(port, () => console.log(`App listening on port ${port}`));


// lägga till i .env
//NOTION_API_BASE_URL=https://api.notion.com/v1 