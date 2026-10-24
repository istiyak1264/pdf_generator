import { useState, useCallback } from "react";
import { DEPARTMENTS } from "../data/departments";
import { DEFAULT_COVER_STYLE } from "../data/coverStyles";

const today = new Date();
const formattedToday = `${String(today.getDate()).padStart(2, "0")}.${String(
  today.getMonth() + 1
).padStart(2, "0")}.${today.getFullYear()}`;

const INITIAL_STATE = {
  coverStyle: DEFAULT_COVER_STYLE,
  courseTitle: "",
  courseCode: "",
  assignmentType: "Assignment",
  assignmentTopic: "",
  studentName: "",
  studentRoll: "",
  studentRegistration: "",
  session: "",
  year: "1st",
  semester: "1st",
  studentDepartment: DEPARTMENTS[0].id,
  teacherName: "",
  designation: "Lecturer",
  teacherDepartment: DEPARTMENTS[0].id,
  dateOfSubmission: formattedToday,
};

export function useForm() {
  const [values, setValues] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const validate = useCallback(() => {
    const required = [
      "courseTitle",
      "courseCode",
      "assignmentTopic",
      "studentName",
      "studentRoll",
      "studentRegistration",
      "session",
      "teacherName",
    ];

    const newErrors = {};
    required.forEach((field) => {
      if (!values[field]?.trim()) {
        newErrors[field] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [values]);

  const reset = useCallback(() => {
    // keep the chosen cover style when clearing the form
    setValues((prev) => ({ ...INITIAL_STATE, coverStyle: prev.coverStyle }));
    setErrors({});
  }, []);

  return { values, errors, handleChange, validate, reset };
}