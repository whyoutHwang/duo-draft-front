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

  const fetchPosts = useCallback(async (tab, search) => {
    setIsLoading(true);
    try {
      const postType =
        tab === "전체"
          ? undefined
          : Object.keys(postTypeMap).find((key) => postTypeMap[key] === tab);
      const fetchedPosts = await getPosts(postType, search, 1, 10);
      setPosts(fetchedPosts);
    } catch (err) {
      console.error("게시글을 불러오는 중 오류가 발생했습니다:", err);
      setError("게시글을 불러오는 데 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchPosts(activeTab, searchTerm);
    }, 300); // 300ms 후에 검색 실행

    return () => clearTimeout(debounceTimer);
  }, [activeTab, searchTerm, fetchPosts]);

  // if (isLoading) return <div>로딩 중...</div>;
  // if (error) return <div>Error: {error}</div>;

  const filteredPosts =
    activeTab === "전체"
      ? posts
      : posts.filter((post) => postTypeMap[post.postType] === activeTab);

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">자유 게시판</h1>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={() => navigate("/create-post")}
            >
              작성하기
            </button>
          </div>

          {/* 탭 메뉴 */}
          <div className="flex justify-center mb-6">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                className={`
               py-2 px-6 
               ${index === 0 ? "rounded-l-full" : ""} 
               ${index === tabs.length - 1 ? "rounded-r-full" : ""}
               ${
                 activeTab === tab
                   ? "bg-green-600 text-white"
                   : "bg-gray-200 text-gray-700"
               }
               ${index !== tabs.length - 1 ? "border-r border-white" : ""}
               focus:outline-none
               transition-colors duration-200
             `}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-row justify-between items-center">
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
              <tr className="border-b">
                <th className="text-left py-2">게시글 타입</th>
                <th className="text-left py-2">제목</th>
                <th className="text-left py-2">작성자</th>
                <th className="text-right py-2">게시 날짜</th>
              </tr>
            </thead>
            <tbody>
              {filteredPosts.map((post) => (
                <tr key={post.id} className="border-b">
                  <td className="py-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {postTypeMap[post.postType]}
                    </span>
                  </td>
                  <td className="py-3">{post.title}</td>
                  <td className="py-3">{post.title}</td>
                  <td className="text-right py-3 text-gray-500">
                    {post.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 페이지네이션 */}
          <div className="flex justify-center mt-6">
            <button className="mx-1 px-3 py-1 rounded border">1</button>
            <button className="mx-1 px-3 py-1 rounded border">2</button>
            <button className="mx-1 px-3 py-1 rounded border">3</button>
            <span className="mx-1">...</span>
            <button className="mx-1 px-3 py-1 rounded border">24</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Board;
