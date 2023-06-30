import SiteComparison from "./SiteComparison";
import SiteComparisonFormControl from '../Charting/ChartingControls/SiteComparisonFormControl';
import {Stack} from '@mui/material';
import { Typography } from "@material-ui/core";

export default function SiteComparisons({ dataKeys, siteComparisonContext}) {
    const iterableIconArray = Array.from(siteComparisonContext.siteComparisons);
    return (
        <div className = "IconComparisons">
            <Stack className = "IconComparisonSelector" direction = 'row'>
                <Typography> Comparisons with respect to: </Typography>
                <SiteComparisonFormControl 
                dataKeys = {dataKeys} 
                handleFormControlChange = {siteComparisonContext.handleSoilFieldChange}
                />
            </Stack>
            {iterableIconArray.map((iconID) => {
                return <SiteComparison 
                key = {iconID} 
                iconID = {iconID} 
                siteComparisonContext = {siteComparisonContext}
                />
            })}
        </div>
    );
}