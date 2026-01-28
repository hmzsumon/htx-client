import GlobalTradeViewTemplate from "@/components/trade/GlobalTradeViewTemplate";
import TradeLite from "@/public/images/icons/trade_bost.webp";

const TradeLitePage = () => {
  return (
    <div className="">
      <div>
        <GlobalTradeViewTemplate
          tradeImg={TradeLite} 
          title="Trade Lite"
          balance={50}
          conditions={[
            {
              title: 'Direct Joining Team "A"',
              value: "0/0 User's",
            },
            {
              title: 'Joining Team ("B" + "C")',
              value: "0/0 User's",
            },
            {
              title: "Total Team Member's",
              value: "0/0 User's",
            },
          ]}
          dailyProfit={[
            {
              title: "Daily Personal Profit",
              value: "0 - 3% +",
            },
            {
              title: 'Profit Team ("A")',
              value: "Nil",
            },
            {
              title: 'Profit Team ("B")',
              value: "Nil",
            },
            {
              title: 'Profit Team ("C")',
              value: "Nil",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default TradeLitePage;
