import { useState } from "react";
import {  IconButton } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CircleIcon from '@mui/icons-material/Circle';
import VariableFieldsFormControl from "./VariableFieldsFormControl";
import ColorSelector from "../ColorSelector";

export default function Variable({ collection, defaultValue, dataContext, index, variablesContext }) {
    const [itemName, setItemName] = useState(defaultValue); //tracks currently selected item
    const [colorSelectorOpen, setColorSelectorOpen] = useState(false);
    const handleColorButtonClick = () => {
        setColorSelectorOpen(!colorSelectorOpen)
    }

    const colorSelectorContext = {colorSelectorOpen, setColorSelectorOpen};

    return (
        <div className="IndividualVariable">
            { colorSelectorOpen ? <ColorSelector itemName = {itemName} colorSelectorContext = {colorSelectorContext} variablesContext = {variablesContext}/> : null}
            <IconButton onClick={handleColorButtonClick}>
                { variablesContext.colorPairs.has(itemName) ? <CircleIcon sx={{color: variablesContext.colorPairs.get(itemName)}}/> :  <CircleIcon />}
            </IconButton>
            <VariableFieldsFormControl collection = {collection} dataKeys = {dataContext.dataKeys} variablesContext = {variablesContext} itemName = {itemName} setItemName = {setItemName}/>
            <IconButton onClick={() => variablesContext.handleRemoveVariable(index, itemName)}>
                <HighlightOffIcon />
            </IconButton>
        </div>
        
    );
}