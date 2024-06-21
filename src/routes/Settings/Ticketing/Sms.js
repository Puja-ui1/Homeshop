import React, { Component } from "react";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { authHeader } from "../../../helpers/authHeader";
import axios from "axios";
import config from "../../../helpers/config";
import { NotificationManager } from "react-notifications";
import BlackInfoIcon from "../../../assets/Images/Info-black.png";

// import Demo from "../Store/Hastag";

class SMS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            smsdata: [],
            vendorDrop: [],
            loading: false,
            tampletName: "",
            tampletID: "",
            venderID: "",
            description: "",
            concatDescription: "",
            placeholder: [],
            placetag: "",
            placeholderData: "",
            isEdit: false,
            nextStatus: "",
            nextStatusID: "",
            handelClickID: "",
            istampletName: true,
            istempId: true,
            isdescrip: true,
            isvendorId: true,
            vendorNameonly: "",
            forBrandID: "",
            BrandDataList: []

        }
    }
    componentDidMount() {
        this.handleGetBrandList();
        this.handleGetSMSData();
        this.handleGetVendorDropDown();
        this.handleGetPlaceHolderDropDown();

    }
    handelGetById = (id) => {

        let self = this;
        self.setState({
            handelClickID: id
        })
        axios({
            method: "post",
            // url: config.apiUrl + "/Template/GetTemplateWithDetailsById",
            url: config.apiUrl + "/Template/GetTemplateDetailWithBrandById",
            headers: authHeader(),
            params: {
                templateId: id
            }
        })
            .then(function (res) {
                if (res.data.statusCode === 200) {
                    self.setState({
                        tampletName: res.data.responseData.templateName,
                        tampletID: res.data.responseData.templateId,
                        venderID: res.data.responseData.vendorId,
                        description: res.data.responseData.templateDescription,
                        nextStatus: res.data.responseData.nextStatus[0].status,
                        nextStatusID: res.data.responseData.nextStatus[0].statusId,
                        isEdit: true,
                        istampletName: true,
                        istempId: true,
                        isdescrip: true,
                        vendorNameonly: res.data.responseData.vendorName



                    })
                }
            })

    }
    handleGetSMSData = () => {
        //debugger
        let self = this;
        axios({
            method: "post",
            // url: config.apiUrl + "/Template/GetTemplatesWithDetails",
            url: config.apiUrl + "/Template/GetTemplatesDetailWithBrand",
            headers: authHeader(),
        })
            .then(function (res) {

                // console.log("datasms",data);
                if (res.data.statusCode === 200) {
                    // debugger;
                    // sms = data
                    self.setState({
                        smsdata: res.data.responseData
                    })
                } else {
                    self.setState({
                        smsData: [],
                        loading: false,
                    });
                }
            })
            .catch((error) => console.log(error));

    };
    handleGetVendorDropDown = () => {
        let self = this;
        axios({
            method: "get",
            url: config.apiUrl + "/Template/FetchAllCommunicationDetails",
            headers: authHeader(),
        })
            .then(function (res) {

                // console.log("datasms",data);
                if (res.data.statusCode === 200) {


                    self.setState({
                        vendorDrop: res.data.responseData.list,
                        //venderID: res.data.responseData.list[0].username,
                        // vendorNameonly:res.data.responseData.vendor
                    })
                } else {
                    self.setState({
                        vendorDrop: [],
                        loading: false,
                    });
                }
            })
            .catch((error) => console.log(error));


    }
    handleGetPlaceHolderDropDown = () => {
        let self = this;
        axios({
            method: "post",
            url: config.apiUrl + "/Template/GetSMSVariableAlertList",
            headers: authHeader(),
        })
            .then(function (res) {
                if (res.data.statusCode === 200) {

                    self.setState({
                        placeholder: res.data.responseData,

                    })
                } else {
                    self.setState({
                        placeholder: [],
                        loading: false,
                    });
                }
            })
            .catch((error) => console.log(error));


    }
    handelTampletName = (e) => {
        // const nameRegex = new RegExp("^[A-Za-z\- ]+$");
        // const istempName = nameRegex.test(e.target.value);
        this.setState({
            tampletName: e.target.value,
            // istampletName:istempName
        })
        if (e.target.value.length > 0) {
            this.setState({
                istampletName: true

            })

        }
        else {
            this.setState({
                istampletName: false

            })

        }
    }
    handelTampletId = (e) => {
        // const nameRegex = new RegExp("^[A-Za-z\- ]+$");
        // const istempId = nameRegex.test(e.target.value);
        this.setState({
            tampletID: e.target.value,
            // istempId:istempId
        })
        if (e.target.value.length > 0) {
            this.setState({
                istempId: true

            })

        }
        else {
            this.setState({
                istempId: false

            })

        }
    }
    handelVenderID = (e) => {
        // debugger;
        let self = this
        let data = e.target.value
        let vendorId = data.split(',')
        self.setState({
            venderID: vendorId[1],
            // vendorNameonly: vendorId[0]
        })

        if (data.length > 0) {
            self.setState({
                isvendorId: true
            })
        }
        else {
            self.setState({
                isvendorId: false
            })

        }
    }
    handlePlaceHolder = (e) => {
        //debugger
        let placedata = e.target.value
        let placetagget = placedata.split(",")
        this.setState({
            placetag: placetagget[1],
            placeholderData: placetagget[1],
            description: this.state.description + placetagget[1]
        })
    }
    handelDescription = (e) => {
        this.setState({
            description: e.target.value,
        })
        if (e.target.value.length > 0) {
            this.setState({
                isdescrip: true

            })

        }
        else {
            this.setState({
                isdescrip: false

            })

        }

    }
    handleUpdateSMS = () => {
        // debugger
        let self = this;
        axios({
            method: "post",
            // url: config.apiUrl + "/Template/SMSUpdateTemplate",
            url: config.apiUrl + "/Template/SMSUpdateTemplateWithBrand",
            headers: authHeader(),
            data: {
                "Id": this.state.handelClickID,
                "StatusId": this.state.nextStatusID,
                "TemplateId": this.state.tampletID,
                "brandId": this.state.forBrandID === "" ? 0 : parseInt(this.state.forBrandID),
            }

        })
            .then(function (res) {
                if (res.data.statusCode === 200) {
                    NotificationManager.success("Record Updated Successfully.");
                    self.setState({
                        tampletID: "",
                        tampletName: "",
                        description: "",
                        venderID: "",
                        isEdit: false,
                        description: ""
                    });
                    self.handleGetSMSData()
                }

            })

    }

    handleCreateSms = () => {
        if (this.state.istampletName && this.state.tampletName.length > 0 && this.state.istempId && this.state.tampletID.length > 0 && this.state.isdescrip && this.state.description.length > 0 && this.state.isvendorId && this.state.venderID.length > 0  ) {
            let self = this;
            axios({
                method: "post",
                url: config.apiUrl + "/Template/SMSCreateTemplate",
                headers: authHeader(),
                data:
                {
                    "TemplateName": this.state.tampletName,
                    "TemplateType": "sms",
                    "TemplateDescription": this.state.description,
                    "ContentType": "standard",
                    "TemplateId": this.state.tampletID,
                    "VendorId": this.state.venderID,
                    "BrandId": this.state.forBrandID
                },
            })
                .then(function (res) {

                    if (res.data.statusCode === 200) {
                        //debugger;
                        // sms = data
                        NotificationManager.success("SMS Template Created Successfully")
                        self.setState({
                            tampletID: "",
                            tampletName: "",
                            description: "",
                            venderID: "",
                            placeholderData: ""


                        });
                        self.handleGetSMSData()
                    } else {
                        self.setState({

                            loading: false,
                        });
                    }
                })
                .catch((error) => console.log(error));

        }
        else {
            this.setState({
                istampletName: false,
                istempId: false,
                isdescrip: false
            })
        }


    }
    handleGetBrandList() {
        let self = this;
        axios({
            method: "post",
            // url: config.apiUrl + "/Brand/GetBrandList",
            url: config.apiUrl + "/Brand/GetUserWiseBrandList",
            headers: authHeader(),
            params: {
                allbrand: true
            }
        })
            .then(function (res) {
                let status = res.data.message;
                let data = res.data.responseData;
                if (status === "Success") {
                    // self.handleGetAgentList();
                    self.setState({ BrandDataList: data, });

                } else {
                    self.setState({ BrandDataList: [] });

                }
            })
            .catch((data) => {
                console.log(data);

            });
    }
    handelBrandID = (e) => {
        let self = this
        console.log("e", e)
        let name = e.target.name
        let val = e.target.value
        console.log("name", name)
        console.log("val", val)
        if (val === "Select Brand ID") {
            self.setState({
                forBrandID: "",
            })
        }
        else {
            self.setState({
                forBrandID: val,
            })
        }
    }

    render() {

        const { smsdata, isEdit } = this.state
        //console.log(sms, 'smsdata')
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
                        Sms
                    </Link>
                </div>
                <div className="container-fluid">
                    <div className="store-settings-cntr settingtable">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="table-cntr table-height alertsTable settings-align">
                                    <ReactTable
                                        data={smsdata}
                                        columns={
                                            [
                                                {
                                                    Header: (
                                                        <span>
                                                            Template Type
                                                            <FontAwesomeIcon icon={faCaretDown} />
                                                        </span>
                                                    ),
                                                    sortable: false,
                                                    accessor: "templateType",

                                                },
                                                {
                                                    Header: (
                                                        <span>
                                                            Template Name
                                                            <FontAwesomeIcon icon={faCaretDown} />
                                                        </span>
                                                    ),
                                                    sortable: false,
                                                    accessor: "templateName",

                                                },
                                                {
                                                    Header: (
                                                        <span>
                                                            Brand
                                                            <FontAwesomeIcon icon={faCaretDown} />
                                                        </span>
                                                    ),
                                                    sortable: false,
                                                    accessor: "brandName",

                                                },
                                                {
                                                    Header: (
                                                        <span>
                                                            Status
                                                            <FontAwesomeIcon icon={faCaretDown} />
                                                        </span>
                                                    ),
                                                    sortable: false,
                                                    accessor: "currentStatus.status",

                                                },
                                                {
                                                    Header: (
                                                        <span>
                                                            Action
                                                            <FontAwesomeIcon icon={faCaretDown} />
                                                        </span>
                                                    ),
                                                    Cell: (row) => {
                                                        var ids = row.original.id;
                                                        return (
                                                            <button onClick={() => this.handelGetById(ids)} className="react-tabel-button">
                                                                <label className="Table-action-edit-button-text">
                                                                    Edit
                                                                </label>
                                                            </button>
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
                            <div className="col-md-4">
                                <div className="right-sect-div">
                                    <h3>
                                        {isEdit ? "Update SMS" : "Add SMS"}
                                        {/* {isEdit ?
                                        <img
                                            className="info-icon-cp"
                                            src={BlackInfoIcon}
                                            alt="info-icon"

                                        />:null} */}


                                    </h3>
                                    <div className="w-100 mt-2">
                                        <label>
                                            Brand ID
                                        </label>

                                        <select
                                            className="add-select-category"
                                            disabled={isEdit}
                                            name="brandID"
                                            // value={this.state.venderID}
                                            onChange={(e) => this.handelBrandID(e)}
                                        >
                                            <option value={isEdit ? this.state.vendorDrop.vendor : "Select Brand ID"}>
                                                {isEdit ? this.state.vendorNameonly : "Select Brand ID"}


                                            </option>
                                            {this.state.BrandDataList !== null && this.state.BrandDataList.map((ele, ind) => {
                                                return (
                                                    <option key={ind} value={ele.brandID}>{ele.brandName}</option>
                                                );
                                            })}

                                        </select>
                                        {/* {this.state.forBrandID === "Select Brand ID" ? null : <p className="email_error">Please Select Brand.</p>} */}
                                    </div>
                                    <div>
                                        <div>
                                            <label>
                                                Template Name
                                            </label>
                                            <input readOnly={isEdit} value={this.state.tampletName} onChange={(e) => { this.handelTampletName(e) }} type="text" placeholder="Template name" />
                                            {this.state.istampletName ? null : <p className="email_error">Please enter templateName.</p>}
                                        </div>

                                        <div>
                                            <label>
                                                Template ID
                                            </label>

                                            <input readOnly={isEdit} value={this.state.tampletID} onChange={(e) => { this.handelTampletId(e) }} type="text" placeholder="Template Id" />

                                            {this.state.istempId ? null : <p className="email_error">Please enter templateId.</p>}
                                        </div>
                                        <div className="w-100 mt-2">
                                            <label>
                                                Vendor ID
                                            </label>

                                            <select
                                                className="add-select-category"
                                                disabled={isEdit}
                                                // value={this.state.venderID}
                                                onChange={(e) => this.handelVenderID(e)}
                                            >
                                                <option value={isEdit ? this.state.vendorDrop.vendor : "Select  Vendor ID"}>
                                                    {isEdit ? this.state.vendorNameonly : "Select Vendor ID"}


                                                </option>
                                                {this.state.vendorDrop !== null && this.state.vendorDrop.map((ele, ind) => {
                                                    return (
                                                        <option key={ind} value={ele.vendor + "," + ele.id}>{ele.vendor}</option>
                                                    );
                                                })}

                                            </select>
                                            {this.state.isvendorId ? null : <p className="email_error">Please enter vendorId.</p>}
                                        </div>
                                        <div className="w-100 mt-2">
                                            <label>
                                                Placeholder
                                            </label>
                                            <select
                                                disabled={isEdit}
                                                className="add-select-category"
                                                onChange={(e) => this.handlePlaceHolder(e)}
                                            >
                                                <option value={this.state.placeholderData}>
                                                    Select  Placeholder

                                                </option>
                                                {this.state.placeholder !== null && this.state.placeholder.map((ele, ind) => {
                                                    return (
                                                        <option key={ind} value={ele.variabledDscription + "," + ele.variableValue}>{ele.variabledDscription}</option>
                                                    );
                                                })}
                                            </select>
                                        </div>
                                        {isEdit && <div>
                                            <label>
                                                Status
                                            </label>

                                            <select className="add-select-category" >

                                                <option>
                                                    {this.state.nextStatus}
                                                </option>

                                            </select>
                                            {
                                                isEdit && (<p style={{ color: "green", marginBottom: "0px" }}>
                                                    Next Status
                                                </p>)
                                            }
                                        </div>}

                                        <div className="mt-2 div-cntr">
                                            <label>Description</label>
                                            <textarea readOnly={isEdit} value={this.state.description} onChange={(e) => { this.handelDescription(e) }} className="w-100" rows={7}>
                                            </textarea>
                                            {this.state.isdescrip ? null : <p className="email_error">Please enter Description.</p>}

                                        </div>
                                        {isEdit ? <button onClick={this.handleUpdateSMS} className="butn"> Update </button> :
                                            <button onClick={this.handleCreateSms} className="butn"> Save </button>}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default SMS;