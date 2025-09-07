"use client";
import { formatBalance2 } from "@/lib/functions";
import MoneyBag from "@/public/images/icons/money-bag.png";
import ProgressBar from "@ramonak/react-progress-bar";
import Image from "next/image";
import { Card } from "../ui/card";

interface RankProps {
  icon: any;
  title: string;
  salary: number;
  conditions: {
    title: string;
    value: number;
    achieve: number;
    symbol: string;
  }[];
  conditions2: {
    title: string;
    value: number;
    achieve: number;
    symbol: string;
    progressBarColor: string;
    progressBar: number;
  }[];
}

const RankPageTemplate = ({
  icon,
  title,
  conditions,
  conditions2,
  salary,
}: RankProps) => {
  const is_active = false;
  return (
    <div className=" py-4 px-1 ">
      <div className=" flex flex-col items-center w-full gap-1 mx-auto">
        <Card className="p-4  mx-auto flex items-center justify-center">
          {icon}
        </Card>
        <h2 className=" text-3xl font-bold">{title}</h2>
      </div>
      <div className="my-4 space-y-4 text-sm">
        <Card className="p-4 space-y-2 bg-zinc-100">
          <h2 className=" font-bold">Monthly Salary</h2>
          <hr className=" border-gray-500" />
          <div className="flex gap-2 items-center list-none text-md font-semibold space-y-1">
            <Image src={MoneyBag} alt="Money Bag" className="w-6 h-6" />
            <li className="grid grid-cols-12 gap-2">
              <span className=" col-span-8">Salary</span>
              <span className=" col-span-1">:</span>
              <span className=" col-span-3">{salary}$</span>
            </li>
          </div>
        </Card>

        <Card className="p-4 space-y-2 text-sm">
          <h2 className=" font-bold">{title} Rank Reward Receive Conditions</h2>
          <hr className=" border-gray-500" />
          <div className=" list-none text-xs font-semibold space-y-1">
            {conditions.map((condition: any, index: number) => (
              <li key={index} className="grid grid-cols-12 gap-2">
                <span className=" col-span-8">{condition.title}</span>
                <span className=" col-span-1">:</span>
                <span className=" col-span-3 font-bold">
                  <span className="text-violet-600">
                    {formatBalance2(condition.achieve)}
                  </span>
                  /
                  <span className="text-htx-blue">
                    {formatBalance2(condition.value)}
                  </span>
                  {condition.symbol}
                </span>
              </li>
            ))}
          </div>
        </Card>

        <Card className="p-4 space-y-2">
          <h2 className=" font-bold">Per Month Salary Conditions</h2>
          <hr className=" border-gray-500" />
          <div className=" list-none text-xs font-semibold space-y-2">
            {conditions2.map((condition: any, index: number) => (
              <div key={index} className="space-y-2">
                <li className="grid grid-cols-12 gap-2">
                  <span className=" col-span-8">{condition.title}</span>
                  <span className=" col-span-1">:</span>
                  <span className=" col-span-3">
                    {condition.achieve}/{condition.value}
                    {condition.symbol}
                  </span>
                </li>
                <div>
                  <ProgressBar
                    completed={condition.progressBar}
                    className="w-full"
                    bgColor={condition.progressBarColor}
                    baseBgColor="#e0e0e0"
                    height="10px"
                    labelSize="10px"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="space-y-4">
        <button
          className=" bg-htx-blue w-full p-2 rounded text-white text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!is_active}
        >
          {is_active ? "Available" : "Progress"}
        </button>
      </div>
    </div>
  );
};

export default RankPageTemplate;
