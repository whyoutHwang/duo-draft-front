/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        "only-left": "0.5rem 0 0 0.5rem", // 커스텀 테두리 반경
      },
    },
  },
  variants: {
    extend: {
      borderRadius: ["hover"],
    },
  },
};
