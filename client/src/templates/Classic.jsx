import { SectionTitle, useResumeData } from "./shared.jsx";

export default function Classic({ profile }) {
  const { skills, contactLines, birthFormatted, summary, strengths } = useResumeData(profile);

  return (
    <div className="tpl tpl-classic">
      <aside className="tpl-classic-sidebar">
        {profile.photo && (
          <img src={profile.photo} alt="" className="tpl-photo tpl-photo-round" />
        )}
        <h1 className="tpl-name">{profile.fullName || "Имя Фамилия"}</h1>
        <p className="tpl-position">{profile.position || "Должность"}</p>
        {birthFormatted && <p className="tpl-meta">Д. р.: {birthFormatted}</p>}

        {contactLines.length > 0 && (
          <div className="tpl-block">
            <SectionTitle>Контакты</SectionTitle>
            <ul className="tpl-list compact">
              {contactLines.map((c) => (
                <li key={c.label}>
                  <span className="tpl-muted">{c.label}:</span> {c.value}
                </li>
              ))}
            </ul>
          </div>
        )}

        {skills.length > 0 && (
          <div className="tpl-block">
            <SectionTitle>Навыки</SectionTitle>
            <ul className="tpl-tags">
              {skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {profile.languages?.length > 0 && (
          <div className="tpl-block">
            <SectionTitle>Языки</SectionTitle>
            <ul className="tpl-list compact">
              {profile.languages.map((l) => (
                <li key={l.id}>
                  {l.name}
                  {l.level ? ` — ${l.level}` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}
      </aside>

      <main className="tpl-classic-main">
        {summary && (
          <div className="tpl-block">
            <SectionTitle>О себе</SectionTitle>
            <p className="tpl-text">{summary}</p>
          </div>
        )}

        {strengths.length > 0 && (
          <div className="tpl-block">
            <SectionTitle>Сильные стороны</SectionTitle>
            <ul className="tpl-list bullets">
              {strengths.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {profile.experience?.length > 0 && (
          <div className="tpl-block">
            <SectionTitle>Опыт</SectionTitle>
            {profile.experience.map((exp) => (
              <div key={exp.id} className="tpl-exp-item">
                <div className="tpl-exp-head">
                  <strong>{exp.role || "Должность"}</strong>
                  <span className="tpl-muted">{exp.period}</span>
                </div>
                <div className="tpl-muted">{exp.company}</div>
                {exp.description && <p className="tpl-text">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {profile.education?.length > 0 && (
          <div className="tpl-block">
            <SectionTitle>Образование</SectionTitle>
            {profile.education.map((ed) => (
              <div key={ed.id} className="tpl-exp-item">
                <strong>{ed.institution}</strong>
                <div className="tpl-muted">
                  {ed.degree}
                  {ed.years ? ` · ${ed.years}` : ""}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
