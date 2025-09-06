"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { useState } from "react";
import { useSelector } from "react-redux";

const BoosterDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleClose = () => {
    setIsDrawerOpen(false);
  };

  const { user } = useSelector((state: any) => state.auth);

  const handleConfirmPurchase = async () => {
    console.log("Purchase confirmed");
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={handleClose}>
      <DrawerContent className="max-h-[85vh] rounded-t-3xl drawer-wrapper py-3">
        <div>
          <DrawerHeader>
            <DrawerTitle>Booster Cancel Confirmation </DrawerTitle>
          </DrawerHeader>

          <div className="space-y-2 px-4">
            <p className="text-sm text-gray-600">
              Are you sure you want to cancel your booster? This action cannot
              be undone.
            </p>
            <p className="text-sm text-gray-600">
              Upon cancellation, your remaining booster amount of{" "}
              <span className="font-semibold">{user?.booster_amount} USDT</span>{" "}
              will be credited back to your main balance.
            </p>
          </div>

          <div className="px-4 space-y-4">
            {/* Confirm Button */}
            <Button
              className="w-full bg-htx-blue font-bold text-white hover:bg-blue-600"
              disabled={false}
              onClick={handleConfirmPurchase}
            >
              Confirm Cancel Booster
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BoosterDrawer;
