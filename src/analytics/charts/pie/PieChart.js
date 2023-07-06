import React, { useRef, useLayoutEffect } from 'react';
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";


function PieChart(props) {
  useLayoutEffect(() => {
    
    let root = am5.Root.new(props.id);
    root._logo.dispose();


    root.setThemes([
      am5themes_Animated.new(root)
    ]);

    var chart = root.container.children.push(
        am5percent.PieChart.new(root, {
          endAngle: 270
        })
      );
      
      // Create series
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Series
      var series = chart.series.push(
        am5percent.PieSeries.new(root, {
          valueField: "value",
          categoryField: "category",
          endAngle: 270
        })
      );
      
      series.states.create("hidden", {
        endAngle: -90
      });
      
      // Set data
      // https://www.amcharts.com/docs/v5/charts/percent-charts/pie-chart/#Setting_data
      series.data.setAll([{
        category: "Lithuania",
        value: 501.9
      }, {
        category: "Czechia",
        value: 301.9
      }, {
        category: "Ireland",
        value: 201.1
      }, {
        category: "Germany",
        value: 165.8
      }, {
        category: "Australia",
        value: 139.9
      }, {
        category: "Austria",
        value: 128.3
      }, {
        category: "UK",
        value: 99
      }]);
      
      series.appear(1000, 100);
      

    return () => {
      root.dispose(); 
    };
  }, []);

  return (
    <div id={props.id} style={{ width: "100%", height: "100%" }}></div>
  );
}
export default PieChart;