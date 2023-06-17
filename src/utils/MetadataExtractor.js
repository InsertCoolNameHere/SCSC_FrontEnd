const MetadataExtractor = function(content) {

    var rowData1 = content.split('\n');

    var tokens = rowData1[0].split(',');
    let headers = new Array(tokens.length);

    for (let i = 0; i < tokens.length; i++) {
        headers[i] = tokens[i].trim();
    }

    const metadata_map = {};
    for (var i =0; i < headers.length; i++) {
        var metadata = {
            'type': 'string',
            'missing': 'empty',
            'min': 'N/A',
            'max': 'N/A'
        };
        metadata_map[headers[i]] = metadata;
    }

    /*for (var row = 1; row < rowData.length; row++) {
        var colData = rowData[row].split(',');
        for(var col = 0; col < colData.length; col++) {
            var corresponding_metadata = metadata_map[headers[col]];
            var data = rowData[row][col];

            var data_type = (typeof data);
            if ('string' === (typeof data)) {
                corresponding_metadata['type'] = 'string';
            }
        }
    }*/

    return {metadata_map, rowData1};
    
}
    
export default MetadataExtractor;