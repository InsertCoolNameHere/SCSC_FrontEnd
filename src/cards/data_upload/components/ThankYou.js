import Typography from '@mui/material/Typography';
import * as React from 'react';
import {v4 as uuidv4} from 'uuid';

function getId(){
    let myuuid = uuidv4();

    return myuuid;
}
export default function ThankYou() {
    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
            Thank you for uploading your dataset.
            </Typography>
            <Typography variant="subtitle1">
            Your dataset's unique id is <b>{getId()}</b>. We have emailed your a confirmation.
            </Typography>
        </React.Fragment>
    );
}