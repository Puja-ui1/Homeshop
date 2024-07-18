import React, { useState } from "react";

const RecentChat = ({agentRecentChatData ,recentChatLoader}) => {
    console.log("agentRecentChatData",agentRecentChatData);
  
console.log("agentRecentChatData.length",agentRecentChatData.length)

    return(
        <>
       {recentChatLoader ? (<p> Loading ...</p>):
       (<div className="recentChat_wrapper">
       <table>
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Agent</th>
                  <th>Rating</th>
                  <th>Time</th>
                  <th>Message</th>
              </tr>
          </thead>
          <tbody className="tbl_data">
          { agentRecentChatData  && agentRecentChatData?.length > 0 ? (
                                  agentRecentChatData.map((chat, index) => (
                                      <tr key={index}>
                                          <td>{chat.customerName}</td>
                                          <td>{chat.agentName}</td>
                                          <td>{chat.rating}</td>
                                          <td>{chat.timeAgo}</td>
                                          <td>{chat.message}</td>
                                      </tr>
                                  ))
                              ) : (
                                  <tr>
                                      <td colSpan="5">No data available</td>
                                  </tr>
                              )}
          </tbody>
        </table>

     </div>)
       }
       </>
    )

}

export  default RecentChat