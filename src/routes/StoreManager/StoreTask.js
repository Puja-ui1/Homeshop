import React, { Component } from "react";
import Campaign from "./Campaign";
import InfoIcon from "../../assets/Images/info-icon.png";
// import Demo from "../../store/Hashtag";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import ReactTable from "react-table";
import { authHeader } from "./../../helpers/authHeader";
import axios from "axios";
import config from "./../../helpers/config";
import Modal from "react-responsive-modal";
import Sorting from "./../../assets/Images/sorting.png";
import matchSorter from "match-sorter";
import { Collapse, CardBody, Card } from "reactstrap";
import SearchIcon from "../../assets/Images/search-icon.png";
import CreationOnDatePickerCompo from "./../Settings/Store/CreationDatePickerCompo";
import StoreStatus from "./StoreStatus.js";
import moment from "moment";
import * as translationHI from "../../translations/hindi";
import * as translationMA from "../../translations/marathi";
class StoreTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      raisedByMeData: [],
      assignToMeData: [],
      taskByTicketData: [],
      campaignData: [],
      isloading: false,
      sortAllData: [],
      sdepartmentNameFilterCheckbox: "",
      sstoreNameFilterCheckbox: "",
      spriorityNameFilterCheckbox: "",
      screationOnFilterCheckbox: "",
      sassigntoFilterCheckbox: "",
      screatedByFilterCheckbox: "",
      sortFilterdepartmentName: [],
      sortFilterstoreName: [],
      sortFilterpriorityName: [],
      sortFiltercreationOn: [],
      sortFilterassignto: [],
      sortFiltercreatedBy: [],
      sortdepartmentName: [],
      sortstoreName: [],
      sortpriorityName: [],
      sortcreationOn: [],
      sortassignto: [],
      sortcreatedBy: [],
      sortColumn: "",
      sortHeader: "",
      filterTxtValue: "",
      isortA: false,
      tempitemData: [],
      tabIndex: 1,
      showAddTask: true,
      FilterCollapse: false,
      priorityData: [],
      assignToData: [],
      funcationData: [],
      departmentData: [],
      assignSearchData: {},
      raiseSearchData: {},
      ticketSearchData: {},
      storeStatus: StoreStatus(),
      userData: [],
      isViewSerach: false,
      isATOZ: true,
      itemData: [],
      translateLanguage: {},
      showMobileTab: false,
      isDesktop: true,
      showCampaignBtns: false,
      backTaskCamp: false,
      totalData: 0,
      isEditCampaign: false,
      isUploadCampaign: false,
      StatusModel:false,
    };
    this.handleGetTaskData = this.handleGetTaskData.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
  }

  componentDidMount() {
    if (window.innerWidth > 576) {
      this.setState({ isDesktop: true });
    } else {
      this.setState({ isDesktop: false });
    }

    if (this.props.location.state) {
      if (this.props.location.state.backTaskCamp) {
        this.setState({
          isUploadCampaign: this.props.location.state.isUploadCampaign,
          isEditCampaign: this.props.location.state.isEditCampaign,
        });
        this.handleGetTaskData(4);
        document.getElementById("campaign-tab_new").click();
      }
      if (this.props.location.state.isHeader) {
        this.setState({
          isUploadCampaign: this.props.location.state.isUploadCampaign,
          isEditCampaign: this.props.location.state.isEditCampaign,
        });
        this.handleGetTaskData(1);
      }
    } else {
      this.handleGetTaskData(1);
    }

    // this.handleGetTaskData(1);
    this.handleGetDepartment();
    this.handleGetPriorityList();
    this.handleGetStoreUser();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }
  handleChangeStoreTask() {
    this.props.history.push("/store/editStoreTask");
  }
  /// handle to redirect task by ticket
  handleChangeTaskByTicket() {
    this.props.history.push("/store/storeTaskByTicket");
  }
  /// handle redirect to add task page
  handleChagneAddTask() {
    this.props.history.push("storeAddTask");
  }
  /// handle redirect to add campaign
  handleRedirectToAddCampaign() {
    this.props.history.push({
      pathname: "/store/taskAddCampaign",
      state: {
        isUploadCampaign: this.state.isUploadCampaign,
        isEditCampaign: this.state.isEditCampaign,
      },
    });
  }
  ////handle row click raised by me table
  handleRowClickRaisedTable = (rowInfo, column) => {
    return {
      onClick: (e) => {
        var storeTaskID = column.original["storeTaskID"];
        this.handleRedirectToEditStoreTask(storeTaskID);
      },
    };
  };
  ////handle redirect to edit store task
  handleRedirectToEditStoreTask(storeTaskID) {
    this.props.history.push({
      pathname: "editStoreTask",
      state: { TaskID: storeTaskID },
    });
  }
  HandleRowTaskByClickPage = (rowInfo, column) => {
    return {
      onClick: (e) => {
        var storeTaskID = column.original["storeTaskID"];
        var ticketid = column.original["ticketID"];
        this.handleRedirectToStoreTaskByTicket(storeTaskID, ticketid);
      },
    };
  };
  ////handle redirect to store Task By Ticket
  handleRedirectToStoreTaskByTicket(storeTaskID, ticketid) {
    this.props.history.push({
      pathname: "/store/storeTaskByTicket",
      state: { TaskID: storeTaskID, TicketID: ticketid },
    });
  }
  ////handle get task data by tab click
  handleGetTaskData(tabFor) {
    if (tabFor === 4) {
      this.setState({
        showAddTask: false,
        showCampaignBtns: true,
      });

      this.handleGetStoreUnAssignedCampaign();
    } else {
      this.setState({
        sortColumn: "",
        sortHeader: "",
        isATOZ: true,
        isortA: false,
        filterTxtValue: "",
        showAddTask: true,
        showCampaignBtns: false,
      });
    }
    if (tabFor !== 4) {
      this.setState({
        FilterCollapse: false,
        showCampaignBtns: false,
        isloading: true,
        raiseSearchData: {},
        assignSearchData: {},
        ticketSearchData: {},
        sdepartmentNameFilterCheckbox: "",
        sstoreNameFilterCheckbox: "",
        spriorityNameFilterCheckbox: "",
        screationOnFilterCheckbox: "",
        sassigntoFilterCheckbox: "",
        screatedByFilterCheckbox: "",
        staskStatusFilterCheckbox: "",

        sortFilterdepartmentName: [],
        sortFilterstoreName: [],
        sortFilterpriorityName: [],
        sortFiltercreationOn: [],
        sortFilterassignto: [],
        sortFiltercreatedBy: [],
        sortFiltertaskStatus: [],

        sortdepartmentName: [],
        sortstoreName: [],
        sortpriorityName: [],
        sortcreationOn: [],
        sortassignto: [],
        sortcreatedBy: [],
        sorttaskStatus: [],
      });
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/StoreTask/GetStoreTaskList",
        headers: authHeader(),
        params: { tabFor: tabFor },
      })
        .then(function(response) {
          var message = response.data.message;
          var data = response.data.responseData;
          if (message === "Success" && data.length > 0) {
            self.setState({ sortAllData: data });
            var unique = [];
            var distinct = [];
            var sortFilterdepartmentName = [];
            var sortFilterstoreName = [];
            var sortFilterpriorityName = [];
            var sortFiltercreationOn = [];
            var sortFilterassignto = [];
            var sortFiltercreatedBy = [];
            var sortFiltertaskStatus = [];
            var sortdepartmentName = [];
            var sortstoreName = [];
            var sortpriorityName = [];
            var sortcreationOn = [];
            var sortassignto = [];
            var sortcreatedBy = [];
            var sorttaskStatus = [];
            if (tabFor === 1) {
              self.setState({
                raisedByMeData: data,
                isloading: false,
                tabIndex: tabFor,
              });

              for (let i = 0; i < data.length; i++) {
                if (
                  !unique[data[i].departmentName] &&
                  data[i].departmentName !== ""
                ) {
                  distinct.push(data[i].departmentName);
                  unique[data[i].departmentName] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                if (distinct[i]) {
                  sortdepartmentName.push({
                    departmentName: distinct[i],
                  });
                  sortFilterdepartmentName.push({
                    departmentName: distinct[i],
                  });
                }
              }
              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (!unique[data[i].storeName] && data[i].storeName !== "") {
                  distinct.push(data[i].storeName);
                  unique[data[i].storeName] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                if (distinct[i]) {
                  sortFilterstoreName.push({
                    storeName: distinct[i],
                  });
                  sortstoreName.push({
                    storeName: distinct[i],
                  });
                }
              }
              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (
                  !unique[data[i].priorityName] &&
                  data[i].priorityName !== ""
                ) {
                  distinct.push(data[i].priorityName);
                  unique[data[i].priorityName] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                if (distinct[i]) {
                  sortpriorityName.push({
                    priorityName: distinct[i],
                  });
                  sortFilterpriorityName.push({
                    priorityName: distinct[i],
                  });
                }
              }
              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (!unique[data[i].creationOn] && data[i].creationOn !== "") {
                  distinct.push(data[i].creationOn);
                  unique[data[i].creationOn] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                if (distinct[i]) {
                  sortcreationOn.push({
                    creationOn: distinct[i],
                  });
                  sortFiltercreationOn.push({
                    creationOn: distinct[i],
                  });
                }
              }
              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (!unique[data[i].assignto] && data[i].assignto !== "") {
                  distinct.push(data[i].assignto);
                  unique[data[i].assignto] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                if (distinct[i]) {
                  sortassignto.push({
                    assignto: distinct[i],
                  });
                  sortFilterassignto.push({
                    assignto: distinct[i],
                  });
                }
              }
              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (!unique[data[i].taskStatus] && data[i].taskStatus !== "") {
                  distinct.push(data[i].taskStatus);
                  unique[data[i].taskStatus] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                if (distinct[i]) {
                  sorttaskStatus.push({
                    taskStatus: distinct[i],
                  });
                  sortFiltertaskStatus.push({
                    taskStatus: distinct[i],
                  });
                }
              }
            }
            if (tabFor === 2) {
              self.setState({
                assignToMeData: data,
                isloading: false,
                tabIndex: tabFor,
              });
              self.state.sortAllData = data;
              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (
                  !unique[data[i].departmentName] &&
                  data[i].departmentName !== ""
                ) {
                  distinct.push(data[i].departmentName);
                  unique[data[i].departmentName] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                if (distinct[i]) {
                  sortdepartmentName.push({
                    departmentName: distinct[i],
                  });
                  sortFilterdepartmentName.push({
                    departmentName: distinct[i],
                  });
                }
              }
              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (!unique[data[i].storeName] && data[i].storeName !== "") {
                  distinct.push(data[i].storeName);
                  unique[data[i].storeName] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                if (distinct[i]) {
                  sortstoreName.push({ storeName: distinct[i] });
                  sortFilterstoreName.push({ storeName: distinct[i] });
                }
              }
              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (
                  !unique[data[i].priorityName] &&
                  data[i].priorityName !== ""
                ) {
                  distinct.push(data[i].priorityName);
                  unique[data[i].priorityName] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                if (distinct[i]) {
                  sortpriorityName.push({ priorityName: distinct[i] });
                  sortFilterpriorityName.push({
                    priorityName: distinct[i],
                  });
                }
              }
              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (!unique[data[i].creationOn] && data[i].creationOn !== "") {
                  distinct.push(data[i].creationOn);
                  unique[data[i].creationOn] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                if (distinct[i]) {
                  sortcreationOn.push({
                    creationOn: distinct[i],
                  });
                  sortFiltercreationOn.push({
                    creationOn: distinct[i],
                  });
                }
              }
              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (!unique[data[i].createdBy] && data[i].createdBy !== "") {
                  distinct.push(data[i].createdBy);
                  unique[data[i].createdBy] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                if (distinct[i]) {
                  sortcreatedBy.push({ createdBy: distinct[i] });
                  sortFiltercreatedBy.push({
                    createdBy: distinct[i],
                  });
                }
              }
              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (!unique[data[i].taskStatus] && data[i].taskStatus !== "") {
                  distinct.push(data[i].taskStatus);
                  unique[data[i].taskStatus] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                if (distinct[i]) {
                  sorttaskStatus.push({
                    taskStatus: distinct[i],
                  });
                  sortFiltertaskStatus.push({
                    taskStatus: distinct[i],
                  });
                }
              }
            }
            self.setState({
              sortdepartmentName,
              sortstoreName,
              sortpriorityName,
              sortcreationOn,
              sortassignto,
              sortcreatedBy,
              sorttaskStatus,
              sortFilterdepartmentName,
              sortFilterstoreName,
              sortFilterpriorityName,
              sortFiltercreationOn,
              sortFilterassignto,
              sortFiltercreatedBy,
              sortFiltertaskStatus,
            });
          } else {
            if (tabFor === 1) {
              self.setState({
                raisedByMeData: [],
                isloading: false,
                sortAllData: [],
              });
            }
            if (tabFor === 2) {
              self.setState({
                assignToMeData: [],
                isloading: false,
                sortAllData: [],
              });
            }
          }
        })
        .catch((response) => {
          self.setState({ isloading: false });
          console.log(response, "---handleGetTaskData");
        });
    }
  }

  handleGetTaskbyTicket() {
    this.setState({
      sortColumn: "",
      sortHeader: "",
      isATOZ: true,
      isortA: false,
      filterTxtValue: "",
      showAddTask: true,
      tabIndex: 3,
      isloading: true,
      FilterCollapse: false,
      raiseSearchData: {},
      assignSearchData: {},
      ticketSearchData: {},
      sdepartmentNameFilterCheckbox: "",
      sstoreNameFilterCheckbox: "",
      spriorityNameFilterCheckbox: "",
      screationOnFilterCheckbox: "",
      sassigntoFilterCheckbox: "",
      screatedByFilterCheckbox: "",

      sortFilterdepartmentName: [],
      sortFilterstoreName: [],
      sortFilterpriorityName: [],
      sortFiltercreationOn: [],
      sortFilterassignto: [],
      sortFiltercreatedBy: [],

      sortdepartmentName: [],
      sortstoreName: [],
      sortpriorityName: [],
      sortcreationOn: [],
      sortassignto: [],
      sortcreatedBy: [],
      showCampaignBtns: false,
    });
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetStoreTaskByTicket",
      headers: authHeader(),
    })
      .then(function(response) {
        var message = response.data.message;
        var data = response.data.responseData;
        if (message === "Success" && data.length > 0) {
          self.setState({
            isloading: false,
            taskByTicketData: data,
            sortAllData: data,
          });
          var sortFilterdepartmentName = [];
          var sortFilterstoreName = [];
          var sortFilterpriorityName = [];
          var sortFiltercreationOn = [];
          var sortFilterassignto = [];
          var sortFiltercreatedBy = [];
          var sortFiltertaskStatus = [];
          var sortdepartmentName = [];
          var sortstoreName = [];
          var sortpriorityName = [];
          var sortcreationOn = [];
          var sortassignto = [];
          var sortcreatedBy = [];
          var sorttaskStatus = [];

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (
              !unique[data[i].departmentName] &&
              data[i].departmentName !== ""
            ) {
              distinct.push(data[i].departmentName);
              unique[data[i].departmentName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortdepartmentName.push({
                departmentName: distinct[i],
              });
              sortFilterdepartmentName.push({
                departmentName: distinct[i],
              });
            }
          }
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].storeName] && data[i].storeName !== "") {
              distinct.push(data[i].storeName);
              unique[data[i].storeName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortstoreName.push({
                storeName: distinct[i],
              });
              sortFilterstoreName.push({
                storeName: distinct[i],
              });
            }
          }
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].createdBy] && data[i].createdBy !== "") {
              distinct.push(data[i].createdBy);
              unique[data[i].createdBy] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortcreatedBy.push({
                createdBy: distinct[i],
              });
              sortFiltercreatedBy.push({
                createdBy: distinct[i],
              });
            }
          }
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].creationOn] && data[i].creationOn !== "") {
              distinct.push(data[i].creationOn);
              unique[data[i].creationOn] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortcreationOn.push({
                creationOn: distinct[i],
              });
              sortFiltercreationOn.push({
                creationOn: distinct[i],
              });
            }
          }
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].assignto] && data[i].assignto !== "") {
              distinct.push(data[i].assignto);
              unique[data[i].assignto] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortassignto.push({
                assignto: distinct[i],
              });
              sortFilterassignto.push({
                assignto: distinct[i],
              });
            }
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].taskStatus] && data[i].taskStatus !== "") {
              distinct.push(data[i].taskStatus);
              unique[data[i].taskStatus] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortFiltertaskStatus.push({
                taskStatus: distinct[i],
              });
              sorttaskStatus.push({
                taskStatus: distinct[i],
              });
            }
          }
          self.setState({
            sortdepartmentName,
            sortstoreName,
            sortpriorityName,
            sortcreationOn,
            sortassignto,
            sortcreatedBy,
            sorttaskStatus,
            sortFilterdepartmentName,
            sortFilterstoreName,
            sortFilterpriorityName,
            sortFiltercreationOn,
            sortFilterassignto,
            sortFiltercreatedBy,
            sortFiltertaskStatus,
          });
        } else {
          self.setState({ isloading: false, data });
        }
      })
      .catch((response) => {
        self.setState({ isloading: false });
        console.log(response, "---handleGetTaskbyTicket");
      });
  }

  ///handle Get Department list
  handleGetDepartment() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getDepartmentList",
      headers: authHeader(),
    })
      .then(function(response) {
        let status = response.data.message;
        let data = response.data.responseData;
        if (status === "Success") {
          self.setState({
            departmentData: data,
          });
        } else {
          self.setState({
            departmentData: [],
          });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetDepartment");
      });
  }
  /// Get Funcation list by Department Id for dropdown
  handleGetFuncationByDepartmentId() {
    var departmentId = 0;
    if (this.state.tabIndex === 1) {
      departmentId = this.state.raiseSearchData["Department"];
    }
    if (this.state.tabIndex === 2) {
      departmentId = this.state.assignSearchData["Department"];
    }
    if (this.state.tabIndex === 3) {
      departmentId = this.state.ticketSearchData["Department"];
    }

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getFunctionNameByDepartmentId",
      headers: authHeader(),
      params: { DepartmentId: departmentId },
    })
      .then(function(response) {
        var message = response.data.message;
        var data = response.data.responseData;
        if (message === "Success") {
          self.setState({ funcationData: data });
        } else {
          self.setState({ funcationData: [] });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetFuncationByDepartmentId");
      });
  }
  //// Get Assign to list by funcation id
  handleGetAssignTobyFuncationId() {
    var funcationID = 0;
    if (this.state.tabIndex === 1) {
      funcationID = this.state.raiseSearchData["functionID"];
    }
    if (this.state.tabIndex === 2) {
      funcationID = this.state.assignSearchData["functionID"];
    }
    if (this.state.tabIndex === 3) {
      funcationID = this.state.ticketSearchData["functionID"];
    }
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetAssignedTo",
      headers: authHeader(),
      params: {
        Function_ID: funcationID,
      },
    })
      .then(function(response) {
        var message = response.data.message;
        var data = response.data.responseData;
        if (message === "Success") {
          self.setState({ assignToData: data });
        } else {
          self.setState({ assignToData: [] });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetAssignTobyFuncationId");
      });
  }
  ///handle get priority list for dropdown
  handleGetPriorityList() {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/StorePriority/GetPriorityList",
      headers: authHeader(),
    })
      .then(function(response) {
        var message = response.data.message;
        var data = response.data.responseData;
        if (message === "Success") {
          self.setState({ priorityData: data });
        } else {
          self.setState({ priorityData: [] });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetPriorityList");
      });
  }
  handleGetStoreUser() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/GetStoreUsers",
      headers: authHeader(),
    })
      .then(function(response) {
        var message = response.data.message;
        var userData = response.data.responseData;
        if (message === "Success" && userData) {
          self.setState({ userData });
        } else {
          self.setState({ userData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetStoreUser");
      });
  }
  ////handle get assign by me search filter
  handleGetAssigenBymefilterData() {
    let self = this;

    var inputParam = {};

    // inputParam.taskid = this.state.assignSearchData["taskid"] || 0;
    inputParam.taskid =
      this.state.assignSearchData["taskid"] === "" ||
      this.state.assignSearchData["taskid"] === undefined
        ? 0
        : isNaN(this.state.assignSearchData["taskid"])
        ? -1
        : this.state.assignSearchData["taskid"];
    inputParam.Department = this.state.assignSearchData["Department"] || 0;
    inputParam.tasktitle = this.state.assignSearchData["tasktitle"] || "";
    inputParam.taskstatus = this.state.assignSearchData["taskstatus"] || 0;
    inputParam.functionID = this.state.assignSearchData["functionID"] || 0;
    if (this.state.assignSearchData["CreatedOnFrom"]) {
      var start = new Date(this.state.assignSearchData["CreatedOnFrom"]);
      inputParam.CreatedOnFrom =
        moment(start)
          .format("YYYY-MM-DD")
          .toString() || "";
    } else {
      inputParam.CreatedOnFrom = null;
    }
    if (this.state.assignSearchData["CreatedOnTo"]) {
      var end = new Date(this.state.assignSearchData["CreatedOnTo"]);
      inputParam.CreatedOnTo =
        moment(end)
          .format("YYYY-MM-DD")
          .toString() || "";
    } else {
      inputParam.CreatedOnTo = null;
    }

    inputParam.AssigntoId = 0; //this.state.raiseSearchData["AssigntoId"] || 0;
    inputParam.createdID = this.state.assignSearchData["createdID"] || 0;
    inputParam.Priority = this.state.assignSearchData["Priority"] || 0;
    this.setState({ isViewSerach: true });
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetAssigenBymefilterData",
      headers: authHeader(),
      data: inputParam,
    })
      .then(function(response) {
        var message = response.data.message;
        var assignToMeData = response.data.responseData;
        if (message === "Success" && assignToMeData) {
          self.setState({ assignToMeData, isViewSerach: false });
        } else {
          self.setState({ assignToMeData, isViewSerach: false });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetAssigenBymefilterData");
      });
  }
  ////handle get raise by me search filter
  handleGetRaisedbymefilterData() {
    let self = this;

    var inputParam = {};

    // inputParam.taskid = this.state.raiseSearchData["taskid"] || 0;
    inputParam.taskid =
      this.state.raiseSearchData["taskid"] === "" ||
      this.state.raiseSearchData["taskid"] === undefined
        ? 0
        : isNaN(this.state.raiseSearchData["taskid"])
        ? -1
        : this.state.raiseSearchData["taskid"];
    inputParam.Department = this.state.raiseSearchData["Department"] || 0;
    inputParam.tasktitle = this.state.raiseSearchData["tasktitle"] || "";
    inputParam.taskstatus = this.state.raiseSearchData["taskstatus"] || 0;
    inputParam.functionID = this.state.raiseSearchData["functionID"] || 0;
    if (this.state.raiseSearchData["CreatedOnFrom"]) {
      var start = new Date(this.state.raiseSearchData["CreatedOnFrom"]);
      inputParam.CreatedOnFrom =
        moment(start)
          .format("YYYY-MM-DD")
          .toString() || "";
    } else {
      inputParam.CreatedOnFrom = null;
    }
    if (this.state.raiseSearchData["CreatedOnTo"]) {
      var end = new Date(this.state.raiseSearchData["CreatedOnTo"]);
      inputParam.CreatedOnTo =
        moment(end)
          .format("YYYY-MM-DD")
          .toString() || "";
    } else {
      inputParam.CreatedOnTo = null;
    }

    inputParam.AssigntoId = this.state.raiseSearchData["AssigntoId"] || 0;
    inputParam.createdID = 0; //this.state.raiseSearchData["createdID"] || 0;
    inputParam.Priority = this.state.raiseSearchData["Priority"] || 0;
    this.setState({ isViewSerach: true });
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetRaisedbymefilterData",
      headers: authHeader(),
      data: inputParam,
    })
      .then(function(response) {
        var message = response.data.message;
        var raisedByMeData = response.data.responseData;
        if (message === "Success" && raisedByMeData) {
          self.setState({ raisedByMeData, isViewSerach: false });
        } else {
          self.setState({ raisedByMeData, isViewSerach: false });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetRaisedbymefilterData");
      });
  }
  handleGetTaskbyTicketData() {
    let self = this;

    var inputParam = {};

    // inputParam.taskid = this.state.ticketSearchData["taskid"] || 0;
    inputParam.taskid =
      this.state.ticketSearchData["taskid"] === "" ||
      this.state.ticketSearchData["taskid"] === undefined
        ? 0
        : isNaN(this.state.ticketSearchData["taskid"])
        ? -1
        : this.state.ticketSearchData["taskid"];
    inputParam.Department = this.state.ticketSearchData["Department"] || 0;
    inputParam.tasktitle = this.state.ticketSearchData["tasktitle"] || "";
    inputParam.taskstatus = this.state.ticketSearchData["taskstatus"] || 0;
    inputParam.functionID = this.state.ticketSearchData["functionID"] || 0;
    inputParam.AssigntoId = this.state.ticketSearchData["AssigntoId"] || 0;
    if (this.state.ticketSearchData["CreatedOnFrom"]) {
      var start = new Date(this.state.ticketSearchData["CreatedOnFrom"]);
      inputParam.CreatedOnFrom =
        moment(start)
          .format("YYYY-MM-DD")
          .toString() || "";
    } else {
      inputParam.CreatedOnFrom = null;
    }
    if (this.state.ticketSearchData["CreatedOnTo"]) {
      var end = new Date(this.state.ticketSearchData["CreatedOnTo"]);
      inputParam.CreatedOnTo =
        moment(end)
          .format("YYYY-MM-DD")
          .toString() || "";
    } else {
      inputParam.CreatedOnTo = null;
    }

    inputParam.Priority = this.state.ticketSearchData["Priority"] || 0;
    inputParam.createdID = 0;
    inputParam.claimID = this.state.ticketSearchData["claimID"] || 0;
    inputParam.ticketID = this.state.ticketSearchData["ticketID"] || 0;
    inputParam.taskwithClaim =
      this.state.ticketSearchData["taskwithClaim"] || "";
    inputParam.taskwithTicket =
      this.state.ticketSearchData["taskwithTicket"] || "";
    this.setState({ isViewSerach: true });
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetTaskbyTicketData",
      headers: authHeader(),
      data: inputParam,
    })
      .then(function(response) {
        var message = response.data.message;
        var taskByTicketData = response.data.responseData;
        if (message === "Success" && taskByTicketData) {
          self.setState({ taskByTicketData, isViewSerach: false });
        } else {
          self.setState({ taskByTicketData, isViewSerach: false });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetTaskbyTicketData");
      });
  }
  sortStatusZtoA() {
    var itemsArray = [];

    if (this.state.tabIndex === 1) {
      itemsArray = this.state.raisedByMeData;
    }
    if (this.state.tabIndex === 2) {
      itemsArray = this.state.assignToMeData;
    }
    if (this.state.tabIndex === 3) {
      itemsArray = this.state.taskByTicketData;
    }
    if (this.state.sortColumn === "storeName") {
      itemsArray.sort((a, b) => {
        if (a.storeName < b.storeName) return 1;
        if (a.storeName > b.storeName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "departmentName") {
      itemsArray.sort((a, b) => {
        if (a.departmentName < b.departmentName) return 1;
        if (a.departmentName > b.departmentName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "priorityName") {
      itemsArray.sort((a, b) => {
        if (a.priorityName < b.priorityName) return 1;
        if (a.priorityName > b.priorityName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "creationOn") {
      itemsArray.sort((a, b) => {
        if (a.creationOn < b.creationOn) return 1;
        if (a.creationOn > b.creationOn) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "assignto") {
      itemsArray.sort((a, b) => {
        if (a.assignto < b.assignto) return 1;
        if (a.assignto > b.assignto) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "createdBy") {
      itemsArray.sort((a, b) => {
        if (a.createdBy < b.createdBy) return 1;
        if (a.createdBy > b.createdBy) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "taskStatus") {
      itemsArray.sort((a, b) => {
        if (a.taskStatus < b.taskStatus) return 1;
        if (a.taskStatus > b.taskStatus) return -1;
        return 0;
      });
    }
    this.setState({
      isortA: true,
      isATOZ: false,
      itemData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    var itemsArray = [];

    if (this.state.tabIndex === 1) {
      itemsArray = this.state.raisedByMeData;
    }
    if (this.state.tabIndex === 2) {
      itemsArray = this.state.assignToMeData;
    }
    if (this.state.tabIndex === 3) {
      itemsArray = this.state.taskByTicketData;
    }

    if (this.state.sortColumn === "storeName") {
      itemsArray.sort((a, b) => {
        if (a.storeName < b.storeName) return -1;
        if (a.storeName > b.storeName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "departmentName") {
      itemsArray.sort((a, b) => {
        if (a.departmentName < b.departmentName) return -1;
        if (a.departmentName > b.departmentName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "priorityName") {
      itemsArray.sort((a, b) => {
        if (a.priorityName < b.priorityName) return -1;
        if (a.priorityName > b.priorityName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "creationOn") {
      itemsArray.sort((a, b) => {
        if (a.creationOn < b.creationOn) return -1;
        if (a.creationOn > b.creationOn) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "assignto") {
      itemsArray.sort((a, b) => {
        if (a.assignto < b.assignto) return -1;
        if (a.assignto > b.assignto) return 1;
        return 0;
      });
    }

    if (this.state.sortColumn === "createdBy") {
      itemsArray.sort((a, b) => {
        if (a.createdBy < b.createdBy) return -1;
        if (a.createdBy > b.createdBy) return 1;
        return 0;
      });
    }

    if (this.state.sortColumn === "taskStatus") {
      itemsArray.sort((a, b) => {
        if (a.taskStatus < b.taskStatus) return -1;
        if (a.taskStatus > b.taskStatus) return 1;
        return 0;
      });
    }
    this.setState({
      isortA: true,
      isATOZ: true,
      itemData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  StatusOpenModel(data, header) {
    if (
      this.state.sortFilterdepartmentName.length === 0 ||
      this.state.sortFilterstoreName.length === 0 ||
      this.state.sortFiltercreationOn.length === 0
    ) {
      return false;
    }
    this.setState({ isortA: false });
    if (data === "storeName") {
      if (
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.spriorityNameFilterCheckbox !== "" ||
        this.state.screationOnFilterCheckbox !== "" ||
        this.state.sassigntoFilterCheckbox !== "" ||
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.staskStatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sdepartmentNameFilterCheckbox: "",
          spriorityNameFilterCheckbox: "",
          screationOnFilterCheckbox: "",
          sassigntoFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          staskStatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "departmentName") {
      if (
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.spriorityNameFilterCheckbox !== "" ||
        this.state.screationOnFilterCheckbox !== "" ||
        this.state.sassigntoFilterCheckbox !== "" ||
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.staskStatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreNameFilterCheckbox: "",
          spriorityNameFilterCheckbox: "",
          screationOnFilterCheckbox: "",
          sassigntoFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          staskStatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "priorityName") {
      if (
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.screationOnFilterCheckbox !== "" ||
        this.state.sassigntoFilterCheckbox !== "" ||
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.staskStatusFilterCheckbox !== "" ||
        this.state.staskStatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          screationOnFilterCheckbox: "",
          sassigntoFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          staskStatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "creationOn") {
      if (
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.spriorityNameFilterCheckbox !== "" ||
        this.state.sassigntoFilterCheckbox !== "" ||
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.staskStatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          spriorityNameFilterCheckbox: "",
          sassigntoFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          staskStatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "assignto") {
      if (
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.spriorityNameFilterCheckbox !== "" ||
        this.state.screationOnFilterCheckbox !== "" ||
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.staskStatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          spriorityNameFilterCheckbox: "",
          screationOnFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          staskStatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "createdBy") {
      if (
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.spriorityNameFilterCheckbox !== "" ||
        this.state.screationOnFilterCheckbox !== "" ||
        this.state.sassigntoFilterCheckbox !== "" ||
        this.state.staskStatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          spriorityNameFilterCheckbox: "",
          screationOnFilterCheckbox: "",
          sassigntoFilterCheckbox: "",
          staskStatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }

    if (data === "taskStatus") {
      if (
        this.state.sstoreNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.spriorityNameFilterCheckbox !== "" ||
        this.state.screationOnFilterCheckbox !== "" ||
        this.state.sassigntoFilterCheckbox !== "" ||
        this.state.screatedByFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sstoreNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          spriorityNameFilterCheckbox: "",
          screationOnFilterCheckbox: "",
          sassigntoFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }
  StatusCloseModel() {
    this.setState({
      sortFilterdepartmentName: this.state.sortdepartmentName,
      sortFilterstoreName: this.state.sortstoreName,
      sortFilterpriorityName: this.state.sortpriorityName,
      sortFiltercreationOn: this.state.sortcreationOn,
      sortFilterassignto: this.state.sortassignto,
      sortFiltercreatedBy: this.state.sortcreatedBy,
      sortFiltertaskStatus: this.state.sorttaskStatus,
    });
    if (this.state.tempitemData.length > 0) {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
      });
      if (this.state.tabIndex === 1) {
        this.setState({ raisedByMeData: this.state.tempitemData });
      }
      if (this.state.tabIndex === 2) {
        this.setState({ assignToMeData: this.state.tempitemData });
      }
      if (this.state.tabIndex === 3) {
        this.setState({ taskByTicketData: this.state.tempitemData });
      }

      if (this.state.sortColumn === "storeName") {
        if (this.state.sstoreNameFilterCheckbox === "") {
        } else {
          this.setState({
            sdepartmentNameFilterCheckbox: "",
            spriorityNameFilterCheckbox: "",
            screationOnFilterCheckbox: "",
            sassigntoFilterCheckbox: "",
            screatedByFilterCheckbox: "",
            staskStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "departmentName") {
        if (this.state.sdepartmentNameFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            spriorityNameFilterCheckbox: "",
            screationOnFilterCheckbox: "",
            sassigntoFilterCheckbox: "",
            screatedByFilterCheckbox: "",
            staskStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "priorityName") {
        if (this.state.spriorityNameFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            screationOnFilterCheckbox: "",
            sassigntoFilterCheckbox: "",
            screatedByFilterCheckbox: "",
            staskStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "creationOn") {
        if (this.state.screationOnFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            spriorityNameFilterCheckbox: "",
            sassigntoFilterCheckbox: "",
            screatedByFilterCheckbox: "",
            staskStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "assignto") {
        if (this.state.sassigntoFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            spriorityNameFilterCheckbox: "",
            screationOnFilterCheckbox: "",
            screatedByFilterCheckbox: "",
            staskStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "createdBy") {
        if (this.state.screatedByFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            spriorityNameFilterCheckbox: "",
            screationOnFilterCheckbox: "",
            sassigntoFilterCheckbox: "",
            staskStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "taskStatus") {
        if (this.state.staskStatusFilterCheckbox === "") {
        } else {
          this.setState({
            sstoreNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            spriorityNameFilterCheckbox: "",
            screationOnFilterCheckbox: "",
            sassigntoFilterCheckbox: "",
            screatedByFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
        sortHeader: this.state.isortA ? this.state.sortHeader : "",
      });

      if (this.state.tabIndex === 1) {
        this.setState({
          raisedByMeData: this.state.isortA
            ? this.state.itemData
            : this.state.sortAllData,
        });
      }
      if (this.state.tabIndex === 2) {
        this.setState({
          assignToMeData: this.state.isortA
            ? this.state.itemData
            : this.state.sortAllData,
        });
      }
      if (this.state.tabIndex === 3) {
        this.setState({
          taskByTicketData: this.state.isortA
            ? this.state.itemData
            : this.state.sortAllData,
        });
      }
    }
  }
  setSortCheckStatus = (column, type, e) => {
    var itemsArray = [];

    var sdepartmentNameFilterCheckbox = this.state
      .sdepartmentNameFilterCheckbox;
    var sstoreNameFilterCheckbox = this.state.sstoreNameFilterCheckbox;
    var spriorityNameFilterCheckbox = this.state.spriorityNameFilterCheckbox;
    var screationOnFilterCheckbox = this.state.screationOnFilterCheckbox;
    var sassigntoFilterCheckbox = this.state.sassigntoFilterCheckbox;
    var screatedByFilterCheckbox = this.state.screatedByFilterCheckbox;
    var staskStatusFilterCheckbox = this.state.staskStatusFilterCheckbox;

    if (column === "storeName" || column === "all") {
      if (type === "value" && type !== "All") {
        sstoreNameFilterCheckbox = sstoreNameFilterCheckbox.replace("all", "");
        sstoreNameFilterCheckbox = sstoreNameFilterCheckbox.replace("all,", "");
        if (
          sstoreNameFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sstoreNameFilterCheckbox = sstoreNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sstoreNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sstoreNameFilterCheckbox.includes("all")) {
          sstoreNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "storeName") {
            for (let i = 0; i < this.state.sortstoreName.length; i++) {
              sstoreNameFilterCheckbox +=
                this.state.sortstoreName[i].storeName + ",";
            }
            sstoreNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "departmentName" || column === "all") {
      if (type === "value" && type !== "All") {
        sdepartmentNameFilterCheckbox = sdepartmentNameFilterCheckbox.replace(
          "all",
          ""
        );
        sdepartmentNameFilterCheckbox = sdepartmentNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          sdepartmentNameFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sdepartmentNameFilterCheckbox = sdepartmentNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sdepartmentNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sdepartmentNameFilterCheckbox.includes("all")) {
          sdepartmentNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "departmentName") {
            for (let i = 0; i < this.state.sortdepartmentName.length; i++) {
              sdepartmentNameFilterCheckbox +=
                this.state.sortdepartmentName[i].departmentName + ",";
            }
            sdepartmentNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "priorityName" || column === "all") {
      if (type === "value" && type !== "All") {
        spriorityNameFilterCheckbox = spriorityNameFilterCheckbox.replace(
          "all",
          ""
        );
        spriorityNameFilterCheckbox = spriorityNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          spriorityNameFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          spriorityNameFilterCheckbox = spriorityNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          spriorityNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (spriorityNameFilterCheckbox.includes("all")) {
          spriorityNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "priorityName") {
            for (let i = 0; i < this.state.sortpriorityName.length; i++) {
              spriorityNameFilterCheckbox +=
                this.state.sortpriorityName[i].priorityName + ",";
            }
            spriorityNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "creationOn" || column === "all") {
      if (type === "value" && type !== "All") {
        screationOnFilterCheckbox = screationOnFilterCheckbox.replace(
          "all",
          ""
        );
        screationOnFilterCheckbox = screationOnFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          screationOnFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          screationOnFilterCheckbox = screationOnFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          screationOnFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (screationOnFilterCheckbox.includes("all")) {
          screationOnFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "creationOn") {
            for (let i = 0; i < this.state.sortcreationOn.length; i++) {
              screationOnFilterCheckbox +=
                this.state.sortcreationOn[i].creationOn + ",";
            }
            screationOnFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "assignto" || column === "all") {
      if (type === "value" && type !== "All") {
        sassigntoFilterCheckbox = sassigntoFilterCheckbox.replace("all", "");
        sassigntoFilterCheckbox = sassigntoFilterCheckbox.replace("all,", "");
        if (
          sassigntoFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sassigntoFilterCheckbox = sassigntoFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sassigntoFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sassigntoFilterCheckbox.includes("all")) {
          sassigntoFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "assignto") {
            for (let i = 0; i < this.state.sortassignto.length; i++) {
              sassigntoFilterCheckbox +=
                this.state.sortassignto[i].assignto + ",";
            }
            sassigntoFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "createdBy" || column === "all") {
      if (type === "value" && type !== "All") {
        screatedByFilterCheckbox = screatedByFilterCheckbox.replace("all", "");
        screatedByFilterCheckbox = screatedByFilterCheckbox.replace("all,", "");
        if (
          screatedByFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          screatedByFilterCheckbox = screatedByFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          screatedByFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (screatedByFilterCheckbox.includes("all")) {
          screatedByFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "createdBy") {
            for (let i = 0; i < this.state.sortcreatedBy.length; i++) {
              screatedByFilterCheckbox +=
                this.state.sortcreatedBy[i].createdBy + ",";
            }
            screatedByFilterCheckbox += "all";
          }
        }
      }
    }

    if (column === "taskStatus" || column === "all") {
      if (type === "value" && type !== "All") {
        staskStatusFilterCheckbox = staskStatusFilterCheckbox.replace(
          "all",
          ""
        );
        staskStatusFilterCheckbox = staskStatusFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          staskStatusFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          staskStatusFilterCheckbox = staskStatusFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          staskStatusFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (staskStatusFilterCheckbox.includes("all")) {
          staskStatusFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "taskStatus") {
            for (let i = 0; i < this.state.sorttaskStatus.length; i++) {
              staskStatusFilterCheckbox +=
                this.state.sorttaskStatus[i].taskStatus + ",";
            }
            staskStatusFilterCheckbox += "all";
          }
        }
      }
    }
    var allData = this.state.sortAllData;

    this.setState({
      sdepartmentNameFilterCheckbox,
      sstoreNameFilterCheckbox,
      spriorityNameFilterCheckbox,
      screationOnFilterCheckbox,
      sassigntoFilterCheckbox,
      screatedByFilterCheckbox,
      staskStatusFilterCheckbox,
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "storeName") {
      var sItems = sstoreNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.storeName === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      // this.setState({
      //   brandcodeColor: "sort-column",
      // });
    } else if (column === "departmentName") {
      var sItems = sdepartmentNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.departmentName === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      // this.setState({
      //   brandnameColor: "sort-column",
      // });
    } else if (column === "priorityName") {
      var sItems = spriorityNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.priorityName === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      // this.setState({
      //   addedColor: "sort-column",
      // });
    } else if (column === "creationOn") {
      var sItems = screationOnFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.creationOn === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      // this.setState({
      //   statusColor: "sort-column",
      // });
    } else if (column === "assignto") {
      var sItems = sassigntoFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.assignto === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "createdBy") {
      var sItems = screatedByFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.createdBy === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    } else if (column === "taskStatus") {
      var sItems = staskStatusFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.taskStatus === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
    }

    this.setState({
      isATOZ: true,
      tempitemData: itemsArray,
    });
  };
  filteTextChange(e) {
    this.setState({ filterTxtValue: e.target.value });

    if (this.state.sortColumn === "storeName") {
      var sortFilterstoreName = matchSorter(
        this.state.sortstoreName,
        e.target.value,
        { keys: ["storeName"] }
      );
      if (sortFilterstoreName.length > 0) {
        this.setState({ sortFilterstoreName });
      } else {
        this.setState({
          sortFilterstoreName: [],
        });
      }
    }
    if (this.state.sortColumn === "departmentName") {
      var sortFilterdepartmentName = matchSorter(
        this.state.sortdepartmentName,
        e.target.value,
        { keys: ["departmentName"] }
      );
      if (sortFilterdepartmentName.length > 0) {
        this.setState({ sortFilterdepartmentName });
      } else {
        this.setState({
          sortFilterdepartmentName: [],
        });
      }
    }
    if (this.state.sortColumn === "priorityName") {
      var sortFilterpriorityName = matchSorter(
        this.state.sortpriorityName,
        e.target.value,
        {
          keys: ["priorityName"],
        }
      );
      if (sortFilterpriorityName.length > 0) {
        this.setState({ sortFilterpriorityName });
      } else {
        this.setState({
          sortFilterpriorityName: [],
        });
      }
    }
    if (this.state.sortColumn === "creationOn") {
      var sortFiltercreationOn = matchSorter(
        this.state.sortcreationOn,
        e.target.value,
        {
          keys: ["creationOn"],
        }
      );
      if (sortFiltercreationOn.length > 0) {
        this.setState({ sortFiltercreationOn });
      } else {
        this.setState({
          sortFiltercreationOn: [],
        });
      }
    }
    if (this.state.sortColumn === "assignto") {
      var sortFilterassignto = matchSorter(
        this.state.sortassignto,
        e.target.value,
        {
          keys: ["assignto"],
        }
      );
      if (sortFilterassignto.length > 0) {
        this.setState({ sortFilterassignto });
      } else {
        this.setState({
          sortFilterassignto: [],
        });
      }
    }
    if (this.state.sortColumn === "createdBy") {
      var sortFiltercreatedBy = matchSorter(
        this.state.sortcreatedBy,
        e.target.value,
        {
          keys: ["createdBy"],
        }
      );
      if (sortFiltercreatedBy.length > 0) {
        this.setState({
          sortFiltercreatedBy,
        });
      } else {
        this.setState({
          sortFiltercreatedBy: [],
        });
      }
    }
    if (this.state.sortColumn === "taskStatus") {
      var sortFiltertaskStatus = matchSorter(
        this.state.sorttaskStatus,
        e.target.value,
        {
          keys: ["taskStatus"],
        }
      );
      if (sortFiltertaskStatus.length > 0) {
        this.setState({
          sortFiltertaskStatus,
        });
      } else {
        this.setState({
          sortFiltertaskStatus: [],
        });
      }
    }
  }
  ////handle collapse search
  handleFilterCollapse() {
    this.setState((state) => ({ FilterCollapse: !state.FilterCollapse }));
  }
  handleOnChange(e) {
    const { name, value } = e.target;
    if (this.state.tabIndex === 1) {
      this.state.raiseSearchData[name] = value;
      this.setState({ raiseSearchData: this.state.raiseSearchData });
      if (name === "functionID") {
        this.state.raiseSearchData["AssigntoId"] = "";
        this.setState({
          raiseSearchData: this.state.raiseSearchData,
          assignToData: [],
        });
        this.handleGetAssignTobyFuncationId();
      }
      if (name === "Department") {
        this.state.raiseSearchData["functionID"] = "";
        this.state.raiseSearchData["AssigntoId"] = "";
        this.setState({
          raiseSearchData: this.state.raiseSearchData,
          funcationData: [],
          assignToData: [],
        });
        this.handleGetFuncationByDepartmentId();
      }
    }
    if (this.state.tabIndex === 2) {
      this.state.assignSearchData[name] = value;
      this.setState({ assignSearchData: this.state.assignSearchData });
      if (name === "Department") {
        this.handleGetFuncationByDepartmentId();
      }
    }
    if (this.state.tabIndex === 3) {
      this.state.ticketSearchData[name] = value;
      this.setState({ ticketSearchData: this.state.ticketSearchData });
      if (name === "functionID") {
        this.state.ticketSearchData["AssigntoId"] = "";
        this.setState({
          ticketSearchData: this.state.ticketSearchData,
          assignToData: [],
        });
        this.handleGetAssignTobyFuncationId();
      }
      if (name === "Department") {
        this.state.ticketSearchData["functionID"] = "";
        this.state.ticketSearchData["AssigntoId"] = "";
        this.setState({
          ticketSearchData: this.state.ticketSearchData,
          funcationData: [],
          assignToData: [],
        });
        this.handleGetFuncationByDepartmentId();
      }
    }
  }
  SearchCreationOn = async (startDate) => {
    if (this.state.tabIndex === 1) {
      this.state.raiseSearchData["CreatedOnFrom"] = startDate[0];
      this.state.raiseSearchData["CreatedOnTo"] = startDate[1];
      this.setState({ raiseSearchData: this.state.raiseSearchData });
    }
    if (this.state.tabIndex === 2) {
      this.state.assignSearchData["CreatedOnFrom"] = startDate[0];
      this.state.assignSearchData["CreatedOnTo"] = startDate[1];
      this.setState({ assignSearchData: this.state.assignSearchData });
    }
    if (this.state.tabIndex === 3) {
      this.state.ticketSearchData["CreatedOnFrom"] = startDate[0];
      this.state.ticketSearchData["CreatedOnTo"] = startDate[1];
      this.setState({ ticketSearchData: this.state.ticketSearchData });
    }
  };

  handleClearSearch() {
    this.setState({
      sdepartmentNameFilterCheckbox: "",
      sstoreNameFilterCheckbox: "",
      spriorityNameFilterCheckbox: "",
      screationOnFilterCheckbox: "",
      sassigntoFilterCheckbox: "",
      screatedByFilterCheckbox: "",
      staskStatusFilterCheckbox: "",
      filterTxtValue: "",
      sortHeader: "",
      sortColumn: "",
      StatusModel: false,
      tempitemData: [],
    });
    if (this.state.tabIndex === 1) {
      this.setState({
        raisedByMeData: this.state.sortAllData,
      });
    }
    if (this.state.tabIndex === 2) {
      this.setState({
        assignToMeData: this.state.sortAllData,
      });
    }
    if (this.state.tabIndex === 3) {
      this.setState({
        taskByTicketData: this.state.sortAllData,
      });
    }
  }

  // handle redirect to add campaign
  handleRedirectToUnAssignCampaign() {
    this.props.history.push({
      pathname: "/store/unassignCampaign",
      state: {
        isUploadCampaign: this.state.isUploadCampaign,
        isEditCampaign: this.state.isEditCampaign,
      },
    });
  }
  handleGetStoreUnAssignedCampaign = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetStoreUnAssignedCampaign",
      params: {
        CampaignID: "",
        StoreCodes: "",
        CampaignUploadDate: "",
      },
      headers: authHeader(),
    })
      .then(function(res) {
        var message = res.data.message;
        var responseData = res.data.responseData;
        if (message === "Success") {
          self.setState({
            totalData: responseData.totalRecords,
          });
        } else {
          self.setState({
            totalData: 0,
          });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };
  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <React.Fragment>
        <div className="store-task-tabs">
          <ul className="nav nav-tabs" role="tablist">
            <li
              className={
                config.isShowTaskTab ? "nav-item" : "nav-item displayNn"
              }
            >
              <a
                className={
                  config.isShowTaskTab || this.state.tabIndex !== 4
                    ? "nav-link active"
                    : "nav-link"
                }
                data-toggle="tab"
                href="#raised-by-me-tab"
                role="tab"
                aria-controls="raised-by-me-tab"
                aria-selected="true"
                onClick={this.handleGetTaskData.bind(this, 1)}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.a.raisedbyme
                  : "Raised by Me"}
              </a>
            </li>
            <li
              className={
                config.isShowTaskTab ? "nav-item" : "nav-item displayNn"
              }
            >
              <a
                className="nav-link"
                data-toggle="tab"
                href="#assigned-to-me-tab"
                role="tab"
                aria-controls="assigned-to-me-tab"
                aria-selected="false"
                onClick={this.handleGetTaskData.bind(this, 2)}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.a.assignedtome
                  : "Assigned To Me"}
              </a>
            </li>
            <li
              className={
                config.isShowTaskTab ? "nav-item" : "nav-item displayNn"
              }
            >
              <a
                className="nav-link"
                data-toggle="tab"
                href="#task-by-tickets-tab"
                role="tab"
                aria-controls="task-by-tickets-tab"
                aria-selected="false"
                onClick={this.handleGetTaskbyTicket.bind(this)}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.a.taskbytickets
                  : "Task By Tickets"}
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  config.isShowTaskTab ? "nav-link" : "nav-link active"
                  // : "nav-link active mobileblock"
                }
                data-toggle="tab"
                id="campaign-tab_new"
                href="#campaign-tab"
                role="tab"
                aria-controls="campaign-tab"
                aria-selected="false"
                onClick={this.handleGetTaskData.bind(this, 4)}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.a.campaign
                  : "Campaign"}
              </a>
            </li>
          </ul>
          {this.state.showAddTask && (
            <button
              className="butn"
              onClick={this.handleChagneAddTask.bind(this)}
              // style={{display:"none"}}
            >
              {TranslationContext !== undefined
                ? TranslationContext.button.addtask
                : "Add Task"}
            </button>
          )}
          {this.state.showCampaignBtns && (
            <div>
              {this.state.isUploadCampaign ? (
                <button
                  className="butn task-addCamp"
                  onClick={this.handleRedirectToAddCampaign.bind(this)}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.button.addcampaign
                    : "Add Campaign"}
                </button>
              ) : null}
              {this.state.isEditCampaign ? (
                <button
                  className="butn task-addCamp"
                  onClick={this.handleRedirectToUnAssignCampaign.bind(this)}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.button.unassigncampaign
                    : "Unassigned Campaign ("}
                  {this.state.totalData + " )"}
                </button>
              ) : null}
            </div>
          )}
        </div>
        <div
          className="tab-content store-task-tab-cont"
          style={{ padding: "15px" }}
        >
          <div
            className={
              config.isShowTaskTab
                ? "tab-pane fade show active"
                : "tab-pane fade"
            }
            // className={
            //   !config.isShowTaskTab
            //     ? "tab-pane fade"
            //     : this.state.isDesktop
            //     ? "tab-pane fade show active"
            //     : "tab-pane fade"
            // }
            id="raised-by-me-tab"
            role="tabpanel"
            aria-labelledby="raised-by-me-tab"
          >
            {this.state.isloading === true ? (
              <div className="loader-icon-cntr">
                <div className="loader-icon"></div>
              </div>
            ) : (
              <div className="position-relative">
                <Collapse isOpen={this.state.FilterCollapse}>
                  <Card>
                    <CardBody>
                      <div className="table-expandable-sctn1">
                        <ul className="nav nav-tabs" role="tablist">
                          <div className="tasksearchdiv">
                            <button
                              className="btn-inv"
                              type="button"
                              style={{ margin: "10px", width: "180px" }}
                              onClick={this.handleGetRaisedbymefilterData.bind(
                                this
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.button.viewsearch
                                : "VIEW SEARCH"}
                            </button>
                          </div>
                        </ul>
                        <div className="tab-content p-0">
                          <div
                            className="tab-pane fade show active"
                            id="date-tab"
                            role="tabpanel"
                            aria-labelledby="date-tab"
                          >
                            <div className="container-fluid">
                              <div className="row all-row">
                                <div className="col-md-3">
                                  <input
                                    type="text"
                                    placeholder={
                                      TranslationContext !== undefined
                                        ? TranslationContext.span.taskid
                                        : "Task ID"
                                    }
                                    name="taskid"
                                    value={this.state.raiseSearchData["taskid"]}
                                    onChange={this.handleOnChange.bind(this)}
                                  />
                                </div>
                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="Department"
                                    value={
                                      this.state.raiseSearchData["Department"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value="" selected>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option.department
                                        : "Department"}
                                    </option>

                                    {this.state.departmentData !== null &&
                                      this.state.departmentData.map(
                                        (item, i) => (
                                          <option
                                            key={i}
                                            value={item.departmentID}
                                            className="select-category-placeholder"
                                          >
                                            {item.departmentName}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="functionID"
                                    value={
                                      this.state.raiseSearchData["functionID"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value={""} selected>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option.function
                                        : "Function"}
                                    </option>

                                    {this.state.funcationData !== null &&
                                      this.state.funcationData.map(
                                        (item, i) => (
                                          <option
                                            key={i}
                                            value={item.functionID}
                                            className="select-category-placeholder"
                                          >
                                            {item.funcationName}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="AssigntoId"
                                    value={
                                      this.state.raiseSearchData["AssigntoId"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value="" selected>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option.assignto
                                        : "Assign To"}
                                    </option>
                                    {this.state.assignToData !== null &&
                                      this.state.assignToData.map((item, i) => (
                                        <option
                                          key={i}
                                          value={item.userID}
                                          className="select-category-placeholder"
                                        >
                                          {item.userName}
                                        </option>
                                      ))}
                                  </select>
                                </div>

                                <div className="col-md-3">
                                  <input
                                    type="text"
                                    placeholder={
                                      TranslationContext !== undefined
                                        ? TranslationContext.span.tasktitle
                                        : "Task Title"
                                    }
                                    name="tasktitle"
                                    value={
                                      this.state.raiseSearchData["tasktitle"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  />
                                </div>

                                <div className="col-md-3">
                                  <select
                                    name="taskstatus"
                                    value={
                                      this.state.raiseSearchData["taskstatus"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value={0} selected>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option.taskstatus
                                        : "Task Status"}
                                    </option>
                                    {this.state.storeStatus !== null &&
                                      this.state.storeStatus.map((item, i) => (
                                        <option
                                          key={i}
                                          value={item.storeStatusID}
                                          className="select-category-placeholder"
                                        >
                                          {item.storeStatusName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div className="col-md-3 campaign-end-date creation-date-range">
                                  <CreationOnDatePickerCompo
                                    applyCallback={this.SearchCreationOn}
                                  />
                                </div>

                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="Priority"
                                    value={
                                      this.state.raiseSearchData["Priority"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value={""} selected>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option.taskpriority
                                        : "Task Priority"}
                                    </option>
                                    {this.state.priorityData !== null &&
                                      this.state.priorityData.map((item, i) => (
                                        <option
                                          key={i}
                                          value={item.priorityID}
                                          className="select-category-placeholder"
                                        >
                                          {item.priortyName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                {/* <div className="col-md-3">
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder="Ticket ID"
                                  />
                                </div> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Collapse>
                <div
                  className="float-search"
                  // style={{ top: "18%" }}
                  onClick={this.handleFilterCollapse.bind(this)}
                >
                  <small>
                    {this.state.FilterCollapse
                      ? TranslationContext !== undefined
                        ? TranslationContext.small.search
                        : "Search"
                      : TranslationContext !== undefined
                      ? TranslationContext.small.search
                      : "Search"}
                  </small>
                  <img
                    className="search-icon"
                    src={SearchIcon}
                    alt="search-icon"
                  />
                </div>
                <div className="table-cntr raisereactTable">
                  {this.state.isViewSerach ? (
                    <div className="loader-icon-cntr">
                      <div className="loader-icon"></div>
                    </div>
                  ) : (
                    <ReactTable
                      data={this.state.raisedByMeData}
                      columns={[
                        {
                          Header: (
                            <span>
                              {TranslationContext !== undefined
                                ? TranslationContext.span.id
                                : "ID"}
                            </span>
                          ),
                          accessor: "storeTaskID",
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Status"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "taskStatus",
                                "Status"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.status
                                : "Status"}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ === false &&
                                  this.state.sortHeader === "Status"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "taskStatus",
                          Cell: (row) => {
                            if (row.original.taskStatus === "New") {
                              return (
                                <span className="table-btn table-yellow-btn">
                                  <label>{row.original.taskStatus}</label>
                                </span>
                              );
                            } else if (row.original.taskStatus === "Open") {
                              return (
                                <span className="table-btn table-blue-btn">
                                  <label>{row.original.taskStatus}</label>
                                </span>
                              );
                            } else {
                              return (
                                <span className="table-btn table-green-btn">
                                  <label>{row.original.taskStatus}</label>
                                </span>
                              );
                            }
                          },
                        },
                        {
                          Header: (
                            <span>
                              {TranslationContext !== undefined
                                ? TranslationContext.span.tasktitle
                                : "Task Title"}
                            </span>
                          ),
                          accessor: "taskTitle",
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Department"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "departmentName",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.department
                                  : "Department"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.department
                                : "Department"}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ === false &&
                                  this.state.sortHeader === "Department"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "departmentName",
                          Cell: (row) => {
                            return (
                              <span className="one-liner">
                                {row.original.departmentName}
                                <Popover
                                  content={
                                    <div className="dash-creation-popup-cntr">
                                      <ul className="dash-category-popup dashnewpopup">
                                        <li>
                                          <p>Function</p>
                                          <p>{row.original.functionName}</p>
                                        </li>
                                      </ul>
                                    </div>
                                  }
                                  placement="bottom"
                                >
                                  <img
                                    className="info-icon"
                                    src={InfoIcon}
                                    alt="info-icon"
                                  />
                                </Popover>
                              </span>
                            );
                          },
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Store Name"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "storeName",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.storename
                                  : "Store Name"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.storename
                                : "Store Name"}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ === false &&
                                  this.state.sortHeader === "Store Name"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "storeName",
                          Cell: (row) => {
                            return (
                              <span className="one-liner">
                                <label>{row.original.storeName}</label>
                                <Popover
                                  content={
                                    <div className="dash-creation-popup-cntr">
                                      <ul className="dash-category-popup dashnewpopup">
                                        <li>
                                          <p>Store Address</p>
                                          <p>{row.original.storeAddress}</p>
                                        </li>
                                      </ul>
                                    </div>
                                  }
                                  placement="bottom"
                                >
                                  <img
                                    className="info-icon"
                                    src={InfoIcon}
                                    alt="info-icon"
                                  />
                                </Popover>
                              </span>
                            );
                          },
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Priority"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "priorityName",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.priority
                                  : "Priority"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.priority
                                : "Priority"}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ === false &&
                                  this.state.sortHeader === "Priority"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "priorityName	",
                          Cell: (row) => {
                            return <span>{row.original.priorityName}</span>;
                          },
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Creation On"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "creationOn",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.creationon
                                  : "Creation On"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.creationon
                                : "Creation On"}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ === false &&
                                  this.state.sortHeader === "Creation On"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          accessor: "creationOn",
                          sortable: false,
                          Cell: (row) => (
                            <span className="one-liner">
                              <label>{row.original.creationOn}</label>

                              <Popover
                                content={
                                  <div className="insertpop1">
                                    <ul className="dash-creation-popup">
                                      <li className="title">
                                        Creation details
                                      </li>
                                      <li>
                                        <p>
                                          {"Created by " +
                                            row.original.createdBy}
                                        </p>
                                        <p>{row.original.createdago}</p>
                                      </li>
                                      <li>
                                        <p>
                                          Assigned to
                                          {" " + row.original.assignto}
                                        </p>
                                        <p>{row.original.assignedago}</p>
                                      </li>
                                      <li>
                                        <p>
                                          {"Updated by " +
                                            row.original.updatedBy}
                                        </p>
                                        <p>{row.original.updatedago}</p>
                                      </li>
                                      {/* <li>
                                        <p>Response time remaining by</p>
                                        <p>
                                          {row.original.resolutionTimeRemaining}
                                        </p>
                                      </li> */}
                                      {/* <li>
                                        <p>Response overdue by</p>
                                        <p></p>
                                      </li> */}
                                      <li>
                                        <p>Resolution overdue by</p>
                                        <p>
                                          {row.original.resolutionOverdueBy}
                                        </p>
                                      </li>
                                    </ul>
                                  </div>
                                }
                                placement="left"
                              >
                                <img
                                  className="info-icon"
                                  src={InfoIcon}
                                  alt="info-icon"
                                />
                              </Popover>
                            </span>
                          ),
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Assign to"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "assignto",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.assignedto
                                  : "Assign to"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.assignedto
                                : "Assign to"}

                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ === false &&
                                  this.state.sortHeader === "Assign to"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "assignto",
                          // Cell: (props) => (
                          //   <span>
                          //     <label>A, Bansal</label>
                          //   </span>
                          // ),
                        },
                      ]}
                      // resizable={false}
                      defaultPageSize={10}
                      minRows={2}
                      showPagination={true}
                      getTrProps={this.handleRowClickRaisedTable}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <div
            className="tab-pane fade"
            id="assigned-to-me-tab"
            role="tabpanel"
            aria-labelledby="assigned-to-me-tab"
          >
            {this.state.isloading === true ? (
              <div className="loader-icon-cntr">
                <div className="loader-icon"></div>
              </div>
            ) : (
              <div className="position-relative">
                <Collapse isOpen={this.state.FilterCollapse}>
                  <Card>
                    <CardBody>
                      <div className="table-expandable-sctn1">
                        <ul className="nav nav-tabs" role="tablist">
                          <div className="tasksearchdiv">
                            <button
                              className="btn-inv"
                              type="button"
                              style={{ margin: "10px", width: "180px" }}
                              onClick={this.handleGetAssigenBymefilterData.bind(
                                this
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.button.viewsearch
                                : "VIEW SEARCH"}
                            </button>
                          </div>
                        </ul>
                        <div className="tab-content p-0">
                          <div
                            className="tab-pane fade show active"
                            id="date-tab"
                            role="tabpanel"
                            aria-labelledby="date-tab"
                          >
                            <div className="container-fluid">
                              <div className="row all-row">
                                <div className="col-md-3">
                                  <input
                                    type="text"
                                    placeholder={
                                      TranslationContext !== undefined
                                        ? TranslationContext.span.taskid
                                        : "Task ID"
                                    }
                                    name="taskid"
                                    autoComplete="off"
                                    value={
                                      this.state.assignSearchData["taskid"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  />
                                </div>
                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="Department"
                                    value={
                                      this.state.assignSearchData["Department"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option.department
                                        : "Department"}
                                    </option>
                                    {this.state.departmentData !== null &&
                                      this.state.departmentData.map(
                                        (item, i) => (
                                          <option
                                            key={i}
                                            value={item.departmentID}
                                            className="select-category-placeholder"
                                          >
                                            {item.departmentName}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </div>

                                <div className="col-md-3">
                                  <input
                                    type="text"
                                    placeholder={
                                      TranslationContext !== undefined
                                        ? TranslationContext.option.tasktitle
                                        : "Task Title"
                                    }
                                    name="tasktitle"
                                    value={
                                      this.state.assignSearchData["tasktitle"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  />
                                </div>
                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="functionID"
                                    value={
                                      this.state.assignSearchData["functionID"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option.function
                                        : "Function"}
                                    </option>
                                    {this.state.funcationData !== null &&
                                      this.state.funcationData.map(
                                        (item, i) => (
                                          <option
                                            key={i}
                                            value={item.functionID}
                                            className="select-category-placeholder"
                                          >
                                            {item.funcationName}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select
                                    name="createdID"
                                    value={
                                      this.state.assignSearchData["createdID"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option
                                            .taskcreatedby
                                        : "Task Created By"}
                                    </option>
                                    {this.state.userData !== null &&
                                      this.state.userData.map((item, i) => (
                                        <option
                                          key={i}
                                          value={item.userID}
                                          className="select-category-placeholder"
                                        >
                                          {item.userName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="taskstatus"
                                    value={
                                      this.state.assignSearchData["taskstatus"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option
                                            .taskcreatedby
                                        : "Task Status"}
                                    </option>

                                    {this.state.storeStatus !== null &&
                                      this.state.storeStatus.map((item, i) => (
                                        <option
                                          key={i}
                                          value={item.storeStatusID}
                                          className="select-category-placeholder"
                                        >
                                          {item.storeStatusName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div className="col-md-3 campaign-end-date creation-date-range">
                                  <CreationOnDatePickerCompo
                                    applyCallback={this.SearchCreationOn}
                                  />
                                </div>

                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="Priority"
                                    value={
                                      this.state.assignSearchData["Priority"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option.taskpriority
                                        : "Task Priority"}
                                    </option>
                                    {this.state.priorityData !== null &&
                                      this.state.priorityData.map((item, i) => (
                                        <option
                                          key={i}
                                          value={item.priorityID}
                                          className="select-category-placeholder"
                                        >
                                          {item.priortyName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Collapse>
                <div
                  className="float-search"
                  // style={{ top: "18%" }}
                  onClick={this.handleFilterCollapse.bind(this)}
                >
                  <small>
                    {this.state.FilterCollapse
                      ? TranslationContext !== undefined
                        ? TranslationContext.small.search
                        : "Search"
                      : TranslationContext !== undefined
                      ? TranslationContext.small.search
                      : "Search"}
                  </small>
                  <img
                    className="search-icon"
                    src={SearchIcon}
                    alt="search-icon"
                  />
                </div>
                <div className="table-cntr">
                  {this.state.isViewSerach ? (
                    <div className="loader-icon-cntr">
                      <div className="loader-icon"></div>
                    </div>
                  ) : (
                    <ReactTable
                      data={this.state.assignToMeData}
                      columns={[
                        {
                          Header: (
                            <span>
                              {TranslationContext !== undefined
                                ? TranslationContext.span.id
                                : "ID"}
                            </span>
                          ),
                          accessor: "storeTaskID",
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Status"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "taskStatus",
                                "Status"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.status
                                : "Status"}

                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ === false &&
                                  this.state.sortHeader === "Status"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "taskStatus",
                          Cell: (row) => {
                            if (row.original.taskStatus === "New") {
                              return (
                                <span className="table-btn table-yellow-btn">
                                  <label>{row.original.taskStatus}</label>
                                </span>
                              );
                            } else if (row.original.taskStatus === "Open") {
                              return (
                                <span className="table-btn table-blue-btn">
                                  <label>{row.original.taskStatus}</label>
                                </span>
                              );
                            } else {
                              return (
                                <span className="table-btn table-green-btn">
                                  <label>{row.original.taskStatus}</label>
                                </span>
                              );
                            }
                          },
                        },
                        {
                          Header: (
                            <span>
                              {TranslationContext !== undefined
                                ? TranslationContext.span.tasktitle
                                : "Task Title"}
                            </span>
                          ),
                          accessor: "taskTitle",
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Department"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "departmentName",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.department
                                  : "Department"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.department
                                : "Department"}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ === false &&
                                  this.state.sortHeader === "Department"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "departmentName",
                          Cell: (row) => {
                            return (
                              <span className="one-liner">
                                <label>{row.original.departmentName}</label>
                                <Popover
                                  content={
                                    <div className="dash-creation-popup-cntr">
                                      <ul className="dash-category-popup dashnewpopup">
                                        <li>
                                          <p>Function</p>
                                          <p>{row.original.functionName}</p>
                                        </li>
                                      </ul>
                                    </div>
                                  }
                                  placement="bottom"
                                >
                                  <img
                                    className="info-icon"
                                    src={InfoIcon}
                                    alt="info-icon"
                                  />
                                </Popover>
                              </span>
                            );
                          },
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Created by"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "createdBy",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.createdby
                                  : "Created by"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.createdby
                                : "Created by"}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ === false &&
                                  this.state.sortHeader === "Created by"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "createdBy",
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Priority"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "priorityName",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.priority
                                  : "Priority"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.priority
                                : "Priority"}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ === false &&
                                  this.state.sortHeader === "Priority"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "priorityName",
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Store Name"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "storeName",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.storename
                                  : "Store Name"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.storename
                                : "Store Name"}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ === false &&
                                  this.state.sortHeader === "Store Name"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          accessor: "storeName",
                          Cell: (row) => {
                            return (
                              <span className="one-liner">
                                <label>{row.original.storeName}</label>
                                <Popover
                                  content={
                                    <div className="dash-creation-popup-cntr">
                                      <ul className="dash-category-popup dashnewpopup">
                                        <li>
                                          <p>Store Address</p>
                                          <p>{row.original.storeAddress}</p>
                                        </li>
                                      </ul>
                                    </div>
                                  }
                                  placement="bottom"
                                >
                                  <img
                                    className="info-icon"
                                    src={InfoIcon}
                                    alt="info-icon"
                                  />
                                </Popover>
                              </span>
                            );
                          },
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Creation On"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "creationOn",
                                // "Creation On",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.creationon
                                  : "Creation On"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.creationon
                                : "Creation On"}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ === false &&
                                  this.state.sortHeader === "Creation On"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "creationOn",
                          Cell: (row) => {
                            return (
                              <span className="one-liner">
                                <label>{row.original.creationOn}</label>

                                <Popover
                                  content={
                                    <div className="insertpop1">
                                      <ul className="dash-creation-popup">
                                        <li className="title">
                                          Creation details
                                        </li>
                                        <li>
                                          <p>
                                            {"Created by " +
                                              row.original.createdBy}
                                          </p>
                                          <p>{row.original.createdago}</p>
                                        </li>
                                        <li>
                                          <p>
                                            Assigned to
                                            {" " + row.original.assignto}
                                          </p>
                                          <p>{row.original.assignedago}</p>
                                        </li>
                                        <li>
                                          <p>
                                            {"Updated by " +
                                              row.original.updatedBy}
                                          </p>
                                          <p>{row.original.updatedago}</p>
                                        </li>

                                        {/* <li>
                                          <p>Response time remaining by</p>
                                          <p>
                                            {
                                              row.original
                                                .resolutionTimeRemaining
                                            }
                                          </p>
                                        </li> */}
                                        {/* <li>
                                          <p>Response overdue by</p>
                                          <p></p>
                                        </li> */}
                                        <li>
                                          <p>Resolution overdue by</p>
                                          <p>
                                            {row.original.resolutionOverdueBy}
                                          </p>
                                        </li>
                                      </ul>
                                    </div>
                                  }
                                  placement="left"
                                >
                                  <img
                                    className="info-icon"
                                    src={InfoIcon}
                                    alt="info-icon"
                                  />
                                </Popover>
                              </span>
                            );
                          },
                        },
                      ]}
                      // resizable={false}
                      minRows={2}
                      defaultPageSize={10}
                      showPagination={true}
                      getTrProps={this.handleRowClickRaisedTable}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <div
            className="tab-pane fade"
            id="task-by-tickets-tab"
            role="tabpanel"
            aria-labelledby="task-by-tickets-tab"
          >
            {this.state.isloading === true ? (
              <div className="loader-icon-cntr">
                <div className="loader-icon"></div>
              </div>
            ) : (
              <div className="position-relative">
                <Collapse isOpen={this.state.FilterCollapse}>
                  <Card>
                    <CardBody>
                      <div className="table-expandable-sctn1">
                        <ul className="nav nav-tabs" role="tablist">
                          <div className="tasksearchdiv">
                            <button
                              className="btn-inv"
                              type="button"
                              style={{ margin: "10px", width: "180px" }}
                              onClick={this.handleGetTaskbyTicketData.bind(
                                this
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.button.viewsearch
                                : "VIEW SEARCH"}
                            </button>
                          </div>
                        </ul>
                        <div className="tab-content p-0">
                          <div
                            className="tab-pane fade show active"
                            id="date-tab"
                            role="tabpanel"
                            aria-labelledby="date-tab"
                          >
                            <div className="container-fluid">
                              <div className="row all-row">
                                <div className="col-md-3">
                                  <input
                                    type="text"
                                    placeholder={
                                      TranslationContext !== undefined
                                        ? TranslationContext.span.taskid
                                        : "Task ID"
                                    }
                                    autoComplete="off"
                                    name="taskid"
                                    value={
                                      this.state.ticketSearchData["taskid"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  />
                                </div>
                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="Department"
                                    value={
                                      this.state.ticketSearchData["Department"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value="" selected>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option.department
                                        : "Department"}
                                    </option>
                                    {this.state.departmentData !== null &&
                                      this.state.departmentData.map(
                                        (item, i) => (
                                          <option
                                            key={i}
                                            value={item.departmentID}
                                            className="select-category-placeholder"
                                          >
                                            {item.departmentName}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="functionID"
                                    value={
                                      this.state.ticketSearchData["functionID"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value="" selected>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option.function
                                        : "Function"}
                                    </option>
                                    {this.state.funcationData !== null &&
                                      this.state.funcationData.map(
                                        (item, i) => (
                                          <option
                                            key={i}
                                            value={item.functionID}
                                            className="select-category-placeholder"
                                          >
                                            {item.funcationName}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="AssigntoId"
                                    value={
                                      this.state.ticketSearchData["AssigntoId"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value="" selected>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.span.assignto
                                        : "Assign to"}
                                    </option>
                                    {this.state.assignToData !== null &&
                                      this.state.assignToData.map((item, i) => (
                                        <option
                                          key={i}
                                          value={item.userID}
                                          className="select-category-placeholder"
                                        >
                                          {item.userName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <input
                                    type="text"
                                    placeholder={
                                      TranslationContext !== undefined
                                        ? TranslationContext.option.tasktitle
                                        : "Task Title"
                                    }
                                    name="tasktitle"
                                    value={
                                      this.state.ticketSearchData["tasktitle"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  />
                                </div>

                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="Priority"
                                    value={
                                      this.state.ticketSearchData["Priority"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value="" selected>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option.taskpriority
                                        : "Task Priority"}
                                    </option>
                                    {this.state.priorityData !== null &&
                                      this.state.priorityData.map((item, i) => (
                                        <option
                                          key={i}
                                          value={item.priorityID}
                                          className="select-category-placeholder"
                                        >
                                          {item.priortyName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div className="col-md-3 campaign-end-date creation-date-range">
                                  <CreationOnDatePickerCompo
                                    applyCallback={this.SearchCreationOn}
                                  />
                                </div>

                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="taskstatus"
                                    value={
                                      this.state.ticketSearchData["taskstatus"]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value="" selected>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option.taskstatus
                                        : "Task Status"}
                                    </option>
                                    {this.state.storeStatus !== null &&
                                      this.state.storeStatus.map((item, i) => (
                                        <option
                                          key={i}
                                          value={item.storeStatusID}
                                          className="select-category-placeholder"
                                        >
                                          {item.storeStatusName}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="taskwithClaim"
                                    value={
                                      this.state.ticketSearchData[
                                        "taskwithClaim"
                                      ]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value="">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option
                                            .taskwithclaim
                                        : "Task With Claim"}
                                    </option>
                                    <option value={"Yes"}>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option.yes
                                        : "Yes"}
                                    </option>
                                    <option value={"No"}>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option.no
                                        : "No"}
                                    </option>
                                  </select>
                                </div>

                                <div className="col-md-3">
                                  <select
                                    className="store-create-select"
                                    name="taskwithTicket"
                                    value={
                                      this.state.ticketSearchData[
                                        "taskwithTicket"
                                      ]
                                    }
                                    onChange={this.handleOnChange.bind(this)}
                                  >
                                    <option value="">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option
                                            .taskwithticket
                                        : "Task With Ticket"}
                                    </option>
                                    <option value={"Yes"}>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option.yes
                                        : "Yes"}
                                    </option>
                                    <option value={"No"}>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option.no
                                        : "No"}
                                    </option>
                                  </select>
                                </div>

                                {this.state.ticketSearchData[
                                  "taskwithClaim"
                                ] === "Yes" ? (
                                  <div className="col-md-3">
                                    <input
                                      className="no-bg"
                                      type="text"
                                      placeholder="Claim ID"
                                      autoComplete="off"
                                      name="claimID"
                                      value={
                                        this.state.ticketSearchData["claimID"]
                                      }
                                      onChange={this.handleOnChange.bind(this)}
                                    />
                                  </div>
                                ) : null}
                                {this.state.ticketSearchData[
                                  "taskwithTicket"
                                ] === "Yes" ? (
                                  <div className="col-md-3">
                                    <input
                                      className="no-bg"
                                      type="text"
                                      placeholder="Ticket ID"
                                      name="ticketID"
                                      autoComplete="off"
                                      value={
                                        this.state.ticketSearchData["ticketID"]
                                      }
                                      onChange={this.handleOnChange.bind(this)}
                                    />
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Collapse>
                <div
                  className="float-search"
                  // style={{ top: "18%" }}
                  onClick={this.handleFilterCollapse.bind(this)}
                >
                  <small>
                    {this.state.FilterCollapse
                      ? TranslationContext !== undefined
                        ? TranslationContext.small.search
                        : "Search"
                      : TranslationContext !== undefined
                      ? TranslationContext.small.search
                      : "Search"}
                  </small>
                  <img
                    className="search-icon"
                    src={SearchIcon}
                    alt="search-icon"
                  />
                </div>
                <div className="table-cntr taskByTable">
                  {this.state.isViewSerach ? (
                    <div className="loader-icon-cntr">
                      <div className="loader-icon"></div>
                    </div>
                  ) : (
                    <ReactTable
                      data={this.state.taskByTicketData}
                      columns={[
                        {
                          Header: (
                            <span>
                              {TranslationContext !== undefined
                                ? TranslationContext.span.taskid
                                : "Task ID"}
                            </span>
                          ),
                          accessor: "storeTaskID",
                        },
                        {
                          Header: (
                            <span>
                              {TranslationContext !== undefined
                                ? TranslationContext.span.ticketid
                                : "Ticket ID"}
                            </span>
                          ),
                          accessor: "ticketID",
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Status"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "taskStatus",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.status
                                  : "Status"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.status
                                : "Status"}

                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ === false &&
                                  this.state.sortHeader === "Status"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "taskStatus",
                          Cell: (row) => {
                            if (row.original.taskStatus === "New") {
                              return (
                                <span className="table-btn table-yellow-btn">
                                  <label>{row.original.taskStatus}</label>
                                </span>
                              );
                            } else if (row.original.taskStatus === "Open") {
                              return (
                                <span className="table-btn table-blue-btn">
                                  <label>{row.original.taskStatus}</label>
                                </span>
                              );
                            } else {
                              return (
                                <span className="table-btn table-green-btn">
                                  <label>{row.original.taskStatus}</label>
                                </span>
                              );
                            }
                          },
                        },
                        {
                          Header: (
                            <span>
                              {TranslationContext !== undefined
                                ? TranslationContext.span.tasktitle
                                : "Task Title"}
                            </span>
                          ),
                          accessor: "taskTitle",
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Department"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "departmentName",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.department
                                  : "Department"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.department
                                : "Department"}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ === false &&
                                  this.state.sortHeader === "Department"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "departmentName",
                          Cell: (row) => {
                            return (
                              <span className="one-liner">
                                {row.original.departmentName}
                                <Popover
                                  content={
                                    <div className="dash-creation-popup-cntr">
                                      <ul className="dash-category-popup dashnewpopup">
                                        <li>
                                          <p>Function</p>
                                          <p>{row.original.functionName}</p>
                                        </li>
                                      </ul>
                                    </div>
                                  }
                                  placement="bottom"
                                >
                                  <img
                                    className="info-icon"
                                    src={InfoIcon}
                                    alt="info-icon"
                                  />
                                </Popover>
                              </span>
                            );
                          },
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Created by"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "createdBy",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.createdby
                                  : "Created by"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.createdby
                                : "Created by"}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ === false &&
                                  this.state.sortHeader === "Created by"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "createdBy",
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Priority"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "priorityName",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.priority
                                  : "Priority"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.priority
                                : "Priority"}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ === false &&
                                  this.state.sortHeader === "Priority"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "priorityName",
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Store Name"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "storeName",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.storename
                                  : "Store Name"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.storename
                                : "Store Name"}

                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ === false &&
                                  this.state.sortHeader === "Store Name"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "storeName",
                          Cell: (row) => {
                            return (
                              <span className="one-liner">
                                <label>{row.original.storeName}</label>
                                <Popover
                                  content={
                                    <div className="dash-creation-popup-cntr">
                                      <ul className="dash-category-popup dashnewpopup">
                                        <li>
                                          <p>Store Address</p>
                                          <p>{row.original.storeAddress}</p>
                                        </li>
                                      </ul>
                                    </div>
                                  }
                                  placement="bottom"
                                >
                                  <img
                                    className="info-icon"
                                    src={InfoIcon}
                                    alt="info-icon"
                                  />
                                </Popover>
                              </span>
                            );
                          },
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Creation On"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "creationOn",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.creationon
                                  : "Creation On"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.creationon
                                : "Creation On"}
                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ === false &&
                                  this.state.sortHeader === "Creation On"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "creationOn",
                          Cell: (row) => (
                            <span className="one-liner">
                              <label>{row.original.creationOn}</label>

                              <Popover
                                content={
                                  <div className="insertpop1">
                                    <ul className="dash-creation-popup">
                                      <li className="title">
                                        Creation details
                                      </li>
                                      <li>
                                        <p>
                                          {"Created by " +
                                            row.original.createdBy}
                                        </p>
                                        <p>{row.original.createdago}</p>
                                      </li>
                                      <li>
                                        <p>
                                          Assigned to
                                          {" " + row.original.assignto}
                                        </p>
                                        <p>{row.original.assignedago}</p>
                                      </li>
                                      <li>
                                        <p>
                                          {"Updated by " +
                                            row.original.updatedBy}
                                        </p>
                                        <p>{row.original.updatedago}</p>
                                      </li>
                                      {/* <li>
                                        <p>Resolution time remaining by</p>
                                        <p>
                                          {row.original.resolutionTimeRemaining}
                                        </p>
                                      </li> */}
                                      {/* <li>
                                        <p>Response overdue by</p>
                                        <p></p>
                                      </li> */}
                                      <li>
                                        <p>Resolution overdue by</p>
                                        <p>
                                          {row.original.resolutionOverdueBy}
                                        </p>
                                      </li>
                                    </ul>
                                  </div>
                                }
                                placement="left"
                              >
                                <img
                                  className="info-icon"
                                  src={InfoIcon}
                                  alt="info-icon"
                                />
                              </Popover>
                            </span>
                          ),
                        },
                        {
                          Header: (
                            <span
                              className={
                                this.state.sortHeader === "Assign to"
                                  ? "sort-column"
                                  : ""
                              }
                              onClick={this.StatusOpenModel.bind(
                                this,
                                "assignto",
                                TranslationContext !== undefined
                                  ? TranslationContext.span.assignto
                                  : "Assign to"
                              )}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.span.assignto
                                : "Assign to"}

                              <FontAwesomeIcon
                                icon={
                                  this.state.isATOZ === false &&
                                  this.state.sortHeader === "Assign to"
                                    ? faCaretUp
                                    : faCaretDown
                                }
                              />
                            </span>
                          ),
                          sortable: false,
                          accessor: "assignto",
                        },
                      ]}
                      // resizable={false}
                      defaultPageSize={10}
                      showPagination={true}
                      minRows={2}
                      getTrProps={this.HandleRowTaskByClickPage}
                    />
                  )}
                </div>
              </div>
            )}
          </div>
          <div
            className={
              !config.isShowTaskTab
                ? "tab-pane fade"
                : this.state.isDesktop
                ? "tab-pane fade"
                : "tab-pane fade"
            }
            id="campaign-tab"
            role="tabpanel"
            aria-labelledby="campaign-tab"
          >
            <Campaign />
          </div>
        </div>
        <Modal
          onClose={this.StatusCloseModel}
          open={this.state.StatusModel}
          modalId="Status-popup"
          overlayId="logout-ovrly"
        >
          <div className="status-drop-down">
            <div className="sort-sctn">
              <label style={{ color: "#0066cc", fontWeight: "bold" }}>
                {this.state.sortHeader}
              </label>
              <div className="d-flex">
                <a
                  href="#!"
                  onClick={this.sortStatusAtoZ.bind(this)}
                  className="sorting-icon"
                >
                  <img src={Sorting} alt="sorting-icon" />
                </a>
                <p>
                  {TranslationContext !== undefined
                    ? TranslationContext.p.sortatoz
                    : "SORT BY A TO Z"}
                </p>
              </div>
              <div className="d-flex">
                <a
                  href="#!"
                  onClick={this.sortStatusZtoA.bind(this)}
                  className="sorting-icon"
                >
                  <img src={Sorting} alt="sorting-icon" />
                </a>
                <p>
                  {TranslationContext !== undefined
                    ? TranslationContext.p.sortztoa
                    : "SORT BY Z TO A"}
                </p>
              </div>
            </div>
            <a
              style={{
                margin: "0 25px",
                textDecoration: "underline",
                color: "#2561A8",
                cursor: "pointer",
              }}
              href="#!"
              onClick={this.handleClearSearch.bind(this)}
            >
              {TranslationContext !== undefined
                ? TranslationContext.a.clearsearch
                : "clear search"}
            </a>
            <div className="filter-type">
              <p>
                {TranslationContext !== undefined
                  ? TranslationContext.a.filterbytype
                  : "FILTER BY TYPE"}
              </p>
              <input
                type="text"
                style={{ display: "block" }}
                value={this.state.filterTxtValue}
                onChange={this.filteTextChange.bind(this)}
              />
              <div className="FTypeScroll">
                <div className="filter-checkbox">
                  <input
                    type="checkbox"
                    name="filter-type"
                    id={"fil-open"}
                    value="all"
                    checked={
                      this.state.sstoreNameFilterCheckbox.includes("all") ||
                      this.state.sdepartmentNameFilterCheckbox.includes(
                        "all"
                      ) ||
                      this.state.spriorityNameFilterCheckbox.includes("all") ||
                      this.state.screationOnFilterCheckbox.includes("all") ||
                      this.state.sassigntoFilterCheckbox.includes("all") ||
                      this.state.screatedByFilterCheckbox.includes("all")
                    }
                    onChange={this.setSortCheckStatus.bind(this, "all")}
                  />
                  <label htmlFor={"fil-open"}>
                    <span className="table-btn table-blue-btn">ALL</span>
                  </label>
                </div>
                {this.state.sortColumn === "storeName"
                  ? this.state.sortFilterstoreName !== null &&
                    this.state.sortFilterstoreName.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.storeName}
                          value={item.storeName}
                          checked={this.state.sstoreNameFilterCheckbox
                            .split(",")
                            .find((word) => word === item.storeName)}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "storeName",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.storeName}>
                          <span className="table-btn table-blue-btn">
                            {item.storeName}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}

                {this.state.sortColumn === "departmentName"
                  ? this.state.sortFilterdepartmentName !== null &&
                    this.state.sortFilterdepartmentName.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.departmentName}
                          value={item.departmentName}
                          checked={this.state.sdepartmentNameFilterCheckbox
                            .split(",")
                            .find((word) => word === item.departmentName)}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "departmentName",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.departmentName}>
                          <span className="table-btn table-blue-btn">
                            {item.departmentName}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}

                {this.state.sortColumn === "priorityName"
                  ? this.state.sortFilterpriorityName !== null &&
                    this.state.sortFilterpriorityName.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.priorityName}
                          value={item.priorityName}
                          checked={this.state.spriorityNameFilterCheckbox
                            .split(",")
                            .find((word) => word === item.priorityName)}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "priorityName",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.priorityName}>
                          <span className="table-btn table-blue-btn">
                            {item.priorityName}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}

                {this.state.sortColumn === "creationOn"
                  ? this.state.sortFiltercreationOn !== null &&
                    this.state.sortFiltercreationOn.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.creationOn}
                          value={item.creationOn}
                          checked={this.state.screationOnFilterCheckbox
                            .split(",")
                            .find((word) => word === item.creationOn)}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "creationOn",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.creationOn}>
                          <span className="table-btn table-blue-btn">
                            {item.creationOn}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}
                {this.state.sortColumn === "assignto"
                  ? this.state.sortFilterassignto !== null &&
                    this.state.sortFilterassignto.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.assignto}
                          value={item.assignto}
                          checked={this.state.sassigntoFilterCheckbox
                            .split(",")
                            .find((word) => word === item.assignto)}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "assignto",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.assignto}>
                          <span className="table-btn table-blue-btn">
                            {item.assignto}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}
                {this.state.sortColumn === "createdBy"
                  ? this.state.sortFiltercreatedBy !== null &&
                    this.state.sortFiltercreatedBy.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.createdBy}
                          value={item.createdBy}
                          checked={this.state.screatedByFilterCheckbox
                            .split(",")
                            .find((word) => word === item.createdBy)}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "createdBy",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.createdBy}>
                          <span className="table-btn table-blue-btn">
                            {item.createdBy}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}
                {this.state.sortColumn === "taskStatus"
                  ? this.state.sortFiltertaskStatus !== null &&
                    this.state.sortFiltertaskStatus.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.taskStatus}
                          value={item.taskStatus}
                          checked={this.state.staskStatusFilterCheckbox
                            .split(",")
                            .find((word) => word === item.taskStatus)}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "taskStatus",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.taskStatus}>
                          <span className="table-btn table-blue-btn">
                            {item.taskStatus}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}
              </div>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default StoreTask;
