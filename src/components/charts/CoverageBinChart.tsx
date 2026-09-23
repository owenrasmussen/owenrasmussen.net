"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ErrorBar,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function CoverageBinChart({
  data,
  nominal = 0.9,
  height = 300,
}: {
  data: { bin: string; plainMean: number; plainStd: number; adMean: number; adStd: number }[];
  nominal?: number;
  height?: number;
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="currentColor"
          className="text-black/10 dark:text-white/10"
        />
        <XAxis
          dataKey="bin"
          stroke="currentColor"
          className="text-zinc-500"
          tick={{ fontSize: 11 }}
        />
        <YAxis
          domain={[0.5, 1]}
          stroke="currentColor"
          className="text-zinc-500"
          tick={{ fontSize: 12 }}
          label={{
            value: "Empirical coverage",
            angle: -90,
            position: "insideLeft",
            style: { fontSize: 12, fill: "currentColor" },
          }}
        />
        <ReferenceLine
          y={nominal}
          stroke="currentColor"
          className="text-zinc-400"
          strokeDasharray="4 4"
          label={{
            value: `${nominal * 100}% nominal target`,
            position: "insideTopRight",
            style: { fontSize: 11, fill: "currentColor" },
          }}
        />
        <Tooltip
          formatter={(value) =>
            typeof value === "number" ? `${(value * 100).toFixed(1)}%` : String(value)
          }
          contentStyle={{
            background: "var(--background)",
            border: "1px solid rgba(128,128,128,0.3)",
            borderRadius: 8,
            fontSize: 13,
          }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar
          dataKey="plainMean"
          name="Plain (class-conditional)"
          fill="#71717a"
          radius={[4, 4, 0, 0]}
          isAnimationActive={false}
        >
          <ErrorBar dataKey="plainStd" width={4} strokeWidth={1.5} stroke="#3f3f46" />
        </Bar>
        <Bar
          dataKey="adMean"
          name="AD-conditional"
          fill="#6366f1"
          radius={[4, 4, 0, 0]}
          isAnimationActive={false}
        >
          <ErrorBar dataKey="adStd" width={4} strokeWidth={1.5} stroke="#4338ca" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
