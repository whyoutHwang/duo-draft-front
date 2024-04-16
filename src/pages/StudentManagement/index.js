import React, { useEffect, useState } from "react";
import { getStudent } from "../../service/apiService";
import AuthStore from "../../stores/AuthStore";

function StudentManagement() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudentsData = async () => {
      const data = await getStudent(AuthStore.user._id);
      setStudents(data);
      console.log(data);
    };

    fetchStudentsData();
  }, []);
  // 배열을 문자열로 변환하는 함수
  const arrayToString = (arr) => arr.join(", ") || "없음";

  return (
    <div className="flex h-screen bg-gray-100 justify-center items-center">
      <table className="min-w-full table-fixed text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6">
              이름
            </th>
            <th scope="col" className="py-3 px-6">
              성별
            </th>
            <th scope="col" className="py-3 px-6">
              좋아하는 친구
            </th>
            <th scope="col" className="py-3 px-6">
              싫어하는 친구
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr
              key={student.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="py-4 px-6">{student.name}</td>
              <td className="py-4 px-6">{student.gender}</td>
              <td className="py-4 px-6">
                {arrayToString(student.favorite_friends)}
              </td>
              <td className="py-4 px-6">
                {arrayToString(student.fought_friends)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentManagement;
