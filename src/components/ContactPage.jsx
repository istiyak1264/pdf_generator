import { useState, useRef } from "react";
import styles from "./ContactPage.module.css";

const Icons = {
  Mail: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Github: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77a5.07 5.07 0 0 0-5-4.77 13.38 13.38 0 0 0-7 0 5.07 5.07 0 0 0-5 4.77 5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  ),
  Send: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  )
};

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => setSending(false), 2000);
  };

  return (
    <main className={styles.page}>
      <div className={styles.ambientBg} />
      <section className={styles.hero}>
        <div className={styles.heroEyebrow}>
          <span className={styles.eyebrowLine} />
          <span className={styles.eyebrowText}>Get in Touch</span>
          <span className={styles.eyebrowLine} />
        </div>
        <h1 className={styles.heroTitle}>Contact Me</h1>
      </section>

      <div className={styles.grid}>
        <div className={styles.formCard}>
          <form className={styles.formBody} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label}>Name</label>
              <input className={styles.input} type="text" placeholder="Your Name" />
            </div>
            <button className={styles.submitBtn} disabled={sending}>
              <Icons.Send /> {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}