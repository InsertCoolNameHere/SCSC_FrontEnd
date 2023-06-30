import { useState } from 'react';
import { Api } from "../../library/Api";
import { VariableFactory } from '../../components/Charting/VariableFactory';

export default function useSiteComparisons(collection){
    const [siteComparisons, setSiteComparisons] = useState(new Set()); //icons that have been clicked
    const [selectedSiteComparisons, setSelectedSiteComparisons] = useState(new Set()); //tracks icons that have been selected in your measurements menu for charting
    const [siteComparisonSoilFields, setSiteComparisonSoilFields] = useState(''); //tracks the field we are querying for and charting
    const [showSiteComparisonChart, setShowSiteComparisonChart] = useState(false);
    const [siteComparisonMetadata, setSiteComparisonMetadata] = useState([]); //stores metadata via queries each time an icon is clicked

    const context = { siteComparisonMetadata, setSiteComparisonMetadata, siteComparisons, setSiteComparisons, selectedSiteComparisons, setSelectedSiteComparisons, siteComparisonSoilFields, setSiteComparisonSoilFields, showSiteComparisonChart, setShowSiteComparisonChart };

    const defaultLineColors = ["#E74C3C", "#2980B9", "#27AE60", "#F4D03F", "#E67E22"]
    const siteComparisonFactory = new VariableFactory(defaultLineColors, siteComparisons);

    return{
        siteComparisonMetadata, 
        siteComparisons,
        setSiteComparisons,
        selectedSiteComparisons, 
        setSelectedSiteComparisons,
        siteComparisonSoilFields, 
        setSiteComparisonSoilFields,
        showSiteComparisonChart,
        setShowSiteComparisonChart,
        getSiteData: (siteID) => getSiteData(context, siteID, collection),
        getSiteComparisonChartData: () => getSiteComparisonChartData(context),
        handleSiteCheckBox: (iconID) => handleSiteCheckBox(iconID, context),
        addSiteComparison: (iconID) => addSiteComparison(iconID, context),
        removeSiteComparison: (iconID) => removeSiteComparison(iconID, context),
        handleSoilFieldChange: (event) => handleSoilFieldChange(event, context),
        handleSiteChartClose: () => handleSiteChartClose(context),
        handleChartClick: (e) => handleChartClick(e, context),
        getLines: (variableType) => siteComparisonFactory.getVariable(variableType)
    }
}

function getSiteComparisonChartData({siteComparisonSoilFields, siteComparisonMetadata}){
    //build data for recharts
    const dataStorage = [];

    //Fill objects with site comparison info(default to BD)
    if(siteComparisonSoilFields != ""){
        siteComparisonMetadata.forEach((siteMap) => {
            //console.log("smap", siteMap);
            [...siteMap].forEach((value, index) => {
                if(dataStorage[index] == undefined){ dataStorage.push({}); }
                const currObj = dataStorage[index];
                currObj["Date_Time"] =  value[1].Date_Time.substring(0,8);
                currObj[value[1].Triangle_Id] = value[1][siteComparisonSoilFields];
            })
        })
    }
    return dataStorage;
}

async function getSiteData(context, siteID, collection){
    const { siteComparisonMetadata } = context;
    const collectionBodies = {};
    collectionBodies[collection] = {
        collection: collection,
        constraints: [{"name":"Triangle_Id","type":"STRING","values": [siteID]}],
    };
    const tempMap = new Map();
    const dataStream = (data) => {
        const record = JSON.parse(data.matchQuery);
        tempMap.set(record.Sample_Id, record);
    }
    await Api.sendStreamRequest("collectionsData", collectionBodies[collection], dataStream);
    siteComparisonMetadata.push(tempMap)
    console.log(tempMap)
}


function handleSiteCheckBox(iconID, context){
    const { selectedSiteComparisons, setSelectedSiteComparisons } = context;
    const hasIconID = selectedSiteComparisons.has(iconID);
    if(hasIconID){
       const removeSet = selectedSiteComparisons
       removeSet.delete(iconID);
       setSelectedSiteComparisons(removeSet);
    }else{
       setSelectedSiteComparisons(selectedSiteComparisons.add(iconID));
    }
}

function addSiteComparison (iconID, context){
    const {siteComparisons, selectedSiteComparisons, setSelectedSiteComparisons} = context;
    siteComparisons.add(iconID);
    setSelectedSiteComparisons(selectedSiteComparisons.add(iconID));
}

function removeSiteComparison(iconID, context){
    const { siteComparisonMetadata, selectedSiteComparisons, setSelectedSiteComparisons, siteComparisons} = context;
    const removeSet = new Set(selectedSiteComparisons);
    removeSet.delete(iconID);
    setSelectedSiteComparisons(removeSet);
    siteComparisons.delete(iconID);
    siteComparisonMetadata.forEach((item, index) => {
        if(Array.from(item)[1][1].Triangle_Id === iconID){
            siteComparisonMetadata.splice(index, 1);
        }
    });
}

function handleSoilFieldChange(event, context){
    const { setSiteComparisonSoilFields } = context;
    setSiteComparisonSoilFields(event.target.value);
}

function handleChartClick(e, context){
    const { setShowSiteComparisonChart } = context;
    e.stopPropagation();
    setShowSiteComparisonChart(true);
}

function handleSiteChartClose(context){
    const { setShowSiteComparisonChart } = context;
    setShowSiteComparisonChart(false);
}