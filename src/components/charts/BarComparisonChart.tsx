"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Series = { key: string; label: string; color: string };

export default function BarComparisonChart({
  data,
  categoryKey,
  series,
  yLabel,
  yDomain,
  height = 280,
  valueFormatter = (v: number) => v.toFixed(3),
}: {
  data: Record<string, unknown>[];
  categoryKey: string;
  series: Series[];
  yLabel?: string;
  yDomain?: [number, number];
  height?: number;
  valueFormatter?: (v: number) => string;
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
          dataKey={categoryKey}
          stroke="currentColor"
          className="text-zinc-500"
          tick={{ fontSize: 11 }}
          interval={0}
        />
        <YAxis
          domain={yDomain}
          stroke="currentColor"
          className="text-zinc-500"
          tick={{ fontSize: 12 }}
          label={
            yLabel
              ? {
                  value: yLabel,
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: 12, fill: "currentColor" },
                }
              : undefined
          }
        />
        <Tooltip
          formatter={(value) =>
            typeof value === "number" ? valueFormatter(value) : String(value)
          }
          contentStyle={{
            background: "var(--background)",
            border: "1px solid rgba(128,128,128,0.3)",
            borderRadius: 8,
            fontSize: 13,
          }}
        />
        {series.length > 1 && <Legend wrapperStyle={{ fontSize: 12 }} />}
        {series.map((s) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.label}
            fill={s.color}
            radius={[4, 4, 0, 0]}
            isAnimationActive={false}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}
