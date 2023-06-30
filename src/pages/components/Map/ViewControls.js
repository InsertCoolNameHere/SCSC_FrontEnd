import React from 'react';
import { IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import "../Utility/Joystick.css";

export default function ViewControls({ viewStateContext }) {
    return (
        <>
            
            <div className='ControlButtonContainer'>
                <IconButton onClick={() => viewStateContext.zoom(1)}>
                    <AddBoxIcon fontSize='large' />
                </IconButton>
                <IconButton onClick={() => viewStateContext.zoom(-1)}>
                    <IndeterminateCheckBoxIcon fontSize='large' />
                </IconButton>
            </div>
        </>
    );
}
