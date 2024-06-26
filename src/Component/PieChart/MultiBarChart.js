import React, { Component } from "react";
import Chart from "react-apexcharts";

class MultiBarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      optionsMixedChart: {
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: [],
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          markers: {
            fillColors: ["#75A5DE", "#2561A8"],
          },
        },
        fill: {
          colors: ["#75A5DE", "#2561A8"],
          opacity: 1,
        },
        stroke: {
          show: false,
        },
        states: {
          hover: {
            filter: {
              type: "none",
            },
          },
          active: {
            filter: {
              type: "none",
            },
          },
        },
        tooltip: {
          //enabled: false
          marker: {
            fillColors: ["#2561A8", "#75A5DE"],
          },
        },
      },
      seriesMixedChart: [
        {
          name: "Total Tickets",
          type: "column",
          data: [],
        },
        {
          name: "Tickets with Task",
          type: "column",
          data: [],
        },
      ],
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
    if (propsData !== null && propsData !== undefined) {
      let categories = [],
        totalTicketsData = [],
        ticketedTaskData = [];
      for (let i = 0; i < propsData.length; i++) {
        let day = propsData[i].day;
        categories.push(day);
        let totalTickets = propsData[i].totalTickets;
        totalTicketsData.push(totalTickets);
        let taskTickets = propsData[i].taskTickets;
        ticketedTaskData.push(taskTickets);
      }

      this.setState({
        optionsMixedChart: {
          xaxis: {
            categories,
          },
        },
        seriesMixedChart: [
          {
            data: totalTicketsData,
          },
          {
            data: ticketedTaskData,
          },
        ],
      });
    }
    // });
  }

  render() {
    return (
      <div className="app">
        <div className="row">
          <div className="col mixed-chart">
            <Chart
              options={this.state.optionsMixedChart}
              series={this.state.seriesMixedChart}
              type="line"
              width="540"
              height="200"
              className="ticketToTask-chart"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MultiBarChart;
