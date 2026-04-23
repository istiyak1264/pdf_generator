import { useState, useEffect, useCallback } from "react";
import { Navbar } from "./components/Navbar";
import { CoverForm } from "./components/CoverForm";
import { CoverPreview } from "./components/CoverPreview";
import { useForm } from "./hooks/useForm";
import { generatePDF } from "./utils/generatePDF";
import "./index.css";

const PREVIEW_ID = "cover-preview-root";

function PlaceholderPage({ title, icon }) {
  return (
    <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
      color: "var(--text-muted)",
      animation: "fadeIn 0.4s ease",
    }}>
      <span style={{ fontSize: "48px", opacity: 0.4 }}>{icon}</span>
      <p style={{
        fontFamily: "var(--font-display)",
        fontSize: "22px",
        color: "var(--text-secondary)",
        fontWeight: 700,
      }}>
        {title}
      </p>
      <p style={{
        fontFamily: "var(--font-label)",
        fontSize: "11px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
      }}>
        Coming soon
      </p>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [activePage, setActivePage] = useState("generate");
  const [generating, setGenerating] = useState(false);

  const { values, errors, handleChange, validate, reset } = useForm();

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!validate()) return;
    setGenerating(true);
    try {
      const studentName = values.studentName?.trim().replace(/\s+/g, "_") || "cover";
      await generatePDF(PREVIEW_ID, `PUST_Cover_${studentName}`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setGenerating(false);
    }
  }, [validate, values]);

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      overflow: "hidden",
      background: "var(--bg-page)",
    }}>
      {/* ── Navbar (fixed height 58px) ── */}
      <Navbar
        theme={theme}
        onThemeToggle={toggleTheme}
        activePage={activePage}
        onNavigate={setActivePage}
      />

      {/* ── Main content area (fills remaining height) ── */}
      <main style={{
        marginTop: "58px",
        flex: 1,
        display: "flex",
        overflow: "hidden",
        height: "calc(100vh - 58px)",
      }}>
        {activePage === "generate" ? (
          <>
            {/* Left: Form */}
            <CoverForm
              values={values}
              errors={errors}
              onChange={handleChange}
              onGenerate={handleGenerate}
              onReset={reset}
              generating={generating}
            />

            {/* Right: Live Preview */}
            <CoverPreview
              values={values}
              previewId={PREVIEW_ID}
            />
          </>
        ) : activePage === "contact" ? (
          <PlaceholderPage title="Contact Us" icon="✉️" />
        ) : activePage === "about" ? (
          <PlaceholderPage title="About CoverGen" icon="📖" />
        ) : (
          /* Home landing — redirect to generate */
          <PlaceholderPage title="Welcome to CoverGen" icon="🎓" />
        )}
      </main>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}