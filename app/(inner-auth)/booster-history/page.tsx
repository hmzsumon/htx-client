"use client";

// Booster History — shadcn/ui + MUI DataGrid (mobile friendly, no export)
// NOTE: adjust shadcn import paths ("@/components/ui/*") to your project structure

import { Box, useMediaQuery } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CalendarDays, Copy, RefreshCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";

// shadcn/ui components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { useGetBoosterLogsQuery } from "@/redux/features/booster/boosterApi";

// ────────────────────────────────────────────────────────────────────────────────
// Types returned from API
export interface BoosterLog {
  _id: string;
  booster: string;
  user_id?: string;
  customer_id: string;
  amount: number;
  profit: number;
  rate: number; // decimal e.g. 0.015
  date_key: string; // YYYY-MM-DD (Asia/Dhaka)
  run_at?: string; // ISO
  createdAt?: string;
  updatedAt?: string;
}

export interface GetBoosterLogsResponse {
  logs: BoosterLog[];
}

// Row type for our view
export interface BoosterRow {
  id: string; // DataGrid row id
  booster: string;
  customer_id: string;
  amount: number;
  profit: number;
  rate: number;
  date_key: string;
  runAtDisplay: string | null;
}

// ────────────────────────────────────────────────────────────────────────────────
// Utilities
const formatCurrency = (v?: number | null) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(Number(v ?? 0));

const formatPercent = (v?: number | null, digits = 2) =>
  `${(((v ?? 0) as number) * 100).toFixed(digits)}%`;

const formatDateTimeDhaka = (iso?: string | null) => {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString("en-GB", { timeZone: "Asia/Dhaka" });
  } catch {
    return String(iso);
  }
};

// ────────────────────────────────────────────────────────────────────────────────
export default function BoosterHistoryPage() {
  const { data, isLoading, isError, refetch } =
    useGetBoosterLogsQuery(undefined);
  const logs: BoosterLog[] =
    (data as GetBoosterLogsResponse | undefined)?.logs ?? [];

  const isMobile = useMediaQuery("(max-width: 768px)");

  // filters & paging
  const [q, setQ] = useState<string>("");
  const [from, setFrom] = useState<string>(""); // YYYY-MM-DD
  const [to, setTo] = useState<string>("");
  const [page, setPage] = useState<number>(0); // DataGrid 0-based
  const [pageSize, setPageSize] = useState<number>(isMobile ? 10 : 20);

  const onClear = () => {
    setQ("");
    setFrom("");
    setTo("");
    setPage(0);
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  // ── compute filters
  const { filtered, totalAmount, totalProfit, avgRate } = useMemo(() => {
    const ql = q.trim().toLowerCase();
    const f = from ? new Date(from + "T00:00:00+06:00") : null; // Dhaka offset
    const t = to ? new Date(to + "T23:59:59+06:00") : null;

    const filtered = logs.filter((r) => {
      const hitQ =
        !ql ||
        r.customer_id?.toLowerCase().includes(ql) ||
        r.booster?.toLowerCase().includes(ql);
      if (!hitQ) return false;
      if (f || t) {
        const keyStr = r.date_key || r.createdAt || "";
        const keyDate = keyStr
          ? new Date(keyStr + (keyStr.length === 10 ? "T12:00:00+06:00" : ""))
          : null;
        if (f && keyDate && keyDate < f) return false;
        if (t && keyDate && keyDate > t) return false;
      }
      return true;
    });

    const totalAmount = filtered.reduce(
      (s, x) => s + (Number(x.amount) || 0),
      0
    );
    const totalProfit = filtered.reduce(
      (s, x) => s + (Number(x.profit) || 0),
      0
    );
    const avgRate = filtered.length
      ? filtered.reduce((s, x) => s + (Number(x.rate) || 0), 0) /
        filtered.length
      : 0;

    return { filtered, totalAmount, totalProfit, avgRate };
  }, [logs, q, from, to]);

  // sort newest first by date_key (YYYY-MM-DD lexicographically safe)
  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) =>
      b.date_key > a.date_key ? 1 : b.date_key < a.date_key ? -1 : 0
    );
    return arr;
  }, [filtered]);

  // rows with precomputed safe runAtDisplay (prevents undefined in valueGetter)
  const rows: BoosterRow[] = useMemo(
    () =>
      sorted.map((r) => ({
        id: r._id,
        booster: r.booster,
        customer_id: r.customer_id,
        amount: Number(r.amount) || 0,
        profit: Number(r.profit) || 0,
        rate: Number(r.rate) || 0,
        date_key: r.date_key,
        runAtDisplay: r.run_at ?? r.createdAt ?? r.updatedAt ?? null,
      })),
    [sorted]
  );

  // ── DataGrid columns (kept generic-free for wider version compatibility)
  const columns: GridColDef[] = useMemo(
    () => [
      { field: "date_key", headerName: "Date", minWidth: 120, flex: 0.8 },
      { field: "customer_id", headerName: "Customer", minWidth: 130, flex: 1 },
      {
        field: "booster",
        headerName: "Booster",
        minWidth: 160,
        flex: 1,
        renderCell: (params) => (
          <div className="flex items-center gap-2">
            <code className="rounded bg-muted px-2 py-0.5 text-xs">
              {String(params?.value ?? "")}
            </code>
            <Button
              size="sm"
              variant="outline"
              className="h-7 px-2"
              onClick={() => handleCopy(String(params?.value ?? ""))}
            >
              <Copy className="h-3.5 w-3.5" />
            </Button>
          </div>
        ),
      },
      {
        field: "amount",
        headerName: "Amount",
        type: "number",
        minWidth: 110,
        flex: 0.8,
        valueFormatter: (p: any) => formatCurrency(Number(p?.value ?? 0)),
        align: "right",
        headerAlign: "right",
      },
      {
        field: "rate",
        headerName: "Rate",
        minWidth: 110,
        flex: 0.8,
        align: "right",
        headerAlign: "right",
        renderCell: (p) => (
          <Badge variant="secondary" className="ml-auto">
            {formatPercent(Number(p?.value ?? 0))}
          </Badge>
        ),
      },
      {
        field: "profit",
        headerName: "Profit",
        type: "number",
        minWidth: 110,
        flex: 0.8,
        valueFormatter: (p: any) => formatCurrency(Number(p?.value ?? 0)),
        align: "right",
        headerAlign: "right",
      },
      {
        field: "runAtDisplay",
        headerName: "Run at",
        minWidth: 180,
        flex: 1,
        valueFormatter: (p: any) =>
          formatDateTimeDhaka((p?.value as string) || ""),
      },
    ],
    []
  );

  // Mobile paged slice
  const pagedMobile = useMemo(() => {
    const start = page * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, page, pageSize]);

  // ── Loading / Error
  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Booster History</CardTitle>
            <CardDescription>Loading logs…</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-24 animate-pulse rounded-xl bg-muted"
                />
              ))}
            </div>
            <div className="mt-6 h-64 animate-pulse rounded-xl bg-muted" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto w-full max-w-3xl p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle>Booster History</CardTitle>
            <CardDescription className="text-destructive">
              Failed to load logs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => refetch()}>
              <RefreshCcw className="mr-2 h-4 w-4" /> Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalPagesMobile = Math.max(1, Math.ceil(sorted.length / pageSize));

  return (
    <div className="mx-auto w-full max-w-7xl p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl">
            Booster History
          </h1>
          <p className="text-sm text-muted-foreground">
            Daily profit distribution logs (Asia/Dhaka)
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Amount</CardDescription>
            <CardTitle className="text-2xl">
              {formatCurrency(totalAmount)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Profit</CardDescription>
            <CardTitle className="text-2xl">
              {formatCurrency(totalProfit)}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Average Rate</CardDescription>
            <CardTitle className="text-2xl">{formatPercent(avgRate)}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Entries</CardDescription>
            <CardTitle className="text-2xl">
              {String(filtered.length)}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="grid gap-4 md:grid-cols-6">
            <div className="md:col-span-2">
              <Label htmlFor="q">Search</Label>
              <div className="relative mt-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="q"
                  placeholder="customer / booster id"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="md:col-span-1">
              <Label htmlFor="from">From (Dhaka)</Label>
              <div className="relative mt-1">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="from"
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="md:col-span-1">
              <Label htmlFor="to">To (Dhaka)</Label>
              <div className="relative mt-1">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="to"
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="md:col-span-1">
              <Label>Page size</Label>
              <div className="mt-1">
                <Select
                  value={String(pageSize)}
                  onValueChange={(v) => {
                    const n = Number(v);
                    setPageSize(n);
                    setPage(0);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Page size" />
                  </SelectTrigger>
                  <SelectContent>
                    {[10, 20, 50, 100].map((n) => (
                      <SelectItem key={n} value={String(n)}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-end">
              <Button variant="outline" onClick={onClear}>
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data area */}
      <div className="mt-6">
        {isMobile ? (
          // Mobile card list
          <div className="space-y-3">
            {pagedMobile.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center text-sm text-muted-foreground">
                  No logs for current filters.
                </CardContent>
              </Card>
            ) : (
              pagedMobile.map((r) => (
                <Card key={r._id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground">
                          {r.date_key}
                        </div>
                        <div className="text-base font-medium">
                          {r.customer_id}
                        </div>
                      </div>
                      <Badge variant="secondary">{formatPercent(r.rate)}</Badge>
                    </div>
                    <Separator className="my-3" />
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <div className="text-muted-foreground">Amount</div>
                        <div className="font-medium tabular-nums">
                          {formatCurrency(r.amount)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-muted-foreground">Profit</div>
                        <div className="font-medium tabular-nums">
                          {formatCurrency(r.profit)}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                      <div>
                        Booster:{" "}
                        <code className="rounded bg-muted px-1.5 py-0.5 text-[10px]">
                          {r.booster}
                        </code>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2"
                        onClick={() => handleCopy(r.booster)}
                      >
                        <Copy className="mr-1 h-3.5 w-3.5" /> Copy
                      </Button>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Run at:{" "}
                      {formatDateTimeDhaka(
                        r.run_at ?? r.createdAt ?? r.updatedAt ?? null
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}

            {/* Mobile pagination controls */}
            <div className="mt-2 flex items-center justify-between">
              <div className="text-xs text-muted-foreground">
                Page {page + 1} of {totalPagesMobile}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                >
                  Prev
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={(page + 1) * pageSize >= sorted.length}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // Desktop DataGrid
          <Card>
            <CardContent className="pt-6">
              <Box sx={{ width: "100%" }}>
                <div className="w-full overflow-hidden rounded-xl border">
                  <DataGrid
                    autoHeight
                    rows={rows}
                    columns={columns}
                    disableRowSelectionOnClick
                    pageSizeOptions={[10, 20, 50, 100]}
                    paginationModel={{ page, pageSize }}
                    onPaginationModelChange={(m) => {
                      setPage(m.page);
                      setPageSize(m.pageSize);
                    }}
                    density="compact"
                  />
                </div>
              </Box>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
