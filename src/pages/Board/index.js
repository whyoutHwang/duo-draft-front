import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts } from "../../service/apiService";

const postTypeMap = {
  about: "요즘 우리 학교는",
  teacher: "선생님 사용 후기",
  student: "학생 사용 후기",
  notification: "공지사항",
};

function Board() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("전체");
  const tabs = ["전체", ...Object.values(postTypeMap)];

  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const fetchPosts = useCallback(async (tab, search, page) => {
    setIsLoading(true);
    try {
      const postType =
        tab === "전체"
          ? undefined
          : Object.keys(postTypeMap).find((key) => postTypeMap[key] === tab);
      const fetchedPosts = await getPosts(postType, search, page, 10);
      setPosts(fetchedPosts.posts);
      setCurrentPage(fetchedPosts.currentPage);
      setTotalPages(fetchedPosts.totalPages);
      setTotalPosts(fetchedPosts.totalPosts);
    } catch (err) {
      console.error("게시글을 불러오는 중 오류가 발생했습니다:", err);
      setError("게시글을 불러오는 데 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchPosts(activeTab, searchTerm, 1);
    }, 300); // 300ms 후에 검색 실행

    return () => clearTimeout(debounceTimer);
  }, [activeTab, searchTerm, fetchPosts]);

  const handlePageChange = (newPage) => {
    fetchPosts(activeTab, searchTerm, newPage);
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`); // 게시글 상세 페이지로 이동
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  const filteredPosts =
    activeTab === "전체"
      ? posts
      : posts.filter((post) => postTypeMap[post.postType] === activeTab);

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="min-w-5xl ">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">자유 게시판</h1>
            <button
              className="bg-[#397358] text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => navigate("/create-post")}
            >
              작성하기
            </button>
          </div>

          <div className="flex justify-center mb-6">
            <div className="inline-flex border border-solid border-black rounded-full overflow-hidden">
              {tabs.map((tab, index) => (
                <button
                  key={tab}
                  className={`
                 py-2 px-6 
                 ${
                   activeTab === tab
                     ? "bg-[#397358] text-white"
                     : "bg-gray-200 text-gray-700"
                 }
                 
                 focus:outline-none
                 transition-colors duration-200
               `}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-row justify-between items-center mb-4">
            <div>{"전체"}</div>
            <div>
              <input
                type="text"
                className="p-2 border rounded-l"
                placeholder="검색어를 입력해주세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-y-2 border-black">
                <th className="text-center py-2">게시글 타입</th>
                <th className="text-center py-2">제목</th>
                <th className="text-center py-2">작성자</th>
                <th className="text-center py-2">게시 날짜</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b cursor-pointer"
                  onClick={() => handlePostClick(post._id)}
                >
                  <td className="text-center py-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {postTypeMap[post.postType]}
                    </span>
                  </td>
                  <td className="text-center py-3">{post.title}</td>
                  <td className="text-center py-3">{post.username}</td>
                  <td className="text-center py-3 text-gray-500">
                    {formatDate(post.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`mx-1 px-3 py-1 rounded border ${
                  currentPage === page ? "bg-[#397358] text-white" : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
