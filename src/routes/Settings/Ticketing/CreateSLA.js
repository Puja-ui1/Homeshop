import React, { Component } from "react";
import { Link } from "react-router-dom";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import Demo from "../../../store/Hashtag.js";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import Correct from "./../../../assets/Images/correct.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import Cancel from "./../../../assets/Images/cancel.png";
import DownExcel from "./../../../assets/Images/csv.png";
import { ProgressBar } from "react-bootstrap";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Spin } from "antd";
import ReactTable from "react-table";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import { NotificationManager } from "react-notifications";
import { CSVLink } from "react-csv";
import Modal from "react-responsive-modal";
import Sorting from "./../../../assets/Images/sorting.png";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import matchSorter from "match-sorter";
import { formatSizeUnits } from "./../../../helpers/CommanFuncation";
import Dropzone from "react-dropzone";
import * as translationHI from "./../../../translations/hindi";
import * as translationMA from "./../../../translations/marathi";

class CreateSLA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      sla: [],
      slaIssueType: [],
      updateIssueTypeId: 0,
      updateSlaisActive: "",
      updateSlaTarget: [],
      SlaIsActive: "true",
      value: null,
      PriorityData: [],
      FinalDataOfSlaTarget: [],
      finalData: [],
      finalEditData: [],
      indiSla: "",
      searchedSla: [],
      slaShow: false,
      slaOvrlayShow: false,
      SearchText: "",
      issueTypeCompulsion: "",
      slaTargetCompulsion: "",
      slaTargetCompulsionEdit: "",
      StatusModel: false,
      sortColumn: "",
      sortAllData: [],
      sortIssueType: [],
      sortCreatedBy: [],
      sortStatus: [],
      issueColor: "",
      createdColor: "",
      stattusColor: "",
      sortHeader: "",
      issueTypeName: "",
      createdBy: "",
      brandName: "",
      categoryName: "",
      subCategoryName: "",
      SLAId: 0,
      editmodel: false,
      editSaveLoading: false,
      tempsla: [],
      sortFilterIssueType: [],
      sortFilterCreatedBy: [],
      sortFilterStatus: [],
      filterTxtValue: "",
      sFilterCheckbox: "",
      isFileUploadFail: false,
      progressValue: 0,
      fileSize: "",
      showProgress: false,
      bulkuploadCompulsion: "",
      fileN: [],
      sissueTpeNameFilterCheckbox: "",
      screatedByFilterCheckbox: "",
      sisSLAActiveFilterCheckbox: "",
      isortA: false,
      bulkuploadLoading: false,
      translateLanguage: {},
      selectedIssueTypeIdsForSLA: "",
    };
    this.handleGetSLA = this.handleGetSLA.bind(this);
    this.handleGetSLAIssueType = this.handleGetSLAIssueType.bind(this);
    this.handleSlaButton = this.handleSlaButton.bind(this);
    this.handleGetPriorityList = this.handleGetPriorityList.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
  }

  componentDidMount() {
    this.handleGetSLA();
    this.handleGetSLAIssueType();
    this.handleGetPriorityList();

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
    itemsArray = this.state.sla;

    if (this.state.sortColumn === "issueTpeName") {
      itemsArray.sort((a, b) => {
        if (a.issueTpeName < b.issueTpeName) return 1;
        if (a.issueTpeName > b.issueTpeName) return -1;
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
    if (this.state.sortColumn === "isSLAActive") {
      itemsArray.sort((a, b) => {
        if (a.isSLAActive < b.isSLAActive) return 1;
        if (a.isSLAActive > b.isSLAActive) return -1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      sla: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    var itemsArray = [];
    itemsArray = this.state.sla;

    if (this.state.sortColumn === "issueTpeName") {
      itemsArray.sort((a, b) => {
        if (a.issueTpeName < b.issueTpeName) return -1;
        if (a.issueTpeName > b.issueTpeName) return 1;
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
    if (this.state.sortColumn === "isSLAActive") {
      itemsArray.sort((a, b) => {
        if (a.isSLAActive < b.isSLAActive) return -1;
        if (a.isSLAActive > b.isSLAActive) return 1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      sla: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  StatusOpenModel(data, header) {
    if (
      this.state.sortFilterIssueType.length === 0 ||
      this.state.sortFilterCreatedBy.length === 0 ||
      this.state.sortFilterStatus.length === 0
    ) {
      return false;
    }
    if (data === "issueTpeName") {
      if (
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.sisSLAActiveFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          screatedByFilterCheckbox: "",
          sisSLAActiveFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "createdBy") {
      if (
        this.state.sissueTpeNameFilterCheckbox !== "" ||
        this.state.sisSLAActiveFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sissueTpeNameFilterCheckbox: "",
          sisSLAActiveFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "isSLAActive") {
      if (
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.sissueTpeNameFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sissueTpeNameFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }
  StatusCloseModel() {
    if (this.state.tempsla.length > 0) {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
        sla: this.state.tempsla,
        sFilterCheckbox: "",
        sortFilterIssueType: this.state.sortIssueType,
        sortFilterCreatedBy: this.state.sortCreatedBy,
        sortFilterStatus: this.state.sortStatus,
      });
      if (this.state.sortColumn === "issueTpeName") {
        if (this.state.sissueTpeNameFilterCheckbox === "") {
        } else {
          this.setState({
            screatedByFilterCheckbox: "",
            sisSLAActiveFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "createdBy") {
        if (this.state.screatedByFilterCheckbox === "") {
        } else {
          this.setState({
            sissueTpeNameFilterCheckbox: "",
            sisSLAActiveFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "isSLAActive") {
        if (this.state.sisSLAActiveFilterCheckbox === "") {
        } else {
          this.setState({
            sissueTpeNameFilterCheckbox: "",
            screatedByFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
        sla: this.state.isortA ? this.state.sla : this.state.sortAllData,
        sFilterCheckbox: "",
        sortFilterIssueType: this.state.sortIssueType,
        sortFilterCreatedBy: this.state.sortCreatedBy,
        sortFilterStatus: this.state.sortStatus,
      });
    }
  }

  setSortCheckStatus = (column, type, e) => {
    var itemsArray = [];

    var sissueTpeNameFilterCheckbox = this.state.sissueTpeNameFilterCheckbox;
    var screatedByFilterCheckbox = this.state.screatedByFilterCheckbox;
    var sisSLAActiveFilterCheckbox = this.state.sisSLAActiveFilterCheckbox;

    var allData = this.state.sortAllData;

    if (column === "issueTpeName" || column === "all") {
      if (type === "value" && type !== "All") {
        sissueTpeNameFilterCheckbox = sissueTpeNameFilterCheckbox.replace(
          "all",
          ""
        );
        sissueTpeNameFilterCheckbox = sissueTpeNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sissueTpeNameFilterCheckbox.includes(e.currentTarget.value)) {
          sissueTpeNameFilterCheckbox = sissueTpeNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sissueTpeNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sissueTpeNameFilterCheckbox.includes("all")) {
          sissueTpeNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "issueTpeName") {
            for (let i = 0; i < this.state.sortIssueType.length; i++) {
              sissueTpeNameFilterCheckbox +=
                this.state.sortIssueType[i].issueTpeName + ",";
            }
            sissueTpeNameFilterCheckbox += "all";
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
    if (column === "isSLAActive" || column === "all") {
      if (type === "value" && type !== "All") {
        sisSLAActiveFilterCheckbox = sisSLAActiveFilterCheckbox.replace(
          "all",
          ""
        );
        sisSLAActiveFilterCheckbox = sisSLAActiveFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sisSLAActiveFilterCheckbox.includes(e.currentTarget.value)) {
          sisSLAActiveFilterCheckbox = sisSLAActiveFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          sisSLAActiveFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sisSLAActiveFilterCheckbox.includes("all")) {
          sisSLAActiveFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "isSLAActive") {
            for (let i = 0; i < this.state.sortStatus.length; i++) {
              sisSLAActiveFilterCheckbox +=
                this.state.sortStatus[i].isSLAActive + ",";
            }
            sisSLAActiveFilterCheckbox += "all";
          }
        }
      }
    }

    this.setState({
      sissueTpeNameFilterCheckbox,
      screatedByFilterCheckbox,
      sisSLAActiveFilterCheckbox,
      issueColor: "",
      createdColor: "",
      stattusColor: "",
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "issueTpeName") {
      var sItems = sissueTpeNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.issueTpeName === sItems[i]
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
        issueColor: "sort-column",
      });
    } else if (column === "createdBy") {
      var sItems1 = screatedByFilterCheckbox.split(",");
      if (sItems1.length > 0) {
        for (let i = 0; i < sItems1.length; i++) {
          if (sItems1[i] !== "") {
            var tempFilterData1 = allData.filter(
              (a) => a.createdBy === sItems1[i]
            );
            if (tempFilterData1.length > 0) {
              for (let j = 0; j < tempFilterData1.length; j++) {
                itemsArray.push(tempFilterData1[j]);
              }
            }
          }
        }
      }
      this.setState({
        createdColor: "sort-column",
      });
    } else if (column === "isSLAActive") {
      var sItems2 = sisSLAActiveFilterCheckbox.split(",");
      if (sItems2.length > 0) {
        for (let i = 0; i < sItems2.length; i++) {
          if (sItems2[i] !== "") {
            var tempFilterData2 = allData.filter(
              (a) => a.isSLAActive === sItems2[i]
            );
            if (tempFilterData2.length > 0) {
              for (let j = 0; j < tempFilterData2.length; j++) {
                itemsArray.push(tempFilterData2[j]);
              }
            }
          }
        }
      }
      this.setState({
        stattusColor: "sort-column",
      });
    }

    this.setState({
      tempsla: itemsArray,
    });
  };

  selectIndividualSLA = async (issueId, actualIssueId, event) => {
    let selectedIssue = this.state.selectedIssueTypeIdsForSLA;

    var indiSla = this.state.indiSla;
    var separator = ",";
    var values = indiSla.split(separator);
    if (event.target.checked) {
      selectedIssue += actualIssueId + ",";
      // var flag = values.includes(issueId.toString());
      // if (!flag) {
      values.unshift(issueId);
      indiSla = values.join(separator);
      // }
      await this.setState({
        indiSla,
        selectedIssueTypeIdsForSLA: selectedIssue,
      });
      document.getElementById("issueTypeValue").textContent =
        this.state.indiSla.split(",").length - 1 + " selected";
    } else {
      selectedIssue = selectedIssue.replace(actualIssueId + ",", "");
      for (var i = 0; i < values.length; i++) {
        if (parseInt(values[i]) === issueId) {
          values.splice(i, 1);
          indiSla = values.join(separator);
        }
      }
      await this.setState({
        indiSla,
        selectedIssueTypeIdsForSLA: selectedIssue,
      });
      if (this.state.indiSla.split(",").length - 1 !== 0) {
        document.getElementById("issueTypeValue").textContent =
          this.state.indiSla.split(",").length - 1 + " selected";
      } else {
        document.getElementById("issueTypeValue").textContent = "Select";
      }
    }
  };

  selectAboveIndividualSLA = async (issueId, event) => {
    var indiSla = this.state.indiSla;
    var separator = ",";
    var values = indiSla.split(separator);
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        indiSla = values.join(separator);
      }
      await this.setState({
        indiSla,
      });
      document.getElementById("issueTypeValue").textContent =
        this.state.indiSla.split(",").length - 1 + " selected";
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] === issueId) {
          values.splice(i, 1);
          indiSla = values.join(separator);
        }
      }
      await this.setState({
        indiSla,
      });
      if (this.state.indiSla.split(",").length - 1 !== 0) {
        document.getElementById("issueTypeValue").textContent =
          this.state.indiSla.split(",").length - 1 + " selected";
      } else {
        document.getElementById("issueTypeValue").textContent = "Select";
      }
    }
  };

  selectAllSLA = async (event) => {
    var indiSla = "";
    var checkboxes = document.getElementsByName("allSla");
    document.getElementById("issueTypeValue").textContent = "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (this.state.slaIssueType !== null) {
      this.state.slaIssueType.forEach(allSlaId);
      function allSlaId(item) {
        indiSla += item.issueTypeID + ",";
      }
    }
    await this.setState({
      indiSla,
      selectedIssueTypeIdsForSLA: indiSla,
    });
  };

  selectNoSLA = async (event) => {
    var checkboxes = document.getElementsByName("allSla");
    document.getElementById("issueTypeValue").textContent = "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiSla: "",
      selectedIssueTypeIdsForSLA: "",
    });
  };
  selectNoAboveSLA = async (event) => {
    var checkboxes = document.getElementsByName("searchedSla");
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
  };

  ///handle edit sla targets
  handleEditSlaTargets = (i, e) => {
    const { name, value } = e.target;
    let finalEditData = [...this.state.finalEditData];
    if (
      name === "SlaBreach" ||
      name === "Rerspondtime" ||
      name === "ResolveTime"
    ) {
      var reg = /^[0-9\b]+$/;
      if (value === "" || reg.test(value)) {
        finalEditData[i] = {
          ...finalEditData[i],
          [name]: value,
        };
        this.setState({ finalEditData });
      } else {
        e.target.value = "";
      }
    } else {
      finalEditData[i] = {
        ...finalEditData[i],
        [name]: value,
      };
      this.setState({ finalEditData });
    }
  };

  handleSlaTargets = (i, e) => {
    if (
      e.target.name === "SlaBreach" ||
      e.target.name === "Rerspondtime" ||
      e.target.name === "ResolveTime"
    ) {
      var reg = /^[0-9\b]+$/;
      if (e.target.value === "" || reg.test(e.target.value)) {
        const { name, value } = e.target;
        let finalData = [...this.state.finalData];
        finalData[i] = {
          ...finalData[i],
          [name]: value,
        };
        this.setState({ finalData });
      } else {
        e.target.value = "";
      }
    } else {
      const { name, value } = e.target;
      let finalData = [...this.state.finalData];
      finalData[i] = {
        ...finalData[i],
        [name]: value,
      };
      this.setState({ finalData });
    }
  };
  handleSlaTargetsDropdowns(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleGetSLAIssueType() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/SLA/GetIssueType",
      headers: authHeader(),
      params: {
        SearchText: this.state.SearchText,
      },
    })
      .then(function(res) {
        let slaIssueType = res.data.responseData;
        if (slaIssueType !== null && slaIssueType !== undefined) {
          self.setState({ slaIssueType });
          var checkboxes = document.getElementsByName("allSla");
          for (var i in checkboxes) {
            if (checkboxes[i].checked === true) {
              checkboxes[i].checked = false;
            }
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleCreate(issueTypeName) {
    let { slaIssueType, value } = this.state;
    let newOption = {
      issueTypeName,
      issueTypeID: slaIssueType.length + 1,
    };

    this.setState({
      value: newOption, // select new option
      slaIssueType: [...slaIssueType, newOption], // add new option to our dataset
    });
  }
  handleGetSLA() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/SLA/GetSLA",
      headers: authHeader(),
      params: {
        SLAFor: 1,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;

        if (data !== null) {
          self.state.sortAllData = data;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].issueTpeName]) {
              distinct.push(data[i].issueTpeName);
              unique[data[i].issueTpeName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortIssueType.push({ issueTpeName: distinct[i] });
            self.state.sortFilterIssueType.push({ issueTpeName: distinct[i] });
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
            if (!unique[data[i].isSLAActive]) {
              distinct.push(data[i].isSLAActive);
              unique[data[i].isSLAActive] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortStatus.push({ isSLAActive: distinct[i] });
            self.state.sortFilterStatus.push({ isSLAActive: distinct[i] });
          }
        }

        if (status === "Success") {
          self.setState({ sla: data });
        } else {
          self.setState({ sla: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetPriorityList() {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/Priority/GetPriorityList",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        let temp = [];

        if (status === "Success") {
          for (let i = 0; i < data.length; i++) {
            let tempData = {};

            tempData.priorityID = data[i].priorityID;
            tempData.priortyName = data[i].priortyName;
            tempData.SlaBreach = "";
            tempData.Rerspondtime = "";
            tempData.RerspondType = "M";
            tempData.ResolveTime = "";
            tempData.ResolveType = "M";

            temp.push(tempData);
          }
          self.setState({ PriorityData: data, finalData: temp });
        } else {
          self.setState({ PriorityData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUpdateSlaIssueType = (e) => {
    let updateSlaIssueType = e.currentTarget.value;
    this.setState({ updateIssueTypeId: updateSlaIssueType });
  };
  handleUpdateSlaisActive = (e) => {
    let updateSlaisActive = e.currentTarget.value;
    this.setState({ updateSlaisActive });
  };
  handleSlaIsActive = (e) => {
    let SlaIsActive = e.currentTarget.value;
    this.setState({ SlaIsActive });
  };

  ////handle change edit
  handleEditSlaIsActive = (e) => {
    let isActive = e.currentTarget.value;
    this.setState({ isActive });
  };

  ////get SLA data by SLA ID
  handleEditSLAById(idSLA) {
    var SLAId = idSLA || 0;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/SLA/GetSLADetail",
      headers: authHeader(),
      params: {
        SLAId: SLAId,
      },
    })
      .then(function(res) {
        var message = res.data.message;
        var statusCode = res.data.statusCode;
        if (message === "Success" && statusCode === 200) {
          var data = res.data.responseData;
          var issueTypeName = data.issueTypeName;
          var brandName = data.brandName;
          var categoryName = data.categoryName;
          var subCategoryName = data.subCategoryName;
          var isActive = data.isActive;
          var tempData = data.sLATargetDetails;
          var tempFinalData = [];
          if (tempData.length > 0) {
            for (let i = 0; i < tempData.length; i++) {
              var tempObj = {};
              tempObj.priorityID = tempData[i].priorityID;
              tempObj.priortyName = tempData[i].priorityName;
              tempObj.SlaBreach = tempData[i].slaBridgeInPercantage;
              tempObj.Rerspondtime = tempData[i].slaResponseValue;
              tempObj.RerspondType = tempData[i].slaResponseType;
              tempObj.ResolveTime = tempData[i].slaResolveValue;
              tempObj.ResolveType = tempData[i].slaResolveType;
              tempObj.isActive = tempData[i].isActive;
              tempObj.slaTargetID = tempData[i].slaTargetID;
              tempFinalData.push(tempObj);
            }
          }
          self.setState({
            issueTypeName,
            brandName,
            categoryName,
            subCategoryName,
            isActive,
            SLAId,
            finalEditData: tempFinalData,
            editmodel: true,
          });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  createSla() {
    const TranslationContext = this.state.translateLanguage.default;
    var array = this.state.finalData;
    var valid = false;
    if (array.length > 0) {
      for (var i = 0; i < array.length; i++) {
        if (
          array[i].SlaBreach !== "" ||
          array[i].Rerspondtime !== "" ||
          array[i].ResolveTime !== ""
        ) {
          valid = true;
        } else {
          valid = false;
        }
      }
    }

    if (this.state.indiSla !== "" && valid === true) {
      let self = this;
      let SlaIsActive;
      let indiSla = this.state.indiSla;
      let commaSeperatedSla = indiSla.substring(0, indiSla.length - 1);
      if (this.state.SlaIsActive === "true") {
        SlaIsActive = true;
      } else if (this.state.SlaIsActive === "false") {
        SlaIsActive = false;
      }
      var data = this.state.finalData;

      var paramData = [];
      for (let i = 0; i < data.length; i++) {
        var temp = {};
        temp.PriorityID = parseInt(data[i].priorityID);
        temp.SLABreachPercent = parseInt(data[i].SlaBreach);
        temp.PriorityRespondValue = parseInt(data[i].Rerspondtime);
        temp.PriorityRespondDuration = data[i].RerspondType;
        temp.PriorityResolutionValue = parseInt(data[i].ResolveTime);
        temp.PriorityResolutionDuration = data[i].ResolveType;
        paramData.push(temp);
      }

      axios({
        method: "post",
        url: config.apiUrl + "/SLA/CreateSLA",
        headers: authHeader(),
        data: {
          IssueTypeID: this.state.selectedIssueTypeIdsForSLA,
          isSLAActive: SlaIsActive,
          SLATarget: paramData,
          SLAFor: 1,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.slaaddeddsuccessfully
                : "SLA added successfully."
            );
            self.setState({
              SlaIsActive: "true",
              SearchText: "",
              issueTypeCompulsion: "",
              slaTargetCompulsion: "",
            });
            self.handleGetSLA();
            self.handleGetPriorityList();
            self.selectNoSLA();
            self.selectNoAboveSLA();
          } else {
            NotificationManager.error(status);
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        issueTypeCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectissuetype
            : "Please select issue type.",
        slaTargetCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.required
            : "Required.",
      });
    }
  }

  deleteSLA(deleteId) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/SLA/DeleteSLA",
      headers: authHeader(),
      params: {
        SLAID: deleteId,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Record deleted Successfully") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.sladeletedsuccessfully
              : "SLA deleted successfully."
          );
          self.handleGetSLA();
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.slanotdeleted
              : "SLA not deleted."
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

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
  handleSearchSla = async (e) => {
    if (e.target.value.length > 3) {
      await this.setState({
        SearchText: e.target.value,
      });
      this.handleGetSLAIssueType();
    } else {
      await this.setState({
        SearchText: "",
      });
      this.handleGetSLAIssueType();
    }
  };
  handleClearSearchSla = async (e) => {
    await this.setState({
      SearchText: "",
    });
    document.getElementById("SlaInput").value = "";
    this.handleGetSLAIssueType();
  };
  handleSlaButton() {
    let slaShowOriginal = this.state.slaShow;
    let slaShow = !slaShowOriginal;
    let slaOvrlayShowOriginal = this.state.slaOvrlayShow;
    let slaOvrlayShow = !slaOvrlayShowOriginal;
    this.setState({
      slaShow,
      slaOvrlayShow,
    });
  }

  toggleEditModal() {
    this.setState({ editmodel: false });
  }
  ////handle update sla details by id
  handleUpdareSLADetails() {
    const TranslationContext = this.state.translateLanguage.default;
    var EditData = this.state.finalEditData;
    var valid = false;

    let self = this;
    var inputParamter = {};
    inputParamter.SLAId = this.state.SLAId;
    inputParamter.IsActive = this.state.isActive;
    inputParamter.createdBy = this.state.createdBy;
    inputParamter.CategoryName = this.state.categoryName;
    inputParamter.SubCategoryName = this.state.subCategoryName;
    inputParamter.IssueTypeName = this.state.issueTypeName;
    var SLATargetTempData = [];
    for (let i = 0; i < this.state.finalEditData.length > 0; i++) {
      var obj = {};
      obj.priorityID = this.state.finalEditData[i].priorityID;
      obj.priorityName = this.state.finalEditData[i].priortyName;
      obj.slaBridgeInPercantage = this.state.finalEditData[i].SlaBreach;
      obj.slaResponseValue = this.state.finalEditData[i].Rerspondtime;
      obj.slaResponseType = this.state.finalEditData[i].RerspondType;
      obj.slaResolveValue = this.state.finalEditData[i].ResolveTime;
      obj.slaResolveType = this.state.finalEditData[i].ResolveType;
      obj.isActive = this.state.finalEditData[i].isActive;
      obj.slaTargetID = this.state.finalEditData[i].slaTargetID;
      SLATargetTempData.push(obj);
    }
    inputParamter.sLATargetDetails = SLATargetTempData;
    this.setState({ editSaveLoading: true });

    axios({
      method: "post",
      url: config.apiUrl + "/SLA/UpdareSLADetails",
      headers: authHeader(),
      data: inputParamter,
    })
      .then(function(res) {
        var message = res.data.message;
        var statusCode = res.data.statusCode;
        if (message === "Success" && statusCode === 200) {
          self.setState({ editSaveLoading: false, editmodel: false });
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.slaupdatesuccessfully
              : "SLA Updated Successfully"
          );
          self.handleGetSLA();
        } else {
          self.setState({ editSaveLoading: false, editmodel: false });
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.slanotupdated
              : "SLA Not Updated"
          );
        }
      })
      .catch((response) => {
        self.setState({ editSaveLoading: false, editmodel: false });
        NotificationManager.success(
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.slanotupdated
            : "SLA Not Updated"
        );
        console.log(response);
      });
  }

  filteTextChange(e) {
    this.setState({ filterTxtValue: e.target.value });

    if (this.state.sortColumn === "issueTpeName") {
      var sortFilterIssueType = matchSorter(
        this.state.sortIssueType,
        e.target.value,
        { keys: ["issueTpeName"] }
      );
      if (sortFilterIssueType.length > 0) {
        this.setState({ sortFilterIssueType });
      } else {
        this.setState({
          sortFilterIssueType: this.state.sortIssueType,
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
    if (this.state.sortColumn === "isSLAActive") {
      var sortFilterStatus = matchSorter(
        this.state.sortStatus,
        e.target.value,
        { keys: ["isSLAActive"] }
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
          url: config.apiUrl + "/SLA/BulkUploadSLA",
          headers: authHeader(),
          data: formData,
        })
          .then(function(res) {
            let status = res.data.message;
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
              self.handleGetSLA();
            } else {
              self.setState({
                showProgress: false,
                bulkuploadLoading: false,
                progressValue: 0,
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
  handleDeleteBulkupload = (e) => {
    const TranslationContext = this.state.translateLanguage.default;
    this.setState({
      fileN: [],
      fileName: "",
    });
    NotificationManager.success(
      TranslationContext !== undefined
        ? TranslationContext.alertmessage.filedeletedsuccessfully
        : "File deleted successfully."
    );
  };

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <React.Fragment>
        <div className="position-relative d-inline-block">
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
                        this.state.sissueTpeNameFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.screatedByFilterCheckbox.includes("all") ||
                        this.state.sisSLAActiveFilterCheckbox.includes("all")
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
                  {this.state.sortColumn === "issueTpeName"
                    ? this.state.sortFilterIssueType !== null &&
                      this.state.sortFilterIssueType.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.issueTpeName}
                            value={item.issueTpeName}
                            checked={this.state.sissueTpeNameFilterCheckbox.includes(
                              item.issueTpeName
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "issueTpeName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.issueTpeName}>
                            <span className="table-btn table-blue-btn">
                              {item.issueTpeName}
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
                            name="filter-type"
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

                  {this.state.sortColumn === "isSLAActive"
                    ? this.state.sortFilterStatus !== null &&
                      this.state.sortFilterStatus.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.isSLAActive}
                            value={item.isSLAActive}
                            checked={this.state.sisSLAActiveFilterCheckbox.includes(
                              item.isSLAActive
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "isSLAActive",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.isSLAActive}>
                            <span className="table-btn table-blue-btn">
                              {item.isSLAActive}
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
              ? TranslationContext.link.sla
              : "SLA"}
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr settingtable">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height TicketSlaReact settings-align">
                  <ReactTable
                    data={this.state.sla}
                    minRows={2}
                    columns={[
                      {
                        Header: (
                          <span
                            className={this.state.issueColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "issueTpeName",
                              TranslationContext !== undefined
                                ? TranslationContext.span.issuetype
                                : "IssueType"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.issuetype
                              : "Issue Type"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "issueTpeName",
                        Cell: (row) => {
                          var ids = row.original["id"];
                          return (
                            <div>
                              <span className="one-liner">
                                {row.original.issueTpeName}
                                <Popover
                                  content={
                                    <>
                                      <div>
                                        <p className="title">
                                          <b>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.b.brand
                                              : "Brand"}
                                            :
                                          </b>
                                          {row.original.brandName}
                                        </p>

                                        <p className="sub-title">
                                          <b>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                  .category
                                              : "Category"}
                                            :
                                          </b>
                                          {row.original.categoryName}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="sub-title">
                                          <b>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                  .subcategory
                                              : "Sub Category"}
                                            :
                                          </b>
                                          {row.original.subCategoryName}
                                        </p>
                                      </div>
                                    </>
                                  }
                                  placement="bottom"
                                >
                                  <img
                                    className="info-icon"
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
                            {TranslationContext !== undefined
                              ? TranslationContext.span.slabypriority
                              : "SLA by Priority"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        minWidth: 200,
                        sortable: false,
                        accessor: "slaTarget",
                        Cell: (row) => {
                          var ids = row.original["id"];
                          let slaTarget = row.original.slaTarget,
                            priorityNameComma = "",
                            priorityName = "";
                          for (let i = 0; i < slaTarget.length; i++) {
                            priorityNameComma +=
                              slaTarget[i].priorityName + ", ";
                          }
                          priorityName = priorityNameComma.substring(
                            0,
                            priorityNameComma.length - 2
                          );
                          return (
                            <div>
                              <span className="one-liner">
                                <label>{priorityName}</label>
                                {priorityName.length > 0 ? (
                                  <Popover
                                    content={
                                      <div className="general-popover created-popover sla-popover">
                                        <div>
                                          <label className="slatargettext-1">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                  .slatargets
                                              : "SLA TARGETS"}
                                          </label>
                                        </div>
                                        <div>
                                          <label className="createhead-text-1">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                  .priority
                                              : "Priority"}
                                          </label>
                                          <label className="createhead-text-1">
                                            %
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label.sla
                                              : "SLA Breach"}
                                          </label>
                                          <label className="createhead-text-1">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label.respond
                                              : "Respond"}
                                          </label>
                                          <label className="createhead-text-1">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label.resolve
                                              : "Resolve"}
                                          </label>
                                        </div>
                                        {slaTarget !== null &&
                                          slaTarget.map((item, i) => (
                                            <div key={i}>
                                              <label className="slatemp-textpopup-1">
                                                {item.priorityName}
                                              </label>
                                              <label className="slatemp-textpopup-1">
                                                {item.slaBreachPercent}
                                              </label>
                                              <label className="slatemp-textpopup-1">
                                                {item.priorityRespond}
                                              </label>
                                              <label className="slatemp-textpopup-1">
                                                {item.priorityResolution}
                                              </label>
                                            </div>
                                          ))}
                                      </div>
                                    }
                                    placement="bottom"
                                  >
                                    <img
                                      className="info-icon"
                                      src={BlackInfoIcon}
                                      alt="info-icon"
                                      id={ids}
                                    />
                                  </Popover>
                                ) : (
                                  ""
                                )}
                              </span>
                            </div>
                          );
                        },
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
                                : "Created By"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.createdby
                              : "Created By"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        width: 170,
                        accessor: "createdBy",
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
                                    className="info-icon"
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
                            className={this.state.stattusColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "isSLAActive",
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
                        accessor: "isSLAActive",
                      },
                      {
                        Header: (
                          <span>
                            {TranslationContext !== undefined
                              ? TranslationContext.span.action
                              : "Actions"}
                          </span>
                        ),
                        minWidth: 120,
                        accessor: "actiondept",
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
                                            onClick={this.deleteSLA.bind(
                                              this,
                                              row.original.slaid
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
                                  id={row.original.slaid}
                                  onClick={this.handleEditSLAById.bind(
                                    this,
                                    row.original.slaid
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
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="store-col-2">
                  <div className="createSpace">
                    <label className="Create-store-text">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.createsla
                        : "CREATE SLA"}
                    </label>
                    <div className="divSpace">
                      <div className="dropDrownSpace issuetype-cusdrp">
                        <label className="reports-to">
                          {TranslationContext !== undefined
                            ? TranslationContext.label.issuetype
                            : "Issue Type"}
                        </label>
                        <div className="dropdown">
                          <button
                            className="btn issuesladrop"
                            type="button"
                            id="issueTypeValue"
                            onClick={this.handleSlaButton}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.select
                              : "Select"}
                            <span className="caret"></span>
                          </button>
                          {this.state.indiSla === "" && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.issueTypeCompulsion}
                            </p>
                          )}
                          <div
                            className={
                              this.state.slaShow
                                ? "dropdown-menu dropdown-menu-sla show"
                                : "dropdown-menu dropdown-menu-sla"
                            }
                          >
                            <div className="cat-mainbox">
                              <div className="sla-cancel-search">
                                <input
                                  type="text"
                                  className="searchf"
                                  placeholder="Search"
                                  maxLength={25}
                                  name="store_code"
                                  onChange={this.handleSearchSla}
                                  id="SlaInput"
                                />

                                <img
                                  src={Cancel}
                                  alt="cancelimg"
                                  onClick={this.handleClearSearchSla}
                                />
                              </div>

                              <div className="category-button">
                                <ul>
                                  <li>
                                    <label
                                      onClick={this.selectAllSLA.bind(this)}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.label.selectall
                                        : "Select All"}
                                    </label>
                                  </li>
                                  <li>
                                    <label
                                      onClick={this.selectNoSLA.bind(this)}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.label.clear
                                        : "Clear"}
                                    </label>
                                  </li>
                                </ul>
                              </div>
                              <div className="category-box category-scroll">
                                <ul>
                                  {this.state.slaIssueType !== null &&
                                    this.state.slaIssueType.map((item, i) => (
                                      <li key={i}>
                                        <input
                                          type="checkbox"
                                          id={i + item.issueTypeID}
                                          name="allSla"
                                          onChange={this.selectIndividualSLA.bind(
                                            this,
                                            i + item.issueTypeID,
                                            item.issueTypeID
                                          )}
                                        />
                                        <label htmlFor={i + item.issueTypeID}>
                                          {item.issueTypeName}{" "}
                                          <div>
                                            <img src={Correct} alt="Checked" />
                                          </div>
                                        </label>
                                        <span>{item.brandName}</span>
                                        <span>{item.categoryName}</span>
                                        <span>{item.subCategoryName}</span>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                            <div className="category-buttonbtm">
                              <ul>
                                <li>
                                  <button
                                    className="cancel"
                                    onClick={this.handleSlaButton}
                                  >
                                    {TranslationContext !== undefined
                                      ? TranslationContext.button.cancel
                                      : "Cancel"}
                                  </button>
                                </li>
                                <li style={{ float: "right" }}>
                                  <button
                                    className="done"
                                    onClick={this.handleSlaButton}
                                  >
                                    {TranslationContext !== undefined
                                      ? TranslationContext.button.done
                                      : "Done"}
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="slatargetRow">
                      <label className="slatargettext">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.slatargets
                          : "SLA Targets"}
                      </label>
                    </div>
                    <div className="slatargetRow-1">
                      <label className="createhead-text-new  createhead-cus">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.priority
                          : "Priority"}
                      </label>
                      <label className="createhead-text">
                        %
                        {TranslationContext !== undefined
                          ? TranslationContext.label.sla
                          : "SLA"}{" "}
                        <br />{" "}
                        {TranslationContext !== undefined
                          ? TranslationContext.label.breach
                          : "Breach"}
                      </label>
                      <label className="createhead-text">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.respond
                          : "Respond"}
                      </label>
                      <label className="createhead-text">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.resolve
                          : "Resolve"}
                      </label>
                    </div>
                    {this.state.finalData !== null &&
                      this.state.finalData.map((item, i) => (
                        <div className="slatargetRow-1" key={i}>
                          <div className="sla-div">
                            <label className="createhead-text-1">
                              {item.priortyName}
                            </label>
                          </div>
                          <div className="sla-div-1">
                            <div>
                              <div className="inner-div">
                                <input
                                  type="text"
                                  placeholder="00"
                                  className="text-box-crt-sla"
                                  name="SlaBreach"
                                  value={item.SlaBreach || ""}
                                  autoComplete="off"
                                  onChange={this.handleSlaTargets.bind(this, i)}
                                />
                              </div>
                              <div className="inner-div-2-1">
                                <label className="pers-lable">%</label>
                              </div>
                            </div>
                            {item.SlaBreach === "" && (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.slaTargetCompulsion}
                              </p>
                            )}
                          </div>

                          <div className="sla-div-1">
                            <div>
                              <div className="inner-div">
                                <input
                                  type="text"
                                  placeholder="00"
                                  className="text-box-crt-sla"
                                  name="Rerspondtime"
                                  value={item.Rerspondtime}
                                  autoComplete="off"
                                  onChange={this.handleSlaTargets.bind(this, i)}
                                />
                              </div>
                              <div className="inner-div-2">
                                <select
                                  className="pers-lable-select"
                                  name="RerspondType"
                                  value={item.RerspondType}
                                  onChange={this.handleSlaTargets.bind(this, i)}
                                >
                                  <option value="M">M</option>
                                  <option value="H">H</option>
                                  <option value="D">D</option>
                                </select>
                              </div>
                            </div>
                            {item.Rerspondtime === "" && (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.slaTargetCompulsion}
                              </p>
                            )}
                          </div>
                          <div className="sla-div-1">
                            <div>
                              <div className="inner-div">
                                <input
                                  type="text"
                                  placeholder="00"
                                  className="text-box-crt-sla"
                                  autoComplete="off"
                                  name="ResolveTime"
                                  value={item.ResolveTime || ""}
                                  onChange={this.handleSlaTargets.bind(this, i)}
                                />
                              </div>
                              <div className="inner-div-2">
                                <select
                                  className="pers-lable-select"
                                  name="ResolveType"
                                  value={item.ResolveType}
                                  onChange={this.handleSlaTargets.bind(this, i)}
                                >
                                  <option value="M">M</option>
                                  <option value="H">H</option>
                                  <option value="D">D</option>
                                </select>
                              </div>
                            </div>
                            {item.ResolveTime === "" && (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.slaTargetCompulsion}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}

                    <div className="divSpace-3">
                      <div className="dropDrownSpace">
                        <label className="reports-to">
                          {TranslationContext !== undefined
                            ? TranslationContext.label.status
                            : "Status"}
                        </label>
                        <select
                          className="store-create-select"
                          value={this.state.SlaIsActive}
                          onChange={this.handleSlaIsActive}
                        >
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
                      </div>
                    </div>
                    <div className="btnSpace">
                      <button
                        className="addBtn-ticket-hierarchy"
                        type="button"
                        onClick={this.createSla.bind(this)}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.label.add
                          : "ADD"}
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <div className="store-col-2">
                  <div className="right-sect-div">
                    <br />
                    <div className="d-flex justify-content-between align-items-center pb-2">
                      <h3 className="pb-0">
                        {TranslationContext !== undefined
                          ? TranslationContext.h3.bulkupload
                          : "Bulk Upload"}
                      </h3>
                      <div className="down-excel">
                        <p>
                          {TranslationContext !== undefined
                            ? TranslationContext.p.template
                            : "Template"}
                        </p>
                        <CSVLink filename={"SLA.csv"} data={config.slaTemplate}>
                          <img src={DownExcel} alt="download icon" />
                        </CSVLink>
                      </div>
                    </div>
                    <Spin
                      tip="Please wait..."
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
                              </span>{" "}
                              {TranslationContext !== undefined
                                ? TranslationContext.div.ordropfilehere
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
                                        onClick={this.handleDeleteBulkupload}
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.button.delete
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
                                <p className="file-name">
                                  {this.state.fileName}
                                </p>
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
                                    <img
                                      src={UploadCancel}
                                      alt="upload cancel"
                                    />
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
                          ? TranslationContext.button.add
                          : "ADD"}
                      </button>
                    </Spin>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="overlaySla"
          className={this.state.slaOvrlayShow ? "show" : ""}
          onClick={this.handleSlaButton}
        />
        <Modal
          modalId="slaEditModal"
          onClose={this.toggleEditModal}
          open={this.state.editmodel}
          overlayId="logout-ovrly"
        >
          <div className="edtpadding">
            <label className="Create-store-text" style={{ paddingTop: "0" }}>
              {TranslationContext !== undefined
                ? TranslationContext.label.editsla
                : "EDIT SLA"}
            </label>
            <div className="row">
              <div className="col-md-6">
                <label className="createhead-text-new">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.brandname
                    : "Brand Name"}
                  :
                </label>
                <label className="createhead-text-1">
                  {this.state.brandName}
                </label>
              </div>
              <div className="col-md-6">
                <label className="createhead-text-new">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.categoryname
                    : "Category Name"}
                  :
                </label>
                <label className="createhead-text-1">
                  {this.state.categoryName}
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label className="createhead-text-new">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.subcategoryname
                    : "Sub Category Name"}
                  :
                </label>
                <label className="createhead-text-1">
                  {this.state.subCategoryName}
                </label>
              </div>
              <div className="col-md-6">
                <label className="createhead-text-new">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.issuetype
                    : "Issue Type"}
                  :
                </label>
                <label className="createhead-text-1">
                  {this.state.issueTypeName}
                </label>
              </div>
            </div>
            <br />
            <div className="slatargetRow">
              <label className="slatargettext">
                {TranslationContext !== undefined
                  ? TranslationContext.label.slatargets
                  : "SLA Targets"}
              </label>
            </div>
            <div className="slatargetRow-1">
              <label className="createhead-text-new createhead-cus">
                {TranslationContext !== undefined
                  ? TranslationContext.label.priority
                  : "Priority"}
              </label>
              <label className="createhead-text">
                %
                {TranslationContext !== undefined
                  ? TranslationContext.label.sla
                  : "SLA"}
                <br />
                {TranslationContext !== undefined
                  ? TranslationContext.label.breach
                  : "Breach"}
              </label>
              <label className="createhead-text">
                {TranslationContext !== undefined
                  ? TranslationContext.label.respond
                  : "Respond"}
              </label>
              <label className="createhead-text">
                {TranslationContext !== undefined
                  ? TranslationContext.label.resolve
                  : "Resolve"}
              </label>
            </div>
            {this.state.finalEditData !== null &&
              this.state.finalEditData.map((item, i) => (
                <div className="slatargetRow-1" key={i}>
                  <div className="sla-div">
                    <label className="createhead-text-1">
                      {item.priortyName}
                    </label>
                  </div>
                  <div className="sla-div-1">
                    <div>
                      <div className="inner-div">
                        <input
                          type="text"
                          placeholder="00"
                          className="text-box-crt-sla"
                          name="SlaBreach"
                          value={item.SlaBreach || ""}
                          autoComplete="off"
                          onChange={this.handleEditSlaTargets.bind(this, i)}
                        />
                      </div>
                      <div className="inner-div-2-1">
                        <label className="pers-lable">%</label>
                      </div>
                    </div>
                    {item.SlaBreach === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.slaTargetCompulsionEdit}
                      </p>
                    )}
                  </div>

                  <div className="sla-div-1">
                    <div>
                      <div className="inner-div">
                        <input
                          type="text"
                          placeholder="00"
                          className="text-box-crt-sla"
                          name="Rerspondtime"
                          value={item.Rerspondtime}
                          autoComplete="off"
                          onChange={this.handleEditSlaTargets.bind(this, i)}
                        />
                      </div>
                      <div className="inner-div-2">
                        <select
                          className="pers-lable-select"
                          name="RerspondType"
                          value={item.RerspondType}
                          onChange={this.handleEditSlaTargets.bind(this, i)}
                        >
                          <option value="M">M</option>
                          <option value="H">H</option>
                          <option value="D">D</option>
                        </select>
                      </div>
                    </div>
                    {item.Rerspondtime === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.slaTargetCompulsionEdit}
                      </p>
                    )}
                  </div>
                  <div className="sla-div-1">
                    <div>
                      <div className="inner-div">
                        <input
                          type="text"
                          placeholder="00"
                          className="text-box-crt-sla"
                          autoComplete="off"
                          name="ResolveTime"
                          value={item.ResolveTime || ""}
                          onChange={this.handleEditSlaTargets.bind(this, i)}
                        />
                      </div>
                      <div className="inner-div-2">
                        <select
                          className="pers-lable-select"
                          name="ResolveType"
                          value={item.ResolveType}
                          onChange={this.handleEditSlaTargets.bind(this, i)}
                        >
                          <option value="M">M</option>
                          <option value="H">H</option>
                          <option value="D">D</option>
                        </select>
                      </div>
                    </div>
                    {item.ResolveTime === "" && (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.slaTargetCompulsionEdit}
                      </p>
                    )}
                  </div>
                </div>
              ))}

            <div className="divSpace-3">
              <div className="dropDrownSpace">
                <label className="reports-to">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.status
                    : "Status"}
                </label>
                <select
                  className="store-create-select"
                  value={this.state.isActive}
                  onChange={this.handleEditSlaIsActive}
                >
                  <option value={true}>
                    {TranslationContext !== undefined
                      ? TranslationContext.option.active
                      : "Active"}
                  </option>
                  <option value={false}>
                    {TranslationContext !== undefined
                      ? TranslationContext.option.inactive
                      : "Inactive"}
                  </option>
                </select>
              </div>
            </div>
            <div className="text-center">
              <a
                className="pop-over-cancle"
                onClick={this.toggleEditModal.bind(this)}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.a.cancel
                  : "CANCEL"}
              </a>
              <button
                className="pop-over-button FlNone"
                disabled={this.state.editSaveLoading}
                onClick={this.handleUpdareSLADetails.bind(this)}
                type="submit"
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
                <label className="pop-over-btnsave-text">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.save
                    : "SAVE"}
                </label>
              </button>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}
export default CreateSLA;
