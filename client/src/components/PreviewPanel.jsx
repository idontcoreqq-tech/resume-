import { useEffect, useRef, useState } from "react";
import TemplatePicker from "./TemplatePicker.jsx";
import Classic from "../templates/Classic.jsx";
import Modern from "../templates/Modern.jsx";
import Portfolio from "../templates/Portfolio.jsx";
import Spinner from "./Spinner.jsx";
import { exportResumePdf } from "../utils/exportPdf.js";

const MAP = {
  classic: Classic,
  modern: Modern,
  portfolio: Portfolio,
};

export default function PreviewPanel({ profile, templateId, onTemplateChange, generating }) {
  const exportRef = useRef(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);
  const Template = MAP[templateId] || Classic;

  useEffect(() => {
    setCanvasKey((k) => k + 1);
  }, [templateId]);

  const onDownloadPdf = async () => {
    setPdfLoading(true);
    try {
      await exportResumePdf(exportRef.current, profile.fullName, templateId);
    } catch {
      alert("Не удалось создать PDF. Попробуйте ещё раз.");
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div className="preview-shell">
      <div className="pane-header preview-header">
        <div>
          <h2 className="title-2">Превью</h2>
          <p className="footnote">Шаблон обновляется сразу при изменении профиля</p>
        </div>
        <button
          type="button"
          className="btn btn-prominent"
          onClick={onDownloadPdf}
          disabled={pdfLoading || generating}
        >
          {pdfLoading ? (
            <>
              <Spinner label="Создание PDF" />
              Создание…
            </>
          ) : (
            "Скачать PDF"
          )}
        </button>
      </div>

      <div className="preview-controls">
        <TemplatePicker value={templateId} onChange={onTemplateChange} />
      </div>

      <div className={`preview-scroll ${generating ? "is-busy" : ""}`}>
        {generating && (
          <div className="preview-busy" aria-live="polite">
            <Spinner label="Генерация текста" />
            <span>Пишем описание…</span>
          </div>
        )}
        <div
          key={canvasKey}
          id="resume-export-root"
          ref={exportRef}
          className="preview-canvas canvas-enter"
        >
          <Template profile={profile} />
        </div>
      </div>
    </div>
  );
}
