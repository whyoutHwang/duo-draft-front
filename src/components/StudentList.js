import React from "react";
import StudentCard from "./StudentCard";
import StudentListItem from "./StudentListItem";

const StudentList = ({ students, viewMode }) => (
  <div
    className={`${
      viewMode === "card" ? "grid grid-cols-6 gap-4" : "grid grid-cols-2"
    }`}
    style={viewMode === "list" ? { gap: "1rem 2rem" } : {}}
  >
    {students.map((student) =>
      viewMode === "card" ? (
        <StudentCard key={student._id} student={student} />
      ) : (
        <StudentListItem key={student._id} student={student} />
      )
    )}
  </div>
);

export default StudentList;
