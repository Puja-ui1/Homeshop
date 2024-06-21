import React, { Component, Fragment } from "react";
import axios from "axios";
import config from "../../helpers/config";
import { NotificationManager } from "react-notifications";
import { authHeader } from "../../helpers/authHeader";
import { Table, Switch } from "antd";
import DatePicker from "react-datepicker";
import * as translationHI from "../../translations/hindi";
import * as translationMA from "../../translations/marathi";
import moment from "moment";
import RedDeleteIcon from "./../../assets/Images/red-delete-icon.png";
import { Select } from "semantic-ui-react";

class TicketSystemAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointName: "",
      appointEmailId: "",
      appointMobileNo: "",
      appointmentDate: "",
      appointmentTime: "",
      appointmentfee: "0",
      remarks: "",
      appointmentTypeData: [
        { appointmentTypeId: 1, appointmentTypeName: "Pickup" },
        { appointmentTypeId: 2, appointmentTypeName: "Video Call" },
        { appointmentTypeId: 3, appointmentTypeName: "Visit" },
      ],
      selectStateValue: 0,
      selectCityValue: 0,
      selectBranchValue: 0,
      selectServiceValue: 0,
      selectAssignToValue: 0,
      selectAppointmentType: "",
      appointNameValidation: "",
      appointEmailIdValidation: "",
      appointMobileNoValidation: "",
      appointStateValidation: "",
      appointCityValidation: "",
      appointBranchValidation: "",
      appointServiceValidation: "",
      appointAssignToValidation: "",
      appointTypeValidation: "",
      appointmentDateValidation: "",
      appointmentTimeValidation: "",
      appointmentFeeValidation: "",
      remarksValidation: "",
      translateLanguage: {},
      locationMasterList: [],
      stateList: [],
      cityList: [],
      assignToData: [],
      appointmentType: false,
      serviceList: [],
      appointmentBookList: [],
      appointmentSlotData: [],
    };
  }

  componentDidMount() {
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
    // this.handleGetLocationMaster();
    this.handleGetStateList();
    // this.handleGetAgentList();
    // this.handleGetServiceList();
  }
  /// handle Input on change
  handleInputOnchange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.target.name === "selectAssignToValue") {
      this.handleGetAppointmentType(e.target.value);
    }
    if (e.target.name === "selectServiceValue") {
      this.handleGetAgentList(e.target.value);
    }
    if (e.target.name === "selectBranchValue") {
      this.handleGetServiceList(e.target.value);
    }
    if (e.target.name === "selectStateValue") {
      if (e.target.value > 0) {
        this.setState({
          selectCityValue: 0,
        });
        this.handleGetCityList(e.target.value);
      } else {
        this.setState({
          cityList: [],
          selectCityValue: 0,
        });
      }
    }
  };
  /// Onchange for Mobile no
  hanldeMobileNoChange = (e) => {
    var reg = /^[0-9\b]+$/;
    if (e.target.value === "" || reg.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value });
    } else {
      e.target.value = "";
    }
  };

  /// handle decimal onchange
  hanldeDecimalOnChange = (e) => {
    var values = e.target.value;
    var names = e.target.name;

    if (isNaN(values)) {
      return false;
    }

    var splitText = values.split(".");
    var index = values.indexOf(".");

    if (index !== -1) {
      if (splitText) {
        if (splitText[1].length <= 2) {
          if (index !== -1 && splitText.length === 2) {
            if (names === "appointmentfee") {
              this.setState({ appointmentfee: values });
            }
          }
        } else {
          return false;
        }
      } else {
        if (names === "appointmentfee") {
          this.setState({ appointmentfee: values });
        }
      }
    } else {
      if (names === "appointmentfee") {
        this.setState({ appointmentfee: values });
      }
    }
  };
  /// handle select date
  handleAppointmentDate = (date) => {
    this.setState({
      appointmentDate: date,
    });

    this.handleGetAppointmentSlot(date);
  };
  /// handle add appoinment
  handleAddAppointmentData() {
    if (
      this.state.appointName !== "" &&
      this.state.appointEmailId !== "" &&
      this.state.appointMobileNo !== "" &&
      this.state.selectStateValue !== 0 &&
      this.state.selectCityValue !== 0 &&
      this.state.selectBranchValue !== 0 &&
      this.state.selectServiceValue !== 0 &&
      this.state.selectAssignToValue !== 0 &&
      this.state.selectAppointmentType !== "" &&
      this.state.appointmentDate !== "" &&
      this.state.appointmentTime !== ""
    ) {
      /// API function
      var appointmentBookListTemp = this.state.appointmentBookList;
      var objTemp = {};
      objTemp.Index = appointmentBookListTemp.length;
      objTemp.Appointment_Name = this.state.appointName;
      objTemp.Appointment_Email = this.state.appointEmailId;
      objTemp.Appointment_MobileNo = this.state.appointMobileNo;
      objTemp.state = this.state.stateList
        ? this.state.stateList.filter(
            (x) => x.stateID === Number(this.state.selectStateValue)
          )[0].stateName
        : "";
      objTemp.Appointment_State_Id = this.state.selectStateValue;
      objTemp.city = this.state.cityList
        ? this.state.cityList.filter(
            (x) => x.cityID === Number(this.state.selectCityValue)
          )[0].cityName
        : "";
      objTemp.Appointment_City_Id = this.state.selectServiceValue;
      objTemp.branch = this.state.locationMasterList
        ? this.state.locationMasterList.filter(
            (x) => x.location_Id === Number(this.state.selectBranchValue)
          )[0].location_Name
        : "";
      objTemp.Appointment_Location_Id = this.state.selectBranchValue;
      objTemp.service = this.state.serviceList
        ? this.state.serviceList.filter(
            (x) => x.service_Id === Number(this.state.selectServiceValue)
          )[0].service_Name
        : "";
      objTemp.Appointment_Service_Id = this.state.selectServiceValue;
      objTemp.assignto = this.state.assignToData
        ? this.state.assignToData.filter(
            (x) => x.user_ID === Number(this.state.selectAssignToValue)
          )[0].agentName
        : "";
      objTemp.Appointment_Assigned_To = this.state.selectAssignToValue;
      objTemp.Appointment_Type = this.state.selectAppointmentType;
      objTemp.Appointment_Paid_Flag = this.state.appointmentType;
      objTemp.Appointment_Fee = this.state.appointmentfee;
      objTemp.Appointment_Remark = this.state.remarks;
      objTemp.Appointment_Date = moment(this.state.appointmentDate)
        .format("YYYY-MM-DD")
        .toString();
      objTemp.Appointment_time = moment(this.state.appointmentTime)
        .format("hh:mm a")
        .toString();
      objTemp.Appointment_Slot = moment(this.state.selectSlotValue)
        .format("YYYY-MM-DD")
        .toString();
      appointmentBookListTemp.push(objTemp);
      this.setState({
        appointmentBookList: appointmentBookListTemp,
        appointName: "",
        appointEmailId: "",
        appointMobileNo: "",
        appointmentDate: "",
        appointmentTime: "",
        appointmentfee: "0",
        remarks: "",
        selectStateValue: 0,
        selectCityValue: 0,
        selectBranchValue: 0,
        selectServiceValue: 0,
        selectAssignToValue: 0,
        selectAppointmentType: "",
        appointNameValidation: "",
        appointEmailIdValidation: "",
        appointMobileNoValidation: "",
        appointStateValidation: "",
        appointCityValidation: "",
        appointBranchValidation: "",
        appointServiceValidation: "",
        appointAssignToValidation: "",
        appointTypeValidation: "",
        appointmentDateValidation: "",
        appointmentTimeValidation: "",
        appointmentFeeValidation: "",
      });
      this.props.handleCallbackAppointmentBooklist(appointmentBookListTemp);
    } else {
      this.setState({
        appointNameValidation: "Please enter name.",
        appointEmailIdValidation: "Please enter email id.",
        appointMobileNoValidation: "Please enter mobile no",
        appointStateValidation: "Please select state.",
        appointCityValidation: "Please select city.",
        appointBranchValidation: "Please select branch.",
        appointServiceValidation: "Please select service.",
        appointAssignToValidation: "Please select assign to.",
        appointTypeValidation: "Please select Type.",
        appointmentDateValidation: "Please select date.",
        appointmentTimeValidation: "Please select time.",
        remarksValidation: "Please enter remarks.",
      });
      if (this.state.appointmentType) {
        this.setState({
          appointmentFeeValidation: "Please enter appointment fee.",
        });
      }
    }
  }
  handleAppointmentTypeChange = (e) => {
    this.setState({ selectAppointmentType: e.target.value });
  };
  handleGetLocationMaster = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/GetLocation",
      headers: authHeader(),
    })
      .then(function(res) {
        let message = res.data.message;
        let responseData = res.data.responseData;
        if (message === "Success") {
          self.setState({
            locationMasterList: responseData,
          });
        } else {
          self.setState({
            locationMasterList: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };
  handleGetStateList = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getstatelist",
      headers: authHeader(),
    })
      .then(function(res) {
        let message = res.data.message;
        let responseData = res.data.responseData;
        if (message === "Success") {
          self.setState({
            stateList: responseData,
          });
        } else {
          self.setState({
            stateList: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };
  handleGetCityList = (stateId) => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getcitylist",
      headers: authHeader(),
      params: {
        StateId: stateId,
      },
    })
      .then(function(res) {
        let message = res.data.message;
        let responseData = res.data.responseData;
        if (message === "Success") {
          self.setState({
            cityList: responseData,
          });
        } else {
          self.setState({
            cityList: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };
  handleGetAgentList(dept) {
    let self = this;
    var inputData = {};
    inputData.LocationId = this.state.selectBranchValue;
    inputData.Department = dept;

    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/GetAssignTo",
      headers: authHeader(),
      // params: {
      //   TicketID: 0, // Don't remove this Zexo
      // },
      data: inputData,
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            assignToData: data,
          });
        } else {
          self.setState({
            assignToData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleAppointmentfeeTypeChange = (e) => {
    this.setState({
      appointmentType: e,
    });
  };
  handleGetServiceList = (id) => {
    let self = this;
    var inputData = {};
    inputData.LocationId = id;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/GetSpeciality",
      headers: authHeader(),
      data: inputData,
    })
      .then(function(res) {
        let message = res.data.message;
        let responseData = res.data.responseData;
        if (message === "Success") {
          self.setState({
            serviceList: responseData,
          });
        } else {
          self.setState({
            serviceList: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleGetAppointmentSlot = (date) => {
    var inputData = {};
    inputData.LocationId = this.state.selectBranchValue;
    inputData.AssignToId = this.state.selectAssignToValue;
    inputData.AppointmentType = this.state.selectAppointmentType;
    inputData.Date = moment(date)
      .format("YYYY-MM-DD")
      .toString();

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/GetAppointmentSlot",
      headers: authHeader(),
      data: inputData,
    })
      .then(function(res) {
        let message = res.data.message;
        let responseData = res.data.responseData;
        if (message === "Success") {
          self.setState({
            appointmentSlotData: responseData,
          });
        } else {
          self.setState({
            appointmentSlotData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleGetAppointmentType = (AssignTo) => {
    var inputData = {};
    inputData.LocationId = this.state.selectBranchValue;
    inputData.AssignToId = AssignTo;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/GetAppointmentType",
      headers: authHeader(),
      data: inputData,
    })
      .then(function(res) {
        let message = res.data.message;
        let responseData = res.data.responseData;
        if (message === "Success") {
          self.setState({
            appointmentTypeData: responseData,
          });
        } else {
          self.setState({
            appointmentTypeData: [
              { appointmentTypeId: 1, appointmentTypeName: "Pickup" },
              { appointmentTypeId: 2, appointmentTypeName: "Video Call" },
              { appointmentTypeId: 3, appointmentTypeName: "Visit" },
            ],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleDeleteAppointment = (row) => {
    let appointmentList = this.state.appointmentBookList.filter(
      (item) => item.Index !== row.Index
    );
    this.setState({
      appointmentBookList: appointmentList,
    });
    this.props.handleCallbackAppointmentBooklist(appointmentList);
  };
  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <Fragment>
        <div className="ticketSycard">
          <div className="ticketSycard1">
            <div id="accordion">
              <div className="card-header collapsetask">
                <h5 className="mb-8 drop">
                  <label
                    className="btn btn-link drop1"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.nav.appointment
                      : "Appointment"}
                  </label>
                </h5>
              </div>

              <div
                id="collapseOne"
                className="collapse show"
                aria-labelledby="headingOne"
                data-parent="#accordion"
              >
                <div>
                  <div className="row m-b-10 m-l-10 m-r-10 m-t-10">
                    <div className="col-md-6">
                      <label className="addmanuallytext">
                        {TranslationContext !== undefined
                          ? TranslationContext.ticketingDashboard.addappointment
                          : "Add Appointment"}
                      </label>
                    </div>
                  </div>
                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.span.name
                            : "Name"
                        }
                        autoComplete="off"
                        name="appointName"
                        value={this.state.appointName}
                        onChange={this.handleInputOnchange}
                      />
                      {this.state.appointName === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.appointNameValidation}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.p.emailid
                            : "Email ID"
                        }
                        autoComplete="off"
                        name="appointEmailId"
                        value={this.state.appointEmailId}
                        onChange={this.handleInputOnchange}
                      />
                      {this.state.appointEmailId === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.appointEmailIdValidation}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.p.mobileno
                            : "Mobile No"
                        }
                        autoComplete="off"
                        maxLength={10}
                        name="appointMobileNo"
                        value={this.state.appointMobileNo}
                        onChange={this.hanldeMobileNoChange}
                      />
                      {this.state.appointMobileNo === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.appointMobileNoValidation}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <select
                        className="category-select-system dropdown-label"
                        value={this.state.selectStateValue}
                        name="selectStateValue"
                        onChange={this.handleInputOnchange}
                      >
                        <option value={0}>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.state
                            : "State"}
                        </option>
                        {this.state.stateList
                          ? this.state.stateList.map((item) => {
                              return (
                                <option key={item.stateID} value={item.stateID}>
                                  {item.stateName}
                                </option>
                              );
                            })
                          : null}
                      </select>
                      {this.state.selectStateValue === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.appointStateValidation}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <select
                        className="category-select-system dropdown-label"
                        value={this.state.selectCityValue}
                        name="selectCityValue"
                        onChange={this.handleInputOnchange}
                      >
                        <option
                          className="select-sub-category-placeholder"
                          value={0}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.span.city
                            : "City"}
                        </option>
                        {this.state.cityList
                          ? this.state.cityList.map((item) => {
                              return (
                                <option key={item.cityID} value={item.cityID}>
                                  {item.cityName}
                                </option>
                              );
                            })
                          : null}
                      </select>
                      {this.state.selectCityValue === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.appointCityValidation}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6 dapic">
                      <select
                        className="category-select-system dropdown-label"
                        value={this.state.selectBranchValue}
                        name="selectBranchValue"
                        onChange={this.handleInputOnchange}
                      >
                        <option
                          className="select-sub-category-placeholder"
                          value={0}
                        >
                          Branch / Location / Site / Store
                        </option>
                        {this.state.locationMasterList
                          ? this.state.locationMasterList.map((item) => {
                              return (
                                <option
                                  key={item.location_Id}
                                  value={item.location_Id}
                                >
                                  {item.location_Name}
                                </option>
                              );
                            })
                          : null}
                      </select>
                      {this.state.selectBranchValue === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.appointBranchValidation}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <select
                        className="category-select-system dropdown-label"
                        value={this.state.selectServiceValue}
                        name="selectServiceValue"
                        onChange={this.handleInputOnchange}
                      >
                        <option
                          className="select-sub-category-placeholder"
                          value={0}
                        >
                          Speciality / Service
                        </option>
                        {this.state.serviceList
                          ? this.state.serviceList.map((item) => {
                              return (
                                <option
                                  key={item.service_Id}
                                  value={item.service_Id}
                                >
                                  {item.service_Name}
                                </option>
                              );
                            })
                          : null}
                      </select>
                      {this.state.selectServiceValue === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.appointServiceValidation}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <select
                        className="category-select-system dropdown-label"
                        value={this.state.selectAssignToValue}
                        name="selectAssignToValue"
                        onChange={this.handleInputOnchange}
                      >
                        <option
                          className="select-sub-category-placeholder"
                          value={0}
                        >
                          Assigned To
                        </option>
                        {this.state.assignToData
                          ? this.state.assignToData.map((item) => {
                              return (
                                <option
                                  className="select-sub-category-placeholder"
                                  value={item.user_ID}
                                  key={item.user_ID}
                                >
                                  {item.agentName}
                                </option>
                              );
                            })
                          : null}
                      </select>
                      {this.state.selectAssignToValue === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.appointAssignToValidation}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <div className="priority-butns-cntr">
                        <select
                          className="category-select-system dropdown-label"
                          value={this.state.selectAppointmentType}
                          name="selectAppointmentType"
                          onChange={this.handleAppointmentTypeChange}
                        >
                          <option
                            className="select-sub-category-placeholder"
                            value={0}
                          >
                            Select Appointment Type
                          </option>
                          {this.state.appointmentTypeData !== null &&
                            this.state.appointmentTypeData.map((item, i) => (
                              <option
                                className="select-sub-category-placeholder"
                                value={item.appointmentTypeName}
                              >
                                {item.appointmentTypeName}
                              </option>
                            ))}
                        </select>
                      </div>
                      {!this.state.selectAppointmentType && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.appointTypeValidation}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <DatePicker
                        placeholderText={
                          TranslationContext !== undefined
                            ? TranslationContext.label.date
                            : "Date"
                        }
                        showMonthDropdown
                        showYearDropdown
                        className="addmanuallytext1"
                        selected={this.state.appointmentDate}
                        value={this.state.appointmentDate}
                        onChange={this.handleAppointmentDate.bind(this)}
                      />
                      {this.state.appointmentDate === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.appointmentDateValidation}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <DatePicker
                        placeholderText="Time"
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        className="addmanuallytext1"
                        selected={this.state.appointmentTime}
                        value={this.state.appointmentTime}
                        onChange={(time) =>
                          this.setState({
                            appointmentTime: time,
                          })
                        }
                      />
                      {this.state.appointmentTime === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.appointmentTimeValidation}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <select
                        className="category-select-system dropdown-label"
                        value={this.state.selectSlotValue}
                        name="selectSlotValue"
                        onChange={this.handleInputOnchange}
                      >
                        <option
                          className="select-sub-category-placeholder"
                          value={0}
                        >
                          Slots
                        </option>
                        {this.state.appointmentSlotData
                          ? this.state.appointmentSlotData.map((item) => {
                              return (
                                <option
                                  key={item.actualDateTime}
                                  value={item.actualDateTime}
                                >
                                  {item.actualDateTime}
                                </option>
                              );
                            })
                          : null}
                      </select>
                      {this.state.selectServiceValue === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.appointServiceValidation}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <Switch
                        checkedChildren="Paid"
                        unCheckedChildren="Free"
                        style={{ marginTop: "8px", marginBottom: "15px" }}
                        checked={this.state.appointmentType}
                        onChange={this.handleAppointmentfeeTypeChange.bind(
                          this
                        )}
                      />
                      <input
                        type="text"
                        className="addmanuallytext1"
                        disabled={!this.state.appointmentType}
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.ticketingDashboard
                                .appointmentfee
                            : "Appointment Fee"
                        }
                        autoComplete="off"
                        name="appointmentfee"
                        value={this.state.appointmentfee}
                        onChange={this.hanldeDecimalOnChange}
                        style={{ width: "180px", marginLeft: "5px" }}
                      />
                      {this.state.appointmentfee === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.appointmentFeeValidation}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-12">
                      <textarea
                        className="addNote-textarea-system"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.ticketingDashboard.remarks
                            : "Remarks"
                        }
                        name="remarks"
                        value={this.state.remarks}
                        onChange={this.handleInputOnchange}
                      ></textarea>
                      {this.state.remarks === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.remarksValidation}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-12 tckAppoinbtncn">
                      <button
                        type="button"
                        className="tckAppointmentBtn m-t-15"
                        onClick={this.handleAddAppointmentData.bind(this)}
                      >
                        Book Appointment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="card-header collapsetask" id="headingTwo">
                  <h5 className="mb-0 drop">
                    <label
                      className="btn btn-link collapsed drop1"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard
                            .appointmentlistforcustomer
                        : "Appointment List For Customer"}
                    </label>
                  </h5>
                </div>
                <div
                  id="collapseTwo"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#accordion"
                >
                  <div className="card-body systemtaskreact appointment-table">
                    <Table
                      dataSource={this.state.appointmentBookList}
                      columns={[
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.span.id
                              : "Name",
                          dataIndex: "Appointment_Name",
                        },
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.span.tasktitle
                              : "Email Id",
                          dataIndex: "Appointment_Email",
                        },
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.span.assignto
                              : "Mobile No",
                          dataIndex: "Appointment_MobileNo",
                        },
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.span.assignto
                              : "State",
                          dataIndex: "state",
                        },
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.span.assignto
                              : "City",
                          dataIndex: "city",
                        },
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.span.assignto
                              : "Branch",
                          dataIndex: "branch",
                        },
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.span.assignto
                              : "Service",
                          dataIndex: "service",
                        },
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.span.assignto
                              : "Assign To",
                          dataIndex: "assignto",
                        },
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.span.assignto
                              : "Type",
                          dataIndex: "Appointment_Type",
                        },
                        {
                          title: "Appointment Paid",
                          dataIndex: "Appointment_Paid_Flag",
                          render: (row) => {
                            return row ? "Yes" : "No";
                          },
                        },
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.span.assignto
                              : "Appointment Fee",
                          dataIndex: "Appointment_Fee",
                        },
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.span.assignto
                              : "Date",
                          dataIndex: "Appointment_Date",
                        },
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.span.assignto
                              : "Time",
                          dataIndex: "Appointment_time",
                        },
                        {
                          title: "Action",
                          render: (row, item) => {
                            return (
                              <img
                                src={RedDeleteIcon}
                                style={{ width: "16px" }}
                                onClick={this.handleDeleteAppointment.bind(
                                  this,
                                  item
                                )}
                                alt="delete"
                              />
                            );
                          },
                        },
                      ]}
                      pagination={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default TicketSystemAppointment;
