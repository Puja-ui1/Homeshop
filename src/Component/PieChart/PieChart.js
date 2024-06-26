import React, { Component } from "react";
import { PieChart } from "react-d3-components";

class OpenByPriorityPie extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        values: [],
      },
      sort: null,
    };

    this.handleGetDashboardGraphData = this.handleGetDashboardGraphData.bind(
      this
    );
  }

  componentDidMount() {
    this.handleGetDashboardGraphData();
  }

  handleGetDashboardGraphData() {
    var propsData = this.props.data;
    let values = [];
    if (propsData !== null) {
      for (let i = 0; i < propsData.length; i++) {
        let priorityName = propsData[i].priorityName;
        let priorityCount = propsData[i].priorityCount;
        let obj = { x: `${priorityName}, ${priorityCount}`, y: priorityCount };
        values.push(obj);
      }
      this.setState({
        data: {
          values,
        },
      });
    }
  }

  render() {
    return (
      <div className="obpml">
        <PieChart
          data={this.state.data}
          width={window.innerWidth>=1180 && window.innerWidth<=1300 ? 280 : window.innerWidth>=992 && window.innerWidth<=1179 ? 250 : 310}
          height={260}
          margin={{ top: 10, bottom: 10, left: 85, right: 85 }}
          sort={this.state.sort}
        />
      </div>
    );
  }
}

export default OpenByPriorityPie;
