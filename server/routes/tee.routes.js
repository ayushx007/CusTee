import express from "express";
import * as dotenv from "dotenv";
import  OpenAI from "openai";//the openAI api has changed a lot since before v4.0.0, now it no longer requires a config object
dotenv.config();
const router = express.Router();
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY,
});
router.route("/").get((req, res) => {
    res.status(200).json({message : "Hello from TEE API routes"});
});
router.route("/").post(async (req, res) => {
    try{
        const {prompt} = req.body;
        const response = await openai.createImage({
            prompt,
            n:1,
            size:1024*1024,
            response_format: b64_json,
        });
        const image = response.data.data[0].b64_json;
        res.status(200).json({image});
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Server Error"});
    }   
});

export default router;