"use client";
import Inbox from "@/public/images/icons/inbox.png";
import Mail from "@/public/images/icons/mail.png";
import Telegram from "@/public/images/icons/telegram.png";
import DashboardMenuCard from "./DashboardMenuCard";

const items = [
  {
    id: 4,
    title: "Support",
    icon: undefined,
    iconImg: Mail,
    link: "/contact/support",
  },
  {
    id: 5,
    title: "Telegram",
    icon: undefined,
    iconImg: Telegram,
    link: "/contact/telegram",
  },
  {
    id: 6,
    title: "Inbox",
    icon: undefined,
    iconImg: Inbox,
    link: "/notifications",
  },
];

const ContactMenu = () => {
  return (
    <>
      <DashboardMenuCard
        title="Contact Us"
        items={items}
        bgColor={"bg-[#e6ddec]"}
      />
    </>
  );
};

export default ContactMenu;
