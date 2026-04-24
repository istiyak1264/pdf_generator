import styles from "./About.module.css";

export function AboutPage() {
  return (
    <main className={styles.page}>
      <div className={styles.ambientBg} />
      <section className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>About the Project</h2>
          <p className={styles.subtitle}>CoverGen · PUST Version 2.0</p>
        </header>
        
        <div className={styles.contentCard}>
          <div className={styles.cardSection}>
            <h3 className={styles.sectionTitle}>Purpose</h3>
            <p className={styles.text}>
              An automated tool designed for PUST students to generate 
              professional cover pages with BST synchronization.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}