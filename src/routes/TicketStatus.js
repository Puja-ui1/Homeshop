 function TicketStatus() {
  // console.log(window.localStorage.getItem('ticketStatus'));
  return [
    JSON.parse(window.localStorage.getItem('ticketStatus'))
  //   { ticketStatusID: 100, ticketStatusName: "Draft" },
  //   { ticketStatusID: 101, ticketStatusName: "New" },
  //   { ticketStatusID: 102, ticketStatusName: "Open" },
  //   { ticketStatusID: 103, ticketStatusName: "Resolved" },
  //   { ticketStatusID: 104, ticketStatusName: "Closed" },
  //   { ticketStatusID: 105, ticketStatusName: "Re-Opened" },
  //   { ticketStatusID: 106, ticketStatusName: "Assigned" },
  //   { ticketStatusID: 107, ticketStatusName: "WIP" },
  //   { ticketStatusID: 1001, ticketStatusName: "Escalated" },
  //   { ticketStatusID: 1004, ticketStatusName: "Reassigned" },
  ];
}

export default TicketStatus;
