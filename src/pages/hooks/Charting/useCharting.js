import { useState } from "react";
import { ChartFactory } from "../../components/Charting/ChartFactory";

export default function useCharting(collection, dataContext, chartingControlsContext, siteComparisonContext){
    const [showChart, setShowChart] = useState(false);
    const [chartType, setChartType ] = useState("Line");
    const [fields, setFields] = useState(dataContext.collectionMeasurements[collection]);

    const context = {showChart, setShowChart, chartType, setChartType};

    const variableChartFactory = new ChartFactory(dataContext.getVariableChartData(), context, chartingControlsContext, chartingControlsContext.variablesContext);
    const siteComparisonChartFactory = new ChartFactory(siteComparisonContext.getSiteComparisonChartData(), "", "", siteComparisonContext);

    function handleVariableChartClose(){
        chartingControlsContext.variablesContext.setVariables([]);
        chartingControlsContext.variablesContext.setNumVariables([0]);
        setShowChart(false);
    }

    return { 
        showChart,
        setShowChart: (bool) => setShowChart(bool), 
        chartingControlsContext,
        handleVariableChartClose,
        chartType,
        setChartType: (event) => setChartType(event.target.value),
        getVariableChart: (chart) => variableChartFactory.getChart(chart),
        getSiteComparisonChart: (chart) => siteComparisonChartFactory.getChart(chart),
        fields
    }
}