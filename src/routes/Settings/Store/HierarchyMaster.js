import React, { Component, useState } from "react";
import Demo from "./../../../store/Hashtag.js";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import Modal from "react-responsive-modal";
import Sorting from "./../../../assets/Images/sorting.png";
import DownExcel from "./../../../assets/Images/csv.png";
import { ProgressBar } from "react-bootstrap";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import ActiveStatus from "../../activeStatus";
import { Link } from "react-router-dom";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import { Popover, Spin, Empty } from "antd";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import ReactTable from "react-table";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { CSVLink } from "react-csv";
import config from "../../../helpers/config";
import Dropzone from "react-dropzone";
import matchSorter from "match-sorter";
import { formatSizeUnits } from "./../../../helpers/CommanFuncation";
import { NotificationManager } from "react-notifications";
import axios from "axios";
import { authHeader } from "./../../../helpers/authHeader";
import * as translationHI from "./../../../translations/hindi";
import * as translationMA from "./../../../translations/marathi";

const MyButton = (props) => {
  const { children } = props;
  return (
    <div style={{ cursor: "pointer" }} {...props}>
      <button className="react-tabel-button" id="p-edit-pop-2">
        <label className="Table-action-edit-button-text">{children}</label>
      </button>
    </div>
  );
};

const Content = (props) => {
  const { rowData } = props;
  const [designationName, setDesignationvalue] = useState(
    rowData.designationName
  );
  const [reportTo, setreportToValue] = useState(rowData.reportToDesignation);
  const [status, setStatusValue] = useState(rowData.status);
  const [designationID] = useState(rowData.designationID);

  const TranslationContext = props.translateLanguage.default;
  props.callBackEdit(designationName, reportTo, status, designationID);
  return (
    <div className="edtpadding">
      <label className="popover-header-text">
        {TranslationContext !== undefined
          ? TranslationContext.label.edithierarchy
          : "EDIT HIERARCHY"}
      </label>
      <div className="pop-over-div">
        <label className="edit-label-1">
          {TranslationContext !== undefined
            ? TranslationContext.label.DesignationName
            : "Designation Name"}
        </label>
        <input
          type="text"
          className="txt-edit-popover"
          placeholder={
            TranslationContext !== undefined
              ? TranslationContext.placeholder.EnterDesignationName
              : "Enter Designation Name"
          }
          maxLength={25}
          name="designation_Name"
          value={designationName}
          onChange={(e) => setDesignationvalue(e.target.value)}
        />
        {designationName === "" && (
          <p style={{ color: "red", marginBottom: "0px" }}>
            {props.editdesignationNameCompulsion}
          </p>
        )}
      </div>
      <div className="pop-over-div">
        <label className="edit-label-1">
          {TranslationContext !== undefined
            ? TranslationContext.label.ReportTo
            : "Report To"}
        </label>
        <select
          className="edit-dropDwon dropdown-setting"
          name="report_To"
          value={reportTo}
          onChange={(e) => setreportToValue(e.target.value)}
        >
          <option>
            {TranslationContext !== undefined
              ? TranslationContext.option.select
              : "select"}
          </option>
          <option value={0}>
            {TranslationContext !== undefined
              ? TranslationContext.option.root
              : "Root"}
          </option>
          {props.reportToData !== null &&
            props.reportToData.map((item, i) => (
              <option key={i} value={item.designationID}>
                {item.designationName}
              </option>
            ))}
        </select>
        {reportTo === "select" && (
          <p style={{ color: "red", marginBottom: "0px" }}>
            {props.editreportToCompulsion}
          </p>
        )}
      </div>
      <div className="pop-over-div">
        <label className="edit-label-1">
          {TranslationContext !== undefined
            ? TranslationContext.label.status
            : "Status"}
        </label>
        <select
          className="edit-dropDwon dropdown-setting"
          name="designation_status"
          value={status}
          onChange={(e) => setStatusValue(e.target.value)}
        >
          <option>
            {TranslationContext !== undefined
              ? TranslationContext.option.select
              : "select"}
          </option>
          {props.activeData !== null &&
            props.activeData.map((item, j) => (
              <option key={j} value={item.ActiveID}>
                {item.ActiveName}
              </option>
            ))}
        </select>
        {status === "select" && (
          <p style={{ color: "red", marginBottom: "0px" }}>
            {props.editstatusCompulsion}
          </p>
        )}
      </div>
      <br />
      <div>
        <a className="pop-over-cancle canblue" href={Demo.BLANK_LINK}>
          {TranslationContext !== undefined
            ? TranslationContext.a.cancel
            : "CANCEL"}
        </a>
        <button
          className="pop-over-button"
          onClick={(e) => {
            props.handleUpdateHierarchyData(e, designationID);
          }}
          disabled={props.editSaveLoading}
        >
          <label className="pop-over-btnsave-text">
            {props.editSaveLoading ? (
              <FontAwesomeIcon
                className="circular-loader"
                icon={faCircleNotch}
                spin
              />
            ) : (
              ""
            )}
            {TranslationContext !== undefined
              ? TranslationContext.label.save
              : "SAVE"}
          </label>
        </button>
      </div>
    </div>
  );
};

class HierarchyMaster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      StatusModel: false,
      designation_name: "",
      selectReportTo: 0,
      selectStatus: 0,
      hierarchyData: [],
      reportToData: [],
      activeData: ActiveStatus(),
      hierarchyEditData: {},
      designationNameCompulsion: "",
      reportToCompulsion: "",
      statusCompulsion: "",
      editdesignationNameCompulsion: "Designation Name field is compulsory.",
      editreportToCompulsion: "ReportTo field is compulsory.",
      editstatusCompulsion: "Status field is compulsory.",
      sortAllData: [],
      sortDesignation: [],
      sortReportTo: [],
      sortCreatedBy: [],
      sortStatus: [],
      sortColumn: "",
      sortHeader: "",
      designationColor: "",
      reportToColor: "",
      createdColor: "",
      statusColor: "",
      updateDesignation: "",
      updateReprtTo: "",
      updateStatus: "",
      rowData: {},
      editSaveLoading: false,
      addSaveLoading: false,
      fileName: "",
      fileN: [],
      bulkuploadCompulsion: "",
      sortFilterDesignation: [],
      sortFilterReportTo: [],
      sortFilterCreatedBy: [],
      sortFilterStatus: [],
      sFilterCheckbox: "",
      filterTxtValue: "",
      isFileUploadFail: false,
      progressValue: 0,
      fileSize: "",
      showProgress: false,
      sdesignationNameFilterCheckbox: "",
      sreportToFilterCheckbox: "",
      screatedbypersonFilterCheckbox: "",
      sstatusFilterCheckbox: "",
      file: {},
      fileValidation: "",
      isErrorBulkUpload: false,
      isShowProgress: false,
      temphierarchyData: [],
      isortA: false,
      isATOZ: true,
      translateLanguage: {},
      bulkuploadLoading: false,
      isloading: false,
    };

    this.togglePopover = this.togglePopover.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.hanldeGetReportListDropDown = this.hanldeGetReportListDropDown.bind(
      this
    );
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
  }

  componentDidMount() {
    this.handleGetItem();
    this.hanldeGetReportListDropDown();

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  StatusCloseModel() {
    this.setState({
      sortFilterCreatedBy: this.state.sortCreatedBy,
      sortFilterDesignation: this.state.sortDesignation,
      sortFilterReportTo: this.state.sortReportTo,
      sortFilterStatus: this.state.sortStatus,
    });

    if (this.state.temphierarchyData.length > 0) {
      this.setState({
        StatusModel: false,
        hierarchyData: this.state.temphierarchyData,
        filterTxtValue: "",
      });
      if (this.state.sortColumn === "designationName") {
        if (this.state.sdesignationNameFilterCheckbox === "") {
        } else {
          this.setState({
            sreportToFilterCheckbox: "",
            screatedbypersonFilterCheckbox: "",
            sstatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "reportTo") {
        if (this.state.sreportToFilterCheckbox === "") {
        } else {
          this.setState({
            sdesignationNameFilterCheckbox: "",
            screatedbypersonFilterCheckbox: "",
            sstatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "createdbyperson") {
        if (this.state.screatedbypersonFilterCheckbox === "") {
        } else {
          this.setState({
            sdesignationNameFilterCheckbox: "",
            sreportToFilterCheckbox: "",
            sstatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "status") {
        if (this.state.sstatusFilterCheckbox === "") {
        } else {
          this.setState({
            sdesignationNameFilterCheckbox: "",
            sreportToFilterCheckbox: "",
            screatedbypersonFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        hierarchyData: this.state.sortAllData,
        filterTxtValue: "",

        hierarchyData: this.state.isortA
          ? this.state.itemData
          : this.state.sortAllData,
        sortFilterDesignation: this.state.sortDesignation,
        sortFilterReportTo: this.state.sortReportTo,
        sortFilterCreatedBy: this.state.sortCreatedBy,
        sortFilterStatus: this.state.sortStatus,
      });
    }
  }
  updateUploadProgress(value) {
    this.setState({ progressValue: value });
  }

  handleBulkUpload() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    if (this.state.fileName) {
      this.setState({
        bulkuploadLoading: true,
      });
      const formData = new FormData();
      formData.append("file", this.state.file);

      axios({
        method: "post",
        url: config.apiUrl + "/StoreHierarchy/BulkUploadStoreHierarchy",
        headers: authHeader(),
        data: formData,
      })
        .then((response) => {
          var status = response.data.message;

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
            self.handleGetItem();
            self.setState({ isErrorBulkUpload: false, isShowProgress: false });
          } else if (status === "Record Uploaded Partially") {
            NotificationManager.error(
              "File uploaded partially.Please check the log."
            );
            self.setState({
              fileName: "",
              fileSize: "",
              fileN: [],
              bulkuploadLoading: false,
            });
            self.handleGetItem();
            self.setState({ isErrorBulkUpload: false, isShowProgress: false });
          } else {
            self.setState({ isShowProgress: false, bulkuploadLoading: false });
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.filenotuploaded
                : "File not uploaded."
            );
          }
        })
        .catch((response) => {
          self.setState({ isErrorBulkUpload: true, bulkuploadLoading: false });
          console.log(response);
        });
    } else {
      this.setState({ fileValidation: "Please Select File." });
    }
  }

  sortStatusAtoZ() {
    var itemsArray = [];
    itemsArray = this.state.hierarchyData;

    if (this.state.sortColumn === "designationName") {
      itemsArray.sort((a, b) => {
        if (a.designationName.toLowerCase() < b.designationName.toLowerCase())
          return -1;
        if (a.designationName.toLowerCase() > b.designationName.toLowerCase())
          return 1;
        return 0;
      });
    }

    if (this.state.sortColumn === "reportTo") {
      itemsArray.sort((a, b) => {
        if (a.reportTo.toLowerCase() < b.reportTo.toLowerCase()) return -1;
        if (a.reportTo.toLowerCase() > b.reportTo.toLowerCase()) return 1;
        return 0;
      });
    }

    if (this.state.sortColumn === "createdbyperson") {
      itemsArray.sort((a, b) => {
        if (a.createdbyperson.toLowerCase() < b.createdbyperson.toLowerCase())
          return -1;
        if (a.createdbyperson.toLowerCase() > b.createdbyperson.toLowerCase())
          return 1;
        return 0;
      });
    }

    if (this.state.sortColumn === "status") {
      itemsArray.sort((a, b) => {
        if (a.status.toLowerCase() < b.status.toLowerCase()) return -1;
        if (a.status.toLowerCase() > b.status.toLowerCase()) return 1;
        return 0;
      });
    }

    this.setState({
      isATOZ: true,
      hierarchyData: itemsArray,
    });
    this.StatusCloseModel();
  }
  sortStatusZtoA() {
    var itemsArray = [];
    var itemsArray1 = [];
    itemsArray1 = this.state.hierarchyData;
    if (this.state.sortColumn === "designationName") {
      itemsArray = itemsArray1.sort((a, b) => {
        if (a.designationName.toLowerCase() < b.designationName.toLowerCase())
          return 1;
        if (a.designationName.toLowerCase() > b.designationName.toLowerCase())
          return -1;
        return 0;
      });
    }

    if (this.state.sortColumn === "reportTo") {
      itemsArray = itemsArray1.sort((a, b) => {
        if (a.reportTo.toLowerCase() < b.reportTo.toLowerCase()) return 1;
        if (a.reportTo.toLowerCase() > b.reportTo.toLowerCase()) return -1;
        return 0;
      });
    }

    if (this.state.sortColumn === "createdbyperson") {
      itemsArray = itemsArray1.sort((a, b) => {
        if (a.createdbyperson.toLowerCase() < b.createdbyperson.toLowerCase())
          return 1;
        if (a.createdbyperson.toLowerCase() > b.createdbyperson.toLowerCase())
          return -1;
        return 0;
      });
    }

    if (this.state.sortColumn === "status") {
      itemsArray = itemsArray1.sort((a, b) => {
        if (a.status.toLowerCase() < b.status.toLowerCase()) return 1;
        if (a.status.toLowerCase() > b.status.toLowerCase()) return -1;
        return 0;
      });
    }

    this.setState({
      isATOZ: false,
      hierarchyData: itemsArray,
    });
    this.StatusCloseModel();
  }
  setSortCheckStatus = (column, type, e) => {
    var itemsArray = [];

    var sdesignationNameFilterCheckbox = this.state
      .sdesignationNameFilterCheckbox;
    var sreportToFilterCheckbox = this.state.sreportToFilterCheckbox;
    var screatedbypersonFilterCheckbox = this.state
      .screatedbypersonFilterCheckbox;
    var sstatusFilterCheckbox = this.state.sstatusFilterCheckbox;

    if (column === "designationName" || column === "all") {
      if (type === "value" && type !== "All") {
        sdesignationNameFilterCheckbox = sdesignationNameFilterCheckbox.replace(
          "all",
          ""
        );
        sdesignationNameFilterCheckbox = sdesignationNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          sdesignationNameFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sdesignationNameFilterCheckbox = sdesignationNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sdesignationNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sdesignationNameFilterCheckbox.includes("all")) {
          sdesignationNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "designationName") {
            for (let i = 0; i < this.state.sortDesignation.length; i++) {
              sdesignationNameFilterCheckbox +=
                this.state.sortDesignation[i].designationName + ",";
            }
            sdesignationNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "reportTo" || column === "all") {
      if (type === "value" && type !== "All") {
        sreportToFilterCheckbox = sreportToFilterCheckbox.replace("all", "");
        sreportToFilterCheckbox = sreportToFilterCheckbox.replace("all,", "");
        if (
          sreportToFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sreportToFilterCheckbox = sreportToFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sreportToFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sreportToFilterCheckbox.includes("all")) {
          sreportToFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "reportTo") {
            for (let i = 0; i < this.state.sortReportTo.length; i++) {
              sreportToFilterCheckbox +=
                this.state.sortReportTo[i].reportTo + ",";
            }
            sreportToFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "createdbyperson" || column === "all") {
      if (type === "value" && type !== "All") {
        screatedbypersonFilterCheckbox = screatedbypersonFilterCheckbox.replace(
          "all",
          ""
        );
        screatedbypersonFilterCheckbox = screatedbypersonFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          screatedbypersonFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          screatedbypersonFilterCheckbox = screatedbypersonFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          screatedbypersonFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (screatedbypersonFilterCheckbox.includes("all")) {
          screatedbypersonFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "createdbyperson") {
            for (let i = 0; i < this.state.sortCreatedBy.length; i++) {
              screatedbypersonFilterCheckbox +=
                this.state.sortCreatedBy[i].createdbyperson + ",";
            }
            screatedbypersonFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "status" || column === "all") {
      if (type === "value" && type !== "All") {
        sstatusFilterCheckbox = sstatusFilterCheckbox.replace("all", "");
        sstatusFilterCheckbox = sstatusFilterCheckbox.replace("all,", "");
        if (
          sstatusFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sstatusFilterCheckbox = sstatusFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sstatusFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sstatusFilterCheckbox.includes("all")) {
          sstatusFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "status") {
            for (let i = 0; i < this.state.sortStatus.length; i++) {
              sstatusFilterCheckbox += this.state.sortStatus[i].status + ",";
            }
            sstatusFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      designationColor: "",
      reportToColor: "",
      createdColor: "",
      statusColor: "",
      sdesignationNameFilterCheckbox,
      sreportToFilterCheckbox,
      screatedbypersonFilterCheckbox,
      sstatusFilterCheckbox,
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "designationName") {
      var sItems = sdesignationNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.designationName === sItems[i]
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
        [e.target.name]: true,
      });
    } else if (column === "reportTo") {
      var sItems = sreportToFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.reportTo === sItems[i]
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
        reportToColor: "sort-column",
      });
    } else if (column === "createdbyperson") {
      var sItems = screatedbypersonFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.createdbyperson === sItems[i]
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
    } else if (column === "status") {
      var sItems = sstatusFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter((a) => a.status === sItems[i]);
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
      temphierarchyData: itemsArray,
    });
  };

  handleOnChangeHierarchyData = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleOnReportToChange = (e) => {
    let value = e.target.value;
    this.setState({ selectReportTo: value });
  };

  handleStatusChange = (e) => {
    let value = e.target.value;
    this.setState({ selectStatus: value });
  };

  fileUpload = (file) => {
    if (file.length > 0) {
      var fileName = file[0].name;
      var fileSize = formatSizeUnits(file[0].size);
      this.setState({
        fileName,
        fileSize,
        file: file[0],
        fileValidation: "",
      });
    } else {
      NotificationManager.error("File accept only csv type.");
    }
  };

  hanldeGetReportListDropDown() {
    axios({
      method: "post",
      url: config.apiUrl + "/StoreHierarchy/GetStoreDesignationList",
      headers: authHeader(),
    })
      .then((response) => {
        let status = response.data.message;
        let data = response.data.responseData;
        if (status === "Success") {
          this.setState({
            reportToData: data,
          });
        } else {
          this.setState({
            reportToData: [],
          });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  callBackEdit = (designationName, reportTo, status, rowData) => {
    this.state.updateDesignation = designationName;
    this.state.updateReprtTo = reportTo;
    this.state.updateStatus = status;
    this.state.rowData = rowData;
  };

  togglePopover() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  show(e, id) {
    if (document.getElementById(id))
      document.getElementById(
        id
      ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
        "block";
  }

  hide(e, id) {
    document.getElementById(
      id
    ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
      "none";
  }

  filteTextChange(e) {
    this.setState({ filterTxtValue: e.target.value });

    if (this.state.sortColumn === "designationName") {
      var sortFilterDesignation = matchSorter(
        this.state.sortDesignation,
        e.target.value,
        { keys: ["designationName"] }
      );
      if (sortFilterDesignation.length > 0) {
        this.setState({ sortFilterDesignation });
      } else {
        this.setState({
          sortFilterDesignation: [],
        });
      }
    }
    if (this.state.sortColumn === "reportTo") {
      var sortFilterReportTo = matchSorter(
        this.state.sortReportTo,
        e.target.value,
        { keys: ["reportTo"] }
      );
      if (sortFilterReportTo.length > 0) {
        this.setState({ sortFilterReportTo });
      } else {
        this.setState({
          sortFilterReportTo: [],
        });
      }
    }
    if (this.state.sortColumn === "createdbyperson") {
      var sortFilterCreatedBy = matchSorter(
        this.state.sortCreatedBy,
        e.target.value,
        {
          keys: ["createdbyperson"],
        }
      );
      if (sortFilterCreatedBy.length > 0) {
        this.setState({ sortFilterCreatedBy });
      } else {
        this.setState({
          sortFilterCreatedBy: [],
        });
      }
    }
    if (this.state.sortColumn === "status") {
      var sortFilterStatus = matchSorter(
        this.state.sortStatus,
        e.target.value,
        {
          keys: ["status"],
        }
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

  // get item list
  handleGetItem() {
    let self = this;
    this.setState({ isloading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/StoreHierarchy/ListStoreHierarchy",
      headers: authHeader(),
    })
      .then((response) => {
        let status = response.data.message;
        let data = response.data.responseData;

        if (data !== null) {
          self.setState({ sortAllData: data, isloading: false });
          var unique = [];
          var distinct = [];
          var sortDesignation = [];
          var sortFilterDesignation = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].designationName]) {
              distinct.push(data[i].designationName);
              unique[data[i].designationName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortDesignation.push({ designationName: distinct[i] });
              sortFilterDesignation.push({
                designationName: distinct[i],
              });
            }
          }

          var unique = [];
          var distinct = [];
          var sortReportTo = [];
          var sortFilterReportTo = [];

          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].reportTo]) {
              distinct.push(data[i].reportTo);
              unique[data[i].reportTo] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortReportTo.push({ reportTo: distinct[i] });
              sortFilterReportTo.push({ reportTo: distinct[i] });
            }
          }

          var unique = [];
          var distinct = [];
          var sortCreatedBy = [];
          var sortFilterCreatedBy = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].createdbyperson]) {
              distinct.push(data[i].createdbyperson);
              unique[data[i].createdbyperson] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortCreatedBy.push({ createdbyperson: distinct[i] });
              sortFilterCreatedBy.push({
                createdbyperson: distinct[i],
              });
            }
          }

          var unique = [];
          var distinct = [];
          var sortStatus = [];
          var sortFilterStatus = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].status]) {
              distinct.push(data[i].status);
              unique[data[i].status] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortStatus.push({ status: distinct[i] });
              sortFilterStatus.push({ status: distinct[i] });
            }
          }
        }

        self.setState({
          isloading: false,
          hierarchyData: data,
          sortCreatedBy,
          sortFilterCreatedBy,
          sortDesignation,
          sortFilterDesignation,
          sortReportTo,
          sortFilterReportTo,
          sortStatus,
          sortFilterStatus,
        });
      })
      .catch((response) => {
        self.setState({ isloading: false });
        console.log(response);
      });
  }

  DeleteBulkUploadFile = () => {
    const TranslationContext = this.state.translateLanguage.default;

    this.setState({
      file: {},
      fileName: "",
      fileSize: "",
      isErrorBulkUpload: false,
      isShowProgress: false,
    });
    NotificationManager.success(
      TranslationContext !== undefined
        ? TranslationContext.alertmessage.filedeletedsuccessfully
        : "File deleted successfully."
    );
  };

  // delete item
  handleDeleteHierarchy(hierarchy_Id) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    this.setState({ isDelete: true });
    axios({
      method: "post",
      url: config.apiUrl + "/StoreHierarchy/DeleteStoreHierarchy",
      headers: authHeader(),
      params: {
        designationID: hierarchy_Id,
      },
    })
      .then((response) => {
        let status = response.data.message;
        if (status === "Success") {
          self.handleGetItem();
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.designationdeletedsuccessfully
              : "Designation deleted successfully."
          );
          self.hanldeGetReportListDropDown();
          self.setState({ isDelete: false });
        } else {
          NotificationManager.error(response.data.message);
          self.setState({ isDelete: false });
        }
      })
      .catch((response) => {
        self.setState({ isDelete: false });
        console.log(response);
      });
  }

  handleUpdateHierarchyData(e, designationID) {
    const TranslationContext = this.state.translateLanguage.default;
    if (
      this.state.updateDesignation.length > 0 &&
      this.state.updateReprtTo !== "select" &&
      this.state.updateStatus !== "select"
    ) {
      let self = this;
      var activeStatus = 0;

      if (self.state.updateStatus === "Active") {
        activeStatus = 1;
      } else {
        activeStatus = 0;
      }
      this.setState({ editSaveLoading: true });

      // update item
      axios({
        method: "post",
        url: config.apiUrl + "/StoreHierarchy/UpdateStoreHierarchy",
        headers: authHeader(),
        data: {
          DesignationID: designationID,
          DesignationName: this.state.updateDesignation.trim(),
          ReportToDesignation: this.state.updateReprtTo,
          IsActive: activeStatus,
        },
      })
        .then((response) => {
          let status = response.data.message;
          if (status === "Success") {
            this.handleGetItem();
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.hierarchyupdatesuccessfully
                : "Hierarchy update successfully."
            );
            this.hanldeGetReportListDropDown();
            this.setState({ editSaveLoading: false });
          } else if (status === "Record Already Exists ") {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordalreadyexists
                : "Record Already Exists."
            );
            this.setState({ editSaveLoading: false });
          } else {
            this.setState({ editSaveLoading: false });
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.hierarchynotupdate
                : "Hierarchy not update."
            );
          }
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
      NotificationManager.error(
        TranslationContext !== undefined
          ? TranslationContext.alertmessage.hierarchynotupdate
          : "Hierarchy not update."
      );
      this.setState({
        editdesignationNameCompulsion: "Designation Name field is compulsory.",
        editreportToCompulsion: "ReportTo field is compulsory.",
        editstatusCompulsion: "Status field is compulsory.",
      });
    }
  }

  StatusOpenModel(data, header) {
    if (
      this.state.sortFilterDesignation.length === 0 ||
      this.state.sortFilterReportTo.length === 0 ||
      this.state.sortFilterCreatedBy.length === 0 ||
      this.state.sortFilterStatus.length === 0
    ) {
      return false;
    }
    this.setState({ isortA: false });

    if (data === "designationName") {
      if (
        this.state.sreportToFilterCheckbox !== "" ||
        this.state.screatedbypersonFilterCheckbox !== "" ||
        this.state.sstatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sreportToFilterCheckbox: "",
          screatedbypersonFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "reportTo") {
      if (
        this.state.sstatusFilterCheckbox !== "" ||
        this.state.screatedbypersonFilterCheckbox !== "" ||
        this.state.sdesignationNameFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sdesignationNameFilterCheckbox: "",
          screatedbypersonFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "createdbyperson") {
      if (
        this.state.sstatusFilterCheckbox !== "" ||
        this.state.sdesignationNameFilterCheckbox !== "" ||
        this.state.sdesignationNameFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sdesignationNameFilterCheckbox: "",
          sdesignationNameFilterCheckbox: "",
          sstatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "status") {
      if (
        this.state.sdesignationNameFilterCheckbox !== "" ||
        this.state.sreportToFilterCheckbox !== "" ||
        this.state.screatedbypersonFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sdesignationNameFilterCheckbox: "",
          sreportToFilterCheckbox: "",
          screatedbypersonFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }

  handleSubmitData() {
    const TranslationContext = this.state.translateLanguage.default;
    if (
      this.state.designation_name.length > 0 &&
      parseInt(this.state.selectReportTo) !== 0 &&
      parseInt(this.state.selectStatus) !== 0
    ) {
      let self = this;
      var activeStatus = 0;
      var status = this.state.selectStatus;
      if (status === "Active") {
        activeStatus = 1;
      } else {
        activeStatus = 0;
      }
      var ReportId = this.state.selectReportTo;
      if (ReportId === "-1") {
        ReportId = 0;
      }
      this.setState({ addSaveLoading: true });

      // create item
      axios({
        method: "post",
        url: config.apiUrl + "/StoreHierarchy/CreateStoreHierarchy",
        headers: authHeader(),
        data: {
          DesignationName: this.state.designation_name.trim(),
          ReportToDesignation: ReportId,
          IsActive: activeStatus,
        },
      })
        .then((response) => {
          let status = response.data.message;
          if (status === "Success") {
            this.handleGetItem();
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.hierarchyaddedsuccessfully
                : "Hierarchy added successfully."
            );
            this.hanldeGetReportListDropDown();
            this.setState({
              designation_name: "",
              selectReportTo: 0,
              selectStatus: 0,
              designationNameCompulsion: "",
              reportToCompulsion: "",
              statusCompulsion: "",
              addSaveLoading: false,
            });
          } else if (status === "Record Already Exists ") {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordalreadyexists
                : "Record Already Exists."
            );
            this.setState({ addSaveLoading: false });
          }
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
      this.setState({
        designationNameCompulsion: "Designation Name field is compulsory.",
        reportToCompulsion: "ReportTo field is compulsory.",
        statusCompulsion: "Status field is compulsory.",
      });
    }
  }

  handleClearSearch() {
    this.setState({
      sdesignationNameFilterCheckbox: "",
      sreportToFilterCheckbox: "",
      screatedbypersonFilterCheckbox: "",
      sstatusFilterCheckbox: "",
      filterTxtValue: "",
      sortHeader: "",
      sortColumn: "",
      StatusModel: false,
      hierarchyData: this.state.sortAllData,
      temphierarchyData: [],
    });
  }

  render() {
    const { hierarchyData } = this.state;
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
          <Link to={Demo.BLANK_LINK} className="header-path active">
            {TranslationContext !== undefined
              ? TranslationContext.link.hierarchymaster
              : "Hierarchy Master"}
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
              <div className="filter-type ">
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
                        this.state.sdesignationNameFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.sreportToFilterCheckbox.includes("all") ||
                        this.state.screatedbypersonFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.sstatusFilterCheckbox.includes("all")
                      }
                      onChange={this.setSortCheckStatus.bind(this, "all")}
                    />

                    <label htmlFor={"fil-open"}>
                      <span className="table-btn table-blue-btn">ALL</span>
                    </label>
                  </div>
                  {this.state.sortColumn === "designationName"
                    ? this.state.sortFilterDesignation !== null &&
                      this.state.sortFilterDesignation.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name={item.designationName}
                            id={"fil-open" + item.designationName}
                            value={item.designationName}
                            checked={
                              this.state.sdesignationNameFilterCheckbox
                                .split(",")
                                .find(
                                  (word) => word === item.designationName
                                ) || false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "designationName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.designationName}>
                            <span className="table-btn table-blue-btn">
                              {item.designationName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "reportTo"
                    ? this.state.sortFilterReportTo !== null &&
                      this.state.sortFilterReportTo.length > 0
                      ? this.state.sortFilterReportTo.map((item, i) => (
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              name="filter-type"
                              id={"fil-open" + item.reportTo}
                              value={item.reportTo}
                              checked={
                                this.state.sreportToFilterCheckbox
                                  .split(",")
                                  .find((word) => word === item.reportTo) ||
                                false
                              }
                              onChange={this.setSortCheckStatus.bind(
                                this,
                                "reportTo",
                                "value"
                              )}
                            />
                            <label htmlFor={"fil-open" + item.reportTo}>
                              <span className="table-btn table-blue-btn">
                                {item.reportTo}
                              </span>
                            </label>
                          </div>
                        ))
                      : "No Record Found"
                    : null}

                  {this.state.sortColumn === "createdbyperson"
                    ? this.state.sortFilterCreatedBy !== null &&
                      this.state.sortFilterCreatedBy.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.createdbyperson}
                            value={item.createdbyperson}
                            checked={
                              this.state.screatedbypersonFilterCheckbox
                                .split(",")
                                .find(
                                  (word) => word === item.createdbyperson
                                ) || false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "createdbyperson",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.createdbyperson}>
                            <span className="table-btn table-blue-btn">
                              {item.createdbyperson}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "status"
                    ? this.state.sortFilterStatus !== null &&
                      this.state.sortFilterStatus.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.status}
                            value={item.status}
                            checked={
                              this.state.sstatusFilterCheckbox
                                .split(",")
                                .find((word) => word === item.status) || false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "status",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.status}>
                            <span className="table-btn table-blue-btn">
                              {item.status}
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
          <div className="hiermas">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height StoreHierarchyReact setting-table-des settings-align">
                  <ReactTable
                    data={hierarchyData}
                    columns={[
                      {
                        Header: (
                          <span
                            className={
                              this.state.sortHeader === "Designation"
                                ? "sort-column"
                                : ""
                            }
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "designationName",
                              TranslationContext !== undefined
                                ? TranslationContext.span.designation
                                : "Designation"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.designation
                              : "Designation"}

                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ == false &&
                                this.state.sortHeader === "Designation"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable: false,
                        accessor: "designationName",
                      },
                      {
                        Header: (
                          <span
                            className={
                              this.state.sortHeader === "Report To"
                                ? "sort-column"
                                : ""
                            }
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "reportTo",
                              TranslationContext !== undefined
                                ? TranslationContext.span.reportto
                                : "Report To"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.reportto
                              : "Report To"}

                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ == false &&
                                this.state.sortHeader === "Report To"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable: false,
                        accessor: "reportTo",
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
                              "createdbyperson",
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
                        accessor: "createdbyperson",
                        Cell: (row) => {
                          return (
                            <div>
                              <span className="store-one-liner one-liner">
                                {row.original["createdbyperson"]}
                                <Popover
                                  content={
                                    <div>
                                      <div>
                                        <b>
                                          <p className="title">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p.createdby
                                              : "Created By"}
                                            :&nbsp;
                                            {row.original["createdbyperson"]}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p.createddate
                                            : "Created Date"}
                                          :&nbsp;
                                          {row.original["createdateformat"]}
                                        </p>
                                      </div>
                                      <div>
                                        <b>
                                          <p className="title">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p.updatedby
                                              : "Updated By"}
                                            :&nbsp;
                                            {row.original["updatedbyperson"]}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p.updateddate
                                            : "Updated Date"}
                                          :&nbsp;
                                          {row.original["updateddateformat"]}
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
                              "status",
                              "Status"
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
                        sortable: false,
                        accessor: "status",
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
                          var ids = row.original["designationID"];
                          return (
                            <>
                              <span className="settings-align-actions">
                                <Popover
                                  content={
                                    <div
                                      className="samdel d-flex general-popover popover-body"
                                      // id={"samdel" + ids}
                                    >
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
                                            type="button"
                                            onClick={this.handleDeleteHierarchy.bind(
                                              this,
                                              ids
                                            )}
                                            disabled={this.state.isDelete}
                                          >
                                            {this.state.isDelete ? (
                                              <FontAwesomeIcon
                                                className="circular-loader"
                                                icon={faCircleNotch}
                                                spin
                                              />
                                            ) : null}
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
                                <Popover
                                  content={
                                    <Content
                                      rowData={row.original}
                                      translateLanguage={
                                        this.state.translateLanguage
                                      }
                                      reportToData={this.state.reportToData}
                                      activeData={this.state.activeData}
                                      editdesignationNameCompulsion={
                                        this.state.editdesignationNameCompulsion
                                      }
                                      editSaveLoading={
                                        this.state.editSaveLoading
                                      }
                                      editreportToCompulsion={
                                        this.state.editreportToCompulsion
                                      }
                                      editstatusCompulsion={
                                        this.state.editstatusCompulsion
                                      }
                                      callBackEdit={this.callBackEdit}
                                      handleUpdateHierarchyData={this.handleUpdateHierarchyData.bind(
                                        this
                                      )}
                                    />
                                  }
                                  placement="bottom"
                                  trigger="click"
                                >
                                  <label className="Table-action-edit-button-text">
                                    <MyButton>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.mybutton.edit
                                        : "EDIT"}
                                    </MyButton>
                                  </label>
                                </Popover>
                              </span>
                            </>
                          );
                        },
                      },
                    ]}
                    minRows={2}
                    defaultPageSize={10}
                    showPagination={true}
                    noDataText={
                      this.state.isloading ? (
                        <Spin size="large" tip="Loading..." />
                      ) : hierarchyData.length === 0 ? (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      ) : null
                    }
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="createHierarchyMask">
                  <div className="storeSettingcreateDiv">
                    <label className="create-department">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.createhierarchy
                        : "CREATE HIERARCHY"}
                    </label>
                    <div className="div-padding-1">
                      <label className="designation-name">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.designationname
                          : "Designation Name"}
                      </label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.placeholder
                                .enterdesignationname
                            : "Enter Designation Name"
                        }
                        maxLength={25}
                        name="designation_name"
                        value={this.state.designation_name}
                        onChange={this.handleOnChangeHierarchyData}
                      />
                      {this.state.designation_name.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.designationNameCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">
                          {TranslationContext !== undefined
                            ? TranslationContext.label.reportto
                            : "Reports To"}
                        </label>
                        <select
                          className="form-control dropdown-setting"
                          value={this.state.selectReportTo}
                          onChange={this.handleOnReportToChange}
                        >
                          <option value="0">
                            {TranslationContext !== undefined
                              ? TranslationContext.option.select
                              : "Select"}
                          </option>
                          <option value={-1}>Root</option>
                          {this.state.reportToData !== null &&
                            this.state.reportToData.map((item, i) => (
                              <option key={i + 1} value={item.designationID}>
                                {item.designationName}
                              </option>
                            ))}
                        </select>
                        {parseInt(this.state.selectReportTo) === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.reportToCompulsion}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="dropDrownSpace">
                      <label className="reports-to">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.status
                          : "Status"}
                      </label>
                      <select
                        className="form-control dropdown-setting"
                        value={this.state.selectStatus}
                        onChange={this.handleStatusChange}
                      >
                        <option value="0">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.select
                            : "Select"}
                        </option>
                        {this.state.activeData !== null &&
                          this.state.activeData.map((item, j) => (
                            <option key={j} value={item.ActiveID}>
                              {item.ActiveName}
                            </option>
                          ))}
                      </select>
                      {parseInt(this.state.selectStatus) === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.statusCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="btnSpace">
                      <button
                        className="addBtn-ticket-hierarchy"
                        onClick={this.handleSubmitData.bind(this)}
                        disabled={this.state.addSaveLoading}
                      >
                        <label className="pop-over-btnsave-text">
                          {this.state.addSaveLoading ? (
                            <FontAwesomeIcon
                              className="circular-loader"
                              icon={faCircleNotch}
                              spin
                            />
                          ) : (
                            ""
                          )}

                          {TranslationContext !== undefined
                            ? TranslationContext.label.add
                            : "ADD"}
                        </label>
                      </button>
                    </div>
                  </div>
                </div>
                <br />
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
                        filename={"Hierarchy.csv"}
                        data={config.Store_HierarchyTemplate}
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
                      <Dropzone onDrop={this.fileUpload} accept=".csv">
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

                    {this.state.fileValidation ? (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.fileValidation}
                      </p>
                    ) : null}
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
                                      onClick={this.DeleteBulkUploadFile}
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
                        {this.state.isErrorBulkUpload ? (
                          <div className="file-cntr">
                            <div className="file-dtls">
                              <p className="file-name">{this.state.fileName}</p>
                              <span
                                className="file-retry"
                                onClick={this.handleBulkUpload.bind(this)}
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.span.retry
                                  : "Retry"}
                              </span>
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
                        {this.state.isShowProgress ? (
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
                                  now={60}
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
                      onClick={this.handleBulkUpload.bind(this)}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.button.add
                        : "ADD"}
                    </button>
                  </Spin>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default HierarchyMaster;
