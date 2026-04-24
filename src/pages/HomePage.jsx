import { useEffect, useRef } from "react";
import styles from "./HomePage.module.css";

const Icons = {
  FileText: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  Zap: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  Shield: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  Download: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
  ArrowRight: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/>
      <polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Star: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"
      stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  ),
};

const FEATURES = [
  {
    icon: Icons.Zap,
    title: "Instant Generation",
    desc: "Fill in your details and download a pixel-perfect PDF cover page in seconds.",
  },
  {
    icon: Icons.Shield,
    title: "PUST Compliant",
    desc: "Pre-configured with all PUST departments, designations, and standard formatting.",
  },
  {
    icon: Icons.Download,
    title: "One-Click PDF",
    desc: "True A4 PDF export powered by html2canvas and jsPDF. No server required.",
  },
];

const STEPS = [
  { num: "01", label: "Fill the Form", desc: "Enter your course, student and teacher details." },
  { num: "02", label: "Preview Live",  desc: "Watch the A4 cover update as you type." },
  { num: "03", label: "Download PDF",  desc: "Hit the gold button and save your cover page." },
];

export function HomePage({ onNavigate }) {
  const heroRef = useRef(null);

  /* Parallax tilt on hero orbs */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const onMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth  - 0.5) * 24;
      const y = (clientY / innerHeight - 0.5) * 24;
      el.style.setProperty("--orb-x", `${x}px`);
      el.style.setProperty("--orb-y", `${y}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <main className={styles.page}>

      {/* ── Hero ── */}
      <section className={styles.hero} ref={heroRef}>
        {/* Ambient orbs */}
        <div className={styles.orbA} aria-hidden="true" />
        <div className={styles.orbB} aria-hidden="true" />
        <div className={styles.orbC} aria-hidden="true" />

        {/* Grain overlay */}
        <div className={styles.grain} aria-hidden="true" />

        <div className={styles.heroInner}>
          {/* Eyebrow badge */}
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot}><Icons.Star /></span>
            <span className={styles.eyebrowText}>Pabna University of Science & Technology</span>
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.heroLine1}>Generate Your</span>
            <span className={styles.heroLine2}>Assignment Cover</span>
            <span className={styles.heroLine3}>
              <span className={styles.heroAccent}>Instantly</span>
              <span className={styles.heroPeriod}>.</span>
            </span>
          </h1>

          <p className={styles.heroSubtitle}>
            Professional cover pages for PUST students — all departments,
            live A4 preview, and one-click PDF export.
          </p>

          <div className={styles.heroCtas}>
            <button
              className={styles.ctaPrimary}
              onClick={() => onNavigate("generate")}
              type="button"
            >
              <Icons.FileText />
              Generate Cover
              <Icons.ArrowRight />
            </button>
            <button
              className={styles.ctaSecondary}
              onClick={() => onNavigate("about")}
              type="button"
            >
              Learn More
            </button>
          </div>

          {/* Stats strip */}
          <div className={styles.statsRow}>
            {[
              { val: "21+", label: "Departments" },
              { val: "A4",  label: "Standard Size" },
              { val: "PDF", label: "Export Format" },
              { val: "Free", label: "Always" },
            ].map((s) => (
              <div key={s.label} className={styles.statItem}>
                <span className={styles.statVal}>{s.val}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className={styles.featuresSection}>
        <div className={styles.sectionHead}>
          <p className={styles.sectionEyebrow}>Why CoverGen?</p>
          <h2 className={styles.sectionTitle}>Everything you need</h2>
        </div>
        <div className={styles.featuresGrid}>
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className={styles.featureCard}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className={styles.featureIcon}><f.icon /></div>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className={styles.stepsSection}>
        <div className={styles.sectionHead}>
          <p className={styles.sectionEyebrow}>Simple Process</p>
          <h2 className={styles.sectionTitle}>Three steps to done</h2>
        </div>
        <div className={styles.stepsRow}>
          {STEPS.map((s, i) => (
            <div key={s.num} className={styles.stepCard} style={{ animationDelay: `${0.15 + i * 0.12}s` }}>
              <span className={styles.stepNum}>{s.num}</span>
              <h3 className={styles.stepLabel}>{s.label}</h3>
              <p className={styles.stepDesc}>{s.desc}</p>
              {i < STEPS.length - 1 && <span className={styles.stepArrow}><Icons.ArrowRight /></span>}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBannerInner}>
          <h2 className={styles.ctaBannerTitle}>Ready to create your cover?</h2>
          <p className={styles.ctaBannerSub}>Takes less than a minute.</p>
          <button
            className={styles.ctaPrimary}
            onClick={() => onNavigate("generate")}
            type="button"
          >
            <Icons.FileText />
            Start Now
            <Icons.ArrowRight />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          CoverGen · PUST &nbsp;·&nbsp; Built for students, by students
        </p>
      </footer>
    </main>
  );
}