import iconAddPeople from "../assets/image/icons/icon-add-people.svg";
import iconChangeSeat from "../assets/image/icons/icon-change-seat.svg";
import iconHistory from "../assets/image/icons/icon-history.svg";

export const NAV_ITEMS = [
  { path: "/student-management", icon: iconAddPeople, label: "새로운 친구" },
  { path: "/seat-change", icon: iconChangeSeat, label: "자리 바꾸기" },
  { path: "/seat-history", icon: iconHistory, label: "자리 히스토리" },
];
