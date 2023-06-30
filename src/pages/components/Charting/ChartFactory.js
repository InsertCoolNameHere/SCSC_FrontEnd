import React from 'react';
import { BarChart, Bar, ScatterChart, Scatter, ZAxis, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export class ChartFactory {
    constructor(chartData, chartingContext, chartingControlsContext, factoryContext) {
        this.chartData = chartData;
        this.chartingContext = chartingContext;
        this.chartingControlsContext = chartingControlsContext;
        this.factoryContext = factoryContext;
    }
    
    getChart(type){
        switch(type) {
            case 'Line':
                return LineChartComponent(this.chartData, this.chartingControlsContext, this.factoryContext);
            case 'Scatter Plot':
                return ScatterPlotComponent(this.chartData, this.chartingControlsContext, this.factoryContext);
            case 'Histogram':
                return HistogramPlotComponent(this.chartData, this.chartingControlsContext, this.factoryContext);
        }
    }
}


//default LineChart for testing: 
function LineChartComponent(chartData, chartingControlsContext, factoryContext) {
    const yAxis = chartingControlsContext ? chartingControlsContext.yAxisContext : "Linear";

    return (
        <LineChart width={730} height={500} data={chartData}
            margin={{ top: 15, right: 80, left: 40, bottom: 70 }}>
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip />
            <Legend /> 
            <XAxis 
            dataKey={'Date_Time'}
            />
            <YAxis 
            scale = {yAxis.scale} 
            domain = {['auto', 'auto']}
            />
            { factoryContext.getLines("Line") }
        </LineChart>
    );
}

//default ScatterPlot for testing: 
function ScatterPlotComponent(chartData, chartingControlsContext, factoryContext) {
    const yAxis = chartingControlsContext ? chartingControlsContext.yAxisContext : "Linear";
    const data01 = [
        {
          "x": 100,
          "y": 200,
          "z": 200
        },
        {
          "x": 120,
          "y": 100,
          "z": 260
        },
        {
          "x": 170,
          "y": 300,
          "z": 400
        },
        {
          "x": 140,
          "y": 250,
          "z": 280
        },
        {
          "x": 150,
          "y": 400,
          "z": 500
        },
        {
          "x": 110,
          "y": 280,
          "z": 200
        }
      ];
      const data02 = [
        {
          "x": 200,
          "y": 260,
          "z": 240
        },
        {
          "x": 240,
          "y": 290,
          "z": 220
        },
        {
          "x": 190,
          "y": 290,
          "z": 250
        },
        {
          "x": 198,
          "y": 250,
          "z": 210
        },
        {
          "x": 180,
          "y": 280,
          "z": 260
        },
        {
          "x": 210,
          "y": 220,
          "z": 230
        }
    ];

    return (
        <ScatterChart
        width={730} height={500} 
        margin={{ top: 15, right: 80, left: 40, bottom: 70 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" type="number" name="epoch_time" unit=" days" />
            <YAxis dataKey="y" type="number" name="BD" unit=" units" />
            <ZAxis dataKey="z" type="number" range={[0, 100]} name="value" unit="km" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter name="MI_B1_P1_T6{BD}" data={data01} fill="#8884d8" />
            <Scatter name="OK_B1_P2_T12{HA}" data={data02} fill="#82ca9d" />
        </ScatterChart>
    );
}

//default HistogramPlot for testing: 
function HistogramPlotComponent(chartData, chartingControlsContext, factoryContext) {
    return (
        <BarChart 
        width={730} height={500} 
        margin={{ top: 15, right: 80, left: 40, bottom: 70 }}
        data={chartData}>
            <XAxis dataKey="Date_Time" />
            <YAxis domain = {[0, 100]}/>
            <Tooltip />
            { factoryContext.getLines('Histogram') } 
        </BarChart>
    );
}