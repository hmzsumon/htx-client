"use client";
import Deposit from "@/public/images/icons/deposit.png";
import Transfer from "@/public/images/icons/money-transfer.png";
import Withdraw from "@/public/images/icons/withdraw.png";
import DashboardMenuCard from "../dashboard/DashboardMenuCard";

const items = [
  {
    id: 1,
    title: "Deposit",
    icon: undefined,
    iconImg: Deposit,
    link: "/deposit-history",
  },
  {
    id: 2,
    title: "Withdrawal",
    icon: undefined,
    iconImg: Withdraw,
    link: "/withdraw-history",
  },
  {
    id: 3,
    title: "Transfer",
    icon: undefined,
    iconImg: Transfer,
    link: "/transfer-history",
  },
];

const HistoryMenu = () => {
  return (
    <>
      <DashboardMenuCard
        title="History View"
        items={items}
        bgColor={"bg-[#deedfd]"}
      />
    </>
  );
};

export default HistoryMenu;
