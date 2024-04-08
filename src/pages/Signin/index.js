import React from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 생성합니다

  const goToSignup = () => {
    navigate("/signup"); // '/signup' 경로로 이동하는 함수입니다
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-10">
        <div className="max-w-md w-full">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              로그인
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Welcome back! Please login to your account.
            </p>
          </div>
          <form className="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label for="email-address" className="sr-only">
                  이메일 주소
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="이메일 주소"
                />
              </div>
              <div>
                <label for="password" className="sr-only">
                  비밀번호
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="비밀번호"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  for="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  기억하기
                </label>
              </div>

              <div className="flex items-start">
                <div className="text-sm">
                  <button
                    onClick={goToSignup} // onClick 이벤트에 함수를 연결합니다
                    className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                  >
                    회원가입
                  </button>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                로그인
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex-1 bg-gradient-to-r from-purple-500 to-indigo-500 p-10 text-white flex items-center justify-center">
        <h1 className="text-4xl font-bold">Welcome Back!</h1>
      </div>
    </div>
  );
}

export default Signin;
