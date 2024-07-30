import React, { useState, useMemo } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { signup } from "../../service/apiService";
import styles from "./Signup.module.css";

import Yellow from "../../assets/image/character/Yellow.png";
import Red from "../../assets/image/character/Red.png";
import Green from "../../assets/image/character/Green.png";
import Pink1 from "../../assets/image/character/Pink-1.png";
import LightGreen from "../../assets/image/character/LightGreen.png";
import Skin from "../../assets/image/character/Skin.png";
import Yellow2 from "../../assets/image/character/Yellow_2.png";
import LightPurple from "../../assets/image/character/LightPurple.png";
import Mint from "../../assets/image/character/Mint.png";
import LightBrown from "../../assets/image/character/LightBrown.png";
import Purple from "../../assets/image/character/Purple.png";
import Gray from "../../assets/image/character/Gray.png";
import Orange from "../../assets/image/character/Orange.png";
import Pink from "../../assets/image/character/Pink.png";
import LOGO from "../../assets/image/logo/logo.svg";

Modal.setAppElement("#root");

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const navigate = useNavigate();

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

  const getRandomPosition = () => ({
    top: `${Math.random() * 80}%`,
    left: `${Math.random() * 80}%`,
    transform: `rotate(${Math.random() * 360}deg)`,
  });

  // 캐릭터 위치를 메모이제이션
  const characterPositions = useMemo(() => {
    return characters.map(() => getRandomPosition());
  }, []); // 빈 의존성 배열로 컴포넌트 마운트 시 한 번만 실행

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signup(formData);
      setSignupSuccess(true);
      // navigate("/signin"); // 회원 가입 성공 후 로그인 페이지로 이동
    } catch (error) {
      console.error("Signup failed:", error.message);
      // 에러 처리 로직
    }
  };

  const openModal = (title, content) => {
    console.log(content);
    setModalTitle(title);
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  const randomCharacter = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
  }, []);

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
      <div
        className="flex-1 flex items-center justify-center "
        style={{ zIndex: 10 }}
      >
        <div className="max-w-lg w-full bg-[#F2EFE8] p-10 rounded-2xl shadow-md">
          {signupSuccess ? (
            <div className="text-center">
              <div
                style={{ width: "300px", height: "300px" }}
                className="mx-auto"
              >
                <img
                  src={randomCharacter.src}
                  alt={randomCharacter.alt}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="mt-4">회원가입 완료!</p>
              <button
                onClick={() => navigate("/signin")}
                className="mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#397358] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#397358]"
              >
                로그인 페이지로 이동
              </button>
            </div>
          ) : (
            <form className="space-y-6 " onSubmit={handleSubmit}>
              <div className="flex items-center">
                <img
                  src={LOGO}
                  alt={"logo"}
                  className="w-8 h-8 object-contain"
                />
                <span className="ml-4 font-extrabold text-gray-900">
                  회원가입
                </span>
              </div>
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm">
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
                <div className="mb-4">
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
                <div className="mb-4">
                  <label htmlFor="password-confirm">비밀번호 확인하기</label>
                  <input
                    id="password-confirm"
                    name="passwordConfirm"
                    type="password"
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                    className="mt-2 appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#397358] focus:border-[#397358] sm:text-sm"
                    placeholder="비밀번호"
                  />
                </div>
              </div>
              <div className="mt-8">
                <div className="flex items-center">
                  <img
                    src={LOGO}
                    alt={"logo"}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="ml-4 font-extrabold text-gray-900">
                    약관동의
                  </span>
                </div>
                <div className="mt-4">
                  <label className="flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="terms1"
                        onChange={handleChange}
                        required
                        className={styles.customCheckbox}
                      />
                      <span className="ml-2">
                        <span style={{ color: "#397358" }}>[필수] </span>
                        이용약관
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => openModal("이용약관", "이용약관 내용...")}
                      style={{ color: "#397358" }}
                      className="ml-2 text-sm"
                    >
                      [이용약관 보기]
                    </button>
                  </label>
                </div>
                <div className="mt-4">
                  <label className="flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="terms2"
                        onChange={handleChange}
                        required
                        className={styles.customCheckbox}
                      />
                      <span className="ml-2">
                        <span style={{ color: "#397358" }}>[필수] </span>
                        개인정보 수집 맟 이용
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        openModal(
                          "개인정보 수집 맟 이용",
                          "개인정보 수집 및 이용 내용..."
                        )
                      }
                      style={{ color: "#397358" }}
                      className="ml-2 text-sm"
                    >
                      [개인정보 수집 보기]
                    </button>
                  </label>
                </div>
              </div>
              <div></div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#397358] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#397358]"
                >
                  모두 동의하고 시작하기
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Terms Modal"
        className="flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="bg-white p-6 rounded-lg max-w-lg mx-auto">
          <h4 className="font-bold mb-4">
            <span style={{ color: "#397358" }}>[필수] </span>
            {modalTitle}
          </h4>
          <div className="text-gray-700">{modalContent}</div>
          <button
            onClick={closeModal}
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#397358] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#397358]"
          >
            닫기
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Signup;
