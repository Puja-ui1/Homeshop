import React, { Component, Fragment } from "react";
import Demo from "../../../store/Hashtag";
import { Link } from "react-router-dom";
import ReactTable from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import DownExcel from "./../../../assets/Images/black-Dld.png";
import Modal from "react-responsive-modal";
import CancelImg from "./../../../assets/Images/Circle-cancel.png";
import DatePicker from "react-datepicker";
import { Popover } from "antd";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import { authHeader } from "../../../helpers/authHeader";
import axios from "axios";
import config from "../../../helpers/config";
import SlaDue from "../../SlaDue";
import { NotificationManager } from "react-notifications";
import ClaimStatus from "../../ClaimStatus";
import TaskStatus from "../../TaskStatus";
import TicketStatus from "../../TicketStatus";
import moment from "moment";
import Select from "react-select";
import { Checkbox } from "antd";
import ScheduleDateDropDown from "../../ScheduleDateDropDown";
import SimpleReactValidator from "simple-react-validator";
import Sorting from "./../../../assets/Images/sorting.png";
import matchSorter from "match-sorter";
import * as translationHI from "./../../../translations/hindi";
import * as translationMA from "./../../../translations/marathi";

class Teamcreation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TeamModel: false,
      teamGridData: [],
      teamInput: {},
      teamError: {},
      unitData: [],
      isEdit: false,
      loading: false,
    };
  }
  componentDidMount() {
    this.handleGetTeamGridData();
    this.handleGetUnitData();
    this.handleGetUserData();
  }
  hide(e, id) {
    document.getElementById(
      id
    ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
      "none";
  }
  show(e, id) {
    if (document.getElementById(id))
      document.getElementById(
        id
      ).parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
        "block";
  }
  handleOnChangeInput = (name, e) => {
    let teamInput = this.state.teamInput;
    teamInput[name] = e.target.value;
    this.setState({
      teamInput,
    });
  };
  handleSelectChange = (name, e) => {
    let teamInput = this.state.teamInput;
    teamInput[name] = e;
    this.setState({ teamInput });
  };
  TeamCloseModel() {
    this.setState({ TeamModel: false, teamInput: {}, isEdit: false });
  }
  TeamOpenModel() {
    this.setState({ TeamModel: true });
  }
  handleGetTeamGridData = () => {
    let self = this;
    this.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/Team/GetTeamDetails",
      headers: authHeader(),
      params: {
        TeamID: 0,
        Search: null,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            teamGridData: data,
            loading: false,
          });
        } else {
          self.setState({
            teamGridData: [],
            loading: false,
          });
        }
      })
      .catch((error) => console.log(error));
  };
  handleDeleteTeam(id) {
    let self = this;

    axios({
      method: "post",
      url: config.apiUrl + "/Team/DeleteTeamDetails",
      headers: authHeader(),
      params: {
        TeamID: id + "",
      },
    })
      .then(function(res) {
        let Msg = res.data.message;
        if (Msg === "Success") {
          NotificationManager.success("Record Deleted successfully.");
          self.handleGetTeamGridData();
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetUnitData = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetUnitName",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ unitData: data });
        } else {
          self.setState({ unitData: [] });
        }
      })
      .catch((error) => console.log(error));
  };
  handleGetUserData = () => {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/User/GetUserListData",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ userData: data });
        } else {
          self.setState({ userData: [] });
        }
      })
      .catch((error) => console.log(error));
  };
  handleTeamValidation() {
    let teamInput = this.state.teamInput;
    let teamError = {};
    let isValid = true;

    if (!teamInput["TeamName"]) {
      isValid = false;
      teamError["TeamName"] = "Please enter team name.";
    }
    if (!teamInput["Unit"]) {
      isValid = false;
      teamError["Unit"] = "Please select unit.";
    }
    if (!teamInput["Email"]) {
      isValid = false;
      teamError["Email"] = "Please enter email.";
    }
    if (!teamInput["Mobile"]) {
      isValid = false;
      teamError["Mobile"] = "Please enter mobile no.";
    }
    if (!teamInput["Responsibility"]) {
      isValid = false;
      teamError["Responsibility"] = "Please enter responsibility.";
    }
    // if (this.state.isEdit === true) {
    // if (teamInput["Members"].length === 0) {
    //   isValid = false;
    //   teamError["Members"] = "Please select members.";
    // }
    // } else {
    if (!teamInput["Members"]) {
      isValid = false;
      teamError["Members"] = "Please select members.";
    }
    // }

    this.setState({
      teamError,
    });
    return isValid;
  }

  handleCreateTeam = () => {
    let self = this;
    var finalUnitID = "";
    var finalUserID = "";
    if (this.state.teamInput.Unit !== null) {
      for (let i = 0; i < this.state.teamInput.Unit.length; i++) {
        finalUnitID += this.state.teamInput.Unit[i].unitName_Id + ",";
      }
    }
    if (this.state.teamInput.Members !== null) {
      for (let i = 0; i < this.state.teamInput.Members.length; i++) {
        finalUserID += this.state.teamInput.Members[i].userId + ",";
      }
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Team/CreateTeamDetails",
      headers: authHeader(),
      data: {
        TeamName: this.state.teamInput.TeamName.trim(),
        MobileNo: this.state.teamInput.Mobile.trim(),
        Email: this.state.teamInput.Email.trim(),
        UnitId: finalUnitID.slice(0, -1),
        ResponsibilityFor: this.state.teamInput.Responsibility.trim(),
        Members: finalUserID.slice(0, -1),
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          NotificationManager.success("Team added successfully.");
          self.setState({
            TeamModel: false,
            teamInput: {},
          });
          self.handleGetTeamGridData();
        } else {
          NotificationManager.error("Team Not added.");
        }
      })
      .catch((error) => console.log(error));
  };
  handleUpdateTeam = () => {
    let self = this;
    var finalUnitID = "";
    var finalUserID = "";
    if (this.state.teamInput.Unit !== null) {
      for (let i = 0; i < this.state.teamInput.Unit.length; i++) {
        finalUnitID += this.state.teamInput.Unit[i].unitName_Id + ",";
      }
    }
    if (this.state.teamInput.Members !== null) {
      for (let i = 0; i < this.state.teamInput.Members.length; i++) {
        finalUserID += this.state.teamInput.Members[i].userId + ",";
      }
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Team/UpdateTeamDetails",
      headers: authHeader(),
      data: {
        TeamID: this.state.teamInput.TeamID,
        TeamName: this.state.teamInput.TeamName.trim(),
        MobileNo: this.state.teamInput.Mobile.trim(),
        Email: this.state.teamInput.Email.trim(),
        UnitId: finalUnitID.slice(0, -1),
        ResponsibilityFor: this.state.teamInput.Responsibility.trim(),
        Members: finalUserID.slice(0, -1),
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          NotificationManager.success("Team updated successfully.");
          self.setState({
            TeamModel: false,
            teamInput: {},
            isEdit: false,
          });
          self.handleGetTeamGridData();
        } else {
          NotificationManager.error("Team Not updated.");
        }
      })
      .catch((error) => console.log(error));
  };
  handleSubmitData() {
    if (this.handleTeamValidation()) {
      if (this.state.isEdit) {
        this.handleUpdateTeam();
      } else {
        this.handleCreateTeam();
      }
    }
  }

  handleEditTeam = (e) => {
    let teamInput = this.state.teamInput;
    teamInput["TeamName"] = e.teamName;
    teamInput["Email"] = e.email;
    teamInput["Mobile"] = e.mobileNo;
    teamInput["Responsibility"] = e.responsibilityFor;
    teamInput["TeamID"] = e.teamID;
    if (e.members) {
      var membersTemp = e.members.split(",");
      var memberTempArrary = [];
      for (let i = 0; i < membersTemp.length; i++) {
        var data = this.state.userData.filter(
          (x) => x.userId == membersTemp[i]
        );
        if (data.length > 0) {
          memberTempArrary.push(data[0]);
        }
      }
      teamInput["Members"] = memberTempArrary;
    } else {
      teamInput["Members"] = [];
    }

    if (e.unitId) {
      var unitTemp = e.unitId.split(",");
      var unitTempArrary = [];
      for (let i = 0; i < unitTemp.length; i++) {
        var data = this.state.unitData.filter(
          (x) => x.unitName_Id == unitTemp[i]
        );
        if (data.length > 0) {
          unitTempArrary.push(data[0]);
        }
      }
      teamInput["Unit"] = unitTempArrary;
    } else {
      teamInput["Unit"] = [];
    }
    this.setState({
      TeamModel: true,
      teamInput,
      isEdit: true,
    });
  };

  render() {
    const dataTeam = this.state.teamGridData;
    return (
      <Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            Settings
          </Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">
            Ticketing
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            Team Creation
          </Link>
          <div className="reportbutton">
            <div className="addplus">
              <button
                type="button"
                className="addplusbtnReport"
                onClick={this.TeamOpenModel.bind(this)}
              >
                + Add
              </button>
            </div>
          </div>
          <Modal
            onClose={this.TeamCloseModel}
            open={this.state.TeamModel}
            modalId="BlockEmailModel"
            overlayId="logout-ovrly"
          >
            <div className="setting-tabs alert-tabs">
              <label style={{ marginLeft: "227px", fontSize: "large" }}>
                {this.state.isEdit ? "Team Update" : "Team Creation"}
              </label>
              <img
                src={CancelImg}
                alt="CancelImg"
                className="block-cancelImg"
                onClick={this.TeamCloseModel.bind(this)}
              />
            </div>
            <div class="tab-content">
              <div className="pop-upAddSearchPD">
                <div className="row">
                  <div className="col-md-12 ticketreport">
                    <label>Team Name</label>
                    <input
                      className="no-bg"
                      type="text"
                      maxLength={25}
                      name="TeamName"
                      value={this.state.teamInput.TeamName}
                      onChange={this.handleOnChangeInput.bind(this, "TeamName")}
                    />
                    {this.state.teamError ? (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.teamError["TeamName"]}
                      </p>
                    ) : null}
                  </div>
                  <div className="col-md-12 ">
                    <label>Unit</label>
                    <Select
                      getOptionLabel={(option) => option.unitName_Name}
                      getOptionValue={(option) => option.unitName_Id}
                      options={this.state.unitData}
                      placeholder={Select}
                      name="Unit"
                      closeMenuOnSelect={false}
                      onChange={this.handleSelectChange.bind(this, "Unit")}
                      value={this.state.teamInput.Unit}
                      showNewOptionAtTop={false}
                      isMulti
                    />
                    {this.state.teamError ? (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.teamError["Unit"]}
                      </p>
                    ) : null}
                  </div>
                  <div className="col-md-12 ticketreport">
                    <label>Email</label>
                    <input
                      className="no-bg"
                      type="text"
                      maxLength={25}
                      name="Email"
                      value={this.state.teamInput.Email}
                      onChange={this.handleOnChangeInput.bind(this, "Email")}
                    />
                    {this.state.teamError ? (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.teamError["Email"]}
                      </p>
                    ) : null}
                  </div>
                  <div className="col-md-12 ticketreport">
                    <label>Mobile</label>
                    <input
                      className="no-bg"
                      type="text"
                      maxLength={25}
                      name="Mobile"
                      value={this.state.teamInput.Mobile}
                      onChange={this.handleOnChangeInput.bind(this, "Mobile")}
                    />
                    {this.state.teamError ? (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.teamError["Mobile"]}
                      </p>
                    ) : null}
                  </div>
                  <div className="col-md-12 ticketreport">
                    <label>Responsibility For</label>
                    <input
                      className="no-bg"
                      type="text"
                      maxLength={25}
                      name="Responsibility"
                      value={this.state.teamInput.Responsibility}
                      onChange={this.handleOnChangeInput.bind(
                        this,
                        "Responsibility"
                      )}
                    />
                    {this.state.teamError ? (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.teamError["Responsibility"]}
                      </p>
                    ) : null}
                  </div>
                  <div className="col-md-12 ticketreport">
                    <label>Members</label>
                    <Select
                      getOptionLabel={(option) => option.userName}
                      getOptionValue={(option) => option.userId}
                      options={this.state.userData}
                      placeholder={Select}
                      name="Members"
                      closeMenuOnSelect={false}
                      onChange={this.handleSelectChange.bind(this, "Members")}
                      value={this.state.teamInput.Members}
                      showNewOptionAtTop={false}
                      isMulti
                    />
                    {this.state.teamError ? (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.teamError["Members"]}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className="btn-block">
                  <button
                    style={{ marginLeft: "10px" }}
                    type="button"
                    className="butn add-cust-butn"
                    onClick={this.handleSubmitData.bind(this)}
                    disabled={this.state.loading}
                  >
                    {this.state.isEdit ? "Update" : "Save"}
                  </button>
                </div>
              </div>
            </div>
          </Modal>
          <Modal
            modalId="addreport-popup"
            // overlayId="addreport-popup"
          >
            <div class="tab-content">
              <div className="pop-upAddSearchPD">
                <div className="row row-margin1">
                  <div className="col-md-12">
                    <textarea
                      className="txt-1"
                      name="JunkWords"
                      value={this.state.JunkWords}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div className="row row-margin1">
                  <div className="col-md-12">
                    <textarea
                      className="txt-1"
                      name="Reason"
                      value={this.state.Reason}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="btn-block">
                  <button
                    type="button"
                    className="butn add-cust-butn"
                    onClick={
                      this.state.JunkKeywordID === 0
                        ? this.handleSaveJunkWords
                        : this.handleUpdateJunkWords
                    }
                    disabled={this.state.loading}
                  ></button>
                </div>
              </div>
            </div>
            <div className="container reportpad"></div>
          </Modal>
        </div>

        <div className="container-fluid">
          <div className="store-settings-cntr settingtable reactreport">
            <div style={{ backgroundColor: "#fff" }}>
              {this.state.loading === true ? (
                <div className="loader-icon"></div>
              ) : (
                <div className="settings-align">
                  <ReactTable
                    data={dataTeam}
                    columns={[
                      {
                        Header: (
                          <span className={this.state.nameColor}>
                            Team Name
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "teamName",
                      },
                      {
                        Header: (
                          <span className={this.state.scheduleColor}>
                            Unit
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "unitName",
                      },
                      {
                        Header: (
                          <span className={this.state.scheduleColor}>
                            Team Email
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "email",
                      },
                      {
                        Header: (
                          <span className={this.state.scheduleColor}>
                            Responsible For
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "responsibilityFor",
                      },
                      {
                        Header: (
                          <span className={this.state.scheduleColor}>
                            Mobile No
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "mobileNo",
                      },

                      {
                        Header: (
                          <span className={this.state.createdColor}>
                            createdBy
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "createdByName",
                        Cell: (row) => {
                          var ids = row.original["teamID"];
                          return (
                            <div>
                              <span className="one-liner">
                                {row.original.createdByName}
                                <Popover
                                  content={
                                    <div className="settings-created-by-popover">
                                      <div>
                                        <b>
                                          <p className="title">
                                            Created By :{" "}
                                            {row.original.createdByName}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          Created Date :{" "}
                                          {row.original.createdDate}
                                        </p>
                                      </div>
                                      <div>
                                        <b>
                                          <p className="title">
                                            Updated By :{" "}
                                            {row.original.modifiedByName}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          Updated Date :{" "}
                                          {row.original.modifiedDate}
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
                                    id={ids}
                                  />
                                </Popover>
                              </span>
                            </div>
                          );
                        },
                      },

                      {
                        Header: <span>Action</span>,
                        accessor: "actionReport",
                        sortable: false,
                        Cell: (row) => (
                          <div className="report-action">
                            <div>
                              {row.original.teamID == 0 ? (
                                ""
                              ) : (
                                <Popover
                                  content={
                                    <div
                                      className="samdel d-flex general-popover popover-body"
                                      id={"samdel" + row.original.teamID}
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
                                            href="#!"
                                            className="canblue"
                                            onClick={() =>
                                              this.hide(
                                                this,
                                                "samdel" + row.original.teamID
                                              )
                                            }
                                          >
                                            CANCEL
                                          </a>
                                          <button
                                            className="butn"
                                            onClick={this.handleDeleteTeam.bind(
                                              this,
                                              row.original.teamID
                                            )}
                                          >
                                            Delete
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
                                  />
                                </Popover>
                              )}
                            </div>
                            <div>
                              {row.original.teamID == 0 ? (
                                ""
                              ) : (
                                <button
                                  className="react-tabel-button editre"
                                  id="p-edit-pop-2"
                                  onClick={this.handleEditTeam.bind(
                                    this,
                                    row.original
                                  )}
                                >
                                  EDIT
                                </button>
                              )}
                            </div>
                          </div>
                        ),
                      },
                    ]}
                    resizable={false}
                    defaultPageSize={10}
                    showPagination={true}
                    minRows={1}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Teamcreation;
