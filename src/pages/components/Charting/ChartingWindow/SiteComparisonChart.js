import { useEffect } from 'react';
import { ResponsiveContainer } from 'recharts';
import { BarChart, Bar, ScatterChart, Scatter, ZAxis, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

export default function SiteComparisonChart({ chartingContext }) {

    return (
        <ResponsiveContainer className='ChartContainer'>
            {chartingContext.getSiteComparisonChart("Line")}
        </ResponsiveContainer>
   )
}
