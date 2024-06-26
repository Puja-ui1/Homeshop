import React, { Component, Fragment } from "react";
import { Collapse, CardBody, Card } from "reactstrap";
import ArrowImg from "./../../assets/Images/arrow.png";
import PlusImg from "./../../assets/Images/plus.png";
import DownImg from "./../../assets/Images/down.png";
import storeImg from "./../../assets/Images/store.png";
import ReactTable from "react-table";
import axios from "axios";
import config from "../../helpers/config";
import { authHeader } from "../../helpers/authHeader";
import { Table } from "antd";
import { NotificationManager } from "react-notifications";
import CancelImg from "./../../assets/Images/cancel.png";
import Modal from "react-responsive-modal";
import { withRouter } from "react-router-dom";
import Headphone2Img from "./../../assets/Images/headphone2.png";
import * as translationHI from "../../translations/hindi";
import * as translationMA from "../../translations/marathi";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class ClaimApproveReject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false,
      SearchDetails: true,
      claimID: 0,
      brandData: [],
      categoryDropData: [],
      SubCategoryDropData: [],
      ListOfIssueData: [],
      selectBrand: 0,
      list1Value: "",
      ListOfSubCate: "",
      ListOfIssue: "",
      claimPercentage: "",
      orderDetailsData: [],
      customerData: {},
      OrderSubItem: [],
      customerName: "",
      customerPhoneNumber: "",
      customerAlternateNumber: "",
      emailID: "",
      alternateEmailID: "",
      gender: "",
      commentData: [],
      finalClaimPercentage: "",
      imageURL: "",
      ticketID: 0,
      ticketingTaskID: 0,
      assignToName: "",
      targetClouserDate: "",
      userModel: false,
      userData: [],
      assigneeID: 0,
      errors: {},
      rejectModal: false,
      rejectComment: "",
      isrejectComment: "",
      status: "",
      assginToModal: false,
      assignComment: "",
      isAssignComment: "",
      claimComments: "",
      oldAssignID: 0,
      storeCommetData: [],
      approveCommentData: [],
      rejectCommentData: [],
      translateLanguage: {},
      isCommentSubmit: false,
      isRejectSubmit: false,
      isApproveSubmit: false,
      isAddSubmit: false,
      isSkipSubmit: false,
      canApproveclaim: false,
      raisedByTab: false,
      AssignTab: false,
    };

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleUserModelOpen = this.handleUserModelOpen.bind(this);
    this.handleUserModelClose = this.handleUserModelClose.bind(this);
    this.handleAssignClaim = this.handleAssignClaim.bind(this);
  }

  componentDidMount() {
    if (this.props.location.state) {
      var claimId = this.props.location.state.ClaimID;
      var raisedByTab = this.props.location.state.raisedByTab;
      var AssignTab = this.props.location.state.AssignTab;
      this.setState({
        claimID: claimId,
        raisedByTab,
        AssignTab,
      });
      this.handleGetClaimByID(claimId);
      this.handleGetClaimCommentByClaimID(claimId);
      this.handleGetStoreClaimComments(claimId);
      this.handleGetBrandList();
    }

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }
  componentDidUpdate() {
    if (this.props.location.state) {
      var claimId = this.props.location.state.ClaimID;
      var raisedByTab = this.props.location.state.raisedByTab;
      var AssignTab = this.props.location.state.AssignTab;
      if (claimId !== this.state.claimID) {
        this.setState({
          claimID: claimId,
          raisedByTab,
          AssignTab,
        });
        this.handleGetClaimByID(claimId);

        this.handleGetStoreClaimComments(claimId);
        this.handleGetBrandList();
      }
    }
  }

  ////handle get user dropdown
  handleGetUserDropdown() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/ClaimAssignDropdown",
      headers: authHeader(),
      params: {
        assignID: this.state.assigneeID,
      },
    })
      .then(function(response) {
        var userData = response.data.responseData;
        var message = response.data.message;
        if (message === "Success" && userData.length > 0) {
          self.setState({
            userModel: true,
            userData,
          });
        } else {
          self.setState({ userModel: true, userData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetUserDropdown");
      });
  }

  ////handle assign task
  handleAssignClaim() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/ClaimReAssign",
      headers: authHeader(),
      params: {
        claimID: this.state.claimID,
        assigneeID: this.state.agentId,
      },
    })
      .then(function(response) {
        var message = response.data.message;
        self.setState({ isSkipSubmit: false });
        if (message === "Success") {
          self.setState({
            assigneeID: self.state.agentId,
            assignComment: "",
          });
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.claimassignedsuccesfully
              : "Claim Assigned Successfully."
          );
          self.handleAssginToModalClose();
          self.handleUserModelClose();
          setTimeout(() => {
            self.componentDidMount();
          }, 100);
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.ticketingDashboard.taskassignfailed
              : "Task Assign Failed."
          );
          self.setState({ userModel: false, assigneeID: this.state.agentId });
        }
      })
      .catch((response) => {
        self.setState({ isSkipSubmit: false });
        console.log(response, "---handleAssignTask");
      });
  }
  ////handle user model open
  handleUserModelOpen() {
    this.setState({ userModel: true });
  }
  ////handle user model close
  handleUserModelClose() {
    this.setState({ userModel: false });
  }
  handleToggle() {
    this.setState((state) => ({ collapse: !state.collapse }));
  }
  handleShowSearchDetails() {
    this.setState({
      SearchDetails: !this.state.SearchDetails,
    });
  }
  ////handle get brand list
  handleGetBrandList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ brandData: data });
        } else {
          self.setState({ brandData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  ///handle get claim by id
  handleGetClaimByID(claimId) {
    this.setState({ isloading: true });
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/GetClaimByID",
      headers: authHeader(),
      params: { ClaimID: claimId },
    })
      .then(function(response) {
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message == "Success" && responseData) {
          var orderDetails = [];
          var imageURL = "";
          if (responseData.customOrderMaster) {
            orderDetails.push(responseData.customOrderMaster);
          }
          if (responseData.attachments.length > 0) {
            imageURL = responseData.attachments[0].attachmentName;
          } else {
            imageURL = "";
          }
          var canApproveclaim = responseData.canApproveclaim;
          var ticketingTaskID = responseData.ticketingTaskID;
          var ticketID = responseData.ticketID;
          var assignToName = responseData.assignTo;
          var targetClouserDate = responseData.targetClouserDate;
          var assigneeID = responseData.assigneeID;
          var oldAssignID = responseData.assigneeID;
          var status = responseData.status;
          var orderItems;
          if (responseData.customOrderMaster) {
            orderItems = responseData.customOrderMaster.orderItems;
          } else {
            orderItems = [];
          }

          self.setState({
            canApproveclaim,
            oldAssignID,
            status,
            assigneeID,
            assignToName,
            targetClouserDate,
            ticketingTaskID,
            ticketID,
            imageURL,
            selectBrand: responseData.brandID,
            list1Value: responseData.categoryID,
            ListOfSubCate: responseData.subCategoryID,
            ListOfIssue: responseData.issueTypeID,
            claimPercentage: responseData.claimAskFor,
            customerName: responseData.customerName,
            customerPhoneNumber: responseData.customerPhoneNumber,
            customerAlternateNumber: responseData.customerAlternateNumber,
            emailID: responseData.emailID,
            alternateEmailID: responseData.alternateEmailID,
            gender: responseData.gender,
            orderDetailsData: orderDetails,
            OrderSubItem: orderItems,
          });
          self.handleGetCategoryList(responseData.brandID);
          setTimeout(() => {
            self.handleGetSubCategoryList();
          }, 100);
          setTimeout(() => {
            self.handleGetIssueTypeList();
          }, 100);
        }
      })
      .catch((response) => {
        self.setState({ isloading: false });
        console.log(response, "---handleGetTaskData");
      });
  }
  ////handle add comment on claim
  handleAddStoreClaimCommentsApproveReject(isRejectComment) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    if (this.state.claimComments !== "" || this.state.rejectComment !== "") {
      var comment = "";
      if (this.state.claimComments !== "") {
        comment = this.state.claimComments;
      } else {
        comment = this.state.rejectComment;
      }
      this.setState({ isCommentSubmit: true });
      axios({
        method: "post",
        url: config.apiUrl + "/StoreClaim/StoreClaimCommentByApprovel",
        params: {
          ClaimID: this.state.claimID,
          Comment: comment,
          iSRejectComment: isRejectComment,
        },
        headers: authHeader(),
      })
        .then(function(res) {
          let status = res.data.message;
          let data = res.data.responseData;
          self.setState({ isCommentSubmit: false });
          if (status === "Success") {
            if (!isRejectComment)
              NotificationManager.success(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.recordsavedsuccessfully
                  : "Record saved successfully."
              );
            self.setState({
              claimComments: "",
              rejectComment: "",
              rejectModal: false,
            });
            self.handleGetStoreClaimComments(self.state.claimID);
          } else {
            NotificationManager.error(res.data.message);
          }
        })
        .catch((data) => {
          self.setState({ isCommentSubmit: false });
          console.log(data);
        });
    } else {
      NotificationManager.error(
        TranslationContext !== undefined
          ? TranslationContext.alertmessage.pleaseentercomment
          : "Please Enter Comment."
      );
    }
  }

  handleOnChange(e) {
    if (e.currentTarget.name === "finalClaimPercentage") {
      if (isNaN(e.currentTarget.value)) {
        return false;
      }
      var splitText = e.currentTarget.value.split(".");
      var index = e.currentTarget.value.indexOf(".");
      if (parseFloat(e.currentTarget.value) <= 100) {
        if (index != -1) {
          if (splitText) {
            if (splitText[1].length <= 2) {
              if (index != -1 && splitText.length === 2) {
                this.setState({ finalClaimPercentage: e.currentTarget.value });
              }
            } else {
              return false;
            }
          } else {
            this.setState({ finalClaimPercentage: e.currentTarget.value });
          }
        } else {
          this.setState({ finalClaimPercentage: e.currentTarget.value });
        }
      } else {
        this.setState({ finalClaimPercentage: "" });
      }
    } else {
      this.setState({ [e.currentTarget.name]: e.currentTarget.value });
    }
  }
  ////handle get store claim comment by id
  handleGetStoreClaimComments(claimId) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/GetClaimCommentForApprovel",
      headers: authHeader(),
      params: { ClaimID: claimId },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        var approveCommentData = [];
        var rejectCommentData = [];
        if (status === "Success") {
          for (let i = 0; i < data.length; i++) {
            if (data[i].isRejectComment === true) {
              rejectCommentData.push(data[i]);
            } else {
              approveCommentData.push(data[i]);
            }
          }
          self.setState({
            commentData: data,
            approveCommentData,
            rejectCommentData,
          });
        } else {
          self.setState({
            commentData: [],
            approveCommentData,
            rejectCommentData,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleApproveRejectClaim(IsApprove, e) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;

    if (this.state.finalClaimPercentage !== "") {
      if (IsApprove) {
        this.setState({ isApproveSubmit: true });
      } else {
        this.setState({ isRejectSubmit: true });
      }
      axios({
        method: "post",
        url: config.apiUrl + "/StoreClaim/IsClaimApprove",
        headers: authHeader(),
        params: {
          claimID: this.state.claimID,
          finalClaimAsked: this.state.finalClaimPercentage,
          IsApprove: IsApprove,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          self.setState({ isApproveSubmit: false, isRejectSubmit: false });
          if (status === "Success") {
            if (IsApprove == true) {
              NotificationManager.success(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.recordapprovedsuccessfully
                  : "Record approved successfully."
              );
              self.props.history.push("/store/claim");
            } else {
              NotificationManager.success(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.recordrejectedsuccessfully
                  : "Record rejected successfully."
              );
              self.props.history.push("/store/claim");
            }
          } else {
            NotificationManager.error(res.data.message);
          }
        })
        .catch((data) => {
          self.setState({ isApproveSubmit: false, isRejectSubmit: false });
          console.log(data);
        });
    } else {
      NotificationManager.error(
        TranslationContext !== undefined
          ? TranslationContext.alertmessage.pleaseenterfinalclaimpercentage
          : "Please enter final claim percentage."
      );
    }
  }
  ////handle brand change
  handleBrandChange = (e) => {
    const TranslationContext = this.state.translateLanguage.default;
    let value = e.target.value;
    if (value !== "0") {
      this.state.errors["Brand"] = "";
      this.setState({
        errors: this.state.errors,
        selectBrand: value,
        categoryDropData: [],
        SubCategoryDropData: [],
        ListOfIssueData: [],
        claimComments: "",
      });
      setTimeout(() => {
        if (this.state.selectBrand) {
          this.handleGetCategoryList();
        }
      }, 1);
    } else {
      this.state.errors["Brand"] =
        TranslationContext !== undefined
          ? TranslationContext.alertmessage.pleaseselectbrand
          : "Please select Brand";
      this.setState({
        errors: this.state.errors,
        selectBrand: value,
        categoryDropData: [],
        SubCategoryDropData: [],
        ListOfIssueData: [],
        claimComments: "",
      });
    }
  };

  handleGetCategoryList = async (id, type) => {
    let self = this;
    var braindID;
    if (type == "edit") {
      braindID = this.state.editCategory.brandID;
    } else {
      if (id) {
        braindID = id;
      } else {
        braindID = this.state.selectBrand;
      }
    }
    await axios({
      method: "post",
      url: config.apiUrl + "/Category/GetClaimCategoryListByBrandID",
      headers: authHeader(),
      params: {
        BrandID: braindID,
      },
    })
      .then(function(res) {
        let data = res.data;
        self.setState({ categoryDropData: data });
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleCategoryChange = (e) => {
    const TranslationContext = this.state.translateLanguage.default;
    var value = e.target.value;
    if (value !== "0") {
      this.state.errors["Category"] = "";
      this.setState({
        list1Value: value,
        SubCategoryDropData: [],
        errors: this.state.errors,
      });
      setTimeout(() => {
        if (this.state.list1Value) {
          this.handleGetSubCategoryList(value);
        }
      }, 10);
    } else {
      this.state.errors["Category"] =
        TranslationContext !== undefined
          ? TranslationContext.placeholder.pleaseselectclaimcategory
          : "Please select claim category";
      this.setState({ showList1: true, errors: this.state.errors });
    }
  };

  handleGetSubCategoryList = async (id) => {
    let self = this;
    var Category_Id = "";
    if (id === "edit") {
      Category_Id = this.state.editCategory.categoryID;
    } else {
      Category_Id = this.state.list1Value;
    }
    await axios({
      method: "post",
      url: config.apiUrl + "/Category/GetClaimSubCategoryByCategoryID",
      headers: authHeader(),
      params: {
        CategoryID: Category_Id,
      },
    })
      .then(function(res) {
        let data = res.data.responseData;
        self.setState({ SubCategoryDropData: data });
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleSubCatOnChange = (e) => {
    const TranslationContext = this.state.translateLanguage.default;
    var value = e.target.value;
    if (value !== "0") {
      this.state.errors["SubCategory"] = "";
      this.setState({ ListOfSubCate: value, errors: this.state.errors });
      setTimeout(() => {
        if (this.state.ListOfSubCate) {
          this.handleGetIssueTypeList();
        }
      }, 1);
    } else {
      this.state.errors["SubCategory"] =
        TranslationContext !== undefined
          ? TranslationContext.validation.pleaseselectsubcategory
          : "Please select sub category";
      this.setState({ errors: this.state.errors });
    }
  };

  handleGetIssueTypeList(id) {
    let self = this;
    var SubCat_Id = 0;
    if (id === "edit") {
      SubCat_Id = this.state.editCategory.subCategoryID;
    } else {
      SubCat_Id = this.state.ListOfSubCate;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetClaimIssueTypeList",
      headers: authHeader(),
      params: {
        SubCategoryID: SubCat_Id,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ ListOfIssueData: data });
        } else {
          self.setState({ ListOfIssueData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleIssueOnChange = (e) => {
    const TranslationContext = this.state.translateLanguage.default;
    const value = e.target.value;
    if (value !== "0") {
      this.state.errors["IssueType"] = "";
      this.setState({ ListOfIssue: value, errors: this.state.errors });
    } else {
      this.state.errors["IssueType"] =
        TranslationContext !== undefined
          ? TranslationContext.validation.pleaseselectclaimtype
          : "Please select claim type";
      this.setState({ errors: this.state.errors });
    }
  };
  handlePercentageOnChange = (e) => {
    alert();
    const value = e.target.value;
    let IsNumber = false;
    let RE = /^-{0,1}\d*\.{0,1}\d+$/;
    IsNumber = RE.test(value);
    if (IsNumber) {
      console.log(IsNumber);
    }
  };
  handleOrderChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  ////handle reject comment modal open
  handleRejectModalOpen() {
    const TranslationContext = this.state.translateLanguage.default;
    if (this.state.finalClaimPercentage !== "") {
      this.setState({ rejectModal: true });
    } else {
      NotificationManager.error(
        TranslationContext !== undefined
          ? TranslationContext.alertmessage.pleaseenterfinalclaimpercentage
          : "Please enter final claim percentage."
      );
    }
  }
  ////handle reject comment modal close
  handleRejectModalClose() {
    this.setState({ rejectModal: false });
  }
  ////handle change reject comment
  handleRejectCommentChange(e) {
    const TranslationContext = this.state.translateLanguage.default;
    if (e.target.value !== "") {
      this.setState({ rejectComment: e.target.value, isrejectComment: "" });
    } else {
      this.setState({
        rejectComment: e.target.value,
        isrejectComment:
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseentervalidreason
            : "Please enter valid reason.",
      });
    }
  }
  ////handle assgin to modal open
  handleAssginToModalOpen() {
    if (this.state.agentId) {
      this.setState({ assginToModal: true });
    } else {
      NotificationManager.error("Please Select Re-Assign Name.");
    }
  }
  ///handle assgin to modal close
  handleAssginToModalClose() {
    this.setState({ assginToModal: false });
  }
  ////handle assign to with comment
  handleAssigntoWithComment() {
    const TranslationContext = this.state.translateLanguage.default;
    if (this.state.assignComment !== "" && this.state.isAssignComment == "") {
      this.handleAssignClaim();
      this.handleAddStoreComment();
    } else {
      this.setState({
        isAssignComment:
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseentercomment
            : "Please enter comment.",
      });
    }
  }
  ////handel comment change
  handleAssignCommentChange(e) {
    const TranslationContext = this.state.translateLanguage.default;
    if (e.target.value !== "") {
      this.setState({ assignComment: e.target.value, isAssignComment: "" });
    } else {
      this.setState({
        assignComment: e.target.value,
        isAssignComment:
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseentercomment
            : "Please enter comment.",
      });
    }
  }
  ////handle add store comment
  handleAddStoreComment() {
    const TranslationContext = this.state.translateLanguage.default;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/AddStoreClaimComment",
      headers: authHeader(),
      params: {
        claimID: this.state.claimID,
        newAssignID: this.state.agentId,
        oldAssignID: this.state.oldAssignID,
        comment: this.state.assignComment,
      },
    })
      .then(function(response) {
        var message = response.data.message;
        if (message == "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.storecommentaddedsuccessfully
              : "Store comment added successfully."
          );
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.storecommentnotadded
              : "Store comment not added."
          );
        }
      })
      .catch((response) => {
        console.log(response, "---handleAddStoreComment");
      });
  }

  ////handle get cliam comment by claim id
  handleGetClaimCommentByClaimID(ClaimID) {
    var claimID = 0;
    if (ClaimID > 0) {
      claimID = ClaimID;
    } else {
      claimID = this.state.claimID;
    }
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreClaim/GetClaimCommentByClaimID",
      headers: authHeader(),
      params: {
        claimID: claimID,
      },
    })
      .then(function(response) {
        var message = response.data.message;
        var storeCommetData = response.data.responseData;
        if (message === "Success" && storeCommetData) {
          self.setState({ storeCommetData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleAddStoreComment");
      });
  }
  ///handle re assign modal skip button on click
  handleSkipButtonClick() {
    // this.handleAddStoreComment();
    this.handleAssignClaim();
  }
  ////handle reject modal submit button on click
  handleRejectModalSubmit() {
    const TranslationContext = this.state.translateLanguage.default;
    if (this.state.rejectComment !== "") {
      this.handleAddStoreClaimCommentsApproveReject(true);
      this.handleApproveRejectClaim(false);
    } else {
      this.setState({
        isrejectComment:
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseentervalidreason
            : "Please enter valid reason.",
      });
    }
  }

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    const { orderDetailsData } = this.state;

    return (
      <Fragment>
        <div className="row claim-header-card width">
          <div className="col-md-6">
            <label className="claim-title1">
              {TranslationContext !== undefined
                ? TranslationContext.label.claimticketid
                : "Claim Ticket ID :"}
            </label>
            <label className="claim-A22345">{this.state.claimID}</label>
            {this.state.ticketingTaskID > 0 ? (
              <>
                <label className="claim-title1">
                  {TranslationContext !== undefined
                    ? TranslationContext.span.taskid
                    : "Task ID"}
                  :
                </label>
                <label className="claim-A22345">
                  {this.state.ticketingTaskID}
                </label>
              </>
            ) : (
              ""
            )}
            {this.state.ticketID > 0 ? (
              <>
                <label className="claim-title1">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.ticketid
                    : "Ticket ID"}
                  :
                </label>
                <label className="claim-A22345">{this.state.ticketID}</label>
              </>
            ) : null}
          </div>
          <div className="col-md-6">
            {this.state.AssignTab && (
              <>
                {this.state.canApproveclaim ? (
                  <div className="btn-approrej">
                    <button
                      type="button"
                      className="btn-approrej1"
                      style={{ width: "165px" }}
                      onClick={this.handleApproveRejectClaim.bind(this, true)}
                      disabled={this.state.isApproveSubmit}
                    >
                      {this.state.isApproveSubmit ? (
                        <FontAwesomeIcon
                          className="circular-loader"
                          icon={faCircleNotch}
                          spin
                        />
                      ) : null}
                      {TranslationContext !== undefined
                        ? TranslationContext.button.approveclaim
                        : "APPROVE CLAIM"}
                    </button>
                    <button
                      type="button"
                      className="btn-approrej1"
                      onClick={this.handleRejectModalOpen.bind(this)}
                      disabled={this.state.isRejectSubmit}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.button.rejectclaim
                        : "REJECT CLAIM"}
                    </button>
                  </div>
                ) : null}
              </>
            )}

            {/* <div className="d-inline-block" style={{ marginLeft: "100px",float:this.state.canApproveclaim?"none":"right" }}> */}
            <div
              className="d-inline-block"
              style={{ marginRight: "10px", float: "right" }}
            >
              <a
                style={{
                  marginTop: this.state.targetClouserDate ? "5px" : "11px",
                }}
                className="d-inline-block"
                onClick={this.handleGetUserDropdown.bind(this)}
              >
                <div className="oval-5-1-new-store">
                  <img src={storeImg} alt="headphone" className="storeImg-11" />
                </div>
                <label
                  className="naman-r claimtextoverflow"
                  title={this.state.assignToName}
                >
                  {this.state.assignToName}
                </label>
                <img src={DownImg} alt="down" className="down-header" />
              </a>
              {this.state.targetClouserDate && (
                <p className="closure-date">
                  {TranslationContext !== undefined
                    ? TranslationContext.ticketingDashboard.closuredate
                    : "Closure Date"}
                  : {this.state.targetClouserDate}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="back-color">
          <div className="row" style={{ margin: "0" }}>
            <div className="col-md-9" style={{ padding: "0" }}>
              <div className="card card-radius" style={{ margin: "0 0 20px" }}>
                <div
                  className="search-customer-padding cusrow"
                  style={{ padding: "30px" }}
                >
                  <div
                    className=""
                    style={{
                      border: "1px solid #EEE",
                      borderRadius: "5px",
                      margin: "0 15px",
                    }}
                  >
                    <div className="claim-status-card">
                      <label>
                        <b>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.claimstatus
                            : "Claim Status"}
                          : {this.state.status}
                        </b>
                      </label>
                      <div className="claimplus">
                        <span className="plusline1new"></span>
                        <img
                          src={ArrowImg}
                          alt="Arrow"
                          className="arrow-img-1"
                        />
                        <span className="plusline2"></span>
                        <img
                          src={PlusImg}
                          alt="Plush"
                          className="plush-img-1"
                          onClick={this.handleToggle.bind(this)}
                        />
                      </div>
                    </div>

                    <Collapse
                      isOpen={this.state.collapse}
                      style={{ width: "100%" }}
                    >
                      <Card className="w-100">
                        <CardBody style={{ padding: "15px 0 0 0" }}>
                          <div className="row mx-0">
                            <div className="col-md-6">
                              <label className="orderdetailtext">
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.orderdetails
                                  : "Order details"}
                              </label>
                            </div>

                            <span className="Searchline"> </span>
                          </div>
                          {this.state.SearchDetails ? (
                            <div
                              style={{
                                borderTop: "1px solid #EEE",
                                marginTop: "12px",
                              }}
                            >
                              <div className="reacttableordermodal">
                                {orderDetailsData.length > 0 ? (
                                  <Table
                                    className="components-table-demo-nested custom-antd-table"
                                    dataSource={orderDetailsData}
                                    columns={[
                                      {
                                        title:
                                          TranslationContext !== undefined
                                            ? TranslationContext.span
                                                .invoicenumber
                                            : "Invoice Number",
                                        dataIndex: "invoiceNumber",
                                      },
                                      {
                                        title:
                                          TranslationContext !== undefined
                                            ? TranslationContext.span
                                                .invoicedate
                                            : "Invoice Date",
                                        dataIndex: "dateFormat",
                                      },
                                      {
                                        title:
                                          TranslationContext !== undefined
                                            ? TranslationContext.span
                                                .invoicecount
                                            : "Item Count",
                                        dataIndex: "itemCount",
                                      },
                                      {
                                        title:
                                          TranslationContext !== undefined
                                            ? TranslationContext.span.itemprice
                                            : "Item Price",
                                        dataIndex: "ordeItemPrice",
                                      },
                                      {
                                        title:
                                          TranslationContext !== undefined
                                            ? TranslationContext.label.pricepaid
                                            : "Price Paid",
                                        dataIndex: "orderPricePaid",
                                      },
                                      {
                                        title:
                                          TranslationContext !== undefined
                                            ? TranslationContext.label.storecode
                                            : "Store Code",
                                        dataIndex: "storeCode",
                                      },
                                      {
                                        title:
                                          TranslationContext !== undefined
                                            ? TranslationContext.label
                                                .storeaddress
                                            : "Store Address",
                                        dataIndex: "storeAddress",
                                      },
                                      {
                                        title:
                                          TranslationContext !== undefined
                                            ? TranslationContext.label.discount
                                            : "Discount",
                                        dataIndex: "discount",
                                      },
                                    ]}
                                    expandedRowRender={(row) => {
                                      return (
                                        <Table
                                          dataSource={this.state.OrderSubItem.filter(
                                            (x) =>
                                              x.orderMasterID ===
                                              row.orderMasterID
                                          )}
                                          columns={[
                                            {
                                              title:
                                                TranslationContext !== undefined
                                                  ? TranslationContext.span
                                                      .articlenumber
                                                  : "Article Number",
                                              dataIndex: "articleNumber",
                                            },
                                            {
                                              title:
                                                TranslationContext !== undefined
                                                  ? TranslationContext.span
                                                      .articlename
                                                  : "Article Name",
                                              dataIndex: "articleName",
                                            },
                                            {
                                              title:
                                                TranslationContext !== undefined
                                                  ? TranslationContext
                                                      .ticketingDashboard
                                                      .articlemrp
                                                  : "Article MRP",
                                              dataIndex: "itemPrice",
                                            },
                                            {
                                              title:
                                                TranslationContext !== undefined
                                                  ? TranslationContext.label
                                                      .pricepaid
                                                  : "Price Paid",
                                              dataIndex: "pricePaid",
                                            },
                                            {
                                              title:
                                                TranslationContext !== undefined
                                                  ? TranslationContext.label
                                                      .discount
                                                  : "Discount",
                                              dataIndex: "discount",
                                            },
                                          ]}
                                          pagination={false}
                                        />
                                      );
                                    }}
                                    pagination={false}
                                  />
                                ) : null}
                              </div>
                            </div>
                          ) : (
                            <div className="uploadsearch">
                              <div className="row">
                                <div className="col-md-12 uploadsechmargin">
                                  <label className="uploadsearch-text">
                                    {TranslationContext !== undefined
                                      ? TranslationContext.label
                                          .noorderfoundwiththisnumber
                                      : "No order found with this number"}
                                  </label>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12 uploadsechmargin">
                                  <button
                                    type="button"
                                    className="uploadsearchbtn"
                                  >
                                    <label
                                      for="file-upload"
                                      className="uploadsearchbtn-text"
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.label.uploadfile
                                        : "UPLOAD FILE"}
                                    </label>
                                  </button>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-12 uploadsechmargin">
                                  <u>
                                    <a href="#!">
                                      {TranslationContext !== undefined
                                        ? TranslationContext.ticketingDashboard
                                            .downloadsamplefile
                                        : "DOWNLOAD SAMPLE FILE"}
                                    </a>
                                  </u>
                                </div>
                              </div>
                            </div>
                          )}
                        </CardBody>
                      </Card>
                    </Collapse>
                  </div>
                  <div className="row w-100">
                    <div className="form-group col-md-4">
                      <label className="label-6">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.brand
                          : "Brand"}
                      </label>
                      <select
                        id="inputState"
                        className="form-control dropdown-label"
                        value={this.state.selectBrand}
                        onChange={this.handleBrandChange}
                        disabled={true}
                      >
                        <option>
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
                    </div>
                    <div className="form-group col-md-4">
                      <label className="label-6">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.claimcategory
                          : "Claim Category"}
                      </label>
                      <select
                        id="inputState"
                        className="form-control dropdown-label"
                        onChange={this.handleCategoryChange}
                        value={this.state.list1Value}
                        disabled={true}
                      >
                        <option value={0}>
                          {TranslationContext !== undefined
                            ? TranslationContext.button.select
                            : "Select"}
                        </option>
                        {this.state.categoryDropData !== null &&
                          this.state.categoryDropData.map((item, i) => (
                            <option
                              key={i}
                              value={item.categoryID}
                              className="select-category-placeholder"
                            >
                              {item.categoryName}
                            </option>
                          ))}
                      </select>

                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.errors["Category"]}
                      </p>
                    </div>
                    <div className="form-group col-md-4">
                      <label className="label-6">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.subcategory
                          : "Sub Category"}
                      </label>
                      <select
                        id="inputState"
                        className="form-control dropdown-label"
                        onChange={this.handleSubCatOnChange}
                        value={this.state.ListOfSubCate}
                        disabled={true}
                      >
                        <option value={0}>
                          {TranslationContext !== undefined
                            ? TranslationContext.button.select
                            : "Select"}
                        </option>
                        {this.state.SubCategoryDropData !== null &&
                          this.state.SubCategoryDropData.map((item, i) => (
                            <option
                              key={i}
                              value={item.subCategoryID}
                              className="select-category-placeholder"
                            >
                              {item.subCategoryName}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="form-group col-md-4">
                      <label className="label-6">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.claimtype
                          : "Claim Type"}
                      </label>
                      <select
                        id="inputState"
                        className="form-control dropdown-label"
                        onChange={this.handleIssueOnChange}
                        value={this.state.ListOfIssue}
                        disabled={true}
                      >
                        <option value={0}>
                          {TranslationContext !== undefined
                            ? TranslationContext.button.select
                            : "Select"}
                        </option>
                        {this.state.ListOfIssueData !== null &&
                          this.state.ListOfIssueData.map((item, i) => (
                            <option
                              key={i}
                              value={item.issueTypeID}
                              className="select-category-placeholder"
                            >
                              {item.issueTypeName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-4">
                      <label className="label-6">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.claimaskedfor
                          : "Claim Asked for %"}
                      </label>
                      <input
                        type="text"
                        className="form-control textBox"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.label.claimpercentage
                            : "Claim Percentage"
                        }
                        name="claimPercentage"
                        disabled={true}
                        value={this.state.claimPercentage}
                        disabled={true}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col-md-4">
                      <label className="label-6" style={{ display: "block" }}>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.attachedimage
                          : "Attached Image"}
                      </label>
                      {this.state.imageURL !== "" ? (
                        <img
                          src={this.state.imageURL}
                          alt="Bata"
                          className="claim-bataShoes"
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className="row" style={{ margin: "0" }}>
                    <div className="col-md-4">
                      <label className="label-6">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.commentsbystore
                          : "Comments By Store"}
                      </label>
                    </div>
                  </div>
                  {this.state.storeCommetData !== null &&
                    this.state.storeCommetData.map((item, i) => {
                      return (
                        <div key={i}>
                          <div className="row" style={{ margin: "0" }}>
                            <div className="col-xs-3">
                              <img
                                src={Headphone2Img}
                                alt="headphone"
                                className="oval-55 naman"
                              />
                            </div>
                            <div className="col-md-9">
                              <label className="naman-R">{item.name}</label>
                            </div>
                            <div className="col-md-2">
                              <label className="hr-ago">{item.datetime}</label>
                            </div>
                          </div>
                          <div className="row" style={{ margin: "0" }}>
                            <label className="naman-R allign-reassign">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.reassignto
                                : "Reassign to"}{" "}
                              {item.newAgentName}
                            </label>
                          </div>
                          <div className="row" style={{ margin: "0" }}>
                            <label className="label-6">
                              {TranslationContext !== undefined
                                ? TranslationContext.span.comments
                                : "Comments"}
                              :
                            </label>
                          </div>
                          <div className="row" style={{ margin: "0" }}>
                            <div style={{ width: "100%" }}>
                              <label className="claim-comment">
                                {item.comment}
                              </label>
                              <hr />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div
                className="card card-radius"
                style={{ padding: "30px 45px 30px" }}
              >
                <div className="search-customer-padding p-0">
                  <div className="row" style={{ margin: "0" }}>
                    <div
                      className="form-group col-md-4"
                      style={{ padding: "0" }}
                    >
                      <label className="label-6">
                        {TranslationContext !== undefined
                          ? TranslationContext.ticketingDashboard
                              .finalclaimaskedfor
                          : "Final Claim Asked for"}
                        %
                      </label>
                      <input
                        type="text"
                        className="form-control textBox"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.label.claimpercentage
                            : "Claim Percentage"
                        }
                        name="finalClaimPercentage"
                        value={this.state.finalClaimPercentage}
                        onChange={this.handleOnChange}
                        autoComplete="off"
                      />
                    </div>
                  </div>

                  <div className="row" style={{ margin: "0" }}>
                    <div style={{ width: "100%" }}>
                      <label className="label-6">
                        {TranslationContext !== undefined
                          ? TranslationContext.ticketingDashboard
                              .commentsbyapproval
                          : "Comments By Approval"}
                      </label>
                      <hr className="mt-0 mb-2" />
                    </div>
                    <div className="" style={{ display: "contents" }}>
                      <textarea
                        style={{ padding: "10px" }}
                        className="ticket-comments-textarea mt-1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.ticketingDashboard
                                .addyourcommenthere
                            : "Add your Comment here"
                        }
                        name="claimComments"
                        value={this.state.claimComments}
                        onChange={this.handleOnChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="commentbt">
                    <button
                      type="button"
                      className="commentbtn"
                      onClick={this.handleAddStoreClaimCommentsApproveReject.bind(
                        this,
                        false
                      )}
                    >
                      {this.state.isCommentSubmit ? (
                        <FontAwesomeIcon
                          className="circular-loader"
                          icon={faCircleNotch}
                          spin
                        />
                      ) : null}
                      <label className="txt">
                        {TranslationContext !== undefined
                          ? TranslationContext.button.addcomment
                          : "ADD COMMENT"}
                      </label>
                    </button>
                  </div>
                  <div className="row mt-4" style={{ margin: "0" }}>
                    <div className="">
                      <label className="label-6">
                        {TranslationContext !== undefined
                          ? TranslationContext.ticketingDashboard
                              .commentsbyapproval
                          : "Comments By Approval"}
                        :
                        {this.state.approveCommentData.length < 9
                          ? "0" + this.state.approveCommentData.length
                          : this.state.commentData.length}
                      </label>
                    </div>
                  </div>
                  {this.state.approveCommentData.map((value, i) => (
                    <div key={i}>
                      <div className="row mb-3" style={{ margin: "0" }}>
                        <div className="col-xs-3">
                          <img
                            src={storeImg}
                            alt="headphone"
                            className="oval-55 naman"
                          />
                        </div>
                        <div className="col-md-9">
                          <label className="naman-R">{value.name}</label>
                        </div>
                        <div className="col-md-2">
                          <label className="hr-ago">{value.commentDate}</label>
                        </div>
                      </div>
                      <div className="row" style={{ margin: "0" }}>
                        <label className="label-6" style={{ paddingTop: "0" }}>
                          {TranslationContext !== undefined
                            ? TranslationContext.span.comments
                            : "Comments"}
                          :
                        </label>
                      </div>
                      <div className="row" style={{ margin: "0" }}>
                        <div style={{ width: "100%" }}>
                          <label className="claim-comment">
                            {value.comment}
                          </label>
                          <hr />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="row" style={{ margin: "0" }}>
                    <div className="">
                      <label className="label-6">
                        {TranslationContext !== undefined
                          ? TranslationContext.ticketingDashboard
                              .commentsbyreject
                          : "Comments By Reject"}
                        :
                        {this.state.rejectCommentData.length < 9
                          ? "0" + this.state.rejectCommentData.length
                          : this.state.rejectCommentData.length}
                      </label>
                    </div>
                  </div>
                  {this.state.rejectCommentData.map((value, i) => (
                    <div key={i}>
                      <div className="row mb-3" style={{ margin: "0" }}>
                        <div className="col-xs-3">
                          <img
                            src={storeImg}
                            alt="headphone"
                            className="oval-55 naman"
                          />
                        </div>
                        <div className="col-md-9">
                          <label className="naman-R">{value.name}</label>
                        </div>
                        <div className="col-md-2">
                          <label className="hr-ago">{value.commentDate}</label>
                        </div>
                      </div>
                      <div className="row" style={{ margin: "0" }}>
                        <label className="label-6" style={{ paddingTop: "0" }}>
                          {TranslationContext !== undefined
                            ? TranslationContext.span.comments
                            : "Comments"}
                          :
                        </label>
                      </div>
                      <div className="row" style={{ margin: "0" }}>
                        <div style={{ width: "100%" }}>
                          <label className="claim-comment">
                            {value.comment}
                          </label>
                          <hr />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card card-radius2 cardbor">
                <div className="alankrit">
                  <label>
                    <b>
                      {TranslationContext !== undefined
                        ? TranslationContext.b.customername
                        : "CUSTOMER NAME"}
                    </b>
                  </label>
                  <label>
                    {this.state.customerName ? (
                      <span className="a">
                        {this.state.customerName.charAt(0).toUpperCase()}
                      </span>
                    ) : (
                      ""
                    )}
                    {this.state.customerName}
                  </label>
                </div>
                <div className="alankrit">
                  <label>
                    <b>
                      {TranslationContext !== undefined
                        ? TranslationContext.b.phonenumber
                        : "PHONE NUMBER"}
                    </b>
                  </label>
                  <label>{this.state.customerPhoneNumber}</label>
                </div>
                <div className="alankrit">
                  <label>
                    <b>
                      {TranslationContext !== undefined
                        ? TranslationContext.b.alternatenumber
                        : "ALTERNATE NUMBER"}
                    </b>
                  </label>
                  <label>{this.state.customerAlternateNumber}</label>
                </div>
                <div className="alankrit">
                  <label>
                    <b>
                      {TranslationContext !== undefined
                        ? TranslationContext.b.email
                        : "EMAIL"}
                    </b>
                  </label>
                  <label>{this.state.emailID}</label>
                </div>
                <div className="alankrit">
                  <label>
                    <b>
                      {TranslationContext !== undefined
                        ? TranslationContext.b.alternateemail
                        : "ALTERNATE EMAIL"}
                    </b>
                  </label>
                  <label>{this.state.alternateEmailID}</label>
                </div>
                <div className="alankrit">
                  <label>
                    <b>
                      {TranslationContext !== undefined
                        ? TranslationContext.b.gender
                        : "GENDER"}
                    </b>
                  </label>
                  <label>{this.state.gender}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* --------------------------User Modal--------------------  */}
        <Modal
          open={this.state.userModel}
          onClose={this.handleUserModelClose.bind(this)}
          closeIconId="close"
          modalId="labelmodel-popup"
          overlayId="logout-ovrly"
        >
          <div className="myTicket-table remov agentlist" id="tic-det-assign">
            <ReactTable
              className="limit-react-table-body"
              data={this.state.userData}
              columns={[
                {
                  Header: (
                    <span>
                      {TranslationContext !== undefined
                        ? TranslationContext.span.empid
                        : "Emp Id"}
                    </span>
                  ),
                  accessor: "user_ID",
                  width: 80,
                },
                {
                  Header: (
                    <span>
                      {TranslationContext !== undefined
                        ? TranslationContext.label.name
                        : "Name"}
                    </span>
                  ),
                  accessor: "userName",
                },
              ]}
              minRows={2}
              showPagination={false}
              resizable={false}
              getTrProps={(rowInfo, column) => {
                const index = column ? column.index : -1;
                return {
                  onClick: (e) => {
                    this.selectedRow = index;
                    var agentId = column.original["user_ID"];
                    this.setState({ agentId });
                  },
                  style: {
                    background: this.selectedRow === index ? "#ECF2F4" : null,
                  },
                };
              }}
            />
            <div className="button-margin">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={this.handleAssginToModalOpen.bind(this)}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.placeholder.select
                  : "SELECT"}
              </button>
            </div>
            <div
              className="cancel-assign"
              onClick={this.handleUserModelClose.bind(this)}
            >
              <img src={CancelImg} alt="cancel" />
            </div>
          </div>
        </Modal>
        {/* -------------------------reject modal------------------------ */}
        <Modal
          open={this.state.rejectModal}
          onClose={this.handleRejectModalClose.bind(this)}
          closeIconId="sdsg"
          modalId="Historical-popup"
          overlayId="logout-ovrly"
          classNames={{
            modal: "rejectmodal-popup",
          }}
        >
          <div className="commenttextborder">
            <div className="comment-disp">
              <div className="Commentlabel">
                <label className="Commentlabel1">
                  {TranslationContext !== undefined
                    ? TranslationContext.ticketingDashboard.reasonforrejection
                    : "Reason for Rejection"}
                </label>
              </div>
              <div>
                <img
                  src={CancelImg}
                  alt="Minus"
                  className="pro-cross-icn m-0"
                  onClick={this.handleRejectModalClose.bind(this)}
                />
              </div>
            </div>
            <div className="commenttextmessage">
              <textarea
                cols="31"
                rows="3"
                className="ticketMSGCmt-textarea"
                maxLength={300}
                value={this.state.rejectComment}
                onChange={this.handleRejectCommentChange.bind(this)}
              ></textarea>
            </div>
            {this.state.isrejectComment !== "" && (
              <p style={{ color: "red", marginTop: "0px" }}>
                {this.state.isrejectComment}
              </p>
            )}

            <div className="SendCommentBtn" style={{ margin: "0" }}>
              <button
                className="SendCommentBtn1"
                onClick={this.handleRejectModalSubmit.bind(this)}
                disabled={this.state.isRejectSubmit}
              >
                {this.state.isRejectSubmit ? (
                  <FontAwesomeIcon
                    className="circular-loader"
                    icon={faCircleNotch}
                    spin
                  />
                ) : null}
                {TranslationContext !== undefined
                  ? TranslationContext.button.submit
                  : "SUBMIT"}
              </button>
            </div>
          </div>
        </Modal>
        {/* -------------------------assign to modal------------------------ */}
        <Modal
          open={this.state.assginToModal}
          onClose={this.handleAssginToModalClose.bind(this)}
          closeIconId="sdsg"
          modalId="Historical-popup"
          overlayId="logout-ovrly"
          classNames={{
            modal: "rejectmodal-popup",
          }}
        >
          <div className="commenttextborder">
            <div className="comment-disp">
              <div className="Commentlabel">
                <label className="Commentlabel1">
                  {TranslationContext !== undefined
                    ? TranslationContext.button.addcomment
                    : "Add Comment"}
                </label>
              </div>
              <div>
                <img
                  src={CancelImg}
                  alt="Minus"
                  className="pro-cross-icn m-0"
                  onClick={this.handleAssginToModalClose.bind(this)}
                />
              </div>
            </div>
            <div className="commenttextmessage">
              <textarea
                cols="31"
                rows="3"
                className="ticketMSGCmt-textarea"
                maxLength={300}
                value={this.state.assignComment}
                onChange={this.handleAssignCommentChange.bind(this)}
              ></textarea>
            </div>
            {this.state.isAssignComment !== "" && (
              <p style={{ color: "red", marginTop: "0px" }}>
                {this.state.isAssignComment}
              </p>
            )}
            <div className="SendCommentBtn" style={{ float: "left" }}>
              <button
                className="SendCommentBtn1"
                onClick={this.handleSkipButtonClick.bind(this)}
                disabled={this.state.isSkipSubmit}
              >
                {this.state.isSkipSubmit ? (
                  <FontAwesomeIcon
                    className="circular-loader"
                    icon={faCircleNotch}
                    spin
                  />
                ) : null}
                {TranslationContext !== undefined
                  ? TranslationContext.button.skip
                  : "SKIP"}
              </button>
            </div>
            <div className="SendCommentBtn" style={{ margin: "0" }}>
              <button
                className="SendCommentBtn1"
                onClick={this.handleAssigntoWithComment.bind(this)}
                disabled={this.state.isAddSubmit}
              >
                {this.state.isAddSubmit ? (
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
        </Modal>
      </Fragment>
    );
  }
}

export default withRouter(ClaimApproveReject);
