import React, { Component, Fragment } from "react";
import { ProgressBar } from "react-bootstrap";
import Modal from "react-responsive-modal";
import SearchIcon from "./../assets/Images/search-icon.png";
import Dash from "./../assets/Images/dash.png";
import CollapseIcon from "./../assets/Images/collapse.png";
import InfoIcon from "./../assets/Images/info-icon.png";
import TaskIconBlue from "./../assets/Images/task-icon-blue.png";
import TaskIconGray from "./../assets/Images/task-icon-gray.png";
import Sorting from "./../assets/Images/sorting.png";
import CliamIconBlue from "./../assets/Images/cliam-icon-blue.png";
import CliamIconGray from "./../assets/Images/claim-icon-gray.png";
import Chat from "./../assets/Images/chat.png";
import Chatbot from "./../assets/Images/chatbot.png";
import Twitter from "./../assets/Images/twitter.png";
import csv from "./../assets/Images/csv.png";
import Schedule from "./../assets/Images/schedule.png";
import Assign from "./../assets/Images/assign.png";
import CancalImg from "./../assets/Images/cancal blue.png";
import DelSearch from "./../assets/Images/del-search.png";
import BlackLeftArrow from "./../assets/Images/black-left-arrow.png";
import SearchBlackImg from "./../assets/Images/searchBlack.png";
import Headphone2Img from "./../assets/Images/headphone2.png";
import MailImg from "./../assets/Images/msg.png";
import FacebookImg from "./../assets/Images/FB.png";
import gmailimg from "./../assets/Images/gmail.png";
import callgreen from "./../assets/Images/callgreen.png";
import TicketFromStore from "./../assets/Images/store.png";
import instagram from "./../assets/Images/instagram.png";
import googleReview from "./../assets/Images/googleReview.png";
import { Collapse, CardBody, Card } from "reactstrap";
import MultiBarChart from "../Component/PieChart/MultiBarChart.js";
import TicketToBillBarGraph from "../Component/PieChart/TicketToBillBarGraph";
import TicketGenerationSourceBar from "../Component/PieChart/TicketGenerationSourceBar";
import TicketToClaimMultiBar from "../Component/PieChart/TicketToClaimMultiBar";
import HeadPhone3 from "./../assets/Images/headphone3.png";
import DatePicker from "react-datepicker";
import OpenByPriorityPie from "../Component/PieChart/PieChart";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactTable from "react-table";
import { Popover, Button } from "antd";
import { Checkbox } from "antd";
import moment from "moment";
import ScheduleDateDropDown from "./ScheduleDateDropDown";
import Select from "react-select";
import { authHeader } from "../helpers/authHeader";
import axios from "axios";
import config from "./../helpers/config";
import { NotificationManager } from "react-notifications";
import SlaDue from "./SlaDue";
import TicketStatus from "./TicketStatus";
import TicketActionType from "./TicketActionType";
import ClaimStatus from "./ClaimStatus";
import TaskStatus from "./TaskStatus";
import { CSVLink } from "react-csv";
import DatePickerComponenet from "./Settings/Ticketing/DatePickerComponent";
import matchSorter from "match-sorter";
import * as translationHI from "./../translations/hindi";
import * as translationMA from "./../translations/marathi";
import Pagination from "react-pagination-js";
import { T } from "antd/lib/upload/utils";
import TicketToStatusGraph from "../Component/PieChart/TicketToStatusGraph";
import { AsyncAction } from "rxjs/internal/scheduler/AsyncAction";
import BlackInfoIcon from "../assets/Images/Info-black.png";
import MergeTicketImg from "./../assets/Images/LinkImg.png";
import BlackDeleteIcon from "./../assets/Images/del-big.png";
import loaderGif from "./../assets/Images/loader.gif";
import picon from "./../assets/Images/picon.png";
import cicon from "./../assets/Images/cicon.png";


class Dashboard extends Component {
  constructor(props) {
    super(props);
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
    ).subtract(15, "days");
    let end = moment(start).add(15, "days");
    this.state = {
      start: start,
      end: end,
      collapse: true,
      collapseSearch: false,
      modalIsOpen: false,
      open: false,
      StatusModel: false,
      Schedule: false,
      AssignModal: false,
      TicketTabIndex: "nav-link active",
      TabNum: 1,
      ByDateCreatDate: "",
      ByDateSelectDate: "",
      ByAllCreateDate: "",
      ByAllLastDate: "",
      selectScheduleDate: 0,
      ScheduleOption: ScheduleDateDropDown(),
      TotalNoOfChatShow: false,
      date: [new Date(), new Date()],
      range: "",
      CSVDownload: [],
      SearchTicketData: [],
      tabletotalPages: 0,
      SearchListData: [],
      SlaDueData: SlaDue(),
      TicketStatusData: [],
      //  TicketStatus().filter(
      //   (status) => status.ticketStatusID >= 101 && status.ticketStatusID <= 105
      // ),
      TicketPriorityData: [],
      selectedChannelOfPurchase: [],
      selectedTicketActionType: [],
      CategoryData: [],
      SubCategoryData: [],
      ClaimSubCategoryData: [],
      IssueTypeData: [],
      ClaimIssueTypeData: [],
      TicketSourceData: [],
      SubCategoryAllData: [],
      IssueTypeAllData: [],
      SlaStatusData: [],
      selectedTeamMember: [],
      DesignationData: [],
      byDateFlag: 1,
      byCustomerTypeFlag: 0,
      byTicketTypeFlag: 0,
      byCategoryFlag: 0,
      allFlag: 0,
      TicketActionTypeData: TicketActionType(),
      selectedWithClaimAll: "no",
      selectedWithTaskAll: "no",
      selectedVisitStoreAll: "all",
      selectedWantToVisitStoreAll: "all",
      ClaimStatusData: ClaimStatus(),
      TaskStatusData: TaskStatus(),
      DepartmentData: [],
      FunctionData: [],
      assignFirstName: "",
      assignLastName: "",
      assignEmail: "",
      selectedAssignedTo: 0,
      AssignToData: [],
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
      selectedTicketStatusAll: 0,
      selectedDesignation: 0,
      ChannelOfPurchaseData: [],
      selectedPriority: 0,
      selectedPriorityAll: 0,
      selectedTicketStatusByDate: 0,
      selectedNoOfDay: 0,
      selectedScheduleTime: "",
      selectedSlaDueByDate: "",
      selectedClaimStatus: 0,
      selectedTaskStatus: 0,
      selectedTicketStatusByCustomer: 0,
      selectedTicketStatusByTicket: 0,
      selectedTicketStatusByCategory: 0,
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
      agentId: 0,
      agentRemark: "",
      ticketIds: "",
      selectedScheduleFor: "",
      dailyDay: 0,
      isByStatus: true,
      ticketStatusId: 100,
      advPageSize: 30,
      advPageNo: 1,
      CheckBoxChecked: false,
      BrandData: [],
      AgentData: [],
      CheckBoxAllAgent: true,
      CheckBoxAllBrand: true,
      DashboardNumberData: {},
      DashboardGraphData: {},
      DashboardBillGraphData: [],
      DashboardSourceGraphData: [],
      DashboardTaskGraphData: [],
      DashboardClaimGraphData: [],
      DashboardPriorityGraphData: [],
      DashboardTicketStatusGraphData: [],
      AgentIds: "",
      BrandIds: "",
      ActiveTabId: 1,
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
      selectedNameOfDayForWeek: [],
      selectedNameOfMonthForYear: [],
      selectedNameOfMonthForDailyYear: [],
      selectedNameOfDayForYear: [],
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
      loading: true,
      SearchNameCompulsory: "",
      SearchNameExists: "",
      loadingAbove: true,
      loadingAboveForGraph: true,
      modulesItems: [],
      FinalSaveSearchData: "",
      CreateDateShowRecord: "",
      LastUpdatedDate: "",
      Category: "",
      SubCategory: "",
      IssueType: "",
      TicketSource: "",
      TicketIDTitle: "",
      TicketPriority: "",
      TicketStatus: "",
      SLAStatus: "",
      ClaimID: "",
      InvoiceNoSubOrderNo: "",
      ItemID: "",
      Didvisitstore: "",
      Wanttovisitstore: "",
      Email: "",
      MobileNo: "",
      AssignTo: "",
      PurchaseStoreCodeAddress: "",
      WithClaim: "",
      WithTask: "",
      scheduleRequired: "",
      agentSelection: "",
      ShowGridCheckBox: false,
      sortColumnName: "",
      sortTicketData: [],
      sortCategoryData: [],
      sortPriorityData: [],
      sortcreatedOnData: [],
      sortAssigneeData: [],
      sortAllData: [],
      cSelectedRow: {},
      statusColor: "",
      categoryColor: "",
      priorityColor: "",
      assignColor: "",
      creationColor: "",
      sortHeader: "",
      moduleID: 0,
      ticketGenerationSourceFlag: false,
      ticketToBillBarFlag: false,
      ticketStatusFlag: false,
      openByPriorityFlag: false,
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
      crmRole: "",
      totalCount: 0,
      currentPage: 1,
      postsPerPage: 20,
      newresultCount: 0,
      NameByCustType: "",
      DashboardSLADataNew: {},
      optionescalation: [
        {
          option: "Yes"
        },
        {
          option: "No"
        }
      ],
      selectedescalationmanagement: "",
      CSATCount: 0,
      DSATCount: 0,
      NeutralCount: 0,
      CSAT: "",
      CsatDdlData: [{ "value": "Available", "name": "Available" }, { "value": "Not Available", "name": "Not Available" }],
      selectedCsatAll: "",
      loadingFeedback: true,
      searchticketmodal: false,
      tabCount: 1,
      txtSearchTicket: "",
      mergingTicketsData: [],
      tempMergingTicketsList: [],
      selectedMergingTickets: [],
      selectedTicketCount: 0,
      isCopyRecepient: false,
      isAutoReply: false,
      isCopyContent: false,
      loadingTickets: true,
      merging: false,
      parentTicketId: 0,
      DashBoardBrandStatusCount: [],
      mergedLoader: false,
      disableButtonmerged: false
    };
    this.applyCallback = this.applyCallback.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.handleSearchTicketEscalation = this.handleSearchTicketEscalation.bind(
      this
    );
    // this.handleTicketsOnLoad = this.handleTicketsOnLoad.bind(this);
    // this.handleTicketsOnLoadLoader = this.handleTicketsOnLoadLoader.bind(this);
    this.handleAdvSearchFlag = this.handleAdvSearchFlag.bind(this);
    this.handleGetDepartmentList = this.handleGetDepartmentList.bind(this);
    this.handleSchedulePopup = this.handleSchedulePopup.bind(this);
    this.handleSchedulePopupSuccess = this.handleSchedulePopupSuccess.bind(
      this
    );
    this.handleAssignTickets = this.handleAssignTickets.bind(this);
    this.handelOnchangeData = this.handelOnchangeData.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.handleGetSaveSearchList = this.handleGetSaveSearchList.bind(this);
    this.handleGetTicketSourceList = this.handleGetTicketSourceList.bind(this);
    this.handleGetCategoryList = this.handleGetCategoryList.bind(this);
    this.handleGetSlaStatusList = this.handleGetSlaStatusList.bind(this);
    this.handleGetSubCategoryList = this.handleGetSubCategoryList.bind(this);
    this.handleGetIssueTypeList = this.handleGetIssueTypeList.bind(this);
    this.handleGetClaimSubCategoryList = this.handleGetClaimSubCategoryList.bind(
      this
    );
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
    this.handleGetFunctionList = this.handleGetFunctionList.bind(this);
    this.handleAssignRemark = this.handleAssignRemark.bind(this);
    this.handleDailyDay = this.handleDailyDay.bind(this);
    this.handleScheduleTime = this.handleScheduleTime.bind(this);
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    this.handleGetDashboardNumberData = this.handleGetDashboardNumberData.bind(
      this
    );
    this.handleGetDashboardGraphData = this.handleGetDashboardGraphData.bind(
      this
    );
    this.handleGetAgentList = this.handleGetAgentList.bind(this);
    this.checkAllAgentStart = this.checkAllAgentStart.bind(this);
    this.checkAllBrandStart = this.checkAllBrandStart.bind(this);
    this.handleDaysForMonth = this.handleDaysForMonth.bind(this);
    this.handleMonthForMonth = this.handleMonthForMonth.bind(this);
    this.handleWeekForWeek = this.handleWeekForWeek.bind(this);
    this.handleWeekForYear = this.handleWeekForYear.bind(this);
    this.handleDayForYear = this.handleDayForYear.bind(this);
    this.handleMonthForWeek = this.handleMonthForWeek.bind(this);
    this.handleWeekly = this.handleWeekly.bind(this);
    this.handleWeeklyDays = this.handleWeeklyDays.bind(this);
    this.handleAdvanceSearchOption = this.handleAdvanceSearchOption.bind(this);
    this.handleGetModulesNames = this.handleGetModulesNames.bind(this);
  }

  componentDidMount() {
    // this.handleSearchTicketEscalation();   // this is called for bydefault content
    // this.handleTicketsOnLoad();
    // //debugger
    this.setState({
      TicketStatusData: TicketStatus()
    })

    this.handleGetTicketFields(); //p1
    // this.handleGetAgentList();
    this.handleGetBrandList();

    // this.getTicketListTableFilters(); //p2
    //this.ViewSearchData();

    this.handleGetChannelOfPurchaseList();//p3
    // this.handleGetDepartmentList();
    this.handleGetTicketPriorityList();
    this.handleGetDesignationList();
    this.handleGetSlaStatusList();
    this.handleGetTicketSourceList();
    this.handleGetCategoryList();



    // this.ViewSearchData();
    //this.handleTicketsOnLoadLoader();
    // this.handleGetDashboardGraphData();
    // this.handleGetSaveSearchList();

    this.handleGetTableFilters();
    // this.getLoggedInEmail();
    this.handleGetModulesNames();

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  // handleTicketsOnLoadLoader() {
  //  // this.setState({ loading: true });
  // }

  getLoggedInEmail = () => {
    var self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetLogedInEmail",
      headers: authHeader(),
    })
      .then(function (res) {
        var status = res.data.status;
        var data = res.data.responseData;
        if (status) {
          self.setState({
            crmRole: data.roleName,
          });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };

  // handleTicketsOnLoad() {
  //   let self = this;
  //  this.setState({ loading: true });

  //   // ---------------By Date tab---------------------
  //   var dateTab = {};
  //   if (this.state.ActiveTabId === 1) {
  //     if (
  //       this.state.ByDateCreatDate === null ||
  //       this.state.ByDateCreatDate === undefined ||
  //       this.state.ByDateCreatDate === ""
  //     ) {
  //       dateTab["Ticket_CreatedOn"] = "";
  //     } else {
  //       dateTab["Ticket_CreatedOn"] = moment(this.state.ByDateCreatDate).format(
  //         "YYYY-MM-DD"
  //       );
  //     }
  //     if (
  //       this.state.ByDateSelectDate === null ||
  //       this.state.ByDateSelectDate === undefined ||
  //       this.state.ByDateSelectDate === ""
  //     ) {
  //       dateTab["Ticket_ModifiedOn"] = "";
  //     } else {
  //       dateTab["Ticket_ModifiedOn"] = moment(
  //         this.state.ByDateSelectDate
  //       ).format("YYYY-MM-DD");
  //     }
  //     dateTab["SLA_DueON"] = this.state.selectedSlaDueByDate.toString();
  //     dateTab["Ticket_StatusID"] = this.state.selectedTicketStatusByDate;
  //   } else {
  //     dateTab = null;
  //   }

  //   // --------------------By Customer Type Tab---------------
  //   var customerType = {};
  //   if (this.state.ActiveTabId === 2) {
  //     customerType["CustomerMobileNo"] = this.state.MobileNoByCustType.trim();
  //     customerType["CustomerEmailID"] = this.state.EmailIdByCustType.trim();
  //     customerType["TicketID"] = this.state.TicketIdByCustType.trim();
  //     customerType[
  //       "TicketStatusID"
  //     ] = this.state.selectedTicketStatusByCustomer;
  //   } else {
  //     customerType = null;
  //   }

  //   // --------------------By Ticket Type Tab-----------------
  //   var ticketType = {};
  //   if (this.state.ActiveTabId === 3) {
  //     let purchaseIds = "";
  //     let actionTypeIds = "";

  //     if (this.state.selectedChannelOfPurchase != null) {
  //       for (let i = 0; i < this.state.selectedChannelOfPurchase.length; i++) {
  //         purchaseIds +=
  //           this.state.selectedChannelOfPurchase[i].channelOfPurchaseID + ",";
  //       }
  //     }
  //     if (this.state.selectedTicketActionType != null) {
  //       for (let i = 0; i < this.state.selectedTicketActionType.length; i++) {
  //         actionTypeIds +=
  //           this.state.selectedTicketActionType[i].ticketActionTypeID + ",";
  //       }
  //     }

  //     ticketType["TicketPriorityID"] = this.state.selectedPriority;
  //     ticketType["TicketStatusID"] = this.state.selectedTicketStatusByTicket;
  //     ticketType["ChannelOfPurchaseIds"] = purchaseIds;
  //     ticketType["ActionTypes"] = actionTypeIds;
  //   } else {
  //     ticketType = null;
  //   }

  //   // --------------------By Category Tab-------------------
  //   var categoryType = {};
  //   if (this.state.ActiveTabId === 4) {
  //     categoryType["CategoryId"] = this.state.selectedCategory;
  //     categoryType["SubCategoryId"] = this.state.selectedSubCategory;
  //     categoryType["IssueTypeId"] = this.state.selectedIssueType;
  //     categoryType[
  //       "TicketStatusID"
  //     ] = this.state.selectedTicketStatusByCategory;
  //   } else {
  //     categoryType = null;
  //   }
  //   //---------------------By Ticket All Tab---------------------
  //   var allTab = {};

  //   if (this.state.ActiveTabId === 5) {
  //     let withClaim = 0;
  //     let withTask = 0;
  //     if (this.state.selectedWithClaimAll === "yes") {
  //       withClaim = 1;
  //     }
  //     if (this.state.selectedWithTaskAll === "yes") {
  //       withTask = 1;
  //     }

  //     // --------------------Check null date----------------------------------
  //     if (
  //       this.state.ByAllCreateDate === null ||
  //       this.state.ByAllCreateDate === undefined ||
  //       this.state.ByAllCreateDate === ""
  //     ) {
  //       allTab["CreatedDate"] = "";
  //     } else {
  //       allTab["CreatedDate"] = moment(this.state.ByAllCreateDate).format(
  //         "YYYY-MM-DD"
  //       );
  //     }
  //     // --------------------Check null date----------------------------------
  //     if (
  //       this.state.ByAllLastDate === null ||
  //       this.state.ByAllLastDate === undefined ||
  //       this.state.ByAllLastDate === ""
  //     ) {
  //       allTab["ModifiedDate"] = "";
  //     } else {
  //       allTab["ModifiedDate"] = moment(this.state.ByAllLastDate).format(
  //         "YYYY-MM-DD"
  //       );
  //     }

  //     allTab["CategoryId"] = this.state.selectedCategoryAll;
  //     allTab["SubCategoryId"] = this.state.selectedSubCategoryAll;
  //     allTab["IssueTypeId"] = this.state.selectedIssueTypeAll;
  //     allTab["TicketSourceTypeID"] = this.state.selectedTicketSource;
  //     allTab["TicketIdORTitle"] = this.state.TicketIdTitleByAll.trim();
  //     allTab["PriorityId"] = this.state.selectedPriorityAll;
  //     allTab["TicketSatutsID"] = this.state.selectedTicketStatusAll;
  //     allTab["SLAStatus"] = this.state.selectedSlaStatus;
  //     allTab["ClaimId"] = this.state.selectedClaimStatus;
  //     allTab[
  //       "InvoiceNumberORSubOrderNo"
  //     ] = this.state.InvoiceSubOrderByAll.trim();
  //     allTab["OrderItemId"] = this.state.ItemIdByAll.trim() === "" ? 0 : this.state.ItemIdByAll.trim();
  //     allTab["IsVisitStore"] = this.state.selectedVisitStoreAll;
  //     allTab["IsWantVistingStore"] = this.state.selectedWantToVisitStoreAll;
  //     allTab["CustomerEmailID"] = this.state.EmailByAll.trim();
  //     allTab["CustomerMobileNo"] = this.state.MobileByAll.trim();
  //     allTab["AssignTo"] = this.state.selectedAssignedTo;
  //     allTab[
  //       "StoreCodeORAddress"
  //     ] = this.state.selectedPurchaseStoreCodeAddressAll.trim();
  //     allTab[
  //       "WantToStoreCodeORAddress"
  //     ] = this.state.selectedVisitStoreCodeAddressAll.trim();
  //     allTab["HaveClaim"] = withClaim   == false ? false : true;
  //     allTab["ClaimStatusId"] = this.state.selectedClaimStatus;
  //     allTab["ClaimCategoryId"] = this.state.selectedClaimCategory;
  //     allTab["ClaimSubCategoryId"] = this.state.selectedClaimSubCategory;
  //     allTab["ClaimIssueTypeId"] = this.state.selectedClaimIssueType;
  //     allTab["HaveTask"] = withTask   == false ? false : true;
  //     allTab["TaskStatusId"] = this.state.selectedTaskStatus;
  //     allTab["TaskDepartment_Id"] = this.state.selectedDepartment;
  //     allTab["TaskFunction_Id"] = this.state.selectedFunction;
  //   } else {
  //     allTab = null;
  //   }

  //   // ----------------------SetState variable in Json Format for Apply Search------------------------------------
  //   var ShowDataparam = {};

  //   ShowDataparam.AssigntoId = this.state.AgentIds;
  //   ShowDataparam.BrandId = this.state.BrandIds;
  //   ShowDataparam.ActiveTabId = this.state.ActiveTabId;
  //   ShowDataparam.searchDataByDate = dateTab;
  //   ShowDataparam.searchDataByCustomerType = customerType;
  //   ShowDataparam.searchDataByTicketType = ticketType;
  //   ShowDataparam.searchDataByCategoryType = categoryType;
  //   ShowDataparam.searchDataByAll = allTab;

  //   var FinalSaveSearchData = JSON.stringify(ShowDataparam);
  //   this.setState({
  //     FinalSaveSearchData,
  //   });
  //   let tableFilterData = this.props.location.tableFilterData
  //     ? this.props.location.tableFilterData
  //     : [];
  //   // ----------------------------------------------------------

  //   axios({
  //     method: "post",
  //     url: config.apiUrl + "/DashBoard/DashBoardSearchTicketNew",
  //     headers: authHeader(),
  //     params: {
  //       pageNo: this.state.currentPage,
  //       pageSize: this.state.postsPerPage,
  //     },
  //     data: {
  //       AssigntoId: this.state.AgentIds,
  //       BrandId: this.state.BrandIds,
  //       ActiveTabId: this.state.ActiveTabId,
  //       searchDataByDate: dateTab,
  //       searchDataByCustomerType: customerType,
  //       searchDataByTicketType: ticketType,
  //       searchDataByCategoryType: categoryType,
  //       searchDataByAll: allTab,
  //     },
  //   })
  //     .then(function(res) {
  //       let status = res.data.message;
  //       let data = res.data.responseData.searchResult;
  //       let totalResultSet = res.data.responseData.ticketCount;
  //       let CSVData = data;
  //       let count = 0;
  //       if (res.data.responseData != null) {
  //         count = res.data.responseData.searchResult.length;
  //       }
  //       if (status === "Success") {
  //         self.setState({
  //           SearchTicketData:
  //             tableFilterData.length > 0 ? tableFilterData : data,
  //           totalCount: totalResultSet,
  //           resultCount: count,
  //           loading: false,
  //           cSelectedRow: {},
  //         });
  //         for (let i = 0; i < CSVData.length; i++) {
  //           delete CSVData[i].totalpages;
  //           // delete CSVData[i].responseTimeRemainingBy;
  //           // delete CSVData[i].responseOverdueBy;
  //           // delete CSVData[i].resolutionOverdueBy;
  //           // delete CSVData[i].ticketCommentCount;
  //         }
  //         self.setState({ CSVDownload: CSVData });
  //       } else {
  //         self.setState({
  //           SearchTicketData: [],

  //           resultCount: 0,
  //           loading: false,
  //         });
  //       }
  //     })
  //     .catch((data) => {
  //       console.log(data);
  //     });
  // }

  clickCheckbox(evt) {
    evt.stopPropagation();
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

  setSortCheckStatus = (column, type, e) => {
    // //debugger
    console.log("sortFilterTicketData 1", this.state.sortFilterTicketData)
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
      // //debugger
      this.setState({
        tempSearchTicketData: itemsArray,
      });
      // this.StatusCloseModel();
    }, 100);
    console.log("sortFilterTicketData 2", this.state.sortFilterTicketData)
  };

  sortStatusAtoZ() {
    var itemsArray = [];
    itemsArray = this.state.SearchTicketData;

    itemsArray.sort(function (a, b) {
      return a.ticketStatus > b.ticketStatus ? 1 : -1;
    });

    this.setState({
      SearchTicketData: itemsArray,
    });
    this.StatusCloseModel();
  }
  sortStatusZtoA() {
    var itemsArray = [];
    itemsArray = this.state.SearchTicketData;
    itemsArray.sort((a, b) => {
      return a.ticketStatus < b.ticketStatus;
    });
    this.setState({
      SearchTicketData: itemsArray,
    });
    this.StatusCloseModel();
  }
  handleGetModulesNames() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetModules",
      headers: authHeader(),
    }).then(function (res) {
      let status = res.data.message;
      let data = res.data.responseData;
      if (data) {
        let moduleID = data[0].moduleID;
        // let selTab = data[0].moduleName;
        // let moduleIDMyticket = data[1].moduleID;
        self.handleAdvanceSearchOption(moduleID);
      }
    });
  }
  handleAdvanceSearchOption(id) {
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
          self.setState({ modulesItems: data1 });
          self.setAdvanceSearch(data1);
        } else {
          self.setState({ modulesItems: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  setAdvanceSearch(data1) {
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

    // if (data.length > 0) {
    //   if (data[0].moduleItemisActive !== undefined) {
    //     if (data[0].moduleItemisActive === true) {
    //       this.setState({ CreateDateShowRecord: "yes" });
    //     } else {
    //       this.setState({ CreateDateShowRecord: "none" });
    //     }
    //   }
    //   if (data[1].moduleItemisActive !== undefined) {
    //     if (data[1].moduleItemisActive === true) {
    //       this.setState({ LastUpdatedDate: "yes" });
    //     } else {
    //       this.setState({ LastUpdatedDate: "none" });
    //     }
    //   }
    //   if (data[2].moduleItemisActive !== undefined) {
    //     if (data[2].moduleItemisActive === true) {
    //       this.setState({ Category: "yes" });
    //     } else {
    //       this.setState({ Category: "none" });
    //     }
    //   }
    //   if (data[3].moduleItemisActive !== undefined) {
    //     if (data[3].moduleItemisActive === true) {
    //       this.setState({ SubCategory: "yes" });
    //     } else {
    //       this.setState({ SubCategory: "none" });
    //     }
    //   }
    //   if (data[4].moduleItemisActive !== undefined) {
    //     if (data[4].moduleItemisActive === true) {
    //       this.setState({ IssueType: "yes" });
    //     } else {
    //       this.setState({ IssueType: "none" });
    //     }
    //   }
    //   if (data[5].moduleItemisActive !== undefined) {
    //     if (data[5].moduleItemisActive === true) {
    //       this.setState({ TicketSource: "yes" });
    //     } else {
    //       this.setState({ TicketSource: "none" });
    //     }
    //   }
    //   if (data[6].moduleItemisActive !== undefined) {
    //     if (data[6].moduleItemisActive === true) {
    //       this.setState({ TicketIDTitle: "yes" });
    //     } else {
    //       this.setState({ TicketIDTitle: "none" });
    //     }
    //   }
    //   if (data[7].moduleItemisActive !== undefined) {
    //     if (data[7].moduleItemisActive === true) {
    //       this.setState({ TicketPriority: "yes" });
    //     } else {
    //       this.setState({ TicketPriority: "none" });
    //     }
    //   }
    //   if (data[8].moduleItemisActive !== undefined) {
    //     if (data[8].moduleItemisActive === true) {
    //       this.setState({ TicketStatus: "yes" });
    //     } else {
    //       this.setState({ TicketStatus: "none" });
    //     }
    //   }
    //   if (data[9].moduleItemisActive !== undefined) {
    //     if (data[9].moduleItemisActive === true) {
    //       this.setState({ SLAStatus: "yes" });
    //     } else {
    //       this.setState({ SLAStatus: "none" });
    //     }
    //   }
    //   if (data[10].moduleItemisActive !== undefined) {
    //     if (data[10].moduleItemisActive === true) {
    //       this.setState({ ClaimID: "yes" });
    //     } else {
    //       this.setState({ ClaimID: "none" });
    //     }
    //   }
    //   if (data[11].moduleItemisActive !== undefined) {
    //     if (data[11].moduleItemisActive === true) {
    //       this.setState({ InvoiceNoSubOrderNo: "yes" });
    //     } else {
    //       this.setState({ InvoiceNoSubOrderNo: "none" });
    //     }
    //   }
    //   if (data[12].moduleItemisActive !== undefined) {
    //     if (data[12].moduleItemisActive === true) {
    //       this.setState({ ItemID: "yes" });
    //     } else {
    //       this.setState({ ItemID: "none" });
    //     }
    //   }
    //   if (data[13].moduleItemisActive !== undefined) {
    //     if (data[13].moduleItemisActive === true) {
    //       this.setState({ Didvisitstore: "yes" });
    //     } else {
    //       this.setState({ Didvisitstore: "none" });
    //     }
    //   }
    //   if (data[14].moduleItemisActive !== undefined) {
    //     if (data[14].moduleItemisActive === true) {
    //       this.setState({ Wanttovisitstore: "yes" });
    //     } else {
    //       this.setState({ Wanttovisitstore: "none" });
    //     }
    //   }
    //   if (data[16].moduleItemisActive !== undefined) {
    //     if (data[16].moduleItemisActive === true) {
    //       this.setState({ Email: "yes" });
    //     } else {
    //       this.setState({ Email: "none" });
    //     }
    //   }
    //   if (data[17].moduleItemisActive !== undefined) {
    //     if (data[17].moduleItemisActive === true) {
    //       this.setState({ MobileNo: "yes" });
    //     } else {
    //       this.setState({ MobileNo: "none" });
    //     }
    //   }
    //   if (data[18].moduleItemisActive !== undefined) {
    //     if (data[18].moduleItemisActive === true) {
    //       this.setState({ AssignTo: "yes" });
    //     } else {
    //       this.setState({ AssignTo: "none" });
    //     }
    //   }
    //   if (data[19].moduleItemisActive !== undefined) {
    //     if (data[19].moduleItemisActive === true) {
    //       this.setState({ PurchaseStoreCodeAddress: "yes" });
    //     } else {
    //       this.setState({ PurchaseStoreCodeAddress: "none" });
    //     }
    //   }
    // }
  }
  handleGetDashboardSLAData = () => {

    let self = this;
    var fromdate = moment(self.state.start).format("YYYY-MM-DD");
    var todate = moment(self.state.end).format("YYYY-MM-DD");
    axios({
      method: "post",
      url: config.apiUrl + "/DashBoard/DashboardSLAData",
      headers: authHeader(),
      params: {
        UserIds: self.state.AgentIds,
        fromdate: fromdate,
        todate: todate,
        BrandID: self.state.BrandIds,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        //console.log("datasla",self.state.BrandIds)
        //console.log("data", data)
        if (status === "Success") {
          self.setState({
            DashboardSLADataNew: data
          })

        }
        else {
          NotificationManager.error(status)
        }
      })
      .catch((data) => {

        console.log(data);
      });
  }
  handleGetDashboardStatusCount = () => {
    let self = this;
    var fromdate = moment(self.state.start).format("YYYY-MM-DD");
    var todate = moment(self.state.end).format("YYYY-MM-DD");
    self.setState({
      loadingFeedback: true
    })
    axios({
      method: "post",
      url: config.apiUrl + "/DashBoard/DashBoardBrandStatusCount",
      headers: authHeader(),
      data: {
        userIds: self.state.AgentIds,
        fromDate: fromdate,
        toDate: todate,
        brandIds: self.state.BrandIds,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        let valueReplace = JSON.parse(data.replace("/n", ""))
        //let valueReplaceArray = Array.from(valueReplace)
        console.log("valueReplace", valueReplace)
        if (status === "Success") {
          self.setState({
            loadingFeedback: false,
            DashBoardBrandStatusCount: valueReplace
          })

        }
        else {
          NotificationManager.error(status)
          self.setState({
            DashBoardBrandStatusCount: []
          })
        }
      })
      .catch((data) => {
        self.setState({
          loadingFeedback: false,
        })
        console.log(data);
      });
  }
  handleGetDashboardFeedbackCountData = () => {
    //debugger
    this.setState({ loadingFeedback: true, CSATCount: 0, DSATCount: 0, NeutralCount: 0 });
    let self = this;
    var fromdate = moment(self.state.start).format("YYYY-MM-DD");
    var todate = moment(self.state.end).format("YYYY-MM-DD");
    axios({
      method: "post",
      url: config.apiUrl + "/DashBoard/DashboardCSATCountData",
      headers: authHeader(),
      params: {
        UserIds: self.state.AgentIds,
        fromdate: fromdate,
        todate: todate,
        BrandID: self.state.BrandIds,
      },
    })
      .then(function (res) {
        debugger
        let status = res.data.message;
        let data = res.data.responseData;

        if (status === "Success") {
          if (data.length > 0) {
            debugger
            const csat = data?.filter(item => item.key === 'CSAT')[0]?.value;
            const dsat = data?.filter(item => item.key === 'DSAT')[0]?.value;
            const neutr = data?.filter(item => item.key === 'Neutral')[0]?.value;
            self.setState({
              CSATCount: (!csat) ? 0 : csat,
              DSATCount: (!dsat) ? 0 : dsat,
              NeutralCount: (!neutr) ? 0 : neutr,
              loadingFeedback: false
            })
          }
          self.setState({
            loadingFeedback: false
          })
        }
        else {
          NotificationManager.error(status)
          self.setState({ loadingFeedback: false });
        }
      })
      .catch((data) => {
        self.setState({ loadingFeedback: false });
        console.log(data);
      });
  }
  handleGetDashboardNumberData() {
    this.setState({ loadingAbove: true });

    let self = this;
    var fromdate = moment(this.state.start).format("YYYY-MM-DD");
    var todate = moment(this.state.end).format("YYYY-MM-DD");
    axios({
      method: "post",
      url: config.apiUrl + "/DashBoard/DashBoardCountData",
      headers: authHeader(),
      params: {
        UserIds: this.state.AgentIds,
        fromdate: fromdate,
        todate: todate,
        BrandID: this.state.BrandIds,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ DashboardNumberData: data, loadingAbove: false });
          // if (
          //   Object.keys(self.state.DashboardGraphData).length > 0 &&
          //   Object.keys(self.state.DashboardNumberData).length > 0
          // ) {
          //   self.setState({ loadingAbove: false });
          // }
        } else {
          self.setState({ DashboardNumberData: {}, loadingAbove: false });
        }
      })
      .catch((data) => {
        self.setState({ loadingAbove: false });
        console.log(data);
      });
  }
  handleGetDashboardGraphData() {
    this.setState({ loadingAboveForGraph: true });

    let self = this;
    var fromdate = moment(new Date(this.state.start)).format("YYYY-MM-DD");
    var todate = moment(new Date(this.state.end)).format("YYYY-MM-DD");
    axios({
      method: "post",
      url: config.apiUrl + "/DashBoard/DashBoardGraphData",
      headers: authHeader(),
      params: {
        UserIds: this.state.AgentIds,
        fromdate: fromdate,
        todate: todate,
        BrandID: this.state.BrandIds,
      },
    })
      .then(function (res) {
        if (res.data.responseData !== null) {
          let DashboardGraphData = res.data.responseData;
          // let DashboardBillGraphData = res.data.responseData.tickettoBillGraph; //bill
          // let DashboardSourceGraphData =
          //   res.data.responseData.ticketSourceGraph; //source
          let DashboardTaskGraphData = res.data.responseData.tickettoTaskGraph;
          let DashboardPriorityGraphData = res.data.responseData.priorityChart;
          let DashboardClaimGraphData =
            res.data.responseData.tickettoClaimGraph;
          let DashboardTicketStatusGraphData = res.data.responseData.tickettoStatusGraph; //status
          if (DashboardTaskGraphData !== null) {
            self.setState({
              DashboardTaskGraphData,
            });
          }
          if (DashboardClaimGraphData !== null) {
            self.setState({
              DashboardClaimGraphData,
            });
          }
          // if (DashboardBillGraphData !== null) {
          //   self.setState({
          //     DashboardBillGraphData,
          //     ticketToBillBarFlag: false,
          //   });
          // } else {
          //   self.setState({
          //     ticketToBillBarFlag: true,
          //   });
          // }
          // if (DashboardSourceGraphData !== null) {
          //   self.setState({
          //     DashboardSourceGraphData,
          //     ticketGenerationSourceFlag: false,
          //   });
          // } else {
          //   self.setState({
          //     ticketGenerationSourceFlag: true,
          //   });
          // }
          if (DashboardPriorityGraphData !== null) {
            self.setState({
              DashboardPriorityGraphData,
              openByPriorityFlag: false,
            });
          } else {
            self.setState({
              DashboardPriorityGraphData: [],
              openByPriorityFlag: true
            });
          }
          if (DashboardTicketStatusGraphData !== null) {
            self.setState({
              DashboardTicketStatusGraphData,
              ticketStatusFlag: false
            });
          } else {
            self.setState({
              DashboardTicketStatusGraphData: [],
              ticketStatusFlag: true
            })
          }
          self.setState({
            DashboardGraphData: DashboardGraphData,
            loadingAboveForGraph: false
          });
          // if (
          //   Object.keys(self.state.DashboardGraphData).length > 0 &&
          //   Object.keys(self.state.DashboardNumberData).length > 0
          // ) {
          //   self.setState({ loadingAboveForGraph: false });
          // }
        }
      })
      .catch((data) => {
        self.setState({
          loadingAboveForGraph: false
        });
        console.log(data);
      });
  }

  checkAllAgentStart(event) {
    var checkboxes = document.getElementsByName("allAgent");
    var strAgentIds = "";
    for (var i in checkboxes) {
      if (isNaN(i) === false) {
        checkboxes[i].checked = true;
        if (checkboxes[i].checked === true) {
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strAgentIds += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    }
    this.setState({
      AgentIds: strAgentIds,
    });
    if (this.state.AgentIds !== "" && this.state.BrandIds !== "") {
      this.handleGetDashboardNumberData();
      this.handleGetDashboardGraphData();
      //this.handleGetDashboardSLAData()
      this.ViewSearchData();
      // this.handleTicketsOnLoad();
    }
  }
  checkAllBrandStart(event) {
    // debugger
    var checkboxes = document.getElementsByName("allBrand");
    var strBrandIds = "";
    for (var i in checkboxes) {
      if (isNaN(i) === false) {
        checkboxes[i].checked = true;
        if (checkboxes[i].checked === true) {
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strBrandIds += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    }
    this.setState({
      BrandIds: strBrandIds,
    });
    if (this.state.AgentIds !== "" && this.state.BrandIds !== "") {
      this.handleGetDashboardNumberData();
      this.handleGetDashboardGraphData();
      // this.handleGetDashboardSLAData()
      this.ViewSearchData();
      this.handleGetAgentList();
      // this.handleTicketsOnLoad();
    }
  }
  checkIndividualAgent = (event) => {
    //debugger
    var agentcount = 0;
    var checkboxes = document.getElementsByName("allAgent");
    var strAgentIds = "";
    for (var i in checkboxes) {
      if (isNaN(i) === false) {
        if (checkboxes[i].checked === true) {
          if (checkboxes[i].getAttribute("attrIds") !== null) agentcount++;
          document.getElementById("spnAgent").textContent = agentcount;
          strAgentIds += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    }
    if (agentcount === 0) {
      document.getElementById("spnAgent").textContent = "select";
    }
    if (checkboxes.length - 1 === agentcount) {
      document.getElementById("spnAgent").textContent = "ALL";
      this.setState({ CheckBoxAllAgent: true });
    } else {
      this.setState({ CheckBoxAllAgent: false });
    }

    this.setState(
      {
        AgentIds: strAgentIds,
        DashboardTaskGraphData: [],
        DashboardClaimGraphData: [],
        DashboardBillGraphData: [],
        DashboardSourceGraphData: [],
        DashboardPriorityGraphData: [],
        DashboardTicketStatusGraphData: [],
        TicketTabIndex: "nav-link active",
        TabNum: 1,
      },
      () => {
        this.handleGetDashboardNumberData();
        this.handleGetDashboardGraphData();
        this.handleGetDashboardSLAData();

        this.ViewSearchData();
      }
    );
  };
  checkIndividualBrand = (event) => {
    // debugger
    var brandcount = 0;
    var checkboxes = document.getElementsByName("allBrand");
    var strBrandIds = "";
    for (var i in checkboxes) {
      if (isNaN(i) === false) {
        if (checkboxes[i].checked === true) {
          if (checkboxes[i].getAttribute("attrIds") !== null) {
            brandcount++;
            document.getElementById("spnBrand").textContent = brandcount;
            strBrandIds += checkboxes[i].getAttribute("attrIds") + ",";
          }
        }
      }
    }
    if (brandcount === 0) {
      document.getElementById("spnBrand").textContent = "select";
    }
    if (checkboxes.length - 1 === brandcount) {
      document.getElementById("spnBrand").textContent = "ALL";
      this.setState({ CheckBoxAllBrand: true });
    } else {
      this.setState({ CheckBoxAllBrand: false });
    }

    this.setState(
      {
        BrandIds: strBrandIds,
        DashboardTaskGraphData: [],
        DashboardClaimGraphData: [],
        DashboardBillGraphData: [],
        DashboardSourceGraphData: [],
        DashboardPriorityGraphData: [],
        DashboardTicketStatusGraphData: [],
        TicketTabIndex: "nav-link active",
        TabNum: 1
      },
      () => {
        this.handleGetDashboardNumberData();
        this.handleGetDashboardGraphData();
        this.handleGetDashboardSLAData();
        this.ViewSearchData();
        this.handleGetAgentList();
      }
    );
  };
  checkAllAgent = async (event) => {
    //debugger
    this.setState((state) => ({ CheckBoxAllAgent: !state.CheckBoxAllAgent }));
    var strAgentIds = "";
    const allCheckboxChecked = event.target.checked;
    var checkboxes = document.getElementsByName("allAgent");
    if (allCheckboxChecked) {
      document.getElementById("spnAgent").textContent = "ALL";
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked === false) {
          checkboxes[i].checked = true;
        }
        if (checkboxes[i].getAttribute("attrIds") !== null)
          strAgentIds += checkboxes[i].getAttribute("attrIds") + ",";

      }
      this.setState({
        TabNum: 1
      });
    } else {
      this.setState({
        TabNum: 1
      });
      document.getElementById("spnAgent").textContent = "select";
      for (var J in checkboxes) {
        if (checkboxes[J].checked === true) {
          checkboxes[J].checked = false;
        }
      }
      strAgentIds = "";
    }
    await this.setState({
      AgentIds: strAgentIds,
    });
    this.handleGetDashboardNumberData();
    this.handleGetDashboardGraphData();
    this.handleGetDashboardSLAData()
    this.ViewSearchData();
  };
  checkAllBrand = async (event) => {
    //debugger
    this.setState((state) => ({ CheckBoxAllBrand: !state.CheckBoxAllBrand }));
    var strBrandIds = "";
    const allCheckboxChecked = event.target.checked;
    var checkboxes = document.getElementsByName("allBrand");
    if (allCheckboxChecked) {
      document.getElementById("spnBrand").textContent = "ALL";
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked === false) {
          checkboxes[i].checked = true;
        }
        if (checkboxes[i].getAttribute("attrIds") !== null)
          strBrandIds += checkboxes[i].getAttribute("attrIds") + ",";
      }
      this.setState({
        TabNum: 1
      });
    } else {
      document.getElementById("spnBrand").textContent = "select";
      for (var J in checkboxes) {
        if (checkboxes[J].checked === true) {
          checkboxes[J].checked = false;
        }
      }
      this.setState({
        TabNum: 1
      });
      strBrandIds = "";
    }
    await this.setState({
      BrandIds: strBrandIds,
    });
    this.handleGetDashboardNumberData();
    this.handleGetDashboardGraphData();
    this.handleGetDashboardSLAData()
    this.ViewSearchData();
    this.handleGetAgentList()
  };
  handleGetAgentList() {
    let self = this;
    axios({
      method: "post",
      // url: config.apiUrl + "/User/GetUserList",
      url: config.apiUrl + "/User/GetUserListByBrand",
      headers: authHeader(),
      params: {
        BrandIDs: self.state.BrandIds
      }

    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            AgentData: data,
            AssignToData: data,
            TeamMemberData: data,
            loadingAbove: false,
          });
          self.checkAllAgentStart();
        } else {
          self.setState({
            AgentData: [],
            AssignToData: [],
            TeamMemberData: [],
            loadingAbove: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
        this.setState({ loadingAbove: false, loadingAboveForGraph: false, loading: false });

      });
  }
  handleGetBrandList() {
    let self = this;
    axios({
      method: "post",
      // url: config.apiUrl + "/Brand/GetBrandList",
      url: config.apiUrl + "/Brand/GetUserWiseBrandList",
      headers: authHeader(),
      params: {
        allbrand: true
      }
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          // self.handleGetAgentList();
          self.setState({ BrandData: data, loadingAbove: false, });
          self.checkAllBrandStart();
          self.handleGetAgentList();
        } else {
          self.setState({ BrandData: [] });
          self.checkAllBrandStart();
        }
      })
      .catch((data) => {
        console.log(data);
        this.setState({ loadingAbove: false, loadingAboveForGraph: false, loading: false });
      });
  }
  handelCheckBoxCheckedChange = async (ticketID) => {
    // var checkboxes = document.getElementsByName("MyTicketListcheckbox[]");
    // var strIds = "";
    // for (var i in checkboxes) {
    //   if (isNaN(i) === false) {
    //     if (checkboxes[i].checked === true) {
    //       if (checkboxes[i].getAttribute("attrIds") !== null)
    //         // strIds += checkboxes[i].getAttribute("attrIds") + ",";
    //         strIds += `${this.state.SearchTicketData[i].ticketID}` + ",";
    //     }
    //   }
    // }

    const newSelected = Object.assign({}, this.state.cSelectedRow);
    newSelected[ticketID] = !this.state.cSelectedRow[ticketID];

    let strIds = this.state.ticketIds;
    let isPresent = strIds.search(ticketID);
    if (isPresent !== -1) {
      strIds = strIds.replace(ticketID + ",", "");
    }

    if (isPresent == -1) {
      strIds += `${ticketID}` + ",";
    }

    document.getElementById("fil-aball").checked = false;

    await this.setState({
      cSelectedRow: ticketID ? newSelected : false,
      ticketIds: strIds,
    });
    // if (this.state.merging) {
    //   this.HandleTicketListModalOpen();
    // }
  };
  handleTicketDetails = (rowInfo, column) => {
    const index = column ? column.index : -1;
    return {
      onClick: (e) => {
        this.selectedRow = index;
        var agentId = column.original["user_ID"];
        this.setState({ agentId, agentSelection: "" });
      },
      style: {
        background: this.selectedRow === index ? "#ECF2F4" : null,
      },
    };
  };
  setAssignedToValue = (e) => {
    let assign = e;
    this.setState({ selectedAssignedTo: assign });
  };

  setScheduleFor = (e) => {
    let scheduleForValue = e.currentTarget.value;
    this.setState({ selectedScheduleFor: scheduleForValue });
  };
  setIssueTypeValue = (e) => {
    let issueTypeValue = e;
    this.setState({ selectedIssueType: issueTypeValue });
  };
  setSlaStatusValue = (e) => {
    let slaStatusValue = e.target.value;
    this.setState({ selectedSlaStatus: slaStatusValue });
  };
  handleVisitStoreCodeAddressAll = (e) => {
    let visitStoreCodeAddressAllValue = e.currentTarget.value;
    this.setState({
      selectedVisitStoreCodeAddressAll: visitStoreCodeAddressAllValue,
    });
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
  applyCallback = async (startDate, endDate) => {
    var startArr = endDate[0].split("-");
    var dummyStart = startArr[0];
    startArr[0] = startArr[1];
    startArr[1] = dummyStart;
    var start = startArr.join("-");
    var endArr = endDate[1].split("-");
    var dummyEnd = endArr[0];
    endArr[0] = endArr[1];
    endArr[1] = dummyEnd;
    var end = endArr.join("-");
    await this.setState({
      start,
      end,
      DashboardTaskGraphData: [],
      DashboardClaimGraphData: [],
      DashboardBillGraphData: [],
      DashboardSourceGraphData: [],
      DashboardPriorityGraphData: [],
      DashboardTicketStatusGraphData: [],
      TicketTabIndex: "nav-link active",
      TabNum: 1
    });
    this.handleGetDashboardNumberData();
    this.handleGetDashboardGraphData();
    this.handleGetDashboardSLAData()
    this.ViewSearchData();
  };
  handleDateRange(date) {
    this.setState({ range: date });
  }
  handleByDateCreate(date) {
    // let newDate = moment(date).format("YYYY-MM-DD");
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
  toggle() {
    this.setState((state) => ({ collapse: !state.collapse }));
  }
  toggleSearch() {
    this.handleGetSaveSearchList();
    this.setState((state) => ({
      collapseSearch: !state.collapseSearch,
      ShowGridCheckBox: false,
    }));
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };

  handleTicketStatusByDate = (e) => {
    let ticketStatusValue = e;
    this.setState({ selectedTicketStatusByDate: ticketStatusValue });
  };
  handleWantToVisitStoreAll = (e) => {
    let wantToVisitStoreAllValue = e.currentTarget.value;
    this.setState({ selectedWantToVisitStoreAll: wantToVisitStoreAllValue });
  };
  handleScheduleTime(e) {
    this.setState({
      selectedScheduleTime: e,
    });
  }
  handleAssignRemark(e) {
    this.setState({
      agentRemark: e.currentTarget.value,
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
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ ChannelOfPurchaseData: data });
        } else {
          self.setState({ ChannelOfPurchaseData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
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
  handleGetDepartmentList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getDepartmentList",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
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
  handleWithTaskAll = (e) => {
    let withTaskAllValue = e.currentTarget.value;
    this.setState({ selectedWithTaskAll: withTaskAllValue });
  };
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
        postsPerPage: 20,
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
        postsPerPage: 20,
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
        postsPerPage: 20,
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
        postsPerPage: 20,
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
        postsPerPage: 20,
      });
    }
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
  setFunctionValue = (e) => {
    let functionValue = e;
    this.setState({ selectedFunction: functionValue });
  };
  handleGetTicketPriorityList() {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/Priority/GetPriorityList",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ TicketPriorityData: data });
        } else {
          self.setState({ TicketPriorityData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleTicketStatusAll = (e) => {
    let ticketStatusAllValue = e;
    this.setState({ selectedTicketStatusAll: ticketStatusAllValue });
  };
  onCloseModal = () => {
    this.setState({ open: false });
  };

  ScheduleOpenModel = () => {
    this.setState({ Schedule: true });
  };

  setDesignationValue = (e) => {
    let designationValue = e.currentTarget.value;
    this.setState({ selectedDesignation: designationValue });
  };
  ScheduleCloseModel = () => {
    this.setState({ Schedule: false });
  };
  handleAssignModalOpen() {
    this.setState({ AssignModal: true });
  }
  handleAssignModalClose() {
    this.setState({ AssignModal: false });
  }
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  StatusOpenModel(data, header) {
    this.setState({
      StatusModel: true,
      sortColumnName: data,
      sortHeader: header,
    });
  }
  StatusCloseModel() {
    // this.setState({
    //   sortFilterTicketData: this.state.sortTicketData,
    //   sortFilterCategoryData: this.state.sortCategoryData,
    //   sortFilterPriorityData: this.state.sortPriorityData,
    //   sortFiltercreatedOnData: this.state.sortcreatedOnData,
    //   sortFilterAssigneeData: this.state.sortAssigneeData,
    // });

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
    } else {
      var tempSearchTicketData = this.state.sortAllData;
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
        tempFinalSearchTicketData = [];
      }
    }
    this.handleGetUniqueValues(tempSearchTicketData);
    // //debugger
    this.setState({
      StatusModel: false,
      // filterTxtValue: "",
      sFilterCheckbox: "",
      isRed: false,
      isWhite: false,
      isYellow: false,
      isGreen: false,
      SearchTicketData:
        tempColor.length > 0 ? tempFinalSearchTicketData : tempSearchTicketData,
      // SearchTicketData: tempFinalSearchTicketData,
    });
  }
  HandleChangeRedict() {
    this.props.history.push("/admin/chatdashboard");
  }
  handlechangebtntab(e) {
    // var idIndex = e.target.className;
    this.setState({
      TabNum: e
    });
    if (e === 2) {
      this.handleTicketSourceGraphData()

    }
    else if (e === 3) {
      this.handleGetDashboardSLAData()

    }
    else if (e === 4) {
      this.handleGetDashboardFeedbackCountData()
    }
    else if (e === 5) {
      this.handleGetDashboardStatusCount()
    }
    //console.log(e.target.href);
  }
  handleGetBillGraphData = () => {
    let self = this;
    var fromdate = moment(new Date(this.state.start)).format("YYYY-MM-DD");
    var todate = moment(new Date(this.state.end)).format("YYYY-MM-DD");
    axios({
      method: 'GET',
      url: config.apiUrl + "/DashBoard/GetDashBoardTicketToBillGraphData",
      headers: authHeader(),
      params: {
        BrandID: self.state.BrandIds,
        UserIds: self.state.AgentIds,
        fromdate: fromdate,
        todate: todate,
      }
    })
      .then(function (res) {
        // debugger
        if (res.data.statusCode === 200) {
          self.setState({
            DashboardBillGraphData: res.data.responseData,
            ticketToBillBarFlag: false,
          });
        }
        else {
          self.setState({
            ticketToBillBarFlag: true,
          });
        }
      })
      .catch(() => {
        self.setState({
          ticketToBillBarFlag: true,
        })
      })
  }
  handleTicketSourceGraphData = () => {
    let self = this;
    var fromdate = moment(new Date(this.state.start)).format("YYYY-MM-DD");
    var todate = moment(new Date(this.state.end)).format("YYYY-MM-DD");
    axios({
      method: 'GET',
      url: config.apiUrl + "/DashBoard/GetDashBoardTicketSourceGraphData",
      headers: authHeader(),
      params: {
        BrandID: self.state.BrandIds,
        UserIds: self.state.AgentIds,
        fromdate: fromdate,
        todate: todate,
      }
    })
      .then(function (res) {
        if (res.data.statusCode === 200) {
          console.log(res.data.responseData, "res.data.responseData");
          self.setState({
            DashboardSourceGraphData: res.data.responseData,
            ticketGenerationSourceFlag: false,
          }, () => { console.log(self.state.DashboardSourceGraphData) });
        }
        else {
          self.setState({
            ticketGenerationSourceFlag: true,
          });
        }
      })
      .catch(() => {
        self.setState({
          ticketGenerationSourceFlag: true,
        })
      })
  }

  onChange = (date) => this.setState({ date });
  // handleMetric = () => {
  //   let self = this;
  //   // var fromdate = moment(new Date(this.state.start)).format("YYYY-MM-DD");
  //   // var todate = moment(new Date(this.state.end)).format("YYYY-MM-DD");
  //   axios({
  //     method: 'GET',
  //     url: config.apiUrl + "/DashBoard/GetDashBoardTicketSourceGraphData",
  //     headers: authHeader(),

  //   })
  //     .then(function (res) {
  //       // if (res.data.statusCode === 200) {
  //       //  
  //       // }
  //       // else {
  //       // 
  //       // }
  //     })
  //     .catch(() => {
  //       self.setState({
  //         ticketGenerationSourceFlag: true,
  //       })
  //     })
  // }

  checkAllCheckbox = async (event) => {
    var obj = this.state.cSelectedRow;
    var strIds = "";
    const allCheckboxChecked = event.target.checked;
    var checkboxes = document.getElementsByName("MyTicketListcheckbox[]");
    if (allCheckboxChecked) {
      // for (var i in checkboxes) {
      //   if (checkboxes[i].checked === false) {
      //     checkboxes[i].checked = true;
      //     if (checkboxes[i].getAttribute("attrIds") !== null)
      // strIds += checkboxes[i].getAttribute("attrIds") + ",";
      for (let i = 0; i < this.state.SearchTicketData.length; i++) {
        strIds += `${this.state.SearchTicketData[i].ticketID}` + ",";
        obj[this.state.SearchTicketData[i].ticketID] = true;
      }
      //   }
      // }
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
  handleMouseHover() {
    this.setState({ TotalNoOfChatShow: true });
  }
  handleMouseLeave() {
    this.setState({ TotalNoOfChatShow: false });
  }
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
  handleDaysForMonth(e) {
    this.setState({
      selectedNoOfDaysForMonth: e.currentTarget.value,
    });
  }

  handleWeekly(e) {
    this.setState({
      selectedNoOfWeek: e.currentTarget.value,
    });
  }

  setPriorityValue = (e) => {
    let priorityValue = e;
    this.setState({ selectedPriority: priorityValue });
  };
  setPriorityAllValue = (e) => {
    let priorityAllValue = e;
    this.setState({ selectedPriorityAll: priorityAllValue });
  };
  handleDailyDay(e) {
    this.setState({
      selectedNoOfDay: e.currentTarget.value,
    });
  }
  setClaimCategoryValue = (e) => {
    let claimCategoryValue = e;
    this.setState({ selectedClaimCategory: claimCategoryValue });
    setTimeout(() => {
      if (this.state.selectedClaimCategory) {
        // this.handleGetClaimSubCategoryList();
        this.handleGetSubCategoryList("allClaimTab");
      }
    }, 1);
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
  setChannelOfPurchaseValue = (e) => {
    this.setState({ selectedChannelOfPurchase: e });
  };
  setTicketActionTypeValue = (e) => {
    this.setState({ selectedTicketActionType: e });
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
  setSubCategoryAllValue = (e) => {
    let subCategoryAllValue = e;
    this.setState({ selectedSubCategoryAll: subCategoryAllValue });

    setTimeout(() => {
      if (this.state.selectedSubCategoryAll) {
        this.handleGetIssueTypeList("allTab");
      }
    }, 1);
  };
  setClaimSubCategoryValue = (e) => {
    let claimSubCategoryValue = e;
    this.setState({ selectedClaimSubCategory: claimSubCategoryValue });

    setTimeout(() => {
      if (this.state.selectedClaimSubCategory) {
        this.handleGetIssueTypeList("allClaimTab");
        // this.handleGetClaimIssueTypeList();
      }
    }, 1);
  };
  setTicketSourceValue = (e) => {
    let ticketSourceValue = e;
    this.setState({ selectedTicketSource: ticketSourceValue });
  };

  handleVisitStoreAll = (e) => {
    let visitStoreAllValue = e.currentTarget.value;
    this.setState({ selectedVisitStoreAll: visitStoreAllValue });
  };
  handleGetDesignationList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Designation/GetDesignationList",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
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
  handleSchedulePopup() {
    // //debugger
    const TranslationContext = this.state.translateLanguage.default;
    if (
      this.state.selectScheduleDate === 0 ||
      this.state.selectScheduleDate === "100"
    ) {
      this.setState({
        scheduleRequired:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.allfieldsarerequired
            : "All fields are required.",
      });
    } else if (this.state.selectScheduleDate === "230") {
      if (
        this.state.selectedTeamMember.length === 0 ||
        this.state.selectedScheduleTime === "" ||
        this.state.selectedNoOfDay === 0
      ) {
        this.setState({
          scheduleRequired:
            TranslationContext !== undefined
              ? TranslationContext.ticketingDashboard.allfieldsarerequired
              : "All fields are required.",
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
          scheduleRequired:
            TranslationContext !== undefined
              ? TranslationContext.ticketingDashboard.allfieldsarerequired
              : "All fields are required.",
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
          scheduleRequired:
            TranslationContext !== undefined
              ? TranslationContext.ticketingDashboard.allfieldsarerequired
              : "All fields are required.",
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
          scheduleRequired:
            TranslationContext !== undefined
              ? TranslationContext.ticketingDashboard.allfieldsarerequired
              : "All fields are required.",
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
          scheduleRequired:
            TranslationContext !== undefined
              ? TranslationContext.ticketingDashboard.allfieldsarerequired
              : "All fields are required.",
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
          scheduleRequired:
            TranslationContext !== undefined
              ? TranslationContext.ticketingDashboard.allfieldsarerequired
              : "All fields are required.",
        });
      } else {
        this.handleSchedulePopupSuccess();
      }
    }
  }
  handleSchedulePopupSuccess() {
    // //debugger
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    var month, day, year, hours, minutes, seconds;
    var date = new Date(this.state.selectedScheduleTime),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    hours = ("0" + date.getHours()).slice(-2);
    minutes = ("0" + date.getMinutes()).slice(-2);
    seconds = ("0" + date.getSeconds()).slice(-2);

    var mySQLDate = [date.getFullYear(), month, day].join("-");
    var mySQLTime = [hours, minutes, seconds].join(":");
    let selectedScheduleTime = [mySQLDate, mySQLTime].join(" ");

    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/Schedule",
      headers: authHeader(),
      data: {
        SearchInputParams: this.state.FinalSaveSearchData,
        ScheduleFor: this.state.selectedTeamMemberCommaSeperated,
        ScheduleType: this.state.selectScheduleDate,
        NoOfDay: this.state.selectedNoOfDay,
        ScheduleTime: selectedScheduleTime,
        IsDaily: Boolean(this.state.IsDaily),
        IsWeekly: Boolean(this.state.IsWeekly),
        NoOfWeek: this.state.selectedNoOfWeek,
        DayIds: this.state.selectedWeeklyDays,
        IsDailyForMonth: Boolean(this.state.IsDailyForMonth),
        NoOfDaysForMonth: this.state.selectedNoOfDaysForMonth,
        NoOfMonthForMonth: this.state.selectedNoOfMonthForMonth,
        IsWeeklyForMonth: Boolean(this.state.IsWeeklyForMonth),
        NoOfMonthForWeek: this.state.selectedNoOfMonthForWeek,
        NoOfWeekForWeek: this.state.selectedNoOfWeekForWeek,
        NameOfDayForWeek: this.state.selectedNameOfDayForWeekCommaSeperated,
        IsDailyForYear: Boolean(this.state.IsDailyForYear),
        NoOfDayForDailyYear: this.state.selectedNoOfDayForDailyYear,
        NameOfMonthForDailyYear: this.state
          .selectedNameOfMonthForYearCommaSeperated,
        IsWeeklyForYear: Boolean(this.state.IsWeeklyForYear),
        NoOfWeekForYear: this.state.selectedNoOfWeekForYear,
        NameOfDayForYear: this.state.selectedNameOfDayForYearCommaSeperated,
        NameOfMonthForYear: this.state
          .selectedNameOfMonthForDailyYearCommaSeperated,
      },
    })
      .then(function (res) {
        let messageData = res.data.message;
        if (messageData === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.scheduledsuccessfully
              : "Scheduled successfully."
          );
          self.ScheduleCloseModel();
          self.setState({
            selectedTeamMember: [],
            scheduleRequired: "",
            selectedTeamMemberCommaSeperated: "",
            FinalSaveSearchData: "",
            selectedTeamMemberCommaSeperated: "",
            selectScheduleDate: 0,
            selectedNoOfDay: 0,
            selectedScheduleTime: "",
            IsDaily: 0,
            IsWeekly: 0,
            selectedNoOfWeek: 0,
            selectedWeeklyDays: 0,
            IsDailyForMonth: 0,
            selectedNoOfDaysForMonth: 0,
            selectedNoOfMonthForMonth: 0,
            IsWeeklyForMonth: 0,
            selectedNoOfMonthForWeek: 0,
            selectedNoOfWeekForWeek: 0,
            selectedNameOfDayForWeekCommaSeperated: 0,
            IsDailyForYear: 0,
            selectedNoOfDayForDailyYear: 0,
            selectedNameOfMonthForYearCommaSeperated: "",
            IsWeeklyForYear: 0,
            selectedNoOfWeekForYear: 0,
            selectedNameOfDayForYearCommaSeperated: "",
            selectedNameOfMonthForDailyYearCommaSeperated: "",

          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleWeekForYear(e) {
    this.setState({
      selectedNoOfWeekForYear: e.currentTarget.value,
    });
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
  setTeamMember = (e) => {
    if (e !== null) {
      var selectedTeamMemberCommaSeperated = Array.prototype.map
        .call(e, (s) => s.userID)
        .toString();
    }
    this.setState({ selectedTeamMember: e, selectedTeamMemberCommaSeperated });
  };
  handleWeekForWeek(e) {
    this.setState({
      selectedNoOfWeekForWeek: e.currentTarget.value,
    });
  }
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
  handleMonthForWeek(e) {
    this.setState({
      selectedNoOfMonthForWeek: e.currentTarget.value,
    });
  }
  handleDayForYear(e) {
    this.setState({
      selectedNoOfDayForDailyYear: e.currentTarget.value,
    });
  }
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
  handleAssignTickets() {
    const TranslationContext = this.state.translateLanguage.default;

    if (this.state.agentId !== 0) {
      let self = this;
      var ticketIdsComma = this.state.ticketIds;
      var ticketIds = ticketIdsComma.substring(0, ticketIdsComma.length - 1);
      self.setState({
        loading: true,
      });
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
            // self.handleSearchTicketEscalation();
            self.ViewSearchData();
            self.removeSelectedTickets();
            self.setState({
              loading: false,
            });
          } else {
            self.handleAssignModalClose();
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.ticketsassignedsuccessfully
                : "Error in assigning tickets."
            );
            self.setState({
              loading: false,
            });
          }
        })
        .catch((data) => {
          console.log(data);
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.ticketsassignedsuccessfully
              : "Error in assigning tickets."
          );
          self.setState({
            loading: false,
          });
        });
    } else {
      this.setState({
        agentSelection:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.agentselectionisrequired
            : "Agent Selection is required.",
      });
    }
  }
  handleGetSlaStatusList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/SLA/GetSLAStatusList",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            SlaStatusData: data,
          });
        } else {
          self.setState({
            SlaStatusData: [],
          });
        }
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
        let status = res.data.message;
        let data = res.data.responseData;
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
    // self.setState({
    //   IssueTypeData: [],
    //   IssueTypeAllData: [],
    //   selectedIssueType: 0,
    //   selectedIssueTypeAll: 0
    // });
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
    // let subCateId =
    //   this.state.byCategoryFlag === 4
    //     ? this.state.selectedSubCategory
    //     : this.state.selectedSubCategoryAll;
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
        // if (self.state.byCategoryFlag === 4) {
        //   var IssueTypeData = res.data.responseData;
        //   self.setState({
        //     IssueTypeData: IssueTypeData
        //   });
        // } else if (self.state.allFlag === 5) {
        //   var IssueTypeAllData = res.data.responseData;
        //   self.setState({
        //     IssueTypeAllData: IssueTypeAllData
        //   });
        // }
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
            // CategoryDataAll: CategoryDataAll
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
        let ClaimSubCategoryData = res.data.responseData;
        self.setState({
          ClaimSubCategoryData: ClaimSubCategoryData,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetSubCategoryList(param) {
    let self = this;
    // self.setState({
    //   SubCategoryData: [],
    //   SubCategoryAllData: [],
    //   selectedSubCategory: 0,
    //   selectedSubCategoryAll: 0,
    //   IssueTypeData: [],
    //   IssueTypeAllData: [],
    //   selectedIssueType: 0,
    //   selectedIssueTypeAll: 0
    // });
    if (param == "categoryTab") {
      this.setState({
        SubCategoryData: [],
        IssueTypeData: [],
        selectedSubCategory: 0,
        selectedIssueType: 0,
      });
    } else if (param == "allTab") {
      this.setState({
        SubCategoryAllData: [],
        IssueTypeAllData: [],
        selectedSubCategoryAll: 0,
        selectedIssueTypeAll: 0,
      });
    } else if (param == "allClaimTab") {
      this.setState({
        ClaimSubCategoryData: [],
        selectedClaimSubCategory: 0,
        ClaimIssueTypeData: [],
        selectedClaimIssueType: 0,
      });
    }
    // let cateId =
    //   this.state.byCategoryFlag === 4
    //     ? this.state.selectedCategory
    //     : this.state.selectedCategoryAll;
    let cateId;
    if (param === "categoryTab") {
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
        // if (self.state.byCategoryFlag === 4) {
        //   var SubCategoryData = res.data.responseData;
        //   self.setState({
        //     SubCategoryData: SubCategoryData
        //   });
        // } else if (self.state.allFlag === 5) {
        //   var SubCategoryAllData = res.data.responseData;
        //   self.setState({
        //     SubCategoryAllData: SubCategoryAllData
        //   });
        // }
        if (param === "categoryTab") {
          var SubCategoryData = res.data.responseData;
          self.setState({
            SubCategoryData: SubCategoryData,
          });
        } else if (param === "allTab") {
          var SubCategoryAllData = res.data.responseData;
          self.setState({
            SubCategoryAllData: SubCategoryAllData,
          });
        } else if (param === "allClaimTab") {
          var ClaimSubCategoryData = res.data.responseData;
          self.setState({
            ClaimSubCategoryData: ClaimSubCategoryData,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  clearSearch() {
    if (this.state.byDateFlag === 1) {
      this.setState(
        {
          ByDateCreatDate: "",
          ByDateSelectDate: "",
          selectedSlaDueByDate: "0",
          selectedTicketStatusByDate: 0,
          resultCount: 0,
        },
        () => {
          // this.handleSearchTicketEscalation();
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
          // this.handleSearchTicketEscalation();
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
          // this.handleSearchTicketEscalation();
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
          // this.handleSearchTicketEscalation();
          this.ViewSearchData(1);
          // this.handleGetSubCategoryList();
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
          resultCount: 0,
          SubCategoryAllData: [],
          IssueTypeAllData: [],
          ClaimSubCategoryData: [],
          ClaimIssueTypeData: [],
          selectedescalationmanagement: "",
          selectedCsatAll: "",
        },
        () => {
          // this.handleSearchTicketEscalation();
          this.ViewSearchData(1);
          // this.handleGetSubCategoryList();
          // this.handleGetClaimSubCategoryList();
        }
      );
    }
    localStorage.removeItem("DashboardDateTypeFilter");
    localStorage.removeItem("DashboardCustomerTypeFilter");
    localStorage.removeItem("DashboardTicketTypeFilter");
    localStorage.removeItem("DashboardCategoryTypeFilter");
    localStorage.removeItem("DashboardAllTypeFilter");
  }

  ViewSearchData(Shwcheck, search) {
    // //debugger
    let self = this;
    this.setState({ loading: true });

    this.setState({
      sortFilterTicketData: [],
      sortFilterCategoryData: [],
      sortFilterPriorityData: [],
      sortFilterAssigneeData: [],
      sortFiltercreatedOnData: [],
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

      if (Shwcheck === 1) {
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
              "DashboardDateTypeFilter",
              JSON.stringify(dateTypeFilter)
            );

            localStorage.removeItem("DashboardCustomerTypeFilter");
            localStorage.removeItem("DashboardTicketTypeFilter");
            localStorage.removeItem("DashboardCategoryTypeFilter");
            localStorage.removeItem("DashboardAllTypeFilter");
          }
        }
      }
    } else {
      dateTab = null;
    }

    // --------------------By Customer Type Tab---------------
    var customerType = {};
    if (this.state.ActiveTabId === 2) {
      let ticketStatusIDs = "";
      customerType["CustomerMobileNo"] = this.state.MobileNoByCustType.trim();
      customerType["CustomerEmailID"] = this.state.EmailIdByCustType.trim();
      customerType["TicketID"] = parseInt(this.state.TicketIdByCustType.trim());

      customerType["CustomerName"] = this.state.NameByCustType.trim();
      if (this.state.selectedTicketStatusByCustomer != null) {
        for (
          let i = 0;
          i < this.state.selectedTicketStatusByCustomer.length;
          i++
        ) {
          ticketStatusIDs +=
            this.state.selectedTicketStatusByCustomer[i].ticketStatusID + ",";
        }
      }

      customerType["TicketStatusID"] = ticketStatusIDs;

      if (Shwcheck === 1) {
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
              "DashboardCustomerTypeFilter",
              JSON.stringify(customerTypeFilter)
            );

            localStorage.removeItem("DashboardDateTypeFilter");
            localStorage.removeItem("DashboardTicketTypeFilter");
            localStorage.removeItem("DashboardCategoryTypeFilter");
            localStorage.removeItem("DashboardAllTypeFilter");
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

      if (Shwcheck === 1) {
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
              "DashboardTicketTypeFilter",
              JSON.stringify(ticketTypeFilter)
            );

            localStorage.removeItem("DashboardDateTypeFilter");
            localStorage.removeItem("DashboardCustomerTypeFilter");
            localStorage.removeItem("DashboardCategoryTypeFilter");
            localStorage.removeItem("DashboardAllTypeFilter");
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

      if (Shwcheck === 1) {
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
              "DashboardCategoryTypeFilter",
              JSON.stringify(categoryTypeFilter)
            );

            localStorage.removeItem("DashboardDateTypeFilter");
            localStorage.removeItem("DashboardCustomerTypeFilter");
            localStorage.removeItem("DashboardTicketTypeFilter");
            localStorage.removeItem("DashboardAllTypeFilter");
          }
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

      // --------------------Check null date----------------------------------
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
      // --------------------Check null date----------------------------------
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
      let assignToIds = "";
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
          assignToIds += this.state.selectedAssignedTo[i].userID + ",";
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
      allTab["OrderItemId"] = this.state.ItemIdByAll.trim() === "" ? 0 : this.state.ItemIdByAll.trim();
      allTab["IsVisitStore"] = this.state.selectedVisitStoreAll;
      allTab["IsWantVistingStore"] = this.state.selectedWantToVisitStoreAll;
      allTab["CustomerEmailID"] = this.state.EmailByAll.trim();
      allTab["CustomerMobileNo"] = this.state.MobileByAll.trim();
      allTab["AssignTo"] = assignToIds;
      allTab[
        "StoreCodeORAddress"
      ] = this.state.selectedPurchaseStoreCodeAddressAll.trim();
      allTab[
        "WantToStoreCodeORAddress"
      ] = this.state.selectedVisitStoreCodeAddressAll.trim();
      allTab["HaveClaim"] = withClaim;
      allTab["ClaimStatusId"] = claimStatusIds;
      allTab["ClaimCategoryId"] = claimCategoryIds;
      allTab["ClaimSubCategoryId"] = claimSubCategoryIds;
      allTab["ClaimIssueTypeId"] = claimIssueTypeIds;
      allTab["HaveTask"] = withTask;
      allTab["TaskStatusId"] = taskStatusIds;
      allTab["TaskDepartment_Id"] = taskDepartmentIds;
      allTab["TaskFunction_Id"] = taskFunctionIds;
      allTab["isEscalationManagement"] = this.state.selectedescalationmanagement === "Yes" ? true : this.state.selectedescalationmanagement === "No" ? false : null || null
      allTab["CheckCSATScore"] = this.state.selectedCsatAll.toString();

      if (Shwcheck === 1) {
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
            CheckCSATScore: this.state.selectedCsatAll
          };

          const isEmpty = Object.values(allTypeFilter).every(
            (x) => x === null || x === "" || x === 0 || !x.length
          );

          if (!isEmpty) {
            localStorage.setItem(
              "DashboardAllTypeFilter",
              JSON.stringify(allTypeFilter)
            );

            localStorage.removeItem("DashboardDateTypeFilter");
            localStorage.removeItem("DashboardCustomerTypeFilter");
            localStorage.removeItem("DashboardTicketTypeFilter");
            localStorage.removeItem("DashboardCategoryTypeFilter");
          }
        }
      }
    } else {
      allTab = null;
    }

    // ----------------------SetState variable in Json Format for Apply Search------------------------------------
    var ShowDataparam = {};

    ShowDataparam.AssigntoId = this.state.AgentIds;
    ShowDataparam.BrandId = this.state.BrandIds;
    ShowDataparam.ActiveTabId = this.state.ActiveTabId;
    ShowDataparam.searchDataByDate = dateTab;
    ShowDataparam.searchDataByCustomerType = customerType;
    ShowDataparam.searchDataByTicketType = ticketType;
    ShowDataparam.searchDataByCategoryType = categoryType;
    ShowDataparam.searchDataByAll = allTab;

    var FinalSaveSearchData = JSON.stringify(ShowDataparam);
    this.setState({
      FinalSaveSearchData,
    });

    let tableFilterData = this.props.location.tableFilterData
      ? this.props.location.tableFilterData
      : [];

    // ----------------------------------------------------------
    var fromdate = moment(this.state.start).format("YYYY-MM-DD");
    var todate = moment(this.state.end).format("YYYY-MM-DD");
    axios({
      method: "post",
      url: config.apiUrl + "/DashBoard/DashBoardSearchTicket",
      headers: authHeader(),
      data: {
        AssigntoId: this.state.AgentIds,
        BrandId: this.state.BrandIds,
        ActiveTabId: this.state.ActiveTabId,
        searchDataByDate: dateTab,
        searchDataByCustomerType: customerType,
        searchDataByTicketType: ticketType,
        searchDataByCategoryType: categoryType,
        searchDataByAll: allTab,
        StartDate: fromdate,
        EndDate: todate,
        pageNumber: this.state.currentPage,
        pageSize: this.state.postsPerPage
      },
    })
      .then(function (res) {
        let status = res.data.message;

        let data = res?.data?.responseData;
        let totalpage = res?.data?.totalPage
        let valuee = data[0]?.total
        // console.log("totalpage", valuee)
        // console.log("totalpage", data)



        let CSVData = data;
        let count = 0;
        if (data !== null) {
          if (res?.data?.responseData != null) {
            count = res.data.responseData?.length;
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

            // //debugger
            for (let i = 0; i < distinct.length; i++) {
              self.state.sortTicketData.push({ ticketStatus: distinct[i] });
              self.state.sortFilterTicketData.push({
                ticketStatus: distinct[i],
              });
            }
            // self.state.sticketStatusFilterCheckbox = distinct + "," ;

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
            // self.state.scategoryFilterCheckbox = distinct + "," ;

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
            // self.state.spriorityFilterCheckbox = distinct + "," ;

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
            // self.state.screatedOnFilterCheckbox = distinct + "," ;

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
            // self.state.sassignedToFilterCheckbox = distinct + "," ;
          }
        }

        if (status === "Success") {
          if (Shwcheck === 1) {
            self.setState({
              ShowGridCheckBox: true,
            });
          }
          self.setState({
            SearchTicketData:
              tableFilterData.length > 0 ? tableFilterData : data,
            resultCount: count,
            tabletotalPages: totalpage,
            newresultCount: valuee,

            loading: false,
          });
          // else {
          //   self.setState({
          //     SearchTicketData: [],
          //     resultCount: 0,
          //     ShowGridCheckBox: false,
          //     loading: false
          //   });
          // }

          for (let i = 0; i < CSVData.length; i++) {
            delete CSVData[i].totalpages;
            // delete CSVData[i].responseTimeRemainingBy;
            // delete CSVData[i].responseOverdueBy;
            // delete CSVData[i].resolutionOverdueBy;
            // delete CSVData[i].ticketCommentCount;
          }
          self.setState({ CSVDownload: CSVData });
        } else if (status === "Record Not Found") {
          self.setState({
            SearchTicketData: [],

            resultCount: 0,
            newresultCount: 0,
            tabletotalPages: 0,
            loading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  SaveSearchData() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
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
          url: config.apiUrl + "/DashBoard/DashBoardSaveSearch",
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
          };
          // console.log(JSON.stringify(appliedTableFilters));
          // console.log((appliedTableFilters).toString());
          //debugger
          let ticketDetail = {
            ticketDetailID: Id,
            sourceName: ticketSourceType,
            screenName: 'dashboard',
            appliedTableFilters: appliedTableFilters,
            tableFilterData: self.state.tempSearchTicketData
          }
          setTimeout(function () {
            // if (window.localStorage.getItem('Programcode') === 'campusshoes') {
            if (window.localStorage.getItem('isTicketInNewTab') === "true") {
              window.open('./myticket?ticketDetailID=' + Id + '&sourceName=' + ticketSourceType
                + '&screenName=dashboard' + '&appliedTableFilters=' + JSON.stringify(appliedTableFilters)
                + '&tableFilterData=' + self.state.tempSearchTicketData)
            }
            else {
              self.props.history.push({
                pathname: "myticket",
                ticketDetailID: Id,
                sourceName: ticketSourceType,
                screenName: "dashboard",
                appliedTableFilters,
                tableFilterData: self.state.tempSearchTicketData,
              });
            }
          }, 100);
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

  handleGetSaveSearchList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/DashBoard/GetDashBoardSavedSearch",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ SearchListData: data });
        } else {
          self.setState({ SearchListData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleSearchTicketEscalation() {
    //this.setState({ loading: true });
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Search/SearchTicket",
      headers: authHeader(),
      data: {
        isByStatus: this.state.isByStatus,
        pageSize: this.state.advPageSize,
        pageNo: this.state.advPageNo,
        isEscalation: 1,
        // ticketStatus: ticketStatus
      },
    })
      .then(function (res) {
        let data = res.data.responseData;
        let Status = res.data.message;
        let CSVData = data;
        let count = 0;
        if (res.data.responseData != null) {
          count = res.data.responseData.length;
        }
        if (Status === "Record Not Found") {
          self.setState({
            SearchTicketData: [],
            loading: false,
            resultCount: 0,
          });
        } else if (data !== null) {
          self.setState({
            SearchTicketData: data,
            sortTicketData: data,
            loading: false,
            resultCount: count,
          });
          for (let i = 0; i < CSVData.length; i++) {
            delete CSVData[i].totalpages;
            delete CSVData[i].responseTimeRemainingBy;
            delete CSVData[i].responseOverdueBy;
            delete CSVData[i].resolutionOverdueBy;
            // delete CSVData[i].ticketCommentCount;
          }
          self.setState({ CSVDownload: CSVData });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handlePurchaseStoreCodeAddressAll = (e) => {
    let purchaseStoreCodeAddressAllValue = e.currentTarget.value;
    this.setState({
      selectedPurchaseStoreCodeAddressAll: purchaseStoreCodeAddressAllValue,
    });
  };
  handleClaimStatus = (e) => {
    let claimStatusValue = e;
    this.setState({ selectedClaimStatus: claimStatusValue });
  };
  handleTaskStatus = (e) => {
    let taskStatusValue = e;
    this.setState({ selectedTaskStatus: taskStatusValue });
  };
  handleAssignedToAll = (e) => {
    let assignedToAllValue = e.currentTarget.value;
    this.setState({ selectedAssignedToAll: assignedToAllValue });
  };
  handleWithClaimAll = (e) => {
    let withClaimAllValue = e.currentTarget.value;
    this.setState({ selectedWithClaimAll: withClaimAllValue });
  };
  hadleSearchDeleteData(searchDeletId) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/DashBoard/DeleteDashBoardSavedSearch",
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
  handleSlaDueByDate = (e) => {
    let slaDueValue = e.target.value;
    this.setState({ selectedSlaDueByDate: slaDueValue.toString() });
  };
  handleMonthForMonth(e) {
    this.setState({
      selectedNoOfMonthForMonth: e.currentTarget.value,
    });
  }
  setClaimIssueTypeValue = (e) => {
    let claimIssueTypeValue = e;
    this.setState({ selectedClaimIssueType: claimIssueTypeValue });
  };
  setIssueTypeAllValue = (e) => {
    let issueTypeAllValue = e;
    this.setState({ selectedIssueTypeAll: issueTypeAllValue });
  };
  setCSATAllValue = (e) => {
    let csatAllValue = e.target.value;
    this.setState({ selectedCsatAll: csatAllValue });
  };
  handleApplySearch(paramsID) {
    let self = this;
    //this.setState({ loading: true });
    self.onCloseModal();
    axios({
      method: "post",
      url: config.apiUrl + "/DashBoard/GetDashBoardTicketsOnSavedSearch",
      headers: authHeader(),
      params: {
        SearchParamID: paramsID,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData.dashboardTicketList;
        let count = 0;
        if (res.data.responseData.dashboardTicketList != null) {
          count = res.data.responseData.dashboardTicketList.length;
        }
        if (status === "Success") {
          let dataSearch = JSON.parse(res.data.responseData.dbsearchParams);
          self.setState({
            SearchTicketData: data,
            resultCount: count,
            loading: false,
          });
          // self.onCloseModal();

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

          if (dataSearch.searchDataByDate === null) {
            self.setState({
              ByDateCreatDate: "",
              ByDateSelectDate: "",
              selectedSlaDueByDate: "0",
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
                  element ===
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
            // self.setState({
            //   selectedCategory: dataSearch.searchDataByCategoryType.CategoryId,
            //   selectedSubCategory: dataSearch.searchDataByCategoryType.SubCategoryId,
            //   selectedIssueType: dataSearch.searchDataByCategoryType.IssueTypeId,
            //   selectedTicketStatusByCategory: dataSearch.searchDataByCategoryType.TicketStatusID
            // });
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

          if (dataSearch.searchDataByAll === null) {
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
              selectedCsatAll: ""
            });
          } else {
            if (dataSearch.searchDataByAll.CreatedDate !== "") {
              let createdDate = dataSearch.searchDataByAll.CreatedDate;
              let createdDateArray = createdDate.split("-");
              var createdDateFinal = new Date(
                createdDateArray[0],
                createdDateArray[1] - 1,
                createdDateArray[2]
              );
            }
            if (dataSearch.searchDataByAll.ModifiedDate !== "") {
              let modifiedDate = dataSearch.searchDataByAll.ModifiedDate;
              let modifiedDateArray = modifiedDate.split("-");
              var modifiedDateFinal = new Date(
                modifiedDateArray[0],
                modifiedDateArray[1] - 1,
                modifiedDateArray[2]
              );
            }
            self.setState({
              ByAllCreateDate: createdDateFinal,
              selectedTicketSource:
                dataSearch.searchDataByAll.TicketSourceTypeID,
              ClaimIdByAll: dataSearch.searchDataByAll.ClaimId,
              EmailByAll: dataSearch.searchDataByAll.CustomerEmailID,
              ByAllLastDate: modifiedDateFinal,
              TicketIdTitleByAll: dataSearch.searchDataByAll.TicketIdORTitle,
              InvoiceSubOrderByAll:
                dataSearch.searchDataByAll.InvoiceNumberORSubOrderNo,
              MobileByAll: dataSearch.searchDataByAll.CustomerMobileNo,
              // selectedCategoryAll: dataSearch.searchDataByAll.CategoryId,
              selectedPriorityAll: dataSearch.searchDataByAll.PriorityId,
              ItemIdByAll: dataSearch.searchDataByAll.OrderItemId,
              selectedAssignedTo: dataSearch.searchDataByAll.AssignTo,
              // selectedSubCategoryAll: dataSearch.searchDataByAll.SubCategoryId,
              selectedTicketStatusAll:
                dataSearch.searchDataByAll.TicketSatutsID,
              selectedVisitStoreAll: dataSearch.searchDataByAll.IsVisitStore,
              selectedPurchaseStoreCodeAddressAll:
                dataSearch.searchDataByAll.StoreCodeORAddress,
              // selectedIssueTypeAll: dataSearch.searchDataByAll.IssueTypeId,
              selectedSlaStatus: dataSearch.searchDataByAll.SLAStatus,
              selectedWantToVisitStoreAll:
                dataSearch.searchDataByAll.IsWantVistingStore,
              selectedVisitStoreCodeAddressAll:
                dataSearch.searchDataByAll.WantToStoreCodeORAddress,
              selectedWithClaimAll:
                dataSearch.searchDataByAll.HaveClaim === 0 ? "no" : "yes",
              selectedClaimStatus: dataSearch.searchDataByAll.ClaimStatusId,
              // selectedClaimCategory: dataSearch.searchDataByAll.ClaimCategoryId,
              // selectedClaimSubCategory:
              //   dataSearch.searchDataByAll.ClaimSubCategoryId,
              // selectedClaimIssueType: dataSearch.searchDataByAll.ClaimIssueTypeId,
              selectedWithTaskAll:
                dataSearch.searchDataByAll.HaveTask === 0 ? "no" : "yes",
              selectedTaskStatus: dataSearch.searchDataByAll.TaskStatusId,
              // selectedDepartment: dataSearch.searchDataByAll.TaskDepartment_Id,
              // selectedFunction: dataSearch.searchDataByAll.TaskFunction_Id
              selectedCsatAll: dataSearch.searchDataByAll.CheckCSATScore,
            });
            self.setState(
              {
                selectedCategoryAll: dataSearch.searchDataByAll.CategoryId,
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
                  dataSearch.searchDataByAll.SubCategoryId,
              },
              () => {
                self.handleGetIssueTypeList("allTab");
              }
            );
            self.setState({
              selectedIssueTypeAll: dataSearch.searchDataByAll.IssueTypeId,
            });
            self.setState(
              {
                selectedDepartment:
                  dataSearch.searchDataByAll.TaskDepartment_Id,
              },
              () => {
                self.handleGetFunctionList();
              }
            );
            self.setState({
              selectedFunction: dataSearch.searchDataByAll.TaskFunction_Id,
            });
            self.setState(
              {
                selectedClaimCategory:
                  dataSearch.searchDataByAll.ClaimCategoryId,
              },
              () => {
                // self.handleGetClaimSubCategoryList();
                self.handleGetSubCategoryList("allClaimTab");
              }
            );
            self.setState(
              {
                selectedClaimSubCategory:
                  dataSearch.searchDataByAll.ClaimSubCategoryId,
              },
              () => {
                // self.handleGetClaimIssueTypeList();
                self.handleGetIssueTypeList("allClaimTab");
              }
            );
            self.setState({
              selectedClaimIssueType:
                dataSearch.searchDataByAll.ClaimIssueTypeId,
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
    // //debugger
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
  //// handle change filtre by check box
  setColorSortCheckStatus = (e) => {
    const { name } = e.target;
    this.setState({ [name]: e.target.checked });
  };
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
        } else {
          self.setState({ ticketFields: [] });
        }
      })
      .catch((error) => console.log(error));
  };
  ///handle pagination onchage
  // PaginationOnChange = async (numPage) => {
  //   await this.setState({
  //     currentPage: numPage,
  //   });
  //   this.handleTicketsOnLoad();
  // };

  /// handle per page item change
  handlePageItemchange = async (e) => {
    //debugger
    let val = parseInt(e.target.value)
    await this.setState({
      postsPerPage: val,

    });
    this.ViewSearchData();
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
    this.ViewSearchData();
  }
  handlePageCLick = async (e) => {
    await this.setState({
      currentPage: e
    })
    this.ViewSearchData()

  }


  removeSelectedTickets = () => {
    var checkboxes = document.getElementsByName("MyTicketListcheckbox[]");
    let obj = {};

    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
        for (let j = 0; j < this.state.SearchTicketData.length; j++) {
          obj[this.state.SearchTicketData[i].ticketID] = false;
        }
      }
    }

    this.setState({
      cSelectedRow: obj,
      ticketIds: "",
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

  handleGetUniqueValues = (data) => {
    // //debugger
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
      // sortFilterTicketData: sortTicketData,
      sortFilterAssigneeData: sortAssigneeData,
      sortFiltercreatedOnData: sortcreatedOnData,
      sortFilterPriorityData: sortPriorityData,
    });
  };

  getTicketListTableFilters = () => {
    let byDate = JSON.parse(localStorage.getItem("DashboardDateTypeFilter"));
    let customerType = JSON.parse(
      localStorage.getItem("DashboardCustomerTypeFilter")
    );
    let ticketType = JSON.parse(
      localStorage.getItem("DashboardTicketTypeFilter")
    );
    let categoryType = JSON.parse(
      localStorage.getItem("DashboardCategoryTypeFilter")
    );
    let allType = JSON.parse(localStorage.getItem("DashboardAllTypeFilter"));

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
        this.ViewSearchData(1, "savedFilter");
      }, 1000);
    } else if (customerType) {
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
        this.ViewSearchData(1, "savedFilter");
      }, 1000);
    } else if (ticketType) {
      this.setState({
        selectedPriority: ticketType.selectedPriority,
        selectedTicketStatusByTicket: ticketType.selectedTicketStatusByTicket,
        selectedChannelOfPurchase: ticketType.selectedChannelOfPurchase,
        selectedTicketActionType: ticketType.selectedTicketActionType,
        ActiveTabId: 3,
      });
      setTimeout(() => {
        this.ViewSearchData(1, "savedFilter");
      }, 1000);
    } else if (categoryType) {
      this.setState({
        selectedCategory: categoryType.selectedCategory,
        selectedSubCategory: categoryType.selectedSubCategory,
        selectedIssueType: categoryType.selectedIssueType,
        selectedTicketStatusByCategory:
          categoryType.selectedTicketStatusByCategory,
        ActiveTabId: 4,
      });
      setTimeout(() => {
        this.ViewSearchData(1, "savedFilter");
      }, 1000);
    } else if (allType) {
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
        this.ViewSearchData(1, "savedFilter");
      }, 1000);
    } else {
      setTimeout(() => {
        this.ViewSearchData();
        // this.handleTicketsOnLoad();
      }, 1000);
    }
  };
  setEscalationManagement = (e) => {
    let Value = e.target.value;
    if (Value === "0") {
      this.setState({ selectedescalationmanagement: "" });

    }
    else {
      this.setState({ selectedescalationmanagement: Value });

    }

  };

  // -------------Ticket Merging Handler START ***Sandy**-----------

  HandleTicketListModalOpen() {
    let self = this;
    var selected = self.state.ticketIds.split(',');
    const selectedRows = self.state.SearchTicketData.filter(x => selected.includes(x.ticketID.toString()));
    let selectedParents = selectedRows.filter(x => x.ticketMergeStatus === "parent");
    let selectedClosedChildTickets = selectedRows.filter(x => x.ticketStatus === "Closed" && x.ticketMergeStatus === "parent");
    let _isChild = selectedRows.filter(x => x.ticketMergeStatus === "child");
    if (selectedParents.length > 1) {
      NotificationManager.error("You can select single parent ticket only!");
    } else if (selectedClosedChildTickets.length > 0) {
      NotificationManager.error("You can not select ticket(Parent) which status is closed!");
    } else if (_isChild.length > 0) {
      NotificationManager.error("You can not select any child ticket for merge!");
    } else {
      let _parentId = selectedParents[0]?.ticketID === undefined ? 0 : selectedParents[0]?.ticketID;
      self.setState({
        disableButtonmerged: false,
        merging: true,
        searchticketmodal: true,
        selectedMergingTickets: selectedRows,
        tempMergingTicketsList: selectedRows,
        parentTicketId: _parentId,
        selectedTicketCount: (selected.length > 0) ? selected.length - 1 : 0,
        loadingTickets: false,
      });
    }

    // removed API Calling.......
  }
  HandleTicketListModalClose() {
    this.setState({
      disableButtonmerged: false,
      searchticketmodal: false,
      merging: false,
      mergingTicketsData: [],
      txtSearchTicket: "",

    });
  }

  HandleAddMoreTickets(ticket) {
    let ticketDetails = {
      assignedTo: "",
      assignedago: "",
      assignee: "",
      category: ticket.ticketCategory,
      claimStatus: "",
      createdBy: "",
      createdDate: ticket.createdDate,
      createdOn: "",
      createdago: "",
      isEscalation: 0,
      isReassigned: "",
      isSLANearBreach: "",
      issueType: "",
      message: ticket.message,
      priority: "",
      resolutionOverdueBy: "",
      responseOverdueBy: "",
      responseTimeRemainingBy: "",
      subCategory: "",
      taskStatus: "",
      ticketCommentCount: 0,
      ticketID: ticket.ticketID,
      ticketSourceType: ticket.ticketSource,
      ticketSourceTypeID: 0,
      ticketStatus: ticket.ticketStatus,
      total: 0,
      updatedBy: "",
      updatedago: "",
      customerPhoneNumber: ticket.customerPhoneNumber,
      ticketMergeStatus: ticket.ticketMergeStatus,
    };
    let selectedTicket = this.state.selectedMergingTickets;
    let _parentId = this.state.parentTicketId;
    let _parentCount = selectedTicket.filter(x => x.ticketMergeStatus === "parent");
    if (selectedTicket.filter(x => x.ticketID == ticket.ticketID).length > 0) {
      NotificationManager.error(
        "Ticket already added into list!"
      );
    } else if (ticketDetails.ticketMergeStatus === "parent" && _parentCount.length > 0) {
      NotificationManager.error(
        "You can not select multiple parent tickets!"
      );
    } else {
      let searchedTicket = this.state.mergingTicketsData.filter(x => x.ticketID != ticket.ticketID);
      let ticketCount = this.state.selectedTicketCount;
      selectedTicket.push(ticketDetails);
      let strIds = this.state.ticketIds;
      let isPresent = strIds.search(ticket.ticketID);
      if (isPresent == -1) {
        strIds += `${ticket.ticketID}` + ",";
      }
      this.setState({
        selectedMergingTickets: selectedTicket,
        tempMergingTicketsList: selectedTicket,
        mergingTicketsData: searchedTicket,
        selectedTicketCount: ticketCount + 1,
        ticketIds: strIds,
        parentTicketId: ticketDetails.ticketMergeStatus === "parent" ? ticketDetails.ticketID : _parentId
      })
    }
  }
  handleRemoveTicket = (e) => {
    let indexToRemove = e.ticketID
    let strIds = this.state.ticketIds;
    strIds = strIds.replace(indexToRemove + ",", "");
    let ticketCount = this.state.selectedTicketCount;
    let newArray = this.state.selectedMergingTickets.filter((item, index) => item.ticketID !== indexToRemove);
    let _isParentTicket = this.state.selectedMergingTickets.filter(item => item.ticketMergeStatus === "parent");
    let _parentId = this.state.parentTicketId;
    this.setState({
      selectedMergingTickets: newArray,
      ticketIds: strIds,
      selectedTicketCount: ticketCount - 1,
      parentTicketId: _isParentTicket.length > 0 ? 0 : _parentId,
    })
    NotificationManager.error("Ticket Removed")
  };
  handleParentTicket = (e) => {
    let selectedTicket = this.state.selectedMergingTickets;
    let _parentId = this.state.parentTicketId;
    let _parentCount = selectedTicket.filter(x => x.ticketMergeStatus === "parent" && x.ticketID === _parentId);
    let id = e.ticketID
    if (_parentId > 0 && _parentCount.length > 0) {
      NotificationManager.error("Primary ticket already selected! Please remove first if you want to change primary ticket.")
    } else {
      this.setState({
        parentTicketId: id,
      });
    }

    // if (this.state.parentTicketId == id) {
    //   this.setState({
    //     parentTicketId: 0,
    //   });
    // } else {
    //   this.setState({
    //     parentTicketId: id,
    //   });
    // }
  };
  HandleTicketMergingNext() {
    if (this.state.parentTicketId == 0) {
      NotificationManager.error("Please select parent ticket first.")
    } else if (this.state.selectedMergingTickets.length == 1) {
      NotificationManager.error("Please select atleast one child ticket.")
    } else {
      this.setState({ tabCount: 2, mergingTicketsData: [] })
    }
  }

  handleTicketFlagOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    const _copyRecepient = this.state.isCopyRecepient;
    const _autoReply = this.state.isAutoReply;
    const _copyContent = this.state.isCopyContent;
    if (e.target.name === "Recepient") {
      this.setState({
        isCopyRecepient: _copyRecepient === true ? false : true,
      });
    }
    else if (e.target.name === "AutoReply") {
      this.setState({
        isAutoReply: _autoReply === true ? false : true,
      });
    }
    else if (e.target.name === "CopyContent") {
      this.setState({
        isCopyContent: _copyContent === true ? false : true,
      });
    }
  };
  handleGetSearchMergingTicket = (e) => {
    let self = this;
    var selected = self.state.ticketIds.split(',');
    const customerTickets = self.state.tempMergingTicketsList;
    const searchText = e.target.value;
    if (searchText.length > 0) {
      axios({
        method: "get",
        url: config.apiUrl + "/Ticketing/GetAllTicketForMergeByTicketIdOrMobileNumber",
        headers: authHeader(),
        params: {
          searchText: searchText.toString(),
        },
      })
        .then(function (res) {
          let messageData = res.data.message;

          if (messageData === "Success") {
            self.setState({
              mergingTicketsData: res.data.responseData.filter(x => !(selected.includes(x.ticketID.toString()))),
              loadingTickets: false,
            });
          }
        })
        .catch((data) => {
          console.log(data);
          self.setState({ loadingTickets: false });
        });
    }
    else {
      self.setState({
        mergingTicketsData: customerTickets,
      });
    }
  }
  HandleTicketMergingBack() {
    this.setState({ tabCount: 1 })
  }
  HandleConfirmAndMerge() {

    this.setState({
      mergedLoader: true,
      disableButtonmerged: true
    })
    const parentTicketId = this.state.parentTicketId;
    const parentDetails = this.state.selectedMergingTickets.filter(x => x.ticketID == parentTicketId);
    let tickets = [];
    this.state.selectedMergingTickets.forEach(element => {
      if (element.ticketID != parentTicketId) {
        let item = {
          parentTicketId: parentTicketId,
          parentTicketNote: "Ticket ID #" + element.ticketID + " [" + element.message + "] " + "was closed and merged into this ticket.",
          ChildTicketId: element.ticketID,
          ChildTicketNote: "The ticket ID #" + element.ticketID + " was closed and merged with Ticket ID #" + parentTicketId + " [" + parentDetails[0].message + "]"
        }
        tickets.push(item);
      }
    });
    let self = this;
    setTimeout(() => {
      axios({
        method: "post",
        url: config.apiUrl + "/Ticketing/BulkTicketMerging",
        headers: authHeader(),
        data: {
          mergeTicketDetails: tickets,
          createdBy: 0,
          isCopyRecepientInParentTicket: self.state.isCopyRecepient,
          isAutoReply: self.state.isAutoReply,
          isMergeChildTicketMessage: self.state.isCopyContent,
        },
      })
        .then(function (res) {
          let statusMessage = res.data.message;
          if (statusMessage === "Success") {
            NotificationManager.success(
              "Ticket(s) merged successfully."
            );
            self.setState({
              searchticketmodal: false,
              tabCount: 1,
              mergedLoader: false,
              // disableButtonmerged: false
            });
            window.location.reload();
            // self.ViewSearchData();
          }
        })
        .catch((data) => {
          console.log(data);
        });

    }, 1000);
  }
  HandleRowClickPage_mergeTicket(_ticketId, _Source) {
    let Id = _ticketId;
    let ticketSourceType = _Source;
    let self = this;

    let appliedTableFilters = {
      status: "",
      category: "",
      priority: "",
      createdOn: "",
      assignedTo: "",
    };
    setTimeout(function () {
      if (window.localStorage.getItem('isTicketInNewTab') === "true") {
        window.open('./myticket?ticketDetailID=' + Id + '&sourceName=' + ticketSourceType
          + '&screenName=dashboard' + '&appliedTableFilters=' + JSON.stringify(appliedTableFilters)
          + '&tableFilterData=')
      }
    }, 100);
  };
  // -------------Ticket Merging Handler END ***Sandy**-----------
  render() {
    const TranslationContext = this.state.translateLanguage.default;
    const { SearchAssignData, SearchTicketData, postsPerPage, currentPage } = this.state;
    let now = new Date();
    let start = moment(
      new Date(now.getFullYear(), now.getMonth() - 1, now.getDate(), 0, 0, 0, 0)
    );
    let end = moment(start)
      .add(1, "days")
      .subtract(1, "seconds");
    // let ranges = {
    //   "Today Only": [moment(start), moment(end)],
    //   "Yesterday Only": [
    //     moment(start).subtract(1, "days"),
    //     moment(end).subtract(1, "days")
    //   ],
    //   "3 Days": [moment(start).subtract(3, "days"), moment(end)]
    // };
    // let local = {
    //   format: "DD-MM-YYYY",
    //   sundayFirst: false
    // };

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

    // let value = `${this.state.start.format(
    //   "DD-MM-YYYY"
    // )} - ${this.state.end.format("DD-MM-YYYY")}`;
    // let disabled = false;
    const indexOfLastItem = currentPage * postsPerPage;
    const indexOfFirstItem = indexOfLastItem - postsPerPage;
    const tabledata = this.state.SearchTicketData.slice(indexOfFirstItem, indexOfLastItem);
    // const numberofpage = Math.ceil(this.state.SearchTicketData.length/postsPerPage)
    const numberofpage = this.state.tabletotalPages
    // console.log("numberofpage", numberofpage)
    //console.log("this.state.tableDataDashboard",this.state.tableDataDashboard)
    const numberListdisplay = [...Array(numberofpage + 1).keys()].slice(1)
    //console.log("numberofpage", numberListdisplay)
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
              <div className="filter-type ">
                <p>
                  {TranslationContext !== undefined
                    ? TranslationContext.p.filterbytype
                    : "FILTER BY TYPE"}
                </p>

                <div className="FTypeScroll">
                  <input
                    type="text"
                    style={{ display: "block" }}
                    value={this.state.filterTxtValue}
                    onChange={this.filteTextChange.bind(this)}
                  />
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
                      <span className="table-btn table-blue-btn">
                        {TranslationContext !== undefined
                          ? TranslationContext.span.all
                          : "ALL"}
                      </span>
                    </label>
                  </div>
                  {this.state.sortColumnName === "status" ? this.state.sortFilterTicketData !== null &&
                    this.state.sortFilterTicketData.map((item, i) => (
                      <div className="filter-checkbox" key={i}>
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

                  {this.state.sortColumnName === "category" ? this.state.sortFilterCategoryData !== null &&
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

                  {this.state.sortColumnName === "priority" ? this.state.sortFilterPriorityData !== null &&
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

                  {this.state.sortColumnName === "createdOn" ? this.state.sortFiltercreatedOnData !== null &&
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

                  {this.state.sortColumnName === "assignedTo" ? this.state.sortFilterAssigneeData !== null &&
                    this.state.sortFilterAssigneeData.map((item, i) => (
                      <div className="filter-checkbox" key={i}>
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
                    name="filter-color"
                    value="isEscalation"
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
                    name="filter-color"
                    value="isSLANearBreach"
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
                    name="filter-color"
                    value="white"
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
                    name="filter-color"
                    value="isReassigned"
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
        <div
          className="container-fluid dash-dropdowns"
          style={{ marginTop: "-21px" }}
        >
          <div className="d-flex dashallbrand1">
            <div>
              <span>
                {/* {TranslationContext !== undefined
                  ? TranslationContext.label.brand
                  : "Brand"} */}
                {this.state.ticketFields.length > 0
                  ? this.state.ticketFields.filter(
                    (x) => x.fieldName.toLowerCase() === "Brand".toLowerCase()
                  ).length > 0
                    ? this.state.ticketFields.filter(
                      (x) =>
                        x.fieldName.toLowerCase() === "Brand".toLowerCase()
                    )[0].createPage
                      ? TranslationContext !== undefined
                        ? this.state.ticketFields.filter(
                          (x) =>
                            x.fieldName.toLowerCase() ===
                            "Brand".toLowerCase()
                        )[0].displayHindiName ||
                        TranslationContext.label.brand
                        : this.state.ticketFields.filter(
                          (x) =>
                            x.fieldName.toLowerCase() ===
                            "Brand".toLowerCase()
                        )[0].displayEnglishName || "Brand"
                      : TranslationContext !== undefined
                        ? TranslationContext.label.brand
                        : "Brand"
                    : TranslationContext !== undefined
                      ? TranslationContext.label.brand
                      : "Brand"
                  : TranslationContext !== undefined
                    ? TranslationContext.label.brand
                    : "Brand"}
                :
                <div className="dropdown">
                  <button
                    style={{ width: "90px" }}
                    className="dropdown-toggle dashallbrand"
                    type="button"
                    data-toggle="dropdown"
                  >
                    <span id="spnBrand" className="EMFCText">
                      {TranslationContext !== undefined
                        ? TranslationContext.p.all
                        : "All"}
                    </span>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <label htmlFor="all-brand">
                        <input
                          type="checkbox"
                          id="all-brand"
                          className="ch1"
                          onChange={this.checkAllBrand.bind(this)}
                          checked={this.state.CheckBoxAllBrand}
                          name="allBrand"
                        />
                        <span className="ch1-text">
                          {TranslationContext !== undefined
                            ? TranslationContext.p.all
                            : "All"}
                        </span>
                      </label>
                    </li>
                    {this.state.BrandData !== null &&
                      this.state.BrandData.map((item, i) => (
                        <li key={i}>
                          <label htmlFor={"i" + item.brandID}>
                            <input
                              type="checkbox"
                              id={"i" + item.brandID}
                              className="ch1"
                              name="allBrand"
                              attrIds={item.brandID}
                              onChange={this.checkIndividualBrand.bind(this)}
                            />
                            <span className="ch1-text">{item.brandName}</span>
                          </label>
                        </li>
                      ))}
                  </ul>
                </div>
              </span>
            </div>
            <div>
              <span>
                {TranslationContext !== undefined
                  ? TranslationContext.text.agent
                  : "Agent:"}
                <div className="dropdown">
                  <button
                    style={{ width: "90px" }}
                    className="dropdown-toggle dashallbrand"
                    type="button"
                    data-toggle="dropdown"
                  >
                    <span id="spnAgent" className="EMFCText">
                      {TranslationContext !== undefined
                        ? TranslationContext.p.all
                        : "All"}
                    </span>
                  </button>
                  <ul style={{ width: "180px" }} className="dropdown-menu">
                    <li>
                      <label htmlFor="all-agent">
                        <input
                          type="checkbox"
                          id="all-agent"
                          className="ch1"
                          onChange={this.checkAllAgent.bind(this)}
                          checked={this.state.CheckBoxAllAgent}
                          name="allAgent"
                        />
                        <span className="ch1-text">
                          {TranslationContext !== undefined
                            ? TranslationContext.p.all
                            : "All"}
                        </span>
                      </label>
                    </li>
                    {this.state.AgentData !== null &&
                      this.state.AgentData.map((item, i) => (
                        <li key={i}>
                          <label htmlFor={"i" + item.userID}>
                            <input
                              type="checkbox"
                              id={"i" + item.userID}
                              className="ch1"
                              name="allAgent"
                              attrIds={item.userID}
                              onChange={this.checkIndividualAgent.bind(this)}
                            />
                            <span className="ch1-text">{item.fullName}</span>
                          </label>
                        </li>
                      ))}
                  </ul>
                </div>
              </span>
            </div>
          </div>
          <div>
            <div className="row">
              <div className="col-md-6 col-6">
                <span style={{ float: "right" }}>
                  {TranslationContext !== undefined
                    ? TranslationContext.text.daterange
                    : "Date Range :"}
                </span>
              </div>
              <div className="col-md-6 col-6 p-0">
                <div className="DashTimeRange">
                  <div className="show-grid">
                    <div id="DateTimeRangeContainerNoMobileMode">
                      <DatePickerComponenet
                        applyCallback={this.applyCallback}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="dash-cntr">
          <a
            href="#!"
            className={
              this.state.collapse
                ? "dashboard-collapse-icon"
                : "dashboard-collapse-icon dashboard-collapse-icon-inv"
            }
            onClick={this.toggle}
          >
            {this.state.collapse ? (
              <img src={Dash} alt="dash-icon" />
            ) : (
              <img
                src={CollapseIcon}
                alt="dash-icon"
                className="collapse-icon"
              />
            )}
          </a>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                {(
                  <>
                    <div className="container-fluid dash-tp-card btm-mar">
                      <div className="row justify-content-center">
                        <div className="col-md col-sm-4 col-6">
                          <div className="dash-top-cards">
                            <p className="card-head">
                              {TranslationContext !== undefined
                                ? TranslationContext.p.all
                                : "All"}
                            </p>
                            <span className="card-value">
                              {this.state.loadingAbove === true ? (

                                <div className="loader-icon"></div>

                              ) : this.state.DashboardNumberData !== null
                                ? this.state.DashboardNumberData.all !== null &&
                                  this.state.DashboardNumberData.all < 9
                                  ? "0" + this.state.DashboardNumberData.all
                                  : this.state.DashboardNumberData.all
                                : null}
                            </span>
                          </div>
                        </div>
                        {window.localStorage.Programcode === 'campusshoes' &&
                          this.state.DashboardNumberData?.unAssignedTicket > 0 &&
                          <div className="col-md col-sm-4 col-6">
                            <div className="dash-top-cards">
                              <p className="card-head">
                                {/* {TranslationContext !== undefined
                                ? TranslationContext.p.unAssignedTicket
                                : "Open"} */}
                                Un Assigned
                              </p>
                              <span className="card-value">

                                {this.state.loadingAbove === true ? (
                                  <div className="loader-icon"></div>

                                ) : this.state.DashboardNumberData !== null
                                  ? this.state.DashboardNumberData.unAssignedTicket !==
                                    null &&
                                    this.state.DashboardNumberData.unAssignedTicket < 9
                                    ? "0" + this.state.DashboardNumberData.unAssignedTicket
                                    : this.state.DashboardNumberData.unAssignedTicket
                                  : null}
                              </span>

                            </div>
                          </div>

                        }
                        <div className="col-md col-sm-4 col-6">
                          <div className="dash-top-cards">
                            <p className="card-head">
                              {TranslationContext !== undefined
                                ? TranslationContext.p.open
                                : "Open"}
                            </p>
                            <span className="card-value">

                              {this.state.loadingAbove === true ? (
                                <div className="loader-icon"></div>

                              ) : this.state.DashboardNumberData !== null
                                ? this.state.DashboardNumberData.open !==
                                  null &&
                                  this.state.DashboardNumberData.open < 9
                                  ? "0" + this.state.DashboardNumberData.open
                                  : this.state.DashboardNumberData.open
                                : null}
                            </span>
                            <span
                              className={
                                this.state.TotalNoOfChatShow
                                  ? "dash-res dash-res-opac"
                                  : "dash-res"
                              }
                              style={{ marginTop: "-3px" }}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.label.resolution
                                : "Resolution"}
                              : &nbsp;
                              <span style={{ fontWeight: "700" }}>
                                {this.state.DashboardNumberData.resolutionRate}
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="col-md col-sm-4 col-6">
                          <div className="dash-top-cards">
                            <p className="card-head">
                              {TranslationContext !== undefined
                                ? TranslationContext.p.duetoday
                                : "Due Today"}
                            </p>
                            <span className="card-value">
                              {this.state.loadingAbove === true ? (

                                <div className="loader-icon"></div>

                              ) : this.state.DashboardNumberData !== null
                                ? this.state.DashboardNumberData.dueToday !==
                                  null &&
                                  this.state.DashboardNumberData.dueToday < 9
                                  ? "0" +
                                  this.state.DashboardNumberData.dueToday
                                  : this.state.DashboardNumberData.dueToday
                                : null}
                            </span>
                          </div>
                        </div>
                        <div className="col-md col-sm-4 col-6">
                          <div className="dash-top-cards">
                            <p className="card-head">
                              {TranslationContext !== undefined
                                ? TranslationContext.p.overdue
                                : "Over Due"}
                            </p>
                            <span className="card-value red-clr">
                              {this.state.loadingAbove === true ? (

                                <div className="loader-icon"></div>

                              ) : this.state.DashboardNumberData !== null
                                ? this.state.DashboardNumberData.overDue !==
                                  null &&
                                  this.state.DashboardNumberData.overDue < 9
                                  ? "0" + this.state.DashboardNumberData.overDue
                                  : this.state.DashboardNumberData.overDue
                                : null}
                            </span>
                          </div>

                        </div>
                        {this.state.TotalNoOfChatShow && (
                          <div
                            className="col-md col-sm-4 col-6 d-none"
                            onClick={this.HandleChangeRedict.bind(this)}
                          >
                            <div className="dash-top-cards">
                              <p className="card-head">
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.totalnoofchat
                                  : "Total no of chat"}
                              </p>
                              <span className="card-value">102</span>
                              <small className="blue-clr">
                                {this.state.loadingAbove === true ? (

                                  <div className="loader-icon"></div>

                                ) : TranslationContext !== undefined
                                  ? TranslationContext.ticketingDashboard
                                    .viewMoreInsights
                                  : "View More Insights"}
                              </small>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="container-fluid btm-mar">
                      <div className="row">
                        <div className="col-lg-3 col-md-4">
                          <div className="dash-top-cards prio-pie-cntr" style={{ height: "290px" }}>
                            <p className="card-head mb-0">
                              {TranslationContext !== undefined
                                ? TranslationContext.ticketingDashboard
                                  .openByPriority
                                : "Open By Priority"}
                            </p>
                            {this.state.loadingAboveForGraph === true ? (

                              <div className="loader-icon" ></div>

                            ) : (<div
                              className="prio-pie-chart"
                              style={{ position: "relative", height: "270px" }}
                            >
                              {this.state.DashboardPriorityGraphData.length >
                                0 ? (
                                <>
                                  <p className="pie-chart-count">
                                    <span>
                                      {
                                        this.state.DashboardGraphData
                                          .openPriorityTicketCount
                                      }
                                    </span>
                                    {/* {TranslationContext !== undefined
                                      ? TranslationContext.p.tickets
                                      : "Tickets"} */}
                                  </p>
                                  <OpenByPriorityPie
                                    data={this.state.DashboardPriorityGraphData}
                                  />
                                </>
                              ) : null}
                              {this.state.openByPriorityFlag && (
                                <p className="tab-content mt-5">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.ticketingDashboard
                                      .noDataAvailable
                                    : "No Data Available"}
                                </p>
                              )}</div>)}


                          </div>
                        </div>
                        {/* <div className={window.localStorage.getItem("isSLAVisible") === "true" ? "col-lg-6 col-md-8" : "col-lg-9 col-md-8"}> */}
                        <div className="col-lg-9 col-md-8">
                          <div className="dash-top-cards p-0">
                            <ul className="nav nav-tabs" role="tablist">
                              <li className="nav-item">
                                <a
                                  className={this.state.TabNum === 1 ? "nav-link active" : "nav-link"}
                                  data-toggle="tab"
                                  href="#status-graph-tab"
                                  role="tab"
                                  aria-controls="status-graph-tab"
                                  aria-selected="true"
                                  onClick={() => this.handlechangebtntab(1)}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.ticketingDashboard
                                      .ticketsToStatusGraph
                                    : "Status Graph"}
                                </a>
                              </li>
                              {/* <li className="nav-item">
                                <a
                                  className="nav-link tab2"
                                  data-toggle="tab"
                                  href="#bill-graph-tab"
                                  role="tab"
                                  aria-controls="bill-graph-tab"
                                  aria-selected="false"
                                  onClick={this.handleGetBillGraphData}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.ticketingDashboard
                                      .ticketsToBillGraph
                                    : "Tickets To Bill Graph"}
                                </a>
                              </li> */}
                              <li className="nav-item">
                                <a
                                  className={this.state.TabNum === 2 ? "nav-link active" : "nav-link"}
                                  data-toggle="tab"
                                  href="#source-tab"
                                  role="tab"
                                  aria-controls="source-tab"
                                  aria-selected="true"
                                  onClick={() => this.handlechangebtntab(2)}
                                // onClick={this.handleTicketSourceGraphData}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.ticketingDashboard
                                      .ticketsGenerationSourceTab
                                    : "Tickets Generation Source Tab"}
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className={this.state.TabNum === 3 ? "nav-link active" : "nav-link"}
                                  data-toggle="tab"
                                  href="#metric-add"
                                  role="tab"
                                  aria-controls="metric-add"
                                  aria-selected="true"
                                  onClick={() => this.handlechangebtntab(3)}
                                // onClick={this.handleGetDashboardSLAData}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.ticketingDashboard
                                      .ticketsGenerationSourceTab
                                    : "SLA"}
                                </a>
                              </li>
                              {window.localStorage.getItem("isCsat") == "true" && (
                                <li className="nav-item">
                                  <a
                                    className={this.state.TabNum === 4 ? "nav-link active" : "nav-link"}
                                    data-toggle="tab"
                                    href="#feedback-count"
                                    role="tab"
                                    aria-controls="feedback-count"
                                    aria-selected="true"
                                    onClick={() => this.handlechangebtntab(4)}
                                  // onClick={this.handleGetDashboardSLAData}
                                  >
                                    {TranslationContext !== undefined
                                      ? TranslationContext.ticketingDashboard
                                        .ticketsGenerationSourceTab
                                      : "Feedback"}
                                  </a>
                                </li>
                              )}
                              <li className="nav-item">
                                <a
                                  className={this.state.TabNum === 5 ? "nav-link active" : "nav-link"}
                                  data-toggle="tab"
                                  href="#BrandCountID"
                                  role="tab"
                                  aria-controls="BrandCountID"
                                  aria-selected="true"
                                  onClick={() => this.handlechangebtntab(5)}
                                // onClick={this.handleGetDashboardSLAData}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.ticketingDashboard
                                      .ticketsGenerationSourceTab
                                    : "Brand Status Count"}
                                </a>
                              </li>

                            </ul>
                            {this.state.loadingAboveForGraph === true ? (

                              <div className="loader-icon"></div>

                            ) : <div className="tab-content mt-3">
                              <div
                                className="tab-pane fade show active"
                                id="status-graph-tab"
                                role="tabpanel"
                                aria-labelledby="status-graph-tab"
                              >
                                <div className="row">
                                  <div className="col-md-3">
                                    <ul className="bill-graph-list">
                                      {this.state.DashboardTicketStatusGraphData.length >
                                        0 ? this.state.DashboardTicketStatusGraphData !==
                                        null &&
                                      this.state.DashboardTicketStatusGraphData.map(
                                        (item, i) => (
                                          <li key={i}>
                                            {item.status} :
                                            <b>{item.count}</b>
                                          </li>
                                        )
                                      ) : null}
                                    </ul>
                                  </div>
                                  <div className="col-md-9 tic-bill-graph">
                                    {this.state.DashboardTicketStatusGraphData.length >
                                      0 ? (
                                      <TicketToStatusGraph
                                        data={this.state.DashboardTicketStatusGraphData}
                                      />
                                    ) : null}
                                  </div>
                                </div>
                                {this.state.ticketStatusFlag && (
                                  <p>
                                    {TranslationContext !== undefined
                                      ? TranslationContext.ticketingDashboard
                                        .noDataAvailable
                                      : "No Data Available"}
                                  </p>
                                )}
                              </div>
                              {/* <div
                                className="tab-pane fade "
                                id="bill-graph-tab"
                                role="tabpanel"
                                aria-labelledby="bill-graph-tab"
                              >
                                <div className="row">
                                  <div className="col-md-3">
                                    <ul className="bill-graph-list">
                                      {this.state.DashboardBillGraphData !==
                                        null &&
                                        this.state.DashboardBillGraphData.map(
                                          (item, i) => (
                                            <li key={i}>
                                              {item.ticketSourceName} :
                                              <b>
                                                {item.ticketedBills}/
                                                {item.totalBills}
                                              </b>
                                            </li>
                                          )
                                        )}
                                    </ul>
                                  </div>
                                  <div className="col-md-9 tic-bill-graph">
                                    {this.state.DashboardBillGraphData.length >
                                      0 ? (
                                      <TicketToBillBarGraph
                                        data={this.state.DashboardBillGraphData}
                                      />
                                    ) : null}
                                  </div>
                                </div>
                                {this.state.ticketToBillBarFlag && (
                                  <p>
                                    {TranslationContext !== undefined
                                      ? TranslationContext.ticketingDashboard
                                        .noDataAvailable
                                      : "No Data Available"}
                                  </p>
                                )}
                              </div> */}
                              <div
                                className="tab-pane fade"
                                id="source-tab"
                                role="tabpanel"
                                aria-labelledby="source-tab"
                              >
                                <div className="row">
                                  <div className="col-md-3">
                                    <ul className="bill-graph-list">
                                      {this.state.DashboardSourceGraphData !==
                                        null &&
                                        this.state.DashboardSourceGraphData.map(
                                          (item, i) => (
                                            <li key={i}>
                                              {item.ticketSourceName} :
                                              <b>{item.ticketSourceCount}</b>
                                            </li>
                                          )
                                        )}
                                    </ul>
                                  </div>
                                  <div className="col-md-9 ">
                                    {this.state.DashboardSourceGraphData
                                      .length > 0 ? (
                                      <TicketGenerationSourceBar
                                        data={
                                          this.state.DashboardSourceGraphData
                                        }
                                      />
                                    ) : null}
                                  </div>
                                </div>
                                {this.state.ticketGenerationSourceFlag && (
                                  <p>
                                    {TranslationContext !== undefined
                                      ? TranslationContext.ticketingDashboard
                                        .noDataAvailable
                                      : "No Data Available"}
                                  </p>
                                )}
                              </div>
                              <div
                                className="tab-pane fade"
                                id="metric-add"
                                role="tabpanel"
                                aria-labelledby="metric-add"
                              >
                                <div className="px-2">
                                  <div className="row">
                                    <div className="col-md-4">
                                      <div className="sla-flex">
                                        <span style={{ fontSize: "14px", fontWeight: "600" }}>
                                          FCR(QC)
                                        </span>
                                        <Popover
                                          content={
                                            <div className="info-popoverDashBorad">
                                              <p>
                                                % of Number of tickets resolved after the first contact made by the customer divided by the total number of tickets created via call during that period
                                              </p>
                                            </div>
                                          }
                                          placement="bottom"
                                        >
                                          <img
                                            className="info-icon-cp"
                                            src={BlackInfoIcon}
                                            alt="info-icon"

                                          />
                                        </Popover>

                                      </div>
                                      <div style={{ fontSize: "25px", fontWeight: "600" }}>
                                        {this.state.DashboardSLADataNew.fcr}
                                      </div>

                                    </div>
                                    <div className="col-md-4">
                                      <div className="sla-flex">
                                        <span style={{ fontSize: "14px", fontWeight: "600" }}>
                                          First Response SLA
                                        </span>
                                        <Popover
                                          content={
                                            <div className="info-popoverDashBorad">
                                              <p>
                                                % of Number of tickets whose first responses were sent within the SLA divided by the total number of tickets whose first responses were sent in the selected time period.
                                              </p>
                                            </div>
                                          }
                                          placement="bottom"
                                        >
                                          <img
                                            className="info-icon-cp"
                                            src={BlackInfoIcon}
                                            alt="info-icon"

                                          />
                                        </Popover>

                                      </div>
                                      <div style={{ fontSize: "25px", fontWeight: "600" }}>
                                        {this.state.DashboardSLADataNew.frsRate}
                                      </div>

                                    </div>
                                    <div className="col-md-4">
                                      <div className="sla-flex">
                                        <span style={{ fontSize: "14px", fontWeight: "600" }}>
                                          Average 1st response time
                                        </span>
                                        <Popover
                                          content={
                                            <div className="info-popoverDashBorad">
                                              <p>
                                                Total time taken to send the first response during the selected time period divided by the number of tickets whose first responses were sent in the selected time period.
                                              </p>
                                            </div>
                                          }
                                          placement="bottom"
                                        >
                                          <img
                                            className="info-icon-cp"
                                            src={BlackInfoIcon}
                                            alt="info-icon"

                                          />
                                        </Popover>

                                      </div>
                                      <div style={{ fontSize: "25px", fontWeight: "600" }}>
                                        {this.state.DashboardSLADataNew.afrtRate}
                                      </div>

                                    </div>
                                    <div className="col-md-4 mt-3 ">
                                      <div className="sla-flex">
                                        <span style={{ fontSize: "14px", fontWeight: "600" }}>
                                          Resolution SLA
                                        </span>
                                        <Popover
                                          content={
                                            <div className="info-popoverDashBorad">
                                              <p>
                                                % of Number of tickets resolved within the SLA divided by the total number of tickets resolved  during the selected time period.
                                              </p>
                                            </div>
                                          }
                                          placement="bottom"
                                        >
                                          <img
                                            className="info-icon-cp"
                                            src={BlackInfoIcon}
                                            alt="info-icon"

                                          />
                                        </Popover>

                                      </div>
                                      <div style={{ fontSize: "25px", fontWeight: "600" }}>
                                        {this.state.DashboardSLADataNew.resolutionRateWithSLA}
                                      </div>

                                    </div>
                                    <div className="col-md-4 mt-3">
                                      <div className="sla-flex">
                                        <span style={{ fontSize: "14px", fontWeight: "600" }}>
                                          Average Resolution Time
                                        </span>
                                        <Popover
                                          content={
                                            <div className="info-popoverDashBorad">
                                              <p>
                                                Total time taken to resolve tickets during the selected time period divided by the number of tickets resolved in the selected time period.
                                              </p>
                                            </div>
                                          }
                                          placement="bottom"
                                        >
                                          <img
                                            className="info-icon-cp"
                                            src={BlackInfoIcon}
                                            alt="info-icon"

                                          />
                                        </Popover>

                                      </div>
                                      <div style={{ fontSize: "25px", fontWeight: "600" }}>
                                        {this.state.DashboardSLADataNew.avgResolutionTime}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div
                                className="tab-pane fade"
                                id="feedback-count"
                                role="tabpanel"
                                aria-labelledby="feedback-count"
                              >

                                <div className="px-2">
                                  {this.state.loadingFeedback === true ? (

                                    <div className="loader-icon"></div>

                                  ) : (
                                    <div className="row">
                                      <div className="col-md-4">
                                        <div className="sla-flex">
                                          <span style={{ fontSize: "14px", fontWeight: "600" }}>
                                            CSAT
                                          </span>
                                        </div>
                                        <div style={{ fontSize: "25px", fontWeight: "600" }}>
                                          {this.state.CSATCount}
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="sla-flex">
                                          <span style={{ fontSize: "14px", fontWeight: "600" }}>
                                            DSAT
                                          </span>
                                        </div>
                                        <div style={{ fontSize: "25px", fontWeight: "600" }}>
                                          {this.state.DSATCount}
                                        </div>
                                      </div>

                                      <div className="col-md-4">
                                        <div className="sla-flex">
                                          <span style={{ fontSize: "14px", fontWeight: "600" }}>
                                            Neutral
                                          </span>
                                        </div>
                                        <div style={{ fontSize: "25px", fontWeight: "600" }}>
                                          {this.state.NeutralCount}
                                        </div>
                                      </div>
                                    </div>)}
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="BrandCountID"
                                role="tabpanel"
                                aria-labelledby="BrandCountID"
                              >
                                {this.state.loadingFeedback === true ?

                                  (<div className="loader-icon"></div>) :
                                  <div style={{ padding: "10px" }} className="d-flex justify-content-center">
                                    <div className="statusBrandData">
                                      <table>
                                        <thead>
                                          {
                                            Object.keys(this.state.DashBoardBrandStatusCount[0]).map((e, i) => {
                                              console.log("e", e)
                                              return (
                                                <th key={i}>{e}</th>
                                              )
                                            })
                                          }
                                        </thead>
                                        <tbody>
                                          {this.state.DashBoardBrandStatusCount && this.state.DashBoardBrandStatusCount.map((e, i) =>
                                          (
                                            <tr key={i}>
                                              {
                                                Object.keys(this.state.DashBoardBrandStatusCount[0]).map((key, key2) => (
                                                  <td key={key2}>
                                                    {e[key]}
                                                  </td>
                                                ))
                                              }
                                            </tr>
                                          ))
                                          }
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>}
                              </div>
                            </div>}
                          </div>
                        </div>
                        {/* {window.localStorage.getItem("isSLAVisible") === "true" &&
                          <div className="col-lg-3">
                            <div
                              className="dash-top-cards"
                              onMouseLeave={this.handleMouseLeave.bind(this)}
                              onMouseEnter={this.handleMouseHover.bind(this)}
                            >
                              <p className="card-head">
                                {TranslationContext !== undefined
                                  ? TranslationContext.strong.sla
                                  : "SLA"}
                              </p>
                              {this.state.loadingAbove === true ? (

                                <div className="loader-icon"></div>

                              ) : this.state.DashboardNumberData !== null ? (
                                Object.keys(this.state.DashboardNumberData)
                                  .length > 0 ? (
                                  <div className="resp-success">
                                    <p className="card-head">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.label.response
                                        : "Response"}

                                      {this.state.DashboardNumberData
                                        .isResponseSuccess === true
                                        ? TranslationContext !== undefined
                                          ? TranslationContext.alertmessage
                                            .success
                                          : "Success"
                                        : TranslationContext !== undefined
                                          ? TranslationContext.ticketingDashboard
                                            .failure
                                          : "Failure"}
                                    </p>
                                    <span className="card-value">
                                      <big>
                                        {
                                          this.state.DashboardNumberData
                                            .responseRate
                                        }
                                      </big>
                                      <span
                                        className={
                                          this.state.TotalNoOfChatShow
                                            ? "dash-res dash-res-opac"
                                            : "dash-res"
                                        }
                                        style={{ marginTop: "-5px" }}
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.ticketingDashboard
                                            .avgResponseTAT
                                          : "Avg. Response TAT"}
                                        &nbsp;
                                        <span style={{ fontWeight: "700" }}>
                                          {
                                            this.state.DashboardNumberData
                                              .avgResponseTAT
                                          }
                                        </span>
                                      </span>
                                    </span>
                                    <p className="card-head mt-lg-4 mt-2">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.label.resolution
                                        : "Resolution"}
                                      {this.state.DashboardNumberData
                                        .isResolutionSuccess === true
                                        ? TranslationContext !== undefined
                                          ? TranslationContext.alertmessage
                                            .success
                                          : "Success"
                                        : TranslationContext !== undefined
                                          ? TranslationContext.ticketingDashboard
                                            .failure
                                          : "Failure"}
                                      :
                                      <span className="font-weight-bold">
                                        {
                                          this.state.DashboardNumberData
                                            .resolutionRate
                                        }
                                      </span>
                                      <span
                                        className={
                                          this.state.TotalNoOfChatShow
                                            ? "dash-res dash-res-opac"
                                            : "dash-res"
                                        }
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.ticketingDashboard
                                            .avgResolutionTAT
                                          : "Avg. Resolution TAT"}
                                        &nbsp;
                                        <span style={{ fontWeight: "700" }}>
                                          {
                                            this.state.DashboardNumberData
                                              .avgResolutionTAT
                                          }
                                        </span>
                                      </span>
                                    </p>
                                  </div>
                                ) : null
                              ) : null}
                            </div>
                          </div>
                        } */}
                        <div className="col-lg-3 col-sm-6 d-none">
                          <div className="dash-top-cards">
                            <p className="card-head">
                              {TranslationContext !== undefined
                                ? TranslationContext.nav.task
                                : "Task"}
                            </p>
                            {this.state.loadingAbove === true ? (

                              <div className="loader-icon"></div>

                            ) : <div className="aside-cont">
                              <div>
                                <span className="card-value">
                                  {this.state.DashboardNumberData !== null
                                    ? this.state.DashboardNumberData.taskOpen <
                                      9
                                      ? "0" +
                                      this.state.DashboardNumberData.taskOpen
                                      : this.state.DashboardNumberData.taskOpen
                                    : null}
                                </span>
                                <small>
                                  {TranslationContext !== undefined
                                    ? TranslationContext.p.open
                                    : "Open"}
                                </small>
                              </div>
                              <div>
                                <span className="card-value">
                                  {this.state.DashboardNumberData !== null
                                    ? this.state.DashboardNumberData.taskClose <
                                      9
                                      ? "0" +
                                      this.state.DashboardNumberData.taskClose
                                      : this.state.DashboardNumberData.taskClose
                                    : null}
                                </span>
                                <small>
                                  {TranslationContext !== undefined
                                    ? TranslationContext.small.closed
                                    : "Closed"}
                                </small>
                              </div>
                            </div>}
                          </div>
                        </div>
                        {/* <div className="col-lg-6 order-1 order-lg-0 d-none">
                          <div className="dash-top-cards p-0">
                            <ul className="nav nav-tabs" role="tablist">
                              <li className="nav-item">
                                <a
                                  className="nav-link active"
                                  data-toggle="tab"
                                  href="#task-tab"
                                  role="tab"
                                  aria-controls="task-tab"
                                  aria-selected="true"
                                >
                                  Ticket to Task
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className="nav-link"
                                  data-toggle="tab"
                                  href="#claim-tab"
                                  role="tab"
                                  aria-controls="claim-tab"
                                  aria-selected="false"
                                >
                                  Ticket to claim
                                </a>
                              </li>
                            </ul>
                            <div className="tab-content task-claim-cont">
                              <div
                                className="tab-pane fade show active"
                                id="task-tab"
                                role="tabpanel"
                                aria-labelledby="task-tab"
                              >
                                {this.state.DashboardTaskGraphData.length >
                                0 ? (
                                  <MultiBarChart
                                    data={this.state.DashboardTaskGraphData}
                                  />
                                ) : null}
                                {Object.keys(this.state.DashboardGraphData)
                                  .length > 0 ? (
                                  <MultiBarChart
                                    data={this.state.DashboardTaskGraphData}
                                  />
                                ) : null}
                                <MultiBarChart
                                  data={
                                    this.state.DashboardGraphData
                                      .tickettoTaskGraph
                                  }
                                />
                              </div>
                              <div
                                className="tab-pane fade"
                                id="claim-tab"
                                role="tabpanel"
                                aria-labelledby="claim-tab"
                              >
                                {this.state.DashboardClaimGraphData.length >
                                0 ? (
                                  <TicketToClaimMultiBar
                                    data={this.state.DashboardClaimGraphData}
                                  />
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div> */}
                        {/* <div className="col-lg-3 col-sm-6 d-none">
                          <div className="dash-top-cards">
                            <p className="card-head">Claim</p>
                            <div className="aside-cont">
                              <div>
                                <span className="card-value">
                                  {this.state.DashboardNumberData !== null
                                    ? this.state.DashboardNumberData.claimOpen <
                                      9
                                      ? "0" +
                                        this.state.DashboardNumberData.claimOpen
                                      : this.state.DashboardNumberData.claimOpen
                                    : null}
                                </span>
                                <small>Open</small>
                              </div>
                              <div>
                                <span className="card-value">
                                  {this.state.DashboardNumberData !== null
                                    ? this.state.DashboardNumberData
                                        .claimClose < 9
                                      ? "0" +
                                        this.state.DashboardNumberData
                                          .claimClose
                                      : this.state.DashboardNumberData
                                          .claimClose
                                    : null}
                                </span>
                                <small>Closed</small>
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </>
                )}
              </CardBody>
            </Card>
          </Collapse>
          <div className="container-fluid">
            <div
              className="table-cntr mt-3 mtictab table-responsive"
              style={{ overflow: "initial" }}
            >
              <div className="float-search" onClick={this.toggleSearch}>
                <small>{TitleChange}</small>
                {ImgChange}
              </div>
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
                              onClick={this.ViewSearchData.bind(this, 1)}
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
                              {/* <li> */}
                              {this.state.SearchListData !== null &&
                                this.state.SearchListData.map((item, i) => (
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
                                        {TranslationContext !== undefined
                                          ? TranslationContext.a.apply
                                          : "APPLY"}
                                      </a>
                                      <a
                                        href="#!"
                                        onClick={this.hadleSearchDeleteData.bind(
                                          this,
                                          item.searchParamID
                                        )}
                                      >
                                        <img
                                          src={DelSearch}
                                          alt="del-search"
                                          className="cr-pnt"
                                        // onClick={this.hadleSearchDeleteData.bind(
                                        //   this,
                                        //   item.searchParamID
                                        // )}
                                        />
                                      </a>
                                    </div>
                                  </li>
                                ))}
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
                                    display: this.state.CreateDateShowRecord,
                                  }}
                                >
                                  <DatePicker
                                    selected={
                                      // moment(
                                      this.state.ByDateCreatDate
                                      // ).format("YYYY-MM-DD")
                                    }
                                    onChange={this.handleByDateCreate.bind(
                                      this
                                    )}
                                    placeholderText={
                                      TranslationContext !== undefined
                                        ? TranslationContext.label.creationdate
                                        : "Creation Date"
                                    }
                                    showMonthDropdown
                                    showYearDropdown
                                    dateFormat="dd/MM/yyyy"
                                    value={
                                      // this.state.ByDateCreatDate == ""
                                      //   ? moment(
                                      //       this.state.ByDateCreatDate
                                      //     ).format("YYYY-MM-DD")
                                      //   :
                                      this.state.ByDateCreatDate
                                    }

                                  // className="form-control"
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
                                  // className="form-control"
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{
                                    display: this.state.SLAStatus,
                                  }}
                                >
                                  <select
                                    value={this.state.selectedSlaDueByDate}
                                    onChange={this.handleSlaDueByDate}
                                  >
                                    <option value="0">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.label.sladue
                                        : "SLA Due"}
                                    </option>
                                    {this.state.SlaDueData !== null &&
                                      this.state.SlaDueData.map((item, i) => (
                                        <option key={i} value={item.slaDueID}>
                                          {item.slaDueName}
                                        </option>
                                      ))}
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
                                          ? TranslationContext.label.sladue
                                          : "SLA Due"
                                      }
                                      closeMenuOnSelect={false}
                                      onChange={this.handleSlaDueByDate.bind(
                                        this
                                      )}
                                      value={this.state.selectedSlaDueByDate}
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
                                          ? TranslationContext.label
                                            .ticketstatus
                                          : "Ticket Status"
                                      }
                                      closeMenuOnSelect={false}
                                      onChange={this.handleTicketStatusByDate.bind(
                                        this
                                      )}
                                      value={
                                        this.state.selectedTicketStatusByDate
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
                                <div className="col-md-3 col-sm-6 mb-3 ">
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder={
                                      TranslationContext !== undefined
                                        ? TranslationContext.ticketingDashboard
                                          .customerName
                                        : "Customer Name"
                                    }
                                    name="NameByCustType"
                                    value={this.state.NameByCustType}
                                    onChange={this.handelOnchangeData}
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.MobileNo }}
                                >
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder={
                                      TranslationContext !== undefined
                                        ? TranslationContext.ticketingDashboard
                                          .customerMobileNo
                                        : "Customer Mobile No"
                                    }
                                    name="MobileNoByCustType"
                                    value={this.state.MobileNoByCustType}
                                    onChange={this.handelOnchangeData}
                                    maxLength={10}
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.Email }}
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
                                    value={this.state.EmailIdByCustType}
                                    onChange={this.handelOnchangeData}
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.TicketIDTitle }}
                                >
                                  <input
                                    type="text"
                                    className="no-bg"
                                    placeholder={
                                      TranslationContext !== undefined
                                        ? TranslationContext.label.ticketid
                                        : "Ticket ID"
                                    }
                                    name="TicketIdByCustType"
                                    maxLength={9}
                                    value={this.state.TicketIdByCustType}
                                    onChange={this.handelOnchangeData}
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.TicketStatus }}
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
                                          ? TranslationContext.label
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
                                  style={{ display: this.state.TicketPriority }}
                                >
                                  <div className="normal-dropdown">
                                    <Select
                                      getOptionLabel={(option) =>
                                        option.priortyName
                                      }
                                      getOptionValue={(option) =>
                                        option.priorityID
                                      }
                                      options={this.state.TicketPriorityData}
                                      placeholder={
                                        TranslationContext !== undefined
                                          ? TranslationContext.label.priority
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
                                  style={{ display: this.state.TicketSource }}
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
                                          ? TranslationContext.label
                                            .ticketstatus
                                          : "Ticket Status"
                                      }
                                      closeMenuOnSelect={false}
                                      onChange={this.handleTicketStatusByTicket.bind(
                                        this
                                      )}
                                      value={
                                        this.state.selectedTicketStatusByTicket
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
                                      options={this.state.ChannelOfPurchaseData}
                                      placeholder={
                                        window.localStorage.getItem('Programcode') === 'campusshoes' ?
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
                                        this.state.selectedChannelOfPurchase
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
                                      options={this.state.TicketActionTypeData}
                                      placeholder={
                                        TranslationContext !== undefined
                                          ? TranslationContext.label
                                            .ticketactiontype
                                          : "Ticket Action Type"
                                      }
                                      closeMenuOnSelect={false}
                                      onChange={this.setTicketActionTypeValue.bind(
                                        this
                                      )}
                                      value={
                                        this.state.selectedTicketActionType
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
                                  style={{ display: this.state.Category }}
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
                                          ? TranslationContext.label.category
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
                                  style={{ display: this.state.SubCategory }}
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
                                          ? TranslationContext.label.subcategory
                                          : "Sub Category"
                                      }
                                      closeMenuOnSelect={false}
                                      onChange={this.setSubCategoryValue.bind(
                                        this
                                      )}
                                      value={this.state.selectedSubCategory}
                                      isMulti
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.IssueType }}
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
                                          ? TranslationContext.label.issuetype
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
                                  style={{ display: this.state.TicketStatus }}
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
                                          ? TranslationContext.label
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
                                    display: this.state.CreateDateShowRecord,
                                  }}
                                >
                                  <DatePicker
                                    selected={this.state.ByAllCreateDate}
                                    placeholderText={
                                      TranslationContext !== undefined
                                        ? TranslationContext.label.creationdate
                                        : "Creation Date"
                                    }
                                    showMonthDropdown
                                    showYearDropdown
                                    dateFormat="dd/MM/yyyy"
                                    value={this.state.ByAllCreateDate}
                                    onChange={this.handleAllCreateDate.bind(
                                      this
                                    )}
                                  // className="form-control"
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.TicketSource }}
                                >
                                  <div className="normal-dropdown">
                                    <Select
                                      getOptionLabel={(option) =>
                                        option.ticketSourceName
                                      }
                                      getOptionValue={(option) =>
                                        option.ticketSourceId
                                      }
                                      options={this.state.TicketSourceData}
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
                                      value={this.state.selectedTicketSource}
                                      isMulti
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.ClaimID }}
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
                                    onChange={this.handelOnchangeData}
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.Email }}
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
                                    onChange={this.handleAllLastDate.bind(this)}
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
                                  style={{ display: this.state.TicketIDTitle }}
                                >
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder={
                                      TranslationContext !== undefined
                                        ? TranslationContext.ticketingDashboard
                                          .ticketIdtitle
                                        : "Ticket Id/Title"
                                    }
                                    value={this.state.TicketIdTitleByAll}
                                    name="TicketIdTitleByAll"
                                    onChange={this.handelOnchangeData}
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{
                                    display: this.state.InvoiceNoSubOrderNo,
                                  }}
                                >
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder={
                                      TranslationContext !== undefined
                                        ? TranslationContext.ticketingDashboard
                                          .invoiceNumberSubOrderNo
                                        : "Invoice Number/Sub Order No"
                                    }
                                    value={this.state.InvoiceSubOrderByAll}
                                    name="InvoiceSubOrderByAll"
                                    onChange={this.handelOnchangeData}
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.MobileNo }}
                                >
                                  <input
                                    className="no-bg"
                                    type="text"
                                    placeholder={
                                      TranslationContext !== undefined
                                        ? TranslationContext.label.mobile
                                        : "Mobile"
                                    }
                                    maxLength={10}
                                    value={this.state.MobileByAll}
                                    name="MobileByAll"
                                    onChange={this.handelOnchangeData}
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6 allspc"
                                  style={{ display: this.state.Category }}
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
                                          ? TranslationContext.label.category
                                          : "Category"
                                      }
                                      closeMenuOnSelect={false}
                                      onChange={this.setCategoryAllValue.bind(
                                        this
                                      )}
                                      value={this.state.selectedCategoryAll}
                                      isMulti
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.TicketPriority }}
                                >
                                  <div className="normal-dropdown">
                                    <Select
                                      getOptionLabel={(option) =>
                                        option.priortyName
                                      }
                                      getOptionValue={(option) =>
                                        option.priorityID
                                      }
                                      options={this.state.TicketPriorityData}
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
                                      value={this.state.selectedPriorityAll}
                                      isMulti
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.ItemID }}
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
                                    onChange={this.handelOnchangeData}
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.AssignTo }}
                                >
                                  <div className="normal-dropdown">
                                    <Select
                                      getOptionLabel={(option) =>
                                        option.fullName
                                      }
                                      getOptionValue={(option) => option.userID}
                                      options={this.state.AssignToData}
                                      placeholder={
                                        TranslationContext !== undefined
                                          ? TranslationContext.label.assignedto
                                          : "Select Assigned To"
                                      }
                                      closeMenuOnSelect={false}
                                      onChange={this.setAssignedToValue.bind(
                                        this
                                      )}
                                      value={this.state.selectedAssignedTo}
                                      isMulti
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-md-3 col-sm-6 allspc"
                                  style={{ display: this.state.SubCategory }}
                                >
                                  <div className="normal-dropdown">
                                    <Select
                                      getOptionLabel={(option) =>
                                        option.subCategoryName
                                      }
                                      getOptionValue={(option) =>
                                        option.subCategoryID
                                      }
                                      options={this.state.SubCategoryAllData}
                                      placeholder={
                                        TranslationContext !== undefined
                                          ? TranslationContext.label.subcategory
                                          : "Sub Category"
                                      }
                                      closeMenuOnSelect={false}
                                      onChange={this.setSubCategoryAllValue.bind(
                                        this
                                      )}
                                      value={this.state.selectedSubCategoryAll}
                                      isMulti
                                    />
                                  </div>
                                  {/* <select
                                    value={this.state.selectedSubCategoryAll}
                                    onChange={this.setSubCategoryAllValue}
                                  >
                                    <option value="0">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.label.subcategory
                                        : "Sub Category"}
                                    </option>
                                    {this.state.SubCategoryAllData !== null &&
                                      this.state.SubCategoryAllData.map(
                                        (item, i) => (
                                          <option
                                            key={i}
                                            value={item.subCategoryID}
                                          >
                                            {item.subCategoryName}
                                          </option>
                                        )
                                      )}
                                  </select> */}
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.TicketStatus }}
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
                                          ? TranslationContext.label.category
                                          : "Ticket Status"
                                      }
                                      closeMenuOnSelect={false}
                                      onChange={this.handleTicketStatusAll.bind(
                                        this
                                      )}
                                      value={this.state.selectedTicketStatusAll}
                                      isMulti
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.Didvisitstore }}
                                >
                                  <select
                                    value={this.state.selectedVisitStoreAll}
                                    onChange={this.handleVisitStoreAll}
                                  >
                                    <option value="all">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.ticketingDashboard
                                          .didvisitstoreall
                                        : "Did Visit Store : All"}
                                    </option>
                                    <option value="yes">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.ticketingDashboard
                                          .didvisitstoreyes
                                        : "Did Visit Store : Yes"}
                                    </option>
                                    <option value="no">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.ticketingDashboard
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
                                        ? TranslationContext.ticketingDashboard
                                          .purchasestorecodeaddress
                                        : "Purchase Store Code/Address"
                                    }
                                    value={
                                      this.state
                                        .selectedPurchaseStoreCodeAddressAll
                                    }
                                    onChange={
                                      this.handlePurchaseStoreCodeAddressAll
                                    }
                                  />
                                </div>
                                <div
                                  className="col-md-3 col-sm-6 allspc"
                                  style={{ display: this.state.IssueType }}
                                >
                                  <div className="normal-dropdown">
                                    <Select
                                      getOptionLabel={(option) =>
                                        option.issueTypeName
                                      }
                                      getOptionValue={(option) =>
                                        option.issueTypeID
                                      }
                                      options={this.state.IssueTypeAllData}
                                      placeholder={
                                        TranslationContext !== undefined
                                          ? TranslationContext.label.issuetype
                                          : "Issue Type"
                                      }
                                      closeMenuOnSelect={false}
                                      onChange={this.setIssueTypeAllValue.bind(
                                        this
                                      )}
                                      value={this.state.selectedIssueTypeAll}
                                      isMulti
                                    />
                                  </div>
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.SLAStatus }}
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
                                      this.state.SlaDueData.map((item, i) => (
                                        <option key={i} value={item.slaDueID}>
                                          {item.slaDueName}
                                        </option>
                                      ))}
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
                                          ? TranslationContext.label.sladue
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
                                  style={{ display: this.state.CSAT }}
                                >
                                  <select
                                    value={this.state.selectedCsatAll}
                                    onChange={this.setCSATAllValue}
                                  >
                                    <option value="">
                                      Select Ticket Rating
                                    </option>
                                    {this.state.CsatDdlData !== null &&
                                      this.state.CsatDdlData.map((item, i) => (
                                        <option key={i} value={item.value}>
                                          {item.name}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{
                                    display: this.state.Wanttovisitstore,
                                  }}
                                >
                                  <select
                                    value={
                                      this.state.selectedWantToVisitStoreAll
                                    }
                                    onChange={this.handleWantToVisitStoreAll}
                                  >
                                    <option value="all">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.ticketingDashboard
                                          .wantvisitstoreall
                                        : "Want to Visit Store : All"}
                                    </option>
                                    <option value="yes">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.ticketingDashboard
                                          .wantvisitstoreyes
                                        : "Want to Visit Store : Yes"}
                                    </option>
                                    <option value="no">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.ticketingDashboard
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
                                        ? TranslationContext.ticketingDashboard
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
                                <div
                                  className="col-md-3 col-sm-6"
                                  style={{ display: this.state.SLAStatus }}
                                >
                                  <select
                                    value={this.state.selectedescalationmanagement}
                                    onChange={this.setEscalationManagement}
                                  >
                                    <option value="0">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.label.escaltionmanagement
                                        : "Escalation to Management"}
                                    </option>
                                    {this.state.optionescalation !== null &&
                                      this.state.optionescalation.map((item, i) => (
                                        <option key={i} value={item.option}>
                                          {item.option}
                                        </option>
                                      ))}
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
                                          ? TranslationContext.label.sladue
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
                              </div>
                              <div className="row p-0">
                                <div className="col-md-6">
                                  <div className="row allspc">
                                    <div
                                      className="col-sm-6"
                                      style={{ display: this.state.WithClaim }}
                                    >
                                      <div className="m-b-25">
                                        <select
                                          value={
                                            this.state.selectedWithClaimAll
                                          }
                                          onChange={this.handleWithClaimAll}
                                        >
                                          <option value="no">
                                            {TranslationContext !== undefined
                                              ? TranslationContext
                                                .ticketingDashboard
                                                .WithClaimNo
                                              : "With Claim : No"}
                                          </option>
                                          <option value="yes">
                                            {TranslationContext !== undefined
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
                                                getOptionLabel={(option) =>
                                                  option.claimStatusName
                                                }
                                                getOptionValue={(option) =>
                                                  option.claimStatusID
                                                }
                                                options={
                                                  this.state.ClaimStatusData
                                                }
                                                placeholder={
                                                  TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.label
                                                      .claimstatus
                                                    : "Claim Status"
                                                }
                                                closeMenuOnSelect={false}
                                                onChange={this.handleClaimStatus.bind(
                                                  this
                                                )}
                                                value={
                                                  this.state.selectedClaimStatus
                                                }
                                                isMulti
                                              />
                                            </div>
                                          </div>

                                          <div className="m-b-25">
                                            <div className="normal-dropdown">
                                              <Select
                                                getOptionLabel={(option) =>
                                                  option.categoryName
                                                }
                                                getOptionValue={(option) =>
                                                  option.categoryID
                                                }
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
                                                getOptionLabel={(option) =>
                                                  option.subCategoryName
                                                }
                                                getOptionValue={(option) =>
                                                  option.subCategoryID
                                                }
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
                                                getOptionLabel={(option) =>
                                                  option.issueTypeName
                                                }
                                                getOptionValue={(option) =>
                                                  option.issueTypeID
                                                }
                                                options={
                                                  this.state.ClaimIssueTypeData
                                                }
                                                placeholder={
                                                  TranslationContext !==
                                                    undefined
                                                    ? TranslationContext
                                                      .ticketingDashboard
                                                      .claimissuetype
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
                                      style={{ display: this.state.WithTask }}
                                    >
                                      <div className="m-b-25">
                                        <select
                                          value={this.state.selectedWithTaskAll}
                                          onChange={this.handleWithTaskAll}
                                        >
                                          <option value="no">
                                            {TranslationContext !== undefined
                                              ? TranslationContext
                                                .ticketingDashboard.withtaskno
                                              : "With Task : No"}
                                          </option>
                                          <option value="yes">
                                            {TranslationContext !== undefined
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
                                                getOptionLabel={(option) =>
                                                  option.taskStatusName
                                                }
                                                getOptionValue={(option) =>
                                                  option.taskStatusID
                                                }
                                                options={
                                                  this.state.TaskStatusData
                                                }
                                                placeholder={
                                                  TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.option
                                                      .taskstatus
                                                    : "Task Status"
                                                }
                                                closeMenuOnSelect={false}
                                                onChange={this.handleTaskStatus.bind(
                                                  this
                                                )}
                                                value={
                                                  this.state.selectedTaskStatus
                                                }
                                                isMulti
                                              />
                                            </div>
                                          </div>

                                          <div className="m-b-25">
                                            <div className="normal-dropdown">
                                              <Select
                                                getOptionLabel={(option) =>
                                                  option.departmentName
                                                }
                                                getOptionValue={(option) =>
                                                  option.departmentID
                                                }
                                                options={
                                                  this.state.DepartmentData
                                                }
                                                placeholder={
                                                  TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.label
                                                      .taskdepartment
                                                    : "Task Department"
                                                }
                                                closeMenuOnSelect={false}
                                                onChange={this.setDepartmentValue.bind(
                                                  this
                                                )}
                                                value={
                                                  this.state.selectedDepartment
                                                }
                                                isMulti
                                              />
                                            </div>
                                          </div>

                                          <div className="">
                                            <div className="normal-dropdown">
                                              <Select
                                                getOptionLabel={(option) =>
                                                  option.funcationName
                                                }
                                                getOptionValue={(option) =>
                                                  option.functionID
                                                }
                                                options={
                                                  this.state.FunctionData
                                                }
                                                placeholder={
                                                  TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.label
                                                      .taskfunction
                                                    : "Task Function"
                                                }
                                                closeMenuOnSelect={false}
                                                onChange={this.setFunctionValue.bind(
                                                  this
                                                )}
                                                value={
                                                  this.state.selectedFunction
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
                                  {/* {this.state.resultCount < 9
                                    ? "0" + this.state.resultCount
                                    : this.state.resultCount} */}
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
                                  ? TranslationContext.label.clearsearch
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
                                // className="csv-button"
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
                                  ? TranslationContext.ticketingDashboard.csv
                                  : "CSV"}
                              </CSVLink>
                              <button
                                type="button"
                                onClick={this.ScheduleOpenModel}
                              >
                                <img
                                  className="sch-icon"
                                  src={Schedule}
                                  alt="schedule-icon"
                                />
                                {TranslationContext !== undefined
                                  ? TranslationContext.button.schedule
                                  : "Schedule"}
                              </button>
                              <Modal
                                onClose={this.ScheduleCloseModel}
                                open={this.state.Schedule}
                                modalId="ScheduleModel"
                                className="schedule-width"
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
                                        getOptionValue={
                                          (option) => option.userID //id
                                        }
                                        options={this.state.TeamMemberData}
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
                                    {this.state.selectScheduleDate === "230" ? (
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
                                            onChange={this.handleDailyDay}
                                          />
                                          <label className="every1">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label.day
                                              : "Day"}
                                          </label>
                                        </span>
                                      </div>
                                    ) : null}
                                    {this.state.selectScheduleDate === "231" ? (
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
                                          >
                                            {TranslationContext !== undefined
                                              ? TranslationContext.checkbox.mon
                                              : "Mon"}
                                          </Checkbox>
                                          <Checkbox
                                            onChange={this.handleWeeklyDays}
                                            value="Tue"
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
                                    {this.state.selectScheduleDate === "232" ? (
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
                                    {this.state.selectScheduleDate === "233" ? (
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
                                          />
                                          <label className="every1">
                                            {TranslationContext !== undefined
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
                                              onChange={this.handleWeekForWeek}
                                              value={
                                                this.state
                                                  .selectedNoOfWeekForWeek
                                              }
                                            >
                                              <option value="0">
                                                {TranslationContext !==
                                                  undefined
                                                  ? TranslationContext.button
                                                    .select
                                                  : "Select"}
                                              </option>
                                              <option value="2">
                                                {TranslationContext !==
                                                  undefined
                                                  ? TranslationContext.option
                                                    .second
                                                  : "Second"}
                                              </option>
                                              <option value="4">
                                                {TranslationContext !==
                                                  undefined
                                                  ? TranslationContext.a.four
                                                  : "Four"}
                                              </option>
                                            </select>
                                          </div>
                                          <div className="col-md-6">
                                            <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                                              <Select
                                                getOptionLabel={(option) =>
                                                  option.days
                                                }
                                                getOptionValue={
                                                  (option) => option.days //id
                                                }
                                                options={
                                                  this.state.NameOfDayForWeek
                                                }
                                                placeholder={
                                                  TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.button
                                                      .select
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
                                    {this.state.selectScheduleDate === "234" ? (
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
                                                getOptionLabel={(option) =>
                                                  option.month
                                                }
                                                getOptionValue={
                                                  (option) => option.month //id
                                                }
                                                options={
                                                  this.state.NameOfMonthForYear
                                                }
                                                placeholder={
                                                  TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.button
                                                      .select
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
                                            onChange={this.handleDayForYear}
                                          />
                                        </div>
                                      </div>
                                    ) : null}
                                    {this.state.selectScheduleDate === "235" ? (
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
                                                    ? TranslationContext.button
                                                      .select
                                                    : "Select"}
                                                </option>
                                                <option value="2">
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.option
                                                      .second
                                                    : "Second"}
                                                </option>
                                                <option value="4">
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.a.four
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
                                                getOptionLabel={(option) =>
                                                  option.days
                                                }
                                                getOptionValue={
                                                  (option) => option.days //id
                                                }
                                                options={
                                                  this.state.NameOfDayForYear
                                                }
                                                placeholder={
                                                  TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.button
                                                      .select
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
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label.to
                                              : "to"}
                                          </label>
                                          <div className="col-md-6">
                                            <div className="normal-dropdown mt-0 dropdown-setting1 schedule-multi">
                                              <Select
                                                getOptionLabel={(option) =>
                                                  option.month
                                                }
                                                getOptionValue={
                                                  (option) => option.month //id
                                                }
                                                options={
                                                  this.state
                                                    .NameOfMonthForDailyYear
                                                }
                                                placeholder={
                                                  TranslationContext !==
                                                    undefined
                                                    ? TranslationContext.button
                                                      .select
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
                                        value={this.state.selectedScheduleTime}
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
                                          {TranslationContext !== undefined
                                            ? TranslationContext.button.schedule
                                            : "SCHEDULE"}
                                        </label>
                                      </button>
                                    </div>
                                    <div onClick={this.ScheduleCloseModel}>
                                      <button
                                        type="button"
                                        className="scheduleBtncancel"
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.option.cancel
                                          : "CANCEL"}
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </Modal>
                              <button
                                className={
                                  this.state.ticketIds.length > 0
                                    ? // this.state.crmRole === "Bulk Assign"
                                    //   ? "btn-inv"
                                    //   : "dis-btn"
                                    "btn-inv"
                                    : "dis-btn"
                                }
                                onClick={
                                  this.state.ticketIds.length > 0
                                    ? // this.state.crmRole === "Bulk Assign" &&
                                    this.handleAssignModalOpen.bind(this)
                                    : null
                                }
                              >
                                <img
                                  src={Assign}
                                  className="assign-icon"
                                  alt="assign-icon"
                                />
                                {TranslationContext !== undefined
                                  ? TranslationContext.button.assign
                                  : "Bulk Assign"}
                              </button>
                              {window.localStorage.getItem("isTicketMerge") === 'true' && window.localStorage.getItem("isTicketMerge_Module") === 'true' ?
                                (<button
                                  className={
                                    this.state.ticketIds.length > 0
                                      ? "btn-inv"
                                      : "dis-btn"
                                  }
                                  onClick={
                                    this.state.ticketIds.length > 0 ? this.HandleTicketListModalOpen.bind(this) : null
                                  }
                                >
                                  {"Bulk Merge"}
                                </button>) : null}

                              <Modal
                                onClose={this.handleAssignModalClose.bind(this)}
                                open={this.state.AssignModal}
                                modalId="AssignPop-up"
                              >
                                <div className="assign-modal-headerDashboard">
                                  <a
                                    href="#!"
                                    onClick={this.handleAssignModalClose.bind(
                                      this
                                    )}
                                  >
                                    <img
                                      src={BlackLeftArrow}
                                      alt="black-left-arrow-icon"
                                      className="black-left-arrow"
                                    />
                                  </a>
                                  <label className="claim-details">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label.assignticketsto
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
                                        ? TranslationContext.label.firstname
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
                                        ? TranslationContext.label.lastname
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
                                      value={this.state.selectedDesignation}
                                      onChange={this.setDesignationValue}
                                    >
                                      <option>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.designation
                                          : "Designation"}
                                      </option>
                                      {this.state.DesignationData !== null &&
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
                                <div className="assign-modal-body">
                                  <ReactTable
                                    data={
                                      SearchAssignData !== null
                                        ? SearchAssignData
                                        : []
                                    }
                                    columns={[
                                      {
                                        Header: (
                                          <span>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label.agent
                                              : "Agent"}
                                          </span>
                                        ),
                                        accessor: "agent",
                                        sortable: false,
                                        filterable: false,
                                        Cell: (row) => {
                                          var ids = row.original["user_ID"];
                                          return (
                                            <div>
                                              <span>
                                                <img
                                                  src={Headphone2Img}
                                                  alt="headphone"
                                                  className="oval-55 assign-hdphone"
                                                  id={ids}
                                                />
                                                {row.original["agentName"]}
                                              </span>
                                            </div>
                                          );
                                        },
                                      },
                                      {
                                        Header: (
                                          <span>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .designation
                                              : "Designation"}
                                          </span>
                                        ),
                                        accessor: "designation",
                                        sortable: false,
                                        filterable: false,
                                      },
                                      {
                                        Header: (
                                          <span>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label.email
                                              : "Email"}
                                          </span>
                                        ),
                                        accessor: "email",
                                        sortable: false,
                                        filterable: false,
                                      },
                                    ]}
                                    defaultPageSize={5}
                                    minRows={3}
                                    showPagination={true}
                                    getTrProps={this.handleTicketDetails}
                                    className="assign-ticket-table"
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
                                        ? TranslationContext.ticketingDashboard
                                          .addremarks
                                        : "Add Remarks"
                                    }
                                    onChange={this.handleAssignRemark}
                                  ></textarea>
                                  {this.state.loading ? (
                                    <div className="loader-icon-cntr">
                                      <div className="loader-icon"></div>
                                    </div>
                                  ) : (
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
                                  )}
                                </div>
                              </Modal>

                              {/* ------------Modal for ticket searcing and merging------- */}
                              <Modal
                                open={this.state.searchticketmodal}
                                //onClose={this.HandleTicketListModalClose.bind(this)}
                                modalId="ticketlist-popup"
                                overlayId="logout-ovrly"
                              >
                                <div className="profilemodalmaindiv">
                                  <label><img
                                    src={MergeTicketImg}
                                    alt="eye"
                                    className="billImg"
                                  //title="Merge into Another Ticket"
                                  /></label>
                                  <label className="ml-2"><b>Merge Tickets</b></label>
                                  <div style={{ float: "right" }}>
                                    <img
                                      src={CancalImg}
                                      alt="cross-icon"
                                      className="pro-cross-icn"
                                      onClick={this.HandleTicketListModalClose.bind(this)}
                                    />
                                  </div>
                                  {
                                    this.state.tabCount === 1 && (
                                      <div>
                                        <div>
                                          <div className="col-md-12">
                                            <label className="ml-3 mt-2"><b>{this.state.selectedTicketCount}&nbsp; Ticket(s) Selected</b></label>
                                          </div>
                                          <div className="row profilemodalrow-1">

                                            <div className={"col-md-6 m-b-10"}>
                                              <label>Select more ticket(s)</label>
                                              <input
                                                type="text"
                                                maxLength={15}
                                                className="systemordersearch"
                                                placeholder={
                                                  TranslationContext !== undefined
                                                    ? TranslationContext.label
                                                      .searchbynamepincodecode
                                                    : "Ticket ID/Mobile"
                                                }
                                                //value={this.state.txtSearchTicket}
                                                name="SearchTicket"
                                                autoComplete="off"
                                                onChange={(e) => { this.handleGetSearchMergingTicket(e) }}
                                              />
                                              <img
                                                src={SearchBlackImg}
                                                alt="Search"
                                                className="systemorder-imgsearch"
                                              //onClick={this.handleGetSearchMergingTicket.bind(this)}
                                              />
                                            </div>
                                          </div>

                                          <div className="row" style={{ marginLeft: "25px" }}>
                                            <div className="col-md-12 padding-div">

                                              <div className="row customerTickets_tableheader">
                                                <div className="col-md-1">
                                                  <label className="modal-lbl1">
                                                    Ticket ID
                                                  </label>
                                                </div>
                                                <div className="col-md-2">
                                                  <label className="modal-lbl1">
                                                    Mobile Number
                                                  </label>
                                                </div>
                                                <div className="col-md-2">
                                                  <label className="modal-lbl1">
                                                    Ticket Title
                                                  </label>
                                                </div>
                                                <div className="col-md-1">
                                                  <label className="modal-lbl1">
                                                    Status
                                                  </label>
                                                </div>
                                                <div className="col-md-1">
                                                  <label className="modal-lbl1">

                                                  </label>
                                                </div>
                                                <div className="col-md-2">
                                                  <label className="modal-lbl1">
                                                    Category
                                                  </label>
                                                </div>
                                                <div className="col-md-2">
                                                  <label className="modal-lbl1">
                                                    Created Date
                                                  </label>
                                                </div>
                                                <div className="col-md-1">
                                                  <label className="modal-lbl1">
                                                    Action
                                                  </label>
                                                </div>
                                              </div>
                                              <div className='customerTicketBulkMerge'>
                                                {
                                                  this.state.loadingTickets === true ? (
                                                    <div className="loader-icon"></div>
                                                  ) : (this.state.mergingTicketsData.length > 0
                                                    ? (this.state.mergingTicketsData.map(
                                                      (item, index) => {
                                                        return (
                                                          <div>
                                                            <div className="row opn-ticketDiv">
                                                              <div className="col-md-1">

                                                                <label
                                                                  className="no-mdl textoverflowmodal"
                                                                  onClick={this.HandleRowClickPage_mergeTicket.bind(this, item.ticketID, item.ticketSource)}
                                                                ><a href="#">
                                                                    {item.ticketID}
                                                                  </a>
                                                                </label>

                                                              </div>
                                                              <div className="col-md-2">
                                                                <label className="mno-mdl textoverflowmodal">
                                                                  {item.customerPhoneNumber}
                                                                </label>
                                                              </div>
                                                              <div className="col-md-2">
                                                                <label className="mno-mdl textoverflowmodal">
                                                                  {item.message}
                                                                </label>
                                                              </div>
                                                              <div className="col-md-1">
                                                                <label className="mno-mdl textoverflowmodal">
                                                                  {item.ticketStatus}
                                                                </label>
                                                              </div>
                                                              <div className="col-md-1">
                                                                <label className="mno-mdl textoverflowmodal MyTicketListReact">
                                                                  {item.ticketMergeStatus === "parent" ?
                                                                    <span className="table-p table-yellow-btn">
                                                                      <label>Parent</label>
                                                                    </span>
                                                                    : null}
                                                                </label>
                                                              </div>
                                                              <div className="col-md-2">
                                                                <label className="mno-mdl textoverflowmodal">
                                                                  {item.ticketCategory}
                                                                </label>
                                                              </div>
                                                              <div className="col-md-2">
                                                                <label className="mno-mdl textoverflowmodal">
                                                                  {item.createdDate}
                                                                </label>
                                                              </div>
                                                              <div className="col-md-1">
                                                                <label className="no-mdl textoverflowmodal" onClick={this.HandleAddMoreTickets.bind(this, item)}>
                                                                  {/* <label className="no-mdl" onClick={() => this.handelCheckBoxCheckedChange(item.ticketID)}> */}
                                                                  <a>{"Add"}</a>
                                                                </label>
                                                              </div>
                                                            </div>

                                                          </div>
                                                        );
                                                      }
                                                    ))
                                                    : <div className='row '>
                                                      <div className='col-sm-12' style={{ textAlign: 'center' }}>No Tickets found !!!</div>
                                                    </div>)}
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row" style={{ marginLeft: "25px" }}>
                                            <div className="col-md-12 padding-div">


                                              <div className='customerTicketModal'>
                                                {(this.state.selectedMergingTickets.length > 0
                                                  && (this.state.selectedMergingTickets.map(
                                                    (item, index) => {
                                                      return (
                                                        <div className="ticketDetails_selectbox">
                                                          <div className="row">
                                                            <div className="col-md-8">
                                                              <label>Ticket ID : &nbsp;</label>{item.ticketID} <br></br>
                                                              <label> Ticket Source : &nbsp;</label>{item.ticketSourceType}<br></br>
                                                              <label> Ticket Subject : &nbsp;</label>{item.message}<br></br>
                                                              <label> Category : &nbsp;</label>{item.category}<br></br>
                                                              <label>Customer Mobile : &nbsp;</label>{item.customerPhoneNumber}<br></br>
                                                              <label> Created Date & Time : &nbsp;</label>{item.createdDate}
                                                            </div>
                                                            <div className="col-md-4">
                                                              <input type="radio" style={{ display: "inline" }} checked={item.ticketID === this.state.parentTicketId} onClick={() => this.handleParentTicket(item)} /> <label> Primary Ticket</label><br></br><br></br>
                                                              <label onClick={() => this.handleRemoveTicket(item)} >
                                                                <img src={BlackDeleteIcon}
                                                                  alt="Pencile" className="pencilImg1" title="Remove Ticket" />
                                                                &nbsp;Remove</label>
                                                            </div>

                                                          </div>


                                                        </div>
                                                      );
                                                    }
                                                  )))
                                                }
                                              </div>
                                            </div>
                                            <div className="col-md-12 mt-2">
                                              <input type="checkbox" name="Recepient" checked={this.state.isCopyRecepient} onChange={this.handleTicketFlagOnChange}></input>
                                              <label className="ml-1">Want to copy child mail recipients in the parent ticket</label>
                                            </div>
                                            <div className="col-md-12">
                                              <input type="checkbox" name="AutoReply" checked={this.state.isAutoReply} onChange={this.handleTicketFlagOnChange}></input>
                                              <label className="ml-1">Auto reply to customer about this merging</label>
                                            </div>
                                            <div className="col-md-12">
                                              <input type="checkbox" name="CopyContent" checked={this.state.isCopyContent} onChange={this.handleTicketFlagOnChange}></input>
                                              <label className="ml-1">Want to migrate child ticket email content/comments and attachment into parent ticket</label>
                                            </div>
                                          </div>

                                        </div>
                                        <div className="d-flex justify-content-end mt-2">
                                          <button onClick={this.HandleTicketMergingNext.bind(this)}>Save & Next</button>
                                        </div>
                                      </div>
                                    )
                                  }

                                  {
                                    this.state.tabCount === 2 && (
                                      <div className="">
                                        <div className="row mt-5">
                                          <div className="col-md-12">
                                            <label><b>Child Ticket Comment</b></label>
                                          </div>
                                        </div>
                                        <div className="mb-5 openticketbox-5">
                                          <div className="row ml-2 mt-1">
                                            <div className="col-md-12">
                                              <label>The ticket ID #Child_ticket_id was closed and merged with ticket id #[Parent ticket id] 'parent ticket subject</label>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="row mt-3">
                                          <div className="col-md-12">
                                            <label><b>Parent Ticket Comment</b></label>
                                          </div>
                                        </div>

                                        <div className="mb-5 openticketbox-6">
                                          <div className="row ml-2 mt-2">
                                            <div className="col-md-12">
                                              <label>Ticket ID # Child ticket ID '[Child ticket subject]' was closed and merged into this ticket.</label>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="d-flex justify-content-end mt-2">
                                          <button onClick={this.HandleTicketMergingBack.bind(this)}>Back</button>
                                          <button className="ml-2" disable={this.state.disableButtonmerged} onClick={this.HandleConfirmAndMerge.bind(this)}>
                                            {
                                              this.state.mergedLoader ?
                                                <img
                                                  src={loaderGif}
                                                  style={{ width: "20PX" }}
                                                />
                                                : " Merge"
                                            }
                                          </button>
                                        </div>
                                      </div>)
                                  }
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
                <div className="MyTicketListReact cus-head">
                  <ReactTable
                    data={this.state.SearchTicketData}
                    columns={[
                      {
                        Header: (
                          <span>
                            <div className="filter-type pink1 pinkmyticket">
                              <div className="filter-checkbox pink2 pinkmargin">
                                {/* {this.state.ShowGridCheckBox === true ? ( */}
                                <input
                                  type="checkbox"
                                  id="fil-aball"
                                  name="MyTicketListcheckbox[]"
                                  onChange={this.checkAllCheckbox.bind(this)}
                                />
                                {/* ) : null} */}
                                <label htmlFor="fil-aball" className="ticketid">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.label.id
                                    : "ID"}
                                </label>
                              </div>
                            </div>
                          </span>
                        ),
                        accessor: "ticketID",
                        sortable: false,
                        filterable: false,
                        Cell: (row) => {
                          return (
                            <span onClick={(e) => this.clickCheckbox(e)}>
                              <div className="filter-type pink1 pinkmyticket">
                                <div className="filter-checkbox pink2 pinkmargin">
                                  {/* {this.state.ShowGridCheckBox === true ? ( */}
                                  <input
                                    type="checkbox"
                                    id={"j" + row.original.ticketID}
                                    name="MyTicketListcheckbox[]"
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
                                  {/* ) : null} */}

                                  <label htmlFor={"j" + row.original.ticketID}>
                                    {row.original.ticketSourceType ===
                                      "Calls" ? (
                                      <img
                                        src={callgreen}
                                        alt="HeadPhone"
                                        className="headPhone3"
                                        title="Calls"
                                      />
                                    ) : row.original.ticketSourceType ===
                                      "Mails" ? (
                                      <img
                                        src={gmailimg}
                                        alt="HeadPhone"
                                        className="headPhone3"
                                        title="Mails"
                                      />
                                    ) : row.original.ticketSourceType ===
                                      "Facebook" ? (
                                      <img
                                        src={FacebookImg}
                                        alt="HeadPhone"
                                        className="headPhone3"
                                        title="Facebook"
                                      />
                                    ) : row.original.ticketSourceType ===
                                      "ChatBot" ? (
                                      <img
                                        src={Chatbot}
                                        alt="HeadPhone"
                                        className="headPhone3"
                                        title="ChatBot"
                                      />
                                    ) : row.original.ticketSourceType ===
                                      "Twitter" ? (
                                      <img
                                        src={Twitter}
                                        alt="HeadPhone"
                                        className="headPhone3 black-twitter"
                                        title="Twitter"
                                      />
                                    ) : row.original.ticketSourceType ===
                                      "TicketFromStore" ? (
                                      <img
                                        src={TicketFromStore}
                                        alt="HeadPhone"
                                        className="headPhone3"
                                        title="TicketFromStore"
                                      />
                                    )
                                      : row.original.ticketSourceType ===
                                        "Instagram" ? (
                                        <img
                                          src={instagram}
                                          alt="HeadPhone"
                                          className="headPhone3"
                                          title="TicketFromStore"
                                        />)
                                        : row.original.ticketSourceType ===
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
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "status",
                              TranslationContext !== undefined
                                ? TranslationContext.label.status
                                : "Status"
                            )}
                            className={this.state.statusColor}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.label.status
                              : "Status"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "ticketStatus",
                        sortable: false,
                        filterable: false,
                        Cell: (row) => {
                          if (row.original.ticketStatus === "Open") {
                            return (
                              <span className="table-b table-blue-btn">
                                <label>{row.original.ticketStatus}</label>
                              </span>
                            );
                          } else if (row.original.ticketStatus === "Resolved") {
                            return (
                              <span className="table-b table-green-btn">
                                <label>{row.original.ticketStatus}</label>
                              </span>
                            );
                          } else if (row.original.ticketStatus === "New") {
                            return (
                              <span className="table-b table-yellow-btn">
                                <label>{row.original.ticketStatus}</label>
                              </span>
                            );
                          } else if (row.original.ticketStatus === "Solved") {
                            return (
                              <span className="table-b table-green-btn">
                                <label>{row.original.ticketStatus}</label>
                              </span>
                            );
                          } else {
                            return (
                              <span className="table-b table-green-btn">
                                <label>{row.original.ticketStatus}</label>
                              </span>
                            );
                          }
                        },
                      },
                      {
                        Header: <span></span>,
                        accessor: "taskStatus",
                        sortable: false,
                        filterable: false,
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
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label.claim
                                            : "CLAIM"}
                                          :{row.original.claimStatus}
                                        </p>
                                        <div className="d-flex align-items-center">
                                          <div className="nw-chat">
                                            <img src={Chat} alt="chat" />
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
                        sortable: false,
                        filterable: false,
                        width: 45,
                        Cell: (row) => {
                          if (row.original.taskStatus !== "0/0") {
                            return (
                              <div>
                                <Popover
                                  content={
                                    <div className="dash-task-popup-new">
                                      <div className="d-flex justify-content-between align-items-center">
                                        <p className="m-b-0">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.nav.task
                                            : "TASK"}
                                          :{row.original.taskStatus}
                                        </p>
                                        {row.original.ticketCommentCount > 0 ? (
                                          <div className="d-flex align-items-center">
                                            {row.original.ticketCommentCount}
                                            {TranslationContext !== undefined
                                              ? TranslationContext.a.new
                                              : "NEW"}
                                            <div className="nw-chat">
                                              <img src={Chat} alt="chat" />
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
                          } else {
                            return (
                              <div>
                                <img
                                  className="task-icon-1 marginimg"
                                  src={TaskIconGray}
                                  alt="task-icon-gray"
                                />
                              </div>
                            );
                          }
                        },
                      },
                      {
                        Header: <span></span>,
                        accessor: "ticketMergeStatus",
                        sortable: false,
                        filterable: false,
                        width: 45,
                        Cell: (row) => {

                          return (
                            <div style={{ "margin-left": "-15px" }}>
                              {row.original.ticketMergeStatus === "parent" ?
                                <span className="table-p table-yellow-btn">
                                  <label>Parent</label>
                                </span>
                                : row.original.ticketMergeStatus === "child" ?
                                  <span className="table-p table-blue-btn">
                                    <label>Child</label>
                                  </span> : null}
                            </div>
                          );
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
                            {/* <span style={{ fontSize: "10px !important" }}>
                              {TranslationContext !== undefined
                                ? TranslationContext.span.latestmessage
                                : "Latest Message"}
                            </span> */}
                          </label>
                        ),
                        accessor: "message",
                        sortable: false,
                        filterable: false,
                        Cell: (row) => {
                          return (
                            <div>
                              {row.original.message.split("\n")[0]}
                              {/* /
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
                                    )[0].displayEnglishName || "Category"
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
                        filterable: false,
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
                                        {TranslationContext !== undefined
                                          ? TranslationContext.span.category
                                          : "Category"}
                                      </p>
                                      <p>{row.original.category}</p>
                                    </li>
                                    <li>
                                      <p>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.span.subcategory
                                          : "Sub Category"}
                                      </p>
                                      <p>{row.original.subCategory}</p>
                                    </li>
                                    <li>
                                      <p>
                                        {TranslationContext !== undefined
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
                                    TranslationContext.label.ticketpriority
                                    : this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Ticket Priority".toLowerCase()
                                    )[0].displayEnglishName ||
                                    "Ticket Priority"
                                  : TranslationContext !== undefined
                                    ? TranslationContext.label.ticketpriority
                                    : "Ticket Priority"
                                : TranslationContext !== undefined
                                  ? TranslationContext.label.ticketpriority
                                  : "Ticket Priority"
                              : TranslationContext !== undefined
                                ? TranslationContext.label.ticketpriority
                                : "Ticket Priority"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        accessor: "priority",
                        sortable: false,
                        filterable: false,
                        minWidth: 50,
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
                        sortable: false,
                        filterable: false,
                      },
                      {
                        Header: <span>Brand Name</span>,
                        accessor: "brand",
                        sortable: false,
                        filterable: false,
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
                        sortable: false,
                        filterable: false,
                        Cell: (row) => (
                          <span className="one-line-outer">
                            <label className="one-line">
                              {row.original.createdOn}
                            </label>

                            <Popover
                              content={
                                <div className="insertpop1 new-insertpop1">
                                  <ul className="dash-creation-popup">
                                    <li className="title">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.li.creationdetails
                                        : "Creation details"}
                                    </li>
                                    <li>
                                      <p>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.createdby
                                          : "Created by "}
                                        {row.original.createdBy}
                                      </p>
                                      <p>{row.original.createdago}</p>
                                    </li>
                                    <li>
                                      <p>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.assignedto
                                          : "Assigned to "}
                                        {row.original.assignedTo}
                                      </p>
                                      <p>{row.original.assignedago}</p>
                                    </li>
                                    <li>
                                      <p>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.p.updatedby
                                          : "Updated by "}
                                        {row.original.updatedBy}
                                      </p>
                                      <p>{row.original.updatedago}</p>
                                    </li>
                                    <li>
                                      <p>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.p
                                            .responsetimeremainingby
                                          : "Response time remaining by"}
                                      </p>
                                      <p>
                                        {row.original.responseTimeRemainingBy}
                                      </p>
                                    </li>
                                    <li>
                                      <p>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.p
                                            .responseoverdueby
                                          : "Response overdue by"}
                                      </p>
                                      <p>{row.original.responseOverdueBy}</p>
                                    </li>
                                    <li>
                                      <p>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.p
                                            .resolutionoverdueby
                                          : "Resolution overdue by"}
                                      </p>
                                      <p>{row.original.resolutionOverdueBy}</p>
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
                        ),
                      },
                    ]}
                    resizable={false}
                    defaultPageSize={this.state.postsPerPage}
                    showPagination={false}
                    getTrProps={this.HandleRowClickPage}
                    minRows="1"

                    noDataText={"No Data Found"}
                  // pageSizeOptions={}
                  // pageSize={}
                  // pages={}
                  />

                  {/* <Pagination
                    currentPage={this.state.currentPage}
                    totalSize={this.state.totalCount}
                    sizePerPage={this.state.postsPerPage}
                    changeCurrentPage={this.PaginationOnChange}
                    theme="bootstrap"
                  /> */}
                  <nav>
                    <ul className="pagination" style={{ margin: "15px", overflowX: "auto" }}>
                      <button className="page-item" style={{ minWidth: "20px", padding: "0px" }} disabled={currentPage === 1 ? true : false} onClick={() => this.handlePrevNext("prev")} >

                        ❮

                      </button>
                      {numberListdisplay.map((e, i) => {
                        return (
                          <li className={`page-item ${currentPage === e ? 'active' : ''}`} key={i}>
                            <a className="page-link" onClick={() => this.handlePageCLick(e)}>{e}</a>


                          </li>

                        )
                      })}


                      <button className="page-item" style={{ minWidth: "20px", padding: "0px" }} disabled={currentPage === this.state.tabletotalPages ? true : false} onClick={() => this.handlePrevNext("next")}>
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
              )}
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default Dashboard;
