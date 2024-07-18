import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import { socket } from '../helpers/SocketConnection';
import '../assets/css/chatbot.css'

import ChatBox from "./ChatBox";

import HistoricalChat from "./HistoricalChat";
import { Modal } from "react-bootstrap";
import { handleSocket } from "../Services/SocketService";
import { handleChatProfileLastTransactionData, handleGetChatMessagesList, handleMarkAsReadOnGoingChat } from "../Services/ChatbotServices";
import ChatService from "../Services/ChatService";
const chatService = new ChatService()




const ChatbotContainer = () => {
    let UserData = JSON.parse(localStorage.getItem("AgentData"));

    const [isHistoricalChat, setIsHistoricalChat] = useState('')
    const [ongoingChatsData, setongoingChatsData] = useState([])
    const [newChatsData, setnewChatsData] = useState([])
    const [customerId, setcustomerId] = useState(0)
    const [chatId, setchatId] = useState(0)
    const [pageNumberCurrentChat, setpageNumberCurrentChat] = useState(1)
    const [messageData, setmessageData] = useState([])
    const [customerName, setcustomerName] = useState('')
    const [UserName, setUserName] = useState("")
    const [CustomerOpenTicketList, setCustomerOpenTicketList] = useState([])
    const [storeID , setstoreID]= useState(0)
    const[mobileNo ,setmobileNo] = useState("")
    const[programCode , setprogramCode] = useState(window.localStorage.getItem("Programcode"))
    const[AgentID ,setAgentID] = useState(UserData.agentID)
    const[tenantID ,settenantID] = useState( UserData.tenantID)
    const[customerEmail , setcustomerEmail] = useState("")
    const[customerTotalTickets , setcustomerTotalTickets] = useState("")
    const[customerOpenTickets ,setcustomerOpenTickets]= useState("")
    const[lasttransactionLoader ,setlasttransactionLoader] = useState(false)
    const[sAgentId , setsAgentId] = useState(UserData.agentID)
    const[sourceType , setsourceType] = useState("cb")
    const[isScrollMessage , setisScrollMessage] = useState(false)
    const[isCallChatMessgaeApi , setisCallChatMessgaeApi] = useState(false)


    const handleHistoricalChat = (type, chat = {}) => {
        console.log("chattttttttttttttt" , chat)
        var count = chat.messageCount
        setIsHistoricalChat(type)
        setcustomerId(chat.customerID)
        setchatId(chat.chatID)
        setcustomerName(chat.customerName)
        setmobileNo(chat.mobileNo)
        setsAgentId(chat.storeManagerId)
        handleGetChatMessagesList(chat.chatID, 0, false, pageNumberCurrentChat, setmessageData ,setisScrollMessage ,setisCallChatMessgaeApi)
        if(count>0){
            handleMarkAsReadOnGoingChat(chat.chatID)
        }
        handleChatProfileLastTransactionData(chat.customerID ,setcustomerName,setcustomerTotalTickets ,setcustomerOpenTickets ,setcustomerEmail ,setlasttransactionLoader)

    };
    console.log("chat.customerId", customerId);
    console.log("chatId", chatId);

    const handelNewChat = (chat = {}) => {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        var count = chat?.messageCount
        
        setprogramCode(chat.programCode)
        setsourceType(chat.sourceAbbr)
        let inputParams = {
            chatID: chat.chatID,
        };

        let newChat = JSON.parse(localStorage.getItem("newUnreadCount")) - count
        localStorage.setItem("newUnreadCount", JSON.stringify(newChat));

        chatService.PostWithParams(
            "/CustomerChat/UpdateCustomerChatStatus",
            inputParams
        )
            .then((response) => {
                var message = response.message;
                var responseData = response.responseData;
                if (message === "Success" && responseData) {
                    setchatId(chat.chatID)
                     handleMarkAsReadOnGoingChat(chat.chatID)
                }
                var objNewChat = {
                    userMaster_ID: AgentID,
                    tenant_ID: tenantID,
                    ProgramCode: programCode,
                    ChatId: chat.chatID,
                  };
                  socket.emit("CallSetCurrentChatSP", objNewChat);
            })

            .catch((error) => {
               
                console.log(error);
            });

    }


    const extractShortName = (name) => {
        console.log(name)
        let iconName = name.split(' ')[0].charAt(0).toUpperCase();
        return iconName
    }

    useEffect(() => {
        let agentId = 0;
        handleSocket(setongoingChatsData, setnewChatsData)
        // setongoingChatsData(window.localStorage.getItem('ongoingChatsData'))
        var UserProfile = JSON.parse(localStorage.getItem("UserProfile"));
        setUserName(UserProfile.agentName)
        setAgentID(agentId)
    }, [])


    console.log("UserName", UserName)

    console.log("ongoingChatsData", ongoingChatsData)
    console.log("newChatsData", newChatsData)


    console.log("***************************88");
    // console.log(isHistoricalChat, "after")
    return (
        <div className="container-fluid ">
            <div className="row ">
                <div className="col-lg-3 p-0 ">
                    {/* <ChatbotSideBox  setIsHistoricalChat={setIsHistoricalChat}/> */}
                    <div className="chatSideBox_wrap">
                        <div className="ongoing_wrap">
                            <p className="Heading">Ongoing Chats ({ongoingChatsData?.length < 9 ? "0" + ongoingChatsData?.length
                                : ongoingChatsData?.length})</p>
                            <ul className="userchatlist_wrap">
                                {ongoingChatsData && ongoingChatsData.map((chat, i) => (
                                    <li className="info-chat" key={i} onClick={(e) => handleHistoricalChat('chat', chat)}>
                                        <div className="user_list_left">
                                            <div className="user_name_mob">
                                                <label className="icon">{extractShortName(chat.customerName)}</label>
                                                <div>
                                                    <p className="user_name">{chat.customerName}</p>
                                                    <p className="num">{chat.mobileNo}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="user_list_right">
                                            <div className="msg_count_time">
                                                <p className="msg">{chat.messageCount === 0 ? (
                                                    "No New Message"
                                                ) : (
                                                    <span className="messagecount">
                                                        {chat.messageCount}
                                                    </span>
                                                )}</p>
                                                <p>{chat.timeAgo}</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>



                        </div>
                        <div className="newchat_wrap">
                            <p className="Heading">New Chats ({newChatsData?.length < 9 ? "0" + newChatsData?.length
                                : newChatsData?.length})</p>
                            <ul className="userchatlist_wrap ">
                                {newChatsData &&  newChatsData?.length>0 ?
                                newChatsData.map((chat, i) => {
                                    return(
                                    <li className="info-chat" key={i} onClick={(e) => {
                                        handleHistoricalChat('chat', chat)
                                        handelNewChat(chat)
                                        }}>
                                        <div className="user_list_left">
                                            <div className="user_name_mob">
                                                <label className="icon">{extractShortName(chat.customerName)}</label>
                                                <div>
                                                    <p className="user_name">{chat.customerName}</p>
                                                    <p className="num">{chat.mobileNo}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="user_list_right">
                                            <div className="msg_count_time">
                                                <p className="msg">{chat.messageCount === 0 ? (
                                                    "No New Message"
                                                ) : (
                                                    <span className="messagecount">
                                                        {chat.messageCount}
                                                    </span>
                                                )}</p>
                                                <p>{chat.timeAgo}</p>
                                            </div>
                                        </div>
                                    </li> 
                                    )
                                }):null}

                            </ul>
                        </div>
                        <div className="historical_btn">
                            <button onClick={(e) => handleHistoricalChat('history')}> My Historical Chat</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9  p-0">
                    {isHistoricalChat === 'history' ? <HistoricalChat UserName={UserName} /> : <ChatBox isHistoricalChat={isHistoricalChat} setIsHistoricalChat={setIsHistoricalChat}
                                                                                                                                           customerID={customerId}
                                                                                                                                               id={chatId}
                                                                                                                                pageNumberCurrentChat={pageNumberCurrentChat}
                                                                                                                                           messageData={messageData}
                                                                                                                                      setmessageData={setmessageData}
                                                                                                                                          customerName={customerName}
                                                                                                                                          UserName={UserName}
                                                                                                                                    CustomerOpenTicketList={CustomerOpenTicketList}
                                                                                                                                 setCustomerOpenTicketList={setCustomerOpenTicketList}
                                                                                                                                 mobileNo={mobileNo} 
                                                                                                                                 customerEmail ={customerEmail}
                                                                                                                                 customerTotalTickets={customerTotalTickets}
                                                                                                                                 customerOpenTickets={customerOpenTickets}
                                                                                                                                 setcustomerName={setcustomerName}
                                                                                                                                 AgentID={AgentID}
                                                                                                                                 sAgentId= {sAgentId} 
                                                                                                                                 programCode = {programCode}
                                                                                                                                 sourceType= {sourceType}
                                                                                                                                 setisScrollMessage ={setisScrollMessage} 
                                                                                                                                 isScrollMessage ={isScrollMessage}
                                                                                                                                 isCallChatMessgaeApi ={isCallChatMessgaeApi}
                                                                                                                                 setisCallChatMessgaeApi= {setisCallChatMessgaeApi}
                                                                                                                                 />}



                </div>
            </div>

        </div>

    )

}
export default ChatbotContainer