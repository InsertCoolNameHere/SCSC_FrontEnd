import { IconButton, Typography } from "@mui/material";
import Variable from "./Variable";
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Variables({ collection, dataContext, chartingControlsContext }) {
    const numVariables = chartingControlsContext.variablesContext.numVariables;

    return (
        <div className="Variables">
            <Typography className="VariablesText"> Variables </Typography>
            {numVariables.map((key) => {
                return <Variable
                collection={collection}
                key={key}
                index = {key} 
                defaultValue = {""}
                variablesContext = {chartingControlsContext.variablesContext}
                dataContext = {dataContext}
                />
            })}
            <IconButton className="VariableIconButton" onClick={(e) => chartingControlsContext.variablesContext.handleAddVariable()}>
                <AddCircleIcon />
            </IconButton>
        </div>
    );
}