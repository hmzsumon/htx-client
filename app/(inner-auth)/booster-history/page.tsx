/* ── BoosterHistory — show only purpose === "Create Booster" ────────── */

"use client";

import TransactionCard from "@/components/transactions/TransactionCard";
import { useGetTransactionsQuery } from "@/redux/features/transactions/transactionApi";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ScaleLoader } from "react-spinners";

/* ── Component ────────── */
const BoosterHistory = () => {
  const { data: transData, isFetching } = useGetTransactionsQuery(undefined, {
    pollingInterval: 1000 * 60 * 5,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const { transactions } = transData || [];
  console.log("All Transactions:", transactions);

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  /* ── Accumulate only "Create Booster" items ────────── */
  useEffect(() => {
    if (transactions?.length) {
      const onlyBooster = transactions.filter(
        (t: any) =>
          t?.purpose === "Booster Profit" || t?.purpose === "Create Booster"
      );
      setRecords((prev) => [...prev, ...onlyBooster]);
      if (onlyBooster.length < 10) setHasMore(false); // page-size heuristic
    } else {
      setHasMore(false);
    }
  }, [transactions]);

  /* ── Infinite scroll trigger ────────── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && hasMore) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => {
      if (loadMoreRef.current) observer.unobserve(loadMoreRef.current);
    };
  }, [isFetching, hasMore]);

  const hasRecords = records.length > 0;

  /* ── Render ────────── */
  return (
    <div className="bg-white min-h-[80vh]">
      {hasRecords ? (
        <>
          {records.map((record: any, index: number) => (
            <TransactionCard key={index} record={record} isLiveTrade={false} />
          ))}

          <div ref={loadMoreRef} className="flex justify-center py-4">
            {isFetching ? (
              <ScaleLoader color="#00b894" height={25} />
            ) : !hasMore ? (
              <p className="text-gray-400 text-sm">No more records</p>
            ) : null}
          </div>
        </>
      ) : (
        <div className="text-center flex items-center justify-center min-h-[80vh]">
          <div>
            <Image
              src="/images/no-data.gif"
              width={200}
              height={200}
              alt="No Data"
              className="mx-auto"
            />
            <p className="text-gray-500 text-sm font-semibold">
              No Records found
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoosterHistory;
