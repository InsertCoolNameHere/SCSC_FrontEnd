import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function ThankYou() {
    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
            Thank you for uploading your dataset.
            </Typography>
            <Typography variant="subtitle1">
            Your dataset's unique id is #2001539. We have emailed your a confirmation.
            </Typography>
        </React.Fragment>
    );
}