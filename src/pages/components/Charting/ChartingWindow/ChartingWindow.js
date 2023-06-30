import React, { useEffect, useState } from 'react';
import { IconButton, ButtonGroup, Paper, Typography } from '@mui/material';
import '../ChartingStyle.css';
import CancelIcon from '@mui/icons-material/CancelSharp';
import SettingsIcon from '@mui/icons-material/Settings';
import Chart from './Chart';
import { Rnd } from 'react-rnd';
import SiteComparisonChart from './SiteComparisonChart';

export default function ChartingWindow({ isSiteComparison, chartingContext, siteComparisonContext, handleChartClose}){
    const screen = {width: window.innerWidth, height: window.innerHeight};
    const [windowSize, setWindowSize] = useState({width: 500, height: 500});
    const [windowPosition, setWindowPosition] = useState({x: (screen.width / 2) - (windowSize.width / 2), y: (screen.height / 2) - (windowSize.height / 2)});

    return (
        <Rnd
            style = {{ backgroundColor: 'white', zIndex: 5001 }}
            minWidth={350}
            minHeight={350}
            size= {{ width: windowSize.width,  height: windowSize.height }}
            position= {{ x: windowPosition.x, y: windowPosition.y}}
            onDragStop= {(e, d) => { 
                setWindowPosition({ x: d.x, y: d.y }) 
            }}
            onResize={(e, direction, ref, delta, position) => {
                setWindowSize({ width: ref.offsetWidth, height: ref.offsetHeight });
                setWindowPosition({ x: position.x, y: position.y });
            }}
        >
            <div className='HeaderDiv'>
                <ButtonGroup>
                    <IconButton onClick = {chartingContext.chartingControlsContext.handleChartingControlClick}>
                        <SettingsIcon/>
                    </IconButton>
                    <IconButton onClick = {handleChartClose}>
                        <CancelIcon/>
                    </IconButton>
                </ButtonGroup>
            </div>
            { isSiteComparison ? <SiteComparisonChart chartingContext = {chartingContext} siteComparisonContext = {siteComparisonContext} /> : <Chart chartingContext={chartingContext} />}
        </Rnd>
    )
}

