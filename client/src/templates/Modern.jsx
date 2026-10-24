import { SectionTitle, useResumeData } from "./shared.jsx";

export default function Modern({ profile }) {
  const { skills, contactLines, birthFormatted, summary, strengths } = useResumeData(profile);

  return (
    <div className="tpl tpl-modern">
      <header className="tpl-modern-header">
        <div className="tpl-modern-header-inner">
          {profile.photo && (
            <img src={profile.photo} alt="" className="tpl-photo tpl-photo-square" />
          )}
          <div>
            <h1 className="tpl-name">{profile.fullName || "Имя Фамилия"}</h1>
            <p className="tpl-position-lg">{profile.position || "Должность"}</p>
            {birthFormatted && <p className="tpl-meta">Дата рождения: {birthFormatted}</p>}
          </div>
        </div>
      </header>

      <div className="tpl-modern-body">
        {contactLines.length > 0 && (
          <div className="tpl-contact-bar">
            {contactLines.map((c) => (
              <span key={c.label}>
                {c.label}: {c.value}
              </span>
            ))}
          </div>
        )}

        {summary && (
          <div className="tpl-block">
            <SectionTitle>О себе</SectionTitle>
            <p className="tpl-text lead">{summary}</p>
          </div>
        )}

        {strengths.length > 0 && (
          <div className="tpl-block tpl-strengths-grid">
            <SectionTitle>Сильные стороны</SectionTitle>
            <ul className="tpl-strength-cards">
              {strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {skills.length > 0 && (
          <div className="tpl-block">
            <SectionTitle>Навыки</SectionTitle>
            <ul className="tpl-tags inline">
              {skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {profile.experience?.length > 0 && (
          <div className="tpl-block">
            <SectionTitle>Опыт работы</SectionTitle>
            {profile.experience.map((exp) => (
              <div key={exp.id} className="tpl-exp-item bordered">
                <div className="tpl-exp-head">
                  <strong>{exp.role}</strong>
                  <span className="tpl-accent">{exp.period}</span>
                </div>
                <div className="tpl-muted">{exp.company}</div>
                {exp.description && <p className="tpl-text">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        <div className="tpl-two-col">
          {profile.education?.length > 0 && (
            <div className="tpl-block">
              <SectionTitle>Образование</SectionTitle>
              {profile.education.map((ed) => (
                <div key={ed.id} className="tpl-exp-item">
                  <strong>{ed.institution}</strong>
                  <div className="tpl-muted">{ed.degree}</div>
                  <div className="tpl-muted">{ed.years}</div>
                </div>
              ))}
            </div>
          )}
          {profile.languages?.length > 0 && (
            <div className="tpl-block">
              <SectionTitle>Языки</SectionTitle>
              <ul className="tpl-list">
                {profile.languages.map((l) => (
                  <li key={l.id}>
                    {l.name} — {l.level}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
