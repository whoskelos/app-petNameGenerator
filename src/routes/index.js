import { Router } from "express";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const router = Router();

router.get("/", (req, res) =>
    res.render("index", { title: "Pet Name Generator" })
);

router.get("/generate", (req, res) => res.render("generate"));

const openai = new OpenAIApi(configuration);

router.post("/message", (req, res) => {
    const completation = openai.createCompletion({
        model: "text-davinci-003",
        prompt: req.body.description,
        temperature: 0,
        max_tokens: 1024,
    });

    completation.then((data) => {
        console.log(data.data.choices[0].text);
        res.send({ message: data.data.choices[0].text });
    });
});

export default router;
