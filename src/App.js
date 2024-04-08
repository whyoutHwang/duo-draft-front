import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Main from "./pages/Main";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/main" element={<Main />} />
        <Route path="/" element={<Signin />} />
        {/* <Route path="/" exact component={() => <div>Home Page</div>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
