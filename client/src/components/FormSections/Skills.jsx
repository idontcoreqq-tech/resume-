import SectionHeading from "../SectionHeading.jsx";

export default function Skills({ profile, updateField }) {
  return (
    <section className="form-group">
      <SectionHeading title="Навыки" hint="Перечислите через запятую" />
      <div className="inset-grouped">
        <label className="row stacked">
          <textarea
            className="row-textarea"
            rows={3}
            value={profile.skills}
            onChange={(e) => updateField("skills", e.target.value)}
            placeholder="JavaScript, React, Git"
          />
        </label>
      </div>
    </section>
  );
}
