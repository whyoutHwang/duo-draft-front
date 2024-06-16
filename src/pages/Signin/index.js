import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authStore from "../../stores/AuthStore";
import { observer } from "mobx-react";

import { signin } from "../../service/apiService";

function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 생성합니다

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await signin(formData);
      authStore.setUser(data.user);
      navigate("/"); // 회원 가입 성공 후 로그인 페이지로 이동
    } catch (error) {
      console.error("Signup failed:", error.message);
      // 에러 처리 로직
    }
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center ">
        <div className="max-w-md w-full bg-[#F2EFE8] p-10 rounded-2xl shadow-md">
          <div>
            <span className="mt-6 font-extrabold text-gray-900">DUO DRAFT</span>
          </div>
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px ">
              <div className="mb-4">
                <label htmlFor="email-address">이메일 주소</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="mt-2 appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="이메일 주소"
                />
              </div>

              <div>
                <label htmlFor="password">비밀번호</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="mt-2 appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="비밀번호"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleSubmit}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#397358] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                로그인
              </button>
            </div>
            <div className="flex items-center justify-end">
              <div className="flex items-start ml-4">
                <div className="text-sm">
                  <button
                    onClick={goToSignup}
                    className="font-medium  hover:text-indigo-500 focus:outline-none"
                  >
                    회원가입
                  </button>
                </div>
              </div>
              |
              <div className="flex items-start">
                <div className="text-sm">
                  <button
                    onClick={goToSignup}
                    className="font-medium hover:text-indigo-500 focus:outline-none"
                  >
                    비밀번호 찾기
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
