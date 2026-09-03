import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
dotenv.config();
const app = express();
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
app.use(express.json());

app.use(express.static('public'));
app.post('/api/ask', async (req, res) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: req.body.question,
    });
    res.json({ answer: response.text });
  } catch (err) {
    res.status(500).json({ answer: "An error occurred on the server!" });
  }
});
app.listen(3000, () => {
  console.log("Server is running  at: http://localhost:3000");
});