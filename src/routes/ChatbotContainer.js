import React, { useEffect, useState } from "react";
import'../assets/css/chatbot.css'

import ChatBox from "./ChatBox";

import HistoricalChat from "./HistoricalChat";

const ChatbotContainer = () => {

    const [isHistoricalChat, setIsHistoricalChat] = useState('')

    const handleHistoricalChat = (type) => {
        //console.log(isHistoricalChat,"before")

        setIsHistoricalChat(type)

        // console.log("type", type)
        // setIsHistoricalChat((prevState) => {
        //     if (type == 'chat') {
        //         return false
        //     }
        //     else {
        //         return true
        //     }


        // });
        //setIsHistoricalChat(type === 'chat' ? false : true);
     };

    // useEffect(() => {
        

    //     console.log(isHistoricalChat, "after");
    // }, [isHistoricalChat]);

  

    console.log("***************************88");
   // console.log(isHistoricalChat, "after")
    return (
        <div className="container-fluid ">
            <div className="row ">
                <div className="col-lg-3 p-0 ">
                    {/* <ChatbotSideBox  setIsHistoricalChat={setIsHistoricalChat}/> */}
                    <div className="chatSideBox_wrap">
                        <div className="ongoing_wrap">
                            <p className="Heading">Ongoing Chats (0)</p>
                            <ul className="userchatlist_wrap">
                                <li className="info-chat" onClick={() => handleHistoricalChat('chat')}>
                                    <div className="user_list_left">
                                        <div className="user_name_mob">
                                            <label className="icon">AK</label>
                                            <div>
                                                <p className="user_name">Anoop Kumar</p>
                                                <p className="num">919310868515</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="user_list_right">
                                        <div className="msg_count_time">
                                            <p className="msg">No New Message</p>
                                            <p>1st July 2024</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="info-chat" onClick={() => handleHistoricalChat('chat')}>
                                    <div className="user_list_left">
                                        <div className="user_name_mob">
                                            <label className="icon">AK</label>
                                            <div>
                                                <p className="user_name">Anoop Kumar</p>
                                                <p className="num">919310868515</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="user_list_right">
                                        <div className="msg_count_time">
                                            <p>No New Message</p>
                                            <p>1st July 2024</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="newchat_wrap">
                            <p className="Heading">New Chats (0)</p>
                            <ul className="userchatlist_wrap ">
                                <li className="info-chat " onClick={() => handleHistoricalChat('chat')}>
                                    <div className="user_list_left">
                                        <div className="user_name_mob">
                                            <label className="icon">AK</label>
                                            <div>
                                                <p className="user_name">Anoop Kumar</p>
                                                <p className="num">919310868515</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="user_list_right">
                                        <div className="msg_count_time">
                                            <p>No New Message</p>
                                            <p>1st July 2024</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="info-chat" onClick={() => handleHistoricalChat('chat')}>
                                    <div className="user_list_left">
                                        <div className="user_name_mob">
                                            <label className="icon">AK</label>
                                            <div>
                                                <p className="user_name">Anoop Kumar</p>
                                                <p className="num">919310868515</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="user_list_right">
                                        <div className="msg_count_time">
                                            <p>No New Message</p>
                                            <p>1st July 2024</p>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="historical_btn">
                            <button onClick={() => handleHistoricalChat('history')}> My Historical Chat</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9  p-0">
                    {isHistoricalChat==='history' ? <HistoricalChat /> : <ChatBox isHistoricalChat={isHistoricalChat} setIsHistoricalChat={setIsHistoricalChat}/>}

                </div>
            </div>
        </div>

    )

}
export default ChatbotContainer