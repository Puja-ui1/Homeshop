import React, { useCallback, useEffect, useState } from "react";
import '../assets/css/chatbot.css';
import { handleGetAgentChatHistory } from "../Services/ChatbotServices";
import ReactPaginate from 'react-paginate';
import CancelImg from "./../assets/Images/cancel.png";

const HistoricalChat = () => {
    const [historicalChatLoading, setisHistoricalChatLoading] = useState(false);
    const [historicalData, sethistoricalData] = useState([]);
    const [loader, setLoader] = useState(false)
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 10;



    useEffect(() => {
        handleGetAgentChatHistory(setisHistoricalChatLoading, sethistoricalData);
    }, []);

    useEffect(() => {
        setTotalPages(Math.ceil(historicalData.length / itemsPerPage));
    }, [historicalData]);

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const subset = historicalData.slice(startIndex, endIndex);

    const handlePageChange = (selectedPage) => {

        setLoader(true)

        setCurrentPage(selectedPage.selected);
        setLoader(false)
    };

    return (
        <div className="historical_tbl_wrapper">
            <div className="Historical_title">
                <label className="historical_title_lbl">My Historical Chat</label>
            </div>
            <div>
                {historicalChatLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <table className="historical_tbl_content">
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
                                {subset.length > 0 ? (
                                    subset.map((chat, index) => (
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
                        <div className="paginationmyHistorybox">
                            <ReactPaginate
                                previousLabel={"<"}
                                nextLabel={">"}
                                pageCount={totalPages}
                                onPageChange={handlePageChange}
                                forcePage={currentPage}
                                breakLabel={"..."}
                                containerClassName={"paginationmyHistorybox"}
                                activeClassName={"active-page"}
                            />
                        </div>
                    </div>
                )}
            </div>


            <div className=" hist_chat_content_wrapper">
                <div className="chat_content">

                    <div className="chat_history_title">
                        <label>
                            {"Chat On June 25 12:33:33 PM"}
                        </label>
                        <div>
                            <img src={CancelImg} alt="cancel_img" className="close_icon" />
                        </div>


                    </div>

                    <div className="history_chat_arrange">
                        <div className="chat_history_content d-flex p-3">

                            <label className="icon">VS</label>
                            <div className="chat_trail_content">
                                <div className="chat_trail_chat">
                                    <span>Hey</span>
                                </div>
                                <span className="chat_trail_time">28th June 2024 10:52:45 AM</span>
                            </div>

                            <label className="icon">VS</label>
                            <div className="chat_trail_content">
                                <div className="chat_trail_chat">
                                    <span>Hii</span>
                                </div>
                                <span className="chat_trail_time">28th June 2024 10:52:45 AM</span>
                            </div>

                        </div>

                    </div>



                </div>


            </div>
        </div>
    );
};

export default HistoricalChat;
