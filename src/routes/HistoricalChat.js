import React from "react";
import '../assets/css/chatbot.css'


const HistoricalChat =()=>{

    return(
        <div className="historical_tbl_wrapper">
            <div className="Historical_title">
                <label className="historical_title_lbl">My Historical Chat </label>
            </div>
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
                <tr>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    <td>test</td>
                    
                </tr>
                <tr>
                    <td>test1</td>
                    <td>test1</td>
                    <td>test1</td>
                    <td>test1</td>
                    <td>test1</td>
                    
                </tr>

                <tr>
                    <td>test2</td>
                    <td>test2</td>
                    <td>test2</td>
                    <td>test2</td>
                    <td>test2</td>
                    
                </tr>
            </tbody>
          </table>
          
        </div>
    )

}

export default HistoricalChat;