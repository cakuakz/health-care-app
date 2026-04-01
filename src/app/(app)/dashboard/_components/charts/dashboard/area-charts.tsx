"use client";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartConfig } from "@/constant/mock/chart-data/funnel-steps/chart-config";
import { FunnelStepsChartData } from "@/constant/mock/chart-data/funnel-steps/chart-data";
import { SelectOptionsProps } from "@/constant/types/general";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import ChartLayout from "../chart-layout";
import { ChartSpline } from "lucide-react";

export default function AreaCharts() {
  const [timeRange, setTimeRange] = useState("15d");
  const timeOptions: SelectOptionsProps[] = [
    {
      label: "Last 3 Days",
      value: "3d",
    },
    {
      label: "Last 7 Days",
      value: "7d",
    },
    {
      label: "Last 15 Days",
      value: "15d",
    },
  ];

  const filteredData = FunnelStepsChartData.filter(item => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-04-15");
    let daysToSubtract = 15;
    if (timeRange === "7d") {
      daysToSubtract = 7;
    } else if (timeRange === "3d") {
      daysToSubtract = 3;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <ChartLayout
      icon={<ChartSpline className="size-3 text-[#1757F7]" />}
      isSelectFilter
      selectProps={{
        options: timeOptions,
        selectedOption: timeRange,
        setSelectedOption: setTimeRange,
        selectTriggerPlaceholder: "Last 3 Days",
      }}
      title="Funnel Steps"
    >
      <ChartContainer className="h-max w-full max-w-[380px]" config={chartConfig}>
        <AreaChart accessibilityLayer data={filteredData}>
          <CartesianGrid vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="date"
            minTickGap={20}
            tickFormatter={value => {
              const date = new Date(value as string | number | Date);
              return date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
            }}
            tickLine={false}
            tickMargin={8}
          />
          <YAxis axisLine={false} tickCount={5} tickLine={false} tickMargin={8} />
          <ChartTooltip
            content={
              <ChartTooltipContent
                indicator="dot"
                labelFormatter={(value: string | number | Date) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
            }
            cursor={false}
          />
          <Area dataKey="Review" fill="#6893FF" stackId="a" stroke="#6893FF" type="natural" />
          <Area dataKey="Received" fill="#9CBEFF" stackId="a" stroke="#9CBEFF" type="natural" />
          <Area dataKey="Submitted" fill="#C5D9FF" stackId="a" stroke="#C5D9FF" type="natural" />
          <Area dataKey="Completed" fill="#E5EEFF" stackId="a" stroke="#E5EEFF" type="natural" />
          <ChartLegend content={<ChartLegendContent />} />
        </AreaChart>
      </ChartContainer>
    </ChartLayout>
  );
}
