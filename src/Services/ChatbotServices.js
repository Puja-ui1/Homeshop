import ChatService from "./ChatService";
const chatService=new ChatService()

export const handleGetAgentChatHistory = (setIsHistoricalChatLoading,sethistoricalChatData) => {

  
      
   setIsHistoricalChatLoading (true );
   console.log("abc")
    chatService.Post("/CustomerChat/GetAgentChatHistory")
      .then((response) => {
        console.log("response" , response)
        var message = response.message;
        var historicalChatData = response.responseData;
        if (message === "Success" && historicalChatData) {
            // console.log(historicalChatData,"666666666666666666666");
           sethistoricalChatData(historicalChatData) 
        //    console.log("hist",sethistoricalChatData)
           setIsHistoricalChatLoading ( false );
        } else {
          
            sethistoricalChatData([]);
            setIsHistoricalChatLoading (false);
        }
       })
          
      
      .catch((error) => {
        console.log(error);
      });
}

export const handleGetChatMessagesList = (id, RecentChat, isScrollTop=undefined, state, setState=()=>{}) =>{ 
    console.log("state",state)

    var forRecentChat = 0;
    var urlType = "";
    var objParam = {};
    
    if (RecentChat) {
        forRecentChat = 1;
        urlType = "/CustomerChat/getChatMessagesList";
        objParam.chatID = id;
        objParam.ForRecentChat = forRecentChat;
    }
    else{
        let chatID = 0;
        if (localStorage.getItem("ongoingChatId") ) {
          chatID = localStorage.getItem("ongoingChatId");
          localStorage.removeItem("ongoingChatId");
        } else {
          chatID = id;
        }
        objParam.chatID = chatID;
        objParam.ForRecentChat = forRecentChat;
        objParam.PageNo = isScrollTop ? state?.pageNumberCurrentChat : 1;
        urlType = "/CustomerChat/getChatMessagesListNew";
    }
   console.log("line no .57");
    chatService.PostWithParams(urlType, objParam)
      .then((response) => {
        var message = response.message;
        var messageData = RecentChat
          ? response.responseData
          : response.responseData.chatMessages;
        var recentChatCount = 0;
        // console.log("msg2",message);
        //  console.log("messageData",RecentChat)

        if (RecentChat) {
          recentChatCount = state?.pastChatCount;
          console.log("inside if recent",state?.pastChatCount)
        } else {
          recentChatCount = response.responseData.recentChatCount;
        }

        console.log("recentChatCount",recentChatCount)

      setState({
        ...state,
            messageListLoader: false,
            //isMainLoader: false,
            recentChatCount: recentChatCount,
            isCallChatMessgaeApi: false,
          });
         
  
          if (message === "Success" && messageData) {
            console.log("Line 89999",state?.showHistoricalChat)
            if (state?.showHistoricalChat) {
                console("+++++++++++++++++++++++",state?.showHistoricalChat )
              setState({
                ...state,
                messageHistoryChatData: messageData,
                //isMainLoader: false,
                messageListLoader: false,
              });

              console.log("msghistory",state?.messageHistoryChatData)
            } else {
              var newMessageData = [];
              if (messageData.length > 0) {
                for (let i = messageData.length - 1; i >= 0; i--) {
                  newMessageData.push(messageData[i]);
                }
              }
              console.log("messageData.length ",messageData.length )
                 console.log(" newMessageData", newMessageData)
              if (messageData.length > 0 && isScrollTop) {
                console.log("state?.messageData.length",messageData.length)

                for (let i = 0; i < messageData.length; i++) {
                  newMessageData.push(messageData[i]);
                }
              }
  
              setState({
                ...state,
                isScrollMessage: true,
                // ...messageData,
                messageData: newMessageData,
                isScroll: isScrollTop === true ? false : true,
                isMainLoader: false,
                messageListLoader: false,
                pastChatCount: recentChatCount,
                pageNumberCurrentChat: state?.pageNumberCurrentChat + 1,
                AttachementFiles: [],
                //message: "",
                loading: false,
              });
            }
          } else {
            setState({
                ...state,
              isScrollMessage: false,
              messageData:
                messageData.length > 0 ?messageData : [],
             // isMainLoader: false,
              messageListLoader: false,
              loading: false,
            });
          }

      })
      .catch((error) => {
        setState({
            ...state,
          //isMainLoader: false,
          isCallChatMessgaeApi: false,
          messageListLoader: false,
        });
        console.log(error);
      });
    }
   
