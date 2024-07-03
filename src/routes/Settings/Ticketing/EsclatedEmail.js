import React, { Component } from "react";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import Select from "react-select";
import CancelImg from "../../../assets/Images/Circle-cancel.png";
import "../../../assets/css/settings.css";
import { authHeader } from "../../../helpers/authHeader";
import axios from "axios";
import config from "../../../helpers/config";
import BlackInfoIcon from "../../../assets/Images/Info-black.png";
import { Popover } from "antd";
import { NotificationManager } from "react-notifications";
import DelBigIcon from "../../../assets/Images/del-big.png";
import RedDeleteIcon from "../../../assets/Images/red-delete-icon.png";

class EsclatedEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            EsclatedModel: false,
            esclateddata: [],
            isMin: false,
            isDay: false,
            emailName: "",
            UserList: [],
            selectedUser: "",
            responseSLA: 0,
            resolutionSLA: 0,
            isresponsemin: false,
            isresponsehrs: false,
            isresponseday: false,
            isresolutionmin: false,
            isresolutionhrs: false,
            isresolutionday: false,
            responseSlaType: "",
            resolutionSlaType: "",
            optionMDH: ["Min", "Hrs", "Day"],
            escalationUserId: "",
            isEditable: false,
            isValidEmail: true,
            //deleteId:""
            //selectedResType: "",
            //selectedResoType: ""
        }
    }
    EsclatedOpenModel = () => {
        this.setState({
            EsclatedModel: true,
            // isEditable: false,
            // escalationUserId: "",
            emailName: "",
            responseSLA: 0,
            resolutionSLA: 0,
            isEditable: false,
            selectedMDH: ""
        })
    }
    EsclatedCloseModel = () => {
        this.setState({
            EsclatedModel: false,
            loading: false,
        })
    }
    componentDidMount() {
        this.handleGetEsclatedData();
        this.handleGetUserData();
    }
    handleGetEsclatedData = () => {
        let self = this;
        this.setState({ loading: true });
        axios({
            method: "get",
            url: config.apiUrl + "/CRMRole/GetEscalationUserList",
            headers: authHeader(),
        })
            .then(function (res) {
                if (res.data.statusCode === 200) {
                    self.setState({
                        esclateddata: res.data.responseData,
                        loading: false,
                    });

                }

                else {
                    self.setState({
                        esclateddata: [],
                        loading: false,
                    });
                }
            })
            .catch((error) => console.log(error));
    };

    handleGetUserData = () => {
        let self = this;
        this.setState({ loading: true });
        axios({
            method: "get",
            url: config.apiUrl + "/User/GetUserListData",
            headers: authHeader(),
            params: {
                IsStoreUser: 1
            }

        })
            .then(function (res) {

                if (res.data.statusCode === 200) {
                    let arr = [];
                    for (let i = 0; i < res.data.responseData.length; i++) {
                        arr.push({ value: res.data?.responseData[i]?.userId, label: res.data?.responseData[i]?.userName })
                    }
                    self.setState({
                        UserList: arr,
                        loading: false,
                    });

                } else {
                    self.setState({
                        UserList: [],
                        loading: false,
                    });
                }
            })
            .catch((error) => console.log(error));
    };
    handleSelectChange = (a, b) => {
        const selectedVal = b.map(item => item.label).join(", ");
        this.setState({
            selectedUser: selectedVal
        })
    }
    isEmailValid = (emailText) => {
        // const regexEmail = new RegExp("^([a-zA-Z0-9+_-]+@[a-zA-Z]+.{3}[a-zA-z.]+[a-zA-z]{2})(?:,([a-zA-Z0-9+_-]+@[a-zA-Z]+.{3}[a-zA-z.]+[a-zA-z]{2}))*$")
        const regexEmail = new RegExp("^([A-Za-z0-9_%+][a-zA-Z0-9._%+_-]+@[a-zA-Z]+.{3}[a-zA-z.]+[a-zA-z]{2})(?:,([a-zA-Z0-9+_-]+@[a-zA-Z]+.{3}[a-zA-z.]+[a-zA-z]{2}))*$")
        const emailsList = emailText.split(",").map(email => email.trim());
        return emailsList.every(email => regexEmail.test(email));
    };
    handelEmail = (e) => {
        const value = e.target.value
        const isValidEmail2 = this.isEmailValid(value);
        this.setState({
            emailName: value,
            isValidEmail: isValidEmail2
        })
    }
    handleResponseSLA = (e) => {
        // let val=e.target.value
        const respVal = parseInt(e.target.value)
        const numRegex = new RegExp("^[1-9]\\d*$")
        const resSLA = numRegex.test(respVal)
        if (resSLA) {
            this.setState({
                responseSLA: respVal
            })

        }
        else {
            this.setState({
                responseSLA: 0
            })

        }

        //console.log("responseSLA",val)
    }
    handleResolutionSLA = (e) => {
        const respVal = parseInt(e.target.value)
        const numRegex = new RegExp("^[1-9]\\d*$")
        const resSLA = numRegex.test(respVal)
        if (resSLA) {
            this.setState({
                resolutionSLA: respVal
            })
        }
        else {
            this.setState({
                resolutionSLA: 0
            })

        }

    }
    handleResponseType = (e) => {
        this.setState({
            responseSlaType: e.target.value,
            // selectedResType: e.target.value

        })
    }
    handleResolutionType = (e) => {
        this.setState({
            resolutionSlaType: e.target.value,
            //selectedResoType: e.target.value
        })
    }
    handleCreateEsclated = () => {

        if (this.state.isValidEmail && this.state.emailName.length > 0) {
            let self = this;
            axios({
                method: "post",
                url: config.apiUrl + "/CRMRole/CreateOrUpdateEscalationUser",
                headers: authHeader(),
                data:
                {
                    "escalationUserId": self.state.isEditable ? self.state.escalationUserId : 0,
                    "emailID": self.state.emailName,
                    //"users": self.state.selectedUser,
                    "priorityID": 14,
                    "responseSLA": self.state.responseSLA,
                    "responseSLAIsHour": self.state.responseSlaType === "Hrs" ? true : false,
                    "responseSLAIsMins": self.state.responseSlaType === "Min" ? true : false,
                    "responseSLAIsDay": self.state.responseSlaType === "Day" ? true : false,
                    "resolutionSLA": self.state.resolutionSLA,
                    "resolutionSLAIsHour": self.state.resolutionSlaType === "Hrs" ? true : false,
                    "resolutionSLAIsMins": self.state.resolutionSlaType === "Min" ? true : false,
                    "resolutionSLAIsDay": self.state.resolutionSlaType === "Day" ? true : false,
                    "isActive": true
                },
            })
                .then(function (res) {
                    // 

                    if (res.data.statusCode === 200) {
                        NotificationManager.success("Record Created successfully.");
                        self.setState({
                            emailName: "",
                            responseSLA: "",
                            resolutionSLA: "",
                            EsclatedModel: false

                        });
                        self.handleGetEsclatedData()
                    } else {
                        NotificationManager.error(res.data.message)
                        self.setState({
                            loading: false,
                        });
                    }
                })
                .catch((error) => console.log(error));
        }
        else {
            // NotificationManager.error("Select Response and Resolution Duration ")
            this.setState({
                isValidEmail: false,
            })
        }
    }
    // handleDeleteEscalation=(e)=>{

    //     let self = this;
    //     self.setState({
    //         deleteId:e
    //     })
    //     axios({
    //         method: "post",
    //         url: config.apiUrl + "/CRMRole/CreateOrUpdateEscalationUser",
    //         headers: authHeader(),
    //         data:
    //         {
    //             "escalationUserId":  self.state.deleteId,
    //             "emailID": self.state.emailName,
    //             //"users": self.state.selectedUser,
    //             "priorityID": 14,
    //             "responseSLA": self.state.responseSLA,
    //             "responseSLAIsHour": self.state.responseSlaType === "Hrs" ? true : false,
    //             "responseSLAIsMins": self.state.responseSlaType === "Min" ? true : false,
    //             "responseSLAIsDay": self.state.responseSlaType === "Day" ? true : false,
    //             "resolutionSLA": self.state.resolutionSLA,
    //             "resolutionSLAIsHour": self.state.resolutionSlaType === "Hrs" ? true : false,
    //             "resolutionSLAIsMins": self.state.resolutionSlaType === "Min" ? true : false,
    //             "resolutionSLAIsDay": self.state.resolutionSlaType === "Day" ? true : false,
    //             "isActive": false
    //         },
    //     })
    //         .then(function (res) {
    //             // 

    //             if (res.data.statusCode === 200) {
    //                 NotificationManager.success("Record Deleted successfully.");
    //                 self.setState({
    //                     emailName: "",
    //                     responseSLA: "",
    //                     resolutionSLA: "",
    //                     EsclatedModel: false

    //                 });
    //                 self.handleGetEsclatedData()
    //             } else {
    //                 NotificationManager.error(res.data.message)
    //                 self.setState({
    //                     loading: false,
    //                 });
    //             }
    //         })
    //         .catch((error) => console.log(error));

    // }
    handleEditModel = (e) => {

        //
        this.setState({
            escalationUserId: e?.escalationUserID,
            EsclatedModel: true,
            isEditable: true,
            emailName: e?.escalationEmailID,
            responseSLA: e?.responseSLA,
            resolutionSLA: e?.resoluationSLA,
            responseSlaType: e?.responseSLAIsMins ? "Min" : e?.responseSLAIsDay ? "Day" : e?.responseSLAIsHour ? "Hrs" : this.state.responseSlaType,
            resolutionSlaType: e?.resolutionSLAIsDay ? "Day" : e?.resolutionSLAIsMins ? "Min" : e?.resolutionSLAIsHour ? "Hrs" : this.state.resolutionSlaType,
            //isValidEmail: false,
        })

    }

    render() {
        const datalist = this.state.esclateddata;

        return (
            <React.Fragment>
                <div className="container-fluid setting-title setting-breadcrumb">
                    <Link to="settings" className="header-path">
                        Settings
                    </Link>
                    <span>&gt;</span>
                    <Link to="settings" className="header-path">
                        Ticketing
                    </Link>
                    <span>&gt;</span>
                    <Link className="active header-path">
                        EscalatedEmail
                    </Link>
                    <div className="reportbutton">
                        <div className="addplus">
                            <button
                                type="button"
                                className="addplusbtnReport"
                                onClick={this.EsclatedOpenModel.bind(this)}

                            >
                                + Add
                            </button>
                        </div>
                    </div>
                </div>
                <Modal
                    onClose={this.EsclatedCloseModel}
                    open={this.state.EsclatedModel}
                    modalId="BlockEmailModel"
                    overlayId="logout-ovrly"
                    closeOnOverlayClick={false}
                >
                    <div class="tab-content">
                        <div className="pop-upAddSearchPD">
                            <div className="row">
                                <div className="setting-tabs alert-tabs">

                                    <label style={{ marginLeft: "227px", fontSize: "large" }}>
                                        {this.state.isEditable ? "Update Esclation Creation" : "Esclation Creation"}
                                    </label>

                                    <img
                                        src={CancelImg}
                                        alt="CancelImg"
                                        className="block-cancelImg"
                                        onClick={this.EsclatedCloseModel}
                                    />
                                </div>
                                <div className="col-md-12 mt-3 d-flex gap-2 align-items-center">
                                    <label>Email Name</label>
                                    <Popover
                                        content={
                                            <div className="settings-created-by-popover">
                                                <p className="title">
                                                    You can add comma seprated multiple <br /> email id's
                                                </p>
                                            </div>
                                        }
                                        placement="bottom"
                                    >
                                        <img
                                            className="info-icon-cp"
                                            src={BlackInfoIcon}
                                            alt="info-icon"

                                        />
                                    </Popover>


                                </div>

                                <div className="col-md-12 ticketreport">
                                    {/* <label>Department Name</label> */}
                                    <input
                                        className="no-bg"
                                        type="text"
                                        name="emailName"
                                        onChange={(e) => this.handelEmail(e)}
                                        value={this.state.emailName}
                                    />
                                    {this.state.isValidEmail ? null : <p className="email_error">Please enter a valid email address.</p>}


                                </div>
                                <div className="col-md-12 mt-4 ticketreport ">
                                    <label>Priority</label>
                                    <input
                                        className="no-bg not_allowed "
                                        type="text"
                                        value="Escalated"
                                        name="Responsibility"
                                        readOnly
                                    />

                                </div>

                                {/* <div className="col-md-12 mt-3">
                                    <label>Users</label>
                                    <Select

                                        options={this.state.UserList}
                                        placeholder={Select}
                                        name="Unit"
                                        closeMenuOnSelect={false}
                                        onChange={this.handleSelectChange.bind(this, "Unit")}
                                        isMulti
                                    />

                                </div> */}
                                <div className="row w-100">
                                    <div className="col-md">
                                        <div className="row">
                                            <div className="col-md-6 ">
                                                <div className="resolution-div ">
                                                    <h3>Response SLA</h3>
                                                    <div className="inpt_select">
                                                        <input type="text"
                                                            onChange={(e) => { this.handleResponseSLA(e) }}
                                                            value={this.state.responseSLA}
                                                            min={0}

                                                        />
                                                        <select
                                                            defaultValue={this.state.responseSlaType}

                                                            // defaultValue={this.state.selectedResType}
                                                            onChange={this.handleResponseType}
                                                        >
                                                            <option >
                                                                {/* { this.state.isEditable ?this.state.selectedMDH  :" Select Duration"} */}
                                                                Select Duration
                                                            </option>
                                                            {
                                                                this.state.optionMDH.map((e, i) => {
                                                                    return (
                                                                        <option key={i} value={e}>{e}</option>

                                                                    )
                                                                })

                                                            }


                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="resolution-div" style={{ float: "right" }}>
                                                    <h3>Resolution SLA</h3>
                                                    <div className="inpt_select">
                                                        <input type="text"
                                                            onChange={(e) => { this.handleResolutionSLA(e) }}
                                                            value={this.state.resolutionSLA}
                                                            min={0}
                                                        />
                                                        <select
                                                            defaultValue={this.state.resolutionSlaType}
                                                            onChange={(e) => { this.handleResolutionType(e) }}
                                                        >
                                                            <option>
                                                                Select Duration


                                                            </option>
                                                            {
                                                                this.state.optionMDH.map((e, i) => {
                                                                    return (
                                                                        <option key={i} value={e}>{e}</option>

                                                                    )
                                                                })
                                                            }

                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>

                                <div className="btn-block">

                                    <button onClick={this.handleCreateEsclated} className="butn">{this.state.isEditable ? "Update" : "Save"}
                                    </button>

                                </div>

                            </div>


                        </div>
                    </div>

                </Modal>
                <div className="container-fluid">
                    <div className="store-settings-cntr settingtable">
                        <div className="row">
                            <div className="col-md">
                                <div className="table-cntr table-height alertsTable settings-align">
                                    <ReactTable
                                        data={datalist}
                                        columns={[
                                            {
                                                Header: (
                                                    <span>
                                                        Escalated Email Id
                                                    </span>
                                                ),
                                                sortable: false,
                                                accessor: "escalationEmailID",
                                                Cell: (row) => {
                                                    var email = row.original
                                                    var splitemail = email.escalationEmailID.split(",")
                                                    return (
                                                        <div>
                                                            <span>
                                                                {splitemail[0]}
                                                            </span>
                                                            <Popover
                                                                content={
                                                                    <div className="settings-created-by-popover">
                                                                        <p className="title">
                                                                            {email.escalationEmailID}
                                                                        </p>
                                                                    </div>
                                                                }
                                                                placement="bottom"
                                                            >
                                                                <img
                                                                    className="info-icon-cp"
                                                                    src={BlackInfoIcon}
                                                                    alt="info-icon"

                                                                />
                                                            </Popover>
                                                        </div>

                                                    )
                                                }


                                            },
                                            {
                                                Header: (
                                                    <span>
                                                        Priority
                                                    </span>
                                                ),
                                                sortable: false,
                                                accessor: "priorityName",


                                            },
                                            {
                                                Header: (
                                                    <span>
                                                        Response SLA

                                                    </span>
                                                ),
                                                sortable: false,
                                                accessor: "responseSLA",
                                                Cell: (row) => {

                                                    return (

                                                        <>
                                                            <label>{row.original.responseSLA}</label>&nbsp;

                                                            {
                                                                row.original.responseSLAIsMins && <span>min</span>

                                                            }
                                                            {
                                                                row.original.responseSLAIsHour && <span>Hour</span>

                                                            }
                                                            {
                                                                row.original.responseSLAIsDay && <span>Day</span>

                                                            }

                                                        </>
                                                    )
                                                }

                                            },
                                            {
                                                Header: (
                                                    <span>
                                                        Resolution SLA
                                                    </span>
                                                ),
                                                sortable: false,
                                                accessor: "resoluationSLA",
                                                Cell: (row) => {

                                                    return (

                                                        <>
                                                            <label>{row.original.resoluationSLA}</label>&nbsp;

                                                            {
                                                                row.original.resolutionSLAIsMins && <span>min</span>

                                                            }
                                                            {
                                                                row.original.resolutionSLAIsHour && <span>Hour</span>

                                                            }
                                                            {
                                                                row.original.resolutionSLAIsDay && <span>Day</span>

                                                            }

                                                        </>
                                                    )
                                                }


                                            },
                                            {
                                                Header: (
                                                    <span>
                                                        Action
                                                    </span>
                                                ),
                                                sortable: false,
                                                accessor: "escalationUserId",
                                                Cell: (row) => {
                                                    return (
                                                        <div>

                                                            {/* <Popover
                                                                content={
                                                                    <div
                                                                        className="samdel d-flex general-popover popover-body"
                                                                        id={row.original.teamID}
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
                                                                                // onClick={() =>
                                                                                //     this.hide(
                                                                                //         this,
                                                                                //         "samdel" + row.original.teamID
                                                                                //     )
                                                                                // }
                                                                                >
                                                                                    CANCEL
                                                                                </a>
                                                                                <button
                                                                                    className="butn"
                                                                                    onClick={(e) => this.handleDeleteEscalation(row.original.escalationUserID)}
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
                                                            </Popover> */}
                                                            <button
                                                                className="react-tabel-button editre"
                                                                id="p-edit-pop-2"
                                                                onClick={() => {
                                                                    this.handleEditModel(row.original)
                                                                }}
                                                            >
                                                                EDIT
                                                            </button>
                                                        </div>


                                                    )
                                                }
                                            }

                                        ]}
                                        resizable={false}
                                        defaultPageSize={10}
                                        showPagination={true}
                                        minRows={1}

                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>



            </React.Fragment>
        )
    }
}
export default EsclatedEmail;