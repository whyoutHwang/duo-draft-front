import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../service/apiService";
import AuthStore from "../../stores/AuthStore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { uploadPostImage } from "../../service/apiService"; // 이미지 업로드 함수 import

function CreatePost() {
  const [form, setForm] = useState({
    postType: "",
    title: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const quillRef = useRef(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleContentChange = (content) => {
    setForm((prevForm) => ({
      ...prevForm,
      content: content,
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

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("multiple", "true");
    input.click();

    input.onchange = async () => {
      const files = Array.from(input.files);

      for (const file of files) {
        try {
          setIsLoading(true);
          const imageData = await uploadPostImage(file);
          console.log(imageData);

          const quill = quillRef.current.getEditor();

          const range = quill.getSelection(true);
          quill.insertEmbed(range.index, "image", imageData.location);
          quill.setSelection(range.index + 1);
        } catch (error) {
          console.error("이미지 업로드 실패:", error);
          setError("이미지 업로드에 실패했습니다.");
        } finally {
          setIsLoading(false);
        }
      }
    };
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

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
            <label className="block mb-2 font-semibold">게시글 작성</label>
            <ReactQuill
              theme="snow"
              ref={quillRef}
              modules={modules}
              formats={formats}
              value={form.content}
              onChange={handleContentChange}
              className="h-64 mb-12"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="px-4 py-2 bg-[#397358] text-white rounded hover:bg-green-700"
              disabled={isLoading}
            >
              {isLoading ? "작성 중..." : "작성하기"}
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              onClick={() => navigate("/board")}
            >
              취소하기
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default CreatePost;
