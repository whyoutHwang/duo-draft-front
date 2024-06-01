import React from "react";

const StudentTable = ({ students, startEditing }) => (
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
          key={student._id}
          onClick={() => startEditing(student)}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td className="py-4 px-6">{student.name}</td>
          <td className="py-4 px-6">{student.gender}</td>
          <td className="py-4 px-6"></td>
          <td className="py-4 px-6"></td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default StudentTable;
