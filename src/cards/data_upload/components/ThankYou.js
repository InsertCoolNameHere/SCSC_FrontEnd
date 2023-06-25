import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { v4 as uuidv4 } from 'uuid';

function getId() {
    let myuuid = uuidv4();

    return myuuid;
}
export default function ThankYou({ rsp, username }) {
    console.log("CHECKING:", rsp);
    var obj = {
        name: rsp
    };



    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                Thank you for uploading your dataset, {username}!
            </Typography>
            <Typography variant="subtitle1">
                Your dataset's unique id is <b>{rsp.objId}</b>. We have emailed your a confirmation.
            </Typography>
            <Typography variant="h6" gutterBottom>
                <u>Summary:</u>
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1">
                        <b>Dataset Name:</b>
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Typography variant="subtitle1">
                        {rsp.name}
                    </Typography>
                </Grid>
            </Grid>
            


            {Object.keys(rsp.saved_files).map((key, index) => {
                return (<React.Fragment key={index}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={2}>
                            <Typography variant="subtitle1">
                                <b>File #{index+1}:</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="subtitle1">
                                {key}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={1} >
                            <Typography variant="subtitle1">
                                <b>MD5:</b>
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={5} >
                            <Typography variant="subtitle1">
                                {rsp.saved_files[key]}
                            </Typography>
                        </Grid>
                    </Grid>
                    
                </React.Fragment>);
            })}


        </React.Fragment>
    );
}