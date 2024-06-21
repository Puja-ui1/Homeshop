import React, { Component, useState } from "react";
import ReactTable from "react-table";
import Demo from "../../../store/Hashtag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import InfoImg from "./../../../assets/Images/icons8-info.svg";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import Cancel from "./../../../assets/Images/cancel.png";
import Correct from "./../../../assets/Images/correct.png";
import { Input, Popover, Tag, Tooltip } from "antd";
import { Link } from "react-router-dom";
import DeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import CancelImg from "./../../../assets/Images/Circle-cancel.png";
import CKEditor from "react-ckeditor-component";
import Modal from "react-bootstrap/Modal";
import { authHeader } from "./../../../helpers/authHeader";
import axios from "axios";
import config from "./../../../helpers/config";
import { NotificationManager } from "react-notifications";
import Select from "react-select";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import Sorting from "./../../../assets/Images/sorting.png";
import matchSorter from "match-sorter";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";

class Templates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ConfigTabsModal: false,
      template: [],
      TemplateName: "",
      TemplateIsActive: "true",
      TemplateSubject: "",
      editorContent: "",
      slaIssueType: [],
      editStatus: "",
      editIssueType: [],
      templateEdit: {},
      templatenamecopulsion: "",
      isBrandCompulsory: "",
      isBUnitCompulsory: "",
      isCategCompulsory: "",
      isSubCategCompulsory: "",
      isSubSubCategCompulsory: "",
      isIssueTypeCompulsory: "",
      statusCompulsion: "",
      channelCompulsion: "",
      StatusModel: false,
      sortColumn: "",
      sortAllData: [],
      sortIssueType: [],
      sortName: [],
      sortCreatedBy: [],
      sortStatus: [],
      updatedTemplatename: "",
      updatedArray: [],
      updatedStatus: "",
      rowData: {},
      editmodel: false,
      isEdit: false,
      isLoading: false,
      editSaveLoading: false,
      slaOvrlayShow: false,
      slaShow: false,
      issueColor: "",
      nameColor: "",
      createdColor: "",
      statusColor: "",
      sortHeader: "",
      editTemplateName: "",
      editIssueTypeSelect: "",
      issueColor: "",
      SearchText: "",
      indiSla: "",
      AssignToData: [],
      placeholderData: [],
      temptemplate: [],
      sFilterCheckbox: "",
      filterTxtValue: "",
      sortFilterIssueType: [],
      sortFilterName: [],
      sortFilterCreatedBy: [],
      sortFilterStatus: [],
      stemplateNameFilterCheckbox: "",
      screatedByFilterCheckbox: "",
      stemplateStatusFilterCheckbox: "",
      ckCusrsorPosition: 0,
      ckCusrsorData: "",
      isortA: false,
      translateLanguage: {},
      TicketSourceData: [],
      selectedTicketSource: '',
      selectedPlaceholder: '',
      tags: [],
      editInputIndex: -1,
      editInputValue: '',
      inputVisible: false,
      inputValue: '',
      brandNameList: [],
      selectedBrands: "",
      businessUnitList: [],
      selectedBusinessUnit: "",
      categoryList: [],
      selectedCategory: "",
      subCategoryList: [],
      selectedSubCategory: "",
      subSubCategoryList: [],
      selectedSubSubCategory: "",
      issueTypeList: [],
      selectedIssueType: "",
      isOverlay: false,
      showDropDown: "",
      tempLateDetail: [],
      isSubSubCategory: false,
      isBusinessUnit: false,
      ticketFields: [],
    };

    this.handleGetTemplate = this.handleGetTemplate.bind(this);
    this.handleTemplateName = this.handleTemplateName.bind(this);
    this.handleTemplateSubject = this.handleTemplateSubject.bind(this);
    this.handleGetSLAIssueType = this.handleGetSLAIssueType.bind(this);
    this.StatusOpenModel = this.StatusOpenModel.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.handleUpdateTemplate = this.handleUpdateTemplate.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    // this.handleSlaButton = this.handleSlaButton.bind(this);
    this.handleGetAgentList = this.handleGetAgentList.bind(this);
    this.handlePlaceholderList = this.handlePlaceholderList.bind(this);
    this.handleGetTicketSourceList = this.handleGetTicketSourceList.bind(this);

  }

  componentDidMount() {
    this.handleGetTemplate();
    this.handleGetSLAIssueType();
    this.handlePlaceholderList();
    this.handleGetTicketSourceList();
    this.handleGetBrandList();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
    this.handleGetTicketFields();
  }
  handleGetBrandList = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            brandNameList: data,
            isSubSubCategory: data[0].isSubSubCategory,
            isBusinessUnit: data[0].isBusinessUnit
          }, () => {
            if (self.state.isBusinessUnit) {
              self.handleGetbusinessUnit()
            }
          });
        } else {
          self.setState({ brandNameList: [] });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  callBackEdit = (templateName, arraydata, templateStatus, rowData) => {
    this.state.updatedTemplatename = templateName;
    this.state.updatedArray = arraydata;
    this.state.updatedStatus = templateStatus;
    this.state.rowData = rowData;
  };

  onCkBlur = (evt) => {
    var ckCusrsorPosition = evt.editor.getSelection().getRanges()[0];
    var ckCusrsorData = evt.editor.getSelection().getRanges()[0].endContainer.$
      .wholeText;
    if (!ckCusrsorData) {
      ckCusrsorData = "";
    }
    this.setState({
      ckCusrsorPosition: ckCusrsorPosition.startOffset,
      ckCusrsorData,
    });
  };

  handleGetTicketFields = () => {
    let self = this;
    //debugger
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
          // console.log("data.ticketFieldsLst", data.ticketFieldsLst);
        } else {
          self.setState({ ticketFields: [] });
        }
      })
      .catch((error) => console.log(error));
  };



  handlePlaceholderList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Template/GetMailParameter",
      headers: authHeader(),
      params: {
        AlertID: 8,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            placeholderData: data,
          });
        } else {
          self.setState({
            placeholderData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  setPlaceholderValue(e) {
    let ckData = this.state.editorContent;
    let ckDataArr = ckData.split("\n\n");
    let ckDataArrNew = [];
    for (let i = 0; i < ckDataArr.length; i++) {
      const element1 = ckDataArr[i].replace(/<[^>]+>/g, "");
      const element2 = element1.replace(/&nbsp;/g, " ");
      const element = element2.replace(/\n/g, " ");
      ckDataArrNew.push(element);
    }
    let selectedVal = "",
      loopFlag = true,
      ckTags,
      selectedArr;
    for (let i = 0; i < ckDataArrNew.length; i++) {
      if (loopFlag) {
        // //debugger
        if (this.state.ckCusrsorData.trim() == ckDataArrNew[i].trim()) {
          selectedVal = ckDataArrNew[i];
          selectedArr = i;
          ckTags = ckDataArr[i].match(/<[^>]+>/g);
          loopFlag = false;
        }
      }
    }
    let ckDataArrLast = selectedVal;
    let textBefore = ckDataArrLast.substring(0, this.state.ckCusrsorPosition);
    let textAfter = ckDataArrLast.substring(
      this.state.ckCusrsorPosition,
      ckDataArrLast.length
    );
    let matchedArr = this.state.placeholderData.filter(
      (x) => x.mailParameterID == e.currentTarget.value
    );
    let placeholderName = matchedArr[0].parameterName;
    ckDataArrLast = textBefore + " " + placeholderName + textAfter;
    let newCkCusrsorPosition =
      this.state.ckCusrsorPosition + placeholderName.length + 1;
    let { tags } = this.state;
    tags.push(placeholderName);
    this.setState({
      tags,
    });
    this.setState({
      ckCusrsorPosition: newCkCusrsorPosition,
      ckCusrsorData: ckDataArrLast,
    });
    if (ckTags) {
      let ckFinal = ckTags[0] + ckDataArrLast + ckTags[1];
      ckDataArr.splice(selectedArr, 1, ckFinal);
      ckData = ckDataArr.join(" ");
    }
    if (ckTags) {
      this.setState({ editorContent: ckData });
    } else {
      this.setState({ editorContent: ckDataArrLast });
    }
  }

  handleUpdateTemplate() {
    const TranslationContext = this.state.translateLanguage.default;
    // console.log(this.state.editorContent, "editorContent");
    // //debugger
    let self = this;
    var activeStatus = false;
    var issuetype = "";
    let editedData = self.state.templateEdit
    if (editedData.templateStatus === "Active") {
      activeStatus = true;
    } else {
      activeStatus = false;
    }

    let finalUpdateData = []
    // let selectedIssues = editedData.templateMappings
    let selectedIssues = this.state.editIssueType
    finalUpdateData =
      selectedIssues.map((detail) => {
        return {
          brandId: detail?.brandId,
          categoryId: detail?.categoryId,
          subCategoryId: detail?.subCategoryId,
          subSubCategoryId: detail?.subSubCategoryId,
          issueTypeId: detail?.issueTypeId,
          businessUnitId: detail?.businessUnitId,
        }
      });

    this.setState({ editSaveLoading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/Template/UpdateTemplateDetails",
      headers: authHeader(),
      data: {
        channelName: editedData.channelName,
        templateId: editedData.templateID,
        templateName: editedData.TemplateName,
        templateSubject: editedData.templateSubject,
        templateBody: self.state.editorContent,
        isActive: activeStatus,
        templateMappings: finalUpdateData
      }
    })
      .then(function (res) {
        // let status = res.data.message;
        // if (status === "Success") {
        if (res.data.statusCode === 200) {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.templateupdatedsuccessfully
              : "Template updated successfully."
          );
          self.handleGetTemplate();
          self.setState({
            editSaveLoading: false,
            ConfigTabsModal: false,
            editorContent: "",
            TemplateSubject: "",
            isEdit: false,
            templateEdit: {},
            tags: []
          });
        } else {
          self.setState({
            editSaveLoading: false,
            ConfigTabsModal: false,
            isEdit: false,
          });
          NotificationManager.error(
            res.data.message
            // TranslationContext !== undefined
            //   ? TranslationContext.alertmessage.templatenotupdate
            //   : "Template not update."
          );
        }
      })
      .catch((data) => {
        self.setState({
          editSaveLoading: false,
          ConfigTabsModal: false,
          TemplateSubject: "",
          editorContent: "",

          templateEdit: {},
        });
        console.log(data);
      });

    ///////////////////////////////////
    // if (this.state.editIssueType.length > 0) {
    //   for (let i = 0; i < this.state.editIssueType.length; i++) {
    //     issuetype += this.state.editIssueType[i].issueTypeID + ",";
    //   }
    // }
    // var issue = issuetype.substring(0, issuetype.length - 1);
    // this.setState({ editSaveLoading: true });
    // axios({
    //   method: "post",
    //   url: config.apiUrl + "/Template/ModifyTemplate",
    //   headers: authHeader(),
    //   params: {
    //     TemplateID: self.state.templateEdit.template_ID,
    //     TemplateName: self.state.templateEdit.TemplateName.trim(),
    //     issueType: issue,
    //     templateSubject: this.state.TemplateSubject,
    //     templateContent: this.state.editorContent,
    //     isTemplateActive: activeStatus,
    //   },
    // })
    //   .then(function (res) {
    //     let status = res.data.message;
    //     if (status === "Success") {
    //       NotificationManager.success(
    //         TranslationContext !== undefined
    //           ? TranslationContext.alertmessage.templateupdatedsuccessfully
    //           : "Template updated successfully."
    //       );
    //       self.handleGetTemplate();
    //       self.setState({
    //         editSaveLoading: false,
    //         ConfigTabsModal: false,
    //         editorContent: "",
    //         TemplateSubject: "",
    //         isEdit: false,
    //         templateEdit: {},
    //         tags: []
    //       });
    //     } else {
    //       self.setState({
    //         editSaveLoading: false,
    //         ConfigTabsModal: false,
    //         isEdit: false,
    //       });
    //       NotificationManager.error(
    //         TranslationContext !== undefined
    //           ? TranslationContext.alertmessage.templatenotupdate
    //           : "Template not update."
    //       );
    //     }
    //   })
    //   .catch((data) => {
    //     self.setState({
    //       editSaveLoading: false,
    //       ConfigTabsModal: false,
    //       TemplateSubject: "",
    //       editorContent: "",

    //       templateEdit: {},
    //     });
    //     console.log(data);
    //   });
  }

  handleGetAgentList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/User/GetUserList",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            AssignToData: data,
          });
          self.checkAllAgentStart();
        } else {
          self.setState({
            AssignToData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  sortStatusZtoA() {
    var itemsArray = [];
    itemsArray = this.state.template;

    if (this.state.sortColumn === "templateName") {
      itemsArray.sort((a, b) => {
        if (a.templateName < b.templateName) return 1;
        if (a.templateName > b.templateName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "createdBy") {
      itemsArray.sort((a, b) => {
        if (a.createdBy < b.createdBy) return 1;
        if (a.createdBy > b.createdBy) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "templateStatus") {
      itemsArray.sort((a, b) => {
        if (a.templateStatus < b.templateStatus) return 1;
        if (a.templateStatus > b.templateStatus) return -1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      template: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    var itemsArray = [];
    itemsArray = this.state.template;

    if (this.state.sortColumn === "templateName") {
      itemsArray.sort((a, b) => {
        if (a.templateName < b.templateName) return -1;
        if (a.templateName > b.templateName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "createdBy") {
      itemsArray.sort((a, b) => {
        if (a.createdBy < b.createdBy) return -1;
        if (a.createdBy > b.createdBy) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "templateStatus") {
      itemsArray.sort((a, b) => {
        if (a.templateStatus < b.templateStatus) return -1;
        if (a.templateStatus > b.templateStatus) return 1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      template: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }
  StatusOpenModel(data, header) {
    if (
      this.state.sortFilterName.length === 0 ||
      this.state.sortFilterCreatedBy.length === 0 ||
      this.state.sortFilterStatus.length === 0
    ) {
      return false;
    }
    if (data === "templateName") {
      if (
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.stemplateStatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          screatedByFilterCheckbox: "",
          stemplateStatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "createdBy") {
      if (
        this.state.stemplateNameFilterCheckbox !== "" ||
        this.state.stemplateStatusFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          stemplateNameFilterCheckbox: "",
          stemplateStatusFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "templateStatus") {
      if (
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.stemplateNameFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          stemplateNameFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }
  StatusCloseModel() {
    if (this.state.temptemplate.length > 0) {
      this.setState({
        StatusModel: false,
        template: this.state.temptemplate,
        filterTxtValue: "",
        sortFilterIssueType: this.state.sortIssueType,
        sortFilterName: this.state.sortName,
        sortFilterCreatedBy: this.state.sortCreatedBy,
        sortFilterStatus: this.state.sortStatus,
      });
      if (this.state.sortColumn === "issueTypeName") {
        if (this.state.stemplateNameFilterCheckbox === "") {
        } else {
          this.setState({
            screatedByFilterCheckbox: "",
            stemplateStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "createdBy") {
        if (this.state.screatedByFilterCheckbox === "") {
        } else {
          this.setState({
            stemplateNameFilterCheckbox: "",
            stemplateStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "templateStatus") {
        if (this.state.stemplateStatusFilterCheckbox === "") {
        } else {
          this.setState({
            stemplateNameFilterCheckbox: "",
            screatedByFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        template: this.state.isortA
          ? this.state.template
          : this.state.sortAllData,
        filterTxtValue: "",
        sortFilterIssueType: this.state.sortIssueType,
        sortFilterName: this.state.sortName,
        sortFilterCreatedBy: this.state.sortCreatedBy,
        sortFilterStatus: this.state.sortStatus,
      });
    }
  }
  setAssignedToValue(e) {
    let ckData = this.state.editorContent;
    let matchedArr = this.state.AssignToData.filter(
      (x) => x.userID == e.currentTarget.value
    );
    let userName = matchedArr[0].fullName;
    ckData += "@" + userName;
    this.setState({ editorContent: ckData });
  }
  setSortCheckStatus = (column, type, e) => {
    var itemsArray = [];

    var stemplateNameFilterCheckbox = this.state.stemplateNameFilterCheckbox;
    var screatedByFilterCheckbox = this.state.screatedByFilterCheckbox;
    var stemplateStatusFilterCheckbox = this.state
      .stemplateStatusFilterCheckbox;

    if (column === "templateName" || column === "all") {
      if (type === "value" && type !== "All") {
        stemplateNameFilterCheckbox = stemplateNameFilterCheckbox.replace(
          "all",
          ""
        );
        stemplateNameFilterCheckbox = stemplateNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (stemplateNameFilterCheckbox.includes(e.currentTarget.value)) {
          stemplateNameFilterCheckbox = stemplateNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          stemplateNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (stemplateNameFilterCheckbox.includes("all")) {
          stemplateNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "templateName") {
            for (let i = 0; i < this.state.sortName.length; i++) {
              stemplateNameFilterCheckbox +=
                this.state.sortName[i].templateName + ",";
            }
            stemplateNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "createdBy" || column === "all") {
      if (type === "value" && type !== "All") {
        screatedByFilterCheckbox = screatedByFilterCheckbox.replace("all", "");
        screatedByFilterCheckbox = screatedByFilterCheckbox.replace("all,", "");
        if (screatedByFilterCheckbox.includes(e.currentTarget.value)) {
          screatedByFilterCheckbox = screatedByFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          screatedByFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (screatedByFilterCheckbox.includes("all")) {
          screatedByFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "createdBy") {
            for (let i = 0; i < this.state.sortCreatedBy.length; i++) {
              screatedByFilterCheckbox +=
                this.state.sortCreatedBy[i].createdBy + ",";
            }
            screatedByFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "templateStatus" || column === "all") {
      if (type === "value" && type !== "All") {
        stemplateStatusFilterCheckbox = stemplateStatusFilterCheckbox.replace(
          "all",
          ""
        );
        stemplateStatusFilterCheckbox = stemplateStatusFilterCheckbox.replace(
          "all,",
          ""
        );
        if (stemplateStatusFilterCheckbox.includes(e.currentTarget.value)) {
          stemplateStatusFilterCheckbox = stemplateStatusFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          stemplateStatusFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (stemplateStatusFilterCheckbox.includes("all")) {
          stemplateStatusFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "templateStatus") {
            for (let i = 0; i < this.state.sortStatus.length; i++) {
              stemplateStatusFilterCheckbox +=
                this.state.sortStatus[i].templateStatus + ",";
            }
            stemplateStatusFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      stemplateNameFilterCheckbox,
      screatedByFilterCheckbox,
      stemplateStatusFilterCheckbox,

      issueColor: "",
      nameColor: "",
      createdColor: "",
      statusColor: "",
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "templateName") {
      var sItems = stemplateNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.templateName === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        nameColor: "sort-column",
      });
    } else if (column === "createdBy") {
      var sItems = screatedByFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.createdBy === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        createdColor: "sort-column",
      });
    } else if (column === "templateStatus") {
      var sItems = stemplateStatusFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.templateStatus === sItems[i]
            );
            if (tempFilterData.length > 0) {
              for (let j = 0; j < tempFilterData.length; j++) {
                itemsArray.push(tempFilterData[j]);
              }
            }
          }
        }
      }
      this.setState({
        statusColor: "sort-column",
      });
    }

    this.setState({
      temptemplate: itemsArray,
    });
  };

  setTemplateEditData(editdata) {
    // //debugger
    var templateEdit = {};
    templateEdit = editdata;
    templateEdit.template_ID = editdata.templateID;
    templateEdit.TemplateName = editdata.templateName;
    // templateEdit.issue_Type = editdata.issueType;
    templateEdit.template_Status = editdata.templateStatus;
    var TemplateSubject = editdata.templateSubject;
    var editorContent = editdata.templateContent;

    // var itypeData = editdata.issueTypeID.split(",");
    var itypeData = editdata.templateMappings;
    var iSelect = [];

    for (let i = 0; i < itypeData.length; i++) {
      var idata = this.state.slaIssueType.filter(
        // (x) => x.issueTypeID == itypeData[i]
        // (x) => console.log(x.issueTypeId)
        (x) => x.issueTypeId == itypeData[i].issueTypeId
      );
      iSelect.push(idata[0]);
    }

    this.setState({
      TemplateSubject: TemplateSubject,
      editorContent: editorContent,
      templateEdit: templateEdit,
      editIssueType: iSelect,
      editmodel: true,
      isEdit: true,
    });
  }
  handleOnChangeEditData = (e) => {
    const TranslationContext = this.state.translateLanguage.default;
    // //debugger
    var name = e.target.name;
    var value = e.target.value?.length < 2 ? e.target.value.trim() : e.target.value;
    var data = this.state.templateEdit;
    if (name === "TemplateName" && value === "") {
      data[name] = value;
      this.setState({
        editTemplateName:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseentertemplatename
            : "Please Enter Template Name",
      });
    } else {
      data[name] = value;
      this.setState({ editTemplateName: "" });
    }
    // data[name] = value;

    this.setState({
      templateEdit: data,
    });
  };

  selectNoSLA = async (event) => {
    const TranslationContext = this.state.translateLanguage.default;

    var checkboxes = document.getElementsByName("allSla");
    document.getElementById("issueTypeValue").textContent =
      TranslationContext !== undefined
        ? TranslationContext.button.select
        : "Select";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    await this.setState({
      indiSla: "",
    });
  };


  handleCreate(issueTypeName) {
    let { slaIssueType, value } = this.state;

    let newOption = {
      issueTypeName,
      issueTypeID: slaIssueType.length + 1,
    };

    this.setState({
      value: newOption, // select new option
      slaIssueType: [...slaIssueType, newOption], // add new option to our dataset
    });
  }

  setEditIssueType = (e) => {
    // //debugger
    const TranslationContext = this.state.translateLanguage.default;

    if (e) {
      if (e.length === 0) {
        this.setState({
          editIssueTypeSelect:
            TranslationContext !== undefined
              ? TranslationContext.validation.pleaseselectissuetype
              : "Please Select IssueType",
          editIssueType: e,
        });
      } else {
        this.setState({
          editIssueType: e,
          editIssueTypeSelect: "",
        });
      }
    } else {
      this.setState({
        editIssueType: e,
        editIssueTypeSelect:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectissuetype
            : "Please Select IssueType",
      });
    }
  };

  handleTemplateName(e) {
    // //debugger 
    // let regexp = /^(?![\s-])[\w\s-]+$/
    // if (regexp.test(e.target.value)) {
    this.setState({
      TemplateName: e.target.value?.length < 2 ? e.target.value.trim() : e.target.value,
    });
    // }
  }
  onEditorChange = (evt) => {
    var newContent = evt.editor.getData();
    this.setState({
      editorContent: newContent,
    });
  };
  handleTemplateSubject(e) {
    this.setState({
      TemplateSubject: e.target.value,
    });
  }
  handleTemplateIsActive = (e) => {
    let TemplateIsActive = e.currentTarget.value;
    this.setState({ TemplateIsActive });
  };

  handleGetSLAIssueType() {
    let self = this;
    axios({
      method: "get",
      url: config.apiUrl + "/Template/GetAllIssueTypeForTemplate",
      headers: authHeader(),
    })
      .then(function (res) {
        let slaIssueType = res.data.responseData;
        if (slaIssueType !== null && slaIssueType !== undefined) {
          self.setState({ slaIssueType: slaIssueType });
          // self.setState({ slaIssueType, selectedSlaIssueType });
          var checkboxes = document.getElementsByName("allSla");
          for (var i in checkboxes) {
            if (checkboxes[i].checked === true) {
              checkboxes[i].checked = false;
            }
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
    // let self = this;
    // axios({
    //   method: "post",
    //   url: config.apiUrl + "/SLA/GetIssueType",
    //   headers: authHeader(),
    //   params: {
    //     SearchText: this.state.SearchText,
    //   },
    // })
    //   .then(function (res) {
    //     let slaIssueType = res.data.responseData;
    //     if (slaIssueType !== null && slaIssueType !== undefined) {
    //       self.setState({ slaIssueType });
    //       // self.setState({ slaIssueType, selectedSlaIssueType });
    //       var checkboxes = document.getElementsByName("allSla");
    //       for (var i in checkboxes) {
    //         if (checkboxes[i].checked === true) {
    //           checkboxes[i].checked = false;
    //         }
    //       }
    //     }
    //   })
    //   .catch((data) => {
    //     console.log(data);
    //   });
  }

  deleteTemplate(deleteId) {
    const TranslationContext = this.state.translateLanguage.default;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Template/DeleteTemplate",
      headers: authHeader(),
      params: {
        TemplateID: deleteId,
      },
    })
      .then(function (res) {
        let status = res.data.message;
        if (status === "Success") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.templatedeletedsuccessfully
              : "Template deleted successfully."
          );
          self.handleGetTemplate();
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.templatenotdeleted
              : "Template not deleted."
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  createTemplate() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;

    var TemplateIsActive;
    if (self.state.TemplateIsActive === "true") {
      TemplateIsActive = true;
    } else if (self.state.TemplateIsActive === "false") {
      TemplateIsActive = false;
    }
    let finalData = []
    // console.log(self.state.selectedIssueType);
    var issueTy = self.state.selectedIssueType.split(",");
    // //debugger
    for (var i = 0; i < issueTy.length; i++) {
      var data = {
        brandId: 0,
        categoryId: 0,
        subCategoryId: 0,
        subSubCategoryId: "",
        issueTypeId: 0,
        businessUnitId: ""
      }
      data.issueTypeId = parseInt(issueTy[i])
      let subsubcat = self.state.issueTypeList.filter((ele) => ele.issueTypeID.toString() === issueTy[i])
      data.subSubCategoryId = subsubcat[0].subSubCategoryId

      let subcat = ""
      self.state.isSubSubCategory ?
        subcat = self.state.subSubCategoryList.filter(ele => ele.subSubCategoryID === subsubcat[0].subSubCategoryId)
        :
        subcat = self.state.issueTypeList.filter(ele => ele.issueTypeID.toString() === issueTy[i])
      data.subCategoryId = subcat[0].subCategoryID

      let cat = self.state.subCategoryList.filter(ele => ele.subCategoryID === subcat[0].subCategoryID)
      data.categoryId = cat[0].categoryID

      let bId = self.state.categoryList.filter(ele => ele.categoryID === cat[0].categoryID)
      data.businessUnitId = bId[0].businessUnitId

      let brId = self.state.categoryList.filter(ele => ele.categoryID === cat[0].categoryID)
      data.brandId = brId[0].brandId
      finalData.push(data)
    }
    self.setState({ editSaveLoading: true });

    // New create temlate api
    axios({
      method: "post",
      url: config.apiUrl + "/Template/CreateMultiTemplate",
      headers: authHeader(),
      data: {
        templateName: self.state.TemplateName,
        templateSubject: self.state.TemplateSubject,
        templateBody: self.state.editorContent,
        channel: self.state.selectedTicketSource,
        isActive: TemplateIsActive,
        templateMappings: finalData
      },
    })
      .then(function (res) {
        if (res.data.statusCode === 200) {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.templateaddedsuccessfully
              : "Template added successfully."
          );
          self.handleGetTemplate();
          self.setState({
            TemplateSubject: "",
            editorContent: "",
            TemplateName: "",
            indiSla: "",
            SearchText: "",
            templatenamecopulsion: "",
            isBrandCompulsory: "",
            isBUnitCompulsory: "",
            isCategCompulsory: "",
            isSubCategCompulsory: "",
            isSubSubCategCompulsory: "",
            isIssueTypeCompulsory: "",
            channelCompulsion: "",
            ConfigTabsModal: false,
            editSaveLoading: false,
            tags: ["Tags:"]
          });
          // self.selectNoSLA();
          self.handleClearAll("issueTypecheckall")
        } else {
          NotificationManager.error(
            res.data.message
            // TranslationContext !== undefined
            //   ? TranslationContext.alertmessage.templatenotadded
            //   : "Template Not Added."
          );
          self.setState({
            TemplateSubject: "",
            editorContent: "",
            TemplateName: "",
            indiSla: "",
            SearchText: "",
            templatenamecopulsion: "",
            isBrandCompulsory: "",
            isBUnitCompulsory: "",
            isCategCompulsory: "",
            isSubCategCompulsory: "",
            isSubSubCategCompulsory: "",
            isIssueTypeCompulsory: "",
            channelCompulsion: "",
            ConfigTabsModal: false,
            editSaveLoading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
        self.setState({
          editSaveLoading: false
        })
      });

    // axios({
    //   method: "post",
    //   url: config.apiUrl + "/Template/CreateTemplate",
    //   headers: authHeader(),
    //   params: {
    //     TemplateName: this.state.TemplateName,
    //     TemplateSubject: this.state.TemplateSubject,
    //     TemplateBody: this.state.editorContent,
    //     issueTypes: this.state.indiSla,
    //     channelName: this.state.selectedTicketSource,
    //     isTemplateActive: TemplateIsActive,
    //   },
    // })
    //   .then(function (res) {
    //     let status = res.data.message;
    //     if (status === "Success") {
    //       NotificationManager.success(
    //         TranslationContext !== undefined
    //           ? TranslationContext.alertmessage.templateaddedsuccessfully
    //           : "Template added successfully."
    //       );
    //       self.handleGetTemplate();
    //       self.setState({
    //         TemplateSubject: "",
    //         editorContent: "",
    //         TemplateName: "",
    //         indiSla: "",
    //         SearchText: "",
    //         templatenamecopulsion: "",
    //         isBrandCompulsory: "",
    //         isBUnitCompulsory: "",
    //         isCategCompulsory: "",
    //         isSubCategCompulsory: "",
    //         isSubSubCategCompulsory: "",
    //         isIssueTypeCompulsory: "",
    //         channelCompulsion: "",
    //         ConfigTabsModal: false,
    //         editSaveLoading: false,
    //         tags: ["Tags:"]
    //       });
    //       self.selectNoSLA();
    //     } else {
    //       NotificationManager.error(
    //         TranslationContext !== undefined
    //           ? TranslationContext.alertmessage.templatenotadded
    //           : "Template Not Added."
    //       );
    //       this.setState({
    //         TemplateSubject: "",
    //         editorContent: "",
    //         TemplateName: "",
    //         indiSla: "",
    //         SearchText: "",
    //         templatenamecopulsion: "",
    //         isBrandCompulsory: "",
    //         isBUnitCompulsory: "",
    //         isCategCompulsory: "",
    //         isSubCategCompulsory: "",
    //         isSubSubCategCompulsory: "",
    //         isIssueTypeCompulsory: "",
    //         channelCompulsion: "",
    //         ConfigTabsModal: false,
    //         editSaveLoading: false,
    //       });
    //     }
    //   })
    //   .catch((data) => {
    //     console.log(data);
    //   });
  }

  handleGetTemplate() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Template/GetAllTemplateWithDetails",
      headers: authHeader(),
    })
      .then(function (res) {
        // //debugger
        let template = res.data.responseData;

        if (template !== null) {
          self.state.sortAllData = template;

          var unique = [];
          var distinct = [];
          for (let i = 0; i < template.length; i++) {
            if (!unique[template[i].issueTypeName]) {
              distinct.push(template[i].issueTypeName);
              unique[template[i].issueTypeName] = 1;
            }
          }

          for (let i = 0; i < distinct.length; i++) {
            self.state.sortIssueType.push({ issueTypeName: distinct[i] });
            self.state.sortFilterIssueType.push({ issueTypeName: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < template.length; i++) {
            if (!unique[template[i].templateName]) {
              distinct.push(template[i].templateName);
              unique[template[i].templateName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortName.push({ templateName: distinct[i] });
            self.state.sortFilterName.push({ templateName: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < template.length; i++) {
            if (!unique[template[i].createdBy]) {
              distinct.push(template[i].createdBy);
              unique[template[i].createdBy] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortCreatedBy.push({ createdBy: distinct[i] });
            self.state.sortFilterCreatedBy.push({ createdBy: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < template.length; i++) {
            if (!unique[template[i].templateStatus]) {
              distinct.push(template[i].templateStatus);
              unique[template[i].templateStatus] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortStatus.push({ templateStatus: distinct[i] });
            self.state.sortFilterStatus.push({ templateStatus: distinct[i] });
          }
        }

        if (template !== null && template !== undefined) {
          self.setState({ template: template });
        }
      })
      .catch((data) => {
        console.log(data);
      });

    // let self = this;
    // axios({
    //   method: "post",
    //   url: config.apiUrl + "/Template/GetTemplate",
    //   headers: authHeader(),
    // })
    //   .then(function (res) {
    //     //debugger
    //     let template = res.data.responseData;

    //     if (template !== null) {
    //       self.state.sortAllData = template;
    //       var unique = [];
    //       var distinct = [];
    //       for (let i = 0; i < template.length; i++) {
    //         if (!unique[template[i].issueTypeName]) {
    //           distinct.push(template[i].issueTypeName);
    //           unique[template[i].issueTypeName] = 1;
    //         }
    //       }

    //       for (let i = 0; i < distinct.length; i++) {
    //         self.state.sortIssueType.push({ issueTypeName: distinct[i] });
    //         self.state.sortFilterIssueType.push({ issueTypeName: distinct[i] });
    //       }

    //       var unique = [];
    //       var distinct = [];
    //       for (let i = 0; i < template.length; i++) {
    //         if (!unique[template[i].templateName]) {
    //           distinct.push(template[i].templateName);
    //           unique[template[i].templateName] = 1;
    //         }
    //       }
    //       for (let i = 0; i < distinct.length; i++) {
    //         self.state.sortName.push({ templateName: distinct[i] });
    //         self.state.sortFilterName.push({ templateName: distinct[i] });
    //       }

    //       var unique = [];
    //       var distinct = [];
    //       for (let i = 0; i < template.length; i++) {
    //         if (!unique[template[i].createdBy]) {
    //           distinct.push(template[i].createdBy);
    //           unique[template[i].createdBy] = 1;
    //         }
    //       }
    //       for (let i = 0; i < distinct.length; i++) {
    //         self.state.sortCreatedBy.push({ createdBy: distinct[i] });
    //         self.state.sortFilterCreatedBy.push({ createdBy: distinct[i] });
    //       }

    //       var unique = [];
    //       var distinct = [];
    //       for (let i = 0; i < template.length; i++) {
    //         if (!unique[template[i].templateStatus]) {
    //           distinct.push(template[i].templateStatus);
    //           unique[template[i].templateStatus] = 1;
    //         }
    //       }
    //       for (let i = 0; i < distinct.length; i++) {
    //         self.state.sortStatus.push({ templateStatus: distinct[i] });
    //         self.state.sortFilterStatus.push({ templateStatus: distinct[i] });
    //       }
    //     }

    //     if (template !== null && template !== undefined) {
    //       self.setState({ template });
    //     }
    //   })
    //   .catch((data) => {
    //     console.log(data);
    //   });
  }

  handleConfigureTabsOpen() {
    const TranslationContext = this.state.translateLanguage.default;

    // if (this.state.TemplateName.length > 0 && this.state.indiSla !== "") {
    if (this.state.TemplateName.length > 0 && this.state.selectedBrands !== "" &&
      this.state.selectedCategory !== "" && this.state.selectedSubCategory !== "" &&
      this.state.selectedIssueType !== "" && this.state.selectedTicketSource !== "") {
      if (this.state.isBusinessUnit && this.state.isSubSubCategory) {
        if (this.state.selectedBusinessUnit !== "" && this.state.selectedSubSubCategory !== "") {
          this.setState({ ConfigTabsModal: true });
          this.handleGetAgentList();
        }
        else {
          this.setState({
            isBUnitCompulsory: "Please Select Business Unit",
            isSubSubCategCompulsory: "Please Select Sub Sub Category",
          })
        }
      }
      else if (this.state.isBusinessUnit) {
        if (this.state.selectedBusinessUnit !== "") {
          this.setState({ ConfigTabsModal: true });
          this.handleGetAgentList();
        }
        else {
          this.setState({
            isBUnitCompulsory: "Please Select Business Unit",
          })
        }
      }
      else if (this.state.isSubSubCategory) {
        if (this.state.selectedSubSubCategory !== "") {
          this.setState({ ConfigTabsModal: true });
          this.handleGetAgentList();
        } else {
          this.setState({
            isSubSubCategCompulsory: "Please Select Sub Sub Category",
          })
        }
      }
      else {
        this.setState({ ConfigTabsModal: true });
        this.handleGetAgentList();
      }
    } else {
      this.setState({
        templatenamecopulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseentertemplatename
            : "Please Enter Template Name",
        isBrandCompulsory: "Please Select " + this.state.ticketFields[2].displayEnglishName,
        isBUnitCompulsory: "Please Select " + this.state?.ticketFields[44]?.displayEnglishName,
        isCategCompulsory: "Please Select " + this.state?.ticketFields[3]?.displayEnglishName,
        isSubCategCompulsory: "Please Select " + this.state?.ticketFields[4]?.displayEnglishName,
        isSubSubCategCompulsory: "Please Select " + this.state?.ticketFields[46]?.displayEnglishName,
        isIssueTypeCompulsory:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectissuetype
            : "Please Select " + this.state?.ticketFields[5]?.displayEnglishName,
        channelCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.validation.pleaseselectchannel
            : "Please Select Channel",
      });
    }
  }
  handleConfigureTabsClose() {
    this.setState({
      ConfigTabsModal: false,
      editorContent: "",
      TemplateSubject: "",
    });
    setTimeout(() => {
      this.setState({
        isEdit: false,
      });
    }, 30);
  }

  toggleEditModal() {
    this.setState({ editmodel: false, isEdit: false });
  }
  CustomNoDataComponent = () => {
    if (this.state.isLoading) {
      return null;
    }
    return <div className="rt-noData">No rows found</div>;
  };
  handleEditSave = (e) => {
    this.setState({ ConfigTabsModal: true, editmodel: false });
  };
  filteTextChange(e) {
    this.setState({ filterTxtValue: e.target.value });
    if (this.state.sortColumn === "issueTypeName") {
      var sortFilterIssueType = matchSorter(
        this.state.sortIssueType,
        e.target.value,
        {
          keys: ["issueTypeName"],
        }
      );
      if (sortFilterIssueType.length > 0) {
        this.setState({ sortFilterIssueType });
      } else {
        this.setState({
          sortFilterIssueType: this.state.sortIssueType,
        });
      }
    }
    if (this.state.sortColumn === "templateName") {
      var sortFilterName = matchSorter(this.state.sortName, e.target.value, {
        keys: ["templateName"],
      });
      if (sortFilterName.length > 0) {
        this.setState({ sortFilterName });
      } else {
        this.setState({
          sortFilterName: this.state.sortName,
        });
      }
    }
    if (this.state.sortColumn === "createdBy") {
      var sortFilterCreatedBy = matchSorter(
        this.state.sortCreatedBy,
        e.target.value,
        { keys: ["createdBy"] }
      );
      if (sortFilterCreatedBy.length > 0) {
        this.setState({ sortFilterCreatedBy });
      } else {
        this.setState({
          sortFilterCreatedBy: this.state.sortCreatedBy,
        });
      }
    }
    if (this.state.sortColumn === "templateStatus") {
      var sortFilterStatus = matchSorter(
        this.state.sortStatus,
        e.target.value,
        { keys: ["templateStatus"] }
      );
      if (sortFilterStatus.length > 0) {
        this.setState({ sortFilterStatus });
      } else {
        this.setState({
          sortFilterStatus: this.state.sortStatus,
        });
      }
    }
  }

  handleGetTicketSourceList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getTicketSources",
      headers: authHeader(),
    })
      .then(function (res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            TicketSourceData: data,
          });
        } else {
          self.setState({
            TicketSourceData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  setTicketSourceValue = (e) => {
    let ticketSourceValue = e.currentTarget.value;
    this.setState({ selectedTicketSource: ticketSourceValue });
  };
  handleClose(e) {
    let tempContent = this.state.editorContent.replaceAll(e, "");
    let tagsArray = this.state.tags.filter(x => x != e)
    this.setState({ editorContent: tempContent, tags: tagsArray })
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  handleEditInputChange = e => {
    this.setState({ editInputValue: e.target.value });
  };

  handleEditInputConfirm = () => {
    this.setState(({ tags, editInputIndex, editInputValue }) => {
      const newTags = [...tags];
      newTags[editInputIndex] = editInputValue;

      return {
        tags: newTags,
        editInputIndex: -1,
        editInputValue: '',
      };
    });
  };

  saveInputRef = input => {
    this.input = input;
  };

  saveEditInputRef = input => {
    this.editInput = input;
  };

  // new template flow...................
  handleSelectAll = async (divId, droppdownName) => {
    // //debugger
    var checkBoxList = [];
    var checkboxes = document.getElementsByName(droppdownName);
    // document.getElementById(divId).textContent =
    //   "All Selected";
    for (var i in checkboxes) {
      if (checkboxes[i].checked === false) {
        checkboxes[i].checked = true;
      }
    }
    if (divId === "brandNameValue") {
      if (this.state.brandNameList !== null) {
        this.state.brandNameList.forEach(allCampaignId, i);
        function allCampaignId(item) {
          checkBoxList.push(item.brandID)
          // checkBoxList += item.brandID + ",";
        }
      }
      await this.setState({
        selectedBrands: checkBoxList.toString(),
        selectedCategory: "",
        selectedSubCategory: "",
        selectedSubSubCategory: "",
        selectedIssueType: "",
      });

      setTimeout(() => {
        if (this.state.isBusinessUnit) {
          if (this.state.selectedBusinessUnit.length > 0 && this.state.selectedBrands.length > 0) {
            this.handleGetCategoryList("add")
          }
        }
        else if (this.state.selectedBrands.length > 0) {
          this.handleGetCategoryList("add");
        }
      }, 1);
    }
    else if (divId === "businessUnitNameValue") {
      if (this.state.businessUnitList !== null) {
        this.state.businessUnitList.forEach(allCampaignId);
        function allCampaignId(item) {
          checkBoxList.push(item.businessUnitId);
        }
      }
      await this.setState({
        selectedBusinessUnit: checkBoxList.toString(),
        selectedCategory: "",
        selectedSubCategory: "",
        selectedSubSubCategory: "",
        selectedIssueType: "",
      });

      setTimeout(() => {
        if (this.state.isBusinessUnit) {
          if (this.state.selectedBusinessUnit.length > 0 && this.state.selectedBrands.length > 0) {
            this.handleGetCategoryList("add")
          }
        }
        else if (this.state.selectedBrands.length > 0) {
          this.handleGetCategoryList("add");
        }
      }, 1);
    }
    else if (divId === "categoryNameValue") {
      if (this.state.categoryList !== null) {
        this.state.categoryList.forEach(allCampaignId);
        function allCampaignId(item) {
          checkBoxList.push(item.categoryID);
        }
      }
      await this.setState({
        selectedCategory: checkBoxList.toString(),
        selectedSubCategory: "",
        selectedSubSubCategory: "",
        selectedIssueType: "",
      });

      setTimeout(() => {
        if (this.state.selectedCategory.length > 0) {
          this.handleGetSubCategoryList("add");
        }
      }, 1);
    }
    else if (divId === "subCategoryNameValue") {
      if (this.state.subCategoryList !== null) {
        this.state.subCategoryList.forEach(allCampaignId);
        function allCampaignId(item) {
          checkBoxList.push(item.subCategoryID);
        }
      }
      await this.setState({
        selectedSubCategory: checkBoxList.toString(),
        selectedSubSubCategory: "",
        selectedIssueType: "",
      });

      setTimeout(() => {
        if (this.state.selectedSubCategory.length > 0) {
          this.handleGetSubSubCategoryList("add");
        }
      }, 1);
    }
    else if (divId === "subSubCategoryNameValue") {
      if (this.state.subSubCategoryList !== null) {
        this.state.subSubCategoryList.forEach(allCampaignId);
        function allCampaignId(item) {
          checkBoxList.push(item.subSubCategoryID);
        }
      }
      await this.setState({
        selectedSubSubCategory: checkBoxList.toString(),
        selectedIssueType: "",
      });

      setTimeout(() => {
        if (this.state.selectedSubSubCategory.length > 0) {
          this.handleGetIssuTypeList("add");
        }
      }, 1);
    }
    else if (divId === "issueTypeNameValue") {
      if (this.state.issueTypeList !== null) {
        this.state.issueTypeList.forEach(allCampaignId);
        function allCampaignId(item) {
          checkBoxList.push(item.issueTypeID);
        }
      }
      await this.setState({
        selectedIssueType: checkBoxList.toString(),
      });
    }
  };

  handleClearAll = async (droppdownName) => {
    var checkboxes = document.getElementsByName(droppdownName);

    for (var i in checkboxes) {
      if (checkboxes[i].checked === true) {
        checkboxes[i].checked = false;
      }
    }
    if (droppdownName === "brandNamecheckall") {
      await this.setState({
        categoryList: [],
        subCategoryList: [],
        subSubCategoryList: [],
        issueTypeList: [],
        selectedBrands: "",
        selectedCategory: "",
        selectedSubCategory: "",
        selectedSubSubCategory: "",
        selectedIssueType: "",
      });
    }
    else if (droppdownName === "businessUnitcheckall") {
      await this.setState({
        categoryList: [],
        subCategoryList: [],
        subSubCategoryList: [],
        issueTypeList: [],
        selectedBusinessUnit: "",
        selectedCategory: "",
        selectedSubCategory: "",
        selectedSubSubCategory: "",
        selectedIssueType: "",
      });
    }
    else if (droppdownName === "catNamecheckall") {
      await this.setState({
        subCategoryList: [],
        subSubCategoryList: [],
        issueTypeList: [],
        selectedCategory: "",
        selectedSubCategory: "",
        selectedSubSubCategory: "",
        selectedIssueType: "",
      });
    }
    else if (droppdownName === "subCatNamecheckall") {
      await this.setState({
        subSubCategoryList: [],
        issueTypeList: [],
        selectedSubCategory: "",
        selectedSubSubCategory: "",
        selectedIssueType: "",
      });
    }
    else if (droppdownName === "subSubCatNamecheckall") {
      await this.setState({
        issueTypeList: [],
        selectedSubSubCategory: "",
        selectedIssueType: "",
      });
    }
    else if (droppdownName === "issueTypecheckall") {
      await this.setState({
        selectedIssueType: "",
      });
    }
  };

  selectBrands = async (event, brandID) => {
    var selectedBrands = this.state.selectedBrands;
    var separator = ",";
    var values = selectedBrands.split(separator);
    let index = values.indexOf("");
    if (index > -1) {
      values.splice(index, 1);
    }
    if (event.target.checked) {
      var flag = values.includes(brandID.toString());
      if (!flag) {
        values.unshift(brandID);
        selectedBrands = values.join(separator);
      }
      await this.setState({
        selectedBrands: selectedBrands,
      });
    }
    else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == brandID) {
          values.splice(i, 1);
          selectedBrands = values.join(separator);
        }
      }
      await this.setState({
        selectedBrands: selectedBrands,

      });

      // let checkArray = selectedBrands.split(",");
      // let index = checkArray.indexOf("");
      // if (index > -1) {
      //   checkArray.splice(index, 1);
      // }

      // if (checkArray.length !== 0) {
      //   document.getElementById("brandNameValue").textContent =
      //     checkArray.length + " selected";


      //   // document.getElementById("editSubCampaignNameValue").textContent =
      //   //   "Select";
      //   // document.getElementById("editIssueTypeNameValue").textContent =
      //   //   "Select";
      // }
      // else {
      //   document.getElementById("brandNameValue").textContent = "Select";
      //   // document.getElementById("editSubCampaignNameValue").textContent =
      //   //   "Select";
      //   // document.getElementById("editIssueTypeNameValue").textContent =
      //   //   "Select";
      // }
    }

    await this.setState({
      selectedCategory: "",
      selectedSubCategory: "",
      selectedSubSubCategory: "",
      selectedIssueType: "",
      categoryList: [],
      subCategoryList: [],
      subSubCategoryList: [],
      issueTypeList: [],
    });
    setTimeout(() => {
      if (this.state.isBusinessUnit) {
        if (this.state.selectedBusinessUnit.length > 0 && this.state.selectedBrands.length > 0) {
          this.handleGetCategoryList("add")
        }
      }
      else if (this.state.selectedBrands.length > 0) {
        this.handleGetCategoryList("add");
      }
    }, 1);
  };

  handleGetbusinessUnit() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetBusinessUnitList",
      headers: authHeader(),
    })
      .then(function (res) {
        var status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({
            businessUnitList: data,
          });
        } else {
          self.setState({
            businessUnitList: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  selectBusinessUnit = async (event, bUnitId) => {

    var selectedBusinessUnit = this.state.selectedBusinessUnit;
    var separator = ",";
    var values = selectedBusinessUnit.split(separator);
    let index = values.indexOf("");
    if (index > -1) {
      values.splice(index, 1);
    }
    if (event.target.checked) {
      var flag = values.includes(bUnitId.toString());
      if (!flag) {
        values.unshift(bUnitId);
        selectedBusinessUnit = values.join(separator);
      }
      await this.setState({
        selectedBusinessUnit: selectedBusinessUnit,
      });
    }
    else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == bUnitId) {
          values.splice(i, 1);
          selectedBusinessUnit = values.join(separator);
        }
      }
      await this.setState({
        selectedBusinessUnit: selectedBusinessUnit,
      });
    }

    await this.setState({
      selectedCategory: "",
      selectedSubCategory: "",
      selectedSubSubCategory: "",
      selectedIssueType: "",
      categoryList: [],
      subCategoryList: [],
      subSubCategoryList: [],
      issueTypeList: [],
    });
    setTimeout(() => {
      if (this.state.isBusinessUnit) {
        if (this.state.selectedBrands.length > 0 && this.state.selectedBusinessUnit.length > 0) {
          this.handleGetCategoryList("add")
        }
      }
      else if (this.state.selectedBusinessUnit.length > 0) {
        this.handleGetCategoryList("add");
      }
    }, 1);
  };


  handleGetCategoryList(data, brandIds, bUnitId) {
    // //debugger
    let self = this;
    var finalBrandId = "";
    var finalBUnitId = "";
    if (data === "add") {
      finalBrandId = this.state.selectedBrands;
      finalBUnitId = this.state.selectedBusinessUnit

    } else if (data === "edit") {
      // finalBrandId = brandIds ? brandIds : this.state.editIndibrandName;
      finalBrandId = brandIds ? brandIds : this.state.selectedBrands;
      finalBUnitId = bUnitId ? bUnitId : this.state.selectedBusinessUnit
    }

    axios({
      method: "post",
      // url: config.apiUrl + "/Category/GetCategoryListByMultiBrandID",
      url: config.apiUrl + "/Category/GetCategoryListByMultiBusinessUnit",
      headers: authHeader(),
      params: {
        BrandIds: finalBrandId,
        BusinessUnits: finalBUnitId
      },
    })
      .then(function (res) {
        var status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          // console.log(data);
          self.setState({
            categoryList: data,
            multibrandIDs: finalBrandId,
          });
        } else {
          self.setState({
            categoryList: [],
            multibrandIDs: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  selectCategory = async (event, catId) => {
    var selectedCategory = this.state.selectedCategory;
    var separator = ",";
    var values = selectedCategory.split(separator);
    let index = values.indexOf("");
    if (index > -1) {
      values.splice(index, 1);
    }
    if (event.target.checked) {
      var flag = values.includes(catId.toString());
      if (!flag) {
        values.unshift(catId);
        selectedCategory = values.join(separator);
      }
      await this.setState({
        selectedCategory: selectedCategory,
      });
    }
    else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == catId) {
          values.splice(i, 1);
          selectedCategory = values.join(separator);
        }
      }
      await this.setState({
        selectedCategory: selectedCategory,
      });
    }

    await this.setState({
      selectedSubCategory: "",
      selectedSubSubCategory: "",
      selectedIssueType: "",
      subCategoryList: [],
      subSubCategoryList: [],
      issueTypeList: [],
    });
    setTimeout(() => {
      if (this.state.selectedCategory.length > 0) {
        this.handleGetSubCategoryList("add");
      }
    }, 1);

  }

  handleGetSubCategoryList(data, catIds) {
    // //debugger
    let self = this;
    var finalCatId = "";
    if (data === "add") {
      finalCatId = this.state.selectedCategory;
    } else if (data === "edit") {
      // finalCatId = catIds ? catIds : this.state.editIndibrandName;
      finalCatId = catIds ? catIds : this.state.selectedCategory;
    }

    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/GetSubCategoryByMultiCategoryID",
      headers: authHeader(),
      params: {
        CategoryIDs: finalCatId,
      },
    })
      .then(function (res) {
        var status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          // console.log(data);
          self.setState({
            subCategoryList: data,
            // multibrandIDs: finalCatId,
          });
        } else {
          self.setState({
            subCategoryList: [],
            // multibrandIDs: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  selectSubCategory = async (event, subCatId) => {
    var selectedSubCategory = this.state.selectedSubCategory;
    var separator = ",";
    var values = selectedSubCategory.split(separator);
    let index = values.indexOf("");
    if (index > -1) {
      values.splice(index, 1);
    }
    if (event.target.checked) {
      var flag = values.includes(subCatId.toString());
      if (!flag) {
        values.unshift(subCatId);
        selectedSubCategory = values.join(separator);
      }
      await this.setState({
        selectedSubCategory: selectedSubCategory,
      });
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == subCatId) {
          values.splice(i, 1);
          selectedSubCategory = values.join(separator);
        }
      }
      await this.setState({
        selectedSubCategory: selectedSubCategory,
      });
    }

    await this.setState({
      selectedSubSubCategory: "",
      selectedIssueType: "",
      subSubCategoryList: [],
      issueTypeList: [],
    });
    setTimeout(() => {
      if (this.state.selectedSubCategory.length > 0) {
        if (this.state.isSubSubCategory) {
          this.handleGetSubSubCategoryList("add");
        }
        else {
          this.handleGetIssuTypeList("add")
        }
      }
    }, 1);

  }

  handleGetSubSubCategoryList(data, subCatId) {
    // //debugger
    let self = this;
    var finalSubCatId = "";
    if (data === "add") {
      finalSubCatId = this.state.selectedSubCategory;
    } else if (data === "edit") {
      // finalSubCatId = subCatId ? subCatId : this.state.editIndibrandName;
      finalSubCatId = subCatId ? subCatId : this.state.selectedSubCategory;
    }

    axios({
      method: "post",
      url: config.apiUrl + "/SubSubCategory/GetSubSubCategoryBySubCategoryID",
      headers: authHeader(),
      params: {
        SubCategoryID: finalSubCatId,
      },
    })
      .then(function (res) {
        var status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          // console.log(data);
          self.setState({
            subSubCategoryList: data,
            multibrandIDs: finalSubCatId,
          });
        } else {
          self.setState({
            subSubCategoryList: [],
            multibrandIDs: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  selectSubSubCategory = async (event, subSubCatID) => {
    var selectedSubSubCategory = this.state.selectedSubSubCategory;
    var separator = ",";
    var values = selectedSubSubCategory.split(separator);
    let index = values.indexOf("");
    if (index > -1) {
      values.splice(index, 1);
    }
    if (event.target.checked) {
      var flag = values.includes(subSubCatID.toString());
      if (!flag) {
        values.unshift(subSubCatID);
        selectedSubSubCategory = values.join(separator);
      }
      await this.setState({
        selectedSubSubCategory: selectedSubSubCategory,
      });
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == subSubCatID) {
          values.splice(i, 1);
          selectedSubSubCategory = values.join(separator);
        }
      }
      await this.setState({
        selectedSubSubCategory: selectedSubSubCategory,
      });

      let checkArray = selectedSubSubCategory.split(",");
      let index = checkArray.indexOf("");
      if (index > -1) {
        checkArray.splice(index, 1);
      }

    }

    await this.setState({
      selectedIssueType: "",
      issueTypeList: [],
    });
    setTimeout(() => {
      if (this.state.selectedSubSubCategory.length > 0) {
        this.handleGetIssuTypeList("add");
      }
    }, 1);

  }

  handleGetIssuTypeList(data, subSubCatId) {
    // //debugger
    let self = this;
    let subOrSubCategoryId = this.state.isSubSubCategory ? this.state.selectedSubSubCategory : this.state.selectedSubCategory;
    var finalSubSubCat = "";
    if (data === "add") {
      finalSubSubCat = subOrSubCategoryId;
    } else if (data === "edit") {
      // finalSubSubCat = subSubCatId ? subSubCatId : this.state.editIndibrandName;
      finalSubSubCat = subSubCatId ? subSubCatId : subOrSubCategoryId;
    }

    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/GetIssueTypeListByMultiSubCategoryID",
      headers: authHeader(),
      params: {
        SubCategoryIDs: finalSubSubCat,
        isSubSubCateogry: this.state.isSubSubCategory
      },
    })
      .then(function (res) {
        var status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          // console.log(data);
          self.setState({
            issueTypeList: data,
            // multibrandIDs: finalSubSubCat,
          });
        } else {
          self.setState({
            issueTypeList: [],
            // multibrandIDs: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  selectIssueType = async (event, issueId) => {
    var selectedIssueType = this.state.selectedIssueType;
    var separator = ",";
    var values = selectedIssueType.split(separator);
    let index = values.indexOf("");
    if (index > -1) {
      values.splice(index, 1);
    }
    if (event.target.checked) {
      var flag = values.includes(issueId.toString());
      if (!flag) {
        values.unshift(issueId);
        selectedIssueType = values.join(separator);
      }
      await this.setState({
        selectedIssueType: selectedIssueType,
      });
    } else {
      for (var i = 0; i < values.length; i++) {
        if (values[i] == issueId) {
          values.splice(i, 1);
          selectedIssueType = values.join(separator);
        }
      }
      await this.setState({
        selectedIssueType: selectedIssueType,
      });

      let checkArray = selectedIssueType.split(",");
      let index = checkArray.indexOf("");
      if (index > -1) {
        checkArray.splice(index, 1);
      }
    }
  }
  handleOverlay = (e) => {
    this.setState({
      isOverlay: false,
      showDropDown: ""
    })
  }
  handleShowDropDown = (e) => {
    this.setState({
      isOverlay: true,
      showDropDown: e.target.id
    })
  }

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    const { isOverlay, showDropDown, isSubSubCategory, isBusinessUnit, selectedBrands, brandNameList, selectedBusinessUnit, businessUnitList, selectedCategory, categoryList, selectedSubCategory, subCategoryList, selectedSubSubCategory, subSubCategoryList, issueTypeList, selectedIssueType } = this.state;
    return (
      <React.Fragment>
        <div className="position-relative d-inline-block">
          <Modal
            show={this.state.StatusModel}
            onHide={this.StatusCloseModel.bind(this)}
            modalId="Status-popup"
            overlayId="logout-ovrly"
          >
            <div className="status-drop-down">
              <div className="sort-sctn">
                <label style={{ color: "#0066cc", fontWeight: "bold" }}>
                  {this.state.sortHeader}
                </label>
                <div className="d-flex">
                  <a
                    href="#!"
                    onClick={this.sortStatusAtoZ.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.p.sortatoz
                      : "SORT BY A TO Z"}
                  </p>
                </div>
                <div className="d-flex">
                  <a
                    href="#!"
                    onClick={this.sortStatusZtoA.bind(this)}
                    className="sorting-icon"
                  >
                    <img src={Sorting} alt="sorting-icon" />
                  </a>
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.p.sortztoa
                      : "SORT BY Z TO A"}
                  </p>
                </div>
              </div>
              <a
                href=""
                style={{ margin: "0 25px", textDecoration: "underline" }}
                onClick={this.setSortCheckStatus.bind(this, "all")}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.a.clearsearch
                  : "clear search"}
              </a>
              <div className="filter-type">
                <p>
                  {TranslationContext !== undefined
                    ? TranslationContext.p.filterbytype
                    : "FILTER BY TYPE"}
                </p>
                <input
                  type="text"
                  style={{ display: "block" }}
                  value={this.state.filterTxtValue}
                  onChange={this.filteTextChange.bind(this)}
                />
                <div className="FTypeScroll">
                  <div className="filter-checkbox">
                    <input
                      type="checkbox"
                      name="filter-type"
                      id={"fil-open"}
                      value="all"
                      checked={
                        this.state.stemplateNameFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.screatedByFilterCheckbox.includes("all") ||
                        this.state.screatedByFilterCheckbox.includes("all")
                      }
                      onChange={this.setSortCheckStatus.bind(this, "all")}
                    />
                    <label htmlFor={"fil-open"}>
                      <span className="table-btn table-blue-btn">ALL</span>
                    </label>
                  </div>
                  {this.state.sortColumn === "issueTypeName"
                    ? this.state.sortFilterIssueType !== null &&
                    this.state.sortFilterIssueType.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.issueTypeName}
                          value={item.issueTypeName}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "issueTypeName",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.issueTypeName}>
                          <span className="table-btn table-blue-btn">
                            {item.issueTypeName}
                          </span>
                        </label>
                      </div>
                    ))
                    : null}

                  {this.state.sortColumn === "templateName"
                    ? this.state.sortFilterName !== null &&
                    this.state.sortFilterName.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.templateName}
                          value={item.templateName}
                          checked={this.state.stemplateNameFilterCheckbox.includes(
                            item.templateName
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "templateName",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.templateName}>
                          <span className="table-btn table-blue-btn">
                            {item.templateName}
                          </span>
                        </label>
                      </div>
                    ))
                    : null}

                  {this.state.sortColumn === "createdBy"
                    ? this.state.sortFilterCreatedBy !== null &&
                    this.state.sortFilterCreatedBy.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.createdBy}
                          value={item.createdBy}
                          checked={this.state.screatedByFilterCheckbox.includes(
                            item.createdBy
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "createdBy",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.createdBy}>
                          <span className="table-btn table-blue-btn">
                            {item.createdBy}
                          </span>
                        </label>
                      </div>
                    ))
                    : null}

                  {this.state.sortColumn === "templateStatus"
                    ? this.state.sortFilterStatus !== null &&
                    this.state.sortFilterStatus.map((item, i) => (
                      <div className="filter-checkbox">
                        <input
                          type="checkbox"
                          name="filter-type"
                          id={"fil-open" + item.templateStatus}
                          value={item.templateStatus}
                          checked={this.state.stemplateStatusFilterCheckbox.includes(
                            item.templateStatus
                          )}
                          onChange={this.setSortCheckStatus.bind(
                            this,
                            "templateStatus",
                            "value"
                          )}
                        />
                        <label htmlFor={"fil-open" + item.templateStatus}>
                          <span className="table-btn table-blue-btn">
                            {item.templateStatus}
                          </span>
                        </label>
                      </div>
                    ))
                    : null}
                </div>
              </div>
            </div>
          </Modal>
        </div>

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
          <Link to={Demo.BLANK_LINK} className="header-path active">
            {TranslationContext !== undefined
              ? TranslationContext.strong.templates
              : "Templates"}
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr settingtable">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height settings-align">
                  <ReactTable
                    minRows={2}
                    data={this.state.template}
                    columns={[
                      {
                        Header: (
                          <span
                            className={this.state.nameColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "templateName",
                              TranslationContext !== undefined
                                ? TranslationContext.label.templatename
                                : "Template Name"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.label.name
                              : "Name"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "templateName",
                      },
                      {
                        Header: (
                          <span className={this.state.issueColor}>
                            {TranslationContext !== undefined
                              ? TranslationContext.label.issuetype
                              : "Issue Type"}
                          </span>
                        ),
                        sortable: false,
                        accessor: "issueTypeCount",
                        Cell: (row) => {
                          if (row.original.issueTypeCount === 1) {
                            return (
                              <span>
                                <label>{row.original.issueTypeName}</label>
                              </span>
                            );
                          } else {
                            return (
                              <span>
                                <label>{row.original.issueTypeCount}</label>
                              </span>
                            );
                          }
                        },
                      },
                      {
                        Header: (
                          <span className={this.state.issueColor}>
                            Channel
                          </span>
                        ),
                        accessor: "channelName",
                        sortable: false,
                      },
                      {
                        id: "createdBy",
                        Header: (
                          <span
                            className={this.state.createdColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "createdBy",
                              TranslationContext !== undefined
                                ? TranslationContext.label.createdby
                                : "Created By"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.label.createdby
                              : "Created by"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        Cell: (row) => {
                          var ids = row.original["id"];
                          return (
                            <>
                              <span className="one-liner">
                                {row.original.createdBy}
                                <Popover
                                  content={
                                    <div className="settings-created-by-popover">
                                      <div>
                                        <b>
                                          <p className="title">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                .createdby
                                              : "Created By"}
                                            : {row.original.createdBy}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p.createddate
                                            : "Created Date"}
                                          : {row.original.createdDate}
                                        </p>
                                      </div>
                                      <div>
                                        <b>
                                          <p className="title">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p.updatedby
                                              : "Updated By"}
                                            : {row.original.modifiedBy}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p.updateddate
                                            : "Updated Date"}
                                          : {row.original.modifiedDate}
                                        </p>
                                      </div>
                                    </div>
                                  }
                                  placement="bottom"
                                >
                                  <img
                                    src={InfoImg}
                                    className="info-icon"
                                    alt="Info"
                                    id={ids}
                                  />
                                </Popover>
                              </span>
                            </>
                          );
                        },
                      },
                      {
                        Header: (
                          <span
                            className={this.state.statusColor}
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "templateStatus",
                              TranslationContext !== undefined
                                ? TranslationContext.label.status
                                : "Status"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.label.status
                              : "Status"}
                            <FontAwesomeIcon icon={faCaretDown} />
                          </span>
                        ),
                        sortable: false,
                        accessor: "templateStatus",
                      },
                      {
                        Header:
                          TranslationContext !== undefined
                            ? TranslationContext.label.actions
                            : "Actions",
                        sortable: false,
                        Cell: (row) => {
                          var ids = row.original["id"];
                          return (
                            <>
                              <span className="settings-align-actions">
                                <Popover
                                  content={
                                    <div className="d-flex general-popover popover-body">
                                      <div className="del-big-icon">
                                        <img src={DelBigIcon} alt="del-icon" />
                                      </div>
                                      <div>
                                        <p className="font-weight-bold blak-clr">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p.deletefile
                                            : "Delete file?"}
                                        </p>
                                        <p className="mt-1 fs-12">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p
                                              .areyousureyouwanttodeletethisfile
                                            : "Are you sure you want to delete this file"}
                                          ?
                                        </p>
                                        <div className="del-can">
                                          <a href={Demo.BLANK_LINK}>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.button.cancel
                                              : "CANCEL"}
                                          </a>
                                          <button
                                            className="butn"
                                            onClick={this.deleteTemplate.bind(
                                              this,
                                              row.original.templateID
                                            )}
                                          >
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label.delete
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
                                    src={DeleteIcon}
                                    alt="del-icon"
                                    className="del-btn"
                                    id={ids}
                                  />
                                </Popover>

                                <button
                                  className="react-tabel-button editre"
                                  id="p-edit-pop-2"
                                  onClick={this.setTemplateEditData.bind(
                                    this,
                                    row.original
                                  )}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.button.edit
                                    : "EDIT"}
                                </button>
                              </span>
                            </>
                          );
                        },
                      },
                    ]}
                    resizable={false}
                    defaultPageSize={5}
                    showPagination={true}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="createHierarchyMask">
                  <div className="createSpace">
                    <label className="create-department">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.createtemlate
                        : "CREATE TEMPLATES"}
                    </label>
                    <div className="div-padding-1">
                      <label className="designation-name">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.name
                          : "Name"}
                      </label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.label.entername
                            : "Enter Name"
                        }
                        maxLength={50}
                        value={this.state.TemplateName}
                        onChange={this.handleTemplateName}
                      />
                      {this.state.TemplateName.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.templatenamecopulsion}
                        </p>
                      )}
                    </div>


                    {/* Updated Template flow start here ......................*/}

                    <div className={isOverlay ? "overLay show" : "overLay"} onClick={this.handleOverlay} />

                    {/* Brand */}
                    <div className="pop-over-div pb-2">
                      <label className="reports-to"> {TranslationContext !== undefined ? TranslationContext.label.brand : this.state?.ticketFields[2]?.displayEnglishName} </label>
                      <div className="dropdown issuetype-cusdrp">
                        <button className="btn issuesladrop mb-0" type="button" id="brandNameValue" onClick={this.handleShowDropDown}>
                          {selectedBrands ? selectedBrands.split(",").length === brandNameList?.length ?
                            "All Selected" :
                            selectedBrands.split(",").length + " Selected" : "Select"}
                          <span className="caret"></span> </button>

                        <div className={showDropDown === "brandNameValue" ? "dropdown-menu dropdown-menu-sla show" : "dropdown-menu dropdown-menu-sla"} >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label onClick={() => this.handleSelectAll("brandNameValue", "brandNamecheckall")}>Select All</label>
                                </li>
                                <li>
                                  <label onClick={() => this.handleClearAll("brandNamecheckall")}>Clear </label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {brandNameList !== null &&
                                  brandNameList.map((item, i) => (
                                    <li key={i}>
                                      <input type="checkbox" id={"brand" + item.brandID} name="brandNamecheckall"
                                        onChange={(e) => this.selectBrands(e, item.brandID)}
                                        checked={
                                          selectedBrands !==
                                            undefined
                                            ? selectedBrands
                                              .split(",")
                                              .find(
                                                (num) =>
                                                  num ==
                                                  item?.brandID.toString()
                                              )
                                            : false
                                        }
                                      />
                                      <label htmlFor={"brand" + item.brandID} title={item.brandName} >
                                        {item.brandName.length > 20 ? item.brandName.substr(0, 20).concat("...") : item.brandName}
                                        <div>
                                          <img src={Correct} alt="Checked" />
                                        </div>
                                      </label>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      {this.state.selectedBrands === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.isBrandCompulsory}
                        </p>
                      )}
                    </div>

                    {/* Business Unit */}
                    {isBusinessUnit &&
                      <div className="pop-over-div pb-2">
                        <label className="reports-to">{this.state?.ticketFields[44]?.displayEnglishName}</label>
                        <div className="dropdown issuetype-cusdrp">
                          <button className="btn issuesladrop mb-0" type="button" id="businessUnitNameValue" onClick={this.handleShowDropDown}>
                            {selectedBusinessUnit ?
                              selectedBusinessUnit.split(",").length === businessUnitList?.length ?
                                "All Selected" :
                                selectedBusinessUnit.split(",").length + " Selected" : "Select"}
                            <span className="caret"></span> </button>

                          <div className={showDropDown === "businessUnitNameValue" ? "dropdown-menu dropdown-menu-sla show" : "dropdown-menu dropdown-menu-sla"} >
                            <div className="cat-mainbox">
                              <div className="category-button">
                                <ul>
                                  <li>
                                    <label onClick={() => this.handleSelectAll("businessUnitNameValue", "businessUnitcheckall")}>Select All</label>
                                  </li>
                                  <li>
                                    <label onClick={() => this.handleClearAll("businessUnitcheckall")}>Clear </label>
                                  </li>
                                </ul>
                              </div>
                              <div className="category-box category-scroll">
                                <ul className="m-0">
                                  {businessUnitList !== null &&
                                    businessUnitList.map((item, i) => (
                                      <li key={i}>
                                        <input type="checkbox" id={"bunit" + item.businessUnitId} name="businessUnitcheckall"
                                          onChange={(e) => this.selectBusinessUnit(e, item.businessUnitId)}
                                          checked={
                                            selectedBusinessUnit !==
                                              undefined
                                              ? selectedBusinessUnit
                                                .split(",")
                                                .find(
                                                  (num) =>
                                                    num ==
                                                    item?.businessUnitId.toString()
                                                )
                                              : false
                                          }
                                        />
                                        <label htmlFor={"bunit" + item.businessUnitId} title={item.businessUnitName} >
                                          {item.businessUnitName.length > 20 ? item.businessUnitName.substr(0, 20).concat("...") : item.businessUnitName}
                                          <div>
                                            <img src={Correct} alt="Checked" />
                                          </div>
                                        </label>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        {this.state.selectedBusinessUnit === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.isBUnitCompulsory}
                          </p>
                        )}
                      </div>
                    }

                    {/* Category */}
                    <div className="pop-over-div pb-2">
                      {window.localStorage.getItem('Programcode') === "campusshoes" ?
                        <label className="reports-to">{this.state?.ticketFields[3]?.displayEnglishName}</label>
                        : <label className="reports-to"> {TranslationContext !== undefined ? TranslationContext.label.categories : "Category"} </label>
                      }
                      <div className="dropdown issuetype-cusdrp">

                        <button className="btn issuesladrop mb-0" type="button" id="categoryNameValue" onClick={this.handleShowDropDown}>
                          {selectedCategory !== "" ?
                            selectedCategory.split(",").length === categoryList?.length ?
                              "All Selected" :
                              selectedCategory.split(",").length + " Selected" : "Select"}
                          <span className="caret"></span>
                        </button>

                        <div className={showDropDown === "categoryNameValue" ? "dropdown-menu dropdown-menu-sla show" : "dropdown-menu dropdown-menu-sla"} >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label onClick={() => this.handleSelectAll("categoryNameValue", "catNamecheckall")}>Select All</label>
                                </li>
                                <li>
                                  <label onClick={() => this.handleClearAll("catNamecheckall")}>Clear </label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {categoryList !== null &&
                                  categoryList.map((item, i) => (
                                    <li key={i}>
                                      <input type="checkbox" id={"ctg" + item.categoryID} name="catNamecheckall"
                                        onChange={(e) => this.selectCategory(e, item.categoryID)}
                                        checked={
                                          selectedCategory !==
                                            undefined
                                            ? selectedCategory
                                              .split(",")
                                              .find(
                                                (num) =>
                                                  num ==
                                                  item?.categoryID.toString()
                                              )
                                            : false
                                        }
                                      />
                                      <label htmlFor={"ctg" + item.categoryID} title={item.categoryName} >
                                        {item.categoryName.length > 20 ? item.categoryName.substr(0, 20).concat("...") : item.categoryName}
                                        <div>
                                          <img src={Correct} alt="Checked" />
                                        </div>
                                      </label>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      {this.state.selectedCategory === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.isCategCompulsory}
                        </p>
                      )}
                    </div>

                    {/*Sub Category */}
                    <div className="pop-over-div pb-2">
                      {window.localStorage.getItem('Programcode') === "campusshoes" ?
                        <label className="reports-to">{this.state?.ticketFields[4]?.displayEnglishName}</label>
                        :
                        <label className="reports-to"> {TranslationContext !== undefined ? TranslationContext.label.subcategories : "Sub Category"} </label>
                      }
                      <div className="dropdown issuetype-cusdrp">
                        <button className="btn issuesladrop mb-0" type="button" id="subCategoryNameValue" onClick={this.handleShowDropDown}>
                          {selectedSubCategory ?
                            selectedSubCategory.split(",").length === subCategoryList?.length ?
                              "All Selected" :
                              selectedSubCategory.split(",").length + " Selected" : "Select"}
                          <span className="caret"></span> </button>

                        <div className={showDropDown === "subCategoryNameValue" ? "dropdown-menu dropdown-menu-sla show" : "dropdown-menu dropdown-menu-sla"} >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label onClick={() => this.handleSelectAll("subCategoryNameValue", "subCatNamecheckall")}>Select All</label>
                                </li>
                                <li>
                                  <label onClick={() => this.handleClearAll("subCatNamecheckall")}>Clear </label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {subCategoryList !== null &&
                                  subCategoryList.map((item, i) => (
                                    <li key={i}>
                                      <input type="checkbox" id={"subctg" + item.subCategoryID} name="subCatNamecheckall"
                                        onChange={(e) => this.selectSubCategory(e, item.subCategoryID)}
                                        checked={
                                          selectedSubCategory !==
                                            undefined
                                            ? selectedSubCategory
                                              .split(",")
                                              .find(
                                                (num) =>
                                                  num ==
                                                  item?.subCategoryID.toString()
                                              )
                                            : false
                                        }
                                      />
                                      <label htmlFor={"subctg" + item.subCategoryID} title={item.subCategoryName} >
                                        {item.subCategoryName.length > 20 ? item.subCategoryName.substr(0, 20).concat("...") : item.subCategoryName}
                                        <div>
                                          <img src={Correct} alt="Checked" />
                                        </div>
                                      </label>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      {this.state.selectedSubCategory === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.isSubCategCompulsory}
                        </p>
                      )}
                    </div>

                    {/*Sub Sub Category */}
                    {isSubSubCategory &&
                      <div className="pop-over-div pb-2">
                        {/* {window.localStorage.getItem('Programcode') === "campusshoes" ? */}
                        <label className="reports-to">{this.state?.ticketFields[46]?.displayEnglishName}</label>
                        {/* :
                          <label className="reports-to">Sub Sub Category</label> */}
                        {/* } */}
                        <div className="dropdown issuetype-cusdrp">
                          <button className="btn issuesladrop mb-0" type="button" id="subSubCategoryNameValue" onClick={this.handleShowDropDown}>
                            {selectedSubSubCategory ?
                              selectedSubSubCategory.split(",").length === subSubCategoryList?.length ?
                                "All Selected" :
                                selectedSubSubCategory.split(",").length + " Selected" : "Select"}
                            <span className="caret"></span> </button>

                          <div className={showDropDown === "subSubCategoryNameValue" ? "dropdown-menu dropdown-menu-sla show" : "dropdown-menu dropdown-menu-sla"} >
                            <div className="cat-mainbox">
                              <div className="category-button">
                                <ul>
                                  <li>
                                    <label onClick={() => this.handleSelectAll("subSubCategoryNameValue", "subSubCatNamecheckall")}>Select All</label>
                                  </li>
                                  <li>
                                    <label onClick={() => this.handleClearAll("subSubCatNamecheckall")}>Clear</label>
                                  </li>
                                </ul>
                              </div>
                              <div className="category-box category-scroll">
                                <ul className="m-0">
                                  {subSubCategoryList !== null &&
                                    subSubCategoryList.map((item, i) => (
                                      <li key={i}>
                                        <input type="checkbox" id={"subsubctg" + item.subSubCategoryID} name="subSubCatNamecheckall"
                                          onChange={(e) => this.selectSubSubCategory(e, item.subSubCategoryID)}
                                          checked={
                                            selectedSubSubCategory !==
                                              undefined
                                              ? selectedSubSubCategory
                                                .split(",")
                                                .find(
                                                  (num) =>
                                                    num ==
                                                    item?.subSubCategoryID.toString()
                                                )
                                              : false
                                          }
                                        />
                                        <label htmlFor={"subsubctg" + item.subSubCategoryID} title={item.subSubCategoryName} >
                                          {item.subSubCategoryName.length > 20 ? item.subSubCategoryName.substr(0, 20).concat("...") : item.subSubCategoryName}
                                          <div>
                                            <img src={Correct} alt="Checked" />
                                          </div>
                                        </label>
                                      </li>
                                    ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        {this.state.selectedSubSubCategory === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.isSubSubCategCompulsory}
                          </p>
                        )}
                      </div>
                    }

                    {/* New Issue Type */}
                    <div className="pop-over-div pb-2">
                      {/* {window.localStorage.getItem('Programcode') === "campusshoes" ?
                        <label className="reports-to">Sub-Sub Disposition</label>
                        : */}
                      {/* <label className="reports-to">
                          {TranslationContext !== undefined
                            ? TranslationContext.label.issuetype
                            : {this.state?.ticketFields[46]?.displayEnglishName}}
                        </label> */}
                      {/* } */}
                      <label className="reports-to">{this.state?.ticketFields[5]?.displayEnglishName}</label>
                      <div className="dropdown issuetype-cusdrp">
                        <button className="btn issuesladrop mb-0" type="button" id="issueTypeNameValue" onClick={this.handleShowDropDown}>
                          {selectedIssueType ?
                            selectedIssueType.split(",").length === issueTypeList?.length ?
                              "All Selected" :
                              selectedIssueType.split(",").length + " Selected" : "Select"}
                          <span className="caret"></span> </button>

                        <div className={showDropDown === "issueTypeNameValue" ? "dropdown-menu dropdown-menu-sla show" : "dropdown-menu dropdown-menu-sla"} >
                          <div className="cat-mainbox">
                            <div className="category-button">
                              <ul>
                                <li>
                                  <label onClick={() => this.handleSelectAll("issueTypeNameValue", "issueTypecheckall")}>Select All</label>
                                </li>
                                <li>
                                  <label onClick={() => this.handleClearAll("issueTypecheckall")}>Clear</label>
                                </li>
                              </ul>
                            </div>
                            <div className="category-box category-scroll">
                              <ul className="m-0">
                                {issueTypeList !== null &&
                                  issueTypeList.map((item, i) => (
                                    <li key={i}>
                                      <input type="checkbox" id={"issid" + item.issueTypeID} name="issueTypecheckall"
                                        onChange={(e) => this.selectIssueType(e, item.issueTypeID)}
                                        checked={
                                          selectedIssueType !==
                                            undefined
                                            ? selectedIssueType
                                              .split(",")
                                              .find(
                                                (num) =>
                                                  num ==
                                                  item?.issueTypeID.toString()
                                              )
                                            : false
                                        }
                                      />
                                      <label htmlFor={"issid" + item.issueTypeID} title={item.issueTypeName} >
                                        {item.issueTypeName.length > 20 ? item.issueTypeName.substr(0, 20).concat("...") : item.issueTypeName}
                                        <div>
                                          <img src={Correct} alt="Checked" />
                                        </div>
                                      </label>
                                    </li>
                                  ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      {this.state.selectedIssueType === "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.isIssueTypeCompulsory}
                        </p>
                      )}
                    </div>
                    {/* Updated Flow Ends.............................. */}

                    {/* <div className="divSpace">
                      <div className="divSpace">
                        <div className="dropDrownSpace issuetype-cusdrp">
                          <label className="reports-to">
                            {TranslationContext !== undefined
                              ? TranslationContext.label.issuetype
                              : "Issue Type"}
                          </label>
                          <div className="dropdown">
                            <button
                              className="btn issuesladrop"
                              type="button"
                              id="issueTypeValue"
                              onClick={this.handleSlaButton}
                            >
                              {TranslationContext !== undefined
                                ? TranslationContext.button.select
                                : "Select"}
                              <span className="caret"></span>
                            </button>
                            {this.state.indiSla === "" && (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.isIssueTypeCompulsory}
                              </p>
                            )}
                            <div
                              className={
                                this.state.slaShow
                                  ? "dropdown-menu dropdown-menu-sla show"
                                  : "dropdown-menu dropdown-menu-sla"
                              }
                            >
                              <div className="cat-mainbox">
                                <div className="sla-cancel-search">
                                  <input
                                    type="text"
                                    className="searchf"
                                    placeholder={
                                      TranslationContext !== undefined
                                        ? TranslationContext.label.search
                                        : "Search"
                                    }
                                    maxLength={25}
                                    name="store_code"
                                    onChange={this.handleSearchSla}
                                    id="SlaInput"
                                  />

                                  <img
                                    src={Cancel}
                                    alt="cancelimg"
                                    onClick={this.handleClearSearchSla}
                                  />
                                </div>

                                <div className="category-button">
                                  <ul>
                                    <li>
                                      <label
                                        onClick={this.selectAllSLA.bind(this)}
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.selectall
                                          : "Select All"}
                                      </label>
                                    </li>
                                    <li>
                                      <label
                                        onClick={this.selectNoSLA.bind(this)}
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.label.clear
                                          : "Clear"}
                                      </label>
                                    </li>
                                  </ul>
                                </div>
                                <div className="category-box category-scroll">
                                  <ul>
                                    {this.state.slaIssueType !== null &&
                                      this.state.slaIssueType.map((item, i) => (
                                        <li key={i}>
                                          <input
                                            type="checkbox"
                                            id={"i" + item.issueTypeID}
                                            name="allSla"
                                            onChange={this.selectIndividualSLA.bind(
                                              this,
                                              item.issueTypeID
                                            )}
                                          />
                                          <label
                                            htmlFor={"i" + item.issueTypeID}
                                          >
                                            {item.issueTypeName}{" "}
                                            <div>
                                              <img
                                                src={Correct}
                                                alt="Checked"
                                              />
                                            </div>
                                          </label>
                                          <span>{item.brandName}</span>
                                          <span>{item.categoryName}</span>
                                          <span>{item.subCategoryName}</span>
                                        </li>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="category-buttonbtm">
                                <ul>
                                  <li>
                                    <button
                                      className="cancel"
                                      onClick={this.handleSlaButton}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.a.cancel
                                        : "Cancel"}
                                    </button>
                                  </li>
                                  <li style={{ float: "right" }}>
                                    <button
                                      className="done"
                                      onClick={this.handleSlaButton}
                                    >
                                      {TranslationContext !== undefined
                                        ? TranslationContext.button.done
                                        : "Done"}
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <div className="divSpace">
                      <div className="divSpace">
                        <div className="dropDrownSpace issuetype-cusdrp">
                          <label className="reports-to">
                           Channel
                          </label>
                          <div className="dropdown">
                            <select
                              className="form-control dropdown-setting"
                              name="selectChannel"
                              value={this.state.selectedTicketSource}
                              onChange={this.setTicketSourceValue}
                            >
                              <option>Select</option>
                              {this.state.TicketSourceData !== null &&
                                this.state.TicketSourceData.map(
                                  (item, i) => (
                                    <option
                                      key={i}
                                      value={item.ticketSourceName}
                                    >
                                      {item.ticketSourceName}
                                    </option>
                                  )
                                )}
                            </select>
                            {this.state.selectedTicketSource === "" && (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.channelCompulsion}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="divSpace">
                      <div className="dropDrownSpace">
                        <label className="reports-to">
                          {TranslationContext !== undefined
                            ? TranslationContext.label.status
                            : "Status"}
                        </label>
                        <select
                          id="inputState"
                          className="form-control dropdown-setting"
                          value={this.state.TemplateIsActive}
                          onChange={this.handleTemplateIsActive}
                        >
                          <option value="true">
                            {TranslationContext !== undefined
                              ? TranslationContext.option.active
                              : "Active"}
                          </option>
                          <option value="false">
                            {TranslationContext !== undefined
                              ? TranslationContext.option.inactive
                              : "Inactive"}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div className="btnSpace">
                      <button
                        className="CreateADDBtn"
                        onClick={this.handleConfigureTabsOpen.bind(this)}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.button.configuretemplate
                          : "CONFIGURE TEMPLATE"}
                      </button>
                      <Modal
                        size="lg"
                        show={this.state.ConfigTabsModal}
                        onHide={this.handleConfigureTabsClose.bind(this)}
                        className="big-modal-placeholder"
                      >
                        <Modal.Header>
                          <div className="row config-tab">
                            <div className="col-md-9 templateName">
                              <label className="template-text">
                                {TranslationContext !== undefined
                                  ? TranslationContext.label.templatename
                                  : "TEMPLATE NAME"}{" "}
                                :{" "}
                                {this.state.isEdit
                                  ? this.state.templateEdit.TemplateName
                                  : this.state.TemplateName}
                              </label>
                            </div>
                            <div className="col-md-3">
                              <img
                                src={CancelImg}
                                alt="CancelImg"
                                className="cancelImg-config"
                                onClick={this.handleConfigureTabsClose.bind(
                                  this
                                )}
                              />
                            </div>
                          </div>
                        </Modal.Header>

                        <Modal.Body>
                          <div className="tic-det-ck-user template-user myticlist-expand-sect placeholder-alert">
                            <select
                              className="add-select-category"
                              value="0"
                              onChange={this.setPlaceholderValue.bind(this)}
                              onBlur={this.handleEditInputConfirm}
                              onPressEnter={this.handleEditInputConfirm}
                            >
                              <option value="0">
                                {TranslationContext !== undefined
                                  ? TranslationContext.link.placeholders
                                  : "Placeholders"}
                              </option>
                              {this.state.placeholderData !== null &&
                                this.state.placeholderData.map((item, i) => (
                                  <option key={i} value={item.mailParameterID}>
                                    {item.description}
                                  </option>
                                ))}
                            </select>
                          </div>
                          <div className="template-editor">
                            <CKEditor
                              content={this.state.editorContent}
                              events={{
                                change: this.onEditorChange,
                                blur: this.onCkBlur,
                                items: this.fileUpload,
                              }}
                            />
                            <div style={{ marginTop: "1%" }}>
                              {this.state.tags.map((tag, index) => {
                                const isLongTag = tag.length > 20;
                                const tagElem = (
                                  <Tag
                                    className="edit-tag"
                                    key={tag}
                                    closable={index !== -1}
                                    onClose={() => this.handleClose(tag)}
                                  >
                                    <span
                                      onDoubleClick={e => {
                                        if (index !== 0) {
                                          this.setState({ editInputIndex: index, editInputValue: tag }, () => {
                                            this.editInput.focus();
                                          });
                                          e.preventDefault();
                                        }
                                      }}
                                    >
                                      {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                    </span>
                                  </Tag>
                                );
                                return isLongTag ? (
                                  <Tooltip title={tag} key={tag}>
                                    {tagElem}
                                  </Tooltip>
                                ) : (
                                  tagElem
                                );
                              }
                              )
                              }
                            </div>
                          </div>
                          <div className="config-button">
                            <button
                              className="config-buttontext"
                              disabled={this.state.editSaveLoading}
                              onClick={
                                this.state.isEdit
                                  ? this.handleUpdateTemplate.bind(this)
                                  : this.createTemplate.bind(this)
                              }
                              type="submit"
                            >
                              {this.state.editSaveLoading ? (
                                <FontAwesomeIcon
                                  className="circular-loader"
                                  icon={faCircleNotch}
                                  spin
                                />
                              ) : (
                                ""
                              )}
                              {TranslationContext !== undefined
                                ? TranslationContext.button.saveandnext
                                : "SAVE & NEXT"}
                            </button>
                          </div>
                        </Modal.Body>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="editmodal">
            <Modal
              show={this.state.editmodel}
              onHide={this.toggleEditModal}
              Id="tampleteEditModal"
            >
              <div className="edtpadding">
                <div className="">
                  <label className="popover-header-text">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.edittemplate
                      : "EDIT TEMPLATES"}
                  </label>
                </div>
                <div className="pop-over-div">
                  <label className="edit-label-1">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.name
                      : "Name"}
                  </label>
                  <input
                    type="text"
                    className="txt-edit-popover"
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.label.entername
                        : "Enter Name"
                    }
                    maxLength={25}
                    name="TemplateName"
                    value={this.state.templateEdit.TemplateName}
                    onChange={this.handleOnChangeEditData}
                  />
                </div>
                {this.state.templateEdit.TemplateName == "" && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.editTemplateName}
                  </p>
                )}
                <div className="pop-over-div">
                  <label className="edit-label-1">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.issuetype
                      : "Issue Type"}
                  </label>
                  <Select
                    getOptionLabel={(option) => option.issueTypeName}
                    getOptionValue={
                      (option) => option.issueTypeId //id
                    }
                    options={this.state.slaIssueType}
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.button.select
                        : "Select"
                    }
                    closeMenuOnSelect={false}
                    onChange={this.setEditIssueType}
                    value={this.state.editIssueType}
                    isMulti
                  />
                </div>
                {this.state.editIssueType !== null && (
                  <p style={{ color: "red", marginBottom: "0px" }}>
                    {this.state.editIssueTypeSelect}
                  </p>
                )}
                <div className="pop-over-div">
                  <label className="edit-label-1">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.status
                      : "Status"}
                  </label>
                  <select
                    id="inputStatus"
                    className="edit-dropDwon dropdown-setting"
                    name="template_Status"
                    value={this.state.templateEdit.template_Status}
                    onChange={this.handleOnChangeEditData}
                  >
                    <option value="Active">
                      {TranslationContext !== undefined
                        ? TranslationContext.option.active
                        : "Active"}
                    </option>
                    <option value="Inactive">
                      {TranslationContext !== undefined
                        ? TranslationContext.option.inactive
                        : "Inactive"}
                    </option>
                  </select>
                </div>
                <br />
                <div className="text-center">
                  <a className="pop-over-cancle" onClick={this.toggleEditModal}>
                    {TranslationContext !== undefined
                      ? TranslationContext.button.cancel
                      : "CANCEL"}
                  </a>
                  <button className="pop-over-button FlNone">
                    <label
                      className="pop-over-btnsave-text"
                      onClick={this.handleEditSave}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.button.save
                        : "SAVE"}
                    </label>
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Templates;
