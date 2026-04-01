"use client";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { chartConfig } from "@/constant/mock/chart-data/funnel-steps/chart-config";
import { FunnelStepsChartData } from "@/constant/mock/chart-data/funnel-steps/chart-data";
import { SelectOptionsProps } from "@/constant/types/general";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, LabelList, XAxis, YAxis } from "recharts";
import ChartLayout from "../chart-layout";
import { ChartSpline } from "lucide-react";

// Define filter options
const filterOptions: SelectOptionsProps[] = [
  { value: "1", label: "Today" },
  { value: "7", label: "Last 7 Days" },
  { value: "14", label: "Last 14 Days" },
];

export const getFunnelStepsData = (days: number) => {
  const latestData = FunnelStepsChartData.slice(-days);

  return Object.entries(chartConfig).map(([key, config]) => ({
    category: config.label,
    value: latestData.reduce((sum, entry) => sum + Number(entry[key as keyof typeof entry]), 0),
    color: config.color,
  }));
};

export function SidebarChart() {
  const [selectedDays, setSelectedDays] = useState<string>("7");

  const tryChartData = getFunnelStepsData(Number(selectedDays));

  return (
    <ChartLayout
      icon={<ChartSpline className="size-3 text-[#1757F7]" />}
      isSelectFilter
      selectProps={{
        options: filterOptions,
        selectedOption: selectedDays,
        setSelectedOption: setSelectedDays,
        selectTriggerPlaceholder: "Last 7 Days",
      }}
      title="Funnel Steps"
    >
      <ChartContainer className="h-max w-full max-w-[380px]" config={chartConfig}>
        <BarChart data={tryChartData} layout="vertical" margin={{ left: 5 }}>
          <CartesianGrid horizontal={false} />
          <XAxis hide type="number" />
          <YAxis axisLine={false} dataKey="category" tickLine={false} type="category" width={0} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                color="#1757F7"
                hideLabel
                indicator="dashed"
                nameKey="category"
              />
            }
            cursor={false}
          />
          <Bar barSize={45} dataKey="value" radius={4}>
            {tryChartData.map((entry, index) => (
              <Cell fill={entry.color} key={`cell-${index}`} />
            ))}
            <LabelList
              className="fill-[#0A2568] font-semibold"
              dataKey="category"
              fontSize={12}
              offset={8}
              position="insideLeft"
            />
            <LabelList
              className="fill-foreground"
              dataKey="value"
              fontSize={12}
              offset={10}
              position="right"
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartLayout>
  );
}
