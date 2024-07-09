import iconAddPeople from "../assets/image/icons/icon-add-people.svg";
import iconChangeSeat from "../assets/image/icons/icon-change-seat.svg";
import iconHistory from "../assets/image/icons/icon-history.svg";
import iconAddPeopleActive from "../assets/image/icons/icon-add-people-active.svg";
import iconChangeSeatActive from "../assets/image/icons/icon-change-seat-active.svg";
import iconHistoryActive from "../assets/image/icons/icon-history-active.svg";

export const NAV_ITEMS = [
  {
    path: "/student-management",
    icon: iconAddPeople,
    iconActive: iconAddPeopleActive,
    label: "새로운 친구",
  },
  {
    path: "/seat-change",
    icon: iconChangeSeat,
    iconActive: iconChangeSeatActive,
    label: "자리 바꾸기",
  },
  {
    path: "/seat-history",
    icon: iconHistory,
    iconActive: iconHistoryActive,
    label: "자리 히스토리",
  },
];
