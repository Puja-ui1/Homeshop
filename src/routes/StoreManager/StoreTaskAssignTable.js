import React, { Component, Fragment } from "react";
import { authHeader } from "./../../helpers/authHeader";
import axios from "axios";
import config from "./../../helpers/config";
import { NotificationManager } from "react-notifications";
import { Select, Table } from "antd";
import { Link } from "react-router-dom";
import * as translationHI from "../../translations/hindi";
import * as translationMA from "../../translations/marathi";

const { Option } = Select;
class StoreTaskAssignTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      translateLanguage: {},
      loading: false,
      unassignCampaignData: [],
      campaignNameData: [],
      storeData: [],
      selectedRowKeys: [],
      pageSize: 10,
      pageNo: 1,
      totalData: 0,
      selectedAssignTo: "",
      selectedStoreCode: undefined,
      selectedCustomerCampaignId: "",
      assignToData: [],
      selectedAssignToArray: [],
      isCheckBoxSelectAll: false,
      campaign_Id: 0,
    };
  }
  componentDidMount() {
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
    if (this.props.location.state) {
      var campId = this.props.location.state.campaign_Id;
      this.setState({
        campaign_Id: campId,
      });
    }
    setTimeout(() => {
      this.handleGetStoreUnAssignedCampaign();
      this.handleGetStoreList();
    }, 1);
  }

  handleGetStoreList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDashboard/GetStoreByTenantID",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            storeData: data,
          });
        } else {
          self.setState({
            storeData: [],
          });
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }
  onSelectedRowKeysChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys,
    });
  };

  handleGetStoreUnAssignedCampaign = () => {
    let self = this;

    this.setState({
      loading: true,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetStoreUnAssignedCampaign",
      headers: authHeader(),
      params: {
        CampaignID: this.state.campaign_Id,
        PageNo: this.state.pageNo,
        pageSize: this.state.pageSize,
      },
    })
      .then(function(res) {
        var message = res.data.message;
        var responseData = res.data.responseData;
        self.setState({
          loading: false,
        });

        if (message === "Success") {
          self.setState({
            totalData: responseData.totalRecords,
            unassignCampaignData: responseData.storeCampaignDetails,
          });
        } else {
          self.setState({
            totalData: 0,
            unassignCampaignData: [],
          });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };

  handleUnassignCampaignTablePageChange = async (e) => {
    await this.setState({
      pageNo: e,
    });
    this.handleGetStoreUnAssignedCampaign();
  };
  handleUnassignCampaignTablePageSizeChange = async (page, pageSize) => {
    await this.setState({
      pageNo: page,
      pageSize: pageSize,
    });
    this.handleGetStoreUnAssignedCampaign();
  };
  handleAssignCampaignToUser = () => {
    let self = this;
    var campaignCustomerID = "";
    var storeCodes = "";
    var userIDs = "";
    if (this.state.selectedRowKeys.length > 0 && this.state.selectedStoreCode) {
      if (!this.state.isCheckBoxSelectAll) {
        for (let i = 0; i < this.state.selectedRowKeys.length; i++) {
          campaignCustomerID +=
            this.state.unassignCampaignData[this.state.selectedRowKeys[i]]
              .campaignCustomerID + ",";
        }
      }
      storeCodes = this.state.selectedStoreCode;
      var userIDs = this.state.selectedAssignTo;
      this.setState({ loading: true });
      axios({
        method: "post",
        url: config.apiUrl + "/StoreTask/AssignCampaignToUser",
        headers: authHeader(),
        params: {
          CampaignID: this.state.campaign_Id,
          CampaignCustomerID: this.state.isCheckBoxSelectAll
            ? "all"
            : campaignCustomerID,
          StoreCodes: storeCodes,
          UserIDs: userIDs ? userIDs : "all",
          SelectAll: this.state.isCheckBoxSelectAll,
        },
      })
        .then(function(res) {
          var message = res.data.message;
          self.setState({ loading: false });
          if (message === "Success") {
            self.setState({
              selectedRowKeys: [],
              pageNo: 1,
              pageSize: 10,
              totalData: 0,
              selectedStoreCode: undefined,
              selectedAssignTo: "",
              selectedAssignToArray: [],
            });
            self.handleGetStoreUnAssignedCampaign();
            NotificationManager.success("Campaign Assigned successfully.");
          } else {
            NotificationManager.error("Campaign Not Assigned.");
          }
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
    }
  };

  handleGetStoreUserByStore = (storeId) => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/GetStoreUserByStore",
      params: {
        StoreID: storeId,
      },
      headers: authHeader(),
    })
      .then(function(res) {
        var message = res.data.message;
        var responseData = res.data.responseData;
        if (message === "Success") {
          self.setState({ assignToData: responseData });
        } else {
          self.setState({ assignToData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  };
  handleSelectStoreChange = (e) => {
    this.setState({
      selectedStoreCode: e,
    });
    this.handleGetStoreUserByStore(e);
  };
  handleSelectedAssignToChange = (e) => {
    this.setState({
      selectedAssignToArray: e,
    });
    if (e.length > 0) {
      this.setState({ selectedAssignTo: e.join() });
    } else {
      this.setState({ selectedAssignTo: "" });
    }
  };

  handleCheckBoxSelectAll = (selected) => {
    this.setState({
      isCheckBoxSelectAll: selected,
    });
  };
  render() {
    const TranslationContext = this.state.translateLanguage.default;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectedRowKeysChange,
      onSelectAll: this.handleCheckBoxSelectAll,
    };
    return (
      <Fragment>
        <div className="row" style={{ padding: "20px", margin: "0" }}>
          <div className="bckTaskCamp">
            <Link
              className="backTocampTask"
              to={{
                pathname: "StoreTask",
                state: {
                  backTaskCamp: true,
                  isUploadCampaign: true,
                  isEditCampaign: true,
                },
              }}
            >
              {`<<`}
              {TranslationContext !== undefined
                ? TranslationContext.ticketingDashboard.backtocampaign
                : "Back to Campaign"}
            </Link>
          </div>
        </div>
        <div className="card taskCards">
          <div className="backNone">
            <div className="row">
              <div className="col-md-12">
                <div style={{ background: "white" }}>
                  <div className="row">
                    <div className="col-md-4 m-auto">
                      <div className="assignCamptTitle">
                        <h4>Assign Campaign </h4>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <Table
                        loading={this.state.loading}
                        noDataContent="No Record Found"
                        className="components-table-demo-nested antd-table-campaign custom-antd-table unassignCampaign-list"
                        columns={[
                          {
                            title: "Campaign Name",
                            dataIndex: "campaignName",
                          },
                          {
                            title: "Customer Name",
                            dataIndex: "customerName",
                          },
                          {
                            title: "Mobile No",
                            dataIndex: "customerPhoneNumber",
                          },
                          {
                            title: "Campaign Date",
                            dataIndex: "campaignTypeDate",
                          },
                          {
                            title: "Campaign Start Date",
                            dataIndex: "campaignStartDate",
                          },
                        ]}
                        pagination={{
                          responsive: true,
                          defaultPageSize: 10,
                          current: this.state.pageNo,
                          pageSize: this.state.pageSize,
                          pageSizeOptions: [10, 20, 50, 100],
                          showSizeChanger: true,
                          total: this.state.totalData,
                          defaultCurrent: 1,
                          onChange: this.handleUnassignCampaignTablePageChange.bind(
                            this
                          ),
                          onShowSizeChange: this.handleUnassignCampaignTablePageSizeChange.bind(
                            this
                          ),
                        }}
                        dataSource={this.state.unassignCampaignData}
                        rowSelection={rowSelection}
                      ></Table>
                    </div>
                  </div>
                  {this.state.selectedRowKeys.length > 0 ? (
                    <div className="row finalassigndiv">
                      <div
                        className="col-md-12"
                        style={{ display: "inline-flex" }}
                      >
                        <div className="col-md-2 assignTolbl">
                          <label>Assigned To:</label>
                        </div>
                        <div className="col-md-4">
                          <label>Store Code</label>
                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            optionFilterProp="children"
                            placeholder="Select Store Code"
                            notFoundContent="No Data Found"
                            onChange={this.handleSelectStoreChange.bind(this)}
                            value={this.state.selectedStoreCode}
                          >
                            {this.state.storeData.length > 0
                              ? this.state.storeData.map((item, key) => {
                                  return (
                                    <Option key={key} value={item.storeID}>
                                      {item.storeCode}
                                    </Option>
                                  );
                                })
                              : null}
                          </Select>
                        </div>
                        <div className="col-md-4">
                          <label>Assign To</label>

                          <Select
                            style={{ width: "100%" }}
                            showSearch
                            optionFilterProp="children"
                            placeholder="Select Assign To"
                            notFoundContent="No Data Found"
                            mode="multiple"
                            onChange={this.handleSelectedAssignToChange.bind(
                              this
                            )}
                            value={this.state.selectedAssignToArray}
                          >
                            {this.state.assignToData.length > 0
                              ? this.state.assignToData.map((item, key) => {
                                  return (
                                    <Option key={key} value={item.userID}>
                                      {item.userName}
                                    </Option>
                                  );
                                })
                              : null}
                          </Select>
                        </div>
                        <div className="col-md-2">
                          <button
                            disabled={this.state.loading}
                            className="Schedulenext1 w-100 mb-0 mt-3"
                            type="button"
                            onClick={this.handleAssignCampaignToUser.bind(this)}
                          >
                            SUBMIT
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default StoreTaskAssignTable;
