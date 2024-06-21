import React, { Component, Fragment } from "react";
import { authHeader } from "./../../helpers/authHeader";
import axios from "axios";
import config from "./../../helpers/config";
import { NotificationManager } from "react-notifications";
import { Radio, Spin } from "antd";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import * as translationHI from "../../translations/hindi";
import * as translationMA from "../../translations/marathi";
import moment from "moment";

var FieldMapList = [];
class StoreTaskAddCampaign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      TaskCampaign: 1,
      NewTab: false,
      ExistingTab: false,
      backTaskCamp: true,
      CampStartDate: "",
      CampEndDate: "",
      campaignName: "",
      campaignScript: "",
      showNewCampFile: false,
      translateLanguage: {},
      CampNameData: [],
      selectCampaign: 0,
      showExistCampDetails: false,
      file: {},
      CampaignNameValidation: "",
      storeAllocation: "A",
      campaignColumnData: [],
      csvFielsData: [],
      FieldMapNameslist: [],
      NewCampNameValidation: "",
      NewCampStartDateValidation: "",
      NewCampEndDateValidation: "",
      NewCampScriptValidation: "",
      uploadedFileName: "",
      campaignCode: "",
      campScriptID: 0,
      fileUplaodLoading: false,
      submitLoader: false,
      campaign_Id: 0,
      uploadConditionRadio: null,
      isUploadCampaign: false,
      isEditCampaign: false,
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
    if (this.props.location.state) {
      if (this.props.location.state.isUploadCampaign) {
        this.setState({
          isUploadCampaign: this.props.location.state.isUploadCampaign,
        });
      }
      if (this.props.location.state.isEditCampaign) {
        this.setState({
          isEditCampaign: this.props.location.state.isEditCampaign,
        });
      }
    }
  }
  /// handle campaign radio change
  handleCampaignOnChange = (e) => {
    this.setState({
      TaskCampaign: e.target.value,
    });
  };
  /// hide and show tab div
  handleHideShowCampaign() {
    if (this.state.TaskCampaign === 1) {
      this.setState({
        NewTab: true,
        ExistingTab: false,
        CampStartDate: "",
        CampEndDate: "",
        campaignName: "",
        campaignScript: "",
        showExistCampDetails: false,
        selectCampaign: 0,
        CampaignNameValidation: "",
        NewCampNameValidation: "",
        NewCampStartDateValidation: "",
        NewCampEndDateValidation: "",
        NewCampScriptValidation: "",
        campaignColumnData: [],
        showNewCampFile: false,
        submitLoader: false,
      });
    } else {
      this.setState({
        NewTab: false,
        ExistingTab: true,
        CampStartDate: "",
        CampEndDate: "",
        campaignName: "",
        campaignScript: "",
        showExistCampDetails: false,
        selectCampaign: 0,
        CampaignNameValidation: "",
        NewCampNameValidation: "",
        NewCampStartDateValidation: "",
        NewCampEndDateValidation: "",
        NewCampScriptValidation: "",
        campaignColumnData: [],
        showNewCampFile: false,
        submitLoader: false,
      });
      this.handleGetCampaignDetails();
    }
  }
  /// handle input onchange
  handleInoutOnchange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  /// handle date picker onchange
  handleDatePickerChange(index, date) {
    if (index === "start") {
      this.setState({
        CampStartDate: date,
      });
    } else {
      this.setState({
        CampEndDate: date,
      });
    }
  }
  /// handle check Campaign exist or not
  handleCheckStoreCampaign() {
    if (
      this.state.campaignName !== "" &&
      this.state.CampStartDate !== "" &&
      this.state.CampEndDate !== "" &&
      this.state.campaignScript !== ""
    ) {
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/StoreTask/CheckStoreCampaignDetails",
        headers: authHeader(),
        params: {
          CampaignName: this.state.campaignName,
        },
      })
        .then(function(response) {
          let status = response.data.message;
          if (status === "Success") {
            self.setState({
              showNewCampFile: true,
              NewCampNameValidation: "",
              NewCampStartDateValidation: "",
              NewCampEndDateValidation: "",
              NewCampScriptValidation: "",
            });
          } else {
            NotificationManager.error("Record Already Exists.");
            self.setState({
              NewCampNameValidation: "",
              NewCampStartDateValidation: "",
              NewCampEndDateValidation: "",
              NewCampScriptValidation: "",
            });
          }
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
      this.setState({
        NewCampNameValidation: "Please Enter Campaign Name.",
        NewCampStartDateValidation: "Please Select Start Date.",
        NewCampEndDateValidation: "Please Select End Date.",
        NewCampScriptValidation: "Please Enter Campaign Script.",
      });
    }
  }
  /// handle Get Campaign details
  handleGetCampaignDetails() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetStoreCampaignDetails",
      headers: authHeader(),
    })
      .then(function(response) {
        let status = response.data.message;
        var data = response.data.responseData;
        if (status === "Success") {
          self.setState({
            CampNameData: data.campaignDetails,
          });
        } else {
          self.setState({
            CampNameData: [],
          });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  // handle file upload button
  handleFileUploadData = () => {
    this.refs.StoreNewTaskCamp.click();
  };
  /// campaign on change for drop down
  handleDropDownOnChange(e) {
    this.setState({
      selectCampaign: parseInt(e.target.value),
    });
  }
  /// handle Show Exist Campaign details
  handleExistCampaign() {
    if (parseInt(this.state.selectCampaign) !== 0) {
      var existCampData = this.state.CampNameData.filter(
        (x) => x.campaignNameID === parseInt(this.state.selectCampaign)
      )[0];

      this.setState({
        showExistCampDetails: true,
        campaignName: existCampData.campaignName,
        CampStartDate: existCampData.startDate,
        CampEndDate: existCampData.endDate,
        campaignScript: existCampData.campaignScript,
        campaignCode: existCampData.campaignCode,
        campScriptID: existCampData.campaignScriptID,
      });
    } else {
      this.setState({
        CampaignNameValidation: "Please Select Campaign Name.",
        showExistCampDetails: false,
      });
    }
  }

  /// check file format
  handleFileUploadOnchange = (e) => {
    var imageFile = e.target.files[0];
    // var fileName = imageFile.name;
    if (!imageFile.name.match(/\.(csv)$/)) {
      alert("Only csv file allowed.");
      return false;
    } else {
      this.setState({
        file: imageFile,
      });
      setTimeout(() => {
        this.handleFileUpload();
      }, 50);
    }
  };
  /// handle file upload
  handleFileUpload() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    this.setState({
      fileUplaodLoading: true,
    });
    const formData = new FormData();
    formData.append("file", this.state.file);
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetFilepathNHeader",
      headers: authHeader(),
      data: formData,
    })
      .then((response) => {
        var status = response.data.message;
        var data = response.data.responseData;
        if (status === "Success") {
          var FinalData = data.campaignColumnList;

          self.setState({
            campaignColumnData: FinalData,
            csvFielsData: data.csvFiels,
            uploadedFileName: data.fileName,
            fileUplaodLoading: false,
          });
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.filenotuploaded
              : "File not uploaded."
          );
          self.setState({
            campaignColumnData: [],
            csvFielsData: [],
            fileUplaodLoading: false,
          });
        }
      })
      .catch((response) => {
        this.setState({
          fileUplaodLoading: false,
        });
        console.log(response);
      });
  }
  /// handle store allocation change
  handleStoreAllocationOnChange = (e) => {
    this.setState({
      storeAllocation: e.target.value,
    });
  };
  /// handle System field drop down change
  handleSystemDropDownChange(e) {
    var value = e.target.value;
    var Id = e.target.id;
    var name = e.target.selectedOptions[0].getAttribute("fiedname");
    var isExist = false;
    if (value !== "0") {
      for (var i = 0; i <= FieldMapList.length - 1; i++) {
        if (FieldMapList[i].ColumnName === name) {
          isExist = true;
        }
      }
    }
    if (!isExist) {
      if (value === "0") {
        for (var i = 0; i <= FieldMapList.length - 1; i++) {
          if (FieldMapList[i].CsvFiels === Id) {
            FieldMapList.splice([i], 1);
          }
        }
      } else {
        var FieldMapData = {};

        FieldMapData["CsvFiels"] = Id;
        FieldMapData["ColumnName"] = name;
        FieldMapData["ColumnAlies"] = value;

        FieldMapList.push(FieldMapData);
      }
    } else {
      document.getElementById(Id).value = "0";
      for (var i = 0; i <= FieldMapList.length - 1; i++) {
        if (FieldMapList[i].ColumnName === name) {
          FieldMapList.splice([i], 1);
        }
      }
      NotificationManager.error("System Field Already Selected.");
    }
  }

  /// handle new campaign submit
  handleNewCamapaignSubmit() {
    const TranslationContext = this.state.translateLanguage.default;
    var self = this;
    if (FieldMapList.length === 0) {
      NotificationManager.error("Please select fields.");
      return false;
    }
    this.setState({
      submitLoader: true,
    });

    var sameCampStore = "";
    var sameCampDiffStore = "";
    if (this.state.uploadConditionRadio) {
      if (this.state.uploadConditionRadio === 1) {
        sameCampStore = "skip";
      } else if (this.state.uploadConditionRadio === 2) {
        sameCampStore = "";
        sameCampDiffStore = "skip";
      } else {
        sameCampStore = "";
        sameCampDiffStore = "change";
      }
    }

    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/BulkCampaignUpload",
      headers: authHeader(),
      data: {
        CampaignName: this.state.campaignName,
        CampaignNameID: this.state.selectCampaign,
        CampaignCode: this.state.campaignCode,
        CampaignScriptID: this.state.campScriptID,
        CampaignScript: this.state.campaignScript,
        StartDate: moment(this.state.CampStartDate, "DD-MM-YYYY").format(
          "DD-MMM-YYYY"
        ),
        EndDate: moment(this.state.CampEndDate, "DD-MM-YYYY").format(
          "DD-MMM-YYYY"
        ),
        Fieldmapnameslist: FieldMapList,
        FileName: this.state.uploadedFileName,
        StoreAllocation: this.state.storeAllocation,
        SameCampStore: sameCampStore,
        SameCampDiffStore: sameCampDiffStore,
      },
    })
      .then(function(response) {
        var status = response.data.message;
        var data = response.data.responseData;
        if (status === "Success") {
          if (self.state.storeAllocation === "M") {
            self.setState({
              campaign_Id: data.campaignID,
            });

            setTimeout(function() {
              self.props.history.push({
                pathname: "storeAssignCampaign",
                state: self.state,
              });
            }, 100);
          }
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.campaignuploadedsuccessfully
              : "Campaign uploaded successfully."
          );
          FieldMapList = [];
          self.setState({
            uploadConditionRadio: null,
            campaignColumnData: [],
            csvFielsData: [],
            campaignName: "",
            selectCampaign: 0,
            campaignCode: "",
            campScriptID: 0,
            campaignScript: "",
            CampStartDate: "",
            CampEndDate: "",
            uploadedFileName: "",
            storeAllocation: "A",
            submitLoader: false,
            showNewCampFile: false,
            ExistingTab: false,
          });
        } else {
          NotificationManager.error(status);
          self.setState({
            submitLoader: false,
          });
        }
      })
      .catch((response) => {
        this.setState({
          submitLoader: false,
        });
        console.log(response);
      });
  }

  /// handle row key select
  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };

  /// handle all select check box
  handleCheckBoxSelectAll = (selected) => {
    this.setState({
      isCheckBoxSelectAll: selected,
    });
  };
  handleRadioChange = (e) => {
    this.setState({
      uploadConditionRadio: e.target.value,
    });
  };

  render() {
    const TranslationContext = this.state.translateLanguage.default;

    return (
      <Fragment>
        <div className="row card1">
          <div className="bckTaskCamp">
            <Link
              className="backTocampTask"
              to={{
                pathname: "StoreTask",
                state: {
                  backTaskCamp: this.state.backTaskCamp,
                  isUploadCampaign: this.state.isUploadCampaign,
                  isEditCampaign: this.state.isEditCampaign,
                },
              }}
            >
              {`<<`}
              {TranslationContext !== undefined
                ? TranslationContext.ticketingDashboard.backtocampaign
                : "Back to Campaign"}
            </Link>
          </div>
          <div className="col-md-2"></div>
          <div className="col-md-8">
            <Spin
              tip="Please wait..."
              spinning={this.state.submitLoader}
              className="taskSubmitLoader"
            >
              <div className="card taskCards">
                <div>
                  <label className="add_campaign">
                    {TranslationContext !== undefined
                      ? TranslationContext.a.campaign
                      : "Campaign"}
                    :-
                  </label>
                  <Radio.Group
                    onChange={this.handleCampaignOnChange}
                    value={this.state.TaskCampaign}
                  >
                    <Radio value={1} className="campNewRdo">
                      New
                    </Radio>
                    <Radio value={2} className="campExstRdo">
                      Existing
                    </Radio>
                  </Radio.Group>
                </div>
                <div className="row">
                  {this.state.TaskCampaign === 1 && (
                    <div className="taskCampDiv">
                      <button
                        className="butn tasNextBtn"
                        onClick={this.handleHideShowCampaign.bind(this)}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.a.new
                          : "Next"}
                        &nbsp;
                        {`>>`}
                      </button>
                    </div>
                  )}
                  {this.state.TaskCampaign === 2 && (
                    <div className="taskCampDivExst">
                      <button
                        className="butn tasNextBtn"
                        onClick={this.handleHideShowCampaign.bind(this)}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.a.new
                          : "Next"}
                        &nbsp;
                        {`>>`}
                      </button>
                    </div>
                  )}
                </div>
                {this.state.NewTab ? (
                  <div className="m-t-15">
                    <div className="row divStoreTaskCnt">
                      <div className="col-md-3">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.placeholder.entercampaignname
                            : "Enter Campaign Name"}
                        </label>
                      </div>
                      <div className="col-md-6">
                        <input
                          type="text"
                          className="form-control value txtBrd"
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.placeholder.entercampaignname
                              : "Enter Campaign Name"
                          }
                          autoComplete="off"
                          name="campaignName"
                          value={this.state.campaignName}
                          onChange={this.handleInoutOnchange}
                          maxLength={100}
                        />
                        {this.state.campaignName === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.NewCampNameValidation}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="row storeTaskCampDate divStoreTaskCnt">
                      <div className="col-md-3">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.placeholder.campaignstartdate
                            : "Campaign Start Date"}
                        </label>
                      </div>
                      <div className="col-md-6">
                        <DatePicker
                          selected={this.state.CampStartDate}
                          placeholderText={
                            TranslationContext !== undefined
                              ? TranslationContext.placeholder.campaignstartdate
                              : "Campaign Start Date"
                          }
                          showMonthDropdown
                          showYearDropdown
                          minDate={new Date()}
                          dateFormat="dd/MM/yyyy"
                          autoComplete="off"
                          className="ant-calendar-date-picker-input"
                          onChange={this.handleDatePickerChange.bind(
                            this,
                            "start"
                          )}
                        />
                        {this.state.CampStartDate === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.NewCampStartDateValidation}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row storeTaskCampDate divStoreTaskCnt">
                      <div className="col-md-3">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.campaignenddate
                            : "Campaign End Date"}
                        </label>
                      </div>
                      <div className="col-md-6">
                        <DatePicker
                          selected={this.state.CampEndDate}
                          placeholderText={
                            TranslationContext !== undefined
                              ? TranslationContext.label.campaignenddate
                              : "Campaign End Date"
                          }
                          showMonthDropdown
                          showYearDropdown
                          // minDate={new Date()}
                          minDate={
                            this.state.CampStartDate === ""
                              ? new Date()
                              : this.state.CampStartDate
                          }
                          dateFormat="dd/MM/yyyy"
                          autoComplete="off"
                          className="ant-calendar-date-picker-input"
                          onChange={this.handleDatePickerChange.bind(
                            this,
                            "end"
                          )}
                        />
                        {this.state.CampEndDate === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.NewCampEndDateValidation}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row divStoreTaskCnt">
                      <div className="col-md-3">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.ticketingDashboard
                                .entercampaignscript
                            : "Enter Campaign Script"}
                        </label>
                      </div>
                      <div className="col-md-6">
                        <textarea
                          rows="8"
                          className="form-control value txtBrd textarea-store"
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.ticketingDashboard
                                  .entercampaignscript
                              : "Enter Campaign Script"
                          }
                          autoComplete="off"
                          name="campaignScript"
                          value={this.state.campaignScript}
                          onChange={this.handleInoutOnchange}
                        ></textarea>
                        {this.state.campaignScript === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.NewCampScriptValidation}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row divStoreTaskCnt">
                      <div className="col-md-4"></div>
                      <div className="col-md-8">
                        <Radio.Group
                          name="radiogroupcampaign"
                          style={{ display: "inline-grid", marginLeft: "35px" }}
                          onChange={this.handleRadioChange.bind(this)}
                          value={this.state.uploadConditionRadio}
                        >
                          <label>
                            If customer is already part of same campaign in
                            store.
                          </label>
                          <Radio value={1}>Skip Upload</Radio>
                          <label>
                            If customer is already part of same campaign in
                            different store.
                          </label>
                          <Radio value={2}>Skip Upload</Radio>
                          <Radio value={3}>Change to new store code</Radio>
                        </Radio.Group>
                      </div>
                    </div>

                    <div className="taskCampBtn">
                      <button
                        className="butn tasNextBtn"
                        onClick={this.handleCheckStoreCampaign.bind(this)}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.button.proceed
                          : "Proceed"}
                        {`>>`}
                      </button>
                    </div>
                    {this.state.showNewCampFile ? (
                      <div className="m-t-10">
                        <div className="row divStoreTaskCnt">
                          <div className="col-md-3">
                            <label>
                              {TranslationContext !== undefined
                                ? TranslationContext.ticketingDashboard
                                    .importfile
                                : "Import File"}
                            </label>
                          </div>
                          <div className="col-md-6">
                            <button
                              type="button"
                              onClick={this.handleFileUploadData}
                              className="curshar-pointer"
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.ticketingDashboard
                                    .choosefile
                                : "Choose File"}
                            </button>
                            <input
                              type="file"
                              accept=".csv"
                              ref="StoreNewTaskCamp"
                              style={{ display: "none" }}
                              onChange={this.handleFileUploadOnchange}
                            />
                            &nbsp;
                            {/* {this.state.fileName} */}
                          </div>
                          <div className="row divStoreTaskCnt">
                            <label className="add_campaign">
                              {TranslationContext !== undefined
                                ? TranslationContext.ticketingDashboard
                                    .storeallocation
                                : "Store Allocation"}
                            </label>

                            <Radio.Group
                              onChange={this.handleStoreAllocationOnChange}
                              value={this.state.storeAllocation}
                            >
                              <Radio value="A">Auto</Radio>
                              <Radio value="M">Manual</Radio>
                            </Radio.Group>
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : null}
                {this.state.ExistingTab ? (
                  <div>
                    <div className="row divStoreTaskCnt m-t-15">
                      <div className="col-md-3">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.ticketingDashboard
                                .selectcampaignname
                            : "Select Campaign Name"}
                        </label>
                      </div>
                      <div className="col-md-6">
                        <select
                          className="store-create-select"
                          value={this.state.selectCampaign}
                          onChange={this.handleDropDownOnChange.bind(this)}
                        >
                          <option value={0}>Select Campaign</option>
                          {this.state.CampNameData !== null &&
                            this.state.CampNameData.map((item, i) => (
                              <option
                                key={i}
                                value={item.campaignNameID}
                                className="select-category-placeholder"
                              >
                                {item.campaignName}
                              </option>
                            ))}
                        </select>
                        {parseInt(this.state.selectCampaign) === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.CampaignNameValidation}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="taskCampBtn">
                      <button
                        className="butn tasNextBtn"
                        onClick={this.handleExistCampaign.bind(this)}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.a.new
                          : "Next"}
                        {`>>`}
                      </button>
                    </div>
                    {this.state.showExistCampDetails && (
                      <div className="m-t-15">
                        <div className="row divStoreTaskCnt">
                          <div className="col-md-3">
                            <label>
                              {TranslationContext !== undefined
                                ? TranslationContext.placeholder
                                    .campaignstartdate
                                : "Campaign Start Date"}
                            </label>
                          </div>
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="form-control value txtBrd"
                              placeholder="Start Date"
                              value={this.state.CampStartDate}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="row divStoreTaskCnt">
                          <div className="col-md-3">
                            <label>
                              {TranslationContext !== undefined
                                ? TranslationContext.label.campaignenddate
                                : "Campaign End Date"}
                            </label>
                          </div>
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="form-control value txtBrd"
                              placeholder="End Date"
                              value={this.state.CampEndDate}
                              disabled={true}
                            />
                          </div>
                        </div>
                        <div className="row divStoreTaskCnt">
                          <div className="col-md-3">
                            <label>
                              {TranslationContext !== undefined
                                ? TranslationContext.title.campaignscript
                                : "Campaign Script"}
                            </label>
                          </div>
                          <div className="col-md-6">
                            <textarea
                              rows="8"
                              className="form-control value txtBrd textarea-store"
                              value={this.state.campaignScript}
                              disabled={true}
                            ></textarea>
                          </div>
                        </div>
                        <div className="row divStoreTaskCnt">
                          <div className="col-md-4"></div>
                          <div className="col-md-8">
                            <Radio.Group
                              name="radiogroupcampaign"
                              style={{
                                display: "inline-grid",
                                marginLeft: "35px",
                              }}
                              onChange={this.handleRadioChange.bind(this)}
                              value={this.state.uploadConditionRadio}
                            >
                              <label>
                                If customer is already part of same campaign in
                                store.
                              </label>
                              <Radio value={1}>Skip Upload</Radio>
                              <label>
                                If customer is already part of same campaign in
                                different store.
                              </label>
                              <Radio value={2}>Skip Upload</Radio>
                              <Radio value={3}>Change to new store code</Radio>
                            </Radio.Group>
                          </div>
                        </div>

                        <div className="m-t-10">
                          <div className="row divStoreTaskCnt">
                            <div className="col-md-3">
                              <label>
                                {TranslationContext !== undefined
                                  ? TranslationContext.ticketingDashboard
                                      .importfile
                                  : "Import File"}
                              </label>
                            </div>
                            <div className="col-md-6">
                              <button
                                type="button"
                                onClick={this.handleFileUploadData}
                                className="curshar-pointer"
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.ticketingDashboard
                                      .choosefile
                                  : "Choose File"}
                              </button>
                              <input
                                type="file"
                                accept=".csv"
                                ref="StoreNewTaskCamp"
                                style={{ display: "none" }}
                                onChange={this.handleFileUploadOnchange}
                              />
                              &nbsp;
                              {/* {this.state.fileName} */}
                            </div>
                            <div className="row divStoreTaskCnt">
                              <label className="add_campaign">
                                {TranslationContext !== undefined
                                  ? TranslationContext.ticketingDashboard
                                      .storeallocation
                                  : "Store Allocation"}
                              </label>

                              <Radio.Group
                                onChange={this.handleStoreAllocationOnChange}
                                value={this.state.storeAllocation}
                              >
                                <Radio value="A">Auto</Radio>
                                <Radio value="M">Manual</Radio>
                              </Radio.Group>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}

                <Spin
                  tip="Please wait..."
                  spinning={this.state.fileUplaodLoading}
                >
                  {this.state.campaignColumnData.length > 0 && (
                    <div className="row divStoreTaskCnt">
                      <div className="col-md-1"></div>
                      <div className="col-md-4">
                        <label className="csvFileHeaderLbl">
                          {TranslationContext !== undefined
                            ? TranslationContext.ticketingDashboard
                                .csvfilefields
                            : "CSV File Fields"}
                        </label>
                      </div>
                      <div className="col-md-4">
                        <label className="csvFileHeaderLbl">
                          {TranslationContext !== undefined
                            ? TranslationContext.ticketingDashboard.systemfields
                            : "System Fields"}
                        </label>
                      </div>
                    </div>
                  )}

                  {this.state.csvFielsData !== null &&
                    this.state.csvFielsData.map((item, c) => {
                      return (
                        <div className="row divStoreTaskCnt" key={c}>
                          <div className="col-md-1">
                            <label>{c + 1}.</label>
                          </div>
                          <div className="col-md-4">
                            <label>{item}</label>
                          </div>
                          <div className="col-md-4">
                            <select
                              className="store-create-select"
                              id={item}
                              onChange={this.handleSystemDropDownChange.bind(
                                this
                              )}
                            >
                              <option value={0}>Select</option>
                              {this.state.campaignColumnData !== null &&
                                this.state.campaignColumnData.map((item, c) => (
                                  <option
                                    key={c}
                                    value={item.columnAlies}
                                    className="select-category-placeholder"
                                    fiedname={item.campaigncolumns}
                                  >
                                    {item.campaigncolumns
                                      ? item.campaigncolumns.toLowerCase() ===
                                        "birthdate"
                                        ? "Date"
                                        : item.campaigncolumns
                                      : null}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                      );
                    })}

                  {this.state.campaignColumnData.length > 0 && (
                    <div className="row taskCampBtn m-t-15">
                      <button
                        className="butn"
                        onClick={this.handleNewCamapaignSubmit.bind(this)}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.button.submit
                          : "Submit"}
                      </button>
                    </div>
                  )}
                </Spin>
              </div>
            </Spin>
          </div>

          <div className="col-md-2"></div>
        </div>
      </Fragment>
    );
  }
}

export default StoreTaskAddCampaign;
