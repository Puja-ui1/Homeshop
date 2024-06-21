import React, { Component, Fragment } from "react";
import ArrowCircleImg from "./../assets/Images/arrow-circle-left.png";
import HeadphoneImg from "./../assets/Images/headphone.png";
import PasteImg from "./../assets/Images/past.png";
import SearchBlueImg from "./../assets/Images/search-blue.png";
import NotFoundImg from "./../assets/Images/notFound.png";
import Modal from "react-responsive-modal";
import { Radio } from "antd";
import DatePicker from "react-datepicker";
import axios from "axios";
import config from "./../helpers/config";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import SimpleReactValidator from "simple-react-validator";
import { NotificationManager } from "react-notifications";
import { authHeader } from "../helpers/authHeader";
import { CopyToClipboard } from "react-copy-to-clipboard";
import * as translationHI from "../translations/hindi";
import * as translationMA from "../translations/marathi";
import { Table } from "antd";

class AddSearchMyTicket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AddCustomer: false,
      customerName: "",
      customerPhoneNumber: "",
      customerEmailId: "",
      genderID: 1,
      dob: "",
      customerId: 0,
      altNumber: "",
      altEmailID: "",
      loading: false,
      SrchEmailPhone: "",
      message: "",
      SearchData: [],
      value: "",
      copied: false,
      searchCompulsion: "",
      translateLanguage: {},
      countryCode: "",
      mobNumLength: "",
      SrchStoreNameCode: "",
      SwitchBtnStatus: false,
      selectedStoreData: [],
      storeticketsrch: false,
      srchMobile:"",
      storeSelected:false,
      searchStoreCompulsion:"",
      storeCkecked:""
    };
    this.handleAddCustomerOpen = this.handleAddCustomerOpen.bind(this);
    this.handleAddCustomerClose = this.handleAddCustomerClose.bind(this);
    this.handleAddCustomerSave = this.handleAddCustomerSave.bind(this);
    this.handleSearchCustomer = this.handleSearchCustomer.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCopyToaster = this.handleCopyToaster.bind(this);
    this.validator = new SimpleReactValidator({
      messages: {
        size: "The :attribute must be :size digits.",
      },
    });
    this.handleOrderStoreTableOpen = this.handleOrderStoreTableOpen.bind(this);
    this.handleCheckStoreID = this.handleCheckStoreID.bind(this);
    this.handleOrderStoreTableClose = this.handleOrderStoreTableClose.bind(
      this
    );
    this.handleSearchStoreDetails = this.handleSearchStoreDetails.bind(this);
  }
  componentDidMount() {
    this.handleCRMRoleSrch();
    window.localStorage.setItem("isStoreAccess", false);
  }
  componentWillMount() {
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
    let agentData = JSON.parse(window.localStorage.getItem('AgentData'));
    if (agentData != null) {
      this.setState({
        countryCode: agentData.countryCode,
        mobNumLength: agentData.mobNumberLength
      })
    }
  }

  handleCopyToaster() {
    const TranslationContext = this.state.translateLanguage.default;

    setTimeout(() => {
      if (this.state.copied && this.state.copied) {
        NotificationManager.success(
          TranslationContext !== undefined
            ? TranslationContext.span.copied
            : "Copied."
        );
      }
    }, 100);
  }
  handleAddCustomerOpen() {
    this.setState({ AddCustomer: true });
    if (this.state.SrchEmailPhone !== " ") {
      if (isNaN(this.state.SrchEmailPhone)) {
        this.setState({
          customerEmailId: this.state.SrchEmailPhone,
        });
      } else {
        this.setState({
          customerPhoneNumber: this.state.SrchEmailPhone,
        });
      }
    }
  }
  handleAddCustomerClose() {
    this.setState({
      AddCustomer: false,
      customerName: "",
      customerPhoneNumber: "",
      customerEmailId: "",
      genderID: 1,
      dob: "",
      altNumber: "",
      altEmailID: "",
    });
    this.validator.hideMessages();
  }
  handleSearchCustomer(e) {
    const TranslationContext = this.state.translateLanguage.default;
    if(e != null){
      e.preventDefault();
    }
    if (this.state.SrchEmailPhone.length > 0) {
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/Customer/searchCustomer",
        headers: authHeader(),
        params: {
          SearchText: this.state.SrchEmailPhone.trim(),
        },
      })
        .then(function (res) {
          let SearchData = res.data.responseData[0];
          if (SearchData) {
            let GetCustId = SearchData.customerID;
            setTimeout(function () {
              self.props.history.push({
                pathname: "ticketsystem",
                state: self.state,
              });
            }, 100);
            self.setState({
              customerId: GetCustId,
            });
          } else {
            var filter = Number(self.state.SrchEmailPhone.trim());
            if (filter) {
              self.setState({
                customerPhoneNumber: self.state.SrchEmailPhone.trim(),
              });
            } else {
              self.setState({
                customerEmailId: self.state.SrchEmailPhone.trim(),
              });
            }
            self.setState({
              message: res.data.message,
            });
          }
        })
        .catch((data) => {
          self.setState({
            message: "Record Not Found",
          });
          console.log(data);
        });
    } else {
      this.setState({
        searchCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard.searchfieldiscompulsory
            : "Search field is compulsory.",
      });
    }
  }
  CheckValidCustomerEmailPhoneNo() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    if (this.validator.allValid()) {
      if (this.state.altEmailID === this.state.customerEmailId) {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.ticketingDashboard
              .emailidandalternateemailidfieldscannotbesame
            : "Email ID and Alternate Email ID fields cannot be same."
        );
      } else {
        axios({
          method: "post",
          url: config.apiUrl + "/Customer/validateCustomerExist",
          headers: authHeader(),
          params: {
            Cust_EmailId: this.state.customerEmailId.trim(),
            Cust_PhoneNumber: this.state.customerPhoneNumber.trim(),
          },
        })
          .then(function (res) {
            let validCheck = res.data.message;
            // if (validCheck === "Success") {
            if (res.data.statusCode === 200) {
              self.handleAddCustomerSave();
            } else {
              NotificationManager.error(res.data.responseData);
            }
          })
          .catch((data) => {
            console.log(data);
          });
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  handleAddCustomerSave() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this,
      dob;

    if (this.state.dob === "") {
      dob = "";
    } else {
      dob = moment(this.state.dob).format("L");
    }

    axios({
      method: "post",
      url: config.apiUrl + "/Customer/createCustomer",
      headers: authHeader(),
      data: {
        CustomerName: this.state.customerName.trim(),
        CustomerPhoneNumber: this.state.customerPhoneNumber.trim(),
        CustomerEmailId: this.state.customerEmailId.trim(),
        GenderID: this.state.genderID,
        AltNumber: this.state.altNumber.trim(),
        AltEmailID: this.state.altEmailID.trim(),
        DateOfBirth: dob,
        IsActive: 1,
      },
    })
      .then(function (res) {
        let responseMessage = res.data.message;
        let custId = res.data.responseData;
        self.setState({
          loading: true,
        });
        if (responseMessage === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.newcustomeraddedsuccessfully
              : "New Customer added successfully."
          );
          setTimeout(function () {
            self.props.history.push({
              pathname: "ticketsystem",
              state: self.state,
            });
          }, 1000);
          self.setState({
            customerId: custId,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  genderSelect = (e) => {
    this.setState({
      genderID: e.target.value,
    });
  };
  handleChange(date) {
    this.setState({
      dob: date,
    });
  }
  handlebackprev() {
    this.props.history.push("myTicketList");
  }

  addCustomerData = (e) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  // Added by Sandeep Start
  handleOrderStoreTableOpen() {
    this.setState({ OrderStoreTable: true });
  }
  handleOrderStoreTableClose() {
    this.setState({ OrderStoreTable: false });
  }
  handleCheckStoreID = (rowData) => {
    const id = "i"+rowData.storeID;
    this.setState({
      storeSelected:true,
      storeChecked:id
    });
    window.localStorage.setItem('selectedStoreDetails', JSON.stringify(rowData));
  };
  
  handleSearchStoreDetails(e) {
    const TranslationContext = this.state.translateLanguage?.default;
    e.preventDefault();
    this.setState({storeSelected:false,storeChecked:""});
    if (this.state.SwitchBtnStatus === false) {
      let self = this;
      if (this.state.SrchStoreNameCode.length > 0) {
        axios({
          method: "post",
          url: config.apiUrl + "/Store/SearchStoreDetail",
          headers: authHeader(),
          params: {
            SearchText: this.state.SrchStoreNameCode.trim(),
          },
        })
          .then(function (res) {
            let data = res.data.responseData;
            let Msg = res.data.message;
            if (Msg === "Success") {
              self.setState({ SearchData: data, message: Msg });
            } else {
              self.setState({
                // message: res.data.message,
                message: "Store Not Found",
                SearchData: [],
              });
            }
          })
          .catch((data) => {
            console.log(data);
          });
      } else {
        self.setState({
          searchStoreCompulsion:
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.pleaseenterstoredetails
              : "Please Enter Store Details.",
        });
      }
    }
  }
  handleStoreChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
 
  openAddTicket = () => {
    window.localStorage.setItem("isStoreAccess", true);
    this.setState({ SrchEmailPhone: "919999999999" }, () => {
      this.handleSearchCustomer();
    }); 
  };
  handleCRMRoleSrch() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CRMRole/GetRolesByUserID",
      headers: authHeader(),
    })
      .then(function (res) {
        let msg = res.data.message;
        let data = res.data.responseData.modules;
        let storeTicketAccess = data.filter((module) => {
          return module.moduleName === "Store Ticket";
        })[0]?.modulestatus;

        if (msg === "Success") {
          self.setState({
            storeticketsrch: storeTicketAccess
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  // Added by Sandeep End........

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    const { SearchData, selectedStoreData } = this.state;
    console.log();
    return (
      <Fragment>
        <div className="addSearch-header">
          <img
            src={ArrowCircleImg}
            alt="ArrowCircle"
            className="arrowImg-addSearch"
            onClick={this.handlebackprev.bind(this)}
          />
          {/* <label className="label-addsearch">
            {TranslationContext !== undefined
              ? TranslationContext.label.source
              : "Source"}
          </label>
          <img src={HeadphoneImg} alt="HeadphoneImg" className="headphonered" />
          <label className="mobile-noAddsearch">+91-9873470074</label>
          <CopyToClipboard
            text={"+91-9873470074"}
            onCopy={() => this.setState({ copied: true })}
          >
            <img
              src={PasteImg}
              alt="PasteImage"
              className="paste-addSearch"
              onClick={this.handleCopyToaster}
            />
          </CopyToClipboard> */}
        </div>
        <div className="addsearch-div">
          <div className="card">
            <div className="addSearchCard">
              <form name="form" onSubmit={this.handleSearchCustomer}>
                <div>
                  <label className="label1-AddSearch">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.searchcustomerby
                      : "SEARCH CUSTOMER BY"}
                    <label className="label2-AddSearch">
                      &nbsp;(
                      {TranslationContext !== undefined
                        ? TranslationContext.label.phonenumberemail
                        : "PHONE NUMBER, EMAIL ID"}
                      )<span className="span-color">*</span>
                    </label>
                  </label>
                  <div className="input-group" style={{ background: "none" }}>
                    <input
                      type="text"
                      className="search-customerAddSrch search-customerAddSrch-plcholder"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.label.entercustphonenoemailid
                          : "Enter Customer Phone Number, Email ID"
                      }
                      name="SrchEmailPhone"
                      value={this.state.SrchEmailPhone}
                      onChange={this.addCustomerData}
                      maxLength="100"
                      autoComplete="off"
                    />
                    <span className="input-group-addon seacrh-img-addsearch">
                      <img
                        src={SearchBlueImg}
                        alt="SearchBlueImg"
                        className="srch-imge"
                        onClick={this.handleSearchCustomer}
                      />
                    </span>
                  </div>
                  <div></div>
                </div>
              </form>
              {this.state.SrchEmailPhone.length === 0 && (
                <p style={{ color: "red", marginBottom: "0px" }}>
                  {this.state.searchCompulsion}
                </p>
              )}

              {this.state.message === "Record Not Found" ? (
                <div>
                  <div className="div-notFoundaddseacr">
                    <img
                      src={NotFoundImg}
                      alt="Not Found"
                      className="notFound-addSrch"
                    />
                    <br />
                    <label className="lbl-count-foundData">
                      {TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard
                          .wecouldntfindthecustomerwiththis
                        : "We couldn't find the customer with this"}
                      <br />{" "}
                      <span>
                        {TranslationContext !== undefined
                          ? TranslationContext.ticketingDashboard
                            .phonenumberemailId
                          : "Phone number, Email Id"}
                      </span>
                    </label>
                  </div>
                  <div style={{ width: "90%", textAlign: "center" }}>
                    <button
                      type="button"
                      className="btn-addCustomer"
                      onClick={this.handleAddCustomerOpen}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard.addcustomer
                        : "Add Customer"}
                    </button>
                  </div>
                </div>
              ) : null}

              {/* Added By Sandeep on  : 11 Mar 2024 */}
              {this.state.storeticketsrch && <form name="form" onSubmit={this.handleSearchStoreDetails}>
                <div className="mt-5">
                  <label className="label1-AddSearch">
                    {TranslationContext !== undefined
                      ? "SEARCH STORE BY"
                      : "SEARCH STORE BY"}
                    <label className="label2-AddSearch">
                      &nbsp;(
                      {
                        TranslationContext !== undefined
                          ? TranslationContext.label.searchbynamepincodecode
                          : "STORE NAME, PIN CODE, STORE CODE"
                      }
                      )<span className="span-color">*</span>
                    </label>
                  </label>
                  <div className="input-group" style={{ background: "none" }}>
                    <input
                      type="text"
                      className="search-customerAddSrch search-customerAddSrch-plcholder"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.label.entercustphonenoemailid
                          : "Enter Store Name, Pin Code, Store Code"
                      }
                      name="SrchStoreNameCode"
                      value={this.state.SrchStoreNameCode}
                      onChange={this.handleStoreChange}
                      //onClick={this.handleSearchStoreDetails}
                      disabled={this.state.SwitchBtnStatus === true}
                      maxLength="100"
                      autoComplete="off"
                    />
                    <span className="input-group-addon seacrh-img-addsearch">
                      <img
                        src={SearchBlueImg}
                        alt="SearchBlueImg"
                        className="srch-imge"
                        onClick={this.handleSearchStoreDetails}
                      />
                    </span>
                  </div>
                  <div></div>
                </div>
                </form>
              }

              {this.state.SrchStoreNameCode.length === 0 && (
                <p style={{ color: "red", marginBottom: "0px" }}>
                  {this.state.searchStoreCompulsion}
                </p>
              )}

              {this.state.message === "Success" ? (
                <div className="reacttableordermodal order-det">
                  <div
                    className="row m-t-10 m-b-10"
                    style={{ marginLeft: "0", marginRight: "0" }}
                  >
                    <div className="">
                      <ul
                        className="nav alert-nav-tabs3 store-nav-tabs"
                        role="tablist"
                      >
                        <li className="nav-item fo">
                          <a
                            className="nav-link active"
                            data-toggle="tab"
                            href="#storeSubdetail-tab"
                            role="tab"
                            aria-controls="storeSubdetail-tab"
                            aria-selected="true"
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.a.storedetails
                              : "Store Details"}
                          </a>
                        </li>
                        {this.state.AddSelectDetail === true ? (
                          <li className="nav-item fo">
                            <a
                              className="nav-link"
                              data-toggle="tab"
                              href="#selectedSubstore-tab"
                              role="tab"
                              aria-controls="selectedSubstore-tab"
                              aria-selected="false"
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.a.selectedstore
                                : "Selected Store"}
                            </a>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  </div>
                  <span className="linestore2"></span>
                  <div className="tab-content p-0 store_tbl_scroll">
                    <div
                      className="tab-pane fade show active"
                      id="storeSubdetail-tab"
                      role="tabpanel"
                      aria-labelledby="storeSubdetail-tab"
                    >
                      <div className="reactstoreselect ordermainrow">
                        <Table
                          className="custom-antd-table"
                          columns={[
                            {
                              render: (row, data) => {
                                var storeId = 0;
                                if (data.lpassStoreID > 0) {
                                  storeId = data.lpassStoreID;
                                } else {
                                  storeId = data.storeID;
                                }
                                return (
                                  <div className="radioInput">
                                    <input
                                      type="radio"
                                      id={"i" + storeId}
                                      name="ticket-store"
                                      checked={this.state.storeChecked ===("i" + storeId)}
                                      onChange={this.handleCheckStoreID.bind(
                                        this,
                                        data
                                      )}
                                    />
                                    <label htmlFor={"i" + storeId}></label>
                                  </div>
                                );
                              },
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
                                  ? TranslationContext.label.storename
                                  : "Store Name",
                              dataIndex: "storeName",
                            },
                            {
                              title:
                                TranslationContext !== undefined
                                  ? TranslationContext.label.storepincode
                                  : "Store Pin Code",
                              dataIndex: "pincode",
                            },

                          ]}
                          dataSource={SearchData}
                          pagination={false}
                        />
                      </div>

                      {/* {this.state.selectedStoreData.length !== 0 ? (
                        <div className="storedetailtabsbutton">
                          <button
                            type="button"
                            className="addstoretabsbtn"
                            onClick={this.handleShowSearchSelectDetails.bind(
                              this
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.ticketingDashboard.addstore
                              : "ADD STORE"}
                          </button>
                        </div>
                      ) : null} */}
                    </div>

                  </div>
                  <div className={this.state.storeSelected ? "btn_proceed mt-2" : "btn_proceed mt-2 d-none"}>
                    <button type="button" className="react-tabel-button proceed_btn" onClick={this.openAddTicket}>Proceed</button>
                  </div>
                </div>
              ) : null}
              {this.state.message === "Store Not Found" ? (
                <div>
                  <div className="div-notFoundaddseacr">
                    <img
                      src={NotFoundImg}
                      alt="Not Found"
                      className="notFound-addSrch"
                    />
                    <br />
                    <label className="lbl-count-foundData">
                      {TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard
                          .wecouldntfindthecustomerwiththis
                        : "We couldn't find the store with this"}
                      <br />{" "}
                      <span>
                        {TranslationContext !== undefined
                          ? TranslationContext.ticketingDashboard
                            .phonenumberemailId
                          : "Store Name, Pin Code, Store Code"}
                      </span>
                    </label>
                  </div>
                </div>
              ) : null}

            </div>
            <Modal
              onClose={this.handleAddCustomerClose}
              open={this.state.AddCustomer}
              modalId="AddSearchModel"
              overlayId="logout-ovrly"
            >
              <div className="pop-upAddSearchPD">
                <label className="lbl-popup-title">
                  {TranslationContext !== undefined
                    ? TranslationContext.ticketingDashboard.addnewcustomer
                    : "Add New Customer"}
                </label>
                <hr />
                <div className="row row-margin1">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="txt-1"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.label.fullname
                          : "Full Name"
                      }
                      name="customerName"
                      value={this.state.customerName}
                      onChange={this.addCustomerData}
                    />
                    {window.localStorage.getItem('isCreateCustomerNameMandatory') === "true" ? this.validator.message(
                      "Full Name",
                      this.state.customerName,
                      "required|alpha_space"
                    ) : null}
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="txt-1"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.label.mobilenumber
                          : "Mobile Number (with country code)"
                      }
                      name="customerPhoneNumber"
                      maxLength={parseInt(this.state.mobNumLength)}
                      value={this.state.customerPhoneNumber}
                      onChange={this.addCustomerData}
                    />
                    {this.validator.message(
                      "Mobile Number",
                      this.state.customerPhoneNumber,
                      `required|integer|size:${this.state.mobNumLength}`
                    )}
                  </div>
                </div>
                <div className="row row-margin1">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="txt-1"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.label.emailid
                          : "Email ID"
                      }
                      name="customerEmailId"
                      value={this.state.customerEmailId}
                      onChange={this.addCustomerData}
                    />
                    {this.validator.message(
                      "Email Id",
                      this.state.customerEmailId,
                      "required|email"
                    )}
                  </div>
                  <div className="col-md-6 radio-btn-margin">
                    <Radio.Group
                      onChange={this.genderSelect}
                      value={this.state.genderID}
                    >
                      <Radio value={1}>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.male
                          : "Male"}
                      </Radio>
                      <Radio value={2}>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.female
                          : "Female"}
                      </Radio>
                    </Radio.Group>
                  </div>
                </div>
                <div className="row row-margin1">
                  <div className="col-md-6 addcustdate">
                    <DatePicker
                      selected={this.state.dob}
                      onChange={(date) => this.handleChange(date)}
                      placeholderText="DOB"
                      value={this.state.dob}
                      maxDate={new Date()}
                      showMonthDropdown
                      showYearDropdown
                      className="txt-1"
                      dateFormat="dd MMM yyyy"
                    />
                  </div>
                </div>
                <hr />
                <div className="row row-margin1">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="txt-1"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.b.alternatenumber
                          : "Alternate Number (with country code)"
                      }
                      name="altNumber"
                      maxLength={parseInt(this.state.mobNumLength)}
                      value={this.state.altNumber}
                      onChange={this.addCustomerData}
                    />
                    {this.validator.message(
                      "Alternate Number",
                      this.state.altNumber,
                      `integer|size:${this.state.mobNumLength}`
                    )}
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="txt-1"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.label.alternateemail
                          : "Alternate Email"
                      }
                      name="altEmailID"
                      value={this.state.altEmailID}
                      onChange={this.addCustomerData}
                    />
                    {this.validator.message(
                      "Alternate Email Id",
                      this.state.altEmailID,
                      "email"
                    )}
                  </div>
                </div>
                <div className="btn-float">
                  <button
                    className="cancel-btn-A"
                    onClick={this.handleAddCustomerClose}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.option.cancel
                      : "CANCEL"}
                  </button>
                  <button
                    type="button"
                    className="butn add-cust-butn"
                    onClick={this.CheckValidCustomerEmailPhoneNo.bind(this)}
                    disabled={this.state.loading}
                  >
                    {this.state.loading ? (
                      <FontAwesomeIcon
                        className="circular-loader"
                        icon={faCircleNotch}
                        spin
                      />
                    ) : (
                      ""
                    )}
                    {this.state.loading
                      ? "Please Wait ..."
                      : TranslationContext !== undefined
                        ? TranslationContext.button.save
                        : "SAVE"}
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default AddSearchMyTicket;
