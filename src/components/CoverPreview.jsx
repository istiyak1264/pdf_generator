import { useEffect, useRef, useState, useCallback } from "react";
import { DEPARTMENTS } from "../data/departments";
import styles from "./CoverPreview.module.css";

/**
 * Right-pane live A4 preview.
 * Scales the A4 sheet to fit the available height without scrolling.
 */
export function CoverPreview({ values, previewId }) {
  const studentDept = DEPARTMENTS.find((d) => d.id === values.studentDepartment);
  const teacherDept = DEPARTMENTS.find((d) => d.id === values.teacherDepartment);
  const studentDeptName = studentDept?.fullName ?? "";
  const teacherDeptName = teacherDept?.fullName ?? "";
  const faculty = studentDept?.faculty ?? "Faculty of Engineering and Technology";

  // Flash on change
  const [flash, setFlash] = useState(false);
  const prevRef = useRef(values);
  useEffect(() => {
    if (prevRef.current !== values) {
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 700);
      prevRef.current = values;
      return () => clearTimeout(t);
    }
  }, [values]);

  // Auto-scale A4 to fit pane
  const paneRef = useRef(null);
  const [scale, setScale] = useState(0.55);

  const recalcScale = useCallback(() => {
    if (!paneRef.current) return;
    const paneH = paneRef.current.clientHeight - 80; // subtract topbar + padding
    const paneW = paneRef.current.clientWidth - 64;
    // A4 at 96dpi: 794px wide, 1123px tall
    const scaleH = paneH / 1123;
    const scaleW = paneW / 794;
    setScale(Math.min(scaleH, scaleW, 0.72));
  }, []);

  useEffect(() => {
    recalcScale();
    const ro = new ResizeObserver(recalcScale);
    if (paneRef.current) ro.observe(paneRef.current);
    return () => ro.disconnect();
  }, [recalcScale]);

  const ph = (text, placeholder) =>
    text || <em style={{ color: "#aaa", fontStyle: "italic" }}>{placeholder}</em>;

  return (
    <div className={styles.previewPane} ref={paneRef}>
      {/* Top bar */}
      <div className={styles.previewTopBar}>
        <span className={styles.previewLabel}>
          <span className={styles.liveDot} />
          Live Preview
        </span>
        <span className={styles.previewBadge}>A4 · PDF Ready</span>
      </div>

      {/* Scaled A4 */}
      <div
        className={styles.a4Wrapper}
        style={{
          width: 794 * scale,
          height: 1123 * scale,
          flexShrink: 0,
        }}
      >
        {flash && <div className={styles.flashOverlay} key={Date.now()} />}

        <div
          id={previewId}
          style={{
            width: 794,
            height: 1123,
            background: "#ffffff",
            padding: "38px 45px",
            fontFamily: "Times New Roman, Times, serif",
            color: "#000000",
            position: "relative",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {/* Dashed border */}
          <div style={{
            position: "absolute", inset: "19px",
            border: "2px dashed #000",
            pointerEvents: "none",
          }} />

          {/* Content */}
          <div style={{
            flex: 1,
            padding: "30px 52px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
            {/* Logo */}
            <div style={{ marginBottom: "22px", marginTop: "12px" }}>
              <img src="/logo.png" alt="PUST Logo"
                style={{ width: "106px", height: "106px", objectFit: "contain", display: "block" }}
                crossOrigin="anonymous"
              />
            </div>

            {/* University + Faculty + Dept */}
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <p style={{ fontSize: "17pt", fontWeight: "normal", marginBottom: "6px", lineHeight: 1.3 }}>
                Pabna University of Science and Technology
              </p>
              <p style={{ fontSize: "13pt", fontWeight: "bold", marginBottom: "5px", lineHeight: 1.3 }}>
                {faculty}
              </p>
              <p style={{ fontSize: "13pt", fontWeight: "bold", color: "#8B0000", lineHeight: 1.3 }}>
                Department of {studentDeptName || <em style={{ color: "#aaa" }}>Department</em>}
              </p>
            </div>

            {/* Course block */}
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <p style={{ fontSize: "14pt", fontWeight: "bold", marginBottom: "6px" }}>
                Course Title: {ph(values.courseTitle, "Course Title")}
              </p>
              <p style={{ fontSize: "14pt", fontWeight: "bold", marginBottom: "14px" }}>
                Course Code: {ph(values.courseCode, "Course Code")}
              </p>
              <p style={{ fontSize: "14pt", fontWeight: "bold" }}>Assignment on</p>
              <p style={{ fontSize: "12pt", fontWeight: "bold", marginTop: "10px" }}>
                {ph(values.assignmentTopic, "Assignment Topic")}
              </p>
            </div>

            {/* Two-column table */}
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "14px" }}>
              <tbody>
                <tr>
                  <td style={{ width: "50%", border: "1.5px solid #000", padding: "14px 18px", verticalAlign: "top", fontSize: "11pt", lineHeight: 1.85 }}>
                    <p style={{ fontWeight: "bold", textDecoration: "underline", marginBottom: "6px", fontSize: "12pt" }}>
                      Submitted By:
                    </p>
                    <p><strong>Name:</strong> {ph(values.studentName, "Student Name")}</p>
                    <p><strong>Roll No:</strong> {ph(values.studentRoll, "Roll No")}</p>
                    <p><strong>Registration:</strong> {ph(values.studentRegistration, "Registration")}</p>
                    <p><strong>Session:</strong> {ph(values.session, "Session")}</p>
                    <p><strong>{values.year || "3rd"} Year {values.semester || "1st"} Semester</strong></p>
                    <p style={{ marginTop: "3px" }}>Department of {studentDeptName}</p>
                  </td>
                  <td style={{ width: "50%", border: "1.5px solid #000", borderLeft: "none", padding: "14px 18px", verticalAlign: "top", fontSize: "11pt", lineHeight: 1.85 }}>
                    <p style={{ fontWeight: "bold", textDecoration: "underline", marginBottom: "6px", fontSize: "12pt" }}>
                      Submitted To:
                    </p>
                    <p><strong>Name:</strong> {ph(values.teacherName, "Teacher Name")}</p>
                    <p>{values.designation || "Lecturer"},</p>
                    <p>Department of {teacherDeptName || <em style={{ color: "#aaa" }}>Department</em>},</p>
                    <p>Pabna University of Science and Technology</p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Date */}
            <div style={{ marginTop: "36px", textAlign: "center" }}>
              <p style={{ fontSize: "13pt", fontWeight: "bold" }}>
                Date of submission: {ph(values.dateOfSubmission, "DD.MM.YYYY")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}