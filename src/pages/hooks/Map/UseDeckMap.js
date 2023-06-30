/*                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/
Software in the Sustain Ecosystem are Released Under Terms of Apache Software License 
This research has been supported by funding from the US National Science Foundation's CSSI program through awards 1931363, 1931324, 1931335, and 1931283. The project is a joint effort involving Colorado State University, Arizona State University, the University of California-Irvine, and the University of Maryland - Baltimore County. All redistributions of the software must also include this information. 
TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION
1. Definitions.
"License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.
"Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.
"Legal Entity" shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.
"You" (or "Your") shall mean an individual or Legal Entity exercising permissions granted by this License.
"Source" form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.
"Object" form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, and conversions to other media types.
"Work" shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work (an example is provided in the Appendix below).
"Derivative Works" shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work and for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship. For the purposes of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, the Work and Derivative Works thereof.
"Contribution" shall mean any work of authorship, including the original version of the Work and any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, "submitted" means any form of electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on electronic mailing lists, source code control systems, and issue tracking systems that are managed by, or on behalf of, the Licensor for the purpose of discussing and improving the Work, but excluding communication that is conspicuously marked or otherwise designated in writing by the copyright owner as "Not a Contribution."
"Contributor" shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and subsequently incorporated within the Work.
2. Grant of Copyright License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.
3. Grant of Patent License. Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the Work, where such license applies only to those patent claims licensable by such Contributor that are necessarily infringed by their Contribution(s) alone or by combination of their Contribution(s) with the Work to which such Contribution(s) was submitted. If You institute patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Work or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Work shall terminate as of the date such litigation is filed.
4. Redistribution. You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, and in Source or Object form, provided that You meet the following conditions:
You must give any other recipients of the Work or Derivative Works a copy of this License; and
You must cause any modified files to carry prominent notices stating that You changed the files; and
You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, and attribution notices from the Source form of the Work, excluding those notices that do not pertain to any part of the Derivative Works; and
If the Work includes a "NOTICE" text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the Source form or documentation, if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if and wherever such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only and do not modify the License. You may add Your own attribution notices within Derivative Works that You distribute, alongside or as an addendum to the NOTICE text from the Work, provided that such additional attribution notices cannot be construed as modifying the License. 
You may add Your own copyright statement to Your modifications and may provide additional or different license terms and conditions for use, reproduction, or distribution of Your modifications, or for any such Derivative Works as a whole, provided Your use, reproduction, and distribution of the Work otherwise complies with the conditions stated in this License.
5. Submission of Contributions. Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You to the Licensor shall be under the terms and conditions of this License, without any additional terms or conditions. Notwithstanding the above, nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions.
6. Trademarks. This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable and customary use in describing the origin of the Work and reproducing the content of the NOTICE file.
7. Disclaimer of Warranty. Unless required by applicable law or agreed to in writing, Licensor provides the Work (and each Contributor provides its Contributions) on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining the appropriateness of using or redistributing the Work and assume any risks associated with Your exercise of permissions under this License.
8. Limitation of Liability. In no event and under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law (such as deliberate and grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages of any character arising as a result of this License or out of the use or inability to use the Work (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses), even if such Contributor has been advised of the possibility of such damages.
9. Accepting Warranty or Additional Liability. While redistributing the Work or Derivative Works thereof, You may choose to offer, and charge a fee for, acceptance of support, warranty, indemnity, or other liability obligations and/or rights consistent with this License. However, in accepting such obligations, You may act only on Your own behalf and on Your sole responsibility, not on behalf of any other Contributor, and only if You agree to indemnify, defend, and hold each Contributor harmless for any liability incurred by, or claims asserted against, such Contributor by reason of your accepting any such warranty or additional liability. 
END OF TERMS AND CONDITIONS
*/


import { useState, useEffect } from "react";
import { GeoJsonLayer } from '@deck.gl/layers';
import chroma from 'chroma-js';
import { colors } from '../../library/colors';
import { Api } from "../../library/Api";
import IconClusterLayer from '../../components/Map/IconClusterLayer';

/**
 * This hook manages the data and state for the DeckGL map
 */
export const UseDeckMap = (siteComparisonContext, tabContext, setProperties, setFields, setOpenProperties, linkType) => {

   const [shapeLayer, setShapeLayer] = useState([]);
   const [iconLayer, setIconLayer] = useState([]);
   useEffect(() => console.log(iconLayer), [iconLayer]);
   const [shapeMap, setShapeMap] = useState(new Map());
   
   let shapefileIterator;

   /**
    * This function sends a request to the @flask server. It calls functions in the @Api class.
    */
   const sendVisualizationRequest = async(layersToClear, params, colorMap, layerId, onShapeClick) => {
      console.log("HERE");
      // Clear map layers when new layers stream in
      layersToClear.forEach(setter => setter([]));

      // Get request body
      const body = Api.getRequestBody(params);

      // Handle Shapefile based collections
      if (linkType === 'shapefile') {
         const endpoint = Api.url+'visualizeCollection';
         let reader;
         await fetch(endpoint, body).then(response => {
            reader = response.body.getReader();
         });
         shapefileIterator = await Api.createIterator(reader, colorMap);
         const layer = getGeoJsonLayer(layerId, shapefileIterator, onShapeClick, 2);
         setShapeLayer(layer);
      }

      // Handle Point Data based collections
      else if (linkType === 'point') {
         console.log("HERE2");
         //const streamedResults = await Api.sendStreamRequest('visualizeCollection', params);
         const tempMap = new Map();


         const streamedResults = [{
            "type" : "Feature",
            "geometry" : {
               "type" : "Point",
               "coordinates" : [
                  -85.1890508782964,
                  44.3128415375913
               ]
            },
            "properties" : {
               "" : ""
            },
            "fieldValues" : [100],
            "Triangle_Id" : "MI_B1_P1_T1"
         }];


         const formattedResults = streamedResults.map(entry => {
            const geometry = entry.geometry;
            const coordinates = geometry.coordinates;
            const obj = {
               'coordinates': coordinates,
               'properties': entry.properties,
               'fieldValues': entry.fieldValues
            }
            tempMap.set(entry.fieldValues[0], obj)
            return obj;
         });

         console.log(formattedResults);
         
         const layer = getIconLayer(formattedResults, onShapeClick);
         console.log("LL",layer);
         setShapeMap(tempMap);
         setIconLayer(layer);
      }
   };

   /**
    * Helpers
    */

   const handleShapeClick = async (info, event) => {
      if (info.object.properties.cluster) return;
      siteComparisonContext.addSiteComparison(info.object.properties.fieldValues[0]);
      await siteComparisonContext.getSiteData(info.object.properties.fieldValues[0]);
      tabContext.openTab("Site Comparison");
      setProperties(info.object.properties.properties);
      setFields(info.object.properties.fieldValues);
      setOpenProperties(true);
   };

   const requestVisualization = (collection, fields) => {
      const shapeColors = chroma.scale([colors.primary, colors.secondary]).colors(15);
      const setters = [setShapeLayer, setIconLayer];
      const params = { 'collection': collection, 'fields': fields }
      sendVisualizationRequest(setters, params, shapeColors, 'shapelayer', handleShapeClick);
   };

   const getIconLayer = (formattedResults, onShapeClick) => {
      const ICON_MAPPING = { marker: { x: 0, y: 0, width: 32, height: 32, mask: true } };
      return new IconClusterLayer({
         id: 'icon-layer',
         pickable: true,
         data: formattedResults,
         iconAtlas: './T.svg',
         iconMapping: ICON_MAPPING,
         sizeScale: 15,
         getIcon: d => 'marker',
         getPosition: d => d.coordinates,
         getSize: d => 2,
         getColor: d => [249, 165, 51],
         getFillColor: d => [249, 165, 51],
         onClick: handleShapeClick
     })
   };

   const getGeoJsonLayer = (id, asyncIterator, onShapeClick, lineWidth) => {
      return new GeoJsonLayer({
         id: id, 
         data: asyncIterator, 
         pickable: true,
         filled: true, 
         opacity: 0.01, 
         getFillColor: d => d.color,
         getLineColor: [0, 0, 0],
         truelineWidthScale: 15,
         lineWidthMinPixels: lineWidth,
         getLineWidth: 1,
         onClick: onShapeClick
      });
   };


   /**
    * Return values
    */
   const state = { shapeLayer, iconLayer, shapeMap};

   const functions = {
      requestVisualization: (collection, fields) => requestVisualization(collection, fields),
      getTriangleLocation: (id) => getTriangleLocation(id, state)
   }

   return { 
      state, 
      functions,
   };
}


function getTriangleLocation(id, state) {
   const {shapeMap} = state;
   return shapeMap.get(id).coordinates;
}
