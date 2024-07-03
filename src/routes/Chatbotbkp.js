import React, { Component, PureComponent } from "react";
import axios from "axios";
import Modal from "react-responsive-modal";
import Demo from "../store/Hashtag";
import UserImg from "./../assets/Images/user-info.png";
import ReactTable from "react-table";
import { NotificationManager } from "react-notifications";
import SearchBlackImg from "./../assets/Images/searchBlack.png";
import ChatThumbImg from "./../assets/Images/chatthumb.png";
import { Drawer, notification, Table, Empty, Popover, Radio } from "antd";
import CancelImg from "./../assets/Images/cancel.png";
import { encryption } from "../helpers/encryption";
import Triangle from "../assets/Images/triangle.png";  
import SchRight from "../assets/Images/sch-right.png";
import FileAttachmentIcon from "../assets/Images/attachmentIcon.png";
import DotMenuIcon from "../assets/Images/dot menu icon.png";
import NumberMenuIcon from "../assets/Images/number menu icon.png";
import PlainMenuIcon from "../assets/Images/plain menu icon.png";
import PhotoInsertIcon from "../assets/Images/photoUploadIcon.png";
import smilyFaceIcon from "../assets/Images/smilyfaceIcon.png";
import leftBackArrowIcon from "../assets/Images/black-left-arrow.png";
import downArrowWhite from "../assets/Images/downArrow-white.png";
import headphoneIcon from "../assets/Images/headphone2.png";
import { socket } from "../helpers/SocketConnection";
import ChatService from "../Services/ChatService";
import { authHeader } from "../helpers/authHeader";
import Assign from "../assets/Images/sent-icon.svg";
import config from "../helpers/config";
import Dropzone from "react-dropzone";
import AttachmentIcon from "../assets/Images/attachmentIcon.png";
import imageCompression from "browser-image-compression";
import CKEditor from "ckeditor4-react";
import { Markup } from "interweave";
var uid = 0;
class ChatNotificationComponent extends PureComponent {
  // handleChatNotificationClick = () => {
  //   if (this.props.notitficationType === "NewChat") {
  //     this.props.handleChatNotificationClick(this.props.chatData);
  //   } else {
  //     this.props.handleChatNotificationClick(this.props.chatData);
  //   }
  // };

  render() {
   

    
    return (
      <div
        className="row"
        style={{
          cursor: "pointer",
        }}
      // onClick={this.handleChatNotificationClick}
      >
        <div className="col-3">
          <div className="chat-trail-img">
            <span
              className="chat-initial"
              alt="face image"
              title={
                this.props.chatData.length > 0
                  ? this.props.chatData[0].customerName
                  : null
              }
            >
              {this.props.notitficationType === "appointmentNotification"
                ? "Appointment"
                : this.props.chatData[0].customerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
            </span>
          </div>
        </div>
        <div className="col-9">
          <h5 title="Customer Name">
            {this.props.chatData.length > 0
              ? this.props.chatData[0].customerName
              : null}
          </h5>
          <p
            style={{
              wordBreak: "break-word",
            }}
          >
            {this.props.msgData}
          </p>
        </div>
      </div>
    );
  }
}

class Chatbotbkp extends Component {
  constructor(props) {
    super(props);
    let UserData = JSON.parse(localStorage.getItem("AgentData"));
    this.state = {
      ReactChatModel: false,
      CrateTicketMdl: false,
      OpenTicketMdl: false,
      AllAcount: false,
      byCustomer: false,
      newChatsData: [],
      // newChatsData: JSON.parse(localStorage.getItem("newChatsData")),
      // ongoingChatsData: [],
      ongoingChatsData: JSON.parse(localStorage.getItem("ongoingChatsData")),
      TransferChatMdl: false,
      banVisitorMdl: false,
      programCode: window.localStorage.getItem("Programcode"),
      AgentID: UserData.agentID,
      tenantID: UserData.tenantID,
      CreateAndEndChat: false,
      chatMessageCount: 0,
      activeTab: 1,
      messageData: [],
      agentData: [],
      messageListLoader: false,
      pastChatCount: 0,
      chatId: 0,
      pageNumberCurrentChat: 1,
      pastChatPageNo: 1,
      UserName: "",
      NameTag: "",
      AttachementFiles: [],
      message: "",
      isgrammarlyCheck: true, //this is hardcore value, need to ckeck after api work done
      storeAgentDetail: [],
      brandData: [],
      categoryData: [],
      subCategoryData: [],
      issueTypeData: [],
      sourceType: "cb",
      mobileNo: "",
      storeCode: "",
      customerId: 0,
      historicalChatData: [],
      isHistoricalChat: false,
      isHistoricalChatLoading: false,
      loading: false,
      rowChatId: 0,
      showHistoricalChat: false,
      chatTimeAgo: "",
      isPastChatLoading: false,
      messageHistoryChatData: [],
      isCustEndChat: false,
      isCustTimeout: false,
      customerName: "",
      customerOpenTickets: 0,
      customerTotalTickets: 0,
      colorCode: [
        "#E8E8E8",
        "#FFE8A7",
        "#DAF3C0",
        "#DDF6FC",
        "#CDE4FF",
        "#FFDEE2",
      ],
      recentChatCount: 0,
      selectedBrand: "",
      selectedBrandName: "",
      selectedCategory: "",
      selectedCategoryName: "",
      selectedSubCategory: "",
      selectedIssueTypeName: "",
      selectedIssueType: "",
      selectedIssueTypeName: "",
      mainTabSelect: 1,
      pastChatTableRowSizeExpanded: 10,
      pastChatTableRowSizeShrinked: 5,

      TicketTitle: "",
      TicketDescription: "",
      TicketEmail: "",
      TicketDOB: "",
      CustomerOpenTicketList: [],
      chatbotRightToggle: "chatbotRightClose",
      isScrollMessage: false,
      isCallChatMessgaeApi: false,
      isScroll: false,
      chatBoxHeight: "68%",
      chatBoxHeightShrinked: "61%",
      chatBoxHeightShrinkedForAttachment: "63%",
      chatBoxHeightShrinkedForAttachmentAndEndChat: "56%",
      typingBoxHeight: "23%",
      banReasonData: [],
      selectedBanReason: 0,
      banCustomerData: [],
      recentChatTabClass: "",
      currentChatTabClass: "show active",
      recentChatNavlinkClass: "",
      currentChatNavlinkClass: "active",
      displayActionButton: "inline",
      isAgentFilterApplied: false,
      filteredAgentData: [],
      TargatedAgentEmail: "",
      TargatedAgentDesignation: "",
      TargatedAgentName: "",
      visitorNote: "",
      selectedAgentIDToTransferchat: 0,
      Profane_Words: [],
      Suggested_Words: {},
      selectedSuggested_Words: {},
      isgrammarlyCheck: false,
      grammarlyModal: false,
      suggestionType: "1",
      attachementViewModal: false,
      attachmentUrl: "",
      attachmentDocUrl: "",
      suggestionText: "",
      newChatSoundVolume: 0,
      newMessageSoundVolume: 0,
      isNotiNewChat: false,
      isNotiNewMessage: false,
      newChatSoundID: 0,
      newMessageSoundID: 0,
      notificationTime: 0,
      nsId: 0,
      ShortcutList: [],
      shortcutModal: false,
      shortcutID: 0,
      ckeditorAdd: "",
      categoryCompulsion: "",
      subCategoryCompulsion: "",
      issueTypeCompulsion: "",
      brandCompulsion: "",
      closeChatWithticketCreation: false,
      isAttachmentMainLoader: false,
      isValidEmail: true
    };
    this.handleReactChatModelOpen = this.handleReactChatModelOpen.bind(this);
    this.handleGetBrandList = this.handleGetBrandList.bind(this);
    this.handleGetCategoryList = this.handleGetCategoryList.bind(this);
    this.handleGetSubCategoryList = this.handleGetSubCategoryList.bind(this);
    this.handleGetIssueType = this.handleGetIssueType.bind(this);
    this.handleCreateTicketBtn = this.handleCreateTicketBtn.bind(this);
    this.handleGetBanReasonList = this.handleGetBanReasonList.bind(this);
    this.handleBanReasonChange = this.handleBanReasonChange.bind(this);
    this.handleBanCustomer = this.handleBanCustomer.bind(this);
    this.handleMessageDivScroll = this.handleMessageDivScroll.bind(this);
    this.handleCreateTicketCancelBtn = this.handleCreateTicketCancelBtn.bind(
      this
    );
    this.handleBanVisitorConfirmation = this.handleBanVisitorConfirmation.bind(
      this
    );
    this.handleBanVisitorClear = this.handleBanVisitorClear.bind(
      this
    );
    this.handleGetNewChat = this.handleGetNewChat.bind(this);
    this.handleAddVisitorNote = this.handleAddVisitorNote.bind(this);
    this.handleGetVisitorNote = this.handleGetVisitorNote.bind(this);
    this.handleGetAllShortcut = this.handleGetAllShortcut.bind(this);
    this.onAddCKEditorChange = this.onAddCKEditorChange.bind(this);
    this.ChatService = new ChatService();
  }

  componentDidMount() {
    this.handleGetBrandList();
    this.handleGetBanReasonList();
    this.handleGetAgentList();
    this.handleGetAllShortcut();
    localStorage.setItem("isOngoingClick", false);
    let agentId = 0;
    let tenantID = 0;
    let programCode = "";
    let UserProfile = JSON.parse(localStorage.getItem("UserProfile"));
    if (this.props.location.state) {
      
      agentId = this.props.location.state.agentId;
      tenantID = this.props.location.state.tenantID;
      programCode = this.props.location.state.programCode;
    }
     else {
      let UserData = JSON.parse(localStorage.getItem("AgentData"));
      // let ChatSoundNotiSetting = JSON.parse(
      //   localStorage.getItem("ChatSoundNotiSetting")
      // );
      agentId = UserData.agentID;
      programCode = UserData.programCode;
      tenantID = UserData.tenantID;
    }
   
    var strTag = UserProfile.agentName.split(" ");
    var nameTag = strTag[0].charAt(0).toUpperCase();
    if (strTag.length > 0) {
      nameTag += strTag[1].charAt(0).toUpperCase();
    }

    console.log(localStorage.getItem("newChatsData"), "JSON.parse(localStorage.getIt");
    let newChatsData1 = localStorage.getItem("newChatsData") !== "" ?
      JSON.parse(localStorage.getItem("newChatsData")) : []
    this.setState({
      programCode: programCode,
      AgentID: agentId,
      sAgentId: agentId,
      NameTag: nameTag,
      storeAgentDetail: UserProfile,
      sourceType: "cb",
      mobileNo: "",
      storeCode: "",
      UserName: UserProfile.agentName,
      tenantID: tenantID,
      newChatsData: newChatsData1
    });
    setTimeout(() => {
      var objNewChat = {
        userMaster_ID: agentId,
        tenant_ID: tenantID,
        ProgramCode: programCode,
        ChatId: 0,
      };
      socket.emit("CallSetCurrentChatSP", objNewChat);
    }, 2000);

    //localStorage.setItem("newChatsData", JSON.stringify([]));

    let soundFile = JSON.parse(
      window.localStorage.getItem("newMessageSoundFile")
    );

    if (!soundFile) {
      this.handleGetChatSoundNotiSetting();
    } 
    else {
      this.setState
      socket.on(
        "CallOngoingSP" +
        state.programCode.toLowerCase() + state.AgentID,
        function (data) {
          console.log("inside callongoing")
          console.log("data572",data)
          // 
          var ongoingChatsData = [];
          let ongoingUnreadCount = 0
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              var objData = {};
              objData.chatID = data[i].CurrentChatID;
              objData.storeID = data[i].StoreID;
              objData.programCode = data[i].ProgramCode;
              objData.customerID = data[i].CustomerID;
              objData.customerName = data[i].CustomerName;
              objData.mobileNo = data[i].CustomerNumber;
              objData.messageCount = data[i].NewMessageCount;
              objData.timeAgo = data[i].TimeAgo;
              objData.createdDate = data[i].CreatedDate;
              objData.storeManagerId = data[i].StoreManagerId;
              objData.storeManagerName = data[i].StoreManagerName;
              ongoingUnreadCount += data[i].NewMessageCount
             
              objData.sourceName = data[i].SourceName;
              objData.chatSourceID = data[i].SourceID;
              objData.sourceAbbr = data[i].SourceAbbr;
              objData.sourceIconUrl = data[i].SourceIconUrl;
              ongoingChatsData.push(objData);
            }
          }
           console.log("ongoingChatsData",ongoingChatsData)
          localStorage.setItem(
            "ongoingChatsData",
            JSON.stringify(ongoingChatsData)
          );

          if (ongoingChatsData.length > 0) {
            for (let i = 0; i < ongoingChatsData.length; i++) {
              ongoingChatsData[i].initialColor =
                state.colorCode[Math.floor(Math.random() * 6)];
            }
          }
         // setState({ ongoingChatsData });
         
          localStorage.setItem("ongoingUnreadCount", ongoingUnreadCount);

        }
      );({
        newMessageSoundFile: JSON.parse(
          window.localStorage.getItem("newMessageSoundFile")
        ),
        newChatSoundFile: JSON.parse(
          window.localStorage.getItem("newChatSoundFile")
        ),
      });
    }

    let checkIFNotiClicked = localStorage.getItem("isNotiClicked");
    if (
      checkIFNotiClicked === true &&
      this.props.location.action === "redirectToChat"
    ) {
    } 
    else {
      //this.handleCreateSocketConnection(this.state.programCode);
      let self = this;
      if (programCode !== "") {
        console.log("test")
        socket.on(programCode.toLowerCase() + this.state.AgentID, function (
          data
        ) {
          
          console.log("datachatbot",data)
          // console.log("programCode.toLowerCase() + this.state.AgentID", this.state.AgentID)
          var chatData;
          if (self.state.programCode !== "" && data[4] !== "" && data[4]) {
            if (
              self.state.programCode.toLowerCase() === data[4].toLowerCase()
            ) {
              
              var isMobileNoExist = self.state.ongoingChatsData.filter(
                (x) =>
                  x.mobileNo === data[3].toString() &&
                  x.isCustEndChat === false &&
                  x.sourceAbbr === data[6]
              );
              if (isMobileNoExist.length > 0) {
                if (
                  self.state.mobileNo === data[3].toString() &&
                  self.state.sourceType === data[6]
                ) {
                  //for current chat message
                  self.setState({ sourceType: data[6] });
                  var chatId = 0;
                  let newChatMeaasgeAudio = document.getElementById(
                    "newChatMeaasgeAudio"
                  );
                  let newChatMeaasgeAudioSrc = "";
                  if (
                    JSON.parse(
                      window.localStorage.getItem("newMessageSoundFile")
                    )
                  ) {
                    newChatMeaasgeAudioSrc = JSON.parse(
                      window.localStorage.getItem("newMessageSoundFile")
                    );
                  } else {
                    newChatMeaasgeAudioSrc = self.state.newMessageSoundFile;
                  }
                  if (newChatMeaasgeAudio) {
                    newChatMeaasgeAudio.src = newChatMeaasgeAudioSrc;
                    newChatMeaasgeAudio.volume =
                      Math.round(self.state.newMessageSoundVolume / 10) / 10;
                    newChatMeaasgeAudio.play();
                  }

                  chatData = self.state.ongoingChatsData.filter(
                    (x) =>
                      x.mobileNo === data[3].toString() &&
                      x.sourceAbbr === data[6]
                  );   
                  var messageData = self.state.messageData;
                  var objMessgage = {};
                  
                  objMessgage.isBotReply = data[1];
                  objMessgage.chatDate = "Today";
                  objMessgage.chatTime = new Date().toLocaleTimeString();
                  objMessgage.byCustomer = true;
                  objMessgage.message = data[0].toString();
                  objMessgage.customerName = chatData[0].customerName;
                  objMessgage.isAttachment = data[7];
                  objMessgage.attachment =
                    data[7] === true ? data[8].toString() : null;
                  messageData.push(objMessgage);
                  self.setState({
                     messageData,
                    isScroll: true,
                  });
                  console.log("this.state.messageData",messageData)

                  // notification.open({
                  //   key: chatData[0].chatID,
                  //   duration: self.state.notificationTime,
                  //   placement: "bottomRight",
                  //   message: "Notification Title",
                  //   className: "hide-message-title",
                  //   description: (
                  //     <ChatNotificationComponent
                  //       msgData={data[0]}
                  //       chatData={chatData}
                  //       handleChatNotificationClick={(e) =>
                  //         self.handleNotificationClick(e, true)
                  //       }
                  //       notitficationType={""}
                  //     />
                  //   ),
                  // });
                  if (self.state.ongoingChatsData.length > 0) {
                    chatId = self.state.ongoingChatsData.filter(
                      (x) =>
                        x.mobileNo === self.state.mobileNo &&
                        x.sourceAbbr === data[6]
                    )[0].chatID;
                  }
                 
                  if (data[5]) {
                    

                    self.handleEndCustomerChat(chatId, data[0]);
                  } else {
                    setTimeout(() => {
                      self.handleGetOngoingChat();
                    }, 900);
                  }
                } else {
                  let newChatMeaasgeAudio = document.getElementById(
                    "newChatMeaasgeAudio"
                  );
                  let newChatMeaasgeAudioSrc = "";
                  if (
                    JSON.parse(
                      window.localStorage.getItem("newMessageSoundFile")
                    )
                  ) {
                    newChatMeaasgeAudioSrc = JSON.parse(
                      window.localStorage.getItem("newMessageSoundFile")
                    );
                  } else {
                    newChatMeaasgeAudioSrc = self.state.newMessageSoundFile;
                  }

                  if (self.state.isNotiNewMessage) {
                    chatData = self.state.ongoingChatsData.filter(
                      (x) =>
                        x.mobileNo === data[3].toString() &&
                        x.sourceAbbr === data[6]
                    );
                  }

                  // notification.open({
                  //   key: chatData[0].chatID,
                  //   duration: self.state.notificationTime,
                  //   placement: "bottomRight",
                  //   message: "Notification Title",
                  //   className: "hide-message-title",
                  //   description: (
                  //     <ChatNotificationComponent
                  //       msgData={data[0]}
                  //       chatData={chatData}
                  //       // handleChatNotificationClick={(e) =>
                  //       //   self.handleNotificationClick(e, false)
                  //       // }
                  //       notitficationType={""}
                  //     />
                  //   ),
                  // });

                  // if (newChatMeaasgeAudio) {
                  //   newChatMeaasgeAudio.src = newChatMeaasgeAudioSrc;
                  //   newChatMeaasgeAudio.volume =
                  //     Math.round(self.state.newMessageSoundVolume / 10) / 10;
                  //   newChatMeaasgeAudio.play();
                  // }
                  setTimeout(() => {
                    self.handleGetOngoingChat();
                  }, 900);

                  // self.handleGetChatNotificationCount();
                }
              } else {
                //new chat message
                
                self.setState({ newChatsData: JSON.parse(localStorage.getItem("newChatsData")) });
                chatData = JSON.parse(localStorage.getItem("newChatsData")).filter(
                  (x) => x.mobileNo === data[3].toString()
                );
                if (chatData.length > 0) {
                  // notification.open({
                  //   key: chatData[0].chatID,
                  //   duration: self.state.notificationTime,
                  //   placement: "bottomRight",
                  //   // message: "Notification Title",
                  //   className: "hide-message-title",
                  //   description: (
                  //     <ChatNotificationComponent
                  //       msgData={data[0]}
                  //       chatData={chatData}
                  //       // handleChatNotificationClick={(e) =>
                  //       //   self.handleNewChatNotification(e)
                  //       // }
                  //       notitficationType={""}
                  //     />
                  //   ),
                  // });
                  let newChatAudio = document.getElementById("newChatAudio");
                  let newChatAudioSrc = "";
                  if (
                    JSON.parse(window.localStorage.getItem("newChatSoundFile"))
                  ) {
                    newChatAudioSrc = JSON.parse(
                      window.localStorage.getItem("newChatSoundFile")
                    );
                  } else {
                    newChatAudioSrc = self.state.newChatSoundFile;
                  }
                  if (newChatAudio) {
                    newChatAudio.src = newChatAudioSrc;
                    newChatAudio.volume =
                      Math.round(self.state.newChatSoundVolume / 10) / 10;
                    newChatAudio.play();
                  }
                  setTimeout(() => {
                    self.handleGetNewChat();
                  }, 900);

                  // self.handleGetChatNotificationCount();
                } else {
                  // self.handleGetChatNotificationCount();
                  //self.handleGetNewChat((data[3]).toString(), data[0]);
                  setTimeout(() => {
                    self.handleGetNewChat();
                  }, 900);
                }
              }
            }
          }
        });
      }

      socket.on(
        "CallOngoingSP" +
        self.state.programCode.toLowerCase() +
        self.state.AgentID,
        function (data) {
          console.log("data572",data)
          // 
          var ongoingChatsData = [];
          let ongoingUnreadCount = 0
          if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
              var objData = {};
              objData.chatID = data[i].CurrentChatID;
              objData.storeID = data[i].StoreID;
              objData.programCode = data[i].ProgramCode;
              objData.customerID = data[i].CustomerID;
              objData.customerName = data[i].CustomerName;
              objData.mobileNo = data[i].CustomerNumber;
              objData.messageCount = data[i].NewMessageCount;
              objData.timeAgo = data[i].TimeAgo;
              objData.createdDate = data[i].CreatedDate;
              objData.storeManagerId = data[i].StoreManagerId;
              objData.storeManagerName = data[i].StoreManagerName;
              ongoingUnreadCount += data[i].NewMessageCount
              if (data[i].IsCustEndChat === 0) {
                objData.isCustEndChat = false;
              } else {
                objData.isCustEndChat = true;
              }
              if (data[i].IsCustTimeout === 0) {
                objData.isCustTimeout = false;
              } else {
                objData.isCustTimeout = true;
              }
              objData.sourceName = data[i].SourceName;
              objData.chatSourceID = data[i].SourceID;
              objData.sourceAbbr = data[i].SourceAbbr;
              objData.sourceIconUrl = data[i].SourceIconUrl;
              ongoingChatsData.push(objData);
            }
          }
          document.getElementById("hidddenButton").click()
          localStorage.setItem(
            "ongoingChatsData",
            JSON.stringify(ongoingChatsData)
          );

          if (ongoingChatsData.length > 0) {
            for (let i = 0; i < ongoingChatsData.length; i++) {
              ongoingChatsData[i].initialColor =
                self.state.colorCode[Math.floor(Math.random() * 6)];
            }
          }
          self.setState({ ongoingChatsData });
          localStorage.setItem("ongoingUnreadCount", ongoingUnreadCount);

        }
      );

    }
    // if(!(this.props.location.action === "redirectToChat")){
    //   this.handleCreateSocketConnection(this.state.programCode);
    // }
    this.handleGetChatSession();
    this.createScketforNewAndOngoing();

    setTimeout(() => {
      this.handleGetNewChat();
      this.handleGetOngoingChat();
      this.handleGetChatNotificationCount();
    }, 900);

    this.handleGetAgentList();

    var checkChatSession = window.localStorage.getItem("ChatSession") || "";
    var checkChatSoundNotiSetting =
      window.localStorage.getItem("ChatSoundNotiSetting") || "";

    if (
      checkChatSoundNotiSetting === "" ||
      checkChatSoundNotiSetting === null
    ) {
    } 
    else {
      var responseData = JSON.parse(
        window.localStorage.getItem("ChatSoundNotiSetting")
      );
      this.setState({
        newChatSoundVolume: responseData.newChatSoundVolume || 0,
        newMessageSoundVolume: responseData.newMessageSoundVolume || 0,
        isNotiNewChat: responseData.isNotiNewChat || false,
        isNotiNewMessage: responseData.isNotiNewMessage || false,
        notificationTime: responseData.notificationTime,
        tenantID: responseData.tenantID,
      });
    }
  }

  handleSuggetionTypeChange = (e) => {
    this.setState({
      suggestionType: e.target.value,
    });
  };
  handleGetChatSession() {
    let self = this;
    axios({
      method: "post",
      // url: config.apiUrl + "/CustomerChat/GetChatSession",
      url: config.apiUrl + "/CustomerChat/GetChatSessionNew",
      headers: authHeader(),
    })
      .then(function (response) {
        var message = response.data.message;
        var data = response.data.responseData;

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
      .catch((response) => {
        console.log(response, "---handleGetChatSession");
      });
  }
  handleAccountAllOpen() {
    this.setState({ AllAcount: true });
  }

  handleTransferChatMdlOpen() {
    this.setState({ TransferChatMdl: true });
  }
  handleBanVisitorMdlOpen() {
    this.setState({ banVisitorMdl: true, AllAcount: false });
  }
  handleBanVisitorMdlClose() {
    this.setState({ banVisitorMdl: false });
  }
  handleTransferChatMdlClose() {
    this.setState({
      TransferChatMdl: false,
      AllAcount: false,
      selectedAgentIDToTransferchat: 0
    });
  }
  handleAccountAllClose() {
    this.setState({ AllAcount: false });
  }

  handleCRMRole() {
    let self = this;
    this.ChatService.Post("/CRMRole/GetRolesByUserID")
      .then((res) => {
        let msg = res.message;
        let data = res.responseData.modules;
        if (msg === "Success") {
          this.setState({
            programCode: res.responseData.programCode,
            agentId: res.responseData.userID,
            tenantID: res.responseData.tenantID,
            UserName: res.responseData.agentName,
          });
        }
        else {
          localStorage.clear();
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate() {
    if (this.state.isScroll) {
      this.setState({ isScroll: false });
      this.scrollToBottom();
    }
  }

  handleProfannitySelect = (e) => {
    this.state.Profane_Words.filter((x) => x.value === e)[0].isChecked = true;
    this.setState({ Profane_Words: this.state.Profane_Words });
  };

  handleRemoveProfanity = async () => {
    if (
      this.state.Profane_Words.filter((x) => x.isChecked === true).length > 0
    ) {
      var message = this.state.message;
      for (let i = 0; i < this.state.Profane_Words.length; i++) {
        if (this.state.Profane_Words[i].isChecked) {
          message = replaceAll(message, this.state.Profane_Words[i].value, "");
        }
      }
      await this.setState({
        message,
      });
      if (document.getElementById("propoversugg") && !this.state.isMobileView) {
        document.getElementById("propoversugg").click();
      }
      this.handleAutoCorrection();
    }
  };
  handleCreateEndChatMdlOpen() {
    this.setState({ CreateAndEndChat: true, AllAcount: false });
  }
  handleCreateEndChatMdlClose() {
    this.setState({ CreateAndEndChat: false });
  }
  handleClickCreateTicketAndEndChat = () => {
    this.setState({
      CreateAndEndChat: false,
      CrateTicketMdl: true,
      closeChatWithticketCreation: true,
    });
  };
  handleReactChatModelOpen() {
    this.setState({ ReactChatModel: true });
  }
  handleReactChatModelClose() {
    this.setState({ ReactChatModel: false });
  }
  handleCreateTicketModalOpn() {
    this.setState({ CrateTicketMdl: true });
  }
  handleCreateTicketModalCls() {
    this.setState({ CrateTicketMdl: false });
  }
  handleOpenTicketOpn(customerId) {
    let param = {
      customerId: customerId,
    };
    this.ChatService.PostWithParams("/CustomerChat/CustomerOpenTickets", param)
      .then((res) => {
        let msg = res.message;
        let data = res.responseData;
        if (msg === "Success") {
          this.setState({
            CustomerOpenTicketList: data,
            OpenTicketMdl: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    this.setState({ OpenTicketMdl: true });
  }
  handleOpenTicketCls() {
    this.setState({ OpenTicketMdl: false });
  }
  handlePageChange() {
    this.props.history.push("historicalChat");
  }
  HandleRowClickEvt = () => {
    return {
      onClick: (e) => {
        this.handleReactChatModelOpen();
      },
    };
  };

  handleGetBrandList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/Brand/GetBrandList",
      headers: authHeader(),
    }).then(function (res) {
      let status = res.data.message;
      let data = res.data.responseData;
      if (status === "Success") {
        self.setState({ brandData: data });
        //self.handleGetCategoryList(17);
      } else {
        self.setState({ brandData: [] });
      }
    });
  }

  handleGetCategoryList(brandID) {
    let self = this;
    var brandId;
    if (brandID) {
      brandId = brandID;
    } else {
      brandId = this.state.selectedBrand;
    }
    axios({
      method: "post",
      url: config.apiUrl + "/Category/GetCategoryList",
      headers: authHeader(),
      params: {
        BrandID: brandId,
      },
    })
      .then(function (res) {
        let data = res.data;
        if (data !== null) {
          self.setState({
            categoryData: data,
          });
        } else {
          self.setState({
            categoryData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetSubCategoryList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/SubCategory/GetSubCategoryByCategoryID",
      headers: authHeader(),
      params: {
        CategoryID: this.state.selectedCategory,
      },
    })
      .then(function (res) {
        let data = res.data.responseData;
        self.setState({
          subCategoryData: data,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetIssueType() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/IssueType/GetIssueTypeList",
      headers: authHeader(),
      params: {
        SubCategoryID: this.state.selectedSubCategory,
      },
    })
      .then(function (res) {
        let data = res.data.responseData;
        self.setState({
          issueTypeData: data,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }
  // componentDidUpdate = () =>{
  //   this.handleGetChatMessagesList(rowChatId)
  // }
  //handle get chat messgae by chat id
  handleGetChatMessagesList(id, RecentChat, isScrollTop) {
    
    let self = this;
    var forRecentChat = 0;
    var urlType = "";
    var objParam = {};

    this.setState({ isCallChatMessgaeApi: true });
    if (RecentChat) {
      forRecentChat = 1;
      urlType = "/CustomerChat/getChatMessagesList";
      objParam.chatID = id;
      objParam.ForRecentChat = forRecentChat;
    } else {
      let chatID = 0;
      if (localStorage.getItem("ongoingChatId") && this.state.isMobileView) {
        chatID = localStorage.getItem("ongoingChatId");
        localStorage.removeItem("ongoingChatId");
      } else {
        chatID = id;
      }
      objParam.chatID = chatID;
      objParam.ForRecentChat = forRecentChat;
      objParam.PageNo = isScrollTop ? this.state.pageNumberCurrentChat : 1;
      urlType = "/CustomerChat/getChatMessagesListNew";
    }
    this.setState({ isMainLoader: true });
    this.ChatService.PostWithParams(urlType, objParam)
      .then((response) => {
        var message = response.message;
        var messageData = RecentChat
          ? response.responseData
          : response.responseData.chatMessages;
        var recentChatCount = 0;

        if (RecentChat) {
          recentChatCount = self.state.pastChatCount;
        } else {
          recentChatCount = response.responseData.recentChatCount;
        }

        self.setState({
          messageListLoader: false,
          isMainLoader: false,
          recentChatCount: recentChatCount,
          isCallChatMessgaeApi: false,
        });

        if (message === "Success" && messageData) {
          if (self.state.showHistoricalChat) {
            self.setState({
              messageHistoryChatData: messageData,
              isMainLoader: false,
              messageListLoader: false,
            });
          } else {
            var newMessageData = [];
            if (messageData.length > 0) {
              for (let i = messageData.length - 1; i >= 0; i--) {
                newMessageData.push(messageData[i]);
              }
            }

            if (self.state.messageData.length > 0 && isScrollTop) {
              for (let i = 0; i < self.state.messageData.length; i++) {
                newMessageData.push(self.state.messageData[i]);
              }
            }

            self.setState({
              isScrollMessage: true,
              // ...messageData,
              messageData: newMessageData,
              isScroll: isScrollTop === true ? false : true,
              isMainLoader: false,
              messageListLoader: false,
              pastChatCount: recentChatCount,
              pageNumberCurrentChat: self.state.pageNumberCurrentChat + 1,
              AttachementFiles: [],
              //message: "",
              loading: false,
            });
          }
        } else {
          self.setState({
            isScrollMessage: false,
            messageData:
              self.state.messageData.length > 0 ? self.state.messageData : [],
            isMainLoader: false,
            messageListLoader: false,
            loading: false,
          });
        }
      })
      .catch((error) => {
        self.setState({
          isMainLoader: false,
          isCallChatMessgaeApi: false,
          messageListLoader: false,
        });
        console.log(error);
      });

    // {================================================}
    var currentMobile = sessionStorage.getItem("currentMobile");
    var temp = sessionStorage.getItem(currentMobile);
    if (temp !== null) {
      this.setState({ message: temp });
    } else {
      this.setState({ message: "" });
    }
    // {================================================}
  }

  //handle historical table row click
  handleHistoricalTableRow = (e) => {
    this.setState({
      rowChatId: e.chatID,
      showHistoricalChat: true,
      chatTimeAgo: e.timeAgo,
      historyPage: 1,
      pastChatTableRowSizeExpanded: 5,
    });

    this.handleGetChatMessagesList(e.chatID, 1);
  };

  handleAgentListTableRowClick = (e) => {
    this.setState({
      selectedAgentIDToTransferchat: e.storeManagerID,
      rowChatId: e.storeManagerID,
    });
  };

  handleTransferChatBtnClick() {
    if (this.state.selectedAgentIDToTransferchat > 0) {
      this.handleCustomerChatTransfer(
        this.state.selectedAgentIDToTransferchat,
        this.state.chatId
      );
    } else {
    }
  }

  handleMessageDivScroll = (element) => {
    let topOff = document.getElementsByClassName("chatcontentDiv")[0].scrollTop;
    let heightOffvar = document.getElementsByClassName("chatcontentDiv")[0]
      .scrollHeight;
    let heightPrent = (topOff / heightOffvar) * 100;

    if (topOff === 0) {
      if (this.state.isScrollMessage === true) {
        if (this.state.isCallChatMessgaeApi === false) {
          this.setState({
            isCallChatMessgaeApi: true,
            oldScrollHeight: heightOffvar,
          });

          this.handleGetChatMessagesList(this.state.chatId, 0, true);
          if (document.getElementsByClassName("chatcontentDiv")) {
            document.getElementsByClassName(
              "chatcontentDiv"
            )[0].scrollTop += 3500;
          }
        }
      }
    }
  };

  onAddCKEditorChange(evt) {
    var newContent = evt.editor.getData();

    // var ckTemp = newContent.replace(/<[^>]+>/g, "");

    // var ck = ckTemp.replace(/&nbsp;/g, "");

    // var tempMessage = newContent.replaceAll('<strong>','*').replaceAll('</strong>','*')

    // .replaceAll('<p>','').replaceAll('</p>','').replaceAll('<em>','_').replaceAll('</em>', '_')

    // .replaceAll('<s>','~').replaceAll('</s>','~').replaceAll(/&nbsp;/g, "");

    this.setState({
      message: evt.editor
        .getData()
        .replaceAll("&nbsp;", " ")
        .replaceAll("<p>", "")
        .replaceAll("</p>", "")
        .replaceAll(/<strong> /g, "<strong>")
        .replaceAll(/ <strong>/g, " <strong>")
        .replaceAll(/ <\/strong></g, "</strong><")
        .replaceAll(/ <\/strong>/g, "</strong> ")
        .replaceAll(/<\/strong> /g, "</strong> ")
        .replaceAll(/<em> /g, "<em>")
        .replaceAll(/ <em>/g, " <em>")
        .replaceAll(/ <\/em></g, "</em><")
        .replaceAll(/ <\/em>/g, "</em> ")
        .replaceAll(/<\/em> /g, "</em> ")
        .replaceAll(/<s> /g, "<s>")
        .replaceAll(/ <s>/g, " <s>")
        .replaceAll(/ <\/s></g, "</s><")
        .replaceAll(/ <\/s>/g, "</s> ")
        .replaceAll(/<\/s> /g, "</s> "),

      ckeditorAdd: newContent,
    });
  }

  //To handle the suggestion option list
  handleSuggestionListClick = async () => {
    await this.setState({
      showAutomaticTextOption: true,
    });
    if (this.state.showAutomaticTextOption) {
      document.addEventListener(
        "click",
        this.handleSuggestionListClickOutside,
        false
      );
    }
  };

  //handle get agent list
  handleGetAgentList() {
    let self = this;
    this.ChatService.Post("/CustomerChat/GetAgentListAll")
      .then((response) => {
        var message = response.message;
        var agentData = response.responseData;
        if (message === "Success" && agentData) {
          window.localStorage.setItem("AgentList", JSON.stringify(agentData));
          let filteredAgentData =
            this.state.TargatedAgentName.length > 0 &&
              this.state.TargatedAgentEmail.length > 0 &&
              this.state.TargatedAgentDesignation.length > 0
              ? agentData.filter(
                (x) =>
                  x.agentName.includes(
                    this.state.TargatedAgentName.toUpperCase()
                  ) &&
                  x.agentEmail.includes(
                    this.state.TargatedAgentEmail.toLowerCase()
                  ) &&
                  x.agentDesignation.includes(
                    this.state.TargatedAgentDesignation.toUpperCase()
                  )
              )
              : this.state.TargatedAgentName.length > 0 &&
                this.state.TargatedAgentEmail.length > 0
                ? agentData.filter(
                  (x) =>
                    x.agentName.includes(
                      this.state.TargatedAgentName.toUpperCase()
                    ) &&
                    x.agentEmail.includes(
                      this.state.TargatedAgentEmail.toLowerCase()
                    )
                )
                : this.state.TargatedAgentName.length > 0 &&
                  this.state.TargatedAgentDesignation.length > 0
                  ? agentData.filter(
                    (x) =>
                      x.agentName.includes(
                        this.state.TargatedAgentName.toUpperCase()
                      ) &&
                      x.agentDesignation.includes(
                        this.state.TargatedAgentDesignation.toUpperCase()
                      )
                  )
                  : this.state.TargatedAgentEmail.length > 0 &&
                    this.state.TargatedAgentDesignation.length > 0
                    ? agentData.filter(
                      (x) =>
                        x.agentEmail.includes(
                          this.state.TargatedAgentEmail.toLowerCase()
                        ) &&
                        x.agentDesignation.includes(
                          this.state.TargatedAgentDesignation.toUpperCase()
                        )
                    )
                    : this.state.TargatedAgentDesignation.length > 0
                      ? agentData.filter((x) =>
                        x.agentDesignation.includes(
                          this.state.TargatedAgentDesignation.toUpperCase()
                        )
                      )
                      : this.state.TargatedAgentEmail.length > 0
                        ? agentData.filter((x) =>
                          x.agentEmail.includes(
                            this.state.TargatedAgentEmail.toLowerCase()
                          )
                        )
                        : this.state.TargatedAgentName.length > 0
                          ? agentData.filter((x) =>
                            x.agentName.includes(
                              this.state.TargatedAgentName.toUpperCase()
                            )
                          )
                          : null;

          self.setState({ agentData, filteredAgentData });
        } else {
          self.setState({ agentData: [] });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //To handle the click outside suggestion option list
  // handleSuggestionListClickOutside = (e) => {
  //   if (this.suggestionUlRef && this.suggestionUlRef.contains(e.target)) {
  //     return;
  //   } else {
  //     document.removeEventListener(
  //       "click",
  //       this.handleSuggestionListClickOutside,
  //       false
  //     );
  //     this.setState({
  //       showAutomaticTextOption: false,
  //     });
  //   }
  // };

  // handleAutoCorrection = () => {
  //   if (
  //     this.state.isgrammarlyCheck
  //     // && this.state.storeAgentDetail.length > 0 &&
  //     // this.state.storeAgentDetail[0].grammarlyCheck === 1
  //   ) {
  //     if (this.state.message.length > 0) {
  //       var inputParam = {};
  //       inputParam.programCode = this.state.programCode;
  //       inputParam.text = this.state.message;
  //       inputParam.storeCode = this.state.storeCode;
  //       inputParam.MobileNo = this.state.mobileNo;
  //       inputParam.SourceType = this.state.sourceType;
  //       socket.emit("CallAutoCorrectionWrapper", inputParam);
  //       this.setState({ selectedSuggested_Words: {} });
  //       let self = this;
  //       self.handleSendMessageToCustomer(self.state.message, "", "", null);
  //       // socket.once(
  //       //   "CallAutoCorrectionWrapper" +
  //       //     this.state.storeCode.toLowerCase() +
  //       //     this.state.programCode.toLowerCase(),
  //       //   function(data) {
  //       //     if (data) {
  //       //       console.log("Profane_Words", data.Profane_Word);
  //       //       // if (data.Profane_Words.length > 0) {
  //       //       if (data.Profane_Word) {
  //       //         var Profane_Word_Temp = [];
  //       //         if (typeof data.Profane_Word === "object") {
  //       //           Profane_Word_Temp = data.Profane_Word;
  //       //         } else {
  //       //           Profane_Word_Temp = data.Profane_Word.split(",");
  //       //         }

  //       //         var profane_Words = [];
  //       //         Profane_Word_Temp.forEach((element) => {
  //       //           var objProfan = {};
  //       //           objProfan.Key = element;
  //       //           objProfan.value = element;
  //       //           objProfan.isChecked = false;
  //       //           profane_Words.push(objProfan);
  //       //         });

  //       //         self.setState({ Profane_Words: profane_Words });
  //       //       } else {
  //       //         self.setState({ Profane_Words: [] });
  //       //       }
  //       //       self.setState({ Suggested_Words: data.Suggested_Word });

  //       //       if (
  //       //         data.Profane_Word.length === 0 &&
  //       //         Object.keys(data.Suggested_Word).length === 0
  //       //       ) {
  //       //         self.handleSendMessageToCustomer(
  //       //           self.state.message,
  //       //           "",
  //       //           "",
  //       //           null
  //       //         );
  //       //         if (self.state.isMobileView) {
  //       //           self.setState({ grammarlyModal: false });
  //       //         }
  //       //       } else {
  //       //         if (self.state.isMobileView) {
  //       //           self.setState({ grammarlyModal: true });
  //       //         } else {
  //       //           if (document.getElementById("propoversugg")) {
  //       //             document.getElementById("propoversugg").click();
  //       //           }
  //       //         }
  //       //       }
  //       //     }
  //       //   }
  //       // );
  //     } else {
  //       this.handleSendMessageToCustomer(this.state.message, "", "", null);
  //     }
  //   } else {
  //     this.handleSendMessageToCustomer(this.state.message, "", "", null);
  //   }
  // };

  //handle on going chat click
  handleOngoingChatClick = (
    id,
    name,
    count,
    mobileNo,
    customerId,
    ProgramCode,
    StoreID,
    isCustEndChat,
    storeManagerId,
    selectedColor,
    isCustTimeout,
    sourceType
  ) => {
    document.addEventListener("contextmenu", (event) => event.preventDefault());
    if (this.state.isNumberCopiedClicked) {
      this.setState({
        isNumberCopiedClicked: false,
      });
    } else {
      // if (this.state.isMobileView) {
      //   document.getElementById("store-footre-main").style.display = "none";
      //   document.getElementById("mobileHederIcon").style.display = "none";
      //   document.getElementById("chatBackIcon").style.display = "inline-block";
      //   localStorage.setItem("isOngoingClick", true);
      // }
      var activeTab = 1;
      var isNotiClicked = localStorage.getItem("isNotiClicked");
      if (this.state.chatId === id && isNotiClicked === "false") {
        setTimeout(() => {
          this.handleCloseChatBox();
        }, 200);
      } else {
        localStorage.setItem("isOngoingClick", true);
        localStorage.setItem("isNotiClicked", false);

        this.setState({
          chatbotRightToggle: "",
          mainTabSelect: activeTab,
          recentChatTabClass: "",
          currentChatTabClass: "show active",
          recentChatNavlinkClass: "",
          currentChatNavlinkClass: "active",
          displayActionButton: "inline",
        });
      }
      if (this.state.customerMobileNo !== mobileNo) {
        window.localStorage.setItem("LastTransaction", "");
        window.localStorage.setItem("IsLastTransaction", "");
        window.localStorage.setItem("CustomerInsights", "");
        window.localStorage.setItem("IsCustomerInsights", "");
        window.localStorage.setItem("CustomerProfile", "");
        //{===========================================}
        sessionStorage.setItem("currentMobile", mobileNo);
        //{===========================================}
      }
      
      if (count > 0) {
        this.setState({ chatMessageCount: this.state.chatMessageCount - 1 });
      }
      // let ongoing = JSON.parse(localStorage.getItem("ongoingUnreadCount")) - count
      // localStorage.setItem("ongoingUnreadCount",  JSON.stringify(ongoing));
      if (this.state.chatId !== id) {
        var objNewChat = {
          userMaster_ID: this.state.AgentID,
          tenant_ID: this.state.tenantID,
          ProgramCode: this.state.programCode,
          ChatId: id,
        };
        socket.emit("CallSetCurrentChatSP", objNewChat);
      }

      if (this.state.messageData.length === 0 || this.state.chatId !== id) {
        if (this.state.chatId === id) {
          this.setState({
            Suggested_Words: {},
            selectedSuggested_Words: {},
            Profane_Words: [],
            replaceMessageVal: "",
            grammarlyModal: false,
            isScroll: true,
            attachmentSendCount: 0,
            customerMobileNo: "",
            customerNameProfile: "",
            isShutterOpen: false,
            isCheckSuggetion: false,
            isSelectedCard: false,
            isCardSend: false,
            AttachementFiles: [],
            activeCollpse: "",
            isScrollMessage: false,
            sourceType,
            isCustTimeout,
            messageSuggestionTagsData: [],
            activeTab,
            selectedColor,
            chatModal: true,
            productTypeTab: 0,
            selectedWishList: [],
            selectedShoppingBag: [],
            selectedRecommended: [],
            shoppingBagData: [],
            wishListData: [],
            recommendedData: [],
            storeManagerId,
            showHistoricalChat: false,
            rowChatId: 0,
            agentRecentChatData: [],
            mainTabSelect: 1,
            isCustEndChat,
            storeID: StoreID,
            chatId: id,
            customerName: name,
            mobileNo: mobileNo,
            customerId: customerId,
            programCode: ProgramCode,
            message: "",
            messageSuggestionData: [],
            chkSuggestion: 0,
            noOfPeople: "",
            selectSlot: {},
            scheduleModal: false,
            selectedSlot: {},
            timeSlotData: [],
            searchItem: "",
            searchCardData: [],
            messageData: [],
            isSendClick: false,
            isHistoricalChat: false,
            isDownbtn: true,
            pageNumberCurrentChat: 1,
            loading: true,
          });
          this.handleGetChatMessagesList(id);
        } else {
          this.setState({
            Suggested_Words: {},
            selectedSuggested_Words: {},
            Profane_Words: [],
            replaceMessageVal: "",
            grammarlyModal: false,
            isScroll: true,
            attachmentSendCount: 0,
            customerMobileNo: "",
            customerNameProfile: "",
            isShutterOpen: false,
            isCheckSuggetion: false,
            isSelectedCard: false,
            isCardSend: false,
            AttachementFiles: [],
            activeCollpse: "",
            isScrollMessage: false,
            sourceType,
            isCustTimeout,
            messageSuggestionTagsData: [],
            activeTab,
            selectedColor,
            chatModal: true,
            productTypeTab: 0,
            selectedWishList: [],
            selectedShoppingBag: [],
            selectedRecommended: [],
            shoppingBagData: [],
            wishListData: [],
            recommendedData: [],
            storeManagerId,
            rowChatId: 0,
            agentRecentChatData: [],
            showHistoricalChat: false,
            mainTabSelect: 1,
            isCustEndChat,
            storeID: StoreID,
            chatId: id,
            customerName: name,
            mobileNo: mobileNo,
            customerId: customerId,
            programCode: ProgramCode,
            message: "",
            messageSuggestionData: [],
            chkSuggestion: 0,
            noOfPeople: "",
            selectSlot: {},
            scheduleModal: false,
            selectedSlot: {},
            timeSlotData: [],
            searchItem: "",
            searchCardData: [],
            messageData: [],
            isSendClick: false,
            isHistoricalChat: false,
            isDownbtn: true,
            pageNumberCurrentChat: 1,
            loading: true,
          });
          if (count === 0) {
            this.handleGetChatMessagesList(id);
          } else {
            this.handleMakeAsReadOnGoingChat(id);
          }
        }
      } else {
        this.setState({
          Suggested_Words: {},
          selectedSuggested_Words: {},
          Profane_Words: [],
          replaceMessageVal: "",
          grammarlyModal: false,
          isScroll: true,
          attachmentSendCount: 0,
          isShutterOpen: false,
          isCheckSuggetion: false,
          isSelectedCard: false,
          isCardSend: false,
          AttachementFiles: [],
          activeCollpse: "",
          isScrollMessage: false,
          isCustTimeout,
          sourceType,
          messageSuggestionTagsData: [],
          activeTab,
          selectedColor,
          chatModal: true,
          productTypeTab: 0,
          selectedWishList: [],
          selectedShoppingBag: [],
          selectedRecommended: [],
          shoppingBagData: [],
          wishListData: [],
          recommendedData: [],
          storeManagerId,
          rowChatId: 0,
          agentRecentChatData: [],
          showHistoricalChat: false,
          mainTabSelect: 1,
          isCustEndChat,
          storeID: StoreID,
          chatId: id,
          customerName: name,
          mobileNo: mobileNo,
          customerId: customerId,
          programCode: ProgramCode,
          message: "",
          messageSuggestionData: [],
          chkSuggestion: 0,
          noOfPeople: "",
          selectSlot: {},
          scheduleModal: false,
          selectedSlot: {},
          timeSlotData: [],
          searchItem: "",
          searchCardData: [],
          messageData: [],
          isSendClick: false,
          isHistoricalChat: false,
          isDownbtn: true,
          pageNumberCurrentChat: 1,
          loading: true,
        });
        if (localStorage.getItem("isOngoingClick") === "true")
          this.handleGetChatMessagesList(id);
      }

      this.handleGetVisitorNote(customerId, mobileNo);
      this.setState({ isHistoricalChat: false, isDownbtn: true });
      if (this.state.isPinClick) {
        this.handleGetChatCustomerProfile(mobileNo);
      }
      this.handleChatProfileLastTransactionData(customerId);
      //{=============================================}
      var temp = sessionStorage.getItem(mobileNo);
      if (temp !== null) {
        this.setState({ message: sessionStorage.getItem(mobileNo) });
      }
      //{=============================================}
    }
  };

  //handle got to message scroll down
  scrollToBottom() {
    if (this.messageList) {
      const scrollHeight = this.messageList.scrollHeight;
      const height = this.messageList.clientHeight;
      const maxScrollTop = scrollHeight - height;
      this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }

  //handle Make As Read On Going Chat
  async handleMakeAsReadOnGoingChat(id) {
    let self = this;
    this.setState({ chatId: id });
    let inputParam = {
      chatID: id,
    };
    self.handleGetChatMessagesList(id);
    this.ChatService.PostWithParams(
      "/CustomerChat/MarkAsReadOnGoingChat",
      inputParam
    )
      .then((response) => {
        var message = response.message;
        var responseData = response.responseData;
        if (message === "Success" && responseData) {
          self.handleGetOngoingChat();
          self.handleGetChatNotificationCount();
        } else {
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //handle send message to customer
  handleSendMessageToCustomer(
    Message,
    messagewhatsAppContent,
    imageURL,
    appointmentSendWB
  ) {

    
    let self = this;
    if (this.state.AttachementFiles.length === 0) {
      if (Message === "" || Message == null) {
        return false;
      }
    }
    var dataObj = {};
    if (this.state.sourceType === "cb") {
      if (this.state.AttachementFiles.length === 0) {
        dataObj = {
          TenantID: this.state.tenantID,
          chatId: this.state.chatId,
          StoreMgr_ID: this.state.storeManagerId,
          userMaster_ID: this.state.AgentID,
          ProgramCode: this.state.programCode,
          StoreCode: this.state.storeCode,
          Source: this.state.sourceType,
          MobileNo: this.state.mobileNo,
          MessageData: Message,
          WhatsAppMessage: messagewhatsAppContent || "",
          ImageURL: imageURL || "",
          HeaderToken: authHeader()["X-Authorized-Token"],
          isAttachment: false,
          attachmentData: null,
        };
        socket.emit("SendBellReplyV2", dataObj);
      } else {
        if (this.state.AttachementFiles.length > 0) {
          this.handleSendAttachmentFileOnChatAPI();
        }
      }
    } else if (this.state.AttachementFiles.length === 0) {
      dataObj = {
        isFromAgent: true,
        chatId: this.state.chatId,
        StoreMgr_ID: this.state.sAgentId,
        userMaster_ID: this.state.AgentID,
        ProgramCode: this.state.programCode,
        StoreCode: this.state.storeCode,
        Source: this.state.sourceType,
        MobileNo: this.state.mobileNo,
        MessageData: Message,
        WhatsAppMessage: messagewhatsAppContent || "",
        ImageURL: imageURL || "",
        isCard: false,
        cardItem: null,
        isAppointment: this.state.activeTab === 4 ? true : false,
        appointmentData: appointmentSendWB,
        isAttachment: false,
        attachmentData: null,
        sentAt:
          new Date().getMonth() +
          1 +
          "/" +
          new Date().getDate() +
          "/" +
          new Date().getFullYear() +
          " " +
          new Date().getHours() +
          ":" +
          new Date().getMinutes() +
          ":" +
          new Date().getSeconds(),
        HeaderToken: authHeader()["X-Authorized-Token"],
        isSuccess: true,
        message: "OK",
        appVersion: "2.0",
      };
      socket.emit("SendBellReplyV2", dataObj); ///web bot replaceMessageVal: "",
    } else {
      this.handleSendAttachmentFileOnChatAPI();
    }
    if (this.state.sourceType === "cb" || this.state.sourceType === "wb") {
      if (this.state.AttachementFiles.length === 0) {
        var messageData = self.state.messageData;
        var objMessgage = {};
        objMessgage.isBotReply = false;
        objMessgage.chatDate = "Today";
        objMessgage.chatTime = new Date().toLocaleTimeString();
        objMessgage.byCustomer = false;
        objMessgage.message = Message;
        messageData.push(objMessgage);
        self.setState({
          isScroll: true,
          messageData,
          isSendRecomended: false,
          message: "",
          ckeditorAdd: "",
          // messageSuggestionData: [],
          // messageSuggestionTagsData: [],
          // selectedTags: 0,
          chkSuggestion: 0,
          cardModal: false,
          remainingCount: self.state.tempRemainingCount,
          suggestionModal: false,
          suggestionModalMob: false,
          suggestionTagModal: false,
          isMainLoader: false,
        });
        // {================================================}
        var temp = sessionStorage.getItem("currentMobile");
        sessionStorage.removeItem(temp);
        // {================================================}
      }
    }
    this.setState({
      suggestionText: "",
    });
  }

  //handle update customer chat status
  handleUpdateCustomerChatStatus(
    id,
    storeManagerId,
    StoreID,
    name,
    mobileNo,
    customerId,
    ProgramCode,
    sourceType,
    count = 0
  ) {
    let self = this;
    // if (this.state.isMobileView) {
    //   document.getElementById("store-footre-main").style.display = "none";
    //   document.getElementById("mobileHederIcon").style.display = "none";
    //   document.getElementById("chatBackIcon").style.display = "inline-block";
    // }
    self.setState({
      //   chatTypeCollpase: [2],
      // pageNumberCurrentChat: 1,
      sourceType: sourceType,
      //   chatModal: true,
      //   isMainLoader: true,
      isCustEndChat: false,
      storeManagerId: storeManagerId,
      rowChatId: 0,
      agentRecentChatData: [],
      //   showHistoricalChat: false,
      mainTabSelect: 1,
      storeID: StoreID,
      customerName: name,
      mobileNo: mobileNo,
      customerId: customerId,
      programCode: ProgramCode,
      message: "",
      //   messageSuggestionData: [],
      //   messageSuggestionTagsData: [],
      //   selectedTags: 0,
      //   chkSuggestion: 0,
      //   toggle: {
      //     one: true,
      //     two: false,
      //     three: false,
      //     four: false,
      //     five: false,
      //   },
      //   noOfPeople: "",
      //   selectSlot: {},
      //   scheduleModal: false,
      //   selectedSlot: {},
      activeTab: 1,
      //   timeSlotData: [],
      //   searchItem: "",
      //   searchCardData: [],
      //   messageData: [],
      //   isSendClick: false,
      isHistoricalChat: false,
      //   isDownbtn: true,
      chatbotRightToggle: "",
      recentChatNavlinkClass: "",
      currentChatNavlinkClass: "active",
      recentChatTabClass: "",
      currentChatTabClass: "show active",
    });
    let inputParams = {
      chatID: id,
    };
    
    let newChat = JSON.parse(localStorage.getItem("newUnreadCount")) - count
    localStorage.setItem("newUnreadCount", JSON.stringify(newChat));
    this.forceUpdate()
    this.ChatService.PostWithParams(
      "/CustomerChat/UpdateCustomerChatStatus",
      inputParams
    )
      .then((response) => {
        var message = response.message;
        var responseData = response.responseData;
        if (message === "Success" && responseData) {
          self.setState({ chatId: id });

          self.handleGetOngoingChat();

          self.handleMakeAsReadOnGoingChat(id);
          self.handleGetNewChat();
          self.handleGetChatNotificationCount();
          var objNewChat = {
            userMaster_ID: self.state.AgentID,
            tenant_ID: self.state.tenantID,
            ProgramCode: self.state.programCode,
            ChatId: id,
          };
          socket.emit("CallSetCurrentChatSP", objNewChat);
        }
      })
      .catch((error) => {
        self.setState({ isMainLoader: false });
        console.log(error);
      });
    sessionStorage.setItem("currentMobile", mobileNo);
  }

  handleBrandChange = (e) => {
    let value = parseInt(e.target.value);
    // let BrandData = this.state.brandData.filter(
    //   (x)=>
    //   x.brandID == value);
    // this.setState({
    //   selectedBrand: value,
    //   selectedBrandName:BrandData[0].brandName,
    //   categoryData: []
    //  });
    this.setState({ selectedBrand: value, categoryData: [] });
    setTimeout(() => {
      if (this.state.selectedBrand) {
        this.handleGetCategoryList(this.state.selectedBrand);
      }
    }, 1);
  };

  handleBanVisitorConfirmation() {
    
    this.handleBanCustomer(this.state.chatId, this.state.selectedBanReason);

  }

  handleBanVisitorClear() {
    
    //  console.log("clear",this.state.selectedBanReason)
    //  if(this.state.selectedBanReason !== 0){
    //   this.setState({ selectedBanReason: 0 });
    //  }
  }



  handleBanReasonChange = (e) => {
    let value = parseInt(e.target.value);
    this.setState({ selectedBanReason: value });
  };

  handleBanCustomer(chatId, banReasonId) {
    
    console.log("handleBanCustomer", chatId, banReasonId)
    let self = this;
    if (banReasonId !== 0) {
      axios({
        method: "post",
        url: config.apiUrl + "/CustomerChat/BanCustomerChat",
        headers: authHeader(),
        params: {
          chatID: chatId,
          banReasonID: banReasonId,
        },
      })
        .then(function (res) {
          let data = res.data.responseData;
          if (data !== null) {
            NotificationManager.success("Customer Banned Successfully");
            self.setState({
              banCustomerData: data,
              banVisitorMdl: false,
            });
            self.handleUpdateStoreManagerChatStatus(3);
          } else {
            self.setState({
              banCustomerData: [],
            });
          }
        })
        .catch((data) => {
          console.log(data);
        });
    }
    else {
      NotificationManager.error("Please select reason ");
    }
  }

  handleCloseChatBox = () => {
    localStorage.setItem("isOngoingClick", false);
    localStorage.setItem("isNotiClicked", false);
    this.setState({
      customerName: "",
      messageData: [],
      isCustEndChat: false,
      isCustTimeout: false,
      mobileNo: "",
      chatId: 0,
      chatbotRightToggle: "chatbotRightClose",
      AllAcount: false,
      mainTabSelect: 1,
      recentChatTabClass: "",
      currentChatTabClass: "show active",
      recentChatNavlinkClass: "",
      currentChatNavlinkClass: "active",
      displayActionButton: "inline",
    });
    var objNewChat = {
      userMaster_ID: this.state.AgentID,
      tenant_ID: this.state.tenantID,
      ProgramCode: this.state.programCode,
      ChatId: 0,
    };
    socket.emit("CallSetCurrentChatSP", objNewChat);
  };
  handleCategoryChange = (e) => {
    let value = parseInt(e.target.value);
    this.setState({ selectedCategory: value, subCategoryData: [] });
    setTimeout(() => {
      if (this.state.selectedCategory) {
        this.handleGetSubCategoryList();
      }
    }, 1);
  };
  handleSubCategoryChange = (e) => {
    let value = parseInt(e.target.value);
    this.setState({ selectedSubCategory: value, issueTypeData: [] });
    setTimeout(() => {
      if (this.state.selectedSubCategory) {
        this.handleGetIssueType();
      }
    }, 1);
  };

  handleIssueTypeChange = (e) => {
    let value = parseInt(e.target.value);
    this.setState({ selectedIssueType: value });
  };

  createScketforNewAndOngoing() {
    let self = this;
  }

  handleEndCustomerChat(chatId, message) {
    let self = this;
    let inputParams = {
      ChatID: chatId,
      EndChatMessage: message || "",
    };
    this.ChatService.PostWithParams(
      "/CustomerChat/EndCustomerChat",
      inputParams
    )
      .then((response) => {
        var message = response.message;
        var data = response.responseData;
        if (message === "Success" && data) {
          self.setState({
            isCustEndChat: true,
            //changesumit
            isHistoricalChat:false
          });
          self.handleGetOngoingChat();
          self.handleGetNewChat();
        } else {
          self.setState({
            isCustEndChat: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleNotificationClick = (chatData, isCurrenctChat) => {
    localStorage.setItem("isNotiClicked", true);

    notification.close(chatData[0].chatID);
    if (!isCurrenctChat) {
      if (window.location.pathname !== "/admin/chatbot") {
        this.props.history.push({
          pathname: "chatbot",
          action: "redirectToChat",
          state: {
            programCode: this.state.programCode,
            tenantID: this.state.tenantID,
            agentId: this.state.AgentID,
            UserName: this.state.UserName,
            chatId: chatData[0].chatID,
            chatbotRightToggle: "",
            recentChatTabClass: "",
            currentChatTabClass: "show active",
            recentChatNavlinkClass: "",
            currentChatNavlinkClass: "active",
            displayActionButton: "inline",
          },
        });
      }

      this.handleOngoingChatClick(
        chatData[0].chatID,
        chatData[0].customerName,
        chatData[0].messageCount,
        chatData[0].mobileNo,
        chatData[0].customerID,
        chatData[0].programCode,
        chatData[0].storeID,
        chatData[0].isCustEndChat,
        chatData[0].storeManagerId,
        chatData[0].initialColor,
        chatData[0].isCustTimeout,
        chatData[0].sourceAbbr
      );
    } else {
      if (window.location.pathname !== "/admin/chatbot") {
        this.props.history.push({
          pathname: "chatbot",
          action: "redirectToChat",
          state: {
            programCode: this.state.programCode,
            tenantID: this.state.tenantID,
            agentId: this.state.AgentID,
            UserName: this.state.UserName,
            chatId: chatData[0].chatID,
            chatbotRightToggle: "",
          },
        });
      }
      this.handleOngoingChatClick(
        chatData[0].chatID,
        chatData[0].customerName,
        chatData[0].messageCount,
        chatData[0].mobileNo,
        chatData[0].customerID,
        chatData[0].programCode,
        chatData[0].storeID,
        chatData[0].isCustEndChat,
        chatData[0].storeManagerId,
        chatData[0].initialColor,
        chatData[0].isCustTimeout,
        chatData[0].sourceAbbr
      );
    }
  };

  ///handle create socket connection
  // handleCreateSocketConnection(programCode) {
  //   let self = this;
  //   //programCode = 'motherhood';
  //   // socket.on("connect", () => {
  //   console.log("handleCreateSocketConnection : ",this.state, programCode)
  //   socket.send("hi");

  //   // });
  // }


  //handle update store manage chat status
  handleUpdateStoreManagerChatStatus(id) {
    if (!this.state.isCustEndChat || !this.state.isCustTimeout) {
      let self = this;
      let inputParams = {
        ChatID: this.state.chatId,
        ChatStatusID: id,
      };
      this.ChatService.PostWithParams(
        "/CustomerChat/UpdateStoreManagerChatStatus",
        inputParams
      )
        .then((response) => {
          var message = response.message;
          var responseData = response.responseData;
          if (message === "Success" && responseData) {
            self.setState({
              customerName: "",
              messageData: [],
              isCustEndChat: false,
              isCustTimeout: false,
              chatbotRightToggle: "chatbotRightClose",
              AllAcount: false,
              closeChatWithticketCreation: false,
              CreateAndEndChat: false,
              recentChatTabClass: "",
              currentChatTabClass: "show active",
              recentChatNavlinkClass: "",
              currentChatNavlinkClass: "active",
              displayActionButton: "inline",
              mainTabSelect: 1,
              mobileNo: "",
              chatId: 0,
            });
            var objNewChat = {
              userMaster_ID: this.state.AgentID,
              tenant_ID: this.state.tenantID,
              ProgramCode: this.state.programCode,
              ChatId: 0,
            };
            socket.emit("CallSetCurrentChatSP", objNewChat);
            //self.handleActionClose();
            self.handleGetChatNotificationCount();
            self.handleGetOngoingChat();

            self.handleGetNewChat();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  //handle history chat close
  handleHistoryChatClose() {
    this.setState({
      rowChatId: 0,
      showHistoricalChat: false,
      chatTimeAgo: "",
      pastChatTableRowSizeExpanded: 10,
    });
  }

  //handle change main tabs
  handleMainTabChange(e) {
    this.setState({ mainTabSelect: e });
    if (e === 2) {
      if (this.state.isMobileView) {
        this.setState({
          showHistoricalChat: false,
          rowChatId: 0,
          recentChatTabClass: "show active",
          currentChatTabClass: "",
          recentChatNavlinkClass: "active",
          currentChatNavlinkClass: "",
          displayActionButton: "none",
        });
      } else {
        this.setState({
          showHistoricalChat: false,
          rowChatId: 0,
          recentChatTabClass: "show active",
          currentChatTabClass: "",
          recentChatNavlinkClass: "active",
          currentChatNavlinkClass: "",
          displayActionButton: "none",
        });
      }
      this.handleGetAgentRecentChat(this.state.customerId);
    } else {
      if (this.state.isMobileView) {
        this.setState({
          showHistoricalChat: false,
          rowChatId: 0,
          recentChatTabClass: "",
          currentChatTabClass: "show active",
          recentChatNavlinkClass: "",
          currentChatNavlinkClass: "active",
          displayActionButton: "inline",
        });
      } else {
        this.setState({
          showHistoricalChat: false,
          rowChatId: 0,
          recentChatTabClass: "",
          currentChatTabClass: "show active",
          recentChatNavlinkClass: "",
          currentChatNavlinkClass: "active",
          displayActionButton: "inline",
        });
      }

      if (!this.state.isMobileView) {
        this.handleGetChatMessagesList(this.state.chatId);
      }
    }
  }

  handleGetNewChat = async (mobileNo, msgData) => {
    this.setState({
      isMainLoader: true,
    });
    socket.send("hi");
    let self = this;
    var objNewChat = {
      userMaster_ID: self.state.AgentID,
      tenant_ID: self.state.tenantID,
      ProgramCode: self.state.programCode,
    };

    socket.emit("CallNewChatSP", objNewChat);
    // socket.on("connect", () => {
    
    socket.once(
      "CallNewChatSP" +
      objNewChat.ProgramCode.toLowerCase() +
      objNewChat.userMaster_ID,
      function (data) {
        var newChatsIncomingData = [];
        let newUnreadCount = 0
        
        if (data.length > 0) {
          
          for (let i = 0; i < data.length; i++) {
            var objData = {};
            objData.chatID = data[i].CurrentChatID;
            objData.storeID = data[i].StoreID;
            objData.programCode = data[i].ProgramCode;
            objData.customerID = data[i].CustomerID;
            objData.customerName = data[i].CustomerName;
            objData.mobileNo = data[i].CustomerNumber;
            objData.messageCount = data[i].NewMessageCount;
            objData.timeAgo = data[i].TimeAgo;
            objData.createdDate = data[i].CreatedDate;
            objData.storeManagerId = data[i].StoreManagerId;
            objData.storeManagerName = data[i].StoreManagerName;
            newUnreadCount += data[i].NewMessageCount
            if (data[i].IsCustEndChat === 0) {
              objData.isCustEndChat = false;
            } else {
              objData.isCustEndChat = true;
            }
            if (data[i].IsCustTimeout === 0) {
              objData.isCustTimeout = false;
            } else {
              objData.isCustTimeout = true;
            }
            objData.sourceName = data[i].SourceName;
            objData.chatSourceID = data[i].SourceID;
            objData.sourceAbbr = data[i].SourceAbbr;
            objData.sourceIconUrl = data[i].SourceIconUrl;
            newChatsIncomingData.push(objData);
          }

          if (
            JSON.stringify(newChatsIncomingData) !==
            localStorage.getItem("newChatsData")
          ) {
            localStorage.setItem(
              "newChatsData",
              JSON.stringify(newChatsIncomingData)
            );
            localStorage.setItem("newUnreadCount", newUnreadCount);

            for (let i = 0; i < newChatsIncomingData.length; i++) {
              newChatsIncomingData[i].initialColor =
                self.state.colorCode[Math.floor(Math.random() * 6)];
            }
            //self.setState({ newChatsData: newChatsIncomingData });
            if (self.state.newTicketChatId > 0) {
              var chatData = this.state.newChatsData.filter(
                (x) => x.chatID === self.state.newTicketChatId
              );
              self.handleNewChatNotification(chatData);
            }
            if (self.state.isNotiNewChat) {
              var chatData = self.state.newChatsData.filter(
                (x) => x.mobileNo === mobileNo
              );
              // if (chatData.length > 0) {
              //   const Sound1Play = new Audio();
              //   Sound1Play.src = JSON.parse(
              //     localStorage.getItem("newChatSoundFile")
              //   );
              //   Sound1Play.volume =
              //     Math.round(self.state.newChatSoundVolume / 10) / 10;
              //   Sound1Play.play();
              //   let newChatAudio = document.getElementById("newChatAudio");
              //   let newChatAudioSrc = "";
              //   if (
              //     JSON.parse(window.localStorage.getItem("newChatSoundFile"))
              //   ) {
              //     newChatAudioSrc = JSON.parse(
              //       window.localStorage.getItem("newChatSoundFile")
              //     );
              //   } else {
              //     newChatAudioSrc = self.state.newChatSoundFile;
              //   }
              //   if (newChatAudio) {
              //     newChatAudio.src = newChatAudioSrc;
              //     newChatAudio.volume =
              //       Math.round(self.state.newChatSoundVolume / 10) / 10;
              //     newChatAudio.play();
              //   }
              //   notification.open({
              //     key: chatData[0].chatID,
              //     duration: self.state.notificationTime,
              //     placement: "bottomRight",
              //     className: "hide-message-title",
              //     description: (
              //       <ChatNotificationComponent
              //         msgData={data[0]}
              //         chatData={chatData}
              //         handleChatNotificationClick={(e) =>
              //           self.handleNewChatNotification(e)
              //         }
              //         notitficationType={"NewChat"}
              //       />
              //     ),
              //   });
              // }
            }
          }
        } else {
          self.setState({ newChatsData: [], isMainLoader: false });
        }
      }
    );
  };

  //handleGet Ongoing Chat
  async handleGetOngoingChat(transferAgentId = 0) {
    let self = this;

    // socket.send("hi");
    var search = "";
    var objOngoing = {
      tenant_ID: self.state.tenantID,
      search: "",
      StoreMgr_ID: transferAgentId === 0 ? self.state.AgentID : transferAgentId,
      ProgramCode: self.state.programCode,
      ChatId: this.state.chatId,
    };

    socket.emit("CallOngoingSP", objOngoing);

    // socket.on("connect", () => {
    //  socket.on(
    //   "CallOngoingSP" + self.state.programCode.toLowerCase() + self.state.AgentID,
    //   function(data) {
    //     console.log("inside ongoing method")
    //     var ongoingChatsData = [];
    //     if (data.length > 0) {
    //       for (let i = 0; i < data.length; i++) {
    //         var objData = {};
    //         objData.chatID = data[i].CurrentChatID;
    //         objData.storeID = data[i].StoreID;
    //         objData.programCode = data[i].ProgramCode;
    //         objData.customerID = data[i].CustomerID;
    //         objData.customerName = data[i].CustomerName;
    //         objData.mobileNo = data[i].CustomerNumber;
    //         objData.messageCount = data[i].NewMessageCount;
    //         objData.timeAgo = data[i].TimeAgo;
    //         objData.createdDate = data[i].CreatedDate;
    //         objData.storeManagerId = data[i].StoreManagerId;
    //         objData.storeManagerName = data[i].StoreManagerName;
    //         if (data[i].IsCustEndChat === 0) {
    //           objData.isCustEndChat = false;
    //         } else {
    //           objData.isCustEndChat = true;
    //         }
    //         if (data[i].IsCustTimeout === 0) {
    //           objData.isCustTimeout = false;
    //         } else {
    //           objData.isCustTimeout = true;
    //         }
    //         objData.sourceName = data[i].SourceName;
    //         objData.chatSourceID = data[i].SourceID;
    //         objData.sourceAbbr = data[i].SourceAbbr;
    //         objData.sourceIconUrl = data[i].SourceIconUrl;
    //         ongoingChatsData.push(objData);
    //       }
    //     }

    //     localStorage.setItem(
    //       "ongoingChatsData",
    //       JSON.stringify(ongoingChatsData)
    //     );

    //     if (ongoingChatsData.length > 0) {
    //       for (let i = 0; i < ongoingChatsData.length; i++) {
    //         ongoingChatsData[i].initialColor =
    //           self.state.colorCode[Math.floor(Math.random() * 6)];
    //       }
    //     }
    //     self.setState({ ongoingChatsData });
    //   }
    // );
  }

  handleAutoCorrection = () => {
    
    if (
      this.state.isgrammarlyCheck //&&
      // this.state.storeAgentDetail.length > 0 &&
      // this.state.storeAgentDetail[0].grammarlyCheck === 1
    ) {
      if (this.state.message.length > 0) {
        var inputParam = {};
        inputParam.programCode = this.state.programCode;
        inputParam.text = this.state.message.replace(/(<([^>]+)>)/gi, "");
        inputParam.storeCode = this.state.storeCode;
        inputParam.MobileNo = this.state.mobileNo;
        inputParam.SourceType = this.state.sourceType;
        socket.emit("CallAutoCorrectionWrapper", inputParam);
        this.setState({ selectedSuggested_Words: {} });
        let self = this;
        socket.once(
          "CallAutoCorrectionWrapper" +
          this.state.storeCode.toLowerCase() +
          this.state.programCode.toLowerCase(),
          function (data) {
            if (data) {
              // if (data.Profane_Words.length > 0) {
              if (data.Profane_Word) {
                var Profane_Word_Temp = [];
                if (typeof data.Profane_Word === "object") {
                  Profane_Word_Temp = data.Profane_Word;
                } else {
                  Profane_Word_Temp = data.Profane_Word.split(",");
                }

                var profane_Words = [];
                Profane_Word_Temp.forEach((element) => {
                  var objProfan = {};
                  objProfan.Key = element;
                  objProfan.value = element;
                  objProfan.isChecked = false;
                  profane_Words.push(objProfan);
                });

                self.setState({ Profane_Words: profane_Words });
              } else {
                self.setState({ Profane_Words: [] });
              }
              self.setState({ Suggested_Words: data.Suggested_Word });

              if (
                data.Profane_Word.length === 0 &&
                Object.keys(data.Suggested_Word).length === 0
              ) {
                self.handleSendMessageToCustomer(
                  self.state.message,
                  "",
                  "",
                  null
                );
                if (self.state.isMobileView) {
                  self.setState({ grammarlyModal: false });
                }
              } else {
                if (self.state.isMobileView) {
                  self.setState({ grammarlyModal: true });
                } else {
                  if (document.getElementById("propoversugg")) {
                    document.getElementById("propoversugg").click();
                  }
                }
              }
            }
          }
        );
      } else {
        this.handleSendMessageToCustomer(this.state.message, "", "", null);
      }
    } else {
      this.handleSendMessageToCustomer(this.state.message, "", "", null);
    }
  };

  handleSuggetionWordClick = (key, value) => {
    if (this.state.Profane_Words.length > 0) {
      return false;
    }
    var selectedSuggested_Words = this.state.selectedSuggested_Words;
    selectedSuggested_Words[key] = value;
    var replaceMessageVal = "";
    var wordKey = Object.keys(selectedSuggested_Words);
    var finalReplaceMessageVal = "";
    if (this.state.replaceMessageVal) {
      replaceMessageVal = this.state.replaceMessageVal;
    } else {
      replaceMessageVal = this.state.message;
    }
    for (let i = 0; i < wordKey.length; i++) {
      var tempkey = wordKey[i];
      var tempvalue = selectedSuggested_Words[wordKey[i]];

      if (value) {
        finalReplaceMessageVal = replaceAll(
          replaceMessageVal,
          tempkey,
          tempvalue
        );
      }
    }
    this.setState({
      replaceMessageVal: finalReplaceMessageVal,
      selectedSuggested_Words,
    });
  };
  handleGrammarlyModalClose = () => {
    this.setState({
      grammarlyModal: false,
    });
  };

  handleGrammarlyModalOpen = () => {
    this.setState({
      grammarlyModal: true,
    });
  };
  handleGrammarlyApply = async () => {
    if (this.state.replaceMessageVal && this.state.Profane_Words.length === 0) {
      await this.setState({ message: this.state.replaceMessageVal });
      this.handleSendMessageToCustomer(
        this.state.replaceMessageVal,
        "",
        "",
        null
      );
      this.setState({
        Suggested_Words: {},
        selectedSuggested_Words: {},
        Profane_Words: [],
        replaceMessageVal: "",
        grammarlyModal: false,
      });
    }
  };
  handleGrammarlyIgnore = () => {
    if (this.state.Profane_Words.length === 0) {
      this.handleSendMessageToCustomer(this.state.message, "", "", false);
      this.setState({
        Suggested_Words: {},
        selectedSuggested_Words: {},
        Profane_Words: [],
        replaceMessageVal: "",
        grammarlyModal: false,
      });
    }
  };
  //handle get agent chat history
  handleGetAgentChatHistory() {
    let self = this;

    this.setState({ isHistoricalChatLoading: true });
    this.ChatService.Post("/CustomerChat/GetAgentChatHistory")
      .then((response) => {
        var message = response.message;
        var historicalChatData = response.responseData;
        if (message === "Success" && historicalChatData) {
          self.setState({ historicalChatData, isHistoricalChatLoading: false });
        } else {
          self.setState({
            historicalChatData: [],
            isHistoricalChatLoading: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //handle change tab click
  handleHistTabClick = () => {
    localStorage.setItem("isOngoingClick", false);
    localStorage.setItem("isNotiClicked", false);
    this.setState({
      isHistoricalChat: true,
      isDownbtn: false,
      messageData: [],
      rowChatId: 0,
      customerName: "",
      showHistoricalChat: false,
      mainTabSelect: 2,
      isCustEndChat: false,
      isCustTimeout: false,
      chatbotRightToggle: "chatbotRightClose",
      mobileNo: "",
      chatId: 0,
      recentChatTabClass: "",
      currentChatTabClass: "show active",
      recentChatNavlinkClass: "",
      currentChatNavlinkClass: "active",
      displayActionButton: "inline",
    });
    this.handleGetAgentChatHistory();
  };

  //handle get agent recent chat data
  handleGetAgentRecentChat(customerId) {
    let self = this;

    this.setState({ isPastChatLoading: true });
    let inputParams = {
      CustomerID: customerId,
      //PageNo: this.state.pastChatPageNo,
    };
    this.ChatService.PostWithParams(
      "/CustomerChat/GetAgentRecentChat",
      inputParams
    )
      .then((response) => {
        var message = response.message;
        var agentRecentChatData = response.responseData;

        if (message === "Success" && agentRecentChatData) {
          self.setState({ agentRecentChatData });
          self.setState({
            isPastChatLoading: false,
          });
        } else {
          self.setState({ agentRecentChatData });
          self.setState({ isPastChatLoading: false });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  shadeColor(color, percent) {
    // 
    if (color !== undefined) {
      var R = parseInt(color.substring(1, 3), 16);
      var G = parseInt(color.substring(3, 5), 16);
      var B = parseInt(color.substring(5, 7), 16);

      R = parseInt((R * (100 + percent)) / 100);
      G = parseInt((G * (100 + percent)) / 100);
      B = parseInt((B * (100 + percent)) / 100);

      R = R < 255 ? R : 255;
      G = G < 255 ? G : 255;
      B = B < 255 ? B : 255;

      var RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
      var GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
      var BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

      return "#" + RR + GG + BB;
    }
  }

  /// handle get profile last transcation data
  handleChatProfileLastTransactionData = (customerId) => {
    let self = this;
    this.setState({ lasttransactionLoader: true });
    let inputParams = {
      customerId: customerId,
    };
    this.ChatService.PostWithParams(
      "/CustomerChat/ChatProfileDetails",
      inputParams
    )
      .then((response) => {
        var message = response.message;
        var responseData = response.responseData;
        self.setState({ lasttransactionLoader: false });
        if (message === "Success" && responseData) {
          window.localStorage.setItem(
            "CustomerProfileDetails",
            JSON.stringify(responseData[0])
          );
          self.setState({
            CustomerName: responseData[0].customerName,
            customerEmail: responseData[0].customerEmail,
            customerTotalTickets: responseData[0].totalTickets,
            customerOpenTickets: responseData[0].openTickets,
          });
        } else {
          window.localStorage.setItem("CustomerProfileDetails", {});
        }
      })
      .catch((error) => {
        self.setState({ lasttransactionLoader: false });
        console.log(error);
      });
  };
  setTicketTitle = (e) => {
    let TicketTitlevalue = e.currentTarget.value;
    this.setState({ TicketTitle: TicketTitlevalue });
  };
  setTicketDOB = (e) => {
    let TicketDOBvalue = e.currentTarget.value;
    this.setState({ TicketDOB: TicketDOBvalue });
  };
  setTicketEmail = (e) => {
    let TicketEmailvalue = e.currentTarget.value;
    //const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
    const emailRegex = new RegExp("^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})?$")
    
    const isEmailPattern = emailRegex.test(TicketEmailvalue)
    if (isEmailPattern) {
      this.setState({ TicketEmail: TicketEmailvalue, isValidEmail: true });

    }
    else {
      this.setState({
        isValidEmail: false

      })
    }
  };
  setTicketDescription = (e) => {
    let TicketDescriptionvalue = e.currentTarget.value;
    this.setState({ TicketDescription: TicketDescriptionvalue });
  };

  setCustomereName = (e) => {
    let customername = e.currentTarget.value;
    this.setState({ customerName: customername });
  };

  handleCreateTicketCancelBtn() {
    this.setState({
      CrateTicketMdl: false,
      selectedCategory: "",
      selectedSubCategory: "",
      selectedIssueType: "",
      selectedSubject: "",
      ckeditorAdd: "",
      isValidEmail:true,
    });
  }

  handleCreateTicketBtn() {
    if (
      this.state.mobileNo.length > 0 &&
      this.state.selectedCategory > 0 &&
      this.state.selectedSubCategory > 0 &&
      this.state.selectedIssueType > 0 &&
      this.state.selectedBrand > 0
    ) {
      let inputParams = {
        ChatID: this.state.chatId,
        UserID: this.state.AgentID,
        EmailID: this.state.TicketEmail,
        Category: this.state.selectedCategory.toString(),
        SubCategory: this.state.selectedSubCategory.toString(),
        IssueType: this.state.selectedIssueType.toString(),
        CustomerID: this.state.customerId,
        CustomerMobileNumber: this.state.mobileNo,
        Brand: this.state.selectedBrand.toString(),
        Priority: "2",
        TicketTitle: this.state.TicketTitle,
        TicketDescription: this.state.TicketDescription,
        customerName:this.state.customerName
      };
      let self = this;
      axios({
        method: "post",
        url: config.apiUrl + "/HSChatTicketing/CreateChatTicket",
        headers: authHeader(),
        data: inputParams,
      })
        .then(function (res) {
          let Msg = res.data.message;
          if (Msg === "Success") {
            NotificationManager.success("Ticket Create successfully.");
            self.setState({ CrateTicketMdl: false });

            if (self.state.closeChatWithticketCreation) {
              self.handleUpdateStoreManagerChatStatus(3);
            }
          }
          self.setState({
            selectedCategory: "",
            selectedSubCategory: "",
            selectedIssueType: "",
            selectedSubject: "",
            ckeditorAdd: "",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({
        categoryCompulsion: "Category field is compulsory.",
        subCategoryCompulsion: "Sub Category field is compulsory.",
        issueTypeCompulsion: "Issue Type field is compulsory.",
        brandCompulsion: "Brand field is compulsary",
      });
    }
  }

  handleGetBanReasonList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetBanReasonList",
      headers: authHeader(),
    })
      .then(function (res) {
        let data = res.data.responseData;
        self.setState({
          banReasonData: data,
        });
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleCustomerChatTransfer(agentid, chatid) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/TransferCustomerChat",
      headers: authHeader(),
      params: {
        agentID: agentid,
        chatID: chatid,
      },
    })
      .then(function (res) {
        let message = res.data.message;
        let result = res.data.responseData;
        if (message === "Success" && result === 1) {
          self.setState({
            TransferChatMdl: false,
            AllAcount: false,
            customerName: "",
            messageData: [],
            isCustEndChat: false,
            isCustTimeout: false,
            chatbotRightToggle: "chatbotRightClose",
            chatId: 0,
            mobileNo: "",
          });
          var objNewChat = {
            userMaster_ID: self.state.AgentID,

            tenant_ID: self.state.tenantID,

            ProgramCode: self.state.programCode,

            ChatId: 0,
          };

          socket.emit("CallSetCurrentChatSP", objNewChat);
          self.handleGetOngoingChat();
          self.handleGetOngoingChat(agentid);
          NotificationManager.success("Chat Transfered Successfully !");
        } else if (message === "Success" && result === 2) {
          NotificationManager.error("Can't transfer chat. Agent is Busy !");
        }
        self.setState({
          selectedAgentIDToTransferchat: 0
        })
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleAgentDesignation = (e) => {
    let agentDesignation = e.target.value;
    this.setState({
      TargatedAgentDesignation: agentDesignation,
    });
  };

  handleAgentName = (e) => {
    let agentName = e.target.value;
    this.setState({
      TargatedAgentName: agentName,
    });
  };

  handleAgentEmail = (e) => {
    let email = e.target.value;
    this.setState({
      TargatedAgentEmail: email,
    });
  };

  handleOnSearchClick() {
    if (
      this.state.TargatedAgentEmail.length > 0 ||
      this.state.TargatedAgentDesignation.length > 0 ||
      this.state.TargatedAgentDesignation != "" ||
      this.state.TargatedAgentName.length > 0
    ) {
      this.handleGetAgentList();
      this.setState({
        isAgentFilterApplied: true,
      });
    } else {
      NotificationManager.error("input is required for search");
      this.setState({
        isAgentFilterApplied: false,
      });
    }
  }
  handleOnClickClear() {
    this.setState({
      isAgentFilterApplied: false,
      TargatedAgentDesignation: "",
      TargatedAgentEmail: "",
      TargatedAgentName: "",
    });
  }

  handleAddVisitorNoteChange = (event) => {
    let note =
      event.target.value === null || event.target.value === ""
        ? " "
        : event.target.value;
    // if(note.length > 0){
    //     this.handleAddVisitorNote(this.state.customerId, this.state.mobileNo, note);
    // }
    this.setState({
      visitorNote: note,
    });
  };

  handleAddVisitorNote(customerId, mobileNo, note) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/AddVisitorNote",
      headers: authHeader(),
      params: {
        customerId: customerId,
        mobileNo: mobileNo,
        note: note,
      },
    })
      .then(function (res) {
        let data = res.data.responseData;
        if (data != null) {
          self.setState({
            visitorNote: note,
          });
          NotificationManager.success("Note Saved Successfully !");
        } else {
          self.setState({
            visitorNote: "",
          });
          NotificationManager.error("Note not saved.");
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleGetVisitorNote(customerId, mobileNo) {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CustomerChat/GetVisitorNote",
      headers: authHeader(),
      params: {
        customerId: customerId,
        mobileNo: mobileNo,
      },
    })
      .then(function (res) {
        let data = res.data.responseData;
        if (data !== null) {
          self.setState({
            visitorNote: data,
          });
        } else {
          self.setState({
            visitorNote: "",
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleSaveVisitorNote() {
    if (this.state.visitorNote.length > 0) {
      this.handleAddVisitorNote(
        this.state.customerId,
        this.state.mobileNo,
        this.state.visitorNote
      );
    }
  }

  handleSendAttachmentFileOnChatAPI = () => {
    
    var self = this;
    // if (this.state.isAttachmentMainLoader) {
    //   return false;
    // }
    for (let i = 0; i < this.state.AttachementFiles.length; i++) {
      this.setState({ isAttachmentMainLoader: true });
      var attachmentMessage = "";
      if (this.state.message) {
        attachmentMessage = this.state.message;
      } else {
        attachmentMessage = this.state.suggestionText;
      }
      var formData = new FormData();
      formData.append("Attachment", this.state.AttachementFiles[i]);
      formData.append("AttachmentMessage", attachmentMessage);
      formData.append("ChatSource", this.state.sourceType);
      formData.append("ChatID", this.state.chatId);
      formData.append("CustomerMobileNo", this.state.mobileNo);
      this.ChatService.PostWithData(
        "/CustomerChat/SendAttachmentOnChat",
        formData
      )
        .then((response) => {
          var msg = response.message;
          if (msg === "Success" && response.responseData) {
            
            var attachmentSendCount = self.state.attachmentSendCount + 1;
            var messageData = self.state.messageData;
            var objMessgage = {};
            objMessgage.isBotReply = false;
            objMessgage.chatDate = "Today";
            objMessgage.chatTime = new Date().toLocaleTimeString();
            objMessgage.byCustomer = false;
            objMessgage.message = attachmentMessage;
            objMessgage.isAttachment = true;
            objMessgage.attachment = response.responseData;
            messageData.push(objMessgage);
            self.setState({
              attachmentSendCount,
              messageData,
              isScroll: true,
              message: "",
              suggestionText: "",
              ckeditorAdd: "",
              replaceMessageVal: ""
            });
            console.log("messageDatacheck",messageData)

            if (self.state.sourceType === "wb") {
              var ObjDoc = {};
              var dataObj = {};
              ObjDoc.attachmentUrl = response.responseData;
              ObjDoc.attachmentType = self.state.AttachementFiles[i].name.match(
                /(\.pdf|\.doc|\.docx)$/
              )
                ? "Document"
                : "Image";
              ObjDoc.Text = attachmentMessage;
              dataObj = {
                isFromAgent: true,
                chatId: self.state.chatId,
                StoreMgr_ID: self.state.sAgentId,
                userMaster_ID: self.state.AgentID,
                ProgramCode: self.state.programCode,
                StoreCode: self.state.storeCode,
                Source: self.state.sourceType,
                MobileNo: self.state.mobileNo,
                MessageData: attachmentMessage,
                isCard: false,
                cardItem: null,
                isAppointment: false,
                appointmentData: null,
                isAttachment:
                  self.state.AttachementFiles.length > 0 ? true : false,
                attachmentData: ObjDoc,
                sentAt:
                  new Date().getMonth() +
                  1 +
                  "/" +
                  new Date().getDate() +
                  "/" +
                  new Date().getFullYear() +
                  " " +
                  new Date().getHours() +
                  ":" +
                  new Date().getMinutes() +
                  ":" +
                  new Date().getSeconds(),
                HeaderToken: authHeader()["X-Authorized-Token"],
                isSuccess: true,
                message: "OK",
                appVersion: "2.0",
              };
              socket.emit("SendBellReplyV2", dataObj); ///web bot
            }
            if (attachmentSendCount === self.state.AttachementFiles.length) {
              
              self.setState({
                isAttachmentMainLoader: false,
                AttachementFiles: [],
                message: "",
                suggestionText: "",
                attachmentSendCount: 0,
              });
            } else {
              self.setState({
                isAttachmentMainLoader: true,
              });
            }
          } else {
            
            var attachmentSendCount = self.state.attachmentSendCount + 1;
            self.setState({
              isAttachmentMainLoader: false,
              attachmentSendCount,
            });
            NotificationManager.error("Attachment sending failed.");
          }
        })
        .catch((error) => {
          NotificationManager.error("Attachment sending failed.");
          self.setState({ isAttachmentMainLoader: false });
          console.log(error);
        });
    }
    self.setState({
      AttachementFiles: [],
      isAttachmentMainLoader: false,
    })

  };

  ///handle set row class
  setRowClassName = (record) => {
    return record.chatID === this.state.rowChatId ? "clickRowStyl" : "";
  };

  setRowClassNameForAgentList = (record) => {
    return record.storeManagerID === this.state.rowChatId ? "clickRowStyl" : "";
  };

  setRowClassNameForShortcutSelect = (record) => {
    return record.shortcutID === this.state.shortcutID ? "clickRowStyl" : "";
  };

  handleFileUploading = async (e) => {
    
    var fileArray = this.state.AttachementFiles;
    var selectedFiles = e;
    var fileSize = e;
    if (e.length === 0) {
      NotificationManager.error(
        "Only JPG, JPEG, PNG, PDF & DOC files are allowed."
      );
    }
    for (let i = 0; i < selectedFiles.length; i++) {
      if (
        !selectedFiles[i].name.match(
          /(\.jpg|\.jpeg|\.png|\.webp|\.pdf|\.doc|\.docx|\.JPG)$/
        )
      ) {
        NotificationManager.error(
          "Only jpeg, jpg, png, webp,pdf, doc,docx is allowed."
        );
      } else {
        var Maxsize = 1024 * 5;
        if (Maxsize * 1000 < fileSize[i].size) {
          NotificationManager.error(
            "File too Big, please select a file less than 5MB."
          );
        } else {
          var file = selectedFiles[i];
          if (
            selectedFiles[i].name.match(/(\.jpg|\.jpeg|\.png|\.webp|\.JPG)$/)
          ) {
            var options = {
              maxSizeMB: 1,
              maxWidthOrHeight: 1920,
              useWebWorker: true,
            };
            // let fileData = await imageCompression(imageFile, options);
            await imageCompression(file, options)
              .then((compressedBlob) => {
                compressedBlob.lastModifiedDate = new Date();
                const convertedBlobFile = new File(
                  [compressedBlob],
                  file.name,
                  { type: file.type, lastModified: Date.now() }
                );
                fileArray.push(convertedBlobFile);
              })
              .catch((e) => { });
          } else {
            fileArray.push(selectedFiles[i]);
          }
          this.setState({
            AttachementFiles: fileArray,
          });
        }
      }
    }
  };
  handleAttachementdownload = () => {
    // window.open(this.state.attachmentDocUrl);
    const link = document.createElement("a");
    link.href = this.state.attachmentDocUrl;
    link.setAttribute("download", this.state.attachmentDocUrl.split("/").pop());
    document.body.appendChild(link);
    link.click();
  };
  handleOpenAttacment = (url, isImage) => {
    if (isImage) {
      this.setState({
        attachementViewModal: true,
        attachmentUrl: url,
        attachmentDocUrl: "",
      });
    } else {
      this.setState({
        attachementViewModal: true,
        attachmentDocUrl: url,
        attachmentUrl: "",
      });
    }
  };

  handleOpenFileShow() {
    this.setState({
      fileShowMdl: true,
    });
  }
  handleFileClose() {
    this.setState({
      fileShowMdl: false,
    });
  }

  handleCancelFile(i) {
    if (this.state.AttachementFiles.length > 1) {
      let AttachementFiles = [...this.state.AttachementFiles];
      AttachementFiles.splice(i, 1);
      this.setState({ AttachementFiles });
    } else {
      this.setState({
        fileShowMdl: false,
        AttachementFiles: [],
      });
    }
  }

  handleAttachementViewModalClose = () => {
    this.setState({
      attachementViewModal: false,
      attachmentDocUrl: "",
      attachmentUrl: "",
    });
  };

  HandleRowClickPage = (id, sourceType) => {
    let Id = id;
    let ticketSourceType = "ChatBot";
    let self = this;
    self.setState({
      ticketDetailID: Id,
    });
    let a = {
      ticketDetailID: Id,
      sourceName: ticketSourceType,
    }
    localStorage.setItem("state", JSON.stringify(a));
    window.open("myticket", "_blank", "noreferrer");
    // setTimeout(function() {
    //   self.props.history.push({
    //     pathname: "myticket",
    //     ticketDetailID: Id,
    //     sourceName: ticketSourceType,
    //   });
    // }, 1000);
  };

  //handle get chat notification count
  async  handleGetChatNotificationCount() {
    let self = this;
    var objNotiCount = {
      userMaster_ID: this.state.AgentID,
      tenant_ID: this.state.tenantID,
      ProgramCode: this.state.programCode,
      StoreCode: this.state.storeCode,
    };

    socket.emit("CallChatNotificationCount", objNotiCount);

    socket.once(
      "CallChatNotificationCount" + this.state.programCode.toLowerCase(),
      function (data) {
        if (data) {
          self.setState({
            chatMessageCount: data[0].TotalUnreadChatCount,
          });
          if (document.getElementById("chatMessageCount")) {
            document.getElementById("chatMessageCount").innerText =
              data[0].TotalUnreadChatCount;
          }
          if (document.getElementById("chatMessageCountMobile")) {
            document.getElementById("chatMessageCountMobile").innerText =
              data[0].TotalUnreadChatCount;
          }
        } else {
          self.setState({
            chatMessageCount: data[0].TotalUnreadChatCount,
          });
          if (document.getElementById("chatMessageCount")) {
            document.getElementById("chatMessageCount").innerText =
              data[0].TotalUnreadChatCount;
          }
          if (document.getElementById("chatMessageCountMobile")) {
            document.getElementById("chatMessageCountMobile").innerText =
              data[0].TotalUnreadChatCount;
          }
        }
      }
    );
  }

  //handle get chat sound notification setting
  handleGetChatSoundNotiSetting = () => {
    let self = this;
    var responseData = JSON.parse(
      window.localStorage.getItem("ChatSoundNotiSetting")
    );
    self.setState({
      newChatSoundVolume: responseData?.newChatSoundVolume || 0,
      newMessageSoundVolume: responseData?.newMessageSoundVolume || 0,
      isNotiNewChat: responseData?.isNotiNewChat || false,
      isNotiNewMessage: responseData?.isNotiNewMessage || false,
      notificationTime: responseData?.notificationTime,
      tenantID: responseData?.tenantID,
    });
    // this.ChatService.Post("/CustomerChat/GetChatSoundNotiSetting")
    //   .then((response) => {
    //     var message = response.message;
    //     var responseData = response.responseData;
    //     if (message === "Success" && responseData) {
    //       var reader = new FileReader();
    //       var reader1 = new FileReader();

    //       fetch(responseData.newMessageSoundFile).then(function (res) {
    //         res.blob().then(function (blob) {
    //           reader.addEventListener("loadend", function () {
    //             var base64FileData = reader.result.toString();
    //             self.setState({
    //               newMessageSoundFile: base64FileData,
    //             });
    //             localStorage.setItem(
    //               "newMessageSoundFile",
    //               JSON.stringify(base64FileData)
    //             );
    //           });
    //           reader.readAsDataURL(blob);
    //         });
    //       });

    //       fetch(responseData.newChatSoundFile).then(function (res) {
    //         res.blob().then(function (blob) {
    //           reader1.addEventListener("loadend", function () {
    //             var base64FileData = reader1.result.toString();
    //             self.setState({
    //               newChatSoundFile: base64FileData,
    //             });
    //             localStorage.setItem(
    //               "newChatSoundFile",
    //               JSON.stringify(base64FileData)
    //             );
    //           });
    //           reader1.readAsDataURL(blob);
    //         });
    //       });
    //       window.localStorage.setItem(
    //         "ChatSoundNotiSetting",
    //         JSON.stringify(responseData)
    //       );
    //       self.setState({
    //         newChatSoundVolume: responseData.newChatSoundVolume || 0,
    //         newMessageSoundVolume: responseData.newMessageSoundVolume || 0,
    //         isNotiNewChat: responseData.isNotiNewChat || false,
    //         isNotiNewMessage: responseData.isNotiNewMessage || false,
    //         notificationTime: responseData.notificationTime,
    //         tenantID: responseData.tenantID,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  //handle new chat notification click
  handleNewChatNotification = (chatData) => {
    notification.close(chatData[0].chatID);

    if (window.location.pathname !== "admin/chatbot") {
      this.props.history.push({
        pathname: "chatbot",
        state: {
          programCode: this.state.programCode,
          storeCode: this.state.storeCode,
          tenantID: this.state.tenantID,
          agentId: this.state.AgentID,
          UserName: this.state.UserName,
          chatId: chatData[0].chatID,
        },
      });
      this.handleUpdateCustomerChatStatus(
        chatData[0].chatID,
        chatData[0].storeManagerId,
        chatData[0].storeID,
        chatData[0].customerName,
        chatData[0].mobileNo,
        chatData[0].customerID,
        chatData[0].programCode,
        chatData[0].sourceAbbr
      );
    } else {
      this.handleUpdateCustomerChatStatus(
        chatData[0].chatID,
        chatData[0].storeManagerId,
        chatData[0].storeID,
        chatData[0].customerName,
        chatData[0].mobileNo,
        chatData[0].customerID,
        chatData[0].programCode,
        chatData[0].sourceAbbr
      );
    }
    this.setState({
      newTicketChatId: 0,
    });
  };

  handleGetAllShortcut() {
    this.ChatService.Post("/CustomerChat/GetAllShortcuts")
      .then((response) => {
        let Msg = response.message;
        let data = response.responseData;
        if (Msg === "Success") {
          this.setState({
            ShortcutList: data,
          });
        } else {
          this.setState({
            ShortcutList: [],
          });
        }
      })
      .catch((data) => { });
  }

  handleShowShortcutModal() {
    this.setState({
      shortcutModal: true,
    });
  }

  handleshortcutModalCls() {
    this.setState({
      shortcutModal: false,
    });
  }

  handleShortcutClick(record, index, event) {
    this.setState({
      message: this.state.message + record.messageDecription,
      ckeditorAdd: `<p>${this.state.ckeditorAdd
        .replaceAll("<p>", "")
        .replaceAll("</p>", "") + record.messageDecription}</p>`,
      shortcutModal: false,
    });
  }

  render() {
    console.log("this.state.messageData",this.state.messageData);
    console.log("this.state.IsCustEndChat",this.state.isCustEndChat);
    console.log("this.state.isCustTimeout",this.state.isCustTimeout);
    console.log("this.state.customerName",this.state.customerName);
    console.log("this.props",this.props);
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 p-0">
            <div className="chatbot-left">
              <div className="chat-cntr">
                <p className="ongng">
                  Ongoing Chats (
                  {this.state.ongoingChatsData?.length < 9
                    ? "0" + this.state.ongoingChatsData?.length
                    : this.state.ongoingChatsData?.length}
                  )
                </p>
                <div className="chat-left-height">
                  {this.state.ongoingChatsData &&
                    this.state.ongoingChatsData.map((chat, i) => (
                      <div
                        id={chat.chatID}
                        key={i}
                        className={
                          this.state.chatId === chat.chatID
                            ? "chat-info active"
                            : "chat-info"
                        }
                        onClick={this.handleOngoingChatClick.bind(
                          this,
                          chat.chatID,
                          chat.customerName,
                          chat.messageCount,
                          chat.mobileNo,
                          chat.customerID,
                          chat.programCode,
                          chat.storeID,
                          chat.isCustEndChat,
                          chat.storeManagerId,
                          chat.initialColor,
                          chat.isCustTimeout,
                          chat.sourceAbbr
                        )}
                      >
                        <div className="d-flex align-items-center overflow-hidden">
                          
                          <span
                            className="initial"
                            style={{
                              backgroundColor: chat.initialColor,
                              color: this.shadeColor(chat.initialColor, -70),
                            }}
                          >
                            {chat.customerName.charAt(0)}
                          </span>
                          <div className="name-num ml-2">
                            <p>
                              {" "}
                              {chat.customerName}
                              {chat.sourceIconUrl ? (
                                <img
                                  src={chat.sourceIconUrl}
                                  alt="sourcetype"
                                  title={chat.sourceName}
                                  style={{ marginLeft: "5px" }}
                                />
                              ) : null}
                            </p>
                            <p className="num">{chat.mobileNo}</p>
                          </div>
                        </div>
                        <div>
                          <div className="mess-time">
                            {!this.state.onHoverName ? (
                              <p
                                style={{
                                  fontWeight:
                                    chat.messageCount > 0 ? "bold" : "400",
                                }}
                              >
                                {chat.messageCount === 0 ? (
                                  "No New Message"
                                ) : (
                                  <span className="messagecount">
                                    {chat.messageCount}
                                  </span>
                                )}
                              </p>
                            ) : null}
                            <p>{chat.timeAgo}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="chat-cntr">
                <p className="ongng">
                  New Chats (
                  {this.state.newChatsData?.length < 9
                    ? "0" + this.state.newChatsData?.length
                    : this.state.newChatsData?.length}
                  )
                </p>
                <div className="chat-left-height">
                  {this.state.newChatsData &&
                    this.state.newChatsData.map((chat, i) => (
                      <div
                        key={i}
                        className={
                          this.state.chatId === chat.chatID
                            ? "chat-info active"
                            : "chat-info"
                        }
                        onClick={this.handleUpdateCustomerChatStatus.bind(
                          this,
                          chat.chatID,
                          chat.storeManagerId,
                          chat.storeID,
                          chat.customerName,
                          chat.mobileNo,
                          chat.customerID,
                          chat.programCode,
                          chat.sourceAbbr,
                          chat.messageCount
                        )}
                      >
                        <div className="d-flex align-items-center overflow-hidden">
                          <span
                            className="initial"
                            style={{
                              backgroundColor: chat.initialColor,
                            }}
                          >
                            {chat.customerName.charAt(0)}
                          </span>
                          <div className="name-num ml-2">
                            <p>
                              {" "}
                              {chat.customerName}
                              {chat.sourceIconUrl ? (
                                <img
                                  src={chat.sourceIconUrl}
                                  alt="sourcetype"
                                  title={chat.sourceName}
                                  style={{ marginLeft: "5px" }}
                                />
                              ) : null}
                            </p>

                            <p className="num">{chat.mobileNo}</p>
                          </div>
                        </div>
                        <div>
                          <div className="mess-time">
                            {!this.state.onHoverName ? (
                              <p
                                style={{
                                  fontWeight:
                                    chat.messageCount > 0 ? "bold" : "400",
                                }}
                              >
                                {chat.messageCount === 0 ? (
                                  "No New Message"
                                ) : (
                                  <span className="messagecount">
                                    {chat.messageCount}
                                  </span>
                                )}
                              </p>
                            ) : null}
                            <p>{chat.timeAgo}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="chat-hist">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#my-historical-chat"
                    role="tab"
                    aria-controls="my-historical-chat"
                    aria-selected="false"
                    onClick={this.handleHistTabClick.bind(this)}
                  >
                    MY HISTORICAL CHAT
                  </a>
                </li>
              </div>
            </div>
            {/* <button
              className="butn-inv hist-btn"
              // onClick={this.handlePageChange.bind(this)}
              onClick={this.handleHistTabClick.bind(this)}
            >
              My historical chat
            </button> */}
          </div>
          <div className="col-lg-9 p-0">
            {this.state.isHistoricalChat !== true ? 
            
            (
              <div className={`chatbot-right ${this.state.chatbotRightToggle}`}>
                <div className="row m-auto" style={{ height: "inherit" }}>
                  <div className="col-lg-12 p-0" style={{ height: "inherit" }}>
                    {/* *********************** chatbot -right Navbar START************************* */}
                    <div className="row m-auto" style={{ height: "50px" }}>
                      <div className="col-lg-12 p-0">
                        <div
                          className="chatdivtitle"
                          style={{ padding: "5px", height: "" }}
                        >
                          <div className="row m-auto">
                            <ul
                              className="nav nav-tabs"
                              role="tablist"
                              style={{
                                width: "50%",
                                display: "inline-block",
                                border: "none",
                              }}
                            >
                              <li className="nav-item">
                                <a
                                  className={`nav-link ${this.state.currentChatNavlinkClass}`}
                                  data-toggle="tab"
                                  href="#current-chat-tab"
                                  role="tab"
                                  aria-controls="current-chat-tab"
                                  aria-selected="false"
                                  onClick={this.handleMainTabChange.bind(
                                    this,
                                    1
                                  )}
                                >
                                  Current Chat
                                </a>
                              </li>
                              <li className="nav-item">
                                <a
                                  className={`nav-link ${this.state.recentChatNavlinkClass}`}
                                  data-toggle="tab"
                                  href="#recent-chat-tab"
                                  role="tab"
                                  aria-controls="recent-chat-tab"
                                  aria-selected="true"
                                  onClick={this.handleMainTabChange.bind(
                                    this,
                                    2
                                  )}
                                >
                                  Recent Chat ({this.state.recentChatCount})
                                </a>
                              </li>
                            </ul>
                            <ul className="nav nav-tabs ml-auto">
                              <li className="nav-item ">
                                {/* <button
                        className="butn"
                        onClick={this.handleAccountAllOpen.bind(this)}
                      >
                        ACTION<i class="arrow down"></i>
                      </button> */}
                                <button
                                  type="button"
                                  className={`butn`}
                                  onClick={this.handleAccountAllOpen.bind(this)}
                                  style={{
                                    display: `${this.state.displayActionButton}`,
                                  }}
                                >
                                  <label
                                    className="myticket-submit-solve-button-text"
                                    style={{ display: "inline" }}
                                  >
                                    {"Action"}
                                    <img
                                      src={downArrowWhite}
                                      alt="down-icon"
                                      className="down-white"
                                    />
                                  </label>
                                </button>
                              </li>
                              <li className="nav-item ">
                                <button
                                  className="butn chat-close"
                                  onClick={this.handleCloseChatBox.bind(this)}
                                >
                                  X
                                </button>
                              </li>
                              <Modal
                                onClose={this.handleAccountAllClose.bind(this)}
                                open={this.state.AllAcount}
                                modalId="MdlForAction"
                                overlayId="logout-ovrly"
                              >
                                <div className="popgrid">
                                  <ul>
                                    <li
                                      onClick={this.handleTransferChatMdlOpen.bind(
                                        this
                                      )}
                                      className="mb-2"
                                    >
                                      <label>
                                        Transfer to Agent/Supervisor
                                      </label>
                                    </li>
                                    <li
                                      onClick={this.handleBanVisitorMdlOpen.bind(
                                        this
                                      )}
                                      className="mb-2"
                                    >
                                      <label>Ban Visitor</label>
                                    </li>
                                    {/* <li className="mb-2">
                                      <label>Translate Chat</label>
                                    </li> */}
                                    <li
                                      className="mb-2"
                                      onClick={this.handleUpdateStoreManagerChatStatus.bind(
                                        this,
                                        3
                                      )}
                                    >
                                      <label>End Chat</label>
                                    </li>
                                    <li
                                      className="EndChatLable"
                                      onClick={this.handleCreateEndChatMdlOpen.bind(
                                        this
                                      )}
                                    >
                                      <label>End Chat & Create Ticket</label>
                                    </li>
                                  </ul>
                                </div>
                              </Modal>
                              <Modal
                                open={this.state.TransferChatMdl}
                                modalId="TranferChatMdl"
                                overlayId="logout-ovrly"
                                onClose={this.handleTransferChatMdlClose.bind(
                                  this
                                )}
                              >
                                <div className="TransferChatdiv">
                                  <div className="TransferChatHeader">
                                    <div>
                                      <h5>
                                        <img
                                          src={leftBackArrowIcon}
                                          alter="leftBackArrowIcon"
                                          className="backleftArrow"
                                          onClick={this.handleTransferChatMdlClose.bind(
                                            this
                                          )}
                                          alt="CloseTransferChatModel"
                                        />
                                        <b>TRANSFER CHAT TO</b>
                                      </h5>
                                    </div>
                                    <div>
                                      <img
                                        src={SearchBlackImg}
                                        alt="searchBlackIcon"
                                        className="searchBlackIcon"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <input
                                      type="text"
                                      className="addkb-subject"
                                      placeholder="Agent Name"
                                      value={this.state.TargatedAgentName}
                                      onChange={this.handleAgentName.bind(this)}
                                    />
                                  </div>
                                  {/* <div>
                                    <input
                                      type="text"
                                      className="addkb-subject"
                                      placeholder="Last Name"
                                    />
                                  </div> */}
                                  <div>
                                    <input
                                      type="text"
                                      className="addkb-subject"
                                      placeholder="Email"
                                      value={this.state.TargatedAgentEmail}
                                      onChange={this.handleAgentEmail.bind(
                                        this
                                      )}
                                    />
                                  </div>
                                  <div>
                                    <input
                                      type="text"
                                      className="addkb-subject"
                                      placeholder="Designation"
                                      value={
                                        this.state.TargatedAgentDesignation
                                      }
                                      onChange={this.handleAgentDesignation.bind(
                                        this
                                      )}
                                    />
                                  </div>
                                  <div className="transferchat-srchAndClrBtn">
                                    <div>
                                      <button
                                        className="butn transfer-search"
                                        onClick={this.handleOnSearchClick.bind(
                                          this
                                        )}
                                      >
                                        SEARCH
                                      </button>
                                    </div>
                                    <div
                                      className="transferchat-srchAndClrBtn-p"
                                      onClick={this.handleOnClickClear.bind(
                                        this
                                      )}
                                    >
                                      <p>CLEAR</p>
                                    </div>
                                  </div>

                                  <div className="chathistory-tbl histochat">
                                    <div className="table-cntr chat-history chatabcus mg-rm now-rap-tbl-txt TransferChatAgentTable">
                                      {this.state.isAgentFilterApplied ===
                                        true ? (
                                        <Table
                                          loading={this.state.isPastChatLoading}
                                          noDataContent="No Record Found"
                                          className="components-table-demo-nested antd-table-campaign custom-antd-table add-cursor"
                                          columns={[
                                            {
                                              title: "Agent",
                                              //dataIndex: "agentName",
                                              width: "20%",
                                              className:
                                                "textnowrap-table, AgentNameDiv",
                                              render: (row, rowData) => {
                                                return (
                                                  <>
                                                    <div className="headphonediv">
                                                      <img
                                                        src={headphoneIcon}
                                                        alt="headphone"
                                                        className="headphone-circle-css"
                                                      />
                                                    </div>
                                                    {rowData.agentName}
                                                  </>
                                                );
                                              },
                                            },
                                            {
                                              title: "Designation",
                                              // dataIndex: "agentDesignation",
                                              width: "20%",
                                              className: "textnowrap-table",
                                              render: (row, rowData) => {
                                                return (
                                                  <>
                                                    {rowData.agentDesignation
                                                      .length > 0
                                                      ? rowData.agentDesignation
                                                      : "NA"}
                                                  </>
                                                );
                                              },
                                            },
                                            {
                                              title: "Email ID",
                                              width: "20%",
                                              className: "textnowrap-table",
                                              render: (row, rowData) => {
                                                return (
                                                  <>
                                                    {rowData.agentEmail.length >
                                                      0
                                                      ? rowData.agentEmail
                                                      : "NA"}
                                                  </>
                                                );
                                              },
                                            },
                                          ]}
                                          dataSource={
                                            this.state.filteredAgentData
                                          }
                                          onRow={(record, index) => ({
                                            onClick: (event) => {
                                              this.handleAgentListTableRowClick(
                                                record,
                                                index,
                                                event
                                              );
                                            },
                                          })}
                                          pagination={{
                                            pageSize: 3,
                                            defaultPageSize: 3,
                                          }}
                                          rowKey={(record) => {
                                            if (record.chatID) {
                                              uid = uid + 1;
                                              return record.chatID + "g" + uid;
                                            } else {
                                              uid = uid + 1;
                                              return "h" + uid;
                                            }
                                          }}
                                          rowClassName={
                                            this.setRowClassNameForAgentList
                                          }
                                        ></Table>
                                      ) : (
                                        <Table
                                          loading={this.state.isPastChatLoading}
                                          noDataContent="No Record Found"
                                          className="components-table-demo-nested antd-table-campaign custom-antd-table add-cursor"
                                          columns={[
                                            {
                                              title: "Agent",
                                              dataIndex: "agentName",
                                              width: "20%",
                                              className:
                                                "textnowrap-table, AgentNameDiv",
                                              render: (row, rowData) => {
                                                return (
                                                  <>
                                                    <div className="headphonediv">
                                                      <img
                                                        src={headphoneIcon}
                                                        alt="headphone"
                                                        className="headphone-circle-css"
                                                      />
                                                    </div>
                                                    {rowData.agentName}
                                                  </>
                                                );
                                              },
                                            },
                                            {
                                              title: "Designation",
                                              // dataIndex: "agentDesignation",
                                              width: "20%",
                                              className: "textnowrap-table",
                                              render: (row, rowData) => {
                                                return (
                                                  <>
                                                    {rowData.agentDesignation
                                                      .length > 0
                                                      ? rowData.agentDesignation
                                                      : "NA"}
                                                  </>
                                                );
                                              },
                                            },
                                            {
                                              title: "Email ID",
                                              width: "20%",
                                              className: "textnowrap-table",
                                              render: (row, rowData) => {
                                                return (
                                                  <>
                                                    {rowData.agentEmail.length >
                                                      0
                                                      ? rowData.agentEmail
                                                      : "NA"}
                                                  </>
                                                );
                                              },
                                            },
                                          ]}
                                          dataSource={this.state.agentData}
                                          onRow={(record, index) => ({
                                            onClick: (event) => {
                                              this.handleAgentListTableRowClick(
                                                record,
                                                index,
                                                event
                                              );
                                            },
                                          })}
                                          pagination={{
                                            pageSize: 3,
                                            defaultPageSize: 3,
                                          }}
                                          rowKey={(record) => {
                                            if (record.chatID) {
                                              uid = uid + 1;
                                              return record.chatID + "g" + uid;
                                            } else {
                                              uid = uid + 1;
                                              return "h" + uid;
                                            }
                                          }}
                                          rowClassName={
                                            this.setRowClassNameForAgentList
                                          }
                                        ></Table>
                                      )}
                                      <button
                                        className="butn mt-3 w-100"
                                        onClick={this.handleTransferChatBtnClick.bind(
                                          this
                                        )}
                                      >
                                        TRANSFER CHAT
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </Modal>
                              <Modal
                                onClose={this.handleBanVisitorMdlClose.bind(
                                  this
                                )}
                                open={this.state.banVisitorMdl}
                                modalId="MdlForBanVisitor"
                                overlayId="logout-ovrly"
                              >
                                <div className="popgrid">
                                  <div className="banVisitorHeaders">
                                    <div className="BanTitle">
                                      <p>Ban Visitor</p>
                                    </div>
                                    <div>
                                      <img
                                        src={CancelImg}
                                        alt="banMdlCloseIcon"
                                        onClick={this.handleBanVisitorMdlClose.bind(
                                          this
                                        )}
                                      />
                                    </div>
                                  </div>
                                  <div className="banVisitorMdlContent">
                                    <div className="banVisitorMdlTitle">
                                      <h5>
                                        Are you sure you want to ban this
                                        visitor ?
                                      </h5>
                                    </div>
                                    <div className="banvisitorDrpDwnDiv">
                                      <select
                                        className="chat-allowed-sel"
                                        onChange={this.handleBanReasonChange}
                                      >
                                        <option value="0">
                                          Select reason of ban
                                        </option>
                                        {this.state.banReasonData !== null &&
                                          this.state.banReasonData.map(
                                            (item, i) => (
                                              <option
                                                key={i}
                                                value={item.banReasonID}
                                                className="select-category-placeholder"
                                              >
                                                {item.banReasonName}
                                              </option>
                                            )
                                          )}
                                      </select>
                                    </div>
                                    <div className="transferchat-srchAndClrBtn">
                                      {/* <div className="transferchat-srchAndClrBtn-p">
                                        <p 
                                         onClick={
                                          this.handleBanVisitorClear
                                        }
                                        >CLEAR</p>
                                      </div> */}
                                      <div>
                                        <button
                                          className="butn transfer-search"
                                          onClick={
                                            this.handleBanVisitorConfirmation
                                          }
                                        >
                                          CONFIRM
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Modal>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* *********************** chatbot -right Navbar END************************* */}
                    <div
                      className="row m-auto"
                      style={{ height: "calc(100% - 50px)" }}
                    >
                      <div
                        className="tab-content chattabtitle"
                        style={{ height: "100%" }}
                      >
                        <div
                          className={`tab-pane fade ${this.state.currentChatTabClass}`}
                          id="current-chat-tab"
                          role="tabpanel"
                          aria-labelledby="current-chat-tab"
                          style={{ height: "inherit" }}
                        >
                          <div
                            className="row m-0"
                            style={{ height: "inherit" }}
                          >
                            <div
                              className="col-md-8"
                              style={{ height: "inherit", paddingRight: "0" }}
                            >
                              <div
                                className="row m-auto"
                                style={{
                                  height:
                                    this.state.AttachementFiles.length > 0 &&
                                      this.state.CreateAndEndChat
                                      ? this.state
                                        .chatBoxHeightShrinkedForAttachmentAndEndChat
                                      : this.state.CreateAndEndChat
                                        ? this.state.chatBoxHeightShrinked
                                        : this.state.AttachementFiles.length > 0
                                          ? this.state
                                            .chatBoxHeightShrinkedForAttachment
                                          : this.state.chatBoxHeight,
                                  paddingBottom: "2%",
                                }}
                              >
                                <div
                                  className="col-lg-12 p-0"
                                  style={{ height: "100%" }}
                                >
                                  {this.state.loading === true ? (
                                    <div className="loader-icon"></div>
                                  ) : (
                                    <div
                                      className="chatcontentDiv"
                                      //id="tab-content-id"
                                      ref={(div) => {
                                        this.messageList = div;
                                      }}
                                      style={{ height: "inherit" }}
                                      onScroll={this.handleMessageDivScroll}
                                    >
                                      {/* <div className="tab-content" style={{overflow:this.state.activeTab===1?"auto":"hidden"}}> */}
                                      {/* --------Message Tab----- */}
                                      <div
                                        //sclassName="tab-pane fade active show"
                                        style={{
                                          overflow: "auto",
                                          paddingBottom: "30px",
                                          // maxHeight: "calc(100vh - 520px)",
                                        }}
                                        //id="message-tab"
                                        role="tabpanel"
                                        aria-labelledby="message-tab"
                                      >
                                        {this.state.messageData !== null
                                          ? this.state.messageData.map(
                                            (item, i) => {
                                              return (
                                                <div
                                                  key={i}
                                                  className={
                                                    item.byCustomer ===
                                                      true &&
                                                      item.isBotReply !== true
                                                      ? "chat-trail-cntr"
                                                      : "chat-trail-cntr chat-trail-cntr-right"
                                                  }
                                                >
                                                  <div className="chat-trail-img">
                                                    <span
                                                      className="chat-initial"
                                                      style={{
                                                        backgroundColor:
                                                          item.byCustomer ===
                                                            true &&
                                                            item.isBotReply !==
                                                            true
                                                            ? this.state
                                                              .selectedColor
                                                            : "#ddf6fc",
                                                      }}
                                                      alt="face image"
                                                      title={
                                                        item.byCustomer
                                                          ? item.customerName
                                                          : this.state
                                                            .UserName
                                                      }
                                                    >
                                                      {item.byCustomer
                                                        ? item.customerName
                                                          .split(" ")
                                                          .map((n) => n[0])
                                                          .join("")
                                                          .toUpperCase()
                                                        : this.state.UserName.split(
                                                          " "
                                                        )
                                                          .map((n) => n[0])
                                                          .join("")
                                                          .toUpperCase()}
                                                    </span>
                                                  </div>
                                                  <div className="chat-trail-chat-cntr">
                                                    {item.isBotReply && (
                                                      <p className="bot-mark">
                                                        {"BOT"}
                                                      </p>
                                                    )}

                                                    <div>
                                                      {item.attachment &&
                                                        item.attachment.match(
                                                          /(\.pdf|\.doc|\.docx)$/
                                                        ) ? (
                                                        <div className="card docCardAtt">
                                                          {this.state
                                                            .isMobileView ? (
                                                            <div
                                                              className="docFileAttach"
                                                              onClick={this.handleOpenAttacment.bind(
                                                                this,
                                                                item.attachment,
                                                                false
                                                              )}
                                                            >
                                                              <a>
                                                                {item
                                                                  .attachment
                                                                  .length >
                                                                  100
                                                                  ? item.attachment
                                                                    .substr(
                                                                      0,
                                                                      100
                                                                    )
                                                                    .concat(
                                                                      "..."
                                                                    )
                                                                    .split(
                                                                      "/"
                                                                    )
                                                                    .pop()
                                                                  : item.attachment
                                                                    .split(
                                                                      "/"
                                                                    )
                                                                    .pop()}
                                                              </a>
                                                            </div>
                                                          ) : (
                                                            <div className="docFileAttach">
                                                              <a
                                                                href={
                                                                  item.attachment
                                                                }
                                                                target={
                                                                  "_blank"
                                                                }
                                                                download={
                                                                  true
                                                                }
                                                              >
                                                                {item
                                                                  .attachment
                                                                  .length >
                                                                  100
                                                                  ? item.attachment
                                                                    .substr(
                                                                      0,
                                                                      100
                                                                    )
                                                                    .concat(
                                                                      "..."
                                                                    )
                                                                    .split(
                                                                      "/"
                                                                    )
                                                                    .pop()
                                                                  : item.attachment
                                                                    .split(
                                                                      "/"
                                                                    )
                                                                    .pop()}
                                                              </a>
                                                            </div>
                                                          )}
                                                        </div>
                                                      ) : (
                                                        <div className="card">
                                                          {item.isAttachment && (
                                                            <div
                                                              style={{
                                                                alignSelf:
                                                                  "center",
                                                              }}
                                                            >
                                                              {this.state
                                                                .isMobileView ? (
                                                                <>
                                                                  <img
                                                                    onClick={this.handleOpenAttacment.bind(
                                                                      this,
                                                                      item.attachment,
                                                                      true
                                                                    )}
                                                                    alt="attachmentimg"
                                                                    src={
                                                                      item.attachment
                                                                    }
                                                                    className="chat-product-img-attachment"
                                                                  />
                                                                </>
                                                              ) : (
                                                                <a
                                                                  href={
                                                                    item.attachment
                                                                  }
                                                                  target={
                                                                    "_blank"
                                                                  }
                                                                >
                                                                  <img
                                                                    src={
                                                                      item.attachment
                                                                    }
                                                                    alt="down-icon"
                                                                    className="chat-product-img-attachment"
                                                                  />
                                                                </a>
                                                              )}
                                                            </div>
                                                          )}
                                                        </div>
                                                      )}
                                                    </div>
                                                    <div
                                                      className={
                                                        item.isAttachmentDoc
                                                          ? "chat-trail-chatDoc pd-0"
                                                          : "chat-trail-chat pd-0"
                                                      }
                                                      style={
                                                        item.isAttachment
                                                          ? { width: "301px" }
                                                          : null
                                                      }
                                                    >
                                                      <Markup
                                                        content={item.message}
                                                      ></Markup>
                                                    </div>
                                                    <span className="chat-trail-time">
                                                      {item.chatDate + " "}
                                                      {item.chatTime}
                                                    </span>
                                                  </div>
                                                </div>
                                              );
                                            }
                                          )
                                          : null}
                                      </div>
                                      {this.state.customerName &&
                                        this.state.messageData.length === 0 ? (
                                        <Empty
                                          style={{ marginTop: "110px" }}
                                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                                        />
                                      ) : null}
                                      {this.state.isCustEndChat &&
                                        this.state.isCustTimeout === false &&
                                        this.state.customerName !== "" ? (
                                        <label className="endchatlbl">
                                          {
                                            "Customer has ended the conversation"
                                          }
                                        </label>
                                      ) : null}
                                      {this.state.isCustTimeout &&
                                        this.state.isCustEndChat === false &&
                                        this.state.customerName !== "" ? (
                                        <label className="endchatlbl">
                                          {
                                            "Chat has been timed-out from customer end"
                                          }
                                        </label>
                                      ) : null}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {this.state.CreateAndEndChat === true ? (
                                <div
                                  open={this.state.CreateAndEndChat}
                                  id="MdlForCreateEndCht"
                                  style={{
                                    backgroundColor: "transparent",
                                    background: "transparent",
                                  }}
                                  className="chatCreateEndBtn"
                                >
                                  <div className="chat-ctnr-btn">
                                    <div>
                                      <button
                                        className="butn mr-3"
                                        onClick={this.handleUpdateStoreManagerChatStatus.bind(
                                          this,
                                          3
                                        )}
                                      >
                                        END CHAT
                                      </button>
                                    </div>
                                    <div>
                                      <button
                                        className="butn mr-3 px-2"
                                        onClick={this.handleClickCreateTicketAndEndChat.bind(
                                          this
                                        )}
                                      >
                                        CREATE TICKET AND END CHAT
                                      </button>
                                    </div>
                                    <div>
                                      <button
                                        className="butn "
                                        onClick={this.handleCreateEndChatMdlClose.bind(
                                          this
                                        )}
                                      >
                                        CANCEL
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              ) : null}
                              {this.state.AttachementFiles.length > 0 ? (
                                <div className="fileImgupl">
                                  <button
                                    className="filebtn order-grid-butn fileclr"
                                    type="button"
                                    onClick={this.handleOpenFileShow.bind(this)}
                                  >
                                    {this.state.AttachementFiles.length}
                                    &nbsp; file selected.
                                  </button>
                                </div>
                              ) : null}
                              <Modal
                                open={this.state.fileShowMdl}
                                onClose={this.handleFileClose.bind(this)}
                                center
                                modalId="fileImagesShow"
                                overlayId="logout-ovrly"
                              >
                                <div style={{ marginTop: "10px" }}>
                                  <label className="fileAttch">
                                    {this.state.AttachementFiles.length}
                                    &nbsp;Attachment
                                  </label>
                                  <img
                                    src={CancelImg}
                                    alt="Cancel"
                                    className="cancelFileimg"
                                    onClick={this.handleFileClose.bind(this)}
                                  />
                                </div>
                                <div
                                  className="fileAttchment"
                                  style={{ margin: "0px 20px 20px 20px" }}
                                >
                                  {this.state.AttachementFiles.length > 0
                                    ? this.state.AttachementFiles.map(
                                      (item, i) => {
                                        return (
                                          <div className="fileBrdpdg" key={i}>
                                            <label
                                              className="lblFonr"
                                              title={item.name}
                                            >
                                              {item.name}
                                            </label>
                                            <img
                                              src={CancelImg}
                                              alt="Cancel"
                                              className="fileDocCancel"
                                              onClick={this.handleCancelFile.bind(
                                                this,
                                                i
                                              )}
                                            />
                                          </div>
                                        );
                                      }
                                    )
                                    : null}
                                </div>
                              </Modal>
                              <Modal
                                open={this.state.shortcutModal}
                                onClose={this.handleshortcutModalCls.bind(this)}
                                center
                                closeIconId="close"
                                modalId="CreateCustomer-mdl"
                                overlayId="logout-ovrly"
                              >
                                <div className="mdlcancleImg">
                                  <img
                                    src={CancelImg}
                                    alt="CancelImg"
                                    className="curshar-pointer"
                                    onClick={this.handleshortcutModalCls.bind(
                                      this
                                    )}
                                  />
                                </div>
                                <div className="mainDiv-crt">
                                  <div className="lbl-mdlHeader">
                                    <label className="lbl-customerMdl">
                                      Shortcut List
                                    </label>
                                  </div>
                                  <Table
                                    loading={this.state.isPastChatLoading}
                                    noDataContent="No Record Found"
                                    className="components-table-demo-nested antd-table-campaign custom-antd-table add-cursor"
                                    columns={[
                                      {
                                        title: "Shortcut",
                                        dataIndex: "shortcut",
                                        width: "20%",
                                        className:
                                          "textnowrap-table, AgentNameDiv",
                                      },
                                      {
                                        title: "Shortcut Description",
                                        dataIndex: "messageDecription",
                                        width: "20%",
                                        className: "textnowrap-table",
                                      },
                                    ]}
                                    dataSource={this.state.ShortcutList}
                                    onRow={(record, index) => ({
                                      onClick: (event) => {
                                        this.handleShortcutClick(
                                          record,
                                          index,
                                          event
                                        );
                                      },
                                    })}
                                    pagination={{
                                      pageSize: 3,
                                      defaultPageSize: 3,
                                    }}
                                    rowKey={(record) => {
                                      if (record.shortcutID) {
                                        uid = uid + 1;
                                        return record.shortcutID + "g" + uid;
                                      } else {
                                        uid = uid + 1;
                                        return "h" + uid;
                                      }
                                    }}
                                    rowClassName={
                                      this.setRowClassNameForShortcutSelect
                                    }
                                  ></Table>
                                </div>
                              </Modal>
                              <div
                                className="row m-auto"
                                style={{
                                  pointerEvents:
                                    this.state.isCustEndChat === true ||
                                      this.state.isCustTimeout === true
                                      ? "none"
                                      : "all",
                                  height: this.state.typingBoxHeight,
                                }}
                              >
                                <div className="col-lg-12 p-0 message-div-display">
                                  <div
                                    className="message-div"
                                    style={{ height: "100%" }}
                                  >
                                    <span className="message-initial">
                                      {this.state.NameTag}
                                    </span>
                                    <CKEditor
                                      data={this.state.ckeditorAdd}
                                      onChange={this.onAddCKEditorChange}
                                      config={{
                                        height: 170,
                                        resize_enabled: false,
                                        removePlugins: "elementspath",
                                        toolbar: [
                                          {
                                            name: "basicstyles",
                                            items: [
                                              "Bold",
                                              "-",
                                              "Italic",
                                              "-",
                                              "Strike",
                                            ],
                                          },
                                        ],
                                      }}
                                    />
                                    {/* < className="message-content-div"> */}
                                    {/* <span className="message-initial">
                                      {this.state.NameTag}
                                    </span>
                                    <textarea
                                      placeholder="Type your Message..."
                                      value={this.state.message}
                                      onChange={this.handleOnChangeCKEditor.bind(
                                        this
                                      )}
                                      style={{
                                        verticalAlign: "top",
                                        height: "100%",
                                      }}
                                      // disabled= {true}
                                    ></textarea> */}
                                    <p className="cls-charcount"></p>
                                    <div
                                      className="mobile-ck-tags"
                                      style={{ marginLeft: "4%" }}
                                      onClick={this.handleShowShortcutModal.bind(
                                        this
                                      )}
                                      title={"Send"}
                                    >
                                      <strong>Tags</strong>
                                    </div>
                                    {this.state.isgrammarlyCheck ? (
                                      Object.keys(this.state.Suggested_Words)
                                        .length > 0 ||
                                        this.state.Profane_Words.length > 0 ? (
                                        <div
                                          className="mobile-ck-error"
                                        // style={{
                                        //   right:
                                        //     this.state.storeAgentDetail[0]
                                        //       .suggestion === 0 &&
                                        //     this.state.storeAgentDetail[0]
                                        //       .attachment === 0
                                        //       ? "65px"
                                        //       : this.state.storeAgentDetail[0]
                                        //           .attachment === 0
                                        //       ? "135px"
                                        //       : this.state.storeAgentDetail[0]
                                        //           .suggestion === 0
                                        //       ? "65px"
                                        //       : "",
                                        // }}
                                        >
                                          {!this.state.isMobileView ? (
                                            <Popover
                                              trigger="click"
                                              overlayClassName="textcorretant"
                                              content={
                                                <div>
                                                  <div>
                                                    <label className="textcorrent-header">
                                                      Easy Rewardz-Spelling
                                                      Check{" "}
                                                    </label>
                                                  </div>

                                                  <div
                                                    style={{
                                                      textAlign: "center",
                                                      padding: "10px",
                                                    }}
                                                  >
                                                    <Radio.Group
                                                      optionType="button"
                                                      buttonStyle="solid"
                                                      value={
                                                        this.state
                                                          .suggestionType
                                                      }
                                                      onChange={this.handleSuggetionTypeChange.bind(
                                                        this
                                                      )}
                                                    >
                                                      <Radio.Button value="1">
                                                        All
                                                      </Radio.Button>
                                                      <Radio.Button value="2">
                                                        Profanity Words
                                                      </Radio.Button>
                                                      <Radio.Button value="3">
                                                        Suggested Words
                                                      </Radio.Button>
                                                    </Radio.Group>
                                                  </div>
                                                  <div className="row">
                                                    <div className="col-md">
                                                      <label className="textcorrent-header-l">
                                                        Entered Words
                                                      </label>
                                                    </div>
                                                    <div className="col-md">
                                                      <label className="textcorrent-header-r">
                                                        {this.state
                                                          .suggestionType ===
                                                          "2"
                                                          ? "Profanity Words"
                                                          : "Suggested Words"}
                                                      </label>
                                                    </div>
                                                  </div>
                                                  <div className="textcorret">
                                                    {this.state.Profane_Words
                                                      .length > 0
                                                      ? this.state
                                                        .suggestionType ===
                                                        "1" ||
                                                        this.state
                                                          .suggestionType ===
                                                        "2"
                                                        ? this.state.Profane_Words.map(
                                                          (item, i) => {
                                                            return (
                                                              <div
                                                                className="row"
                                                                key={i}
                                                              >
                                                                <div className="col-md">
                                                                  <span className="oval"></span>
                                                                  <label className="textcorret-lab1">
                                                                    {
                                                                      item.value
                                                                    }{" "}
                                                                    (Profanity)
                                                                  </label>
                                                                  <img
                                                                    src={
                                                                      SchRight
                                                                    }
                                                                    className="textcorret-img"
                                                                  />
                                                                </div>

                                                                <div className="col-md">
                                                                  <label
                                                                    className={
                                                                      !item.isChecked
                                                                        ? "textcorret-lab2"
                                                                        : "textcorret-lab2-active"
                                                                    }
                                                                    onClick={this.handleProfannitySelect.bind(
                                                                      this,
                                                                      item.value
                                                                    )}
                                                                  >
                                                                    {
                                                                      item.value
                                                                    }
                                                                  </label>
                                                                </div>
                                                              </div>
                                                            );
                                                          }
                                                        )
                                                        : null
                                                      : null}

                                                    {Object.keys(
                                                      this.state.Suggested_Words
                                                    ).length > 0
                                                      ? Object.keys(
                                                        this.state
                                                          .Suggested_Words
                                                      ).map((item, i) => {
                                                        return this.state
                                                          .suggestionType ===
                                                          "1" ||
                                                          this.state
                                                            .suggestionType ===
                                                          "3" ? (
                                                          <div className="row">
                                                            <div className="col-md">
                                                              <span className="oval"></span>
                                                              <label className="textcorret-lab1">
                                                                {item}
                                                              </label>
                                                              <img
                                                                src={SchRight}
                                                                className="textcorret-img"
                                                              />
                                                            </div>

                                                            <div className="col-md">
                                                              {this.state
                                                                .Suggested_Words[
                                                                item
                                                              ].length > 0
                                                                ? this.state.Suggested_Words[
                                                                  item
                                                                ].map(
                                                                  (
                                                                    key,
                                                                    j
                                                                  ) => {
                                                                    return (
                                                                      <label
                                                                        className={
                                                                          this
                                                                            .state
                                                                            .selectedSuggested_Words[
                                                                            item
                                                                          ] ===
                                                                            key[0]
                                                                            ? "textcorret-lab2-active"
                                                                            : "textcorret-lab2"
                                                                        }
                                                                        key={
                                                                          j
                                                                        }
                                                                        onClick={this.handleSuggetionWordClick.bind(
                                                                          this,
                                                                          item,
                                                                          key[0]
                                                                        )}
                                                                      >
                                                                        {
                                                                          key[0]
                                                                        }
                                                                      </label>
                                                                    );
                                                                  }
                                                                )
                                                                : null}
                                                            </div>
                                                          </div>
                                                        ) : null;
                                                      })
                                                      : null}
                                                  </div>
                                                  {this.state.Profane_Words
                                                    .length > 0 ? (
                                                    <div>
                                                      <label
                                                        style={{ color: "red" }}
                                                      >
                                                        Please Remove Profanity
                                                        Words.
                                                      </label>
                                                    </div>
                                                  ) : null}

                                                  <div className="row">
                                                    <div className="col-md">
                                                      {this.state.Profane_Words
                                                        .length === 0 ? (
                                                        <button
                                                          className="textcorret-btnignore"
                                                          onClick={this.handleGrammarlyIgnore.bind(
                                                            this
                                                          )}
                                                        >
                                                          Ignore
                                                        </button>
                                                      ) : null}

                                                      {this.state.Profane_Words
                                                        .length === 0 ? (
                                                        <button
                                                          className="textcorret-btnapply"
                                                          onClick={this.handleGrammarlyApply.bind(
                                                            this
                                                          )}
                                                        >
                                                          Apply & Send
                                                        </button>
                                                      ) : null}
                                                      {this.state.Profane_Words
                                                        .length > 0 ? (
                                                        <button
                                                          className="textcorret-btnapply"
                                                          onClick={this.handleRemoveProfanity.bind(
                                                            this
                                                          )}
                                                        >
                                                          Remove Profanity
                                                        </button>
                                                      ) : null}
                                                    </div>
                                                  </div>
                                                </div>
                                              }
                                            >
                                              <div id="propoversugg">
                                                <img
                                                  src={Triangle}
                                                  alt="send img"
                                                />
                                                <label>
                                                  {Object.keys(
                                                    this.state.Suggested_Words
                                                  ).length +
                                                    (this.state.Profane_Words
                                                      .length > 0
                                                      ? 1
                                                      : 0)}{" "}
                                                  Errors
                                                </label>
                                              </div>
                                            </Popover>
                                          ) : (
                                            <div
                                              onClick={this.handleGrammarlyModalOpen.bind(
                                                this
                                              )}
                                            >
                                              <img
                                                src={Triangle}
                                                alt="send img"
                                              />
                                              <label>
                                                {Object.keys(
                                                  this.state.Suggested_Words
                                                ).length +
                                                  (this.state.Profane_Words
                                                    .length > 0
                                                    ? 1
                                                    : 0)}{" "}
                                                Errors
                                              </label>
                                            </div>
                                          )}
                                        </div>
                                      ) : null
                                    ) : null}
                                    <div
                                      className="mobile-ck-attachment"
                                      title={"Attachment"}
                                    // style={{top:"100px", right:"55px"}}
                                    >
                                      <label htmlFor="docImagesUpload">
                                        <Dropzone
                                          onDrop={this.handleFileUploading.bind(
                                            this
                                          )}
                                          multiple={true}
                                          accept=".jpg, .jpeg, .png, .webp, .pdf, .doc, .docx"
                                        >
                                          {({
                                            getRootProps,
                                            getInputProps,
                                          }) => (
                                            <div {...getRootProps()}>
                                              <input
                                                {...getInputProps()}
                                                className="file-upload d-none"
                                              />
                                              <img
                                                src={AttachmentIcon}
                                                alt="send img"
                                              />
                                            </div>
                                          )}
                                        </Dropzone>
                                      </label>
                                    </div>
                                    <div
                                      className="mobile-ck-send-btn"
                                      style={{ marginLeft: "1%" }}
                                      onClick={this.handleAutoCorrection.bind(
                                        this
                                      )}
                                      title={"Send"}
                                    >
                                      <img src={Assign} alt="send img" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="chat-user-det">
                                <div>
                                  <div className="d-flex">
                                    <p className="chat-user-name">
                                      {this.state.customerName}
                                    </p>
                                    {/* <a href={Demo.BLANK_LINK} className="ml-2">
                                      <img src={UserImg} alt="user" />
                                    </a> */}
                                  </div>
                                  <div className="chat-user-num col-lg-12 px-0">
                                    <span
                                      href={this.state.mobileNo}
                                      className="col-lg-4 pl-0"
                                    >
                                      +91-{this.state.mobileNo}
                                    </span>
                                    <span>|</span>
                                    <span className="col-lg-6 pr-0">
                                      {this.state.customerEmail === ""
                                        ? "NA"
                                        : this.state.customerEmail}
                                    </span>
                                  </div>
                                </div>
                                {/* commnting this functionality as it's not reqired for now */}

                                {/* <div className="mess-time">
                                  <p> */}
                                {/* Add visitor notes */}
                                {/* <button
                                  className="butn"
                                    onClick={this.handleSaveVisitorNote.bind(
                                      this
                                    )}
                                  >
                                  Save Note
                                  </button> */}
                                {/* </p>
                                  <textarea
                                    placeholder="Add Note"
                                    value={this.state.visitorNote}
                                    onChange={this.handleAddVisitorNoteChange.bind(
                                      this
                                    )}
                                    onBlur={this.handleSaveVisitorNote.bind(
                                      this
                                    )}
                                  ></textarea>
                                </div> */}

                                <div>
                                  <div className="price-tic d-flex">
                                    <div>
                                      <label className="blue-clr font-weight-bold">
                                        {this.state.customerTotalTickets}
                                      </label>
                                      <p>Total Tickets</p>
                                    </div>
                                    <div>
                                      <label
                                        className="blue-clr font-weight-bold"
                                        onClick={this.handleOpenTicketOpn.bind(
                                          this,
                                          this.state.customerId
                                        )}
                                      >
                                        {this.state.customerOpenTickets}
                                      </label>
                                      <p>Open Ticket</p>
                                    </div>
                                    <Modal
                                      open={this.state.OpenTicketMdl}
                                      onClose={this.handleOpenTicketCls.bind(
                                        this
                                      )}
                                      closeIconId="close"
                                      modalId="createTicketModal"
                                      overlayId="logout-ovrly"
                                    >
                                      <div className="padding-div">
                                        <label className="openTciketLbl">
                                          Open Ticket :{" "}
                                          {this.state.customerOpenTickets}
                                        </label>
                                        <img
                                          src={CancelImg}
                                          alt="CancelImg"
                                          className="curshar-pointer flot-calcel"
                                          onClick={this.handleOpenTicketCls.bind(
                                            this
                                          )}
                                        />
                                        <hr />
                                        <div className="row">
                                          <div className="col-md-3">
                                            <label className="modal-lbl1">
                                              Ticket ID
                                            </label>
                                          </div>
                                          <div className="col-md-3">
                                            <label className="modal-lbl1">
                                              Ticket Title
                                            </label>
                                          </div>
                                        </div>
                                        {this.state.CustomerOpenTicketList.length ? this.state.CustomerOpenTicketList.map(
                                            (item, index) => {
                                              return (
                                                <div>
                                                  <div className="row opn-ticketDiv">
                                                    <div className="col-md-3">
                                                      <label
                                                        className="no-mdl"
                                                        onClick={this.HandleRowClickPage.bind(
                                                          this,
                                                          item.ticketID
                                                        )}
                                                      >
                                                        {item.ticketID}
                                                        {/* <Link
                                                            to={{ 
                                                              pathname: "myticket",
                                                              state:{
                                                                ticketDetailID: item.ticketID,
                                                              sourceName: "ChatBot",
                                                              }
                                                              
                                                            }}
                                                            ticketDetailID={item.ticketID}
                                                            sourceName="ChatBot"
                                                            target="_blank"
                                                           
                                                          >{item.ticketID}</Link> */}
                                                      </label>
                                                    </div>
                                                    <div className="col-md-7 row">
                                                      <label className="modal-lbl2 ">
                                                        {item.ticketTitle}
                                                        <span className="span-lbl2">
                                                          {
                                                            item.ticketdescription
                                                          }
                                                        </span>
                                                      </label>
                                                    </div>
                                                  </div>
                                                  <hr />
                                                </div>
                                              );
                                            }
                                          )
                                          : ""}
                                        {/* <div className="row opn-ticketDiv">
                                          <div className="col-md-3">
                                            <label className="no-mdl">
                                              11234
                                            </label>
                                          </div>
                                          <div className="col-md-7">
                                            <label className="modal-lbl2">
                                              Need to change my shipping address
                                              <span className="span-lbl2">
                                                Hope this help, please rate us
                                              </span>
                                            </label>
                                          </div>
                                        </div> */}
                                      </div>
                                    </Modal>
                                  </div>
                                  <button
                                    className="butn mt-3 w-100"
                                    onClick={this.handleCreateTicketModalOpn.bind(
                                      this
                                    )}
                                  >
                                    Create Ticket
                                  </button>
                                  {/* create ticket */}
                                  <Modal
                                    open={this.state.CrateTicketMdl}
                                    onClose={this.handleCreateTicketModalCls.bind(
                                      this
                                    )}
                                    center
                                    closeIconId="close"
                                    modalId="CreateCustomer-mdl"
                                    overlayId="logout-ovrly"
                                  >
                                    <div className="mdlcancleImg">
                                      <img
                                        src={CancelImg}
                                        alt="CancelImg"
                                        className="curshar-pointer"
                                        onClick={this.handleCreateTicketModalCls.bind(
                                          this
                                        )}
                                      />
                                    </div>
                                    <div className="mainDiv-crt">
                                      <div className="lbl-mdlHeader">
                                        <label className="lbl-customerMdl">
                                          Customer Details
                                        </label>
                                        <label className="lbl-sourceChat">
                                          Source :
                                          <span className="lbl-customerMdl">
                                            {" "}
                                            Chat
                                          </span>
                                        </label>
                                      </div>
                                      <div className="row chat-mdlMargin">
                                        <div className="col-md-4">
                                          <label className="mdl-lbl">
                                            Name
                                          </label>
                                          <input
                                            type="text"
                                            className="chat-txt1 txt-border"
                                            placeholder="Enter Name"
                                            maxLength={25}
                                            defaultValue={this.state.customerName}

                                            // value={this.state.customerName}
                                            name="customerName"
                                            onChange={this.setCustomereName}
                                          //disabled
                                          />

                                        </div>
                                        <div className="col-md-4">
                                          <label className="mdl-lbl">
                                            Mobile
                                          </label>
                                          <input
                                            type="text"
                                            className="chat-txt1 txt-border"
                                            placeholder="Enter Mobile No"
                                            maxLength={10}
                                            value={this.state.mobileNo}
                                            disabled
                                          />
                                        </div>
                                        <div className="col-md-4">
                                          <label className="mdl-lbl">
                                            Email
                                          </label>
                                          <input
                                            type="text"
                                            className="chat-txt1 txt-border"
                                            placeholder="Enter Email Id"
                                            maxLength={100}
                                            defaultValue={this.state.TicketEmail}
                                            // value={this.state.TicketEmail}
                                            onChange={(e) => this.setTicketEmail(e)}
                                          />
                                          {this.state.isValidEmail ? null : <p style={{
                                            color: "red",
                                            marginBottom: "0px",
                                          }}>Please enter a valid email address.</p>}
                                        </div>
                                      </div>
                                      <div className="row chat-mdlMargin">
                                        {/* <div className="col-md-4">
                                          <label className="mdl-lbl">
                                            Date of Birth
                                          </label>
                                          <input
                                            type="date"
                                            className="chat-txt1 txt-border"
                                            placeholder="Enter Date of Birth"
                                            value={this.state.TicketDOB}
                                            onChange={this.setTicketDOB}
                                          />
                                        </div> */}
                                        <div className="col-md-4">
                                          <label className="mdl-lbl">
                                            Brand
                                          </label>
                                          <select
                                            id="inputStatus"
                                            className="drop-downlist-mdl dropdown-chat"
                                            onChange={this.handleBrandChange}
                                          >
                                            {/* <option>Bata</option> */}
                                            <option value={0}>
                                              {"Select"}
                                            </option>
                                            {this.state.brandData !== null &&
                                              this.state.brandData.map(
                                                (item, i) => (
                                                  <option
                                                    key={i}
                                                    value={item.brandID}
                                                    className="select-category-placeholder"
                                                  >
                                                    {item.brandName}
                                                  </option>
                                                )
                                              )}
                                            ;
                                          </select>
                                          {this.state.selectedBrand.length ===
                                            0 && (
                                              <p
                                                style={{
                                                  color: "red",
                                                  marginBottom: "0px",
                                                }}
                                              >
                                                {this.state.brandCompulsion}
                                              </p>
                                            )}
                                        </div>
                                        <div className="col-md-4">
                                          <label className="mdl-lbl">
                                            Category
                                          </label>
                                          <select
                                            id="inputStatus"
                                            className="drop-downlist-mdl dropdown-chat"
                                            onChange={this.handleCategoryChange}
                                          >
                                            {/* <option>Bata</option> */}
                                            <option value={0}>
                                              {"Select"}
                                            </option>
                                            {this.state.categoryData !== null &&
                                              this.state.categoryData.map(
                                                (item, i) => (
                                                  <option
                                                    key={i}
                                                    value={item.categoryID}
                                                    //selected
                                                    className="select-category-placeholder"
                                                  >
                                                    {item.categoryName}
                                                  </option>
                                                )
                                              )}
                                            ;
                                          </select>
                                          {this.state.selectedCategory
                                            .length === 0 && (
                                              <p
                                                style={{
                                                  color: "red",
                                                  marginBottom: "0px",
                                                }}
                                              >
                                                {this.state.categoryCompulsion}
                                              </p>
                                            )}
                                        </div>
                                        <div className="col-md-4">
                                          <label className="mdl-lbl">
                                            Ticket Title
                                          </label>
                                          <input
                                            type="text"
                                            className="chat-txt1 txt-border"
                                            placeholder="Enter Ticket Title"
                                            value={this.state.TicketTitle}
                                            onChange={this.setTicketTitle}
                                            maxLength={100}
                                          />
                                        </div>
                                      </div>
                                      <div className="row chat-mdlMargin">
                                        <div className="col-md-4">
                                          <label className="mdl-lbl">
                                            {" "}
                                            Sub Category
                                          </label>
                                          <select
                                            id="inputStatus"
                                            className="drop-downlist-mdl dropdown-chat"
                                            onChange={
                                              this.handleSubCategoryChange
                                            }
                                          >
                                            {/* <option>Bata</option> */}
                                            <option value={0}>
                                              {"Select"}
                                            </option>
                                            {this.state.subCategoryData !==
                                              null &&
                                              this.state.subCategoryData.map(
                                                (item, i) => (
                                                  <option
                                                    key={i}
                                                    value={item.subCategoryID}
                                                    //selected
                                                    className="select-category-placeholder"
                                                  >
                                                    {item.subCategoryName}
                                                  </option>
                                                )
                                              )}
                                            ;
                                          </select>
                                          {this.state.selectedSubCategory
                                            .length === 0 && (
                                              <p
                                                style={{
                                                  color: "red",
                                                  marginBottom: "0px",
                                                }}
                                              >
                                                {this.state.subCategoryCompulsion}
                                              </p>
                                            )}
                                        </div>
                                        <div className="col-md-4">
                                          <label className="mdl-lbl">
                                            Issue Type
                                          </label>
                                          <select
                                            id="inputStatus"
                                            className="drop-downlist-mdl dropdown-chat"
                                            onChange={
                                              this.handleIssueTypeChange
                                            }
                                          >
                                            <option>Select</option>
                                            {this.state.issueTypeData !==
                                              null &&
                                              this.state.issueTypeData.map(
                                                (item, i) => (
                                                  <option
                                                    key={i}
                                                    value={item.issueTypeID}
                                                    //selected
                                                    className="select-category-placeholder"
                                                  >
                                                    {item.issueTypeName}
                                                  </option>
                                                )
                                              )}
                                            ;
                                          </select>
                                          {this.state.selectedIssueType
                                            .length === 0 && (
                                              <p
                                                style={{
                                                  color: "red",
                                                  marginBottom: "0px",
                                                }}
                                              >
                                                {this.state.issueTypeCompulsion}
                                              </p>
                                            )}
                                        </div>

                                      </div>
                                      <div className="row chat-mdlMargin">
                                        <div className="col-md-12">
                                          <label className="mdl-lbl">
                                            Ticket Details
                                          </label>
                                          <textarea
                                            rows="6"
                                            className="text-areaChatModel"
                                            value={this.state.TicketDescription}
                                            onChange={this.setTicketDescription}
                                          ></textarea>
                                        </div>
                                      </div>
                                      <div className="row chat-mdlMargin chatbtnDiv">
                                        <div className="col-md-12">
                                          <span
                                            href=""
                                            className="chatAnchor"
                                            style={{ cursor: "pointer" }}
                                            onClick={
                                              this.handleCreateTicketCancelBtn
                                            }
                                          >
                                            CANCEL
                                          </span>
                                          <button
                                            type="button"
                                            className="chatbutn-2"
                                            onClick={this.handleCreateTicketBtn}
                                          >
                                            CREATE TICKET
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </Modal>
                                  {/* <div className="chat-extra-info">
                                    <div>
                                      <label className="black-clr">
                                        Location
                                      </label>
                                      <p>
                                        New Delhi, National Capital Territory of
                                        Delhi, India
                                      </p>
                                    </div>
                                    <div>
                                      <label className="black-clr">
                                        Browser
                                      </label>
                                      <p>Chrome 09</p>
                                    </div>
                                    <div>
                                      <label className="black-clr">
                                        Platform
                                      </label>
                                      <p>Window 10</p>
                                    </div>
                                    <div>
                                      <label className="black-clr">
                                        Device
                                      </label>
                                      <p>Laptop</p>
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div
                          className={`tab-pane fade ${this.state.recentChatTabClass}`}
                          id="recent-chat-tab"
                          role="tabpanel"
                          aria-labelledby="recent-chat-tab"
                          style={{ height: "inherit" }}
                        >
                          {/* <div className="action-part d-flex align-items-center actionright">
                            <input
                              type="text"
                              className="searchtextchat"
                              placeholder="SEARCH"
                            />
                            <img
                              src={SearchBlackImg}
                              alt="Search"
                              className="searchImg-raisechat"
                              // onClick={this.handleReactChatModelOpen.bind(this)}
                            />
                            <button className="butn cross">&times;</button>
                          </div> */}
                          {/* <div className="chatreact">
                    <ReactTable
                      data={datachat}
                      columns={columnschat}
                      // resizable={false}
                      defaultPageSize={6}
                      showPagination={false}
                      getTrProps={this.HandleRowClickEvt}
                    />
                  </div> */}
                          <div className="chathistory-tbl histochat">
                            <div
                              className="table-cntr store chat-history chatabcus mg-rm now-rap-tbl-txt"
                            // style={{ margin: "10px" }}
                            >
                              <Table
                                loading={this.state.reacentChatLoading}
                                noDataContent="No Record Found"
                                className="components-table-demo-nested antd-table-campaign custom-antd-table add-cursor"
                                columns={[
                                  {
                                    title: "Name",
                                    dataIndex: "",
                                    width: "10%",
                                    className: "textnowrap-table",
                                    render: (row, rowData) => {
                                      return (
                                        <>
                                          {rowData.customerName
                                            ? rowData.customerName
                                            : ""}
                                        </>
                                      );
                                    },
                                  },
                                  {
                                    title: "Agent",
                                    dataIndex: "",
                                    width: "20%",
                                    className: "textnowrap-table",
                                    render: (row, rowData) => {
                                      return (
                                        <>
                                          {rowData.agentName ? (
                                            <p>{rowData.agentName}</p>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      );
                                    },
                                  },
                                  {
                                    title: "Rating",
                                    dataIndex: "rating",
                                    width: "20%",
                                    className: "textnowrap-table",
                                  },
                                  {
                                    title: "Time",
                                    dataIndex: "timeAgo",
                                    width: "20%",
                                    className: "textnowrap-table",
                                  },
                                  {
                                    title: "Message",
                                    width: "30%",
                                    className: "textnowrap-table",
                                    render: (row) => {
                                      return (
                                        <>
                                          <div
                                            className="historicalchatDiv"
                                            title={row ? row : ""}
                                          >
                                            <div className="table-bchat">
                                              {row.chatCount}
                                            </div>
                                            <div>
                                              <p>
                                                <Markup
                                                  content={row.message}
                                                ></Markup>
                                              </p>
                                            </div>
                                          </div>
                                        </>
                                      );
                                    },
                                  },
                                ]}
                                dataSource={this.state.agentRecentChatData}
                                onRow={(record, index) => ({
                                  onClick: (event) => {
                                    this.handleHistoricalTableRow(
                                      record,
                                      index,
                                      event
                                    );
                                  },
                                })}
                                pagination={{
                                  pageSize: this.state
                                    .pastChatTableRowSizeExpanded,
                                  defaultPageSize: this.state
                                    .pastChatTableRowSizeExpanded,
                                }}
                                rowKey={(record) => {
                                  if (record.chatID) {
                                    uid = uid + 1;
                                    return record.chatID + "g" + uid;
                                  } else {
                                    uid = uid + 1;
                                    return "h" + uid;
                                  }
                                }}
                                rowClassName={this.setRowClassName}
                              ></Table>
                            </div>
                          </div>
                          <div className="chathistory-tbl">
                            {this.state.showHistoricalChat ? (
                              <div className="historychatcontnet">
                                <div className="chathistory-div add-bord">
                                  <label className="chat-on-tuesday-jul">
                                    Chat On {this.state.chatTimeAgo}
                                  </label>
                                  <img
                                    onClick={this.handleHistoryChatClose.bind(
                                      this
                                    )}
                                    src={CancelImg}
                                    alt="close-icon"
                                    style={{
                                      float: "right",
                                      cursor: "pointer",
                                    }}
                                  />
                                </div>
                                <div
                                  className="chatcontentDiv pastcht"
                                  ref={(div) => {
                                    this.historyMessageList = div;
                                  }}
                                >
                                  {this.state.messageHistoryChatData !== null &&
                                    this.state.messageHistoryChatData.length >
                                    0 ? (
                                    this.state.messageHistoryChatData.map(
                                      (item, i) => {
                                        return (
                                          <div
                                            key={i}
                                            className={
                                              item.byCustomer === true &&
                                                item.isBotReply !== true
                                                ? "chat-trail-cntr"
                                                : "chat-trail-cntr chat-trail-cntr-right"
                                            }
                                          >
                                            <div className="chat-trail-img">
                                              <span
                                                className="chat-initial"
                                                style={{
                                                  backgroundColor:
                                                    item.byCustomer === true &&
                                                      item.isBotReply !== true
                                                      ? this.state.selectedColor
                                                      : "#ddf6fc",
                                                }}
                                                alt="face image"
                                                title={
                                                  item.byCustomer
                                                    ? item.customerName
                                                    : this.state.UserName
                                                }
                                              >
                                                {item.byCustomer
                                                  ? item.customerName
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")
                                                    .toUpperCase()
                                                  : this.state.UserName.split(
                                                    " "
                                                  )
                                                    .map((n) => n[0])
                                                    .join("")
                                                    .toUpperCase()}
                                              </span>
                                            </div>
                                            <div className="chat-trail-chat-cntr">
                                              {item.isBotReply && (
                                                <p className="bot-mark">
                                                  {"BOT"}
                                                </p>
                                              )}
                                              <div>
                                                {item.attachment &&
                                                  item.attachment.match(
                                                    /(\.pdf|\.doc|\.docx)$/
                                                  ) ? (
                                                  <div className="card docCardAtt">
                                                    {this.state.isMobileView ? (
                                                      <div
                                                        className="docFileAttach"
                                                        onClick={this.handleOpenAttacment.bind(
                                                          this,
                                                          item.attachment,
                                                          false
                                                        )}
                                                      >
                                                        <a>
                                                          {item.attachment
                                                            .length > 100
                                                            ? item.attachment
                                                              .substr(0, 100)
                                                              .concat("...")
                                                              .split("/")
                                                              .pop()
                                                            : item.attachment
                                                              .split("/")
                                                              .pop()}
                                                        </a>
                                                      </div>
                                                    ) : (
                                                      <div className="docFileAttach">
                                                        <a
                                                          href={item.attachment}
                                                          target={"_blank"}
                                                          download={true}
                                                        >
                                                          {item.attachment
                                                            .length > 100
                                                            ? item.attachment
                                                              .substr(0, 100)
                                                              .concat("...")
                                                              .split("/")
                                                              .pop()
                                                            : item.attachment
                                                              .split("/")
                                                              .pop()}
                                                        </a>
                                                      </div>
                                                    )}
                                                  </div>
                                                ) : (
                                                  <div className="card attachment-imgdiv">
                                                    {item.isAttachment && (
                                                      <div
                                                        style={{
                                                          alignSelf: "center",
                                                        }}
                                                      >
                                                        {this.state
                                                          .isMobileView ? (
                                                          <>
                                                            <img
                                                              onClick={this.handleOpenAttacment.bind(
                                                                this,
                                                                item.attachment,
                                                                true
                                                              )}
                                                              alt="attachmentimg"
                                                              src={
                                                                item.attachment
                                                              }
                                                              className="chat-product-img-attachment"
                                                            />
                                                          </>
                                                        ) : (
                                                          <a
                                                            href={
                                                              item.attachment
                                                            }
                                                            target={"_blank"}
                                                          >
                                                            <img
                                                              src={
                                                                item.attachment
                                                              }
                                                              alt="down-icon"
                                                              className="chat-product-img-attachment"
                                                            />
                                                          </a>
                                                        )}
                                                      </div>
                                                    )}
                                                  </div>
                                                )}
                                              </div>
                                              <p className="chat-trail-chat pd-0">
                                                {!item.isVideoCall ? (
                                                  <Markup
                                                    content={item.message}
                                                  ></Markup>
                                                ) : (
                                                  "Video Call at " +
                                                  item.chatDate +
                                                  " " +
                                                  item.videoCallStartAt +
                                                  "\nDuration:" +
                                                  item.callDuration
                                                )}
                                              </p>
                                              <span className="chat-trail-time">
                                                {item.chatDate + " "}
                                                {item.chatTime}
                                              </span>
                                            </div>
                                          </div>
                                        );
                                      }
                                    )
                                  ) : (
                                    <p style={{ margin: "10" }}>
                                      No record found
                                    </p>
                                  )}
                                </div>
                              </div>
                            ) : null}
                          </div>
                          <Drawer
                            className="drawerchat"
                            placement={"bottom"}
                            closable={false}
                            // onClose={this.handleChatDetailModelClose.bind(this)}
                            visible={this.state.ReactChatModel}
                          >
                            <div className="row">
                              <div className="col-md-8">
                                <label className="chaton">
                                  Chat on Tuesday,July 30,2019 1:01:32 PM
                                </label>
                                <div className="crossdrawer">
                                  <label
                                    onClick={this.handleReactChatModelClose.bind(
                                      this
                                    )}
                                  >
                                    &times;
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-4">
                                <div className="name-num ml-2">
                                  <label className="mohitdrawer">
                                    Mohit Verma
                                  </label>
                                  <p className="num">
                                    +91-9873470074 / mohit90@gmail.com
                                  </p>
                                </div>
                                <div className="row">
                                  {/* <div className="col-md-6 twotho">
                                    <label className="twothous">2000</label>
                                    <label className="twothoustext">
                                      Last Purchase
                                    </label>
                                  </div> */}
                                  <div className="col-md-6 twotho">
                                    <label className="twothous">02</label>
                                    <label className="twothoustext">
                                      Open Ticket
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Drawer>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="tab-content p-0"> */}
                </div>
              </div>
            ) : 
            (
              <div className="chatbot-right" style={{ margin: "0" }}>
                <div className="chatdivtitle">
                  <label className="chattitlelbl" style={{ color: "Black" }}>
                    {"My Historical Chat"}
                  </label>
                </div>
                <div className="chathistory-tbl histochat">
                  <div className="table-cntr store chat-history mg-rm now-rap-tbl-txt chatabcus">
                    
                    <Table
                      loading={this.state.isHistoricalChatLoading}
                      noDataContent="No Record Found"
                      className="components-table-demo-nested antd-table-campaign custom-antd-table add-cursor"
                      columns={[
                        {
                          title: "Name",
                          dataIndex: "",
                          width: "10%",
                          className: "textnowrap-table",
                          render: (row, rowData) => {
                            return (
                              <>
                                {rowData.customerName
                                  ? rowData.customerName
                                  : ""}
                              </>
                            );
                          },
                        },
                        {
                          title: "Agent",
                          dataIndex: "",
                          width: "20%",
                          className: "textnowrap-table",
                          render: (row, rowData) => {
                            return (
                              <>
                                {rowData.agentName ? (
                                  <p>{rowData.agentName}</p>
                                ) : (
                                  ""
                                )}
                              </>
                            );
                          },
                        },
                        {
                          title: "Rating",
                          dataIndex: "rating",
                          width: "20%",
                          className: "textnowrap-table",
                          //  render: (row, rowData) => {
                          //    return (
                          //      <>
                          //        {rowData.customerMobile
                          //          ? rowData.customerMobile
                          //          : ""}
                          //      </>
                          //    );
                          //  },
                        },
                        {
                          title: "Time",
                          dataIndex: "timeAgo",
                          width: "20%",
                          className: "textnowrap-table",
                          //  render: (row, rowData) => {
                          //    return (
                          //      <>
                          //        {rowData.timeAgo ? rowData.timeAgo : ""}
                          //      </>
                          //    );
                          //  },
                        },

                        {
                          title: "Message",
                          width: "30%",
                          className: "textnowrap-table ",
                          render: (row) => {
                            return (
                              <>
                                <div
                                  className="historicalchatDiv"
                                  title={row ? row : ""}
                                >
                                  <div className="table-bchat">
                                    {row.chatCount}
                                  </div>
                                  <div>
                                    <p>
                                      <Markup content={row.message}></Markup>
                                    </p>
                                  </div>
                                </div>
                              </>
                            );
                          },
                        },
                      ]}
                      dataSource={this.state.historicalChatData}
                      onRow={(record, index) => ({
                        onClick: (event) => {
                          this.handleHistoricalTableRow(record, index, event);
                        },
                      })}
                      pagination={{
                        pageSize: this.state.pastChatTableRowSizeExpanded,
                        defaultPageSize: this.state
                          .pastChatTableRowSizeExpanded,
                      }}
                      rowKey={(record) => {
                        if (record.chatID) {
                          uid = uid + 1;
                          return record.chatID + "g" + uid;
                        } else {
                          uid = uid + 1;
                          return "h" + uid;
                        }
                      }}
                      rowClassName={this.setRowClassName}
                    ></Table>
                  </div>
                </div>
                <div className="chathistory-tbl">
                  {this.state.showHistoricalChat ? (
                    <div className="historychatcontnet">
                      <div className="chathistory-div add-bord">
                        <label className="chat-on-tuesday-jul">
                          Chat On {this.state.chatTimeAgo}
                        </label>
                        <img
                          onClick={this.handleHistoryChatClose.bind(this)}
                          src={CancelImg}
                          alt="close-icon"
                          style={{
                            float: "right",
                            cursor: "pointer",
                          }}
                        />
                      </div>
                      <div
                        className="chatcontentDiv pastcht historicalChatDiv"
                        ref={(div) => {
                          this.historyMessageList = div;
                        }}
                        id="historicalChatDiv"
                      >
                        {this.state.messageHistoryChatData !== null &&
                          this.state.messageHistoryChatData.length > 0 ? (
                          this.state.messageHistoryChatData.map((item, i) => {
                            return (
                              <div
                                key={i}
                                className={
                                  item.byCustomer === true &&
                                    item.isBotReply !== true
                                    ? "chat-trail-cntr"
                                    : "chat-trail-cntr chat-trail-cntr-right"
                                }
                              >
                                <div className="chat-trail-img">
                                  <span
                                    className="chat-initial"
                                    style={{
                                      backgroundColor:
                                        item.byCustomer === true &&
                                          item.isBotReply !== true
                                          ? this.state.selectedColor
                                          : "#ddf6fc",
                                    }}
                                    alt="face image"
                                    title={
                                      item.byCustomer
                                        ? item.customerName
                                        : this.state.agentData.filter(
                                          (agent, k) => {
                                            if (
                                              agent.storeManagerID ===
                                              item.storeManagerId
                                            ) {
                                              return agent;
                                            }
                                          }
                                        )[0].agentName
                                    }
                                  >
                                    {item.byCustomer
                                      ? item.customerName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()
                                      : this.state.agentData
                                        .filter((agent, k) => {
                                          if (
                                            agent.storeManagerID ===
                                            item.storeManagerId
                                          ) {
                                            return agent;
                                          }
                                        })[0]
                                        .agentName.split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                        .toUpperCase()}
                                  </span>
                                </div>
                                <div className="chat-trail-chat-cntr">
                                  {item.isBotReply && (
                                    <p className="bot-mark">{"BOT"}</p>
                                  )}
                                  <div>
                                    {item.attachment &&
                                      item.attachment.match(
                                        /(\.pdf|\.doc|\.docx)$/
                                      ) ? (
                                      <div className="card docCardAtt">
                                        {this.state.isMobileView ? (
                                          <div
                                            className="docFileAttach"
                                            onClick={this.handleOpenAttacment.bind(
                                              this,
                                              item.attachment,
                                              false
                                            )}
                                          >
                                            <a>
                                              {item.attachment.length > 100
                                                ? item.attachment
                                                  .substr(0, 100)
                                                  .concat("...")
                                                  .split("/")
                                                  .pop()
                                                : item.attachment
                                                  .split("/")
                                                  .pop()}
                                            </a>
                                          </div>
                                        ) : (
                                          <div className="docFileAttach">
                                            <a
                                              href={item.attachment}
                                              target={"_blank"}
                                              download={true}
                                            >
                                              {item.attachment.length > 100
                                                ? item.attachment
                                                  .substr(0, 100)
                                                  .concat("...")
                                                  .split("/")
                                                  .pop()
                                                : item.attachment
                                                  .split("/")
                                                  .pop()}
                                            </a>
                                          </div>
                                        )}
                                      </div>
                                    ) : (
                                      <div className="card">
                                        {item.isAttachment && (
                                          <div
                                            style={{
                                              alignSelf: "center",
                                            }}
                                          >
                                            {this.state.isMobileView ? (
                                              <>
                                                <img
                                                  onClick={this.handleOpenAttacment.bind(
                                                    this,
                                                    item.attachment,
                                                    true
                                                  )}
                                                  alt="attachmentimg"
                                                  src={item.attachment}
                                                  className="chat-product-img-attachment"
                                                />
                                              </>
                                            ) : (
                                              <a
                                                href={item.attachment}
                                                target="_blank"
                                              >
                                                <img
                                                  src={item.attachment}
                                                  alt="down-icon"
                                                  className="chat-product-img-attachment"
                                                />
                                              </a>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                  <p className="chat-trail-chat pd-0">
                                    {!item.isVideoCall ? (
                                      <Markup content={item.message}></Markup>
                                    ) : (
                                      "Video Call at " +
                                      item.chatDate +
                                      " " +
                                      item.videoCallStartAt +
                                      "\nDuration:" +
                                      item.callDuration
                                    )}
                                  </p>
                                  <span className="chat-trail-time">
                                    {item.chatDate + " "}
                                    {item.chatTime}
                                  </span>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <p style={{ margin: "10px" }}>No record found</p>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Chatbotbkp;

function replaceAll(str, find, replace) {
  return str.replace(new RegExp("\\b" + find + "\\b", "gi"), replace).trim();
}
