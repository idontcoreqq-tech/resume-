import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "resume-builder-profile-v1";

export function createId() {
  return crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export const emptyProfile = () => ({
  photo: "",
  fullName: "",
  position: "",
  birthDate: "",
  skills: "",
  experience: [],
  education: [],
  languages: [],
  contacts: {
    email: "",
    phone: "",
    city: "",
    telegram: "",
    linkedin: "",
    github: "",
    website: "",
  },
  aiContent: {
    professionalSummary: "",
    strengths: [],
  },
});

function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyProfile();
    const parsed = JSON.parse(raw);
    return { ...emptyProfile(), ...parsed };
  } catch {
    return emptyProfile();
  }
}

export function useProfile() {
  const [profile, setProfile] = useState(loadProfile);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      /* quota exceeded — ignore */
    }
  }, [profile]);

  const updateField = useCallback((field, value) => {
    setProfile((p) => ({ ...p, [field]: value }));
  }, []);

  const updateContacts = useCallback((field, value) => {
    setProfile((p) => ({
      ...p,
      contacts: { ...p.contacts, [field]: value },
    }));
  }, []);

  const updateAiContent = useCallback((field, value) => {
    setProfile((p) => ({
      ...p,
      aiContent: { ...p.aiContent, [field]: value },
    }));
  }, []);

  const addExperience = useCallback(() => {
    setProfile((p) => ({
      ...p,
      experience: [
        ...p.experience,
        { id: createId(), company: "", role: "", period: "", description: "" },
      ],
    }));
  }, []);

  const updateExperience = useCallback((id, field, value) => {
    setProfile((p) => ({
      ...p,
      experience: p.experience.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  }, []);

  const removeExperience = useCallback((id) => {
    setProfile((p) => ({
      ...p,
      experience: p.experience.filter((item) => item.id !== id),
    }));
  }, []);

  const addEducation = useCallback(() => {
    setProfile((p) => ({
      ...p,
      education: [
        ...p.education,
        { id: createId(), institution: "", degree: "", years: "" },
      ],
    }));
  }, []);

  const updateEducation = useCallback((id, field, value) => {
    setProfile((p) => ({
      ...p,
      education: p.education.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  }, []);

  const removeEducation = useCallback((id) => {
    setProfile((p) => ({
      ...p,
      education: p.education.filter((item) => item.id !== id),
    }));
  }, []);

  const addLanguage = useCallback(() => {
    setProfile((p) => ({
      ...p,
      languages: [...p.languages, { id: createId(), name: "", level: "" }],
    }));
  }, []);

  const updateLanguage = useCallback((id, field, value) => {
    setProfile((p) => ({
      ...p,
      languages: p.languages.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  }, []);

  const removeLanguage = useCallback((id) => {
    setProfile((p) => ({
      ...p,
      languages: p.languages.filter((item) => item.id !== id),
    }));
  }, []);

  const applyAiResult = useCallback((result) => {
    setProfile((p) => {
      let experience = p.experience;
      if (Array.isArray(result.experienceHighlights)) {
        experience = p.experience.map((exp) => {
          const hit = result.experienceHighlights.find((h) => h.id === exp.id);
          if (hit?.description) {
            return { ...exp, description: hit.description };
          }
          return exp;
        });
      }
      return {
        ...p,
        experience,
        aiContent: {
          professionalSummary: result.professionalSummary ?? p.aiContent.professionalSummary,
          strengths: result.strengths ?? p.aiContent.strengths,
        },
      };
    });
  }, []);

  const resetProfile = useCallback(() => {
    setProfile(emptyProfile());
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    profile,
    updateField,
    updateContacts,
    updateAiContent,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addLanguage,
    updateLanguage,
    removeLanguage,
    applyAiResult,
    resetProfile,
  };
}
