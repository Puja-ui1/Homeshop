import React, { useEffect, useState } from "react";
import "../assets/css/custome.css";
import { Link } from "react-router-dom";
import { importImage } from '../helpers/CommanFuncation';
import axios from "axios";

import IVRModal from "./IVRModal";
import Modal from 'react-responsive-modal';
import { Modal as CallModal, Popover, Button, notification } from 'antd';
import { handleGetNotificationList, handleGetStatusDropDown, handleLoggedInUserDetails, handleLogoutMethod, handleTimeoutfunc, onViewTicket } from "../Services/HeaderService";
import { ProgressBar } from 'react-bootstrap';
import { handleSocket } from "../Services/SocketService";

const images = importImage(require.context('../assets/Images/', false, /\.(png|jpe?g|svg)$/));

const Header = () => {
    const [openHeadphoneModal, setOpenHeadphoneModal] = useState(false);
    const [notifiMessages, setNotifiMessages] = useState([]);
    const [notiCount, setNotiCount] = useState(0)
    const [state, setState] = useState({
        Email: '',
        UserName: '',
        LoginTime: '',
        LoggedInDuration: '',
        SLAScore: '',
        CSatScore: '',
        AvgResponse: '',
        LogoutTime: '',
        NameTag: '',
        userProfile: '',
        percentLog: 0,
        workTime: 0,
        workTimeHours: '0H 0M',
        isIVRLogIn: false,
        userCsatscore: '',
        modalIsOpen: false,
        NotifiTicketIds: [],
        IdleBreakSwitch: false,
        timerOn: true,
        startbreak: "",
        stopbreak: "",
        open: false,
        colorCode: [
            "#E8E8E8",
            "#FFE8A7",
            "#DAF3C0",
            "#DDF6FC",
            "#CDE4FF",
            "#FFDEE2",
          ],
          ongoingChatsData: JSON.parse(localStorage.getItem("ongoingChatsData")),
    })



    useEffect(() => {
        handleSocket(setState)
        handleLoggedInUserDetails(state, setState);
        handleGetNotificationList(setNotifiMessages, setNotiCount);
        handleGetStatusDropDown(state, setState);
    }, [])

 console.log("msg",notifiMessages)
 console.log("count", notiCount)
    const handleHeadphoneIcon = () => {
        setOpenHeadphoneModal(!openHeadphoneModal);
    }


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

    const startTimer = async () => {
        var currentdate = new Date();
        var startbreak = currentdate;

        await setState({
            ...state,
            startbreak: startbreak,
            timerOn: false,
            IdleBreakSwitch: true
        })
        console.log("startbreak", state.startbreak);

    }

    const stopTimer = () => {
        var currentdate = new Date();
        var stopbreak = currentdate;

        setState({
            ...state,
            stopbreak: stopbreak,
        })
        console.log("stopbreak", state.stopbreak);
        handleTimeoutfunc(state, setState, stopbreak);
    }
    // these two are for logout pop up modal handle 
    const onOpenModal = () => {
        console.log("open")
        setState({
            ...state,
            open: true
        });
    };

    const onCloseModal = () => {
        console.log("close")
        setState({
            ...state,
            open: false
        });
    };
    const chatNotificationHandler= () =>{
       
      
        localStorage.removeItem("newUnreadCount");
        
        console.log("notification",localStorage.getItem("newUnreadCount"));

    }


    return (
        <>
            <div className="d-flex align-items-center justify-content-between" style={{ background: "white" }}>
                <div className="d-flex">
                    <div className="er">
                        <label className="er-label">{"ER"}</label>
                    </div>

                    <div className=" headers-menu">
                        <Link to="dashboard">
                            <div>
                                <img
                                    src={images[!window.location.pathname.split('/')?.includes('dashboard') ? 'dashboardBlack.png' : 'dashboardBlue.png']}
                                    alt="DashboardLogo"
                                    className="menu-icon"
                                />
                                Dashboards
                            </div>
                        </Link>

                        <Link to="myTicketlist">
                            <div>
                                <img
                                    src={images[!window.location.pathname.split('/')?.includes('ticket') ? 'ticket.png' : 'ticket-blue.png']}
                                    alt="TicketLogo"
                                    className="menu-icon"
                                />
                                My Tickets
                            </div>
                        </Link>

                        <Link to="knowledgebase">
                            <div>
                                <img
                                    src={images[!window.location.pathname.split('/')?.includes('knowledgebase') ? 'knowledge.png' : 'knowledge-blue.png']}
                                    alt="knowledgeLogo"
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
                            src={images[!window.location.pathname.split('/')?.includes('headphone') ? 'headphone2.png' : 'headphone.png']}
                            alt="headphone"
                            className="headphone_icon"
                            onClick={handleHeadphoneIcon}
                        />
                    </>

                    <Link to="calllogs" className="position-relative">

                        <>
                            <img src={images[!window.location.pathname.split('/')?.includes('callLog') ? 'call-log.png' : 'call-log.png']} alt="call-log" className="callLog" />
                        </>
                    </Link>

                    <Link to={{ pathname: 'chatbot', action: 'redirectToChat' }} className="position-relative" onClick={chatNotificationHandler}>
                        <>
                            <img src={images[!window.location.pathname.split('/')?.includes('chatbot') ? 'chat.png' : 'chat-blue.png']} alt="logo" className="chatImg" />
                            
                            {JSON.parse(localStorage.getItem("ongoingUnreadCount")) !== null && JSON.parse(localStorage.getItem("newUnreadCount")) !== null ?
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
													: null}
                                                    
                        </>
                    </Link>

                    <a href="#!">
                        <div className="position-relative" onClick={openModal}>
                            <img src={images[!window.location.pathname.split('/')?.includes('Notification') ? 'Notification.png' : 'Notification.png']} alt="logo" className="notifi" />
                            {state?.notiCount > 0 && (<span className="upper-noti-count">{state?.notiCount}</span>)}
                        </div>
                    </a>

                    {/* Notification pop up  */}
                    <Modal onClose={closeModal} open={state.modalIsOpen} modalId="Notification-popup" >
                        <div className="notifi-container">
                            {state?.notiCount === 0 &&
                                <p className="m-0 p-2">{"There are no notifications."}</p>
                            }
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
                                                                    pathname: "myTicketlist",
                                                                    ticketDetailID: data,
                                                                    notifiPathname: state?.notifiPathname,
                                                                }}
                                                                onClick={handleShowTicket(data, item.isFollowUp)}>
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
                                                onClick={(e) => handleViewTicketModalOpen(e, item)}>
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
                        <img src={images[!window.location.pathname.split('/')?.includes('setting') ? 'setting.png' : 'setting-blue.png']} alt="logo" className="setting" />
                        <span style={{ display: "none" }} className="icon-fullname">
                            Settings
                        </span>
                    </Link>
                    {/* profile icon */}
                    <a href="#!" className="bitmap5" onClick={onOpenModal} >
                        {/* {state.NameTag} */} {'AG'}
                    </a>

                    <div>
                        <Modal open={state.open}
                            onClose={onCloseModal}
                            modalId="logout-popup"
                            overlayId="logout-ovrly"
                        >
                            <div className="logout-block">
                                <div>
                                    <div className="user-img">
                                        <Link to="userprofile">
                                            <img src={images[!window.location.pathname.split('/')?.includes('profile') ? 'UserIcon.png' : 'UserIcon.png']} alt="User" title="Edit Profile" onClick={onCloseModal} />
                                        </Link>

                                    </div>
                                    <div className="logout-flex">
                                        <div>
                                            <p style={{ fontSize: '16px', fontWeight: '600' }}>
                                                {state.UserName}
                                            </p>
                                            <Link to="userprofile">
                                                <img src={images[!window.location.pathname.split('/')?.includes('penciledit') ? 'pencil.png' : 'pencil.png']} alt="pencilimg" className="pencilImg" title="Edit Profile" onClick={onCloseModal} />

                                            </Link>
                                            <p className="mail-id">{state.Email}</p>

                                        </div>

                                        <button type="button" className={state.IdleBreakSwitch ? 'logout-disabled' : 'logout'} onClick={handleLogoutMethod}>
                                            {'LOGOUT'}
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
                                            <p className="font-weight-bold" style={{ fontSize: '16px', textAlign: 'end' }}>
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
                                        {state.timerOn ?
                                            (<button onClick={startTimer} className=""> Start</button>) : (<button onClick={() => { stopTimer() }} className=""> Stop</button>)}

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
                    handleCloseHeadphoneIcon={handleHeadphoneIcon}
                    username={state?.UserName}
                    isIVRLogIn={state?.isIVRLogIn}
                />
            )}
        </>);


}

export default Header