import React, { useRef, useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";


function LineGraph(props) {
  useLayoutEffect(() => {
    
    let root = am5.Root.new(props.id);
    root._logo.dispose();


    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    var chart = root.container.children.push(am5xy.XYChart.new(root, {
        panX: true,
        panY: true,
        wheelX: "panX",
        wheelY: "zoomX",
        pinchZoomX:true
      }));
      
      
      // Add cursor
      // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
        behavior: "none"
      }));
      cursor.lineY.set("visible", false);
      
      
      // Generate random data
      var date = new Date();
      date.setHours(0, 0, 0, 0);
      var value = 3;
      
      function generateData() {
        const temp = [1, 2, 3, 4, 5];
        const random = Math.floor(Math.random() * temp.length);
        value = temp[random];
        am5.time.add(date, "day", 1);
        return {
          date: date.getTime(),
          value: value
        };
      }
      
      function generateDatas(count) {
        var data = [];
        for (var i = 0; i < count; ++i) {
          data.push(generateData());
        }
        return data;
      }
      
      
      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        baseInterval: {
          timeUnit: "day",
          count: 1
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {})
      }));
      
      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      }));
      
      
      // Add series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      var series = chart.series.push(am5xy.LineSeries.new(root, {
        name: "Series",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        valueXField: "date",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}"
        })
      }));
      
      
      // Add scrollbar
      // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
      chart.set("scrollbarX", am5.Scrollbar.new(root, {
        orientation: "horizontal"
      }));
      
      
      // Set data
      var data = generateDatas(50);
      series.data.setAll(data);
      
      
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
export default LineGraph;