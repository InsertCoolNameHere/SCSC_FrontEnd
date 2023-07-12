import React, { useRef, useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";


function ColumnWithRotatedLabels(props) {
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
        pinchZoomX: true
      }));

      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
      cursor.lineY.set("visible", false);
      
      
      // Create axes
      // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
      var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
      xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15
      });
      
      xRenderer.grid.template.setAll({
        location: 1
      })
      
      var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
        maxDeviation: 0.3,
        categoryField: "country",
        renderer: xRenderer,
        tooltip: am5.Tooltip.new(root, {})
      }));


      
      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
        maxDeviation: 0.3,
        renderer: am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1
        })
      }));
      
      
      // Create series
      // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
      var series = chart.series.push(am5xy.ColumnSeries.new(root, {
        name: "Series 1",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "value",
        sequencedInterpolation: true,
        categoryXField: "country",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}"
        })
      }));
      
      series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
      series.columns.template.adapters.add("fill", function(fill, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });
      
      series.columns.template.adapters.add("stroke", function(stroke, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });
      
      
      // Set data
      var data = [{country: 'South Dakota', value: 1},
      {country: 'ND', value: 1},
      {country: 'OH', value: 1},
      {country: 'Georgia', value: 1},
      {country: 'Michigan', value: 1},
      {country: 'Nebraska', value: 1},
      {country: 'Michigan', value: 1},
      {country: 'Michigan', value: 2},
      {country: 'Ohio', value: 3},
      {country: 'Illinois', value: 1},
      {country: 'Illinois', value: 2},
      {country: 'Illinois', value: 3},
      {country: 'Texas', value: 1},
      {country: 'North Dakota', value: 1},
      {country: 'Colorado', value: 3},
      {country: 'Texas', value: 4},
      {country: 'Kansas', value: 5},
      {country: 'Kentucky', value: 6},
      {country: 'Maine', value: 1},
      {country: 'Maine', value: 2},
      {country: 'Ohio', value: 1},
      {country: 'Ohio', value: 2},
      {country: 'Michigan', value: 3},
      {country: 'Illinois', value: 1},
      {country: 'Tennessee', value: 1},
      {country: 'Illinois', value: 1},
      {country: 'Ohio', value: 1},
      {country: 'Iowa', value: 1},
      {country: 'Illinois', value: 1},
      {country: 'Colorado', value: 1},
      {country: 'Alabama', value: 1},
      {country: 'Iowa', value: 1},
      {country: 'Iowa', value: 1},
      {country: 'Iowa', value: 2},
      {country: 'Nebraska', value: 1},
      {country: 'Montana', value: 1},
      {country: 'Montana', value: 1},
      {country: 'Montana', value: 1},
      {country: 'Georgia', value: 1},
      {country: 'Virginia', value: 1},
      {country: 'Colorado', value: 1},
      {country: 'Colorado', value: 2},
      {country: 'Colorado', value: 3},
      {country: 'Minnesota', value: 1},
      {country: 'Maryland', value: 1}];
      
      xAxis.data.setAll(data);
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
export default ColumnWithRotatedLabels;