import React from 'react';
import { ResponsiveContainer } from 'recharts';

export default function Chart({chartingContext}) {
    return (
        <ResponsiveContainer className='ChartContainer'>
                { chartingContext.getVariableChart(chartingContext.chartType) } 
        </ResponsiveContainer>
    )
}