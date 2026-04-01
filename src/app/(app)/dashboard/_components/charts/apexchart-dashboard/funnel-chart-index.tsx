"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import WebFont from "webfontloader";
import ChartLayout from "../chart-layout";
import { ChartSpline } from "lucide-react";

export default function FunnelChart() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    WebFont.load({
      google: { families: ["Plus Jakarta Sans:400,500,700"] },
      active: () => setFontLoaded(true),
    });
  }, []);

  useLayoutEffect(() => {
    if (!chartRef.current || !fontLoaded) return;

    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5percent.SlicedChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    const series = chart.series.push(
      am5percent.FunnelSeries.new(root, {
        alignLabels: false,
        orientation: "horizontal",
        valueField: "value",
        categoryField: "category",
        bottomRatio: 1,
        colors: am5.ColorSet.new(root, {
          colors: [
            am5.color(0x6893ff),
            am5.color(0x9cbeff),
            am5.color(0xc5d9ff),
            am5.color(0xe5eeff),
          ],
          step: 1,
        }),
      })
    );

    series.data.setAll([
      { value: 10, category: "Received" },
      { value: 9, category: "Reviewed" },
      { value: 6, category: "Submitted" },
      { value: 5, category: "Completed" },
    ]);

    series.labels.template.setAll({
      fontSize: 10,
      fontWeight: "400",
      fontFamily: "Plus Jakarta Sans",
      fill: am5.color(0x550000),
      text: "{category}",
    });

    series.links.template.setAll({
      height: 0,
      width: 0,
    });

    // const tooltip = series.set("tooltip", am5.Tooltip.new(root, {}))

    // tooltip.label.set("text", "[fontFamily: Plus Jakarta Sans fontWeight: 500]{category}: {valuePercentTotal.formatNumber('0.00')}% ({value})[/]")

    series.slices.template.set(
      "tooltipText",
      "{category}: [bold]{valuePercentTotal.formatNumber('0.00')}%[/] ({value})"
    );

    series
      .appear(1000, 100)
      .then(() => {})
      .catch(err => console.error(err));

    // Add legend
    const legend = chart.children.unshift(
      am5.Legend.new(root, {
        nameField: "categoryX",
        centerX: am5.percent(50),
        x: am5.p50,
        marginBottom: 15,
        templateField: "category",
      })
    );

    legend.data.setAll(series.dataItems);

    legend.valueLabels.template.set("forceHidden", true);

    legend.markers.template.setAll({
      width: 4,
      height: 8,
    });

    legend.labels.template.setAll({
      fontSize: 12,
      fontWeight: "400",
      fontFamily: "Plus Jakarta Sans",
    });

    return () => {
      root.dispose();
    };
  }, [fontLoaded]);

  return (
    <ChartLayout icon={<ChartSpline className="size-3" />} title="Funnel Steps">
      <div ref={chartRef} style={{ width: "100%", height: "300px" }} />
    </ChartLayout>
  );
}
