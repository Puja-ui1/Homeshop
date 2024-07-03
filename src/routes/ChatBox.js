import React from "react";

import RecentChat from "./RecentChat";
import CurrentChat from "./CurrentChat";


const ChatBox = () => {

    return (
        <>
            <div className="row" >
                <p> recent Chat</p>
                <p> current Chat</p>
            </div>

            <RecentChat />
            <CurrentChat />


        </>







    )

}

export default ChatBox;