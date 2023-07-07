import React from 'react';
import '../index.css';

import { useEffect, useState } from "react";
import { UseDeckMap } from "./hooks/Map/UseDeckMap";
import { dataCollections, shapeCollections } from "./library/SupportedCollections";
import UsMap from "./components/Map/UsMap";
import useData from "./hooks/useData";
import CircularProgress from '@mui/material/CircularProgress';
import useCharting from "./hooks/Charting/useCharting";
import Charting from "./components/Charting/Charting";
import SideBarTabs from "./components/WorkspaceMenu/SideBarTabs";
import useSiteComparisons from "./hooks/Charting/useSiteComparisons";
import Menus from "./components/WorkspaceMenu/Menus";
import useTabs from "./hooks/Utility/useTabs";
import { useMenuMetadata } from "./hooks/useMenuMetadata";
import useChartingControls from "./hooks/Charting/useChartingControls";
import DataDescriptionPopup from '../cards/popups/DataDescriptionPopup';

function DataDashboard() {

    const [dataDescOpen, setDataDescOpen] = useState(false);
    
    const handleClickDescOpen = () => {
        setDataDescOpen(true);
    };
    const handleDescClose = () => {
        setDataDescOpen(false);
    };


    const metadata = useMenuMetadata(dataCollections);
    
    const chartingControlsContext = useChartingControls();
    const [shapes, setShapes] = useState(shapeCollections[1]); // setter will be used when Flux is integrated
    const [collection, setCollection] = useState(dataCollections[0]);
    const [properties, setProperties] = useState({});
    const [fields, setFields] = useState([]);
    const [openProperties, setOpenProperties] = useState(true);
    const [zoomTo, setZoomTo] = useState(null);

    const tabContext = useTabs();

    console.log("TC", tabContext);
    const siteComparisonContext = useSiteComparisons(collection);
    const Deck = UseDeckMap(siteComparisonContext, tabContext, setProperties, setFields, setOpenProperties, 'point', handleClickDescOpen);
    const dataContext = useData(dataCollections, collection, metadata, shapes, Deck, siteComparisonContext);
    const chartingContext = useCharting(collection, dataContext, chartingControlsContext, siteComparisonContext);
    

    /**
     * Reset properties & fields whenever the user selects a new collection
     */
    useEffect(() => {
        setProperties({});
        setFields([]);
    }, [shapes]);

    const UIComponents = () => {
        return(
            <>
                <SideBarTabs
                    tabContext = {tabContext}
                />
                <Menus
                    collection = {collection}
                    setCollection = {setCollection}
                    metadata = {metadata}
                    tabContext = {tabContext}
                    dataContext={dataContext} 
                    chartingContext={chartingContext} 
                    chartingControlsContext = {chartingControlsContext}
                    siteComparisonContext = {siteComparisonContext}
                    zoomTo = {zoomTo}
                />
                <Charting
                    collection = {collection}
                    siteComparisonContext = {siteComparisonContext}
                    dataContext = {dataContext} 
                    chartingContext={chartingContext} 
                    chartingControlsContext = {chartingControlsContext} 
                />
            </>
        )
    }


    return (
            <div>
                <h1>Data Dashboard</h1>    
                <UsMap
                    layers={[Deck.state.iconLayer]}
                    Deck={Deck}
                    setZoomTo={setZoomTo}
                />
                
                { metadata.done ? UIComponents(): <CircularProgress/> }
                <DataDescriptionPopup data_name={"Scientific Dataset # 1"} handleClose={handleDescClose} open={dataDescOpen} />
            </div>
    );
}

export default DataDashboard;