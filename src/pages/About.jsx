import styles from "./About.module.css";

const Icons = {
  Code: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/>
      <polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Heart: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  ),
  Book: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  Layers: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
};

const TECH_STACK = [
  { name: "React 18",    desc: "UI framework with hooks and state management" },
  { name: "CSS Modules", desc: "Scoped, maintainable component-level styling" },
  { name: "html2canvas", desc: "DOM-to-canvas rendering for PDF capture" },
  { name: "jsPDF",       desc: "Client-side PDF generation and download" },
  { name: "Vite",        desc: "Lightning-fast development and build tooling" },
  { name: "Google Fonts", desc: "Tinos / Playfair Display typography" },
];

const SECTIONS = [
  {
    icon: Icons.Book,
    title: "Purpose",
    body: "CoverGen is an automated tool designed specifically for students at Pabna University of Science and Technology (PUST). It eliminates the repetitive task of manually formatting assignment cover pages — ensuring every submission is consistent, professional, and compliant with university standards.",
  },
  {
    icon: Icons.Layers,
    title: "Features",
    body: "Live A4 preview that updates as you type, support for all 21 PUST departments across 5 faculties, year and semester selectors, designation presets, and a one-click PDF export that renders a pixel-perfect cover page in seconds — entirely in the browser, no server required.",
  },
  {
    icon: Icons.Code,
    title: "How it works",
    body: "The app uses html2canvas to capture the live-rendered A4 DOM element at 2× resolution (794 × 1123 px), then passes the resulting canvas to jsPDF which embeds it into a standard A4 PDF. Fonts are loaded via Google Fonts at generation time to ensure Times New Roman–style rendering.",
  },
  {
    icon: Icons.Heart,
    title: "Open Source",
    body: "CoverGen is a free tool built by a PUST student for PUST students. It is open for contributions, bug reports, and feature suggestions. If it saves you 5 minutes before a submission deadline, it has done its job.",
  },
];

export function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={styles.ambientBg} aria-hidden="true" />

      <section className={styles.container}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowLine} />
            <span className={styles.eyebrowText}>About the Project</span>
            <span className={styles.eyebrowLine} />
          </div>
          <h1 className={styles.title}>CoverGen</h1>
          <p className={styles.subtitle}>PUST Version 2.0 · Assignment Cover Page Generator</p>
        </header>

        {/* Info cards */}
        <div className={styles.cardsGrid}>
          {SECTIONS.map((s, i) => (
            <div
              key={s.title}
              className={styles.card}
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className={styles.cardIcon}><s.icon /></div>
              <h3 className={styles.cardTitle}>{s.title}</h3>
              <p className={styles.cardBody}>{s.body}</p>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className={styles.techSection}>
          <h2 className={styles.techTitle}>Tech Stack</h2>
          <div className={styles.techGrid}>
            {TECH_STACK.map((t) => (
              <div key={t.name} className={styles.techItem}>
                <span className={styles.techName}>{t.name}</span>
                <span className={styles.techDesc}>{t.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Version badge */}
        <div className={styles.versionRow}>
          <span className={styles.versionBadge}>v2.0.0</span>
          <span className={styles.versionText}>Built for PUST students</span>
        </div>
      </section>
    </main>
  );
}