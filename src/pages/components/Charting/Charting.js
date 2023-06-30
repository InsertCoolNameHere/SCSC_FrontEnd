import ChartingControls from "./ChartingControls/ChartingControls";
import ChartingWindow from "./ChartingWindow/ChartingWindow";


export default function Charting({ collection, siteComparisonContext, chartingContext, dataContext, chartingControlsContext }) {
    return (
        <>
            {chartingContext.showChart ? 
                <ChartingWindow 
                isSiteComparison = {false} 
                chartingContext={chartingContext} 
                chartingControlsContext={chartingControlsContext} 
                handleChartClose = {chartingContext.handleVariableChartClose}
                />
            :
                null
            }

            {chartingContext.showChart ?
                <ChartingControls 
                collection = {collection}
                chartingContext = {chartingContext} 
                dataContext = {dataContext} 
                chartingControlsContext={chartingControlsContext}
                />
            :
                null
            }

            {siteComparisonContext.showSiteComparisonChart ? 
                <ChartingWindow 
                isSiteComparison = {true} 
                chartingContext={chartingContext} 
                chartingControlsContext={chartingControlsContext}  
                siteComparisonContext = {siteComparisonContext} 
                handleChartClose = {siteComparisonContext.handleSiteChartClose}
                />
            :
                null
            }
        </>
    );
}
