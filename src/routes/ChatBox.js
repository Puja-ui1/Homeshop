import React, { useEffect, useState } from "react";
import '../assets/css/chatbot.css'
import axios from "axios";
import config from "../helpers/config";
import { authHeader } from "../helpers/authHeader";
import RecentChat from "./RecentChat";
import CurrentChat from "./CurrentChat";
import Modal from "react-responsive-modal";
import CancelImg from "./../assets/Images/cancel.png";

import { handleBanCustomer, handleGetAgentRecentChat, handleGetChatMessagesList } from "../Services/ChatbotServices";
import leftBackArrowIcon from "../assets/Images/black-left-arrow.png";
import SearchBlackImg from "./../assets/Images/searchBlack.png";
import headphoneIcon from "../assets/Images/headphone2.png";
import ReactPaginate from 'react-paginate';
import ChatService from "../Services/ChatService";
import { NotificationManager } from "react-notifications";
const chatService = new ChatService()


const ChatBox = ({ isHistoricalChat, setIsHistoricalChat, customerID, id, pageNumberCurrentChat, messageData, setmessageData, customerName, UserName, CustomerOpenTicketList, setCustomerOpenTicketList, mobileNo, customerEmail, customerTotalTickets, customerOpenTickets, AgentID ,sAgentId,programCode ,sourceType ,setisScrollMessage ,isScrollMessage ,isCallChatMessgaeApi ,setisCallChatMessgaeApi}) => {
    //debugger
    const [activeTab, setActiveTab] = useState('current')
    const [agentRecentChatData, setagentRecentChatData] = useState([])
    const [recentChatLoader, setrecentChatLoader] = useState(false)
    const [transferChat, settransferChat] = useState(false)
    const [openTransferChat, setopenTransferChat] = useState(false)
    const[openBanVisitor ,setOpenBanVisitor] = useState(false)
    const [agentData, setAgentData] = useState([]);
    const [filteredAgentData, setFilteredAgentData] = useState([]);
    const [TargatedAgentName, setTargatedAgentName] = useState("");
    const [TargatedAgentEmail, setTargatedAgentEmail] = useState("");
    const [TargatedAgentDesignation, setTargatedAgentDesignation] = useState("");
    const[isAgentFilterApplied ,setisAgentFilterApplied] = useState(false)
    const[banReasonData ,setbanReasonData] = useState([])
    const[banCustomerData ,setbanCustomerData] = useState([])
    const[CreateAndEndChat ,setCreateAndEndChat] =useState(false)
    const[selectedBanReason ,setselectedBanReason] = useState(0)
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const itemsPerPage = 3;

  
    useEffect(()=>{
        handleGetBanReasonList()
    },[])
    useEffect(() => {
        setTotalPages(Math.ceil(filteredAgentData.length / itemsPerPage));
    }, [filteredAgentData]);

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const agent_data_Subset = filteredAgentData.slice(startIndex, endIndex);
    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };


    const handleTabClick = (tab) => {
        setActiveTab(tab);
        if (tab === "recent") {
            handleGetAgentRecentChat(customerID, setagentRecentChatData, setrecentChatLoader);
        }
        else {
            handleGetChatMessagesList(id, 0, false, pageNumberCurrentChat, setmessageData ,setisScrollMessage)
        }
    };

    useEffect(() => {
        if (activeTab === 'recent') {
            handleGetAgentRecentChat(customerID, setagentRecentChatData, setrecentChatLoader);
        }
        console.log("render")
    }, [activeTab, customerID]);
    // useEffect(() => {

    // }, [activeTab])

    console.log(agentRecentChatData, "agentRecentChatData");
    console.log("messageData", messageData)

    const handleTransferAgent = () => {
        console.log("trasferclicked")
        setopenTransferChat(true)

    }

    const closeTransferChat = () => {
        setopenTransferChat(false)
    }
    
    const handleGetAgentList = () => {
        chatService.Post("/CustomerChat/GetAgentListAll")
            .then((response) => {
                const message = response.message;
                const agentData = response.responseData;
                if (message === "Success" && agentData) {
                    window.localStorage.setItem("AgentList", JSON.stringify(agentData));
                    setAgentData(agentData);
                    setFilteredAgentData(agentData);
                } else {
                    setAgentData([]);
                    setFilteredAgentData([]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

      useEffect(() => {
       console.log("agentMount")
        handleGetAgentList();
      }, [TargatedAgentName, TargatedAgentEmail, TargatedAgentDesignation]);


     const handleAgentName =(e) =>{
        let agentName = e.target.value;
        setTargatedAgentName(agentName)
     }
     const handleAgentDesignation =(e) => {
        let agentDesignation = e.target.value;
        setTargatedAgentDesignation(agentDesignation)

     }
     const handleAgentEmail =(e) => {
        let agentEmail = e.target.value;
        setTargatedAgentEmail(agentEmail)
     }

     const handleBanVisitor = () => {
        setOpenBanVisitor(true)
     }
     const closeBanVisitor = () =>{
        setOpenBanVisitor(false)
     }
     //search handler 
     const handleSearchAgent = () => {
        if (
            TargatedAgentEmail.length > 0 ||
            TargatedAgentDesignation.length > 0 ||
            TargatedAgentName.length > 0
        ) {
            let filteredData = agentData;

            if (TargatedAgentName.length > 0) {
                filteredData = filteredData.filter((x) =>
                    x.agentName.toUpperCase().includes(TargatedAgentName.toUpperCase())
                );
            }
            if (TargatedAgentEmail.length > 0) {
                filteredData = filteredData.filter((x) =>
                    x.agentEmail.toLowerCase().includes(TargatedAgentEmail.toLowerCase())
                );
            }
            if (TargatedAgentDesignation.length > 0) {
                filteredData = filteredData.filter((x) =>
                    x.agentDesignation.toUpperCase().includes(TargatedAgentDesignation.toUpperCase())
                );
            }

            setFilteredAgentData(filteredData);
            setisAgentFilterApplied(true);
        } else {
            NotificationManager.error("Input is required for search");
            setisAgentFilterApplied(false);
        }
    };
     const handleClearbtn =()=> {
        
        setisAgentFilterApplied(false)
        setTargatedAgentName("")
        setTargatedAgentDesignation("")
        setTargatedAgentEmail("")
        
      }
    
    const handleBanReason = (e) => {
        let value = parseInt(e.target.value);
        console.log("banvalue" , value)
        setselectedBanReason(value)
      };

    const handleGetBanReasonList = () =>  {
      
        axios({
          method: "post",
          url: config.apiUrl + "/CustomerChat/GetBanReasonList",
          headers: authHeader(),
        })
          .then(function (res) {
            let data = res.data.responseData;
            setbanReasonData(data)
          })
          .catch((data) => {
            console.log(data);
          });
      }
    
    const  handleConfirmBanVisitor = () =>{
    
       handleBanCustomer(id,selectedBanReason,setbanCustomerData ,setOpenBanVisitor);
    
      }

    //   create ticket and end chat

 
    //   handleCreateEndChatMdlClose= () => {
    //     setCreateAndEndChat(false)
    //   }

     const handleCreateEndChat =  () => {
        setCreateAndEndChat(true)
     } 

     const handleEndChat = () =>{
        setIsHistoricalChat(null)
     }
    return (
        <>
            {isHistoricalChat === 'chat' ?
                <>


                    <div className="chatbox_header_wrap ">
                        <div className="chatbox_btn">
                            <h4 className={`mr-2  nav_link ${activeTab === 'current' ? 'nav_link_current' : ''}`} onClick={() => handleTabClick("current")}>Current Chat</h4>
                            <h4 className={`nav_link ${activeTab === 'recent' ? 'nav_link_recent' : ''} `} onClick={() => handleTabClick("recent")}>Recent Chat(0)</h4>
                        </div>
                        <div className="chatbox_action_wrap">
                            {activeTab === 'current' && (
                                <div className="dropdown">
                                    <button className="btn dropdown-toggle" type="button" data-toggle="dropdown">Action
                                        <span className="caret"></span>
                                    </button>
                                    <ul className="dropdown-menu ">
                                        <li className="mb-2" onClick={handleTransferAgent}><a href="#">Transfer to Agent/Supervisor</a></li>
                                        <li><a href="#"  onClick={handleBanVisitor}>Ban Visitor</a></li>
                                        <li><a href="#" onClick={handleEndChat}>End Chat </a></li>
                                        <li><a href="#" onClick={handleCreateEndChat}>End Chat & Create Ticket</a></li>

                                    </ul>
                                </div>
                            )}
                            <button className="close_btn" onClick={() => setIsHistoricalChat('')}>X</button>
                        </div>

                        <Modal open={openTransferChat} modalId="TransferChat" onClose={closeTransferChat}>
                            <div className="TransferChat_wrapper">
                                <div className="TransferChat_div">
                                    <div className="TransferChat_Header">
                                        <div className="heading_img">
                                            <h5>
                                                <img src={leftBackArrowIcon} className="back_arrow" onClick={closeTransferChat} />
                                                <b>TRANSFER CHAT TO</b>

                                            </h5>

                                        </div>
                                        <div >
                                            <img src={SearchBlackImg} className="search_icon" />

                                        </div>

                                    </div>

                                    <div>
                                        <input type="text" className="add_values" placeholder="Agent Name" value ={TargatedAgentName} onChange={handleAgentName} />
                                    </div>
                                    <div>
                                        <input type="text" className="add_values" placeholder="Email" value={TargatedAgentEmail} onChange={handleAgentEmail} />
                                    </div>

                                    <div>
                                        <input type="text" className="add_values" placeholder="Designation" value={TargatedAgentDesignation} onChange={handleAgentDesignation}/>
                                    </div>

                                    <div className="transferchat_btn">
                                        <button className="transferchat_srch_btn" onClick={handleSearchAgent}>SEARCH</button>

                                        <div className="transferchat_clr_btn" onClick={handleClearbtn}>
                                            <p>
                                                CLEAR
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                       <div className="tbl_transferchat_div">
                                       <table className="transferchat_tbl_content">
                                            <thead>
                                                <tr>
                                                    <th>Agent</th>
                                                    <th>Designation</th>
                                                    <th>Email Id</th>

                                                </tr>
                                            </thead>
                                            {isAgentFilterApplied === true?(
                                            <tbody className="tbl_data">
                                             {agent_data_Subset.length>0 && agent_data_Subset.map((item,index)=>(
                                                <tr>
                                                <td>
                                                    <img
                                                    src={headphoneIcon}
                                                    alt="headphone" className="Agent_headphone_circle"/>{item.agentName}</td>
                                                <td>{item.agentDesignation}
</td>
                                                <td>{item.agentEmail}</td>

                                            </tr>
                                             ))}
                                              </tbody>
                                           ):(<tbody className="tbl_data">
                                           {agent_data_Subset.length>0 && agent_data_Subset.map((item,index)=>(
                                              <tr>
                                              <td>
                                                  <img
                                                  src={headphoneIcon}
                                                  alt="headphone" className="Agent_headphone_circle"/>{item.agentName}</td>
                                              <td>{item.agentDesignation}
</td>
                                              <td>{item.agentEmail}</td>

                                          </tr>
                                           ))}
                                            </tbody>) }
                                                



                                           
                                        </table>
                                       </div>

                                        <div >
                                            <button className="tarnsfer_chat_btn">
                                                TRANSFER CHAT
                                            </button>
                                        </div>
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



                                </div>

                            </div>

                        </Modal>

                        <Modal open ={openBanVisitor} modalId="BanVisitor" onClose ={closeBanVisitor}>
                        <div className="Banvisitor_wrapper">
                                  <div className="BanVisitor_header">
                                    <div className="Banvisitor_Title">
                                      <p>Ban Visitor</p>
                                    </div>
                                    <div>
                                      <img src={CancelImg}  alt="banMdlCloseIcon" onClick={closeBanVisitor} />
                                    </div>
                                  </div>
                                  <div className="banVisitor_Content">
                                    <div className="banVisitor_Title">
                                      <h5>
                                        Are you sure you want to ban this
                                        visitor ?
                                      </h5>
                                    </div>
                                    <div className="banvisitor_Drop_down">
                                      <select className="drp_down_select" onClick={handleBanReason}>
                                          <option value="0">
                                          Select reason of ban
                                        </option>
                                        {banReasonData !== null &&
                                          banReasonData.map(
                                            (item, i) => (
                                              <option key={i}  value={item.banReasonID}>
                                              {item.banReasonName}
                                              </option>
                                            )
                                          )}
                                      </select>
                                    </div>
                                    <div className="confirm_banvisitor_btn_div">
                                      <div>
                                        <button className="search_btn" onClick={handleConfirmBanVisitor} >
                                          CONFIRM
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            
                        </Modal>

                       
                    </div>



                    {activeTab === 'current' ? <CurrentChat messageData={messageData} customerName={customerName} UserName={UserName} customerID={customerID} CustomerOpenTicketList={CustomerOpenTicketList} setCustomerOpenTicketList={setCustomerOpenTicketList} mobileNo={mobileNo} customerEmail={customerEmail}
                        customerTotalTickets={customerTotalTickets}
                        customerOpenTickets={customerOpenTickets} id={id}
                        AgentID={AgentID} 
                        sAgentId= {sAgentId} 
                        programCode= {programCode}
                        sourceType = {sourceType}
                        setmessageData = {setmessageData}
                        isScrollMessage ={isScrollMessage}
                        isCallChatMessgaeApi ={isCallChatMessgaeApi} 
                        setisCallChatMessgaeApi = {setisCallChatMessgaeApi} 
                        pageNumberCurrentChat = {pageNumberCurrentChat} 
                        CreateAndEndChat = {CreateAndEndChat} 
                        setCreateAndEndChat ={setCreateAndEndChat}/>
                        : <RecentChat agentRecentChatData={agentRecentChatData} recentChatLoader={recentChatLoader} />}


                </> :
                <></>

            }

        </>
    )

}

export default ChatBox