import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../service/apiService";
import AuthStore from "../../stores/AuthStore";

function CreatePost() {
  const [form, setForm] = useState({
    postType: "",
    title: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!form.postType || !form.title || !form.content) {
      setError("모든 필드를 채워주세요.");
      setIsLoading(false);
      return;
    }

    try {
      const newPost = {
        ...form,
        teacherId: AuthStore.user._id,
        username: AuthStore.user.username,
      };
      await createPost(newPost);

      alert("게시글이 성공적으로 작성되었습니다.");
      navigate("/board");
    } catch (err) {
      setError("게시글 작성 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">자유 게시판</h1>

        <div className="bg-green-50 p-4 rounded-lg mb-6 flex items-center">
          <svg
            className="w-6 h-6 text-green-600 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-green-700">
            매너를 지키며 자유롭게 이야기해 주세요.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex space-x-4">
            <div className="w-1/3">
              <label className="block mb-2 font-semibold">게시글 타입</label>
              <select
                className="w-full p-2 border rounded"
                name="postType"
                value={form.postType}
                onChange={handleChange}
              >
                <option value="">게시글 타입을 선택해주세요</option>
                <option value="about">요즘 우리 학교는</option>
                <option value="teacher">선생님 사용 후기</option>
                <option value="student">학생 사용 후기</option>
                <option value="notification">공지사항</option>
              </select>
            </div>

            <div className="w-2/3">
              <label className="block mb-2 font-semibold">제목</label>
              <input
                type="text"
                name="title"
                className="w-full p-2 border rounded"
                placeholder="제목을 입력해주세요"
                value={form.title}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              className="bloc
            k mb-2 font-semibold"
            >
              게시글 작성
            </label>
            <textarea
              name="content"
              className="w-full p-2 border rounded h-64 resize-none"
              placeholder="1500자 이내로 작성해주세요"
              value={form.content}
              onChange={handleChange}
            ></textarea>
            <div className="text-right text-sm text-gray-500 mt-1">
              {form.content.length}/1500
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-[#397358] text-white rounded hover:bg-green-700"
            >
              작성하기
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              취소하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
