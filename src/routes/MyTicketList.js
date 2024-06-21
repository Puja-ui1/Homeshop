import React, { Component, Fragment } from "react";
import SearchIcon from "./../assets/Images/search-icon.png";
import InfoIcon from "./../assets/Images/info-icon.png";
import TaskIconBlue from "./../assets/Images/task-icon-blue.png";
import TaskIconGray from "./../assets/Images/task-icon-gray.png";
import CliamIconBlue from "./../assets/Images/cliam-icon-blue.png";
import CliamIconGray from "./../assets/Images/claim-icon-gray.png";
import HeadPhone3 from "./../assets/Images/headphone3.png";
import BlackLeftArrow from "./../assets/Images/black-left-arrow.png";
import SearchBlackImg from "./../assets/Images/searchBlack.png";
import Twitter from "./../assets/Images/twitter.png";
import Headphone2Img from "./../assets/Images/headphone2.png";
import MailImg from "./../assets/Images/msg.png";
import FacebookImg from "./../assets/Images/FB.png";
import Sorting from "./../assets/Images/sorting.png";
import DelSearch from "./../assets/Images/del-search.png";
import TicketFromStore from "./../assets/Images/store.png";
import instagram from "./../assets/Images/instagram.png";
import googleReview from "./../assets/Images/googleReview.png";
import gmailimg from "./../assets/Images/gmail.png";
import moment from "moment";
import Modal from "react-responsive-modal";
import MyTicketDraft from "./Tabs/MyTicketDraft.js";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTable from "react-table";
import { Popover, Button } from "antd";
import { ProgressBar } from "react-bootstrap";
import { Collapse, CardBody, Card } from "reactstrap";
import CancalImg from "./../assets/Images/cancal blue.png";
import Chat from "./../assets/Images/chat.png";
import Chatbot from "./../assets/Images/chatbot.png";
import callgreen from "./../assets/Images/callgreen.png";
import csv from "./../assets/Images/csv.png";
import DatePicker from "react-datepicker";
import axios from "axios";
import config from "./../helpers/config";
import TicketStatus from "./TicketStatus";
import { Checkbox } from "antd";
import SlaDue from "./SlaDue";
import TicketActionType from "./TicketActionType";
import ClaimStatus from "./ClaimStatus";
import TaskStatus from "./TaskStatus";
import Select from "react-select";
import { NotificationManager } from "react-notifications";
import ScheduleDateDropDown from "./ScheduleDateDropDown";
import { authHeader } from "../helpers/authHeader";
import { CSVLink } from "react-csv";
import { withRouter } from "react-router";
import matchSorter from "match-sorter";
import * as translationHI from "../translations/hindi";
import * as translationMA from "../translations/marathi";
import { asyncScheduler } from "rxjs";

class MyTicketList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SearchTicketAllTabCount: [],
      SearchAssignData: [],
      AssignModal: false,
      collapseSearch: false,
      ByDateCreatDate: "",
      ByDateSelectDate: "",
      ByAllCreateDate: "",
      ByAllLastDate: "",
      assignFirstName: "",
      assignLastName: "",
      assignEmail: "",
      CSVDownload: [],
      selectedDesignation: 0,
      DesignationData: [],
      TicketPriorityData: [],
      ChannelOfPurchaseData: [],
      SlaStatusData: [],
      CategoryData: [],
      SubCategoryData: [],
      ClaimSubCategoryData: [],
      SubCategoryAllData: [],
      IssueTypeData: [],
      ClaimIssueTypeData: [],
      IssueTypeAllData: [],
      TicketStatusData: TicketStatus()?.filter(
        (status) => status.ticketStatusID >= 101 && status.ticketStatusID <= 105
      ),
      ScheduleOption: ScheduleDateDropDown(),
      SlaDueData: SlaDue(),
      TicketSourceData: [],
      DepartmentData: [],
      FunctionData: [],
      TicketActionTypeData: TicketActionType(),
      ClaimStatusData: ClaimStatus(),
      TaskStatusData: TaskStatus(),
      open: false,
      Schedule: false,
      StatusModel: false,
      CheckBoxChecked: false,
      selectedPriority: 0,
      selectedPriorityAll: 0,
      selectedChannelOfPurchase: [],
      selectedTeamMember: [],
      selectedTicketActionType: [],
      selectedTicketStatusByDate: 0,
      selectScheduleDate: 0,
      selectedNoOfDay: 0,
      selectedScheduleTime: "",
      selectedSlaDueByDate: 0,
      selectedClaimStatus: 0,
      selectedTaskStatus: 0,
      selectedTicketStatusByCustomer: 0,
      selectedTicketStatusByTicket: 0,
      selectedTicketStatusByCategory: 0,
      selectedTicketStatusAll: 0,
      selectedWithClaimAll: "no",
      selectedWithTaskAll: "no",
      selectedVisitStoreAll: "all",
      selectedWantToVisitStoreAll: "all",
      selectedTicketSource: 0,
      selectedPurchaseStoreCodeAddressAll: "",
      selectedVisitStoreCodeAddressAll: "",
      selectedSlaStatus: 0,
      selectedCategory: 0,
      selectedClaimCategory: 0,
      selectedCategoryAll: 0,
      selectedSubCategory: 0,
      selectedClaimSubCategory: 0,
      selectedSubCategoryAll: 0,
      selectedIssueType: 0,
      selectedClaimIssueType: 0,
      selectedIssueTypeAll: 0,
      selectedDepartment: 0,
      selectedFunction: 0,
      selectSearchData: 0,
      MobileNoByCustType: "",
      EmailIdByCustType: "",
      ClaimIdByAll: "",
      EmailByAll: "",
      TicketIdTitleByAll: "",
      InvoiceSubOrderByAll: "",
      MobileByAll: "",
      ItemIdByAll: "",
      selectedAssignedToAll: "",
      TicketIdByCustType: "",
      SearchName: "",
      userID: 6,
      DraftDetails: [],
      SearchListData: [],
      byEscalationCount: 0,
      byNewCount: 0,
      byOpenCount: 0,
      byResolvedCount: 0,
      byReassignedCount: 0,
      byClosedCount: 0,
      byReOpenCount: 0,
      byAllCount: 0,
      byFollowUpCount: 0,
      draftCountStatus: 0,
      byAssignedCount: 0,
      byWIPCount: 0,
      byDateFlag: 1,
      ActiveTabId: 1,
      headerActiveId: 1001,
      byCustomerTypeFlag: 0,
      byTicketTypeFlag: 0,
      byCategoryFlag: 0,
      allFlag: 0,
      resultCount: 0,
      selectedAssignedTo: 0,
      AssignToData: [],
      TeamMemberData: [],
      NameOfDayForWeek: [
        {
          days: "Sunday",
        },
        {
          days: "Monday",
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
      NameOfMonthForYear: [
        {
          month: "September",
        },
        {
          month: "October",
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
      selectedNameOfDayForWeek: [],
      selectedNameOfMonthForYear: [],
      selectedNameOfMonthForDailyYear: [],
      selectedNameOfDayForYear: [],
      agentId: 0,
      agentRemark: "",
      ticketIds: "",
      selectedScheduleFor: "",
      dailyDay: 0,
      isByStatus: true,
      ticketStatusId: 100,
      advPageSize: 30,
      advPageNo: 1,
      SearchTicketData: [],
      fieldByDate: {},
      fieldByCustomerType: {},
      fieldByTicketType: {},
      fieldByCategory: {},
      selectedTeamMemberCommaSeperated: "",
      selectedNameOfDayForWeekCommaSeperated: "",
      selectedNameOfMonthForYearCommaSeperated: "",
      selectedNameOfMonthForDailyYearCommaSeperated: "",
      selectedNameOfDayForYearCommaSeperated: "",
      ticketDetailID: 0,
      IsDaily: 0,
      IsWeekly: 0,
      IsDailyForMonth: 0,
      IsDailyForYear: 0,
      IsWeeklyForMonth: 0,
      IsWeeklyForYear: 0,
      selectedNoOfWeek: 0,
      selectedWeeklyDays: "",
      Mon: "",
      Tue: "",
      Wed: "",
      Thu: "",
      Fri: "",
      Sat: "",
      Sun: "",
      selectedNoOfDaysForMonth: 0,
      selectedNoOfMonthForMonth: 0,
      selectedNoOfMonthForWeek: 0,
      selectedNoOfWeekForWeek: 0,
      selectedNoOfDayForDailyYear: 0,
      selectedNoOfWeekForYear: 0,
      selectedNameOfMonthForDailyYear: "",
      loading: false,
      SearchNameCompulsory: "",
      SearchNameExists: "",
      FinalSaveSearchData: "",
      modulesItemsMyticket: [],
      Escalation: "",
      New: "",
      Open: "",
      Resolved: "",
      ReassignedByMe: "",
      Closed: "",
      All: "",
      FollowUp: "",
      Draft: "",
      scheduleRequired: "",
      agentSelection: "",
      sortColumnName: "",
      sortTicketData: [],
      sortCategoryData: [],
      sortPriorityData: [],
      sortcreatedOnData: [],
      sortAssigneeData: [],
      sortAllData: [],
      cSelectedRow: {},
      notiType: "",
      moduleIDMyticket: 0,
      ClearfollowUp: "",
      statusColor: "",
      categoryColor: "",
      priorityColor: "",
      assignColor: "",
      creationColor: "",
      sortHeader: "",
      filterTxtValue: "",
      sortFilterTicketData: [],
      sortFilterCategoryData: [],
      sortFilterPriorityData: [],
      sortFiltercreatedOnData: [],
      sortFilterAssigneeData: [],
      sFilterCheckbox: "",
      tempSearchTicketData: [],
      sColorFilterCheckbox: "",
      isRed: false,
      isWhite: false,
      isGreen: false,
      isYellow: false,
      sticketStatusFilterCheckbox: "",
      scategoryFilterCheckbox: "",
      spriorityFilterCheckbox: "",
      screatedOnFilterCheckbox: "",
      sassignedToFilterCheckbox: "",
      translateLanguage: {},
      ticketFields: [],
      displayTicketFileds: {},
      NameByCustType: "",
      advanceSearchModulesItems: [],
      isStart: true,
      tabletotalPages: 0,
      newresultCount: 0,
      currentPage: 1,
      postsPerPage: 30,
      viewSearchApi: false,
      //tabFlag:false
    };
    this.handleGetAssignTo = this.handleGetAssignTo.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.handleAdvSearchFlag = this.handleAdvSearchFlag.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.handleGetSaveSearchList = this.handleGetSaveSearchList.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.handleGetTicketSourceList = this.handleGetTicketSourceList.bind(this);
    this.handleGetCategoryList = this.handleGetCategoryList.bind(this);
    this.handleGetSlaStatusList = this.handleGetSlaStatusList.bind(this);
    this.handleGetSubCategoryList = this.handleGetSubCategoryList.bind(this);
    this.handleGetClaimSubCategoryList = this.handleGetClaimSubCategoryList.bind(
      this
    );
    this.handleGetIssueTypeList = this.handleGetIssueTypeList.bind(this);
    this.handleGetClaimIssueTypeList = this.handleGetClaimIssueTypeList.bind(
      this
    );
    this.handleGetDesignationList = this.handleGetDesignationList.bind(this);
    this.handleGetTicketPriorityList = this.handleGetTicketPriorityList.bind(
      this
    );
    this.handleGetChannelOfPurchaseList = this.handleGetChannelOfPurchaseList.bind(
      this
    );
    this.handleGetDraftDetails = this.handleGetDraftDetails.bind(this);
    this.handleSchedulePopupSuccess = this.handleSchedulePopupSuccess.bind(
      this
    );
    this.handelOnchangeData = this.handelOnchangeData.bind(this);
    this.handleGetDepartmentList = this.handleGetDepartmentList.bind(this);
    this.handleGetFunctionList = this.handleGetFunctionList.bind(this);
    this.handleAssignRemark = this.handleAssignRemark.bind(this);
    this.handleDailyDay = this.handleDailyDay.bind(this);
    this.handleDaysForMonth = this.handleDaysForMonth.bind(this);
    this.handleMonthForMonth = this.handleMonthForMonth.bind(this);
    this.handleWeekForWeek = this.handleWeekForWeek.bind(this);
    this.handleWeekForYear = this.handleWeekForYear.bind(this);
    this.handleDayForYear = this.handleDayForYear.bind(this);
    this.handleMonthForWeek = this.handleMonthForWeek.bind(this);
    this.handleWeekly = this.handleWeekly.bind(this);
    this.handleWeeklyDays = this.handleWeeklyDays.bind(this);
    this.handleScheduleTime = this.handleScheduleTime.bind(this);
    this.handleAssignTickets = this.handleAssignTickets.bind(this);
    this.handleSchedulePopup = this.handleSchedulePopup.bind(this);
    this.handleSearchTicket = this.handleSearchTicket.bind(this);
    this.handleSearchTicketAllTabCount = this.handleSearchTicketAllTabCount.bind(
      this
    );
    this.handleMyTicketsearchOption = this.handleMyTicketsearchOption.bind(
      this
    );
    this.handleClearFollowUpData = this.handleClearFollowUpData.bind(this);
  }

  componentDidMount = async () => {
    if (this.props.location.state && this.props.location.state.isType) {
      this.newNotifications(this.props.location.state.isType);
      this.setState({
        notiType: this.props.location.state.isType,
      });
    }

    await this.handleSearchTicketAllTabCount();

    // setTimeout(() => {
    //   if (!this.props.location.state) {
    //     this.handleSearchTicket(this.state.SearchTicketAllTabCount[0]?.statusId);
    //   }
    // }, 500);
    //debugger
    this.handleGetTableFilters();
    this.handleGetDesignationList();
    this.handleGetTicketPriorityList();
    this.handleGetChannelOfPurchaseList();
    this.handleGetTicketSourceList();
    this.handleGetCategoryList();
    this.handleGetSlaStatusList();
    this.handleGetAssignTo();
    this.handleGetDepartmentList();
    this.handleGetModulesNames();
    this.handleGetTicketFields();
    this.getTicketListTableFilters();

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  componentDidUpdate() {
    if (this.props.location.state) {
      if (this.state.notiType !== this.props.location.state.isType) {
        this.newNotifications(this.props.location.state.isType);
      }
    }
  }

  newNotifications(type) {
    let upperTabs = document.querySelectorAll(".upper-tabs .nav-link");
    for (let i = 0; i < upperTabs.length; i++) {
      upperTabs[i].classList.remove("active");
    }
    document.getElementsByName(type)[0].classList.add("active");
    this.setState({ notiType: type });
    setTimeout(() => {
      this.handleSearchTicket(type);
    }, 100);
  }
  ////handle get module name
  handleGetModulesNames() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetModules",
      headers: authHeader(),
    })
      .then((res) => {
        let data = res.data.responseData;
        let message = res.data.message;
        if (message === "Success") {
          let moduleIDAdvanceSearched = data[0].moduleID;
          let moduleIDMyticket = data[1].moduleID;
          self.handleMyTicketsearchOption(moduleIDMyticket);
          self.handleAdvanceSearchOption(moduleIDAdvanceSearched);
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  /////handle get module item by id
  handleMyTicketsearchOption(id) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetModulesItems",
      headers: authHeader(),
      params: {
        ModuleID: id,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data1 = res.data.responseData;
        if (status === "Success") {
          self.setState({ modulesItemsMyticket: data1 });
          self.setMyTicketSearch(data1);
        } else {
          self.setState({ modulesItemsMyticket: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  setMyTicketSearch(data1) {
    var data = [];
    data = data1;
    if (data.length > 0) {
      if (data[0].moduleItemisActive !== undefined) {
        if (data[0].moduleItemisActive === true) {
          this.setState({ Escalation: "yes" });
        } else {
          this.setState({ Escalation: "none" });
        }
      }

      if (data[1].moduleItemisActive !== undefined) {
        if (data[1].moduleItemisActive === true) {
          this.setState({ New: "yes" });
        } else {
          this.setState({ New: "none" });
        }
      }
      if (data[2].moduleItemisActive !== undefined) {
        if (data[2].moduleItemisActive === true) {
          this.setState({ Open: "yes" });
        } else {
          this.setState({ Open: "none" });
        }
      }
      if (data[3].moduleItemisActive !== undefined) {
        if (data[3].moduleItemisActive === true) {
          this.setState({ Resolved: "yes" });
        } else {
          this.setState({ Resolved: "none" });
        }
      }
      if (data[4].moduleItemisActive !== undefined) {
        if (data[4].moduleItemisActive === true) {
          this.setState({ ReassignedByMe: "yes" });
        } else {
          this.setState({ ReassignedByMe: "none" });
        }
      }
      if (data[5].moduleItemisActive !== undefined) {
        if (data[5].moduleItemisActive === true) {
          this.setState({ Closed: "yes" });
        } else {
          this.setState({ Closed: "none" });
        }
      }
      if (data[6].moduleItemisActive !== undefined) {
        if (data[6].moduleItemisActive === true) {
          this.setState({ All: "yes" });
        } else {
          this.setState({ All: "none" });
        }
      }
      if (data[7].moduleItemisActive !== undefined) {
        if (data[7].moduleItemisActive === true) {
          this.setState({ FollowUp: "yes" });
        } else {
          this.setState({ FollowUp: "none" });
        }
      }
      if (data[8].moduleItemisActive !== undefined) {
        if (data[8].moduleItemisActive === true) {
          this.setState({ Draft: "yes" });
        } else {
          this.setState({ Draft: "none" });
        }
      }
    }
  }
  ////handle get ticket status count
  handleSearchTicketAllTabCount() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Search/TicketStatusCount",
      headers: authHeader(),
    })
      .then(function (res) {
        //debugger
        let data = res.data.responseData;
        let Status = res.data.message;
        if (Status === "Success") {
          // var EscalationCount = data[0].ticketCount;
          // var NewCount = data[1].ticketCount;
          // var OpenCount = data[2].ticketCount;
          // var ResolvedCount = data[3].ticketCount;
          // var ReassignedCount = data[4].ticketCount;
          // var ClosedCount = data[5].ticketCount;
          // var AllCount = data[6].ticketCount;
          // var FollowUpCount = data[7].ticketCount;
          // var draftCountStatus = data[8].ticketCount;
          // var byReOpenCount = data[9].ticketCount;
          // var AssignedCount = data[10].ticketCount;
          // var WIPCount = data[11].ticketCount;

          self.setState({
            // byEscalationCount: EscalationCount,
            // byNewCount: NewCount,
            // byOpenCount: OpenCount,
            // byResolvedCount: ResolvedCount,
            // byReassignedCount: ReassignedCount,
            // byClosedCount: ClosedCount,
            // byAllCount: AllCount,
            // byFollowUpCount: FollowUpCount,
            // draftCountStatus: draftCountStatus,
            // byReOpenCount,
            // byAssignedCount: AssignedCount,
            // byWIPCount: WIPCount,
            SearchTicketAllTabCount: data
          });
          if (self.state.isStart) {
            let currentD = data.filter(ele => ele.ticketStatus === "All")
            if (!self.props.location.state) {
              self.handleSearchTicket(currentD[0]?.statusId);
            }
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleSearchTicket(TabId) {
    // //debugger
    this.state.sortTicketData = [];
    this.state.sortCategoryData = [];
    this.state.sortPriorityData = [];
    this.state.sortcreatedOnData = [];
    this.state.sortAssigneeData = [];
    this.state.sortFilterTicketData = [];
    this.state.sortFilterCategoryData = [];
    this.state.sortFilterPriorityData = [];
    this.state.sortFiltercreatedOnData = [];
    this.state.sortFilterAssigneeData = [];
    this.state.sortAllData = [];
    var ticketStatus = 0;
    this.setState({
      sticketStatusFilterCheckbox: "",
      scategoryFilterCheckbox: "",
      spriorityFilterCheckbox: "",
      screatedOnFilterCheckbox: "",
      sassignedToFilterCheckbox: "",
      sortColumnName: "",
      sortHeader: "",
      statusColor: "",
      categoryColor: "",
      priorityColor: "",
      assignColor: "",
      creationColor: "",
      isStart: false,
      viewSearchApi: false,
      tabletotalPages: 0,
      // tabFlag:true
    });
    // if (TabId=== 1001){
    //   this.state({
    //     currentPage: 1,
    //     postsPerPage: 20,
    //   })
    // }

    // if (TabId === "Escalation" || TabId === undefined) {
    //   ticketStatus = 1001;
    //   this.setState({
    //     headerActiveId: 1001,
    //   });
    // } else if (TabId === "New") {
    //   ticketStatus = 101;
    //   this.setState({
    //     headerActiveId: 101,
    //   });
    // } else if (TabId === "Open") {
    //   ticketStatus = 102;
    //   this.setState({
    //     headerActiveId: 102,
    //   });
    // } else if (TabId === "Resolved") {
    //   ticketStatus = 103;
    //   this.setState({
    //     headerActiveId: 103,
    //   });
    // } else if (TabId === "Closed") {
    //   ticketStatus = 104;
    //   this.setState({
    //     headerActiveId: 104,
    //   });
    // } else if (TabId === "ReOpen") {
    //   ticketStatus = 105;
    //   this.setState({
    //     headerActiveId: 105,
    //   });
    // }
    // else if (TabId === "Assigned") {
    //   ticketStatus = 106;
    //   this.setState({
    //     headerActiveId: 106,
    //   });
    // }
    // else if (TabId === "WIP") {
    //   ticketStatus = 107;
    //   this.setState({
    //     headerActiveId: 107,
    //   });
    // }
    // else if (TabId === "Reassigned") {
    //   ticketStatus = 1004;
    //   this.setState({
    //     headerActiveId: 1004,
    //   });
    // } else if (TabId === "All") {
    //   ticketStatus = 1002;
    //   this.setState({
    //     headerActiveId: 1002,
    //   });
    // } else if (TabId === "FollowUp") {
    //   ticketStatus = 1003;
    //   this.setState({
    //     headerActiveId: 1003,
    //   });
    // }
    ticketStatus = TabId
    // console.log("ticketStatus",ticketStatus)
    this.setState({
      loading: true,
      headerActiveId: TabId,
      resultCount: 0,
      collapseSearch: false,
      ByDateCreatDate: "",
      ByDateSelectDate: "",
      selectedSlaDueByDate: 0,
      selectedTicketStatusByDate: 0,
      MobileNoByCustType: "",
      EmailIdByCustType: "",
      TicketIdByCustType: "",
      selectedTicketStatusByCustomer: 0,
      selectedPriority: 0,
      selectedTicketStatusByTicket: 0,
      selectedChannelOfPurchase: [],
      selectedTicketActionType: [],
      selectedCategory: 0,
      selectedSubCategory: 0,
      selectedIssueType: 0,
      selectedTicketStatusByCategory: 0,
      ByAllCreateDate: "",
      selectedTicketSource: 0,
      ClaimIdByAll: "",
      EmailByAll: "",
      ByAllLastDate: "",
      TicketIdTitleByAll: "",
      InvoiceSubOrderByAll: "",
      MobileByAll: "",
      selectedCategoryAll: 0,
      selectedPriorityAll: 0,
      ItemIdByAll: "",
      selectedAssignedToAll: "",
      selectedSubCategoryAll: 0,
      selectedTicketStatusAll: 0,
      selectedAssignedTo: 0,
      selectedVisitStoreAll: "all",
      selectedPurchaseStoreCodeAddressAll: "",
      selectedIssueTypeAll: 0,
      selectedSlaStatus: 0,
      selectedWantToVisitStoreAll: "all",
      selectedVisitStoreCodeAddressAll: "",
      selectedWithClaimAll: "no",
      selectedClaimStatus: 0,
      selectedClaimCategory: 0,
      selectedClaimSubCategory: 0,
      selectedClaimIssueType: 0,
      selectedWithTaskAll: "no",
      selectedTaskStatus: 0,
      selectedDepartment: 0,
      selectedFunction: 0,
      isortA: false,

    });

    let tableFilterData = this.props.location.tableFilterData
      ? this.props.location.tableFilterData
      : [];

    let filterFromURL = this.props.location.appliedTableFilters
      ? this.props.location.appliedTableFilters
      : 0;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Search/GetTicketsOnPageLoad",
      headers: authHeader(),
      params: {
        HeaderStatusID: ticketStatus,
        PageNumber: this.state.currentPage,
        PageSize: this.state.postsPerPage
      },
    })
      .then(function (res) {
        let data = res.data.responseData;
        let CVData = res.data.responseData;
        let Status = res.data.message;
        let totalPage = res.data.totalPage
        // console.log("totatlPage",totalPage)

        if (data !== null) {
          if (self.state.headerActiveId === 1003) {
            self.handleClearFollowUpData();
          }
          self.state.sortAllData = data;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].ticketStatus]) {
              distinct.push(data[i].ticketStatus);
              unique[data[i].ticketStatus] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortTicketData.push({ ticketStatus: distinct[i] });
            self.state.sortFilterTicketData.push({ ticketStatus: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].category]) {
              distinct.push(data[i].category);
              unique[data[i].category] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortCategoryData.push({ category: distinct[i] });
            self.state.sortFilterCategoryData.push({ category: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].priority]) {
              distinct.push(data[i].priority);
              unique[data[i].priority] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortPriorityData.push({ priority: distinct[i] });
            self.state.sortFilterPriorityData.push({ priority: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].createdOn]) {
              distinct.push(data[i].createdOn);
              unique[data[i].createdOn] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortcreatedOnData.push({ createdOn: distinct[i] });
            self.state.sortFiltercreatedOnData.push({ createdOn: distinct[i] });
          }

          var Assignunique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!Assignunique[data[i].assignedTo]) {
              distinct.push(data[i].assignedTo);
              Assignunique[data[i].assignedTo] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortAssigneeData.push({ assignedTo: distinct[i] });
            self.state.sortFilterAssigneeData.push({ assignedTo: distinct[i] });
          }
        }

        //debugger
        if (Status === "Success") {
          self.setState({
            tabletotalPages: totalPage
          })
          if (filterFromURL !== 0) {
            if (filterFromURL.headerActiveId === ticketStatus) {
              self.setState({
                SearchTicketData:
                  tableFilterData.length > 0 ? tableFilterData : data,
                loading: false,
                cSelectedRow: {},
                sticketStatusFilterCheckbox: filterFromURL.status || "",
                scategoryFilterCheckbox: filterFromURL.category || "",
                spriorityFilterCheckbox: filterFromURL.priority || "",
                screatedOnFilterCheckbox: filterFromURL.createdOn || "",
                sassignedToFilterCheckbox: filterFromURL.assignedTo || "",


              });
              this.handleSetActiveTab(filterFromURL.headerActiveId);
            }
          } else {
            self.setState({
              SearchTicketData: data,
              loading: false,
              cSelectedRow: {},
            });
          }

          for (let i = 0; i < CVData.length; i++) {
            delete CVData[i].totalpages;
          }
          self.setState({ CSVDownload: CVData, loading: false });
        } else {
          self.setState({ SearchTicketData: [], loading: false });
        }
      })
      .catch((data) => {
        self.setState({ loading: false });
        console.log(data);
      });
  }
  handleSearchTicketTabChanges = async (e) => {
    await this.setState({
      currentPage: 1,
      postsPerPage: 30,

    })
    this.handleSearchTicket(e)
  }

  ////handle clear follow up data
  handleClearFollowUpData() {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/Ticketing/getticketsforfollowup",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            ClearfollowUp: data,
          });
        } else {
          self.setState({
            ClearfollowUp: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  ////handle search clear follow up data
  handleSearchClearFollowUp() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/ticketunassigfromfollowup",
      headers: authHeader(),
      params: {
        TicketIDs: this.state.ClearfollowUp,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage
                .clearfollowupnotificationsuccessfully
              : "Clear Follow up notification successfully."
          );
          self.handleSearchTicketAllTabCount();
          self.handleSearchTicket(1003);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleSchedulePopup() {
    if (
      this.state.selectScheduleDate === 0 ||
      this.state.selectScheduleDate === "100"
    ) {
      this.setState({
        scheduleRequired: "All fields are required",
      });
    } else if (this.state.selectScheduleDate === "230") {
      if (
        this.state.selectedTeamMember.length === 0 ||
        this.state.selectedScheduleTime === "" ||
        this.state.selectedNoOfDay === 0
      ) {
        this.setState({
          scheduleRequired: "All fields are required",
        });
      } else {
        this.handleSchedulePopupSuccess();
      }
    } else if (this.state.selectScheduleDate === "231") {
      if (
        this.state.selectedTeamMember.length === 0 ||
        this.state.selectedScheduleTime === "" ||
        this.state.selectedNoOfWeek === 0 ||
        this.state.selectedWeeklyDays === ""
      ) {
        this.setState({
          scheduleRequired: "All fields are required",
        });
      } else {
        this.handleSchedulePopupSuccess();
      }
    } else if (this.state.selectScheduleDate === "232") {
      if (
        this.state.selectedTeamMember.length === 0 ||
        this.state.selectedScheduleTime === "" ||
        this.state.selectedNoOfDaysForMonth === 0 ||
        this.state.selectedNoOfMonthForMonth === 0
      ) {
        this.setState({
          scheduleRequired: "All fields are required",
        });
      } else {
        this.handleSchedulePopupSuccess();
      }
    } else if (this.state.selectScheduleDate === "233") {
      if (
        this.state.selectedTeamMember.length === 0 ||
        this.state.selectedScheduleTime === "" ||
        this.state.selectedNoOfMonthForWeek === 0 ||
        this.state.selectedNoOfWeekForWeek === 0 ||
        this.state.selectedNameOfDayForWeek.length === 0
      ) {
        this.setState({
          scheduleRequired: "All fields are required",
        });
      } else {
        this.handleSchedulePopupSuccess();
      }
    } else if (this.state.selectScheduleDate === "234") {
      if (
        this.state.selectedTeamMember.length === 0 ||
        this.state.selectedScheduleTime === "" ||
        this.state.selectedNoOfDayForDailyYear === 0 ||
        this.state.selectedNameOfMonthForYear.length === 0
      ) {
        this.setState({
          scheduleRequired: "All fields are required",
        });
      } else {
        this.handleSchedulePopupSuccess();
      }
    } else if (this.state.selectScheduleDate === "235") {
      if (
        this.state.selectedTeamMember.length === 0 ||
        this.state.selectedScheduleTime === "" ||
        this.state.selectedNoOfWeekForYear === 0 ||
        this.state.selectedNameOfDayForYear.length === 0 ||
        this.state.selectedNameOfMonthForDailyYear.length === 0
      ) {
        this.setState({
          scheduleRequired: "All fields are required",
        });
      } else {
        this.handleSchedulePopupSuccess();
      }
    }
  }
  ////handle Schedule Popup Success
  handleSchedulePopupSuccess() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/Schedule",
      headers: authHeader(),
      data: {
        SearchInputParams: this.state.FinalSaveSearchData,
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
      },
    })
      .then(function (res) {
        let messageData = res.data.message;
        if (messageData === "Success") {
          self.ScheduleCloseModel();
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.scheduledsuccessfully
              : "Scheduled successfully."
          );
          self.setState({
            scheduleRequired: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleAssignRemark(e) {
    this.setState({
      agentRemark: e.currentTarget.value,
    });
  }
  handleDailyDay(e) {
    this.setState({
      selectedNoOfDay: e.currentTarget.value,
    });
  }
  handleWeekly(e) {
    this.setState({
      selectedNoOfWeek: e.currentTarget.value,
    });
  }
  handleDaysForMonth(e) {
    this.setState({
      selectedNoOfDaysForMonth: e.currentTarget.value,
    });
  }
  handleMonthForMonth(e) {
    this.setState({
      selectedNoOfMonthForMonth: e.currentTarget.value,
    });
  }
  handleWeekForWeek(e) {
    this.setState({
      selectedNoOfWeekForWeek: e.currentTarget.value,
    });
  }
  handleWeekForYear(e) {
    this.setState({
      selectedNoOfWeekForYear: e.currentTarget.value,
    });
  }
  handleDayForYear(e) {
    this.setState({
      selectedNoOfDayForDailyYear: e.currentTarget.value,
    });
  }
  handleMonthForWeek(e) {
    this.setState({
      selectedNoOfMonthForWeek: e.currentTarget.value,
    });
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
  handleScheduleTime(e) {
    this.setState({
      selectedScheduleTime: e,
    });
  }
  handleAssignTickets() {
    const TranslationContext = this.state.translateLanguage.default;
    if (this.state.agentId !== 0) {
      let self = this;
      var ticketIdsComma = this.state.ticketIds;
      var ticketIds = ticketIdsComma.substring(0, ticketIdsComma.length - 1);

      axios({
        method: "post",
        url: config.apiUrl + "/Ticketing/AssignTickets",
        headers: authHeader(),
        params: {
          TicketID: ticketIds,
          AgentID: this.state.agentId,
          Remark: this.state.agentRemark,
        },
      })
        .then(function (res) {
          let messageData = res.data.message;
          if (messageData === "Success") {
            self.handleAssignModalClose();
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.ticketsassignedsuccessfully
                : "Tickets assigned successfully."
            );
            self.handleSearchTicket();
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        agentSelection: "Agent Selection is required",
      });
    }
  }

  clearSearch() {
    if (this.state.byDateFlag === 1) {
      this.setState(
        {
          ByDateCreatDate: "",
          ByDateSelectDate: "",
          selectedSlaDueByDate: 0,
          selectedTicketStatusByDate: 0,
          resultCount: 0,
        },
        () => {
          // debugger
          this.ViewSearchData(1);
        }
      );
    } else if (this.state.byCustomerTypeFlag === 2) {
      this.setState(
        {
          MobileNoByCustType: "",
          EmailIdByCustType: "",
          TicketIdByCustType: "",
          selectedTicketStatusByCustomer: 0,
          resultCount: 0,
        },
        () => {
          // debugger
          this.ViewSearchData(1);
        }
      );
    } else if (this.state.byTicketTypeFlag === 3) {
      this.setState(
        {
          selectedPriority: 0,
          selectedTicketStatusByTicket: 0,
          selectedChannelOfPurchase: [],
          selectedTicketActionType: [],
          resultCount: 0,
        },
        () => {
          //debugger
          this.ViewSearchData(1);
        }
      );
    } else if (this.state.byCategoryFlag === 4) {
      this.setState(
        {
          selectedCategory: 0,
          selectedSubCategory: 0,
          selectedIssueType: 0,
          selectedTicketStatusByCategory: 0,
          resultCount: 0,
          SubCategoryData: [],
          IssueTypeData: [],
        },
        () => {
          //debugger
          this.ViewSearchData(1);
        }
      );
    } else if (this.state.allFlag === 5) {
      this.setState(
        {
          ByAllCreateDate: "",
          selectedTicketSource: 0,
          ClaimIdByAll: "",
          EmailByAll: "",
          ByAllLastDate: "",
          TicketIdTitleByAll: "",
          InvoiceSubOrderByAll: "",
          MobileByAll: "",
          selectedCategoryAll: 0,
          selectedPriorityAll: 0,
          ItemIdByAll: "",
          selectedAssignedToAll: "",
          selectedSubCategoryAll: 0,
          selectedTicketStatusAll: 0,
          selectedAssignedTo: 0,
          selectedVisitStoreAll: "all",
          selectedPurchaseStoreCodeAddressAll: "",
          selectedIssueTypeAll: 0,
          selectedSlaStatus: 0,
          selectedWantToVisitStoreAll: "all",
          selectedVisitStoreCodeAddressAll: "",
          selectedWithClaimAll: "no",
          selectedClaimStatus: 0,
          selectedClaimCategory: 0,
          selectedClaimSubCategory: 0,
          selectedClaimIssueType: 0,
          selectedWithTaskAll: "no",
          selectedTaskStatus: 0,
          selectedDepartment: 0,
          selectedFunction: 0,
          resultCount: 0,
          SubCategoryAllData: [],
          IssueTypeAllData: [],
          ClaimSubCategoryData: [],
          ClaimIssueTypeData: [],
          isDraftClick: false,
        },
        () => {
          //debugger
          this.ViewSearchData(1);
        }
      );
    }
    localStorage.removeItem("MyTicketListDateTypeFilter");
    localStorage.removeItem("MyTicketListCustomerTypeFilter");
    localStorage.removeItem("MyTicketListTicketTypeFilter");
    localStorage.removeItem("MyTicketListCategoryTypeFilter");
    localStorage.removeItem("MyTicketListAllTypeFilter");
  }

  handleAdvSearchFlag(e) {
    let currentActive = e.currentTarget.innerText;
    if (currentActive === "By Date") {
      this.setState({
        byDateFlag: 1,
        byCustomerTypeFlag: 0,
        byTicketTypeFlag: 0,
        byCategoryFlag: 0,
        allFlag: 0,
        ActiveTabId: 1,
        currentPage: 1,
        postsPerPage: 30

      });
    } else if (currentActive === "By Customer Type") {
      this.setState({
        byDateFlag: 0,
        byCustomerTypeFlag: 2,
        byTicketTypeFlag: 0,
        byCategoryFlag: 0,
        allFlag: 0,
        ActiveTabId: 2,
        currentPage: 1,
        postsPerPage: 30
      });
    } else if (currentActive === "By Ticket Type") {
      this.setState({
        byDateFlag: 0,
        byCustomerTypeFlag: 0,
        byTicketTypeFlag: 3,
        byCategoryFlag: 0,
        allFlag: 0,
        ActiveTabId: 3,
        currentPage: 1,
        postsPerPage: 30
      });
    } else if (currentActive === "By Category") {
      this.setState({
        byDateFlag: 0,
        byCustomerTypeFlag: 0,
        byTicketTypeFlag: 0,
        byCategoryFlag: 4,
        allFlag: 0,
        ActiveTabId: 4,
        currentPage: 1,
        postsPerPage: 30
      });
    } else if (currentActive === "All") {
      this.setState({
        byDateFlag: 0,
        byCustomerTypeFlag: 0,
        byTicketTypeFlag: 0,
        byCategoryFlag: 0,
        allFlag: 5,
        ActiveTabId: 5,
        currentPage: 1,
        postsPerPage: 30
      });
    }
  }
  handleGetDraftDetails() {
    this.setState({ isDraftClick: true });
  }
  handleGetDepartmentList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getDepartmentList",
      headers: authHeader(),
    })
      .then(function (res) {
        let data = res.data.responseData;
        let status = res.data.message;
        if (status === "Success") {
          self.setState({ DepartmentData: data });
        } else {
          self.setState({ DepartmentData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetFunctionList() {
    let self = this;
    self.setState({ FunctionData: [], selectedFunction: 0 });

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

  setScheduleFor = (e) => {
    let scheduleForValue = e.currentTarget.value;
    this.setState({ selectedScheduleFor: scheduleForValue });
  };

  handleGetDesignationList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Designation/GetDesignationList",
      headers: authHeader(),
    })
      .then(function (res) {
        let data = res.data.responseData;
        let status = res.data.message;
        if (status === "Success") {
          self.setState({ DesignationData: data });
        } else {
          self.setState({ DesignationData: [] });
        }
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
        let data = res.data.responseData;
        let stastus = res.data.message;
        if (stastus === "Success") {
          self.setState({ TicketPriorityData: data });
        } else {
          self.setState({ TicketPriorityData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetChannelOfPurchaseList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetChannelOfPurchaseList",
      headers: authHeader(),
    })
      .then(function (res) {
        let ChannelOfPurchaseData = res.data.responseData;
        self.setState({ ChannelOfPurchaseData: ChannelOfPurchaseData });
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
        let data = res.data.responseData;
        let status = res.data.message;
        if (status === "Success") {
          self.setState({
            TicketSourceData: data,
          });
        } else {
          self.setState({
            TicketSourceData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetSlaStatusList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/SLA/GetSLAStatusList",
      headers: authHeader(),
    })
      .then(function (res) {
        let data = res.data.responseData;
        self.setState({
          SlaStatusData: data,
        });
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

        if (data !== null) {
          self.setState({
            CategoryData: data,
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
  handleGetClaimSubCategoryList() {
    let self = this;
    self.setState({
      ClaimSubCategoryData: [],
      selectedClaimSubCategory: 0,
      ClaimIssueTypeData: [],
      selectedClaimIssueType: 0,
    });

    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/GetSubCategoryByCategoryID",
      headers: authHeader(),
      params: {
        CategoryID: this.state.selectedClaimCategory,
      },
    })
      .then(function (res) {
        let data = res.data.responseData;
        self.setState({
          ClaimSubCategoryData: data,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetSubCategoryList(param) {
    let self = this;
    if (param === "categoryTab") {
      this.setState({
        SubCategoryData: [],
        IssueTypeData: [],
        selectedSubCategory: 0,
        selectedIssueType: 0,
      });
    } else if (param === "allTab") {
      this.setState({
        SubCategoryAllData: [],
        IssueTypeAllData: [],
        selectedSubCategoryAll: 0,
        selectedIssueTypeAll: 0,
      });
    } else if (param === "allClaimTab") {
      this.setState({
        ClaimSubCategoryData: [],
        selectedClaimSubCategory: 0,
        ClaimIssueTypeData: [],
        selectedClaimIssueType: 0,
      });
    }
    let cateId;
    if (param == "categoryTab") {
      let categoryIds = "";
      if (this.state.selectedCategory != null) {
        for (let i = 0; i < this.state.selectedCategory.length; i++) {
          categoryIds += this.state.selectedCategory[i].categoryID + ",";
        }
      }
      cateId = categoryIds;
    } else if (param === "allTab") {
      let categoryIds = "";
      if (this.state.selectedCategoryAll != null) {
        for (let i = 0; i < this.state.selectedCategoryAll.length; i++) {
          categoryIds += this.state.selectedCategoryAll[i].categoryID + ",";
        }
      }
      cateId = categoryIds;
    } else if (param === "allClaimTab") {
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
        var data = res.data.responseData;
        if (param === "categoryTab") {
          self.setState({
            SubCategoryData: data,
          });
        } else if (param === "allTab") {
          self.setState({
            SubCategoryAllData: data,
          });
        } else if (param === "allClaimTab") {
          self.setState({
            ClaimSubCategoryData: data,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetClaimIssueTypeList() {
    let self = this;
    self.setState({
      ClaimIssueTypeData: [],
      selectedClaimIssueType: 0,
    });

    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/GetIssueTypeList",
      headers: authHeader(),
      params: {
        SubCategoryID: this.state.selectedClaimSubCategory,
      },
    })
      .then(function (res) {
        let ClaimIssueTypeData = res.data.responseData;
        self.setState({ ClaimIssueTypeData: ClaimIssueTypeData });
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetIssueTypeList(param) {
    let self = this;
    if (param === "categoryTab") {
      self.setState({
        IssueTypeData: [],
        selectedIssueType: 0,
      });
    } else if (param === "allTab") {
      self.setState({
        IssueTypeAllData: [],
        selectedIssueTypeAll: 0,
      });
    } else if (param === "allClaimTab") {
      self.setState({
        ClaimIssueTypeData: [],
        selectedClaimIssueType: 0,
      });
    }
    let subCateId;
    if (param === "categoryTab") {
      let subIds = "";
      if (this.state.selectedSubCategory != null) {
        for (let i = 0; i < this.state.selectedSubCategory.length; i++) {
          subIds += this.state.selectedSubCategory[i].subCategoryID + ",";
        }
      }
      subCateId = subIds;
    } else if (param === "allTab") {
      let subIds = "";
      if (this.state.selectedSubCategoryAll != null) {
        for (let i = 0; i < this.state.selectedSubCategoryAll.length; i++) {
          subIds += this.state.selectedSubCategoryAll[i].subCategoryID + ",";
        }
      }
      subCateId = subIds;
    } else if (param === "allClaimTab") {
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
        if (param === "categoryTab") {
          var IssueTypeData = res.data.responseData;
          self.setState({
            IssueTypeData: IssueTypeData,
          });
        } else if (param === "allTab") {
          var IssueTypeAllData = res.data.responseData;
          self.setState({
            IssueTypeAllData: IssueTypeAllData,
          });
        } else if (param === "allClaimTab") {
          var ClaimIssueTypeData = res.data.responseData;
          self.setState({
            ClaimIssueTypeData: ClaimIssueTypeData,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleAssignSearchData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/searchAgent",
      headers: authHeader(),
      params: {
        FirstName: this.state.assignFirstName.trim(),
        LastName: this.state.assignLastName.trim(),
        Email: this.state.assignEmail.trim(),
        DesignationID: this.state.selectedDesignation,
      },
    })
      .then(function (res) {
        let SearchAssignData = res.data.responseData;
        self.setState({
          SearchAssignData: SearchAssignData,
          assignFirstName: "",
          assignLastName: "",
          assignEmail: "",
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleAssignClearData() {
    this.setState({
      assignFirstName: "",
      assignLastName: "",
      assignEmail: "",
      selectedDesignation: 0,
    });
  }

  SaveSearchData() {
    const TranslationContext = this.state.translateLanguage.default;

    let self = this;

    // ---------------By Date tab---------------------
    var dateTab = {};
    if (this.state.ActiveTabId === 1) {
      if (
        this.state.ByDateCreatDate === null ||
        this.state.ByDateCreatDate === undefined ||
        this.state.ByDateCreatDate === ""
      ) {
        dateTab["Ticket_CreatedOn"] = "";
      } else {
        dateTab["Ticket_CreatedOn"] = moment(this.state.ByDateCreatDate).format(
          "YYYY-MM-DD"
        );
      }
      if (
        this.state.ByDateSelectDate === null ||
        this.state.ByDateSelectDate === undefined ||
        this.state.ByDateSelectDate === ""
      ) {
        dateTab["Ticket_ModifiedOn"] = "";
      } else {
        dateTab["Ticket_ModifiedOn"] = moment(
          this.state.ByDateSelectDate
        ).format("YYYY-MM-DD");
      }
      dateTab["SLA_DueON"] = this.state.selectedSlaDueByDate;
      dateTab["Ticket_StatusID"] = this.state.selectedTicketStatusByDate;
    } else {
      dateTab = null;
    }

    // --------------------By Customer Type Tab---------------
    var customerType = {};
    if (this.state.ActiveTabId === 2) {
      customerType["CustomerMobileNo"] = this.state.MobileNoByCustType.trim();
      customerType["CustomerEmailID"] = this.state.EmailIdByCustType.trim();
      customerType["TicketID"] = this.state.TicketIdByCustType.trim();
      customerType[
        "TicketStatusID"
      ] = this.state.selectedTicketStatusByCustomer;
    } else {
      customerType = null;
    }

    // --------------------By Ticket Type Tab-----------------
    var ticketType = {};
    if (this.state.ActiveTabId === 3) {
      let purchaseIds = "";
      let actionTypeIds = "";
      if (this.state.selectedChannelOfPurchase != null) {
        for (let i = 0; i < this.state.selectedChannelOfPurchase.length; i++) {
          purchaseIds +=
            this.state.selectedChannelOfPurchase[i].channelOfPurchaseID + ",";
        }
      }
      if (this.state.selectedTicketActionType != null) {
        for (let i = 0; i < this.state.selectedTicketActionType.length; i++) {
          actionTypeIds +=
            this.state.selectedTicketActionType[i].ticketActionTypeID + ",";
        }
      }
      ticketType["TicketPriorityID"] = this.state.selectedPriority;
      ticketType["TicketStatusID"] = this.state.selectedTicketStatusByTicket;
      ticketType["ChannelOfPurchaseIds"] = purchaseIds;
      ticketType["ActionTypes"] = actionTypeIds;
    } else {
      ticketType = null;
    }
    // --------------------By Category Tab-------------------
    var categoryType = {};
    if (this.state.ActiveTabId === 4) {
      categoryType["CategoryId"] = this.state.selectedCategory;
      categoryType["SubCategoryId"] = this.state.selectedSubCategory;
      categoryType["IssueTypeId"] = this.state.selectedIssueType;
      categoryType[
        "TicketStatusID"
      ] = this.state.selectedTicketStatusByCategory;
    } else {
      categoryType = null;
    }
    //---------------------By Ticket All Tab---------------------
    var allTab = {};

    if (this.state.ActiveTabId === 5) {
      let withClaim = 0;
      let withTask = 0;
      if (this.state.selectedWithClaimAll === "yes") {
        withClaim = 1;
      }
      if (this.state.selectedWithTaskAll === "yes") {
        withTask = 1;
      }

      if (
        this.state.ByAllCreateDate === null ||
        this.state.ByAllCreateDate === undefined ||
        this.state.ByAllCreateDate === ""
      ) {
        allTab["CreatedDate"] = "";
      } else {
        allTab["CreatedDate"] = moment(this.state.ByAllCreateDate).format(
          "YYYY-MM-DD"
        );
      }

      if (
        this.state.ByAllLastDate === null ||
        this.state.ByAllLastDate === undefined ||
        this.state.ByAllLastDate === ""
      ) {
        allTab["ModifiedDate"] = "";
      } else {
        allTab["ModifiedDate"] = moment(this.state.ByAllLastDate).format(
          "YYYY-MM-DD"
        );
      }
      allTab["CategoryId"] = this.state.selectedCategoryAll;
      allTab["SubCategoryId"] = this.state.selectedSubCategoryAll;
      allTab["IssueTypeId"] = this.state.selectedIssueTypeAll;
      allTab["TicketSourceTypeID"] = this.state.selectedTicketSource;
      allTab["TicketIdORTitle"] = this.state.TicketIdTitleByAll.trim();
      allTab["PriorityId"] = this.state.selectedPriorityAll;
      allTab["TicketSatutsID"] = this.state.selectedTicketStatusAll;
      allTab["SLAStatus"] = this.state.selectedSlaStatus;
      allTab["ClaimId"] = this.state.selectedClaimStatus;
      allTab[
        "InvoiceNumberORSubOrderNo"
      ] = this.state.InvoiceSubOrderByAll.trim();
      allTab["OrderItemId"] = this.state.ItemIdByAll.trim();
      allTab["IsVisitStore"] = this.state.selectedVisitStoreAll;
      allTab["IsWantVistingStore"] = this.state.selectedWantToVisitStoreAll;
      allTab["CustomerEmailID"] = this.state.EmailByAll.trim();
      allTab["CustomerMobileNo"] = this.state.MobileByAll.trim();
      allTab["AssignTo"] = this.state.selectedAssignedTo;
      allTab[
        "StoreCodeORAddress"
      ] = this.state.selectedPurchaseStoreCodeAddressAll.trim();
      allTab[
        "WantToStoreCodeORAddress"
      ] = this.state.selectedVisitStoreCodeAddressAll.trim();
      allTab["HaveClaim"] = withClaim;
      allTab["ClaimStatusId"] = this.state.selectedClaimStatus;
      allTab["ClaimCategoryId"] = this.state.selectedClaimCategory;
      allTab["ClaimSubCategoryId"] = this.state.selectedClaimSubCategory;
      allTab["ClaimIssueTypeId"] = this.state.selectedClaimIssueType;
      allTab["HaveTask"] = withTask;
      allTab["TaskStatusId"] = this.state.selectedTaskStatus;
      allTab["TaskDepartment_Id"] = this.state.selectedDepartment;
      allTab["TaskFunction_Id"] = this.state.selectedFunction;
    } else {
      allTab = null;
    }

    // ----------------------SetState variable in Json Format for Apply Search------------------------------------
    var ShowDataparam = {};

    ShowDataparam.HeaderStatusId = this.state.headerActiveId;
    ShowDataparam.ActiveTabId = this.state.ActiveTabId;
    ShowDataparam.searchDataByDate = dateTab;
    ShowDataparam.searchDataByCustomerType = customerType;
    ShowDataparam.searchDataByTicketType = ticketType;
    ShowDataparam.searchDataByCategoryType = categoryType;
    ShowDataparam.SearchDataByAll = allTab;

    var FinalSaveSearchData = JSON.stringify(ShowDataparam);
    this.setState({
      FinalSaveSearchData,
    });

    setTimeout(() => {
      if (this.state.SearchName.length > 0) {
        if (
          this.state.SearchListData.find(
            (item) => item.searchName === this.state.SearchName
          )
        ) {
          self.setState({
            SearchNameExists: "This search name already exists.",
          });
        } else {
          self.setState({
            SearchNameExists: "",
          });
          axios({
            method: "post",
            url: config.apiUrl + "/Ticketing/savesearch",
            headers: authHeader(),
            params: {
              SearchSaveName: this.state.SearchName,
              parameter: this.state.FinalSaveSearchData,
            },
          })
            .then(function (res) {
              let Msg = res.data.message;
              if (Msg === "Success") {
                NotificationManager.success(
                  TranslationContext !== undefined
                    ? TranslationContext.alertmessage
                      .yoursearchhasbeensavedsuccessfully
                    : "Your search has been saved successfully."
                );
                self.handleGetSaveSearchList();
                self.setState({
                  SearchName: "",
                });
              }
            })
            .catch((data) => {
              console.log(data);
            });
        }
      } else {
        self.setState({
          SearchNameCompulsory: "Please Enter Search Name.",
        });
      }
    }, 100);
  }
  handleGetSaveSearchList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/listSavedSearch",
      headers: authHeader(),
    })
      .then(function (res) {
        //debugger
        let data = res.data.responseData;
        self.setState({ SearchListData: data });
      })
      .catch((data) => {
        console.log(data);
      });
  }
  hadleSearchDeleteData(searchDeletId) {
    const TranslationContext = this.state.translateLanguage.default;

    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/deletesavedsearch",
      headers: authHeader(),
      params: {
        SearchParamID: searchDeletId,
      },
    })
      .then(function (res) {
        let Msg = res.data.message;
        if (Msg === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage
                .savedsearchdatadeletedsuccessfully
              : "Saved search data deleted successfully."
          );
          self.handleGetSaveSearchList();
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  ViewSearchData(clrSrch, search) {
    this.state.sortTicketData = [];
    this.state.sortCategoryData = [];
    this.state.sortPriorityData = [];
    this.state.sortcreatedOnData = [];
    this.state.sortAssigneeData = [];
    this.state.sortAllData = [];
    let self = this;
    this.setState({ loading: true });
    self.setState({
      sortFilterTicketData: [],
      sortFilterCategoryData: [],
      sortFilterPriorityData: [],
      sortFilterAssigneeData: [],
      sortFiltercreatedOnData: [],
      viewSearchApi: true,


    })
    // ---------------By Date tab---------------------
    var dateTab = {};
    if (this.state.ActiveTabId === 1) {
      if (
        this.state.ByDateCreatDate === null ||
        this.state.ByDateCreatDate === undefined ||
        this.state.ByDateCreatDate === ""
      ) {
        dateTab["Ticket_CreatedOn"] = "";
      } else {
        dateTab["Ticket_CreatedOn"] = moment(this.state.ByDateCreatDate).format(
          "YYYY-MM-DD"
        );
      }
      if (
        this.state.ByDateSelectDate === null ||
        this.state.ByDateSelectDate === undefined ||
        this.state.ByDateSelectDate === ""
      ) {
        dateTab["Ticket_ModifiedOn"] = "";
      } else {
        dateTab["Ticket_ModifiedOn"] = moment(
          this.state.ByDateSelectDate
        ).format("YYYY-MM-DD");
      }

      let ticketStatusIds = "";

      if (this.state.selectedTicketStatusByDate != null) {
        for (let i = 0; i < this.state.selectedTicketStatusByDate.length; i++) {
          ticketStatusIds +=
            this.state.selectedTicketStatusByDate[i].ticketStatusID + ",";
        }
      }
      dateTab["SLA_DueON"] = this.state.selectedSlaDueByDate.toString();
      dateTab["Ticket_StatusID"] = ticketStatusIds;
      if (clrSrch === 0) {
        if (search !== "savedFilter") {
          let createDate = "";
          let lastUpdateDate = "";
          if (this.state.ByDateCreatDate !== "") {
            createDate = moment(this.state.ByDateCreatDate).format(
              "YYYY-MM-DD"
            );
          }
          if (this.state.ByDateSelectDate !== "") {
            createDate = moment(this.state.ByDateSelectDate).format(
              "YYYY-MM-DD"
            );
          }
          let dateTypeFilter = {
            ByDateCreatDate: createDate,
            ByDateSelectDate: lastUpdateDate,
            selectedSlaDueByDate: this.state.selectedSlaDueByDate,
            selectedTicketStatusByDate: this.state.selectedTicketStatusByDate,
          };

          const isEmpty = Object.values(dateTypeFilter).every(
            (x) => x === null || x === "" || x === 0 || !x.length
          );

          if (!isEmpty) {
            localStorage.setItem(
              "MyTicketListDateTypeFilter",
              JSON.stringify(dateTypeFilter)
            );

            localStorage.removeItem("MyTicketListCustomerTypeFilter");
            localStorage.removeItem("MyTicketListTicketTypeFilter");
            localStorage.removeItem("MyTicketListCategoryTypeFilter");
            localStorage.removeItem("MyTicketListAllTypeFilter");
          }

          // }
        }
      }
    } else {
      dateTab = null;
    }

    // --------------------By Customer Type Tab---------------
    var customerType = {};
    if (this.state.ActiveTabId === 2) {
      let ticketStatusIds = "";
      if (this.state.selectedTicketStatusByCustomer != null) {
        for (
          let i = 0;
          i < this.state.selectedTicketStatusByCustomer.length;
          i++
        ) {
          ticketStatusIds +=
            this.state.selectedTicketStatusByCustomer[i].ticketStatusID + ",";
        }
      }
      customerType["CustomerMobileNo"] = this.state.MobileNoByCustType.trim();
      customerType["CustomerEmailID"] = this.state.EmailIdByCustType.trim();
      customerType["TicketID"] = this.state.TicketIdByCustType.trim() === "" ? 0 : this.state.TicketIdByCustType.trim();
      customerType["TicketStatusID"] = ticketStatusIds;
      customerType["CustomerName"] = this.state.NameByCustType.trim();

      if (clrSrch === 0) {
        if (search !== "savedFilter") {
          let customerTypeFilter = {
            MobileNoByCustType: this.state.MobileNoByCustType,
            EmailIdByCustType: this.state.EmailIdByCustType,
            TicketIdByCustType: this.state.TicketIdByCustType,
            selectedTicketStatusByCustomer: this.state
              .selectedTicketStatusByCustomer,
            NameByCustType: this.state.NameByCustType,
          };

          const isEmpty = Object.values(customerTypeFilter).every(
            (x) => x === null || x === "" || x === 0 || !x.length
          );

          if (!isEmpty) {
            localStorage.setItem(
              "MyTicketListCustomerTypeFilter",
              JSON.stringify(customerTypeFilter)
            );

            localStorage.removeItem("MyTicketListDateTypeFilter");
            localStorage.removeItem("MyTicketListTicketTypeFilter");
            localStorage.removeItem("MyTicketListCategoryTypeFilter");
            localStorage.removeItem("MyTicketListAllTypeFilter");
          }
        }
      }
    } else {
      customerType = null;
    }

    // --------------------By Ticket Type Tab-----------------
    var ticketType = {};
    if (this.state.ActiveTabId === 3) {
      let purchaseIds = "";
      let actionTypeIds = "";
      let priorityIds = "";
      let ticketStatusIds = "";
      if (this.state.selectedChannelOfPurchase != null) {
        for (let i = 0; i < this.state.selectedChannelOfPurchase.length; i++) {
          purchaseIds +=
            this.state.selectedChannelOfPurchase[i].channelOfPurchaseID + ",";
        }
      }
      if (this.state.selectedTicketActionType != null) {
        for (let i = 0; i < this.state.selectedTicketActionType.length; i++) {
          actionTypeIds +=
            this.state.selectedTicketActionType[i].ticketActionTypeID + ",";
        }
      }
      if (this.state.selectedPriority != null) {
        for (let i = 0; i < this.state.selectedPriority.length; i++) {
          priorityIds += this.state.selectedPriority[i].priorityID + ",";
        }
      }
      if (this.state.selectedTicketStatusByTicket != null) {
        for (
          let i = 0;
          i < this.state.selectedTicketStatusByTicket.length;
          i++
        ) {
          ticketStatusIds +=
            this.state.selectedTicketStatusByTicket[i].ticketStatusID + ",";
        }
      }
      ticketType["TicketPriorityID"] = priorityIds;
      ticketType["TicketStatusID"] = ticketStatusIds;
      ticketType["ChannelOfPurchaseIds"] = purchaseIds;
      ticketType["ActionTypes"] = actionTypeIds;
      if (clrSrch === 0) {
        if (search !== "savedFilter") {
          let ticketTypeFilter = {
            selectedPriority: this.state.selectedPriority,
            selectedTicketStatusByTicket: this.state
              .selectedTicketStatusByTicket,
            selectedChannelOfPurchase: this.state.selectedChannelOfPurchase,
            selectedTicketActionType: this.state.selectedTicketActionType,
          };

          const isEmpty = Object.values(ticketTypeFilter).every(
            (x) => x === null || x === "" || x === 0 || !x.length
          );
          if (!isEmpty) {
            localStorage.setItem(
              "MyTicketListTicketTypeFilter",
              JSON.stringify(ticketTypeFilter)
            );

            localStorage.removeItem("MyTicketListDateTypeFilter");
            localStorage.removeItem("MyTicketListCustomerTypeFilter");
            localStorage.removeItem("MyTicketListCategoryTypeFilter");
            localStorage.removeItem("MyTicketListAllTypeFilter");
          }
        }
      }
    } else {
      ticketType = null;
    }
    // --------------------By Category Tab-------------------
    var categoryType = {};
    if (this.state.ActiveTabId === 4) {
      let categoryIds = "";
      let subCategoryIds = "";
      let issueTypeIds = "";
      let ticketStatusIds = "";
      if (this.state.selectedCategory != null) {
        for (let i = 0; i < this.state.selectedCategory.length; i++) {
          categoryIds += this.state.selectedCategory[i].categoryID + ",";
        }
      }
      if (this.state.selectedSubCategory != null) {
        for (let i = 0; i < this.state.selectedSubCategory.length; i++) {
          subCategoryIds +=
            this.state.selectedSubCategory[i].subCategoryID + ",";
        }
      }
      if (this.state.selectedIssueType != null) {
        for (let i = 0; i < this.state.selectedIssueType.length; i++) {
          issueTypeIds += this.state.selectedIssueType[i].issueTypeID + ",";
        }
      }
      if (this.state.selectedTicketStatusByCategory != null) {
        for (
          let i = 0;
          i < this.state.selectedTicketStatusByCategory.length;
          i++
        ) {
          ticketStatusIds +=
            this.state.selectedTicketStatusByCategory[i].ticketStatusID + ",";
        }
      }
      categoryType["CategoryId"] = categoryIds;
      categoryType["SubCategoryId"] = subCategoryIds;
      categoryType["IssueTypeId"] = issueTypeIds;
      categoryType["TicketStatusID"] = ticketStatusIds;
      if (clrSrch === 0) {
        if (search !== "savedFilter") {
          let categoryTypeFilter = {
            selectedCategory: this.state.selectedCategory,
            selectedSubCategory: this.state.selectedSubCategory,
            selectedIssueType: this.state.selectedIssueType,
            selectedTicketStatusByCategory: this.state
              .selectedTicketStatusByCategory,
          };

          const isEmpty = Object.values(categoryTypeFilter).every(
            (x) => x === null || x === "" || x === 0 || !x.length
          );

          if (!isEmpty) {
            localStorage.setItem(
              "MyTicketListCategoryTypeFilter",
              JSON.stringify(categoryTypeFilter)
            );

            localStorage.removeItem("MyTicketListDateTypeFilter");
            localStorage.removeItem("MyTicketListCustomerTypeFilter");
            localStorage.removeItem("MyTicketListTicketTypeFilter");
            localStorage.removeItem("MyTicketListAllTypeFilter");
          }

          // }
        }
      }
    } else {
      categoryType = null;
    }
    //---------------------By Ticket All Tab---------------------
    var allTab = {};

    if (this.state.ActiveTabId === 5) {
      let withClaim = 0;
      let withTask = 0;
      if (this.state.selectedWithClaimAll === "yes") {
        withClaim = 1;
      }
      if (this.state.selectedWithTaskAll === "yes") {
        withTask = 1;
      }

      if (
        this.state.ByAllCreateDate === null ||
        this.state.ByAllCreateDate === undefined ||
        this.state.ByAllCreateDate === ""
      ) {
        allTab["CreatedDate"] = "";
      } else {
        allTab["CreatedDate"] = moment(this.state.ByAllCreateDate).format(
          "YYYY-MM-DD"
        );
      }

      if (
        this.state.ByAllLastDate === null ||
        this.state.ByAllLastDate === undefined ||
        this.state.ByAllLastDate === ""
      ) {
        allTab["ModifiedDate"] = "";
      } else {
        allTab["ModifiedDate"] = moment(this.state.ByAllLastDate).format(
          "YYYY-MM-DD"
        );
      }
      let categoryIds = "";
      let subCategoryIds = "";
      let issueTypeIds = "";
      let ticketSourceIds = "";
      let priorityIds = "";
      let ticketStatusIds = "";
      let assignedToIds = "";
      let claimStatusIds = "";
      let claimCategoryIds = "";
      let claimSubCategoryIds = "";
      let claimIssueTypeIds = "";
      let taskStatusIds = "";
      let taskDepartmentIds = "";
      let taskFunctionIds = "";

      if (this.state.selectedCategoryAll != null) {
        for (let i = 0; i < this.state.selectedCategoryAll.length; i++) {
          categoryIds += this.state.selectedCategoryAll[i].categoryID + ",";
        }
      }
      if (this.state.selectedSubCategoryAll != null) {
        for (let i = 0; i < this.state.selectedSubCategoryAll.length; i++) {
          subCategoryIds +=
            this.state.selectedSubCategoryAll[i].subCategoryID + ",";
        }
      }
      if (this.state.selectedIssueTypeAll != null) {
        for (let i = 0; i < this.state.selectedIssueTypeAll.length; i++) {
          issueTypeIds += this.state.selectedIssueTypeAll[i].issueTypeID + ",";
        }
      }

      if (this.state.selectedTicketSource != null) {
        for (let i = 0; i < this.state.selectedTicketSource.length; i++) {
          ticketSourceIds +=
            this.state.selectedTicketSource[i].ticketSourceId + ",";
        }
      }
      if (this.state.selectedPriorityAll != null) {
        for (let i = 0; i < this.state.selectedPriorityAll.length; i++) {
          priorityIds += this.state.selectedPriorityAll[i].priorityID + ",";
        }
      }

      if (this.state.selectedTicketStatusAll != null) {
        for (let i = 0; i < this.state.selectedTicketStatusAll.length; i++) {
          ticketStatusIds +=
            this.state.selectedTicketStatusAll[i].ticketStatusID + ",";
        }
      }

      if (this.state.selectedAssignedTo != null) {
        for (let i = 0; i < this.state.selectedAssignedTo.length; i++) {
          assignedToIds += this.state.selectedAssignedTo[i].userID + ",";
        }
      }

      if (this.state.selectedClaimStatus != null) {
        for (let i = 0; i < this.state.selectedClaimStatus.length; i++) {
          claimStatusIds +=
            this.state.selectedClaimStatus[i].claimStatusID + ",";
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

      allTab["CategoryId"] = categoryIds;
      allTab["SubCategoryId"] = subCategoryIds;
      allTab["IssueTypeId"] = issueTypeIds;
      allTab["TicketSourceTypeID"] = ticketSourceIds;
      allTab["TicketIdORTitle"] = this.state.TicketIdTitleByAll.trim();
      allTab["PriorityId"] = priorityIds;
      allTab["TicketSatutsID"] = ticketStatusIds;
      allTab["SLAStatus"] = this.state.selectedSlaStatus.toString();
      allTab["ClaimId"] = this.state.ClaimIdByAll;
      allTab[
        "InvoiceNumberORSubOrderNo"
      ] = this.state.InvoiceSubOrderByAll.trim();
      allTab["OrderItemId"] = this.state.ItemIdByAll.trim();
      allTab["IsVisitStore"] = this.state.selectedVisitStoreAll;
      allTab["IsWantVistingStore"] = this.state.selectedWantToVisitStoreAll;
      allTab["CustomerEmailID"] = this.state.EmailByAll.trim();
      allTab["CustomerMobileNo"] = this.state.MobileByAll.trim();
      allTab["AssignTo"] = assignedToIds;
      allTab[
        "StoreCodeORAddress"
      ] = this.state.selectedPurchaseStoreCodeAddressAll.trim();
      allTab[
        "WantToStoreCodeORAddress"
      ] = this.state.selectedVisitStoreCodeAddressAll.trim();
      allTab["HaveClaim"] = withClaim == false ? false : true;
      allTab["ClaimStatusId"] = claimStatusIds;
      allTab["ClaimCategoryId"] = claimCategoryIds;
      allTab["ClaimSubCategoryId"] = claimSubCategoryIds;
      allTab["ClaimIssueTypeId"] = claimIssueTypeIds;
      allTab["HaveTask"] = withTask == false ? false : true;
      allTab["TaskStatusId"] = taskStatusIds;
      allTab["TaskDepartment_Id"] = taskDepartmentIds;
      allTab["TaskFunction_Id"] = taskFunctionIds;

      if (clrSrch === 0) {
        if (search !== "savedFilter") {
          let createDate = "";
          let allLastDate = "";
          if (this.state.ByAllCreateDate) {
            createDate = moment(this.state.ByAllCreateDate).format(
              "YYYY-MM-DD"
            );
          }

          if (this.state.ByAllLastDate) {
            allLastDate = moment(this.state.ByAllLastDate).format("YYYY-MM-DD");
          }

          let allTypeFilter = {
            ByAllCreateDate: createDate,
            selectedTicketSource: this.state.selectedTicketSource,
            ClaimIdByAll: this.state.ClaimIdByAll,
            EmailByAll: this.state.EmailByAll,
            ByAllLastDate: allLastDate,
            TicketIdTitleByAll: this.state.TicketIdTitleByAll,
            InvoiceSubOrderByAll: this.state.InvoiceSubOrderByAll,
            MobileByAll: this.state.MobileByAll,
            selectedCategoryAll: this.state.selectedCategoryAll,
            selectedPriorityAll: this.state.selectedPriorityAll,
            ItemIdByAll: this.state.ItemIdByAll,
            selectedAssignedTo: this.state.selectedAssignedTo,
            selectedAssignedToAll: this.state.selectedAssignedToAll,
            selectedSubCategoryAll: this.state.selectedSubCategoryAll,
            selectedTicketStatusAll: this.state.selectedTicketStatusAll,
            selectedVisitStoreAll: this.state.selectedVisitStoreAll,
            selectedPurchaseStoreCodeAddressAll: this.state
              .selectedPurchaseStoreCodeAddressAll,
            selectedIssueTypeAll: this.state.selectedIssueTypeAll,
            selectedSlaStatus: this.state.selectedSlaStatus,
            selectedWantToVisitStoreAll: this.state.selectedWantToVisitStoreAll,
            selectedVisitStoreCodeAddressAll: this.state
              .selectedVisitStoreCodeAddressAll,
            selectedWithClaimAll: this.state.selectedWithClaimAll,
            selectedClaimStatus: this.state.selectedClaimStatus,
            selectedClaimCategory: this.state.selectedClaimCategory,
            selectedClaimSubCategory: this.state.selectedClaimSubCategory,
            selectedClaimIssueType: this.state.selectedClaimIssueType,
            selectedWithTaskAll: this.state.selectedWithTaskAll,
            selectedTaskStatus: this.state.selectedTaskStatus,
            selectedDepartment: this.state.selectedDepartment,
            selectedFunction: this.state.selectedFunction,
          };

          const isEmpty = Object.values(allTypeFilter).every(
            (x) => x === null || x === "" || x === 0 || !x.length
          );

          if (!isEmpty) {
            localStorage.setItem(
              "MyTicketListAllTypeFilter",
              JSON.stringify(allTypeFilter)
            );

            localStorage.removeItem("MyTicketListDateTypeFilter");
            localStorage.removeItem("MyTicketListCustomerTypeFilter");
            localStorage.removeItem("MyTicketListTicketTypeFilter");
            localStorage.removeItem("MyTicketListCategoryTypeFilter");
          }
        }
      }
    } else {
      allTab = null;
    }

    // ----------------------SetState variable in Json Format for Apply Search------------------------------------
    var ShowDataparam = {};

    ShowDataparam.HeaderStatusId = this.state.headerActiveId;
    ShowDataparam.ActiveTabId = this.state.ActiveTabId;
    ShowDataparam.searchDataByDate = dateTab;
    ShowDataparam.searchDataByCustomerType = customerType;
    ShowDataparam.searchDataByTicketType = ticketType;
    ShowDataparam.searchDataByCategoryType = categoryType;
    ShowDataparam.SearchDataByAll = allTab;

    var FinalSaveSearchData = JSON.stringify(ShowDataparam);
    this.setState({
      FinalSaveSearchData,
    });
    //----------------------------------------------------------
    axios({
      method: "post",
      url: config.apiUrl + "/Search/GetTicketsOnSearch",
      headers: authHeader(),
      data: {
        HeaderStatusId: this.state.headerActiveId,
        ActiveTabId: this.state.ActiveTabId,
        searchDataByDate: dateTab,
        searchDataByCustomerType: customerType,
        searchDataByTicketType: ticketType,
        searchDataByCategoryType: categoryType,
        SearchDataByAll: allTab,
        pageNumber: this.state.currentPage,
        pageSize: this.state.postsPerPage

      },
    })
      .then(function (res) {
        debugger
        let statusCodeg = res.data.statusCode
        if (statusCodeg === 1001) {
          self.setState({
            newresultCount: 0,
            loading: false,
            tabletotalPages: 0,
            SearchTicketData:[]



          })

        }
        else {
          let status = res.data.message;
          let data = res.data.responseData;
          let CVData = res.data.responseData;
          let totalpage = res.data.totalPage
          let newresultCount = data[0]?.totalpages
          //console.log("newresultCount",newresultCount)

          let count = 0;
          if (data !== null) {
            if (res.data.responseData != null) {
              count = res.data.responseData.length;
            }

            if (data !== null) {
              self.state.sortAllData = data;
              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (!unique[data[i].ticketStatus]) {
                  distinct.push(data[i].ticketStatus);
                  unique[data[i].ticketStatus] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                self.state.sortTicketData.push({ ticketStatus: distinct[i] });
                self.state.sortFilterTicketData.push({
                  ticketStatus: distinct[i],
                });
              }

              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (!unique[data[i].category]) {
                  distinct.push(data[i].category);
                  unique[data[i].category] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                self.state.sortCategoryData.push({ category: distinct[i] });
                self.state.sortFilterCategoryData.push({ category: distinct[i] });
              }

              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (!unique[data[i].priority]) {
                  distinct.push(data[i].priority);
                  unique[data[i].priority] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                self.state.sortPriorityData.push({ priority: distinct[i] });
                self.state.sortFilterPriorityData.push({ priority: distinct[i] });
              }

              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (!unique[data[i].createdOn]) {
                  distinct.push(data[i].createdOn);
                  unique[data[i].createdOn] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                self.state.sortcreatedOnData.push({ createdOn: distinct[i] });
                self.state.sortFiltercreatedOnData.push({
                  createdOn: distinct[i],
                });
              }

              var unique = [];
              var distinct = [];
              for (let i = 0; i < data.length; i++) {
                if (!unique[data[i].assignedTo]) {
                  distinct.push(data[i].assignedTo);
                  unique[data[i].assignedTo] = 1;
                }
              }
              for (let i = 0; i < distinct.length; i++) {
                self.state.sortAssigneeData.push({ assignedTo: distinct[i] });
                self.state.sortFilterAssigneeData.push({
                  assignedTo: distinct[i],
                });
              }
            }
          }

          if (status === "Success") {
            self.setState({
              SearchTicketData: data,
              tabletotalPages: totalpage,
              newresultCount: newresultCount,

            });

            if (data !== null) {
              for (let i = 0; i < CVData.length; i++) {
                delete CVData[i].totalpages;
                delete CVData[i].responseTimeRemainingBy;
                delete CVData[i].responseOverdueBy;
                delete CVData[i].resolutionOverdueBy;
              }
              self.setState({ CSVDownload: CVData });
            }
            if (clrSrch === 1) {
              self.setState({
                resultCount: count,
                loading: false,
              });
            } else {
              self.setState({
                resultCount: count,
                loading: false,
              });
            }
          } else {
            self.setState({
              SearchTicketData: [],
              resultCount: 0,
              loading: false,
            });
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  setAssignedToValue = (e) => {
    let assign = e;
    this.setState({ selectedAssignedTo: assign });
  };

  setDepartmentValue = (e) => {
    let departmentValue = e;
    this.setState({ selectedDepartment: departmentValue });

    setTimeout(() => {
      if (this.state.selectedDepartment) {
        this.handleGetFunctionList();
      }
    }, 1);
  };
  setFunctionValue = (e) => {
    let functionValue = e;
    this.setState({ selectedFunction: functionValue });
  };
  setDesignationValue = (e) => {
    let designationValue = e.currentTarget.value;
    this.setState({ selectedDesignation: designationValue });
  };
  setPriorityValue = (e) => {
    let priorityValue = e;
    this.setState({ selectedPriority: priorityValue });
  };
  setPriorityAllValue = (e) => {
    let priorityAllValue = e;
    this.setState({ selectedPriorityAll: priorityAllValue });
  };

  handleAssignedToAll = (e) => {
    let assignedToAllValue = e.currentTarget.value;
    this.setState({ selectedAssignedToAll: assignedToAllValue });
  };

  setChannelOfPurchaseValue = (e) => {
    this.setState({ selectedChannelOfPurchase: e });
  };
  setTeamMember = (e) => {
    if (e !== null) {
      var selectedTeamMemberCommaSeperated = Array.prototype.map
        .call(e, (s) => s.fullName)
        .toString();
    }
    this.setState({ selectedTeamMember: e, selectedTeamMemberCommaSeperated });
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
  setTicketActionTypeValue = (e) => {
    this.setState({ selectedTicketActionType: e });
  };
  handleTicketStatusByDate = (e) => {
    let ticketStatusValue = e;
    this.setState({ selectedTicketStatusByDate: ticketStatusValue });
  };
  handleSlaDueByDate = (e) => {
    let slaDueValue = e.target.value;
    this.setState({ selectedSlaDueByDate: slaDueValue });
  };
  handleClaimStatus = (e) => {
    let claimStatusValue = e;
    this.setState({ selectedClaimStatus: claimStatusValue });
  };
  handleTaskStatus = (e) => {
    let taskStatusValue = e;
    this.setState({ selectedTaskStatus: taskStatusValue });
  };
  handleTicketStatusByCustomer = (e) => {
    let ticketStatusValue = e;
    this.setState({ selectedTicketStatusByCustomer: ticketStatusValue });
  };
  handleTicketStatusByTicket = (e) => {
    let ticketStatusValue = e;
    this.setState({ selectedTicketStatusByTicket: ticketStatusValue });
  };
  handleTicketStatusByCategory = (e) => {
    let ticketStatusValue = e;
    this.setState({ selectedTicketStatusByCategory: ticketStatusValue });
  };
  handleTicketStatusAll = (e) => {
    let ticketStatusAllValue = e;
    this.setState({ selectedTicketStatusAll: ticketStatusAllValue });
  };
  handleVisitStoreAll = (e) => {
    let visitStoreAllValue = e.currentTarget.value;
    this.setState({ selectedVisitStoreAll: visitStoreAllValue });
  };
  handleWithClaimAll = (e) => {
    let withClaimAllValue = e.currentTarget.value;
    this.setState({ selectedWithClaimAll: withClaimAllValue });
  };
  handleWithTaskAll = (e) => {
    let withTaskAllValue = e.currentTarget.value;
    this.setState({ selectedWithTaskAll: withTaskAllValue });
  };
  handleWantToVisitStoreAll = (e) => {
    let wantToVisitStoreAllValue = e.currentTarget.value;
    this.setState({ selectedWantToVisitStoreAll: wantToVisitStoreAllValue });
  };
  handlePurchaseStoreCodeAddressAll = (e) => {
    let purchaseStoreCodeAddressAllValue = e.currentTarget.value;
    this.setState({
      selectedPurchaseStoreCodeAddressAll: purchaseStoreCodeAddressAllValue,
    });
  };
  handleVisitStoreCodeAddressAll = (e) => {
    let visitStoreCodeAddressAllValue = e.currentTarget.value;
    this.setState({
      selectedVisitStoreCodeAddressAll: visitStoreCodeAddressAllValue,
    });
  };
  setTicketSourceValue = (e) => {
    let ticketSourceValue = e;
    this.setState({ selectedTicketSource: ticketSourceValue });
  };
  setSlaStatusValue = (e) => {
    let slaStatusValue = e.target.value;
    this.setState({ selectedSlaStatus: slaStatusValue });
  };
  setCategoryValue = (e) => {
    let categoryValue = e;
    this.setState({ selectedCategory: categoryValue });
    setTimeout(() => {
      if (this.state.selectedCategory) {
        this.handleGetSubCategoryList("categoryTab");
      }
    }, 1);
  };
  setClaimCategoryValue = (e) => {
    let claimCategoryValue = e;
    this.setState({ selectedClaimCategory: claimCategoryValue });
    setTimeout(() => {
      if (this.state.selectedClaimCategory) {
        this.handleGetSubCategoryList("allClaimTab");
      }
    }, 1);
  };
  setCategoryAllValue = (e) => {
    let categoryAllValue = e;
    this.setState({ selectedCategoryAll: categoryAllValue });
    setTimeout(() => {
      if (this.state.selectedCategoryAll) {
        this.handleGetSubCategoryList("allTab");
      }
    }, 1);
  };
  setSubCategoryValue = (e) => {
    let subCategoryValue = e;
    this.setState({ selectedSubCategory: subCategoryValue });

    setTimeout(() => {
      if (this.state.selectedSubCategory) {
        this.handleGetIssueTypeList("categoryTab");
      }
    }, 1);
  };
  setClaimSubCategoryValue = (e) => {
    let claimSubCategoryValue = e;
    this.setState({ selectedClaimSubCategory: claimSubCategoryValue });

    setTimeout(() => {
      if (this.state.selectedClaimSubCategory) {
        this.handleGetIssueTypeList("allClaimTab");
      }
    }, 1);
  };
  setSubCategoryAllValue = (e) => {
    let subCategoryAllValue = e;
    this.setState({ selectedSubCategoryAll: subCategoryAllValue });

    setTimeout(() => {
      if (this.state.selectedSubCategoryAll) {
        this.handleGetIssueTypeList("allTab");
      }
    }, 1);
  };
  setIssueTypeValue = (e) => {
    let issueTypeValue = e;
    this.setState({ selectedIssueType: issueTypeValue });
  };
  setClaimIssueTypeValue = (e) => {
    let claimIssueTypeValue = e;
    this.setState({ selectedClaimIssueType: claimIssueTypeValue });
  };
  setIssueTypeAllValue = (e) => {
    let issueTypeAllValue = e;
    this.setState({ selectedIssueTypeAll: issueTypeAllValue });
  };

  StatusOpenModel(data, header) {
    if (
      this.state.sortFilterTicketData.length === 0 ||
      this.state.sortFilterCategoryData.length === 0 ||
      this.state.sortFilterPriorityData.length === 0 ||
      this.state.sortFiltercreatedOnData.length === 0 ||
      this.state.sortFilterAssigneeData.length === 0
    ) {
      return false;
    }
    if (data === "status") {
      if (
        this.state.scategoryFilterCheckbox !== "" ||
        this.state.spriorityFilterCheckbox !== "" ||
        this.state.screatedOnFilterCheckbox !== "" ||
        this.state.sassignedToFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumnName: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          scategoryFilterCheckbox: "",
          spriorityFilterCheckbox: "",
          screatedOnFilterCheckbox: "",
          sassignedToFilterCheckbox: "",
          StatusModel: true,
          sortColumnName: data,
          sortHeader: header,
        });
      }
    }
    if (data === "category") {
      if (
        this.state.sticketStatusFilterCheckbox !== "" ||
        this.state.spriorityFilterCheckbox !== "" ||
        this.state.screatedOnFilterCheckbox !== "" ||
        this.state.sassignedToFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumnName: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sticketStatusFilterCheckbox: "",
          spriorityFilterCheckbox: "",
          screatedOnFilterCheckbox: "",
          sassignedToFilterCheckbox: "",
          StatusModel: true,
          sortColumnName: data,
          sortHeader: header,
        });
      }
    }
    if (data === "priority") {
      if (
        this.state.sticketStatusFilterCheckbox !== "" ||
        this.state.scategoryFilterCheckbox !== "" ||
        this.state.screatedOnFilterCheckbox !== "" ||
        this.state.sassignedToFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumnName: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sticketStatusFilterCheckbox: "",
          scategoryFilterCheckbox: "",
          screatedOnFilterCheckbox: "",
          sassignedToFilterCheckbox: "",
          StatusModel: true,
          sortColumnName: data,
          sortHeader: header,
        });
      }
    }
    if (data === "createdOn") {
      if (
        this.state.sticketStatusFilterCheckbox !== "" ||
        this.state.spriorityFilterCheckbox !== "" ||
        this.state.scategoryFilterCheckbox !== "" ||
        this.state.sassignedToFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumnName: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sassignedToFilterCheckbox: "",
          scategoryFilterCheckbox: "",
          spriorityFilterCheckbox: "",
          sticketStatusFilterCheckbox: "",
          StatusModel: true,
          sortColumnName: data,
          sortHeader: header,
        });
      }
    }
    if (data === "assignedTo") {
      if (
        this.state.screatedOnFilterCheckbox !== "" ||
        this.state.spriorityFilterCheckbox !== "" ||
        this.state.scategoryFilterCheckbox !== "" ||
        this.state.sticketStatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumnName: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sticketStatusFilterCheckbox: "",
          scategoryFilterCheckbox: "",
          spriorityFilterCheckbox: "",
          screatedOnFilterCheckbox: "",
          StatusModel: true,
          sortColumnName: data,
          sortHeader: header,
        });
      }
    }
  }
  StatusCloseModel() {
    var tempFinalSearchTicketData = [];
    if (this.state.tempSearchTicketData.length > 0) {
      var tempSearchTicketData = this.state.tempSearchTicketData;
      var tempColor = [];
      if (this.state.isRed) {
        var tempFilterData = tempSearchTicketData.filter(
          (a) => a.isEscalation === 1
        );
        if (tempFilterData.length > 0) {
          for (let i = 0; i < tempFilterData.length; i++) {
            tempColor.push(tempFilterData[i]);
          }
        }
      }
      if (this.state.isWhite) {
        var tempFilterData = tempSearchTicketData.filter(
          (a) =>
            a.isEscalation === 0 &&
            a.isSLANearBreach === false &&
            a.isReassigned === false
        );
        if (tempFilterData.length > 0) {
          for (let i = 0; i < tempFilterData.length; i++) {
            tempColor.push(tempFilterData[i]);
          }
        }
      }
      if (this.state.isYellow) {
        var tempFilterData = tempSearchTicketData.filter(
          (a) => a.isSLANearBreach === true
        );
        if (tempFilterData.length > 0) {
          for (let i = 0; i < tempFilterData.length; i++) {
            tempColor.push(tempFilterData[i]);
          }
        }
      }
      if (this.state.isGreen) {
        var tempFilterData = tempSearchTicketData.filter(
          (a) => a.isReassigned === true && a.isEscalation === 0
        );
        if (tempFilterData.length > 0) {
          for (let i = 0; i < tempFilterData.length; i++) {
            tempColor.push(tempFilterData[i]);
          }
        }
      }
      if (tempColor.length > 0) {
        tempFinalSearchTicketData = tempColor;
      } else {
        tempFinalSearchTicketData = this.state.tempSearchTicketData;
      }

      // if (this.state.sortColumnName === "status") {
      //   if (this.state.sticketStatusFilterCheckbox === "") {
      //   } else {
      //     this.setState({
      //       scategoryFilterCheckbox: "",
      //       spriorityFilterCheckbox: "",
      //       screatedOnFilterCheckbox: "",
      //       sassignedToFilterCheckbox: "",
      //     });
      //   }
      // }
      // if (this.state.sortColumnName === "category") {
      //   if (this.state.scategoryFilterCheckbox === "") {
      //   } else {
      //     this.setState({
      //       sticketStatusFilterCheckbox: "",
      //       spriorityFilterCheckbox: "",
      //       screatedOnFilterCheckbox: "",
      //       sassignedToFilterCheckbox: "",
      //     });
      //   }
      // }
      // if (this.state.sortColumnName === "priority") {
      //   if (this.state.spriorityFilterCheckbox === "") {
      //   } else {
      //     this.setState({
      //       sticketStatusFilterCheckbox: "",
      //       scategoryFilterCheckbox: "",
      //       screatedOnFilterCheckbox: "",
      //       sassignedToFilterCheckbox: "",
      //     });
      //   }
      // }
      // if (this.state.sortColumnName === "createdOn") {
      //   if (this.state.screatedOnFilterCheckbox === "") {
      //   } else {
      //     this.setState({
      //       sticketStatusFilterCheckbox: "",
      //       scategoryFilterCheckbox: "",
      //       spriorityFilterCheckbox: "",
      //       sassignedToFilterCheckbox: "",
      //     });
      //   }
      // }
      // if (this.state.sortColumnName === "assignedTo") {
      //   if (this.state.sassignedToFilterCheckbox === "") {
      //   } else {
      //     this.setState({
      //       sticketStatusFilterCheckbox: "",
      //       scategoryFilterCheckbox: "",
      //       spriorityFilterCheckbox: "",
      //       screatedOnFilterCheckbox: "",
      //     });
      //   }
      // }
      // this.setState({
      //   sortFilterTicketData: this.state.sortTicketData,
      //   sortFilterCategoryData: this.state.sortCategoryData,
      //   sortFilterPriorityData: this.state.sortPriorityData,
      //   sortFiltercreatedOnData: this.state.sortcreatedOnData,
      //   sortFilterAssigneeData: this.state.sortAssigneeData,
      // });
    } else {
      var tempSearchTicketData = [];

      // this.setState({
      //   sortFilterTicketData: this.state.sortTicketData,
      //   sortFilterCategoryData: this.state.sortCategoryData,
      //   sortFilterPriorityData: this.state.sortPriorityData,
      //   sortFiltercreatedOnData: this.state.sortcreatedOnData,
      //   sortFilterAssigneeData: this.state.sortAssigneeData,
      // });
      if (this.state.isortA) {
        tempSearchTicketData = this.state.SearchTicketData;
      } else {
        tempSearchTicketData = this.state.sortAllData;
      }
      var tempColor = [];
      if (this.state.isRed) {
        var tempFilterData = tempSearchTicketData.filter(
          (a) => a.isEscalation === 1
        );
        if (tempFilterData.length > 0) {
          for (let i = 0; i < tempFilterData.length; i++) {
            tempColor.push(tempFilterData[i]);
          }
        }
      }
      if (this.state.isWhite) {
        var tempFilterData = tempSearchTicketData.filter(
          (a) =>
            a.isEscalation === 0 &&
            a.isSLANearBreach === false &&
            a.isReassigned === false
        );
        if (tempFilterData.length > 0) {
          for (let i = 0; i < tempFilterData.length; i++) {
            tempColor.push(tempFilterData[i]);
          }
        }
      }
      if (this.state.isYellow) {
        var tempFilterData = tempSearchTicketData.filter(
          (a) => a.isSLANearBreach === true
        );
        if (tempFilterData.length > 0) {
          for (let i = 0; i < tempFilterData.length; i++) {
            tempColor.push(tempFilterData[i]);
          }
        }
      }
      if (this.state.isGreen) {
        var tempFilterData = tempSearchTicketData.filter(
          (a) => a.isReassigned === true && a.isEscalation === 0
        );
        if (tempFilterData.length > 0) {
          for (let i = 0; i < tempFilterData.length; i++) {
            tempColor.push(tempFilterData[i]);
          }
        }
      }
      if (tempColor.length > 0) {
        tempFinalSearchTicketData = tempColor;
      } else {
        tempFinalSearchTicketData = tempSearchTicketData;
      }
    }
    this.handleGetUniqueValues(tempSearchTicketData);

    this.setState({
      StatusModel: false,
      filterTxtValue: "",
      sFilterCheckbox: "",
      isRed: false,
      isWhite: false,
      isYellow: false,
      isGreen: false,
      SearchTicketData: tempFinalSearchTicketData,
    });
  }
  toggleSearch() {
    this.handleGetSaveSearchList();
    this.setState((state) => ({ collapseSearch: !state.collapseSearch }));
    if (this.state.collapseSearch) {
      // var paramdata = "";
      // if (this.state.headerActiveId === 1001) {
      //   paramdata = "Escalation";
      // } else if (this.state.headerActiveId === 101) {
      //   paramdata = "New";
      // } else if (this.state.headerActiveId === 102) {
      //   paramdata = "Open";
      // } else if (this.state.headerActiveId === 103) {
      //   paramdata = "Resolved";
      // } else if (this.state.headerActiveId === 104) {
      //   paramdata = "Closed";
      // } else if (this.state.headerActiveId === 105) {
      //   paramdata = "ReOpen";
      // } else if (this.state.headerActiveId === 1004) {
      //   paramdata = "Reassigned";
      // } else if (this.state.headerActiveId === 1002) {
      //   paramdata = "All";
      // } else if (this.state.headerActiveId === 1003) {
      //   paramdata = "FollowUp";
      // }
      // //Ui Update status id will be passed
      // this.handleSearchTicket(paramdata);
      this.handleSearchTicket(this.state.headerActiveId);
    }
  }
  handleByDateCreate(date) {
    this.setState({ ByDateCreatDate: date });
  }
  handleChangeSelectDate(date) {
    this.setState({ ByDateSelectDate: date });
  }
  handleAllCreateDate(date) {
    this.setState({ ByAllCreateDate: date });
  }
  handleAllLastDate(date) {
    this.setState({ ByAllLastDate: date });
  }
  ScheduleOpenModel = () => {
    this.setState({ Schedule: true });
  };
  ScheduleCloseModel = () => {
    this.setState({ Schedule: false });
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };

  hanleChange = () => {
    this.props.history.push("/admin/addSearchMyTicket");
  };
  handleAssignModalOpen() {
    this.setState({ AssignModal: true });
  }
  handleAssignModalClose() {
    this.setState({ AssignModal: false });
  }
  clickCheckbox(evt) {
    evt.stopPropagation();
  }

  setSortCheckStatus = (column, type, e) => {
    var itemsArray = this.state.tempSearchTicketData;
    var sticketStatusFilterCheckbox = this.state.sticketStatusFilterCheckbox;
    var scategoryFilterCheckbox = this.state.scategoryFilterCheckbox;
    var spriorityFilterCheckbox = this.state.spriorityFilterCheckbox;
    var screatedOnFilterCheckbox = this.state.screatedOnFilterCheckbox;
    var sassignedToFilterCheckbox = this.state.sassignedToFilterCheckbox;

    if (column === "status" || column === "all") {
      if (type === "value" && type !== "All") {
        sticketStatusFilterCheckbox = sticketStatusFilterCheckbox.replace(
          "all",
          ""
        );
        sticketStatusFilterCheckbox = sticketStatusFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sticketStatusFilterCheckbox.includes(e.currentTarget.value)) {
          sticketStatusFilterCheckbox = sticketStatusFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sticketStatusFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sticketStatusFilterCheckbox.includes("all")) {
          sticketStatusFilterCheckbox = "";
        } else {
          if (this.state.sortColumnName === "status") {
            sticketStatusFilterCheckbox = "";
            for (let i = 0; i < this.state.sortTicketData.length; i++) {
              sticketStatusFilterCheckbox +=
                this.state.sortTicketData[i].ticketStatus + ",";
            }
            sticketStatusFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "category" || column === "all") {
      if (type === "value" && type !== "All") {
        scategoryFilterCheckbox = scategoryFilterCheckbox.replace("all", "");
        scategoryFilterCheckbox = scategoryFilterCheckbox.replace("all,", "");
        if (scategoryFilterCheckbox.includes(e.currentTarget.value)) {
          scategoryFilterCheckbox = scategoryFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          scategoryFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (scategoryFilterCheckbox.includes("all")) {
          scategoryFilterCheckbox = "";
        } else {
          if (this.state.sortColumnName === "category") {
            scategoryFilterCheckbox = "";
            for (let i = 0; i < this.state.sortCategoryData.length; i++) {
              scategoryFilterCheckbox +=
                this.state.sortCategoryData[i].category + ",";
            }
            scategoryFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "priority" || column === "all") {
      if (type === "value" && type !== "All") {
        spriorityFilterCheckbox = spriorityFilterCheckbox.replace("all", "");
        spriorityFilterCheckbox = spriorityFilterCheckbox.replace("all,", "");
        if (spriorityFilterCheckbox.includes(e.currentTarget.value)) {
          spriorityFilterCheckbox = spriorityFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          spriorityFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (spriorityFilterCheckbox.includes("all")) {
          spriorityFilterCheckbox = "";
        } else {
          if (this.state.sortColumnName === "priority") {
            spriorityFilterCheckbox = "";
            for (let i = 0; i < this.state.sortPriorityData.length; i++) {
              spriorityFilterCheckbox +=
                this.state.sortPriorityData[i].priority + ",";
            }
            spriorityFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "createdOn" || column === "all") {
      if (type === "value" && type !== "All") {
        screatedOnFilterCheckbox = screatedOnFilterCheckbox.replace("all", "");
        screatedOnFilterCheckbox = screatedOnFilterCheckbox.replace("all,", "");
        if (screatedOnFilterCheckbox.includes(e.currentTarget.value)) {
          screatedOnFilterCheckbox = screatedOnFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          screatedOnFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (screatedOnFilterCheckbox.includes("all")) {
          screatedOnFilterCheckbox = "";
        } else {
          if (this.state.sortColumnName === "createdOn") {
            screatedOnFilterCheckbox = "";
            for (let i = 0; i < this.state.sortcreatedOnData.length; i++) {
              screatedOnFilterCheckbox +=
                this.state.sortcreatedOnData[i].createdOn + ",";
            }
            screatedOnFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "assignedTo" || column === "all") {
      if (type === "value" && type !== "All") {
        sassignedToFilterCheckbox = sassignedToFilterCheckbox.replace(
          "all",
          ""
        );
        sassignedToFilterCheckbox = sassignedToFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sassignedToFilterCheckbox.includes(e.currentTarget.value)) {
          sassignedToFilterCheckbox = sassignedToFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sassignedToFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sassignedToFilterCheckbox.includes("all")) {
          sassignedToFilterCheckbox = "";
        } else {
          if (this.state.sortColumnName === "assignedTo") {
            sassignedToFilterCheckbox = "";
            for (let i = 0; i < this.state.sortAssigneeData.length; i++) {
              sassignedToFilterCheckbox +=
                this.state.sortAssigneeData[i].assignedTo + ",";
            }
            sassignedToFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    // var data = "";

    if (column === "all") {
      // itemsArray =
      //   this.state.tempSearchTicketData.length > 0
      //     ? this.state.tempSearchTicketData
      //     : this.state.sortAllData
      if (this.state.sortColumnName === "status") {
        let sCategory = scategoryFilterCheckbox.split(",");
        let sPriority = spriorityFilterCheckbox.split(",");
        let sAssingedTo = sassignedToFilterCheckbox.split(",");
        let sCreatedOn = screatedOnFilterCheckbox.split(",");
        var sItems = sticketStatusFilterCheckbox.split(",");

        let tempFilteredArray = [];
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.ticketStatus === sItems[i]
            );

            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                tempFilteredArray.push(tempFilterData[j]);
              }
            }
          }
        }

        if (sCategory.length > 1) {
          let tempCategoryArray = [];
          for (let i = 0; i < sCategory.length; i++) {
            if (sCategory[i] !== "") {
              if (tempFilteredArray.length > 0) {
                var tempFilterData = tempFilteredArray.filter(
                  (a) => a.category === sCategory[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempCategoryArray.push(tempFilterData[j]);
                  }
                }
              } else {
                var tempFilterData = allData.filter(
                  (a) => a.category === sCategory[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempCategoryArray.push(tempFilterData[j]);
                  }
                }
              }
            }
          }
          tempFilteredArray =
            tempCategoryArray.length > 0
              ? tempCategoryArray
              : tempFilteredArray;
        }
        if (sPriority.length > 1) {
          let tempPriorityArray = [];
          for (let i = 0; i < sPriority.length; i++) {
            if (sPriority[i] !== "") {
              if (tempFilteredArray.length > 0) {
                var tempFilterData = tempFilteredArray.filter(
                  (a) => a.priority === sPriority[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempPriorityArray.push(tempFilterData[j]);
                  }
                }
              } else {
                var tempFilterData = allData.filter(
                  (a) => a.priority === sPriority[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempPriorityArray.push(tempFilterData[j]);
                  }
                }
              }
            }
          }
          tempFilteredArray =
            tempPriorityArray.length > 0
              ? tempPriorityArray
              : tempFilteredArray;
        }
        if (sAssingedTo.length > 1) {
          let tempAssignedToArray = [];
          for (let i = 0; i < sAssingedTo.length; i++) {
            if (sAssingedTo[i] !== "") {
              if (tempFilteredArray.length > 0) {
                var tempFilterData = tempFilteredArray.filter(
                  (a) => a.assignedTo === sAssingedTo[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempAssignedToArray.push(tempFilterData[j]);
                  }
                }
              } else {
                var tempFilterData = allData.filter(
                  (a) => a.assignedTo === sAssingedTo[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempAssignedToArray.push(tempFilterData[j]);
                  }
                }
              }
            }
          }
          tempFilteredArray =
            tempAssignedToArray > 0 ? tempAssignedToArray : tempFilteredArray;
        }
        if (sCreatedOn.length > 1) {
          let tempCreatedOnArray = [];
          for (let i = 0; i < sCreatedOn.length; i++) {
            if (sCreatedOn[i] !== "") {
              if (tempFilteredArray.length > 0) {
                var tempFilterData = tempFilteredArray.filter(
                  (a) => a.createdOn === sCreatedOn[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempCreatedOnArray.push(tempFilterData[j]);
                  }
                }
              } else {
                var tempFilterData = allData.filter(
                  (a) => a.createdOn === sCreatedOn[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempCreatedOnArray.push(tempFilterData[j]);
                  }
                }
              }
            }
          }
          tempFilteredArray =
            tempCreatedOnArray.length > 0
              ? tempCreatedOnArray
              : tempFilteredArray;
        }

        itemsArray = tempFilteredArray;
      }
      if (this.state.sortColumnName === "category") {
        var sItems = scategoryFilterCheckbox.split(",");
        let sStatus = sticketStatusFilterCheckbox.split(",");
        let sPriority = spriorityFilterCheckbox.split(",");
        let sAssingedTo = sassignedToFilterCheckbox.split(",");
        let sCreatedOn = screatedOnFilterCheckbox.split(",");

        let tempFilteredArray = [];
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.category === sItems[i]
            );

            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                tempFilteredArray.push(tempFilterData[j]);
              }
            }
          }
        }

        if (sStatus.length > 1) {
          let tempStatusArray = [];
          for (let i = 0; i < sStatus.length; i++) {
            if (sStatus[i] !== "") {
              if (tempFilteredArray.length > 0) {
                var tempFilterData = tempFilteredArray.filter(
                  (a) => a.ticketStatus === sStatus[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempStatusArray.push(tempFilterData[j]);
                  }
                }
              } else {
                var tempFilterData = allData.filter(
                  (a) => a.ticketStatus === sStatus[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempStatusArray.push(tempFilterData[j]);
                  }
                }
              }
            }
          }
          tempFilteredArray =
            tempStatusArray.length > 0 ? tempStatusArray : tempFilteredArray;
        }
        if (sPriority.length > 1) {
          let tempPriorityArray = [];
          for (let i = 0; i < sPriority.length; i++) {
            if (sPriority[i] !== "") {
              if (tempFilteredArray.length > 0) {
                var tempFilterData = tempFilteredArray.filter(
                  (a) => a.priority === sPriority[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempPriorityArray.push(tempFilterData[j]);
                  }
                }
              } else {
                var tempFilterData = allData.filter(
                  (a) => a.priority === sPriority[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempPriorityArray.push(tempFilterData[j]);
                  }
                }
              }
            }
          }
          tempFilteredArray =
            tempPriorityArray.length > 0
              ? tempPriorityArray
              : tempFilteredArray;
        }
        if (sAssingedTo.length > 1) {
          let tempAssignedToArray = [];
          for (let i = 0; i < sAssingedTo.length; i++) {
            if (sAssingedTo[i] !== "") {
              if (tempFilteredArray.length > 0) {
                var tempFilterData = tempFilteredArray.filter(
                  (a) => a.assignedTo === sAssingedTo[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempAssignedToArray.push(tempFilterData[j]);
                  }
                }
              } else {
                var tempFilterData = allData.filter(
                  (a) => a.assignedTo === sAssingedTo[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempAssignedToArray.push(tempFilterData[j]);
                  }
                }
              }
            }
          }
          tempFilteredArray =
            tempAssignedToArray > 0 ? tempAssignedToArray : tempFilteredArray;
        }
        if (sCreatedOn.length > 1) {
          let tempCreatedOnArray = [];
          for (let i = 0; i < sCreatedOn.length; i++) {
            if (sCreatedOn[i] !== "") {
              if (tempFilteredArray.length > 0) {
                var tempFilterData = tempFilteredArray.filter(
                  (a) => a.createdOn === sCreatedOn[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempCreatedOnArray.push(tempFilterData[j]);
                  }
                }
              } else {
                var tempFilterData = allData.filter(
                  (a) => a.createdOn === sCreatedOn[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempCreatedOnArray.push(tempFilterData[j]);
                  }
                }
              }
            }
          }
          tempFilteredArray =
            tempCreatedOnArray.length > 0
              ? tempCreatedOnArray
              : tempFilteredArray;
        }

        itemsArray = tempFilteredArray;
      }
      if (this.state.sortColumnName === "priority") {
        let sItems = spriorityFilterCheckbox.split(",");
        let sCategory = scategoryFilterCheckbox.split(",");
        let sStatus = sticketStatusFilterCheckbox.split(",");
        let sAssingedTo = sassignedToFilterCheckbox.split(",");
        let sCreatedOn = screatedOnFilterCheckbox.split(",");
        let tempFilteredArray = [];
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.priority === sItems[i]
            );

            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                tempFilteredArray.push(tempFilterData[j]);
              }
            }
          }
        }

        if (sCategory.length > 1) {
          let tempCategoryArray = [];
          for (let i = 0; i < sCategory.length; i++) {
            if (sCategory[i] !== "") {
              if (tempFilteredArray.length > 0) {
                var tempFilterData = tempFilteredArray.filter(
                  (a) => a.category === sCategory[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempCategoryArray.push(tempFilterData[j]);
                  }
                }
              } else {
                var tempFilterData = allData.filter(
                  (a) => a.category === sCategory[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempCategoryArray.push(tempFilterData[j]);
                  }
                }
              }
            }
          }
          tempFilteredArray =
            tempCategoryArray.length > 0
              ? tempCategoryArray
              : tempFilteredArray;
        }
        if (sStatus.length > 1) {
          let tempStatusArray = [];
          for (let i = 0; i < sStatus.length; i++) {
            if (sStatus[i] !== "") {
              if (tempFilteredArray.length > 0) {
                var tempFilterData = tempFilteredArray.filter(
                  (a) => a.ticketStatus === sStatus[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempStatusArray.push(tempFilterData[j]);
                  }
                }
              } else {
                var tempFilterData = allData.filter(
                  (a) => a.ticketStatus === sStatus[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempStatusArray.push(tempFilterData[j]);
                  }
                }
              }
            }
          }
          tempFilteredArray =
            tempStatusArray.length > 0 ? tempStatusArray : tempFilteredArray;
        }
        if (sAssingedTo.length > 1) {
          let tempAssignedToArray = [];
          for (let i = 0; i < sAssingedTo.length; i++) {
            if (sAssingedTo[i] !== "") {
              if (tempFilteredArray.length > 0) {
                var tempFilterData = tempFilteredArray.filter(
                  (a) => a.assignedTo === sAssingedTo[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempAssignedToArray.push(tempFilterData[j]);
                  }
                }
              } else {
                var tempFilterData = allData.filter(
                  (a) => a.assignedTo === sAssingedTo[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempAssignedToArray.push(tempFilterData[j]);
                  }
                }
              }
            }
          }
          tempFilteredArray =
            tempAssignedToArray > 0 ? tempAssignedToArray : tempFilteredArray;
        }
        if (sCreatedOn.length > 1) {
          let tempCreatedOnArray = [];
          for (let i = 0; i < sCreatedOn.length; i++) {
            if (sCreatedOn[i] !== "") {
              if (tempFilteredArray.length > 0) {
                var tempFilterData = tempFilteredArray.filter(
                  (a) => a.createdOn === sCreatedOn[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempCreatedOnArray.push(tempFilterData[j]);
                  }
                }
              } else {
                var tempFilterData = allData.filter(
                  (a) => a.createdOn === sCreatedOn[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempCreatedOnArray.push(tempFilterData[j]);
                  }
                }
              }
            }
          }
          tempFilteredArray =
            tempCreatedOnArray.length > 0
              ? tempCreatedOnArray
              : tempFilteredArray;
        }

        itemsArray = tempFilteredArray;
      }
      if (this.state.sortColumnName === "assignedTo") {
        var sItems = sassignedToFilterCheckbox.split(",");
        let sCategory = scategoryFilterCheckbox.split(",");
        let sPriority = spriorityFilterCheckbox.split(",");
        let sStatus = sticketStatusFilterCheckbox.split(",");
        let sCreatedOn = screatedOnFilterCheckbox.split(",");

        let tempFilteredArray = [];
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.assignedTo === sItems[i]
            );

            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                tempFilteredArray.push(tempFilterData[j]);
              }
            }
          }
        }

        if (sCategory.length > 1) {
          let tempCategoryArray = [];
          for (let i = 0; i < sCategory.length; i++) {
            if (sCategory[i] !== "") {
              if (tempFilteredArray.length > 0) {
                var tempFilterData = tempFilteredArray.filter(
                  (a) => a.category === sCategory[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempCategoryArray.push(tempFilterData[j]);
                  }
                }
              } else {
                var tempFilterData = allData.filter(
                  (a) => a.category === sCategory[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempCategoryArray.push(tempFilterData[j]);
                  }
                }
              }
            }
          }
          tempFilteredArray =
            tempCategoryArray.length > 0
              ? tempCategoryArray
              : tempFilteredArray;
        }
        if (sPriority.length > 1) {
          let tempPriorityArray = [];
          for (let i = 0; i < sPriority.length; i++) {
            if (sPriority[i] !== "") {
              if (tempFilteredArray.length > 0) {
                var tempFilterData = tempFilteredArray.filter(
                  (a) => a.priority === sPriority[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempPriorityArray.push(tempFilterData[j]);
                  }
                }
              } else {
                var tempFilterData = allData.filter(
                  (a) => a.priority === sPriority[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempPriorityArray.push(tempFilterData[j]);
                  }
                }
              }
            }
          }
          tempFilteredArray =
            tempPriorityArray.length > 0
              ? tempPriorityArray
              : tempFilteredArray;
        }
        if (sStatus.length > 1) {
          let tempStatusArray = [];
          for (let i = 0; i < sStatus.length; i++) {
            if (sStatus[i] !== "") {
              if (tempFilteredArray.length > 0) {
                var tempFilterData = tempFilteredArray.filter(
                  (a) => a.ticketStatus === sStatus[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempStatusArray.push(tempFilterData[j]);
                  }
                }
              } else {
                var tempFilterData = allData.filter(
                  (a) => a.ticketStatus === sStatus[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempStatusArray.push(tempFilterData[j]);
                  }
                }
              }
            }
          }
          tempFilteredArray =
            tempStatusArray.length > 0 ? tempStatusArray : tempFilteredArray;
        }
        if (sCreatedOn.length > 1) {
          let tempCreatedOnArray = [];
          for (let i = 0; i < sCreatedOn.length; i++) {
            if (sCreatedOn[i] !== "") {
              if (tempFilteredArray.length > 0) {
                var tempFilterData = tempFilteredArray.filter(
                  (a) => a.createdOn === sCreatedOn[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempCreatedOnArray.push(tempFilterData[j]);
                  }
                }
              } else {
                var tempFilterData = allData.filter(
                  (a) => a.createdOn === sCreatedOn[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempCreatedOnArray.push(tempFilterData[j]);
                  }
                }
              }
            }
          }
          tempFilteredArray =
            tempCreatedOnArray.length > 0
              ? tempCreatedOnArray
              : tempFilteredArray;
        }

        itemsArray = tempFilteredArray;
      }
      if (this.state.sortColumnName === "createdOn") {
        var sItems = screatedOnFilterCheckbox.split(",");
        let sCategory = scategoryFilterCheckbox.split(",");
        let sPriority = spriorityFilterCheckbox.split(",");
        let sAssingedTo = sassignedToFilterCheckbox.split(",");
        let sStatus = sticketStatusFilterCheckbox.split(",");
        let tempFilteredArray = [];
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.createdOn === sItems[i]
            );

            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                tempFilteredArray.push(tempFilterData[j]);
              }
            }
          }
        }

        if (sCategory.length > 1) {
          let tempCategoryArray = [];
          for (let i = 0; i < sCategory.length; i++) {
            if (sCategory[i] !== "") {
              if (tempFilteredArray.length > 0) {
                var tempFilterData = tempFilteredArray.filter(
                  (a) => a.category === sCategory[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempCategoryArray.push(tempFilterData[j]);
                  }
                }
              } else {
                var tempFilterData = allData.filter(
                  (a) => a.category === sCategory[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempCategoryArray.push(tempFilterData[j]);
                  }
                }
              }
            }
          }
          tempFilteredArray =
            tempCategoryArray.length > 0
              ? tempCategoryArray
              : tempFilteredArray;
        }
        if (sPriority.length > 1) {
          let tempPriorityArray = [];
          for (let i = 0; i < sPriority.length; i++) {
            if (sPriority[i] !== "") {
              if (tempFilteredArray.length > 0) {
                var tempFilterData = tempFilteredArray.filter(
                  (a) => a.priority === sPriority[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempPriorityArray.push(tempFilterData[j]);
                  }
                }
              } else {
                var tempFilterData = allData.filter(
                  (a) => a.priority === sPriority[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempPriorityArray.push(tempFilterData[j]);
                  }
                }
              }
            }
          }
          tempFilteredArray =
            tempPriorityArray.length > 0
              ? tempPriorityArray
              : tempFilteredArray;
        }
        if (sAssingedTo.length > 1) {
          let tempAssignedToArray = [];
          for (let i = 0; i < sAssingedTo.length; i++) {
            if (sAssingedTo[i] !== "") {
              if (tempFilteredArray.length > 0) {
                var tempFilterData = tempFilteredArray.filter(
                  (a) => a.assignedTo === sAssingedTo[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempAssignedToArray.push(tempFilterData[j]);
                  }
                }
              } else {
                var tempFilterData = allData.filter(
                  (a) => a.assignedTo === sAssingedTo[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempAssignedToArray.push(tempFilterData[j]);
                  }
                }
              }
            }
          }
          tempFilteredArray =
            tempAssignedToArray > 0 ? tempAssignedToArray : tempFilteredArray;
        }
        if (sStatus.length > 1) {
          let tempStatusArray = [];
          for (let i = 0; i < sStatus.length; i++) {
            if (sStatus[i] !== "") {
              if (tempFilteredArray.length > 0) {
                var tempFilterData = tempFilteredArray.filter(
                  (a) => a.ticketStatus === sStatus[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempStatusArray.push(tempFilterData[j]);
                  }
                }
              } else {
                var tempFilterData = allData.filter(
                  (a) => a.ticketStatus === sStatus[i]
                );

                if (tempFilterData.length > 0) {
                  for (let j = 0; j < tempFilterData.length; j++) {
                    tempStatusArray.push(tempFilterData[j]);
                  }
                }
              }
            }
          }
          tempFilteredArray =
            tempStatusArray.length > 0 ? tempStatusArray : tempFilteredArray;
        }

        itemsArray = tempFilteredArray;
      }
    } else if (column === "status") {
      let sCategory = scategoryFilterCheckbox.split(",");
      let sPriority = spriorityFilterCheckbox.split(",");
      let sAssingedTo = sassignedToFilterCheckbox.split(",");
      let sCreatedOn = screatedOnFilterCheckbox.split(",");
      var sItems = sticketStatusFilterCheckbox.split(",");

      let tempFilteredArray = [];
      for (let i = 0; i < sItems.length; i++) {
        if (sItems[i] !== "") {
          var tempFilterData = allData.filter(
            (a) => a.ticketStatus === sItems[i]
          );

          if (tempFilterData.length > 0) {
            for (let j = 0; j < tempFilterData.length; j++) {
              tempFilteredArray.push(tempFilterData[j]);
            }
          }
        }
      }

      if (sCategory.length > 1) {
        let tempCategoryArray = [];
        for (let i = 0; i < sCategory.length; i++) {
          if (sCategory[i] !== "") {
            if (tempFilteredArray.length > 0) {
              var tempFilterData = tempFilteredArray.filter(
                (a) => a.category === sCategory[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempCategoryArray.push(tempFilterData[j]);
                }
              }
            } else {
              var tempFilterData = allData.filter(
                (a) => a.category === sCategory[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempCategoryArray.push(tempFilterData[j]);
                }
              }
            }
          }
        }
        tempFilteredArray =
          tempCategoryArray.length > 0 ? tempCategoryArray : tempFilteredArray;
      }
      if (sPriority.length > 1) {
        let tempPriorityArray = [];
        for (let i = 0; i < sPriority.length; i++) {
          if (sPriority[i] !== "") {
            if (tempFilteredArray.length > 0) {
              var tempFilterData = tempFilteredArray.filter(
                (a) => a.priority === sPriority[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempPriorityArray.push(tempFilterData[j]);
                }
              }
            } else {
              var tempFilterData = allData.filter(
                (a) => a.priority === sPriority[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempPriorityArray.push(tempFilterData[j]);
                }
              }
            }
          }
        }
        tempFilteredArray =
          tempPriorityArray.length > 0 ? tempPriorityArray : tempFilteredArray;
      }
      if (sAssingedTo.length > 1) {
        let tempAssignedToArray = [];
        for (let i = 0; i < sAssingedTo.length; i++) {
          if (sAssingedTo[i] !== "") {
            if (tempFilteredArray.length > 0) {
              var tempFilterData = tempFilteredArray.filter(
                (a) => a.assignedTo === sAssingedTo[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempAssignedToArray.push(tempFilterData[j]);
                }
              }
            } else {
              var tempFilterData = allData.filter(
                (a) => a.assignedTo === sAssingedTo[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempAssignedToArray.push(tempFilterData[j]);
                }
              }
            }
          }
        }
        tempFilteredArray =
          tempAssignedToArray > 0 ? tempAssignedToArray : tempFilteredArray;
      }
      if (sCreatedOn.length > 1) {
        let tempCreatedOnArray = [];
        for (let i = 0; i < sCreatedOn.length; i++) {
          if (sCreatedOn[i] !== "") {
            if (tempFilteredArray.length > 0) {
              var tempFilterData = tempFilteredArray.filter(
                (a) => a.createdOn === sCreatedOn[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempCreatedOnArray.push(tempFilterData[j]);
                }
              }
            } else {
              var tempFilterData = allData.filter(
                (a) => a.createdOn === sCreatedOn[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempCreatedOnArray.push(tempFilterData[j]);
                }
              }
            }
          }
        }
        tempFilteredArray =
          tempCreatedOnArray.length > 0
            ? tempCreatedOnArray
            : tempFilteredArray;
      }

      itemsArray = tempFilteredArray;

      this.setState({
        statusColor: "sort-column",
      });
    } else if (column === "category") {
      var sItems = scategoryFilterCheckbox.split(",");
      var compareFilter = this.state.scategoryFilterCheckbox.split(",");
      // if (sItems.length > compareFilter.length) {
      //   if (sItems.length > 0) {
      //     for (let i = 0; i < sItems.length; i++) {
      //       if (sItems[i] !== "") {
      //         if (itemsArray.length > 0) {
      //           var tempFilterData = itemsArray.filter(
      //             (a) => a.category === sItems[i]
      //           );
      //           let tempArray = [];
      //           if (tempFilterData.length > 0) {
      //             for (let j = 0; j < tempFilterData.length; j++) {
      //               tempArray.push(tempFilterData[j]);
      //             }
      //           }
      //           itemsArray = tempArray;
      //         } else {
      //           var tempFilterData = allData.filter(
      //             (a) => a.category === sItems[i]
      //           );
      //           if (tempFilterData.length > 0) {
      //             for (let j = 0; j < tempFilterData.length; j++) {
      //               itemsArray.push(tempFilterData[j]);
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // } else {
      let tempFilteredArray = [];
      for (let i = 0; i < sItems.length; i++) {
        if (sItems[i] !== "") {
          var tempFilterData = allData.filter((a) => a.category === sItems[i]);

          if (tempFilterData.length > 0) {
            for (let j = 0; j < tempFilterData.length; j++) {
              tempFilteredArray.push(tempFilterData[j]);
            }
          }
        }
      }
      let sStatus = sticketStatusFilterCheckbox.split(",");
      let sPriority = spriorityFilterCheckbox.split(",");
      let sAssingedTo = sassignedToFilterCheckbox.split(",");
      let sCreatedOn = screatedOnFilterCheckbox.split(",");
      if (sStatus.length > 1) {
        let tempStatusArray = [];
        for (let i = 0; i < sStatus.length; i++) {
          if (sStatus[i] !== "") {
            if (tempFilteredArray.length > 0) {
              var tempFilterData = tempFilteredArray.filter(
                (a) => a.ticketStatus === sStatus[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempStatusArray.push(tempFilterData[j]);
                }
              }
            } else {
              var tempFilterData = allData.filter(
                (a) => a.ticketStatus === sStatus[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempStatusArray.push(tempFilterData[j]);
                }
              }
            }
          }
        }
        tempFilteredArray =
          tempStatusArray.length > 0 ? tempStatusArray : tempFilteredArray;
      }
      if (sPriority.length > 1) {
        let tempPriorityArray = [];
        for (let i = 0; i < sPriority.length; i++) {
          if (sPriority[i] !== "") {
            if (tempFilteredArray.length > 0) {
              var tempFilterData = tempFilteredArray.filter(
                (a) => a.priority === sPriority[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempPriorityArray.push(tempFilterData[j]);
                }
              }
            } else {
              var tempFilterData = allData.filter(
                (a) => a.priority === sPriority[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempPriorityArray.push(tempFilterData[j]);
                }
              }
            }
          }
        }
        tempFilteredArray =
          tempPriorityArray.length > 0 ? tempPriorityArray : tempFilteredArray;
      }
      if (sAssingedTo.length > 1) {
        let tempAssignedToArray = [];
        for (let i = 0; i < sAssingedTo.length; i++) {
          if (sAssingedTo[i] !== "") {
            if (tempFilteredArray.length > 0) {
              var tempFilterData = tempFilteredArray.filter(
                (a) => a.assignedTo === sAssingedTo[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempAssignedToArray.push(tempFilterData[j]);
                }
              }
            } else {
              var tempFilterData = allData.filter(
                (a) => a.assignedTo === sAssingedTo[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempAssignedToArray.push(tempFilterData[j]);
                }
              }
            }
          }
        }
        tempFilteredArray =
          tempAssignedToArray > 0 ? tempAssignedToArray : tempFilteredArray;
      }
      if (sCreatedOn.length > 1) {
        let tempCreatedOnArray = [];
        for (let i = 0; i < sCreatedOn.length; i++) {
          if (sCreatedOn[i] !== "") {
            if (tempFilteredArray.length > 0) {
              var tempFilterData = tempFilteredArray.filter(
                (a) => a.createdOn === sCreatedOn[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempCreatedOnArray.push(tempFilterData[j]);
                }
              }
            } else {
              var tempFilterData = allData.filter(
                (a) => a.createdOn === sCreatedOn[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempCreatedOnArray.push(tempFilterData[j]);
                }
              }
            }
          }
        }
        tempFilteredArray =
          tempCreatedOnArray.length > 0
            ? tempCreatedOnArray
            : tempFilteredArray;
      }

      itemsArray = tempFilteredArray;
      // }

      this.setState({
        categoryColor: "",
      });
    } else if (column === "priority") {
      var sItems = spriorityFilterCheckbox.split(",");
      var compareFilter = this.state.spriorityFilterCheckbox.split(",");
      // if (sItems.length > compareFilter.length) {
      //   if (sItems.length > 0) {
      //     for (let i = 0; i < sItems.length; i++) {
      //       if (sItems[i] !== "") {
      //         if (itemsArray.length > 0) {
      //           var tempFilterData = itemsArray.filter(
      //             (a) => a.priority === sItems[i]
      //           );
      //           let tempArray = [];
      //           if (tempFilterData.length > 0) {
      //             for (let j = 0; j < tempFilterData.length; j++) {
      //               tempArray.push(tempFilterData[j]);
      //             }
      //           }
      //           itemsArray = tempArray;
      //         } else {
      //           var tempFilterData = allData.filter(
      //             (a) => a.priority === sItems[i]
      //           );
      //           if (tempFilterData.length > 0) {
      //             for (let j = 0; j < tempFilterData.length; j++) {
      //               itemsArray.push(tempFilterData[j]);
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // } else {
      let tempFilteredArray = [];
      for (let i = 0; i < sItems.length; i++) {
        if (sItems[i] !== "") {
          var tempFilterData = allData.filter((a) => a.priority === sItems[i]);

          if (tempFilterData.length > 0) {
            for (let j = 0; j < tempFilterData.length; j++) {
              tempFilteredArray.push(tempFilterData[j]);
            }
          }
        }
      }
      let sCategory = scategoryFilterCheckbox.split(",");
      let sStatus = sticketStatusFilterCheckbox.split(",");
      let sAssingedTo = sassignedToFilterCheckbox.split(",");
      let sCreatedOn = screatedOnFilterCheckbox.split(",");
      if (sCategory.length > 1) {
        let tempCategoryArray = [];
        for (let i = 0; i < sCategory.length; i++) {
          if (sCategory[i] !== "") {
            if (tempFilteredArray.length > 0) {
              var tempFilterData = tempFilteredArray.filter(
                (a) => a.category === sCategory[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempCategoryArray.push(tempFilterData[j]);
                }
              }
            } else {
              var tempFilterData = allData.filter(
                (a) => a.category === sCategory[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempCategoryArray.push(tempFilterData[j]);
                }
              }
            }
          }
        }
        tempFilteredArray =
          tempCategoryArray.length > 0 ? tempCategoryArray : tempFilteredArray;
      }
      if (sStatus.length > 1) {
        let tempStatusArray = [];
        for (let i = 0; i < sStatus.length; i++) {
          if (sStatus[i] !== "") {
            if (tempFilteredArray.length > 0) {
              var tempFilterData = tempFilteredArray.filter(
                (a) => a.ticketStatus === sStatus[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempStatusArray.push(tempFilterData[j]);
                }
              }
            } else {
              var tempFilterData = allData.filter(
                (a) => a.ticketStatus === sStatus[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempStatusArray.push(tempFilterData[j]);
                }
              }
            }
          }
        }
        tempFilteredArray =
          tempStatusArray.length > 0 ? tempStatusArray : tempFilteredArray;
      }
      if (sAssingedTo.length > 1) {
        let tempAssignedToArray = [];
        for (let i = 0; i < sAssingedTo.length; i++) {
          if (sAssingedTo[i] !== "") {
            if (tempFilteredArray.length > 0) {
              var tempFilterData = tempFilteredArray.filter(
                (a) => a.assignedTo === sAssingedTo[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempAssignedToArray.push(tempFilterData[j]);
                }
              }
            } else {
              var tempFilterData = allData.filter(
                (a) => a.assignedTo === sAssingedTo[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempAssignedToArray.push(tempFilterData[j]);
                }
              }
            }
          }
        }
        tempFilteredArray =
          tempAssignedToArray > 0 ? tempAssignedToArray : tempFilteredArray;
      }
      if (sCreatedOn.length > 1) {
        let tempCreatedOnArray = [];
        for (let i = 0; i < sCreatedOn.length; i++) {
          if (sCreatedOn[i] !== "") {
            if (tempFilteredArray.length > 0) {
              var tempFilterData = tempFilteredArray.filter(
                (a) => a.createdOn === sCreatedOn[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempCreatedOnArray.push(tempFilterData[j]);
                }
              }
            } else {
              var tempFilterData = allData.filter(
                (a) => a.createdOn === sCreatedOn[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempCreatedOnArray.push(tempFilterData[j]);
                }
              }
            }
          }
        }
        tempFilteredArray =
          tempCreatedOnArray.length > 0
            ? tempCreatedOnArray
            : tempFilteredArray;
      }

      itemsArray = tempFilteredArray;
      // }

      this.setState({
        priorityColor: "sort-column",
      });
    } else if (column === "assignedTo") {
      var sItems = sassignedToFilterCheckbox.split(",");
      let compareFilter = this.state.sassignedToFilterCheckbox.split(",");
      // if (sItems.length > compareFilter.length) {
      //   if (sItems.length > 0) {
      //     for (let i = 0; i < sItems.length; i++) {
      //       if (sItems[i] !== "") {
      //         if (itemsArray.length > 0) {
      //           var tempFilterData = itemsArray.filter(
      //             (a) => a.assignedTo === sItems[i]
      //           );
      //           let tempArray = [];
      //           if (tempFilterData.length > 0) {
      //             for (let j = 0; j < tempFilterData.length; j++) {
      //               tempArray.push(tempFilterData[j]);
      //             }
      //           }
      //           itemsArray = tempArray;
      //         } else {
      //           var tempFilterData = allData.filter(
      //             (a) => a.assignedTo === sItems[i]
      //           );
      //           if (tempFilterData.length > 0) {
      //             for (let j = 0; j < tempFilterData.length; j++) {
      //               itemsArray.push(tempFilterData[j]);
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // } else {
      let tempFilteredArray = [];
      for (let i = 0; i < sItems.length; i++) {
        if (sItems[i] !== "") {
          var tempFilterData = allData.filter(
            (a) => a.assignedTo === sItems[i]
          );

          if (tempFilterData.length > 0) {
            for (let j = 0; j < tempFilterData.length; j++) {
              tempFilteredArray.push(tempFilterData[j]);
            }
          }
        }
      }
      let sCategory = scategoryFilterCheckbox.split(",");
      let sPriority = spriorityFilterCheckbox.split(",");
      let sStatus = sticketStatusFilterCheckbox.split(",");
      let sCreatedOn = screatedOnFilterCheckbox.split(",");
      if (sCategory.length > 1) {
        let tempCategoryArray = [];
        for (let i = 0; i < sCategory.length; i++) {
          if (sCategory[i] !== "") {
            if (tempFilteredArray.length > 0) {
              var tempFilterData = tempFilteredArray.filter(
                (a) => a.category === sCategory[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempCategoryArray.push(tempFilterData[j]);
                }
              }
            } else {
              var tempFilterData = allData.filter(
                (a) => a.category === sCategory[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempCategoryArray.push(tempFilterData[j]);
                }
              }
            }
          }
        }
        tempFilteredArray =
          tempCategoryArray.length > 0 ? tempCategoryArray : tempFilteredArray;
      }
      if (sPriority.length > 1) {
        let tempPriorityArray = [];
        for (let i = 0; i < sPriority.length; i++) {
          if (sPriority[i] !== "") {
            if (tempFilteredArray.length > 0) {
              var tempFilterData = tempFilteredArray.filter(
                (a) => a.priority === sPriority[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempPriorityArray.push(tempFilterData[j]);
                }
              }
            } else {
              var tempFilterData = allData.filter(
                (a) => a.priority === sPriority[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempPriorityArray.push(tempFilterData[j]);
                }
              }
            }
          }
        }
        tempFilteredArray =
          tempPriorityArray.length > 0 ? tempPriorityArray : tempFilteredArray;
      }
      if (sStatus.length > 1) {
        let tempStatusArray = [];
        for (let i = 0; i < sStatus.length; i++) {
          if (sStatus[i] !== "") {
            if (tempFilteredArray.length > 0) {
              var tempFilterData = tempFilteredArray.filter(
                (a) => a.ticketStatus === sStatus[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempStatusArray.push(tempFilterData[j]);
                }
              }
            } else {
              var tempFilterData = allData.filter(
                (a) => a.ticketStatus === sStatus[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempStatusArray.push(tempFilterData[j]);
                }
              }
            }
          }
        }
        tempFilteredArray =
          tempStatusArray.length > 0 ? tempStatusArray : tempFilteredArray;
      }
      if (sCreatedOn.length > 1) {
        let tempCreatedOnArray = [];
        for (let i = 0; i < sCreatedOn.length; i++) {
          if (sCreatedOn[i] !== "") {
            if (tempFilteredArray.length > 0) {
              var tempFilterData = tempFilteredArray.filter(
                (a) => a.createdOn === sCreatedOn[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempCreatedOnArray.push(tempFilterData[j]);
                }
              }
            } else {
              var tempFilterData = allData.filter(
                (a) => a.createdOn === sCreatedOn[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempCreatedOnArray.push(tempFilterData[j]);
                }
              }
            }
          }
        }
        tempFilteredArray =
          tempCreatedOnArray.length > 0
            ? tempCreatedOnArray
            : tempFilteredArray;
      }

      itemsArray = tempFilteredArray;
      // }

      this.setState({
        assignColor: "sort-column",
      });
    } else if (column === "createdOn") {
      var sItems = screatedOnFilterCheckbox.split(",");
      let compareFilter = this.state.screatedOnFilterCheckbox.split(",");
      // if (sItems.length > compareFilter.length) {
      //   if (sItems.length > 0) {
      //     for (let i = 0; i < sItems.length; i++) {
      //       if (sItems[i] !== "") {
      //         if (itemsArray.length > 0) {
      //           var tempFilterData = itemsArray.filter(
      //             (a) => a.createdOn === sItems[i]
      //           );
      //           let tempArray = [];
      //           if (tempFilterData.length > 0) {
      //             for (let j = 0; j < tempFilterData.length; j++) {
      //               tempArray.push(tempFilterData[j]);
      //             }
      //           }
      //           itemsArray = tempArray;
      //         } else {
      //           var tempFilterData = allData.filter(
      //             (a) => a.createdOn === sItems[i]
      //           );
      //           if (tempFilterData.length > 0) {
      //             for (let j = 0; j < tempFilterData.length; j++) {
      //               itemsArray.push(tempFilterData[j]);
      //             }
      //           }
      //         }
      //       }
      //     }
      //   }
      // } else {
      let tempFilteredArray = [];
      for (let i = 0; i < sItems.length; i++) {
        if (sItems[i] !== "") {
          var tempFilterData = allData.filter((a) => a.createdOn === sItems[i]);

          if (tempFilterData.length > 0) {
            for (let j = 0; j < tempFilterData.length; j++) {
              tempFilteredArray.push(tempFilterData[j]);
            }
          }
        }
      }
      let sCategory = scategoryFilterCheckbox.split(",");
      let sPriority = spriorityFilterCheckbox.split(",");
      let sAssingedTo = sassignedToFilterCheckbox.split(",");
      let sStatus = sticketStatusFilterCheckbox.split(",");
      if (sCategory.length > 1) {
        let tempCategoryArray = [];
        for (let i = 0; i < sCategory.length; i++) {
          if (sCategory[i] !== "") {
            if (tempFilteredArray.length > 0) {
              var tempFilterData = tempFilteredArray.filter(
                (a) => a.category === sCategory[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempCategoryArray.push(tempFilterData[j]);
                }
              }
            } else {
              var tempFilterData = allData.filter(
                (a) => a.category === sCategory[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempCategoryArray.push(tempFilterData[j]);
                }
              }
            }
          }
        }
        tempFilteredArray =
          tempCategoryArray.length > 0 ? tempCategoryArray : tempFilteredArray;
      }
      if (sPriority.length > 1) {
        let tempPriorityArray = [];
        for (let i = 0; i < sPriority.length; i++) {
          if (sPriority[i] !== "") {
            if (tempFilteredArray.length > 0) {
              var tempFilterData = tempFilteredArray.filter(
                (a) => a.priority === sPriority[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempPriorityArray.push(tempFilterData[j]);
                }
              }
            } else {
              var tempFilterData = allData.filter(
                (a) => a.priority === sPriority[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempPriorityArray.push(tempFilterData[j]);
                }
              }
            }
          }
        }
        tempFilteredArray =
          tempPriorityArray.length > 0 ? tempPriorityArray : tempFilteredArray;
      }
      if (sAssingedTo.length > 1) {
        let tempAssignedToArray = [];
        for (let i = 0; i < sAssingedTo.length; i++) {
          if (sAssingedTo[i] !== "") {
            if (tempFilteredArray.length > 0) {
              var tempFilterData = tempFilteredArray.filter(
                (a) => a.assignedTo === sAssingedTo[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempAssignedToArray.push(tempFilterData[j]);
                }
              }
            } else {
              var tempFilterData = allData.filter(
                (a) => a.assignedTo === sAssingedTo[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempAssignedToArray.push(tempFilterData[j]);
                }
              }
            }
          }
        }
        tempFilteredArray =
          tempAssignedToArray > 0 ? tempAssignedToArray : tempFilteredArray;
      }
      if (sStatus.length > 1) {
        let tempStatusArray = [];
        for (let i = 0; i < sStatus.length; i++) {
          if (sStatus[i] !== "") {
            if (tempFilteredArray.length > 0) {
              var tempFilterData = tempFilteredArray.filter(
                (a) => a.ticketStatus === sStatus[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempStatusArray.push(tempFilterData[j]);
                }
              }
            } else {
              var tempFilterData = allData.filter(
                (a) => a.ticketStatus === sStatus[i]
              );

              if (tempFilterData.length > 0) {
                for (let j = 0; j < tempFilterData.length; j++) {
                  tempStatusArray.push(tempFilterData[j]);
                }
              }
            }
          }
        }
        tempFilteredArray =
          tempStatusArray.length > 0 ? tempStatusArray : tempFilteredArray;
      }

      itemsArray = tempFilteredArray;
      // }

      this.setState({
        creationColor: "sort-column",
      });
    }

    this.setState({
      sticketStatusFilterCheckbox,
      scategoryFilterCheckbox,
      spriorityFilterCheckbox,
      screatedOnFilterCheckbox,
      sassignedToFilterCheckbox,
      statusColor: "",
      categoryColor: "",
      priorityColor: "",
      assignColor: "",
      creationColor: "",
    });

    setTimeout(() => {
      this.setState({
        tempSearchTicketData: itemsArray,
      });
      // this.StatusCloseModel();
    }, 100);
  };
  //// handle change filtre by check box
  setColorSortCheckStatus = (e) => {
    const { name } = e.target;
    this.setState({ [name]: e.target.checked });
  };
  sortStatusZtoA() {
    var itemsArray = [];
    itemsArray = this.state.SearchTicketData;
    var headerName = "";

    if (this.state.sortColumnName === "status") {
      itemsArray.sort((a, b) => {
        itemsArray.sort((a, b) => {
          itemsArray.sort((a, b) => {
            if (a.ticketStatus < b.ticketStatus) return -1;
            if (a.ticketStatus > b.ticketStatus) return 1;
            return 0;
          });
        });
      });
    }
    if (this.state.sortColumnName === "category") {
      itemsArray.sort((a, b) => {
        if (a.category < b.category) return -1;
        if (a.category > b.category) return 1;
        return 0;
      });
    }
    if (this.state.sortColumnName === "priority") {
      itemsArray.sort((a, b) => {
        if (a.priority < b.priority) return -1;
        if (a.priority > b.priority) return 1;
        return 0;
      });
    }
    if (this.state.sortColumnName === "createdOn") {
      itemsArray.sort((a, b) => {
        if (a.createdOn < b.createdOn) return -1;
        if (a.createdOn > b.createdOn) return 1;
        return 0;
      });
    }
    if (this.state.sortColumnName === "assignedTo") {
      itemsArray.sort((a, b) => {
        if (a.assignedTo < b.assignedTo) return -1;
        if (a.assignedTo > b.assignedTo) return 1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      SearchTicketData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }
  sortStatusAtoZ() {
    var itemsArray = [];
    itemsArray = this.state.SearchTicketData;
    var headerName = "";

    if (this.state.sortColumnName === "status") {
      itemsArray.sort((a, b) => {
        if (a.ticketStatus < b.ticketStatus) return 1;
        if (a.ticketStatus > b.ticketStatus) return -1;
        return 0;
      });
    }
    if (this.state.sortColumnName === "category") {
      itemsArray.sort((a, b) => {
        if (a.category < b.category) return 1;
        if (a.category > b.category) return -1;
        return 0;
      });
    }
    if (this.state.sortColumnName === "priority") {
      itemsArray.sort((a, b) => {
        if (a.priority < b.priority) return 1;
        if (a.priority > b.priority) return -1;
        return 0;
      });
    }
    if (this.state.sortColumnName === "createdOn") {
      itemsArray.sort((a, b) => {
        if (a.createdOn < b.createdOn) return 1;
        if (a.createdOn > b.createdOn) return -1;
        return 0;
      });
    }
    if (this.state.sortColumnName === "assignedTo") {
      itemsArray.sort((a, b) => {
        if (a.assignedTo < b.assignedTo) return 1;
        if (a.assignedTo > b.assignedTo) return -1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      SearchTicketData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  handleGetAssignTo() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserList",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            AssignToData: data,
            TeamMemberData: data,
          });
        } else {
          self.setState({
            AssignToData: [],
            TeamMemberData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handelCheckBoxCheckedChange = async (ticketID) => {
    var checkboxes = document.getElementsByName("ListCheckbox");
    var strIds = "";
    for (var i in checkboxes) {
      if (isNaN(i) === false) {
        if (checkboxes[i].checked === true) {
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strIds += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    }
    const newSelected = Object.assign({}, this.state.cSelectedRow);
    newSelected[ticketID] = !this.state.cSelectedRow[ticketID];

    await this.setState({
      cSelectedRow: ticketID ? newSelected : false,
      ticketIds: strIds,
    });
  };

  checkAllCheckbox = async (event) => {
    var obj = this.state.cSelectedRow;
    var strIds = "";
    const allCheckboxChecked = event.target.checked;
    var checkboxes = document.getElementsByName("ListCheckbox");
    if (allCheckboxChecked) {
      for (var i in checkboxes) {
        if (checkboxes[i].checked === false) {
          checkboxes[i].checked = true;
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strIds += checkboxes[i].getAttribute("attrIds") + ",";
          for (let i = 0; i < this.state.SearchTicketData.length; i++) {
            obj[this.state.SearchTicketData[i].ticketID] = true;
          }
        }
      }
    } else {
      for (var J in checkboxes) {
        if (checkboxes[J].checked === true) {
          checkboxes[J].checked = false;
          for (let i = 0; i < this.state.SearchTicketData.length; i++) {
            obj[this.state.SearchTicketData[i].ticketID] = false;
          }
        }
      }
      strIds = "";
    }
    this.setState({
      cSelectedRow: obj,
    });
    await this.setState({
      ticketIds: strIds,
    });
  };
  handelOnchangeData(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "SearchName") {
      this.setState({
        SearchNameExists: "",
      });
    }
  }
  HandleRowClickPage = (rowInfo, column) => {
    if ((rowInfo, column)) {
      return {
        onClick: (e) => {
          let Id = column.original["ticketID"];
          let ticketSourceType = column.original["ticketSourceType"];
          let self = this;
          self.setState({
            ticketDetailID: Id,
          });
          let appliedTableFilters = {
            status: self.state.sticketStatusFilterCheckbox,
            category: self.state.scategoryFilterCheckbox,
            priority: self.state.spriorityFilterCheckbox,
            createdOn: self.state.screatedOnFilterCheckbox,
            assignedTo: self.state.sassignedToFilterCheckbox,
            headerActiveId: self.state.headerActiveId,
          }
          setTimeout(function () {
            // if (window.localStorage.getItem('Programcode') === 'campusshoes') {
            if (window.localStorage.getItem('isTicketInNewTab') === "true") {
              window.open('./myticket?ticketDetailID=' + Id + '&sourceName=' + ticketSourceType
                + '&screenName=myTicketlist' + '&appliedTableFilters=' + JSON.stringify(appliedTableFilters)
                + '&tableFilterData=' + self.state.tempSearchTicketData)
            }
            else {
              self.props.history.push({
                pathname: "myticket",
                ticketDetailID: Id,
                sourceName: ticketSourceType,
                screenName: "myTicketlist",
                tableFilterData: self.state.tempSearchTicketData,
                appliedTableFilters: appliedTableFilters
                // appliedTableFilters: {
                //   status: self.state.sticketStatusFilterCheckbox,
                //   category: self.state.scategoryFilterCheckbox,
                //   priority: self.state.spriorityFilterCheckbox,
                //   createdOn: self.state.screatedOnFilterCheckbox,
                //   assignedTo: self.state.sassignedToFilterCheckbox,
                //   headerActiveId: self.state.headerActiveId,
                // },
              });
            }

          }, 1000);
        },
        style: {
          background:
            column.original["isEscalation"] === 1
              ? "#FFDFDF"
              : column.original["isSLANearBreach"] === true
                ? "#FFF3DF"
                : column.original["isReassigned"] === true
                  ? "#DEF3FF"
                  : "white",
        },
      };
    }
    return {};
  };

  handleScheduleDateChange = (e) => {
    let SelectData = e.currentTarget.value;
    if (SelectData === "230") {
      this.setState({
        IsDaily: 1,
        IsWeekly: 0,
        IsDailyForMonth: 0,
        IsDailyForYear: 0,
        IsWeeklyForMonth: 0,
        IsWeeklyForYear: 0,
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
        IsWeekly: 1,
        IsDaily: 0,
        selectedNoOfDay: 0,
        IsDailyForMonth: 0,
        IsDailyForYear: 0,
        IsWeeklyForMonth: 0,
        IsWeeklyForYear: 0,
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
        IsDailyForMonth: 1,
        IsDaily: 0,
        IsDailyForYear: 0,
        IsWeeklyForMonth: 0,
        IsWeeklyForYear: 0,
        selectedNoOfDay: 0,
        selectedNoOfWeek: 0,
        IsWeekly: 0,
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
        IsWeeklyForMonth: 1,
        IsDaily: 0,
        IsDailyForMonth: 0,
        IsWeeklyForYear: 0,
        selectedNoOfDay: 0,
        selectedNoOfWeek: 0,
        IsWeekly: 0,
        IsDailyForYear: 0,
        selectedNoOfDayForDailyYear: 0,
        selectedNoOfWeekForYear: 0,
        selectedNameOfDayForYearCommaSeperated: "",
        selectedWeeklyDays: "",
        selectedNoOfDaysForMonth: 0,
        selectedNameOfMonthForYearCommaSeperated: "",
      });
    } else if (SelectData === "234") {
      this.setState({
        IsDailyForYear: 1,
        IsDaily: 0,
        IsDailyForMonth: 0,
        selectedNoOfDay: 0,
        selectedNoOfWeek: 0,
        IsWeekly: 0,
        IsWeeklyForMonth: 0,
        IsWeeklyForYear: 0,
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
        IsWeeklyForYear: 1,
        IsDaily: 0,
        IsDailyForMonth: 0,
        selectedNoOfDay: 0,
        selectedNoOfWeek: 0,
        IsWeekly: 0,
        IsWeeklyForMonth: 0,
        IsDailyForYear: 0,
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

  handleApplySearch(paramsID) {
    let self = this;
    this.setState({ loading: true });
    self.onCloseModal();

    axios({
      method: "post",
      url: config.apiUrl + "/Search/GetTicketsOnSavedSearch",
      headers: authHeader(),
      params: {
        SearchParamID: paramsID,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData.ticketList;
        let count = 0;
        if (res.data.responseData.ticketList != null) {
          count = res.data.responseData.ticketList.length;
        }
        if (status === "Success") {
          let dataSearch = JSON.parse(res.data.responseData.searchParams);
          self.setState({
            SearchTicketData: data,
            resultCount: count,
            loading: false,
          });
          let lowerTabs = document.querySelectorAll(".lower-tabs .nav-link");
          let activeTabId = dataSearch.ActiveTabId;
          for (let i = 0; i < lowerTabs.length; i++) {
            lowerTabs[i].classList.remove("active");
            if (activeTabId - 1 === i) {
              lowerTabs[i].classList.add("active");
            }
          }

          let lowerTabsPane = document.querySelectorAll(
            ".lower-tabs-pane .tab-pane"
          );
          for (let i = 0; i < lowerTabsPane.length; i++) {
            lowerTabsPane[i].classList.remove("active");
            lowerTabsPane[i].classList.remove("show");
            if (activeTabId - 1 === i) {
              lowerTabsPane[i].classList.add("active");
              lowerTabsPane[i].classList.add("show");
            }
          }

          let upperTabs = document.querySelectorAll(".upper-tabs .nav-link");
          let headerStatusId = dataSearch.HeaderStatusId;
          for (let i = 0; i < upperTabs.length; i++) {
            upperTabs[i].classList.remove("active");
          }
          if (headerStatusId === 1001) {
            document.getElementsByName("Escalation")[0].classList.add("active");
          } else if (headerStatusId === 101) {
            document.getElementsByName("New")[0].classList.add("active");
          } else if (headerStatusId === 102) {
            document.getElementsByName("Open")[0].classList.add("active");
          } else if (headerStatusId === 103) {
            document.getElementsByName("Resolved")[0].classList.add("active");
          } else if (headerStatusId === 104) {
            document.getElementsByName("Closed")[0].classList.add("active");
          } else if (headerStatusId === 105) {
            document.getElementsByName("ReOpen")[0].classList.add("active");
          } else if (headerStatusId === 1004) {
            document.getElementsByName("Reassigned")[0].classList.add("active");
          } else if (headerStatusId === 1002) {
            document.getElementsByName("All")[0].classList.add("active");
          } else if (headerStatusId === 1003) {
            document.getElementsByName("FollowUp")[0].classList.add("active");
          }

          if (dataSearch.searchDataByDate === null) {
            self.setState({
              ByDateCreatDate: "",
              ByDateSelectDate: "",
              selectedSlaDueByDate: 0,
              selectedTicketStatusByDate: 0,
            });
          } else {
            if (dataSearch.searchDataByDate.Ticket_CreatedOn !== "") {
              let createdDate = dataSearch.searchDataByDate.Ticket_CreatedOn;
              let createdDateArray = createdDate.split("-");
              var createdDateFinal = new Date(
                createdDateArray[0],
                createdDateArray[1] - 1,
                createdDateArray[2]
              );
            }
            if (dataSearch.searchDataByDate.Ticket_ModifiedOn !== "") {
              let modifiedDate = dataSearch.searchDataByDate.Ticket_ModifiedOn;
              let modifiedDateArray = modifiedDate.split("-");
              var modifiedDateFinal = new Date(
                modifiedDateArray[0],
                modifiedDateArray[1] - 1,
                modifiedDateArray[2]
              );
            }
            self.setState({
              ByDateCreatDate: createdDateFinal,
              ByDateSelectDate: modifiedDateFinal,
              selectedSlaDueByDate: dataSearch.searchDataByDate.SLA_DueON,
              selectedTicketStatusByDate:
                dataSearch.searchDataByDate.Ticket_StatusID,
              byCategoryFlag: 0,
              allFlag: 0,
            });
          }

          if (dataSearch.searchDataByCustomerType === null) {
            self.setState({
              MobileNoByCustType: "",
              EmailIdByCustType: "",
              TicketIdByCustType: "",
              selectedTicketStatusByCustomer: 0,
            });
          } else {
            self.setState({
              MobileNoByCustType:
                dataSearch.searchDataByCustomerType.CustomerMobileNo,
              EmailIdByCustType:
                dataSearch.searchDataByCustomerType.CustomerEmailID,
              TicketIdByCustType: dataSearch.searchDataByCustomerType.TicketID,
              selectedTicketStatusByCustomer:
                dataSearch.searchDataByCustomerType.TicketStatusID,
              byCategoryFlag: 0,
              allFlag: 0,
            });
          }

          if (dataSearch.searchDataByTicketType === null) {
            self.setState({
              selectedPriority: 0,
              selectedTicketStatusByTicket: 0,
              selectedChannelOfPurchase: [],
              selectedTicketActionType: [],
            });
          } else {
            let purchaseArr = [];
            let purchaseId = dataSearch.searchDataByTicketType.ChannelOfPurchaseIds.split(
              ","
            );
            for (let i = 0; i < purchaseId.length - 1; i++) {
              const element = purchaseId[i];
              for (
                let j = 0;
                j < self.state.ChannelOfPurchaseData.length;
                j++
              ) {
                if (
                  element ==
                  self.state.ChannelOfPurchaseData[j].channelOfPurchaseID
                ) {
                  purchaseArr.push(self.state.ChannelOfPurchaseData[j]);
                }
              }
            }

            let actionArr = [];
            let actionId = dataSearch.searchDataByTicketType.ActionTypes.split(
              ","
            );
            for (let i = 0; i < actionId.length - 1; i++) {
              const element = actionId[i];
              for (let j = 0; j < self.state.TicketActionTypeData.length; j++) {
                if (
                  element ===
                  self.state.TicketActionTypeData[j].ticketActionTypeID
                ) {
                  actionArr.push(self.state.TicketActionTypeData[j]);
                }
              }
            }

            self.setState({
              selectedPriority:
                dataSearch.searchDataByTicketType.TicketPriorityID,
              selectedTicketStatusByTicket:
                dataSearch.searchDataByTicketType.TicketStatusID,
              selectedChannelOfPurchase: purchaseArr,
              selectedTicketActionType: actionArr,
              byCategoryFlag: 0,
              allFlag: 0,
            });
          }

          if (dataSearch.searchDataByCategoryType === null) {
            self.setState({
              selectedCategory: 0,
              selectedSubCategory: 0,
              selectedIssueType: 0,
              selectedTicketStatusByCategory: 0,
            });
          } else {
            self.setState(
              {
                selectedCategory:
                  dataSearch.searchDataByCategoryType.CategoryId,
                byCategoryFlag: 4,
                allFlag: 0,
                selectedTicketStatusByCategory:
                  dataSearch.searchDataByCategoryType.TicketStatusID,
              },
              () => {
                self.handleGetSubCategoryList("categoryTab");
              }
            );
            self.setState(
              {
                selectedSubCategory:
                  dataSearch.searchDataByCategoryType.SubCategoryId,
              },
              () => {
                self.handleGetIssueTypeList("categoryTab");
              }
            );
            self.setState({
              selectedIssueType:
                dataSearch.searchDataByCategoryType.IssueTypeId,
            });
          }

          if (dataSearch.SearchDataByAll === null) {
            self.setState({
              ByAllCreateDate: "",
              selectedTicketSource: 0,
              ClaimIdByAll: "",
              EmailByAll: "",
              ByAllLastDate: "",
              TicketIdTitleByAll: "",
              InvoiceSubOrderByAll: "",
              MobileByAll: "",
              selectedCategoryAll: 0,
              selectedPriorityAll: 0,
              ItemIdByAll: "",
              selectedAssignedTo: 0,
              selectedAssignedToAll: "",
              selectedSubCategoryAll: 0,
              selectedTicketStatusAll: 0,
              selectedVisitStoreAll: "all",
              selectedPurchaseStoreCodeAddressAll: "",
              selectedIssueTypeAll: 0,
              selectedSlaStatus: 0,
              selectedWantToVisitStoreAll: "all",
              selectedVisitStoreCodeAddressAll: "",
              selectedWithClaimAll: "no",
              selectedClaimStatus: 0,
              selectedClaimCategory: 0,
              selectedClaimSubCategory: 0,
              selectedClaimIssueType: 0,
              selectedWithTaskAll: "no",
              selectedTaskStatus: 0,
              selectedDepartment: 0,
              selectedFunction: 0,
            });
          } else {
            if (dataSearch.SearchDataByAll.CreatedDate !== "") {
              let createdDate = dataSearch.SearchDataByAll.CreatedDate;
              let createdDateArray = createdDate.split("-");
              let createdDateFinal = new Date(
                createdDateArray[0],
                createdDateArray[1] - 1,
                createdDateArray[2]
              );
            }
            if (dataSearch.SearchDataByAll.ModifiedDate !== "") {
              let modifiedDate = dataSearch.SearchDataByAll.ModifiedDate;
              let modifiedDateArray = modifiedDate.split("-");
              let modifiedDateFinal = new Date(
                modifiedDateArray[0],
                modifiedDateArray[1] - 1,
                modifiedDateArray[2]
              );
            }
            self.setState({
              ByAllCreateDate: createdDateFinal,
              selectedTicketSource:
                dataSearch.SearchDataByAll.TicketSourceTypeID,
              ClaimIdByAll: dataSearch.SearchDataByAll.ClaimId,
              EmailByAll: dataSearch.SearchDataByAll.CustomerEmailID,
              ByAllLastDate: modifiedDateFinal,
              TicketIdTitleByAll: dataSearch.SearchDataByAll.TicketIdORTitle,
              InvoiceSubOrderByAll:
                dataSearch.SearchDataByAll.InvoiceNumberORSubOrderNo,
              MobileByAll: dataSearch.SearchDataByAll.CustomerMobileNo,
              selectedPriorityAll: dataSearch.SearchDataByAll.PriorityId,
              ItemIdByAll: dataSearch.SearchDataByAll.OrderItemId,
              selectedAssignedTo: dataSearch.SearchDataByAll.AssignTo,
              selectedTicketStatusAll:
                dataSearch.SearchDataByAll.TicketSatutsID,
              selectedVisitStoreAll: dataSearch.SearchDataByAll.IsVisitStore,
              selectedPurchaseStoreCodeAddressAll:
                dataSearch.SearchDataByAll.StoreCodeORAddress,
              selectedSlaStatus: dataSearch.SearchDataByAll.SLAStatus,
              selectedWantToVisitStoreAll:
                dataSearch.SearchDataByAll.IsWantVistingStore,
              selectedVisitStoreCodeAddressAll:
                dataSearch.SearchDataByAll.WantToStoreCodeORAddress,
              selectedWithClaimAll:
                dataSearch.SearchDataByAll.HaveClaim === 0 ? "no" : "yes",
              selectedClaimStatus: dataSearch.SearchDataByAll.ClaimStatusId,
              selectedWithTaskAll:
                dataSearch.SearchDataByAll.HaveTask === 0 ? "no" : "yes",
              selectedTaskStatus: dataSearch.SearchDataByAll.TaskStatusId,
            });
            self.setState(
              {
                selectedCategoryAll: dataSearch.SearchDataByAll.CategoryId,
                byCategoryFlag: 0,
                allFlag: 5,
              },
              () => {
                self.handleGetSubCategoryList("allTab");
              }
            );
            self.setState(
              {
                selectedSubCategoryAll:
                  dataSearch.SearchDataByAll.SubCategoryId,
              },
              () => {
                self.handleGetIssueTypeList("allTab");
              }
            );
            self.setState({
              selectedIssueTypeAll: dataSearch.SearchDataByAll.IssueTypeId,
            });
            self.setState(
              {
                selectedDepartment:
                  dataSearch.SearchDataByAll.TaskDepartment_Id,
              },
              () => {
                self.handleGetFunctionList();
              }
            );
            self.setState({
              selectedFunction: dataSearch.SearchDataByAll.TaskFunction_Id,
            });
            self.setState(
              {
                selectedClaimCategory:
                  dataSearch.SearchDataByAll.ClaimCategoryId,
              },
              () => {
                self.handleGetClaimSubCategoryList();
              }
            );
            self.setState(
              {
                selectedClaimSubCategory:
                  dataSearch.SearchDataByAll.ClaimSubCategoryId,
              },
              () => {
                self.handleGetClaimIssueTypeList();
              }
            );
            self.setState({
              selectedClaimIssueType:
                dataSearch.SearchDataByAll.ClaimIssueTypeId,
            });
          }
        } else {
          self.setState({ SearchTicketData: [], loading: false });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  filteTextChange(e) {
    this.setState({ filterTxtValue: e.target.value });
    if (this.state.sortColumnName === "status") {
      var sortFilterTicketData = matchSorter(
        this.state.sortTicketData,
        e.target.value,
        { keys: ["ticketStatus"] }
      );
      if (sortFilterTicketData.length > 0) {
        this.setState({ sortFilterTicketData });
      } else {
        this.setState({ sortFilterTicketData: this.state.sortTicketData });
      }
    }
    if (this.state.sortColumnName === "category") {
      var sortFilterCategoryData = matchSorter(
        this.state.sortCategoryData,
        e.target.value,
        { keys: ["category"] }
      );
      if (sortFilterCategoryData.length > 0) {
        this.setState({ sortFilterCategoryData });
      } else {
        this.setState({
          sortFilterCategoryData: this.state.sortCategoryData,
        });
      }
    }
    if (this.state.sortColumnName === "priority") {
      var sortFilterPriorityData = matchSorter(
        this.state.sortPriorityData,
        e.target.value,
        { keys: ["priority"] }
      );
      if (sortFilterPriorityData.length > 0) {
        this.setState({ sortFilterPriorityData });
      } else {
        this.setState({
          sortFilterPriorityData: this.state.sortPriorityData,
        });
      }
    }

    if (this.state.sortColumnName === "createdOn") {
      var sortFiltercreatedOnData = matchSorter(
        this.state.sortcreatedOnData,
        e.target.value,
        { keys: ["createdOn"] }
      );
      if (sortFiltercreatedOnData.length > 0) {
        this.setState({ sortFiltercreatedOnData });
      } else {
        this.setState({
          sortFiltercreatedOnData: this.state.sortcreatedOnData,
        });
      }
    }
    if (this.state.sortColumnName === "assignedTo") {
      var sortFilterAssigneeData = matchSorter(
        this.state.sortAssigneeData,
        e.target.value,
        { keys: ["assignedTo"] }
      );
      if (sortFilterAssigneeData.length > 0) {
        this.setState({ sortFilterAssigneeData });
      } else {
        this.setState({
          sortFilterAssigneeData: this.state.sortAssigneeData,
        });
      }
    }
  }
  handleGetTicketFields = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetTicketFields",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ ticketFields: data.ticketFieldsLst });
          self.handleDisplayTicketFields();
        } else {
          self.setState({ ticketFields: [] });
        }
      })
      .catch((error) => console.log(error));
  };

  handleDisplayTicketFields = () => {
    let displayFields = this.state.displayTicketFileds;
    let ticketFields = this.state.ticketFields;

    for (let i = 0; i < ticketFields.length; i++) {
      displayFields[ticketFields[i].fieldName] = ticketFields[i].listPage;
    }
    this.setState({
      displayTicketFileds: displayFields,
    });
  };

  handleGetTableFilters = () => {
    let appliedTableFilters = this.props.location.appliedTableFilters
      ? this.props.location.appliedTableFilters
      : {};

    this.setState({
      sticketStatusFilterCheckbox:
        appliedTableFilters.status || this.state.sticketStatusFilterCheckbox,
      scategoryFilterCheckbox:
        appliedTableFilters.category || this.state.scategoryFilterCheckbox,
      spriorityFilterCheckbox:
        appliedTableFilters.priority || this.state.spriorityFilterCheckbox,
      screatedOnFilterCheckbox:
        appliedTableFilters.createdOn || this.state.screatedOnFilterCheckbox,
      sassignedToFilterCheckbox:
        appliedTableFilters.assignedTo || this.state.sassignedToFilterCheckbox,
    });
  };

  handleSetActiveTab = (headerStatusId) => {
    if (headerStatusId === 1001) {
      document.getElementsByName("Escalation")[0].classList.add("active");
    } else if (headerStatusId === 101) {
      document.getElementsByName("New")[0].classList.add("active");
    } else if (headerStatusId === 102) {
      document.getElementsByName("Open")[0].classList.add("active");
    } else if (headerStatusId === 103) {
      document.getElementsByName("Resolved")[0].classList.add("active");
    } else if (headerStatusId === 104) {
      document.getElementsByName("Closed")[0].classList.add("active");
    } else if (headerStatusId === 105) {
      document.getElementsByName("ReOpen")[0].classList.add("active");
    } else if (headerStatusId === 1004) {
      document.getElementsByName("Reassigned")[0].classList.add("active");
    } else if (headerStatusId === 1002) {
      document.getElementsByName("All")[0].classList.add("active");
    } else if (headerStatusId === 1003) {
      document.getElementsByName("FollowUp")[0].classList.add("active");
    }
  };

  handleGetUniqueValues = (data) => {
    let itemsArray = data.length > 0 ? data : this.state.sortAllData;
    let sortCategoryData = [];
    let sortTicketData = [];
    let sortAssigneeData = [];
    let sortcreatedOnData = [];
    let sortPriorityData = [];
    let sortTicketDataArray = itemsArray
      .map((item) => {
        return item.ticketStatus;
      })
      .filter((x, i, a) => a.indexOf(x) == i);
    for (let i = 0; i < sortTicketDataArray.length; i++) {
      let obj = {
        ticketStatus: sortTicketDataArray[i],
      };
      sortTicketData.push(obj);
    }

    let sortCategoryDataArray = itemsArray
      .map((item) => {
        return item.category;
      })
      .filter((x, i, a) => a.indexOf(x) == i);
    for (let i = 0; i < sortCategoryDataArray.length; i++) {
      let obj = {
        category: sortCategoryDataArray[i],
      };
      sortCategoryData.push(obj);
    }

    let sortPriorityDataArray = itemsArray
      .map((item) => {
        return item.priority;
      })
      .filter((x, i, a) => a.indexOf(x) == i);
    for (let i = 0; i < sortPriorityDataArray.length; i++) {
      let obj = {
        priority: sortPriorityDataArray[i],
      };
      sortPriorityData.push(obj);
    }

    let sortAssingneeDataArray = itemsArray
      .map((item) => {
        return item.assignedTo;
      })
      .filter((x, i, a) => a.indexOf(x) == i);
    for (let i = 0; i < sortAssingneeDataArray.length; i++) {
      let obj = {
        assignedTo: sortAssingneeDataArray[i],
      };
      sortAssigneeData.push(obj);
    }

    let sortCreatedOnDataArray = itemsArray
      .map((item) => {
        return item.createdOn;
      })
      .filter((x, i, a) => a.indexOf(x) == i);
    for (let i = 0; i < sortCreatedOnDataArray.length; i++) {
      let obj = {
        createdOn: sortCreatedOnDataArray[i],
      };
      sortcreatedOnData.push(obj);
    }

    this.setState({
      sortFilterCategoryData: sortCategoryData,
      sortFilterTicketData: sortTicketData,
      sortFilterAssigneeData: sortAssigneeData,
      sortFiltercreatedOnData: sortcreatedOnData,
      sortFilterPriorityData: sortPriorityData,
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
      .then(function (res) {
        let status = res.data.message;
        let data1 = res.data.responseData;
        if (status === "Success") {
          self.setState({ advanceSearchModulesItems: data1 });
          self.setAdvanceSearch(data1);
        } else {
          self.setState({ advanceSearchModulesItems: [] });
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
  };

  getTicketListTableFilters = () => {
    let byDate = JSON.parse(localStorage.getItem("MyTicketListDateTypeFilter"));
    let customerType = JSON.parse(
      localStorage.getItem("MyTicketListCustomerTypeFilter")
    );
    console.log("customerType", customerType)
    let ticketType = JSON.parse(
      localStorage.getItem("MyTicketListTicketTypeFilter")
    );
    let categoryType = JSON.parse(
      localStorage.getItem("MyTicketListCategoryTypeFilter")
    );
    let allType = JSON.parse(localStorage.getItem("MyTicketListAllTypeFilter"));

    if (byDate) {
      let createDateByDate = "";
      let lastUpdatedDateByDate = "";
      if (byDate.ByDateCreatDate !== "") {
        createDateByDate = new Date(byDate.ByDateCreatDate);
      }
      if (byDate.ByDateSelectDate !== "") {
        lastUpdatedDateByDate = new Date(byDate.ByDateSelectDate);
      }
      this.setState({
        ByDateCreatDate: createDateByDate,
        ByDateSelectDate: lastUpdatedDateByDate,
        selectedSlaDueByDate: byDate.selectedSlaDueByDate,
        selectedTicketStatusByDate: byDate.selectedTicketStatusByDate,
        ActiveTabId: 1,
      });

      setTimeout(() => {
        //debugger
        this.ViewSearchData(1, "savedFilter");
      }, 1000);
    }
    if (customerType) {
      this.setState({
        MobileNoByCustType: customerType.MobileNoByCustType,
        EmailIdByCustType: customerType.EmailIdByCustType,
        TicketIdByCustType: customerType.TicketIdByCustType,
        selectedTicketStatusByCustomer:
          customerType.selectedTicketStatusByCustomer,
        NameByCustType: customerType.NameByCustType,
        ActiveTabId: 2,
      });
      setTimeout(() => {
        //debugger
        this.ViewSearchData(1, "savedFilter");
      }, 1000);
    }
    if (ticketType) {
      this.setState({
        selectedPriority: ticketType.selectedPriority,
        selectedTicketStatusByTicket: ticketType.selectedTicketStatusByTicket,
        selectedChannelOfPurchase: ticketType.selectedChannelOfPurchase,
        selectedTicketActionType: ticketType.selectedTicketActionType,
        ActiveTabId: 3,
      });
      setTimeout(() => {
        //debugger
        this.ViewSearchData(1, "savedFilter");
      }, 1000);
    }
    if (categoryType) {
      this.setState({
        selectedCategory: categoryType.selectedCategory,
        selectedSubCategory: categoryType.selectedSubCategory,
        selectedIssueType: categoryType.selectedIssueType,
        selectedTicketStatusByCategory:
          categoryType.selectedTicketStatusByCategory,
        ActiveTabId: 4,
      });
      setTimeout(() => {
        //debugger
        this.ViewSearchData(1, "savedFilter");
      }, 1000);
    }
    if (allType) {
      let createDate = "";
      let allLastDate = "";
      if (allType.ByAllCreateDate !== "") {
        createDate = new Date(allType.ByAllCreateDate);
      }
      if (allType.ByAllLastDate !== "") {
        allLastDate = new Date(allType.ByAllLastDate);
      }
      this.setState({
        ByAllCreateDate: createDate,
        selectedTicketSource: allType.selectedTicketSource,
        ClaimIdByAll: allType.ClaimIdByAll,
        EmailByAll: allType.EmailByAll,
        ByAllLastDate: allLastDate,
        TicketIdTitleByAll: allType.TicketIdTitleByAll,
        InvoiceSubOrderByAll: allType.InvoiceSubOrderByAll,
        MobileByAll: allType.MobileByAll,
        selectedCategoryAll: allType.selectedCategoryAll,
        selectedPriorityAll: allType.selectedPriorityAll,
        ItemIdByAll: allType.ItemIdByAll,
        selectedAssignedTo: allType.selectedAssignedTo,
        selectedAssignedToAll: allType.selectedAssignedToAll,
        selectedSubCategoryAll: allType.selectedSubCategoryAll,
        selectedTicketStatusAll: allType.selectedTicketStatusAll,
        selectedVisitStoreAll: allType.selectedVisitStoreAll,
        selectedPurchaseStoreCodeAddressAll:
          allType.selectedPurchaseStoreCodeAddressAll,
        selectedIssueTypeAll: allType.selectedIssueTypeAll,
        selectedSlaStatus: allType.selectedSlaStatus,
        selectedWantToVisitStoreAll: allType.selectedWantToVisitStoreAll,
        selectedVisitStoreCodeAddressAll:
          allType.selectedVisitStoreCodeAddressAll,
        selectedWithClaimAll: allType.selectedWithClaimAll,
        selectedClaimStatus: allType.selectedClaimStatus,
        selectedClaimCategory: allType.selectedClaimCategory,
        selectedClaimSubCategory: allType.selectedClaimSubCategory,
        selectedClaimIssueType: allType.selectedClaimIssueType,
        selectedWithTaskAll: allType.selectedWithTaskAll,
        selectedTaskStatus: allType.selectedTaskStatus,
        selectedDepartment: allType.selectedDepartment,
        selectedFunction: allType.selectedFunction,
        ActiveTabId: 5,
      });
      setTimeout(() => {
        //debugger
        this.ViewSearchData(1, "savedFilter");
      }, 1000);
    }
  };
  handlePageItemchange = async (e) => {
    //debugger
    let val = parseInt(e.target.value)
    await this.setState({
      postsPerPage: val,
      currentPage: 1
    });
    if (this.state.viewSearchApi) {
      //debugger
      this.ViewSearchData();

    } else {
      this.handleSearchTicket(this.state.headerActiveId)

    }


  };
  handlePrevNext = async (value) => {
    //debugger
    let self = this
    if (value === 'prev') {
      await self.setState({
        currentPage: self.state.currentPage - 1
      })
    }
    else if (value === 'next') {
      await self.setState({
        currentPage: self.state.currentPage + 1
      })
    }
    if (this.state.viewSearchApi) {
      //debugger
      this.ViewSearchData();

    }
    else {
      this.handleSearchTicket(this.state.headerActiveId)

    }

  }
  handlePageCLick = async (e) => {
    await this.setState({
      currentPage: e,
      // tabFlag:false
    })
    if (this.state.viewSearchApi) {
      //debugger
      this.ViewSearchData()

    }
    else {
      this.handleSearchTicket(this.state.headerActiveId)

    }


  }

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    const { DraftDetails, SearchAssignData } = this.state;
    const TitleChange = this.state.collapseSearch
      ? TranslationContext !== undefined
        ? TranslationContext.small.closesearch
        : "Close Search"
      : TranslationContext !== undefined
        ? TranslationContext.small.searchtickets
        : "Search Tickets";

    const ImgChange = this.state.collapseSearch ? (
      <img className="search-icon" src={CancalImg} alt="search-icon" />
    ) : (
      <img className="search-icon" src={SearchIcon} alt="search-icon" />
    );
    const numberofpage = this.state.tabletotalPages
    //console.log("numberofpage", numberofpage)
    //console.log("this.state.tableDataDashboard",this.state.tableDataDashboard)
    const numberListdisplay = [...Array(numberofpage + 1).keys()].slice(1)

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
              <div className="sort-sctn">
                <div className="d-flex justify-content-between align-items-center">
                  <label style={{ color: "#0066cc", fontWeight: "bold" }}>
                    {this.state.sortHeader}
                  </label>

                  <Button
                    style={{
                      background: "#0066cc",
                    }}
                    type="primary"
                    size="small"
                    onClick={this.StatusCloseModel}
                  >
                    {" "}
                    Apply
                  </Button>
                </div>

                <div
                  className="d-flex"
                  onClick={this.sortStatusAtoZ.bind(this)}
                >
                  <a className="sorting-icon">
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.p.sortatoz
                      : "SORT BY A TO Z"}
                  </p>
                </div>
                <div
                  className="d-flex"
                  onClick={this.sortStatusZtoA.bind(this)}
                >
                  <a className="sorting-icon">
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.p.sortztoa
                      : "SORT BY Z TO A"}
                  </p>
                </div>
              </div>
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
                        this.state.sticketStatusFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.scategoryFilterCheckbox.includes("all") ||
                        this.state.spriorityFilterCheckbox.includes("all") ||
                        this.state.screatedOnFilterCheckbox.includes("all") ||
                        this.state.sassignedToFilterCheckbox.includes("all")
                      }
                      onChange={this.setSortCheckStatus.bind(this, "all")}
                    />
                    <label htmlFor={"fil-open"}>
                      <span className="table-btn table-blue-btn">ALL</span>
                    </label>
                  </div>
                  {this.state.sortColumnName === "status"
                    ? this.state.sortFilterTicketData !== null &&
                    this.state.sortFilterTicketData.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.ticketStatus}
                          value={item.ticketStatus}
                          checked={this.state.sticketStatusFilterCheckbox.includes(
                            item.ticketStatus
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "status",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.ticketStatus}>
                          <span className="table-btn table-blue-btn">
                            {item.ticketStatus}
                          </span>
                        </label>
                      </div>
                    ))
                    : null}

                  {this.state.sortColumnName === "category"
                    ? this.state.sortFilterCategoryData !== null &&
                    this.state.sortFilterCategoryData.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.category}
                          value={item.category}
                          checked={this.state.scategoryFilterCheckbox.includes(
                            item.category
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "category",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.category}>
                          <span className="table-btn table-blue-btn">
                            {item.category}
                          </span>
                        </label>
                      </div>
                    ))
                    : null}

                  {this.state.sortColumnName === "priority"
                    ? this.state.sortFilterPriorityData !== null &&
                    this.state.sortFilterPriorityData.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.priority}
                          value={item.priority}
                          checked={this.state.spriorityFilterCheckbox.includes(
                            item.priority
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "priority",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.priority}>
                          <span className="table-btn table-blue-btn">
                            {item.priority}
                          </span>
                        </label>
                      </div>
                    ))
                    : null}

                  {this.state.sortColumnName === "createdOn"
                    ? this.state.sortFiltercreatedOnData !== null &&
                    this.state.sortFiltercreatedOnData.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.createdOn}
                          value={item.createdOn}
                          checked={this.state.screatedOnFilterCheckbox.includes(
                            item.createdOn
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "createdOn",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.createdOn}>
                          <span className="table-btn table-blue-btn">
                            {item.createdOn}
                          </span>
                        </label>
                      </div>
                    ))
                    : null}

                  {this.state.sortColumnName === "assignedTo"
                    ? this.state.sortFilterAssigneeData !== null &&
                    this.state.sortFilterAssigneeData.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.assignedTo}
                          value={item.assignedTo}
                          checked={this.state.sassignedToFilterCheckbox.includes(
                            item.assignedTo
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "assignedTo",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.assignedTo}>
                          <span className="table-btn table-blue-btn">
                            {item.assignedTo}
                          </span>
                        </label>
                      </div>
                    ))
                    : null}
                </div>
              </div>

              {/* <div className="filter-type filter-color">
                <p>
                  {TranslationContext !== undefined
                    ? TranslationContext.p.filterbycolor
                    : "FILTER BY COLOR"}
                </p>

                <div className="filter-checkbox">
                  <input
                    type="checkbox"
                    id="fil-red"
                    name="isRed"
                    value={this.state.isRed}
                    onChange={this.setColorSortCheckStatus.bind(this)}
                  />
                  <label htmlFor="fil-red">
                    <span className="fil-color-red fil-color-bg"></span>
                  </label>
                </div>

                <div className="filter-checkbox">
                  <input
                    type="checkbox"
                    id="fil-orange"
                    name="isYellow"
                    value={this.state.isYellow}
                    onChange={this.setColorSortCheckStatus.bind(this)}
                  />
                  <label htmlFor="fil-orange">
                    <span className="fil-color-orange fil-color-bg"></span>
                  </label>
                </div>
                <div className="filter-checkbox">
                  <input
                    type="checkbox"
                    id="fil-white"
                    name="isWhite"
                    value={this.state.isWhite}
                    onChange={this.setColorSortCheckStatus.bind(this)}
                  />
                  <label htmlFor="fil-white">
                    <span className="fil-color-white fil-color-bg"></span>
                  </label>
                </div>
                <div className="filter-checkbox">
                  <input
                    type="checkbox"
                    id="fil-green"
                    name="isGreen"
                    value={this.state.isGreen}
                    onChange={this.setColorSortCheckStatus.bind(this)}
                  />
                  <label htmlFor="fil-green">
                    <span className="fil-color-green fil-color-bg"></span>
                  </label>
                </div>
              </div> */}
            </div>
          </Modal>
        </div>
        <div className="myticketlist-header" style={{ marginTop: "-21px" }}>
          <div className=" setting-tabs esc esc1">
            <div className="mytickt_div">
              <ul
                className="nav nav-tabs upper-tabs es"
                role="tablist"
              // style={{ display: "inline" }}
              >
                {
                  this.state.SearchTicketAllTabCount?.map((ele, i) => {
                    return (
                      ele.isDisplayMyTicket === true &&
                      <li
                        key={i}
                        className="nav-item"
                      // style={{ display: this.state.Escalation }}
                      >
                        <a
                          className={ele?.statusId === 1002 ? "nav-link active" : "nav-link"}
                          // className={"nav-link"}
                          data-toggle="tab"
                          href="#Escalation-tab"
                          role="tab"
                          aria-controls="Escalation-tab"
                          aria-selected="true"
                          name="Escalation"
                          onClick={() => {
                            //this.handleSearchTicket(ele?.statusId);
                            this.handleSearchTicketTabChanges(ele?.statusId)
                          }}
                        >
                          {/* {TranslationContext !== undefined
                          ? TranslationContext.a.escalation
                          : "Escalated"} */}
                          {ele?.ticketStatus}
                          :
                          <span className="myTciket-tab-span">
                            {ele?.ticketCount < 9
                              ? "0" + ele?.ticketCount : ele?.ticketCount}
                            {/* {this.state.byEscalationCount < 9
                            ? "0" + this.state.byEscalationCount
                            : this.state.byEscalationCount} */}
                          </span>
                        </a>
                      </li>
                    )
                  })
                }
                {/* <li className="nav-item" style={{ display: this.state.New }}>
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="New"
                  onClick={() => {
                    this.handleSearchTicket("New");
                  }}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.new
                    : "New"}
                  :
                  <span className="myTciket-tab-span">
                    {this.state.byNewCount < 9
                      ? "0" + this.state.byNewCount
                      : this.state.byNewCount}
                  </span>
                </a>
              </li>
              <li className="nav-item" style={{ display: this.state.Open }}>
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="Open"
                  onClick={() => {
                    this.handleSearchTicket("Open");
                  }}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.open
                    : "Open"}
                  :
                  <span className="myTciket-tab-span">
                    {this.state.byOpenCount < 9
                      ? "0" + this.state.byOpenCount
                      : this.state.byOpenCount}
                  </span>
                </a>
              </li>
              <li className="nav-item" style={{ display: this.state.Resolved }}>
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="Resolved"
                  onClick={() => {
                    this.handleSearchTicket("Resolved");
                  }}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.resolved
                    : "Resolved"}
                  :
                  <span className="myTciket-tab-span">
                    {this.state.byResolvedCount < 9
                      ? "0" + this.state.byResolvedCount
                      : this.state.byResolvedCount}
                  </span>
                </a>
              </li>
              <li
                className="nav-item"
                style={{ display: this.state.ReassignedByMe }}
              >
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="Reassigned"
                  onClick={() => {
                    this.handleSearchTicket("Reassigned");
                  }}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.reassigned
                    : "Reassigned"}
                  :
                  <span className="myTciket-tab-span">
                    {this.state.byReassignedCount < 9
                      ? "0" + this.state.byReassignedCount
                      : this.state.byReassignedCount}
                  </span>
                </a>
              </li>
              <li className="nav-item" style={{ display: this.state.Closed }}>
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="Closed"
                  onClick={() => {
                    this.handleSearchTicket("Closed");
                  }}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.closed
                    : "Closed"}
                  :
                  <span className="myTciket-tab-span">
                    {this.state.byClosedCount < 9
                      ? "0" + this.state.byClosedCount
                      : this.state.byClosedCount}
                  </span>
                </a>
              </li>
              <li className="nav-item" style={{ display: this.state.All }}>
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="All"
                  onClick={() => {
                    this.handleSearchTicket("All");
                  }}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.all
                    : "All"}
                  :
                  <span className="myTciket-tab-span">
                    {this.state.byAllCount < 9
                      ? "0" + this.state.byAllCount
                      : this.state.byAllCount}
                  </span>
                </a>
              </li>
              <li className="nav-item" style={{ display: this.state.FollowUp }}>
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="FollowUp"
                  onClick={() => {
                    this.handleSearchTicket("FollowUp");
                  }}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.followup
                    : "Follow Up"}
                  :
                  <span className="myTciket-tab-span">
                    {this.state.byFollowUpCount < 9
                      ? "0" + this.state.byFollowUpCount
                      : this.state.byFollowUpCount}
                  </span>
                </a>
              </li>
              <li className="nav-item" style={{ display: this.state.Draft }}>
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Draft-tab"
                  role="tab"
                  aria-controls="Draft-tab"
                  aria-selected="false"
                  onClick={this.handleGetDraftDetails}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.draft
                    : "Drafts"}
                  :
                  <span className="myTciket-tab-span">
                    {this.state.draftCountStatus < 9
                      ? "0" + this.state.draftCountStatus
                      : this.state.draftCountStatus}
                  </span>
                </a>
              </li>
              <li className="nav-item" style={{ display: this.state.ReOpen }}>
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="ReOpen"
                  onClick={() => {
                    this.handleSearchTicket("ReOpen");
                  }}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.reopen
                    : "Re-Opened"}
                  :
                  <span className="myTciket-tab-span">
                    {this.state.byReOpenCount < 9
                      ? "0" + this.state.byReOpenCount
                      : this.state.byReOpenCount}
                  </span>
                </a>
              </li>
              <li className="nav-item" style={{ display: this.state.ReOpen }}>
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="Assigned"
                  onClick={() => {
                    this.handleSearchTicket("Assigned");
                  }}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.assigned
                    : "Assigned"}
                  :
                  <span className="myTciket-tab-span">
                    {this.state.byAssignedCount < 9
                      ? "0" + this.state.byAssignedCount
                      : this.state.byAssignedCount}
                  </span>
                </a>
              </li>
              <li className="nav-item" style={{ display: this.state.ReOpen }}>
                <a
                  className="nav-link"
                  data-toggle="tab"
                  href="#Escalation-tab"
                  role="tab"
                  aria-controls="Escalation-tab"
                  aria-selected="false"
                  name="WIP"
                  onClick={() => {
                    this.handleSearchTicket("WIP");
                  }}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.wip
                    : "WIP"}
                  :
                  <span className="myTciket-tab-span">
                    {this.state.byWIPCount < 9
                      ? "0" + this.state.byWIPCount
                      : this.state.byWIPCount}
                  </span>
                </a>
              </li> */}
              </ul>

              <div className="mlistbtn">
                {this.state.SearchTicketData.length > 0 ? (
                  <div>
                    {this.state.headerActiveId === 1003 ? (
                      <label
                        className="clrFlwUp"
                        onClick={this.handleSearchClearFollowUp.bind(this)}
                      >
                        Clear FollowUp
                      </label>
                    ) : null}
                  </div>
                ) : null}

                <button
                  className="Add-ticket-button"
                  type="button"
                  onClick={this.hanleChange}
                >
                  <label className="add-tickets">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.addtickets
                      : "ADD TICKETS"}
                  </label>
                </button>
              </div>
            </div>

            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="Escalation-tab"
                role="tabpanel"
                aria-labelledby="Escalation-tab"
              >
                <div className="container-fluid">
                  <div
                    className="table-cntr mt-3 mtictab table-responsive"
                    style={{ overflow: "initial" }}
                  >
                    <a
                      href="#!"
                      className="float-search"
                      onClick={this.toggleSearch}
                    >
                      <small>{TitleChange}</small>
                      {ImgChange}
                    </a>
                    <div>
                      <Collapse isOpen={this.state.collapseSearch}>
                        <Card>
                          <CardBody>
                            <div className="myticlist-expand-sect">
                              <div className="position-relative">
                                <ul
                                  className="nav nav-tabs lower-tabs"
                                  role="tablist"
                                >
                                  <li className="nav-item">
                                    <a
                                      className="nav-link active"
                                      data-toggle="tab"
                                      href="#date-tab"
                                      role="tab"
                                      aria-controls="date-tab"
                                      aria-selected="true"
                                      onClick={this.handleAdvSearchFlag}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.a.bydate
                                        : "By Date"}
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a
                                      className="nav-link"
                                      data-toggle="tab"
                                      href="#customer-tab"
                                      role="tab"
                                      aria-controls="customer-tab"
                                      aria-selected="false"
                                      onClick={this.handleAdvSearchFlag}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.a.bycustomertype
                                        : "By Customer Type"}
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a
                                      className="nav-link"
                                      data-toggle="tab"
                                      href="#ticket-tab"
                                      role="tab"
                                      aria-controls="ticket-tab"
                                      aria-selected="false"
                                      onClick={this.handleAdvSearchFlag}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.a.bytickettype
                                        : "By Ticket Type"}
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a
                                      className="nav-link"
                                      data-toggle="tab"
                                      href="#category-tab"
                                      role="tab"
                                      aria-controls="category-tab"
                                      aria-selected="false"
                                      onClick={this.handleAdvSearchFlag}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.a.bycategory
                                        : "By Category"}
                                    </a>
                                  </li>
                                  <li className="nav-item">
                                    <a
                                      className="nav-link"
                                      data-toggle="tab"
                                      href="#all-tab"
                                      role="tab"
                                      aria-controls="all-tab"
                                      aria-selected="false"
                                      onClick={this.handleAdvSearchFlag}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.a.all
                                        : "All"}
                                    </a>
                                  </li>
                                </ul>
                                <div className="save-view-search">
                                  {window.localStorage.getItem('isSaveSearch') === "true" &&
                                    <button onClick={this.onOpenModal}>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button.savesearch
                                        : "Save Search"}
                                    </button>
                                  }
                                  <button
                                    type="button"
                                    className="btn-inv"
                                    onClick={this.ViewSearchData.bind(this, 0)}
                                  >
                                    {TranslationContext !== undefined
                                      ? TranslationContext.button.viewsearch
                                      : "View Search"}
                                  </button>
                                </div>
                              </div>
                              <Modal
                                open={this.state.open}
                                onClose={this.onCloseModal}
                                center
                                modalId="save-search-popup"
                                overlayId="save-search-ovrly"
                              >
                                <div className="save-search">
                                  <p>
                                    {TranslationContext !== undefined
                                      ? TranslationContext.button.savesearch
                                      : "SAVE SEARCH"}
                                  </p>
                                </div>
                                <div className="search-name">
                                  <input
                                    type="search"
                                    placeholder={
                                      TranslationContext !== undefined
                                        ? TranslationContext.ticketingDashboard
                                          .givenametoyoursearch
                                        : "Give name to your search"
                                    }
                                    name="SearchName"
                                    value={this.state.SearchName}
                                    onChange={this.handelOnchangeData}
                                  />
                                  {this.state.SearchName.length === 0 && (
                                    <p
                                      style={{
                                        color: "red",
                                        marginBottom: "0px",
                                      }}
                                    >
                                      {this.state.SearchNameCompulsory}
                                    </p>
                                  )}
                                  {this.state.SearchNameExists !== "" && (
                                    <p
                                      style={{
                                        color: "red",
                                        marginBottom: "0px",
                                      }}
                                    >
                                      {this.state.SearchNameExists}
                                    </p>
                                  )}
                                  <button
                                    className="butn"
                                    type="button"
                                    onClick={this.SaveSearchData.bind(this)}
                                  >
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label.save
                                      : "Save"}
                                  </button>
                                </div>
                                <div className="search-names">
                                  <div className="names-title">
                                    <p>
                                      {" "}
                                      {TranslationContext !== undefined
                                        ? TranslationContext.p.searchname
                                        : "Search Name"}
                                    </p>
                                    <p className="mar-comp">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.p.action
                                        : "Action"}
                                    </p>
                                  </div>
                                  <ul>
                                    {this.state.SearchListData !== null &&
                                      this.state.SearchListData.map(
                                        (item, i) => (
                                          <li key={i}>
                                            <label value={item.searchParamID}>
                                              {item.searchName}
                                            </label>
                                            <div>
                                              <a
                                                href="#!"
                                                className="applySearch"
                                                onClick={this.handleApplySearch.bind(
                                                  this,
                                                  item.searchParamID
                                                )}
                                              >
                                                {TranslationContext !==
                                                  undefined
                                                  ? TranslationContext.a.apply
                                                  : "APPLY"}
                                              </a>
                                              <a
                                                href="#!"
                                                className="m-0"
                                                onClick={this.hadleSearchDeleteData.bind(
                                                  this,
                                                  item.searchParamID
                                                )}
                                              >
                                                <img
                                                  src={DelSearch}
                                                  alt="del-search"
                                                  className="cr-pnt"
                                                />
                                              </a>
                                            </div>
                                          </li>
                                        )
                                      )}
                                  </ul>
                                </div>
                              </Modal>
                              <div className="tab-content lower-tabs-pane p-0">
                                <div
                                  className="tab-pane fade show active"
                                  id="date-tab"
                                  role="tabpanel"
                                  aria-labelledby="date-tab"
                                >
                                  <div className="container-fluid">
                                    <div className="row">
                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state
                                            .CreateDateShowRecord,
                                        }}
                                      >
                                        <DatePicker
                                          selected={this.state.ByDateCreatDate}
                                          onChange={this.handleByDateCreate.bind(
                                            this
                                          )}
                                          placeholderText={
                                            TranslationContext !== undefined
                                              ? TranslationContext.placeholder
                                                .creationdate
                                              : "Creation Date"
                                          }
                                          showMonthDropdown
                                          showYearDropdown
                                          dateFormat="dd/MM/yyyy"
                                          autoComplete="off"
                                          value={this.state.ByDateCreatDate}
                                        />
                                      </div>
                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.LastUpdatedDate,
                                        }}
                                      >
                                        <DatePicker
                                          selected={this.state.ByDateSelectDate}
                                          onChange={this.handleChangeSelectDate.bind(
                                            this
                                          )}
                                          placeholderText={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .lastupdateddate
                                              : "Last Updated Date"
                                          }
                                          showMonthDropdown
                                          showYearDropdown
                                          dateFormat="dd/MM/yyyy"
                                          value={this.state.ByDateSelectDate}
                                          name="ByDateSelectDate"
                                          autoComplete="off"
                                        />
                                      </div>
                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.SLAStatus,
                                        }}
                                      >
                                        <select
                                          value={
                                            this.state.selectedSlaDueByDate
                                          }
                                          onChange={this.handleSlaDueByDate}
                                        >
                                          <option value="0">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label.sladue
                                              : "SLA Due"}
                                          </option>
                                          {this.state.SlaDueData !== null &&
                                            this.state.SlaDueData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.slaDueID}
                                                >
                                                  {item.slaDueName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                        {/* <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={(option) =>
                                              option.slaDueName
                                            }
                                            getOptionValue={(option) =>
                                              option.slaDueID
                                            }
                                            options={this.state.SlaDueData}
                                            placeholder={
                                              TranslationContext !== undefined
                                                ? TranslationContext
                                                    .ticketingDashboard.slaDue
                                                : "SLA Due"
                                            }
                                            closeMenuOnSelect={false}
                                            onChange={this.handleSlaDueByDate.bind(
                                              this
                                            )}
                                            value={
                                              this.state.selectedSlaDueByDate
                                            }
                                            isMulti
                                          />
                                        </div> */}
                                      </div>

                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.TicketStatus,
                                        }}
                                      >
                                        <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={(option) =>
                                              option.ticketStatusName
                                            }
                                            getOptionValue={(option) =>
                                              option.ticketStatusID
                                            }
                                            options={
                                              // this.state.TicketStatusData
                                              TicketStatus()[0]
                                            }
                                            placeholder={
                                              TranslationContext !== undefined
                                                ? TranslationContext.div
                                                  .ticketstatus
                                                : "Ticket Status"
                                            }
                                            closeMenuOnSelect={false}
                                            onChange={this.handleTicketStatusByDate.bind(
                                              this
                                            )}
                                            value={
                                              this.state
                                                .selectedTicketStatusByDate
                                            }
                                            isMulti
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="tab-pane fade"
                                  id="customer-tab"
                                  role="tabpanel"
                                  aria-labelledby="customer-tab"
                                >
                                  <div className="container-fluid">
                                    <div className="row">
                                      <div className="col-md-3 col-sm-6 mb-3">
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .customerName
                                              : "Customer Name"
                                          }
                                          name="NameByCustType"
                                          value={this.state.NameByCustType}
                                          onChange={this.handelOnchangeData}
                                          autoComplete="off"
                                        />
                                      </div>
                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.MobileNo,
                                        }}
                                      >
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .customermobilenumber
                                              : "Customer Mobile No"
                                          }
                                          name="MobileNoByCustType"
                                          value={this.state.MobileNoByCustType}
                                          onChange={this.handelOnchangeData}
                                          autoComplete="off"
                                          maxLength={10}
                                        />
                                      </div>
                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.Email,
                                        }}
                                      >
                                        <input
                                          type="text"
                                          className="no-bg"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .customeremailid
                                              : "Customer Email ID"
                                          }
                                          name="EmailIdByCustType"
                                          autoComplete="off"
                                          value={this.state.EmailIdByCustType}
                                          onChange={this.handelOnchangeData}
                                        />
                                      </div>
                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.TicketIDTitle,
                                        }}
                                      >
                                        <input
                                          type="text"
                                          className="no-bg"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .ticketid
                                              : "Ticket ID"
                                          }
                                          name="TicketIdByCustType"
                                          maxLength={9}
                                          autoComplete="off"
                                          value={this.state.TicketIdByCustType}
                                          onChange={this.handelOnchangeData}
                                        />
                                      </div>

                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.TicketStatus,
                                        }}
                                      >
                                        <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={(option) =>
                                              option.ticketStatusName
                                            }
                                            getOptionValue={(option) =>
                                              option.ticketStatusID
                                            }
                                            options={
                                              // this.state.TicketStatusData
                                              TicketStatus()[0]
                                            }
                                            placeholder={
                                              TranslationContext !== undefined
                                                ? TranslationContext.div
                                                  .ticketstatus
                                                : "Ticket Status"
                                            }
                                            closeMenuOnSelect={false}
                                            onChange={this.handleTicketStatusByCustomer.bind(
                                              this
                                            )}
                                            value={
                                              this.state
                                                .selectedTicketStatusByCustomer
                                            }
                                            isMulti
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="tab-pane fade"
                                  id="ticket-tab"
                                  role="tabpanel"
                                  aria-labelledby="ticket-tab"
                                >
                                  <div className="container-fluid">
                                    <div className="row">
                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.TicketPriority,
                                        }}
                                      >
                                        <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={(option) =>
                                              option.priortyName
                                            }
                                            getOptionValue={(option) =>
                                              option.priorityID
                                            }
                                            options={
                                              this.state.TicketPriorityData
                                            }
                                            placeholder={
                                              TranslationContext !== undefined
                                                ? TranslationContext.label
                                                  .priority
                                                : "Priority"
                                            }
                                            closeMenuOnSelect={false}
                                            onChange={this.setPriorityValue.bind(
                                              this
                                            )}
                                            value={this.state.selectedPriority}
                                            isMulti
                                          />
                                        </div>
                                      </div>

                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.TicketStatus,
                                        }}
                                      >
                                        <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={(option) =>
                                              option.ticketStatusName
                                            }
                                            getOptionValue={(option) =>
                                              option.ticketStatusID
                                            }
                                            options={
                                              // this.state.TicketStatusData
                                              TicketStatus()[0]
                                            }
                                            placeholder={
                                              TranslationContext !== undefined
                                                ? TranslationContext.div
                                                  .ticketstatus
                                                : "Ticket Status"
                                            }
                                            closeMenuOnSelect={false}
                                            onChange={this.handleTicketStatusByTicket.bind(
                                              this
                                            )}
                                            value={
                                              this.state
                                                .selectedTicketStatusByTicket
                                            }
                                            isMulti
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-3 col-sm-6">
                                        <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={(option) =>
                                              option.nameOfChannel
                                            }
                                            getOptionValue={(option) =>
                                              option.channelOfPurchaseID
                                            }
                                            options={
                                              this.state.ChannelOfPurchaseData
                                            }
                                            placeholder={
                                              window.localStorage.getItem('Programcode') === 'campusshoes'
                                                ?
                                                this.state.ticketFields.filter((x) =>
                                                  x.fieldName.toLowerCase() === "Channel Of Purchase".toLowerCase()
                                                )[0]?.displayEnglishName
                                                :
                                                TranslationContext !== undefined
                                                  ? TranslationContext.label
                                                    .channelofpurchase
                                                  : "Channel Of Purchase"
                                            }
                                            closeMenuOnSelect={false}
                                            onChange={this.setChannelOfPurchaseValue.bind(
                                              this
                                            )}
                                            value={
                                              this.state
                                                .selectedChannelOfPurchase
                                            }
                                            isMulti
                                          />
                                        </div>
                                      </div>

                                      <div className="col-md-3 col-sm-6">
                                        <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={(option) =>
                                              option.ticketActionTypeName
                                            }
                                            getOptionValue={(option) =>
                                              option.ticketActionTypeID
                                            }
                                            options={
                                              this.state.TicketActionTypeData
                                            }
                                            placeholder={
                                              TranslationContext !== undefined
                                                ? TranslationContext.label
                                                  .ticketactiontype
                                                : "Action Type"
                                            }
                                            closeMenuOnSelect={false}
                                            onChange={this.setTicketActionTypeValue.bind(
                                              this
                                            )}
                                            value={
                                              this.state
                                                .selectedTicketActionType
                                            }
                                            isMulti
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="tab-pane fade"
                                  id="category-tab"
                                  role="tabpanel"
                                  aria-labelledby="category-tab"
                                >
                                  <div className="container-fluid">
                                    <div className="row">
                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.Category,
                                        }}
                                      >
                                        <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={(option) =>
                                              option.categoryName
                                            }
                                            getOptionValue={(option) =>
                                              option.categoryID
                                            }
                                            options={this.state.CategoryData}
                                            placeholder={
                                              TranslationContext !== undefined
                                                ? TranslationContext.label
                                                  .category
                                                : "Category"
                                            }
                                            closeMenuOnSelect={false}
                                            onChange={this.setCategoryValue.bind(
                                              this
                                            )}
                                            value={this.state.selectedCategory}
                                            isMulti
                                          />
                                        </div>
                                      </div>

                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.SubCategory,
                                        }}
                                      >
                                        <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={(option) =>
                                              option.subCategoryName
                                            }
                                            getOptionValue={(option) =>
                                              option.subCategoryID
                                            }
                                            options={this.state.SubCategoryData}
                                            placeholder={
                                              TranslationContext !== undefined
                                                ? TranslationContext.label
                                                  .subcategory
                                                : "Sub Category"
                                            }
                                            closeMenuOnSelect={false}
                                            onChange={this.setSubCategoryValue.bind(
                                              this
                                            )}
                                            value={
                                              this.state.selectedSubCategory
                                            }
                                            isMulti
                                          />
                                        </div>
                                      </div>

                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.IssueType,
                                        }}
                                      >
                                        <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={(option) =>
                                              option.issueTypeName
                                            }
                                            getOptionValue={(option) =>
                                              option.issueTypeID
                                            }
                                            options={this.state.IssueTypeData}
                                            placeholder={
                                              TranslationContext !== undefined
                                                ? TranslationContext.label
                                                  .issuetype
                                                : "Issue Type"
                                            }
                                            closeMenuOnSelect={false}
                                            onChange={this.setIssueTypeValue.bind(
                                              this
                                            )}
                                            value={this.state.selectedIssueType}
                                            isMulti
                                          />
                                        </div>
                                      </div>

                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.TicketStatus,
                                        }}
                                      >
                                        <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={(option) =>
                                              option.ticketStatusName
                                            }
                                            getOptionValue={(option) =>
                                              option.ticketStatusID
                                            }
                                            options={
                                              // this.state.TicketStatusData
                                              TicketStatus()[0]
                                            }
                                            placeholder={
                                              TranslationContext !== undefined
                                                ? TranslationContext.div
                                                  .ticketstatus
                                                : "Ticket Status"
                                            }
                                            closeMenuOnSelect={false}
                                            onChange={this.handleTicketStatusByCategory.bind(
                                              this
                                            )}
                                            value={
                                              this.state
                                                .selectedTicketStatusByCategory
                                            }
                                            isMulti
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="tab-pane fade"
                                  id="all-tab"
                                  role="tabpanel"
                                  aria-labelledby="all-tab"
                                >
                                  <div className="container-fluid">
                                    <div className="row all-filter-row">
                                      <div
                                        className="col-md-3 col-sm-6 allspc"
                                        style={{
                                          display: this.state
                                            .CreateDateShowRecord,
                                        }}
                                      >
                                        <DatePicker
                                          selected={this.state.ByAllCreateDate}
                                          placeholderText={
                                            TranslationContext !== undefined
                                              ? TranslationContext.p.createddate
                                              : "Creation Date"
                                          }
                                          showMonthDropdown
                                          showYearDropdown
                                          dateFormat="dd/MM/yyyy"
                                          value={this.state.ByAllCreateDate}
                                          onChange={this.handleAllCreateDate.bind(
                                            this
                                          )}
                                        />
                                      </div>
                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.TicketSource,
                                        }}
                                      >
                                        <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={(option) =>
                                              option.ticketSourceName
                                            }
                                            getOptionValue={(option) =>
                                              option.ticketSourceId
                                            }
                                            options={
                                              this.state.TicketSourceData
                                            }
                                            placeholder={
                                              TranslationContext !== undefined
                                                ? TranslationContext.label
                                                  .ticketsource
                                                : "Ticket Source"
                                            }
                                            closeMenuOnSelect={false}
                                            onChange={this.setTicketSourceValue.bind(
                                              this
                                            )}
                                            value={
                                              this.state.selectedTicketSource
                                            }
                                            isMulti
                                          />
                                        </div>
                                      </div>
                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.ClaimID,
                                        }}
                                      >
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label.claimid
                                              : "Claim ID"
                                          }
                                          value={this.state.ClaimIdByAll}
                                          name="ClaimIdByAll"
                                          autoComplete="off"
                                          onChange={this.handelOnchangeData}
                                        />
                                      </div>
                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.Email,
                                        }}
                                      >
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.a.email
                                              : "Email"
                                          }
                                          value={this.state.EmailByAll}
                                          name="EmailByAll"
                                          autoComplete="off"
                                          onChange={this.handelOnchangeData}
                                        />
                                      </div>
                                      <div
                                        className="col-md-3 col-sm-6 allspc"
                                        style={{
                                          display: this.state.LastUpdatedDate,
                                        }}
                                      >
                                        <DatePicker
                                          selected={this.state.ByAllLastDate}
                                          onChange={this.handleAllLastDate.bind(
                                            this
                                          )}
                                          placeholderText={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .lastupdateddate
                                              : "Last Updated Date"
                                          }
                                          showMonthDropdown
                                          showYearDropdown
                                          dateFormat="dd/MM/yyyy"
                                          value={this.state.ByAllLastDate}
                                        />
                                      </div>
                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.TicketIDTitle,
                                        }}
                                      >
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .ticketidtitle
                                              : "Ticket Id/Title"
                                          }
                                          value={this.state.TicketIdTitleByAll}
                                          name="TicketIdTitleByAll"
                                          autoComplete="off"
                                          onChange={this.handelOnchangeData}
                                        />
                                      </div>
                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state
                                            .InvoiceNoSubOrderNo,
                                        }}
                                      >
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .invosuborderno
                                              : "Invoice Number/Sub Order No"
                                          }
                                          autoComplete="off"
                                          value={
                                            this.state.InvoiceSubOrderByAll
                                          }
                                          name="InvoiceSubOrderByAll"
                                          onChange={this.handelOnchangeData}
                                        />
                                      </div>
                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.MobileNo,
                                        }}
                                      >
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label.mobile
                                              : "Mobile"
                                          }
                                          value={this.state.MobileByAll}
                                          name="MobileByAll"
                                          autoComplete="off"
                                          maxLength={10}
                                          onChange={this.handelOnchangeData}
                                        />
                                      </div>
                                      <div
                                        className="col-md-3 col-sm-6 allspc"
                                        style={{
                                          display: this.state.Category,
                                        }}
                                      >
                                        <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={(option) =>
                                              option.categoryName
                                            }
                                            getOptionValue={(option) =>
                                              option.categoryID
                                            }
                                            options={this.state.CategoryData}
                                            placeholder={
                                              TranslationContext !== undefined
                                                ? TranslationContext.label
                                                  .category
                                                : "Category"
                                            }
                                            closeMenuOnSelect={false}
                                            onChange={this.setCategoryAllValue.bind(
                                              this
                                            )}
                                            value={
                                              this.state.selectedCategoryAll
                                            }
                                            isMulti
                                          />
                                        </div>
                                      </div>

                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.TicketPriority,
                                        }}
                                      >
                                        <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={(option) =>
                                              option.priortyName
                                            }
                                            getOptionValue={(option) =>
                                              option.priorityID
                                            }
                                            options={
                                              this.state.TicketPriorityData
                                            }
                                            placeholder={
                                              TranslationContext !== undefined
                                                ? TranslationContext.label
                                                  .ticketpriority
                                                : "Ticket Priority"
                                            }
                                            closeMenuOnSelect={false}
                                            onChange={this.setPriorityAllValue.bind(
                                              this
                                            )}
                                            value={
                                              this.state.selectedPriorityAll
                                            }
                                            isMulti
                                          />
                                        </div>
                                      </div>

                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.ItemID,
                                        }}
                                      >
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label.itemid
                                              : "Item ID"
                                          }
                                          value={this.state.ItemIdByAll}
                                          name="ItemIdByAll"
                                          autoComplete="off"
                                          onChange={this.handelOnchangeData}
                                        />
                                      </div>
                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.AssignTo,
                                        }}
                                      >
                                        <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={(option) =>
                                              option.fullName
                                            }
                                            getOptionValue={(option) =>
                                              option.userID
                                            }
                                            options={this.state.AssignToData}
                                            placeholder={
                                              TranslationContext !== undefined
                                                ? TranslationContext.option
                                                  .selectassignedto
                                                : "Select Assigned To"
                                            }
                                            closeMenuOnSelect={false}
                                            onChange={this.setAssignedToValue.bind(
                                              this
                                            )}
                                            value={
                                              this.state.selectedAssignedTo
                                            }
                                            isMulti
                                          />
                                        </div>
                                      </div>

                                      <div
                                        className="col-md-3 col-sm-6 allspc"
                                        style={{
                                          display: this.state.SubCategory,
                                        }}
                                      >
                                        <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={(option) =>
                                              option.subCategoryName
                                            }
                                            getOptionValue={(option) =>
                                              option.subCategoryID
                                            }
                                            options={
                                              this.state.SubCategoryAllData
                                            }
                                            placeholder={
                                              TranslationContext !== undefined
                                                ? TranslationContext.label
                                                  .subcategory
                                                : "Sub Category"
                                            }
                                            closeMenuOnSelect={false}
                                            onChange={this.setSubCategoryAllValue.bind(
                                              this
                                            )}
                                            value={
                                              this.state.selectedSubCategoryAll
                                            }
                                            isMulti
                                          />
                                        </div>
                                      </div>

                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.TicketStatus,
                                        }}
                                      >
                                        <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={(option) =>
                                              option.ticketStatusName
                                            }
                                            getOptionValue={(option) =>
                                              option.ticketStatusID
                                            }
                                            options={
                                              // this.state.TicketStatusData
                                              TicketStatus()[0]
                                            }
                                            placeholder={
                                              TranslationContext !== undefined
                                                ? TranslationContext.div
                                                  .ticketstatus
                                                : "Ticket Status"
                                            }
                                            closeMenuOnSelect={false}
                                            onChange={this.handleTicketStatusAll.bind(
                                              this
                                            )}
                                            value={
                                              this.state.selectedTicketStatusAll
                                            }
                                            isMulti
                                          />
                                        </div>
                                      </div>
                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.Didvisitstore,
                                        }}
                                      >
                                        <select
                                          value={
                                            this.state.selectedVisitStoreAll
                                          }
                                          onChange={this.handleVisitStoreAll}
                                        >
                                          <option value="all">
                                            {TranslationContext !== undefined
                                              ? TranslationContext
                                                .ticketingDashboard
                                                .didvisitstoreall
                                              : "Did Visit Store : All"}
                                          </option>
                                          <option value="yes">
                                            {TranslationContext !== undefined
                                              ? TranslationContext
                                                .ticketingDashboard
                                                .didvisitstoreyes
                                              : "Did Visit Store : Yes"}
                                          </option>
                                          <option value="no">
                                            {TranslationContext !== undefined
                                              ? TranslationContext
                                                .ticketingDashboard
                                                .didvisitstoreno
                                              : "Did Visit Store : No"}
                                          </option>
                                        </select>
                                      </div>
                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state
                                            .PurchaseStoreCodeAddress,
                                        }}
                                      >
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext
                                                .ticketingDashboard
                                                .purchasestorecodeaddress
                                              : "Purchase Store Code/Address"
                                          }
                                          value={
                                            this.state
                                              .selectedPurchaseStoreCodeAddressAll
                                          }
                                          onChange={
                                            this
                                              .handlePurchaseStoreCodeAddressAll
                                          }
                                        />
                                      </div>

                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.IssueType,
                                        }}
                                      >
                                        <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={(option) =>
                                              option.issueTypeName
                                            }
                                            getOptionValue={(option) =>
                                              option.issueTypeID
                                            }
                                            options={
                                              this.state.IssueTypeAllData
                                            }
                                            placeholder={
                                              TranslationContext !== undefined
                                                ? TranslationContext.label
                                                  .issuetype
                                                : "Issue Type"
                                            }
                                            closeMenuOnSelect={false}
                                            onChange={this.setIssueTypeAllValue.bind(
                                              this
                                            )}
                                            value={
                                              this.state.selectedIssueTypeAll
                                            }
                                            isMulti
                                          />
                                        </div>
                                      </div>

                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.SLAStatus,
                                        }}
                                      >
                                        <select
                                          value={this.state.selectedSlaStatus}
                                          onChange={this.setSlaStatusValue}
                                        >
                                          <option value="0">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label.sladue
                                              : "SLA Due"}
                                          </option>
                                          {this.state.SlaDueData !== null &&
                                            this.state.SlaDueData.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.slaDueID}
                                                >
                                                  {item.slaDueName}
                                                </option>
                                              )
                                            )}
                                        </select>

                                        {/* <div className="normal-dropdown">
                                          <Select
                                            getOptionLabel={(option) =>
                                              option.slaDueName
                                            }
                                            getOptionValue={(option) =>
                                              option.slaDueID
                                            }
                                            options={this.state.SlaDueData}
                                            placeholder={
                                              TranslationContext !== undefined
                                                ? TranslationContext
                                                    .ticketingDashboard.slaDue
                                                : "SLA Due"
                                            }
                                            closeMenuOnSelect={false}
                                            onChange={this.setSlaStatusValue.bind(
                                              this
                                            )}
                                            value={this.state.selectedSlaStatus}
                                            isMulti
                                          />
                                        </div> */}
                                      </div>
                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.Wanttovisitstore,
                                        }}
                                      >
                                        <select
                                          value={
                                            this.state
                                              .selectedWantToVisitStoreAll
                                          }
                                          onChange={
                                            this.handleWantToVisitStoreAll
                                          }
                                        >
                                          <option value="all">
                                            {TranslationContext !== undefined
                                              ? TranslationContext
                                                .ticketingDashboard
                                                .wantvisitstoreall
                                              : "Want to Visit Store : All"}
                                          </option>
                                          <option value="yes">
                                            {TranslationContext !== undefined
                                              ? TranslationContext
                                                .ticketingDashboard
                                                .wantvisitstoreyes
                                              : "Want to Visit Store : Yes"}
                                          </option>
                                          <option value="no">
                                            {TranslationContext !== undefined
                                              ? TranslationContext
                                                .ticketingDashboard
                                                .wantvisitstoreno
                                              : "Want to Visit Store : No"}
                                          </option>
                                        </select>
                                      </div>
                                      <div
                                        className="col-md-3 col-sm-6"
                                        style={{
                                          display: this.state.Wanttovisitstore,
                                        }}
                                      >
                                        <input
                                          className="no-bg"
                                          type="text"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext
                                                .ticketingDashboard
                                                .wanttovisitStoreCodeAddress
                                              : "Want to visit Store Code/Address"
                                          }
                                          value={
                                            this.state
                                              .selectedVisitStoreCodeAddressAll
                                          }
                                          onChange={
                                            this.handleVisitStoreCodeAddressAll
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="row p-0">
                                      <div className="col-md-6">
                                        <div className="row allspc">
                                          <div
                                            className="col-sm-6"
                                            style={{
                                              display: this.state.WithClaim,
                                            }}
                                          >
                                            <div className="m-b-25">
                                              <select
                                                value={
                                                  this.state
                                                    .selectedWithClaimAll
                                                }
                                                onChange={
                                                  this.handleWithClaimAll
                                                }
                                              >
                                                <option value="no">
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext
                                                      .ticketingDashboard
                                                      .WithClaimNo
                                                    : "With Claim : No"}
                                                </option>
                                                <option value="yes">
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext
                                                      .ticketingDashboard
                                                      .WithClaimyes
                                                    : "With Claim : Yes"}
                                                </option>
                                              </select>
                                            </div>
                                            {this.state.selectedWithClaimAll ===
                                              "yes" ? (
                                              <React.Fragment>
                                                <div className="m-b-25">
                                                  <div className="normal-dropdown">
                                                    <Select
                                                      getOptionLabel={(
                                                        option
                                                      ) =>
                                                        option.claimStatusName
                                                      }
                                                      getOptionValue={(
                                                        option
                                                      ) => option.claimStatusID}
                                                      options={
                                                        this.state
                                                          .ClaimStatusData
                                                      }
                                                      placeholder={
                                                        TranslationContext !==
                                                          undefined
                                                          ? TranslationContext
                                                            .ticketingDashboard
                                                            .claimstatus
                                                          : "Claim Status"
                                                      }
                                                      closeMenuOnSelect={false}
                                                      onChange={this.handleClaimStatus.bind(
                                                        this
                                                      )}
                                                      value={
                                                        this.state
                                                          .selectedClaimStatus
                                                      }
                                                      isMulti
                                                    />
                                                  </div>
                                                </div>

                                                <div className="m-b-25">
                                                  <div className="normal-dropdown">
                                                    <Select
                                                      getOptionLabel={(
                                                        option
                                                      ) => option.categoryName}
                                                      getOptionValue={(
                                                        option
                                                      ) => option.categoryID}
                                                      options={
                                                        this.state.CategoryData
                                                      }
                                                      placeholder={
                                                        TranslationContext !==
                                                          undefined
                                                          ? TranslationContext
                                                            .ticketingDashboard
                                                            .claimcategory
                                                          : "Claim Category"
                                                      }
                                                      closeMenuOnSelect={false}
                                                      onChange={this.setClaimCategoryValue.bind(
                                                        this
                                                      )}
                                                      value={
                                                        this.state
                                                          .selectedClaimCategory
                                                      }
                                                      isMulti
                                                    />
                                                  </div>
                                                </div>

                                                <div className="m-b-25">
                                                  <div className="normal-dropdown">
                                                    <Select
                                                      getOptionLabel={(
                                                        option
                                                      ) =>
                                                        option.subCategoryName
                                                      }
                                                      getOptionValue={(
                                                        option
                                                      ) => option.subCategoryID}
                                                      options={
                                                        this.state
                                                          .ClaimSubCategoryData
                                                      }
                                                      placeholder={
                                                        TranslationContext !==
                                                          undefined
                                                          ? TranslationContext
                                                            .ticketingDashboard
                                                            .claimsubcategory
                                                          : "Claim Sub Category"
                                                      }
                                                      closeMenuOnSelect={false}
                                                      onChange={this.setClaimSubCategoryValue.bind(
                                                        this
                                                      )}
                                                      value={
                                                        this.state
                                                          .selectedClaimSubCategory
                                                      }
                                                      isMulti
                                                    />
                                                  </div>
                                                </div>

                                                <div className="">
                                                  <div className="normal-dropdown">
                                                    <Select
                                                      getOptionLabel={(
                                                        option
                                                      ) => option.issueTypeName}
                                                      getOptionValue={(
                                                        option
                                                      ) => option.issueTypeID}
                                                      options={
                                                        this.state
                                                          .ClaimIssueTypeData
                                                      }
                                                      placeholder={
                                                        TranslationContext !==
                                                          undefined
                                                          ? TranslationContext
                                                            .ticketingDashboard
                                                            .claimissueType
                                                          : "Claim Issue Type"
                                                      }
                                                      closeMenuOnSelect={false}
                                                      onChange={this.setClaimIssueTypeValue.bind(
                                                        this
                                                      )}
                                                      value={
                                                        this.state
                                                          .selectedClaimIssueType
                                                      }
                                                      isMulti
                                                    />
                                                  </div>
                                                </div>
                                              </React.Fragment>
                                            ) : null}
                                          </div>
                                          <div
                                            className="col-sm-6"
                                            style={{
                                              display: this.state.WithTask,
                                            }}
                                          >
                                            <div className="m-b-25">
                                              <select
                                                value={
                                                  this.state.selectedWithTaskAll
                                                }
                                                onChange={
                                                  this.handleWithTaskAll
                                                }
                                              >
                                                <option value="no">
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext
                                                      .ticketingDashboard
                                                      .withtaskno
                                                    : "With Task : No"}
                                                </option>
                                                <option value="yes">
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext
                                                      .ticketingDashboard
                                                      .withtaskyes
                                                    : "With Task : Yes"}
                                                </option>
                                              </select>
                                            </div>

                                            {this.state.selectedWithTaskAll ===
                                              "yes" ? (
                                              <React.Fragment>
                                                <div className="m-b-25">
                                                  <div className="normal-dropdown">
                                                    <Select
                                                      getOptionLabel={(
                                                        option
                                                      ) =>
                                                        option.taskStatusName
                                                      }
                                                      getOptionValue={(
                                                        option
                                                      ) => option.taskStatusID}
                                                      options={
                                                        this.state
                                                          .TaskStatusData
                                                      }
                                                      placeholder={
                                                        TranslationContext !==
                                                          undefined
                                                          ? TranslationContext
                                                            .option.taskstatus
                                                          : "Task Status"
                                                      }
                                                      closeMenuOnSelect={false}
                                                      onChange={this.handleTaskStatus.bind(
                                                        this
                                                      )}
                                                      value={
                                                        this.state
                                                          .selectedTaskStatus
                                                      }
                                                      isMulti
                                                    />
                                                  </div>
                                                </div>

                                                {this.state.displayTicketFileds[
                                                  "Department Name"
                                                ] && (
                                                    <div className="m-b-25">
                                                      <div className="normal-dropdown">
                                                        <Select
                                                          getOptionLabel={(
                                                            option
                                                          ) =>
                                                            option.departmentName
                                                          }
                                                          getOptionValue={(
                                                            option
                                                          ) =>
                                                            option.departmentID
                                                          }
                                                          options={
                                                            this.state
                                                              .DepartmentData
                                                          }
                                                          placeholder={
                                                            TranslationContext !==
                                                              undefined
                                                              ? TranslationContext
                                                                .label
                                                                .taskdepartment
                                                              : "Task Department"
                                                          }
                                                          closeMenuOnSelect={
                                                            false
                                                          }
                                                          onChange={this.setDepartmentValue.bind(
                                                            this
                                                          )}
                                                          value={
                                                            this.state
                                                              .selectedDepartment
                                                          }
                                                          isMulti
                                                        />
                                                      </div>
                                                    </div>
                                                  )}

                                                <div className="">
                                                  <div className="normal-dropdown">
                                                    <Select
                                                      getOptionLabel={(
                                                        option
                                                      ) => option.funcationName}
                                                      getOptionValue={(
                                                        option
                                                      ) => option.functionID}
                                                      options={
                                                        this.state.FunctionData
                                                      }
                                                      placeholder={
                                                        TranslationContext !==
                                                          undefined
                                                          ? TranslationContext
                                                            .label
                                                            .taskfunction
                                                          : "Task Function"
                                                      }
                                                      closeMenuOnSelect={false}
                                                      onChange={this.setFunctionValue.bind(
                                                        this
                                                      )}
                                                      value={
                                                        this.state
                                                          .selectedFunction
                                                      }
                                                      isMulti
                                                    />
                                                  </div>
                                                </div>
                                              </React.Fragment>
                                            ) : null}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="container-fluid myticlist-expand-sect">
                                <div className="row common-adv-padd justify-content-between">
                                  <div className="col-auto d-flex align-items-center">
                                    <p className="font-weight-bold mr-3">
                                      <span className="blue-clr">
                                        {/* {this.state.resultCount < 10
                                          ? "0" + this.state.resultCount
                                          : this.state.resultCount}
                                        &nbsp; */}
                                        {this.state.newresultCount}
                                      </span>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.p.results
                                        : "Results"}
                                    </p>
                                    <a
                                      href="#!"
                                      className="blue-clr fs-14"
                                      onClick={this.clearSearch}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.a.clearsearch
                                        : "CLEAR SEARCH"}
                                    </a>
                                    {/* &nbsp; &nbsp; &nbsp;
                                    <a
                                      href="#!"
                                      className="blue-clr fs-14"
                                      onClick={this.setSortCheckStatus.bind(
                                        this,
                                        "all"
                                      )}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.a.clearfilter
                                        : "CLEAR FILTER"}
                                    </a> */}
                                  </div>
                                  <div className="col-auto mob-mar-btm">
                                    <CSVLink
                                      className={
                                        this.state.SearchTicketData.length > 0
                                          ? "csv-button"
                                          : "csv-button csv-dis-btn"
                                      }
                                      data={this.state.CSVDownload}
                                      filename="Tickets_Data.csv"
                                    >
                                      <img
                                        className="position-relative csv-icon"
                                        src={csv}
                                        alt="csv-icon"
                                      />
                                      {TranslationContext !== undefined
                                        ? TranslationContext.ticketingDashboard
                                          .csv
                                        : "CSV"}
                                    </CSVLink>

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
                                              ? TranslationContext.label
                                                .scheduledateto
                                              : "Schedule date to"}
                                          </b>
                                        </label>
                                        <div>
                                          <div className="normal-dropdown dropdown-setting1 schedule-multi">
                                            <Select
                                              getOptionLabel={(option) =>
                                                option.fullName
                                              }
                                              getOptionValue={(option) =>
                                                option.userID
                                              }
                                              options={
                                                this.state.TeamMemberData
                                              }
                                              placeholder={
                                                TranslationContext !== undefined
                                                  ? TranslationContext.p
                                                    .teammember
                                                  : "Team Member"
                                              }
                                              closeMenuOnSelect={false}
                                              onChange={this.setTeamMember.bind(
                                                this
                                              )}
                                              value={
                                                this.state.selectedTeamMember
                                              }
                                              isMulti
                                            />
                                          </div>
                                          <select
                                            id="inputState"
                                            className="form-control dropdown-setting1 ScheduleDate-to"
                                            value={
                                              this.state.selectScheduleDate
                                            }
                                            onChange={
                                              this.handleScheduleDateChange
                                            }
                                          >
                                            {this.state.ScheduleOption !==
                                              null &&
                                              this.state.ScheduleOption.map(
                                                (item, i) => (
                                                  <option
                                                    key={i}
                                                    value={item.scheduleID}
                                                  >
                                                    {item.scheduleName}
                                                  </option>
                                                )
                                              )}
                                          </select>
                                          {this.state.selectScheduleDate ===
                                            "230" ? (
                                            <div className="ScheduleDate-to">
                                              <span>
                                                <label className="every1">
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.label
                                                      .every
                                                    : "Every"}
                                                </label>
                                                <input
                                                  type="text"
                                                  className="Every"
                                                  placeholder="1"
                                                  onChange={this.handleDailyDay}
                                                />
                                                <label className="every1">
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.label
                                                      .day
                                                    : "Day"}
                                                </label>
                                              </span>
                                            </div>
                                          ) : null}
                                          {this.state.selectScheduleDate ===
                                            "231" ? (
                                            <div className="ScheduleDate-to">
                                              <span>
                                                <label className="every1">
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.label
                                                      .every
                                                    : "Every"}
                                                </label>
                                                <input
                                                  type="text"
                                                  className="Every"
                                                  placeholder="1"
                                                  onChange={this.handleWeekly}
                                                />
                                                <label className="every1">
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.label
                                                      .weekon
                                                    : "Week on"}
                                                </label>
                                              </span>
                                              <div
                                                style={{
                                                  marginTop: "10px",
                                                }}
                                              >
                                                <Checkbox
                                                  onChange={
                                                    this.handleWeeklyDays
                                                  }
                                                  value="Mon"
                                                >
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext
                                                      .checkbox.mon
                                                    : "Mon"}
                                                </Checkbox>
                                                <Checkbox
                                                  onChange={
                                                    this.handleWeeklyDays
                                                  }
                                                  value="Tue"
                                                >
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext
                                                      .checkbox.tue
                                                    : "Tue"}
                                                </Checkbox>
                                                <Checkbox
                                                  onChange={
                                                    this.handleWeeklyDays
                                                  }
                                                  value="Wed"
                                                >
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext
                                                      .checkbox.wed
                                                    : "Wed"}
                                                </Checkbox>
                                                <Checkbox
                                                  onChange={
                                                    this.handleWeeklyDays
                                                  }
                                                  value="Thu"
                                                >
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext
                                                      .checkbox.thu
                                                    : "Thu"}
                                                </Checkbox>
                                                <Checkbox
                                                  onChange={
                                                    this.handleWeeklyDays
                                                  }
                                                  value="Fri"
                                                >
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext
                                                      .checkbox.fri
                                                    : "Fri"}
                                                </Checkbox>
                                                <Checkbox
                                                  onChange={
                                                    this.handleWeeklyDays
                                                  }
                                                  value="Sat"
                                                >
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext
                                                      .checkbox.sat
                                                    : "Sat"}
                                                </Checkbox>
                                                <Checkbox
                                                  onChange={
                                                    this.handleWeeklyDays
                                                  }
                                                  value="Sun"
                                                >
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext
                                                      .checkbox.sun
                                                    : "Sun"}
                                                </Checkbox>
                                              </div>
                                            </div>
                                          ) : null}
                                          {this.state.selectScheduleDate ===
                                            "232" ? (
                                            <div className="ScheduleDate-to">
                                              <span>
                                                <label className="every1">
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.label
                                                      .day
                                                    : "Day"}
                                                </label>
                                                <input
                                                  type="text"
                                                  className="Every"
                                                  placeholder="9"
                                                  onChange={
                                                    this.handleDaysForMonth
                                                  }
                                                />
                                                <label className="every1">
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.label
                                                      .ofevery
                                                    : "of every"}
                                                </label>
                                                <input
                                                  type="text"
                                                  className="Every"
                                                  placeholder="1"
                                                  onChange={
                                                    this.handleMonthForMonth
                                                  }
                                                />
                                                <label className="every1">
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.label
                                                      .months
                                                    : "months"}
                                                </label>
                                              </span>
                                            </div>
                                          ) : null}
                                          {this.state.selectScheduleDate ===
                                            "233" ? (
                                            <div className="ScheduleDate-to">
                                              <span>
                                                <label className="every1">
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.label
                                                      .every
                                                    : "Every"}
                                                </label>
                                                <input
                                                  type="text"
                                                  className="Every"
                                                  placeholder="1"
                                                  onChange={
                                                    this.handleMonthForWeek
                                                  }
                                                />
                                                <label className="every1">
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.label
                                                      .monthonthe
                                                    : "month on the"}
                                                </label>
                                              </span>
                                              <div className="row mt-3">
                                                <div className="col-md-6">
                                                  <select
                                                    id="inputState"
                                                    className="form-control dropdown-setting1"
                                                    onChange={
                                                      this.handleWeekForWeek
                                                    }
                                                    value={
                                                      this.state
                                                        .selectedNoOfWeekForWeek
                                                    }
                                                  >
                                                    <option value="0">
                                                      {TranslationContext !==
                                                        undefined
                                                        ? TranslationContext
                                                          .button.select
                                                        : "Select"}
                                                    </option>
                                                    <option value="2">
                                                      {TranslationContext !==
                                                        undefined
                                                        ? TranslationContext
                                                          .option.second
                                                        : "Second"}
                                                    </option>
                                                    <option value="4">
                                                      {TranslationContext !==
                                                        undefined
                                                        ? TranslationContext.a
                                                          .four
                                                        : "Four"}
                                                    </option>
                                                  </select>
                                                </div>
                                                <div className="col-md-6">
                                                  <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                                                    <Select
                                                      getOptionLabel={(
                                                        option
                                                      ) => option.days}
                                                      getOptionValue={(
                                                        option
                                                      ) => option.days}
                                                      options={
                                                        this.state
                                                          .NameOfDayForWeek
                                                      }
                                                      placeholder={
                                                        TranslationContext !==
                                                          undefined
                                                          ? TranslationContext
                                                            .button.select
                                                          : "Select"
                                                      }
                                                      closeMenuOnSelect={false}
                                                      onChange={this.setNameOfDayForWeek.bind(
                                                        this
                                                      )}
                                                      value={
                                                        this.state
                                                          .selectedNameOfDayForWeek
                                                      }
                                                      isMulti
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          ) : null}
                                          {this.state.selectScheduleDate ===
                                            "234" ? (
                                            <div className="ScheduleDate-to">
                                              <div className="row m-0">
                                                <label
                                                  className="every1"
                                                  style={{
                                                    lineHeight: "40px",
                                                  }}
                                                >
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.label
                                                      .on
                                                    : "on"}
                                                </label>
                                                <div className="col-md-7">
                                                  <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                                                    <Select
                                                      getOptionLabel={(
                                                        option
                                                      ) => option.month}
                                                      getOptionValue={
                                                        (option) => option.month //id
                                                      }
                                                      options={
                                                        this.state
                                                          .NameOfMonthForYear
                                                      }
                                                      placeholder={
                                                        TranslationContext !==
                                                          undefined
                                                          ? TranslationContext
                                                            .button.select
                                                          : "Select"
                                                      }
                                                      closeMenuOnSelect={false}
                                                      onChange={this.setNameOfMonthForYear.bind(
                                                        this
                                                      )}
                                                      value={
                                                        this.state
                                                          .selectedNameOfMonthForYear
                                                      }
                                                      isMulti
                                                    />
                                                  </div>
                                                </div>
                                                <input
                                                  type="text"
                                                  className="Every"
                                                  placeholder="1"
                                                  onChange={
                                                    this.handleDayForYear
                                                  }
                                                />
                                              </div>
                                            </div>
                                          ) : null}
                                          {this.state.selectScheduleDate ===
                                            "235" ? (
                                            <div className="ScheduleDate-to">
                                              <span>
                                                <div className="row m-0">
                                                  <label
                                                    className="every1"
                                                    style={{
                                                      lineHeight: "40px",
                                                    }}
                                                  >
                                                    {TranslationContext !==
                                                      undefined
                                                      ? TranslationContext.label
                                                        .onthe
                                                      : "on the"}
                                                  </label>
                                                  <div className="col-md-7">
                                                    <select
                                                      id="inputState"
                                                      className="form-control dropdown-setting1"
                                                      onChange={
                                                        this.handleWeekForYear
                                                      }
                                                      value={
                                                        this.state
                                                          .selectedNoOfWeekForYear
                                                      }
                                                    >
                                                      <option value="0">
                                                        {TranslationContext !==
                                                          undefined
                                                          ? TranslationContext
                                                            .button.select
                                                          : "Select"}
                                                      </option>
                                                      <option value="2">
                                                        {TranslationContext !==
                                                          undefined
                                                          ? TranslationContext
                                                            .option.second
                                                          : "Second"}
                                                      </option>
                                                      <option value="4">
                                                        {TranslationContext !==
                                                          undefined
                                                          ? TranslationContext.a
                                                            .four
                                                          : "Four"}
                                                      </option>
                                                    </select>
                                                  </div>
                                                </div>
                                              </span>
                                              <div
                                                className="row mt-3"
                                                style={{ position: "relative" }}
                                              >
                                                <div className="col-md-6">
                                                  <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                                                    <Select
                                                      getOptionLabel={(
                                                        option
                                                      ) => option.days}
                                                      getOptionValue={
                                                        (option) => option.days //id
                                                      }
                                                      options={
                                                        this.state
                                                          .NameOfDayForYear
                                                      }
                                                      placeholder={
                                                        TranslationContext !==
                                                          undefined
                                                          ? TranslationContext
                                                            .button.select
                                                          : "Select"
                                                      }
                                                      closeMenuOnSelect={false}
                                                      onChange={this.setNameOfDayForYear.bind(
                                                        this
                                                      )}
                                                      value={
                                                        this.state
                                                          .selectedNameOfDayForYear
                                                      }
                                                      isMulti
                                                    />
                                                  </div>
                                                </div>
                                                <label
                                                  className="every1 last-to"
                                                  style={{
                                                    lineHeight: "40px",
                                                  }}
                                                >
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.label
                                                      .to
                                                    : "to"}
                                                </label>
                                                <div className="col-md-6">
                                                  <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                                                    <Select
                                                      getOptionLabel={(
                                                        option
                                                      ) => option.month}
                                                      getOptionValue={(
                                                        option
                                                      ) => option.month}
                                                      options={
                                                        this.state
                                                          .NameOfMonthForDailyYear
                                                      }
                                                      placeholder={
                                                        TranslationContext !==
                                                          undefined
                                                          ? TranslationContext
                                                            .button.select
                                                          : "Select"
                                                      }
                                                      closeMenuOnSelect={false}
                                                      onChange={this.setNameOfMonthForDailyYear.bind(
                                                        this
                                                      )}
                                                      value={
                                                        this.state
                                                          .selectedNameOfMonthForDailyYear
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
                                              selected={
                                                this.state.selectedScheduleTime
                                              }
                                              onChange={this.handleScheduleTime.bind(
                                                this
                                              )}
                                              placeholderText="11 AM"
                                              showTimeSelect
                                              showTimeSelectOnly
                                              timeIntervals={60}
                                              timeCaption="Select Time"
                                              dateFormat="h:mm aa"
                                              className="txt-1 txt1Place txt1Time"
                                              value={
                                                this.state.selectedScheduleTime
                                              }
                                            />
                                          </div>
                                          <p
                                            style={{
                                              color: "red",
                                              marginBottom: "0",
                                              textAlign: "center",
                                            }}
                                          >
                                            {this.state.scheduleRequired}
                                          </p>
                                          <div>
                                            <button
                                              className="scheduleBtn"
                                              onClick={this.handleSchedulePopup}
                                            >
                                              <label className="addLable">
                                                {TranslationContext !==
                                                  undefined
                                                  ? TranslationContext.button
                                                    .schedule
                                                  : "SCHEDULE"}
                                              </label>
                                            </button>
                                          </div>
                                          <div
                                            onClick={this.ScheduleCloseModel}
                                          >
                                            <button
                                              type="button"
                                              className="scheduleBtncancel"
                                            >
                                              {TranslationContext !== undefined
                                                ? TranslationContext.option
                                                  .cancel
                                                : "CANCEL"}
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </Modal>

                                    <Modal
                                      onClose={this.handleAssignModalClose.bind(
                                        this
                                      )}
                                      open={this.state.AssignModal}
                                      modalId="AssignPop-up"
                                    >
                                      <div className="assign-modal-headerDashboard">
                                        <img
                                          src={BlackLeftArrow}
                                          alt="black-left-arrow-icon"
                                          className="black-left-arrow"
                                          onClick={this.handleAssignModalClose.bind(
                                            this
                                          )}
                                        />
                                        <label className="claim-details">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label
                                              .assignticketsto
                                            : "Assign Tickets To"}
                                        </label>
                                        <img
                                          src={SearchBlackImg}
                                          alt="SearchBlack"
                                          className="black-left-arrow srch-mleft-spc"
                                        />
                                      </div>
                                      <div className="assign-modal-div">
                                        <input
                                          type="text"
                                          className="txt-1 txt-btmSpace"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .firstname
                                              : "First Name"
                                          }
                                          name="assignFirstName"
                                          value={this.state.assignFirstName}
                                          onChange={this.handelOnchangeData}
                                        />
                                        <input
                                          type="text"
                                          className="txt-1 txt-btmSpace"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .lastname
                                              : "Last Name"
                                          }
                                          name="assignLastName"
                                          value={this.state.assignLastName}
                                          onChange={this.handelOnchangeData}
                                        />
                                        <input
                                          type="text"
                                          className="txt-1 txt-btmSpace"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.label.email
                                              : "Email"
                                          }
                                          name="assignEmail"
                                          value={this.state.assignEmail}
                                          onChange={this.handelOnchangeData}
                                        />
                                        <div className="txt-btmSpace">
                                          <select
                                            id="inputState"
                                            className="form-control dropdown-setting"
                                            value={
                                              this.state.selectedDesignation
                                            }
                                            onChange={this.setDesignationValue}
                                          >
                                            <option>
                                              {TranslationContext !== undefined
                                                ? TranslationContext.label
                                                  .designation
                                                : "Designation"}
                                            </option>
                                            {this.state.DesignationData !==
                                              null &&
                                              this.state.DesignationData.map(
                                                (item, i) => (
                                                  <option
                                                    key={i}
                                                    value={item.designationID}
                                                  >
                                                    {item.designationName}
                                                  </option>
                                                )
                                              )}
                                          </select>
                                        </div>
                                        <button
                                          className="butn assign-btn"
                                          type="button"
                                          onClick={this.handleAssignSearchData.bind(
                                            this
                                          )}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label.search
                                            : "SEARCH"}
                                        </button>
                                        <a
                                          href="#!"
                                          className="anchorTag-clear"
                                          onClick={this.handleAssignClearData.bind(
                                            this
                                          )}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label.clear
                                            : "CLEAR"}
                                        </a>
                                      </div>
                                      <div className="assign-modal-body assign-modal-body-mytick">
                                        <ReactTable
                                          data={SearchAssignData}
                                          columns={[
                                            {
                                              Header: (
                                                <span>
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.label
                                                      .agent
                                                    : "Agent"}
                                                </span>
                                              ),
                                              accessor: "agent",
                                              minWidth: 190,
                                              Cell: (row) => {
                                                var ids =
                                                  row.original["user_ID"];
                                                return (
                                                  <div>
                                                    <span>
                                                      <img
                                                        src={Headphone2Img}
                                                        alt="headphone"
                                                        className="oval-55 assign-hdphone"
                                                        id={ids}
                                                      />
                                                      {
                                                        row.original[
                                                        "agentName"
                                                        ]
                                                      }
                                                    </span>
                                                  </div>
                                                );
                                              },
                                            },
                                            {
                                              Header: (
                                                <span>
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.label
                                                      .designation
                                                    : "Designation"}
                                                </span>
                                              ),
                                              accessor: "designation",
                                            },
                                            {
                                              Header: (
                                                <span>
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.label
                                                      .email
                                                    : "Email"}
                                                </span>
                                              ),
                                              accessor: "email",
                                              minWidth: 250,
                                              maxWidth: "auto",
                                            },
                                          ]}
                                          className="assign-ticket-table"
                                          defaultPageSize={5}
                                          minRows={3}
                                          getTrProps={(rowInfo, column) => {
                                            const index = column
                                              ? column.index
                                              : -1;
                                            return {
                                              onClick: (e) => {
                                                this.selectedRow = index;
                                                var agentId =
                                                  column.original["user_ID"];
                                                this.setState({
                                                  agentId,
                                                  agentSelection: "",
                                                });
                                              },
                                              style: {
                                                background:
                                                  this.selectedRow === index
                                                    ? "#ECF2F4"
                                                    : null,
                                              },
                                            };
                                          }}
                                        />
                                        <p
                                          style={{
                                            marginTop:
                                              this.state.agentSelection === ""
                                                ? "0px"
                                                : "10px",
                                            color: "red",
                                            marginBottom: "0",
                                            textAlign: "center",
                                          }}
                                        >
                                          {this.state.agentSelection}
                                        </p>
                                        <textarea
                                          className="assign-modal-textArea"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext
                                                .ticketingDashboard.addremarks
                                              : "Add Remarks"
                                          }
                                          onChange={this.handleAssignRemark}
                                        ></textarea>
                                        <button
                                          className="assign-butn btn-assign-tikcet w-100"
                                          type="button"
                                          onClick={this.handleAssignTickets}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.button
                                              .assigntickets
                                            : "ASSIGN TICKETS"}
                                        </button>
                                      </div>
                                    </Modal>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </Collapse>
                    </div>
                    {this.state.loading === true ? (
                      <div className="loader-icon-cntr">
                        <div className="loader-icon"></div>
                      </div>
                    ) : (
                      <div>
                        <div className="MyTicketListReact cus-head">
                          <ReactTable
                            data={this.state.SearchTicketData}
                            columns={[
                              {
                                Header: (
                                  <span>
                                    <div className="filter-type pink1 pinkmyticket">
                                      <div className="filter-checkbox pink2 pinkmargin">
                                        <input
                                          type="checkbox"
                                          id="fil-aball"
                                          name="ListCheckbox"
                                          onChange={this.checkAllCheckbox.bind(
                                            this
                                          )}
                                        />
                                        <label
                                          htmlFor="fil-aball"
                                          className="ticketid"
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label.id
                                            : "ID"}
                                        </label>
                                      </div>
                                    </div>
                                  </span>
                                ),
                                accessor: "ticketID",
                                Cell: (row) => {
                                  return (
                                    <span
                                      onClick={(e) => this.clickCheckbox(e)}
                                    >
                                      <div className="filter-type pink1 pinkmyticket">
                                        <div className="filter-checkbox pink2 pinkmargin">
                                          <input
                                            type="checkbox"
                                            id={"i" + row.original.ticketID}
                                            name="ListCheckbox"
                                            checked={
                                              this.state.cSelectedRow[
                                              row.original.ticketID
                                              ]
                                            }
                                            attrIds={row.original.ticketID}
                                            onChange={() =>
                                              this.handelCheckBoxCheckedChange(
                                                row.original.ticketID
                                              )
                                            }
                                          />
                                          <label
                                            htmlFor={
                                              "i" + row.original.ticketID
                                            }
                                          >
                                            {row.original.ticketSourceType ===
                                              "Calls" ? (
                                              <img
                                                src={callgreen}
                                                alt="HeadPhone"
                                                className="headPhone3"
                                                title="Calls"
                                              />
                                            ) : row.original
                                              .ticketSourceType ===
                                              "Mails" ? (
                                              <img
                                                src={gmailimg}
                                                alt="HeadPhone"
                                                className="headPhone3"
                                                title="Mails"
                                              />
                                            ) : row.original
                                              .ticketSourceType ===
                                              "Facebook" ? (
                                              <img
                                                src={FacebookImg}
                                                alt="HeadPhone"
                                                className="headPhone3"
                                                title="Facebook"
                                              />
                                            ) : row.original
                                              .ticketSourceType ===
                                              "ChatBot" ? (
                                              <img
                                                src={Chatbot}
                                                alt="HeadPhone"
                                                className="headPhone3"
                                                title="ChatBot"
                                              />
                                            ) : row.original
                                              .ticketSourceType ===
                                              "Twitter" ? (
                                              <img
                                                src={Twitter}
                                                alt="HeadPhone"
                                                className="headPhone3 black-twitter"
                                                title="Twitter"
                                              />
                                            ) : row.original
                                              .ticketSourceType ===
                                              "TicketFromStore" ? (
                                              <img
                                                src={TicketFromStore}
                                                alt="HeadPhone"
                                                className="headPhone3"
                                                title="TicketFromStore"
                                              />
                                            ) : row.original.ticketSourceType ===
                                              "Instagram" ? (
                                              <img
                                                src={instagram}
                                                alt="HeadPhone"
                                                className="headPhone3"
                                                title="TicketFromStore"
                                              />) :
                                              row.original.ticketSourceType ===
                                                "GoogleReview" ? (
                                                <img
                                                  src={googleReview}
                                                  alt="HeadPhone"
                                                  className="headPhone3"
                                                  style={{ width: "12px", height: "12px" }}
                                                  title="TicketFromStore"
                                                />)

                                                : null}

                                            {row.original.ticketID}
                                          </label>
                                        </div>
                                      </div>
                                    </span>
                                  );
                                },
                              },
                              {
                                Header: (
                                  <span
                                    className={this.state.statusColor}
                                    onClick={this.StatusOpenModel.bind(
                                      this,
                                      "status",
                                      TranslationContext !== undefined
                                        ? TranslationContext.label.status
                                        : "Status"
                                    )}
                                  >
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label.status
                                      : "Status"}
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  </span>
                                ),
                                accessor: "ticketStatus",
                                Cell: (row) => {
                                  if (row.original.ticketStatus === "Open") {
                                    return (
                                      <span className="table-b table-blue-btn">
                                        <label>
                                          {row.original.ticketStatus}
                                        </label>
                                      </span>
                                    );
                                  } else if (
                                    row.original.ticketStatus === "Resolved"
                                  ) {
                                    return (
                                      <span className="table-b table-green-btn">
                                        <label>
                                          {row.original.ticketStatus}
                                        </label>
                                      </span>
                                    );
                                  } else if (
                                    row.original.ticketStatus === "New"
                                  ) {
                                    return (
                                      <span className="table-b table-yellow-btn">
                                        <label>
                                          {row.original.ticketStatus}
                                        </label>
                                      </span>
                                    );
                                  } else if (
                                    row.original.ticketStatus === "Solved"
                                  ) {
                                    return (
                                      <span className="table-b table-green-btn">
                                        <label>
                                          {row.original.ticketStatus}
                                        </label>
                                      </span>
                                    );
                                  } else {
                                    return (
                                      <span className="table-b table-green-btn">
                                        <label>
                                          {row.original.ticketStatus}
                                        </label>
                                      </span>
                                    );
                                  }
                                },
                              },
                              {
                                Header: <span></span>,
                                accessor: "taskStatus",
                                width: 45,
                                Cell: (row) => {
                                  if (row.original.claimStatus !== "0/0") {
                                    return (
                                      <div>
                                        <Popover
                                          content={
                                            <div className="dash-task-popup-new">
                                              <div className="d-flex justify-content-between align-items-center">
                                                <p className="m-b-0">
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.label
                                                      .claim
                                                    : "CLAIM"}
                                                  {row.original.claimStatus}
                                                </p>
                                                <div className="d-flex align-items-center">
                                                  {/* 2 NEW */}
                                                  <div className="nw-chat">
                                                    <img
                                                      src={Chat}
                                                      alt="chat"
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                              <ProgressBar
                                                className="task-progress"
                                                now={70}
                                              />
                                            </div>
                                          }
                                          placement="bottom"
                                        >
                                          <img
                                            className="task-icon-1 marginimg claim-icon-1"
                                            src={CliamIconBlue}
                                            alt="task-icon-blue"
                                          />
                                        </Popover>
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div>
                                        <img
                                          className="task-icon-1 marginimg claim-icon-1"
                                          src={CliamIconGray}
                                          alt="task-icon-gray"
                                        />
                                      </div>
                                    );
                                  }
                                },
                              },
                              {
                                Header: <span></span>,
                                accessor: "taskStatus",
                                width: 45,
                                Cell: (row) => {
                                  if (row.original.taskStatus === "0/0") {
                                    return (
                                      <div>
                                        <img
                                          className="task-icon-1 marginimg"
                                          src={TaskIconGray}
                                          alt="task-icon-gray"
                                        />
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div>
                                        <Popover
                                          content={
                                            <div className="dash-task-popup-new">
                                              <div className="d-flex justify-content-between align-items-center">
                                                <p className="m-b-0">
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.nav
                                                      .task
                                                    : "TASK"}
                                                  :{row.original.taskStatus}
                                                </p>
                                                {row.original
                                                  .ticketCommentCount > 0 ? (
                                                  <div className="d-flex align-items-center">
                                                    {
                                                      row.original
                                                        .ticketCommentCount
                                                    }
                                                    {TranslationContext !==
                                                      undefined
                                                      ? TranslationContext.a.new
                                                      : "NEW"}
                                                    <div className="nw-chat">
                                                      <img
                                                        src={Chat}
                                                        alt="chat"
                                                      />
                                                    </div>
                                                  </div>
                                                ) : null}
                                              </div>
                                              <ProgressBar
                                                className="task-progress"
                                                now={70}
                                              />
                                            </div>
                                          }
                                          placement="bottom"
                                        >
                                          <img
                                            className="task-icon-1 marginimg"
                                            src={TaskIconBlue}
                                            alt="task-icon-blue"
                                          />
                                        </Popover>
                                      </div>
                                    );
                                  }
                                },
                              },
                              {
                                Header: (
                                  <label className="ticketid">
                                    <span>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.label.subject
                                        : "Subject"}
                                      {/* / */}
                                    </span>
                                    {/* <span
                                      style={{
                                        fontWeight: "bold",
                                        fontSize: "11px !important",
                                      }}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.span.latestmessage
                                        : "Latest Message"}
                                    </span> */}
                                  </label>
                                ),
                                accessor: "message",
                                show: this.state.displayTicketFileds[
                                  "Ticket Details"
                                ],
                                Cell: (row) => {
                                  return (
                                    <div>
                                      {row.original.message.split("-")[0]}
                                      {/* /&nbsp;
                                      <span style={{ color: "#666" }}>
                                        {row.original.message.split("-")[1]}
                                      </span> */}
                                    </div>
                                  );
                                },
                              },
                              {
                                Header: (
                                  <span
                                    className={this.state.categoryColor}
                                    onClick={this.StatusOpenModel.bind(
                                      this,
                                      "category",
                                      TranslationContext !== undefined
                                        ? TranslationContext.span.category
                                        : "Category"
                                    )}
                                  >
                                    {/* {TranslationContext !== undefined
                                      ? TranslationContext.span.category
                                      : "Category"} */}

                                    {this.state.ticketFields.length > 0
                                      ? this.state.ticketFields.filter(
                                        (x) =>
                                          x.fieldName.toLowerCase() ===
                                          "Category".toLowerCase()
                                      ).length > 0
                                        ? this.state.ticketFields.filter(
                                          (x) =>
                                            x.fieldName.toLowerCase() ===
                                            "Category".toLowerCase()
                                        )[0].createPage
                                          ? TranslationContext !== undefined
                                            ? this.state.ticketFields.filter(
                                              (x) =>
                                                x.fieldName.toLowerCase() ===
                                                "Category".toLowerCase()
                                            )[0].displayHindiName ||
                                            TranslationContext.label.category
                                            : this.state.ticketFields.filter(
                                              (x) =>
                                                x.fieldName.toLowerCase() ===
                                                "Category".toLowerCase()
                                            )[0].displayEnglishName ||
                                            "Category"
                                          : TranslationContext !== undefined
                                            ? TranslationContext.label.category
                                            : "Category"
                                        : TranslationContext !== undefined
                                          ? TranslationContext.label.category
                                          : "Category"
                                      : TranslationContext !== undefined
                                        ? TranslationContext.label.category
                                        : "Category"}
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  </span>
                                ),
                                accessor: "category",
                                sortable: false,
                                show: this.state.displayTicketFileds[
                                  "Category"
                                ],
                                Cell: (row) => (
                                  <span className="one-line-outer">
                                    <label className="one-line">
                                      {row.original.category}
                                    </label>

                                    <Popover
                                      content={
                                        <div className="dash-creation-popup-cntr">
                                          <ul className="dash-category-popup dashnewpopup">
                                            <li>
                                              <p>
                                                {TranslationContext !==
                                                  undefined
                                                  ? TranslationContext.label
                                                    .category
                                                  : "Category"}
                                              </p>
                                              <p>{row.original.category}</p>
                                            </li>
                                            <li>
                                              <p>
                                                {TranslationContext !==
                                                  undefined
                                                  ? TranslationContext.label
                                                    .subcategory
                                                  : "Sub Category"}
                                              </p>
                                              <p>{row.original.subCategory}</p>
                                            </li>
                                            <li>
                                              <p>
                                                {TranslationContext !==
                                                  undefined
                                                  ? TranslationContext.span.type
                                                  : "Type"}
                                              </p>
                                              <p>{row.original.issueType}</p>
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
                                ),
                              },
                              {
                                Header: (
                                  <span
                                    className={this.state.priorityColor}
                                    onClick={this.StatusOpenModel.bind(
                                      this,
                                      "priority",
                                      TranslationContext !== undefined
                                        ? TranslationContext.span.priority
                                        : "Priority"
                                    )}
                                  >
                                    {/* {TranslationContext !== undefined
                                      ? TranslationContext.span.priority
                                      : "Priority"} */}
                                    {this.state.ticketFields.length > 0
                                      ? this.state.ticketFields.filter(
                                        (x) =>
                                          x.fieldName.toLowerCase() ===
                                          "Ticket Priority".toLowerCase()
                                      ).length > 0
                                        ? this.state.ticketFields.filter(
                                          (x) =>
                                            x.fieldName.toLowerCase() ===
                                            "Ticket Priority".toLowerCase()
                                        )[0].createPage
                                          ? TranslationContext !== undefined
                                            ? this.state.ticketFields.filter(
                                              (x) =>
                                                x.fieldName.toLowerCase() ===
                                                "Ticket Priority".toLowerCase()
                                            )[0].displayHindiName ||
                                            TranslationContext.label
                                              .ticketpriority
                                            : this.state.ticketFields.filter(
                                              (x) =>
                                                x.fieldName.toLowerCase() ===
                                                "Ticket Priority".toLowerCase()
                                            )[0].displayEnglishName ||
                                            "Ticket Priority"
                                          : TranslationContext !== undefined
                                            ? TranslationContext.label
                                              .ticketpriority
                                            : "Ticket Priority"
                                        : TranslationContext !== undefined
                                          ? TranslationContext.label
                                            .ticketpriority
                                          : "Ticket Priority"
                                      : TranslationContext !== undefined
                                        ? TranslationContext.label.ticketpriority
                                        : "Ticket Priority"}
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  </span>
                                ),
                                accessor: "priority",
                                minWidth: 50,
                                show: this.state.displayTicketFileds[
                                  "Ticket Priority"
                                ],
                              },
                              {
                                Header: (
                                  <span
                                    className={this.state.assignColor}
                                    onClick={this.StatusOpenModel.bind(
                                      this,
                                      "assignedTo",
                                      TranslationContext !== undefined
                                        ? TranslationContext.span.assignee
                                        : "Assignee"
                                    )}
                                  >
                                    {TranslationContext !== undefined
                                      ? TranslationContext.span.assignee
                                      : "Assignee"}
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  </span>
                                ),
                                accessor: "assignee",
                              },
                              {
                                Header: (
                                  <span
                                    className={this.state.creationColor}
                                    onClick={this.StatusOpenModel.bind(
                                      this,
                                      "createdOn",
                                      TranslationContext !== undefined
                                        ? TranslationContext.span.creationon
                                        : "Creation On"
                                    )}
                                  >
                                    {TranslationContext !== undefined
                                      ? TranslationContext.span.creationon
                                      : "Creation On"}
                                    <FontAwesomeIcon icon={faCaretDown} />
                                  </span>
                                ),
                                accessor: "createdOn",
                                Cell: (row) => {
                                  return (
                                    <span className="one-line-outer">
                                      <label className="one-line">
                                        {row.original.createdOn}
                                      </label>
                                      <Popover
                                        content={
                                          <div className="insertpop1">
                                            <ul className="dash-creation-popup">
                                              <li className="title">
                                                {TranslationContext !==
                                                  undefined
                                                  ? TranslationContext.li
                                                    .creationdetails
                                                  : "Creation details"}
                                              </li>
                                              <li>
                                                <p>
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.label
                                                      .createdby
                                                    : "Created by "}
                                                  {row.original.createdBy}
                                                </p>
                                                <p>{row.original.createdago}</p>
                                              </li>
                                              <li>
                                                <p>
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.label
                                                      .assignedto
                                                    : "Assigned to "}
                                                  {row.original.assignedTo}
                                                </p>
                                                <p>
                                                  {row.original.assignedago}
                                                </p>
                                              </li>
                                              <li>
                                                <p>
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.p
                                                      .updatedby
                                                    : "Updated by "}
                                                  {row.original.updatedBy}
                                                </p>
                                                <p>{row.original.updatedago}</p>
                                              </li>
                                              <li>
                                                <p>
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.p
                                                      .responsetimeremainingby
                                                    : "Response time remaining by"}
                                                </p>
                                                <p>
                                                  {
                                                    row.original
                                                      .responseTimeRemainingBy
                                                  }
                                                </p>
                                              </li>

                                              <li>
                                                <p>
                                                  {" "}
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.p
                                                      .responseoverdueby
                                                    : "Response overdue by"}
                                                </p>
                                                <p>
                                                  {
                                                    row.original
                                                      .responseOverdueBy
                                                  }
                                                </p>
                                              </li>
                                              <li>
                                                <p>
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.p
                                                      .resolutionoverdueby
                                                    : "Resolution overdue by"}
                                                </p>
                                                <p>
                                                  {
                                                    row.original
                                                      .resolutionOverdueBy
                                                  }
                                                </p>
                                              </li>
                                            </ul>
                                          </div>
                                        }
                                        placement="bottom"
                                        overlayClassName="dashboard-popover"
                                      >
                                        <img
                                          className="info-icon info-iconcus"
                                          src={InfoIcon}
                                          alt="info-icon"
                                        />
                                      </Popover>
                                    </span>
                                  );
                                },
                              },
                            ]}
                            resizable={false}
                            defaultPageSize={this.state.postsPerPage}
                            showPagination={false}
                            getTrProps={this.HandleRowClickPage}
                            minRows={2}
                            defaultSorted={[
                              {
                                id: "ticketID",
                                desc: true,
                              },
                            ]}
                          />
                          <nav>
                            <ul className="pagination" style={{ margin: "15px", overflowX: "auto" }}>
                              <button className="page-item" style={{ minWidth: "20px", padding: "0px" }} disabled={this.state.currentPage === 1 ? true : false} onClick={() => this.handlePrevNext("prev")} >

                                ❮

                              </button>
                              {numberListdisplay.map((e, i) => {
                                return (
                                  <li className={`page-item ${this.state.currentPage === e ? 'active' : ''}`} key={i}>
                                    <a className="page-link" onClick={() => this.handlePageCLick(e)}>{e}</a>


                                  </li>

                                )
                              })}


                              <button className="page-item" style={{ minWidth: "20px", padding: "0px" }} disabled={this.state.currentPage === this.state.tabletotalPages ? true : false} onClick={() => this.handlePrevNext("next")}>
                                ❯

                              </button>
                            </ul>
                            <div className="postperpage">
                              <select
                                value={this.state.postsPerPage}
                                onChange={this.handlePageItemchange}
                                className="selectPagination"
                              >

                                <option value={20}>20</option>
                                <option value={30}>30</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                              </select>
                              <p>{"Items per page"}</p>
                            </div>
                          </nav>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                className="tab-pane fade"
                id="Draft-tab"
                role="tabpanel"
                aria-labelledby="Draft-tab"
                onClick={this.handleGetDraftDetails}
              >
                {this.state.isDraftClick ? (
                  <MyTicketDraft history={this.props.history} />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withRouter(MyTicketList);
