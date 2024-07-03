import React, { useState } from "react";
import '../assets/css/chatbot.css'


const ChatbotSideBox = ({ setIsHistoricalChat }) => {





    const handleHistoricalChat = (type) => {
        setIsHistoricalChat((prevState) => {
            if (type == 'chat')
                return false
            else
                return true
        });
    };




    return (
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

    )
}

export default ChatbotSideBox