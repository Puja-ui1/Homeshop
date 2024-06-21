import React, { Component } from "react";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { Input, Select, Button, Checkbox } from "antd";
import config from "../helpers/config";
import { authHeader } from "../helpers/authHeader";

export class CallModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      callModalValue: {
        srNumber: this.props.callModalValue.srNumber,
        customerNumber: this.props.callModalValue.customerNumber,
        agent: this.props.callModalValue.agent,
        callerId: this.props.callModalValue.callerId,
      },
      isMakingCall: false,
      knowlarityAgents: [],
      changeCustomerNumberAccess: false,
      calledMessage: '',
    };
  }

  componentDidMount() {
    this.handleGetKnowlarityAgentDetails();
    this.handleCRMRole();
  }

  handeCallModalOnChange = (e, name, inputType) => {
    if (inputType === "select") {
      this.setState({
        callModalValue: {
          ...this.state.callModalValue,
          [name]: e,
        },
      });
    } else if (inputType === "checkbox") {
      this.setState({
        callModalValue: {
          ...this.state.callModalValue,
          [name]: e.target.checked,
        },
      });
    } else {
      this.setState({
        callModalValue: {
          ...this.state.callModalValue,
          [name]: e.target.value,
        },
      });
    }
  };
  handleDialBtn = () => {
    let self = this
    let callModalValue = self.state.callModalValue;
    self.setState({isMakingCall: true})
        axios({
            method: "post",
            url: config.apiUrl + "/IVR/ConVoxClickCall?PhoneNo=" + callModalValue.customerNumber,
            headers: authHeader(),
        })
            .then(function (res) {
                if(res.data.statusCode === 200){
                    self.setState({
                        calledMessage: res.data.responseData.message,
                    })
                    setTimeout(() => {
                      self.props.handleCloseCallCustomer()
                    }, 1000);
                }
                self.setState({isMakingCall: false})
               
               
            })
            .catch((data) => {
                self.setState({isMakingCall: false})
            });


}
  handleMakeCall = async () => {
    let callModalValue = this.state.callModalValue;
    let knowlarityAgents = this.state.knowlarityAgents;
    let inputData = {
      agent_number: callModalValue.srNumber,
      customer_number: callModalValue.customerNumber.includes("+91")
        ? callModalValue.customerNumber
        : "+91" + callModalValue.customerNumber,
      k_number: knowlarityAgents[0].kNumber,
      caller_id: callModalValue.callerId,
    };


    this.setState({
      isMakingCall: true,
    });

    try {
      const response = await axios({
        url: config.knowlarityAPI + "/Basic/v1/account/call/makecall",
        method: "POST",
        headers: {
          "x-api-key": knowlarityAgents[0].xApiKey,
          Authorization: knowlarityAgents[0].authorization,
        },
        data: inputData,
      });

      let status = response.data.success.status;
      let message = response.data.success.message;

      if (response) {
        if (status === "success")
          this.setState({
            isMakingCall: false,
            isCallCustomer: false,
          });
        this.props.handleCloseCallCustomer();
      }
    } catch (err) {
      console.log(err);
      this.setState({
        isMakingCall: false,
      });
      NotificationManager.error("Could Not Connect To Call");
    }
  };

  handleGetKnowlarityAgentDetails = async () => {
    try {
      const response = await axios({
        url: config.apiUrl + "/Ivr/GetKnowlarityAgentDetails",
        method: "POST",
        headers: authHeader(),
      });

      let message = response.data.message;
      let knowlarityAgents = response.data.responseData;
      if (message === "Success") {
        this.setState({
          knowlarityAgents,
          callModalValue: {
            ...this.state.callModalValue,
            callerId: knowlarityAgents[0].callerId,
            srNumber: knowlarityAgents[0].agentNumber,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  handleCRMRole(id) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CRMRole/GetRolesByUserID",
      headers: authHeader(),
    })
      .then(function(res) {
        let msg = res.data.message;
        let data = res.data.responseData.modules;
        let changeCustomerNumberAccess = data.filter((module) => {
          return module.moduleName === "Edit Call Access";
        })[0].modulestatus;
        if (msg === "Success") {
          self.setState({
            changeCustomerNumberAccess,
          });
        }
        else{
          localStorage.clear();
          window.location.href = "/";
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  render() {
    const { Option } = Select;
    const { knowlarityAgents, programCode} = this.state;
    console.log('programCodeprogramCode', programCode)
    return (
      <>
        <label htmlFor="" className="call-modal-label">
          Customer Number
        </label>
        <Input
          type="text"
          className="call-modal-input"
          name="customerNumber"
          value={this.state.callModalValue.customerNumber}
          onChange={(e) =>
            this.handeCallModalOnChange(e, "customerNumber", "input")
          }
          disabled={this.state.changeCustomerNumberAccess ? false : true}
        />
        <label htmlFor="" className="call-modal-label">
          Select SR Number
        </label>
        <Select
          className="call-modal-input"
          name="srNumber"
          value={this.state.callModalValue.srNumber}
          placeholder="Select"
          onChange={(e) => this.handeCallModalOnChange(e, "srNumber", "select")}
          disabled
        >
          {knowlarityAgents.map((agent) => {
            return (
              <Option value={agent.agentNumber}>{agent.agentNumber}</Option>
            );
          })}
        </Select>
        <label htmlFor="" className="call-modal-label">
          Select Agent
        </label>
        <Select
          className="call-modal-input"
          name="agent"
          placeholder="Select"
          value={this.state.callModalValue.agent}
          onChange={(e) => this.handeCallModalOnChange(e, "agent", "select")}
          disabled
        >
          {knowlarityAgents.map((agent) => {
            return (
              <Option value={agent.userId.toString()}>{agent.userName}</Option>
            );
          })}
        </Select>
        {/* {!this.state.callModalValue.isPromotionalC2C ? ( */}
        <>
          <label htmlFor="" className="call-modal-label">
            Select Caller Id
          </label>
          <Select
            className="call-modal-input"
            name="callerId"
            placeholder="Select"
            value={this.state.callModalValue.callerId}
            onChange={(e) =>
              this.handeCallModalOnChange(e, "callerId", "select")
            }
            disabled
          >
            {knowlarityAgents.map((agent) => {
              return <Option value={agent.callerId}>{agent.callerId}</Option>;
            })}
          </Select>
        </>
        {/* ) : null} */}
        {/* <Checkbox
          onChange={(e) =>
            this.handeCallModalOnChange(e, "isPromotionalC2C", "checkbox")
          }
          className="mt-3"
        >
          Make Promotional C2C
        </Checkbox> */}
        <Button
          type="primary"
          block
          className="mt-3"
          onClick={this.props.userProgramCode === 'motherhood' ? this.handleDialBtn : this.handleMakeCall}
          loading={this.state.isMakingCall}
        >
          Call
        </Button>
        {this.state.calledMessage && <p className="text-success text-center mt-2">{this.state.calledMessage}</p>}
      </>
    );
  }
}

export default CallModal;
