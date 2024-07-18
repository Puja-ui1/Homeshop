import { NotificationManager } from "react-notifications";
import axios from "axios";
import config from "../helpers/config";
import { authHeader } from "../helpers/authHeader";
import ChatService from "./ChatService";
const chatService = new ChatService()


export const handleGetAgentChatHistory = (setIsHistoricalChatLoading, sethistoricalData) => {
  setIsHistoricalChatLoading(true);
  console.log("abc")
  chatService.Post("/CustomerChat/GetAgentChatHistory")
    .then((response) => {
      console.log("response", response)
      var message = response.message;
      var historicalChatData = response.responseData;
      if (message === "Success" && historicalChatData) {
        // console.log(historicalChatData,"666666666666666666666");
        sethistoricalData(historicalChatData)
        //    console.log("hist",sethistoricalChatData)
        setIsHistoricalChatLoading(false);
      } else {

        sethistoricalData([]);
        setIsHistoricalChatLoading(false);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}




export const handleGetChatMessagesList = (
  id,
  RecentChat = 0,
  isScrollTop = false,
  pageNumberCurrentChat = 1,
  setmessageData = () => { },
  setisScrollMessage = () => { },
  setisCallChatMessgaeApi = () => { }
) => {
  console.log("clicked");
  var forRecentChat = 0;
  var urlType = "";
  var objParam = {};
  let chatID = 0;
  chatID = id;
  setisCallChatMessgaeApi(true);

  objParam.chatID = chatID;
  objParam.ForRecentChat = forRecentChat;
  objParam.PageNo = isScrollTop ? pageNumberCurrentChat : 1;
  urlType = "/CustomerChat/getChatMessagesListNew";

  chatService.PostWithParams(urlType, objParam)
    .then((response) => {
      console.log(response, "response");
      var message = response.message;
      var messageData = RecentChat
        ? response.responseData
        : response.responseData.chatMessages;

      setisCallChatMessgaeApi(false);
      if (message === "Success" && messageData) { 
        console.log("messageData before", messageData);
        // to  Ensure messages are in the correct order (oldest first)
        messageData = messageData.reverse();

        console.log("messageData.length ", messageData.length);
        console.log("messageData", messageData);

        setisScrollMessage(true);
        setmessageData(messageData);
      } else {
        setmessageData(messageData.length > 0 ? messageData : []);
        setisScrollMessage(false);
      }
    })
    .catch((error) => {
      setisCallChatMessgaeApi(false);
      console.log(error);
    });
};




export const handleGetAgentRecentChat = async (customerID, setagentRecentChatData, setrecentChatLoader) => {
  setrecentChatLoader(true)
  let inputParams = {
    CustomerID: customerID,
    //PageNo: this.state.pastChatPageNo,
  };
  var agentRecentChatData = []

  console.log("Inisdeeeee  handleGetAgentRecentChat  ");

  setagentRecentChatData(agentRecentChatData)
  chatService.PostWithParams(
    "/CustomerChat/GetAgentRecentChat",
    inputParams
  )
    .then((response) => {
      console.log(response, "responseee inisdee");
      var message = response.message;
      agentRecentChatData = response.responseData;
      console.log("Cliekced handler  ", agentRecentChatData);
      if (message === "Success" && agentRecentChatData) {
        setagentRecentChatData(agentRecentChatData)


      } else {
        setagentRecentChatData(agentRecentChatData)
      }
      setrecentChatLoader(false)
    })
    .catch((error) => {
      console.log(error);
      setrecentChatLoader(false)
    });

}



export const handleMarkAsReadOnGoingChat = (id) => {


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
        // self.handleGetOngoingChat();
        // self.handleGetChatNotificationCount();
      }
    })
    .catch((error) => {
      console.log(error);
    });
}


export const handleChatProfileLastTransactionData = (customerId, setcustomerName, setcustomerTotalTickets, setcustomerOpenTickets, setcustomerEmail, setlasttransactionLoader) => {

  setlasttransactionLoader(true)
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
      setlasttransactionLoader(false)
      if (message === "Success" && responseData) {
        window.localStorage.setItem(
          "CustomerProfileDetails",
          JSON.stringify(responseData[0])
        );

        setcustomerName(responseData[0].customerName)
        setcustomerEmail(responseData[0].customerEmail)
        setcustomerTotalTickets(responseData[0].totalTickets)
        setcustomerOpenTickets(responseData[0].openTickets)

      } else {
        window.localStorage.setItem("CustomerProfileDetails", {});
      }
    })
    .catch((error) => {
      setlasttransactionLoader(false)
      console.log(error);
    });
};


// sevice for create ticket form



export const handleBanCustomer = (chatId, banReasonId, setbanCustomerData, setOpenBanVisitor) => {

  console.log("handleBanCustomer", chatId, banReasonId)

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
          setbanCustomerData(data)
          setOpenBanVisitor(false)

          // self.handleUpdateStoreManagerChatStatus(3);
        } else {
          setbanCustomerData([])
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
