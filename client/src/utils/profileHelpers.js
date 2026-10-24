export function parseSkills(skillsString) {
  if (!skillsString?.trim()) return [];
  return skillsString
    .split(/[,;|]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function getExperienceDescription(exp, experienceHighlights) {
  if (!experienceHighlights?.length) return exp.description;
  const hit = experienceHighlights.find((h) => h.id === exp.id);
  return hit?.description || exp.description;
}

export function formatBirthDate(dateStr) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  if (!y) return dateStr;
  if (m && d) return `${d}.${m}.${y}`;
  return dateStr;
}

export function sanitizeFileName(name) {
  return (name || "resume")
    .trim()
    .replace(/[^\w\s-]/gi, "")
    .replace(/\s+/g, "-")
    .slice(0, 80) || "resume";
}
