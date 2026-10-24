export function getProfileProgress(profile) {
  const checks = [
    Boolean(profile.fullName?.trim()),
    Boolean(profile.position?.trim()),
    Boolean(profile.photo),
    Boolean(profile.contacts?.email?.trim() || profile.contacts?.phone?.trim()),
    Boolean(profile.skills?.trim()),
    profile.experience?.length > 0,
    profile.education?.length > 0,
    Boolean(profile.aiContent?.professionalSummary?.trim()),
  ];
  const done = checks.filter(Boolean).length;
  return {
    done,
    total: checks.length,
    percent: Math.round((done / checks.length) * 100),
  };
}
