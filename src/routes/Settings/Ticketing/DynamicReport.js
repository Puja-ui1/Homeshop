import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as translationHI from "./../../../translations/hindi";
import * as translationMA from "./../../../translations/marathi";
import Demo from "./../../../store/Hashtag.js";
import { Modal, Button, DatePicker } from "antd";
import moment from "moment";
import plus from "../../../assets/Images/blueplus2.png";
import PivotTableUI from "react-pivottable/PivotTableUI";
import TableRenderers from "react-pivottable/TableRenderers";
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers";
import Plot from "react-plotly.js";

import axios from "axios";
import config from "../../../helpers/config";
import { authHeader } from "../../../helpers/authHeader";
import exportFromJSON from "export-from-json";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const { RangePicker } = DatePicker;
const PlotlyRenderers = createPlotlyRenderers(Plot);

class ApplicationInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      translateLanguage: {},
      reportModel: true,
      isSubmitLoading: false,
      leadListGridData: [],
      reportInput: {},
      selectedColumnsForReport: [],
      pivotTableUIConfig: [],
      ticketFields: []
    };
  }
  componentDidMount() {
    this.handleGetTicketField()
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
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
          });
        } else {
          self.setState({ ticketFields: [] });
        }
      })
      .catch((error) => console.log(error));
  };

  handleReportModalClose = () => {
    this.setState({
      reportModel: false,
    });
  };

  handleReportSubmit = () => {
    this.setState({
      leadListGridData: [],
      pivotTableUIConfig: []
    });
    // if (this.handleReportValidation()) {
    this.handleLeadReportList();
    // }
  };

  handleLeadReportList = async () => {
    var inputData = {};
    let fields = this.state.ticketFields;
    if (this.state.reportInput.TicketCreateDate) {
      inputData.Ticket_CreatedFrom = moment(
        this.state.reportInput.TicketCreateDate[0]
      )
        .format("YYYY-MM-DD")
        .toString();
      inputData.Ticket_CreatedTo = moment(
        this.state.reportInput.TicketCreateDate[1]
      )
        .format("YYYY-MM-DD")
        .toString();
    } else {
      inputData = {};
    }

    this.setState({
      isSubmitLoading: true,
    });

    try {
      const response = await axios({
        url: config.apiUrl + "/DynamicReport/GetDynamicReportTicketDetails",
        headers: authHeader(),
        method: "POST",
        data: inputData,
      });

      let status = response.data.message;
      let leadListGridData = response.data.responseData.dynamicTicketDetils;
      // console.log(leadListGridData, "leadListGridData");
      leadListGridData.forEach(function (obj) {
        // if (window.localStorage.getItem('Programcode') !== 'campusshoes') {
        if (fields.filter((x) => x.fieldName.toLowerCase() === "BusinessUnit".toLowerCase())[0]?.reportDownload === false) {
          delete obj.businessUnitName
        }
        if (fields.filter((x) => x.fieldName.toLowerCase() === "SubBusinessUnit".toLowerCase())[0]?.reportDownload === false) {
          delete obj.subBusinessUnitName
        }
        if (fields.filter((x) => x.fieldName.toLowerCase() === "SubSubCategoryId".toLowerCase())[0]?.reportDownload === false) {
          delete obj.subSubCategoryName
        }
        if (fields.filter((x) => x.fieldName.toLowerCase() === "ResolutionStatusId".toLowerCase())[0]?.reportDownload === false) {
          delete obj.resolutionStatus
        }
      })
      // el_down.innerHTML = JSON.stringify(arr);

      // console.log(test, "test");
      if (status === "Success") {
        this.setState({
          leadListGridData,
          reportModel: false,
          isSubmitLoading: false,
        });
      } else {
        this.setState({
          leadListGridData: [],
          isSubmitLoading: false,
        });
      }
    } catch (err) {
      this.setState({
        isSubmitLoading: false,
      });
      console.log(err);
    }
  };

  handleInputChange = async (name, e) => {
    var reportInput = this.state.reportInput;
    if (e.target) {
      reportInput[name] = e.target.value;
    } else {
      reportInput[name] = e;
    }

    await this.setState({
      reportInput: reportInput,
    });
  };

  //    handleReportValidation = () => {
  //     let reportInput = this.state.reportInput;
  //     let reportError = {};
  //     let isValid = true;

  //     if (!reportInput["LeadCreateDate"]) {
  //       isValid = false;
  //       reportError["LeadCreateDate"] = "Please select date.";
  //     }

  //     this.setState({
  //       reportError,
  //     });
  //     return isValid;
  //   };

  handleOpenReport = () => {
    this.setState({
      reportModel: true,
    });
  };

  handleDownloadDynamicReport = () => {
    let gridData = this.state.leadListGridData || [];
    let columns = this.state.selectedColumnsForReport || [];
    let data = [];

    for (let i = 0; i < gridData.length; i++) {
      let obj = {};
      for (let j = 0; j < columns.length; j++) {
        obj[columns[j]] = gridData[i][columns[j]];
      }
      data.push(obj);
    }

    if (columns[0] !== "ticketID") {
      data.sort((a, b) => a[columns[0]].localeCompare(b[columns[0]]));
    }

    const fileName = "DynamicReport";
    const exportType = exportFromJSON.types.csv;

    exportFromJSON({ data, fileName, exportType });
  };

  handleDynamicReportChange = (s) => {
    this.setState({
      selectedColumnsForReport: s.rows,
    });
    this.handleAddIdToPvtTable();
  };

  handleAddIdToPvtTable = () => {
    var tablename = document.getElementsByClassName("pvtTable");
    if (tablename.length > 0) {
      tablename[0].setAttribute("id", "pvtTableId");
    }
  };

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    const { data, ...pivotTableUIConfig } = this.state.pivotTableUIConfig;
    return (
      <>
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
            Dynamic Report
          </Link>
        </div>

        <div className="paddmodule d-flex justify-content-between">
          <div>
            <label
              className="font-weight-bold mr-2"
              style={{ fontSize: "18px" }}
            >
              Dynamic Report
            </label>
            <img
              src={plus}
              alt=""
              height="25"
              width="25"
              onClick={this.handleOpenReport}
              style={{ cursor: "pointer" }}
            />
          </div>
          {this.state.selectedColumnsForReport.length > 0 && (
            <div>
              {/* <Button type="primary" onClick={this.handleTableToCSV}>
                Download Report
              </Button> */}
              <ReactHTMLTableToExcel
                id="htmltoexcel"
                className="download-html-table-to-excel"
                table="pvtTableId"
                filename="DynamicReport"
                sheet="DynamicReport"
                buttonText="Download"
              />
            </div>
          )}
        </div>

        <div className="pivtableh">
          <PivotTableUI
            data={this.state.leadListGridData}
            onChange={(s) => {
              // this.setState(s);
              this.setState({ pivotTableUIConfig: s });
              this.handleDynamicReportChange(s);
              // console.log(s);
            }}
            renderers={Object.assign({}, TableRenderers, PlotlyRenderers)}
            {...pivotTableUIConfig}
          />
        </div>
        <Modal
          closable={false}
          title={"Report"}
          visible={this.state.reportModel}
          footer={[
            <Button key="back" onClick={this.handleReportModalClose.bind(this)}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.state.isSubmitLoading}
              onClick={this.handleReportSubmit.bind(this)}
            >
              {"Fetch Data"}
            </Button>,
          ]}
        >
          <div className="createPrior crep">
            <div className="row mb-3">
              <div className="col-12 col-md-12">
                <label className="mb-3 font-weight-bold">
                  Ticket Create Date
                </label>{" "}
                <br />
                <RangePicker
                  value={this.state.reportInput.TicketCreateDate}
                  onChange={this.handleInputChange.bind(
                    this,
                    "TicketCreateDate"
                  )}
                  disabledDate={(current) => {
                    let customDate = moment()
                      .add(1, "days")
                      .format("YYYY-MM-DD");
                    return (
                      current && current > moment(customDate, "YYYY-MM-DD")
                    );
                  }}
                />
                {this.state.reportError ? (
                  <div className="text-danger">
                    {this.state.reportError["TicketCreateDate"] || ""}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default ApplicationInfo;
