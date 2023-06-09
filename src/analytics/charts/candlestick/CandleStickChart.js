import React, { useRef, useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";


function CandleStickChart(props) {
  useLayoutEffect(() => {
    
    let root = am5.Root.new(props.id);
    root._logo.dispose();


    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    function generateChartData() {
        var chartData = [];
        var firstDate = new Date();
        firstDate.setDate(firstDate.getDate() - 16070);
        firstDate.setHours(0, 0, 0, 0);
        var value = 5;
        for (var i = 0; i < 60; i++) {
          var newDate = new Date(firstDate);
          newDate.setDate(newDate.getDate() + i);
      
          const temp = [1, 2, 3, 4, 5];
         const random = Math.floor(Math.random() * temp.length);
         value = temp[random];
          var open = value + Math.round(Math.random() );
          var low = Math.min(value, open) - Math.round(Math.random() * 5);
          var high = Math.max(value, open) + Math.round(Math.random() * 5);
      
          chartData.push({
            date: newDate.getTime(),
            value: value,
            open: open,
            low: low,
            high: high
          });
        }
        return chartData;
      }
      
      var data = generateChartData();
      
      // Create chart
      // https://www.amcharts.com/docs/v5/charts/xy-chart/
      var chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          focusable: true,
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX"
        })
      );
      
      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var xAxis = chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          groupData: true,
          maxDeviation:0.5,
          baseInterval: { timeUnit: "day", count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {pan:"zoom"}),
          tooltip: am5.Tooltip.new(root, {})
        })
      );
      
      var yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation:1,
          renderer: am5xy.AxisRendererY.new(root, {pan:"zoom"})
        })
      );
      
      var color = root.interfaceColors.get("background");
      
      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      var series = chart.series.push(
        am5xy.CandlestickSeries.new(root, {
          fill: color,
          calculateAggregates: true,
          stroke: color,
          name: "soil.depth.inc",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          openValueYField: "open",
          lowValueYField: "low",
          highValueYField: "high",
          valueXField: "date",
          lowValueYGrouped: "low",
          highValueYGrouped: "high",
          openValueYGrouped: "open",
          valueYGrouped: "close",
          legendValueText:
            "mean: {openValueY} min: {lowValueY} max: {highValueY}",
          legendRangeValueText: "{valueYClose}",
          tooltip: am5.Tooltip.new(root, {
            pointerOrientation: "horizontal",
            labelText: "mean: {openValueY}\nmin: {lowValueY}\nmax: {highValueY}"
          })
        })
      );
      
      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      var cursor = chart.set(
        "cursor",
        am5xy.XYCursor.new(root, {
          xAxis: xAxis
        })
      );
      cursor.lineY.set("visible", false);
      
      // Stack axes vertically
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/#Stacked_axes
      chart.leftAxesContainer.set("layout", root.verticalLayout);
      
      // Add scrollbar
      // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
      var scrollbar = am5xy.XYChartScrollbar.new(root, {
        orientation: "horizontal",
        height: 50
      });
      chart.set("scrollbarX", scrollbar);
      
      var sbxAxis = scrollbar.chart.xAxes.push(
        am5xy.DateAxis.new(root, {
          groupData: true,
          groupIntervals: [{ timeUnit: "week", count: 1 }],
          baseInterval: { timeUnit: "day", count: 1 },
          renderer: am5xy.AxisRendererX.new(root, {
            opposite: false,
            strokeOpacity: 0
          })
        })
      );
      
      var sbyAxis = scrollbar.chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: am5xy.AxisRendererY.new(root, {})
        })
      );
      
      var sbseries = scrollbar.chart.series.push(
        am5xy.LineSeries.new(root, {
          xAxis: sbxAxis,
          yAxis: sbyAxis,
          valueYField: "value",
          valueXField: "date"
        })
      );
      
      // Add legend
      // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
      var legend = yAxis.axisHeader.children.push(am5.Legend.new(root, {}));
      
      legend.data.push(series);
      
      legend.markers.template.setAll({
        width: 10
      });
      
      legend.markerRectangles.template.setAll({
        cornerRadiusTR: 0,
        cornerRadiusBR: 0,
        cornerRadiusTL: 0,
        cornerRadiusBL: 0
      });
      
      // set data
      series.data.setAll(data);
      sbseries.data.setAll(data);
      
      // Make stuff animate on load
      // https://www.amcharts.com/docs/v5/concepts/animations/
      series.appear(1000);
      chart.appear(1000, 100);

    return () => {
      root.dispose(); 
    };
  }, []);

  return (
    <div id={props.id} style={{ width: "100%", height: "100%" }}></div>
  );
}
export default CandleStickChart;