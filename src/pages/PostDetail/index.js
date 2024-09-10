import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost, deletePost } from "../../service/apiService";
import AuthStore from "../../stores/AuthStore";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

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
  const [likes, setLikes] = useState(0);
  const [views, setViews] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "김철수",
      content: "의미 있는 글이네요. 감사합니다!",
      createdAt: new Date("2024-03-01T09:00:00"),
      likes: 5,
      replies: [],
    },
    {
      id: 2,
      author: "이영희",
      content: "저도 같은 생각입니다. 좋은 정보 감사합니다.",
      createdAt: new Date("2024-03-01T10:30:00"),
      likes: 3,
      replies: [],
    },
    {
      id: 3,
      author: "박지성",
      content: "이런 관점은 처음 봤어요. 새로운 시각을 얻었습니다.",
      createdAt: new Date("2024-03-02T11:15:00"),
      likes: 7,
      replies: [],
    },
  ]);

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
        setLikes(fetchedPost.likes || 0);
        setViews(fetchedPost.views || 0);
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

  const handleContentChange = (content) => {
    setEditForm((prev) => ({ ...prev, content }));
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

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: "현재 사용자", // 실제로는 로그인한 사용자 정보를 사용해야 합니다
        content: comment,
        createdAt: new Date(),
        likes: 0,
        replies: [],
      };
      setComments([...comments, newComment]);
      setComment("");
    }
  };

  const handleCommentLike = (commentId) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  const handleReplySubmit = (commentId, replyContent) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              replies: [
                ...comment.replies,
                {
                  id: Date.now(),
                  author: "현재 사용자",
                  content: replyContent,
                  createdAt: new Date(),
                },
              ],
            }
          : comment
      )
    );
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

        {/* 게시글 정보 섹션 */}
        <div className="mb-6 bg-white border border-gray-300 rounded-lg shadow-sm">
          <div className="border-b border-gray-300 p-4 relative">
            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
            <div className="text-sm text-gray-600">
              <span>작성일: {new Date(post.createdAt).toLocaleString()}</span>
              <span className="ml-4">작성자: {post.username || "익명"}</span>
            </div>
            <div className="absolute top-4 right-4 text-sm text-gray-600">
              <span>좋아요: {likes}</span>
              <span className="ml-4">조회수: {views}</span>
            </div>
          </div>
          <div className="p-4">
            <div
              className="mb-4"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
            />
          </div>
        </div>

        {/* 버튼 섹션 */}
        <div className="flex justify-end space-x-2">
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

        {/* 댓글 섹션 */}
        <div className="mt-8 border-t border-gray-300 pt-6">
          <h3 className="text-lg font-semibold mb-4">댓글 달기</h3>
          <form onSubmit={handleCommentSubmit}>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              rows="4"
              placeholder="모두가 즐길 수 있는 커뮤니티를 위해 매너를 지켜주세요."
              value={comment}
              onChange={handleCommentChange}
            ></textarea>
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                댓글 등록
              </button>
            </div>
          </form>
        </div>

        {/* 댓글 목록 */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">댓글 목록</h3>
          {comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 py-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{comment.author}</span>
                <span className="text-sm text-gray-500">
                  {comment.createdAt.toLocaleString()}
                </span>
              </div>
              <p className="mb-2">{comment.content}</p>
              <div className="flex items-center space-x-4 mb-2">
                <button
                  onClick={() => handleCommentLike(comment.id)}
                  className="text-sm text-blue-500 hover:text-blue-700"
                >
                  좋아요 ({comment.likes})
                </button>
                <button
                  onClick={() => {
                    /* 대댓글 입력 폼 토글 */
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  댓글 달기
                </button>
              </div>
              {/* 대댓글 목록 */}
              {comment.replies.map((reply) => (
                <div
                  key={reply.id}
                  className="ml-8 mt-2 p-2 bg-gray-100 rounded"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-sm">
                      {reply.author}
                    </span>
                    <span className="text-xs text-gray-500">
                      {reply.createdAt.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm">{reply.content}</p>
                </div>
              ))}
              {/* 대댓글 입력 폼 (토글로 표시/숨김) */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;
