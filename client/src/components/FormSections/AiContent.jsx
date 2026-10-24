import SectionHeading from "../SectionHeading.jsx";

export default function AiContent({ profile, updateAiContent }) {
  const { aiContent } = profile;

  const updateStrength = (i, value) => {
    const next = [...(aiContent.strengths || [])];
    next[i] = value;
    updateAiContent("strengths", next);
  };

  const addStrength = () => {
    updateAiContent("strengths", [...(aiContent.strengths || []), ""]);
  };

  const removeStrength = (i) => {
    updateAiContent(
      "strengths",
      (aiContent.strengths || []).filter((_, idx) => idx !== i)
    );
  };

  return (
    <section className="form-group">
      <SectionHeading
        title="Текст от ИИ"
        hint="Сгенерированный текст можно править. Возможны неточности — проверьте перед экспортом."
      />
      <div className="inset-grouped">
        <label className="row stacked">
          <span className="row-label">О себе</span>
          <textarea
            className="row-textarea"
            rows={4}
            value={aiContent.professionalSummary}
            onChange={(e) => updateAiContent("professionalSummary", e.target.value)}
            placeholder="Появится после генерации"
          />
        </label>
      </div>
      <div className="group-toolbar">
        <p className="group-title subtle">Сильные стороны</p>
        <button type="button" className="btn btn-plain" onClick={addStrength}>
          Добавить
        </button>
      </div>
      {(aiContent.strengths || []).length > 0 && (
        <div className="inset-grouped">
          {(aiContent.strengths || []).map((s, i) => (
            <div key={i} className="row field-row">
              <input
                className="row-input"
                value={s}
                onChange={(e) => updateStrength(i, e.target.value)}
                aria-label={`Сильная сторона ${i + 1}`}
              />
              <button
                type="button"
                className="link-action destructive"
                onClick={() => removeStrength(i)}
                aria-label="Удалить"
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
