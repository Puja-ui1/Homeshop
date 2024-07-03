import Modal from "react-responsive-modal";
import { CKEditor } from "ckeditor4-react";
import React, { useState  ,useRef} from "react";
import CancelImg from "./../assets/Images/cancel.png";
import '../assets/css/chat.css'
import ChatService from "../Services/ChatService";
const chatService =new ChatService()

export const CurrentChat = ({state}) => {

    console.log(state,"state in Current");
    const [CreateTicketMdl, setCreateTicketMdl] = useState(false);
    const[OpenTicketMdl ,setOpenTicketMdl]=useState(false);
    const[customerOpenTickets,setCustomerOpenTickets] = useState(0)
    const[CustomerOpenTicketList , setCustomerOpenTicketList] = useState([])
    


    const handleCreateTicketBtn = () => { };

    console.log(CreateTicketMdl, "CreateTicketMdl");
    

    // function for opening ticket 
    const handleOpenTicketOpn = (customerId) =>{
        let param = {
            customerId: customerId,
          };
        chatService.PostWithParams("/CustomerChat/CustomerOpenTickets", param)
            .then((res) => {
              let msg = res.message;
              let data = res.responseData;
              if (msg === "Success") {
                setCustomerOpenTicketList(data)
                setOpenTicketMdl(true)
              }
            })
            .catch((error) => {
              console.log(error);
            });
            setOpenTicketMdl(true)
    }
     const handleOpenTicketCls = () =>{
        setOpenTicketMdl(false)

    }
    
    
    // function for creating ticket
    const handleCreateTicketModalOpn = () => {
        console.log("1111");
        setCreateTicketMdl(true);
    };

    const handleCreateTicketModalCls = () => {
        setCreateTicketMdl(false);
    };
    console.log(state.customerName,"nameeeeeeeeee");
 

    return (
        <div className="row m-auto">
            <div className="col-md-8">
                <div className="chatcontentDiv">
                    <div className="chat-trail-cntr">
                        <span>{"name"}</span>

                        <div>
                            <div className="chat-tail-chat-cntr">{"hello there "}</div>
                            <span className="chat-trail-time">{"time"}</span>
                        </div>
                    </div>
                </div>

                {/* here add chat box */}
                </div>
                <div className="col-md-4">
                    <div className="chat-user-det">
                        <div>
                            <div className="d-flex">
                                <p className="chat-user-name">{state.customerName}</p>
                            </div>
                            <div className="chat-user-num col-lg-12 px-0">
                                <span className="col-lg-4 pl-0">+91-{state.customerNumber}</span>
                                <span>|</span>
                                <span className="col-lg-6 pr-0">{state.customerEmail}</span>
                            </div>
                        </div>

                        <div>
                            <div className="price-tic d-flex">
                                <div>
                                    <label className="blue-clr font-weight-bold">{state.customerTotalTickets}</label>
                                    <p>Total Tickets</p>
                                </div>

                                <div>
                                    <label className="blue-clr font-weight-bold" onClick={handleOpenTicketOpn}>{state.customerOpenTickets}</label>
                                    <p>Open Ticket</p>
                                </div>
                                {/* modal for open ticket  */}
                                <Modal open={OpenTicketMdl}
                                      onClose={handleOpenTicketCls}
                                      closeIconId="close"
                                      modalId="createTicketModal"
                                      overlayId="logout-ovrly">

                                        <div className="padding-div">
                                        <label className="openTciketLbl">
                                          Open Ticket :{" "}
                                          {customerOpenTickets}
                                        </label>
                                        <img
                                          src={CancelImg}
                                          alt="CancelImg"
                                          className="curshar-pointer flot-calcel"
                                          onClick={handleOpenTicketCls}
                                        />
                                        <hr />
                                        <div className="row">
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
                                       
                                          
                                       
                                      </div>

                                </Modal>
                            </div>
                            <button
                                className="butn mt-3 w-100"
                                onClick={handleCreateTicketModalOpn}
                            >
                                Create Ticket
                            </button>

                            {/* create ticket modal */}

                            <Modal
                               open={CreateTicketMdl}
                               onClose={handleCreateTicketModalCls}
                               center
                               closeIconId="close"
                               modalId="CreateCustomer-mdl"
                               overlayId="logout-ovrly"

                            >
                                <div className="mdlcancleImg">
                                      <img
                                        src={CancelImg}
                                        alt="CancelImg"
                                        className="curshar-pointer"
                                        onClick={handleCreateTicketModalCls}
                                      />
                                    </div>
                                <div className="mainDiv-crt">
                                    <div className="lbl-mdlHeader">
                                        <label className="lbl-customerMdl">Customer Details</label>
                                        <label className="lbl-sourceChat">
                                            Source :<span className="lbl-customerMdl"> Chat</span>
                                        </label>
                                    </div>

                                    <div className="row chat-mdlMargin">
                                        <div className="col-md-4">
                                            <label className="mdl-lbl">Name</label>
                                            <input
                                                type="text"
                                                className="chat-txt1 txt-border"
                                                placeholder="Enter Name"
                                                maxLength={25}
                                                defaultValue={"customerName"}
                                                name="customerName"
                                            />
                                        </div>

                                        <div className="col-md-4">
                                            <label className="mdl-lbl">Mobile</label>
                                            <input
                                                type="text"
                                                className="chat-txt1 txt-border"
                                                placeholder="Enter Mobile No"
                                                maxLength={10}
                                                value={"mobileNo"}
                                                disabled
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <label className="mdl-lbl">Email</label>
                                            <input
                                                type="text"
                                                className="chat-txt1 txt-border"
                                                placeholder="Enter Email Id"
                                                maxLength={100}
                                                defaultValue={"TicketEmail"}
                                            />
                                        </div>
                                    </div>

                                    <div className="row chat-mdlMargin">
                                        <div className="col-md-4">
                                            <label>Brand</label>
                                            <select
                                                id="inputStatus"
                                                className="drop-downlist-mdl dropdown-chat"
                                            >
                                                <option value={0}>{"Select"}</option>
                                            </select>
                                        </div>

                                        <div className="col-md-4">
                                            <label className="mdl-lbl">Category</label>
                                            <select
                                                id="inputStatus"
                                                className="drop-downlist-mdl dropdown-chat"
                                            >
                                                <option value={0}>{"Select"}</option>
                                            </select>
                                        </div>

                                        <div className="col-md-4">
                                            <label className="mdl-lbl">Ticket Title</label>
                                            <input
                                                type="text"
                                                className="chat-txt1 txt-border"
                                                placeholder="Enter Ticket Title"
                                                maxLength={100}
                                            />
                                        </div>
                                    </div>

                                    <div className="row chat-mdlMargin">
                                        <div className="col-md-4">
                                            <label className="mdl-lbl">Sub Category</label>
                                            <select
                                                id="inputStatus"
                                                className="drop-downlist-mdl dropdown-chat"
                                            >
                                                <option value={0}>{"Select"}</option>
                                            </select>
                                        </div>
                                        <div className="col-md-4">
                                            <label className="mdl-lbl">Issue Type</label>
                                            <select
                                                id="inputStatus"
                                                className="drop-downlist-mdl dropdown-chat"
                                            >
                                                <option value={0}>{"Select"}</option>
                                            </select>
                                        </div>
                                    </div>
                                        <div className="row chat-mdlMargin">
                                            <div className="col-md-12">
                                                <label className="mdl-lbl">Ticket Details</label>
                                                <textarea
                                                    rows="6"
                                                    className="text-areaChatModel"
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="row chat-mdlMargin chatbtnDiv">
                                            <div className="col-md-12">
                                                <span
                                                    className="chatAnchor"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={handleCreateTicketModalCls}
                                                >
                                                    CANCEL
                                                </span>
                                                <button
                                                    type="button"
                                                    className="chatbutn-2"
                                                    onClick={handleCreateTicketBtn}
                                                >
                                                    CREATE TICKET
                                                </button>
                                            </div>
                                        </div>
                                    
                                </div>
                            </Modal>


                        </div>
                    </div>
                </div>
            
            </div>
            );
};
