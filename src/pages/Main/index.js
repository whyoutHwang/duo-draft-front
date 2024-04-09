import React, { useEffect } from "react";
import authStore from "../../stores/AuthStore";

function Main() {
  useEffect(() => {
    console.log("로그인 상태:", authStore.isLoggedIn);
  }, [authStore.isLoggedIn, authStore.user]);

  return <div>Main Page</div>;
}

export default Main;
