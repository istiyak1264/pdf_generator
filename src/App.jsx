import { useState, useCallback } from "react";
import { Navbar } from "./components/Navbar";
import { HomePage } from "./pages/HomePage";
import { CoverForm } from "./components/CoverForm";
import { CoverPreview } from "./components/CoverPreview";
import { ContactPage } from "./pages/ContactPage";
import { AboutPage } from "./pages/About";
import { useForm } from "./hooks/useForm";
import { generatePDF } from "./utils/generatePDF";
import styles from "./App.module.css";

const PREVIEW_ID = "cover-page-preview";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [activePage, setActivePage] = useState("home");
  const [generating, setGenerating] = useState(false);

  const { values, errors, handleChange, validate, reset } = useForm();

  const handleThemeToggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const handleNavigate = useCallback((page) => {
    setActivePage(page);
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!validate()) return;
    setGenerating(true);
    try {
      await generatePDF(PREVIEW_ID, `cover-${values.studentName || "page"}`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setGenerating(false);
    }
  }, [validate, values.studentName]);

  return (
    <div
      className={`${styles.app} ${theme === "light" ? styles.light : styles.dark}`}
      data-theme={theme}
    >
      <Navbar
        theme={theme}
        onThemeToggle={handleThemeToggle}
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      {activePage === "home" && (
        <HomePage onNavigate={handleNavigate} />
      )}

      {activePage === "generate" && (
        <div className={styles.workspacePage}>
          <CoverForm
            values={values}
            errors={errors}
            onChange={handleChange}
            onGenerate={handleGenerate}
            onReset={reset}
            generating={generating}
          />
          <CoverPreview values={values} previewId={PREVIEW_ID} />
        </div>
      )}

      {activePage === "contact" && <ContactPage />}
      {activePage === "about" && <AboutPage />}
    </div>
  );
}