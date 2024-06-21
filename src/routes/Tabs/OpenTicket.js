import React, { useEffect } from 'react'
import { useState } from 'react';

import Modal from "react-responsive-modal";
import config from "../../helpers/config";
import axios from "axios";
import CancelImg from "../../assets/Images/cancel.png";
import { authHeader } from '../../helpers/authHeader';
import { useHistory } from 'react-router';

const OpenTicket = ({ openModel, closeModel, closeCustomerDetailsModal, customerTicketsStatus, customerMobile, customerEmail }) => {

    const [CustomerTicketList, SetCustomerTicketList] = useState([]);
    const [statusID, setStatusID] = useState(customerTicketsStatus);
    const [loading, setLoading] = useState(false);


    const history = useHistory();
    useEffect(() => {
        const handleGetSearchTicket = (customerTicketsStatus, customerMobile, customerEmail) => {
            setLoading(true);
            axios({
                method: "post",
                url: config.apiUrl + "/Search/GetTicketsOnSearch",
                headers: authHeader(),
                data: {
                    HeaderStatusId: 1002,
                    ActiveTabId: 2,
                    searchDataByDate: null,
                    searchDataByCustomerType: {
                        CustomerEmailID: customerEmail,
                        CustomerMobileNo: customerMobile,
                        TicketID: 0,
                        TicketStatusID: "102",
                    },
                    searchDataByTicketType: null,
                    searchDataByCategoryType: null,
                    SearchDataByAll: null,
                },
            })
                .then(function (res) {
                    let response = res.data.responseData;
                    if (response != null) {
                        SetCustomerTicketList(response);
                        setLoading(false);
                    } else {
                        setLoading(false);
                    }

                })
                .catch((data) => {
                    console.log(data);
                });
        }

        if (customerTicketsStatus !== null) {
            handleGetSearchTicket(customerTicketsStatus, customerMobile, customerEmail)
            //setStatusID(customerTicketsStatus);
        }
    }, [customerTicketsStatus, customerMobile, customerEmail])

    const HandleRowClickPage = (id, sourceType) => {
        // closeModel();
        // closeCustomerDetailsModal();
        // if (window.localStorage.getItem('Programcode') === 'campusshoes') {
        if (window.localStorage.getItem('isTicketInNewTab') === "true") {
            window.open('./myticket?ticketDetailID=' + id + '&sourceName=' + sourceType
                + '&screenName=ticketsystem'
            )
        }
        history.push({
            pathname: "myticket",
            ticketDetailID: id,
            sourceName: sourceType,
        });
    };

    return (
        <div>

            <div className="padding-div">
                <label className="openTciketLbl customerTickets_tabletitle">
                    {customerTicketsStatus === "" ? "Total Ticket" : "Open Ticket"} :{" "}
                    {CustomerTicketList.length}
                </label>
                {/* <img
                      src={CancelImg}
                      alt="CancelImg"
                      className="curshar-pointer flot-calcel"
                      onClick={closeModel}
                  /> */}
                <hr />
                <div className="row customerTickets_tableheader">
                    <div className="col-md-3">
                        <label className="modal-lbl1">
                            Ticket ID
                        </label>
                    </div>
                    <div className="col-md-3">
                        <label className="modal-lbl1">
                            Ticket Title
                        </label>
                    </div>
                </div>
                <div className='customerTicketModal'>
                    {loading === true ? (
                        <div className="loader-icon"></div>
                    ) : (CustomerTicketList.length > 0
                        ? CustomerTicketList.map(
                            (item, index) => {
                                return (
                                    <div>
                                        <div className="row opn-ticketDiv">
                                            <div className="col-md-3">
                                                <label
                                                    className="no-mdl"
                                                    onClick={() => HandleRowClickPage(item.ticketID, item.ticketSourceType)}
                                                >
                                                    {item.ticketID}
                                                </label>
                                            </div>
                                            <div className="col-md-7 row">
                                                <label className="modal-lbl2 ">
                                                    {item.message.substring(0, item.message.indexOf('-'))}

                                                </label>
                                            </div>
                                        </div>
                                        <hr />
                                    </div>
                                );
                            }
                        )
                        : <div className='row '>
                            <div className='col-sm-12' style={{ textAlign: 'center' }}>No Tickets found !!!</div>
                        </div>)}
                </div>
            </div>

        </div>
    )
}

export default OpenTicket