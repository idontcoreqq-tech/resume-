import SectionHeading from "../SectionHeading.jsx";

export default function Experience({
  profile,
  addExperience,
  updateExperience,
  removeExperience,
}) {
  return (
    <section className="form-group">
      <div className="group-toolbar">
        <SectionHeading title="Опыт" hint="Можно улучшить формулировки через ИИ" />
        <button type="button" className="btn btn-plain" onClick={addExperience}>
          Добавить
        </button>
      </div>
      {profile.experience.length === 0 ? (
        <div className="empty-card">
          <p>Нет записей об опыте.</p>
          <button type="button" className="btn btn-tinted" onClick={addExperience}>
            Добавить место работы
          </button>
        </div>
      ) : (
        profile.experience.map((item, i) => (
          <div key={item.id} className="inset-grouped stacked-group">
            <div className="row between">
              <span className="row-label strong">Место {i + 1}</span>
              <button type="button" className="link-action destructive" onClick={() => removeExperience(item.id)}>
                Удалить
              </button>
            </div>
            <label className="row field-row">
              <span className="row-label">Компания</span>
              <input
                className="row-input"
                value={item.company}
                onChange={(e) => updateExperience(item.id, "company", e.target.value)}
              />
            </label>
            <label className="row field-row">
              <span className="row-label">Должность</span>
              <input
                className="row-input"
                value={item.role}
                onChange={(e) => updateExperience(item.id, "role", e.target.value)}
              />
            </label>
            <label className="row field-row">
              <span className="row-label">Период</span>
              <input
                className="row-input"
                value={item.period}
                onChange={(e) => updateExperience(item.id, "period", e.target.value)}
                placeholder="2022 — н.в."
              />
            </label>
            <label className="row stacked">
              <span className="row-label">Описание</span>
              <textarea
                className="row-textarea"
                rows={3}
                value={item.description}
                onChange={(e) => updateExperience(item.id, "description", e.target.value)}
              />
            </label>
          </div>
        ))
      )}
    </section>
  );
}
