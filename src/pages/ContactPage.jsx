import { useState } from "react";
import styles from "./ContactPage.module.css";

const Icons = {
  Mail: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Github: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 14.77 2a13.38 13.38 0 0 0-7 0 5.07 5.07 0 0 0-5.23 4.77 5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  ),
  Send: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  Check: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  MapPin: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
};

const CONTACT_INFO = [
  {
    icon: Icons.Mail,
    label: "Email",
    value: "covergen@pust.ac.bd",
    href: "mailto:covergen@pust.ac.bd",
  },
  {
    icon: Icons.Github,
    label: "GitHub",
    value: "github.com/covergen-pust",
    href: "https://github.com",
  },
  {
    icon: Icons.MapPin,
    label: "Location",
    value: "Pabna University of Science & Technology",
    href: null,
  },
];

export function ContactPage() {
  const [form, setForm] = useState({
    name: "", email: "", subject: "", message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (field) => (e) =>
    setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1800);
  };

  return (
    <main className={styles.page}>
      <div className={styles.ambientBg} aria-hidden="true" />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroEyebrow}>
          <span className={styles.eyebrowLine} />
          <span className={styles.eyebrowText}>Get in Touch</span>
          <span className={styles.eyebrowLine} />
        </div>
        <h1 className={styles.heroTitle}>Contact Me</h1>
        <p className={styles.heroSub}>Have a question, suggestion, or bug to report?</p>
      </section>

      {/* ── Grid ── */}
      <div className={styles.grid}>

        {/* Contact info sidebar */}
        <aside className={styles.infoSide}>
          <h2 className={styles.infoTitle}>Reach out</h2>
          <p className={styles.infoText}>
            CoverGen is a student-built tool. Feedback and contributions are always welcome.
          </p>

          <div className={styles.infoList}>
            {CONTACT_INFO.map((item) => (
              <div key={item.label} className={styles.infoItem}>
                <div className={styles.infoIcon}><item.icon /></div>
                <div className={styles.infoContent}>
                  <span className={styles.infoLabel}>{item.label}</span>
                  {item.href ? (
                    <a
                      className={styles.infoValue}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className={styles.infoValue}>{item.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Contact form */}
        <div className={styles.formCard}>
          {sent ? (
            <div className={styles.successState}>
              <div className={styles.successIcon}><Icons.Check /></div>
              <h3 className={styles.successTitle}>Message Sent!</h3>
              <p className={styles.successText}>
                Thanks for reaching out. I'll get back to you soon.
              </p>
              <button
                className={styles.resetBtn}
                onClick={() => { setSent(false); setForm({ name:"", email:"", subject:"", message:"" }); }}
                type="button"
              >
                Send Another
              </button>
            </div>
          ) : (
            <form className={styles.formBody} onSubmit={handleSubmit} noValidate>
              <h2 className={styles.formTitle}>Send a Message</h2>

              <div className={styles.formRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Name <span className={styles.req}>*</span></label>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange("name")}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Email <span className={styles.req}>*</span></label>
                  <input
                    className={styles.input}
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange("email")}
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Subject</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange("subject")}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Message <span className={styles.req}>*</span></label>
                <textarea
                  className={`${styles.input} ${styles.textarea}`}
                  placeholder="Your message here…"
                  value={form.message}
                  onChange={handleChange("message")}
                  rows={5}
                  required
                />
              </div>

              <button
                className={`${styles.submitBtn} ${sending ? styles.submitting : ""}`}
                type="submit"
                disabled={sending}
              >
                {sending ? (
                  <><span className={styles.spinner} /> Sending…</>
                ) : (
                  <><Icons.Send /> Send Message</>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}