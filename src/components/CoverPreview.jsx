import { useEffect, useRef, useState, useCallback } from "react";
import { DEPARTMENTS } from "../data/departments";
import styles from "./CoverPreview.module.css";

const A4W      = 794;
const A4H      = 1123;
const INSET    = 18;    // dashed border distance from page edge (all 4 sides equal)
const H_PAD    = 52;    // content horizontal padding inside border
const V_PAD_TOP = 38;
const V_PAD_BOT = 32;
const INNER_W  = A4W - INSET * 2 - H_PAD * 2; // ≈ 652 px usable width

const FONT_INJECT = `
  @import url('https://fonts.googleapis.com/css2?family=Tinos:ital,wght@0,400;0,700;1,400;1,700&display=swap');
`;

const TNR = "'Times New Roman', 'Tinos', Times, serif";

export function CoverPreview({ values, previewId }) {
  const studentDept     = DEPARTMENTS.find((d) => d.id === values.studentDepartment);
  const teacherDept     = DEPARTMENTS.find((d) => d.id === values.teacherDepartment);
  const studentDeptName = studentDept?.fullName ?? "";
  const teacherDeptName = teacherDept?.fullName ?? "";
  const faculty         = studentDept?.faculty ?? "Faculty of Engineering and Technology";

  /* Flash overlay on field change */
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

  /* Scale A4 canvas to fit the preview pane */
  const paneRef = useRef(null);
  const [scale, setScale] = useState(0.55);

  const recalcScale = useCallback(() => {
    if (!paneRef.current) return;
    const h = paneRef.current.clientHeight - 80;
    const w = paneRef.current.clientWidth  - 48;
    setScale(Math.min(h / A4H, w / A4W, 0.72));
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

      {/* ── Top bar ── */}
      <div className={styles.previewTopBar}>
        <span className={styles.previewLabel}>
          <span className={styles.liveDot} />
          Live Preview
        </span>
        <span className={styles.previewBadge}>A4 · PDF Ready</span>
      </div>

      {/* ── Scaled A4 clip wrapper ── */}
      <div
        className={styles.a4Wrapper}
        style={{ width: A4W * scale, height: A4H * scale, flexShrink: 0, overflow: "hidden" }}
      >
        {flash && <div className={styles.flashOverlay} key={Date.now()} />}

        {/* ─────────────── A4 Sheet ─────────────── */}
        <div
          id={previewId}
          style={{
            position:        "relative",
            width:           A4W,
            height:          A4H,
            background:      "#ffffff",
            fontFamily:      TNR,
            color:           "#000000",
            boxSizing:       "border-box",
            transform:       `scale(${scale})`,
            transformOrigin: "top left",
            flexShrink:      0,
          }}
        >
          {/* Inject Tinos font so browsers render TNR correctly */}
          <style>{FONT_INJECT}</style>

          {/* ── Single dashed border — SVG rect guarantees perfectly equal
               dash/gap on all four sides with no corner artefacts ── */}
          <svg
            style={{
              position:      "absolute",
              top:  0,
              left: 0,
              width:         A4W,
              height:        A4H,
              display:       "block",
              pointerEvents: "none",
              zIndex:        10,
            }}
            viewBox={`0 0 ${A4W} ${A4H}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x={INSET}
              y={INSET}
              width={A4W  - INSET * 2}
              height={A4H - INSET * 2}
              fill="none"
              stroke="#000000"
              strokeWidth="2"
              strokeDasharray="9 5"
              strokeLinecap="butt"
              strokeLinejoin="miter"
            />
          </svg>

          {/* ─────────── Content container ─────────── */}
          <div
            style={{
              position:      "absolute",
              top:           INSET + V_PAD_TOP,
              left:          INSET + H_PAD,
              width:         INNER_W,
              bottom:        INSET + V_PAD_BOT,
              display:       "flex",
              flexDirection: "column",
              alignItems:    "center",
              boxSizing:     "border-box",
              overflow:      "hidden",
            }}
          >
            {/* Logo */}
            <div style={{ marginBottom: 16, flexShrink: 0 }}>
              <img
                src="/logo.png"
                alt="PUST Logo"
                style={{ width: 108, height: 108, objectFit: "contain", display: "block" }}
                crossOrigin="anonymous"
              />
            </div>

            {/* University / Faculty / Department */}
            <div style={{ width: INNER_W, textAlign: "center", marginBottom: 26, flexShrink: 0 }}>
              <p style={{ fontFamily: TNR, fontSize: "19pt", fontWeight: "normal", margin: "0 0 5px", lineHeight: 1.25 }}>
                Pabna University of Science and Technology
              </p>
              <p style={{ fontFamily: TNR, fontSize: "13pt", fontWeight: "bold", margin: "0 0 3px", lineHeight: 1.3 }}>
                {faculty}
              </p>
              <p style={{ fontFamily: TNR, fontSize: "13pt", fontWeight: "bold", color: "#8B0000", margin: 0, lineHeight: 1.3 }}>
                Department of {studentDeptName || <em style={{ color: "#aaa" }}>Department</em>}
              </p>
            </div>

            {/* Course info */}
            <div style={{ width: INNER_W, textAlign: "center", marginBottom: 24, flexShrink: 0 }}>
              <p style={{ fontFamily: TNR, fontSize: "14pt", fontWeight: "bold", margin: "0 0 3px" }}>
                Course Title: {ph(values.courseTitle, "Course Title")}
              </p>
              <p style={{ fontFamily: TNR, fontSize: "14pt", fontWeight: "bold", margin: "0 0 14px" }}>
                Course Code: {ph(values.courseCode, "Course Code")}
              </p>
              <p style={{ fontFamily: TNR, fontSize: "14pt", fontWeight: "bold", margin: "0 0 6px" }}>
                Assignment on
              </p>
              <p style={{ fontFamily: TNR, fontSize: "12pt", fontWeight: "normal", margin: 0 }}>
                {ph(values.assignmentTopic, "Assignment Topic")}
              </p>
            </div>

            {/* Submitted By / To table */}
            <table
              style={{
                width:          INNER_W,
                borderCollapse: "collapse",
                tableLayout:    "fixed",
                flexShrink:     0,
                fontFamily:     TNR,
              }}
            >
              <colgroup>
                <col style={{ width: Math.floor(INNER_W / 2) }} />
                <col style={{ width: Math.ceil(INNER_W / 2) }} />
              </colgroup>
              <tbody>
                <tr>
                  {/* Submitted By */}
                  <td style={{
                    border:        "1.5px solid #000",
                    padding:       "12px 15px",
                    verticalAlign: "top",
                    fontFamily:    TNR,
                    fontSize:      "10.5pt",
                    lineHeight:    1.85,
                  }}>
                    <p style={{ fontFamily: TNR, fontWeight: "bold", textDecoration: "underline", margin: "0 0 5px", fontSize: "11.5pt" }}>
                      Submitted By:
                    </p>
                    <p style={{ margin: "0 0 1px", fontFamily: TNR }}>
                      <strong>Name:</strong> {ph(values.studentName, "Student Name")}
                    </p>
                    <p style={{ margin: "0 0 1px", fontFamily: TNR }}>
                      <strong>Roll No:</strong> {ph(values.studentRoll, "Roll No")}
                    </p>
                    <p style={{ margin: "0 0 1px", fontFamily: TNR }}>
                      <strong>Registration:</strong> {ph(values.studentRegistration, "Registration")}
                    </p>
                    <p style={{ margin: "0 0 1px", fontFamily: TNR }}>
                      <strong>Session:</strong> {ph(values.session, "Session")}
                    </p>
                    <p style={{ margin: "0 0 3px", fontFamily: TNR, fontWeight: "bold" }}>
                      {values.year || "3rd"} Year {values.semester || "1st"} Semester
                    </p>
                    <p style={{ margin: 0, fontFamily: TNR }}>
                      Department of {studentDeptName || "Department"}
                    </p>
                  </td>

                  {/* Submitted To */}
                  <td style={{
                    border:        "1.5px solid #000",
                    borderLeft:    "none",
                    padding:       "12px 15px",
                    verticalAlign: "top",
                    fontFamily:    TNR,
                    fontSize:      "10.5pt",
                    lineHeight:    1.85,
                  }}>
                    <p style={{ fontFamily: TNR, fontWeight: "bold", textDecoration: "underline", margin: "0 0 5px", fontSize: "11.5pt" }}>
                      Submitted To:
                    </p>
                    <p style={{ margin: "0 0 1px", fontFamily: TNR }}>
                      <strong>Name:</strong> {ph(values.teacherName, "Teacher Name")}
                    </p>
                    <p style={{ margin: "0 0 1px", fontFamily: TNR }}>
                      {values.designation || "Lecturer"},
                    </p>
                    <p style={{ margin: "0 0 1px", fontFamily: TNR }}>
                      Department of {teacherDeptName || <em style={{ color: "#aaa" }}>Department</em>},
                    </p>
                    <p style={{ margin: 0, fontFamily: TNR }}>
                      Pabna University of Science and Technology
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            {/* Submission date */}
            <div style={{ width: INNER_W, textAlign: "center", marginTop: 28, flexShrink: 0 }}>
              <p style={{ fontFamily: TNR, fontSize: "13pt", fontWeight: "bold", margin: 0 }}>
                Date of submission: {ph(values.dateOfSubmission, "DD.MM.YYYY")}
              </p>
            </div>

          </div>{/* /content */}
        </div>{/* /A4 sheet */}
      </div>{/* /clip wrapper */}
    </div>
  );
}