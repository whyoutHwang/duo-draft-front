import React from "react";
import StudentCard from "./StudentCard";
import StudentListItem from "./StudentListItem";

const StudentList = ({ students, viewMode, onStudentClick }) => (
  <div
    className={`max-w-7xl mx-auto ${
      viewMode === "card"
        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 justify-items-center"
        : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
    }`}
    style={viewMode === "list" ? { gap: "1rem 2rem" } : {}}
  >
    {students.map((student) =>
      viewMode === "card" ? (
        <StudentCard
          key={student._id}
          student={student}
          onClick={onStudentClick}
        />
      ) : (
        <StudentListItem
          key={student._id}
          student={student}
          onClick={onStudentClick}
        />
      )
    )}
  </div>
);

export default StudentList;
