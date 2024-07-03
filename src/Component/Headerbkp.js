import React, { Component, Fragment, PureComponent } from 'react';
import IdleTimer from 'react-idle-timer';

import ProfileImg from './../assets/Images/UserIcon.png';

import { Link } from 'react-router-dom';
import { ProgressBar } from 'react-bootstrap';
import Modal from 'react-responsive-modal';
import DashboardLogo from './../assets/Images/dashboardBlack.png';
// import CloseLogo from "./../assets/Images/cancel.png";
import DashboardLogoBlue from './../assets/Images/dashboardBlue.png';
import TicketLogo from './../assets/Images/ticket.png';
import TicketLogoBlue from './../assets/Images/ticket-blue.png';
import KnowledgeLogo from './../assets/Images/knowledge.png';
import KnowledgeLogoBlue from './../assets/Images/knowledge-blue.png';
import NotificationLogo from './../assets/Images/Notification.png';
import SettingLogo from './../assets/Images/setting.png';
import SettingLogoBlue from './../assets/Images/setting-blue.png';
import StatusLogo from './../assets/Images/status.png';
import Hamb from './../assets/Images/hamb.png';
import ChatLogo from '../assets/Images/chat.png';
import ChatLogoBlue from '../assets/Images/chat-blue.png';

import HeadPhone from './../assets/Images/headphone2.png';
import { Table, Modal as CallModal, Popover, Button, Radio, notification } from 'antd';
import { authHeader } from '../helpers/authHeader';
import config from '../helpers/config';
import axios from 'axios';
import PencilImg from './../assets/Images/pencil.png';
import { transferData } from './../helpers/transferData';
import * as translationHI from '../translations/hindi';
import * as translationMA from '../translations/marathi';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { async } from 'rxjs/internal/scheduler/async';
import moment from 'moment';
import callLogs from './../assets/Images/call-log.png';
import headphone from './../assets/Images/headphone2.png';

import io from 'socket.io-client';
import { socket } from '../helpers/SocketConnection';
import ChatService from "../Services/ChatService";

var ongochatcount = JSON.parse(localStorage.getItem("ongoingUnreadCount")) !== null ? JSON.parse(localStorage.getItem("ongoingUnreadCount")) : 0
var newchatcount = JSON.parse(localStorage.getItem("newUnreadCount")) !== null ? JSON.parse(localStorage.getItem("newUnreadCount")) : 0
class ChatNotificationComponent extends PureComponent {

	render() {
		return (
			<div
				className="row"
				style={{
					cursor: "pointer",
				}}
			//   onClick={this.handleChatNotificationClick}
			>
				<div className="col-3">
					<div className="chat-trail-img">
						<span
							className="chat-initial"
							alt="face image"
							title={
								this.props.chatData?.length > 0
									? this.props.chatData[0]?.customerName
									: null
							}
						>
							{this.props.notitficationType === "appointmentNotification"
								? "Appointment"
								: this.props.chatData[0]?.customerName
									.split(" ")
									.map((n) => n[0])
									.join("")
									.toUpperCase()}
						</span>
					</div>
				</div>
				<div className="col-9">
					<h5 title="Customer Name">
						{this.props.chatData?.length > 0
							? this.props.chatData[0]?.customerName
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

class Headerbkp extends Component {
	constructor(props) {
		super(props);
		this.idleTimer = null;
		this.handleOnAction = this.handleOnAction.bind(this);
		this.handleOnActive = this.handleOnActive.bind(this);
		this.handleOnIdle = this.handleOnIdle.bind(this);
		this.state = {
			notifiPathname: true,
			modalIsOpen: false,
			ViewTicketModal: false,
			Email: '',
			UserName: '',
			LoginTime: '',
			LoggedInDuration: '',
			SLAScore: '',
			CSatScore: '',
			AvgResponse: '',
			LogoutTime: '',
			NameTag: '',
			open: false,
			NextButton: false,
			WaitingCall: false,
			userProfile: '',
			notifiMessages: [],
			NotifiTicketIds: [],
			percentLog: 0,
			workTime: 0,
			ticketDetailID: 0,
			workTimeHours: '0H 0M',
			selectedUserProfilePicture: '',
			notificationAccess: 'none',
			settingAccess: 'none',
			callHeadphoneAccess: 'none',
			ivrAccess: 'none',
			cont: [],
			reportAccess: 'none',
			translateLanguage: {},
			// sidebar:false,
			loading: false,
			ChangeHeadPhone: false,
			visible: false,
			online: true,
			isOnline: true,
			chooseMode: '',
			isChooseMode: false,
			isPrePro: false,
			PhonebookPop: false,
			calldial: false,
			Incomingcall: false,
			hold: false,
			TranferCall: false,
			ismbmodal: false,
			isbreakTime: false,
			breakTime: '00:00:00',
			timerOn: true,
			configureLogoutData: [],
			LogoutHours: '',
			LogoutValue: '',
			timeout: 0,
			startbreak: '',
			stopbreak: '',
			IdleBreakSwitch: false,
			callLogsAccess: 'none',
			openHeadphoneModal: false,
			chatAccess: 'none',
			isIVRLogIn: false,
			newChatSoundVolume: 0,
			newMessageSoundVolume: 0,
			isNotiNewChat: false,
			isNotiNewMessage: false,
			notificationTime: 0,
			userCsatscore: '',
			dataNewMessage: ""
		};
		this.handleLoggedInUserDetails = this.handleLoggedInUserDetails.bind(this);
		this.handleGetNotificationList = this.handleGetNotificationList.bind(this);
		this.handleGetUserProfileData = this.handleGetUserProfileData.bind(this);
		this.handleCRMRole = this.handleCRMRole.bind(this);
		this.setAccessUser = this.setAccessUser.bind(this);
		this.handleIVRLogout = this.handleIVRLogout.bind(this);
		this.handleDialIVR = this.handleDialIVR.bind(this);
		this.handleDisconnectlIVR = this.handleDisconnectlIVR.bind(this);
		this.handleConfigureTimeout = this.handleConfigureTimeout.bind(this);
		this.showIncomingCallPopUp = this.showIncomingCallPopUp.bind(this);
		this.openNotification = this.openNotification.bind(this);
		this.ChatService = new ChatService();
	}



	handleGetStatusDropDown = () => {
		axios({
			method: "post",
			url: config.apiUrl + "/Master/getTicketStatusList",
			headers: authHeader(),
		})
			.then(function (res) {
				// //
				let status = res.data.message;
				let data = res.data.responseData;
				if (status === "Success") {
					//console.log(data);
					window.localStorage.setItem('ticketStatus', JSON.stringify(data))
				} else {
					window.localStorage.setItem('ticketStatus', [])

				}
			})
			.catch((data) => {
				console.log(data);
			});
	};


	componentDidMount = async () => {
		// this.handleGetKnowlarityAgentDetails();
		// this.IncomingData();
		// this.handleConfigureTimeout();//p3
		// this.handleCRMRole(); //p11

		//    //
		this.handleSocket()
		this.handleGetStatusDropDown()

		this.subscription = transferData.getProfilePic().subscribe((pic) => {
			if (pic.profilePic) {
				if (pic.profilePic === '') {
					this.setState({ selectedUserProfilePicture: '' });
				} else if (pic.profilePic.length > 0) {
					this.setState({ selectedUserProfilePicture: pic.profilePic });
				}
			} else if (pic.profilePic === '') {
				this.setState({ selectedUserProfilePicture: '' });
			}
		});

		var _token = window.localStorage.getItem('token');

		if (_token === null) {
			window.location.href = '/';
		}
		else {
			this.handleCRMRole(); //p11
			this.handleGetUserProfileData(); //p1
			this.handleLoggedInUserDetails(); //p2

			let pageName, lastOne, lastValue, arr;
			arr = [...this.state.cont];

			setTimeout(
				function () {
					pageName = window.location.pathname;
					lastOne = pageName.split('/');
					lastValue = lastOne[lastOne.length - 1];
					arr.forEach((i) => {
						i.activeClass = 'single-menu';
						if (i.urls === lastValue) i.activeClass = 'active single-menu';
					});
					this.setState({ cont: arr });
				}.bind(this),
				1
			);
			this.handleGetNotificationList();//p22
		}

		if (window.localStorage.getItem('translateLanguage') === 'hindi') {
			this.state.translateLanguage = translationHI;
		} else if (window.localStorage.getItem('translateLanguage') === 'marathi') {
			this.state.translateLanguage = translationMA;
		} else {
			this.state.translateLanguage = {};
		}
		this.handleConfigureTimeout();//p3

		this.handleGetChatSoundNotiSetting()
		
	}

	//handle get chat sound notification setting
	handleGetChatSoundNotiSetting = () => {
		let self = this;
		this.ChatService.Post("/CustomerChat/GetChatSoundNotiSetting")
			.then((response) => {
				var message = response?.message;
				var responseData = response?.responseData;
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
						newChatSoundVolume: responseData.newChatSoundVolume || 0,
						newMessageSoundVolume: responseData.newMessageSoundVolume || 0,
						isNotiNewChat: responseData.isNotiNewChat || false,
						isNotiNewMessage: responseData.isNotiNewMessage || false,
						notificationTime: responseData.notificationTime,
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	componentDidUpdate = (prevProps, prevState) => {
		if (this.state.dataNewMessage!==prevState.dataNewMessage) {
			this.handleSocket()
		}
	}

	handleSocket = () => {
		let self = this
		let agentId = 0;
		let tenantID = 0;
		let programCode = "";
		let UserData = JSON.parse(localStorage.getItem("AgentData"));
		agentId = UserData?.agentID;
		tenantID = UserData?.tenantID;
		programCode = UserData?.programCode;
		var currChat = {
			userMaster_ID: agentId,
			tenant_ID: tenantID,
			ProgramCode: programCode,
			chatId: 0
		};
		var objNewChat = {
			userMaster_ID: agentId,
			tenant_ID: tenantID,
			ProgramCode: programCode,
		};

		var objOngoing = {
			tenant_ID: tenantID,
			search: "",
			StoreMgr_ID: agentId,
			ProgramCode: programCode,
			ChatId: 0,
		};
		socket.emit("CallOngoingSP", objOngoing);
		// socket.emit("CallNewChatSP", objNewChat);
		self.handleNewChat(objNewChat)

		setTimeout(() => {
			socket.emit("CallSetCurrentChatSP", currChat);
		}, 2000);
		const newChatsDataString = localStorage.getItem("newChatsData");
		if (newChatsDataString && JSON.parse(newChatsDataString)?.length === 0) {
			localStorage.setItem("newUnreadCount", 0)
			newchatcount = 0
		}
		if (JSON.parse(localStorage.getItem("ongoingChatsData"))?.length === 0) {
			localStorage.setItem("ongoingUnreadCount", 0)
			ongochatcount = 0
		}
		if (programCode !== "") {
			// document.getElementById("hidddenButton").click()
			socket.on(programCode.toLowerCase() + agentId, function (
				data
			) {
				
				//localStorage.setItem("abcd",JSON.stringify(data[0]))
				console.log(data, "data");
				var chatData;
				// 
				// NotificationManager.info(data[0])
				if (programCode !== "" && data[4] !== "" && data[4]) {
					if (
						programCode.toLowerCase() === data[4].toLowerCase()
					) {
						
						var isMobileNoExist = []
						// let chatData = JSON.parse(localStorage.getItem("ongoingChatsData"));
						let ongChat = JSON.parse(localStorage.getItem("ongoingChatsData"))
						if (ongChat) {
							isMobileNoExist = ongChat.filter(
								(x) =>
									x?.mobileNo === data[3].toString() &&
									x?.isCustEndChat === false &&
									x?.sourceAbbr === data[6]
							)
							self.setState({
								dataNewMessage: data[0]
			
							})
						}
						if (isMobileNoExist.length > 0 || ongChat === null) {
							// chatData = JSON.parse(localStorage.getItem("ongoingChatsData"));
							var chatId = 0;
							let newChatMeaasgeAudio = document.getElementById(
								"newChatMeaasgeAudio"
							);
							let newChatMeaasgeAudioSrc = "";

							newChatMeaasgeAudioSrc = JSON.parse(
								window.localStorage.getItem("newMessageSoundFile")
							);

							if (newChatMeaasgeAudio) {
								newChatMeaasgeAudio.src = newChatMeaasgeAudioSrc;
								newChatMeaasgeAudio.volume =
									Math.round(self.state.newMessageSoundVolume / 10) / 10;
								newChatMeaasgeAudio.play();
							}
							chatData = ongChat.filter(
								(x) =>
									x.mobileNo === data[3].toString() &&
									x.sourceAbbr === data[6]
							);

							notification.open({
								key: chatData[0]?.chatID,
								duration: self.state.notificationTime,
								placement: "bottomRight",
								className: "hide-message-title",
								description: (
									<ChatNotificationComponent
										msgData={data[0]}
										chatData={chatData}
									/>
								),
							});
						}
						else {
							let newChatAudio = document.getElementById("newChatAudio");
							let newChatAudioSrc = "";
							newChatAudioSrc = JSON.parse(
								window.localStorage.getItem("newChatSoundFile")
							);
							if (newChatAudio) {
								newChatAudio.src = newChatAudioSrc;
								newChatAudio.volume =
									Math.round(self.state.newChatSoundVolume / 10) / 10;
								newChatAudio.play();
							}
							// socket.emit("CallNewChatSP", objNewChat);
							self.handleNewChat(objNewChat)
							let newChat = JSON.parse(localStorage.getItem("newChatsData"))
							if (newChat) {
								chatData = newChat.filter(
									(x) => x.mobileNo === data[3].toString()
								);
								notification.open({
									key: chatData[0]?.chatID,
									duration: self.state.notificationTime,
									placement: "bottomRight",
									className: "hide-message-title",
									description: (
										<ChatNotificationComponent
											msgData={data[0]}
											chatData={chatData}
										/>
									),
								});
							}

						}

					}
				}
			});
		}

		socket.on(
			"CallOngoingSP" +
			programCode.toLowerCase() +
			agentId,
			function (res) {
				var ongoingChatsData = [];
				let ongoingUnreadCount = 0
				// 
				// console.log("Header Response ", res)
				if (res.length > 0) {
					for (let i = 0; i < res.length; i++) {
						var objData = {};
						objData.chatID = res[i].CurrentChatID;
						objData.storeID = res[i].StoreID;
						objData.programCode = res[i].ProgramCode;
						objData.customerID = res[i].CustomerID;
						objData.customerName = res[i].CustomerName;
						objData.mobileNo = res[i].CustomerNumber;
						objData.messageCount = res[i].NewMessageCount;
						objData.timeAgo = res[i].TimeAgo;
						objData.createdDate = res[i].CreatedDate;
						objData.storeManagerId = res[i].StoreManagerId;
						objData.storeManagerName = res[i].StoreManagerName;
						ongoingUnreadCount += res[i].NewMessageCount
						if (res[i].IsCustEndChat === 0) {
							objData.isCustEndChat = false;
						} else {
							objData.isCustEndChat = true;
						}
						if (res[i].IsCustTimeout === 0) {
							objData.isCustTimeout = false;
						} else {
							objData.isCustTimeout = true;
						}
						objData.sourceName = res[i].SourceName;
						objData.chatSourceID = res[i].SourceID;
						objData.sourceAbbr = res[i].SourceAbbr;
						objData.sourceIconUrl = res[i].SourceIconUrl;
						ongoingChatsData.push(objData);
					}
				}

				localStorage.setItem(
					"ongoingChatsData",
					JSON.stringify(ongoingChatsData)
				);
				ongochatcount = ongoingUnreadCount
				localStorage.setItem("ongoingUnreadCount", ongoingUnreadCount);
				setTimeout(() => {
					self.forceUpdate();
				}, 400);
			}
		);

	}

	handleNewChat = (Value) => {
		let self = this
		socket.send("hi");
		socket.emit("CallNewChatSP", Value);
		//
		socket.on(
			"CallNewChatSP" +
			Value?.ProgramCode?.toLowerCase() +
			Value?.userMaster_ID,
			function (result) {
				// 
				// console.log("resultnewchat",result)
				var newChatsIncomingData = [];
				let newUnreadCount = 0
				if (result.length > 0) {
					for (let i = 0; i < result.length; i++) {
						var objData = {};
						objData.chatID = result[i].CurrentChatID;
						objData.storeID = result[i].StoreID;
						objData.programCode = result[i].ProgramCode;
						objData.customerID = result[i].CustomerID;
						objData.customerName = result[i].CustomerName;
						objData.mobileNo = result[i].CustomerNumber;
						objData.messageCount = result[i].NewMessageCount;
						objData.timeAgo = result[i].TimeAgo;
						objData.createdDate = result[i].CreatedDate;
						objData.storeManagerId = result[i].StoreManagerId;
						objData.storeManagerName = result[i].StoreManagerName;
						newUnreadCount += result[i].NewMessageCount
						if (result[i].IsCustEndChat === 0) {
							objData.isCustEndChat = false;
						} else {
							objData.isCustEndChat = true;
						}
						if (result[i].IsCustTimeout === 0) {
							objData.isCustTimeout = false;
						} else {
							objData.isCustTimeout = true;
						}
						objData.sourceName = result[i].SourceName;
						objData.chatSourceID = result[i].SourceID;
						objData.sourceAbbr = result[i].SourceAbbr;
						objData.sourceIconUrl = result[i].SourceIconUrl;
						newChatsIncomingData.push(objData);
					}

					// if (
					// 	JSON.stringify(newChatsIncomingData) !==
					// 	localStorage.getItem("newChatsData")
					// ) {
					localStorage.setItem(
						"newChatsData",
						JSON.stringify(newChatsIncomingData)
					);
					// }
					newchatcount = newUnreadCount
					localStorage.setItem("newUnreadCount", newUnreadCount);

					setTimeout(() => {
						self.forceUpdate();
					}, 400);
				}
				else {
					localStorage.setItem("newChatsData", []);
				}

				// chatData = JSON.parse(localStorage.getItem("ongoingChatsData"));
			});
	}


	componentWillUnmount() {
		// unsubscribe to ensure no memory leaks
		this.subscription.unsubscribe();
	}

	handleNextButtonShow() {
		this.setState({ NextButton: !this.state.NextButton });
	}

	onOpenModal = () => {
		this.setState({ open: true });
	};

	onCloseModal = () => {
		this.setState({ open: false });
	};

	openModal = () => {
		this.setState({ modalIsOpen: true });
	};

	closeModal = () => {
		this.setState({ modalIsOpen: false });
	};

	showModal = () => {
		this.setState({
			visible: true,
			ChangeHeadPhone: true
		});
	};

	handleCancel = () => {
		this.setState({
			visible: false,
			ChangeHeadPhone: false
		});
	};

	handleViewTicketModalOpen(data) {
		var Ticket_Ids = data.ticketIDs;
		var Ids = Ticket_Ids.split(',');

		this.setState({
			// ViewTicketModal: true,
			NotifiTicketIds: Ids
		});
	}
	handleViewTicketModalClose = () => {
		this.setState({
			ViewTicketModal: false
		});
	};

	handleChange = (e) => {
		this.setState({
			online: e.target.value
		});
	};

	handleNext = () => {
		this.setState({
			isChooseMode: true
		});
		this.setState({
			isOnline: false
		});
	};

	handleChangeProPre = (e) => {
		this.setState({
			chooseMode: e.target.value
		});
	};

	SetToPreview = () => {
		this.setState({
			chooseMode: 'Preview'
		});
	};

	SetToProgressive = () => {
		this.setState({
			chooseMode: 'Progressive'
		});
	};

	CallDial = () => {
		this.setState({
			calldial: true
		});
	};

	SwitchToDial = () => {
		this.setState({
			calldial: false,
			ismbmodal: false
		});
	};

	handleNextProPre = () => {
		this.setState({
			isPrePro: true
		});
		this.setState({
			isChooseMode: false
		});
	};

	hide = () => {
		this.setState({
			PhonebookPop: false
		});
	};

	showPop = () => {
		this.setState({
			PhonebookPop: true
		});
	};

	OnIncomingcall = () => {
		this.setState({
			Incomingcall: true
		});
	};

	handleVisibleChange = (PhonebookPop) => {
		this.setState({ PhonebookPop });
	};

	setHold = () => {
		this.setState((currentState) => ({
			hold: !currentState.hold
		}));
	};

	setTransferCall = () => {
		this.setState({
			TranferCall: true
		});
	};

	handleVisibleTransferChange = (TranferCall) => {
		this.setState({ TranferCall });
	};

	hide = () => {
		this.setState({
			TransferCall: false
		});
	};

	Backtohome = () => {
		this.setState({
			isOnline: true,
			isPrePro: false,
			isChooseMode: false,
			chooseMode: '',
			Incomingcall: false,
			calldial: false
		});
	};

	mbshowModal = () => {
		this.setState({
			ismbmodal: true
		});
	};

	mbhandleCancel = () => {
		this.setState({
			ismbmodal: false
		});
	};

	// handleShowSidebar = () => {
	//  this.setState({
	//   sidebar: (!this.state.sidebar)
	//  });
	// };

	onViewTicket = (notiIds, isFollowUp) => {
		this.setState({ modalIsOpen: false });
		if (notiIds !== '') {
			let self = this;
			axios({
				method: 'post',
				url: config.apiUrl + '/Notification/ReadNotification',
				headers: authHeader(),
				params: {
					TicketID: notiIds,
					IsFollowUp: isFollowUp
				}
			})
				.then(function (res) {
					let status = res.data.message;
					if (status === 'Success') {
						self.handleGetNotificationList();
					}
				})
				.catch((data) => {
					console.log(data);
				});
		}
	};

	handleGetUserProfileData() {
		let self = this;
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
						self.setState({
							selectedUserProfilePicture: ''
						});
					} else {
						self.setState({
							selectedUserProfilePicture: userdata
						});
					}
				} else {
					self.setState({
						selectedUserProfilePicture: ''
					});
				}
			})
			.catch((data) => {
				console.log(data);
			});
	}

	handleCRMRole(id) {
		let self = this;
		axios({
			method: 'post',
			url: config.apiUrl + '/CRMRole/GetRolesByUserID',
			headers: authHeader()
		})
			.then(function (res) {
				let msg = res.data.message;
				let data = res.data.responseData.modules;
				let isTicketMerge = data.filter(x => x.moduleName === "TicketMerge")[0]?.modulestatus;
				if (msg === 'Success') {
					self.setAccessUser(data);
					window.localStorage.setItem('isSaveSearch', res.data.responseData.isSaveSearchActive)
					window.localStorage.setItem('isTicketInNewTab', res.data.responseData.isTicketInNewTab)
					window.localStorage.setItem('isCreateCustomerNameMandatory', res.data.responseData.isCreateCustomerNameMandatory)
					window.localStorage.setItem('isSLAVisible', res.data.responseData.isSLAVisible)
					window.localStorage.setItem("isvcw", res.data.responseData.isVCWApplicable)
					window.localStorage.setItem("isCategoryBusinessUnit", res.data.responseData.isCategoryBusinessUnit)
					window.localStorage.setItem("isAttachStore", res.data.responseData.isAttachStore)
					window.localStorage.setItem("isWebsiteOrderEnable", res.data.responseData.isWebsiteOrderEnable)
					window.localStorage.setItem('isCsat', res.data.responseData.isCSAT)
					window.localStorage.setItem('isTicketMerge', res.data.responseData?.isTicketMerge)
					window.localStorage.setItem('isTicketMerge_Module', isTicketMerge)
				}
				else {
					localStorage.clear();
					window.location.href = "/";
				}
			})
			.catch((data) => {
				console.log(data);
				if (data.response.status === 401) {
					localStorage.clear();
					window.location.href = '/';
				}
			});
	}

	setAccessUser(data) {
		const TranslationContext = this.state.translateLanguage.default;
		var path = window.location.pathname;
		var page = path.split('/').pop();
		var accessdata = [];
		var dashboard = {
			data: TranslationContext !== undefined ? TranslationContext.nav.dashboard : 'Dashboards',
			urls: 'dashboard',
			logoBlack: DashboardLogo,
			logoBlue: DashboardLogoBlue,
			imgAlt: 'dashboard icon',
			imgClass: 'dashboardImg1',
			activeClass: page === 'dashboard' ? 'active single-menu' : 'single-menu'
		};
		var myticket = {
			data: TranslationContext !== undefined ? TranslationContext.nav.myticket : 'My Tickets',
			urls: 'myTicketlist',
			logoBlack: TicketLogo,
			logoBlue: TicketLogoBlue,
			imgAlt: 'ticket icon',
			imgClass: 'myTicket',
			activeClass: page === 'myTicketlist' ? 'active single-menu' : 'single-menu'
		};
		var knowledgebase = {
			data: TranslationContext !== undefined ? TranslationContext.nav.knowledge : 'Knowledge Base',
			urls: 'knowledgebase',
			logoBlack: KnowledgeLogo,
			logoBlue: KnowledgeLogoBlue,
			imgAlt: 'knowledge icon',
			imgClass: 'knowledgeNav',
			activeClass: page === 'knowledgebase' ? 'active single-menu' : 'single-menu'
		};
		if (data !== null) {
			for (var i = 0; i < data.length; i++) {
				if (data[i].moduleName === 'Dashboard' && data[i].modulestatus === true) {
					accessdata.push(dashboard);
				} else if (data[i].moduleName === 'Tickets' && data[i].modulestatus === true) {
					accessdata.push(myticket);
				} else if (data[i].moduleName === 'Knowledge Base' && data[i].modulestatus === true) {
					accessdata.push(knowledgebase);
				} else if (data[i].moduleName === 'Settings' && data[i].modulestatus === true) {
					this.setState({
						settingAccess: 'block'
					});
				} else if (data[i].moduleName === 'Convox IVR' && data[i].modulestatus === true) {
					const Socket = io(config.IVRSocketUrl, {
						transports: ['websocket', 'polling'],
						upgrade: true
					});
					console.log('Connecting to the server' + config.IVRSocketUrl);
					console.log(Socket);
					// Socket.on('connect', () => {
					// 	console.log('Connected to the server');
					// });
					let agentData = JSON.parse(window.localStorage.getItem('AgentData'));

					Socket.on('IVR' + agentData.programCode.toLowerCase() + '-' + agentData.agentID, (data) => {

						if (window.localStorage.getItem('ConvexIVR') !== null) {
							const oldIvr = JSON.parse(window.localStorage.getItem('ConvexIVR'))
							let ivr = {
								...oldIvr,
								incomingCall: data[1]
							}
							window.localStorage.setItem('ConvexIVR', JSON.stringify(ivr));
						} else {
							let ivr = {
								incomingCall: data[1]
							}
							window.localStorage.setItem('ConvexIVR', JSON.stringify(ivr));
						}
						this.handleCloseHeadphoneIcon();
						this.showIncomingCallPopUp(data);
					});
					this.setState({
						callHeadphoneAccess: 'block'
					});
				} else if (data[i].moduleName === 'Chat' && data[i].modulestatus === true) {
					this.setState({
						chatAccess: 'block'
					});
				} else if (data[i].moduleName === 'Notification' && data[i].modulestatus === true) {
					this.setState({
						notificationAccess: 'block'
					});
				} else if (data[i].moduleName === 'Reports' && data[i].modulestatus === true) {
					this.setState({
						reportAccess: 'block'
					});
				} else if (data[i].moduleName === 'IVR' && data[i].modulestatus === true) {
					this.handleGetKnowlarityAgentDetails();
					this.setState({
						ivrAccess: 'block'
					});
				} else if (data[i].moduleName === 'Call Logs' && data[i].modulestatus === true) {
					this.setState({
						callLogsAccess: 'block'
					});
				}
			}
		}
		this.setState({
			cont: accessdata
		});
	}

	showIncomingCallPopUp(data) {
		let self = this;
		self.openNotification(data);
	}
	openNotification = (callData) => {
		let self = this;
		const key = `open${Date.now()}`;
		const btn = (
			<Button type="default" shape="round" size="default" onClick={() => notification.close(key)}>
				Close
			</Button>
		);
		notification.open({
			message: 'Incoming call',
			description: `Number : ${callData[1]}`,
			btn,
			key,
			duration: 0,
			className: 'callPopup',
			icon: <img src={callLogs} alt="call-log" className="chatImg" />
		});
	};

	/* HANDLE IVR DIAL  */
	handleDialIVR() {
		let self = this;
		var IVRDialData = {
			action: null,
			user: null,
			phone_number: null,
			refno: null
		};
		axios({
			method: 'post',
			url: config.apiUrl + '/IVR/ClickToCall',
			headers: authHeader(),
			data: IVRDialData
		})
			.then(function () {
				console.log('Dialed Successfully');
			})
			.catch((error) => {
				console.log(error);
			});
	}

	/* HANDLE IVR LOGOUT  */
	handleIVRLogout() {
		let self = this;
		var IVRLogoutData = {
			action: null,
			user: null,
			refno: null
		};
		axios({
			method: 'post',
			url: config.apiUrl + '/IVR/Logout',
			headers: authHeader(),
			data: IVRLogoutData
		})
			.then(function () {
				console.log('Logout Successfully');
			})
			.catch((error) => {
				console.log(error);
			});
	}

	/* HANDLE IVR DISCONNECT  */
	handleDisconnectlIVR() {
		let self = this;
		var IVRDisconnectData = {
			action: null,
			endcall_type: null,
			convoxid: null,
			disposition: null,
			agent_id: null,
			mobile_number: null,
			refno: null
		};
		axios({
			method: 'post',
			url: config.apiUrl + '/IVR/ClickToEndCall',
			headers: authHeader(),
			data: IVRDisconnectData
		})
			.then(function () {
				console.log('Disconnected Successfully');
			})
			.catch((error) => {
				console.log(error);
			});
		this.SwitchToDial();
	}
	handleGlobalCallLogout = () => {
		axios({
			method: 'post',
			url: config.apiUrl + '/IVR/ConVoxUserLogOut',
			headers: authHeader()
		})
			.then(function (res) {
			})
			.catch((data) => {
				console.log(data);
			});
	};
	handleLogoutMethod() {
		let self = this;
		const userProfile = JSON.parse(window.localStorage.getItem('UserProfile'));
		if (userProfile !== null) {
			if (userProfile.isIVRLogIn) {
				self.handleGlobalCallLogout();
			}
		}

		axios({
			method: 'post',
			url: config.apiUrl + '/Account/Logout',
			headers: authHeader()
		})
			.then(function (res) {
				var status = res.data.status;
				// var Msg=res.data.message
				if (status === true) {
					//NotificationManager.success(Msg);
					localStorage.clear();
					window.location.href = '/';
				}
			})
			.catch((data) => {
				console.log(data);
			});
	}

	handleLoggedInUserDetails = useCallback(() => {
		let self = this;
		axios({
			method: 'post',
			url: config.apiUrl + '/DashBoard/LoggedInAccountDetails',
			headers: authHeader()
		})
			.then(function (res) {
				var data = res.data.responseData;
				var status = res.data.message;
				if (res.status === 200 && status === 'Success') {
					if (data !== null) {
						window.localStorage.setItem('UserProfile', JSON.stringify(data));
						if (window.localStorage.getItem('ConvexIVR') !== null) {
							const oldIvr = JSON.parse(window.localStorage.getItem('ConvexIVR'))
							let ivr = {
								...oldIvr,
								isIVRLogIn: data.isIVRLogIn
							}
							window.localStorage.setItem('ConvexIVR', JSON.stringify(ivr));
						} else {
							let ivr = {
								isIVRLogIn: data.isIVRLogIn
							}
							window.localStorage.setItem('ConvexIVR', JSON.stringify(ivr));
						}
						var strTag = data.agentName.split(' ');
						var nameTag = strTag[0].charAt(0).toUpperCase();
						if (strTag.length > 0) {
							nameTag += strTag[1].charAt(0).toUpperCase();
						}
						let nume = data.loggedInDurationInHours * 60 + data.loggedInDurationInMinutes;
						let deno = data.shiftDurationInHour * 60 + data.shiftDurationInMinutes;
						let percentLog = (nume / deno * 100).toFixed(2);
						var profile = data.profilePicture;
						var finalPath = profile.substring(profile.lastIndexOf('\\') + 1, profile.length);
						self.setState({
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
						window.location.href = '/';
					}
				} else {
					localStorage.clear();
					window.location.href = '/';
				}
			})
			.catch((data) => {
				console.log(data);
				this.handleLogoutMethod();
			});
	},[]);

	actives = (e) => {
		const contDummy = [...this.state.cont];
		contDummy.forEach((i) => {
			i.activeClass = 'single-menu';
			if (i.data === e.target.textContent) i.activeClass = 'active single-menu';
		});
		this.setState({ cont: contDummy });
	};

	handleGetNotificationList() {
		let self = this;
		axios({
			method: 'post',
			url: config.apiUrl + '/Notification/GetNotifications',
			headers: authHeader()
		})
			.then(function (res) {
				let status = res.data.message;

				if (status === 'Success') {
					let data = res.data.responseData.ticketNotification;
					let count = res.data.responseData.notiCount;

					self.setState({
						notifiMessages: data,
						notiCount: count
					});
				} else {
					self.setState({
						notifiMessages: [],
						notiCount: 0
					});
				}
			})
			.catch((data) => {
				console.log(data);
			});
	}

	// notifi
	handleShowTicket(Ids, isFollowUp) {
		// //
		this.setState({
			notifiPathname: false,
		})
		this.closeModal();
		this.onViewTicket(Ids, isFollowUp);
	}

	handleBreakTime = () => {
		this.setState({
			isbreakTime: !this.state.isbreakTime
		});
	};

	startTimer = () => {
		var currentdate = new Date();
		var startbreak = currentdate;
		// var startbreak = currentdate.getDate() + "/"
		//             + (currentdate.getMonth()+1)  + "/"
		//             + currentdate.getFullYear() + " "
		//             + currentdate.getHours() + ":"
		//             + currentdate.getMinutes() + ":"
		//             + currentdate.getSeconds();

		this.setState({
			startbreak: startbreak,
			timerOn: false,
			IdleBreakSwitch: true
		});
	};

	stopTimer = async () => {
		let self = this;
		var currentdate = new Date();
		var stopbreak = currentdate;
		// var stopbreak = currentdate.getDate() + "/"
		//             + (currentdate.getMonth()+1)  + "/"
		//             + currentdate.getFullYear() + " "
		//             + currentdate.getHours() + ":"
		//             + currentdate.getMinutes() + ":"
		//             + currentdate.getSeconds();
		await self.setState({
			stopbreak: stopbreak,
			timerOn: true,
			IdleBreakSwitch: false
		});
		self.handleTimeoutfunc();
	};

	handleTimeoutfunc = () => {
		let self = this;
		var json = {
			BreakStart: moment(this.state.startbreak),
			BreakEnd: moment(this.state.stopbreak)
		};
		console.log(json, 'json data');
		console.log(this.state, 'state data');

		axios({
			method: 'post',
			url: config.apiUrl + '/Module/InsertBreakTime',
			headers: authHeader(),
			data: json
		})
			.then(function (res) {
				let statuscode = res.data.statusCode;
				if (statuscode === 200) {
					NotificationManager.success('Break time Added ');
					self.handleLoggedInUserDetails();
					self.setState({
						stopbreak: '',
						startbreak: ''
					});
				} else {
					NotificationManager.error('Break time was not added');
				}
			})
			.catch((data) => {
				console.log(data);
			});
	};

	handleOnAction = (event) => {
		//console.log("user did something", event);
	};


	handleOnActive = (event) => {
		// console.log("user is active", event);
		//  sconsole.log("time remaining", this.idleTimer.getRemainingTime());
	};

	handleOnIdle = (event) => {
		this.handleLogoutMethod();
		// console.log("user is idle", event);
		//console.log("last active", this.idleTimer.getLastActiveTime());
	};

	handleConfigureTimeout = () => {
		let self = this;
		axios({
			method: 'post',
			url: config.apiUrl + '/Module/GetLogOutModel',
			headers: authHeader()
		})
			.then(function (res) {
				var configureLogoutData = res.data.responseData;
				var status = res.data.message;
				if (status === 'Success') {
					let LogoutHours = configureLogoutData[0].logOutHours;
					let LogoutValue = configureLogoutData[0].logOutTime;
					self.setState({
						configureLogoutData: configureLogoutData,
						LogoutHours,
						LogoutValue
					});
					if (LogoutHours === 'min') {
						self.setState({
							timeout: parseInt(LogoutValue) * 60 * 1000
						});
					} else {
						self.setState({
							timeout: parseInt(LogoutValue) * 60 * 60 * 1000
						});
					}
					// var settime = LogoutHours==="min"?parseInt(LogoutValue)*60*1000 :parseInt(LogoutValue)*60*60*1000;
					//  self.setState({

					//   timeout :settime
					//  })
				} else {
					self.setState({
						configureLogoutData: []
					});
				}
			})
			.catch((data) => {
				console.log(data);
			});
	};

	handleConfigureTimeNull = () => {
		this.setState({
			LogoutHours: '',
			LogoutValue: '',
			timeout: 0
		});
	};

	handleStream = (e, agent) => {
		const parsedData = JSON.parse(e.data);
		if (parsedData.type == 'AGENT_CALL') {
			if (agent[0].agentNumber === parsedData.agent_number) {
				NotificationManager.warning('Call successfully placed', '', 10000);
			}
		}

		if (parsedData.type == 'CDR' && parsedData.Call_Type == 'Outgoing') {
			if (agent[0].agentNumber === parsedData.destination) {
				NotificationManager.warning('Agent Missed', '', 10000);
			}
		}
		if (parsedData.type == 'CDR' && parsedData.Call_Type == 'Incoming') {
			if (agent[0].callerId === parsedData.dispnumber) {
				NotificationManager.warning('Incoming call', '', 10000);
			}
		}
	};

	handleGetKnowlarityAgentDetails = async () => {
		try {
			const response = await axios({
				url: config.apiUrl + '/Ivr/GetKnowlarityAgentDetails',
				method: 'POST',
				headers: authHeader()
			});

			let message = response.data.message;
			let knowlarityAgents = response.data.responseData;
			if (message === 'Success') {
				this.IncomingData(knowlarityAgents);
			}
		} catch (err) {
			console.log(err);
		}
	};

	IncomingData(knowlarityAgent) {
		let URL =
			config.knowlarityNotificationAPI + ':8100/update-stream/' + knowlarityAgent[0].authorization + '/konnect';
		const eventSource = new EventSource(URL);
		// const eventSource = new EventSource(
		//   `https://konnect.knowlarity.com:8100/update-stream/fbc60b7e-a0ba-4dbe-8cde-b695b15fc0b5/konnect`
		// );
		eventSource.onmessage = (e) => {
			this.handleStream(e, knowlarityAgent);
		};
		eventSource.onerror = (e) => {
			eventSource.close();
		};
	}
	handleOpenHeadphoneIcon = () => {
		this.setState({
			openHeadphoneModal: true
		});
	};
	handleCloseHeadphoneIcon = () => {
		this.setState({
			openHeadphoneModal: false
		});
	};

	hiddenFunction() {
		console.log("test");
	}
	render() {
		let centiseconds = ('0' + Math.floor(this.state.timerTime / 10) % 100).slice(-2);
		let seconds = ('0' + Math.floor(this.state.timerTime / 1000) % 60).slice(-2);
		let minutes = ('0' + Math.floor(this.state.timerTime / 60000) % 60).slice(-2);
		let hours = ('0' + Math.floor(this.state.timerTime / 3600000)).slice(-2);
		// let TimeOutValue = this.state.LogoutHours==="min"?LogoutValue*60*1000 : this.state.LogoutValue*60*60*1000

		const TranslationContext = this.state.translateLanguage.default;
		// const { visible, loading, ismbmodal, openHeadphoneModal } = this.state;
		// // console.log(this.state.online);
		// // console.log(this.state.PrePro);
		// console.log(this.state.configureLogoutData);
		// console.log(this.state.LogoutHours);
		// console.log(this.state.LogoutValue);
		// console.log(this.state.timeout);
		// console.log(this.state.timerTime)

		return (
			<React.Fragment>
				<button
					id="hidddenButton"
					style={{ display: 'none' }}
					onClick={() => this.hiddenFunction()}
				/>
				<button
					id="trigger-timeout"
					style={{ display: 'none' }}
					onClick={() => this.handleConfigureTimeout()}
				/>
				<button
					id="trigger-timeout-del"
					style={{ display: 'none' }}
					onClick={() => this.handleConfigureTimeNull()}
				/>
				{this.state.IdleBreakSwitch === false ? (
					<div>
						{this.state.timeout > 0 ? (
							<IdleTimer
								ref={(ref) => {
									this.idleTimer = ref;
								}}
								timeout={this.state.timeout}
								onActive={this.handleOnActive}
								onIdle={this.handleOnIdle}
								onAction={this.handleOnAction}
							/>
						) : null}
					</div>
				) : null}

				<div className="d-flex align-items-center justify-content-between" style={{ background: 'white' }}>
					<input type="hidden" value={this.state.reportAccess} id="isReport" />
					<div className="d-flex">
						<div className="er">
							<label className="er-label">
								{TranslationContext !== undefined ? TranslationContext.label.er : 'ER'}
							</label>
						</div>
						<div className="hamb-menu">
							<div className="dropdown">
								<img src={Hamb} alt="hamburger icon" data-toggle="dropdown" />
								<ul className="dropdown-menu">
									<li>
										<Link to="dashboard">Dashboards</Link>
									</li>
									<li>
										<Link to="myTicketlist">My Tickets</Link>
									</li>
									<li>
										<Link to="knowledgebase">Knowledge Base</Link>
									</li>
								</ul>
							</div>
						</div>
						<div className="headers-menu">
							{this.state.cont.map((item) => (
								<Link
									onClick={this.actives}
									key={item.data}
									to={item.urls}
									className={item.activeClass}
								>
									<div className="header-icons-cntr">
										<img src={item.logoBlack} alt={item.imgAlt} className={item.imgClass} />
										<img src={item.logoBlue} alt={item.imgAlt} className={item.imgClass} />
									</div>
									{item.data}
								</Link>
							))}
						</div>
					</div>

					<div className="header-right-icons">
						{/* <div style={{ display: this.state.ivrAccess }}>
              <img
                src={this.state.ChangeHeadPhone ? HeadPhone : HeadPhone}
                alt="logo"
                className="headphoneheader"
                onClick={this.showModal}
              />
              <span style={{ display: "none" }} className="icon-fullname">
                IVR
              </span>
            </div> */}
						{/* <a href="#!" className="position-relative">
              <img
                src={this.state.ChangeHeadPhone? BlueHeadPhone :HeadPhone}
                alt="logo"
                className="headphoneheader"
                onClick={this.showModal}
              />
            </a> */}

						{/* <Link
              to="calllogs"
              className="position-relative"
            > */}
						<Fragment>
							<img
								src={headphone}
								alt="call-log"
								className="headphone_icon"
								style={{ display: this.state.callHeadphoneAccess }}
								onClick={() => this.handleOpenHeadphoneIcon()}
							/>
						</Fragment>
						{/* </Link> */}

						<Link
							to="calllogs"
							className="position-relative"
							style={{ display: this.state.callLogsAccess }}
						>
							<Fragment>
								<img src={callLogs} alt="call-log" className="chatImg" />
							</Fragment>
						</Link>

						<Link
							to={{ pathname: 'chatbot', action: 'redirectToChat' }}
							className="position-relative"
							style={{ display: this.state.chatAccess }}
						>
							{this.state.sidebar ? (
								<Fragment>
									<img src={ChatLogoBlue} alt="logo" className="chatImg" />
								</Fragment>
							) : (
								<Fragment>
									<img src={ChatLogo} alt="logo" className="chatImg" />
									{/* {console.log(JSON.parse(localStorage.getItem("ongoingUnreadCount")), JSON.parse(localStorage.getItem("newUnreadCount")))} */}
									{
										JSON.parse(localStorage.getItem("ongoingUnreadCount")) !== null && JSON.parse(localStorage.getItem("newUnreadCount")) !== null ?
											JSON.parse(localStorage.getItem("ongoingUnreadCount")) + JSON.parse(localStorage.getItem("newUnreadCount")) > 0 &&
											<span className="upper-noti-count">{JSON.parse(localStorage.getItem("ongoingUnreadCount")) + JSON.parse(localStorage.getItem("newUnreadCount"))}</span>
											:
											JSON.parse(localStorage.getItem("ongoingUnreadCount")) !== null ?
												JSON.parse(localStorage.getItem("ongoingUnreadCount")) > 0 &&
												<span className="upper-noti-count">{JSON.parse(localStorage.getItem("ongoingUnreadCount"))}</span>
												:
												JSON.parse(localStorage.getItem("newUnreadCount")) !== null ?
													JSON.parse(localStorage.getItem("newUnreadCount")) > 0 &&
													<span className="upper-noti-count">{JSON.parse(localStorage.getItem("newUnreadCount"))}</span>
													: null
										// ongochatcount + newchatcount > 0 &&
										// <span className="upper-noti-count">{ongochatcount + newchatcount}</span>

										// window.location.pathname.includes("/chatbot") === false &&
										// JSON.parse(localStorage.getItem("ongoingChatsData"))?.length > 0 && (

									}
									<span className="notify-badge-chat" />
								</Fragment>
							)}
						</Link>
						<a href="#!" style={{ display: this.state.notificationAccess }}>
							<div className="position-relative" onClick={this.openModal}>
								<img src={NotificationLogo} alt="logo" className="notifi" />
								{this.state.notiCount > 0 && (
									<span className="upper-noti-count">{this.state.notiCount}</span>
								)}
							</div>
							<span style={{ display: 'none' }} className="icon-fullname">
								Notifications
							</span>
						</a>

						<Link to="settings" style={{ display: this.state.settingAccess }}>
							<img src={SettingLogo} alt="logo" className="setting" />
							<img src={SettingLogoBlue} alt="logo" className="setting" style={{ display: 'none' }} />
							<span style={{ display: 'none' }} className="icon-fullname">
								Settings
							</span>
						</Link>
						<a href="#!" className="bitmap5" onClick={this.onOpenModal}>
							{this.state.NameTag}
						</a>
					</div>
				</div>

				<Modal
					onClose={this.closeModal}
					open={this.state.modalIsOpen}
					modalId="Notification-popup"
					overlayId="logout-ovrly"
				>
					<div className="notifi-container">
						{this.state.notiCount === 0 && (
							<p className="m-0 p-2">
								{TranslationContext !== undefined ? (
									TranslationContext.ticketingDashboard.therearenonotifications
								) : (
									'There are no notifications.'
								)}
							</p>
						)}
						{this.state.notifiMessages.map((item, i) => {
							return (
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
												<div className="notification-popover">
													{this.state.NotifiTicketIds.map((data, j) => {
														return (
															<p key={j}>
																{TranslationContext !== undefined ? (
																	TranslationContext.ticketingDashboard.ticketno
																) : (
																	'Ticket No.'
																)}
																:
																<Link
																	to={{
																		pathname: 'myticket',
																		ticketDetailID: data,
																		notifiPathname: this.state.notifiPathname
																	}}
																	onClick={this.handleShowTicket.bind(
																		this,
																		data,
																		item.isFollowUp
																	)}
																>
																	{data}
																</Link>
															</p>
														);
													})}
												</div>
											}
											placement="bottom"
											trigger="click"
										>
											<div
												className={
													item.ticketIDs !== '' ? 'md-4 view-tickets' : 'text-disabled'
												}
												onClick={this.handleViewTicketModalOpen.bind(this, item)}
											>
												{TranslationContext !== undefined ? (
													TranslationContext.div.viewtickets
												) : (
													'VIEW TICKETS'
												)}
											</div>
										</Popover>
									</div>
								</div>
							);
						})}
					</div>
				</Modal>





				<Modal
					onClose={this.handleViewTicketModalClose}
					open={this.state.ViewTicketModal}
					modalId="Notification-popup"
					overlayId="logout-ovrly"
				>
					{this.state.NotifiTicketIds.map((data, j) => {
						return (
							<a
								href="#!"
								style={{ wordWrap: 'break-word' }}
								key={j}
								onClick={this.handleShowTicket.bind(this)}
							>
								{data + ', '}
							</a>
						);
					})}
				</Modal>
				<div>
					<Modal
						open={this.state.open}
						onClose={this.onCloseModal}
						center
						modalId="logout-popup"
						overlayId="logout-ovrly"
					>
						<div className="logout-block">
							<div>
								<div className="user-img">
									<Link to="userprofile">
										<img
											src={
												this.state.selectedUserProfilePicture.length > 0 ? (
													this.state.selectedUserProfilePicture
												) : (
													ProfileImg
												)
											}
											//this.state.userProfile === "user-img.jpg"
											// ? require("./../assets/Images/user-img.jpg")
											// : require("./../assets/Images/defaultUser.png")
											//}
											alt="User"
											style={{ width: '90px' }}
											title="Edit Profile"
											onClick={this.onCloseModal.bind(this)}
										/>
									</Link>
								</div>
								<div className="logout-flex">
									<div>
										<p style={{ fontSize: '16px', fontWeight: '600' }}>
											{this.state.UserName}
											&nbsp;
											<Link to="userprofile">
												<img
													src={PencilImg}
													alt="Pencile"
													className="pencilImg"
													title="Edit Profile"
													onClick={this.onCloseModal.bind(this)}
												/>
											</Link>
										</p>

										<p className="mail-id">{this.state.Email}</p>
									</div>

									<button
										type="button"
										className={this.state.IdleBreakSwitch ? 'logout-disabled' : 'logout'}
										onClick={this.handleLogoutMethod.bind(this)}
										disabled={this.state.IdleBreakSwitch}
									>
										{TranslationContext !== undefined ? TranslationContext.span.logout : 'LOGOUT'}
									</button>
								</div>
							</div>
							<div className="status-sctn alignradio d-none">
								<div className="d-flex align-items-center">
									<div className="logout-status" style={{ marginTop: '10px' }}>
										<img src={StatusLogo} alt="status" />
									</div>
									<p className="logout-label chat-status">CHAT STATUS :</p>
								</div>
								<div className="status-options">
									<input type="radio" name="logout-status" id="online" />
									<label htmlFor="online" className="logout-label">
										Online
									</label>
								</div>
								<div className="status-options">
									<input type="radio" name="logout-status" id="away" />
									<label htmlFor="away" className="logout-label">
										Away
									</label>
								</div>
								<div className="status-options">
									<input type="radio" name="logout-status" id="offline" />
									<label htmlFor="offline" className="logout-label">
										Offline
									</label>
								</div>
							</div>
							<div className="d-block">
								<div className="d-flex justify-content-between">
									<div>
										<p className="logout-label">
											{TranslationContext !== undefined ? (
												TranslationContext.p.logintime
											) : (
												'Login Time'
											)}
										</p>
										<p className="font-weight-bold" style={{ fontSize: '16px' }}>
											{/* 9:30 AM */}
											{this.state.LoginTime}
										</p>
									</div>
									<div>
										<p className="logout-label">
											{TranslationContext !== undefined ? (
												TranslationContext.p.logouttime
											) : (
												'Logout Time'
											)}
										</p>
										<p className="font-weight-bold" style={{ fontSize: '16px', float: 'right' }}>
											{this.state.LogoutTime}
										</p>
									</div>
								</div>
								<ProgressBar
									className="logout-progress"
									// now={this.state.percentLog}
									now={this.state.workTime}
								/>
								<p
									className="logout-label font-weight-bold prog-indi"
									style={{
										width: this.state.workTime + '%',
										textTransform: 'uppercase'
									}}
								>
									{this.state.workTimeHours}
								</p>
								<div className="Stopwatch">
									{this.state.timerOn ? (
										<button onClick={this.startTimer} className="">
											Start
										</button>
									) : (
										<button onClick={this.stopTimer} className="">
											Stop
										</button>
									)}
								</div>
							</div>
							<div>
								<div>
									<p className="logout-label">
										{TranslationContext !== undefined ? TranslationContext.p.slascore : 'SLA SCORE'}
									</p>
									<p className="font-weight-bold">{this.state.SLAScore}</p>
								</div>
								<div>
									<p className="logout-label">CSAT SCORE</p>
									<p className="font-weight-bold">{this.state.userCsatscore}</p>
								</div>
								<div>
									<p className="logout-label">
										{TranslationContext !== undefined ? (
											TranslationContext.p.avgresponsetime
										) : (
											'Avg Response time'
										)}
									</p>
									<p className="font-weight-bold">{this.state.AvgResponse}</p>
								</div>
							</div>
						</div>
					</Modal>
				</div>
				<div />
				{this.state.openHeadphoneModal && <IVRModal
					openHeadphoneModal={this.state.openHeadphoneModal}
					handleCloseHeadphoneIcon={this.handleCloseHeadphoneIcon}
					username={this.state.UserName}
					isIVRLogIn={this.state.isIVRLogIn}
				/>}
				<audio id="newChatAudio">
					<source src={JSON.parse(window.localStorage.getItem('newChatSoundFile'))} type="audio/mpeg" />
				</audio>
				<audio id="newChatMeaasgeAudio">
					<source src={JSON.parse(window.localStorage.getItem('newMessageSoundFile'))} type="audio/mpeg" />
				</audio>
			</React.Fragment>
		);
	}
}

export default Headerbkp;
