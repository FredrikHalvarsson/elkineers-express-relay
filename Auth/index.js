import 'dotenv/config'
import axios from 'axios'
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'

const express = require("express");
const router = express.Router();

const config = {
    postUrl: 'https://jsonplaceholder.typicode.com/posts',
    clerkSecretKey: process.env.CLERK_SECRET_KEY, // Clerk automatically picks this from the env
}

router.get('/user/posts', ClerkExpressRequireAuth(), async (req, res) => {
console.log('REQUEST AUTH: ', req.auth)
    try {
      const { data } = await axios.get(config.postUrl)
      res.json({ posts: data?.slice(0, 5) })
    } catch (err) {
      console.error('Error: ', err)
    }
})  