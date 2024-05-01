import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import authStore from "../stores/AuthStore";

export function useAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authStore || !authStore.isLoggedIn) {
      navigate("/signin");
    }
  }, [navigate]);
}
