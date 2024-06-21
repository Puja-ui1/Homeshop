import React, { Component } from "react";
import { Table } from "antd";
import CallImg from "./../../assets/Images/blue-call.png";
import axios from "axios";
import config from "./../../helpers/config";
import { authHeader } from "./../../helpers/authHeader";
import incomingCall from "./../../assets/Images/icomingcall.png";
import outgoingCall from "./../../assets/Images/outgoingcall.png";
import missedcall from "./../../assets/Images/missedcall.png";
import { Select } from "antd";
import Modal from "react-responsive-modal";
import { NotificationManager } from "react-notifications";
import CallModal from "../../Component/CallModal";

export default class CallLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callLogsData: [],
      isCallCustomer: false,
      callModalValue: {
        srNumber: "",
        customerNumber: "",
        agent: "",
        callerId: "",
      },
      isMakingCall: false,
      knowlarityAgents: [],
      loggedUserMobileNo: "",
    };
  }

  componentDidMount() {
    this.handleGetUserProfileData();
  }

  handleGetCallLogs = async (mobileNo) => {
    let inputData = {
      MobileNumber: mobileNo,
    };
    try {
      const response = await axios({
        url: config.apiUrl + "/Ivr/GetKnowlarityLog",
        method: "POST",
        headers: authHeader(),
        params: inputData,
      });

      if (response) {
        this.setState({
          callLogsData: response.data.responseData,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleCloseCallCustomer = () => {
    this.setState({
      isCallCustomer: false,
      callModalValue: {
        ...this.state.callModalValue,
        isPromotionalC2C: false,
      },
    });
  };

  handleOpenCallCustomer = (row) => {
    this.setState({
      isCallCustomer: true,
      callModalValue: {
        ...this.state.callModalValue,
        customerNumber: row.callerNumber,
      },
    });
  };

  handleGetUserProfileData = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserProfileDetail",
      headers: authHeader(),
    })
      .then(function(res) {
        var status = res.data.message;
        if (status === "Success") {
          var id = res.data.responseData[0].userId.toString();
          var mobileNo = res.data.responseData[0].mobileNo;
          self.handleGetCallLogs(mobileNo);
          self.setState({
            callModalValue: {
              ...self.state.callModalValue,
              agent: id,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { callLogsData, knowlarityAgents } = this.state;
    const { Option } = Select;
    return (
      <React.Fragment>
        <div className="container-fluid setting-title">
          <div className="setmainscreen">Call Logs</div>
        </div>
        <div className="container-fluid">
          <div className="call-logs-table">
            <Table
              dataSource={callLogsData}
              scroll={{ y: 320 }}
              pagination={{ pageSize: 10 }}
              columns={[
                {
                  title: "Date",
                  //   dataIndex: "incomingDate",
                  //   key: "incomingDate",
                  render: (row) => (
                    <div>
                      {row.callType === "outgoing" && (
                        <img
                          src={outgoingCall}
                          className="mr-2"
                          title="Outgoing Call"
                        />
                      )}
                      {row.callType === "incoming" && (
                        <img
                          src={incomingCall}
                          className="mr-2"
                          title="Incoming Call"
                        />
                      )}
                      {row.callType === "missed" && (
                        <img
                          src={missedcall}
                          className="mr-2"
                          title="Missed Call"
                        />
                      )}
                      {row.incomingDate}
                    </div>
                  ),
                },
                {
                  title: "Caller",
                  dataIndex: "callerNumber",
                  key: "callerNumber",
                },
                {
                  title: "Click To Call",
                  dataIndex: "date",
                  key: "date",
                  render: (text, row) => (
                    <img
                      src={CallImg}
                      height="20"
                      width="20"
                      className="ml-4"
                      onClick={() => this.handleOpenCallCustomer(row)}
                      style={{ cursor: "pointer" }}
                    />
                  ),
                },
                {
                  title: "SR Number",
                  dataIndex: "agentNumber",
                  key: "agentNumber",
                },
                {
                  title: "Action",
                  dataIndex: "callType",
                  key: "callType",
                },
                {
                  title: "Call Status",
                  dataIndex: "callStatus",
                  key: "callStatus",
                  render: (text, row) => (
                    <>
                      {row.callType === "outgoing" ? (
                        <p>{row.agentStatus}</p>
                      ) : (
                        <p>{row.callStatus}</p>
                      )}
                    </>
                  ),
                },
                {
                  title: "Duration",
                  dataIndex: "callDuration",
                  key: "callDuration",
                },
                // {
                //     title: "Recordings",
                //     dataIndex: "callDuration",
                //     key: "callDuration",
                //   },
              ]}
            ></Table>
          </div>
          <Modal
            open={this.state.isCallCustomer}
            onClose={this.handleCloseCallCustomer}
            modalId="callModal"
            classNames="call-modal"
            center
          >
            <CallModal
              handleCloseCallCustomer={this.handleCloseCallCustomer}
              callModalValue={this.state.callModalValue}
            />
          </Modal>
        </div>
      </React.Fragment>
    );
  }
}
