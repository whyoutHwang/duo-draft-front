import { useState, useRef, useCallback } from "react";

function useAnimation() {
  const [showAnimation, setShowAnimation] = useState(false);
  const canvasRef = useRef(null);

  const startAnimation = useCallback(() => {
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 3000);
  }, []);

  return { showAnimation, setShowAnimation, canvasRef, startAnimation };
}

export default useAnimation;
