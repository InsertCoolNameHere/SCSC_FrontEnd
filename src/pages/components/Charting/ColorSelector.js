import { Github } from '@uiw/react-color';
import { Paper } from '@mui/material';

export default function ColorSelector({itemName, hex, colorSelectorContext, variablesContext}){

    return(
        <Paper>
            <Github
            color = {hex}
            placement = "R"
            onChange = {(color) => variablesContext.handleColorChange(itemName, color.hex, colorSelectorContext)}
            />
        </Paper>
    );
}