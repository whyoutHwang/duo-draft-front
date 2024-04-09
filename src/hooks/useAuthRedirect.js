import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import authStore from "../stores/AuthStore"; // 올바른 경로로 수정하세요.

export function useAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authStore.isLoggedIn) {
      navigate("/signin");
    }
  }, [navigate]);
}
