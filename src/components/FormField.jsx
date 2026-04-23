import styles from "./FormField.module.css";

export function FormField({ label, error, required, children }) {
  return (
    <div className={`${styles.field} ${error ? styles.hasError : ""}`}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      {children}
      {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  );
}

export function Input({ error, ...props }) {
  return (
    <input
      className={`${styles.input} ${error ? styles.inputError : ""}`}
      {...props}
    />
  );
}

export function Select({ error, children, ...props }) {
  return (
    <select
      className={`${styles.input} ${styles.select} ${
        error ? styles.inputError : ""
      }`}
      {...props}
    >
      {children}
    </select>
  );
}