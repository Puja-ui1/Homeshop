import React, { Component } from "react";
import Modal from "react-responsive-modal";
import { Drawer } from "antd";
import HeadPhone3 from "./../../assets/Images/headphone3.png";
import BlackLeftArrow from "./../../assets/Images/black-left-arrow.png";
import CancelImg from "./../../assets/Images/cancel.png";
import Headphone2Img from "./../../assets/Images/headphone2.png";
import RightCirculImg from "./../../assets/Images/right.png";
import CalSmallImg from "./../../assets/Images/cal-small.png";
import StoreImg from "./../../assets/Images/store.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import config from "./../../helpers/config";
import ReactTable from "react-table";
import { NotificationManager } from "react-notifications";
import { authHeader } from "../../helpers/authHeader";
import * as translationHI from "../../translations/hindi";
import * as translationMA from "../../translations/marathi";

class MyTicketTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      AddTaskModal: false,
      TaskDetailDrawer: false,
      taskTitle: "",
      taskDescription: "",
      taskAddComment: "",
      taskDetailsData: {},
      taskTableGrid: [],
      Taskdetails: [],
      DepartmentData: [],
      FunctionData: [],
      AssignToData: [],
      TicketPriorityData: [],
      selectedDepartment: "",
      selectedFunction: "",
      selectedAssignTo: "",
      selectedPriority: "",
      ticketTask_Id: 0,
      tikcet_ID: 0,
      taskTitleCompulsion: "",
      taskDescCompulsion: "",
      taskDepartmentCompulsion: "",
      taskFunctionCompulsion: "",
      taskAssignToCompulsion: "",
      taskPriorityCompulsion: "",
      addcommentCompulsion: "",
      translateLanguage: {},
    };
    this.handleGetDepartmentList = this.handleGetDepartmentList.bind(this);
    this.handleGetFunctionList = this.handleGetFunctionList.bind(this);
    this.handleGetAssignToList = this.handleGetAssignToList.bind(this);
    this.handleGetTaskTabDetails = this.handleGetTaskTabDetails.bind(this);
    this.handleGetTicketPriorityList = this.handleGetTicketPriorityList.bind(
      this
    );
    this.handleGetTaskTableGrid = this.handleGetTaskTableGrid.bind(this);
    this.handleGetTaskCommentsdetails = this.handleGetTaskCommentsdetails.bind(
      this
    );
  }

  componentDidMount() {
    if (this.props.taskData.TicketData.TicketId !== 0) {
      var Id = this.props.taskData.TicketData.TicketId;
      /// var GridData=this.props.taskData.TicketData.GridData;

      this.handleGetTaskTableGrid(Id);
      this.handleGetDepartmentList();
      this.handleGetTicketPriorityList();

      this.setState({
        tikcet_ID: Id,
        /// taskTableGrid:GridData
      });
    } else if (this.props.taskData.TicketData.TicketId === 0) {
    } else {
      this.props.history.push("myTicketlist");
    }
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
    // this.handleGetAssignToList();
  }
  handleAddTaskModalOpn() {
    this.setState({ AddTaskModal: true });
  }
  handleAddTaskModalCls() {
    this.setState({ AddTaskModal: false });
  }
  handleTaskDetailsDrawerOpn() {
    this.setState({ TaskDetailDrawer: true });
  }
  handleTaskDetailsDrawerCls() {
    this.setState({ TaskDetailDrawer: false });
  }
  HandleRowClickDraw = (rowInfo, column) => {
    return {
      onClick: (e) => {
        var taskId = column.original["ticketingTaskID"];
        this.setState({
          ticketTask_Id: taskId,
        });
        this.handleGetTaskTabDetails(taskId);
        this.handleTaskDetailsDrawerOpn();
        this.handleGetTaskCommentsdetails(taskId);
      },
    };
  };
  handleTaskOnchangeData = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleGetTaskTableGrid(Id) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Task/gettasklist",
      headers: authHeader(),
      params: {
        TicketId: Id,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ taskTableGrid: data });
        } else {
          self.setState({ taskTableGrid: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetTaskTabDetails(ticketTaskId) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Task/gettaskdetailsbyid",
      headers: authHeader(),
      params: {
        taskId: ticketTaskId,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ taskDetailsData: data });
        } else {
          self.setState({ taskDetailsData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetTaskCommentsdetails(ticketTaskId) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Task/getTaskComment",
      headers: authHeader(),
      params: {
        TaskId: ticketTaskId,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ Taskdetails: data });
        } else {
          self.setState({ Taskdetails: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetDepartmentList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getDepartmentList",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ DepartmentData: data });
        } else {
          self.setState({ DepartmentData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetFunctionList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getFunctionNameByDepartmentId",
      headers: authHeader(),
      params: {
        DepartmentId: this.state.selectedDepartment,
      },
    })
      .then(function(res) {
        let FunctionData = res.data.responseData;
        self.setState({ FunctionData: FunctionData });
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetAssignToList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetAssignedTo",
      headers: authHeader(),
      params: {
        Function_ID: this.state.selectedFunction,
      },
    })
      .then(function(res) {
        let AssignToData = res.data.responseData;
        self.setState({ AssignToData: AssignToData });
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetTicketPriorityList() {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/StorePriority/GetPriorityList",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ TicketPriorityData: data });
        } else {
          self.setState({ TicketPriorityData: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  setDepartmentValue = (e) => {
    let DepartmentValue = e.target.value;
    // this.setState({ selectedDepartment: parseInt(DepartmentValue) });
    this.setState({ selectedDepartment: DepartmentValue });
    setTimeout(() => {
      if (this.state.selectedDepartment) {
        this.handleGetFunctionList();
      }
    }, 1);
  };
  setFunctionValue = (e) => {
    let FunctionValue = e.target.value;
    this.setState({ selectedFunction: FunctionValue });
    setTimeout(() => {
      if (this.state.selectedFunction) {
        this.handleGetAssignToList();
      }
    }, 1);
  };
  setAssignToValue = (e) => {
    let AssignValue = e.target.value;
    this.setState({ selectedAssignTo: AssignValue });
  };
  setPriorityValue = (e) => {
    let PriorityValue = e.target.value;
    console.log("print PriorityValue", PriorityValue);
    this.setState({ selectedPriority: PriorityValue });
  };
  handleAddTaskTitle() {
    console.log("inside create task");
    try {
      const TranslationContext = this.state.translateLanguage.default;
    if (
      this.state.taskTitle.length > 0  &&
      this.state.taskDescription.length > 0 &&
      this.state.selectedDepartment.length > 0  &&
      this.state.selectedFunction.length > 0  &&
      this.state.selectedAssignTo.length > 0  &&
      this.state.selectedPriority.length > 0 
    ) {
      let self = this;
      let ticketId = this.state.tikcet_ID;
      axios({
        method: "post",
        url: config.apiUrl + "/Task/createTask",
        headers: authHeader(),
        data: {
          TaskTitle: this.state.taskTitle,
          TaskDescription: this.state.taskDescription,
          DepartmentId: this.state.selectedDepartment,
          FunctionID: this.state.selectedFunction,
          AssignToID: this.state.selectedAssignTo,
          PriorityID: this.state.selectedPriority,
          TicketID: this.state.tikcet_ID,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.ticketingDashboard.taskcreatedsuccessfully
                : "Task created successfully."
            );
            self.handleAddTaskModalCls();
            self.handleGetTaskTableGrid(ticketId);
            self.setState({
              taskTitle: "",
              taskDescription: "",
              selectedDepartment: 0,
              selectedFunction: 0,
              selectedAssignTo: 0,
              selectedPriority: 0,
            });
            self.props.callbackToParent();
            // {
            //   self.props.callBackTaskLenght(self.state.tikcet_ID);
            // }
          } else {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.ticketingDashboard.tasknotcreated
                : "Task not created."
            );
            // {
            //   self.props.callBackTaskLenght(self.state.tikcet_ID);
            // }
          }
        })
        .catch(function(res) {
          //handle error
          console.log(res);
        });
    } else {
      this.setState({
        taskTitleCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.thetitlefieldiscompulsory
            : "The Title field is compulsory.",
        taskDescCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard
                .thedescriptionfieldiscompulsory
            : "The Description field is compulsory.",
        taskDepartmentCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard
                .thedepartmentfieldiscompulsory
            : "The Department field is compulsory.",
        taskFunctionCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.thefunctionfieldiscompulsory
            : "The Function field is compulsory.",
        taskAssignToCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.theassigntofieldiscompulsory
            : "The Assign To field is compulsory.",
        taskPriorityCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.thepriorityfieldiscompulsory
            : "The Priority field is compulsory.",
      });
    }
    } catch (error) {
      console.log(error)
    }
  }
  handleTaskAddComments() {
    const TranslationContext = this.state.translateLanguage.default;
    if (this.state.taskAddComment.length > 0) {
      var TaskData = this.props.taskData.TicketData.TabActiveId;
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/Task/AddComment",
        headers: authHeader(),
        params: {
          CommentForId: TaskData,
          Comment: this.state.taskAddComment.trim(),
          Id: this.state.ticketTask_Id,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.commentaddedsuccessfully
                : "Comment added successfully."
            );
            self.setState({
              taskAddComment: "",
            });
            self.handleGetTaskCommentsdetails(self.state.ticketTask_Id);
          } else {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.commentnotadded
                : "Comment not added."
            );
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        addcommentCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.pleaseaddcomment
            : "Please Add Comment.",
      });
    }
  }

  render() {
    const { taskTableGrid } = this.state;
    const TranslationContext = this.state.translateLanguage.default;

    return (
      <div>
        <div
          className={
            this.props.isKB
              ? "claim-addTask-btn iskbticket"
              : "claim-addTask-btn"
          }
        >
          <button
            type="button"
            className="butn"
            onClick={this.handleAddTaskModalOpn.bind(this)}
          >
            {TranslationContext !== undefined
              ? TranslationContext.button.addtask
              : "ADD TASK"}
          </button>
        </div>
        <Modal
          open={this.state.AddTaskModal}
          onClose={this.handleAddTaskModalCls.bind(this)}
          closeIconId="sdsg"
          modalId="ClaimAdd-taskPopup"
          overlayId="logout-ovrly"
        >
          <div className="claim-AddTask-Mdl">
            <label className="claim-hdrMdl">
              {TranslationContext !== undefined
                ? TranslationContext.nav.task
                : "Task"}
            </label>
            <img
              src={CancelImg}
              alt="cancelImg"
              className="cancalImg"
              onClick={this.handleAddTaskModalCls.bind(this)}
            />
          </div>
          <div style={{ padding: "20px 8px 0px 8px" }}>
            <input
              type="text"
              className="txt-1"
              placeholder={
                TranslationContext !== undefined
                  ? TranslationContext.span.tasktitle
                  : "Task Title"
              }
              name="taskTitle"
              value={this.state.taskTitle}
              onChange={this.handleTaskOnchangeData}
              maxLength="100"
            />
            {this.state.taskTitle.length === 0 && (
              <p style={{ color: "red", marginBottom: "0px" }}>
                {this.state.taskTitleCompulsion}
              </p>
            )}
            <textarea
              className="ClaimAddTadk-modal-textArea mb-0"
              placeholder={
                TranslationContext !== undefined
                  ? TranslationContext.label.taskdescription
                  : "Task Description"
              }
              rows="6"
              name="taskDescription"
              value={this.state.taskDescription}
              onChange={this.handleTaskOnchangeData}
              maxLength="250"
            ></textarea>
            {this.state.taskDescription.length === 0 && (
              <p style={{ color: "red", marginBottom: "0px" }}>
                {this.state.taskDescCompulsion}
              </p>
            )}
            <div className="row m-t-15">
              <div className="col-md-6">
                <select
                  name="Department"
                  className="category-select-system dropdown-label"
                  value={this.state.selectedDepartment}
                  onChange={this.setDepartmentValue}
                >
                  <option value="" className="select-category-placeholder">
                    {TranslationContext !== undefined
                      ? TranslationContext.option.department
                      : "Department"}
                  </option>
                  {this.state.DepartmentData !== null &&
                    this.state.DepartmentData.map((item, i) => (
                      <option
                        key={i}
                        value={item.departmentID}
                        className="select-category-placeholder"
                      >
                        {item.departmentName}
                      </option>
                    ))}
                </select>
                {this.state.selectedDepartment.length === 0 && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.taskDepartmentCompulsion}
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <select
                  name="Function"
                  className="category-select-system dropdown-label"
                  value={this.state.selectedFunction}
                  onChange={this.setFunctionValue}
                >
                  <option value="" className="select-sub-category-placeholder">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.function
                      : "Function"}
                  </option>
                  {this.state.FunctionData !== null &&
                    this.state.FunctionData.map((item, i) => (
                      <option
                        key={i}
                        value={item.functionID}
                        className="select-category-placeholder"
                      >
                        {item.funcationName}
                      </option>
                    ))}
                </select>
                {this.state.selectedFunction.length === 0 && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.taskFunctionCompulsion}
                  </p>
                )}
              </div>
            </div>
            <div className="row m-t-15">
              <div className="col-md-6">
                <select
                  name="AssignTo"
                  value={this.state.selectedAssignTo}
                  onChange={this.setAssignToValue}
                  className="category-select-system dropdown-label"
                >
                  <option value="" className="select-category-placeholder">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.assignto
                      : "Assign To"}
                  </option>
                  {this.state.AssignToData !== null &&
                    this.state.AssignToData.map((item, i) => (
                      <option
                        key={i}
                        value={item.userID}
                        className="select-category-placeholder"
                      >
                        {item.userName}
                      </option>
                    ))}
                </select>
                {this.state.selectedAssignTo.length === 0 && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.taskAssignToCompulsion}
                  </p>
                )}
              </div>
              <div className="col-md-6">
                <select
                  name="Priority"
                  value={this.state.selectedPriority}
                  onChange={this.setPriorityValue}
                  className="category-select-system dropdown-label"
                >
                  <option className="select-sub-category-placeholder">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.taskpriority
                      : "Task Priority"}
                  </option>
                  {this.state.TicketPriorityData !== null &&
                    this.state.TicketPriorityData.map((item, i) => (
                      <option
                        key={i}
                        value={item.priorityID}
                        className="select-sub-category-placeholder"
                      >
                        {item.priortyName}
                      </option>
                    ))}
                </select>
                {this.state.selectedPriority.length === 0 && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.taskPriorityCompulsion}
                  </p>
                )}
              </div>
            </div>
            <div className="row m-t-20" style={{ float: "right" }}>
              <div style={{ marginRight: "15px" }}>
                <button
                  className="cancel"
                  type="button"
                  onClick={this.handleAddTaskModalCls.bind(this)}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.option.cancel
                    : "CANCEL"}
                </button>
                <button
                  className="butn"
                  type="button"
                  onClick={this.handleAddTaskTitle.bind(this)}
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.button.createtask
                    : "CREATE TASK"}
                </button>
              </div>
            </div>
          </div>
        </Modal>
        <div className="table-cntr mt-3 MyTicketTaskReact">
          <ReactTable
            data={taskTableGrid}
            columns={[
              {
                Header: (
                  <span>
                    {TranslationContext !== undefined
                      ? TranslationContext.label.id
                      : "ID"}
                  </span>
                ),
                accessor: "ticketingTaskID",
                Cell: (row) => (
                  <span>
                    <img
                      src={HeadPhone3}
                      alt="HeadPhone"
                      className="headPhone3"
                    />
                    {row.original.ticketingTaskID}
                  </span>
                ),
              },
              {
                Header: (
                  <span>
                    {TranslationContext !== undefined
                      ? TranslationContext.label.status
                      : "Status"}
                  </span>
                ),
                accessor: "taskStatus",
              },
              {
                Header: (
                  <span>
                    {TranslationContext !== undefined
                      ? TranslationContext.span.tasktitle
                      : "Task Title"}
                  </span>
                ),
                accessor: "taskTitle",
              },
              {
                Header: (
                  <span>
                    {TranslationContext !== undefined
                      ? TranslationContext.label.department
                      : "Department"}
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                ),
                accessor: "departmentName",
              },
              {
                Header: (
                  <span>
                    {TranslationContext !== undefined
                      ? TranslationContext.label.storecode
                      : "Store Code"}
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                ),
                accessor: "storeCode",
              },
              {
                Header: (
                  <span>
                    {TranslationContext !== undefined
                      ? TranslationContext.label.createdby
                      : "Created By"}
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                ),
                accessor: "createdBy",
              },
              {
                Header: (
                  <span>
                    {TranslationContext !== undefined
                      ? TranslationContext.span.creationon
                      : "Creation On"}
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                ),
                accessor: "dateFormat",
              },
              {
                Header: (
                  <span>
                    {TranslationContext !== undefined
                      ? TranslationContext.label.assignto
                      : "Assign To"}
                    <FontAwesomeIcon icon={faCaretDown} />
                  </span>
                ),
                accessor: "assignName",
              },
            ]}
            minRows={2}
            // resizable={false}
            defaultPageSize={10}
            showPagination={false}
            getTrProps={this.HandleRowClickDraw.bind(this)}
          />

          <Drawer
            className="taskTab-drawerModal tktTaskDrw"
            placement={"right"}
            closable={false}
            // onClose={this.handleClaimDetailsModalClose}
            visible={this.state.TaskDetailDrawer}
          >
            <div style={{ marginLeft: "10px" }}>
              <a href="#!" onClick={this.handleTaskDetailsDrawerCls.bind(this)}>
                <img
                  src={BlackLeftArrow}
                  alt="black-left-arrow-icon"
                  className="black-left-arrow"
                  // onClick={this.handleTaskDetailsDrawerCls.bind(this)}
                />
              </a>
              <label className="task-details">
                {TranslationContext !== undefined
                  ? TranslationContext.label.taskdetails
                  : "Task Details"}
              </label>
            </div>
            <hr className="claimline" />
            <div className="">
              <label className="wifiLbl-drawer">
                {this.state.taskDetailsData.taskTitle}
              </label>
              <div className="row m-b-15">
                <div className="col-xs-3">
                  <img
                    src={Headphone2Img}
                    alt="headphone"
                    className="oval-56"
                  />
                </div>
                <div className="col-xs-9">
                  <label className="addTask-2-d-ago m-r-25">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.assignedto
                      : "ASSIGNED TO"}
                    <span className="addTasklbl-name">
                      {this.state.taskDetailsData.assignName}
                    </span>
                  </label>
                </div>
                <div className="col-xs-3">
                  <img
                    src={RightCirculImg}
                    alt="headphone"
                    className="status-opn"
                  />
                </div>
                <div className="col-xs-9">
                  <label className="addTask-2-d-ago m-r-25">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.status
                      : "STATUS"}
                    <span className="addTasklbl-name">
                      {this.state.taskDetailsData.taskStatus}
                    </span>
                  </label>
                </div>
                <div className="col-xs-3">
                  <img
                    src={CalSmallImg}
                    alt="headphone"
                    className="status-opn"
                  />
                </div>
                <div className="col-xs-9">
                  <label className="addTask-2-d-ago">
                    {TranslationContext !== undefined
                      ? TranslationContext.ticketingDashboard.duedate
                      : "DUE DATE"}
                    <span className="addTasklbl-name">
                      {this.state.taskDetailsData.dateFormat}
                    </span>
                  </label>
                </div>
              </div>
              <p className="tasktasb-para">
                {this.state.taskDetailsData.taskDescription}
              </p>
              <hr className="claimline" />
              <textarea
                className="task-drawerv-textArea"
                placeholder={
                  TranslationContext !== undefined
                    ? TranslationContext.a.addcomments
                    : "Add Comments"
                }
                name="taskAddComment"
                value={this.state.taskAddComment}
                onChange={this.handleTaskOnchangeData}
              ></textarea>
              {this.state.taskAddComment.length === 0 && (
                <p style={{ color: "red", marginBottom: "0px" }}>
                  {this.state.addcommentCompulsion}
                </p>
              )}
              <button
                className="assign-butn btn-assign-tikcet"
                type="button"
                onClick={this.handleTaskAddComments.bind(this)}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.a.addcomments
                  : "ADD COMMENT"}
              </button>
              <div className="varunoverflow">
                {this.state.Taskdetails !== null &&
                  this.state.Taskdetails.map((item, i) => (
                    <div className="row m-t-20 mx-0" key={i}>
                      <div className="col-xs-6" style={{ display: "contents" }}>
                        <div className="storeImg-drawer">
                          <img
                            src={StoreImg}
                            alt="headphone"
                            className="storeImg"
                          />
                        </div>
                        <label className="varun-taskDrawer">
                          {item.name}
                          <span className="addTask-time-ago">
                            {item.datetime}
                          </span>
                        </label>

                        <label className="task-drawer-lnl">
                          {item.comment}
                        </label>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    );
  }
}

export default MyTicketTask;
