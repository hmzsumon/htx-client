"use client";
import MenuIcon from "@/public/images/icons/options.png";
import Image from "next/image";
import Link from "next/link";
import { Card } from "../ui/card";
import type { DashboardItem } from "./TradeMenu";

type Props = {
  bgColor?: string;
  title: string;
  items: DashboardItem[];
};

const DashboardMenuCard = ({ bgColor, title, items }: Props) => {
  return (
    <div className="px-2 md:px-4">
      <Card className={`p-2 ${bgColor}`}>
        <div className="border-b border-gray-200 pb-4">
          <div className="flex gap-1 items-center">
            <Image src={MenuIcon} alt="menu icon" width={15} height={15} />
            <h2 className="text-sm font-bold text-blue-900">{title}</h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.id} href={item.link} className="block">
                <div
                  className={`flex flex-col items-center gap-1 p-2 rounded-md shadow-sm relative ${
                    item.is_active ? "bg-pink-200" : "bg-white"
                  }`}
                >
                  {item.is_active && (
                    <span className="absolute top-0 right-1 font-semibold text-sm text-green-500">
                      ⚡
                    </span>
                  )}

                  {Icon ? (
                    <Icon {...item.iconProps} />
                  ) : item.iconImg ? (
                    <Image
                      src={item.iconImg}
                      alt={`${item.title} icon`}
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                    />
                  ) : null}

                  <p className="text-[.70rem] font-semibold text-blue-900">
                    {item.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default DashboardMenuCard;
