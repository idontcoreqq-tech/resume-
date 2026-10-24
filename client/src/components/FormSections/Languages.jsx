import SectionHeading from "../SectionHeading.jsx";

export default function Languages({
  profile,
  addLanguage,
  updateLanguage,
  removeLanguage,
}) {
  return (
    <section className="form-group">
      <div className="group-toolbar">
        <SectionHeading title="Языки" />
        <button type="button" className="btn btn-plain" onClick={addLanguage}>
          Добавить
        </button>
      </div>
      {profile.languages.length === 0 ? (
        <div className="empty-card">
          <p>Языки не указаны.</p>
          <button type="button" className="btn btn-tinted" onClick={addLanguage}>
            Добавить язык
          </button>
        </div>
      ) : (
        <div className="inset-grouped">
          {profile.languages.map((item) => (
            <div key={item.id} className="row field-row lang-row">
              <input
                className="row-input"
                value={item.name}
                onChange={(e) => updateLanguage(item.id, "name", e.target.value)}
                placeholder="Язык"
                aria-label="Язык"
              />
              <input
                className="row-input"
                value={item.level}
                onChange={(e) => updateLanguage(item.id, "level", e.target.value)}
                placeholder="Уровень"
                aria-label="Уровень"
              />
              <button
                type="button"
                className="link-action destructive"
                onClick={() => removeLanguage(item.id)}
                aria-label="Удалить язык"
              >
                Удалить
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
