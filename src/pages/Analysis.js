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
import CandleStickChart from "../analytics/charts/candlestick/CandleStickChart"
import RadarChartVisualizingYearlyActivities from "../analytics/charts/radar/RadarChartVisualizingYearlyActivities"
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import "../analytics/analytics.css";
import { WidthProvider, Responsive } from "react-grid-layout";
import _ from "lodash";
import Box from '@mui/material/Box'

const ResponsiveReactGridLayout = WidthProvider(Responsive);
// saveToLS("items", [])
const originalItems = getFromLS("items") || [];
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
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onRemoveItem = this.onRemoveItem.bind(this);
    this.onRemoveAll = this.onRemoveAll.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this._onSelectPlotType = this._onSelectPlotType.bind(this)
    this._onSelectPlotCategory = this._onSelectPlotCategory.bind(this)
    this._onSelectPlotCategory = this._onSelectPlotCategory.bind(this)
    this.onLayoutChange = this.onLayoutChange.bind(this)
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: "2px",
      top: 0,
      cursor: "pointer"
    };
    const i = el.add ? "+" : el.i;
    var plot = <div> </div>
    if (el.plotType.localeCompare('ColumnWithRotatedLabels') == 0){
      plot =  <ColumnWithRotatedLabels id={el.i}/>;
    } else if (el.plotType.localeCompare('SimpleColumnChart') == 0){
      plot =  <SimpleColumnChart id={el.i}/>;
    } else if (el.plotType.localeCompare('CandleStickChart') == 0){
      plot =  <CandleStickChart id={el.i}/>;
    } else if (el.plotType.localeCompare('LineGraph') == 0){
      plot =  <LineGraph id={el.i}/>;
    } else if (el.plotType.localeCompare('MapsWithAnimatedBubbles') == 0){
      plot =  <MapsWithAnimatedBubbles id={el.i}/>;
    } else if (el.plotType.localeCompare('PieChart') == 0){
      plot =  <PieChart id={el.i}/>;
    } else if (el.plotType.localeCompare('RadarChartVisualizingYearlyActivities') == 0){
      plot =  <RadarChartVisualizingYearlyActivities id={el.i}/>;
    } else if (el.plotType.localeCompare('MotionChart') == 0){
      plot =  <MotionChart id={el.i}/>;
    } 

    
    
    
    return (
      <div key={i} data-grid={el}>
          <span className="text">{i}</span>
          
        <span
          className="remove"
          style={removeStyle}
          onClick={this.onRemoveItem.bind(this, i)}
        >
          x
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
        i: "n" + (this.state.items.length+1),
        x: (this.state.items.length * 4) % (this.state.cols || 3),
        y: 0, // puts it at the bottom
        w: 4,
        h: 4,
        plotType: plotType
      }),
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

  onRemoveAll() {
    this.setState({ items: []});
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
    } else {
      this.setState({plotNames: {value: []}})
    }
  }

  
  

  render() {
    const { toggleClassName, togglePlaholderClassName, toggleMenuClassName, toggleOptionsClassName } = this.state

    const plotCategories= ['Bar Plot', 'Candlestick Plot', 'Line Plot', 'Map Plot', 'Pie Plot', 'Radar Plot', 'XY Plot']

    return (
      <div >
        <h1 className="page-title">
          Visualization &nbsp;
          <small>
            <small>United States</small>
          </small>
        </h1>
        <Row>
          <Col lg={8}>
            <Box sx={{width: "100%", backgroundColor: "white", p: 5,}}>
              <Map />
            </Box>
          </Col>

          <Col lg={4}>
            <Box sx={{width: "95%", backgroundColor: "grey", p: 2,}}>
              <p>
                Dataset Name: <strong> Dataset A</strong>
              </p>
              <p>
                <span className="circle bg-default text-white">
                  <i className="fa fa-map-marker" />
                </span>{" "}
                &nbsp; 146 Sites, 2759 Data Entries
              </p>
              <p>
              <Dropdown options={plotCategories} onChange={this._onSelectPlotCategory}  placeholder="Select an Plot Type" />
              </p>
              <p>
              <Dropdown options={this.state.plotNames.value} onChange={this._onSelectPlotType}  placeholder="Select an Plot" />
              </p>
              <p>
              <Dropdown disabled options={plotCategories} placeholder="Select Variable 1" />
              </p>
              <p>
              <Dropdown disabled options={plotCategories} placeholder="Select Variable 2" />
              </p>
              <p>
              <Button variant="contained" onClick={() => this.onAddItem(this.state.plotType.value)} startIcon={<AddIcon />}>
                Create Chart
              </Button>
              <p></p>
              <Button variant="contained" onClick={this.onRemoveAll} startIcon={<AddIcon />}>
                Remove All Charts
              </Button>
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