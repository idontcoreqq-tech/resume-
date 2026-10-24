import SectionHeading from "../SectionHeading.jsx";

export default function BasicInfo({ profile, updateField }) {
  const onPhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Фото не больше 5 МБ");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateField("photo", reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <section className="form-group">
      <SectionHeading title="Основное" hint="Имя и должность обязательны для генерации" />
      <div className="inset-grouped">
        <div className="row photo-row">
          <div className="photo-preview-wrap" aria-hidden={!profile.photo}>
            {profile.photo ? (
              <img src={profile.photo} alt="" className="photo-preview" />
            ) : (
              <div className="photo-placeholder">Фото</div>
            )}
          </div>
          <div className="row-content photo-actions">
            <label className="file-label">
              <span className="link-action">Выбрать фото</span>
              <input type="file" accept="image/*" hidden onChange={onPhotoChange} />
            </label>
            {profile.photo && (
              <button type="button" className="link-action destructive" onClick={() => updateField("photo", "")}>
                Удалить
              </button>
            )}
          </div>
        </div>
        <label className="row field-row">
          <span className="row-label">Имя</span>
          <input
            className="row-input"
            value={profile.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
            placeholder="Обязательно"
            autoComplete="name"
          />
        </label>
        <label className="row field-row">
          <span className="row-label">Должность</span>
          <input
            className="row-input"
            value={profile.position}
            onChange={(e) => updateField("position", e.target.value)}
            placeholder="Обязательно"
          />
        </label>
        <label className="row field-row">
          <span className="row-label">Дата рождения</span>
          <input
            className="row-input"
            type="date"
            value={profile.birthDate}
            onChange={(e) => updateField("birthDate", e.target.value)}
          />
        </label>
      </div>
    </section>
  );
}
