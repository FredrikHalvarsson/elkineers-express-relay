const express = require("express");
const router = express.Router();
const axios = require('axios');
const bodyParser = require('body-parser');

router.use(bodyParser.json());

//POST TIMEREPORTS
router.post('/timereports', async (req, res)=>{
    try {
        const notionDatabaseId = process.env.DATABASE_ID_TIMEREPORTS;
        const { name, email } = req.body;

        const data = {
            parent: { database_id: notionDatabaseId },
            properties: {
                Name: { title: [{ text: { content: name } }] },
                Email: { email: email }
                // Ändra data till det som ska postas
            }
        };

       const result = await axios.post(`${process.env.NOTION_API_BASE_URL}/pages`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NOTION_TOKEN}`, 
                'Notion-Version': '2022-06-28' 
            },
            body: JSON.stringify(data)
        });

        if(result.status !== 200) {
          const error = await result.json();
          console.error('Got error saving data', error);
          return res.status(500).json({ error: error.message });
        }

        res.status(200).json({ message: 'Data saved to Notion!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//POST PROJECTS
router.post('/projects', async (req, res)=>{
    try {
        const notionDatabaseId = process.env.DATABASE_ID_PROJECTS;
        const { name, email } = req.body;

        const data = {
            parent: { database_id: notionDatabaseId },
            properties: {
                Name: { title: [{ text: { content: name } }] },
                Email: { email: email }
                // Ändra data till det som ska postas
            }
        };

       const result = await axios.post(`${process.env.NOTION_API_BASE_URL}/pages`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NOTION_TOKEN}`, 
                'Notion-Version': '2022-06-28' 
            },
            body: JSON.stringify(data)
        });

        if(result.status !== 200) {
          const error = await result.json();
          console.error('Got error saving data', error);
          return res.status(500).json({ error: error.message });
        }

        res.status(200).json({ message: 'Data saved to Notion!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//POST PEOPLE
//POST PEOPLE
router.post('/people', async (req, res) => {
    try {
        
        console.log(req.body)
        const notionDatabaseId = process.env.DATABASE_ID_PEOPLE;
        //const name  = new String (req.body.name);
        //const parsedBody = JSON.parse(req.body.name);
        //const name = parsedBody.name;
        //const { name } = req.body.name;
        const bodyObject = JSON.parse(req.body.body); // Parsing the JSON string in req.body.body

  // Now you can access the `name` property from the parsed object
        const { name } = bodyObject;

  console.log('Name:', name);
        
        console.log(req.body.name)
        console.log(req.body)
        console.log(name)
        

const data = {
    parent: { database_id: notionDatabaseId },
    properties: {
        Name: {
            title: [
                {
                    text: {
                        content: name
                    },
                },
            ],
        },
    }
};

        const result = await axios.post(
            `${process.env.NOTION_API_BASE_URL}/pages`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
                    'Notion-Version': '2022-06-28'
                }
            }
        );

        res.status(200).json({ message: 'Data saved to Notion!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

module.exports = router