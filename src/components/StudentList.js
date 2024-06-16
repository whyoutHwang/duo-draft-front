import React from "react";
import StudentCard from "./StudentCard";
import StudentListItem from "./StudentListItem";

const StudentList = ({ students, viewMode, onStudentClick }) => (
  <div
    className={`${
      viewMode === "card"
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 justify-items-center items-center"
        : "grid grid-cols-1 sm:grid-cols-2 justify-items-center items-center"
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
