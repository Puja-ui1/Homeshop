import React, { Component } from "react";
import { Link } from "react-router-dom";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import { UncontrolledPopover, PopoverBody, Fade } from "reactstrap";
import Demo from "../../../store/Hashtag.js";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import Correct from "./../../../assets/Images/correct.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import Cancel from "./../../../assets/Images/cancel.png";
import DownExcel from "./../../../assets/Images/csv.png";
import { ProgressBar } from "react-bootstrap";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover, Spin, Empty } from "antd";
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

class SlaTemplateDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      slaTemplateGrid: [],
      slaFunctionName: [],
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
      issueTypeCompulsory: "",
      slaTargetCompulsory: "",
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
      functionName: "",
      functionId: "",
      brandName: "",
      departmentName: "",
      storeName: "",
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
      regexp: /^[0-9\b]+$/,
      isATOZ: true,
      translateLanguage: {},
      bulkuploadLoading: false,
    };
    this.handleGetSLATemplateGrid = this.handleGetSLATemplateGrid.bind(this);
    this.handleGetSLAFunctionName = this.handleGetSLAFunctionName.bind(this);
    this.handleSlaButton = this.handleSlaButton.bind(this);
    this.handleGetPriorityList = this.handleGetPriorityList.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
  }

  componentDidMount() {
  this.handleGetSLATemplateGrid();
    this.handleGetSLAFunctionName();
    this.handleGetPriorityList();

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  sortStatusAtoZ() {
    var itemsArray = [];
    itemsArray = this.state.slaTemplateGrid;

    if (this.state.sortColumn === "functionName") {
      itemsArray.sort((a, b) => {
        if (a.functionName < b.functionName) return -1;
        if (a.functionName > b.functionName) return 1;
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
      isATOZ: true,
      isortA: true,
      slaTemplateGrid: itemsArray,
    });
    this.StatusCloseModel();
  }
  sortStatusZtoA() {
    var itemsArray = [];
    itemsArray = this.state.slaTemplateGrid;

    if (this.state.sortColumn === "functionName") {
      itemsArray.sort((a, b) => {
        if (a.functionName < b.functionName) return 1;
        if (a.functionName > b.functionName) return -1;
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
      isATOZ: false,
      isortA: true,
      slaTemplateGrid: itemsArray,
    });
    this.StatusCloseModel();
  }

  StatusOpenModel(data, header) {
    if (
      this.state.sortFilterIssueType.length === 0 ||
      this.state.sortFilterCreatedBy.length === 0 ||
      this.state.sortFilterStatus.length === 0
    ) {
      return false;
    }
    if (data === "functionName") {
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
        slaTemplateGrid: this.state.tempsla,
        sFilterCheckbox: "",
      });
      if (this.state.sortColumn === "functionName") {
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
        slaTemplateGrid: this.state.isortA
          ? this.state.slaTemplateGrid
          : this.state.sortAllData,
      });
    }
  }

  setSortCheckStatus = (column, type, e) => {
    var itemsArray = [];

    var sissueTpeNameFilterCheckbox = this.state.sissueTpeNameFilterCheckbox;
    var screatedByFilterCheckbox = this.state.screatedByFilterCheckbox;
    var sisSLAActiveFilterCheckbox = this.state.sisSLAActiveFilterCheckbox;

    var allData = this.state.sortAllData;

    if (column === "functionName" || column === "all") {
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
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sissueTpeNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sissueTpeNameFilterCheckbox.includes("all")) {
          sissueTpeNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "functionName") {
            for (let i = 0; i < this.state.sortIssueType.length; i++) {
              sissueTpeNameFilterCheckbox +=
                this.state.sortIssueType[i].functionName + ",";
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
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
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
    } else if (column === "functionName") {
      var sItems = sissueTpeNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.functionName === sItems[i]
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

  selectIndividualSLA = async (issueId, event) => {
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
    if (this.state.slaFunctionName !== null) {
      this.state.slaFunctionName.forEach(allSlaId);
      function allSlaId(item) {
        indiSla += item.functionID + ",";
      }
    }
    await this.setState({
      indiSla,
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
    if (name === "SlaBreach" && name === "ResolveTime") {
      finalEditData[i] = {
        ...finalEditData[i],
        [name]: parseFloat(value),
      };
    } else {
      finalEditData[i] = {
        ...finalEditData[i],
        [name]: value,
      };
    }

    this.setState({ finalEditData });
  };

  handleSlaTargets = (i, e) => {
    const { name, value } = e.target;
    if (value === "" || this.state.regexp.test(value)) {
      let finalData = [...this.state.finalData];
      finalData[i] = {
        ...finalData[i],
        [name]: value,
      };
      this.setState({ finalData });
    }
    if (value !== "" && name === "ResolveType") {
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

  handleGetSLAFunctionName() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreSLA/BindFunctions",
      headers: authHeader(),
      params: {
        SearchText: this.state.SearchText,
      },
    })
      .then(function(res) {
        let slaFunctionName = res.data.responseData;
        if (slaFunctionName !== null && slaFunctionName !== undefined) {
          self.setState({ slaFunctionName });
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

  handleCreate(functionName) {
    let { slaFunctionName, value } = this.state;

    let newOption = {
      functionName,
      issueTypeID: slaFunctionName.length + 1,
    };

    this.setState({
      value: newOption, // select new option
      slaFunctionName: [...slaFunctionName, newOption], // add new option to our dataset
    });
  }

  ////handle get SLA temlpate data for gir
  handleGetSLATemplateGrid() {
    let self = this;
    this.setState({ isloading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/StoreSLA/GetStoreSLA",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        self.setState({ isloading: false });

        if (data !== null) {
          self.state.sortAllData = data;
          var unique = [];
          var distinct = [];
          var sortFilterIssueType = [];
          var sortIssueType = [];

          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].functionName]) {
              distinct.push(data[i].functionName);
              unique[data[i].functionName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortFilterIssueType.push({
                functionName: distinct[i],
              });
              sortIssueType.push({
                functionName: distinct[i],
              });
            }
          }

          var unique = [];
          var distinct = [];
          var sortCreatedBy = [];
          var sortFilterCreatedBy = [];

          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].createdBy]) {
              distinct.push(data[i].createdBy);
              unique[data[i].createdBy] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortCreatedBy.push({
                createdBy: distinct[i],
              });
              sortFilterCreatedBy.push({
                createdBy: distinct[i],
              });
            }
          }

          var unique = [];
          var distinct = [];
          var sortStatus = [];
          var sortFilterStatus = [];

          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].isSLAActive]) {
              distinct.push(data[i].isSLAActive);
              unique[data[i].isSLAActive] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortStatus.push({ isSLAActive: distinct[i] });
              sortFilterStatus.push({
                isSLAActive: distinct[i],
              });
            }
          }
          self.setState({
            sortStatus,
            sortFilterCreatedBy,
            sortFilterIssueType,
            sortFilterStatus,
            sortCreatedBy,
            sortIssueType,
            sortAllData: data,
          });
        }

        if (status === "Success") {
          self.setState({ slaTemplateGrid: data });
        } else {
          self.setState({ slaTemplateGrid: [] });
        }
      })
      .catch((data) => {
        self.setState({ isloading: false });

        console.log(data);
      });
  }
  handleGetPriorityList() {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/StorePriority/GetPriorityList",
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
  handleGetDataForEditSLAById(idSLA) {
    var SLAId = idSLA || 0;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreSLA/GetStoreSLADetail",
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
          var functionId = data.functionID;
          var functionName = data.functionName;
          var brandName = data.brandName;
          var departmentName = data.departmentName;
          var storeName = data.storeName;
          var isActive = data.isSLAActive;
          var tempData = data.slaTarget;
          var tempFinalData = [];
          if (tempData.length > 0) {
            for (let i = 0; i < tempData.length; i++) {
              var tempObj = {};
              tempObj.priorityID = tempData[i].priorityID;
              tempObj.priortyName = tempData[i].priorityName;
              tempObj.SlaBreach = tempData[i].slaBreachPercent;
              tempObj.ResolveTime = tempData[i].priorityResolution;
              tempObj.ResolveType = tempData[i].priorityResolutionDuration;
              tempObj.slaTargetID = tempData[i].slaTargetID;
              tempFinalData.push(tempObj);
            }
          }
          self.setState({
            functionId,
            functionName,
            brandName,
            departmentName,
            storeName,
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
  handleCreateSlaTemplate() {
    const TranslationContext = this.state.translateLanguage.default;

    var array = this.state.finalData;
    var valid = false;
    if (array.length > 0) {
      for (var i = 0; i < array.length; i++) {
        if (
          array[i].SlaBreach !== "" ||
          // array[i].Rerspondtime !== "" ||
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
        temp.PriorityID = data[i].priorityID;
        temp.SLABreachPercent = data[i].SlaBreach;
        temp.PriorityResolutionValue = data[i].ResolveTime;
        temp.PriorityResolutionDuration = data[i].ResolveType;
        paramData.push(temp);
      }
      this.setState({ isSubmit: true });
      axios({
        method: "post",
        url: config.apiUrl + "/StoreSLA/CreateStoreSLA",
        headers: authHeader(),
        data: {
          FunctionID: commaSeperatedSla,
          SLATarget: paramData,
          isSLAActive: SlaIsActive,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          self.setState({ isSubmit: false });
          if (status === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.slaaddeddsuccessfully
                : "SLA added successfully."
            );
            self.setState({
              SlaIsActive: "true",
              SearchText: "",
              issueTypeCompulsory: "",
              slaTargetCompulsory: "",
            });
            self.handleGetSLATemplateGrid();
            self.handleGetPriorityList();
            self.selectNoSLA();
            self.selectNoAboveSLA();
          } else {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordalreadyexists
                : status
            );
          }
        })
        .catch((data) => {
          self.setState({ isSubmit: false });
          console.log(data);
        });
    } else {
      this.setState({
        issueTypeCompulsory: "Please select issuetype.",
        slaTargetCompulsory: "Required.",
        isSubmit: false,
      });
    }
  }

  handleDeleteSLA(deleteId) {
    const TranslationContext = this.state.translateLanguage.default;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreSLA/DeleteStoreSLA",
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
          self.handleGetSLATemplateGrid();
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

  fileUpload = (file) => {
    if (file.length > 0) {
      var fileName = file[0].name;
      var fileSize = formatSizeUnits(file[0].size);
      this.setState({
        fileName,
        fileSize,
        fileN: file[0],
        bulkuploadCompulsion: "",
      });
    } else {
      NotificationManager.error("File accept only csv type.");
    }
  };
  handleSearchSla = async (e) => {
    if (e.target.value.length > 3) {
      await this.setState({
        SearchText: e.target.value,
      });
      this.handleGetSLAFunctionName();
    } else {
      await this.setState({
        SearchText: "",
      });
      this.handleGetSLAFunctionName();
    }
  };
  handleClearSearchSla = async (e) => {
    await this.setState({
      SearchText: "",
    });
    document.getElementById("SlaInput").value = "";
    this.handleGetSLAFunctionName();
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
  ////handle update slaTemplateGrid details by id
  handleUpdareSLADetails() {
    const TranslationContext = this.state.translateLanguage.default;

    let self = this;
    var inputParamter = {};
    var isActiveStatus = 0;
    if (this.state.isActive === "Active") {
      isActiveStatus = 1;
    } else {
      isActiveStatus = 0;
    }

    inputParamter.SLAId = this.state.SLAId;
    inputParamter.isSLAActive = isActiveStatus;
    inputParamter.FunctionID = this.state.functionId;

    var SLATargetTempData = [];
    for (let i = 0; i < this.state.finalEditData.length > 0; i++) {
      var obj = {};
      obj.priorityID = this.state.finalEditData[i].priorityID;
      obj.priortyName = this.state.finalEditData[i].priortyName;
      obj.SLABreachPercent = this.state.finalEditData[i].SlaBreach;
      obj.PriorityResolutionValue = this.state.finalEditData[i].ResolveTime;
      obj.PriorityResolutionDuration = this.state.finalEditData[i].ResolveType;
      obj.SLATargetID = this.state.finalEditData[i].slaTargetID;
      SLATargetTempData.push(obj);
    }
    inputParamter.SLATarget = SLATargetTempData;
    this.setState({ editSaveLoading: true });

    axios({
      method: "post",
      url: config.apiUrl + "/StoreSLA/UpdateStoreSLA",
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
              : "SLA Updated Successfully."
          );
          self.handleGetSLATemplateGrid();
        } else {
          self.setState({ editSaveLoading: false, editmodel: false });
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.slanotupdated
              : "SLA Not Updated"
          );
        }
      })
      .catch((response) => {
        self.setState({ editSaveLoading: false, editmodel: false });
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.slanotupdated
            : "SLA Not Updated"
        );
        console.log(response);
      });
  }

  filteTextChange(e) {
    this.setState({ filterTxtValue: e.target.value });

    if (this.state.sortColumn === "functionName") {
      var sortFilterIssueType = matchSorter(
        this.state.sortIssueType,
        e.target.value,
        { keys: ["functionName"] }
      );
      if (sortFilterIssueType.length > 0) {
        this.setState({ sortFilterIssueType });
      } else {
        this.setState({
          sortFilterIssueType: [],
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
          sortFilterCreatedBy: [],
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
          sortFilterStatus: [],
        });
      }
    }
  }

  hanldeAddBulkUpload() {
    const TranslationContext = this.state.translateLanguage.default;

    if (this.state.fileN) {
      let self = this;
      this.setState({
        bulkuploadLoading: true,
      });
      const formData = new FormData();

      formData.append("file", this.state.fileN);

      axios({
        method: "post",
        url: config.apiUrl + "/StoreSLA/BulkUploadStoreSLA",
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
            self.handleGetSLATemplateGrid();
          } else if (status === "Record Uploaded Partially"){
            NotificationManager.error("File uploaded partially.Please check the log.");
            self.setState({
              fileName: "",
              fileSize: "",
              fileN: [],
              bulkuploadLoading: false,
            });
            self.handleGetSLATemplateGrid();
          } else {
            self.setState({
              progressValue: 0,
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
      this.setState({
        bulkuploadCompulsion: "Please select file.",
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

  handleClearSearch() {
    this.setState({
      sissueTpeNameFilterCheckbox: "",
      screatedByFilterCheckbox: "",
      sisSLAActiveFilterCheckbox: "",
      filterTxtValue: "",
      sortHeader: "",
      sortColumn: "",
      StatusModel: false,
      slaTemplateGrid: this.state.sortAllData,
      tempsla: [],
    });
  }
  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="/store/settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.setting
              : "Settings"}
          </Link>
          <span>&gt;</span>
          <Link
            to={{
              pathname: "/store/settings",
              tabName: "store-tab",
            }}
            className="header-path"
          >
            {TranslationContext !== undefined
              ? TranslationContext.link.store
              : "Store"}
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.slatemplatedepartment
              : "SLA Template-Department"}
          </Link>
        </div>
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
                style={{
                  margin: "0 25px",
                  textDecoration: "underline",
                  color: "#2561A8",
                  cursor: "pointer",
                }}
                onClick={this.handleClearSearch.bind(this)}
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
                      <span className="table-btn table-blue-btn">ALL</span>
                    </label>
                  </div>
                  {this.state.sortColumn === "functionName"
                    ? this.state.sortFilterIssueType !== null &&
                      this.state.sortFilterIssueType.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.functionName}
                            value={item.functionName}
                            checked={
                              this.state.sissueTpeNameFilterCheckbox
                                .split(",")
                                .find((word) => word === item.functionName) ||
                              false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "functionName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.functionName}>
                            <span className="table-btn table-blue-btn">
                              {item.functionName}
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
                            checked={
                              this.state.screatedByFilterCheckbox
                                .split(",")
                                .find((word) => word === item.createdBy) ||
                              false
                            }
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
                            checked={
                              this.state.sisSLAActiveFilterCheckbox
                                .split(",")
                                .find((word) => word === item.isSLAActive) ||
                              false
                            }
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
        <div className="container-fluid">
          <div className="settingtable">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height TicketSlaReact setting-table-des settings-align">
                  <ReactTable
                    data={this.state.slaTemplateGrid}
                    minRows={2}
                    columns={[
                      {
                        Header: (
                          <span
                            className={
                              this.state.sortHeader === "Function Name"
                                ? "sort-column"
                                : ""
                            }
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "functionName",
                              TranslationContext !== undefined
                                ? TranslationContext.span.functionname
                                : "Function Name"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.functionname
                              : "Function Name"}

                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ == false &&
                                this.state.sortHeader === "Function Name"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable: false,
                        accessor: "functionName",
                      },
                      {
                        Header: (
                          <span>
                            {TranslationContext !== undefined
                              ? TranslationContext.span.prioritytype
                              : "Priority Type"}
                          </span>
                        ),
                        sortable: false,
                        accessor: "slaTarget",
                        Cell: (row) => {
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
                              <span className="one-liner store-one-liner">
                                <label>{priorityName}</label>
                                {priorityName.length > 0 ? (
                                  <Popover
                                    content={
                                      <div className="general-popover created-popover sla-popover sla-popover-store">
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
                                            %SLA
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
                                              <label className="slatemp-text-1">
                                                {item.priorityName}
                                              </label>
                                              <label className="slatemp-text-1">
                                                {item.slaBreachPercent}
                                              </label>
                                              <label className="slatemp-text-1">
                                                {item.priorityResolution}{" "}
                                                {
                                                  item.priorityResolutionDuration
                                                }
                                              </label>
                                            </div>
                                          ))}
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
                            className={
                              this.state.sortHeader === "Created By"
                                ? "sort-column"
                                : ""
                            }
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

                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ == false &&
                                this.state.sortHeader === "Created By"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable: false,
                        accessor: "createdBy",
                        Cell: (row) => {
                          var ids = row.original["id"];
                          return (
                            <div>
                              <span className="one-liner store-one-liner">
                                {row.original.createdBy}
                                <Popover
                                  content={
                                    <>
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
                                            ? TranslationContext.p.updatedby
                                            : "Updated Date"}
                                          : {row.original.modifiedDate}
                                        </p>
                                      </div>
                                    </>
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
                            className={
                              this.state.sortHeader === "Status"
                                ? "sort-column"
                                : ""
                            }
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

                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ == false &&
                                this.state.sortHeader === "Status"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        accessor: "isSLAActive",
                      },
                      {
                        Header: (
                          <span>
                            {TranslationContext !== undefined
                              ? TranslationContext.span.actions
                              : "Actions"}
                          </span>
                        ),
                        accessor: "actiondept",
                        Cell: (row) => {
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
                                            : "Delete file"}
                                          ?
                                        </p>
                                        <p className="mt-1 fs-12">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p
                                                .areyousureyouwanttodeletethisfile
                                            : "Are you sure you want to delete this file"}
                                          ?
                                        </p>
                                        <div className="del-can">
                                          <a href={Demo.BLANK_LINK}>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.a.cancel
                                              : "CANCEL"}
                                          </a>
                                          <button
                                            className="butn"
                                            onClick={this.handleDeleteSLA.bind(
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
                                  />
                                </Popover>
                                <button
                                  className="react-tabel-button"
                                  id={row.original.slaid}
                                  onClick={this.handleGetDataForEditSLAById.bind(
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
                    noDataText={
                      this.state.isloading ? (
                        <Spin size="large" tip="Loading..." />
                      ) : this.state.slaTemplateGrid.length === 0 ? (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      ) : null
                    }
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="store-col-2">
                  <div className="storeSettingcreateDiv">
                    <label className="Create-store-text">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.createsla
                        : "CREATE SLA"}
                    </label>
                    <div className="divSpace">
                      <div className="dropDrownSpace issuetype-cusdrp">
                        <label className="reports-to">
                          {TranslationContext !== undefined
                            ? TranslationContext.label.functiontype
                            : "Function Type"}
                        </label>
                        <div className="dropdown">
                          <button
                            className="btn issuesladrop"
                            type="button"
                            id="issueTypeValue"
                            onClick={this.handleSlaButton}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.option.select
                              : "Select"}

                            <span className="caret"></span>
                          </button>
                          {this.state.indiSla === "" && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.issueTypeCompulsory}
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
                                  placeholder={
                                    TranslationContext !== undefined
                                      ? TranslationContext.placeholder.search
                                      : "Search"
                                  }
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
                                  {this.state.slaFunctionName !== null &&
                                    this.state.slaFunctionName.map(
                                      (item, i) => (
                                        <li key={i}>
                                          <input
                                            type="checkbox"
                                            id={"i" + item.functionID + "_" + i}
                                            name="allSla"
                                            onChange={this.selectIndividualSLA.bind(
                                              this,
                                              item.functionID
                                            )}
                                          />
                                          <label
                                            htmlFor={
                                              "i" + item.functionID + "_" + i
                                            }
                                          >
                                            {item.functionName}
                                            <div>
                                              <img
                                                src={Correct}
                                                alt="Checked"
                                              />
                                            </div>
                                          </label>
                                          <span>{item.brandName}</span>
                                          <span>{item.storeName}</span>
                                          <span>{item.departmentName}</span>
                                        </li>
                                      )
                                    )}
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

                    <div className="slatargetRow-3 ma">
                      <label className="createhead-text-new-1">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.priority
                          : "Priority"}
                      </label>
                      <label className="createhead-text-5">
                        %
                        {TranslationContext !== undefined
                          ? TranslationContext.label.sla
                          : "SLA"}
                      </label>
                      <label className="createhead-text-6">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.resolve
                          : "Resolve"}
                      </label>
                    </div>
                    {this.state.finalData !== null &&
                      this.state.finalData.map((item, i) => (
                        <div className="slatargetRow-3 ma" key={i}>
                          <div className="sla-div">
                            <label className="createhead-text-1">
                              {item.priortyName}
                            </label>
                          </div>
                          <div className="sla-div-4">
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
                                {this.state.slaTargetCompulsory}
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
                                  <option value="M">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.option.m
                                      : "M"}
                                  </option>
                                  <option value="H">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.option.h
                                      : "H"}
                                  </option>
                                  <option value="D">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.option.d
                                      : "D"}
                                  </option>
                                </select>
                              </div>
                            </div>
                            {item.ResolveTime === "" && (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.slaTargetCompulsory}
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
                        onClick={this.handleCreateSlaTemplate.bind(this)}
                        disabled={this.state.isSubmit}
                      >
                        {this.state.isSubmit ? (
                          <FontAwesomeIcon
                            className="circular-loader"
                            icon={faCircleNotch}
                            spin
                          />
                        ) : null}
                        {TranslationContext !== undefined
                          ? TranslationContext.button.add
                          : "ADD"}
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <div className="">
                  <div className="right-sect-div">
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
                        <CSVLink
                          filename={"SLA.csv"}
                          data={config.storeSlaTemplate}
                        >
                          <img src={DownExcel} alt="download icon" />
                        </CSVLink>
                      </div>
                    </div>

                    <Spin
                      tip="Please wait..."
                      spinning={this.state.bulkuploadLoading}
                    >
                      <div className="mainfileUpload">
                        <Dropzone accept=".csv" onDrop={this.fileUpload}>
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
                                ? TranslationContext.div.or
                                : "or"}
                              {TranslationContext !== undefined
                                ? TranslationContext.div.dropfilehere
                                : "Drop File here"}
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
                                        : "Delete file"}
                                      ?
                                    </p>
                                    <p className="mt-1 fs-12">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.p
                                            .areyousureyouwanttodeletethisfile
                                        : "Are you sure you want to delete this file"}
                                      ?
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
                                    ? TranslationContext.span.retry
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
                  :{" "}
                </label>
                <label className="createhead-text-1">
                  {this.state.brandName}
                </label>
              </div>
              <div className="col-md-6">
                <label className="createhead-text-new">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.StoreName
                    : "Store Name"}
                  :{" "}
                </label>
                <label className="createhead-text-1">
                  {this.state.storeName}
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label className="createhead-text-new">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.DepartmentName
                    : "Department Name"}
                  :
                </label>
                <label className="createhead-text-1">
                  {this.state.departmentName}
                </label>
              </div>
              <div className="col-md-6">
                <label className="createhead-text-new">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.FunctionName
                    : "Function Name"}
                  :
                </label>
                <label className="createhead-text-1">
                  {this.state.functionName}
                </label>
              </div>
            </div>
            <br />

            <div className="slatargetRow-3 ma">
              <label className="createhead-text-new-1">
                {TranslationContext !== undefined
                  ? TranslationContext.label.priority
                  : "Priority"}
              </label>
              <label className="createhead-text-5">
                %
                {TranslationContext !== undefined
                  ? TranslationContext.label.sla
                  : "SLA"}
              </label>
              <label className="createhead-text-6">
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

                  <div className="sla-div-4">
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
                          <option value="M">
                            {TranslationContext !== undefined
                              ? TranslationContext.option.m
                              : "M"}
                          </option>
                          <option value="H">
                            {TranslationContext !== undefined
                              ? TranslationContext.option.h
                              : "H"}
                          </option>
                          <option value="D">
                            {TranslationContext !== undefined
                              ? TranslationContext.option.d
                              : "D"}
                          </option>
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
                  value={
                    this.state.isActive === "Active" ? "Active" : "Inactive"
                  }
                  onChange={this.handleEditSlaIsActive}
                >
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
export default SlaTemplateDepartment;
