import { formatBirthDate, parseSkills } from "../utils/profileHelpers.js";

export function useResumeData(profile) {
  const skills = parseSkills(profile.skills);
  const contacts = profile.contacts || {};
  const contactLines = [
    contacts.email && { label: "Email", value: contacts.email },
    contacts.phone && { label: "Тел.", value: contacts.phone },
    contacts.city && { label: "Город", value: contacts.city },
    contacts.telegram && { label: "Telegram", value: contacts.telegram },
    contacts.linkedin && { label: "LinkedIn", value: contacts.linkedin },
    contacts.github && { label: "GitHub", value: contacts.github },
    contacts.website && { label: "Сайт", value: contacts.website },
  ].filter(Boolean);

  return {
    skills,
    contactLines,
    birthFormatted: formatBirthDate(profile.birthDate),
    summary: profile.aiContent?.professionalSummary,
    strengths: (profile.aiContent?.strengths || []).filter(Boolean),
  };
}

export function SectionTitle({ children }) {
  return <h3 className="tpl-section-title">{children}</h3>;
}
