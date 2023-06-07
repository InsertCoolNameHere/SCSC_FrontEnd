import React from 'react';
import DatasetCreationPopup from "./data_upload/DatasetCreationPopup";

function CreateNEditDatasetPane() {

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason && reason === "backdropClick") 
            return;
        setOpen(false);
    };


    return (
        <>
            <p class="lead text-muted">Explore our repository of scientific datasets</p>
            <button type="button" class="btn btn-primary m-2" onClick={handleClickOpen}><i class="fa d-inline fa-cloud-upload mr-2"></i>Create Dataset</button>
            
            <button type="button" class="btn btn-secondary m-2"><i class="fa d-inline mr-2 fa-edit"></i>Edit Dataset</button>

            
            <DatasetCreationPopup header="SCSC" handleClose={handleClose} open={open} />
        </>
    );
}

export default CreateNEditDatasetPane;