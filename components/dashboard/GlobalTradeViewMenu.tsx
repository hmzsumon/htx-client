"use client";
import TradeElite from "@/public/images/icons/trade_elite.webp";
import TradeLite from "@/public/images/icons/trade_max.webp";
import TradePro from "@/public/images/icons/trade_pro.webp";
import { useSelector } from "react-redux";
import DashboardMenuCard from "./DashboardMenuCard";

const GlobalTradeViewMenu = () => {
  const { user } = useSelector((state: any) => state.auth);
  const items = [
    {
      id: 1,
      title: "Trade Lite",
      icon: undefined,
      iconImg: TradeLite,
      is_active: user?.current_trade_package === "TradeLite" ? true : false,
      link: "/trade-lite",
    },
    {
      id: 2,
      title: "Trade Elite",
      icon: undefined,
      iconImg: TradeElite,
      is_active: user?.current_trade_package === "TradeElite" ? true : false,
      link: "/trade-elite",
    },
    {
      id: 3,
      title: "Trade Pro",
      icon: undefined,
      iconImg: TradePro,
      is_active: user?.current_trade_package === "TradePro" ? true : false,
      link: "/trade-pro",
    },
  ];

  return (
    <>
      <DashboardMenuCard
        title="Live Trade View"
        items={items}
        bgColor={"bg-[#deedfd]"}
      />
    </>
  );
};

export default GlobalTradeViewMenu;
