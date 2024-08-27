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
import ProtectedStudentRoute from "./ProtectedStudentRoute";
import ExcelUpload from "./pages/ExcelUpload";
import Board from "./pages/Board";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";

function App() {
  // console.log("API Base URL:", process.env.REACT_APP_API_BASE_URL);

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
          <Route path="/excel-upload" element={<ExcelUpload />} />
          <Route path="/student-management" element={<StudentManagement />} />
          <Route
            path="/seat-change"
            element={
              <ProtectedStudentRoute>
                <SeatChange />
              </ProtectedStudentRoute>
            }
          />
          <Route
            path="/seat-history"
            element={
              <ProtectedStudentRoute>
                <SeatHistory />
              </ProtectedStudentRoute>
            }
          />
          <Route path="/board" element={<Board />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
