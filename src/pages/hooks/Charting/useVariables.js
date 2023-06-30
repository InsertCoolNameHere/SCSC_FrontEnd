import { useState } from "react";
import { VariableFactory } from "../../components/Charting/VariableFactory";

export default function useVariables(){
    const [variables, setVariables] = useState([]); //additional items selecting from charting controls menu
    const [numVariables, setNumVariables] = useState([0]); //numVariables selected not including our primary item.
    const [colorPairs, setColorPairs] = useState(new Map()) //Map to track which variable is mapped to which color
    const variableFactory = new VariableFactory(colorPairs, [...variables]);
    const context = {variables, setVariables, numVariables, setNumVariables, colorPairs, setColorPairs}

    return{
        numVariables, 
        setNumVariables,
        colorPairs,
        setColorPairs,
        variables,
        setVariables,
        handleColorChange: (itemName, colorID, colorSelectorContext) => handleColorChange(itemName, colorID, context, colorSelectorContext),
        handleFormControlChange: (event, itemName, setItemName) => handleFormControlChange(event, itemName, setItemName, context),
        handleRemoveVariable: (index, itemName) => handleRemoveVariable(index, itemName, context),
        handleAddVariable: () => handleAddVariable(context),
        getLines: (variableType) => variableFactory.getVariable(variableType),
    }
}


function handleColorChange(itemName, colorID, context, colorSelectorContext){
    const {colorPairs, setColorPairs} = context;
    const {colorSelectorOpen, setColorSelectorOpen} = colorSelectorContext;
    let tempMap = new Map(colorPairs);
    tempMap.set(itemName, colorID);
    setColorPairs(tempMap);
    setColorSelectorOpen(!colorSelectorOpen);
}

function handleFormControlChange(event, itemName, setItemName, context){
    const {variables, setVariables, colorPairs, setColorPairs} = context;
    let colorMapping = new Map(colorPairs);
    if(!colorMapping.has(itemName)){
        colorMapping.set(event.target.value, '#ff0800');
    }else{
        let colorCode = colorMapping.get(itemName);
        colorMapping.set(event.target.value, colorCode);
    }
    colorMapping.delete(itemName);
    setColorPairs(colorMapping);
    
    if(![...variables].includes(event.target.value)){
        const filteredArray = variables.filter((item) => item !== itemName);
        setVariables([...filteredArray, event.target.value]);
        setItemName(event.target.value);
    }
}

function handleRemoveVariable(index, itemName, context){
    const {numVariables, setNumVariables, variables, setVariables, colorPairs, setColorPairs} = context;
    let colorMapping = colorPairs;
    colorMapping.delete(itemName);
    setColorPairs(colorMapping);
    const tempArray = numVariables.filter((element) => element != index);
    setNumVariables(tempArray);
    const filteredArray = variables.filter((item) => item !== itemName);
    setVariables([...filteredArray])
}

function handleAddVariable(context){
    const {numVariables, setNumVariables} = context
    if(numVariables.length){
        setNumVariables([...numVariables, numVariables[numVariables.length-1] + 1]);
    }else{
        setNumVariables([0]);
    }
}
