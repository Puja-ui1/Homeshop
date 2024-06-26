import React, { Component } from "react";
import moment from "moment";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

function disabledDate(current) {
  return current && current > moment().endOf('day');
}
class DatePickerComponenet extends Component {
  constructor(props) {
    super(props);
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    ).subtract(15, "days");
    let end = moment(start).add(15, "days");
    this.state = {
      start: start,
      end: end
    };
  }
  handleApplyCallback = async (startDate, endDate) => {
    await this.setState({
      start: endDate[0],
      end: endDate[1]
    });

    this.props.applyCallback(startDate, endDate);
  };

  render() {
    return (
      <div>
        <RangePicker
          onChange={this.handleApplyCallback}
          bordered={false}
          format="DD-MM-YYYY"
          defaultValue={[
            moment(this.state.start, "DD-MM-YYYY"),
            moment(this.state.end, "DD-MM-YYYY")
          ]}
          disabledDate={disabledDate}
        />
      </div>
    );
  }
}
export default DatePickerComponenet;
