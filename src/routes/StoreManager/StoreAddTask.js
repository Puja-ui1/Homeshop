import React, { Component, Fragment } from "react";
import { authHeader } from "./../../helpers/authHeader";
import axios from "axios";
import config from "./../../helpers/config";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  NotificationManager,
} from "react-notifications";
import FileUpload from "../../assets/Images/file.png";
import * as translationHI from "./../../translations/hindi";
import * as translationMA from "./../../translations/marathi";

class StoreAddTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departmentData: [],
      funcationData: [],
      priorityData: [],
      assignToData: [],
      departmentID: 0,
      funcationID: 0,
      priorityID: 0,
      assignToID: 0,
      taskTitle: "",
      taskDetails: "",
      isAddloading: false,
      istaskTitle: "",
      istaskDetails: "",
      isassignto: "",
      ispriority: "",
      isfuncation: "",
      isdepartment: "",
      translateLanguage: {},
      attachmentError: false,
      isAttachment: '',
      attachmentValue: [],
    };
  }
  componentDidMount() {
    this.handleGetDepartement();
    this.handleGetPriority();

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }


  ////handle create task
  handleCreateTask() {
    let self = this;
    if (this.state.taskTitle == "") {
      this.setState({ istaskTitle: "Please Enter Task Title." });
    } else {
      this.setState({ istaskTitle: "" });
    }

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
    if (this.state.assignToID == 0) {
      this.setState({ isassignto: "Please Select Assign To." });
    } else {
      this.setState({ isassignto: "" });
    }
    if (this.state.taskDetails == "") {
      this.setState({ istaskDetails: "Please Enter Task Details." });
    } else {
      this.setState({ istaskDetails: "" });
    }
    // if (this.state.attachmentValue.length == 0) {
    //   this.setState({ isAttachment: "Please select attachment." });
    // } else {
    //   this.setState({ isAttachment: "" });
    // }

    setTimeout(() => {
      if (
        this.state.isassignto == "" &&
        this.state.istaskTitle == "" &&
        this.state.istaskDetails == "" &&
        this.state.isfuncation == "" &&
        this.state.isdepartment == "" &&
        this.state.ispriority == ""
        //  &&
        // this.state.isAttachment == ""
      ) {
        var inputParams = {};
        inputParams.TaskTitle = this.state.taskTitle.trim();
        inputParams.TaskDescription = this.state.taskDetails.trim();
        inputParams.DepartmentId = this.state.departmentID;
        inputParams.AssignToID = this.state.assignToID;
        inputParams.PriorityID = this.state.priorityID;
        inputParams.FunctionID = this.state.funcationID;


        // Form Data
        const formData = new FormData();
        // add file/file_id if there is one
        // file.map((file) => {
        //   formData.append('files', this.state.attachmentValue);
        // });
        for (let i = 0; i < this.state.attachmentValue.length; i++) {
          formData.append("file", this.state.attachmentValue[i]);
        }

        //Basic form info
        formData.append('TaskCreationRequest',JSON. stringify(inputParams));
        // formData.append('TaskDescription', this.state.taskDetails.trim());
        // formData.append('DepartmentId', this.state.departmentID);
        // formData.append('AssignToID', this.state.assignToID);
        // formData.append('PriorityID', this.state.priorityID);
        // formData.append('FunctionID', this.state.funcationID);


        this.setState({ isAddloading: true });
        axios({
          method: "post",
          url: config.apiUrl + "/StoreTask/CreateStoreTask",
          headers: authHeader(),
          data: formData,
        })
          .then(function (response) {
            var message = response.data.message;
            var responseData = response.data.responseData;
            if (responseData === 1 && message === "Success") {
              NotificationManager.success("Task Created successfully.");
              self.setState({
                isAddloading: false,
                departmentID: 0,
                funcationID: 0,
                priorityID: 0,
                taskDetails: "",
                taskTitle: "",
              });
              self.props.history.push("/store/StoreTask");
            } else {
              NotificationManager.error("Task Not Created successfully.");
              self.setState({ isAddloading: false });
            }
          })
          .catch((response) => {
            console.log(response, "---handleCreateTask");
          });
      }
    }, 10);
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

  ///handle get assign to
  handleGetAssignTo() {
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/StoreTask/GetAssignedTo",
      headers: authHeader(),
      params: {
        Function_ID: this.state.funcationID,
      },
    })
      .then(function (response) {
        var message = response.data.message;
        var assignToData = response.data.responseData;
        if (message === "Success" && assignToData.length > 0) {
          self.setState({ assignToData });
        } else {
          self.setState({ assignToData: [] });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetAssignTo");
      });
  }

  ////handle get priority
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



  ///handle input change
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
          assignToID: 0,
          assignToData: [],
        });
        setTimeout(() => {
          this.handleGetAssignTo();
        }, 10);
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
    if (name == "assignto") {
      if (value !== 0) {
        this.setState({
          assignToID: value,
          isassignto: "",
        });
      } else {
        this.setState({
          isassignto: "Please Select Assign To.",
          assignToID: value,
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
    if (name == "attchment") {
      //
      if (value !== "") {

        console.log("attachment",e)
        this.setState({
          attachmentValue: e.target.files,
          attachmentError: false,
        });
      }
      //  else {
      //   this.setState({
      //     isAttachment: "Please select attachment.",
      //     attachmentError: true,
      //   });
      // }
    }





  };

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <Fragment>
        <div className="row card1">
          <div className="col-md-8">
            <div className="card" style={{ padding: "35px" }}>
              <label className="store-Edit-lblcre">
                {TranslationContext !== undefined
                  ? TranslationContext.label.createtask
                  : "Create Task"}
              </label>
              <label className="store-Edit-lbl1">
                {TranslationContext !== undefined
                  ? TranslationContext.label.tasktitle
                  : "Task Title"}
              </label>
              <input
                type="text"
                className="store-edit-txt"
                name="tasktitle"
                value={this.state.taskTitle}
                onChange={this.handleOnchange}
                autoComplete="off"
              />
              {this.state.istaskTitle !== "" && (
                <p style={{ color: "red", marginBottom: "0px" }}>
                  {this.state.istaskTitle}
                </p>
              )}

              <div className="row">
                <div className="col-md-6 store-mrg">
                  <label className="store-Edit-lbl1">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.department
                      : "Department"}
                  </label>
                  <select
                    id="inputState"
                    className="form-control dropdown-label"
                    value={this.state.departmentID}
                    onChange={this.handleOnchange}
                    name="department"
                  >
                    <option value={0}>
                      {TranslationContext !== undefined
                        ? TranslationContext.option.select
                        : "Select"}
                    </option>
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
                <div className="col-md-6 store-mrg">
                  <label className="store-Edit-lbl1">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.function
                      : "Function"}
                  </label>
                  <select
                    id="inputState"
                    className="form-control dropdown-label"
                    value={this.state.funcationID}
                    name="funcation"
                    onChange={this.handleOnchange}
                  >
                    <option value={0}>
                      {TranslationContext !== undefined
                        ? TranslationContext.option.select
                        : "Select"}
                    </option>
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
              </div>

              <div className="row">
                <div className="col-md-6 store-mrg">
                  <label className="store-Edit-lbl1">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.priority
                      : "Priority"}
                  </label>
                  <select
                    id="inputState"
                    className="form-control dropdown-label"
                    name="priority"
                    onChange={this.handleOnchange}
                    value={this.state.priorityID}
                  >
                    <option value={0}>
                      {TranslationContext !== undefined
                        ? TranslationContext.option.select
                        : "Select"}
                    </option>
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
                <div className="col-md-6 store-mrg">
                  <label className="store-Edit-lbl1">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.assignto
                      : "Assign to"}
                  </label>
                  <select
                    id="inputState"
                    className="form-control dropdown-label"
                    name="assignto"
                    onChange={this.handleOnchange}
                  >
                    <option value={0}>Select</option>
                    {this.state.assignToData !== null &&
                      this.state.assignToData.map((item, i) => (
                        <option
                          key={i}
                          value={item.userID}
                          className="select-category-placeholder"
                        >
                          {item.userName}
                        </option>
                      ))}
                  </select>
                  {this.state.isassignto !== "" && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.isassignto}
                    </p>
                  )}
                </div>
              </div>

              <div className="row">
                <div className="col-md-12 store-mrg">
                  <label className="store-Edit-lbl1">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.taskdetails
                      : "Task Details"}
                  </label>
                  <textarea
                    onChange={this.handleOnchange}
                    value={this.state.taskDetails}
                    name="taskdetails"
                    rows="8"
                    className="textarea-store"
                    autoComplete="off"
                    maxLength={245}
                  ></textarea>
                  {this.state.istaskDetails !== "" && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.istaskDetails}
                    </p>
                  )}
                </div>
              </div>


              <div className="row">
                <div className="col-md-12 store-mrg">
                  <label className="store-Edit-lbl1" htmlFor="fileUpload" >
                    {TranslationContext !== undefined
                      ? TranslationContext.label.attachment
                      : "Attachment"}

                    {/* <img
                      src={FileUpload}
                      alt="file-upload"
                      className="fileup"
                    />
                    */}
                  </label>
                  <div className="input_container">
                    <input type="file"
                      id="fileUpload"
                      name="attchment"
                      multiple
                      onChange={this.handleOnchange}
                    />
                  </div>
                  {/* {this.state.attachmentError !== "" && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.isAttachment}
                    </p>
                  )} */}

                </div>
              </div>
              <div className="row">
                <div className="col-md-12 store-mrg">
                  <button
                    className="butn-store"
                    disabled={this.state.isAddloading}
                    onClick={this.handleCreateTask.bind(this)}
                  >
                    {this.state.isAddloading ? (
                      <FontAwesomeIcon
                        className="circular-loader"
                        icon={faCircleNotch}
                        spin
                      />
                    ) : (
                      ""
                    )}
                    {TranslationContext !== undefined
                      ? TranslationContext.button.submittask
                      : "SUBMIT TASK"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 ">
            <div className="card cardmargin"></div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default StoreAddTask;
