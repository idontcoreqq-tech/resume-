export default function SectionHeading({ title, hint }) {
  return (
    <div className="group-header">
      <h2 className="group-title">{title}</h2>
      {hint && <p className="group-footer">{hint}</p>}
    </div>
  );
}
