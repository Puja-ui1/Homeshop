import React, { Component, Fragment } from "react";
import Demo from "../../../store/Hashtag";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import DownExcel from "./../../../assets/Images/black-Dld.png";
import Modal from "react-responsive-modal";
import CancelImg from "./../../../assets/Images/Circle-cancel.png";
import DatePicker from "react-datepicker";
import { Popover } from "antd";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import SlaDue from "./../../SlaDue";
import { NotificationManager } from "react-notifications";
import ClaimStatus from "./../../ClaimStatus";
import TaskStatus from "./../../TaskStatus";
import TicketStatus from "./../../TicketStatus";
import moment from "moment";
import Select from "react-select";
import { Checkbox } from "antd";
import ScheduleDateDropDown from "./../../ScheduleDateDropDown";
import SimpleReactValidator from "simple-react-validator";
import Sorting from "./../../../assets/Images/sorting.png";
import matchSorter from "match-sorter";
import * as translationHI from "./../../../translations/hindi";
import * as translationMA from "./../../../translations/marathi";

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AddReportPopup: false,
      NextPopup: false,
      ChatDate: "",
      DefaultPopupName: "",
      tabIndex: 0,
      ReportData: [],
      ReportParams: "",
      brandData: [],
      Schedule_ID: 0,
      TicketCreatedFromDate: "",
      SelectedTicketMultiStatus: "",
      TicketClosedFrom: "",
      TicketClosedTo: "",
      DefaultEmailID: "",
      TicketCreatedEndDate: "",
      TicketCreatedSource: "",
      SelectedSourceIds: "",
      SelectedDefaultTeamMember: "",
      OpenDefaultModal: false,
      OpenDefaultMailModal: false,
      FileURL: "",
      CategoryData: [],
      SubCategoryData: [],
      IssueTypeData: [],
      TicketSourceData: [],
      TicketPriorityData: [],
      AssignToData: [],
      DepartmentData: [],
      totalResultCount: 0,
      ClaimStatusData: ClaimStatus(),
      TaskStatusData: TaskStatus(),
      TicketStatusData: [],
      ReportCreateDate: "",
      ReportLastDate: "",
      selectBrand: 0,
      selectedCategory: 0,
      selectedSubCategory: 0,
      selectedIssueType: 0,
      selectedClaimID: "0",
      selectedTicketSource: 0,
      SlaDueData: SlaDue(),
      selectedInvoiceNo: "",
      selectedEmailID: "",
      selectedTicketID: "",
      selectedMobileNo: "",
      selectedItemID: "",
      selectedPriority: 0,
      selectedVisitStore: "all",
      selectedAssignedTo: 0,
      selectedWantVisitStore: "all",
      selectedDefaultTicketStatus: 0,
      selectedTicketStatus: 0,
      selectedVisitStoreAddress: "",
      selectedPurchaseStore: "",
      selectedTeamMember: [],
      selectedReportName: "",
      selectedSLAStatus: "0",
      selectedWithClaim: "no",
      selectedWithTaskAll: "no",
      selectedClaimStatus: 0,
      selectedClaimCategory: 0,
      selectedClaimSubCategory: 0,
      selectedClaimIssueType: 0,
      selectedTaskStatus: 0,
      selectedTaskPriority: 0,
      selectedDepartment: 0,
      selectedFunction: 0,
      dayIdsArray: [],
      TeamMemberData: [
        {
          department: "Team Member 1",
        },
        {
          department: "Team Member 2",
        },
        {
          department: "Team Member 3",
        },
        {
          department: "Team Member 4",
        },
      ],
      selectedNameOfDayForWeekCommaSeperated: "",
      selectedNameOfMonthForYearCommaSeperated: "",
      selectedNameOfMonthForDailyYearCommaSeperated: "",
      selectedNameOfDayForYearCommaSeperated: "",
      ticketDetailID: 0,
      IsDaily: false,
      IsWeekly: false,
      IsDailyForMonth: false,
      IsDailyForYear: false,
      IsWeeklyForMonth: false,
      IsWeeklyForYear: false,
      selectedNoOfWeek: 0,
      selectedWeeklyDays: "",
      Mon: "",
      Tue: "",
      Wed: "",
      Thu: "",
      Fri: "",
      Sat: "",
      Sun: "",
      selectedNoOfDay: 0,
      selectedNoOfDaysForMonth: 0,
      selectedNoOfMonthForMonth: 0,
      selectedNoOfMonthForWeek: 0,
      selectedNoOfWeekForWeek: 0,
      selectedNoOfDayForDailyYear: 0,
      selectedNoOfWeekForYear: 0,
      selectedNameOfMonthForDailyYear: "",
      selectScheduleDate: "",
      selectedNameOfDayForWeek: [],
      selectedNameOfMonthForYear: [],
      selectedNameOfMonthForDailyYear: [],
      ScheduleOption: ScheduleDateDropDown(),
      NameOfDayForWeek: [
        {
          days: "Sunday",
        },
        {
          days: "Monday",
        },
      ],
      NameOfMonthForYear: [
        {
          month: "September",
        },
        {
          month: "October",
        },
      ],
      NameOfDayForYear: [
        {
          days: "Sunday",
        },
        {
          days: "Monday",
        },
      ],
      NameOfMonthForDailyYear: [
        {
          month: "September",
        },
        {
          month: "October",
        },
      ],
      resultCount: 0,
      loading: false,
      SearchNameCompulsory: "",
      loadingAbove: true,
      CreateDateCompulsion: "",
      LastDateCompulsion: "",
      BrandCompulsion: "",
      CategoryCompulsion: "",
      SubCategoryCompulsion: "",
      IssueTypeCompulsion: "",
      ClaimIDCompulsion: "",
      TicketSourceCompulsion: "",
      InvoiceNoCompulsion: "",
      EmailIDCompulsion: "",
      TicketIDCompulsion: "",
      MobileNoCompulsion: "",
      ItemIDCompulsion: "",
      PriorityCompulsion: "",
      VisitStoreCompulsion: "",
      AssignedToCompulsion: "",
      WantVisitStoreCompulsion: "",
      TicketStatusCompulsion: "",
      VisitStoreAddressCompulsion: "",
      PurchaseStoreCompulsion: "",
      ClaimStatusCompulsion: "",
      ClaimCategoryCompulsion: "",
      ClaimSubCategoryCompulsion: "",
      ClaimIssueTypeCompulsion: "",
      TaskStatusCompulsion: "",
      TaskPriorityCompulsion: "",
      DepartmentCompulsion: "",
      FunctionCompulsion: "",
      FunctionData: [],
      loadingDownload: false,
      sortAllData: [],
      sortName: [],
      sortSchedule: [],
      sortCreatedBy: [],
      sortStatus: [],
      sortColumn: "",
      sortHeader: "",
      StatusModel: false,
      nameColor: "",
      scheduleColor: "",
      createdColor: "",
      statusColor: "",
      tempReportData: [],
      sFilterCheckbox: "",
      filterTxtValue: "",
      sortFilterName: [],
      sortFilterSchedule: [],
      sortFilterCreatedBy: [],
      sortFilterStatus: [],
      sreportNameFilterCheckbox: "",
      sscheduleStatusFilterCheckbox: "",
      screatedByFilterCheckbox: "",
      sreportStatusFilterCheckbox: "",
      isortA: false,
      translateLanguage: {},
      calendarEndDate: new Date(),
      advanceSearchedModulesItems: [],
      isLastDayReport: false,
    };

    this.handleAddReportOpen = this.handleAddReportOpen.bind(this);
    this.handleAddReportClose = this.handleAddReportClose.bind(this);
    this.handleNextPopupOpen = this.handleNextPopupOpen.bind(this);
    this.handleNextPopupClose = this.handleNextPopupClose.bind(this);
    this.handleReportList = this.handleReportList.bind(this);
    this.handleDeleteReport = this.handleDeleteReport.bind(this);
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    this.handleGetCategoryList = this.handleGetCategoryList.bind(this);
    this.handleGetSubCategoryList = this.handleGetSubCategoryList.bind(this);
    this.handleGetIssueTypeList = this.handleGetIssueTypeList.bind(this);
    this.handleGetTicketSourceList = this.handleGetTicketSourceList.bind(this);
    this.handleGetTicketPriorityList = this.handleGetTicketPriorityList.bind(
      this
    );

    this.handleAssignTo = this.handleAssignTo.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleGetDepartmentList = this.handleGetDepartmentList.bind(this);
    this.handleInsertReport = this.handleInsertReport.bind(this);
    this.handleGetFunctionList = this.handleGetFunctionList.bind(this);
    this.validator = new SimpleReactValidator();
  }
  componentDidMount() {
    this.handleReportList();
    this.handleGetBrandList();
    this.handleGetCategoryList();
    this.handleGetTicketSourceList();
    this.handleGetTicketPriorityList();
    this.handleAssignTo();
    this.handleGetDepartmentList();
    this.handleGetModulesNames();
    this.setState({
      TicketStatusData: TicketStatus()[0]
    })
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  sortStatusZtoA() {
    var itemsArray = [];
    itemsArray = this.state.ReportData;

    if (this.state.sortColumn === "reportName") {
      itemsArray.sort((a, b) => {
        if (a.reportName < b.reportName) return 1;
        if (a.reportName > b.reportName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "scheduleStatus") {
      itemsArray.sort((a, b) => {
        if (a.scheduleStatus < b.scheduleStatus) return 1;
        if (a.scheduleStatus > b.scheduleStatus) return -1;
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
    if (this.state.sortColumn === "reportStatus") {
      itemsArray.sort((a, b) => {
        if (a.reportStatus < b.reportStatus) return 1;
        if (a.reportStatus > b.reportStatus) return -1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      ReportData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    var itemsArray = [];
    itemsArray = this.state.ReportData;

    if (this.state.sortColumn === "reportName") {
      itemsArray.sort((a, b) => {
        if (a.reportName < b.reportName) return -1;
        if (a.reportName > b.reportName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "scheduleStatus") {
      itemsArray.sort((a, b) => {
        if (a.scheduleStatus < b.scheduleStatus) return -1;
        if (a.scheduleStatus > b.scheduleStatus) return 1;
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
    if (this.state.sortColumn === "reportStatus") {
      itemsArray.sort((a, b) => {
        if (a.reportStatus < b.reportStatus) return -1;
        if (a.reportStatus > b.reportStatus) return 1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      ReportData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  StatusOpenModel(data, header) {
    if (
      this.state.sortFilterName.length === 0 ||
      this.state.sortFilterSchedule.length === 0 ||
      this.state.sortFilterCreatedBy.length === 0 ||
      this.state.sortFilterStatus.length === 0
    ) {
      return false;
    }
    if (data === "reportName") {
      if (
        this.state.sscheduleStatusFilterCheckbox !== "" ||
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.sreportStatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sscheduleStatusFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          sreportStatusFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "scheduleStatus") {
      if (
        this.state.sreportNameFilterCheckbox !== "" ||
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.sreportStatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sreportNameFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          sreportStatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "createdBy") {
      if (
        this.state.sreportNameFilterCheckbox !== "" ||
        this.state.sscheduleStatusFilterCheckbox !== "" ||
        this.state.sreportStatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sreportNameFilterCheckbox: "",
          sscheduleStatusFilterCheckbox: "",
          sreportStatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "reportStatus") {
      if (
        this.state.sreportNameFilterCheckbox !== "" ||
        this.state.sscheduleStatusFilterCheckbox !== "" ||
        this.state.screatedByFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sreportNameFilterCheckbox: "",
          sscheduleStatusFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }
  StatusCloseModel = (e) => {
    if (this.state.tempReportData.length > 0) {
      this.setState({
        StatusModel: false,
        ReportData: this.state.tempReportData,
        filterTxtValue: "",
        sortFilterName: this.state.sortFilterName,
        sortFilterSchedule: this.state.sortSchedule,
        sortFilterCreatedBy: this.state.sortCreatedBy,
        sortFilterStatus: this.state.sortStatus,
      });
      if (this.state.sortColumn === "reportName") {
        if (this.state.sreportNameFilterCheckbox === "") {
        } else {
          this.setState({
            sscheduleStatusFilterCheckbox: "",
            screatedByFilterCheckbox: "",
            sreportStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "scheduleStatus") {
        if (this.state.sscheduleStatusFilterCheckbox === "") {
        } else {
          this.setState({
            sreportNameFilterCheckbox: "",
            screatedByFilterCheckbox: "",
            sreportStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "createdBy") {
        if (this.state.screatedByFilterCheckbox === "") {
        } else {
          this.setState({
            sreportNameFilterCheckbox: "",
            sscheduleStatusFilterCheckbox: "",
            sreportStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "reportStatus") {
        if (this.state.sreportStatusFilterCheckbox === "") {
        } else {
          this.setState({
            sreportNameFilterCheckbox: "",
            sscheduleStatusFilterCheckbox: "",
            screatedByFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        ReportData: this.state.isortA
          ? this.state.ReportData
          : this.state.sortAllData,
        filterTxtValue: "",
        sortFilterName: this.state.sortFilterName,
        sortFilterSchedule: this.state.sortSchedule,
        sortFilterCreatedBy: this.state.sortCreatedBy,
        sortFilterStatus: this.state.sortStatus,
      });
    }
  };

  setSortCheckStatus = (column, type, e) => {
    var itemsArray = [];
    var sreportNameFilterCheckbox = this.state.sreportNameFilterCheckbox;
    var sscheduleStatusFilterCheckbox = this.state
      .sscheduleStatusFilterCheckbox;
    var screatedByFilterCheckbox = this.state.screatedByFilterCheckbox;
    var sreportStatusFilterCheckbox = this.state.sreportStatusFilterCheckbox;

    if (column === "reportName" || column === "all") {
      if (type === "value" && type !== "All") {
        sreportNameFilterCheckbox = sreportNameFilterCheckbox.replace(
          "all",
          ""
        );
        sreportNameFilterCheckbox = sreportNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sreportNameFilterCheckbox.includes(e.currentTarget.value)) {
          sreportNameFilterCheckbox = sreportNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sreportNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sreportNameFilterCheckbox.includes("all")) {
          sreportNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "reportName") {
            for (let i = 0; i < this.state.sortName.length; i++) {
              sreportNameFilterCheckbox +=
                this.state.sortName[i].reportName + ",";
            }
            sreportNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "scheduleStatus" || column === "all") {
      if (type === "value" && type !== "All") {
        sscheduleStatusFilterCheckbox = sscheduleStatusFilterCheckbox.replace(
          "all",
          ""
        );
        sscheduleStatusFilterCheckbox = sscheduleStatusFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sscheduleStatusFilterCheckbox.includes(e.currentTarget.value)) {
          sscheduleStatusFilterCheckbox = sscheduleStatusFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sscheduleStatusFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sscheduleStatusFilterCheckbox.includes("all")) {
          sscheduleStatusFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "scheduleStatus") {
            for (let i = 0; i < this.state.sortSchedule.length; i++) {
              sscheduleStatusFilterCheckbox +=
                this.state.sortSchedule[i].scheduleStatus + ",";
            }
            sscheduleStatusFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "createdBy" || column === "all") {
      if (type === "value" && type !== "All") {
        screatedByFilterCheckbox = screatedByFilterCheckbox.replace("all", "");
        screatedByFilterCheckbox = screatedByFilterCheckbox.replace("all,", "");
        if (screatedByFilterCheckbox.includes(e.currentTarget.value)) {
          screatedByFilterCheckbox = screatedByFilterCheckbox.replace(
            e.currentTarget.value + ",",
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
            for (let i = 0; i < this.state.sortCreatedBy.length; i++) {
              screatedByFilterCheckbox +=
                this.state.sortCreatedBy[i].createdBy + ",";
            }
            screatedByFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "reportStatus" || column === "all") {
      if (type === "value" && type !== "All") {
        sreportStatusFilterCheckbox = sreportStatusFilterCheckbox.replace(
          "all",
          ""
        );
        sreportStatusFilterCheckbox = sreportStatusFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sreportStatusFilterCheckbox.includes(e.currentTarget.value)) {
          sreportStatusFilterCheckbox = sreportStatusFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sreportStatusFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sreportStatusFilterCheckbox.includes("all")) {
          sreportStatusFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "reportStatus") {
            for (let i = 0; i < this.state.sortState.length; i++) {
              sreportStatusFilterCheckbox +=
                this.state.sortState[i].reportStatus + ",";
            }
            sreportStatusFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      sreportNameFilterCheckbox,
      sscheduleStatusFilterCheckbox,
      screatedByFilterCheckbox,
      sreportStatusFilterCheckbox,
      nameColor: "",
      scheduleColor: "",
      createdColor: "",
      statusColor: "",
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "reportName") {
      var sItems = sreportNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.reportName === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        nameColor: "sort-column",
      });
    } else if (column === "scheduleStatus") {
      var sItems = sscheduleStatusFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.scheduleStatus === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        scheduleColor: "sort-column",
      });
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
      this.setState({
        createdColor: "sort-column",
      });
    } else if (column === "reportStatus") {
      var sItems = sreportStatusFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.reportStatus === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        statusColor: "sort-column",
      });
    }

    this.setState({
      tempReportData: itemsArray,
    });
  };

  hide(e, id) {
    document.getElementById(
      id
    ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
      "none";
  }
  show(e, id) {
    if (document.getElementById(id))
      document.getElementById(
        id
      ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
        "block";
  }
  ScheduleOpenModel = () => {
    const TranslationContext = this.state.translateLanguage.default;
    if (this.state.selectedReportName == "") {
      NotificationManager.error(
        TranslationContext !== undefined
          ? TranslationContext.alertmessage.pleaseenterreportname
          : "Please enter report name"
      );
    } else {
      if (this.state.selectedTeamMemberCommaSeperated) {
        var tData = this.state.selectedTeamMemberCommaSeperated.split(",");
        var selectedTeamMember = this.state.selectedTeamMember;
        for (let j = 0; j < tData.length; j++) {
          var data = this.state.AssignToData.filter(
            (x) => x.userID == tData[j]
          );
          selectedTeamMember.push(data[0]);
        }
        this.setState({ Schedule: true, selectedTeamMember });
        setTimeout(() => {
          for (let j = 0; j < this.state.dayIdsArray.length - 1; j++) {
            document.getElementById(this.state.dayIdsArray[j]).click();
          }
        }, 100);
      } else {
        this.setState({ Schedule: true, selectedTeamMember: [] });
      }
    }
  };
  ScheduleCloseModel = () => {
    this.setState({ Schedule: false, selectedTeamMember: [] });
  };

  handleAddReportOpen() {
    this.setState({ AddReportPopup: true, tabIndex: 0 });
  }
  AddScheduler = () => {
    this.ClearParams();
    this.setState({ AddReportPopup: true, tabIndex: 0 });
  };
  handleEditReport = (rowData) => {
    let allTab = JSON.parse(rowData.reportSearchParams);
    this.setState({ Schedule_ID: rowData.scheduleID });
    let withClaim = 0;
    let withTask = 0;
    withClaim = allTab["HaveClaim"];
    withTask = allTab["HaveTask"];
    this.state.selectBrand = allTab["BrandID"];
    this.state.selectedIssueType = allTab["IssueType"];
    this.state.selectedTaskPriority = allTab["TaskPriority"];
    this.state.selectedWithClaim = allTab["HaveClaim"] === 0 ? "no" : "yes";
    this.state.selectedWithTaskAll = allTab["HaveTask"] === 0 ? "no" : "yes";
    if (this.state.selectedWithClaim === "yes") {
      withClaim = 1;
    }
    if (this.state.selectedWithTaskAll === "yes") {
      withTask = 1;
    }
    // this.state.ReportCreateDate="04/02/2020";
    //this.state.ReportCreateDate=moment(allTab["CreatedDate"]).format("DD/MM/YYYY");

    // this.state.ReportLastDate=allTab["ModifiedDate"];
    // // --------------------Check null date----------------------------------
    // if (
    //   this.state.ReportCreateDate === null ||
    //   this.state.ReportCreateDate === undefined ||
    //   this.state.ReportCreateDate === ""
    // ) {
    //   allTab["CreatedDate"] = "";
    // } else {
    //   allTab["CreatedDate"] = moment(this.state.ReportCreateDate).format(
    //     "YYYY-MM-DD"
    //   );
    // }
    // // --------------------Check null date----------------------------------
    // if (
    //   this.state.ReportLastDate === null ||
    //   this.state.ReportLastDate === undefined ||
    //   this.state.ReportLastDate === ""
    // ) {
    //   allTab["ModifiedDate"] = "";
    // } else {
    //   allTab["ModifiedDate"] = moment(this.state.ReportLastDate).format(
    //     "YYYY-MM-DD"
    //   );
    // }
    this.state.selectedReportName = rowData.reportName;
    var scheduledIds = rowData.scheduleFor;
    var scheduledIdsArray = scheduledIds.split(",");
    // this.state.AssignToData.filter(x => x.userID == )

    // this.state.selectedTeamMemberCommaSeperated=rowData.scheduleFor;
    this.state.selectBrand = allTab["BrandID"];
    this.state.selectedIssueType = allTab["IssueType"];
    this.state.selectedTaskPriority = allTab["TaskPriority"];
    // this.state.selectedCategory=allTab["CategoryId"];
    this.setState(
      {
        selectedCategory: allTab["CategoryId"],
      },
      () => {
        this.handleGetSubCategoryList();
      }
    );
    //this.handleGetSubCategoryList();
    // this.state.selectedSubCategory=allTab["SubCategoryId"];
    this.setState(
      {
        selectedSubCategory: allTab["SubCategoryId"],
      },
      () => {
        this.handleGetIssueTypeList();
      }
    );
    this.state.selectedIssueType = allTab["IssueTypeId"];
    this.state.selectedTicketSource = allTab["TicketSourceTypeID"];
    this.state.selectedTicketID = allTab["TicketIdORTitle"];
    this.state.selectedPriority = allTab["PriorityId"];
    this.state.selectedTicketStatus = allTab["TicketSatutsID"];
    this.state.selectedSLAStatus = allTab["SLAStatus"];
    this.state.selectedClaimID = allTab["ClaimId"];
    this.state.selectedInvoiceNo = allTab["InvoiceNumberORSubOrderNo"];
    this.state.selectedItemID = allTab["OrderItemId"];
    this.state.selectedVisitStore = allTab["IsVisitStore"];
    this.state.selectedWantVisitStore = allTab["IsWantVistingStore"];
    this.state.selectedEmailID = allTab["CustomerEmailID"];
    this.state.selectedMobileNo = allTab["CustomerMobileNo"];
    this.state.selectedAssignedTo = allTab["AssignTo"];
    this.state.selectedWantVisitStore = allTab["StoreCodeORAddress"];
    this.state.selectedVisitStoreAddress = allTab["WantToStoreCodeORAddress"];

    this.state.selectedClaimStatus = allTab["ClaimStatusId"];
    // this.state.selectedClaimCategory=allTab["ClaimCategoryId"];
    this.setState(
      {
        selectedClaimCategory: allTab["ClaimCategoryId"],
      },
      () => {
        this.handleGetSubCategoryList();
      }
    );
    // this.state.selectedClaimSubCategory=allTab["ClaimSubCategoryId"];
    this.setState(
      {
        selectedClaimSubCategory: allTab["ClaimSubCategoryId"],
      },
      () => {
        this.handleGetIssueTypeList();
      }
    );
    this.state.selectedClaimIssueType = allTab["ClaimIssueTypeId"];

    this.state.selectedTaskStatus = allTab["TaskStatusId"];
    // this.state.selectedDepartment=allTab["TaskDepartment_Id"];
    this.setState(
      {
        selectedDepartment: allTab["TaskDepartment_Id"],
      },
      () => {
        this.handleGetFunctionList();
      }
    );
    this.state.selectedFunction = allTab["TaskFunction_Id"];

    //////////////////Scheduler/////////////////////////
    this.state.IsDaily = rowData.isDaily;
    this.state.selectScheduleDate = rowData.scheduleType;
    this.state.selectedTeamMemberCommaSeperated = rowData.scheduleFor;
    this.state.selectedNoOfDay = rowData.noOfDay;
    var responseTime = rowData.scheduleTime;
    var splittedResponseTime = responseTime.split("T");
    var date = splittedResponseTime[0];
    var splittedDate = date.split("-");
    var time = splittedResponseTime[1];
    var splittedTime = time.split(":");
    var finalTime = new Date(
      splittedDate[0],
      splittedDate[1] - 1,
      splittedDate[2],
      splittedTime[0],
      splittedTime[1],
      splittedTime[2]
    );

    this.state.selectedScheduleTime = finalTime;
    // this.state.selectedScheduleTime=rowData.scheduleTime;
    this.state.selectedNoOfWeek = rowData.noOfWeek;
    this.state.selectedWeeklyDays = rowData.selectedWeeklyDays;
    var dayIds = rowData.dayIds;
    var splittedDayIds = dayIds.split(",");
    this.setState({
      dayIdsArray: splittedDayIds,
    });
    for (let i = 0; i < splittedDayIds.length; i++) {
      var ele = splittedDayIds[i];
      if (ele === "Mon") {
        this.setState({
          Mon: ele,
        });
      } else if (ele === "Tue") {
        this.setState({
          Tue: ele,
        });
      } else if (ele === "Wed") {
        this.setState({
          Wed: ele,
        });
      } else if (ele === "Thu") {
        this.setState({
          Thu: ele,
        });
      } else if (ele === "Fri") {
        this.setState({
          Fri: ele,
        });
      } else if (ele === "Sat") {
        this.setState({
          Sat: ele,
        });
      } else if (ele === "Sun") {
        this.setState({
          Sun: ele,
        });
      }
    }
    this.setState({
      selectedNoOfDaysForMonth: rowData.noOfDaysForMonth,
      selectedNoOfMonthForMonth: rowData.noOfMonthForMonth,
      selectedNoOfMonthForWeek: rowData.noOfMonthForWeek,
      selectedNoOfWeekForWeek: rowData.noOfWeekForWeek,
    });
    var dayForWeek = rowData.nameOfDayForWeek.split(",");
    var selectedNameOfDayForWeek = [];
    for (let j = 0; j < dayForWeek.length; j++) {
      var data = this.state.NameOfDayForWeek.filter(
        (x) => x.days == dayForWeek[j]
      );
      selectedNameOfDayForWeek.push(data[0]);
    }
    this.setState({
      selectedNameOfDayForWeek: selectedNameOfDayForWeek,
    });
    var dayForYear = rowData.nameOfMonthForDailyYear.split(",");
    var selectedNameOfMonthForYear = [];
    for (let j = 0; j < dayForYear.length; j++) {
      var data = this.state.NameOfMonthForYear.filter(
        (x) => x.month == dayForYear[j]
      );
      selectedNameOfMonthForYear.push(data[0]);
    }
    this.setState({
      selectedNameOfMonthForYear: selectedNameOfMonthForYear,
      selectedNoOfDayForDailyYear: rowData.noOfDayForDailyYear,
    });
    var dayForYear = rowData.nameOfDayForYear.split(",");
    var selectedNameOfDayForYear = [];
    for (let j = 0; j < dayForYear.length; j++) {
      var data = this.state.NameOfDayForYear.filter(
        (x) => x.days == dayForYear[j]
      );
      selectedNameOfDayForYear.push(data[0]);
    }
    var monthForDailyYear = rowData.nameOfMonthForYear.split(",");
    var selectedNameOfMonthForDailyYear = [];
    for (let j = 0; j < monthForDailyYear.length; j++) {
      var data = this.state.NameOfMonthForDailyYear.filter(
        (x) => x.month == monthForDailyYear[j]
      );
      selectedNameOfMonthForDailyYear.push(data[0]);
    }
    this.setState({
      selectedNameOfDayForYear: selectedNameOfDayForYear,
      selectedNameOfMonthForDailyYear: selectedNameOfMonthForDailyYear,
      selectedNoOfWeekForYear: rowData.noOfWeekForYear,
    });

    ///////////////////////////////////////////////////
    this.handleAddReportOpen();
  };
  handleAddReportClose() {
    this.setState({ AddReportPopup: false });
  }

  ClearParams() {
    this.state.selectedReportName = "";
    this.state.Schedule_ID = 0;
    this.state.selectBrand = 0;
    this.state.selectedIssueType = 0;
    this.state.selectedTaskPriority = 0;
    this.state.selectedCategory = 0;
    this.state.selectedSubCategory = 0;
    this.state.selectedIssueType = 0;
    this.state.selectedTicketSource = 0;
    this.state.selectedTicketID = "";
    this.state.selectedPriority = 0;
    this.state.selectedTicketStatus = 0;
    this.state.selectedSLAStatus = 0;
    this.state.selectedClaimID = "";
    this.state.selectedInvoiceNo = "";
    this.state.selectedItemID = "";
    this.state.selectedVisitStore = "";
    this.state.selectedWantVisitStore = 0;
    this.state.selectedEmailID = "";
    this.state.selectedMobileNo = "";
    this.state.selectedAssignedTo = 0;
    this.state.selectedWantVisitStore = "";
    this.state.selectedVisitStoreAddress = "";

    this.state.selectedClaimStatus = 0;
    this.state.selectedClaimCategory = 0;
    this.state.selectedClaimSubCategory = 0;
    this.state.selectedClaimIssueType = 0;

    this.state.selectedTaskStatus = 0;
    this.state.selectedDepartment = 0;
    this.state.selectedFunction = 0;
    this.setState({
      ReportCreateDate: "",
      ReportLastDate: "",
      selectedPurchaseStore: "",
      selectedWithClaim: "no",
      selectedWithTaskAll: "no",
      SubCategoryData: [],
      IssueTypeData: [],
      FunctionData: [],
    });
  }
  handleGetFunctionList() {
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/Master/getFunctionNameByDepartmentId",
      headers: authHeader(),
      params: {
        DepartmentId: this.state.selectedDepartment,
      },
    })
      .then(function (res) {
        let FunctionData = res.data.responseData;
        self.setState({ FunctionData: FunctionData });
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleNextPopupOpen() {
    this.handleAddReportClose();
    this.setState({ NextPopup: true });
  }
  handleNextPopupClose() {
    this.setState({ NextPopup: false });
    this.handleReportList();
  }
  handleDefaultPopupClose = () => {
    this.setState({
      OpenDefaultModal: false,
      TicketCreatedFromDate: "",
      TicketCreatedEndDate: "",
      SelectedSourceIds: "",
      selectedDefaultTicketStatus: 0,
      TicketClosedFrom: "",
      TicketClosedTo: "",
      SelectedDefaultTeamMember: "",
      SelectedTicketMultiStatus: "",
    });
  };
  handleDefaultMailPopupClose = () => {
    this.setState({
      OpenDefaultMailModal: false,
      TicketCreatedFromDate: "",
      TicketCreatedEndDate: "",
      SelectedSourceIds: "",
      selectedDefaultTicketStatus: 0,
      TicketClosedFrom: "",
      TicketClosedTo: "",
      SelectedDefaultTeamMember: "",
      SelectedTicketMultiStatus: "",
    });
  };
  handleReportCreateDate(date) {
    this.setState({ ReportCreateDate: date });
  }
  handleTicketCreateDate(date) {
    this.setState({ TicketCreatedFromDate: date });
  }
  handleTicketClosedFrom(date) {
    this.setState({ TicketClosedFrom: date });
  }
  handleTicketClosedTo(date) {
    this.setState({ TicketClosedTo: date });
  }
  handleTicketCreateToDate(date) {
    this.setState({ TicketCreatedEndDate: date });
  }
  handleReportLastDate(date) {
    this.setState({ ReportLastDate: date });
  }
  handleChatDate(date) {
    this.setState({ ChatDate: date });
  }
  setNameOfMonthForDailyYear = (e) => {
    if (e !== null) {
      var selectedNameOfMonthForDailyYearCommaSeperated = Array.prototype.map
        .call(e, (s) => s.month)
        .toString();
    }
    this.setState({
      selectedNameOfMonthForDailyYear: e,
      selectedNameOfMonthForDailyYearCommaSeperated,
    });
  };
  setNameOfDayForYear = (e) => {
    if (e !== null) {
      var selectedNameOfDayForYearCommaSeperated = Array.prototype.map
        .call(e, (s) => s.days)
        .toString();
    }
    this.setState({
      selectedNameOfDayForYear: e,
      selectedNameOfDayForYearCommaSeperated,
    });
  };
  handleWeekForYear = (e) => {
    this.setState({
      selectedNoOfWeekForYear: e.currentTarget.value,
    });
  };
  handleDayForYear = (e) => {
    this.setState({
      selectedNoOfDayForDailyYear: e.currentTarget.value,
    });
  };
  setNameOfMonthForYear = (e) => {
    if (e !== null) {
      var selectedNameOfMonthForYearCommaSeperated = Array.prototype.map
        .call(e, (s) => s.month)
        .toString();
    }
    this.setState({
      selectedNameOfMonthForYear: e,
      selectedNameOfMonthForYearCommaSeperated,
    });
  };
  setNameOfDayForWeek = (e) => {
    if (e !== null) {
      var selectedNameOfDayForWeekCommaSeperated = Array.prototype.map
        .call(e, (s) => s.days)
        .toString();
    }
    this.setState({
      selectedNameOfDayForWeek: e,
      selectedNameOfDayForWeekCommaSeperated,
    });
  };
  handleWeekForWeek = (e) => {
    this.setState({
      selectedNoOfWeekForWeek: e.currentTarget.value,
    });
  };
  handleMonthForWeek = (e) => {
    this.setState({
      selectedNoOfMonthForWeek: e.currentTarget.value,
    });
  };
  handleMonthForMonth = (e) => {
    this.setState({
      selectedNoOfMonthForMonth: e.currentTarget.value,
    });
  };
  handleDaysForMonth = (e) => {
    this.setState({
      selectedNoOfDaysForMonth: e.currentTarget.value,
    });
  };
  handleWeekly = (e) => {
    this.setState({
      selectedNoOfWeek: e.target.value,
    });
    // this.setState({
    //   selectedNoOfWeek: e.currentTarget.value
    // });
  };
  handleDailyDay = (e) => {
    this.setState({
      selectedNoOfDay: e.currentTarget.value,
    });
  };
  handleScheduleTime = (e) => {
    this.setState({
      selectedScheduleTime: e,
    });
  };
  handleChangeTab(index) {
    // this.setState({ NextPopup: true });
    //   this.setState({
    //     tabIndex: index
    //   });

    var allTab = {};
    allTab = this.SetSearchParametr();
    this.setState({ ReportParams: allTab });
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Report/ReportSearch",
      headers: authHeader(),
      data: {
        AssigntoId: this.state.AgentIds,
        BrandId: this.state.BrandIds,
        reportSearch: allTab,
      },
    })
      .then(function (res) {
        let data = res.data.responseData;
        self.setState({ totalResultCount: data });
        self.handleNextPopupOpen();
        //self.handleAddReportClose();
      })
      .catch((data) => {
        console.log(data);
      });
  }
  EditSearchParameter(objEdit) {
    var allTab = {};
    let withClaim = 0;
    let withTask = 0;
    allTab = objEdit;
    this.state.selectBrand = allTab["BrandID"];
    this.state.selectedIssueType = allTab["IssueType"];
    this.state.selectedTaskPriority = allTab["TaskPriority"];
    // if (this.state.selectedWithClaim === "yes") {
    //   withClaim = 1;
    // }
    // if (this.state.selectedWithTaskAll === "yes") {
    //   withTask = 1;
    // }

    // // --------------------Check null date----------------------------------
    // if (
    //   this.state.ReportCreateDate === null ||
    //   this.state.ReportCreateDate === undefined ||
    //   this.state.ReportCreateDate === ""
    // ) {
    //   allTab["CreatedDate"] = "";
    // } else {
    //   allTab["CreatedDate"] = moment(this.state.ReportCreateDate).format(
    //     "YYYY-MM-DD"
    //   );
    // }
    // // --------------------Check null date----------------------------------
    // if (
    //   this.state.ReportLastDate === null ||
    //   this.state.ReportLastDate === undefined ||
    //   this.state.ReportLastDate === ""
    // ) {
    //   allTab["ModifiedDate"] = "";
    // } else {
    //   allTab["ModifiedDate"] = moment(this.state.ReportLastDate).format(
    //     "YYYY-MM-DD"
    //   );
    // }

    allTab["BrandID"] = this.state.selectBrand;
    allTab["IssueType"] = this.state.selectedIssueType;
    allTab["TaskPriority"] = this.state.selectedTaskPriority;
    allTab["CategoryId"] = this.state.selectedCategory;
    allTab["SubCategoryId"] = this.state.selectedSubCategory;
    allTab["IssueTypeId"] = this.state.selectedIssueType;
    allTab["TicketSourceTypeID"] = this.state.selectedTicketSource;
    allTab["TicketIdORTitle"] = this.state.selectedTicketID.trim();
    allTab["PriorityId"] = this.state.selectedPriority;
    allTab["TicketSatutsID"] = this.state.selectedTicketStatus;
    allTab["SLAStatus"] = this.state.selectedSLAStatus == 0 ? "" : this.state.selectedSLAStatus;
    allTab["ClaimId"] = this.state.selectedClaimID;
    allTab["InvoiceNumberORSubOrderNo"] = this.state.selectedInvoiceNo.trim();
    allTab["OrderItemId"] = this.state.selectedItemID.trim() == "" ? 0 : this.state.selectedItemID.trim();
    allTab["IsVisitStore"] = this.state.selectedVisitStore;
    allTab["IsWantVistingStore"] = this.state.selectedWantVisitStore;
    allTab["CustomerEmailID"] = this.state.selectedEmailID.trim();
    allTab["CustomerMobileNo"] = this.state.selectedMobileNo.trim();
    allTab["AssignTo"] = this.state.selectedAssignedTo;
    allTab["StoreCodeORAddress"] = this.state.selectedWantVisitStore.trim();
    allTab[
      "WantToStoreCodeORAddress"
    ] = this.state.selectedVisitStoreAddress.trim();
    allTab["HaveClaim"] = withClaim;
    allTab["ClaimStatusId"] = this.state.selectedClaimStatus;
    allTab["ClaimCategoryId"] = this.state.selectedClaimCategory;
    allTab["ClaimSubCategoryId"] = this.state.selectedClaimSubCategory;
    allTab["ClaimIssueTypeId"] = this.state.selectedClaimIssueType;
    allTab["HaveTask"] = withTask;
    allTab["TaskStatusId"] = this.state.selectedTaskStatus;
    allTab["TaskDepartment_Id"] = this.state.selectedDepartment;
    allTab["TaskFunction_Id"] = this.state.selectedFunction;
  }
  SetSearchParametr() {
    var allTab = {};
    let withClaim = 0;
    let withTask = 0;
    if (this.state.selectedWithClaim === "yes") {
      withClaim = 1;
    }
    if (this.state.selectedWithTaskAll === "yes") {
      withTask = 1;
    }

    // --------------------Check null date----------------------------------
    if (
      this.state.ReportCreateDate === null ||
      this.state.ReportCreateDate === undefined ||
      this.state.ReportCreateDate === ""
    ) {
      allTab["CreatedDate"] = "";
    } else {
      allTab["CreatedDate"] = moment(this.state.ReportCreateDate).format(
        "YYYY-MM-DD"
      );
    }
    // --------------------Check null date----------------------------------
    if (
      this.state.ReportLastDate === null ||
      this.state.ReportLastDate === undefined ||
      this.state.ReportLastDate === ""
    ) {
      allTab["ModifiedDate"] = "";
    } else {
      allTab["ModifiedDate"] = moment(this.state.ReportLastDate).format(
        "YYYY-MM-DD"
      );
    }

    let taskPriorityIds = "";
    let categoryIds = "";
    let subCategoryIds = "";
    let issueTypeIds = "";
    let ticketSourceIds = "";
    let priorityIds = "";
    let ticketStatusIds = "";
    let assignToIds = "";
    let claimStatusIds = "";
    let claimCategoryIds = "";
    let claimSubCategoryIds = "";
    let claimIssueTypeIds = "";
    let taskStatusIds = "";
    let taskDepartmentIds = "";
    let taskFunctionIds = "";
    if (this.state.selectedTaskPriority != null) {
      for (let i = 0; i < this.state.selectedTaskPriority.length; i++) {
        taskPriorityIds += this.state.selectedTaskPriority[i].priorityID + ",";
      }
    }
    if (this.state.selectedCategory != null) {
      for (let i = 0; i < this.state.selectedCategory.length; i++) {
        categoryIds += this.state.selectedCategory[i].categoryID + ",";
      }
    }

    if (this.state.selectedSubCategory != null) {
      for (let i = 0; i < this.state.selectedSubCategory.length; i++) {
        subCategoryIds += this.state.selectedSubCategory[i].subCategoryID + ",";
      }
    }
    if (this.state.selectedIssueType != null) {
      for (let i = 0; i < this.state.selectedIssueType.length; i++) {
        issueTypeIds += this.state.selectedIssueType[i].issueTypeID + ",";
      }
    }

    if (this.state.selectedTicketSource != null) {
      for (let i = 0; i < this.state.selectedTicketSource.length; i++) {
        ticketSourceIds +=
          this.state.selectedTicketSource[i].ticketSourceId + ",";
      }
    }

    if (this.state.selectedPriority != null) {
      for (let i = 0; i < this.state.selectedPriority.length; i++) {
        priorityIds += this.state.selectedPriority[i].priorityID + ",";
      }
    }

    if (this.state.selectedTicketStatus != null) {
      for (let i = 0; i < this.state.selectedTicketStatus.length; i++) {
        ticketStatusIds +=
          this.state.selectedTicketStatus[i].ticketStatusID + ",";
      }
    }

    if (this.state.selectedAssignedTo != null) {
      for (let i = 0; i < this.state.selectedAssignedTo.length; i++) {
        assignToIds += this.state.selectedAssignedTo[i].userID + ",";
      }
    }

    if (this.state.selectedClaimStatus != null) {
      for (let i = 0; i < this.state.selectedClaimStatus.length; i++) {
        claimStatusIds += this.state.selectedClaimStatus[i].claimStatusID + ",";
      }
    }

    if (this.state.selectedClaimCategory != null) {
      for (let i = 0; i < this.state.selectedClaimCategory.length; i++) {
        claimCategoryIds +=
          this.state.selectedClaimCategory[i].categoryID + ",";
      }
    }
    if (this.state.selectedClaimSubCategory != null) {
      for (let i = 0; i < this.state.selectedClaimSubCategory.length; i++) {
        claimSubCategoryIds +=
          this.state.selectedClaimSubCategory[i].subCategoryID + ",";
      }
    }
    if (this.state.selectedClaimIssueType != null) {
      for (let i = 0; i < this.state.selectedClaimIssueType.length; i++) {
        claimIssueTypeIds +=
          this.state.selectedClaimIssueType[i].issueTypeID + ",";
      }
    }

    if (this.state.selectedTaskStatus != null) {
      for (let i = 0; i < this.state.selectedTaskStatus.length; i++) {
        taskStatusIds += this.state.selectedTaskStatus[i].taskStatusID + ",";
      }
    }

    if (this.state.selectedDepartment != null) {
      for (let i = 0; i < this.state.selectedDepartment.length; i++) {
        taskDepartmentIds +=
          this.state.selectedDepartment[i].departmentID + ",";
      }
    }

    if (this.state.selectedFunction != null) {
      for (let i = 0; i < this.state.selectedFunction.length; i++) {
        taskFunctionIds += this.state.selectedFunction[i].functionID + ",";
      }
    }

    allTab["BrandID"] = this.state.selectBrand;
    allTab["IssueType"] = issueTypeIds;
    allTab["TaskPriority"] = taskPriorityIds;
    allTab["CategoryId"] = categoryIds;
    allTab["SubCategoryId"] = subCategoryIds;
    allTab["IssueTypeId"] = issueTypeIds;
    allTab["TicketSourceTypeID"] = ticketSourceIds;
    allTab["TicketIdORTitle"] = this.state.selectedTicketID.trim();
    allTab["PriorityId"] = priorityIds;
    allTab["TicketSatutsID"] = ticketStatusIds;
    allTab["SLAStatus"] = this.state.selectedSLAStatus == 0 ? "" : this.state.selectedSLAStatus;
    allTab["ClaimId"] = this.state.selectedClaimID;
    allTab["InvoiceNumberORSubOrderNo"] = this.state.selectedInvoiceNo.trim();
    allTab["OrderItemId"] = this.state.selectedItemID.trim() == "" ? 0 : this.state.selectedItemID.trim();
    allTab["IsVisitStore"] = this.state.selectedVisitStore;
    allTab["IsWantVistingStore"] = this.state.selectedWantVisitStore;
    allTab["CustomerEmailID"] = this.state.selectedEmailID.trim();
    allTab["CustomerMobileNo"] = this.state.selectedMobileNo.trim();
    allTab["AssignTo"] = assignToIds;
    allTab["StoreCodeORAddress"] = this.state.selectedWantVisitStore.trim();
    allTab[
      "WantToStoreCodeORAddress"
    ] = this.state.selectedVisitStoreAddress.trim();
    allTab["HaveClaim"] = withClaim;
    allTab["ClaimStatusId"] = claimStatusIds;
    allTab["ClaimCategoryId"] = claimCategoryIds;
    allTab["ClaimSubCategoryId"] = claimSubCategoryIds;
    allTab["ClaimIssueTypeId"] = claimIssueTypeIds;
    allTab["HaveTask"] = withTask;
    allTab["TaskStatusId"] = taskStatusIds;
    allTab["TaskDepartment_Id"] = taskDepartmentIds;
    allTab["TaskFunction_Id"] = taskFunctionIds;
    allTab["isLastDayReport"] = this.state.isLastDayReport

    return allTab;
  }
  handleWeeklyDays = async (e) => {
    let check = e.target.checked;
    let val = e.target.value;
    let finalWeekList = "";
    if (val === "Mon") {
      if (check === true) {
        await this.setState({
          Mon: val,
        });
      } else {
        await this.setState({
          Mon: "",
        });
      }
    } else if (val === "Tue") {
      if (check === true) {
        await this.setState({
          Tue: val,
        });
      } else {
        await this.setState({
          Tue: "",
        });
      }
    } else if (val === "Wed") {
      if (check === true) {
        await this.setState({
          Wed: val,
        });
      } else {
        await this.setState({
          Wed: "",
        });
      }
    } else if (val === "Thu") {
      if (check === true) {
        await this.setState({
          Thu: val,
        });
      } else {
        await this.setState({
          Thu: "",
        });
      }
    } else if (val === "Fri") {
      if (check === true) {
        await this.setState({
          Fri: val,
        });
      } else {
        await this.setState({
          Fri: "",
        });
      }
    } else if (val === "Sat") {
      if (check === true) {
        await this.setState({
          Sat: val,
        });
      } else {
        await this.setState({
          Sat: "",
        });
      }
    } else if (val === "Sun") {
      if (check === true) {
        await this.setState({
          Sun: val,
        });
      } else {
        await this.setState({
          Sun: "",
        });
      }
    }
    if (!(this.state.Mon === "")) {
      finalWeekList += this.state.Mon + ",";
    }
    if (!(this.state.Tue === "")) {
      finalWeekList += this.state.Tue + ",";
    }
    if (!(this.state.Wed === "")) {
      finalWeekList += this.state.Wed + ",";
    }
    if (!(this.state.Thu === "")) {
      finalWeekList += this.state.Thu + ",";
    }
    if (!(this.state.Fri === "")) {
      finalWeekList += this.state.Fri + ",";
    }
    if (!(this.state.Sat === "")) {
      finalWeekList += this.state.Sat + ",";
    }
    if (!(this.state.Sun === "")) {
      finalWeekList += this.state.Sun + ",";
    }
    this.setState({
      selectedWeeklyDays: finalWeekList,
    });
  };
  handleScheduleDateChange = (e) => {
    let SelectData = e.currentTarget.value;
    if (SelectData === "230") {
      this.setState({
        IsDaily: true,
        IsWeekly: false,
        IsDailyForMonth: false,
        IsDailyForYear: false,
        IsWeeklyForMonth: false,
        IsWeeklyForYear: false,
        selectedNoOfWeek: 0,
        selectedNoOfDaysForMonth: 0,
        selectedNoOfMonthForMonth: 0,
        selectedNoOfMonthForWeek: 0,
        selectedNoOfWeekForWeek: 0,
        selectedNoOfDayForDailyYear: 0,
        selectedNoOfWeekForYear: 0,
        selectedNameOfDayForWeekCommaSeperated: "",
        selectedNameOfMonthForYearCommaSeperated: "",
        selectedNameOfMonthForDailyYearCommaSeperated: "",
        selectedNameOfDayForYearCommaSeperated: "",
        selectedWeeklyDays: "",
      });
    } else if (SelectData === "231") {
      this.setState({
        IsWeekly: true,
        IsDaily: false,
        selectedNoOfDay: 0,
        IsDailyForMonth: false,
        IsDailyForYear: false,
        IsWeeklyForMonth: false,
        IsWeeklyForYear: false,
        selectedNoOfDaysForMonth: 0,
        selectedNoOfMonthForMonth: 0,
        selectedNoOfMonthForWeek: 0,
        selectedNoOfWeekForWeek: 0,
        selectedNoOfDayForDailyYear: 0,
        selectedNoOfWeekForYear: 0,
        selectedNameOfDayForWeekCommaSeperated: "",
        selectedNameOfMonthForYearCommaSeperated: "",
        selectedNameOfMonthForDailyYearCommaSeperated: "",
        selectedNameOfDayForYearCommaSeperated: "",
      });
    } else if (SelectData === "232") {
      this.setState({
        IsDailyForMonth: true,
        IsDaily: false,
        IsDailyForYear: false,
        IsWeeklyForMonth: false,
        IsWeeklyForYear: false,
        selectedNoOfDay: 0,
        selectedNoOfWeek: 0,
        IsWeekly: false,
        selectedNoOfMonthForWeek: 0,
        selectedNoOfWeekForWeek: 0,
        selectedNoOfDayForDailyYear: 0,
        selectedNoOfWeekForYear: 0,
        selectedNameOfDayForWeekCommaSeperated: "",
        selectedNameOfMonthForYearCommaSeperated: "",
        selectedNameOfMonthForDailyYearCommaSeperated: "",
        selectedNameOfDayForYearCommaSeperated: "",
        selectedWeeklyDays: "",
      });
    } else if (SelectData === "233") {
      this.setState({
        IsWeeklyForMonth: true,
        IsDaily: false,
        IsDailyForMonth: false,
        IsWeeklyForYear: false,
        selectedNoOfDay: 0,
        selectedNoOfWeek: 0,
        IsWeekly: false,
        IsDailyForYear: false,
        selectedNoOfDayForDailyYear: 0,
        selectedNoOfWeekForYear: 0,
        selectedNameOfDayForYearCommaSeperated: "",
        selectedWeeklyDays: "",
        selectedNoOfDaysForMonth: 0,
        selectedNameOfMonthForYearCommaSeperated: "",
      });
    } else if (SelectData === "234") {
      this.setState({
        IsDailyForYear: true,
        IsDaily: false,
        IsDailyForMonth: false,
        selectedNoOfDay: 0,
        selectedNoOfWeek: 0,
        IsWeekly: false,
        IsWeeklyForMonth: false,
        IsWeeklyForYear: false,
        selectedNoOfWeekForYear: 0,
        selectedNameOfDayForYearCommaSeperated: "",
        selectedWeeklyDays: "",
        selectedNoOfDaysForMonth: 0,
        selectedNoOfMonthForMonth: 0,
        selectedNoOfMonthForWeek: 0,
        selectedNoOfWeekForWeek: 0,
        selectedNameOfDayForWeekCommaSeperated: "",
      });
    } else if (SelectData === "235") {
      this.setState({
        IsWeeklyForYear: true,
        IsDaily: false,
        IsDailyForMonth: false,
        selectedNoOfDay: 0,
        selectedNoOfWeek: 0,
        IsWeekly: false,
        IsWeeklyForMonth: false,
        IsDailyForYear: false,
        selectedWeeklyDays: "",
        selectedNoOfDaysForMonth: 0,
        selectedNameOfMonthForYearCommaSeperated: "",
        selectedNoOfDayForDailyYear: 0,
        selectedNoOfMonthForMonth: 0,
        selectedNoOfMonthForWeek: 0,
        selectedNoOfWeekForWeek: 0,
        selectedNameOfDayForWeekCommaSeperated: "",
      });
    }
    this.setState({
      selectScheduleDate: SelectData,
    });
  };
  setTeamMember = (e) => {
    if (e !== null) {
      var selectedTeamMemberCommaSeperated = Array.prototype.map
        .call(e, (s) => s.userID)
        .toString();
    }
    this.setState({ selectedTeamMember: e, selectedTeamMemberCommaSeperated });
  };

  setDefaultTeamMember = (e) => {
    if (e !== null) {
      var selectedTeamMemberCommaSeperated = Array.prototype.map
        .call(e, (s) => s.userID)
        .toString();
    }
    this.setState({
      SelectedDefaultTeamMember: e,
      selectedTeamMemberCommaSeperated,
    });
  };

  setDefaultMutiStatus = (e) => {
    if (e !== null) {
      var selectedStatus = Array.prototype.map
        .call(e, (s) => s.ticketStatusID)
        .toString();
    }
    this.setState({ SelectedTicketMultiStatus: e, selectedStatus });
  };

  setCreatedTicketSource = (e) => {
    if (e !== null) {
      var selectedCreatedTicketSource = Array.prototype.map
        .call(e, (s) => s.ticketSourceId)
        .toString();
    }
    this.setState({ SelectedSourceIds: e, selectedCreatedTicketSource });
  };

  setDefaultTicketStatus = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  setOnChangeReportData = (e, name, type) => {
    if (type === "multiSelect") {
      this.setState({
        [name]: e,
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }

    setTimeout(() => {
      if (this.state.selectedCategory) {
        this.handleGetSubCategoryList();
      }
    }, 1);
    setTimeout(() => {
      if (this.state.selectedSubCategory) {
        this.handleGetIssueTypeList();
      }
    }, 1);
    setTimeout(() => {
      if (this.state.selectedClaimCategory) {
        this.handleGetSubCategoryList();
      }
    }, 1);
    setTimeout(() => {
      if (this.state.selectedClaimSubCategory) {
        this.handleGetIssueTypeList();
      }
    }, 1);
    setTimeout(() => {
      if (this.state.selectedDepartment) {
        this.handleGetFunctionList();
      }
    }, 1);
  };
  handleGetDepartmentList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getDepartmentList",
      headers: authHeader(),
    })
      .then(function (res) {
        let DepartmentData = res.data.responseData;
        self.setState({ DepartmentData: DepartmentData });
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleAssignTo() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserList",
      headers: authHeader(),
    })
      .then(function (res) {
        let AssignData = res.data.responseData;
        self.setState({
          AssignToData: AssignData,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetTicketPriorityList() {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/Priority/GetPriorityList",
      headers: authHeader(),
    })
      .then(function (res) {
        let TicketPriorityData = res.data.responseData;
        self.setState({ TicketPriorityData: TicketPriorityData });
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetTicketSourceList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getTicketSources",
      headers: authHeader(),
    })
      .then(function (res) {
        let TicketSourceData = res.data.responseData;
        self.setState({
          TicketSourceData: TicketSourceData,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleReportList() {
    let self = this;
    this.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/Report/GetReports",
      headers: authHeader(),
    })
      .then(function (res) {
        var status = res.data.message;
        var data = res.data.responseData;

        if (status === "Success") {
          self.setState({
            ReportData: data,
            loading: false,
          });
        } else {
          self.setState({
            ReportData: [],
            loading: false,
          });
        }

        if (data !== null) {
          self.state.sortAllData = data;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].reportName]) {
              distinct.push(data[i].reportName);
              unique[data[i].reportName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortName.push({ reportName: distinct[i] });
            self.state.sortFilterName.push({ reportName: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].scheduleStatus]) {
              distinct.push(data[i].scheduleStatus);
              unique[data[i].scheduleStatus] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortSchedule.push({ scheduleStatus: distinct[i] });
            self.state.sortFilterSchedule.push({ scheduleStatus: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].createdBy]) {
              distinct.push(data[i].createdBy);
              unique[data[i].createdBy] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortCreatedBy.push({ createdBy: distinct[i] });
            self.state.sortFilterCreatedBy.push({ createdBy: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].reportStatus]) {
              distinct.push(data[i].reportStatus);
              unique[data[i].reportStatus] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortStatus.push({ reportStatus: distinct[i] });
            self.state.sortFilterStatus.push({ reportStatus: distinct[i] });
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleDownload = (id, name) => {
    
    this.setState({
      loadingDownload: false,
    });
    let self = this;
    if (id == 0) {
      self.setState({ DefaultPopupName: name });
      self.setState({ OpenDefaultModal: true });
      setTimeout(function () {
        if (name == "Total Ticket Created") {
          document.getElementById("FromDate").style.display = "block";
        } else if (name == "User Performance Report") {
          document.getElementById("FromDate").style.display = "block";

          document.getElementById("TicketSource").style.display = "none";
        } else if (name == "Performance Tracking") {
          document.getElementById("FromDate").style.display = "block";
          document.getElementById("dvAssignedTo").style.display = "block";
          document.getElementById("TicketSource").style.display = "block";
        }

        // else if (name == "Total Open Ticket") {
        //   document.getElementById("FromDate").style.display = "block";
        //   self.setState({ selectedDefaultTicketStatus: 102 });
        //   document.getElementById("drpDefaultStatus").disabled = true;
        //   document.getElementById("TicketStatus").style.display = "block";
        // }
        else if (name == "Total Closed Ticket") {
          document.getElementById("TicketClosedTo").style.display = "block";
          document.getElementById("TicketClosedFrom").style.display = "block";
          document.getElementById("FromDate").style.display = "block";
        } else if (
          name == "Ticket Count By Associates" ||
          name == "Total Open Ticket" ||
          name == "Re-Assigned Tickets" ||
          name == "Re-Opened Tickets" ||
          name == "Escalated Tickets"
        ) {
          document.getElementById("FromDate").style.display = "block";
          // document.getElementById("TicketStatus").style.display="block";
          document.getElementById("dvAssignedTo").style.display = "block";
          document.getElementById("dvMultiStatus").style.display = "block";
        } else if (name == "Escalated Tickets") {
          document.getElementById("FromDate").style.display = "block";
          self.setState({ selectedDefaultTicketStatus: 1001 });
          document.getElementById("drpDefaultStatus").disabled = true;
          document.getElementById("TicketStatus").style.display = "block";
        } else if (name == "Re-Assigned Tickets") {
          document.getElementById("FromDate").style.display = "block";
          document.getElementById("drpDefaultStatus").disabled = false;
          self.setState({ selectedDefaultTicketStatus: 1004 });
          //document.getElementById("drpDefaultStatus").disabled=true;
          document.getElementById("TicketStatus").style.display = "block";
        } else if (name == "Re-Opened Tickets") {
          document.getElementById("FromDate").style.display = "block";
          self.setState({ selectedDefaultTicketStatus: 105 });
          document.getElementById("drpDefaultStatus").disabled = true;
          document.getElementById("TicketStatus").style.display = "block";
        }
        else if ("Total Ticket Sentiment Emotion") {
          document.getElementById("FromDate").style.display = "block";
        }
      }, 100);
    } else {
      this.setState({
        loading: true,
      });

      axios({
        method: "post",
        url: config.apiUrl + "/Report/DownloadReportSearch",
        headers: authHeader(),
        params: {
          SchedulerID: id,
        },
      })
        .then(function (res) {
          window.open(res.data.responseData);
          // self.downloadURI(res.data.responseData,name+".csv");
          self.setState({
            loading: false,
          });
        })
        .catch((data) => {
          console.log(data);
        });
    }
  };
  sentMail = () => {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    if (this.validator.allValid()) {
      axios({
        method: "post",
        url: config.apiUrl + "/Report/SendReportMail",
        headers: authHeader(),
        data: {
          EmailID: this.state.DefaultEmailID,
          FilePath: this.state.FileURL,
        },
      })
        .then(function (res) {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.emailhasbeensend
              : "Email has been sent"
          );
          self.setState({
            loadingDownload: false,
            OpenDefaultMailModal: false
          });
        })
        .catch((data) => {
          self.setState({
            loadingDownload: false,
            OpenDefaultMailModal: false
          });
          console.log(data);
        });
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };
  handleDownloadCSAT = (e) => {
    
    let self = this;
    let reportID = e.reportID
    axios({
      method: "post",
      url: config.apiUrl + "/Report/DownloadDefaultReport",
      headers: authHeader(),
      data: {
        Ticket_CloseFrom: "",
        Ticket_CloseTo: "",
        Ticket_CreatedFrom: "",
        Ticket_CreatedTo: "",
        Ticket_SourceIDs: "",
        ReportTypeID: reportID.toString(),
      },
    })
      .then(function (res) {
        //window.open(res.data.responseData);
        self.setState({
          loadingDownload: false,
        });
        var resultArr = res.data.responseData.split("@");
        if (resultArr.length > 1) {
          self.setState({ FileURL: resultArr[0] });
          self.setState({ OpenDefaultMailModal: true });
          self.setState({ OpenDefaultModal: false });
        } else {
          window.open(resultArr[0]);
          self.setState({ OpenDefaultModal: false });
        }
      })
      .catch((data) => {
        console.log(data);
        self.setState({
          loadingDownload: false,
          OpenDefaultModal: false
        });
      });

  }

  downloadDefaultReport = () => {
    
    let self = this;
    let sourceIds = "";
    let assignedIds = "";
    let multiStatusIds = "";
    var elts = document.getElementsByClassName("cls-spnerror");
    for (var i = 0; i < elts.length; ++i) {
      elts[i].textContent = "";
    }
    if (this.state.DefaultPopupName == "Total Ticket Created") {
      for (var i = 0; i < this.state.SelectedSourceIds?.length; ++i) {
        sourceIds += this.state.SelectedSourceIds[i]?.ticketSourceId + ",";
      }
      this.setState({
        loadingDownload: true,
      });
      axios({
        method: "post",
        url: config.apiUrl + "/Report/DownloadDefaultReport",
        headers: authHeader(),
        data: {
          Ticket_CreatedFrom: moment(this.state.TicketCreatedFromDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_CreatedTo: moment(this.state.TicketCreatedEndDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_SourceIDs: sourceIds,
          ReportTypeID: "1"
        },
      })
        .then(function (res) {
          self.setState({
            loadingDownload: false,
          });
          var resultArr = res.data.responseData.split("@");
          if (resultArr.length > 1) {
            self.setState({ FileURL: resultArr[0] });
            self.setState({ OpenDefaultMailModal: true });
            self.setState({ OpenDefaultModal: false });
          } else {
            window.open(resultArr[0]);
            self.setState({ OpenDefaultModal: false });
          }
        })
        .catch((data) => {
          self.setState({
            loadingDownload: false,
            OpenDefaultModal: false
          });
          console.log(data);
        });
    } else if (this.state.DefaultPopupName == "User Performance Report") {
      for (var i = 0; i < this.state.SelectedSourceIds.length; ++i) {
        sourceIds += this.state.SelectedSourceIds[i].ticketSourceId + ",";
      }
      this.setState({
        loadingDownload: true,
      });
      axios({
        method: "post",
        url: config.apiUrl + "/Report/DownloadDefaultReport",
        headers: authHeader(),
        data: {
          Ticket_CreatedFrom: moment(this.state.TicketCreatedFromDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_CreatedTo: moment(this.state.TicketCreatedEndDate).format(
            "YYYY-MM-DD"
          ),
          ReportTypeID: "8",
        },
      })
        .then(function (res) {
          self.setState({
            loadingDownload: false,
          });
          var resultArr = res.data.responseData.split("@");
          if (resultArr.length > 1) {
            self.setState({ FileURL: resultArr[0] });
            self.setState({ OpenDefaultMailModal: true });
            self.setState({ OpenDefaultModal: false });
          } else {
            window.open(resultArr[0]);
            self.setState({ OpenDefaultModal: false });
          }
        })
        .catch((data) => {
          self.setState({
            loadingDownload: false,
            OpenDefaultModal: false
          });
          console.log(data);
        });
    } else if (this.state.DefaultPopupName == "Total Open Ticket") {
      var totalError = 0;
      for (var i = 0; i < this.state.SelectedSourceIds.length; ++i) {
        sourceIds += this.state.SelectedSourceIds[i].ticketSourceId + ",";
      }
      for (var i = 0; i < this.state.SelectedDefaultTeamMember.length; ++i) {
        assignedIds += this.state.SelectedDefaultTeamMember[i].userID + ",";
      }
      for (var i = 0; i < this.state.SelectedTicketMultiStatus.length; ++i) {
        multiStatusIds +=
          this.state.SelectedTicketMultiStatus[i].ticketStatusID + ",";
      }
      if (this.state.SelectedDefaultTeamMember == "") {
        totalError += 1;
        document.getElementById("spnAssignedTo").textContent =
          "Please select assigned to";
      }
      if (this.state.SelectedTicketMultiStatus == "") {
        totalError += 1;
        document.getElementById("spnTicketStatus").textContent =
          "Please select ticket status";
      }
      if (totalError > 0) {
        return;
      } else {
        this.setState({
          loadingDownload: true,
        });
      }

      axios({
        method: "post",
        url: config.apiUrl + "/Report/DownloadDefaultReport",
        headers: authHeader(),
        data: {
          Ticket_AssignIDs: assignedIds,
          Ticket_StatusIDs: multiStatusIds,
          Ticket_CreatedFrom: moment(this.state.TicketCreatedFromDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_CreatedTo: moment(this.state.TicketCreatedEndDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_SourceIDs: sourceIds,
          ReportTypeID: "2",
        },
      })
        .then(function (res) {
          // window.open(res.data.responseData);
          self.setState({
            loadingDownload: false,
          });
          var resultArr = res.data.responseData.split("@");
          if (resultArr.length > 1) {
            self.setState({ FileURL: resultArr[0] });
            self.setState({ OpenDefaultMailModal: true });
            self.setState({ OpenDefaultModal: false });
          } else {
            window.open(resultArr[0]);
            self.setState({ OpenDefaultModal: false });
          }
        })
        .catch((data) => {
          console.log(data);
          self.setState({
            loadingDownload: false,
            OpenDefaultModal: false
          });
        });
    } else if (this.state.DefaultPopupName == "Total Closed Ticket") {
      for (var i = 0; i < this.state.SelectedSourceIds.length; ++i) {
        sourceIds += this.state.SelectedSourceIds[i].ticketSourceId + ",";
      }
      var totalError = 0;
      if (this.state.TicketClosedFrom == "") {
        totalError += 1;
        document.getElementById("spnTicketClosedFrom").textContent =
          "Please enter from ticket close date";
      }
      if (this.state.TicketClosedTo == "") {
        totalError += 1;
        document.getElementById("spnTicketClosedTo").textContent =
          "Please enter from ticket close date";
      }
      if (totalError > 0) {
        return false;
      } else {
        this.setState({
          loadingDownload: true,
        });
      }
      axios({
        method: "post",
        url: config.apiUrl + "/Report/DownloadDefaultReport",
        headers: authHeader(),
        data: {
          Ticket_CloseFrom: moment(this.state.TicketClosedFrom).format(
            "YYYY-MM-DD"
          ),
          Ticket_CloseTo: moment(this.state.TicketClosedTo).format(
            "YYYY-MM-DD"
          ),
          Ticket_CreatedFrom: moment(this.state.TicketCreatedFromDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_CreatedTo: moment(this.state.TicketCreatedEndDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_SourceIDs: sourceIds,
          ReportTypeID: "3",
        },
      })
        .then(function (res) {
          //window.open(res.data.responseData);
          self.setState({
            loadingDownload: false,
          });
          var resultArr = res.data.responseData.split("@");
          if (resultArr.length > 1) {
            self.setState({ FileURL: resultArr[0] });
            self.setState({ OpenDefaultMailModal: true });
            self.setState({ OpenDefaultModal: false });
          } else {
            window.open(resultArr[0]);
            self.setState({ OpenDefaultModal: false });
          }
        })
        .catch((data) => {
          console.log(data);
          self.setState({
            loadingDownload: false,
            OpenDefaultModal: false
          });
        });
    } else if (this.state.DefaultPopupName == "Performance Tracking") {
      for (var i = 0; i < this.state.SelectedSourceIds.length; ++i) {
        sourceIds += this.state.SelectedSourceIds[i].ticketSourceId + ",";
      }
      for (var i = 0; i < this.state.SelectedDefaultTeamMember.length; ++i) {
        assignedIds += this.state.SelectedDefaultTeamMember[i].userID + ",";
      }
      this.setState({
        loadingDownload: true,
      });

      axios({
        method: "post",
        url: config.apiUrl + "/Report/DownloadDefaultReport",
        headers: authHeader(),
        data: {
          Ticket_AssignIDs: assignedIds,
          Ticket_CreatedFrom: moment(this.state.TicketCreatedFromDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_CreatedTo: moment(this.state.TicketCreatedEndDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_SourceIDs: sourceIds,
          ReportTypeID: "9",
        },
      })
        .then(function (res) {
          self.setState({
            loadingDownload: false,
          });
          var resultArr = res.data.responseData.split("@");
          if (resultArr.length > 1) {
            self.setState({ FileURL: resultArr[0] });
            self.setState({ OpenDefaultMailModal: true });
            self.setState({ OpenDefaultModal: false });
          } else {
            window.open(resultArr[0]);
            self.setState({ OpenDefaultModal: false });
          }
        })
        .catch((data) => {
          console.log(data);
          self.setState({
            loadingDownload: false,
            OpenDefaultModal: false
          });
        });
    } else if (this.state.DefaultPopupName == "Ticket Count By Associates") {
      var totalError = 0;
      for (var i = 0; i < this.state.SelectedSourceIds.length; ++i) {
        sourceIds += this.state.SelectedSourceIds[i].ticketSourceId + ",";
      }
      for (var i = 0; i < this.state.SelectedDefaultTeamMember.length; ++i) {
        assignedIds += this.state.SelectedDefaultTeamMember[i].userID + ",";
      }
      for (var i = 0; i < this.state.SelectedTicketMultiStatus.length; ++i) {
        multiStatusIds +=
          this.state.SelectedTicketMultiStatus[i].ticketStatusID + ",";
      }
      if (this.state.SelectedDefaultTeamMember == "") {
        totalError += 1;
        document.getElementById("spnAssignedTo").textContent =
          "Please select assigned to";
      }
      if (this.state.SelectedTicketMultiStatus == "") {
        totalError += 1;
        document.getElementById("spnTicketStatus").textContent =
          "Please select ticket status";
      }
      if (totalError > 0) {
        return;
      } else {
        this.setState({
          loadingDownload: true,
        });
      }

      axios({
        method: "post",
        url: config.apiUrl + "/Report/DownloadDefaultReport",
        headers: authHeader(),
        data: {
          Ticket_AssignIDs: assignedIds,
          Ticket_StatusIDs: multiStatusIds,
          Ticket_CreatedFrom: moment(this.state.TicketCreatedFromDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_CreatedTo: moment(this.state.TicketCreatedEndDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_SourceIDs: sourceIds,
          ReportTypeID: "4",
        },
      })
        .then(function (res) {
          self.setState({
            loadingDownload: false,
          });
          var resultArr = res.data.responseData.split("@");
          if (resultArr.length > 1) {
            self.setState({ FileURL: resultArr[0] });
            self.setState({ OpenDefaultMailModal: true });
            self.setState({ OpenDefaultModal: false });
          } else {
            window.open(resultArr[0]);
            self.setState({ OpenDefaultModal: false });
          }
        })
        .catch((data) => {
          console.log(data);
          self.setState({
            loadingDownload: false,
            OpenDefaultModal: false
          });
        });
    } else if (this.state.DefaultPopupName == "Escalated Tickets") {
      var totalError = 0;
      for (var i = 0; i < this.state.SelectedSourceIds.length; ++i) {
        sourceIds += this.state.SelectedSourceIds[i].ticketSourceId + ",";
      }
      for (var i = 0; i < this.state.SelectedDefaultTeamMember.length; ++i) {
        assignedIds += this.state.SelectedDefaultTeamMember[i].userID + ",";
      }
      for (var i = 0; i < this.state.SelectedTicketMultiStatus.length; ++i) {
        multiStatusIds +=
          this.state.SelectedTicketMultiStatus[i].ticketStatusID + ",";
      }
      if (this.state.SelectedDefaultTeamMember == "") {
        totalError += 1;
        document.getElementById("spnAssignedTo").textContent =
          "Please select assigned to";
      }
      if (this.state.SelectedTicketMultiStatus == "") {
        totalError += 1;
        document.getElementById("spnTicketStatus").textContent =
          "Please select ticket status";
      }
      if (totalError > 0) {
        return;
      } else {
        this.setState({
          loadingDownload: true,
        });
      }

      axios({
        method: "post",
        url: config.apiUrl + "/Report/DownloadDefaultReport",
        headers: authHeader(),
        data: {
          Ticket_AssignIDs: assignedIds,
          Ticket_StatusIDs: multiStatusIds,
          Ticket_CreatedFrom: moment(this.state.TicketCreatedFromDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_CreatedTo: moment(this.state.TicketCreatedEndDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_SourceIDs: sourceIds,
          ReportTypeID: "5",
        },
      })
        .then(function (res) {
          self.setState({
            loadingDownload: false,
          });
          var resultArr = res.data.responseData.split("@");
          if (resultArr.length > 1) {
            self.setState({ FileURL: resultArr[0] });
            self.setState({ OpenDefaultMailModal: true });
            self.setState({ OpenDefaultModal: false });
          } else {
            window.open(resultArr[0]);
            self.setState({ OpenDefaultModal: false });
          }
        })
        .catch((data) => {
          console.log(data);
          self.setState({
            loadingDownload: false,
            OpenDefaultModal: false
          });
        });
    } else if (this.state.DefaultPopupName == "Re-Assigned Tickets") {
      var totalError = 0;
      for (var i = 0; i < this.state.SelectedSourceIds.length; ++i) {
        sourceIds += this.state.SelectedSourceIds[i].ticketSourceId + ",";
      }
      for (var i = 0; i < this.state.SelectedDefaultTeamMember.length; ++i) {
        assignedIds += this.state.SelectedDefaultTeamMember[i].userID + ",";
      }
      for (var i = 0; i < this.state.SelectedTicketMultiStatus.length; ++i) {
        multiStatusIds +=
          this.state.SelectedTicketMultiStatus[i].ticketStatusID + ",";
      }
      if (this.state.SelectedDefaultTeamMember == "") {
        totalError += 1;
        document.getElementById("spnAssignedTo").textContent =
          "Please select assigned to";
      }
      if (this.state.SelectedTicketMultiStatus == "") {
        totalError += 1;
        document.getElementById("spnTicketStatus").textContent =
          "Please select ticket status";
      }
      if (totalError > 0) {
        return;
      } else {
        this.setState({
          loadingDownload: true,
        });
      }

      axios({
        method: "post",
        url: config.apiUrl + "/Report/DownloadDefaultReport",
        headers: authHeader(),
        data: {
          Ticket_AssignIDs: assignedIds,
          Ticket_StatusIDs: multiStatusIds,
          Ticket_CreatedFrom: moment(this.state.TicketCreatedFromDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_CreatedTo: moment(this.state.TicketCreatedEndDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_SourceIDs: sourceIds,
          ReportTypeID: "6",
        },
      })
        .then(function (res) {
          self.setState({
            loadingDownload: false,
          });
          var resultArr = res.data.responseData.split("@");
          if (resultArr.length > 1) {
            self.setState({ FileURL: resultArr[0] });
            self.setState({ OpenDefaultMailModal: true });
            self.setState({ OpenDefaultModal: false });
          } else {
            window.open(resultArr[0]);
            self.setState({ OpenDefaultModal: false });
          }
        })
        .catch((data) => {
          console.log(data);
          self.setState({
            loadingDownload: false,
            OpenDefaultModal: false
          });
        });
    } else if (this.state.DefaultPopupName == "Re-Opened Tickets") {
      var totalError = 0;
      for (var i = 0; i < this.state.SelectedSourceIds.length; ++i) {
        sourceIds += this.state.SelectedSourceIds[i].ticketSourceId + ",";
      }
      for (var i = 0; i < this.state.SelectedDefaultTeamMember.length; ++i) {
        assignedIds += this.state.SelectedDefaultTeamMember[i].userID + ",";
      }
      for (var i = 0; i < this.state.SelectedTicketMultiStatus.length; ++i) {
        multiStatusIds +=
          this.state.SelectedTicketMultiStatus[i].ticketStatusID + ",";
      }
      if (this.state.SelectedDefaultTeamMember == "") {
        totalError += 1;
        document.getElementById("spnAssignedTo").textContent =
          "Please select assigned to";
      }
      if (this.state.SelectedTicketMultiStatus == "") {
        totalError += 1;
        document.getElementById("spnTicketStatus").textContent =
          "Please select ticket status";
      }
      if (totalError > 0) {
        return;
      } else {
        this.setState({
          loadingDownload: true,
        });
      }

      axios({
        method: "post",
        url: config.apiUrl + "/Report/DownloadDefaultReport",
        headers: authHeader(),
        data: {
          Ticket_AssignIDs: assignedIds,
          Ticket_StatusIDs: multiStatusIds,
          Ticket_CreatedFrom: moment(this.state.TicketCreatedFromDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_CreatedTo: moment(this.state.TicketCreatedEndDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_SourceIDs: sourceIds,
          ReportTypeID: "7",
        },
      })
        .then(function (res) {
          self.setState({
            loadingDownload: false,
          });
          var resultArr = res.data.responseData.split("@");
          if (resultArr.length > 1) {
            self.setState({ FileURL: resultArr[0] });
            self.setState({ OpenDefaultMailModal: true });
            self.setState({ OpenDefaultModal: false });
          } else {
            window.open(resultArr[0]);
            self.setState({ OpenDefaultModal: false });
          }
        })
        .catch((data) => {
          console.log(data);
          self.setState({
            loadingDownload: false,
            OpenDefaultModal: false
          });
        });
    } else if (this.state.DefaultPopupName == "Total Ticket Sentiment Emotion") {
      for (var i = 0; i < this.state.SelectedSourceIds?.length; ++i) {
        sourceIds += this.state.SelectedSourceIds[i]?.ticketSourceId + ",";
      }
      this.setState({
        loadingDownload: true,
      });
      axios({
        method: "post",
        url: config.apiUrl + "/Report/DownloadDefaultReport",
        headers: authHeader(),
        data: {
          Ticket_CreatedFrom: moment(this.state.TicketCreatedFromDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_CreatedTo: moment(this.state.TicketCreatedEndDate).format(
            "YYYY-MM-DD"
          ),
          Ticket_SourceIDs: sourceIds,
          ReportTypeID: "11",
        },
      })
        .then(function (res) {
          self.setState({
            loadingDownload: false,
          });
          var resultArr = res.data.responseData.split("@");
          if (resultArr.length > 1) {
            self.setState({ FileURL: resultArr[0] });
            self.setState({ OpenDefaultMailModal: true });
            self.setState({ OpenDefaultModal: false });
          } else {
            window.open(resultArr[0]);
            self.setState({ OpenDefaultModal: false });
          }
        })
        .catch((data) => {
          self.setState({
            loadingDownload: false,
            OpenDefaultModal: false
          });
          console.log(data);
        });
    }

  };

  downloadURI = (uri, name) => {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  setDefaultEmail = (e) => {
    this.setState({ DefaultEmailID: e.target.value });
  };
  handleDeleteReport(id) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/Report/DeleteReport",
      headers: authHeader(),
      params: {
        ReportID: id,
      },
    })
      .then(function (res) {
        let Msg = res.data.message;
        if (Msg === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recorddeletedsuccessfully
              : "Record Deleted successfully."
          );
          self.handleReportList();
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetBrandList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ brandData: data });
        } else {
          self.setState({ brandData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetCategoryList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryList",
      headers: authHeader(),
    })
      .then(function (res) {
        let data = res.data;
        let CategoryData = res.data;
        if (data.length > 0) {
          self.setState({
            CategoryData: CategoryData,
          });
        } else {
          self.setState({
            CategoryData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetSubCategoryList() {
    let self = this;
    let cateId = this.state.selectedCategory;
    if (this.state.selectedCategory !== 0) {
      let categoryIds = "";
      if (this.state.selectedCategory != null) {
        for (let i = 0; i < this.state.selectedCategory.length; i++) {
          categoryIds += this.state.selectedCategory[i].categoryID + ",";
        }
      }
      cateId = categoryIds;
    } else {
      let categoryIds = "";
      if (this.state.selectedClaimCategory != null) {
        for (let i = 0; i < this.state.selectedClaimCategory.length; i++) {
          categoryIds += this.state.selectedClaimCategory[i].categoryID + ",";
        }
      }
      cateId = categoryIds;
    }

    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/GetSubCategoryByCategoryID",
      headers: authHeader(),
      params: {
        CategoryID: cateId,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ SubCategoryData: data });
        } else {
          self.setState({ SubCategoryData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetIssueTypeList() {
    let self = this;
    let subCateId = this.state.selectedSubCategory;
    if (this.state.selectedSubCategory !== 0) {
      let subIds = "";
      if (this.state.selectedSubCategory != null) {
        for (let i = 0; i < this.state.selectedSubCategory.length; i++) {
          subIds += this.state.selectedSubCategory[i].subCategoryID + ",";
        }
      }
      subCateId = subIds;
    } else {
      let subIds = "";
      if (this.state.selectedClaimSubCategory != null) {
        for (let i = 0; i < this.state.selectedClaimSubCategory.length; i++) {
          subIds += this.state.selectedClaimSubCategory[i].subCategoryID + ",";
        }
      }
      subCateId = subIds;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/GetIssueTypeList",
      headers: authHeader(),
      params: {
        SubCategoryID: subCateId,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ IssueTypeData: data });
        } else {
          self.setState({ IssueTypeData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleSave() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    var SearchParams = {};

    SearchParams = JSON.stringify(this.state.ReportParams);
    if (self.state.selectedReportName == "") {
      NotificationManager.error(
        TranslationContext !== undefined
          ? TranslationContext.alertmessage.pleaseenterreportname
          : "Please enter report name"
      );
      return;
    }
    self = this;
    if (this.state.selectScheduleDate == "") {
      self.setState({ selectScheduleDate: 0 });
    }
    setTimeout(() => {
      if (this.state.Schedule_ID > 0) {
        axios({
          method: "post",
          url: config.apiUrl + "/Report/SaveReportForDownload",
          headers: authHeader(),
          params: {
            ScheduleID: this.state.Schedule_ID,
          },
        })
          .then(function (res) {
            // this.handleReportList();
            self.handleReportList();
            self.handleNextPopupClose();
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.reportsavedsuccessfullyfordown
                : "Report saved successfully for download."
            );
          })
          .catch((data) => {
            console.log(data);
          });
      } else {
        axios({
          method: "post",
          url: config.apiUrl + "/Ticketing/Schedule",
          headers: authHeader(),
          data: {
            PrimaryScheduleID: this.state.Schedule_ID,
            ReportName: this.state.selectedReportName,
            SearchInputParams: SearchParams,
            ScheduleFor: this.state.selectedTeamMemberCommaSeperated,
            ScheduleType: this.state.selectScheduleDate,
            NoOfDay: this.state.selectedNoOfDay,
            ScheduleTime: this.state.selectedScheduleTime,
            IsDaily: this.state.IsDaily,
            IsWeekly: this.state.IsWeekly,
            NoOfWeek: this.state.selectedNoOfWeek,
            DayIds: this.state.selectedWeeklyDays,
            IsDailyForMonth: this.state.IsDailyForMonth,
            NoOfDaysForMonth: this.state.selectedNoOfDaysForMonth,
            NoOfMonthForMonth: this.state.selectedNoOfMonthForMonth,
            IsWeeklyForMonth: this.state.IsWeeklyForMonth,
            NoOfMonthForWeek: this.state.selectedNoOfMonthForWeek,
            NoOfWeekForWeek: this.state.selectedNoOfWeekForWeek,
            ScheduleFrom: 4,
            NameOfDayForWeek: this.state.selectedNameOfDayForWeekCommaSeperated,
            IsDailyForYear: this.state.IsDailyForYear,
            NoOfDayForDailyYear: this.state.selectedNoOfDayForDailyYear,
            NameOfMonthForDailyYear: this.state
              .selectedNameOfMonthForYearCommaSeperated,
            IsWeeklyForYear: this.state.IsWeeklyForYear,
            NoOfWeekForYear: this.state.selectedNoOfWeekForYear,
            NameOfDayForYear: this.state.selectedNameOfDayForYearCommaSeperated,
            NameOfMonthForYear: this.state
              .selectedNameOfMonthForDailyYearCommaSeperated,
            // IsLastDayReport:this.state.isLastDayReport
          },
        })
          .then(function (res) {
            let status = res.data.message;
            let scheduleId = res.data.responseData;
            if (status === "Success") {
              self.state.selectedTeamMember = "";
              self.state.selectedTeamMemberCommaSeperated = undefined;
              self.state.selectScheduleDate = "";
              self.state.selectedScheduleTime = "";

              self.ScheduleCloseModel();
              // this.handleReportList();
              self.handleReportList();
              self.setState({ Schedule_ID: scheduleId });
              self.setState({ AddReportPopup: false });
              NotificationManager.success(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.reportsavedsuccessfully
                  : "Report saved successfully."
              );
              self.setState({
                ReportParams: {},
                selectedScheduleTime: "",
                IsDaily: false,
                IsDailyForMonth: false,
                IsWeekly: false,
                IsWeeklyForMonth: false,
                IsDailyForYear: false,
                IsWeeklyForYear: false,
                NextPopup: false,
              });
            } else if (status == "duplicate") {
              self.setState({ Schedule_ID: 0 });
              NotificationManager.error(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.reportnamealreadyexist
                  : "Report name already exist."
              );
            }
          })
          .catch((data) => {
            console.log(data);
          });
      }
    }, 10);
  }

  handleInsertReport() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    var SearchParams = {};

    SearchParams = JSON.stringify(this.state.ReportParams);

    if (
      SearchParams != "" &&
      this.state.selectedReportName !== "" &&
      this.state.selectScheduleDate !== "" &&
      this.state.selectedScheduleTime !== ""
    ) {
      var month, day, year, hours, minutes, seconds;
      var date = new Date(this.state.selectedScheduleTime),
        month = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
      hours = ("0" + date.getHours()).slice(-2);
      minutes = ("0" + date.getMinutes()).slice(-2);
      seconds = ("0" + date.getSeconds()).slice(-2);

      var mySQLDate = [date.getFullYear(), month, day].join("-");
      var mySQLTime = [hours, minutes, seconds].join(":");
      this.state.selectedScheduleTime = [mySQLDate, mySQLTime].join(" ");

      self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/Ticketing/Schedule",
        headers: authHeader(),
        data: {
          PrimaryScheduleID: this.state.Schedule_ID,
          ReportName: this.state.selectedReportName,
          SearchInputParams: SearchParams,
          ScheduleFor: this.state.selectedTeamMemberCommaSeperated,
          ScheduleType: this.state.selectScheduleDate,
          NoOfDay: this.state.selectedNoOfDay,
          ScheduleTime: this.state.selectedScheduleTime,
          IsDaily: this.state.IsDaily,
          IsWeekly: this.state.IsWeekly,
          NoOfWeek: this.state.selectedNoOfWeek,
          DayIds: this.state.selectedWeeklyDays,
          IsDailyForMonth: this.state.IsDailyForMonth,
          NoOfDaysForMonth: this.state.selectedNoOfDaysForMonth,
          NoOfMonthForMonth: this.state.selectedNoOfMonthForMonth,
          IsWeeklyForMonth: this.state.IsWeeklyForMonth,
          NoOfMonthForWeek: this.state.selectedNoOfMonthForWeek,
          NoOfWeekForWeek: this.state.selectedNoOfWeekForWeek,
          ScheduleFrom: 3,
          NameOfDayForWeek: this.state.selectedNameOfDayForWeekCommaSeperated,
          IsDailyForYear: this.state.IsDailyForYear,
          NoOfDayForDailyYear: this.state.selectedNoOfDayForDailyYear,
          NameOfMonthForDailyYear: this.state
            .selectedNameOfMonthForYearCommaSeperated,
          IsWeeklyForYear: this.state.IsWeeklyForYear,
          NoOfWeekForYear: this.state.selectedNoOfWeekForYear,
          NameOfDayForYear: this.state.selectedNameOfDayForYearCommaSeperated,
          NameOfMonthForYear: this.state
            .selectedNameOfMonthForDailyYearCommaSeperated,
          IsLastDayReport: this.state.isLastDayReport
        },
      })
        .then(function (res) {
          let status = res.data.message;
          let scheduleId = res.data.responseData;
          if (status === "Success") {
            self.state.selectedTeamMember = "";
            self.state.selectedTeamMemberCommaSeperated = undefined;
            self.state.selectScheduleDate = "";
            self.state.selectedScheduleTime = "";

            self.ScheduleCloseModel();
            // this.handleReportList();
            self.setState({ Schedule_ID: scheduleId });
            self.setState({ AddReportPopup: false });
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.schedulercreatedsuccessfully
                : "Scheduler created successfully."
            );
            self.setState({
              ReportParams: {},
              selectedScheduleTime: "",
              IsDaily: false,
              IsDailyForMonth: false,
              IsWeekly: false,
              IsWeeklyForMonth: false,
              IsDailyForYear: false,
              IsWeeklyForYear: false,
            });
          } else if (status == "duplicate") {
            self.setState({ Schedule_ID: 0 });
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.reportnamealreadyexist
                : "Report name already exist."
            );
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      if (this.state.selectedReportName == "") {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseaddreportname
            : "Please add report name."
        );
        return false;
      }
      if (
        this.state.selectedTeamMemberCommaSeperated == undefined &&
        this.state.selectedTeamMemberCommaSeperated != ""
      ) {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseaddteamnameforscheduler
            : "Please add team name for schedule."
        );
      }
      if (this.state.selectScheduleDate == "") {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseselectscheduletype
            : "Please select schedule type."
        );
      }
      if (this.state.selectedScheduleTime == "") {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseselectscheduletime
            : "Please select schedule time."
        );
      }
      if (SearchParams === "") {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseaddreportforscheduler
            : "Please add report for create scheduler."
        );
      }
    }
  }
  filteTextChange(e) {
    this.setState({ filterTxtValue: e.target.value });
    if (this.state.sortColumn === "reportName") {
      var sortFilterName = matchSorter(this.state.sortName, e.target.value, {
        keys: ["reportName"],
      });
      if (sortFilterName.length > 0) {
        this.setState({ sortFilterName });
      } else {
        this.setState({
          sortFilterName: this.state.sortName,
        });
      }
    }
    if (this.state.sortColumn === "scheduleStatus") {
      var sortFilterSchedule = matchSorter(
        this.state.sortSchedule,
        e.target.value,
        { keys: ["scheduleStatus"] }
      );
      if (sortFilterSchedule.length > 0) {
        this.setState({ sortFilterSchedule });
      } else {
        this.setState({
          sortFilterSchedule: this.state.sortSchedule,
        });
      }
    }
    if (this.state.sortColumn === "createdBy") {
      var sortFilterCreatedBy = matchSorter(
        this.state.sortCreatedBy,
        e.target.value,
        { keys: ["createdBy"] }
      );
      if (sortFilterCreatedBy.length > 0) {
        this.setState({ sortFilterCreatedBy });
      } else {
        this.setState({
          sortFilterCreatedBy: this.state.sortCreatedBy,
        });
      }
    }
    if (this.state.sortColumn === "reportStatus") {
      var sortFilterStatus = matchSorter(
        this.state.sortStatus,
        e.target.value,
        { keys: ["reportStatus"] }
      );
      if (sortFilterStatus.length > 0) {
        this.setState({ sortFilterStatus });
      } else {
        this.setState({
          sortFilterStatus: this.state.sortStatus,
        });
      }
    }
  }

  handleGetModulesNames = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetModules",
      headers: authHeader(),
    }).then((res) => {
      let status = res.data.message;
      let data = res.data.responseData;
      if (data) {
        let moduleID = data[0].moduleID;
        self.handleAdvanceSearchOption(moduleID);
      }
    });
  };
  handleAdvanceSearchOption = (id) => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetModulesItems",
      headers: authHeader(),
      params: {
        ModuleID: id,
      },
    })
      .then((res) => {
        let status = res.data.message;
        let data1 = res.data.responseData;
        if (status === "Success") {
          self.setState({ advanceSearchedModulesItems: data1 });
          self.setAdvanceSearch(data1);
        } else {
          self.setState({ advanceSearchedModulesItems: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };
  setAdvanceSearch = (data1) => {
    var data = [];
    data = data1;

    let showAdvanceSearchedData = {};
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        showAdvanceSearchedData[data[i].moduleItemName] =
          data[i].moduleItemisActive;
      }
    }

    if (!showAdvanceSearchedData["Creation Date"]) {
      this.setState({ CreateDateShowRecord: "none" });
    }
    if (!showAdvanceSearchedData["Last Updated Date"]) {
      this.setState({ LastUpdatedDate: "none" });
    }
    if (!showAdvanceSearchedData["Category"]) {
      this.setState({ Category: "none" });
    }
    if (!showAdvanceSearchedData["Sub Category"]) {
      this.setState({ SubCategory: "none" });
    }
    if (!showAdvanceSearchedData["Issue Type"]) {
      this.setState({ IssueType: "none" });
    }
    if (!showAdvanceSearchedData["Ticket Source"]) {
      this.setState({ TicketSource: "none" });
    }
    if (!showAdvanceSearchedData["Ticket ID/Title"]) {
      this.setState({ TicketIDTitle: "none" });
    }
    if (!showAdvanceSearchedData["Ticket Priority"]) {
      this.setState({ TicketPriority: "none" });
    }
    if (!showAdvanceSearchedData["Ticket Status"]) {
      this.setState({ TicketStatus: "none" });
    }
    if (!showAdvanceSearchedData["SLA Status"]) {
      this.setState({ SLAStatus: "none" });
    }
    if (!showAdvanceSearchedData["Claim ID"]) {
      this.setState({ ClaimID: "none" });
    }
    if (!showAdvanceSearchedData["Invoice No/Sub Order No"]) {
      this.setState({ InvoiceNoSubOrderNo: "none" });
    }
    if (!showAdvanceSearchedData["Item ID"]) {
      this.setState({ ItemID: "none" });
    }

    if (!showAdvanceSearchedData["Did visit store"]) {
      this.setState({ Didvisitstore: "none" });
    }

    if (!showAdvanceSearchedData["Want to visit store"]) {
      this.setState({ Wanttovisitstore: "none" });
    }

    if (!showAdvanceSearchedData["Email"]) {
      this.setState({ Email: "none" });
    }

    if (!showAdvanceSearchedData["Mobile No"]) {
      this.setState({ MobileNo: "none" });
    }

    if (!showAdvanceSearchedData["Assign To"]) {
      this.setState({ AssignTo: "none" });
    }

    if (!showAdvanceSearchedData["Purchase Store Code/Address"]) {
      this.setState({ PurchaseStoreCodeAddress: "none" });
    }

    if (!showAdvanceSearchedData["With Claim"]) {
      this.setState({ WithClaim: "none" });
    }
    if (!showAdvanceSearchedData["With Task"]) {
      this.setState({ WithTask: "none" });
    }
    if (!showAdvanceSearchedData["Brand"]) {
      this.setState({ Brand: "none" });
    }
  };
  handleLastDayReport = () => {
    
    let self = this
    self.setState({
      isLastDayReport: !this.state.isLastDayReport
    })
  }

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    const datareport = this.state.ReportData;

    return (
      <Fragment>
        <div className="position-relative d-inline-block">
          <Modal
            onClose={this.StatusCloseModel}
            open={this.state.StatusModel}
            modalId="Status-popup"
            overlayId="logout-ovrly"
          >
            <div className="status-drop-down">
              <div className="sort-sctn text-center">
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
                href=""
                style={{ margin: "0 25px", textDecoration: "underline" }}
                onClick={this.setSortCheckStatus.bind(this, "all")}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.a.clearsearch
                  : "clear search"}
              </a>
              <div className="filter-type">
                <p>
                  {TranslationContext !== undefined
                    ? TranslationContext.p.filterbytype
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
                        this.state.sreportNameFilterCheckbox.includes("all") ||
                        this.state.sscheduleStatusFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.screatedByFilterCheckbox.includes("all") ||
                        this.state.sreportStatusFilterCheckbox.includes("all")
                      }
                      onChange={this.setSortCheckStatus.bind(this, "all")}
                    />
                    <label htmlFor={"fil-open"}>
                      <span className="table-btn table-blue-btn">
                        {TranslationContext !== undefined
                          ? TranslationContext.span.all
                          : "ALL"}
                      </span>
                    </label>
                  </div>
                  {this.state.sortColumn === "reportName"
                    ? this.state.sortFilterName !== null &&
                    this.state.sortFilterName.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name={item.reportName}
                          id={"fil-open" + item.reportName}
                          value={item.reportName}
                          checked={this.state.sreportNameFilterCheckbox.includes(
                            item.reportName
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "reportName",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.reportName}>
                          <span className="table-btn table-blue-btn">
                            {item.reportName}
                          </span>
                        </label>
                      </div>
                    ))
                    : null}

                  {this.state.sortColumn === "scheduleStatus"
                    ? this.state.sortFilterSchedule !== null &&
                    this.state.sortFilterSchedule.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name={item.scheduleStatus}
                          id={"fil-open" + item.scheduleStatus}
                          value={item.scheduleStatus}
                          checked={this.state.sscheduleStatusFilterCheckbox.includes(
                            item.scheduleStatus
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "scheduleStatus",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.scheduleStatus}>
                          <span className="table-btn table-blue-btn">
                            {item.scheduleStatus}
                          </span>
                        </label>
                      </div>
                    ))
                    : null}

                  {this.state.sortColumn === "createdBy"
                    ? this.state.sortFilterCreatedBy !== null &&
                    this.state.sortFilterCreatedBy.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name={item.createdBy}
                          id={"fil-open" + item.createdBy}
                          value={item.createdBy}
                          checked={this.state.screatedByFilterCheckbox.includes(
                            item.createdBy
                          )}
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

                  {this.state.sortColumn === "reportStatus"
                    ? this.state.sortFilterStatus !== null &&
                    this.state.sortFilterStatus.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name={item.reportStatus}
                          id={"fil-open" + item.reportStatus}
                          value={item.reportStatus}
                          checked={this.state.sreportStatusFilterCheckbox.includes(
                            item.reportStatus
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "reportStatus",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.reportStatus}>
                          <span className="table-btn table-blue-btn">
                            {item.reportStatus}
                          </span>
                        </label>
                      </div>
                    ))
                    : null}
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.setting
              : "Settings"}
          </Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.ticketing
              : "Ticketing"}
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.reports
              : "Reports"}
          </Link>
          <div className="reportbutton">
            <div className="addplus">
              <button
                type="button"
                className="addplusbtnReport"
                onClick={this.AddScheduler}
              >
                +{" "}
                {TranslationContext !== undefined
                  ? TranslationContext.button.add
                  : "Add"}
              </button>
            </div>
          </div>

          <Modal
            open={this.state.AddReportPopup}
            onClose={this.handleAddReportClose}
            closeIconId="sdsg"
            modalId="addreport-popup"
          // overlayId="logout-ovrly"
          >
            <div className="setting-tabs alert-tabs">
              <ul className="nav nav-tabs margin-report" role="tablist">
                <li className="nav-item">
                  <a
                    className={`nav-link ${this.state.tabIndex === 0 &&
                      "active"} `}
                    data-toggle="tab"
                    href="#ticket-tab"
                    role="tab"
                    aria-controls="ticket-tab"
                    aria-selected="true"
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.a.tickets
                      : "Tickets"}
                  </a>
                </li>
                <li className="nav-item cls-hide">
                  <a
                    className={`nav-link ${this.state.tabIndex === 1 &&
                      "active"} `}
                    data-toggle="tab"
                    href="#chat-tab"
                    role="tab"
                    aria-controls="chat-tab"
                    aria-selected="false"
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.a.hats
                      : "Chats"}
                  </a>
                </li>
              </ul>
              <img
                src={CancelImg}
                alt="CancelImg"
                className="cancelImg-alert"
                onClick={this.handleAddReportClose.bind(this)}
              />
            </div>
            <div className="tab-content">
              <div
                className={`tab-pane fade ${this.state.tabIndex === 0 &&
                  "show active"}`}
                id="ticket-tab"
                role="tabpanel"
                aria-labelledby="ticket-tab"
              >
                <div className="container reportpad">
                  <div className="row">
                    <div
                      className="col-md-3 ticketreport"
                      style={{ display: this.state.Brand }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.selectedbrand
                          : "Selected Brand"}
                      </label>
                      <select
                        className="store-create-select mt-0"
                        value={this.state.selectBrand}
                        onChange={this.setOnChangeReportData}
                        name="selectBrand"
                      >
                        <option>
                          {TranslationContext !== undefined
                            ? TranslationContext.option.select
                            : "Select"}
                        </option>
                        {this.state.brandData !== null &&
                          this.state.brandData.map((item, i) => (
                            <option
                              key={i}
                              value={item.brandID}
                              className="select-category-placeholder"
                            >
                              {item.brandName}
                            </option>
                          ))}
                      </select>
                      {this.state.selectBrand === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.BrandCompulsion}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-md-3 ticketreport"
                      style={{
                        display: this.state.TicketSource,
                      }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.ticketsource
                          : "Ticket Source"}
                      </label>
                      <div className="normal-dropdown dropdown-setting1 schedule-multi report-multiselect">
                        <Select
                          getOptionLabel={(option) => option.ticketSourceName}
                          getOptionValue={
                            (option) => option.ticketSourceId //id
                          }
                          options={this.state.TicketSourceData}
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.label.ticketsource
                              : "Ticket Source"
                          }
                          closeMenuOnSelect={false}
                          onChange={(e) =>
                            this.setOnChangeReportData(
                              e,
                              "selectedTicketSource",
                              "multiSelect"
                            )
                          }
                          value={this.state.selectedTicketSource}
                          isMulti
                        />
                      </div>

                      {this.state.selectedTicketSource === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.TicketSourceCompulsion}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-md-3 ticketreport"
                      style={{
                        display: this.state.InvoiceNoSubOrderNo,
                      }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.invosuborderno
                          : "Invoice No/Sub Order No"}
                      </label>
                      <input
                        className="no-bg"
                        type="text"
                        maxLength={25}
                        name="selectedInvoiceNo"
                        value={this.state.selectedInvoiceNo}
                        onChange={this.setOnChangeReportData}
                      />
                      {this.state.selectedInvoiceNo.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.InvoiceNoCompulsion}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-md-3 ticketreport"
                      style={{
                        display: this.state.Email,
                      }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.customeremailid
                          : "Customer Email Id"}
                      </label>
                      <input
                        className="no-bg"
                        type="text"
                        maxLength={100}
                        name="selectedEmailID"
                        value={this.state.selectedEmailID}
                        onChange={this.setOnChangeReportData}
                      />
                      {this.state.selectedEmailID.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.EmailIDCompulsion}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-md-3 ticketreport"
                      style={{
                        display: this.state.CreateDateShowRecord,
                      }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.creationdate
                          : "Creation Date"}
                      </label>
                      <div className="ticketreportdat">
                        <DatePicker
                          selected={this.state.ReportCreateDate}
                          onChange={this.handleReportCreateDate.bind(this)}
                          placeholderText={
                            TranslationContext !== undefined
                              ? TranslationContext.label.creationdate
                              : "Creation Date"
                          }
                          showMonthDropdown
                          showYearDropdown
                          dateFormat="dd/MM/yyyy"
                          value={this.state.ReportCreateDate}
                        />
                        {this.state.ReportCreateDate.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.CreateDateCompulsion}
                          </p>
                        )}
                      </div>
                    </div>
                    <div
                      className="col-md-3 ticketreport"
                      style={{
                        display: this.state.TicketIDTitle,
                      }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.ticketidtitle
                          : "Ticket Id/title"}
                      </label>
                      <input
                        className="no-bg"
                        type="text"
                        maxLength={11}
                        name="selectedTicketID"
                        value={this.state.selectedTicketID}
                        onChange={this.setOnChangeReportData}
                      />
                      {this.state.selectedTicketID.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.TicketIDCompulsion}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-md-3 ticketreport"
                      style={{
                        display: this.state.ItemID,
                      }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.itemid
                          : "Item Id"}
                      </label>
                      <input
                        className="no-bg"
                        type="text"
                        maxLength={11}
                        name="selectedItemID"
                        value={this.state.selectedItemID}
                        onChange={this.setOnChangeReportData}
                      />
                      {this.state.selectedItemID.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.ItemIDCompulsion}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-md-3 ticketreport"
                      style={{
                        display: this.state.MobileNo,
                      }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.customermobilenumber
                          : "Customer Mobile No."}
                      </label>
                      <input
                        className="no-bg"
                        type="text"
                        maxLength={10}
                        name="selectedMobileNo"
                        value={this.state.selectedMobileNo}
                        onChange={this.setOnChangeReportData}
                      />
                      {this.state.selectedMobileNo.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.MobileNoCompulsion}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-md-3 ticketreport"
                      style={{
                        display: this.state.LastUpdatedDate,
                      }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.lastupdateddate
                          : "Last Updated Date"}
                      </label>
                      <div className="ticketreportdat">
                        <DatePicker
                          selected={this.state.ReportLastDate}
                          onChange={this.handleReportLastDate.bind(this)}
                          placeholderText={
                            TranslationContext !== undefined
                              ? TranslationContext.label.lastupdateddate
                              : "Last Updated Date"
                          }
                          showMonthDropdown
                          showYearDropdown
                          dateFormat="dd/MM/yyyy"
                          value={this.state.ReportLastDate}
                        />
                        {this.state.ReportLastDate.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.LastDateCompulsion}
                          </p>
                        )}
                      </div>
                    </div>
                    <div
                      className="col-md-3 ticketreport"
                      style={{
                        display: this.state.TicketPriority,
                      }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.priority
                          : "Priority"}
                      </label>
                      <div className="normal-dropdown dropdown-setting1 schedule-multi report-multiselect">
                        <Select
                          getOptionLabel={(option) => option.priortyName}
                          getOptionValue={
                            (option) => option.priorityID //id
                          }
                          options={this.state.TicketPriorityData}
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.label.priority
                              : "Priority"
                          }
                          closeMenuOnSelect={false}
                          onChange={(e) =>
                            this.setOnChangeReportData(
                              e,
                              "selectedPriority",
                              "multiSelect"
                            )
                          }
                          value={this.state.selectedPriority}
                          isMulti
                        />
                      </div>

                      {this.state.selectedPriority === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.PriorityCompulsion}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-md-3 ticketreport"
                      style={{
                        display: this.state.Didvisitstore,
                      }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.visitedstore
                          : "Visited Store"}
                      </label>
                      <select
                        name="selectedVisitStore"
                        value={this.state.selectedVisitStore}
                        onChange={this.setOnChangeReportData}
                      >
                        <option value="all">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.all
                            : "All"}
                        </option>
                        <option value="yes">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.yes
                            : "Yes"}
                        </option>
                        <option value="no">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.no
                            : "No"}
                        </option>
                      </select>
                      {this.state.selectedVisitStore === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.VisitStoreCompulsion}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-md-3 ticketreport"
                      style={{
                        display: this.state.AssignTo,
                      }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.ticketassignedto
                          : "Ticket Assigned To"}
                      </label>
                      <div className="normal-dropdown dropdown-setting1 schedule-multi report-multiselect">
                        <Select
                          getOptionLabel={(option) => option.fullName}
                          getOptionValue={
                            (option) => option.userID //id
                          }
                          options={this.state.AssignToData}
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.option.selectassignedto
                              : "Select Assigned To"
                          }
                          closeMenuOnSelect={false}
                          onChange={(e) =>
                            this.setOnChangeReportData(
                              e,
                              "selectedAssignedTo",
                              "multiSelect"
                            )
                          }
                          value={this.state.selectedAssignedTo}
                          isMulti
                        />
                      </div>

                      {this.state.selectedAssignedTo === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.AssignedToCompulsion}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-md-3 ticketreport"
                      style={{
                        display: this.state.Category,
                      }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.category
                          : "Category"}
                      </label>
                      <div className="normal-dropdown dropdown-setting1 schedule-multi report-multiselect">
                        <Select
                          getOptionLabel={(option) => option.categoryName}
                          getOptionValue={
                            (option) => option.categoryID //id
                          }
                          options={this.state.CategoryData}
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.option.selectcategory
                              : "Select Category"
                          }
                          closeMenuOnSelect={false}
                          onChange={(e) =>
                            this.setOnChangeReportData(
                              e,
                              "selectedCategory",
                              "multiSelect"
                            )
                          }
                          value={this.state.selectedCategory}
                          isMulti
                        />
                      </div>

                      {this.state.selectedCategory === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.CategoryCompulsion}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-md-3 ticketreport"
                      style={{
                        display: this.state.TicketStatus,
                      }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.status
                          : "Status"}
                      </label>
                      <div className="normal-dropdown dropdown-setting1 schedule-multi report-multiselect">
                        <Select
                          getOptionLabel={(option) => option.ticketStatusName}
                          getOptionValue={
                            (option) => option.ticketStatusID //id
                          }
                          options={this.state.TicketStatusData}
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.label.status
                              : "Status"
                          }
                          closeMenuOnSelect={false}
                          onChange={(e) =>
                            this.setOnChangeReportData(
                              e,
                              "selectedTicketStatus",
                              "multiSelect"
                            )
                          }
                          value={this.state.selectedTicketStatus}
                          isMulti
                        />
                      </div>

                      {this.state.selectedTicketStatus === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.TicketStatusCompulsion}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-md-3 ticketreport"
                      style={{
                        display: this.state.Wanttovisitstore,
                      }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.wanttovisitstore
                          : "Want To Visit Store"}
                      </label>
                      <select
                        name="selectedWantVisitStore"
                        value={this.state.selectedWantVisitStore}
                        onChange={this.setOnChangeReportData}
                      >
                        <option value="all">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.all
                            : "All"}
                        </option>
                        <option value="yes">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.yes
                            : "Yes"}
                        </option>
                        <option value="no">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.no
                            : "No"}
                        </option>
                      </select>
                      {this.state.selectedWantVisitStore === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.WantVisitStoreCompulsion}
                        </p>
                      )}
                    </div>

                    <div
                      className="col-md-3 ticketreport"
                      style={{
                        display: this.state.SubCategory,
                      }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.subcategory
                          : "Sub Category"}
                      </label>
                      <div className="normal-dropdown dropdown-setting1 schedule-multi report-multiselect">
                        <Select
                          getOptionLabel={(option) => option.subCategoryName}
                          getOptionValue={
                            (option) => option.subCategoryID //id
                          }
                          options={this.state.SubCategoryData}
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.option.selectsubcategory
                              : "Select Subcategory"
                          }
                          closeMenuOnSelect={false}
                          onChange={(e) =>
                            this.setOnChangeReportData(
                              e,
                              "selectedSubCategory",
                              "multiSelect"
                            )
                          }
                          value={this.state.selectedSubCategory}
                          isMulti
                        />
                      </div>

                      {this.state.selectedSubCategory === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.SubCategoryCompulsion}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-md-3 ticketreport"
                      style={{
                        display: this.state.SLAStatus,
                      }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.slastatus
                          : "SLA Status"}
                      </label>
                      <select
                        name="selectedSLAStatus"
                        value={this.state.selectedSLAStatus}
                        onChange={this.setOnChangeReportData}
                      >
                        <option value="0">
                          {TranslationContext !== undefined
                            ? TranslationContext.label.slastatus
                            : "SLA Status"}
                        </option>
                        {this.state.SlaDueData !== null &&
                          this.state.SlaDueData.map((item, i) => (
                            <option key={i} value={item.slaDueID}>
                              {item.slaDueName}
                            </option>
                          ))}
                      </select>
                      {/* <div className="normal-dropdown dropdown-setting1 schedule-multi report-multiselect">
                        <Select
                          getOptionLabel={(option) => option.slaDueName}
                          getOptionValue={
                            (option) => option.slaDueID //id
                          }
                          options={this.state.SlaDueData}
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.label.slastatus
                              : "SLA Status"
                          }
                          closeMenuOnSelect={false}
                          onChange={(e) =>
                            this.setOnChangeReportData(
                              e,
                              "selectedSLAStatus",
                              "multiSelect"
                            )
                          }
                          value={this.state.selectedSLAStatus}
                          isMulti
                        />
                      </div> */}
                    </div>
                    <div
                      className="col-md-3 ticketreport"
                      style={{
                        display: this.state.Wanttovisitstore,
                      }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.visitstorecodeadd
                          : "Want To Visit Store Code/Addres"}
                      </label>
                      <input
                        className="no-bg"
                        type="text"
                        name="selectedVisitStoreAddress"
                        value={this.state.selectedVisitStoreAddress}
                        onChange={this.setOnChangeReportData}
                      />
                      {this.state.selectedVisitStoreAddress.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.VisitStoreAddressCompulsion}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-md-3 ticketreport"
                      style={{
                        display: this.state.IssueType,
                      }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.issuetype
                          : "Issue Type"}
                      </label>
                      <div className="normal-dropdown dropdown-setting1 schedule-multi report-multiselect">
                        <Select
                          getOptionLabel={(option) => option.issueTypeName}
                          getOptionValue={
                            (option) => option.issueTypeID //id
                          }
                          options={this.state.IssueTypeData}
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.option.selectissuetype
                              : "Select IssueType"
                          }
                          closeMenuOnSelect={false}
                          onChange={(e) =>
                            this.setOnChangeReportData(
                              e,
                              "selectedIssueType",
                              "multiSelect"
                            )
                          }
                          value={this.state.selectedIssueType}
                          isMulti
                        />
                      </div>

                      {this.state.selectedIssueType === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.IssueTypeCompulsion}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-md-3 ticketreport"
                      style={{
                        display: this.state.ClaimID,
                      }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.claimid
                          : "Claim ID"}
                      </label>
                      <input
                        className="no-bg"
                        type="text"
                        maxLength={11}
                        name="selectedClaimID"
                        value={this.state.selectedClaimID}
                        onChange={this.setOnChangeReportData}
                      />
                      {this.state.selectedClaimID.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.ClaimIDCompulsion}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-md-3 ticketreport"
                      style={{
                        display: this.state.PurchaseStoreCodeAddress,
                      }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.purchasestore
                          : "Purchase Store"}
                      </label>
                      <input
                        className="no-bg"
                        type="text"
                        name="selectedPurchaseStore"
                        value={this.state.selectedPurchaseStore}
                        onChange={this.setOnChangeReportData}
                      />
                      {this.state.selectedPurchaseStore.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.PurchaseStoreCompulsion}
                        </p>
                      )}
                    </div>
                    <div
                      className="col-md-3"
                    >
                      <div className="search_div " style={{ backgroundColor: "#ECF2F4", border: "none" }}>
                        <div className="search_header">
                          <h3>IsLastDayReport</h3>
                          <div className="order_type">
                            <label className="switch">
                              <input type="checkbox"
                                checked={this.state.isLastDayReport}
                                onChange={this.handleLastDayReport}
                              />
                              <span className="slider round"></span>
                            </label>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>

                  <div className="row borderbottom">
                    <div className="col-md-12"></div>
                  </div>

                  <div className="row">
                    <div
                      className="col-md-3 ticketreport"
                      style={{ display: this.state.WithClaim }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.withclaim
                          : "With Claim"}
                      </label>
                      <select
                        name="selectedWithClaim"
                        value={this.state.selectedWithClaim}
                        onChange={this.setOnChangeReportData}
                      >
                        <option value="no">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.no
                            : "No"}
                        </option>
                        <option value="yes">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.yes
                            : "Yes"}
                        </option>
                      </select>
                    </div>
                    <div
                      className="col-md-3 ticketreport"
                      style={{ display: this.state.WithTask }}
                    >
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.withtask
                          : "With Task"}
                      </label>
                      <select
                        name="selectedWithTaskAll"
                        value={this.state.selectedWithTaskAll}
                        onChange={this.setOnChangeReportData}
                      >
                        <option value="no">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.no
                            : "No"}
                        </option>
                        <option value="yes">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.yes
                            : "Yes"}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      {this.state.selectedWithClaim === "yes" ? (
                        <>
                          <label>
                            {TranslationContext !== undefined
                              ? TranslationContext.label.claimstatus
                              : "Claim Status"}
                          </label>
                          <div className="normal-dropdown dropdown-setting1 schedule-multi report-multiselect">
                            <Select
                              getOptionLabel={(option) =>
                                option.claimStatusName
                              }
                              getOptionValue={
                                (option) => option.claimStatusID //id
                              }
                              options={this.state.ClaimStatusData}
                              placeholder={
                                TranslationContext !== undefined
                                  ? TranslationContext.label.claimstatus
                                  : "Claim Status"
                              }
                              closeMenuOnSelect={false}
                              onChange={(e) =>
                                this.setOnChangeReportData(
                                  e,
                                  "selectedClaimStatus",
                                  "multiSelect"
                                )
                              }
                              value={this.state.selectedClaimStatus}
                              isMulti
                            />
                          </div>

                          {this.state.selectedClaimStatus === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.ClaimStatusCompulsion}
                            </p>
                          )}
                        </>
                      ) : null}
                    </div>

                    <div className="col-md-3 ticketreport">
                      {this.state.selectedWithTaskAll === "yes" ? (
                        <>
                          <label>
                            {TranslationContext !== undefined
                              ? TranslationContext.label.taskstatus
                              : "Task Status"}
                          </label>
                          <div className="normal-dropdown dropdown-setting1 schedule-multi report-multiselect">
                            <Select
                              getOptionLabel={(option) => option.taskStatusName}
                              getOptionValue={
                                (option) => option.taskStatusID //id
                              }
                              options={this.state.TaskStatusData}
                              placeholder={
                                TranslationContext !== undefined
                                  ? TranslationContext.label.taskstatus
                                  : "Task Status"
                              }
                              closeMenuOnSelect={false}
                              onChange={(e) =>
                                this.setOnChangeReportData(
                                  e,
                                  "selectedTaskStatus",
                                  "multiSelect"
                                )
                              }
                              value={this.state.selectedTaskStatus}
                              isMulti
                            />
                          </div>

                          {this.state.selectedTaskStatus === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.TaskStatusCompulsion}
                            </p>
                          )}
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      {this.state.selectedWithClaim === "yes" ? (
                        <>
                          <label>
                            {TranslationContext !== undefined
                              ? TranslationContext.label.claimcategory
                              : "Claim Category"}
                          </label>
                          <div className="normal-dropdown dropdown-setting1 schedule-multi report-multiselect">
                            <Select
                              getOptionLabel={(option) => option.categoryName}
                              getOptionValue={
                                (option) => option.categoryID //id
                              }
                              options={this.state.CategoryData}
                              placeholder={
                                TranslationContext !== undefined
                                  ? TranslationContext.label.claimcategory
                                  : "Claim Category"
                              }
                              closeMenuOnSelect={false}
                              onChange={(e) =>
                                this.setOnChangeReportData(
                                  e,
                                  "selectedClaimCategory",
                                  "multiSelect"
                                )
                              }
                              value={this.state.selectedClaimCategory}
                              isMulti
                            />
                          </div>

                          {this.state.selectedClaimCategory === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.ClaimCategoryCompulsion}
                            </p>
                          )}
                        </>
                      ) : null}
                    </div>
                    <div className="col-md-3 ticketreport">
                      {this.state.selectedWithTaskAll === "yes" ? (
                        <>
                          <label>
                            {TranslationContext !== undefined
                              ? TranslationContext.label.taskpriority
                              : "Task Priority"}
                          </label>
                          <div className="normal-dropdown dropdown-setting1 schedule-multi report-multiselect">
                            <Select
                              getOptionLabel={(option) => option.priortyName}
                              getOptionValue={
                                (option) => option.priorityID //id
                              }
                              options={this.state.TicketPriorityData}
                              placeholder={
                                TranslationContext !== undefined
                                  ? TranslationContext.label.taskpriority
                                  : "Task Priority"
                              }
                              closeMenuOnSelect={false}
                              onChange={(e) =>
                                this.setOnChangeReportData(
                                  e,
                                  "selectedTaskPriority",
                                  "multiSelect"
                                )
                              }
                              value={this.state.selectedTaskPriority}
                              isMulti
                            />
                          </div>

                          {this.state.selectedTaskPriority === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.TaskPriorityCompulsion}
                            </p>
                          )}
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      {this.state.selectedWithClaim === "yes" ? (
                        <>
                          <label>
                            {TranslationContext !== undefined
                              ? TranslationContext.label.claimsubcategory
                              : "Claim Sub Category"}
                          </label>
                          <div className="normal-dropdown dropdown-setting1 schedule-multi report-multiselect">
                            <Select
                              getOptionLabel={(option) =>
                                option.subCategoryName
                              }
                              getOptionValue={
                                (option) => option.subCategoryID //id
                              }
                              options={this.state.SubCategoryData}
                              placeholder={
                                TranslationContext !== undefined
                                  ? TranslationContext.label.claimsubcategory
                                  : "Claim Sub Category"
                              }
                              closeMenuOnSelect={false}
                              onChange={(e) =>
                                this.setOnChangeReportData(
                                  e,
                                  "selectedClaimSubCategory",
                                  "multiSelect"
                                )
                              }
                              value={this.state.selectedClaimSubCategory}
                              isMulti
                            />
                          </div>

                          {this.state.selectedClaimSubCategory === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.ClaimSubCategoryCompulsion}
                            </p>
                          )}
                        </>
                      ) : null}
                    </div>
                    <div className="col-md-3 ticketreport">
                      {this.state.selectedWithTaskAll === "yes" ? (
                        <>
                          <label>
                            {TranslationContext !== undefined
                              ? TranslationContext.label.taskdepartment
                              : "Task Department"}
                          </label>
                          <div className="normal-dropdown dropdown-setting1 schedule-multi report-multiselect">
                            <Select
                              getOptionLabel={(option) => option.departmentName}
                              getOptionValue={
                                (option) => option.departmentID //id
                              }
                              options={this.state.DepartmentData}
                              placeholder={
                                TranslationContext !== undefined
                                  ? TranslationContext.label.taskdepartment
                                  : "Task Department"
                              }
                              closeMenuOnSelect={false}
                              onChange={(e) =>
                                this.setOnChangeReportData(
                                  e,
                                  "selectedDepartment",
                                  "multiSelect"
                                )
                              }
                              value={this.state.selectedDepartment}
                              isMulti
                            />
                          </div>

                          {this.state.selectedDepartment === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.DepartmentCompulsion}
                            </p>
                          )}
                        </>
                      ) : null}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-3 ticketreport">
                      {this.state.selectedWithClaim === "yes" ? (
                        <>
                          <label>
                            {TranslationContext !== undefined
                              ? TranslationContext.label.claimissuetype
                              : "Claim Issue Type"}
                          </label>
                          <div className="normal-dropdown dropdown-setting1 schedule-multi report-multiselect">
                            <Select
                              getOptionLabel={(option) => option.issueTypeName}
                              getOptionValue={
                                (option) => option.issueTypeID //id
                              }
                              options={this.state.IssueTypeData}
                              placeholder={
                                TranslationContext !== undefined
                                  ? TranslationContext.label.claimissuetype
                                  : "Claim Issue Type"
                              }
                              closeMenuOnSelect={false}
                              onChange={(e) =>
                                this.setOnChangeReportData(
                                  e,
                                  "selectedClaimIssueType",
                                  "multiSelect"
                                )
                              }
                              value={this.state.selectedClaimIssueType}
                              isMulti
                            />
                          </div>

                          {this.state.selectedClaimIssueType === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.ClaimIssueTypeCompulsion}
                            </p>
                          )}
                        </>
                      ) : null}
                    </div>
                    <div className="col-md-3 ticketreport">
                      {this.state.selectedWithTaskAll === "yes" ? (
                        <>
                          <label>
                            {TranslationContext !== undefined
                              ? TranslationContext.label.taskfunction
                              : "Task Function"}
                          </label>
                          <div className="normal-dropdown dropdown-setting1 schedule-multi report-multiselect">
                            <Select
                              getOptionLabel={(option) => option.funcationName}
                              getOptionValue={
                                (option) => option.functionID //id
                              }
                              options={this.state.FunctionData}
                              placeholder={
                                TranslationContext !== undefined
                                  ? TranslationContext.label.taskfunction
                                  : "Task Function"
                              }
                              closeMenuOnSelect={false}
                              onChange={(e) =>
                                this.setOnChangeReportData(
                                  e,
                                  "selectedFunction",
                                  "multiSelect"
                                )
                              }
                              value={this.state.selectedFunction}
                              isMulti
                            />
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                  <div className="row nextbutton1">
                    <div className="nextbutton">
                      <button
                        className="nextbutton-text"
                        type="submit"
                        onClick={this.handleChangeTab.bind(this, 1)}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.button.next
                          : "NEXT"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${this.state.tabIndex === 1 &&
                  "show active"}`}
                id="chat-tab"
                role="tabpanel"
                aria-labelledby="chat-tab"
              >
                <div className="container reportpad">
                  <div className="row">
                    <div className="col-md-4 ticketreport">
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.chatid
                          : "Chat Id"}
                      </label>
                      <input className="no-bg" type="text" maxLength={11} />
                    </div>
                    <div className="col-md-4 ticketreport">
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.chatstatusremark
                          : "Chat Status Remark"}
                      </label>
                      <select>
                        <option>
                          {TranslationContext !== undefined
                            ? TranslationContext.option.onchatresolution
                            : "On Chat Resolution"}
                        </option>
                        <option>
                          {TranslationContext !== undefined
                            ? TranslationContext.option.resolution
                            : "Resolution"}
                        </option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketreport">
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.chatratings
                          : "Chat Ratings"}
                      </label>
                      <select>
                        <option>
                          {TranslationContext !== undefined
                            ? TranslationContext.option.good
                            : "Good"}
                        </option>
                        <option>
                          {TranslationContext !== undefined
                            ? TranslationContext.option.bad
                            : "Bad"}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 ticketreport">
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.chatdate
                          : "Chat Date"}
                      </label>
                      <div className="ticketreportdat">
                        <DatePicker
                          selected={this.state.ChatDate}
                          onChange={this.handleChatDate.bind(this)}
                          placeholderText={
                            TranslationContext !== undefined
                              ? TranslationContext.label.chatdate
                              : "Chat Date"
                          }
                          showMonthDropdown
                          showYearDropdown
                        />
                      </div>
                    </div>
                    <div className="col-md-4 ticketreport">
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.ticketid
                          : "Ticket ID"}
                      </label>
                      <input className="no-bg" type="text" maxLength={11} />
                    </div>
                    <div className="col-md-4 ticketreport">
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.customeremailid
                          : "Customer Email ID"}
                      </label>
                      <input className="no-bg" type="text" maxLength={100} />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-4 ticketreport">
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.chatstatus
                          : "Chat Status"}
                      </label>
                      <select>
                        <option>
                          {TranslationContext !== undefined
                            ? TranslationContext.option.chatstart
                            : "Chat Start"}
                        </option>
                        <option>
                          {TranslationContext !== undefined
                            ? TranslationContext.option.chatend
                            : "Chat End"}
                        </option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketreport">
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.chatassignedto
                          : "Chat Assigned To"}
                      </label>
                      <select>
                        <option>Naman</option>
                        <option>Naman R.</option>
                      </select>
                    </div>
                    <div className="col-md-4 ticketreport">
                      <label>Customer Mobile No.</label>
                      <input className="no-bg" type="text" maxLength={10} />
                    </div>
                  </div>
                  <div className="row nextbutton1">
                    <div className="nextbutton">
                      <button
                        className="nextbutton-text"
                        type="submit"
                        onClick={this.handleNextPopupOpen}
                      >
                        NEXT
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Modal>

          <Modal
            open={this.state.OpenDefaultMailModal}
            onClose={this.handleDefaultMailPopupClose}
            closeIconId="sdsg"
            modalId="nextdefaultpopup"
            classNames={{
              modal: "schedule-width",
            }}
            overlayId="logout-ovrly"
          >
            <div className="" id="EmailID">
              <div className="total-tic-title">
                <label>
                  <b>Mail</b>
                </label>
              </div>
              <div>
                <div id="dvAssignedTo" className="ticketreport">
                  Email ID
                  <div className="normal-dropdown dropdown-setting1 schedule-multi mt-2">
                    <input
                      type="text"
                      className="txt-1"
                      placeholder="Enter email id"
                      name="email_"
                      maxLength={100}
                      value={this.state.DefaultEmailID}
                      onChange={this.setDefaultEmail.bind(this)}
                    />
                  </div>
                  {this.validator.message(
                    "Email Id",
                    this.state.DefaultEmailID,
                    "required|email"
                  )}
                  <span
                    id="spnMailError"
                    className="cls-spnerror"
                    style={{ color: "red" }}
                  ></span>
                </div>
              </div>
            </div>
            <div>
              <button
                className="scheduleBtn"
                onClick={this.sentMail.bind(this)}
                disabled={this.state.loadingDownload}
              >
                {this.state.loadingDownload ? (
                  <FontAwesomeIcon
                    className="circular-loader"
                    icon={faCircleNotch}
                    spin
                  />
                ) : (
                  ""
                )}
                <label className="addLable">
                  {this.state.loadingDownload ? "Please Wait ..." : "Send"}
                </label>
              </button>
            </div>
            <div onClick={this.handleDefaultMailPopupClose}>
              <button type="button" className="scheduleBtncancel mt-3 w-100">
                CANCEL
              </button>
            </div>
          </Modal>

          <Modal
            open={this.state.OpenDefaultModal}
            onClose={this.handleDefaultPopupClose}
            closeIconId="sdsg"
            modalId="nextdefaultpopup"
            classNames={{
              modal: "schedule-width",
            }}
            overlayId="logout-ovrly"
          >
            <div className="" id="TotalTicketCreated">
              <div className="total-tic-title">
                <label>
                  <b>{this.state.DefaultPopupName}</b>
                </label>
              </div>
              <div>
                <div id="dvAssignedTo" className="cls-hide ticketreport">
                  {TranslationContext !== undefined
                    ? TranslationContext.div.assignedto
                    : "Assigned To"}
                  <div className="normal-dropdown dropdown-setting1 schedule-multi mt-2">
                    <Select
                      getOptionLabel={(option) => option.fullName}
                      getOptionValue={
                        (option) => option.userID //id
                      }
                      options={this.state.AssignToData}
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.p.teammember
                          : "Team Member"
                      }
                      closeMenuOnSelect={false}
                      onChange={this.setDefaultTeamMember.bind(this)}
                      value={this.state.SelectedDefaultTeamMember}
                      isMulti
                    />
                  </div>
                  <span
                    id="spnAssignedTo"
                    className="cls-spnerror"
                    style={{ color: "red" }}
                  ></span>
                </div>
                <div id="dvMultiStatus" className="cls-hide ticketreport">
                  {TranslationContext !== undefined
                    ? TranslationContext.div.ticketstatus
                    : "Ticket Status"}
                  <div className="normal-dropdown dropdown-setting1 schedule-multi mt-2">
                    <Select
                      getOptionLabel={(option) => option.ticketStatusName}
                      getOptionValue={
                        (option) => option.ticketStatusID //id
                      }
                      options={this.state.TicketStatusData}
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.div.ticketstatus
                          : "Ticket Status"
                      }
                      closeMenuOnSelect={false}
                      onChange={this.setDefaultMutiStatus.bind(this)}
                      value={this.state.SelectedTicketMultiStatus}
                      isMulti
                    />
                  </div>
                  <span
                    id="spnTicketStatus"
                    className="cls-spnerror"
                    style={{ color: "red" }}
                  ></span>
                </div>
              </div>
              <div
                id="TicketClosedFrom"
                className="cls-hide ticketreport down-tic-rep"
              >
                {TranslationContext !== undefined
                  ? TranslationContext.div.ticketclosedfrom
                  : "Ticket Closed From"}
                <div className="ticketreportdat mt-2">
                  <DatePicker
                    selected={this.state.TicketClosedFrom}
                    onChange={this.handleTicketClosedFrom.bind(this)}
                    placeholderText={
                      TranslationContext !== undefined
                        ? TranslationContext.div.ticketclosedfrom
                        : "Ticket Closed From"
                    }
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    value={this.state.TicketClosedFrom}
                    maxDate={this.state.calendarEndDate}
                  />
                </div>
                <span
                  id="spnTicketClosedFrom"
                  className="cls-spnerror"
                  style={{ color: "red" }}
                ></span>
              </div>
              <div
                id="TicketClosedTo"
                className="cls-hide ticketreport down-tic-rep"
              >
                {TranslationContext !== undefined
                  ? TranslationContext.div.ticketclosedto
                  : "Ticket Closed To"}
                <div className="ticketreportdat mt-2">
                  <DatePicker
                    selected={this.state.TicketClosedTo}
                    onChange={this.handleTicketClosedTo.bind(this)}
                    placeholderText={
                      TranslationContext !== undefined
                        ? TranslationContext.div.ticketclosedto
                        : "Ticket Closed To"
                    }
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    value={this.state.TicketClosedTo}
                    maxDate={this.state.calendarEndDate}
                  />
                </div>
                <span
                  id="spnTicketClosedTo"
                  className="cls-spnerror"
                  style={{ color: "red" }}
                ></span>
              </div>
              <div id="FromDate" className="cls-hide ticketreport down-tic-rep">
                {TranslationContext !== undefined
                  ? TranslationContext.div.ticketfromdate
                  : "Ticket From Date"}
                <div className="ticketreportdat mt-2">
                  <DatePicker
                    selected={this.state.TicketCreatedFromDate}
                    onChange={this.handleTicketCreateDate.bind(this)}
                    placeholderText={
                      TranslationContext !== undefined
                        ? TranslationContext.p.createddate
                        : "Creation Date"
                    }
                    showMonthDropdown
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    maxDate={this.state.calendarEndDate}
                    value={this.state.TicketCreatedFromDate}
                  />
                </div>
                <span
                  id="spnTicketFromDate"
                  className="cls-spnerror"
                  style={{ color: "red" }}
                ></span>
              </div>
              <div className="ticketreport down-tic-rep">
                {TranslationContext !== undefined
                  ? TranslationContext.div.tickettodate
                  : "Ticket To Date"}
                <div className="ticketreportdat mt-2">
                  <DatePicker
                    selected={this.state.TicketCreatedEndDate}
                    onChange={this.handleTicketCreateToDate.bind(this)}
                    placeholderText={
                      TranslationContext !== undefined
                        ? TranslationContext.div.todate
                        : "To Date"
                    }
                    showMonthDropdown
                    showYearDropdown
                    maxDate={this.state.calendarEndDate}
                    dateFormat="dd/MM/yyyy"
                    value={this.state.TicketCreatedEndDate}
                  />
                </div>
                <span
                  id="spnTicketToDate"
                  className="cls-spnerror"
                  style={{ color: "red" }}
                ></span>
              </div>
              <div className="ticketreport" id="TicketSource">
                {TranslationContext !== undefined
                  ? TranslationContext.div.ticketsource
                  : "Ticket Source"}
                <div className="mt-2 normal-dropdown dropdown-setting1 schedule-multi">
                  <Select
                    getOptionLabel={(option) => option.ticketSourceName}
                    getOptionValue={
                      (option) => option.ticketSourceId //id
                    }
                    options={this.state.TicketSourceData}
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.div.ticketsource
                        : "Ticket Source"
                    }
                    closeMenuOnSelect={false}
                    onChange={this.setCreatedTicketSource.bind(this)}
                    value={this.state.SelectedSourceIds}
                    isMulti
                  />
                </div>
                <span
                  id="spnTicketSource"
                  className="cls-spnerror"
                  style={{ color: "red" }}
                ></span>
              </div>
              <div id="TicketStatus" className="ticketreport cls-hide">
                {TranslationContext !== undefined
                  ? TranslationContext.div.status
                  : "Status"}
                <div className="mt-2">
                  <select
                    id="drpDefaultStatus"
                    className="w-100 normal-dropdown dropdown-setting1"
                    name="selectedDefaultTicketStatus"
                    value={this.state.selectedDefaultTicketStatus}
                    onChange={this.setDefaultTicketStatus}
                  >
                    <option>
                      {TranslationContext !== undefined
                        ? TranslationContext.div.status
                        : "Status"}
                    </option>
                    {this.state.TicketStatusData !== null &&
                      this.state.TicketStatusData.map((item, i) => (
                        <option key={i} value={item.ticketStatusID}>
                          {item.ticketStatusName}
                        </option>
                      ))}
                  </select>
                  {this.state.selectedDefaultTicketStatus === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.TicketStatusCompulsion}
                    </p>
                  )}
                </div>
                <span
                  id="spnStatus"
                  className="cls-spnerror"
                  style={{ color: "red" }}
                ></span>
              </div>
            </div>
            <div>
              <button
                className="scheduleBtn"
                onClick={this.downloadDefaultReport.bind(this)}
                disabled={this.state.loadingDownload}
              >
                {this.state.loadingDownload ? (
                  <FontAwesomeIcon
                    className="circular-loader"
                    icon={faCircleNotch}
                    spin
                  />
                ) : (
                  ""
                )}
                <label className="addLable">
                  {this.state.loadingDownload
                    ? TranslationContext !== undefined
                      ? TranslationContext.tip.pleasewait
                      : "Please Wait ..."
                    : TranslationContext !== undefined
                      ? TranslationContext.button.download
                      : "Download"}
                </label>
              </button>
            </div>
            <div onClick={this.handleDefaultPopupClose}>
              <button type="button" className="scheduleBtncancel mt-3 w-100">
                {TranslationContext !== undefined
                  ? TranslationContext.button.cancel
                  : "CANCEL"}
              </button>
            </div>
          </Modal>

          <Modal
            open={this.state.NextPopup}
            onClose={this.handleNextPopupClose}
            closeIconId="sdsg"
            modalId="nextbuttonpopup"
          >
            <div className="container contpaddre">
              <div className="setting-tabs entercenter">
                <label className="reportdetail">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.enterreportdetails
                    : "Enter Report Details"}
                </label>
                <img
                  src={CancelImg}
                  alt="CancelImg"
                  className="cancelnextpopup"
                  onClick={this.handleNextPopupClose.bind(this)}
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="totalresultcircle">
                    <label className="totalresult">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.totalresult
                        : "Total Result"}
                    </label>
                    <span className="totalresultnumber">
                      {this.state.totalResultCount}
                    </span>
                  </div>
                </div>
                <div className="col-md-6 rname">
                  <div className="ranmetext">
                    <label className="renametext">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.reportname
                        : "Report Name"}
                    </label>
                    <input
                      className="no-bg"
                      type="text"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.label.reportname
                          : "Report Name"
                      }
                      maxLength={25}
                      name="selectedReportName"
                      value={this.state.selectedReportName}
                      onChange={this.setOnChangeReportData}
                    />
                  </div>
                  <div className="buttonschdulesave">
                    <button
                      className="Schedulenext"
                      onClick={this.ScheduleOpenModel}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.button.schedule
                        : "SCHEDULE"}
                    </button>
                  </div>
                  <Modal
                    onClose={this.ScheduleCloseModel}
                    open={this.state.Schedule}
                    modalId="ScheduleModel"
                    classNames={{
                      modal: "schedule-width",
                    }}
                    overlayId="logout-ovrly"
                  >
                    <div>
                      <label>
                        <b>
                          {TranslationContext !== undefined
                            ? TranslationContext.b.scheduledateto
                            : "Schedule date to"}
                        </b>
                      </label>
                      <div>
                        <div className="normal-dropdown dropdown-setting1 schedule-multi">
                          <Select
                            getOptionLabel={(option) => option.fullName}
                            getOptionValue={
                              (option) => option.userID //id
                            }
                            options={this.state.AssignToData}
                            placeholder={
                              TranslationContext !== undefined
                                ? TranslationContext.p.teammember
                                : "Team Member"
                            }
                            closeMenuOnSelect={false}
                            onChange={this.setTeamMember.bind(this)}
                            value={this.state.selectedTeamMember}
                            isMulti
                          />
                        </div>
                        <select
                          id="inputState"
                          className="form-control dropdown-setting1 ScheduleDate-to"
                          value={this.state.selectScheduleDate}
                          onChange={this.handleScheduleDateChange}
                        >
                          {this.state.ScheduleOption !== null &&
                            this.state.ScheduleOption.map((item, i) => (
                              <option key={i} value={item.scheduleID}>
                                {item.scheduleName}
                              </option>
                            ))}
                        </select>
                        {this.state.selectScheduleDate === "230" ||
                          this.state.selectScheduleDate === 230 ? (
                          <div className="ScheduleDate-to">
                            <span>
                              <label className="every1">
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.every
                                  : "Every"}
                              </label>
                              <input
                                type="text"
                                className="Every"
                                placeholder="1"
                                name="selectedNoOfDay"
                                value={this.state.selectedNoOfDay}
                                onChange={this.setOnChangeReportData}
                              />
                              <label className="every1">
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.day
                                  : "Day"}
                              </label>
                            </span>
                          </div>
                        ) : null}
                        {this.state.selectScheduleDate === "231" ||
                          this.state.selectScheduleDate === 231 ? (
                          <div className="ScheduleDate-to">
                            <span>
                              <label className="every1">
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.every
                                  : "Every"}
                              </label>
                              <input
                                type="text"
                                className="Every"
                                placeholder="1"
                                value={this.state.selectedNoOfWeek}
                                onChange={this.handleWeekly}
                              />
                              <label className="every1">
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.weekon
                                  : "Week on"}
                              </label>
                            </span>
                            <div
                              style={{
                                marginTop: "10px",
                              }}
                            >
                              <Checkbox
                                onChange={this.handleWeeklyDays}
                                value="Mon"
                                id="Mon"
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.checkbox.mon
                                  : "Mon"}
                              </Checkbox>
                              <Checkbox
                                onChange={this.handleWeeklyDays}
                                value="Tue"
                                id="Tue"
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.checkbox.tue
                                  : "Tue"}
                              </Checkbox>
                              <Checkbox
                                onChange={this.handleWeeklyDays}
                                value="Wed"
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.checkbox.wed
                                  : "Wed"}
                              </Checkbox>
                              <Checkbox
                                onChange={this.handleWeeklyDays}
                                value="Thu"
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.checkbox.thu
                                  : "Thu"}
                              </Checkbox>
                              <Checkbox
                                onChange={this.handleWeeklyDays}
                                value="Fri"
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.checkbox.fri
                                  : "Fri"}
                              </Checkbox>
                              <Checkbox
                                onChange={this.handleWeeklyDays}
                                value="Sat"
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.checkbox.sat
                                  : "Sat"}
                              </Checkbox>
                              <Checkbox
                                onChange={this.handleWeeklyDays}
                                value="Sun"
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.checkbox.sun
                                  : "Sun"}
                              </Checkbox>
                            </div>
                          </div>
                        ) : null}
                        {this.state.selectScheduleDate === "232" ||
                          this.state.selectScheduleDate === 232 ? (
                          <div className="ScheduleDate-to">
                            <span>
                              <label className="every1">
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.day
                                  : "Day"}
                              </label>
                              <input
                                type="text"
                                className="Every"
                                placeholder="9"
                                value={this.state.selectedNoOfDaysForMonth}
                                onChange={this.handleDaysForMonth}
                              />
                              <label className="every1">
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.ofevery
                                  : "of every"}
                              </label>
                              <input
                                type="text"
                                className="Every"
                                placeholder="1"
                                value={this.state.selectedNoOfMonthForMonth}
                                onChange={this.handleMonthForMonth}
                              />
                              <label className="every1">
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.months
                                  : "months"}
                              </label>
                            </span>
                          </div>
                        ) : null}
                        {this.state.selectScheduleDate === "233" ||
                          this.state.selectScheduleDate === 233 ? (
                          <div className="ScheduleDate-to">
                            <span>
                              <label className="every1">
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.every
                                  : "Every"}
                              </label>
                              <input
                                type="text"
                                className="Every"
                                placeholder="1"
                                onChange={this.handleMonthForWeek}
                                value={this.state.selectedNoOfMonthForWeek}
                              />
                              <label className="every1">
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.monthonthe
                                  : "month on the"}
                              </label>
                            </span>
                            <div className="row mt-3">
                              <div className="col-md-6">
                                <select
                                  id="inputState"
                                  className="form-control dropdown-setting1"
                                  onChange={this.handleWeekForWeek}
                                  value={this.state.selectedNoOfWeekForWeek}
                                >
                                  <option value="0">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.option.select
                                      : "Select"}
                                  </option>
                                  <option value="2">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.option.second
                                      : "Second"}
                                  </option>
                                  <option value="4">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.option.fourth
                                      : "Four"}
                                  </option>
                                </select>
                              </div>
                              <div className="col-md-6">
                                <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                                  <Select
                                    getOptionLabel={(option) => option.days}
                                    getOptionValue={
                                      (option) => option.days //id
                                    }
                                    options={this.state.NameOfDayForWeek}
                                    placeholder={
                                      TranslationContext !== undefined
                                        ? TranslationContext.option.select
                                        : "Select"
                                    }
                                    closeMenuOnSelect={false}
                                    onChange={this.setNameOfDayForWeek.bind(
                                      this
                                    )}
                                    value={this.state.selectedNameOfDayForWeek}
                                    isMulti
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                        {this.state.selectScheduleDate === "234" ||
                          this.state.selectScheduleDate === 234 ? (
                          <div className="ScheduleDate-to">
                            <div className="row m-0">
                              <label
                                className="every1"
                                style={{
                                  lineHeight: "40px",
                                }}
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.on
                                  : "on"}
                              </label>
                              <div className="col-md-7">
                                <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                                  <Select
                                    getOptionLabel={(option) => option.month}
                                    getOptionValue={
                                      (option) => option.month //id
                                    }
                                    options={this.state.NameOfMonthForYear}
                                    placeholder={
                                      TranslationContext !== undefined
                                        ? TranslationContext.option.select
                                        : "Select"
                                    }
                                    closeMenuOnSelect={false}
                                    onChange={this.setNameOfMonthForYear.bind(
                                      this
                                    )}
                                    value={
                                      this.state.selectedNameOfMonthForYear
                                    }
                                    isMulti
                                  />
                                </div>
                              </div>
                              <input
                                type="text"
                                className="Every"
                                placeholder="1"
                                value={this.state.selectedNoOfDayForDailyYear}
                                onChange={this.handleDayForYear}
                              />
                            </div>
                          </div>
                        ) : null}
                        {this.state.selectScheduleDate === "235" ||
                          this.state.selectScheduleDate === 235 ? (
                          <div className="ScheduleDate-to">
                            <span>
                              <div className="row m-0">
                                <label
                                  className="every1"
                                  style={{
                                    lineHeight: "40px",
                                  }}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.label.onthe
                                    : "on the"}
                                </label>
                                <div className="col-md-7">
                                  <select
                                    id="inputState"
                                    className="form-control dropdown-setting1"
                                    onChange={this.handleWeekForYear}
                                    value={this.state.selectedNoOfWeekForYear}
                                  >
                                    <option value="0">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option.select
                                        : "Select"}
                                    </option>
                                    <option value="2">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option.second
                                        : "Second"}
                                    </option>
                                    <option value="4">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.option.fourth
                                        : "Four"}
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </span>
                            <div className="row mt-3">
                              <div className="col-md-5">
                                <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                                  <Select
                                    getOptionLabel={(option) => option.days}
                                    getOptionValue={
                                      (option) => option.days //id
                                    }
                                    options={this.state.NameOfDayForYear}
                                    placeholder={
                                      TranslationContext !== undefined
                                        ? TranslationContext.option.select
                                        : "Select"
                                    }
                                    closeMenuOnSelect={false}
                                    onChange={this.setNameOfDayForYear.bind(
                                      this
                                    )}
                                    value={this.state.selectedNameOfDayForYear}
                                    isMulti
                                  />
                                </div>
                              </div>
                              <label
                                className="every1"
                                style={{
                                  lineHeight: "40px",
                                  marginLeft: "14px",
                                }}
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.to
                                  : "to"}
                              </label>
                              <div className="col-md-5">
                                <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                                  <Select
                                    getOptionLabel={(option) => option.month}
                                    getOptionValue={
                                      (option) => option.month //id
                                    }
                                    options={this.state.NameOfMonthForDailyYear}
                                    placeholder={
                                      TranslationContext !== undefined
                                        ? TranslationContext.option.select
                                        : "Select"
                                    }
                                    closeMenuOnSelect={false}
                                    onChange={this.setNameOfMonthForDailyYear.bind(
                                      this
                                    )}
                                    value={
                                      this.state.selectedNameOfMonthForDailyYear
                                    }
                                    isMulti
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}

                        <div className="dash-timepicker">
                          <DatePicker
                            selected={this.state.selectedScheduleTime}
                            onChange={this.handleScheduleTime.bind(this)}
                            placeholderText="11 AM"
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={60}
                            timeCaption="Select Time"
                            dateFormat="h:mm aa"
                            className="txt-1 txt1Place txt1Time"
                            value={this.state.selectedScheduleTime}
                          />
                        </div>

                        <div>
                          <button
                            className="scheduleBtn"
                            onClick={this.handleInsertReport.bind(this)}
                          >
                            <label className="addLable">SCHEDULE</label>
                          </button>
                        </div>
                        <div onClick={this.ScheduleCloseModel}>
                          <button type="button" className="scheduleBtncancel">
                            {TranslationContext !== undefined
                              ? TranslationContext.button.cancel
                              : "CANCEL"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </Modal>
                  <div className="buttonschdulesave1">
                    <button onClick={this.handleSave} className="Schedulenext1">
                      {TranslationContext !== undefined
                        ? TranslationContext.button.save
                        : "SAVE"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr settingtable reactreport">
            <div style={{ backgroundColor: "#fff" }}>
              {this.state.loading === true ? (
                <div className="loader-icon"></div>
              ) : (
                <div className="settings-align">
                  <ReactTable
                    data={datareport}
                    columns={[
                      {
                        Header: (
                          <span
                            className={this.state.nameColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "reportName",
                              TranslationContext !== undefined
                                ? TranslationContext.label.reportname
                                : "Report Name"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.name
                              : "Name"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "reportName",
                      },
                      {
                        Header: (
                          <span
                            className={this.state.scheduleColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "scheduleStatus",
                              TranslationContext !== undefined
                                ? TranslationContext.span.schedulestatus
                                : "Schedule Status"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.schedulestatus
                              : "Schedule Status"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "scheduleStatus",
                      },
                      {
                        Header: (
                          <span
                            className={this.state.createdColor}
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
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "createdBy",
                        Cell: (row) => {
                          var ids = row.original["reportID"];
                          return (
                            <div>
                              <span className="one-liner">
                                {row.original.createdBy}
                                <Popover
                                  content={
                                    <div className="settings-created-by-popover">
                                      <div>
                                        <b>
                                          <p className="title">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p.createdby
                                              : "Created By"}
                                            : {row.original.createdBy}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p.createddate
                                            : "Created Date"}
                                          : {row.original.createdDate}
                                        </p>
                                      </div>
                                      <div>
                                        <b>
                                          <p className="title">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p.updatedby
                                              : "Updated By"}
                                            : {row.original.modifiedBy}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p.updateddate
                                            : "Updated Date"}
                                          : {row.original.modifiedDate}
                                        </p>
                                      </div>
                                    </div>
                                  }
                                  placement="bottom"
                                >
                                  <img
                                    className="info-icon-cp"
                                    src={BlackInfoIcon}
                                    alt="info-icon"
                                    id={ids}
                                  />
                                </Popover>
                              </span>
                            </div>
                          );
                        },
                      },
                      {
                        Header: (
                          <span
                            className={this.state.statusColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "reportStatus",
                              TranslationContext !== undefined
                                ? TranslationContext.span.status
                                : "Status"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.status
                              : "Status"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "reportStatus",
                      },
                      {
                        Header: (
                          <span>
                            {TranslationContext !== undefined
                              ? TranslationContext.span.action
                              : "Actions"}
                          </span>
                        ),
                        accessor: "actionReport",
                        sortable: false,
                        Cell: (row) => (
                          <div className="report-action">
                            {
                              row.original.reportID === 10 &&
                              <div>

                                <img
                                  src={DownExcel}
                                  alt="download icon"
                                  className="downloadaction"
                                  onClick={() => this.handleDownloadCSAT(row.original)}
                                />
                              </div>
                            }

                            <div>
                              {row.original.isDownloaded == 1 &&

                                <img
                                  src={DownExcel}
                                  alt="download icon"
                                  className={row.original.reportID === 10 ? "disply" : "downloadaction"}
                                  onClick={this.handleDownload.bind(
                                    this,
                                    row.original.scheduleID,
                                    row.original.reportName
                                  )}
                                />
                              }
                            </div>
                            <div>
                              {row.original.scheduleID == 0 ? (
                                ""
                              ) : (
                                <Popover
                                  content={
                                    <div className="samdel d-flex general-popover popover-body">
                                      <div className="del-big-icon">
                                        <img src={DelBigIcon} alt="del-icon" />
                                      </div>
                                      <div>
                                        <p className="font-weight-bold blak-clr">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p.deletefile
                                            : "Delete file?"}
                                        </p>
                                        <p className="mt-1 fs-12">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p
                                              .areyousuredeletefile
                                            : "Are you sure you want to delete this file?"}
                                        </p>
                                        <div className="del-can">
                                          <a>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.a.cancel
                                              : "CANCEL"}
                                          </a>
                                          <button
                                            className="butn"
                                            onClick={this.handleDeleteReport.bind(
                                              this,
                                              row.original.reportID
                                            )}
                                          >
                                            {TranslationContext !== undefined
                                              ? TranslationContext.button.delete
                                              : "Delete"}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  }
                                  placement="bottom"
                                  trigger="click"
                                >
                                  <img
                                    src={RedDeleteIcon}
                                    alt="del-icon"
                                    className="del-btn"
                                  />
                                </Popover>
                              )}
                            </div>
                            <div>
                              {row.original.scheduleID == 0 ? (
                                ""
                              ) : (
                                <button
                                  className="react-tabel-button editre"
                                  id="p-edit-pop-2"
                                  onClick={this.handleEditReport.bind(
                                    this,
                                    row.original
                                  )}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.label.edit
                                    : "EDIT"}
                                </button>
                              )}
                            </div>
                          </div>
                        ),
                      },
                    ]}
                    resizable={false}
                    defaultPageSize={10}
                    showPagination={true}
                    minRows={1}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Reports;
