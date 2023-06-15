import React from 'react';
import CreateNEditModelsPane from '../cards/CreateNEditModelsPane';
import ModelCard from '../cards/ModelCard';

function Models() {
        return (
        <div>
                <div class="col-md-12">
                <h1>Models</h1>
                        <CreateNEditModelsPane />
                        <div class="input-group mb-3 pt-2 pb-0">
                        <span class="input-group-text" id="basic-addon1"><i class="fa d-inline fa-search"></i></span>
                        <input type="email" name="datasrch" class="form-control" placeholder="Search models by name" />
                        </div>
                        <div class="row my-2 justify-content-center bg-light">
                                <ModelCard data_name="Model 1" uploader_name="Uploader 1" num_files="11" type_string="CSV" total_size="100 MB" img_path='globe.png' />
                                <ModelCard data_name="Model 2" uploader_name="Uploader 2" num_files="2" type_string="JSON" total_size="12 MB" img_path="car.png" />
                                <ModelCard data_name="Model 3" uploader_name="Uploader 3" num_files="2" type_string="CSV" total_size="112 MB" img_path="social-media.png" />
                                <ModelCard data_name="Model 4" uploader_name="Uploader 2" num_files="2" type_string="CSV" total_size="1.2 MB" img_path="atom.png" />
                                <ModelCard data_name="Model 5" uploader_name="Uploader 4" num_files="2" type_string="JSON" total_size="22 MB" img_path="signal-satellite.png" />
                                <ModelCard data_name="Model 6" uploader_name="Uploader 2" num_files="2" type_string="CSV" total_size="9 MB" img_path="biology.png" />
                                <ModelCard data_name="Model 7" uploader_name="Uploader 4" num_files="2" type_string="JSON" total_size="22 MB" img_path="car.png" />
                                <ModelCard data_name="Model 8" uploader_name="Uploader 2" num_files="2" type_string="CSV" total_size="9 MB" img_path="global-warming.png" />

                        </div>
                </div>
        </div>
    );
}

export default Models;