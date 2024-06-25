import React, { useEffect, useState } from 'react'
import { handleGetAgentChatHistory, handleGetChatMessagesList } from '../Services/ChatbotServices';
import ChartDataTable from '../Component/ChatDataTable';
import ChatDataTable from '../Component/ChatDataTable';
import CancelImg from "./../assets/Images/cancel.png";
import { Markup } from "interweave";
import io from 'socket.io-client';
import { socket } from '../helpers/SocketConnection';


const Chatbot = () => {
  const defaultColor = "#41B4D5";


  let UserData = JSON.parse(localStorage.getItem("AgentData"));
  let ongoingChatsData = JSON.parse(localStorage.getItem("ongoingChatsData"))
  const [newChatsData , setnewChatsData ] = useState([])

  const [state, setState] = useState({
    isHistoricalChat: false,
    messageData: [],
    rowChatId: 0,
    customerName: "",
    showHistoricalChat: false,
    mainTabSelect: 1,
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
    pastChatTableRowSizeExpanded: 10,
    chatTimeAgo: "",
    isCallChatMessgaeApi: false,
    messageHistoryChatData: [],
    messageListLoader: false,
    // isMainLoader: false,
    recentChatCount: 0,
    newChatsData: [],

    pastChatCount: 0,
    messageData: [],
    messageListLoader: false,
    pageNumberCurrentChat: 1,
    AttachementFiles: [],
    loading: false,
    isScrollMessage: false,
    ongoingChatsData: JSON.parse(localStorage.getItem("ongoingChatsData")),
   


  })
  //const [ messageHistoryChatData,setMessageHistoryChatData] = useState([])


  const [isHistoricalChatLoading, setisHistoricalChatLoading] = useState(false)
  const [historicalChatData, sethistoricalChatData] = useState([])


  useEffect(() => {
   
    updateChatCount()

      // if (ongoingChatsData.length > 0) {
      //   for (let i = 0; i < ongoingChatsData.length; i++) {
      //     ongoingChatsData[i].initialColor =
      //      state.colorCode[Math.floor(Math.random() * 6)];
      //   }
      // }
  

  }, [])
  const updateChatCount = () =>{
    console.log(localStorage.getItem("newChatsData"), "getit");
    let newChatsData1 = localStorage.getItem("newChatsData") !== "" ?
      JSON.parse(localStorage.getItem("newChatsData")) : []
      


      setnewChatsData(newChatsData1)
     

  }

  const handleHistTabClick = () => {
    localStorage.setItem("isOngoingClick", false);
    //localStorage.setItem("isNotiClicked", false);

    setState({
      ...state,
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
    handleGetAgentChatHistory(setisHistoricalChatLoading, sethistoricalChatData);

  }

  console.log(historicalChatData, "dhjsjdsdis")


  const handleHistoricalTableRow = (e) => {
    setState({
      ...state,
      rowChatId: e.chatID,
      showHistoricalChat: true,
      chatTimeAgo: e.timeAgo,
      // historyPage: 1,

      pastChatTableRowSizeExpanded: 5, // only 5 row will be visible 
    });

    console.log("statw in 79779", state)

    handleGetChatMessagesList(e.chatID, 1, undefined, state, setState);
  };


  // setRowClassName = (record) => {
  //   return record.chatID === state.rowChatId ? "clickRowStyl" : "";
  // };
  //const [state , setState] = ({ongoingChatsData})

  //handle history chat close
  const handleHistoryChatClose = () => {
    console.log("abc-----")
    setState({
      ...state,
      rowChatId: 0,
      showHistoricalChat: false,
      chatTimeAgo: "",
      pastChatTableRowSizeExpanded: 10,
    });
  }
   
 //onclick of NewChats 
  const handleUpdateCustomerChatStatus = (
    id,
    storeManagerId,
    StoreID,
    name,
    mobileNo,
    customerId,
    ProgramCode,
    sourceType,
    count = 0 ) =>{

      // setState({
      //  ...state,
      //   storeManagerId:storeManagerId,
      //   StoreID:StoreID,
      //   mobileNo:mobileNo,
      //   customerId:customerId,
      //   ProgramCode:ProgramCode,
      //   sourceType:sourceType
      // })
      
      
      let inputParams = {
        chatID: id,
      };
    let newChat = JSON.parse(localStorage.getItem("newUnreadCount")) - count
    console.log("newchat",JSON.parse(localStorage.getItem("newUnreadCount")))
    localStorage.setItem("newUnreadCount", JSON.stringify(newChat));


  }

  const shadeColor = (color, percent) => {
    if (!color || typeof color !== 'string' || color[0] !== '#' || color.length !== 7) {
      return '#80CDE3'; // Default to black if the color is undefined or invalid
    }
  
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);
  
    R = parseInt((R * (100 + percent)) / 100);
    G = parseInt((G * (100 + percent)) / 100);
    B = parseInt((B * (100 + percent)) / 100);
  
    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;
  
    const RR = R.toString(16).padStart(2, '0');
    const GG = G.toString(16).padStart(2, '0');
    const BB = B.toString(16).padStart(2, '0');
  
    return `#${RR}${GG}${BB}`;
  };
  
  
  console.log("state.isHistoricalChat ", state.isHistoricalChat)
  console.log("state.showHistoricalChat", state.showHistoricalChat)
  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-3 p-0'>
            <div className='chatbot-left'>
              <div className='chat-cntr'>
                <p className='ongng'>
                  Ongoing Chats({state.ongoingChatsData?.length < 9
                    ? "0" + state.ongoingChatsData?.length
                    : state.ongoingChatsData?.length}
                  )
                </p>
                <div className="chat-left-height">
                  {state.ongoingChatsData &&
                    state.ongoingChatsData.map((chat, i) => (
                      <div
                        id={chat.chatID}
                        key={i}
                        className={
                          state.chatId === chat.chatID
                            ? "chat-info active"
                            : "chat-info"
                        }
                      
                      >
                        <div className="d-flex align-items-center overflow-hidden">
                          <span
                            className="initial"
                            style={{
                              backgroundColor: chat.initialColor,
                              color: shadeColor(chat.initialColor, -70),
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
                            {!state.onHoverName ? (
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
                  New Chats ({state.newChatsData?.length < 9
                    ? "0" + state.newChatsData?.length
                    : state.newChatsData?.length}
                  )
                </p>
                {/* <div className="chat-left-height">

                  <div className={"chat-info"}>
                    <div className="d-flex align-items-center overflow-hidden">
                      <span
                        className="initial"
                        style={{
                          backgroundColor: "rgb(205, 228, 255)",
                        }}
                      >
                        {"p"}
                      </span>
                      <div className="name-num ml-2">
                        <p className="num">{"908764324567"}</p>
                      </div>
                    </div>
                    <div>
                      <p>{"7 minutes ago"}</p>
                    </div>
                  </div>
                </div> */}

                <div className="chat-left-height">
                  {state.newChatsData && state.newChatsData.map((chat, i) => (
                    <div key={i} className={state.chatId === chat.chatID ? "chat-info active" : "chat-info"}  
                    onClick={handleUpdateCustomerChatStatus(
                      chat.chatID,
                      chat.storeManagerId,
                      chat.storeID,
                      chat.customerName,
                      chat.mobileNo,
                      chat.customerID,
                      chat.programCode,
                      chat.sourceAbbr,
                      chat.messageCount)}>
                      <div className="d-flex align-items-center overflow-hidden">
                        <span className="initial" style={{ backgroundColor: chat.initialColor }}>
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
                              
                                {chat.messageCount === 0 ? (
                                  "No New Message"
                                ) : (
                                  <span className="messagecount">
                                    {chat.messageCount}
                                  </span>
                                )}
                              <p>{chat.timeAgo}</p>
                          </div>
                     </div>




                    </div>
                  ))

                  }
                </div>


              </div>
              {/* history section  */}
              <div className="chat-hist">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    data-toggle="tab"
                    href="#my-historical-chat"
                    role="tab"
                    aria-controls="my-historical-chat"
                    aria-selected="false"
                    onClick={handleHistTabClick}
                  >
                    MY HISTORICAL CHAT
                  </a>
                </li>
              </div>
            </div>
          </div>
          <div className="col-lg-9 p-0">
            {state.isHistoricalChat !== true ? (
              <div className="chatbot-right ">
                <div className="row m-auto" style={{ height: "inherit" }}>
                  <div className="col-lg-12 p-0" style={{ height: "inherit" }}>
                    {/* *********************** chatbot -right Navbar START************************* */}
                    <div className="row m-auto" style={{ height: "50px" }}>
                      <div className="col-lg-12 p-0">

                        <div className="row m-auto">


                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>) :
              (<div className="chatbot-right" style={{ margin: "0" }}>
                <div className="chatdivtitle">
                  <label className="chattitlelbl" style={{ color: "Black" }}>
                    {"My Historical Chat"}
                  </label>
                </div>
                <div className="chathistory-tbl histochat">
                  <div className="table-cntr store chat-history mg-rm now-rap-tbl-txt chatabcus">

                    <ChatDataTable
                      isHistoricalChatLoading={isHistoricalChatLoading}
                      historicalChatData={historicalChatData}
                      handleHistoricalTableRow={handleHistoricalTableRow}
                      pastChatTableRowSizeExpanded={state.pastChatTableRowSizeExpanded}
                    />

                  </div>
                </div>

                <div className="chathistory-tbl">
                  {state.showHistoricalChat ? (
                    <div className="historychatcontnet">
                      <div className="chathistory-div add-bord">
                        <label className="chat-on-tuesday-jul">
                          Chat On
                        </label>
                        <img src={CancelImg} alt="close-icon" style={{ float: "right", cursor: "pointer", }} onClick={handleHistoryChatClose} />

                      </div>

                      <div className="chatcontentDiv pastcht historicalChatDiv">
                        {/* ref={(div) => {
                         historyMessageList = div;
                        }}
                        id="historicalChatDiv" */}
                        {state.messageHistoryChatData !== null &&
                          state.messageHistoryChatData.length >
                          0 ?
                          (
                            state.messageHistoryChatData.map(
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
                                              ? state.selectedColor
                                              : "#ddf6fc",
                                        }}
                                        alt="face image"
                                        title={
                                          item.byCustomer
                                            ? item.customerName
                                            : state.UserName
                                        }
                                      >
                                        {item.byCustomer
                                          ? item.customerName
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .toUpperCase()
                                          : state.UserName.split(
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

                    </div>) : null}
                </div>

              </div>
              )}

          </div>
        </div>
      </div>
    </>

  )
}

export default Chatbot