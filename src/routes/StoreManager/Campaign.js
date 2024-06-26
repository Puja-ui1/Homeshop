import React, { Component } from "react";
import { authHeader } from "./../../helpers/authHeader";
import CancelIcon from "./../../assets/Images/cancel.png";
import ViewComment from "./../../assets/Images/order-info.png";
import axios from "axios";
import config from "./../../helpers/config";
import { Table, Popover, Spin, Empty } from "antd";
import DatePicker from "react-datepicker";
import moment from "moment";
import { NotificationManager } from "react-notifications";
import Modal from "react-responsive-modal";
import * as translationHI from "../../translations/hindi";
import * as translationMA from "../../translations/marathi";
import ReactTable from "react-table";
import Demo from "../../store/Hashtag";
import CampaignDateRangeFilter from "./CampaignDateRangeFilter";

class Campaign extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FirstCollapse: false,
      TwoCollapse: false,
      campaignGridData: [],
      rowExpandedCount: 0,
      raisedTicketModal: false,
      brandData: [],
      categoryData: [],
      subCategoryData: [],
      issueTypeData: [],
      modalData: {},
      isName: "",
      isMobile: "",
      isEmail: "",
      isBrand: "",
      isCategory: "",
      isSubCategory: "",
      isIssueType: "",
      isTiketTitle: "",
      isTiketDetails: "",
      loading: false,
      translateLanguage: {},
      CampaignStatusFilter: false,
      strCampStatus: "",
      custNameModal: false,
      sortCustName: "",
      lastTransactionItem: [],
      lasttransactiondetails: {},
      customerName: "",
      customerNumber: "",
      useratvdetails: {},
      searchedCustomerId: 0,
      camStatusID: 0,
      AddCommentModal: false,
      orderPopoverOverlay: false,
      CampaignResponseFltr: false,
      CampaignCallRescheduledFltr: false,
      addCommentFlag: false,
      raiseTicketFlag: false,
      campaignTypeID: 0,
      campaignComment: "",
      cmpViewComment: [],
      CmpViewCmtLoading: false,
      campChildStatusFltData: [],
      campChildResponseFltData: [],
      creationStart: "",
      creationEnd: "",
      strCampResponse: "",
      expandedRowKeys: "",
    };
    this.firstActionOpenClps = this.firstActionOpenClps.bind(this);
    this.twoActionOpenClps = this.twoActionOpenClps.bind(this);
    this.handleCampaignGridData = this.handleCampaignGridData.bind(this);
    this.onRowExpand = this.onRowExpand.bind(this);
    this.onStatusChange = this.onStatusChange.bind(this);
    this.handleRaisedTicketModalClose = this.handleRaisedTicketModalClose.bind(
      this
    );
    this.handleRaisedTicketModalOpen = this.handleRaisedTicketModalOpen.bind(
      this
    );
  }

  componentDidMount() {
    this.handleCampaignGridData();
    this.handleGetBrand();
    this.handleGetCampaignSettingList();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  onRowExpand(expanded, record) {
    let rowExpandedCount;
    var keys = [];

    if (expanded) {
      rowExpandedCount = this.state.rowExpandedCount + 1;
      var finalExpandId = record.expand_campaignID - 1;
      keys.push(finalExpandId);
      this.setState({
        rowExpandedCount,
        campaignTypeID: record.campaignTypeID,
        expandedRowKeys: keys,
      });
    } else {
      rowExpandedCount = this.state.rowExpandedCount - 1;
      this.setState({
        rowExpandedCount,
        expandedRowKeys: [],
      });
    }
  }

  onStatusChange(campaignTypeID, campaignCustomerID, e) {
    this.state.campaignGridData
      .filter((x) => x.campaignTypeID == campaignTypeID)[0]
      .storeCampaignCustomerList.filter(
        (x) => x.campaignCustomerID == campaignCustomerID
      )[0].campaignStatus = parseInt(e.target.value);
    this.state.campaignGridData
      .filter((x) => x.campaignTypeID == campaignTypeID)[0]
      .storeCampaignCustomerList.filter(
        (x) => x.campaignCustomerID == campaignCustomerID
      )[0].response = 0;
    this.state.campaignGridData
      .filter((x) => x.campaignTypeID == campaignTypeID)[0]
      .storeCampaignCustomerList.filter(
        (x) => x.campaignCustomerID == campaignCustomerID
      )[0].callReScheduledTo = "";
    this.setState({
      campaignGridData: this.state.campaignGridData,
      camStatusID: parseInt(e.target.value),
    });
  }

  onResponseChange(campaignTypeID, campaignCustomerID, e) {
    this.state.campaignGridData
      .filter((x) => x.campaignTypeID == campaignTypeID)[0]
      .storeCampaignCustomerList.filter(
        (x) => x.campaignCustomerID == campaignCustomerID
      )[0].response = parseInt(e.target.value);
    this.setState({ campaignGridData: this.state.campaignGridData });
  }

  onDateChange(campaignTypeID, campaignCustomerID, e) {
    this.state.campaignGridData
      .filter((x) => x.campaignTypeID == campaignTypeID)[0]
      .storeCampaignCustomerList.filter(
        (x) => x.campaignCustomerID == campaignCustomerID
      )[0].callReScheduledTo = e;
    this.setState({ campaignGridData: this.state.campaignGridData });
  }
  /// handle get campaign grid data
  handleCampaignGridData() {
    let self = this;
    this.setState({
      loading: true,
    });
    axios({
      method: "post",
      // url: config.apiUrl + "/StoreTask/GetStoreCampaignCustomer",
      url: config.apiUrl + "/StoreTask/GetStoreCampaignCustomerNew",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          var expand_campaignID = 0;

          data.forEach((element) => {
            element.expand_campaignID = expand_campaignID + 1;
            expand_campaignID++;
          });
          self.setState({
            campaignGridData: data,
          });

          self.handleGetCampChildStatusData();
        } else {
          self.setState({
            campaignGridData: [],
          });
        }
        self.setState({
          loading: false,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle get campaign child table status filter data
  handleGetCampChildStatusData() {
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetCampaignStatusResponse",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData.campaignStatusList;
        if (status === "Success") {
          self.setState({
            campChildStatusFltData: data,
          });
        } else {
          self.setState({
            campChildStatusFltData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle get campaign child table status filter data
  handleGetCampChildResponseData() {
    let self = this;
    var filterIds = "";
    if (this.state.strCampStatus !== "") {
      filterIds = this.state.strCampStatus;
    } else {
      filterIds = "All";
    }
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetCampaignResponseByStatus",
      headers: authHeader(),
      params: {
        statusID: filterIds,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            campChildResponseFltData: data,
          });
        } else {
          self.setState({
            campChildResponseFltData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleUpdateCampaignStatusResponse(
    campaignCustomerID,
    campaignStatus,
    response,
    callReScheduledTo,
    e
  ) {
    let self = this,
      calculatedCallReScheduledTo;

    this.setState({
      loading: true,
    });

    if (campaignStatus === 102 || campaignStatus === 100) {
      calculatedCallReScheduledTo = callReScheduledTo;
    } else {
      calculatedCallReScheduledTo = "";
    }

    // update campaign
    axios({
      method: "post",
      // url: config.apiUrl + "/StoreTask/UpdateCampaignStatusResponse",
      url: config.apiUrl + "/StoreTask/UpdateCampaignStatusResponseNew",
      headers: authHeader(),
      data: {
        CampaignCustomerID: campaignCustomerID,
        StatusNameID: campaignStatus,
        ResponseID: response,
        CallReScheduledTo: calculatedCallReScheduledTo,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("Record saved successFully.");
          self.handleCampaignGridData();
        } else {
          self.setState({
            loading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleCloseCampaign(campaignTypeID, e) {
    let self = this;
    this.setState({
      loading: true,
    });

    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/CloseCampaign",
      headers: authHeader(),
      params: {
        CampaignTypeID: campaignTypeID,
        IsClosed: 1,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success("Campaign closed successFully.");
          self.handleCampaignGridData();
        } else {
          self.setState({
            loading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  firstActionOpenClps() {
    this.setState((state) => ({ FirstCollapse: !state.FirstCollapse }));
  }
  twoActionOpenClps() {
    this.setState((state) => ({ TwoCollapse: !state.TwoCollapse }));
  }

  handleCreateTicket() {
    if (this.state.modalData.tiketTitle == "") {
      this.setState({ isTiketTitle: "Please Enter Ticket Title." });
    } else {
      this.setState({ isTiketTitle: "" });
    }
    if (this.state.modalData.tiketDetails == "") {
      this.setState({ isTiketDetails: "Please Enter Ticket Details." });
    } else {
      this.setState({ isTiketDetails: "" });
    }
    if (this.state.modalData.brandId == "") {
      this.setState({ isBrand: "Please select Brand." });
    } else {
      this.setState({ isBrand: "" });
    }
    if (this.state.modalData.cateogryId == "") {
      this.setState({ isCategory: "Please select Category." });
    } else {
      this.setState({ isCategory: "" });
    }
    if (this.state.modalData.subCategoryId == "") {
      this.setState({ isSubCategory: "Please select Sub Category." });
    } else {
      this.setState({ isSubCategory: "" });
    }
    if (this.state.modalData.issueTypeId == "") {
      this.setState({ isIssueType: "Please select Issue Type." });
    } else {
      this.setState({ isIssueType: "" });
    }

    let self = this;
    // if (
    //   this.state.modalData.tiketTitle !== "" &&
    //   this.state.modalData.tiketDetails.length > 0 &&
    //   this.state.modalData.brandId.length > 0 &&
    //   this.state.modalData.cateogryId.length > 0 &&
    //   this.state.modalData.subCategoryId.length > 0 &&
    //   this.state.modalData.issueTypeId.length > 0
    // ) {

    setTimeout(() => {
      if (
        this.state.isTiketTitle == "" &&
        this.state.isTiketDetails == "" &&
        this.state.isBrand == "" &&
        this.state.isCategory == "" &&
        this.state.isSubCategory == "" &&
        this.state.isIssueType == ""
      ) {
        axios({
          method: "post",
          url: config.apiUrl + "/Customer/searchCustomer",
          headers: authHeader(),
          params: {
            SearchText: this.state.modalData.mobile.trim(),
          },
        })
          .then(function(res) {
            let SearchData = res.data.responseData[0];
            if (SearchData) {
              let GetCustId = SearchData.customerID;
              self.setState({
                searchedCustomerId: GetCustId,
              });
              setTimeout(() => {
                createTicketAfterChecking();
              }, 10);
            } else {
              axios({
                method: "post",
                url: config.apiUrl + "/Customer/createCustomer",
                headers: authHeader(),
                data: {
                  CustomerName: self.state.modalData.name.trim(),
                  CustomerPhoneNumber: self.state.modalData.mobile.trim(),
                  CustomerEmailId: "",
                  GenderID: 1,
                  AltNumber: "",
                  AltEmailID: "",
                  DateOfBirth: "",
                  IsActive: 1,
                },
              })
                .then(function(res) {
                  let responseMessage = res.data.message;
                  let custId = res.data.responseData;
                  if (responseMessage === "Success") {
                    self.setState({
                      searchedCustomerId: custId,
                    });
                    setTimeout(() => {
                      createTicketAfterChecking();
                    }, 10);
                  }
                })
                .catch((data) => {
                  console.log(data);
                });
            }
          })
          .catch((data) => {
            console.log(data);
          });
      }
    }, 10);

    const createTicketAfterChecking = () => {
      let self = this;

      const formData = new FormData();

      var mailData = [];
      var mailFiled = {};
      mailFiled["ToEmail"] = "";
      mailFiled["TikcketMailSubject"] = "";
      mailFiled["TicketMailBody"] = "";
      mailFiled["PriorityID"] = -9;
      mailFiled["IsInforToStore"] = false;
      mailData.push(mailFiled);

      var paramData = {
        TicketTitle: this.state.modalData.tiketTitle,
        Ticketdescription: this.state.modalData.tiketDetails,
        // CustomerID: this.state.modalData.customerId,
        CustomerID: this.state.searchedCustomerId,
        BrandID: this.state.modalData.brandId,
        CategoryID: this.state.modalData.cateogryId,
        SubCategoryID: this.state.modalData.subCategoryId,
        IssueTypeID: this.state.modalData.issueTypeId,
        PriorityID: -9,
        ChannelOfPurchaseID: -9,
        Ticketnotes: "",
        taskMasters: [],
        StatusID: this.state.camStatusID,
        TicketActionID: -9,
        IsInstantEscalateToHighLevel: 0,
        IsWantToAttachOrder: 1,
        TicketTemplateID: 0,
        TicketMailBody: "",
        IsWantToVisitedStore: 0,
        IsAlreadyVisitedStore: 0,
        TicketSourceID: 1,
        OrderItemID: "",
        StoreID: "",
        ticketingMailerQues: mailData,
        IsGenFromStoreCamPaign: true,
      };
      formData.append("ticketingDetails", JSON.stringify(paramData));
      formData.append("Filedata", []);
      formData.append("orderDetails", null);
      formData.append("orderItemDetails", null);
      formData.append("storeDetails", null);

      // create ticket
      axios({
        method: "post",
        url: config.apiUrl + "/Ticketing/createTicket",
        headers: authHeader(),
        data: formData,
      })
        .then(function(res) {
          let Msg = res.data.status;
          let TID = res.data.responseData;
          if (Msg) {
            NotificationManager.success(res.data.message);
            self.setState({ raisedTicketModal: false });
          } else {
            NotificationManager.error(res.data.message);
          }
        })
        .catch((data) => {
          console.log(data);
        });
    };

    // } else {
    //   this.setState({
    //     isTiketTitle: "Ticket Title field is compulsory.",
    //     isTiketDetails: "Ticket Details field is compulsory.",
    //     isBrand: "Brand field is compulsory.",
    //     isCategory: "Category field is compulsory.",
    //     isSubCategory: "Sub Category field is compulsory.",
    //     isIssueType: "Issue Type field is compulsory."
    //   });
    // }

    // Don't remove this function
  }

  ////handle raised ticket modal close
  handleRaisedTicketModalClose() {
    this.setState({
      raisedTicketModal: false,
    });
  }
  ////handle raised ticket modal open
  handleRaisedTicketModalOpen(row, item) {
    var modalData = {};
    modalData.name = row.customerName;
    modalData.customerId = row.customerID;
    modalData.mobile = row.customerPhoneNumber;
    modalData.email = row.customerEmailId;
    modalData.dateofbrith = row.dob;
    modalData.brandId = "";
    modalData.cateogryId = "";
    modalData.subCategoryId = "";
    modalData.issueTypeId = "";
    modalData.tiketTitle = "";
    modalData.tiketDetails = "";

    this.setState({
      modalData,
      raisedTicketModal: true,
      categoryData: [],
      subCategoryData: [],
      issueTypeData: [],
      isBrand: "",
      isCategory: "",
      isSubCategory: "",
      isIssueType: "",
      isTiketTitle: "",
      isTiketDetails: "",
      searchedCustomerId: 0,
    });
  }

  ////handle get brand list
  handleGetBrand() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader(),
    })
      .then(function(response) {
        var message = response.data.message;
        var brandData = response.data.responseData;
        if (message == "Success" && brandData.length > 0) {
          self.setState({ brandData });
        } else {
          self.setState({ brandData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetBrand");
      });
  }
  ////handle get category by brand id list
  handleGetCateogory() {
    let self = this;

    var brandID = this.state.modalData.brandId;
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryList",
      headers: authHeader(),
      params: { BrandID: Number(brandID) },
    })
      .then(function(response) {
        var categoryData = response.data;
        if (categoryData.length > 0) {
          self.setState({ categoryData });
        } else {
          self.setState({ categoryData: [] });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetCateogory");
      });
  }

  ////handle get sub category by category id list
  handleGetSubCateogory() {
    let self = this;
    var categoryID = this.state.modalData.cateogryId;
    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/GetSubCategoryByCategoryID",
      headers: authHeader(),
      params: { CategoryID: categoryID },
    })
      .then(function(response) {
        var message = response.data.message;
        var subCategoryData = response.data.responseData;
        if (message == "Success" && subCategoryData.length > 0) {
          self.setState({ subCategoryData });
        } else {
          self.setState({ subCategoryData: [] });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetSubCateogory");
      });
  }

  ////handle get issue type by sub category list
  handleGetIssueType() {
    let self = this;
    var subCategoryId = this.state.modalData.subCategoryId;
    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/GetIssueTypeList",
      headers: authHeader(),
      params: { SubCategoryID: subCategoryId },
    })
      .then(function(response) {
        var message = response.data.message;
        var issueTypeData = response.data.responseData;
        if (message == "Success" && issueTypeData.length > 0) {
          self.setState({ issueTypeData });
        } else {
          self.setState({ issueTypeData: [] });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetSubCateogory");
      });
  }

  handleOnchange = (e) => {
    const { name, value } = e.target;
    var modalData = this.state.modalData;
    if (name == "name") {
      if (value !== "") {
        modalData["name"] = value;
        this.setState({ modalData, isName: "" });
      } else {
        modalData["name"] = value;
        this.setState({ modalData, isName: "Please Enter Name." });
      }
    }
    if (name == "mobile") {
      if (value !== "") {
        modalData["mobile"] = value;
        this.setState({ modalData, isMobile: "" });
      } else {
        modalData["mobile"] = value;
        this.setState({ modalData, isMobile: "Please Enter Mobile No." });
      }
    }
    if (name == "email") {
      if (value !== "") {
        modalData["email"] = value;
        this.setState({ modalData, isEmail: "" });
      } else {
        modalData["email"] = value;
        this.setState({ modalData, isEmail: "Please Enter Email." });
      }
    }
    if (name == "dateofbrith") {
      if (value !== 0) {
        this.setState({
          priorityID: value,
          ispriority: "",
        });
      } else {
        this.setState({
          ispriority: "Please Select Priority.",
          priorityID: value,
        });
      }
    }
    if (name == "brand") {
      if (value !== "") {
        modalData["brandId"] = value;
        modalData["cateogryId"] = 0;
        modalData["subCategoryId"] = 0;
        modalData["issueTypeId"] = 0;
        this.setState({
          modalData,
          isBrand: "",
          categoryData: [],
          subCategoryData: [],
          issueTypeData: [],
        });
        setTimeout(() => {
          this.handleGetCateogory();
        }, 10);
      } else {
        modalData["brandId"] = value;
        modalData["cateogryId"] = 0;
        modalData["subCategoryId"] = 0;
        modalData["issueTypeId"] = 0;
        this.setState({
          modalData,
          isBrand: "Please Select Brand.",
          categoryData: [],
          subCategoryData: [],
          issueTypeData: [],
        });
      }
    }
    if (name == "category") {
      if (value !== "") {
        modalData["cateogryId"] = value;
        modalData["subCategoryId"] = 0;
        modalData["issueTypeId"] = 0;
        this.setState({
          modalData,
          isCategory: "",
          subCategoryData: [],
          issueTypeData: [],
        });
        setTimeout(() => {
          this.handleGetSubCateogory();
        }, 10);
      } else {
        modalData["cateogryId"] = value;
        modalData["subCategoryId"] = 0;
        modalData["issueTypeId"] = 0;
        this.setState({
          modalData,
          isCategory: "Please Select Category.",
          subCategoryData: [],
          issueTypeData: [],
        });
      }
    }
    if (name == "subCategory") {
      if (value !== "") {
        modalData["subCategoryId"] = value;
        modalData["issueTypeId"] = 0;
        this.setState({ modalData, isSubCategory: "", issueTypeData: [] });
        setTimeout(() => {
          this.handleGetIssueType();
        }, 10);
      } else {
        modalData["subCategoryId"] = value;
        modalData["issueTypeId"] = 0;
        this.setState({
          modalData,
          isSubCategory: "Please Select Sub Category.",
          issueTypeData: [],
        });
      }
    }
    if (name == "issueType") {
      if (value !== "") {
        modalData["issueTypeId"] = value;
        this.setState({ modalData, isIssueType: "" });
      } else {
        modalData["issueTypeId"] = value;
        this.setState({ modalData, isIssueType: "Please Select issueType." });
      }
    }
    if (name == "tiketTitle") {
      if (value !== "") {
        modalData["tiketTitle"] = value;
        this.setState({ modalData, isTiketTitle: "" });
      } else {
        modalData["tiketTitle"] = value;
        this.setState({
          modalData,
          isTiketTitle: "Please Enter Ticket Title.",
        });
      }
    }
    if (name == "tiketDetails") {
      if (value !== "") {
        modalData["tiketDetails"] = value;
        this.setState({ modalData, isTiketDetails: "" });
      } else {
        modalData["tiketDetails"] = value;
        this.setState({
          modalData,
          isTiketDetails: "Please Enter Tiket Details.",
        });
      }
    }
  };

  /// handle Campaign status filter for all select
  handleCheckCampAllStatus(event) {
    var strCampStatus = "";
    const allCheckboxChecked = event.target.checked;
    var checkboxes = document.getElementsByName("CampallStatus");
    if (allCheckboxChecked) {
      for (var i in checkboxes) {
        if (checkboxes[i].checked === false) {
          checkboxes[i].checked = true;
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strCampStatus = "All";
        }
      }
    } else {
      for (var J in checkboxes) {
        if (checkboxes[J].checked === true) {
          checkboxes[J].checked = false;
        }
      }
      strCampStatus = "";
    }
    this.setState({
      CampaignStatusFilter: false,
      strCampStatus,
    });
    setTimeout(() => {
      this.handleSearchCampaigFilterData();
      this.handleGetCampChildResponseData();
    }, 50);
  }

  /// handle Campaign status filter for individual select
  handleCheckCampIndividualStatus() {
    var checkboxes = document.getElementsByName("CampallStatus");
    var strCampStatus = "";
    for (var i in checkboxes) {
      if (isNaN(i) === false) {
        if (checkboxes[i].checked === true) {
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strCampStatus += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    }
    this.setState({
      CampaignStatusFilter: false,
      strCampStatus,
    });
    setTimeout(() => {
      this.handleSearchCampaigFilterData();
      this.handleGetCampChildResponseData();
    }, 50);
  }
  /// handle Campaign status filter for all select
  handleCheckCampAllResponse(event) {
    var strCampResponse = "";
    const allCheckboxChecked = event.target.checked;
    var checkboxes = document.getElementsByName("CampallResposnse");
    if (allCheckboxChecked) {
      for (var i in checkboxes) {
        if (checkboxes[i].checked === false) {
          checkboxes[i].checked = true;
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strCampResponse = "All";
        }
      }
    } else {
      for (var J in checkboxes) {
        if (checkboxes[J].checked === true) {
          checkboxes[J].checked = false;
        }
      }
      strCampResponse = "";
    }
    this.setState({
      CampaignResponseFltr: false,
      strCampResponse,
    });
    setTimeout(() => {
      this.handleSearchCampaigFilterData();
    }, 50);
  }
  /// handle Campaign response filter for individual select
  handleCheckCampIndividualResponse() {
    var checkboxes = document.getElementsByName("CampallResposnse");
    var strCampResponse = "";
    for (var i in checkboxes) {
      if (isNaN(i) === false) {
        if (checkboxes[i].checked === true) {
          if (checkboxes[i].getAttribute("attrIds") !== null)
            strCampResponse += checkboxes[i].getAttribute("attrIds") + ",";
        }
      }
    }
    this.setState({
      CampaignResponseFltr: false,
      strCampResponse,
    });
    setTimeout(() => {
      this.handleSearchCampaigFilterData();
    }, 50);
  }
  /// handle Search Campaign Status
  handleSearchCampaigFilterData() {
    let self = this;
    var filterStatus = this.state.strCampStatus;
    var filterResponse = this.state.strCampResponse;
    var filterFromDate =
      this.state.creationStart !== ""
        ? moment(new Date(this.state.creationStart)).format("YYYY-MM-DD")
        : "";
    var filterFromTo =
      this.state.creationEnd !== ""
        ? moment(new Date(this.state.creationEnd)).format("YYYY-MM-DD")
        : "";

    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/FilterStoreCampaignCustomer",
      headers: authHeader(),
      params: {
        CampaignTypeID: this.state.campaignTypeID,
        statusID: filterStatus !== "All" ? filterStatus : "All",
        ResponseID: filterResponse !== "All" ? filterResponse : "All",
        FromDate: filterFromDate !== "" ? filterFromDate : null,
        ToDate: filterFromTo !== "" ? filterFromTo : null,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          var expand_campaignID = 0;

          data.forEach((element) => {
            element.expand_campaignID = expand_campaignID + 1;
            expand_campaignID++;
          });
          self.setState({
            campaignGridData: data,
            CampaignCallRescheduledFltr: false,
            strCampResponse: "",
            creationStart: "",
            creationEnd: "",
          });
        } else {
          self.setState({
            campaignGridData: [],
            CampaignCallRescheduledFltr: false,
            strCampResponse: "",
            creationStart: "",
            creationEnd: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetCustomerDataForModal(rowData) {
    var sortName = "";
    var strTag = rowData.customerName.split(" ");
    for (var i = 0; i < strTag.length; i++) {
      sortName += strTag[i].charAt(0).toUpperCase();
    }

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetStoreCustomerpopupDetails",
      headers: authHeader(),
      params: {
        mobileNumber: rowData.customerPhoneNumber,
      },
    })
      .then(function(response) {
        var message = response.data.message;
        var data = response.data.responseData;
        if (message == "Success") {
          if (data.lasttransactiondetails !== null) {
            if (data.lasttransactiondetails.itemDetails !== null) {
              self.setState({
                lastTransactionItem: data.lasttransactiondetails.itemDetails,
              });
            } else {
              self.setState({
                lastTransactionItem: [],
              });
            }
          } else {
            self.setState({
              lastTransactionItem: [],
            });
          }

          self.setState({
            custNameModal: true,
            customerModalDetails: rowData,
            useratvdetails: data.useratvdetails,
            lasttransactiondetails: data.lasttransactiondetails,
            sortCustName: sortName,
            customerName: rowData.customerName,
            customerNumber: rowData.customerPhoneNumber,
          });
        } else {
          self.setState({
            custNameModal: true,
            customerModalDetails: {},
            useratvdetails: {},
            lasttransactiondetails: {},
          });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  handleCustomerNameModalClose() {
    this.setState({
      custNameModal: false,
    });
  }
  /// handle modal open for add comment
  handleAddCommentModalOpen(campaignCust_id) {
    this.setState({
      AddCommentModal: true,
      campaignCustId: campaignCust_id,
    });
  }
  /// handle modal close for add comment
  handleAddCommentClose() {
    this.setState({
      AddCommentModal: false,
    });
  }
  handleGetCampaignSettingList = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCampaign/GetCampaignSettingList",
      headers: authHeader(),
    })
      .then(function(response) {
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData) {
          self.setState({
            raiseTicketFlag: responseData.campaignSettingTimer.raiseTicketFlag,
            addCommentFlag: responseData.campaignSettingTimer.addCommentFlag,
          });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetCampaignSettingList");
      });
  };
  /// handle add comment
  handleCampaignAddComment() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/AddStoreTaskCampaignComment",
      headers: authHeader(),
      params: {
        campaignCustomerID: this.state.campaignCustId,
        Comment: this.state.campaignComment,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          self.setState({
            campaignComment: "",
            AddCommentModal: false,
          });
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.commentaddedsuccessfully
              : "Comment Added Successfully."
          );
        } else {
          self.setState({
            campaignComment: "",
          });
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.commentnotadded
              : "Comment Not Added.."
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle view comment data
  handleViewCommentData(campaignCustId) {
    this.setState({
      CmpViewCmtLoading: true,
      cmpViewComment: [],
    });
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetStoreTaskCampaignComment",
      headers: authHeader(),
      params: {
        campaignCustomerID: campaignCustId,
      },
    })
      .then(function(res) {
        var status = res.data.message;
        var data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            cmpViewComment: data,
            CmpViewCmtLoading: false,
          });
        } else {
          self.setState({
            cmpViewComment: [],
            CmpViewCmtLoading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// handle Search To and from date
  handleSearchToFromDate = async (startDate, endDate) => {
    var startArr = endDate[0].split("-");
    var dummyStart = startArr[0];
    startArr[0] = startArr[1];
    startArr[1] = dummyStart;
    var creationStart = startArr.join("-");
    var endArr = endDate[1].split("-");
    var dummyEnd = endArr[0];
    endArr[0] = endArr[1];
    endArr[1] = dummyEnd;
    var creationEnd = endArr.join("-");
    await this.setState({
      creationStart,
      creationEnd,
    });
    setTimeout(() => {
      this.handleSearchCampaigFilterData();
    }, 50);
  };
  render() {
    const TranslationContext = this.state.translateLanguage.default;

    return (
      <div className="custom-camp-table">
        {this.state.orderPopoverOverlay && (
          <div className="order-popover-overlay"></div>
        )}
        <div className="table-cntr store">
          <Table
            className="components-table-demo-nested antd-table-campaign-padd antd-table-campaign custom-antd-table store-campaign-table"
            columns={[
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.campaignname
                    : "Campaign Name",
                dataIndex: "campaignName",
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.contact
                    : "Contacts",
                dataIndex: "contactCount",
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.campaignscript
                    : "Campaign Script",
                dataIndex: "campaignScript",
                className: "order-desktop",
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.campaignenddate
                    : "Campaign End Date",
                dataIndex: "campaignEndDate",
                className: "order-desktop",
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.campaignstatus
                    : "Campaign Status",
                render: (row) => {
                  return (
                    <button
                      className="closebtn"
                      type="button"
                      onClick={this.handleCloseCampaign.bind(
                        this,
                        row.campaignTypeID
                      )}
                    >
                      <label className="hdrcloselabel">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.close
                          : "Close"}
                      </label>
                    </button>
                  );
                },
                className: this.state.rowExpandedCount === 0 ? "" : "d-none",
              },
              {
                title:
                  TranslationContext !== undefined
                    ? TranslationContext.title.actions
                    : "Actions",
              },
            ]}
            expandedRowRender={(row) => {
              return (
                <>
                  <div className="store-campaign-inner-cntr store-campaign-script-info">
                    <div>
                      <p className="store-campaign-inner-title">
                        {TranslationContext !== undefined
                          ? TranslationContext.title.campaignscript
                          : "Campaign Script"}
                      </p>
                      <p>{row.campaignScript}</p>
                    </div>
                    <div>
                      <p className="store-campaign-inner-title">
                        {TranslationContext !== undefined
                          ? TranslationContext.title.campaignenddate
                          : "Campaign End Date"}
                      </p>
                      <p>{row.campaignEndDate}</p>
                    </div>
                  </div>
                  <Table
                    className="store-campaign-inner-table"
                    dataSource={row.storeCampaignCustomerList}
                    columns={[
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.title.customername
                            : "Customer Name",
                        render: (row, item) => {
                          return (
                            <>
                              <p
                                className="cust-name"
                                onClick={this.handleGetCustomerDataForModal.bind(
                                  this,
                                  item
                                )}
                              >
                                {item.customerName}
                              </p>
                              <span className="sml-fnt">
                                {item.customerPhoneNumber}
                              </span>
                            </>
                          );
                        },
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.title.date
                            : "Date",
                        dataIndex: "campaignTypeDate",
                        render: (row, item) => {
                          return (
                            <>
                              <p style={{ whiteSpace: "nowrap" }}>
                                {item.campaignTypeDate}
                              </p>
                            </>
                          );
                        },
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.title.status
                            : "Status",
                        render: (row, item) => {
                          return (
                            <div className="d-flex">
                              <div>
                                <input
                                  type="radio"
                                  name={
                                    "campaign-status-" + item.campaignCustomerID
                                  }
                                  className="campaign-status-btn"
                                  id={
                                    "contactBtnGreen" + item.campaignCustomerID
                                  }
                                  onChange={this.onStatusChange.bind(
                                    this,
                                    item.campaignTypeID,
                                    item.campaignCustomerID
                                  )}
                                  value="100"
                                  checked={item.campaignStatus === 100}
                                />
                                <label
                                  className="table-btnlabel contactBtnGreen"
                                  htmlFor={
                                    "contactBtnGreen" + item.campaignCustomerID
                                  }
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.label.contacted
                                    : "Contacted"}
                                </label>
                              </div>
                              <div className="position-relative">
                                {item.noOfTimesNotContacted !== 0 &&
                                  item.campaignStatus === 101 && (
                                    <div className="not-contacted-count">
                                      {item.noOfTimesNotContacted}
                                    </div>
                                  )}
                                <input
                                  type="radio"
                                  name={
                                    "campaign-status-" + item.campaignCustomerID
                                  }
                                  className="campaign-status-btn"
                                  id={
                                    "notConnectedBtnRed" +
                                    item.campaignCustomerID
                                  }
                                  onChange={this.onStatusChange.bind(
                                    this,
                                    item.campaignTypeID,
                                    item.campaignCustomerID
                                  )}
                                  value="101"
                                  checked={item.campaignStatus === 101}
                                />
                                <label
                                  className="table-btnlabel notConnectedBtnRed"
                                  htmlFor={
                                    "notConnectedBtnRed" +
                                    item.campaignCustomerID
                                  }
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.label.notcontacted
                                    : "Not Contacted"}
                                </label>
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  name={
                                    "campaign-status-" + item.campaignCustomerID
                                  }
                                  className="campaign-status-btn"
                                  id={
                                    "followUpBtnYellow" +
                                    item.campaignCustomerID
                                  }
                                  onChange={this.onStatusChange.bind(
                                    this,
                                    item.campaignTypeID,
                                    item.campaignCustomerID
                                  )}
                                  value="102"
                                  checked={item.campaignStatus === 102}
                                />
                                <label
                                  className="table-btnlabel followUpBtnYellow"
                                  htmlFor={
                                    "followUpBtnYellow" +
                                    item.campaignCustomerID
                                  }
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.label.followup
                                    : "Follow Up"}
                                </label>
                              </div>
                            </div>
                          );
                        },
                        className:
                          "camp-status-header camp-status-header-statusFilter order-desktop",
                        filterDropdown: (data, row) => {
                          return (
                            <div className="campaign-status-drpdwn">
                              <ul>
                                <li>
                                  <input
                                    type="checkbox"
                                    id="Campall-status"
                                    className="ch1"
                                    onChange={this.handleCheckCampAllStatus.bind(
                                      this
                                    )}
                                    checked={this.state.CheckBoxAllStatus}
                                    name="CampallStatus"
                                  />
                                  <label htmlFor="Campall-status">
                                    <span className="ch1-text">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.p.all
                                        : "All"}
                                    </span>
                                  </label>
                                </li>
                                {this.state.campChildStatusFltData !== null &&
                                  this.state.campChildStatusFltData.map(
                                    (item, s) => (
                                      <li key={s}>
                                        <input
                                          type="checkbox"
                                          id={"New" + item.statusNameID}
                                          className="ch1"
                                          onChange={this.handleCheckCampIndividualStatus.bind(
                                            this
                                          )}
                                          name="CampallStatus"
                                          attrIds={item.statusNameID}
                                        />
                                        <label
                                          htmlFor={"New" + item.statusNameID}
                                        >
                                          <span className="ch1-text">
                                            {item.statusName}
                                          </span>
                                        </label>
                                      </li>
                                    )
                                  )}
                              </ul>
                            </div>
                          );
                        },
                        filterDropdownVisible: this.state.CampaignStatusFilter,
                        onFilterDropdownVisibleChange: (visible) =>
                          this.setState({ CampaignStatusFilter: visible }),
                        filterIcon: (filtered) => (
                          <span
                            style={{ color: filtered ? "#1890ff" : undefined }}
                          ></span>
                        ),
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.title.response
                            : "Response",
                        render: (row, item) => {
                          return (
                            <div
                              className={
                                item.campaignStatus === 0
                                  ? "disabled-input"
                                  : ""
                              }
                            >
                              <select
                                className={
                                  item.campaignStatus === 0
                                    ? "responceDrop-down dropdown-label disabled-link"
                                    : "responceDrop-down dropdown-label"
                                }
                                value={item.response}
                                onChange={this.onResponseChange.bind(
                                  this,
                                  item.campaignTypeID,
                                  item.campaignCustomerID
                                )}
                              >
                                <option hidden>Select</option>
                                {item.campaignResponseList !== null &&
                                  item.campaignResponseList
                                    .filter(
                                      (x) =>
                                        x.statusNameID === item.campaignStatus
                                    )
                                    .map((items, i) => (
                                      <option key={i} value={items.responseID}>
                                        {items.response}
                                      </option>
                                    ))}
                              </select>
                            </div>
                          );
                        },
                        className:
                          "camp-status-header camp-response-header camp-status-header-statusFilter order-desktop",
                        filterDropdown: (row, item) => {
                          return (
                            <div className="campaign-status-drpdwn">
                              <ul>
                                <li>
                                  <input
                                    type="checkbox"
                                    id="Campall-Response"
                                    className="ch1"
                                    onChange={this.handleCheckCampAllResponse.bind(
                                      this
                                    )}
                                    checked={this.state.CheckBoxAllResponse}
                                    name="CampallResposnse"
                                  />
                                  <label htmlFor="Campall-Response">
                                    <span className="ch1-text">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.p.all
                                        : "All"}
                                    </span>
                                  </label>
                                </li>
                                {this.state.campChildResponseFltData !== null &&
                                  this.state.campChildResponseFltData.map(
                                    (data, s) => (
                                      <li key={s}>
                                        <input
                                          type="checkbox"
                                          id={"Resp" + data.responseID}
                                          className="ch1"
                                          onChange={this.handleCheckCampIndividualResponse.bind(
                                            this
                                          )}
                                          name="CampallResposnse"
                                          attrIds={data.responseID}
                                        />
                                        <label
                                          htmlFor={"Resp" + data.responseID}
                                        >
                                          <span className="ch1-text">
                                            {data.response}
                                          </span>
                                        </label>
                                      </li>
                                    )
                                  )}
                              </ul>
                            </div>
                          );
                        },
                        filterDropdownVisible: this.state.CampaignResponseFltr,
                        onFilterDropdownVisibleChange: (visible) =>
                          this.setState({ CampaignResponseFltr: visible }),
                        filterIcon: (filtered) => (
                          <span
                            style={{ color: filtered ? "#1890ff" : undefined }}
                          ></span>
                        ),
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.title.callrecheduledto
                            : "Call Rescheduled To",
                        className: "order-desktop camp-callres-header",
                        render: (row, item) => {
                          return (
                            <div
                              className={
                                (item.campaignStatus === 102 &&
                                  item.response === 3) ||
                                (item.campaignStatus == 100 && item.response)
                                  ? ""
                                  : "disabled-input"
                              }
                            >
                              <DatePicker
                                disabled={item.isRescheduleCallDisabled}
                                id="startDate"
                                autoComplete="off"
                                showTimeSelect
                                name="startDate"
                                showMonthDropdown
                                showYearDropdown
                                minDate={moment(item.callReScheduledTo)}
                                selected={
                                  item.callReScheduledTo !== ""
                                    ? new Date(item.callReScheduledTo)
                                    : new Date()
                                }
                                dateFormat="MM/dd/yyyy h:mm aa"
                                value={
                                  item.callReScheduledTo !== ""
                                    ? moment(item.callReScheduledTo)
                                    : ""
                                }
                                onChange={this.onDateChange.bind(
                                  this,
                                  item.campaignTypeID,
                                  item.campaignCustomerID
                                )}
                                className={
                                  // item.campaignStatus === 102 &&
                                  // item.response === 3
                                  (item.campaignStatus === 102 &&
                                    item.response === 3) ||
                                  (item.campaignStatus == 100 && item.response)
                                    ? "txtStore dateTimeStore"
                                    : "txtStore dateTimeStore disabled-link"
                                }
                                placeholderText={
                                  TranslationContext !== undefined
                                    ? TranslationContext.placeholder
                                        .selecttimeanddate
                                    : "Select Date & Time"
                                }
                              />
                            </div>
                          );
                        },

                        filterDropdown: (data, row) => {
                          return (
                            <div className="DashTimeRange">
                              <div className="show-grid">
                                <div id="DateTimeRangeContainerNoMobileMode">
                                  <div style={{ padding: "10px" }}>
                                    <CampaignDateRangeFilter
                                      applyCallbackCampCallReschecule={
                                        this.handleSearchToFromDate
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        },
                        filterDropdownVisible: this.state
                          .CampaignCallRescheduledFltr,
                        onFilterDropdownVisibleChange: (visible) =>
                          this.setState({
                            CampaignCallRescheduledFltr: visible,
                          }),
                        filterIcon: (filtered) => (
                          <span
                            style={{ color: filtered ? "#1890ff" : undefined }}
                          ></span>
                        ),
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.title.actions
                            : "Actions",
                        render: (row, item) => {
                          return (
                            <div className="d-flex">
                              <div
                                className={
                                  (item.campaignStatus === 100 &&
                                    item.response !== 0) ||
                                  (item.campaignStatus === 101 &&
                                    item.response !== 0) ||
                                  (item.campaignStatus === 102 &&
                                    item.response !== 0 &&
                                    item.callReScheduledTo !== "")
                                    ? ""
                                    : "disabled-input"
                                }
                              >
                                <button
                                  className={
                                    (item.campaignStatus === 100 &&
                                      item.response !== 0) ||
                                    (item.campaignStatus === 101 &&
                                      item.response !== 0) ||
                                    (item.campaignStatus === 102 &&
                                      item.response !== 0 &&
                                      item.callReScheduledTo !== "")
                                      ? "saveBtn"
                                      : "saveBtn disabled-link"
                                  }
                                  type="button"
                                  style={{
                                    minWidth: "5px",
                                    marginRight: "3px",
                                  }}
                                  onClick={this.handleUpdateCampaignStatusResponse.bind(
                                    this,
                                    item.campaignCustomerID,
                                    item.campaignStatus,
                                    item.response,
                                    item.callReScheduledTo
                                  )}
                                >
                                  <label className="saveLabel">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label.save
                                      : "Save"}
                                  </label>
                                </button>
                              </div>
                              {this.state.raiseTicketFlag ? (
                                <div
                                  className={
                                    (item.campaignStatus === 100 &&
                                      item.response !== 0) ||
                                    item.campaignStatus === 102
                                      ? ""
                                      : "disabled-input"
                                  }
                                >
                                  <button
                                    className={
                                      (item.campaignStatus === 100 &&
                                        item.response !== 0) ||
                                      item.campaignStatus === 102
                                        ? "raisedticket-Btn"
                                        : "raisedticket-Btn disabled-link"
                                    }
                                    type="button"
                                    onClick={this.handleRaisedTicketModalOpen.bind(
                                      this,
                                      row,
                                      item
                                    )}
                                  >
                                    <label className="raise-ticketLbl">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.label.raiseticket
                                        : "Raise Ticket"}
                                    </label>
                                  </button>
                                </div>
                              ) : null}
                              {this.state.addCommentFlag ? (
                                <>
                                  <div className="m-l3">
                                    <button
                                      className="addcommentCmp-Btn"
                                      type="button"
                                      onClick={this.handleAddCommentModalOpen.bind(
                                        this,
                                        item.campaignCustomerID
                                      )}
                                    >
                                      <label className="raise-ticketLbl">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.addcomment
                                          : "Add Comment"}
                                      </label>
                                    </button>
                                  </div>
                                  <div>
                                    <Popover
                                      title={
                                        <>
                                          <Spin
                                            style={{ top: "20px" }}
                                            tip="Loading..."
                                            spinning={
                                              this.state.CmpViewCmtLoading
                                            }
                                          >
                                            <div className="campwidthSpin">
                                              <>
                                                {this.state.cmpViewComment !==
                                                  null &&
                                                  this.state.cmpViewComment.map(
                                                    (item, i) => (
                                                      <div
                                                        className="popover-input-cntr viewCmdCmp"
                                                        key={i}
                                                      >
                                                        <div className="viercmdcmpbrd">
                                                          <label>
                                                            {item.comment}
                                                          </label>
                                                          <div className="row m-t-15">
                                                            <div className="col-md-12">
                                                              <label className="viewcmtUser">
                                                                {
                                                                  item.createdByName
                                                                }
                                                              </label>
                                                              <label className="viewCmtDT">
                                                                {
                                                                  item.createdDate
                                                                }
                                                              </label>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    )
                                                  )}
                                                {this.state.cmpViewComment
                                                  .length == 0 &&
                                                this.state.CmpViewCmtLoading ===
                                                  false ? (
                                                  <Empty
                                                    image={
                                                      Empty.PRESENTED_IMAGE_SIMPLE
                                                    }
                                                  />
                                                ) : null}
                                              </>
                                            </div>
                                          </Spin>
                                        </>
                                      }
                                      overlayClassName="order-popover order-popover-butns shopping-popover-delete viewCmtCamp viewCMTNew"
                                      placement="bottomRight"
                                      trigger="click"
                                    >
                                      <img
                                        title="View Comments"
                                        src={ViewComment}
                                        alt="View comment"
                                        className="showCmtCmp"
                                        onClick={this.handleViewCommentData.bind(
                                          this,
                                          item.campaignCustomerID
                                        )}
                                      />
                                    </Popover>
                                  </div>
                                </>
                              ) : null}
                            </div>
                          );
                        },
                      },
                    ]}
                    expandedRowRender={(row) => {
                      return (
                        <div className="store-campaign-inner-cntr">
                          <div>
                            <p className="store-campaign-inner-title">Status</p>
                            <div className="d-flex">
                              <div>
                                <input
                                  type="radio"
                                  name={
                                    "campaign-status-" + row.campaignCustomerID
                                  }
                                  className="campaign-status-btn"
                                  id={
                                    "contactBtnGreen" + row.campaignCustomerID
                                  }
                                  onChange={this.onStatusChange.bind(
                                    this,
                                    row.campaignTypeID,
                                    row.campaignCustomerID
                                  )}
                                  value="100"
                                  checked={row.campaignStatus === 100}
                                />
                                <label
                                  className="table-btnlabel contactBtnGreen"
                                  htmlFor={
                                    "contactBtnGreen" + row.campaignCustomerID
                                  }
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.label.contacted
                                    : "Contacted"}
                                </label>
                              </div>
                              <div className="position-relative">
                                {row.noOfTimesNotContacted !== 0 &&
                                  row.campaignStatus === 101 && (
                                    <div className="not-contacted-count">
                                      {row.noOfTimesNotContacted}
                                    </div>
                                  )}
                                <input
                                  type="radio"
                                  name={
                                    "campaign-status-" + row.campaignCustomerID
                                  }
                                  className="campaign-status-btn"
                                  id={
                                    "notConnectedBtnRed" +
                                    row.campaignCustomerID
                                  }
                                  onChange={this.onStatusChange.bind(
                                    this,
                                    row.campaignTypeID,
                                    row.campaignCustomerID
                                  )}
                                  value="101"
                                  checked={row.campaignStatus === 101}
                                />
                                <label
                                  className="table-btnlabel notConnectedBtnRed"
                                  htmlFor={
                                    "notConnectedBtnRed" +
                                    row.campaignCustomerID
                                  }
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.label.notcontacted
                                    : "Not Contacted"}
                                </label>
                              </div>
                              <div>
                                <input
                                  type="radio"
                                  name={
                                    "campaign-status-" + row.campaignCustomerID
                                  }
                                  className="campaign-status-btn"
                                  id={
                                    "followUpBtnYellow" + row.campaignCustomerID
                                  }
                                  onChange={this.onStatusChange.bind(
                                    this,
                                    row.campaignTypeID,
                                    row.campaignCustomerID
                                  )}
                                  value="102"
                                  checked={row.campaignStatus === 102}
                                />
                                <label
                                  className="table-btnlabel followUpBtnYellow"
                                  htmlFor={
                                    "followUpBtnYellow" + row.campaignCustomerID
                                  }
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.label.followup
                                    : "Follow Up"}
                                </label>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="store-campaign-inner-title">
                              Response
                            </p>
                            <div
                              className={
                                row.campaignStatus === 0 ? "disabled-input" : ""
                              }
                            >
                              <select
                                className={
                                  row.campaignStatus === 0
                                    ? "responceDrop-down dropdown-label disabled-link"
                                    : "responceDrop-down dropdown-label"
                                }
                                value={row.response}
                                onChange={this.onResponseChange.bind(
                                  this,
                                  row.campaignTypeID,
                                  row.campaignCustomerID
                                )}
                              >
                                <option hidden>Select</option>
                                {row.campaignResponseList !== null &&
                                  row.campaignResponseList
                                    .filter(
                                      (x) =>
                                        x.statusNameID === row.campaignStatus
                                    )
                                    .map((items, i) => (
                                      <option key={i} value={items.responseID}>
                                        {items.response}
                                      </option>
                                    ))}
                              </select>
                            </div>
                          </div>
                          <div>
                            <p className="store-campaign-inner-title">
                              { TranslationContext !== undefined
                            ? TranslationContext.title.callrecheduledto
                            : "Call Rescheduled To"}
                            </p>
                            <div
                              className={
                               ( row.campaignStatus === 102 && row.response === 3)  ||
                               (row.campaignStatus == 100 && row.response)
                                  ? ""
                                  : "disabled-input"
                              }
                            >
                              <DatePicker
                                id="startDate"
                                autoComplete="off"
                                showTimeSelect
                                name="startDate"
                                showMonthDropdown
                                showYearDropdown
                                selected={
                                  row.callReScheduledTo !== ""
                                    ? new Date(row.callReScheduledTo)
                                    : new Date()
                                }
                                dateFormat="MM/dd/yyyy h:mm aa"
                                value={
                                  row.callReScheduledTo !== ""
                                    ? moment(row.callReScheduledTo)
                                    : ""
                                }
                                onChange={this.onDateChange.bind(
                                  this,
                                  row.campaignTypeID,
                                  row.campaignCustomerID
                                )}
                                className={
                                  // row.campaignStatus === 102 &&
                                  // row.response === 3
                                  //   ? "txtStore dateTimeStore"
                                  //   : "txtStore dateTimeStore disabled-link"
                                  (row.campaignStatus === 102 &&
                                    row.response === 3) ||
                                  (row.campaignStatus == 100 && row.response)
                                    ? "txtStore dateTimeStore"
                                    : "txtStore dateTimeStore disabled-link"
                                }
                                placeholderText={
                                  TranslationContext !== undefined
                                    ? TranslationContext.placeholder
                                        .selecttimeanddate
                                    : "Select Date & Time"
                                }
                              />
                            </div>
                          </div>
                          <div
                            className={
                              (row.campaignStatus === 100 &&
                                row.response !== 0) ||
                              (row.campaignStatus === 101 &&
                                row.response !== 0) ||
                              (row.campaignStatus === 102 &&
                                row.response !== 0 &&
                                row.callReScheduledTo !== "")
                                ? ""
                                : "disabled-input"
                            }
                          >
                            <button
                              className={
                                (row.campaignStatus === 100 &&
                                  row.response !== 0) ||
                                (row.campaignStatus === 101 &&
                                  row.response !== 0) ||
                                (row.campaignStatus === 102 &&
                                  row.response !== 0 &&
                                  row.callReScheduledTo !== "")
                                  ? "saveBtn"
                                  : "saveBtn disabled-link"
                              }
                              type="button"
                              style={{ minWidth: "5px", marginRight: "3px" }}
                              onClick={this.handleUpdateCampaignStatusResponse.bind(
                                this,
                                row.campaignCustomerID,
                                row.campaignStatus,
                                row.response,
                                row.callReScheduledTo
                              )}
                            >
                              <label className="saveLabel">
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.save
                                  : "Save"}
                              </label>
                            </button>
                          </div>
                        </div>
                      );
                    }}
                    pagination={{ defaultPageSize: 10, showSizeChanger: true }}
                    expandIconColumnIndex={5}
                    expandIconAsCell={false}
                    showSizeChanger={true}
                    onShowSizeChange={true}
                  />
                </>
              );
            }}
            onExpand={this.onRowExpand}
            expandedRowKeys={this.state.expandedRowKeys}
            expandIconColumnIndex={5}
            expandIconAsCell={false}
            pagination={false}
            loading={this.state.loading}
            dataSource={this.state.campaignGridData}
            noDataContent="No Record Found"
          />
        </div>
        {/* ---------Raised Ticket Modal----------- */}
        <Modal
          open={this.state.raisedTicketModal}
          onClose={this.handleRaisedTicketModalClose.bind(this)}
          center
          modalId="Raised-popup"
          overlayId="logout-ovrly"
        >
          <img
            src={CancelIcon}
            alt="cancel-icone"
            className="cncl-icn"
            onClick={this.handleRaisedTicketModalClose.bind(this)}
          />
          <div className="raise-ticket-popup">
            <div className="d-flex justify-content-between mb-2">
              <p className="blak-clr font-weight-bold m-0">
                {TranslationContext !== undefined
                  ? TranslationContext.p.customerdetails
                  : "Customer Details"}
              </p>
              <p className="m-0">
                {TranslationContext !== undefined
                  ? TranslationContext.label.source
                  : "Source"}
                :
                <span>
                  {TranslationContext !== undefined
                    ? TranslationContext.label.store
                    : "Store"}
                </span>
              </p>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>
                  {TranslationContext !== undefined
                    ? TranslationContext.label.name
                    : "Name"}
                </label>
                <input
                  type="text"
                  className="mobile_no disabled-input"
                  name="name"
                  value={this.state.modalData["name"]}
                  onChange={this.handleOnchange}
                  disabled
                />
                {this.state.isName !== "" && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.isName}
                  </p>
                )}
              </div>
              <div className="col-md-4 mb-3">
                <label>
                  {TranslationContext !== undefined
                    ? TranslationContext.label.mobile
                    : "Mobile"}
                </label>
                <input
                  type="text"
                  className="mobile_no disabled-input"
                  name="mobile"
                  value={this.state.modalData["mobile"]}
                  onChange={this.handleOnchange}
                  disabled
                />
                {this.state.isMobile !== "" && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.isMobile}
                  </p>
                )}
              </div>
              <div className="col-md-4 mb-3">
                <label>
                  {TranslationContext !== undefined
                    ? TranslationContext.label.email
                    : "Email"}
                </label>
                <input
                  type="text"
                  className="mobile_no disabled-input"
                  name="email"
                  value={this.state.modalData["email"]}
                  onChange={this.handleOnchange}
                  disabled
                />
                {this.state.isEmail !== "" && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.isEmail}
                  </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>
                  {TranslationContext !== undefined
                    ? TranslationContext.label.dateofbirth
                    : "Date of birth"}
                </label>
                <input
                  type="text"
                  className="mobile_no disabled-input"
                  name="dateofbrith"
                  value={this.state.modalData["dateofbrith"]}
                  onChange={this.handleOnchange}
                  disabled
                />
              </div>
              <div className="col-md-4 mb-3">
                <label>
                  {TranslationContext !== undefined
                    ? TranslationContext.label.brand
                    : "Brand"}
                </label>
                <select
                  name="brand"
                  value={this.state.modalData["brand"]}
                  onChange={this.handleOnchange}
                >
                  <option value="">
                    {TranslationContext !== undefined
                      ? TranslationContext.button.select
                      : "Select"}
                  </option>
                  {this.state.brandData !== null &&
                    this.state.brandData.map((item, i) => (
                      <option
                        key={i}
                        value={item.brandID}
                        className="select-category-placeholder"
                      >
                        {item.brandName}
                      </option>
                    ))}
                </select>
                {this.state.isBrand !== "" && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.isBrand}
                  </p>
                )}
              </div>
              <div className="col-md-4 mb-3">
                <label>
                  {TranslationContext !== undefined
                    ? TranslationContext.label.category
                    : "Category"}
                </label>
                <select
                  name="category"
                  value={this.state.modalData["category"]}
                  onChange={this.handleOnchange}
                >
                  <option value="">
                    {TranslationContext !== undefined
                      ? TranslationContext.button.select
                      : "Select"}
                  </option>
                  {this.state.categoryData !== null &&
                    this.state.categoryData.map((item, i) => (
                      <option
                        key={i}
                        value={item.categoryID}
                        className="select-category-placeholder"
                      >
                        {item.categoryName}
                      </option>
                    ))}
                </select>
                {this.state.isCategory !== "" && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.isCategory}
                  </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label>
                  {TranslationContext !== undefined
                    ? TranslationContext.label.subcategory
                    : "Sub Category"}
                </label>
                <select
                  name="subCategory"
                  value={this.state.modalData["subCategoryId"]}
                  onChange={this.handleOnchange}
                >
                  <option value="">
                    {TranslationContext !== undefined
                      ? TranslationContext.button.select
                      : "Select"}
                  </option>
                  {this.state.subCategoryData !== null &&
                    this.state.subCategoryData.map((item, i) => (
                      <option
                        key={i}
                        value={item.subCategoryID}
                        className="select-category-placeholder"
                      >
                        {item.subCategoryName}
                      </option>
                    ))}
                </select>
                {this.state.isSubCategory !== "" && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.isSubCategory}
                  </p>
                )}
              </div>
              <div className="col-md-4 mb-3">
                <label>
                  {TranslationContext !== undefined
                    ? TranslationContext.label.issuetype
                    : "Issue Type"}
                </label>
                <select
                  name="issueType"
                  value={this.state.modalData["issueTypeId"]}
                  onChange={this.handleOnchange}
                >
                  <option value="">
                    {TranslationContext !== undefined
                      ? TranslationContext.button.select
                      : "Select"}
                  </option>
                  {this.state.issueTypeData !== null &&
                    this.state.issueTypeData.map((item, i) => (
                      <option
                        key={i}
                        value={item.issueTypeID}
                        className="select-category-placeholder"
                      >
                        {item.issueTypeName}
                      </option>
                    ))}
                </select>
                {this.state.isIssueType !== "" && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.isIssueType}
                  </p>
                )}
              </div>
              <div className="col-md-4 mb-3">
                <label>
                  {TranslationContext !== undefined
                    ? TranslationContext.label.tickettitle
                    : "Ticket Title"}
                </label>
                <input
                  type="text"
                  name="tiketTitle"
                  className="email_Id"
                  value={this.state.modalData["tiketTitle"]}
                  onChange={this.handleOnchange}
                />
                {this.state.isTiketTitle !== "" && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.isTiketTitle}
                  </p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mb-3">
                <label>
                  {TranslationContext !== undefined
                    ? TranslationContext.label.ticketdetails
                    : "Ticket Details"}
                </label>
                <textarea
                  name="tiketDetails"
                  className="textarea-store"
                  value={this.state.modalData["tiketDetails"]}
                  onChange={this.handleOnchange}
                ></textarea>
                {this.state.isTiketDetails !== "" && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.isTiketDetails}
                  </p>
                )}
              </div>
            </div>
            <div className="text-right">
              <a
                href="#!"
                onClick={this.handleRaisedTicketModalClose.bind(this)}
                class="blue-clr mr-4"
              >
                {TranslationContext !== undefined
                  ? TranslationContext.a.cancel
                  : "CANCEL"}
              </a>
              <button
                className="butn"
                type="button"
                onClick={this.handleCreateTicket.bind(this)}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.button.createticket
                  : "CREATE TICKET"}
              </button>
            </div>
          </div>
        </Modal>
        <Modal
          open={this.state.AddCommentModal}
          onClose={this.handleAddCommentClose.bind(this)}
          center
          modalId="CampAddCmt-popup"
          overlayId="logout-ovrly"
        >
          <img
            src={CancelIcon}
            alt="cancel-icone"
            className="cust-icon"
            onClick={this.handleAddCommentClose.bind(this)}
          />
          <div className="row">
            <label className="cmp-addCmdlbl">
              {TranslationContext !== undefined
                ? TranslationContext.label.addcomment
                : "Add Comment"}
            </label>
            <div className="col-md-12">
              <textarea
                className="Add-Notes-textarea"
                placeholder="Enter Comment"
                value={this.state.campaignComment}
                onChange={(e) =>
                  this.setState({ campaignComment: e.target.value })
                }
              ></textarea>
              <div style={{ float: "right", marginTop: "10px" }}>
                <a
                  href={Demo.BLANK_LINK}
                  onClick={this.handleAddCommentClose.bind(this)}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.cancel
                    : "Cancel"}
                </a>

                <button
                  type="button"
                  className="addCmdSub notesbtn-text"
                  onClick={this.handleCampaignAddComment.bind(this)}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.button.submit
                    : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          open={this.state.custNameModal}
          onClose={this.handleCustomerNameModalClose.bind(this)}
          center
          modalId="customername-popup"
          overlayId="logout-ovrly"
        >
          <img
            src={CancelIcon}
            alt="cancel-icone"
            className="cust-icon"
            onClick={this.handleCustomerNameModalClose.bind(this)}
          />
          <div className="row">
            <div className="col-12 col-md-12">
              <div className="nr-initials">
                <p>{this.state.sortCustName}</p>
              </div>
              <div className="nr-name">
                <h3>
                  {this.state.customerName}{" "}
                  <span>{this.state.customerNumber}</span>
                </h3>
                <p>
                  {this.state.useratvdetails.tiername && (
                    <b style={{ fontWeight: 400, color: "#000" }}>TIER : </b>
                  )}
                  {this.state.useratvdetails.tiername}
                </p>
              </div>
            </div>
          </div>
          <div className="row campaign-cust-popup">
            <div className="col-12 col-md-6">
              <div className="lifetimevalue lt-single">
                <table>
                  <tbody>
                    <tr>
                      <td>
                        <h4>
                          {TranslationContext !== undefined
                            ? TranslationContext.h4.lifetimevalue
                            : "Lifetime Value"}
                        </h4>
                        <label>
                          {this.state.useratvdetails.lifeTimeValue !== null ? (
                            <>₹{this.state.useratvdetails.lifeTimeValue}</>
                          ) : (
                            "₹0"
                          )}
                        </label>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="productbox">
                <div>
                  <ul
                    className="nav alert-nav-tabs3 store-nav-tabs tab-single"
                    role="tablist"
                  >
                    {this.state.lastTransactionItem.length > 0 ? (
                      <li className="nav-item fo">
                        <a
                          className="nav-link active"
                          data-toggle="tab"
                          href="#lastTransaction-tab"
                          role="tab"
                          aria-controls="lastTransaction-tab"
                          aria-selected="false"
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.a.lasttransaction
                            : "Last Transaction"}
                        </a>
                      </li>
                    ) : null}
                  </ul>
                </div>
                <div className="tab-content p-0">
                  <div
                    className="tab-pane fade show active"
                    id="lastTransaction-tab"
                    role="tabpanel"
                    aria-labelledby="lastTransaction-tab"
                  >
                    <div>
                      {this.state.lasttransactiondetails !== null ? (
                        <>
                          {this.state.lasttransactiondetails.amount !== "" &&
                          this.state.lasttransactiondetails.amount !== null ? (
                            <div className="transactionbox">
                              <table>
                                <tbody>
                                  <tr>
                                    <td>
                                      <h5>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.h5.billno
                                          : "Bill No."}
                                      </h5>
                                      <label>
                                        {
                                          this.state.lasttransactiondetails
                                            .billNo
                                        }
                                      </label>
                                    </td>
                                    <td>
                                      <h5>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.h5.amount
                                          : "Amount"}
                                      </h5>
                                      <label>
                                        {
                                          this.state.lasttransactiondetails
                                            .amount
                                        }
                                      </label>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <h5>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.h5.store
                                          : "Store"}
                                      </h5>
                                      <label>
                                        {
                                          this.state.lasttransactiondetails
                                            .storeName
                                        }
                                      </label>
                                    </td>
                                    <td>
                                      <h5>
                                        {TranslationContext !== undefined
                                          ? TranslationContext.h5.date
                                          : "Date"}
                                      </h5>
                                      <label>
                                        {
                                          this.state.lasttransactiondetails
                                            .billDate
                                        }
                                      </label>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div className="trasactablist">
                                <div className="myTicket-table remov agentlist last-trans-table">
                                  <ReactTable
                                    className="limit-react-table-body tabscrol"
                                    data={this.state.lastTransactionItem}
                                    columns={[
                                      {
                                        Header: (
                                          <span>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.span.article
                                              : "Article"}
                                          </span>
                                        ),
                                        accessor: "article",
                                      },
                                      {
                                        Header: (
                                          <span>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.span.qty
                                              : "Qty."}
                                          </span>
                                        ),
                                        accessor: "quantity",
                                        width: 60,
                                      },
                                      {
                                        Header: (
                                          <span>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.span.amount
                                              : "Amount"}
                                          </span>
                                        ),
                                        accessor: "amount",
                                        width: 80,
                                      },
                                    ]}
                                    minRows={2}
                                    showPagination={false}
                                    resizable={false}
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <label className="ChecknoDataCamp">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.norecordfound
                                : "No Record Found"}
                            </label>
                          )}
                        </>
                      ) : (
                        <>
                          <label className="ChecknoDataCamp">
                            {TranslationContext !== undefined
                              ? TranslationContext.label.norecordfound
                              : "No Record Found"}
                          </label>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Campaign;
