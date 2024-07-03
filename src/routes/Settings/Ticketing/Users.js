import React, { Component } from "react";
import Demo from "./../../../store/Hashtag.js";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import DownExcel from "./../../../assets/Images/csv.png";
import { ProgressBar } from "react-bootstrap";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { Link } from "react-router-dom";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal as PassModal, Popover, Spin } from "antd";
import ReactTable from "react-table";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import Modal from "react-responsive-modal";
import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import { NotificationManager } from "react-notifications";
import { CSVLink } from "react-csv";
import { Tabs, Tab } from "react-bootstrap-tabs/dist";
import matchSorter from "match-sorter";
import Sorting from "./../../../assets/Images/sorting.png";
import Correct from "./../../../assets/Images/correct.png";
import { formatSizeUnits } from "./../../../helpers/CommanFuncation";
import Dropzone from "react-dropzone";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";
import { FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import { encryption } from "../../../helpers/encryption";
import OutsideClickHandler from "react-outside-click-handler";

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: "",
      isOpen: false,
      getID: 0,
      userData: [],
      selectUserName: "",
      selectFirstName: "",
      selectLastName: "",
      selectMobile: "",
      selectEmail: "",
      selectPassword: "",
      brandData: [],
      CategoryData: [],
      SubCategoryData: [],
      IssueTypeData: [],
      DesignationData: [],
      CRMRoleData: [],
      ReporteeDesignData: [],
      ReportToData: [],
      AgentData: [],
      GetUserData: [],
      EditBrandData: [],
      selectedDesignation: 0,
      selectedCopyEscalation: false,
      selectedAssignEscalation: false,
      selectedSupervisorAgent: "",
      selectedCRMRoles: 0,
      selectedReporteeDesign: 0,
      selectedReportTO: 0,
      selectedAgent: 0,
      selectedStatus: "true",
      multibrandIDs: "",
      multiSourceIDs: "",
      multicategoryIDs: "",
      multisubcategoryIDs: "",
      editreporteeDesign: 0,
      userEditData: {},
      editmodel: false,
      selectedAgentRadio: false,
      selectedSupervisorRadio: true,
      selectedSourceRadio: false,
      showSourceList: false,
      showSourceEditList: false,
      sourceListData: [],
      editAgentRadio: true,
      editSupervisorRadio: false,
      buttonToggle: false,
      buttonProfileToggle: false,
      forEditID: 0,
      test: "",
      usernameCompulsion: "",
      firstnameCompulsion: "",
      mobilenumberCompulsion: "",
      emailCompulsion: "",
      passwordCompulsion: "",
      userdesignCompulsion: "",
      reporteeDesignCompulsion: "",
      reportToCompulsion: "",
      brandCompulsion: "",
      sourceComplusion: '',
      categoryCompulsion: "",
      subcategoryCompulsion: "",
      isuuetypeCompulsion: "",
      crmroleCompulsion: "",
      copyescCompulsion: "",
      assignescCompulsion: "",
      RadioCompulsion: "",
      agentCompulsion: "",
      editusernameCompulsion: "",
      editusercodeCompulsion: "",
      editfirstnameCompulsion: "",
      editmobilenumberCompulsion: "",
      editemailCompulsion: "",
      edituserdesignCompulsion: "",
      editreporteeDesignCompulsion: "",
      editreportToCompulsion: "",
      editbrandCompulsion: "",
      editcategoryCompulsion: "",
      editsubcategoryCompulsion: "",
      editisuuetypeCompulsion: "",
      editcrmroleCompulsion: "",
      editcopyescCompulsion: "",
      editassignescCompulsion: "",
      editRadioCompulsion: "",
      editagentCompulsion: "",
      emailValidation: "",
      mobileValidation: "",
      personalReadOnly: false,
      profileReadOnly: false,
      StatusModel: false,
      sortAllData: "",
      sortDesignation: [],
      sortUsername: [],
      sortEmail: [],
      sortMobile: [],
      selTab: "Personal Details",
      userColor: "",
      mobileColor: "",
      emailColor: "",
      designationColor: "",
      sortHeader: "",
      emailFlag: true,
      editEmailFlag: true,
      phoneFlag: true,
      EditPhoneFlag: true,
      sortFilterDesignation: [],
      sortFilterUsername: [],
      sortFilterMobile: [],
      sortFilterEmail: [],
      tempuserData: [],
      filterTxtValue: "",
      sFilterCheckbox: "",
      isFileUploadFail: false,
      progressValue: 0,
      fileSize: "",
      showProgress: false,
      bulkuploadCompulsion: "",
      fileN: [],
      sdesignationFilterCheckbox: "",
      suserNameFilterCheckbox: "",
      smobileNumberFilterCheckbox: "",
      semailIDFilterCheckbox: "",
      isortA: false,
      bulkuploadLoading: false,
      translateLanguage: {},
      profileBtnDisabled: true,
      mappedCategoryBtnDisabled: true,
      BrandNameShow: false,
      brandNameOvrlayShow: false,
      sourceNameOvrlayShow: false,
      SourceNameShow: false,

      indibrandName: "",
      overlaySourceTicket: false,
      overlaySourceTicketNameShow: false,
      overlaySourceTicketName: '',
      editOverlaySourceTicket: false,
      editOverlaySourceTicketNameShow: false,
      editOverlaySourceTicketName: "",
      campaignNameShow: false,
      campaignNameOvrlayShow: false,
      indiCampaignName: "",
      subCampaignNameShow: false,
      indiSubCampaignName: "",
      subCampaignNameOvrlayShow: false,
      issueTypeNameShow: false,
      IssueTypeOvrlayShow: false,
      indiIssueTypeName: "",
      editIndibrandName: "",
      brandNameEditOvrlayShow: false,
      BrandNameEditShow: false,
      campaignNameEditShow: false,
      editIndiCategoryName: "",
      campaignNameEditOvrlayShow: false,
      subCampaignNameEditShow: false,
      subCampaignNameEditOvrlayShow: false,
      editIndiSubCategoryName: "",
      issueTypeNameEditShow: false,
      IssueTypeEditOvrlayShow: false,
      editIndiIssueTypeName: "",
      isModalVisible: false,
      showHidePassword: true,
      newPassword: "",
      checkPassword: "",
      passerrors: "",
      PassEmail: "",
      checkFormPassword: "",
      passFormError: "",
    };
    this.handleGetUserList = this.handleGetUserList.bind(this);
    this.handleAddPersonalDetails = this.handleAddPersonalDetails.bind(this);
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    this.getSourceTicketList = this.getSourceTicketList.bind(this);
    this.handleGetCategoryList = this.handleGetCategoryList.bind(this);
    this.handleGetSubCategoryList = this.handleGetSubCategoryList.bind(this);
    this.handleGetIssueTypeList = this.handleGetIssueTypeList.bind(this);
    this.handleGetDesignationList = this.handleGetDesignationList.bind(this);
    this.handleGetCRMRoleList = this.handleGetCRMRoleList.bind(this);
    this.handleGetReporteedesignationList = this.handleGetReporteedesignationList.bind(
      this
    );
    this.handleGetReportTOList = this.handleGetReportTOList.bind(this);
    this.handleAddProfileDetails = this.handleAddProfileDetails.bind(this);
    this.handleGetAgentList = this.handleGetAgentList.bind(this);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
    this.togglePopover = this.togglePopover.bind(this);
    this.closeEditModal = this.closeEditModal.bind(this);
    this.handleSendMail = this.handleSendMail.bind(this);
    this.handleValidationEmailIdMob = this.handleValidationEmailIdMob.bind(
      this
    );
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.hanldeAddBulkUpload = this.hanldeAddBulkUpload.bind(this);
    this.setUserEditData = this.setUserEditData.bind(this);
  }
  componentDidMount() {
    this.handleGetUserList();
    this.handleGetBrandList();
    this.handleGetDesignationList();
    this.handleGetCRMRoleList();
    // this.handleGetReporteedesignationList();
    // this.handleGetReportTOList();

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
    itemsArray = this.state.userData;

    if (this.state.sortColumn === "userName") {
      itemsArray.sort((a, b) => {
        if (a.userName < b.userName) return 1;
        if (a.userName > b.userName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "designation") {
      itemsArray.sort((a, b) => {
        if (a.designation < b.designation) return 1;
        if (a.designation > b.designation) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "mobileNumber") {
      itemsArray.sort((a, b) => {
        if (a.mobileNumber < b.mobileNumber) return 1;
        if (a.mobileNumber > b.mobileNumber) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "emailID") {
      itemsArray.sort((a, b) => {
        if (a.emailID < b.emailID) return 1;
        if (a.emailID > b.emailID) return -1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      userData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    var itemsArray = [];
    itemsArray = this.state.userData;

    if (this.state.sortColumn === "designation") {
      itemsArray.sort((a, b) => {
        if (a.designation < b.designation) return -1;
        if (a.designation > b.designation) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "userName") {
      itemsArray.sort((a, b) => {
        if (a.userName < b.userName) return -1;
        if (a.userName > b.userName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "mobileNumber") {
      itemsArray.sort((a, b) => {
        if (a.mobileNumber < b.mobileNumber) return -1;
        if (a.mobileNumber > b.mobileNumber) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "emailID") {
      itemsArray.sort((a, b) => {
        if (a.emailID < b.emailID) return -1;
        if (a.emailID > b.emailID) return 1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      userData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  StatusOpenModel(data, header) {
    if (
      this.state.sortFilterDesignation.length === 0 ||
      this.state.sortFilterUsername.length === 0 ||
      this.state.sortFilterMobile.length === 0 ||
      this.state.sortFilterEmail.length === 0
    ) {
      return false;
    }
    if (data === "designation") {
      if (
        this.state.suserNameFilterCheckbox !== "" ||
        this.state.smobileNumberFilterCheckbox !== "" ||
        this.state.semailIDFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          suserNameFilterCheckbox: "",
          smobileNumberFilterCheckbox: "",
          semailIDFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "userName") {
      if (
        this.state.sdesignationFilterCheckbox !== "" ||
        this.state.smobileNumberFilterCheckbox !== "" ||
        this.state.semailIDFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sdesignationFilterCheckbox: "",
          smobileNumberFilterCheckbox: "",
          semailIDFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "mobileNumber") {
      if (
        this.state.sdesignationFilterCheckbox !== "" ||
        this.state.suserNameFilterCheckbox !== "" ||
        this.state.semailIDFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sdesignationFilterCheckbox: "",
          suserNameFilterCheckbox: "",
          semailIDFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "emailID") {
      if (
        this.state.sdesignationFilterCheckbox !== "" ||
        this.state.suserNameFilterCheckbox !== "" ||
        this.state.smobileNumberFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sdesignationFilterCheckbox: "",
          suserNameFilterCheckbox: "",
          smobileNumberFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }
  StatusCloseModel() {
    if (this.state.tempuserData.length > 0) {
      this.setState({
        StatusModel: false,
        userData: this.state.tempuserData,
        filterTxtValue: "",
        sortFilterDesignation: this.state.sortDesignation,
        sortFilterUsername: this.state.sortUsername,
        sortFilterMobile: this.state.sortMobile,
        sortFilterEmail: this.state.sortEmail,
      });
      if (this.state.sortColumn === "designation") {
        if (this.state.sdesignationFilterCheckbox === "") {
        } else {
          this.setState({
            suserNameFilterCheckbox: "",
            smobileNumberFilterCheckbox: "",
            semailIDFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "userName") {
        if (this.state.suserNameFilterCheckbox === "") {
        } else {
          this.setState({
            sdesignationFilterCheckbox: "",
            smobileNumberFilterCheckbox: "",
            semailIDFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "mobileNumber") {
        if (this.state.smobileNumberFilterCheckbox === "") {
        } else {
          this.setState({
            sdesignationFilterCheckbox: "",
            suserNameFilterCheckbox: "",
            semailIDFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "emailID") {
        if (this.state.semailIDFilterCheckbox === "") {
        } else {
          this.setState({
            sdesignationFilterCheckbox: "",
            suserNameFilterCheckbox: "",
            smobileNumberFilterCheckbox: "",
          });
        }
      }
    } else {
      if (this.state.isortA) {
        this.setState({
          StatusModel: false,
          userData: this.state.userData,
          filterTxtValue: "",
          sortFilterDesignation: this.state.sortDesignation,
          sortFilterUsername: this.state.sortUsername,
          sortFilterMobile: this.state.sortMobile,
          sortFilterEmail: this.state.sortEmail,
        });
      } else {
        this.setState({
          StatusModel: false,
          userData: this.state.sortAllData,
          filterTxtValue: "",
          sortFilterDesignation: this.state.sortDesignation,
          sortFilterUsername: this.state.sortUsername,
          sortFilterMobile: this.state.sortMobile,
          sortFilterEmail: this.state.sortEmail,
        });
      }
    }
  }

  setSortCheckStatus = (column, type, e) => {
    var itemsArray = [];

    var suserNameFilterCheckbox = this.state.suserNameFilterCheckbox;
    var sdesignationFilterCheckbox = this.state.sdesignationFilterCheckbox;
    var smobileNumberFilterCheckbox = this.state.smobileNumberFilterCheckbox;
    var semailIDFilterCheckbox = this.state.semailIDFilterCheckbox;
    if (column === "userName" || column === "all") {
      if (type === "value" && type !== "All") {
        suserNameFilterCheckbox = suserNameFilterCheckbox.replace("all", "");
        suserNameFilterCheckbox = suserNameFilterCheckbox.replace("all,", "");
        if (suserNameFilterCheckbox.includes(e.currentTarget.value)) {
          suserNameFilterCheckbox = suserNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          suserNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (suserNameFilterCheckbox.includes("all")) {
          suserNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "userName") {
            for (let i = 0; i < this.state.sortUsername.length; i++) {
              suserNameFilterCheckbox +=
                this.state.sortUsername[i].userName + ",";
            }
            suserNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "designation" || column === "all") {
      if (type === "value" && type !== "All") {
        sdesignationFilterCheckbox = sdesignationFilterCheckbox.replace(
          "all",
          ""
        );
        sdesignationFilterCheckbox = sdesignationFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sdesignationFilterCheckbox.includes(e.currentTarget.value)) {
          sdesignationFilterCheckbox = sdesignationFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sdesignationFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sdesignationFilterCheckbox.includes("all")) {
          sdesignationFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "designation") {
            for (let i = 0; i < this.state.sortDesignation.length; i++) {
              sdesignationFilterCheckbox +=
                this.state.sortDesignation[i].designation + ",";
            }
            sdesignationFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "mobileNumber" || column === "all") {
      if (type === "value" && type !== "All") {
        smobileNumberFilterCheckbox = smobileNumberFilterCheckbox.replace(
          "all",
          ""
        );
        smobileNumberFilterCheckbox = smobileNumberFilterCheckbox.replace(
          "all,",
          ""
        );
        if (smobileNumberFilterCheckbox.includes(e.currentTarget.value)) {
          smobileNumberFilterCheckbox = smobileNumberFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          smobileNumberFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (smobileNumberFilterCheckbox.includes("all")) {
          smobileNumberFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "mobileNumber") {
            for (let i = 0; i < this.state.sortMobile.length; i++) {
              smobileNumberFilterCheckbox +=
                this.state.sortMobile[i].mobileNumber + ",";
            }
            smobileNumberFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "emailID" || column === "all") {
      if (type === "value" && type !== "All") {
        semailIDFilterCheckbox = semailIDFilterCheckbox.replace("all", "");
        semailIDFilterCheckbox = semailIDFilterCheckbox.replace("all,", "");
        if (semailIDFilterCheckbox.includes(e.currentTarget.value)) {
          semailIDFilterCheckbox = semailIDFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          semailIDFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (semailIDFilterCheckbox.includes("all")) {
          semailIDFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "emailID") {
            for (let i = 0; i < this.state.sortEmail.length; i++) {
              semailIDFilterCheckbox += this.state.sortEmail[i].emailID + ",";
            }
            semailIDFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      sdesignationFilterCheckbox,
      suserNameFilterCheckbox,
      smobileNumberFilterCheckbox,
      semailIDFilterCheckbox,
      userColor: "",
      mobileColor: "",
      emailColor: "",
      designationColor: "",
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "designation") {
      var sItems = sdesignationFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.designation === sItems[i]
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
        designationColor: "sort-column",
      });
    } else if (column === "userName") {
      var sItems = suserNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.userName === sItems[i]
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
        userColor: "sort-column",
      });
    } else if (column === "mobileNumber") {
      var sItems = smobileNumberFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.mobileNumber === sItems[i]
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
        mobileColor: "sort-column",
      });
    } else if (column === "emailID") {
      var sItems = semailIDFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter((a) => a.emailID === sItems[i]);
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        emailColor: "sort-column",
      });
    }
    this.setState({
      tempuserData: itemsArray,
    });
  };

  opneEditModal = () => {
    this.setState({ editmodel: true });
  };
  closeEditModal() {
    this.setState({ editmodel: false, selTab: "Personal Details" });
  }

  togglePopover() {
    this.setState({ isOpen: !this.state.isOpen });
  }

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
  setUserEditData = async (e) => {
    let self = this;
    // //
    var userEditData = e;
    console.log('adadadadad', userEditData)
    userEditData.user_Id = userEditData.userId;
    userEditData.selectUserName = userEditData.userName;
    userEditData.first_Name = userEditData.firstName;
    userEditData.last_Name = userEditData.lastName;
    userEditData.mobile_Number = userEditData.mobileNumber;
    userEditData.email_ID = userEditData.emailID;
    userEditData.userCode = userEditData.userCode;
    userEditData.designation_ID = userEditData.designationID;
    userEditData.IsTicketAssignment = userEditData.isTicketAssignment;
    userEditData.reportee_ID =
      userEditData.reporteeID === 0 ? "-1" : userEditData.reporteeID;
    userEditData.is_Copy_Escalation = userEditData.is_CopyEscalation;
    userEditData.is_Assign_Escalation = userEditData.is_AssignEscalation;
    userEditData.role_ID = userEditData.roleID;
    userEditData.assign_ID = userEditData.assignID;
    userEditData.assign_Escalation = userEditData.assignEscalation;
    userEditData.assign_Name = userEditData.assignName;
    userEditData.reporteeDesignation_ID =
      userEditData.reporteeDesignationID === 0
        ? "-1"
        : userEditData.reporteeDesignationID;

    if (userEditData.isActive === true) {
      userEditData.is_Active = "true";
    } else {
      userEditData.is_Active = "false";
    }
    if (userEditData.assign_Escalation === "Agent") {
      var agent = true;
      var supervi = false;
    } else if (userEditData.assign_Escalation === "Supervisor") {
      var supervi = true;
      var agent = false;
    }
    //edit assign ticket
    // setTimeout(() => {
    if (userEditData.isTicketAssignment === true) {
      this.setState({ showSourceEditList: true })
      this.getSourceTicketList();
    } else {
      this.setState({ showSourceEditList: false })
    }

    // }, 1);

    // self.setState({
    //   selectedSourceRadio: userEditData.isTicketAssignment,
    // })
    await setTimeout(async () => {
      //
      self.setState({
        userEditData,
        editIndibrandName: userEditData.brandIDs !== null ? userEditData.brandIDs : '',
        editOverlaySourceTicketName: userEditData.ticktAssignmentSource !== null ? userEditData.ticktAssignmentSource : '',
        editIndiCategoryName: userEditData.categoryIDs,
        editIndiSubCategoryName: userEditData.subCategoryIDs,
        editIndiIssueTypeName: userEditData.issueTypeIDs,
        editAgentRadio: agent,
        editSupervisorRadio: supervi,


      });
    }, 500);

    self.handleGetReporteedesignationList("edit", userEditData.designationID);
    self.handleGetReportTOList("edit", userEditData.reporteeDesignationID);
    self.handleGetCategoryList("edit", userEditData.brandIDs);
    self.handleGetSubCategoryList("edit", userEditData.categoryIDs);
    self.handleGetIssueTypeList("edit", userEditData.subCategoryIDs);
    self.handleGetAgentList("edit");
    self.opneEditModal();
    self.getSourceTicketList();
  };

  handleAgentValue = (datar, e) => {
    let subjectvalue = e.currentTarget.checked;
    this.setState({
      selectedSupervisorRadio: false,
      selectedAgentRadio: subjectvalue,
    });
    setTimeout(() => {
      if (this.state.selectedAgentRadio === true) {
        this.handleGetAgentList(datar);
      }
    }, 1);

  };

  handleSuperValue = (datar, e) => {
    let subjectvalue = e.currentTarget.checked;
    this.setState({
      selectedAgentRadio: false,
      selectedSupervisorRadio: subjectvalue,
    });
    setTimeout(() => {
      if (this.state.selectedSupervisorRadio === true) {
        this.handleGetAgentList(datar);
      }
    }, 1);
  };
  getSourceTicketList = () => {
    let self = this

    axios({
      method: "post",
      url: config.apiUrl + "/Master/getTicketSources",
      headers: authHeader(),
    })
      .then(function (res) {
        self.setState({ sourceListData: res.data.responseData })


      })
      .catch((data) => {

      });



  }

  handleTicketSource = (e) => {

    let subjectvalue = e;
    this.setState({
      selectedSourceRadio: subjectvalue,
    });
    setTimeout(() => {
      if (this.state.selectedSourceRadio === 'yes') {
        this.setState({ showSourceList: true })
        // this.getSourceTicketList();

      } else {
        this.setState({ showSourceList: false, overlaySourceTicketName: '' })
      }

    }, 1);
  };




  handleEditTicketSource = (e) => {
    // //
    let subjectvalue = e;
    // this.setState({
    //   selectedSourceRadio: subjectvalue,
    // });
    setTimeout(() => {
      if (subjectvalue === 'yes') {
        this.setState({ showSourceEditList: true })
        this.setState(prevState => ({
          userEditData: {                   // object that we want to update
            ...prevState.userEditData,    // keep all other key-value pairs
            isTicketAssignment: true,      // update the value of specific key
          }
        }))
        this.state.userEditData.isTicketAssignment = true;
        // this.getSourceTicketList();
      } else {
        this.setState({
          showSourceEditList: false,
          //  Object.keys(userEditData.isTicketAssignment) :false,
        })
        this.setState(prevState => ({
          userEditData: {                   // object that we want to update
            ...prevState.userEditData,    // keep all other key-value pairs
            isTicketAssignment: false,      // update the value of specific key
          }
        }))
        //  this.state.userEditData.isTicketAssignment=false;
      }

    }, 1);
  };



  editAgentValue = (datar, e) => {
    let subjectvalue = e.currentTarget.checked;
    this.setState({ editSupervisorRadio: false, editAgentRadio: subjectvalue });
    setTimeout(() => {
      if (this.state.editAgentRadio === true) {
        this.handleGetAgentList(datar);
      }
    }, 1);
  };

  editSuperValue = (datar, e) => {
    let subjectvalue = e.currentTarget.checked;
    this.setState({ editAgentRadio: false, editSupervisorRadio: subjectvalue });
    setTimeout(() => {
      if (this.state.editSupervisorRadio === true) {
        this.handleGetAgentList(datar);
      }
    }, 1);
  };

  setEscn = (e) => {
    this.setState({ [e.target.name]: e.currentTarget.checked });
  };

  editsetEscn = (e) => {
    var name = e.target.name;
    var value = e.target.checked;
    var data = e.currentTarget.checked;
    var data = this.state.userEditData;
    data[name] = value;
    this.setState({ EditTemp: data });
  };

  handleOnChangeEditData = (e) => {
    var name = e.target.name;
    var value = e.target.value;

    var data = this.state.userEditData;
    data[name] = value;

    if (name === "email_ID") {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (e.target.value === "") {
        this.setState({
          editEmailFlag: true,
        });
      } else if (reg.test(e.target.value) === false) {
        this.setState({
          editEmailFlag: false,
        });
      } else {
        this.setState({
          editEmailFlag: true,
        });
      }
    }

    this.setState({
      EditTemp: data,
    });
  };

  hanldeMobileNoChange = (e) => {
    var name = e.target.name;
    var reg = /^[0-9\b]+$/;
    if (name === "mobile_Number") {
      if (e.target.value === "" || reg.test(e.target.value)) {
        var value = e.target.value;

        var data = this.state.userEditData;
        data[name] = value;
        this.setState({ EditTemp: data });
      } else {
        e.target.value = "";
      }
      if (e.target.value.length === 12 || e.target.value.length === 10 || e.target.value.length === 0) {
        this.setState({
          EditPhoneFlag: true,
        });
      } else {
        this.setState({
          EditPhoneFlag: false,
        });
      }
    } else {
      if (e.target.value === "" || reg.test(e.target.value)) {
        this.setState({
          [e.target.name]: e.target.value,
          mobileValidation: "",
        });
      } else {
        e.target.value = "";
      }
      if (e.target.value.length === 12 || e.target.value.length === 10 || e.target.value.length === 0) {
        this.setState({
          phoneFlag: true,
        });
      } else {
        this.setState({
          phoneFlag: false,
        });
      }
    }
  };

  handleOnChangeUserData = (e) => {
    var name = e.target.name;
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (name === "selectEmail") {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (e.target.value === "") {
        this.setState({
          emailFlag: true,
        });
      } else if (reg.test(e.target.value) === false) {
        this.setState({
          emailFlag: false,
        });
      } else {
        this.setState({
          emailFlag: true,
        });
      }
    }
  };
  handleReporteeDesgnDropDown(data2, e) {
    this.setState({
      [e.target.name]: e.target.value,
    });

    setTimeout(() => {
      if (this.state.selectedReporteeDesign) {
        this.handleGetReportTOList(data2);
      }
    }, 1);
  }
  handleEditReporteeDesgnDropDown(data2, e) {
    var name = e.target.name;
    var value = e.target.value;

    var data = this.state.userEditData;
    data[name] = value;
    data.reportee_ID = 0;

    this.setState({
      EditTemp: data,
    });

    setTimeout(() => {
      if (parseInt(this.state.userEditData.reporteeDesignation_ID)) {
        this.handleGetReportTOList(data2);
      } else {
        let userEditData = this.state.userEditData;
        userEditData.reportee_ID = 0;
        this.setState({
          ReportToData: [],
          userEditData,
        });
      }
    }, 1);
  }
  handleDesination = (data1, e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    setTimeout(() => {
      if (this.state.selectedDesignation) {
        this.handleGetReporteedesignationList(data1);
      }
    }, 1);
  };
  handleEditDesination = (data1, e) => {
    e.preventDefault();
    e.stopPropagation();
    var name = e.target.name;
    var value = e.target.value;

    var data = this.state.userEditData;
    data[name] = value;

    this.setState({
      EditTemp: data,
    });
    setTimeout(() => {
      if (parseInt(this.state.userEditData.designation_ID)) {
        this.handleGetReporteedesignationList(data1);
      } else {
        let userEditData = this.state.userEditData;
        userEditData.reporteeDesignation_ID = 0;
        userEditData.reportee_ID = 0;
        this.setState({
          ReporteeDesignData: [],
          ReportToData: [],
          userEditData,
        });
      }
    }, 1);
  };

  handleGetCRMRoleList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CRMRole/GetCRMRoleDropdown",
      headers: authHeader(),
    })
      .then(function (res) {
        let crmroledata = res.data.responseData;
        self.setState({
          CRMRoleData: crmroledata,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }
  editMethod() {
    this.setState({
      personalReadOnly: false,
      buttonToggle: true,
    });
  }
  editProfileMethod() {
    this.setState({
      profileReadOnly: false,
      buttonProfileToggle: true,
    });
  }
  handleGetDesignationList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Designation/GetDesignationList",
      headers: authHeader(),
    })
      .then(function (res) {
        let designationdata = res.data.responseData;

        self.setState({
          DesignationData: designationdata,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetReporteedesignationList(data1, designationID) {
    let self = this;
    let id;
    if (data1 === "add") {
      id = this.state.selectedDesignation;
    } else if (data1 === "edit") {
      id = designationID
        ? designationID
        : this.state.userEditData.designation_ID;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Designation/GetReporteeDesignation",
      headers: authHeader(),
      params: {
        DesignationID: id,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            ReporteeDesignData: data,
          });
        } else {
          self.setState({
            ReporteeDesignData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetReportTOList(data2, reporteeDesignationID) {
    let self = this;
    let id;
    if (data2 === "add") {
      id = this.state.selectedReporteeDesign;
    } else if (data2 === "edit") {
      id = reporteeDesignationID
        ? reporteeDesignationID
        : this.state.userEditData.reporteeDesignation_ID;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Designation/GetReportTo",
      headers: authHeader(),
      params: {
        DesignationID: id,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            ReportToData: data,
          });
        } else {
          self.setState({
            ReportToData: [],
          });
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
  handleGetCategoryList(data, brandIds) {
    // //
    let self = this;
    var finalBrandId = "";
    if (data === "add") {
      finalBrandId = this.state.indibrandName;
    } else if (data === "edit") {
      finalBrandId = brandIds ? brandIds : this.state.editIndibrandName;
    }

    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryListByMultiBrandID",
      headers: authHeader(),
      params: {
        BrandIDs: finalBrandId,
      },
    })
      .then(function (res) {
        var status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            CategoryData: data,
            multibrandIDs: finalBrandId,
          });
        } else {
          self.setState({
            CategoryData: [],
            multibrandIDs: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetSubCategoryList(data, categoryIds) {
    let self = this;
    var finalCategoryId = "";
    if (data === "add") {
      finalCategoryId = this.state.indiCampaignName;
    } else if (data === "edit") {
      finalCategoryId = categoryIds
        ? categoryIds
        : this.state.editIndiCategoryName;
    }

    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/GetSubCategoryByMultiCategoryID",
      headers: authHeader(),
      params: {
        CategoryIDs: finalCategoryId,
      },
    })
      .then(function (res) {
        var status = res.data.message;
        var data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            SubCategoryData: data,
            multicategoryIDs: finalCategoryId,
          });
        } else {
          self.setState({
            SubCategoryData: [],
            multicategoryIDs: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetIssueTypeList(data, subCategoryIDs) {
    let self = this;
    var finalSubCategoryId = "";

    if (data === "add") {
      finalSubCategoryId = this.state.indiSubCampaignName;
    } else if (data === "edit") {
      finalSubCategoryId = subCategoryIDs
        ? subCategoryIDs
        : this.state.editIndiSubCategoryName;
    }

    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/GetIssueTypeListByMultiSubCategoryID",
      headers: authHeader(),
      params: {
        SubCategoryIDs: finalSubCategoryId,
      },
    })
      .then(function (res) {
        var status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            IssueTypeData: data,
            multisubcategoryIDs: finalSubCategoryId,
          });
        } else {
          self.setState({
            IssueTypeData: [],
            multisubcategoryIDs: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetAgentList(datar) {
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/getagentlist",
      headers: authHeader(),
      params: {
        TicketID: 0, // Don't change this value (Set on API side)
      },
    })
      .then(function (res) {
        var array = [];
        var agentdata = res.data.responseData;
        var addvalue1 = self.state.selectedAgentRadio;
        var addvalue2 = self.state.selectedSupervisorRadio;
        var editvalue1 = self.state.editAgentRadio;
        var editvalue2 = self.state.editSupervisorRadio;
        if (datar === "add") {
          if (addvalue1 === true) {
            array = agentdata.filter((a) => a.designation === "Agent");
          } else if (addvalue2 === true) {
            array = agentdata.filter((a) => a.designation === "Supervisor");
          }
        } else if (datar === "edit") {
          if (editvalue1 === true) {
            array = agentdata.filter((a) => a.designation === "Agent");
          } else if (editvalue2 === true) {
            array = agentdata.filter((a) => a.designation === "Supervisor");
          }
        }

        self.setState({ AgentData: array });
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetUserList() {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/User/GetUserListData",
      headers: authHeader(),
    })
      .then(function (res) {
        var userdata = res.data.responseData;
        var status = res.data.message;
        if (status === "Success") {
          self.setState({
            userData: userdata,
          });
        } else {
          self.setState({
            userData: [],
          });
        }

        if (userdata !== null) {
          self.state.sortAllData = userdata;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < userdata.length; i++) {
            if (
              !unique[userdata[i].designation] &&
              userdata[i].designation !== ""
            ) {
              distinct.push(userdata[i].designation);
              unique[userdata[i].designation] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortDesignation.push({
              designation: distinct[i],
            });
            self.state.sortFilterDesignation.push({
              designation: distinct[i],
            });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < userdata.length; i++) {
            if (!unique[userdata[i].userName] && userdata[i].userName !== "") {
              distinct.push(userdata[i].userName);
              unique[userdata[i].userName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortUsername.push({
              userName: distinct[i],
            });
            self.state.sortFilterUsername.push({
              userName: distinct[i],
            });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < userdata.length; i++) {
            if (
              !unique[userdata[i].mobileNumber] &&
              userdata[i].mobileNumber !== ""
            ) {
              distinct.push(userdata[i].mobileNumber);
              unique[userdata[i].mobileNumber] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortMobile.push({
              mobileNumber: distinct[i],
            });
            self.state.sortFilterMobile.push({
              mobileNumber: distinct[i],
            });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < userdata.length; i++) {
            if (!unique[userdata[i].emailID] && userdata[i].emailID !== "") {
              distinct.push(userdata[i].emailID);
              unique[userdata[i].emailID] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortEmail.push({
              emailID: distinct[i],
            });
            self.state.sortFilterEmail.push({
              emailID: distinct[i],
            });
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetUserListByID(id) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserDetailsById",
      headers: authHeader(),
      params: {
        UserID: id,
      },
    })
      .then(function (res) {
        var status = res.data.message;
        var userdata = res.data.responseData;
        if (status === "Success") {
          self.setState({
            GetUserData: userdata,
          });

          self.setUserEditData(userdata, id);
        } else {
          self.setState({
            GetUserData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleValidationEmailIdMob() {
    const TranslationContext = this.state.translateLanguage.default;

    if (
      this.state.selectUserName.length > 0 &&
      this.state.selectFirstName.length > 0 &&
      this.state.selectMobile.length > 0 &&
      this.state.selectEmail.length > 0 &&
      this.state.emailFlag === true &&
      this.state.phoneFlag === true
    ) {
      this.state.emailValidation = "";
      this.state.mobileValidation = "";
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/User/validateUserExist",
        headers: authHeader(),
        params: {
          UserEmailID: this.state.selectEmail,
          UserMobile: this.state.selectMobile,
        },
      })
        .then(function (res) {
          var status = res.data.message;
          var userdata = res.data.responseData;
          if (status === "Success") {
            if (userdata === "Email Id already exist!") {
              self.setState({
                emailValidation: "Email Id already exist!",
              });
            } else if (userdata === "Phone number already exist!") {
              self.setState({
                mobileValidation: "Phone number already exist!",
              });
            } else if (
              userdata === "Email Id and Phone number both are already exist!"
            ) {
              self.setState({
                emailValidation: "Email Id already exist!",
                mobileValidation: "Phone number already exist!",
              });
            } else if (userdata === "Not Exist") {
              self.handleAddPersonalDetails();
            }
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        usernameCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseenterusername
            : "Please enter user name.",
        firstnameCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseenterfirstname
            : "Please enter first name.",
        mobilenumberCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseentermobilenumber
            : "Please enter mobile number.",
        emailCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.label.pleaseenteremailid
            : "Please enter emailID.",
        passwordCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.label.pleaseenteremailid
            : "Please enter password.",
      });
    }
  }

  handleAddPersonalDetails() {
    const TranslationContext = this.state.translateLanguage.default;

    if (
      this.state.selectUserName.length > 0 &&
      this.state.selectFirstName.length > 0 &&
      this.state.selectMobile.length > 0 &&
      this.state.selectEmail.length > 0
    ) {
      let self = this;
      var json = {
        UserName: this.state.selectUserName.trim(),
        FirstName: this.state.selectFirstName.trim(),
        LastName: this.state.selectLastName.trim(),
        MobileNo: this.state.selectMobile.trim(),
        EmailID: this.state.selectEmail.trim(),
      };
      axios({
        method: "post",
        url: config.apiUrl + "/User/AddUserPersonalDetail",
        headers: authHeader(),
        data: json,
      })
        .then(function (res) {
          let id = res.data.responseData;
          let Msg = res.data.message;
          if (Msg === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordsavedsuccessfully
                : "Record saved successfully"
            );
            self.setState({
              getID: id,
              personalReadOnly: true,
              profileBtnDisabled: false,
            });
            self.handleGetUserList();
          } else {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordnotsaved
                : "Record Not Saved"
            );
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        usernameCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseenterusername
            : "Please enter user name.",
        firstnameCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseenterfirstname
            : "Please enter first name.",
        mobilenumberCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseentermobilenumber
            : "Please enter mobile number.",
        emailCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.label.pleaseenteremailid
            : "Please enter emailID.",
      });
    }
  }

  handleEditPersonalDetails() {
    const TranslationContext = this.state.translateLanguage.default;
    if (
      this.state.selectUserName.length > 0 &&
      this.state.selectFirstName.length > 0 &&
      this.state.selectMobile.length > 0 &&
      this.state.selectEmail.length > 0
    ) {
      let self = this;
      var id = this.state.getID;
      var json = {
        UserName: this.state.selectUserName,
        FirstName: this.state.selectFirstName,
        LastName: this.state.selectLastName,
        MobileNo: this.state.selectMobile,
        EmailID: this.state.selectEmail,
        UserID: id,
      };
      axios({
        method: "post",
        url: config.apiUrl + "/User/EditUserPersonalDetail",
        headers: authHeader(),
        data: json,
      })
        .then(function (res) {
          let Msg = res.data.message;
          if (Msg === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordupdatedsuccessfully
                : "Record updated successfully"
            );
          } else {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordnotupdated
                : "Record Not Updated"
            );
          }
          self.setState({
            getID: id,
            personalReadOnly: true,
          });
          self.handleGetUserList();
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        usernameCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseenterusername
            : "Please enter user name.",
        firstnameCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseenterfirstname
            : "Please enter first name.",
        mobilenumberCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseentermobilenumber
            : "Please enter mobile number.",
        emailCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.label.pleaseenteremailid
            : "Please enter emailID.",
      });
    }
  }

  handleAddProfileDetails() {
    const TranslationContext = this.state.translateLanguage.default;
    if (
      this.state.selectedDesignation > 0 &&
      (this.state.selectedReporteeDesign > 0 ||
        this.state.selectedReporteeDesign == -1) &&
      (this.state.selectedReportTO > 0 || this.state.selectedReportTO == -1)
    ) {
      let self = this;
      let id = this.state.getID;
      axios({
        method: "post",
        url: config.apiUrl + "/User/AddUserProfileDetail",
        headers: authHeader(),
        params: {
          UserID: id,
          DesignationID: this.state.selectedDesignation,
          ReportTo:
            this.state.selectedReportTO == -1 ? 0 : this.state.selectedReportTO,
        },
      })
        .then(function (res) {
          let Msg = res.data.message;
          if (self.state.buttonProfileToggle === true) {
            if (Msg === "Success") {
              NotificationManager.success(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.recordupdatedsuccessfully
                  : "Record updated successfully"
              );
              self.setState({
                mappedCategoryBtnDisabled: false,
              });
            } else {
              NotificationManager.error(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.pleaseaddpersonaldetails
                  : "Please Add Personal Details"
              );
            }
          } else {
            if (Msg === "Success") {
              NotificationManager.success(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.recordsavedsuccessfully
                  : "Record saved successfully"
              );
              self.setState({
                getID: id,
                profileReadOnly: true,
                mappedCategoryBtnDisabled: false,
              });
              self.handleGetUserList();
            } else {
              NotificationManager.error(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.pleaseaddpersonaldetails
                  : "Please Add Personal Details"
              );
            }
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        userdesignCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectdesignation
            : "Please select designation.",
        reporteeDesignCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectreporteedesignation
            : "Please select reportee designation.",
        reportToCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectreportee
            : "Please select reportee.",
      });
    }
  }

  handleAddMapCategory() {
    //
    const TranslationContext = this.state.translateLanguage.default;

    var radiob = true;
    var agentb = true;
    if (this.state.selectedAssignEscalation === true) {
      if (
        this.state.selectedSupervisorRadio !== true &&
        this.state.selectedAgentRadio !== true
      ) {
        radiob = false;
      } else {
        radiob = true;
      }
    }
    if (this.state.selectedAgentRadio === true) {
      if (
        this.state.selectedAgent === 0 ||
        this.state.selectedAgent === "Select Agent"
      ) {
        agentb = false;
      } else {
        agentb = true;
      }
    }
    if (
      this.state.indibrandName !== "" &&
      // this.state.overlaySourceTicketName !== "" &&
      this.state.indiCampaignName !== "" &&
      this.state.indiSubCampaignName !== "" &&
      this.state.indiIssueTypeName !== "" &&
      this.state.selectedCRMRoles > 0 &&
      radiob === true &&
      agentb === true
    ) {
      let self = this;
      var finalIssueTypeId = "";

      finalIssueTypeId = this.state.indiIssueTypeName;

      var activeStatus = false;
      var copyescn = false;
      var assignescn = false;
      var SuperAgent = false;
      var superAgentValue = this.state.selectedAgentRadio;
      if (superAgentValue === true) {
        SuperAgent = true;
      } else {
        SuperAgent = false;
      }
      var CopyE = this.state.selectedCopyEscalation;
      var AssignE = this.state.selectedAssignEscalation;
      if (CopyE === true && AssignE === false) {
        copyescn = true;
        assignescn = false;
      } else if (CopyE === false && AssignE === true) {
        copyescn = false;
        assignescn = true;
      } else if (CopyE === true && AssignE === true) {
        copyescn = true;
        assignescn = true;
      } else if (CopyE === false && AssignE === false) {
        copyescn = false;
        assignescn = false;
      }

      var status = this.state.selectedStatus;
      if (status === "true") {
        activeStatus = true;
      } else {
        activeStatus = false;
      }
      var brand = this.state.multibrandIDs.substring(
        0,
        this.state.multibrandIDs.length - 1
      );
      var category = this.state.multicategoryIDs.substring(
        0,
        this.state.multicategoryIDs.length - 1
      );
      var subcat = this.state.multisubcategoryIDs.substring(
        0,
        this.state.multisubcategoryIDs.length - 1
      );
      var issue = finalIssueTypeId.substring(",", finalIssueTypeId.length - 1);
      var json = {
        UserId: this.state.getID,
        BrandIds: brand,
        TickeAssignSource: this.state.overlaySourceTicketName.slice(0, -1),
        categoryIds: category,
        subCategoryIds: subcat,
        IssuetypeIds: issue,
        RoleID: this.state.selectedCRMRoles,
        IsCopyEscalation: copyescn,
        IsAssignEscalation: assignescn,
        IsAgent: SuperAgent,
        IsActive: activeStatus,
        EscalateAssignToId: this.state.selectedAgent,
      };
      console.log('jsonDataIs', json)
      axios({
        method: "post",
        url: config.apiUrl + "/User/Mapcategory",
        headers: authHeader(),
        data: json,
      })
        .then(function (res) {
          let Msg = res.data.message;
          if (Msg === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.usercreatedsuccessfully
                : "User Created successfully"
            );
            self.handleSendMail(self.state.getID);
          } else {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.usernotcreated
                : "User Not Created"
            );
          }
          self.setState({
            selectUserName: "",
            selectFirstName: "",
            selectLastName: "",
            selectMobile: "",
            selectEmail: "",
            selectedDesignation: 0,
            selectedReporteeDesign: 0,
            selectedReportTO: 0,
            indibrandName: "",
            indiCampaignName: "",
            indiSubCampaignName: "",
            indiIssueTypeName: "",
            selectedCRMRoles: 0,
            selectedCopyEscalation: false,
            selectedAssignEscalation: false,
            selectedSupervisorAgent: "",
            selectedAgent: 0,
            selectedStatus: "",
            buttonToggle: false,
            buttonProfileToggle: false,
            personalReadOnly: false,
            profileReadOnly: false,
            getID: 0,
            brandCompulsion: "",
            sourceComplusion: '',
            categoryCompulsion: "",
            subcategoryCompulsion: "",
            isuuetypeCompulsion: "",
            crmroleCompulsion: "",
            copyescCompulsion: "",
            assignescCompulsion: "",
            agentCompulsion: "",
          });
          self.handleGetUserList();
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        brandCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectbrands
            : "Please select brands.",
        sourceComplusion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectbrands
            : "Please select source.",
        categoryCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectcategory
            : "Please select category.",
        subcategoryCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectsubcategory
            : "Please select subcategory.",
        isuuetypeCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectissuetype
            : "Please select issuetype.",
        crmroleCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectcrmroles
            : "Please select  crm roles.",
        RadioCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectanyoption
            : "Please select any option.",
        agentCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectagent
            : "Please select agent.",
      });
    }
  }

  handleDeleteUser(id) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/DeleteUser",
      headers: authHeader(),
      params: {
        userID: id,
      },
    })
      .then(function (res) {
        let Msg = res.data.message;
        if (Msg === "Record In use") {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordinuse
              : "Record in use"
          );
        } else if (Msg === "Record deleted Successfully") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recorddeletedsuccessfully
              : "Record Deleted Successfully"
          );
          self.handleGetUserList();
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleSendMail(id) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/User/SendMailforchangepassword",
      headers: authHeader(),
      params: {
        userID: id,
      },
    })
      .then(function (res) {
        let reportto = res.data.responseData;
        if (reportto === "Mail sent successfully") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.pleasecheckemail
              : "Please Check Email"
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleUpdateUser() {
     //
    const TranslationContext = this.state.translateLanguage.default;
    var radiob = true;
    var agentb = true;
    if (this.state.userEditData.is_Assign_Escalation === true) {
      if (
        this.state.editSupervisorRadio !== true &&
        this.state.editAgentRadio !== true
      ) {
        radiob = false;
      } else {
        radiob = true;
      }
    }
    if (this.state.editAgentRadio === true) {
      if (
        this.state.userEditData.assign_ID === 0 ||
        this.state.userEditData.assign_ID === "Select Agent"
      ) {
        agentb = false;
      } else {
        agentb = true;
      }
    }

    if (
      this.state.userEditData.selectUserName.length > 0 &&
      this.state.userEditData.first_Name.length > 0 &&
      this.state.userEditData.mobile_Number.length > 0 &&
      this.state.userEditData.email_ID.length > 0 &&
      // this.state.userEditData.userCode.length > 0 &&
      this.state.userEditData.designation_ID > 0 &&
      (this.state.userEditData.reporteeDesignation_ID > 0 ||
        this.state.userEditData.reporteeDesignation_ID == -1) &&
      (this.state.userEditData.reportee_ID > 0 ||
        this.state.userEditData.reportee_ID == -1) &&
      this.state.editIndibrandName !== "" &&
      // this.state.editOverlaySourceTicketName !== "" &&
      this.state.editIndiCategoryName !== "" &&
      this.state.editIndiSubCategoryName !== "" &&
      this.state.editIndiIssueTypeName !== "" &&
      this.state.userEditData.role_ID > 0 &&
      this.state.editEmailFlag === true &&
      this.state.EditPhoneFlag === true &&
      radiob === true &&
      agentb === true
    ) {
      let self = this;
      var finalBrandId = "";
      var finalCategoryId = "";
      var finalSubCategoryId = "";
      var finalIssueTypeId = "";
      var copyescn = false;
      var assignescn = false;
      var activeStatus = false;

      finalBrandId = this.state.editIndibrandName; /// brand Ids

      // finalSourceId = this.state.editOverlaySourceTicketName; /// Source Ids

      finalCategoryId = this.state.editIndiCategoryName; /// category Ids

      finalSubCategoryId = this.state.editIndiSubCategoryName; /// sub category Ids

      finalIssueTypeId = this.state.editIndiIssueTypeName; /// Issue type Ids

      var CopyE = this.state.userEditData.is_Copy_Escalation;
      var AssignE = this.state.userEditData.is_Assign_Escalation;
      if (CopyE === true && AssignE === false) {
        copyescn = true;
        assignescn = false;
      } else if (CopyE === false && AssignE === true) {
        copyescn = false;
        assignescn = true;
      } else if (CopyE === true && AssignE === true) {
        copyescn = true;
        assignescn = true;
      } else if (CopyE === false && AssignE === false) {
        copyescn = false;
        assignescn = false;
      }
      var SuperAgent = false;

      var superAgentValue = this.state.editAgentRadio;
      if (superAgentValue === true) {
        SuperAgent = true;
      } else {
        SuperAgent = false;
      }

      var status = this.state.userEditData.is_Active;
      if (status === "true") {
        activeStatus = true;
      } else {
        activeStatus = false;
      }

      var json = {
        UserID: this.state.userEditData.userId,
        DesignationID: this.state.userEditData.designation_ID,
        ReporteeID:
          this.state.userEditData.reportee_ID == -1
            ? 0
            : this.state.userEditData.reportee_ID,
        UserName: this.state.userEditData.selectUserName,
        EmailID: this.state.userEditData.email_ID,
        MobileNo: this.state.userEditData.mobile_Number,
        FirstName: this.state.userEditData.first_Name,
        LastName: this.state.userEditData.last_Name,
        UserCode: this.state.userEditData.userCode,
        isTicketAssignment:this.state.userEditData.isTicketAssignment,
        BrandIds:
          this.state.userEditData.brandIDs.length !== finalBrandId.length
            ? finalBrandId.replace(/,\s*$/, "") //finalBrandId.substring(",", finalBrandId.length - 1)
            : this.state.userEditData.brandIDs,
        ticktAssignmentSource: this.state.editOverlaySourceTicketName,
        categoryIds:
          this.state.userEditData.categoryIDs.length !== finalCategoryId.length
            ? finalCategoryId.replace(/,\s*$/, "")//finalCategoryId.substring(",", finalCategoryId.length - 1)
            : this.state.userEditData.categoryIDs,
        subCategoryIds:
          this.state.userEditData.subCategoryIDs.length !==
            finalSubCategoryId.length
            ? finalSubCategoryId.replace(/,\s*$/, "")//finalSubCategoryId.substring(",", finalSubCategoryId.length - 1)
            : this.state.userEditData.subCategoryIDs,
        IssuetypeIds:
          this.state.userEditData.issueTypeIDs.length !==
            finalIssueTypeId.length
            ? finalIssueTypeId.replace(/,\s*$/, "")//finalIssueTypeId.substring(",", finalIssueTypeId.length - 1)
            : this.state.userEditData.issueTypeIDs,
        RoleID: this.state.userEditData.role_ID,
        IsCopyEscalation: copyescn,
        IsAssignEscalation: assignescn,
        IsAgent: SuperAgent,
        EscalateAssignToId: this.state.userEditData.assign_ID,
        IsActive: activeStatus,
      };
      axios({
        method: "post",
        url: config.apiUrl + "/User/EditUserDetails",
        headers: authHeader(),
        data: json,
      })
        .then(function (res) {
          let Msg = res.data.message;
          if (Msg === "Success") {
            self.closeEditModal();
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordupdatedsuccessfully
                : "Record updated successfully"
            );
            if (self.state.GetUserData.isActive === false) {
              self.handleSendMail(self.state.userEditData.userId);
            }
            self.setState({
              multibrandIDs: finalBrandId,
              multicategoryIDs: finalCategoryId,
              multisubcategoryIDs: finalSubCategoryId,
            });
          } else {
            self.closeEditModal();
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordnotupdated
                : "Record Not Updated"
            );
          }
          self.handleGetUserList();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({
        editusernameCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseenterusername
            : "Please enter user name.",
        editfirstnameCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseenterfirstname
            : "Please enter first name.",
        editmobilenumberCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseentermobilenumber
            : "Please enter mobile number.",
        editemailCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.label.pleaseenteremailid
            : "Please enter emailID.",
        editusercodeCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.label.pleaseenteremailid
            : "Please enter usercode.",
        edituserdesignCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectdesignation
            : "Please select designation.",
        editreporteeDesignCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectreporteedesignation
            : "Please select reportee designation.",
        editreportToCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectreportee
            : "Please select reportee.",
        editbrandCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectbrands
            : "Please select brands.",
        editcategoryCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectcategory
            : "Please select category.",
        editsubcategoryCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectsubcategory
            : "Please select subcategory.",
        editisuuetypeCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectissuetype
            : "Please select issuetype.",
        editcrmroleCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectcrmroles
            : "Please select  crm roles.",
        editRadioCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectanyoption
            : "Please select any option.",
        editagentCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectagent
            : "Please select agent.",
      });
    }
  }
  // Onchange tab Profile to Personal tab
  handleChangePersonalTab = () => {
    const TranslationContext = this.state.translateLanguage.default;
    if (
      this.state.userEditData.selectUserName.length > 0 &&
      this.state.userEditData.first_Name.length > 0 &&
      this.state.userEditData.mobile_Number.length > 0 &&
      this.state.userEditData.email_ID.length > 0
    ) {
      this.setState({
        selTab:
          TranslationContext !== undefined
            ? TranslationContext.label.profiledetails
            : "Profile Details",
      });
    } else {
      this.setState({
        editusernameCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseenterusername
            : "Please enter user name.",
        editfirstnameCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseenterfirstname
            : "Please enter first name.",
        editmobilenumberCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseentermobilenumber
            : "Please enter mobile number.",
        editemailCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.label.pleaseenteremailid
            : "Please enter emailID.",
      });
    }
  };
  // Onchange tab Personal to Mapped tab
  handleChangeProfileTab = () => {
    const TranslationContext = this.state.translateLanguage.default;

    if (
      this.state.userEditData.designation_ID > 0 &&
      (this.state.userEditData.reporteeDesignation_ID > 0 ||
        this.state.userEditData.reporteeDesignation_ID == -1) &&
      (this.state.userEditData.reportee_ID > 0 ||
        this.state.userEditData.reportee_ID == -1 ||
        (this.state.userEditData.reportee_ID !== 0 &&
          this.state.userEditData.reportee_ID !== "0"))
    ) {
      this.setState({
        selTab:
          TranslationContext !== undefined
            ? TranslationContext.a.mappedcategory
            : "Mapped Category",
      });
    } else {
      this.setState({
        edituserdesignCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectdesignation
            : "Please select designation.",
        editreporteeDesignCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectreporteedesignation
            : "Please select reportee designation.",
        editreportToCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectreportee
            : "Please select reportee.",
      });
    }
  };

  fileUpload = (e) => {
    var allFiles = [];
    var selectedFiles = e;
    if (selectedFiles) {
      allFiles.push(selectedFiles[0]);

      var fileSize = formatSizeUnits(selectedFiles[0].size);
      this.setState({
        fileSize,
        fileN: allFiles,
        fileName: allFiles[0].name,
        bulkuploadCompulsion: "",
      });
    }
  };
  fileDrop = (e) => {
    this.setState({ fileName: e.dataTransfer.files[0].name });
    e.preventDefault();
  };
  fileDragOver = (e) => {
    e.preventDefault();
  };
  fileDragEnter = (e) => {
    e.preventDefault();
  };

  filteTextChange(e) {
    this.setState({ filterTxtValue: e.target.value });

    if (this.state.sortColumn === "designation") {
      var sortFilterDesignation = matchSorter(
        this.state.sortDesignation,
        e.target.value,
        { keys: ["designation"] }
      );
      if (sortFilterDesignation.length > 0) {
        this.setState({ sortFilterDesignation });
      } else {
        this.setState({ sortFilterDesignation: this.state.sortDesignation });
      }
    }
    if (this.state.sortColumn === "userName") {
      var sortFilterUsername = matchSorter(
        this.state.sortUsername,
        e.target.value,
        { keys: ["userName"] }
      );
      if (sortFilterUsername.length > 0) {
        this.setState({ sortFilterUsername });
      } else {
        this.setState({
          sortFilterUsername: this.state.sortUsername,
        });
      }
    }
    if (this.state.sortColumn === "mobileNumber") {
      var sortFilterMobile = matchSorter(
        this.state.sortMobile,
        e.target.value,
        { keys: ["mobileNumber"] }
      );
      if (sortFilterMobile.length > 0) {
        this.setState({ sortFilterMobile });
      } else {
        this.setState({
          sortFilterMobile: this.state.sortMobile,
        });
      }
    }
    if (this.state.sortColumn === "emailID") {
      var sortFilterEmail = matchSorter(this.state.sortEmail, e.target.value, {
        keys: ["emailID"],
      });
      if (sortFilterEmail.length > 0) {
        this.setState({ sortFilterEmail });
      } else {
        this.setState({
          sortFilterEmail: this.state.sortEmail,
        });
      }
    }
  }

  handleDeleteBulkupload = (e) => {
    const TranslationContext = this.state.translateLanguage.default;

    this.setState({
      fileN: [],
      fileName: "",
      isOpen: false,
    });
    NotificationManager.success(
      TranslationContext !== undefined
        ? TranslationContext.alertmessage.filedeletedsuccessfully
        : "File deleted successfully."
    );
  };
  hanldeAddBulkUpload() {
    const TranslationContext = this.state.translateLanguage.default;

    if (this.state.fileN.length > 0 && this.state.fileN !== []) {
      if (this.state.fileN[0].path.split(".")[1] === "csv") {
        let self = this;
        this.setState({
          bulkuploadLoading: true,
        });
        const formData = new FormData();

        formData.append("file", this.state.fileN[0]);
        axios({
          method: "post",
          url: config.apiUrl + "/User/BulkUploadUser",
          headers: authHeader(),
          data: formData,
        })
          .then(function (res) {
            let status = res.data.message;
            let data = res.data.responseData;
            if (status === "Success") {
              NotificationManager.success(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.fileuploadedsuccessfully
                  : "File uploaded successfully."
              );
              self.setState({
                fileName: "",
                fileSize: "",
                fileN: [],
                bulkuploadLoading: false,
              });
              self.handleGetUserList();
            } else {
              self.setState({
                showProgress: false,
                bulkuploadLoading: false,
              });
              NotificationManager.error(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.filenotuploaded
                  : "File not uploaded."
              );
            }
          })
          .catch((data) => {
            if (data.message) {
              this.setState({
                showProgress: false,
                isFileUploadFail: true,
                bulkuploadLoading: false,
              });
            }
            console.log(data);
          });
      } else {
        NotificationManager.error("Only CSV files allowed.");
      }
    } else {
      this.setState({
        bulkuploadCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectfile
            : "Please select file.",
      });
    }
  }
  updateUploadProgress(value) {
    this.setState({ progressValue: value });
  }


  handleBrandNameButton = () => {
    let ShowOriginal = this.state.BrandNameShow;
    let BrandNameShow = !ShowOriginal;
    let userOvrlayShowOriginal = this.state.brandNameOvrlayShow;
    let brandNameOvrlayShow = !userOvrlayShowOriginal;
    this.setState({
      BrandNameShow,
      brandNameOvrlayShow,
    });
  };

  // overlay source name
  handleSourceNameButton = () => {
    let ShowOriginal = this.state.sourceNameShow;
    let sourceNameShow = !ShowOriginal;
    let userOvrlayShowOriginal = this.state.sourceNameOvrlayShow;
    let sourceNameOvrlayShow = !userOvrlayShowOriginal;
    this.setState({
      sourceNameShow,
      sourceNameOvrlayShow,
    });
  };

  /// hanlde select Individual brand name
  selectIndividualBrandName = async (brandId, event) => {
    var indibrandName = this.state.indibrandName;
    var separator = ",";
    var values = indibrandName.split(separator);
    if (event.target.checked) {
      var flag = values.includes(brandId.toString());
      if (!flag) {
        values.unshift(brandId);
        indibrandName = values.join(separator);
      }
      await this.setState({
        indibrandName,
      });
      document.getElementById("brandNameValue").textContent =
        this.state.indibrandName.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == brandId) {
          values.splice(i, 1);
          indibrandName = values.join(separator);
        }
      }
      await this.setState({
        indibrandName,
      });
      if (this.state.indibrandName.split(",").length - 1 !== 0) {
        document.getElementById("brandNameValue").textContent =
          this.state.indibrandName.split(",").length - 1 + " selected";
      } else {
        document.getElementById("brandNameValue").textContent = "Select";
        document.getElementById("campaignNameValue").textContent = "Select";

        await this.setState({
          SubCategoryData: [],
          indiCampaignName: "",
        });
      }
    }
    setTimeout(() => {
      if (this.state.indibrandName.length > 0) {
        this.handleGetCategoryList("add");
      }
    }, 1);
  };
  /// select all brand
  selectAllBrandName = async (event) => {
    var indibrandName = "";
    var checkboxes = document.getElementsByName("allBrandName");
    document.getElementById("brandNameValue").textContent = "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.brandData !== null) {
      this.state.brandData.forEach(allBrandId);
      function allBrandId(item) {
        indibrandName += item.brandID + ",";
      }
    }
    await this.setState({
      indibrandName,
    });
    setTimeout(() => {
      if (this.state.indibrandName.length > 0) {
        this.handleGetCategoryList("add");
      }
    }, 1);
  };
  /// select no brand
  selectNoBrandName = async (event) => {
    var checkboxes = document.getElementsByName("allBrandName");
    document.getElementById("brandNameValue").textContent = "Select";
    document.getElementById("campaignNameValue").textContent = "Select";
    document.getElementById("subCampaignNameValue").textContent = "Select";
    document.getElementById("issueTypeNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indibrandName: "",
      CategoryData: [],
      SubCategoryData: [],
      indiCampaignName: "",
      indiSubCampaignName: "",
      indiIssueTypeName: "",
      IssueTypeData: [],
    });
  };

  handleSourceTicketName = () => {
    let ShowOriginal = this.state.overlaySourceTicket;
    let overlaySourceTicket = !ShowOriginal;
    let slaOvrlayShowOriginal = this.state.overlaySourceTicketNameShow;
    let overlaySourceTicketNameShow = !slaOvrlayShowOriginal;
    this.setState({
      overlaySourceTicket,
      overlaySourceTicketNameShow,
    });
  };
  /// select All Source code
  selectIndividualSourceName = async (ticketSourceId, event) => {
    var overlaySourceTicketName = this.state.overlaySourceTicketName;
    var separator = ",";
    var values = overlaySourceTicketName.split(separator);
    if (event.target.checked) {
      var flag = values.includes(ticketSourceId.toString());
      if (!flag) {
        values.unshift(ticketSourceId);
        overlaySourceTicketName = values.join(separator);
      }
      await this.setState({
        overlaySourceTicketName,
      });
      document.getElementById("sourceNameValue").textContent =
        this.state.overlaySourceTicketName.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == ticketSourceId) {
          values.splice(i, 1);
          overlaySourceTicketName = values.join(separator);
        }
      }
      await this.setState({
        overlaySourceTicketName,
      });
      if (this.state.overlaySourceTicketName.split(",").length - 1 !== 0) {
        document.getElementById("sourceNameValue").textContent =
          this.state.overlaySourceTicketName.split(",").length - 1 + " selected";
      } else {
        document.getElementById("brandNameValue").textContent = "Select";
        document.getElementById("sourceNameValue").textContent = "Select";
        document.getElementById("campaignNameValue").textContent = "Select";

        await this.setState({
          // sourceListData: [],
          overlaySourceTicketName: "",
        });
      }
    }
  };

  selectAllSourceTicket = async (event) => {
    var overlaySourceTicketName = "";
    var checkboxes = document.getElementsByName("allSourceName");
    document.getElementById("sourceNameValue").textContent = "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.sourceListData !== null) {
      this.state.sourceListData.forEach(allAllSourceId);
      function allAllSourceId(item) {
        overlaySourceTicketName += item.ticketSourceId + ",";
      }
    }
    await this.setState({
      overlaySourceTicketName,
    });
    console.log('overlaySourceTicketName dsdfsadfsadd', overlaySourceTicketName)
  };
  /// select no Source code
  selectNoSourceTicket = async (event) => {
    var checkboxes = document.getElementsByName("allSourceName");
    document.getElementById("brandNameValue").textContent = "Select";
    document.getElementById("sourceNameValue").textContent = "Select";
    document.getElementById("campaignNameValue").textContent = "Select";
    document.getElementById("subCampaignNameValue").textContent = "Select";
    document.getElementById("issueTypeNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indibrandName: "",
      overlaySourceTicketName: '',
      CategoryData: [],
      SubCategoryData: [],
      indiCampaignName: "",
      indiSubCampaignName: "",
      indiIssueTypeName: "",
      IssueTypeData: [],
    });
  };

  //Edit source ticket//
  handleEditSourceTicketName = () => {
    //
    this.setState({
      editOverlaySourceTicket: !this.state.editOverlaySourceTicket,
      editOverlaySourceTicketNameShow: !this.state.editOverlaySourceTicketNameShow

    });
  };

  selectAllEditSourceTicket = async (event) => {
    // //
    var editOverlaySourceTicketName = "";
    var checkboxes = document.getElementsByName("editAllSourceName");
    document.getElementById("editSourceNameValue").textContent = "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }

    if (this.state.sourceListData !== null) {
      this.state.sourceListData.forEach(allAllSourceId);

      function allAllSourceId(item) {

        editOverlaySourceTicketName += item.ticketSourceId + ",";
      }
      editOverlaySourceTicketName = editOverlaySourceTicketName.replace(/,\s*$/, "");
    }
    await this.setState({
      editOverlaySourceTicketName,
    });
  };
  selectNoEditSourceTicket = async (event) => {
    var checkboxes = document.getElementsByName("editAllSourceName");
    document.getElementById("brandNameValue").textContent = "Select";
    document.getElementById("editSourceNameValue").textContent = "Select";
    document.getElementById("campaignNameValue").textContent = "Select";
    document.getElementById("subCampaignNameValue").textContent = "Select";
    document.getElementById("issueTypeNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indibrandName: "",
      editOverlaySourceTicketName: '',
      CategoryData: [],
      SubCategoryData: [],
      indiCampaignName: "",
      indiSubCampaignName: "",
      indiIssueTypeName: "",
      IssueTypeData: [],
    });
  };
  selectIndividualEditSourceName = async (ticketSourceId, event) => {
    // //
    var editOverlaySourceTicketName = this.state.editOverlaySourceTicketName;
    var separator = ",";
    var values = editOverlaySourceTicketName.split(separator);
    if (event.target.checked) {
      var flag = values.includes(ticketSourceId.toString());
      if (!flag) {
        values.unshift(ticketSourceId);
        editOverlaySourceTicketName = values.join(separator);

      }
      editOverlaySourceTicketName = editOverlaySourceTicketName.replace(/,\s*$/, "");
      await this.setState({
        editOverlaySourceTicketName,
      });
      document.getElementById("editSourceNameValue").textContent =
        this.state.editOverlaySourceTicketName.split(",").length + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == ticketSourceId) {
          values.splice(i, 1);
          editOverlaySourceTicketName = values.join(separator);
        }
      }
      await this.setState({
        editOverlaySourceTicketName,
      });
      if (this.state.editOverlaySourceTicketName.split(",").length - 1 !== 0) {
        document.getElementById("editSourceNameValue").textContent =
          this.state.editOverlaySourceTicketName.split(",").length - 1 + " selected";
      } else {
        document.getElementById("brandNameValue").textContent = "Select";
        document.getElementById("editSourceNameValue").textContent = "Select";
        document.getElementById("campaignNameValue").textContent = "Select";

        await this.setState({
          // sourceListData: [],
          editOverlaySourceTicketName: "",
        });
      }
    }
  };

  handleCloseeditOverlaySourceTicket = () => {
    this.setState({
      editOverlaySourceTicket: false,
    })
  }
  //Edit source ticket//

  /// handle select buttons
  handleCampaignNameButton = () => {
    let slaShowOriginal = this.state.campaignNameShow;
    let campaignNameShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.campaignNameOvrlayShow;
    let campaignNameOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      campaignNameShow,
      campaignNameOvrlayShow,
    });
  };
  /// select all campaign
  selectAllCampaignName = async (event) => {
    var indiCampaignName = "";
    var checkboxes = document.getElementsByName("allCampaignName");
    document.getElementById("campaignNameValue").textContent = "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.CategoryData !== null) {
      this.state.CategoryData.forEach(allCampaignId);
      function allCampaignId(item) {
        indiCampaignName += item.categoryID + ",";
      }
    }
    await this.setState({
      indiCampaignName,
    });
    setTimeout(() => {
      if (this.state.indiCampaignName.length > 0) {
        this.handleGetSubCategoryList("add");
      }
    }, 1);
  };
  /// clear selected data
  selectNoCampaignName = async (event) => {
    var checkboxes = document.getElementsByName("allCampaignName");
    document.getElementById("campaignNameValue").textContent = "Select";
    document.getElementById("subCampaignNameValue").textContent = "Select";
    document.getElementById("issueTypeNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiCampaignName: "",
      SubCategoryData: [],
      indiSubCampaignName: "",
      indiIssueTypeName: "",
      IssueTypeData: [],
    });
  };
  /// hanlde select Individual campaign name
  selectIndividualCampaignName = async (campaignId, event) => {
    var indiCampaignName = this.state.indiCampaignName;
    var separator = ",";
    var values = indiCampaignName.split(separator);
    if (event.target.checked) {
      var flag = values.includes(campaignId.toString());
      if (!flag) {
        values.unshift(campaignId);
        indiCampaignName = values.join(separator);
      }
      await this.setState({
        indiCampaignName,
      });
      document.getElementById("campaignNameValue").textContent =
        this.state.indiCampaignName.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == campaignId) {
          values.splice(i, 1);
          indiCampaignName = values.join(separator);
        }
      }
      await this.setState({
        indiCampaignName,
      });
      if (this.state.indiCampaignName.split(",").length - 1 !== 0) {
        document.getElementById("campaignNameValue").textContent =
          this.state.indiCampaignName.split(",").length - 1 + " selected";
      } else {
        document.getElementById("campaignNameValue").textContent = "Select";
        document.getElementById("subCampaignNameValue").textContent = "Select";
        await this.setState({
          indiCampaignName: "",
          SubCategoryData: [],
          indiSubCampaignName: "",
        });
      }
    }
    setTimeout(() => {
      if (this.state.indiCampaignName.length > 0) {
        this.handleGetSubCategoryList("add");
      }
    }, 1);
  };

  /// handle select buttons
  handleSubCampaignNameButton = () => {
    let slaShowOriginal = this.state.subCampaignNameShow;
    let subCampaignNameShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.subCampaignNameOvrlayShow;
    let subCampaignNameOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      subCampaignNameShow,
      subCampaignNameOvrlayShow,
    });
  };
  /// select all sub campaign
  selectAllSubCampaignName = async (event) => {
    var indiSubCampaignName = "";
    var checkboxes = document.getElementsByName("allSubCampaignName");
    document.getElementById("subCampaignNameValue").textContent =
      "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.SubCategoryData !== null) {
      this.state.SubCategoryData.forEach(allCampaignId);
      function allCampaignId(item) {
        indiSubCampaignName += item.subCategoryID + ",";
      }
    }
    await this.setState({
      indiSubCampaignName,
    });
    setTimeout(() => {
      if (this.state.indiSubCampaignName.length > 0) {
        this.handleGetIssueTypeList("add");
      }
    }, 1);
  };
  /// clear selected data
  selectNoSubCampaignName = async (event) => {
    var checkboxes = document.getElementsByName("allSubCampaignName");
    document.getElementById("subCampaignNameValue").textContent = "Select";
    document.getElementById("issueTypeNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiSubCampaignName: "",
      indiIssueTypeName: "",
      IssueTypeData: [],
    });
  };
  /// hanlde select Individual Sub campaign name
  selectIndividualSubCampaignName = async (subCampaignId, event) => {
    var indiSubCampaignName = this.state.indiSubCampaignName;
    var separator = ",";
    var values = indiSubCampaignName.split(separator);
    if (event.target.checked) {
      var flag = values.includes(subCampaignId.toString());
      if (!flag) {
        values.unshift(subCampaignId);
        indiSubCampaignName = values.join(separator);
      }
      await this.setState({
        indiSubCampaignName,
      });
      document.getElementById("subCampaignNameValue").textContent =
        this.state.indiSubCampaignName.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == subCampaignId) {
          values.splice(i, 1);
          indiSubCampaignName = values.join(separator);
        }
      }
      await this.setState({
        indiSubCampaignName,
      });
      if (this.state.indiSubCampaignName.split(",").length - 1 !== 0) {
        document.getElementById("subCampaignNameValue").textContent =
          this.state.indiSubCampaignName.split(",").length - 1 + " selected";
      } else {
        document.getElementById("subCampaignNameValue").textContent = "Select";
        document.getElementById("campaignNameValue").textContent = "Select";
        document.getElementById("issueTypeNameValue").textContent = "Select";
        await this.setState({
          indiCampaignName: "",
          SubCategoryData: [],
          indiSubCampaignName: "",
          indiIssueTypeName: "",
          IssueTypeData: [],
        });
      }
    }
    setTimeout(() => {
      if (this.state.indiSubCampaignName.length > 0) {
        this.handleGetIssueTypeList("add");
      }
    }, 1);
  };
  /// handle select issue type buttons
  handleIssueTypeButton = () => {
    let slaShowOriginal = this.state.issueTypeNameShow;
    let issueTypeNameShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.IssueTypeOvrlayShow;
    let IssueTypeOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      issueTypeNameShow,
      IssueTypeOvrlayShow,
    });
  };
  /// select all issue type
  selectAllIssueTypeName = async (event) => {
    var indiIssueTypeName = "";
    var checkboxes = document.getElementsByName("allIssueTypeName");
    document.getElementById("issueTypeNameValue").textContent = "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.IssueTypeData !== null) {
      this.state.IssueTypeData.forEach(allIssueId);
      function allIssueId(item) {
        indiIssueTypeName += item.issueTypeID + ",";
      }
    }
    await this.setState({
      indiIssueTypeName,
    });
  };
  /// clear issue type selected data
  selectNoIssueTypeName = async (event) => {
    var checkboxes = document.getElementsByName("allIssueTypeName");
    document.getElementById("issueTypeNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiIssueTypeName: "",
    });
  };
  /// hanlde select Individual issue type name
  selectIndividualIssueTypeName = async (issueId, event) => {
    var indiIssueTypeName = this.state.indiIssueTypeName;
    var separator = ",";
    var values = indiIssueTypeName.split(separator);
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiIssueTypeName = values.join(separator);
      }
      await this.setState({
        indiIssueTypeName,
      });
      document.getElementById("issueTypeNameValue").textContent =
        this.state.indiIssueTypeName.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          indiIssueTypeName = values.join(separator);
        }
      }
      await this.setState({
        indiIssueTypeName,
      });
      if (this.state.indiIssueTypeName.split(",").length - 1 !== 0) {
        document.getElementById("issueTypeNameValue").textContent =
          this.state.indiIssueTypeName.split(",").length - 1 + " selected";
      } else {
        document.getElementById("issueTypeNameValue").textContent = "Select";
        await this.setState({
          indiIssueTypeName: "",
        });
      }
    }
  };
  /// =================Edit Multi select on changes code============================
  handleEditBrandNameButton = () => {
    let ShowOriginal = this.state.BrandNameEditShow;
    let BrandNameEditShow = !ShowOriginal;
    let userOvrlayShowOriginal = this.state.brandNameEditOvrlayShow;
    let brandNameEditOvrlayShow = !userOvrlayShowOriginal;
    this.setState({
      BrandNameEditShow,
      brandNameEditOvrlayShow,
    });
  };
  /// select all edit brand
  selectAllEditBrandName = async (event) => {
    // var editIndibrandName = "";
    // var checkboxes = document.getElementsByName("allEditBrandName");

    // for (var i in checkboxes) {
    //   if (checkboxes[i].checked === false) {
    //     checkboxes[i].checked = true;
    //   }
    // }
    // if (this.state.brandData !== null) {
    //   this.state.brandData.forEach(allBrandId);
    //   function allBrandId(item) {
    //     editIndibrandName += item.brandID + ",";
    //   }
    // }
    // await this.setState({
    //   editIndibrandName,
    // });
    // setTimeout(() => {
    //   if (this.state.editIndibrandName.length > 0) {
    //     this.handleGetCategoryList("edit");
    //   }
    // }, 1);
    var editIndibrandName = "";
    var checkboxes = document.getElementsByName("allEditBrandName");
    document.getElementById("editBrandNameValue").textContent = "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.brandData !== null) {
      this.state.brandData.forEach(allBrandId);
      function allBrandId(item) {
        editIndibrandName += item.brandID + ",";
      }
    }
    await this.setState({
      editIndibrandName,
      editIndiCategoryName: "",
      editIndiSubCategoryName: "",
      editIndiIssueTypeName: "",
    });
    setTimeout(() => {
      if (this.state.editIndibrandName.length > 0) {
        this.handleGetCategoryList("edit");
      }
    }, 1);
  };
  /// select no edit brand
  selectNoEditBrandName = async (event) => {
    // var checkboxes = document.getElementsByName("allEditBrandName");

    // for (var i in checkboxes) {
    //   if (checkboxes[i].checked === true) {
    //     checkboxes[i].checked = false;
    //   }
    // }
    // await this.setState({
    //   editIndibrandName: "",
    //   CategoryData: [],
    //   SubCategoryData: [],
    //   editIndiCategoryName: "",
    //   editIndiSubCategoryName: "",
    //   editIndiIssueTypeName: "",
    //   IssueTypeData: [],
    // });
    var checkboxes = document.getElementsByName("allEditBrandName");
    document.getElementById("editBrandNameValue").textContent = "Select";
    document.getElementById("editCategoryNameValue").textContent = "Select";
    document.getElementById("editSubCampaignNameValue").textContent = "Select";
    document.getElementById("editIssueTypeNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      editIndibrandName: "",
      CategoryData: [],
      SubCategoryData: [],
      editIndiCategoryName: "",
      editIndiSubCategoryName: "",
      editIndiIssueTypeName: "",
      IssueTypeData: [],
    });
  };
  /// hanlde select Individual brand name
  selectIndividualEditBrandName = async (brandId, event) => {
    // var editIndibrandName = this.state.editIndibrandName;
    // var separator = ",";
    // var values = editIndibrandName.split(separator);
    // if (event.target.checked) {
    //   var flag = values.includes(brandId.toString());
    //   if (!flag) {
    //     values.unshift(brandId);
    //     editIndibrandName = values.join(separator);
    //   }
    //   await this.setState({
    //     editIndibrandName,
    //   });
    // } else {
    //   for (var i = 0; i < values.length; i++) {
    //     if (values[i] == brandId) {
    //       values.splice(i, 1);
    //       editIndibrandName = values.join(separator);
    //     }
    //   }
    //   await this.setState({
    //     editIndibrandName,
    //   });
    //   if (this.state.editIndibrandName.split(",").length - 1 !== 0) {
    //   } else {
    //     await this.setState({
    //       SubCategoryData: [],
    //       editIndiCategoryName: "",
    //     });
    //   }
    // }
    // setTimeout(() => {
    //   if (this.state.editIndibrandName.length > 0) {
    //     this.handleGetCategoryList("edit");
    //   }
    // }, 1);

    var editIndibrandName = this.state.editIndibrandName;
    var separator = ",";
    var values = editIndibrandName.split(separator);
    let index = values.indexOf("");
    if (index > -1) {
      values.splice(index, 1);
    }
    if (event.target.checked) {
      var flag = values.includes(brandId.toString());
      if (!flag) {
        values.unshift(brandId);
        editIndibrandName = values.join(separator);
      }
      document.getElementById("editBrandNameValue").textContent =
        editIndibrandName.split(",").length + " Selected";
      await this.setState({
        editIndibrandName,
      });
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == brandId) {
          values.splice(i, 1);
          editIndibrandName = values.join(separator);
        }
      }
      await this.setState({
        editIndibrandName,
      });

      let checkArray = editIndibrandName.split(",");
      let index = checkArray.indexOf("");
      if (index > -1) {
        checkArray.splice(index, 1);
      }

      if (checkArray.length !== 0) {
        document.getElementById("editBrandNameValue").textContent =
          checkArray.length + " selected";
        document.getElementById("editCategoryNameValue").textContent = "Select";
        document.getElementById("editSubCampaignNameValue").textContent =
          "Select";
        document.getElementById("editIssueTypeNameValue").textContent =
          "Select";
      } else {
        document.getElementById("editBrandNameValue").textContent = "Select";
        document.getElementById("editCategoryNameValue").textContent = "Select";
        document.getElementById("editSubCampaignNameValue").textContent =
          "Select";
        document.getElementById("editIssueTypeNameValue").textContent =
          "Select";
      }
    }

    await this.setState({
      SubCategoryData: [],
      CategoryData: [],
      editIndiCategoryName: "",
      editIndiSubCategoryName: "",
      editIndiIssueTypeName: "",
    });
    setTimeout(() => {
      if (this.state.editIndibrandName.length > 0) {
        this.handleGetCategoryList("edit");
      }
    }, 1);
  };
  /// handle select edit campaign buttons
  handleEditCampaignNameButton = () => {
    let slaShowOriginal = this.state.campaignNameEditShow;
    let campaignNameEditShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.campaignNameEditOvrlayShow;
    let campaignNameEditOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      campaignNameEditShow,
      campaignNameEditOvrlayShow,
    });
  };
  /// select all edit campaign
  selectAllEditCampaignName = async (event) => {
    // var editIndiCategoryName = "";
    // var checkboxes = document.getElementsByName("allEditCategoryName");

    // for (var i in checkboxes) {
    //   if (checkboxes[i].checked === false) {
    //     checkboxes[i].checked = true;
    //   }
    // }
    // if (this.state.CategoryData !== null) {
    //   this.state.CategoryData.forEach(allCampaignId);
    //   function allCampaignId(item) {
    //     editIndiCategoryName += item.categoryID + ",";
    //   }
    // }
    // await this.setState({
    //   editIndiCategoryName,
    // });
    // setTimeout(() => {
    //   if (this.state.editIndiCategoryName.length > 0) {
    //     this.handleGetSubCategoryList("edit");
    //   }
    // }, 1);
    var editIndiCategoryName = "";
    var checkboxes = document.getElementsByName("allEditCategoryName");
    document.getElementById("editCategoryNameValue").textContent =
      "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.CategoryData !== null) {
      this.state.CategoryData.forEach(allCampaignId);
      function allCampaignId(item) {
        editIndiCategoryName += item.categoryID + ",";
      }
    }
    await this.setState({
      editIndiCategoryName,

      editIndiSubCategoryName: "",
      editIndiIssueTypeName: "",
    });

    setTimeout(() => {
      if (this.state.editIndiCategoryName.length > 0) {
        this.handleGetSubCategoryList("edit");
      }
    }, 1);
  };
  /// clear selected data
  selectNoEditCampaignName = async () => {
    // var checkboxes = document.getElementsByName("allEditCategoryName");

    // for (var i in checkboxes) {
    //   if (checkboxes[i].checked === true) {
    //     checkboxes[i].checked = false;
    //   }
    // }
    // await this.setState({
    //   editIndiCategoryName: "",
    //   SubCategoryData: [],
    //   editIndiSubCategoryName: "",
    //   editIndiIssueTypeName: "",
    //   IssueTypeData: [],
    // });
    var checkboxes = document.getElementsByName("allEditCategoryName");
    document.getElementById("editCategoryNameValue").textContent = "Select";
    document.getElementById("editSubCampaignNameValue").textContent = "Select";
    document.getElementById("editIssueTypeNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      SubCategoryData: [],
      editIndiSubCategoryName: "",
      editIndiIssueTypeName: "",
      IssueTypeData: [],
    });
  };
  /// hanlde Select Individual Edit Campaign Name
  selectIndividualEditCampaignName = async (campaignId, event) => {
    // var editIndiCategoryName = this.state.editIndiCategoryName;
    // var separator = ",";
    // var values = editIndiCategoryName.split(separator);
    // if (event.target.checked) {
    //   var flag = values.includes(campaignId.toString());
    //   if (!flag) {
    //     values.unshift(campaignId);
    //     editIndiCategoryName = values.join(separator);
    //   }
    //   await this.setState({
    //     editIndiCategoryName,
    //   });
    // } else {
    //   for (var i = 0; i < values.length; i++) {
    //     if (values[i] == campaignId) {
    //       values.splice(i, 1);
    //       editIndiCategoryName = values.join(separator);
    //     }
    //   }
    //   await this.setState({
    //     editIndiCategoryName,
    //   });
    //   if (this.state.editIndiCategoryName.split(",").length - 1 !== 0) {
    //   } else {
    //     await this.setState({
    //       editIndiCategoryName: "",
    //       SubCategoryData: [],
    //       editIndiSubCategoryName: "",
    //     });
    //   }
    // }
    // setTimeout(() => {
    //   if (this.state.editIndiCategoryName.length > 0) {
    //     this.handleGetSubCategoryList("edit");
    //   }
    // }, 1);
    var editIndiCategoryName = this.state.editIndiCategoryName;
    var separator = ",";

    var values = editIndiCategoryName.split(separator);
    let index = values.indexOf("");
    if (index > -1) {
      values.splice(index, 1);
    }
    if (event.target.checked) {
      var flag = values.includes(campaignId.toString());
      if (!flag) {
        values.unshift(campaignId);
        editIndiCategoryName = values.join(separator);
      }
      await this.setState({
        editIndiCategoryName,
      });
      document.getElementById("editCategoryNameValue").textContent =
        editIndiCategoryName.split(",").length + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == campaignId) {
          values.splice(i, 1);
          editIndiCategoryName = values.join(separator);
        }
      }
      await this.setState({
        editIndiCategoryName,
      });

      let checkArray = editIndiCategoryName.split(",");
      let index = checkArray.indexOf("");
      if (index > -1) {
        checkArray.splice(index, 1);
      }

      if (checkArray.length !== 0) {
        document.getElementById("editCategoryNameValue").textContent =
          checkArray.length + " selected";


        document.getElementById("editSubCampaignNameValue").textContent =
          "Select";
        document.getElementById("editIssueTypeNameValue").textContent =
          "Select";
      } else {
        document.getElementById("editCategoryNameValue").textContent = "Select";
        document.getElementById("editSubCampaignNameValue").textContent =
          "Select";
        document.getElementById("editIssueTypeNameValue").textContent =
          "Select";
      }
    }

    await this.setState({
      SubCategoryData: [],
      editIndiSubCategoryName: "",
      editIndiIssueTypeName: "",
    });
    setTimeout(() => {
      if (this.state.editIndiCategoryName.length > 0) {
        this.handleGetSubCategoryList("edit");
      }
    }, 1);
  };
  /// handle edit sub category select buttons
  handleEditSubCampaignNameButton = () => {
    let slaShowOriginal = this.state.subCampaignNameEditShow;
    let subCampaignNameEditShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.subCampaignNameEditOvrlayShow;
    let subCampaignNameEditOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      subCampaignNameEditShow,
      subCampaignNameEditOvrlayShow,
    });
  };
  /// select all sub campaign
  selectAllEditSubCampaignName = async (event) => {
    // var editIndiSubCategoryName = "";
    // var checkboxes = document.getElementsByName("allEditSubCategoryName");

    // for (var i in checkboxes) {
    //   if (checkboxes[i].checked === false) {
    //     checkboxes[i].checked = true;
    //   }
    // }
    // if (this.state.SubCategoryData !== null) {
    //   this.state.SubCategoryData.forEach(allCampaignId);
    //   function allCampaignId(item) {
    //     editIndiSubCategoryName += item.subCategoryID + ",";
    //   }
    // }
    // await this.setState({
    //   editIndiSubCategoryName,
    // });
    // setTimeout(() => {
    //   if (this.state.editIndiSubCategoryName.length > 0) {
    //     this.handleGetIssueTypeList("edit");
    //   }
    // }, 1);

    var editIndiSubCategoryName = "";
    var checkboxes = document.getElementsByName("allEditSubCategoryName");
    document.getElementById("editSubCampaignNameValue").textContent =
      "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.SubCategoryData !== null) {
      this.state.SubCategoryData.forEach(allCampaignId);
      function allCampaignId(item) {
        editIndiSubCategoryName += item.subCategoryID + ",";
      }
    }
    await this.setState({
      editIndiSubCategoryName,
      editIndiIssueTypeName: "",
      IssueTypeData: [],
    });
    setTimeout(() => {
      if (this.state.editIndiSubCategoryName.length > 0) {
        this.handleGetIssueTypeList("edit");
      }
    }, 1);
  };
  /// clear sub category selected data
  selectEditNoSubCampaignName = async () => {
    // var checkboxes = document.getElementsByName("allEditSubCategoryName");

    // for (var i in checkboxes) {
    //   if (checkboxes[i].checked === true) {
    //     checkboxes[i].checked = false;
    //   }
    // }
    // await this.setState({
    //   editIndiSubCategoryName: "",
    //   editIndiIssueTypeName: "",
    //   IssueTypeData: [],
    // });
    var checkboxes = document.getElementsByName("allEditSubCategoryName");
    document.getElementById("editSubCampaignNameValue").textContent = "Select";
    document.getElementById("editIssueTypeNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      editIndiIssueTypeName: "",
      IssueTypeData: [],
    });
  };
  /// hanlde select Individual Sub campaign name
  selectIndividualEditSubCampaignName = async (subCampaignId, event) => {
    // //
    // var editIndiSubCategoryName = this.state.editIndiSubCategoryName;
    // var separator = ",";
    // var values = editIndiSubCategoryName.split(separator);
    // if (event.target.checked) {
    //   var flag = values.includes(subCampaignId.toString());
    //   if (!flag) {
    //     values.unshift(subCampaignId);
    //     editIndiSubCategoryName = values.join(separator);
    //   }
    //   await this.setState({
    //     editIndiSubCategoryName,
    //   });
    // } else {
    //   for (var i = 0; i < values.length; i++) {
    //     if (values[i] == subCampaignId) {
    //       values.splice(i, 1);
    //       editIndiSubCategoryName = values.join(separator);
    //     }
    //   }
    //   await this.setState({
    //     editIndiSubCategoryName,
    //   });
    //   if (this.state.editIndiSubCategoryName.split(",").length - 1 !== 0) {
    //   } else {
    //     await this.setState({
    //       editIndiCategoryName: "",
    //       SubCategoryData: [],
    //       editIndiSubCategoryName: "",
    //       editIndiIssueTypeName: "",
    //       IssueTypeData: [],
    //     });
    //   }
    // }
    // setTimeout(() => {
    //   if (this.state.editIndiSubCategoryName.length > 0) {
    //     this.handleGetIssueTypeList("edit");
    //   }
    // }, 1);

    var editIndiSubCategoryName = this.state.editIndiSubCategoryName;
    var separator = ",";
    var values = editIndiSubCategoryName.split(separator);
    let index = values.indexOf("");
    if (index > -1) {
      values.splice(index, 1);
    }
    if (event.target.checked) {
      var flag = values.includes(subCampaignId.toString());
      if (!flag) {
        values.unshift(subCampaignId);
        editIndiSubCategoryName = values.join(separator);
      }
      await this.setState({
        editIndiSubCategoryName,
      });
      document.getElementById("editSubCampaignNameValue").textContent =
        this.state.editIndiSubCategoryName.split(",").length + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == subCampaignId) {
          values.splice(i, 1);
          editIndiSubCategoryName = values.join(separator);
        }
      }
      await this.setState({
        editIndiSubCategoryName,
      });
      let checkArray = editIndiSubCategoryName.split(",");
      let index = checkArray.indexOf("");
      if (index > -1) {
        checkArray.splice(index, 1);
      }
      if (checkArray.length !== 0) {
        document.getElementById("editSubCampaignNameValue").textContent =
          this.state.editIndiSubCategoryName.split(",").length + " selected";

        document.getElementById("editIssueTypeNameValue").textContent =
          "Select";
      } else {
        document.getElementById("editSubCampaignNameValue").textContent =
          "Select";

        document.getElementById("editIssueTypeNameValue").textContent =
          "Select";
      }
    }

    await this.setState({
      editIndiIssueTypeName: "",
      IssueTypeData: [],
    });
    setTimeout(() => {
      if (this.state.editIndiSubCategoryName.length > 0) {
        this.handleGetIssueTypeList("edit");
      }
    }, 1);
  };
  /// handle select edit issue type buttons
  handleIssueTypeEditButton = () => {
    let slaShowOriginal = this.state.issueTypeNameEditShow;
    let issueTypeNameEditShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.IssueTypeEditOvrlayShow;
    let IssueTypeEditOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      issueTypeNameEditShow,
      IssueTypeEditOvrlayShow,
    });
  };
  /// select all issue type
  selectAllEditIssueTypeName = async (event) => {
    // var editIndiIssueTypeName = "";
    // var checkboxes = document.getElementsByName("allEditIssueTypeName");

    // for (var i in checkboxes) {
    //   if (checkboxes[i].checked === false) {
    //     checkboxes[i].checked = true;
    //   }
    // }
    // if (this.state.IssueTypeData !== null) {
    //   this.state.IssueTypeData.forEach(allIssueId);
    //   function allIssueId(item) {
    //     editIndiIssueTypeName += item.issueTypeID + ",";
    //   }
    // }
    // await this.setState({
    //   editIndiIssueTypeName,
    // });
    var editIndiIssueTypeName = "";
    var checkboxes = document.getElementsByName("allEditIssueTypeName");
    document.getElementById("editIssueTypeNameValue").textContent =
      "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.IssueTypeData !== null) {
      this.state.IssueTypeData.forEach(allIssueId);
      function allIssueId(item) {
        editIndiIssueTypeName += item.issueTypeID + ",";
      }
    }
    await this.setState({
      editIndiIssueTypeName,
    });
  };
  /// clear issue type selected data
  selectNoEditIssueTypeName = async (event) => {
    // var checkboxes = document.getElementsByName("allEditIssueTypeName");

    // for (var i in checkboxes) {
    //   if (checkboxes[i].checked === true) {
    //     checkboxes[i].checked = false;
    //   }
    // }
    // await this.setState({
    //   editIndiIssueTypeName: "",
    // });
    var checkboxes = document.getElementsByName("allEditIssueTypeName");
    document.getElementById("editIssueTypeNameValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      editIndiIssueTypeName: "",
    });
  };
  /// hanlde select Individual edit issue type name
  selectIndividualEditIssueTypeName = async (issueId, event) => {
    // var editIndiIssueTypeName = this.state.editIndiIssueTypeName;
    // var separator = ",";
    // var values = editIndiIssueTypeName.split(separator);
    // if (event.target.checked) {
    //   var flag = values.includes(issueId.toString());
    //   if (!flag) {
    //     values.unshift(issueId);
    //     editIndiIssueTypeName = values.join(separator);
    //   }
    //   await this.setState({
    //     editIndiIssueTypeName,
    //   });
    // } else {
    //   for (var i = 0; i < values.length; i++) {
    //     if (values[i] == issueId) {
    //       values.splice(i, 1);
    //       editIndiIssueTypeName = values.join(separator);
    //     }
    //   }
    //   await this.setState({
    //     editIndiIssueTypeName,
    //   });
    //   if (this.state.editIndiIssueTypeName.split(",").length - 1 !== 0) {
    //   } else {
    //     await this.setState({
    //       editIndiIssueTypeName: "",
    //     });
    //   }
    // }
    var editIndiIssueTypeName = this.state.editIndiIssueTypeName;
    var separator = ",";
    var values = editIndiIssueTypeName.split(separator);
    let index = values.indexOf("");
    if (index > -1) {
      values.splice(index, 1);
    }

    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        editIndiIssueTypeName = values.join(separator);
      }
      await this.setState({
        editIndiIssueTypeName,
      });
      document.getElementById("editIssueTypeNameValue").textContent =
        this.state.editIndiIssueTypeName.split(",").length + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          editIndiIssueTypeName = values.join(separator);
        }
      }
      await this.setState({
        editIndiIssueTypeName,
      });

      let checkArray = editIndiIssueTypeName.split(",");
      let index = checkArray.indexOf("");
      if (index > -1) {
        checkArray.splice(index, 1);
      }
      if (checkArray.length !== 0) {
        document.getElementById("editIssueTypeNameValue").textContent =
          this.state.editIndiIssueTypeName.split(",").length + " selected";
      } else {
        document.getElementById("editIssueTypeNameValue").textContent =
          "Select";
        await this.setState({
          editIndiIssueTypeName: "",
        });
      }
    }
  };

  showModal = (row) => {
    // console.log(row);
    var CheckPassword =
      row.original.userName.substring(0, 2) +
      row.original.emailID.substring(0, 4) +
      "@" +
      row.original.mobileNumber.substring(8, 10);
    // console.log(CheckPassword);
    this.setState({
      checkPassword: CheckPassword,
      PassEmail: row.original.emailID,
      isModalVisible: true,
    });
  };

  handleCancel = () => {
    this.setState({
      passerrors: "",
      isModalVisible: false,
      newPassword: "",
    });
  };

  handleShowHide = () => {
    this.setState((state) => ({
      showHidePassword: !state.showHidePassword,
    }));
  };

  handlePasswordChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handlePasswordValidation = () => {
    var isformValid = true;
    var passerrors = "";
    const { newPassword, checkPassword } = this.state;
    if (newPassword.length === 0) {
      isformValid = false;
      passerrors = "Please enter something";
    }
    if (newPassword !== checkPassword) {
      isformValid = false;
      passerrors =
        "Entered password is invalid. Please refer the note below for better understanding";
    }
    this.setState({
      passerrors,
    });
    return isformValid;
  };

  handleNextPassword = () => {
    let self = this;
    if (self.handlePasswordValidation()) {
      let encPassword = encryption(this.state.newPassword, "enc");
      axios({
        method: "post",
        url: config.apiUrl + "/User/UserChangePassword",
        headers: authHeader(),
        data: {
          EmailID: this.state.PassEmail,
          NewPassword: encPassword,
          ChangePasswordType: "system",
        },
      })
        .then(function (response) {
          // let data = response;

          let Msg = response.data.responseData;
          if (Msg === true) {
            NotificationManager.success(
              "Password Changed successfully.",
              "",
              1500
            );
            self.setState({
              newPassword: "",
              checkPassword: "",
              PassEmail: "",
              isModalVisible: false,
            });
          } else {
            NotificationManager.error(
              "Password doesnot match as per the note below.",
              "",
              1500
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    const { userData } = this.state;

    return (
      <React.Fragment>
        <div className="position-relative d-inline-block">
          <Modal
            onClose={this.StatusCloseModel}
            open={this.state.StatusModel}
            modalId="Status-popup"
            overlayId="logout-ovrly"
          >
            <div className="status-drop-down" style={{ width: "280px" }}>
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
                        this.state.sdesignationFilterCheckbox.includes("all") ||
                        this.state.suserNameFilterCheckbox.includes("all") ||
                        this.state.smobileNumberFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.semailIDFilterCheckbox.includes("all")
                      }
                      onChange={this.setSortCheckStatus.bind(this, "all")}
                    />
                    <label htmlFor={"fil-open"}>
                      <span className="table-btn table-blue-btn">ALL</span>
                    </label>
                  </div>
                  {this.state.sortColumn === "designation"
                    ? this.state.sortFilterDesignation !== null &&
                    this.state.sortFilterDesignation.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.designation}
                          value={item.designation}
                          checked={this.state.sdesignationFilterCheckbox.includes(
                            item.designation
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "designation",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.designation}>
                          <span className="table-btn table-blue-btn">
                            {item.designation}
                          </span>
                        </label>
                      </div>
                    ))
                    : null}

                  {this.state.sortColumn === "userName"
                    ? this.state.sortFilterUsername !== null &&
                    this.state.sortFilterUsername.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.userName}
                          value={item.userName}
                          checked={this.state.suserNameFilterCheckbox.includes(
                            item.userName
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "userName",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.userName}>
                          <span className="table-btn table-blue-btn">
                            {item.userName}
                          </span>
                        </label>
                      </div>
                    ))
                    : null}

                  {this.state.sortColumn === "mobileNumber"
                    ? this.state.sortFilterMobile !== null &&
                    this.state.sortFilterMobile.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.mobileNumber}
                          value={item.mobileNumber}
                          checked={this.state.smobileNumberFilterCheckbox.includes(
                            item.mobileNumber
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "mobileNumber",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.mobileNumber}>
                          <span className="table-btn table-blue-btn">
                            {item.mobileNumber}
                          </span>
                        </label>
                      </div>
                    ))
                    : null}

                  {this.state.sortColumn === "emailID"
                    ? this.state.sortFilterEmail !== null &&
                    this.state.sortFilterEmail.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.emailID}
                          value={item.emailID}
                          checked={this.state.semailIDFilterCheckbox.includes(
                            item.emailID
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "emailID",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.emailID}>
                          <span className="table-btn table-blue-btn">
                            {item.emailID}
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
        {/* ----------------------------------edit Modal------------------------------------ */}
        <Modal
          open={this.state.editmodel}
          onClose={this.closeEditModal}
          modalId="UsEdit-popup"
        >
          <div>
            <Tabs
              onSelect={(index, label) => this.setState({ selTab: label })}
              selected={this.state.selTab}
            >
              <Tab
                label={
                  TranslationContext !== undefined
                    ? TranslationContext.label.personaldetails
                    : "Personal Details"
                }
              >
                <div>
                  <h4 style={{ textAlign: "center" }}>
                    {TranslationContext !== undefined
                      ? TranslationContext.label.personaldetails
                      : "Personal Details"}
                  </h4>
                  <div className="pop-over-div">
                    <label className="edit-label-1">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.username
                        : "User Name"}
                    </label>
                    <input
                      type="text"
                      className="txt-edit-popover"
                      maxLength={25}
                      name="selectUserName"
                      value={this.state.userEditData.selectUserName}
                      autoComplete="off"
                      onChange={this.handleOnChangeEditData}
                    />
                    {this.state.userEditData.selectUserName === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editusernameCompulsion}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.firstname
                        : "First Name"}
                    </label>
                    <input
                      type="text"
                      className="txt-edit-popover"
                      maxLength={25}
                      name="first_Name"
                      value={this.state.userEditData.first_Name}
                      autoComplete="off"
                      onChange={this.handleOnChangeEditData}
                    />
                    {this.state.userEditData.first_Name === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editfirstnameCompulsion}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.lastname
                        : "Last Name"}
                    </label>
                    <input
                      type="text"
                      className="txt-edit-popover"
                      maxLength={25}
                      name="last_Name"
                      value={this.state.userEditData.last_Name}
                      autoComplete="off"
                      onChange={this.handleOnChangeEditData}
                    />
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.mobilenumber
                        : "Mobile Number"}
                    </label>
                    <input
                      type="text"
                      className="txt-edit-popover"
                      maxLength={12}
                      name="mobile_Number"
                      value={this.state.userEditData.mobile_Number}
                      autoComplete="off"
                      onChange={this.hanldeMobileNoChange}
                    />
                    {this.state.EditPhoneFlag === false && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {TranslationContext !== undefined
                          ? TranslationContext.p.pleaseentervalidmobilenumber
                          : "Please enter valid Mobile Number."}
                      </p>
                    )}
                    {this.state.userEditData.mobile_Number === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editmobilenumberCompulsion}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.emailid
                        : "Email ID"}
                    </label>
                    <input
                      type="text"
                      className="txt-edit-popover"
                      maxLength={100}
                      name="email_ID"
                      value={this.state.userEditData.email_ID}
                      onChange={this.handleOnChangeEditData}
                    // disabled
                    />
                    {this.state.editEmailFlag === false && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {TranslationContext !== undefined
                          ? TranslationContext.p.pleaseentervalidemailid
                          : "Please enter valid Email Id."}
                      </p>
                    )}
                    {this.state.userEditData.email_ID === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editemailCompulsion}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.username
                        : "User Code"}
                    </label>
                    <input
                      disabled={true}
                      type="text"
                      className="txt-edit-popover"
                      maxLength={25}
                      name="selectUsercode"
                      value={this.state.userEditData.userCode}
                      autoComplete="off"
                      onChange={this.handleOnChangeEditData}
                    />
                    {this.state.userEditData.user_code === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editusercodeCompulsion}
                      </p>
                    )}
                  </div>
                </div>
                <div
                  style={{ textAlign: "center", margin: "20px 0px 0px 0px" }}
                >
                  <a
                    className="pop-over-cancle canblue"
                    onClick={this.closeEditModal.bind(this)}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.button.cancel
                      : "CANCEL"}
                  </a>
                  <button
                    className="Save-Use"
                    onClick={this.handleChangePersonalTab}
                    style={{ marginLeft: "30px" }}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.button.next
                      : "NEXT"}
                  </button>
                </div>
              </Tab>



              <Tab
                label={
                  TranslationContext !== undefined
                    ? TranslationContext.label.profiledetails
                    : "Profile Details"
                }
              >
                <div>
                  <h4 style={{ textAlign: "center" }}>
                    {TranslationContext !== undefined
                      ? TranslationContext.label.profiledetails
                      : "Profile Details"}
                  </h4>
                  <div className="pop-over-div">
                    <label className="edit-label-1">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.userdesignation
                        : "User Designation"}
                    </label>
                    <select
                      className="add-select-category"
                      name="designation_ID"
                      value={this.state.userEditData.designation_ID}
                      onChange={this.handleEditDesination.bind(this, "edit")}
                    >
                      <option value="0">
                        {TranslationContext !== undefined
                          ? TranslationContext.option.selectdesignation
                          : "Select Designation"}
                      </option>
                      {this.state.DesignationData !== null &&
                        this.state.DesignationData.map((item, i) => (
                          <option key={i} value={item.designationID}>
                            {item.designationName}
                          </option>
                        ))}
                    </select>
                    {this.state.userEditData.designation_ID == 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.edituserdesignCompulsion}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.reporteedesignation
                        : "Reportee Designation"}
                    </label>
                    <select
                      className="add-select-category"
                      name="reporteeDesignation_ID"
                      value={this.state.userEditData.reporteeDesignation_ID}
                      onChange={this.handleEditReporteeDesgnDropDown.bind(
                        this,
                        "edit"
                      )}
                    >
                      <option value="0">
                        {TranslationContext !== undefined
                          ? TranslationContext.option.selectreporteedesignation
                          : "Select Reportee Designation"}
                      </option>
                      {this.state.ReporteeDesignData.length === 0 &&
                        this.state.userEditData.designation_ID && (
                          <option value="-1">
                            {TranslationContext !== undefined
                              ? TranslationContext.option.root
                              : "Root"}
                          </option>
                        )}
                      {this.state.ReporteeDesignData !== null &&
                        this.state.ReporteeDesignData.map((item, i) => (
                          <option key={i} value={item.designationID}>
                            {item.designationName}
                          </option>
                        ))}
                    </select>
                    {this.state.userEditData.reporteeDesignation_ID == 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editreporteeDesignCompulsion}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.reportto
                        : "Report To"}
                    </label>
                    <select
                      className="add-select-category"
                      name="reportee_ID"
                      value={this.state.userEditData.reportee_ID}
                      onChange={this.handleOnChangeEditData}
                    >
                      <option value="0">
                        {TranslationContext !== undefined
                          ? TranslationContext.option.selectreportto
                          : "Select Report To"}
                      </option>
                      {this.state.ReporteeDesignData.length === 0 &&
                        this.state.userEditData.designation_ID && (
                          <option value="-1">
                            {TranslationContext !== undefined
                              ? TranslationContext.option.root
                              : "Root"}
                          </option>
                        )}
                      {this.state.ReportToData !== null &&
                        this.state.ReportToData.map((item, i) => (
                          <option key={i} value={item.user_ID}>
                            {item.agentName}
                          </option>
                        ))}
                    </select>

                    {this.state.userEditData.reportee_ID === 0 ? (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editreportToCompulsion}
                      </p>
                    ) : this.state.userEditData.reportee_ID === "0" ? (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editreportToCompulsion}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div
                  style={{ textAlign: "center", margin: "20px 0px 0px 0px" }}
                >
                  <a
                    className="pop-over-cancle canblue"
                    onClick={this.closeEditModal.bind(this)}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.button.cancel
                      : "CANCEL"}
                  </a>
                  <button
                    className="Save-Use"
                    onClick={this.handleChangeProfileTab}
                    style={{ marginLeft: "30px" }}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.button.next
                      : "NEXT"}
                  </button>
                </div>
              </Tab>
              <Tab
                label={
                  TranslationContext !== undefined
                    ? TranslationContext.a.mappedcategory
                    : "Mapped Category"
                }
              >
                <div>
                  <h4 style={{ textAlign: "center" }}>
                    {TranslationContext !== undefined
                      ? TranslationContext.a.mappedcategory
                      : "Mapped Category"}
                  </h4>
                  <div
                    id="overlayEditBrandName"
                    className={this.state.brandNameEditOvrlayShow ? "show" : ""}
                    onClick={this.handleEditBrandNameButton}
                  />
                  <div
                    id="overlayEditSourceName"
                    className={this.state.editOverlaySourceTicketNameShow ? "show" : ""}
                    onClick={this.handleEditSourceTicketName}
                  />
                  <div
                    id="overlayEditCampaignName"
                    className={
                      this.state.campaignNameEditOvrlayShow ? "show" : ""
                    }
                    onClick={this.handleEditCampaignNameButton}
                  />
                  <div
                    id="overlayEditSubCampaignName"
                    className={
                      this.state.subCampaignNameEditOvrlayShow ? "show" : ""
                    }
                    onClick={this.handleEditSubCampaignNameButton}
                  />
                  <div
                    id="overlayEditIssueTypeName"
                    className={this.state.IssueTypeEditOvrlayShow ? "show" : ""}
                    onClick={this.handleIssueTypeEditButton}
                  />
                  <div className="pop-over-div">
                    <label>
                      {TranslationContext !== undefined
                        ? TranslationContext.label.brand
                        : "Brand"}
                    </label>

                    <div className="dropdown issuetype-cusdrp">
                      <button
                        className="btn issuesladrop mb-0"
                        type="button"
                        id="editBrandNameValue"
                        onClick={this.handleEditBrandNameButton}
                      >
                        {this.state.editIndibrandName
                          ? this.state.editIndibrandName.split(",").length +
                          " Selected"
                          : "Select"}

                        <span className="caret"></span>
                      </button>

                      <div
                        className={
                          this.state.BrandNameEditShow
                            ? "dropdown-menu dropdown-menu-sla show"
                            : "dropdown-menu dropdown-menu-sla"
                        }
                      >
                        <div className="cat-mainbox">
                          <div className="category-button">
                            <ul>
                              <li>
                                <label
                                  onClick={this.selectAllEditBrandName.bind(
                                    this
                                  )}
                                >
                                  Select All
                                </label>
                              </li>
                              <li>
                                <label
                                  onClick={this.selectNoEditBrandName.bind(
                                    this
                                  )}
                                >
                                  Clear
                                </label>
                              </li>
                            </ul>
                          </div>
                          <div className="category-box category-scroll">
                            <ul className="m-0">
                              {this.state.brandData !== null &&
                                this.state.brandData.map((item, i) => (
                                  <li key={i}>
                                    <input
                                      type="checkbox"
                                      id={"editbrnd" + item.brandID}
                                      name="allEditBrandName"
                                      onChange={this.selectIndividualEditBrandName.bind(
                                        this,
                                        item.brandID
                                      )}
                                      checked={
                                        this.state.editIndibrandName !==
                                          undefined
                                          ? this.state.editIndibrandName
                                            .split(",")
                                            .find(
                                              (num) =>
                                                num == item.brandID.toString()
                                            )
                                          : false
                                      }
                                    />
                                    <label
                                      htmlFor={"editbrnd" + item.brandID}
                                      title={item.brandName}
                                    >
                                      {item.brandName.length > 20
                                        ? item.brandName
                                          .substr(0, 20)
                                          .concat("...")
                                        : item.brandName}
                                      <div>
                                        <img src={Correct} alt="Checked" />
                                      </div>
                                    </label>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {this.state.editIndibrandName === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editbrandCompulsion}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label>
                      {TranslationContext !== undefined
                        ? TranslationContext.label.categories
                        : "Categories"}
                    </label>

                    <div className="dropdown issuetype-cusdrp">
                      <button
                        className="btn issuesladrop mb-0"
                        type="button"
                        id="editCategoryNameValue"
                        onClick={this.handleEditCampaignNameButton}
                      >
                        {this.state.editIndiCategoryName
                          ? this.state.editIndiCategoryName.split(",").length +
                          " Selected"
                          : "Select"}
                        <span className="caret"></span>
                      </button>

                      <div
                        className={
                          this.state.campaignNameEditShow
                            ? "dropdown-menu dropdown-menu-sla show"
                            : "dropdown-menu dropdown-menu-sla"
                        }
                      >
                        <div className="cat-mainbox">
                          <div className="category-button">
                            <ul>
                              <li>
                                <label
                                  onClick={this.selectAllEditCampaignName.bind(
                                    this
                                  )}
                                >
                                  Select All
                                </label>
                              </li>
                              <li>
                                <label
                                  onClick={this.selectNoEditCampaignName.bind(
                                    this
                                  )}
                                >
                                  Clear
                                </label>
                              </li>
                            </ul>
                          </div>
                          <div className="category-box category-scroll">
                            <ul className="m-0">
                              {this.state.CategoryData !== null &&
                                this.state.CategoryData.map((item, i) => (
                                  <li key={i}>
                                    <input
                                      type="checkbox"
                                      id={"editCat" + item.categoryID}
                                      name="allEditCategoryName"
                                      onChange={this.selectIndividualEditCampaignName.bind(
                                        this,
                                        item.categoryID
                                      )}
                                      checked={
                                        this.state.editIndiCategoryName !==
                                          undefined
                                          ? this.state.editIndiCategoryName
                                            .split(",")
                                            .find(
                                              (num) =>
                                                num ==
                                                item.categoryID.toString()
                                            )
                                          : false
                                      }
                                    />
                                    <label
                                      htmlFor={"editCat" + item.categoryID}
                                      title={item.categoryName}
                                    >
                                      {item.categoryName.length > 20
                                        ? item.categoryName
                                          .substr(0, 20)
                                          .concat("...")
                                        : item.categoryName}
                                      <div>
                                        <img src={Correct} alt="Checked" />
                                      </div>
                                    </label>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {this.state.editIndiCategoryName === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editcategoryCompulsion}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label>
                      {TranslationContext !== undefined
                        ? TranslationContext.label.subcategories
                        : "Sub Categories"}
                    </label>

                    <div className="dropdown issuetype-cusdrp">
                      <button
                        className="btn issuesladrop mb-0"
                        type="button"
                        id="editSubCampaignNameValue"
                        onClick={this.handleEditSubCampaignNameButton}
                      >
                        {this.state.editIndiSubCategoryName
                          ? this.state.editIndiSubCategoryName.split(",")
                            .length + " Selected"
                          : "Select"}
                        <span className="caret"></span>
                      </button>

                      <div
                        className={
                          this.state.subCampaignNameEditShow
                            ? "dropdown-menu dropdown-menu-sla show"
                            : "dropdown-menu dropdown-menu-sla"
                        }
                      >
                        <div className="cat-mainbox">
                          <div className="category-button">
                            <ul>
                              <li>
                                <label
                                  onClick={this.selectAllEditSubCampaignName.bind(
                                    this
                                  )}
                                >
                                  Select All
                                </label>
                              </li>
                              <li>
                                <label
                                  onClick={this.selectEditNoSubCampaignName.bind(
                                    this
                                  )}
                                >
                                  Clear
                                </label>
                              </li>
                            </ul>
                          </div>
                          <div className="category-box category-scroll">
                            <ul className="m-0">
                              {this.state.SubCategoryData !== null &&
                                this.state.SubCategoryData.map((item, i) => (
                                  <li key={i}>
                                    <input
                                      type="checkbox"
                                      id={"editSub" + item.subCategoryID}
                                      name="allEditSubCategoryName"
                                      onChange={this.selectIndividualEditSubCampaignName.bind(
                                        this,
                                        item.subCategoryID
                                      )}
                                      checked={
                                        this.state.editIndiSubCategoryName !==
                                          undefined
                                          ? this.state.editIndiSubCategoryName
                                            .split(",")
                                            .find(
                                              (num) =>
                                                num ==
                                                item.subCategoryID.toString()
                                            )
                                          : false
                                      }
                                    />
                                    <label
                                      htmlFor={"editSub" + item.subCategoryID}
                                      title={item.subCategoryName}
                                    >
                                      {item.subCategoryName.length > 20
                                        ? item.subCategoryName
                                          .substr(0, 20)
                                          .concat("...")
                                        : item.subCategoryName}
                                      <div>
                                        <img src={Correct} alt="Checked" />
                                      </div>
                                    </label>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {this.state.editIndiSubCategoryName === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editsubcategoryCompulsion}
                      </p>
                    )}
                  </div>
                  <div className="pop-over-div">
                    <label>
                      {TranslationContext !== undefined
                        ? TranslationContext.label.issuetype
                        : "Issue Type"}
                    </label>

                    <div className="dropdown issuetype-cusdrp">
                      <button
                        className="btn issuesladrop mb-0"
                        type="button"
                        id="editIssueTypeNameValue"
                        onClick={this.handleIssueTypeEditButton}
                      >
                        {this.state.editIndiIssueTypeName
                          ? this.state.editIndiIssueTypeName.split(",").length +
                          " Selected"
                          : "Select"}
                        <span className="caret"></span>
                      </button>

                      <div
                        className={
                          this.state.issueTypeNameEditShow
                            ? "dropdown-menu dropdown-menu-sla show"
                            : "dropdown-menu dropdown-menu-sla"
                        }
                      >
                        <div className="cat-mainbox">
                          <div className="category-button">
                            <ul>
                              <li>
                                <label
                                  onClick={this.selectAllEditIssueTypeName.bind(
                                    this
                                  )}
                                >
                                  Select All
                                </label>
                              </li>
                              <li>
                                <label
                                  onClick={this.selectNoEditIssueTypeName.bind(
                                    this
                                  )}
                                >
                                  Clear
                                </label>
                              </li>
                            </ul>
                          </div>
                          <div className="category-box category-scroll">
                            <ul className="m-0">
                              {this.state.IssueTypeData !== null &&
                                this.state.IssueTypeData.map((item, i) => (
                                  <li key={i}>
                                    <input
                                      type="checkbox"
                                      id={"editIssue" + item.issueTypeID}
                                      name="allEditIssueTypeName"
                                      onChange={this.selectIndividualEditIssueTypeName.bind(
                                        this,
                                        item.issueTypeID
                                      )}
                                      checked={
                                        this.state.editIndiIssueTypeName !==
                                          undefined
                                          ? this.state.editIndiIssueTypeName
                                            .split(",")
                                            .find(
                                              (num) =>
                                                num ==
                                                item.issueTypeID.toString()
                                            )
                                          : false
                                      }
                                    />
                                    <label
                                      htmlFor={"editIssue" + item.issueTypeID}
                                      title={item.issueTypeName}
                                    >
                                      {item.issueTypeName.length > 20
                                        ? item.issueTypeName
                                          .substr(0, 20)
                                          .concat("...")
                                        : item.issueTypeName}
                                      <div>
                                        <img src={Correct} alt="Checked" />
                                      </div>
                                    </label>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {this.state.editIndiIssueTypeName === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.editisuuetypeCompulsion}
                      </p>
                    )}
                  </div>
                  <div className="mapped-cate-extra">
                    <div className="pop-over-div">
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.crmrole
                          : "CRM Role"}
                      </label>
                      <select
                        className="add-select-category"
                        name="role_ID"
                        value={this.state.userEditData.role_ID}
                        onChange={this.handleOnChangeEditData}
                      >
                        <option>
                          {TranslationContext !== undefined
                            ? TranslationContext.option.selectdesignation
                            : "Select Designation"}
                        </option>
                        {this.state.CRMRoleData !== null &&
                          this.state.CRMRoleData.map((item, i) => (
                            <option key={i} value={item.crmRoleID}>
                              {item.roleName}
                            </option>
                          ))}
                      </select>
                      {this.state.userEditData.role_ID === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.editcrmroleCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="pop-over-div escalation-options">
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          id="copy-esc1"
                          name="is_Copy_Escalation"
                          checked={this.state.userEditData.is_Copy_Escalation}
                          value={this.state.userEditData.is_Copy_Escalation}
                          onChange={this.editsetEscn}
                        />
                        <label htmlFor="copy-esc1">
                          {TranslationContext !== undefined
                            ? TranslationContext.label.copyescalation
                            : "Copy Escalation"}
                        </label>
                      </div>
                      {this.state.userEditData.is_Copy_Escalation === false && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.editcopyescCompulsion}
                        </p>
                      )}

                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          id="assign-esc1"
                          name="is_Assign_Escalation"
                          checked={this.state.userEditData.is_Assign_Escalation}
                          value={this.state.userEditData.is_Assign_Escalation}
                          onChange={this.editsetEscn}
                        />
                        <label htmlFor="assign-esc1">
                          {TranslationContext !== undefined
                            ? TranslationContext.label.assignescalation
                            : "Assign Escalation"}
                        </label>
                      </div>
                      {this.state.userEditData.is_Assign_Escalation ===
                        false && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.editassignescCompulsion}
                          </p>
                        )}
                      {this.state.userEditData.is_Assign_Escalation === true ? (
                        <div className="sup-agent-cntr">
                          <div className="status-options">
                            <input
                              type="radio"
                              name="selectedSupervisoragent"
                              id="supervisor1"
                              checked={this.state.editSupervisorRadio}
                              value={this.state.editSupervisorRadio}
                              onChange={this.editSuperValue.bind(this, "edit")}
                            />
                            <label
                              htmlFor="supervisor1"
                              className="logout-label"
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.label.supervisor
                                : "Supervisor"}
                            </label>
                          </div>
                          <div className="status-options">
                            <input
                              type="radio"
                              name="selectedSupervisoragent"
                              id="agent1"
                              checked={this.state.editAgentRadio}
                              value={this.state.editAgentRadio}
                              onChange={this.editAgentValue.bind(this, "edit")}
                            />
                            <label htmlFor="agent1" className="logout-label">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.agent
                                : "Agent"}
                            </label>
                          </div>
                        </div>
                      ) : null}
                    </div>
                    {this.state.editAgentRadio === true &&
                      this.state.userEditData.is_Assign_Escalation === true ? (
                      <div className="pop-over-div">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.selectagent
                            : "Select Agent"}
                        </label>
                        <select
                          className="add-select-category"
                          name="assign_ID"
                          value={this.state.userEditData.assign_ID}
                          onChange={this.handleOnChangeEditData}
                        >
                          <option>
                            {TranslationContext !== undefined
                              ? TranslationContext.label.selectagent
                              : "Select Agent"}
                          </option>
                          {this.state.AgentData !== null &&
                            this.state.AgentData.map((item, i) => (
                              <option key={i} value={item.user_ID}>
                                {item.agentName}
                              </option>
                            ))}
                        </select>
                        {this.state.userEditData.assign_ID === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.editagentCompulsion}
                          </p>
                        )}
                      </div>
                    ) : null}

                    <div className="div-cntr escalation-options mb-3">
                      <div className="filter-checkbox">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.crmrole
                            : "IsTicketAssignment"}
                        </label>
                      </div>
                      <div className="sup-agent-cntr">
                        <div className="status-options">
                          <input
                            type="radio"
                            name="ticketSource"
                            id="editTicketSourcheYes"
                            // value={this.state.selectedSourceRadio}
                            value={this.state.userEditData.isTicketAssignment}
                            checked={this.state.userEditData.isTicketAssignment === true}
                            // value={this.state.selectedSourceRadio}
                            // checked={this.state.selectedSourceRadio}
                            // defaultChecked={true}
                            onChange={this.handleEditTicketSource.bind(
                              this,
                              'yes'
                            )}
                          />

                          <label
                            htmlFor="editTicketSourcheYes"
                            className="logout-label"
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.label.supervisor
                              : "Yes"}
                          </label>
                        </div>
                        <div className="status-options">
                          <input
                            type="radio"
                            name="ticketSource"
                            id="editTicketSourcheNo"
                            // value={this.state.selectedSourceRadio}
                            // checked={this.state.selectedSourceRadio}
                            value={this.state.userEditData.isTicketAssignment}
                            checked={this.state.userEditData.isTicketAssignment === false}
                            onChange={this.handleEditTicketSource.bind(
                              this,
                              'no'
                            )}
                          />
                          <label
                            htmlFor="editTicketSourcheNo"
                            className="logout-label"
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.label.agent
                              : "No"}
                          </label>
                        </div>
                      </div>
                    </div>


                    {this.state.showSourceEditList &&

                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.brand
                            : "Source"}
                        </label>

                        <div className="dropdown issuetype-cusdrp">

                          <OutsideClickHandler
                            onOutsideClick={(e) => {
                              this.handleCloseeditOverlaySourceTicket();
                            }}
                          >
                            <button
                              className="btn issuesladrop mb-1"
                              type="button"
                              id="editSourceNameValue"
                              onClick={this.handleEditSourceTicketName}
                            >
                              {this.state.editOverlaySourceTicketName
                                ? this.state.editOverlaySourceTicketName.split(",").length +
                                " Selected"
                                : "Select"}
                              <span className="caret"></span>
                            </button>
                            <div
                              className={
                                this.state.editOverlaySourceTicket
                                  ? "dropdown-menu dropdown-menu-sla show"
                                  : "dropdown-menu dropdown-menu-sla"
                              }
                            >
                              <div className="cat-mainbox">
                                <div className="category-button">
                                  <ul>
                                    <li>
                                      <label
                                        onClick={this.selectAllEditSourceTicket.bind(
                                          this
                                        )}
                                      >
                                        Select All
                                      </label>
                                    </li>
                                    <li>
                                      <label
                                        onClick={this.selectNoEditSourceTicket.bind(
                                          this
                                        )}
                                      >
                                        Clear
                                      </label>
                                    </li>
                                  </ul>
                                </div>

                                <div className="category-box category-scroll">
                                  <ul className="m-0">
                                    {this.state.sourceListData !== null &&
                                      this.state.sourceListData.map((item, i) => (
                                        <li key={i}>
                                          <input
                                            type="checkbox"
                                            id={"editSource" + item.ticketSourceId}
                                            name="editAllSourceName"
                                            onChange={this.selectIndividualEditSourceName.bind(
                                              this,
                                              item.ticketSourceId
                                            )}
                                            checked={
                                              this.state.editOverlaySourceTicketName !==
                                                undefined && this.state.editOverlaySourceTicketName !==
                                                null
                                                ? this.state.editOverlaySourceTicketName
                                                  .split(",")
                                                  .find(
                                                    (num) =>
                                                      num ==
                                                      item.ticketSourceId.toString()
                                                  )
                                                : false
                                            }
                                          />
                                          <label
                                            htmlFor={"editSource" + item.ticketSourceId}
                                            title={item.ticketSourceName}
                                          >
                                            {item.ticketSourceName.length > 20
                                              ? item.ticketSourceName
                                                .substr(0, 20)
                                                .concat("...")
                                              : item.ticketSourceName}
                                            <div>
                                              <img src={Correct} alt="Checked" />
                                            </div>
                                          </label>
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </OutsideClickHandler>
                        </div>
                        {this.state.overlaySourceTicketName === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.sourceComplusion}
                          </p>
                        )}
                      </div>
                    }

                    <div className="pop-over-div">
                      <label>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.status
                          : "Status"}
                      </label>
                      <select
                        className="txt-edit-popover"
                        name="is_Active"
                        value={this.state.userEditData.is_Active}
                        onChange={this.handleOnChangeEditData}
                      >
                        <option value="true">
                          {TranslationContext !== undefined
                            ? TranslationContext.span.active
                            : "Active"}
                        </option>
                        <option value="false">
                          {TranslationContext !== undefined
                            ? TranslationContext.span.inactive
                            : "Inactive"}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div
                  style={{ textAlign: "center", margin: "20px 0px 0px 0px" }}
                >
                  <a
                    className="pop-over-cancle canblue"
                    onClick={this.closeEditModal.bind(this)}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.button.cancel
                      : "CANCEL"}
                  </a>
                  <button
                    className="Save-Use"
                    onClick={this.handleUpdateUser.bind(this)}
                    style={{ marginLeft: "30px" }}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.label.save
                      : "SAVE"}
                  </button>
                </div>
              </Tab>
            </Tabs>
          </div>
        </Modal>

        {/* ----------------------------------end------------------------------------ */}
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.setting
              : "Settings"}
          </Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.a.ticketing
              : "Ticketing"}
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path active">
            {TranslationContext !== undefined
              ? TranslationContext.label.users
              : "Users"}
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr settingtable">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height TicketUserReact settings-align">
                  <ReactTable
                    data={userData}
                    minRows={2}
                    columns={[
                      {
                        Header: (
                          <span
                            className={this.state.userColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "userName",
                              TranslationContext !== undefined
                                ? TranslationContext.label.username
                                : "User Name"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.label.username
                              : "User Name"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "userName",
                        Cell: (row) => <span>{row.original.userName}</span>,
                      },
                      {
                        Header: (
                          <span
                            className={this.state.mobileColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "mobileNumber",
                              TranslationContext !== undefined
                                ? TranslationContext.label.mobileno
                                : "Mobile Number"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.label.mobileno
                              : "Mob. No."}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "mobileNumber",
                        Cell: (row) => <span>{row.original.mobileNumber}</span>,
                      },
                      {
                        Header: (
                          <span
                            className={this.state.emailColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "emailID",
                              TranslationContext !== undefined
                                ? TranslationContext.label.emailid
                                : "Email ID"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.label.emailid
                              : "Email ID"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "email ID",
                        Cell: (row) => <span>{row.original.emailID}</span>,
                      },
                      {
                        Header: (
                          <span
                            className={this.state.designationColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "designation",
                              TranslationContext !== undefined
                                ? TranslationContext.label.designation
                                : "Designation"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.label.designation
                              : "Designation"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "designation",
                        Cell: (row) => {
                          var ids = row.original["userId"];
                          return (
                            <div>
                              <span className="one-liner">
                                {row.original.designation}
                                <Popover
                                  content={
                                    <div className="user-desig-pop">
                                      <div className=" row d-flex">
                                        <div className="col-md-6">
                                          <p className="title">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .reporteedesignation
                                              : "Reportee Designation"}
                                            :
                                          </p>
                                          <b>
                                            {row.original.reporteeDesignation}
                                          </b>
                                        </div>
                                        <div className="col-md-6">
                                          <p className="sub-title mx-2">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .issuetype
                                              : "Issue Type"}
                                            :
                                          </p>
                                          <b>{row.original.issueTypeNames}</b>
                                        </div>
                                      </div>

                                      <div className="row d-flex">
                                        <div className="col-md-6">
                                          <p className="title">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .reportto
                                              : "Report To"}
                                            :
                                          </p>
                                          <b>{row.original.reportTo}</b>
                                        </div>
                                        <div className="col-md-6">
                                          <p className="sub-title mx-2">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label.crmrole
                                              : "CRM Role"}
                                            :
                                          </p>
                                          <b>{row.original.crmRoleName}</b>
                                        </div>
                                      </div>

                                      <div className="row d-flex">
                                        <div className="col-md-6">
                                          <p className="title">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label.brand
                                              : "Brand"}
                                            :
                                          </p>
                                          <b>{row.original.brandNames}</b>
                                        </div>
                                        <div className="col-md-6">
                                          {row.original.isCopyEscalation ===
                                            "Yes" ? (
                                            <>
                                              <p className="sub-title mx-2">
                                                {TranslationContext !==
                                                  undefined
                                                  ? TranslationContext.label
                                                    .copyescalation
                                                  : "Copy Escalation"}
                                                :
                                              </p>
                                              <b>
                                                {TranslationContext !==
                                                  undefined
                                                  ? TranslationContext.label.yes
                                                  : "Yes"}
                                              </b>
                                            </>
                                          ) : (
                                            <>
                                              <p className="sub-title mx-2">
                                                {TranslationContext !==
                                                  undefined
                                                  ? TranslationContext.label
                                                    .copyescalation
                                                  : "Copy Escalation"}
                                                :
                                              </p>
                                              <b>
                                                {TranslationContext !==
                                                  undefined
                                                  ? TranslationContext.label.no
                                                  : "No"}
                                              </b>
                                            </>
                                          )}
                                        </div>
                                      </div>
                                      <div className="row d-flex">
                                        <div className="col-md-6">
                                          <p className="title">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .categories
                                              : "Categories"}
                                            :
                                          </p>
                                          <b>{row.original.categoryNames}</b>
                                        </div>
                                        <div className="col-md-6">
                                          <p className="sub-title mx-2">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .assignescalation
                                              : "Assign Escalation"}
                                            :
                                          </p>
                                          <b>{row.original.assignEscalation}</b>
                                        </div>
                                      </div>
                                      <div className="row d-flex">
                                        <div className="col-md-6">
                                          <p className="title">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .subcategories
                                              : "Sub Categories"}
                                            :
                                          </p>
                                          <b>{row.original.subCategoryNames}</b>
                                        </div>
                                        <div className="col-md-6">
                                          <p className="sub-title mx-2">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p.agentname
                                              : "Agent Name"}
                                            :
                                          </p>
                                          <b>{row.original.assignName}</b>
                                        </div>
                                      </div>
                                      <div className="row d-flex">
                                        <div className="col-md-6">
                                          <p className="title">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .createdby
                                              : "Created By"}
                                            :
                                          </p>
                                          <b>{row.original.createdBy}</b>
                                        </div>
                                        <div className="col-md-6">
                                          <p className="sub-title mx-2">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p.updatedby
                                              : "Updated By"}
                                            :
                                          </p>
                                          <b>{row.original.updatedBy}</b>
                                        </div>
                                      </div>
                                      <div className="row d-flex">
                                        <div className="col-md-6">
                                          <p className="title">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p.createddate
                                              : "Created Date"}
                                            :
                                          </p>
                                          <b>{row.original.createdDate}</b>
                                        </div>
                                        <div className="col-md-6">
                                          <p className="sub-title mx-2">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p.updateddate
                                              : "Updated Date"}
                                            :
                                          </p>
                                          <b>{row.original.updatedDate}</b>
                                        </div>
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
                          <span>
                            CSAT
                          </span>
                        ),
                        sortable: false,
                        accessor: "csat",
                       
                      },
                      
                      {
                        Header: (
                          <span>
                            {TranslationContext !== undefined
                              ? TranslationContext.label.actions
                              : "Actions"}
                          </span>
                        ),
                        accessor: "userId",
                        sortable: false,
                        Cell: (row) => {
                          var ids = row.original["userId"];
                          return (
                            <>
                              <span className="settings-align-actions_user">
                                <Popover
                                  content={
                                    <div
                                      className="samdel d-flex general-popover popover-body"
                                      id={"samdel" + ids}
                                    >
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
                                              .areyousureyouwanttodeletethisfile
                                            : "Are you sure you want to delete this file"}
                                          ?
                                        </p>
                                        <div className="del-can">
                                          <a
                                            className="canblue"
                                            onClick={() =>
                                              this.hide(this, "samdel" + ids)
                                            }
                                          >
                                            {TranslationContext !== undefined
                                              ? TranslationContext.button.cancel
                                              : "CANCEL"}
                                          </a>
                                          <button
                                            className="butn"
                                            onClick={this.handleDeleteUser.bind(
                                              this,
                                              row.original.userId
                                            )}
                                          >
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label.delete
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
                                    id={ids}
                                  />
                                </Popover>

                                <button
                                  className="react-tabel-button editre"
                                  onClick={this.handleGetUserListByID.bind(
                                    this,
                                    row.original.userId
                                  )}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.button.edit
                                    : "EDIT"}
                                </button>

                                <div
                                  className="key-password"
                                  onClick={this.showModal.bind(this, row)}
                                >
                                  <FaKey />
                                </div>
                                <div className="Pass-modal">
                                  {/* <PassModal
                                   title="Basic Modal"
                                    visible={this.state.isModalVisible}  
                                    onCancel={this.handleCancel}
                                    className="pass-modal"
                                    footer={[

                                    ]}
                                    >
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                    <p>Some contents...</p>
                                  </PassModal> */}
                                </div>
                              </span>
                            </>
                          );
                        },
                      },
                    ]}
                    resizable={false}
                    defaultPageSize={10}
                    showPagination={true}
                    c
                  />
                </div>
              </div>
              <div className="col-md-4 cus-drp">
                <div className="right-sect-div right-sect-collapse">
                  <h3>
                    {TranslationContext !== undefined
                      ? TranslationContext.h3.createusers
                      : "Create Users"}
                  </h3>
                  <div className="collapse-cntr">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#personal-details"
                      role="button"
                      aria-expanded="true"
                      aria-controls="personal-details"
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.label.personaldetails
                        : "Personal Details"}
                    </a>
                    <div className="multi-collapse show" id="personal-details">
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.username
                            : "User Name"}
                        </label>
                        <input
                          type="text"
                          maxLength={25}
                          readOnly={this.state.personalReadOnly}
                          className={
                            this.state.personalReadOnly ? "disabled-input" : ""
                          }
                          name="selectUserName"
                          value={this.state.selectUserName}
                          autoComplete="off"
                          onChange={this.handleOnChangeUserData}
                        />
                        {this.state.selectUserName.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.usernameCompulsion}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.firstname
                            : "First Name"}
                        </label>
                        <input
                          type="text"
                          maxLength={25}
                          readOnly={this.state.personalReadOnly}
                          className={
                            this.state.personalReadOnly ? "disabled-input" : ""
                          }
                          name="selectFirstName"
                          value={this.state.selectFirstName}
                          autoComplete="off"
                          onChange={this.handleOnChangeUserData}
                        />
                        {this.state.selectFirstName.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.firstnameCompulsion}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.lastname
                            : "Last Name"}
                        </label>
                        <input
                          type="text"
                          maxLength={25}
                          readOnly={this.state.personalReadOnly}
                          className={
                            this.state.personalReadOnly ? "disabled-input" : ""
                          }
                          name="selectLastName"
                          value={this.state.selectLastName}
                          autoComplete="off"
                          onChange={this.handleOnChangeUserData}
                        />
                      </div>
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.mobilenumber
                            : "Mobile Number"}
                        </label>
                        <input
                          type="text"
                          maxLength={12}
                          readOnly={this.state.personalReadOnly}
                          className={
                            this.state.personalReadOnly ? "disabled-input" : ""
                          }
                          name="selectMobile"
                          value={this.state.selectMobile}
                          autoComplete="off"
                          onChange={this.hanldeMobileNoChange}
                        />
                        {this.state.phoneFlag === false && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                .pleaseentervalidmobilenumber
                              : "Please enter valid Mobile Number."}
                          </p>
                        )}
                        {this.state.selectMobile.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.mobilenumberCompulsion}
                          </p>
                        )}
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.mobileValidation}
                        </p>
                      </div>
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.emailid
                            : "Email ID"}
                        </label>
                        <input
                          type="text"
                          maxLength={100}
                          readOnly={this.state.personalReadOnly}
                          className={
                            this.state.personalReadOnly ? "disabled-input" : ""
                          }
                          name="selectEmail"
                          value={this.state.selectEmail}
                          autoComplete="off"
                          onChange={this.handleOnChangeUserData}
                        />
                        {this.state.emailFlag === false && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {TranslationContext !== undefined
                              ? TranslationContext.p.pleaseentervalidemailid
                              : "Please enter valid Email Id."}
                          </p>
                        )}
                        {this.state.selectEmail.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.emailCompulsion}
                          </p>
                        )}
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.emailValidation}
                        </p>
                      </div>
                      {this.state.personalReadOnly === true ? (
                        <div className="btn-coll">
                          <button
                            className="butn"
                            onClick={this.editMethod.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.label.edit
                              : "Edit"}
                          </button>
                        </div>
                      ) : this.state.buttonToggle === true ? (
                        <div className="btn-coll">
                          <button
                            data-toggle="collapse"
                            href="#personal-details"
                            className="butn"
                            onClick={this.handleEditPersonalDetails.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.updateandnext
                              : "Update & Next"}
                          </button>
                        </div>
                      ) : (
                        <div className="btn-coll">
                          <button
                            className="butn"
                            onClick={this.handleValidationEmailIdMob.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.saveandnext
                              : "SAVE & NEXT"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="collapse-cntr">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#profile-details"
                      role="button"
                      aria-expanded="false"
                      aria-controls="profile-details"
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.label.profiledetails
                        : "Profile Details"}
                    </a>

                    <div
                      className="collapse multi-collapse"
                      id="profile-details"
                    >
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.userdesignation
                            : "User Designation"}
                        </label>
                        <select
                          disabled={this.state.profileReadOnly}
                          className={
                            this.state.profileReadOnly
                              ? "disabled-input add-select-category"
                              : "add-select-category"
                          }
                          name="selectedDesignation"
                          value={this.state.selectedDesignation}
                          onChange={this.handleDesination.bind(this, "add")}
                        >
                          <option>
                            {TranslationContext !== undefined
                              ? TranslationContext.option.selectdesignation
                              : "Select Designation"}
                          </option>
                          {this.state.DesignationData !== null &&
                            this.state.DesignationData.map((item, i) => (
                              <option key={i} value={item.designationID}>
                                {item.designationName}
                              </option>
                            ))}
                        </select>
                        {this.state.selectedDesignation === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.userdesignCompulsion}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.reporteedesignation
                            : "Reportee Designation"}
                        </label>
                        <select
                          disabled={this.state.profileReadOnly}
                          className={
                            this.state.profileReadOnly
                              ? "disabled-input add-select-category"
                              : "add-select-category"
                          }
                          name="selectedReporteeDesign"
                          value={this.state.selectedReporteeDesign}
                          onChange={this.handleReporteeDesgnDropDown.bind(
                            this,
                            "add"
                          )}
                        >
                          <option>
                            {TranslationContext !== undefined
                              ? TranslationContext.option
                                .selectreporteedesignation
                              : "Select Reportee Designation"}
                          </option>
                          {this.state.ReporteeDesignData.length === 0 &&
                            this.state.selectedDesignation && (
                              <option value="-1">
                                {TranslationContext !== undefined
                                  ? TranslationContext.option.root
                                  : "Root"}
                              </option>
                            )}
                          {this.state.ReporteeDesignData !== null &&
                            this.state.ReporteeDesignData.map((item, i) => (
                              <option key={i} value={item.designationID}>
                                {item.designationName}
                              </option>
                            ))}
                        </select>
                        {this.state.selectedReporteeDesign === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.reporteeDesignCompulsion}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.reportto
                            : "Report To"}
                        </label>
                        <select
                          disabled={this.state.profileReadOnly}
                          className={
                            this.state.profileReadOnly
                              ? "disabled-input add-select-category"
                              : "add-select-category"
                          }
                          name="selectedReportTO"
                          value={this.state.selectedReportTO}
                          onChange={this.handleOnChangeUserData}
                        >
                          <option>
                            {TranslationContext !== undefined
                              ? TranslationContext.option.selectreportto
                              : "Select Report To"}
                          </option>
                          {this.state.ReporteeDesignData.length === 0 &&
                            this.state.selectedDesignation && (
                              <option value="-1">
                                {TranslationContext !== undefined
                                  ? TranslationContext.option.root
                                  : "Root"}
                              </option>
                            )}
                          {this.state.ReportToData !== null &&
                            this.state.ReportToData.map((item, i) => (
                              <option key={i} value={item.user_ID}>
                                {item.agentName}
                              </option>
                            ))}
                        </select>
                        {this.state.selectedReportTO === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.reportToCompulsion}
                          </p>
                        )}
                      </div>
                      {this.state.profileReadOnly === true ? (
                        <div className="btn-coll">
                          <button
                            className="butn"
                            onClick={this.editProfileMethod.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.label.edit
                              : "Edit"}
                          </button>
                        </div>
                      ) : this.state.buttonProfileToggle === true ? (
                        <div className="btn-coll">
                          <button
                            data-toggle="collapse"
                            href="#profile-details"
                            className="butn"
                            onClick={this.handleAddProfileDetails.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.updateandnext
                              : "Update & Next"}
                          </button>
                        </div>
                      ) : (
                        <div className="btn-coll">
                          <button
                            disabled={this.state.profileBtnDisabled}
                            className={
                              this.state.profileBtnDisabled
                                ? "butn userBtnDibsl"
                                : "butn"
                            }
                            onClick={this.handleAddProfileDetails.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.saveandnext
                              : "SAVE & NEXT"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="collapse-cntr">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#mapped-category"
                      role="button"
                      aria-expanded="false"
                      aria-controls="mapped-category"
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.a.mappedcategory
                        : "Mapped Category"}
                    </a>
                    <div
                      className="collapse multi-collapse"
                      id="mapped-category"
                    >
                      <div
                        id="overlaybrandName"
                        className={this.state.brandNameOvrlayShow ? "show" : ""}
                        onClick={this.handleBrandNameButton}
                      />
                      <div
                        id="overlayCampaignName"
                        className={
                          this.state.campaignNameOvrlayShow ? "show" : ""
                        }
                        onClick={this.handleCampaignNameButton}
                      />
                      <div
                        id="overlaySubCampaignName"
                        className={
                          this.state.subCampaignNameOvrlayShow ? "show" : ""
                        }
                        onClick={this.handleSubCampaignNameButton}
                      />
                      <div
                        id="overlaySourceTicket"
                        className={
                          this.state.overlaySourceTicket ? "show" : ""
                        }
                        onClick={this.handleSourceTicketName}
                      />
                      <div
                        id="overlayIssueTypeName"
                        className={this.state.IssueTypeOvrlayShow ? "show" : ""}
                        onClick={this.handleIssueTypeButton}
                      />
                      <div
                        id="overlaySourceName"
                        className={this.state.sourceNameOvrlayShow ? "show" : ""}
                        onClick={this.handleSourceNameButton}
                      />




                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.brand
                            : "Brand"}
                        </label>

                        <div className="dropdown issuetype-cusdrp">
                          <button
                            className="btn issuesladrop mb-0"
                            type="button"
                            id="brandNameValue"
                            onClick={this.handleBrandNameButton}
                          >
                            Select
                            <span className="caret"></span>
                          </button>

                          <div
                            className={
                              this.state.BrandNameShow
                                ? "dropdown-menu dropdown-menu-sla show"
                                : "dropdown-menu dropdown-menu-sla"
                            }
                          >
                            <div className="cat-mainbox">
                              <div className="category-button">
                                <ul>
                                  <li>
                                    <label
                                      onClick={this.selectAllBrandName.bind(
                                        this
                                      )}
                                    >
                                      Select All
                                    </label>
                                  </li>
                                  <li>
                                    <label
                                      onClick={this.selectNoBrandName.bind(
                                        this
                                      )}
                                    >
                                      Clear
                                    </label>
                                  </li>
                                </ul>
                              </div>
                              <div className="category-box category-scroll">
                                <ul className="m-0">
                                  {this.state.brandData !== null &&
                                    this.state.brandData.map((item, i) => (
                                      <li key={i}>
                                        <input
                                          type="checkbox"
                                          id={"brand" + item.brandID}
                                          name="allBrandName"
                                          onChange={this.selectIndividualBrandName.bind(
                                            this,
                                            item.brandID
                                          )}
                                          checked={
                                            this.state.indibrandName !==
                                              undefined
                                              ? this.state.indibrandName
                                                .split(",")
                                                .find(
                                                  (num) =>
                                                    num ==
                                                    item.brandID.toString()
                                                )
                                              : false
                                          }
                                        />
                                        <label
                                          htmlFor={"brand" + item.brandID}
                                          title={item.brandName}
                                        >
                                          {item.brandName.length > 20
                                            ? item.brandName
                                              .substr(0, 20)
                                              .concat("...")
                                            : item.brandName}
                                          <div>
                                            <img src={Correct} alt="Checked" />
                                          </div>
                                        </label>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        {this.state.indibrandName === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.brandCompulsion}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.categories
                            : "Categories"}
                        </label>

                        <div className="dropdown issuetype-cusdrp">
                          <button
                            className="btn issuesladrop mb-0"
                            type="button"
                            id="campaignNameValue"
                            onClick={this.handleCampaignNameButton}
                          >
                            Select
                            <span className="caret"></span>
                          </button>

                          <div
                            className={
                              this.state.campaignNameShow
                                ? "dropdown-menu dropdown-menu-sla show"
                                : "dropdown-menu dropdown-menu-sla"
                            }
                          >
                            <div className="cat-mainbox">
                              <div className="category-button">
                                <ul>
                                  <li>
                                    <label
                                      onClick={this.selectAllCampaignName.bind(
                                        this
                                      )}
                                    >
                                      Select All
                                    </label>
                                  </li>
                                  <li>
                                    <label
                                      onClick={this.selectNoCampaignName.bind(
                                        this
                                      )}
                                    >
                                      Clear
                                    </label>
                                  </li>
                                </ul>
                              </div>
                              <div className="category-box category-scroll">
                                <ul className="m-0">
                                  {this.state.CategoryData !== null &&
                                    this.state.CategoryData.map((item, i) => (
                                      <li key={i}>
                                        <input
                                          type="checkbox"
                                          id={"camp" + item.categoryID}
                                          name="allCampaignName"
                                          onChange={this.selectIndividualCampaignName.bind(
                                            this,
                                            item.categoryID
                                          )}
                                          checked={
                                            this.state.indiCampaignName !==
                                              undefined
                                              ? this.state.indiCampaignName
                                                .split(",")
                                                .find(
                                                  (num) =>
                                                    num ==
                                                    item.categoryID.toString()
                                                )
                                              : false
                                          }
                                        />
                                        <label
                                          htmlFor={"camp" + item.categoryID}
                                          title={item.categoryName}
                                        >
                                          {item.categoryName.length > 20
                                            ? item.categoryName
                                              .substr(0, 20)
                                              .concat("...")
                                            : item.categoryName}
                                          <div>
                                            <img src={Correct} alt="Checked" />
                                          </div>
                                        </label>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        {this.state.indiCampaignName === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.categoryCompulsion}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.subcategories
                            : "Sub Categories"}
                        </label>

                        <div className="dropdown issuetype-cusdrp">
                          <button
                            className="btn issuesladrop mb-0"
                            type="button"
                            id="subCampaignNameValue"
                            onClick={this.handleSubCampaignNameButton}
                          >
                            Select
                            <span className="caret"></span>
                          </button>

                          <div
                            className={
                              this.state.subCampaignNameShow
                                ? "dropdown-menu dropdown-menu-sla show"
                                : "dropdown-menu dropdown-menu-sla"
                            }
                          >
                            <div className="cat-mainbox">
                              <div className="category-button">
                                <ul>
                                  <li>
                                    <label
                                      onClick={this.selectAllSubCampaignName.bind(
                                        this
                                      )}
                                    >
                                      Select All
                                    </label>
                                  </li>
                                  <li>
                                    <label
                                      onClick={this.selectNoSubCampaignName.bind(
                                        this
                                      )}
                                    >
                                      Clear
                                    </label>
                                  </li>
                                </ul>
                              </div>
                              <div className="category-box category-scroll">
                                <ul className="m-0">
                                  {this.state.SubCategoryData !== null &&
                                    this.state.SubCategoryData.map(
                                      (item, i) => (
                                        <li key={i}>
                                          <input
                                            type="checkbox"
                                            id={"userSub" + item.subCategoryID}
                                            name="allSubCampaignName"
                                            onChange={this.selectIndividualSubCampaignName.bind(
                                              this,
                                              item.subCategoryID
                                            )}
                                            checked={
                                              this.state.indiSubCampaignName !==
                                                undefined
                                                ? this.state.indiSubCampaignName
                                                  .split(",")
                                                  .find(
                                                    (num) =>
                                                      num ==
                                                      item.subCategoryID.toString()
                                                  )
                                                : false
                                            }
                                          />
                                          <label
                                            htmlFor={
                                              "userSub" + item.subCategoryID
                                            }
                                            title={item.subCategoryName}
                                          >
                                            {item.subCategoryName.length > 20
                                              ? item.subCategoryName
                                                .substr(0, 20)
                                                .concat("...")
                                              : item.subCategoryName}
                                            <div>
                                              <img
                                                src={Correct}
                                                alt="Checked"
                                              />
                                            </div>
                                          </label>
                                        </li>
                                      )
                                    )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        {this.state.indiSubCampaignName === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.subcategoryCompulsion}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.issuetype
                            : "Issue Type"}
                        </label>

                        <div className="dropdown issuetype-cusdrp">
                          <button
                            className="btn issuesladrop mb-0"
                            type="button"
                            id="issueTypeNameValue"
                            onClick={this.handleIssueTypeButton}
                          >
                            Select
                            <span className="caret"></span>
                          </button>

                          <div
                            className={
                              this.state.issueTypeNameShow
                                ? "dropdown-menu dropdown-menu-sla show"
                                : "dropdown-menu dropdown-menu-sla"
                            }
                          >
                            <div className="cat-mainbox">
                              <div className="category-button">
                                <ul>
                                  <li>
                                    <label
                                      onClick={this.selectAllIssueTypeName.bind(
                                        this
                                      )}
                                    >
                                      Select All
                                    </label>
                                  </li>
                                  <li>
                                    <label
                                      onClick={this.selectNoIssueTypeName.bind(
                                        this
                                      )}
                                    >
                                      Clear
                                    </label>
                                  </li>
                                </ul>
                              </div>
                              <div className="category-box category-scroll">
                                <ul className="m-0">
                                  {this.state.IssueTypeData !== null &&
                                    this.state.IssueTypeData.map((item, i) => (
                                      <li key={i}>
                                        <input
                                          type="checkbox"
                                          id={"issueType" + item.issueTypeID}
                                          name="allIssueTypeName"
                                          onChange={this.selectIndividualIssueTypeName.bind(
                                            this,
                                            item.issueTypeID
                                          )}
                                          checked={
                                            this.state.indiIssueTypeName !==
                                              undefined
                                              ? this.state.indiIssueTypeName
                                                .split(",")
                                                .find(
                                                  (num) =>
                                                    num ==
                                                    item.issueTypeID.toString()
                                                )
                                              : false
                                          }
                                        />
                                        <label
                                          htmlFor={
                                            "issueType" + item.issueTypeID
                                          }
                                          title={item.issueTypeName}
                                        >
                                          {item.issueTypeName.length > 20
                                            ? item.issueTypeName
                                              .substr(0, 20)
                                              .concat("...")
                                            : item.issueTypeName}
                                          <div>
                                            <img src={Correct} alt="Checked" />
                                          </div>
                                        </label>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        {this.state.indiIssueTypeName === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.isuuetypeCompulsion}
                          </p>
                        )}
                      </div>
                      <div className="mapped-cate-extra">
                        <div className="div-cntr">
                          <label>
                            {TranslationContext !== undefined
                              ? TranslationContext.label.crmrole
                              : "CRM Role"}
                          </label>
                          <select
                            className="add-select-category"
                            name="selectedCRMRoles"
                            value={this.state.selectedCRMRoles}
                            onChange={this.handleOnChangeUserData}
                          >
                            <option>
                              {TranslationContext !== undefined
                                ? TranslationContext.option.selectdesignation
                                : "Select Designation"}
                            </option>
                            {this.state.CRMRoleData !== null &&
                              this.state.CRMRoleData.map((item, i) => (
                                <option key={i} value={item.crmRoleID}>
                                  {item.roleName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectedCRMRoles === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.crmroleCompulsion}
                            </p>
                          )}
                        </div>
                        <div className="div-cntr escalation-options">
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              id="copy-esc"
                              name="selectedCopyEscalation"
                              value={this.state.selectedCopyEscalation}
                              onChange={this.setEscn}
                            />

                            <label htmlFor="copy-esc">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.copyescalation
                                : "Copy Escalation"}
                            </label>
                          </div>
                          {this.state.selectedCopyEscalation === false && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.copyescCompulsion}
                            </p>
                          )}
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              id="assign-esc"
                              name="selectedAssignEscalation"
                              value={this.state.selectedAssignEscalation}
                              onChange={this.setEscn}
                            />

                            <label htmlFor="assign-esc">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.assignescalation
                                : "Assign Escalation"}
                            </label>
                          </div>
                          {this.state.selectedAssignEscalation === false && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.assignescCompulsion}
                            </p>
                          )}
                          {this.state.selectedAssignEscalation === true ? (
                            <>
                              <div className="sup-agent-cntr">
                                <div className="status-options">
                                  <input
                                    type="radio"
                                    name="selectedSupervisorAgent"
                                    id="supervisor"
                                    value={this.state.selectedSupervisorRadio}
                                    defaultChecked={true}
                                    onChange={this.handleSuperValue.bind(
                                      this,
                                      "add"
                                    )}
                                  />

                                  <label
                                    htmlFor="supervisor"
                                    className="logout-label"
                                  >
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label.supervisor
                                      : "Supervisor"}
                                  </label>
                                </div>
                                <div className="status-options">
                                  <input
                                    type="radio"
                                    name="selectedSupervisorAgent"
                                    id="agent"
                                    value={this.state.selectedAgentRadio}
                                    onChange={this.handleAgentValue.bind(
                                      this,
                                      "add"
                                    )}
                                  />
                                  <label
                                    htmlFor="agent"
                                    className="logout-label"
                                  >
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label.agent
                                      : "Agent"}
                                  </label>
                                </div>
                              </div>

                            </>
                          ) : null}
                        </div>


                        <div className="div-cntr escalation-options">
                          <div className="filter-checkbox">
                            <label>
                              {TranslationContext !== undefined
                                ? TranslationContext.label.crmrole
                                : "IsTicketAssignment"}
                            </label>
                          </div>
                          <div className="sup-agent-cntr">
                            <div className="status-options">
                              <input
                                type="radio"
                                name="ticketSource"
                                id="ticketSourcheYes"
                                value={this.state.selectedSourceRadio}
                                // defaultChecked={true}
                                onChange={this.handleTicketSource.bind(
                                  this,
                                  'yes'
                                )}
                              />

                              <label
                                htmlFor="ticketSourcheYes"
                                className="logout-label"
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.supervisor
                                  : "Yes"}
                              </label>
                            </div>
                            <div className="status-options">
                              <input
                                type="radio"
                                name="ticketSource"
                                id="ticketSourcheNo"
                                value={this.state.selectedSourceRadio}
                                onChange={this.handleTicketSource.bind(
                                  this,
                                  'no'
                                )}
                              />
                              <label
                                htmlFor="ticketSourcheNo"
                                className="logout-label"
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.agent
                                  : "No"}
                              </label>
                            </div>
                          </div>
                        </div>




                        {this.state.showSourceList &&

                          <div className="div-cntr">
                            <label>
                              {TranslationContext !== undefined
                                ? TranslationContext.label.brand
                                : "Source"}
                            </label>

                            <div className="dropdown issuetype-cusdrp">
                              <button
                                className="btn issuesladrop mb-0"
                                type="button"
                                id="sourceNameValue"
                                onClick={this.handleSourceNameButton}
                              >
                                Select
                                <span className="caret"></span>
                              </button>

                              <div
                                className={
                                  this.state.sourceNameOvrlayShow
                                    ? "dropdown-menu dropdown-menu-sla show"
                                    : "dropdown-menu dropdown-menu-sla"
                                }
                              >
                                <div className="cat-mainbox">
                                  <div className="category-button">
                                    <ul>
                                      <li>
                                        <label
                                          onClick={this.selectAllSourceTicket.bind(
                                            this
                                          )}
                                        >
                                          Select All
                                        </label>
                                      </li>
                                      <li>
                                        <label
                                          onClick={this.selectNoSourceTicket.bind(
                                            this
                                          )}
                                        >
                                          Clear
                                        </label>
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="category-box category-scroll">
                                    <ul className="m-0">
                                      {this.state.sourceListData !== null &&
                                        this.state.sourceListData.map((item, i) => (
                                          <li key={i}>
                                            <input
                                              type="checkbox"
                                              id={"source" + item.ticketSourceId}
                                              name="allSourceName"
                                              onChange={this.selectIndividualSourceName.bind(
                                                this,
                                                item.ticketSourceId
                                              )}
                                              checked={
                                                this.state.overlaySourceTicketName !==
                                                  undefined
                                                  ? this.state.overlaySourceTicketName
                                                    .split(",")
                                                    .find(
                                                      (num) =>
                                                        num ==
                                                        item.ticketSourceId.toString()
                                                    )
                                                  : false
                                              }
                                            />
                                            <label
                                              htmlFor={"source" + item.ticketSourceId}
                                              title={item.ticketSourceName}
                                            >
                                              {item.ticketSourceName.length > 20
                                                ? item.ticketSourceName
                                                  .substr(0, 20)
                                                  .concat("...")
                                                : item.ticketSourceName}
                                              <div>
                                                <img src={Correct} alt="Checked" />
                                              </div>
                                            </label>
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {this.state.overlaySourceTicketName === "" && (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.sourceComplusion}
                              </p>
                            )}
                          </div>
                        }

                        {this.state.selectedAgentRadio === true &&
                          this.state.selectedAssignEscalation === true ? (
                          <div className="div-cntr">
                            <label>
                              {TranslationContext !== undefined
                                ? TranslationContext.label.selectagent
                                : "Select Agent"}
                            </label>

                            <select
                              className="add-select-category"
                              name="selectedAgent"
                              value={this.state.selectedAgent}
                              onChange={this.handleOnChangeUserData}
                            >
                              <option>
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.selectagent
                                  : "Select Agent"}
                              </option>
                              {this.state.AgentData !== null &&
                                this.state.AgentData.map((item, i) => (
                                  <option key={i} value={item.user_ID}>
                                    {item.agentName}
                                  </option>
                                ))}
                            </select>
                            {this.state.selectedAgent === 0 && (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.agentCompulsion}
                              </p>
                            )}
                          </div>
                        ) : null}

                        <div className="div-cntr">
                          <label>
                            {TranslationContext !== undefined
                              ? TranslationContext.label.status
                              : "Status"}
                          </label>
                          <select
                            name="selectedStatus"
                            value={this.state.selectedStatus}
                            onChange={this.handleOnChangeUserData}
                          >
                            <option value="true">
                              {TranslationContext !== undefined
                                ? TranslationContext.span.active
                                : "Active"}
                            </option>
                            <option value="false">
                              {TranslationContext !== undefined
                                ? TranslationContext.span.inactive
                                : "Inactive"}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="btn-coll">
                        <button
                          className={
                            this.state.mappedCategoryBtnDisabled
                              ? "butn userBtnDibsl"
                              : "butn"
                          }
                          onClick={this.handleAddMapCategory.bind(this)}
                          // disabled={this.state.mappedCategoryBtnDisabled}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.label.add
                            : "ADD"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-sect-div">
                  <div className="d-flex justify-content-between pb-2">
                    <h3 className="pb-0">
                      {TranslationContext !== undefined
                        ? TranslationContext.h3.bulkupload
                        : "Bulk Upload"}
                    </h3>
                    <div>
                      <div className="down-excel mb-2">
                        <p>
                          {TranslationContext !== undefined
                            ? TranslationContext.p.template
                            : "Template"}
                        </p>
                        <CSVLink
                          filename={"User.csv"}
                          data={config.userTemplate}
                        >
                          <img src={DownExcel} alt="download icon" />
                        </CSVLink>
                      </div>
                    </div>
                  </div>
                  <Spin
                    tip={
                      TranslationContext !== undefined
                        ? TranslationContext.tip.pleasewait
                        : "Please wait..."
                    }
                    spinning={this.state.bulkuploadLoading}
                  >
                    <div className="mainfileUpload">
                      <Dropzone onDrop={this.fileUpload.bind(this)}>
                        {({ getRootProps, getInputProps }) => (
                          <div {...getRootProps()}>
                            <input
                              {...getInputProps()}
                              className="file-upload d-none"
                            />
                            <div className="file-icon">
                              <img src={FileUpload} alt="file-upload" />
                            </div>
                            <span className={"fileupload-span"}>
                              {TranslationContext !== undefined
                                ? TranslationContext.span.addfile
                                : "Add File"}
                            </span>
                            {TranslationContext !== undefined
                              ? TranslationContext.label.ordropfilehere
                              : "or Drop File here"}
                          </div>
                        )}
                      </Dropzone>
                    </div>
                    {this.state.fileN.length === 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.bulkuploadCompulsion}
                      </p>
                    )}
                    {this.state.fileName && (
                      <div className="file-info">
                        <div className="file-cntr">
                          <div className="file-dtls">
                            <p className="file-name">{this.state.fileName}</p>
                            <div className="del-file" id="del-file-1">
                              <img
                                src={DelBlack}
                                alt="delete-black"
                                onClick={this.togglePopover}
                              />
                            </div>
                            <UncontrolledPopover
                              trigger="legacy"
                              placement="auto"
                              target="del-file-1"
                              className="general-popover delete-popover"
                              isOpen={this.state.isOpen}
                              toggle={this.togglePopover}
                            >
                              <PopoverBody className="d-flex">
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
                                        .areyousureyouwanttodeletethisfile
                                      : "Are you sure you want to delete this file"}
                                    ?
                                  </p>
                                  <div className="del-can">
                                    <a
                                      className="canblue"
                                      onClick={this.togglePopover}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.a.cancel
                                        : "CANCEL"}
                                    </a>
                                    <button
                                      className="butn"
                                      onClick={this.handleDeleteBulkupload}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.label.delete
                                        : "Delete"}
                                    </button>
                                  </div>
                                </div>
                              </PopoverBody>
                            </UncontrolledPopover>
                          </div>
                          <div>
                            <span className="file-size">
                              {this.state.fileSize}
                            </span>
                          </div>
                        </div>
                        {this.state.fileN.length > 0 &&
                          this.state.isFileUploadFail ? (
                          <div className="file-cntr">
                            <div className="file-dtls">
                              <p className="file-name">{this.state.fileName}</p>
                              <a
                                className="file-retry"
                                onClick={this.hanldeAddBulkUpload.bind(this)}
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.a.retry
                                  : "Retry"}
                              </a>
                            </div>
                            <div>
                              <span className="file-failed">
                                {TranslationContext !== undefined
                                  ? TranslationContext.span.failed
                                  : "Failed"}
                              </span>
                            </div>
                          </div>
                        ) : null}
                        {this.state.showProgress ? (
                          <div className="file-cntr">
                            <div className="file-dtls">
                              <p className="file-name pr-0">
                                {this.state.fileName}
                              </p>
                            </div>
                            <div>
                              <div className="d-flex align-items-center mt-2">
                                <ProgressBar
                                  className="file-progress"
                                  now={this.state.progressValue}
                                />
                                <div className="cancel-upload">
                                  <img src={UploadCancel} alt="upload cancel" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )}
                    <button
                      className="butn"
                      onClick={this.hanldeAddBulkUpload.bind(this)}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.label.add
                        : "ADD"}
                    </button>
                  </Spin>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pass-modal">
          <PassModal
            title=""
            visible={this.state.isModalVisible}
            onCancel={this.handleCancel}
            footer={false}
            header={false}
            className="pass-modal"
          >
            <div className="pass-modal-main">
              <div className="passmodal-header">
                <span className="passmodal-heading"> Change Password</span>
              </div>
              <div className="passmodal-fields">
                <div className="passmodal-label">
                  <label htmlFor="" className="passmodal-label-head">
                    Enter New Password
                  </label>
                  <div></div>
                </div>
                <div className="passmodal-input">
                  <input
                    type={this.state.showHidePassword ? "password" : "text"}
                    className="passmodal-input-field"
                    name="newPassword"
                    onChange={this.handlePasswordChange}
                    value={this.state.newPassword}
                    placeholder="Password*"
                    autoComplete="new-password"
                    maxLength={25}
                  />
                  <span
                    class=" field-icon toggle-password"
                    onClick={this.handleShowHide}
                  >
                    {this.state.showHidePassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                {this.state.passerrors && (
                  <p className="modal-errormsg"> {this.state.passerrors}</p>
                )}
                <div className="passmodal-buttons">
                  <button
                    className="passmodal-cancel"
                    onClick={this.handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="passmodal-next"
                    onClick={this.handleNextPassword}
                  >
                    Next
                  </button>
                </div>
                <div className="passmodal-note-head">
                  <div>
                    Note : The enter password must be in in this specific format
                    of :- First 2 digits of Username + First 4 digits of email +
                    "@" + Last 2 digits of Phone No
                  </div>
                </div>
              </div>
            </div>
          </PassModal>
        </div>
      </React.Fragment >
    );
  }
}

export default Users;
