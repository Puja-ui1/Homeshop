import React from "react";

import { Table } from "antd";
import { chatTableColums } from "../helpers/constants";



 const ChatDataTable=({isHistoricalChatLoading,historicalChatData,handleHistoricalTableRow,pastChatTableRowSizeExpanded,setRowClassName})=>{
  var uid = 0;

    return (
        <Table
        loading={isHistoricalChatLoading}
        noDataContent="No Record Found"
        className="components-table-demo-nested antd-table-campaign custom-antd-table add-cursor"
        columns={chatTableColums}
        dataSource={historicalChatData}
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
      ></Table>
    )
}

export default ChatDataTable