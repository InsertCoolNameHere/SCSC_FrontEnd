import React from 'react';

function Visualization() {
    return (
            <div>
                <div class="col-md-9">
                    <h1>Visualization</h1>    
                </div>

                
                <iframe width="100%" height="700" class="object-wrapper" src="https://urban-sustain.org/aperture3/aperture-client/index.html?api_key=<?php echo $_SESSION['apiKey']?>&workspace=<?php echo $workspace?>&curatedSet=<?php echo $curatedSet?>"></iframe>

            </div>
    );
}

export default Visualization;