import React, { Component } from "react";
import ArrowImg from "./../../assets/Images/arrow.png";
import SearchBlackImg from "./../../assets/Images/searchBlack.png";
import NotFoundImg from "./../../assets/Images/notFound.png";
import Modal from "react-responsive-modal";
import MinusImg from "./../../assets/Images/minus.png";
import DatePicker from "react-datepicker";
import axios from "axios";
import config from "./../../helpers/config";
import ReactAutocomplete from "react-autocomplete";
import { NotificationManager } from "react-notifications";
import { authHeader } from "../../helpers/authHeader";
import SimpleReactValidator from "simple-react-validator";
import { Table } from "antd";
// import moment from "moment";
import * as translationHI from "../../translations/hindi";
import * as translationMA from "../../translations/marathi";
import moment from "moment";
import edit from "./../../assets/Images/edit.png";
import circleCancel from "./../../assets/Images/Circle-cancel.png";
import blueCancel from "./../../assets/Images/CancelBlue.png";
// import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";

class TicketSystemOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      SearchOrderDetails: false,
      AddManualOrderHideShow: false,
      OrderTable: false,
      AddManuallyData: this.props.AddManuallyData,
      AddManualSaveTbl: false,
      OrderCreatDate: "",
      orderId: "",
      billId: "",
      productBarCode: "",
      orderMRP: "",
      pricePaid: "",
      discount: "",
      orderNumber: "",
      message: this.props.message,
      size: "",
      requiredSize: "",
      selectedTicketSource: 0,
      custAttachOrder: 0,
      SwitchBtnStatus: false,
      OrdItmBtnStatus: false,
      purchaseFrmStorAddress: "",
      TicketSourceData: [],
      modeOfPayment: [],
      SearchItem: [],
      orderDetailsData: [],
      OrderSubItem: [],
      OrderSubComponent: [],
      selectedDataRow: [],
      CheckOrderID: {},
      StorAddress: {},
      purchaseFrmStorName: {},
      customerdetails: {},
      modeData: this.props.AddManuallyData ? this.props.modeData : {},
      orderMasterID: false,
      filterAll: "",
      filtered: [],
      orderItem: false,
      purchaseFrmStorID: 0,
      // validOrdernumber: "",
      validMdlOrdernumber: "",
      expanded: {},
      expandedOrderPopup: {},
      validPurchaseStoreName: "",
      ModalorderNumber: "",
      ChannelOfPurchaseData: [],
      idSizeArray: [],
      CheckBoxAllOrder: {},
      CheckBoxAllItem: {},
      SelectedAllOrder: [],
      SelectedAllItem: [],
      saveLoader: false,
      selectedInvoiceNo: "",
      translateLanguage: {},
      addedOrders: [],
      channelOfPurchaseName: "",
      editAddedOrderModal: false,
      editOrderModalData: {},
      orderIndex: 0,
      uploadedImageModal: false,
      channelOfPurchaseID: 0,
      modeOfPaymentName: "",
      orderUpload: [],
      subOrderId: "",
      batchNo: "",
      productName: "",
      categoryName: "",
      manufacturingDate: "",
      expiryBestBeforeDate: "",
      orderErrors: {},
      editOrderErrors: {},
      orderImagesName: [],
      isUnknown: false,
      allOrderConfigNull: true
    };
    this.validator = new SimpleReactValidator();
    this.onFilteredChange = this.onFilteredChange.bind(this);
    this.filterAll = this.filterAll.bind(this);
    this.handleOrderTableClose = this.handleOrderTableClose.bind(this);
    this.handleGetTicketSourceList = this.handleGetTicketSourceList.bind(this);
    this.handleModeOfPaymentDropDown = this.handleModeOfPaymentDropDown.bind(
      this
    );
    this.handleGetManuallyTableData = this.handleGetManuallyTableData.bind(
      this
    );
    this.handleGetChannelOfPurchaseList = this.handleGetChannelOfPurchaseList.bind(
      this
    );
    this.handleGetOrderData = this.handleGetOrderData.bind(this);
  }

  componentDidMount() {
    console.log(this.props.searchHide, "searchHide");
    this.handleModeOfPaymentDropDown();
    this.handleGetTicketSourceList();
    this.handleGetChannelOfPurchaseList();
    if (this.props.searchHide) {
      
      this.setState({
        AddManuallyData: this.props.AddManuallyData,
        orderNumber: this.props.order_number
      }, () => { this.handleOrderSearchData("6") })
    }
    else {
      if (this.props.AddManuallyData === false) {
        this.handleOrderSearchData("3");
      }
    }
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
    // this.handleOrderSearchData();
  }
  componentDidUpdate() {
    var OderData = this.props.ShowOderdData;
    if (OderData === true) {
      var ticketIDS = this.props.ticket_IDS;
      if (ticketIDS) {
        this.handleGetOrderData(ticketIDS);
      }
    }

    var modeId = this.props.purchaseMode;
    var value = parseInt(modeId);
    if (value !== this.state.selectedTicketSource) {
      this.setState({
        selectedTicketSource: value,
      });
    }
  }

  ////hanlde Get Order Data
  handleGetOrderData(ticketIDS) {
    this.props.parentCallBackFuncation("order");
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Order/getOrderDetailByTicketID",
      headers: authHeader(),
      params: {
        TicketID: ticketIDS,
      },
    })
      .then(function (res) {
        let Msg = res.data.message;
        let data = res.data.responseData;
        if (Msg === "Success") {
          // self.props.ShowOderdData = false;

          const newSelected = Object.assign({}, self.state.CheckOrderID);
          var OrderSubItem = [];
          var selectedRow = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].orderMasterID) {
              newSelected[data[i].orderMasterID] = !self.state.CheckOrderID[
                data[i].orderMasterID
              ];
              selectedRow.push(data[i]);
              self.setState({
                CheckOrderID: data[i].orderMasterID ? newSelected : false,
              });
            }
            if (data[i].orderItems.length > 0) {
              for (let j = 0; j < data[i].orderItems.length; j++) {
                OrderSubItem.push(data[i].orderItems[j]);
              }
            }
          }
          self.setState({
            orderDetailsData: selectedRow,
            OrderSubItem,
            message: "Success",
          });
        } else {
          self.setState({
            orderDetailsData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }
  handleRequireSize(e, rowData) {
    const TranslationContext = this.state.translateLanguage.default;
    var id = rowData.articleNumber;
    var value = document.getElementById("requireSizeTxt" + id).value;
    var reg = /^[0-9\b]+$/;
    if (value === "" || reg.test(value)) {
      var index = this.state.OrderSubItem.findIndex(
        (x) => x.articleNumber === rowData.articleNumber
      );

      var OrderSubItem = this.state.OrderSubItem;
      OrderSubItem[index].requireSize = value;

      this.setState({ OrderSubItem });
    } else {
      NotificationManager.error(
        TranslationContext !== undefined
          ? TranslationContext.ticketingDashboard.onlynumericvalueallow
          : "Only numeric value allow."
      );
    }
  }

  handleGetChannelOfPurchaseList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/GetChannelOfPurchaseList",
      headers: authHeader(),
    })
      .then(function (res) {
        let data = res.data.responseData;
        self.setState({ ChannelOfPurchaseData: data });
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleOrderTableOpen() {
    this.setState({ OrderTable: true });
  }
  handleOrderTableClose() {
    this.setState({ OrderTable: false });
  }
  handleByDateCreate = (date, name) => {
    if (name === "expiryBestBeforeDate") {
      this.setState({ expiryBestBeforeDate: date });
    }
    if (name === "manufacturingDate") {
      this.setState({ manufacturingDate: date });
    }
    if (name === "orderCreatedDate") {
      this.setState({ OrderCreatDate: date });
    }
  };
  handleEditByDateCreate = (date, name) => {
    if (name === "expiryBestBeforeDate") {
      this.setState({
        editOrderModalData: {
          ...this.state.editOrderModalData,
          expiryBestBeforeDate: date,
        },
      });
    }

    if (name === "manufacturingDate") {
      this.setState({
        editOrderModalData: {
          ...this.state.editOrderModalData,
          manufacturingDate: date,
        },
      });
    }

    if (name === "orderCreatedDate") {
      this.setState({
        editOrderModalData: {
          ...this.state.editOrderModalData,
          orderCreatedDate: date,
        },
      });
    }
  };

  handleShowSearchOrderDetails() {
    this.setState({
      SearchOrderDetails: !this.state.SearchOrederDetails,
    });
  }
  handleOrderChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  setModePaymentValue = (e) => {
    let dataValue = e.currentTarget.value;

    let modeOfPaymentName = this.state.modeData.filter((mode) => {
      return mode.paymentModeID === parseInt(dataValue);
    })[0].paymentModename;

    this.setState({
      modeOfPayment: dataValue,
      modeOfPaymentName,
    });
  };
  setEditModePaymentValue = (e) => {
    let dataValue = e.currentTarget.value;
    let modeOfPaymentName = this.state.modeData.filter((mode) => {
      return mode.paymentModeID === parseInt(dataValue);
    })[0].paymentModename;
    this.setState({
      editOrderModalData: {
        ...this.state.editOrderModalData,
        modeOfPayment: dataValue,
        modeOfPaymentName,
      },
    });
  };
  handleChangeToggle(addOrCancel) {
    if (this.props.AddManuallyData) {
      this.props.closeAddOrder();
    } else {
      this.setState({
        AddManuallyData: !this.state.AddManuallyData,
        message: "Add",
      });

      if (addOrCancel === "Cancel") {
        if (this.props.AddManuallyData === false) {
          if (this.props.searchHide === true) {
            this.handleOrderSearchData("6")
            // this.setState({
            //   message: "Record Not Found"
            // })
          }
          else {
            this.handleOrderSearchData("3");
          }

          this.setState({
            orderNumber: "",
          });
        }
      }
    }
  }

  handelCheckBoxCheckedChange = () => {
    this.setState({
      CheckBoxChecked: !this.state.CheckBoxChecked,
    });
  };
  handleChangeSaveManualTbl() {
    this.setState({
      AddManualSaveTbl: !this.state.AddManualSaveTbl,
    });
  }
  handleManuallyOnchange = (e) => {
    if (e.target.name === "channelOfPurchaseID") {
      let channelOfPurchaseName = this.state.ChannelOfPurchaseData.filter(
        (data) => {
          return data.channelOfPurchaseID == e.target.value;
        }
      )[0].nameOfChannel;

      this.setState({
        channelOfPurchaseName,
      });
    }
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  handleEditOrderModalOnChange = (e) => {
    if (e.target.name === "channelOfPurchaseID") {
      let channelOfPurchaseName = this.state.ChannelOfPurchaseData.filter(
        (data) => {
          return data.channelOfPurchaseID == e.target.value;
        }
      )[0].nameOfChannel;

      this.state.editOrderModalData.channelOfPurchaseName = channelOfPurchaseName;
    }
    this.setState({
      editOrderModalData: {
        ...this.state.editOrderModalData,
        [e.currentTarget.name]: e.currentTarget.value,
      },
    });
  };
  setTicketSourceValue = (e) => {
    let value = e.currentTarget.value;
    this.setState({ selectedTicketSource: value });
  };

  handleCheckOrder = (e) => {
    this.setState({
      custAttachOrder: this.state.custAttachOrder === 1 ? 0 : 1,
      orderDetailsData: [],
      SwitchBtnStatus: e.target.checked,
      orderNumber: "",
    });
    {
      this.props.AttachOrder(
        this.state.custAttachOrder,
        this.state.selectedDataRow
      );
    }
  };
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
  handleGetManuallyTableData() {
    let self = this;
    axios({
      method: "post",
      headers: authHeader(),
      url: config.apiUrl + "/Master/getPaymentMode",
    })
      .then(function (res) {
        let finalData = res.data.data;
        self.setState({ finalData: finalData });
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleOrderSearchData(OrdData, e) {
    let self = this;
    var CustID = this.props.custDetails;

    if (OrdData === "1" || OrdData === "6") {
      if (OrdData === "1") {
        e.preventDefault();
      }
      if (this.state.custAttachOrder === 0) {
        // if (this.state.orderNumber.length > 0) {
        
        axios({
          method: "post",
          url: config.apiUrl + "/Order/getOrderListWithItemDetails",
          headers: authHeader(),
          params: {
            OrderNumber: this.state.orderNumber ? this.state.orderNumber : "",
            CustomerID: CustID,
            allorder: this.state.orderNumber ? false : true,
            TicketId: this.state.isUnknown ? this.props.CurrentTicket : 0
          },
        })
          .then(function (res) {
            let Msg = res.data.message;
            let mainData = res.data.responseData;

            // var OrderSubItem = [];

            // for (let i = 0; i < mainData.length; i++) {
            //   if (mainData[i].orderItems.length > 0) {
            //     for (let j = 0; j < mainData[i].orderItems.length; j++) {
            //       OrderSubItem.push(mainData[i].orderItems[j]);
            //     }
            //   }
            // }
            self.setState({
              message: Msg,
              orderDetailsData: mainData,
              // OrderSubItem,
            });
          })
          .catch((data) => {
            console.log(data);
          });
        // } else {
        //   self.setState({
        //     validOrdernumber: "Please Enter Order Number"
        //   });
        // }
      }
    } else if (OrdData === "2") {
      if (this.state.custAttachOrder === 0) {
        // if (this.state.ModalorderNumber.length > 0) {
        axios({
          method: "post",
          url: config.apiUrl + "/Order/getOrderListWithItemDetails",
          headers: authHeader(),
          params: {
            OrderNumber: this.state.ModalorderNumber
              ? this.state.ModalorderNumber
              : "",
            CustomerID: CustID,
            allorder: this.state.ModalorderNumber ? false : true,
            TicketId: this.state.isUnknown ? this.props.CurrentTicket : 0
          },
        })
          .then(function (res) {
            //
            let Msg = res.data.message;
            let mainData = res.data.responseData;

            // var OrderSubItem = [];

            // for (let i = 0; i < mainData.length; i++) {
            //   if (mainData[i].orderItems.length > 0) {
            //     for (let j = 0; j < mainData[i].orderItems.length; j++) {
            //       OrderSubItem.push(mainData[i].orderItems[j]);
            //     }
            //   }
            // }
            self.setState({
              message: Msg,
              orderDetailsData: mainData,
              // OrderSubItem,
            });
          })
          .catch((data) => {
            console.log(data);
          });
        // } else {
        //   self.setState({
        //     validMdlOrdernumber: "Please Enter Order Number",
        //   });
        // }
      }
    } else if (OrdData === "3") {
      if (this.state.custAttachOrder === 0) {
        // if (this.state.ModalorderNumber.length > 0) {
        axios({
          method: "post",
          url: config.apiUrl + "/Order/getOrderListWithItemDetails",
          headers: authHeader(),
          params: {
            OrderNumber: "",
            CustomerID: CustID,
            allorder: true,
            TicketId: this.state.isUnknown ? this.props.CurrentTicket : 0
          },
        })
          .then(function (res) {
            //
            let Msg = res.data.message;
            let mainData = res.data.responseData;

            // var OrderSubItem = [];

            // for (let i = 0; i < mainData.length; i++) {
            //   if (mainData[i].orderItems.length > 0) {
            //     for (let j = 0; j < mainData[i].orderItems.length; j++) {
            //       OrderSubItem.push(mainData[i].orderItems[j]);
            //     }
            //   }
            // }
            self.setState({
              message: Msg,
              orderDetailsData: mainData,
              // OrderSubItem,
            });
          })
          .catch((err) => {
            console.log(err);
          });
        // } else {
        //   self.setState({
        //     validMdlOrdernumber: "Please Enter Order Number",
        //   });
        // }
      }
    } else {
      axios({
        method: "post",
        url: config.apiUrl + "/Order/getOrderListWithItemDetails",
        headers: authHeader(),
        params: {
          OrderNumber: "",
          CustomerID: CustID,
          allorder: true,
          TicketId: this.state.isUnknown && this.state.allOrderConfigNull ? this.props.CurrentTicket : 0
        },
      })
        .then(function (res) {
          // let Msg = res.data.message;
          let mainData = res.data.responseData;

          self.handleChangeToggle();
          // var OrderSubItem = [];

          // for (let i = 0; i < mainData.length; i++) {
          //   if (mainData[i].orderItems.length > 0) {
          //     for (let j = 0; j < mainData[i].orderItems.length; j++) {
          //       OrderSubItem.push(mainData[i].orderItems[j]);
          //     }
          //   }
          // }
          self.setState({
            message: "Success",
            orderDetailsData: mainData,
            // OrderSubItem,
            orderNumber: "",
          });
        })
        .catch((data) => {
          console.log(data);
        });
    }
  }
  hadleAddManuallyOrderData() {
    const TranslationContext = this.state.translateLanguage.default;
    
    let self = this;
    var CustID = self.props.custDetails;
    // var createdDate = moment(this.state.OrderCreatDate).format("DD-MM-YYYY");
    this.setState({ saveLoader: true });
    let orderMaster = this.state.addedOrders.map((order) => {
      return {
        ProductBarCode: order.productBarCode,
        OrderNumber: order.orderId,
        BillID: order.billId,
        TicketSourceID: order.ticketSourceId,
        ModeOfPaymentID: order.modeOfPayment,
        TransactionDate:
          order.orderCreatedDate !== "" ? order.orderCreatedDate : null,
        InvoiceNumber: "",
        InvoiceDate:
          order.orderCreatedDate !== "" ? order.orderCreatedDate : null,
        OrderPrice: order.pricePaid,
        // CustomerID: order.customerId,
        CustomerID: CustID,
        PurchaseFromStoreId: order.channelOfPurchaseID,
        Discount: order.discount,
        Size: order.size,
        RequireSize: order.requiredSize,
        UploadFileForOrder: order.orderImagesName
          ? order.orderImagesName.map((img) => {
            return img.name;
          }) + ""
          : null,
        ManufacturingDate:
          order.manufacturingDate !== "" ? order.manufacturingDate : null,
        ExpiryBestBeforeDate:
          order.expiryBestBeforeDate !== "" ? order.expiryBestBeforeDate : null,
        Batchno: order.batchNo,
        ProductName: order.productName,
        CategoryName: order.categoryName,
        SubOrderId: order.subOrderId,
      };
    });

    // if (this.state.purchaseFrmStorID > 0) {
    axios({
      method: "post",
      url: config.apiUrl + "/Order/createOrder",
      headers: authHeader(),
      data: {
        // ProductBarCode: this.state.productBarCode,
        // OrderNumber: this.state.orderId,
        // BillID: this.state.billId,
        // TicketSourceID: this.state.selectedTicketSource,
        // ModeOfPaymentID: this.state.modeOfPayment,
        // TransactionDate: this.state.OrderCreatDate, ///createdDate,
        // InvoiceNumber: "",
        // InvoiceDate: this.state.OrderCreatDate, //createdDate,
        // OrderPrice: this.state.orderMRP,
        // PricePaid: this.state.pricePaid,
        // CustomerID: CustID,
        // PurchaseFromStoreId: this.state.purchaseFrmStorID,
        // Discount: this.state.discount,
        // Size: this.state.size,
        // RequireSize: this.state.requiredSize,
        orderMaster,
      },
    })
      .then(function (res) {
        let status = res.data.message;

        if (status === "Success") {
          let data = res.data.responseData;
          NotificationManager.success("New Order added successfully.");

          if (self.props.AddManuallyData) {
            self.props.handleOrderSearchData(false);
            self.props.closeAddOrder();
          } else {
            self.handleOrderSearchData(data);
          }

          self.handleChangeSaveManualTbl();
          self.setState({

            addedOrders: [],
            message: "Success",
            saveLoader: false,
          });
        } else {
          NotificationManager.error(
            TranslationContext !== undefined
              ? TranslationContext.span.ordernotadded
              : "Order not added."
          );
          self.setState({
            saveLoader: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
    // } else {
    //   NotificationManager.error("Order not added.");
    //   self.setState({
    //     validPurchaseStoreName: "Store name not exist",
    //     saveLoader: false
    //   });
    // }
  }
  handlePurchaseStoreName(field, e) {
    //
    let self = this;
    let SearchData = this.state.purchaseFrmStorName;
    SearchData[field] = e.target.value;

    if (SearchData[field].length > 3) {
      axios({
        method: "post",
        url: config.apiUrl + "/Store/getStores",
        headers: authHeader(),
        params: {
          SearchText: SearchData[field],
        },
      })
        .then(function (res) {
          //
          let status = res.data.message;
          var data = res.data.responseData;
          if (status === "Success") {
            self.setState({
              SearchItem: data,
            });
          } else {
            self.setState({
              SearchItem: [],
            });
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      self.setState({
        SearchData,
      });
    }
  }
  HandleSelectdata(e, field, value, id) {
    //
    let SearchData = this.state.SearchData;
    SearchData[field] = value;

    var StorAddress = this.state.StorAddress;
    StorAddress["address"] = id.address;
    var Store_Id = id.storeID;

    this.setState({
      SearchData,
      StorAddress,
      purchaseFrmStorID: Store_Id,
    });
  }
  handleModeOfPaymentDropDown = () => {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Master/getPaymentMode",
      headers: authHeader(),
    })
      .then(function (res) {
        let modeData = res.data.responseData;
        self.setState({ modeData: modeData });
      })
      .catch((data) => {
        console.log(data);
      });
  };
  onFilteredChange(filtered) {
    //
    if (filtered.length > 1 && this.state.filterAll.length) {
      // NOTE: this removes any FILTER ALL filter
      const filterAll = "";
      this.setState({
        filtered: filtered.filter((item) => item.id !== "all"),
        filterAll,
      });
    } else this.setState({ filtered });
  }

  filterAll(e) {
    //
    const { value } = e.target;
    const filterAll = value;
    const filtered = [{ id: "all", value: filterAll }];

    this.setState({ filterAll, filtered });
  }
  expand_row(row) {
    var expanded = { ...this.state.expanded };
    if (expanded[row.index]) {
      expanded[row.index] = !expanded[row.index];
    } else {
      expanded[row.index] = true;
    }

    this.setState({
      expanded: expanded,
    });
  }
  handleNumberOnchange = (e) => {
    var values = e.target.value;
    var names = e.target.name;

    if (isNaN(values)) {
      return false;
    }
    var splitText = values.split(".");
    var index = values.indexOf(".");
    if (index !== -1) {
      if (splitText) {
        if (splitText[1].length <= 2) {
          if (index !== -1 && splitText.length === 2) {
            if (names === "orderMRP") {
              this.setState({ orderMRP: values });
            } else if (names === "pricePaid") {
              this.setState({ pricePaid: values });
            } else if (names === "discount") {
              this.setState({ discount: values });
            } else if (names === "size") {
              this.setState({ size: values });
            } else if (names === "requiredSize") {
              this.setState({ requiredSize: values });
            }
          }
        } else {
          return false;
        }
      } else {
        if (names === "orderMRP") {
          this.setState({ orderMRP: values });
        } else if (names === "pricePaid") {
          this.setState({ pricePaid: values });
        } else if (names === "discount") {
          this.setState({ discount: values });
        } else if (names === "size") {
          this.setState({ size: values });
        } else if (names === "requiredSize") {
          this.setState({ requiredSize: values });
        }
      }
    } else {
      if (names === "orderMRP") {
        this.setState({ orderMRP: values });
      } else if (names === "pricePaid") {
        this.setState({ pricePaid: values });
      } else if (names === "discount") {
        this.setState({ discount: values });
      } else if (names === "size") {
        this.setState({ size: values });
      } else if (names === "requiredSize") {
        this.setState({ requiredSize: values });
      }
    }
  };

  handleEditNumberOnchange = (e) => {
    var values = e.target.value;
    var names = e.target.name;

    if (isNaN(values)) {
      return false;
    }
    var splitText = values.split(".");
    var index = values.indexOf(".");
    if (index !== -1) {
      if (splitText) {
        if (splitText[1].length <= 2) {
          if (index !== -1 && splitText.length === 2) {
            if (names === "orderMRP") {
              this.setState({
                editOrderModalData: {
                  ...this.state.editOrderModalData,
                  orderMRP: values,
                },
              });
            } else if (names === "pricePaid") {
              this.setState({
                editOrderModalData: {
                  ...this.state.editOrderModalData,

                  pricePaid: values,
                },
              });
            } else if (names === "discount") {
              this.setState({
                editOrderModalData: {
                  ...this.state.editOrderModalData,

                  discount: values,
                },
              });
            } else if (names === "size") {
              this.setState({
                editOrderModalData: {
                  ...this.state.editOrderModalData,

                  size: values,
                },
              });
            } else if (names === "requiredSize") {
              this.setState({
                editOrderModalData: {
                  ...this.state.editOrderModalData,

                  requiredSize: values,
                },
              });
            }
          }
        } else {
          return false;
        }
      } else {
        if (names === "orderMRP") {
          this.setState({
            editOrderModalData: {
              ...this.state.editOrderModalData,

              orderMRP: values,
            },
          });
        } else if (names === "pricePaid") {
          this.setState({
            editOrderModalData: {
              ...this.state.editOrderModalData,

              pricePaid: values,
            },
          });
        } else if (names === "discount") {
          this.setState({
            editOrderModalData: {
              ...this.state.editOrderModalData,

              discount: values,
            },
          });
        } else if (names === "size") {
          this.setState({
            editOrderModalData: {
              ...this.state.editOrderModalData,

              size: values,
            },
          });
        } else if (names === "requiredSize") {
          this.setState({
            editOrderModalData: {
              ...this.state.editOrderModalData,

              requiredSize: values,
            },
          });
        }
      }
    } else {
      if (names === "orderMRP") {
        this.setState({
          editOrderModalData: {
            ...this.state.editOrderModalData,

            orderMRP: values,
          },
        });
      } else if (names === "pricePaid") {
        this.setState({
          editOrderModalData: {
            ...this.state.editOrderModalData,

            pricePaid: values,
          },
        });
      } else if (names === "discount") {
        this.setState({
          editOrderModalData: {
            ...this.state.editOrderModalData,

            discount: values,
          },
        });
      } else if (names === "size") {
        this.setState({
          editOrderModalData: {
            ...this.state.editOrderModalData,

            size: values,
          },
        });
      } else if (names === "requiredSize") {
        this.setState({
          editOrderModalData: {
            ...this.state.editOrderModalData,

            requiredSize: values,
          },
        });
      }
    }
  };

  handleChangeOrderItem = (e) => {
    //
    var values = e.target.checked;
    if (values) {
      var x = document.getElementById("ordertable");
      var x1 = document.getElementById("orderitemtable");

      x.style.display = "block";
      x1.style.display = "none";
    } else {
      var i = document.getElementById("ordertable");
      var j = document.getElementById("orderitemtable");
      i.style.display = "none";
      j.style.display = "block ";
    }
    this.setState({
      OrdItmBtnStatus: e.target.checked,
    });
  };
  handleChangeModalOrderItem = (e) => {
    //
    var values = e.target.checked;
    if (values) {
      var x = document.getElementById("Modalordertable");
      var x1 = document.getElementById("Modalorderitemtable");

      x.style.display = "block";
      x1.style.display = "none";
    } else {
      var i = document.getElementById("Modalordertable");
      var j = document.getElementById("Modalorderitemtable");
      i.style.display = "none";
      j.style.display = "block ";
    }
    this.setState({
      OrdItmBtnStatus: e.target.checked,
    });
  };

  // handleGetOderItemData(invoiceNumber, rowData, e) {
  handleGetOderItemData(e, invoiceNumber, rowData) {
    
    if (e.target.checked) {
      let currentSelectedInvoiceNo = this.state.selectedInvoiceNo;
      // currentSelectedInvoiceNo += invoiceNumber + ",";
      currentSelectedInvoiceNo = invoiceNumber !== "" ? invoiceNumber : this.state.selectedInvoiceNo;

      this.setState({
        // SelectedAllOrder: [],
        SelectedAllItem: [],
        OrderSubItem: [],
        selectedInvoiceNo: currentSelectedInvoiceNo,
        CheckBoxAllOrder: {}
      });
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/Order/getOrderItemDetailsList",
        headers: authHeader(),
        data: {
          OrderMasterID: rowData.orderMasterID,
          OrderNumber: rowData.invoiceNumber,
          CustomerID: this.props.custDetails,
          StoreCode: rowData.storeCode,
          InvoiceDate: rowData.invoiceDate,
        },
      })
        .then(function (res) {
          let Msg = res.data.message;
          let data = res.data.responseData;
          if (Msg === "Success") {
            self.setState({
              OrderSubItem: data,
            });
            var selectedInvoiceNo = currentSelectedInvoiceNo;
            const newSelected = Object.assign({}, self.state.CheckBoxAllOrder);

            // for (let i = 0; selectedInvoiceNo.length; i++) {
            // }
            if (invoiceNumber !== "") {
              newSelected[invoiceNumber] = !self.state.CheckBoxAllOrder[
                invoiceNumber
              ];
            }
            // selectedInvoiceNo = selectedInvoiceNo + "";

            self.setState({
              CheckBoxAllOrder: newSelected,
              selectedInvoiceNo,
            });
            var selectedRow = [];
            var CselectedRow = [];
            // if (self.state.SelectedAllOrder.length === 0) {
            selectedRow.push(rowData);
            var Order_Master = data.filter(
              (x) => x.invoiceNumber === invoiceNumber
            );
            if (Order_Master.length > 0) {
              var objCheckBoxAllItem = new Object();
              for (let j = 0; j < Order_Master.length; j++) {
                objCheckBoxAllItem[Order_Master[j].orderItemID] = true;

                CselectedRow.push(Order_Master[j]);
              }
              self.setState({
                CheckBoxAllItem: objCheckBoxAllItem,
              });
            }
            if (invoiceNumber !== "") {
              self.setState({
                SelectedAllOrder: selectedRow,
                SelectedAllItem: CselectedRow,
              });
            }
            // else {
            //   // if (newSelected[invoiceNumber] === true) {
            //   //   for (var i = 0; i < self.state.SelectedAllOrder.length; i++) {
            //   //     if (self.state.SelectedAllOrder[i] === rowData) {
            //   //       selectedRow = self.state.SelectedAllOrder;
            //   //       selectedRow.push(rowData);
            //   //       var Order_Master = self.state.OrderSubItem.filter(
            //   //         (x) => x.invoiceNumber === invoiceNumber
            //   //       );
            //   //       if (Order_Master.length > 0) {
            //   //         var objCheckBoxAllItem = new Object();
            //   //         for (let j = 0; j < Order_Master.length; j++) {
            //   //           objCheckBoxAllItem[
            //   //             Order_Master[j].articleNumber
            //   //           ] = true;

            //   //           CselectedRow.push(Order_Master[j]);
            //   //         }
            //   //         self.setState({
            //   //           CheckBoxAllItem: objCheckBoxAllItem,
            //   //         });
            //   //       }

            //   //       self.setState({
            //   //         SelectedAllOrder: selectedRow,
            //   //         SelectedAllItem: CselectedRow,
            //   //       });

            //   //       break;
            //   //     }
            //   //   }
            //   // } else {
            //   for (var i = 0; i < self.state.SelectedAllOrder.length; i++) {
            //     // if (self.state.SelectedAllOrder[i] === rowData) {
            //     //   selectedRow = self.state.SelectedAllOrder;
            //     //   selectedRow.splice(i, 1);
            //     //   // selectedRow.push(rowData);
            //     //   var Order_Master = self.state.OrderSubItem.filter(
            //     //     (x) => x.invoiceNumber === invoiceNumber
            //     //   );
            //     //   if (Order_Master.length > 0) {
            //     //     var objCheckBoxAllItem = new Object();
            //     //     for (let j = 0; j < Order_Master.length; j++) {
            //     //       objCheckBoxAllItem[
            //     //         Order_Master[j].articleNumber
            //     //       ] = false;
            //     //     }
            //     //     self.setState({
            //     //       CheckBoxAllItem: objCheckBoxAllItem,
            //     //     });
            //     //   }

            //     //   self.setState({
            //     //     SelectedAllOrder: selectedRow,
            //     //     SelectedAllItem: [],
            //     //   });
            //     //   break;
            //     // }
            //     // if (self.state.SelectedAllOrder[i] === rowData) {
            //     selectedRow = self.state.SelectedAllOrder;
            //     // selectedRow.splice(i, 1);
            //     selectedRow.push(rowData);
            //     var Order_Master = self.state.OrderSubItem.filter(
            //       (x) => x.invoiceNumber === invoiceNumber
            //     );
            //     if (Order_Master.length > 0) {
            //       var objCheckBoxAllItem = new Object();
            //       for (let j = 0; j < Order_Master.length; j++) {
            //         objCheckBoxAllItem[Order_Master[j].articleNumber] = false;
            //       }
            //       self.setState({
            //         CheckBoxAllItem: objCheckBoxAllItem,
            //       });
            //     }

            //     self.setState({
            //       SelectedAllOrder: selectedRow,
            //       SelectedAllItem: [],
            //     });
            //     break;
            //     // }
            //   }
            //   // }
            // }
          }
          else {
            var selectedInvoiceNo = currentSelectedInvoiceNo;
            const newSelected = Object.assign({}, self.state.CheckBoxAllOrder);
            newSelected[invoiceNumber] = !self.state.CheckBoxAllOrder[
              invoiceNumber
            ];
            self.setState({
              CheckBoxAllOrder: newSelected,
              selectedInvoiceNo,
            });
            var selectedRow = [];
            var CselectedRow = [];
            if (self.state.SelectedAllOrder.length === 0) {
              selectedRow.push(rowData);
              // var Order_Master = self.state.OrderSubItem.filter(
              var Order_Master = data.filter(
                (x) => x.invoiceNumber === invoiceNumber
              );
              if (Order_Master.length > 0) {
                var objCheckBoxAllItem = new Object();
                for (let j = 0; j < Order_Master.length; j++) {
                  objCheckBoxAllItem[Order_Master[j].orderItemID] = true;

                  CselectedRow.push(Order_Master[j]);
                }
                self.setState({
                  CheckBoxAllItem: objCheckBoxAllItem,
                });
              }

              self.setState({
                SelectedAllOrder: selectedRow,
                SelectedAllItem: CselectedRow,
              });
            }
            else {
              // if (newSelected[invoiceNumber] === true) {
              //   for (var i = 0; i < self.state.SelectedAllOrder.length; i++) {
              //     if (self.state.SelectedAllOrder[i] === rowData) {
              //       selectedRow = self.state.SelectedAllOrder;
              //       selectedRow.push(rowData);
              //       var Order_Master = self.state.OrderSubItem.filter(
              //         (x) => x.invoiceNumber === invoiceNumber
              //       );
              //       if (Order_Master.length > 0) {
              //         var objCheckBoxAllItem = new Object();
              //         for (let j = 0; j < Order_Master.length; j++) {
              //           objCheckBoxAllItem[
              //             Order_Master[j].articleNumber
              //           ] = true;

              //           CselectedRow.push(Order_Master[j]);
              //         }
              //         self.setState({
              //           CheckBoxAllItem: objCheckBoxAllItem,
              //         });
              //       }

              //       self.setState({
              //         SelectedAllOrder: selectedRow,
              //         SelectedAllItem: CselectedRow,
              //       });

              //       break;
              //     }
              //   }
              // }
              //  else {
              selectedRow.push(rowData);

              for (var i = 0; i < self.state.SelectedAllOrder.length; i++) {
                // if (self.state.SelectedAllOrder[i] === rowData) {
                //   selectedRow = self.state.SelectedAllOrder;
                //   selectedRow.splice(i, 1);
                //   var Order_Master = self.state.OrderSubItem.filter(
                //     (x) => x.invoiceNumber === invoiceNumber
                //   );
                //   if (Order_Master.length > 0) {
                //     var objCheckBoxAllItem = new Object();
                //     for (let j = 0; j < Order_Master.length; j++) {
                //       objCheckBoxAllItem[Order_Master[j].articleNumber] = false;
                //     }
                //     self.setState({
                //       CheckBoxAllItem: objCheckBoxAllItem,
                //     });
                //   }

                //   self.setState({
                //     SelectedAllOrder: selectedRow,
                //     SelectedAllItem: [],
                //   });

                //   break;
                // }
                // else {
                // selectedRow = self.state.SelectedAllOrder;
                // selectedRow.push(rowData);
                var Order_Master = data.filter(
                  (x) => x.invoiceNumber === invoiceNumber
                );
                if (Order_Master.length > 0) {
                  var objCheckBoxAllItem = new Object();
                  for (let j = 0; j < Order_Master.length; j++) {
                    objCheckBoxAllItem[Order_Master[j].orderItemID] = false;
                  }
                  self.setState({
                    CheckBoxAllItem: objCheckBoxAllItem,
                  });
                }

                self.setState({
                  SelectedAllOrder: selectedRow,
                  SelectedAllItem: [],
                });
                break;
                // }
              }
              // }
            }

            // self.setState({
            //   CheckBoxAllOrder: newSelected,
            //   selectedInvoiceNo,
            //   OrderSubItem: [],
            // });
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      let selectedInvoiceNo = this.state.selectedInvoiceNo;
      if (selectedInvoiceNo.includes(invoiceNumber)) {
        // selectedInvoiceNo = selectedInvoiceNo.replace(invoiceNumber + ",", "");
        selectedInvoiceNo = selectedInvoiceNo.replace(invoiceNumber);
      }
      let SelectedAllOrder =
        this.state.SelectedAllOrder.length > 0
          ? this.state.SelectedAllOrder.filter((item) => {
            return item.invoiceNumber !== invoiceNumber;
          })
          : this.state.SelectedAllOrder;

      this.setState({
        SelectedAllOrder: SelectedAllOrder,
        SelectedAllItem: [],
        OrderSubItem: [],
        selectedInvoiceNo: selectedInvoiceNo,
      });
    }
    setTimeout(() => {
      this.props.getParentOrderData(
        this.state.SelectedAllOrder,
        this.state.SelectedAllItem
      );
    }, 1000);
  }
  // -------------------------------Check box selected all code start-------------------------------

  // onCheckMasterAllChange(orderMasterID, rowData) {
  //
  //   const newSelected = Object.assign({}, this.state.CheckBoxAllOrder);
  //   newSelected[orderMasterID] = !this.state.CheckBoxAllOrder[orderMasterID];
  //   this.setState({
  //     CheckBoxAllOrder: orderMasterID ? newSelected : false
  //   });
  //   var selectedRow = [];
  //   var CselectedRow = [];
  //   if (this.state.SelectedAllOrder.length === 0) {
  //     selectedRow.push(rowData);
  //     var Order_Master = this.state.OrderSubItem.filter(
  //       x => x.orderMasterID === orderMasterID
  //     );
  //     if (Order_Master.length > 0) {
  //       var objCheckBoxAllItem = new Object();
  //       for (let j = 0; j < Order_Master.length; j++) {
  //         objCheckBoxAllItem[Order_Master[j].orderItemID] = true;

  //         CselectedRow.push(Order_Master[j]);
  //       }
  //       this.setState({
  //         CheckBoxAllItem: objCheckBoxAllItem
  //       });
  //     }
  //     this.setState({
  //       SelectedAllOrder: selectedRow,
  //       SelectedAllItem: CselectedRow
  //     });
  //   } else {
  //     if (newSelected[orderMasterID] === true) {
  //       for (var i = 0; i < this.state.SelectedAllOrder.length; i++) {
  //         if (this.state.SelectedAllOrder[i] === rowData) {
  //           selectedRow = this.state.SelectedAllOrder;
  //           selectedRow.push(rowData);
  //           var Order_Master = this.state.OrderSubItem.filter(
  //             x => x.orderMasterID === orderMasterID
  //           );
  //           if (Order_Master.length > 0) {
  //             var objCheckBoxAllItem = new Object();
  //             for (let j = 0; j < Order_Master.length; j++) {
  //               objCheckBoxAllItem[Order_Master[j].orderItemID] = true;

  //               CselectedRow.push(Order_Master[j]);
  //             }
  //             this.setState({
  //               CheckBoxAllItem: objCheckBoxAllItem
  //             });
  //           }

  //           this.setState({
  //             SelectedAllOrder: selectedRow,
  //             SelectedAllItem: CselectedRow
  //           });

  //           break;
  //         }
  //       }
  //     } else {
  //       for (var i = 0; i < this.state.SelectedAllOrder.length; i++) {
  //         if (this.state.SelectedAllOrder[i] === rowData) {
  //           selectedRow = this.state.SelectedAllOrder;
  //           selectedRow.splice(i, 1);
  //           var Order_Master = this.state.OrderSubItem.filter(
  //             x => x.orderMasterID === orderMasterID
  //           );
  //           if (Order_Master.length > 0) {
  //             var objCheckBoxAllItem = new Object();
  //             for (let j = 0; j < Order_Master.length; j++) {
  //               objCheckBoxAllItem[Order_Master[j].orderItemID] = false;
  //             }
  //             this.setState({
  //               CheckBoxAllItem: objCheckBoxAllItem
  //             });
  //           }

  //           this.setState({
  //             SelectedAllOrder: selectedRow,
  //             SelectedAllItem: []
  //           });

  //           break;
  //         }
  //       }
  //     }
  //   }

  //   this.setState({
  //     SelectedAllOrder: selectedRow,
  //     SelectedAllItem: CselectedRow
  //   });
  //   {
  //     this.props.getParentOrderData(selectedRow, CselectedRow);
  //   }
  // }

  checkIndividualItem(orderItemID, rowData) {
    
    let newSelected = Object.assign({}, this.state.CheckBoxAllItem);
    newSelected[orderItemID] = !this.state.CheckBoxAllItem[orderItemID];
    this.setState({
      CheckBoxAllItem: orderItemID ? newSelected : false,
    });
    var selectedRow = [];
    if (this.state.SelectedAllItem.length === 0) {
      selectedRow.push(rowData);
      this.setState({
        SelectedAllItem: selectedRow,
      });

      var Order_Master = this.state.OrderSubItem.filter(
        (x) =>
          x.orderItemID === selectedRow[0].orderItemID
      );
      if (Order_Master.length === selectedRow.length) {
        let newSelected = Object.assign({}, this.state.CheckBoxAllOrder);
        newSelected[Order_Master[0].orderItemID] = !this.state
          .CheckBoxAllOrder[Order_Master[0].orderItemID];
        this.setState({
          CheckBoxAllOrder: Order_Master[0].orderItemID
            ? newSelected
            : false,
        });
        var data_master = this.state.orderDetailsData.filter(
          (y) => y.invoiceNumber === Order_Master[0].invoiceNumber
        );
        if (data_master.length > 0) {
          // var MastOrd = this.state.SelectedAllOrder;
          var MastOrd = data_master;
          this.setState({
            SelectedAllOrder: MastOrd,
          });
        }
      }

    } else {
      if (newSelected[orderItemID] === true) {
        for (var i = 0; i < this.state.SelectedAllItem.length; i++) {
          selectedRow = this.state.SelectedAllItem;
          selectedRow.push(rowData);
          var Order_Master = this.state.OrderSubItem.filter(
            (x) =>
              x.orderItemID === this.state.SelectedAllItem[i].orderItemID
          );
          if (Order_Master.length === selectedRow.length) {
            let newSelected = Object.assign({}, this.state.CheckBoxAllOrder);
            newSelected[Order_Master[0].orderItemID] = !this.state
              .CheckBoxAllOrder[Order_Master[0].orderItemID];
            this.setState({
              CheckBoxAllOrder: Order_Master[0].orderItemID
                ? newSelected
                : false,
            });
            var data_master = this.state.orderDetailsData.filter(
              (y) => y.invoiceNumber === Order_Master[0].invoiceNumber
            );
            if (data_master.length > 0) {
              // var MastOrd = this.state.SelectedAllOrder;
              var MastOrd = data_master;
              this.setState({
                SelectedAllOrder: MastOrd,
              });
            }
          }
          break;
        }
      } else {
        for (var j = 0; j < this.state.SelectedAllItem.length; j++) {
          if (this.state.SelectedAllItem[j]?.orderItemID === rowData?.orderItemID) {
            selectedRow = this.state.SelectedAllItem;
            selectedRow.splice(j, 1);

            var Order_Master = this.state.OrderSubItem.filter(
              (x) => x.orderItemID === rowData.orderItemID
            );

            if (Order_Master.length !== selectedRow.length) {
              let newSelectedOrder = Object.assign(
                {},
                this.state.CheckBoxAllOrder
              );
              newSelectedOrder[Order_Master[0].orderItemID] = false;
              this.setState({
                CheckBoxAllOrder: Order_Master[0].orderItemID
                  ? newSelectedOrder
                  : false,
              });
              // var data_master = this.state.orderDetailsData.filter(
              //   (y) => y.articleNumber === Order_Master[0].articleNumber
              // );
              // var GetIndex = this.state.orderDetailsData.findIndex(
              //   (y) => y.articleNumber === Order_Master[0].articleNumber
              // );
              // if (data_master.length > 0) {
              //   var MastOrd = this.state.SelectedAllOrder;
              //   MastOrd.splice(GetIndex, 1);
              //   this.setState({
              //     SelectedAllOrder: MastOrd,
              //   });
              // }
            }
            break;
          }
        }
      }
    }
    this.setState({
      SelectedAllItem: selectedRow,
    });
    {
      setTimeout(() => {
        this.props.getParentOrderData(
          this.state.SelectedAllOrder,
          this.state.SelectedAllItem
        );
      }, 1000);
      this.props.getItemOrderData(selectedRow);
    }
  }

  handleOrderUploadChange = (e) => {
    let files = e.target.files;
    let tempArray = [];
    for (let i = 0; i < files.length; i++) {
      tempArray.push(files[i]);
    }
    this.setState({
      orderUpload: tempArray,
    });
  };

  handleEditModalOrderUploadChange = (e) => {
    let files = e.target.files;
    let tempArray = [];
    for (let i = 0; i < files.length; i++) {
      tempArray.push(files[i]);
    }

    this.setState({
      editOrderModalData: {
        ...this.state.editOrderModalData,
        orderUpload: tempArray,
      },
    });
  };

  handleAddOrders = () => {
    if (this.state.isUnknown ? true : this.handleOrderDetailsValidation()) {
      if (this.state.orderUpload.length > 0) {
        this.handleUploadOrderImages(this.state.orderUpload);
      }
      setTimeout(() => {
        let order = {
          billId: this.state.billId,
          orderId: this.state.isUnknown ? "Unknown" : this.state.orderId,
          productBarCode: this.state.productBarCode,
          channelOfPurchaseID: this.state.channelOfPurchaseID || 0,
          modeOfPayment: this.state.isUnknown ? 0 : this.state.modeOfPayment,
          orderMRP: this.state.isUnknown ? 0 : this.state.orderMRP,
          pricePaid: this.state.isUnknown ? 0 : this.state.pricePaid,
          discount: this.state.isUnknown ? 0 : this.state.discount,
          size: this.state.size,
          requiredSize: this.state.requiredSize,
          purchaseFromStoreName: this.state.purchaseFrmStorName.store,
          purchaseFromStoreAddress: this.state.purchaseFrmStorAddress,
          orderUpload: this.state.orderUpload,
          orderCreatedDate: this.state.OrderCreatDate,
          channelOfPurchaseName: this.state.channelOfPurchaseName,
          customerId: this.props.custDetails,
          ticketSourceId: this.state.selectedTicketSource,
          modeOfPaymentName: this.state.modeOfPaymentName,
          manufacturingDate: this.state.manufacturingDate,
          expiryBestBeforeDate: this.state.expiryBestBeforeDate,
          batchNo: this.state.batchNo,
          productName: this.state.productName,
          categoryName: this.state.categoryName,
          subOrderId: this.state.subOrderId,
          orderImagesName: this.state.orderImagesName,
        };
        this.setState({
          addedOrders: [order, ...this.state.addedOrders],
          productBarCode: "",
          billId: "",
          orderId: "",
          selectedTicketSource: 0,
          modeOfPayment: 0,
          OrderCreatDate: "",
          orderMRP: "",
          pricePaid: "",
          purchaseFrmStorName: {},
          discount: "",
          size: "",
          requiredSize: "",
          orderUpload: [],
          purchaseFrmStorAddress: "",
          channelOfPurchaseID: 0,
          manufacturingDate: "",
          expiryBestBeforeDate: "",
          batchNo: "",
          productName: "",
          categoryName: "",
          subOrderId: "",
          orderErrors: {},
        });
      }, 2000);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  };

  handleDeleteAddedOrder = (selectedIndex) => {
    let filteredArray = this.state.addedOrders.filter((data, index) => {
      return index != selectedIndex;
    });

    this.setState({
      addedOrders: filteredArray,
    });
  };

  handleOpenEditOrderModal = (row, orderIndex) => {
    let editOrderModalData = {
      customerId: row.customerId,
      billId: row.billId,
      orderId: row.orderId,
      productBarCode: row.productBarCode,
      channelOfPurchaseID: row.channelOfPurchaseID || null,
      modeOfPayment: row.modeOfPayment,
      orderMRP: row.orderMRP,
      pricePaid: row.pricePaid,
      discount: row.discount,
      size: row.size,
      requiredSize: row.requiredSize,
      purchaseFromStoreName: row.purchaseFromStoreName,
      purchaseFromStoreAddress: row.purchaseFromStoreAddress,
      orderUpload: row.orderUpload,
      orderCreatedDate: row.orderCreatedDate,
      channelOfPurchaseName: row.channelOfPurchaseName,
      ticketSourceId: row.ticketSourceId,
      subOrderId: row.subOrderId,
      manufacturingDate: row.manufacturingDate,
      expiryBestBeforeDate: row.expiryBestBeforeDate,
      batchNo: row.batchNo,
      productName: row.productName,
      categoryName: row.categoryName,
      orderImagesName: row.orderImagesName,
    };

    this.setState({
      editOrderModalData,
      editAddedOrderModal: true,
      orderIndex,
    });
  };

  handleCloseEditOrderModal = () => {
    this.setState({
      editAddedOrderModal: false,
    });
  };

  handleUpdateOrderModal = () => {
    if (this.handleEditOrderDetailsValidation()) {
      if (this.state.editOrderModalData.orderUpload.length !== 0) {
        this.handleUploadOrderImages(this.state.editOrderModalData.orderUpload);
      }

      setTimeout(() => {
        this.state.addedOrders[
          this.state.orderIndex
        ] = this.state.editOrderModalData;

        this.setState({
          editAddedOrderModal: false,
          editOrderErrors: {},
        });
      }, 2000);
    }
  };

  handleOpenImageModal = () => {
    this.setState({
      uploadedImageModal: true,
    });
  };

  handleCloseImageModal = () => {
    this.setState({
      uploadedImageModal: false,
    });
  };

  handleDeleteSelectedImage = (imgIndex) => {
    let filteredImages = this.state.orderUpload.filter((img, index) => {
      return index != imgIndex;
    });

    let remainingUploadedImage = this.state.orderImagesName.filter(
      (img, index) => {
        return index != imgIndex;
      }
    );

    // if (this.state.orderImagesName.length > 0) {
    //   this.handleDeleteFileForOrder(
    //     this.state.orderImagesName[imgIndex].name.substring(
    //       this.state.orderImagesName[imgIndex].name.lastIndexOf("/") + 1
    //     )
    //   );
    // }

    this.setState({
      orderUpload: filteredImages,
      orderImagesName: remainingUploadedImage,
    });
  };

  handleDeleteSelectedImageInEditModal = (imgIndex) => {
    let filteredImages = this.state.editOrderModalData.orderUpload.filter(
      (img, index) => {
        return index != imgIndex;
      }
    );
    let remainingUploadedImage = this.state.editOrderModalData.orderImagesName.filter(
      (img, index) => {
        return index != imgIndex;
      }
    );

    if (this.state.editOrderModalData.orderImagesName.length > 0) {
      this.handleDeleteFileForOrder(
        this.state.editOrderModalData.orderImagesName[imgIndex].name.substring(
          this.state.editOrderModalData.orderImagesName[
            imgIndex
          ].name.lastIndexOf("/") + 1
        )
      );
    }

    this.setState({
      editOrderModalData: {
        ...this.state.editOrderModalData,
        orderUpload: filteredImages,
        orderImagesName: remainingUploadedImage,
      },
    });
  };

  handleOrderDetailsValidation = () => {
    let isFormValid = true;
    let orderErrors = {};

    if (!this.state.billId) {
      isFormValid = false;
      orderErrors.billId = "This field is required";
    }
    if (!this.state.orderId) {
      isFormValid = false;
      orderErrors.orderId = "This field is required";
    }
    if (!this.state.productBarCode) {
      isFormValid = false;
      orderErrors.productBarCode = "This field is required";
    }
    if (!this.state.channelOfPurchaseID) {
      isFormValid = false;
      orderErrors.channelOfPurchaseID = "This field is required";
    }
    if (!this.state.modeOfPayment) {
      isFormValid = false;
      orderErrors.modeOfPayment = "This field is required";
    }
    if (!this.state.orderMRP) {
      isFormValid = false;
      orderErrors.orderMRP = "This field is required";
    }
    if (!this.state.pricePaid) {
      isFormValid = false;
      orderErrors.pricePaid = "This field is required";
    }
    if (!this.state.discount) {
      isFormValid = false;
      orderErrors.discount = "This field is required";
    }
    if (!this.state.size) {
      isFormValid = false;
      orderErrors.size = "This field is required";
    }
    if (!this.state.requiredSize) {
      isFormValid = false;
      orderErrors.requiredSize = "This field is required";
    }

    if (!this.state.purchaseFrmStorAddress) {
      isFormValid = false;
      orderErrors.purchaseFrmStorAddress = "This field is required";
    }

    // if (!this.state.OrderCreatDate) {
    //   isFormValid = false;
    //   orderErrors.OrderCreatDate = "This field is required";
    // }
    if (!this.state.channelOfPurchaseName) {
      isFormValid = false;
      orderErrors.channelOfPurchaseName = "This field is required";
    }

    if (!this.state.modeOfPaymentName) {
      isFormValid = false;
      orderErrors.modeOfPaymentName = "This field is required";
    }
    // if (!this.state.manufacturingDate) {
    //   isFormValid = false;
    //   orderErrors.manufacturingDate = "This field is required";
    // }
    // if (!this.state.expiryBestBeforeDate) {
    //   isFormValid = false;
    //   orderErrors.expiryBestBeforeDate = "This field is required";
    // }
    if (!this.state.batchNo) {
      isFormValid = false;
      orderErrors.batchNo = "This field is required";
    }
    if (!this.state.productName) {
      isFormValid = false;
      orderErrors.productName = "This field is required";
    }
    if (!this.state.categoryName) {
      isFormValid = false;
      orderErrors.categoryName = "This field is required";
    }
    if (!this.state.subOrderId) {
      isFormValid = false;
      orderErrors.subOrderId = "This field is required";
    }

    this.setState({
      orderErrors,
    });

    return isFormValid;
  };

  handleEditOrderDetailsValidation = () => {
    let isFormValid = true;
    let editOrderErrors = {};

    if (!this.state.editOrderModalData.billId) {
      isFormValid = false;
      editOrderErrors.billId = "This field is required";
    }
    if (!this.state.editOrderModalData.orderId) {
      isFormValid = false;
      editOrderErrors.orderId = "This field is required";
    }
    if (!this.state.editOrderModalData.productBarCode) {
      isFormValid = false;
      editOrderErrors.productBarCode = "This field is required";
    }
    if (!this.state.editOrderModalData.channelOfPurchaseID) {
      isFormValid = false;
      editOrderErrors.channelOfPurchaseID = "This field is required";
    }
    if (!this.state.editOrderModalData.modeOfPayment) {
      isFormValid = false;
      editOrderErrors.modeOfPayment = "This field is required";
    }
    if (!this.state.editOrderModalData.orderMRP) {
      isFormValid = false;
      editOrderErrors.orderMRP = "This field is required";
    }
    if (!this.state.editOrderModalData.pricePaid) {
      isFormValid = false;
      editOrderErrors.pricePaid = "This field is required";
    }
    if (!this.state.editOrderModalData.discount) {
      isFormValid = false;
      editOrderErrors.discount = "This field is required";
    }
    if (!this.state.editOrderModalData.size) {
      isFormValid = false;
      editOrderErrors.size = "This field is required";
    }
    if (!this.state.editOrderModalData.requiredSize) {
      isFormValid = false;
      editOrderErrors.requiredSize = "This field is required";
    }

    if (!this.state.editOrderModalData.purchaseFromStoreAddress) {
      isFormValid = false;
      editOrderErrors.purchaseFromStoreAddress = "This field is required";
    }

    // if (!this.state.editOrderModalData.orderCreatedDate) {
    //   isFormValid = false;
    //   editOrderErrors.orderCreatedDate = "This field is required";
    // }
    if (!this.state.editOrderModalData.channelOfPurchaseName) {
      isFormValid = false;
      editOrderErrors.channelOfPurchaseName = "This field is required";
    }

    if (!this.state.editOrderModalData.modeOfPayment) {
      isFormValid = false;
      editOrderErrors.modeOfPayment = "This field is required";
    }
    // if (!this.state.editOrderModalData.manufacturingDate) {
    //   isFormValid = false;
    //   editOrderErrors.manufacturingDate = "This field is required";
    // }
    // if (!this.state.editOrderModalData.expiryBestBeforeDate) {
    //   isFormValid = false;
    //   editOrderErrors.expiryBestBeforeDate = "This field is required";
    // }
    if (!this.state.editOrderModalData.batchNo) {
      isFormValid = false;
      editOrderErrors.batchNo = "This field is required";
    }
    if (!this.state.editOrderModalData.productName) {
      isFormValid = false;
      editOrderErrors.productName = "This field is required";
    }
    if (!this.state.editOrderModalData.categoryName) {
      isFormValid = false;
      editOrderErrors.categoryName = "This field is required";
    }
    if (!this.state.editOrderModalData.subOrderId) {
      isFormValid = false;
      editOrderErrors.subOrderId = "This field is required";
    }

    this.setState({
      editOrderErrors,
    });

    return isFormValid;
  };

  handleUploadOrderImages = (files) => {
    let formData = new FormData();

    files.map((file) => {
      return formData.append("file", file);
    });

    axios({
      method: "post",
      url: config.apiUrl + "/Order/UploadFileForOrder",
      headers: authHeader(),
      data: formData,
    })
      .then((res) => {
        if (this.state.editAddedOrderModal) {
          this.setState({
            editOrderModalData: {
              ...this.state.editOrderModalData,
              orderImagesName: res.data,
            },
          });
        }
        this.setState({
          orderImagesName: res.data,
        });
        NotificationManager.success("Image Uploaded Successfully");
      })
      .catch((data) => {
        NotificationManager.error("Could Not Upload Images");
        console.log(data);
      });
  };

  handleDeleteFileForOrder = (imgName) => {
    let inputData = {
      Name: imgName,
    };

    axios({
      method: "post",
      url: config.apiUrl + "/Order/DeleteFile",
      headers: authHeader(),
      data: inputData,
    })
      .then((response) => {
        NotificationManager.success("File Deleted Successully.");
      })
      .catch((error) => {
        NotificationManager.error("Could Not Delete Image.");
        console.log(error);
      });
  };
  handleOrderUnknown = (event) => {
    // event.preventDefault()
    this.setState({
      isUnknown: event.target.checked
    })
  }
  // -------------------------------Check box selected all code end -------------------------------

  render() {
    const TranslationContext = this.state.translateLanguage.default;
    const { orderDetailsData } = this.state;
    return (
      <div
        className="ticketSycard"
        style={{
          backgroundColor: this.props.AddManuallyData ? "#fff" : "#f5f8f9",
        }}
      >
        <div className="ticketSycard1">
          {this.props.AddManuallyData === false && (
            <div className="row storemainrow justify-content-between">
              <div className="col-12 col-lg-7 col-xl-8">
                <label className="systemstordercustomer">
                  {TranslationContext !== undefined
                    ? TranslationContext.label.customerwanttoattachorder
                    : "Customer Want to attach order"}
                </label>
              </div>

              {/* <div className="col-12 col-lg-3 col-xl-3">
                <div style={{ display: "flex", marginTop: "4px" }}>
                  <label className="orderdetailpopup">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.yes
                      : "Yes"}
                  </label>
                  <div className="switchmargin">
                    <div className="switch switch-primary d-inline m-r-10">
                      <input
                        type="checkbox"
                        id="editDashboard-p-1"
                        value={this.state.custAttachOrder}
                        checked={this.state.SwitchBtnStatus}
                        onChange={this.handleCheckOrder}
                      />
                      <label
                        htmlFor="editDashboard-p-1"
                        className="cr cr-tick"
                      ></label>
                    </div>
                  </div>
                  <label className="orderdetailpopup">
                    {TranslationContext !== undefined
                      ? TranslationContext.label.no
                      : "No"}
                  </label>
                </div>
              </div> */}

              <div className="col-12 col-lg-2 col-xl-1">
                <div
                  // className="storeplusline"
                  className={
                    this.state.custAttachOrder === 1
                      ? "storeplusline-12"
                      : "storeplusline"
                  }
                  onClick={this.handleOrderTableOpen.bind(this)}
                  disabled={this.state.custAttachOrder === 1 ? true : false}
                >
                  <span className="plusline1"></span>
                  <img src={ArrowImg} alt="Arrow" className="arrow-imgtask-1" />
                </div>
              </div>
            </div>
          )}

          <Modal
            onClose={this.handleOrderTableClose}
            open={this.state.OrderTable}
            modalId="addOrderTableModal"
            overlayId="logout-ovrly"
          >
            <div
              className="row"
              style={{ marginLeft: "0px", marginRight: "0px" }}
            >
              <div
                className="col-md-12 claim-status-card"
                style={{ height: "54px" }}
              >
                <div className="row">
                  <div className="col-md-6">
                    <label style={{ marginTop: "7px" }}>
                      <b>
                        {TranslationContext !== undefined
                          ? TranslationContext.label.customerwanttoattachorder
                          : "Customer Want to attach order"}
                      </b>
                    </label>
                  </div>
                  <div className="col-md-6 d-flex justify-content-end">

                    {/* <div
                      style={{ display: "inline-flex", marginRight: "10px" }}
                    >
                      <label className="orderdetailpopup">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.yes
                          : "Yes"}
                      </label>
                      <div className="switchmargin">
                        <div className="switch switch-primary d-inline m-r-10">
                          <input
                            type="checkbox"
                            id="editDashboard-p-11"
                            value={this.state.custAttachOrder}
                            checked={this.state.SwitchBtnStatus}
                            onChange={this.handleCheckOrder}
                          />
                          <label
                            htmlFor="editDashboard-p-11"
                            className="cr cr-tick"
                          ></label>
                        </div>
                      </div>
                      <label className="orderdetailpopup">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.no
                          : "No"}
                      </label>
                    </div> */}

                    <div
                      className="claimplus"
                      onClick={this.handleOrderTableClose.bind(this)}
                    >
                      <span className="plusline12"></span>
                      <span>
                        <img
                          src={MinusImg}
                          alt="Minus"
                          className="minus-imgorder"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {this.props.AddManuallyData === false && (
              <>
                {" "}
                <div
                  className="row m-t-10 m-b-10"
                  style={{ marginLeft: "0", marginRight: "0" }}
                >
                  <div className="col-md-6">
                    <label className="orderdetailpopup">
                      {TranslationContext !== undefined
                        ? TranslationContext.label.orderdetails
                        : "Order Details"}
                    </label>
                  </div>
                  <div className="col-md-3">
                    <div style={{ float: "right", display: "flex" }}>
                      <label className="orderdetailpopup">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.order
                          : "Order"}
                      </label>
                      <div className="orderswitch orderswitchitem">
                        <div className="switch switch-primary d-inline">
                          <input
                            type="checkbox"
                            id="item-11"
                            checked={this.state.OrdItmBtnStatus}
                            onChange={this.handleChangeModalOrderItem}
                          />
                          <label
                            htmlFor="item-11"
                            className="cr cr-tick ord"
                          ></label>
                        </div>
                      </div>
                      <label className="orderdetailpopup">
                        {TranslationContext !== undefined
                          ? TranslationContext.label.item
                          : "Item"}
                      </label>
                    </div>
                  </div>
                  {this.props.searchHide === false &&
                    <div className="col-md-3">
                      <input
                        type="text"
                        className="searchtextpopup"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.label.searchorder
                            : "Search Order"
                        }
                        name="ModalorderNumber"
                        value={this.state.ModalorderNumber}
                        autoComplete="off"
                        onChange={this.handleOrderChange.bind(this)}
                        disabled={this.state.custAttachOrder === 1 ? true : false}
                      // value={this.state.filterAll}
                      // onChange={this.filterAll}
                      />
                      <img
                        src={SearchBlackImg}
                        alt="Search"
                        className="searchtextimgpopup"
                        onClick={this.handleOrderSearchData.bind(this, "2")}
                      />
                      {this.state.ModalorderNumber.length === 0 && (
                        <p
                          style={{
                            color: "red",
                            marginBottom: "0px",
                          }}
                        >
                          {this.state.validMdlOrdernumber}
                        </p>
                      )}
                    </div>
                  }
                </div>
                {/* <div className="reacttableordermodal ordermainrow tableSrolling headers-menu"> */}
                <div id="Modalorderitemtable" style={{ display: "block" }}>
                  <Table
                    className="components-table-demo-nested custom-antd-table"
                    columns={[
                      {
                        title: "",
                        // dataIndex: "invoiceNumber",
                        render: (row, data) => {
                          return (
                            // <div className="filter-checkbox">
                            <div className="orders_radio_button">
                              <input
                                type="radio"
                                // className="d-none"
                                id={"all" + data.invoiceNumber}
                                name="AllOrder"
                                checked={this.state.selectedInvoiceNo.includes(
                                  data.invoiceNumber
                                )}
                                // onChange={this.handleGetOderItemData.bind(
                                //   this,
                                //   data.invoiceNumber,
                                //   data
                                // )}
                                onChange={(e) => this.handleGetOderItemData(e, data.invoiceNumber, data)}
                              />
                              <label
                                htmlFor={"all" + data.invoiceNumber}
                              ></label>
                            </div>
                          );
                        },
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.span.invoicenumber
                            : "Invoice Number",
                        dataIndex: "invoiceNumber",
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.span.invoicedate
                            : "Invoice Date",
                        dataIndex: "invoiceDate",
                        render: (row, data) => {
                          return data.invoiceDate !== null
                            ? moment(data.invoiceDate).format("Do/MMM/YYYY")
                            : "Not Added";
                        },
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.span.suborderid
                            : "Sub Order ID",
                        dataIndex: "subOrderId",
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.span.batchno
                            : "Batch No",
                        dataIndex: "batchNo",
                      },

                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.span.productbarcode
                            : "Product Bar Code",
                        dataIndex: "productBarCode",
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.span.productname
                            : "Product Name",
                        dataIndex: "productName",
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.span.categoryname
                            : "Category Name",
                        dataIndex: "categoryName",
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.span.manufacturingdate
                            : "Manufacturing Date",
                        dataIndex: "manufacturingDate",
                        render: (row, data) => {
                          return data.manufacturingDate !== null
                            ? moment(data.manufacturingDate).format(
                              "Do/MMM/YYYY"
                            )
                            : "Not Added";
                        },
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.span.expirybestbeforedate
                            : "Expiry/Best Before Date",
                        dataIndex: "expiryBestBeforeDate",
                        render: (row, data) => {
                          return data.expiryBestBeforeDate !== null
                            ? moment(data.expiryBestBeforeDate).format(
                              "Do/MMM/YYYY"
                            )
                            : "Not Added";
                        },
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.span.channelofpurchase
                            : "Channel Of Purchase",
                        dataIndex: "channelOfPurchase",
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.span.modeofpayment
                            : "Mode Of Payment",
                        dataIndex: "modeOfPayment",
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.span.size
                            : "Size",
                        dataIndex: "size",
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.span.requiredsize
                            : "Required Size",
                        dataIndex: "requiredSize",
                      },

                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.span.itemcount
                            : "Item Count",
                        dataIndex: "itemCount",
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.span.itemprice
                            : "Item Price",
                        dataIndex: "ordeItemPrice",
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.span.pricepaid
                            : "Price Paid",
                        dataIndex: "orderPricePaid",
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.span.storecode
                            : "Store Code",
                        dataIndex: "storeCode",
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.span.storeaddress
                            : "Store Address",
                        dataIndex: "storeAddress",
                      },
                      {
                        title:
                          TranslationContext !== undefined
                            ? TranslationContext.span.discount
                            : "Discount",
                        dataIndex: "discount",
                      },
                    ]}
                    dataSource={orderDetailsData}
                    pagination={orderDetailsData?.length > 5 ? true : false}
                  />
                </div>{" "}
              </>
            )}

            <div
              id="Modalordertable"
              className="varunoverflow"
              style={{ display: "none" }}
            >
              <Table
                className="components-table-demo-nested custom-antd-table"
                dataSource={orderDetailsData}
                columns={[
                  {
                    title: "",
                    // dataIndex: "invoiceNumber",
                    render: (row, data) => {
                      return (
                        <div className="filter-checkbox">
                          <input
                            type="checkbox"
                            className="d-none"
                            id={"all" + data.invoiceNumber}
                            name="AllOrder"
                            // checked={this.state.selectedInvoiceNo.includes(
                            //   data.invoiceNumber
                            // )}
                            checked={
                              this.state.SelectedAllItem[0]?.invoiceNumber === data.invoiceNumber ? true : false}
                            // onChange={this.handleGetOderItemData.bind(
                            //   this,
                            //   data.invoiceNumber,
                            //   data
                            // )}
                            onChange={(e) => this.handleGetOderItemData(e, data.invoiceNumber, data)}
                          />
                          <label htmlFor={"all" + data.invoiceNumber}></label>
                        </div>
                      );
                    },
                  },
                  {
                    title:
                      TranslationContext !== undefined
                        ? TranslationContext.span.invoicenumber
                        : "Invoice Number",
                    dataIndex: "invoiceNumber",
                  },
                  {
                    title:
                      TranslationContext !== undefined
                        ? TranslationContext.span.invoicedate
                        : "Invoice Date",
                    dataIndex: "invoiceDate",
                    render: (row, data) => {
                      return data.invoiceDate !== null
                        ? moment(data.invoiceDate).format("Do/MMM/YYYY")
                        : "Not Added";
                    },
                  },
                  {
                    title:
                      TranslationContext !== undefined
                        ? TranslationContext.span.itemcount
                        : "Item Count",
                    dataIndex: "itemCount",
                  },
                  {
                    title:
                      TranslationContext !== undefined
                        ? TranslationContext.span.itemprice
                        : "Item Price",
                    dataIndex: "ordeItemPrice",
                  },
                  {
                    title:
                      TranslationContext !== undefined
                        ? TranslationContext.span.pricepaid
                        : "Price Paid",
                    dataIndex: "orderPricePaid",
                  },
                  {
                    title:
                      TranslationContext !== undefined
                        ? TranslationContext.span.storecode
                        : "Store Code",
                    dataIndex: "storeCode",
                  },
                  {
                    title:
                      TranslationContext !== undefined
                        ? TranslationContext.span.storeaddress
                        : "Store Address",
                    dataIndex: "storeAddress",
                  },
                  {
                    title:
                      TranslationContext !== undefined
                        ? TranslationContext.span.discount
                        : "Discount",
                    dataIndex: "discount",
                  },
                ]}
                onExpand={(data, row) => this.handleGetOderItemData({
                  target: {
                    checked: true,
                  },
                }, "", row)}
                expandedRowRender={(row) => {
                  return (
                    <Table
                      // dataSource={this.state.OrderSubItem}
                      dataSource={this.state.OrderSubItem.filter(
                        (x) => x.invoiceNumber === row.invoiceNumber
                      )}
                      columns={[
                        {
                          title: "",
                          // dataIndex: "invoiceNumber",
                          render: (row, item) => {
                            return (
                              <div className="filter-checkbox">
                                <input
                                  type="checkbox"
                                  className="d-none"
                                  id={"item" + item.orderItemID}
                                  name="AllItem"
                                  checked={
                                    this.state.CheckBoxAllItem[
                                    item.orderItemID
                                    ] === true
                                  }
                                  onChange={this.checkIndividualItem.bind(
                                    this,
                                    item.orderItemID,
                                    item
                                  )}
                                />
                                <label
                                  htmlFor={"item" + item.orderItemID}
                                ></label>
                              </div>
                            );
                          },
                        },
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.span.articlenumber
                              : "Article Number",
                          dataIndex: "articleNumber",
                        },
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.span.articlename
                              : "Article Name",
                          dataIndex: "articleName",
                        },
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.ticketingDashboard.articlemrp
                              : "Article MRP",
                          dataIndex: "itemPrice",
                        },
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.span.pricepaid
                              : "Price Paid",
                          dataIndex: "pricePaid",
                        },
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.span.discount
                              : "Discount",
                          dataIndex: "discount",
                        },
                        {
                          title:
                            TranslationContext !== undefined
                              ? TranslationContext.ticketingDashboard
                                .requiredsize
                              : "Required Size",
                          dataIndex: "requireSize",
                          render: (data, record) => {
                            return (
                              <div>
                                <input
                                  type="text"
                                  id={"requireSizeTxt" + record.articleNumber}
                                  value={record.requireSize || ""}
                                  name="requiredSize"
                                  className="order-input"
                                  autoComplete="off"
                                  onChange={() => {
                                    this.handleRequireSize(this, record);
                                  }}
                                />
                              </div>
                            );
                          },
                        },
                      ]}
                      // rowSelection={rowSelection}
                      pagination={false}
                    />
                  );
                }}
                pagination={false}
              />
            </div>
          </Modal>
          {this.state.AddManuallyData === true ? null : (
            <div>
              {this.props.searchHide === false &&
                <div className="row m-b-10">
                  <div
                    className="col-md-11"
                    style={{ marginLeft: "25px", marginTop: "20px" }}
                  >
                    <form
                      name="form"
                      onSubmit={this.handleOrderSearchData.bind(this, "1")}
                    >
                      <div>
                        <input
                          type="text"
                          className="systemordersearch"
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.label.searchorderbyordernumber
                              : "Search Order By Order Number"
                          }
                          name="orderNumber"
                          value={this.state.orderNumber}
                          autoComplete="off"
                          onChange={this.handleOrderChange.bind(this)}
                          disabled={
                            this.state.custAttachOrder === 1 ? true : false
                          }
                        />

                        <img
                          src={SearchBlackImg}
                          alt="Search"
                          className="systemorder-imgsearch"
                          onClick={this.handleOrderSearchData.bind(this, "1")}
                        // disabled={this.state.custAttachOrder === 1 ? true : false}
                        />
                      </div>
                    </form>
                    {/* {this.state.orderNumber.length === 0 && (
                    <p
                      style={{
                        color: "red",
                        marginBottom: "0px",
                      }}
                    >
                      {this.state.validOrdernumber}
                    </p>
                  )} */}
                  </div>
                </div>
              }
              {this.state.message === "Record Not Found" ? (
                <div>
                  <div className="div-notFound">
                    <img
                      src={NotFoundImg}
                      alt="Not Found"
                      className="notFound-addSrch"
                    />
                    <br />
                    <label className="lbl-count-foundData">
                      {TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard
                          .wecouldntfindtheorderdetailswith
                        : "We couldn't find the order details with"}
                      <br />
                      <span>
                        {TranslationContext !== undefined
                          ? TranslationContext.ticketingDashboard.thisorderid
                          : "this order Id"}
                      </span>
                    </label>
                  </div>
                  <div className="addmanualbtn">
                    <button
                      type="button"
                      className="addmanual"
                      onClick={this.handleChangeToggle.bind(this)}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard.addmanually
                        : "Add Manually"}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          {this.state.AddManuallyData === true ? (
            <div>
              <div className="row m-b-10 m-l-10 m-r-10 m-t-10">
                <div className="col-md-6">
                  <label className="addmanuallytext">
                    {TranslationContext !== undefined
                      ? TranslationContext.ticketingDashboard.addmanually
                      : "Add Manually"}
                  </label>
                </div>
                <div className="col-md-3">
                  <div
                    style={{
                      float: "right",
                      display: "flex",
                    }}
                  >
                    <label className="orderdetailpopup">
                      Order
                    </label>
                    <div
                      className={"orderswitch orderswitchitem"
                      }
                    >
                      <div className="switchblm switch  switch-primary d-inline" style={{
                        position: "relative"
                      }}>
                        <input
                          type="checkbox"
                          id="editTasks-p-10"
                          checked={this.state.isUnknown}
                          onChange={(e) => this.handleOrderUnknown(e)}
                          style={{
                            left: "117px",
                            top: "-1px",
                            width: "35px",
                            height: "20px",
                            zIndex: "9"
                          }}

                        />
                        <label
                          htmlFor="editTasks-p-10"
                          className="cr ord"
                        ></label>
                      </div>
                    </div>
                    <label className="orderdetailpopup">
                      Unknown
                    </label>
                  </div>
                </div>
              </div>
              <div className="row m-b-10 m-l-10 m-r-10">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="addmanuallytext1"
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.p.orderid
                        : "Order ID"
                    }
                    name="orderId"
                    value={this.state.isUnknown ? "Unknown" : this.state.orderId}
                    onChange={this.handleManuallyOnchange}
                    disabled={this.state.isUnknown}
                  />
                  {this.state.orderErrors.orderId && (
                    <p style={{ color: "red" }}>
                      {this.state.orderErrors.orderId}
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="addmanuallytext1"
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard.billid
                        : "Bill ID"
                    }
                    name="billId"
                    value={this.state.billId}
                    onChange={this.handleManuallyOnchange}
                    disabled={this.state.isUnknown}
                  />
                  {this.state.orderErrors.billId && (
                    <p style={{ color: "red" }}>
                      {this.state.orderErrors.billId}
                    </p>
                  )}
                </div>
              </div>

              <div className="row m-b-10 m-l-10 m-r-10">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="addmanuallytext1"
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.p.suborderid
                        : "Sub Order Id"
                    }
                    name="subOrderId"
                    value={this.state.subOrderId}
                    onChange={this.handleManuallyOnchange}
                    disabled={this.state.isUnknown}
                  />
                  {this.state.orderErrors.subOrderId && (
                    <p style={{ color: "red" }}>
                      {this.state.orderErrors.subOrderId}
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="addmanuallytext1"
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.p.batchno
                        : "Batch No"
                    }
                    name="batchNo"
                    value={this.state.batchNo}
                    onChange={this.handleManuallyOnchange}
                    disabled={this.state.isUnknown}
                  />
                  {this.state.orderErrors.batchNo && (
                    <p style={{ color: "red" }}>
                      {this.state.orderErrors.batchNo}
                    </p>
                  )}
                </div>
              </div>

              <div className="row m-b-10 m-l-10 m-r-10">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="addmanuallytext1"
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard.productbarcode
                        : "Product Bar Code"
                    }
                    name="productBarCode"
                    value={this.state.productBarCode}
                    onChange={this.handleManuallyOnchange}
                    disabled={this.state.isUnknown}
                    autoComplete="off"
                  />
                  {this.state.orderErrors.productBarCode && (
                    <p style={{ color: "red" }}>
                      {this.state.orderErrors.productBarCode}
                    </p>
                  )}
                </div>

                <div className="col-md-6">
                  <input
                    type="text"
                    className="addmanuallytext1"
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard.productname
                        : "Product Name"
                    }
                    name="productName"
                    value={this.state.productName}
                    onChange={this.handleManuallyOnchange}
                    disabled={this.state.isUnknown}
                    autoComplete="off"
                  />
                  {this.state.orderErrors.productName && (
                    <p style={{ color: "red" }}>
                      {this.state.orderErrors.productName}
                    </p>
                  )}
                </div>
              </div>

              <div className="row m-b-10 m-l-10 m-r-10">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="addmanuallytext1"
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard.categoryname
                        : "Category Name"
                    }
                    name="categoryName"
                    value={this.state.categoryName}
                    onChange={this.handleManuallyOnchange}
                    disabled={this.state.isUnknown}
                    autoComplete="off"
                  />
                  {this.state.orderErrors.categoryName && (
                    <p style={{ color: "red" }}>
                      {this.state.orderErrors.categoryName}
                    </p>
                  )}
                </div>
                <div className="col-md-6 dapic">
                  <DatePicker
                    selected={this.state.manufacturingDate}
                    onChange={(date) =>
                      this.handleByDateCreate(date, "manufacturingDate")
                    }
                    placeholderText={
                      TranslationContext !== undefined
                        ? TranslationContext.label.manufacturingDate
                        : "Manufacturing Date"
                    }
                    showMonthDropdown
                    showYearDropdown
                    className="addmanuallytext1"
                  // className="form-control"
                  />
                  {this.state.orderErrors.manufacturingDate && (
                    <p style={{ color: "red" }}>
                      {this.state.orderErrors.manufacturingDate}
                    </p>
                  )}
                </div>
              </div>

              <div className="row m-b-10 m-l-10 m-r-10">
                <div className="col-md-6 dapic">
                  <DatePicker
                    selected={this.state.expiryBestBeforeDate}
                    onChange={(date) =>
                      this.handleByDateCreate(date, "expiryBestBeforeDate")
                    }
                    placeholderText={
                      TranslationContext !== undefined
                        ? TranslationContext.label.expirybestbeforedate
                        : "Expiry/Best Before Date"
                    }
                    showMonthDropdown
                    showYearDropdown
                    className="addmanuallytext1"
                    name="expiryBestBeforeDate"

                  // className="form-control"
                  />
                  {this.state.orderErrors.expiryBestBeforeDate && (
                    <p style={{ color: "red" }}>
                      {this.state.orderErrors.expiryBestBeforeDate}
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  {/* <select
                    value={this.state.selectedTicketSource}
                    onChange={this.setTicketSourceValue}
                    className="category-select-system dropdown-label"
                  >
                    <option>Sources</option>
                    {this.state.TicketSourceData !== null &&
                      this.state.TicketSourceData.map((item, i) => (
                        <option key={i} value={item.ticketSourceId}>
                          {item.ticketSourceName}
                        </option>
                      ))}
                  </select> */}
                  <select
                    value={this.state.channelOfPurchaseID}
                    onChange={this.handleManuallyOnchange}
                    disabled={this.state.isUnknown}
                    name="channelOfPurchaseID"
                    className="category-select-system dropdown-label"
                  >
                    <option>
                      {TranslationContext !== undefined
                        ? TranslationContext.label.channelofpurchase
                        : "Channel Of Purchase"}
                    </option>
                    {this.state.ChannelOfPurchaseData !== null &&
                      this.state.ChannelOfPurchaseData.map((item, i) => (
                        <option key={i} value={item.channelOfPurchaseID}>
                          {item.nameOfChannel}
                        </option>
                      ))}
                  </select>

                  {this.state.orderErrors.channelOfPurchaseName && (
                    <p style={{ color: "red" }}>
                      {this.state.orderErrors.channelOfPurchaseName}
                    </p>
                  )}
                </div>
              </div>

              <div className="row m-b-10 m-l-10 m-r-10">
                <div className="col-md-6">
                  <select
                    className="category-select-system dropdown-label"
                    value={this.state.modeOfPayment}
                    onChange={this.setModePaymentValue}
                  >
                    <option
                      value=""
                      className="select-sub-category-placeholder"
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard.modepayment
                        : "Mode Of Payment"}
                    </option>
                    {this.state.modeData !== null &&
                      this.state.modeData.map((item, i) => (
                        <option
                          key={i}
                          value={item.paymentModeID}
                          className="select-category-placeholder"
                        >
                          {item.paymentModename}
                        </option>
                      ))}
                  </select>
                  {this.state.orderErrors.modeOfPaymentName && (
                    <p style={{ color: "red" }}>
                      {this.state.orderErrors.modeOfPaymentName}
                    </p>
                  )}
                </div>
                <div className="col-md-6 dapic">
                  <DatePicker
                    selected={this.state.OrderCreatDate}
                    onChange={(date) =>
                      this.handleByDateCreate(date, "orderCreatedDate")
                    }
                    placeholderText={
                      TranslationContext !== undefined
                        ? TranslationContext.label.date
                        : "Date"
                    }
                    showMonthDropdown
                    showYearDropdown
                    className="addmanuallytext1"
                  // className="form-control"
                  />
                  {this.state.orderErrors.OrderCreatDate && (
                    <p style={{ color: "red" }}>
                      {this.state.orderErrors.OrderCreatDate}
                    </p>
                  )}
                </div>
              </div>

              <div className="row m-b-10 m-l-10 m-r-10">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="addmanuallytext1"
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard.mrp
                        : "MRP"
                    }
                    name="orderMRP"
                    value={this.state.orderMRP}
                    onChange={this.handleNumberOnchange}
                    autoComplete="off"
                  />
                  {this.state.orderErrors.orderMRP && (
                    <p style={{ color: "red" }}>
                      {this.state.orderErrors.orderMRP}
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="addmanuallytext1"
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.span.pricepaid
                        : "Price Paid"
                    }
                    name="pricePaid"
                    value={this.state.pricePaid}
                    onChange={this.handleNumberOnchange}
                    autoComplete="off"
                  />
                  {this.state.orderErrors.pricePaid && (
                    <p style={{ color: "red" }}>
                      {this.state.orderErrors.pricePaid}
                    </p>
                  )}
                </div>
              </div>

              <div className="row m-b-10 m-l-10 m-r-10">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="addmanuallytext1"
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.label.discount
                        : "Discount"
                    }
                    name="discount"
                    value={this.state.discount}
                    onChange={this.handleNumberOnchange}
                    autoComplete="off"
                  />
                  {this.state.orderErrors.discount && (
                    <p style={{ color: "red" }}>
                      {this.state.orderErrors.discount}
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    className="addmanuallytext1"
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.label.size
                        : "Size"
                    }
                    name="size"
                    value={this.state.size}
                    // onChange={this.handleNumberOnchange}
                    onChange={this.handleManuallyOnchange}
                    disabled={this.state.isUnknown}
                    autoComplete="off"
                  />
                  {this.state.orderErrors.size && (
                    <p style={{ color: "red" }}>
                      {this.state.orderErrors.size}
                    </p>
                  )}
                </div>
              </div>

              <div className="row m-b-10 m-l-10 m-r-10">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="addmanuallytext1"
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard.requiredsize
                        : "Required Size"
                    }
                    name="requiredSize"
                    value={this.state.requiredSize}
                    // onChange={this.handleNumberOnchange}
                    onChange={this.handleManuallyOnchange}
                    disabled={this.state.isUnknown}
                    autoComplete="off"
                  />
                  {this.state.orderErrors.requiredSize && (
                    <p style={{ color: "red" }}>
                      {this.state.orderErrors.requiredSize}
                    </p>
                  )}
                </div>
                <div className="col-md-6 drpdwn-order">
                  {/* <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder="Purchase from Store name"
                        name="purchaseFrmStorName"
                        value={this.state.purchaseFrmStorName}
                        onChange={this.handleManuallyOnchange}
disabled={this.state.isUnknown}
                      /> */}
                  <ReactAutocomplete
                    wrapperStyle={{ display: "block", position: "relative" }}
                    getItemValue={(item) => item.storeName}
                    items={this.state.SearchItem}
                    renderItem={(item, isHighlighted, i) => (
                      <div
                        style={{
                          background: isHighlighted ? "lightgray" : "white",
                        }}
                        value={item.storeID}
                        key={i}
                      >
                        {item.storeName}
                      </div>
                    )}
                    renderInput={function (props) {
                      return (
                        <input
                          placeholder={
                            TranslationContext !== undefined
                              ? TranslationContext.ticketingDashboard
                                .purchasefromstorename
                              : "Purchase from Store name"
                          }
                          className="addmanuallytext1"
                          type="text"
                          {...props}
                        />
                      );
                    }}
                    onChange={this.handlePurchaseStoreName.bind(this, "store")}
                    onSelect={this.HandleSelectdata.bind(
                      this,
                      (item) => item.storeID,
                      "store"
                    )}
                    value={this.state.purchaseFrmStorName["store"]}
                  />

                  {this.state.orderErrors.purchaseFromStoreName && (
                    <p style={{ color: "red" }}>
                      {this.state.orderErrors.purchaseFromStoreName}
                    </p>
                  )}
                  {/* {this.state.purchaseFrmStorID === 0 && (
                    <p style={{ color: "red", marginBottom: "0px" }}>
                      {this.state.validPurchaseStoreName}
                    </p>
                  )} */}
                </div>
              </div>

              <div className="row m-b-10 m-l-10 m-r-10">
                <div className="col-md-6">
                  <input
                    type="text"
                    className="addmanuallytext1"
                    placeholder={
                      TranslationContext !== undefined
                        ? TranslationContext.ticketingDashboard
                          .purchasefromstoreaddres
                        : "Purchase from Store Address"
                    }
                    name="purchaseFrmStorAddress"
                    value={this.state.purchaseFrmStorAddress}
                    onChange={this.handleManuallyOnchange}
                    disabled={this.state.isUnknown}
                  />
                  {this.state.orderErrors.purchaseFrmStorAddress && (
                    <p style={{ color: "red" }}>
                      {this.state.orderErrors.purchaseFrmStorAddress}
                    </p>
                  )}
                </div>

                <div className="col-md-6">
                  <label
                    htmlFor="order-upload"
                    style={{
                      fontWeight: "900",
                      paddingLeft: "1.2rem",
                      cursor: "pointer",
                    }}
                    className="addmanuallytext1"
                  >
                    Upload Image
                  </label>
                  <input
                    multiple
                    type="file"
                    id="order-upload"
                    style={{ display: "none" }}
                    onChange={this.handleOrderUploadChange}
                  />
                  {this.state.orderUpload.length > 0 && (
                    <p
                      style={{ color: "#2561a8", cursor: "pointer" }}
                      onClick={this.handleOpenImageModal}
                    >
                      {this.state.orderUpload.length} Files Selected
                    </p>
                  )}{" "}
                </div>
              </div>

              <Modal
                onClose={this.handleCloseImageModal}
                open={this.state.uploadedImageModal}
                center
              >
                {this.state.editAddedOrderModal
                  ? this.state.editOrderModalData.orderUpload &&
                  this.state.editOrderModalData.orderUpload.map(
                    (img, index) => {
                      return (
                        <div
                          className="d-flex justify-content-between p-3 align-items-center mb-2"
                          style={{
                            border: "1px solid #2561a8",
                            borderRadius: "5px",
                            width: "350px",
                          }}
                        >
                          <p style={{ color: "#2561a8", fontWeight: "600" }}>
                            {img.name}
                          </p>
                          <img
                            src={blueCancel}
                            height="18"
                            width="18"
                            alt="cancel-icon"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              this.handleDeleteSelectedImageInEditModal(index)
                            }
                          />
                        </div>
                      );
                    }
                  )
                  : this.state.orderUpload.length > 0 &&
                  this.state.orderUpload.map((img, index) => {
                    return (
                      <div
                        className="d-flex justify-content-between p-3 align-items-center mb-2"
                        style={{
                          border: "1px solid #2561a8",
                          borderRadius: "5px",
                          width: "350px",
                        }}
                      >
                        <p style={{ color: "#2561a8", fontWeight: "600" }}>
                          {img.name}
                        </p>
                        <img
                          src={blueCancel}
                          height="18"
                          width="18"
                          alt="cancel-icon"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            this.handleDeleteSelectedImage(index)
                          }
                        />
                      </div>
                    );
                  })}
              </Modal>

              <div className="row m-b-10 m-l-10 m-r-10">
                <div className="col-md-4">
                  <button
                    className="addmanual m-t-15"
                    onClick={this.handleAddOrders}
                  >
                    Add
                  </button>
                </div>
              </div>

              <div id="orderitemtable">
                <Table
                  dataSource={this.state.addedOrders}
                  className="components-table-demo-nested custom-antd-table p-4"
                  columns={[
                    {
                      title: "Order ID",
                      render: (row) => {
                        return <p>{row.orderId}</p>;
                      },
                    },
                    {
                      title: "Bill ID",
                      render: (row) => {
                        return <p>{row.billId}</p>;
                      },
                    },
                    {
                      title: "Sub Order ID",
                      render: (row) => {
                        return <p>{row.subOrderId}</p>;
                      },
                    },
                    {
                      title: "Batch No",
                      render: (row) => {
                        return <p>{row.batchNo}</p>;
                      },
                    },

                    {
                      title: "Product Bar Code",
                      render: (row) => {
                        return <p>{row.productBarCode}</p>;
                      },
                    },

                    {
                      title: "Product Name",
                      render: (row) => {
                        return <p>{row.productName}</p>;
                      },
                    },
                    {
                      title: "Category Name",
                      render: (row) => {
                        return <p>{row.categoryName}</p>;
                      },
                    },
                    {
                      title: "Manufacturing Date",
                      render: (row) => {
                        return (
                          <p>
                            {moment(row.manufacturingDate).format("DD-MM-YYYY")}
                          </p>
                        );
                      },
                    },
                    {
                      title: "Expiry/Best Before Date",
                      render: (row) => {
                        return (
                          <p>
                            {moment(row.expiryBestBeforeDate).format(
                              "DD-MM-YYYY"
                            )}
                          </p>
                        );
                      },
                    },
                    {
                      title: "Channel Of Purchase",
                      render: (row) => {
                        return <p>{row.channelOfPurchaseName}</p>;
                      },
                    },
                    {
                      title: "Mode Of Payment",
                      render: (row) => {
                        return <p>{row.modeOfPaymentName}</p>;
                      },
                    },
                    {
                      title: "Date",
                      render: (row) => {
                        return (
                          <p>
                            {moment(row.orderCreatedDate).format("DD-MM-YYYY")}
                          </p>
                        );
                      },
                    },
                    {
                      title: "MRP",
                      render: (row) => {
                        return <p>{row.orderMRP}</p>;
                      },
                    },
                    {
                      title: "Price Paid",
                      render: (row) => {
                        return <p>{row.pricePaid}</p>;
                      },
                    },
                    {
                      title: "Discount",
                      render: (row) => {
                        return <p>{row.discount}</p>;
                      },
                    },
                    {
                      title: "Size",
                      render: (row) => {
                        return <p>{row.size}</p>;
                      },
                    },
                    {
                      title: "Required Size",
                      render: (row) => {
                        return <p>{row.requiredSize}</p>;
                      },
                    },
                    {
                      title: "Purchase from Store Name",
                      render: (row) => {
                        return <p>{row.purchaseFromStoreName}</p>;
                      },
                    },
                    {
                      title: "Purchase from Store Address",
                      render: (row) => {
                        return <p>{row.purchaseFromStoreAddress}</p>;
                      },
                    },
                    {
                      title: "Uploaded Images",
                      render: (row) => {
                        return row.orderUpload.length > 0 ? (
                          row.orderUpload.map((img) => {
                            return <p>{img.name}</p>;
                          })
                        ) : (
                          <p>No Image</p>
                        );
                      },
                    },
                    {
                      title: "Actions",
                      render: (row, item, index) => {
                        return (
                          <div>
                            <img
                              src={edit}
                              height="15"
                              width="15"
                              alt="edit-icon"
                              className="mr-2"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                this.handleOpenEditOrderModal(row, index)
                              }
                            />
                            <img
                              src={circleCancel}
                              height="15"
                              width="15"
                              alt="delete-icon"
                              style={{ cursor: "pointer" }}
                              onClick={() => this.handleDeleteAddedOrder(index)}
                            />
                          </div>
                        );
                      },
                    },
                  ]}
                ></Table>
              </div>

              <Modal
                onClose={this.handleCloseEditOrderModal}
                open={this.state.editAddedOrderModal}
              >
                <div>
                  <div className="row m-b-10 m-l-10 m-r-10 m-t-10">
                    <div className="col-md-6">
                      <label className="addmanuallytext">
                        Edit Order Details
                      </label>
                    </div>
                  </div>
                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.p.orderid
                            : "Order ID"
                        }
                        name="orderId"
                        value={this.state.editOrderModalData.orderId || null}
                        onChange={this.handleEditOrderModalOnChange}
                      />
                      {this.state.editOrderErrors.orderId && (
                        <p style={{ color: "red" }}>
                          {this.state.editOrderErrors.orderId}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.ticketingDashboard.billid
                            : "Bill ID"
                        }
                        name="billId"
                        value={this.state.editOrderModalData.billId || null}
                        onChange={this.handleEditOrderModalOnChange}
                      />
                      {this.state.editOrderErrors.billId && (
                        <p style={{ color: "red" }}>
                          {this.state.editOrderErrors.billId}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.p.suborderid
                            : "Sub Order ID"
                        }
                        name="subOrderId"
                        value={this.state.editOrderModalData.subOrderId || null}
                        onChange={this.handleEditOrderModalOnChange}
                      />
                      {this.state.editOrderErrors.subOrderId && (
                        <p style={{ color: "red" }}>
                          {this.state.editOrderErrors.subOrderId}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.ticketingDashboard.batchno
                            : "Bill ID"
                        }
                        name="batchNo"
                        value={this.state.editOrderModalData.batchNo || null}
                        onChange={this.handleEditOrderModalOnChange}
                      />
                      {this.state.editOrderErrors.batchNo && (
                        <p style={{ color: "red" }}>
                          {this.state.editOrderErrors.batchNo}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.ticketingDashboard
                              .productbarcode
                            : "Product Bar Code"
                        }
                        name="productBarCode"
                        value={
                          this.state.editOrderModalData.productBarCode || null
                        }
                        onChange={this.handleEditOrderModalOnChange}
                        autoComplete="off"
                      />
                      {this.state.editOrderErrors.productBarCode && (
                        <p style={{ color: "red" }}>
                          {this.state.editOrderErrors.productBarCode}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.ticketingDashboard.productname
                            : "Product Name"
                        }
                        name="productName"
                        value={
                          this.state.editOrderModalData.productName || null
                        }
                        onChange={this.handleEditOrderModalOnChange}
                        autoComplete="off"
                      />
                      {this.state.editOrderErrors.productName && (
                        <p style={{ color: "red" }}>
                          {this.state.editOrderErrors.productName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.ticketingDashboard.categoryname
                            : "Category Name"
                        }
                        name="categoryName"
                        value={
                          this.state.editOrderModalData.categoryName || null
                        }
                        onChange={this.handleEditOrderModalOnChange}
                        autoComplete="off"
                      />
                      {this.state.editOrderErrors.categoryName && (
                        <p style={{ color: "red" }}>
                          {this.state.editOrderErrors.categoryName}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6 dapic">
                      <DatePicker
                        selected={
                          this.state.editOrderModalData.manufacturingDate
                        }
                        onChange={(date) =>
                          this.handleEditByDateCreate(date, "manufacturingDate")
                        }
                        placeholderText="Manufacturing Date"
                        showMonthDropdown
                        showYearDropdown
                        className="addmanuallytext1"

                      // className="form-control"
                      />
                      {this.state.editOrderErrors.manufacturingDate && (
                        <p style={{ color: "red" }}>
                          {this.state.editOrderErrors.manufacturingDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6 dapic">
                      <DatePicker
                        selected={
                          this.state.editOrderModalData.expiryBestBeforeDate
                        }
                        onChange={(date) =>
                          this.handleEditByDateCreate(
                            date,
                            "expiryBestBeforeDate"
                          )
                        }
                        placeholderText="Expiry/Best Before Date"
                        showMonthDropdown
                        showYearDropdown
                        className="addmanuallytext1"
                      // className="form-control"
                      />
                      {this.state.editOrderErrors.expiryBestBeforeDate && (
                        <p style={{ color: "red" }}>
                          {this.state.editOrderErrors.expiryBestBeforeDate}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      {/* <select
                    value={this.state.selectedTicketSource}
                    onChange={this.setTicketSourceValue}
                    className="category-select-system dropdown-label"
                  >
                    <option>Sources</option>
                    {this.state.TicketSourceData !== null &&
                      this.state.TicketSourceData.map((item, i) => (
                        <option key={i} value={item.ticketSourceId}>
                          {item.ticketSourceName}
                        </option>
                      ))}
                  </select> */}
                      <select
                        value={
                          this.state.editOrderModalData.channelOfPurchaseID ||
                          null
                        }
                        onChange={this.handleEditOrderModalOnChange}
                        name="channelOfPurchaseID"
                        className="category-select-system dropdown-label"
                      >
                        <option>
                          {TranslationContext !== undefined
                            ? TranslationContext.label.channelofpurchase
                            : "Channel Of Purchase"}
                        </option>
                        {this.state.ChannelOfPurchaseData !== null &&
                          this.state.ChannelOfPurchaseData.map((item, i) => (
                            <option key={i} value={item.channelOfPurchaseID}>
                              {item.nameOfChannel}
                            </option>
                          ))}
                      </select>
                      {this.state.editOrderErrors.channelOfPurchaseName && (
                        <p style={{ color: "red" }}>
                          {this.state.editOrderErrors.channelOfPurchaseName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <select
                        className="category-select-system dropdown-label"
                        value={
                          this.state.editOrderModalData.modeOfPayment || null
                        }
                        onChange={this.setEditModePaymentValue}
                      >
                        <option
                          value=""
                          className="select-sub-category-placeholder"
                        >
                          {TranslationContext !== undefined
                            ? TranslationContext.ticketingDashboard.modepayment
                            : "Mode Of Payment"}
                        </option>
                        {this.state.modeData !== null &&
                          this.state.modeData.map((item, i) => (
                            <option
                              key={i}
                              value={item.paymentModeID}
                              className="select-category-placeholder"
                            >
                              {item.paymentModename}
                            </option>
                          ))}
                      </select>
                      {this.state.editOrderErrors.modeOfPayment && (
                        <p style={{ color: "red" }}>
                          {this.state.editOrderErrors.modeOfPayment}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6 dapic">
                      <DatePicker
                        selected={
                          this.state.editOrderModalData.orderCreatedDate
                        }
                        onChange={(date) =>
                          this.handleEditByDateCreate(date, "orderCreatedDate")
                        }
                        placeholderText="Date"
                        showMonthDropdown
                        showYearDropdown
                        className="addmanuallytext1"
                      // className="form-control"
                      />
                      {this.state.editOrderErrors.orderCreatedDate && (
                        <p style={{ color: "red" }}>
                          {this.state.editOrderErrors.orderCreatedDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.ticketingDashboard.mrp
                            : "MRP"
                        }
                        name="orderMRP"
                        value={this.state.editOrderModalData.orderMRP || null}
                        onChange={this.handleEditNumberOnchange}
                        autoComplete="off"
                      />
                      {this.state.editOrderErrors.orderMRP && (
                        <p style={{ color: "red" }}>
                          {this.state.editOrderErrors.orderMRP}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.span.pricepaid
                            : "Price Paid"
                        }
                        name="pricePaid"
                        value={this.state.editOrderModalData.pricePaid || null}
                        onChange={this.handleEditNumberOnchange}
                        autoComplete="off"
                      />
                      {this.state.editOrderErrors.pricePaid && (
                        <p style={{ color: "red" }}>
                          {this.state.editOrderErrors.pricePaid}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.label.discount
                            : "Discount"
                        }
                        name="discount"
                        value={this.state.editOrderModalData.discount || null}
                        onChange={this.handleEditNumberOnchange}
                        autoComplete="off"
                      />
                      {this.state.editOrderErrors.discount && (
                        <p style={{ color: "red" }}>
                          {this.state.editOrderErrors.discount}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.label.size
                            : "Size"
                        }
                        name="size"
                        value={this.state.editOrderModalData.size || null}
                        // onChange={this.handleNumberOnchange}
                        onChange={this.handleEditOrderModalOnChange}
                        autoComplete="off"
                      />
                      {this.state.editOrderErrors.size && (
                        <p style={{ color: "red" }}>
                          {this.state.editOrderErrors.size}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.ticketingDashboard.requiredsize
                            : "Required Size"
                        }
                        name="requiredSize"
                        value={
                          this.state.editOrderModalData.requiredSize || null
                        }
                        // onChange={this.handleNumberOnchange}
                        onChange={this.handleEditOrderModalOnChange}
                        autoComplete="off"
                      />
                      {this.state.editOrderErrors.requiredSize && (
                        <p style={{ color: "red" }}>
                          {this.state.editOrderErrors.requiredSize}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6 drpdwn-order">
                      {/* <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder="Purchase from Store name"
                        name="purchaseFrmStorName"
                        value={this.state.purchaseFrmStorName}
                        onChange={this.handleEditOrderModalOnChange}
                      /> */}
                      <ReactAutocomplete
                        wrapperStyle={{
                          display: "block",
                          position: "relative",
                        }}
                        getItemValue={(item) => item.storeName}
                        items={this.state.SearchItem}
                        renderItem={(item, isHighlighted, i) => (
                          <div
                            style={{
                              background: isHighlighted ? "lightgray" : "white",
                            }}
                            value={item.storeID}
                            key={i}
                          >
                            {item.storeName}
                          </div>
                        )}
                        renderInput={function (props) {
                          return (
                            <input
                              placeholder={
                                TranslationContext !== undefined
                                  ? TranslationContext.ticketingDashboard
                                    .purchasefromstorename
                                  : "Purchase from Store name"
                              }
                              className="addmanuallytext1"
                              type="text"
                              name="purchaseFromStoreName"
                              {...props}
                            />
                          );
                        }}
                        onChange={this.handleEditOrderModalOnChange}
                        value={
                          this.state.editOrderModalData.purchaseFromStoreName ||
                          null
                        }
                      />

                      {this.state.editOrderErrors.orderId && (
                        <p style={{ color: "red" }}>
                          {this.state.editOrderErrors.orderId}
                        </p>
                      )}
                      {this.state.purchaseFrmStorID === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.validPurchaseStoreName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="addmanuallytext1"
                        placeholder={
                          TranslationContext !== undefined
                            ? TranslationContext.ticketingDashboard
                              .purchasefromstoreaddres
                            : "Purchase from Store Address"
                        }
                        name="purchaseFromStoreAddress"
                        value={
                          this.state.editOrderModalData
                            .purchaseFromStoreAddress || null
                        }
                        onChange={this.handleEditOrderModalOnChange}
                      />
                      {this.state.editOrderErrors.purchaseFromStoreAddress && (
                        <p style={{ color: "red" }}>
                          {this.state.editOrderErrors.purchaseFromStoreAddress}
                        </p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="edit-order-upload"
                        style={{
                          fontWeight: "900",
                          paddingLeft: "1.2rem",
                          cursor: "pointer",
                        }}
                        className="addmanuallytext1"
                      >
                        Upload Image
                      </label>
                      <input
                        multiple
                        type="file"
                        id="edit-order-upload"
                        style={{ display: "none" }}
                        onChange={this.handleEditModalOrderUploadChange}
                      />
                      {this.state.editOrderModalData.orderUpload && (
                        <p
                          style={{ color: "#2561a8", cursor: "pointer" }}
                          onClick={this.handleOpenImageModal}
                        >
                          {this.state.editOrderModalData.orderUpload.length ||
                            0}{" "}
                          Files Selected
                        </p>
                      )}{" "}
                    </div>
                  </div>

                  <div className="row m-b-10 m-l-10 m-r-10">
                    <div className="col-md-4">
                      <button
                        type="button"
                        className="addmanual m-t-15"
                        onClick={this.handleUpdateOrderModal}
                      >
                        Update
                      </button>
                    </div>
                    <div className="col-md-4">
                      <button
                        type="button"
                        className="addmanual m-t-15"
                        onClick={this.handleCloseEditOrderModal}
                      >
                        CANCEL
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>

              <div className="row m-b-10 m-l-10 m-r-10">
                <div className="col-md-4">
                  <button
                    type="button"
                    className="addmanual m-t-15"
                    onClick={this.hadleAddManuallyOrderData.bind(this)}
                  // disabled={this.state.saveLoader}
                  >
                    {/* {this.state.saveLoader ? (
                      <FontAwesomeIcon
                        className="circular-loader"
                        icon={faCircleNotch}
                        spin
                      />
                    ) : (
                      ""
                    )} */}
                    {TranslationContext !== undefined
                      ? TranslationContext.button.save
                      : "SAVE"}
                  </button>
                </div>
                <div className="col-md-4">
                  <button
                    type="button"
                    className="addmanual m-t-15"
                    onClick={this.handleChangeToggle.bind(this, "Cancel")}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.button.cancel
                      : "CANCEL"}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          {this.state.message === "Success" ? (
            <div className="reacttableordermodal ordermainrow order-det">
              <div
                className="row m-t-10 m-b-10"
                style={{ marginLeft: "0", marginRight: "0" }}
              >
                <div className="col-md-4">
                  <label
                    className="orderdetailpopup"
                    style={{ marginTop: "3px" }}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.label.orderdetails
                      : "Order Details"}
                  </label>
                </div>
                <div className="col-md-4">
                  <button
                    type="button"
                    className="addmanual"
                    onClick={this.handleChangeToggle.bind(this)}
                  >
                    {TranslationContext !== undefined
                      ? TranslationContext.ticketingDashboard.addmanually
                      : "Add Manually"}
                  </button>
                </div>
                <div className="col-md-4">
                  <div style={{ float: "right", display: "flex" }}>
                    <label
                      className="orderdetailpopup"
                      style={{ marginTop: "3px" }}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.label.order
                        : "Order"}
                    </label>
                    <div className="orderswitch orderswitchitem">
                      <div className="switch switch-primary d-inline">
                        <input
                          type="checkbox"
                          id="editTasks-p-2"
                          checked={this.state.OrdItmBtnStatus}
                          onChange={this.handleChangeOrderItem}
                        />
                        <label
                          htmlFor="editTasks-p-2"
                          className="cr cr-tick ord"
                          style={{ top: "5px" }}
                        ></label>
                      </div>
                    </div>
                    <label
                      className="orderdetailpopup"
                      style={{ marginTop: "3px" }}
                    >
                      {TranslationContext !== undefined
                        ? TranslationContext.label.item
                        : "Item"}
                    </label>
                  </div>
                </div>
              </div>
              <span className="linestore2"></span>

              <div id="orderitemtable" style={{ display: "block" }}>
                <Table
                  className="components-table-demo-nested custom-antd-table"
                  columns={[
                    {
                      title: "",
                      // dataIndex: "invoiceNumber",
                      render: (row, data) => {
                        return (
                          // <div className="filter-checkbox">
                          <div className="orders_radio_button">
                            <input
                              // className="d-none"
                              type="radio"
                              id={"all" + data.invoiceNumber}
                              name="AllOrder"
                              checked={this.state.selectedInvoiceNo.includes(
                                data.invoiceNumber
                              )}

                              // onChange={this.handleGetOderItemData.bind(
                              //   this,
                              //   data.invoiceNumber,
                              //   data
                              // )}
                              onChange={(e) => this.handleGetOderItemData(e, data.invoiceNumber, data)}
                            />
                            <label htmlFor={"all" + data.invoiceNumber}></label>
                          </div>
                        );
                      },
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.invoicenumber
                          : "Invoice Number",
                      dataIndex: "invoiceNumber",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.invoicenumber
                          : "Bill Id",
                      dataIndex: "billID",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.invoicenumber
                          : "Sub Order Id",
                      dataIndex: "subOrderID",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.invoicenumber
                          : "Batch No",
                      dataIndex: "batchNo",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.invoicenumber
                          : "Product Bar Code",
                      dataIndex: "productBarCode",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.invoicenumber
                          : "Product Name",
                      dataIndex: "productName",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.invoicenumber
                          : "Category Name",
                      dataIndex: "categoryName",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.invoicenumber
                          : "Manufacturing Date",
                      dataIndex: "manufacturingDate",
                      render: (row, data) => {
                        return data.manufacturingDate !== null
                          ? moment(data.manufacturingDate).format("Do/MMM/YYYY")
                          : "Not Added";
                      },
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.invoicenumber
                          : "Expiry/Best Before Date",
                      dataIndex: "expiryBestBeforeDate",
                      render: (row, data) => {
                        return data.expiryBestBeforeDate !== null
                          ? moment(data.expiryBestBeforeDate).format(
                            "Do/MMM/YYYY"
                          )
                          : "Not Added";
                      },
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.invoicenumber
                          : "Channel Of Purchase ",
                      dataIndex: "channelOfPurchaseID",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.invoicenumber
                          : "Mode Of Payment",
                      dataIndex: "modeOfPaymentID",
                    },

                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.invoicedate
                          : "Invoice Date",
                      dataIndex: "dateFormat",
                      render: (row, data) => {
                        return data.invoiceDate !== null
                          ? moment(data.invoiceDate).format("Do/MMM/YYYY")
                          : "Not Added";
                      },
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.itemcount
                          : "Item Count",
                      dataIndex: "itemCount",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.itemprice
                          : "Item Price",
                      dataIndex: "ordeItemPrice",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.pricepaid
                          : "Price Paid",
                      dataIndex: "orderPricePaid",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.storecode
                          : "Store Code",
                      dataIndex: "storeCode",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.storeaddress
                          : "Store Address",
                      dataIndex: "storeAddress",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.label.discount
                          : "Discount",
                      dataIndex: "discount",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.label.discount
                          : "Size",
                      dataIndex: "size",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.label.discount
                          : "Required Size",
                      dataIndex: "requireSize",
                    },
                  ]}
                  dataSource={orderDetailsData}
                  pagination={{ defaultPageSize: 5 }}
                />
              </div>

              <div
                id="ordertable"
                className="order-detc2"
                style={{ display: "none" }}
              >
                <Table
                  className="components-table-demo-nested custom-antd-table"
                  columns={[
                    {
                      title: "",
                      // dataIndex: "invoiceNumber",
                      render: (row, data) => {
                        return (
                          <div className="filter-checkbox">
                            <input
                              type="checkbox"
                              id={"all" + data.invoiceNumber}
                              name="AllOrder"
                              // checked={this.state.selectedInvoiceNo.includes(
                              //   data.invoiceNumber
                              // )}
                              checked={
                                this.state.SelectedAllItem[0]?.invoiceNumber === data.invoiceNumber ? true : false}
                              className="d-none"
                              // onChange={this.handleGetOderItemData.bind(
                              //   this,
                              //   data.invoiceNumber,
                              //   data
                              // )}
                              onChange={(e) => this.handleGetOderItemData(e, data.invoiceNumber, data)}
                            />
                            <label htmlFor={"all" + data.invoiceNumber}></label>
                          </div>
                        );
                      },
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.invoicenumber
                          : "Invoice Number",
                      dataIndex: "invoiceNumber",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.invoicedate
                          : "Invoice Date",
                      dataIndex: "invoiceDate",
                      render: (row, data) => {
                        return data.invoiceDate !== null
                          ? moment(data.invoiceDate).format("Do/MMM/YYYY")
                          : "Not Added";
                      },
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.itemcount
                          : "Item Count",
                      dataIndex: "itemCount",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.itemprice
                          : "Item Price",
                      dataIndex: "ordeItemPrice",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.pricepaid
                          : "Price Paid",
                      dataIndex: "orderPricePaid",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.storecode
                          : "Store Code",
                      dataIndex: "storeCode",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.span.storeaddress
                          : "Store Address",
                      dataIndex: "storeAddress",
                    },
                    {
                      title:
                        TranslationContext !== undefined
                          ? TranslationContext.label.discount
                          : "Discount",
                      dataIndex: "discount",
                    },
                  ]}
                  onExpand={(data, row) => this.handleGetOderItemData({
                    target: {
                      checked: true,
                    },
                  }, "", row)}
                  expandedRowRender={(row) => {

                    return (
                      <Table
                        // dataSource={this.state.OrderSubItem}
                        dataSource={this.state.OrderSubItem.filter(
                          (x) => x.invoiceNumber === row.invoiceNumber
                        )}
                        columns={[
                          {
                            title: "",
                            // dataIndex: "invoiceNumber",
                            render: (row, item) => {
                              return (
                                <div className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    className="d-none"
                                    id={"item" + item.orderItemID}
                                    name="AllItem"
                                    checked={
                                      this.state.CheckBoxAllItem[
                                      item.orderItemID
                                      ] === true
                                    }
                                    onChange={this.checkIndividualItem.bind(
                                      this,
                                      item.orderItemID,
                                      item
                                    )}
                                  />
                                  <label
                                    htmlFor={"item" + item.orderItemID}
                                  ></label>
                                </div>
                              );
                            },
                          },
                          {
                            title:
                              TranslationContext !== undefined
                                ? TranslationContext.span.articlenumber
                                : "Article Number",
                            dataIndex: "articleNumber",
                          },
                          {
                            title:
                              TranslationContext !== undefined
                                ? TranslationContext.span.articlename
                                : "Article Name",
                            dataIndex: "articleName",
                          },
                          {
                            title:
                              TranslationContext !== undefined
                                ? TranslationContext.ticketingDashboard
                                  .articlemrp
                                : "Article MRP",
                            dataIndex: "itemPrice",
                          },
                          {
                            title:
                              TranslationContext !== undefined
                                ? TranslationContext.span.pricepaid
                                : "Price Paid",
                            dataIndex: "pricePaid",
                          },
                          {
                            title:
                              TranslationContext !== undefined
                                ? TranslationContext.label.discount
                                : "Discount",
                            dataIndex: "discount",
                          },
                          {
                            title:
                              TranslationContext !== undefined
                                ? TranslationContext.ticketingDashboard
                                  .requiredsize
                                : "Required Size",
                            dataIndex: "requireSize",
                            render: (data, record) => {
                              return (
                                <div>
                                  <input
                                    type="text"
                                    id={"requireSizeTxt" + record.articleNumber}
                                    value={record.requireSize || ""}
                                    name="requiredSize"
                                    className="order-input"
                                    autoComplete="off"
                                    onChange={() => {
                                      this.handleRequireSize(this, record);
                                    }}
                                  />
                                </div>
                              );
                            },
                          },
                        ]}
                        // rowSelection={rowSelection}
                        pagination={true}
                      />
                    );
                  }}
                  pagination={true}
                  dataSource={orderDetailsData}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default TicketSystemOrder;
