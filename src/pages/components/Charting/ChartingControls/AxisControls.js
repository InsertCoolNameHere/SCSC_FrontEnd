import { Accordion, AccordionSummary, AccordionDetails, FormControl, MenuItem, MenuList, Paper, Select, TextField, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function AxisControls({chartingContext, AxisContext, axisTitle}) {

    const renderScale = () =>{
        return(
            <div>
                <MenuItem>
                    <Typography className="AxisControlsTypography"> Scale </Typography>
                    <FormControl size="small" value = "Scale">
                        <Select defaultValue={"linear"} onChange={AxisContext.setScale}>
                            <MenuItem style={{ display: "flex", padding: "8px" }} value={"linear"}> Linear </MenuItem>
                            <MenuItem style={{ display: "flex", padding: "8px" }} value={"sqrt"}> Square Root </MenuItem>
                            <MenuItem style={{ display: "flex", padding: "8px" }} value={"log"}> Log </MenuItem>
                        </Select>
                    </FormControl>
                </MenuItem>
            </div>
        );
    }

    const renderChartingType = () =>{
        return(
            <div>
                <MenuItem >
                    <Typography className="AxisControlsTypography"> Charting Type </Typography>
                    <FormControl size="small" value = "Charting Type" >
                        <Select defaultValue={"Line"} onChange={chartingContext.setChartType}>
                            <MenuItem style={{ display: "flex", padding: "8px" }} value={"Line"}> Line Chart </MenuItem>
                            <MenuItem style={{ display: "flex", padding: "8px" }} value={"Scatter Plot"}> Scatter Plot </MenuItem>
                            <MenuItem style={{ display: "flex", padding: "8px" }} value={"Histogram"}> Histogram </MenuItem>
                        </Select>
                    </FormControl>
                </MenuItem>
            </div>
        );
    }

    return (
       <Paper className="AxisControls">
           <MenuList className="AxisList">
               <Typography> {axisTitle} </Typography>
                { (chartingContext.chartType === "Line") ? renderScale() : null }
                { renderChartingType() }
           </MenuList>
       </Paper>
   );
}
