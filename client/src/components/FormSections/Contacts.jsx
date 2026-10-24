import SectionHeading from "../SectionHeading.jsx";

export default function Contacts({ profile, updateContacts }) {
  const { contacts } = profile;
  const fields = [
    { key: "email", label: "Email", type: "email", placeholder: "name@example.com", autoComplete: "email" },
    { key: "phone", label: "Телефон", type: "tel", placeholder: "+7", autoComplete: "tel" },
    { key: "city", label: "Город", placeholder: "Город" },
    { key: "telegram", label: "Telegram", placeholder: "@username" },
    { key: "linkedin", label: "LinkedIn", placeholder: "linkedin.com/in/…" },
    { key: "github", label: "GitHub", placeholder: "github.com/…" },
    { key: "website", label: "Сайт", type: "url", placeholder: "https://" },
  ];

  return (
    <section className="form-group">
      <SectionHeading title="Контакты" />
      <div className="inset-grouped">
        {fields.map(({ key, label, type, placeholder, autoComplete }) => (
          <label key={key} className="row field-row">
            <span className="row-label">{label}</span>
            <input
              className="row-input"
              type={type || "text"}
              value={contacts[key]}
              onChange={(e) => updateContacts(key, e.target.value)}
              placeholder={placeholder}
              autoComplete={autoComplete}
            />
          </label>
        ))}
      </div>
    </section>
  );
}
