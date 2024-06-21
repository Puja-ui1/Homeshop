import React, { Component, Fragment } from "react";
import Demo from "../../../store/Hashtag";
import Modal from "react-responsive-modal";
import Sorting from "./../../../assets/Images/sorting.png";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { formatSizeUnits } from "./../../../helpers/CommanFuncation";
import { Link } from "react-router-dom";
import { Select } from "antd";
import SweetAlert from "react-bootstrap-sweetalert";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import config from "../../../helpers/config";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import { authHeader } from "../../../helpers/authHeader";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import matchSorter from "match-sorter";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";
import { CSVLink } from "react-csv";
import DownExcel from "./../../../assets/Images/csv.png";
import { Popover, Spin } from "antd";
import Dropzone from "react-dropzone";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { ProgressBar } from "react-bootstrap";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";

class BulkClosure extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      fileN: [],
      bulkuploadLoading: false,
      translateLanguage: {},
      isFileUploadFail: false,
      bulkuploadCompulsion: "",
      fileSize: "",
      showProgress: false,
      openPOP: false,
    };
  }

  componentDidMount() {
    //this.handleJunkWordsList();

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
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
        isFileUploadFail: false,
        progressValue: 0,
        fileSize: "",
        showProgress: false,
      });
    }
  };
  ////handle bulk upload
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
          url: config.apiUrl + "/Master/BulkTicketCloser",
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
              //self.handleGetCategoryGridData();
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
  ////handle delete selected file of bulk upload
  handleDeleteBulkupload = (e) => {
    const TranslationContext = this.state.translateLanguage.default;
    this.setState({
      fileN: [],
      fileName: "",
      openPOP: false
    });
    NotificationManager.success(
      TranslationContext !== undefined
        ? TranslationContext.alertmessage.filedeletedsuccessfully
        : "File deleted successfully."
    );
  };
  handleShowPop = () => {
    let self = this;
    self.setState({
      openPOP: true
    })
  }
  handleHidePop = () => {
    let self = this;
    self.setState({
      openPOP: false
    })
  }

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    //const datajunkwords = this.state.JunkWordsData;
    return (
      <Fragment>
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
          <Link to={Demo.BLANK_LINK} className="active header-path">
            {TranslationContext !== undefined
              ? TranslationContext.strong.junkwords
              : "Bulk Closure"}
          </Link>
        </div>
        <div className="container-fluid row d-flex
    justify-content-center">
          <div className="right-sect-div col-md-6">
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
                <CSVLink
                  filename={"BulkClosure.csv"}
                  data={config.bulkClosureTemplate}
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

                      <Popover
                        content={
                          <div
                            className="samdel d-flex general-popover popover-body"
                          >
                            <div className="del-big-icon">
                              <img src={DelBigIcon} alt="del-icon" />
                            </div>
                            <div>
                              <p className="font-weight-bold blak-clr">
                                Delete file?
                              </p>
                              <p className="mt-1 fs-12">
                                Are you sure you want to delete this
                                file?
                              </p>
                              <div className="del-can">
                                <a
                                  onClick={this.handleHidePop}
                                // className="canblue"
                                >
                                  CANCEL
                                </a>
                                <button
                                  className="butn"
                                  onClick={this.handleDeleteBulkupload}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        }
                        placement="bottom"
                        trigger="click"
                        visible={this.state.openPOP}
                      >
                        <div className="del-file" id="del-file-1">
                          <img src={DelBlack} alt="delete-black" onClick={this.handleShowPop} />
                        </div>
                      </Popover>


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
      </Fragment>
    );
  }
}

export default BulkClosure;