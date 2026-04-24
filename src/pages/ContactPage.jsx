import { useState } from "react";
import styles from "./ContactPage.module.css";

const Icons = {
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
  Facebook: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Linkedin: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
};

const CONTACT_INFO = [
  {
    icon: Icons.Facebook,
    label: "Facebook",
    value: "facebook.com/istiyakahmed.cse15.pust",
    href: "https://www.facebook.com/istiyakahmed.cse15.pust",
  },
  {
    icon: Icons.Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/istiyak1264",
    href: "https://linkedin.com/in/istiyak1264",
  },
  {
    icon: Icons.MapPin,
    label: "Location",
    value: "Pabna University of Science & Technology",
    href: "https://www.google.com/maps/dir//Pabna+University+of+Science+and+Technology,+Dhaka+-+Pabna+Hwy,+Pabna+6600/@24.0113252,89.2562229,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x39fe84f0ec23a72b:0x775d6cd53cbdad8b!2m2!1d89.2796812!2d24.0132789?entry=ttu&g_ep=EgoyMDI2MDQyMS4wIKXMDSoASAFQAw%3D%3D",
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
                  <a
                    className={styles.infoValue}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.value}
                  </a>
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