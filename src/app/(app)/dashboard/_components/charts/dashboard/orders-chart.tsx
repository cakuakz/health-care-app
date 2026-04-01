import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ordersChartConfig } from "@/constant/mock/chart-data/orders-chart/chart-config";
import { OrdersChartData } from "@/constant/mock/chart-data/orders-chart/chart-data";
import { SelectOptionsProps } from "@/constant/types/general";
import { useState } from "react";
import ChartLayout from "../chart-layout";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Cell } from "recharts";
import { NotebookPen } from "lucide-react";

export default function OrdersChart() {
  const [months, setMonths] = useState("3");

  const monthOptions: SelectOptionsProps[] = [
    {
      label: "Last 3 Months",
      value: "3",
    },
    {
      label: "Last 5 Months",
      value: "5",
    },
    {
      label: "Last 7 Months",
      value: "7",
    },
  ];

  const filterData = (data: typeof OrdersChartData, months: number) => {
    const filteredData = data.slice(-months);
    return Object.entries(ordersChartConfig).map(([key, config]) => ({
      category: config.label,
      value: filteredData.reduce((sum, month) => sum + Number(month[key as keyof typeof month]), 0),
    }));
  };

  const chartData = filterData(OrdersChartData, Number.parseInt(months));

  return (
    <ChartLayout
      icon={<NotebookPen className="size-3 text-[#1757F7]" />}
      isSelectFilter
      selectProps={{
        options: monthOptions,
        selectedOption: months,
        setSelectedOption: setMonths,
        selectTriggerPlaceholder: "Last 3 Months",
      }}
      title="Orders"
    >
      <ChartContainer className="h-max w-full max-w-[380px]" config={ordersChartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="category"
            interval={0}
            tick={{ fontSize: 12, width: 100 }}
            tickLine={false}
            tickMargin={16}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            barSize={60}
            dataKey="value"
            fill={ordersChartConfig.overdue.color}
            radius={[4, 4, 0, 0]}
          >
            {chartData.map((entry, index) => {
              const category = entry.category
                .toLowerCase()
                .replace(" ", "") as keyof typeof ordersChartConfig;
              const color = ordersChartConfig[category]?.color || ordersChartConfig.overdue.color;
              return <Cell fill={color} key={`cell-${index}`} />;
            })}
            <LabelList
              className="fill-foreground"
              dataKey="value"
              fontSize={12}
              offset={10}
              position="top"
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </ChartLayout>
  );
}
