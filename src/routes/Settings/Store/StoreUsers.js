import React, { Component } from "react";
import Demo from "../../../store/Hashtag.js";
import DelBigIcon from "./../../../assets/Images/del-big.png";
import FileUpload from "./../../../assets/Images/file.png";
import DelBlack from "./../../../assets/Images/del-black.png";
import UploadCancel from "./../../../assets/Images/upload-cancel.png";
import RedDeleteIcon from "./../../../assets/Images/red-delete-icon.png";
import DownExcel from "./../../../assets/Images/csv.png";
import { ProgressBar } from "react-bootstrap";
import { UncontrolledPopover, PopoverBody } from "reactstrap";
import { Link } from "react-router-dom";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlackInfoIcon from "./../../../assets/Images/Info-black.png";
import { Popover, Spin, Empty } from "antd";
import ReactTable from "react-table";
import { authHeader } from "../../../helpers/authHeader"; 
import axios from "axios";
import config from "./../../../helpers/config";
import Select from "react-select";
import ActiveStatus from "../../activeStatus.js";
import { NotificationManager } from "react-notifications";
import Modal from "react-responsive-modal";
import Sorting from "./../../../assets/Images/sorting.png";
import matchSorter from "match-sorter";
import { Tabs, Tab } from "react-bootstrap-tabs/dist";
import { CSVLink } from "react-csv";
import { formatSizeUnits } from "./../../../helpers/CommanFuncation";
import Dropzone from "react-dropzone";
import { encryption } from "../../../helpers/encryption.js";
import * as translationHI from "../../../translations/hindi";
import * as translationMA from "../../../translations/marathi";

class StoreUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: "",
      brandData: [],
      storeCodeData: [],
      editStoreCodeData: [],
      departmentData: [],
      functionData: [],
      activeData: ActiveStatus(),
      selectBrand: 0,
      selectStore: 0,
      brandCompulsory: "",
      storeCodeCompulsory: "",
      userName: "",
      firstName: "",
      lastName: "",
      mobile_no: "",
      email_Id: "",
      phoneFlag: true,
      emailFlag: true,
      mobilenumberCompulsory: "",
      userNameCompulsory: "",
      firstNameCompulsory: "",
      departmentCompulsory: "",
      designationCompulsory: "",
      functionCompulsory: "",
      reportDesignationCompulsory: "",
      reportToCompulsory: "",
      emailCompulsory: "",
      emailValidation: "",
      selectDepartment: 0,
      selectDesignation: 0,
      selectReportDesignation: 0,
      selectReportTo: 0,
      selectedFunction: [],
      userDesignationData: [],
      reportDesignation: [],
      reportToData: [],
      selectedClaimBrand: [],
      selectedClaimCategory: [],
      selectedClaimSubCategory: [],
      selectedClaimIssueType: [],
      mappedBrandCompulsory: "",
      mappedCategoryCompulsory: "",
      mappedSubCategoryCompulsory: "",
      mappedIssueTypeCompulsory: "",
      claimCategoryData: [],
      claimSubCategoryData: [],
      claimIssueTypeData: [],
      selectClaimApprover: "",
      ClaimApproverCompulsory: "",
      selectStatus: 0,
      statusCompulsory: "",
      selectCrmRole: 0,
      CrmRoleCompulsory: "",
      CrmRoleData: [],
      StoreReadOnly: false,
      personalReadOnly: false,
      profileReadOnly: false,
      buttonStoreToggle: false,
      btnPersonalToggle: false,
      btnProfileToggle: false,
      user_ID: 0,
      StoreUserData: [],
      sortAllData: [],
      sbrandNameFilterCheckbox: "",
      sitemCodeFilterCheckbox: "",
      suserNameFilterCheckbox: "",
      sdesignationNameFilterCheckbox: "",
      sreporteeNameFilterCheckbox: "",
      sdepartmentNameFilterCheckbox: "",
      smappedFunctionsFilterCheckbox: "",
      sortFilterbrandName: [],
      sortFilteritemCode: [],
      sortFilteruserName: [],
      sortFilterdesignationName: [],
      sortFilterreporteeName: [],
      sortFilterdepartmentName: [],
      sortFiltermappedFunctions: [],
      sortbrandName: [],
      sortitemCode: [],
      sortuserName: [],
      sortdesignationName: [],
      sortreporteeName: [],
      sortdepartmentName: [],
      sortmappedFunctions: [],
      sortColumn: "",
      sortHeader: "",
      filterTxtValue: "",
      StatusModel: false,
      tempitemData: [],
      isortA: false,
      UserEditmodel: false,
      selTab: "Store Details",
      brandNameColor: "",
      storeCodeColor: "",
      userdesignationColor: "",
      reporteeNameColor: "",
      departmentColor: "",
      functionColor: "",
      userNameColor: "",
      userEditData: {},
      userEdit: {},
      finaluser_id: 0,
      EditphoneFlag: true,
      EditemailFlag: true,
      editUserNameCompulsory: "",
      editMobilenumberCompulsory: "",
      EditBrandCompulsory: "",
      EditstoreCodeCompulsory: "",
      EditDepartmentCompulsory: "",
      editFuncation: [],
      editBrand: [],
      editCategory: [],
      editSubCategory: [],
      editIssueType: [],
      editFunctionCompulsion: "",
      EditDesignationCompulsory: "",
      EditReportDesignationCompulsory: "",
      EditReporteeDesignationCompulsory: "",
      fileSize: "",
      file: {},
      fileValidation: "",
      isErrorBulkUpload: false,
      isShowProgress: false,
      EditmappedBrandCompulsory: "",
      EditmappedCategoryCompulsory: "",
      EditmappedSubCategoryCompulsory: "",
      EditmappedIssueTypeCompulsory: "",
      EditmappedisClaimApprover: "",
      EditmappedcrmRoleID: "",
      EditmappedisActive: "",
      isATOZ: true,
      translateLanguage: {},
      bulkuploadLoading: false,
      isloading: false,
    };
    this.handleGetBrandData = this.handleGetBrandData.bind(this);
    this.handleGetstoreCodeData = this.handleGetstoreCodeData.bind(this);
    this.handleGetDepartmentData = this.handleGetDepartmentData.bind(this);
    this.handleGetFunctionData = this.handleGetFunctionData.bind(this);
    this.handleGetUserDesignationData = this.handleGetUserDesignationData.bind(
      this
    );
    this.handleGetRepoteeDesignationData = this.handleGetRepoteeDesignationData.bind(
      this
    );
    this.handleGetReportToData = this.handleGetReportToData.bind(this);
    this.handleGetClaimCategoryData = this.handleGetClaimCategoryData.bind(
      this
    );
    this.handleGetClaimSubCategoryData = this.handleGetClaimSubCategoryData.bind(
      this
    );
    this.handleGetClaimIssueType = this.handleGetClaimIssueType.bind(this);
    this.handleGetCRMRole = this.handleGetCRMRole.bind(this);
    this.handleGetStoreUserGridData = this.handleGetStoreUserGridData.bind(
      this
    );
    this.closeEditModals = this.closeEditModals.bind(this);
    this.StatusCloseModel = this.StatusCloseModel.bind(this);
    this.handleSendMail = this.handleSendMail.bind(this);
  }

  opneUserEditModal = () => {
    this.setState({ UserEditmodel: true });
  };
  closeEditModals() {
    this.setState({ UserEditmodel: false, selTab: "Store Details" });
  }

  componentDidMount() {
    // if (window.localStorage.getItem("module")) {
    //   var moduleData = JSON.parse(window.localStorage.getItem("module"));
    //   if (moduleData) {
    //
    //     var campModule = moduleData.filter(
    //       (x) => x.moduleName === "Settings" && x.modulestatus === true
    //     );
    //     if (campModule.length === 0) {
    //       this.props.history.push("/store/404notfound");
    //     }
    //   }
    // }
    this.handleGetBrandData();
    // this.handleGetstoreCodeData();
    this.handleGetUserDesignationData();
    this.handleGetCRMRole();
    this.handleGetStoreUserGridData();

    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }

  fileUpload = (file) => {
    if (file.length > 0) {
      var fileName = file[0].name;
      var fileSize = formatSizeUnits(file[0].size);
      this.setState({
        fileName,
        fileSize,
        file: file[0],
        fileValidation: "",
      });
    } else {
      NotificationManager.error("File accept only csv type.");
    }
  };

  DeleteBulkUploadFile = () => {
    const TranslationContext = this.state.translateLanguage.default;

    this.setState({
      file: {},
      fileName: "",
      fileSize: "",
      isErrorBulkUpload: false,
      isShowProgress: false,
    });
    NotificationManager.success(
      TranslationContext !== undefined
        ? TranslationContext.alertmessage.filedeletedsuccessfully
        : "File deleted successfully."
    );
  };

  editStoreMethod() {
    this.setState({
      StoreReadOnly: false,
      buttonStoreToggle: true,
    });
  }

  editPersonalMethod() {
    this.setState({
      personalReadOnly: false,
      btnPersonalToggle: true,
    });
  }

  editProfileMethod() {
    this.setState({
      profileReadOnly: false,
      btnProfileToggle: true,
    });
  }
  updateUploadProgress(value) {
    this.setState({ progressValue: value });
  }

  handleBulkUpload() {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    if (this.state.fileName) {
      this.setState({
        bulkuploadLoading: true,
      });
      const formData = new FormData();
      formData.append("file", this.state.file);
      // this.setState({ isShowProgress: true });
      axios({
        method: "post",
        url: config.apiUrl + "/StoreUser/BulkUploadStoreUser",
        headers: authHeader(),
        data: formData,
        // onUploadProgress: (ev = ProgressEvent) => {
        //   const progress = (ev.loaded / ev.total) * 100;
        //   this.updateUploadProgress(Math.round(progress));
        // },
      })
        .then((response) => {
          var status = response.data.message;
          var itemData = response.data.responseData;
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
            self.handleGetStoreUserGridData();
            self.setState({ isErrorBulkUpload: false, isShowProgress: false });
          } else if (status === "Record Uploaded Partially") {
            NotificationManager.error(
              "File uploaded partially.Please check the log."
            );
            self.setState({
              fileName: "",
              fileSize: "",
              fileN: [],
              bulkuploadLoading: false,
            });
            self.handleGetStoreUserGridData();
            self.setState({ isErrorBulkUpload: false, isShowProgress: false });
          } else {
            // self.setState({ isErrorBulkUpload: true, isShowProgress: false });
            self.setState({ bulkuploadLoading: false });
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.filenotupdated
                : "File not uploaded."
            );
          }
        })
        .catch((response) => {
          self.setState({ isErrorBulkUpload: true, bulkuploadLoading: false });
          console.log(response);
        });
    } else {
      this.setState({ fileValidation: "Please Select File." });
    }
  }

  /// drop down on change
  handleBrandAndStoreChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    if (name === "brandName") {
      this.setState({
        selectBrand: value,
        departmentData: [],
        functionData: [],
        selectedFunction: [],
      });
      this.handleGetstoreCodeData(value, "");
    } else if (name === "storeCode") {
      this.setState({
        selectStore: value,
        departmentData: [],
        functionData: [],
        selectedFunction: [],
      });
    }
    setTimeout(() => {
      if (this.state.selectBrand && this.state.selectStore) {
        var brandId = this.state.selectBrand;
        var storeId = this.state.selectStore;
        this.handleGetDepartmentData(brandId, storeId);
      }
    }, 1);
  };
  /// Department drop down OnChange
  handleDepartmentOnChange = (e) => {
    let value = e.target.value;
    this.setState({
      selectDepartment: value,
      functionData: [],
      selectedFunction: [],
    });
    setTimeout(() => {
      if (this.state.selectDepartment) {
        this.handleGetFunctionData();
      }
    }, 1);
  };
  /// handle onchange for drop down
  handleDropDownOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "selectDesignation") {
      this.setState({
        selectDesignation: value,
        reportDesignation: [],
        reportToData: [],
      });
      setTimeout(() => {
        if (this.state.selectDesignation) {
          this.handleGetRepoteeDesignationData();
        }
      }, 1);
    } else if (name === "selectReportDesignation") {
      this.setState({
        selectReportDesignation: value,
        reportToData: [],
      });
      setTimeout(() => {
        if (this.state.selectReportDesignation) {
          this.handleGetReportToData();
        }
      }, 1);
    } else if (name === "selectReportTo") {
      this.setState({
        selectReportTo: value,
      });
    } else if (name === "selectClaimApprover") {
      this.setState({
        selectClaimApprover: value,
      });
    } else if (name === "selectStatus") {
      this.setState({ selectStatus: value });
    } else if (name === "selectCrmRole") {
      this.setState({ selectCrmRole: value });
    }
  };
  /// Onchange for Mobile no
  hanldeMobileNoChange = (e) => {
    var name = e.target.name;
    var reg = /^[0-9\b]+$/;
    if (name === "mobile_no") {
      if (e.target.value === "" || reg.test(e.target.value)) {
        this.setState({ [e.target.name]: e.target.value });
      } else {
        e.target.value = "";
      }
      if (e.target.value.length === 10 || e.target.value.length === 0) {
        this.setState({
          phoneFlag: true,
        });
      } else {
        this.setState({
          phoneFlag: false,
        });
      }
    }
  };
  /// Onchange function
  handleOnChangeUserData = (e) => {
    var name = e.target.name;
    this.setState({
      [e.target.name]: e.target.value,
    });
    if (name === "email_Id") {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (e.target.value === "") {
        this.setState({
          emailFlag: true,
        });
      } else if (reg.test(e.target.value) === false) {
        this.setState({
          emailFlag: false,
        });
      } else {
        this.setState({
          emailFlag: true,
        });
      }
    }
  };
  /// handle Function Onchange for drop down
  handleFunctionOnChange(e) {
    if (e === null) {
      e = [];
      this.setState({ selectedFunction: e });
    } else {
      this.setState({ selectedFunction: e });
    }
  }
  /// handle Mapped Brand  multiselect Onchange
  handleMultiBrandonChange(e) {
    if (e === null) {
      e = [];
      this.setState({
        selectedClaimBrand: e,
        selectedClaimCategory: [],
        selectedClaimSubCategory: [],
        selectedClaimIssueType: [],
      });
    } else {
      this.setState({
        selectedClaimBrand: e,
        selectedClaimCategory: [],
        selectedClaimSubCategory: [],
        selectedClaimIssueType: [],
      });
      setTimeout(() => {
        if (this.state.selectedClaimBrand) {
          this.handleGetClaimCategoryData();
        }
      }, 1);
    }
  }
  /// handle Mapped Category  multiselect Onchange
  handleMultiCategoryonChange(e) {
    if (e === null) {
      e = [];
      this.setState({
        selectedClaimCategory: e,
        selectedClaimSubCategory: [],
        selectedClaimIssueType: [],
      });
    } else {
      this.setState({
        selectedClaimCategory: e,
        selectedClaimSubCategory: [],
        selectedClaimIssueType: [],
      });
      setTimeout(() => {
        if (this.state.selectedClaimCategory) {
          this.handleGetClaimSubCategoryData();
        }
      }, 1);
    }
  }
  /// handle Mapped SubCategory  multiselect Onchange
  handleMultiSubCategoryonChange(e) {
    if (e === null) {
      e = [];
      this.setState({
        selectedClaimSubCategory: e,
        selectedClaimIssueType: [],
      });
    } else {
      this.setState({
        selectedClaimSubCategory: e,
        selectedClaimIssueType: [],
      });
      setTimeout(() => {
        if (this.state.selectedClaimSubCategory) {
          this.handleGetClaimIssueType();
        }
      }, 1);
    }
  }
  /// handle Mapped Issue Type  multiselect Onchange
  handleMultiIssueTypeonChange(e) {
    if (e === null) {
      e = [];
      this.setState({ selectedClaimIssueType: e });
    } else {
      this.setState({ selectedClaimIssueType: e });
    }
  }

  handleEditOnchange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    var userEdit = this.state.userEdit;

    if (name === "mobileNo") {
      var reg = /^[0-9\b]+$/;

      if (e.target.value === "" || reg.test(e.target.value)) {
        var userEdit = this.state.userEdit;
        userEdit[name] = value;
        this.setState({
          userEdit,
        });
      } else {
        e.target.value = "";
      }
      if (e.target.value.length === 12 || e.target.value.length === 10 || e.target.value.length === 0) {
        this.setState({
          EditphoneFlag: true,
        });
      } else {
        this.setState({
          EditphoneFlag: false,
        });
      }
    } else if (name === "emailID") {
      var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (e.target.value === "") {
        this.setState({
          EditemailFlag: true,
        });
      } else if (reg.test(e.target.value) === false) {
        this.setState({
          EditemailFlag: false,
        });
      } else {
        this.setState({
          EditemailFlag: true,
        });
      }

      userEdit[name] = value;

      this.setState({
        userEdit,
      });
    } else {
      userEdit[name] = value;
      userEdit.departmentID = 0;

      this.setState({
        userEdit,
        editFuncation: [],
        functionData: [],
      });
    }

    setTimeout(() => {
      this.handleGetstoreCodeData(this.state.userEdit.brandID, "edit");
      if (this.state.userEdit.brandID && this.state.userEdit.storeID) {
        var brandId = this.state.userEdit.brandID;
        var storeId = this.state.userEdit.storeID;
        this.handleGetDepartmentData(brandId, storeId);
      }
    }, 1);
  };
  ////handle edit department dropdown onchange
  handleEditDepartmentOnchange(data, e) {
    var name = e.target.name;
    var value = e.target.value;
    var userEdit = this.state.userEdit;
    userEdit[name] = value;

    this.setState({
      userEdit,
      editFuncation: [],
      functionData: [],
    });
    setTimeout(() => {
      if (this.state.userEdit.departmentID) {
        this.handleGetFunctionData(data);
      }
    }, 1);
  }
  ///handle edit User desiagnation onchage
  handleEditUserDesignationChange(data, e) {
    var name = e.target.name;
    var value = e.target.value;
    var userEdit = this.state.userEdit;
    userEdit[name] = value;

    userEdit.reporteeDesignationID = 0;
    userEdit.reporteeID = 0;

    this.setState({
      userEdit,
      reportDesignation: [],
      reportToData: [],
    });
    setTimeout(() => {
      if (this.state.userEdit.designationID) {
        this.handleGetRepoteeDesignationData(data);
      }
    }, 1);
  }
  ///hanlde edit Report designation onchange
  handleEditReporteeDesigOnChange(data, e) {
    var name = e.target.name;
    var value = e.target.value;
    var userEdit = this.state.userEdit;
    userEdit[name] = value;

    this.setState({
      userEdit,
      // reportDesignation: [],
      reportToData: [],
    });
    setTimeout(() => {
      if (this.state.userEdit.reporteeDesignationID) {
        this.handleGetReportToData(data);
      }
    }, 1);
  }
  /// hanlde edit Report drop down change
  handleEditReportOnchange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    var userEdit = this.state.userEdit;
    userEdit[name] = value;

    this.setState({
      userEdit,
    });
  };
  /// hanlde edit Multi select Brand onchange
  handleMultiEditBrandonChange(e) {
    if (e === null) {
      e = [];
      this.setState({
        editBrand: e,
        editCategory: [],
        claimCategoryData: [],
        editSubCategory: [],
        claimSubCategoryData: [],
        editIssueType: [],
        claimIssueTypeData: [],
        EditmappedBrandCompulsory: "Please Select Brand",
      });
    } else {
      this.setState({
        editBrand: e,
        EditmappedBrandCompulsory: "",
        editCategory: [],
        claimCategoryData: [],
        editSubCategory: [],
        claimSubCategoryData: [],
        editIssueType: [],
        claimIssueTypeData: [],
      });
      setTimeout(() => {
        if (this.state.editBrand) {
          this.handleGetClaimCategoryData("edit");
        }
      }, 1);
    }
  }
  /// hanlde edit Multi select Category onchange
  handleMultiEditCategoryonChange(e) {
    if (e === null) {
      e = [];
      this.setState({
        editCategory: e,
        editSubCategory: [],
        claimSubCategoryData: [],
        claimIssueTypeData: [],
        editIssueType: [],
        EditmappedCategoryCompulsory: "Please Select Category.",
      });
    } else {
      this.setState({
        editCategory: e,
        EditmappedCategoryCompulsory: "",
        editSubCategory: [],
        claimSubCategoryData: [],
        claimIssueTypeData: [],
        editIssueType: [],
      });
      setTimeout(() => {
        if (this.state.editCategory) {
          this.handleGetClaimSubCategoryData("edit");
        }
      }, 1);
    }
  }

  /// hanlde edit Multi select sub Category onchange
  handleMultiEditSubCategoryonChange(e) {
    if (e === null) {
      e = [];
      this.setState({
        editSubCategory: e,
        editIssueType: [],
        EditmappedSubCategoryCompulsory: "Please Select Sub Category.",
      });
    } else {
      this.setState({
        editSubCategory: e,
        editIssueType: [],
        EditmappedSubCategoryCompulsory: "",
      });
      setTimeout(() => {
        if (this.state.editSubCategory) {
          this.handleGetClaimIssueType("edit");
        }
      }, 1);
    }
  }

  /// hanlde edit Multi select issuetype onchange
  handleMultiEditIssueTypeonChange(e) {
    if (e === null) {
      e = [];
      this.setState({
        editIssueType: e,
        EditmappedIssueTypeCompulsory: "Please Select Issue Type.",
      });
    } else {
      this.setState({ editIssueType: e, EditmappedIssueTypeCompulsory: "" });
    }
  }

  ////handle edit Function on change
  handleEditFunctionOnChange(e) {
    if (e === null) {
      e = [];
      this.setState({ editFuncation: e });
    } else {
      this.setState({ editFuncation: e });
    }
  }
  sortStatusZtoA() {
    var itemsArray = [];
    itemsArray = this.state.StoreUserData;

    if (this.state.sortColumn === "storeCode") {
      itemsArray.sort((a, b) => {
        if (a.storeCode < b.storeCode) return 1;
        if (a.storeCode > b.storeCode) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "brandName") {
      itemsArray.sort((a, b) => {
        if (a.brandName < b.brandName) return 1;
        if (a.brandName > b.brandName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "userName") {
      itemsArray.sort((a, b) => {
        if (a.userName < b.userName) return 1;
        if (a.userName > b.userName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "designationName") {
      itemsArray.sort((a, b) => {
        if (a.designationName < b.designationName) return 1;
        if (a.designationName > b.designationName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "reporteeName") {
      itemsArray.sort((a, b) => {
        if (a.reporteeName < b.reporteeName) return 1;
        if (a.reporteeName > b.reporteeName) return -1;
        return 0;
      });
    }
    if (this.state.sortColumn === "departmentName") {
      itemsArray.sort((a, b) => {
        if (a.departmentName < b.departmentName) return 1;
        if (a.departmentName > b.departmentName) return -1;
        return 0;
      });
    }

    if (this.state.sortColumn === "mappedFunctions") {
      itemsArray.sort((a, b) => {
        if (a.mappedFunctions < b.mappedFunctions) return 1;
        if (a.mappedFunctions > b.mappedFunctions) return -1;
        return 0;
      });
    }
    this.setState({
      isortA: true,
      isATOZ: false,
      StoreUserData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  sortStatusAtoZ() {
    var itemsArray = [];
    itemsArray = this.state.StoreUserData;

    if (this.state.sortColumn === "storeCode") {
      itemsArray.sort((a, b) => {
        if (a.storeCode < b.storeCode) return -1;
        if (a.storeCode > b.storeCode) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "brandName") {
      itemsArray.sort((a, b) => {
        if (a.brandName < b.brandName) return -1;
        if (a.brandName > b.brandName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "userName") {
      itemsArray.sort((a, b) => {
        if (a.userName < b.userName) return -1;
        if (a.userName > b.userName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "designationName") {
      itemsArray.sort((a, b) => {
        if (a.designationName < b.designationName) return -1;
        if (a.designationName > b.designationName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "reporteeName") {
      itemsArray.sort((a, b) => {
        if (a.reporteeName < b.reporteeName) return -1;
        if (a.reporteeName > b.reporteeName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "departmentName") {
      itemsArray.sort((a, b) => {
        if (a.departmentName < b.departmentName) return -1;
        if (a.departmentName > b.departmentName) return 1;
        return 0;
      });
    }
    if (this.state.sortColumn === "mappedFunctions") {
      itemsArray.sort((a, b) => {
        if (a.mappedFunctions < b.mappedFunctions) return -1;
        if (a.mappedFunctions > b.mappedFunctions) return 1;
        return 0;
      });
    }

    this.setState({
      isortA: true,
      isATOZ: true,
      StoreUserData: itemsArray,
    });
    setTimeout(() => {
      this.StatusCloseModel();
    }, 10);
  }

  StatusOpenModel(data, header) {
    if (
      this.state.sortFilterbrandName.length === 0 ||
      this.state.sortFilteritemCode.length === 0 ||
      this.state.sortFilteruserName.length === 0 ||
      this.state.sortFilterdesignationName.length === 0 ||
      this.state.sortFilterreporteeName.length === 0 ||
      this.state.sortFilterdepartmentName.length === 0 ||
      this.state.sortFiltermappedFunctions.length === 0
    ) {
      return false;
    }

    if (data === "storeCode") {
      if (
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.suserNameFilterCheckbox !== "" ||
        this.state.sdesignationNameFilterCheckbox !== "" ||
        this.state.sreporteeNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.smappedFunctionsFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sbrandNameFilterCheckbox: "",
          suserNameFilterCheckbox: "",
          sdesignationNameFilterCheckbox: "",
          sreporteeNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          smappedFunctionsFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "brandName") {
      if (
        this.state.sitemCodeFilterCheckbox !== "" ||
        this.state.suserNameFilterCheckbox !== "" ||
        this.state.sdesignationNameFilterCheckbox !== "" ||
        this.state.sreporteeNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.smappedFunctionsFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sitemCodeFilterCheckbox: "",
          suserNameFilterCheckbox: "",
          sdesignationNameFilterCheckbox: "",
          sreporteeNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          smappedFunctionsFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "userName") {
      if (
        this.state.sitemCodeFilterCheckbox !== "" ||
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.sdesignationNameFilterCheckbox !== "" ||
        this.state.sreporteeNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.smappedFunctionsFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sitemCodeFilterCheckbox: "",
          sbrandNameFilterCheckbox: "",
          sdesignationNameFilterCheckbox: "",
          sreporteeNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          smappedFunctionsFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "designationName") {
      if (
        this.state.sitemCodeFilterCheckbox !== "" ||
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.suserNameFilterCheckbox !== "" ||
        this.state.sreporteeNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.smappedFunctionsFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sitemCodeFilterCheckbox: "",
          sbrandNameFilterCheckbox: "",
          suserNameFilterCheckbox: "",
          sreporteeNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          smappedFunctionsFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "reporteeName") {
      if (
        this.state.sitemCodeFilterCheckbox !== "" ||
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.suserNameFilterCheckbox !== "" ||
        this.state.sdesignationNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.smappedFunctionsFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sitemCodeFilterCheckbox: "",
          sbrandNameFilterCheckbox: "",
          suserNameFilterCheckbox: "",
          sdesignationNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          smappedFunctionsFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "departmentName") {
      if (
        this.state.sitemCodeFilterCheckbox !== "" ||
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.suserNameFilterCheckbox !== "" ||
        this.state.sreporteeNameFilterCheckbox !== "" ||
        this.state.sdesignationNameFilterCheckbox !== "" ||
        this.state.smappedFunctionsFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sitemCodeFilterCheckbox: "",
          sbrandNameFilterCheckbox: "",
          suserNameFilterCheckbox: "",
          sreporteeNameFilterCheckbox: "",
          sdesignationNameFilterCheckbox: "",
          smappedFunctionsFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
    if (data === "mappedFunctions") {
      if (
        this.state.sitemCodeFilterCheckbox !== "" ||
        this.state.sbrandNameFilterCheckbox !== "" ||
        this.state.suserNameFilterCheckbox !== "" ||
        this.state.sreporteeNameFilterCheckbox !== "" ||
        this.state.sdepartmentNameFilterCheckbox !== "" ||
        this.state.sdesignationNameFilterCheckbox !== ""
      ) {
        this.setState({
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      } else {
        this.setState({
          sitemCodeFilterCheckbox: "",
          sbrandNameFilterCheckbox: "",
          suserNameFilterCheckbox: "",
          sreporteeNameFilterCheckbox: "",
          sdepartmentNameFilterCheckbox: "",
          sdesignationNameFilterCheckbox: "",
          StatusModel: true,
          sortColumn: data,
          sortHeader: header,
        });
      }
    }
  }
  StatusCloseModel() {
    if (this.state.tempitemData.length > 0) {
      this.setState({
        StatusModel: false,
        StoreUserData: this.state.tempitemData,
        filterTxtValue: "",
      });
      if (this.state.sortColumn === "storeCode") {
        if (this.state.sitemCodeFilterCheckbox === "") {
        } else {
          this.setState({
            sbrandNameFilterCheckbox: "",
            suserNameFilterCheckbox: "",
            sdesignationNameFilterCheckbox: "",
            sreporteeNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            smappedFunctionsFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "brandName") {
        if (this.state.sbrandNameFilterCheckbox === "") {
        } else {
          this.setState({
            sitemCodeFilterCheckbox: "",
            suserNameFilterCheckbox: "",
            sdesignationNameFilterCheckbox: "",
            sreporteeNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            smappedFunctionsFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "userName") {
        if (this.state.suserNameFilterCheckbox === "") {
        } else {
          this.setState({
            sitemCodeFilterCheckbox: "",
            sbrandNameFilterCheckbox: "",
            sdesignationNameFilterCheckbox: "",
            sreporteeNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            smappedFunctionsFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "designationName") {
        if (this.state.sdesignationNameFilterCheckbox === "") {
        } else {
          this.setState({
            sitemCodeFilterCheckbox: "",
            sbrandNameFilterCheckbox: "",
            suserNameFilterCheckbox: "",
            sreporteeNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            smappedFunctionsFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "reporteeName") {
        if (this.state.sreporteeNameFilterCheckbox === "") {
        } else {
          this.setState({
            sitemCodeFilterCheckbox: "",
            sbrandNameFilterCheckbox: "",
            suserNameFilterCheckbox: "",
            sdesignationNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            smappedFunctionsFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "departmentName") {
        if (this.state.sdepartmentNameFilterCheckbox === "") {
        } else {
          this.setState({
            sitemCodeFilterCheckbox: "",
            sbrandNameFilterCheckbox: "",
            suserNameFilterCheckbox: "",
            sreporteeNameFilterCheckbox: "",
            sdesignationNameFilterCheckbox: "",
            smappedFunctionsFilterCheckbox: "",
          });
        }
      }
      if (this.state.sortColumn === "mappedFunctions") {
        if (this.state.smappedFunctionsFilterCheckbox === "") {
        } else {
          this.setState({
            sitemCodeFilterCheckbox: "",
            sbrandNameFilterCheckbox: "",
            suserNameFilterCheckbox: "",
            sreporteeNameFilterCheckbox: "",
            sdepartmentNameFilterCheckbox: "",
            sdesignationNameFilterCheckbox: "",
          });
        }
      }
    } else {
      this.setState({
        StatusModel: false,
        StoreUserData: this.state.isortA
          ? this.state.StoreUserData
          : this.state.sortAllData,
        filterTxtValue: "",
      });
    }
  }

  setSortCheckStatus = (column, type, e) => {
    var itemsArray = [];

    var sbrandNameFilterCheckbox = this.state.sbrandNameFilterCheckbox;
    var sitemCodeFilterCheckbox = this.state.sitemCodeFilterCheckbox;
    var suserNameFilterCheckbox = this.state.suserNameFilterCheckbox;
    var sdesignationNameFilterCheckbox = this.state
      .sdesignationNameFilterCheckbox;
    var sreporteeNameFilterCheckbox = this.state.sreporteeNameFilterCheckbox;
    var sdepartmentNameFilterCheckbox = this.state
      .sdepartmentNameFilterCheckbox;
    var smappedFunctionsFilterCheckbox = this.state
      .smappedFunctionsFilterCheckbox;

    if (column === "storeCode" || column === "all") {
      if (type === "value" && type !== "All") {
        sitemCodeFilterCheckbox = sitemCodeFilterCheckbox.replace("all", "");
        sitemCodeFilterCheckbox = sitemCodeFilterCheckbox.replace("all,", "");
        if (sitemCodeFilterCheckbox.includes(e.currentTarget.value)) {
          sitemCodeFilterCheckbox = sitemCodeFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sitemCodeFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sitemCodeFilterCheckbox.includes("all")) {
          sitemCodeFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "storeCode") {
            for (let i = 0; i < this.state.sortitemCode.length; i++) {
              sitemCodeFilterCheckbox +=
                this.state.sortitemCode[i].storeCode + ",";
            }
            sitemCodeFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "brandName" || column === "all") {
      if (type === "value" && type !== "All") {
        sbrandNameFilterCheckbox = sbrandNameFilterCheckbox.replace("all", "");
        sbrandNameFilterCheckbox = sbrandNameFilterCheckbox.replace("all,", "");
        if (sbrandNameFilterCheckbox.includes(e.currentTarget.value)) {
          sbrandNameFilterCheckbox = sbrandNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sbrandNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sbrandNameFilterCheckbox.includes("all")) {
          sbrandNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "brandName") {
            for (let i = 0; i < this.state.sortbrandName.length; i++) {
              sbrandNameFilterCheckbox +=
                this.state.sortbrandName[i].brandName + ",";
            }
            sbrandNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "userName" || column === "all") {
      if (type === "value" && type !== "All") {
        suserNameFilterCheckbox = suserNameFilterCheckbox.replace("all", "");
        suserNameFilterCheckbox = suserNameFilterCheckbox.replace("all,", "");
        if (suserNameFilterCheckbox.includes(e.currentTarget.value)) {
          suserNameFilterCheckbox = suserNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          suserNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (suserNameFilterCheckbox.includes("all")) {
          suserNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "userName") {
            for (let i = 0; i < this.state.sortuserName.length; i++) {
              suserNameFilterCheckbox +=
                this.state.sortuserName[i].userName + ",";
            }
            suserNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "designationName" || column === "all") {
      if (type === "value" && type !== "All") {
        sdesignationNameFilterCheckbox = sdesignationNameFilterCheckbox.replace(
          "all",
          ""
        );
        sdesignationNameFilterCheckbox = sdesignationNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sdesignationNameFilterCheckbox.includes(e.currentTarget.value)) {
          sdesignationNameFilterCheckbox = sdesignationNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sdesignationNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sdesignationNameFilterCheckbox.includes("all")) {
          sdesignationNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "designationName") {
            for (let i = 0; i < this.state.sortdesignationName.length; i++) {
              sdesignationNameFilterCheckbox +=
                this.state.sortdesignationName[i].designationName + ",";
            }
            sdesignationNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "reporteeName" || column === "all") {
      if (type === "value" && type !== "All") {
        sreporteeNameFilterCheckbox = sreporteeNameFilterCheckbox.replace(
          "all",
          ""
        );
        sreporteeNameFilterCheckbox = sreporteeNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sreporteeNameFilterCheckbox.includes(e.currentTarget.value)) {
          sreporteeNameFilterCheckbox = sreporteeNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sreporteeNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sreporteeNameFilterCheckbox.includes("all")) {
          sreporteeNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "reporteeName") {
            for (let i = 0; i < this.state.sortreporteeName.length; i++) {
              sreporteeNameFilterCheckbox +=
                this.state.sortreporteeName[i].reporteeName + ",";
            }
            sreporteeNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "departmentName" || column === "all") {
      if (type === "value" && type !== "All") {
        sdepartmentNameFilterCheckbox = sdepartmentNameFilterCheckbox.replace(
          "all",
          ""
        );
        sdepartmentNameFilterCheckbox = sdepartmentNameFilterCheckbox.replace(
          "all,",
          ""
        );
        if (sdepartmentNameFilterCheckbox.includes(e.currentTarget.value)) {
          sdepartmentNameFilterCheckbox = sdepartmentNameFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          sdepartmentNameFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (sdepartmentNameFilterCheckbox.includes("all")) {
          sdepartmentNameFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "departmentName") {
            for (let i = 0; i < this.state.sortdepartmentName.length; i++) {
              sdepartmentNameFilterCheckbox +=
                this.state.sortdepartmentName[i].departmentName + ",";
            }
            sdepartmentNameFilterCheckbox += "all";
          }
        }
      }
    }
    if (column === "mappedFunctions" || column === "all") {
      if (type === "value" && type !== "All") {
        smappedFunctionsFilterCheckbox = smappedFunctionsFilterCheckbox.replace(
          "all",
          ""
        );
        smappedFunctionsFilterCheckbox = smappedFunctionsFilterCheckbox.replace(
          "all,",
          ""
        );
        if (smappedFunctionsFilterCheckbox.includes(e.currentTarget.value)) {
          smappedFunctionsFilterCheckbox = smappedFunctionsFilterCheckbox.replace(
            new RegExp(
              e.currentTarget.value +
                ",".replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
              "g"
            ),
            ""
          );
        } else {
          smappedFunctionsFilterCheckbox += e.currentTarget.value + ",";
        }
      } else {
        if (smappedFunctionsFilterCheckbox.includes("all")) {
          smappedFunctionsFilterCheckbox = "";
        } else {
          if (this.state.sortColumn === "mappedFunctions") {
            for (let i = 0; i < this.state.sortmappedFunctions.length; i++) {
              smappedFunctionsFilterCheckbox +=
                this.state.sortmappedFunctions[i].mappedFunctions + ",";
            }
            smappedFunctionsFilterCheckbox += "all";
          }
        }
      }
    }

    var allData = this.state.sortAllData;

    this.setState({
      sbrandNameFilterCheckbox,
      sitemCodeFilterCheckbox,
      suserNameFilterCheckbox,
      sdesignationNameFilterCheckbox,
      sreporteeNameFilterCheckbox,
      sdepartmentNameFilterCheckbox,
      smappedFunctionsFilterCheckbox,
      brandNameColor: "",
      storeCodeColor: "",
      userdesignationColor: "",
      reporteeNameColor: "",
      departmentColor: "",
      functionColor: "",
      userNameColor: "",
    });
    if (column === "all") {
      itemsArray = this.state.sortAllData;
    } else if (column === "storeCode") {
      var sItems = sitemCodeFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.storeCode === sItems[i]
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
        storeCodeColor: "sort-column",
      });
    } else if (column === "brandName") {
      var sItems = sbrandNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.brandName === sItems[i]
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
        brandNameColor: "sort-column",
      });
    } else if (column === "userName") {
      var sItems = suserNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.userName === sItems[i]
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
        userNameColor: "sort-column",
      });
    } else if (column === "designationName") {
      var sItems = sdesignationNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.designationName === sItems[i]
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
        userdesignationColor: "sort-column",
      });
    } else if (column === "reporteeName") {
      var sItems = sreporteeNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.reporteeName === sItems[i]
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
        reporteeNameColor: "sort-column",
      });
    } else if (column === "departmentName") {
      var sItems = sdepartmentNameFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.departmentName === sItems[i]
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
        departmentColor: "sort-column",
      });
    } else if (column === "mappedFunctions") {
      var sItems = smappedFunctionsFilterCheckbox.split(",");
      if (sItems.length > 0) {
        for (let i = 0; i < sItems.length; i++) {
          if (sItems[i] !== "") {
            var tempFilterData = allData.filter(
              (a) => a.mappedFunctions === sItems[i]
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
        functionColor: "sort-column",
      });
    }

    this.setState({
      tempitemData: itemsArray,
    });
  };

  filteTextChange(e) {
    this.setState({ filterTxtValue: e.target.value });

    if (this.state.sortColumn === "storeCode") {
      var sortFilteritemCode = matchSorter(
        this.state.sortitemCode,
        e.target.value,
        { keys: ["storeCode"] }
      );
      if (sortFilteritemCode.length > 0) {
        this.setState({ sortFilteritemCode });
      } else {
        this.setState({
          sortFilteritemCode: this.state.sortitemCode,
        });
      }
    }
    if (this.state.sortColumn === "brandName") {
      var sortFilterbrandName = matchSorter(
        this.state.sortbrandName,
        e.target.value,
        { keys: ["brandName"] }
      );
      if (sortFilterbrandName.length > 0) {
        this.setState({ sortFilterbrandName });
      } else {
        this.setState({
          sortFilterbrandName: this.state.sortbrandName,
        });
      }
    }
    if (this.state.sortColumn === "userName") {
      var sortFilteruserName = matchSorter(
        this.state.sortuserName,
        e.target.value,
        {
          keys: ["userName"],
        }
      );
      if (sortFilteruserName.length > 0) {
        this.setState({ sortFilteruserName });
      } else {
        this.setState({
          sortFilteruserName: this.state.sortuserName,
        });
      }
    }
    if (this.state.sortColumn === "designationName") {
      var sortFilterdesignationName = matchSorter(
        this.state.sortdesignationName,
        e.target.value,
        {
          keys: ["designationName"],
        }
      );
      if (sortFilterdesignationName.length > 0) {
        this.setState({ sortFilterdesignationName });
      } else {
        this.setState({
          sortFilterdesignationName: this.state.sortdesignationName,
        });
      }
    }
    if (this.state.sortColumn === "reporteeName") {
      var sortFilterreporteeName = matchSorter(
        this.state.sortreporteeName,
        e.target.value,
        {
          keys: ["reporteeName"],
        }
      );
      if (sortFilterreporteeName.length > 0) {
        this.setState({ sortFilterreporteeName });
      } else {
        this.setState({
          sortFilterreporteeName: this.state.sortreporteeName,
        });
      }
    }
    if (this.state.sortColumn === "departmentName") {
      var sortFilterdepartmentName = matchSorter(
        this.state.sortdepartmentName,
        e.target.value,
        {
          keys: ["departmentName"],
        }
      );
      if (sortFilterdepartmentName.length > 0) {
        this.setState({ sortFilterdepartmentName });
      } else {
        this.setState({
          sortFilterdepartmentName: this.state.sortdepartmentName,
        });
      }
    }
    if (this.state.sortColumn === "mappedFunctions") {
      var sortFiltermappedFunctions = matchSorter(
        this.state.sortmappedFunctions,
        e.target.value,
        {
          keys: ["mappedFunctions"],
        }
      );
      if (sortFiltermappedFunctions.length > 0) {
        this.setState({ sortFiltermappedFunctions });
      } else {
        this.setState({
          sortFiltermappedFunctions: this.state.sortmappedFunctions,
        });
      }
    }
  }
  EditStoreUserData = (data) => {
    var userEdit = {};
    var funcation = [];
    var brand = [];
    var category = [];
    var subCategory = [];
    var issueType = [];
    userEdit.userID = data.userID;
    userEdit.brandID = data.brandID;
    userEdit.brandName = data.brandName;
    userEdit.storeID = data.storeID;
    userEdit.storeCode = data.storeCode;
    userEdit.storeName = data.storeName;
    userEdit.userName = data.userName;
    userEdit.firstName = data.firstName;
    userEdit.lastName = data.lastName;
    userEdit.mobileNo = data.mobileNo;
    userEdit.emailID = data.emailID;
    userEdit.functionIDs = data.functionIDs;
    userEdit.mappedFunctions = data.mappedFunctions;
    userEdit.roleID = data.roleID;
    userEdit.roleName = data.roleName;
    userEdit.brandIDs = data.brandIDs;
    userEdit.mappedBrand = data.mappedBrand;
    userEdit.categoryIDs = data.categoryIDs;
    userEdit.mappedCategory = data.mappedCategory;
    userEdit.subCategoryIDs = data.subCategoryIDs;
    userEdit.mappedSubCategory = data.mappedSubCategory;
    userEdit.issueTypeIDs = data.issueTypeIDs;
    userEdit.mappedIssuetype = data.mappedIssuetype;
    userEdit.designationID = data.designationID;
    userEdit.designationName = data.designationName;
    userEdit.reporteeID = data.reporteeID === 0 ? "-1" : data.reporteeID;
    userEdit.reporteeName = data.reporteeName;
    userEdit.reporteeDesignationID =
      data.reporteeDesignationID === 0 ? "-1" : data.reporteeDesignationID;
    userEdit.reporteeDesignation = data.reporteeDesignation;
    userEdit.departmentID = data.departmentID;
    userEdit.departmentName = data.departmentName;
    userEdit.isActive = data.isActive;
    userEdit.isClaimApprover = data.isClaimApprover;
    userEdit.FirstName = data.firstName;
    userEdit.LastName = data.lastName;

    ////for Multi function binding drop down
    var fName = userEdit.mappedFunctions.split(",");
    var fId = userEdit.functionIDs.split(",").map(Number);
    if (userEdit.functionIDs !== "") {
      for (let i = 0; i < fId.length; i++) {
        funcation.push({ functionID: fId[i], funcationName: fName[i] });
      }
    }
    ////for Multi brand binding drop down
    var bName = userEdit.mappedBrand.split(",");
    var bId = userEdit.brandIDs.split(",").map(Number);
    if (userEdit.brandIDs !== null) {
      for (let j = 0; j < bId.length; j++) {
        brand.push({ brandID: bId[j], brandName: bName[j] });
      }
    }

    ////for Multi category binding drop down
    var cName = userEdit.mappedCategory.split(",");
    var cId = userEdit.categoryIDs.split(",").map(Number);
    if (userEdit.categoryIDs !== null || userEdit.categoryIDs !== "") {
      for (let k = 0; k < cId.length; k++) {
        if (cId[k] !== 0) {
          category.push({ categoryID: cId[k], categoryName: cName[k] });
        }
      }
    }

    ////for Multi sub-category binding drop down
    var sName = userEdit.mappedSubCategory.split(",");
    var sId = userEdit.subCategoryIDs.split(",").map(Number);
    if (userEdit.subCategoryIDs !== null || userEdit.subCategoryIDs !== "") {
      for (let k = 0; k < sId.length; k++) {
        if (sId[k] !== 0) {
          subCategory.push({
            subCategoryID: sId[k],
            subCategoryName: sName[k],
          });
        }
      }
    }

    ////for Multi issuetype binding drop down
    var iName = userEdit.mappedIssuetype.split(",");
    var iId = userEdit.issueTypeIDs.split(",").map(Number);
    if (userEdit.issueTypeIDs !== null || userEdit.issueTypeIDs !== "") {
      for (let k = 0; k < iId.length; k++) {
        if (iId[k] !== 0) {
          issueType.push({ issueTypeID: iId[k], issueTypeName: iName[k] });
        }
      }
    }

    this.setState({
      userEdit,
      finaluser_id: data.userID,
      editFuncation: funcation,
      editBrand: brand,
      editCategory: category,
      editSubCategory: subCategory,
      editIssueType: issueType,
      UserEditmodel: true,
    });

    this.handleGetDepartmentData(userEdit.brandID, userEdit.storeID);
    this.handleGetFunctionData("edit");
    this.handleGetUserDesignationData();
    this.handleGetRepoteeDesignationData("edit");
    this.handleGetReportToData("edit");
    this.handleGetBrandData();
    this.handleGetClaimCategoryData("edit");
    this.handleGetClaimSubCategoryData("edit");
    this.handleGetClaimIssueType("edit");
    this.handleGetstoreCodeData(userEdit.brandID, "edit");
  };
  // -------------------API Start------------------------
  ///Show Store User Grid data
  handleGetStoreUserGridData() {
    let self = this;
    this.setState({ isloading: true });
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/GetStoreUsers",
      headers: authHeader(),
    })
      .then((res) => {
        let status = res.data.message;
        let data = res.data.responseData;
        self.setState({ isloading: false });
        if (status === "Success") {
          self.setState({ StoreUserData: data });

          var unique = [];
          var distinct = [];
          var sortbrandName = [];
          var sortFilterbrandName = [];

          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].brandName] && data[i].brandName !== "") {
              distinct.push(data[i].brandName);
              unique[data[i].brandName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortbrandName.push({
                brandName: distinct[i],
              });
              sortFilterbrandName.push({
                brandName: distinct[i],
              });
            }
          }

          var unique = [];
          var distinct = [];
          var sortitemCode = [];
          var sortFilteritemCode = [];

          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].storeCode] && data[i].storeCode !== "") {
              distinct.push(data[i].storeCode);
              unique[data[i].storeCode] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortitemCode.push({
                storeCode: distinct[i],
              });
              sortFilteritemCode.push({
                storeCode: distinct[i],
              });
            }
          }
          var unique = [];
          var distinct = [];
          var sortuserName = [];
          var sortFilteruserName = [];

          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].userName] && data[i].userName !== "") {
              distinct.push(data[i].userName);
              unique[data[i].userName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortuserName.push({
                userName: distinct[i],
              });
              sortFilteruserName.push({
                userName: distinct[i],
              });
            }
          }
          var unique = [];
          var distinct = [];
          var sortdesignationName = [];
          var sortFilterdesignationName = [];
          for (let i = 0; i < data.length; i++) {
            if (
              !unique[data[i].designationName] &&
              data[i].designationName !== ""
            ) {
              distinct.push(data[i].designationName);
              unique[data[i].designationName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortdesignationName.push({
                designationName: distinct[i],
              });
              sortFilterdesignationName.push({
                designationName: distinct[i],
              });
            }
          }
          var unique = [];
          var distinct = [];
          var sortreporteeName = [];
          var sortFilterreporteeName = [];
          for (let i = 0; i < data.length; i++) {
            if (!unique[data[i].reporteeName] && data[i].reporteeName !== "") {
              distinct.push(data[i].reporteeName);
              unique[data[i].reporteeName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortreporteeName.push({
                reporteeName: distinct[i],
              });
              sortFilterreporteeName.push({
                reporteeName: distinct[i],
              });
            }
          }
          var unique = [];
          var distinct = [];
          var sortdepartmentName = [];
          var sortFilterdepartmentName = [];

          for (let i = 0; i < data.length; i++) {
            if (
              !unique[data[i].departmentName] &&
              data[i].departmentName !== ""
            ) {
              distinct.push(data[i].departmentName);
              unique[data[i].departmentName] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortdepartmentName.push({
                departmentName: distinct[i],
              });
              sortFilterdepartmentName.push({
                departmentName: distinct[i],
              });
            }
          }
          var unique = [];
          var distinct = [];
          var sortmappedFunctions = [];
          var sortFiltermappedFunctions = [];
          for (let i = 0; i < data.length; i++) {
            if (
              !unique[data[i].mappedFunctions] &&
              data[i].mappedFunctions !== ""
            ) {
              distinct.push(data[i].mappedFunctions);
              unique[data[i].mappedFunctions] = 1;
            }
          }
          for (let i = 0; i < distinct.length; i++) {
            if (distinct[i]) {
              sortmappedFunctions.push({
                mappedFunctions: distinct[i],
              });
              sortFiltermappedFunctions.push({
                mappedFunctions: distinct[i],
              });
            }
          }
          self.setState({
            sortAllData: data,
            sortFilterbrandName,
            sortFilteritemCode,
            sortFilteruserName,
            sortFilterdesignationName,
            sortFilterreporteeName,
            sortFilterdepartmentName,
            sortFiltermappedFunctions,
            sortbrandName,
            sortitemCode,
            sortuserName,
            sortdesignationName,
            sortreporteeName,
            sortdepartmentName,
            sortmappedFunctions,
          });
        } else {
          self.setState({ StoreUserData: [] });
        }
      })
      .catch((response) => {
        self.setState({ isloading: false });
        console.log(response);
      });
  }

  ////get Brand data for dropdown
  handleGetBrandData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader(),
    })
      .then((res) => {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ brandData: data });
        } else {
          self.setState({ brandData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  ////get Store Code for dropdown
  handleGetstoreCodeData(BrandId, check) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/StoreListByBrand",
      headers: authHeader(),
      params: {
        BrandID: parseInt(BrandId),
      },
    })
      .then((res) => {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          if (check === "edit") {
            self.setState({ editStoreCodeData: data });
          } else {
            self.setState({ storeCodeData: data });
          }
        } else {
          if (check === "edit") {
            self.setState({ editStoreCodeData: [] });
          } else {
            self.setState({ storeCodeData: [] });
          }
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  /// handle Get Department Data by Brand and store id  for dropdown list
  handleGetDepartmentData(brand_id, store_id) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/BindDepartmentByBrandAndStore",
      headers: authHeader(),
      params: {
        BrandID: brand_id,
        storeID: store_id,
      },
    })
      .then((res) => {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ departmentData: data });
        } else {
          self.setState({ departmentData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  /// handle Get Function data by department id for drop down list
  handleGetFunctionData(check) {
    var department_id = 0;
    if (check === "edit") {
      department_id = this.state.userEdit.departmentID;
    } else {
      department_id = this.state.selectDepartment;
    }
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreDepartment/getFunctionNameByDepartmentId",
      headers: authHeader(),
      params: {
        DepartmentId: department_id,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ functionData: data });
        } else {
          self.setState({ functionData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }

  ////get User Designation data for dropdown
  handleGetUserDesignationData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreHierarchy/GetStoreDesignationList",
      headers: authHeader(),
    })
      .then((res) => {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ userDesignationData: data });
        } else {
          self.setState({ userDesignationData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  /// handle get Repotee designation by Designation id for dropdown
  handleGetRepoteeDesignationData(check) {
    var designation_id = 0;
    if (check === "edit") {
      designation_id = this.state.userEdit.designationID;
    } else {
      designation_id = this.state.selectDesignation;
    }
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/BindStoreReporteeDesignation",
      headers: authHeader(),
      params: {
        DesignationID: designation_id,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ reportDesignation: data });
        } else {
          self.setState({ reportDesignation: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  /// handle get Report to data by designation id and isStoreUser for dropdown list
  handleGetReportToData(check) {
    let self = this;
    var designation_id = 0;
    if (check === "edit") {
      designation_id = this.state.userEdit.reporteeDesignationID;
    } else {
      designation_id = this.state.selectReportDesignation;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/BindStoreReportToUser",
      headers: authHeader(),
      params: {
        DesignationID: designation_id,
        IsStoreUser: true,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ reportToData: data });
        } else {
          self.setState({ reportToData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  //// handle get Claim category data by BrandIds for dropdown
  handleGetClaimCategoryData(check) {
    let self = this;
    let finalBrandIds = "";
    if (check === "edit") {
      if (this.state.editBrand !== null) {
        for (let j = 0; j < this.state.editBrand.length; j++) {
          finalBrandIds += this.state.editBrand[j].brandID + ",";
        }
      }
    } else {
      if (this.state.selectedClaimBrand !== null) {
        for (let i = 0; i < this.state.selectedClaimBrand.length; i++) {
          finalBrandIds += this.state.selectedClaimBrand[i].brandID + ",";
        }
      }
    }

    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/BindStoreClaimCategory",
      headers: authHeader(),
      params: {
        BrandIds: finalBrandIds.substring(",", finalBrandIds.length - 1),
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ claimCategoryData: data });
        } else {
          self.setState({ claimCategoryData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  //// handle get claim Sub category data for dropdown
  handleGetClaimSubCategoryData(check) {
    let self = this;
    let finalCategoryIds = "";
    if (check == "edit") {
      for (let i = 0; i < this.state.editCategory.length; i++) {
        finalCategoryIds += this.state.editCategory[i].categoryID + ",";
      }
    } else {
      if (this.state.selectedClaimCategory !== null) {
        for (let i = 0; i < this.state.selectedClaimCategory.length; i++) {
          finalCategoryIds +=
            this.state.selectedClaimCategory[i].categoryID + ",";
        }
      }
    }
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/BindStoreClaimSubCategory",
      headers: authHeader(),
      params: {
        CategoryIDs: finalCategoryIds.substring(
          ",",
          finalCategoryIds.length - 1
        ),
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ claimSubCategoryData: data });
        } else {
          self.setState({ claimSubCategoryData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  /// handle get claim Issue Type data for dropdown
  handleGetClaimIssueType(check) {
    let self = this;
    let finalSubCategoryIds = "";
    if (check == "edit") {
      for (let i = 0; i < this.state.editSubCategory.length; i++) {
        finalSubCategoryIds +=
          this.state.editSubCategory[i].subCategoryID + ",";
      }
    } else {
      if (this.state.selectedClaimSubCategory !== null) {
        for (let i = 0; i < this.state.selectedClaimSubCategory.length; i++) {
          finalSubCategoryIds +=
            this.state.selectedClaimSubCategory[i].subCategoryID + ",";
        }
      }
    }
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/BindStoreClaimIssueType",
      headers: authHeader(),
      params: {
        subCategoryIDs: finalSubCategoryIds.substring(
          ",",
          finalSubCategoryIds.length - 1
        ),
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ claimIssueTypeData: data });
        } else {
          self.setState({ claimIssueTypeData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  ////get Crm Role data for dropdown
  handleGetCRMRole() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreCRMRole/GetStoreCRMRoleDropdown",
      headers: authHeader(),
    })
      .then((res) => {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ CrmRoleData: data });
        } else {
          self.setState({ CrmRoleData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  /// Delete store user by user id
  handleDeleteStoreUser(Id) {
    const TranslationContext = this.state.translateLanguage.default;
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/DeleteStoreUser",
      headers: authHeader(),
      params: {
        UserId: Id,
        IsStoreUser: true,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        if (status === "Success") {
          self.handleGetStoreUserGridData();
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.userdeletedsuccessfully
              : "User Deleted Successfully."
          );
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  /// get data for Store User by User id
  handleGetUserListByID(user_Id) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/GetStoreUserDetailsByUserID",
      headers: authHeader(),
      params: {
        UserID: user_Id,
      },
    })
      .then(function(res) {
        let status = res.data.message;
        let data = res.data.responseData;
        if (status === "Success") {
          self.setState({ userEditData: data });
          self.EditStoreUserData(data);
        } else {
          self.setState({ userEditData: [] });
        }
      })
      .catch((response) => {
        console.log(response);
      });
  }
  //// handle Save Store Details
  handleSaveStoreDetails() {
    const TranslationContext = this.state.translateLanguage.default;

    if (this.state.selectBrand > 0 && this.state.selectStore > 0) {
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/StoreUser/AddUserBrandStore",
        headers: authHeader(),
        params: {
          brandID: this.state.selectBrand,
          storeID: this.state.selectStore,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          let data = res.data.responseData;
          if (status === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordsavedsuccessfully
                : "Record Saved Successfully."
            );
            self.setState({
              user_ID: data,
              StoreReadOnly: true,
            });
          } else {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordnotsaved
                : "Record Not Save."
            );
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        brandCompulsory: "Please Select Brand.",
        storeCodeCompulsory: "Please Select Store Code.",
      });
    }
  }

  //// handle Update Store details
  handleUpdateStoreDetails() {
    const TranslationContext = this.state.translateLanguage.default;

    if (this.state.selectBrand > 0 && this.state.selectStore > 0) {
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/StoreUser/UpdateUserBrandStore",
        headers: authHeader(),
        params: {
          brandID: this.state.selectBrand,
          storeID: this.state.selectStore,
          UserID: this.state.user_ID,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          // let data = res.data.responseData;
          if (status === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordupdatedsuccessfully
                : "Record Updated Successfully."
            );
            self.setState({
              // user_ID: data,
              StoreReadOnly: true,
            });
          } else {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordnotupdated
                : "Record Not Updated."
            );
          }
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
      this.setState({
        brandCompulsory: "Please Select Brand.",
        storeCodeCompulsory: "Please Select Store Code.",
      });
    }
  }
  //// handle Save Personal Details
  handleSavePersonalDetails() {
    const TranslationContext = this.state.translateLanguage.default;

    let self = this;
    if (
      this.state.userName.length > 0 &&
      this.state.firstName.length > 0 &&
      this.state.mobile_no.length > 0 &&
      this.state.email_Id.length > 0 &&
      this.state.emailFlag === true &&
      this.state.phoneFlag === true
    ) {
      if (this.state.user_ID) {
        axios({
          method: "post",
          url: config.apiUrl + "/StoreUser/AddStoreUserPersonalDetail",
          headers: authHeader(),
          data: {
            UserID: this.state.user_ID,
            UserName: this.state.userName.trim(),
            MobileNo: this.state.mobile_no,
            EmailID: this.state.email_Id.trim(),
            FirstName: this.state.firstName.trim(),
            LastName: this.state.lastName.trim(),
            IsStoreUser: true,
          },
        })
          .then(function(res) {
            let status = res.data.message;
            // let data = res.data.responseData;
            if (status === "Success") {
              NotificationManager.success(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.recordsavedsuccessfully
                  : "Record Saved Successfully."
              );
              self.setState({
                // user_ID: data,
                personalReadOnly: true,
              });
            } else {
              NotificationManager.error(res.data.message);
            }
          })
          .catch((response) => {
            console.log(response);
          });
      } else {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseenterstoredetails
            : "Please Enter Store Details."
        );
      }
    } else {
      this.setState({
        userNameCompulsory: "Please Enter User Name.",
        firstNameCompulsory: "Please Enter First Name.",
        mobilenumberCompulsory: "Please Enter Mobile No.",
        emailCompulsory: "Please Enter Email Id.",
      });
    }
  }

  //// update Personal details
  handleUpdatePersonalDetails() {
    const TranslationContext = this.state.translateLanguage.default;

    let self = this;
    if (
      this.state.userName.length > 0 &&
       this.state.firstName.length > 0 &&
      this.state.mobile_no.length > 0 &&
      this.state.email_Id.length > 0 &&
      this.state.emailFlag === true &&
      this.state.phoneFlag === true
    ) {
      if (this.state.user_ID) {
        axios({
          method: "post",
          url: config.apiUrl + "/StoreUser/AddStoreUserPersonalDetail",
          headers: authHeader(),
          data: {
            UserID: this.state.user_ID,
            UserName: this.state.userName.trim(),
            MobileNo: this.state.mobile_no,
            EmailID: this.state.email_Id.trim(),
            FirstName: this.state.firstName.trim(),
            LastName: this.state.lastName.trim(),
            IsStoreUser: true,
          },
        })
          .then(function(res) {
            let status = res.data.message;
            // let data = res.data.responseData;
            if (status === "Success") {
              NotificationManager.success(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.recordupdatedsuccessfully
                  : "Record Updated Successfully."
              );
              self.setState({
                // user_ID: data,
                personalReadOnly: true,
              });
            } else {
              NotificationManager.error(res.data.message);
            }
          })
          .catch((response) => {
            console.log(response);
          });
      } else {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseenterstoredetails
            : "Please Enter Store Details."
        );
      }
    } else {
      this.setState({
        userNameCompulsory: "Please Enter User Name.",
         firstNameCompulsory: "Please Enter First Name.",
        mobilenumberCompulsory: "Please Enter Mobile No.",
        emailCompulsory: "Please Enter Email Id.",
      });
    }
  }
  //// handle save profile details
  handleSaveProfileDetails() {
    const TranslationContext = this.state.translateLanguage.default;

    let self = this;
    if (
      this.state.selectDepartment > 0 &&
      this.state.selectedFunction.length > 0 &&
      this.state.selectDesignation > 0 &&
      this.state.selectReportDesignation !== 0 &&
      this.state.selectReportTo !== 0
    ) {
      var function_ids = "";
      if (this.state.selectedFunction !== null) {
        for (let i = 0; i < this.state.selectedFunction.length; i++) {
          function_ids += this.state.selectedFunction[i].functionID + ",";
        }
      }
      axios({
        method: "post",
        url: config.apiUrl + "/StoreUser/AddStoreUserProfileDetail",
        headers: authHeader(),
        params: {
          userID: this.state.user_ID,
          BrandID: this.state.selectBrand,
          storeID: this.state.selectStore,
          departmentId: this.state.selectDepartment,
          functionIDs: function_ids.substring(",", function_ids.length - 1),
          designationID:
            this.state.selectDesignation === "-1"
              ? 0
              : this.state.selectDesignation,
          reporteeID:
            this.state.selectReportTo === "-1" ? 0 : this.state.selectReportTo,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          // let data = res.data.responseData;
          if (status === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordsavedsuccessfully
                : "Record Saved Successfully."
            );
            self.setState({
              profileReadOnly: true,
            });
          } else {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordnotsaved
                : "Record Not Saved."
            );
          }
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
      this.setState({
        departmentCompulsory: "Please Select Department.",
        functionCompulsory: "Please Select Function.",
        designationCompulsory: "Please Select User Designation.",
        reportDesignationCompulsory: "Please Select Reportee Designation.",
        reportToCompulsory: "Please Select Report To.",
      });
    }
  }
  /// handle update Profile details
  handleUpdateProfileDetails() {
    const TranslationContext = this.state.translateLanguage.default;

    let self = this;
    if (
      this.state.selectDepartment > 0 &&
      this.state.selectedFunction.length > 0 &&
      this.state.selectDesignation > 0 &&
      this.state.selectReportDesignation > 0 &&
      this.state.selectReportTo > 0
    ) {
      var function_ids = "";
      if (this.state.selectedFunction !== null) {
        for (let i = 0; i < this.state.selectedFunction.length; i++) {
          function_ids += this.state.selectedFunction[i].functionID + ",";
        }
      }
      axios({
        method: "post",
        url: config.apiUrl + "/StoreUser/AddStoreUserProfileDetail",
        headers: authHeader(),
        params: {
          userID: this.state.user_ID,
          BrandID: this.state.selectBrand,
          storeID: this.state.selectStore,
          departmentId: this.state.selectDepartment,
          functionIDs: function_ids.substring(",", function_ids.length - 1),
          designationID: this.state.selectDesignation,
          reporteeID: this.state.selectReportTo,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordupdatedsuccessfully
                : "Record Updated Successfully."
            );
            self.setState({
              profileReadOnly: true,
            });
          } else {
            NotificationManager.error(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.recordnotupdated
                : "Record Not Update."
            );
          }
        })
        .catch((response) => {
          console.log(response);
        });
    } else {
      this.setState({
        departmentCompulsory: "Please Select Department.",
        functionCompulsory: "Please Select Function.",
        designationCompulsory: "Please Select User Designation.",
        reportDesignationCompulsory: "Please Select Reportee Designation.",
        reportToCompulsory: "Please Select Report To.",
      });
    }
  }
  //// final save User data
  handleFinalSaveUserData() {
    const TranslationContext = this.state.translateLanguage.default;

    if (
      this.state.selectedClaimBrand.length > 0 &&
      this.state.selectedClaimCategory.length > 0 &&
      this.state.selectedClaimSubCategory.length > 0 &&
      this.state.selectedClaimIssueType.length > 0 &&
      this.state.selectClaimApprover.length > 0 &&
      this.state.selectCrmRole.length > 0 &&
      this.state.selectStatus.length > 0
    ) {
      let self = this;
      if (this.state.user_ID) {
        var brand_ids = "";
        var category_ids = "";
        var SubCat_ids = "";
        var issueType_ids = "";
        var isActive = 0;
        var claimStatus = 0;
        if (this.state.selectedClaimBrand !== null) {
          for (let i = 0; i < this.state.selectedClaimBrand.length; i++) {
            brand_ids += this.state.selectedClaimBrand[i].brandID + ",";
          }
        }
        if (this.state.selectedClaimCategory !== null) {
          for (let i = 0; i < this.state.selectedClaimCategory.length; i++) {
            category_ids +=
              this.state.selectedClaimCategory[i].categoryID + ",";
          }
        }
        if (this.state.selectedClaimSubCategory !== null) {
          for (let i = 0; i < this.state.selectedClaimSubCategory.length; i++) {
            SubCat_ids +=
              this.state.selectedClaimSubCategory[i].subCategoryID + ",";
          }
        }
        if (this.state.selectedClaimIssueType !== null) {
          for (let i = 0; i < this.state.selectedClaimIssueType.length; i++) {
            issueType_ids +=
              this.state.selectedClaimIssueType[i].issueTypeID + ",";
          }
        }
        if (this.state.selectStatus === "Active") {
          isActive = 1;
        } else {
          isActive = 0;
        }
        if (this.state.selectClaimApprover === "yes") {
          claimStatus = 1;
        } else {
          claimStatus = 0;
        }
        axios({
          method: "post",
          url: config.apiUrl + "/StoreUser/AddStoreUserMappingCategory",
          headers: authHeader(),
          data: {
            UserID: this.state.user_ID,
            BrandIDs: brand_ids.substring(",", brand_ids.length - 1),
            CategoryIds: category_ids.substring(",", category_ids.length - 1),
            SubCategoryIds: SubCat_ids.substring(",", SubCat_ids.length - 1),
            IssuetypeIds: issueType_ids.substring(
              ",",
              issueType_ids.length - 1
            ),
            isClaimApprover: Boolean(claimStatus),
            CRMRoleID: this.state.selectCrmRole,
            isActive: Boolean(isActive),
            IsStoreUser: true,
          },
        })
          .then(function(res) {
            let status = res.data.message;
            if (status === "Success") {
              NotificationManager.success(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.usercreatedsuccessfully
                  : "User created successfully."
              );
              self.handleGetStoreUserGridData();
              self.handleSendMail(self.state.user_ID);
              self.handleGetstoreCodeData();
              self.setState({
                storeCodeData: [],
                selectStore: 0,
                userName: "",
                mobile_no: "",
                email_Id: "",
                selectClaimApprover: "",
                buttonStoreToggle: false,
                StoreReadOnly: false,
                personalReadOnly: false,
                btnPersonalToggle: false,
                profileReadOnly: false,
                btnProfileToggle: false,
                departmentData: [],
                selectedFunction: [],
                functionData: [],
                userDesignationData: [],
                reportDesignation: [],
                reportToData: [],
                selectedClaimBrand: [],
                selectedClaimCategory: [],
                selectedClaimSubCategory: [],
                selectedClaimIssueType: [],
                claimSubCategoryData: [],
                claimCategoryData: [],                
                claimIssueTypeData: [],
              });
            } else {
              NotificationManager.error(
                TranslationContext !== undefined
                  ? TranslationContext.alertmessage.usernotcreated
                  : "User not created successfully."
              );
            }
          })
          .catch((response) => {
            console.log(response);
          });
      } else {
        NotificationManager.error(
          TranslationContext !== undefined
            ? TranslationContext.alertmessage.pleaseenterpersonaldetails
            : "Please Enter Personal Details."
        );
      }
    } else {
      this.setState({
        mappedBrandCompulsory: "Please Select Brand.",
        mappedCategoryCompulsory: "Please Select Category.",
        mappedSubCategoryCompulsory: "Please Select Sub Category.",
        mappedIssueTypeCompulsory: "Please Select Issue Type.",
        ClaimApproverCompulsory: "Please Select Claim Approver.",
        CrmRoleCompulsory: "Please Select Crm Role.",
        statusCompulsory: "Please Select Status.",
      });
    }
  }
  handleSendMail(user_Id) {
    const TranslationContext = this.state.translateLanguage.default;

    let X_Authorized_Domainname = encryption(window.location.origin, "enc");
    var _token = window.localStorage.getItem("token");
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/SendMailforchangepassword",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "X-Authorized-Token": _token,
        "X-Authorized-Domainname": X_Authorized_Domainname,
      },
      params: {
        userID: user_Id,
        IsStoreUser: 1,
      },
    })
      .then(function(res) {
        let reportto = res.data.responseData;
        if (reportto === "Mail sent successfully") {
          NotificationManager.success(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.pleasecheckemail
              : "Please Check Email."
          );
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.alertmessage.mailsentfailed
              : "Mail Sent Failed."
          );
        }
      })
      .catch((res) => {
        console.log(res);
      });
  }
  //// hanlde check Edit Store details
  HandlecheckStoreDetails() {
    if (this.state.userEdit.brandID > 0 && this.state.userEdit.storeID > 0) {
      this.setState({
        selTab: "Personal Details",
      });
    } else {
      this.setState({
        EditBrandCompulsory: "Please Select Brand.",
        EditstoreCodeCompulsory: "Please Select Store Code.",
      });
    }
  }
  /// handle Check edit personal details
  handleCheckPersonalDetails() {
    if (
      this.state.userEdit.userName.length > 0 &&
      this.state.userEdit.mobileNo.length > 0 &&
      this.state.userEdit.emailID.length > 0
    ) {
      this.setState({
        selTab: "Profile Details",
      });
    } else {
      this.setState({
        editUserNameCompulsory: "Please Enter User Name.",
        editMobilenumberCompulsory: "Please Enter Mobile No.",
        EditEmailCompulsory: "Please Enter Email Id.",
      });
    }
  }
  ////handle update user
  handleUpdateUser() {
    const TranslationContext = this.state.translateLanguage.default;

    var inputParam = {};
    if (
      /// -----------Store Detail Validation-------------------
      this.state.userEdit.brandID > 0 &&
      this.state.userEdit.storeID > 0 &&
      /// -----------Personal Details Validation---------------
      this.state.userEdit.userName.length > 0 &&
      this.state.userEdit.mobileNo.length > 0 &&
      this.state.userEdit.emailID.length > 0 &&
      /// -----------Profile Details Validation----------------
      this.state.userEdit.departmentID > 0 &&
      this.state.editFuncation.length > 0 &&
      this.state.userEdit.designationID > 0 &&
      this.state.userEdit.reporteeDesignationID !== 0 &&
      this.state.userEdit.reporteeID !== 0 &&
      /// --------Mapped Claim Category validation------------
      this.state.editBrand.length > 0 &&
      this.state.editCategory.length > 0 &&
      this.state.editFuncation.length > 0 &&
      this.state.editIssueType.length > 0 &&
      this.state.editSubCategory.length > 0 &&
      this.state.userEdit.isClaimApprover !== "0" &&
      this.state.userEdit.isActive !== "0" &&
      this.state.userEdit.roleID > 0
    ) {
      inputParam.UserID = this.state.userEdit.userID;

      var editBrand = "";
      for (let i = 0; i < this.state.editBrand.length; i++) {
        editBrand += this.state.editBrand[i].brandID + ",";
      }
      var editCategory = "";
      for (let i = 0; i < this.state.editCategory.length; i++) {
        editCategory += this.state.editCategory[i].categoryID + ",";
      }
      var editFuncation = "";
      for (let i = 0; i < this.state.editFuncation.length; i++) {
        editFuncation += this.state.editFuncation[i].functionID + ",";
      }
      var editIssueType = "";
      for (let i = 0; i < this.state.editIssueType.length; i++) {
        editIssueType += this.state.editIssueType[i].issueTypeID + ",";
      }
      var editSubCategory = "";
      for (let i = 0; i < this.state.editSubCategory.length; i++) {
        editSubCategory += this.state.editSubCategory[i].subCategoryID + ",";
      }
      inputParam.BrandIDs = editBrand.substring(",", editBrand.length - 1);
      inputParam.CategoryIds = editCategory.substring(
        ",",
        editCategory.length - 1
      );
      inputParam.SubCategoryIds = editSubCategory.substring(
        ",",
        editSubCategory.length - 1
      );
      inputParam.IssuetypeIds = editIssueType.substring(
        ",",
        editIssueType.length - 1
      );
      inputParam.FunctionIDs = editFuncation.substring(
        ",",
        editFuncation.length - 1
      );

      inputParam.IsClaimApprove = this.state.userEdit.isClaimApprover;
      inputParam.CRMRoleID = this.state.userEdit.roleID;
      inputParam.isActive =
        this.state.userEdit.isActive == "Active" ? true : false;
      inputParam.IsStoreUser = 1;
      inputParam.DepartmentID = this.state.userEdit.departmentID;

      inputParam.DesignationID = this.state.userEdit.designationID;
      inputParam.ReporteeID = this.state.userEdit.reporteeID;
      inputParam.UserName = this.state.userEdit.userName;
      inputParam.EmailID = this.state.userEdit.emailID;
      inputParam.MobileNo = this.state.userEdit.mobileNo;
      inputParam.FirstName = this.state.userEdit.FirstName || "";
      inputParam.LastName = this.state.userEdit.LastName || "";
      inputParam.BrandID = this.state.userEdit.brandID;
      inputParam.StoreID = this.state.userEdit.storeID;
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/StoreUser/ModifyStoreUser",
        headers: authHeader(),
        data: inputParam,
      })
        .then(function(response) {
          var message = response.data.message;
          var responseData = response.data.responseData;

          if (message === "Success" && responseData) {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.userupdatedsuccessfully
                : "User Updated Successfully."
            );
            self.handleGetStoreUserGridData();
            self.closeEditModals();
          } else {
            NotificationManager.success(
              TranslationContext !== undefined
                ? TranslationContext.alertmessage.userupdatedfailed
                : "User Updated Fail."
            );
          }
        })
        .catch((response) => {
          console.log(response, "---handleUpdateUser");
        });
    } else {
      this.setState({
        EditmappedBrandCompulsory: "Please Select Brand.",
        EditmappedCategoryCompulsory: "Please Select Category.",
        EditmappedSubCategoryCompulsory: "Please Select Sub Category.",
        EditmappedIssueTypeCompulsory: "Please Select Issue Type.",
        EditmappedisClaimApprover: "Please Select Claim Approver.",
        EditmappedcrmRoleID: "Please Select CRM Role.",
        EditmappedisActive: "Please Select Status.",
        EditBrandCompulsory: "Please Select Brand.",
        EditstoreCodeCompulsory: "Please Select Store Code.",
        editUserNameCompulsory: "Please Enter User Name.",
        editMobilenumberCompulsory: "Please Enter Mobile No.",
        EditEmailCompulsory: "Please Enter Email Id.",
        mappedBrandCompulsory: "Please Select Brand.",
        mappedCategoryCompulsory: "Please Select Category.",
        mappedSubCategoryCompulsory: "Please Select Sub Category.",
        mappedIssueTypeCompulsory: "Please Select Issue Type.",
        ClaimApproverCompulsory: "Please Select Claim Approver.",
        CrmRoleCompulsory: "Please Select Crm Role.",
        statusCompulsory: "Please Select Status.",
        EditDepartmentCompulsory: "Please Select Department.",
        editFunctionCompulsion: "Please Select Function.",
        EditDesignationCompulsory: "Please Select Designnation.",
        EditReportDesignationCompulsory: "please Select Report To.",
        EditReporteeDesignationCompulsory:
          "please Select Reportee Designation.",
      });
    }
  }

  handleChangeProfileTab() {
    if (this.state.userEdit.departmentID > 0) {
      this.setState({ EditDepartmentCompulsory: "" });
    } else {
      this.setState({ EditDepartmentCompulsory: "Please Select Department." });
    }
    if (this.state.userEdit.designationID > 0) {
      this.setState({ EditDesignationCompulsory: "" });
    } else {
      this.setState({
        EditDesignationCompulsory: "Please Select Designnation.",
      });
    }

    if (this.state.userEdit.reporteeID !== 0) {
      this.setState({ EditReportDesignationCompulsory: "" });
    } else {
      this.setState({
        EditReportDesignationCompulsory: "please Select Report To.",
      });
    }

    if (this.state.userEdit.reporteeDesignationID !== 0) {
      this.setState({ EditReporteeDesignationCompulsory: "" });
    } else {
      this.setState({
        EditReporteeDesignationCompulsory:
          "please Select Reportee Designation.",
      });
    }
    if (this.state.editFuncation.length > 0) {
      this.setState({ editFunctionCompulsion: "" });
    } else {
      this.setState({
        editFunctionCompulsion: "Please Select Function.",
      });
    }
    setTimeout(() => {
      if (
        this.state.EditDepartmentCompulsory == "" &&
        this.state.editFunctionCompulsion == "" &&
        this.state.EditReportDesignationCompulsory == "" &&
        this.state.EditReporteeDesignationCompulsory == "" &&
        this.state.EditDesignationCompulsory == ""
      ) {
        this.setState({
          selTab: "Mapped Claim Category",
        });
      }
    }, 10);
  }

  handleChagenMapping(e) {
    const { name, value } = e.target;
    var userEdit = this.state.userEdit;
    userEdit[name] = value;
    this.setState({ userEdit });
  }

  handleClearSearch() {
    this.setState({
      sbrandNameFilterCheckbox: "",
      sitemCodeFilterCheckbox: "",
      suserNameFilterCheckbox: "",
      sdesignationNameFilterCheckbox: "",
      sreporteeNameFilterCheckbox: "",
      sdepartmentNameFilterCheckbox: "",
      smappedFunctionsFilterCheckbox: "",
      filterTxtValue: "",
      sortHeader: "",
      sortColumn: "",
      StatusModel: false,
      StoreUserData: this.state.sortAllData,
      tempitemData: [],
    });
  }
  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <React.Fragment>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Modal
            onClose={this.StatusCloseModel}
            open={this.state.StatusModel}
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
                style={{
                  margin: "0 25px",
                  textDecoration: "underline",
                  color: "#2561A8",
                  cursor: "pointer",
                }}
                onClick={this.handleClearSearch.bind(this)}
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
                        this.state.sitemCodeFilterCheckbox.includes("all") ||
                        this.state.sbrandNameFilterCheckbox.includes("all") ||
                        this.state.suserNameFilterCheckbox.includes("all") ||
                        this.state.sdesignationNameFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.sreporteeNameFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.sdepartmentNameFilterCheckbox.includes(
                          "all"
                        ) ||
                        this.state.smappedFunctionsFilterCheckbox.includes(
                          "all"
                        )
                      }
                      onChange={this.setSortCheckStatus.bind(this, "all")}
                    />
                    <label htmlFor={"fil-open"}>
                      <span className="table-btn table-blue-btn">ALL</span>
                    </label>
                  </div>
                  {this.state.sortColumn === "storeCode"
                    ? this.state.sortFilteritemCode !== null &&
                      this.state.sortFilteritemCode.map((item, i) => (
                        <div className="filter-checkbox" key={i}>
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.storeCode}
                            value={item.storeCode}
                            checked={
                              this.state.sitemCodeFilterCheckbox
                                .split(",")
                                .find((word) => word === item.storeCode) ||
                              false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "storeCode",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.storeCode}>
                            <span className="table-btn table-blue-btn">
                              {item.storeCode}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "brandName"
                    ? this.state.sortFilterbrandName !== null &&
                      this.state.sortFilterbrandName.map((item, b) => (
                        <div className="filter-checkbox" key={b}>
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.brandName}
                            value={item.brandName}
                            checked={
                              this.state.sbrandNameFilterCheckbox
                                .split(",")
                                .find((word) => word === item.brandName) ||
                              false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "brandName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.brandName}>
                            <span className="table-btn table-blue-btn">
                              {item.brandName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "userName"
                    ? this.state.sortFilteruserName !== null &&
                      this.state.sortFilteruserName.map((item, u) => (
                        <div className="filter-checkbox" key={u}>
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.userName}
                            value={item.userName}
                            checked={
                              this.state.suserNameFilterCheckbox
                                .split(",")
                                .find((word) => word === item.userName) || false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "userName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.userName}>
                            <span className="table-btn table-blue-btn">
                              {item.userName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}

                  {this.state.sortColumn === "designationName"
                    ? this.state.sortFilterdesignationName !== null &&
                      this.state.sortFilterdesignationName.map((item, d) => (
                        <div className="filter-checkbox" key={d}>
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.designationName}
                            value={item.designationName}
                            checked={
                              this.state.sdesignationNameFilterCheckbox
                                .split(",")
                                .find(
                                  (word) => word === item.designationName
                                ) || false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "designationName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.designationName}>
                            <span className="table-btn table-blue-btn">
                              {item.designationName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                  {this.state.sortColumn === "reporteeName"
                    ? this.state.sortFilterreporteeName !== null &&
                      this.state.sortFilterreporteeName.map((item, r) => (
                        <div className="filter-checkbox" key={r}>
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.reporteeName}
                            value={item.reporteeName}
                            checked={
                              this.state.sreporteeNameFilterCheckbox
                                .split(",")
                                .find((word) => word === item.reporteeName) ||
                              false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "reporteeName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.reporteeName}>
                            <span className="table-btn table-blue-btn">
                              {item.reporteeName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                  {this.state.sortColumn === "departmentName"
                    ? this.state.sortFilterdepartmentName !== null &&
                      this.state.sortFilterdepartmentName.map((item, j) => (
                        <div className="filter-checkbox" key={j}>
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.departmentName}
                            value={item.departmentName}
                            checked={
                              this.state.sdepartmentNameFilterCheckbox
                                .split(",")
                                .find((word) => word === item.departmentName) ||
                              false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "departmentName",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.departmentName}>
                            <span className="table-btn table-blue-btn">
                              {item.departmentName}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                  {this.state.sortColumn === "mappedFunctions"
                    ? this.state.sortFiltermappedFunctions !== null &&
                      this.state.sortFiltermappedFunctions.map((item, i) => (
                        <div className="filter-checkbox" key={i}>
                          <input
                            type="checkbox"
                            name="filter-type"
                            id={"fil-open" + item.mappedFunctions}
                            value={item.mappedFunctions}
                            checked={
                              this.state.smappedFunctionsFilterCheckbox
                                .split(",")
                                .find(
                                  (word) => word === item.mappedFunctions
                                ) || false
                            }
                            onChange={this.setSortCheckStatus.bind(
                              this,
                              "mappedFunctions",
                              "value"
                            )}
                          />
                          <label htmlFor={"fil-open" + item.mappedFunctions}>
                            <span className="table-btn table-blue-btn">
                              {item.mappedFunctions}
                            </span>
                          </label>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </Modal>
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
              ? TranslationContext.link.usermaster
              : "User Master"}
          </Link>
        </div>
        <div className="container-fluid">
          <div className="store-settings-cntr">
            <div className="row">
              <div className="col-md-8">
                <div className="table-cntr table-height StoreUserReact setting-table-des settings-align tbl-loading">
                  <ReactTable
                    data={this.state.StoreUserData}
                    columns={[
                      {
                        Header: (
                          <span
                            // className={this.state.brandNameColor}
                            className={
                              this.state.sortHeader === "Brand Name"
                                ? "sort-column"
                                : ""
                            }
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "brandName",
                              TranslationContext !== undefined
                                ? TranslationContext.span.brandname
                                : "Brand Name"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.brandname
                              : "Brand Name"}

                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ == false &&
                                this.state.sortHeader === "Brand Name"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable: false,
                        accessor: "brandName",
                      },
                      {
                        Header: (
                          <span
                            // className={this.state.storeCodeColor}
                            className={
                              this.state.sortHeader === "Store Code"
                                ? "sort-column"
                                : ""
                            }
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "storeCode",
                              TranslationContext !== undefined
                                ? TranslationContext.span.storecode
                                : " Store Code"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.storecode
                              : " Store Code"}

                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ == false &&
                                this.state.sortHeader === "Store Code"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable: false,
                        accessor: "storeCode",
                      },
                      {
                        Header: (
                          <span
                            // className={this.state.userNameColor}
                            className={
                              this.state.sortHeader === "User Name"
                                ? "sort-column"
                                : ""
                            }
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "userName",
                              TranslationContext !== undefined
                                ? TranslationContext.span.username
                                : "User Name"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.username
                              : "User Name"}

                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ == false &&
                                this.state.sortHeader === "User Name"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable: false,
                        accessor: "userName",
                        minWidth: 150,
                        Cell: (row) => {
                          var ids = row.original["userID"];
                          return (
                            <div>
                              <span className="store-one-liner one-liner">
                                {row.original.userName}
                                <Popover
                                  content={
                                    <div>
                                      <div>
                                        <p className="title">
                                          <b>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.b.mobileno
                                              : "Mobile No"}
                                            :
                                          </b>
                                          {row.original.mobileNo}
                                        </p>
                                        <p className="title">
                                          <b>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.b.emailid
                                              : "Email ID"}
                                            :
                                          </b>
                                          {row.original.emailID}
                                        </p>
                                        <p className="title">
                                          <b>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.b.crmrole
                                              : "CRM Role"}
                                            :
                                          </b>
                                          {row.original.roleName}
                                        </p>
                                        <p className="title">
                                          <b>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.b.barnd
                                              : "Brand"}
                                            :
                                          </b>
                                          {row.original.mappedBrand}
                                        </p>
                                        <p className="title">
                                          <b>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.b
                                                  .claimcategory
                                              : "Claim Category"}
                                            :
                                          </b>
                                          {row.original.categoryCount.length > 0
                                            ? row.original.categoryCount
                                            : row.original.mappedCategory}
                                        </p>
                                        <p className="title">
                                          <b>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.b
                                                  .claimsubcategory
                                              : "Claim Sub-Category"}
                                            :
                                          </b>
                                          {row.original.subCategoryCount
                                            .length > 0
                                            ? row.original.subCategoryCount
                                            : row.original.mappedSubCategory}
                                        </p>
                                        <p className="title">
                                          <b>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.b
                                                  .claimissuetype
                                              : "Claim Issue Type"}
                                            :
                                          </b>
                                          {row.original.issueTypeCount.length >
                                          0
                                            ? row.original.issueTypeCount
                                            : row.original.mappedIssuetype}
                                        </p>
                                        <p className="title">
                                          <b>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.b.createdby
                                              : "Created By"}
                                            :
                                          </b>
                                          {row.original.createdBy}
                                        </p>
                                        <p className="title">
                                          <b>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.b.createddate
                                              : "Created Date"}
                                            :
                                          </b>
                                          {row.original.createdDate}
                                        </p>
                                        <p className="title">
                                          <b>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.b.updatedby
                                              : "Updated By"}
                                            :
                                          </b>
                                          {row.original.updatedBy}
                                        </p>
                                        <p className="title">
                                          <b>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.b.updateddate
                                              : "Updated Date"}
                                            :
                                          </b>
                                          {row.original.updatedDate}
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
                        Header: (
                          <span
                            // className={this.state.userdesignationColor}
                            className={
                              this.state.sortHeader === "User Designation"
                                ? "sort-column"
                                : ""
                            }
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "designationName",
                              TranslationContext !== undefined
                                ? TranslationContext.span.userdesignation
                                : "User Designation"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.userdesignation
                              : "User Designation"}

                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ == false &&
                                this.state.sortHeader === "User Designation"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable: false,
                        accessor: "designationName",
                      },
                      {
                        Header: (
                          <span
                            // className={this.state.reporteeNameColor}
                            className={
                              this.state.sortHeader === "Reportee Name"
                                ? "sort-column"
                                : ""
                            }
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "reporteeName",
                              "Reportee Name"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.reporteename
                              : "Reportee Name"}

                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ == false &&
                                this.state.sortHeader === "Reportee Name"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        minWidth: 150,
                        sortable: false,
                        resizable: true,
                        accessor: "reporteeName",
                        Cell: (row) => {
                          var ids = row.original["userID"];
                          return (
                            <div>
                              <span className="store-one-liner one-liner">
                                {row.original.reporteeName}
                                <Popover
                                  content={
                                    <div>
                                      <div>
                                        <p className="title">
                                          <b>
                                            {TranslationContext !== undefined
                                              ? TranslationContext.b
                                                  .reporteedesignation
                                              : "Reportee Designation"}
                                            :
                                          </b>
                                          {row.original.reporteeDesignation}
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
                        Header: (
                          <span
                            // className={this.state.departmentColor}
                            className={
                              this.state.sortHeader === "Department"
                                ? "sort-column"
                                : ""
                            }
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "departmentName",
                              TranslationContext !== undefined
                                ? TranslationContext.span.department
                                : "Department"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.department
                              : "Department"}

                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ == false &&
                                this.state.sortHeader === "Department"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable: false,
                        accessor: "departmentName",
                      },
                      {
                        Header: (
                          <span
                            // className={this.state.functionColor}
                            className={
                              this.state.sortHeader === "Function"
                                ? "sort-column"
                                : ""
                            }
                            onClick={this.StatusOpenModel.bind(
                              this,
                              "mappedFunctions",
                              TranslationContext !== undefined
                                ? TranslationContext.span.function
                                : "Function"
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.span.function
                              : "Function"}

                            <FontAwesomeIcon
                              icon={
                                this.state.isATOZ == false &&
                                this.state.sortHeader === "Function"
                                  ? faCaretUp
                                  : faCaretDown
                              }
                            />
                          </span>
                        ),
                        sortable: false,
                        accessor: "mappedFunctions",
                      },
                      {
                        Header: (
                          <span>
                            {TranslationContext !== undefined
                              ? TranslationContext.span.actions
                              : "Actions"}
                          </span>
                        ),
                        accessor: "userID",
                        minWidth: 140,
                        sortable: false,
                        Cell: (row) => {
                          var ids = row.original["userID"];
                          return (
                            <>
                              <span className="settings-align-actions">
                                <Popover
                                  content={
                                    <div
                                      className="samdel d-flex general-popover popover-body"
                                      id={"samdel" + ids}
                                    >
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
                                            onClick={this.handleDeleteStoreUser.bind(
                                              this,
                                              row.original.userID
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
                                  />
                                </Popover>

                                <button
                                  className="react-tabel-button editre"
                                  onClick={this.handleGetUserListByID.bind(
                                    this,
                                    row.original.userID
                                  )}
                                  // onClick={() => this.opneUserEditModal()}
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
                    defaultPageSize={10}
                    minRows={2}
                    showPagination={true}
                    // resizable={false}
                    noDataText={
                      this.state.isloading ? (
                        <Spin size="large" tip="Loading..." />
                      ) : this.state.StoreUserData.length === 0 ? (
                        <Empty
                          style={{ margin: "0" }}
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                        />
                      ) : null
                    }
                  />
                </div>
              </div>
              <div className="col-md-4 cus-drp">
                <div className="right-sect-div right-sect-collapse">
                  <h3>
                    {TranslationContext !== undefined
                      ? TranslationContext.h3.createusers
                      : "Create Users"}
                  </h3>
                  <div className="collapse-cntr">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#personal-details"
                      role="button"
                      aria-expanded="true"
                      aria-controls="personal-details"
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.a.storedetails
                        : " Store Details"}
                    </a>
                    <div className="multi-collapse show" id="personal-details">
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.barnd
                            : "Brand"}
                        </label>
                        <select
                          className={
                            this.state.StoreReadOnly
                              ? "disabled-input store-create-select"
                              : "store-create-select"
                          }
                          disabled={this.state.StoreReadOnly}
                          name="brandName"
                          value={this.state.selectBrand}
                          onChange={this.handleBrandAndStoreChange}
                        >
                          <option>
                            {TranslationContext !== undefined
                              ? TranslationContext.option.select
                              : "Select"}
                          </option>
                          {this.state.brandData !== null &&
                            this.state.brandData.map((item, i) => (
                              <option
                                key={i}
                                value={item.brandID}
                                className="select-category-placeholder"
                              >
                                {item.brandName}
                              </option>
                            ))}
                        </select>
                        {this.state.selectBrand === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.brandCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.storecode
                            : "Store Code"}
                        </label>
                        <select
                          className={
                            this.state.StoreReadOnly
                              ? "disabled-input store-create-select"
                              : "store-create-select"
                          }
                          disabled={this.state.StoreReadOnly}
                          name="storeCode"
                          value={this.state.selectStore}
                          onChange={this.handleBrandAndStoreChange}
                        >
                          <option>
                            {TranslationContext !== undefined
                              ? TranslationContext.option.select
                              : "Select"}
                          </option>
                          {this.state.storeCodeData !== null &&
                            this.state.storeCodeData.map((item, s) => (
                              <option
                                key={s}
                                value={item.storeID}
                                className="select-category-placeholder"
                              >
                                {item.storeCode}
                              </option>
                            ))}
                        </select>
                        {this.state.selectStore === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.storeCodeCompulsory}
                          </p>
                        )}
                      </div>
                      {this.state.StoreReadOnly === true ? (
                        <div className="btn-coll">
                          <button
                            className="butn"
                            onClick={this.editStoreMethod.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.edit
                              : "Edit"}
                          </button>
                        </div>
                      ) : this.state.buttonStoreToggle === true ? (
                        <div className="btn-coll">
                          <button
                            data-target="#personal-details"
                            data-toggle="collapse"
                            className="butn"
                            onClick={this.handleUpdateStoreDetails.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.updateandnext
                              : "Update & Next"}
                          </button>
                        </div>
                      ) : (
                        <div className="btn-coll">
                          <button
                            className="butn"
                            onClick={this.handleSaveStoreDetails.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.saveandnext
                              : "SAVE & Next"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="collapse-cntr">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#personal-details"
                      role="button"
                      aria-expanded="false"
                      aria-controls="personal-details"
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.a.personaldetails
                        : "Personal Details"}
                    </a>
                    <div
                      className="collapse multi-collapse"
                      id="personal-details"
                    >
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.username
                            : "User Name"}
                        </label>
                        <input
                          type="text"
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.placeholder.enterusername
                              : "Enter User Name"
                          }
                          maxLength={25}
                          autoComplete="off"
                          readOnly={this.state.personalReadOnly}
                          className={
                            this.state.personalReadOnly ? "disabled-input" : ""
                          }
                          name="userName"
                          value={this.state.userName}
                          onChange={this.handleOnChangeUserData}
                        />
                        {this.state.userName.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.userNameCompulsory}
                          </p>
                        )}
                      </div>
                       <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.firstname
                            : "First Name"}
                        </label>
                        <input
                          type="text"
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.placeholder.enterfirstname
                              : "Enter First Name"
                          }
                          maxLength={25}
                          autoComplete="off"
                          readOnly={this.state.personalReadOnly}
                          className={
                            this.state.personalReadOnly ? "disabled-input" : ""
                          }
                          name="firstName"
                          value={this.state.firstName}
                          onChange={this.handleOnChangeUserData}
                        />
                        {this.state.firstName.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.firstNameCompulsory}
                          </p>
                        )}
                      </div>
                       <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.lastname
                            : "Last Name"}
                        </label>
                        <input
                          type="text"
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.placeholder.enterlastname
                              : "Enter Last Name"
                          }
                          maxLength={25}
                          autoComplete="off"
                          readOnly={this.state.personalReadOnly}
                          className={
                            this.state.personalReadOnly ? "disabled-input" : ""
                          }
                          name="lastName"
                          value={this.state.lastName}
                          onChange={this.handleOnChangeUserData}
                        />
                        
                      </div>
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.mobilenumber
                            : "Mobile Number"}
                        </label>
                        <input
                          type="text"
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.placeholder.entermobilenumber
                              : "Enter Mobile Number"
                          }
                          maxLength={12}
                          readOnly={this.state.personalReadOnly}
                          className={
                            this.state.personalReadOnly ? "disabled-input" : ""
                          }
                          name="mobile_no"
                          value={this.state.mobile_no}
                          onChange={this.hanldeMobileNoChange}
                          autoComplete="off"
                        />
                        {this.state.phoneFlag === false && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {TranslationContext !== undefined
                              ? TranslationContext.p
                                  .pleaseentervalidmobilenumber
                              : "Please enter valid Mobile Number"}
                            .
                          </p>
                        )}
                        {this.state.mobile_no.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.mobilenumberCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.p.emailid
                            : "Email ID"}
                        </label>
                        <input
                          type="text"
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.placeholder.enteremailid
                              : "Enter Email ID"
                          }
                          maxLength={100}
                          readOnly={this.state.personalReadOnly}
                          className={
                            this.state.personalReadOnly ? "disabled-input" : ""
                          }
                          name="email_Id"
                          value={this.state.email_Id}
                          onChange={this.handleOnChangeUserData}
                          autoComplete="off"
                        />
                        {this.state.emailFlag === false && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {TranslationContext !== undefined
                              ? TranslationContext.p.pleaseentervalidemailid
                              : "Please enter valid Email Id."}
                          </p>
                        )}
                        {this.state.email_Id.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.emailCompulsory}
                          </p>
                        )}
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.emailValidation}
                        </p>
                      </div>

                      {this.state.personalReadOnly === true ? (
                        <div className="btn-coll">
                          <button
                            className="butn"
                            onClick={this.editPersonalMethod.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.edit
                              : "Edit"}
                          </button>
                        </div>
                      ) : this.state.btnPersonalToggle === true ? (
                        <div className="btn-coll">
                          <button
                            data-target="#profile-Details"
                            data-toggle="collapse"
                            className="butn"
                            onClick={this.handleUpdatePersonalDetails.bind(
                              this
                            )}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.updateandnext
                              : "Update & Next"}
                          </button>
                        </div>
                      ) : (
                        <div className="btn-coll">
                          <button
                            className="butn"
                            onClick={this.handleSavePersonalDetails.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.saveandnext
                              : "Save & Next"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="collapse-cntr">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#profile-Details"
                      role="button"
                      aria-expanded="false"
                      aria-controls="profile-Details"
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.a.profiledetails
                        : "Profile Details"}
                    </a>
                    <div
                      className="collapse multi-collapse"
                      id="profile-Details"
                    >
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.department
                            : "Department"}
                        </label>
                        <select
                          className={
                            this.state.profileReadOnly
                              ? "disabled-input store-create-select"
                              : "store-create-select"
                          }
                          disabled={this.state.profileReadOnly}
                          name="selectDepartment"
                          value={this.state.selectDepartment}
                          onChange={this.handleDepartmentOnChange}
                        >
                          <option>
                            {TranslationContext !== undefined
                              ? TranslationContext.option.select
                              : "Select"}
                          </option>
                          {this.state.departmentData !== null &&
                            this.state.departmentData.map((item, d) => (
                              <option
                                key={d}
                                value={item.departmentID}
                                className="select-category-placeholder"
                              >
                                {item.departmentName}
                              </option>
                            ))}
                        </select>
                        {this.state.selectDepartment === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.departmentCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.function
                            : "Function"}
                        </label>
                        <Select
                          getOptionLabel={(option) => option.funcationName}
                          getOptionValue={(option) => option.functionID}
                          options={this.state.functionData}
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.placeholder.select
                              : "Select"
                          }
                          closeMenuOnSelect={false}
                          name="selectedFunction"
                          onChange={this.handleFunctionOnChange.bind(this)}
                          value={this.state.selectedFunction}
                          isMulti
                          isDisabled={this.state.profileReadOnly}
                        />
                        {this.state.selectedFunction.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.functionCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.userdesignation
                            : "User Designation"}
                        </label>
                        <select
                          className={
                            this.state.profileReadOnly
                              ? "disabled-input store-create-select"
                              : "store-create-select"
                          }
                          disabled={this.state.profileReadOnly}
                          name="selectDesignation"
                          value={this.state.selectDesignation}
                          onChange={this.handleDropDownOnChange}
                        >
                          <option>
                            {TranslationContext !== undefined
                              ? TranslationContext.option.select
                              : "Select"}
                          </option>
                          {this.state.userDesignationData !== null &&
                            this.state.userDesignationData.map((item, d) => (
                              <option
                                key={d}
                                value={item.designationID}
                                className="select-category-placeholder"
                              >
                                {item.designationName}
                              </option>
                            ))}
                        </select>
                        {this.state.selectDesignation === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.designationCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.reporteedesignation
                            : "Reportee Designation"}
                        </label>
                        <select
                          className={
                            this.state.profileReadOnly
                              ? "disabled-input store-create-select"
                              : "store-create-select"
                          }
                          disabled={this.state.profileReadOnly}
                          name="selectReportDesignation"
                          value={this.state.selectReportDesignation}
                          onChange={this.handleDropDownOnChange}
                        >
                          <option>
                            {TranslationContext !== undefined
                              ? TranslationContext.option.select
                              : "Select"}
                          </option>
                          {this.state.reportDesignation !== null &&
                            this.state.reportDesignation.map((item, d) => (
                              <option
                                key={d}
                                value={item.designationID}
                                className="select-category-placeholder"
                              >
                                {item.designationName}
                              </option>
                            ))}

                          {this.state.reportDesignation.length === 0 && (
                            // this.state.selectReportDesignation &&
                            <option value="-1">
                              {TranslationContext !== undefined
                                ? TranslationContext.option.root
                                : "Root"}
                            </option>
                          )}
                        </select>
                        {this.state.selectReportDesignation === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.reportDesignationCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.reportto
                            : "Report To"}
                        </label>
                        <select
                          className={
                            this.state.profileReadOnly
                              ? "disabled-input store-create-select"
                              : "store-create-select"
                          }
                          disabled={this.state.profileReadOnly}
                          name="selectReportTo"
                          value={this.state.selectReportTo}
                          onChange={this.handleDropDownOnChange}
                        >
                          <option>
                            {TranslationContext !== undefined
                              ? TranslationContext.option.select
                              : "Select"}
                          </option>
                          {this.state.reportToData !== null &&
                            this.state.reportToData.map((item, d) => (
                              <option
                                key={d}
                                value={item.user_ID}
                                className="select-category-placeholder"
                              >
                                {item.agentName}
                              </option>
                            ))}
                          {this.state.reportToData.length === 0 && (
                            // this.state.selectReportTo &&
                            <option value="-1">
                              {TranslationContext !== undefined
                                ? TranslationContext.option.root
                                : "Root"}
                            </option>
                          )}
                        </select>
                        {this.state.selectReportTo === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.reportToCompulsory}
                          </p>
                        )}
                      </div>
                      {this.state.profileReadOnly === true ? (
                        <div className="btn-coll">
                          <button
                            className="butn"
                            onClick={this.editProfileMethod.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.edit
                              : "Edit"}
                          </button>
                        </div>
                      ) : this.state.btnProfileToggle === true ? (
                        <div className="btn-coll">
                          <button
                            data-target="#mapped-category"
                            data-toggle="collapse"
                            className="butn"
                            onClick={this.handleUpdateProfileDetails.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.update
                              : "Update"}
                            &amp;
                            {TranslationContext !== undefined
                              ? TranslationContext.button.next
                              : "Next"}
                          </button>
                        </div>
                      ) : (
                        <div className="btn-coll">
                          <button
                            className="butn"
                            onClick={this.handleSaveProfileDetails.bind(this)}
                          >
                            {TranslationContext !== undefined
                              ? TranslationContext.button.saveandnext
                              : "SAVE & Next"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="collapse-cntr">
                    <a
                      className="collapse-title"
                      data-toggle="collapse"
                      href="#mapped-category"
                      role="button"
                      aria-expanded="false"
                      aria-controls="mapped-category"
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.a.mappedclaimcategory
                        : "Mapped Claim Category"}
                    </a>
                    <div
                      className="collapse multi-collapse"
                      id="mapped-category"
                    >
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.brand
                            : "Brand"}
                        </label>
                        <Select
                          getOptionLabel={(option) => option.brandName}
                          getOptionValue={(option) => option.brandID}
                          options={this.state.brandData}
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.placeholder.select
                              : "Select"
                          }
                          closeMenuOnSelect={false}
                          name="selectedClaimBrand"
                          onChange={this.handleMultiBrandonChange.bind(this)}
                          value={this.state.selectedClaimBrand}
                          isMulti
                        />
                        {this.state.selectedClaimBrand.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.mappedBrandCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.categories
                            : "Categories"}
                        </label>
                        <Select
                          getOptionLabel={(option) => option.categoryName}
                          getOptionValue={(option) => option.categoryID}
                          options={this.state.claimCategoryData}
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.placeholder.select
                              : "Select"
                          }
                          closeMenuOnSelect={false}
                          name="selectedClaimCategory"
                          onChange={this.handleMultiCategoryonChange.bind(this)}
                          value={this.state.selectedClaimCategory}
                          isMulti
                        />
                        {this.state.selectedClaimCategory.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.mappedCategoryCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.subcategories
                            : "Sub Categories"}
                        </label>
                        <Select
                          getOptionLabel={(option) => option.subCategoryName}
                          getOptionValue={(option) => option.subCategoryID}
                          options={this.state.claimSubCategoryData}
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.placeholder.select
                              : "Select"
                          }
                          closeMenuOnSelect={false}
                          name="selectedClaimSubCategory"
                          onChange={this.handleMultiSubCategoryonChange.bind(
                            this
                          )}
                          value={this.state.selectedClaimSubCategory}
                          isMulti
                        />
                        {this.state.selectedClaimSubCategory.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.mappedSubCategoryCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.issuetype
                            : "Issue Type"}
                        </label>
                        <Select
                          getOptionLabel={(option) => option.issueTypeName}
                          getOptionValue={(option) => option.issueTypeID}
                          options={this.state.claimIssueTypeData}
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.placeholder.select
                              : "Select"
                          }
                          closeMenuOnSelect={false}
                          name="selectedClaimIssueType"
                          onChange={this.handleMultiIssueTypeonChange.bind(
                            this
                          )}
                          value={this.state.selectedClaimIssueType}
                          isMulti
                        />
                        {this.state.selectedClaimIssueType.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.mappedIssueTypeCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="div-cntr">
                        <label>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.claimapprover
                            : "Claim Approver"}
                        </label>
                        <select
                          name="selectClaimApprover"
                          value={this.state.selectClaimApprover}
                          onChange={this.handleDropDownOnChange}
                          className="store-create-select"
                        >
                          <option>
                            {TranslationContext !== undefined
                              ? TranslationContext.option.select
                              : "Select"}
                          </option>
                          <option value={"yes"}>
                            {TranslationContext !== undefined
                              ? TranslationContext.option.yes
                              : "Yes"}
                          </option>
                          <option value={"no"}>
                            {TranslationContext !== undefined
                              ? TranslationContext.option.no
                              : "No"}
                          </option>
                        </select>
                        {this.state.selectClaimApprover.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.ClaimApproverCompulsory}
                          </p>
                        )}
                      </div>
                      <div className="mapped-cate-extra">
                        <div className="div-cntr">
                          <label>
                            {TranslationContext !== undefined
                              ? TranslationContext.label.crmrole
                              : "CRM Role"}
                          </label>
                          <select
                            className="store-create-select"
                            name="selectCrmRole"
                            value={this.state.selectCrmRole}
                            onChange={this.handleDropDownOnChange}
                          >
                            <option>
                              {TranslationContext !== undefined
                                ? TranslationContext.option.select
                                : "Select"}
                            </option>
                            {this.state.CrmRoleData !== null &&
                              this.state.CrmRoleData.map((item, d) => (
                                <option
                                  key={d}
                                  value={item.crmRoleID}
                                  className="select-category-placeholder"
                                >
                                  {item.roleName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectCrmRole === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.CrmRoleCompulsory}
                            </p>
                          )}
                        </div>
                        <div className="div-cntr">
                          <label>
                            {TranslationContext !== undefined
                              ? TranslationContext.label.status
                              : "Status"}
                          </label>
                          <select
                            name="selectStatus"
                            value={this.state.selectStatus}
                            onChange={this.handleDropDownOnChange}
                            className="store-create-select"
                          >
                            <option>
                              {TranslationContext !== undefined
                                ? TranslationContext.option.select
                                : "Select"}
                            </option>
                            {this.state.activeData !== null &&
                              this.state.activeData.map((item, j) => (
                                <option key={j} value={item.ActiveID}>
                                  {item.ActiveName}
                                </option>
                              ))}
                          </select>
                          {this.state.selectStatus === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.statusCompulsory}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="btn-coll">
                        <button
                          className="butn"
                          type="button"
                          onClick={this.handleFinalSaveUserData.bind(this)}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.button.add
                            : "ADD"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-sect-div">
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
                        filename={"User.csv"}
                        data={config.storeUserTemplate}
                      >
                        <img src={DownExcel} alt="download icon" />
                      </CSVLink>
                    </div>
                  </div>
                  <Spin
                    tip="Please wait..."
                    spinning={this.state.bulkuploadLoading}
                  >
                    <div className="mainfileUpload">
                      <Dropzone accept=".csv" onDrop={this.fileUpload}>
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
                            </span>
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
                    {this.state.fileValidation ? (
                      <p style={{ color: "red", marginBottom: "0px" }}>
                        {this.state.fileValidation}
                      </p>
                    ) : null}
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
                                      {TranslationContext !== undefined
                                        ? TranslationContext.a.cancel
                                        : "CANCEL"}
                                    </a>
                                    <button
                                      className="butn"
                                      onClick={this.DeleteBulkUploadFile}
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
                        {this.state.isErrorBulkUpload ? (
                          <div className="file-cntr">
                            <div className="file-dtls">
                              <p className="file-name">{this.state.fileName}</p>
                              <span
                                className="file-retry"
                                onClick={this.handleBulkUpload.bind(this)}
                              >
                                {TranslationContext !== undefined
                                  ? TranslationContext.span.retry
                                  : "Retry"}
                              </span>
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
                        {this.state.isShowProgress ? (
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
                                  now={60}
                                />
                                <div className="cancel-upload">
                                  <img src={UploadCancel} alt="upload cancel" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    )}
                    <button
                      className="butn"
                      onClick={this.handleBulkUpload.bind(this)}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.button.add
                        : "ADD"}
                    </button>
                  </Spin>
                </div>
              </div>
            </div>
            <Modal
              open={this.state.UserEditmodel}
              onClose={this.closeEditModals.bind(this)}
              modalId="UsEdit-popup"
            >
              <div>
                <Tabs
                  onSelect={(index, label) => this.setState({ selTab: label })}
                  selected={this.state.selTab}
                >
                  <Tab
                    label={
                      TranslationContext !== undefined
                        ? TranslationContext.label.storedetails
                        : "Store Details"
                    }
                  >
                    <div>
                      <h4 style={{ textAlign: "center" }}>
                        {TranslationContext !== undefined
                          ? TranslationContext.h4.storedetails
                          : "Store Details"}
                      </h4>
                      <div className="right-sect-div right-sect-div-edit">
                        <div className="div-cntr">
                          <label className="edit-label-1">
                            {TranslationContext !== undefined
                              ? TranslationContext.label.brand
                              : "Brand"}
                          </label>
                          <select
                            className="store-create-select"
                            name="brandID"
                            value={this.state.userEdit.brandID}
                            onChange={this.handleEditOnchange}
                          >
                            <option value="0">
                              {TranslationContext !== undefined
                                ? TranslationContext.option.select
                                : "Select"}
                            </option>
                            {this.state.brandData !== null &&
                              this.state.brandData.map((item, i) => (
                                <option
                                  key={i}
                                  value={item.brandID}
                                  className="select-category-placeholder"
                                >
                                  {item.brandName}
                                </option>
                              ))}
                          </select>
                          {this.state.userEdit.brandID == 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.EditBrandCompulsory}
                            </p>
                          )}
                        </div>
                        <div className="div-cntr">
                          <label className="edit-label-1">
                            {TranslationContext !== undefined
                              ? TranslationContext.label.storecode
                              : "Store Code"}
                          </label>
                          <select
                            className="store-create-select"
                            name="storeID"
                            value={this.state.userEdit.storeID}
                            onChange={this.handleEditOnchange}
                          >
                            <option value="0">
                              {TranslationContext !== undefined
                                ? TranslationContext.option.select
                                : "Select"}
                            </option>
                            {this.state.editStoreCodeData !== null &&
                              this.state.editStoreCodeData.map((item, s) => (
                                <option
                                  key={s}
                                  value={item.storeID}
                                  className="select-category-placeholder"
                                >
                                  {item.storeCode}
                                </option>
                              ))}
                          </select>
                          {this.state.userEdit.storeID == 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.EditstoreCodeCompulsory}
                            </p>
                          )}
                        </div>
                      </div>

                      <div
                        style={{
                          textAlign: "center",
                          margin: "20px 0px 0px 0px",
                        }}
                      >
                        <a
                          className="pop-over-cancle canblue"
                          onClick={this.closeEditModals.bind(this)}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.a.cancel
                            : "CANCEL"}
                        </a>
                        <button
                          className="Save-Use"
                          onClick={this.HandlecheckStoreDetails.bind(this)}
                          style={{ marginLeft: "30px" }}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.button.next
                            : "NEXT"}
                        </button>
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    label={
                      TranslationContext !== undefined
                        ? TranslationContext.label.personaldetails
                        : "Personal Details"
                    }
                  >
                    <div>
                      <h4 style={{ textAlign: "center" }}>
                        {TranslationContext !== undefined
                          ? TranslationContext.h4.personaldetails
                          : "Personal Details"}
                      </h4>
                      <div className="right-sect-div right-sect-div-edit">
                        <div className="div-cntr">
                          <label className="edit-label-1">
                            {TranslationContext !== undefined
                              ? TranslationContext.label.username
                              : "User Name"}
                          </label>
                          <input
                            type="text"
                            placeholder={
                              TranslationContext !== undefined
                                ? TranslationContext.placeholder.enterusername
                                : "Enter User Name"
                            }
                            maxLength={25}
                            autoComplete="off"
                            name="userName"
                            value={this.state.userEdit.userName}
                            onChange={this.handleEditOnchange}
                          />
                          {this.state.userEdit.userName === "" && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.editUserNameCompulsory}
                            </p>
                          )}
                        </div>
                        <div className="div-cntr">
                          <label className="edit-label-1">
                            {TranslationContext !== undefined
                              ? TranslationContext.label.firstname
                              : "First Name"}
                          </label>
                          <input
                            type="text"
                            placeholder={
                              TranslationContext !== undefined
                                ? TranslationContext.placeholder.enterusername
                                : "Enter First Name"
                            }
                            maxLength={25}
                            autoComplete="off"
                            name="firstName"
                            value={this.state.userEdit.firstName}
                            onChange={this.handleEditOnchange}
                          />
                          {this.state.userEdit.firstName === "" && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.editFirstNameCompulsory}
                            </p>
                          )}
                        </div>
                        <div className="div-cntr">
                          <label className="edit-label-1">
                            {TranslationContext !== undefined
                              ? TranslationContext.label.lastname
                              : "Last Name"}
                          </label>
                          <input
                            type="text"
                            placeholder={
                              TranslationContext !== undefined
                                ? TranslationContext.placeholder.enterlastname
                                : "Enter Last Name"
                            }
                            maxLength={25}
                            autoComplete="off"
                            name="lastName"
                            value={this.state.userEdit.lastName}
                            onChange={this.handleEditOnchange}
                          />
                          
                        </div>
                        <div className="div-cntr">
                          <label className="edit-label-1">
                            {TranslationContext !== undefined
                              ? TranslationContext.label.mobilenumber
                              : "Mobile Number"}
                          </label>
                          <input
                            type="text"
                            placeholder="Enter Mobile Number"
                            maxLength={12}
                            name="mobileNo"
                            value={this.state.userEdit.mobileNo}
                            onChange={this.handleEditOnchange}
                            autoComplete="off"
                          />
                          {this.state.EditphoneFlag === false && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {TranslationContext !== undefined
                                ? TranslationContext.p
                                    .pleaseentervalidmobilenumber
                                : "Please enter valid Mobile Number"}
                              .
                            </p>
                          )}
                          {this.state.userEdit.mobileNo === "" && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.editMobilenumberCompulsory}
                            </p>
                          )}
                        </div>
                        <div className="div-cntr">
                          <label className="edit-label-1">
                            {TranslationContext !== undefined
                              ? TranslationContext.label.emailid
                              : "Email ID"}
                          </label>
                          <input
                            type="text"
                            placeholder={
                              TranslationContext !== undefined
                                ? TranslationContext.placeholder.enteremailid
                                : "Enter Email ID"
                            }
                            maxLength={100}
                            name="emailID"
                            value={this.state.userEdit.emailID}
                            onChange={this.handleEditOnchange}
                            autoComplete="off"
                          />
                          {this.state.EditemailFlag === false && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {TranslationContext !== undefined
                                ? TranslationContext.p.pleaseentervalidemailid
                                : "Please enter valid Email Id"}
                              .
                            </p>
                          )}
                          {this.state.userEdit.emailID === "" && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.EditEmailCompulsory}
                            </p>
                          )}
                        </div>
                      </div>

                      <div
                        style={{
                          textAlign: "center",
                          margin: "20px 0px 0px 0px",
                        }}
                      >
                        <a
                          className="pop-over-cancle canblue"
                          onClick={this.closeEditModals.bind(this)}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.a.cancel
                            : "CANCEL"}
                        </a>
                        <button
                          className="Save-Use"
                          onClick={this.handleCheckPersonalDetails.bind(this)}
                          style={{ marginLeft: "30px" }}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.button.next
                            : "NEXT"}
                        </button>
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    label={
                      TranslationContext !== undefined
                        ? TranslationContext.label.profiledetails
                        : "Profile Details"
                    }
                  >
                    <div>
                      <h4 style={{ textAlign: "center" }}>
                        {TranslationContext !== undefined
                          ? TranslationContext.h4.profiledetails
                          : "Profile Details"}
                      </h4>
                      <div className="right-sect-div right-sect-div-edit">
                        <div className="div-cntr">
                          <label className="edit-label-1">
                            {TranslationContext !== undefined
                              ? TranslationContext.label.department
                              : "Department"}
                          </label>
                          <select
                            className="store-create-select"
                            name="departmentID"
                            value={this.state.userEdit.departmentID}
                            onChange={this.handleEditDepartmentOnchange.bind(
                              this,
                              "edit"
                            )}
                          >
                            <option value="0">
                              {TranslationContext !== undefined
                                ? TranslationContext.option.select
                                : "Select"}
                            </option>
                            {this.state.departmentData !== null &&
                              this.state.departmentData.map((item, d) => (
                                <option
                                  key={d}
                                  value={item.departmentID}
                                  className="select-category-placeholder"
                                >
                                  {item.departmentName}
                                </option>
                              ))}
                          </select>
                          {this.state.userEdit.departmentID == 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.EditDepartmentCompulsory}
                            </p>
                          )}
                        </div>
                        <div className="div-cntr cus-drp">
                          <label className="edit-label-1">Function</label>
                          <Select
                            getOptionLabel={(option) => option.funcationName}
                            getOptionValue={(option) => option.functionID}
                            options={this.state.functionData}
                            placeholder={
                              TranslationContext !== undefined
                                ? TranslationContext.placeholder.select
                                : "Select"
                            }
                            closeMenuOnSelect={false}
                            name="editFuncation"
                            onChange={this.handleEditFunctionOnChange.bind(
                              this
                            )}
                            value={this.state.editFuncation}
                            isMulti
                          />
                          {this.state.editFuncation.length === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.editFunctionCompulsion}
                            </p>
                          )}
                        </div>
                        <div className="div-cntr">
                          <label className="edit-label-1">
                            {TranslationContext !== undefined
                              ? TranslationContext.label.userdesignation
                              : "User Designation"}
                          </label>
                          <select
                            className="store-create-select"
                            name="designationID"
                            value={this.state.userEdit.designationID}
                            onChange={this.handleEditUserDesignationChange.bind(
                              this,
                              "edit"
                            )}
                          >
                            <option value="0">
                              {TranslationContext !== undefined
                                ? TranslationContext.option.select
                                : "Select"}
                            </option>
                            {this.state.userDesignationData !== null &&
                              this.state.userDesignationData.map((item, d) => (
                                <option
                                  key={d}
                                  value={item.designationID}
                                  className="select-category-placeholder"
                                >
                                  {item.designationName}
                                </option>
                              ))}
                          </select>
                          {this.state.userEdit.designationID == 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.EditDesignationCompulsory}
                            </p>
                          )}
                        </div>
                        <div className="div-cntr">
                          <label className="edit-label-1">
                            {TranslationContext !== undefined
                              ? TranslationContext.label.reporteedesignation
                              : "Reportee Designation"}
                          </label>
                          <select
                            className="store-create-select"
                            name="reporteeDesignationID"
                            value={this.state.userEdit.reporteeDesignationID}
                            onChange={this.handleEditReporteeDesigOnChange.bind(
                              this,
                              "edit"
                            )}
                          >
                            <option value="0">
                              {TranslationContext !== undefined
                                ? TranslationContext.option.select
                                : "Select"}
                            </option>
                            {this.state.reportDesignation !== null &&
                              this.state.reportDesignation.map((item, d) => (
                                <option
                                  key={d}
                                  value={item.designationID}
                                  className="select-category-placeholder"
                                >
                                  {item.designationName}
                                </option>
                              ))}
                            {this.state.reportDesignation.length === 0 && (
                              // this.state.selectedDesignation &&
                              <option value="-1">
                                {TranslationContext !== undefined
                                  ? TranslationContext.option.root
                                  : "Root"}
                              </option>
                            )}
                          </select>
                          {this.state.userEdit.reporteeDesignationID == 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.EditReporteeDesignationCompulsory}
                            </p>
                          )}
                        </div>
                        <div className="div-cntr">
                          <label className="edit-label-1">
                            {TranslationContext !== undefined
                              ? TranslationContext.label.reportto
                              : "Report To"}
                          </label>
                          <select
                            className="store-create-select"
                            name="reporteeID"
                            value={this.state.userEdit.reporteeID}
                            onChange={this.handleEditReportOnchange}
                          >
                            <option value="0">
                              {TranslationContext !== undefined
                                ? TranslationContext.option.select
                                : "Select"}
                            </option>
                            {this.state.reportToData !== null &&
                              this.state.reportToData.map((item, d) => (
                                <option
                                  key={d}
                                  value={item.user_ID}
                                  className="select-category-placeholder"
                                >
                                  {item.agentName}
                                </option>
                              ))}
                            {this.state.reportToData.length === 0 && (
                              // this.state.selectedDesignation &&
                              <option value="-1">
                                {TranslationContext !== undefined
                                  ? TranslationContext.option.root
                                  : "Root"}
                              </option>
                            )}
                          </select>
                          {this.state.userEdit.reporteeID == 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.EditReportDesignationCompulsory}
                            </p>
                          )}
                        </div>
                      </div>

                      <div
                        style={{
                          textAlign: "center",
                          margin: "20px 0px 0px 0px",
                        }}
                      >
                        <a
                          className="pop-over-cancle canblue"
                          onClick={this.closeEditModals.bind(this)}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.a.cancel
                            : "CANCEL"}
                        </a>
                        <button
                          className="Save-Use"
                          onClick={this.handleChangeProfileTab.bind(this)}
                          style={{ marginLeft: "30px" }}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.button.next
                            : "NEXT"}
                        </button>
                      </div>
                    </div>
                  </Tab>
                  <Tab
                    label={
                      TranslationContext !== undefined
                        ? TranslationContext.label.mappedclaimcategory
                        : "Mapped Claim Category"
                    }
                  >
                    <div>
                      <h4 style={{ textAlign: "center" }}>
                        {TranslationContext !== undefined
                          ? TranslationContext.h4.mappedcliamcategory
                          : " Mapped Claim Category"}
                      </h4>
                      <div className="right-sect-div right-sect-div-edit">
                        <div className="div-cntr cus-drp">
                          <label className="edit-label-1">
                            {TranslationContext !== undefined
                              ? TranslationContext.label.brand
                              : "Brand"}
                          </label>
                          <Select
                            getOptionLabel={(option) => option.brandName}
                            getOptionValue={(option) => option.brandID}
                            options={this.state.brandData}
                            placeholder={
                              TranslationContext !== undefined
                                ? TranslationContext.placeholder.select
                                : "Select"
                            }
                            closeMenuOnSelect={false}
                            name="editBrand"
                            onChange={this.handleMultiEditBrandonChange.bind(
                              this
                            )}
                            value={this.state.editBrand}
                            isMulti
                          />

                          {this.state.editBrand.length === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.EditmappedBrandCompulsory}
                            </p>
                          )}
                        </div>
                        <div className="div-cntr cus-drp">
                          <label className="edit-label-1">
                            {TranslationContext !== undefined
                              ? TranslationContext.label.categories
                              : "Categories"}
                          </label>
                          <Select
                            getOptionLabel={(option) => option.categoryName}
                            getOptionValue={(option) => option.categoryID}
                            options={this.state.claimCategoryData}
                            placeholder={
                              TranslationContext !== undefined
                                ? TranslationContext.placeholder.select
                                : "Select"
                            }
                            closeMenuOnSelect={false}
                            name="editCategory"
                            value={this.state.editCategory}
                            onChange={this.handleMultiEditCategoryonChange.bind(
                              this
                            )}
                            isMulti
                          />
                          {this.state.editCategory.length === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.EditmappedCategoryCompulsory}
                            </p>
                          )}
                        </div>
                        <div className="div-cntr cus-drp">
                          <label className="edit-label-1">
                            {TranslationContext !== undefined
                              ? TranslationContext.label.subcategories
                              : "Sub Categories"}
                          </label>
                          <Select
                            getOptionLabel={(option) => option.subCategoryName}
                            getOptionValue={(option) => option.subCategoryID}
                            options={this.state.claimSubCategoryData}
                            placeholder={
                              TranslationContext !== undefined
                                ? TranslationContext.placeholder.select
                                : "Select"
                            }
                            closeMenuOnSelect={false}
                            name="editsubcategory"
                            onChange={this.handleMultiEditSubCategoryonChange.bind(
                              this
                            )}
                            value={this.state.editSubCategory}
                            isMulti
                          />
                          {this.state.editSubCategory.length === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.EditmappedSubCategoryCompulsory}
                            </p>
                          )}
                        </div>
                        <div className="div-cntr cus-drp">
                          <label className="edit-label-1">
                            {TranslationContext !== undefined
                              ? TranslationContext.label.issuetype
                              : "Issue Type"}
                          </label>
                          <Select
                            getOptionLabel={(option) => option.issueTypeName}
                            getOptionValue={(option) => option.issueTypeID}
                            options={this.state.claimIssueTypeData}
                            placeholder={
                              TranslationContext !== undefined
                                ? TranslationContext.placeholder.select
                                : "Select"
                            }
                            closeMenuOnSelect={false}
                            name="editissuetype"
                            onChange={this.handleMultiEditIssueTypeonChange.bind(
                              this
                            )}
                            value={this.state.editIssueType}
                            isMulti
                          />
                          {this.state.editIssueType.length === 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.EditmappedIssueTypeCompulsory}
                            </p>
                          )}
                        </div>
                        <div className="div-cntr">
                          <label className="edit-label-1">
                            {TranslationContext !== undefined
                              ? TranslationContext.label.claimapprover
                              : "Claim Approver"}
                          </label>
                          <select
                            value={this.state.userEdit.isClaimApprover}
                            name="isClaimApprover"
                            onChange={this.handleChagenMapping.bind(this)}
                          >
                            <option value={0}>
                              {TranslationContext !== undefined
                                ? TranslationContext.option.select
                                : "Select"}
                            </option>
                            <option value={true}>
                              {TranslationContext !== undefined
                                ? TranslationContext.option.yes
                                : "Yes"}
                            </option>
                            <option value={false}>
                              {TranslationContext !== undefined
                                ? TranslationContext.option.no
                                : "No"}
                            </option>
                          </select>
                          {this.state.userEdit.isClaimApprover == 0 && (
                            <p style={{ color: "red", marginBottom: "0px" }}>
                              {this.state.EditmappedisClaimApprover}
                            </p>
                          )}
                        </div>
                        <div className="mapped-cate-extra">
                          <div className="div-cntr">
                            <label className="edit-label-1">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.crmrole
                                : "CRM Role"}
                            </label>
                            <select
                              value={this.state.userEdit.roleID}
                              name="roleID"
                              onChange={this.handleChagenMapping.bind(this)}
                            >
                              <option value={0}>
                                {TranslationContext !== undefined
                                  ? TranslationContext.option.select
                                  : "Select"}
                              </option>
                              {this.state.CrmRoleData !== null &&
                                this.state.CrmRoleData.map((item, d) => (
                                  <option
                                    key={d}
                                    value={item.crmRoleID}
                                    className="select-category-placeholder"
                                  >
                                    {item.roleName}
                                  </option>
                                ))}
                            </select>
                            {this.state.userEdit.roleID == 0 && (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.EditmappedcrmRoleID}
                              </p>
                            )}
                          </div>
                          <div className="div-cntr">
                            <label className="edit-label-1">
                              {TranslationContext !== undefined
                                ? TranslationContext.label.status
                                : "Status"}
                            </label>
                            <select
                              value={this.state.userEdit.isActive}
                              name="isActive"
                              onChange={this.handleChagenMapping.bind(this)}
                            >
                              <option value={0}>
                                {TranslationContext !== undefined
                                  ? TranslationContext.option.select
                                  : "Select"}
                              </option>
                              {this.state.activeData !== null &&
                                this.state.activeData.map((item, j) => (
                                  <option key={j} value={item.ActiveID}>
                                    {item.ActiveName}
                                  </option>
                                ))}
                            </select>
                            {this.state.userEdit.isActive == 0 && (
                              <p style={{ color: "red", marginBottom: "0px" }}>
                                {this.state.EditmappedisActive}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          textAlign: "center",
                          margin: "20px 0px 0px 0px",
                        }}
                      >
                        <a
                          className="pop-over-cancle canblue"
                          onClick={this.closeEditModals.bind(this)}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.a.cancel
                            : "CANCEL"}
                        </a>
                        <button
                          className="Save-Use"
                          onClick={this.handleUpdateUser.bind(this)}
                          style={{ marginLeft: "30px" }}
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.button.save
                            : "SAVE"}
                        </button>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </Modal>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StoreUsers;
