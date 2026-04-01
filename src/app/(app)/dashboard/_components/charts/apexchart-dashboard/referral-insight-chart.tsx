"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import ChartLayout from "../chart-layout";
import { ChartSpline } from "lucide-react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ReferralInsightChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  const selectOptions = [
    { label: "Today", value: "today" },
    { label: "Yesterday", value: "yesterday" },
    { label: "This Week", value: "week" },
  ];

  const [chartState] = useState({
    series: [4, 4, 8],
    options: {
      chart: {
        type: "donut" as const,
        fontFamily: "inherit",
      },
      colors: ["#4B83FF", "#93B5FF", "#E2EAFF"],
      labels: ["STAT", "Urgent", "Routine"],
      legend: {
        position: "right" as const,
        fontSize: "14px",
        offsetY: 100,
        markers: { size: 8 },
        itemMargin: { vertical: 4 },
        formatter: (
          seriesName: string,
          opts: { w: { globals: { series: number[] } }; seriesIndex: number }
        ) => `${opts.w.globals.series[opts.seriesIndex]} ${seriesName}`,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "50%",
            labels: {
              show: true,
              name: { show: false },
              value: {
                show: true,
                fontSize: "24px",
                fontWeight: 600,
                color: "#1a1a1a",
                offsetY: 8,
                formatter: () => "16",
              },
              total: {
                show: true,
                label: "Total",
                fontSize: "14px",
                color: "#666666",
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => `${Math.round(val)}%`,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 280 },
            legend: { position: "bottom" },
          },
        },
      ],
      stroke: { show: false },
    },
  });

  return (
    <ChartLayout
      icon={<ChartSpline className="size-3 text-[#1757F7]" />}
      isSelectFilter={true}
      selectProps={{
        selectedOption: selectedPeriod,
        setSelectedOption: setSelectedPeriod,
        selectTriggerPlaceholder: "Select period",
        options: selectOptions,
      }}
      title="Referral Insight"
    >
      <div className="h-[220px] w-full">
        <ReactApexChart
          height="100%"
          options={chartState.options}
          series={chartState.series}
          type="donut"
        />
      </div>
    </ChartLayout>
  );
}
