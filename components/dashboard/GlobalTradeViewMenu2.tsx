"use client";
import TradeMax from "@/public/images/icons/trade_bost.webp";
import TradeInfinity from "@/public/images/icons/trade_infinity.webp";
import TradeMaster from "@/public/images/icons/trade_master.webp";
import { useSelector } from "react-redux";
import DashboardMenuCard from "./DashboardMenuCard";

const GlobalTradeViewMenu2 = () => {
  const { user } = useSelector((state: any) => state.auth);
  const items = [
    {
      id: 4,
      title: "Trade Max",
      icon: undefined,
      iconImg: TradeMax,
      is_active: user?.current_trade_package === "TradeMax" ? true : false,
      link: "/trade-max",
    },
    {
      id: 5,
      title: "Trade Master",
      icon: undefined,
      iconImg: TradeMaster,
      is_active: user?.current_trade_package === "TradeMaster" ? true : false,
      link: "/trade-master",
    },
    {
      id: 6,
      title: "Trade Infinity",
      icon: undefined,
      iconImg: TradeInfinity,
      is_active: user?.current_trade_package === "TradeInfinity" ? true : false,
      link: "/trade-infinity",
    },
  ];
  return (
    <>
      <DashboardMenuCard
        title="Live Trade View"
        items={items}
        bgColor={"bg-[#efebc3]"}
      />
    </>
  );
};

export default GlobalTradeViewMenu2;
