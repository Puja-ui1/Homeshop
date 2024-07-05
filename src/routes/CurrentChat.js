import React from "react";

const CurrentChat = () =>{

    return(
       <div className="currentChat_wrapper">
        <div className="row m-0">
            <div className="col-md-8">
                <div className="chat_content_box">
                    <div className="chat_msg_content">
                        <label>VS</label>
                        <div className="chat_trail_content">
                            <div className="chat_trail_chat">
                                <span>Hey</span>
                            </div>
                            <span className="chat_trail_time">28th June 2024  10:52:45 AM</span>

                        </div>

                    </div>

                    <div className="chat_msg_content">
                        <label>VS</label>
                        <div className="chat_trail_content">
                            <div className="chat_trail_chat">
                                <span>Hey</span>
                            </div>
                            <span className="chat_trail_time">28th June 2024  10:52:45 AM</span>

                        </div>

                    </div>
                    
                </div>
              

            </div>
            <div className="col-md-4">
                <div className="user_details">
                    <div>
                        <div className="user_info_name">
                            <p >valluru suresh</p>
                        </div>
                      <div className="user_info_num">
                        <span>{"+91-"}{"919623794312"}</span>
                        <span>|</span>
                        <span>sureshvalluru@arvindinternet.com</span>
                       

                      </div>
                    </div>

                </div>

            </div>

        </div>


       </div>
    )

}

export default CurrentChat