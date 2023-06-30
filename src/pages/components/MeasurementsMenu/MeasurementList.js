import React, { useState, useEffect } from 'react';
import { Divider, IconButton, ListItem, Typography } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import FieldInfo from '../Utility/FieldInfo';

export default function MeasurementList({ collection, dataContext, chartingContext, statisticType, metadata }){
    const [index, setIndex] = useState(0);
    const measurements = dataContext.collectionMeasurements[collection];

    useEffect(() =>{
        switch(statisticType){
            case "Min": 
                setIndex(0);
                break;
            case "Max":
                setIndex(1);
                break;
            default:
                setIndex(0);
        }
    }, [statisticType])


    const handleChartClick = (e, item) => {
        e.stopPropagation();
        chartingContext.setShowChart(true);
    }
    
    return dataContext.dataKeys.get(collection).map((item) => {
        return (
            <div key = {item}>
                <ListItem
                    style={{ justifyContent: "flex-end" }}
                >
                    <Typography style={{ marginInlineEnd: "auto" }}>
                        {item}
                    </Typography>
                    <Typography style={{ marginRight: "10px", color: "seagreen" }}>
                        { measurements.get(item)[index].toFixed(4) }
                    </Typography>
                    <IconButton onClick={(e) => handleChartClick(e, item)}>
                        <BarChartIcon style={{ color: "#1976d2" }}/>
                    </IconButton>
                    <FieldInfo metadata={metadata} collection={collection} field={item} left="10px" />
                </ListItem>
                <Divider className = "MeasurementsMenuDivider"/>
            </div>
        )
    });
}