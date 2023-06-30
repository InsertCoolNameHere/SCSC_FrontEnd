import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function StatisticsTypeSelect({statisticType, setStatisticType}){
    const handleChange = (event) => {
        event.stopPropagation()
        setStatisticType(event.target.value);
      };

    return (
        <FormControl
            size='small'
            onClick={(e) => {e.stopPropagation()}}
            style={{
                marginLeft: "auto"
            }}
        >
            <InputLabel id="statistics-input" style={{ zIndex: 0 }}> Statistic </InputLabel>
            <Select
                className = "StatisticsTypeSelector"
                value={statisticType}
                label="Statistic"
                onChange={handleChange}
            >
                <MenuItem style={{ display: "flex", padding: "8px" }} value={"Average"}>Average</MenuItem>
                <MenuItem style={{ display: "flex", padding: "8px" }} value={"Max"}>Max</MenuItem>
                <MenuItem style={{ display: "flex", padding: "8px" }} value={"Min"}>Min</MenuItem>
            </Select>
        </FormControl>
    )
}