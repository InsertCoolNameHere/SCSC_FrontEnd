import CustomizedDialogs from "./popups/DataDescriptionPopup";
import React from 'react';

function DataCard({ data_name, uploader_name, num_files, type_string, total_size, img_path }) {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
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
                    <p class="card-text"><b>{num_files}</b>&nbsp;Files · (<b>{type_string}</b>)</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-primary">Details</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary" onClick={handleClickOpen}>Edit</button>
                            <button type="button" class="btn btn-sm btn-outline-primary" onClick={handleClickOpen}>Download</button>
                        </div>
                    </div>
                </div>
                <CustomizedDialogs data_name={data_name} handleClickOpen={handleClickOpen} handleClose={handleClose} open={open}/>
            </div>
        </div>

    );
}

export default DataCard;