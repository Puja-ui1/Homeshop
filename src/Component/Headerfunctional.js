import React, { useEffect, useState ,useRef} from "react";
import "../assets/css/custome.css";
import { Link } from "react-router-dom";
import DashboardLogo from "../assets/Images/dashboardBlack.png";
import TicketLogo from "../assets/Images/ticket.png";
import KnowledgeLogo from "../assets/Images/knowledge.png";
import Modal from "react-responsive-modal";
import ProfileImg from "../assets/Images/UserIcon.png";
import PencilImg from '../assets/Images/pencil.png';
import { importImage } from '../helpers/CommanFuncation';
import { ProgressBar } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';

import callLogs from "../assets/Images/call-log.png";
import headphone from "../assets/Images/headphone2.png";
import ChatLogo from "../assets/Images/chat.png";
import SettingLogo from "../assets/Images/setting.png";
import NotificationLogo from "../assets/Images/Notification.png";
import axios from "axios";
import { authHeader } from "../helpers/authHeader";
import config from "../helpers/config";
import IVRModal from "./IVRModal";
import { transferData } from '../helpers/transferData';
import {Table,Modal as CallModal,Popover,notification} from "antd";
import moment from "moment";
import io from 'socket.io-client';
import { socket } from '../helpers/SocketConnection';
import { onViewTicket } from "../Services/HeaderService";
const images = importImage(require.context('../assets/Images/', false, /\.(png|jpe?g|svg)$/));
const ChatNotificationComponent = (props) => {
 return(
  <div className="row" style ={{cursor:"pointer"}}>
    <div className="col-3">
      <div chat-trail-img>
        <div>
        <span
							className="chat-initial"
							alt="face image"
							title={
								props.chatData?.length > 0
									? props.chatData[0]?.customerName
									: null
							}
						>
              {props.notitficationType === "appointmentNotification"
								? "Appointment"
								: props.chatData[0]?.customerName
									.split(" ")
									.map((n) => n[0])
									.join("")
									.toUpperCase()}
            </span>
        </div>

      </div>

    </div>
    <div className="col-9">
					<h5 title="Customer Name">
						{props.chatData?.length > 0
							? props.chatData[0]?.customerName
							: null}
					</h5>
					<p
						style={{
							wordBreak: "break-word",
						}}
					>
						{props.msgData}
					</p>
				</div>

  </div>
  );

}
const Headerfunctional = (props) => {
  const [openHeadphoneModal, setOpenHeadphoneModal] = useState(false);
  const [state, setState] = useState({
    notifiPathname: true,
    modalIsOpen: false,
    ViewTicketModal: false,
    Email: "",
    UserName: "",
    LoginTime: "",
    LoggedInDuration: "",
    SLAScore: "",
    CSatScore: "",
    AvgResponse: "",
    LogoutTime: "",
    NameTag: "",
    open: false,
    NextButton: false,
    WaitingCall: false,
    userProfile: "",
    notifiMessages: [],
    NotifiTicketIds: [],
    percentLog: 0,
    workTime: 0,
    ticketDetailID: 0,
    workTimeHours: "0H 0M",
    selectedUserProfilePicture: "",
    notificationAccess: "none",
    settingAccess: "none",
    callHeadphoneAccess: "none",
    ivrAccess: "none",
    cont: [],
    reportAccess: "none",
    translateLanguage: {},
    // sidebar:false,
    loading: false,
    ChangeHeadPhone: false,
    visible: false,
    online: true,
    isOnline: true,
    chooseMode: "",
    isChooseMode: false,
    isPrePro: false,
    PhonebookPop: false,
    calldial: false,
    Incomingcall: false,
    hold: false,
    TranferCall: false,
    ismbmodal: false,
    isbreakTime: false,
    breakTime: "00:00:00",
    timerOn: true,
    configureLogoutData: [],
    LogoutHours: "",
    LogoutValue: "",
    timeout: 0,
    startbreak: "",
    stopbreak: "",
    IdleBreakSwitch: false,
    callLogsAccess: "none",
    openHeadphoneModal: false,
    chatAccess: "none",
    isIVRLogIn: false,
    newChatSoundVolume: 0,
    newMessageSoundVolume: 0,
    isNotiNewChat: false,
    isNotiNewMessage: false,
    notificationTime: 0,
    userCsatscore: "",
    dataNewMessage: "",
  });
  const hiddenButtonRef = useRef(null);
  var ongochatcount = JSON.parse(localStorage.getItem("ongoingUnreadCount")) !== null ? JSON.parse(localStorage.getItem("ongoingUnreadCount")) : 0
  var newchatcount = JSON.parse(localStorage.getItem("newUnreadCount")) !== null ? JSON.parse(localStorage.getItem("newUnreadCount")) : 0

  // const[isIVRLogIn , setIsIVRLogIn] = useState('false');
  // const[UserName,setUserName]= useState('')

  const handleLoggedInUserDetails = () => {
    

    const source=axios.CancelToken.source()
    axios({
      method: "post",
      url: config.apiUrl + "/DashBoard/LoggedInAccountDetails",
      headers: authHeader(),
    })
      .then(function(res) {
        var data = res.data.responseData;
        var status = res.data.message;
        if (res.status === 200 && status === "Success") {
          if (data !== null) {
            window.localStorage.setItem("UserProfile", JSON.stringify(data));
            if (window.localStorage.getItem("ConvexIVR") !== null) {
              const oldIvr = JSON.parse(
                window.localStorage.getItem("ConvexIVR")
              );
              let ivr = {
                ...oldIvr,
                isIVRLogIn: data.isIVRLogIn,
              };
              window.localStorage.setItem("ConvexIVR", JSON.stringify(ivr));
            } else {
              let ivr = {
                isIVRLogIn: data.isIVRLogIn,
              };
              window.localStorage.setItem("ConvexIVR", JSON.stringify(ivr));
            }
            var strTag = data.agentName.split(" ");
            var nameTag = strTag[0].charAt(0).toUpperCase();
            if (strTag.length > 0) {
              nameTag += strTag[1].charAt(0).toUpperCase();
            }
            let nume =
              data.loggedInDurationInHours * 60 +
              data.loggedInDurationInMinutes;
            let deno =
              data.shiftDurationInHour * 60 + data.shiftDurationInMinutes;
            let percentLog = ((nume / deno) * 100).toFixed(2);
            var profile = data.profilePicture;
            var finalPath = profile.substring(
              profile.lastIndexOf("\\") + 1,
              profile.length
            );
            setState({
              ...state,
              Email: data.agentEmailId,
              UserName: data.agentName,
              LoginTime: data.loginTime,
              LoggedInDuration: data.loggedInDuration,
              SLAScore: data.slaScore,
              CSatScore: data.csatScore,
              AvgResponse: data.avgResponseTime,
              LogoutTime: data.logoutTime,
              NameTag: nameTag,
              userProfile: finalPath,
              percentLog,
              workTime: data.workTimeInPercentage,
              workTimeHours: data.totalWorkingTime,
              isIVRLogIn: data.isIVRLogIn,
              userCsatscore: data.userCSATScore
            });
          } else {
            localStorage.clear();
            window.location.href = "/";
          }
        } else {
          localStorage.clear();
          window.location.href = "/";
        }
      })
      .catch((data) => {
        console.log(data);
        handleLogoutMethod();
      });


      //  clean up function 
      return () => {
        source.cancel("Component unmounted");
      };
  };

  const handleGetNotificationList = () => {
    const source=axios.CancelToken.source()
    axios({
      method: "post",
      url: config.apiUrl + "/Notification/GetNotifications",
      headers: authHeader(),
    })
      .then(function(res) {
        let status = res.data.message;

        if (status === "Success") {
          let data = res.data.responseData.ticketNotification;
          let count = res.data.responseData.notiCount;

          // console.log("------", data);
          // console.log("000000", count);
          setState({
            notifiMessages: data,
            notiCount: count,
          });
        } else {
          setState({ ...state,
            notifiMessages: [],
            notiCount: 0,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
// clean up function
      return () => {
        source.cancel("Component unmounted");
      };
  };

 const  handleGetUserProfileData = () =>{
	
		axios({
			method: 'post',
			url: config.apiUrl + '/User/GetUserProfileDetail',
			headers: authHeader()
		})
			.then(function (res) {
				var status = res.data.message;
				if (status === 'Success') {
					var id = res.data.responseData[0].userId;
					var userdata = res.data.responseData[0].profilePicture;
					var image = userdata.split('/');
					if (image[image.length - 1] == '') {
						setState({
              ...state,
							selectedUserProfilePicture: ''
						});
					} else {
						setState({
              ...state,
							selectedUserProfilePicture: userdata
						});
					}
				} else {
				setState({
          ...state,
						selectedUserProfilePicture: ''
					});
				}
			})
			.catch((data) => {
				console.log(data);
			});
	}

  useEffect(() => {

  
    handleSocket();
    // for setting the profile pic data and getting it from trandferData file in helper folder

    const subscription = transferData.getProfilePic().subscribe((pic) => {
      if (pic.profilePic) {
        setState({
          ...state,
          SelectedUserProfilePicture:pic.profilePic
        });
       
        
      } else {
        
        setState({
          ...state,
          SelectedUserProfilePicture:''
        });
      }
    });

    const _token = window.localStorage.getItem('token');
    if (_token === null) {
      window.location.href = '/';
    } else {
      
      handleGetUserProfileData();
      handleLoggedInUserDetails();
    }
    
    // cleanup function 

    return () =>{
      subscription.unsubscribe();
    };

  },[]);



  // socket connection  handler

//  const handleSocket = () => {
	
// 		let agentId = 0;
// 		let tenantID = 0;
// 		let programCode = "";
// 		let UserData = JSON.parse(localStorage.getItem("AgentData"));
// 		agentId = UserData?.agentID;
// 		tenantID = UserData?.tenantID;
// 		programCode = UserData?.programCode;
// 		var currChat = {
// 			userMaster_ID: agentId,
// 			tenant_ID: tenantID,
// 			ProgramCode: programCode,
// 			chatId: 0
// 		};
// 		var objNewChat = {
// 			userMaster_ID: agentId,
// 			tenant_ID: tenantID,
// 			ProgramCode: programCode,
// 		};

// 		var objOngoing = {
// 			tenant_ID: tenantID,
// 			search: "",
// 			StoreMgr_ID: agentId,
// 			ProgramCode: programCode,
// 			ChatId: 0,
// 		};
// 		socket.emit("CallOngoingSP", objOngoing);
// 		// socket.emit("CallNewChatSP", objNewChat);
// 		handleNewChat(objNewChat)

// 		// setTimeout(() => {
// 		// 	socket.emit("CallSetCurrentChatSP", currChat);
// 		// }, 2000);
// 		const newChatsDataString = localStorage.getItem("newChatsData");
// 		if (newChatsDataString && JSON.parse(newChatsDataString)?.length === 0) {
// 			localStorage.setItem("newUnreadCount", 0)
// 			newchatcount = 0
// 		}
// 		if (JSON.parse(localStorage.getItem("ongoingChatsData"))?.length === 0) {
// 			localStorage.setItem("ongoingUnreadCount", 0)
// 			ongochatcount = 0
// 		}
// 		if (programCode !== "") {
//       // hiddenButtonRef.current?.click();
//       //here data is coming from backend as response
//       console.log("inside if", programCode.toLowerCase() + agentId,)
// 			socket.on(programCode.toLowerCase() + agentId, 
//       function (data) {
				
// 				//localStorage.setItem("abcd",JSON.stringify(data[0]))
// 				console.log(data, "data");
// 				var chatData;
// 				// 
// 				// NotificationManager.info(data[0])
// 				if (programCode !== "" && data[4] !== "" && data[4]) {
// 					if (
// 						programCode.toLowerCase() === data[4].toLowerCase()
// 					) {
// 						
// 						var isMobileNoExist = []
// 						// let chatData = JSON.parse(localStorage.getItem("ongoingChatsData"));
// 						let ongChat = JSON.parse(localStorage.getItem("ongoingChatsData"))
// 						if (ongChat) {
// 							isMobileNoExist = ongChat.filter(
// 								(x) =>
// 									x?.mobileNo === data[3].toString() &&
// 									x?.isCustEndChat === false &&
// 									x?.sourceAbbr === data[6]
// 							)
// 							setState({
//                 ...state,
// 								dataNewMessage: data[0]
			
// 							})
// 						}
// 						if (isMobileNoExist.length > 0 || ongChat === null) {
// 							// chatData = JSON.parse(localStorage.getItem("ongoingChatsData"));
// 							var chatId = 0;
// 							let newChatMeaasgeAudio = document.getElementById(
// 								"newChatMeaasgeAudio"
// 							);
// 							let newChatMeaasgeAudioSrc = "";

// 							newChatMeaasgeAudioSrc = JSON.parse(
// 								window.localStorage.getItem("newMessageSoundFile")
// 							);

// 							if (newChatMeaasgeAudio) {
// 								newChatMeaasgeAudio.src = newChatMeaasgeAudioSrc;
// 								newChatMeaasgeAudio.volume =
// 									Math.round(state.newMessageSoundVolume / 10) / 10;
// 								newChatMeaasgeAudio.play();
// 							}
// 							chatData = ongChat.filter(
// 								(x) =>
// 									x.mobileNo === data[3].toString() &&
// 									x.sourceAbbr === data[6]
// 							);

// 							notification.open({
// 								key: chatData[0]?.chatID,
// 								duration: state.notificationTime,
// 								placement: "bottomRight",
// 								className: "hide-message-title",
// 								description: (
// 									<ChatNotificationComponent
// 										msgData={data[0]}
// 										chatData={chatData}
// 									/>
// 								),
// 							});
// 						}
// 						else {
// 							let newChatAudio = document.getElementById("newChatAudio");
// 							let newChatAudioSrc = "";
// 							newChatAudioSrc = JSON.parse(
// 								window.localStorage.getItem("newChatSoundFile")
// 							);
// 							if (newChatAudio) {
// 								newChatAudio.src = newChatAudioSrc;
// 								newChatAudio.volume =
// 									Math.round(state.newChatSoundVolume / 10) / 10;
// 								newChatAudio.play();
// 							}
// 							// socket.emit("CallNewChatSP", objNewChat);
// 							handleNewChat(objNewChat)
// 							let newChat = JSON.parse(localStorage.getItem("newChatsData"))
// 							if (newChat) {
// 								chatData = newChat.filter(
// 									(x) => x.mobileNo === data[3].toString()
// 								);
// 								notification.open({
// 									key: chatData[0]?.chatID,
// 									duration: state.notificationTime,
// 									placement: "bottomRight",
// 									className: "hide-message-title",
// 									description: (
// 										<ChatNotificationComponent
// 											msgData={data[0]}
// 											chatData={chatData}
// 										/>
// 									),
// 								});
// 							}

// 						}

// 					}
// 				}
// 			});
// 		}

// 		socket.on(
// 			"CallOngoingSP" +
// 			programCode.toLowerCase() +
// 			agentId,
// 			function (res) {
// 				var ongoingChatsData = [];
// 				let ongoingUnreadCount = 0
// 				// 
// 				// console.log("Header Response ", res)
// 				if (res.length > 0) {
// 					for (let i = 0; i < res.length; i++) {
// 						var objData = {};
// 						objData.chatID = res[i].CurrentChatID;
// 						objData.storeID = res[i].StoreID;
// 						objData.programCode = res[i].ProgramCode;
// 						objData.customerID = res[i].CustomerID;
// 						objData.customerName = res[i].CustomerName;
// 						objData.mobileNo = res[i].CustomerNumber;
// 						objData.messageCount = res[i].NewMessageCount;
// 						objData.timeAgo = res[i].TimeAgo;
// 						objData.createdDate = res[i].CreatedDate;
// 						objData.storeManagerId = res[i].StoreManagerId;
// 						objData.storeManagerName = res[i].StoreManagerName;
// 						ongoingUnreadCount += res[i].NewMessageCount
// 						if (res[i].IsCustEndChat === 0) {
// 							objData.isCustEndChat = false;
// 						} else {
// 							objData.isCustEndChat = true;
// 						}
// 						if (res[i].IsCustTimeout === 0) {
// 							objData.isCustTimeout = false;
// 						} else {
// 							objData.isCustTimeout = true;
// 						}
// 						objData.sourceName = res[i].SourceName;
// 						objData.chatSourceID = res[i].SourceID;
// 						objData.sourceAbbr = res[i].SourceAbbr;
// 						objData.sourceIconUrl = res[i].SourceIconUrl;
// 						ongoingChatsData.push(objData);
// 					}
// 				}

// 				localStorage.setItem(
// 					"ongoingChatsData",
// 					JSON.stringify(ongoingChatsData)
// 				);
// 				ongochatcount = ongoingUnreadCount
// 				localStorage.setItem("ongoingUnreadCount", ongoingUnreadCount);
// 				// setTimeout(() => {
// 				// 	forceUpdate();
// 				// }, 400);
// 			}
// 		);

// 	}



  // const handleNewChat = (Value) => {
		
	// 	socket.send("hi");
	// 	socket.emit("CallNewChatSP", Value);
	// 	//
	// 	socket.on(
	// 		"CallNewChatSP" +Value?.ProgramCode?.toLowerCase() + Value?.userMaster_ID,
	// 		function (result) {
	// 			// 
	// 			// console.log("resultnewchat",result)
	// 			var newChatsIncomingData = [];
	// 			let newUnreadCount = 0
	// 			if (result.length > 0) {
	// 				for (let i = 0; i < result.length; i++) {
	// 					var objData = {};
	// 					objData.chatID = result[i].CurrentChatID;
	// 					objData.storeID = result[i].StoreID;
	// 					objData.programCode = result[i].ProgramCode;
	// 					objData.customerID = result[i].CustomerID;
	// 					objData.customerName = result[i].CustomerName;
	// 					objData.mobileNo = result[i].CustomerNumber;
	// 					objData.messageCount = result[i].NewMessageCount;
	// 					objData.timeAgo = result[i].TimeAgo;
	// 					objData.createdDate = result[i].CreatedDate;
	// 					objData.storeManagerId = result[i].StoreManagerId;
	// 					objData.storeManagerName = result[i].StoreManagerName;
	// 					newUnreadCount += result[i].NewMessageCount
	// 					if (result[i].IsCustEndChat === 0) {
	// 						objData.isCustEndChat = false;
	// 					} else {
	// 						objData.isCustEndChat = true;
	// 					}
	// 					if (result[i].IsCustTimeout === 0) {
	// 						objData.isCustTimeout = false;
	// 					} else {
	// 						objData.isCustTimeout = true;
	// 					}
	// 					objData.sourceName = result[i].SourceName;
	// 					objData.chatSourceID = result[i].SourceID;
	// 					objData.sourceAbbr = result[i].SourceAbbr;
	// 					objData.sourceIconUrl = result[i].SourceIconUrl;
	// 					newChatsIncomingData.push(objData);
	// 				}

	// 				// if (
	// 				// 	JSON.stringify(newChatsIncomingData) !==
	// 				// 	localStorage.getItem("newChatsData")
	// 				// ) {
	// 				localStorage.setItem(
	// 					"newChatsData",
	// 					JSON.stringify(newChatsIncomingData)
	// 				);
	// 				// }
	// 				newchatcount = newUnreadCount
	// 				localStorage.setItem("newUnreadCount", newUnreadCount);

	// 				// setTimeout(() => {
	// 				// 	self.forceUpdate();
	// 				// }, 400);
	// 			}
	// 			else {
	// 				localStorage.setItem("newChatsData", []); // didn't get resposnse from backend in that case we will set it emoty array in local storage
	// 			}

	// 			// chatData = JSON.parse(localStorage.getItem("ongoingChatsData"));
	// 		});
	// }



  const handleOpenHeadphoneIcon = () => {
    setOpenHeadphoneModal(true);
  };

  const handleCloseHeadphoneIcon = () => {
    setOpenHeadphoneModal(false);
  };
  
  // these two are for notification pop up model
  const closeModal = () => {
    setState({
      ...state,
      modalIsOpen: false,
    });
  };

  const openModal = () => {
    setState({
      ...state,
      modalIsOpen: true,
    });
  };
  
  // these two are for logout pop up modal handle 
 const onOpenModal = () => {
	setState({ ...state,
    open: true });
	};

	 const onCloseModal = () => {
		setState({ 
      ...state,
      open: false 
    });
	};

  
  const handleViewTicketModalOpen = (e, data) => {
    e.preventDefault();
    var Ticket_Ids = data.ticketIDs;
    var Ids = Ticket_Ids.split(",");

    setState({
      ...state,
      NotifiTicketIds: Ids,
    });
  };
  // console.log("noticont",state?.notiCount)

  // notifi
  const handleShowTicket = (Ids, isFollowUp) => {
    // //
    setState({
      ...state,
      notifiPathname: false,
    });
    closeModal();
    onViewTicket(Ids, isFollowUp);
  };

  
 

  const startTimer =  async() => {
    var currentdate = new Date();
    var startbreak = currentdate;

     await setState({
      ...state,
      startbreak:startbreak,
      timerOn:false,
      IdleBreakSwitch:true
    })
    console.log("startbreak" , state.startbreak);

  }

  const stopTimer =  () => {
    var currentdate = new Date();
    var stopbreak = currentdate;

    setState({
      ...state,
      stopbreak :stopbreak,
    })
    console.log("stopbreak" , state.stopbreak);
    handleTimeoutfunc(stopbreak);
  }
  //adding breaktime 
  const handleTimeoutfunc =  async (stopbreak)=>{
   
    var json ={
      BreakStart : moment(state.startbreak),
      BreakEnd : moment(state.stopbreak === "" ? stopbreak : state.stopbreak)
    }

    console.log("json ",json)
    console.log("state",state)

   await axios({
      method:'post',
      url: config.apiUrl+'/Module/InsertBreakTime',
      headers:authHeader(),
      data:json
    })

    .then(function(res){
      let statuscode = res.data.statusCode
      if(statuscode === 200){
       NotificationManager.success('Break time Added ');
       //handleLoggedInUserDetails();
       setState({
        ...state,
        stopbreak: '',
				startbreak: '',
        timerOn:true,
        IdleBreakSwitch:false
       });
      
      

      } else{
        NotificationManager.error('Break time was not added');
      }

    })
    .catch((data) =>{

      console.log("data",data)
  })

  }
  console.log("timerOn==",state.timerOn)

//  logout handler 
    const handleLogoutMethod = () => {

   const userProfile = JSON.parse (window.localStorage.getItem('UserProfile'))

   axios({
			method: 'post',
			url: config.apiUrl + '/Account/Logout',
			headers: authHeader()
		})

    .then(function(res){

      var status = res.data.status;

      if(status === true){
        localStorage.clear();
        window.location.href = "/"
      }
      console.log(status ,"logoutstatus")
    })
    .catch((data) => {
      console.log(data)
    }
    )
  }
  return (
    <>




      <div
        className="d-flex align-items-center justify-content-between"
        style={{ background: "white" }}
      >
        <div className="d-flex">
          <div className="er">
            <label className="er-label">{"ER"}</label>
          </div>

          <div className=" headers-menu">
            <Link to="dashboard">
              <div>
                <img
                  src={images[!window.location.pathname.split('/')?.includes('dashboard')?'dashboardBlack.png':'dashboardBlue.png']}
                  alt="DashboardLogo"
                  className="menu-icon"
                />
                Dashboards
              </div>
            </Link>

            <Link to="myTicketlist">
              <div>
                <img
                  src={TicketLogo}
                  alt="DashboardLogo"
                  className="menu-icon"
                />
                My Tickets
              </div>
            </Link>

            <Link to="knowledgebase">
              <div>
                <img
                  src={KnowledgeLogo}
                  alt="DashboardLogo"
                  className="menu-icon"
                />
                Knowledge Base
              </div>
            </Link>
          </div>
        </div>

        <div className="header-right-icons ">
          <>
            <img
              src={headphone}
              alt="headphone"
              className="headphone_icon"
              onClick={handleOpenHeadphoneIcon}
            />
          </>

          <Link to="calllogs" className="position-relative">
            {" "}
            <>
              <img src={callLogs} alt="call-log" className="callLog" />
            </>
          </Link>

          <Link to="chatbot" className="position-relative">
            <>
              <img src={ChatLogo} alt="logo" className="chatImg" />
            </>
          </Link>

          <a href="#!">
            <div className="position-relative" onClick={openModal}>
              <img src={NotificationLogo} alt="logo" className="notifi" />
              {state?.notiCount > 0 && (
                <span className="upper-noti-count">{state?.notiCount}</span>
              )}
            </div>
          </a>

          {/* Notification pop up  */}

          <Modal
            onClose={closeModal}
            open={state.modalIsOpen}
            modalId="Notification-popup"
          >
            <div className="notifi-container">
              {state?.notiCount === 0 && (
                <p className="m-0 p-2">{"There are no notifications."}</p>
              )}
              {/* {console.log("kkkkkk", state)} */}
              {state?.notifiMessages?.map((item, i) => (
                <div className="row rowpadding" key={i}>
                  <div className="md-2 rectangle-2 lable05 noti-count">
                    <label className="labledata">{item.ticketCount}</label>
                  </div>
                  <div className="md-6 new-tickets-assigned tic-noti">
                    <label>
                      <span>{item.notificationMessage}</span>
                    </label>
                  </div>
                  <div className="viewticketspeadding">
                    <Popover
                      content={
                        <div className="notification-popover ant-popover-placement-bottom ant-popover-content ant-popover-arrow">
                          {state?.NotifiTicketIds?.map((data, j) => (
                            <p key={j}>
                              {"Ticket No."}:
                              <Link
                                to={{
                                  pathname: "myticket",
                                  ticketDetailID: data,
                                  notifiPathname: state?.notifiPathname,
                                }}
                                onClick={handleShowTicket(
                                  data,
                                  item.isFollowUp
                                )}
                              >
                                {data}
                              </Link>
                            </p>
                          ))}
                        </div>
                      }
                      placement="bottom"
                      trigger="click"
                    >
                      <div
                        className={
                          item.ticketIDs !== ""
                            ? "md-4 view-tickets"
                            : "text-disabled"
                        }
                        onClick={(e) => handleViewTicketModalOpen(e, item)}
                      >
                        {"VIEW TICKETS"}
                      </div>
                    </Popover>
                  </div>
                </div>
              ))}
            </div>
          </Modal>

          {/* setting  */}
          <Link to="settings">
            <img src={SettingLogo} alt="logo" className="setting" />
            <span style={{ display: "none" }} className="icon-fullname">
              Settings
            </span>
          </Link>
           
           {/* profile icon */}
           <a href="#!" className="bitmap5" onClick={onOpenModal}>
							{state.NameTag}
						</a> 
         
            
            <div>
              <Modal open = {state.open}
              onClose={onCloseModal}
              modalId="logout-popup"
						  overlayId="logout-ovrly"
              >
              <div className="logout-block">
                <div>
                  <div className="user-img">
                    <Link to = "userprofile">
                      <img src={ProfileImg} alt="User" title="Edit Profile" onClick={onCloseModal}/>
                    </Link> 

                  </div>
                  <div className="logout-flex">
                    <div>
                    <p style={{ fontSize: '16px', fontWeight: '600' }}>
                      {state.UserName}
                    </p>
                    <Link to = "userprofile">
                      <img src= {PencilImg} alt="pencilimg" className="pencilImg" title="Edit Profile" onClick={onCloseModal}/>

                    </Link>
                    <p className="mail-id">{state.Email}</p>

                    </div>

                    <button type="button" className= {state.IdleBreakSwitch?'logout-disabled' : 'logout'}
                    onClick={handleLogoutMethod}
                    disabled={state.IdleBreakSwitch}>{'LOGOUT'}

                    </button>

                  </div>
                </div>
                
               <div className="d-block ">
               <div className="d-flex justify-content-between">
                <div>
                <p className="logout-label">{'Login Time'}</p>
                <p className="font-weight-bold" style={{ fontSize: '16px' }}>
											{/* 9:30 AM */}
											{state.LoginTime}
								</p>

                </div>
               
               <div>
                <p className="logout-label">{'Logout Time'}</p>
                <p className="font-weight-bold" style={{ fontSize: '16px' , textAlign:'end'}}>
											{/* 9:30 AM */}
											{state.LogoutTime}
								</p>
                </div>


                </div>

                <ProgressBar
									className="logout-progress"
									// now={this.state.percentLog}
									now={state.workTime}
								/>

                <p
									className="logout-label font-weight-bold prog-indi"
									style={{
                    //to increase the width accordingly to progress bar now 
										width: state.workTime + '%', 
										textTransform: 'uppercase'
									}}
								>
									{state.workTimeHours}
								</p>

                <div className="Stopwatch">
                  {state.timerOn?
                  (<button onClick={startTimer} className=""> Start</button>):(<button onClick={()=>{stopTimer()}} className=""> Stop</button>)}

                </div>
                </div> 

                <div>
                   <div>
                  <p className="logout-label"> {'SLA SCORE'} </p>
                  <p className="font-weight-bold">{state.SLAScore}</p>
                  </div>

                  <div>
									<p className="logout-label">CSAT SCORE</p>
									<p className="font-weight-bold">{state.userCsatscore}</p>
								  </div>

                  <div>
									<p className="logout-label">
										{
											'Avg Response time'
										}
									</p>
									<p className="font-weight-bold">{state.AvgResponse}</p>
								</div>

                </div>

                
              
                

              </div>

              </Modal>
            </div>
        </div>
      </div>
      {openHeadphoneModal && (
        <IVRModal
          openHeadphoneModal={openHeadphoneModal}
          handleCloseHeadphoneIcon={handleCloseHeadphoneIcon}
          username={state?.UserName}
          isIVRLogIn={state?.isIVRLogIn}
        />
      )}
    </>
  );
};

export default Headerfunctional;
