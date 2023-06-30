import {useState} from 'react';
import {Divider, Stack, Typography, IconButton} from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Checkbox from '@mui/material/Checkbox';
import BarChartIcon from '@mui/icons-material/BarChart';

const commonStyles = {
    bgcolor: 'background.paper',
    borderColor: 'grey',
    border: 1,
    width: '12.25vw',
    height: '50px',
    borderRadius: 1,
};


export default function SiteComparison( { siteComparisonContext, iconID} ) {
    const [itemName, setItemName] = useState('');

    return (
        <>
            <Stack className="IndividualIcon" direction = 'row' spacing = {1.5}>
                <Checkbox defaultChecked size="small" onClick = {() => siteComparisonContext.handleSiteCheckBox(iconID)}/>
                <Typography> { iconID } </Typography>
                <IconButton onClick = {siteComparisonContext.handleChartClick}>
                    <BarChartIcon style={{ color: "#1976d2" }}/>
                </IconButton>
                <IconButton onClick={() => siteComparisonContext.removeSiteComparison(iconID)}>
                    <HighlightOffIcon />
                </IconButton>
            </Stack>
            <Divider className = "SiteComparisonDivider"/>
        </>
    );
}