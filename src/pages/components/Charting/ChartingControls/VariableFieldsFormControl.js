import { FormControl, MenuItem, Select } from "@mui/material";

export default function VariableFieldsFormControl({ collection, dataKeys, itemName, setItemName, variablesContext }){
    //controls list to not allow selection of duplicate variables
    const filteredArray = dataKeys.get(collection).filter((item) => (!variablesContext.variables.includes(item)));
    filteredArray.push(itemName);

    return(
        <FormControl className="VariableFormControl">
            <Select defaultValue={''} onChange = {(event) => variablesContext.handleFormControlChange(event, itemName, setItemName)}>
            {
                filteredArray.map((name) =>{
                    return(
                        <MenuItem style={{ display: "flex", padding: "8px" }} key = {name} value={name}> {name} </MenuItem>
                    );
                })
            }
            </Select>
        </FormControl>
    );
}