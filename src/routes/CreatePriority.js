import React, { Component, useState } from "react";
import RedDeleteIcon from "./../assets/Images/red-delete-icon.png";
import Sorting from "./../assets/Images/sorting.png";
import BlackDeleteIcon from "./../assets/Images/del-big.png";
import BlackInfoIcon from "./../assets/Images/Info-black.png";
import Demo from "./../store/Hashtag";
import Braille from "./../assets/Images/braille.svg";
import { Table, Popover } from "antd";
import axios from "axios";
import config from "./../helpers/config";
import { Link } from "react-router-dom";
import { authHeader } from "../helpers/authHeader";
import activeStatus from "./activeStatus";
import { NotificationManager } from "react-notifications";
import Modal from "react-bootstrap/Modal";
import { DndProvider, DragSource, DropTarget } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import matchSorter from "match-sorter";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import * as translationHI from "./../translations/hindi";
import * as translationMA from "./../translations/marathi";

let dragingIndex = -1;

class BodyRow extends React.Component {
  render() {
    const {
      isOver,
      connectDragSource,
      connectDropTarget,
      moveRow,
      ...restProps
    } = this.props;
    const style = { ...restProps.style, cursor: "pointer" };

    let { className } = restProps;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += " drop-over-downward";
      }
      if (restProps.index < dragingIndex) {
        className += " drop-over-upward";
      }
    }

    return connectDragSource(
      connectDropTarget(
        <tr {...restProps} className={className} style={style} />
      )
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const DragableBodyRow = DropTarget("row", rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource("row", rowSource, (connect) => ({
    connectDragSource: connect.dragSource(),
  }))(BodyRow)
);

const closest = function(el, selector, rootNode) {
  rootNode = rootNode || document.body;
  const matchesSelector =
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector;
  while (el) {
    const flagRoot = el === rootNode;
    if (flagRoot || matchesSelector.call(el, selector)) {
      if (flagRoot) {
        el = null;
      }
      break;
    }
    el = el.parentElement;
  }
  el.setAttribute("style", "border: 50px solid red;");
  return el;
};

class CreatePriority extends Component {
  constructor(props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.handleGetPriorityList = this.handleGetPriorityList.bind(this);
    this.state = {
      dragIndex: -1,
      draggedIndex: -1,
      activeData: activeStatus(),
      priorityData: [],
      updateDetails: {},
      finalData: {},
      priority_name: "",
      selectedActiveStatus: 0,
      loading: false,
      priorityNameCompulsion: "",
      statusCompulsion: "",
      editpriorityNameCompulsion: "Please enter priority name.",
      editstatusCompulsion: "Please select status.",
      updatedPriorityName: "",
      updatedStatus: "",
      rowData: {},
      editmodel: false,
      editSaveLoading: false,
      sortAllData: [],
      sortName: [],
      sortCreatedDate: [],
      sortCreatedBy: [],
      sortStatus: [],
      sortColumn: "",
      sortHeader: "",
      StatusModel: false,
      nameColor: "",
      createdDateColor: "",
      createdByColor: "",
      statusColor: "",
      temppriorityData: [],
      sFilterCheckbox: "",
      filterTxtValue: "",
      sortFilterName: [],
      sortFilterCreatedBy: [],
      sortFilterCreatedDate: [],
      sortFilterStatus: [],
      spriortyNameFilterCheckbox: "",
      screatedDateFilterCheckbox: "",
      screatedByFilterCheckbox: "",
      spriortyStatusFilterCheckbox: "",
      isortA: false,
      AddPriority: false,
      isNewName: "",
      isprority: false,
      isexist: "",
      editIsExist: "",
      translateLanguage: {},
    };
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.handleOpenEditModal = this.handleOpenEditModal.bind(this);
  }
  components = {
    body: {
      row: DragableBodyRow,
    },
  };
  componentDidMount() {
    this.handleGetPriorityList();
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  sortStatusZtoA() {
    var itemsArray = [];
    itemsArray = this.state.priorityData;

    if (this.state.sortColumn === "priortyName") {
      itemsArray.sort((a, b) => {
        if (a.priortyName < b.priortyName) return 1;
        if (a.priortyName > b.priortyName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "createdDate") {
      itemsArray.sort((a, b) => {
        if (a.createdDate < b.createdDate) return 1;
        if (a.createdDate > b.createdDate) return -1;
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
    if (this.state.sortColumn === "priortyStatus") {
      itemsArray.sort((a, b) => {
        if (a.priortyStatus < b.priortyStatus) return 1;
        if (a.priortyStatus > b.priortyStatus) return -1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      priorityData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    var itemsArray = [];
    itemsArray = this.state.priorityData;

    if (this.state.sortColumn === "priortyName") {
      itemsArray.sort((a, b) => {
        if (a.priortyName < b.priortyName) return -1;
        if (a.priortyName > b.priortyName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "createdDate") {
      itemsArray.sort((a, b) => {
        if (a.createdDate < b.createdDate) return -1;
        if (a.createdDate > b.createdDate) return 1;
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
    if (this.state.sortColumn === "priortyStatus") {
      itemsArray.sort((a, b) => {
        if (a.priortyStatus < b.priortyStatus) return -1;
        if (a.priortyStatus > b.priortyStatus) return 1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      priorityData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }
  StatusOpenModel(data, header) {
    this.setState({
      StatusModel: true,
      sortColumn: data,
      sortHeader: header,
    });
  }
  StatusCloseModel() {
    if (this.state.temppriorityData.length > 0) {
      this.setState({
        StatusModel: false,
        priorityData: this.state.temppriorityData,
        filterTxtValue: "",
        sortFilterName: this.state.sortName,
        sortFilterCreatedBy: this.state.sortCreatedBy,
        sortFilterCreatedDate: this.state.sortCreatedDate,
        sortFilterStatus: this.state.sortStatus,
      });
      if (this.state.sortColumn === "priortyName") {
        if (this.state.spriortyNameFilterCheckbox === "") {
        } else {
          this.setState({
            screatedDateFilterCheckbox: "",
            screatedByFilterCheckbox: "",
            spriortyStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "createdDate") {
        if (this.state.screatedDateFilterCheckbox === "") {
        } else {
          this.setState({
            spriortyNameFilterCheckbox: "",
            screatedByFilterCheckbox: "",
            spriortyStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "createdBy") {
        if (this.state.screatedByFilterCheckbox === "") {
        } else {
          this.setState({
            spriortyNameFilterCheckbox: "",
            screatedDateFilterCheckbox: "",
            spriortyStatusFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "priortyStatus") {
        if (this.state.spriortyStatusFilterCheckbox === "") {
        } else {
          this.setState({
            spriortyNameFilterCheckbox: "",
            screatedDateFilterCheckbox: "",
            screatedByFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        priorityData: this.state.isortA
          ? this.state.priorityData
          : this.state.sortAllData,
        filterTxtValue: "",
        sortFilterName: this.state.sortName,
        sortFilterCreatedBy: this.state.sortCreatedBy,
        sortFilterCreatedDate: this.state.sortCreatedDate,
        sortFilterStatus: this.state.sortStatus,
      });
    }
  }

  setSortCheckStatus = (column, type, e) => {
    var itemsArray = [];

    var spriortyNameFilterCheckbox = this.state.spriortyNameFilterCheckbox;
    var screatedByFilterCheckbox = this.state.screatedByFilterCheckbox;
    var screatedDateFilterCheckbox = this.state.screatedDateFilterCheckbox;
    var spriortyStatusFilterCheckbox = this.state.spriortyStatusFilterCheckbox;

    if (column === "priortyName" || column === "all") {
      if (type === "value" && type !== "All") {
        spriortyNameFilterCheckbox = spriortyNameFilterCheckbox.replace(
          "all",
          ""
        );
        spriortyNameFilterCheckbox = spriortyNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (spriortyNameFilterCheckbox.includes(e.currentTarget.value)) {
          spriortyNameFilterCheckbox = spriortyNameFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          spriortyNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (spriortyNameFilterCheckbox.includes("all")) {
          spriortyNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "priortyName") {
            for (let i = 0; i < this.state.sortName.length; i++) {
              spriortyNameFilterCheckbox +=
                this.state.sortName[i].priortyName + ",";
            }
            spriortyNameFilterCheckbox += "all";
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
    if (column === "createdDate" || column === "all") {
      if (type === "value" && type !== "All") {
        screatedDateFilterCheckbox = screatedDateFilterCheckbox.replace(
          "all",
          ""
        );
        screatedDateFilterCheckbox = screatedDateFilterCheckbox.replace(
          "all,",
          ""
        );
        if (screatedDateFilterCheckbox.includes(e.currentTarget.value)) {
          screatedDateFilterCheckbox = screatedDateFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          screatedDateFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (screatedDateFilterCheckbox.includes("all")) {
          screatedDateFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "createdDate") {
            for (let i = 0; i < this.state.sortCreatedDate.length; i++) {
              screatedDateFilterCheckbox +=
                this.state.sortCreatedDate[i].createdDate + ",";
            }
            screatedDateFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "priortyStatus" || column === "all") {
      if (type === "value" && type !== "All") {
        spriortyStatusFilterCheckbox = spriortyStatusFilterCheckbox.replace(
          "all",
          ""
        );
        spriortyStatusFilterCheckbox = spriortyStatusFilterCheckbox.replace(
          "all,",
          ""
        );
        if (spriortyStatusFilterCheckbox.includes(e.currentTarget.value)) {
          spriortyStatusFilterCheckbox = spriortyStatusFilterCheckbox.replace(
            e.currentTarget.value + ",",
            ""
          );
        } else {
          spriortyStatusFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (spriortyStatusFilterCheckbox.includes("all")) {
          spriortyStatusFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "priortyStatus") {
            for (let i = 0; i < this.state.sortState.length; i++) {
              spriortyStatusFilterCheckbox +=
                this.state.sortState[i].priortyStatus + ",";
            }
            spriortyStatusFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      spriortyNameFilterCheckbox,
      screatedByFilterCheckbox,
      screatedDateFilterCheckbox,
      spriortyStatusFilterCheckbox,
      nameColor: "",
      createdDateColor: "",
      createdByColor: "",
      statusColor: "",
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "priortyName") {
      var sItems = spriortyNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.priortyName === sItems[i]
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
              (a) => a.createdByName === sItems[i]
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
        createdByColor: "sort-column",
      });
    } else if (column === "createdDate") {
      var sItems = screatedDateFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.createdDate === sItems[i]
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
        createdDateColor: "sort-column",
      });
    } else if (column === "priortyStatus") {
      var sItems = spriortyStatusFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.priortyStatus === sItems[i]
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
      temppriorityData: itemsArray,
    });
    // this.StatusCloseModel();
  };

  ////move row info
  moveRow = (dragIndex, hoverIndex) => {
    const TranslationContext = this.state.translateLanguage.default;
    const { priorityData } = this.state;
    const dragRow = priorityData[dragIndex];

    var paramData = {};
    paramData.selectedPriorityID = dragRow.priorityID;
    paramData.currentPriorityID = this.state.priorityData[
      hoverIndex
    ].priorityID;
    this.setState(
      update(this.state, {
        priorityData: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
        },
      })
    );
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Priority/UpdatePriorityOrder",
      headers: authHeader(),
      params: paramData,
    })
      .then(function(res) {
        if (res.data.responseData) {
          self.handleGetPriorityList();
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.sorrywedontsortrowoflist
              : "Sorry we don't sort row of list."
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  };
  handleGetPriorityList() {
    let self = this;
    this.setState({ loading: true });
    axios({
      method: "get",
      url: config.apiUrl + "/Priority/PriorityList",
      headers: authHeader(),
      params: {
        PriorityFor: 1,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success" && data !== undefined) {
          data.map((row) => {
            row["isPopoverOpen"] = false;
          });
          self.setState({
            priorityData: data,
            loading: false,
          });
        } else {
          self.setState({
            priorityData: [],
            loading: false,
          });
        }

        if (data !== null) {
          self.state.sortAllData = data;
          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].priortyName]) {
              distinct.push(data[i].priortyName);
              unique[data[i].priortyName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortName.push({ priortyName: distinct[i] });
            self.state.sortFilterName.push({ priortyName: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].createdDate]) {
              distinct.push(data[i].createdDate);
              unique[data[i].createdDate] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortCreatedDate.push({ createdDate: distinct[i] });
            self.state.sortFilterCreatedDate.push({ createdDate: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].createdByName]) {
              distinct.push(data[i].createdByName);
              unique[data[i].createdByName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortCreatedBy.push({ createdBy: distinct[i] });
            self.state.sortFilterCreatedBy.push({ createdBy: distinct[i] });
          }

          var unique = [];
          var distinct = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].priortyStatus]) {
              distinct.push(data[i].priortyStatus);
              unique[data[i].priortyStatus] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            self.state.sortStatus.push({ priortyStatus: distinct[i] });
            self.state.sortFilterStatus.push({ priortyStatus: distinct[i] });
          }
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleSubmitData() {
    const TranslationContext = this.state.translateLanguage.default;
    if (
      this.state.priority_name.length > 0 &&
      this.state.selectedActiveStatus.length > 0
    ) {
      let self = this;
      var activeStatus = 0;
      var status = this.state.selectedActiveStatus;
      if (status === "Active") {
        activeStatus = 1;
      } else {
        activeStatus = 0;
      }

      if (this.state.isexist === "") {
        this.setState({
          AddPriority: true,
        });
        axios({
          method: "post",
          url: config.apiUrl + "/Priority/AddPriority",
          headers: authHeader(),
          params: {
            PriorityName: this.state.priority_name.trim(),
            status: activeStatus,
          },
        })
          .then(function(res) {
            let status = res.data.message;
            if (status === "Success") {
              self.handleGetPriorityList();
              NotificationManager.success(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.priorityaddedsuccessfully
                  : "Priority Added successfully."
              );
              self.setState({
                priority_name: "",
                selectedActiveStatus: 0,
                priorityNameCompulsion: "",
                statusCompulsion: "",
                AddPriority: false,
              });
            } else {
              self.setState({
                AddPriority: false,
              });
            }
          })
          .catch((data) => {
            console.log(data);
            this.setState({
              AddPriority: false,
            });
          });
      }
    } else {
      this.setState({
        priorityNameCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseenterpriorityname
            : "Please Enter Priority Name.",
        statusCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseselectstatus
            : "Please Select Status.",
      });
    }
  }
  handleDeleteData(priority_ID) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Priority/DeletePriority",
      headers: authHeader(),
      params: {
        PriorityID: priority_ID,
      },
    })
      .then(function(res) {
        let status = res.data.statusCode;
        if (status === 1010) {
          self.handleGetPriorityList();
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.prioritydeletesuccessfully
              : "Priority delete successfully."
          );
        } else {
          NotificationManager.error(res.data.message);
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleUpdateData() {
    const TranslationContext = this.state.translateLanguage.default;
    if (this.state.rowData.priortyName == "") {
      this.setState({
        editpriorityNameCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseenterpriorityname
            : "Please Enter Priority Name.",
      });
    } else {
      if (this.state.isprority == true) {
        this.setState({
          editIsExist:
            TranslationContext !== undefined
              ? TranslationContext.ticketingDashboard.priorityalreadyexist
              : "Priority already exist!",
        });
      } else {
        this.setState({ editpriorityNameCompulsion: "" });
      }
    }

    if (this.state.rowData.isActive === "") {
      this.setState({
        editstatusCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseselectstatus
            : "Please select status",
      });
    } else {
      this.setState({
        editstatusCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseselectstatus
            : "Please select status",
      });
    }
    setTimeout(() => {
      const TranslationContext = this.state.translateLanguage.default;
      if (
        this.state.rowData.priortyName !== "" &&
        this.state.editpriorityNameCompulsion == "" &&
        this.state.isprority == false
      ) {
        let self = this;
        var activeStatus = 0;

        if (this.state.rowData.isActive === "Active") {
          activeStatus = 1;
        } else {
          activeStatus = 0;
        }
        this.setState({ editSaveLoading: true });

        axios({
          method: "post",
          url: config.apiUrl + "/Priority/UpdatePriority",
          headers: authHeader(),
          params: {
            PriorityID: this.state.rowData.priorityID,
            PriorityName: this.state.rowData.priortyName.trim(),
            status: activeStatus,
          },
        })
          .then(function(res) {
            let status = res.data.message;
            if (status === "Success") {
              self.setState({ editSaveLoading: false, editmodel: false });
              self.handleGetPriorityList();
              NotificationManager.success(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.priorityupdatedsuccessfully
                  : "Priority updated successfully."
              );
              self.setState({
                rowData: {},
                priority_name: "",
                selectedActiveStatus: 0,
              });
            }
          })
          .catch((data) => {
            self.setState({ editSaveLoading: false, editmodel: false });
            console.log(data);
          });
      } else {
        // this.setState({
        //   editpriorityNameCompulsion: "Please enter priority name",
        //   editstatusCompulsion: "Please select status",
        // });
      }
    }, 100);
  }

  onMouseDown(e) {
    const target = this.getTrNode(e.target);
    if (target) {
      target.setAttribute("draggable", true);
      target.ondragstart = this.onDragStart;
      target.ondragend = this.onDragEnd;
    }
  }
  onDragStart(e) {
    const target = this.getTrNode(e.target);
    if (target) {
      e.dataTransfer.effectAllowed = "move";
      target.parentElement.ondragenter = this.onDragEnter;
      target.parentElement.ondragover = function(ev) {
        ev.preventDefault();
        return true;
      };
      const dragIndex = target.rowIndex - 1;
      this.setState({ dragIndex, draggedIndex: dragIndex });
    }
  }

  onDragEnter(e) {
    const target = this.getTrNode(e.target);
    this.setState({
      draggedIndex: target ? target.rowIndex - 1 : -1,
    });
  }
  onDragEnd(e) {
    const target = this.getTrNode(e.target);
    if (target) {
      target.setAttribute("draggable", false);
      target.ondragstart = null;
      target.ondragend = null;
      target.parentElement.ondragenter = null;
      target.parentElement.ondragover = null;
      this.changeRowIndex();
    }
  }

  getTrNode(target) {
    return closest(target, "tr");
  }

  changeRowIndex() {
    const result = {};
    const currentState = this.state;
    result.dragIndex = result.draggedIndex = -1;
    if (
      currentState.dragIndex >= 0 &&
      currentState.dragIndex !== currentState.draggedIndex
    ) {
      const { dragIndex, draggedIndex, priorityData: oldData } = currentState;
      const data = [...oldData];
      const item = data.splice(dragIndex, 1)[0];
      data.splice(draggedIndex, 0, item);
      result.data = data;
      result.dragIndex = -1;
      result.draggedIndex = -1;
    }
    this.setState(result);
  }
  handleCreateOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (e.target.value == "") {
      this.setState({ isexist: "" });
    }
  };
  handleOnChangeData = (e) => {
    var name = e.target.name;
    var value = e.target.value;

    var data = this.state.finalData;
    data[name] = value;

    this.setState({
      finalDatatemp: data,
    });
  };
  handleActiveStatus = (e) => {
    let value = e.target.value;
    this.setState({ selectedActiveStatus: value });
  };
  handleroweditClick(e, data) {
    var finalData = e;
    finalData.name = finalData.priortyName;
    finalData.status = finalData.priortyStatus;

    this.setState({ finalData });
  }

  handleOpenEditModal(Data, e) {
    var rowData = {};
    rowData.priorityID = Data.priorityID;
    rowData.priortyName = Data.priortyName;
    var isNewName = Data.priortyName;
    rowData.isActive = Data.isActive === true ? "Active" : "Inactive";
    this.setState({
      editmodel: true,
      rowData,
      isNewName,
      editpriorityNameCompulsion: "",
    });
  }
  toggleEditModal() {
    this.setState({ editmodel: false, editpriorityNameCompulsion: "" });
  }

  handelEditChange(e) {
    const TranslationContext = this.state.translateLanguage.default;
    const { name, value } = e.target;

    var rowData = this.state.rowData;

    rowData[name] = value;

    this.setState({ rowData });
    if (name === "priortyName" && value == "") {
      this.setState({
        editIsExist: "",
        editpriorityNameCompulsion:
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseenterpriorityname
            : "Please Enter Priority Name.",
      });
    } else {
      this.setState({
        editIsExist: "",
        editpriorityNameCompulsion: "",
      });
    }
  }
  filteTextChange(e) {
    this.setState({ filterTxtValue: e.target.value });
    if (this.state.sortColumn === "priortyName") {
      var sortFilterName = matchSorter(this.state.sortName, e.target.value, {
        keys: ["priortyName"],
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
        {
          keys: ["createdBy"],
        }
      );
      if (sortFilterCreatedBy.length > 0) {
        this.setState({ sortFilterCreatedBy });
      } else {
        this.setState({
          sortFilterCreatedBy: this.state.sortCreatedBy,
        });
      }
    }
    if (this.state.sortColumn === "createdDate") {
      var sortFilterCreatedDate = matchSorter(
        this.state.sortCreatedDate,
        e.target.value,
        { keys: ["createdDate"] }
      );
      if (sortFilterCreatedDate.length > 0) {
        this.setState({ sortFilterCreatedDate });
      } else {
        this.setState({
          sortFilterCreatedDate: this.state.sortCreatedDate,
        });
      }
    }
    if (this.state.sortColumn === "priortyStatus") {
      var sortFilterStatus = matchSorter(
        this.state.sortStatus,
        e.target.value,
        { keys: ["priortyStatus"] }
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
  ////handle check prority
  handleCheckPriorityExits() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    var priority_name = "";
    if (this.state.editmodel) {
      if (
        this.state.isNewName !== this.state.rowData.priortyName &&
        this.state.rowData.priortyName !== ""
      ) {
        priority_name = this.state.rowData.priortyName;
        this.setState({ isprority: false });
      } else {
        this.setState({
          editpriorityNameCompulsion:
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.pleaseenterpriorityname
              : "Please Enter Priority Name.",
        });
        return false;
      }
    } else {
      if (this.state.priority_name !== "") {
        priority_name = this.state.priority_name;
      } else {
        return false;
      }
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Priority/ValidatePriorityNameExist",
      headers: authHeader(),
      params: { PriorityName: priority_name },
    })
      .then(function(response) {
        var message = response.data.message;
        var responseData = response.data.responseData;
        if (message == "Success") {
          if (responseData === "Priority already exist!") {
            if (self.state.editmodel) {
              self.setState({
                isprority: true,
                editIsExist:
                  TranslationContext !== undefined
                    ? TranslationContext.ticketingDashboard.priorityalreadyexist
                    : "Priority already exist!",
              });
            } else {
              self.setState({
                isexist:
                  TranslationContext !== undefined
                    ? TranslationContext.ticketingDashboard.priorityalreadyexist
                    : "Priority already exist!",
              });
            }
          } else {
            self.setState({
              isprority: false,
              isexist: "",
              editIsExist: "",
              editpriorityNameCompulsion: "",
            });
          }
        }
      })
      .catch((response) => {
        console.log(response, "---handleCheckPriorityExits");
      });
  }

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <React.Fragment>
        {/* <NotificationContainer /> */}
        <div className="position-relative d-inline-block">
          <Modal
            show={this.state.StatusModel}
            onHide={this.StatusCloseModel.bind(this)}
            modalId="Status-popup"
            overlayId="logout-ovrly"
          >
            <div className="status-drop-down">
              <div className="sort-sctn text-center">
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
                    {" "}
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
                        this.state.spriortyNameFilterCheckbox.includes("all") ||
                        this.state.screatedDateFilterCheckbox.includes("all") ||
                        this.state.screatedByFilterCheckbox.includes("all") ||
                        this.state.spriortyStatusFilterCheckbox.includes("all")
                      }
                      onChange={this.setSortCheckStatus.bind(this, "all")}
                    />
                    <label htmlFor={"fil-open"}>
                      <span className="table-btn table-blue-btn">ALL</span>
                    </label>
                  </div>
                  {this.state.sortColumn === "priortyName"
                    ? this.state.sortFilterName !== null &&
                      this.state.sortFilterName.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name={item.priortyName}
                            id={"fil-open" + item.priortyName}
                            value={item.priortyName}
                            checked={this.state.spriortyNameFilterCheckbox.includes(
                              item.priortyName
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "priortyName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.priortyName}>
                            <span className="table-btn table-blue-btn">
                              {item.priortyName}
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
                            name={item.createdBy}
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

                  {this.state.sortColumn === "createdDate"
                    ? this.state.sortFilterCreatedDate !== null &&
                      this.state.sortFilterCreatedDate.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name={item.createdDate}
                            id={"fil-open" + item.createdDate}
                            value={item.createdDate}
                            checked={this.state.screatedDateFilterCheckbox.includes(
                              item.createdDate
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "createdDate",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.createdDate}>
                            <span className="table-btn table-blue-btn">
                              {item.createdDate}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "priortyStatus"
                    ? this.state.sortFilterStatus !== null &&
                      this.state.sortFilterStatus.map((item, i) => (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            name={item.priortyStatus}
                            id={"fil-open" + item.priortyStatus}
                            value={item.priortyStatus}
                            checked={this.state.spriortyStatusFilterCheckbox.includes(
                              item.priortyStatus
                            )}
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "priortyStatus",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.priortyStatus}>
                            <span className="table-btn table-blue-btn">
                              {item.priortyStatus}
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
              ? TranslationContext.span.priority
              : "Priority"}
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                {/* {this.state.loading === true ? (
                  <div className="loader-icon"></div>
                ) : ( */}
                <div className="table-cntr table-height table-priority settings-align">
                  <DndProvider backend={HTML5Backend}>
                    <Table
                      className={
                        (this.state.dragIndex >= 0 && "dragging-container") ||
                        ""
                      }
                      // columns={this.state.columns}
                      columns={[
                        {
                          key: "data",
                          render: (text, record, index) => (
                            <span>
                              {(this.state.dragIndex >= 0 &&
                                this.state.dragIndex !==
                                  this.state.draggedIndex &&
                                index === this.state.draggedIndex && (
                                  <span
                                    className={`drag-target-line ${
                                      this.state.draggedIndex <
                                      this.state.dragIndex
                                        ? "drag-target-top"
                                        : ""
                                    }`}
                                  />
                                )) ||
                                ""}
                              <a
                                className="drag-handle"
                                draggable="false"
                                onMouseDown={this.onMouseDown}
                                href="#!"
                              >
                                <img src={Braille} alt="braille-icon" />
                              </a>
                            </span>
                          ),
                        },
                        {
                          title: (filters, sortOrder) => (
                            <span>
                              {TranslationContext !== undefined
                                ? TranslationContext.label.priorityname
                                : "Priority Name"}
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          dataIndex: "priortyName",
                          key: "priortyName",
                          filterMultiple: false,
                          onFilter: (value, record) =>
                            record.priortyName.indexOf(value) === 0,
                          // sorter: (a, b) =>
                          //   a.priortyName.length - b.priortyName.length,
                          sortDirections: ["descend", "ascend"],

                          onHeaderCell: (column) => {
                            return {
                              onClick: () => {
                                if (
                                  this.state.screatedDateFilterCheckbox !==
                                    "" ||
                                  this.state.screatedByFilterCheckbox !== "" ||
                                  this.state.spriortyStatusFilterCheckbox !== ""
                                ) {
                                  this.setState({
                                    StatusModel: true,
                                    sortColumn: "priortyName",
                                    sortHeader:
                                      TranslationContext !== undefined
                                        ? TranslationContext.label.priorityname
                                        : "Priority Name",
                                  });
                                } else {
                                  this.setState({
                                    screatedDateFilterCheckbox: "",
                                    screatedByFilterCheckbox: "",
                                    spriortyStatusFilterCheckbox: "",

                                    StatusModel: true,
                                    sortColumn: "priortyName",
                                    sortHeader:
                                      TranslationContext !== undefined
                                        ? TranslationContext.label.priorityname
                                        : "Priority Name",
                                  });
                                }
                              },
                            };
                          },
                        },
                        {
                          title: (filters, sortOrder) => (
                            <span>
                              {TranslationContext !== undefined
                                ? TranslationContext.label.createdby
                                : "Created By"}
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          dataIndex: "createdByName",
                          key: "createdByName",
                          filterMultiple: false,
                          onFilter: (value, record) =>
                            record.createdByName.indexOf(value) === 0,
                          // sorter: (a, b) =>
                          //   a.createdByName.length - b.createdByName.length,
                          sortDirections: ["descend", "ascend"],

                          onHeaderCell: (column) => {
                            return {
                              onClick: () => {
                                if (
                                  this.state.screatedDateFilterCheckbox !==
                                    "" ||
                                  this.state.spriortyNameFilterCheckbox !==
                                    "" ||
                                  this.state.spriortyStatusFilterCheckbox !== ""
                                ) {
                                  this.setState({
                                    StatusModel: true,
                                    sortColumn: "createdBy",
                                    sortHeader:
                                      TranslationContext !== undefined
                                        ? TranslationContext.label.createdby
                                        : "Created By",
                                  });
                                } else {
                                  this.setState({
                                    screatedDateFilterCheckbox: "",
                                    spriortyNameFilterCheckbox: "",
                                    spriortyStatusFilterCheckbox: "",
                                    StatusModel: true,
                                    sortColumn: "createdBy",
                                    sortHeader:
                                      TranslationContext !== undefined
                                        ? TranslationContext.label.createdby
                                        : "Created By",
                                  });
                                }
                              },
                            };
                          },

                          render: (text, record) => {
                            //
                            return (
                              <div className="priority-one-liner">
                                <Popover
                                  content={
                                    <div className="settings-created-by-popover">
                                      <div>
                                        <b>
                                          <p className="title">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.label
                                                  .createdby
                                              : "Created by"}
                                            : {record.createdByName}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.th.createddate
                                            : "Created Date"}
                                          :{record.createdDateFormated}
                                        </p>
                                      </div>
                                      <div>
                                        <b>
                                          <p className="title">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p.updatedby
                                              : "Updated By"}
                                            : {record.modifiedByName}
                                          </p>
                                        </b>
                                        <p className="sub-title">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p.updateddate
                                            : "Updated Date"}
                                          :{record.modifiedDateFormated}
                                        </p>
                                      </div>
                                    </div>
                                  }
                                  placement="bottom"
                                >
                                  {record.createdByName}
                                  <img
                                    className="info-icon-cp"
                                    src={BlackInfoIcon}
                                    alt="info-icon"
                                  />
                                </Popover>
                                {record.isPopoverOpen}
                              </div>
                            );
                          },
                        },
                        {
                          onHeaderCell: (column) => {
                            return {
                              onClick: () => {
                                if (
                                  this.state.spriortyNameFilterCheckbox !==
                                    "" ||
                                  this.state.screatedByFilterCheckbox !== "" ||
                                  this.state.spriortyStatusFilterCheckbox !== ""
                                ) {
                                  this.setState({
                                    StatusModel: true,
                                    sortColumn: "createdDate",
                                    sortHeader:
                                      TranslationContext !== undefined
                                        ? TranslationContext.th.createddate
                                        : "Created Date",
                                  });
                                } else {
                                  this.setState({
                                    spriortyNameFilterCheckbox: "",
                                    screatedByFilterCheckbox: "",
                                    spriortyStatusFilterCheckbox: "",

                                    StatusModel: true,
                                    sortColumn: "createdDate",
                                    sortHeader:
                                      TranslationContext !== undefined
                                        ? TranslationContext.th.createddate
                                        : "Created Date",
                                  });
                                }
                              },
                            };
                          },

                          title: (filters, sortOrder) => (
                            <span>
                              {TranslationContext !== undefined
                                ? TranslationContext.th.createddate
                                : "Created Date"}
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          dataIndex: "createdDateFormated",
                          key: "createdDateFormated",
                          onFilter: (value, record) =>
                            record.createdDateFormated.indexOf(value) === 0,
                          // defaultSortOrder: "descend",
                          filterMultiple: false,
                          // sorter: (a, b) =>
                          //   a.createdDateFormated.length -
                          //   b.createdDateFormated.length,
                          sortDirections: ["descend", "ascend"],
                        },
                        {
                          onHeaderCell: (column) => {
                            return {
                              onClick: () => {
                                this.setState({
                                  StatusModel: true,
                                });
                                if (
                                  this.state.spriortyNameFilterCheckbox !==
                                    "" ||
                                  this.state.screatedByFilterCheckbox !== "" ||
                                  this.state.screatedDateFilterCheckbox !== ""
                                ) {
                                  this.setState({
                                    StatusModel: true,
                                    sortColumn: "priortyStatus",
                                    sortHeader:
                                      TranslationContext !== undefined
                                        ? TranslationContext.label.status
                                        : "Status",
                                  });
                                } else {
                                  this.setState({
                                    spriortyNameFilterCheckbox: "",
                                    screatedByFilterCheckbox: "",
                                    screatedDateFilterCheckbox: "",

                                    StatusModel: true,
                                    sortColumn: "priortyStatus",
                                    sortHeader:
                                      TranslationContext !== undefined
                                        ? TranslationContext.label.status
                                        : "Status",
                                  });
                                }
                              },
                            };
                          },

                          title: (filters, sortOrder) => (
                            <span>
                              {TranslationContext !== undefined
                                ? TranslationContext.label.status
                                : "Status"}
                              <FontAwesomeIcon icon={faCaretDown} />
                            </span>
                          ),
                          dataIndex: "priortyStatus",
                          key: "priortyStatus",
                          filterMultiple: false,
                          onFilter: (value, record) =>
                            record.priortyStatus.indexOf(value) === 0,
                          // sorter: (a, b) =>
                          //   a.priortyStatus.length - b.priortyStatus.length,
                          sortDirections: ["descend", "ascend"],
                        },
                        {
                          title: "Action",
                          dataIndex: "priorityID",
                          key: "priorityID",
                          render: (text, record) => {
                            return (
                              <span className="settings-align-actions">
                                <Popover
                                  content={
                                    <div>
                                      <div className="del-big-icon">
                                        <img
                                          src={BlackDeleteIcon}
                                          alt="del-icon"
                                        />
                                      </div>
                                      <div>
                                        <p className="font-weight-bold blak-clr">
                                          {TranslationContext !== undefined
                                            ? TranslationContext.p.deletefile
                                            : "Delete file"}
                                          ?
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
                                              ? TranslationContext.a.cancel
                                              : "CANCEL"}
                                          </a>
                                          <button
                                            className="butn"
                                            onClick={this.handleDeleteData.bind(
                                              this,
                                              record.priorityID
                                            )}
                                          >
                                            {TranslationContext !== undefined
                                              ? TranslationContext.button.delete
                                              : "Delete"}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  }
                                  trigger="click"
                                  placement="bottom"
                                >
                                  <img
                                    src={RedDeleteIcon}
                                    alt="del-icon"
                                    className="del-btn"
                                  />
                                </Popover>

                                <button
                                  className="react-tabel-button editre"
                                  onClick={this.handleOpenEditModal.bind(
                                    this,
                                    record
                                  )}
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.mybutton.edit
                                    : "EDIT"}
                                </button>
                              </span>
                            );
                          },
                        },
                      ]}
                      loading={this.state.loading}
                      noDataContent={
                        TranslationContext !== undefined
                          ? TranslationContext.label.norecordfound
                          : "No Record Found"
                      }
                      pagination={false}
                      dataSource={this.state.priorityData}
                      components={this.components}
                      onRow={(record, index) => ({
                        index,
                        moveRow: this.moveRow,
                      })}
                    />
                  </DndProvider>
                </div>
                {/* // )} */}
              </div>
              <div className="col-md-4">
                <div className="createHierarchyMask">
                  <div className="createSpace">
                    <label className="create-department">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.createpriority
                        : "CREATE PRORITY"}
                    </label>
                    <div className="div-padding-1">
                      <label className="designation-name">
                        {" "}
                        {TranslationContext !== undefined
                          ? TranslationContext.label.priorityname
                          : "Priority Name"}
                      </label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.placeholder.enterpriorityname
                            : "Enter Priority Name"
                        }
                        maxLength={25}
                        name="priority_name"
                        value={this.state.priority_name}
                        onBlur={this.handleCheckPriorityExits.bind(this)}
                        onChange={this.handleCreateOnChange}
                      />
                      {this.state.priority_name.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.priorityNameCompulsion}
                        </p>
                      )}
                      {this.state.isexist !== "" && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.isexist}
                        </p>
                      )}
                    </div>
                    <div className="dropDrownSpace">
                      <label className="reports-to">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.status
                          : "Status"}
                      </label>
                      <select
                        className="form-control dropdown-setting"
                        value={this.state.selectedActiveStatus}
                        onChange={this.handleActiveStatus}
                      >
                        <option value="select">
                          {TranslationContext !== undefined
                            ? TranslationContext.button.select
                            : "Select"}
                        </option>
                        {this.state.activeData !== null &&
                          this.state.activeData.map((item, i) => (
                            <option key={i} value={item.ActiveID}>
                              {item.ActiveName}
                            </option>
                          ))}
                      </select>
                      {this.state.selectedActiveStatus === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.statusCompulsion}
                        </p>
                      )}
                    </div>
                    <div className="btnSpace">
                      <button
                        className="CreateADDBtn addLable"
                        disabled={this.state.AddPriority}
                        className="CreateADDBtn addLable"
                        onClick={this.handleSubmitData.bind(this)}
                        type="submit"
                      >
                        {this.state.AddPriority ? (
                          <FontAwesomeIcon
                            className="circular-loader"
                            icon={faCircleNotch}
                            spin
                          />
                        ) : (
                          ""
                        )}
                        {TranslationContext !== undefined
                          ? TranslationContext.label.add
                          : "ADD"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={this.state.editmodel}
          onHide={this.toggleEditModal}
          Id="tampleteEditModal"
        >
          <div className="edtpadding">
            <label className="popover-header-text">
              {TranslationContext !== undefined
                ? TranslationContext.label.editpriority
                : "EDIT PRORITY"}
            </label>
            <div className=" pop-over-div">
              <label className="pop-over-lbl-text">
                {TranslationContext !== undefined
                  ? TranslationContext.label.priorityname
                  : "Priority Name"}
              </label>

              <input
                type="text"
                className="form-control dropdown-settings"
                placeholder={
                  TranslationContext !== undefined
                    ? TranslationContext.placeholder.enterpriorityname
                    : "Enter Priority Name"
                }
                maxLength={25}
                name="priortyName"
                value={this.state.rowData.priortyName}
                onChange={this.handelEditChange.bind(this)}
                onBlur={this.handleCheckPriorityExits.bind(this)}
              />
              {this.state.rowData.priortyName === "" && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "0px",
                  }}
                >
                  {this.state.editpriorityNameCompulsion}
                </p>
              )}
              {this.state.editIsExist !== "" && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "0px",
                  }}
                >
                  {this.state.editIsExist}
                </p>
              )}
            </div>
            <div className=" pop-over-div">
              <label className="pop-over-lbl-text">
                {TranslationContext !== undefined
                  ? TranslationContext.label.status
                  : "Status"}
              </label>
              <select
                className="form-control dropdown-setting"
                name="isActive"
                value={
                  this.state.rowData.isActive === "Active"
                    ? "Active"
                    : "Inactive"
                }
                onChange={this.handelEditChange.bind(this)}
              >
                <option value="">
                  {TranslationContext !== undefined
                    ? TranslationContext.button.select
                    : "Select"}
                </option>
                {this.state.activeData !== null &&
                  this.state.activeData.map((item, j) => (
                    <option key={j} value={item.ActiveID}>
                      {item.ActiveName}
                    </option>
                  ))}
              </select>
              {this.state.rowData.isActive === "" && (
                <p
                  style={{
                    color: "red",
                    marginBottom: "0px",
                  }}
                >
                  {this.state.editstatusCompulsion}
                </p>
              )}
            </div>
            <br />
            <div className="text-center">
              <a
                className="pop-over-cancle"
                onClick={this.toggleEditModal.bind(this)}
              >
                {TranslationContext !== undefined
                  ? TranslationContext.a.cancel
                  : "CANCEL"}
              </a>
              <button
                className="pop-over-button FlNone"
                disabled={this.state.editSaveLoading}
                onClick={this.handleUpdateData.bind(this)}
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
                <label className="pop-over-btnsave-text">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.save
                    : "SAVE"}
                </label>
              </button>
            </div>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CreatePriority;
