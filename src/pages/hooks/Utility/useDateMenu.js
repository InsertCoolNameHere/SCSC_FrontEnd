import { useState } from "react";
import dayjs from 'dayjs';

export default function useDateMenu(dateRange){
    const [dateLimits, setDateLimits] = useState([dayjs(dateRange[0]), dayjs(dateRange[1])]);
    const [minDate, setMinDate] = useState(dayjs(dateRange[0]));
    const [maxDate, setMaxDate] = useState(dayjs(dateRange[1]));
    const [pastValues, setPastValues] = useState([0, maxDate.diff(minDate, 'month')]);

    //Switches between year slider, month slider, day slide
    const [dateRadioSelection, setDateRadioSelection] = useState('Month');

    function handleChangeMinDate(newValue){
        if(dateRadioSelection === 'Month'){
            const maxRangeInMonths = dateLimits[1].diff(dateLimits[0], 'month'); //the max range in months
            const monthsSinceBeginning = newValue.diff(dateLimits[0], 'month'); //months since our start range
            const monthsSinceEnd = dateLimits[1].diff(maxDate, 'month');
            setPastValues([monthsSinceBeginning, maxRangeInMonths - monthsSinceEnd]);
        }else if(dateRadioSelection === 'Day'){
            const maxRangeInDays = dateLimits[1].diff(dateLimits[0], 'day'); //the max range in months
            const daysSinceBeginning = newValue.diff(dateLimits[0], 'day'); //months since our start range
            const daysSinceEnd = dateLimits[1].diff(maxDate, 'day');
            setPastValues([daysSinceBeginning, maxRangeInDays - daysSinceEnd]);
        }
        setMinDate(newValue);
    }

    function handleChangeMaxDate(newValue){
        if(dateRadioSelection === 'Month'){
            const maxRangeInMonths = dateLimits[1].diff(dateLimits[0], 'month'); //the max range in months
            const monthsSinceBeginning = minDate.diff(dateLimits[0], 'month'); //months since our start range
            const monthsSinceEnd = dateLimits[1].diff(newValue, 'month');
            setPastValues([monthsSinceBeginning, maxRangeInMonths - monthsSinceEnd]);
        }else if(dateRadioSelection === 'Day'){
            const maxRangeInDays = dateLimits[1].diff(dateLimits[0], 'day'); //the max range in months
            const daysSinceBeginning = minDate.diff(dateLimits[0], 'day'); //months since our start range
            const daysSinceEnd = dateLimits[1].diff(newValue, 'day');
            setPastValues([daysSinceBeginning, maxRangeInDays - daysSinceEnd]);
        }
        setMaxDate(newValue);
    }
    
    function handleYearChange(newValue){
        setMinDate(minDate.set('year', newValue[0]));
        setMaxDate(maxDate.set('year', newValue[1]));
    }

    function handleMonthChange(newValue){
        //console.log("nv", newValue);
        if(newValue[0] != pastValues[0]){
            const newStartDate = dayjs(minDate).add(newValue[0] - pastValues[0], 'month')
            setMinDate(newStartDate);
        }else if(newValue[1] != pastValues[1]){
            const newEndDate = dayjs(maxDate).add(newValue[1] - pastValues[1], 'month');
            setMaxDate(newEndDate);
        }
        setPastValues(newValue);
    };

    function handleDayChange(newValue){
        if(newValue[0] != pastValues[0]){
            const newStartDate = dayjs(minDate).add(newValue[0] - pastValues[0], 'day')
            setMinDate(newStartDate);
        }else if(newValue[1] != pastValues[1]){
            const newEndDate = dayjs(maxDate).add(newValue[1] - pastValues[1], 'day');
            setMaxDate(newEndDate);
        }
        setPastValues(newValue)
    }

    function handleRadioChange(event){
        if(dateRadioSelection === 'Month'){
            //month -> day/year
            const maxRangeInDays = dateLimits[1].diff(dateLimits[0], 'day'); //the max range in months
            const daysSinceBeginning = minDate.diff(dateLimits[0], 'day'); //months since our start range
            const daysSinceEnd = dateLimits[1].diff(maxDate, 'day');
            setPastValues([daysSinceBeginning, maxRangeInDays - daysSinceEnd]);
        }else{
            //day -> month/year
            const maxRangeInMonths = dateLimits[1].diff(dateLimits[0], 'month'); //the max range in months
            const monthsSinceBeginning = minDate.diff(dateLimits[0], 'month'); //months since our start range
            const monthsSinceEnd = dateLimits[1].diff(maxDate, 'month');
            setPastValues([monthsSinceBeginning, maxRangeInMonths - monthsSinceEnd]);
        }
        setDateRadioSelection(event.target.value);
    };

    return{
        minDate,
        maxDate,
        dateLimits,
        dateRadioSelection,
        handleChangeMinDate,
        handleChangeMaxDate,
        handleYearChange,
        handleMonthChange,
        handleDayChange,
        handleRadioChange,
        setDateRadioSelection,
        setPastValues
    };
}