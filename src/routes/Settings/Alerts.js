import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sorting from "./../../assets/Images/sorting.png";
import { Popover } from "antd";
import Select from "react-select";
import ReactTable from "react-table";
import DelBigIcon from "./../../assets/Images/del-big.png";
import FileUpload from "./../../assets/Images/file.png";
import DelBlack from "./../../assets/Images/del-black.png";
import UploadCancel from "./../../assets/Images/upload-cancel.png";
import DownExcel from "./../../assets/Images/csv.png";
import { ProgressBar } from "react-bootstrap";
import Demo from "./../../store/Hashtag";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import LetterBox from "./../../assets/Images/SecuredLetter2.png";
import SmsImg from "./../../assets/Images/Sms.png";
import NotificationImg from "./../../assets/Images/Notification.png";
import RedDeleteIcon from "./../../assets/Images/red-delete-icon.png";
import BlackInfoIcon from "./../../assets/Images/Info-black.png";
import CancelImg from "./../../assets/Images/Circle-cancel.png";
import WhatsappImg from "./../../assets/Images/WhatsappImg.png";
import { Checkbox } from "antd";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import CKEditor from "ckeditor4-react";
import Modal from "react-bootstrap/Modal";
import { authHeader } from "./../../helpers/authHeader";
import axios from "axios";
import config from "./../../helpers/config";
import { NotificationManager } from "react-notifications";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import matchSorter from "match-sorter";
import * as translationHI from "../../translations/hindi";
import * as translationMA from "../../translations/marathi";
const { Option } = Select;
class Alerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      AddAlertTabsPopup: false,
      content: "",
      tabIndex: 0,
      innerTabIndex: 0,
      alert: [],
      updateAlertTypeName: "",
      updateAlertisActive: "",
      emailCust: false,
      emailInt: false,
      emailStore: false,
      smsCust: false,
      notiInt: false,
      selectedAlertType: 0,
      selectedAlertTypeName: 0,
      selectedEmailCustomer: false,
      selectedEmailInternal: false,
      selectedEmailStore: false,
      selectedSMSCustomer: false,
      selectedNotifInternal: false,
      selectedStatus: "true",
      selectedToCustomer: "",
      selectedCCCustomer: "",
      selectedBCCCustomer: "",
      selectedSubjectCustomer: "",
      selectedCKCustomer: "",
      selectedToInternal: "",
      selectedCCInternal: "",
      selectedBCCInternal: "",
      selectedSubjectInternal: "",
      selectedCKInternal: "",
      selectedToStore: "",
      selectedCCStore: "",
      selectedBCCStore: "",
      selectedSubjectStore: "",
      selectedCKStore: "",
      selectedSMSContent: "",
      selectedNotifContent: "",
      alertTypeCompulsion: "",
      statusCompulsion: "",
      communicationModeCompulsion: "",
      toCustomerCompulsion: "",
      subjectCustomerCompulsion: "",
      ckCustomerCompulsion: "",
      toInternalCompulsion: "",
      subjectInternalCompulsion: "",
      ckInternalCompulsion: "",
      toStoreCompulsion: "",
      subjectStoreCompulsion: "",
      ckStoreCompulsion: "",
      SMSContentCompulsion: "",
      NotifContentCompulsion: "",
      alertData: [],
      rowData: {},
      editAlertNameCopulsion: "Please enter alerttype name.",
      editModal: false,
      alertEdit: {},
      isEdit: false,
      editSaveLoading: false,
      editalertTypeCompulsion: "Please Enter Alert Type",
      sortAllData: [],
      sortAlertType: [],
      sortCreatedBy: [],
      sortStatus: [],
      sortHeader: "",
      alertColor: "",
      createdColor: "",
      statusColor: "",
      sortColumn: "",
      StatusModel: false,
      editcommunicationModeCompulsion: "",
      AssignToData: [],
      isExitsType: "",
      checkIsExistType: false,
      placeholderData: [],
      cAlertTypeId: 0,
      sAlertTypeId: 0,
      iAlertTypeId: 0,
      nAlertTypeId: 0,
      placeholderShown: false,
      tempalert: [],
      filterTxtValue: "",
      sFilterCheckbox: "",
      sortFilterAlertType: [],
      sortFilterCreatedBy: [],
      sortFilterStatus: [],
      isFileUploadFail: false,
      progressValue: 0,
      fileSize: "",
      showProgress: false,
      bulkuploadCompulsion: "",
      fileN: [],
      salertTypeNameFilterCheckbox: "",
      screatedByFilterCheckbox: "",
      sisAlertActiveFilterCheckbox: "",
      ckCusrsorPositionCustomer: 0,
      ckCusrsorDataCustomer: "",
      ckCusrsorPositionInternal: 0,
      ckCusrsorDataInternal: "",
      ckCusrsorPositionStore: 0,
      ckCusrsorDataStore: "",
      notiCount: 0,
      notiCurPosi: 0,
      isortA: false,
      translateLanguage: {},
      viewWhatsappCustomer: false,
      viewWhatsappInternal: false,
      whatsappCust: false,
      whatsappInt: false,
      innerTabIndexWhatsapp: 0,
      selectedWhatsappCustomer: false,
      selectedWhatsappInternal: false,
      selectedWhatsappCustomerContent: "",
      selectedWhatsappInternalContent: "",
      WhatsappCustomerContentCompulsion: "",
      WhatsappInternalContentCompulsion: "",
      wCAlertTypeId: 0,
      wIAlertTypeId: 0,
      whatsappTamplateList: [],
      whatsappPlaceholderList: [],
      selectedCustomerWhatappTamplate: null,
      selectedCustomerWhatappPlaceholder: null,
      selectedInternalWhatappTamplate: null,
      selectedInternalWhatappPlaceholder: null,
      smsdata: [],
      textdescription: "",
      selectTemplateId: 0,
      isTextArea: false,
      forBrandID: "",
      editforBrandID: "",
      BrandDataList: []



    };
    this.updateContent = this.updateContent.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleAddAlertTabsOpen = this.handleAddAlertTabsOpen.bind(this);
    this.handleAddAlertTabsClose = this.handleAddAlertTabsClose.bind(this);
    this.handleGetAlert = this.handleGetAlert.bind(this);
    this.handleUpdateAlertTypeName = this.handleUpdateAlertTypeName.bind(this);
    this.handleInsertAlert = this.handleInsertAlert.bind(this);
    this.handleAlertData = this.handleAlertData.bind(this);
    this.handleUpdateAlert = this.handleUpdateAlert.bind(this);
    this.handleEditModal = this.handleEditModal.bind(this);
    this.handleAlertTabs = this.handleAlertTabs.bind(this);
    this.handlePlaceholderList = this.handlePlaceholderList.bind(this);
  }

  componentDidMount() {
    this.handleGetBrandList()
    this.handleGetAlert();
    // this.handleAlertData();
    this.handleGetAgentList();
    this.handleGetWhatsAppVariableAlertList();
    this.handleGetWhatsAppTemplateAlertList();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
    this.handleGetSMSData();
  }

  handlePlaceholderList(alertId) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Template/GetMailParameter",
      headers: authHeader(),
      params: {
        AlertID: alertId,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            placeholderData: data,
            placeholderShown: true,
          });
        } else {
          self.setState({
            placeholderData: [],
            placeholderShown: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  setPlaceholderValue(type, e) {
    let matchedArr = this.state.placeholderData.filter(
      (x) => x.mailParameterID == e.currentTarget.value
    );
    let placeholderName = matchedArr[0].parameterName;
    if (type == "Customer") {
      let ckData = this.state.selectedCKCustomer;
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
          if (
            this.state.ckCusrsorDataCustomer.trim() == ckDataArrNew[i].trim()
          ) {
            selectedVal = ckDataArrNew[i];
            selectedArr = i;
            ckTags = ckDataArr[i].match(/<[^>]+>/g);
            loopFlag = false;
          }
        }
      }
      let ckDataArrLast = selectedVal;
      let textBefore = ckDataArrLast.substring(
        0,
        this.state.ckCusrsorPositionCustomer
      );
      let textAfter = ckDataArrLast.substring(
        this.state.ckCusrsorPositionCustomer,
        ckDataArrLast.length
      );
      ckDataArrLast = textBefore + " " + placeholderName + textAfter;
      let newCkCusrsorPosition =
        this.state.ckCusrsorPositionCustomer + placeholderName.length + 1;
      this.setState({
        ckCusrsorPositionCustomer: newCkCusrsorPosition,
        ckCusrsorDataCustomer: ckDataArrLast,
      });
      if (ckTags) {
        let ckFinal = ckTags[0] + ckDataArrLast + ckTags[1];
        ckDataArr.splice(selectedArr, 1, ckFinal);
        ckData = ckDataArr.join(" ");
      }
      if (ckTags) {
        this.setState({ selectedCKCustomer: ckData });
      } else {
        this.setState({ selectedCKCustomer: ckDataArrLast });
      }
    } else if (type == "Internal") {
      let ckData = this.state.selectedCKInternal;
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
          if (
            this.state.ckCusrsorDataInternal.trim() == ckDataArrNew[i].trim()
          ) {
            selectedVal = ckDataArrNew[i];
            selectedArr = i;
            ckTags = ckDataArr[i].match(/<[^>]+>/g);
            loopFlag = false;
          }
        }
      }
      let ckDataArrLast = selectedVal;
      let textBefore = ckDataArrLast.substring(
        0,
        this.state.ckCusrsorPositionInternal
      );
      let textAfter = ckDataArrLast.substring(
        this.state.ckCusrsorPositionInternal,
        ckDataArrLast.length
      );
      ckDataArrLast = textBefore + " " + placeholderName + textAfter;
      let newCkCusrsorPosition =
        this.state.ckCusrsorPositionInternal + placeholderName.length + 1;
      this.setState({
        ckCusrsorPositionInternal: newCkCusrsorPosition,
        ckCusrsorDataInternal: ckDataArrLast,
      });
      if (ckTags) {
        let ckFinal = ckTags[0] + ckDataArrLast + ckTags[1];
        ckDataArr.splice(selectedArr, 1, ckFinal);
        ckData = ckDataArr.join(" ");
      }
      if (ckTags) {
        this.setState({ selectedCKInternal: ckData });
      } else {
        this.setState({ selectedCKInternal: ckDataArrLast });
      }
    } else if (type == "Store") {
      let ckData = this.state.selectedCKStore;
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
          if (this.state.ckCusrsorDataStore.trim() == ckDataArrNew[i].trim()) {
            selectedVal = ckDataArrNew[i];
            selectedArr = i;
            ckTags = ckDataArr[i].match(/<[^>]+>/g);
            loopFlag = false;
          }
        }
      }
      let ckDataArrLast = selectedVal;
      let textBefore = ckDataArrLast.substring(
        0,
        this.state.ckCusrsorPositionStore
      );
      let textAfter = ckDataArrLast.substring(
        this.state.ckCusrsorPositionStore,
        ckDataArrLast.length
      );
      ckDataArrLast = textBefore + " " + placeholderName + textAfter;
      let newCkCusrsorPosition =
        this.state.ckCusrsorPositionStore + placeholderName.length + 1;
      this.setState({
        ckCusrsorPositionStore: newCkCusrsorPosition,
        ckCusrsorDataStore: ckDataArrLast,
      });
      if (ckTags) {
        let ckFinal = ckTags[0] + ckDataArrLast + ckTags[1];
        ckDataArr.splice(selectedArr, 1, ckFinal);
        ckData = ckDataArr.join(" ");
      }
      if (ckTags) {
        this.setState({ selectedCKStore: ckData });
      } else {
        this.setState({ selectedCKStore: ckDataArrLast });
      }
    } else if (type == "Notification") {
      let textBefore = this.state.selectedNotifContent.substring(
        0,
        this.state.notiCurPosi
      );
      let textAfter = this.state.selectedNotifContent.substring(
        this.state.notiCurPosi,
        this.state.notiCount
      );
      let ckData = textBefore + " " + placeholderName + textAfter;
      let notiCurPosi = textBefore.length + placeholderName.length + 1;
      let notiCount =
        textBefore.length + placeholderName.length + 1 + textAfter.length;
      this.setState({ selectedNotifContent: ckData, notiCurPosi, notiCount });
    }
  }

  sortStatusZtoA() {
    var itemsArray = [];
    itemsArray = this.state.alert;

    if (this.state.sortColumn === "alertTypeName") {
      itemsArray.sort((a, b) => {
        if (a.alertTypeName < b.alertTypeName) return 1;
        if (a.alertTypeName > b.alertTypeName) return -1;
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
    if (this.state.sortColumn === "isAlertActive") {
      itemsArray.sort((a, b) => {
        if (a.isAlertActive < b.isAlertActive) return 1;
        if (a.isAlertActive > b.isAlertActive) return -1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      alert: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    var itemsArray = [];
    itemsArray = this.state.alert;

    if (this.state.sortColumn === "alertTypeName") {
      itemsArray.sort((a, b) => {
        if (a.alertTypeName < b.alertTypeName) return -1;
        if (a.alertTypeName > b.alertTypeName) return 1;
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
    if (this.state.sortColumn === "isAlertActive") {
      itemsArray.sort((a, b) => {
        if (a.isAlertActive < b.isAlertActive) return -1;
        if (a.isAlertActive > b.isAlertActive) return 1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      alert: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }
  StatusOpenModel(data, header) {
    if (
      this.state.sortFilterAlertType.length === 0 ||
      this.state.sortFilterCreatedBy.length === 0 ||
      this.state.sortFilterStatus.length === 0
    ) {
      return false;
    }
    if (data === "alertTypeName") {
      if (
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.sisAlertActiveFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          screatedByFilterCheckbox: "",
          sisAlertActiveFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "createdBy") {
      if (
        this.state.salertTypeNameFilterCheckbox !== "" ||
        this.state.sisAlertActiveFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          salertTypeNameFilterCheckbox: "",
          sisAlertActiveFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "isAlertActive") {
      if (
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.salertTypeNameFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          salertTypeNameFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }
  onCkBlurCustomer = (evt) => {
    var ckCusrsorPositionCustomer = evt.editor.getSelection().getRanges()[0];
    var ckCusrsorDataCustomer = evt.editor.getSelection().getRanges()[0]
      .endContainer.$.wholeText;
    if (!ckCusrsorDataCustomer) {
      ckCusrsorDataCustomer = "";
    }
    this.setState({
      ckCusrsorPositionCustomer: ckCusrsorPositionCustomer.startOffset,
      ckCusrsorDataCustomer,
    });
  };
  onCkBlurInternal = (evt) => {
    var ckCusrsorPositionInternal = evt.editor.getSelection().getRanges()[0];
    var ckCusrsorDataInternal = evt.editor.getSelection().getRanges()[0]
      .endContainer.$.wholeText;
    if (!ckCusrsorDataInternal) {
      ckCusrsorDataInternal = "";
    }
    this.setState({
      ckCusrsorPositionInternal: ckCusrsorPositionInternal.startOffset,
      ckCusrsorDataInternal,
    });
  };
  onCkBlurStore = (evt) => {
    var ckCusrsorPositionStore = evt.editor.getSelection().getRanges()[0];
    var ckCusrsorDataStore = evt.editor.getSelection().getRanges()[0]
      .endContainer.$.wholeText;
    if (!ckCusrsorDataStore) {
      ckCusrsorDataStore = "";
    }
    this.setState({
      ckCusrsorPositionStore: ckCusrsorPositionStore.startOffset,
      ckCusrsorDataStore,
    });
  };
  StatusCloseModel = (e) => {
    if (this.state.tempalert.length > 0) {
      this.setState({
        StatusModel: false,
        alert: this.state.tempalert,
        filterTxtValue: "",
        sortFilterAlertType: this.state.sortAlertType,
        sortFilterCreatedBy: this.state.sortCreatedBy,
        sortFilterStatus: this.state.sortStatus,
      });
      if (this.state.sortColumn === "alertTypeName") {
        if (this.state.salertTypeNameFilterCheckbox === "") {
        } else {
          this.setState({
            screatedByFilterCheckbox: "",
            sisAlertActiveFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "createdBy") {
        if (this.state.screatedByFilterCheckbox === "") {
        } else {
          this.setState({
            salertTypeNameFilterCheckbox: "",
            sisAlertActiveFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "isAlertActive") {
        if (this.state.sisAlertActiveFilterCheckbox === "") {
        } else {
          this.setState({
            salertTypeNameFilterCheckbox: "",
            screatedByFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        alert: this.state.isortA ? this.state.alert : this.state.sortAllData,
        filterTxtValue: "",
        sortFilterAlertType: this.state.sortAlertType,
        sortFilterCreatedBy: this.state.sortCreatedBy,
        sortFilterStatus: this.state.sortStatus,
      });
    }
  };

  setSortCheckStatus = (column, type, e) => {
    var itemsArray = [];

    var salertTypeNameFilterCheckbox = this.state.salertTypeNameFilterCheckbox;
    var screatedByFilterCheckbox = this.state.screatedByFilterCheckbox;
    var sisAlertActiveFilterCheckbox = this.state.sisAlertActiveFilterCheckbox;

    if (column === "alertTypeName" || column === "all") {
      if (type === "value" && type !== "All") {
        salertTypeNameFilterCheckbox = salertTypeNameFilterCheckbox.replace(
          "all",
          ""
        );
        salertTypeNameFilterCheckbox = salertTypeNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (salertTypeNameFilterCheckbox.includes(e.currentTarget.value)) {
          salertTypeNameFilterCheckbox = salertTypeNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          salertTypeNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (salertTypeNameFilterCheckbox.includes("all")) {
          salertTypeNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "alertTypeName") {
            for (let i = 0; i < this.state.sortAlertType.length; i++) {
              salertTypeNameFilterCheckbox +=
                this.state.sortAlertType[i].alertTypeName + ",";
            }
            salertTypeNameFilterCheckbox += "all";
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
    if (column === "isAlertActive" || column === "all") {
      if (type === "value" && type !== "All") {
        sisAlertActiveFilterCheckbox = sisAlertActiveFilterCheckbox.replace(
          "all",
          ""
        );
        sisAlertActiveFilterCheckbox = sisAlertActiveFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sisAlertActiveFilterCheckbox.includes(e.currentTarget.value)) {
          sisAlertActiveFilterCheckbox = sisAlertActiveFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sisAlertActiveFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sisAlertActiveFilterCheckbox.includes("all")) {
          sisAlertActiveFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "isAlertActive") {
            for (let i = 0; i < this.state.sortStatus.length; i++) {
              sisAlertActiveFilterCheckbox +=
                this.state.sortStatus[i].isAlertActive + ",";
            }
            sisAlertActiveFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      salertTypeNameFilterCheckbox,
      screatedByFilterCheckbox,
      sisAlertActiveFilterCheckbox,
      alertColor: "",
      createdColor: "",
      statusColor: "",
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "alertTypeName") {
      var sItems = salertTypeNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.alertTypeName === sItems[i]
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
        alertColor: "sort-column",
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
    } else if (column === "isAlertActive") {
      var sItems = sisAlertActiveFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.isAlertActive === sItems[i]
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
      tempalert: itemsArray,
    });
  };

  callBackEdit = (alertTypeName, isAlertActive, rowData) => {
    this.state.updateAlertTypeName = alertTypeName;
    this.state.updateAlertisActive = isAlertActive;
    this.state.rowData = rowData;
  };
  setNotiCurPosi = (e) => {
    this.setState({
      notiCurPosi: e.target.selectionStart,
    });
  };
  setDataOnChangeAlert = (e) => {
    if (e.target.name == "selectedAlertType") {
      if (e.target.value !== "0") {
        this.setState({
          [e.target.name]: e.target.value,
          selectedAlertTypeName: e.target.selectedOptions[0].innerText,
        });
        this.handlePlaceholderList(e.target.value);
        let self = this;
        axios({
          method: "post",
          url: config.apiUrl + "/Alert/ValidateAlertNameExist",
          params: { alertTypeId: e.target.value },
          headers: authHeader(),
        })
          .then(function (res) {
            var data = res.data.responseData;
            var msg = res.data.message;
            var status = res.data.status;
            if (msg === "Success" && status == true) {
              if (data !== "Not Exist") {
                self.setState({ isExitsType: data, checkIsExistType: true });
              } else {
                self.setState({ isExitsType: "", checkIsExistType: false });
              }
            } else {
              self.setState({ isExitsType: "", checkIsExistType: false });
            }
          })
          .catch((response) => {
            console.log(response);
          });
      } else {
        this.setState({
          isExitsType: "",
          [e.target.name]: e.target.value,
          checkIsExistType: false,
        });
      }
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
    if (e.target.name == "selectedNotifContent") {
      this.setState({
        notiCount: e.target.value.length,
        notiCurPosi: e.target.value.length,
      });
    }
  };

  setCKEditorCustomer = (evt) => {
    var newContent = evt.editor.getData();
    this.setState({
      selectedCKCustomer: newContent,
    });
  };
  setCKEditorInternal = (evt) => {
    var newContent = evt.editor.getData();
    this.setState({
      selectedCKInternal: newContent,
    });
  };
  setCKEditorStore = (evt) => {
    var newContent = evt.editor.getData();
    this.setState({
      selectedCKStore: newContent,
    });
  };

  handleAlertData() {
    let self = this;
    axios({
      method: "post",
      //url: config.apiUrl + "/Alert/BindAlerts",
      url: config.apiUrl + "/Alert/BindAlertsByBrand",
      headers: authHeader(),
      params: {
        BrandId: parseInt(this.state.forBrandID)
      }
    })
      .then(function (res) {
        var data = res.data.responseData;
        var msg = res.data.message;
        if (msg === "Success") {
          self.setState({
            alertData: data,
          });
        } else {
          self.setState({
            alertData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleAlertTabs = (e) => {
    let check = e.target.checked;
    let val = e.target.value;

    if (check === true) {
      this.setState({
        [val]: true,
      });
    } else {
      this.setState({
        [val]: false,
      });
    }
    setTimeout(() => {
      if (
        this.state.emailCust ||
        this.state.emailInt ||
        this.state.emailStore
      ) {
        this.setState({
          tabIndex: 0,
        });
      } else if (this.state.smsCust) {
        this.setState({
          tabIndex: 1,
        });
      } else if (this.state.notiInt) {
        this.setState({
          tabIndex: 2,
        });
      } else if (this.state.whatsappInt || this.state.whatsappCust) {
        this.setState({
          tabIndex: 3,
        });
      }
      if (this.state.emailCust) {
        this.setState({
          innerTabIndex: 0,
        });
      } else if (this.state.emailInt) {
        this.setState({
          innerTabIndex: 1,
        });
      } else if (this.state.emailStore) {
        this.setState({
          innerTabIndex: 2,
        });
      }
      if (this.state.whatsappCust) {
        this.setState({
          innerTabIndexWhatsapp: 0,
        });
      } else if (this.state.whatsappInt) {
        this.setState({
          innerTabIndexWhatsapp: 1,
        });
      }
    }, 100);
    if (val === "emailCust" && check === true) {
      this.state.selectedEmailCustomer = true;
    } else if (val === "emailCust" && check === false) {
      this.state.selectedEmailCustomer = false;
    }

    if (val === "emailInt" && check === true) {
      this.state.selectedEmailInternal = true;
    } else if (val === "emailInt" && check === false) {
      this.state.selectedEmailInternal = false;
    }
    if (val === "emailStore" && check === true) {
      this.state.selectedEmailStore = true;
    } else if (val === "emailStore" && check === false) {
      this.state.selectedEmailStore = false;
    }
    if (val === "smsCust" && check === true) {
      this.state.selectedSMSCustomer = true;
    } else if (val === "smsCust" && check === false) {
      this.state.selectedSMSCustomer = false;
    }
    if (val === "notiInt" && check === true) {
      this.state.selectedNotifInternal = true;
    } else if (val === "notiInt" && check === false) {
      this.state.selectedNotifInternal = false;
    }
    if (val === "whatsappCust" && check === true) {
      this.state.selectedWhatsappCustomer = true;
    } else if (val === "whatsappCust" && check === false) {
      this.state.selectedWhatsappCustomer = false;
    }
    if (val === "whatsappInt" && check === true) {
      this.state.selectedWhatsappInternal = true;
    } else if (val === "whatsappInt" && check === false) {
      this.state.selectedWhatsappInternal = false;
    }
  };

  handleGetAlert(id) {
    var alertId = 0;
    if (id) {
      alertId = id;
    } else {
      alertId = 0;
    }

    this.handlePlaceholderList(alertId);
    let self = this;
    axios({
      method: "post",
      // url: config.apiUrl + "/Alert/GetAlertList",
      url: config.apiUrl + "/Alert/GetAlertListWithBrand",
      params: { alertId: alertId },
      headers: authHeader(),
    })
      .then(function (res) {
        let alert = res.data.responseData;
        var data = res.data.responseData;
        //console.log("dadatata",data)
        if (id) {
          var data = alert[0].alertContent;
          var selectedSubjectCustomer = "";
          var selectedCKCustomer = "";
          var selectedSubjectInternal = "";
          var selectedCKInternal = "";
          var selectedSubjectStore = "";
          var selectedCKStore = "";
          var selectedSMSContent = "";
          var selectedNotifContent = "";
          var emailCust = false;
          var emailInt = false;
          var emailStore = false;
          var smsCust = false;
          var notiInt = false;
          var alertEdit = {};
          var cAlertTypeId = 0;
          var sAlertTypeId = 0;
          var iAlertTypeId = 0;
          var smAlertTypeId = 0;
          var nAlertTypeId = 0;
          var selectedWhatsappCustomerContent = "";
          var selectedWhatsappInternalContent = "";
          var whatsappCust = false;
          var whatsappInt = false;
          var wCAlertTypeId = 0;
          var wIAlertTypeId = 0;
          var selectedCustomerWhatappTamplate = null;
          var selectedCustomerWhatappPlaceholder = null;
          var selectedInternalWhatappTamplate = null;
          var selectedInternalWhatappPlaceholder = null;
          alertEdit.alertIsActive = res.data.responseData[0].isAlertActive;
          alertEdit.selectedAlertType = res.data.responseData[0].alertID;
          alertEdit.AlertTypeName = res.data.responseData[0].alertTypeName;

          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              if (data[i].isEmailCustomer) {
                emailCust = data[i].isEmailCustomer;
                selectedSubjectCustomer = data[i].subject;
                selectedCKCustomer = data[i].mailContent;
                cAlertTypeId = data[i].alertTypeID;
              }
              if (data[i].isEmailInternal) {
                emailInt = data[i].isEmailInternal;
                selectedSubjectInternal = data[i].subject;
                selectedCKInternal = data[i].mailContent;
                iAlertTypeId = data[i].alertTypeID;
              }
              if (data[i].isEmailStore) {
                emailStore = data[i].isEmailStore;
                selectedSubjectStore = data[i].subject;
                selectedCKStore = data[i].mailContent;
                sAlertTypeId = data[i].alertTypeID;
              }
              if (data[i].isSMSCustomer) {
                smsCust = data[i].isSMSCustomer;
                selectedSMSContent = data[i].smsContent;
                smAlertTypeId = data[i].alertTypeID;
              }
              if (data[i].isNotificationInternal) {
                notiInt = data[i].isNotificationInternal;
                selectedNotifContent = data[i].notificationContent;
                nAlertTypeId = data[i].alertTypeID;
              }
              if (data[i].isWhatsAppCustomer) {
                whatsappCust = data[i].isWhatsAppCustomer;
                selectedWhatsappCustomerContent = data[i].whatsAppContent;
                wCAlertTypeId = data[i].alertTypeID;
              }
              if (data[i].isWhatsAppInternal) {
                whatsappInt = data[i].isWhatsAppInternal;
                selectedWhatsappInternalContent = data[i].whatsAppContent;
                wIAlertTypeId = data[i].alertTypeID;
              }

              if (data[i].isWhatsAppCustomer) {
                whatsappCust = data[i].isWhatsAppCustomer;
                selectedWhatsappCustomerContent = data[i].whatsAppContent;
                var templateData = self.state.whatsappTamplateList.filter(
                  (x) => x.templateID == data[i].whatsAppTemplateName
                )[0];
                selectedCustomerWhatappTamplate = templateData;

                var placeTemp = [];
                data[i].whatsAppSelectedVariables
                  .split(",")
                  .forEach((element) => {
                    var tData = self.state.whatsappPlaceholderList.filter(
                      (x) => x.variableName == element
                    )[0];
                    placeTemp.push(tData);
                  });
                selectedCustomerWhatappPlaceholder = placeTemp;
                wCAlertTypeId = data[i].alertTypeID;
              }
              if (data[i].isWhatsAppInternal) {
                whatsappInt = data[i].isWhatsAppInternal;
                selectedWhatsappInternalContent = data[i].whatsAppContent;
                wIAlertTypeId = data[i].alertTypeID;

                var templateData = self.state.whatsappTamplateList.filter(
                  (x) => x.templateID == data[i].whatsAppTemplateName
                )[0];
                selectedInternalWhatappTamplate = templateData;

                var placeTemp = [];
                data[i].whatsAppSelectedVariables
                  .split(",")
                  .forEach((element) => {
                    var tData = self.state.whatsappPlaceholderList.filter(
                      (x) => x.variableName == element
                    )[0];
                    placeTemp.push(tData);
                  });
                selectedInternalWhatappPlaceholder = placeTemp;
              }
            }
          }

          self.setState({
            selectedCustomerWhatappTamplate,
            selectedCustomerWhatappPlaceholder,
            selectedInternalWhatappTamplate,
            selectedInternalWhatappPlaceholder,
            whatsappCust,
            selectedWhatsappCustomerContent,
            wCAlertTypeId,
            selectedWhatsappInternalContent,
            wIAlertTypeId,
            whatsappInt,
            cAlertTypeId,
            sAlertTypeId,
            iAlertTypeId,
            smAlertTypeId,
            nAlertTypeId,
            selectedSubjectCustomer,
            selectedCKCustomer,
            selectedSubjectInternal,
            selectedCKInternal,
            selectedSubjectStore,
            selectedCKStore,
            selectedSMSContent,
            selectedNotifContent,
            emailCust,
            emailInt,
            emailStore,
            smsCust,
            notiInt,
            alertEdit,
            editModal: true,
            isEdit: true,
            isTextArea: true
          });
        } else {
          if (alert !== null && alert !== undefined) {
            self.setState({ alert });
          }
        }

        if (data !== null) {
          self.state.sortAllData = data;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].alertTypeName]) {
              distinct.push(data[i].alertTypeName);
              unique[data[i].alertTypeName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortAlertType.push({ alertTypeName: distinct[i] });
            self.state.sortFilterAlertType.push({ alertTypeName: distinct[i] });
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
            if (!unique[data[i].isAlertActive]) {
              distinct.push(data[i].isAlertActive);
              unique[data[i].isAlertActive] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortStatus.push({ isAlertActive: distinct[i] });
            self.state.sortFilterStatus.push({ isAlertActive: distinct[i] });
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  deleteAlert(deleteId) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Alert/DeleteAlert",
      headers: authHeader(),
      params: {
        AlertID: deleteId,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.alertdeletedsuccessfully
              : "Alert deleted successfully."
          );
          self.handleGetAlert();
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.alertnotdeleted
              : "Alert not deleted."
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleUpdateAlert() {
    const TranslationContext = this.state.translateLanguage.default;
    if (this.state.alertEdit.selectedAlertType) {
      let AlertisActive;
      if (this.state.alertEdit.alertIsActive === "Active") {
        AlertisActive = true;
      } else if (this.state.alertEdit.alertIsActive === "Inactive") {
        AlertisActive = false;
      }

      if (this.state.notiInt == true) {
        if (this.state.selectedNotifContent == "") {
          this.setState({
            NotifContentCompulsion: "Please Enter Notification.",
          });
        } else {
          this.setState({
            NotifContentCompulsion: "Please Enter Notification",
          });
        }
      }
      if (this.state.smsCust == true) {
        if (this.state.selectedSMSContent == "") {
          this.setState({ SMSContentCompulsion: "Please Enter Message." });
        } else {
          this.setState({ SMSContentCompulsion: "" });
        }
      }

      if (this.state.emailCust == true) {
        if (this.state.selectedCKCustomer === "") {
          this.setState({ ckCustomerCompulsion: "Please Enter Description." });
          return false;
        } else {
          this.setState({ ckCustomerCompulsion: "" });
        }
      }

      if (this.state.emailInt == true) {
        if (this.state.selectedCKInternal === "") {
          this.setState({ ckInternalCompulsion: "Please Enter Subject." });
          return false;
        } else {
          this.setState({ ckInternalCompulsion: "" });
        }
      }

      if (this.state.emailStore == true) {
        if (this.state.selectedCKStore === "") {
          this.setState({ ckStoreCompulsion: "Please Enter Subject." });

          return false;
        } else {
          this.setState({ ckStoreCompulsion: "" });
        }
      }
      if (this.state.whatsappCust == true) {
        if (!this.state.selectedWhatsappCustomerContent) {
          this.setState({
            WhatsappCustomerContentCompulsion: "Please Enter Content.",
          });
          return false;
        } else {
          this.setState({
            WhatsappCustomerContentCompulsion: "",
          });
        }
      }
      if (this.state.whatsappInt == true) {
        if (!this.state.selectedWhatsappInternalContent) {
          this.setState({
            WhatsappInternalContentCompulsion: "Please Enter Content.",
          });
          return false;
        } else {
          this.setState({
            WhatsappInternalContentCompulsion: "",
          });
        }
      }
      var CommunicationModeDetails = [];

      var emailCustomer = {
        Communication_Mode: 240,
        CommunicationFor: 250,
        AlertTypeID: this.state.cAlertTypeId,
        Content: this.state.selectedCKCustomer,
        Subject: this.state.selectedSubjectCustomer,
      };
      var emailInternal = {
        Communication_Mode: 240,
        CommunicationFor: 251,
        AlertTypeID: this.state.iAlertTypeId,
        Content: this.state.selectedCKInternal,
        Subject: this.state.selectedSubjectInternal,
      };
      var emailStore = {
        Communication_Mode: 240,
        CommunicationFor: 252,
        AlertTypeID: this.state.sAlertTypeId,
        Content: this.state.selectedCKStore,
        Subject: this.state.selectedSubjectStore,
      };
      var sms = {
        Communication_Mode: 241,
        CommunicationFor: 250,
        AlertTypeID: this.state.sAlertTypeId,
        //Content: this.state.selectedSMSContent,
        Content: this.state.textdescription,
        smsTemplateID: this.state.selectTemplateId
      };
      var notification = {
        Communication_Mode: 242,
        CommunicationFor: 251,
        AlertTypeID: this.state.nAlertTypeId,
        Content: this.state.selectedNotifContent,
      };
      var whatsappcustomer = {
        Communication_Mode: 243,
        CommunicationFor: 250,
        AlertTypeID: this.state.wCAlertTypeId,
        Content: this.state.selectedWhatsappCustomerContent,
        WhatsAppTemplateID: this.state.selectedCustomerWhatappTamplate
          ? Number(this.state.selectedCustomerWhatappTamplate.templateID)
          : null,
        SelectedWhatsAppVariable: this.state.selectedCustomerWhatappPlaceholder
          ? this.state.selectedCustomerWhatappPlaceholder
            .map((x) => x.variableName)
            .join(",")
          : null,
      };
      var whatsappinternal = {
        Communication_Mode: 243,
        CommunicationFor: 251,
        AlertTypeID: this.state.wIAlertTypeId,
        Content: this.state.selectedWhatsappInternalContent,
        WhatsAppTemplateID: this.state.selectedInternalWhatappTamplate
          ? Number(this.state.selectedInternalWhatappTamplate.templateID)
          : 0,
        SelectedWhatsAppVariable: this.state.selectedInternalWhatappPlaceholder
          ? this.state.selectedInternalWhatappPlaceholder
            .map((x) => x.variableName)
            .join(",")
          : null,
      };
      if (this.state.emailCust) {
        CommunicationModeDetails.push(emailCustomer); //// for Email For Customer
      } else {
        // return false;
      }
      if (this.state.emailInt) {
        CommunicationModeDetails.push(emailInternal); //// for Email for Internal
      } else {
        // return false;
      }
      if (this.state.emailStore) {
        CommunicationModeDetails.push(emailStore); //// for Email for Store
      } else {
        // return false;
      }
      if (this.state.smsCust) {
        CommunicationModeDetails.push(sms); /// for SMS
      } else {
        // return false;
      }
      if (this.state.notiInt) {
        CommunicationModeDetails.push(notification); ////for Notification
      } else {
        // return false;
      }

      if (this.state.whatsappCust) {
        CommunicationModeDetails.push(whatsappcustomer); ////for Whatsapp Customer
      }
      if (this.state.whatsappInt) {
        CommunicationModeDetails.push(whatsappinternal); ////for Whatsapp Internal
      }
      this.setState({
        editSaveLoading: true,
      });

      let self = this;
      axios({
        method: "post",
        //url: config.apiUrl + "/Alert/ModifyAlert",
        url: config.apiUrl + "/Alert/ModifyAlertWithBrand",
        headers: authHeader(),
        data: {
          AlertID: this.state.alertEdit.selectedAlertType,
          AlertTypeName: this.state.alertEdit.AlertTypeName,
          isAlertActive: AlertisActive,
          brandId: parseInt(this.state.editforBrandID),
          CommunicationModeDetails: CommunicationModeDetails,
        },
      })
        .then((res) => {
          let status = res.data.message;
          if (status === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.alertupdatedsuccessfully
                : "Alert updated successfully."
            );
            self.handleGetAlert();
            self.handleAddAlertTabsClose();
            self.setState({
              AddAlertTabsPopup: false,
              editSaveLoading: false,
            });
          } else {
            self.setState({
              editSaveLoading: false,
              AddAlertTabsPopup: false,
            });
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.alertnotupdated
                : "Alert not updated."
            );
          }
        })
        .catch((data) => {
          self.setState({
            editSaveLoading: false,
            AddAlertTabsPopup: false,
          });
          console.log(data);
        });
    } else {
      NotificationManager.error(
        TranslationContext !== undefined
          ? TranslationContext.alertmessage.alertnotupdated
          : "Alert not updated."
      );
      this.setState({
        editAlertNameCopulsion: "Please enter alerttype name.",
      });
    }
  }

  updateAlert(individualData) {
    let self = this

    console.log("individualData", individualData)
    var filterdata = this.state.BrandDataList.filter((x) => x?.brandName === individualData?.brandName)
    console.log("individualData", filterdata)
    var data = self.state.alertEdit
    data["selectedAlertType"] = individualData.alertID.toString()
    console.log("fafaf", data)
    self.setState({
      editforBrandID: filterdata[0].brandID,
      alertEdit: data
    })
    this.handleGetAlert(individualData.alertID || 0);
    setTimeout(() => {
      this.handleAlertDataEdit()
    }, 100)
  }

  handleUpdateAlertTypeName(e) {
    this.setState({
      updateAlertTypeName: e.target.value,
    });
  }
  handleUpdateAlertisActive = (e) => {
    let updateAlertisActive = e.currentTarget.value;
    this.setState({ updateAlertisActive });
  };
  fileUpload = (e) => {
    this.setState({ fileName: e.target.files[0].name });
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
  handleAddAlertTabsOpen() {
    const TranslationContext = this.state.translateLanguage.default;
    if (
      (this.state.selectedAlertType > 0 &&
        this.state.selectedStatus !== "" &&
        this.state.selectedEmailCustomer === true) ||
      this.state.selectedEmailInternal === true ||
      this.state.selectedEmailStore === true ||
      this.state.selectedSMSCustomer === true ||
      this.state.selectedNotifInternal === true ||
      this.state.selectedWhatsappCustomer === true ||
      this.state.selectedWhatsappInternal === true
    ) {
      if (this.state.checkIsExistType) {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.alertalreadyexist
            : "Alert already exist!"
        );
      } else {
        this.setState({
          AddAlertTabsPopup: true,
          subjectCustomerCompulsion: "",
          ckCustomerCompulsion: "",
          subjectInternalCompulsion: "",
          ckInternalCompulsion: "",
          subjectStoreCompulsion: "",
          ckStoreCompulsion: "",
          SMSContentCompulsion: "",
          selectedSubjectCustomer: "",
          selectedCKCustomer: "",
          selectedSubjectInternal: "",
          selectedCKInternal: "",
          selectedSubjectStore: "",
          selectedCKStore: "",
          selectedSMSContent: "",
          selectedNotifContent: "",
          NotifContentCompulsion: "",
          NotifTicketingContentCompulsion: "",
          selectedWhatsappCustomerContent: "",
          selectedWhatsappInternalContent: "",
          textdescription: ""
        });
      }
    } else {
      this.setState({
        alertTypeCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseenteralerttype
            : "Please Enter Alert Type",
        statusCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectstatus
            : "Please Select Status",
        communicationModeCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectcommunicationmode
            : "Please Select Any Communication Mode",
      });
    }
  }
  handleAddAlertTabsClose() {
    this.setState({
      emailCust: false,
      emailInt: false,
      emailStore: false,
      smsCust: false,
      notiInt: false,
      selectedAlertType: 0,
      selectedAlertTypeName: 0,
      selectedEmailCustomer: false,
      selectedEmailInternal: false,
      selectedEmailStore: false,
      selectedSMSCustomer: false,
      selectedNotifInternal: false,
      AddAlertTabsPopup: false,
      subjectCustomerCompulsion: "",
      ckCustomerCompulsion: "",
      subjectInternalCompulsion: "",
      ckInternalCompulsion: "",
      subjectStoreCompulsion: "",
      ckStoreCompulsion: "",
      SMSContentCompulsion: "",
      selectedSubjectCustomer: "",
      selectedCKCustomer: "",
      selectedSubjectInternal: "",
      selectedCKInternal: "",
      selectedSubjectStore: "",
      selectedCKStore: "",
      selectedSMSContent: "",
      selectedNotifContent: "",
      NotifContentCompulsion: "",
      NotifTicketingContentCompulsion: "",
      selectedWhatsappCustomerContent: "",
      selectedWhatsappInternalContent: "",
      viewWhatsappCustomer: false,
      viewWhatsappInternal: false,
      whatsappCust: false,
      whatsappInt: false,
      innerTabIndexWhatsapp: 0,
      selectedWhatsappCustomer: false,
      selectedWhatsappInternal: false,
      WhatsappCustomerContentCompulsion: "",
      WhatsappInternalContentCompulsion: "",
      wCAlertTypeId: 0,
      wIAlertTypeId: 0,
      selectedCustomerWhatappTamplate: null,
      selectedCustomerWhatappPlaceholder: null,
      selectedInternalWhatappTamplate: null,
      selectedInternalWhatappPlaceholder: null,
      isEdit: false,
      editcommunicationModeCompulsion: "",
      editalertTypeCompulsion: "",
      isTextArea: false
    });
  }
  updateContent(newContent) {
    this.setState({
      content: newContent,
    });
  }
  onChange(evt) {
    var newContent = evt.editor.getData();
    this.setState({
      content: newContent,
    });
  }
  handleTabChange(index) {
    this.setState({
      tabIndex: index,
    });
  }
  validationInsertAlert() {
    var checkboxvalue = [];
    var validation = [];
    if (this.state.selectedEmailCustomer === true) {
      checkboxvalue.push("1");
      if (this.state.selectedCKCustomer.length > 0) {
        validation.push("1");
      }
    }

    if (this.state.selectedEmailInternal === true) {
      checkboxvalue.push("1");
      if (this.state.selectedCKInternal.length > 0) {
        validation.push("1");
      }
    }

    if (this.state.selectedEmailStore === true) {
      checkboxvalue.push("1");
      if (this.state.selectedCKStore.length > 0) {
        validation.push("1");
      }
    }

    if (this.state.selectedSMSCustomer === true) {
      checkboxvalue.push("1");
      if (this.state.textdescription.length > 0) {
        validation.push("1");
      }
    }

    if (this.state.selectedNotifInternal === true) {
      checkboxvalue.push("1");
      if (this.state.selectedNotifContent.length > 0) {
        validation.push("1");
      }
    }

    if (this.state.selectedWhatsappCustomer === true) {
      checkboxvalue.push("1");
      if (this.state.selectedWhatsappCustomerContent.length > 0) {
        validation.push("1");
      }
    }
    if (this.state.selectedWhatsappInternal === true) {
      checkboxvalue.push("1");
      if (this.state.selectedWhatsappInternalContent.length > 0) {
        validation.push("1");
      }
    }

    if (checkboxvalue.length === validation.length) {
      this.handleInsertAlert();
    } else {
      this.setState({
        toCustomerCompulsion: "Please Enter EmailID.",
        subjectCustomerCompulsion: "Please Enter Subject.",
        ckCustomerCompulsion: "Please Enter Description.",
        toInternalCompulsion: "Please Enter EmailID.",
        subjectInternalCompulsion: "Please Enter Subject.",
        ckInternalCompulsion: "Please Enter Description.",
        toStoreCompulsion: "Please Enter EmailID.",
        subjectStoreCompulsion: "Please Enter Subject.",
        ckStoreCompulsion: "Please Enter Description.",
        SMSContentCompulsion: "Please Enter Message.",
        NotifContentCompulsion: "Please Enter Notification",
        WhatsappCustomerContentCompulsion: "Please Enter Content.",
        WhatsappInternalContentCompulsion: "Please Enter Content.",
      });
    }
  }

  handleInsertAlert() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    var setstatus = false;
    var status = this.state.selectedStatus;
    if (status === "true") {
      setstatus = true;
    } else {
      setstatus = false;
    }

    var cust, inter, store, sms, notn, whatsappcustomer, whatsappinternal;
    var jsondata = [];

    cust = {
      Communication_Mode: 240,
      CommunicationFor: 250,
      Content: this.state.selectedCKCustomer,
      ToEmailID: this.state.selectedToCustomer,
      CCEmailID: this.state.selectedCCCustomer,
      BCCEmailID: this.state.selectedBCCCustomer,
      Subject: this.state.selectedSubjectCustomer,
    };
    inter = {
      Communication_Mode: 240,
      CommunicationFor: 251,
      Content: this.state.selectedCKInternal,
      ToEmailID: this.state.selectedToInternal,
      CCEmailID: this.state.selectedCCInternal,
      BCCEmailID: this.state.selectedBCCInternal,
      Subject: this.state.selectedSubjectInternal,
    };
    store = {
      Communication_Mode: 240,
      CommunicationFor: 252,
      Content: this.state.selectedCKStore,
      ToEmailID: this.state.selectedToStore,
      CCEmailID: this.state.selectedCCStore,
      BCCEmailID: this.state.selectedBCCStore,
      Subject: this.state.selectedSubjectStore,
    };
    sms = {
      Communication_Mode: 241,
      CommunicationFor: 250,
      // Content: this.state.selectedSMSContent,
      Content: this.state.textdescription,
      smsTemplateID: this.state.selectTemplateId
    };
    notn = {
      Communication_Mode: 242,
      CommunicationFor: 251,
      Content: this.state.selectedNotifContent,
    };
    whatsappcustomer = {
      Communication_Mode: 243,
      CommunicationFor: 250,
      Content: this.state.selectedWhatsappCustomerContent,
      WhatsAppTemplateID: this.state.selectedCustomerWhatappTamplate
        ? Number(this.state.selectedCustomerWhatappTamplate.templateID)
        : 0,
      SelectedWhatsAppVariable: this.state.selectedCustomerWhatappPlaceholder
        ? this.state.selectedCustomerWhatappPlaceholder
          .map((x) => x.variableName)
          .join(",")
        : null,
    };
    whatsappinternal = {
      Communication_Mode: 243,
      CommunicationFor: 251,
      Content: this.state.selectedWhatsappInternalContent,
      WhatsAppTemplateID: this.state.selectedInternalWhatappTamplate
        ? Number(this.state.selectedInternalWhatappTamplate.templateID)
        : 0,
      SelectedWhatsAppVariable: this.state.selectedInternalWhatappPlaceholder
        ? this.state.selectedInternalWhatappPlaceholder
          .map((x) => x.variableName)
          .join(",")
        : null,
    };

    if (this.state.selectedEmailCustomer === true) {
      jsondata.push(cust);
    }
    if (this.state.selectedEmailInternal === true) {
      jsondata.push(inter);
    }
    if (this.state.selectedEmailStore === true) {
      jsondata.push(store);
    }
    if (this.state.selectedSMSCustomer === true) {
      jsondata.push(sms);
    }
    if (this.state.selectedNotifInternal === true) {
      jsondata.push(notn);
    }
    //for whatsapp
    if (this.state.selectedWhatsappCustomer === true) {
      jsondata.push(whatsappcustomer);
    }
    if (this.state.selectedWhatsappInternal === true) {
      jsondata.push(whatsappinternal);
    }
    //console.log("jsondata",jsondata)
    var json = {
      AlertTypeName: this.state.selectedAlertTypeName,
      isAlertActive: setstatus,
      brandId: parseInt(this.state.forBrandID),
      CommunicationModeDetails: jsondata,
    };

    axios({
      method: "post",
      // url: config.apiUrl + "/Alert/CreateAlert",
      url: config.apiUrl + "/Alert/CreateAlertByBrand",
      headers: authHeader(),
      data: json,
    })
      .then(function (res) {
        let id = res.data.responseData;
        let Msg = res.data.message;
        if (Msg === "Success") {
          self.handleGetAlert();
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordsavedsuccessfully
              : "Record Saved successfully."
          );
          self.handleAddAlertTabsClose();
        } else if (status === "Record Already Exists ") {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordalreadyexists
              : "Record Already Exists."
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleEditModal() {
    this.setState({ editModal: false, isEdit: false });
  }

  editAlertModalData(e) {
    const TranslationContext = this.state.translateLanguage.default;
    const { name, value } = e.target;

    var data = this.state.alertEdit;
    if (name === "selectedAlertType") {
      if (value == "Select Alert") {
        var alertName = e.target.selectedOptions[0].innerText;
        data[name] = value;
        data["AlertTypeName"] = alertName;
        this.setState({
          editalertTypeCompulsion:
            TranslationContext !== undefined
              ? TranslationContext.validation.pleaseenteralerttype
              : "Please Enter Alert Type",
        });
        this.setState({ alertEdit: data });
      } else {
        var alertName = e.target.selectedOptions[0].innerText;
        data[name] = value;
        this.handlePlaceholderList(value);
        data["AlertTypeName"] = alertName;
        this.setState({ editalertTypeCompulsion: "" });
        this.setState({ alertEdit: data });
      }
    } else {
      data[name] = value;
      this.setState({ alertEdit: data });
    }
  }
  handleOpenAdd() {
    const TranslationContext = this.state.translateLanguage.default;
    if (this.state.alertEdit.AlertTypeName == "Select Alert") {
      this.setState({
        editalertTypeCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseenteralerttype
            : "Please Enter Alert Type",
      });
    } else if (
      this.state.emailCust === false &&
      this.state.emailInt === false &&
      this.state.emailStore === false &&
      this.state.smsCust === false &&
      this.state.notiInt === false &&
      this.state.whatsappCust === false &&
      this.state.whatsappInt === false
    ) {
      this.setState({
        editcommunicationModeCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectcommunicationmode
            : "Please Select Any Communication Mode",
      });
    } else {
      var innerTabIndex = 0;
      var innerTabIndexWhatsapp = 0;
      if (this.state.emailCust === true) {
        innerTabIndex = 0;
      } else if (this.state.emailInt === true) {
        innerTabIndex = 1;
      } else if (this.state.emailStore === true) {
        innerTabIndex = 2;
      }
      if (
        this.state.emailCust === true ||
        this.state.emailInt === true ||
        this.state.emailTicketing === true
      ) {
        this.setState({
          tabIndex: 0,
        });
      } else if (this.state.smsCust === true) {
        this.setState({
          tabIndex: 1,
        });
      } else if (this.state.whatsappCust || this.state.whatsappInt) {
        this.setState({
          tabIndex: 3,
        });
      } else {
        this.setState({
          tabIndex: 2,
        });
      }

      if (this.state.whatsappCust) {
        innerTabIndexWhatsapp = 0;
      } else if (this.state.whatsappInt) {
        innerTabIndexWhatsapp = 1;
      }

      this.setState({
        innerTabIndexWhatsapp,
        AddAlertTabsPopup: true,
        editModal: false,
        innerTabIndex,
      });
    }
  }

  ///handle get agent list
  handleGetAgentList() {
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
          });
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

  ///handle on change
  setAssignedToValue(type, e) {
    if (type === "Customer") {
      let ckData = this.state.selectedCKCustomer;
      let matchedArr = this.state.AssignToData.filter(
        (x) => x.userID == e.currentTarget.value
      );
      let userName = matchedArr[0].fullName;
      ckData += "@" + userName;
      this.setState({ selectedCKCustomer: ckData });
    }
    if (type == "Internal") {
      let ckData = this.state.selectedCKInternal;
      let matchedArr = this.state.AssignToData.filter(
        (x) => x.userID == e.currentTarget.value
      );
      let userName = matchedArr[0].fullName;
      ckData += "@" + userName;
      this.setState({ selectedCKInternal: ckData });
    }
    if (type == "Store") {
      let ckData = this.state.selectedCKStore;
      let matchedArr = this.state.AssignToData.filter(
        (x) => x.userID == e.currentTarget.value
      );
      let userName = matchedArr[0].fullName;
      ckData += "@" + userName;
      this.setState({ selectedCKStore: ckData });
    }
  }
  filteTextChange(e) {
    this.setState({ filterTxtValue: e.target.value });

    if (this.state.sortColumn === "alertTypeName") {
      var sortFilterAlertType = matchSorter(
        this.state.sortAlertType,
        e.target.value,
        { keys: ["alertTypeName"] }
      );
      if (sortFilterAlertType.length > 0) {
        this.setState({ sortFilterAlertType });
      } else {
        this.setState({
          sortFilterAlertType: this.state.sortAlertType,
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
    if (this.state.sortColumn === "isAlertActive") {
      var sortFilterStatus = matchSorter(
        this.state.sortStatus,
        e.target.value,
        { keys: ["isAlertActive"] }
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
  hanldeAddBulkUpload() {
    if (this.state.fileN.length > 0 && this.state.fileN !== []) {
      let self = this;
      const formData = new FormData();

      formData.append("file", this.state.fileN[0]);
      this.setState({ showProgress: true });
      axios({
        method: "post",
        url: config.apiUrl + "/Alert/BulkUploadUser",
        headers: authHeader(),
        data: formData,
        onUploadProgress: (ev = ProgressEvent) => {
          const progress = (ev.loaded / ev.total) * 100;
          this.updateUploadProgress(Math.round(progress));
        },
      })
        .then(function (res) {
          let status = res.data.message;
          let data = res.data.responseData;
          if (status === "Success") {
            NotificationManager.success("File uploaded successfully.");
            self.setState({ fileName: "", fileSize: "", fileN: [] });
            self.handleAlertData();
          } else {
            self.setState({
              showProgress: false,
              isFileUploadFail: true,
              progressValue: 0,
            });
            NotificationManager.error("File not uploaded.");
          }
        })
        .catch((data) => {
          if (data.message) {
            this.setState({ showProgress: false, isFileUploadFail: true });
          }
          console.log(data);
        });
    } else {
      this.setState({
        bulkuploadCompulsion: "Please select file.",
      });
    }
  }
  updateUploadProgress(value) {
    this.setState({ progressValue: value });
  }
  handleDeleteBulkupload = (e) => {
    this.setState({
      fileN: [],
      fileName: "",
    });
    NotificationManager.success("File deleted successfully.");
  };

  handleGetWhatsAppTemplateAlertList = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Alert/GetWhatsAppTemplateAlertList",
      headers: authHeader(),
    })
      .then(function (res) {
        var message = res.data.message;
        var responseData = res.data.responseData;
        if (message === "Success") {
          self.setState({
            whatsappTamplateList: responseData,
          });
        } else {
          self.setState({
            whatsappTamplateList: [],
          });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };
  handleGetWhatsAppVariableAlertList = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Alert/GetWhatsAppVariableAlertList",
      headers: authHeader(),
    })
      .then(function (res) {
        var message = res.data.message;
        var responseData = res.data.responseData;
        if (message === "Success") {
          self.setState({
            whatsappPlaceholderList: responseData,
          });
        } else {
          self.setState({
            whatsappPlaceholderList: [],
          });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };
  handleWhatsappCustomerTemplateChange = (e) => {
    this.setState({
      selectedWhatsappCustomerContent: e.templateContent,
      selectedCustomerWhatappPlaceholder: null,
      selectedCustomerWhatappTamplate: e,
    });
  };
  handleWhatsappCustomerPlaceholderChange = (e) => {
    if (this.state.selectedCustomerWhatappTamplate && e) {
      var tempData = this.state.selectedCustomerWhatappTamplate.templateContent;
      if (e) {
        tempData += e.map((x) => x.variableName).join(" ");

        this.setState({
          selectedWhatsappCustomerContent: tempData,
          selectedCustomerWhatappPlaceholder: e,
        });
      } else {
        this.setState({
          selectedWhatsappCustomerContent: tempData,
          selectedCustomerWhatappPlaceholder: e,
        });
      }
    } else {
      if (e) {
        var temp = e.map((x) => x.variableName).join(" ");
        this.setState({
          selectedWhatsappCustomerContent: temp,
          selectedCustomerWhatappPlaceholder: e,
        });
      } else {
        this.setState({
          selectedWhatsappCustomerContent:
            this.state.selectedCustomerWhatappTamplate.templateContent || "",
          selectedCustomerWhatappPlaceholder: e,
        });
      }
    }
  };
  handleWhatsappInternalTemplateChange = (e) => {
    this.setState({
      selectedWhatsappInternalContent: e.templateContent,
      selectedInternalWhatappPlaceholder: null,
      selectedInternalWhatappTamplate: e,
    });
  };
  handleWhatsappInternalPlaceholderChange = (e) => {
    if (this.state.selectedInternalWhatappTamplate && e) {
      var tempData = this.state.selectedInternalWhatappTamplate.templateContent;
      if (e) {
        tempData += e.map((x) => x.variableName).join(" ");

        this.setState({
          selectedWhatsappInternalContent: tempData,
          selectedInternalWhatappPlaceholder: e,
        });
      } else {
        this.setState({
          selectedWhatsappInternalContent: tempData,
          selectedInternalWhatappPlaceholder: e,
        });
      }
    } else {
      if (e) {
        var temp = e.map((x) => x.variableName).join(" ");
        this.setState({
          selectedWhatsappInternalContent: temp,
          selectedInternalWhatappPlaceholder: e,
        });
      } else {
        this.setState({
          selectedWhatsappInternalContent:
            this.state.selectedInternalWhatappTamplate.templateContent || "",
          selectedInternalWhatappPlaceholder: e,
        });
      }
    }
  };
  handleGetSMSData = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Template/GetTemplatesWithDetails",
      headers: authHeader(),
    })
      .then(function (res) {
        if (res.data.statusCode === 200) {
          self.setState({
            smsdata: res.data.responseData
          })
        } else {
          self.setState({
            smsdata: [],
          });
        }
      })
      .catch((error) => console.log(error));
  };
  handelSMSTamplet = async (e) => {
    let drpName = e.target.value;
    const matchingObject = this.state.smsdata.find(item => item.id.toString() === drpName);
    if (drpName === "-5") {
      await this.setState({
        textdescription: "",
        selectTemplateId: 0
      })
    }
    else {
      await this.setState({
        textdescription: matchingObject.templateDescription,
        selectTemplateId: matchingObject?.id,
        isTextArea: false
      })
    }

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
          self.setState({ BrandDataList: data, });

        } else {
          self.setState({ BrandDataList: [] });

        }
      })
      .catch((data) => {
        console.log(data);

      });
  }
  handelBrandID = (e) => {
    let self = this
    console.log("e", e)
    let name = e.target.name
    let val = e.target.value

    if (val === "Select Brand ID") {
      self.setState({
        forBrandID: "",
      })
    }
    else {
      self.setState({
        forBrandID: val,
      })
      setTimeout(() => {
        this.handleAlertData();
      }, 100);

    }
  }
  handelBrandIDEdit = (e) => {
    let self = this
    console.log("e", e)
    let name = e.target.name
    let val = e.target.value

    if (val === "Select Brand ID") {
      self.setState({
        editforBrandID: "",
      })
    }
    else {
      self.setState({
        editforBrandID: val,
      })
      setTimeout(() => {
        this.handleAlertDataEdit();
      }, 100);

    }
  }
  handleAlertDataEdit() {
    let self = this;
    axios({
      method: "post",
      //url: config.apiUrl + "/Alert/BindAlerts",
      url: config.apiUrl + "/Alert/BindAlertsByBrand",
      headers: authHeader(),
      params: {
        BrandId: parseInt(this.state.editforBrandID)
      }
    })
      .then(function (res) {
        var data = res.data.responseData;
        var msg = res.data.message;
        if (msg === "Success") {
          self.setState({
            alertData: data,
          });
        } else {
          self.setState({
            alertData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <React.Fragment>
        <div className="position-relative d-inline-block">
          <Modal
            show={this.state.StatusModel}
            onHide={this.StatusCloseModel}
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
                        this.state.salertTypeNameFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.screatedByFilterCheckbox.includes("all") ||
                        this.state.sisAlertActiveFilterCheckbox.includes("all")
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
                  {this.state.sortColumn === "alertTypeName"
                    ? this.state.sortFilterAlertType !== null &&
                    this.state.sortFilterAlertType.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name={item.alertTypeName}
                          id={"fil-open" + item.alertTypeName}
                          value={item.alertTypeName}
                          checked={this.state.salertTypeNameFilterCheckbox.includes(
                            item.alertTypeName
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "alertTypeName",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.alertTypeName}>
                          <span className="table-btn table-blue-btn">
                            {item.alertTypeName}
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

                  {this.state.sortColumn === "isAlertActive"
                    ? this.state.sortFilterStatus !== null &&
                    this.state.sortFilterStatus.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name={item.isAlertActive}
                          id={"fil-open" + item.isAlertActive}
                          value={item.isAlertActive}
                          checked={this.state.sisAlertActiveFilterCheckbox.includes(
                            item.isAlertActive
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "isAlertActive"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.isAlertActive}>
                          <span className="table-btn table-blue-btn">
                            {item.isAlertActive}
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
              ? TranslationContext.link.alerts
              : "Alerts"}
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr settingtable">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height alertsTable settings-align">
                  <ReactTable
                    data={this.state.alert}
                    columns={[
                      {
                        Header: (
                          <span
                            className={this.state.alertColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "alertTypeName",
                              TranslationContext !== undefined
                                ? TranslationContext.span.alerttype
                                : "Alert Type"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.alerttype
                              : "Alert Type"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "alertTypeName",
                      },
                      {
                        Header:
                          TranslationContext !== undefined
                            ? TranslationContext.header.communicationmode
                            : "Communication Mode",
                        accessor: "modeOfCommunication",
                        className: "communication-labelHeader",
                        sortable: false,
                        Cell: (row) => {
                          return (
                            <div>
                              {row.original.isByEmail === true && (
                                <img
                                  src={LetterBox}
                                  alt="Letter"
                                  className="alert-tableImge"
                                />
                              )}
                              {row.original.isBySMS === true && (
                                <img
                                  src={SmsImg}
                                  alt="Sms"
                                  className="alert-tableImge"
                                />
                              )}
                              {row.original.isByNotification === true && (
                                <img
                                  src={NotificationImg}
                                  alt="Notification"
                                  className="alert-tableImge"
                                />
                              )}
                              {row.original.isByWhatsApp === true && (
                                <img
                                  src={WhatsappImg}
                                  alt="Notification"
                                  className="alert-tableImge"
                                />
                              )}
                            </div>
                          );
                        },
                      },
                      {
                        id: "createdBy",
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
                        Cell: (row) => {
                          var ids = row.original["id"];
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
                        sortable: false,
                        accessor: "createdBy",
                      },
                      {
                        Header: (
                          <span
                            className={this.state.statusColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "isAlertActive",
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
                        accessor: "isAlertActive",
                      },
                      {
                        Header: (
                          <span
                            className={this.state.statusColor}
                          // onClick={this.StatusOpenModel.bind(
                          //   this,
                          //   "isAlertActive",
                          //   TranslationContext !== undefined
                          //     ? TranslationContext.span.status
                          //     : "Brand"
                          // )}
                          >

                            Brand
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "brandName",
                      },
                      {
                        Header:
                          TranslationContext !== undefined
                            ? TranslationContext.span.action
                            : "Actions",
                        sortable: false,
                        Cell: (row) => {
                          var ids = row.original["id"];
                          return (
                            <>
                              <span className="settings-align-actions">
                                <Popover
                                  content={
                                    <div className="d-flex general-popover popover-body">
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
                                          <a href={Demo.BLANK_LINK}>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.a.cancel
                                              : "CANCEL"}
                                          </a>
                                          <button
                                            className="butn"
                                            onClick={this.deleteAlert.bind(
                                              this,
                                              row.original.alertID
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
                                    id={ids}
                                  />
                                </Popover>

                                <button
                                  className="react-tabel-button"
                                  id="p-edit-pop-2"
                                  onClick={this.updateAlert.bind(
                                    this,
                                    row.original
                                  )}
                                >
                                  <label className="Table-action-edit-button-text">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label.edit
                                      : "EDIT"}
                                  </label>
                                </button>
                              </span>
                            </>
                          );
                        },
                      },
                    ]}
                    resizable={false}
                    defaultPageSize={10}
                    showPagination={true}
                    minRows={1}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="right-sect-div">
                  <h3>
                    {TranslationContext !== undefined
                      ? TranslationContext.h3.createalerts
                      : "CREATE ALERTS"}
                  </h3>
                  <div className="div-cntr">
                    <label>
                      {TranslationContext !== undefined
                        ? TranslationContext.label.alerttype
                        : "Select Brand"}
                    </label>

                    <select
                      className="add-select-category"
                      // name="selectedAlertType"
                      value={this.state.forBrandID}
                      onChange={(e) => { this.handelBrandID(e) }}
                    >
                      <option value={0}>
                        {TranslationContext !== undefined
                          ? TranslationContext.option.selectalert
                          : "Select Brand ID"}
                      </option>
                      {this.state.BrandDataList !== null &&
                        this.state.BrandDataList.map((item, i) => (
                          <option key={i} value={item.brandID}>
                            {item.brandName}
                          </option>
                        ))}
                    </select>

                  </div>
                  <div className="div-cntr">
                    <label>
                      {TranslationContext !== undefined
                        ? TranslationContext.label.alerttype
                        : "Alert Type"}
                    </label>

                    <select
                      className="add-select-category"
                      name="selectedAlertType"
                      value={this.state.selectedAlertType}
                      onChange={this.setDataOnChangeAlert}
                    >
                      <option value={0}>
                        {TranslationContext !== undefined
                          ? TranslationContext.option.selectalert
                          : "Select Alert"}
                      </option>
                      {this.state.alertData !== null &&
                        this.state.alertData.map((item, i) => (
                          <option key={i} value={item.alertID}>
                            {item.alertTypeName}
                          </option>
                        ))}
                    </select>
                    {this.state.selectedAlertType === 0 && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.alertTypeCompulsion}
                      </p>
                    )}
                    {this.state.isExitsType !== "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.isExitsType}
                      </p>
                    )}
                  </div>
                  <h4>
                    {TranslationContext !== undefined
                      ? TranslationContext.h4.communicationmode
                      : "Communication Mode"}
                  </h4>
                  {this.state.selectedEmailCustomer === false &&
                    this.state.selectedEmailInternal === false &&
                    this.state.selectedEmailStore === false &&
                    this.state.selectedSMSCustomer === false &&
                    this.state.selectedNotifInternal === false &&
                    this.state.selectedWhatsappCustomer === false &&
                    this.state.selectedWhatsappInternal === false ? (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.communicationModeCompulsion}
                    </p>
                  ) : null}
                  <div className="div-cntr">
                    <label>
                      {TranslationContext !== undefined
                        ? TranslationContext.label.email
                        : "Email"}
                    </label>
                    <br />
                    <Checkbox
                      onChange={this.handleAlertTabs}
                      value="emailCust"
                      checked={this.state.selectedEmailCustomer}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.checkbox.customer
                        : "Customer"}
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleAlertTabs}
                      value="emailInt"
                      checked={this.state.selectedEmailInternal}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.checkbox.internal
                        : "Internal"}
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleAlertTabs}
                      value="emailStore"
                      checked={this.state.selectedEmailStore}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.checkbox.store
                        : "Store"}
                    </Checkbox>
                  </div>
                  <div className="div-cntr">
                    <label>
                      {TranslationContext !== undefined
                        ? TranslationContext.label.sms
                        : "SMS"}
                    </label>
                    <br />
                    <Checkbox
                      onChange={this.handleAlertTabs}
                      value="smsCust"
                      checked={this.state.selectedSMSCustomer}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.checkbox.customer
                        : "Customer"}
                    </Checkbox>
                  </div>
                  <div className="div-cntr">
                    <label>
                      {TranslationContext !== undefined
                        ? TranslationContext.label.notification
                        : "Notification"}
                    </label>
                    <br />
                    <Checkbox
                      onChange={this.handleAlertTabs}
                      value="notiInt"
                      checked={this.state.selectedNotifInternal}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.checkbox.internal
                        : "Internal"}
                    </Checkbox>
                  </div>
                  <div className="div-cntr">
                    <label>Whatsapp</label>
                    <br />
                    <Checkbox
                      onChange={this.handleAlertTabs}
                      value="whatsappCust"
                      checked={this.state.selectedWhatsappCustomer}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.checkbox.customer
                        : "Customer"}
                    </Checkbox>
                    <Checkbox
                      onChange={this.handleAlertTabs}
                      value="whatsappInt"
                      checked={this.state.selectedWhatsappInternal}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.checkbox.internal
                        : "Internal"}
                    </Checkbox>
                  </div>
                  <div className="div-cntr">
                    <label>
                      {TranslationContext !== undefined
                        ? TranslationContext.label.status
                        : "Status"}
                    </label>
                    <select
                      name="selectedStatus"
                      value={this.state.selectedStatus}
                      onChange={this.setDataOnChangeAlert}
                    >
                      <option value="">
                        {TranslationContext !== undefined
                          ? TranslationContext.option.select
                          : "Select"}
                      </option>
                      <option value="true">
                        {TranslationContext !== undefined
                          ? TranslationContext.option.active
                          : "Active"}
                      </option>
                      <option value="false">
                        {TranslationContext !== undefined
                          ? TranslationContext.option.inactive
                          : "Inactive"}
                      </option>
                    </select>
                    {this.state.selectedStatus === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.statusCompulsion}
                      </p>
                    )}
                  </div>
                  <button
                    className="butn"
                    onClick={this.handleAddAlertTabsOpen}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.button.saveandnext
                      : "Save & Next"}
                  </button>
                  <Modal
                    size="lg"
                    className="big-modal-placeholder"
                    show={this.state.AddAlertTabsPopup}
                    onHide={this.handleAddAlertTabsClose}
                  >
                    <Modal.Header>
                      <div className="setting-tabs alert-tabs">
                        <ul
                          className="nav nav-tabs margin-Alerttab"
                          role="tablist"
                        >
                          {(this.state.emailCust ||
                            this.state.emailInt ||
                            this.state.emailStore) && (
                              <li className="nav-item">
                                <a
                                  onClick={this.handleTabChange.bind(this, 0)}
                                  className={`nav-link ${this.state.tabIndex ===
                                    0 && "active"}`}
                                  data-toggle="tab"
                                  href="#email-tab"
                                  role="tab"
                                  aria-controls="email-tab"
                                  aria-selected="true"
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.a.email
                                    : "Email"}
                                </a>
                              </li>
                            )}
                          {this.state.smsCust && (
                            <li className="nav-item">
                              <a
                                onClick={this.handleTabChange.bind(this, 1)}
                                className={`nav-link ${this.state.tabIndex ===
                                  1 && "active"}`}
                                data-toggle="tab"
                                href="#sms-tab"
                                role="tab"
                                aria-controls="sms-tab"
                                aria-selected="false"
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.a.sms
                                  : "SMS"}
                              </a>
                            </li>
                          )}
                          {this.state.notiInt && (
                            <li className="nav-item">
                              <a
                                onClick={this.handleTabChange.bind(this, 2)}
                                className={`nav-link ${this.state.tabIndex ===
                                  2 && "active"}`}
                                data-toggle="tab"
                                href="#notification-tab"
                                role="tab"
                                aria-controls="notification-tab"
                                aria-selected="false"
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.a.notification
                                  : "Notification"}
                              </a>
                            </li>
                          )}
                          {this.state.whatsappCust || this.state.whatsappInt ? (
                            <li className="nav-item">
                              <a
                                onClick={this.handleTabChange.bind(this, 3)}
                                className={`nav-link ${this.state.tabIndex ===
                                  3 && "active"}`}
                                data-toggle="tab"
                                href="#whatsapp-tab"
                                role="tab"
                                aria-controls="whatsapp-tab"
                                aria-selected="false"
                              >
                                Whatsapp
                              </a>
                            </li>
                          ) : null}
                        </ul>
                        <img
                          src={CancelImg}
                          alt="CancelImg"
                          className="cancelImg-alert"
                          onClick={this.handleAddAlertTabsClose.bind(this)}
                        />
                      </div>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="tab-content">
                        {(this.state.emailCust ||
                          this.state.emailInt ||
                          this.state.emailStore) && (
                            <div
                              className={`tab-pane fade ${this.state.tabIndex ===
                                0 && "show active"}`}
                              id="email-tab"
                              role="tabpanel"
                              aria-labelledby="email-tab"
                            >
                              <div className="position-relative-alert">
                                <ul
                                  className="nav alert-nav-tabs3"
                                  role="tablist"
                                >
                                  {this.state.emailCust && (
                                    <li className="nav-item">
                                      <a
                                        className={`nav-link ${this.state
                                          .innerTabIndex === 0 && "active"}`}
                                        data-toggle="tab"
                                        href="#customer-tab"
                                        role="tab"
                                        aria-controls="customer-tab"
                                        aria-selected="true"
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.a.customer
                                          : "Customer"}
                                      </a>
                                    </li>
                                  )}
                                  {this.state.emailInt && (
                                    <li className="nav-item">
                                      <a
                                        className={`nav-link ${this.state
                                          .innerTabIndex === 1 && "active"}`}
                                        data-toggle="tab"
                                        href="#Internal-tab"
                                        role="tab"
                                        aria-controls="Internal-tab"
                                        aria-selected="false"
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.a.internal
                                          : "Internal"}
                                      </a>
                                    </li>
                                  )}
                                  {this.state.emailStore && (
                                    <li className="nav-item">
                                      <a
                                        className={`nav-link ${this.state
                                          .innerTabIndex === 2 && "active"}`}
                                        data-toggle="tab"
                                        href="#ticket-tab"
                                        role="tab"
                                        aria-controls="ticket-tab"
                                        aria-selected="false"
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.a.store
                                          : "Store"}
                                      </a>
                                    </li>
                                  )}
                                </ul>
                              </div>
                              <div className="tab-content p-0 alert-p1">
                                <div
                                  className={`tab-pane fade ${this.state
                                    .innerTabIndex === 0 && "show active"}`}
                                  id="customer-tab"
                                  role="tabpanel"
                                  aria-labelledby="customer-tab"
                                >
                                  <label className="alert-main-popuplbl">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label.composeyouremail
                                      : "Compose your Email"}
                                  </label>

                                  {this.state.placeholderShown && (
                                    <div className="tic-det-ck-user template-user myticlist-expand-sect alertckuser placeholder-alert">
                                      <select
                                        className="add-select-category"
                                        value="0"
                                        onChange={this.setPlaceholderValue.bind(
                                          this,
                                          "Customer"
                                        )}
                                      >
                                        <option value="0">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.option
                                              .placeholders
                                            : "Placeholders"}
                                        </option>
                                        {this.state.placeholderData !== null &&
                                          this.state.placeholderData.map(
                                            (item, i) => (
                                              <option
                                                key={i}
                                                value={item.mailParameterID}
                                              >
                                                {item.description}
                                              </option>
                                            )
                                          )}
                                      </select>
                                    </div>
                                  )}
                                  <CKEditor
                                    content={this.state.content}
                                    name="selectedCKCustomer"
                                    data={this.state.selectedCKCustomer}
                                    onChange={this.setCKEditorCustomer}
                                    onBlur={this.onCkBlurCustomer}
                                    events={{
                                      items: this.fileUpload,
                                    }}
                                  />
                                  {this.state.selectedCKCustomer.length === 0 && (
                                    <p
                                      style={{
                                        color: "red",
                                        marginBottom: "0px",
                                      }}
                                    >
                                      {this.state.ckCustomerCompulsion}
                                    </p>
                                  )}
                                </div>
                                <div
                                  className={`tab-pane fade ${this.state
                                    .innerTabIndex === 1 && "show active"}`}
                                  id="Internal-tab"
                                  role="tabpanel"
                                  aria-labelledby="Internal-tab"
                                >
                                  <label className="alert-main-popuplbl">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label.composeyouremail
                                      : "Compose your Email"}
                                  </label>

                                  {this.state.placeholderShown && (
                                    <div className="tic-det-ck-user template-user myticlist-expand-sect alertckuser placeholder-alert placeholder-alert-2">
                                      <select
                                        className="add-select-category"
                                        value="0"
                                        onChange={this.setPlaceholderValue.bind(
                                          this,
                                          "Internal"
                                        )}
                                      >
                                        <option value="0">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.option
                                              .placeholders
                                            : "Placeholders"}
                                        </option>
                                        {this.state.placeholderData !== null &&
                                          this.state.placeholderData.map(
                                            (item, i) => (
                                              <option
                                                key={i}
                                                value={item.mailParameterID}
                                              >
                                                {item.description}
                                              </option>
                                            )
                                          )}
                                      </select>
                                    </div>
                                  )}

                                  <CKEditor
                                    content={this.state.content}
                                    events={{
                                      items: this.fileUpload,
                                    }}
                                    name="selectedCKInternal"
                                    data={this.state.selectedCKInternal}
                                    onChange={this.setCKEditorInternal}
                                    onBlur={this.onCkBlurInternal}
                                  />
                                  {this.state.selectedCKInternal.length === 0 && (
                                    <p
                                      style={{
                                        color: "red",
                                        marginBottom: "0px",
                                      }}
                                    >
                                      {this.state.ckInternalCompulsion}
                                    </p>
                                  )}
                                </div>
                                <div
                                  className={`tab-pane fade ${this.state
                                    .innerTabIndex === 2 && "show active"}`}
                                  id="ticket-tab"
                                  role="tabpanel"
                                  aria-labelledby="ticket-tab"
                                >
                                  <label className="alert-main-popuplbl">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label.composeyouremail
                                      : "Compose your Email"}
                                  </label>

                                  {this.state.placeholderShown && (
                                    <div className="tic-det-ck-user template-user myticlist-expand-sect alertckuser placeholder-alert placeholder-alert-2">
                                      <select
                                        className="add-select-category"
                                        value="0"
                                        onChange={this.setPlaceholderValue.bind(
                                          this,
                                          "Store"
                                        )}
                                      >
                                        <option value="0">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.option
                                              .placeholders
                                            : "Placeholders"}
                                        </option>
                                        {this.state.placeholderData !== null &&
                                          this.state.placeholderData.map(
                                            (item, i) => (
                                              <option
                                                key={i}
                                                value={item.mailParameterID}
                                              >
                                                {item.description}
                                              </option>
                                            )
                                          )}
                                      </select>
                                    </div>
                                  )}

                                  <CKEditor
                                    content={this.state.content}
                                    events={{
                                      change: this.onChange,
                                      items: this.fileUpload,
                                    }}
                                    name="selectedCKStore"
                                    data={this.state.selectedCKStore}
                                    onChange={this.setCKEditorStore}
                                    onBlur={this.onCkBlurStore}
                                  />
                                  {this.state.selectedCKStore.length === 0 && (
                                    <p
                                      style={{
                                        color: "red",
                                        marginBottom: "0px",
                                      }}
                                    >
                                      {this.state.ckStoreCompulsion}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        <div
                          id="sms-tab"
                          className={`tab-pane fade ${this.state.tabIndex ===
                            1 && "show active"}`}
                        >
                          <div className="sms-mainLabel alert-p1">
                            <div className="label_alert_sms">
                              <label className="alert-main-popuplbl">
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.composeyoursms
                                  : "Select your SMS Alert Template"}
                              </label>
                              <div>
                                <select
                                  className="my-tic-email"
                                  onChange={(e) => this.handelSMSTamplet(e)}
                                >
                                  <option value="-5">
                                    Select Template
                                  </option>
                                  {
                                    this.state.smsdata.filter((e) => e.currentStatus.status === "Publish").map((e, i) => {
                                      return (
                                        <option key={i} value={e.id} >
                                          {e.templateName}
                                        </option>
                                      )

                                    })
                                  }

                                </select>
                              </div>

                            </div>

                            <textarea
                              rows="3"
                              className="text-areaModel"
                              name="selectedSMSContent"
                              value={this.state.isTextArea ? this.state.selectedSMSContent : this.state.textdescription}
                              readOnly
                            // onChange={this.setDataOnChangeAlert}                          
                            ></textarea>
                            {this.state.textdescription.length === 0 && (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                Please Select Template
                              </p>
                            )}

                          </div>
                        </div>
                        <div
                          id="notification-tab"
                          className={`tab-pane fade ${this.state.tabIndex ===
                            2 && "show active"}`}
                        >
                          <div className="sms-mainLabel alert-p1">
                            <div className="noti-plchldr-cntr">
                              <label className="alert-main-popuplbl">
                                {TranslationContext !== undefined
                                  ? TranslationContext.label
                                    .composeyournotification
                                  : "Compose your Notification"}
                              </label>
                              <div className="tic-det-ck-user myticlist-expand-sect notification-placeholder">
                                <select
                                  className="add-select-category"
                                  value="0"
                                  onChange={this.setPlaceholderValue.bind(
                                    this,
                                    "Notification"
                                  )}
                                >
                                  <option value="0">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.option.placeholders
                                      : "Placeholders"}
                                  </option>
                                  {this.state.placeholderData !== null &&
                                    this.state.placeholderData.map(
                                      (item, i) => (
                                        <option
                                          key={i}
                                          value={item.mailParameterID}
                                        >
                                          {item.description}
                                        </option>
                                      )
                                    )}
                                </select>
                              </div>
                            </div>
                            <textarea
                              rows="10"
                              className="text-areaModel"
                              name="selectedNotifContent"
                              value={this.state.selectedNotifContent}
                              onChange={this.setDataOnChangeAlert}
                              onClick={this.setNotiCurPosi}
                              id="notifiPlaceholder"
                            ></textarea>
                            {this.state.selectedNotifContent.length === 0 && (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.NotifContentCompulsion}
                              </p>
                            )}
                          </div>
                        </div>
                        <div
                          id="whatsapp-tab"
                          className={`tab-pane fade ${this.state.tabIndex ===
                            3 && "show active"}`}
                        >
                          <div className="position-relative-alert">
                            <ul className="nav alert-nav-tabs3" role="tablist">
                              {this.state.whatsappCust && (
                                <li className="nav-item">
                                  <a
                                    className={`nav-link ${this.state
                                      .innerTabIndexWhatsapp === 0 &&
                                      "active"}`}
                                    data-toggle="tab"
                                    href="#whatsappCust-tab"
                                    role="tab"
                                    aria-controls="whatsappCust-tab"
                                    aria-selected="true"
                                  >
                                    {TranslationContext !== undefined
                                      ? TranslationContext.a.customer
                                      : "Customer"}
                                  </a>
                                </li>
                              )}
                              {this.state.whatsappInt && (
                                <li className="nav-item">
                                  <a
                                    className={`nav-link ${this.state
                                      .innerTabIndexWhatsapp === 1 &&
                                      "active"}`}
                                    data-toggle="tab"
                                    href="#whatsappInt-tab"
                                    role="tab"
                                    aria-controls="whatsappInt-tab"
                                    aria-selected="false"
                                  >
                                    {TranslationContext !== undefined
                                      ? TranslationContext.a.internal
                                      : "Internal"}
                                  </a>
                                </li>
                              )}
                            </ul>
                          </div>
                          <div className="tab-content p-0 alert-p1">
                            <div
                              className={`tab-pane fade ${this.state
                                .innerTabIndexWhatsapp === 0 && "show active"}`}
                              id="whatsappCust-tab"
                              role="tabpanel"
                              aria-labelledby="whatsappCust-tab"
                            >
                              <div className="sms-mainLabel alert-p1">
                                <div>
                                  <label className="alert-main-popuplbl">
                                    Compose your Whatsapp
                                  </label>
                                </div>
                                <div className="row">
                                  <div className="col-6 col-md-6">
                                    <Select
                                      getOptionLabel={(option) =>
                                        option.templateName
                                      }
                                      getOptionValue={(option) =>
                                        option.templateID
                                      }
                                      options={this.state.whatsappTamplateList}
                                      onChange={this.handleWhatsappCustomerTemplateChange.bind(
                                        this
                                      )}
                                      value={
                                        this.state
                                          .selectedCustomerWhatappTamplate
                                      }
                                      placeholder="Select Template"
                                    />
                                  </div>
                                  <div className="col-6 col-md-6">
                                    <Select
                                      getOptionLabel={(option) =>
                                        option.variableName
                                      }
                                      getOptionValue={(option) =>
                                        option.variableName
                                      }
                                      options={
                                        this.state.whatsappPlaceholderList
                                      }
                                      closeMenuOnSelect={false}
                                      onChange={this.handleWhatsappCustomerPlaceholderChange.bind(
                                        this
                                      )}
                                      value={
                                        this.state
                                          .selectedCustomerWhatappPlaceholder
                                      }
                                      isMulti
                                      placeholder="Select Placeholder"
                                    />
                                  </div>
                                </div>
                                <br />
                                <textarea
                                  rows="10"
                                  className="text-areaModel"
                                  name="selectedWhatsappCustomerContent"
                                  value={
                                    this.state.selectedWhatsappCustomerContent
                                  }
                                  onChange={this.setDataOnChangeAlert}
                                  onClick={this.setNotiCurPosi}
                                  id="notifiPlaceholder"
                                ></textarea>
                                {this.state.selectedWhatsappCustomerContent
                                  .length === 0 && (
                                    <p
                                      style={{
                                        color: "red",
                                        marginBottom: "0px",
                                      }}
                                    >
                                      {
                                        this.state
                                          .WhatsappCustomerContentCompulsion
                                      }
                                    </p>
                                  )}
                              </div>
                            </div>

                            <div
                              className={`tab-pane fade ${this.state
                                .innerTabIndexWhatsapp === 1 && "show active"}`}
                              id="whatsappInt-tab"
                              role="tabpanel"
                              aria-labelledby="whatsappInt-tab"
                            >
                              <div className="sms-mainLabel alert-p1">
                                <div className="noti-plchldr-cntr">
                                  <label className="alert-main-popuplbl">
                                    Compose your Whatsapp
                                  </label>
                                </div>

                                <div className="row">
                                  <div className="col-6 col-md-6">
                                    <Select
                                      getOptionLabel={(option) =>
                                        option.templateName
                                      }
                                      getOptionValue={(option) =>
                                        option.templateID
                                      }
                                      options={this.state.whatsappTamplateList}
                                      onChange={this.handleWhatsappInternalTemplateChange.bind(
                                        this
                                      )}
                                      value={
                                        this.state
                                          .selectedInternalWhatappTamplate
                                      }
                                      placeholder="Select Template"
                                    />
                                  </div>
                                  <div className="col-6 col-md-6">
                                    <Select
                                      getOptionLabel={(option) =>
                                        option.variableName
                                      }
                                      getOptionValue={(option) =>
                                        option.variableName
                                      }
                                      options={
                                        this.state.whatsappPlaceholderList
                                      }
                                      closeMenuOnSelect={false}
                                      onChange={this.handleWhatsappInternalPlaceholderChange.bind(
                                        this
                                      )}
                                      value={
                                        this.state
                                          .selectedInternalWhatappPlaceholder
                                      }
                                      isMulti
                                      placeholder="Select Placeholder"
                                    />
                                  </div>
                                </div>
                                <br />
                                <textarea
                                  rows="10"
                                  className="text-areaModel"
                                  name="selectedWhatsappInternalContent"
                                  value={
                                    this.state.selectedWhatsappInternalContent
                                  }
                                  onChange={this.setDataOnChangeAlert}
                                  onClick={this.setNotiCurPosi}
                                  id="notifiPlaceholder"
                                ></textarea>
                                {this.state.selectedWhatsappInternalContent
                                  .length === 0 && (
                                    <p
                                      style={{
                                        color: "red",
                                        marginBottom: "0px",
                                      }}
                                    >
                                      {
                                        this.state
                                          .WhatsappInternalContentCompulsion
                                      }
                                    </p>
                                  )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="div-button1 alert-proper">
                          <button
                            className="butn-2"
                            type="submit"
                            disabled={this.state.editSaveLoading}
                            onClick={
                              this.state.isEdit
                                ? this.handleUpdateAlert.bind(this)
                                : this.validationInsertAlert.bind(this)
                            }
                          >
                            {this.state.editSaveLoading ? (
                              <FontAwesomeIcon
                                className="circular-loader"
                                icon={faCircleNotch}
                                spin
                              />
                            ) : (
                              ""
                            )}
                            {TranslationContext !== undefined
                              ? TranslationContext.button.save
                              : "SAVE"}
                          </button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
                <div className="right-sect-div" style={{ display: "none" }}>
                  <div className="d-flex justify-content-between align-items-center pb-2">
                    <h3 className="pb-0">Bulk Upload</h3>
                    <div className="down-excel">
                      <p>Template</p>
                      <a href={Demo.BLANK_LINK}>
                        <img src={DownExcel} alt="download icon" />
                      </a>
                    </div>
                  </div>
                  <input
                    id="file-upload"
                    className="file-upload d-none"
                    type="file"
                  />
                  <label htmlFor="file-upload">
                    <div className="file-icon">
                      <img src={FileUpload} alt="file-upload" />
                    </div>
                    <span>Add File</span> or Drop File here
                  </label>
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
                            <img src={DelBlack} alt="delete-black" />
                          </div>
                          <UncontrolledPopover
                            trigger="legacy"
                            placement="auto"
                            target="del-file-1"
                            className="general-popover delete-popover"
                          >
                            <PopoverBody className="d-flex">
                              <div className="del-big-icon">
                                <img src={DelBigIcon} alt="del-icon" />
                              </div>
                              <div>
                                <p className="font-weight-bold blak-clr">
                                  Delete file?
                                </p>
                                <p className="mt-1 fs-12">
                                  Are you sure you want to delete this file?
                                </p>
                                <div className="del-can">
                                  <a href={Demo.BLANK_LINK}>CANCEL</a>
                                  <button
                                    className="butn"
                                    onClick={this.handleDeleteBulkupload}
                                  >
                                    Delete
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
                            <a className="file-retry">Retry</a>
                          </div>
                          <div>
                            <span className="file-failed">Failed</span>
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

                  <button className="butn">ADD</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          className="EditModa"
          show={this.state.editModal}
          onHide={this.handleEditModal}
          closeOnOverlayClick={false}
        //onBackdropClick={}

        >
          <div className="edtpadding right-sect-div">
            <div className="">
              <label className="popover-header-text">
                {TranslationContext !== undefined
                  ? TranslationContext.label.editalerts
                  : "EDIT ALERTS"}
              </label>
            </div>
            <div className="div-cntr">
              <label>
                {TranslationContext !== undefined
                  ? TranslationContext.label.alerttype
                  : "Select Brand"}
              </label>

              <select
                className="add-select-category"
                name="selectedAlertType"
                value={this.state.editforBrandID}
                onChange={(e) => { this.handelBrandIDEdit(e) }}
                disabled
              >
                <option value={0}>
                  {TranslationContext !== undefined
                    ? TranslationContext.option.selectalert
                    : "Select Brand ID"}
                </option>
                {this.state.BrandDataList !== null &&
                  this.state.BrandDataList.map((item, i) => (
                    <option key={i} value={item.brandID}>
                      {item.brandName}
                    </option>
                  ))}
              </select>

            </div>

            <div className="div-cntr">
              <label>
                {TranslationContext !== undefined
                  ? TranslationContext.label.alerttype
                  : "Alert Type"}
              </label>

              <select
                className="add-select-category"
                name="selectedAlertType"
                value={this.state.alertEdit.selectedAlertType}
                onChange={this.editAlertModalData.bind(this)}
                disabled
              >
                <option>
                  {TranslationContext !== undefined
                    ? TranslationContext.option.selectalert
                    : "Select Alert"}
                </option>
                {this.state.alertData !== null &&
                  this.state.alertData.map((item, i) => (
                    <option key={i} value={item.alertID}>
                      {item.alertTypeName}
                    </option>
                  ))}
              </select>
              {this.state.alertEdit.AlertTypeName === "Select Alert" && (
                <p style={{ color: "red", marginBottom: "0px" }}>
                  {this.state.editalertTypeCompulsion}
                </p>
              )}
            </div>
            <h4>
              {TranslationContext !== undefined
                ? TranslationContext.h4.communicationmode
                : "Communication Mode"}
            </h4>
            {this.state.emailCust === false &&
              this.state.emailStore === false &&
              this.state.emailInt === false &&
              this.state.smsCust === false &&
              this.state.notiInt === false &&
              this.state.whatsappInt === false &&
              this.state.whatsappCust === false && (
                <p style={{ color: "red", marginBottom: "0px" }}>
                  {this.state.editcommunicationModeCompulsion}
                </p>
              )}
            <div className="div-cntr">
              <label>
                {TranslationContext !== undefined
                  ? TranslationContext.label.email
                  : "Email"}
              </label>
              <br />
              <Checkbox
                onChange={this.handleAlertTabs}
                checked={this.state.emailCust}
                value="emailCust"
              >
                {TranslationContext !== undefined
                  ? TranslationContext.checkbox.customer
                  : "Customer"}
              </Checkbox>
              <Checkbox
                onChange={this.handleAlertTabs}
                checked={this.state.emailInt}
                value="emailInt"
              >
                {TranslationContext !== undefined
                  ? TranslationContext.checkbox.internal
                  : "Internal"}
              </Checkbox>
              <Checkbox
                onChange={this.handleAlertTabs}
                checked={this.state.emailStore}
                value="emailStore"
              >
                {TranslationContext !== undefined
                  ? TranslationContext.checkbox.store
                  : "Store"}
              </Checkbox>
            </div>
            <div className="div-cntr">
              <label>
                {TranslationContext !== undefined
                  ? TranslationContext.label.sms
                  : "SMS"}
              </label>
              <br />
              <Checkbox
                onChange={this.handleAlertTabs}
                checked={this.state.smsCust}
                value="smsCust"
              >
                {TranslationContext !== undefined
                  ? TranslationContext.checkbox.customer
                  : "Customer"}
              </Checkbox>
            </div>
            <div className="div-cntr">
              <label>
                {TranslationContext !== undefined
                  ? TranslationContext.label.notification
                  : "Notification"}
              </label>
              <br />
              <Checkbox
                onChange={this.handleAlertTabs}
                checked={this.state.notiInt}
                value="notiInt"
              >
                {TranslationContext !== undefined
                  ? TranslationContext.checkbox.internal
                  : "Internal"}
              </Checkbox>
            </div>
            <div className="div-cntr">
              <label>Whatsapp</label>
              <br />
              <Checkbox
                onChange={this.handleAlertTabs}
                checked={this.state.whatsappCust}
                value="whatsappCust"
              >
                {TranslationContext !== undefined
                  ? TranslationContext.checkbox.customer
                  : "Customer"}
              </Checkbox>
              <Checkbox
                onChange={this.handleAlertTabs}
                checked={this.state.whatsappInt}
                value="whatsappInt"
              >
                {TranslationContext !== undefined
                  ? TranslationContext.checkbox.internal
                  : "Internal"}
              </Checkbox>
            </div>

            <div className="div-cntr">
              <label>
                {TranslationContext !== undefined
                  ? TranslationContext.label.status
                  : "Status"}
              </label>
              <select
                name="alertIsActive"
                value={this.state.alertEdit.alertIsActive}
                onChange={this.editAlertModalData.bind(this)}
              >
                <option value="">
                  {TranslationContext !== undefined
                    ? TranslationContext.option.select
                    : "Select"}
                </option>
                <option value={"Active"}>
                  {TranslationContext !== undefined
                    ? TranslationContext.option.active
                    : "Active"}
                </option>
                <option value={"Inactive"}>
                  {TranslationContext !== undefined
                    ? TranslationContext.option.inactive
                    : "Inactive"}
                </option>
              </select>
              {this.state.selectedStatus === "" && (
                <p style={{ color: "red", marginBottom: "0px" }}>
                  {this.state.statusCompulsion}
                </p>
              )}
            </div>

            <br />
            <div className="text-center">
              <span className="pop-over-cancle" onClick={this.handleEditModal}>
                {TranslationContext !== undefined
                  ? TranslationContext.span.cancel
                  : "CANCEL"}
              </span>
              <button
                className="pop-over-button FlNone"
                onClick={this.handleOpenAdd.bind(this)}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.button.save
                  : "SAVE"}
              </button>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Alerts;
