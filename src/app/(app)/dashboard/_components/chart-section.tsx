"use client";

import React from "react";
import OrdersChart from "./charts/dashboard/orders-chart";
import TodayActivity from "./charts/dashboard/today-activity";
import { SidebarChart } from "./charts/apexchart-dashboard/sidebar-chart";
import ReferralInsight from "./charts/dashboard/referral-insight";

export default function ChartSection() {
  return (
    <div className="grid w-full grid-cols-2 gap-4 bg-white">
      <SidebarChart />
      <ReferralInsight />
      <OrdersChart />
      <TodayActivity />
    </div>
  );
}
