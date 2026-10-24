import { Children, cloneElement, isValidElement, useId } from "react";
import styles from "./FormField.module.css";

export function FormField({ label, error, required, children }) {
  const id = useId();

  // Link the <label> to its control so clicking the label focuses it
  // and screen readers announce the field name.
  const control = Children.only(children);
  const field = isValidElement(control)
    ? cloneElement(control, {
        id: control.props.id ?? id,
        "aria-invalid": error ? true : undefined,
      })
    : control;

  return (
    <div className={`${styles.field} ${error ? styles.hasError : ""}`}>
      <label className={styles.label} htmlFor={control.props?.id ?? id}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      {field}
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
