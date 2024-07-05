import React from "react";

const RecentChat = () => {


    return(
       <div className="recentChat_wrapper">
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

export  default RecentChat