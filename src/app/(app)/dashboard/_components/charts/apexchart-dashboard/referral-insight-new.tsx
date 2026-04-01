"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  type LegendProps,
  type TooltipProps,
} from "recharts";
import ChartLayout from "../chart-layout";
import { CircleUserRound } from "lucide-react";

const data = [
  { name: "STAT", value: 4, color: "rgb(99, 132, 255)" },
  { name: "Urgent", value: 4, color: "rgb(191, 205, 255)" },
  { name: "Routine", value: 8, color: "rgb(232, 237, 255)" },
];

const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg bg-white p-2 text-sm shadow-sm">
        <div className="font-medium">
          <span>{payload[0].name}</span>
          <span className="ml-1">Total: {payload[0].value}</span>
        </div>
      </div>
    );
  }
  return null;
};

const CustomLegend = (props: LegendProps) => {
  const { payload } = props;
  return (
    <div className="mt-4 flex justify-center gap-6">
      {payload?.map((entry, index) => {
        const name = (entry.payload as { name?: string })?.name || "Unknown";
        const value = (entry.payload as { value?: number })?.value || 0;
        return (
          <div className="flex items-center gap-2" key={`legend-${index}`}>
            <div
              className="size-2 rounded-full"
              style={{ backgroundColor: entry.color || "#000" }}
            />
            <span className="text-sm text-gray-600">
              {value} {name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default function ReferralInsightNew() {
  return (
    <ChartLayout
      icon={<CircleUserRound className="size-3 text-[#1757F7]" />}
      title="Referral Insight"
    >
      <PieChart height={240} width={400}>
        <Pie
          data={data}
          dataKey="value"
          endAngle={-270}
          innerRadius={60}
          nameKey="name"
          outerRadius={100}
          startAngle={90}
        >
          {data.map((entry, index) => (
            <Cell fill={entry.color} key={`cell-${index}`} stroke="none" />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} cursor={false} />
        <Legend content={<CustomLegend />} verticalAlign="bottom" />
      </PieChart>
    </ChartLayout>
  );
}
