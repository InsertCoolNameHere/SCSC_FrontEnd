/**
 * Supported Shape Collections
 */
export const shapeCollections = [
    {
        'name': 'state_geo_data_sparsity',
        'disabled': false,
        'fields': ['GISJOIN', 'NAME'],
        'type': 'shapefile'
    },
    {
        'name': 'ffar_3m_soil_location_test',
        'disabled': false,
        'fields': ['Sample_Id'],
        'type': 'point'
    },
    // add new shapes datasets here
];

/**
 * Supported Data Collections
 */
export const dataCollections = [
    'MMM_FFAR_Soil_Data_Sample',
    'MMM_FFAR_soil_water_data_sample',
    // add new collections here
];