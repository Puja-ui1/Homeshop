import React, { useEffect, useState } from "react";
import '../assets/css/chatbot.css'

import RecentChat from "./RecentChat";
import CurrentChat from "./CurrentChat";


const ChatBox = ({ isHistoricalChat, setIsHistoricalChat }) => {
    //debugger
    const [activeTab, setActiveTab] = useState(null)

    const handleTabClick = (tab) => {
        setActiveTab(tab)
    }
    // useEffect(() => {

    // }, [activeTab])

    return (
        <>
            {isHistoricalChat === 'chat' ?
                <>


                    <div className="chatbox_header_wrap ">
                        <div className="chatbox_btn">
                            <h4 className={`mr-2  nav_link ${activeTab === 'current' ? 'nav_link_current' : ''}`} onClick={() => handleTabClick("current")}>Current Chat</h4>
                            <h4 className={`nav_link ${activeTab === 'recent' ? 'nav_link_recent' : ''} `} onClick={() => handleTabClick("recent")}>Recent Chat(0)</h4>
                        </div>
                        <div className="chatbox_action_wrap">
                            {activeTab === 'current' && (
                                <div className="dropdown">
                                    <button className="btn dropdown-toggle" type="button" data-toggle="dropdown">Action
                                        <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu ">
                                        <li className="mb-2"><a href="#">Transfer to Agent/Supervisor</a></li>
                                        <li><a href="#">Ban Visitor</a></li>
                                        <li><a href="#">End Chat</a></li>
                                        <li><a href="#">End Chat & Create Ticket</a></li>

                                    </ul>
                                </div>
                            )}
                            <button className="close_btn" onClick={() => setIsHistoricalChat('')}>X</button>
                        </div>
                    </div>



                    {activeTab === 'current' ? <CurrentChat /> : <RecentChat />}


                </> :
                <></>

            }
        </>
    )

}

export default ChatBox;