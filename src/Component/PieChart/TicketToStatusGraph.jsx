import React, { Component } from "react";
import Chart from "react-apexcharts";

class TicketToStatusGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "apexchart-example"
        },
        xaxis: {
          categories: []
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          colors: ['#2561A8'],
          opacity: 1
        },
        states: {
          hover: {
            filter: {
              type: 'none'
            }
          },
          active: {
            filter: {
              type: 'none'
            }
          }
        },
        tooltip: {
          //enabled: false
          marker: {
            fillColors: [ '#2561A8']
          }
        }
      },
      series: [
        {
          name: "series-1",
          data: []
        }
      ]
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
      let categories = [],
        totalCountData = [];
      if (propsData !== null) {
      for (let i = 0; i < propsData.length; i++) {
        let Status = propsData[i].status;
        categories.push(Status);
        let Count = propsData[i].count;
        totalCountData.push(Count);
      }

      this.setState({
        options: {
          xaxis: {
            categories
          }
        },
        series: [
          {
            name: 'Count',
            data: totalCountData
          }
        ],
         dataLabels:{
            enabled: true
         }
      });
    }
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="col mixed-chart">
            <Chart
              options={this.state.options}
              series={this.state.series}
              type="bar"
              width={400}
              height={180}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default TicketToStatusGraph;
