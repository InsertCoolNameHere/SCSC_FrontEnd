import { FormControl, MenuItem, Select } from "@mui/material";

export default function SiteComparisonFormControl({dataKeys, iconID, itemName, setItemName, handleFormControlChange}){
    return(
        <FormControl className="VariableFormControl">
            <Select defaultValue={''} onChange = {(event) => handleFormControlChange(event, itemName, setItemName, iconID)}>
            {
                dataKeys.map((name) =>{
                    return(
                        <MenuItem style={{ display: "flex", padding: "8px" }} key = {name} value={name}> {name} </MenuItem>
                    );
                })
            }
            </Select>
        </FormControl>
    );
}