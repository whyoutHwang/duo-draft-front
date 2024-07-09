import React from "react";
import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import StudentStore from "./stores/StudentStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProtectedStudentRoute = observer(({ children }) => {
  if (!StudentStore.hasStudents) {
    toast.error("학생을 먼저 등록해주세요!");
    return <Navigate to="/student-management" replace />;
  }

  return children;
});

export default ProtectedStudentRoute;
