"use client";

import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function LearningCurveChart({
  n,
  series,
  height = 300,
}: {
  n: number[];
  series: { key: string; label: string; color: string; mean: number[]; std: number[] }[];
  height?: number;
}) {
  // Recharts has no native "range area," so the ±1 std-dev band is faked
  // with a stacked Area: an invisible base up to (mean - std), then a
  // visible band of height (2 * std) on top of it.
  const data = n.map((count, i) => {
    const row: Record<string, number> = { n: count };
    for (const s of series) {
      row[`${s.key}Mean`] = s.mean[i];
      row[`${s.key}Low`] = s.mean[i] - s.std[i];
      row[`${s.key}Band`] = 2 * s.std[i];
    }
    return row;
  });

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 8 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="currentColor"
          className="text-black/10 dark:text-white/10"
        />
        <XAxis
          dataKey="n"
          scale="log"
          domain={["dataMin", "dataMax"]}
          type="number"
          ticks={n}
          stroke="currentColor"
          className="text-zinc-500"
          tick={{ fontSize: 12 }}
          label={{
            value: "Training set size (compounds)",
            position: "insideBottom",
            offset: -4,
            style: { fontSize: 12, fill: "currentColor" },
          }}
        />
        <YAxis
          domain={[0.6, 0.9]}
          stroke="currentColor"
          className="text-zinc-500"
          tick={{ fontSize: 12 }}
          label={{
            value: "AUROC",
            angle: -90,
            position: "insideLeft",
            style: { fontSize: 12, fill: "currentColor" },
          }}
        />
        <Tooltip
          formatter={(value) =>
            typeof value === "number" ? value.toFixed(3) : String(value)
          }
          contentStyle={{
            background: "var(--background)",
            border: "1px solid rgba(128,128,128,0.3)",
            borderRadius: 8,
            fontSize: 13,
          }}
        />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {series.map((s) => (
          <Area
            key={`${s.key}-base`}
            dataKey={`${s.key}Low`}
            stackId={s.key}
            stroke="none"
            fill="transparent"
            legendType="none"
            tooltipType="none"
            isAnimationActive={false}
          />
        ))}
        {series.map((s) => (
          <Area
            key={`${s.key}-band`}
            dataKey={`${s.key}Band`}
            stackId={s.key}
            stroke="none"
            fill={s.color}
            fillOpacity={0.15}
            legendType="none"
            tooltipType="none"
            isAnimationActive={false}
          />
        ))}
        {series.map((s) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={`${s.key}Mean`}
            name={s.label}
            stroke={s.color}
            strokeWidth={2}
            dot={{ r: 3 }}
            isAnimationActive={false}
          />
        ))}
      </ComposedChart>
    </ResponsiveContainer>
  );
}
