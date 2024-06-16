import React, { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { signup } from "../../service/apiService";
import styles from "./Signup.module.css";

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

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center ">
        <div className="max-w-lg w-full bg-[#F2EFE8] p-10 rounded-2xl shadow-md">
          <div>
            <span className="mt-6 font-extrabold text-gray-900">DUO DRAFT</span>
          </div>
          {signupSuccess ? (
            <div className="text-center">
              <div style={{ width: "300px", height: "300px" }}></div>
              <p className="mt-4">회원가입 완료!</p>
              <button
                onClick={() => navigate("/signin")}
                className="mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#397358] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                로그인 페이지로 이동
              </button>
            </div>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="mt-8">
                <h4>회원가입</h4>
              </div>
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
                <div>
                  <label htmlFor="password-confirm">비밀번호 확인하기</label>
                  <input
                    id="password-confirm"
                    name="passwordConfirm"
                    type="password"
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                    className="mt-2 appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="비밀번호"
                  />
                </div>
              </div>
              <div className="mt-8">
                <h4>약관동의</h4>
                <div className="mt-4">
                  <label className="flex justify-between items-center">
                    <div className="flex">
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
                    <div className="flex">
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
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#397358] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
            className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#397358] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            닫기
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Signup;
