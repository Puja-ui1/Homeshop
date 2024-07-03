import React, { useState } from "react";
import ChatbotSideBox from "./ChatbotSideBox";
import ChatBox from "./ChatBox";
import HistoricalChat from "./HistoricalChat";

const ChatbotContainer = () => {

    const[isHistoricalChat ,setIsHistoricalChat] = useState(false)

    return (
        <div className="container-fluid "> 
            <div className="row "> 
                <div className="col-lg-3 p-0 ">
                    <ChatbotSideBox  setIsHistoricalChat={setIsHistoricalChat}/>
                </div>
                <div className="col-lg-9  px-4">
                {isHistoricalChat ? <HistoricalChat /> : <ChatBox />}
                  
                </div>
            </div>
        </div>

    )

}
export default ChatbotContainer