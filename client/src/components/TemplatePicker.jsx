const TEMPLATES = [
  { id: "classic", label: "Classic" },
  { id: "modern", label: "Modern" },
  { id: "portfolio", label: "Portfolio" },
];

export default function TemplatePicker({ value, onChange }) {
  return (
    <div className="segmented" role="tablist" aria-label="Шаблон">
      {TEMPLATES.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={value === t.id}
          className={value === t.id ? "selected" : ""}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
