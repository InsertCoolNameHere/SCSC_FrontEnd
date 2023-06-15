import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import EnhancedTable from '../cards/data_upload/components/AttributeTable';
import { ScheduleSend, SdCard } from '@mui/icons-material';


const headCells_base = [
    {
        id: 'attribute_name',
        numeric: false,
        disablePadding: true,
        label: 'Attribute',
    },
    {
        id: 'data_type',
        numeric: false,
        disablePadding: false,
        label: 'Type',
    },
    {
        id: 'min',
        numeric: true,
        disablePadding: false,
        label: 'Min',
    },
    {
        id: 'max',
        numeric: true,
        disablePadding: false,
        label: 'Max',
    },
    {
        id: 'nullval',
        numeric: false,
        disablePadding: false,
        label: 'Null Value',
    },
];

const coordinates = [
    {
        id: 'latitude',
        numeric: false,
        disablePadding: true,
        label: 'Latitude',
    },
    {
        id: 'longitude',
        numeric: false,
        disablePadding: false,
        label: 'Longitude',
    }
];

const fipsid = [
    {
        id: 'fips_code',
        numeric: false,
        disablePadding: true,
        label: 'Spatial Id',
    }
];

const time_field = [
    {
        id: 'timestamp',
        numeric: false,
        disablePadding: true,
        label: 'Time Field',
    }
];

export default function DatasetReview({handleInternalChange_upload, metadata, imagefile, dataName, hasTime, spatial, rowData}) {

    console.log("YOYOYO", hasTime, spatial);

    let headCells;
    if (spatial === 'latlon') {
        if (hasTime != 'none') {
            headCells = [...headCells_base, ...coordinates, ...time_field];
        } else {
            headCells = [...headCells_base, ...coordinates]
        }
    } else {
        if (hasTime != 'none') {
            headCells = [...headCells_base, ...fipsid, ...time_field];
        } else {
            headCells = [...headCells_base, ...fipsid]
        }
    }

    console.log("HOHOHO", headCells);



    function createData(name, type, min, max, missing) {
        return {
            name,
            type,
            min,
            max,
            missing,
        };
    }

    function createRows(metadata) {
        var rows = [];
        

        for (var key in metadata) {
            var value = metadata[key];
            rows.push(createData(key, value['type'], value['min'], value['max'], value['missing']))
        }

        return rows;
        
    }



    console.log("MD",metadata);
    return (
    
    <React.Fragment>
        
        <Grid item xs={12} md={12}>
            <Typography variant="h5" align='center'>
                <b>Review Your Metadata</b>
            </Typography>
        </Grid>
        <br/>
        <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
                <ImageList sx={{ width: 100, height: 100 }} cols={1} rows={1} >
                    <ImageListItem key={imagefile.name}>
                        <img src={imagefile}/>
                    </ImageListItem>
                </ImageList>
            </Grid>
            <Grid item xs={12} md={1}> 
                Name:<SdCard/>
            </Grid>
            <Grid item xs={12} md={8}> 
                <Typography variant="h5" align='left'>
                    <b>{dataName}</b>
                </Typography>
            </Grid>
            
            <Grid item xs={12} md={12}>
                <EnhancedTable handleInternalChange_upload={handleInternalChange_upload} rows = {createRows(metadata)} headCells={headCells} hasTime={hasTime} spatial={spatial} rowData={rowData} metadata={metadata}/>
            </Grid>
            
            
        </Grid>
      </React.Fragment>
      );
}