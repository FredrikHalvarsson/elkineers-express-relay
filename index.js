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

app.use("/notion/api", notion);

app.use("/auth", auth);

app.listen(port, () => console.log(`App listening on port ${port}`));
