import { useState } from "react";
import useXAxis from "./useXAxis";
import useYAxis from "./useYAxis";
import useVariables from "./useVariables";

export default function useChartingControls(){
    const [chartingControlsOpen, setChartingControlsOpen] = useState(true);

    const variablesContext = useVariables();
    const xAxisContext = useXAxis();
    const yAxisContext = useYAxis();

    const context = {xAxisContext, yAxisContext, variablesContext}

    return { 
        xAxisContext,
        yAxisContext,
        variablesContext,
        chartingControlsOpen,
        handleChartingControlClick: () => setChartingControlsOpen(!chartingControlsOpen),
    }
}