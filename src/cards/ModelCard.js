import DataDownloadPopup from "./popups/DataDownloadPopup";

import React from 'react';
import { ChangeEvent, useState } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Box } from "@mui/system";
import { createTheme } from '@mui/material/styles';
import { green } from '@mui/material/colors';

function DataCard({ data_name, uploader_name, num_files, type_string, total_size, img_path }) {

    const b_theme = createTheme({
        palette: {
            primary: {
            // Purple and green play nicely together.
            main: green[800],
            },
            secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
            },
        },
    });


    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };



    const [open1, setOpen1] = React.useState(false);
    const handleClickOpen1 = () => {
        setOpen1(true);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };


    //console.log("$"+img_path+"$")
    //var logo = require('./atom.png');
    return (

        <div class="col-md-3 p-3" >
            <div class="card box-shadow">
                <img class="card-img-top mx-auto img-fluid rounded" src={process.env.PUBLIC_URL + "/imgs/" + img_path} width="10%" height="10%" />
                <div class="card-body">
                    <p class="card-text"><b>{data_name}</b></p>
                    <p class="card-text">
                        <a href="http://google.com" class="link" target="_blank">{uploader_name}</a> ·&nbsp;<span title="Sat Apr 29 2023 21:51:36 GMT-0600 (Mountain Daylight Time)" aria-label="3 days ago">3 days ago</span>
                    </p>
                    <p class="card-text">Usability&nbsp;<span class="font-weight-bold ">10.0</span> · Size <span class="font-weight-bold ">{total_size}</span></p>
                    
                    <ButtonGroup variant="contained" size="small" aria-label="small button group">
                        <Button variant="outlined" color="secondary" >Details</Button>
                        <Button variant="outlined">Visualize</Button>
                    </ButtonGroup>
                    <Box sx={{ m: 1 }} />
                    <ButtonGroup variant="contained" size="small" aria-label="small button group">
                        <Button variant="outlined" color="secondary" onClick={handleClickOpen}>Edit</Button>
                        <Button variant="outlined" theme={b_theme} onClick={handleClickOpen1}>Download</Button>
                    </ButtonGroup>
                </div>
                
                <DataDownloadPopup data_name={data_name} handleClose={handleClose1} open={open1} />
                

                

            </div>
        </div>

    );
}

export default DataCard;