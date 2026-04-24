import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./Navbar.module.css";

/* ── SVG Icon set ─────────────────────────────────────────── */
const Icons = {
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
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4.5"/>
      <line x1="12" y1="2"  x2="12" y2="5"/>
      <line x1="12" y1="19" x2="12" y2="22"/>
      <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/>
      <line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
      <line x1="2"  y1="12" x2="5"  y2="12"/>
      <line x1="19" y1="12" x2="22" y2="12"/>
      <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/>
      <line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
    </svg>
  ),
  Moon: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  ),
  Menu: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="6"  x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  X: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6"  x2="6"  y2="18"/>
      <line x1="6"  y1="6"  x2="18" y2="18"/>
    </svg>
  ),
};

/* ── Nav link definitions ─────────────────────────────────── */
const NAV_LINKS = [
  { id: "generate", label: "Generate PDF", icon: Icons.FileText, shortcut: "G" },
  { id: "contact",  label: "Contact",      icon: Icons.Mail,     shortcut: "C" },
  { id: "about",    label: "About",         icon: Icons.Info,     shortcut: "A" },
];

/* ─────────────────────────────────────────────────────────── */

export function Navbar({ theme, onThemeToggle, activePage, onNavigate }) {
  const [scrolled, setScrolled]   = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Sliding pill */
  const navCenterRef = useRef(null);
  const linkRefs     = useRef({});
  const [pill, setPill] = useState({ left: 0, width: 0, opacity: 0 });

  /* Update pill whenever activePage or layout changes */
  const updatePill = useCallback(() => {
    const activeEl  = linkRefs.current[activePage];
    const container = navCenterRef.current;
    if (!activeEl || !container) return;
    const cRect = container.getBoundingClientRect();
    const lRect = activeEl.getBoundingClientRect();
    setPill({ left: lRect.left - cRect.left, width: lRect.width, opacity: 1 });
  }, [activePage]);

  useEffect(() => {
    updatePill();
    window.addEventListener("resize", updatePill);
    return () => window.removeEventListener("resize", updatePill);
  }, [updatePill]);

  /* Scroll detection + progress */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 6);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(docH > 0 ? (window.scrollY / docH) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close mobile menu on resize to desktop */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 680) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* Keyboard shortcuts */
  useEffect(() => {
    const onKey = (e) => {
      if (["INPUT", "SELECT", "TEXTAREA"].includes(e.target.tagName)) return;
      if (e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.key === "t" || e.key === "T") onThemeToggle();
      if (e.key === "g" || e.key === "G") { onNavigate("generate"); setMobileOpen(false); }
      if (e.key === "c" || e.key === "C") { onNavigate("contact");  setMobileOpen(false); }
      if (e.key === "a" || e.key === "A") { onNavigate("about");    setMobileOpen(false); }
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onThemeToggle, onNavigate]);

  const handleNav = (id) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.navbarScrolled : ""}`}>

        {/* ── Scroll progress bar ── */}
        <div
          className={styles.scrollProgress}
          style={{ width: `${scrollPct}%` }}
          aria-hidden="true"
        />

        {/* ── Left: Logo ── */}
        <div className={styles.navLeft}>
          <button
            className={styles.homeBtn}
            onClick={() => handleNav("home")}
            type="button"
            aria-label="Home"
          >
            <span className={styles.logoMark}>
              <span className={styles.logoRing} />
              <span className={styles.logoLetterP}>P</span>
              <span className={styles.logoShine} />
            </span>
            <span className={styles.homeLabel}>
              <span className={styles.homeName}>CoverGen</span>
              <span className={styles.homeTag}>PUST · Academic</span>
            </span>
          </button>
        </div>

        {/* ── Center: Nav links + sliding pill (desktop) ── */}
        <div className={styles.navCenter} ref={navCenterRef}>
          {/* Sliding background pill */}
          <span
            className={styles.slidingPill}
            style={{
              left:    pill.left,
              width:   pill.width,
              opacity: pill.opacity,
            }}
          />

          {NAV_LINKS.map((link, i) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                ref={(el) => { linkRefs.current[link.id] = el; }}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ""}`}
                style={{ animationDelay: `${0.12 + i * 0.07}s` }}
                onClick={() => handleNav(link.id)}
                type="button"
              >
                <span className={styles.navLinkIcon}><link.icon /></span>
                <span className={styles.navLinkLabel}>{link.label}</span>
                <span className={styles.shortcutTag}>{link.shortcut}</span>
                {isActive && <span className={styles.activePip} />}
              </button>
            );
          })}
        </div>

        {/* ── Right: Theme toggle + mobile hamburger ── */}
        <div className={styles.navRight}>
          {/* Keyboard hint — desktop only */}
          <span className={styles.kbHint} title="Press T to toggle theme">T</span>

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
                  <span className={`${styles.thumbIcon} ${theme === "dark" ? styles.thumbIconVisible : ""}`}>
                    <Icons.Moon />
                  </span>
                  <span className={`${styles.thumbIcon} ${theme === "light" ? styles.thumbIconVisible : ""}`}>
                    <Icons.Sun />
                  </span>
                </span>
              </span>
            </button>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className={`${styles.hamburger} ${mobileOpen ? styles.hamburgerOpen : ""}`}
            onClick={() => setMobileOpen((p) => !p)}
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
        </div>
      </nav>

      {/* ── Mobile dropdown menu ── */}
      <div
        className={`${styles.mobileMenu} ${mobileOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!mobileOpen}
      >
        <div className={styles.mobileMenuInner}>
          {NAV_LINKS.map((link, i) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                className={`${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ""}`}
                style={{ animationDelay: mobileOpen ? `${i * 0.06}s` : "0s" }}
                onClick={() => handleNav(link.id)}
                type="button"
              >
                <span className={styles.mobileNavIcon}><link.icon /></span>
                <span className={styles.mobileNavLabel}>{link.label}</span>
                <span className={styles.mobileNavShortcut}>{link.shortcut}</span>
              </button>
            );
          })}

          <div className={styles.mobileDivider} />

          {/* Theme toggle in mobile menu */}
          <button
            className={styles.mobileThemeRow}
            onClick={onThemeToggle}
            type="button"
          >
            <span className={styles.mobileNavIcon}>
              {theme === "dark" ? <Icons.Moon /> : <Icons.Sun />}
            </span>
            <span className={styles.mobileNavLabel}>
              {theme === "dark" ? "Switch to Day" : "Switch to Night"}
            </span>
            <span className={styles.mobileNavShortcut}>T</span>
          </button>
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {mobileOpen && (
        <div
          className={styles.mobileBackdrop}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}