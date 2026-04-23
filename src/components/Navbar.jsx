import styles from "./Navbar.module.css";

const Icons = {
  Home: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  FileText: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  Mail: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Info: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  Sun: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  ),
  Moon: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
};

export function Navbar({ theme, onThemeToggle, activePage, onNavigate }) {
  const navLinks = [
    { id: "generate", label: "Generate PDF", icon: <Icons.FileText /> },
    { id: "contact",  label: "Contact",      icon: <Icons.Mail /> },
    { id: "about",    label: "About",         icon: <Icons.Info /> },
  ];

  return (
    <nav className={styles.navbar}>
      {/* ── Left: Logo + Home ── */}
      <div className={styles.navLeft}>
        <button
          className={`${styles.homeBtn} ${activePage === "home" ? styles.active : ""}`}
          onClick={() => onNavigate("home")}
          type="button"
        >
          <span className={styles.logoMark}>
            <span className={styles.logoLetterP}>P</span>
          </span>
          <span className={styles.homeLabel}>
            <span className={styles.homeName}>CoverGen</span>
            <span className={styles.homeTag}>Home</span>
          </span>
        </button>
      </div>

      {/* ── Center: Nav Links ── */}
      <div className={styles.navCenter}>
        {navLinks.map((link) => (
          <button
            key={link.id}
            className={`${styles.navLink} ${activePage === link.id ? styles.navLinkActive : ""}`}
            onClick={() => onNavigate(link.id)}
            type="button"
          >
            <span className={styles.navLinkIcon}>{link.icon}</span>
            <span className={styles.navLinkLabel}>{link.label}</span>
            {activePage === link.id && <span className={styles.activePip} />}
          </button>
        ))}
      </div>

      {/* ── Right: Theme Toggle ── */}
      <div className={styles.navRight}>
        <div className={styles.themeToggleWrap}>
          <span className={styles.themeLabel}>
            {theme === "dark" ? "Night" : "Day"}
          </span>
          <button
            className={styles.themeToggle}
            onClick={onThemeToggle}
            type="button"
            aria-label="Toggle theme"
          >
            <span className={`${styles.themeTrack} ${theme === "light" ? styles.themeTrackLight : ""}`}>
              <span className={`${styles.thumbWrap} ${theme === "light" ? styles.thumbRight : ""}`}>
                {theme === "dark" ? <Icons.Moon /> : <Icons.Sun />}
              </span>
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}