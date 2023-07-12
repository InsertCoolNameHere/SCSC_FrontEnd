import React, { useState } from "react";
import { Row, Col, Progress, Table, Label, Input } from "reactstrap";

// import Widget from "../analytics/Widget";

import Map from "../analytics/am4chartMap/am4chartMap";
import ColumnWithRotatedLabels from "../analytics/charts/bar/ColumnWithRotatedLabels";
import SimpleColumnChart from "../analytics/charts/bar/SimpleColumnChart";
import LineGraph from "../analytics/charts/line/LineGraph";
import PieChart from "../analytics/charts/pie/PieChart";
import MotionChart from "../analytics/charts/xy/MotionChart"
import MapsWithAnimatedBubbles from "../analytics/charts/map/MapsWithAnimatedBubbles"
import MainMap from "../analytics/charts/map/MainMap"
import CandleStickChart from "../analytics/charts/candlestick/CandleStickChart"
import RadarChartVisualizingYearlyActivities from "../analytics/charts/radar/RadarChartVisualizingYearlyActivities"
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Clear';
import InfoIcon from '@mui/icons-material/Info';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "../analytics/analytics.css";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import Box from '@mui/material/Box'
import ReactSearchBox from "react-search-box";
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import ListItemButton from "@mui/material/ListItemButton";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const ResponsiveReactGridLayout = WidthProvider(Responsive);
// saveToLS("items", [])
const originalItems = getFromLS("items") || [];


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})


class Analytics extends React.Component {
  static defaultProps = {
    cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
    rowHeight: 100
  };

  constructor(props) {
    super(props);
    this.state = {
      items: JSON.parse(JSON.stringify(originalItems)).map(function(item, key, list) {
        return {
          i: item.i,
          x: parseInt(item.x),
          y: parseInt(item.y),
          w: parseInt(item.w),
          h: parseInt(item.h),
          plotType: item.plotType
        };
      }),
      // items: JSON.parse(JSON.stringify(originalItems)),
      plotCategory: { value: 'all'},
      plotNames: { value: ['ColumnWithRotatedLabels', 'SimpleColumnChart', 'CandleStickChart', 'LineGraph', 'MapsWithAnimatedBubbles', 'PieChart', 'RadarChartVisualizingYearlyActivities', 'MotionChart']},
      plotType: { value: 'ColumnWithRotatedLabels'},
      newCounter: JSON.parse(JSON.stringify(originalItems)).length,
      searchData: [
        {
          key: "PrairieMA",
          value: "Prairie MA",
        },
      ],
      open:false,
      datasetNumSites: "",
      datasetTitle: 'Visualization',
      datasetSubTitle: '',
      datasetDescription: '',
      datasetContributors: '',
      datasetTemporalCoverage: '',
      datasetSpatialCoverage: '',
      datasetTimeScale: '',
      datasetAttributesAndStatisticalSummary: '',
      datasetDatasetFormatAndSize: '',
      datasetMissingData: '',
      datasetUsageRestriction: '',
      datasetCitations: '',
      datasetSourceInformation: '',
      datasetDataAccessHistory: '',

    datasetTitle: 'Prairie MA',
    datasetNumSites: "159 Sites",
    datasetSubTitle: "159 Sites",
    datasetDescription: "159 Sites",
    datasetContributors: "159 Sites",
    datasetTemporalCoverage: "159 Sites",
    datasetSpatialCoverage: "159 Sites",
    datasetTimeScale: "159 Sites",
    datasetAttributesAndStatisticalSummary: "159 Sites",
    datasetDatasetFormatAndSize: "159 Sites",
    datasetMissingData: "159 Sites",
    datasetUsageRestriction: "159 Sites",
    datasetCitations: "159 Sites",
    datasetSourceInformation: "159 Sites",
    datasetDataAccessHistory: "159 Sites",
    datasetMap: [
      {
        latitude: 40.717079,
        longitude: -74.00116,
        size: 6,
        tooltip: 'New York',
        fill: "#F00"
      },
      {
        latitude: 33.145235,
        longitude: -83.811834,
        size: 7,
        tooltip: 'Oconee National Forest',
      },
      {
        latitude: 37.792032,
        longitude: -122.394613,
        size: 4,
        tooltip: 'San Francisco',
      },
      {
        latitude: 26.935080,
        longitude: -80.851766,
        size: 9,
        tooltip: 'Lake Okeechobee',
      },
      {
        latitude: 36.331308,
        longitude: -83.336050,
        size: 4,
        tooltip: 'Grainger County',
      },
      {
        latitude: 36.269356,
        longitude: -76.587477,
        size: 8,
        tooltip: 'Chowan County',
      },
      {
        latitude: 30.700644,
        longitude: -95.145249,
        size: 6,
        tooltip: 'Lake Livingston',
      },
      {
        latitude: 34.546708,
        longitude: -90.211471,
        size: 5,
        tooltip: 'Tunica County',
      },
      {
        latitude: 32.628599,
        longitude: -103.675115,
        size: 5,
        tooltip: 'Lea County',
      },
      {
        latitude: 40.456692,
        longitude: -83.522688,
        size: 5,
        tooltip: 'Union County',
      },
      {
        latitude: 33.844630,
        longitude: -118.157483,
        size: 6,
        tooltip: 'Lakewood Mutual',
      }
    ],
    datasetColumnWithRotatedLabels: [{
      country: "USA",
      value: 2025
    }, {
      country: "China",
      value: 1882
    }, {
      country: "Japan",
      value: 1809
    }, {
      country: "Germany",
      value: 1322
    }, {
      country: "UK",
      value: 1122
    }, {
      country: "France",
      value: 1114
    }, {
      country: "India",
      value: 984
    }, {
      country: "Spain",
      value: 711
    }, {
      country: "Netherlands",
      value: 665
    }, {
      country: "South Korea",
      value: 443
    }, {
      country: "Canada",
      value: 441
    }],

    variable1:[
      'state',
      'sites',
      'date',
      'soil.depth.inc',
      'exp',
      'tid',
      'sid',
      'soil.depth.inc',
      'soil.depth.upper',
      'soil.depth.lower',
      'lat.x',
      'long.x',
      'continent',
      'country',
      'state',
      'location',
      'MAT',
      'MAP',
      'PET',
      'climate',
      'soil.type',
      'per.sand',
      'per.silt',
      'per.clay',
      'year.est',
      'duration',
      'field.history',
      'exp.design',
      'exp.arrangement',
      'reps',
      'plot.width',
      'plot.length',
      'tillage',
      'tillage.details',
      'tillage.depth',
      'tillage.freq',
      'crop.rotation.name',
      'total.cropping.intensity',
      'CC',
      'perennial',
      'crop.diversity',
      'crop1.species',
      'crop2.species',
      'crop3.species',
      'crop4.species',
      'crop5.species',
      'crop6.species',
      'crop7.species',
      'crop8.species',
      'crop1.func.group',
      'crop2.func.group',
      'crop3.func.group',
      'crop4.func.group',
      'crop5.func.group',
      'crop6.func.group',
      'crop7.func.group',
      'crop8.func.group',
      'crop1.harvest',
      'crop2.harvest',
      'crop3.harvest',
      'crop4.harvest',
      'crop5.harvest',
      'crop6.harvest',
      'crop7.harvest',
      'crop8.harvest',
      'crop1.Nfert.rate',
      'crop2.Nfert.rate',
      'crop3.Nfert.rate',
      'crop4.Nfert.rate',
      'crop5.Nfert.rate',
      'crop1.Pfert.rate',
      'crop2.Pfert.rate',
      'crop3.Pfert.rate',
      'crop4.Pfert.rate',
      'crop5.Pfert.rate',
      'crop1.Kfert.rate',
      'crop2.Kfert.rate',
      'crop3.Kfert.rate',
      'crop4.Kfert.rate',
      'crop5.Kfert.rate',
      'avg.Nfert.rate',
      'avg.Pfert.rate',
      'avg.Kfert.rate',
      'fert.details',
      'herbicide1',
      'herbicide1.rate',
      'herbicide2',
      'herbicide2.rate',
      'herbicide3',
      'herbicide3.rate',
      'herbicide.details',
      'livestock.integration',
      'livestock.stocking',
      'grazing.duration',
      'pasture.heights',
      'livestock.details',
      'soil.pH',
      'density.separation',
      'size.separation',
      'SOC.determination.method',
      'soil.BD',
      'total.gC.kg.soil',
      'total.gC.kg.soil.sd',
      'maoc.gC.kg.soil',
      'maoc.gC.kg.soil.sd',
      'poc.gC.kg.soil',
      'poc.gC.kg.soil.sd',
      'total.MgC.ha',
      'total.MgC.ha.sd',
      'maoc.MgC.ha',
      'maoc.MgC.ha.sd',
      'poc.MgC.ha',
      'poc.MgC.ha.sd',
      'count_sites'],

      variable2:[
        'state',
        'sites',
        'year',
        'site',
        'exp',
        'tid',
        'sid',
        'soil.depth.inc',
        'soil.depth.upper',
        'soil.depth.lower',
        'lat.x',
        'long.x',
        'continent',
        'country',
        'state',
        'location',
        'MAT',
        'MAP',
        'PET',
        'climate',
        'soil.type',
        'per.sand',
        'per.silt',
        'per.clay',
        'year.est',
        'duration',
        'field.history',
        'exp.design',
        'exp.arrangement',
        'reps',
        'plot.width',
        'plot.length',
        'tillage',
        'tillage.details',
        'tillage.depth',
        'tillage.freq',
        'crop.rotation.name',
        'total.cropping.intensity',
        'CC',
        'perennial',
        'crop.diversity',
        'crop1.species',
        'crop2.species',
        'crop3.species',
        'crop4.species',
        'crop5.species',
        'crop6.species',
        'crop7.species',
        'crop8.species',
        'crop1.func.group',
        'crop2.func.group',
        'crop3.func.group',
        'crop4.func.group',
        'crop5.func.group',
        'crop6.func.group',
        'crop7.func.group',
        'crop8.func.group',
        'crop1.harvest',
        'crop2.harvest',
        'crop3.harvest',
        'crop4.harvest',
        'crop5.harvest',
        'crop6.harvest',
        'crop7.harvest',
        'crop8.harvest',
        'crop1.Nfert.rate',
        'crop2.Nfert.rate',
        'crop3.Nfert.rate',
        'crop4.Nfert.rate',
        'crop5.Nfert.rate',
        'crop1.Pfert.rate',
        'crop2.Pfert.rate',
        'crop3.Pfert.rate',
        'crop4.Pfert.rate',
        'crop5.Pfert.rate',
        'crop1.Kfert.rate',
        'crop2.Kfert.rate',
        'crop3.Kfert.rate',
        'crop4.Kfert.rate',
        'crop5.Kfert.rate',
        'avg.Nfert.rate',
        'avg.Pfert.rate',
        'avg.Kfert.rate',
        'fert.details',
        'herbicide1',
        'herbicide1.rate',
        'herbicide2',
        'herbicide2.rate',
        'herbicide3',
        'herbicide3.rate',
        'herbicide.details',
        'livestock.integration',
        'livestock.stocking',
        'grazing.duration',
        'pasture.heights',
        'livestock.details',
        'soil.pH',
        'density.separation',
        'size.separation',
        'SOC.determination.method',
        'soil.BD',
        'total.gC.kg.soil',
        'total.gC.kg.soil.sd',
        'maoc.gC.kg.soil',
        'maoc.gC.kg.soil.sd',
        'poc.gC.kg.soil',
        'poc.gC.kg.soil.sd',
        'total.MgC.ha',
        'total.MgC.ha.sd',
        'maoc.MgC.ha',
        'maoc.MgC.ha.sd',
        'poc.MgC.ha',
        'poc.MgC.ha.sd',
        'count_sites'],

      openDatasetTitle: true,
      openDatasetSubTitle: true,
      openDatasetDescription: true,
      openDatasetContributors: true,
      openDatasetTemporalCoverage: true,
      openDatasetSpatialCoverage: true,
      openDatasetTimeScale: true,
      openDatasetAttributesAndStatisticalSummary: true,
      openDatasetDatasetFormatAndSize: true,
      openDatasetMissingData: true,
      openDatasetUsageRestriction: true,
      openDatasetCitations: true,
      openDatasetSourceInformation: true,
      openDatasetDataAccessHistory: true,

      openClearCharts: false,
      datasetMap: [],
      datasetColumnWithRotatedLabels: []
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this._onRemoveAll = this._onRemoveAll.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this._onSelectPlotType = this._onSelectPlotType.bind(this)
    this._onSelectPlotCategory = this._onSelectPlotCategory.bind(this)
    this.onLayoutChange = this.onLayoutChange.bind(this)
    this._openMetadata = this._openMetadata.bind(this)
    this._closeMetadata = this._closeMetadata.bind(this)
    this._setDataset = this._setDataset.bind(this)
    this._openDatasetTitle = this._openDatasetTitle.bind(this)
    this._openDatasetSubTitle = this._openDatasetSubTitle.bind(this)
    this._openDatasetDescription = this._openDatasetDescription.bind(this)
    this._openDatasetContributors = this._openDatasetContributors.bind(this)
    this._openDatasetTemporalCoverage = this._openDatasetTemporalCoverage.bind(this)
    this._openDatasetSpatialCoverage = this._openDatasetSpatialCoverage.bind(this)
    this._openDatasetTimeScale = this._openDatasetTimeScale.bind(this)
    this._openDatasetAttributesAndStatisticalSummary = this._openDatasetAttributesAndStatisticalSummary.bind(this)
    this._openDatasetDatasetFormatAndSize = this._openDatasetDatasetFormatAndSize.bind(this)
    this._openDatasetMissingData = this._openDatasetMissingData.bind(this)
    this._openDatasetUsageRestriction = this._openDatasetUsageRestriction.bind(this)
    this._openDatasetCitations = this._openDatasetCitations.bind(this)
    this._openDatasetSourceInformation = this._openDatasetSourceInformation.bind(this)
    this._openDatasetDataAccessHistory = this._openDatasetDataAccessHistory.bind(this)

    this._openClearCharts = this._openClearCharts.bind(this)

  }

  _openClearCharts () {
    this.setState({openClearCharts: !this.state.openClearCharts})
  }

  _openDatasetTitle () {
    this.setState({openDatasetTitle: !this.state.openDatasetTitle})
  }

  _openDatasetSubTitle () {
    this.setState({openDatasetSubTitle: !this.state.openDatasetSubTitle})
  }

  _openDatasetDescription () {
    this.setState({openDatasetDescription: !this.state.openDatasetDescription})
  }

  _openDatasetContributors () {
    this.setState({openDatasetContributors: !this.state.openDatasetContributors})
  }

  _openDatasetTemporalCoverage () {
    this.setState({openDatasetTemporalCoverage: !this.state.openDatasetTemporalCoverage})
  }

  _openDatasetSpatialCoverage () {
    this.setState({openDatasetSpatialCoverage: !this.state.openDatasetSpatialCoverage})
  }

  _openDatasetTimeScale () {
    this.setState({openDatasetTimeScale: !this.state.openDatasetTimeScale})
  }

  _openDatasetAttributesAndStatisticalSummary () {
    this.setState({openDatasetAttributesAndStatisticalSummary: !this.state.openDatasetAttributesAndStatisticalSummary})
  }

  _openDatasetDatasetFormatAndSize () {
    this.setState({openDatasetDatasetFormatAndSize: !this.state.openDatasetDatasetFormatAndSize})
  }

  _openDatasetMissingData () {
    this.setState({openDatasetMissingData: !this.state.openDatasetMissingData})
  }

  _openDatasetUsageRestriction () {
    this.setState({openDatasetUsageRestriction: !this.state.openDatasetUsageRestriction})
  }

  _openDatasetCitations () {
    this.setState({openDatasetCitations: !this.state.openDatasetCitations})
  }

  _openDatasetSourceInformation () {
    this.setState({openDatasetSourceInformation: !this.state.openDatasetSourceInformation})
  }

  _openDatasetDataAccessHistory () {
    this.setState({openDatasetDataAccessHistory: !this.state.openDatasetDataAccessHistory})
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      zIndex: 99999,
      top: 0,
      cursor: "pointer"
    };
    const i = el.add ? "+" : el.i;
    var plot = <div> </div>
    if (el.plotType.localeCompare('ColumnWithRotatedLabels') == 0){
      plot =  <ColumnWithRotatedLabels id={el.i} data={this.state.datasetColumnWithRotatedLabels}/>;
    } else if (el.plotType.localeCompare('SimpleColumnChart') == 0){
      plot =  <SimpleColumnChart id={el.i}/>;
    } else if (el.plotType.localeCompare('CandleStickChart') == 0){
      plot =  <CandleStickChart id={el.i}/>;
    } else if (el.plotType.localeCompare('LineGraph') == 0){
      plot =  <LineGraph id={el.i}/>;
    } else if (el.plotType.localeCompare('MapsWithAnimatedBubbles') == 0){
      plot =  <MapsWithAnimatedBubbles id={el.i} />;
    } else if (el.plotType.localeCompare('PieChart') == 0){
      plot =  <PieChart id={el.i}/>;
    } else if (el.plotType.localeCompare('RadarChartVisualizingYearlyActivities') == 0){
      plot =  <RadarChartVisualizingYearlyActivities id={el.i}/>;
    } else if (el.plotType.localeCompare('MotionChart') == 0){
      plot =  <MotionChart id={el.i}/>;
    } 
    
    
    return (
      <div key={i} data-grid={el}>
          {/* <span className="text">{i}</span> */}
          
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          <MinusIcon />
        </span>
        {plot}
       
      </div>
    );
  }


  onAddItem(plotType) {
    /*eslint no-console: 0*/
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.items.length * 4) % (this.state.cols || 12),
        y: this.state.items.length, // puts it at the bottom
        w: 4,
        h: 4,
        plotType: plotType
      }),
      newCounter: this.state.newCounter + 1
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange(layout, items) {

    this.setState({items: layout.map(function(item, key, list) {
      return {
        i: items[key].i,
        x: parseInt(item.x),
        y: parseInt(item.y),
        w: parseInt(item.w),
        h: parseInt(item.h),
        plotType: items[key].plotType
      };
    })})
    saveToLS("items", this.state.items);    
  }

  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  _onRemoveAll() {
    this.setState({ items: []});
    this.setState({openClearCharts: !this.state.openClearCharts})
  }

  _onSelectPlotType (option) {
    this.setState({plotType: option})
  }

  _onSelectPlotCategory (option) {
    this.setState({plotCategory: option})
    if (option.value.localeCompare('Bar Plot') == 0){
      this.setState({plotNames: {value: ["ColumnWithRotatedLabels", "SimpleColumnChart"]}})
    } else if (option.value.localeCompare('Candlestick Plot') == 0) {
      this.setState({plotNames: {value: ["CandleStickChart"]}})
    } else if (option.value.localeCompare('Line Plot') == 0) {
      this.setState({plotNames: {value: ["LineGraph"]}})
    } else if (option.value.localeCompare('Map Plot') == 0) {
      this.setState({plotNames: {value: ["MapsWithAnimatedBubbles"]}})
    } else if (option.value.localeCompare('Pie Plot') == 0) {
      this.setState({plotNames: {value: ["PieChart"]}})
    } else if (option.value.localeCompare('Radar Plot') == 0) {
      this.setState({plotNames: {value: ["RadarChartVisualizingYearlyActivities"]}})
    } else if (option.value.localeCompare('XY Plot') == 0) {
      this.setState({plotNames: {value: ["MotionChart"]}})
    } else if (option.value.localeCompare('All') == 0) {
      this.setState({plotNames: {value: ['ColumnWithRotatedLabels', 'SimpleColumnChart', 'CandleStickChart', 'LineGraph', 'MapsWithAnimatedBubbles', 'PieChart', 'RadarChartVisualizingYearlyActivities', 'MotionChart']}})
    } else {
      this.setState({plotNames: {value: ['ColumnWithRotatedLabels', 'SimpleColumnChart', 'CandleStickChart', 'LineGraph', 'MapsWithAnimatedBubbles', 'PieChart', 'RadarChartVisualizingYearlyActivities', 'MotionChart']}})
    }
  }

  _openMetadata (option) {
    this.setState({open: true})
  }

  _closeMetadata (option) {
    this.setState({open: false})
  }

  _setDataset (option) {
    this.setState({datasetTitle: option.item.value})
    this.setState({datasetNumSites: "159 Sites"})
    this.setState({datasetSubTitle: "159 Sites"})
    this.setState({datasetDescription: "159 Sites"})
    this.setState({datasetContributors: "159 Sites"})
    this.setState({datasetTemporalCoverage: "159 Sites"})
    this.setState({datasetSpatialCoverage: "159 Sites"})
    this.setState({datasetTimeScale: "159 Sites"})
    this.setState({datasetAttributesAndStatisticalSummary: "159 Sites"})
    this.setState({datasetDatasetFormatAndSize: "159 Sites"})
    this.setState({datasetMissingData: "159 Sites"})
    this.setState({datasetUsageRestriction: "159 Sites"})
    this.setState({datasetCitations: "159 Sites"})
    this.setState({datasetSourceInformation: "159 Sites"})
    this.setState({datasetDataAccessHistory: "159 Sites"})
    this.setState({datasetMap: [
      {
        latitude: 40.717079,
        longitude: -74.00116,
        size: 6,
        tooltip: 'New York',
        fill: "#F00"
      },
      {
        latitude: 33.145235,
        longitude: -83.811834,
        size: 7,
        tooltip: 'Oconee National Forest',
      },
      {
        latitude: 37.792032,
        longitude: -122.394613,
        size: 4,
        tooltip: 'San Francisco',
      },
      {
        latitude: 26.935080,
        longitude: -80.851766,
        size: 9,
        tooltip: 'Lake Okeechobee',
      },
      {
        latitude: 36.331308,
        longitude: -83.336050,
        size: 4,
        tooltip: 'Grainger County',
      },
      {
        latitude: 36.269356,
        longitude: -76.587477,
        size: 8,
        tooltip: 'Chowan County',
      },
      {
        latitude: 30.700644,
        longitude: -95.145249,
        size: 6,
        tooltip: 'Lake Livingston',
      },
      {
        latitude: 34.546708,
        longitude: -90.211471,
        size: 5,
        tooltip: 'Tunica County',
      },
      {
        latitude: 32.628599,
        longitude: -103.675115,
        size: 5,
        tooltip: 'Lea County',
      },
      {
        latitude: 40.456692,
        longitude: -83.522688,
        size: 5,
        tooltip: 'Union County',
      },
      {
        latitude: 33.844630,
        longitude: -118.157483,
        size: 6,
        tooltip: 'Lakewood Mutual',
      }
    ]})
    this.setState({datasetColumnWithRotatedLabels: [{
      country: "USA",
      value: 2025
    }, {
      country: "China",
      value: 1882
    }, {
      country: "Japan",
      value: 1809
    }, {
      country: "Germany",
      value: 1322
    }, {
      country: "UK",
      value: 1122
    }, {
      country: "France",
      value: 1114
    }, {
      country: "India",
      value: 984
    }, {
      country: "Spain",
      value: 711
    }, {
      country: "Netherlands",
      value: 665
    }, {
      country: "South Korea",
      value: 443
    }, {
      country: "Canada",
      value: 441
    }]})
    


    
  }


  
  

  render() {
    const { toggleClassName, togglePlaholderClassName, toggleMenuClassName, toggleOptionsClassName } = this.state

    const plotCategories= ['All', 'Bar Plot', 'Candlestick Plot', 'Line Plot', 'Map Plot', 'Pie Plot', 'Radar Plot', 'XY Plot']

    return (
      <div >
        <h1 className="page-title">
          {this.state.datasetTitle} &nbsp;
          <small>
            <small><span className="circle bg-default text-black">
                  {(this.state.datasetTitle.localeCompare("Visualization") != 0 ) && <i className="fa fa-map-marker" /> }
              </span> {this.state.datasetNumSites}</small>
          </small>
        </h1>
        <Row>
          <Col lg={6}>
            <Box sx={{width: "100%", backgroundColor: "white", p: 2,}}>
              <Map data={this.state.datasetMap}/>
            </Box>
          </Col>

          <Col lg={6}>
            <Box sx={{width: "95%", backgroundColor: "#EEF4ED", p: 2,}}>
            <p><h2>Create Plots </h2>  </p>         
              <p><ReactSearchBox
                placeholder={(this.state.datasetTitle.localeCompare("Visualization") == 0) && "Search Datasets"  || this.state.datasetTitle}
                data={this.state.searchData}
                onSelect={this._setDataset}
              /></p>
              <p>
              <Dropdown options={plotCategories} onChange={this._onSelectPlotCategory}  placeholder="Select an Plot Type" />
              </p>
              <p>
              <Dropdown options={this.state.plotNames.value} onChange={this._onSelectPlotType}  placeholder="Select an Plot" />
              </p>
              <p>
              <Dropdown options={this.state.variable1} placeholder="Select Variable 1" />
              </p>
              <p>
              <Dropdown options={this.state.variable2} placeholder="Select Variable 2" />
              </p>
              <p>
              <Button disabled={(this.state.datasetTitle.localeCompare("Visualization") == 0 )} variant="contained" onClick={() => this.onAddItem(this.state.plotType.value)} startIcon={<AddIcon />}>
                Add Plot
              </Button>
              &nbsp;
              <Button disabled={(this.state.datasetTitle.localeCompare("Visualization") == 0 )} variant="contained" onClick={this._openMetadata} startIcon={<InfoIcon />}>
                View Metadata
              </Button>
              &nbsp;
              <Button color="error" variant="contained" onClick={this._openClearCharts} startIcon={<MinusIcon />}>
                Clear Plots
              </Button>
              <Dialog
                open={this.state.openClearCharts}
                onClose={this._openClearCharts}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Are you sure you want to delete all plots?"}
                </DialogTitle>
                <DialogActions>
                  <Button variant="contained" onClick={this._onRemoveAll}>I'm Sure</Button>
                  <Button variant="contained" onClick={this._openClearCharts}>Cancel</Button>
                </DialogActions>
              </Dialog>


              
              <Dialog
        fullScreen
        open={this.state.open}
        onClose={this._closeMetadata}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar style={{ background: '#1E4D2B' }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={this._closeMetadata}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Metadata
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItemButton onClick={this._openDatasetTitle}>
            <ListItemText primary="Data Title"/>
            {this.state._openDatasetTitle ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={this.state.openDatasetTitle} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 2 }}>
                <ListItemText secondary={(this.state.datasetTitle.localeCompare("Visualization") != 0 ) && this.state.datasetTitle}  />
              </ListItemButton>
            </List>
          </Collapse>

          <Divider />
          <ListItemButton onClick={this._openDatasetSubTitle}>
            <ListItemText primary="Subtitle"/>
            {this.state._openDatasetTitle ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={this.state.openDatasetSubTitle} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 2 }}>
                <ListItemText secondary={(this.state.datasetSubTitle.localeCompare("Visualization") != 0 ) && this.state.datasetSubTitle}  />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />
          <ListItemButton onClick={this._openDatasetDescription}>
            <ListItemText primary="Description"/>
            {this.state._openDatasetDescription ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={this.state.openDatasetDescription} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 2 }}>
                <ListItemText secondary={(this.state.datasetTitle.localeCompare("Visualization") != 0 ) && this.state.datasetDescription}  />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />
          <ListItemButton onClick={this._openDatasetContributors}>
            <ListItemText primary="Contributors"/>
            {this.state._openDatasetContributors ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={this.state.openDatasetContributors} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 2 }}>
                <ListItemText secondary={(this.state.datasetTitle.localeCompare("Visualization") != 0 ) && this.state.datasetContributors}  />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />
          <ListItemButton onClick={this._openDatasetTemporalCoverage}>
            <ListItemText primary="Temporal Coverage"/>
            {this.state._openDatasetTemporalCoverage ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={this.state.openDatasetTemporalCoverage} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 2 }}>
                <ListItemText secondary={(this.state.datasetTitle.localeCompare("Visualization") != 0 ) && this.state.datasetTemporalCoverage}  />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />
          <ListItemButton onClick={this._openDatasetSpatialCoverage}>
            <ListItemText primary="Spatial Coverage"/>
            {this.state._openDatasetSpatialCoverage ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={this.state.openDatasetSpatialCoverage} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 2 }}>
                <ListItemText secondary={(this.state.datasetTitle.localeCompare("Visualization") != 0 ) && this.state.datasetSpatialCoverage}  />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />
          <ListItemButton onClick={this._openDatasetTimeScale}>
            <ListItemText primary="Time Scale"/>
            {this.state._openDatasetTimeScale ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={this.state.openDatasetTimeScale} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 2 }}>
                <ListItemText secondary={(this.state.datasetTitle.localeCompare("Visualization") != 0 ) && this.state.datasetTimeScale}  />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />
          <ListItemButton onClick={this._openDatasetAttributesAndStatisticalSummary}>
            <ListItemText primary="Attributes and Statistical Summary"/>
            {this.state._openDatasetAttributesAndStatisticalSummary ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={this.state.openDatasetAttributesAndStatisticalSummary} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 2 }}>
                <ListItemText secondary={(this.state.datasetTitle.localeCompare("Visualization") != 0 ) && this.state.datasetAttributesAndStatisticalSummary}  />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />
          <ListItemButton onClick={this._openDatasetDatasetFormatAndSize}>
            <ListItemText primary="Dataset Format and Size"/>
            {this.state._openDatasetDatasetFormatAndSize ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={this.state.openDatasetDatasetFormatAndSize} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 2 }}>
                <ListItemText secondary={(this.state.datasetTitle.localeCompare("Visualization") != 0 ) && this.state.datasetDatasetFormatAndSize}  />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />
          <ListItemButton onClick={this._openDatasetMissingData}>
            <ListItemText primary="Missing Data"/>
            {this.state._openDatasetMissingData ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={this.state.openDatasetMissingData} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 2 }}>
                <ListItemText secondary={(this.state.datasetTitle.localeCompare("Visualization") != 0 ) && this.state.datasetMissingData}  />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />
          <ListItemButton onClick={this._openDatasetUsageRestriction}>
            <ListItemText primary="Usage Restriction"/>
            {this.state._openDatasetUsageRestriction ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={this.state.openDatasetUsageRestriction} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 2 }}>
                <ListItemText secondary={(this.state.datasetTitle.localeCompare("Visualization") != 0 ) && this.state.datasetUsageRestriction}  />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />
          <ListItemButton onClick={this._openDatasetCitations}>
            <ListItemText primary="Citations"/>
            {this.state._openDatasetCitations ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={this.state.openDatasetCitations} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 2 }}>
                <ListItemText secondary={(this.state.datasetTitle.localeCompare("Visualization") != 0 ) && this.state.datasetCitations}  />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />
          <ListItemButton onClick={this._openDatasetSourceInformation}>
            <ListItemText primary="Source Information (Project or Publications)"/>
            {this.state._openDatasetSourceInformation ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={this.state.openDatasetSourceInformation} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 2 }}>
                <ListItemText secondary={(this.state.datasetTitle.localeCompare("Visualization") != 0 ) && this.state.datasetSourceInformation}  />
              </ListItemButton>
            </List>
          </Collapse>
          <Divider />
          <ListItemButton onClick={this._openDatasetDataAccessHistory}>
            <ListItemText primary="Data Access History"/>
            {this.state._openDatasetDataAccessHistory ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={this.state.openDatasetDataAccessHistory} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 2 }}>
                <ListItemText secondary={(this.state.datasetTitle.localeCompare("Visualization") != 0 ) && this.state.datasetDataAccessHistory}  />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Dialog>
              
              </p>
            </Box>
          </Col>
        </Row>
            <ResponsiveReactGridLayout
              onLayoutChange={(layout) =>
                this.onLayoutChange(layout, this.state.items)
              }
              onBreakpointChange={this.onBreakpointChange}
              {...this.props}
            >
              {_.map(this.state.items, el => this.createElement(el))}
            </ResponsiveReactGridLayout>
        {/* <Row>
          <Col lg={6} xl={4} xs={12}>
            <Widget title={<h6> SimpleColumnChart </h6>} close settings>
              <SimpleColumnChart />
            </Widget>
          </Col>
          <Col lg={6} xl={4} xs={12}>
            <Widget title={<h6> LineGraph </h6>} close settings>
              <LineGraph />
            </Widget>
          </Col>
          <Col lg={6} xl={4} xs={12}>
            <Widget title={<h6> PieChart </h6>} close settings>
              <PieChart />
            </Widget>
          </Col>
          <Col lg={6} xl={4} xs={12}>
            <Widget title={<h6> MotionChart </h6>} close settings>
              <MotionChart id="1a"/>
            </Widget>
          </Col>
          <Col lg={6} xl={4} xs={12}>
            <Widget title={<h6> MapsWithAnimatedBubbles </h6>} close settings>
              <MapsWithAnimatedBubbles />
            </Widget>
          </Col>
          <Col lg={6} xl={4} xs={12}>
            <Widget title={<h6> CandleStickChart </h6>} close settings>
              <CandleStickChart />
            </Widget>
          </Col>
          <Col lg={6} xl={4} xs={12}>
            <Widget title={<h6> RadarChartVisualizingYearlyActivities </h6>} close settings>
              <RadarChartVisualizingYearlyActivities />
            </Widget>
          </Col>
        </Row> */}
      </div>
    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-8")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value
      })
    );
  }
}



export default Analytics;