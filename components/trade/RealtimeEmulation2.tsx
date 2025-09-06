"use client";
import { setTradeLoading } from "@/redux/features/trade/tradeSlice";
import { createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScaleLoader } from "react-spinners";

const RealtimeEmulation2 = () => {
  const dispatch = useDispatch();
  const { symbol, tradeDuration, tradeLoading, kline } = useSelector(
    (state: any) => state.trade
  );

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<any>(null);
  const candleSeriesRef = useRef<any>(null);
  const areaSeriesRef = useRef<any>(null);

  useEffect(() => {
    dispatch(setTradeLoading(true)); // Start loading on render

    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 280,
      layout: {
        background: { color: "transparent" },
        textColor: "#c2bcbc",
      },
      grid: {
        vertLines: { color: "#212548" },
        horzLines: { color: "#212548" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
        barSpacing: 10,
        rightOffset: 2,
        borderColor: "#0a1c25",
        tickMarkFormatter: (time: number) => {
          const date = new Date(time * 1000);
          return `${String(date.getHours()).padStart(2, "0")}:${String(
            date.getMinutes()
          ).padStart(2, "0")}`;
        },
      },
      rightPriceScale: {
        borderColor: "#0a1c25",
      },
      crosshair: {
        horzLine: { color: "#888", style: 1, visible: true },
        vertLine: { color: "#888", style: 1, visible: true },
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderUpColor: "#26a69a",
      borderDownColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });
    candleSeriesRef.current = candleSeries;

    const areaSeries = chart.addAreaSeries({
      topColor: "rgba(38,198,218, 0.56)",
      bottomColor: "rgba(38,198,218, 0.04)",
      lineColor: "rgba(38,198,218, 1)",
      lineWidth: 2,
    });
    areaSeriesRef.current = areaSeries;

    chartRef.current = chart;

    async function getNewData() {
      try {
        const response = await fetch(
          `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${tradeDuration}`
        );
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        dispatch(setTradeLoading(false));
        return data.map((d: any) => ({
          time: d[0] / 1000,
          open: parseFloat(d[1]),
          high: parseFloat(d[2]),
          low: parseFloat(d[3]),
          close: parseFloat(d[4]),
          value: parseFloat(d[5]),
        }));
      } catch (error) {
        console.error("Fetch error:", error);
        dispatch(setTradeLoading(false));
        return [];
      }
    }

    async function updateData() {
      const newData = await getNewData();
      if (!newData || newData.length === 0) return;

      if (kline && candleSeriesRef.current) {
        candleSeriesRef.current.setData(
          newData.map((d: any) => ({
            time: d.time,
            open: d.open,
            high: d.high,
            low: d.low,
            close: d.close,
          }))
        );
      } else if (areaSeriesRef.current) {
        areaSeriesRef.current.setData(
          newData.map((d: any) => ({
            time: d.time,
            value: d.close,
          }))
        );
      }
    }

    updateData();
    const interval = setInterval(updateData, 5000);

    const observer = new ResizeObserver(() => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    });
    observer.observe(chartContainerRef.current);

    return () => {
      clearInterval(interval);
      observer.disconnect();
      if (chartRef.current) {
        chartRef.current.remove();
      }
      candleSeriesRef.current = null;
      areaSeriesRef.current = null;
    };
  }, [symbol, tradeDuration]);

  return (
    <div ref={chartContainerRef} className="relative w-full">
      {tradeLoading && (
        <div className="absolute top-[49%] left-[46%]">
          <ScaleLoader color="#05eb4a" height={30} width={5} />
        </div>
      )}
    </div>
  );
};

export default RealtimeEmulation2;
