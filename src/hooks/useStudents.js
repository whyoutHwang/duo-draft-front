// hooks/useStudents.js
import { useState, useEffect, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { getStudent } from "../service/apiService";
import AuthStore from "../stores/AuthStore";
import StudentStore from "../stores/StudentStore";

export const useStudents = () => {
  const [isLoading, setIsLoading] = useState(true);

  const fetchStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getStudent(AuthStore.user._id);
      StudentStore.setStudents(data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
      StudentStore.setStudents([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  return {
    students: StudentStore.students,
    hasStudents: StudentStore.hasStudents,
    isLoading,
    refreshStudents: fetchStudents,
  };
};

export default observer(useStudents);
