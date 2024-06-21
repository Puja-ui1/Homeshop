import React, { Component, Fragment } from "react";
import Modal from "react-responsive-modal";
import storeImg from "./../../assets/Images/store.png";
import DownWhiteImg from "./../../assets/Images/down-white.png";
import DownBlueImg from "./../../assets/Images/down.png";
import CancelImg from "./../../assets/Images/cancel.png";
import ReactTable from "react-table";
import NoEditImg from "./../../assets/Images/NoEdit.png";
import { authHeader } from "./../../helpers/authHeader";
import DownArrowIcon from "./../../assets/Images/down-1.png";
import axios from "axios";
import config from "./../../helpers/config";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NotificationManager } from "react-notifications";
import { Progress, DatePicker } from "antd";
import MinusImg from "./../../assets/Images/minus.png";
import SearchBlackImg from "./../../assets/Images/searchBlack.png";
import moment from "moment";
import url from "socket.io-client/lib/url";
class StoreTaskByTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SubmitBtnReopn: false,
      taskId: 0,
      ticketId: 0,
      ticketDetails: {},
      departmentData: [],
      funcationData: [],
      priorityData: [],
      departmentID: 0,
      funcationID: 0,
      taskTitle: "",
      taskDetails: "",
      istaskTitle: "",
      istaskDetails: "",
      isfuncation: "",
      isdepartment: "",
      commentCount: 0,
      commentData: [],
      comment: "",
      iscomment: "",
      iscmtLoading: false,
      isueRaisedBy: "",
      storeName: "",
      storeAddress: "",
      assignToName: "",
      userData: [],
      userModel: false,
      progressData: {},
      canEdit: false,
      canSubmit: false,
      isAssignTo: false,
      taskStatusId: 0,
      taskStatusName: "",
      isAssignComment: "",
      assignComment: "",
      assginToModal: false,
      isSubmit: false,
      programCode: false,
      ticketResponseData: [],
      isStoreModal: false,
      selectedStoreData: [],
      storeDetails: [],
      selectedStore: [],
      CheckStoreID: {},
      SearchStore: "",
      isOrderDetails: false,
      OrdItmBtnStatus: false,
      orderNumber: "",
      selectedInvoiceNo: "",
      orderDetailsData: [],
      OrderSubItem: [],
      SelectedAllOrder: [],
      selectedStoreIds: "",
      attachedFiles: []
    };
    this.handleUserModelOpen = this.handleUserModelOpen.bind(this);
    this.handleUserModelClose = this.handleUserModelClose.bind(this);
  }
  handleSubmitReopnModalOpen() {
    this.setState({ SubmitBtnReopn: true });
  }
  handleSubmitReopnModalClose() {
    this.setState({ SubmitBtnReopn: false });
  }
  componentDidMount() {
    if (this.props.location.state) {
      var taskId = this.props.location.state.TaskID;
      var ticketId = this.props.location.state.TicketID;
      this.setState({ taskId, ticketId });
      this.handleGetStoreTicketingTaskByTaskID(taskId);
      this.handleGetCommentOnTask(taskId);
      this.handleGetStoreTaskProcressBar(taskId);
      this.handleGetPriority();
      this.handleGetDepartement();
      this.handleGetProgramCode();
    } else {
      this.props.history.push("/store/StoreTask");
    }
  }

  handleMultiDownload = (e) => {
    e.preventDefault();
    //debugger
    var temporaryDownloadLink = document.createElement("a");
    temporaryDownloadLink.style.display = 'none';
    document.body.appendChild(temporaryDownloadLink);
    for (var n = 0; n < this.state.attachedFiles.length; n++) {
      var download = this.state.attachedFiles[n];
      // let file = new Blob()
      var file = new Blob(
        [
          download.name,
        ],
        { type: download.Type }
      );
      // temporaryDownloadLink.href = URL.createObjectURL(file);
      temporaryDownloadLink.href = URL.createObjectURL(file);
      temporaryDownloadLink.download = download.name.split('/')[download.name.split('/')?.length - 1];
      temporaryDownloadLink.click();
    }

    document.body.removeChild(temporaryDownloadLink);
  }

  ///handle get priority
  handleGetPriority() {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/StorePriority/GetPriorityList",
      headers: authHeader(),
    })
      .then(function (response) {
        var message = response.data.message;
        var priorityData = response.data.responseData;
        if (message === "Success") {
          self.setState({ priorityData });
        } else {
          self.setState({ priorityData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetPriority");
      });
  }

  ///handle get user dropdown
  handleGetUserDropdown() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/UserDropdown",
      headers: authHeader(),
      params: {
        TaskID: this.state.taskId,
        TaskFor: 2,
      },
    })
      .then(function (response) {
        var userData = response.data.responseData;
        var message = response.data.message;
        if (message === "Success" && userData.length > 0) {
          self.setState({
            userData,
            userModel: true,
          });
        } else {
          self.setState({ userData, userModel: true });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetUserDropdown");
      });
  }
  ////handle get store ticket task by task id
  handleGetStoreTicketingTaskByTaskID(taskId) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetStoreTicketingTaskByTaskID",
      headers: authHeader(),
      params: { TaskID: taskId },
    })
      .then(function (response) {
        var message = response.data.message;
        var responseData = response.data.responseData;
        var departmentID = 0;
        var taskTitle = "";
        var taskDetails = "";
        var funcationID = 0;
        var priorityID = 0;
        var isueRaisedBy = "";
        var storeAddress = "";
        var storeName = "";
        var assignToName = "";
        var canEdit = false;
        var canSubmit = false;
        var isAssignTo = false;
        var taskStatusId = 0;
        var taskStatusName = "";

        if (message === "Success" && responseData) {
          var taskDetailsData = responseData.storeTaskMasterDetails;
          var ticketDetails = responseData.taskTicketDetails;
          departmentID = taskDetailsData.departmentId;
          funcationID = taskDetailsData.functionID;
          taskTitle = taskDetailsData.taskTitle;
          taskDetails = taskDetailsData.taskDescription;
          isueRaisedBy = taskDetailsData.createdByName;
          storeName = taskDetailsData.storeName;
          storeAddress = taskDetailsData.address;
          assignToName = taskDetailsData.assignToName;
          canEdit = taskDetailsData.canEdit === 1 ? true : false;
          canSubmit = taskDetailsData.canSubmit === 1 ? true : false;
          isAssignTo = taskDetailsData.isAssignTo === 1 ? true : false;
          taskStatusId = taskDetailsData.taskStatusId;
          taskStatusName = taskDetailsData.taskStatusName;
          priorityID = taskDetailsData.priorityID;
          var oldassignToID = taskDetailsData.assignToID;
          var agentId = taskDetailsData.assignToID;
          var selectedInvoiceNo = ticketDetails.productNames;
          var selectedStoreIds = ticketDetails.storeID;

          //attachemnt show
          let attachment = []
          for (let i = 0; i < ticketDetails.ticketattachments?.length; i++) {
            var objFile = new Object();
            var name = ticketDetails.ticketattachments[i].attachmentName;
            var type = name.substring(name.lastIndexOf(".") + 1, name.length);
            objFile.Type = type;
            objFile.name = name;

            objFile.File = ticketDetails.ticketattachments[i];

            // this.state.file.push(objFile);
            attachment.push(objFile);
          }
          self.setState({
            attachedFiles: attachment,
            agentId,
            oldassignToID,
            priorityID,
            canEdit,
            isAssignTo,
            canSubmit,
            taskStatusId,
            taskStatusName,
            assignToName,
            isueRaisedBy,
            storeAddress,
            storeName,
            ticketDetails,
            departmentID,
            funcationID,
            taskTitle,
            taskDetails,
            selectedInvoiceNo,
            selectedStoreIds,
          });
          if (ticketDetails) {
            self.handleGetResponseData(ticketDetails.ticketID);
          }
          if (departmentID > 0) {
            setTimeout(() => {
              self.handleGetFuncationByDepartmentId();
            }, 10);
          }
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetStoreTicketingTaskByTaskID");
      });
  }
  ////handle get department list
  handleGetDepartement() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getDepartmentList",
      headers: authHeader(),
    })
      .then(function (response) {
        var message = response.data.message;
        var departmentData = response.data.responseData;
        if (message === "Success") {
          self.setState({ departmentData });
        } else {
          self.setState({ departmentData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetDepartement");
      });
  }
  ///handle get funcation by department id
  handleGetFuncationByDepartmentId() {
    let self = this;
    var DepartmentId = this.state.departmentID;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getFunctionNameByDepartmentId",
      headers: authHeader(),
      params: { DepartmentId: DepartmentId },
    })
      .then(function (response) {
        var message = response.data.message;
        var funcationData = response.data.responseData;
        if (message === "Success") {
          self.setState({ funcationData });
        } else {
          self.setState({ funcationData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetFuncationByDepartmentId");
      });
  }
  ////handle get comment on task
  handleGetCommentOnTask(taskId) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetCommentOnTask",
      headers: authHeader(),
      params: { TaskID: taskId, taskFor: 2 },
    })
      .then(function (response) {
        var message = response.data.message;
        var commentData = response.data.responseData;
        var commentCount = commentData.length;

        if (message === "Success" && commentData.length > 0) {
          self.setState({ commentCount, commentData });
        } else {
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetCommentOnTask");
      });
  }
  ////handle add comment by task id
  handleAddCommentByTaskId() {
    let self = this;
    if (this.state.comment == "") {
      this.setState({ iscomment: "Please Enter Comment." });
    } else {
      this.setState({ iscomment: "" });
    }

    if (this.state.comment !== "") {
      this.setState({ iscmtLoading: true });

      var inputParams = {};
      inputParams.TaskID = this.state.taskId;
      inputParams.Comment = this.state.comment.trim();
      inputParams.TaskFor = 2;
      const formData = new FormData();

      // for (let i = 0; i < this.state.attachmentValue.length; i++) {
      //   formData.append("file", this.state.attachmentValue[i]);
      // }
      formData.append('TaskComment', JSON.stringify(inputParams));


      axios({
        method: "post",
        url: config.apiUrl + "/StoreTask/AddStoreTaskComment",
        headers: authHeader(),
        data: formData
      })
        .then(function (response) {
          var message = response.data.message;
          var responseData = response.data.responseData;
          if (message == "Success" && responseData > 0) {
            NotificationManager.success("Comment Added successfully.");
            self.setState({
              iscmtLoading: false,
              comment: ""
            });
            self.handleGetCommentOnTask(self.state.taskId);
          } else {
            NotificationManager.error("Comment Not Added successfully.");
            self.setState({ iscmtLoading: false });
          }
        })
        .catch((response) => {
          self.setState({ iscmtLoading: false });
          console.log(response, "---handleAddCommentByTaskId");
        });
    }
  }
  ////handle assign task by ticket using agent id
  handleAssignTaskByTicket() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/AssignTaskByTicket",
      headers: authHeader(),
      data: {
        TaskID: this.state.taskId,
        AgentID: this.state.agentId,
        CommentOnAssign: this.state.assignComment.trim(),
        IsCommentOnAssign: 1,
        OldAgentID: this.state.oldassignToID,
      },
    })
      .then(function (response) {
        var responseData = response.data.responseData;
        var message = response.data.message;
        if (message === "Success" && responseData) {
          self.setState({
            userModel: false,
            assginToModal: false,
            assignComment: "",
          });
          NotificationManager.success("Task Assign Successfully.");
          NotificationManager.success("Comment Added successfully.");
          self.componentDidMount();
        } else {
          NotificationManager.error("Task Assign Fail.");
          self.setState({ userModel: false });
        }
      })
      .catch((response) => {
        console.log(response, "---handleAssignTaskByTicket");
      });
  }
  ////handle get store task progress bar data
  handleGetStoreTaskProcressBar(taskId) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetStoreTaskProcressBar",
      headers: authHeader(),
      params: {
        TaskID: taskId,
        TaskBy: 2,
      },
    })
      .then(function (response) {
        var message = response.data.message;
        var progressData = response.data.responseData[0];
        if (message == "Success") {
          self.setState({ progressData });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetStoreTaskProcressBar");
      });
  }

  handleSubmitTaks(statusId) {
    let self = this;

    if (this.state.departmentID == 0) {
      this.setState({ isdepartment: "Please Select Department." });
    } else {
      this.setState({ isdepartment: "" });
    }

    if (this.state.funcationID == 0) {
      this.setState({ isfuncation: "Please Select Function." });
    } else {
      this.setState({ isfuncation: "" });
    }
    if (this.state.priorityID == 0) {
      this.setState({ ispriority: "Please Select Priority." });
    } else {
      this.setState({ ispriority: "" });
    }

    if (this.state.taskDetails == "") {
      this.setState({ istaskDetails: "Please Enter Task Details." });
    } else {
      this.setState({ istaskDetails: "" });
    }
    if (this.state.taskTitle == "") {
      this.setState({ istaskTitle: "Please Enter Task Title." });
    } else {
      this.setState({ istaskTitle: "" });
    }

    setTimeout(() => {
      if (
        this.state.isfuncation == "" &&
        this.state.isdepartment == "" &&
        this.state.ispriority == "" &&
        this.state.istaskTitle == "" &&
        this.state.istaskDetails == ""
      ) {
        this.setState({ isSubmit: true });
        var inputParam = {};

        inputParam.DepartmentId = this.state.departmentID;
        inputParam.FunctionID = this.state.funcationID;
        inputParam.PriorityID = this.state.priorityID;
        inputParam.TaskID = this.state.taskId;
        inputParam.TaskStatusId = statusId;
        inputParam.TaskTitle = this.state.taskTitle;
        inputParam.TaskDescription = this.state.taskDetails;

        axios({
          method: "post",
          url: config.apiUrl + "/StoreTask/SubmitTaskByTicket",
          headers: authHeader(),
          data: inputParam,
        })
          .then(function (response) {
            var message = response.data.message;
            var responseData = response.data.responseData;
            if (message == "Success") {
              self.props.history.push("/store/StoreTask");
              NotificationManager.success("Task Submited Successfully.");
              self.setState({ isSubmit: false });
            } else {
              NotificationManager.error("Task Submited Failed.");
              self.setState({ isSubmit: false });
            }
          })
          .catch((response) => {
            console.log(response, "---handleSubmitTaks");
          });
      }
    });
  }

  ////handle input filed change
  handleOnchange = (e) => {
    const { name, value } = e.target;
    if (name == "tasktitle") {
      if (value !== "") {
        this.setState({ taskTitle: value, istaskTitle: "" });
      } else {
        this.setState({
          taskTitle: value,
          istaskTitle: "Please Enter Task Title",
        });
      }
    }
    if (name == "department") {
      if (value !== 0) {
        this.setState({
          departmentID: value,
          funcationData: [],
          funcationID: 0,
          isdepartment: "",
        });
        setTimeout(() => {
          this.handleGetFuncationByDepartmentId();
        }, 10);
      } else {
        this.setState({
          isdepartment: "Please Select Department.",
          departmentID: value,
        });
      }
    }
    if (name == "funcation") {
      if (value !== 0) {
        this.setState({
          funcationID: value,
          isfuncation: "",
        });
      } else {
        this.setState({
          isfuncation: "Please Select Funcation.",
          funcationID: value,
        });
      }
    }
    if (name == "priority") {
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
    if (name == "taskdetails") {
      if (value !== "") {
        this.setState({
          taskDetails: value,
          istaskDetails: "",
        });
      } else {
        this.setState({
          istaskDetails: "Please Enter Task Details.",
          taskDetails: value,
        });
      }
    }
    if (name == "comment") {
      if (value !== "") {
        this.setState({
          comment: value,
          iscomment: "",
        });
      } else {
        this.setState({
          iscomment: "Please Enter Comment.",
          comment: value,
        });
      }
    }
  };
  ////handle user model open
  handleUserModelOpen() {
    // this.setState({ userModel: true });
    this.handleGetUserDropdown();
  }
  ////handle user model close
  handleUserModelClose() {
    this.setState({ userModel: false });
  }
  //// handle redirect to create claim page
  handleRedirectToCreateClaim() {
    this.props.history.push({
      pathname: "/store/raiseClaim",
      state: {
        taskId: this.state.taskId,
        ticketId: this.state.ticketId,
      },
    });
  }
  ////handle assign to with comment
  handleAssigntoWithComment() {
    if (this.state.assignComment !== "" && this.state.isAssignComment == "") {
      this.handleAssignTaskByTicket();
    } else {
      this.setState({ isAssignComment: "Please enter comment." });
    }
  }
  ///handle re assign modal skip button on click
  handleSkipButtonClick() {
    this.handleAssignTaskByTicket();
  }
  ////handle assgin to modal open
  handleAssginToModalOpen() {
    this.setState({ assginToModal: true });
  }
  ///handle assgin to modal close
  handleAssginToModalClose() {
    this.setState({ assginToModal: false });
  }
  handleAssignCommentChange(e) {
    if (e.target.value !== "") {
      this.setState({ assignComment: e.target.value, isAssignComment: "" });
    } else {
      this.setState({
        assignComment: e.target.value,
        // isAssignComment: "Please enter comment.",
      });
    }
  }

  handleGetProgramCode = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Ticketing/getCurrentSession",
      headers: authHeader(),
      params: {
        IsStore: true,
      },
    })
      .then(function (res) {
        var status = res.data.message;
        var programCode = res.data.responseData[0].programCode
          .toLowerCase()
          .replace(/[^A-Z0-9]/gi, "");

        if (status === "Success") {
          self.setState({
            programCode,
          });
        } else {
          self.setState({
            programCode: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleGetResponseData = (ticketId) => {
    axios({
      method: "POST",
      url: config.apiUrl + "/Ticketing/GetCollectaResponse",
      headers: authHeader(),
      params: {
        ticketId,
      },
    })
      .then((response) => {
        let msg = response.data.message;
        let data = response.data.responseData;
        if (msg === "Success") {
          this.setState({
            ticketResponseData: data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleOpenStoreModal = () => {
    this.setState({
      isStoreModal: true,
    });
    this.hanldeGetSelectedStoreData();
  };

  handleCloseStoreModal = () => {
    this.setState({
      isStoreModal: false,
      CheckStoreID: {},
      SearchStore: "",
    });
  };

  hanldeGetSelectedStoreData = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Store/getSelectedStores",
      headers: authHeader(),
      params: {
        TicketID: this.state.ticketDetails.ticketID,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          //debugger;
          const newSelected = Object.assign({}, self.state.CheckStoreID);
          let selectedStoreIds = self.state.selectedStoreIds;
          var selectedRow = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].storeID) {
              if (selectedStoreIds.includes(data[i].storeID)) {
                newSelected[data[i].storeID] = !self.state.CheckStoreID[
                  data[i].storeID
                ];
                selectedRow.push(data[i]);
                self.setState({
                  CheckStoreID: data[i].storeID ? newSelected : false,
                });
              }
            }
          }
          self.setState({
            selectedStoreData: selectedRow,
            selectedStore: data,
          });
        } else {
          self.setState({
            selectedStore: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleGetStoreDetails = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Store/SearchStoreDetail",
      headers: authHeader(),
      params: {
        SearchText: self.state.SearchStore,
      },
    })
      .then(function (res) {
        let data = res.data.responseData;
        let Msg = res.data.message;
        if (Msg === "Success") {
          let selectedStoreIds = self.state.selectedStoreIds;
          var selectedRow = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].storeID) {
              if (selectedStoreIds.includes(data[i].storeID)) {
                selectedRow.push(data[i]);
              }
            }
          }

          self.setState({ storeDetails: data, selectedStoreData: selectedRow });
        } else {
          self.setState({
            storeDetails: [],
            selectedStoreData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleSearchText = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  hanldeStatusChange = (e) => {
    let selectedValue = e.target.value;
    let storeData = this.state.selectedStore;
    let filteredStoreData = storeData.filter((store) => {
      return store.purpose == selectedValue;
    });

    this.setState({
      selectedStoreData: filteredStoreData,
    });
  };

  handleOpenOrderDetailsModal = () => {
    this.setState({
      isOrderDetails: true,
    });
    this.handleOrderSearchData();
  };

  handleCloseOrderDetailsModal = () => {
    this.setState({
      isOrderDetails: false,
    });
  };

  handleChangeOrderItem = (e) => {
    var values = e.target.checked;
    if (!this.state.selectProductOrd) {
      if (values) {
        var x = document.getElementById("ordertbls1");
        var x1 = document.getElementById("orderitemtbl1");

        var i = document.getElementById("ordertbls");
        var j = document.getElementById("orderitemtbl");

        x.style.display = "none";
        x1.style.display = "block";

        i.style.display = "none";
        j.style.display = "block";
      } else {
        var i = document.getElementById("ordertbls");
        var j = document.getElementById("orderitemtbl");

        var x = document.getElementById("ordertbls1");
        var x1 = document.getElementById("orderitemtbl1");

        x.style.display = "block";
        x1.style.display = "none";

        i.style.display = "block";
        j.style.display = "none ";
      }
      this.setState({
        OrdItmBtnStatus: e.target.checked,
      });
    } else {
      if (values) {
        var ot = document.getElementById("ordertbls");
        var oi = document.getElementById("orderitemtbl");

        var ot1 = document.getElementById("ordertbls1");
        var oi2 = document.getElementById("orderitemtbl1");

        ot.style.display = "none";
        oi.style.display = "block";

        ot1.style.display = "none";
        oi2.style.display = "block";
      } else {
        var ot1 = document.getElementById("ordertbls1");
        var oi2 = document.getElementById("orderitemtbl1");

        var ot = document.getElementById("ordertbls");
        var oi = document.getElementById("orderitemtbl");

        ot.style.display = "block";
        oi.style.display = "none";

        ot1.style.display = "block";
        oi2.style.display = "none";
      }
      this.setState({
        OrdItmBtnStatus: e.target.checked,
      });
    }
  };
  handleOrderSearchData = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Order/getOrderListWithItemDetails",
      headers: authHeader(),
      params: {
        OrderNumber: this.state.orderNumber ? this.state.orderNumber : "",
        CustomerID: this.state.ticketDetails.customerID,
        allorder: this.state.orderNumber ? false : true,
      },
    })
      .then(function (res) {
        //debugger;
        let Msg = res.data.message;
        let mainData = res.data.responseData;
        var OrderSubItem = [];
        let selectedInvoiceNo = self.state.selectedInvoiceNo.split(",");

        for (let i = 0; i < mainData.length; i++) {
          if (mainData[i].invoiceNumber.length > 0) {
            for (let j = 0; j < mainData[i].invoiceNumber.length; j++) {
              OrderSubItem.push(mainData[i].invoiceNumber[j]);
            }
          }
        }

        let SelectedAllOrder = [];

        for (let i = 0; i < mainData.length; i++) {
          for (let j = 0; j < selectedInvoiceNo.length; j++) {
            if (mainData[i].invoiceNumber == selectedInvoiceNo[j]) {
              SelectedAllOrder.push(mainData[i]);
            }
          }
        }

        self.setState({
          message: Msg,
          orderDetailsData: mainData,
          OrderSubItem,
          SelectedAllOrder,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  };

  render() {
    return (
      <Fragment>
        <div className="edit-storeTask-header">
          <div className="tab-content">
            <div className="store-header-task">
              <ul className="nav alert-nav-tabs3" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    data-toggle="tab"
                    href="#Task-tab"
                    role="tab"
                    aria-controls="Task-tab"
                    aria-selected="true"
                  >
                    Task
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#Ticket-tab"
                    role="tab"
                    aria-controls="Ticket-tab"
                    aria-selected="false"
                  >
                    Ticket
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="tab-content p-0">
          <div
            className="tab-pane fade show active"
            id="Task-tab"
            role="tabpanel"
            aria-labelledby="Task-tab"
          >
            <div className="headerBtn-store">
              <div className="btnstore-last">
                <a
                  className="d-inline-block"
                  onClick={this.handleUserModelOpen.bind(this)}
                >
                  <div className="oval-5-1-new-store">
                    <img
                      src={storeImg}
                      alt="headphone"
                      className="storeImg-11"
                    />
                  </div>
                  <label className="naman-r">{this.state.assignToName}</label>
                </a>

                <img
                  src={DownBlueImg}
                  alt="headphone"
                  className="ImgBlue-lbl"
                />
                <button type="button" className="raisedClaim-storeBtn">
                  <label
                    className="raisedClaim-lbl"
                    onClick={this.handleRedirectToCreateClaim.bind(this)}
                  >
                    RAISE CLAIM
                  </label>
                </button>
                <button
                  type="button"
                  className={
                    this.state.canSubmit
                      ? "btn-store-resolved"
                      : "btn-store-resolved disabled-link"
                  }
                  onClick={this.handleSubmitReopnModalOpen.bind(this)}
                >
                  <label className="myticket-submit-solve-button-text">
                    SUBMIT AS RESOLVED
                  </label>
                  <img
                    src={DownWhiteImg}
                    alt="headphone"
                    className="down-white"
                  />
                </button>
              </div>
              <Modal
                open={this.state.SubmitBtnReopn}
                onClose={this.handleSubmitReopnModalClose.bind(this)}
                closeIconId="close"
                modalId="SubmitReopn-popup"
                overlayId="logout-ovrly"
              >
                <div className="store-hdrtMdal">
                  {this.state.taskStatusId === 222 ? (
                    <div className="row">
                      <label
                        disabled={this.state.isSubmit}
                        // className="modal-lbl"
                        className={
                          this.state.isSubmit
                            ? "modal-lbl disabled-link"
                            : "modal-lbl"
                        }
                        onClick={this.handleSubmitTaks.bind(this, 224)}
                      >
                        Submit as <span className="modal-lbl-1">ReOpen</span>
                      </label>
                    </div>
                  ) : (
                    <div className="row">
                      <label
                        disabled={this.state.isSubmit}
                        // className="modal-lbl"
                        className={
                          this.state.isSubmit
                            ? "modal-lbl disabled-link"
                            : "modal-lbl"
                        }
                        onClick={this.handleSubmitTaks.bind(this, 222)}
                      >
                        Submit as <span className="modal-lbl-1">Solved</span>
                      </label>
                    </div>
                  )}
                  {this.state.taskStatusId !== 222 ? (
                    <div className="row" style={{ marginTop: "8px" }}>
                      <label
                        disabled={this.state.isSubmit}
                        // className="modal-lbl"
                        className={
                          this.state.isSubmit
                            ? "modal-lbl disabled-link"
                            : "modal-lbl"
                        }
                        onClick={this.handleSubmitTaks.bind(this, 223)}
                      >
                        Submit as <span className="modal-lbl-2">Closed</span>
                      </label>
                    </div>
                  ) : null}
                </div>
              </Modal>
            </div>
            <div className="row width">
              <div className="col-md-7">
                <div className="card store-card-padding h-100">
                  <label className="store-Edit-lbl"> Task Title</label>
                  <input
                    type="text"
                    className={
                      this.state.canEdit
                        ? "store-edit-txt"
                        : "store-edit-txt disabled-link"
                    }
                    placeholder="Enter Task Title"
                    value={this.state.taskTitle}
                    name="tasktitle"
                    onChange={this.handleOnchange.bind(this)}
                  />
                  {this.state.istaskTitle !== "" && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.iscomment}
                    </p>
                  )}
                  <div className="row">
                    <div className="col-md-4 store-mrg">
                      <label className="store-Edit-lbl">Department</label>
                      <select
                        id="inputState"
                        className={
                          this.state.canEdit
                            ? "form-control dropdown-label"
                            : "form-control dropdown-label disabled-link"
                        }
                        value={this.state.departmentID}
                        name="department"
                        onChange={this.handleOnchange.bind(this)}
                      >
                        <option value={0}>Select</option>
                        {this.state.departmentData !== null &&
                          this.state.departmentData.map((item, i) => (
                            <option
                              key={i}
                              value={item.departmentID}
                              className="select-category-placeholder"
                            >
                              {item.departmentName}
                            </option>
                          ))}
                      </select>
                      {this.state.isdepartment !== "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.isdepartment}
                        </p>
                      )}
                    </div>
                    <div className="col-md-4 store-mrg">
                      <label className="store-Edit-lbl">Function</label>
                      <select
                        id="inputState"
                        className={
                          this.state.canEdit
                            ? "form-control dropdown-label"
                            : "form-control dropdown-label disabled-link"
                        }
                        value={this.state.funcationID}
                        name="funcation"
                        onChange={this.handleOnchange.bind(this)}
                      >
                        <option value={0}>Select</option>
                        {this.state.funcationData !== null &&
                          this.state.funcationData.map((item, i) => (
                            <option
                              key={i}
                              value={item.functionID}
                              className="select-category-placeholder"
                            >
                              {item.funcationName}
                            </option>
                          ))}
                      </select>
                      {this.state.isfuncation !== "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.isfuncation}
                        </p>
                      )}
                    </div>
                    <div className="col-md-4 store-mrg">
                      <label className="store-Edit-lbl">Priority</label>
                      <select
                        id="inputState"
                        className={
                          this.state.canEdit
                            ? "form-control dropdown-label"
                            : "disabled-link form-control dropdown-label"
                        }
                        value={this.state.priorityID}
                        name="priority"
                        onChange={this.handleOnchange}
                      >
                        <option value={0}>Select</option>
                        {this.state.priorityData !== null &&
                          this.state.priorityData.map((item, i) => (
                            <option
                              key={i}
                              value={item.priorityID}
                              className="select-category-placeholder"
                            >
                              {item.priortyName}
                            </option>
                          ))}
                      </select>
                      {this.state.ispriority !== "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.ispriority}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 store-mrg">
                      <label className="store-Edit-lbl">Task Details</label>
                      <textarea
                        rows="8"
                        className={
                          this.state.canEdit
                            ? "textarea-store"
                            : "textarea-store disabled-link"
                        }
                        value={this.state.taskDetails}
                        name="taskdetails"
                        onChange={this.handleOnchange.bind(this)}
                      ></textarea>
                      {this.state.istaskDetails !== "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.iscomment}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 store-mrg">
                      <label className="store-Edit-lbl">Comments</label>
                      <textarea
                        rows="8"
                        className="textarea-store-comments"
                        placeholder="Add your comment here"
                        value={this.state.comment}
                        name="comment"
                        onChange={this.handleOnchange.bind(this)}
                      ></textarea>
                      {this.state.iscomment !== "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.iscomment}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 store-mrg">
                      <label className="store-Edit-lbl">
                        Comments:
                        {this.state.commentCount < 9
                          ? "0" + this.state.commentCount
                          : this.state.commentCount}
                      </label>
                      <button
                        disabled={this.iscmtLoading}
                        className="butn-store"
                        onClick={this.handleAddCommentByTaskId.bind(this)}
                      >
                        {this.state.iscmtLoading ? (
                          <FontAwesomeIcon
                            className="circular-loader"
                            icon={faCircleNotch}
                            spin
                          />
                        ) : (
                          ""
                        )}
                        Add Comment
                      </button>
                    </div>
                  </div>
                  {this.state.commentData !== null
                    ? this.state.commentData.map((item, i) => {
                      return (
                        <div key={i}>
                          <div className="row">
                            <div className="col-md-12 store-mrg-1">
                              <div className="oval-5-1-new-store">
                                <img
                                  src={storeImg}
                                  alt="headphone"
                                  className="storeImg-11"
                                />
                              </div>
                              <label className="naman-r-store">
                                {item.commentByName}
                              </label>
                              <label className="store-hrLbl">
                                {item.commentedDiff}
                              </label>
                            </div>
                          </div>
                          <div className="row">
                            <div
                              className="col-md-12"
                              style={{ marginTop: "3px" }}
                            >
                              <span className="store-comment">Comment :</span>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <p className="store-cmt-comment">
                                {item.comment}
                              </p>
                              <hr />
                            </div>
                          </div>
                        </div>
                      );
                    })
                    : null}
                </div>
              </div>
              <div className="col-md-5" style={{ padding: "0" }}>
                <div className="card store-card-3 h-100">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Issue Raised By:</label>
                    </div>
                    <div className="col-md-4">
                      <label className="store-Edit-lbl">Store Name:</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="oval-5-1-new-store">
                        <img
                          src={storeImg}
                          alt="headphone"
                          className="storeImg-11"
                        />
                      </div>
                      <label className="store-edit-data-1">
                        {this.state.isueRaisedBy}
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="store-edit-data">
                        {this.state.storeName}
                      </label>
                    </div>
                  </div>
                  <div className="row store-mrg-3">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Store Address:</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <label className="store-edit-data">
                        {this.state.storeAddress}
                      </label>
                    </div>
                  </div>
                  <div className="row store-mrg-3">
                    <div className="col-md-6">
                      <label className="task-clouserDate">
                        Task Closure Date
                      </label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12 progress-sect">
                      <div className="col-md-3" style={{ padding: 0 }}>
                        <label className="store-date">
                          {this.state.progressData.closureTaskDate}
                        </label>
                      </div>
                      <div className="col-md-9" style={{ padding: 0 }}>
                        <Progress
                          showInfo={false}
                          // strokeColor={this.state.progressData.colorCode}
                          strokeColor={{
                            "0%": this.state.progressData.colorCode
                              ? this.state.progressData.colorCode.split(",")[0]
                              : "",
                            "100%": this.state.progressData.colorCode
                              ? this.state.progressData.colorCode.split(",")[1]
                              : "",
                          }}
                          percent={Number(this.state.progressData.progress)}
                        />
                        <p
                          className="progressbar-lbl"
                          style={{
                            marginLeft:
                              this.state.progressData.progress +
                              this.state.progressData.progressIn,
                          }}
                        >
                          {this.state.progressData.remainingTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="tab-pane fade"
            id="Ticket-tab"
            role="tabpanel"
            aria-labelledby="Ticket-tab"
          >
            <div className="row width">
              <div className="col-md-8">
                <div className="card store-card-padding-ticket">
                  <label className="store-Edit-lbl"> Ticket Title</label>
                  <input
                    type="text"
                    className="store-edit-txt"
                    placeholder="Enter Ticket Title"
                    disabled={true}
                    value={this.state.ticketDetails.ticketTitle}
                  />
                  <img src={NoEditImg} alt="NoEditImg" className="noEditImg" />
                  <div className="row">
                    <div className="col-md-12 store-mrg">
                      <label className="store-Edit-lbl"> Ticket Details</label>
                      <textarea
                        disabled={true}
                        rows="8"
                        className="textarea-store-comments"
                        placeholder="Add your Ticket Details here"
                        value={this.state.ticketDetails.ticketdescription}
                      ></textarea>
                      <img
                        src={NoEditImg}
                        alt="NoEditImg"
                        className="noEditImg-1"
                      />
                    </div>
                  </div>
                  {/* Attachment */}
                  {this.state.attachedFiles.length > 0 &&

                    <div className="row">
                      <div className="col-md-12 store-mrg">
                        <label className="store-Edit-lbl">Ticket Attachment</label>
                      <div className="d-flex align-items-center">
                        
                        {this.state.attachedFiles.map((item, i) =>
                          <div style={{ position: "relative" }} key={i}>
                            <img
                              src={
                                item.Type === "docx"
                                  ? require("./../../assets/Images/word.png")
                                  : item.Type === "doc"
                                    ? require("./../../assets/Images/word.png")
                                    : item.Type === "xlsx"
                                      ? require("./../../assets/Images/excel.png")
                                      : item.Type === "xls"
                                        ? require("./../../assets/Images/excel.png")
                                        : item.Type === "csv"
                                          ? require("./../../assets/Images/excel.png")
                                          : item.Type === "pdf"
                                            ? require("./../../assets/Images/pdf.png")
                                            : item.Type === "txt"
                                              ? require("./../../assets/Images/TxtIcon.png")
                                              : item.Type === "pptm"
                                                ? require("./../../assets/Images/ppt.png")
                                                : item.Type === "ppt"
                                                  ? require("./../../assets/Images/ppt.png")
                                                  : item.Type === "pptx"
                                                    ? require("./../../assets/Images/ppt.png")
                                                    : item.Type === "zip"
                                                      ? require("./../../assets/Images/zip.png")
                                                      : item.Type === "7z"
                                                        ? require("./../../assets/Images/zip.png")
                                                        : item.Type === "js"
                                                          ? require("./../../assets/Images/js.png")
                                                          : item.Type === "html"
                                                            ? require("./../../assets/Images/html.png")
                                                            : item.Type === "avi"
                                                              ? require("./../../assets/Images/video.png")
                                                              : item.Type === "mp4"
                                                                ? require("./../../assets/Images/video.png")
                                                                : item.Type === "mpeg"
                                                                  ? require("./../../assets/Images/video.png")
                                                                  : item.name
                              }
                              title={item.name}
                              alt={item.name}
                              className="thumbtick"
                            />
                          </div>
                        )}
                        <div className="download_arrow">
                          <img onClick={this.handleMultiDownload} alt="" src={DownArrowIcon} />
                        </div>
                        </div>
                      </div>

                    </div>
                  }

                  {this.state.programCode === "bataclubbangladesh" && (
                    <div className="row">
                      {this.state.ticketResponseData.length > 0 && (
                        <div className="col-md-12 ">
                          <label className="store-Edit-lbl">Responses</label>

                          <div className="store-response">
                            {this.state.ticketResponseData !== null
                              ? this.state.ticketResponseData.length > 0
                                ? this.state.ticketResponseData.map((qna) => {
                                  return (
                                    <div className="response-qna">
                                      <div>
                                        <label className="question">
                                          {" "}
                                          <span>Question: </span>
                                          {qna.question}
                                        </label>
                                      </div>
                                      <div>
                                        <label className="answer">
                                          {" "}
                                          <span>Answer: </span>
                                          {qna.answer}
                                        </label>
                                      </div>
                                    </div>
                                  );
                                })
                                : null
                              : null}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="col-md-4">
                <div className="card store-card-2">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Customer Name:</label>
                    </div>
                    <div className="col-md-4">
                      <label className="store-Edit-lbl">Gender:</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-edit-data-1">
                        {this.state.ticketDetails.customerName}
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="store-edit-data">
                        {this.state.ticketDetails.gender}
                      </label>
                    </div>
                  </div>
                  <div className="row store-mrg-3">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Mobile Number:</label>
                    </div>
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Email ID:</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-edit-data">
                        {this.state.ticketDetails.customerPhoneNumber}
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="store-edit-data">
                        {this.state.ticketDetails.customerEmailId}
                      </label>
                    </div>
                  </div>
                  <div className="hrMargin">
                    <hr />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Status</label>
                    </div>
                    <div className="col-md-4">
                      <label className="store-Edit-lbl">Priority</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-edit-data-1">
                        {this.state.ticketDetails.status}
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="store-edit-data">
                        {this.state.ticketDetails.priortyName}
                      </label>
                    </div>
                  </div>
                  <div className="row store-mrg-3">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Category</label>
                    </div>
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Sub Category</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-edit-data">
                        {this.state.ticketDetails.categoryName}
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label className="store-edit-data">
                        {this.state.ticketDetails.subCategoryName}
                      </label>
                    </div>
                  </div>
                  <div className="row store-mrg-3">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Type</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-edit-data">
                        {this.state.ticketDetails.issueTypeName}
                      </label>
                    </div>
                  </div>
                  <div className="hrMargin">
                    <hr />
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Store</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label
                        className="store-edit-data"
                        onClick={this.handleOpenStoreModal}
                        style={{ cursor: "pointer" }}
                      >
                        {this.state.ticketDetails.storeNames}
                      </label>
                    </div>
                  </div>
                  <Modal
                    open={this.state.isStoreModal}
                    onClose={this.handleCloseStoreModal}
                    modalId="addStoreTableModal"
                    overlayId="logout-ovrly"
                  >
                    <div className="row storemainrow">
                      <div className={"col-md-12"}>
                        <select
                          className={"systemstoredropdown1"}
                          value={this.state.CustStoreStatusDrop}
                          onChange={this.hanldeStatusChange}
                        >
                          <option value="1">
                            {/* {TranslationContext !== undefined
                                ? TranslationContext.ticketingDashboard
                                    .customerwanttovisitstore
                                : "Customer Want to visit store"
                                } */}
                            Customer Want to visit store
                          </option>
                          <option value="2">
                            {/* {TranslationContext !== undefined
                                ? TranslationContext.ticketingDashboard
                                    .customeralreadyvisitedstore
                                : "Customer Already visited store"} */}
                            Customer Already visited store
                          </option>
                        </select>
                        <div
                          style={{
                            display: "flex",
                            marginTop: "7px",
                            float: "right",
                          }}
                        >
                          {/* <label className="orderdetailpopup"> */}
                          {/* {TranslationContext !== undefined
                                ? TranslationContext.option.yes
                                : "Yes"} */}
                          {/* Yes */}
                          {/* </label> */}
                          <div
                            className={
                              // this.state.isKB
                              //   ? "switchmargin iskbticket"
                              //   : "switchmargin"
                              "switchmargin"
                            }
                          >
                            {/* <div className="switch switch-primary d-inline m-r-10">
                              <input type="checkbox" id="editDashboard-p-12" />
                              <label
                                htmlFor="editDashboard-p-12"
                                className="cr"
                              ></label>
                            </div> */}
                          </div>
                          {/* <label className="orderdetailpopup"> */}
                          {/* {TranslationContext !== undefined
                                ? TranslationContext.option.no
                                : "No"} */}
                          {/* No
                          </label> */}
                          <div
                            className="storeplusline13"
                            onClick={this.handleCloseStoreModal}
                            style={{
                              marginLeft: "4rem",
                            }}
                          >
                            <span
                              className="plusline13"
                              style={{ marginLeft: "10px" }}
                            ></span>
                            <img
                              src={MinusImg}
                              alt="Minus"
                              className="minus-imgorder"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row m-0">
                      <div
                        className={
                          this.state.isKB
                            ? "col-md-6 m-b-10 m-t-10 iskbticket"
                            : "col-md-6 m-b-10 m-t-10"
                        }
                      >
                        <input
                          type="text"
                          className="systemordersearch"
                          placeholder="Search By Store Name, Pin Code, Store Code"
                          // {
                          //   TranslationContext !== undefined
                          //     ? TranslationContext.label
                          //         .searchbynamepincodecode
                          //     : "Search By Store Name, Pin Code, Store Code"
                          // }
                          value={this.state.SearchStore}
                          name="SearchStore"
                          autoComplete="off"
                          onChange={this.handleSearchText}
                        />
                        <img
                          src={SearchBlackImg}
                          alt="Search"
                          className="systemorder-imgsearch"
                          onClick={this.handleGetStoreDetails}
                        />
                      </div>
                      {/* <div className="col-md-6 m-b-10 m-t-10 text-right">
                          <button
                            type="button"
                            className={
                              this.state.isKB
                                ? "myticket-submit-solve-button m-0 iskbticket"
                                : "myticket-submit-solve-button m-0"
                            }
                            onClick={this.handleAttachStoreData.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.attachstore
                              : "Attach Store"}
                          </button>
                        </div> */}
                    </div>
                    <span className="linestore1"></span>
                    <div className="newtabstore">
                      <div className="tab-content tabcontentstore">
                        <div className="">
                          <ul
                            className="nav alert-nav-tabs3 store-nav-tabs"
                            role="tablist"
                          >
                            {/* <li className="nav-item fo">
                              <a
                                className="nav-link"
                                data-toggle="tab"
                                href="#storedetail-tab"
                                role="tab"
                                aria-controls="storedetail-tab"
                                aria-selected="false"
                              >
                                {TranslationContext !== undefined
                                    ? TranslationContext.a.storedetails
                                    : "Store Details"}
                                Store Details
                              </a>
                            </li> */}
                            {this.state.selectedStoreData.length > 0 ||
                              this.state.selectedStore.length > 0 ? (
                              <li className="nav-item fo">
                                <a
                                  className="nav-link active"
                                  data-toggle="tab"
                                  href="#selectedstore-tab"
                                  role="tab"
                                  aria-controls="selectedstore-tab"
                                  aria-selected="true"
                                >
                                  {/* {TranslationContext !== undefined
                                      ? TranslationContext.a.selectedstore
                                      : "Selected Store"} */}
                                  Selected Store
                                </a>
                              </li>
                            ) : null}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <span className="linestore2"></span>
                    <div className="tab-content p-0">
                      <div
                        className="tab-pane fade"
                        id="storedetail-tab"
                        role="tabpanel"
                        aria-labelledby="storedetail-tab"
                      >
                        <div className="reactstoreselect custom-react-table datePickertable">
                          <ReactTable
                            data={this.state.storeDetails}
                            columns={[
                              {
                                Header: <span></span>,
                                accessor: "purpose",
                                Cell: (row) => {
                                  var storeId = 0;
                                  if (row.original.lpassStoreID > 0) {
                                    storeId = row.original.lpassStoreID;
                                  } else {
                                    storeId = row.original.storeID;
                                  }
                                  return (
                                    <div className="filter-checkbox">
                                      <input
                                        type="checkbox"
                                        id={"i" + storeId}
                                        style={{
                                          display: "none",
                                        }}
                                        name="ticket-store"
                                        checked={
                                          this.state.CheckStoreID[storeId] ===
                                          true
                                        }
                                        // onChange={this.handleCheckStoreID.bind(
                                        //   this,
                                        //   storeId,
                                        //   row.original
                                        // )}
                                        defaultChecked={true}
                                      />
                                      <label htmlFor={"i" + storeId}></label>
                                    </div>
                                  );
                                },
                                width: 20,
                              },
                              {
                                Header: (
                                  <span>
                                    {/* {TranslationContext !== undefined
                                        ? TranslationContext.label.storecode
                                        : "Store Code"} */}
                                    Store Code
                                  </span>
                                ),
                                accessor: "storeCode",
                              },
                              {
                                Header: (
                                  <span>
                                    {/* {TranslationContext !== undefined
                                        ? TranslationContext.label.storename
                                        : "Store Name"} */}
                                    Store Name
                                  </span>
                                ),
                                accessor: "storeName",
                              },
                              {
                                Header: (
                                  <span>
                                    {/* {TranslationContext !== undefined
                                        ? TranslationContext.label.storepincode
                                        : "Store Pin Code"} */}
                                    Store Pin Code
                                  </span>
                                ),
                                accessor: "storeCode",
                              },
                              {
                                Header: (
                                  <span>
                                    {/* {TranslationContext !== undefined
                                        ? TranslationContext.span.storeemailid
                                        : "Store Email ID"} */}
                                    Store Email ID
                                  </span>
                                ),
                                accessor: "storeEmailID",
                              },
                              {
                                Header: (
                                  <span>
                                    {/* {TranslationContext !== undefined
                                        ? TranslationContext.label.storeaddress
                                        : "Store Address"} */}
                                    Store Address
                                  </span>
                                ),
                                accessor: "address",
                              },
                            ]}
                            defaultPageSize={5}
                            showPagination={false}
                            minRows={2}
                          />
                        </div>
                      </div>
                      <div
                        className="tab-pane fade show active"
                        id="selectedstore-tab"
                        role="tabpanel"
                        aria-labelledby="selectedstore-tab"
                      >
                        <div className="reactstoreselect custom-react-table datePickertable storeTdetail">
                          <ReactTable
                            data={this.state.selectedStoreData}
                            columns={[
                              {
                                Header: "",
                                accessor: "storeID",
                                width: 20,
                                Cell: (row) => {
                                  var storeId = 0;
                                  if (row.original.lpassStoreID > 0) {
                                    storeId = row.original.lpassStoreID;
                                  } else {
                                    storeId = row.original.storeID;
                                  }
                                  return (
                                    <div
                                      className="filter-checkbox"
                                      style={{
                                        marginLeft: "15px",
                                      }}
                                    >
                                      <input
                                        type="checkbox"
                                        id={"i" + storeId}
                                        style={{
                                          display: "none",
                                        }}
                                        name="ticket-store"
                                        checked={
                                          this.state.CheckStoreID[storeId] ===
                                          true
                                        }
                                        // onChange={this.handleCheckStoreID.bind(
                                        //   this,
                                        //   storeId,
                                        //   row.original
                                        // )}
                                        defaultChecked={true}
                                        disabled
                                      />
                                      <label htmlFor={"i" + storeId}></label>
                                    </div>
                                  );
                                },
                              },
                              {
                                Header: (
                                  <span>
                                    {/* {TranslationContext !== undefined
                                        ? TranslationContext.span.purpose
                                        : "Purpose"} */}
                                    Purpose
                                  </span>
                                ),
                                accessor: "invoiceNumber",
                                minWidth: 160,
                                Cell: (row) => (
                                  <div
                                    className="filter-checkbox"
                                    style={{
                                      marginLeft: "15px",
                                    }}
                                  >
                                    <label htmlFor={"i" + row.original.storeID}>
                                      {row.original.Purpose_Id === 1
                                        ? "Customer Want to visit store"
                                        : "Customer Already visited store"}
                                    </label>
                                  </div>
                                ),
                              },
                              {
                                Header: (
                                  <span>
                                    {/* {TranslationContext !== undefined
                                        ? TranslationContext.label.storecode
                                        : "Store Code"} */}
                                    Store Code
                                  </span>
                                ),
                                accessor: "storeCode",
                              },
                              {
                                Header: (
                                  <span>
                                    {/* {TranslationContext !== undefined
                                        ? TranslationContext.label.storename
                                        : "Store Name"} */}
                                    Store Name
                                  </span>
                                ),
                                accessor: "storeName",
                              },
                              {
                                Header: (
                                  <span>
                                    {/* {TranslationContext !== undefined
                                        ? TranslationContext.label.storepincode
                                        : "Store Pin Code"} */}
                                    Store Pin Code
                                  </span>
                                ),
                                accessor: "pincode",
                              },
                              {
                                Header: (
                                  <span>
                                    {/* {TranslationContext !== undefined
                                        ? TranslationContext.span.storeemailid
                                        : "Store Email ID"} */}
                                    Store Email ID
                                  </span>
                                ),
                                minWidth: 190,
                                accessor: "storeEmailID",
                                style: {
                                  wordBreak: "break-all",
                                },
                              },
                              {
                                Header: (
                                  <span>
                                    {/* {TranslationContext !== undefined
                                        ? TranslationContext.label.storeaddress
                                        : "Store Address"} */}
                                    Store Address
                                  </span>
                                ),
                                accessor: "address",
                                minWidth: 140,
                              },
                              {
                                Header: (
                                  <span>
                                    {/* {TranslationContext !== undefined
                                        ? TranslationContext.span.visitdate
                                        : "Visit Date"} */}
                                    Visit Date
                                  </span>
                                ),
                                accessor: "storeVisitDate",
                                minWidth: 150,
                                Cell: (row) => {
                                  var storeId = 0;
                                  if (row.original.lpassStoreID > 0) {
                                    storeId = row.original.lpassStoreID;
                                  } else {
                                    storeId = row.original.storeID;
                                  }
                                  return (
                                    <div className="col-sm-12 p-0">
                                      <DatePicker
                                        // selected={
                                        //   row.original.storeVisitDate !== null
                                        //     ? new Date(
                                        //         row.original.storeVisitDate
                                        //       )
                                        //     : new Date()
                                        // }
                                        placeholderText="MM/DD/YYYY"
                                        showMonthDropdown
                                        showYearDropdown
                                        dateFormat="MM/DD/YYYY"
                                        id={"visitDate" + storeId}
                                        value={
                                          row.original.storeVisitDate !== null
                                            ? moment(
                                              row.original.storeVisitDate
                                            )
                                            : ""
                                        }
                                        disabled
                                      // onChange={this.handleByvisitDate.bind(
                                      //   this,
                                      //   row
                                      // )}
                                      />
                                    </div>
                                  );
                                },
                              },
                            ]}
                            resizable={false}
                            defaultPageSize={5}
                            showPagination={false}
                            minRows={2}
                          />
                        </div>
                      </div>
                    </div>
                  </Modal>
                  <div className="row store-mrg-3">
                    <div className="col-md-6">
                      <label className="store-Edit-lbl">Order Details</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label
                        className="store-edit-data"
                        onClick={this.handleOpenOrderDetailsModal}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        {this.state.ticketDetails.productNames}
                      </label>
                    </div>
                    <Modal
                      onClose={this.handleCloseOrderDetailsModal}
                      open={this.state.isOrderDetails}
                      modalId="addOrderTableModal"
                      overlayId="logout-ovrly"
                    >
                      <div
                        className="row"
                        style={{
                          marginLeft: "0px",
                          marginRight: "0px",
                        }}
                      >
                        <div
                          className="col-md-12 claim-status-card"
                          style={{ height: "54px" }}
                        >
                          {/* <label style={{ marginTop: "7px" }}>
                                    <b>
                                      {TranslationContext !== undefined
                                        ? TranslationContext.label
                                            .customerwanttoattachorder
                                        : "Customer Want to attach order"}
                                    </b>
                                  </label> */}
                          <div
                            className="claimplus"
                            onClick={this.handleCloseOrderDetailsModal}
                          >
                            <span className="plusline12"></span>
                            <span>
                              <img
                                src={MinusImg}
                                alt="Minus"
                                className="minus-imgorder"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="row m-t-10 m-b-10"
                        style={{
                          marginLeft: "0",
                          marginRight: "0",
                        }}
                      >
                        <div className="col-md-6">
                          <label className="orderdetailpopup">
                            {/* {TranslationContext !== undefined
                                      ? TranslationContext.label.orderdetails
                                      : "Order Details"} */}
                            Order Details
                          </label>
                        </div>
                        <div className="col-md-3">
                          <div
                            style={{
                              float: "right",
                              display: "flex",
                            }}
                          >
                            <label className="orderdetailpopup">
                              {/* {TranslationContext !== undefined
                                        ? TranslationContext.label.order
                                        : "Order"} */}
                              Order
                            </label>
                            <div
                              className={
                                // this.state.isKB
                                //   ? "orderswitch orderswitchitem iskbticket"
                                //   : "orderswitch orderswitchitem"
                                " orderswitch orderswitchitem"
                              }
                            >
                              <div className="switch switch-primary d-inline">
                                <input
                                  type="checkbox"
                                  id="editTasks-p-2"
                                  checked={this.state.OrdItmBtnStatus}
                                  onChange={this.handleChangeOrderItem}
                                />
                                <label
                                  htmlFor="editTasks-p-2"
                                  className="cr ord"
                                ></label>
                              </div>
                            </div>
                            <label className="orderdetailpopup">
                              {/* {TranslationContext !== undefined
                                        ? TranslationContext.label.item
                                        : "Item"} */}
                              Item
                            </label>
                          </div>
                        </div>
                        <div
                          className={
                            // this.state.isKB
                            //   ? "col-md-3 iskbticket"
                            //   : "col-md-3"
                            "col-md-3"
                          }
                        >
                          <input
                            type="text"
                            className="searchtextpopup"
                            placeholder={
                              // TranslationContext !== undefined
                              //   ? TranslationContext.label
                              //       .searchorderbyordernumber
                              //   : "Search Order By Order No"
                              "Search Order By Order No"
                            }
                            name="orderNumber"
                            value={this.state.orderNumber}
                            onChange={this.handleSearchText}
                            autoComplete="off"
                          />
                          <img
                            src={SearchBlackImg}
                            alt="Search"
                            className="searchtextimgpopup"
                            onClick={this.handleOrderSearchData.bind(this)}
                          />
                        </div>
                      </div>

                      <span className="linestore1"></span>
                      <div className="newtabstore">
                        <div className="tab-content tabcontentstore">
                          <div className="row align-items-center mr-0  myticket-order-header-div">
                            <ul
                              className="nav alert-nav-tabs3 store-nav-tabs col-md-4"
                              role="tablist"
                            >
                              {/* <li className="nav-item fo">
                                <a
                                  className="nav-link active"
                                  data-toggle="tab"
                                  href="#productdetail-tab"
                                  role="tab"
                                  aria-controls="productdetail-tab"
                                  aria-selected="false"
                                  // onClick={this.handleSetDataTab}
                                >
                                  {TranslationContext !== undefined
                                            ? TranslationContext.a
                                                .productdetails
                                            : "Product Details"}
                                  Product Details
                                </a>
                              </li> */}
                              {this.state.SelectedAllOrder.length > 0 ? (
                                <li className="nav-item fo">
                                  <a
                                    className="nav-link active"
                                    data-toggle="tab"
                                    href="#selectedproduct-tab"
                                    role="tab"
                                    aria-controls="selectedproduct-tab"
                                    aria-selected="true"
                                  // onClick={this.handleSetDataTab}
                                  >
                                    {/* {TranslationContext !== undefined
                                              ? TranslationContext.a
                                                  .selectedproduct
                                              : "Selected Product"} */}
                                    Selected Product
                                  </a>
                                </li>
                              ) : null}
                            </ul>
                            {/* <div className="col-md-4">
                                      <button
                                        className="myticket-submit-solve-button"
                                        style={{
                                          marginLeft: "0px",
                                          width: "auto",
                                          minWidth: "190px",
                                        }}
                                        onClick={this.openAddOrder}
                                      >
                                        Add Manually
                                      </button>
                                    </div> */}
                            {/* <div className="col-md-4 m-b-10 m-t-10 text-right">
                                      <button
                                        type="button"
                                        className={
                                          this.state.isKB
                                            ? "myticket-submit-solve-button m-0 iskbticket"
                                            : "myticket-submit-solve-button m-0"
                                        }
                                        onClick={this.handleAttachProductData.bind(
                                          this
                                        )}
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.button
                                              .attachproduct
                                          : "Attach Product"}
                                      </button>
                                    </div> */}
                          </div>
                          {/* <Modal
                                    open={this.state.openAddOrder}
                                    onClose={this.closeAddOrder}
                                    closeIconId="sdsg"
                                    modalId="Historical-popup"
                                    overlayId="logout-ovrly"
                                    classNames={{ modal: "historical-popup" }}
                                  >
                                    <TicketSystemOrder
                                      custDetails={this.state.customerID}
                                      // AttachOrder={this.handleCustomerAttachamentStatus}
                                      // getParentOrderData={this.handleGetOrderId}
                                      // getItemOrderData={this.handleGetItemData}
                                      handleOrderSearchData={
                                        this.handleOrderSearchData
                                      }
                                      closeAddOrder={this.closeAddOrder}
                                      purchaseMode={0}
                                      message="Add"
                                      AddManuallyData={true}
                                      modeData={this.state.modeData}
                                      // ticket_IDS={this.state.ticketDetailID}
                                      // ShowOderdData={this.state.showOrderDetails}
                                      // parentCallBackFuncation={this.parentCallBackFuncation}
                                    />
                                  </Modal> */}
                        </div>
                      </div>
                      <span className="linestore2"></span>
                      <div className="tab-content p-0">
                        <div
                          className="tab-pane fade"
                          id="productdetail-tab"
                          role="tabpanel"
                          aria-labelledby="productdetail-tab"
                        >
                          <div
                            className="reactstoreselect mystyle custom-react-table"
                            id="ordertbls"
                            style={{ display: "block" }}
                          >
                            <ReactTable
                              data={this.state.orderDetailsData}
                              columns={[
                                {
                                  Header: <span></span>,
                                  accessor: "invoiceNumber",
                                  width: 20,
                                  Cell: (row) => (
                                    <div className="filter-checkbox">
                                      <input
                                        type="checkbox"
                                        id={"all" + row.original.invoiceNumber}
                                        style={{
                                          display: "none",
                                        }}
                                        name="AllOrder"
                                        checked={this.state.selectedInvoiceNo.includes(
                                          row.original.invoiceNumber
                                        )}
                                      // onChange={this.handleGetOderItemData.bind(
                                      //   this,
                                      //   row.original.invoiceNumber,
                                      //   row.original
                                      // )}
                                      />
                                      <label
                                        htmlFor={
                                          "all" + row.original.invoiceNumber
                                        }
                                      ></label>
                                    </div>
                                  ),
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .invoicenumber
                                                : "Invoice Number"} */}
                                      Invoice Number
                                    </span>
                                  ),
                                  accessor: "invoiceNumber",
                                  minWidth: 150,
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .invoicedate
                                                : "Invoice Date"} */}
                                      Invoice Date
                                    </span>
                                  ),
                                  accessor: "invoiceDate",
                                  minWidth: 120,
                                  Cell: (row) => {
                                    return row.original.invoiceDate !== null
                                      ? moment(row.original.invoiceDate).format(
                                        "Do/MMM/YYYY"
                                      )
                                      : "Not Added";
                                  },
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .itemcount
                                                : "Sub Order ID"} */}
                                      Sub Order ID
                                    </span>
                                  ),
                                  accessor: "subOrderID",
                                  minWidth: 120,
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .itemcount
                                                : "Batch No"} */}
                                      Batch No
                                    </span>
                                  ),
                                  accessor: "batchNo",
                                  minWidth: 120,
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .itemcount
                                                : "Product Bar Code"} */}
                                      Product Bar Code
                                    </span>
                                  ),
                                  accessor: "productBarCode",
                                  minWidth: 120,
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .itemcount
                                                : "Product Name"} */}
                                      Product Name
                                    </span>
                                  ),
                                  accessor: "productName",
                                  minWidth: 120,
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .itemcount
                                                : "Category Name"} */}
                                      Category Name
                                    </span>
                                  ),
                                  accessor: "categoryName",
                                  minWidth: 120,
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .itemcount
                                                : "Manufacturing Date"} */}
                                      Manufacturing Date
                                    </span>
                                  ),
                                  accessor: "manufacturingDate",
                                  Cell: (row) =>
                                    row.original.manufacturingDate !== null
                                      ? moment(
                                        row.original.manufacturingDate
                                      ).format("DD/MM/YYYY")
                                      : "Not Added",

                                  minWidth: 120,
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .itemcount
                                                : "Expiry/Best Before Date"} */}
                                      Expiry/Best Before Date
                                    </span>
                                  ),
                                  accessor: "expiryBestBeforeDate",
                                  Cell: (row) =>
                                    row.original.expiryBestBeforeDate !== null
                                      ? moment(
                                        row.original.expiryBestBeforeDate
                                      ).format("DD/MM/YYYY")
                                      : "Not Added",
                                  minWidth: 150,
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .itemcount
                                                : "Channel Of Purchase"} */}
                                      Channel Of Purchase
                                    </span>
                                  ),
                                  accessor: "channelOfPurchaseID",
                                  minWidth: 120,
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .itemcount
                                                : "Mode Of Payment"} */}
                                      Mode Of Payment
                                    </span>
                                  ),
                                  accessor: "paymentModename",
                                  minWidth: 120,
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .itemcount
                                                : "Size"} */}
                                      Size
                                    </span>
                                  ),
                                  accessor: "size",
                                  minWidth: 90,
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .itemcount
                                                : "Resize"} */}
                                      Resize
                                    </span>
                                  ),
                                  accessor: "requireSize",
                                  minWidth: 120,
                                },

                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .itemcount
                                                : "Item Count"} */}
                                      Item Count
                                    </span>
                                  ),
                                  accessor: "itemCount",
                                  minWidth: 120,
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .itemprice
                                                : "Item Price"} */}
                                      Item Price
                                    </span>
                                  ),
                                  accessor: "ordeItemPrice",
                                  minWidth: 120,
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .pricepaid
                                                : "Price Paid"} */}
                                      Price Paid
                                    </span>
                                  ),
                                  accessor: "orderPricePaid",
                                  minWidth: 120,
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .storecode
                                                : "Store Code"} */}
                                      Store Code
                                    </span>
                                  ),
                                  accessor: "storeCode",
                                  minWidth: 120,
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .storeaddress
                                                : "Store Address"} */}
                                      Store Address
                                    </span>
                                  ),
                                  accessor: "storeAddress",
                                  minWidth: 300,
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .discount
                                                : "Discount"} */}
                                      Discount
                                    </span>
                                  ),
                                  accessor: "discount",
                                  minWidth: 120,
                                },
                              ]}
                              resizable={true}
                              minRows={2}
                              defaultPageSize={5}
                              showPagination={true}
                            />
                          </div>
                          <div
                            className="reactstoreselect custom-react-table"
                            id="orderitemtbl"
                            style={{ display: "none" }}
                          >
                            <ReactTable
                              data={this.state.orderDetailsData}
                              expanded={this.state.expanded}
                              onExpandedChange={(newExpanded, index, event) => {
                                if (newExpanded[index[0]] === false) {
                                  newExpanded = {};
                                } else {
                                  Object.keys(newExpanded).map((k) => {
                                    newExpanded[k] =
                                      parseInt(k) === index[0] ? {} : false;
                                  });
                                }
                                this.setState({
                                  ...this.state,
                                  expanded: newExpanded,
                                });
                              }}
                              columns={[
                                {
                                  Header: <span></span>,
                                  accessor: "invoiceNumber",
                                  width: 20,
                                  Cell: (row) => (
                                    <div className="filter-checkbox">
                                      <input
                                        type="checkbox"
                                        id={"all" + row.original.invoiceNumber}
                                        style={{
                                          display: "none",
                                        }}
                                        name="AllOrder"
                                        checked={this.state.selectedInvoiceNo.includes(
                                          row.original.invoiceNumber
                                        )}
                                      // onChange={this.handleGetOderItemData.bind(
                                      //   this,
                                      //   row.original.invoiceNumber,
                                      //   row.original
                                      // )}
                                      />
                                      <label
                                        htmlFor={
                                          "all" + row.original.invoiceNumber
                                        }
                                      ></label>
                                    </div>
                                  ),
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .invoicenumber
                                                : "Invoice Number"} */}
                                      Invoice Number
                                    </span>
                                  ),
                                  accessor: "invoiceNumber",
                                  minWidth: 150,
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .invoicedate
                                                : "Invoice Date"} */}
                                      Invoice Date
                                    </span>
                                  ),
                                  accessor: "dateFormat",
                                  Cell: (row) => {
                                    return row.original.invoiceDate !== null
                                      ? moment(row.original.invoiceDate).format(
                                        "Do/MMM/YYYY"
                                      )
                                      : "Not Added";
                                  },
                                  minWidth: 120,
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .itemcount
                                                : "Item Count"} */}
                                      Item Count
                                    </span>
                                  ),
                                  accessor: "itemCount",
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .itemprice
                                                : "Item Price"} */}
                                      Item Price
                                    </span>
                                  ),
                                  accessor: "ordeItemPrice",
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .pricepaid
                                                : "Price Paid"} */}
                                      Price Paid
                                    </span>
                                  ),
                                  accessor: "orderPricePaid",
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .storecode
                                                : "Store Code"} */}
                                      Store Code
                                    </span>
                                  ),
                                  accessor: "storeCode",
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .storeaddress
                                                : "Store Address"} */}
                                      Store Address
                                    </span>
                                  ),
                                  accessor: "storeAddress",
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .discount
                                                : "Discount"} */}
                                      Discount
                                    </span>
                                  ),
                                  accessor: "discount",
                                },
                              ]}
                              resizable={false}
                              minRows={2}
                              defaultPageSize={5}
                              showPagination={true}
                              SubComponent={(row) => {
                                return (
                                  <div
                                    className="inner-custom-react-table"
                                    id="inner-custom-react-table"
                                  >
                                    <ReactTable
                                      // data={row.original.orderItems}
                                      data={this.state.OrderSubItem.filter(
                                        (x) =>
                                          x.invoiceNumber ===
                                          row.original.invoiceNumber
                                      )}
                                      columns={[
                                        {
                                          Header: <span> </span>,
                                          accessor: "invoiceNo",
                                          width: 20,
                                          Cell: (row) => {
                                            return (
                                              <div className="filter-checkbox">
                                                <input
                                                  type="checkbox"
                                                  id={
                                                    "item" +
                                                    row.original.invoiceNumber
                                                  }
                                                  style={{
                                                    display: "none",
                                                  }}
                                                  name="AllItem"
                                                  checked={
                                                    this.state.CheckBoxAllItem[
                                                    row.original.articleNumber
                                                    ] === true
                                                  }
                                                  onChange={this.checkIndividualItem.bind(
                                                    this,
                                                    row.original.articleNumber,
                                                    row.original
                                                  )}
                                                />
                                                <label
                                                  htmlFor={
                                                    "item" +
                                                    row.original.invoiceNumber
                                                  }
                                                ></label>
                                              </div>
                                            );
                                          },
                                        },
                                        {
                                          Header: (
                                            <span>
                                              {/* {TranslationContext !==
                                                      undefined
                                                        ? TranslationContext
                                                            .span.articlenumber
                                                        : "Article Number"} */}
                                              Article Number
                                            </span>
                                          ),
                                          accessor: "articleNumber",
                                          minWidth: 140,
                                        },
                                        {
                                          Header: (
                                            <span>
                                              {/* {TranslationContext !==
                                                      undefined
                                                        ? TranslationContext
                                                            .span.articlename
                                                        : "Article Name"} */}
                                              Article Name
                                            </span>
                                          ),
                                          accessor: "articleName",
                                        },
                                        {
                                          Header: (
                                            <span>
                                              {/* {TranslationContext !==
                                                      undefined
                                                        ? TranslationContext
                                                            .ticketingDashboard
                                                            .articlemrp
                                                        : "Article MRP"} */}
                                              Article MRP
                                            </span>
                                          ),
                                          accessor: "itemPrice",
                                        },
                                        {
                                          Header: (
                                            <span>
                                              {/* {TranslationContext !==
                                                      undefined
                                                        ? TranslationContext
                                                            .span.pricepaid
                                                        : "Price Paid"} */}
                                              Price Paid
                                            </span>
                                          ),
                                          accessor: "pricePaid",
                                        },
                                        {
                                          Header: (
                                            <span>
                                              {/* {TranslationContext !==
                                                      undefined
                                                        ? TranslationContext
                                                            .span.discount
                                                        : "Discount"} */}
                                              Discount
                                            </span>
                                          ),
                                          accessor: "discount",
                                        },
                                        {
                                          Header: (
                                            <span>
                                              {/* {TranslationContext !==
                                                      undefined
                                                        ? TranslationContext
                                                            .ticketingDashboard
                                                            .requiredsize
                                                        : "Required Size"} */}
                                              Required Size
                                            </span>
                                          ),
                                          accessor: "requireSize",
                                          Cell: (row) => {
                                            return (
                                              <div ref={this.setWrapperRef}>
                                                <input
                                                  type="text"
                                                  id={
                                                    "requireSizeTxt" +
                                                    row.original.articleNumber
                                                  }
                                                  value={
                                                    row.original.requireSize ||
                                                    ""
                                                  }
                                                  name="requiredSize"
                                                  className="order-input"
                                                  autoComplete="off"
                                                  ref={(input) => {
                                                    this.searchInput = input;
                                                  }}
                                                // onChange={() => {
                                                //   this.handleRequireSize(
                                                //     this,
                                                //     row
                                                //   );
                                                // }}
                                                />
                                              </div>
                                            );
                                          },
                                        },
                                      ]}
                                      resizable={false}
                                      defaultPageSize={5}
                                      minRows={2}
                                      showPagination={false}
                                    />
                                  </div>
                                );
                              }}
                            />
                          </div>
                        </div>
                        <div
                          className="tab-pane fade show active"
                          id="selectedproduct-tab"
                          role="tabpanel"
                          aria-labelledby="selectedproduct-tab"
                        >
                          <div
                            className="reactstoreselect custom-react-table"
                            id="ordertbls1"
                            style={{ display: "block" }}
                          >
                            <ReactTable
                              data={this.state.SelectedAllOrder}
                              expanded={this.state.expanded}
                              onExpandedChange={(newExpanded, index, event) => {
                                if (newExpanded[index[0]] === false) {
                                  newExpanded = {};
                                } else {
                                  Object.keys(newExpanded).map((k) => {
                                    newExpanded[k] =
                                      parseInt(k) === index[0] ? {} : false;
                                  });
                                }
                                this.setState({
                                  ...this.state,
                                  expanded: newExpanded,
                                });
                              }}
                              columns={[
                                {
                                  Header: <span></span>,
                                  accessor: "invoiceNumber",
                                  width: 20,
                                  Cell: (row) => (
                                    <div className="filter-checkbox">
                                      <input
                                        type="checkbox"
                                        id={"all" + row.original.invoiceNumber}
                                        style={{
                                          display: "none",
                                        }}
                                        name="AllOrder"
                                        checked={this.state.selectedInvoiceNo.includes(
                                          row.original.invoiceNumber
                                        )}
                                      // onChange={this.handleGetOderItemData.bind(
                                      //   this,
                                      //   row.original.invoiceNumber,
                                      //   row.original
                                      // )}
                                      />
                                      <label
                                        htmlFor={
                                          "all" + row.original.invoiceNumber
                                        }
                                      ></label>
                                    </div>
                                  ),
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .invoicenumber
                                                : "Invoice Number"} */}
                                      Invoice Number
                                    </span>
                                  ),
                                  accessor: "invoiceNumber",
                                  minWidth: 150,
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .invoicedate
                                                : "Invoice Date"} */}
                                      Invoice Date
                                    </span>
                                  ),
                                  accessor: "dateFormat",
                                  Cell: (row) => {
                                    return row.original.dateFormat !== null
                                      ? moment(row.original.invoiceDate).format(
                                        "Do/MMM/YYYY"
                                      )
                                      : "Not Added";
                                  },
                                  minWidth: 120,
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .itemcount
                                                : "Item Count"} */}
                                      Item Count
                                    </span>
                                  ),
                                  accessor: "itemCount",
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .itemprice
                                                : "Item Price"} */}
                                      Item Price
                                    </span>
                                  ),
                                  accessor: "ordeItemPrice",
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .pricepaid
                                                : "Price Paid"} */}
                                      Price Paid
                                    </span>
                                  ),
                                  accessor: "orderPricePaid",
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .storecode
                                                : "Store Code"} */}
                                      Store Code
                                    </span>
                                  ),
                                  accessor: "storeCode",
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .storeaddress
                                                : "Store Address"} */}
                                      Store Address
                                    </span>
                                  ),
                                  accessor: "storeAddress",
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .discount
                                                : "Discount"} */}
                                      Discount
                                    </span>
                                  ),
                                  accessor: "discount",
                                },
                              ]}
                              resizable={false}
                              minRows={2}
                              defaultPageSize={5}
                              showPagination={false}
                            />
                          </div>
                          <div
                            className="reactstoreselect custom-react-table"
                            id="orderitemtbl1"
                            style={{ display: "none" }}
                          >
                            <ReactTable
                              data={this.state.SelectedAllOrder}
                              expanded={this.state.expanded}
                              onExpandedChange={(newExpanded, index, event) => {
                                if (newExpanded[index[0]] === false) {
                                  newExpanded = {};
                                } else {
                                  Object.keys(newExpanded).map((k) => {
                                    newExpanded[k] =
                                      parseInt(k) === index[0] ? {} : false;
                                  });
                                }
                                this.setState({
                                  ...this.state,
                                  expanded: newExpanded,
                                });
                              }}
                              columns={[
                                {
                                  Header: <span></span>,
                                  accessor: "invoiceNumber",
                                  width: 20,
                                  Cell: (row) => (
                                    <div className="filter-checkbox">
                                      <input
                                        type="checkbox"
                                        id={"all" + row.original.invoiceNumber}
                                        style={{
                                          display: "none",
                                        }}
                                        name="AllOrder"
                                        checked={this.state.selectedInvoiceNo.includes(
                                          row.original.invoiceNumber
                                        )}
                                      // onChange={this.handleGetOderItemData.bind(
                                      //   this,
                                      //   row.original.invoiceNumber,
                                      //   row.original
                                      // )}
                                      />
                                      <label
                                        htmlFor={
                                          "all" + row.original.invoiceNumber
                                        }
                                      ></label>
                                    </div>
                                  ),
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .invoicenumber
                                                : "Invoice Number"} */}
                                      Invoice Number
                                    </span>
                                  ),
                                  accessor: "invoiceNumber",
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .invoicedate
                                                : "Invoice Date"} */}
                                      Invoice Date
                                    </span>
                                  ),
                                  accessor: "invoiceDate",
                                  Cell: (row) => {
                                    return row.original.invoiceDate !== null
                                      ? moment(row.original.invoiceDate).format(
                                        "Do/MMM/YYYY"
                                      )
                                      : "Not Added";
                                  },
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .itemcount
                                                : "Item Count"} */}
                                      Item Count
                                    </span>
                                  ),
                                  accessor: "itemCount",
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .itemprice
                                                : "Item Price"} */}
                                      Item Price
                                    </span>
                                  ),
                                  accessor: "ordeItemPrice",
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .pricepaid
                                                : "Price Paid"} */}
                                      Price Paid
                                    </span>
                                  ),
                                  accessor: "orderPricePaid",
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .storecode
                                                : "Store Code"} */}
                                      Store Code
                                    </span>
                                  ),
                                  accessor: "storeCode",
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .storeaddress
                                                : "Store Address"} */}
                                      Store Address
                                    </span>
                                  ),
                                  accessor: "storeAddress",
                                },
                                {
                                  Header: (
                                    <span>
                                      {/* {TranslationContext !== undefined
                                                ? TranslationContext.span
                                                    .discount
                                                : "Discount"} */}
                                      Discount
                                    </span>
                                  ),
                                  accessor: "discount",
                                },
                              ]}
                              minRows={2}
                              defaultPageSize={5}
                              showPagination={false}
                              SubComponent={(row) => {
                                return (
                                  <div
                                    className="inner-custom-react-table"
                                    id="inner-custom-react-table"
                                  >
                                    <ReactTable
                                      data={this.state.OrderSubItem.filter(
                                        (x) =>
                                          x.invoiceNumber ===
                                          row.original.invoiceNumber
                                      )}
                                      columns={[
                                        {
                                          Header: <span></span>,
                                          accessor: "size",
                                          width: 20,
                                          Cell: (row) => (
                                            <div className="filter-checkbox">
                                              <input
                                                type="checkbox"
                                                id={
                                                  "item" +
                                                  row.original.articleNumber
                                                }
                                                style={{
                                                  display: "none",
                                                }}
                                                name="AllItem"
                                                checked={
                                                  this.state.CheckBoxAllItem[
                                                  row.original.articleNumber
                                                  ] === true
                                                }
                                              // onChange={this.checkIndividualItem.bind(
                                              //   this,
                                              //   row.original
                                              //     .articleNumber,
                                              //   row.original
                                              // )}
                                              />
                                              <label
                                                htmlFor={
                                                  "item" +
                                                  row.original.articleNumber
                                                }
                                              ></label>
                                            </div>
                                          ),
                                        },
                                        {
                                          Header: (
                                            <span>
                                              {/* {TranslationContext !==
                                                      undefined
                                                        ? TranslationContext
                                                            .span.articlenumber
                                                        : "Article Number"} */}
                                              Article Number
                                            </span>
                                          ),
                                          accessor: "articleNumber",
                                        },
                                        {
                                          Header: (
                                            <span>
                                              {/* {TranslationContext !==
                                                      undefined
                                                        ? TranslationContext
                                                            .span.articlename
                                                        : "Article Name"} */}
                                              Article Name
                                            </span>
                                          ),
                                          accessor: "articleName",
                                        },
                                        {
                                          Header: (
                                            <span>
                                              {/* {TranslationContext !==
                                                      undefined
                                                        ? TranslationContext
                                                            .ticketingDashboard
                                                            .articlemrp
                                                        : "Article MRP"} */}
                                              Article MRP
                                            </span>
                                          ),
                                          accessor: "itemPrice",
                                        },
                                        {
                                          Header: (
                                            <span>
                                              {/* {TranslationContext !==
                                                      undefined
                                                        ? TranslationContext
                                                            .span.pricepaid
                                                        : "Price Paid"} */}
                                              Price Paid
                                            </span>
                                          ),
                                          accessor: "pricePaid",
                                        },
                                        {
                                          Header: (
                                            <span>
                                              {/* {TranslationContext !==
                                                      undefined
                                                        ? TranslationContext
                                                            .span.discount
                                                        : "Discount"} */}
                                              Discount
                                            </span>
                                          ),
                                          accessor: "discount",
                                          sortable: true,
                                        },
                                        {
                                          Header: (
                                            <span>
                                              {/* {TranslationContext !==
                                                      undefined
                                                        ? TranslationContext
                                                            .ticketingDashboard
                                                            .requiredsize
                                                        : "Required Size"} */}
                                              Required Size
                                            </span>
                                          ),
                                          accessor: "requireSize",
                                          Cell: (row) => {
                                            return (
                                              <div ref={this.setWrapperRef}>
                                                <input
                                                  type="text"
                                                  id={
                                                    "requireSizeTxt" +
                                                    row.original.articleNumber
                                                  }
                                                  className="order-input"
                                                  value={
                                                    row.original.requireSize ||
                                                    ""
                                                  }
                                                  name="requiredSize"
                                                  autoComplete="off"
                                                  ref={(input) => {
                                                    this.searchInput = input;
                                                  }}
                                                // onChange={() => {
                                                //   this.handleRequireSize(
                                                //     this,
                                                //     row
                                                //   );
                                                // }}
                                                />
                                              </div>
                                            );
                                          },
                                        },
                                      ]}
                                      defaultPageSize={5}
                                      showPagination={false}
                                      minRows={2}
                                    />
                                  </div>
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </Modal>
                  </div>
                  {this.state.programCode === "bataclubbangladesh" && (
                    <div className="row store-mrg-3">
                      <div className="col-md-6">
                        <div>
                          <label className="store-Edit-lbl">
                            Collecta Offer
                          </label>
                        </div>
                        <div>
                          <label className="store-edit-data">
                            {this.state.ticketDetails.collectaOffer}
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div>
                          <label className="store-Edit-lbl">NPS Rating</label>
                        </div>
                        <div>
                          <label className="store-edit-data">
                            {this.state.ticketDetails.npsRating}
                          </label>
                        </div>
                      </div>
                    </div>
                  )}
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
                  Header: <span>Emp Id</span>,
                  accessor: "user_ID",
                  width: 80,
                },
                {
                  Header: <span>Name</span>,
                  accessor: "userName",
                },
                // {
                //   Header: <span>Designation</span>,
                //   accessor: "designation"
                // }
              ]}
              minRows={2}
              showPagination={false}
              resizable={false}
              getTrProps={(rowInfo, column) => {
                // ////
                const index = column ? column.index : -1;
                return {
                  onClick: (e) => {
                    ////
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
                SELECT
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
                <label className="Commentlabel1">Add Comment</label>
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
              >
                SKIP
              </button>
            </div>
            <div className="SendCommentBtn" style={{ margin: "0" }}>
              <button
                className="SendCommentBtn1"
                onClick={this.handleAssigntoWithComment.bind(this)}
              >
                ADD
              </button>
            </div>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

export default StoreTaskByTicket;
