const express = require("express");
const router = express.Router();
// const fetch = require("node-fetch");
let database;

const { Client } = require("@notionhq/client")
const notion = new Client({
	auth: process.env.NOTION_TOKEN,
})

const fetchNotion = async (searchtext) => {
	switch (searchtext){
		case "projects":
			database = process.env.DATABASE_ID_PROJECTS;
			break;
		case "people":
			database = process.env.DATABASE_ID_PEOPLE;
			break;
		case "timereports":
			database = process.env.DATABASE_ID_TIMEREPORTS;
			break;
	}
    try{
        const response = await notion.databases.query({
			database_id: database
	});
        const data = response.results;
        return data;
    } catch (err) {
        return {Error: err.stack };
    }
}

//test route
router.get("/", (req, res) => res.json({success: "Hello Notion!" }));

router.get("/:searchtext", async  (req, res) => {
    const searchtext = req.params.searchtext;
    const data = await fetchNotion(searchtext);
    res.json({ message: data});
});

router.post("/", async (req, res) => {
    const searchtext = req.body.searchtext;
    const data = await fetchNotion(searchtext);
    res.json({ message: data});
});
// const getUsers = async () => {
// 	const listUsersResponse = await notion.users.list({})
// }
// use.getUsers()

module.exports = router;