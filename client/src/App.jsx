import { useEffect, useState } from "react";
import { useProfile } from "./hooks/useProfile.js";
import { useTheme } from "./context/ThemeContext.jsx";
import FormEditor from "./components/FormEditor.jsx";
import PreviewPanel from "./components/PreviewPanel.jsx";
import Spinner from "./components/Spinner.jsx";
import { generateResumeContent } from "./api/client.js";

export default function App() {
  const profileApi = useProfile();
  const { profile, applyAiResult, resetProfile } = profileApi;
  const { theme, toggleTheme } = useTheme();
  const [templateId, setTemplateId] = useState("classic");
  const [mobileTab, setMobileTab] = useState("form");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const onGenerate = async () => {
    setError("");
    if (!profile.fullName?.trim() || !profile.position?.trim()) {
      setError("Укажите имя и должность, затем повторите.");
      setMobileTab("form");
      return;
    }
    setGenerating(true);
    try {
      const result = await generateResumeContent(profile);
      applyAiResult(result);
      setMobileTab("preview");
      setToast("Описание обновлено");
    } catch (e) {
      setError(e.message);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className={`app ${generating ? "is-generating" : ""}`}>
      <header className={`nav-bar glass ${scrolled ? "is-scrolled" : ""}`} role="banner">
        <div className="nav-leading">
          <p className="brand">FORMA</p>
        </div>
        <div className="nav-trailing">
          <button type="button" className="btn btn-plain" onClick={toggleTheme}>
            {theme === "light" ? "Тёмная" : "Светлая"}
          </button>
          <button type="button" className="btn btn-plain" onClick={resetProfile}>
            Сбросить
          </button>
          <button
            type="button"
            className="btn btn-prominent"
            onClick={onGenerate}
            disabled={generating}
          >
            {generating ? (
              <>
                <Spinner label="Генерация" />
                Генерация…
              </>
            ) : (
              "Сгенерировать"
            )}
          </button>
        </div>
      </header>

      <main className="workspace">
        <div className="segmented mobile-only" role="tablist" aria-label="Раздел">
          <button
            type="button"
            role="tab"
            aria-selected={mobileTab === "form"}
            className={mobileTab === "form" ? "selected" : ""}
            onClick={() => setMobileTab("form")}
          >
            Редактор
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mobileTab === "preview"}
            className={mobileTab === "preview" ? "selected" : ""}
            onClick={() => setMobileTab("preview")}
          >
            Превью
          </button>
        </div>

        {error && (
          <div className="inline-alert" role="alert">
            <p>{error}</p>
            <button type="button" className="btn btn-plain" onClick={() => setError("")}>
              Закрыть
            </button>
          </div>
        )}

        <div className="split-view">
          <section
            className={`pane pane-editor reveal ${mobileTab === "form" ? "mobile-visible" : ""}`}
            aria-label="Редактор профиля"
          >
            <div className="pane-header">
              <h1 className="large-title">Профиль</h1>
              <p className="footnote">
                Заполните данные. ИИ поможет с блоком «О себе» — результат можно править.
              </p>
            </div>
            <FormEditor {...profileApi} />
          </section>

          <section
            className={`pane pane-preview reveal reveal-delay ${mobileTab === "preview" ? "mobile-visible" : ""}`}
            aria-label="Превью резюме"
          >
            <PreviewPanel
              profile={profile}
              templateId={templateId}
              onTemplateChange={setTemplateId}
              generating={generating}
            />
          </section>
        </div>
      </main>

      <div className="bottom-bar glass mobile-only">
        <button
          type="button"
          className="btn btn-prominent btn-block"
          onClick={onGenerate}
          disabled={generating}
        >
          {generating ? (
            <>
              <Spinner label="Генерация" />
              Генерация…
            </>
          ) : (
            "Сгенерировать описание"
          )}
        </button>
      </div>

      {toast && (
        <div className="toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}
