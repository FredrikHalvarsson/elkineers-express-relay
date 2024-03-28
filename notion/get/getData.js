const express = require("express");
const router = express.Router();
const axios = require('axios');
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const filter = {
    and: [
        {
            property: 'Date', //Objekt i properties
            date: {
            start: {
                is_on_or_after: '2024-03-13' 
            }
            }
        }
        ]
}

router.get('/:database', async (req, res)=>{
    try 
        {
        const database = req.params.database; // Extract database parameter from URL
        let notionDatabaseId;
        switch (database) {
            case 'timereports':
                notionDatabaseId = process.env.DATABASE_ID_TIMEREPORTS;
                break;
            case 'people':
                notionDatabaseId = process.env.DATABASE_ID_PEOPLE;
                break;
            case 'projects':
                notionDatabaseId = process.env.DATABASE_ID_PROJECTS;
                break;
            default:
                notionDatabaseId = process.env.DATABASE_ID_PEOPLE;
                break;
        }
        const response = await notion.databases.query({
            database_id: notionDatabaseId
        });
        console.log('success')
        res.send(response)
        } catch (error) 
        { 
            console.log(error);
            res.status(500).json({message: 'Server error'});
        }
});

module.exports = router

//*********************** -Legacy Code- **************************** */
// //GET TIMEREPORTS
// router.get('/timereports', async (req, res)=>{
//     try 
//     {
//     const response = await notion.databases.query({
//         database_id: process.env.DATABASE_ID_TIMEREPORTS
//     });
//     console.log('success')
//     res.send(response)
//     } catch (error) 
//     { 
//         console.log(error);
//         res.status(500).json({message: 'Server error'});
//     } 
// });
// //GET PROJECTS
// router.get('/projects', async (req, res)=>{
//     try 
//     {
//     const response = await notion.databases.query({
//         database_id: process.env.DATABASE_ID_PROJECTS
//     });
//     console.log('success')
//     res.send(response)
//     } catch (error) 
//     { 
//         console.log(error);
//         res.status(500).json({message: 'Server error'});
//     } 
// });
// //GET PEOPLE
// router.get('/people', async (req, res)=>{
//     try 
//     {
//     const response = await notion.databases.query({
//         database_id: process.env.DATABASE_ID_PEOPLE
//     });
//     console.log('success')
//     res.send(response)
//     } catch (error) 
//     { 
//         console.log(error);
//         res.status(500).json({message: 'Server error'});
//     } 
// });
////////////////////////////
//GET TIMEREPORTS
// router.post('/timereports', async (req, res)=>{
//     try 
//     {
//      const response = await axios.post(`${process.env.NOTION_API_BASE_URL}/databases/${process.env.DATABASE_ID_TIMEREPORTS}/query`, req.body,{
//         headers: {
//             'Authorization': `Bearer ${process.env.NOTION_TOKEN}`, 
//             'Notion-Version': '2022-06-28' 
//         }
//      });
//     res.json(response.data);    
//     } 
//     catch (error) 
//     { 
//         console.log(error);
//         res.status(500).json({message: 'Server error'});
//     } 
// });
// //GET PROJECTS
// router.post('/projects', async (req, res)=>{
//     try 
//     {
//      const response = await axios.post(`${process.env.NOTION_API_BASE_URL}/databases/${process.env.DATABASE_ID_PROJECTS}/query`, req.body,{
//         headers: {
//             'Authorization': `Bearer ${process.env.NOTION_TOKEN}`, 
//             'Notion-Version': '2022-06-28' 
//         }
//      });
//     res.json(response.data);    
//     } 
//     catch (error) 
//     { 
//         console.log(error);
//         res.status(500).json({message: 'Server error'});
//     } 
// });
// //GET PEOPLE
// router.post('/people', async (req, res)=>{
//     try 
//     {
//      const response = await axios.post(`${process.env.NOTION_API_BASE_URL}/databases/${process.env.DATABASE_ID_PEOPLE}/query`, req.body,{
//         headers: {
//             'Authorization': `Bearer ${process.env.NOTION_TOKEN}`, 
//             'Notion-Version': '2022-06-28' 
//         }
//      });
//     res.json(response.data);    
//     } 
//     catch (error) 
//     { 
//         console.log(error);
//         res.status(500).json({message: 'Server error'});
//     } 
// });
// module.exports = router