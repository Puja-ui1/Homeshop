import React, { Component, Fragment } from "react";
import { authHeader } from "./../../helpers/authHeader";
import axios from "axios";
import config from "./../../helpers/config";
import { NotificationManager } from "react-notifications";
import { Select, Table, DatePicker } from "antd";
import { Link } from "react-router-dom";
import * as translationHI from "../../translations/hindi";
import * as translationMA from "../../translations/marathi";
import moment from "moment";
import Modal from "react-responsive-modal";
import Sorting from "./../../assets/Images/sorting.png";
import matchSorter from "match-sorter";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const { Option } = Select;
class UnasignCampaign extends Component {
  constructor(props) {
    super(props);

    this.state = {
      translateLanguage: {},
      loading: false,
      unassignCampaignData: [],
      isSearchClick: false,
      campaignNameData: [],
      storeData: [],
      selctedSearchCampaignID: undefined,
      selctedSearchStoreCode: undefined,
      selectedRowKeys: [],
      pageSize: 10,
      pageNo: 1,
      totalData: 0,
      selectedAssignTo: "",
      selectedStoreCode: undefined,
      selectedCustomerCampaignId: "",
      assignToData: [],
      isSearch: false,
      selectedAssignToArray: [],
      isCheckBoxSelectAll: false,
      campaignUploadDate: undefined,
      filterTxtValue: "",
      sFilterCheckbox: "",
      sortFiltercampaignName: [],
      sortFiltercustomerName: [],
      sortFiltercustomerPhoneNumber: [],
      sortFiltercampaignTypeDate: [],
      sortFiltercampaignStartDate: [],
      scampaignNameFilterCheckbox: "",
      scustomerNameFilterCheckbox: "",
      scustomerPhoneNumberFilterCheckbox: "",
      scampaignTypeDateFilterCheckbox: "",
      scampaignStartDateFilterCheckbox: "",
      sortAllData: [],
      sortcampaignName: [],
      sortcustomerName: [],
      sortcustomerPhoneNumber: [],
      sortcampaignTypeDate: [],
      sortcampaignStartDate: [],
      StatusModel: false,
      sortColumn: "",
      tempunassignCampaignData: [],
      isUploadCampaign: false,
      isEditCampaign: false,
    };
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
  }
  componentDidMount() {
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.setState({
        translateLanguage: translationHI,
      });
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.setState({
        translateLanguage: translationMA,
      });
    } else {
      this.setState({
        translateLanguage: {},
      });
    }
    if (this.props.location.state) {
      this.setState({
        isUploadCampaign: this.props.location.state.isUploadCampaign,
        isEditCampaign: this.props.location.state.isEditCampaign,
      });
    }
    this.handleGetStoreUnAssignedCampaign(false);
    this.handleGetStoreList();
    this.handleGetCampaignNameList();
  }
  handleSearchButtonClick = () => {
    this.setState({
      isSearchClick: true,
    });
  };

  handleGetCampaignNameList = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Graph/GetCampaignNameList",
      headers: authHeader(),
    })
      .then(function(response) {
        var message = response.data.message;
        var campaignNameData = response.data.responseData;
        if (message === "Success" && campaignNameData) {
          self.setState({
            campaignNameData,
          });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetCampaignNameList");
      });
  };

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

  handleGetStoreUnAssignedCampaign = (isSearch) => {
    let self = this;
    if (isSearch) {
      // if (!this.state.selctedSearchCampaignID) {
      //   return false;
      // }
    }
    this.setState({
      loading: true,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetStoreUnAssignedCampaign",
      params: {
        CampaignID: this.state.selctedSearchCampaignID || "",
        StoreCodes: this.state.selctedSearchStoreCode || "",
        CampaignUploadDate: this.state.campaignUploadDate
          ? moment(this.state.campaignUploadDate)
              .format("YYYY-MM-DD")
              .toString()
          : "",
      },
      headers: authHeader(),
    })
      .then(function(res) {
        var message = res.data.message;
        var responseData = res.data.responseData;

        self.setState({
          loading: false,
        });
        if (isSearch) {
          self.setState({
            isSearch: true,
          });
        }

        if (message === "Success") {
          var data = responseData.storeCampaignDetails;
          if (data !== null) {
            self.state.sortAllData = data;
            var unique = [];
            var distinct = [];
            for (let i = 0; i < data.length; i++) {
              if (!unique[data[i].campaignName]) {
                distinct.push(data[i].campaignName);
                unique[data[i].campaignName] = 1;
              }
            }
            for (let i = 0; i < distinct.length; i++) {
              if (distinct[i]) {
                self.state.sortcampaignName.push({ campaignName: distinct[i] });
                self.state.sortFiltercampaignName.push({
                  campaignName: distinct[i],
                });
              }
            }

            var unique = [];
            var distinct = [];
            for (let i = 0; i < data.length; i++) {
              if (!unique[data[i].customerName]) {
                distinct.push(data[i].customerName);
                unique[data[i].customerName] = 1;
              }
            }
            for (let i = 0; i < distinct.length; i++) {
              if (distinct[i]) {
                self.state.sortcustomerName.push({
                  customerName: distinct[i],
                });
                self.state.sortFiltercustomerName.push({
                  customerName: distinct[i],
                });
              }
            }

            var unique = [];
            var distinct = [];
            for (let i = 0; i < data.length; i++) {
              if (!unique[data[i].customerPhoneNumber]) {
                distinct.push(data[i].customerPhoneNumber);
                unique[data[i].customerPhoneNumber] = 1;
              }
            }
            for (let i = 0; i < distinct.length; i++) {
              if (distinct[i]) {
                self.state.sortcustomerPhoneNumber.push({
                  customerPhoneNumber: distinct[i],
                });
                self.state.sortFiltercustomerPhoneNumber.push({
                  customerPhoneNumber: distinct[i],
                });
              }
            }

            var unique = [];
            var distinct = [];
            for (let i = 0; i < data.length; i++) {
              if (!unique[data[i].campaignTypeDate]) {
                distinct.push(data[i].campaignTypeDate);
                unique[data[i].campaignTypeDate] = 1;
              }
            }
            for (let i = 0; i < distinct.length; i++) {
              if (distinct[i]) {
                self.state.sortcampaignTypeDate.push({
                  campaignTypeDate: distinct[i],
                });
                self.state.sortFiltercampaignTypeDate.push({
                  campaignTypeDate: distinct[i],
                });
              }
            }

            var unique = [];
            var distinct = [];
            for (let i = 0; i < data.length; i++) {
              if (!unique[data[i].campaignStartDate]) {
                distinct.push(data[i].campaignStartDate);
                unique[data[i].campaignStartDate] = 1;
              }
            }
            for (let i = 0; i < distinct.length; i++) {
              if (distinct[i]) {
                self.state.sortcampaignStartDate.push({
                  campaignStartDate: distinct[i],
                });
                self.state.sortFiltercampaignStartDate.push({
                  campaignStartDate: distinct[i],
                });
              }
            }
          }

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
  handleSearchCampaignNameChanage = (e) => {
    this.setState({
      selctedSearchCampaignID: e,
    });
  };
  handleSearchStoreCodeChanage = (e) => {
    this.setState({
      selctedSearchStoreCode: e,
    });
  };
  handleUnassignCampaignTablePageChange = async (e) => {
    await this.setState({
      pageNo: e,
    });
    this.handleGetStoreUnAssignedCampaign(false);
  };
  handleUnassignCampaignTablePageSizeChange = async (page, pageSize) => {
    await this.setState({
      pageNo: page,
      pageSize: pageSize,
    });
    this.handleGetStoreUnAssignedCampaign(false);
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
        params: {
          CampaignID: this.state.selctedSearchCampaignID || "",
          CampaignCustomerID: this.state.isCheckBoxSelectAll
            ? "all"
            : campaignCustomerID,
          StoreCodes: storeCodes,
          UserIDs: userIDs ? userIDs : "all",
          SelectAll: this.state.isCheckBoxSelectAll,
        },
        headers: authHeader(),
      })
        .then(function(res) {
          var message = res.data.message;
          var responseData = res.data.responseData;
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
            self.handleGetStoreUnAssignedCampaign(false);
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
  handleClearSearch = async () => {
    await this.setState({
      isSearch: false,
      selctedSearchCampaignID: undefined,
      selctedSearchStoreCode: undefined,
      campaignUploadDate: undefined,
    });
    this.handleGetStoreUnAssignedCampaign(false);
  };
  handleCheckBoxSelectAll = (selected) => {
    this.setState({
      isCheckBoxSelectAll: selected,
    });
  };
  StatusOpenModel(data, header) {
    if (
      this.state.sortFiltercampaignName.length === 0 ||
      this.state.sortFiltercustomerName.length === 0 ||
      this.state.sortFiltercustomerPhoneNumber.length === 0 ||
      this.state.sortFiltercampaignTypeDate.length === 0 ||
      this.state.sortFiltercampaignStartDate.length === 0
    ) {
      return false;
    }
    if (data === "campaignName") {
      if (
        this.state.scustomerNameFilterCheckbox !== "" ||
        this.state.scustomerPhoneNumberFilterCheckbox !== "" ||
        this.state.scampaignTypeDateFilterCheckbox !== "" ||
        this.state.scampaignStartDateFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          scustomerNameFilterCheckbox: "",
          scustomerPhoneNumberFilterCheckbox: "",
          scampaignTypeDateFilterCheckbox: "",
          scampaignStartDateFilterCheckbox: "",

          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "customerName") {
      if (
        this.state.scampaignNameFilterCheckbox !== "" ||
        this.state.scustomerPhoneNumberFilterCheckbox !== "" ||
        this.state.scampaignTypeDateFilterCheckbox !== "" ||
        this.state.scampaignStartDateFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          scampaignNameFilterCheckbox: "",
          scustomerPhoneNumberFilterCheckbox: "",
          scampaignTypeDateFilterCheckbox: "",
          scampaignStartDateFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "customerPhoneNumber") {
      if (
        this.state.scampaignNameFilterCheckbox !== "" ||
        this.state.scustomerNameFilterCheckbox !== "" ||
        this.state.scampaignTypeDateFilterCheckbox !== "" ||
        this.state.scampaignStartDateFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          scampaignNameFilterCheckbox: "",
          scustomerNameFilterCheckbox: "",
          scampaignTypeDateFilterCheckbox: "",
          scampaignStartDateFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "campaignTypeDate") {
      if (
        this.state.scampaignNameFilterCheckbox !== "" ||
        this.state.scustomerPhoneNumberFilterCheckbox !== "" ||
        this.state.scustomerNameFilterCheckbox !== "" ||
        this.state.scampaignStartDateFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          scampaignStartDateFilterCheckbox: "",
          scustomerNameFilterCheckbox: "",
          scustomerPhoneNumberFilterCheckbox: "",
          scampaignNameFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "campaignStartDate") {
      if (
        this.state.scampaignTypeDateFilterCheckbox !== "" ||
        this.state.scustomerPhoneNumberFilterCheckbox !== "" ||
        this.state.scustomerNameFilterCheckbox !== "" ||
        this.state.scampaignNameFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          scampaignNameFilterCheckbox: "",
          scustomerNameFilterCheckbox: "",
          scustomerPhoneNumberFilterCheckbox: "",
          scampaignTypeDateFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }
  StatusCloseModel() {
    if (this.state.tempunassignCampaignData.length > 0) {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
        unassignCampaignData: this.state.tempunassignCampaignData,
        sFilterCheckbox: "",
        sortFiltercampaignName: this.state.sortcampaignName,
        sortFiltercustomerName: this.state.sortcustomerName,
        sortFiltercustomerPhoneNumber: this.state.sortcustomerPhoneNumber,
        sortFiltercampaignTypeDate: this.state.sortcampaignTypeDate,
        sortFiltercampaignStartDate: this.state.sortcampaignStartDate,
      });
      if (this.state.sortColumn === "campaignName") {
        if (this.state.scampaignNameFilterCheckbox === "") {
        } else {
          this.setState({
            scustomerNameFilterCheckbox: "",
            scustomerPhoneNumberFilterCheckbox: "",
            scampaignTypeDateFilterCheckbox: "",
            scampaignStartDateFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "customerName") {
        if (this.state.scustomerNameFilterCheckbox === "") {
        } else {
          this.setState({
            scampaignNameFilterCheckbox: "",
            scustomerPhoneNumberFilterCheckbox: "",
            scampaignTypeDateFilterCheckbox: "",
            scampaignStartDateFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "customerPhoneNumber") {
        if (this.state.scustomerPhoneNumberFilterCheckbox === "") {
        } else {
          this.setState({
            scampaignNameFilterCheckbox: "",
            scustomerNameFilterCheckbox: "",
            scampaignTypeDateFilterCheckbox: "",
            scampaignStartDateFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "campaignTypeDate") {
        if (this.state.scampaignTypeDateFilterCheckbox === "") {
        } else {
          this.setState({
            scampaignNameFilterCheckbox: "",
            scustomerNameFilterCheckbox: "",
            scustomerPhoneNumberFilterCheckbox: "",
            scampaignStartDateFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "campaignStartDate") {
        if (this.state.scampaignStartDateFilterCheckbox === "") {
        } else {
          this.setState({
            scampaignNameFilterCheckbox: "",
            scustomerNameFilterCheckbox: "",
            scustomerPhoneNumberFilterCheckbox: "",
            scampaignTypeDateFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
        unassignCampaignData: this.state.isortA
          ? this.state.unassignCampaignData
          : this.state.sortAllData,
        sFilterCheckbox: "",
        sortFiltercampaignName: this.state.sortcampaignName,
        sortFiltercustomerName: this.state.sortcustomerName,
        sortFiltercustomerPhoneNumber: this.state.sortcustomerPhoneNumber,
        sortFiltercampaignTypeDate: this.state.sortcampaignTypeDate,
        sortFiltercampaignStartDate: this.state.sortcampaignStartDate,
      });
    }
  }
  sortStatusAtoZ() {
    var itemsArray = [];
    var itemsArray1 = [];
    
    itemsArray1 = this.state.unassignCampaignData;

    if (this.state.sortColumn === "campaignName") {
      itemsArray = itemsArray1.sort((a, b) => {
        if (a.campaignName.toLowerCase() < b.campaignName.toLowerCase())
          return -1;
        if (a.campaignName.toLowerCase() > b.campaignName.toLowerCase())
          return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "customerName") {
      itemsArray = itemsArray1.sort((a, b) => {
        if (a.customerName.toLowerCase() < b.customerName.toLowerCase())
          return -1;
        if (a.customerName.toLowerCase() > b.customerName.toLowerCase())
          return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "customerPhoneNumber") {
      itemsArray = itemsArray1.sort((a, b) => {
        if (
          a.customerPhoneNumber.toLowerCase() <
          b.customerPhoneNumber.toLowerCase()
        )
          return -1;
        if (
          a.customerPhoneNumber.toLowerCase() >
          b.customerPhoneNumber.toLowerCase()
        )
          return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "campaignTypeDate") {
      itemsArray = itemsArray1.sort((a, b) => {
        if (a.campaignTypeDate.toLowerCase() < b.campaignTypeDate.toLowerCase())
          return -1;
        if (a.campaignTypeDate.toLowerCase() > b.campaignTypeDate.toLowerCase())
          return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "campaignStartDate") {
      itemsArray = itemsArray1.sort((a, b) => {
        if (
          a.campaignStartDate.toLowerCase() < b.campaignStartDate.toLowerCase()
        )
          return -1;
        if (
          a.campaignStartDate.toLowerCase() > b.campaignStartDate.toLowerCase()
        )
          return 1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      unassignCampaignData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }
  sortStatusZtoA() {
    
    var itemsArray = [];
    var itemsArray1 = [];
    itemsArray1 = this.state.unassignCampaignData;

    if (this.state.sortColumn === "campaignName") {
      itemsArray = itemsArray1.sort((a, b) => {
        if (a.campaignName.toLowerCase() < b.campaignName.toLowerCase())
          return 1;
        if (a.campaignName.toLowerCase() > b.campaignName.toLowerCase())
          return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "customerName") {
      itemsArray = itemsArray1.sort((a, b) => {
        if (a.customerName.toLowerCase() < b.customerName.toLowerCase())
          return 1;
        if (a.customerName.toLowerCase() > b.customerName.toLowerCase())
          return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "customerPhoneNumber") {
      itemsArray = itemsArray1.sort((a, b) => {
        if (
          a.customerPhoneNumber.toLowerCase() <
          b.customerPhoneNumber.toLowerCase()
        )
          return 1;
        if (
          a.customerPhoneNumber.toLowerCase() >
          b.customerPhoneNumber.toLowerCase()
        )
          return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "campaignTypeDate") {
      itemsArray = itemsArray1.sort((a, b) => {
        if (a.campaignTypeDate.toLowerCase() < b.campaignTypeDate.toLowerCase())
          return 1;
        if (a.campaignTypeDate.toLowerCase() > b.campaignTypeDate.toLowerCase())
          return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "campaignStartDate") {
      itemsArray = itemsArray1.sort((a, b) => {
        if (
          a.campaignStartDate.toLowerCase() < b.campaignStartDate.toLowerCase()
        )
          return 1;
        if (
          a.campaignStartDate.toLowerCase() > b.campaignStartDate.toLowerCase()
        )
          return -1;
        return 0;
      });
    }
    this.setState({
      isortA: true,
      unassignCampaignData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }
  setSortCheckStatus = (column, type, e) => {
    var itemsArray = [];
    var scampaignNameFilterCheckbox = this.state.scampaignNameFilterCheckbox;
    var scustomerNameFilterCheckbox = this.state.scustomerNameFilterCheckbox;
    var scustomerPhoneNumberFilterCheckbox = this.state
      .scustomerPhoneNumberFilterCheckbox;
    var scampaignTypeDateFilterCheckbox = this.state
      .scampaignTypeDateFilterCheckbox;
    var scampaignStartDateFilterCheckbox = this.state
      .scampaignStartDateFilterCheckbox;

    if (column === "campaignName" || column === "all") {
      if (type === "value" && type !== "All") {
        scampaignNameFilterCheckbox = scampaignNameFilterCheckbox.replace(
          "all",
          ""
        );
        scampaignNameFilterCheckbox = scampaignNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (scampaignNameFilterCheckbox.includes(e.currentTarget.value)) {
          scampaignNameFilterCheckbox = scampaignNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          scampaignNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (scampaignNameFilterCheckbox.includes("all")) {
          scampaignNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "campaignName") {
            for (let i = 0; i < this.state.sortcampaignName.length; i++) {
              scampaignNameFilterCheckbox +=
                this.state.sortcampaignName[i].campaignName + ",";
            }
            scampaignNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "customerName" || column === "all") {
      if (type === "value" && type !== "All") {
        scustomerNameFilterCheckbox = scustomerNameFilterCheckbox.replace(
          "all",
          ""
        );
        scustomerNameFilterCheckbox = scustomerNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (scustomerNameFilterCheckbox.includes(e.currentTarget.value)) {
          scustomerNameFilterCheckbox = scustomerNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          scustomerNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (scustomerNameFilterCheckbox.includes("all")) {
          scustomerNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "customerName") {
            for (let i = 0; i < this.state.sortcustomerName.length; i++) {
              scustomerNameFilterCheckbox +=
                this.state.sortcustomerName[i].customerName + ",";
            }
            scustomerNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "customerPhoneNumber" || column === "all") {
      if (type === "value" && type !== "All") {
        scustomerPhoneNumberFilterCheckbox = scustomerPhoneNumberFilterCheckbox.replace(
          "all",
          ""
        );
        scustomerPhoneNumberFilterCheckbox = scustomerPhoneNumberFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          scustomerPhoneNumberFilterCheckbox.includes(e.currentTarget.value)
        ) {
          scustomerPhoneNumberFilterCheckbox = scustomerPhoneNumberFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          scustomerPhoneNumberFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (scustomerPhoneNumberFilterCheckbox.includes("all")) {
          scustomerPhoneNumberFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "customerPhoneNumber") {
            for (
              let i = 0;
              i < this.state.sortcustomerPhoneNumber.length;
              i++
            ) {
              scustomerPhoneNumberFilterCheckbox +=
                this.state.sortcustomerPhoneNumber[i].customerPhoneNumber + ",";
            }
            scustomerPhoneNumberFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "campaignTypeDate" || column === "all") {
      if (type === "value" && type !== "All") {
        scampaignTypeDateFilterCheckbox = scampaignTypeDateFilterCheckbox.replace(
          "all",
          ""
        );
        scampaignTypeDateFilterCheckbox = scampaignTypeDateFilterCheckbox.replace(
          "all,",
          ""
        );
        if (scampaignTypeDateFilterCheckbox.includes(e.currentTarget.value)) {
          scampaignTypeDateFilterCheckbox = scampaignTypeDateFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          scampaignTypeDateFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (scampaignTypeDateFilterCheckbox.includes("all")) {
          scampaignTypeDateFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "campaignTypeDate") {
            for (let i = 0; i < this.state.sortcampaignTypeDate.length; i++) {
              scampaignTypeDateFilterCheckbox +=
                this.state.sortcampaignTypeDate[i].campaignTypeDate + ",";
            }
            scampaignTypeDateFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "campaignStartDate" || column === "all") {
      if (type === "value" && type !== "All") {
        scampaignStartDateFilterCheckbox = scampaignStartDateFilterCheckbox.replace(
          "all",
          ""
        );
        scampaignStartDateFilterCheckbox = scampaignStartDateFilterCheckbox.replace(
          "all,",
          ""
        );
        if (scampaignStartDateFilterCheckbox.includes(e.currentTarget.value)) {
          scampaignStartDateFilterCheckbox = scampaignStartDateFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          scampaignStartDateFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (scampaignStartDateFilterCheckbox.includes("all")) {
          scampaignStartDateFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "campaignStartDate") {
            for (let i = 0; i < this.state.sortcampaignStartDate.length; i++) {
              scampaignStartDateFilterCheckbox +=
                this.state.sortcampaignStartDate[i].campaignStartDate + ",";
            }
            scampaignStartDateFilterCheckbox += "all";
          }
        }
      }
    }
    var allData = this.state.sortAllData;
    this.setState({
      brandColor: "",
      categoryColor: "",
      subCategoryColor: "",
      issueColor: "",
      statusColor: "",
      scampaignNameFilterCheckbox,
      scustomerNameFilterCheckbox,
      scustomerPhoneNumberFilterCheckbox,
      scampaignTypeDateFilterCheckbox,
      scampaignStartDateFilterCheckbox,
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "campaignName") {
      var sItems = scampaignNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.campaignName === sItems[i]
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
        brandColor: "sort-column",
      });
    } else if (column === "customerName") {
      var sItems = scustomerNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.customerName === sItems[i]
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
        categoryColor: "sort-column",
      });
    } else if (column === "customerPhoneNumber") {
      var sItems = scustomerPhoneNumberFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.customerPhoneNumber === sItems[i]
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
        subCategoryColor: "sort-column",
      });
    } else if (column === "campaignTypeDate") {
      var sItems = scampaignTypeDateFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.campaignTypeDate === sItems[i]
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
    } else if (column === "campaignStartDate") {
      var sItems = scampaignStartDateFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.campaignStartDate === sItems[i]
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
      tempunassignCampaignData: itemsArray,
    });
  };
  ////handle filter modal pop in filter text box change value
  filteTextChange(e) {
    this.setState({ filterTxtValue: e.target.value });

    if (this.state.sortColumn === "campaignName") {
      var sortFiltercampaignName = matchSorter(
        this.state.sortcampaignName,
        e.target.value,
        { keys: ["campaignName"] }
      );
      if (sortFiltercampaignName.length > 0) {
        this.setState({ sortFiltercampaignName });
      } else {
        this.setState({
          sortFiltercampaignName: this.state.sortcampaignName,
        });
      }
    }
    if (this.state.sortColumn === "customerName") {
      var sortFiltercustomerName = matchSorter(
        this.state.sortcustomerName,
        e.target.value,
        { keys: ["customerName"] }
      );
      if (sortFiltercustomerName.length > 0) {
        this.setState({ sortFiltercustomerName });
      } else {
        this.setState({
          sortFiltercustomerName: this.state.sortcustomerName,
        });
      }
    }
    if (this.state.sortColumn === "customerPhoneNumber") {
      var sortFiltercustomerPhoneNumber = matchSorter(
        this.state.sortcustomerPhoneNumber,
        e.target.value,
        { keys: ["customerPhoneNumber"] }
      );
      if (sortFiltercustomerPhoneNumber.length > 0) {
        this.setState({ sortFiltercustomerPhoneNumber });
      } else {
        this.setState({
          sortFiltercustomerPhoneNumber: this.state.sortcustomerPhoneNumber,
        });
      }
    }
    if (this.state.sortColumn === "campaignTypeDate") {
      var sortFiltercampaignTypeDate = matchSorter(
        this.state.sortcampaignTypeDate,
        e.target.value,
        {
          keys: ["campaignTypeDate"],
        }
      );
      if (sortFiltercampaignTypeDate.length > 0) {
        this.setState({ sortFiltercampaignTypeDate });
      } else {
        this.setState({
          sortFiltercampaignTypeDate: this.state.sortcampaignTypeDate,
        });
      }
    }
    if (this.state.sortColumn === "campaignStartDate") {
      var sortFiltercampaignStartDate = matchSorter(
        this.state.sortcampaignStartDate,
        e.target.value,
        {
          keys: ["campaignStartDate"],
        }
      );
      if (sortFiltercampaignStartDate.length > 0) {
        this.setState({ sortFiltercampaignStartDate });
      } else {
        this.setState({
          sortFiltercampaignStartDate: this.state.sortcampaignStartDate,
        });
      }
    }
  }
  handleClearSearchFilter = () => {
    
    this.setState({
      unassignCampaignData: this.state.sortAllData,
      scampaignNameFilterCheckbox: "",
      scustomerNameFilterCheckbox: "",
      scustomerPhoneNumberFilterCheckbox: "",
      scampaignTypeDateFilterCheckbox: "",
      scampaignStartDateFilterCheckbox: "",
      StatusModel: false,
      filterTxtValue: "",
      sFilterCheckbox: "",
      sortColumn: "",
      sortHeader: "",
      tempunassignCampaignData: [],
    });
  };
  handleCampaignUpdateDateChange = (e) => {
    
    this.setState({
      campaignUploadDate: e,
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
                  isUploadCampaign: this.state.isUploadCampaign,
                  isEditCampaign: this.state.isEditCampaign,
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
                      <div className="right-sect-div">
                        <h3>Unassigned Campaign </h3>

                        <button
                          className="Schedulenext1 w-100 mb-0 mt-4"
                          type="button"
                          onClick={this.handleSearchButtonClick.bind(this)}
                        >
                          Search
                        </button>
                        {this.state.isSearchClick ? (
                          <div className="cmpaign-channel-table slot-setting-options usassign-campaign-search">
                            <div className="w-100">
                              <div className="module-switch-cntr">
                                <div className="module-switch">
                                  <div className="switch switch-primary">
                                    <label className="storeRole-name-text m-0">
                                      Campaign Name
                                    </label>
                                    <Select
                                      style={{ width: "100%" }}
                                      placeholder="Select Campaign Name"
                                      showSearch
                                      optionFilterProp="children"
                                      notFoundContent="No Data Found"
                                      onChange={this.handleSearchCampaignNameChanage.bind(
                                        this
                                      )}
                                      value={this.state.selctedSearchCampaignID}
                                    >
                                      {this.state.campaignNameData.length > 0
                                        ? this.state.campaignNameData.map(
                                            (item, key) => {
                                              return (
                                                <Option
                                                  key={key}
                                                  value={item.campaignNameID}
                                                >
                                                  {item.campaignName}
                                                </Option>
                                              );
                                            }
                                          )
                                        : null}
                                    </Select>
                                  </div>
                                  <div className="switch switch-primary">
                                    <label className="storeRole-name-text m-0">
                                      Customer Store Code
                                    </label>
                                    <Select
                                      style={{ width: "100%" }}
                                      showSearch
                                      optionFilterProp="children"
                                      placeholder="Select Store Code"
                                      notFoundContent="No Data Found"
                                      onChange={this.handleSearchStoreCodeChanage.bind(
                                        this
                                      )}
                                      value={this.state.selctedSearchStoreCode}
                                    >
                                      {this.state.storeData.length > 0
                                        ? this.state.storeData.map(
                                            (item, key) => {
                                              return (
                                                <Option
                                                  key={key}
                                                  value={item.storeCode}
                                                >
                                                  {item.storeCode}
                                                </Option>
                                              );
                                            }
                                          )
                                        : null}
                                    </Select>
                                  </div>
                                  <div className="switch switch-primary">
                                    <label className="storeRole-name-text m-0">
                                      Campaign Uploaded Date
                                    </label>
                                    <DatePicker
                                      format="DD-MM-YYYY"
                                      className="cm-ud-date"
                                      placeholder="Select Campaign Uploaded Date"
                                      value={this.state.campaignUploadDate}
                                      onChange={this.handleCampaignUpdateDateChange.bind(
                                        this
                                      )}
                                    />
                                  </div>
                                </div>
                              </div>
                              <button
                                className="Schedulenext1 w-100 mb-0 mt-4"
                                type="button"
                                onClick={this.handleGetStoreUnAssignedCampaign.bind(
                                  this,
                                  true
                                )}
                              >
                                {"Next >>"}
                              </button>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {this.state.isSearch ? (
                      <div className="col-md-12">
                        <a
                          onClick={this.handleClearSearch.bind(this)}
                          style={{ color: "#1890ff" }}
                        >
                          Clear Search
                        </a>
                      </div>
                    ) : null}
                    <div className="col-md-12">
                      <Table
                        loading={this.state.loading}
                        noDataContent="No Record Found"
                        className="components-table-demo-nested antd-table-campaign custom-antd-table unassignCampaign-list"
                        columns={[
                          {
                            title: (
                              <span
                                style={{ cursor: "pointer" }}
                                className={
                                  this.state.sortColumn === "campaignName"
                                    ? "sort-column"
                                    : ""
                                }
                              >
                                Campaign Name
                                <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            dataIndex: "campaignName",
                            onHeaderCell: (column) => {
                              return {
                                onClick: () => {
                                  if (
                                    this.state.scustomerNameFilterCheckbox !==
                                      "" ||
                                    this.state
                                      .scustomerPhoneNumberFilterCheckbox !==
                                      "" ||
                                    this.state
                                      .scampaignTypeDateFilterCheckbox !== "" ||
                                    this.state
                                      .scampaignStartDateFilterCheckbox !== ""
                                  ) {
                                    this.setState({
                                      StatusModel: true,
                                      sortColumn: "campaignName",
                                      sortHeader: "campaignName",
                                    });
                                  } else {
                                    this.setState({
                                      scustomerNameFilterCheckbox: "",
                                      scustomerPhoneNumberFilterCheckbox: "",
                                      scampaignTypeDateFilterCheckbox: "",
                                      scampaignStartDateFilterCheckbox: "",
                                      StatusModel: true,
                                      sortColumn: "campaignName",
                                      sortHeader: "campaignName",
                                    });
                                  }
                                },
                              };
                            },
                          },
                          {
                            title: (
                              <span
                                style={{ cursor: "pointer" }}
                                className={
                                  this.state.sortColumn === "customerName"
                                    ? "sort-column"
                                    : ""
                                }
                              >
                                Customer Name
                                <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            dataIndex: "customerName",
                            onHeaderCell: (column) => {
                              return {
                                onClick: () => {
                                  if (
                                    this.state.scampaignNameFilterCheckbox !==
                                      "" ||
                                    this.state
                                      .scustomerPhoneNumberFilterCheckbox !==
                                      "" ||
                                    this.state
                                      .scampaignTypeDateFilterCheckbox !== "" ||
                                    this.state
                                      .scampaignStartDateFilterCheckbox !== ""
                                  ) {
                                    this.setState({
                                      StatusModel: true,
                                      sortColumn: "customerName",
                                      sortHeader: "customerName",
                                    });
                                  } else {
                                    this.setState({
                                      scampaignNameFilterCheckbox: "",
                                      scustomerPhoneNumberFilterCheckbox: "",
                                      scampaignTypeDateFilterCheckbox: "",
                                      scampaignStartDateFilterCheckbox: "",
                                      StatusModel: true,
                                      sortColumn: "customerName",
                                      sortHeader: "customerName",
                                    });
                                  }
                                },
                              };
                            },
                          },
                          {
                            title: (
                              <span
                                style={{ cursor: "pointer" }}
                                className={
                                  this.state.sortColumn ===
                                  "customerPhoneNumber"
                                    ? "sort-column"
                                    : ""
                                }
                              >
                                Mobile No
                                <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            dataIndex: "customerPhoneNumber",
                            onHeaderCell: (column) => {
                              return {
                                onClick: () => {
                                  if (
                                    this.state.scampaignNameFilterCheckbox !==
                                      "" ||
                                    this.state.scustomerNameFilterCheckbox !==
                                      "" ||
                                    this.state
                                      .scampaignTypeDateFilterCheckbox !== "" ||
                                    this.state
                                      .scampaignStartDateFilterCheckbox !== ""
                                  ) {
                                    this.setState({
                                      StatusModel: true,
                                      sortColumn: "customerPhoneNumber",
                                      sortHeader: "customerPhoneNumber",
                                    });
                                  } else {
                                    this.setState({
                                      scampaignNameFilterCheckbox: "",
                                      scustomerNameFilterCheckbox: "",
                                      scampaignTypeDateFilterCheckbox: "",
                                      scampaignStartDateFilterCheckbox: "",
                                      StatusModel: true,
                                      sortColumn: "customerPhoneNumber",
                                      sortHeader: "customerPhoneNumber",
                                    });
                                  }
                                },
                              };
                            },
                          },
                          {
                            title: (
                              <span
                                style={{ cursor: "pointer" }}
                                className={
                                  this.state.sortColumn === "campaignTypeDate"
                                    ? "sort-column"
                                    : ""
                                }
                              >
                                Campaign Date
                                <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            dataIndex: "campaignTypeDate",
                            onHeaderCell: (column) => {
                              return {
                                onClick: () => {
                                  if (
                                    this.state.scampaignNameFilterCheckbox !==
                                      "" ||
                                    this.state.scustomerNameFilterCheckbox !==
                                      "" ||
                                    this.state
                                      .scustomerPhoneNumberFilterCheckbox !==
                                      "" ||
                                    this.state
                                      .scampaignStartDateFilterCheckbox !== ""
                                  ) {
                                    this.setState({
                                      StatusModel: true,
                                      sortColumn: "campaignTypeDate",
                                      sortHeader: "campaignTypeDate",
                                    });
                                  } else {
                                    this.setState({
                                      scampaignNameFilterCheckbox: "",
                                      scustomerNameFilterCheckbox: "",
                                      scustomerPhoneNumberFilterCheckbox: "",
                                      scampaignStartDateFilterCheckbox: "",
                                      StatusModel: true,
                                      sortColumn: "campaignTypeDate",
                                      sortHeader: "campaignTypeDate",
                                    });
                                  }
                                },
                              };
                            },
                          },
                          {
                            title: (
                              <span
                                style={{ cursor: "pointer" }}
                                className={
                                  this.state.sortColumn === "campaignStartDate"
                                    ? "sort-column"
                                    : ""
                                }
                              >
                                Campaign Start Date
                                <FontAwesomeIcon icon={faCaretDown} />
                              </span>
                            ),
                            dataIndex: "campaignStartDate",
                            onHeaderCell: (column) => {
                              return {
                                onClick: () => {
                                  if (
                                    this.state.scampaignNameFilterCheckbox !==
                                      "" ||
                                    this.state.scustomerNameFilterCheckbox !==
                                      "" ||
                                    this.state
                                      .scustomerPhoneNumberFilterCheckbox !==
                                      "" ||
                                    this.state
                                      .scampaignTypeDateFilterCheckbox !== ""
                                  ) {
                                    this.setState({
                                      StatusModel: true,
                                      sortColumn: "campaignStartDate",
                                      sortHeader: "campaignStartDate",
                                    });
                                  } else {
                                    this.setState({
                                      scampaignNameFilterCheckbox: "",
                                      scustomerNameFilterCheckbox: "",
                                      scustomerPhoneNumberFilterCheckbox: "",
                                      scampaignTypeDateFilterCheckbox: "",
                                      StatusModel: true,
                                      sortColumn: "campaignStartDate",
                                      sortHeader: "campaignStartDate",
                                    });
                                  }
                                },
                              };
                            },
                          },
                        ]}
                        pagination={{
                          responsive: true,
                          defaultPageSize: 10,
                          pageSizeOptions: [10, 20, 50, 100],
                          showSizeChanger: true,
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
            <span
              style={{
                margin: "0 25px",
                textDecoration: "underline",
                color: "#1890ff",
                cursor: "pointer",
              }}
              onClick={this.handleClearSearchFilter.bind(this)}
            >
              {TranslationContext !== undefined
                ? TranslationContext.a.clearsearch
                : "clear search"}
            </span>
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
                      this.state.scampaignNameFilterCheckbox.includes("all") ||
                      this.state.scustomerNameFilterCheckbox.includes("all") ||
                      this.state.scustomerPhoneNumberFilterCheckbox.includes(
                        "all"
                      ) ||
                      this.state.scampaignTypeDateFilterCheckbox.includes(
                        "all"
                      ) ||
                      this.state.scampaignStartDateFilterCheckbox.includes(
                        "all"
                      )
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
                {this.state.sortColumn === "campaignName"
                  ? this.state.sortFiltercampaignName !== null &&
                    this.state.sortFiltercampaignName.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.campaignName}
                          value={item.campaignName}
                          checked={this.state.scampaignNameFilterCheckbox.includes(
                            item.campaignName
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "campaignName",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.campaignName}>
                          <span className="table-btn table-blue-btn">
                            {item.campaignName}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}

                {this.state.sortColumn === "customerName"
                  ? this.state.sortFiltercustomerName !== null &&
                    this.state.sortFiltercustomerName.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.customerName}
                          value={item.customerName}
                          checked={this.state.scustomerNameFilterCheckbox.includes(
                            item.customerName
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "customerName",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.customerName}>
                          <span className="table-btn table-blue-btn">
                            {item.customerName}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}

                {this.state.sortColumn === "customerPhoneNumber"
                  ? this.state.sortFiltercustomerPhoneNumber !== null &&
                    this.state.sortFiltercustomerPhoneNumber.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.customerPhoneNumber}
                          value={item.customerPhoneNumber}
                          checked={this.state.scustomerPhoneNumberFilterCheckbox.includes(
                            item.customerPhoneNumber
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "customerPhoneNumber",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.customerPhoneNumber}>
                          <span className="table-btn table-blue-btn">
                            {item.customerPhoneNumber}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}

                {this.state.sortColumn === "campaignTypeDate"
                  ? this.state.sortFiltercampaignTypeDate !== null &&
                    this.state.sortFiltercampaignTypeDate.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.campaignTypeDate}
                          value={item.campaignTypeDate}
                          checked={this.state.scampaignTypeDateFilterCheckbox.includes(
                            item.campaignTypeDate
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "campaignTypeDate",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.campaignTypeDate}>
                          <span className="table-btn table-blue-btn">
                            {item.campaignTypeDate}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}

                {this.state.sortColumn === "campaignStartDate"
                  ? this.state.sortFiltercampaignStartDate !== null &&
                    this.state.sortFiltercampaignStartDate.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.campaignStartDate}
                          value={item.campaignStartDate}
                          checked={this.state.scampaignStartDateFilterCheckbox.includes(
                            item.campaignStartDate
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "campaignStartDate",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.campaignStartDate}>
                          <span className="table-btn table-blue-btn">
                            {item.campaignStartDate}
                          </span>
                        </label>
                      </div>
                    ))
                  : null}
              </div>
            </div>
            <button className="filer-ok-btn" onClick={this.StatusCloseModel}>
              OK
            </button>
          </div>
        </Modal>
      </Fragment>
    );
  }
}
export default UnasignCampaign;
