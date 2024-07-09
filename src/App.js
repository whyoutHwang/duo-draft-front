import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Main from "./pages/Main";
import StudentManagement from "./pages/StudentManagement";
import SeatHistory from "./pages/SeatHistory";
import Setting from "./pages/Setting";
import SeatChange from "./pages/SeatChange";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);

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
          <Route index element={<StudentManagement />} />
          <Route path="/student-management" element={<StudentManagement />} />
          <Route path="/seat-change" element={<SeatChange />} />
          <Route path="/seat-history" element={<SeatHistory />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
