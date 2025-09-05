"use client";
import MonthlyBoosterIcon from "@/lib/icons/MonthlyBoosterIcon";
import TradeImg2 from "@/public/images/icons/trade_2.png";
import TradeImg3 from "@/public/images/icons/trade_3.png";
import DashboardMenuCard from "./DashboardMenuCard";

export type DashboardItem = {
  id: number;
  title: string;
  link: string;
  icon?: React.ComponentType<any>; // কম্পোনেন্ট টাইপ
  iconProps?: Record<string, any>; // ঐ কম্পোনেন্টের props
  iconImg?: any; // StaticImageData (Next Image import)
  is_active?: boolean;
};

const items: DashboardItem[] = [
  {
    id: 1,
    title: "Booster",
    icon: MonthlyBoosterIcon,
    iconProps: {
      size: 35,
      gold: true,
      className: "text-emerald-600",
      title: "Booster",
    },
    link: "/booster", // <-- স্পেস তুলে ঠিক করা হয়েছে
  },
  {
    id: 2,
    title: "Signal Trade",
    iconImg: TradeImg2,
    link: "/trade/signal-trade",
  },
  {
    id: 3,
    title: "Live Trade",
    iconImg: TradeImg3,
    link: "/trade/live-trade",
  },
];

const TradeMenu = () => {
  return (
    <DashboardMenuCard title="HTX Trade" items={items} bgColor="bg-[#fff3e2]" />
  );
};

export default TradeMenu;
