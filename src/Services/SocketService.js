
import io from 'socket.io-client';
import { socket } from '../helpers/SocketConnection';



let ongochatcount = JSON.parse(localStorage.getItem("ongoingUnreadCount")) !== null ? JSON.parse(localStorage.getItem("ongoingUnreadCount")) : 0

let newchatcount = JSON.parse(localStorage.getItem("newUnreadCount")) !== null ? JSON.parse(localStorage.getItem("newUnreadCount")) : 0

export const handleSocket = (setongoingChatsData,setnewChatsData=()=>{}) => {

    //console.log("colorstate",state)

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
    //socket.emit("CallNewChatSP", objNewChat);
    socket.emit("CallCurrChatSP", currChat);
    handleNewChat(objNewChat ,setnewChatsData)

    // setTimeout(() => {
    //     socket.emit("CallSetCurrentChatSP", currChat);
    // }, 2000);

     socket.emit("CallSetCurrentChatSP", currChat);

    const newChatsDataString = localStorage.getItem("newChatsData");
    if (newChatsDataString && JSON.parse(newChatsDataString)?.length === 0) {
        localStorage.setItem("newUnreadCount", 0)
        newchatcount = 0
    }
    if (JSON.parse(localStorage.getItem("ongoingChatsData"))?.length === 0) {
        localStorage.setItem("ongoingUnreadCount", 0)
        ongochatcount = 0
    }
    //  if (programCode !== "") {

    //     console.log("inside if", programCode.toLowerCase() + agentId,)
    // 		socket.on(programCode.toLowerCase() + agentId, 
    //          function (data) {
    // 			console.log("data",data)
    // 			}
    //           )}

     

    socket.on(
        "CallOngoingSP" +
        programCode.toLowerCase() +
        agentId,
        function (res) {
            console.log("resultnewchat",res)
            var ongoingChatsData = [];
            let ongoingUnreadCount = 0
            // 
            console.log("Header Response ", res)
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
            // if (ongoingChatsData.length > 0) {
            //     // console.log("inside color",state.colorCode[Math.floor(Math.random() * 6)])
            //     for (let i = 0; i < ongoingChatsData.length; i++) {
            //       ongoingChatsData[i].initialColor =
            //        state.colorCode[Math.floor(Math.random() * 6)];
            //        console.log("inside color",state.colorCode[Math.floor(Math.random() * 6)])
            //     }
            //   }

            //   setState({ ongoingChatsData });
              setongoingChatsData(ongoingChatsData)


         console.log(" ongoingChatsData", ongoingChatsData)
            ongochatcount = ongoingUnreadCount
            localStorage.setItem("ongoingUnreadCount", ongoingUnreadCount);
           
        }
    );

}






const handleNewChat = (Value,setnewChatsData) => {

    //socket.send("hi");
    socket.emit("CallNewChatSP", Value);
    console.log("qwerr")
    //
    socket.on(
        "CallNewChatSP" + Value?.ProgramCode?.toLowerCase() + Value?.userMaster_ID,
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

                setnewChatsData(newChatsIncomingData)
                newchatcount = newUnreadCount
                localStorage.setItem("newUnreadCount", newUnreadCount);

                // setTimeout(() => {
                // 	self.forceUpdate();
                // }, 400);
            }
            else {
                localStorage.setItem("newChatsData", []); // didn't get resposnse from backend in that case we will set it emoty array in local storage
            }

            // chatData = JSON.parse(localStorage.getItem("ongoingChatsData"));
        });
}


