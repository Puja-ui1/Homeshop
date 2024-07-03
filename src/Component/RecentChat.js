import React, { useState } from "react";
import ChatService from "../Services/ChatService";
import { Table } from "antd";
import { chatTableColums } from "../helpers/constants";

 const RecentChat = ({agentRecentChatData,setActiveChat,customerId,setagentRecentChatData,handleHistoricalTableRow=()=>{},pastChatTableRowSizeExpanded={},setRowClassName=()=>{}}) => { 

    const [isPastChatLoading , setisPastChatLoading] = useState(false)
    var uid =0;


    const handleGetAgentRecentChat = ({activeChat}) =>{ 
        setActiveChat()
        setisPastChatLoading(true)
        let inputParams = {
            CustomerID: customerId,
            
          };
          ChatService.PostWithParams(
            "/CustomerChat/GetAgentRecentChat",
            inputParams
          )

          .then((response)=>{

            var message = response.message;
            var agentRecentChatData = response.responseData;

            if(message==="success" && agentRecentChatData){
                setagentRecentChatData(agentRecentChatData);
                setisPastChatLoading(false)
            }
            else{
                setagentRecentChatData(agentRecentChatData)
                setisPastChatLoading(false )
            }


          })
          .catch((error) => {
            console.log(error);
          });

    }


    return(
    //   <div className="ant-table-content">
    //     <div className="ant-table-body">

    //     </div>
    //     <div className="ant-table-placeholder">
    //      <div className="ant-empty ant-empty-normal">
    //         <div className="ant-empty-image">
                
    //             <p className="ant-empty-description">No Data</p>
    //         </div>

    //      </div>

    //     </div>

    //   </div>


    <div className={`tab-pane fade `}
                          id="recent-chat-tab"
                          role="tabpanel"
                          aria-labelledby="recent-chat-tab"
                          style={{ height: "inherit" }}>
                        <div className="chathistory-tbl histochat">
                        <div className="table-cntr store chat-history chatabcus mg-rm now-rap-tbl-txt">
                        <Table
                                noDataContent="No Record Found"
                                className="components-table-demo-nested antd-table-campaign custom-antd-table add-cursor"
                                columns={chatTableColums}
                                dataSource={agentRecentChatData}

                               
                                onRow={(record, index) => ({
                                    onClick: (event) => {
                                      handleHistoricalTableRow(record, index, event);
                                    },
                                  })}
                                  pagination={{
                                    pageSize: pastChatTableRowSizeExpanded,
                                    defaultPageSize: pastChatTableRowSizeExpanded,
                                  }}
                                  rowKey={(record) => {
                                    if (record.chatID) {
                                      uid = uid + 1;
                                      return record.chatID + "g" + uid;
                                    } else {
                                      uid = uid + 1;
                                      return "h" + uid;
                                    }
                                  }}
                                  rowClassName={setRowClassName}
                                  >
                                </Table>
                            </div>


                            </div>
                           
                        </div>
      
    )

}

export default RecentChat;