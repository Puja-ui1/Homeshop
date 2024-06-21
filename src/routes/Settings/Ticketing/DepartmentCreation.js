import React, { Component } from "react";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import Modal from "react-responsive-modal";
import Select from "react-select";
import CancelImg from "../../../assets/Images/Circle-cancel.png";
import RedDeleteIcon from "../../../assets/Images/red-delete-icon.png";
import DelBigIcon from "../../../assets/Images/del-big.png";
import BlackInfoIcon from "../../../assets/Images/Info-black.png";
import '../../../assets/css/settings.css'
import { authHeader } from "../../../helpers/authHeader";
import axios from "axios";
import config from "../../../helpers/config";
import { NotificationManager } from "react-notifications";
import { Popover } from "antd";


//let regexEmail = "^([a-zA-Z0-9]*[+._-]*[a-zA-Z0-9]+@[a-zA-Z]+.{3}[a-zA-z.]*[a-zA-z]{2})+$";
class DepartmentCreation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            departmentData: [],
            DepartmentModel: false,
            emailID: "",
            member: "",
            departmentame: "",
            UserList: [],
            selectedUser: "",
            editSelectedOption: [],
            priorityId: 3,
            isEditable: false,
            editId: "",
            isValidEmail: true,
            isValidName: true,
            isdisable: true,
            isUser: true,
            selectedlabel: []
        }
    }

    componentDidMount = async () => {
        await this.handleGetUserData()
        this.handleGetDepartmentData();
    }
    DepartmentOpenModel = () => {
        this.setState({
            DepartmentModel: true,
            emailID: "",
            member: "",
            departmentame: "",
            editSelectedOption: [],
            isEditable: false,
            priorityId: 3,
            isUser: true,
        })
    }

    DepartmentCloseModel = () => {
        this.setState({
            DepartmentModel: false

        })
    }
    handleGetDepartmentData = () => {
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
            .then(function (res) {
                if (res.data.statusCode === 200) {
                    //debugger

                    // Define the first JSON data containing labels
                    //const labelsData = self.state.UserList;

                    // Define the second JSON data to be updated
                    //const teamsData = res.data.responseData;
                    // Create a mapping of value to label
                    //const valueToLabelMap = {};
                    // labelsData.forEach(item => {
                    //     //debugger
                    //     valueToLabelMap[item.value] = item.label;
                    // });
                    //console.log("valueToLabelMap===",valueToLabelMap);

                    // Update the members field in the teamsData
                    // teamsData.forEach(team => {
                    //     if (team.members) {
                    //         const memberValues = team.members.split(',').map(Number);
                    //         const memberLabels = memberValues.map(value => valueToLabelMap[value]);
                    //         team.members = memberLabels.join(',');
                    //     }
                    // });

                    //console.log("teamsData===",teamsData);

                    self.setState({
                        departmentData: res.data.responseData,
                        loading: false,
                    });
                } else {
                    self.setState({
                        departmentData: [],
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
                    //console.log("userlist",arr);

                } else {
                    self.setState({
                        UserList: [],
                        loading: false,
                    });
                }
            })
            .catch((error) => console.log(error));
    };
    handleCreateDepartment = () => {
        debugger
        if (this.state.isValidEmail && this.state.emailID.length > 0 && this.state.isValidName && this.state.departmentame.length > 0 && this.state.selectedUser.length > 0 && this.state.priorityId > 0) {
            //console.log("test regex");
            let self = this;
            axios({
                method: "post",
                url: config.apiUrl + "/Team/CreateTeamDetails",
                headers: authHeader(),
                data: {
                    "teamID": 0,
                    "tenantID": 0,
                    "teamName": this.state.departmentame,
                    "email": this.state.emailID,
                    "members": this.state.selectedUser.toString(),
                    "createdBy": 0,
                    "createdByName": "",
                    "createdDate": "",
                    "isActive": true,
                    "priorityId": parseInt(this.state.priorityId)
                }
            })
                .then(function (res) {
                    if (res.data.statusCode === 200) {
                        NotificationManager.success("Record Created successfully.");
                        self.setState({
                            emailID: "",
                            member: "",
                            departmentame: "",
                            DepartmentModel: false,
                            priorityId: self.state.priorityId
                        });
                        self.handleGetDepartmentData()
                    } else {
                        NotificationManager.error(res.data.message);
                        self.setState({
                            loading: false,
                        });
                    }
                })
                .catch((error) => console.log(error));
        }
        else {
            this.setState({
                isValidEmail: false,
                isValidName: false,
                isUser: false
            })

        }

    }
    handleDeleteDepartment = (e) => {
        let self = this;
        axios({
            method: "post",
            url: config.apiUrl + "/Team/DeleteTeamDetails",
            headers: authHeader(),
            params: {
                TeamID: e
            }
        })
            .then(function (res) {

                //debugger;
                if (res.data.statusCode === 200) {
                    NotificationManager.success("Record Deleted successfully.");
                    self.handleGetDepartmentData()
                } else {
                    NotificationManager.success("Record Not Deleted successfully.");
                    self.setState({
                        loading: false,
                    });
                }
            })
            .catch((error) => console.log(error));
    }
    handleSelectChange = (a, b) => {
        // console.log("label",b)
        //debugger
        const selectedVal = b === null ? "" : b?.map(item => item.value).join(", ");
        //const selectedlabel = b.map(itemlable => itemlable.label)
        //console.log("slectedlabel",selectedlabel),
        if (selectedVal.length > 0) {
            this.setState({
                isUser: true,
            })
        }
        else {
            this.setState({
                isUser: false,
            })
        }
        this.setState({
            editSelectedOption: b === null ? [] : b,
            selectedUser: selectedVal,
            //selectedlabel: b,


        })


    }
    // handelEmail = (e) => {
    //    const value = e.target.value;
    //     const emailRegex = new RegExp("^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$");
    //    const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:,[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})?$")
    //     const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,},[^.]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
    //     const isValidEmail2 = emailRegex.test(value);
    //     this.setState({
    //         emailID: e.target.value,
    //         isValidEmail: isValidEmail2
    //     })
    // }

    isEmailValid = (emailText) => {
        const regexEmail = new RegExp("^([A-Za-z0-9_%+][a-zA-Z0-9._%+_-]+@[a-zA-Z]+.{3}[a-zA-z.]+[a-zA-z]{2})(?:,([a-zA-Z0-9+_-]+@[a-zA-Z]+.{3}[a-zA-z.]+[a-zA-z]{2}))*$")
        // const regexEmail=new RegExp("^([a-zA-Z0-9+_-]+@[a-zA-Z]+[.][a-zA-Z.]+[a-zA-Z]{2})(?:,([a-zA-Z0-9+_-]+@[a-zA-Z]+[.][a-zA-Z.]+[a-zA-Z]{2}))*$ ") 

        const emailsList = emailText.split(",").map(email => email.trim());
        return emailsList.every(email => regexEmail.test(email));
    };
    handelEmail = (e) => {
        const emailText = e.target.value;
        const isValid = this.isEmailValid(emailText);
        this.setState({
            emailID: emailText,
            isValidEmail: isValid
        });
    };

    handelDepart = (e) => {
        const value = e.target.value;
        const nameRegex = new RegExp("^[A-Za-z\- ]+$");
        const isValidName = nameRegex.test(value);
        this.setState({
            departmentame: e.target.value,
            isValidName: isValidName
        })
    }
    handlePriorityID = (e) => {
        debugger
        const valprId = parseInt(e.target.value)
        const numRegex = new RegExp("^[1-3]$")
        const prioId = numRegex.test(valprId)
        if (prioId || e.target.value === "") {
            this.setState({
                priorityId: e.target.value === "" ? e.target.value : valprId
            });
        }
        else {
            this.setState({
                priorityId: 3
            })
        }
    }

    handleEdit = (e) => {
        let arr = [];
        let editlist = e?.members.split(",");
        let tempList = this.state.UserList;
        for (let j = 0; j < editlist.length; j++) {
            for (let i = 0; i < tempList.length; i++) {
                if (parseInt(editlist[j]) === tempList[i]?.value)
                    arr.push({ value: tempList[i]?.value, label: tempList[i]?.label })
            }
        }
        this.setState({
            isEditable: true,
            DepartmentModel: true,
            editId: e?.teamID,
            emailID: e?.email,
            priorityId: e?.priorityId,
            departmentame: e?.teamName,
            selectedUser: e?.members,
            editSelectedOption: arr,
            isUser: true,
            isValidEmail: true,
            isValidName: true
        })
    }
    handleUpdateDepartment = () => {
        if (this.state.isValidEmail && this.state.emailID.length > 0 && this.state.isValidName && this.state.departmentame.length > 0 && this.state.selectedUser.length > 0 && this.state.priorityId > 0) {
            let self = this;
            axios({
                method: "post",
                url: config.apiUrl + "/Team/UpdateTeamDetails",
                headers: authHeader(),
                data: {
                    "teamID": this.state.editId,
                    "teamName": this.state.departmentame,
                    "email": this.state.emailID,
                    "members": this.state.selectedUser.toString(),
                    "priorityId": this.state.priorityId
                }
            })
                .then(function (res) {
                    if (res.data.statusCode === 200) {
                        NotificationManager.success("Record Updated Successfully")
                        self.setState({
                            departmentame: "",
                            emailID: "",
                            selectedUser: "",
                            DepartmentModel: false,

                        });
                        self.handleGetDepartmentData()
                    }
                    else {
                        NotificationManager.error(res.data.message)

                    }

                })
                .catch((error) => console.log(error));


        }
        else {
            this.setState({
                isValidEmail: false,
                isValidName: false,
                isUser: false
            })

        }
    }
    // handleTeamValidation() {
    //     let departmentError = {};
    //     let isValid = true;
    //     if (!this.state.emailID) {
    //         isValid = false;
    //         departmentError["EmailID"] = "Please enter Email name.";


    //     }
    //     if (!this.state.departmentame) {
    //         isValid = false;
    //         departmentError["Department"] = "Please enter Department name.";
    //     }
    //     if (!this.state.priorityId) {
    //         isValid = false;

    //     }

    //     this.setState({
    //         departmentError,
    //     });
    //     return isValid;
    // }

    // handleSubmitData() {
    //     if (this.handleTeamValidation()) {
    //         this.setState({
    //             isdisable: false
    //         })
    //         this.handleCreateDepartment()
    //     }
    // }
    render() {
        //console.log("isValidEmail===", this.state.isValidEmail);
        let dataDepart = this.state.departmentData;
        //console.log("selectedUser", this.state.selectedUser.toString(),);
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
                        DepartmentCreation
                    </Link>
                    <div className="reportbutton">
                        <div className="addplus">
                            <button
                                type="button"
                                className="addplusbtnReport"
                                onClick={this.DepartmentOpenModel.bind(this)}

                            >
                                + Add
                            </button>
                        </div>
                    </div>
                </div>
                <Modal
                    onClose={this.DepartmentCloseModel}
                    closeOnOverlayClick={false}
                    open={this.state.DepartmentModel}
                    modalId="BlockEmailModel"
                    overlayId="logout-ovrly"
                >
                    <div className="setting-tabs alert-tabs">
                        <label style={{ marginLeft: "227px", fontSize: "large" }}>

                            {this.state.isEditable ? "Update Department Creation" : "Department Creation"}
                        </label>
                        <img
                            src={CancelImg}
                            alt="CancelImg"
                            className="block-cancelImg"
                            onClick={this.DepartmentCloseModel}
                        />
                    </div>
                    <div className="tab-content">
                        <div className="pop-upAddSearchPD">
                            <div className="row">
                                <div className="col-md-12 mt-3 d-flex gap-2 align-items-center">
                                    <label>Email Id</label>
                                    <Popover
                                        content={
                                            <div className="settings-created-by-popover">
                                                <p className="title">
                                                    You can add multiple email IDs separated by commas.
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

                                    <input
                                        className="no-bg"
                                        type="text"
                                        name="TeamName"
                                        onChange={(e) => { this.handelEmail(e) }}
                                        value={this.state.emailID}
                                        placeholder="Enter an email id"

                                    />
                                    {this.state.isValidEmail ? null : <p className="email_error">Please enter a valid email address.</p>}

                                </div>
                                <div className="col-md-12 mt-3 d-flex justify-content-between">
                                    <label>Department Name</label>
                                    {/* <button
                                        type="button"
                                        className="butn add-cust-butn"
                                    >
                                        + Create
                                    </button> */}


                                </div>
                                <div className="col-md-12 ticketreport">

                                    <input
                                        className="no-bg"
                                        type="text"
                                        name="departmentName"
                                        onChange={(e) => this.handelDepart(e)}
                                        value={this.state.departmentame}
                                        required

                                    />
                                    {this.state.isValidName ? null : <p className="email_error">Please enter a valid name.</p>}


                                </div>
                                <div className="col-md-12 mt-3">
                                    <label>Users</label>
                                    <Select
                                        options={this.state.UserList}
                                        placeholder={Select}
                                        name="Unit"
                                        closeMenuOnSelect={false}
                                        onChange={this.handleSelectChange.bind(this, "Unit")}
                                        value={this.state.editSelectedOption}
                                        isMulti
                                    //max={3}
                                    //className="basic-multi-select"
                                    />
                                    {/* {this.state.isUser  ?<p className="email_error">Please select at least one User.</p> : null } */}
                                    {this.state.isUser ? null : <p className="email_error">Please select User.</p>}

                                </div>
                                <div className="col-md-12 mt-3">
                                    <label>Priority</label>
                                    <div className="department-select">
                                        <input
                                            type="text"
                                            className="no-bg"

                                            onChange={(e) => {
                                                this.handlePriorityID(e)
                                            }}
                                            value={this.state.priorityId}
                                        />
                                        <Popover
                                            content={
                                                <span>Priority levels are available as 1, 2, and 3.<br /> By default, 3 is the lowest priority, even though 1 is the highest.</span>
                                            }
                                            placement="top"
                                        >
                                            <img
                                                className="info-icon-cp"
                                                src={BlackInfoIcon}
                                                alt="info-icon"

                                            />
                                        </Popover>
                                    </div>
                                </div>
                            </div>

                            <div className="btn-block">
                                {this.state.isEditable ? <button
                                    style={{ marginLeft: "10px" }}
                                    type="button"
                                    className="butn add-cust-butn"
                                    onClick={this.handleUpdateDepartment}
                                >
                                    Update
                                </button> :
                                    <button
                                        style={{ marginLeft: "10px" }}
                                        type="button"
                                        className="butn add-cust-butn "
                                        onClick={this.handleCreateDepartment}

                                    >
                                        Save
                                    </button>
                                }
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
                                        data={dataDepart}
                                        columns={[
                                            {
                                                Header: (
                                                    <span >
                                                        Department Name

                                                    </span>
                                                ),
                                                sortable: false,
                                                accessor: "teamName",
                                            },
                                            {
                                                Header: (
                                                    <span >
                                                        Users

                                                    </span>
                                                ),
                                                sortable: false,
                                                accessor: "departmentUsers",
                                                Cell: (row) => {
                                                    var user = row.original
                                                    var splitDepartment = user.departmentUsers.split(",")
                                                    //console.log("split",splitDepartment)
                                                    return (
                                                        <div className="">
                                                            <span>
                                                                {splitDepartment[0]}
                                                            </span>
                                                            <Popover
                                                                content={
                                                                    <div className="settings-created-by-popover">
                                                                        <p className="title">
                                                                            {user.departmentUsers}
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
                                                // Cell=(row)=>{
                                                //     var membername= row.original.members
                                                //     return (
                                                //         <div className="report-action">


                                                //         </div>

                                                //     )

                                                // }
                                                // Cell: (row) => {
                                                //     // var ids = row.original["teamID"];
                                                //     var memberName = []
                                                //     for (let i = 0; i < row.original.departmentUsers.length; i++) {

                                                //     }



                                                //     return (
                                                //         <div>
                                                //             <span className="one-liner">
                                                //                 {row.original.departmentUsers}

                                                //                 <Popover
                                                //                     content={
                                                //                         <div className="settings-created-by-popover">
                                                //                             <div>
                                                //                                 <b>
                                                //                                     <p className="title">
                                                //                                         Created By :{" "}
                                                //                                         {row.original.departmentUsers}
                                                //                                     </p>
                                                //                                 </b>
                                                //                                 {/* <p className="sub-title">
                                                //                                     Created Date :{" "}
                                                //                                     {row.original.createdDate}
                                                //                                 </p> */}
                                                //                             </div>

                                                //                         </div>
                                                //                     }
                                                //                     placement="bottom"
                                                //                 >
                                                //                     <img
                                                //                         className="info-icon-cp"
                                                //                         src={BlackInfoIcon}
                                                //                         alt="info-icon"
                                                //                         id={row.original.teamID}
                                                //                     />
                                                //                 </Popover>
                                                //             </span>
                                                //         </div>
                                                //     );
                                                // }
                                            },

                                            {
                                                Header: (
                                                    <span >
                                                        Email ID

                                                    </span>
                                                ),
                                                sortable: false,
                                                accessor: "email",
                                                Cell: (row) => {
                                                    var email = row.original
                                                    var splitEmail = email.email.split(",")
                                                    return (
                                                        <div className="">
                                                            <span>
                                                                {splitEmail[0]}
                                                            </span>
                                                            <Popover
                                                                content={
                                                                    <div className="settings-created-by-popover">
                                                                        <p className="title">
                                                                            {email.email}
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
                                                        Created By
                                                    </span>
                                                ),
                                                sortable: false,
                                                accessor: "createdByName",

                                            },
                                            {
                                                Header: (
                                                    <span>
                                                        Priority ID
                                                    </span>
                                                ),
                                                sortable: false,
                                                accessor: "priorityId",

                                            },
                                            {
                                                Header: (
                                                    <span>
                                                        Action
                                                    </span>
                                                ),
                                                sortable: false,
                                                accessor: "createdByName",
                                                Cell: (row) => {
                                                    return (
                                                        <div className="report-action">
                                                            <div>
                                                                {row.original.teamID == 0 ? (
                                                                    ""
                                                                ) : (
                                                                    <Popover
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
                                                                                            onClick={() => this.handleDeleteDepartment(row.original.teamID)}
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
                                                                        onClick={() => this.handleEdit(row.original)}
                                                                    >
                                                                        EDIT
                                                                    </button>
                                                                )}
                                                            </div>
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
export default DepartmentCreation;