"use client"; // ✅ Ensure it's a client component
import Password from "@/public/images/icons/reset-password.png";
import Pin from "@/public/images/icons/reset-pin.png";
import PersonalInfo from "@/public/images/icons/user-edit.png";
import DashboardMenuCard from "./DashboardMenuCard";

const items = [
  {
    id: 1,
    title: "Personal Info",
    icon: undefined,
    iconImg: PersonalInfo,
    link: "/personal-info",
  },
  {
    id: 2,
    title: "Password",
    icon: undefined,
    iconImg: Password,
    link: "/reset-password-inner",
  },
  {
    id: 3,
    title: "Reset Pin",
    icon: undefined,
    iconImg: Pin,
    link: "/reset-pin",
  },
];

const SettingsMenu = () => {
  return (
    <>
      <DashboardMenuCard
        title="Settings"
        items={items}
        bgColor={"bg-[#d5f1e4]"}
      />
    </>
  );
};

export default SettingsMenu;
