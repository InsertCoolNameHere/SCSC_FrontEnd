import React from 'react';
import CreateNEditDatasetPane from '../cards/CreateNEditDatasetPane';
import DataCard from '../cards/DataCard';

function Datasets() {
    return (
        <div>
                <div class="col-md-9">
                <h1>Datasets</h1>
                        <CreateNEditDatasetPane />
                        <div class="input-group mb-3 pt-2 pb-0">
                        <span class="input-group-text" id="basic-addon1"><i class="fa d-inline fa-search"></i></span>
                        <input type="email" name="datasrch" class="form-control" placeholder="Search Datasets" />
                        </div>
                        <div class="row my-2 justify-content-center bg-light">
                        <DataCard data_name="Dataset 1" uploader_name="Uploader 1" num_files="11" type_string="CSV" total_size="100 MB" img_path='globe.png' />
                        <DataCard data_name="Dataset 2" uploader_name="Uploader 2" num_files="2" type_string="JSON" total_size="12 MB" img_path="car.png" />
                        <DataCard data_name="Dataset 3" uploader_name="Uploader 3" num_files="2" type_string="CSV" total_size="112 MB" img_path="social-media.png" />
                        <DataCard data_name="Dataset 4" uploader_name="Uploader 2" num_files="2" type_string="CSV" total_size="1.2 MB" img_path="atom.png" />
                        <DataCard data_name="Dataset 5" uploader_name="Uploader 4" num_files="2" type_string="JSON" total_size="22 MB" img_path="signal-satellite.png" />
                        <DataCard data_name="Dataset 6" uploader_name="Uploader 2" num_files="2" type_string="CSV" total_size="9 MB" img_path="biology.png" />
                        <DataCard data_name="Dataset 7" uploader_name="Uploader 4" num_files="2" type_string="JSON" total_size="22 MB" img_path="car.png" />
                        <DataCard data_name="Dataset 8" uploader_name="Uploader 2" num_files="2" type_string="CSV" total_size="9 MB" img_path="global-warming.png" />

                        </div>
                </div>
        </div>
    );
}

export default Datasets;