import { useState } from "react";
import { FormField, Input, Select } from "./FormField";
import { DEPARTMENTS, YEARS, SEMESTERS, DESIGNATIONS } from "../data/departments";
import styles from "./CoverForm.module.css";

const Icons = {
  Book: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  ),
  User: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  GradCap: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
  Download: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
  ),
};

function Section({ icon: Icon, title, subtitle, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader} onClick={() => setOpen((p) => !p)}>
        <div className={styles.sectionIcon}><Icon /></div>
        <div className={styles.sectionTitleGroup}>
          <h3 className={styles.sectionTitle}>{title}</h3>
          {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
        </div>
        <span className={`${styles.sectionChevron} ${open ? styles.open : ""}`}>
          <Icons.ChevronDown />
        </span>
      </div>
      {open && <div className={styles.sectionFields}>{children}</div>}
    </div>
  );
}

function calcProgress(values) {
  const required = [
    "courseTitle", "courseCode", "assignmentTopic",
    "studentName", "studentRoll", "studentRegistration",
    "session", "teacherName",
  ];
  const filled = required.filter((k) => values[k]?.trim()).length;
  return Math.round((filled / required.length) * 100);
}

export function CoverForm({ values, errors, onChange, onGenerate, onReset, generating }) {
  const handle = (field) => (e) => onChange(field, e.target.value);
  const progress = calcProgress(values);

  return (
    <aside className={styles.panel}>
      {/* ── Progress Header ── */}
      <div className={styles.panelHeader}>
        <div className={styles.progressLabel}>
          <span className={styles.progressText}>Form Completion</span>
          <span className={styles.progressPct}>{progress}%</span>
        </div>
        <div className={styles.progressTrack}>
          <div className={styles.progressBar} style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* ── Scrollable Fields ── */}
      <div className={styles.scrollArea}>
        <Section icon={Icons.Book} title="Course Information" subtitle="Title, code and topic" defaultOpen>
          <FormField label="Course Title" required error={errors.courseTitle}>
            <Input
              placeholder="e.g. Compiler Design"
              value={values.courseTitle}
              onChange={handle("courseTitle")}
              error={errors.courseTitle}
            />
          </FormField>
          <div className={styles.row}>
            <FormField label="Course Code" required error={errors.courseCode}>
              <Input
                placeholder="e.g. CSE 3103"
                value={values.courseCode}
                onChange={handle("courseCode")}
                error={errors.courseCode}
              />
            </FormField>
            <FormField label="Submission Date">
              <Input
                placeholder="DD.MM.YYYY"
                value={values.dateOfSubmission}
                onChange={handle("dateOfSubmission")}
              />
            </FormField>
          </div>
          <FormField label="Assignment Topic" required error={errors.assignmentTopic}>
            <Input
              placeholder="e.g. DFA, NFA, Regex, CFG and CNF"
              value={values.assignmentTopic}
              onChange={handle("assignmentTopic")}
              error={errors.assignmentTopic}
            />
          </FormField>
        </Section>

        <Section icon={Icons.User} title="Submitted By" subtitle="Student identity and class" defaultOpen>
          <FormField label="Student Name" required error={errors.studentName}>
            <Input
              placeholder="e.g. Md. Istiyak Ahmed"
              value={values.studentName}
              onChange={handle("studentName")}
              error={errors.studentName}
            />
          </FormField>
          <div className={styles.row}>
            <FormField label="Roll No." required error={errors.studentRoll}>
              <Input
                placeholder="230103"
                value={values.studentRoll}
                onChange={handle("studentRoll")}
                error={errors.studentRoll}
              />
            </FormField>
            <FormField label="Registration" required error={errors.studentRegistration}>
              <Input
                placeholder="1011988"
                value={values.studentRegistration}
                onChange={handle("studentRegistration")}
                error={errors.studentRegistration}
              />
            </FormField>
          </div>
          <FormField label="Session" required error={errors.session}>
            <Input
              placeholder="e.g. 2022-2023"
              value={values.session}
              onChange={handle("session")}
              error={errors.session}
            />
          </FormField>
          <div className={styles.row}>
            <FormField label="Year">
              <Select value={values.year} onChange={handle("year")}>
                {YEARS.map((y) => <option key={y} value={y}>{y} Year</option>)}
              </Select>
            </FormField>
            <FormField label="Semester">
              <Select value={values.semester} onChange={handle("semester")}>
                {SEMESTERS.map((s) => <option key={s} value={s}>{s} Semester</option>)}
              </Select>
            </FormField>
          </div>
          <FormField label="Department">
            <Select value={values.studentDepartment} onChange={handle("studentDepartment")}>
              {DEPARTMENTS.map((d) => (
                <option key={d.id} value={d.id}>{d.shortName} — {d.fullName}</option>
              ))}
            </Select>
          </FormField>
        </Section>

        <Section icon={Icons.GradCap} title="Submitted To" subtitle="Teacher and department" defaultOpen>
          <FormField label="Teacher's Name" required error={errors.teacherName}>
            <Input
              placeholder="e.g. Nitun Kumar Podder"
              value={values.teacherName}
              onChange={handle("teacherName")}
              error={errors.teacherName}
            />
          </FormField>
          <FormField label="Designation">
            <Select value={values.designation} onChange={handle("designation")}>
              {DESIGNATIONS.map((d) => <option key={d} value={d}>{d}</option>)}
            </Select>
          </FormField>
          <FormField label="Teacher's Department">
            <Select value={values.teacherDepartment} onChange={handle("teacherDepartment")}>
              {DEPARTMENTS.map((d) => (
                <option key={d.id} value={d.id}>{d.shortName} — {d.fullName}</option>
              ))}
            </Select>
          </FormField>
        </Section>
      </div>

      {/* ── Actions ── */}
      <div className={styles.actions}>
        <button className={styles.btnReset} onClick={onReset} type="button">
          Reset
        </button>
        <button
          className={`${styles.btnGenerate} ${generating ? styles.btnGenerating : ""}`}
          onClick={onGenerate}
          type="button"
          disabled={generating}
        >
          {generating ? (
            <><span className={styles.spinner} /> Generating…</>
          ) : (
            <><Icons.Download /> Download PDF</>
          )}
        </button>
      </div>
    </aside>
  );
}