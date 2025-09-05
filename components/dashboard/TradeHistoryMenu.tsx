"use client"; // ✅ Ensure it's a client component
import { ChartCandlestick } from "lucide-react";
import DashboardMenuCard from "./DashboardMenuCard";

const items = [
  {
    id: 1,
    title: "Personal Trade",
    link: "/dashboard/personal-trade",
    icon: ChartCandlestick,
  },
  {
    id: 2,
    title: "Signal Trade",
    link: "/dashboard/signal-trade",
    icon: ChartCandlestick,
  },
  {
    id: 3,
    title: "Global Trade",
    link: "/dashboard/global-trade",
    icon: ChartCandlestick,
  },
];

const TradeHistoryMenu = () => {
  return (
    <>
      <DashboardMenuCard
        title="HTX Trade History"
        items={items}
        bgColor={"bg-[#deedfd]"}
      />
    </>
  );
};

export default TradeHistoryMenu;
