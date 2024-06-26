import React, { Component } from "react";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { Popover, Spin,Empty } from "antd";
import ReactTable from "react-table";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import Demo from "../../../store/Hashtag.js";
import { Link } from "react-router-dom";
import Sorting from "./../../../assets/Images/sorting.png";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import DownExcel from "./../../../assets/Images/csv.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import { ProgressBar } from "react-bootstrap";
import { NotificationManager } from "react-notifications";
import Modal from "react-responsive-modal";
import matchSorter from "match-sorter";
import config from "./../../../helpers/config";
import { CSVLink } from "react-csv";
import axios from "axios";
import { formatSizeUnits } from "./../../../helpers/CommanFuncation";
import { authHeader } from "../../../helpers/authHeader";
import ActiveStatus from "../../activeStatus";
import Dropzone from "react-dropzone";
import * as translationHI from "./../../../translations/hindi";
import * as translationMA from "./../../../translations/marathi";

class StoreCRMRole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: "",
      activeData: ActiveStatus(),
      crmRoles: [],
      ModulesEnabled: "",
      ModulesDisabled: "",
      modulesList: [],
      RoleName: "",
      checkRoleName: "",
      RoleisActive: 0,
      editSaveLoading: false,
      editRoleNameValidMsg: "",
      editCheckRoleName: "",
      modulesData: [],
      modulestatus: "",
      filterTxtValue: "",
      sFilterCheckbox: "",
      sortFilterRoleName: [],
      sortFilterCreated: [],
      sortFilterStatus: [],
      tempcrmRoles: [],
      StatusModel: false,
      updateRoleName: "",
      updateModulesEnabled: "",
      updateModulesDisabled: "",
      sroleNameFilterCheckbox: "",
      screatedByFilterCheckbox: "",
      sisRoleActiveFilterCheckbox: "",
      sortColumn: "",
      roleColor: "",
      createdColor: "",
      statusColor: "",
      sortHeader: "",
      sortAllData: [],
      sortRoleName: [],
      sortCreated: [],
      sortStatus: [],
      fileN: [],
      bulkuploadCompulsion: "",
      progressValue: 0,
      statusCompulsory: "",
      isortA: false,
      isATOZ: true,
      crmData: [],
      translateLanguage: {},
      bulkuploadLoading: false,
      isloading:false,
    };
    this.handleGetCRMGridData = this.handleGetCRMGridData.bind(this);
    this.toggleEditModal = this.toggleEditModal.bind(this);
    this.handleModulesDefault = this.handleModulesDefault.bind(this);
  }

  componentDidMount() {
     this.handleGetCRMGridData();
    this.handleModulesDefault();
    this.handleGetStoreCrmModule();

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }
  handleTabChange(index) {
    this.setState({
      tabIndex: index,
    });
  }

  ////hanlde file uploading
  fileUpload = (e) => {
    var allFiles = [];
    var selectedFiles = e;
    if (selectedFiles.length>0) {
      allFiles.push(selectedFiles[0]);

      var fileSize = formatSizeUnits(selectedFiles[0].size);
      this.setState({
        fileSize,
        fileN: allFiles,
        fileName: allFiles[0].name,
        bulkuploadCompulsion: "",
      });
    }
    else{
      NotificationManager.error("File accept only csv type.")
    }
  };

  /// Role name onchange
  handleRoleName(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  //// Status on change
  handleRoleisActive = (e) => {
    let RoleisActive = e.currentTarget.value;
    this.setState({ RoleisActive });
  };
  ///handle change Module
  checkModule = async (moduleID) => {
    let modulesList = [...this.state.modulesList],
      isActive,
      ModulesEnabled = "",
      ModulesDisabled = "";
    for (let i = 0; i < modulesList.length; i++) {
      if (modulesList[i].moduleID === moduleID) {
        isActive = modulesList[i].isActive;
        modulesList[i].isActive = !isActive;
      }
    }
    for (let i = 0; i < modulesList.length; i++) {
      if (modulesList[i].isActive === true) {
        ModulesEnabled += modulesList[i].moduleID + ",";
      } else if (modulesList[i].isActive === false) {
        ModulesDisabled += modulesList[i].moduleID + ",";
      }
    }
    await this.setState({
      modulesList,
      ModulesEnabled,
      ModulesDisabled,
    });
  };

  ////Get CRM grid data
  handleGetCRMGridData() {
    let self = this;
    this.setState({isloading:true})
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCRMRole/GetStoreCRMRoles",
      headers: authHeader(),
    })
      .then((res) => {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ crmRoles: data,isloading:false });
        } else {
          self.setState({ crmRoles: [],isloading:false });
        }
        if (data !== null) {
          var unique = [];
          var distinct = [];
          var sortRoleName = [];
          var sortFilterRoleName = [];

          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].roleName]) {
              distinct.push(data[i].roleName);
              unique[data[i].roleName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortRoleName.push({ roleName: distinct[i] });
              sortFilterRoleName.push({
                roleName: distinct[i],
              });
            }
          }

          var unique = [];
          var distinct = [];
          var sortCreated = [];
          var sortFilterCreated = [];

          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].createdBy]) {
              distinct.push(data[i].createdBy);
              unique[data[i].createdBy] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortCreated.push({
                createdBy: distinct[i],
              });
              sortFilterCreated.push({
                createdBy: distinct[i],
              });
            }
          }

          var unique = [];
          var distinct = [];
          var sortStatus = [];
          var sortFilterStatus = [];

          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].isRoleActive]) {
              distinct.push(data[i].isRoleActive);
              unique[data[i].isRoleActive] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortStatus.push({
                isRoleActive: distinct[i],
              });
              sortFilterStatus.push({
                isRoleActive: distinct[i],
              });
            }
          }
          self.setState({
            sortCreated,
            sortRoleName,
            sortStatus,
            sortFilterCreated,
            sortFilterRoleName,
            sortFilterStatus,
            sortAllData: data,
          });
        }
      })
      .catch((res) => {
        self.setState({isloading:false})
        console.log(res);
      });
  }

  /// hanlde module default
  handleModulesDefault = async () => {
    let modulesList = [...this.state.modulesList],
      isActive,
      ModulesEnabled = "",
      ModulesDisabled = "";
    for (let i = 0; i < modulesList.length; i++) {
      if (modulesList[i].isActive === true) {
        ModulesEnabled += modulesList[i].moduleId + ",";
      } else if (modulesList[i].isActive === false) {
        ModulesDisabled += modulesList[i].moduleId + ",";
      }
    }
    await this.setState({
      ModulesEnabled,
      ModulesDisabled,
    });
  };
  //// delete CRM role
  handleDeleteCrmRole(Id) {
    const TranslationContext = this.state.translateLanguage.default;

    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCRMRole/DeleteStoreCRMRole",
      headers: authHeader(),
      params: {
        CRMRoleID: Id,
      },
    })
      .then((res) => {
        let status = res.data.message;
        if (status === "Record In use") {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recordinuse
              : "Record in use."
          );
        } else if (status === "Record deleted Successfully") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.recorddeletedsuccessfully
              : "Record deleted Successfully."
          );
          self.handleGetCRMGridData();
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }

  //// hanlde Create and Update function
  hanldeCreateUpdateCrmRole(e, addUpdate, crmRoleId) {
    const TranslationContext = this.state.translateLanguage.default;

    let self = this;
    let RoleisActive,
      CRMRoleID,
      RoleName,
      ModulesEnabled = "",
      ModulesDisabled = "";
    if (e === "add") {
      if (self.state.RoleisActive === "Active") {
        RoleisActive = true;
      } else if (self.state.RoleisActive === "Inactive") {
        RoleisActive = false;
      }
    } else if (e === "update") {
      if (this.state.modulestatus === "Active") {
        RoleisActive = true;
      } else if (this.state.modulestatus === "Inactive") {
        RoleisActive = false;
      }
    }
    if (e === "add") {
      if (this.state.RoleName.length > 0 && this.state.RoleisActive !== 0) {
        CRMRoleID = 0;
        RoleName = self.state.RoleName;

        for (let i = 0; i < self.state.modulesList.length; i++) {
          if (self.state.modulesList[i].isActive === true) {
            ModulesEnabled += self.state.modulesList[i].moduleID + ",";
          } else if (self.state.modulesList[i].isActive === false) {
            ModulesDisabled += self.state.modulesList[i].moduleID + ",";
          }
        }
        this.setState({isSubmit:true})
      } else {
        this.setState({
          checkRoleName: "Required",
          statusCompulsory: "Please select status.",
        });
        return false;
      }
    } else if (e === "update") {
      if (this.state.editRoleName === "") {
        this.setState({ editCheckRoleName: "Required" });
        return false;
      }

      CRMRoleID = this.state.crmRoleID;
      RoleName = this.state.editRoleName;

      for (let j = 0; j < this.state.modulesData.length; j++) {
        if (this.state.modulesData[j].modulestatus) {
          ModulesEnabled += this.state.modulesData[j].moduleID + ",";
        } else {
          ModulesDisabled += this.state.modulesData[j].moduleID + ",";
        }
      }
    }
    this.setState({editSaveLoading:true})
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCRMRole/CreateUpdateStoreCRMRole",
      headers: authHeader(),
      params: {
        CRMRoleID: CRMRoleID,
        RoleName: RoleName,
        RoleisActive: RoleisActive,
        ModulesEnabled: ModulesEnabled,
        ModulesDisabled: ModulesDisabled,
      },
    })
      .then((res) => {
        let status = res.data.message;
        self.setState({editSaveLoading:false,isSubmit:false})
        if (status === "Success") {
          if (e === "add") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.crmroleaddedsuccessfully
                : "CRM Role added successfully."
            );
            self.setState({
              RoleName: "",
              RoleisActive: 0,
              ModulesEnabled: "",
              ModulesDisabled: "",
              updateModulesEnabled: "",
              updateModulesDisabled: "",
              checkRoleName: "",
              statusCompulsory: "",
            });
            self.handleGetCRMGridData();
            self.handleModulesDefault();
            self.handleGetStoreCrmModule();
          } else if (e === "update") {
            self.toggleEditModal();
            self.setState({
              editSaveLoading: false,
              editRoleNameValidMsg: "",
            });
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.crmroleupdatedsuccessfully
                : "CRM Role updated successfully."
            );
            self.handleGetCRMGridData();
          }
        } else if (status === "Record Already Exists ") {
          if (e === "add") {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordalreadyexists
                : "Record Already Exists "
            );
          } else {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordalreadyexists
                : "Record Already Exists "
            );
          }
        } else {
          if (e === "add") {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.crmrolenotadded
                : "CRM Role not added."
            );
          } else if (e === "update") {
            self.setState({ editSaveLoading: false });
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.crmrolenotupdated
                : "CRM Role not updated."
            );
          }
        }
      })
      .catch((res) => {
        self.setState({ editSaveLoading: false, isSubmit: false });
        console.log(res);
      });
  }
  //// CRM Bulk uploading
  hanldeAddBulkUpload() {
    const TranslationContext = this.state.translateLanguage.default;

    if (this.state.fileN.length > 0 && this.state.fileN !== []) {
      let self = this;
      this.setState({
        bulkuploadLoading: true,
      });
      const formData = new FormData();

      formData.append("file", this.state.fileN[0]);

      axios({
        method: "post",
        url: config.apiUrl + "/StoreCRMRole/BulkUploadStoreCRMRole",
        headers: authHeader(),
        data: formData,
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.fileuploadedsuccessfully
                : "File uploaded successfully."
            );
            self.setState({
              fileName: "",
              fileSize: "",
              fileN: [],
              bulkuploadLoading: false,
            });
            self.handleGetCRMGridData();
          } else if (status === "Record Uploaded Partially"){
            NotificationManager.error("File uploaded partially.Please check the log.");
            self.setState({
              fileName: "",
              fileSize: "",
              fileN: [],
              bulkuploadLoading: false,
            });
            self.handleGetCRMGridData();
          } else {
            self.setState({
              bulkuploadLoading: false,
            });
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.filenotuploaded
                : "File not uploaded."
            );
          }
        })
        .catch((data) => {
          if (data.message) {
            this.setState({
              showProgress: false,
              isFileUploadFail: true,
              bulkuploadLoading: false,
            });
          }
          console.log(data);
        });
    } else {
      this.setState({
        bulkuploadCompulsion: "Please select file.",
      });
    }
  }
  //// Store CRM data for edit
  hanldeEditCRM = (rowData) => {
    this.setState({
      modulesData: rowData.modules,
      modulestatus: rowData.isRoleActive,
      editRoleName: rowData.roleName,
      crmRoleID: rowData.crmRoleID,
      editmodel: true,
    });
  };

  /// set sorting status
  setSortCheckStatus = (column, type, e) => {
    var itemsArray = [];

    var sroleNameFilterCheckbox = this.state.sroleNameFilterCheckbox;
    var screatedByFilterCheckbox = this.state.screatedByFilterCheckbox;
    var sisRoleActiveFilterCheckbox = this.state.sisRoleActiveFilterCheckbox;

    if (column === "roleName" || column === "all") {
      if (type === "value" && type !== "All") {
        sroleNameFilterCheckbox = sroleNameFilterCheckbox.replace("all", "");
        sroleNameFilterCheckbox = sroleNameFilterCheckbox.replace("all,", "");
        if (
          sroleNameFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sroleNameFilterCheckbox = sroleNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sroleNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sroleNameFilterCheckbox.includes("all")) {
          sroleNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "roleName") {
            for (let i = 0; i < this.state.sortRoleName.length; i++) {
              sroleNameFilterCheckbox +=
                this.state.sortRoleName[i].roleName + ",";
            }
            sroleNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "createdBy" || column === "all") {
      if (type === "value" && type !== "All") {
        screatedByFilterCheckbox = screatedByFilterCheckbox.replace("all", "");
        screatedByFilterCheckbox = screatedByFilterCheckbox.replace("all,", "");
        if (
          screatedByFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          screatedByFilterCheckbox = screatedByFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
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
            for (let i = 0; i < this.state.sortCreated.length; i++) {
              screatedByFilterCheckbox +=
                this.state.sortCreated[i].createdBy + ",";
            }
            screatedByFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "isRoleActive" || column === "all") {
      if (type === "value" && type !== "All") {
        sisRoleActiveFilterCheckbox = sisRoleActiveFilterCheckbox.replace(
          "all",
          ""
        );
        sisRoleActiveFilterCheckbox = sisRoleActiveFilterCheckbox.replace(
          "all,",
          ""
        );
        if (
          sisRoleActiveFilterCheckbox
            .split(",")
            .find((word) => word === e.currentTarget.value)
        ) {
          sisRoleActiveFilterCheckbox = sisRoleActiveFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sisRoleActiveFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sisRoleActiveFilterCheckbox.includes("all")) {
          sisRoleActiveFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "isRoleActive") {
            for (let i = 0; i < this.state.sortStatus.length; i++) {
              sisRoleActiveFilterCheckbox +=
                this.state.sortStatus[i].isRoleActive + ",";
            }
            sisRoleActiveFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      sroleNameFilterCheckbox,
      screatedByFilterCheckbox,
      sisRoleActiveFilterCheckbox,
      roleColor: "",
      createdColor: "",
      statusColor: "",
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "roleName") {
      var sItems = sroleNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.roleName === sItems[i]
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
        roleColor: "sort-column",
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
    } else if (column === "isRoleActive") {
      var sItems = sisRoleActiveFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.isRoleActive === sItems[i]
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
      tempcrmRoles: itemsArray,
    });
  };

  ///toggle change
  toggleEditModal() {
    this.setState({
      editmodel: false,
      editRoleNameValidMsg: "",
      editCheckRoleName: "",
    });
  }
  //// Modal data change
  handleModaleDataChange(e) {
    var Name = e.target.name;
    var value = e.target.value;

    if (Name === "status") {
      this.setState({ modulestatus: value });
    } else {
      if (value !== "") {
        this.setState({
          editRoleName: value,
          editRoleNameValidMsg: "",
          editCheckRoleName: "",
        });
      } else {
        this.setState({
          editRoleName: value,
          editRoleNameValidMsg: "The role name field is required.",
          editCheckRoleName: "Required",
        });
      }
    }
  }
  //// status open modal
  StatusOpenModel(data, header) {
    if (
      this.state.sortFilterRoleName.length === 0 ||
      this.state.sortFilterCreated.length === 0 ||
      this.state.sortFilterStatus.length === 0
    ) {
      return false;
    }
    if (data === "roleName") {
      if (
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.sisRoleActiveFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          screatedByFilterCheckbox: "",
          sisRoleActiveFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "createdBy") {
      if (
        this.state.sroleNameFilterCheckbox !== "" ||
        this.state.sisRoleActiveFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sroleNameFilterCheckbox: "",
          sisRoleActiveFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "isRoleActive") {
      if (
        this.state.screatedByFilterCheckbox !== "" ||
        this.state.sroleNameFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sroleNameFilterCheckbox: "",
          screatedByFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }

  /// status close modal
  StatusCloseModel = (e) => {
    if (this.state.tempcrmRoles.length > 0) {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
        crmRoles: this.state.tempcrmRoles,
      });
      if (this.state.sortColumn === "roleName") {
        if (this.state.sroleNameFilterCheckbox === "") {
        } else {
          this.setState({
            screatedByFilterCheckbox: "",
            sisRoleActiveFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "createdBy") {
        if (this.state.screatedByFilterCheckbox === "") {
        } else {
          this.setState({
            sroleNameFilterCheckbox: "",
            sisRoleActiveFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "isRoleActive") {
        if (this.state.sisRoleActiveFilterCheckbox === "") {
        } else {
          this.setState({
            sroleNameFilterCheckbox: "",
            screatedByFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        filterTxtValue: "",
        crmRoles: this.state.sortAllData,
      });
    }
  };

  /// filter text change
  filteTextChange(e) {
    this.setState({ filterTxtValue: e.target.value });

    if (this.state.sortColumn === "roleName") {
      var sortFilterRoleName = matchSorter(
        this.state.sortRoleName,
        e.target.value,
        { keys: ["roleName"] }
      );
      if (sortFilterRoleName.length > 0) {
        this.setState({ sortFilterRoleName });
      } else {
        this.setState({
          sortFilterRoleName: [],
        });
      }
    }
    if (this.state.sortColumn === "createdBy") {
      var sortFilterCreated = matchSorter(
        this.state.sortCreated,
        e.target.value,
        { keys: ["createdBy"] }
      );
      if (sortFilterCreated.length > 0) {
        this.setState({ sortFilterCreated });
      } else {
        this.setState({
          sortFilterCreated: [],
        });
      }
    }
    if (this.state.sortColumn === "isRoleActive") {
      var sortFilterStatus = matchSorter(
        this.state.sortStatus,
        e.target.value,
        { keys: ["isRoleActive"] }
      );
      if (sortFilterStatus.length > 0) {
        this.setState({ sortFilterStatus });
      } else {
        this.setState({
          sortFilterStatus: [],
        });
      }
    }
  }
  /// sort status by A to Z
  sortStatusAtoZ() {
    var itemsArray = [];
    itemsArray = this.state.crmRoles;

    if (this.state.sortColumn === "roleName") {
      itemsArray.sort((a, b) => {
        if (a.roleName.toLowerCase() < b.roleName.toLowerCase()) return -1;
        if (a.roleName.toLowerCase() > b.roleName.toLowerCase()) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "createdBy") {
      itemsArray.sort((a, b) => {
        if (a.createdBy.toLowerCase() < b.createdBy.toLowerCase()) return -1;
        if (a.createdBy.toLowerCase() > b.createdBy.toLowerCase()) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "isRoleActive") {
      itemsArray.sort((a, b) => {
        if (a.isRoleActive.toLowerCase() < b.isRoleActive.toLowerCase())
          return -1;
        if (a.isRoleActive.toLowerCase() > b.isRoleActive.toLowerCase())
          return 1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      isATOZ: true,
      crmRoles: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }
  /// sort status by Z to A
  sortStatusZtoA() {
    var itemsArray = [];
    itemsArray = this.state.crmRoles;

    if (this.state.sortColumn === "roleName") {
      itemsArray.sort((a, b) => {
        if (a.roleName.toLowerCase() < b.roleName.toLowerCase()) return 1;
        if (a.roleName.toLowerCase() > b.roleName.toLowerCase()) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "createdBy") {
      itemsArray.sort((a, b) => {
        if (a.createdBy.toLowerCase() < b.createdBy.toLowerCase()) return 1;
        if (a.createdBy.toLowerCase() > b.createdBy.toLowerCase()) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "isRoleActive") {
      itemsArray.sort((a, b) => {
        if (a.isRoleActive.toLowerCase() < b.isRoleActive.toLowerCase())
          return 1;
        if (a.isRoleActive.toLowerCase() > b.isRoleActive.toLowerCase())
          return -1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      isATOZ: false,
      crmRoles: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }
  /// Edit Module change
  handleModuleChange = (id) => {
    var index = this.state.modulesData.findIndex((x) => x.moduleID === id);
    var modulesData = this.state.modulesData;
    modulesData[index].modulestatus = !modulesData[index].modulestatus;
    this.setState({ modulesData });
  };
  /// get file progress value
  updateUploadProgress(value) {
    this.setState({ progressValue: value });
  }
  /// Delete file on bulk uploading
  handleDeleteBulkupload = (e) => {
    const TranslationContext = this.state.translateLanguage.default;

    this.setState({
      fileN: [],
      fileName: "",
    });
    NotificationManager.success(
      TranslationContext !== undefined
        ? TranslationContext.alertmessage.filedeletedsuccessfully
        : "File deleted successfully."
    );
  };

  handleGetStoreCrmModule() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCRMRole/GetStoreCrmModule",
      headers: authHeader(),
    })
      .then((response) => {
        var message = response.data.message;
        var modulesList = response.data.responseData;
        if (message === "Success" && modulesList) {
          self.setState({ modulesList });
        } else {
          self.setState({ modulesList });
        }
      })
      .catch((response) => {
        console.log(response, "----handleGetStoreCrmModule");
      });
  }

  handleClearSearch() {
    this.setState({
      sroleNameFilterCheckbox: "",
      screatedByFilterCheckbox: "",
      sisRoleActiveFilterCheckbox: "",
      filterTxtValue: "",
      sortHeader: "",
      sortColumn: "",
      StatusModel: false,
      crmRoles: this.state.sortAllData,
      tempcrmRoles: [],
    });
  }

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="/store/settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.setting
              : "Settings"}
          </Link>
          <span>&gt;</span>
          <Link
            to={{
              pathname: "/store/settings",
              tabName: "store-tab",
            }}
            className="header-path"
          >
            {TranslationContext !== undefined
              ? TranslationContext.link.store
              : "Store"}
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="active header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.crmroles
              : "CRM Roles"}
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <Modal
              onClose={this.StatusCloseModel}
              open={this.state.StatusModel}
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
                      {TranslationContext !== undefined
                        ? TranslationContext.p.sortztoa
                        : "SORT BY Z TO A"}
                    </p>
                  </div>
                </div>
                <a
                  style={{
                    margin: "0 25px",
                    textDecoration: "underline",
                    color: "#2561A8",
                    cursor: "pointer",
                  }}
                  onClick={this.handleClearSearch.bind(this)}
                  href="#!"
                >
                  {TranslationContext !== undefined
                    ? TranslationContext.a.clearsearch
                    : "clear search"}
                </a>
                <div className="filter-type">
                  <p>
                    {TranslationContext !== undefined
                      ? TranslationContext.a.filterbytype
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
                          this.state.sroleNameFilterCheckbox.includes("all") ||
                          this.state.screatedByFilterCheckbox.includes("all") ||
                          this.state.sisRoleActiveFilterCheckbox.includes("all")
                        }
                        onChange={this.setSortCheckStatus.bind(this, "all")}
                      />
                      <label htmlFor={"fil-open"}>
                        <span className="table-btn table-blue-btn">ALL</span>
                      </label>
                    </div>
                    {this.state.sortColumn === "roleName"
                      ? this.state.sortFilterRoleName !== null &&
                        this.state.sortFilterRoleName.map((item, i) => (
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              name={item.roleName}
                              id={"fil-open" + item.roleName}
                              value={item.roleName}
                              checked={
                                this.state.sroleNameFilterCheckbox
                                  .split(",")
                                  .find((word) => word === item.roleName) ||
                                false
                              }
                              onChange={this.setSortCheckStatus.bind(
                                this,
                                "roleName",
                                "value"
                              )}
                            />
                            <label htmlFor={"fil-open" + item.roleName}>
                              <span className="table-btn table-blue-btn">
                                {item.roleName}
                              </span>
                            </label>
                          </div>
                        ))
                      : null}

                    {this.state.sortColumn === "createdBy"
                      ? this.state.sortFilterCreated !== null &&
                        this.state.sortFilterCreated.map((item, i) => (
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              name={item.createdBy}
                              id={"fil-open" + item.createdBy}
                              value={item.createdBy}
                              checked={
                                this.state.screatedByFilterCheckbox
                                  .split(",")
                                  .find((word) => word === item.createdBy) ||
                                false
                              }
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

                    {this.state.sortColumn === "isRoleActive"
                      ? this.state.sortFilterStatus !== null &&
                        this.state.sortFilterStatus.map((item, i) => (
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              name={item.isRoleActive}
                              id={"fil-open" + item.isRoleActive}
                              value={item.isRoleActive}
                              checked={
                                this.state.sisRoleActiveFilterCheckbox
                                  .split(",")
                                  .find((word) => word === item.isRoleActive) ||
                                false
                              }
                              onChange={this.setSortCheckStatus.bind(
                                this,
                                "isRoleActive",
                                "value"
                              )}
                            />
                            <label htmlFor={"fil-open" + item.isRoleActive}>
                              <span className="table-btn table-blue-btn">
                                {item.isRoleActive}
                              </span>
                            </label>
                          </div>
                        ))
                      : null}
                  </div>
                </div>
              </div>
            </Modal>
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height StorCrmRoleReact align-table setting-table-des settings-align">
                  <ReactTable
                    data={this.state.crmRoles}
                    columns={[
                      {
                        Header: (
                          <span
                            className={
                              this.state.sortHeader === "Role Name"
                                ? "sort-column"
                                : ""
                            }
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "roleName",
                              TranslationContext !== undefined
                                ? TranslationContext.span.rolename
                                : "Role Name"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.rolename
                              : "Role Name"}

                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ === false &&
                                this.state.sortHeader === "Role Name"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable: false,
                        accessor: "roleName",
                        Cell: (row) => {
                          return (
                            <div className="one-liner store-one-liner">
                              <span>
                                {row.original.roleName}
                                <Popover
                                  content={
                                    <div className="store-crm-roles">
                                      {row.original.modules !== null &&
                                        row.original.modules.map((item, i) => (
                                          <div className="rvmmargin" key={i}>
                                            <p className="rolle-name-text-popover">
                                              {item.moduleName}
                                            </p>
                                            <label className="pop-over-lbl-text-pop">
                                              {item.modulestatus === true
                                                ? "Enabled"
                                                : "Disabled"}
                                            </label>
                                          </div>
                                        ))}
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
                              </span>
                            </div>
                          );
                        },
                      },
                      {
                        Header: (
                          <span
                            className={
                              this.state.sortHeader === "Created By"
                                ? "sort-column"
                                : ""
                            }
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "createdBy",
                              TranslationContext !== undefined
                                ? TranslationContext.span.createdby
                                : "Created By"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.createdby
                              : "Created By"}

                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ === false &&
                                this.state.sortHeader === "Created By"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable: false,
                        accessor: "createdBy",
                        Cell: (row) => {
                          var ids = row.original["id"];
                          return (
                            <div className="one-liner store-one-liner">
                              <span>
                                {row.original.createdBy}
                                <Popover
                                  content={
                                    <>
                                      <div>
                                        <b>
                                          <p className="title">
                                            {TranslationContext !== undefined
                                              ? TranslationContext.p.createdby
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
                                    </>
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
                        Header: (
                          <span
                            className={
                              this.state.sortHeader === "Status"
                                ? "sort-column"
                                : ""
                            }
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "isRoleActive",
                              TranslationContext !== undefined
                                ? TranslationContext.span.status
                                : "Status"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.status
                              : "Status"}

                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ === false &&
                                this.state.sortHeader === "Status"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable: false,
                        accessor: "isRoleActive",
                      },
                      {
                        Header: (
                          <span>
                            {TranslationContext !== undefined
                              ? TranslationContext.span.actions
                              : "Actions"}
                          </span>
                        ),
                        accessor: "actiondept",
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
                                            onClick={this.handleDeleteCrmRole.bind(
                                              this,
                                              row.original.crmRoleID
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
                                  onClick={this.hanldeEditCRM.bind(
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
                    minRows={2}
                    defaultPageSize={10}
                    showPagination={true}
                    noDataText={
                      this.state.isloading ? (
                        <Spin size="large" tip="Loading..." />
                      ) : this.state.crmRoles.length===0 ? (
                        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                      ) : null
                    }
                    
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="store-col-2">
                  <div className="storeSettingcreateDiv">
                    <label className="create-department">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.createcrmrole
                        : "CREATE CRM ROLE"}
                    </label>
                    <div className="div-padding-1">
                      <label className="designation-name">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.rolename
                          : "Role Name"}
                      </label>
                      <input
                        type="text"
                        className="txt-1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.placeholder.enterrolename
                            : "Enter Role Name"
                        }
                        maxLength={25}
                        name="RoleName"
                        value={this.state.RoleName}
                        autoComplete="off"
                        onChange={this.handleRoleName.bind(this)}
                      />
                      {this.state.RoleName.length === 0 && (
                        <p
                          style={{
                            color: "red",
                            marginBottom: "0px",
                          }}
                        >
                          {this.state.checkRoleName}
                        </p>
                      )}
                    </div>
                    {this.state.modulesList !== null &&
                      this.state.modulesList.map((item, i) => (
                        <div
                          className="module-switch crm-margin-div crm-padding-div"
                          key={i}
                        >
                          <div className="switch switch-primary d-inline m-r-10">
                            <label className="storeRole-name-text">
                              {item.moduleName}
                            </label>
                            <input
                              type="checkbox"
                              id={"i" + item.moduleID}
                              name="allModules"
                              attrIds={item.moduleID}
                              checked={item.isActive}
                              onChange={this.checkModule.bind(
                                this,
                                item.moduleID
                              )}
                            />
                            <label
                              htmlFor={"i" + item.moduleID}
                              className="cr cr-float-auto"
                            ></label>
                          </div>
                        </div>
                      ))}

                    <div className="dropDrownSpace">
                      <label className="reports-to">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.status
                          : "Status"}
                      </label>
                      <select
                        className="form-control dropdown-setting"
                        value={this.state.RoleisActive}
                        onChange={this.handleRoleisActive}
                      >
                        <option value="0">
                          {TranslationContext !== undefined
                            ? TranslationContext.option.select
                            : "select"}
                        </option>
                        {this.state.activeData !== null &&
                          this.state.activeData.map((item, j) => (
                            <option key={j} value={item.ActiveID}>
                              {item.ActiveName}
                            </option>
                          ))}
                      </select>
                      {this.state.RoleisActive === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.statusCompulsory}
                        </p>
                      )}
                    </div>
                    <div className="btnSpace">
                      <button
                        className="addBtn-ticket-hierarchy"
                        onClick={this.hanldeCreateUpdateCrmRole.bind(
                          this,
                          "add"
                        )}
                        disabled={this.state.isSubmit}
                      >
                        {this.state.isSubmit ? (
                          <FontAwesomeIcon
                            className="circular-loader"
                            icon={faCircleNotch}
                            spin
                          />
                        ) : null}
                        {TranslationContext !== undefined
                          ? TranslationContext.button.addrole
                          : "ADD ROLE"}
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                <div className="store-col-2">
                  <div className="right-sect-div">
                    <br />
                    <div className="d-flex justify-content-between align-items-center pb-2">
                      <h3 className="pb-0">
                        {TranslationContext !== undefined
                          ? TranslationContext.h3.bulkupload
                          : "Bulk Upload"}
                      </h3>
                      <div className="down-excel">
                        <p>
                          {TranslationContext !== undefined
                            ? TranslationContext.p.template
                            : "Template"}
                        </p>
                        <CSVLink
                          filename={"CRM.csv"}
                          data={config.crmRoleTemplate}
                        >
                          <img
                            src={DownExcel}
                            alt="download icon"
                            style={{ marginLeft: "5px" }}
                          />
                        </CSVLink>
                      </div>
                    </div>
                    <Spin
                      tip="Please wait..."
                      spinning={this.state.bulkuploadLoading}
                    >
                      <div className="mainfileUpload">
                        <Dropzone accept=".csv"  onDrop={this.fileUpload.bind(this)}>
                          {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()}>
                              <input
                                {...getInputProps()}
                                className="file-upload d-none"
                              />
                              <div className="file-icon">
                                <img src={FileUpload} alt="file-upload" />
                              </div>
                              <span className={"fileupload-span"}>
                                {TranslationContext !== undefined
                                  ? TranslationContext.span.addfile
                                  : "Add File"}
                              </span>{" "}
                              {TranslationContext !== undefined
                                ? TranslationContext.div.or
                                : "or"}
                              {TranslationContext !== undefined
                                ? TranslationContext.div.dropfilehere
                                : "Drop File here"}
                            </div>
                          )}
                        </Dropzone>
                      </div>
                      {this.state.fileN.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.bulkuploadCompulsion}
                        </p>
                      )}
                      {this.state.fileName && (
                        <div className="file-info">
                          <div className="file-cntr">
                            <div className="file-dtls">
                              <p className="file-name">{this.state.fileName}</p>
                              <div className="del-file" id="del-file-1">
                                <img src={DelBlack} alt="delete-black" />
                              </div>
                              <UncontrolledPopover
                                trigger="legacy"
                                placement="auto"
                                target="del-file-1"
                                className="general-popover delete-popover"
                              >
                                <PopoverBody className="d-flex">
                                  <div className="del-big-icon">
                                    <img src={DelBigIcon} alt="del-icon" />
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
                                        {" "}
                                        {TranslationContext !== undefined
                                          ? TranslationContext.a.cancel
                                          : "CANCEL"}
                                      </a>
                                      <button
                                        className="butn"
                                        onClick={this.handleDeleteBulkupload}
                                      >
                                        {TranslationContext !== undefined
                                          ? TranslationContext.button.delete
                                          : "Delete"}
                                      </button>
                                    </div>
                                  </div>
                                </PopoverBody>
                              </UncontrolledPopover>
                            </div>
                            <div>
                              <span className="file-size">
                                {this.state.fileSize}
                              </span>
                            </div>
                          </div>
                          {this.state.fileN.length > 0 &&
                          this.state.isFileUploadFail ? (
                            <div className="file-cntr">
                              <div className="file-dtls">
                                <p className="file-name">
                                  {this.state.fileName}
                                </p>
                                <a
                                  className="file-retry"
                                  onClick={this.hanldeAddBulkUpload.bind(this)}
                                  href="#!"
                                >
                                  {TranslationContext !== undefined
                                    ? TranslationContext.span.retry
                                    : "Retry"}
                                </a>
                              </div>
                              <div>
                                <span className="file-failed">
                                  {TranslationContext !== undefined
                                    ? TranslationContext.span.failed
                                    : "Failed"}
                                </span>
                              </div>
                            </div>
                          ) : null}
                          {this.state.showProgress ? (
                            <div className="file-cntr">
                              <div className="file-dtls">
                                <p className="file-name pr-0">
                                  {this.state.fileName}
                                </p>
                              </div>
                              <div>
                                <div className="d-flex align-items-center mt-2">
                                  <ProgressBar
                                    className="file-progress"
                                    now={this.state.progressValue}
                                  />
                                  <div className="cancel-upload">
                                    <img
                                      src={UploadCancel}
                                      alt="upload cancel"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      )}
                      <button
                        className="butn"
                        onClick={this.hanldeAddBulkUpload.bind(this)}
                      >
                        {TranslationContext !== undefined
                          ? TranslationContext.button.add
                          : "ADD"}
                      </button>
                    </Spin>
                    <br />
                  </div>
                </div>
              </div>
              <Modal
                open={this.state.editmodel}
                onClose={this.toggleEditModal}
                modalId="categoryEditModal"
              >
                <div className="edtpadding">
                  <div className="">
                    <label className="popover-header-text">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.editcrmrole
                        : "EDIT CRM ROLE"}
                    </label>
                  </div>
                  <div className="pop-over-div">
                    <label className="edit-label-1">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.rolename
                        : "Role Name"}
                    </label>
                    <input
                      type="text"
                      className="txt-edit-popover"
                      placeholder={
                        TranslationContext !== undefined
                          ? TranslationContext.label.enterrolename
                          : "Enter Role Name"
                      }
                      maxLength={25}
                      name="editRoleName"
                      value={this.state.editRoleName}
                      onChange={this.handleModaleDataChange.bind(this)}
                    />
                  </div>
                  {this.state.editCheckRoleName !== "" && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.editCheckRoleName}
                    </p>
                  )}
                  {this.state.modulesData !== null &&
                    this.state.modulesData.map((item, i) => (
                      <div
                        className="module-switch crm-margin-div crm-padding-div"
                        key={i}
                      >
                        <div className="switch switch-primary d-inline m-r-10">
                          <label className="storeRole-name-text">
                            {item.moduleName}
                          </label>
                          <input
                            type="checkbox"
                            id={"k" + item.moduleID}
                            name="allModules"
                            attrIds={item.moduleID}
                            checked={item.modulestatus}
                            onChange={this.handleModuleChange.bind(
                              this,
                              item.moduleID
                            )}
                          />
                          <label
                            htmlFor={"k" + item.moduleID}
                            className="cr cr-float-auto"
                          ></label>
                        </div>
                      </div>
                    ))}
                  <div className="pop-over-div">
                    <label className="edit-label-1">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.status
                        : "Status"}
                    </label>
                    <select
                      id="inputStatus"
                      className="edit-dropDwon dropdown-setting"
                      value={this.state.modulestatus}
                      name="status"
                      onChange={this.handleModaleDataChange.bind(this)}
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
                    <a
                      className="pop-over-cancle"
                      onClick={this.toggleEditModal}
                      href="#!"
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.a.cancel
                        : "CANCEL"}
                    </a>
                    <button
                      className="pop-over-button FlNone"
                      onClick={this.hanldeCreateUpdateCrmRole.bind(
                        this,
                        "update",
                        this.state.crmRoleID
                      )}
                      disabled={this.state.editSaveLoading}
                    >
                      <label className="pop-over-btnsave-text">
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
                          ? TranslationContext.label.save
                          : "SAVE"}
                      </label>
                    </button>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StoreCRMRole;
