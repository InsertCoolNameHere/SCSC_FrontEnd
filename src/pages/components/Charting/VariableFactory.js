import React, { useEffect } from 'react';
import { Line, Scatter, Bar} from 'recharts';


export class VariableFactory{
   constructor(colorContext, variables){
       this.colorContext = colorContext;
       this.variables = variables;
   }


   getVariable(type){
       switch(type){
           case "Line":
               return lineVariables(this.variables, this.colorContext);
           case "Scatter Plot":
               return scatterVariables(this.variables, this.colorContext);
           case "Histogram":
               return histogramVariables(this.variables, this.colorContext);
       }
   }
}


function lineVariables(variables, colorContext){  
    const isMap = colorContext instanceof Map;
    return(
        <>
            {   Array.from(variables).map((value, index) => {
                return (
                    isMap ? <Line key = {value} type="monotone" dataKey={value} stroke={colorContext.get(value)} /> : <Line key={value} type="monotone" dataKey={value} stroke={colorContext[index]}/>
                );
            }) }
        </>
    );
}


function scatterVariables(variables, colorContext){
    const isMap = colorContext instanceof Map;
    return(
        <>
            {   Array.from(variables).map((value, index) => {
                return (
                    isMap ? <Scatter key = {value} type="monotone" dataKey={value} stroke={colorContext.get(value)} /> : <Scatter key={value} type="monotone" dataKey={value} stroke={colorContext[index]}/>
                );
            }) }
        </>
    );
}


function histogramVariables(variables, colorContext){
    return(
        <>
            {   Array.from(variables).map((value, index) => {
                return (
                    <Bar key = {value}  dataKey={value} fill={colorContext.get(value)} />
                );
            }) }
        </>
    );
}
