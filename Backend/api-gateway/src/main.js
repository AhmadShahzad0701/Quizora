// @ts-nocheck

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());
app.post("/api/evaluate", async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:8002/evaluate/",
      req.body,
      { timeout: 60000 }
    );
    
    // Transform response to match frontend expectations
    const transformedResponse = {
      results: response.data.results.map(result => ({
        student_id: result.student_id,
        question_id: result.question_id,
        score: result.obtained_marks, // Transform obtained_marks to score
        breakdown: result.breakdown,
        feedback: result.feedback,
        confidence: result.confidence
      }))
    };
    
    res.json(transformedResponse);
  } catch (error) {
    res.status(500).json({
      error: "Evaluation service error",
      detail: error?.response?.data || error.message,
    });
  }
});

app.post("/api/quiz/generate", async (req, res) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/quiz/generate",
      req.body,
      { headers: { "Content-Type": "application/json" } }
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({
        error: "Gateway error",
        message: error.message,
      });
    }
  }
});

app.listen(4000, () => {
  console.log("API Gateway running on http://localhost:4000");
});
