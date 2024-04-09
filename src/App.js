import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import StudentManagement from "./pages/StudentManagement";
import SeatChange from "./pages/SeatChange";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        >
          {/* Main page and nested routes */}
          <Route index element={<StudentManagement />} />
          <Route path="/student-management" element={<StudentManagement />} />
          <Route path="/seat-change" element={<SeatChange />} />
          {/* 다른 보호된 라우트들 */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
