import { Markup } from "interweave";
import React from "react";

export const chatTableColums=[
    {
      title: "Name",
      dataIndex: "",
      width: "10%",
      className: "textnowrap-table",
      render: (row, rowData) => {
        console.log("rowData",rowData)
        return (
          <>
            {rowData.customerName
              ? rowData.customerName
              : ""}
          </>
        );
      },
    },
    {
      title: "Agent",
      dataIndex: "",
      width: "20%",
      className: "textnowrap-table",
      render: (row, rowData) => {
        return (
          <>
            {rowData.agentName ? (
              <p>{rowData.agentName}</p>
            ) : (
              ""
            )}
          </>
        );
      },
    },
    {
      title: "Rating",
      dataIndex: "rating",
      width: "20%",
      className: "textnowrap-table",
    //    render: (row, rowData) => {
    //      return (
    //        <>
    //          {rowData.customerMobile
    //            ? rowData.customerMobile
    //            : ""}
    //        </>
    //      );
    //    },
    },
    {
      title: "Time",
      dataIndex: "timeAgo",
      width: "30%",
      className: "textnowrap-table",
       render: (row, rowData) => {
         return (
           <>
             {rowData.timeAgo ? rowData.timeAgo : ""}
           </>
         );
       },
    },

    {
      title: "Message",
      width: "30%",
      className: "textnowrap-table ",
      render: (row) => {
        return (
          <>
            <div
              className="historicalchatDiv"
              title={row ? row : ""}
            >
              <div className="table-bchat">
                {row.chatCount}
              </div>
              <div>
                <p>
                  <Markup content={row.message}></Markup>
                </p>
              </div>
            </div>
          </>
        );
      },
    },
  ]
