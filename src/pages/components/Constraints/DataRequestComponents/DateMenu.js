import useDateMenu from '../../../hooks/Utility/useDateMenu';
import DatePicker from './DatePicker';
import DateSlider from "./DateSlider";
import { Paper } from '@mui/material';

export default function DateMenu({dateRange}){
    const dateMenuContext = useDateMenu(['2018-06-05', '2023-04-06']);

    return(
        <Paper className= "DateMenu" align = "center">
            <DatePicker dateMenuContext = { dateMenuContext }/> 
            <DateSlider dateMenuContext = { dateMenuContext }/>
        </Paper>
    );
}