import React, { Component } from "react";
import Demo from "./../../../store/Hashtag.js";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "antd";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import Modal from "react-bootstrap/Modal";
import matchSorter from "match-sorter";
import Sorting from "./../../../assets/Images/sorting.png";
import * as translationHI from "./../../../translations/hindi";
import * as translationMA from "./../../../translations/marathi";
import {Spin,Empty} from "antd"

class StoreFileUploadLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUploadLog: [],
      sortAllData: [],
      sortFileType: [],
      sortFileName: [],
      sortCreatedDate: [],
      sortStatus: [],
      sortFilterFileType: [],
      sortFilterFileName: [],
      sortFilterCreatedDate: [],
      sortFilterStatus: [],
      sortColumn: "",
      StatusModel: false,
      sortHeader: "",
      sFilterCheckbox: "",
      filterTxtValue: "",
      tempfileUploadLog: [],
      sfileTypeFilterCheckbox: "",
      sfileNameFilterCheckbox: "",
      screatedDateFilterCheckbox: "",
      sfileUploadStatusFilterCheckbox: "",
      isATOZ: true,
      translateLanguage: {},
      isloading:false
    };

    this.handleGetFileUploadLog = this.handleGetFileUploadLog.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
  }

  componentDidMount() {
     this.handleGetFileUploadLog();

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  downloadDefaultReport = (csvFile) => {
    window.open(csvFile);
  };

  handleGetFileUploadLog() {
    let self = this;
    this.setState({isloading:true})
    axios({
      method: "post",
      url: config.apiUrl + "/StoreFile/GetStoreFileUploadLogs",
      headers: authHeader(),
    })
      .then(function(res) {
        let fileUploadLog = res.data.responseData;
        self.setState({isloading:false})
        if (fileUploadLog !== null) {
          self.state.sortAllData = fileUploadLog;
          var unique = [];
          var distinct = [];
          var sortFileType = [];
          var sortFilterFileType = [];

          for (let i = 0; i < fileUploadLog.length; i++) {
            if (!unique[fileUploadLog[i].fileType]) {
              distinct.push(fileUploadLog[i].fileType);
              unique[fileUploadLog[i].fileType] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortFileType.push({ fileType: distinct[i] });
              sortFilterFileType.push({ fileType: distinct[i] });
            }
          }

          var unique = [];
          var distinct = [];
          var sortFileName = [];
          var sortFilterFileName = [];

          for (let i = 0; i < fileUploadLog.length; i++) {
            if (!unique[fileUploadLog[i].fileName]) {
              distinct.push(fileUploadLog[i].fileName);
              unique[fileUploadLog[i].fileName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortFileName.push({ fileName: distinct[i] });
              sortFilterFileName.push({ fileName: distinct[i] });
            }
          }

          var unique = [];
          var distinct = [];
          var sortCreatedDate = [];
          var sortFilterCreatedDate = [];

          for (let i = 0; i < fileUploadLog.length; i++) {
            if (!unique[fileUploadLog[i].date]) {
              distinct.push(fileUploadLog[i].date);
              unique[fileUploadLog[i].date] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortCreatedDate.push({ createdDate: distinct[i] });
              sortFilterCreatedDate.push({ createdDate: distinct[i] });
            }
          }

          var unique = [];
          var distinct = [];
          var sortStatus = [];
          var sortFilterStatus = [];

          for (let i = 0; i < fileUploadLog.length; i++) {
            if (!unique[fileUploadLog[i].fileUploadStatus]) {
              distinct.push(fileUploadLog[i].fileUploadStatus);
              unique[fileUploadLog[i].fileUploadStatus] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortStatus.push({ fileUploadStatus: distinct[i] });
              sortFilterStatus.push({ fileUploadStatus: distinct[i] });
            }
          }
          self.setState({
            sortFilterFileType,
            sortFilterFileName,
            sortFilterCreatedDate,
            sortFilterStatus,
            sortFileType,
            sortFileName,
            sortCreatedDate,
            sortStatus,
            sortAllData: fileUploadLog,
          });
        }
        if (fileUploadLog !== null && fileUploadLog !== undefined) {
          self.setState({ fileUploadLog });
        }
      })
      .catch((data) => {
        self.setState({isloading:false})
        console.log(data);
      });
  }

  StatusOpenModel(data, header) {
    if (
      this.state.sortFilterFileType.length === 0 ||
      this.state.sortFilterFileName.length === 0 ||
      this.state.sortFilterCreatedDate.length === 0 ||
      this.state.sortFilterStatus.length === 0
    ) {
      return false;
    }

    if (data === "fileType") {
      if (
        this.state.sfileNameFilterCheckbox !== "" ||
        this.state.screatedDateFilterCheckbox !== "" ||
        this.state.sfileUploadStatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sfileNameFilterCheckbox: "",
          screatedDateFilterCheckbox: "",
          sfileUploadStatusFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "fileName") {
      if (
        this.state.sfileTypeFilterCheckbox !== "" ||
        this.state.screatedDateFilterCheckbox !== "" ||
        this.state.sfileUploadStatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sfileTypeFilterCheckbox: "",
          screatedDateFilterCheckbox: "",
          sfileUploadStatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "createdDate") {
      if (
        this.state.sfileTypeFilterCheckbox !== "" ||
        this.state.sfileNameFilterCheckbox !== "" ||
        this.state.sfileUploadStatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sfileTypeFilterCheckbox: "",
          sfileNameFilterCheckbox: "",
          sfileUploadStatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "fileUploadStatus") {
      if (
        this.state.sfileTypeFilterCheckbox !== "" ||
        this.state.sfileNameFilterCheckbox !== "" ||
        this.state.screatedDateFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sfileTypeFilterCheckbox: "",
          sfileNameFilterCheckbox: "",
          screatedDateFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }
  StatusCloseModel() {
    if (this.state.tempfileUploadLog.length > 0) {
      this.setState({
        StatusModel: false,
        fileUploadLog: this.state.tempfileUploadLog,
        sFilterCheckbox: "",
        filterTxtValue: "",
      });
      if (this.state.sortColumn === "fileType") {
        if (this.state.sfileTypeFilterCheckbox === "") {
        } else {
          this.setState({
            sfileNameFilterCheckbox: "",
            screatedDateFilterCheckbox: "",
            sfileUploadStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "fileName") {
        if (this.state.sfileNameFilterCheckbox === "") {
        } else {
          this.setState({
            sfileTypeFilterCheckbox: "",
            screatedDateFilterCheckbox: "",
            sfileUploadStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "createdDate") {
        if (this.state.screatedDateFilterCheckbox === "") {
        } else {
          this.setState({
            sfileTypeFilterCheckbox: "",
            sfileNameFilterCheckbox: "",
            sfileUploadStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "fileUploadStatus") {
        if (this.state.sfileUploadStatusFilterCheckbox === "") {
        } else {
          this.setState({
            sfileTypeFilterCheckbox: "",
            sfileNameFilterCheckbox: "",
            screatedDateFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        fileUploadLog: this.state.sortAllData,
        sFilterCheckbox: "",
        filterTxtValue: "",
      });
    }
  }

  filteTextChange(e) {
    this.setState({ filterTxtValue: e.target.value });
    if (this.state.sortColumn === "fileType") {
      var sortFilterFileType = matchSorter(
        this.state.sortFileType,
        e.target.value,
        {
          keys: ["fileType"],
        }
      );
      if (sortFilterFileType.length > 0) {
        this.setState({ sortFilterFileType });
      } else {
        this.setState({
          sortFilterFileType: [],
        });
      }
    }
    if (this.state.sortColumn === "fileName") {
      var sortFilterFileName = matchSorter(
        this.state.sortFileName,
        e.target.value,
        {
          keys: ["fileName"],
        }
      );
      if (sortFilterFileName.length > 0) {
        this.setState({ sortFilterFileName });
      } else {
        this.setState({
          sortFilterFileName: [],
        });
      }
    }
    if (this.state.sortColumn === "createdDate") {
      var sortFilterCreatedDate = matchSorter(
        this.state.sortCreatedDate,
        e.target.value,
        { keys: ["createdDate"] }
      );
      if (sortFilterCreatedDate.length > 0) {
        this.setState({ sortFilterCreatedDate });
      } else {
        this.setState({
          sortFilterCreatedDate: [],
        });
      }
    }
    if (this.state.sortColumn === "fileUploadStatus") {
      var sortFilterStatus = matchSorter(
        this.state.sortStatus,
        e.target.value,
        { keys: ["fileUploadStatus"] }
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
  sortStatusAtoZ() {
    var itemsArray = [];
    itemsArray = this.state.fileUploadLog;

    if (this.state.sortColumn === "fileType") {
      itemsArray.sort(function(a, b) {
        if (a.fileType.toLowerCase() < b.fileType.toLowerCase()) return -1;
        if (a.fileType.toLowerCase() > b.fileType.toLowerCase()) return 1;
        return 0;
      });
    }

    if (this.state.sortColumn === "fileName") {
      itemsArray.sort(function(a, b) {
        if (a.fileName.toLowerCase() < b.fileName.toLowerCase()) return -1;
        if (a.fileName.toLowerCase() > b.fileName.toLowerCase()) return 1;
        return 0;
      });
    }

    if (this.state.sortColumn === "createdDate") {
      itemsArray.sort(function(a, b) {
        if (a.date < b.date) return -1;
        if (a.date > b.date) return 1;
        return 0;
      });
    }

    if (this.state.sortColumn === "fileUploadStatus") {
      itemsArray.sort(function(a, b) {
        if (a.fileUploadStatus.toLowerCase() < b.fileUploadStatus.toLowerCase())
          return -1;
        if (a.fileUploadStatus.toLowerCase() > b.fileUploadStatus.toLowerCase())
          return 1;
        return 0;
      });
    }

    this.setState({
      isATOZ: true,
      fileUploadLog: itemsArray,
    });
    this.StatusCloseModel();
  }
  sortStatusZtoA() {
    var itemsArray = [];
    itemsArray = this.state.fileUploadLog;
    if (this.state.sortColumn === "fileType") {
      itemsArray.sort(function(a, b) {
        if (a.fileType.toLowerCase() < b.fileType.toLowerCase()) return 1;
        if (a.fileType.toLowerCase() > b.fileType.toLowerCase()) return -1;
        return 0;
      });
    }

    if (this.state.sortColumn === "fileName") {
      itemsArray.sort(function(a, b) {
        if (a.fileName.toLowerCase() < b.fileName.toLowerCase()) return 1;
        if (a.fileName.toLowerCase() > b.fileName.toLowerCase()) return -1;
        return 0;
      });
    }

    if (this.state.sortColumn === "createdDate") {
      itemsArray.sort(function(a, b) {
        if (a.date < b.date) return 1;
        if (a.date > b.date) return -1;
        return 0;
      });
    }

    if (this.state.sortColumn === "fileUploadStatus") {
      itemsArray.sort(function(a, b) {
        if (a.fileUploadStatus.toLowerCase() < b.fileUploadStatus.toLowerCase())
          return 1;
        if (a.fileUploadStatus.toLowerCase() > b.fileUploadStatus.toLowerCase())
          return -1;
        return 0;
      });
    }
    this.setState({
      isATOZ: false,
      fileUploadLog: itemsArray,
    });
    this.StatusCloseModel();
  }

  setSortCheckStatus = (column, type, e) => {
    var itemsArray = [];

    var sfileTypeFilterCheckbox = this.state.sfileTypeFilterCheckbox;
    var sfileNameFilterCheckbox = this.state.sfileNameFilterCheckbox;
    var screatedDateFilterCheckbox = this.state.screatedDateFilterCheckbox;
    var sfileUploadStatusFilterCheckbox = this.state
      .sfileUploadStatusFilterCheckbox;
    if (column === "fileType" || column === "all") {
      if (type === "value" && type !== "All") {
        sfileTypeFilterCheckbox = sfileTypeFilterCheckbox.replace("all", "");
        sfileTypeFilterCheckbox = sfileTypeFilterCheckbox.replace("all,", "");
        if (
          sfileTypeFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sfileTypeFilterCheckbox = sfileTypeFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sfileTypeFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sfileTypeFilterCheckbox.includes("all")) {
          sfileTypeFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "fileType") {
            for (let i = 0; i < this.state.sortFileType.length; i++) {
              sfileTypeFilterCheckbox +=
                this.state.sortFileType[i].fileType + ",";
            }
            sfileTypeFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "fileName" || column === "all") {
      if (type === "value" && type !== "All") {
        sfileNameFilterCheckbox = sfileNameFilterCheckbox.replace("all", "");
        sfileNameFilterCheckbox = sfileNameFilterCheckbox.replace("all,", "");
        if (
          sfileNameFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sfileNameFilterCheckbox = sfileNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sfileNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sfileNameFilterCheckbox.includes("all")) {
          sfileNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "fileName") {
            for (let i = 0; i < this.state.sortFileName.length; i++) {
              sfileNameFilterCheckbox +=
                this.state.sortFileName[i].fileName + ",";
            }
            sfileNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "createdDate" || column === "all") {
      if (type === "value" && type !== "All") {
        screatedDateFilterCheckbox = screatedDateFilterCheckbox.replace(
          "all",
          ""
        );
        screatedDateFilterCheckbox = screatedDateFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          screatedDateFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          screatedDateFilterCheckbox = screatedDateFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          screatedDateFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (screatedDateFilterCheckbox.includes("all")) {
          screatedDateFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "createdDate") {
            for (let i = 0; i < this.state.sortCreatedDate.length; i++) {
              screatedDateFilterCheckbox +=
                this.state.sortCreatedDate[i].createdDate + ",";
            }
            screatedDateFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "fileUploadStatus" || column === "all") {
      if (type === "value" && type !== "All") {
        sfileUploadStatusFilterCheckbox = sfileUploadStatusFilterCheckbox.replace(
          "all",
          ""
        );
        sfileUploadStatusFilterCheckbox = sfileUploadStatusFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          sfileUploadStatusFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sfileUploadStatusFilterCheckbox = sfileUploadStatusFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sfileUploadStatusFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sfileUploadStatusFilterCheckbox.includes("all")) {
          sfileUploadStatusFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "fileUploadStatus") {
            for (let i = 0; i < this.state.sortStatus.length; i++) {
              sfileUploadStatusFilterCheckbox +=
                this.state.sortStatus[i].fileUploadStatus + ",";
            }
            sfileUploadStatusFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      sfileTypeFilterCheckbox,
      sfileNameFilterCheckbox,
      screatedDateFilterCheckbox,
      sfileUploadStatusFilterCheckbox,
      issueColor: "",
      nameColor: "",
      createdColor: "",
      statusColor: "",
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "fileType") {
      var sItems = sfileTypeFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.fileType === sItems[i]
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
    } else if (column === "fileName") {
      var sItems = sfileNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.fileName === sItems[i]
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
    } else if (column === "createdDate") {
      var sItems = screatedDateFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter((a) => a.date === sItems[i]);
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
    } else if (column === "fileUploadStatus") {
      var sItems = sfileUploadStatusFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.fileUploadStatus === sItems[i]
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
      tempfileUploadLog: itemsArray,
    });
  };
  handleClearSearch() {
    this.setState({
      screatedDateFilterCheckbox: "",
      sfileNameFilterCheckbox: "",
      sfileTypeFilterCheckbox: "",
      sfileUploadStatusFilterCheckbox: "",
      filterTxtValue: "",
      sortHeader: "",
      sortColumn: "",
      StatusModel: false,
      fileUploadLog: this.state.sortAllData,
      tempfileUploadLog: [],
    });
  }

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <div className="mainDivPadding">
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
              ? TranslationContext.link.fileuploadlogs
              : "File Upload Logs"}
          </Link>
        </div>
        <div className="position-relative d-inline-block">
          <Modal
            show={this.state.StatusModel}
            onHide={this.StatusCloseModel.bind(this)}
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
                href="#!"
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
                        this.state.sfileTypeFilterCheckbox.includes("all") ||
                        this.state.sfileNameFilterCheckbox.includes("all") ||
                        this.state.screatedDateFilterCheckbox.includes("all") ||
                        this.state.sfileUploadStatusFilterCheckbox.includes(
                          "all"
                        )
                      }
                      onChange={this.setSortCheckStatus.bind(this, "all")}
                    />
                    <label htmlFor={"fil-open"}>
                      <span className="table-btn table-blue-btn">ALL</span>
                    </label>
                  </div>
                  {this.state.sortColumn === "fileType"
                    ? this.state.sortFilterFileType !== null &&
                      this.state.sortFilterFileType.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.fileType}
                            value={item.fileType}
                            checked={
                              this.state.sfileTypeFilterCheckbox
                                .split(",")
                                .find((word) => word === item.fileType) || false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "fileType",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.fileType}>
                            <span className="table-btn table-blue-btn">
                              {item.fileType}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "fileName"
                    ? this.state.sortFilterFileName !== null &&
                      this.state.sortFilterFileName.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.fileName}
                            value={item.fileName}
                            checked={
                              this.state.sfileNameFilterCheckbox
                                .split(",")
                                .find((word) => word === item.fileName) || false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "fileName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.fileName}>
                            <span className="table-btn table-blue-btn">
                              {item.fileName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "createdDate"
                    ? this.state.sortFilterCreatedDate !== null &&
                      this.state.sortFilterCreatedDate.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.createdDate}
                            value={item.createdDate}
                            checked={
                              this.state.screatedDateFilterCheckbox
                                .split(",")
                                .find((word) => word === item.createdDate) ||
                              false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "createdDate",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.createdDate}>
                            <span className="table-btn table-blue-btn">
                              {item.createdDate}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "fileUploadStatus"
                    ? this.state.sortFilterStatus !== null &&
                      this.state.sortFilterStatus.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.fileUploadStatus}
                            value={item.fileUploadStatus}
                            checked={
                              this.state.sfileUploadStatusFilterCheckbox
                                .split(",")
                                .find(
                                  (word) => word === item.fileUploadStatus
                                ) || false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "fileUploadStatus",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.fileUploadStatus}>
                            <span className="table-btn table-blue-btn">
                              {item.fileUploadStatus}
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
        <div className="fileUploadTable TicketFileUploadReact settingtable setting-table-des settings-align">
          <ReactTable
            minRows={2}
            data={this.state.fileUploadLog}
            columns={[
              {
                Header: (
                  <span
                    className={this.state.sortHeader === "Type" ? "sort-column" : ""}
                    onClick={this.StatusOpenModel.bind(
                      this,
                      "fileType",
                      TranslationContext !== undefined
                        ? TranslationContext.span.type
                        : "Type"
                    )}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.span.type
                      : "Type"}
        
                    <FontAwesomeIcon
                      icon={
                        this.state.isATOZ === false && this.state.sortHeader === "Type"
                          ? faCaretUp
                          : faCaretDown
                      }
                    />
                  </span>
                ),
                sortable: false,
                accessor: "fileType",
              },
              {
                Header: (
                  <span
                    className={this.state.sortHeader === "Name" ? "sort-column" : ""}
                    onClick={this.StatusOpenModel.bind(
                      this,
                      "fileName",
                      TranslationContext !== undefined
                        ? TranslationContext.span.name
                        : "Name"
                    )}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.span.filename
                      : "File Name"}
        
                    <FontAwesomeIcon
                      icon={
                        this.state.isATOZ === false && this.state.sortHeader === "Name"
                          ? faCaretUp
                          : faCaretDown
                      }
                    />
                  </span>
                ),
                sortable: false,
                accessor: "fileName",
              },
              {
                Header: (
                  <span
                    className={this.state.sortHeader === "Date" ? "sort-column" : ""}
                    onClick={this.StatusOpenModel.bind(
                      this,
                      "createdDate",
                      TranslationContext !== undefined
                        ? TranslationContext.span.date
                        : "Date"
                    )}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.span.date
                      : "Date"}
        
                    <FontAwesomeIcon
                      icon={
                        this.state.isATOZ === false && this.state.sortHeader === "Date"
                          ? faCaretUp
                          : faCaretDown
                      }
                    />
                  </span>
                ),
                sortable: false,
                accessor: "date",
                Cell: (row) => {
                  var ids = row.original["id"];
                  return (
                    <div>
                      <span>
                        {row.original.date}
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
                                    ? TranslationContext.p.updateddate
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
                    className={this.state.sortHeader === "Status" ? "sort-column" : ""}
                    onClick={this.StatusOpenModel.bind(
                      this,
                      "fileUploadStatus",
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
                accessor: "fileUploadStatus",
              },
              {
                Header: (
                  <span>
                    {TranslationContext !== undefined
                      ? TranslationContext.span.errorfile
                      : "Error File"}
                  </span>
                ),
                accessor: "Erroor",
                Cell: (row) =>
                  row.original.fileUploadStatus === "Completed" &&
                  row.original.errorFilePath && (
                    <div>
                      <button
                        className="downloadBtn"
                        onClick={this.downloadDefaultReport.bind(
                          this,
                          row.original.errorFilePath
                        )}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.button.download
                          : "DOWNLOAD"}
                      </button>
                    </div>
                  ),
              },
              {
                Header: (
                  <span>
                    {TranslationContext !== undefined
                      ? TranslationContext.span.successfile
                      : "Success File"}
                  </span>
                ),
                accessor: "success",
                Cell: (row) =>
                  row.original.fileUploadStatus === "Completed" &&
                  row.original.successFilePath && (
                    <div>
                      <button
                        className="downloadBtn"
                        onClick={this.downloadDefaultReport.bind(
                          this,
                          row.original.successFilePath
                        )}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.button.download
                          : "DOWNLOAD"}
                      </button>
                    </div>
                  ),
              },
            ]}
            resizable={false}
            defaultPageSize={5}
            showPagination={true}
            noDataText={
              this.state.isloading ? (
                <Spin size="large" tip="Loading..." />
              ) : this.state.fileUploadLog.length === 0 ? (
                <Empty style={{margin:"0"}}image={Empty.PRESENTED_IMAGE_SIMPLE} />
              ) : null
            }
          />
        </div>
      </div>
    );
  }
}

export default StoreFileUploadLogs;
