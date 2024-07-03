import React, { Component, Fragment } from "react";
import ArrowLeftCircleBlue from "./../assets/Images/arrow-circle-left.png";
import ArrowImg from "./../assets/Images/arrow.png";
import RedHeadPhoneIcon from "./../assets/Images/headphone.png";
import MinusImg from "./../assets/Images/minus.png";
import CopyIcon from "./../assets/Images/past.png";
import CustomreIcon from "./../assets/Images/customer.png";
import AvatarBlackIcon from "./../assets/Images/avatar.png";
import OrderIcon from "./../assets/Images/order.png";
import CreditNote from "./../assets/Images/credit_note.png";
import StoreIcon from "./../assets/Images/store-tikcet-system.png";
import TaskIcon from "./../assets/Images/ticket.png";
import TicketLogoBlue from "./../assets/Images/ticket-blue.png";
import cross_circle_white from "./../assets/Images/cross_circle_white.svg";
import edit_white from "./../assets/Images/edit_white.svg";
import TicketSystemOrder from "./Tabs/TicketSystemOrder";
import TicketSystemTask from "./Tabs/TicketSystemTask";
import TicketSystemStore from "./Tabs/TicketSystemStore";
import Modal from "react-responsive-modal";
import CKEditor from "ckeditor4-react";
import PlusImg from "./../assets/Images/plus.png";
import CircleCancel from "./../assets/Images/Circle-cancel.png";
import moment from "moment";
import FileUpload from "./../assets/Images/file.png";
import ThumbTick from "./../assets/Images/thumbticket.png"; // Don't comment this line
import PDF from "./../assets/Images/pdf.png"; // Don't comment this line
import CSVi from "./../assets/Images/csvicon.png"; // Don't comment this line
import Excel from "./../assets/Images/excel.png"; // Don't comment this line
import Word from "./../assets/Images/word.png"; // Don't comment this line
import TxtLogo from "./../assets/Images/TxtIcon.png"; // Don't comment this line
import AppointmentLogo from "./../assets/Images/appointments.svg";
import tringleRight from "./../assets/Images/triangle_right_arrow_icon.svg";
import white_sync from "./../assets/Images/white_sync.svg";

import { faCalculator } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import KnowledgeLogo from "./../assets/Images/knowledge.png";
import CancelImg from "./../assets/Images/cancel.png";
import CopyBlue from "./../assets/Images/copyblue.png";
import ViewBlue from "./../assets/Images/viewblue.png";
import blueLeftArrow from "./../assets/Images/blueLeftArrow.svg";
import loaderGif from "./../assets/Images/loader.gif";

import config from "./../helpers/config";
import { Radio } from "antd";
import DatePicker from "react-datepicker";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SimpleReactValidator from "simple-react-validator";
import { authHeader } from "../helpers/authHeader";
import * as translationHI from "../translations/hindi";
import * as translationMA from "../translations/marathi";
import TicketSystemAppointment from "./Tabs/TicketSystemAppointment";
import { Switch } from "antd";
import { Tooltip, Button } from "antd";
import OpenTicket from "./Tabs/OpenTicket";
import ReactTable from "react-table";
import BlackDeleteIcon from "./../assets/Images/del-big.png";
import SearchBlackImg from "./../assets/Images/searchBlack.png";

class TicketSystem extends Component {
  constructor() {
    super();
    this.state = {
      showAddNote: false,
      InformStore: false,
      EditCustomer: false,
      mailFiled: {},
      mailData: [],
      TicketTitleData: [],
      CkEditorTemplateData: [],
      editorTemplateDetails: "",
      KbPopupData: [],
      BrandData: [],
      CategoryData: [],
      SubCategoryData: [],
      subSubCategoryData: [],
      selectedOrderData: [],
      SelectedItemData: [],
      selectedStoreIDs: [],
      IssueTypeData: [],
      TicketPriorityData: [],
      TicketPriorityDummyData: [],
      ChannelOfPurchaseData: [],
      selectedBusinessUnit: "",
      selectedSubBusinessUnit: "",
      subbusinessUnitData: [],
      businessUnitData: [],
      KbLink: false,
      Plus: false,
      CkOpen: false,
      TabIconColor: "nav-link active",
      fileText: 0,

      altEmailID: "",
      altNumber: "",
      customer_Id: 0,
      customerEmailId: "",
      customerPhoneNumber: "",
      customerName: "",
      ticketDetails: "",
      ticketSuggestion: {},
      ticketNote: "",
      selectedBrand: "",
      createdBy: 6,
      selectedCategory: "",
      selectedCategoryKB: "",
      selectedSubCategory: "",
      selectedSubSubCategory: "",
      selectedSubCategoryKB: "",
      selectedIssueType: "",
      selectedIssueTypeKB: "",
      selectedTicketPriority: 0,
      customerAttachOrder: 1,
      customerStoreStatus: 0,
      selectTicketTemplateId: 0,
      selectedTicketActionType: "201",
      selectedChannelOfPurchase: 0,
      selectedTemplateID: 0,
      priorityId: 0,
      escalationLevel: 0,
      customerData: {},
      CustData: {},
      customerDetails: {},
      tempName: "",
      details: {},
      editDOB: "",
      userCC: "",
      userBCC: "",
      selectedFile: "",
      mailBodyData: "",
      saveAsDraft: "SaveAsDraft",
      copied: false,
      copiedNumber: false,
      custVisit: 0,
      AlreadycustVisit: 0,
      taskMaster: [],
      file: [],
      SpacialEqmt: [
        {
          department: 25,
        },
        {
          department: 30,
        },
        {
          department: 50,
        },
        {
          department: 90,
        },
      ],
      titleSuggValue: "",
      toggleTitle: false,
      loading: false,
      imageView: "",
      ticketTitleCompulsion: "",
      ticketDetailsCompulsion: "",
      ticketBrandCompulsion: "",
      ticketCategoryCompulsion: "",
      ticketSubCategoryCompulsion: "",
      ticketIssueTypeCompulsion: "",
      channelPurchaseCompulsion: "",
      categoryKbCompulsion: "",
      subCategoryKbCompulsion: "",
      issueTypeKbCompulsion: "",
      userCcCount: 0,
      userBccCount: 0,
      FileData: [],
      idSizeArray: [],
      AssignToData: [],
      followUpIds: "",
      viewPolicyModel: false,
      placeholderData: [],
      ticketDetailID: 0,
      showOrderDetails: false,
      showStoreData: false,
      showTaskData: false,
      fileDummy: [],
      ckCusrsorPosition: 0,
      ckCusrsorData: "",
      translateLanguage: {},
      checkPriorityDetails: false,
      appointmentBookList: [],
      ticketFields: [],
      complaintCallData: [],
      customerTypeData: [],
      consultingDoctorData: [],
      purposeVisitData: [],
      consultingHospitalData: [],
      departmentData: [],
      unitNameData: [],
      unitCitytData: [],
      lOBData: [],
      ticketFiledNewInput: { CallBack: true },
      emailIDData: [],
      emailSenderID: "",
      emailFileCheck: false,
      rightSideTab: {
        Store: true,
        Order: true,
        Task: true,
        Appointment: true,
        TicketTitle: true,
      },
      // ticketFields: [],
      displayFieldError: {},
      displayField: {},
      fieldError: {},
      CurrentProgramCode: "",
      StoreList: {},
      validProgramcode: false,
      selectedStoreName: "",
      selectedStoreCode: "",
      selectedStoreAddress: "",
      selectedStoreCity: "",
      selectedStoreContactInfo: "",
      selectedStoreRegion: "",
      selectedStoreCountry: "",
      selectedMktPlace: "",
      selectedStoreEmail: "",
      MktList: {},
      selectedChannelOfPurchaseName: "",
      setdisablefield: true,
      loggedInUserId: 0,
      programCode: "",
      mobNumLength: "",
      countryCode: "",
      ecrData: [],
      selectedEcr: 0,
      searchType: "orderId_cre",
      creditSearchType: 'credit_note',
      showOrders: false,
      showCreditNote: false,
      isExtendCancel: "default",
      showExtendCredit: false,
      showCancelCredit: false,
      mobileOrders: [],
      orderList: [],
      isorderFromShop: false,
      unknowItemAttach: false,
      isDataAttached: false,
      orderIdTobeSearched: "",
      mobileNOtoSearch: "",
      order_number: "",
      isOrderSearchLoading: false,
      isOrderSearchCreditLoading: false,
      orderList: [],
      currentSubOrder: 0,
      subOrderShow: "defaultShow",
      cancelEligbleDetail: [],
      returnEligbleDetail: [],
      itemOrderHistory: [],
      returnItemDetail: [],
      cancelItemDetail: [],
      returnReason: "",
      cancelReason: "",
      mobileNoCreditNote: "",
      creditNoteOrderId: "",
      creditNotes: [],
      currentCreditNote: 0,
      extedDays: 0,
      extandReason: "",
      cancelExtandReason: "",
      isOrderSearchLoading: false,
      isOrderSearchCreditLoading: false,
      tenantFlags: {},
      resolutionData: [],
      selectedResolution: 0,
      isSubSubCategory_Dependent: false,
      isBusinessUnit_Dependent: false,
      isOminiAttach: false,
      selectedOminiItem: [],
      ccAve_searchType: "cc_OrderId",
      isCCAvenueSearchLoading: false,
      ccAvenueTobeSearched: "",
      ccAve_mobileNOtoSearch: "",
      ccAvenueMobileList: [],
      ccAvenueOrderList: [],
      showCCAv: false,
      programselect: "bataclub",
      EscalationStatusData: [],
      EscalationDate: "",
      EscalationSourceId: 0,
      DepartmentTeamName: [],
      DepartmentTeamID: 0,
      DepartmentEmailParam: "",
      orderDetailsData: [],
      openAddOrderUnk: false,
      itemtobeSearch: "",
      itemUnknowndata: [],
      ItemNameAdb: "",
      ItemCodeAdb: "",
      itemPriceUnk: 0,
      selectedItemDataUnknown: [],
      fileNew: [],
      FileDataNew: [],
      fileTextNew: 0,
      storeticketsrch: false,
      selectedStorePinCode: "",
    };
    this.validator = new SimpleReactValidator();
    this.showAddNoteFuncation = this.showAddNoteFuncation.bind(this);
    this.handleGetTicketTitleList = this.handleGetTicketTitleList.bind(this);
    this.handleCkEditorTemplate = this.handleCkEditorTemplate.bind(this);
    this.handleTicketChange = this.handleTicketChange.bind(this);
    this.handleKbLinkPopupSearch = this.handleKbLinkPopupSearch.bind(this);
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    // this.handleGetCategoryList = this.handleGetCategoryList.bind(this);
    this.handleGetSubCategoryList = this.handleGetSubCategoryList.bind(this);
    this.handleGetSubSubCategoryList = this.handleGetSubSubCategoryList.bind(this);
    this.handleGetBusinessUnit = this.handleGetBusinessUnit.bind(this);
    this.handleGetSubBusinessUnit = this.handleGetSubBusinessUnit.bind(this);
    this.handleGetIssueTypeList = this.handleGetIssueTypeList.bind(this);
    this.handleEditCustomerOpen = this.handleEditCustomerOpen.bind(this);
    this.handleCustomerStoreStatus = this.handleCustomerStoreStatus.bind(this);
    this.handlePlaceholderList = this.handlePlaceholderList.bind(this);
    this.handleCustomerAttachamentStatus = this.handleCustomerAttachamentStatus.bind(
      this
    );
    this.handleGetChannelOfPurchaseList = this.handleGetChannelOfPurchaseList.bind(
      this
    );
    this.handleGetTicketPriorityList = this.handleGetTicketPriorityList.bind(
      this
    );
    this.handleGetDefaultTicketPriorityList = this.handleGetDefaultTicketPriorityList.bind(
      this
    );
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.handleCopyToaster = this.handleCopyToaster.bind(this);
    this.handleGetAgentList = this.handleGetAgentList.bind(this);
    this.handleTicketAssignFollowUp = this.handleTicketAssignFollowUp.bind(
      this
    );
    this.handleviewPolicyModelOpen = this.handleviewPolicyModelOpen.bind(this);
    this.handleviewPolicyModelClose = this.handleviewPolicyModelClose.bind(
      this
    );
    this.handleGetTicketDetails = this.handleGetTicketDetails.bind(this);
    this.handleGetTaskNoteDetails = this.handleGetTaskNoteDetails.bind(this);
  }

  componentDidMount = async () => {
    var customerDetails = this.props.location.state;
    var ticket_Id = this.props.location.state;
    this.handleGetTicketField();
    this.handleGetescalationData()
    this.handleGetTeamDetails()
    if (customerDetails || ticket_Id) {
      var custId = customerDetails.customerId;
      var ticketid_ = ticket_Id.ticketDetailID;
      this.setState({
        customerDetails,
        customer_Id: custId,
        ticketDetailID: ticketid_,
      });
      this.handleGetCustomerData(custId);
      this.handleGetStoreList();
      this.handleGetBrandList();
      this.handleGetChannelOfPurchaseList();
      this.handleGetDefaultTicketPriorityList();
      this.handleGetAgentList();
      this.handlePlaceholderList();
      this.handleGetTicketFields();
      this.handleGetMktList();
      if (ticketid_) {
        this.handleGetTicketDetails(ticketid_);
        this.handleGetTaskNoteDetails(ticketid_);
      }
    } else {
      this.props.history.push("addSearchMyTicket");
    }
    document.addEventListener("mousedown", this.handleClickOutside);

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }

    this.handleGetComplaintCall();
    this.handleGetLOB();
    // this.handleGetDepartmentName();
    this.handleGetConsultingHospital();
    this.handleGetCustomerType();
    this.handleGetUnitName();
    this.handleGetUnitCity();
    this.handleGetPurposeOfVisit();
    // this.handleGetConsultingDoctor();
    this.handleGetEmailID();
    this.handleGetAssignToData();
    this.handleGetUserProfileData();
    this.handleGetProgramCode();

    let storeTicketSrch = (window.localStorage.getItem('isStoreAccess') === 'true') ? true : false;
    //let selectedStoreDetails = JSON.parse(window.localStorage.getItem('selectedStoreDetails'));
    let agentData = JSON.parse(window.localStorage.getItem('AgentData'));
    if (agentData != null) {
      this.setState({
        countryCode: agentData.countryCode,
        mobNumLength: agentData.mobNumberLength,
        storeticketsrch: storeTicketSrch,
        unknowItemAttach: storeTicketSrch ? true : false,
        //selectedTicketActionType: storeTicketSrch ? "201" : "",
        // selectedStoreCode: storeTicketSrch ? selectedStoreDetails.storeCode : "",
        // selectedStoreName: storeTicketSrch ? selectedStoreDetails.storeName : "",
        // selectedStorePinCode: storeTicketSrch ? selectedStoreDetails.pincode : "",
      })
    }
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  handleGetescalationData = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getEscalationStatusList",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          //let resolution = data.filter(ele => ele.id == self.state.selectetedParameters?.resolutionStatusId)
          self.setState({
            //selectedResolution: resolution.length ? resolution[0].name : '',
            EscalationStatusData: data
          });
          //console.log(resolution, "EscalationStatusData");
        } else {
          self.setState({ EscalationStatusData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetTeamDetails = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Team/GetTeamDetails",
      headers: authHeader(),
      params: {
        TeamID: 0,
        Search: null,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          //let resolution = data.filter(ele => ele.id == self.state.selectetedParameters?.resolutionStatusId)
          self.setState({
            //selectedResolution: resolution.length ? resolution[0].name : '',
            DepartmentTeamName: data
          });
          //console.log(resolution, "EscalationStatusData");
        } else {
          self.setState({ DepartmentTeamName: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });

  }
  handleGetTicketField = () => {
    // //
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
          self.setState({
            ticketFields: data.ticketFieldsLst,
            tenantFlags: data.tenantFeatureConfiguration
          });
          self.handleSetFieldsValidation();
          self.handleDisplayField();
          if (data.tenantFeatureConfiguration.isResolutionStatus) {
            self.handleGetResolutionData()
          }
        } else {
          self.setState({ ticketFields: [] });
        }
      })
      .catch((error) => console.log(error));
  };

  //get resolution dropdown data
  handleGetResolutionData = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getResolutionStatusList",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            resolutionData: data
          });
        } else {
          self.setState({ resolutionData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleDisplayField = () => {
    let ticketFields = this.state.ticketFields;
    let displayField = this.state.displayField;
    for (let i = 0; i < ticketFields.length; i++) {
      displayField[ticketFields[i].fieldName] = ticketFields[i].createPage;
    }
    this.setState({
      displayField,
    }, () => {
      console.log("this.state.displayField", this.state.displayField)
    });
  };
  handleSetFieldsValidation = () => {
    var displayFieldError = this.state.displayFieldError;
    var ticketFields = this.state.ticketFields;
    for (let i = 0; i < ticketFields.length; i++) {
      displayFieldError[ticketFields[i].fieldName] =
        ticketFields[i].fieldMandatory;
    }
    this.setState({
      displayFieldError,
    }, console.log("displayFieldError", this.state.displayFieldError));
  };
  handleValidation(ActionTypeId) {
    let displayFieldError = this.state.displayFieldError;
    let ticketFiledNewInput = this.state.ticketFiledNewInput;
    let fieldError = {};
    let formIsValid = true;

    if (displayFieldError["Ticket Title"]) {
      if (this.state.titleSuggValue) {
        if (!this.state.titleSuggValue.trim()) {
          formIsValid = false;
          fieldError["Ticket Title"] = "Ticket title is compulsory.";
        }
      } else {
        formIsValid = false;
        fieldError["Ticket Title"] = "Ticket title is compulsory.";
      }
    }

    if (displayFieldError["Ticket Details"]) {
      if (this.state.ticketDetails) {
        if (!this.state.ticketDetails.trim()) {
          formIsValid = false;
          fieldError["Ticket Details"] = "Ticket title is compulsory.";
        }
      } else {
        formIsValid = false;
        fieldError["Ticket Details"] = "Ticket details is compulsory.";
      }
    }

    if (displayFieldError["Customer Type"]) {
      if (ticketFiledNewInput.CustomerType == "Select") {
        formIsValid = false;
        fieldError["Customer Type"] = "Customer type is compulsory.";
      }
    }
    if (displayFieldError["Complaint Call"]) {
      if (
        !ticketFiledNewInput.ComplaintCall ||
        ticketFiledNewInput.ComplaintCall == "Select"
      ) {
        formIsValid = false;
        fieldError["Complaint Call"] = "Complaint call is compulsory.";
      }
    }

    if (displayFieldError["Brand"]) {
      if (!this.state.selectedBrand) {
        formIsValid = false;
        fieldError["Brand"] = "Brand is compulsory.";
      }
    }
    if (displayFieldError["Category"]) {
      if (this.state.selectedCategory == "" || this.state.selectedCategory === "Select Category") {
        formIsValid = false;
        fieldError["Category"] = "Category is compulsory.";
      }
    }
    if (displayFieldError["Sub Category"]) {
      if (this.state.selectedSubCategory == "" || this.state.selectedSubCategory === "Select Sub Category") {
        formIsValid = false;
        fieldError["Sub Category"] = "Sub Category is compulsory.";
      }
    }
    if (displayFieldError["Issue Type"]) {
      if (!this.state.selectedIssueType) {
        formIsValid = false;
        fieldError["Issue Type"] = "Issue Type is compulsory.";
      }
    }
    if (displayFieldError["ECR"]) {
      if (!this.state.selectedEcr) {
        formIsValid = false;
        fieldError["ECR"] = "ECR is compulsory.";
      }
    }
    if (displayFieldError["ResolutionStatusId"]) {
      if (this.state.selectedTicketActionType === "200") {
        if (!this.state.selectedResolution) {
          formIsValid = false;
          fieldError["ResolutionStatusId"] = "Resolution is compulsory.";
        }
      }
    }
    if (displayFieldError["BusinessUnit"]) {
      if (this.state.selectedBusinessUnit == "" || this.state.selectedBusinessUnit === "Select Business unit") {
        formIsValid = false;
        fieldError["Business Unit"] = "Business Unit is compulsory.";
      }
    }
    if (displayFieldError["Sub Business Unit"]) {
      if (!this.state.selectedBusinessUnit) {
        formIsValid = false;
        fieldError["Sub Business Unit"] = "Sub Business Unit is compulsory.";
      }
    }
    if (displayFieldError["SubSubCategoryId"]) {
      if (this.state.selectedSubSubCategory == "" || this.state.selectedSubSubCategory === "Select Sub Sub CategoryId") {
        formIsValid = false;
        fieldError["Sub Sub Category"] = "Sub Sub Category is compulsory.";
      }
    }

    if (displayFieldError["Channel Of Purchase"]) {
      if (this.state.selectedChannelOfPurchase === 0 || this.state.selectedChannelOfPurchase == "" || this.state.selectedChannelOfPurchase === "Select") {
        formIsValid = false;
        fieldError["Channel Of Purchase"] =
          "Channel Of Purchase is compulsory.";
      }
    }
    if (displayFieldError["Unit Name"]) {
      if (
        !ticketFiledNewInput.UnitName ||
        ticketFiledNewInput.UnitName == "Select"
      ) {
        formIsValid = false;
        fieldError["Unit Name"] = "Unit Name is compulsory.";
      }
    }
    if (displayFieldError["Purpose Of Visit"]) {
      if (
        !ticketFiledNewInput.PurposeOfVisit ||
        ticketFiledNewInput.PurposeOfVisit == "Select"
      ) {
        formIsValid = false;
        fieldError["Purpose Of Visit"] = "Purpose Of Visit is compulsory.";
      }
    }
    if (ActionTypeId === "202") {
      if (this.state.EscalationDate === "" || this.state.EscalationDate === undefined || this.state.EscalationSourceId === "" || this.state.EscalationSourceId === undefined) {
        formIsValid = false;
        NotificationManager.error("Please check Escalation Status and Date");
      }
    }
    if (displayFieldError["Consulting Doctor"]) {
      if (
        !ticketFiledNewInput.ConsultingDoctor ||
        ticketFiledNewInput.ConsultingDoctor == "Select"
      ) {
        formIsValid = false;
        fieldError["Consulting Doctor"] = "Consulting Doctor is compulsory.";
      }
    }
    if (displayFieldError["Department Name"]) {
      if (
        !ticketFiledNewInput.DepartmentName ||
        ticketFiledNewInput.DepartmentName == "Select"
      ) {
        formIsValid = false;
        fieldError["Department Name"] = "Department Name is compulsory.";
      }
    }
    if (displayFieldError["Consulting Hospital"]) {
      if (
        !ticketFiledNewInput.ConsultingHospital ||
        ticketFiledNewInput.ConsultingHospital == "Select"
      ) {
        formIsValid = false;
        fieldError["Consulting Hospital"] =
          "Consulting Hospital is compulsory.";
      }
    }
    if (displayFieldError["Unit City"]) {
      if (
        !ticketFiledNewInput.UnitCity ||
        ticketFiledNewInput.UnitCity == "Select"
      ) {
        formIsValid = false;
        fieldError["Unit City"] = "Unit City is compulsory.";
      }
    }
    if (displayFieldError["LOB"]) {
      if (!ticketFiledNewInput.LOB || ticketFiledNewInput.LOB == "Select") {
        formIsValid = false;
        fieldError["LOB"] = "LOB is compulsory.";
      }
    }
    if (displayFieldError["Appointment DateTime"]) {
      if (!ticketFiledNewInput.AppointmentDate) {
        formIsValid = false;
        fieldError["Appointment DateTime"] =
          "Appointment DateTime is compulsory.";
      }
    }
    if (displayFieldError["Add Note"]) {
      if (!this.state.ticketNote) {
        formIsValid = false;
        fieldError["Add Note"] = "Add Note is compulsory.";
      }
    }
    if (displayFieldError["Auto Escalate"]) {
      if (!this.state.escalationLevel) {
        formIsValid = false;
        fieldError["Auto Escalate"] = "Auto Escalate is compulsory.";
      }
    }
    if (this.state.selectedTicketActionType == "201") {
      if (displayFieldError["AssignToNew"]) {
        if (
          !ticketFiledNewInput.AssignTo ||
          ticketFiledNewInput.AssignTo == "Select"
        ) {
          formIsValid = false;
          fieldError["AssignToNew"] = "AssignToNew is compulsory.";
        }
      }
    }
    // if (this.state.programCode === "organicindia") {
    //   if (this.state.selectedChannelOfPurchaseName == "d2c") {
    //     if (displayFieldError["Store Code"]) {
    //       if (this.state.selectedStoreName === "") {
    //         formIsValid = false;
    //         fieldError["Store Code"] = "Store Code is compulsory.";
    //       }
    //     }
    //     if (displayFieldError["Store Name"]) {
    //       if (this.state.selectedStoreCode === "") {
    //         formIsValid = false;
    //         fieldError["Store Name"] = "Store Name is compulsory.";
    //       }
    //     }
    //   }
    //   if (this.state.selectedChannelOfPurchaseName == "retail") {
    //     if (displayFieldError["Store Name"]) {
    //       if (this.state.selectedStoreName === "") {
    //         formIsValid = false;
    //         fieldError["Store Name"] = "Store Name is compulsory.";
    //       }
    //     }
    //     if (displayFieldError["Store Address"]) {
    //       if (this.state.selectedStoreAddress === "") {
    //         formIsValid = false;
    //         fieldError["Store Address"] = "Store Address is compulsory.";
    //       }
    //     }
    //     if (displayFieldError["Store City"]) {
    //       if (this.state.selectedStoreCity === "") {
    //         formIsValid = false;
    //         fieldError["Store City"] = "Store City is compulsory.";
    //       }
    //     }
    //     if (displayFieldError["Store Phone No"]) {
    //       if (this.state.selectedStoreContactInfo === "") {
    //         formIsValid = false;
    //         fieldError["Store Phone No"] = "Store Phone No is compulsory.";
    //       }
    //     }
    //     if (displayFieldError["Store Email ID"]) {
    //       if (this.state.selectedStoreContactInfo === "") {
    //         formIsValid = false;
    //         fieldError["Store Email ID"] = "Store Email ID is compulsory.";
    //       }
    //     }
    //   }
    //   if (this.state.selectedChannelOfPurchaseName == "export") {
    //     if (displayFieldError["Region"]) {
    //       if (this.state.selectedStoreRegion === "") {
    //         formIsValid = false;
    //         fieldError["Region"] = "Region is compulsory.";
    //       }
    //     }
    //     if (displayFieldError["Country"]) {
    //       if (this.state.selectedStoreCountry === "") {
    //         formIsValid = false;
    //         fieldError["Country"] = "Country is compulsory.";
    //       }
    //     }
    //   }
    //   if (this.state.selectedChannelOfPurchaseName == "mktplace") {
    //     if (displayFieldError["Mkt-Place"]) {
    //       if (this.state.selectedMktPlace === "") {
    //         formIsValid = false;
    //         fieldError["Mkt-Place"] = "Mkt-Place is compulsory.";
    //       }
    //     }
    //   }
    // }
    this.setState({ fieldError });
    return formIsValid;
  }

  // Added by Sandy 14 mar 2024 Start
  handleStoreValidation() {
    let displayFieldError = this.state.displayFieldError;
    let ticketFiledNewInput = this.state.ticketFiledNewInput;
    let fieldError = {};
    let formIsValid = true;

    if (displayFieldError["Ticket Title"]) {
      if (this.state.titleSuggValue) {
        if (!this.state.titleSuggValue.trim()) {
          formIsValid = false;
          fieldError["Ticket Title"] = "Ticket title is compulsory.";
        }
      } else {
        formIsValid = false;
        fieldError["Ticket Title"] = "Ticket title is compulsory.";
      }
    }

    if (displayFieldError["Ticket Details"]) {
      if (this.state.ticketDetails) {
        if (!this.state.ticketDetails.trim()) {
          formIsValid = false;
          fieldError["Ticket Details"] = "Ticket title is compulsory.";
        }
      } else {
        formIsValid = false;
        fieldError["Ticket Details"] = "Ticket details is compulsory.";
      }
    }

    if (displayFieldError["Category"]) {
      if (this.state.selectedCategory == "" || this.state.selectedCategory === "Select Category") {
        formIsValid = false;
        fieldError["Category"] = "Category is compulsory.";
      }
    }
    if (displayFieldError["Sub Category"]) {
      if (this.state.selectedSubCategory == "" || this.state.selectedSubCategory === "Select Sub Category") {
        formIsValid = false;
        fieldError["Sub Category"] = "Sub Category is compulsory.";
      }
    }

    if (displayFieldError["SubSubCategoryId"]) {
      if (this.state.selectedSubSubCategory == "" || this.state.selectedSubSubCategory === "Select Sub Sub CategoryId") {
        formIsValid = false;
        fieldError["Sub Sub Category"] = "Sub Sub Category is compulsory.";
      }
    }

    if (displayFieldError["Department Name"]) {
      if (
        !ticketFiledNewInput.DepartmentName ||
        ticketFiledNewInput.DepartmentName == "Select"
      ) {
        formIsValid = false;
        fieldError["Department Name"] = "Department Name is compulsory.";
      }
    }
    this.setState({ fieldError });
    return formIsValid;
  }
  // Added by Sandy 14 mar 2024 End
  handleSubmit(id) {
    const TranslationContext = this.state.translateLanguage.default;
    let displayFieldError = this.state.displayFieldError;
    if (this.state.storeticketsrch) {
      if (this.handleStoreValidation()) {
        this.handleCREATE_TICKET(id);
        if (this.state.appointmentBookList.length > 0) {
          this.handleCreateAppointment();
        }
      }
    } else {
      if (displayFieldError["Ticket Priority"]) {
        if (this.state.selectedTicketPriority > 0) {
          if (this.handleValidation(id)) {
            this.handleCREATE_TICKET(id);
            if (this.state.appointmentBookList.length > 0) {
              this.handleCreateAppointment();
            }
          }
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.ticketingDashboard.pleaseselectticketpriority
              : "Please Select Ticket Priority.",
            "",
            2000
          );
        }
      } else {
        if (this.handleValidation(id)) {
          this.handleCREATE_TICKET(id);
          if (this.state.appointmentBookList.length > 0) {
            this.handleCreateAppointment();
          }
        }
      }
    }

  }

  handleCopyToaster() {
    const TranslationContext = this.state.translateLanguage.default;
    setTimeout(() => {
      if (
        this.state.copiedNumber &&
        this.state.customerData.customerPhoneNumber
      ) {
        NotificationManager.success(
          TranslationContext !== undefined
            ? TranslationContext.span.copied
            : "Copied."
        );
      }
    }, 100);
  }
  handleviewPolicyModelOpen = () => {
    this.setState({ viewPolicyModel: true });
  };
  handleviewPolicyModelClose = () => {
    this.setState({ viewPolicyModel: false });
  };
  toggleTitleSuggestion() {
    this.setState({ toggleTitle: true });
  }
  HandleKbLinkModalOpen() {
    this.setState({ KbLink: true });
  }
  HandleKbLinkModalClose() {
    this.setState({
      KbLink: false,
    });
  }
  handleThumbModalOpen() {
    this.setState({ Plus: true });
  }
  handleThumbModalClose() {
    this.setState({ Plus: false });
  }
  handleExpandedCkClose() {
    this.setState({ CkOpen: false });
  }
  handleExpandedCkOpen() {
    this.setState({ CkOpen: true });
  }
  handleEditCustomerOpen() {
    this.setState({ EditCustomer: true });
  }
  handleTaskMasterChange = (taskData) => {
    this.setState({
      taskMaster: taskData,
    });
  };

  setPlaceholderValue(e) {
    let ckData = this.state.editorTemplateDetails;
    let ckDataArr = ckData.split("\n\n");
    let ckDataArrNew = [];
    for (let i = 0; i < ckDataArr.length; i++) {
      const element1 = ckDataArr[i].replace(/<[^>]+>/g, "");
      const element2 = element1.replace(/&nbsp;/g, " ");
      const element = element2.replace(/\n/g, " ");
      ckDataArrNew.push(element);
    }
    let selectedVal = "",
      loopFlag = true,
      ckTags,
      selectedArr;
    for (let i = 0; i < ckDataArrNew.length; i++) {
      if (loopFlag) {
        if (this.state.ckCusrsorData.trim() == ckDataArrNew[i].trim()) {
          selectedVal = ckDataArrNew[i];
          selectedArr = i;
          ckTags = ckDataArr[i].match(/<[^>]+>/g);
          loopFlag = false;
        }
      }
    }
    let ckDataArrLast = selectedVal;
    let textBefore = ckDataArrLast.substring(0, this.state.ckCusrsorPosition);
    let textAfter = ckDataArrLast.substring(
      this.state.ckCusrsorPosition,
      ckDataArrLast.length
    );
    let matchedArr = this.state.placeholderData.filter(
      (x) => x.mailParameterID == e.currentTarget.value
    );
    let placeholderName = matchedArr[0].parameterName;
    ckDataArrLast = textBefore + " " + placeholderName + textAfter;
    let newCkCusrsorPosition =
      this.state.ckCusrsorPosition + placeholderName.length + 1;
    this.setState({
      ckCusrsorPosition: newCkCusrsorPosition,
      ckCusrsorData: ckDataArrLast,
    });
    if (ckTags) {
      let ckFinal = ckTags[0] + ckDataArrLast + ckTags[1];
      ckDataArr.splice(selectedArr, 1, ckFinal);
      ckData = ckDataArr.join(" ");
    }
    if (ckTags) {
      this.setState({ editorTemplateDetails: ckData });
    } else {
      this.setState({ editorTemplateDetails: ckDataArrLast });
    }
  }

  handlePlaceholderList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Template/GetMailParameter",
      headers: authHeader(),
      params: {
        AlertID: 8,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            placeholderData: data,
          });
        } else {
          self.setState({
            placeholderData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleCustomerAttachamentStatus(custAttachOrder) {
    this.setState({
      customerAttachOrder: custAttachOrder,
    });
  }
  handleGetOrderId = (selectParentData, selectChildData) => {
    this.setState({
      selectedOrderData: selectParentData,
      SelectedItemData: selectChildData,
    });
  };
  handleGetItemData = (selectChildData) => {
    this.setState({
      SelectedItemData: selectChildData,
    });
  };
  handleGetStoreId = (selectedStoreData) => {
    this.setState({
      selectedStoreIDs: selectedStoreData,
    });
  };
  handleCustomerStoreStatus(WantVisit, AlreadyCustomerVisit) {
    this.setState({
      custVisit: WantVisit,
      AlreadycustVisit: AlreadyCustomerVisit,
    });
  }
  handleEditCustomerClose() {
    this.setState({
      EditCustomer: false,
      customerName: "",
      customerPhoneNumber: "",
      customerEmailId: "",
      genderID: 1,
      dob: "",
      altNumber: "",
      altEmailID: "",
    });
    this.validator.hideMessages();
  }
  GenderonChange = (e) => {
    const value = e.target.value;
    let CustData = this.state.CustData;
    CustData.genderID = value;
    this.setState({ CustData });
  };
  handleChange = (date) => {
    let CustData = this.state.CustData;
    CustData.editDOB = date;

    this.setState({
      CustData,
      editDOB: date
    });
  };
  showAddNoteFuncation() {
    const { showAddNote } = this.state;
    this.setState({
      showAddNote: !showAddNote,
      ticketNote: "",
    });
  }
  showInformStoreFuncation = () => {
    this.setState({
      InformStore: !this.state.InformStore,
    });
  };
  handleOnChangeData = (e) => {
    const { name, value } = e.target;
    let details = this.state.CustData;
    details[name] = value;
    this.setState({ details });
  };
  handleEscalationChange() {
    this.setState({
      escalationLevel: 1,
    });
  }
  handlechangebtntab(e) {
    var idIndex = e.target.className;
    this.setState({ TabIconColor: idIndex });
  }

  handleTicketChange(e) {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  }
  handleMailOnChange(filed, e) {
    var mailFiled = this.state.mailFiled;
    mailFiled[filed] = e.target.value;

    if (filed === "userCC") {
      var CcCount = mailFiled.userCC;
      var finalCount = CcCount.split(",");
      this.setState({ mailFiled, userCcCount: finalCount.length });
    } else {
      var BCcCount = mailFiled.userBCC;
      var finalCount = BCcCount.split(",");
      this.setState({ mailFiled, userBccCount: finalCount.length });
    }
  }
  handleUpdateCustomer() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    if (this.validator.allValid()) {
      if (this.state.CustData.altEmail === this.state.CustData.custEmailId) {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard
              .emailidandalternateemailidfieldscannotbesame
            : "Email ID and Alternate Email ID fields cannot be same."
        );
      } else {
        axios({
          method: "post",
          url: config.apiUrl + "/Customer/updateCustomer",
          headers: authHeader(),
          data: {
            CustomerID: this.state.CustData.customerID,
            CustomerName: this.state.CustData.customername,
            CustomerPhoneNumber: this.state.CustData.customerPhone,
            CustomerEmailId: this.state.CustData.custEmailId,
            GenderID: this.state.CustData.genderID,
            AltNumber: this.state.CustData.altNo,
            AltEmailID: this.state.CustData.altEmail,
            CreatedBy: this.state.createdBy,
            DateOfBirth: this.state.CustData.editDOB === "" ? "" : moment(this.state.CustData.editDOB).format("L"),
            IsActive: 1,
          },
        })
          .then(function (res) {
            let Message = res.data.message;
            if (Message === "Success") {
              NotificationManager.success(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.recordupdatedsuccessfully
                  : "Record updated successfully."
              );
              self.componentDidMount();
              self.handleEditCustomerClose.bind(this);
            }
          })
          .catch((res) => {
            console.log(res);
          });
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }
  handleGetTicketTitleList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/gettitlesuggestions",
      headers: authHeader(),
      params: {
        TikcketTitle: this.state.titleSuggValue,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ TicketTitleData: data });
        } else {
          self.setState({ TicketTitleData: [] });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }
  handleCkEditorTemplate() {
    // let self = this;
    // axios({
    //   method: "post",
    //   url: config.apiUrl + "/Template/getListOfTemplateForNote",
    //   headers: authHeader(),
    //   params: {
    //     IssueTypeID: this.state.selectedIssueType,
    //   },
    // })
    //   .then(function (res) {
    //     let data = res.data.responseData;
    //     self.setState({ CkEditorTemplateData: data });
    //   })
    //   .catch((data) => {
    //     console.log(data);
    //   });
    let self = this;
    let parameter =
      window.localStorage.getItem('Programcode') === "campusshoes" ?
        {
          categoryId: self.state.selectedCategory,
          subCategoryId: self.state.selectedSubCategory,
          subSubCategoryId: self.state.selectedSubSubCategory,
          issueTypeId: self.state.selectedIssueType,
        }
        :
        {
          categoryId: 0,
          subCategoryId: 0,
          subSubCategoryId: 0,
          issueTypeId: self.state.selectedIssueType,
        }
    axios({
      method: "post",
      url: config.apiUrl + "/Template/getListOfTemplateForMessage",
      headers: authHeader(),
      params: parameter
    })
      .then(function (res) {
        // if (res.data.statusCode === 200) {
        let data = res.data.responseData;
        self.setState({
          CkEditorTemplateData: data,
        })
        // }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleCkEditorTemplateData(tempId, tempName) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Template/getTemplateContent",
      headers: authHeader(),
      params: {
        TemplateId: tempId,
      },
    })
      .then(function (res) {
        let data = res.data.responseData.templateBody;
        let bodyData = res.data.responseData.templateBody;
        self.setState({
          editorTemplateDetails: data,
          tempName: tempName,
          selectTicketTemplateId: tempId,
          mailBodyData: bodyData,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleKbLinkPopupSearch() {
    const TranslationContext = this.state.translateLanguage.default;
    if (
      this.state.selectedCategoryKB.length > 0 &&
      this.state.selectedSubCategoryKB.length > 0 &&
      this.state.selectedIssueTypeKB.length > 0
    ) {
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/KnowledgeBase/searchbycategory",
        headers: authHeader(),
        params: {
          Type_ID: this.state.selectedIssueTypeKB,
          Category_ID: this.state.selectedCategoryKB,
          SubCategor_ID: this.state.selectedSubCategoryKB,
        },
      })
        .then(function (res) {
          let KbPopupData = res.data.responseData;
          if (KbPopupData.length === 0 || KbPopupData === null) {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.label.norecordfound
                : "No Record Found."
            );
          }
          self.setState({ KbPopupData: KbPopupData });
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        categoryKbCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.categoryfieldiscompulsory
            : "Category field is compulsory.",
        subCategoryKbCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.subcategoryfieldiscompulsory
            : "Sub Category field is compulsory.",
        issueTypeKbCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.issuetypefieldiscompulsory
            : "Issue Type field is compulsory.",
      });
    }
  }
  handleGetBrandList = () => {

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader(),
      params: {
        allbrand: true,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            BrandData: data,
            isSubSubCategory_Dependent: data[0].isSubSubCategory,
            isBusinessUnit_Dependent: data[0].isBusinessUnit
          });
          if (data.length === 1) {
            // //
            self.setState({
              selectedBrand: data[0].brandID,
            }, () => {
              if (data[0].isBusinessUnit === true) {
                self.handleGetBusinessUnit();
                self.handleGetCategoryList();
              } else {
                self.handleGetCategoryList();
              }
            });
            // this.setBrandValues();


            // setTimeout(() => {
            //   if (window.localStorage.getItem('Programcode') === "campusshoes") {
            //     this.handleGetBusinessUnit();
            //   } else {
            //     this.handleGetCategoryList();
            //   }
            // }, 500)


            // self.handleGetCategoryList();
            // self.handleGetBusinessUnit();
          }
        } else {
          self.setState({ BrandData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };
  handleGetCategoryList = () => {
    let self = this;

    var brand_Id = parseInt(self.state.selectedBrand);
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryList",
      headers: authHeader(),
      params: {
        BrandID: brand_Id,
        businessUnitId: window.localStorage.getItem('Programcode') === "campusshoes" ? self.state.selectedBusinessUnit : 0
      },
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

    let cateId = this.state.KbLink
      ? this.state.selectedCategoryKB
      : this.state.selectedCategory;
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

  handleGetSubSubCategoryList() {
    // //
    let self = this;

    let cateId = this.state.KbLink
      ? this.state.selectedSubCategoryKB
      : this.state.selectedSubCategory;
    axios({
      method: "post",
      url: config.apiUrl + "/SubSubCategory/GetSubSubCategoryBySubCategoryID",
      headers: authHeader(),
      params: {
        SubCategoryID: cateId,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ subSubCategoryData: data });
        } else {
          self.setState({ subSubCategoryData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }


  handleGetBusinessUnit() {
    let self = this;
    // //
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetBusinessUnitList",
      headers: authHeader(),
      // params: {
      //   SubCategoryID: this.state.selectetedParameters.subCategoryID,
      // },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ businessUnitData: data });
        } else {
          self.setState({ businessUnitData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetSubBusinessUnit() {
    let self = this;
    // //
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetSubBusinessUnitList",
      headers: authHeader(),
      params: {
        businessUnitId: this.state.selectedBusinessUnit,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ subbusinessUnitData: data });
        } else {
          self.setState({ subbusinessUnitData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }



  handleGetIssueTypeList() {
    let self = this;

    let subCateId = this.state.KbLink
      ? this.state.selectedSubSubCategoryKB
      : this.state.selectedSubSubCategory;
    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/GetIssueTypeList",
      headers: authHeader(),
      params: {
        // SubCategoryID: window.localStorage.getItem('Programcode') === "campusshoes" ? subCateId : this.state.selectedSubCategory,
        // isSubSubCategory: window.localStorage.getItem('Programcode') === "campusshoes" ? true : false,
        SubCategoryID: self.state.isSubSubCategory_Dependent ? subCateId : this.state.selectedSubCategory,
        isSubSubCategory: self.state.isSubSubCategory_Dependent

      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ IssueTypeData: data });

          // ecr
          if (window.localStorage.getItem('Programcode') === "bataclub") {
            // if (self.state.displayTicketFields["ECR"]) {
            if (data.length === 1) {
              self.setState({
                selectedIssueType: data[0]?.issueTypeID
              })
            }
            self.handleGetTicketPriorityList();
            self.handleGetEcrData()
          }
        } else {
          self.setState({ IssueTypeData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  // ECR Data
  handleGetEcrData = () => {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/Master/GetEcrBySubSubCategoryId",
      headers: authHeader(),
      params: {
        subSubCategoryId: this.state.selectedSubSubCategory
        // subSubCategoryId: 131
      }
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          // parameter["priorityID"] = data?.priorityId
          // parameter["ecrId"] = data?.ecrID;
          self.setState({
            ecrData: data,
            selectedTicketPriority: data?.priorityId,
            selectedEcr: data?.ecrID,
          });
        } else {
          self.setState({ ecrData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetTicketPriorityList() {
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/SLA/ValidateSLAByIssueTypeID",
      headers: authHeader(),
      params: {
        issueTypeID: Number(this.state.selectedIssueType),
        ticketID: 0,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            TicketPriorityData: data,
            checkPriorityDetails: false,
          });
        } else {
          self.setState({ TicketPriorityData: [], checkPriorityDetails: true });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetDefaultTicketPriorityList() {
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
          self.setState({
            TicketPriorityData: data,
            TicketPriorityDummyData: data,
            checkPriorityDetails: false,
          });
        } else {
          self.setState({ TicketPriorityData: [], checkPriorityDetails: true });
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
  handleGetAssignToData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetAssignUser",
      headers: authHeader(),
      params: {
        UnitID: 0,
        Search: null,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ assignToData: data });
        } else {
          self.setState({ assignToData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetAgentList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/getagentlist",
      headers: authHeader(),
      params: {
        TicketID: 0, // Don't remove this Zexo
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            AssignToData: data,
          });
          self.checkAllAgentStart();
        } else {
          self.setState({
            AssignToData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetCustomerData(CustId, mode) {
    this.setState({ loading: true });
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Customer/getcustomerdetailsbyid",
      headers: authHeader(),
      params: {
        CustomerID: CustId,
      },
    })
      .then(function (res) {
        var CustMsg = res.data.message;
        var customerData = res.data.responseData;
        var CustData = res.data.responseData;
        CustData.customerPhone = CustData.customerPhoneNumber;
        CustData.customername = CustData.customerName;
        CustData.custEmailId = CustData.customerEmailId;
        CustData.altNo = CustData.altNumber;
        CustData.altEmail = CustData.altEmailID;
        CustData.editDOB = CustData.dob;
        if (CustMsg === "Success") {
          if (self.state.customerTypeData.length > 0) {
            let ticketFiledNewInput = self.state.ticketFiledNewInput;
            if (CustData.isExist === 1) {
              ticketFiledNewInput[
                "CustomerType"
              ] = self.state.customerTypeData.filter(
                (x) => x.customerType_Name == "Existing"
              )[0].customerType_Id;
            } else if (CustData.isExist === 0) {
              ticketFiledNewInput[
                "CustomerType"
              ] = self.state.customerTypeData.filter(
                (x) => x.customerType_Name == "New"
              )[0].customerType_Id;
            } else {
              ticketFiledNewInput["CustomerType"] = null;
            }
            self.setState({
              ticketFiledNewInput,
            });
          }
          self.setState({ customerData: customerData, loading: false });
          self.handleEditCustomerClose();
        }
        if (mode === "Edit") {
          self.handleEditCustomerOpen();
          self.setState({ customerData: customerData, CustData });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  setAssignedToValue(e) {
    let assign = e.currentTarget.value;
    let followUpIds = this.state.followUpIds;
    followUpIds += assign + ",";
    let ckData = this.state.editorTemplateDetails;
    let ckDataArr = ckData.split("\n\n");
    let ckDataArrNew = [];
    for (let i = 0; i < ckDataArr.length; i++) {
      const element1 = ckDataArr[i].replace(/<[^>]+>/g, "");
      const element2 = element1.replace(/&nbsp;/g, " ");
      const element = element2.replace(/\n/g, " ");
      ckDataArrNew.push(element);
    }
    let selectedVal = "",
      loopFlag = true,
      ckTags,
      selectedArr;
    for (let i = 0; i < ckDataArrNew.length; i++) {
      if (loopFlag) {
        if (this.state.ckCusrsorData.trim() == ckDataArrNew[i].trim()) {
          selectedVal = ckDataArrNew[i];
          selectedArr = i;
          ckTags = ckDataArr[i].match(/<[^>]+>/g);
          loopFlag = false;
        }
      }
    }
    let ckDataArrLast = selectedVal;
    let textBefore = ckDataArrLast.substring(0, this.state.ckCusrsorPosition);
    let textAfter = ckDataArrLast.substring(
      this.state.ckCusrsorPosition,
      ckDataArrLast.length
    );
    let matchedArr = this.state.AssignToData.filter(
      (x) => x.user_ID == e.currentTarget.value
    );
    let userName = matchedArr[0].agentName;
    ckDataArrLast = textBefore + " @" + userName + textAfter;
    let newCkCusrsorPosition =
      this.state.ckCusrsorPosition + userName.length + 2;
    this.setState({
      ckCusrsorPosition: newCkCusrsorPosition,
      ckCusrsorData: ckDataArrLast,
    });
    if (ckTags) {
      let ckFinal = ckTags[0] + ckDataArrLast + ckTags[1];
      ckDataArr.splice(selectedArr, 1, ckFinal);
      ckData = ckDataArr.join(" ");
    }
    if (ckTags) {
      this.setState({ editorTemplateDetails: ckData, followUpIds });
    } else {
      this.setState({ editorTemplateDetails: ckDataArrLast, followUpIds });
    }
  }
  handleTicketAssignFollowUp(ticketID_) {
    let followUpIds = this.state.followUpIds.substring(
      0,
      this.state.followUpIds.length - 1
    );
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/ticketassigforfollowup",
      headers: authHeader(),
      params: {
        TicketID: ticketID_,
        FollowUPUserID: followUpIds,
      },
    })
      .then(function (res) {
        let status = res.data.status;
        if (status) {
          self.setState({
            followUpIds: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  setWrapperRef(node) {
    this.wrapperRef = node;
  }
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ TicketTitleData: [] });
    }
  }
  handleTicketSuggestion = (ticketSuggestion) => {
    this.setState({ ticketSuggestion });
  };
  onAddCKEditorChange = (evt) => {
    var newContent = evt.editor.getData();
    var cursorPosition = evt.editor.getSelection().getRanges()[0];
    this.setState({
      editorTemplateDetails: newContent,
    });
  };
  onCkBlur = (evt) => {
    var ckCusrsorPosition = evt.editor.getSelection().getRanges()[0];
    var ckCusrsorData = evt.editor.getSelection().getRanges()[0].endContainer.$
      .wholeText;
    if (!ckCusrsorData) {
      ckCusrsorData = "";
    }
    this.setState({
      ckCusrsorPosition: ckCusrsorPosition.startOffset,
      ckCusrsorData,
    });
  };

  handleAppendTicketSuggestion = (e) => {
    this.setState({ toggleTitle: true });
    var startPoint = document.getElementById("titleSuggestion").selectionStart;
    var textLength = document.getElementById("titleSuggestion").value.length;
    var textBefore = document
      .getElementById("titleSuggestion")
      .value.substring(0, startPoint);
    var textBeforeArr = textBefore.split(" ");
    textBeforeArr.pop();
    textBeforeArr.push(e.currentTarget.title);
    textBefore = textBeforeArr.join(" ");
    var textAfter = document
      .getElementById("titleSuggestion")
      .value.substring(startPoint, textLength);
    let titleSuggValue = this.state.titleSuggValue;
    titleSuggValue = textBefore + " " + textAfter;

    this.setState({ titleSuggValue });
    this.searchInput.focus();
  };
  handleTicSugg = (e) => {
    let ticSugg = e.currentTarget.value;
    this.setState({ titleSuggValue: ticSugg });
    setTimeout(() => {
      if (this.state.titleSuggValue.length > 2) {
        this.handleGetTicketTitleList();
      } else {
        this.setState({
          TicketTitleData: [],
        });
      }
    }, 1);
  };
  handleFileUpload(e) {
    var allFiles = [];
    var selectedFiles = e.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      allFiles.push(selectedFiles[i]);
    }

    // -------------------------Image View code start-----------------------
    if (e.target.files && e.target.files[0]) {
      const filesAmount = e.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const reader = new FileReader();
        reader.onload = (file) => {
          this.setState({
            imageView: file.target.result,
          });
        };
        reader.readAsDataURL(e.target.files[i]);
      }
    }
    for (let i = 0; i < e.target.files.length; i++) {
      var objFile = new Object();
      var name = e.target.files[i].name;
      var value = e.target.value;
      var type = name.substring(name.lastIndexOf(".") + 1, name.length);
      objFile.Type = type;
      objFile.name = name;
      objFile.value = value;

      objFile.File = e.target.files[i];
      const file = e.target.files[i];

      this.state.file.push(objFile);
      this.state.FileData.push(file);
    }
    //-------------------Image View code end-----------------------
    this.setState({ fileText: this.state.file.length, FileData: allFiles });
  }
  handleRemoveImage(i) {
    let file = this.state.file;
    file.splice(i, 1);
    var fileText = file.length;
    setTimeout(() => {
      this.setState({ file, fileText });
    }, 100);
  }
  handleAttachment(e) {
    var allFiles = [];
    var selectedFiles = e.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      allFiles.push(selectedFiles[i]);
    }


    // if (e.target.files && e.target.files[0]) {
    //   const filesAmount = e.target.files.length;
    //   for (let i = 0; i < filesAmount; i++) {
    //     const reader = new FileReader();
    //     reader.onload = (file) => {
    //       this.setState({
    //         imageView: file.target.result,
    //       });
    //     };
    //     reader.readAsDataURL(e.target.files[i]);
    //   }
    // }
    for (let i = 0; i < e.target.files.length; i++) {
      var objFile = new Object();
      var name = e.target.files[i].name;
      var value = e.target.value;
      var type = name.substring(name.lastIndexOf(".") + 1, name.length);
      objFile.Type = type;
      objFile.name = name;
      objFile.value = value;

      objFile.File = e.target.files[i];
      const file = e.target.files[i];

      this.state.fileNew.push(objFile);
      this.state.FileDataNew.push(file);
    }

    this.setState({ fileTextNew: this.state.fileNew.length, FileDataNew: allFiles }, () => {
      console.log("FileDataNew", this.state.FileDataNew)

    });
  }
  handleRemoveImageNew(i) {
    let fileNew = this.state.fileNew;
    fileNew.splice(i, 1);
    var fileTextNew = fileNew.length;
    setTimeout(() => {
      this.setState({ fileNew, fileTextNew });
    }, 100);
  }

  handleCREATE_TICKET(StatusID) {
    const TranslationContext = this.state.translateLanguage.default;
    // if (this.state.selectedTicketPriority > 0) {
    // if (
    //   this.state.titleSuggValue.length > 0 &&
    //   this.state.ticketDetails.length > 0 &&
    //   this.state.selectedBrand > 0 &&
    //   this.state.selectedCategory > 0 &&
    //   this.state.selectedSubCategory > 0 &&
    //   this.state.selectedIssueType > 0 &&
    //   this.state.selectedChannelOfPurchase > 0
    // ) {
    let self = this;
    var selectedRow = "";
    var order_masterId = 0;
    if (this.state.selectedOrderData.length > 0) {
      order_masterId = this.state.selectedOrderData[0]["orderMasterID"];
    }

    // --------------New Code start---------------
    if (this.state.SelectedItemData.length === 0) {
      for (let j = 0; j < this.state.selectedOrderData.length; j++) {
        selectedRow +=
          this.state.selectedOrderData[j]["orderMasterID"] + "|0|1,";
      }
    } else {
      for (let i = 0; i < this.state.SelectedItemData.length; i++) {
        selectedRow +=
          this.state.SelectedItemData[i]["orderItemID"] +
          "|" +
          this.state.SelectedItemData[i]["requireSize"] +
          "|0,";
      }
    }
    // --------------New Code end-----------------
    var selectedStore = "";
    for (let j = 0; j < this.state.selectedStoreIDs.length; j++) {
      var PurposeID = this.state.selectedStoreIDs[j]["purposeId"];

      if (PurposeID === "0") {
        // Send Id as 1 and 2 from API
        PurposeID = 1;
      } else {
        PurposeID = 2;
      }

      var visitDate = "";
      if (
        this.state.selectedStoreIDs[j]["StoreVisitDate"] === null ||
        this.state.selectedStoreIDs[j]["StoreVisitDate"] === undefined ||
        this.state.selectedStoreIDs[j]["StoreVisitDate"] === ""
      ) {
        visitDate = "";
      } else {
        visitDate = moment(
          this.state.selectedStoreIDs[j]["StoreVisitDate"]
        ).format("YYYY-MM-DD");
      }

      selectedStore +=
        this.state.selectedStoreIDs[j]["storeID"] +
        "|" +
        visitDate +
        "|" +
        PurposeID +
        ",";
    }
    var actionStatusId = 0;
    if (StatusID === "200") {
      actionStatusId = 103;
    } else if (StatusID === "201" || StatusID === "202") {
      if (this.state.programCode === "organicindia") {
        actionStatusId = 102;
      } else {
        actionStatusId = 101;
      }
    } else {
      actionStatusId = 100;
    }
    if (this.state.editorTemplateDetails && !this.state.emailSenderID) {
      NotificationManager.error("Please Select Email Sender ID.");
      return false;
    }
    var mailData = [];
    mailData = this.state.mailData;
    this.state.mailFiled["FromEmail"] = this.state.emailSenderID;
    this.state.mailFiled["ToEmail"] = this.state.customerData.customerEmailId;
    this.state.mailFiled["TikcketMailSubject"] = this.state.titleSuggValue;
    this.state.mailFiled["TicketMailBody"] = this.state.editorTemplateDetails;
    this.state.mailFiled["PriorityID"] = this.state.selectedTicketPriority;
    this.state.mailFiled["IsInforToStore"] = this.state.InformStore;
    mailData.push(this.state.mailFiled);

    const formData = new FormData();
    this.setState({ loading: true });
    var paramData = {
      TicketTitle: this.state.titleSuggValue,
      Ticketdescription: this.state.ticketDetails,
      CustomerID: this.state.customer_Id,
      BrandID: this.state.selectedBrand,
      CategoryID: this.state.selectedCategory,
      SubCategoryID: this.state.selectedSubCategory,
      SubSubCategoryID: this.state.selectedSubSubCategory == "" ? 0 : parseInt(this.state.selectedSubSubCategory),
      businessUnitId: this.state.selectedBusinessUnit == "" ? 0 : parseInt(this.state.selectedBusinessUnit),
      subBusinessUnitId: this.state.selectedSubBusinessUnit == "" ? 0 : parseInt(this.state.selectedSubBusinessUnit),
      IssueTypeID: this.state.selectedIssueType,
      PriorityID: this.state.selectedTicketPriority,
      ChannelOfPurchaseID: this.state.selectedChannelOfPurchase,
      Ticketnotes: this.state.ticketNote,
      taskMasters: this.state.taskMaster,
      StatusID: actionStatusId,
      TicketActionID: this.state.selectedTicketActionType,
      IsInstantEscalateToHighLevel: this.state.escalationLevel,
      IsWantToAttachOrder: this.state.customerAttachOrder,
      TicketTemplateID: this.state.selectTicketTemplateId,
      TicketMailBody: this.state.editorTemplateDetails,
      IsWantToVisitedStore: this.state.custVisit,
      IsAlreadyVisitedStore: this.state.AlreadycustVisit,
      TicketSourceID: 1,
      StoreCode: this.state.selectedStoreCode,
      StoreName: this.state.selectedStoreName,
      StoreCity: this.state.selectedStoreCity,
      StoreAddress: this.state.selectedStoreAddress,
      StorePhoneNo: this.state.selectedStoreContactInfo,
      Country: this.state.selectedStoreCountry,
      Region: this.state.selectedStoreRegion,
      MktPlace: this.state.selectedMktPlace,
      StoreEmailID: this.state.selectedStoreEmail,
      StorePinCode: this.state.selectedStorePinCode,
      OrderItemID: selectedRow.substring(",", selectedRow.length - 1),
      StoreID: selectedStore.substring(",", selectedStore.length - 1),
      ticketingMailerQues: mailData,
      OrderMasterID: order_masterId,
      appointmentDetail: this.state.appointmentBookList,
      CustomerType: this.state.ticketFiledNewInput.CustomerType || 2,
      ConsultingHospital:
        this.state.ticketFiledNewInput.ConsultingHospital || 0,
      PurposeOfVisit: this.state.ticketFiledNewInput.PurposeOfVisit || 0,
      ConsultingDoctor: this.state.ticketFiledNewInput.ConsultingDoctor || 0,
      UnitName: this.state.ticketFiledNewInput.UnitName || 0,
      UnitCity: this.state.ticketFiledNewInput.UnitCity || 0,
      LOB: this.state.ticketFiledNewInput.LOB || 0,
      ComplaintCall: this.state.ticketFiledNewInput.ComplaintCall || 0,
      DepartmentName: this.state.ticketFiledNewInput.DepartmentName || 0,
      AppointmnetDatetime: this.state.ticketFiledNewInput.AppointmentDate
        ? moment(this.state.ticketFiledNewInput.AppointmentDate).format("YYYY-MM-DD hh:mm A")
        : null,
      CallBackDateTime:
        this.state.ticketFiledNewInput.CallBackDate
          ? moment(this.state.ticketFiledNewInput.CallBackDate).format("YYYY-MM-DD hh:mm A")
          : null,
      CallBack:
        this.state.ticketFiledNewInput.CallBack ? this.state.ticketFiledNewInput.CallBack : false,
      AssignedID:
        this.state.selectedTicketActionType === "200"
          ? `${this.state.loggedInUserId}`
          : this.state.ticketFiledNewInput.AssignTo,
      ecrId: this.state.selectedEcr,
      resolutionStatusId: this.state.selectedResolution,
      EscalationDate: this.state.EscalationDate || "",
      EscalationSourceId: this.state.EscalationSourceId || 0,
      DepartmentId: this.state.DepartmentTeamID,
      DepartmentEmail: this.state.DepartmentEmailParam

    };
    //// ----------------Order attachment Code Start-----------------
    /// For Attached order
    var OrderData = [];
    var order_itemData = [];
    if (this.state.isorderFromShop) {
      if (this.state.selectedOrderData.length > 0) {
        var order_data = this.state.selectedOrderData;
        for (let i = 0; i < order_data.length; i++) {
          let obj = {
            OrderMasterID: order_data[i].orderMasterID,
            OrderNumber: order_data[i].invoiceNumber,
            InvoiceDate: order_data[i].invoiceDate,
            OrderPrice: order_data[i].ordeItemPrice,
            PricePaid: order_data[i].orderPricePaid,
            CustomerID: this.state.customer_Id,
            Discount: order_data[i].discount,
            StoreCode: order_data[i].storeCode,
            TransactionDate: order_data[i].invoiceDate,
            ModeOfPaymentID: 1,
            TicketSourceID: this.state.selectedChannelOfPurchase,
          };
          OrderData.push(obj);
        }

        // var OrderData = [
        //   {
        //     OrderMasterID: order_data.orderMasterID,
        //     OrderNumber: order_data.invoiceNumber,
        //     InvoiceDate: order_data.invoiceDate,
        //     OrderPrice: order_data.ordeItemPrice,
        //     PricePaid: order_data.orderPricePaid,
        //     CustomerID: this.state.customer_Id,
        //     Discount: order_data.discount,
        //     StoreCode: order_data.storeCode,
        //     TransactionDate: order_data.invoiceDate,
        //     ModeOfPaymentID: 1,
        //     TicketSourceID: this.state.selectedChannelOfPurchase,
        //   },
        // ];
      } else {
        OrderData = null;
      }

      /// For Attached OrderItem data
      for (let i = 0; i < this.state.SelectedItemData.length; i++) {
        var item_data = {};
        item_data["OrderItemID"] = this.state.SelectedItemData[i]["orderItemID"];
        item_data["OrderMasterID"] = this.state.SelectedItemData[i][
          "orderMasterID"
        ];
        item_data["ItemName"] = this.state.SelectedItemData[i]["itemName"];
        item_data["InvoiceNumber"] = this.state.SelectedItemData[i][
          "invoiceNumber"
        ];
        item_data["InvoiceDate"] = this.state.SelectedItemData[i]["invoiceDate"];
        item_data["ItemCount"] = this.state.SelectedItemData[i]["itemCount"];
        item_data["ItemPrice"] = this.state.SelectedItemData[i]["itemPrice"];
        item_data["PricePaid"] = this.state.SelectedItemData[i]["pricePaid"];
        item_data["Size"] = this.state.SelectedItemData[i]["size"];
        item_data["RequireSize"] = this.state.SelectedItemData[i]["requireSize"];
        item_data["Discount"] = this.state.SelectedItemData[i]["discount"];
        item_data["ArticleNumber"] = this.state.SelectedItemData[i][
          "articleNumber"
        ];
        item_data["ArticleName"] = this.state.SelectedItemData[i]["itemName"];
        item_data["isCheck"] = true;

        order_itemData.push(item_data);
      }
    }
    else {
      if (this.state.isOminiAttach) {
        var order_data = this.state.orderList;
        if (this.state.orderList.length > 0) {
          for (let i = 0; i < order_data.length; i++) {
            let obj = {
              OrderMasterID: 0,
              OrderNumber: order_data[i].orderId,
              InvoiceDate: this.typeTwoFormatDate(order_data[i].orderDate),
              OrderPrice: 0,
              PricePaid: 0,
              CustomerID: this.state.customer_Id,
              Discount: 0,
              StoreCode: "",
              TransactionDate: this.typeTwoFormatDate(order_data[i].orderDate),
              ModeOfPaymentID: 1,
              TicketSourceID: this.state.selectedChannelOfPurchase,
              orderSourceId: 1
            };
            OrderData.push(obj);
          }
        } else {
          OrderData = null;
        }
        if (self.state.selectedOminiItem?.length > 0) {
          for (let i = 0; i < self.state.selectedOminiItem?.length; i++) {
            var item_data = {};
            item_data["OrderItemID"] = 0;
            item_data["OrderMasterID"] = 0;
            item_data["ItemName"] = self.state.selectedOminiItem[i]?.itemData.product.description;
            item_data["InvoiceNumber"] = order_data[0].orderId
            item_data["InvoiceDate"] = this.typeTwoFormatDate(order_data[0].orderDate)
            item_data["ItemCount"] = null
            item_data["ItemPrice"] = parseFloat(self.state.selectedOminiItem[i]?.itemData.itemPricingDetails.value);
            item_data["PricePaid"] = parseFloat(self.state.selectedOminiItem[i]?.itemData.itemPricingDetails.netAmount);
            item_data["Size"] = null;
            item_data["RequireSize"] = "0";
            item_data["Discount"] = 0;
            item_data["ArticleNumber"] = self.state.selectedOminiItem[i]?.itemData.product.sku
            item_data["ArticleName"] = self.state.selectedOminiItem[i]?.itemData.product.description
            item_data["isCheck"] = true;
            item_data["subOrderNumber"] = self.state.selectedOminiItem[i]?.itemData.itemId
            item_data["consignmentId"] = self.state.selectedOminiItem[i]?.cId
            order_itemData.push(item_data);
          }
        }
        else {
          for (let i = 0; i < order_data[0]?.consignments?.length; i++) {
            for (let j = 0; j < order_data[0]?.consignments[i]?.items?.length; j++) {
              var item_data = {};
              item_data["OrderItemID"] = 0;
              item_data["OrderMasterID"] = 0;
              item_data["ItemName"] = order_data[0].consignments[i].items[j].product.description;
              item_data["InvoiceNumber"] = order_data[0].orderId
              item_data["InvoiceDate"] = this.typeTwoFormatDate(order_data[0].orderDate)
              item_data["ItemCount"] = parseInt(order_data[0].consignments[i].itemCount)
              item_data["ItemPrice"] = parseFloat(order_data[0].consignments[i].items[j].itemPricingDetails.value);
              item_data["PricePaid"] = parseFloat(order_data[0].consignments[i].items[j].itemPricingDetails.netAmount);
              item_data["Size"] = null;
              item_data["RequireSize"] = "0";
              item_data["Discount"] = 0;
              item_data["ArticleNumber"] = order_data[0].consignments[i].items[j].product.sku
              item_data["ArticleName"] = order_data[0].consignments[i].items[j].product.description
              item_data["isCheck"] = true;
              item_data["subOrderNumber"] = order_data[0].consignments[i].items[j].itemId
              item_data["consignmentId"] = order_data[0].consignments[i]?.consignmentId
              order_itemData.push(item_data);
            }
          }
        }
      }
    }


    //// ----------------Order attachment Code End-----------------

    //// ----------------Store attachment Code Start---------------
    var store_Details = [];
    for (let k = 0; k < this.state.selectedStoreIDs.length; k++) {
      var storeData = {};

      ///check purpose id
      var PurposeID = this.state.selectedStoreIDs[k]["purposeId"];

      if (PurposeID === "0") {
        // Send Purpose Id as 1 and 2 from API
        PurposeID = 1;
      } else {
        PurposeID = 2;
      }

      var visitDate = "";
      if (
        this.state.selectedStoreIDs[k]["StoreVisitDate"] === null ||
        this.state.selectedStoreIDs[k]["StoreVisitDate"] === undefined ||
        this.state.selectedStoreIDs[k]["StoreVisitDate"] === ""
      ) {
        visitDate = "";
      } else {
        visitDate = moment(
          this.state.selectedStoreIDs[k]["StoreVisitDate"]
        ).format("YYYY-MM-DD");
      }

      storeData["StoreID"] = this.state.selectedStoreIDs[k]["storeID"];
      storeData["BrandID"] = this.state.selectedStoreIDs[k]["brandID"];
      storeData["CityID"] = this.state.selectedStoreIDs[k]["cityID"];
      storeData["StateID"] = this.state.selectedStoreIDs[k]["stateID"];
      storeData["PincodeID"] = this.state.selectedStoreIDs[k]["pincodeID"];
      storeData["StoreName"] = this.state.selectedStoreIDs[k]["storeName"];
      storeData["Address"] = this.state.selectedStoreIDs[k]["address"];
      storeData["StoreCode"] = this.state.selectedStoreIDs[k]["storeCode"];
      storeData["RegionID"] = this.state.selectedStoreIDs[k]["regionID"];
      storeData["ZoneID"] = this.state.selectedStoreIDs[k]["zoneID"];
      storeData["StoreTypeID"] = this.state.selectedStoreIDs[k]["storeTypeID"];
      storeData["StoreEmailID"] = this.state.selectedStoreIDs[k][
        "storeEmailID"
      ];
      storeData["StorePhoneNo"] = this.state.selectedStoreIDs[k][
        "storePhoneNo"
      ];
      storeData["StoreVisitDate"] = visitDate;
      storeData["Purpose"] = PurposeID;
      storeData["Pincode"] = this.state.selectedStoreIDs[k]["pincode"];
      storeData["BrandIDs"] = this.state.selectedBrand;

      store_Details.push(storeData);
    }
    //// ----------------Store attachment Code End-----------------

    // for unknow order id below object
    let orderDataUnknwon =
      [
        {
          OrderMasterID: 0,
          OrderNumber: "Unknown",
          InvoiceDate: null,
          OrderPrice: 0,
          PricePaid: 0,
          CustomerID: this.state.customer_Id,
          Discount: 0,
          StoreCode: null,
          TransactionDate: null,
          ModeOfPaymentID: null,
          TicketSourceID: "1",
          OrderSource: "unknown"
        }
      ]
    // Added by Sandy 18th march 2024 Start
    if (this.state.unknowItemAttach) {
      var storeData = {};
      let selectedStoreDetails = JSON.parse(window.localStorage.getItem('selectedStoreDetails'));
      paramData.StoreID = selectedStoreDetails.storeID + "|" + "" + "|" + "1";
      storeData["StoreID"] = selectedStoreDetails.storeID;
      storeData["BrandID"] = 0;
      storeData["CityID"] = 0;
      storeData["StateID"] = 0;
      storeData["PincodeID"] = 0;
      storeData["StoreName"] = selectedStoreDetails.storeName;
      storeData["Address"] = "";
      storeData["StoreCode"] = selectedStoreDetails.storeCode;
      storeData["RegionID"] = 0;
      storeData["ZoneID"] = 0;
      storeData["StoreTypeID"] = 0;
      storeData["StoreEmailID"] = "";
      storeData["StorePhoneNo"] = "";
      storeData["StoreVisitDate"] = "";
      storeData["Purpose"] = 1;
      storeData["Pincode"] = selectedStoreDetails.pincode;;
      storeData["BrandIDs"] = this.state.selectedBrand;

      store_Details.push(storeData);
    }
    // Added by Sandy 18th march 2024 END
    /// for unknow order id below object end
    let finalOrderData = { orderMaster: this.state.unknowItemAttach ? orderDataUnknwon : OrderData };
    let finalItemData = this.state.unknowItemAttach ? this.state.selectedItemDataUnknown : order_itemData

    formData.append("ticketingDetails", JSON.stringify(paramData));
    formData.append("orderDetails", JSON.stringify(finalOrderData));
    formData.append("orderItemDetails", JSON.stringify(finalItemData));
    // formData.append("File",this.state.FileDataNew)
    formData.append("storeDetails", JSON.stringify(store_Details));
    for (let i = 0; i < this.state.FileDataNew.length; i++) {
      formData.append("File", this.state.FileDataNew[i]);
    }
    for (let j = 0; j < this.state.FileData.length; j++) {
      formData.append("Filedata", this.state.FileData[j]);
    }
    //// For DRAFT UPDATE CONDTION
    if (this.state.ticketDetailID) {
      const DRAFTFromData = new FormData();
      var paramData = {
        TicketID: this.state.ticketDetailID,
        TicketTitle: this.state.titleSuggValue,
        Ticketdescription: this.state.ticketDetails,
        CustomerID: this.state.customer_Id,
        BrandID: this.state.selectedBrand,
        CategoryID: this.state.selectedCategory,
        SubCategoryID: this.state.selectedSubCategory,
        SubSubCategoryID: this.state.selectedSubSubCategory,
        IssueTypeID: this.state.selectedIssueType,
        PriorityID: this.state.selectedTicketPriority,
        ChannelOfPurchaseID: this.state.selectedChannelOfPurchase,
        Ticketnotes: this.state.ticketNote,
        taskMasters: this.state.taskMaster,
        StatusID: actionStatusId,
        TicketActionID: this.state.selectedTicketActionType,
        IsInstantEscalateToHighLevel: this.state.escalationLevel,
        IsWantToAttachOrder: this.state.customerAttachOrder,
        TicketTemplateID: this.state.selectTicketTemplateId,
        TicketMailBody: this.state.editorTemplateDetails,
        IsWantToVisitedStore: this.state.custVisit,
        IsAlreadyVisitedStore: this.state.AlreadycustVisit,
        TicketSourceID: 1,
        OrderItemID: selectedRow.substring(",", selectedRow.length - 1),
        StoreID: selectedStore.substring(",", selectedStore.length - 1),
        ticketingMailerQues: mailData,
      };
      DRAFTFromData.append("ticketingDetails", JSON.stringify(paramData));
      for (let j = 0; j < this.state.FileData.length; j++) {
        DRAFTFromData.append("Filedata", this.state.FileData[j]);
      }
      axios({
        method: "post",
        url: config.apiUrl + "/Ticketing/UpdateDraftTicket",
        headers: authHeader(),
        data: DRAFTFromData,
      })
        .then(function (res) {
          let Msg = res.data.status;
          let TID = res.data.responseData;
          self.setState({ loading: false });
          if (Msg) {
            NotificationManager.success(res.data.message, "", 2000);
            if (self.state.followUpIds !== "") {
              self.handleTicketAssignFollowUp(TID);
            }
            setTimeout(function () {
              self.props.history.push("myTicketlist");
            }, 1000);
          } else {
            NotificationManager.error(res.data.message, "", 2000);
          }
        })
        .catch((data) => {
          console.log(data);
          self.setState({ loading: false });
          NotificationManager.error("Internal Server Error", "", 2000);
        });
    } else {
      axios({
        method: "post",
        url: config.apiUrl + "/Ticketing/createTicket",
        headers: authHeader(),
        data: formData,
      })
        .then(function (res) {
          let Msg = res.data.status;
          let TID = res.data.responseData;
          self.setState({ loading: false });
          if (Msg) {
            self.setState({
              unknowItemAttach: false
            })
            NotificationManager.success(
              "Ticket ID " + TID + " : " + res.data.message,
              "",
              2000
            );
            // if (self.state.followUpIds !== "") {
            //   self.handleTicketAssignFollowUp(TID);
            // }
            setTimeout(function () {
              window.localStorage.getItem('Programcode') !== 'campusshoes' ?
                self.props.history.push("myTicketlist")
                :
                self.props.history.push("addSearchMyTicket");
            }, 1000);
          } else {
            NotificationManager.error(res.data.message, "", 2000);
          }
        })
        .catch((data) => {
          console.log(data);
          self.setState({ loading: false });
          NotificationManager.error("Internal Server Error", "", 2000);
        });
    }
    // } else {
    //   this.setState({
    //     ticketTitleCompulsion:
    //       TranslationContext !== undefined
    //         ? TranslationContext.ticketingDashboard
    //             .tickettitlefieldiscompulsory
    //         : "Ticket Title field is compulsory.",
    //     ticketDetailsCompulsion:
    //       TranslationContext !== undefined
    //         ? TranslationContext.ticketingDashboard
    //             .ticketdetailsfieldiscompulsory
    //         : "Ticket Details field is compulsory.",
    //     ticketBrandCompulsion:
    //       TranslationContext !== undefined
    //         ? TranslationContext.ticketingDashboard.brandfieldiscompulsory
    //         : "Brand field is compulsory.",
    //     ticketCategoryCompulsion:
    //       TranslationContext !== undefined
    //         ? TranslationContext.ticketingDashboard.categoryfieldiscompulsory
    //         : "Category field is compulsory.",
    //     ticketSubCategoryCompulsion:
    //       TranslationContext !== undefined
    //         ? TranslationContext.ticketingDashboard
    //             .subcategoryfieldiscompulsory
    //         : "Sub Category field is compulsory.",
    //     ticketIssueTypeCompulsion:
    //       TranslationContext !== undefined
    //         ? TranslationContext.ticketingDashboard.issuetypefieldiscompulsory
    //         : "Issue Type field is compulsory.",
    //     channelPurchaseCompulsion:
    //       TranslationContext !== undefined
    //         ? TranslationContext.ticketingDashboard
    //             .channelofpurchasefieldiscompulsory
    //         : "Channel of Purchase field is compulsory.",
    //   });
    // }
    // } else {
    //   NotificationManager.error(
    //     TranslationContext !== undefined
    //       ? TranslationContext.ticketingDashboard.pleaseselectticketpriority
    //       : "Please Select Ticket Priority.",
    //     "",
    //     2000
    //   );
    // }

    // Don't remove this function
  }
  // handleSendMailData() {
  //   ////
  //   var subject = "Demo Mail";
  //   axios({
  //     method: "post",
  //     url: config.apiUrl + "/Ticketing/SendMail",
  //     headers: authHeader(),
  //     params: {
  //       EmailID: this.state.customerData.customerEmailId,
  //       Mailcc: this.state.mailFiled.userCC,
  //       Mailbcc: this.state.mailFiled.userBCC,
  //       Mailsubject: subject,
  //       MailBody: this.state.mailBodyData,
  //       informStore: this.state.InformStore,
  //       storeID: ""
  //     }
  //   }).then(function(res) {
  //     ////
  //     let status = res.data.status;
  //     if (status === true) {
  //       NotificationManager.success(res.data.responseData);
  //     } else {
  //       NotificationManager.error(res.data.responseData);
  //     }
  //   });
  // }

  handlebackprev() {
    this.props.history.push("myTicketList");
  }



  setIssueTypeValue = (e) => {
    let issueTypeValue = e.currentTarget.value;
    this.setState({ selectedIssueType: issueTypeValue });

    setTimeout(() => {
      if (this.state.selectedIssueType) {
        this.handleCkEditorTemplate();
        this.handleGetTicketPriorityList();
      }
    }, 1);
  };
  setIssueTypeValueKB = (e) => {
    let issueTypeValue = e.currentTarget.value;
    this.setState({ selectedIssueTypeKB: issueTypeValue });
  };
  setTicketPriorityValue = (e) => {
    let value = e.target.value;
    this.setState({ selectedTicketPriority: Number(value) });
  };


  setTicketActionTypeValue = (e) => {
    let value = e.currentTarget.value;
    this.setState({ selectedTicketActionType: value });
    let ticketFiledNewInput = this.state.ticketFiledNewInput;

    if (value === "201") {
      ticketFiledNewInput["CallBack"] = true;
      this.setState({ ticketFiledNewInput });
    } else {
      ticketFiledNewInput["CallBack"] = false;
      this.setState({ ticketFiledNewInput });
    }
  };



  setBrandValues = (e) => {
    // //
    let value = e.currentTarget.value;
    this.setState({
      selectedBrand: value,
      CategoryData: [],
      selectedCategory: "",
      SubCategoryData: [],
      selectedSubCategory: "",
      IssueTypeData: [],
      TicketPriorityData: this.state.TicketPriorityDummyData,
      selectedTicketPriority: 0,
      checkPriorityDetails: false,
    });

    setTimeout(() => {
      if (this.state.selectedBrand) {
        // //
        if (window.localStorage.getItem('Programcode') === "campusshoes" || (this.state.ticketFields.filter((x) => x.fieldName.toLowerCase() === "BusinessUnit".toLowerCase()).length > 0
          ? this.state.ticketFields.filter((x) => x.fieldName.toLowerCase() === "BusinessUnit".toLowerCase())[0].createPage : false)) {
          this.handleGetBusinessUnit();
          this.handleGetCategoryList();
        } else {
          this.handleGetCategoryList()
        }

      } else {
        this.setState({
          businessUnitData: []
        });
      }
    }, 1);
  };


  handleBusinessUnit = (e) => {
    //
    let businessUnitValue = e.currentTarget.value;
    this.setState({
      selectedBusinessUnit: businessUnitValue,
      subbusinessUnitData: [],
      //SubCategoryData: [],
      //IssueTypeData: [],
      TicketPriorityData: this.state.TicketPriorityDummyData,
      // selectedTicketPriority: 0,
      checkPriorityDetails: false,
    });
    // if(businessUnitValue.length>0){
    //   let fieldErrrorV=this.state.fieldError
    //   fieldErrrorV["Businees Unit"]="",
    //   this.setState({
    //     fieldError:fieldErrrorV
    //   })

    // }

    setTimeout(() => {
      if (businessUnitValue) {
        this.handleGetSubBusinessUnit();
        if (window.localStorage.getItem('Programcode') === "campusshoes") {
          this.handleGetCategoryList()
        }


      } else {
        this.setState({
          subbusinessUnitData: []
        });
      }
    }, 1);

  }
  handleSubBusinessUnit = (e) => {
    let subbusinessUnitValue = e.currentTarget.value;
    this.setState({
      selectedSubBusinessUnit: subbusinessUnitValue,
      // subbusinessUnitData: [],
    });

    setTimeout(() => {

    }, 1);

  }


  setCategoryValue = (e) => {
    //
    let value = e.currentTarget.value;
    this.setState({
      selectedCategory: value,
      SubCategoryData: [],
      IssueTypeData: [],
      TicketPriorityData: this.state.TicketPriorityDummyData,
      selectedTicketPriority: 0,
      checkPriorityDetails: false,
      selectedSubSubCategory: "",
      selectedSubCategory: "",
      subSubCategoryData: [],
      ecrData: []
    });
    setTimeout(() => {
      if (this.state.selectedCategory) {
        this.handleGetSubCategoryList();
      } else {
        this.setState({
          IssueTypeData: [],
          selectedIssueType: "",
          selectedSubCategory: "",
          SubCategoryData: [],
          TicketPriorityData: this.state.TicketPriorityDummyData,
          selectedTicketPriority: 0,
          checkPriorityDetails: false,
        });
      }
    }, 1);
  };
  setCategoryValueKB = (e) => {
    let value = e.currentTarget.value;
    this.setState({ selectedCategoryKB: value });
    setTimeout(() => {
      if (this.state.selectedCategoryKB) {
        this.handleGetSubCategoryList();
      } else {
        this.setState({
          IssueTypeData: [],
          selectedIssueTypeKB: "",
          selectedSubCategoryKB: "",
          SubCategoryData: [],
        });
      }
    }, 1);
  };
  setSubCategoryValue = (e) => {
    //
    let value = e.currentTarget.value;
    this.setState({
      selectedSubCategory: value,
      subSubCategoryData: [],
      TicketPriorityData: this.state.TicketPriorityDummyData,
      selectedTicketPriority: 0,
      checkPriorityDetails: false,
      IssueTypeData: [],
      ecrData: [],
      selectedIssueType: "",
      selectedEcr: ""
    });

    setTimeout(() => {
      if (this.state.selectedSubCategory) {
        //
        // if (window.localStorage.getItem('Programcode') === "campusshoes") {
        if (this.state.BrandData[0].isSubSubCategory) {
          this.handleGetSubSubCategoryList()
        } else {
          this.handleGetIssueTypeList();
        }
      } else {
        this.setState({
          subSubCategoryData: [],
          selectedSubCategory: "",
          selectedIssueType: "",
          // TicketPriorityData: this.state.TicketPriorityDummyData,
          // selectedTicketPriority: 0,
          // checkPriorityDetails: false,
        });
      }
    }, 100);
  };
  setSubSubCategoryValue = (e) => {
    //
    let value = e.currentTarget.value;
    if (value === "Select Sub Sub CategoryId") {
      this.setState({
        selectedSubSubCategory: value,
        IssueTypeData: [],
        ecrData: [],
        TicketPriorityData: [],
      })

    }
    else {
      this.setState({
        selectedSubSubCategory: value,
        IssueTypeData: [],
        TicketPriorityData: this.state.TicketPriorityDummyData,
        selectedTicketPriority: 0,
        checkPriorityDetails: false,
      });

    }


    setTimeout(() => {
      if (this.state.selectedSubSubCategory) {
        this.handleGetIssueTypeList();
      } else {
        this.setState({
          IssueTypeData: [],
          selectedIssueType: "",
          TicketPriorityData: this.state.TicketPriorityDummyData,
          selectedTicketPriority: 0,
          checkPriorityDetails: false,
        });
      }
    }, 1);
  };

  setSubCategoryValueKB = (e) => {
    let subCategoryValue = e.currentTarget.value;
    this.setState({ selectedSubCategoryKB: subCategoryValue });

    setTimeout(() => {
      if (this.state.selectedSubCategoryKB) {
        this.handleGetIssueTypeList();
      } else {
        this.setState({ IssueTypeData: [], selectedIssueTypeKB: "" });
      }
    }, 1);
  };
  setChannelOfPurchaseValue = (e) => {
    //
    let value = e.currentTarget.value;
    this.setState({
      selectedChannelOfPurchase: value,
      selectedStoreName: "",
      selectedStoreCode: "",
      selectedStoreAddress: "",
      selectedStoreCity: "",
      selectedStoreContactInfo: "",
      selectedStoreRegion: "",
      selectedStoreCountry: "",
      selectedMktPlace: "",
      selectedStoreEmail: "",
    });
    this.handleGetChannelOfPurchaseName(value);
  };

  handleGetChannelOfPurchaseName = (value) => {
    let CopName = this.state.ChannelOfPurchaseData.filter(
      (item) => item.channelOfPurchaseID == value
    )[0]
      .nameOfChannel.toLowerCase()
      .replace(/[^A-Z0-9]/gi, "");
    this.setState({
      selectedChannelOfPurchaseName: CopName,
    });
  };

  ////Hanlde Get ticket Details
  handleGetTicketDetails(Id) {
    let self = this;
    this.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/getTicketDetailsByTicketId",
      headers: authHeader(),
      params: {
        ticketID: Id,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          var Ticket_title = data.ticketTitle;
          var Ticket_details = data.ticketdescription;
          var brand_Id = data.brandID;
          var selectedTicketPriority = data.priortyID;
          var category_Id = parseInt(data.categoryID);
          var subCategory_Id = parseInt(data.subCategoryID);
          var issue_type = parseInt(data.issueTypeID);
          var purchase_Id = data.channelOfPurchaseID;
          var ticketAction_Id = data.ticketActionTypeID;
          var attachementDetails = data.attachment;

          var checkALert = data.ticketingMailerQue.alertID;
          var CheckCustomerCmt = data.ticketingMailerQue.isCustomerComment;
          var storeCheck = data.stores;
          var orderData = data.products;
          var TaskData = data.totalTask;
          var User_cc = data.ticketingMailerQue.userCC;
          var User_Bcc = data.ticketingMailerQue.userBCC;
          var mailFiled = {};
          mailFiled.userCC = User_cc;
          mailFiled.userBCC = User_Bcc;
          ////Check CKEditor data with condition
          if (checkALert === 0 && CheckCustomerCmt === true) {
            var editoerData = data.ticketingMailerQue.ticketMailBody;
            self.setState({
              editorTemplateDetails: editoerData,
            });
          }
          //// Check Store data
          if (storeCheck.length > 0) {
            self.setState({
              showStoreData: true,
            });
          }

          //// Check Order Data
          if (orderData.length > 0) {
            self.setState({
              showOrderDetails: true,
            });
          }

          ////Check Task data

          if (TaskData > 0) {
            self.setState({
              showTaskData: true,
            });
          }
          self.setState({
            selectedTicketPriority,
            titleSuggValue: Ticket_title,
            ticketDetails: Ticket_details,
            selectedBrand: brand_Id,
            selectedCategory: category_Id,
            selectedSubCategory: subCategory_Id,
            selectedIssueType: issue_type,
            selectedChannelOfPurchase: purchase_Id,
            selectedTicketActionType: ticketAction_Id.toString(),
            fileDummy: attachementDetails,
            mailFiled,
            selectedStoreName: data.storeName,
            selectedStoreCode: data.storeCode,
            selectedStoreAddress: data.storeAddress,
            selectedStoreCity: data.storeCity,
            selectedStoreContactInfo: data.StorePhoneNo,
            selectedStoreRegion: data.region,
            selectedStoreCountry: data.country,
            selectedMktPlace: data.mktPlace,
            selectedStoreEmail: data.storeEmailID,
          });
          setTimeout(() => {
            self.handleGetCategoryList();
            self.handleGetSubCategoryList();
            self.handleGetIssueTypeList();
            self.handleGetTicketPriorityList();
            self.handleOnLoadFiles();
            self.handleGetChannelOfPurchaseName(data.channelOfPurchaseID);
            self.handleGetBusinessUnit();
          }, 100);
        } else {
          self.setState({
            ticketDetailsData: {},
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  ////Get File uploaded data
  handleOnLoadFiles() {
    for (let i = 0; i < this.state.fileDummy.length; i++) {
      var objFile = new Object();
      var name = this.state.fileDummy[i].attachmentName;
      var type = name.substring(name.lastIndexOf(".") + 1, name.length);
      objFile.Type = type;
      objFile.name = name;

      objFile.File = this.state.fileDummy[i];

      this.state.file.push(objFile);
    }
    this.setState({
      fileText: this.state.file.length,
    });
  }

  //// hanlde Get Task details
  handleGetTaskNoteDetails(Id) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/getNotesByTicketId",
      headers: authHeader(),
      params: {
        TicketId: Id,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        if (status === "Success") {
          let data = res.data.responseData[0].note;
          document.getElementById("add-Notes").checked = true;
          self.setState({ ticketNote: data, showAddNote: true });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  parentCallBackFuncation = (type) => {
    if (type === "store") {
      this.setState({ showStoreData: false });
    }
    if (type === "order") {
      this.setState({ showOrderDetails: false });
    }
    if (type === "task") {
      this.setState({ showTaskData: false });
    }
  };

  handleCallbackAppointmentBooklist = (list) => {
    this.setState({
      appointmentBookList: list,
    });
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

        if (status === "Success" && data) {
          let rightSideTab = self.state.rightSideTab;

          rightSideTab["Store"] =
            data.ticketFieldsLst.filter(
              (x) => x.fieldName.toLowerCase() === "Store".toLowerCase()
            ).length > 0
              ? data.ticketFieldsLst.filter(
                (x) => x.fieldName.toLowerCase() === "Store".toLowerCase()
              )[0].createPage
              : false;
          rightSideTab["Task"] =
            data.ticketFieldsLst.filter(
              (x) => x.fieldName.toLowerCase() === "Task".toLowerCase()
            ).length > 0
              ? data.ticketFieldsLst.filter(
                (x) => x.fieldName.toLowerCase() === "Task".toLowerCase()
              )[0].createPage
              : false;
          rightSideTab["OpenTicket"] =
            data.ticketFieldsLst.filter(
              (x) => x.fieldName.toLowerCase() === "OpenTicket".toLowerCase()
            ).length > 0
              ? data.ticketFieldsLst.filter(
                (x) => x.fieldName.toLowerCase() === "OpenTicket".toLowerCase()
              )[0].createPage
              : false;
          rightSideTab["Order"] =
            data.ticketFieldsLst.filter(
              (x) => x.fieldName.toLowerCase() === "Order".toLowerCase()
            ).length > 0
              ? data.ticketFieldsLst.filter(
                (x) => x.fieldName.toLowerCase() === "Order".toLowerCase()
              )[0].createPage
              : false;
          rightSideTab["Appointment"] =
            data.ticketFieldsLst.filter(
              (x) => x.fieldName.toLowerCase() === "Appointment".toLowerCase()
            ).length > 0
              ? data.ticketFieldsLst.filter(
                (x) =>
                  x.fieldName.toLowerCase() === "Appointment".toLowerCase()
              )[0].createPage
              : false;

          self.setState({ ticketFields: data.ticketFieldsLst, rightSideTab });
        } else {
          self.setState({ ticketFields: [] });
        }
      })
      .catch((error) => console.log(error));
  };
  //handle get consulting hospital
  handleGetConsultingHospital = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetConsultingHospital",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ consultingHospitalData: data });
        } else {
          self.setState({ consultingHospitalData: [] });
        }
      })
      .catch((error) => console.log(error));
  };
  //handle get purpose of visit list
  handleGetPurposeOfVisit = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetPurposeOfVisit",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ purposeVisitData: data });
        } else {
          self.setState({ purposeVisitData: [] });
        }
      })
      .catch((error) => console.log(error));
  };
  //handle get department list.
  handleGetDepartmentName = (UnitID) => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getDepartmentListbyUnitID",
      headers: authHeader(),
      params: {
        UnitID: UnitID,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ departmentData: data });
        } else {
          self.setState({ departmentData: [] });
        }
      })
      .catch((error) => console.log(error));
  };
  //handle get unit name list.
  handleGetUnitName = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetUnitName",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ unitNameData: data });
        } else {
          self.setState({ unitNameData: [] });
        }
      })
      .catch((error) => console.log(error));
  };

  //handle get unit city list.
  handleGetUnitCity = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetUnitCity",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ unitCitytData: data });
        } else {
          self.setState({ unitCitytData: [] });
        }
      })
      .catch((error) => console.log(error));
  };
  //handl get lob list.
  handleGetLOB = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetLOB",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ lOBData: data });
        } else {
          self.setState({ lOBData: [] });
        }
      })
      .catch((error) => console.log(error));
  };
  // handle get complaint call list.
  handleGetComplaintCall = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetComplaintCall",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ complaintCallData: data });
        } else {
          self.setState({ complaintCallData: [] });
        }
      })
      .catch((error) => console.log(error));
  };
  //handle get customer type list.
  handleGetCustomerType = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetCustomerType",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          if (self.state.customerData) {
            if (data.length > 0) {
              let ticketFiledNewInput = self.state.ticketFiledNewInput;
              if (self.state.customerData.isExist === 1) {
                ticketFiledNewInput["CustomerType"] = data.filter(
                  (x) => x.customerType_Name == "Existing"
                )[0].customerType_Id;
              } else if (self.state.customerData.isExist === 0) {
                ticketFiledNewInput["CustomerType"] = data.filter(
                  (x) => x.customerType_Name == "New"
                )[0].customerType_Id;
              } else {
                ticketFiledNewInput["CustomerType"] = null;
              }
              self.setState({
                ticketFiledNewInput,
              });
            }
          }
          self.setState({ customerTypeData: data });
        } else {
          self.setState({ customerTypeData: [] });
        }
      })
      .catch((error) => console.log(error));
  };
  //handle get consuling doctore list.
  handleGetConsultingDoctor = (UnitID) => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetConsultingDoctor",
      headers: authHeader(),
      params: {
        UnitID: UnitID,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ consultingDoctorData: data });
        } else {
          self.setState({ consultingDoctorData: [] });
        }
      })
      .catch((error) => console.log(error));
  };
  handelTicketFieldInputChange = (name, e) => {
    let ticketFiledNewInput = this.state.ticketFiledNewInput;
    if (name === "CallBack" && this.state.selectedTicketActionType === "201") {
      ticketFiledNewInput[name] = e;
    } else {
      ticketFiledNewInput[name] = e.target.value;
    }
    if (name === "UnitName") {
      this.handleGetDepartmentName(Number(e.target.value));
      this.handleGetConsultingDoctor(Number(e.target.value));
    }
    this.setState({
      ticketFiledNewInput,
    });
  };
  handleTicketFieldInputDateChange = (name, e) => {
    let ticketFiledNewInput = this.state.ticketFiledNewInput;
    ticketFiledNewInput[name] = e;
    this.setState({
      ticketFiledNewInput,
    });
  };
  handleGetEmailID = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetEmailID",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ emailIDData: data });
        } else {
          self.setState({ emailIDData: [] });
        }
      })
      .catch((error) => console.log(error));
  };
  handleChangeEmailSenderID = (e) => {
    this.setState({
      emailSenderID: e.target.value,
    });
  };
  handleChangeEmailFileSendCheck = (e) => {
    this.setState({
      emailFileCheck: e.target.checked,
    });
  };

  handleGetUserProfileData() {
    //
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserProfileDetail",
      headers: authHeader(),
    })
      .then(function (res) {
        var status = res.data.message;
        var userdata = res.data.responseData;
        var ticketFiledNewInput = {};
        if (status === "Success") {
          ticketFiledNewInput["UnitCity"] = userdata[0].cityID;

          self.setState({
            ticketFiledNewInput,
            loggedInUserId: userdata[0].userId,
          });
        } else {
          self.setState({
            ticketFiledNewInput: {},
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  // handleGetProgramCode() {

  //   let self = this;
  //   axios({
  //     method: "post",
  //     url: config.apiUrl + "/Ticketing/getCurrentSession",
  //     headers: authHeader(),
  //      params : {
  //  IsStore : false,
  //}

  //   })
  //     .then(function(res) {
  //       var status = res.data.message;
  //       var data = res.data.responseData;
  //       if (status === "Success") {
  //         self.setState({
  //           CurrentProgramCode: data[0].programCode,
  //         });
  //       } else {
  //         self.setState({
  //           CurrentProgramCode: "",
  //         });
  //       }
  //     })
  //     .catch((data) => {
  //       console.log(data);
  //     });
  // }

  handleGetStoreList = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Store/StoreList",
      headers: authHeader(),
    })
      .then(function (res) {
        var status = res.data.message;
        var data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            StoreList: data,
          });
        } else {
          self.setState({
            StoreList: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleStoreChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    if (this.state.selectedChannelOfPurchaseName == "d2c") {
      if (
        event.target.name === "selectedStoreCode" ||
        event.target.name === "selectedStoreName"
      ) {
        this.handleGetStoreListByStoreDetails(event.target.value);
      }
    }
  };

  handleGetMktList = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/getMktFieldsList",
      headers: authHeader(),
    })
      .then(function (res) {
        var status = res.data.message;
        var data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            MktList: data,
          });
        } else {
          self.setState({
            MktList: {},
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleGetStoreListByStoreDetails = (Value) => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/getStoreByNameAndCode",
      headers: authHeader(),
      params: {
        searchText: Value,
      },
    })
      .then(function (res) {
        var status = res.data.message;
        var data = res.data.responseData;
        if (status === "Success") {
          if (data[0].phoneNumber.length < 10) {
            self.setState({
              setdisablefield: false,
            });
          } else {
            self.setState({
              setdisablefield: true,
            });
          }
          self.setState({
            selectedStoreName: data[0].storeName,
            selectedStoreCode: data[0].storeCode,
            selectedStoreAddress: data[0].address,
            selectedStoreCity: data[0].cityName,
            selectedStoreContactInfo: data[0].phoneNumber,
            selectedStoreEmail: data[0].email,
          });
        } else {
          self.setState({
            selectedStoreName: "",
            selectedStoreCode: "",
            selectedStoreAddress: "",
            selectedStoreCity: "",
            selectedStoreContactInfo: "",
            selectedStoreEmail: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleCreateAppointment = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/CreateAppointment1",
      headers: authHeader(),
      data: this.state.appointmentBookList,
    })
      .then(function (res) {
        var status = res.data.message;
        var appointmentBookList = res.data.responseData;

        if (status === "Success") {
          self.setState({
            appointmentBookList,
          });
        } else {
          self.setState({
            appointmentBookList: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleGetProgramCode = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/getCurrentSession",
      headers: authHeader(),
      params: {
        IsStore: false,
      },
    })
      .then(function (res) {
        var status = res.data.message;
        var programCode = res.data.responseData[0].programCode
          .toLowerCase()
          .replace(/[^A-Z0-9]/gi, "");

        if (status === "Success") {
          self.setState({
            programCode,
          });
        } else {
          self.setState({
            programCode: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleSearchOrderType = (e) => {
    //
    let self = this;
    self.setState({
      searchType: e.target.id
    })
    if (e.target.id === "mobId_cre") {
      let number = self.state.customerData?.customerPhoneNumber?.length > 10 ?
        self.state.customerData?.customerPhoneNumber.split(/91(.*)/s)[1]
        : self.state.customerData?.customerPhoneNumber
      self.setState({
        mobileNOtoSearch: number
      })
    }
    else {
      self.setState({
        mobileNOtoSearch: ""
      })
    }
  }
  handleShowOrders = (val) => {
    this.setState({
      showOrders: val
    })
  }
  handleOrderSearch = () => {
    this.handleShowOrders(true)
  }
  showFullProfile = () => {
    let programCode = window.localStorage.getItem('Programcode')
    axios({
      method: "post",
      url: config.apiUrl + "/Lpass/GetvcwProfileURL",
      headers: authHeader(),
      data: {
        memberID: this.state.customerData.customerPhoneNumber,
        countryCode: this.state.countryCode,
        storeCode: this.state.selectedStoreCode,
        programCode: programCode
      }
    })
      .then(function (res) {
        if (res.data.returnCode === 0 && res.data.returnMessage === "Success") {
          window.open(res.data?.widgetURL)
        }
        else {
          NotificationManager.error("There is a technical error! Please retry again.")
        }
      })
  }
  handleProfileViewDrop = () => {
    axios({
      method: "post",
      url: config.apiUrl + "/Lpass/GetvcwProfileURL",
      headers: authHeader(),
      data: {
        memberID: this.state.customerData.customerPhoneNumber,
        countryCode: this.state.countryCode,
        storeCode: this.state.selectedStoreCode,
        programCode: this.state.programselect
      }
    })
      .then(function (res) {
        if (res.data.returnCode === 0 && res.data.returnMessage === "Success") {
          window.open(res.data?.widgetURL)
        }
        else {
          NotificationManager.error("There is a technical error! Please retry again.")
        }
      })
  }

  handleOrderCreditTab = (tabId) => {
    let self = this
    // document.getElementById(tabId).click()
    self.setState({
      searchType: tabId
    })
  }
  handleExtendCancel = (val) => {
    let self = this

    self.setState({
      isExtendCancel: val
    })
  }
  showExtendConfirm = () => {
    let self = this
    self.setState({
      showExtendCredit: !this.state.showExtendCredit
    })
  }
  showCancelCreditConfirm = () => {
    let self = this
    self.setState({
      showCancelCredit: !this.state.showCancelCredit
    })
  }
  //order type website or shop
  handleOrderSearchType = (e) => {
    let self = this
    // document.getElementById('orderId').click()
    self.setState({
      isorderFromShop: e.target.checked
    })
  }
  handleCreateOrderUnknown = (e) => {

    let self = this
    self.setState({
      unknowItemAttach: e.target.checked

    }, () => {
      console.log("unknowItemAttach", this.state.unknowItemAttach)
    })
  }
  // handleOrderUnknow = (e) => {
  //   
  //   let id = e.target.id
  //   console.log("id", id)
  //   if (id === "unknownShow_Id") {
  //     this.setState({
  //       isUnknownID: "unknownShow_Id"
  //     })

  //   }
  //   else {
  //     this.setState({
  //       isUnknownID: "orderShow_Id"
  //     })

  //   }

  // }
  // handleUnknownClose=()=>{
  //   this.setState({
  //     isUnknownID: "orderShow_Id"
  //   })
  // }
  // openAddOrderUnk=()=>{
  //   this.setState({
  //     openAddOrderUnk:true

  //   })
  // }
  // closeAddOrderUnk=()=>{
  //   this.setState({
  //     openAddOrderUnk:false
  //   })
  // }
  // onchange order search input for orders
  handleSetOrderId = (e) => {
    let self = this
    if (self.state.isorderFromShop) {
      self.setState({
        order_number: e.target.value,
        orderIdTobeSearched: e.target.value
      })
    }
    else {
      self.setState({
        orderIdTobeSearched: e.target.value
      })
    }
  }
  // onchange mobile search input for orders
  getOrderMobileNo = (e) => {
    let self = this;
    if (e.target.value.length <= 10) {
      if (self.state.isorderFromShop) {
        self.setState({
          // order_number: e.target.value,
          mobileNOtoSearch: e.target.value,
        })
      }
      else {
        self.setState({
          mobileNOtoSearch: e.target.value,
        })
      }
    }
  }
  getListOfOrdersMobile = () => {
    let self = this;
    self.setState({
      mobileOrders: [],
      isOrderSearchLoading: true
    })
    if (self.state.isorderFromShop) {
      // if (this.state.order_number != "") {
      self.handleShowOrders(true)
      self.setState({
        isOrderSearchLoading: false,
        mobileNOtoSearch: "",
      })
      // }
      // else {
      //   self.setState({
      //     isOrderSearchLoading: false
      //   })
      //   NotificationManager.error("Enter Mobile Number")
      // }
      // // this.handleOrderSearchData()
    }
    else {
      if (self.state.mobileNOtoSearch !== "") {
        axios({
          method: "post",
          headers: authHeader(),
          url: config.apiUrl + "/Omuni/GetOrderDetailsByMobile/",
          data: {
            mobileNo: self.state.mobileNOtoSearch,
            countryCallingCode: "+" + self.state.countryCode,
            userType: "CUSTOMER"
          }
        })
          .then(function (res) {
            console.log(res, "resss");
            if (res.data.statusCode === 200) {
              self.handleShowOrders(true)
              self.setState({
                mobileOrders: res.data.responseData.content,
                mobileNOtoSearch: "",
                isOrderSearchLoading: false
              })
            }
            else {
              NotificationManager.error(res.data.responseData?.message !== undefined ? res.data.responseData?.message : res.data.message)
              self.setState({
                isOrderSearchLoading: false
              })
            }
          })
      }
      else {
        NotificationManager.error("Moile no should not be Empty")
        self.setState({
          isOrderSearchLoading: false
        })
      }
    }
  }
  handleGetOrderList = (val) => {

    let self = this;
    self.setState({
      orderList: [],
      currentSubOrder: 0,
      isOrderSearchLoading: val === "" ? true : false
    })
    if (self.state.isorderFromShop) {
      if (this.state.order_number != "") {
        self.handleShowOrders(true)
        self.setState({
          isOrderSearchLoading: false,
          orderIdTobeSearched: "",
        })
      }
      else {
        self.setState({
          isOrderSearchLoading: false
        })
        NotificationManager.error("Enter Order Id")
      }
      // this.handleOrderSearchData()
    }
    else {
      let data = val !== "" ? val : this.state.orderIdTobeSearched
      if (data !== "") {
        axios({
          method: "get",
          headers: authHeader(),
          url: config.apiUrl + "/Omuni/GetOrderDetails/" + data,
        })
          .then(function (res) {
            if (res.data.statusCode === 200) {
              console.log(res.data);
              self.handleShowOrders(true)
              self.setState({
                orderIdTobeSearched: "",
                orderList: res.data.responseData,
                isOrderSearchLoading: false
              })
            }
            else {
              self.setState({
                orderList: [],
                isOrderSearchLoading: false
              })
              NotificationManager.error(res.data.responseData?.message !== undefined ? res.data.responseData?.message : res.data.message)
            }
          })
      }
      else {
        NotificationManager.error("Order id should not be Empty")
        self.setState({
          isOrderSearchLoading: false
        })
      }
    }
  }

  handleSubOderPagination = (value) => {
    let self = this
    if (value === 'prev') {
      self.setState({
        currentSubOrder: self.state.currentSubOrder - 1
      })
    }
    else if (value === 'next') {
      self.setState({
        currentSubOrder: self.state.currentSubOrder + 1
      })
    }
  }
  returnCancelEligiblility = (type, itemId) => {
    // 
    let self = this;
    axios({
      method: "get",
      headers: authHeader(),
      url: config.apiUrl + "/Omuni/CheckReturnOrCancelEligibilty/" + type + "/" + itemId,
    })
      .then(function (res) {
        let data = res.data
        if (data.statusCode === 200) {
          if (type === "cancellation") {
            self.setState({
              cancelEligbleDetail: data.responseData.data
            })
          }
          else if (type === "returns") {
            self.setState({
              returnEligbleDetail: data.responseData.data
            })
          }
          console.log(res, "Res");
        }
      })
  }
  checkCancelReturEligbile = (type, itemId) => {
    let self = this;
    self.setState({
      subOrderShow: type,
    })
    this.returnCancelEligiblility(type, itemId)
  }

  getDefaultSubOrderView = (type) => {
    // 
    let self = this;
    self.setState({
      subOrderShow: type,
    })
  }
  getItemHistory = (data, type) => {
    let self = this;
    self.getDefaultSubOrderView(type)
    self.setState({
      itemOrderHistory: data
    })
  }
  getReturnData = (data, type) => {
    // 
    let self = this;
    self.getDefaultSubOrderView(type)
    self.setState({
      returnItemDetail: data
    })
    self.returnCancelEligiblility("returns", data.itemId)
  }
  getCancelData = (data, type) => {
    let self = this;
    self.getDefaultSubOrderView(type)
    self.setState({
      cancelItemDetail: data
    })
    self.returnCancelEligiblility("cancellation", data.itemId)
  }
  selectReturnReason = (e) => {
    let self = this;
    self.setState({
      returnReason: e.target.value
    })
  }
  selectCancelReason = (e) => {
    let self = this;
    self.setState({
      cancelReason: e.target.value
    })
  }
  handleReturnCancelInitiate = (inputParam) => {
    let self = this;

    axios({
      method: "post",
      headers: authHeader(),
      url: config.apiUrl + "/Omuni/InitiateReturnOrCancel",
      data: inputParam
    })
      .then(function (res) {
        if (res.data.statusCode === 200) {
          self.setState({
            returnReason: "",
            cancelReason: ""
          })
          this.handleGetNotesTabDetails(self.state.ticketDetailID)
          NotificationManager.success(res.data.responseData.message !== undefined ? res.data.responseData.message : res.data.message)
        }
        else {
          NotificationManager.error(res.data.responseData.message !== undefined ? res.data.responseData.message : res.data.message)
        }
      })

  }
  handleReturn = (consignment) => {
    let self = this;
    let inputParam = {
      ticketId: "",
      customerID: self.state.customer_Id,
      customerMobileNo: self.state.customerData.customerPhoneNumber,
      customerEmail: self.state.customerData.customerEmailId,
      source: "",
      orderId: self.state.orderList[0]?.orderId,
      itemIds: [
        self.state.returnItemDetail?.itemId
      ],
      status: "RETURN_INITIATED",
      reason: self.state.returnReason,
      awb: consignment?.logisticsDetails?.airwayBillNumber,
      createdAt: Date.now(),
    };
    this.handleReturnCancelInitiate(inputParam)
  }
  handleCancel = () => {
    let self = this;
    //
    let inputParam = {
      ticketId: "",
      customerID: self.state.customer_Id,
      customerMobileNo: self.state.customerData.customerPhoneNumber,
      customerEmail: self.state.customerData.customerEmailId,
      // customerMobileNo: self.state.orderList[0]?.customerDetails?.mobileNumber,
      // customerEmail: self.state.orderList[0]?.customerDetails?.emailId,
      source: "",
      orderId: self.state.orderList[0]?.orderId,
      itemIds: [
        self.state.cancelItemDetail?.itemId
      ],
      status: "CANCELLED",
      reason: self.state.cancelReason,
      createdAt: Date.now(),
    };
    this.handleReturnCancelInitiate(inputParam)
  }
  // Credit note
  handleShowCreditNote = (val) => {
    this.setState({
      showCreditNote: val
    })
  }

  // Credit Note
  getCreditNoteMobile = (e) => {
    let self = this
    if (e.target.value.length <= 10) {
      self.setState({
        mobileNoCreditNote: e.target.value
      })
    }
  }
  getCreditNoteOrderId = (e) => {
    let self = this
    self.setState({
      creditNoteOrderId: e.target.value
    })
  }
  handleGetCreditNoteList = () => {
    let self = this;
    self.setState({
      creditNotes: [],
      isOrderSearchCreditLoading: true
    })
    if (self.state.mobileNoCreditNote !== "") {
      axios({
        method: "get",
        url: config.apiUrl + "/Omuni/GetCreditNoteDetails/" + self.state.mobileNoCreditNote,
        headers: authHeader(),
      })
        .then(function (res) {
          if (res.data.statusCode === 200) {
            self.setState({
              creditNotes: res.data.responseData,
              mobileNoCreditNote: "",
              isOrderSearchCreditLoading: false
            })
            self.handleShowCreditNote(true)
          }
          else {
            NotificationManager.error(res.data.message)
            self.setState({
              creditNotes: [],
              isOrderSearchCreditLoading: false
            })
          }
        })
    }
    else {
      self.setState({
        isOrderSearchCreditLoading: false
      })
      NotificationManager.error("Mobile number should not be Empty")
    }
  }
  handleCheckCreditNoteList = () => {
    let self = this;
    self.setState({
      creditNotes: [],
      isOrderSearchCreditLoading: true
    })
    // 
    if (self.state.creditNoteOrderId !== "") {
      axios({
        method: "get",
        url: config.apiUrl + "/Omuni/CheckCreditNoteDetail/" + self.state.creditNoteOrderId,
        headers: authHeader(),
      })
        .then(function (res) {
          if (res.data.statusCode === 200) {
            self.setState({
              creditNotes: [res.data.responseData],
              creditNoteOrderId: "",
              isOrderSearchCreditLoading: false
            })
            self.handleShowCreditNote(true)
          }
          else {
            NotificationManager.error(res.data.message)
            self.setState({
              creditNotes: [],
              isOrderSearchCreditLoading: false
            })
          }
        })
    }
    else {
      self.setState({
        isOrderSearchCreditLoading: false
      })
      NotificationManager.error("Order id should not be Empty")
    }
  }
  handleCreditNoteMobilePagination = (value) => {
    let self = this
    if (value === 'prev') {
      self.setState({
        currentCreditNote: self.state.currentCreditNote - 1
      })
    }
    else if (value === 'next') {
      self.setState({
        currentCreditNote: self.state.currentCreditNote + 1
      })
    }
  }
  handleNumberOfDaysExtand = (e) => {
    let self = this;
    self.setState({
      extedDays: e.target.value
    })
  }

  handleExtandReason = (e) => {
    let self = this;
    self.setState({
      extandReason: e.target.value
    })
  }
  handleCancelExtandReason = (e) => {
    let self = this;
    self.setState({
      cancelExtandReason: e.target.value
    })
  }
  confirmExtand = (couponVal) => {
    let self = this;

    axios({
      method: "post",
      headers: authHeader(),
      url: config.apiUrl + "/Omuni/RevalidateCreditNoteCoupon",
      data: {
        ticketId: "",
        customerID: self.state.customer_Id,
        customerMobileNo: self.state.customerData.customerPhoneNumber,
        customerEmail: self.state.customerData.customerEmailId,
        couponCode: couponVal,
        extendValidityForDays: self.state.extedDays,
        reason: self.state.extandReason
      }
    })
      .then(function (res) {
        if (res.data.statusCode === 200) {
          self.showExtendConfirm()
          self.setState({
            extedDays: 0,
            extandReason: ""
          })
          this.handleGetNotesTabDetails(self.state.ticket_Id)
          NotificationManager.success(res.data.message)
        }
        else {
          self.showExtendConfirm()
          NotificationManager.error(res.data.message)
        }
      })
  }
  cancelExtand = (couponVal) => {
    let self = this;
    axios({
      method: "post",
      headers: authHeader(),
      url: config.apiUrl + "/Omuni/CancelCreditNoteCoupon",
      data: {
        ticketId: "",
        customerID: self.state.customer_Id,
        customerMobileNo: self.state.customerData.customerPhoneNumber,
        customerEmail: self.state.customerData.customerEmailId,
        couponCode: couponVal,
        cancelReferenceNo: couponVal.split('R')[1],
        reason: self.state.cancelExtandReason
      }
    })

      .then(function (res) {
        if (res.data.statusCode === 200) {
          self.showCancelCreditConfirm()
          self.setState({
            cancelExtandReason: ""
          })
          this.handleGetNotesTabDetails(self.state.ticket_Id)
          NotificationManager.success(res.data.message)
        }
        else {
          self.showCancelCreditConfirm()
          NotificationManager.error(res.data.message)
        }
      })
  }
  formatDate = (val) => {
    let test = val
    if (val.includes('[')) {
      test = val.split('[')[0]
    }
    let dateVal = new Date(test);
    let date = dateVal.getDate()
    let month = dateVal.getMonth() + 1
    let year = dateVal.getUTCFullYear()
    if (month <= 9) {
      month = "0" + month
    }
    if (date <= 9) {
      date = "0" + date
    }
    var todayDate = date + '-' + month + '-' + year
    return todayDate
  }
  handleSpaces = (s) => {
    return s.replace(/([A-Z])/g, ' $1').trim()
  }
  setResolution = (e) => {
    let self = this;
    self.setState({
      selectedResolution: e.target.value
    })
  }


  typeTwoFormatDate(val) {
    let test = val
    if (val.includes('Z')) {
      test = val.split('Z')[0]
    }
    var todayDate = test
    return todayDate
  }
  newHandleOminiAttachProductData = (e) => {
    if (e.target.checked) {
      this.setState({
        isOminiAttach: true
      })
    }
    else {
      this.setState({
        isOminiAttach: false,
        selectedOminiItem: []
      })
    }
  }
  // to selecte/deselct items of omini
  handleOminiSelectedItem = (e, consignmentId, Item) => {
    let self = this;
    let selectedItems = self.state.selectedOminiItem
    if (e.target.checked) {
      let selectData = {}
      selectData.cId = consignmentId
      selectData.itemData = Item
      selectData.itemID = Item.itemId
      selectedItems.push(selectData)
      self.setState({
        selectedOminiItem: selectedItems,
        isOminiAttach: true
      })
      console.log(selectedItems, "checked");
    }
    else {

      selectedItems.forEach((element, i) => {
        if (element.itemData?.itemId === Item?.itemId) {
          selectedItems.splice(i, 1)
          self.setState({
            selectedOminiItem: selectedItems
          })
          if (selectedItems.length === 0) {
            self.setState({
              isOminiAttach: false
            })
          }
          console.log(selectedItems, "unchecked")
        }
      })
    }
  }

  // CC Avenue Flow
  handleShowCCAve = (val) => {
    this.setState({
      showCCAv: val
    })
  }


  // onchange cc avenue search input for orders
  handleSetCCAveID = (e) => {
    let self = this
    self.setState({
      ccAvenueTobeSearched: e.target.value
    })
  }
  // onchange mobile search input for cc avenue
  getCCAveMobileNo = (e) => {
    let self = this;
    if (e.target.value.length <= 10) {
      self.setState({
        ccAve_mobileNOtoSearch: e.target.value,
      })
    }
  }


  handleSearchCCAvenueType = (e) => {
    let self = this
    self.setState({
      ccAve_searchType: e.target.id
    })
    if (e.target.id === 'cc_MobId') {
      let number = self.state.customerData?.customerPhoneNumber?.length > 10 ?
        self.state.customerData?.customerPhoneNumber.split(/91(.*)/s)[1] : self.state.customerData?.customerPhoneNumber
      self.setState({
        ccAve_mobileNOtoSearch: number
      })
    }
    else {
      self.setState({
        ccAve_mobileNOtoSearch: ""
      })
    }
  }

  getListOfCCAvenueMobile = async () => {
    let self = this;

    self.setState({
      ccAvenueMobileList: [],
      isCCAvenueSearchLoading: true
    })
    if (self.state.ccAve_mobileNOtoSearch !== "") {
      axios({
        method: "post",
        headers: authHeader(),
        url: config.apiUrl + "/Payment/CCAvenuePaymentDetailsByMobile/",
        params: {
          MobileNo: self.state.ccAve_mobileNOtoSearch
        }
        // data: {
        //   mobileNo: self.state.mobileNOtoSearch,
        //   countryCallingCode: "+" + self.state.countryCode,
        //   userType: "CUSTOMER"
        // }
      })
        .then(function (res) {
          if (res.data.statusCode === 200) {
            self.setState({
              ccAvenueMobileList: res.data.responseData.encResponse.order_Status_List,
              ccAve_mobileNOtoSearch: "",
              isCCAvenueSearchLoading: false,
              showCCAv: true
            })
          }
          else {
            NotificationManager.error(res.data.responseData?.message !== undefined ? res.data.responseData?.message : res.data.message)
            self.setState({
              isCCAvenueSearchLoading: false
            })
          }
        })

    }
    else {
      NotificationManager.error("Mobile no should not be Empty")
      self.setState({
        isCCAvenueSearchLoading: false
      })
    }

  }
  handleGetCCAvenueOrder = async (val) => {
    let self = this;
    self.setState({
      ccAvenueOrderList: [],
      currentSubOrder: 0,
      isCCAvenueSearchLoading: val === "" ? true : false
    })

    let data = val !== "" ? val : this.state.ccAvenueTobeSearched
    if (data !== "") {
      axios({
        method: "POST",
        headers: authHeader(),
        url: config.apiUrl + "/Payment/CCAvenuePaymentDetailsByOrderId",
        params: {
          OrderNo: data,
        },
      })
        .then(function (res) {
          if (res.data.statusCode === 200) {
            self.setState({
              ccAvenueTobeSearched: "",
              ccAvenueOrderList: res.data.responseData,
              isCCAvenueSearchLoading: false,
              showCCAv: true
            })
          }
          else {
            self.setState({
              isCCAvenueSearchLoading: false
            })
            NotificationManager.error(res.data.responseData?.message !== undefined ? res.data.responseData?.message : res.data.message)
          }
        })
    }
    else {
      NotificationManager.error("Order id should not be Empty")
      self.setState({
        isCCAvenueSearchLoading: false
      })
    }
  }
  handleRadioChange = (e) => {
    //
    let val = e.target.value
    //console.log("val",val)
    this.setState({
      programselect: val
    })
  }
  handleEscalationDate = (e) => {
    //
    console.log(e.target.value, "e.target.value");
    let data = e.target.value
    this.setState({
      EscalationDate: data

    })
  }
  handleEscalationStatus = (e) => {
    console.log(e.target.value, "e.target.value");
    let data = e.target.value
    this.setState({
      EscalationSourceId: data

    })


  }
  setDepartmentNameEmail = (e) => {
    //console.log(e.target.value, "e.target.value");
    var data = e.target.value
    let splitData = data.split("|")
    //console.log(splitData, "splitData");
    this.setState({
      DepartmentEmailParam: splitData[0],
      DepartmentTeamID: parseInt(splitData[1])
    })
  }
  handleSearchItemToAttach = (e) => {
    let val = e.target.value
    //console.log("val", val)
    this.setState({
      itemtobeSearch: val
    })
  }
  handleSearchItemADB = () => {
    let self = this
    let itemName = this.state.itemtobeSearch
    this.setState({
      ItemCodeAdb: "",
      ItemNameAdb: "",
      itemPriceUnk: 0,
      isOrderSearchLoading: true
    })
    if (!this.state.itemtobeSearch == "") {
      axios({
        method: "post",
        url: config.apiUrl + "/Order/getItemMasterByName",
        headers: authHeader(),
        params: {
          itemName
        }
      }).then(function (res) {
        //let success = res.data.message
        //console.log("res.data", res.data)
        if (res.data.message === "Success") {
          NotificationManager.success("Successfully")
          self.setState({
            isOrderSearchLoading: false,
            itemUnknowndata: res.data.responseData,
            itemtobeSearch: ""
          })
          console.log("itemSearchdata", res.data.responseData)

        }
        else {
          NotificationManager.error(res.data.message)
          self.setState({
            isOrderSearchLoading: false,

          })

        }

      })
        .catch((data) => {
          console.log(data);
        });

    }
    else {
      NotificationManager.error("Search item not empty")
      this.setState({
        itemUnknowndata: [],
        isOrderSearchLoading: false,
      })
    }


  }
  handelSelectItemADB = (e) => {
    //
    let val = e.target.value
    if (val === "-1") {
      this.setState({
        ItemNameAdb: "",
        ItemCodeAdb: "",
      })
    }
    else {
      let data = val.split("|")
      console.log("EE", data)
      this.setState({
        ItemNameAdb: data[0],
        ItemCodeAdb: data[1],
        itemPriceUnk: parseInt(data[2])

      })

    }


  }
  handleAttachItemObject = () => {
    if (this.state.ItemCodeAdb.length > 0) {
      let objItem = {
        ArticleNumber: this.state.ItemCodeAdb,
        OrderItemID: 0,
        OrderMasterID: 0,
        ItemName: this.state.ItemNameAdb,
        InvoiceNumber: "Unkown",
        InvoiceDate: null,
        ItemCount: null,
        ItemPrice: this.state.itemPriceUnk,
        PricePaid: this.state.itemPriceUnk,
        Size: null,
        RequireSize: "0",
        Discount: 0,
        ItemCode: this.state.ItemCodeAdb,
        ArticleName: this.state.ItemNameAdb,
        isCheck: true

      }
      // console.log("objItem",objItem)
      let val = this.state.selectedItemDataUnknown
      val.push(objItem)
      this.setState({
        selectedItemDataUnknown: val,
      }, () => {
        console.log("this.state.selectedItemDataUnknown", this.state.selectedItemDataUnknown)
      })

      NotificationManager.success("Item Added Successfully")
    }
    else {
      NotificationManager.error("Please Select Item")
    }

  }
  handleDeleteItem = (e) => {
    let indexToRemove = e.ItemCode
    let newArray = this.state.selectedItemDataUnknown.filter((item, index) => item.ItemCode !== indexToRemove)

    this.setState({
      selectedItemDataUnknown: newArray

    })
    NotificationManager.success("Item Removed Successfully")

  };
  render() {
    const TranslationContext = this.state.translateLanguage.default;
    const { searchType, showOrders, showCreditNote, isExtendCancel, creditSearchType,
      isorderFromShop, orderIdTobeSearched, mobileNOtoSearch, orderList, currentSubOrder,
      subOrderShow, cancelEligbleDetail, returnEligbleDetail, itemOrderHistory,
      returnItemDetail, cancelItemDetail, isOrderSearchLoading, mobileOrders,
      creditNoteOrderId, mobileNoCreditNote, isOrderSearchCreditLoading, creditNotes,
      currentCreditNote, extedDays, extandReason, cancelExtandReason,
      tenantFlags, resolutionData, selectedOminiItem, showCCAv, ccAve_searchType,
      ccAvenueTobeSearched, ccAve_mobileNOtoSearch, isCCAvenueSearchLoading,
      ccAvenueOrderList, ccAvenueMobileList
    } = this.state;
    var CustomerId = this.state.customerDetails.customerId;
    var CustNumber = this.state.customerData.customerPhoneNumber;

    return (
      <div style={{ backgroundColor: "#f5f8f9", paddingBottom: "2px" }}>
        <div className="rectanglesystem">
          <table className="table">
            <tbody>
              <tr>
                <td className="tdicon">
                  <a
                    href="#!"
                    className="bitmapback"
                    onClick={this.handlebackprev.bind(this)}
                  >
                    <img src={ArrowLeftCircleBlue} alt="arrow-circle-left" />
                  </a>
                  <label className="source">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.source
                      : "Source"}
                  </label>
                  <img
                    src={RedHeadPhoneIcon}
                    alt="headphone"
                    className="bitmapheadpone"
                  />
                  <label className="a91-9873470074">{CustNumber}</label>
                  <CopyToClipboard
                    text={CustNumber}
                    onCopy={() => this.setState({ copiedNumber: true })}
                  >
                    <a
                      href="#!"
                      className="bitmapheadpone d-inline-block p-0 ml-2"
                      style={{ width: "20px" }}
                      onClick={this.handleCopyToaster}
                    >
                      <img src={CopyIcon} alt="Copy-Icon" className="w-100" />
                    </a>
                  </CopyToClipboard>
                </td>

                <td className="tdtextnew" style={{ padding: "5px" }}>
                  <button
                    type="button"
                    className="save-as-a-draft"
                    onClick={this.handleCREATE_TICKET.bind(this, "100")}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.button.saveasdraft
                      : "SAVE AS DRAFT"}
                  </button>
                  <button
                    className="rectanglecreateticket create-ticket"
                    onClick={this.handleSubmit.bind(
                      this,
                      this.state.selectedTicketActionType
                    )}
                  >
                    {this.state.selectedTicketActionType === "201" || this.state.selectedTicketActionType === "202"
                      ? TranslationContext !== undefined
                        ? TranslationContext.button.createticket
                        : "CREATE TICKET"
                      : "SUBMIT AS SOLVED"}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mask-ticket-system">
          {this.state.loading === true ? (
            <div className="loader-icon"></div>
          ) : (
            <div className="row marginsystem">
              <div className="column marginsystem1">
                <div className="paddingsystem paddingsystem-scl">
                  <div className="ticket-details-scl">
                    <div className="row m-b-10">
                      {this.state.displayField["Ticket Title"] && (
                        <div className="col-md-12">
                          <label className="category">
                            {this.state.ticketFields.length > 0
                              ? this.state.ticketFields.filter(
                                (x) =>
                                  x.fieldName.toLowerCase() ===
                                  "Ticket Title".toLowerCase()
                              ).length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "Ticket Title".toLowerCase()
                                )[0].createPage
                                  ? TranslationContext !== undefined
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Ticket Title".toLowerCase()
                                    )[0].displayHindiName ||
                                    TranslationContext.label.tickettitle
                                    : this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Ticket Title".toLowerCase()
                                    )[0].displayEnglishName || "Ticket Title"
                                  : TranslationContext !== undefined
                                    ? TranslationContext.label.tickettitle
                                    : "Ticket Title"
                                : TranslationContext !== undefined
                                  ? TranslationContext.label.tickettitle
                                  : "Ticket Title"
                              : TranslationContext !== undefined
                                ? TranslationContext.label.tickettitle
                                : "Ticket Title"}
                          </label>

                          <div
                            className="custom-ticket-title"
                            onClick={() => this.toggleTitleSuggestion()}
                            ref={this.setWrapperRef}
                          >
                            <input
                              placeholder={
                                TranslationContext !== undefined
                                  ? TranslationContext.span.suggestion
                                  : "Suggestions"
                              }
                              value={this.state.titleSuggValue}
                              type="text"
                              onChange={this.handleTicSugg}
                              ref={(input) => {
                                this.searchInput = input;
                              }}
                              id="titleSuggestion"
                              autoComplete="off"
                              style={{ marginBottom: "5px" }}
                            />
                            {this.state.titleSuggValue.length === 0 && (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.ticketTitleCompulsion}
                              </p>
                            )}
                            {this.state.fieldError ? (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.fieldError["Ticket Title"]}
                              </p>
                            ) : null}
                            {this.state.TicketTitleData !== null &&
                              this.state.TicketTitleData.length > 0 &&
                              this.state.titleSuggValue.length > 0 && (
                                <div className="custom-ticket-title-suggestions">
                                  {this.state.TicketTitleData !== null &&
                                    this.state.TicketTitleData.map(
                                      (item, i) => (
                                        <span
                                          key={i}
                                          onClick={
                                            this.handleAppendTicketSuggestion
                                          }
                                          title={item.ticketTitleToolTip}
                                        >
                                          {item.ticketTitle}
                                        </span>
                                      )
                                    )}
                                </div>
                              )}
                          </div>
                        </div>
                      )}
                    </div>

                    {this.state.displayField["Ticket Details"] && (
                      <div className="row m-b-10">
                        <div className="col-md-12">
                          <label className="category">
                            {this.state.ticketFields.length > 0
                              ? this.state.ticketFields.filter(
                                (x) =>
                                  x.fieldName.toLowerCase() ===
                                  "Ticket Details".toLowerCase()
                              ).length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "Ticket Details".toLowerCase()
                                )[0].createPage
                                  ? TranslationContext !== undefined
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Ticket Details".toLowerCase()
                                    )[0].displayHindiName ||
                                    TranslationContext.label.ticketdetails
                                    : this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Ticket Details".toLowerCase()
                                    )[0].displayEnglishName ||
                                    "Ticket Details"
                                  : TranslationContext !== undefined
                                    ? TranslationContext.label.ticketdetails
                                    : "Ticket Details"
                                : TranslationContext !== undefined
                                  ? TranslationContext.label.ticketdetails
                                  : "Ticket Details"
                              : TranslationContext !== undefined
                                ? TranslationContext.label.ticketdetails
                                : "Ticket Details"}
                          </label>
                          <textarea
                            className="ticket-details-textarea-system"
                            placeholder={
                              TranslationContext !== undefined
                                ? TranslationContext.label.ticketdetails
                                : "Write your detail here"
                            }
                            name="ticketDetails"
                            value={this.state.ticketDetails}
                            onChange={this.handleTicketChange}
                            maxLength={250}
                          ></textarea>
                          {this.state.ticketDetails.length === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.ticketDetailsCompulsion}
                            </p>
                          )}
                          {!this.state.ticketDetails.length > 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["Ticket Details"]}
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="row create-ticket-form px-3">
                      {!(this.state.storeticketsrch) && this.state.displayField["Customer Type"] && (
                        <div>
                          <label className="sub-category">
                            {this.state.ticketFields.length > 0
                              ? this.state.ticketFields.filter(
                                (x) =>
                                  x.fieldName.toLowerCase() ===
                                  "Customer Type".toLowerCase()
                              ).length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "Customer Type".toLowerCase()
                                )[0].createPage
                                  ? TranslationContext !== undefined
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Customer Type".toLowerCase()
                                    )[0].displayHindiName ||
                                    TranslationContext.label.channelofpurchase
                                    : this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Customer Type".toLowerCase()
                                    )[0].displayEnglishName || "Customer Type"
                                  : "Customer Type"
                                : "Customer Type"
                              : "Customer Type"}
                          </label>
                          <select
                            className="category-select-system dropdown-label"
                            value={
                              this.state.ticketFiledNewInput.CustomerType ||
                              null
                            }
                            onChange={this.handelTicketFieldInputChange.bind(
                              this,
                              "CustomerType"
                            )}
                            disabled={window.localStorage.getItem('Programcode') === 'campusshoes' ? true : false}
                          >
                            <option
                              className="select-category-placeholder"
                              value={null}
                            >
                              Select
                            </option>
                            {this.state.customerTypeData.length > 0
                              ? this.state.customerTypeData.map((item, i) => (
                                <option
                                  key={i}
                                  value={item.customerType_Id + ""}
                                  className="select-category-placeholder"
                                >
                                  {item.customerType_Name}
                                </option>
                              ))
                              : null}
                          </select>
                          {this.state.fieldError ? (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["Customer Type"]}
                            </p>
                          ) : null}
                        </div>
                      )}

                      {this.state.displayField["Complaint Call"] && (
                        <div>
                          <label className="category">
                            {this.state.ticketFields.length > 0
                              ? this.state.ticketFields.filter(
                                (x) =>
                                  x.fieldName.toLowerCase() ===
                                  "Complaint Call".toLowerCase()
                              ).length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "Complaint Call".toLowerCase()
                                )[0].createPage
                                  ? TranslationContext !== undefined
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Complaint Call".toLowerCase()
                                    )[0].displayHindiName ||
                                    TranslationContext.label.channelofpurchase
                                    : this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Complaint Call".toLowerCase()
                                    )[0].displayEnglishName ||
                                    "Complaint Call"
                                  : "Complaint Call"
                                : "Complaint Call"
                              : "Complaint Call"}
                          </label>
                          <select
                            className="category-select-system dropdown-label"
                            value={
                              this.state.ticketFiledNewInput.ComplaintCall ||
                              null
                            }
                            onChange={this.handelTicketFieldInputChange.bind(
                              this,
                              "ComplaintCall"
                            )}
                          >
                            <option
                              value={null}
                              className="select-category-placeholder"
                            >
                              Select
                            </option>
                            {this.state.complaintCallData !== null &&
                              this.state.complaintCallData.map((item, i) => (
                                <option
                                  key={item.complaintCall_Id}
                                  value={item.complaintCall_Id + ""}
                                  className="select-category-placeholder"
                                >
                                  {item.complaintCall_Name}
                                </option>
                              ))}
                          </select>
                          {this.state.fieldError ? (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["Complaint Call"]}
                            </p>
                          ) : null}
                        </div>
                      )}
                      {!(this.state.storeticketsrch) && this.state.displayField["Brand"] && (
                        <div>
                          <label className="category">
                            {this.state.ticketFields.length > 0
                              ? this.state.ticketFields.filter(
                                (x) =>
                                  x.fieldName.toLowerCase() ===
                                  "Brand".toLowerCase()
                              ).length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "Brand".toLowerCase()
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
                          </label>

                          <select
                            className="category-select-system dropdown-label"
                            value={this.state.selectedBrand}
                            onChange={this.setBrandValues}
                            disabled={
                              this.state.BrandData.length == 1 ? true : false
                            }
                          >
                            <option
                              value=""
                              className="select-category-placeholder"
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.ticketingDashboard
                                  .selectbrand
                                : "Select Brand"}
                            </option>
                            {this.state.BrandData !== null &&
                              this.state.BrandData.map((item, i) => (
                                <option
                                  key={i}
                                  value={item.brandID}
                                  className="select-category-placeholder"
                                >
                                  {item.brandName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectedBrand.length === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.ticketBrandCompulsion}
                            </p>
                          )}
                          {this.state.fieldError ? (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["Brand"]}
                            </p>
                          ) : null}
                        </div>
                      )}

                      {!(this.state.storeticketsrch) && this.state.displayField["BusinessUnit"] && (
                        <div>
                          <label className="sub-category">
                            {this.state.ticketFields.length > 0
                              ? this.state.ticketFields.filter(
                                (x) =>
                                  x.fieldName.toLowerCase() ===
                                  "BusinessUnit".toLowerCase()
                              ).length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "BusinessUnit".toLowerCase()
                                )[0].createPage
                                  ? TranslationContext !== undefined
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "BusinessUnit".toLowerCase()
                                    )[0].displayHindiName ||
                                    TranslationContext.label.issuetype
                                    : this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "BusinessUnit".toLowerCase()
                                    )[0].displayEnglishName || "BusinessUnit"
                                  : TranslationContext !== undefined
                                    ? TranslationContext.label.issuetype
                                    : "BusinessUnit"
                                : TranslationContext !== undefined
                                  ? TranslationContext.label.issuetype
                                  : "BusinessUnit"
                              : TranslationContext !== undefined
                                ? TranslationContext.label.issuetype
                                : "BusinessUnit"}
                          </label>
                          <select
                            value={this.state.selectedBusinessUnit}
                            onChange={this.handleBusinessUnit}
                            className="category-select-system dropdown-label"
                          >
                            <option className="select-sub-category-placeholder" readOnly>
                              {TranslationContext !== undefined
                                ? TranslationContext.option.selectissuetype
                                : "Select Business unit"}
                            </option>
                            {this.state.businessUnitData !== null &&
                              this.state.businessUnitData.map((item, i) => (
                                <option
                                  key={i}
                                  value={item.businessUnitId}
                                  className="select-category-placeholder"
                                >
                                  {item.businessUnitName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectedBusinessUnit.length === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.ticketIssueTypeCompulsion}

                            </p>
                          )}
                          {this.state.selectedBusinessUnit.length == "" || this.state.selectedBusinessUnit === "Select Business unit" ?

                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["Business Unit"]}

                            </p> : null}
                        </div>
                      )}


                      {this.state.displayField["SubBusinessUnit"] && (
                        <div>
                          <label className="sub-category">
                            {this.state.ticketFields.length > 0
                              ? this.state.ticketFields.filter(
                                (x) =>
                                  x.fieldName.toLowerCase() ===
                                  "SubBusinessUnit".toLowerCase()
                              ).length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "SubBusinessUnit".toLowerCase()
                                )[0].createPage
                                  ? TranslationContext !== undefined
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "SubBusinessUnit".toLowerCase()
                                    )[0].displayHindiName ||
                                    TranslationContext.label.issuetype
                                    : this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "SubBusinessUnit".toLowerCase()
                                    )[0].displayEnglishName || "SubBusinessUnit"
                                  : TranslationContext !== undefined
                                    ? TranslationContext.label.issuetype
                                    : "SubBusinessUnit"
                                : TranslationContext !== undefined
                                  ? TranslationContext.label.issuetype
                                  : "SubBusinessUnit"
                              : TranslationContext !== undefined
                                ? TranslationContext.label.issuetype
                                : "SubBusinessUnit"}
                          </label>
                          <select
                            value={this.state.selectedSubBusinessUnit}
                            onChange={this.handleSubBusinessUnit}
                            className="category-select-system dropdown-label"
                          >
                            <option className="select-sub-category-placeholder">
                              {TranslationContext !== undefined
                                ? TranslationContext.option.selectissuetype
                                : "Select Sub Business unit"}
                            </option>
                            {this.state.subbusinessUnitData !== null &&
                              this.state.subbusinessUnitData.map((item, i) => (
                                <option
                                  key={i}
                                  value={item.subBusinessUnitId}
                                  className="select-category-placeholder"
                                >
                                  {item.subBusinessUnitName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectedSubBusinessUnit.length === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.ticketIssueTypeCompulsion}
                            </p>
                          )}
                          {this.state.fieldError ? (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["Sub Business Unit"]}
                            </p>
                          ) : null}
                        </div>
                      )}


                      {this.state.displayField["Category"] && (
                        <div>
                          <label className="sub-category">
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
                          </label>
                          <select
                            value={this.state.selectedCategory}
                            onChange={this.setCategoryValue}
                            className="category-select-system dropdown-label"
                          >
                            <option
                              // value=""
                              className="select-category-placeholder"
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.option.selectcategory
                                : "Select Category"}
                            </option>
                            {this.state.CategoryData !== null &&
                              this.state.CategoryData.map((item, i) => (
                                <option
                                  key={i}
                                  value={item.categoryID}
                                  className="select-category-placeholder"
                                >
                                  {item.categoryName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectedCategory.length === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.ticketCategoryCompulsion}
                            </p>
                          )}
                          {this.state.selectedCategory == "" || this.state.selectedCategory === "Select Category" ? (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["Category"]}
                            </p>
                          ) : null}
                        </div>
                      )}



                      {this.state.displayField["Sub Category"] && (
                        <div>
                          <label className="category">
                            {this.state.ticketFields.length > 0
                              ? this.state.ticketFields.filter(
                                (x) =>
                                  x.fieldName.toLowerCase() ===
                                  "Sub Category".toLowerCase()
                              ).length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "Sub Category".toLowerCase()
                                )[0].createPage
                                  ? TranslationContext !== undefined
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Sub Category".toLowerCase()
                                    )[0].displayHindiName ||
                                    TranslationContext.label.subcategory
                                    : this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Sub Category".toLowerCase()
                                    )[0].displayEnglishName || "Sub Category"
                                  : TranslationContext !== undefined
                                    ? TranslationContext.label.subcategory
                                    : "Sub Category"
                                : TranslationContext !== undefined
                                  ? TranslationContext.label.subcategory
                                  : "Sub Category"
                              : TranslationContext !== undefined
                                ? TranslationContext.label.subcategory
                                : "Sub Category"}
                          </label>
                          <select
                            value={this.state.selectedSubCategory}
                            onChange={this.setSubCategoryValue}
                            className="category-select-system dropdown-label"
                          >
                            <option className="select-category-placeholder">
                              {TranslationContext !== undefined
                                ? TranslationContext.option.selectsubcategory
                                : "Select Sub Category"}
                            </option>
                            {this.state.SubCategoryData !== null &&
                              this.state.SubCategoryData.map((item, i) => (
                                <option
                                  key={i}
                                  value={item.subCategoryID}
                                  className="select-category-placeholder"
                                >
                                  {item.subCategoryName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectedSubCategory.length === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.ticketSubCategoryCompulsion}
                            </p>
                          )}
                          {this.state.selectedSubCategory == "" || this.state.selectedSubCategory === "Select Sub Category" ? (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["Sub Category"]}
                            </p>
                          ) : null}
                        </div>
                      )}

                      {this.state.displayField["SubSubCategoryId"] && (
                        <div>
                          <label className="category">
                            {this.state.ticketFields.length > 0
                              ? this.state.ticketFields.filter(
                                (x) =>
                                  x.fieldName.toLowerCase() ===
                                  "SubSubCategoryId".toLowerCase()
                              ).length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "SubSubCategoryId".toLowerCase()
                                )[0].createPage
                                  ? TranslationContext !== undefined
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "SubSubCategoryId".toLowerCase()
                                    )[0].displayHindiName ||
                                    TranslationContext.label.subcategory
                                    : this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "SubSubCategoryId".toLowerCase()
                                    )[0].displayEnglishName || "SubSubCategoryId"
                                  : TranslationContext !== undefined
                                    ? TranslationContext.label.subcategory
                                    : "SubSubCategoryId"
                                : TranslationContext !== undefined
                                  ? TranslationContext.label.subcategory
                                  : "SubSubCategoryId"
                              : TranslationContext !== undefined
                                ? TranslationContext.label.subcategory
                                : "SubSubCategoryId"}
                          </label>
                          <select
                            value={this.state.selectedSubSubCategory}
                            onChange={this.setSubSubCategoryValue}
                            className="category-select-system dropdown-label"
                          >
                            <option className="select-category-placeholder">
                              {TranslationContext !== undefined
                                ? TranslationContext.option.selectsubcategory
                                : "Select Sub Sub CategoryId"}
                            </option>
                            {this.state.subSubCategoryData !== null &&
                              this.state.subSubCategoryData.map((item, i) => (
                                <option
                                  key={i}
                                  value={item.subSubCategoryID}
                                  className="select-category-placeholder"
                                >
                                  {item.subSubCategoryName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectedSubSubCategory.length === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.ticketSubCategoryCompulsion}
                            </p>
                          )}
                          {this.state.selectedSubSubCategory == "" || this.state.selectedSubSubCategory === "Select Sub Sub CategoryId" ? (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["Sub Sub Category"]}
                            </p>
                          ) : null}
                        </div>
                      )}


                      {!(this.state.storeticketsrch) && this.state.displayField["Issue Type"] && (
                        <div>
                          <label className="sub-category">
                            {this.state.ticketFields.length > 0
                              ? this.state.ticketFields.filter(
                                (x) =>
                                  x.fieldName.toLowerCase() ===
                                  "Issue Type".toLowerCase()
                              ).length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "Issue Type".toLowerCase()
                                )[0].createPage
                                  ? TranslationContext !== undefined
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Issue Type".toLowerCase()
                                    )[0].displayHindiName ||
                                    TranslationContext.label.issuetype
                                    : this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Issue Type".toLowerCase()
                                    )[0].displayEnglishName || "Issue Type"
                                  : TranslationContext !== undefined
                                    ? TranslationContext.label.issuetype
                                    : "Issue Type"
                                : TranslationContext !== undefined
                                  ? TranslationContext.label.issuetype
                                  : "Issue Type"
                              : TranslationContext !== undefined
                                ? TranslationContext.label.issuetype
                                : "Issue Type"}
                          </label>
                          <select
                            value={this.state.selectedIssueType}
                            onChange={this.setIssueTypeValue}
                            className="category-select-system dropdown-label"
                          >
                            <option className="select-sub-category-placeholder" readOnly>
                              {TranslationContext !== undefined
                                ? TranslationContext.option.selectissuetype
                                : "Select Issue Type"}
                            </option>
                            {this.state.IssueTypeData !== null &&
                              this.state.IssueTypeData.map((item, i) => (
                                <option
                                  key={i}
                                  value={item.issueTypeID}
                                  className="select-category-placeholder"
                                >
                                  {item.issueTypeName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectedIssueType.length === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.ticketIssueTypeCompulsion}
                            </p>
                          )}
                          {this.state.selectedIssueType === "" && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["Issue Type"]}
                            </p>
                          )}
                        </div>
                      )}

                      {!(this.state.storeticketsrch) && this.state.displayField["ECR"] && (
                        <div>
                          <label className="sub-category">
                            {this.state.ticketFields.filter(
                              (x) =>
                                x.fieldName.toLowerCase() ===
                                "ECR".toLowerCase()
                            )[0].displayEnglishName}
                          </label>
                          <select
                            value={this.state.selectedEcr}
                            // onChange={this.setIssueTypeValue}
                            onChange={this.handleGetEcrData}
                            className="category-select-system dropdown-label"
                          >
                            <option className="select-sub-category-placeholder" readOnly>
                              Select ECR
                            </option>
                            {this.state.ecrData?.ecrID !== undefined &&
                              <option
                                value={this.state.ecrData?.ecrID}
                                className="select-category-placeholder"
                              >
                                {this.state.ecrData?.ecrName}
                              </option>
                            }
                          </select>

                          {this.state.selectedEcr === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["ECR"]}
                            </p>
                          )}

                        </div>
                      )}

                      {!(this.state.storeticketsrch) && this.state.displayField["Ticket Priority"] && (
                        <div>
                          <label className="category">
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
                          </label>
                          <div className="priority-butns-cntr">
                            {this.state.TicketPriorityData !== null &&
                              this.state.TicketPriorityData.map((item, i) => (
                                <div key={i} className="priority-butns">
                                  <input
                                    type="radio"
                                    name="ticket-priority"
                                    id={item.priortyName}
                                    value={item.priorityID}
                                    onChange={this.setTicketPriorityValue}
                                    checked={
                                      item.priorityID ===
                                      this.state.selectedTicketPriority
                                    }
                                  />
                                  <label
                                    htmlFor={item.priortyName}
                                    className={
                                      item.priortyName === "Auto"
                                        ? "autopriority"
                                        : null
                                    }
                                  >
                                    {item.priortyName}
                                  </label>
                                </div>
                              ))}
                            {this.state.checkPriorityDetails && (
                              <p style={{ color: "red", marginTop: "15px" }}>
                                {TranslationContext !== undefined
                                  ? TranslationContext.ticketingDashboard
                                    .slahasnotbeencreated
                                  : "SLA has not been created"}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {!(this.state.storeticketsrch) && this.state.displayField["Ticket Action Type"] && (
                        <div>
                          <label className="sub-category">
                            {this.state.ticketFields.length > 0
                              ? this.state.ticketFields.filter(
                                (x) =>
                                  x.fieldName.toLowerCase() ===
                                  "Ticket Action Type".toLowerCase()
                              ).length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "Ticket Action Type".toLowerCase()
                                )[0].createPage
                                  ? TranslationContext !== undefined
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Ticket Action Type".toLowerCase()
                                    )[0].displayHindiName ||
                                    TranslationContext.label.ticketactiontype
                                    : this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Ticket Action Type".toLowerCase()
                                    )[0].displayEnglishName ||
                                    "Ticket Action Type"
                                  : TranslationContext !== undefined
                                    ? TranslationContext.label.ticketactiontype
                                    : "Ticket Action Type"
                                : TranslationContext !== undefined
                                  ? TranslationContext.label.ticketactiontype
                                  : "Ticket Action Type"
                              : TranslationContext !== undefined
                                ? TranslationContext.label.ticketactiontype
                                : "Ticket Action Type"}
                          </label>
                          <div className="action-type-butns-cntr">
                            <div className="action-type-butns">
                              <input
                                type="radio"
                                name="ticket-action-type"
                                id="qc"
                                value="200"
                                onChange={this.setTicketActionTypeValue}
                                checked={
                                  this.state.selectedTicketActionType === "200"
                                }
                              />
                              <Tooltip
                                placement="bottom"
                                title={"Quick Closure"}
                              >
                                <label htmlFor="qc">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.label.qc
                                    : "QC"}
                                </label>
                              </Tooltip>
                            </div>
                            <div className="action-type-butns">
                              <input
                                type="radio"
                                name="ticket-action-type"
                                id="etb"
                                value="201"
                                onChange={this.setTicketActionTypeValue}
                                checked={
                                  this.state.selectedTicketActionType === "201"
                                }
                              />
                              <Tooltip
                                placement="bottom"
                                title={"Escalate To Brand"}
                              >
                                <label htmlFor="etb">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.label.etb
                                    : "ETB"}
                                </label>
                              </Tooltip>
                            </div>
                            {
                              this.state.displayField["EscalationSource"] && <div className="action-type-butns">
                                <input
                                  type="radio"
                                  name="ticket-action-type"
                                  id="esc"
                                  value="202"
                                  onChange={this.setTicketActionTypeValue}
                                  checked={
                                    this.state.selectedTicketActionType === "202"
                                  }
                                />
                                <Tooltip
                                  placement="bottom"
                                  title={"Escalate To Brand"}
                                >
                                  <label htmlFor="esc">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label.esc
                                      : "Escalation"}
                                  </label>
                                </Tooltip>
                              </div>
                            }

                          </div>
                        </div>
                      )}
                      {!(this.state.storeticketsrch) && this.state.displayField["Call Back"] && (
                        <div
                          className="d-flex"
                          style={{ alignItems: "center" }}
                        >
                          <label className="category mr-2">
                            {this.state.ticketFields.length > 0
                              ? this.state.ticketFields.filter(
                                (x) =>
                                  x.fieldName.toLowerCase() ===
                                  "Call Back".toLowerCase()
                              ).length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "Call Back".toLowerCase()
                                )[0].createPage
                                  ? TranslationContext !== undefined
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Call Back".toLowerCase()
                                    )[0].displayHindiName ||
                                    TranslationContext.label.channelofpurchase
                                    : this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Call Back".toLowerCase()
                                    )[0].displayEnglishName || "Call Back"
                                  : "Call Back"
                                : "Call Back"
                              : "Call Back"}
                          </label>

                          <div className="action-type-butns-cntr">
                            <div className="action-type-butns">
                              <Switch
                                checkedChildren="Yes"
                                unCheckedChildren="No"
                                checked={
                                  this.state.ticketFiledNewInput.CallBack
                                }
                                onChange={this.handelTicketFieldInputChange.bind(
                                  this,
                                  "CallBack"
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {!(this.state.storeticketsrch) && this.state.displayField["Channel Of Purchase"] && (
                        <div>
                          <label className="category">
                            {this.state.ticketFields.length > 0
                              ? this.state.ticketFields.filter(
                                (x) =>
                                  x.fieldName.toLowerCase() ===
                                  "Channel Of Purchase".toLowerCase()
                              ).length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "Channel Of Purchase".toLowerCase()
                                )[0].createPage
                                  ? TranslationContext !== undefined
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Channel Of Purchase".toLowerCase()
                                    )[0].displayHindiName ||
                                    TranslationContext.label.channelofpurchase
                                    : this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Channel Of Purchase".toLowerCase()
                                    )[0].displayEnglishName ||
                                    "Channel Of Purchase"
                                  : TranslationContext !== undefined
                                    ? TranslationContext.label.channelofpurchase
                                    : "Channel Of Purchase"
                                : TranslationContext !== undefined
                                  ? TranslationContext.label.channelofpurchase
                                  : "Channel Of Purchase"
                              : TranslationContext !== undefined
                                ? TranslationContext.label.channelofpurchase
                                : "Channel Of Purchase"}
                          </label>
                          <select
                            value={this.state.selectedChannelOfPurchase}
                            onChange={this.setChannelOfPurchaseValue}
                            className="category-select-system dropdown-label"
                          >
                            <option
                              value=""
                              className="select-category-placeholder"
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.option
                                  .selectchannelofpurchase
                                : "Select"}
                            </option>
                            {this.state.ChannelOfPurchaseData !== null &&
                              this.state.ChannelOfPurchaseData.map(
                                (item, i) => (
                                  <option
                                    key={i}
                                    value={item.channelOfPurchaseID}
                                    className="select-category-placeholder"
                                  >
                                    {item.nameOfChannel}
                                  </option>
                                )
                              )}
                          </select>

                          {this.state.selectedChannelOfPurchase === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.channelPurchaseCompulsion}
                            </p>
                          )}
                          {this.state.selectedChannelOfPurchase === 0 || this.state.selectedChannelOfPurchase == "" || this.state.selectedChannelOfPurchase === "Select" ? (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["Channel Of Purchase"]}
                            </p>
                          ) : null}
                        </div>
                      )}
                      {!(this.state.storeticketsrch) && this.state.displayField["Unit Name"] && (
                        <div>
                          <label className="category">
                            {this.state.ticketFields.length > 0
                              ? this.state.ticketFields.filter(
                                (x) =>
                                  x.fieldName.toLowerCase() ===
                                  "Unit Name".toLowerCase()
                              ).length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "Unit Name".toLowerCase()
                                )[0].createPage
                                  ? TranslationContext !== undefined
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Unit Name".toLowerCase()
                                    )[0].displayHindiName ||
                                    TranslationContext.label.channelofpurchase
                                    : this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Unit Name".toLowerCase()
                                    )[0].displayEnglishName || "Unit Name"
                                  : "Unit Name"
                                : "Unit Name"
                              : "Unit Name"}
                          </label>
                          <select
                            className="category-select-system dropdown-label"
                            value={
                              this.state.ticketFiledNewInput.UnitName || null
                            }
                            onChange={this.handelTicketFieldInputChange.bind(
                              this,
                              "UnitName"
                            )}
                          >
                            <option
                              value={null}
                              className="select-category-placeholder"
                            >
                              Select
                            </option>
                            {this.state.unitNameData !== null &&
                              this.state.unitNameData.map((item, i) => (
                                <option
                                  key={i}
                                  value={item.unitName_Id + ""}
                                  className="select-category-placeholder"
                                >
                                  {item.unitName_Name}
                                </option>
                              ))}
                          </select>
                          {this.state.fieldError ? (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["Unit Name"]}
                            </p>
                          ) : null}
                        </div>
                      )}
                      {this.state.displayField["Purpose Of Visit"] && (
                        <div>
                          <label className="category">
                            {this.state.ticketFields.length > 0
                              ? this.state.ticketFields.filter(
                                (x) =>
                                  x.fieldName.toLowerCase() ===
                                  "Purpose Of Visit".toLowerCase()
                              ).length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "Purpose Of Visit".toLowerCase()
                                )[0].createPage
                                  ? TranslationContext !== undefined
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Purpose Of Visit".toLowerCase()
                                    )[0].displayHindiName ||
                                    TranslationContext.label.channelofpurchase
                                    : this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Purpose Of Visit".toLowerCase()
                                    )[0].displayEnglishName ||
                                    "Purpose Of Visit"
                                  : "Purpose Of Visit"
                                : "Purpose Of Visit"
                              : "Purpose Of Visit"}
                          </label>
                          <select
                            className="category-select-system dropdown-label"
                            value={
                              this.state.ticketFiledNewInput.PurposeOfVisit ||
                              null
                            }
                            onChange={this.handelTicketFieldInputChange.bind(
                              this,
                              "PurposeOfVisit"
                            )}
                          >
                            <option
                              value={null}
                              className="select-category-placeholder"
                            >
                              Select
                            </option>
                            {this.state.purposeVisitData
                              ? this.state.purposeVisitData.map((item, i) => (
                                <option
                                  key={i}
                                  value={item.purposeOfVisit_Id + ""}
                                  className="select-category-placeholder"
                                >
                                  {item.purposeOfVisit_Name}
                                </option>
                              ))
                              : null}
                          </select>
                          {this.state.fieldError ? (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["Purpose Of Visit"]}
                            </p>
                          ) : null}
                        </div>
                      )}
                      {
                        this.state.selectedTicketActionType === "202" &&
                        <>
                          <div>
                            <div className="form-group" >
                              <label className="label-4">
                                Escalation Status List
                              </label>
                              <select
                                className="category-select-system dropdown-label"
                                // value={
                                //   this.state.selectetedParameters.resolutionStatusId
                                // }
                                // value={this.state.selectedResolution}
                                onChange={(e) => this.handleEscalationStatus(e)}
                              //name="resolutionStatusId"
                              >
                                <option className="select-category-placeholder" readOnly>
                                  {"Select Escalation Status"}
                                  {/* {TranslationContext !== undefined
                                    ? TranslationContext.option
                                      .selectsubcategory
                                    : "Select Escalation Status""} */}
                                </option>
                                {this.state.EscalationStatusData !== null &&
                                  this.state.EscalationStatusData.map((item, i) => (
                                    <option
                                      key={i}
                                      value={item.id}
                                      className="select-category-placeholder"
                                    >
                                      {item.name}
                                    </option>
                                  ))}

                              </select>
                            </div>
                          </div>

                        </>
                      }
                      {
                        this.state.selectedTicketActionType === "202" &&

                        <div>
                          <div className="form-group" >
                            <label className="label-4">
                              Escalation Date
                            </label>
                            <input className="rectangle-9 select-category-placeholder" type="date" onChange={(e) => this.handleEscalationDate(e)} />

                          </div>
                        </div>

                      }

                      {this.state.displayField["Consulting Doctor"] && (
                        <div>
                          <label className="category">
                            {this.state.ticketFields.length > 0
                              ? this.state.ticketFields.filter(
                                (x) =>
                                  x.fieldName.toLowerCase() ===
                                  "Consulting Doctor".toLowerCase()
                              ).length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "Consulting Doctor".toLowerCase()
                                )[0].createPage
                                  ? TranslationContext !== undefined
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Consulting Doctor".toLowerCase()
                                    )[0].displayHindiName ||
                                    TranslationContext.label.channelofpurchase
                                    : this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Consulting Doctor".toLowerCase()
                                    )[0].displayEnglishName ||
                                    "Consulting Doctor"
                                  : "Consulting Doctor"
                                : "Consulting Doctor"
                              : "Consulting Doctor"}
                          </label>
                          <select
                            className="category-select-system dropdown-label"
                            value={
                              this.state.ticketFiledNewInput.ConsultingDoctor ||
                              null
                            }
                            onChange={this.handelTicketFieldInputChange.bind(
                              this,
                              "ConsultingDoctor"
                            )}
                          >
                            <option
                              value={null}
                              className="select-category-placeholder"
                            >
                              Select
                            </option>
                            {this.state.consultingDoctorData !== null &&
                              this.state.consultingDoctorData.map((item, i) => (
                                <option
                                  key={i}
                                  value={item.consultingDoctor_Id + ""}
                                  className="select-category-placeholder"
                                >
                                  {item.consultingDoctor_Name}
                                </option>
                              ))}
                          </select>
                          {this.state.fieldError ? (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["Consulting Doctor"]}
                            </p>
                          ) : null}
                        </div>
                      )}
                      {this.state.displayField["Department Name"] && (
                        <div>
                          <label className="category">
                            {this.state.ticketFields.length > 0
                              ? this.state.ticketFields.filter(
                                (x) =>
                                  x.fieldName.toLowerCase() ===
                                  "Department Name".toLowerCase()
                              ).length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "Department Name".toLowerCase()
                                )[0].createPage
                                  ? TranslationContext !== undefined
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Department Name".toLowerCase()
                                    )[0].displayHindiName ||
                                    TranslationContext.label.channelofpurchase
                                    : this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Department Name".toLowerCase()
                                    )[0].displayEnglishName ||
                                    "Department Name"
                                  : "Department Name"
                                : "Department Name"
                              : "Department Name"}
                          </label>
                          <select
                            className="category-select-system dropdown-label"
                            value={
                              this.state.ticketFiledNewInput.DepartmentName ||
                              null
                            }
                            onChange={this.handelTicketFieldInputChange.bind(
                              this,
                              "DepartmentName"
                            )}
                          >
                            <option
                              value={null}
                              className="select-category-placeholder"
                            >
                              Select
                            </option>
                            {this.state.departmentData
                              ? this.state.departmentData.map((item, i) => (
                                <option
                                  key={i}
                                  value={item.departmentID + ""}
                                  className="select-category-placeholder"
                                >
                                  {item.departmentName}
                                </option>
                              ))
                              : null}
                          </select>
                          {this.state.fieldError ? (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["Department Name"]}
                            </p>
                          ) : null}
                        </div>
                      )}
                      {this.state.displayField["Consulting Hospital"] && (
                        <div>
                          <label className="category">
                            {this.state.ticketFields.length > 0
                              ? this.state.ticketFields.filter(
                                (x) =>
                                  x.fieldName.toLowerCase() ===
                                  "Consulting Hospital".toLowerCase()
                              ).length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "Consulting Hospital".toLowerCase()
                                )[0].createPage
                                  ? TranslationContext !== undefined
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Consulting Hospital".toLowerCase()
                                    )[0].displayHindiName ||
                                    TranslationContext.label.channelofpurchase
                                    : this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Consulting Hospital".toLowerCase()
                                    )[0].displayEnglishName ||
                                    "Consulting Hospital"
                                  : "Consulting Hospital"
                                : "Consulting Hospital"
                              : "Consulting Hospital"}
                          </label>
                          <select
                            className="category-select-system dropdown-label"
                            value={
                              this.state.ticketFiledNewInput
                                .ConsultingHospital || null
                            }
                            onChange={this.handelTicketFieldInputChange.bind(
                              this,
                              "ConsultingHospital"
                            )}
                          >
                            <option
                              value={null}
                              className="select-category-placeholder"
                            >
                              Select
                            </option>
                            {this.state.consultingHospitalData
                              ? this.state.consultingHospitalData.map(
                                (item, i) => (
                                  <option
                                    key={i}
                                    value={item.consultingHospital_Id + ""}
                                    className="select-category-placeholder"
                                  >
                                    {item.consultingHospital_Name}
                                  </option>
                                )
                              )
                              : null}
                          </select>
                          {this.state.fieldError ? (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["Consulting Hospital"]}
                            </p>
                          ) : null}
                        </div>
                      )}
                      {this.state.displayField["Unit City"] && (
                        <div>
                          <label className="category">
                            {this.state.ticketFields.length > 0
                              ? this.state.ticketFields.filter(
                                (x) =>
                                  x.fieldName.toLowerCase() ===
                                  "Unit City".toLowerCase()
                              ).length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "Unit City".toLowerCase()
                                )[0].createPage
                                  ? TranslationContext !== undefined
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Unit City".toLowerCase()
                                    )[0].displayHindiName ||
                                    TranslationContext.label.channelofpurchase
                                    : this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Unit City".toLowerCase()
                                    )[0].displayEnglishName || "Unit City"
                                  : "Unit City"
                                : "Unit City"
                              : "Unit City"}
                          </label>
                          <select
                            className="category-select-system dropdown-label"
                            value={
                              this.state.ticketFiledNewInput.UnitCity || null
                            }
                            onChange={this.handelTicketFieldInputChange.bind(
                              this,
                              "UnitCity"
                            )}
                          >
                            <option
                              value={null}
                              className="select-category-placeholder"
                            >
                              Select
                            </option>
                            {this.state.unitCitytData
                              ? this.state.unitCitytData.map((item, i) => (
                                <option
                                  key={i}
                                  value={item.unitCity_Id}
                                  className="select-category-placeholder"
                                >
                                  {item.unitCity_Name}
                                </option>
                              ))
                              : null}
                          </select>
                          {this.state.fieldError ? (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["Unit City"]}
                            </p>
                          ) : null}
                        </div>
                      )}
                      {this.state.displayField["LOB"] && (
                        <div>
                          <label className="category">
                            {this.state.ticketFields.length > 0
                              ? this.state.ticketFields.filter(
                                (x) =>
                                  x.fieldName.toLowerCase() ===
                                  "LOB".toLowerCase()
                              ).length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "LOB".toLowerCase()
                                )[0].createPage
                                  ? TranslationContext !== undefined
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "LOB".toLowerCase()
                                    )[0].displayHindiName ||
                                    TranslationContext.label.channelofpurchase
                                    : this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "LOB".toLowerCase()
                                    )[0].displayEnglishName || "LOB"
                                  : "LOB"
                                : "LOB"
                              : "LOB"}
                          </label>
                          <select
                            className="category-select-system dropdown-label"
                            value={this.state.ticketFiledNewInput.LOB || null}
                            onChange={this.handelTicketFieldInputChange.bind(
                              this,
                              "LOB"
                            )}
                          >
                            <option
                              value={null}
                              className="select-category-placeholder"
                            >
                              Select
                            </option>
                            {this.state.lOBData !== null &&
                              this.state.lOBData.map((item, i) => (
                                <option
                                  key={i}
                                  value={item.loB_Id + ""}
                                  className="select-category-placeholder"
                                >
                                  {item.loB_Name}
                                </option>
                              ))}
                          </select>
                          {this.state.fieldError ? (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["LOB"]}
                            </p>
                          ) : null}
                        </div>
                      )}
                      {this.state.displayField["Appointment DateTime"] && (
                        // the appointment-date className present below applies css in cssfolder -> custome.css
                        <>
                          <div className=" ticket-Date Appointment-date  datepikerr">
                            <label className="category">
                              {this.state.ticketFields.length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "Appointment DateTime".toLowerCase()
                                ).length > 0
                                  ? this.state.ticketFields.filter(
                                    (x) =>
                                      x.fieldName.toLowerCase() ===
                                      "Appointment DateTime".toLowerCase()
                                  )[0].createPage
                                    ? TranslationContext !== undefined
                                      ? this.state.ticketFields.filter(
                                        (x) =>
                                          x.fieldName.toLowerCase() ===
                                          "Appointment DateTime".toLowerCase()
                                      )[0].displayHindiName ||
                                      TranslationContext.label
                                        .channelofpurchase
                                      : this.state.ticketFields.filter(
                                        (x) =>
                                          x.fieldName.toLowerCase() ===
                                          "Appointment DateTime".toLowerCase()
                                      )[0].displayEnglishName ||
                                      "Appointment DateTime"
                                    : "Appointment DateTime"
                                  : "Appointment DateTime"
                                : "Appointment DateTime"}
                            </label>
                            <DatePicker
                              className="txt-1"
                              placeholderText={"Appointment DateTime"}
                              name="appointmentDateTime"
                              minDate={new Date()}
                              showMonthDropdown
                              showYearDropdown
                              showTimeSelect
                              dateFormat="dd/MM/yyyy h:mm aa"
                              autoComplete="none"
                              selected={
                                this.state.ticketFiledNewInput.AppointmentDate
                              }
                              onChange={this.handleTicketFieldInputDateChange.bind(
                                this,
                                "AppointmentDate"
                              )}
                            />
                            {this.state.fieldError ? (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.fieldError["Appointment DateTime"]}
                              </p>
                            ) : null}
                          </div>
                        </>
                      )}
                      {this.state.displayField["Callback Date and Time"] && (
                        // the appointment-date className present below applies css in cssfolder -> custome.css
                        <>
                          {this.state.ticketFiledNewInput.CallBack === "true" ||
                            this.state.ticketFiledNewInput.CallBack === true ? (
                            <div className=" datepic">
                              <label className="category">
                                {this.state.ticketFields.length > 0
                                  ? this.state.ticketFields.filter(
                                    (x) =>
                                      x.fieldName.toLowerCase() ===
                                      "Call Back DateTime".toLowerCase()
                                  ).length > 0
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Call Back DateTime".toLowerCase()
                                    )[0].createPage
                                      ? TranslationContext !== undefined
                                        ? this.state.ticketFields.filter(
                                          (x) =>
                                            x.fieldName.toLowerCase() ===
                                            "Call Back DateTime".toLowerCase()
                                        )[0].displayHindiName ||
                                        TranslationContext.label
                                          .channelofpurchase
                                        : this.state.ticketFields.filter(
                                          (x) =>
                                            x.fieldName.toLowerCase() ===
                                            "Call Back DateTime".toLowerCase()
                                        )[0].displayEnglishName ||
                                        "Call Back DateTime"
                                      : "Call Back DateTime"
                                    : "Call Back DateTime"
                                  : "Call Back DateTime"}
                              </label>
                              <DatePicker
                                className="txt-1"
                                placeholderText={"Call Back DateTime"}
                                name="CallBackDate"
                                minDate={new Date()}
                                showMonthDropdown
                                showYearDropdown
                                showTimeSelect
                                dateFormat="dd/MM/yyyy h:mm aa"
                                selected={
                                  this.state.ticketFiledNewInput.CallBackDate
                                }
                                onChange={this.handleTicketFieldInputDateChange.bind(
                                  this,
                                  "CallBackDate"
                                )}
                              />
                            </div>
                          ) : null}
                        </>
                      )}
                      {this.state.displayField["assignTo"] && (
                        <>
                          {this.state.selectedTicketActionType === "201" ? (
                            <div className="ticket-Date">
                              <label className="category">
                                {this.state.ticketFields.length > 0
                                  ? this.state.ticketFields.filter(
                                    (x) =>
                                      x.fieldName.toLowerCase() ===
                                      "Assign to New".toLowerCase()
                                  ).length > 0
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Assign to New".toLowerCase()
                                    )[0].createPage
                                      ? TranslationContext !== undefined
                                        ? this.state.ticketFields.filter(
                                          (x) =>
                                            x.fieldName.toLowerCase() ===
                                            "Assign to New".toLowerCase()
                                        )[0].displayHindiName ||
                                        TranslationContext.label
                                          .channelofpurchase
                                        : this.state.ticketFields.filter(
                                          (x) =>
                                            x.fieldName.toLowerCase() ===
                                            "Assign to New".toLowerCase()
                                        )[0].displayEnglishName ||
                                        "Assign to New"
                                      : "Assign to New"
                                    : "Assign to New"
                                  : "Assign to New"}
                              </label>
                              <select
                                className="category-select-system dropdown-label"
                                value={
                                  this.state.ticketFiledNewInput.AssignTo ||
                                  null
                                }
                                onChange={this.handelTicketFieldInputChange.bind(
                                  this,
                                  "AssignTo"
                                )}
                              >
                                <option
                                  value={null}
                                  className="select-category-placeholder"
                                >
                                  Select
                                </option>
                                {this.state.assignToData
                                  ? this.state.assignToData.map((item, i) => (
                                    <option
                                      key={i}
                                      value={item.userID}
                                      className="select-category-placeholder"
                                    >
                                      {item.userName}
                                    </option>
                                  ))
                                  : null}
                              </select>
                              {this.state.fieldError ? (
                                <p
                                  style={{ color: "red", marginBottom: "0px" }}
                                >
                                  {this.state.fieldError["AssignToNew"]}
                                </p>
                              ) : null}
                            </div>
                          ) : null}
                        </>
                      )}
                      {this.state.displayField["DepartmentName"] &&
                        <div>
                          <label className="sub-category">
                            {this.state.ticketFields.filter(
                              (x) =>
                                x.fieldName.toLowerCase() ===
                                "DepartmentName".toLowerCase()
                            )[0].displayEnglishName}
                          </label>
                          <select
                            //value={this.state.selectedCategory}
                            onChange={(e) => this.setDepartmentNameEmail(e)}
                            className="category-select-system dropdown-label"
                          >
                            <option
                              // value=""
                              className="select-category-placeholder"
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.option.selectcategory
                                : "Select Department"}
                            </option>
                            {this.state.DepartmentTeamName !== null &&
                              this.state.DepartmentTeamName.map((item, i) => (
                                <option
                                  key={i}
                                  value={item.email + "|" + item.teamID}
                                  className="select-category-placeholder"
                                >
                                  {item.teamName}
                                </option>
                              ))}
                          </select>

                          {/* {this.state.selectedEcr === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["ECR"]}
                            </p>
                          )} */}

                        </div>


                      }
                      {tenantFlags.isResolutionStatus &&
                        this.state.selectedTicketActionType === "200" &&
                        this.state.displayField["ResolutionStatusId"] && (
                          <div>
                            <label className="sub-category">
                              {
                                this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "ResolutionStatusId".toLowerCase()
                                )[0].displayEnglishName ||
                                "Resolution Status"
                              }
                            </label>
                            <select
                              value={this.state.selectedResolution}
                              onChange={this.setResolution}
                              className="category-select-system dropdown-label"
                            >
                              <option className="select-sub-category-placeholder">
                                {TranslationContext !== undefined
                                  ? TranslationContext.option.selectissuetype
                                  : "Select Resolution Status"}
                              </option>
                              {resolutionData !== null &&
                                resolutionData.map((item, i) => (
                                  <option
                                    key={i}
                                    value={item.id}
                                    className="select-category-placeholder"
                                  >
                                    {item.name}
                                  </option>
                                ))}
                            </select>
                            {this.state.fieldError ? (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.fieldError["ResolutionStatusId"]}
                              </p>
                            ) : null}
                          </div>
                        )}
                      {this.state.programCode === "organicindia" && (
                        <>
                          <>
                            {this.state.selectedChannelOfPurchaseName ==
                              "d2c" && (
                                <>
                                  <>
                                    {this.state.displayField["Store Code"] && (
                                      <div>
                                        <label className="category">
                                          {this.state.ticketFields.length > 0
                                            ? this.state.ticketFields.filter(
                                              (x) =>
                                                x.fieldName.toLowerCase() ===
                                                "Store Code".toLowerCase()
                                            ).length > 0
                                              ? this.state.ticketFields.filter(
                                                (x) =>
                                                  x.fieldName.toLowerCase() ===
                                                  "Store Code".toLowerCase()
                                              )[0].createPage
                                                ? TranslationContext !== undefined
                                                  ? this.state.ticketFields.filter(
                                                    (x) =>
                                                      x.fieldName.toLowerCase() ===
                                                      "Store Code".toLowerCase()
                                                  )[0].displayHindiName ||
                                                  TranslationContext.label
                                                    .channelofpurchase
                                                  : this.state.ticketFields.filter(
                                                    (x) =>
                                                      x.fieldName.toLowerCase() ===
                                                      "Store Code".toLowerCase()
                                                  )[0].displayEnglishName ||
                                                  "Store Code"
                                                : "Store Code"
                                              : "Store Code"
                                            : "Store Code"}
                                        </label>
                                        <select
                                          className="category-select-system dropdown-label"
                                          value={this.state.selectedStoreCode}
                                          onChange={this.handleStoreChange}
                                          name="selectedStoreCode"
                                        >
                                          <option
                                            value=""
                                            className="select-category-placeholder"
                                          >
                                            Select
                                          </option>
                                          {this.state.StoreList
                                            ? this.state.StoreList.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.storeCode}
                                                  className="select-category-placeholder"
                                                >
                                                  {item.storeCode}
                                                </option>
                                              )
                                            )
                                            : null}
                                        </select>
                                        {this.state.fieldError ? (
                                          <p
                                            style={{
                                              color: "red",
                                              marginBottom: "0px",
                                            }}
                                          >
                                            {this.state.fieldError["Store Code"]}
                                          </p>
                                        ) : null}
                                      </div>
                                    )}
                                    {this.state.displayField["Store Name"] && (
                                      <div>
                                        <label className="category">
                                          {this.state.ticketFields.length > 0
                                            ? this.state.ticketFields.filter(
                                              (x) =>
                                                x.fieldName.toLowerCase() ===
                                                "Store Name".toLowerCase()
                                            ).length > 0
                                              ? this.state.ticketFields.filter(
                                                (x) =>
                                                  x.fieldName.toLowerCase() ===
                                                  "Store Name".toLowerCase()
                                              )[0].createPage
                                                ? TranslationContext !== undefined
                                                  ? this.state.ticketFields.filter(
                                                    (x) =>
                                                      x.fieldName.toLowerCase() ===
                                                      "Store Name".toLowerCase()
                                                  )[0].displayHindiName ||
                                                  TranslationContext.label
                                                    .channelofpurchase
                                                  : this.state.ticketFields.filter(
                                                    (x) =>
                                                      x.fieldName.toLowerCase() ===
                                                      "Store Name".toLowerCase()
                                                  )[0].displayEnglishName ||
                                                  "Store Name"
                                                : "LOB"
                                              : "LOB"
                                            : "LOB"}
                                        </label>
                                        <select
                                          className="category-select-system dropdown-label"
                                          value={this.state.selectedStoreName}
                                          onChange={this.handleStoreChange}
                                          name="selectedStoreName"
                                        >
                                          <option
                                            value=""
                                            className="select-category-placeholder"
                                          >
                                            Select
                                          </option>
                                          {this.state.StoreList !== null &&
                                            this.state.StoreList.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.storeName}
                                                  className="select-category-placeholder"
                                                >
                                                  {item.storeName}
                                                </option>
                                              )
                                            )}
                                        </select>
                                        {this.state.fieldError ? (
                                          <p
                                            style={{
                                              color: "red",
                                              marginBottom: "0px",
                                            }}
                                          >
                                            {this.state.fieldError["Store Name"]}
                                          </p>
                                        ) : null}
                                      </div>
                                    )}
                                  </>
                                  <>
                                    {this.state.displayField["Store Address"] && (
                                      <div className="custom-ticket-title">
                                        <label className="category">
                                          {this.state.ticketFields.length > 0
                                            ? this.state.ticketFields.filter(
                                              (x) =>
                                                x.fieldName.toLowerCase() ===
                                                "Store Address".toLowerCase()
                                            ).length > 0
                                              ? this.state.ticketFields.filter(
                                                (x) =>
                                                  x.fieldName.toLowerCase() ===
                                                  "Store Address".toLowerCase()
                                              )[0].createPage
                                                ? TranslationContext !== undefined
                                                  ? this.state.ticketFields.filter(
                                                    (x) =>
                                                      x.fieldName.toLowerCase() ===
                                                      "Store Address".toLowerCase()
                                                  )[0].displayHindiName ||
                                                  TranslationContext.label
                                                    .channelofpurchase
                                                  : this.state.ticketFields.filter(
                                                    (x) =>
                                                      x.fieldName.toLowerCase() ===
                                                      "Store Address".toLowerCase()
                                                  )[0].displayEnglishName ||
                                                  "Store Address"
                                                : "Store Address"
                                              : "Store Address"
                                            : "Store Address"}
                                        </label>
                                        <textarea
                                          disabled
                                          type="text"
                                          value={this.state.selectedStoreAddress}
                                        />
                                      </div>
                                    )}
                                    {this.state.displayField["Store City"] && (
                                      <div className="custom-ticket-title">
                                        <label className="category">
                                          {this.state.ticketFields.length > 0
                                            ? this.state.ticketFields.filter(
                                              (x) =>
                                                x.fieldName.toLowerCase() ===
                                                "Store City".toLowerCase()
                                            ).length > 0
                                              ? this.state.ticketFields.filter(
                                                (x) =>
                                                  x.fieldName.toLowerCase() ===
                                                  "Store City".toLowerCase()
                                              )[0].createPage
                                                ? TranslationContext !== undefined
                                                  ? this.state.ticketFields.filter(
                                                    (x) =>
                                                      x.fieldName.toLowerCase() ===
                                                      "Store City".toLowerCase()
                                                  )[0].displayHindiName ||
                                                  TranslationContext.label
                                                    .channelofpurchase
                                                  : this.state.ticketFields.filter(
                                                    (x) =>
                                                      x.fieldName.toLowerCase() ===
                                                      "Store City".toLowerCase()
                                                  )[0].displayEnglishName ||
                                                  "Store City"
                                                : "Store City"
                                              : "Store City"
                                            : "Store City"}
                                        </label>
                                        <input
                                          disabled
                                          type="text"
                                          value={this.state.selectedStoreCity}
                                        />
                                      </div>
                                    )}
                                  </>
                                  <>
                                    {this.state.displayField[
                                      "Store Phone No"
                                    ] && (
                                        <div className="custom-ticket-title">
                                          <label className="category">
                                            {this.state.ticketFields.length > 0
                                              ? this.state.ticketFields.filter(
                                                (x) =>
                                                  x.fieldName.toLowerCase() ===
                                                  "Store Phone No".toLowerCase()
                                              ).length > 0
                                                ? this.state.ticketFields.filter(
                                                  (x) =>
                                                    x.fieldName.toLowerCase() ===
                                                    "Store Phone No".toLowerCase()
                                                )[0].createPage
                                                  ? TranslationContext !== undefined
                                                    ? this.state.ticketFields.filter(
                                                      (x) =>
                                                        x.fieldName.toLowerCase() ===
                                                        "Store Phone No".toLowerCase()
                                                    )[0].displayHindiName ||
                                                    TranslationContext.label
                                                      .channelofpurchase
                                                    : this.state.ticketFields.filter(
                                                      (x) =>
                                                        x.fieldName.toLowerCase() ===
                                                        "Store Phone No".toLowerCase()
                                                    )[0].displayEnglishName ||
                                                    "Store Phone No"
                                                  : "Store Phone No"
                                                : "Store Phone No"
                                              : "Store Phone No"}
                                          </label>
                                          <input
                                            disabled={this.state.setdisablefield}
                                            onChange={this.handleStoreChange}
                                            name="selectedStoreContactInfo"
                                            type="text"
                                            value={
                                              this.state.selectedStoreContactInfo
                                            }
                                          />
                                          {/* {this.state.fieldError ? (
                                        <p style={{ color: "red", marginBottom: "0px" }}>
                                          {this.state.fieldError["Store Phone No"]}
                                        </p>
                                      ) : null} */}
                                        </div>
                                      )}
                                    {this.state.displayField[
                                      "Store Email ID"
                                    ] && (
                                        <div className="custom-ticket-title">
                                          <label className="category">
                                            {this.state.ticketFields.length > 0
                                              ? this.state.ticketFields.filter(
                                                (x) =>
                                                  x.fieldName.toLowerCase() ===
                                                  "Store Email ID".toLowerCase()
                                              ).length > 0
                                                ? this.state.ticketFields.filter(
                                                  (x) =>
                                                    x.fieldName.toLowerCase() ===
                                                    "Store Email ID".toLowerCase()
                                                )[0].createPage
                                                  ? TranslationContext !== undefined
                                                    ? this.state.ticketFields.filter(
                                                      (x) =>
                                                        x.fieldName.toLowerCase() ===
                                                        "Store Email ID".toLowerCase()
                                                    )[0].displayHindiName ||
                                                    TranslationContext.label
                                                      .channelofpurchase
                                                    : this.state.ticketFields.filter(
                                                      (x) =>
                                                        x.fieldName.toLowerCase() ===
                                                        "Store Email ID".toLowerCase()
                                                    )[0].displayEnglishName ||
                                                    "Store Email ID"
                                                  : "Store Email ID"
                                                : "Store Email ID"
                                              : "Store Email ID"}
                                          </label>
                                          <input
                                            disabled
                                            type="text"
                                            value={this.state.selectedStoreEmail}
                                          />

                                          {this.state
                                            .selectedChannelOfPurchaseName ==
                                            "retail" ? (
                                            this.state.fieldError ? (
                                              <p
                                                style={{
                                                  color: "red",
                                                  marginBottom: "0px",
                                                }}
                                              >
                                                {
                                                  this.state.fieldError[
                                                  "Store Email ID"
                                                  ]
                                                }
                                              </p>
                                            ) : null
                                          ) : null}
                                        </div>
                                      )}
                                  </>
                                </>
                              )}
                          </>
                          <>
                            {this.state.selectedChannelOfPurchaseName ==
                              "retail" && (
                                <>
                                  <>
                                    {this.state.displayField["Store Name"] && (
                                      <div className="custom-ticket-title">
                                        <label className="category">
                                          {this.state.ticketFields.length > 0
                                            ? this.state.ticketFields.filter(
                                              (x) =>
                                                x.fieldName.toLowerCase() ===
                                                "Store Name".toLowerCase()
                                            ).length > 0
                                              ? this.state.ticketFields.filter(
                                                (x) =>
                                                  x.fieldName.toLowerCase() ===
                                                  "Store Name".toLowerCase()
                                              )[0].createPage
                                                ? TranslationContext !== undefined
                                                  ? this.state.ticketFields.filter(
                                                    (x) =>
                                                      x.fieldName.toLowerCase() ===
                                                      "Store Name".toLowerCase()
                                                  )[0].displayHindiName ||
                                                  TranslationContext.label
                                                    .channelofpurchase
                                                  : this.state.ticketFields.filter(
                                                    (x) =>
                                                      x.fieldName.toLowerCase() ===
                                                      "Store Name".toLowerCase()
                                                  )[0].displayEnglishName ||
                                                  "Store Name"
                                                : "Store Name"
                                              : "Store Name"
                                            : "Store Name"}
                                        </label>
                                        <input
                                          type="text"
                                          value={this.state.selectedStoreName}
                                          name="selectedStoreName"
                                          onChange={this.handleStoreChange}
                                          placeholder="Enter Store Name"
                                          autoComplete="off"
                                        />
                                        {this.state.fieldError ? (
                                          <p
                                            style={{
                                              color: "red",
                                              marginBottom: "0px",
                                            }}
                                          >
                                            {this.state.fieldError["Store Name"]}
                                          </p>
                                        ) : null}
                                      </div>
                                    )}
                                    {this.state.displayField["Store Address"] && (
                                      <div className="custom-ticket-title">
                                        <label className="category">
                                          {this.state.ticketFields.length > 0
                                            ? this.state.ticketFields.filter(
                                              (x) =>
                                                x.fieldName.toLowerCase() ===
                                                "Store Address".toLowerCase()
                                            ).length > 0
                                              ? this.state.ticketFields.filter(
                                                (x) =>
                                                  x.fieldName.toLowerCase() ===
                                                  "Store Address".toLowerCase()
                                              )[0].createPage
                                                ? TranslationContext !== undefined
                                                  ? this.state.ticketFields.filter(
                                                    (x) =>
                                                      x.fieldName.toLowerCase() ===
                                                      "Store Address".toLowerCase()
                                                  )[0].displayHindiName ||
                                                  TranslationContext.label
                                                    .channelofpurchase
                                                  : this.state.ticketFields.filter(
                                                    (x) =>
                                                      x.fieldName.toLowerCase() ===
                                                      "Store Address".toLowerCase()
                                                  )[0].displayEnglishName ||
                                                  "Store Address"
                                                : "Store Address"
                                              : "Store Address"
                                            : "Store Address"}
                                        </label>
                                        <textarea
                                          type="text"
                                          value={this.state.selectedStoreAddress}
                                          name="selectedStoreAddress"
                                          onChange={this.handleStoreChange}
                                          placeholder="Enter Store Address"
                                          autoComplete="off"
                                        />
                                        {this.state.fieldError ? (
                                          <p
                                            style={{
                                              color: "red",
                                              marginBottom: "0px",
                                            }}
                                          >
                                            {
                                              this.state.fieldError[
                                              "Store Address"
                                              ]
                                            }
                                          </p>
                                        ) : null}
                                      </div>
                                    )}
                                  </>
                                  <>
                                    {this.state.displayField["Store City"] && (
                                      <div className="custom-ticket-title">
                                        <label className="category">
                                          {this.state.ticketFields.length > 0
                                            ? this.state.ticketFields.filter(
                                              (x) =>
                                                x.fieldName.toLowerCase() ===
                                                "Store City".toLowerCase()
                                            ).length > 0
                                              ? this.state.ticketFields.filter(
                                                (x) =>
                                                  x.fieldName.toLowerCase() ===
                                                  "Store City".toLowerCase()
                                              )[0].createPage
                                                ? TranslationContext !== undefined
                                                  ? this.state.ticketFields.filter(
                                                    (x) =>
                                                      x.fieldName.toLowerCase() ===
                                                      "Store City".toLowerCase()
                                                  )[0].displayHindiName ||
                                                  TranslationContext.label
                                                    .channelofpurchase
                                                  : this.state.ticketFields.filter(
                                                    (x) =>
                                                      x.fieldName.toLowerCase() ===
                                                      "Store City".toLowerCase()
                                                  )[0].displayEnglishName ||
                                                  "Store City"
                                                : "Store City"
                                              : "Store City"
                                            : "Store City"}
                                        </label>
                                        <input
                                          type="text"
                                          value={this.state.selectedStoreCity}
                                          name="selectedStoreCity"
                                          onChange={this.handleStoreChange}
                                          placeholder="Enter Store City"
                                          autoComplete="off"
                                        />
                                        {this.state.fieldError ? (
                                          <p
                                            style={{
                                              color: "red",
                                              marginBottom: "0px",
                                            }}
                                          >
                                            {this.state.fieldError["Store City"]}
                                          </p>
                                        ) : null}
                                      </div>
                                    )}
                                    {this.state.displayField[
                                      "Store Phone No"
                                    ] && (
                                        <div className="custom-ticket-title">
                                          <label className="category">
                                            {this.state.ticketFields.length > 0
                                              ? this.state.ticketFields.filter(
                                                (x) =>
                                                  x.fieldName.toLowerCase() ===
                                                  "Store Phone No".toLowerCase()
                                              ).length > 0
                                                ? this.state.ticketFields.filter(
                                                  (x) =>
                                                    x.fieldName.toLowerCase() ===
                                                    "Store Phone No".toLowerCase()
                                                )[0].createPage
                                                  ? TranslationContext !== undefined
                                                    ? this.state.ticketFields.filter(
                                                      (x) =>
                                                        x.fieldName.toLowerCase() ===
                                                        "Store Phone No".toLowerCase()
                                                    )[0].displayHindiName ||
                                                    TranslationContext.label
                                                      .channelofpurchase
                                                    : this.state.ticketFields.filter(
                                                      (x) =>
                                                        x.fieldName.toLowerCase() ===
                                                        "Store Phone No".toLowerCase()
                                                    )[0].displayEnglishName ||
                                                    "Store Phone No"
                                                  : "Store Phone No"
                                                : "Store Phone No"
                                              : "Store Phone No"}
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              this.state.selectedStoreContactInfo
                                            }
                                            name="selectedStoreContactInfo"
                                            onChange={this.handleStoreChange}
                                            placeholder="Enter Store Phone No"
                                            autoComplete="off"
                                          />
                                          {this.state.fieldError ? (
                                            <p
                                              style={{
                                                color: "red",
                                                marginBottom: "0px",
                                              }}
                                            >
                                              {
                                                this.state.fieldError[
                                                "Store Phone No"
                                                ]
                                              }
                                            </p>
                                          ) : null}
                                        </div>
                                      )}
                                  </>
                                  <>
                                    {this.state.displayField[
                                      "Store Email ID"
                                    ] && (
                                        <div className="custom-ticket-title">
                                          <label className="category">
                                            {this.state.ticketFields.length > 0
                                              ? this.state.ticketFields.filter(
                                                (x) =>
                                                  x.fieldName.toLowerCase() ===
                                                  "Store Email ID".toLowerCase()
                                              ).length > 0
                                                ? this.state.ticketFields.filter(
                                                  (x) =>
                                                    x.fieldName.toLowerCase() ===
                                                    "Store Email ID".toLowerCase()
                                                )[0].createPage
                                                  ? TranslationContext !== undefined
                                                    ? this.state.ticketFields.filter(
                                                      (x) =>
                                                        x.fieldName.toLowerCase() ===
                                                        "Store Email ID".toLowerCase()
                                                    )[0].displayHindiName ||
                                                    TranslationContext.label
                                                      .channelofpurchase
                                                    : this.state.ticketFields.filter(
                                                      (x) =>
                                                        x.fieldName.toLowerCase() ===
                                                        "Store Email ID".toLowerCase()
                                                    )[0].displayEnglishName ||
                                                    "Store Email ID"
                                                  : "Store Email ID"
                                                : "Store Email ID"
                                              : "Store Email ID"}
                                          </label>
                                          <input
                                            type="text"
                                            value={this.state.selectedStoreEmail}
                                            name="selectedStoreEmail"
                                            onChange={this.handleStoreChange}
                                            placeholder="Enter Store Email"
                                            autoComplete="off"
                                          />
                                          {this.state.fieldError ? (
                                            <p
                                              style={{
                                                color: "red",
                                                marginBottom: "0px",
                                              }}
                                            >
                                              {
                                                this.state.fieldError[
                                                "Store Email ID"
                                                ]
                                              }
                                            </p>
                                          ) : null}
                                        </div>
                                      )}
                                  </>
                                </>
                              )}
                          </>
                          <>
                            {this.state.selectedChannelOfPurchaseName ==
                              "export" && (
                                <>
                                  <>
                                    {this.state.displayField["Region"] && (
                                      <div className="custom-ticket-title">
                                        <label className="category">
                                          {this.state.ticketFields.length > 0
                                            ? this.state.ticketFields.filter(
                                              (x) =>
                                                x.fieldName.toLowerCase() ===
                                                "Region".toLowerCase()
                                            ).length > 0
                                              ? this.state.ticketFields.filter(
                                                (x) =>
                                                  x.fieldName.toLowerCase() ===
                                                  "Region".toLowerCase()
                                              )[0].createPage
                                                ? TranslationContext !== undefined
                                                  ? this.state.ticketFields.filter(
                                                    (x) =>
                                                      x.fieldName.toLowerCase() ===
                                                      "Region".toLowerCase()
                                                  )[0].displayHindiName ||
                                                  TranslationContext.label
                                                    .channelofpurchase
                                                  : this.state.ticketFields.filter(
                                                    (x) =>
                                                      x.fieldName.toLowerCase() ===
                                                      "Region".toLowerCase()
                                                  )[0].displayEnglishName ||
                                                  "Region"
                                                : "Region"
                                              : "Region"
                                            : "Region"}
                                        </label>
                                        <input
                                          type="text"
                                          value={this.state.selectedStoreRegion}
                                          name="selectedStoreRegion"
                                          onChange={this.handleStoreChange}
                                          placeholder="Enter Region"
                                          autoComplete="off"
                                        />
                                        {this.state.fieldError ? (
                                          <p
                                            style={{
                                              color: "red",
                                              marginBottom: "0px",
                                            }}
                                          >
                                            {this.state.fieldError["Region"]}
                                          </p>
                                        ) : null}
                                      </div>
                                    )}
                                    {this.state.displayField["Country"] && (
                                      <div className="custom-ticket-title">
                                        <label className="category">
                                          {this.state.ticketFields.length > 0
                                            ? this.state.ticketFields.filter(
                                              (x) =>
                                                x.fieldName.toLowerCase() ===
                                                "Country".toLowerCase()
                                            ).length > 0
                                              ? this.state.ticketFields.filter(
                                                (x) =>
                                                  x.fieldName.toLowerCase() ===
                                                  "Country".toLowerCase()
                                              )[0].createPage
                                                ? TranslationContext !== undefined
                                                  ? this.state.ticketFields.filter(
                                                    (x) =>
                                                      x.fieldName.toLowerCase() ===
                                                      "Country".toLowerCase()
                                                  )[0].displayHindiName ||
                                                  TranslationContext.label
                                                    .channelofpurchase
                                                  : this.state.ticketFields.filter(
                                                    (x) =>
                                                      x.fieldName.toLowerCase() ===
                                                      "Country".toLowerCase()
                                                  )[0].displayEnglishName ||
                                                  "Country"
                                                : "Country"
                                              : "Country"
                                            : "Country"}
                                        </label>
                                        <input
                                          type="text"
                                          value={this.state.selectedStoreCountry}
                                          name="selectedStoreCountry"
                                          onChange={this.handleStoreChange}
                                          placeholder="Enter Country"
                                          autoComplete="off"
                                        />
                                        {this.state.fieldError ? (
                                          <p
                                            style={{
                                              color: "red",
                                              marginBottom: "0px",
                                            }}
                                          >
                                            {this.state.fieldError["Country"]}
                                          </p>
                                        ) : null}
                                      </div>
                                    )}
                                  </>
                                </>
                              )}
                          </>
                          <>
                            {this.state.selectedChannelOfPurchaseName ==
                              "mktplace" && (
                                <>
                                  <>
                                    {this.state.displayField["Mkt-Place"] && (
                                      <div className="custom-ticket-title">
                                        <label className="category">
                                          {this.state.ticketFields.length > 0
                                            ? this.state.ticketFields.filter(
                                              (x) =>
                                                x.fieldName.toLowerCase() ===
                                                "Mkt-Place".toLowerCase()
                                            ).length > 0
                                              ? this.state.ticketFields.filter(
                                                (x) =>
                                                  x.fieldName.toLowerCase() ===
                                                  "Mkt-Place".toLowerCase()
                                              )[0].createPage
                                                ? TranslationContext !== undefined
                                                  ? this.state.ticketFields.filter(
                                                    (x) =>
                                                      x.fieldName.toLowerCase() ===
                                                      "Mkt-Place".toLowerCase()
                                                  )[0].displayHindiName ||
                                                  TranslationContext.label
                                                    .channelofpurchase
                                                  : this.state.ticketFields.filter(
                                                    (x) =>
                                                      x.fieldName.toLowerCase() ===
                                                      "Mkt-Place".toLowerCase()
                                                  )[0].displayEnglishName ||
                                                  "Mkt-Place"
                                                : "Mkt-Place"
                                              : "Mkt-Place"
                                            : "Mkt-Place"}
                                        </label>
                                        <select
                                          className="category-select-system dropdown-label"
                                          value={this.state.selectedMktPlace}
                                          onChange={this.handleStoreChange}
                                          name="selectedMktPlace"
                                        >
                                          <option
                                            value=""
                                            className="select-category-placeholder"
                                          >
                                            Select
                                          </option>
                                          {this.state.MktList
                                            ? this.state.MktList.map(
                                              (item, i) => (
                                                <option
                                                  key={i}
                                                  value={item.mktPlace}
                                                  className="select-category-placeholder"
                                                >
                                                  {item.mktPlace}
                                                </option>
                                              )
                                            )
                                            : null}
                                        </select>
                                        {this.state.fieldError ? (
                                          <p
                                            style={{
                                              color: "red",
                                              marginBottom: "0px",
                                            }}
                                          >
                                            {this.state.fieldError["Mkt-Place"]}
                                          </p>
                                        ) : null}
                                      </div>
                                    )}
                                  </>
                                </>
                              )}
                          </>
                        </>
                      )}


                    </div>

                    <div className="row my-3 mx-1">
                      {this.state.file.map((item, i) =>
                        i < 5 ? (
                          <div style={{ position: "relative" }} key={i}>
                            <div>
                              <img
                                src={CircleCancel}
                                alt="thumb"
                                className="circleCancle"
                                onClick={() => {
                                  this.handleRemoveImage(i);
                                }}
                              />
                            </div>

                            <div>
                              <a href={item.value} target="_blank">
                                <img
                                  src={
                                    item.Type === "docx"
                                      ? require("./../assets/Images/word.png")
                                      : item.Type === "xlsx"
                                        ? require("./../assets/Images/excel.png")
                                        : item.Type === "pdf"
                                          ? require("./../assets/Images/pdf.png")
                                          : item.Type === "txt"
                                            ? require("./../assets/Images/TxtIcon.png")
                                            : require("./../assets/Images/thumbticket.png")
                                  }
                                  title={item.name}
                                  alt="thumb"
                                  className="thumbtick"
                                />
                              </a>
                            </div>
                          </div>
                        ) : (
                          ""
                        )
                      )}

                      {this.state.file.length > 4 ? (
                        <img
                          src={PlusImg}
                          alt="thumb"
                          className="thumbtick-plus"
                          onClick={this.handleThumbModalOpen.bind(this)}
                        />
                      ) : (
                        <img
                          style={{ display: "none" }}
                          src={PlusImg}
                          alt="thumb"
                          className="thumbtick-plus"
                          onClick={this.handleThumbModalOpen.bind(this)}
                        />
                      )}
                    </div>
                    <Modal
                      open={this.state.Plus}
                      onClose={this.handleThumbModalClose.bind(this)}
                      modalId="thumb-modal-popup"
                      overlayId="logout-ovrlykb"
                    >
                      <div>
                        <div className="close">
                          <img
                            src={CancelImg}
                            alt="cross-icon"
                            onClick={this.handleThumbModalClose.bind(this)}
                          />
                        </div>
                        <div className="row my-3 mx-1">
                          {this.state.file.map((item, i) => (
                            <div style={{ position: "relative" }} key={i}>
                              <div>
                                <img
                                  src={CircleCancel}
                                  alt="thumb"
                                  className="circleCancle"
                                  onClick={() => {
                                    this.handleRemoveImage(i);
                                  }}
                                />
                              </div>

                              <div>
                                <img
                                  src={
                                    item.Type === "docx"
                                      ? require("./../assets/Images/word.png")
                                      : item.Type === "xlsx"
                                        ? require("./../assets/Images/excel.png")
                                        : item.Type === "pdf"
                                          ? require("./../assets/Images/pdf.png")
                                          : item.Type === "txt"
                                            ? require("./../assets/Images/TxtIcon.png")
                                            : require("./../assets/Images/thumbticket.png")
                                  }
                                  title={item.name}
                                  alt="thumb"
                                  className="thumbtick"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Modal>

                    <Modal
                      open={this.state.CkOpen}
                      onClose={this.handleExpandedCkClose.bind(this)}
                      modalId="thumb-modal-popup"
                      overlayId="logout-ovrlykb"
                      classNames={{
                        modal: "ck-exp-width",
                      }}
                    >
                      <div className="ck-det-cntr ck-det-cntr-custom">
                        <CKEditor
                          data={this.state.editorTemplateDetails}
                          onChange={this.onAddCKEditorChange}
                          onBlur={this.onCkBlur}
                          config={{
                            toolbar: [
                              {
                                name: "basicstyles",
                                items: ["Bold", "Italic", "Strike"],
                              },
                              {
                                name: "styles",
                                items: ["Styles", "Format"],
                              },
                              {
                                name: "paragraph",
                                items: ["NumberedList", "BulletedList"],
                              },
                              {
                                name: "links",
                                items: ["Link", "Unlink"],
                              },
                              {
                                name: "insert",
                                items: ["Image", "Table"],
                              },
                              {
                                name: "editing",
                                items: ["Scayt"],
                              },
                            ],
                          }}
                        />
                        <img
                          src={MinusImg}
                          alt="Arrow"
                          style={{ padding: "2px 0" }}
                          onClick={this.handleExpandedCkClose.bind(this)}
                          className="ck-expand"
                        />
                        <div
                          className="row colladrowa"
                          style={{ bottom: "15px" }}
                        >
                          <div className="col-md-12 colladrow">
                            <ul className="ticsys">
                              <li className="diwamargin">
                                <label>
                                  {TranslationContext !== undefined
                                    ? TranslationContext.label.to
                                    : "To"}
                                  : {this.state.customerData.customerEmailId}
                                </label>
                              </li>
                              <li>
                                <div className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    id="fil-open-1"
                                    name="filter-type"
                                    style={{ display: "none" }}
                                    checked={this.state.InformStore}
                                    onChange={() =>
                                      this.showInformStoreFuncation()
                                    }
                                    disabled={
                                      this.state.selectedStoreIDs.length === 0
                                    }
                                  />
                                  <label
                                    htmlFor="fil-open-1"
                                    style={{ paddingLeft: "25px" }}
                                  >
                                    <span>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.label.informstore
                                        : "Inform Store"}
                                    </span>
                                  </label>
                                </div>
                              </li>
                              <li>
                                <span>
                                  <input
                                    id="file-upload"
                                    className="file-upload1 d-none"
                                    type="file"
                                    name="file"
                                    onChange={this.handleFileUpload.bind(this)}
                                    multiple
                                  />
                                  <label
                                    htmlFor="file-upload"
                                    onDrop={this.fileDrop}
                                    onDragOver={this.fileDragOver}
                                    onDragEnter={this.fileDragEnter}
                                  >
                                    <img
                                      src={FileUpload}
                                      alt="file-upload"
                                      className="fileup"
                                    />
                                  </label>
                                </span>
                                <label style={{ color: "#2561a8" }}>
                                  {this.state.fileText}{" "}
                                  {TranslationContext !== undefined
                                    ? TranslationContext.ticketingDashboard
                                      .files
                                    : "files"}
                                </label>
                              </li>
                              <li>
                                <label className="">
                                  <div className="input-group">
                                    <span className="input-group-addon inputcc">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.label.cc
                                        : "CC"}
                                      :
                                    </span>
                                    <input
                                      type="text"
                                      className="CCdi1"
                                      name="userCC"
                                      value={this.state.mailFiled.userCC}
                                      autoComplete="off"
                                      onChange={this.handleMailOnChange.bind(
                                        this,
                                        "userCC"
                                      )}
                                    />

                                    <span className="input-group-addon inputcc-one">
                                      {this.state.userCcCount < 1
                                        ? "+" + this.state.userCcCount
                                        : "+" + this.state.userCcCount}
                                    </span>
                                  </div>
                                </label>

                                <label className="">
                                  <div className="input-group">
                                    <span className="input-group-addon inputcc">
                                      BCC:
                                    </span>
                                    <input
                                      type="text"
                                      className="CCdi1"
                                      name="userBCC"
                                      value={this.state.mailFiled.userBCC}
                                      autoComplete="off"
                                      onChange={this.handleMailOnChange.bind(
                                        this,
                                        "userBCC"
                                      )}
                                    />
                                    <span className="input-group-addon inputcc-one">
                                      {this.state.userBccCount < 1
                                        ? "+" + this.state.userBccCount
                                        : "+" + this.state.userBccCount}
                                    </span>
                                  </div>
                                </label>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div
                          className="row ck-exp-top"
                          style={{ position: "absolute" }}
                        >
                          <div
                            className="dropdown collapbtn1"
                            style={{ display: "inherit" }}
                          >
                            <button
                              className={
                                this.state.CkEditorTemplateData.length > 0
                                  ? "dropdown-toggle my-tic-email1"
                                  : "dropdown-toggle my-tic-email1 disabled-link"
                              }
                              type="button"
                              data-toggle="dropdown"
                            >
                              <FontAwesomeIcon icon={faCalculator} />
                              {this.state.tempName === ""
                                ? TranslationContext !== undefined
                                  ? TranslationContext.p.template
                                  : "Template"
                                : this.state.tempName}
                            </button>
                            <ul className="dropdown-menu">
                              {this.state.CkEditorTemplateData !== null &&
                                this.state.CkEditorTemplateData.map(
                                  (item, i) => (
                                    <li
                                      style={{ display: "block" }}
                                      key={i}
                                      value={item.templateID}
                                    >
                                      <a
                                        onClick={this.handleCkEditorTemplateData.bind(
                                          this,
                                          item.templateID,
                                          item.templateName
                                        )}
                                        href="#!"
                                      >
                                        {item.templateName}
                                      </a>
                                    </li>
                                  )
                                )}
                            </ul>
                          </div>

                          <a
                            href="#!"
                            className="kblink1"
                            onClick={this.HandleKbLinkModalOpen.bind(this)}
                          >
                            <img
                              src={KnowledgeLogo}
                              alt="KnowledgeLogo"
                              className="knoim"
                            />
                            <label>
                              {TranslationContext !== undefined
                                ? TranslationContext.option.kblink
                                : "KB Link"}
                            </label>
                          </a>

                          <div className="tic-det-ck-user tic-createTic myticlist-expand-sect">
                            <select
                              className="add-select-category"
                              value="0"
                              onChange={this.setAssignedToValue.bind(this)}
                            >
                              <option value="0">
                                {TranslationContext !== undefined
                                  ? TranslationContext.link.users
                                  : "Users"}
                              </option>
                              {this.state.AssignToData !== null &&
                                this.state.AssignToData.map((item, i) => (
                                  <option key={i} value={item.user_ID}>
                                    {item.agentName}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div className="tic-det-ck-user myticlist-expand-sect placeholder-dropdown-tktSys">
                            <select
                              className="add-select-category"
                              value="0"
                              onChange={this.setPlaceholderValue.bind(this)}
                            >
                              <option value="0">
                                {TranslationContext !== undefined
                                  ? TranslationContext.link.placeholders
                                  : "Placeholders"}
                              </option>
                              {this.state.placeholderData !== null &&
                                this.state.placeholderData.map((item, i) => (
                                  <option key={i} value={item.mailParameterID}>
                                    {item.description}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </Modal>
                    {!(this.state.storeticketsrch) && <div className="row m-b-10 m-t-20">
                      <div className="col-md-12">
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            id="email-files"
                            name="filter-type"
                            style={{ display: "none" }}
                            onChange={this.handleChangeEmailFileSendCheck.bind(
                              this
                            )}
                            checked={this.state.emailFileCheck}
                          />
                          <label
                            htmlFor="email-files"
                            style={{ paddingLeft: "25px" }}
                          >
                            <span className="add-note">Mail Compose Box</span>
                          </label>
                        </div>
                      </div>

                    </div>}

                    {this.state.emailFileCheck ? (
                      <>
                        <div className="row" style={{ position: "absolute" }}>
                          <div
                            className="dropdown collapbtn1"
                            style={{ display: "inherit" }}
                          >
                            <button
                              className={
                                this.state.CkEditorTemplateData.length > 0
                                  ? "dropdown-toggle my-tic-email1"
                                  : "dropdown-toggle my-tic-email1 disabled-link"
                              }
                              type="button"
                              data-toggle="dropdown"
                            >
                              <FontAwesomeIcon icon={faCalculator} />
                              {this.state.tempName === ""
                                ? TranslationContext !== undefined
                                  ? TranslationContext.p.template
                                  : "Template"
                                : this.state.tempName}
                            </button>
                            <ul className="dropdown-menu">
                              {this.state.CkEditorTemplateData !== null &&
                                this.state.CkEditorTemplateData.map(
                                  (item, i) => (
                                    <li
                                      style={{ display: "block" }}
                                      key={i}
                                      value={item.templateID}
                                    >
                                      <a
                                        onClick={this.handleCkEditorTemplateData.bind(
                                          this,
                                          item.templateID,
                                          item.templateName
                                        )}
                                        href="#!"
                                      >
                                        {item.templateName}
                                      </a>
                                    </li>
                                  )
                                )}
                            </ul>
                          </div>
                          <a
                            href="#!"
                            className="kblink1"
                            onClick={this.HandleKbLinkModalOpen.bind(this)}
                          >
                            <img
                              src={KnowledgeLogo}
                              alt="KnowledgeLogo"
                              className="knoim"
                            />
                            <label>
                              {TranslationContext !== undefined
                                ? TranslationContext.option.kblink
                                : "KB Link"}
                            </label>
                          </a>
                          <div className="tic-det-ck-user tic-createTic myticlist-expand-sect">
                            <select
                              className="add-select-category"
                              value="0"
                              onChange={this.setAssignedToValue.bind(this)}
                            >
                              <option value="0">
                                {TranslationContext !== undefined
                                  ? TranslationContext.link.users
                                  : "Users"}
                              </option>
                              {this.state.AssignToData !== null &&
                                this.state.AssignToData.map((item, i) => (
                                  <option key={i} value={item.user_ID}>
                                    {item.agentName}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div className="tic-det-ck-user myticlist-expand-sect placeholder-dropdown-tktSys">
                            <select
                              className="add-select-category"
                              value="0"
                              onChange={this.setPlaceholderValue.bind(this)}
                            >
                              <option value="0">
                                {TranslationContext !== undefined
                                  ? TranslationContext.link.placeholders
                                  : "Placeholders"}
                              </option>
                              {this.state.placeholderData !== null &&
                                this.state.placeholderData.map((item, i) => (
                                  <option key={i} value={item.mailParameterID}>
                                    {item.description}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12 ck-det-cntr ck-det-cntr-custom">
                            <CKEditor
                              data={this.state.editorTemplateDetails}
                              onChange={this.onAddCKEditorChange}
                              onBlur={this.onCkBlur}
                              config={{
                                toolbar: [
                                  {
                                    name: "basicstyles",
                                    items: ["Bold", "Italic", "Strike"],
                                  },
                                  {
                                    name: "styles",
                                    items: ["Styles", "Format"],
                                  },
                                  {
                                    name: "paragraph",
                                    items: ["NumberedList", "BulletedList"],
                                  },
                                  {
                                    name: "links",
                                    items: ["Link", "Unlink"],
                                  },
                                  {
                                    name: "insert",
                                    items: ["Image", "Table"],
                                  },
                                  {
                                    name: "editing",
                                    items: ["Scayt"],
                                  },
                                ],
                              }}
                            />
                            <img
                              src={ArrowImg}
                              alt="Arrow"
                              onClick={this.handleExpandedCkOpen.bind(this)}
                              className="ck-expand"
                            />
                            <div
                              className="row colladrowa"
                              style={{ bottom: "15px" }}
                            >
                              <div className="col-md-12 colladrow">
                                <ul className="ticsys">
                                  <li className="diwamargin">
                                    <label>
                                      To:{" "}
                                      {this.state.customerData.customerEmailId}
                                    </label>
                                  </li>
                                  <li>
                                    <div className="filter-checkbox">
                                      <input
                                        type="checkbox"
                                        id="fil-open"
                                        name="filter-type"
                                        style={{ display: "none" }}
                                        checked={this.state.InformStore}
                                        onChange={() =>
                                          this.showInformStoreFuncation()
                                        }
                                        disabled={
                                          this.state.selectedStoreIDs.length ===
                                          0
                                        }
                                      />
                                      <label
                                        htmlFor="fil-open"
                                        style={{ paddingLeft: "25px" }}
                                      >
                                        <span>
                                          {TranslationContext !== undefined
                                            ? TranslationContext.span
                                              .informstore
                                            : "Inform Store"}
                                        </span>
                                      </label>
                                    </div>
                                  </li>
                                  <li>
                                    <span>
                                      <input
                                        id="file-upload"
                                        className="file-upload1 d-none"
                                        type="file"
                                        name="file"
                                        onChange={this.handleFileUpload.bind(
                                          this
                                        )}
                                        multiple
                                      />
                                      <label
                                        htmlFor="file-upload"
                                        onDrop={this.fileDrop}
                                        onDragOver={this.fileDragOver}
                                        onDragEnter={this.fileDragEnter}
                                      >
                                        <img
                                          src={FileUpload}
                                          alt="file-upload"
                                          className="fileup"
                                        />
                                      </label>
                                    </span>
                                    <label style={{ color: "#2561a8" }}>
                                      {this.state.fileText}{" "}
                                      {TranslationContext !== undefined
                                        ? TranslationContext.ticketingDashboard
                                          .files
                                        : "files"}
                                    </label>
                                  </li>
                                  <li>
                                    <label className="">
                                      <div className="input-group">
                                        <span className="input-group-addon inputcc">
                                          CC:
                                        </span>
                                        <input
                                          type="text"
                                          className="CCdi1"
                                          name="userCC"
                                          value={this.state.mailFiled.userCC}
                                          autoComplete="off"
                                          onChange={this.handleMailOnChange.bind(
                                            this,
                                            "userCC"
                                          )}
                                        />

                                        <span className="input-group-addon inputcc-one">
                                          {this.state.userCcCount < 1
                                            ? "+" + this.state.userCcCount
                                            : "+" + this.state.userCcCount}
                                        </span>
                                      </div>
                                    </label>
                                    <label className="">
                                      <div className="input-group">
                                        <span className="input-group-addon inputcc">
                                          BCC:
                                        </span>
                                        <input
                                          type="text"
                                          className="CCdi1"
                                          name="userBCC"
                                          value={this.state.mailFiled.userBCC}
                                          autoComplete="off"
                                          onChange={this.handleMailOnChange.bind(
                                            this,
                                            "userBCC"
                                          )}
                                        />
                                        <span className="input-group-addon inputcc-one">
                                          {this.state.userBccCount < 1
                                            ? "+" + this.state.userBccCount
                                            : "+" + this.state.userBccCount}
                                        </span>
                                      </div>
                                    </label>
                                  </li>
                                  <li>
                                    <label>
                                      <div>
                                        <select
                                          style={{
                                            marginTop: "15px",
                                            width: "100%",
                                          }}
                                          className="CCdi"
                                          value={this.state.emailSenderID}
                                          onChange={this.handleChangeEmailSenderID.bind(
                                            this
                                          )}
                                        >
                                          <option>Select Sender Mail ID</option>
                                          {this.state.emailIDData.length > 0
                                            ? this.state.emailIDData.map(
                                              (item) => {
                                                return (
                                                  <option
                                                    value={item.emailSenderID}
                                                  >
                                                    {item.emailSenderID}
                                                  </option>
                                                );
                                              }
                                            )
                                            : null}
                                        </select>
                                      </div>
                                    </label>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}
                    <div className="row m-b-10 m-t-20">
                      {!(this.state.storeticketsrch) && this.state.displayField["Add Note"] && (
                        <div className="col-md-4">
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              id="add-Notes"
                              name="filter-type"
                              style={{ display: "none" }}
                              onChange={() => this.showAddNoteFuncation()}
                            />
                            <label
                              htmlFor="add-Notes"
                              style={{ paddingLeft: "25px" }}
                            >
                              <span className="add-note">
                                {this.state.ticketFields.length > 0
                                  ? this.state.ticketFields.filter(
                                    (x) =>
                                      x.fieldName.toLowerCase() ===
                                      "Add Note".toLowerCase()
                                  ).length > 0
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Add Note".toLowerCase()
                                    )[0].createPage
                                      ? TranslationContext !== undefined
                                        ? this.state.ticketFields.filter(
                                          (x) =>
                                            x.fieldName.toLowerCase() ===
                                            "Add Note".toLowerCase()
                                        )[0].displayHindiName ||
                                        TranslationContext.span.addnote
                                        : this.state.ticketFields.filter(
                                          (x) =>
                                            x.fieldName.toLowerCase() ===
                                            "Add Note".toLowerCase()
                                        )[0].displayEnglishName || "Add Note"
                                      : TranslationContext !== undefined
                                        ? TranslationContext.span.addnote
                                        : "Add Note"
                                    : TranslationContext !== undefined
                                      ? TranslationContext.span.addnote
                                      : "Add Note"
                                  : TranslationContext !== undefined
                                    ? TranslationContext.span.addnote
                                    : "Add Note"}
                              </span>
                            </label>
                          </div>
                          {this.state.fieldError ? (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["Add Note"]}
                            </p>
                          ) : null}
                        </div>
                      )}

                      {!(this.state.storeticketsrch) && this.state.displayField["Auto Escalate"] && (
                        <div className="col-md-8">
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              id="fil-add1"
                              name="escalationLevel"
                              value={this.state.escalationLevel}
                              style={{ display: "none" }}
                              onChange={this.handleEscalationChange.bind(this)}
                            />
                            <label
                              htmlFor="fil-add1"
                              style={{ paddingLeft: "25px" }}
                            >
                              <span className="add-note">
                                {this.state.ticketFields.length > 0
                                  ? this.state.ticketFields.filter(
                                    (x) =>
                                      x.fieldName.toLowerCase() ===
                                      "Auto Escalate".toLowerCase()
                                  ).length > 0
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Auto Escalate".toLowerCase()
                                    )[0].createPage
                                      ? TranslationContext !== undefined
                                        ? this.state.ticketFields.filter(
                                          (x) =>
                                            x.fieldName.toLowerCase() ===
                                            "Auto Escalate".toLowerCase()
                                        )[0].displayHindiName ||
                                        TranslationContext.span.autoescalate
                                        : this.state.ticketFields.filter(
                                          (x) =>
                                            x.fieldName.toLowerCase() ===
                                            "Auto Escalate".toLowerCase()
                                        )[0].displayEnglishName ||
                                        "Auto Escalate"
                                      : TranslationContext !== undefined
                                        ? TranslationContext.span.autoescalate
                                        : "Auto Escalate"
                                    : TranslationContext !== undefined
                                      ? TranslationContext.span.autoescalate
                                      : "Auto Escalate"
                                  : TranslationContext !== undefined
                                    ? TranslationContext.span.autoescalate
                                    : "Auto Escalate"}
                              </span>
                            </label>
                          </div>
                          {this.state.fieldError ? (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.fieldError["Auto Escalate"]}
                            </p>
                          ) : null}
                        </div>
                      )}
                    </div>
                    {this.state.showAddNote ? (
                      <div>
                        <div className="row m-b-10">
                          <div className="col-md-12">
                            <textarea
                              className="addNote-textarea-system-new"
                              placeholder={
                                TranslationContext !== undefined
                                  ? TranslationContext.ticketingDashboard
                                    .writeyournotehere
                                  : "Write your note here"
                              }
                              name="ticketNote"
                              value={this.state.ticketNote}
                              onChange={this.handleTicketChange}
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    ) : null}
                    {/* Attachment New flow*/}
                    <div className="mt-3">
                      <span style={{ border: "1px solid #000000", borderRadius: "5px", padding: "5px" }}>
                        <input
                          id="file-upload_t"
                          className="file-upload1 d-none"
                          type="file"
                          name="file"
                          onChange={this.handleAttachment.bind(
                            this
                          )}
                          multiple
                        />
                        <label
                          htmlFor="file-upload_t"
                        // onDrop={this.fileDrop}
                        // onDragOver={this.fileDragOver}
                        // onDragEnter={this.fileDragEnter}
                        >
                          Attachment:
                          <img
                            src={FileUpload}
                            alt="file-upload"
                            className="fileup mx-2"
                            style={{ width: "15px" }}
                          />
                        </label>
                      </span>
                      <label style={{ color: "#2561a8", margin: "0px 5px" }}>
                        {this.state.fileTextNew}{" "}
                        {TranslationContext !== undefined
                          ? TranslationContext.ticketingDashboard
                            .files
                          : "files"}
                      </label>
                      {
                        this.state.fileNew.length > 0 &&
                        <div className="row my-3 mx-1" style={{ border: "1px solid #000000", borderRadius: "5px", padding: "10px" }}>

                          {this.state.fileNew.map((item, i) =>
                            i < 5 ? (
                              <div style={{ position: "relative" }} key={i}>
                                <div>
                                  <img
                                    src={CircleCancel}
                                    alt="thumb"
                                    className="circleCancle"
                                    onClick={() => {
                                      this.handleRemoveImageNew(i);
                                    }}
                                  />
                                </div>

                                <div>
                                  <a href={item.value} target="_blank">
                                    <img
                                      src={
                                        item.Type === "docx"
                                          ? require("./../assets/Images/word.png")
                                          : item.Type === "xlsx"
                                            ? require("./../assets/Images/excel.png")
                                            : item.Type === "pdf"
                                              ? require("./../assets/Images/pdf.png")
                                              : item.Type === "txt"
                                                ? require("./../assets/Images/TxtIcon.png")
                                                : require("./../assets/Images/thumbticket.png")
                                      }
                                      title={item.name}
                                      alt="thumb"
                                      className="thumbtick"
                                    />
                                  </a>
                                </div>
                              </div>
                            ) : (
                              ""
                            )
                          )}


                        </div>
                      }

                    </div>
                    {/* Attachment New flow*/}
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="" style={{ height: "100%" }}>
                  <div className="tab-content tabpaddingsystem">
                    <div
                      className={`tab-pane fade ${this.state.storeticketsrch ? "" : " show active"}`}
                      id="customer-tab"
                      role="tabpanel"
                      aria-labelledby="customer-tab"
                      style={{ height: "100%" }}
                    >
                      <div className="ticketSycard">
                        <div className="ticketSycard1">
                          <div
                            className="paddingsystem"
                            style={{ borderBottom: "1px solid #EDEDED" }}
                          >
                            <div className="row">
                              <div className="col-md-4">
                                <label className="category2">
                                  {this.state.ticketFields.length > 0
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Customer Name".toLowerCase()
                                    ).length > 0
                                      ? this.state.ticketFields.filter(
                                        (x) =>
                                          x.fieldName.toLowerCase() ===
                                          "Customer Name".toLowerCase()
                                      )[0].createPage
                                        ? TranslationContext !== undefined
                                          ? this.state.ticketFields.filter(
                                            (x) =>
                                              x.fieldName.toLowerCase() ===
                                              "Customer Name".toLowerCase()
                                          )[0].displayHindiName ||
                                          TranslationContext.label
                                            .customername
                                          : this.state.ticketFields.filter(
                                            (x) =>
                                              x.fieldName.toLowerCase() ===
                                              "Customer Name".toLowerCase()
                                          )[0].displayEnglishName ||
                                          "Customer Name"
                                        : TranslationContext !== undefined
                                          ? TranslationContext.label.customername
                                          : "Customer Name"
                                      : TranslationContext !== undefined
                                        ? TranslationContext.label.customername
                                        : "Customer Name"
                                    : TranslationContext !== undefined
                                      ? TranslationContext.label.customername
                                      : "Customer Name"}
                                </label>
                              </div>
                              <div className="col-md-4">
                                <label className="category2">
                                  {this.state.ticketFields.length > 0
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Phone Number".toLowerCase()
                                    ).length > 0
                                      ? this.state.ticketFields.filter(
                                        (x) =>
                                          x.fieldName.toLowerCase() ===
                                          "Phone Number".toLowerCase()
                                      )[0].createPage
                                        ? TranslationContext !== undefined
                                          ? this.state.ticketFields.filter(
                                            (x) =>
                                              x.fieldName.toLowerCase() ===
                                              "Phone Number".toLowerCase()
                                          )[0].displayHindiName ||
                                          TranslationContext.label.phonenumber
                                          : this.state.ticketFields.filter(
                                            (x) =>
                                              x.fieldName.toLowerCase() ===
                                              "Phone Number".toLowerCase()
                                          )[0].displayEnglishName ||
                                          "Phone Number"
                                        : TranslationContext !== undefined
                                          ? TranslationContext.label.phonenumber
                                          : "Phone Number"
                                      : TranslationContext !== undefined
                                        ? TranslationContext.label.phonenumber
                                        : "Phone Number"
                                    : TranslationContext !== undefined
                                      ? TranslationContext.label.phonenumber
                                      : "Phone Number"}
                                </label>
                              </div>
                              <div className="col-md-4">
                                <label className="category2">
                                  {this.state.ticketFields.length > 0
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Email Id".toLowerCase()
                                    ).length > 0
                                      ? this.state.ticketFields.filter(
                                        (x) =>
                                          x.fieldName.toLowerCase() ===
                                          "Email Id".toLowerCase()
                                      )[0].createPage
                                        ? TranslationContext !== undefined
                                          ? this.state.ticketFields.filter(
                                            (x) =>
                                              x.fieldName.toLowerCase() ===
                                              "Email Id".toLowerCase()
                                          )[0].displayHindiName ||
                                          TranslationContext.label.emailid
                                          : this.state.ticketFields.filter(
                                            (x) =>
                                              x.fieldName.toLowerCase() ===
                                              "Email Id".toLowerCase()
                                          )[0].displayEnglishName ||
                                          "Email Id"
                                        : TranslationContext !== undefined
                                          ? TranslationContext.label.emailid
                                          : "Email Id"
                                      : TranslationContext !== undefined
                                        ? TranslationContext.label.emailid
                                        : "Email Id"
                                    : TranslationContext !== undefined
                                      ? TranslationContext.label.emailid
                                      : "Email Id"}
                                </label>
                              </div>
                            </div>

                            <div
                              className="row"
                              style={{ marginBottom: "20px" }}
                            >
                              <div className="col-md-4">
                                <label className="category1">
                                  {this.state.customerData.customerName}
                                </label>
                              </div>
                              <div className="col-md-4">
                                <label className="category1">
                                  {this.state.customerData.customerPhoneNumber}
                                </label>
                              </div>
                              <div className="col-md-4">
                                <label className="category1">
                                  {this.state.customerData.customerEmailId}
                                </label>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-4">
                                <label className="category2">
                                  {this.state.ticketFields.length > 0
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Gender".toLowerCase()
                                    ).length > 0
                                      ? this.state.ticketFields.filter(
                                        (x) =>
                                          x.fieldName.toLowerCase() ===
                                          "Gender".toLowerCase()
                                      )[0].createPage
                                        ? TranslationContext !== undefined
                                          ? this.state.ticketFields.filter(
                                            (x) =>
                                              x.fieldName.toLowerCase() ===
                                              "Gender".toLowerCase()
                                          )[0].displayHindiName ||
                                          TranslationContext.label.gender
                                          : this.state.ticketFields.filter(
                                            (x) =>
                                              x.fieldName.toLowerCase() ===
                                              "Gender".toLowerCase()
                                          )[0].displayEnglishName || "Gender"
                                        : TranslationContext !== undefined
                                          ? TranslationContext.label.gender
                                          : "Gender"
                                      : TranslationContext !== undefined
                                        ? TranslationContext.label.gender
                                        : "Gender"
                                    : TranslationContext !== undefined
                                      ? TranslationContext.label.gender
                                      : "Gender"}
                                </label>
                              </div>
                              <div className="col-md-4">
                                <label className="category2">
                                  {this.state.ticketFields.length > 0
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Alternate Number".toLowerCase()
                                    ).length > 0
                                      ? this.state.ticketFields.filter(
                                        (x) =>
                                          x.fieldName.toLowerCase() ===
                                          "Alternate Number".toLowerCase()
                                      )[0].createPage
                                        ? TranslationContext !== undefined
                                          ? this.state.ticketFields.filter(
                                            (x) =>
                                              x.fieldName.toLowerCase() ===
                                              "Alternate Number".toLowerCase()
                                          )[0].displayHindiName ||
                                          TranslationContext.label
                                            .alternatenumber
                                          : this.state.ticketFields.filter(
                                            (x) =>
                                              x.fieldName.toLowerCase() ===
                                              "Alternate Number".toLowerCase()
                                          )[0].displayEnglishName ||
                                          "Alternate Number"
                                        : TranslationContext !== undefined
                                          ? TranslationContext.label
                                            .alternatenumber
                                          : "Alternate Number"
                                      : TranslationContext !== undefined
                                        ? TranslationContext.label.alternatenumber
                                        : "Alternate Number"
                                    : TranslationContext !== undefined
                                      ? TranslationContext.label.alternatenumber
                                      : "Alternate Number"}
                                </label>
                              </div>
                              <div className="col-md-4">
                                <label className="category2">
                                  {this.state.ticketFields.length > 0
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Alternate Email Id".toLowerCase()
                                    ).length > 0
                                      ? this.state.ticketFields.filter(
                                        (x) =>
                                          x.fieldName.toLowerCase() ===
                                          "Alternate Email Id".toLowerCase()
                                      )[0].createPage
                                        ? TranslationContext !== undefined
                                          ? this.state.ticketFields.filter(
                                            (x) =>
                                              x.fieldName.toLowerCase() ===
                                              "Alternate Email Id".toLowerCase()
                                          )[0].displayHindiName ||
                                          TranslationContext.label
                                            .alternateemailid
                                          : this.state.ticketFields.filter(
                                            (x) =>
                                              x.fieldName.toLowerCase() ===
                                              "Alternate Email Id".toLowerCase()
                                          )[0].displayEnglishName ||
                                          "Alternate Email Id"
                                        : TranslationContext !== undefined
                                          ? TranslationContext.label
                                            .alternateemailid
                                          : "Alternate Email Id"
                                      : TranslationContext !== undefined
                                        ? TranslationContext.label
                                          .alternateemailid
                                        : "Alternate Email Id"
                                    : TranslationContext !== undefined
                                      ? TranslationContext.label.alternateemailid
                                      : "Alternate Email Id"}
                                </label>
                              </div>
                            </div>

                            <div
                              className="row"
                              style={{ marginBottom: "20px" }}
                            >
                              <div className="col-md-4">
                                <label className="category1">
                                  {this.state.customerData.genderID === 1
                                    ? "Male"
                                    : "Female"}
                                </label>
                              </div>
                              <div className="col-md-4">
                                <label className="category1">
                                  {this.state.customerData.altNumber}
                                </label>
                              </div>
                              <div className="col-md-4">
                                <label className="category1">
                                  {this.state.customerData.altEmailID}
                                </label>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col-md-4">
                                <label className="category2">
                                  {this.state.ticketFields.length > 0
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "DOB".toLowerCase()
                                    ).length > 0
                                      ? this.state.ticketFields.filter(
                                        (x) =>
                                          x.fieldName.toLowerCase() ===
                                          "DOB".toLowerCase()
                                      )[0].createPage
                                        ? TranslationContext !== undefined
                                          ? this.state.ticketFields.filter(
                                            (x) =>
                                              x.fieldName.toLowerCase() ===
                                              "DOB".toLowerCase()
                                          )[0].displayHindiName ||
                                          TranslationContext.label.dateofbirth
                                          : this.state.ticketFields.filter(
                                            (x) =>
                                              x.fieldName.toLowerCase() ===
                                              "DOB".toLowerCase()
                                          )[0].displayEnglishName || "DOB"
                                        : TranslationContext !== undefined
                                          ? TranslationContext.label.dateofbirth
                                          : "DOB"
                                      : TranslationContext !== undefined
                                        ? TranslationContext.label.dateofbirth
                                        : "DOB"
                                    : TranslationContext !== undefined
                                      ? TranslationContext.label.dateofbirth
                                      : "DOB"}
                                </label>
                              </div>
                            </div>

                            <div
                              className="row"
                              style={{ marginBottom: "20px" }}
                            >
                              <div className="col-md-4">
                                <label className="category1">
                                  {this.state.customerData.dob}
                                </label>
                              </div>
                            </div>
                            {window.localStorage.getItem('Programcode') === 'bataclub' && window.localStorage.getItem("isvcw") === "true" &&
                              <div>

                                <div className="module-switch logic-radio">
                                  <label
                                    className="full-profile-view-text"
                                    style={{ paddingLeft: 0 }}
                                  >View Profile</label>
                                  <div className="radio-profile_view">
                                    <input
                                      type="radio"
                                      value="bataclub"
                                      checked={
                                        this.state.programselect ===
                                        "bataclub"
                                      }
                                      onChange={(e) => this.handleRadioChange(e)}
                                    />
                                    <label >
                                      Bataclub
                                    </label>
                                  </div>
                                  <div className="radio-profile_view">
                                    <input
                                      type="radio"
                                      value="hushpuppiessignatureclub"
                                      checked={
                                        this.state.programselect ===
                                        "hushpuppiessignatureclub"
                                      }
                                      onChange={(e) => this.handleRadioChange(e)}
                                    />
                                    <label>
                                      Hushpuppies
                                    </label>


                                  </div>
                                  <div style={{ textAlign: "start", marginTop: "10px", marginBottom: "10px" }}>
                                    <button
                                      style={{ cursor: "pointer" }}
                                      onClick={this.handleProfileViewDrop}
                                    >
                                      View
                                    </button>

                                  </div>

                                </div>
                              </div>}

                            {
                              window.localStorage.getItem("isvcw") === "true" &&
                              <div className="row">

                                <div className={window.localStorage.getItem('Programcode') === 'bataclub' ? "disply" : "fullProfileBtn"} onClick={this.showFullProfile}><button>Full Profile View</button></div>
                              </div>
                            }
                            <div className="row" style={{ marginLeft: "0px" }}>
                              <button
                                className="systemeditbutton systemeditbutton-text"
                                onClick={this.handleGetCustomerData.bind(
                                  this,
                                  CustomerId,
                                  "Edit"
                                )}
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.button.edit
                                  : "EDIT"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Modal
                      onClose={this.handleEditCustomerClose.bind(this)}
                      open={this.state.EditCustomer}
                      modalId="AddSearchModel"
                      overlayId="logout-ovrly"
                    >
                      <div className="pop-upAddSearchPD">
                        <label className="lbl-popup-title">
                          {TranslationContext !== undefined
                            ? TranslationContext.label.editcustomer
                            : "Edit Customer"}
                        </label>
                        <hr />
                        <div className="row row-margin1">
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="txt-1"
                              placeholder={
                                TranslationContext !== undefined
                                  ? TranslationContext.label.fullname
                                  : "Full Name"
                              }
                              name="customername"
                              autoComplete="off"
                              value={this.state.CustData.customername}
                              onChange={this.handleOnChangeData}
                            />
                            {this.validator.message(
                              "Full Name",
                              this.state.CustData.customername,
                              "required|alpha_space"
                            )}
                          </div>
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="txt-1"
                              maxLength={parseInt(this.state.mobNumLength)}
                              placeholder={
                                TranslationContext !== undefined
                                  ? TranslationContext.label.mobilenumber
                                  : "Mobile Number (with country code)"
                              }
                              name="customerPhone"
                              value={this.state.CustData.customerPhone}
                              onChange={this.handleOnChangeData}
                            // disabled
                            />
                            {this.validator.message(
                              "Mobile Number",
                              this.state.CustData.customerPhone,
                              `required|integer|size:${this.state.mobNumLength}`
                            )}
                          </div>
                        </div>
                        <div className="row row-margin1">
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="txt-1"
                              placeholder={
                                TranslationContext !== undefined
                                  ? TranslationContext.label.emailid
                                  : "Email ID"
                              }
                              name="custEmailId"
                              value={this.state.CustData.custEmailId}
                              onChange={this.handleOnChangeData}
                            // disabled
                            />
                          </div>
                          <div className="col-md-6 radio-btn-margin">
                            <Radio.Group
                              onChange={this.GenderonChange}
                              value={this.state.CustData.genderID}
                            // disabled
                            >
                              <Radio value={1}>
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.male
                                  : "Male"}
                              </Radio>
                              <Radio value={2}>
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.female
                                  : "Female"}
                              </Radio>
                            </Radio.Group>
                          </div>
                        </div>
                        <div className="row row-margin1">
                          <div className="col-md-6 addcustdate">
                            <DatePicker
                              className="txt-1"
                              placeholderText={
                                TranslationContext !== undefined
                                  ? TranslationContext.label.dateofbirth
                                  : "DOB"
                              }
                              name="editDOB"
                              maxDate={new Date()}
                              showMonthDropdown
                              showYearDropdown
                              selected={this.state.editDOB}
                              value={this.state.CustData.editDOB}
                              onChange={(date) => this.handleChange(date)}
                              dateFormat="dd MMM yyyy"
                            />
                          </div>
                        </div>
                        <hr />
                        <div className="row row-margin1">
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="txt-1"
                              maxLength={parseInt(this.state.mobNumLength)}
                              placeholder={
                                TranslationContext !== undefined
                                  ? TranslationContext.label.alternatenumber
                                  : "Alternate Number (with country code)"
                              }
                              name="altNo"
                              autoComplete="off"
                              value={this.state.CustData.altNo}
                              onChange={this.handleOnChangeData}
                            />
                            {this.validator.message(
                              "Alternate Number (with country code)",
                              this.state.CustData.altNo,
                              `integer|size:${this.state.mobNumLength}`
                            )}
                          </div>
                          <div className="col-md-6">
                            <input
                              type="text"
                              className="txt-1"
                              placeholder={
                                TranslationContext !== undefined
                                  ? TranslationContext.label.alternateemail
                                  : "Alternate Email"
                              }
                              name="altEmail"
                              autoComplete="off"
                              value={this.state.CustData.altEmail}
                              onChange={this.handleOnChangeData}
                            />
                          </div>
                        </div>
                        <div className="btn-float">
                          <button
                            className="cancel-btn-A"
                            onClick={this.handleEditCustomerClose.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.cancel
                              : "CANCEL"}
                          </button>
                          <button
                            type="button"
                            className="butn"
                            onClick={this.handleUpdateCustomer.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.save
                              : "SAVE"}
                          </button>
                        </div>
                      </div>
                    </Modal>
                    <div
                      className={`tab-pane fade ${this.state.storeticketsrch ? " show active" : ""}`}
                      id="order-tab"
                      role="tabpanel"
                      aria-labelledby="order-tab"
                      style={{ height: "100%" }}
                    >
                      {/* bata implementation */}
                      {
                        window.localStorage.getItem("Programcode") === 'bataclub' ?
                          <div className="order_div ticketPage_order">
                            <div className="search_div mb-3 mx-2">
                              <div className="search_header">
                                <h3>Is Order</h3>
                                <div className="order_type">
                                  <label className="switch">
                                    {
                                      this.state.storeticketsrch ? <input type="checkbox" checked="checked" />
                                        : <input type="checkbox" checked={this.state.unknowItemAttach} onChange={this.handleCreateOrderUnknown} />
                                    }

                                    <span className="slider round"></span>
                                  </label>
                                  <span>Unknown</span>
                                </div>
                              </div>

                            </div>

                            <div className="row m-0">
                              {showOrders === false ?
                                !this.state.unknowItemAttach ?
                                  <div className="col-8">
                                    <div className="search_div">
                                      <div className="search_header">
                                        <h3>Search By</h3>
                                        <div className="order_type">
                                          <span>Website Order</span>
                                          <label className="switch">
                                            <input type="checkbox" checked={isorderFromShop} onChange={this.handleOrderSearchType} />
                                            <span className="slider round"></span>
                                          </label>
                                          <span>Shop Order</span>
                                        </div>
                                      </div>
                                      <div className="d-flex justify-content-between">
                                        <div className="serch_by_div">
                                          <input id="orderId_cre" type="radio" checked={searchType === "orderId_cre"} name='search_type' onChange={this.handleSearchOrderType} />
                                          <label htmlFor="orderId_cre">Order Id</label>
                                        </div>
                                        <div className="serch_by_div">
                                          <input id="mobId_cre" type="radio" checked={searchType === "mobId_cre"} name='search_type' onChange={this.handleSearchOrderType} />
                                          <label htmlFor="mobId_cre">Mobile</label>
                                        </div>
                                      </div>
                                      {searchType === "orderId_cre" ?
                                        <div className="order_input">
                                          <label>Order Id</label>
                                          <input className="w-100" placeholder="Enter Order Id" type="text" value={orderIdTobeSearched} onChange={this.handleSetOrderId} />
                                        </div>
                                        :
                                        searchType === "mobId_cre" ?
                                          <div className="order_input">
                                            <label>Mobile</label>
                                            <input maxLength={10} className="w-100" placeholder="Enter Mobile Number" type="number"
                                              onChange={this.getOrderMobileNo} value={isorderFromShop ?
                                                (this.state.customerData?.customerPhoneNumber?.length > 10 ?
                                                  this.state.customerData?.customerPhoneNumber.split(/91(.*)/s)[1] : this.state.customerData?.customerPhoneNumber)
                                                : mobileNOtoSearch} readOnly />
                                            {/* : mobileNOtoSearch} readOnly={isorderFromShop} /> */}
                                            <p className="mobile_remark">*Enter 10 digit mobile number</p>
                                          </div>
                                          : null
                                      }
                                      <div className="seach_button">
                                        <button disabled={isOrderSearchLoading} onClick={searchType === "orderId_cre" ? () => this.handleGetOrderList("") : this.getListOfOrdersMobile}>
                                          {isOrderSearchLoading ? <img
                                            src={loaderGif}
                                            alt="loading"
                                            style={{ width: "20px" }}
                                          /> :
                                            "Search"}</button>
                                      </div>
                                    </div>
                                  </div>
                                  :
                                  //Unknow Item Attach Flow Start
                                  <div className="col-10 order_div search_div mx-2">
                                    <div class="order_input">
                                      <label>Item search</label>
                                      <input class="w-100" value={this.state.itemtobeSearch} placeholder="Item Search" type="text" onChange={(e) => this.handleSearchItemToAttach(e)} />
                                      <div className="seach_button">
                                        <button disabled={isOrderSearchLoading} onClick={this.handleSearchItemADB}>

                                          {isOrderSearchLoading ? <img
                                            src={loaderGif}
                                            alt="loading"
                                            style={{ width: "20px" }}
                                          /> :
                                            "Search"}
                                        </button>

                                      </div >
                                      {
                                        this.state.itemUnknowndata.length > 0 &&
                                        <>
                                          <div className="mt-2">
                                            <label>Select Item</label>
                                            <select
                                              className="category-select-system dropdown-label"
                                              // value={this.state.ItemNameAdb}
                                              onChange={(e) => this.handelSelectItemADB(e)}

                                            >
                                              <option
                                                className="select-category-placeholder"
                                                value={-1}
                                              >
                                                Select
                                              </option>
                                              {this.state.itemUnknowndata.length > 0
                                                ? this.state.itemUnknowndata.map((item, i) => (
                                                  <option
                                                    key={i}
                                                    value={item.uniqueItemName + "|" + item.uniqueItemCode + "|" + item.price}
                                                    className="select-category-placeholder"
                                                  >
                                                    {item.uniqueItemName}
                                                  </option>
                                                ))
                                                : null}
                                            </select>
                                          </div>
                                          <div className="custom-ticket-title mt-2">
                                            <label>Item Name</label>
                                            <input className="" value={this.state.ItemNameAdb} readOnly />

                                          </div>
                                          <div className="custom-ticket-title mt-2">
                                            <label>Item code</label>
                                            <input className="" value={this.state.ItemCodeAdb} readOnly />

                                          </div>
                                          <div className="seach_button">
                                            <button
                                              //disabled={this.state.ItemCodeAdb?.length>0?false:true} 
                                              onClick={this.handleAttachItemObject}
                                            >

                                              {/* {isOrderSearchLoading ? <img
                                                src={loaderGif}
                                                alt="loading"
                                                style={{ width: "20px" }}
                                              /> :
                                                "Add"} */}
                                              Add
                                            </button>

                                          </div>

                                        </>

                                      }
                                      <div>
                                        {this.state.selectedItemDataUnknown.length > 0 && (
                                          <div className="px-2 mt-3">
                                            <label className="mb-3">List of Items Selected</label>
                                            <table>
                                              <thead>
                                                <th>Item Name</th>
                                                <th>Item Code</th>
                                                <th>Action</th>
                                              </thead>
                                              <tbody>
                                                {this.state.selectedItemDataUnknown.map(
                                                  (datas, index) => {
                                                    return (
                                                      <tr key={index}>
                                                        <td>
                                                          {
                                                            datas.ItemName
                                                          }
                                                        </td>
                                                        <td>
                                                          {datas.ItemCode}
                                                        </td>
                                                        <td>
                                                          <img
                                                            onClick={() =>
                                                              this.handleDeleteItem(
                                                                datas
                                                              )
                                                            }
                                                            src={
                                                              BlackDeleteIcon
                                                            }
                                                            alt="Pencile"
                                                            className="pencilImg"
                                                            title="Delete Product"
                                                          />
                                                        </td>
                                                      </tr>
                                                    );
                                                  }
                                                )}
                                              </tbody>
                                            </table>
                                          </div>
                                        )}
                                      </div>



                                    </div>

                                  </div>
                                // Unknow Item Attach Flow END


                                :
                                <div className="col-12">
                                  <button className="back_button" onClick={() => { this.handleShowOrders(false) }}>
                                    <img src={blueLeftArrow} alt="" /> back to search</button>
                                  {isorderFromShop ?
                                    <TicketSystemOrder
                                      custDetails={CustomerId}
                                      AttachOrder={this.handleCustomerAttachamentStatus}
                                      getParentOrderData={this.handleGetOrderId}
                                      getItemOrderData={this.handleGetItemData}
                                      purchaseMode={this.state.selectedChannelOfPurchase}
                                      ticket_IDS={this.state.ticketDetailID}
                                      ShowOderdData={this.state.showOrderDetails}
                                      parentCallBackFuncation={this.parentCallBackFuncation}
                                      message="Add"
                                      AddManuallyData={false}
                                      searchHide={true}
                                      order_number={this.state.order_number}
                                    /> :
                                    <>
                                      {
                                        searchType === "orderId_cre" ?
                                          <div className="order_summary" id="accordion_order">
                                            {/* {console.log(orderList, orderList.length)} */}
                                            {orderList.length ?
                                              orderList.map((ele, i) => {
                                                return (
                                                  <div className="single_order_data" key={i}>
                                                    <div className="card-link d-flex">
                                                      <img className="px-2 order_expand right_icon" data-toggle="collapse"
                                                        href={"#" + ele.orderId} src={tringleRight} alt="" />
                                                      <div className="row">
                                                        <div className="col-2">
                                                          <label className="order_label">Order Id:</label>
                                                          {ele.orderId}</div>
                                                        <div className="col-2">
                                                          <label className="order_label">Date:</label>
                                                          {this.formatDate(ele.orderDate)}</div>
                                                        <div className="col-2">
                                                          <label className="order_label">Mobile No:</label>
                                                          {ele.customerDetails?.mobileNumber}</div>
                                                        <div className="col-2">
                                                          <label className="order_label">Delivery Address:</label>
                                                          {ele.metadata?.billing_address_address_line1}</div>
                                                        <div className="col-2">
                                                          <label className="order_label">Order Type:</label>
                                                          {ele.metadata?.shipmentName !== null ? ele.metadata?.shipmentName : "---"}</div>
                                                        <div className="col-2">
                                                          <label className="order_label">Email: </label>
                                                          {ele.customerDetails?.emailId}</div>
                                                      </div>
                                                    </div>
                                                    <div id={ele.orderId}
                                                      className="collapse"
                                                      data-parent="#accordion_order">
                                                      <div className="order_details">
                                                        <ul className="nav" role="tablist">
                                                          <li className="nav-item">
                                                            <a
                                                              className="nav-link active"
                                                              data-toggle="tab"
                                                              href="#order_deatil"
                                                              role="tab"
                                                              aria-controls="order_deatil"
                                                              aria-selected="false">Order Details</a>
                                                          </li>
                                                          <li className="nav-item">
                                                            <a className="nav-link" data-toggle="tab"
                                                              href="#subOrder_detail"
                                                              role="tab"
                                                              aria-controls="subOrder_detail">Sub Order Details</a>
                                                          </li>
                                                          <li className="attch_order">
                                                            <label htmlFor="attachOrd">Attach Order</label>
                                                            <input name="attachOrd" type="checkbox"
                                                              onChange={this.newHandleOminiAttachProductData}
                                                            />
                                                          </li>
                                                        </ul>
                                                        <div className="tab-content ">
                                                          <div className="tab-pane fade show active" id="order_deatil" role="tabpanel" aria-labelledby="order_deatil">
                                                            <div className="order_des" id="accordion_orderDes">
                                                              <div className="single_order_data" >
                                                                <div className="gen_info_head" data-toggle="collapse"
                                                                  href="#gen_info_desc" >
                                                                  <label>GENERAL INFO</label>
                                                                  <img className="right_icon" src={tringleRight} alt="" />
                                                                </div>
                                                                <div id="gen_info_desc" className="all_detail_div collapse"
                                                                  data-parent="#accordion_orderDes">
                                                                  <div className="row">
                                                                    <div className="col-6">
                                                                      <label>Oredr Id:</label>
                                                                      <span>{ele.orderId}</span>
                                                                    </div>
                                                                    <div className="col-6">
                                                                      <label>Order Date:</label>
                                                                      <span>{this.formatDate(ele.orderDate)}</span>
                                                                    </div>
                                                                    <div className="col-6">
                                                                      <label>Order Channel:</label>
                                                                      <span>{ele.orderChannel}</span>
                                                                    </div>
                                                                  </div>
                                                                  <div className="customer_detail">
                                                                    <h3>Customer Details</h3>
                                                                    <div className="row">
                                                                      <div className="col-6">
                                                                        <label>Name:</label>
                                                                        <span>{ele.customerDetails.customerName}</span>
                                                                      </div>
                                                                      <div className="col-6">
                                                                        <label>Mobile Number:</label>
                                                                        <span>{ele.customerDetails.mobileNumber}</span>
                                                                      </div>
                                                                      <div className="col-6">
                                                                        <label>Email Id:</label>
                                                                        <span>{ele.customerDetails.emailId}</span>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                  <div className="customer_detail">
                                                                    <h3>Order Status</h3>
                                                                    <div className="row">
                                                                      <div className="col-6">
                                                                        <label>Id:</label>
                                                                        <span>{ele.orderStatus.id}</span>
                                                                      </div>
                                                                      <div className="col-6">
                                                                        <label>Order Status:</label>
                                                                        <span>{ele.orderStatus.orderStatus}</span>
                                                                      </div>
                                                                      <div className="col-6">
                                                                        <label>Status Type:</label>
                                                                        <span>{ele.orderStatus.orderStatusType}</span>
                                                                      </div>
                                                                      <div className="col-6">
                                                                        <label>Status To Customer:</label>
                                                                        <span>{ele.orderStatus.orderStatusToCustomer}</span>
                                                                      </div>
                                                                      <div className="col-6">
                                                                        <label>Status To Oms:</label>
                                                                        <span>{ele.orderStatus.orderStatusToOms}</span>
                                                                      </div>
                                                                      <div className="col-6">
                                                                        <label>Color Code:</label>
                                                                        <span>{ele.orderStatus.colorCode}</span>
                                                                      </div>
                                                                    </div>
                                                                  </div>

                                                                  <div className="customer_detail">
                                                                    <h3>Metadata</h3>
                                                                    {ele.metadata !== undefined && ele.metadata !== null ?
                                                                      <div className="row">
                                                                        {Object.entries(ele.metadata).map(([key, value]) => {
                                                                          return (
                                                                            <div className="col-6">
                                                                              <label>{this.handleSpaces(key)}:</label>
                                                                              {(typeof (value) !== 'object' || value === null) &&
                                                                                <span>{value === true ? "true" : value === false ? "false" : value}</span>
                                                                              }
                                                                            </div>
                                                                          )
                                                                        })}
                                                                      </div>
                                                                      :
                                                                      <p className="noData_div p-1"> {"No Data Available"} </p>
                                                                    }
                                                                  </div>
                                                                  <div className="customer_detail">
                                                                    <h3>Payment Split Ratio J S O N</h3>
                                                                    <div className="row">
                                                                      <div className="col-6">
                                                                        <label>POINTES:</label>
                                                                        <span>{"Data"}</span>
                                                                      </div>
                                                                      <div className="col-6">
                                                                        <label>CARD:</label>
                                                                        <span>{"Data"}</span>
                                                                      </div>
                                                                      <div className="col-6">
                                                                        <label>VOUCHER:</label>
                                                                        <span>{"Data"}</span>
                                                                      </div>
                                                                      <div className="col-6">
                                                                        <label>COD:</label>
                                                                        <span>{"Data"}</span>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <div className="single_order_data" >
                                                                <div className="gen_info_head" data-toggle="collapse"
                                                                  href="#pricing_detail" >
                                                                  <label>PRICING DETAILS</label>
                                                                  <img className="right_icon" src={tringleRight} alt="" />
                                                                </div>
                                                                <div id="pricing_detail" className="all_detail_div collapse"
                                                                  data-parent="#accordion_orderDes">
                                                                  <div className="row">
                                                                    <div className="col-6">
                                                                      <label>Trade SP:</label>
                                                                      <span>{ele.totalPricingDetails?.tradeSP}</span>
                                                                    </div>
                                                                    <div className="col-6">
                                                                      <label>Loyalty Used:</label>
                                                                      <span>{ele.totalPricingDetails?.loyaltyUsed}</span>
                                                                    </div>
                                                                    <div className="col-6">
                                                                      <label>Total Sgst Amount::</label>
                                                                      <span>{ele.totalPricingDetails?.totalSgstAmount}</span>
                                                                    </div>
                                                                    <div className="col-6">
                                                                      <label>NetAmount:</label>
                                                                      <span>{ele.totalPricingDetails?.netAmount}</span>
                                                                    </div>
                                                                    <div className="col-6">
                                                                      <label>Total Igst Amount:</label>
                                                                      <span>{ele.totalPricingDetails?.totalIgstAmount}</span>
                                                                    </div>
                                                                    <div className="col-6">
                                                                      <label>Total SP:</label>
                                                                      <span>{ele.totalPricingDetails?.totalSP}</span>
                                                                    </div>
                                                                    <div className="col-6">
                                                                      <label>Total Amount With Shipping:</label>
                                                                      <span>{ele.totalPricingDetails?.totalAmountWithShipping}</span>
                                                                    </div>
                                                                    <div className="col-6">
                                                                      <label>Total Tax:</label>
                                                                      <span>{ele.totalPricingDetails?.totalTax}</span>
                                                                    </div>
                                                                    <div className="col-6">
                                                                      <label>Total Cess Amount:</label>
                                                                      <span>{ele.totalPricingDetails?.totalCessAmount}</span>
                                                                    </div>
                                                                    <div className="col-6">
                                                                      <label>Total Utgst Amount:</label>
                                                                      <span>{ele.totalPricingDetails?.totalUtgstAmount}</span>
                                                                    </div>
                                                                    <div className="col-6">
                                                                      <label>Total Cgst Amount:</label>
                                                                      <span>{ele.totalPricingDetails?.totalCgstAmount}</span>
                                                                    </div>
                                                                    <div className="col-6">
                                                                      <label>Shipping Charge:</label>
                                                                      <span>{ele.totalPricingDetails?.shippingCharge}</span>
                                                                    </div>
                                                                  </div>
                                                                  <div className="customer_detail">
                                                                    <h3>Total NNNow Cash Details</h3>
                                                                    <div className="row">
                                                                      <div className="col-6">
                                                                        <label>Product NNNow Cash:</label>
                                                                        <span>{ele.totalPricingDetails?.totalNNNowCashDetails?.productNNNowCash}</span>
                                                                      </div>
                                                                      <div className="col-6">
                                                                        <label>Cart NNNow Cash:</label>
                                                                        <span>{ele.totalPricingDetails?.totalNNNowCashDetails?.cartNNNowCash}</span>
                                                                      </div>
                                                                      <div className="col-6">
                                                                        <label>Total NNNow Cash:</label>
                                                                        <span>{ele.totalPricingDetails?.totalNNNowCashDetails?.totalNNNowCash}</span>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                  <div className="customer_detail">
                                                                    <h3>Total Discount Details</h3>
                                                                    <div className="row">
                                                                      <div className="col-6">
                                                                        <label>Product Discount:</label>
                                                                        <span>{ele.totalPricingDetails?.totalDiscountDetails?.productDiscount}</span>
                                                                      </div>
                                                                      <div className="col-6">
                                                                        <label>Total Discount:</label>
                                                                        <span>{ele.totalPricingDetails?.totalDiscountDetails?.totalDiscount}</span>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                  <div className="customer_detail">
                                                                    <h3>Payment Summary</h3>
                                                                    <div className="row">
                                                                      <div className="col-6">
                                                                        <label>Paid_at_source:</label>
                                                                        <span>{ele.paymentSummary?.paid_at_source}</span>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <div className="tab-pane fade" id="subOrder_detail" role="tabpanel" aria-labelledby="subOrder_detail">
                                                            {/* sub order start */}
                                                            {ele.consignments.length !== 0 ?
                                                              <div>
                                                                {ele.consignments.length > 0 &&
                                                                  <div className="subOrder_pagination">
                                                                    <label>Showing {currentSubOrder + 1} of {ele.consignments.length}</label>
                                                                    <button disabled={currentSubOrder === 0 ? true : false} onClick={() => { this.handleSubOderPagination("prev") }}>❮</button>
                                                                    <button disabled={currentSubOrder === ele.consignments.length - 1 ? true : false} onClick={() => { this.handleSubOderPagination("next") }}>❯</button>
                                                                  </div>
                                                                }
                                                                {/* {subOrderShow === 'defaultShow' ? */}
                                                                <div className={subOrderShow === 'defaultShow' ? "order_des" : 'd-none'} id="accordion_suborderDes">
                                                                  <div className="single_order_data" >
                                                                    <div className="gen_info_head" data-toggle="collapse"
                                                                      href="#gen_info_subDesc" >
                                                                      <label>GENERAL INFO</label>
                                                                      <img className="right_icon" src={tringleRight} alt="" />
                                                                    </div>
                                                                    <div id="gen_info_subDesc" className="all_detail_div collapse"
                                                                      data-parent="#accordion_suborderDes">
                                                                      <div className="row">
                                                                        <div className="col-6">
                                                                          <label>Consignment Id:</label>
                                                                          <span>{ele.consignments[currentSubOrder].consignmentId}</span>
                                                                        </div>
                                                                        <div className="col-6">
                                                                          <label>Item Count:</label>
                                                                          <span>{ele.consignments[currentSubOrder]?.itemCount}</span>
                                                                        </div>
                                                                        <div className="col-6">
                                                                          <label>Sla End Time:</label>
                                                                          <span>{ele.consignments[currentSubOrder]?.slaEndTime}</span>
                                                                        </div>
                                                                      </div>
                                                                      <div className="customer_detail">
                                                                        <h3>Consignment States DTO</h3>
                                                                        <div className="row">
                                                                          <div className="col-6">
                                                                            <label>Id:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.consignmentStatesDTO?.id}</span>
                                                                          </div>
                                                                          <div className="col-6">
                                                                            <label>Name:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.consignmentStatesDTO?.name}</span>
                                                                          </div>
                                                                          <div className="col-6">
                                                                            <label>Type:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.consignmentStatesDTO?.type}</span>
                                                                          </div>
                                                                          <div className="col-6">
                                                                            <label>Status To Customer:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.consignmentStatesDTO?.statusToCustomer}</span>
                                                                          </div>
                                                                          <div className="col-6">
                                                                            <label>Status To Oms:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.consignmentStatesDTO?.statusToOms}</span>
                                                                          </div>
                                                                          {/* ps: I know color is given to show consignmentstate NAME :) */}
                                                                          <div className="col-6">
                                                                            <label>Color Code:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.consignmentStatesDTO?.colorCode}</span>
                                                                          </div>
                                                                          <div className="col-6">
                                                                            <label>Processing Sequence:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.consignmentStatesDTO?.processingSequence}</span>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                      <div className="customer_detail">
                                                                        <h3>Address Details</h3>
                                                                        <div className="row">
                                                                          <div className="col-6">
                                                                            <label>City:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.addressDetails?.city}</span>
                                                                          </div>
                                                                          <div className="col-6">
                                                                            <label>State:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.addressDetails?.state}</span>
                                                                          </div>
                                                                          <div className="col-6">
                                                                            <label>Country:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.addressDetails?.country}</span>
                                                                          </div>
                                                                          <div className="col-6">
                                                                            <label>Pincode:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.addressDetails?.pincode}</span>
                                                                          </div>
                                                                          <div className="col-6">
                                                                            <label>Mobile Number:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.addressDetails?.mobileNumber}</span>
                                                                          </div>
                                                                          <div className="col-6">
                                                                            <label>Mobile Number Country Code:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.addressDetails?.mobileNumberCountryCallingCode}</span>
                                                                          </div>
                                                                          <div className="col-6">
                                                                            <label>Address_line1:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.addressDetails?.address_line1}</span>
                                                                          </div>
                                                                          <div className="col-6">
                                                                            <label>Full Address:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.addressDetails?.fullAddress}</span>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                      <div className="customer_detail">
                                                                        <h3>Ff Type</h3>
                                                                        <div className="row">
                                                                          <div className="col-6">
                                                                            <label>Ff Type:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.ffType?.ffType}</span>
                                                                          </div>
                                                                          <div className="col-6">
                                                                            <label>Type:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.ffType?.type}</span>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                      <div className="customer_detail">
                                                                        <h3>Logistics Details</h3>
                                                                        <div className="row">
                                                                          <div className="col-6">
                                                                            <label>Airway Bill Number:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.logisticsDetails?.airwayBillNumber}</span>
                                                                          </div>
                                                                          <div className="col-6">
                                                                            <label>Tracking Link:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.logisticsDetails?.trackingLink}</span>
                                                                          </div>
                                                                          <div className="col-6">
                                                                            <label>Promise Date:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.logisticsDetails?.promiseDate}</span>
                                                                          </div>
                                                                          <div className="col-6">
                                                                            <label>Logistics Partner:</label>
                                                                            {/* <span>key not there</span> */}
                                                                            <span>{ele.consignments[currentSubOrder]?.logisticsDetails?.logisticsPartner}</span>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                      <div className="customer_detail">
                                                                        <h3>Ff Center</h3>
                                                                        <div className="row">
                                                                          <div className="col-6">
                                                                            <label>Fc Id:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.ffCenter?.fcid}</span>
                                                                          </div>
                                                                          <div className="col-6">
                                                                            <label>Fc Name:</label>
                                                                            <span>{ele.consignments[currentSubOrder]?.ffCenter?.fcName}</span>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                  <div className="single_order_data" >
                                                                    <div className="gen_info_head" data-toggle="collapse"
                                                                      href="#sub_order_detail" >
                                                                      <label>SUB ORDER</label>
                                                                      <img className="right_icon" src={tringleRight} alt="" />
                                                                    </div>
                                                                    <div id="sub_order_detail" className="all_detail_div collapse"
                                                                      data-parent="#accordion_suborderDes">
                                                                      <div className="subOrder_items" id="accordion_suborderItems">
                                                                        {ele.consignments[currentSubOrder]?.items.length !== 0 &&
                                                                          ele.consignments[currentSubOrder].items.map((item, index) => {
                                                                            return (
                                                                              <div className="subOrder_item" key={index}>
                                                                                <input type="checkbox" className="ml-1" checked={selectedOminiItem.some(val => val.itemID === item.itemId)}
                                                                                  onChange={(e) => this.handleOminiSelectedItem(e, ele.consignments[currentSubOrder]?.consignmentId, item)} />
                                                                                <label className="item_id_div" data-toggle="collapse" href={"#sub_order_itemDetail" + index}
                                                                                > {item.itemId + " (" + item.product?.description + ")"}</label>
                                                                                <div className="collapse" id={"sub_order_itemDetail" + index} data-parent="#accordion_suborderItems">
                                                                                  <div className="sync_button mb-1">
                                                                                    <button onClick={() => this.handleGetOrderList(ele.orderId)}><img src={white_sync} alt="" />Sync ticket fields</button>
                                                                                  </div>
                                                                                  <div className="row">
                                                                                    <div className="col-6">
                                                                                      <label>Item Id:</label>
                                                                                      <span>{item.itemId}</span>
                                                                                    </div>
                                                                                    <div className="col-6">
                                                                                      <label className="check_eleg" onClick={() => this.checkCancelReturEligbile("cancellation", item.itemId)}>Eligbile For Cancellation:</label>
                                                                                      <span>{item.eligibleForCancellation ? "true" : "false"}</span>
                                                                                    </div>
                                                                                    <div className="col-6">
                                                                                      <label className="check_eleg" onClick={() => this.checkCancelReturEligbile("returns", item.itemId)}>Eligbile For Return:</label>
                                                                                      <span>{item.eligibleForReturn ? "true" : "false"}</span>
                                                                                    </div>
                                                                                    <div className="col-6">
                                                                                      <label>Return Id:</label>
                                                                                      <span>{item.returnId}</span>
                                                                                    </div>
                                                                                    <div className="col-6">
                                                                                      <label>Return Status:</label>
                                                                                      <span>{item.returnStatus}</span>
                                                                                    </div>
                                                                                    <div className="col-6">
                                                                                      <label>Refund Mode:</label>
                                                                                      <span>{item.refundMode}</span>
                                                                                    </div>
                                                                                    <div className="col-6">
                                                                                      <label>Neft Id Linked:</label>
                                                                                      <span>{item.neftIdLinked ? "true" : "false"}</span>
                                                                                    </div>
                                                                                    <div className="col-6">
                                                                                      <label>Refund Amount:</label>
                                                                                      <span>{item.refundAmount}</span>
                                                                                    </div>
                                                                                    <div className="col-6">
                                                                                      <label>Refund Status:</label>
                                                                                      <span>{item.refundStatus}</span>
                                                                                    </div>
                                                                                    <div className="col-6">
                                                                                      <label>Ref No:</label>
                                                                                      <span>{item.refundRefNumber}</span>
                                                                                    </div>
                                                                                  </div>
                                                                                  <div className="row cancel_return">
                                                                                    <div className="col-4">
                                                                                      <button disabled={!item.eligibleForCancellation} className={item.eligibleForCancellation ? "check_eleg" : "check_eleg disable"} onClick={() => { this.getCancelData(item, "cancelItem") }} >Cancel Item</button>
                                                                                    </div>
                                                                                    <div className="col-4">
                                                                                      <button className="check_eleg" onClick={() => { this.getItemHistory(item.orderItemHistory, "itemhistory") }}>Item History</button>
                                                                                    </div>
                                                                                    <div className="col-4">
                                                                                      <button disabled={!item.eligibleForReturn} className={item.eligibleForReturn ? "check_eleg" : "check_eleg disable"} onClick={() => { this.getReturnData(item, "returnItem") }} >Return Item</button>
                                                                                    </div>
                                                                                  </div>
                                                                                  <div className="customer_detail">
                                                                                    <h3>Metadata</h3>
                                                                                    {item.metadata !== undefined && item.metadata !== null ?
                                                                                      <div className="row">
                                                                                        {Object.entries(item.metadata).map(([key, value]) => {
                                                                                          return (
                                                                                            <div className="col-6">
                                                                                              <label>{this.handleSpaces(key)}:</label>
                                                                                              {(typeof (value) !== 'object' || value === null) &&
                                                                                                <span>{value === true ? "true" : value === false ? "false" : value}</span>
                                                                                              }
                                                                                            </div>
                                                                                          )
                                                                                        })}
                                                                                      </div>
                                                                                      :
                                                                                      <p className="noData_div p-1"> {"No Data Available"} </p>
                                                                                    }
                                                                                  </div>
                                                                                  <div className="customer_detail">
                                                                                    <h3>Return Metadata</h3>
                                                                                    {item.refundMode !== null ?
                                                                                      <div className="row">
                                                                                        {Object.entries(item.metadata).map(([key, value]) => {
                                                                                          return (
                                                                                            <div className="col-6">
                                                                                              <label>{key}:</label>
                                                                                              <span>{value === true ? "true" : value === false ? "false" : value}</span>
                                                                                            </div>
                                                                                          )
                                                                                        })}
                                                                                      </div>
                                                                                      :
                                                                                      <div className="d-flex justify-content-center">No data available!</div>
                                                                                    }
                                                                                  </div>
                                                                                  <div className="customer_detail">
                                                                                    <h3>Product</h3>
                                                                                    {item.product !== null ?
                                                                                      <div className="row">
                                                                                        {Object.entries(item.product).map(([key, value]) => {
                                                                                          return (
                                                                                            <div className="col-6">
                                                                                              <label>{key}:</label>
                                                                                              <span>{value === true ? "true" : value === false ? "false" : value}</span>
                                                                                            </div>
                                                                                          )
                                                                                        })}
                                                                                      </div>
                                                                                      :
                                                                                      <div className="d-flex justify-content-center">No data available!</div>
                                                                                    }
                                                                                  </div>
                                                                                  <div className="customer_detail">
                                                                                    <h3>Item Status</h3>
                                                                                    {item.itemStatus !== null ?
                                                                                      <div className="row">
                                                                                        {Object.entries(item.itemStatus).map(([key, value]) => {
                                                                                          return (
                                                                                            <div className="col-6">
                                                                                              <label>{key}:</label>
                                                                                              <span>{value === true ? "true" : value === false ? "false" : value}</span>
                                                                                            </div>
                                                                                          )
                                                                                        })}
                                                                                      </div>
                                                                                      :
                                                                                      <div className="d-flex justify-content-center">No data available!</div>
                                                                                    }
                                                                                  </div>
                                                                                  <div className="customer_detail">
                                                                                    <h3>Return Logistics Details</h3>
                                                                                    {item.returnLogisticsDetails !== null ?
                                                                                      <div className="row">
                                                                                        {Object.entries(item.returnLogisticsDetails).map(([key, value]) => {
                                                                                          return (
                                                                                            <div className="col-6">
                                                                                              <label>{key}:</label>
                                                                                              <span>{value === true ? "true" : value === false ? "false" : value}</span>
                                                                                            </div>
                                                                                          )
                                                                                        })}
                                                                                      </div>
                                                                                      :
                                                                                      <div className="d-flex justify-content-center">No data available!</div>
                                                                                    }
                                                                                  </div>
                                                                                  <div className="customer_detail">
                                                                                    <h3 className="mb-2">Refund Ratio</h3>
                                                                                    {item.refundRatio !== null ?
                                                                                      <div className="row">
                                                                                        {Object.entries(item.refundRatio).map(([key, value]) => {
                                                                                          return (
                                                                                            <div className="col-6">
                                                                                              <label>{key}:</label>
                                                                                              <span>{value === true ? "true" : value === false ? "false" : value}</span>
                                                                                            </div>
                                                                                          )
                                                                                        })}
                                                                                      </div>
                                                                                      :
                                                                                      <div className="d-flex justify-content-center">No data available!</div>
                                                                                    }
                                                                                  </div>
                                                                                  <div className="customer_detail">
                                                                                    <h3>Item Pricing Details</h3>
                                                                                    {item.itemPricingDetails !== null ?
                                                                                      <div className="row">
                                                                                        {Object.entries(item.itemPricingDetails).map(([key, value]) => {
                                                                                          // value === null&& console.log(typeof(value));
                                                                                          return (
                                                                                            (typeof (value) !== 'object' || value === null) &&
                                                                                            <div className="col-6">
                                                                                              <label>{key}:</label>
                                                                                              <span>{value === true ? "true" : value === false ? "false" : value}</span>
                                                                                            </div>
                                                                                          )
                                                                                        })}
                                                                                      </div>
                                                                                      :
                                                                                      <div className="d-flex justify-content-center">No data available!</div>
                                                                                    }
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                            )
                                                                          })}

                                                                      </div>

                                                                    </div>
                                                                  </div>
                                                                </div>

                                                                <div className={subOrderShow === "cancellation" ? "all_detail_div refund_cancel_div" : 'd-none'}>
                                                                  <button className="back_button" onClick={() => { this.getDefaultSubOrderView("defaultShow") }}>
                                                                    <img src={blueLeftArrow} alt="" />back</button>
                                                                  <div className="cancel_refund_div">
                                                                    <h3>Cancellation Eligibility</h3>
                                                                    <div className="row align-items-baseline">
                                                                      <div className="col-4">
                                                                        <label>Cancellable:</label>
                                                                        <span>{cancelEligbleDetail.cancellable ? "true" : "false"}</span>
                                                                      </div>
                                                                      <div className="col-8">
                                                                        <label>Reason:</label>
                                                                        <span>{cancelEligbleDetail.reason}</span>
                                                                      </div>
                                                                    </div>
                                                                    <div className="refund_ratio p-3">
                                                                      <h4 className="mb-2">Refund Ratio</h4>
                                                                      <div className="d-flex justify-content-center">No Record Found...!</div>
                                                                    </div>
                                                                  </div>
                                                                </div>

                                                                <div className={subOrderShow === "returns" ? "all_detail_div refund_cancel_div" : 'd-none'}>
                                                                  <button className="back_button" onClick={() => { this.getDefaultSubOrderView("defaultShow") }}>
                                                                    <img src={blueLeftArrow} alt="" />back</button>
                                                                  <div className="cancel_refund_div">
                                                                    <h3>Return Eligibility</h3>
                                                                    <div className="row align-items-baseline">
                                                                      <div className="col-4">
                                                                        <label>Returnable:</label>
                                                                        <span>{returnEligbleDetail.returnable ? "true" : "false"}</span>
                                                                      </div>
                                                                      <div className="col-8">
                                                                        <label>Reason:</label>
                                                                        <span>{returnEligbleDetail.reason}</span>
                                                                      </div>
                                                                    </div>
                                                                    <div className="refund_ratio px-2">
                                                                      <h4 className="mb-2">Refund Ratio</h4>
                                                                      <div className="d-flex justify-content-center">No Record Found...!</div>
                                                                    </div>
                                                                  </div>
                                                                </div>

                                                                <div className={subOrderShow === 'itemhistory' ? "item_history_div" : "d-none"}>
                                                                  <button className="back_button" onClick={() => { this.getDefaultSubOrderView("defaultShow") }}  >
                                                                    <img src={blueLeftArrow} alt="" />back</button>
                                                                  <div className="item_history_map">
                                                                    {itemOrderHistory.map((data, ind) => {
                                                                      return (
                                                                        <div className="history_card" >
                                                                          <div className="history_detail">
                                                                            {Object.entries(data).map(([key, value]) => {
                                                                              return (
                                                                                <div className="d-flex pb-1">
                                                                                  <label>{this.handleSpaces(key)}: </label>
                                                                                  <span>{value === null ? '---' : value}</span>
                                                                                </div>
                                                                              )
                                                                            })}
                                                                          </div>
                                                                        </div>
                                                                      )
                                                                    })}
                                                                  </div>
                                                                </div>
                                                                <div className={subOrderShow === 'cancelItem' ? "all_detail_div refund_cancel_div" : "d-none"}>
                                                                  <button className="back_button" onClick={() => { this.getDefaultSubOrderView("defaultShow") }}  >
                                                                    <img src={blueLeftArrow} alt="" />back</button>
                                                                  <div className="cancel_refund_div">
                                                                    <h3>Cancel Item</h3>

                                                                    <div className="px-4">
                                                                      <label>Cancel Date :</label>
                                                                      <span>{this.formatDate((new Date()).toString())}</span>
                                                                    </div>
                                                                    <div className="return_reason_dropdown">
                                                                      <label>Select Reason</label>
                                                                      <select onChange={this.selectCancelReason}>
                                                                        <option readOnly>Select Reason</option>
                                                                        <option>Delivery timelines not as expected</option>
                                                                        <option>Price is high</option>
                                                                        <option>Wrong order placed</option>
                                                                        <option>Will buy locally</option>
                                                                        <option>Change of mind</option>
                                                                        <option>Delay in Delivery</option>
                                                                      </select>
                                                                    </div>

                                                                    <div className="sync_button m-0 p-4">
                                                                      <button onClick={this.handleCancel}>Update Cancel</button>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <div className={subOrderShow === 'returnItem' ? "all_detail_div refund_cancel_div" : "d-none"}>
                                                                  <button className="back_button" onClick={() => { this.getDefaultSubOrderView("defaultShow") }}  >
                                                                    <img src={blueLeftArrow} alt="" />back</button>
                                                                  <div className="cancel_refund_div">
                                                                    <h3>Return Item</h3>
                                                                    <div className="row align-items-baseline">
                                                                      <div className="col-6">
                                                                        <label>Sub Order Id:</label>
                                                                        <span>{returnItemDetail?.itemId}</span>
                                                                      </div>
                                                                      <div className="col-6">
                                                                        <label>Product Code:</label>
                                                                        <span>{returnItemDetail?.product?.eanCode}</span>
                                                                      </div>
                                                                      <div className="col-6">
                                                                        <label>Product Name:</label>
                                                                        <span>{returnItemDetail?.product?.description}</span>
                                                                      </div>
                                                                      <div className="col-6">
                                                                        <label>Invoice Date:</label>
                                                                        <span>{"---"}</span>
                                                                      </div>
                                                                      <div className="col-6">
                                                                        <label>Base Payment Mode:</label>
                                                                        <span>{ele.paymentSummary?.paymentTransactionalDetails[0]?.paymentMethod}</span>
                                                                      </div>
                                                                      <div className="col-6">
                                                                        <label>Returnable:</label>
                                                                        <span>{returnEligbleDetail.returnable ? "true" : "false"}</span>
                                                                      </div>
                                                                      <div className="col-6">
                                                                        <label>Reason:</label>
                                                                        <span>{returnEligbleDetail.reason}</span>
                                                                      </div>
                                                                      <div className="col-6">
                                                                        <label>Refund Amount:</label>
                                                                        <span>{returnEligbleDetail.refundAmount}</span>
                                                                      </div>
                                                                    </div>
                                                                    <div className="refund_ratio px-2">
                                                                      <h4 className="mb-2">Refund Ratio</h4>
                                                                      {
                                                                        returnItemDetail?.refundRatio !== undefined && returnItemDetail?.refundRatio !== null ?
                                                                          <div className="row">
                                                                            {Object.entries(returnItemDetail?.refundRatio).map(([key, value]) => {
                                                                              return (
                                                                                <div className="col-6">
                                                                                  <label>{key}:</label>
                                                                                  <span>{value === true ? "true" : value === false ? "false" : value}</span>
                                                                                </div>
                                                                              )
                                                                            })}
                                                                          </div>
                                                                          :
                                                                          <div className="d-flex justify-content-center">No data available!</div>
                                                                      }
                                                                    </div>
                                                                    <div className="px-4">
                                                                      <label>Return Date :</label>
                                                                      <span>{this.formatDate((new Date()).toString())}</span>
                                                                    </div>
                                                                    <div className="return_reason_dropdown">
                                                                      <label>Select Reason</label>
                                                                      <select onChange={this.selectReturnReason}>
                                                                        <option readOnly>Select Reason</option>
                                                                        <option>Product doesn't fit</option>
                                                                        <option>Product is defective</option>
                                                                        <option>Product is damaged</option>
                                                                        <option>Wrong order received </option>
                                                                        <option>Any other reason</option>
                                                                      </select>
                                                                    </div>
                                                                    <div className="return_reason_dropdown">
                                                                      <label>Select Refund Mode</label>
                                                                      <select>
                                                                        <option>BTS</option>
                                                                      </select>
                                                                    </div>
                                                                    <div className="sync_button m-0 p-4">
                                                                      <button onClick={() => { this.handleReturn(ele.consignments[currentSubOrder]) }}>Update Return</button>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                              </div>

                                                              :
                                                              <p className="noData_div"> {"No Sub Order Available"} </p>
                                                            }
                                                            {/* sub order end */}
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                )
                                              })
                                              :
                                              <p className="noData_div"> {"No Data Available"} </p>

                                            }
                                          </div>
                                          :
                                          searchType === "mobId_cre" ?
                                            <div className="order_summary" id="accordion_orderbyMob">
                                              {mobileOrders.length ?
                                                mobileOrders.map((item, i) => {
                                                  return (
                                                    <div className="single_order_data" key={i}>
                                                      <div className="card-link d-flex">
                                                        <img className="px-2 order_expand right_icon" onClick={() => this.handleGetOrderList(item.orderId)} data-toggle="collapse"
                                                          href={"#" + item.orderId} src={tringleRight} alt="" />
                                                        <div className="row">
                                                          <div className="col-2">
                                                            <label className="order_label">Order Id:</label>
                                                            {item.orderId}</div>
                                                          <div className="col-2">
                                                            <label className="order_label">Date:</label>
                                                            {this.formatDate(item.orderDate)}</div>
                                                          <div className="col-2">
                                                            <label className="order_label">Mobile No:</label>
                                                            {/* {this.state.orderMobileNo} */}
                                                            {this.state.customerData?.customerPhoneNumber}
                                                          </div>
                                                          <div className="col-2">
                                                            <label className="order_label">Delivery Address:</label>
                                                            {"---"}</div>
                                                          <div className="col-2">
                                                            <label className="order_label">Order Type:</label>
                                                            {"---"}</div>
                                                          <div className="col-2">
                                                            <label className="order_label">Email: </label>
                                                            {"---"}</div>
                                                        </div>
                                                      </div>
                                                      <div id={item.orderId}
                                                        className="collapse"
                                                        data-parent="#accordion_orderbyMob">
                                                        {orderList.length ?
                                                          orderList.map((ele, i) => {
                                                            return (
                                                              <div className="order_details" key={i}>
                                                                <ul className="nav" role="tablist">
                                                                  <li className="nav-item">
                                                                    <a
                                                                      className="nav-link active"
                                                                      data-toggle="tab"
                                                                      href={"#ord" + item.orderId}
                                                                      role="tab"
                                                                      aria-controls={"ord" + item.orderId}
                                                                      aria-selected="false">Order Details</a>
                                                                  </li>
                                                                  <li className="nav-item">
                                                                    <a className="nav-link" data-toggle="tab"
                                                                      href={"#sub" + item.orderId}
                                                                      role="tab"

                                                                      aria-controls={"sub" + item.orderId}>Sub Order Details</a>
                                                                  </li>
                                                                  <li className="attch_order">
                                                                    <label htmlFor="attachOrd">Attach Order</label>
                                                                    <input name="attachOrd" type="checkbox"
                                                                      onChange={this.newHandleOminiAttachProductData}
                                                                    />
                                                                  </li>
                                                                </ul>
                                                                <div className="tab-content">
                                                                  <div className="tab-pane fade show active" id={"ord" + item.orderId} role="tabpanel" aria-labelledby={"ord" + item.orderId}>
                                                                    <div className="order_des" id="accordion_bymob_orderDescrip">
                                                                      <div className="single_order_data" >
                                                                        <div className="gen_info_head" data-toggle="collapse"
                                                                          href="#bymob_gen_info_desc" >
                                                                          <label>GENERAL INFO</label>
                                                                          <img className="right_icon" src={tringleRight} alt="" />
                                                                        </div>
                                                                        <div id="bymob_gen_info_desc" className="all_detail_div collapse"
                                                                          data-parent="#accordion_bymob_orderDescrip">
                                                                          <div className="row">
                                                                            <div className="col-6">
                                                                              <label>Oredr Id:</label>
                                                                              <span>{ele.orderId}</span>
                                                                            </div>
                                                                            <div className="col-6">
                                                                              <label>Order Date:</label>
                                                                              <span>{this.formatDate(ele.orderDate)}</span>
                                                                            </div>
                                                                            <div className="col-6">
                                                                              <label>Order Channel:</label>
                                                                              <span>{ele.orderChannel}</span>
                                                                            </div>
                                                                          </div>
                                                                          <div className="customer_detail">
                                                                            <h3>Customer Details</h3>
                                                                            <div className="row">
                                                                              <div className="col-6">
                                                                                <label>Name:</label>
                                                                                <span>{ele.customerDetails.customerName}</span>
                                                                              </div>
                                                                              <div className="col-6">
                                                                                <label>Mobile Number:</label>
                                                                                <span>{ele.customerDetails.mobileNumber}</span>
                                                                              </div>
                                                                              <div className="col-6">
                                                                                <label>Email Id:</label>
                                                                                <span>{ele.customerDetails.emailId}</span>
                                                                              </div>
                                                                            </div>
                                                                          </div>
                                                                          <div className="customer_detail">
                                                                            <h3>Order Status</h3>
                                                                            <div className="row">
                                                                              <div className="col-6">
                                                                                <label>Id:</label>
                                                                                <span>{ele.orderStatus.id}</span>
                                                                              </div>
                                                                              <div className="col-6">
                                                                                <label>Order Status:</label>
                                                                                <span>{ele.orderStatus.orderStatus}</span>
                                                                              </div>
                                                                              <div className="col-6">
                                                                                <label>Status Type:</label>
                                                                                <span>{ele.orderStatus.orderStatusType}</span>
                                                                              </div>
                                                                              <div className="col-6">
                                                                                <label>Status To Customer:</label>
                                                                                <span>{ele.orderStatus.orderStatusToCustomer}</span>
                                                                              </div>
                                                                              <div className="col-6">
                                                                                <label>Status To Oms:</label>
                                                                                <span>{ele.orderStatus.orderStatusToOms}</span>
                                                                              </div>
                                                                              <div className="col-6">
                                                                                <label>Color Code:</label>
                                                                                <span>{ele.orderStatus.colorCode}</span>
                                                                              </div>
                                                                            </div>
                                                                          </div>

                                                                          <div className="customer_detail">
                                                                            <h3>Metadata</h3>
                                                                            {ele.metadata !== undefined && ele.metadata !== null ?
                                                                              <div className="row">
                                                                                {Object.entries(ele.metadata).map(([key, value]) => {
                                                                                  return (
                                                                                    <div className="col-6">
                                                                                      <label>{this.handleSpaces(key)}:</label>
                                                                                      {(typeof (value) !== 'object' || value === null) &&
                                                                                        <span>{value === true ? "true" : value === false ? "false" : value}</span>
                                                                                      }
                                                                                    </div>
                                                                                  )
                                                                                })}
                                                                              </div>
                                                                              :
                                                                              <p className="noData_div p-1"> {"No Data Available"} </p>
                                                                            }
                                                                          </div>
                                                                          <div className="customer_detail">
                                                                            <h3>Payment Split Ratio J S O N</h3>
                                                                            <div className="row">
                                                                              <div className="col-6">
                                                                                <label>POINTES:</label>
                                                                                <span>{"Data"}</span>
                                                                              </div>
                                                                              <div className="col-6">
                                                                                <label>CARD:</label>
                                                                                <span>{"Data"}</span>
                                                                              </div>
                                                                              <div className="col-6">
                                                                                <label>VOUCHER:</label>
                                                                                <span>{"Data"}</span>
                                                                              </div>
                                                                              <div className="col-6">
                                                                                <label>COD:</label>
                                                                                <span>{"Data"}</span>
                                                                              </div>
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                      <div className="single_order_data" >
                                                                        <div className="gen_info_head" data-toggle="collapse"
                                                                          href="#byMob_pricing_detail" >
                                                                          <label>PRICING DETAILS</label>
                                                                          <img className="right_icon" src={tringleRight} alt="" />
                                                                        </div>
                                                                        <div id="byMob_pricing_detail" className="all_detail_div collapse"
                                                                          data-parent="#accordion_bymob_orderDescrip">
                                                                          <div className="row">
                                                                            <div className="col-6">
                                                                              <label>Trade SP:</label>
                                                                              <span>{ele.totalPricingDetails?.tradeSP}</span>
                                                                            </div>
                                                                            <div className="col-6">
                                                                              <label>Loyalty Used:</label>
                                                                              <span>{ele.totalPricingDetails?.loyaltyUsed}</span>
                                                                            </div>
                                                                            <div className="col-6">
                                                                              <label>Total Sgst Amount::</label>
                                                                              <span>{ele.totalPricingDetails?.totalSgstAmount}</span>
                                                                            </div>
                                                                            <div className="col-6">
                                                                              <label>NetAmount:</label>
                                                                              <span>{ele.totalPricingDetails?.netAmount}</span>
                                                                            </div>
                                                                            <div className="col-6">
                                                                              <label>Total Igst Amount:</label>
                                                                              <span>{ele.totalPricingDetails?.totalIgstAmount}</span>
                                                                            </div>
                                                                            <div className="col-6">
                                                                              <label>Total SP:</label>
                                                                              <span>{ele.totalPricingDetails?.totalSP}</span>
                                                                            </div>
                                                                            <div className="col-6">
                                                                              <label>Total Amount With Shipping:</label>
                                                                              <span>{ele.totalPricingDetails?.totalAmountWithShipping}</span>
                                                                            </div>
                                                                            <div className="col-6">
                                                                              <label>Total Tax:</label>
                                                                              <span>{ele.totalPricingDetails?.totalTax}</span>
                                                                            </div>
                                                                            <div className="col-6">
                                                                              <label>Total Cess Amount:</label>
                                                                              <span>{ele.totalPricingDetails?.totalCessAmount}</span>
                                                                            </div>
                                                                            <div className="col-6">
                                                                              <label>Total Utgst Amount:</label>
                                                                              <span>{ele.totalPricingDetails?.totalUtgstAmount}</span>
                                                                            </div>
                                                                            <div className="col-6">
                                                                              <label>Total Cgst Amount:</label>
                                                                              <span>{ele.totalPricingDetails?.totalCgstAmount}</span>
                                                                            </div>
                                                                            <div className="col-6">
                                                                              <label>Shipping Charge:</label>
                                                                              <span>{ele.totalPricingDetails?.shippingCharge}</span>
                                                                            </div>
                                                                          </div>
                                                                          <div className="customer_detail">
                                                                            <h3>Total NNNow Cash Details</h3>
                                                                            <div className="row">
                                                                              <div className="col-6">
                                                                                <label>Product NNNow Cash:</label>
                                                                                <span>{ele.totalPricingDetails?.totalNNNowCashDetails?.productNNNowCash}</span>
                                                                              </div>
                                                                              <div className="col-6">
                                                                                <label>Cart NNNow Cash:</label>
                                                                                <span>{ele.totalPricingDetails?.totalNNNowCashDetails?.cartNNNowCash}</span>
                                                                              </div>
                                                                              <div className="col-6">
                                                                                <label>Total NNNow Cash:</label>
                                                                                <span>{ele.totalPricingDetails?.totalNNNowCashDetails?.totalNNNowCash}</span>
                                                                              </div>
                                                                            </div>
                                                                          </div>
                                                                          <div className="customer_detail">
                                                                            <h3>Total Discount Details</h3>
                                                                            <div className="row">
                                                                              <div className="col-6">
                                                                                <label>Product Discount:</label>
                                                                                <span>{ele.totalPricingDetails?.totalDiscountDetails?.productDiscount}</span>
                                                                              </div>
                                                                              <div className="col-6">
                                                                                <label>Total Discount:</label>
                                                                                <span>{ele.totalPricingDetails?.totalDiscountDetails?.totalDiscount}</span>
                                                                              </div>
                                                                            </div>
                                                                          </div>
                                                                          <div className="customer_detail">
                                                                            <h3>Payment Summary</h3>
                                                                            <div className="row">
                                                                              <div className="col-6">
                                                                                <label>Paid_at_source:</label>
                                                                                <span>{ele.paymentSummary?.paid_at_source}</span>
                                                                              </div>
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                  <div className="tab-pane fade" id={"sub" + item.orderId} role="tabpanel" aria-labelledby={"sub" + item.orderId}>
                                                                    {ele.consignments.length !== 0 ?
                                                                      <div>
                                                                        {ele.consignments.length > 0 &&
                                                                          <div className="subOrder_pagination">
                                                                            <label>Showing {currentSubOrder + 1} of {ele.consignments.length}</label>
                                                                            <button disabled={currentSubOrder === 0 ? true : false} onClick={() => { this.handleSubOderPagination("prev") }}>❮</button>
                                                                            <button disabled={currentSubOrder === ele.consignments.length - 1 ? true : false} onClick={() => { this.handleSubOderPagination("next") }}>❯</button>
                                                                          </div>
                                                                        }
                                                                        {/* {subOrderShow === 'defaultShow' ? */}
                                                                        <div className={subOrderShow === 'defaultShow' ? "order_des" : 'd-none'} id="accordion_byMobsuborderDes">
                                                                          <div className="single_order_data" >
                                                                            <div className="gen_info_head" data-toggle="collapse"
                                                                              href="#byMob_gen_info_subDesc" >
                                                                              <label>GENERAL INFO</label>
                                                                              <img className="right_icon" src={tringleRight} alt="" />
                                                                            </div>
                                                                            <div id="byMob_gen_info_subDesc" className="all_detail_div collapse"
                                                                              data-parent="#accordion_byMobsuborderDes">
                                                                              <div className="row">
                                                                                <div className="col-6">
                                                                                  <label>Consignment Id:</label>
                                                                                  <span>{ele.consignments[currentSubOrder].consignmentId}</span>
                                                                                </div>
                                                                                <div className="col-6">
                                                                                  <label>Item Count:</label>
                                                                                  <span>{ele.consignments[currentSubOrder]?.itemCount}</span>
                                                                                </div>
                                                                                <div className="col-6">
                                                                                  <label>Sla End Time:</label>
                                                                                  <span>{ele.consignments[currentSubOrder]?.slaEndTime}</span>
                                                                                </div>
                                                                              </div>
                                                                              <div className="customer_detail">
                                                                                <h3>Consignment States DTO</h3>
                                                                                <div className="row">
                                                                                  <div className="col-6">
                                                                                    <label>Id:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.consignmentStatesDTO?.id}</span>
                                                                                  </div>
                                                                                  <div className="col-6">
                                                                                    <label>Name:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.consignmentStatesDTO?.name}</span>
                                                                                  </div>
                                                                                  <div className="col-6">
                                                                                    <label>Type:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.consignmentStatesDTO?.type}</span>
                                                                                  </div>
                                                                                  <div className="col-6">
                                                                                    <label>Status To Customer:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.consignmentStatesDTO?.statusToCustomer}</span>
                                                                                  </div>
                                                                                  <div className="col-6">
                                                                                    <label>Status To Oms:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.consignmentStatesDTO?.statusToOms}</span>
                                                                                  </div>
                                                                                  {/* ps: I know color is given to show consignmentstate NAME :) */}
                                                                                  <div className="col-6">
                                                                                    <label>Color Code:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.consignmentStatesDTO?.colorCode}</span>
                                                                                  </div>
                                                                                  <div className="col-6">
                                                                                    <label>Processing Sequence:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.consignmentStatesDTO?.processingSequence}</span>
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                              <div className="customer_detail">
                                                                                <h3>Address Details</h3>
                                                                                <div className="row">
                                                                                  <div className="col-6">
                                                                                    <label>City:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.addressDetails?.city}</span>
                                                                                  </div>
                                                                                  <div className="col-6">
                                                                                    <label>State:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.addressDetails?.state}</span>
                                                                                  </div>
                                                                                  <div className="col-6">
                                                                                    <label>Country:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.addressDetails?.country}</span>
                                                                                  </div>
                                                                                  <div className="col-6">
                                                                                    <label>Pincode:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.addressDetails?.pincode}</span>
                                                                                  </div>
                                                                                  <div className="col-6">
                                                                                    <label>Mobile Number:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.addressDetails?.mobileNumber}</span>
                                                                                  </div>
                                                                                  <div className="col-6">
                                                                                    <label>Mobile Number Country Code:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.addressDetails?.mobileNumberCountryCallingCode}</span>
                                                                                  </div>
                                                                                  <div className="col-6">
                                                                                    <label>Address_line1:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.addressDetails?.address_line1}</span>
                                                                                  </div>
                                                                                  <div className="col-6">
                                                                                    <label>Full Address:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.addressDetails?.fullAddress}</span>
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                              <div className="customer_detail">
                                                                                <h3>Ff Type</h3>
                                                                                <div className="row">
                                                                                  <div className="col-6">
                                                                                    <label>Ff Type:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.ffType?.ffType}</span>
                                                                                  </div>
                                                                                  <div className="col-6">
                                                                                    <label>Type:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.ffType?.type}</span>
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                              <div className="customer_detail">
                                                                                <h3>Logistics Details</h3>
                                                                                <div className="row">
                                                                                  <div className="col-6">
                                                                                    <label>Airway Bill Number:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.logisticsDetails?.airwayBillNumber}</span>
                                                                                  </div>
                                                                                  <div className="col-6">
                                                                                    <label>Tracking Link:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.logisticsDetails?.trackingLink}</span>
                                                                                  </div>
                                                                                  <div className="col-6">
                                                                                    <label>Promise Date:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.logisticsDetails?.promiseDate}</span>
                                                                                  </div>
                                                                                  <div className="col-6">
                                                                                    <label>Logistics Partner:</label>
                                                                                    {/* <span>key not there</span> */}
                                                                                    <span>{ele.consignments[currentSubOrder]?.logisticsDetails?.logisticsPartner}</span>
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                              <div className="customer_detail">
                                                                                <h3>Ff Center</h3>
                                                                                <div className="row">
                                                                                  <div className="col-6">
                                                                                    <label>Fc Id:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.ffCenter?.fcid}</span>
                                                                                  </div>
                                                                                  <div className="col-6">
                                                                                    <label>Fc Name:</label>
                                                                                    <span>{ele.consignments[currentSubOrder]?.ffCenter?.fcName}</span>
                                                                                  </div>
                                                                                </div>
                                                                              </div>
                                                                            </div>
                                                                          </div>
                                                                          <div className="single_order_data" >
                                                                            <div className="gen_info_head" data-toggle="collapse"
                                                                              href="#byMobsub_order_detail" >
                                                                              <label>SUB ORDER</label>
                                                                              <img className="right_icon" src={tringleRight} alt="" />
                                                                            </div>
                                                                            <div id="byMobsub_order_detail" className="all_detail_div collapse"
                                                                              data-parent="#accordion_byMobsuborderDes">
                                                                              <div className="subOrder_items" id="accordion_byMob_suborderItems">
                                                                                {ele.consignments[currentSubOrder]?.items.length !== 0 &&
                                                                                  ele.consignments[currentSubOrder].items.map((item, index) => {
                                                                                    return (
                                                                                      <div className="subOrder_item" key={index}>
                                                                                        <input type="checkbox" className="ml-1" checked={selectedOminiItem.some(val => val.itemID === item.itemId)}
                                                                                          onChange={(e) => this.handleOminiSelectedItem(e, ele.consignments[currentSubOrder]?.consignmentId, item)} />
                                                                                        <label className="item_id_div" data-toggle="collapse" href={"#sub_order_itemDetail" + index}
                                                                                        > {item.itemId + " (" + item.product?.description + ")"}</label>
                                                                                        <div className="collapse" id={"sub_order_itemDetail" + index} data-parent="#accordion_byMob_suborderItems">
                                                                                          <div className="sync_button mb-1">
                                                                                            <button onClick={() => this.handleGetOrderList(ele.orderId)}><img src={white_sync} alt="" />Sync ticket fields</button>
                                                                                          </div>
                                                                                          <div className="row">
                                                                                            <div className="col-6">
                                                                                              <label>Item Id:</label>
                                                                                              <span>{item.itemId}</span>
                                                                                            </div>
                                                                                            <div className="col-6">
                                                                                              <label className="check_eleg" onClick={() => this.checkCancelReturEligbile("cancellation", item.itemId)}>Eligbile For Cancellation:</label>
                                                                                              <span>{item.eligibleForCancellation ? "true" : "false"}</span>
                                                                                            </div>
                                                                                            <div className="col-6">
                                                                                              <label className="check_eleg" onClick={() => this.checkCancelReturEligbile("returns", item.itemId)}>Eligbile For Return:</label>
                                                                                              <span>{item.eligibleForReturn ? "true" : "false"}</span>
                                                                                            </div>
                                                                                            <div className="col-6">
                                                                                              <label>Return Id:</label>
                                                                                              <span>{item.returnId}</span>
                                                                                            </div>
                                                                                            <div className="col-6">
                                                                                              <label>Return Status:</label>
                                                                                              <span>{item.returnStatus}</span>
                                                                                            </div>
                                                                                            <div className="col-6">
                                                                                              <label>Refund Mode:</label>
                                                                                              <span>{item.refundMode}</span>
                                                                                            </div>
                                                                                            <div className="col-6">
                                                                                              <label>Neft Id Linked:</label>
                                                                                              <span>{item.neftIdLinked ? "true" : "false"}</span>
                                                                                            </div>
                                                                                            <div className="col-6">
                                                                                              <label>Refund Amount:</label>
                                                                                              <span>{item.refundAmount}</span>
                                                                                            </div>
                                                                                            <div className="col-6">
                                                                                              <label>Refund Status:</label>
                                                                                              <span>{item.refundStatus}</span>
                                                                                            </div>
                                                                                            <div className="col-6">
                                                                                              <label>Ref No:</label>
                                                                                              <span>{item.refundRefNumber}</span>
                                                                                            </div>
                                                                                          </div>
                                                                                          <div className="row cancel_return">
                                                                                            <div className="col-4">
                                                                                              <button disabled={!item.eligibleForCancellation} className={item.eligibleForCancellation ? "check_eleg" : "check_eleg disable"} onClick={() => { this.getCancelData(item, "cancelItem") }} >Cancel Item</button>
                                                                                            </div>
                                                                                            <div className="col-4">
                                                                                              <button className="check_eleg" onClick={() => { this.getItemHistory(item.orderItemHistory, "itemhistory") }}>Item History</button>
                                                                                            </div>
                                                                                            <div className="col-4">
                                                                                              <button disabled={!item.eligibleForReturn} className={item.eligibleForReturn ? "check_eleg" : "check_eleg disable"} onClick={() => { this.getReturnData(item, "returnItem") }} >Return Item</button>
                                                                                            </div>
                                                                                          </div>
                                                                                          <div className="customer_detail">
                                                                                            <h3>Metadata</h3>
                                                                                            {item.metadata !== null ?
                                                                                              <div className="row">
                                                                                                {Object.entries(item.metadata).map(([key, value]) => {
                                                                                                  return (
                                                                                                    <div className="col-6">
                                                                                                      <label>{key}:</label>
                                                                                                      <span>{value === true ? "true" : value === false ? "false" : value}</span>
                                                                                                    </div>
                                                                                                  )
                                                                                                })}
                                                                                              </div>
                                                                                              :
                                                                                              <div className="d-flex justify-content-center">No data available</div>
                                                                                            }
                                                                                          </div>
                                                                                          <div className="customer_detail">
                                                                                            <h3>Return Metadata</h3>
                                                                                            {item.refundMode !== null ?
                                                                                              <div className="row">
                                                                                                {Object.entries(item.metadata).map(([key, value]) => {
                                                                                                  return (
                                                                                                    <div className="col-6">
                                                                                                      <label>{key}:</label>
                                                                                                      <span>{value === true ? "true" : value === false ? "false" : value}</span>
                                                                                                    </div>
                                                                                                  )
                                                                                                })}
                                                                                              </div>
                                                                                              :
                                                                                              <div className="d-flex justify-content-center">No data available!</div>
                                                                                            }
                                                                                          </div>
                                                                                          <div className="customer_detail">
                                                                                            <h3>Product</h3>
                                                                                            {item.product !== null ?
                                                                                              <div className="row">
                                                                                                {Object.entries(item.product).map(([key, value]) => {
                                                                                                  return (
                                                                                                    <div className="col-6">
                                                                                                      <label>{key}:</label>
                                                                                                      <span>{value === true ? "true" : value === false ? "false" : value}</span>
                                                                                                    </div>
                                                                                                  )
                                                                                                })}
                                                                                              </div>
                                                                                              :
                                                                                              <div className="d-flex justify-content-center">No data available!</div>
                                                                                            }
                                                                                          </div>
                                                                                          <div className="customer_detail">
                                                                                            <h3>Item Status</h3>
                                                                                            {item.itemStatus !== null ?
                                                                                              <div className="row">
                                                                                                {Object.entries(item.itemStatus).map(([key, value]) => {
                                                                                                  return (
                                                                                                    <div className="col-6">
                                                                                                      <label>{key}:</label>
                                                                                                      <span>{value === true ? "true" : value === false ? "false" : value}</span>
                                                                                                    </div>
                                                                                                  )
                                                                                                })}
                                                                                              </div>
                                                                                              :
                                                                                              <div className="d-flex justify-content-center">No data available!</div>
                                                                                            }
                                                                                          </div>
                                                                                          <div className="customer_detail">
                                                                                            <h3>Return Logistics Details</h3>
                                                                                            {item.returnLogisticsDetails !== null ?
                                                                                              <div className="row">
                                                                                                {Object.entries(item.returnLogisticsDetails).map(([key, value]) => {
                                                                                                  return (
                                                                                                    <div className="col-6">
                                                                                                      <label>{key}:</label>
                                                                                                      <span>{value === true ? "true" : value === false ? "false" : value}</span>
                                                                                                    </div>
                                                                                                  )
                                                                                                })}
                                                                                              </div>
                                                                                              :
                                                                                              <div className="d-flex justify-content-center">No data available!</div>
                                                                                            }
                                                                                          </div>
                                                                                          <div className="customer_detail">
                                                                                            <h3 className="mb-2">Refund Ratio</h3>
                                                                                            {item.refundRatio !== null ?
                                                                                              <div className="row">
                                                                                                {Object.entries(item.refundRatio).map(([key, value]) => {
                                                                                                  return (
                                                                                                    <div className="col-6">
                                                                                                      <label>{key}:</label>
                                                                                                      <span>{value === true ? "true" : value === false ? "false" : value}</span>
                                                                                                    </div>
                                                                                                  )
                                                                                                })}
                                                                                              </div>
                                                                                              :
                                                                                              <div className="d-flex justify-content-center">No data available!</div>
                                                                                            }
                                                                                          </div>
                                                                                          <div className="customer_detail">
                                                                                            <h3>Item Pricing Details</h3>
                                                                                            {item.itemPricingDetails !== null ?
                                                                                              <div className="row">
                                                                                                {Object.entries(item.itemPricingDetails).map(([key, value]) => {
                                                                                                  // value === null&& console.log(typeof(value));
                                                                                                  return (
                                                                                                    (typeof (value) !== 'object' || value === null) &&
                                                                                                    <div className="col-6">
                                                                                                      <label>{key}:</label>
                                                                                                      <span>{value === true ? "true" : value === false ? "false" : value}</span>
                                                                                                    </div>
                                                                                                  )
                                                                                                })}
                                                                                              </div>
                                                                                              :
                                                                                              <div className="d-flex justify-content-center">No data available!</div>
                                                                                            }
                                                                                          </div>
                                                                                        </div>
                                                                                      </div>
                                                                                    )
                                                                                  })}

                                                                              </div>

                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                        <div className={subOrderShow === "cancellation" ? "all_detail_div refund_cancel_div" : 'd-none'}>
                                                                          <button className="back_button" onClick={() => { this.getDefaultSubOrderView("defaultShow") }}>
                                                                            <img src={blueLeftArrow} alt="" />back</button>
                                                                          <div className="cancel_refund_div">
                                                                            <h3>Cancellation Eligibility</h3>
                                                                            <div className="row align-items-baseline">
                                                                              <div className="col-4">
                                                                                <label>Cancellable:</label>
                                                                                <span>{cancelEligbleDetail.cancellable ? "true" : "false"}</span>
                                                                              </div>
                                                                              <div className="col-8">
                                                                                <label>Reason:</label>
                                                                                <span>{cancelEligbleDetail.reason}</span>
                                                                              </div>
                                                                            </div>
                                                                            <div className="refund_ratio p-3">
                                                                              <h4 className="mb-2">Refund Ratio</h4>
                                                                              <div className="d-flex justify-content-center">No Record Found...!</div>
                                                                            </div>
                                                                          </div>
                                                                        </div>

                                                                        <div className={subOrderShow === "returns" ? "all_detail_div refund_cancel_div" : 'd-none'}>
                                                                          <button className="back_button" onClick={() => { this.getDefaultSubOrderView("defaultShow") }}>
                                                                            <img src={blueLeftArrow} alt="" />back</button>
                                                                          <div className="cancel_refund_div">
                                                                            <h3>Return Eligibility</h3>
                                                                            <div className="row align-items-baseline">
                                                                              <div className="col-4">
                                                                                <label>Returnable:</label>
                                                                                <span>{returnEligbleDetail.returnable ? "true" : "false"}</span>
                                                                              </div>
                                                                              <div className="col-8">
                                                                                <label>Reason:</label>
                                                                                <span>{returnEligbleDetail.reason}</span>
                                                                              </div>
                                                                            </div>
                                                                            <div className="refund_ratio px-2">
                                                                              <h4 className="mb-2">Refund Ratio</h4>
                                                                              <div className="d-flex justify-content-center">No Record Found...!</div>
                                                                            </div>
                                                                          </div>
                                                                        </div>

                                                                        <div className={subOrderShow === 'itemhistory' ? "item_history_div" : "d-none"}>
                                                                          <button className="back_button" onClick={() => { this.getDefaultSubOrderView("defaultShow") }}  >
                                                                            <img src={blueLeftArrow} alt="" />back</button>
                                                                          <div className="item_history_map">
                                                                            {itemOrderHistory.map((data, ind) => {
                                                                              return (
                                                                                <div className="history_card" >
                                                                                  <div className="history_detail">
                                                                                    {Object.entries(data).map(([key, value]) => {
                                                                                      return (
                                                                                        <div className="d-flex pb-1">
                                                                                          <label>{this.handleSpaces(key)}: </label>
                                                                                          <span>{value === null ? '---' : value}</span>
                                                                                        </div>
                                                                                      )
                                                                                    })}
                                                                                  </div>
                                                                                </div>
                                                                              )
                                                                            })}
                                                                          </div>
                                                                        </div>
                                                                        <div className={subOrderShow === 'cancelItem' ? "all_detail_div refund_cancel_div" : "d-none"}>
                                                                          <button className="back_button" onClick={() => { this.getDefaultSubOrderView("defaultShow") }}  >
                                                                            <img src={blueLeftArrow} alt="" />back</button>
                                                                          <div className="cancel_refund_div">
                                                                            <h3>Cancel Item</h3>

                                                                            <div className="px-4">
                                                                              <label>Cancel Date :</label>
                                                                              <span>{this.formatDate((new Date()).toString())}</span>
                                                                            </div>
                                                                            <div className="return_reason_dropdown">
                                                                              <label>Select Reason</label>
                                                                              <select onChange={this.selectCancelReason}>
                                                                                <option readOnly>Select Reason</option>
                                                                                <option>Delivery timelines not as expected</option>
                                                                                <option>Price is high</option>
                                                                                <option>Wrong order placed</option>
                                                                                <option>Will buy locally</option>
                                                                                <option>Change of mind</option>
                                                                                <option>Delay in Delivery</option>
                                                                              </select>
                                                                            </div>

                                                                            <div className="sync_button m-0 p-4">
                                                                              <button onClick={this.handleCancel}>Update Cancel</button>
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                        <div className={subOrderShow === 'returnItem' ? "all_detail_div refund_cancel_div" : "d-none"}>
                                                                          <button className="back_button" onClick={() => { this.getDefaultSubOrderView("defaultShow") }}  >
                                                                            <img src={blueLeftArrow} alt="" />back</button>
                                                                          <div className="cancel_refund_div">
                                                                            <h3>Return Item</h3>
                                                                            <div className="row align-items-baseline">
                                                                              <div className="col-6">
                                                                                <label>Sub Order Id:</label>
                                                                                <span>{returnItemDetail?.itemId}</span>
                                                                              </div>
                                                                              <div className="col-6">
                                                                                <label>Product Code:</label>
                                                                                <span>{returnItemDetail?.product?.eanCode}</span>
                                                                              </div>
                                                                              <div className="col-6">
                                                                                <label>Product Name:</label>
                                                                                <span>{returnItemDetail?.product?.description}</span>
                                                                              </div>
                                                                              <div className="col-6">
                                                                                <label>Invoice Date:</label>
                                                                                <span>{"---"}</span>
                                                                              </div>
                                                                              <div className="col-6">
                                                                                <label>Base Payment Mode:</label>
                                                                                <span>{ele.paymentSummary?.paymentTransactionalDetails[0]?.paymentMethod}</span>
                                                                              </div>
                                                                              <div className="col-6">
                                                                                <label>Returnable:</label>
                                                                                <span>{returnEligbleDetail.returnable ? "true" : "false"}</span>
                                                                              </div>
                                                                              <div className="col-6">
                                                                                <label>Reason:</label>
                                                                                <span>{returnEligbleDetail.reason}</span>
                                                                              </div>
                                                                              <div className="col-6">
                                                                                <label>Refund Amount:</label>
                                                                                <span>{returnEligbleDetail.refundAmount}</span>
                                                                              </div>
                                                                            </div>
                                                                            <div className="refund_ratio px-2">
                                                                              <h4 className="mb-2">Refund Ratio</h4>
                                                                              {
                                                                                returnItemDetail?.refundRatio !== undefined && returnItemDetail?.refundRatio !== null ?
                                                                                  <div className="row">
                                                                                    {Object.entries(returnItemDetail?.refundRatio).map(([key, value]) => {
                                                                                      return (
                                                                                        <div className="col-6">
                                                                                          <label>{key}:</label>
                                                                                          <span>{value === true ? "true" : value === false ? "false" : value}</span>
                                                                                        </div>
                                                                                      )
                                                                                    })}
                                                                                  </div>
                                                                                  :
                                                                                  <div className="d-flex justify-content-center">No data available!</div>
                                                                              }
                                                                            </div>
                                                                            <div className="px-4">
                                                                              <label>Return Date :</label>
                                                                              <span>{this.formatDate((new Date()).toString())}</span>
                                                                            </div>
                                                                            <div className="return_reason_dropdown">
                                                                              <label>Select Reason</label>
                                                                              <select onChange={this.selectReturnReason}>
                                                                                <option readOnly>Select Reason</option>
                                                                                <option>Product doesn't fit</option>
                                                                                <option>Product is defective</option>
                                                                                <option>Product is damaged</option>
                                                                                <option>Wrong order received </option>
                                                                                <option>Any other reason</option>
                                                                              </select>
                                                                            </div>
                                                                            <div className="return_reason_dropdown">
                                                                              <label>Select Refund Mode</label>
                                                                              <select>
                                                                                <option>BTS</option>
                                                                              </select>
                                                                            </div>
                                                                            <div className="sync_button m-0 p-4">
                                                                              <button onClick={() => { this.handleReturn(ele.consignments[currentSubOrder]) }}>Update Return</button>
                                                                            </div>
                                                                          </div>
                                                                        </div>
                                                                      </div>

                                                                      :
                                                                      <p className="noData_div"> {"No Sub Order Available"} </p>
                                                                    }
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            )
                                                          })
                                                          : <p className="noData_div p-2"> {"No Data Available"} </p>
                                                        }
                                                      </div>
                                                    </div>
                                                  )
                                                })
                                                :
                                                <p className="noData_div p-3"> {"No Data Available"} </p>
                                              }
                                            </div>
                                            : null
                                      }
                                    </>
                                  }
                                </div>
                              }
                            </div>


                          </div>
                          :
                          <TicketSystemOrder
                            custDetails={CustomerId}
                            AttachOrder={this.handleCustomerAttachamentStatus}
                            getParentOrderData={this.handleGetOrderId}
                            getItemOrderData={this.handleGetItemData}
                            purchaseMode={this.state.selectedChannelOfPurchase}
                            ticket_IDS={this.state.ticketDetailID}
                            ShowOderdData={this.state.showOrderDetails}
                            parentCallBackFuncation={this.parentCallBackFuncation}
                            message=""
                            AddManuallyData={false}
                            searchHide={false}
                          />
                      }
                    </div>

                    {/* Credit Note Implementation */}
                    <div
                      className="tab-pane fade"
                      id="creditNote_tab"
                      role="tabpanel"
                      aria-labelledby="creditNote_tab"
                      style={{ height: "100%" }}
                    >
                      <div className="credit_note_div ticketPage_order">
                        <div className="row m-0">
                          {showCreditNote === false ?
                            <div className="col-8">
                              <div className="search_div">
                                <h3>Search By</h3>
                                <div className="d-flex justify-content-between">
                                  <div className="serch_by_div">
                                    <input id="credit_note" defaultChecked type="radio" checked={searchType === "credit_note"} name='search_type_credit' onChange={this.handleSearchOrderType} />
                                    <label htmlFor="credit_note">Credit Note Id</label>
                                  </div>
                                  <div className="serch_by_div">
                                    <input id="mobile_credit" type="radio" checked={searchType === "mobile_credit"} name='search_type_credit' onChange={this.handleSearchOrderType} />
                                    <label htmlFor="mobile_credit">Mobile</label>
                                  </div>
                                </div>
                                {searchType === 'credit_note' ?
                                  <div className="order_input">
                                    <label>Credit Note Id</label>
                                    <input className="w-100" placeholder="Enter Credit Note Id" type="text"
                                      onChange={this.getCreditNoteOrderId} value={creditNoteOrderId} />
                                  </div>
                                  :
                                  searchType === 'mobile_credit' ?
                                    <div className="order_input">
                                      <label>Mobile</label>
                                      <input maxLength={10} className="w-100" placeholder="Enter Mobile Number" type="number"
                                        onChange={this.getCreditNoteMobile} value={mobileNoCreditNote} />
                                      <p className="mobile_remark">*Enter 10 digit mobile number</p>
                                    </div>
                                    : null
                                }
                                <div className="seach_button">
                                  <button disabled={isOrderSearchCreditLoading}
                                    onClick={searchType === "credit_note" ? this.handleCheckCreditNoteList : this.handleGetCreditNoteList}>
                                    {isOrderSearchCreditLoading ? <img
                                      src={loaderGif}
                                      alt="loading"
                                      style={{ width: "20px" }}
                                    /> : "Search"}</button>
                                </div>
                              </div>
                            </div>
                            :
                            <div className="col-12">
                              <button className="back_button" onClick={() => { this.handleShowCreditNote(false) }}>
                                <img src={blueLeftArrow} alt="" /> back to search</button>
                              <div>
                                {creditNotes.length > 0 &&
                                  <div className="subOrder_pagination">
                                    <label>Showing {currentCreditNote + 1} of {creditNotes.length}</label>
                                    <button disabled={currentCreditNote === 0 ? true : false} onClick={() => { this.handleCreditNoteMobilePagination("prev") }}>❮</button>
                                    <button disabled={currentCreditNote === creditNotes.length - 1 ? true : false} onClick={() => { this.handleCreditNoteMobilePagination("next") }}>❯</button>
                                  </div>
                                }
                                {isExtendCancel === "default" &&
                                  <div className="extend_cancel">
                                    <button className={creditNotes?.length === 0 ? "btnClickDisabled" : null} disabled={creditNotes?.length === 0} onClick={() => { this.handleExtendCancel("extend") }}>Extend Validity<img src={edit_white} alt="" /></button>
                                    <button className={creditNotes?.length === 0 ? "btnClickDisabled" : null} disabled={creditNotes?.length === 0} onClick={() => { this.handleExtendCancel("cancel") }}>Cancel Credit Note<img src={cross_circle_white} /></button>
                                  </div>
                                }
                                {isExtendCancel === "default" ?
                                  <div className="creditnot_description" id="accordion_creditNote">
                                    <div className="single_order_data" >
                                      <div className="gen_info_head" data-toggle="collapse"
                                        href="#gen_info_creditNote" >
                                        <label>GENERAL INFO</label>
                                        <img className="right_icon" src={tringleRight} alt="" />
                                      </div>
                                      <div id="gen_info_creditNote" className="all_detail_div"
                                        data-parent="#accordion_creditNote">
                                        <div className="row m-0">
                                          {
                                            creditNotes.length !== 0 ?
                                              Object.entries(creditNotes[currentCreditNote]).map(([key, value]) => {
                                                return (
                                                  // (typeof (value) !== 'object' || value === null) &&
                                                  <div className="col-6">
                                                    <label>{key}:</label>
                                                    <span>{value === true ? "true" : value === false ? "false" : value}</span>
                                                  </div>
                                                )
                                              })
                                              :
                                              <p className="noData_div justify-content-center p-0 w-100"> {"No Data Available"} </p>
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  :
                                  isExtendCancel === "extend" ?
                                    <div className="extend_div">
                                      <button className="back_button" onClick={() => { this.handleExtendCancel("default") }}>
                                        <img src={blueLeftArrow} alt="" />back</button>
                                      <div className="exted_credit">
                                        <h3>Extend Credit Note</h3>
                                        <div className="credit_input">
                                          <label>Coupon Code:</label>
                                          <input readOnly type="text" value={creditNotes[currentCreditNote]?.couponCode} />
                                        </div>
                                        <div className="credit_input">
                                          <label>No Of Days To Extend:</label>
                                          <input type="number" onChange={this.handleNumberOfDaysExtand} value={extedDays} />
                                        </div>
                                        <div className="credit_input">
                                          <label>Reason For Extention:</label>
                                          <textarea placeholder="Enter your reason" onChange={this.handleExtandReason} value={extandReason} />

                                        </div>
                                        <div className="sync_button m-0">
                                          <button disabled={extedDays > 0 && extandReason !== "" ? false : true} className="extend_button" onClick={this.showExtendConfirm}>Extend Validity</button>
                                        </div>
                                        <Modal
                                          open={this.state.showExtendCredit}
                                          classNames={{ modal: "creditNoteModal" }}
                                          onClose={this.showExtendConfirm}
                                          // modalId="profile-details-error"
                                          overlayId="logout-ovrly"
                                        >
                                          <div className="credit_note_confirm">

                                            <label>Are you sure you want to extend validity</label>
                                            <div className="confirm_buttons">
                                              <button className="cancel_btn" onClick={this.showExtendConfirm}>Cancel</button>
                                              <button onClick={() => { this.confirmExtand(creditNotes[currentCreditNote]?.couponCode) }}>Submit</button>
                                            </div>
                                          </div>
                                        </Modal>
                                      </div>
                                    </div>
                                    :
                                    isExtendCancel === "cancel" ?
                                      <div className="cancel_credit_div">
                                        <button className="back_button" onClick={() => { this.handleExtendCancel("default") }}>
                                          <img src={blueLeftArrow} alt="" />back</button>
                                        <div className="exted_credit">
                                          <h3>Cancel Credit Note</h3>
                                          <div className="credit_input">
                                            <label>Coupon Code</label>
                                            <input type="text" readOnly value={creditNotes[currentCreditNote]?.couponCode} />
                                          </div>
                                          <div className="credit_input">
                                            <label>Cancel Reference Number</label>
                                            <input type="number" readOnly value={creditNotes[currentCreditNote]?.couponCode.split('R')[1]} />
                                          </div>
                                          <div className="credit_input">
                                            <label>Reason For Cancellation</label>
                                            <textarea placeholder="Enter your reason" onChange={this.handleCancelExtandReason} value={cancelExtandReason} />
                                          </div>
                                          <div className="sync_button m-0">
                                            <button disabled={cancelExtandReason !== "" ? false : true} className="extend_button" onClick={this.showCancelCreditConfirm}>Cancel Credit Note</button>
                                          </div>
                                          <Modal
                                            open={this.state.showCancelCredit}
                                            classNames={{ modal: "creditNoteModal" }}
                                            onClose={this.showCancelCreditConfirm}
                                            // modalId="profile-details-error"
                                            overlayId="logout-ovrly"
                                          >
                                            <div className="credit_note_confirm">

                                              <label>Are you sure you want to cancel credit note</label>
                                              <div className="confirm_buttons">
                                                <button className="cancel_btn" onClick={this.showCancelCreditConfirm}>Cancel</button>
                                                <button onClick={() => { this.cancelExtand(creditNotes[currentCreditNote]?.couponCode) }}>Submit</button>
                                              </div>
                                            </div>
                                          </Modal>
                                        </div>
                                      </div>
                                      : null
                                }
                              </div>

                            </div>
                          }
                        </div>
                      </div>
                    </div>
                    {/* CC AVENUE */}
                    <div className="tab-pane fade" id="cc_avenue_tab" role="tabpanel" aria-labelledby="cc_avenue_tab">
                      <div className="cc_avenue_div mt-2">
                        <div className="row m-0">
                          {showCCAv === false ?
                            <div className="col-8">
                              <div className="search_div">

                                <div className="d-flex justify-content-between">
                                  <div className="serch_by_div">
                                    <input id="cc_OrderId" defaultChecked type="radio" checked={ccAve_searchType === 'cc_OrderId'} name='search_type_cc' onChange={this.handleSearchCCAvenueType} />
                                    <label htmlFor="cc_OrderId">Order Id</label>
                                  </div>
                                  <div className="serch_by_div">
                                    <input id="cc_MobId" type="radio" name='search_type_cc' checked={ccAve_searchType === 'cc_MobId'} onChange={this.handleSearchCCAvenueType} />
                                    <label htmlFor="cc_MobId">Mobile</label>
                                  </div>
                                </div>
                                {ccAve_searchType === 'cc_OrderId' ?
                                  <div className="order_input">
                                    <label>Order Id</label>
                                    <input className="w-100" placeholder="Enter Order Id" type="text" value={ccAvenueTobeSearched} onChange={this.handleSetCCAveID} />
                                  </div>
                                  :
                                  ccAve_searchType === 'cc_MobId' ?
                                    <div className="order_input">
                                      <label>Mobile</label>
                                      <input maxLength={10} className="w-100" placeholder="Enter Mobile Number" type="number"
                                        onChange={this.getCCAveMobileNo}
                                        value={ccAve_mobileNOtoSearch}
                                        // value={this.state.customerData?.customerPhoneNumber?.length > 10 ?
                                        //   this.state.customerData?.customerPhoneNumber.split(/91(.*)/s)[1] : this.state.customerData?.customerPhoneNumber}
                                        readOnly
                                      />
                                      <p className="mobile_remark">*Enter 10 digit mobile number</p>
                                    </div>
                                    : null
                                }
                                <div className="seach_button">
                                  <button disabled={isCCAvenueSearchLoading} onClick={ccAve_searchType === "cc_OrderId" ? () => this.handleGetCCAvenueOrder("") : this.getListOfCCAvenueMobile}>
                                    {isCCAvenueSearchLoading ? <img
                                      src={loaderGif}
                                      alt="loading"
                                      style={{ width: "20px" }}
                                    /> :
                                      "Search"}</button>
                                </div>
                              </div>
                            </div>
                            :
                            <div className="col-12">
                              <>
                                <button className="back_button mt-2" onClick={() => { this.handleShowCCAve(false) }}>
                                  <img src={blueLeftArrow} alt="" /> back to search</button>
                                {
                                  ccAve_searchType === 'cc_OrderId' ?
                                    <div className="order_summary" id="accordion_ccAvenue">
                                      {/* {console.log(orderList, orderList.length)} */}
                                      {ccAvenueOrderList.encResponse !== undefined &&
                                        ccAvenueOrderList.encResponse !== null ?

                                        <div className="single_order_data" >
                                          <div className="card-link d-flex">
                                            <img className="px-2 order_expand right_icon" data-toggle="collapse"
                                              href={"#data" + ccAvenueOrderList.encResponse.order_no} src={tringleRight} alt="" />
                                            <div className="row w-100 ml-1">
                                              <div className="col-3">
                                                <label className="order_label">Order Id:</label>
                                                {ccAvenueOrderList.encResponse.order_no}</div>
                                            </div>
                                          </div>
                                          <div id={"data" + ccAvenueOrderList.encResponse.order_no}
                                            className="collapse"
                                            data-parent="#accordion_ccAvenue">
                                            <div className="order_details">
                                              <div className="all_detail_div">
                                                <div className="row">
                                                  {Object.entries(ccAvenueOrderList.encResponse).map(([key, value]) => {
                                                    return (
                                                      <div className="col-6">
                                                        <label>{this.handleSpaces(key)}:</label>
                                                        {(typeof (value) !== 'object' || value === null) &&
                                                          <span>{value === true ? "true" : value === false ? "false" : value}</span>
                                                        }
                                                      </div>
                                                    )
                                                  })}
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        :
                                        <p className="noData_div"> {"No Data Available"} </p>
                                      }
                                    </div>
                                    :
                                    ccAve_searchType === "cc_MobId" ?
                                      <div className="order_summary" id="accordion_ccAv_Mob">
                                        {ccAvenueMobileList?.length ?
                                          ccAvenueMobileList.map((item, i) => {
                                            return (
                                              <div className="single_order_data" key={i}>
                                                <div className="card-link d-flex">
                                                  <img className="px-2 order_expand right_icon" onClick={() => this.handleGetCCAvenueOrder(item.order_no)} data-toggle="collapse"
                                                    href={"#data" + item.reference_no} src={tringleRight} alt="" />
                                                  <div className="row w-100 ml-1">
                                                    <div className="col-2">
                                                      <label className="order_label">Order Id:</label>
                                                      {item.order_no}</div>
                                                  </div>
                                                </div>
                                                <div id={"data" + item.reference_no}
                                                  className="collapse"
                                                  data-parent="#accordion_ccAv_Mob">
                                                  {ccAvenueOrderList.encResponse !== undefined &&
                                                    ccAvenueOrderList.encResponse !== null ?
                                                    <div className="order_details">
                                                      <div className="all_detail_div">
                                                        <div className="row">
                                                          {Object.entries(ccAvenueOrderList.encResponse).map(([key, value]) => {
                                                            return (
                                                              <div className="col-6">
                                                                <label>{this.handleSpaces(key)}:</label>
                                                                {(typeof (value) !== 'object' || value === null) &&
                                                                  <span>{value === true ? "true" : value === false ? "false" : value}</span>
                                                                }
                                                              </div>
                                                            )
                                                          })}
                                                        </div>
                                                      </div>
                                                    </div>

                                                    : <p className="noData_div p-2"> {"No Data Available"} </p>
                                                  }
                                                </div>
                                              </div>
                                            )
                                          })
                                          :
                                          <p className="noData_div p-3"> {"No Data Available"} </p>
                                        }
                                      </div>
                                      : null
                                }
                              </>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                    {/* cc avenue end */}


                    <div
                      className="tab-pane fade"
                      id="store-tab"
                      role="tabpanel"
                      aria-labelledby="store-tab"
                      style={{ height: "100%" }}
                    >
                      <TicketSystemStore
                        customerDataStore={this.state.customerData}
                        CustStoreStatus={this.handleCustomerStoreStatus}
                        getStoreID={this.handleGetStoreId}
                        ticket_IDS={this.state.ticketDetailID}
                        showStore_Date={this.state.showStoreData}
                        parentCallBackFuncation={this.parentCallBackFuncation}
                      />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="task-tab"
                      role="tabpanel"
                      aria-labelledby="task-tab"
                      style={{ height: "100%" }}
                    >
                      <TicketSystemTask
                        taskMasterData={this.handleTaskMasterChange}
                        ticket_IDS={this.state.ticketDetailID}
                        checkTask={this.state.showTaskData}
                        parentCallBackFuncation={this.parentCallBackFuncation}
                      />
                    </div>


                    <div
                      className="tab-pane fade"
                      id="ticket-tab"
                      role="tabpanel"
                      aria-labelledby="ticket-tab"
                      style={{ height: "100%" }}
                    >
                      <OpenTicket
                        //  customerTicketsStatus={
                        //   this.state.showCustomerTicketsStatus
                        // }
                        customerMobile={this.state.customerData.customerPhoneNumber}
                        customerEmail={this.state.customerData.customerEmailId}

                      />

                    </div>


                    <div
                      className="tab-pane fade"
                      id="appointment-tab"
                      role="tabpanel"
                      aria-labelledby="appointment-tab"
                      style={{ height: "100%" }}
                    >
                      <TicketSystemAppointment
                        handleCallbackAppointmentBooklist={
                          this.handleCallbackAppointmentBooklist
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="column1">
                <div className="myticketlist-header-system">
                  <div className="setting-tabs system">
                    <ul className="nav nav-tabs es" role="tablist">
                      {!(this.state.storeticketsrch) && <li className="nav-item">
                        <a
                          className={`nav-link ${this.state.storeticketsrch ? "" : " active"}`}
                          data-toggle="tab"
                          href="#customer-tab"
                          role="tab"
                          aria-controls="customer-tab"
                          aria-selected={this.state.storeticketsrch ? false : true}
                          onClick={this.handlechangebtntab.bind(this)}
                        >
                          {/* {this.state.TabIconColor === "nav-link active" ? (
                            <img
                              src={CustomreIcon}
                              alt="customer-icon"
                              className="customer-icon"
                            />
                          ) : ( */}
                          <img
                            src={AvatarBlackIcon}
                            alt="customer-icon"
                            className="customer-icon"
                          />
                          {/* )} */}

                          <span className="system-tab-span">
                            {this.state.ticketFields.length > 0
                              ? this.state.ticketFields.filter(
                                (x) =>
                                  x.fieldName.toLowerCase() ===
                                  "CUSTOMER".toLowerCase()
                              ).length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "CUSTOMER".toLowerCase()
                                )[0].createPage
                                  ? TranslationContext !== undefined
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "CUSTOMER".toLowerCase()
                                    )[0].displayHindiName ||
                                    TranslationContext.span.customer
                                    : this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "CUSTOMER".toLowerCase()
                                    )[0].displayEnglishName || "CUSTOMER"
                                  : TranslationContext !== undefined
                                    ? TranslationContext.span.customer
                                    : "CUSTOMER"
                                : TranslationContext !== undefined
                                  ? TranslationContext.span.customer
                                  : "CUSTOMER"
                              : TranslationContext !== undefined
                                ? TranslationContext.span.customer
                                : "CUSTOMER"}
                            {/* {TranslationContext !== undefined
                              ? TranslationContext.span.customer
                              : "CUSTOMER"} */}
                          </span>
                        </a>
                      </li>}

                      {this.state.rightSideTab ? (
                        this.state.rightSideTab["Order"] ? (
                          <li className="nav-item">
                            <a
                              className={`nav-link ${this.state.storeticketsrch ? " active" : ""}`}
                              data-toggle="tab"
                              href="#order-tab"
                              role="tab"
                              aria-controls="order-tab"
                              aria-selected={this.state.storeticketsrch ? true : false}
                              onClick={() => { this.handleOrderCreditTab("orderId_cre") }}
                            >
                              <img
                                src={OrderIcon}
                                alt="order-icon"
                                className="order-icon"
                              />
                              <span className="system-tab-span">
                                {this.state.ticketFields.length > 0
                                  ? this.state.ticketFields.filter(
                                    (x) =>
                                      x.fieldName.toLowerCase() ===
                                      "ORDER".toLowerCase()
                                  ).length > 0
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "ORDER".toLowerCase()
                                    )[0].createPage
                                      ? TranslationContext !== undefined
                                        ? this.state.ticketFields.filter(
                                          (x) =>
                                            x.fieldName.toLowerCase() ===
                                            "ORDER".toLowerCase()
                                        )[0].displayHindiName ||
                                        TranslationContext.span.order
                                        : this.state.ticketFields.filter(
                                          (x) =>
                                            x.fieldName.toLowerCase() ===
                                            "ORDER".toLowerCase()
                                        )[0].displayEnglishName || "ORDER"
                                      : TranslationContext !== undefined
                                        ? TranslationContext.span.order
                                        : "ORDER"
                                    : TranslationContext !== undefined
                                      ? TranslationContext.span.order
                                      : "ORDER"
                                  : TranslationContext !== undefined
                                    ? TranslationContext.span.order
                                    : "ORDER"}
                                {/* {TranslationContext !== undefined
                              ? TranslationContext.span.order
                              : "ORDER"} */}
                              </span>
                            </a>
                          </li>
                        ) : null
                      ) : null}

                      {!(this.state.storeticketsrch) && window.localStorage.getItem("Programcode") === 'bataclub' &&
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#creditNote_tab"
                            role="tab"
                            aria-controls="creditNote_tab"
                            aria-selected="false"
                            onClick={() => { this.handleOrderCreditTab("credit_note") }}
                          >
                            <img
                              src={CreditNote}
                              alt="credit_note"
                              className="credit_note"
                            />
                            <span className="system-tab-span">CREDIT NOTE</span>
                          </a>
                        </li>
                      }

                      {!(this.state.storeticketsrch) && window.localStorage.getItem("Programcode") === 'bataclub' &&
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#cc_avenue_tab"
                            role="tab"
                            aria-controls="cc_avenue_tab"
                            aria-selected="false"
                            onClick={() => { this.handleOrderCreditTab("cc_avenue") }}
                          >
                            {/* <img
                              src={CreditNote}
                              alt="credit_note"
                              className="credit_note"
                            /> */}
                            <label className="cc_logo">CC</label>
                            <span className="system-tab-span">CC Avenue</span>
                          </a>
                        </li>
                      }

                      {this.state.rightSideTab ? (!(this.state.storeticketsrch) &&
                        this.state.rightSideTab["Store"] ? (
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#store-tab"
                            role="tab"
                            aria-controls="store-tab"
                            aria-selected="false"
                          >
                            <img
                              src={StoreIcon}
                              alt="store-icon"
                              className="store-icon"
                            />
                            <img
                              src={TicketLogoBlue}
                              alt="ticketlogoblue"
                              className="store-icon"
                              style={{ display: "none" }}
                            />
                            <span className="system-tab-span">
                              {this.state.ticketFields.length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "STORE".toLowerCase()
                                ).length > 0
                                  ? this.state.ticketFields.filter(
                                    (x) =>
                                      x.fieldName.toLowerCase() ===
                                      "STORE".toLowerCase()
                                  )[0].createPage
                                    ? TranslationContext !== undefined
                                      ? this.state.ticketFields.filter(
                                        (x) =>
                                          x.fieldName.toLowerCase() ===
                                          "STORE".toLowerCase()
                                      )[0].displayHindiName ||
                                      TranslationContext.span.store
                                      : this.state.ticketFields.filter(
                                        (x) =>
                                          x.fieldName.toLowerCase() ===
                                          "STORE".toLowerCase()
                                      )[0].displayEnglishName || "STORE"
                                    : TranslationContext !== undefined
                                      ? TranslationContext.span.store
                                      : "STORE"
                                  : TranslationContext !== undefined
                                    ? TranslationContext.span.store
                                    : "STORE"
                                : TranslationContext !== undefined
                                  ? TranslationContext.span.store
                                  : "STORE"}
                              {/* {TranslationContext !== undefined
                              ? TranslationContext.span.store
                              : "STORE"} */}
                            </span>
                          </a>
                        </li>
                      ) : null
                      ) : null}



                      {this.state.rightSideTab ? (!(this.state.storeticketsrch) &&
                        this.state.rightSideTab["Task"] ? (
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            data-toggle="tab"
                            href="#task-tab"
                            role="tab"
                            aria-controls="task-tab"
                            aria-selected="false"
                          >
                            <img
                              src={TaskIcon}
                              alt="task-icon"
                              className="task-icon"
                            />
                            <span className="system-tab-span">
                              {this.state.ticketFields.length > 0
                                ? this.state.ticketFields.filter(
                                  (x) =>
                                    x.fieldName.toLowerCase() ===
                                    "TASK".toLowerCase()
                                ).length > 0
                                  ? this.state.ticketFields.filter(
                                    (x) =>
                                      x.fieldName.toLowerCase() ===
                                      "TASK".toLowerCase()
                                  )[0].createPage
                                    ? TranslationContext !== undefined
                                      ? this.state.ticketFields.filter(
                                        (x) =>
                                          x.fieldName.toLowerCase() ===
                                          "TASK".toLowerCase()
                                      )[0].displayHindiName ||
                                      TranslationContext.span.task
                                      : this.state.ticketFields.filter(
                                        (x) =>
                                          x.fieldName.toLowerCase() ===
                                          "TASK".toLowerCase()
                                      )[0].displayEnglishName || "TASK"
                                    : TranslationContext !== undefined
                                      ? TranslationContext.span.task
                                      : "TASK"
                                  : TranslationContext !== undefined
                                    ? TranslationContext.span.task
                                    : "TASK"
                                : TranslationContext !== undefined
                                  ? TranslationContext.span.task
                                  : "TASK"}
                              {/* {TranslationContext !== undefined
                              ? TranslationContext.span.task
                              : "TASK"} */}
                            </span>
                          </a>
                        </li>
                      ) : null
                      ) : null}


                      {this.state.rightSideTab ? (
                        this.state.rightSideTab["OpenTicket"] ? (
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#ticket-tab"
                              role="tab"
                              aria-controls="ticket-tab"
                              aria-selected="false"
                            >
                              <img
                                src={TaskIcon}
                                alt="ticket-icon"
                                className="task-icon"
                              />
                              <span className="system-tab-span">
                                {this.state.ticketFields.length > 0
                                  ? this.state.ticketFields.filter(
                                    (x) =>
                                      x.fieldName.toLowerCase() ===
                                      "OpenTicket".toLowerCase()
                                  ).length > 0
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "OpenTicket".toLowerCase()
                                    )[0].createPage
                                      ? TranslationContext !== undefined
                                        ? this.state.ticketFields.filter(
                                          (x) =>
                                            x.fieldName.toLowerCase() ===
                                            "OpenTicket".toLowerCase()
                                        )[0].displayHindiName ||
                                        TranslationContext.span.task
                                        : this.state.ticketFields.filter(
                                          (x) =>
                                            x.fieldName.toLowerCase() ===
                                            "OpenTicket".toLowerCase()
                                        )[0].displayEnglishName || "OpenTicket"
                                      : TranslationContext !== undefined
                                        ? TranslationContext.span.task
                                        : "OpenTicket"
                                    : TranslationContext !== undefined
                                      ? TranslationContext.span.task
                                      : "OpenTicket"
                                  : TranslationContext !== undefined
                                    ? TranslationContext.span.task
                                    : "OpenTicket"}
                                {/* {TranslationContext !== undefined
                              ? TranslationContext.span.task
                              : "TASK"} */}
                              </span>
                            </a>
                          </li>
                        ) : null
                      ) : null}



                      {this.state.rightSideTab ? (
                        this.state.rightSideTab["Appointment"] ? (
                          <li className="nav-item">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#appointment-tab"
                              role="tab"
                              aria-controls="appointment-tab"
                              aria-selected="false"
                            >
                              <img
                                src={AppointmentLogo}
                                alt="Appointment"
                                className="task-icon"
                              />
                              <span className="system-tab-span">
                                {this.state.ticketFields.length > 0
                                  ? this.state.ticketFields.filter(
                                    (x) =>
                                      x.fieldName.toLowerCase() ===
                                      "Appointment".toLowerCase()
                                  ).length > 0
                                    ? this.state.ticketFields.filter(
                                      (x) =>
                                        x.fieldName.toLowerCase() ===
                                        "Appointment".toLowerCase()
                                    )[0].createPage
                                      ? TranslationContext !== undefined
                                        ? this.state.ticketFields.filter(
                                          (x) =>
                                            x.fieldName.toLowerCase() ===
                                            "Appointment".toLowerCase()
                                        )[0].displayHindiName ||
                                        TranslationContext.nav.appointment
                                        : this.state.ticketFields.filter(
                                          (x) =>
                                            x.fieldName.toLowerCase() ===
                                            "Appointment".toLowerCase()
                                        )[0].displayEnglishName ||
                                        "Appointment"
                                      : TranslationContext !== undefined
                                        ? TranslationContext.nav.appointment
                                        : "Appointment"
                                    : TranslationContext !== undefined
                                      ? TranslationContext.nav.appointment
                                      : "Appointment"
                                  : TranslationContext !== undefined
                                    ? TranslationContext.nav.appointment
                                    : "Appointment"}
                                {/* {TranslationContext !== undefined
                              ? TranslationContext.nav.appointment
                              : "Appointment"} */}
                              </span>
                            </a>
                          </li>
                        ) : null
                      ) : null}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <Modal
                  open={this.state.KbLink}
                  onClose={this.HandleKbLinkModalClose.bind(this)}
                  modalId="KbLink-popup"
                  overlayId="logout-ovrlykb"
                >
                  <div className="row" style={{ margin: "0" }}>
                    <div className="col-md-7" style={{ padding: "0" }}>
                      <div className="knokb">
                        <h5>
                          <img
                            src={KnowledgeLogo}
                            alt="KnowledgeLogo"
                            className="knoim1"
                          />
                          {TranslationContext !== undefined
                            ? TranslationContext.ticketingDashboard.knowlegebase
                            : "KNOWLEGE BASE"}
                        </h5>
                        <p>
                          {TranslationContext !== undefined
                            ? TranslationContext.title.message
                            : "Message"}
                        </p>

                        <div id="kb-accordion">
                          {this.state.KbPopupData !== null &&
                            this.state.KbPopupData.map((item, i) => (
                              <div key={i} className="kb-acc-cntr">
                                <p
                                  className="table-details-data-modal"
                                  data-toggle="collapse"
                                  data-target={"#collapse" + i}
                                  aria-expanded={i === 0 ? "true" : "false"}
                                  aria-controls={"collapse" + i}
                                  onClick={() =>
                                    this.setState({ copied: false })
                                  }
                                >
                                  {item.subject}
                                </p>
                                <div
                                  id={"collapse" + i}
                                  className={
                                    i === 0 ? "collapse show" : "collapse"
                                  }
                                  data-parent="#kb-accordion"
                                >
                                  <p className="mb-0">{item.description}</p>
                                  <CopyToClipboard
                                    text={item.description}
                                    onCopy={() =>
                                      this.setState({ copied: true })
                                    }
                                  >
                                    <a href="#!" className="copyblue-kbtext">
                                      <img
                                        src={CopyBlue}
                                        alt=""
                                        className="copyblue-kb"
                                      />
                                      {TranslationContext !== undefined
                                        ? TranslationContext.a.copy
                                        : "Copy"}
                                    </a>
                                  </CopyToClipboard>
                                  {this.state.copied ? (
                                    <span
                                      className="ml-2"
                                      style={{ color: "red" }}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.span.copied
                                        : "Copied."}
                                    </span>
                                  ) : null}
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-5 kblinkright">
                      <div className="knokb-a">
                        <img
                          src={CancelImg}
                          alt="cancelImg"
                          className="cancalImg-kb"
                          onClick={this.HandleKbLinkModalClose.bind(this)}
                        />
                        <h5>
                          {TranslationContext !== undefined
                            ? TranslationContext.h5.kbtemplate
                            : "KB TEMPLATE"}
                        </h5>
                        <div className="form-group">
                          <select
                            value={this.state.selectedCategoryKB}
                            onChange={this.setCategoryValueKB}
                            className="kblinkrectangle-9 select-category-placeholderkblink"
                          >
                            <option value="">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.category
                                : "Category"}
                            </option>
                            {this.state.CategoryData !== null &&
                              this.state.CategoryData.map((item, i) => (
                                <option key={i} value={item.categoryID}>
                                  {item.categoryName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectedCategoryKB.length === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.categoryKbCompulsion}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <select
                            value={this.state.selectedSubCategoryKB}
                            onChange={this.setSubCategoryValueKB}
                            className="kblinkrectangle-9 select-category-placeholderkblink"
                          >
                            <option value="">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.subcategory
                                : "Sub Category"}
                            </option>
                            {this.state.SubCategoryData !== null &&
                              this.state.SubCategoryData.map((item, i) => (
                                <option key={i} value={item.subCategoryID}>
                                  {item.subCategoryName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectedSubCategoryKB.length === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.subCategoryKbCompulsion}
                            </p>
                          )}
                        </div>
                        <div className="form-group">
                          <select
                            value={this.state.selectedIssueTypeKB}
                            onChange={this.setIssueTypeValueKB}
                            className="kblinkrectangle-9 select-category-placeholderkblink"
                          >
                            <option value="">
                              {TranslationContext !== undefined
                                ? TranslationContext.span.type
                                : "Type"}
                            </option>
                            {this.state.IssueTypeData !== null &&
                              this.state.IssueTypeData.map((item, i) => (
                                <option key={i} value={item.issueTypeID}>
                                  {item.issueTypeName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectedIssueTypeKB.length === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.issueTypeKbCompulsion}
                            </p>
                          )}
                        </div>
                        <div>
                          <span
                            onClick={this.handleviewPolicyModelOpen}
                            style={{ float: "left" }}
                          >
                            <a
                              href="#!"
                              className="copyblue-kbtext d-inline-block"
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.button.viewpolicy
                                : "VIEW POLICY"}
                              <img
                                src={ViewBlue}
                                alt="viewpolicy"
                                className="viewpolicy-kb"
                              />
                            </a>
                          </span>
                        </div>
                        <div>
                          <button
                            onClick={this.handleKbLinkPopupSearch}
                            className="kblink-search"
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.small.search
                              : "SEARCH"}
                          </button>
                        </div>
                        <Modal
                          open={this.state.viewPolicyModel}
                          onClose={this.handleviewPolicyModelClose}
                          modalId="viewPolicyModel"
                          classNames={{
                            modal: "schedule-width",
                          }}
                          overlayId="logout-ovrly"
                        >
                          <div>
                            <label>
                              <b>
                                {TranslationContext !== undefined
                                  ? TranslationContext.button.viewpolicy
                                  : "View Policy"}
                              </b>
                            </label>
                          </div>
                        </Modal>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default TicketSystem;
