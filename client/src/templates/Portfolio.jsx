import { SectionTitle, useResumeData } from "./shared.jsx";

export default function Portfolio({ profile }) {
  const { skills, contactLines, birthFormatted, summary, strengths } = useResumeData(profile);

  return (
    <div className="tpl tpl-portfolio">
      <section className="tpl-portfolio-hero">
        {profile.photo && (
          <img src={profile.photo} alt="" className="tpl-photo tpl-photo-hero" />
        )}
        <h1 className="tpl-hero-name">{profile.fullName || "Имя Фамилия"}</h1>
        <p className="tpl-hero-role">{profile.position || "Должность"}</p>
        {summary && <p className="tpl-hero-tagline">{summary}</p>}
        {birthFormatted && <p className="tpl-meta">Д. р.: {birthFormatted}</p>}
        {contactLines.length > 0 && (
          <div className="tpl-hero-contacts">
            {contactLines.map((c) => (
              <span key={c.label}>{c.value}</span>
            ))}
          </div>
        )}
      </section>

      {strengths.length > 0 && (
        <section className="tpl-portfolio-section">
          <SectionTitle>Почему я</SectionTitle>
          <div className="tpl-strength-cards wide">
            {strengths.map((s, i) => (
              <div key={i} className="tpl-strength-card">
                {s}
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section className="tpl-portfolio-section">
          <SectionTitle>Навыки</SectionTitle>
          <ul className="tpl-tags inline large">
            {skills.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </section>
      )}

      {profile.experience?.length > 0 && (
        <section className="tpl-portfolio-section">
          <SectionTitle>Опыт</SectionTitle>
          <div className="tpl-portfolio-timeline">
            {profile.experience.map((exp) => (
              <article key={exp.id} className="tpl-timeline-item">
                <time className="tpl-accent">{exp.period}</time>
                <h4>{exp.role}</h4>
                <p className="tpl-muted">{exp.company}</p>
                {exp.description && <p className="tpl-text">{exp.description}</p>}
              </article>
            ))}
          </div>
        </section>
      )}

      {(profile.education?.length > 0 || profile.languages?.length > 0) && (
        <section className="tpl-portfolio-section tpl-two-col">
          {profile.education?.length > 0 && (
            <div>
              <SectionTitle>Образование</SectionTitle>
              {profile.education.map((ed) => (
                <div key={ed.id} className="tpl-exp-item">
                  <strong>{ed.institution}</strong>
                  <p className="tpl-muted">
                    {ed.degree} {ed.years && `(${ed.years})`}
                  </p>
                </div>
              ))}
            </div>
          )}
          {profile.languages?.length > 0 && (
            <div>
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
        </section>
      )}
    </div>
  );
}
