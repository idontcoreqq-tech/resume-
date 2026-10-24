export default function Spinner({ label = "Загрузка" }) {
  return (
    <span className="spinner" role="status" aria-label={label}>
      <span className="spinner-dot" aria-hidden="true" />
    </span>
  );
}
