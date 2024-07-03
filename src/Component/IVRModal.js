import React, { Component } from "react";
import userIcon from "./../assets/Images/amitsingh.png";
import logoutIcon from "./../assets/Images/logout.png";
import takeBreak from "./../assets/Images/takebreak.png";
import dialIcon from "./../assets/Images/dial.png";
import redialIcon from "./../assets/Images/redial.png";
import phonebookIcon from "./../assets/Images/phonebook.png";
import telephoneIcon from "./../assets/Images/telephone.png";
import disconnectIcon from "./../assets/Images/disconnect.png";
import Modal from "react-responsive-modal";
import OutsideClickHandler from "react-outside-click-handler";
import { authHeader } from "../helpers/authHeader";
import config from "../helpers/config";
import axios from "axios";
import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";
export default class IVRModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offlineOnlineStatus: true,
      selectedStatus: "online_status",
      onlineSelected: false,
      selectedMode: "",
      selectedModePreview: false,
      timer: {
        minutes: 0,
        seconds: 0,
      },
      holdAndTransferCall: false,
      defaultNumber: "",
      disableSwitchBtn: false,
      showIncommingCall: false,
      showBackToHome: false,
      phoneBookData: [
        { name: "Amit Singh", number: "9887637369", action: telephoneIcon },
        { name: "Amit Singh", number: "9887637369", action: telephoneIcon },
        { name: "Amit Singh", number: "9887637369", action: telephoneIcon },
        { name: "Amit Singh", number: "9887637369", action: telephoneIcon },
        { name: "Amit Singh", number: "9887637369", action: telephoneIcon },
        { name: "Amit Singh", number: "9887637369", action: telephoneIcon },
        { name: "Amit Singh", number: "9887637369", action: telephoneIcon },
        { name: "Amit Singh", number: "9887637369", action: telephoneIcon },
      ],
      selectedNumber: "",
      showPhoneBook: false,
      dialBtn: true,
      disconnectBtn: false,
      showPreviewMode: false,
      showProgressiveMode: false,
      showTransferCallPopup: false,
      showUnhold: false,
      disableTransferCall: false,
      takeBreakMessage: "",
      dialedNumberDetail: {},
      takeBreakList: [],
      showBreakOption: false,
      selectedBreakMessage: "",
      agentReady: false,
      loading: false,
      checklogin: false,
      resmessage: "",
      showloginerror: false,
      loginerrormsg: "",
      selectoonoffline: false,
      stationcode: 0,
      openHeadphoneModal: this.props.openHeadphoneModal,
      username : this.props.username,
      showNext: true
    };
  }
  handleCheckedStatus = (id) => {
    this.setState({
      selectedStatus: id,
    });
  };
  handleChooseMode = (id) => {
    this.setState({
      selectedMode: id,
    });
    if (id === "Preview") {
      this.setState({
        showPreviewMode: true,
        selectedStatus: "",
      });
    }
    if (id === "Progressive") {
      this.setState({
        showProgressiveMode: true,
        selectedStatus: "",
      });
    }
  };
  handleNextBtn = () => {
    //
    console.log("selectedStatus", this.state.selectedStatus);
    console.log("selectedMode", this.state.selectedMode);
    console.log("onlineSelected", this.state.onlineSelected);
    console.log("offlineOnlineStatus", this.state.offlineOnlineStatus);

    if (this.state.selectedStatus === "online_status") {
      let self = this;
      self.setState({ loading: true });
      axios({
        method: "post",
        url: config.apiUrl + "/Ivr/ConVoxUserLogin" + "?stationcode="+this.state.stationcode,
        headers: authHeader(),
        // data: {
        //   stationCode: this.state.stationcode,
        // },
      })
        .then(function(res) {
          console.log("print response", res.data.message);
          console.log("print response", res);
          if (res.data.statusCode === 200) {
            self.setState({
              checklogin: true,
              onlineSelected: true,

            });
             const ivr = JSON.parse(window.localStorage.getItem('ConvexIVR'));
          let newIvr = {
            ...ivr, isIVRLogIn: true
          }
          localStorage.setItem("ConvexIVR", JSON.stringify(newIvr));
          } else {
            self.setState({
              showloginerror: true,
              loginerrormsg: res.data.responseData.message,
              showBackToHome: true,
              onlineSelected: true,
              checklogin: false,
              offlineOnlineStatus: false,
            });
          }
         
          localStorage.setItem("loginResp", JSON.stringify(res.data));
          self.setState({ loading: false });
        })
        .catch((data) => {
          console.log(data);
          self.setState({ loading: false });
        });
    }
    if (this.state.offlineOnlineStatus && this.state.selectedStatus !== "") {
      this.setState({
        onlineSelected: true,
        checklogin: true,
        offlineOnlineStatus: false,
      });
      return;
    }
    if (this.state.selectedMode !== "") {
      this.setState({
        onlineSelected: false,
        offlineOnlineStatus: false,
        selectedModePreview: true,
        showBackToHome: this.state.onlineSelected? false : true,
      });
    }
    if(this.state.selectedStatus===""){
      this.setState({
        showNext:false});
    }
  };

  handleTimer = () => {
    let isCancelled = false;
    let minutes = this.state.timer.minutes;
    let seconds = this.state.timer.seconds;

    setTimeout(() => {
      seconds++;
      if (seconds > 59) {
        minutes++;
        seconds = 0;
      }
      !isCancelled &&
        this.setState({
          timer: {
            minutes,
            seconds,
          },
        });
    }, 1000);

    return () => {
      console.log(this.state.timer);
      isCancelled = true;
    };
  };
  componentDidMount() {
    const ivr = JSON.parse(window.localStorage.getItem('ConvexIVR'));
    console.log(ivr)
    if(ivr !== null){
      console.log(ivr.isIVRLogIn)
      this.setState({
        showPreviewMode: ivr.isIVRLogIn,
        offlineOnlineStatus : ivr.isIVRLogIn ? false : true,
        selectedMode: ivr.isIVRLogIn?"Preview":"",
        selectedModePreview: ivr.isIVRLogIn,
        showIncommingCall: ivr.isIVRLogIn,
        checklogin: ivr.isIVRLogIn,
        selectoonoffline: ivr.isIVRLogIn,
        defaultNumber : ivr.incomingCall !== undefined && ivr.incomingCall !== "" ? ivr.incomingCall : "",
        showNext: ivr.isIVRLogIn ? false : true
      })
    }
    this.handleTimer();
    // this.getTakeBreakMessageList()
  }
  componentDidUpdate() {
    this.handleTimer();
  }
  handlePreviewBtn = () => {
    this.setState({
      selectedMode: "Progressive",
      showProgressiveMode: true,
    });
  };
  handleProgressiveBtn = () => {
    this.setState({
      selectedMode: "Preview",
      showPreviewMode: true,
    });
  };
  handleNumberInput = () => {
    this.setState({
      holdAndTransferCall: true,
      defaultNumber: "9887637369",
      disableSwitchBtn: true,
      showIncommingCall: true,
    });
  };
  handleNumberChange = (e) => {
    this.setState({
      defaultNumber: e.target.value,
    });
  };
  getTakeBreakMessageList = () => {
    let self = this;
    self.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/IVR/ConVoxBreakList",
      headers: authHeader(),
    })
      .then(function(res) {
        // localStorage.setItem("loginResp",JSON.stringify(res.data))
        console.log("res", res.data);
        const breakList = res.data.responseData.message;
        const newBreakList = breakList.split(",");
        self.setState({
          takeBreakList: newBreakList,
          showBreakOption: true,
          loading: false,
        });
      })
      .catch((data) => {
        self.setState({ loading: false });
      });
  };
  agentGetReady = () => {
    let self = this;
    self.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/IVR/ConVoxReadyAgent",
      headers: authHeader(),
    })
      .then(function(res) {
        // localStorage.setItem("loginResp",JSON.stringify(res.data))
        console.log("res", res.data);
        self.setState({
          showBreakOption: false,
          agentReady: false,
          loading: false,
        });
      })
      .catch((data) => {
        self.setState({ loading: false });
      });
  };
  handleTakeAbreak = () => {
    let self = this;
    self.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/IVR/ConVoxGoToBreak",
      headers: authHeader(),
      data: {
        processName: "ConVox_Process",
        breakName: this.state.takeBreakMessage,
      },
    })
      .then(function(res) {
        // localStorage.setItem("loginResp",JSON.stringify(res.data))
        console.log("res", res.data);
        self.setState({ agentReady: true, loading: false });
      })
      .catch((data) => {
        console.log(data);
        self.setState({ loading: false });
      });

    if (this.state.offlineOnlineStatus && this.state.selectedStatus !== "") {
      this.setState({
        onlineSelected: true,
        offlineOnlineStatus: false,
      });
      return;
    }
    if (this.state.selectedMode !== "") {
      this.setState({
        onlineSelected: false,
        offlineOnlineStatus: false,
        selectedModePreview: true,
        showBackToHome: true,
      });
    }
  };
  handleCallLogout = () => {
    let self = this;
    self.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/IVR/ConVoxUserLogOut",
      headers: authHeader(),
    })
      .then(function(res) {
        self.setState({
          selectedModePreview: false,
          offlineOnlineStatus: true,
          onlineSelected: false,
          loading: false,
          showloginerror: false,
          checklogin: false,
          selectoonoffline: false,
        });
          const ivr = JSON.parse(window.localStorage.getItem('ConvexIVR'));
          let newIvr = {
            ...ivr, isIVRLogIn: false
          }
          localStorage.setItem("ConvexIVR", JSON.stringify(newIvr));
      })
      .catch((data) => {
        self.setState({ loading: false });
      });
  };
  handleBackToHome = () => {
    this.setState({
      selectedModePreview: false,
      offlineOnlineStatus: true,
      showBackToHome: false,
      showloginerror: false,
      checklogin: false,
      selectoonoffline: false,
    });
  };
  handleSelectedNumber = (ele) => {
    this.setState({
      selectedNumber: ele.number,
      showPhoneBook: false,
      // disconnectBtn: true,
      // dialBtn: false,
    });
  };
  handleOpnePhonbook = () => {
    this.setState({
      showPhoneBook: true,
    });
  };
  hidePhonbook = () => {
    this.setState({
      showPhoneBook: false,
    });
  };

  handlePhnNumInput = (e) => {
    this.setState({
      selectedNumber: e.target.value,
    });
  };

  handleDialBtn = () => {
    let self = this;
    self.setState({ loading: true });
    if (this.state.selectedNumber !== "") {
      axios({
        method: "post",
        url:
          config.apiUrl +
          "/IVR/ConVoxClickCall?PhoneNo=" +
          this.state.selectedNumber,
        headers: authHeader(),
      })
        .then(function(res) {
          if (res.data.statusCode === 200) {
            self.setState({
              dialedNumberDetail: res.data.responseData,
              disconnectBtn: true,
              dialBtn: false,
              loading: false,
            });
          }
          self.setState({ loading: false });
        })
        .catch((data) => {
          self.setState({ loading: false });
        });
    }
  };
  handleDisconnectBtn = (tab) => {
    let self = this;
    self.setState({ loading: true, defaultNumber: "" });
     const ivr = JSON.parse(window.localStorage.getItem('ConvexIVR'));
          let newIvr = {
            ...ivr, incomingCall: ""
          }
          localStorage.setItem("ConvexIVR", JSON.stringify(newIvr));
    axios({
      method: "post",
      url: config.apiUrl + "/IVR/ConVoxEndCall",
      headers: authHeader(),
      data: {
        phoneNo: tab==="preview" ? this.state.defaultNumber : self.state.dialedNumberDetail.phonE_NUMBER,
        lead_ID: tab==="preview" ? "" : self.state.dialedNumberDetail.leaD_ID.toString(),
        setFollowUp: "N",
        callbackDate: "",
        callbackHrs: "",
        callbackMins: "",
      },
    })
      .then(function(res) {
        if (res.data.statusCode === 200) {
          self.setState({
            dialBtn: true,
            disconnectBtn: false,
            selectedNumber: "",
            loading: false,
          });
          this.agentGetReady();
        }
        self.setState({
          loading: false,
        });
      })
      .catch((data) => {
        self.setState({ loading: false });
      });
  };
  handleShowTransferCall = () => {
    this.setState({
      showTransferCallPopup: true,
    });
  };
  handleHideTransferCall = () => {
    this.setState({
      showTransferCallPopup: false,
    });
  };
  handleHoldBtn = () => {
    this.setState({
      showUnhold: !this.state.showUnhold,
      disableTransferCall: !this.state.disableTransferCall,
    });
  };

  NextBtn = () => {
    if (this.state.selectoonoffline) {
      this.setState({
        selectoonoffline: false,
      });
    } else {
      this.setState({
        selectoonoffline: true,
      });
    }
  };

  handlestationcode = (ele) => {
    // console.log("print stationcode", ele, ele.target.value);
    this.setState({
      stationcode: ele.target.value,
    });
  };
  render() {
    return (
      <div className="headphone_icon_container">
        <Modal
          onClose={this.props.handleCloseHeadphoneIcon}
          open={this.state.openHeadphoneModal}
          modalId="headphoneIcon-popup"
          overlayId="IVRlogout-ovrly"
        >
          {this.state.selectoonoffline ? (
            <div className="user_details_container">
              {this.state.loading && (
                <div
                  class="spinner-border text-primary ivr-spiner"
                  role="status"
                ></div>
              )}
              <div className="user_image_padding">
                <div className="user_img">
                  <img src={userIcon} alt="useicon" />
                </div>
                <h5 className="user_name">{this.state.username}</h5>
              </div>
              {this.state.offlineOnlineStatus && (
                <div className="status_main side_padding">
                  <div
                    className={
                      this.state.selectedStatus === "online_status"
                        ? "online_status_container selected_status"
                        : "online_status_container"
                    }
                  >
                    <label
                      className={
                        this.state.selectedStatus === "online_status"
                          ? "selected_status_font offline_online_container"
                          : "offline_online_container"
                      }
                      onClick={(e) => this.handleCheckedStatus("online_status")}
                    >
                      <span className="label_space">Online</span>
                      <input
                        type="radio"
                        name="selectStatus"
                        checked={this.state.selectedStatus === "online_status"}
                      />
                      <span className="checkOption"></span>
                    </label>
                  </div>
                  <div
                    className={
                      this.state.selectedStatus === "offline_status"
                        ? "online_status_container selected_status"
                        : "online_status_container"
                    }
                  >
                    <label
                      className={
                        this.state.selectedStatus === "offline_status"
                          ? "selected_status_font offline_online_container"
                          : "offline_online_container"
                      }
                      onClick={(e) =>
                        this.handleCheckedStatus("offline_status")
                      }
                    >
                      <span className="label_space">Offline</span>
                      <input
                        type="radio"
                        name="selectStatus"
                        checked={this.state.selectedStatus == "offline_status"}
                      />
                      <span className="checkOption"></span>
                    </label>
                  </div>
                </div>
              )}
              {this.state.onlineSelected && this.state.checklogin ? (
                <div className="side_padding">
                  <p className="choose_mode_label">Choose Mode:</p>
                  <div className="status_main">
                    <div
                      className={
                        this.state.selectedMode === "Preview"
                          ? "online_status_container selected_status selected_status_font"
                          : "online_status_container"
                      }
                    >
                      <label
                        className={
                          this.state.selectedMode === "online_status"
                            ? "selected_status_font offline_online_container"
                            : "offline_online_container"
                        }
                        onClick={(e) => this.handleChooseMode("Preview")}
                      >
                        <span className="label_space">Preview</span>
                        <input type="radio" name="chooseMode" />
                        <span className="checkOption"></span>
                      </label>
                    </div>
                    <div
                      className={
                        this.state.selectedMode === "Progressive"
                          ? "online_status_container selected_status selected_status_font"
                          : "online_status_container"
                      }
                    >
                      <label
                        className={
                          this.state.selectedMode === "offline_status"
                            ? "selected_status_font offline_online_container"
                            : "offline_online_container"
                        }
                        onClick={(e) => this.handleChooseMode("Progressive")}
                      >
                        <span className="label_space">Progressive</span>
                        <input type="radio" name="chooseMode" />
                        <span className="checkOption"></span>
                      </label>
                    </div>
                  </div>
                </div>
              ) : null}
              {this.state.selectedModePreview && this.state.checklogin && (
                <>
                  <div className="user_number_container">
                    {this.state.selectedMode === "Preview" &&
                    this.state.showPreviewMode ? (
                      <>
                        {this.state.showIncommingCall && (
                          <p className="incomming_call">Incoming Call:</p>
                        )}
                        <div className="timer_container">
                          <div className="w-100 d-flex flex-column flex-wrap align-items-center justify-content-center">
                            <input
                              type="number"
                              maxLength={10}
                              placeholder="waiting for incoming call"
                              className="input_number"
                              value={this.state.defaultNumber}
                              // onClick={() => this.handleNumberInput()}
                              onChange={(e) => this.handleNumberChange(e)}
                              disabled
                            />
                            <p
                            className={
                              this.state.holdAndTransferCall
                                ? "input_timer"
                                : "idle_timer"
                            }
                          >
                            {this.state.holdAndTransferCall ? "" : "Idle Time "}
                            {this.state.timer.minutes < 10
                              ? "0" + this.state.timer.minutes
                              : this.state.timer.minutes}{" "}
                            :{" "}
                            {this.state.timer.seconds < 10
                              ? "0" + this.state.timer.seconds
                              : this.state.timer.seconds}
                          </p>
                            {this.state.defaultNumber !== "" ? <button
                              className="common_dial_btns disconnect_btn_preview "
                              onClick={() => this.handleDisconnectBtn("preview")}
                            >
                              <img
                                src={disconnectIcon}
                                alt="dial"
                                className="disconnect_img"
                              />
                              Disconnect
                            </button>: null}
                          </div>
                          
                        </div>
                      </>
                    ) : this.state.selectedMode === "Progressive" &&
                      this.state.showProgressiveMode ? (
                      <>
                        <div className="phone_number_container margin_bottom">
                          <div className="w-100">
                            <input
                              type="number"
                              placeholder="Enter Phone No."
                              value={this.state.selectedNumber}
                              className="input_number"
                              onChange={(e) => this.handlePhnNumInput(e)}
                            />
                          </div>
                          <div
                            className="phone_number_book"
                            onClick={() => this.handleOpnePhonbook()}
                          >
                            <img
                              src={phonebookIcon}
                              alt="phonebook"
                              className="phonebook_icon"
                            />
                            <label className="phonebook_label">Phonebook</label>
                          </div>
                          {this.state.showPhoneBook && (
                            <OutsideClickHandler
                              onOutsideClick={() => {
                                this.hidePhonbook();
                              }}
                            >
                              <div className="custom_popover">
                                <table>
                                  <thead>
                                    <tr>
                                      <th>Customer Name</th>
                                      <th>Mobile No.</th>
                                      <th>Action</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.phoneBookData.map(
                                      (ele, ind) => {
                                        return (
                                          <tr
                                            key={ind}
                                            onClick={() =>
                                              this.handleSelectedNumber(ele)
                                            }
                                          >
                                            <td>{ele.name}</td>
                                            <td>{ele.number}</td>
                                            <td>
                                              <img
                                                src={ele.action}
                                                alt="telephone"
                                              />
                                            </td>
                                          </tr>
                                        );
                                      }
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </OutsideClickHandler>
                          )}
                        </div>
                        <div className="dailing_btns_container margin_bottom">
                          {this.state.dialBtn && (
                            <button
                              className="common_dial_btns dial_btn"
                              onClick={() => this.handleDialBtn()}
                            >
                              <img
                                src={dialIcon}
                                alt="dial"
                                className="dialing_image"
                              />
                              Dial
                            </button>
                          )}
                          {this.state.disconnectBtn && (
                            <button
                              className="common_dial_btns disconnect_btn"
                              onClick={() => this.handleDisconnectBtn()}
                            >
                              <img
                                src={disconnectIcon}
                                alt="dial"
                                className="disconnect_img"
                              />
                              Disconnect
                            </button>
                          )}
                          <button className="common_dial_btns redial_btn">
                            <img
                              src={redialIcon}
                              alt="dial"
                              className="redialing_image"
                            />
                            Redial
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div className="increase_modal_width margin_bottom">
                    {this.state.holdAndTransferCall && (
                      <>
                        <div className="side_padding w-100 margin_bottom">
                          <button
                            className="call_wrap common_call_wrap"
                            onClick={() => this.handleHoldBtn()}
                          >
                            {" "}
                            {this.state.showUnhold ? "Unhold" : "Hold"}
                          </button>
                        </div>
                        <div className="transfer_Call_container">
                          {this.state.showTransferCallPopup && (
                            <OutsideClickHandler
                              onOutsideClick={() => {
                                this.handleHideTransferCall();
                              }}
                            >
                              <div className="transfer_call">
                                <label className="agent_id">
                                  Enter Agent ID
                                </label>
                                <input type="text" className="input_agent_id" />
                                <button className="switch_to_preview common_call_wrap">
                                  Connect
                                </button>
                              </div>
                            </OutsideClickHandler>
                          )}
                          <div className="side_padding w-100 margin_bottom">
                            <button
                              className={
                                this.state.disableTransferCall
                                  ? "disbaleBtns common_call_wrap"
                                  : "switch_to_preview common_call_wrap"
                              }
                              onClick={() => this.handleShowTransferCall()}
                            >
                              Transfer Call
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                    <div className="side_padding w-100 margin_bottom">
                      <button
                        className={
                          this.state.disableSwitchBtn
                            ? "disbaleBtns common_call_wrap"
                            : "call_wrap common_call_wrap"
                        }
                      >
                        Call Wrap
                      </button>
                    </div>
                    <div className="side_padding w-100">
                      <button
                        className={
                          this.state.disableSwitchBtn
                            ? "disbaleBtns common_call_wrap"
                            : "switch_to_preview common_call_wrap"
                        }
                        onClick={
                          this.state.selectedMode === "Preview"
                            ? () => this.handlePreviewBtn()
                            : () => this.handleProgressiveBtn()
                        }
                      >
                        {this.state.selectedMode === "Preview"
                          ? "Switch to Progressive"
                          : "Switch to Preview"}
                      </button>
                    </div>
                  </div>
                  {this.state.agentReady ? (
                    <div
                      className="side_padding take_break_container btn-agent-ready"
                      onClick={() => this.agentGetReady()}
                    >
                      <label className="take_break_label">Agent Ready</label>
                    </div>
                  ) : this.state.showBreakOption ? (
                    <div className="select_break_message mt-3 mb-5">
                      <div class="input-group">
                        <select
                          class="form-select form-select-sm"
                          aria-label=".form-select-sm example"
                          onChange={(e) => {
                            this.setState({ takeBreakMessage: e.target.value });
                          }}
                        >
                          <option selected>Select Message</option>
                          {this.state.takeBreakList &&
                            this.state.takeBreakList.map((elm, ind) => {
                              return (
                                <option value={elm} key={ind}>
                                  {elm}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                      <div class="input-group">
                        <span
                          class="input-group-text btn-apply-break"
                          onClick={() => {
                            this.handleTakeAbreak();
                          }}
                        >
                          Apply
                        </span>
                        <span
                          class="input-group-text btn-cancel-break"
                          onClick={() => {
                            this.setState({
                              showBreakOption: false,
                              takeBreakMessage: "",
                            });
                          }}
                        >
                          Cancel
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="side_padding take_break_container"
                      onClick={() => this.getTakeBreakMessageList()}
                    >
                      <img src={takeBreak} alt="break" />
                      <label className="take_break_label">Take a Break</label>
                    </div>
                  )}
                </>
              )}
              {//this.state.offlineOnlineStatus ||
              // this.state.onlineSelected ||
              this.state.selectedMode === "" ||this.state.showNext ||  !this.state.checklogin ? (
                <div className="side_padding w-100">
                  <button
                    className="next_btn"
                    onClick={() => this.handleNextBtn()}
                  >
                    Next
                  </button>
                </div>
              ) : null}

              {this.state.showloginerror === true && (
                <div>
                  <label className="login_error">
                    {this.state.loginerrormsg}
                  </label>
                </div>
              )}
              {!this.state.offlineOnlineStatus && (
                <div
                  className="side_padding logout_container"
                  onClick={() => {
                    this.handleCallLogout();
                    this.props.handleCloseHeadphoneIcon();
                  }}
                >
                  <img src={logoutIcon} alt="logout_icon" />
                  <label className="logout_lable">Logout</label>
                </div>
              )}
              {this.state.showBackToHome && (
                <div>
                  <label
                    onClick={() => this.handleBackToHome()}
                    className="back_to_home"
                  >
                    {"<<"} Back to Home
                  </label>
                </div>
              )}
            </div>
          ) : (
            <div className="station_container">
              <div>
                <div className="user_image_stationcode">
                  <div className="user_img">
                    <img src={userIcon} alt="useicon" />
                  </div>
                </div>
                <h5 className="user_name">{this.state.username}</h5>
                <div className="stationcode"> Enter station code </div>
                <input
                  className="sationcode_input"
                  type="text"
                  name="staioncode"
                  value={this.state.stationcode}
                  onChange={(e) => this.handlestationcode(e)}
                />

                <div className="side_padding w-100">
                  <button className="next_btn" onClick={() => this.NextBtn()}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    );
  }
}
