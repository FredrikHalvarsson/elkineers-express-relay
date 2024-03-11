const express = require("express");
const router = express.Router();
const axios = require('axios');

//GET TIMEREPORTS
router.post('/timereports', async (req, res)=>{
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
//GET PROJECTS
router.post('/projects', async (req, res)=>{
    try 
    {
     const response = await axios.post(`${process.env.NOTION_API_BASE_URL}/databases/${process.env.DATABASE_ID_PROJECTS}/query`, req.body,{
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
//GET PEOPLE
router.post('/people', async (req, res)=>{
    try 
    {
     const response = await axios.post(`${process.env.NOTION_API_BASE_URL}/databases/${process.env.DATABASE_ID_PEOPLE}/query`, req.body,{
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

module.exports = router