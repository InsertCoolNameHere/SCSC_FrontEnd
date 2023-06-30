
import React, {useState} from 'react';
import { Paper, Typography, Stack } from '@mui/material';
import MeasurementList from './MeasurementList';
import StatisticsTypeSelect from './StatisticsTypeSelect';

export default function MeasurementsMenu({ collection, dataContext, chartingContext, chartingControlsContext, metadata }) {
    const [statisticType, setStatisticType] = useState("Min");

    return(
        <Paper className = "GenericMenu" elevation = {3} align = 'center' square>
            <Stack className = "MeasurementsMenuHeader" direction = "row" spacing = {1}>
                <Typography variant = "h6" sx={{textDecoration: 'underline'}} display="inline" > Aggregate Measurements </Typography>
                <StatisticsTypeSelect statisticType = {statisticType} setStatisticType = {setStatisticType}/>
            </Stack>
            <MeasurementList
                collection={collection}
                dataContext={dataContext}
                chartingContext={chartingContext}
                metadata={metadata}
                statisticType={statisticType}
            />
        </Paper>
    )
}