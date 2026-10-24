import SectionHeading from "../SectionHeading.jsx";

export default function Education({
  profile,
  addEducation,
  updateEducation,
  removeEducation,
}) {
  return (
    <section className="form-group">
      <div className="group-toolbar">
        <SectionHeading title="Образование" />
        <button type="button" className="btn btn-plain" onClick={addEducation}>
          Добавить
        </button>
      </div>
      {profile.education.length === 0 ? (
        <div className="empty-card">
          <p>Образование не указано.</p>
          <button type="button" className="btn btn-tinted" onClick={addEducation}>
            Добавить запись
          </button>
        </div>
      ) : (
        profile.education.map((item, i) => (
          <div key={item.id} className="inset-grouped stacked-group">
            <div className="row between">
              <span className="row-label strong">Запись {i + 1}</span>
              <button type="button" className="link-action destructive" onClick={() => removeEducation(item.id)}>
                Удалить
              </button>
            </div>
            <label className="row field-row">
              <span className="row-label">Учреждение</span>
              <input
                className="row-input"
                value={item.institution}
                onChange={(e) => updateEducation(item.id, "institution", e.target.value)}
              />
            </label>
            <label className="row field-row">
              <span className="row-label">Специальность</span>
              <input
                className="row-input"
                value={item.degree}
                onChange={(e) => updateEducation(item.id, "degree", e.target.value)}
              />
            </label>
            <label className="row field-row">
              <span className="row-label">Годы</span>
              <input
                className="row-input"
                value={item.years}
                onChange={(e) => updateEducation(item.id, "years", e.target.value)}
                placeholder="2018 — 2022"
              />
            </label>
          </div>
        ))
      )}
    </section>
  );
}
