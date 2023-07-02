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

function Visualization() {

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
    const Deck = UseDeckMap(siteComparisonContext, tabContext, setProperties, setFields, setOpenProperties, 'point');
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
                <h1>Visualization</h1>    
                <UsMap
                    layers={[Deck.state.iconLayer]}
                    Deck={Deck}
                    setZoomTo={setZoomTo}
                />
                
                { metadata.done ? UIComponents(): <CircularProgress/> }
            </div>
    );
}

export default Visualization;