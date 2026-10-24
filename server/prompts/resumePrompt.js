export function buildResumePrompt(profile) {
  const payload = {
    fullName: profile.fullName,
    position: profile.position,
    birthDate: profile.birthDate,
    skills: profile.skills,
    experience: profile.experience?.map(({ id, company, role, period, description }) => ({
      id,
      company,
      role,
      period,
      description,
    })),
    education: profile.education,
    languages: profile.languages,
    contacts: profile.contacts,
  };

  return `Ты профессиональный карьерный консультант и копирайтер резюме. На основе данных кандидата создай сильный текст для резюме на русском языке.

Данные кандидата (JSON):
${JSON.stringify(payload, null, 2)}

Верни ТОЛЬКО валидный JSON без markdown и комментариев, строго по схеме:
{
  "professionalSummary": "string — 2–4 предложения о профессиональном профиле",
  "strengths": ["string — 3–6 коротких пунктов сильных сторон"],
  "experienceHighlights": [
    { "id": "string — id записи из experience", "description": "string — улучшенное описание достижений" }
  ]
}

Правила:
- Пиши конкретно, без клише и воды.
- Подчёркивай достижения и навыки из данных.
- experienceHighlights — только для записей, у которых есть id в данных; если опыт пуст, массив пустой.
- Не выдумывай компании, даты и факты, которых нет в данных.`;
}
