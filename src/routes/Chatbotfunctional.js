import React, { useEffect, useState } from 'react'




const Chatbotfunctional = () => {
  const defaultColor = "#41B4D5";


  let UserData = JSON.parse(localStorage.getItem("AgentData"));
  let ongoingChatsData = JSON.parse(localStorage.getItem("ongoingChatsData"))
  const [newChatsData, setnewChatsData] = useState(localStorage.getItem("newChatsData") !== "" ? JSON.parse(localStorage.getItem("newChatsData")) : [])
  const [AllAcount, setAllAcount] = useState(false)
  //const [recentChatNavlinkClass, setrecentChatNavlinkClass] = useState("")
  const [activeChat, setActiveChat] = useState(-1)
  const [agentRecentChatData, setagentRecentChatData] = useState([])

  const [ chatbotRightToggle , setChatbotRightToggle] = useState(null)
  const [state, setState] = useState({
    isHistoricalChat: false,

    rowChatId: 0,
    customerName: "",
    showHistoricalChat: false,
    mainTabSelect: 1,
    isCustEndChat: false,
    isCustTimeout: false,
    
    mobileNo: "",
    chatId: 0,
    storeCode: "",
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
    // newChatsData:JSON.parse(localStorage.getItem("newChatsData")),
    pastChatCount: 0,
    messageData: [],
    messageListLoader: false,
    pageNumberCurrentChat: 1,
    AttachementFiles: [],
    loading: false,
    isScrollMessage: false,
    ongoingChatsData: JSON.parse(localStorage.getItem("ongoingChatsData")),
    activeTab: 1,
    chatMessageCount: 0

  })
  //const [ messageHistoryChatData,setMessageHistoryChatData] = useState([])
  const [isCurrentChatOpen, setIsCurrentChatOpen] = useState(false);

  const [isHistoricalChatLoading, setisHistoricalChatLoading] = useState(false)
  const [historicalChatData, sethistoricalChatData] = useState([])
  const [customerId, setCustomerId] = useState(0)


  console.log("countttttttt", state)
  useEffect(() => {

    //  handleSocket(state,setState)
    updateChatsCounts()


    // socket.on("CallNewChatSP", function (result) {
    //  
    //   console.log(result)
    // })
    // console.log(" newChatsData:" , state.newChatsData)

  }, [])

  const updateChatsCounts = () => {
    console.log(localStorage.getItem("newChatsData"), "getit");
    let newChatsData1 = localStorage.getItem("newChatsData") !== "" ?
      JSON.parse(localStorage.getItem("newChatsData")) : []
    setnewChatsData(newChatsData1)
    // setState({
    //   ...state,
    //   newChatsData:JSON.parse(localStorage.getItem("newChatsData")) !== "" ? JSON.parse(localStorage.getItem("newChatsData")) : []

    // })


  }

  const handleHistTabClick = () => {
    localStorage.setItem("isOngoingClick", false);
    localStorage.setItem("isNotiClicked", false);

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


  // const handleOngoingChatClick = (e,
  //   id,
  //   name,
  //   count,
  //   mobileNo,
  //   customerId,
  //   ProgramCode,
  //   StoreID,
  //   isCustEndChat,
  //   storeManagerId,
  //   selectedColor,
  //   isCustTimeout,
  //   sourceType) => {

  //     console.log("************************");

  //     console.log(e,"event");

  //   e.preventDefault();

  //   var activeTab = 1
  //   var isNotiClicked = localStorage.getItem("isNotiClicked");

  //   if (state.chatId === id && isNotiClicked === false) {
  //     handleCloseChatBox();
  //   }
  //   else {
  //     localStorage.setItem("isOngoingClick", true);
  //     localStorage.setItem("isNotiClicked", false);

  //     setState({
  //       ...state,
  //       chatbotRightToggle: "",
  //       mainTabSelect: activeTab,
  //       recentChatTabClass: "",
  //       currentChatTabClass: "show active",
  //       recentChatNavlinkClass: "",
  //       currentChatNavlinkClass: "active",
  //       displayActionButton: "inline",

  //     })
  //   }

  //   if (state.customerMobileNo !== mobileNo) {
  //     window.localStorage.setItem("LastTransaction", "");
  //     window.localStorage.setItem("IsLastTransaction", "");
  //     window.localStorage.setItem("CustomerInsights", "");
  //     window.localStorage.setItem("IsCustomerInsights", "");
  //     window.localStorage.setItem("CustomerProfile", "");
  //    sessionStorage.setItem("currentMobile", mobileNo);

  //   }

  //   if (count > 0) {
  //     console.log("Insde");
  //     setState({
  //       ...state,
  //      chatMessageCount : state.chatMessageCount - 1});
  //   }

  //   if (state.chatId !== id) {
  //     var objNewChat = {
  //       userMaster_ID: state.AgentID,
  //       tenant_ID: state.tenantID,
  //       ProgramCode: state.programCode,
  //       ChatId: id,
  //     };
  //     socket.emit("CallSetCurrentChatSP", objNewChat);

  //   }

  //   if (state.messageData.length === 0 || state.chatId !== id) {
  //     if (state.chatId === id) {
  //       setState({
  //         ...state,
  //         Suggested_Words: {},
  //         selectedSuggested_Words: {},
  //         Profane_Words: [],
  //         replaceMessageVal: "",
  //         grammarlyModal: false,
  //         isScroll: true,
  //         attachmentSendCount: 0,
  //         customerMobileNo: "",
  //         customerNameProfile: "",
  //         isShutterOpen: false,
  //         isCheckSuggetion: false,
  //         isSelectedCard: false,
  //         isCardSend: false,
  //         AttachementFiles: [],
  //         activeCollpse: "",
  //         isScrollMessage: false,
  //         sourceType,
  //         isCustTimeout,
  //         messageSuggestionTagsData: [],
  //         activeTab,
  //         selectedColor,
  //         chatModal: true,
  //         productTypeTab: 0,
  //         selectedWishList: [],
  //         selectedShoppingBag: [],
  //         selectedRecommended: [],
  //         shoppingBagData: [],
  //         wishListData: [],
  //         recommendedData: [],
  //         storeManagerId,
  //         showHistoricalChat: false,
  //         rowChatId: 0,
  //         agentRecentChatData: [],
  //         mainTabSelect: 1,
  //         isCustEndChat,
  //         storeID: StoreID,
  //         chatId: id,
  //         customerName: name,
  //         mobileNo: mobileNo,
  //         customerId: customerId,
  //         programCode: ProgramCode,
  //         message: "",
  //         messageSuggestionData: [],
  //         chkSuggestion: 0,
  //         noOfPeople: "",
  //         selectSlot: {},
  //         scheduleModal: false,
  //         selectedSlot: {},
  //         timeSlotData: [],
  //         searchItem: "",
  //         searchCardData: [],
  //         messageData: [],
  //         isSendClick: false,
  //         isHistoricalChat: false,
  //         isDownbtn: true,
  //         pageNumberCurrentChat: 1,
  //         loading: true,
  //         recentChatNavlinkClass:"",
  //         currentChatNavlinkClass:"active"
  //       })
  //       setActiveChat(1)

  //       handleGetChatMessagesList(id);
  //     } else {
  //       setState({
  //         ...state,

  //         Suggested_Words: {},
  //         selectedSuggested_Words: {},
  //         Profane_Words: [],
  //         replaceMessageVal: "",
  //         grammarlyModal: false,
  //         isScroll: true,
  //         attachmentSendCount: 0,
  //         customerMobileNo: "",
  //         customerNameProfile: "",
  //         isShutterOpen: false,
  //         isCheckSuggetion: false,
  //         isSelectedCard: false,
  //         isCardSend: false,
  //         AttachementFiles: [],
  //         activeCollpse: "",
  //         isScrollMessage: false,
  //         sourceType,
  //         isCustTimeout,
  //         messageSuggestionTagsData: [],
  //         activeTab,
  //         selectedColor,
  //         chatModal: true,
  //         productTypeTab: 0,
  //         selectedWishList: [],
  //         selectedShoppingBag: [],
  //         selectedRecommended: [],
  //         shoppingBagData: [],
  //         wishListData: [],
  //         recommendedData: [],
  //         storeManagerId,
  //         showHistoricalChat: false,
  //         rowChatId: 0,
  //         agentRecentChatData: [],
  //         mainTabSelect: 1,
  //         isCustEndChat,
  //         storeID: StoreID,
  //         chatId: id,
  //         customerName: name,
  //         mobileNo: mobileNo,
  //         customerId: customerId,
  //         programCode: ProgramCode,
  //         message: "",
  //         messageSuggestionData: [],
  //         chkSuggestion: 0,
  //         noOfPeople: "",
  //         selectSlot: {},
  //         scheduleModal: false,
  //         selectedSlot: {},
  //         timeSlotData: [],
  //         searchItem: "",
  //         searchCardData: [],
  //         messageData: [],
  //         isSendClick: false,
  //         isHistoricalChat: false,
  //         isDownbtn: true,
  //         pageNumberCurrentChat: 1,
  //         loading: true,
  //         recentChatNavlinkClass:"",
  //         currentChatNavlinkClass:"active"
  //       })
  //       setActiveChat(1)

  //       if (count === 0) {
  //         handleGetChatMessagesList(id);
  //       } else {
  //         handleMarkAsReadOnGoingChat(id);
  //       }

  //     }
  //   } else {
  //     setState({
  //       ...state,
  //       Suggested_Words: {},
  //       selectedSuggested_Words: {},
  //       Profane_Words: [],
  //       replaceMessageVal: "",
  //       grammarlyModal: false,
  //       isScroll: true,
  //       attachmentSendCount: 0,
  //       customerMobileNo: "",
  //       customerNameProfile: "",
  //       isShutterOpen: false,
  //       isCheckSuggetion: false,
  //       isSelectedCard: false,
  //       isCardSend: false,
  //       AttachementFiles: [],
  //       activeCollpse: "",
  //       isScrollMessage: false,
  //       sourceType,
  //       isCustTimeout,
  //       messageSuggestionTagsData: [],
  //       activeTab,
  //       selectedColor,
  //       chatModal: true,
  //       productTypeTab: 0,
  //       selectedWishList: [],
  //       selectedShoppingBag: [],
  //       selectedRecommended: [],
  //       shoppingBagData: [],
  //       wishListData: [],
  //       recommendedData: [],
  //       storeManagerId,
  //       showHistoricalChat: false,
  //       rowChatId: 0,
  //       agentRecentChatData: [],
  //       mainTabSelect: 1,
  //       isCustEndChat,
  //       storeID: StoreID,
  //       chatId: id,
  //       customerName: name,
  //       mobileNo: mobileNo,
  //       customerId: customerId,
  //       programCode: ProgramCode,
  //       message: "",
  //       messageSuggestionData: [],
  //       chkSuggestion: 0,
  //       noOfPeople: "",
  //       selectSlot: {},
  //       scheduleModal: false,
  //       selectedSlot: {},
  //       timeSlotData: [],
  //       searchItem: "",
  //       searchCardData: [],
  //       messageData: [],
  //       isSendClick: false,
  //       isHistoricalChat: false,
  //       isDownbtn: true,
  //       pageNumberCurrentChat: 1,
  //       loading: true,
  //       recentChatNavlinkClass:"",
  //       currentChatNavlinkClass:"active"
  //     })
  //     setActiveChat(1)

  //     if (localStorage.getItem("isOngoingClick") === "true")
  //       handleGetChatMessagesList(id);

  //   }
  //   console.log("Line 428");
  //  handleChatProfileLastTransactionData(customerId)



  //   //setState({...state,chatbotRightToggle:""})

  // }

  const OngoingChatClick = () => {
    debugger
    console.log("ongoingclick", chatbotRightToggle)
    setChatbotRightToggle("chatbot-right")
    console.log("setongoingclick", chatbotRightToggle)

  }

  const handleMarkAsReadOnGoingChat = async (id) => {

    setState({ ...state, chatId: id });
    let inputParam = {
      chatID: id,
    };
    handleGetChatMessagesList(id);
    chatService.PostWithParams(
      "/CustomerChat/MarkAsReadOnGoingChat",
      inputParam
    )
      .then((response) => {
        var message = response.message;
        var responseData = response.responseData;
        if (message === "Success" && responseData) {
          // handleGetOngoingChat();
          // handleGetChatNotificationCount();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }



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

  const openCurrentChatHandler = () => {
    setIsCurrentChatOpen(true); // Set the state to true when the handler is called
  };


  //  const handleChatClose = () =>{
  //   setState({
  //     ...state,
  //     isHistoricalChat: true

  //   })
  //  }

  // 

  const handleAccountAllClose = () => {
    setAllAcount(false)
  }

  const handleAccountAllOpen = () => {
    console.log("abcpuja", AllAcount)
    setAllAcount({ AllAcount: true });
  }

  const handleCloseChatBox = () => {
    localStorage.setItem("isOngoingClick", false);
    localStorage.setItem("isNotiClicked", false);
    setState({
      ...state,
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
      userMaster_ID: state.AgentID,
      tenant_ID: state.tenantID,
      ProgramCode: state.programCode,
      ChatId: 0,
    };
    socket.emit("CallSetCurrentChatSP", objNewChat);

  }
  const setRowClassName = (record) => {
    return record.chatID === state.rowChatId ? "clickRowStyl" : "";
  };

  // console.log("state.isHistoricalChat ", state.isHistoricalChat)
  // console.log("state.showHistoricalChat", state.showHistoricalChat)
  // console.log("hsjdhshdisodojs")
  // console.log("stateeeeee", state.newChatsData)

  // handle get profile last transcation data

  const handleChatProfileLastTransactionData = (customerId) => {
    console.log("1", customerId)

    setState({
      ...state,
      lasttransactionLoader: true
    });
    let inputParams = {
      customerId: customerId,
    };
    chatService.PostWithParams(
      "/CustomerChat/ChatProfileDetails",
      inputParams
    )
      .then((response) => {
        var message = response.message;
        var responseData = response.responseData;
        setState({ ...state, lasttransactionLoader: false });
        if (message === "Success" && responseData) {
          window.localStorage.setItem(
            "CustomerProfileDetails",
            JSON.stringify(responseData[0])
          );
          setState({
            ...state,
            customerName: responseData[0].customerName,
            customerEmail: responseData[0].customerEmail,
            customerTotalTickets: responseData[0].totalTickets,
            customerOpenTickets: responseData[0].openTickets,
            customerNumber: responseData[0].customerNumber



          });
        } else {
          window.localStorage.setItem("CustomerProfileDetails", {});
        }
      })
      .catch((error) => {
        setState({ ...state, lasttransactionLoader: false });
        console.log(error);
      });
  };

  console.log(state.isHistoricalChat, "state.isHistoricalChat ");

  console.log(state, "state");

  return (
    <>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-lg-3 p-0'>
            <div className='chatbot-left'>
              <div className='chat-cntr' >
                <p className='ongng'>
                  Ongoing Chats({state.ongoingChatsData?.length < 9
                    ? "0" + state.ongoingChatsData?.length
                    : state.ongoingChatsData?.length}
                  )
                </p>
                <div className="chat-left-height" onClick={openCurrentChatHandler}>
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
                        // onClick={(e) => handleOngoingChatClick(e,
                        //   chat.chatID,
                        //   chat.customerName,
                        //   chat.messageCount,
                        //   chat.mobileNo,
                        //   chat.customerID,
                        //   chat.programCode,
                        //   chat.storeID,
                        //   chat.isCustEndChat,
                        //   chat.storeManagerId,
                        //   chat.initialColor,
                        //   chat.isCustTimeout,
                        //   chat.sourceAbbr)}

                        onClick={OngoingChatClick}

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
                  New Chats ({newChatsData?.length < 9
                    ? "0" + newChatsData?.length
                    : newChatsData?.length}
                  )
                </p>

                <div className="chat-left-height">
                  {newChatsData && newChatsData.map((chat, i) => (
                    <div key={i} className={state.chatId === chat.chatID ? "chat-info active" : "chat-info"} >

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
                              {/* {JSON.parse(localStorage.getItem())} */}
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



            {/* // next opeing section of chatbot */}

            {!state.isHistoricalChat &&
              <div className={`chatbot-right newChat_right ${chatbotRightToggle}`} >
                <div className="row m-auto" style={{ height: "inherit" }}>
                  <div className="col-lg-12 p-0" style={{ height: "inherit" }}>
                    {/* *********************** chatbot -right Navbar START************************* */}

                    <div className="row m-auto" style={{ height: "50px" }}>
                      <div className="col-lg-12 p-0">
                        <div className="chatdivtitle" style={{ padding: "5px", height: "" }}>
                          <div className="row m-auto">
                            <ul className="nav nav-tabs" role="tablist" style={{ width: "50%", display: "inline-block", border: "none" }}>
                              <li className="nav-item" onClick={() => setActiveChat(1)}>
                                <a className={`nav-link ${state.currentChatNavlinkClass}`} data-toggle="tab" href="#current-chat-tab" role="tab" aria-controls="current-chat-tab"
                                  aria-selected="false" >
                                  Current Chat
                                </a>
                              </li>
                              <li className="nav-item" onClick={() => setActiveChat(0)}>

                                <a className={`nav-link  ${state.recentChatNavlinkClass}`} data-toggle="tab" href="#recent-chat-tab" role="tab" aria-controls="current-chat-tab"
                                  aria-selected="true">
                                  Recent Chat
                                </a>
                              </li>
                            </ul>

                            <ul className="nav nav-tabs ml-auto">
                              <li className="nav-item ">
                                <button type='button' className={`butn`} onClick={handleAccountAllOpen} >
                                  <label className="myticket-submit-solve-button-text" style={{ display: "inline" }} onClick={handleCloseChatBox} > Action </label>
                                </button>
                              </li>
                              <li className='nav-item'>
                                <button type='button' className="butn chat-close" onClick={handleCloseChatBox}>
                                  X
                                </button>

                              </li>


                              <Modal onClose={handleAccountAllClose} open={AllAcount} modalId="MdlForAction"
                                overlayId="logout-ovrly">
                                <div className="popgrid">
                                  <ul>
                                    <li className="mb-2">
                                      <label> Transfer to Agent/Supervisor</label>

                                    </li>
                                    <li className='mb-2'>
                                      <label>Ban Visitor</label>
                                    </li>

                                    <li className='mb-2'>
                                      <label>End Chat</label>
                                    </li>

                                    <li className='mb-2'>
                                      <label>End Chat & Create Ticket</label>
                                    </li>
                                  </ul>
                                </div>
                              </Modal>
                            </ul>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div className='row'>
                  <div className='col-md-12'>
                    {activeChat === 1 ?
                      <CurrentChat
                        state={state}
                      />
                      :
                      <RecentChat
                        agentRecentChatData={agentRecentChatData}
                        state={state}
                        setActiveChatProps={activeChat}
                        setagentRecentChatData={agentRecentChatData}
                        handleHistoricalTableRow={handleHistoricalTableRow}
                        pastChatTableRowSizeExpanded={state.pastChatTableRowSizeExpanded}
                      />}
                  </div>
                </div>
              </div>
            }


            {state.isHistoricalChat &&
              <div className="chatbot-right" style={{ margin: "0" }}>
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
            }

          </div>

        </div>
      </div>
    </>

  )
}

export default Chatbotfunctional