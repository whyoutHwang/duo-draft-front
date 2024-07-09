import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import authStore from "../../stores/AuthStore";
import { observer } from "mobx-react";

import { signin } from "../../service/apiService";

import Yellow from "../../assets/image/character/Yellow.png";
import Red from "../../assets/image/character/Red.png";
import Green from "../../assets/image/character/Green.png";
import Pink1 from "../../assets/image/character/Pink-1.png";
import LightGreen from "../../assets/image/character/Light Green.png";
import Skin from "../../assets/image/character/Skin.png";
import Yellow2 from "../../assets/image/character/Yellow_2.png";
import LightPurple from "../../assets/image/character/Light Purple.png";
import Mint from "../../assets/image/character/Mint.png";
import LightBrown from "../../assets/image/character/Light Brown.png";
import Purple from "../../assets/image/character/Purple.png";
import Gray from "../../assets/image/character/Gray.png";
import Orange from "../../assets/image/character/Orange.png";
import Pink from "../../assets/image/character/Pink.png";
import LOGO from "../../assets/image/logo/logo.svg";

function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 생성합니다

  // 캐릭터 배열
  const characters = [
    { src: Yellow, alt: "Yellow Character" },
    { src: Red, alt: "Red Character" },
    { src: Green, alt: "Green Character" },
    { src: Pink1, alt: "Pink Character 1" },
    { src: LightGreen, alt: "Light Green Character" },
    { src: Skin, alt: "Skin Character" },
    { src: Yellow2, alt: "Yellow Character 2" },
    { src: LightPurple, alt: "Light Purple Character" },
    { src: Mint, alt: "Mint Character" },
    { src: LightBrown, alt: "Light Brown Character" },
    { src: Purple, alt: "Purple Character" },
    { src: Gray, alt: "Gray Character" },
    { src: Orange, alt: "Orange Character" },
    { src: Pink, alt: "Pink Character" },
  ];

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const getRandomPosition = () => ({
    top: `${Math.random() * 80}%`,
    left: `${Math.random() * 80}%`,
    transform: `rotate(${Math.random() * 360}deg)`,
  });

  // 캐릭터 위치를 메모이제이션
  const characterPositions = useMemo(() => {
    return characters.map(() => getRandomPosition());
  }, []); // 빈 의존성 배열로 컴포넌트 마운트 시 한 번만 실행

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
      {characters.map((char, index) => (
        <img
          key={index}
          src={char.src}
          alt={char.alt}
          className="absolute w-32 h-32 object-contain"
          style={characterPositions[index]}
        />
      ))}
      <div className="flex-1 flex items-center justify-center ">
        <div
          className="max-w-md w-full bg-[#F2EFE8] p-10 rounded-2xl shadow-md"
          style={{ zIndex: 10 }}
        >
          <div className="flex items-center">
            <img src={LOGO} alt={"logo"} className="w-8 h-8 object-contain" />
            <span className="ml-4 font-extrabold text-gray-900">로그인</span>
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
                  className="mt-2 appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#397358] focus:border-[#397358] sm:text-sm"
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
                  className="mt-2 appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#397358] focus:border-[#397358] sm:text-sm"
                  placeholder="비밀번호"
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleSubmit}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#397358] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#397358]"
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
