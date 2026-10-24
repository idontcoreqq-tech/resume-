import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildResumePrompt } from "../prompts/resumePrompt.js";

const router = Router();

function validateProfile(profile) {
  if (!profile || typeof profile !== "object") {
    return "Некорректные данные профиля";
  }
  if (!profile.fullName?.trim()) {
    return "Укажите имя и фамилию";
  }
  if (!profile.position?.trim()) {
    return "Укажите желаемую должность";
  }
  return null;
}

router.post("/generate", async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey?.trim()) {
    return res.status(503).json({
      error: "Сервис ИИ недоступен. Задайте GEMINI_API_KEY в файле .env (см. README).",
    });
  }

  const { profile } = req.body;
  const validationError = validateProfile(profile);
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.6-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const prompt = buildResumePrompt(profile);
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      return res.status(502).json({
        error: "ИИ вернул некорректный ответ. Попробуйте ещё раз.",
      });
    }

    if (!parsed.professionalSummary || !Array.isArray(parsed.strengths)) {
      return res.status(502).json({
        error: "ИИ вернул неполный ответ. Попробуйте ещё раз.",
      });
    }

    res.json({
      professionalSummary: String(parsed.professionalSummary),
      strengths: parsed.strengths.map(String),
      experienceHighlights: Array.isArray(parsed.experienceHighlights)
        ? parsed.experienceHighlights
        : [],
    });
  } catch (err) {
    console.error("Gemini error:", err.message);
    const message =
      err.message?.includes("API key")
        ? "Неверный или просроченный ключ GEMINI_API_KEY."
        : "Ошибка при обращении к ИИ. Попробуйте позже.";
    res.status(502).json({ error: message });
  }
});

export default router;
