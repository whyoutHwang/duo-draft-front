import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost, deletePost } from "../../service/apiService";
import AuthStore from "../../stores/AuthStore";

const postTypeMap = {
  about: "요즘 우리 학교는",
  teacher: "선생님 사용 후기",
  student: "학생 사용 후기",
  notification: "공지사항",
};

function PostDetail() {
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    postType: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const fetchedPost = await getPostById(id);
        setPost(fetchedPost);
        setEditForm({
          title: fetchedPost.title,
          content: fetchedPost.content,
          postType: fetchedPost.postType,
        });
      } catch (err) {
        setError("게시글을 불러오는 중 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSaveEdit = async () => {
    try {
      const updatedPost = await updatePost(id, {
        ...editForm,
        teacherId: AuthStore.user._id,
      });
      setPost(updatedPost);
      setIsEditing(false);
    } catch (err) {
      setError("게시글 수정 중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
      try {
        await deletePost(id, AuthStore.user._id);
        navigate("/board");
      } catch (err) {
        setError("게시글 삭제 중 오류가 발생했습니다.");
        console.error(err);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm({
      title: post.title,
      content: post.content,
      postType: post.postType,
    });
  };

  if (isLoading) return <div className="text-center mt-8">로딩 중...</div>;
  if (error)
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  if (!post)
    return <div className="text-center mt-8">게시글을 찾을 수 없습니다.</div>;

  const isAuthor = AuthStore.user && AuthStore.user._id === post.teacher_id;

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

        <div className="mb-4 flex space-x-4">
          <div className="w-1/3">
            <label className="block mb-2 font-semibold">게시글 타입</label>
            {isEditing ? (
              <select
                className="w-full p-2 border rounded"
                name="postType"
                value={editForm.postType}
                onChange={handleChange}
              >
                {Object.entries(postTypeMap).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            ) : (
              <div className="w-full p-2 border rounded">
                {postTypeMap[post.postType] || post.postType}
              </div>
            )}
          </div>

          <div className="w-2/3">
            <label className="block mb-2 font-semibold">제목</label>
            {isEditing ? (
              <input
                type="text"
                name="title"
                className="w-full p-2 border rounded"
                value={editForm.title}
                onChange={handleChange}
              />
            ) : (
              <div className="w-full p-2 border rounded bg-gray-100">
                {post.title}
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">게시글 내용</label>
          {isEditing ? (
            <textarea
              name="content"
              className="w-full p-2 border rounded h-64 resize-none"
              value={editForm.content}
              onChange={handleChange}
            ></textarea>
          ) : (
            <div className="w-full p-2 border rounded h-64 overflow-y-auto bg-gray-100">
              {post.content}
            </div>
          )}
        </div>

        <div className="text-right text-sm text-gray-500 mt-1">
          작성일: {new Date(post.createdAt).toLocaleString()}
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          {isAuthor && !isEditing && (
            <>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                삭제
              </button>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                수정
              </button>
            </>
          )}
          {isEditing && (
            <>
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                취소
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                저장
              </button>
            </>
          )}
          <button
            onClick={() => navigate("/board")}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            목록으로
          </button>
        </div>
        <div className="flex justify-end space-x-4 mt-4"></div>
      </div>
    </div>
  );
}

export default PostDetail;
