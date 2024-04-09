import React from "react";
import { useAuthRedirect } from "./hooks/useAuthRedirect"; // useAuthRedirect Hook의 올바른 경로로 수정하세요.

const ProtectedRoute = ({ children }) => {
  useAuthRedirect();
  return children;
};

export default ProtectedRoute;
