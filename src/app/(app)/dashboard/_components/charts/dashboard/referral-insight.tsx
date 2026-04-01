import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { SelectOptionsProps } from "@/constant/types/general";
import { ChartSpline } from "lucide-react";
import { useState } from "react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart, Legend } from "recharts";
import ChartLayout from "../chart-layout";
import { ReferralInsightChartData } from "@/constant/mock/chart-data/referral-insight/chart-data";
import { referralInsightChartConfig } from "@/constant/mock/chart-data/referral-insight/chart-config";

export default function ReferralInsight() {
  const [monthRange, setMonthRange] = useState("january");

  const monthsOptions: SelectOptionsProps[] = [
    {
      label: "January",
      value: "january",
    },
    {
      label: "February",
      value: "february",
    },
    {
      label: "March",
      value: "march",
    },
    {
      label: "April",
      value: "april",
    },
    {
      label: "May",
      value: "may",
    },
    {
      label: "June",
      value: "june",
    },
    {
      label: "July",
      value: "july",
    },
  ];

  const monthData =
    ReferralInsightChartData.find(data => data.month === monthRange) || ReferralInsightChartData[0];
  const total = monthData.Routine + monthData.STAT + monthData.Urgent;

  const CustomLegend = ({ data }: { data: typeof monthData }) => {
    return (
      <div className="flex justify-center gap-6">
        {Object.entries(referralInsightChartConfig).map(([key, config]) => (
          <div className="flex items-center gap-2" key={`legend-${key}`}>
            <div className="size-2 rounded-full" style={{ backgroundColor: config.color }} />
            <span className="text-sm text-gray-600">
              {data[key as keyof typeof data]} {config.label}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <ChartLayout
      icon={<ChartSpline className="size-3 text-[#1757F7]" />}
      isSelectFilter
      selectProps={{
        options: monthsOptions,
        selectedOption: monthRange,
        setSelectedOption: setMonthRange,
        selectTriggerPlaceholder: "January",
      }}
      title="Referral Insight"
    >
      <ChartContainer className="h-max w-full max-w-[380px]" config={referralInsightChartConfig}>
        <RadialBarChart
          data={[monthData]}
          endAngle={360}
          innerRadius={60}
          outerRadius={120}
          startAngle={0}
        >
          <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
          <PolarRadiusAxis axisLine={false} tick={false} tickLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <svg height="300" width="300">
                      <defs>
                        <linearGradient id="text-gradient" x1="0%" x2="0%" y1="0%" y2="100%">
                          <stop offset="0%" stopColor="#97D4FF" />
                          <stop offset="100%" stopColor="#1757F7" />
                        </linearGradient>
                      </defs>
                      <text textAnchor="middle" x={viewBox.cx} y={viewBox.cy}>
                        <tspan
                          className="fill-muted-foreground"
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 10}
                        >
                          Total
                        </tspan>
                        <tspan
                          fill="url(#text-gradient)"
                          fontSize="24"
                          fontWeight="bold"
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 14}
                        >
                          {total}
                        </tspan>
                      </text>
                    </svg>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
          <RadialBar
            className="stroke-transparent stroke-2"
            dataKey="STAT"
            fill="#7FABFF"
            stackId="a"
          />
          <RadialBar
            className="stroke-transparent stroke-2"
            dataKey="Urgent"
            fill="#C5D9FF"
            stackId="a"
          />
          <RadialBar
            className="stroke-transparent stroke-2"
            dataKey="Routine"
            fill="#E5EEFF"
            stackId="a"
          />
          <Legend
            content={<CustomLegend data={monthData} />}
            margin={{ top: 100 }}
            verticalAlign="bottom"
          />
        </RadialBarChart>
      </ChartContainer>
    </ChartLayout>
  );
}
