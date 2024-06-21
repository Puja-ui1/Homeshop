
function TicketActionType() {
  if (window.localStorage.getItem('Programcode') === 'bataclub') {
    return [
      { ticketActionTypeID: 200, ticketActionTypeName: "QC" },
      { ticketActionTypeID: 201, ticketActionTypeName: "ETB" },
      { ticketActionTypeID: 202, ticketActionTypeName: "Escalation" }
    ];

  }
  else {
    return [
      { ticketActionTypeID: 200, ticketActionTypeName: "QC" },
      { ticketActionTypeID: 201, ticketActionTypeName: "ETB" },
    ];

  }


}

export default TicketActionType;
