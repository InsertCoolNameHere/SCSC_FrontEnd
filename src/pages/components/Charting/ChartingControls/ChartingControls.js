import { Paper } from "@material-ui/core";
import Variables from "./Variables";
import AxisControls from "./AxisControls";

export default function ChartingControls({ collection, chartingContext, dataContext, chartingControlsContext }) {

    const renderChartingControls = () =>{
        return(
            <>
                <AxisControls chartingContext = {chartingContext} AxisContext={chartingControlsContext.yAxisContext} axisTitle = "Charting Controls"/>
                <Variables collection = {collection} dataContext = {dataContext} chartingControlsContext = {chartingControlsContext}/>
            </>
        );
    }

    return (
        <Paper className="ChartingControls">
            { chartingControlsContext.chartingControlsOpen ? renderChartingControls() : null }
        </Paper>
    );
}
