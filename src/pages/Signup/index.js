import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../service/apiService";
function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    console.log("formData", formData);
    // event.preventDefault();
    try {
      await signup(formData);
      //   navigate("/signin"); // 회원 가입 성공 후 로그인 페이지로 이동
    } catch (error) {
      console.error("Signup failed:", error.message);
      // 에러 처리 로직
    }
  };

  const goToSignin = () => {
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex justify-center items-center">
      <div className="max-w-lg mx-auto p-8 bg-black bg-opacity-40 rounded-xl shadow-lg text-white">
        <h2 className="text-4xl font-bold mb-2">Become an Ultimate fan</h2>
        <p className="mb-8">
          Test your fan knowledge, interact with other superfans and move up the
          ranks of fandom.
        </p>
        <div className="space-y-4">
          <input
            type="text"
            name="username"
            onChange={handleChange}
            className="w-full p-3 rounded bg-white bg-opacity-10 text-white placeholder-gray-300"
            placeholder="Username"
          />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            className="w-full p-3 rounded bg-white bg-opacity-10 text-white placeholder-gray-300"
            placeholder="Email Address"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            className="w-full p-3 rounded bg-white bg-opacity-10 text-white placeholder-gray-300"
            placeholder="Password"
          />
          <button
            onClick={handleSubmit}
            className="w-full p-3 rounded bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold"
          >
            CONTINUE
          </button>
        </div>
        <div className="mt-4 text-center">
          <a
            onClick={() => navigate("/signin")}
            className="text-blue-200 hover:underline cursor-pointer"
          >
            Have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default Signup;
