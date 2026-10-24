/*
 * Alternative A4 cover layouts. Each sheet fills the 794 × 1123 px preview
 * canvas (position: absolute, inset 0) and is rendered inside #cover-page-preview,
 * so the same element is captured for the PDF.
 */

const GARA = "'EB Garamond', Garamond, Georgia, serif";

const FILL = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
};

/* ───────────────────────── Ornamental Frame (maroon) ───────────────────────── */

const MAROON = "#6b1f2a";

function Diamond({ pos }) {
  return (
    <div
      style={{
        position: "absolute",
        width: 24,
        height: 24,
        background: "#fffdf8",
        border: `2px solid ${MAROON}`,
        transform: "rotate(45deg)",
        ...pos,
      }}
    />
  );
}

export function OrnamentalSheet({ values, faculty, studentDeptName, teacherDeptName, ph }) {
  return (
    <div
      style={{
        ...FILL,
        background: "#fffdf8",
        color: "#1c1a16",
        fontFamily: GARA,
        padding: 30,
      }}
    >
      <div style={{ position: "absolute", left: 30, top: 30, right: 30, bottom: 30, border: `2px solid ${MAROON}` }} />
      <div style={{ position: "absolute", left: 40, top: 40, right: 40, bottom: 40, border: `1px solid ${MAROON}` }} />
      <Diamond pos={{ left: 24, top: 24 }} />
      <Diamond pos={{ right: 24, top: 24 }} />
      <Diamond pos={{ left: 24, bottom: 24 }} />
      <Diamond pos={{ right: 24, bottom: 24 }} />

      <div
        style={{
          position: "relative",
          height: "100%",
          boxSizing: "border-box",
          padding: "54px 70px 46px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <img
          src="/logo.png"
          alt="PUST Logo"
          crossOrigin="anonymous"
          style={{ width: 100, height: 100, objectFit: "contain", flexShrink: 0 }}
        />
        <div style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.2, marginTop: 14, color: MAROON }}>
          Pabna University of Science and Technology
        </div>
        <div style={{ fontSize: 18, fontStyle: "italic", marginTop: 6 }}>{faculty}</div>
        <div style={{ fontSize: 19, fontWeight: 500, letterSpacing: 3, textTransform: "uppercase", marginTop: 4 }}>
          Department of {studentDeptName || ph("", "Department")}
        </div>

        {/* divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 30, width: 300, flexShrink: 0 }}>
          <div style={{ flex: 1, height: 1, background: MAROON }} />
          <div style={{ width: 9, height: 9, background: MAROON, transform: "rotate(45deg)" }} />
          <div style={{ flex: 1, height: 1, background: MAROON }} />
        </div>

        <div style={{ marginTop: 52, fontSize: 20, fontStyle: "italic" }}>
          {values.assignmentType || "Assignment"} on
        </div>
        <div style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.25, marginTop: 10, maxWidth: 540 }}>
          {ph(values.assignmentTopic, "Topic Name")}
        </div>
        <div style={{ marginTop: 34, fontSize: 20, lineHeight: 1.6 }}>
          <div>Course Title: <b>{ph(values.courseTitle, "Course Title")}</b></div>
          <div>Course Code: <b>{ph(values.courseCode, "Course Code")}</b></div>
        </div>

        <div style={{ flex: 1, minHeight: 24 }} />

        <div style={{ width: "100%", display: "flex", fontSize: 18, lineHeight: 1.5, textAlign: "left", flexShrink: 0 }}>
          <div style={{ flex: 1, minWidth: 0, paddingRight: 28, borderRight: `1px solid ${MAROON}` }}>
            <div style={{ fontSize: 17, fontStyle: "italic", color: MAROON, marginBottom: 6 }}>Submitted by</div>
            <div style={{ fontWeight: 700, fontSize: 20 }}>{ph(values.studentName, "Student Name")}</div>
            <div>Roll: {ph(values.studentRoll, "Roll No")}</div>
            <div>Registration: {ph(values.studentRegistration, "Registration")}</div>
            <div>Session: {ph(values.session, "Session")}</div>
            <div>{values.year || "1st"} Year, {values.semester || "1st"} Semester</div>
            <div>Department of {studentDeptName || ph("", "Department")}</div>
          </div>
          <div style={{ flex: 1, minWidth: 0, paddingLeft: 28 }}>
            <div style={{ fontSize: 17, fontStyle: "italic", color: MAROON, marginBottom: 6 }}>Submitted to</div>
            <div style={{ fontWeight: 700, fontSize: 20 }}>{ph(values.teacherName, "Teacher's Name")}</div>
            <div>{values.designation || "Designation"}</div>
            <div>Department of {teacherDeptName || ph("", "Department")}</div>
            <div>Pabna University of Science and Technology</div>
          </div>
        </div>

        <div style={{ marginTop: 36, fontSize: 19, fontStyle: "italic", flexShrink: 0 }}>
          Date of submission: <b style={{ fontStyle: "normal" }}>{ph(values.dateOfSubmission, "DD.MM.YYYY")}</b>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Corner Brackets (green) ───────────────────────── */

const GREEN = "#1f4d3a";

function Bracket({ pos, borders }) {
  return (
    <div
      style={{
        position: "absolute",
        width: 74,
        height: 74,
        ...borders,
        ...pos,
      }}
    />
  );
}

const B = `5px solid ${GREEN}`;

const LABEL = {
  fontSize: 16,
  letterSpacing: 3,
  textTransform: "uppercase",
  color: GREEN,
  fontWeight: 700,
  marginBottom: 8,
};

export function BracketsSheet({ values, faculty, studentDeptName, teacherDeptName, ph }) {
  return (
    <div
      style={{
        ...FILL,
        background: "#fbfaf5",
        color: "#17231c",
        fontFamily: GARA,
        padding: 36,
      }}
    >
      <div style={{ position: "absolute", left: 36, top: 36, right: 36, bottom: 36, border: `1px solid ${GREEN}` }} />
      <Bracket pos={{ left: 36, top: 36 }} borders={{ borderTop: B, borderLeft: B }} />
      <Bracket pos={{ right: 36, top: 36 }} borders={{ borderTop: B, borderRight: B }} />
      <Bracket pos={{ left: 36, bottom: 36 }} borders={{ borderBottom: B, borderLeft: B }} />
      <Bracket pos={{ right: 36, bottom: 36 }} borders={{ borderBottom: B, borderRight: B }} />

      <div
        style={{
          position: "relative",
          height: "100%",
          boxSizing: "border-box",
          padding: "52px 72px 44px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <img
          src="/logo.png"
          alt="PUST Logo"
          crossOrigin="anonymous"
          style={{ width: 98, height: 98, objectFit: "contain", flexShrink: 0 }}
        />
        <div style={{ fontSize: 29, fontWeight: 700, lineHeight: 1.2, marginTop: 14, color: GREEN }}>
          Pabna University of Science and Technology
        </div>
        <div style={{ fontSize: 17, letterSpacing: 3, textTransform: "uppercase", marginTop: 8 }}>{faculty}</div>
        <div style={{ fontSize: 19, fontStyle: "italic", marginTop: 4 }}>
          Department of {studentDeptName || ph("", "Department")}
        </div>

        <div style={{ marginTop: 70, fontSize: 17, letterSpacing: 5, textTransform: "uppercase", color: GREEN, fontWeight: 700 }}>
          {values.assignmentType || "Assignment"}
        </div>
        <div style={{ marginTop: 16, fontSize: 36, fontWeight: 700, lineHeight: 1.22, maxWidth: 540 }}>
          {ph(values.assignmentTopic, "Topic Name")}
        </div>
        <div style={{ marginTop: 20, width: 80, height: 3, background: GREEN, flexShrink: 0 }} />
        <div style={{ marginTop: 26, fontSize: 21, lineHeight: 1.6 }}>
          <div>{ph(values.courseTitle, "Course Title")}</div>
          <div style={{ fontStyle: "italic" }}>{ph(values.courseCode, "Course Code")}</div>
        </div>

        <div style={{ flex: 1, minHeight: 24 }} />

        <div style={{ width: "100%", display: "flex", gap: 24, fontSize: 18, lineHeight: 1.5, textAlign: "left", flexShrink: 0 }}>
          <div style={{ flex: 1, minWidth: 0, border: `1px solid ${GREEN}`, padding: "16px 20px" }}>
            <div style={LABEL}>Submitted by</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{ph(values.studentName, "Student Name")}</div>
            <div>Roll: {ph(values.studentRoll, "Roll No")}</div>
            <div>Registration: {ph(values.studentRegistration, "Registration")}</div>
            <div>Session: {ph(values.session, "Session")}</div>
            <div>{values.year || "1st"} Year, {values.semester || "1st"} Semester</div>
            <div>Department of {studentDeptName || ph("", "Department")}</div>
          </div>
          <div style={{ flex: 1, minWidth: 0, border: `1px solid ${GREEN}`, padding: "16px 20px" }}>
            <div style={LABEL}>Submitted to</div>
            <div style={{ fontSize: 20, fontWeight: 700 }}>{ph(values.teacherName, "Teacher's Name")}</div>
            <div>{values.designation || "Designation"}</div>
            <div>Department of {teacherDeptName || ph("", "Department")}</div>
            <div>Pabna University of Science and Technology</div>
          </div>
        </div>

        <div style={{ marginTop: 34, fontSize: 19, flexShrink: 0 }}>
          Date of submission: <b>{ph(values.dateOfSubmission, "DD.MM.YYYY")}</b>
        </div>
      </div>
    </div>
  );
}
