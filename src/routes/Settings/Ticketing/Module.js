import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Demo from "../../../store/Hashtag";
import { Tabs, Tab } from "react-bootstrap-tabs";

import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import { NotificationManager } from "react-notifications";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";
import {
  Switch,
  Table,
  Button,
  Tag,
  Space,
  message,
  Checkbox,
  Select,
  Popover,
} from "antd";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeUp, faVolumeDown } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-rangeslider";
import BlackInfoIcon from "../../../assets/Images/Info-black.png";
import SettingsService from "../../../Services/SettingsService";
import DelBigIcon from "../../../assets/Images/del-big.png";
import Modal from "react-responsive-modal";
import CancelImg from "../../../assets/Images/cancel.png"
const { Option } = Select;

class Module extends Component {
  constructor(props) {
    super(props);
    let UserData = JSON.parse(localStorage.getItem("AgentData"));
    this.state = {
      value: 10,
      tenantID: UserData.tenantID,
      agentID: UserData.agentID,
      modulesNames: [],
      modulesItems: [],
      moduleID: 0,
      activeID: [],
      inactiveID: [],
      moduleIDMyticket: 0,
      modulesItemsMyticket: [],
      selTab: "Ticket Field",
      loading: false,
      translateLanguage: {},
      ticketFields: [],
      isLoading: false,
      number: "",
      selectValue: "",
      errors: {},
      configureLogoutData: [],
      rowLength: 0,
      isEdit: false,
      editUser: {},
      editErrors: {},
      newChatSoundVolume: 0,
      newMessageSoundVolume: 0,
      isNotiNewChat: false,
      isNotiNewMessage: false,
      newChatSoundID: 0,
      newMessageSoundID: 0,
      notificationTime: 0,
      nsId: 0,
      bannedChatListData: [],
      agentChatSessionDuration: "M",
      agentChatSessionValue: "",
      chatDisplayValue: "",
      chatDisplayDurationHour: "D",
      programCode: "",
      limitText: "",
      isMessageTabActive: false,
      isCardTabActive: false,
      isRecommendedListTabActive: false,
      isScheduleVisitTabActive: false,
      isPaymentLinkTabActive: false,
      isCustomerProfile: false,
      isCustomerProduct: false,
      customerChatSessionValue: "",
      customerChatSessionDuration: "M",
      cardSearchStoreCode: false,
      isgrammarlyCheck: false,
      isVideoCallAppointment: false,
      isStoreStaffCommentInProfile: false,
      chatSoundData: [],
      ChatAllowedPerAgent: 0,
      ShortcutList: [],
      Shortcut: "",
      ShortcutAvailableFor: "",
      ShortcutMessageDescription: "",
      TagForShortcut: "",
      shortcutEditmodel: false,
      ShortcutID: 0,
      ShortcutEdit: "",
      ShortcutAvailableForEdit: "",
      ShortcutMessageDescriptionEdit: "",
      TagForShortcutEdit: "",
      shortcutDetails: [],
      assignmentLogic: "",
      loadbalance: 0,
      initialLoad: 0,
      featureAvaibleList: [],
      columnValue: "",
      ismodalworking: false,
      TimeFormat: [
        { value: "00:00" },
        { value: "00:00" },
        { value: "00:00" },
        { value: "00:00" },
        { value: "00:00" },
        { value: "00:00" },
        { value: "00:00" },
        { value: "00:00" },
        { value: "00:00" },
        { value: "00:00" },
      ],
      selectedModuleIndex: 0,
      daysArray: [
        {
          id: 1,
          value: "Monday",
          isCheck: false
        },
        {
          id: 2,
          value: "Tuesday",
          isCheck: false
        },
        {
          id: 3,
          value: "Wednesday",
          isCheck: false
        },
        {
          id: 4,
          value: "Thursday",
          isCheck: false
        },
        {
          id: 5,
          value: "Friday",
          isCheck: false
        },
        {
          id: 6,
          value: "Saturday",
          isCheck: false
        },
        {
          id: 7,
          value: "Sunday",
          isCheck: false

        },
      ],
      selectedWorking: [],
      getSLaNonworking: [],
      startTime: "",
      endTime: "",
      // selectedNonWorkingDays: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleGetModulesNames = this.handleGetModulesNames.bind(this);
    this.handleGetModulesItems = this.handleGetModulesItems.bind(this);
    this.handleGetModulesItemsMyTicket = this.handleGetModulesItemsMyTicket.bind(
      this
    );
    this.handleUpdatedModule = this.handleUpdatedModule.bind(this);
    this.handleGetBannedCustomersList = this.handleGetBannedCustomersList.bind(
      this
    );
    this.handleRemoveBanOnCustomer = this.handleRemoveBanOnCustomer.bind(this);
    this.handleGetChatAllowedPerAgent = this.handleGetChatAllowedPerAgent.bind(
      this
    );
    this.handleUpdateChatAllowedPerAgent = this.handleUpdateChatAllowedPerAgent.bind(
      this
    );
    this.handleGetAllShortcut = this.handleGetAllShortcut.bind(this);
    this.handleSaveShortcut = this.handleSaveShortcut.bind(this);
    this.handleGetShortcutDetailsbyId = this.handleGetShortcutDetailsbyId.bind(this);
    this.handleUpdateShortcut = this.handleUpdateShortcut.bind(this);
    this.SettingsService = new SettingsService();
  }

  handleChange(value) {
    this.setState({
      value: value,
    });
  }

  componentDidMount() {
    this.handleFeaturesList();
    this.handleGetModulesNames();
    this.handleConfigureTimeout();
    this.handleGetTicketFields();
    this.handleGetChatSession();
    this.handleGetShortcutDetailsbyId();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  checkModule = async (moduleItemID, moduleID) => {
    var activeIds = [];
    var inactiveIds = [];
    let modulesItems = [...this.state.modulesItems],
      isActive;
    for (let i = 0; i < modulesItems.length; i++) {
      if (modulesItems[i].moduleItemID === moduleItemID) {
        isActive = modulesItems[i].moduleItemisActive;
        modulesItems[i].moduleItemisActive = !isActive;
      }
    }
    for (let i = 0; i < modulesItems.length; i++) {
      if (modulesItems[i].moduleItemisActive === true) {
        var MID = modulesItems[i].moduleItemID;
        activeIds.push(MID);
      } else {
        var ids = modulesItems[i].moduleItemID;
        inactiveIds.push(ids);
      }
    }
    await this.setState({
      modulesItems,
      activeID: activeIds,
      inactiveID: inactiveIds,
    });
    this.handleUpdatedModule(moduleID);
  };

  checkModuleMyTicket = async (moduleItemID, moduleID) => {
    var activeIds = [];
    var inactiveIds = [];
    let modulesItemsMyticket = [...this.state.modulesItemsMyticket],
      isActive;
    for (let i = 0; i < modulesItemsMyticket.length; i++) {
      if (modulesItemsMyticket[i].moduleItemID === moduleItemID) {
        isActive = modulesItemsMyticket[i].moduleItemisActive;
        modulesItemsMyticket[i].moduleItemisActive = !isActive;
      }
    }
    for (let i = 0; i < modulesItemsMyticket.length; i++) {
      if (modulesItemsMyticket[i].moduleItemisActive === true) {
        var MId = modulesItemsMyticket[i].moduleItemID;
        activeIds.push(MId);
      } else {
        var ids = modulesItemsMyticket[i].moduleItemID;
        inactiveIds.push(ids);
      }
    }

    await this.setState({
      activeID: activeIds,
      inactiveID: inactiveIds,
    });
    this.handleUpdatedModule(moduleID);
  };

  //handle update chat notification settings
  handleUpdateChatSoundNotiSetting = (isDefualt) => {
    let self = this;
    this.setState({ isloading: true });
    let inputData = {
      NewChatSoundID: this.state.newChatSoundID,
      NewChatSoundVolume: this.state.newChatSoundVolume,
      NewMessageSoundID: this.state.newMessageSoundID,
      NewMessageSoundVolume: this.state.newMessageSoundVolume,
      IsNotiNewChat: this.state.isNotiNewChat,
      IsNotiNewMessage: this.state.isNotiNewMessage,
      NotificationTime: this.state.notificationTime,
      ID: this.state.nsId,
      IsDefault: isDefualt || false,
    };
    this.SettingsService.PostWithData(
      "/CustomerChat/UpdateChatSoundNotiSetting",
      inputData
    )
      .then((response) => {
        var message = response.message;
        var responseData = response.responseData;

        if (message === "Success" && responseData) {
          NotificationManager.success("Record Updated Successfully");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          self.handleGetChatSoundNotiSetting();
          self.setState({ isloading: false });
        } else {
          NotificationManager.error("Record Not Updated");
          self.setState({ isloading: false });
        }
      })
      .catch((error) => {
        self.setState({ isloading: false });
        console.log(error);
      });
  };

  //handle reset defualt click
  handleRestDefualtButtonClick = () => {
    var newChatSoundID = 0;
    var newMessageSoundID = 0;
    if (this.state.chatSoundData.length > 0) {
      newChatSoundID = this.state.chatSoundData[0].soundID;
      newMessageSoundID = this.state.chatSoundData[0].soundID;
    }
    this.setState({
      newChatSoundID,
      newMessageSoundID,
      newChatSoundVolume: 50,
      newMessageSoundVolume: 50,
    });
    setTimeout(() => {
      this.handleUpdateChatSoundNotiSetting(true);
    }, 10);
  };

  //handle button click to set css
  handleButtonClick = (no) => {
    this.setState({ buttonClickCSS: no });
    if (no === 3) {
      this.handleUpdateChatSoundNotiSetting();
    }
    if (no === 2) {
      this.handleRestDefualtButtonClick();
    }
    if (no === 1) {
      this.props.history.push("/admin/settings");
    }
  };

  changeModuleTab = async (moduleID) => {
    await this.setState({
      moduleID,
    });
    this.handleGetModulesItems();
  };

  handleUpdatedModule(id) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    var activeitem = "";
    var inactiveitem = "";

    if (this.state.activeID !== null) {
      for (let i = 0; i < this.state.activeID.length; i++) {
        activeitem += this.state.activeID[i] + ",";
      }
    }

    if (this.state.inactiveID !== null) {
      for (let i = 0; i < this.state.inactiveID.length; i++) {
        inactiveitem += this.state.inactiveID[i] + ",";
      }
    }
    activeitem = activeitem.substring(0, activeitem.length - 1);
    inactiveitem = inactiveitem.substring(0, inactiveitem.length - 1);
    axios({
      method: "post",
      url: config.apiUrl + "/Module/ModifyModuleItems",
      headers: authHeader(),
      params: {
        ModuleID: id,
        ModulesActive: activeitem,
        ModuleInactive: inactiveitem,
      },
    })
      .then(function (res) {
        let Msg = res.data.message;
        if (Msg === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordupdatedsuccessfully
              : "Record Updated successfully."
          );
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordnotupdated
              : "Record Not Updated."
          );
        }
        self.setState({
          activeID: [],
          inactiveID: [],
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetModulesNames() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetModules",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          let moduleID = data[0].moduleID;
          let selTab = data[0].moduleName;
          let moduleIDMyticket = data[1].moduleID;
          var objTicketField = {};
          objTicketField.moduleID = 10;
          objTicketField.moduleName = "Ticket Fields";
          objTicketField.moduleisActive = true;
          var objLogoutTime = {};
          objLogoutTime.moduleID = 11;
          objLogoutTime.moduleName = "Configure Logout Time";
          objLogoutTime.moduleisActive = true;
          var objChatFields = {};
          objChatFields.moduleID = 12;
          objChatFields.moduleName = "Chat";
          objChatFields.moduleisActive = true;
          var objAssignmentLogicFields = {};
          objAssignmentLogicFields.moduleID = 13;
          objAssignmentLogicFields.moduleName = "Ticket Assignment Logic";
          objAssignmentLogicFields.moduleisActive = true;
          var objFeatureOption = {};
          objFeatureOption.moduleID = 14;
          objFeatureOption.moduleName = "Features Option";
          objFeatureOption.moduleisActive = true;
          data.push(objTicketField);
          data.push(objLogoutTime);
          data.push(objChatFields);
          data.push(objAssignmentLogicFields);
          data.push(objFeatureOption)
          self.setState({
            modulesNames: data,
            moduleID,
            moduleIDMyticket,
            selTab,
          });
        } else {
          self.setState({ modulesNames: [] });
        }
        self.handleGetModulesItems();
        self.handleGetModulesItemsMyTicket();
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetModulesItems() {
    let self = this;
    self.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetModulesItems",
      headers: authHeader(),
      params: {
        ModuleID: this.state.moduleID,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ modulesItems: data, loading: false });
        } else {
          self.setState({ modulesItems: [], loading: false });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleGetModulesItemsMyTicket() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetModulesItems",
      headers: authHeader(),
      params: {
        ModuleID: this.state.moduleIDMyticket,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ modulesItemsMyticket: data });
        } else {
          self.setState({ modulesItemsMyticket: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  //handle notification checkbox change
  handleNotificationCheckboxChange = (e) => {
    var name = e.target.name;
    if (name === "isNotiNewChat") {
      this.setState({ isNotiNewChat: e.target.checked });
    } else {
      this.setState({ isNotiNewMessage: e.target.checked });
    }
  };

  //handle get chat sound notification setting
  handleGetChatSoundNotiSetting = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetChatSoundNotiSetting",
      headers: authHeader(),
    })
      .then((response) => {
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message === "Success" && responseData) {
          var reader = new FileReader();
          var reader1 = new FileReader();
          fetch(responseData.newMessageSoundFile).then(function (res) {
            res.blob().then(function (blob) {
              reader.addEventListener("loadend", function () {
                var base64FileData = reader.result.toString();
                localStorage.setItem(
                  "newMessageSoundFile",
                  JSON.stringify(base64FileData)
                );
              });
              reader.readAsDataURL(blob);
            });
          });

          fetch(responseData.newChatSoundFile).then(function (res) {
            res.blob().then(function (blob) {
              reader1.addEventListener("loadend", function () {
                var base64FileData = reader1.result.toString();
                localStorage.setItem(
                  "newChatSoundFile",
                  JSON.stringify(base64FileData)
                );
              });
              reader1.readAsDataURL(blob);
            });
          });
          window.localStorage.setItem(
            "ChatSoundNotiSetting",
            JSON.stringify(responseData)
          );
          self.setState({
            newChatSoundID: responseData.newChatSoundID || 0,
            newMessageSoundID: responseData.newMessageSoundID || 0,
            newChatSoundVolume: responseData.newChatSoundVolume || 0,
            newMessageSoundVolume: responseData.newMessageSoundVolume || 0,
            isNotiNewChat: responseData.isNotiNewChat || false,
            isNotiNewMessage: responseData.isNotiNewMessage || false,
            notificationTime: responseData.notificationTime || 0,
            nsId: responseData.id || false,
          });
        }
      })
      .catch((response) => {
        console.log(response, "---handleGetChatSoundNotiSetting");
      });
  };

  onModulesChange = async (moduleName) => {
    let selectedArray = this.state.modulesNames.filter(
      (x) => x.moduleName === moduleName
    );
    await this.setState({
      moduleID: selectedArray[0].moduleID,
      selTab: moduleName,
    });
    if (selectedArray[0].moduleID !== 10) {
      this.handleGetModulesItems();
    }
    if (selectedArray[0].moduleID == 13) {
      this.handleGetAssignmentLogic();
    }
  };
  handleGetTicketFields = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetTicketFields",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ ticketFields: data.ticketFieldsLst });
        } else {
          self.setState({ ticketFields: [] });
        }
      })
      .catch((error) => console.log(error));
  };
  handleTicketFieldChange = (row, name, e) => {
    console.log(row);
    if (name === "fieldMandatory") {
      this.state.ticketFields.filter(
        (x) => x.fieldName === row.fieldName
      )[0].fieldMandatory = e;
    }
    if (name === "createPage") {
      this.state.ticketFields.filter(
        (x) => x.fieldName === row.fieldName
      )[0].createPage = e;
      if (e === false) {
        this.state.ticketFields.filter(
          (x) => x.fieldName === row.fieldName
        )[0].fieldMandatory = e;
      }
    }
    if (name === "listPage") {
      this.state.ticketFields.filter(
        (x) => x.fieldName === row.fieldName
      )[0].listPage = e;
      if (e === false) {
        this.state.ticketFields.filter(
          (x) => x.fieldName === row.fieldName
        )[0].fieldMandatory = e;
      }
    }
    if (name === "detailsPage") {
      this.state.ticketFields.filter(
        (x) => x.fieldName === row.fieldName
      )[0].detailsPage = e;
      if (e === false) {
        this.state.ticketFields.filter(
          (x) => x.fieldName === row.fieldName
        )[0].fieldMandatory = e;
      }
    }
    if (name === "reportDownload") {
      this.state.ticketFields.filter(
        (x) => x.fieldName === row.fieldName
      )[0].reportDownload = e;
    }

    this.setState({
      ticketFields: this.state.ticketFields,
    });
  };

  //handle change textbox
  handleOnChange(e) {
    const { name, value } = e.target;
    if (!isNaN(value)) {
      this.setState({
        [name]: value,
      });
    } else {
      this.setState({
        [name]: "",
      });
    }
  }

  //handle update chate session
  handleUpdateChatSession() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    if (
      this.state.isChatDisplayValue === "" &&
      this.state.isAgentChatSessionValue === "" &&
      this.state.isCustomerChatSessionValue === ""
    ) {
      let inputData = {
        CustomerChatSessionValue: Number(this.state.customerChatSessionValue),
        CustomerChatSessionDuration: this.state.customerChatSessionDuration,
        ChatDisplayValue: Number(this.state.chatDisplayValue),
        ChatDisplayDuration: this.state.chatDisplayDurationHour,
        ChatCharLimit: Number(this.state.limitText),
        Message: this.state.isMessageTabActive,
        Card: this.state.isCardTabActive,
        RecommendedList: this.state.isRecommendedListTabActive,
        ScheduleVisit: this.state.isScheduleVisitTabActive,
        PaymentLink: this.state.isPaymentLinkTabActive,
        CustomerProfile: this.state.isCustomerProfile,
        CustomerProduct: this.state.isCustomerProduct,
        AgentChatSessionValue: Number(this.state.agentChatSessionValue),
        AgentChatSessionDuration: this.state.agentChatSessionDuration,
        CardSearchStoreCode: this.state.cardSearchStoreCode,
        GrammarlyCheck: this.state.isgrammarlyCheck,
        VideoCallAppointment: this.state.isVideoCallAppointment,
        StoreStaffCommentInProfile: this.state.isStoreStaffCommentInProfile,
      };
      this.SettingsService.PostWithData(
        "/CustomerChat/UpdateChatSessionNew",
        inputData
      )
        .then((response) => {
          var message = response.message;
          if (message === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordupdatedsuccessfully
                : "Record Updated Successfully"
            );
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } else {
            NotificationManager.console.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordnotupdated
                : "Record Not Updated"
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  //handle submit button
  handleSubmit() {
    if (this.state.agentChatSessionValue === "") {
      this.setState({
        isAgentChatSessionValue: "Please Enter Value",
      });
    } else {
      this.setState({
        isAgentChatSessionValue: "",
      });
    }
    if (this.state.customerChatSessionValue === "") {
      this.setState({
        isCustomerChatSessionValue: "Please Enter Value",
      });
    } else {
      this.setState({
        isCustomerChatSessionValue: "",
      });
    }
    if (this.state.chatDisplayValue === "") {
      this.setState({
        isChatDisplayValue: "Please Enter Value",
      });
    } else {
      this.setState({
        isChatDisplayValue: "",
      });
    }

    setTimeout(() => {
      this.handleUpdateChatSession();
    }, 10);
  }

  handleTicketFieldInputChange = (row, name, e) => {
    if (name === "displayEnglishName") {
      this.state.ticketFields.filter(
        (x) => x.fieldName === row.fieldName
      )[0].displayEnglishName = e.target.value;
    }
    if (name === "displayHindiName") {
      this.state.ticketFields.filter(
        (x) => x.fieldName === row.fieldName
      )[0].displayHindiName = e.target.value;
    }

    this.setState({
      ticketFields: this.state.ticketFields,
    });
  };
  handleUpdateTicketFields = () => {
    let self = this;
    this.setState({
      isLoading: true,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/Module/UpdateTicketFields",
      headers: authHeader(),
      data: {
        ticketFieldsLst: this.state.ticketFields,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        self.setState({
          isLoading: false,
        });
        if (status === "Success") {
          NotificationManager.success("Record Update Successfully.");
          self.handleGetTicketFields();
        } else {
          NotificationManager.error("Record Not Update.");
        }
      })
      .catch((error) => {
        console.log(error);

        self.setState({
          isLoading: false,
        });
      });
  };

  filterNumberChange = (e) => {
    if (this.state.isEdit) {
      this.setState({
        editUser: {
          ...this.state.editUser,
          logOutTime: e.target.value,
        },
      });
    } else {
      this.setState({
        number: e.target.value,
      });
    }
  };

  handleSelectChange = (e) => {
    if (this.state.isEdit) {
      this.setState({
        editUser: {
          ...this.state.editUser,
          logOutHours: e.target.value,
        },
      });
    } else {
      this.setState({
        selectValue: e.target.value,
      });
    }
  };
  //   handlechangetimeout= (e) => {
  //     if (isEdit) {
  //         EditUser({
  //             ...editUser,
  //             [e.target.name] : e.target.value
  //         })

  //     }
  // setUserDetails({
  //     ...usersDetails,
  //     [e.target.name] : e.target.value
  // })
  // }

  // }
  //handle chat tab radio button change
  handleRadioButtonChange = (e) => {
    var name = e.target.name;

    if (name === "isMessageTabActive") {
      this.setState({ isMessageTabActive: e.target.checked });
    }
    if (name === "isCardTabActive") {
      this.setState({ isCardTabActive: e.target.checked });
    }
    if (name === "isRecommendedListTabActive") {
      this.setState({ isRecommendedListTabActive: e.target.checked });
    }
    if (name === "isScheduleVisitTabActive") {
      this.setState({ isScheduleVisitTabActive: e.target.checked });
    }
    if (name === "isPaymentLinkTabActive") {
      this.setState({ isPaymentLinkTabActive: e.target.checked });
    }
    if (name === "isCustomerProfile") {
      this.setState({ isCustomerProfile: e.target.checked });
    }
    if (name === "isCustomerProduct") {
      this.setState({ isCustomerProduct: e.target.checked });
    }
    if (name === "cardSearchStoreCode") {
      this.setState({ cardSearchStoreCode: e.target.checked });
    }
    if (name === "isgrammarlyCheck") {
      this.setState({ isgrammarlyCheck: e.target.checked });
    }
    if (name === "isVideoCallAppointment") {
      this.setState({ isVideoCallAppointment: e.target.checked });
    }
    if (name === "isStoreStaffCommentInProfile") {
      this.setState({ isStoreStaffCommentInProfile: e.target.checked });
    }
  };

  formValidation = () => {
    const { number, selectValue } = this.state;
    let isValid = true;
    const errors = {};
    if (number === "") {
      errors.numberLength = "Please enter the number";
      isValid = false;
    }
    if (number.includes("-")) {
      errors.numberSpecialChar = "Please include a no only";
      isValid = false;
    }
    if (selectValue === "") {
      errors.selectValueLength = "please select the value";
      isValid = false;
    }
    this.setState({
      errors,
    });
    return isValid;
  };
  formEditValidation = () => {
    const { logOutTime, logOutHours } = this.state.editUser;
    let isValid = true;
    const editErrors = {};
    if (logOutTime === "") {
      editErrors.numberEditLength = "Please enter the number";
      isValid = false;
    }
    if (logOutTime.includes("-")) {
      editErrors.numberEditSpecialChar = "Please include a no only";
      isValid = false;
    }
    if (logOutHours === "") {
      editErrors.selectValueEditLength = "please select the value";
      isValid = false;
    }
    this.setState({
      editErrors,
    });
    return isValid;
  };

  handleConfigureInput = () => {
    const { number, selectValue } = this.state;
    let self = this;
    if (this.formValidation()) {
      axios({
        method: "post",
        url: config.apiUrl + "/Module/CreateLogOutModel",
        headers: authHeader(),
        data: {
          LogOutTime: number,
          LogOutHours: selectValue,
        },
      })
        .then(function (res) {
          let statuscode = res.data.statusCode;
          if (statuscode === 200) {
            NotificationManager.success(
              "Configure Logout time saved successfully"
            );
            self.handleConfigureTimeout();
            document.getElementById("trigger-timeout").click();
            self.setState({
              errors: {},
            });
          } else {
            NotificationManager.error("Configure Logout time not Saved");
          }
        })
        .catch((data) => {
          console.log(data);
        });
      this.setState({
        number: "",
        selectValue: "",
      });
    }
  };

  handleGetBannedCustomersList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetBannedChatList",
      headers: authHeader(),
    })
      .then(function (res) {
        let data = res.data.responseData;
        self.setState({
          bannedChatListData: data,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleConfigureInputEdit = () => {
    let self = this;
    const { logOutTime, logOutHours, logoutId } = this.state.editUser;
    var data = {
      LogoutId: logoutId,
      LogOutTime: logOutTime,
      LogOutHours: logOutHours,
    };
    if (this.formEditValidation()) {
      axios({
        method: "post",
        url: config.apiUrl + "/Module/UpdateLogOutModel",
        headers: authHeader(),
        data: data,
      })
        .then(function (res) {
          let statusCode = res.data.statusCode;
          if (statusCode === 200) {
            NotificationManager.success("Record Updated Successfully");
            self.handleConfigureTimeout();
            document.getElementById("trigger-timeout").click();
            self.setState({
              isEdit: false,
              editErrors: {},
            });
            self.state.editUser.logOutTime = "";
            self.state.editUser.logOutHours = "";
          } else {
            NotificationManager.error("Record was not updated");
          }
        })
        .catch((data) => {
          console.log(data);
        });
    }
  };

  handleConfigureTimeout = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Module/GetLogOutModel",
      headers: authHeader(),
    })
      .then(function (res) {
        var configureLogoutData = res.data.responseData;
        var statusCode = res.data.statusCode;
        if (statusCode === 200) {
          let LogoutHours = configureLogoutData[0].logOutHours;
          let LogoutValue = configureLogoutData[0].logOutTime;
          var rowLength = Object.keys(res.data.responseData).length;
          self.setState({
            configureLogoutData: configureLogoutData,
            LogoutHours,
            LogoutValue,
            rowLength,
          });
        } else {
          self.setState({
            configureLogoutData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleDelTime = (id) => {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + `/Module/DeleteLogOutModel?LogoutId=${id}`,
      headers: authHeader(),
    })
      .then(function (res) {
        var statusCode = res.data.statusCode;
        if (statusCode === 200) {
          NotificationManager.success("Record Deleted Successfully");
          self.handleConfigureTimeout();
          document.getElementById("trigger-timeout-del").click();
        } else {
          NotificationManager.error("Record in use");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };

  handleEditTime = (item) => {
    let self = this;
    self.setState({
      isEdit: true,
      editUser: item,
    });
  };

  //handle get chat session
  handleGetChatSession() {
    let self = this;
    this.SettingsService.Post("/CustomerChat/GetChatSessionNew")
      .then((response) => {
        var message = response.message;
        var data = response.responseData;
        if (message === "Success" && data) {
          window.localStorage.setItem("ChatSession", JSON.stringify(data));
          self.setState({
            agentChatSessionDuration: data.agentChatSessionDuration,
            agentChatSessionValue: data.agentChatSessionValue,
            chatDisplayValue: data.chatDisplayValue,
            chatDisplayDurationHour: data.chatDisplayDuration,
            programCode: data.programCode,
            limitText: data.chatCharLimit,
            isMessageTabActive: data.message,
            isCardTabActive: data.card,
            isRecommendedListTabActive: data.recommendedList,
            isScheduleVisitTabActive: data.scheduleVisit,
            isPaymentLinkTabActive: data.paymentLink,
            isCustomerProfile: data.customerProfile,
            isCustomerProduct: data.customerProduct,
            customerChatSessionDuration: data.customerChatSessionDuration,
            customerChatSessionValue: data.customerChatSessionValue,
            cardSearchStoreCode: data.cardSearchStoreCode,
            isgrammarlyCheck: data.grammarlyCheck,
            isVideoCallAppointment: data.videoCallAppointment,
            isStoreStaffCommentInProfile: data.storeStaffCommentInProfile,
          });
        } else {
          self.setState({
            agentChatSessionDuration: "",
            agentChatSessionValue: "",
            customerChatSessionValue: "",
            customerChatSessionDuration: "",
            chatDisplayValue: "",
            chatDisplayDurationHour: "",
            limitText: "",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //handle change textbox
  handleOnChange(e) {
    const { name, value } = e.target;
    if (!isNaN(value)) {
      this.setState({
        [name]: value,
      });
    } else {
      this.setState({
        [name]: "",
      });
    }
  }

  //handle on change drop-dow
  handleAgentSessionDuration(e) {
    this.setState({ agentChatSessionDuration: e });
  }
  // handle customer session duration change
  handleCustomerSessionDuration(e) {
    this.setState({ customerChatSessionDuration: e });
  }
  //handle chat display duration hour
  handleChatDisplayDurationHour(e) {
    this.setState({ chatDisplayDurationHour: e });
  }

  //handle tab change
  handleTabChange = (lable) => {
    this.setState({
      selectedTab: lable,
    });
    if (lable === "Sounds and Notifications") {
      this.handleGetChatSoundList();
      this.handleGetChatSoundNotiSetting();
    }

    if (lable === "Banned Visitors") {
      this.handleGetBannedCustomersList();
    }

    if (lable === "Chat Allowed") {
      this.handleGetChatAllowedPerAgent();
    }
    if (lable === "Shortcut") {
      this.handleGetAllShortcut();
    }
  };
  //handle get chat sound list data
  handleGetChatSoundList = () => {
    let self = this;
    this.SettingsService.Post("/CustomerChat/GetChatSoundList")
      .then((response) => {
        var message = response.message;
        var chatSoundData = response.responseData;
        if (message === "Success" && chatSoundData) {
          self.setState({ chatSoundData });
        } else {
          self.setState({ chatSoundData: [] });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //handle chat assinged volumn change
  handleChatAssingedVolumnChange = (e) => {
    this.setState({
      newChatSoundVolume: e,
    });
    if (Number(this.state.newChatSoundID)) {
      var soundName = this.state.chatSoundData.filter(
        (x) => x.soundID === Number(this.state.newChatSoundID)
      )[0].soundFileName;

      const Sound1Play = new Audio(config.soundUrl + soundName);
      Sound1Play.volume = Math.round(e / 10) / 10;
      Sound1Play.play();
    }
  };

  //handle new message volumn change
  handleNewMessageVolumnChange = (e) => {
    this.setState({ newMessageSoundVolume: e });
    if (Number(this.state.newMessageSoundID)) {
      var soundName = this.state.chatSoundData.filter(
        (x) => x.soundID === Number(this.state.newMessageSoundID)
      )[0].soundFileName;
      const Sound1Play = new Audio(config.soundUrl + soundName);
      Sound1Play.volume = Math.round(e / 10) / 10;
      Sound1Play.play();
    }
  };

  //Method to remove ban on customer
  handleRemoveBanOnCustomer(bandId) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/RemoveBanCustomerChat",
      headers: authHeader(),
      params: {
        banID: bandId,
      },
    })
      .then(function (res) {
        let Msg = res.data.message;
        if (Msg === "Success") {
          NotificationManager.success("Ban Removed successfully !!");
          this.handleGetBannedCustomersList();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          NotificationManager.error("Ban not removed yet !.");
        }
        self.setState({
          activeID: [],
          inactiveID: [],
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleAllowedChatChange(event) {
    let count = event.target.value;
    this.setState({ ChatAllowedPerAgent: count });
  }

  handleSaveChatAllowedCount() {
    if (this.state.ChatAllowedPerAgent > 0) {
      this.handleUpdateChatAllowedPerAgent(this.state.ChatAllowedPerAgent);
    }
  }

  handleGetChatAllowedPerAgent() {
    let self = this;
    this.SettingsService.Post("/CustomerChat/GetChatAllowedPerAgent")
      .then((response) => {
        var message = response.message;
        var data = response.responseData;
        if (message === "Success") {
          self.setState({ ChatAllowedPerAgent: response.responseData });
        } else {
          self.setState({ ChatAllowedPerAgent: 0 });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleUpdateChatAllowedPerAgent(AllowedChatCount) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/UpdateChatAllowedPerAgent",
      headers: authHeader(),
      params: {
        newChatAllowedValue: AllowedChatCount,
      },
    })
      .then(function (res) {
        let Msg = res.data.message;
        if (Msg === "Success") {
          NotificationManager.success(
            "Allowed Chat Count Updated successfully !!"
          );
          this.handleGetChatAllowedPerAgent();
        } else {
          NotificationManager.error("Allowed Chat Count not Updated ");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetAllShortcut() {
    this.SettingsService.Post("/CustomerChat/GetAllShortcuts")
      .then((response) => {
        console.log("inside shortcut list");
        let Msg = response.message;
        let data = response.responseData;
        if (Msg === "Success") {
          this.setState({
            ShortcutList: data,
          });
          console.log("shortcutlist", this.state.ShortcutList);
        } else {
          this.setState({
            ShortcutList: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleShortcutOnChange = (event) => {
    let shortcut = event.target.value;
    if (shortcut.length > 0) {
      this.setState({
        Shortcut: shortcut,
      });
    }
  };

  handleAvailableForDropdownChange = (event) => {
    let selectedValue = event.target.value;
    this.setState({
      ShortcutAvailableFor: selectedValue,
    });
  };

  handleMessageForShortcut = (event) => {
    let msg = event.target.value;
    if (msg.length > 0) {
      this.setState({
        ShortcutMessageDescription: msg,
      });
    }
  };

  handleTagsOnChange = (event) => {
    let tag = event.target.value;
    if (tag.length > 0) {
      this.setState({
        TagForShortcut: tag,
      });
    }
  };

  handleShortcutUpdateOnChange = (event) => {
    let shortcut = event.target.value;
    this.setState({
      ShortcutEdit: shortcut,
    });
  };

  handleAvailableForDropdownUpdate = (event) => {
    let selectedValue = event.target.value;
    this.setState({
      ShortcutAvailableForEdit: selectedValue,
    });
  };

  handleMessageUpdateForShortcut = (event) => {
    let msg = event.target.value;
    this.setState({
      ShortcutMessageDescriptionEdit: msg,
    });
  };

  handleTagsUpdateOnChange = (event) => {
    let tag = event.target.value;
    this.setState({
      TagForShortcutEdit: tag,
    });
  };

  handleSaveShortcutBtn() {
    if (
      this.state.TagForShortcut.length > 0 &&
      this.state.ShortcutMessageDescription.length > 0 &&
      this.state.Shortcut.length > 0
    ) {
      this.handleSaveShortcut();
    }
  }

  handleSaveShortcut() {
    let inputParams = {
      TenantID: this.state.tenantID,
      Shortcut: this.state.Shortcut.trim(),
      ShortcutAvailableFor: this.state.ShortcutAvailableFor.trim(),
      MessageDecription: this.state.ShortcutMessageDescription.trim(),
      Tags: this.state.TagForShortcut.trim(),
      CreatedBy: this.state.agentID,
    };
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/CreateShortcutForMessages",
      headers: authHeader(),
      data: inputParams,
    })
      .then(function (res) {
        let Msg = res.data.message;
        if (Msg === "Success") {
          NotificationManager.success("Shortcut created successfully !!");
          this.handleGetAllShortcut();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          NotificationManager.error("Error while creating shortcut ");
        }
      })
      .catch((data) => {
        console.log(data);
      });
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
  handleDeleteShortcut(shortcutID) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/DeleteShortcutMessage",
      headers: authHeader(),
      params: {
        shortcutID: shortcutID,
      },
    })
      .then(function (res) {
        let Msg = res.data.message;
        if (Msg !== "Success") {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordinuse
              : "Record not deleted"
          );
        } else if (Msg === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recorddeletedsuccessfully
              : "Record Deleted Successfully"
          );
          self.handleGetAllShortcut();
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleShortcutModalOpen(data) {
    this.setState({
      ShortcutID: data.shortcutID,
      ShortcutEdit: data.shortcut,
      ShortcutAvailableForEdit: data.availableFor,
      ShortcutMessageDescriptionEdit: data.messageDecription,
      TagForShortcutEdit: data.tags,
      shortcutEditmodel: true,
    });
  }

  handleShortcutModalClose() {
    this.setState({
      shortcutEditmodel: false,
    });
  }

  handleGetShortcutDetailsbyId() {
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetShortcutDetailsByID",
      headers: authHeader(),
      params: {
        shortcutID: 1
      },
    })
      .then(function (res) {
        let Msg = res.data.message;
        let details = res.data.responseData;
        if (Msg === "Success") {
          this.setState({
            shortcutDetails: details
          })
        }
        console.log("diti data", this.state.shortcutDetails);
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleUpdateShortcutBtn() {
    this.setState({
      shortcutEditmodel: false,
    })
    this.handleUpdateShortcut();
  }

  handleUpdateShortcut() {
    let inputData = {
      ShortcutID: this.state.ShortcutID,
      Shortcut: this.state.ShortcutEdit,
      AvailableFor: this.state.ShortcutAvailableForEdit,
      MessageDecription: this.state.ShortcutMessageDescriptionEdit,
      Tags: this.state.TagForShortcutEdit,
      CreatedBy: this.state.agentID,
    }
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/UpdateShortcutMessage",
      headers: authHeader(),
      data: inputData
    })
      .then(function (res) {
        let Msg = res.data.message;
        if (Msg === "Success") {
          NotificationManager.success("Shortcut Updated Succefully !");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        else {
          NotificationManager.error("Error while updating shortcut details.");
        }
      })
  }

  handleGetAssignmentLogic = () => {
    let self = this;
    self.setState({ loading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserAssigmentDetails",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;

        if (status === "Success") {
          self.setState({
            loadbalance: data[0].loadLimit,
            initialLoad: data[0].loadLimit,
          })

          if (data[0].roundlogicRobin) {
            self.setState({ assignmentLogic: "roundRobbin", loading: false });
          }
          else if (data[0].isLoadBalancingApplicable) {
            self.setState({ assignmentLogic: "loadbalancing", loading: false });
          }
          else {
            self.setState({ assignmentLogic: "categoryWise", loading: false });
          }

        } else {
          self.setState({ assignmentLogic: [], loading: false });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };
  handleLoadLImit = (e) => {
    //debugger
    let val = e.target.value
    let numberRegex = new RegExp("^[0-9]\\d*$")
    let loadLimit = numberRegex.test(val)
    if (val >= 0) {
      this.setState({
        loadbalance: val
      })
    }
    // }
    // else {
    //   this.setState({
    //     loadbalance: this.state.loadbalance

    //   })
    // }


  }

  handleChangeAssignmentLogic = () => {
    let logic = this.state.assignmentLogic;
    let inputData = {
      RoundlogicRobin: logic === "roundRobbin" ? true : false,
      CategoryWise: logic === "categoryWise" ? true : false,
      isLoadBalancingApplicable: logic === "loadbalancing" ? true : false,
      loadLimit: logic === "loadbalancing" ? this.state.loadbalance : this.state.initialLoad


    };
    if (logic === "loadbalancing" && this.state.loadbalance <= 0) {
      NotificationManager.error("Ticket limit can not be 0 ")
    }
    else {

      axios({
        method: "post",
        url: config.apiUrl + "/User/EditUserAssigmentDetails",
        headers: authHeader(),
        data: inputData,
      })
        .then((response) => {
          let msg = response.data.message;
          if (msg === "Success") {
            NotificationManager.success("Ticket Assignment Logic Changed");
          } else {
            NotificationManager.success(
              "Could Not Change Ticket Assignment Logic"
            );
          }
        })
        .catch((error) => {
          console.log(error);
          NotificationManager.success("Sorry, We had An Error");
        });
    }
  };

  handleLogicChange = (e) => {
    let logic = e.target.value;
    this.setState({ assignmentLogic: logic });
    // this.handleChangeAssignmentLogic(logic);
  };
  handleFeaturesList = () => {
    let self = this
    axios({
      method: "GET",
      url: config.apiUrl + "/Master/GetFeaturesOption",
      headers: authHeader()

    }).then(function (res) {
      let statusCode = res.data.statusCode
      if (statusCode === 200) {
        self.setState({
          featureAvaibleList: res.data.responseData
        })
      }
    }).catch((e) => {
      console.log(e)
    })
  }
  handleUpdateFeaturesList = async (e, i) => {
    console.log("i", i)
    let columnValue = e.columnValue
    this.handleFeaturesList();
    this.setState({
      selectedModuleIndex: i
    })
    await axios({
      method: "POST",
      url: config.apiUrl + "/Master/UpdateFeaturesOptions",
      headers: authHeader(),
      data: {
        tenant_ColumnName: e.tenant_ColumnName,
        type: e.type,
        columnValue: columnValue === "1" ? "0" : columnValue === "0" ? "1" : columnValue
      }

    }).then(function (res) {
      let statusCode = res.data.statusCode
      if (statusCode === 200) {

        NotificationManager.success("Feature Updated Successfully")

      }
    }).catch((e) => {
      console.log(e)
    })
  }
  handleModalWorkingHours = (e) => {
    let self = this
    this.handleGetSlaConfiguration();
    self.setState({
      ismodalworking: true
    })


  }
  handleModalWorkingHoursClose = () => {
    let self = this
    self.setState({
      ismodalworking: false
    })



  }
  handleWorkinginput = (event) => {

    const { checked, id, value } = event.currentTarget;
    debugger
    let SelArrEle = this.state.daysArray.findIndex((ele) => ele?.id === parseInt(id));
    if (this.state.daysArray[SelArrEle].isCheck === true) {
      this.state.daysArray[SelArrEle].isCheck = false;
    } else {
      this.state.daysArray[SelArrEle].isCheck = true;
    }
    this.setState({
      selectedWorking: checked
        ? [...this.state.selectedWorking, this.state.daysArray[SelArrEle].value]
        : this.state.selectedWorking.filter((val) => val !== this.state.daysArray[SelArrEle].value),
    });


  }

  handleGetSlaConfiguration = () => {
    let self = this
    axios({
      method: "GET",
      headers: authHeader(),
      url: config.apiUrl + "/CRMRole/GetSLAConfiguration",

    }).then(function (res) {
      let statusCode = res.data.statusCode
      if (statusCode === 200) {
        let startSLA = res.data.responseData.slaStartTime
        let endSLA = res.data.responseData.slaEndTime
        // Map over the daysArray to update isCheck property for matching values
        let isCheckedArr = self.state.daysArray.map(day => ({
          ...day,
          isCheck: res.data.responseData.nonWorkingDay.split(",").includes(day.value) // Set isCheck to true if myDays includes the day's value
        }));
        self.setState({
          getSLaNonworking: res.data.responseData.nonWorkingDay.split(","),
          selectedWorking: res.data.responseData.nonWorkingDay.split(","),
          daysArray: isCheckedArr,
          startTime: startSLA,
          endTime: endSLA
        })

      }
      else {
        NotificationManager.error(res.data.message)
      }
    })
      .catch((e) => {
        console.log(e)
      })
  }
  handleUpdateSlaConfiguration = () => {
    let self = this

    if (this.state.startTime.length === 0) {
      NotificationManager.error("Please Select Start Time")

    }
    else if (this.state.endTime.length === 0) {
      NotificationManager.error("Please Select End Time")

    }
    else {
      axios({
        method: "POST",
        headers: authHeader(),
        url: config.apiUrl + "/CRMRole/UpdateSlaConfiguration",
        data: {
          slaStartTime: this.state.startTime,
          slaEndTime: this.state.endTime,
          nonWorkingDay: this.state.selectedWorking.toString()
        }
      }).then(function (res) {
        let statusCode = res.data.statusCode
        if (statusCode === 200) {
          NotificationManager.success("Your Non WorkingDays Updated")
          self.setState({
            ismodalworking: false

          })

        }
        else {
          NotificationManager.error(res.data.message)
        }
      })
        .catch((e) => {
          console.log(e)
        })

    }

  }
  handleStartEndTimeWorking = (e) => {
    // debugger
    let self = this
    let name = e.target.name
    let value = e.target.value
    let newval = value + ":" + "00"
    console.log("newval", newval)
    if (name === "start") {
      self.setState({
        startTime: newval

      })


    }
    else if (name === "end") {

      self.setState({
        endTime: newval

      })

    }
  }

  render() {
    console.log("daysArray==", this.state.daysArray);
    console.log("this.state.selectedWorking==", this.state.selectedWorking)
    console.log("this.state.getSLaNonworking==", this.state.getSLaNonworking)
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.setting
              : "Settings"}
          </Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.a.ticketing
              : "Ticketing"}
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            {TranslationContext !== undefined
              ? TranslationContext.strong.modules
              : "Modules"}
          </Link>
        </div>

        <div className="Store-paddmodule">
          <div className="module-tabs">
            <section>
              {this.state.modulesNames.length > 0 ? (
                <Tabs
                  onSelect={(index, label) => this.onModulesChange(label)}
                  selected={this.state.selTab}
                >
                  {this.state.modulesNames.length > 0
                    ? this.state.modulesNames.map((name, i) =>
                      name.moduleID === 10 ? (
                        <Tab label={name.moduleName} key={i}>
                          <Button
                            type="primary"
                            style={{ marginBottom: "10px" }}
                            loading={this.state.isLoading}
                            onClick={this.handleUpdateTicketFields.bind(this)}
                          >
                            Save
                          </Button>
                          {this.state.loading ? (
                            <div className="loader-icon-cntr">
                              <div className="loader-icon"></div>
                            </div>
                          ) : (
                            <Table
                              columns={[
                                {
                                  dataIndex: "fieldName",
                                  title: "Field Name",
                                },
                                {
                                  dataIndex: "displayEnglishName",
                                  title: "	Display English Name",
                                  render: (item, row) => {
                                    return (
                                      <input
                                        value={row.displayEnglishName}
                                        onChange={this.handleTicketFieldInputChange.bind(
                                          this,
                                          row,
                                          "displayEnglishName"
                                        )}
                                      />
                                    );
                                  },
                                },
                                {
                                  dataIndex: "displayHindiName",
                                  title: "	Display Hindi Name",
                                  render: (item, row) => {
                                    return (
                                      <input
                                        value={row.displayHindiName}
                                        onChange={this.handleTicketFieldInputChange.bind(
                                          this,
                                          row,
                                          "displayHindiName"
                                        )}
                                      />
                                    );
                                  },
                                },
                                {
                                  dataIndex: "fieldMandatory",
                                  title: "Field Mandatory",
                                  render: (item, row) => {
                                    return (
                                      <Switch
                                        checkedChildren="Yes"
                                        unCheckedChildren="No"
                                        checked={
                                          !row.createPage ||
                                            !row.listPage ||
                                            !row.detailsPage
                                            ? false
                                            : row.fieldMandatory
                                        }
                                        onChange={this.handleTicketFieldChange.bind(
                                          this,
                                          row,
                                          "fieldMandatory"
                                        )}
                                      />
                                    );
                                  },
                                },
                                {
                                  dataIndex: "createPage",
                                  title: " Create Page",
                                  render: (item, row) => {
                                    return (
                                      <Switch
                                        checkedChildren="Yes"
                                        unCheckedChildren="No"
                                        checked={row.createPage}
                                        onChange={this.handleTicketFieldChange.bind(
                                          this,
                                          row,
                                          "createPage"
                                        )}
                                      />
                                    );
                                  },
                                },
                                {
                                  dataIndex: "listPage",
                                  title: "List Page",
                                  render: (item, row) => {
                                    return (
                                      <Switch
                                        checkedChildren="Yes"
                                        unCheckedChildren="No"
                                        checked={row.listPage}
                                        onChange={this.handleTicketFieldChange.bind(
                                          this,
                                          row,
                                          "listPage"
                                        )}
                                      />
                                    );
                                  },
                                },
                                {
                                  dataIndex: "detailsPage",
                                  title: "Details Page",
                                  render: (item, row) => {
                                    return (
                                      <Switch
                                        checkedChildren="Yes"
                                        unCheckedChildren="No"
                                        checked={row.detailsPage}
                                        onChange={this.handleTicketFieldChange.bind(
                                          this,
                                          row,
                                          "detailsPage"
                                        )}
                                      />
                                    );
                                  },
                                },
                                {
                                  dataIndex: "reportDownload",
                                  title: "Report Download",
                                  render: (item, row) => {
                                    return (
                                      <Switch
                                        checkedChildren="Yes"
                                        unCheckedChildren="No"
                                        checked={row.reportDownload}
                                        onChange={this.handleTicketFieldChange.bind(
                                          this,
                                          row,
                                          "reportDownload"
                                        )}
                                      />
                                    );
                                  },
                                },
                              ]}
                              dataSource={this.state.ticketFields}
                            />
                          )}
                        </Tab>
                      ) : name.moduleID === 11 ? (
                        <Tab
                          label={name.moduleName}
                          key={name.moduleID}
                          className="logout-time-tab"
                        >
                          <div className="configure-logout-time ">
                            <label className="conf-inac">
                              Inactive Time :{" "}
                            </label>
                            <div className="logout-time-input-div">
                              <div>
                                <input
                                  name="number"
                                  // value={this.state.number}
                                  value={
                                    this.state.isEdit
                                      ? this.state.editUser.logOutTime
                                      : this.state.number
                                  }
                                  onChange={this.filterNumberChange.bind(
                                    this
                                  )}
                                  type="text"
                                  className="conf-text mr-3"
                                  placeholder="Enter Time"
                                  autoComplete="off"
                                />
                                {this.state.errors.numberLength && (
                                  <p style={{ color: "red" }}>
                                    {this.state.errors.numberLength}
                                  </p>
                                )}
                                {this.state.editErrors.numberEditLength && (
                                  <p style={{ color: "red" }}>
                                    {this.state.editErrors.numberEditLength}
                                  </p>
                                )}
                                {this.state.errors.numberSpecialChar && (
                                  <p style={{ color: "red" }}>
                                    {this.state.errors.numberSpecialChar}
                                  </p>
                                )}
                                {this.state.editErrors
                                  .numberEditSpecialChar && (
                                    <p style={{ color: "red" }}>
                                      {
                                        this.state.editErrors
                                          .numberEditSpecialChar
                                      }
                                    </p>
                                  )}
                              </div>

                              <div>
                                <select
                                  //  value={this.state.selectValue}
                                  value={
                                    this.state.isEdit
                                      ? this.state.editUser.logOutHours
                                      : this.state.selectValue
                                  }
                                  onChange={this.handleSelectChange.bind(
                                    this
                                  )}
                                  className="conf-drop"
                                >
                                  <option disabled value="">
                                    {" "}
                                    Select time{" "}
                                  </option>
                                  <option value="hr">Hours</option>
                                  <option value="min">Minutes</option>
                                </select>
                                {this.state.errors.selectValueLength && (
                                  <p style={{ color: "red" }}>
                                    {this.state.errors.selectValueLength}
                                  </p>
                                )}
                                {this.state.editErrors
                                  .selectValueEditLength && (
                                    <p style={{ color: "red" }}>
                                      {
                                        this.state.editErrors
                                          .selectValueEditLength
                                      }
                                    </p>
                                  )}
                              </div>
                            </div>

                            <div className="logout-time-button-div mt-3">
                              {this.state.isEdit ? (
                                <Button
                                  type="primary"
                                  onClick={this.handleConfigureInputEdit.bind(
                                    this
                                  )}
                                >
                                  Edit
                                </Button>
                              ) : (
                                <Button
                                  disabled={
                                    this.state.configureLogoutData.length >
                                    0 && true
                                  }
                                  className={
                                    this.state.configureLogoutData.length ===
                                      0
                                      ? "save-mod-btn"
                                      : "save-mod-btn-disabled"
                                  }
                                  // type="primary"
                                  onClick={this.handleConfigureInput.bind(
                                    this
                                  )}
                                >
                                  Save
                                </Button>
                              )}
                            </div>
                          </div>
                          <div className="table-conatiner">
                            <Table
                              style={{ width: "600px" }}
                              columns={[
                                {
                                  dataIndex: "logOutTime",
                                  title: " Unit Value",
                                  render: (item, row) => {
                                    return <div>{row.logOutTime}</div>;
                                  },
                                },
                                {
                                  dataIndex: "logOutHours",
                                  title: "Hrs/Mins",
                                  render: (item, row) => {
                                    return <div>{row.logOutHours}</div>;
                                  },
                                },
                                {
                                  title: " Actions",
                                  render: (item, row) => {
                                    return (
                                      <div className="d-flex">
                                        <img
                                          className="del-btn-mod"
                                          src={RedDeleteIcon}
                                          alt=""
                                          onClick={() =>
                                            this.handleDelTime(item.logoutId)
                                          }
                                        />

                                        <button
                                          className="react-tabel-button editre"
                                          onClick={() =>
                                            this.handleEditTime(item)
                                          }
                                        >
                                          EDIT
                                        </button>
                                      </div>
                                    );
                                  },
                                },
                              ]}
                              dataSource={this.state.configureLogoutData}
                            />
                          </div>
                        </Tab>
                      ) : name.moduleID === 12 ? (
                        <Tab
                          label={name.moduleName}
                          key={name.moduleID}
                          className="logout-time-tab"
                        >
                          <div className="chat-module-subtabs">
                            <Tabs
                              onSelect={(index, label) => {
                                this.handleTabChange(label);
                              }}
                              selected={this.state.selectedTab}
                            >
                              <Tab
                                label={
                                  TranslationContext !== undefined
                                    ? TranslationContext.label.chat
                                    : "Chat"
                                }
                              >
                                <div className="row chattab-card">
                                  <div className="col-md-12">
                                    <div
                                      className="card"
                                      style={{
                                        padding: "35px",
                                        height: "auto",
                                      }}
                                    >
                                      <div className="chat-drop-down">
                                        <div
                                          className="row"
                                          style={{
                                            width: "100%",
                                            margin: "0",
                                          }}
                                        >
                                          <div className="col-md-3">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.div
                                                .programcode
                                              : "Program Code"}
                                          </div>
                                          <div className="col-md-3">
                                            <Select
                                              showArrow={true}
                                              style={{
                                                width: "100%",
                                                marginBottom: "10px",
                                              }}
                                              placeholder={
                                                TranslationContext !==
                                                  undefined
                                                  ? TranslationContext
                                                    .placeholder
                                                    .selectprogramcode
                                                  : "Select program code"
                                              }
                                              value={this.state.programCode}
                                              disabled={true}
                                            >
                                              <Option
                                                value={this.state.programCode}
                                              >
                                                {this.state.programCode}
                                              </Option>
                                            </Select>
                                          </div>
                                          <div className="col-md-3"></div>
                                          <div className="col-md-3"></div>
                                        </div>
                                      </div>

                                      <div
                                        className="row"
                                        style={{ width: "100%", margin: "0" }}
                                      >
                                        <div className="col-md-3">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.div
                                              .agentchatsessiontimeout
                                            : "Agent Chat Session Time Out"}
                                        </div>
                                        <div className="col-md-3">
                                          <div className="chattxtdivcus">
                                            <input
                                              type="text"
                                              className="chatsetngtxt"
                                              placeholder={
                                                TranslationContext !==
                                                  undefined
                                                  ? TranslationContext
                                                    .placeholder.entervalue
                                                  : "Enter value"
                                              }
                                              name="agentChatSessionValue"
                                              onChange={this.handleOnChange.bind(
                                                this
                                              )}
                                              value={
                                                this.state
                                                  .agentChatSessionValue
                                              }
                                              maxLength={2}
                                            />
                                            <Select
                                              showArrow={true}
                                              defaultValue="M"
                                              style={{ marginLeft: "10px" }}
                                              name="agentChatSessionDuration"
                                              onChange={this.handleAgentSessionDuration.bind(
                                                this
                                              )}
                                              value={
                                                this.state
                                                  .agentChatSessionDuration
                                              }
                                            >
                                              <Option value="M">
                                                {TranslationContext !==
                                                  undefined
                                                  ? TranslationContext.option
                                                    .m
                                                  : "M"}
                                              </Option>
                                              <Option value="H">
                                                {TranslationContext !==
                                                  undefined
                                                  ? TranslationContext.option
                                                    .h
                                                  : "H"}
                                              </Option>
                                              <Option value="D">
                                                {TranslationContext !==
                                                  undefined
                                                  ? TranslationContext.option
                                                    .d
                                                  : "D"}
                                              </Option>
                                            </Select>
                                            <Popover
                                              content={<></>}
                                              placement="bottom"
                                            >
                                              <img
                                                className="info-icon-cp"
                                                style={{
                                                  visibility: "hidden",
                                                }}
                                                src={BlackInfoIcon}
                                                alt="info-icon"
                                              />
                                            </Popover>
                                          </div>
                                        </div>
                                        <div className="col-md-3"></div>
                                        <div className="col-md-3"></div>
                                      </div>
                                      <div
                                        className="row"
                                        style={{ width: "100%", margin: "0" }}
                                      >
                                        <div className="col-md-3">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.div
                                              .customerchatsessiontimeout
                                            : "Customer Chat Session Time Out"}
                                        </div>
                                        <div className="col-md-3">
                                          <div className="chattxtdivcus">
                                            <input
                                              type="text"
                                              className="chatsetngtxt"
                                              placeholder={
                                                TranslationContext !==
                                                  undefined
                                                  ? TranslationContext
                                                    .placeholder.entervalue
                                                  : "Enter value"
                                              }
                                              name="customerChatSessionValue"
                                              onChange={this.handleOnChange.bind(
                                                this
                                              )}
                                              value={
                                                this.state
                                                  .customerChatSessionValue
                                              }
                                              maxLength={2}
                                            />
                                            <Select
                                              showArrow={true}
                                              defaultValue="M"
                                              style={{ marginLeft: "10px" }}
                                              name="customerChatSessionDuration"
                                              onChange={this.handleCustomerSessionDuration.bind(
                                                this
                                              )}
                                              value={
                                                this.state
                                                  .customerChatSessionDuration
                                              }
                                            >
                                              <Option value="M">
                                                {TranslationContext !==
                                                  undefined
                                                  ? TranslationContext.option
                                                    .m
                                                  : "M"}
                                              </Option>
                                              <Option value="H">
                                                {TranslationContext !==
                                                  undefined
                                                  ? TranslationContext.option
                                                    .h
                                                  : "H"}
                                              </Option>
                                              <Option value="D">
                                                {TranslationContext !==
                                                  undefined
                                                  ? TranslationContext.option
                                                    .d
                                                  : "D"}
                                              </Option>
                                            </Select>
                                            <Popover
                                              content={
                                                <>
                                                  {" "}
                                                  {TranslationContext !==
                                                    undefined
                                                    ? TranslationContext
                                                      .content
                                                      .howmanydaystoshowchathistory
                                                    : "How many days to show chat history."}
                                                </>
                                              }
                                              placement="bottom"
                                            >
                                              <img
                                                className="info-icon-cp"
                                                style={{
                                                  visibility: "hidden",
                                                }}
                                                src={BlackInfoIcon}
                                                alt="info-icon"
                                              />
                                            </Popover>
                                          </div>
                                        </div>
                                        <div className="col-md-3"></div>
                                        <div className="col-md-3"></div>
                                      </div>

                                      <div
                                        className="row"
                                        style={{ width: "100%", margin: "0" }}
                                      >
                                        <div className="col-md-3">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.div
                                              .historicalchattime
                                            : "Historical Chat Time"}
                                        </div>
                                        <div className="col-md-3">
                                          <div className="chattxtdivcus">
                                            <input
                                              type="text"
                                              className="chatsetngtxt"
                                              placeholder={"Enter value"}
                                              onChange={this.handleOnChange.bind(
                                                this
                                              )}
                                              value={
                                                this.state.chatDisplayValue
                                              }
                                              maxLength={2}
                                              name="chatDisplayValue"
                                            />
                                            <Select
                                              showArrow={true}
                                              defaultValue="D"
                                              style={{ marginLeft: "10px" }}
                                              onChange={this.handleChatDisplayDurationHour.bind(
                                                this
                                              )}
                                              value={
                                                this.state
                                                  .chatDisplayDurationHour
                                              }
                                            >
                                              <Option value="M">{"M"}</Option>
                                              <Option value="H">{"H"}</Option>
                                              <Option value="D">{"D"}</Option>
                                            </Select>
                                            <Popover
                                              content={
                                                <>
                                                  {
                                                    "How many days to show chat history."
                                                  }
                                                </>
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
                                        </div>
                                        <div className="col-md-3"></div>
                                        <div className="col-md-3"></div>
                                      </div>

                                      {/* <div
                                          className="row"
                                          style={{ width: "100%", margin: "0" }}
                                        >
                                          <div className="col-md-3">
                                            {
                                              "Set Limit Type box of Chat Window"
                                            }
                                          </div>
                                          <div className="col-md-3">
                                            <input
                                              type="text"
                                              className="chatsetngtxt"
                                              placeholder={"Enter value"}
                                              name="limitText"
                                              onChange={this.handleOnChange.bind(
                                                this
                                              )}
                                              value={this.state.limitText}
                                              // maxLength={3}
                                            />
                                          </div>
                                          <div className="col-md-3"></div>
                                          <div className="col-md-3"></div>
                                        </div> */}

                                      {/* <div
                                          className="row"
                                          style={{ width: "100%", margin: "0" }}
                                        >
                                          <div className="col-md-3">
                                            Customer Profile in Chat Window
                                          </div>
                                          <div className="col-md-3">
                                            <div className="module-switch crm-margin-div crm-padding-div">
                                              <div className="switch switch-primary d-inline m-r-10">
                                                <input
                                                  type="checkbox"
                                                  id="isCustomerProfile"
                                                  name="isCustomerProfile"
                                                  checked={
                                                    this.state.isCustomerProfile
                                                  }
                                                  onChange={this.handleRadioButtonChange.bind(
                                                    this
                                                  )}
                                                />
                                                <label
                                                  htmlFor="isCustomerProfile"
                                                  className="cr cr-float-right"
                                                ></label>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-md-3"></div>
                                          <div className="col-md-3"></div>
                                        </div> */}

                                      {/* <div
                                          className="row"
                                          style={{ width: "100%", margin: "0" }}
                                        >
                                          <div className="col-md-3">
                                            Customer Product Tab in Chat Window
                                          </div>
                                          <div className="col-md-3">
                                            <div className="module-switch crm-margin-div crm-padding-div">
                                              <div className="switch switch-primary d-inline m-r-10">
                                                <input
                                                  type="checkbox"
                                                  id="isCustomerProduct"
                                                  name="isCustomerProduct"
                                                  checked={
                                                    this.state.isCustomerProduct
                                                  }
                                                  onChange={this.handleRadioButtonChange.bind(
                                                    this
                                                  )}
                                                />
                                                <label
                                                  htmlFor="isCustomerProduct"
                                                  className="cr cr-float-right"
                                                ></label>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-md-3"></div>
                                          <div className="col-md-3"></div>
                                        </div> */}

                                      {/* <div
                                          className="row"
                                          style={{ width: "100%", margin: "0" }}
                                        >
                                          <div className="col-md-3">
                                            Message Tab in Chat Window
                                          </div>
                                          <div className="col-md-3">
                                            <div className="module-switch crm-margin-div crm-padding-div">
                                              <div className="switch switch-primary d-inline m-r-10">
                                                <input
                                                  type="checkbox"
                                                  id="isMessageTabActive"
                                                  name="isMessageTabActive"
                                                  onChange={this.handleRadioButtonChange.bind(
                                                    this
                                                  )}
                                                  checked={
                                                    this.state
                                                      .isMessageTabActive
                                                  }
                                                />
                                                <label
                                                  htmlFor="isMessageTabActive"
                                                  className="cr cr-float-right"
                                                ></label>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-md-3"></div>
                                          <div className="col-md-3"></div>
                                        </div> */}
                                      {/* <div
                                          className="row"
                                          style={{ width: "100%", margin: "0" }}
                                        >
                                          <div className="col-md-3">
                                            Card Tab in Chat Window
                                          </div>
                                          <div className="col-md-1">
                                            <div className="module-switch crm-margin-div crm-padding-div">
                                              <div className="switch switch-primary d-inline m-r-10">
                                                <input
                                                  type="checkbox"
                                                  id="isCardTabActive"
                                                  name="isCardTabActive"
                                                  onChange={this.handleRadioButtonChange.bind(
                                                    this
                                                  )}
                                                  checked={
                                                    this.state.isCardTabActive
                                                  }
                                                />
                                                <label
                                                  htmlFor="isCardTabActive"
                                                  className="cr cr-float-right"
                                                ></label>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-md-3">
                                            Card Search With Store Code
                                          </div>
                                          <div className="col-md-5">
                                            <div className="module-switch crm-margin-div crm-padding-div">
                                              <div className="switch switch-primary d-inline m-r-10">
                                                <input
                                                  type="checkbox"
                                                  id="cardSearchStoreCode"
                                                  name="cardSearchStoreCode"
                                                  // onChange={this.handleRadioButtonChange.bind(
                                                  //   this
                                                  // )}
                                                  checked={
                                                    this.state
                                                      .cardSearchStoreCode
                                                  }
                                                />
                                                <label
                                                  htmlFor="cardSearchStoreCode"
                                                  className="cr cr-float-right"
                                                ></label>
                                              </div>
                                            </div>
                                          </div>
                                        </div> */}
                                      {/* <div
                                          className="row"
                                          style={{ width: "100%", margin: "0" }}
                                        >
                                          <div className="col-md-3">
                                            Reccomended List Tab in Chat Window
                                          </div>
                                          <div className="col-md-3">
                                            <div className="module-switch crm-margin-div crm-padding-div">
                                              <div className="switch switch-primary d-inline m-r-10">
                                                <input
                                                  type="checkbox"
                                                  id="isRecommendedListTabActive"
                                                  name="isRecommendedListTabActive"
                                                  onChange={this.handleRadioButtonChange.bind(
                                                    this
                                                  )}
                                                  checked={
                                                    this.state
                                                      .isRecommendedListTabActive
                                                  }
                                                />
                                                <label
                                                  htmlFor="isRecommendedListTabActive"
                                                  className="cr cr-float-right"
                                                ></label>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-md-3"></div>
                                          <div className="col-md-3"></div>
                                        </div> */}
                                      {/* <div
                                          className="row"
                                          style={{ width: "100%", margin: "0" }}
                                        >
                                          <div className="col-md-3">
                                            Schedual Visit Tab in Chat Window
                                          </div>
                                          <div className="col-md-3">
                                            <div className="module-switch crm-margin-div crm-padding-div">
                                              <div className="switch switch-primary d-inline m-r-10">
                                                <input
                                                  type="checkbox"
                                                  id="isScheduleVisitTabActive"
                                                  name="isScheduleVisitTabActive"
                                                  onChange={this.handleRadioButtonChange.bind(
                                                    this
                                                  )}
                                                  checked={
                                                    this.state
                                                      .isScheduleVisitTabActive
                                                  }
                                                />
                                                <label
                                                  htmlFor="isScheduleVisitTabActive"
                                                  className="cr cr-float-right"
                                                ></label>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-md-3"></div>
                                          <div className="col-md-3"></div>
                                        </div> */}
                                      {/* <div
                                          className="row"
                                          style={{ width: "100%", margin: "0" }}
                                        >
                                          <div className="col-md-3">
                                            Generate Payment Link Tab in Chat
                                            Window
                                          </div>
                                          <div className="col-md-3">
                                            <div className="module-switch crm-margin-div crm-padding-div">
                                              <div className="switch switch-primary d-inline m-r-10">
                                                <input
                                                  type="checkbox"
                                                  id="isPaymentLinkTabActive"
                                                  name="isPaymentLinkTabActive"
                                                  onChange={this.handleRadioButtonChange.bind(
                                                    this
                                                  )}
                                                  checked={
                                                    this.state
                                                      .isPaymentLinkTabActive
                                                  }
                                                />
                                                <label
                                                  htmlFor="isPaymentLinkTabActive"
                                                  className="cr cr-float-right"
                                                ></label>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-md-3"></div>
                                          <div className="col-md-3"></div>
                                        </div> */}
                                      <div
                                        className="row"
                                        style={{ width: "100%", margin: "0" }}
                                      >
                                        <div className="col-md-3">
                                          Grammarly Check
                                        </div>
                                        <div className="col-md-3">
                                          <div className="module-switch crm-margin-div crm-padding-div">
                                            <div className="switch switch-primary d-inline m-r-10">
                                              <input
                                                type="checkbox"
                                                id="isgrammarlyCheck"
                                                name="isgrammarlyCheck"
                                                onChange={this.handleRadioButtonChange.bind(
                                                  this
                                                )}
                                                checked={
                                                  this.state.isgrammarlyCheck
                                                }
                                              />
                                              <label
                                                htmlFor="isgrammarlyCheck"
                                                className="cr cr-float-right"
                                              ></label>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="col-md-3"></div>
                                        <div className="col-md-3"></div>
                                      </div>
                                      {/* ------------------------------------ */}

                                      {/* <div
                                          className="row"
                                          style={{ width: "100%", margin: "0" }}
                                        >
                                          <div className="col-md-3">
                                            Video Call Appointment Tab
                                          </div>
                                          <div className="col-md-3">
                                            <div className="module-switch crm-margin-div crm-padding-div">
                                              <div className="switch switch-primary d-inline m-r-10">
                                                <input
                                                  type="checkbox"
                                                  id="isVideoCallAppointment"
                                                  name="isVideoCallAppointment"
                                                  // onChange={this.handleRadioButtonChange.bind(
                                                  //   this
                                                  // )}
                                                   checked={this.state.isVideoCallAppointment}
                                                />
                                                <label
                                                  htmlFor="isVideoCallAppointment"
                                                  className="cr cr-float-right"
                                                ></label>
                                              </div>
                                            </div>
                                          </div>
                                          <div className="col-md-3"></div>
                                          <div className="col-md-3"></div>
                                        </div> */}
                                      {/* ---------------StoreStaff comment in profile configurable--------------------- */}
                                      {/* <div
                                          className="row"
                                          style={{ width: "100%", margin: "0" }}
                                        >
                                          <div className="col-md-3">
                                            StoreStaff Comment In Profile
                                          </div>
                                          <div className="col-md-3">
                                            <div className="module-switch crm-margin-div crm-padding-div">
                                              <div className="switch switch-primary d-inline m-r-10">
                                                <input
                                                  type="checkbox"
                                                  id="isStoreStaffCommentInProfile"
                                                  name="isStoreStaffCommentInProfile"
                                                  // onChange={this.handleRadioButtonChange.bind(
                                                  //   this
                                                  // )}
                                                  checked={
                                                    this.state
                                                      .isStoreStaffCommentInProfile
                                                  }
                                                />
                                                <label
                                                  htmlFor="isStoreStaffCommentInProfile"
                                                  className="cr cr-float-right"
                                                ></label>
                                              </div>
                                            </div>
                                          </div>
                                        </div> */}
                                      <div
                                        className="row"
                                        style={{ width: "100%", margin: "0" }}
                                      >
                                        <div className="col-md-3"></div>
                                        <div className="col-md-3">
                                          <div>
                                            <button
                                              className="butn"
                                              type="button"
                                              onClick={this.handleSubmit.bind(
                                                this
                                              )}
                                            >
                                              {"SUBMIT"}
                                            </button>
                                          </div>
                                        </div>
                                        <div className="col-md-3"></div>
                                        <div className="col-md-3"></div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Tab>
                              <Tab
                                id="chat-sub-tabss"
                                label={"Banned Visitors"}
                              >
                                <Table
                                  columns={[
                                    {
                                      dataIndex: "customerName",
                                      title: (filters, sortOrder) => (
                                        <span>
                                          {"Customer Name"}
                                          <FontAwesomeIcon
                                            icon={faCaretDown}
                                          />
                                        </span>
                                      ),
                                    },
                                    {
                                      dataIndex: "banID",
                                      title: (filters, sortOrder) => (
                                        <span>
                                          {"Visitor ID"}
                                          <FontAwesomeIcon
                                            icon={faCaretDown}
                                          />
                                        </span>
                                      ),
                                    },
                                    {
                                      dataIndex: "chatID",
                                      title: (filters, sortOrder) => (
                                        <span>
                                          {"Chat ID"}
                                          <FontAwesomeIcon
                                            icon={faCaretDown}
                                          />
                                        </span>
                                      ),
                                    },
                                    {
                                      dataIndex: "lastChatOn",
                                      title: (filters, sortOrder) => (
                                        <span>
                                          {"Chat Date & Time"}
                                          <FontAwesomeIcon
                                            icon={faCaretDown}
                                          />
                                        </span>
                                      ),
                                    },
                                    {
                                      dataIndex: "banReason",
                                      title: (filters, sortOrder) => (
                                        <span>
                                          {"Banned Reason"}
                                          <FontAwesomeIcon
                                            icon={faCaretDown}
                                          />
                                        </span>
                                      ),
                                    },
                                    {
                                      dataIndex: "bannedTill",
                                      title: (filters, sortOrder) => (
                                        <span>
                                          {"Banned Till Date"}
                                          <FontAwesomeIcon
                                            icon={faCaretDown}
                                          />
                                        </span>
                                      ),
                                    },
                                    {
                                      dataIndex: "Action",
                                      title: "Action",
                                      render: (row, data) => {
                                        return (
                                          <div>
                                            <button
                                              type="button"
                                              className={`butn`}
                                              onClick={this.handleRemoveBanOnCustomer.bind(
                                                this,
                                                data.banID
                                              )}
                                            //style={{ display: `${this.state.displayActionButton}`, }}
                                            >
                                              <label
                                                //className="myticket-submit-solve-button-text"
                                                style={{ display: "inline" }}
                                              >
                                                {"REMOVE BAN"}
                                              </label>
                                            </button>
                                          </div>
                                        );
                                      },
                                    },
                                  ]}
                                  dataSource={this.state.bannedChatListData}
                                />
                              </Tab>
                              <Tab
                                style={{ background: "transparent" }}
                                label={"Chat Allowed"}
                              >
                                <div className="divchat-allow">
                                  <label className="chat-allowed-main chat-allowed">
                                    {"Chat Allowed per Agent"}
                                  </label>
                                  <input
                                    className="chat-allowed-sel-input chat-allowed-dropdwn"
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    min="1"
                                    max="100"
                                    value={this.state.ChatAllowedPerAgent}
                                    onChange={this.handleAllowedChatChange.bind(
                                      this
                                    )}
                                  ></input>
                                  {/* <select
                                      id="allowedChatsdropdown"
                                      className="chat-allowed-sel chat-allowed-dropdwn"
                                      value={this.state.ChatAllowedPerAgent}
                                      onChange={this.handleAllowedChatChange.bind(
                                        this
                                      )}
                                    >
                                       <option value="0">Select</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="6">6</option>
                                      <option value="7">7</option>
                                      <option value="8">8</option>
                                      <option value="9">9</option>
                                      <option value="10">10</option> 
                                    </select> */}
                                  <br />
                                  <button
                                    className="butn chat-allow-svbtn"
                                    onClick={this.handleSaveChatAllowedCount.bind(
                                      this
                                    )}
                                  >
                                    SAVE
                                  </button>
                                </div>
                              </Tab>
                              <Tab label={"Shortcut"}>
                                {/* <div className="container-fluid">
                                    <div className="store-settings-cntr settingtable"> */}
                                <div className="row">
                                  <div className="col-md-8">
                                    <div
                                      className="table-cntr table-height TicketUserReact settings-align"
                                      style={{ marginLeft: "2%" }}
                                    >
                                      <Table
                                        columns={[
                                          {
                                            dataIndex: "shortcut",
                                            title: (filters, sortOrder) => (
                                              <span>
                                                {"Shortcut"}
                                                <FontAwesomeIcon
                                                  icon={faCaretDown}
                                                />
                                              </span>
                                            ),
                                          },
                                          {
                                            dataIndex: "messageDecription",
                                            title: (filters, sortOrder) => (
                                              <span>
                                                {"Message"}
                                                <FontAwesomeIcon
                                                  icon={faCaretDown}
                                                />
                                              </span>
                                            ),
                                          },
                                          {
                                            dataIndex: "availableFor",
                                            title: (filters, sortOrder) => (
                                              <span>
                                                {"Available For"}
                                                <FontAwesomeIcon
                                                  icon={faCaretDown}
                                                />
                                              </span>
                                            ),
                                          },
                                          {
                                            dataIndex: "tags",
                                            title: (filters, sortOrder) => (
                                              <span>
                                                {"Tags"}
                                                <FontAwesomeIcon
                                                  icon={faCaretDown}
                                                />
                                              </span>
                                            ),
                                          },
                                          {
                                            dataIndex: "Actions",
                                            title: "Actions",
                                            render: (data, index) => {
                                              var ids = index.shortcutID;
                                              return (
                                                <>
                                                  <span className="settings-align-actions">
                                                    <Popover
                                                      content={
                                                        <div
                                                          className="samdel d-flex general-popover popover-body"
                                                          id={
                                                            "samdel" +
                                                            index.shortcutID
                                                          }
                                                        >
                                                          <div className="del-big-icon">
                                                            <img
                                                              src={DelBigIcon}
                                                              alt="del-icon"
                                                            />
                                                          </div>
                                                          <div>
                                                            <p className="font-weight-bold blak-clr">
                                                              Delete file ?
                                                            </p>
                                                            <p className="mt-1 fs-12">
                                                              Are you sure you
                                                              want to delete
                                                              this tag ?
                                                            </p>
                                                            <div className="del-can">
                                                              <a
                                                                href="#!"
                                                                className="canblue"
                                                                onClick={() =>
                                                                  this.hide(
                                                                    this,
                                                                    "samdel" +
                                                                    index.shortcutID
                                                                  )
                                                                }
                                                              >
                                                                CANCEL
                                                              </a>
                                                              <button
                                                                className="butn"
                                                                type="button"
                                                                onClick={this.handleDeleteShortcut.bind(
                                                                  this,
                                                                  index.shortcutID
                                                                )}
                                                              >
                                                                {TranslationContext !==
                                                                  undefined
                                                                  ? TranslationContext
                                                                    .button
                                                                    .delete
                                                                  : "Delete"}
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
                                                        id={ids}
                                                      />
                                                    </Popover>
                                                    <button
                                                      className="react-tabel-button ReNewBtn"
                                                      type="button"
                                                      onClick={this.handleShortcutModalOpen.bind(
                                                        this,
                                                        index
                                                      )}
                                                    >
                                                      {"EDIT"}
                                                    </button>
                                                  </span>
                                                  <Modal
                                                    onClose={this.handleShortcutModalClose.bind(
                                                      this
                                                    )}
                                                    open={
                                                      this.state
                                                        .shortcutEditmodel
                                                    }
                                                    modalId="CreateCustomer-mdl"
                                                    overlayId="logout-ovrly"
                                                  >
                                                    <div className="mdlcancleImg">
                                                      <img
                                                        src={CancelImg}
                                                        alt="CancelImg"
                                                        className="curshar-pointer"
                                                        onClick={this.handleShortcutModalClose.bind(
                                                          this
                                                        )}
                                                      />
                                                    </div>
                                                    <div className="mainDiv-crt">
                                                      <div className="lbl-mdlHeader">
                                                        <label className="lbl-customerMdl">
                                                          Shortcut Edit
                                                        </label>
                                                      </div>

                                                      <div className="div-cntr">
                                                        <label>
                                                          {TranslationContext !==
                                                            undefined
                                                            ? TranslationContext
                                                              .label
                                                              .username
                                                            : "Shortcut"}
                                                        </label>
                                                        <input
                                                          type="text"
                                                          className={
                                                            "txt-edit-popover"
                                                          }
                                                          name="shortcut"
                                                          onChange={this.handleShortcutUpdateOnChange.bind(
                                                            this
                                                          )}
                                                          value={this.state.ShortcutEdit}
                                                        />
                                                      </div>
                                                      <div className="div-cntr">
                                                        <label>
                                                          {"Available to"}
                                                        </label>
                                                        <select
                                                          className={
                                                            this.state
                                                              .profileReadOnly
                                                              ? "disabled-input add-select-category"
                                                              : "add-select-category"
                                                          }
                                                          name="availableFor"
                                                          onChange={this.handleAvailableForDropdownUpdate.bind(
                                                            this
                                                          )}
                                                          value={this.state.ShortcutAvailableForEdit}
                                                        >
                                                          <option
                                                            value={
                                                              "All Agents"
                                                            }
                                                          >
                                                            {TranslationContext !==
                                                              undefined
                                                              ? TranslationContext
                                                                .option
                                                                .selectdesignation
                                                              : "All Agents"}
                                                          </option>
                                                        </select>
                                                      </div>
                                                      <div className="div-cntr">
                                                        <label className="designation-name">
                                                          {TranslationContext !==
                                                            undefined
                                                            ? TranslationContext
                                                              .label.address
                                                            : "Message"}
                                                        </label>
                                                        <textarea
                                                          cols="31"
                                                          rows="4"
                                                          className="store-create-textarea"
                                                          placeholder={
                                                            TranslationContext !==
                                                              undefined
                                                              ? TranslationContext
                                                                .placeholder
                                                                .enteraddress
                                                              : "Enter Message"
                                                          }
                                                          maxLength={300}
                                                          name="store_Address"
                                                          value={
                                                            this.state
                                                              .ShortcutMessageDescription
                                                          }
                                                          onChange={this.handleMessageUpdateForShortcut.bind(
                                                            this
                                                          )}
                                                        ></textarea>
                                                      </div>
                                                      <div className="div-cntr">
                                                        <label>
                                                          {TranslationContext !==
                                                            undefined
                                                            ? TranslationContext
                                                              .label
                                                              .username
                                                            : "Tags"}
                                                        </label>
                                                        <input
                                                          type="text"
                                                          className={
                                                            "txt-edit-popover"
                                                          }
                                                          value={
                                                            this.state
                                                              .TagForShortcut
                                                          }
                                                          onChange={this.handleTagsUpdateOnChange.bind(
                                                            this
                                                          )}
                                                        />
                                                      </div>
                                                      <div className="btn-coll">
                                                        <button
                                                          //className={"butn"}
                                                          onClick={this.handleUpdateShortcutBtn.bind(this)}
                                                          className="Save-Use"
                                                          style={{
                                                            marginLeft:
                                                              "30px",
                                                          }}
                                                        >
                                                          {"UPDATE"}
                                                        </button>
                                                      </div>
                                                    </div>
                                                  </Modal>
                                                </>
                                              );
                                            },
                                          },
                                        ]}
                                        dataSource={this.state.ShortcutList}
                                      />
                                    </div>
                                  </div>
                                  <div className="col-md-4 cus-drp">
                                    <div className="right-sect-div right-sect-collapse">
                                      <h3>{"Create Shortcut"}</h3>
                                      <div className="div-cntr">
                                        <label>{"Shortcut"}</label>
                                        <input
                                          type="text"
                                          className={"txt-edit-popover"}
                                          name="shortcut"
                                          onChange={this.handleShortcutOnChange.bind(
                                            this
                                          )}
                                        />
                                      </div>
                                      <div className="div-cntr">
                                        <label>{"Available to"}</label>
                                        <select
                                          className={"add-select-category"}
                                          name="availableFor"
                                          onChange={this.handleAvailableForDropdownChange.bind(
                                            this
                                          )}
                                        >
                                          <option value={"All Agents"}>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.option
                                                .selectdesignation
                                              : "All Agents"}
                                          </option>
                                        </select>
                                      </div>
                                      <div className="div-cntr">
                                        <label className="designation-name">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label.address
                                            : "Message"}
                                        </label>
                                        <textarea
                                          cols="31"
                                          rows="4"
                                          className="store-create-textarea"
                                          placeholder={
                                            TranslationContext !== undefined
                                              ? TranslationContext.placeholder
                                                .enteraddress
                                              : "Enter Message"
                                          }
                                          maxLength={300}
                                          name="store_Address"
                                          value={
                                            this.state
                                              .ShortcutMessageDescription
                                          }
                                          onChange={this.handleMessageForShortcut.bind(
                                            this
                                          )}
                                        ></textarea>
                                      </div>
                                      <div className="div-cntr">
                                        <label>
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label
                                              .username
                                            : "Tags"}
                                        </label>
                                        <input
                                          type="text"
                                          className={""}
                                          value={this.state.TagForShortcut}
                                          onChange={this.handleTagsOnChange.bind(
                                            this
                                          )}
                                        />
                                      </div>
                                      <div className="btn-coll">
                                        <button
                                          className={"butn"}
                                          onClick={this.handleSaveShortcut.bind(
                                            this
                                          )}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.label.add
                                            : "SAVE"}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {/* </div>
                                  </div> */}
                              </Tab>
                              <Tab label={"Sounds and Notifications"}>
                                <div
                                  className="row chattab-card"
                                  style={{ marginBottom: "15px" }}
                                >
                                  <div className="col-md-12">
                                    <div
                                      className="card sncheck"
                                      style={{
                                        padding: "35px",
                                        height: "auto",
                                      }}
                                    >
                                      <label className="snlbl-nlbl">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label
                                            .notification
                                          : "Notification"}
                                      </label>
                                      <hr className="sn-hr" />

                                      <label className="sns-lbl">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label
                                            .newchatassigned
                                          : "New Chat Assigned"}
                                      </label>
                                      <Checkbox
                                        name="isNotiNewChat"
                                        checked={this.state.isNotiNewChat}
                                        onChange={this.handleNotificationCheckboxChange.bind(
                                          this
                                        )}
                                      >
                                        {
                                          "Show notifications for new chat assigned"
                                        }
                                      </Checkbox>
                                      <label className="sns-lbl">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label
                                            .newmessages
                                          : "New Messages"}
                                      </label>
                                      <Checkbox
                                        name="isNotiNewMessage"
                                        checked={this.state.isNotiNewMessage}
                                        onChange={this.handleNotificationCheckboxChange.bind(
                                          this
                                        )}
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.checkbox
                                            .shownotificationfornewmessageinongoing
                                          : "Show notification for new message in ongoing"}
                                      </Checkbox>
                                    </div>
                                    <div
                                      className="card"
                                      style={{
                                        padding: "35px",
                                        paddingTop: "0",
                                        height: "auto",
                                      }}
                                    >
                                      <label className="snlbl-nlbl">
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.sounds
                                          : "Sounds"}
                                      </label>
                                      <hr className="sn-hr" />
                                      <div className="row">
                                        <div className="col-md-3">
                                          <label className="sns-lbl">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .newchatassigned
                                              : "New Chat Assigned"}
                                          </label>
                                          <select
                                            className="form-control dropdown-setting"
                                            style={{ marginBottom: "10px" }}
                                            value={this.state.newChatSoundID}
                                            name="newChatSoundID"
                                          >
                                            <option>Select</option>
                                            {this.state.chatSoundData
                                              ? this.state.chatSoundData.map(
                                                (item, i) => {
                                                  return (
                                                    <option
                                                      key={i}
                                                      value={item.soundID}
                                                    >
                                                      {item.soundFileName}
                                                    </option>
                                                  );
                                                }
                                              )
                                              : null}
                                          </select>
                                        </div>
                                        <div className="col-md-4 vlm-ctrl">
                                          <label style={{ paddingLeft: "" }}>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .soundcontroller
                                              : "Sound Controller"}
                                          </label>
                                          <div className="row">
                                            <div
                                              className="col-md-2"
                                              style={{
                                                paddingLeft: "32px",
                                                paddingTop: "23px",
                                              }}
                                            >
                                              <FontAwesomeIcon
                                                icon={faVolumeDown}
                                              />
                                            </div>
                                            <div
                                              className="col-md-8"
                                              style={{ paddingTop: "12px" }}
                                            >
                                              <div className="slider orientation-reversed">
                                                <div className="slider-group">
                                                  <div className="slider-horizontal">
                                                    <Slider
                                                      min={0}
                                                      max={100}
                                                      value={
                                                        this.state
                                                          .newChatSoundVolume
                                                      }
                                                      onChange={
                                                        this
                                                          .handleChatAssingedVolumnChange
                                                      }
                                                      orientation="horizontal"
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              className="col-md-2"
                                              style={{ paddingTop: "23px" }}
                                            >
                                              <FontAwesomeIcon
                                                icon={faVolumeUp}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col-md-3">
                                          <label className="sns-lbl">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .newmessage
                                              : "New Message"}
                                          </label>
                                          <select
                                            className="form-control dropdown-setting"
                                            style={{ marginBottom: "10px" }}
                                            value={
                                              this.state.newMessageSoundID
                                            }
                                            name="newMessageSoundID"
                                          >
                                            <option>Select</option>
                                            {this.state.chatSoundData
                                              ? this.state.chatSoundData.map(
                                                (item, i) => {
                                                  return (
                                                    <option
                                                      key={i}
                                                      value={item.soundID}
                                                    >
                                                      {item.soundFileName}
                                                    </option>
                                                  );
                                                }
                                              )
                                              : null}
                                          </select>
                                        </div>
                                        <div className="col-md-4 vlm-ctrl">
                                          <label style={{ paddingLeft: "" }}>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .soundcontroller
                                              : "Sound Controller"}
                                          </label>
                                          <div className="row">
                                            <div
                                              className="col-md-2"
                                              style={{
                                                paddingLeft: "32px",
                                                paddingTop: "23px",
                                              }}
                                            >
                                              <FontAwesomeIcon
                                                icon={faVolumeDown}
                                              />
                                            </div>
                                            <div
                                              className="col-md-8"
                                              style={{ paddingTop: "12px" }}
                                            >
                                              <div className="slider orientation-reversed">
                                                <div className="slider-group">
                                                  <div className="slider-horizontal">
                                                    <Slider
                                                      min={0}
                                                      max={100}
                                                      value={
                                                        this.state
                                                          .newMessageSoundVolume
                                                      }
                                                      onChange={
                                                        this
                                                          .handleNewMessageVolumnChange
                                                      }
                                                      orientation="horizontal"
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div
                                              className="col-md-2"
                                              style={{ paddingTop: "23px" }}
                                            >
                                              <FontAwesomeIcon
                                                icon={faVolumeUp}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="card"
                                      style={{
                                        padding: "35px",
                                        paddingTop: "0",
                                        height: "auto",
                                      }}
                                    >
                                      <div className="">
                                        <button
                                          onClick={this.handleButtonClick.bind(
                                            this,
                                            1
                                          )}
                                          className={
                                            this.state.buttonClickCSS == 1
                                              ? "butn sn-btn-mr"
                                              : "butn sn-btn-inactive"
                                          }
                                          type="button"
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.button.cancel
                                            : "CANCEL"}
                                        </button>
                                        <button
                                          onClick={this.handleButtonClick.bind(
                                            this,
                                            2
                                          )}
                                          className={
                                            this.state.buttonClickCSS == 2
                                              ? "butn sn-btn-mr"
                                              : "butn sn-btn-inactive"
                                          }
                                          type="button"
                                          disabled={this.state.isloading}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.button
                                              .resetdefault
                                            : "RESET DEFAULT"}
                                        </button>
                                        <button
                                          onClick={this.handleButtonClick.bind(
                                            this,
                                            3
                                          )}
                                          className={
                                            this.state.buttonClickCSS == 3
                                              ? "butn sn-btn-mr"
                                              : "butn sn-btn-inactive"
                                          }
                                          type="button"
                                          disabled={this.state.isloading}
                                        >
                                          {TranslationContext !== undefined
                                            ? TranslationContext.button
                                              .savechanges
                                            : "SAVE CHANGES"}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* <div className="sounds-btn">
                            <div>
                              <button className="butn mt-3">END CHAT</button>
                            </div>
                            <div>
                              <button className="butn mt-3 circle-lined">
                                CREATE TICKET AND END CHAT
                              </button>
                            </div>
                            <div>
                              <button className="butn mt-3 circle-lined">
                                CANCEL
                              </button>
                            </div>
                          </div> */}
                              </Tab>
                            </Tabs>
                          </div>
                        </Tab>
                      ) : name.moduleID === 13 ? (
                        <Tab label={name.moduleName} key={i}>
                          <div className="switch switch-primary">
                            <label className="moduleswitchtext-main">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.fieldname
                                : "Available Logics"}
                            </label>
                            <label className="moduleswitchtext-main1">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.showhide
                                : "Enable/Disable"}
                            </label>
                          </div>

                          <div className="module-switch logic-radio">
                            <div className="switch switch-primary d-flex">
                              <label className="moduleswitchtext">
                                Round Robin Logic
                              </label>
                              <input
                                type="radio"
                                value="roundRobbin"
                                checked={
                                  this.state.assignmentLogic === "roundRobbin"
                                }
                                onChange={this.handleLogicChange}
                              />
                            </div>
                          </div>
                          <div className="module-switch logic-radio">
                            <div className="switch switch-primary d-flex">
                              <label className="moduleswitchtext">
                                Category Wise Assignment
                              </label>
                              <input
                                type="radio"
                                value="categoryWise"
                                checked={
                                  this.state.assignmentLogic ===
                                  "categoryWise"
                                }
                                onChange={this.handleLogicChange}
                              />


                            </div>
                          </div>
                          <div className="module-switch logic-radio">
                            <div className="switch switch-primary d-flex">
                              <label className="moduleswitchtext">
                                Load Balancing
                              </label>
                              <input
                                type="radio"
                                value="loadbalancing"
                                checked={
                                  this.state.assignmentLogic ===
                                  "loadbalancing"
                                }
                                onChange={this.handleLogicChange}
                              />
                              {this.state.assignmentLogic ===
                                "loadbalancing" &&
                                <div className="load-balance-inp-btn">
                                  <label className="moduleswitchtext">
                                    Max Ticket allocated to each agent
                                  </label>
                                  <input
                                    type="number"
                                    min={0}
                                    value={this.state.loadbalance}
                                    onChange={this.handleLoadLImit}

                                  />


                                </div>}
                            </div>


                          </div>
                          <div className="module-switch logic-radio">
                            <div className="switch switch-primary d-flex justify-content-end saveLoad">
                              <button className="" onClick={this.handleChangeAssignmentLogic}>Save</button>
                            </div>
                          </div>







                        </Tab>
                      ) :
                        name.moduleID === 14 ?
                          (
                            <Tab label={name.moduleName} key={i}>
                              <div className="switch switch-primary">
                                <label className="moduleswitchtext-main">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.label.fieldname
                                    : "Features"}
                                </label>
                                <label className="moduleswitchtext-main1">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.label.showhide
                                    : "On/Off"}
                                </label>
                              </div>
                              {
                                this.state.featureAvaibleList !== null &&
                                this.state.featureAvaibleList.map((e, i) => (
                                  <div className="module-switch" key={i}>
                                    <div className="switch switch-primary">
                                      <label className="moduleswitchtext">
                                        {e.displayName}
                                      </label>
                                      <input
                                        name="moduleItems"
                                        //checked
                                        checked={e.columnValue === "1" ? true : false}
                                        type="checkbox"
                                        id={"i" + e.columnValue}
                                        onChange={this.state.selectedModuleIndex === i ? () => { this.handleUpdateFeaturesList(e, i) } : null}
                                      />
                                      <label
                                        htmlFor={"i" + e.columnValue}
                                        className="cr"
                                      ></label>
                                    </div>
                                  </div>

                                )
                                )
                              }
                              <div className="module-switch" >
                                <div className="switch switch-primary">
                                  <label className="moduleswitchtext">
                                    Working Hours
                                  </label>
                                  <input
                                    name="moduleItems"
                                    //checked
                                    checked={this.state.ismodalworking}
                                    type="checkbox"
                                    id={"i" + "wh"}
                                    onChange={() => { this.handleModalWorkingHours() }}
                                  />
                                  <label
                                    htmlFor={"i" + "wh"}
                                    className="cr"
                                  ></label>
                                </div>
                              </div>



                            </Tab>
                          ) :
                          (
                            <Tab label={name.moduleName} key={i}>
                              <div className="switch switch-primary">
                                <label className="moduleswitchtext-main">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.label.fieldname
                                    : "Field Name"}
                                </label>
                                <label className="moduleswitchtext-main1">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.label.showhide
                                    : "Show/Hide"}
                                </label>
                              </div>

                              {this.state.loading ? (
                                <div className="loader-icon-cntr">
                                  <div className="loader-icon"></div>
                                </div>
                              ) : (
                                this.state.modulesItems !== null &&
                                this.state.modulesItems.map((item, i) => (
                                  <div className="module-switch" key={i}>
                                    <div className="switch switch-primary">
                                      <label className="moduleswitchtext">
                                        {item.moduleItemName}
                                      </label>
                                      <input
                                        name="moduleItems"
                                        checked={item.moduleItemisActive}
                                        type="checkbox"
                                        id={"i" + item.moduleItemID}
                                        onChange={this.checkModule.bind(
                                          this,
                                          item.moduleItemID,
                                          name.moduleID
                                        )}
                                      />
                                      <label
                                        htmlFor={"i" + item.moduleItemID}
                                        className="cr"
                                      ></label>
                                    </div>
                                  </div>
                                ))
                              )}
                            </Tab>
                          )
                    )
                    : null}
                </Tabs>
              ) : null}
            </section>

            <Modal
              onClose={this.handleModalWorkingHoursClose}
              closeOnOverlayClick={false}
              open={this.state.ismodalworking}
              modalId="BlockEmailModel"
              overlayId="logout-ovrly"
            >
              <div className="setting-tabs alert-tabs">
                <label style={{ fontSize: "16px", fontWeight: "bold", textAlign: "center" }}>
                  Create Your Non Working Days and Working Time
                </label>
                <img
                  src={CancelImg}
                  alt="CancelImg"
                  className="block-cancelImg"
                  onClick={this.handleModalWorkingHoursClose}
                />
              </div>
              <div className="tab-content">
                <div className="pop-upAddSearchPD">
                  <div className="row">
                    <div className="col-6">
                      <h6 className="h6working">Select Non Working Days</h6>
                      {
                        this.state.daysArray.map((e, i) => {
                          return (
                            <div className="inputLabelSLA" key={i}>
                              <input
                                style={{ width: "18px" }}
                                type="checkbox"
                                id={e.id}
                                value={e.value}
                                checked={e.isCheck}
                                onChange={(h) => { this.handleWorkinginput(h) }}
                              />
                              <label htmlFor={"i" + e.value} >{e.value}</label>
                            </div>

                          )
                        })
                      }



                    </div>
                    <div className="col-6">
                      <h6 className="h6working">Select Working Start/End Time</h6>
                      <div>
                        <div className="feedInp">
                          <span>
                            Start
                          </span>
                          <input type="time" name="start" value={this.state.startTime} onChange={(e) => { this.handleStartEndTimeWorking(e) }} />
                        </div>
                        <div className="feedInp">
                          <span>
                            End
                          </span>
                          <input type="time" name="end" value={this.state.endTime} onChange={(e) => { this.handleStartEndTimeWorking(e) }} />
                        </div>
                      </div>
                    </div>


                  </div>

                  <div className="btn-block">

                    <button
                      style={{ marginLeft: "10px" }}
                      type="button"
                      className="butn add-cust-butn "
                      onClick={this.handleUpdateSlaConfiguration}

                    >
                      Update
                    </button>

                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </div >
      </Fragment >
    );
  }
}

export default Module;
