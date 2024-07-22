import CKEditor from "ckeditor4-react";
import React, { useEffect, useState ,useRef} from "react";
import io from 'socket.io-client';
import { socket } from '../helpers/SocketConnection';
import AttachmentIcon from "../assets/Images/attachmentIcon.png";
import Dropzone from "react-dropzone";
import Assign from "../assets/Images/sent-icon.svg";
//import { Modal } from "react-bootstrap";
import Modal from "react-responsive-modal";
import CancelImg from "./../assets/Images/cancel.png";
import { Button } from "react-bootstrap";
// import { CKEditorError } from "ckeditor5";
import axios from "axios";
import config from "../helpers/config";
import { authHeader } from "../helpers/authHeader";


import ChatService from "../Services/ChatService";
import { handleGetBrandList, handleGetChatMessagesList } from "../Services/ChatbotServices";
import { NotificationManager } from "react-notifications";
const chatService = new ChatService()


const CurrentChat = ({ messageData, customerName, UserName, customerID, setCustomerOpenTicketList, CustomerOpenTicketList, mobileNo, customerEmail, customerTotalTickets, customerOpenTickets, isScrollMessage, id, AgentID, sAgentId, programCode, sourceType, setmessageData, isCallChatMessgaeApi, setisCallChatMessgaeApi, pageNumberCurrentChat, CreateAndEndChat,setCreateAndEndChat ,handleEndChat}) => {

    console.log("messageDataaaaaaaaaaaaaaaaaaaaaaaaaa", messageData)
    const [open, setOpen] = useState(false)
    const [openTicket, setOpenTickets] = useState(false)
    const [brandData, setbrandData] = useState([])
    const [selectedCategory, setselectedCategory] = useState("")
    const [selectedCategoryName, setselectedCategoryName] = useState("")
    const [selectedSubCategory, setselectedSubCategory] = useState("")
    const [selectedIssueTypeName, setselectedIssueTypeName] = useState("")
    const [selectedIssueType, setselectedIssueType] = useState("")
    const [selectedBrand, setselectedBrand] = useState("")
    const [categoryData, setcategoryData] = useState([])
    const [subCategoryData, setsubCategoryData] = useState([])
    const [TicketTitle, setTicketTitle] = useState("")
    const [issueTypeData, setissueTypeData] = useState([])
    const [TicketEmail, setTicketEmail] = useState("")
    const [isValidEmail, setisValidEmail] = useState(true)
    const [TicketDescription, setTicketDescription] = useState("")
    const [AttachementFiles, setAttachementFiles] = useState([])
    const [openAttachmentPopUp, setopenAttachmentPopUp] = useState(false)
    const [message, setmessage] = useState("")
    const [ckeditorAdd, setckeditorAdd] = useState("")
    const [TicketCreated , setTicketCreated] = useState(false)
    const[categoryCompulsion , setcategoryCompulsion] = useState("")
    const[subCategoryCompulsion , setsubCategoryCompulsion] =useState("")
    const[issueTypeCompulsion ,setissueTypeCompulsion] = useState("")
    const[brandCompulsion , setbrandCompulsion] = useState("")
    // const newMessage = socket.on('SendToWebbotReplyV2'){

    // }
    useEffect(() => {
        handleGetBrandList()

    }, [])

    // useEffect(() => {
    //     // Mock function to simulate receiving new messages
    //     const receiveNewMessage = (newMessage) => {
    //       setMessageData((prevMessages) => [...prevMessages, newMessage]);
    //     },[messageData]);

    //  useEffect(() => {
    //     //debugger
    //     if (messageData && messageData.length > 0 ) {
    //         const chatContainer = document.getElementsByClassName('chat_content_box');
    //         chatContainer.scrollTop = chatContainer.scrollHeight+30;
    //     }
    // }, [messageData]);

    //const chatContainerRef = useRef(null);

    // useEffect(() => {
    //     debugger
    //     // Scroll to the bottom of the chat when new messages are added
      
    //     if (chatContainerRef.current) {
    //         chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    //     }
    // }, [messageData]);

    const handelCreateTicket = () => {
        // debugger
        setOpen(true)
        console.log("open")

    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleFileAttachment = () => {
        setopenAttachmentPopUp(true)
    }

    const handleCloseAttachment = () => {
        setopenAttachmentPopUp(false)
    }
    const handleOpenTicketOpn = (customerId, setCustomerOpenTicketList) => {
        let param = {
            customerId: customerId,
        };
        chatService.PostWithParams("/CustomerChat/CustomerOpenTickets", param)
            .then((res) => {
                let msg = res.message;
                let data = res.responseData;
                if (msg === "Success") {

                    setCustomerOpenTicketList(data)

                    setOpenTickets(true)
                }
            })
            .catch((error) => {
                console.log(error);
            });
        setOpenTickets(true)

    }
    const closeTicket = () => {
        setOpenTickets(false)
    }
    const extractShortName = (name) => {
        console.log(name)
        let iconName = name.split(' ')[0].charAt(0).toUpperCase();
        return iconName
    }

    const extractShortNameOfBoT = (name) => {
        console.log(name);
        const words = name.split(' ');

        // Handle cases where there are fewer than 3 words
        const firstInitial = words[0] ? words[0].charAt(0).toUpperCase() : '';
        const secondInitial = words[1] ? words[1].charAt(0).toUpperCase() : '';
        const thirdInitial = words[2] ? words[2].charAt(0).toUpperCase() : '';

        const iconName = firstInitial + secondInitial + thirdInitial;
        return iconName;
    };


    // create ticket form value handlers 

    const settingTicketEmail = (e) => {
        let TicketEmailvalue = e.currentTarget.value;
        //const emailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
        const emailRegex = new RegExp("^(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})?$")

        const isEmailPattern = emailRegex.test(TicketEmailvalue)
        if (isEmailPattern) {

            setTicketEmail(TicketEmailvalue)
            setisValidEmail(true)
        }
        else {
            setisValidEmail(false)
        }
    };
//create ticket api call and function handler 
 const handleGetBrandList = () => {
        axios({
            method: "post",
            url: config.apiUrl + "/Brand/GetBrandList",
            headers: authHeader(),
        }).then(function (res) {
            let status = res.data.message;
            let data = res.data.responseData;
            // console.log("brandData" , data)
            if (status === "Success") {
                setbrandData(data)

            } else {
                setbrandData([])
            }
        });
    }

    const handleGetCategoryList = (brandID) => {

        var brandId;
        if (brandID) {
            brandId = brandID;
        } else {
            brandId = selectedBrand;
        }
        console.log("selectedBrand", selectedBrand)
        axios({
            method: "post",
            url: config.apiUrl + "/Category/GetCategoryList",
            headers: authHeader(),
            params: {
                BrandID: brandId,
            },
        })
            .then(function (res) {
                let data = res.data;
                if (data !== null) {
                    setcategoryData(data)

                } else {
                    setcategoryData([])
                }
            })
            .catch((data) => {
                console.log(data);
            });
    }

    const handleGetSubCategoryList = () => {

        axios({
            method: "post",
            url: config.apiUrl + "/SubCategory/GetSubCategoryByCategoryID",
            headers: authHeader(),
            params: {
                CategoryID: selectedCategory,
            },
        })
            .then(function (res) {
                let data = res.data.responseData;
                setsubCategoryData(data)
                console.log("subCategorydata", data)
            })
            .catch((data) => {
                console.log(data);
            });
    }

    const handleGetIssueType = () => {

        axios({
            method: "post",
            url: config.apiUrl + "/IssueType/GetIssueTypeList",
            headers: authHeader(),
            params: {
                SubCategoryID: selectedSubCategory,
            },
        })
            .then(function (res) {
                let data = res.data.responseData;
                setissueTypeData(data)
            })
            .catch((data) => {
                console.log(data);
            });
    }



    const settingTicketTitle = (e) => {
        let TicketTitlevalue = e.currentTarget.value;
        setTicketTitle(TicketTitlevalue);
    };


    const handleBrandChange = (e) => {
        let value = parseInt(e.target.value);
        setselectedBrand(value);
        setcategoryData([]);
    };

    useEffect(() => {
        if (selectedBrand) {
            handleGetCategoryList(selectedBrand);
        }
    }, [selectedBrand]);

    const handleCategoryChange = (e) => {
        let value = parseInt(e.target.value);
        setselectedCategory(value);
        setsubCategoryData([]);
    };

    useEffect(() => {
        if (selectedCategory) {
            handleGetSubCategoryList(selectedCategory);
        }
    }, [selectedCategory]);

    const handleSubCategoryChange = (e) => {
        let value = parseInt(e.target.value);
        setselectedSubCategory(value);
        setissueTypeData([]);
    };

    useEffect(() => {
        if (selectedSubCategory) {
            handleGetIssueType(selectedSubCategory);
        }
    }, [selectedSubCategory]);

    const handleIssueTypeChange = (e) => {
        let value = parseInt(e.target.value);
        setselectedIssueType(value)
    };


    const handleCreateTicketButton = () => {
        console.log("Inside handleCreateTicketButton");
        setTicketCreated(true)
        if (mobileNo.length > 0 && selectedCategory > 0 && selectedSubCategory > 0 && selectedIssueType > 0 && selectedBrand > 0) {
                
            let inputParams = {
                ChatID: id,
                UserID: AgentID,
                EmailID: TicketEmail,
                Category: selectedCategory.toString(),
                SubCategory: selectedSubCategory.toString(),
                IssueType: selectedIssueType.toString(),
                CustomerID: customerID,
                CustomerMobileNumber: mobileNo,
                Brand: selectedBrand.toString(),
                Priority: "2",
                TicketTitle: TicketTitle,
                TicketDescription: TicketDescription,
                customerName: customerName
            };
            axios({
                method: "post",
                url: config.apiUrl + "/HSChatTicketing/CreateChatTicket",
                headers: authHeader(),
                data: inputParams,
            })
                .then(function (res) {

                    console.log("handleCreateTicketButton response");
                    let Msg = res.data.message;
                    if (Msg === "Success") {
                        NotificationManager.success("Ticket Create successfully.");

                        setOpen(false)
                       

                        // if (self.state.closeChatWithticketCreation) {
                        //   self.handleUpdateStoreManagerChatStatus(3);
                        // }


                    }

                    setselectedBrand("")
                    setselectedCategory("")
                    setselectedIssueType("")
                    setselectedSubCategory("")
                    if(TicketCreated){
                        console.log("inside create end chat")
                        handleEndChat()
                        setTicketCreated(false)
                    }

                    
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        else {
            
            setcategoryCompulsion("Category field is compulsory.")
            setsubCategoryCompulsion("Sub Category field is compulsory.")
            setissueTypeCompulsion("Issue Type field is compulsory.")
            setbrandCompulsion("Brand field is compulsary")

            console.log("else case ")
            
        }




    }

    const handelmessageScrollDiv = (element) => {
        let chatBox = document.getElementsByClassName("chat_content_box")[0];
        let topOff = chatBox.scrollTop;
        let heightOffvar = chatBox.scrollHeight;

        if (topOff === 0) {
            if (isScrollMessage === true && isCallChatMessgaeApi === false) {
                // Save the current scroll height before loading new messages
                let oldScrollHeight = heightOffvar;

                // Call the API to load new messages
                setisCallChatMessgaeApi(true);
                handleGetChatMessagesList(id, 0, true, 1, (newMessages) => {
                    // After loading new messages, calculate the new scroll position
                    chatBox.scrollTop = chatBox.scrollHeight - oldScrollHeight;

                    setmessageData((prevMessages) => [...newMessages, ...prevMessages]);

                    setisCallChatMessgaeApi(false);
                });
            }
        }
    };


    // const handleFileUploading = () => {
    //     document.getElementById('file_attach').click(); 
    //     console.log("doc selected " , document.getElementById('file_attach').click() )
    //   };

    const handleFileChange = (event) => {
        console.log("eventselectedfiles", event)
        const files = event.target.files;
        setAttachementFiles(files)

        console.log('Selected files:', files);

    };
    console.log("AttachementFiles", AttachementFiles[0]?.name);
    
    const handleAutoCorrection = () => {
        handlesendmsg(message)

    }

    const handlesendmsg = (Message) => {
        console.log("12345")
        var dataObj = {};
        if (AttachementFiles.length === 0) {
            console.log("12345555")

            dataObj = {
                HeaderToken: authHeader()["X-Authorized-Token"],
                ImageURL: "",
                MessageData: Message,
                MobileNo: mobileNo,
                ProgramCode: programCode,
                Source: sourceType,
                StoreCode: "",
                StoreMgr_ID: sAgentId,
                WhatsAppMessage: "",
                appVersion: "2.0",
                appointmentData: null,
                attachmentData: null,
                cardItem: null,
                chatId: id,
                isAppointment: false,
                isAttachment: false,
                isFromAgent: true,
                isSuccess: true,
                message: "OK",
                sentAt: new Date().getMonth() +
                    1 +
                    "/" +
                    new Date().getDate() +
                    "/" +
                    new Date().getFullYear() +
                    " " +
                    new Date().getHours() +
                    ":" +
                    new Date().getMinutes() +
                    ":" +
                    new Date().getSeconds(),
                userMaster_ID: AgentID,
            };
            
            socket.emit("SendBellReplyV2", dataObj);
            
            console.log("123222245")

            var messagedata = messageData;
            var objMessgage = {};
            objMessgage.isBotReply = false;
            objMessgage.chatDate = "Today";
            objMessgage.chatTime = new Date().toLocaleTimeString();
            objMessgage.byCustomer = false;
            objMessgage.message = Message;
            messagedata.push(objMessgage);

            setckeditorAdd("")
            setmessageData(messagedata)
            setmessage("")
            debugger
            if (messagedata && messagedata.length > 0 ) {
                const chatContainer = document.getElementsByClassName('chat_content_box');
                chatContainer.scrollTop = chatContainer.scrollHeight+30;
            }
           // scrollToBottom()

        }

    }
    
    // const scrollToBottom = () => {
    //     const chatContainer = document.querySelector('.chat_content_box');
    //     if (chatContainer) {
    //         const lastChild = chatContainer.lastElementChild;
    //         if (lastChild) {
    //             lastChild.scrollIntoView({ behavior: 'smooth', block: 'end' });
    //         }
    //     }
    // };
    
    
     

    const handelCKEditorChange = (evt) => {
        var newContent = evt.editor.getData();
        setmessage(evt.editor.getData().replaceAll("&nbsp;", " ")
            .replaceAll("<p>", "")
            .replaceAll("</p>", "")
            .replaceAll(/<strong> /g, "<strong>")
            .replaceAll(/ <strong>/g, " <strong>")
            .replaceAll(/ <\/strong></g, "</strong><")
            .replaceAll(/ <\/strong>/g, "</strong> ")
            .replaceAll(/<\/strong> /g, "</strong> ")
            .replaceAll(/<em> /g, "<em>")
            .replaceAll(/ <em>/g, " <em>")
            .replaceAll(/ <\/em></g, "</em><")
            .replaceAll(/ <\/em>/g, "</em> ")
            .replaceAll(/<\/em> /g, "</em> ")
            .replaceAll(/<s> /g, "<s>")
            .replaceAll(/ <s>/g, " <s>")
            .replaceAll(/ <\/s></g, "</s><")
            .replaceAll(/ <\/s>/g, "</s> ")
            .replaceAll(/<\/s> /g, "</s> "))
        setckeditorAdd(newContent)

    }  

    const handleEndCreateCancel = () => {
        setCreateAndEndChat(false)

    } 
    const handelCreateTicketAndEndChat = () =>{
        
        console.log("inside handelCreateTicketAndEndChat") 
        handelCreateTicket() 
        handleCreateTicketButton()
        console.log("TicketCreated" ,TicketCreated)

       
        

    } 
    const handleEndChatAfterTicket = () =>{
        handleEndChat()
        
    }
    console.log(TicketCreated,"***************");


    console.log(messageData,messageData && messageData.length ,"Inisde CurrentChat");

    return (
        <div className="currentChat_wrapper">
            <div className="row m-0">
                <div className="col-md-8"  id="chat-container">
                    <div  className="chat_content_box" >
                        {messageData && messageData.length > 0 ? (
                            messageData.map((chat, index) => (chat?.byCustomer ? (
                                <div className="chat_msg_content d-flex p-3" key={index}>
                                    <label className="icon">{extractShortName(customerName)}</label>
                                    <div className="chat_trail_content">
                                        <div className="chat_trail_chat">
                                            <span>{chat.message}</span>
                                        </div>
                                        <span className="chat_trail_time">{chat.chatDate + ""} {chat.chatTime}</span>
                                    </div>
                                </div>) : (
                                <div className="chat_msg_content_bot d-flex p-3 justify-content-end" key={index}>

                                    <div className="chat_trail_content_bot">
                                        <div className="chat_trail_chat">
                                            <span>{chat.message}</span>
                                        </div>
                                        <span className="chat_trail_time">{chat.chatDate + " "}{chat.chatTime}</span>
                                    </div>
                                    <label className="icon">{extractShortNameOfBoT(UserName)}</label>
                                </div>)

                            ))

                        ) : (null)

                        }

                    </div>

                    {AttachementFiles && AttachementFiles.length > 0 ? (
                        <button className="Attachment_icon_div" onClick={handleFileAttachment}>{AttachementFiles.length}{"  is Selected."}</button>
                    ) : (<></>)}



                    {CreateAndEndChat === true ? (
                        <div className="create_end_chat">
                            <button className="btn_create_end_chat mr-3" onClick={handleEndChatAfterTicket}> END CHAT </button>
                            <button className="btn_create_end_chat mr-3" onClick={handelCreateTicketAndEndChat}> CREATE TICKET AND END CHAT </button>
                            <button className="btn_create_end_chat mr-3" onClick={handleEndCreateCancel}> CANCEL </button>
                        </div>
                    ) : (<>  </>)}

                    <div className="msg_div">

                        <CKEditor
                            data={ckeditorAdd}
                            onChange={handelCKEditorChange}
                            config={{
                                height: 170,
                                resize_enabled: false,
                                removePlugins: "elementspath",
                                toolbar: [
                                    {
                                        name: "basicstyles",
                                        items: ["Bold", "-", "Italic", "-", "Strike"],
                                    },
                                ],
                            }}

                        />
                        <div className="mobile-ck-tags">
                            <strong>Tags</strong>
                        </div>
                        <div className="attachement_wrap">

                            <img src={AttachmentIcon} alt="attach_img" className="img_attach" />
                            <input id="file_attach" type="file" multiple onChange={handleFileChange} />
                        </div>


                        <div className="mobile-ck-send-btn" title={"Send"}>
                            <img src={Assign} alt="send img" onClick={handleAutoCorrection} />
                        </div>

                    </div>

                </div>



                <div className="col-md-4">
                    <div className="user_details">
                        <div>
                            <div className="user_info_name">
                                <p>{customerName}</p>
                            </div>
                            <div className="user_info_num">
                                <span>{"+91-"}{mobileNo}</span>
                                <span>|</span>
                                <span>{customerEmail}</span>
                            </div>
                        </div>

                        <div className="tickets_wrap d-flex">
                            <div className="tot_tickets">
                                <label className="ticket_no_clr font-weight-bold">
                                    {customerTotalTickets}
                                </label>
                                <p>Total Tickets</p>
                            </div>

                            <div className="open_tickets" >
                                <label className="ticket_no_clr font-weight-bold" onClick={() => handleOpenTicketOpn(customerID, setCustomerOpenTicketList)}>
                                    {customerOpenTickets}
                                </label>
                                <p >Open Ticket </p>
                                <Modal open={openTicket} onClose={closeTicket} modalId="mdl_open_ticket">
                                    <>
                                        <div className="open_ticket_header">
                                            <label className="Source_header">Open Ticket:0</label>
                                            <div>
                                                <img src={CancelImg} alt="cancel_img" className="close_icon" onClick={closeTicket} />
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-md-3 ticketid_title"> TicketId</div>
                                            <div className="col-md-7 row ticketid_title"> Ticket Title</div>
                                        </div>
                                        {CustomerOpenTicketList && CustomerOpenTicketList.length > 0 ? CustomerOpenTicketList.map((item, index) => {

                                            return (
                                                <div key={index}>
                                                    <div className="row">
                                                        <div className="col-md-3 ticketid"> {item.ticketID}
                                                        </div>
                                                        <div className="col-md-7 row tickt_title">{item.ticketTitle}
                                                            <span className="ticket_discript">
                                                                {
                                                                    item.ticketdescription
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>

                                            )

                                        })
                                            : null
                                        }
                                    </>


                                </Modal>
                            </div>
                        </div>
                        <button className="create_ticket_btn" onClick={handelCreateTicket}>Create Ticket</button>
                        <Modal open={open}
                            onClose={handleClose}
                            modalId="Create_ticket">


                            <>
                                <div className="Cancel_img">
                                    <img src={CancelImg} alt="cancel_img" className="close_icon" onClick={handleClose} />
                                </div>

                                <div className="modal_header">
                                    <label className="Customer_header">Customer Details</label>
                                    <label className="Source_header">Source : Chat</label>

                                </div>

                                <div className="row cust_details">
                                    <div className="col-md-4">
                                        <label className="details_lbl">Name</label>
                                        <input className="details_field" type="text" placeholder="Enter Name" defaultValue={customerName} name="customerName"
                                        />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="details_lbl">Mobile</label>
                                        <input className="details_field" type="text" placeholder="Enter Mobile No" value={mobileNo} />
                                    </div>

                                    <div className="col-md-4">
                                        <label className="details_lbl">Email</label>
                                        <input className="details_field" type="text" placeholder="Enter Email id" defaultValue={TicketEmail}

                                            onChange={(e) => settingTicketEmail(e)} />
                                    </div>

                                </div>

                                <div className="row cust_details">
                                    <div className="col-md-4">
                                        <label className="details_lbl">Brand</label>
                                        <select className="optn_select" onChange={handleBrandChange}>
                                            <option>
                                                {"Select"}

                                            </option>

                                            {brandData !== null && brandData.map((item, i) => (

                                                <option key={i} value={item.brandID}>
                                                    {item.brandName}
                                                </option>

                                            ))}
                                        </select>
                                    </div>

                                    <div className="col-md-4">
                                        <label className="details_lbl">Category</label>
                                        <select className="optn_select" onChange={handleCategoryChange}>
                                            <option>
                                                {"Select"}
                                            </option>
                                            {categoryData !== null &&
                                                categoryData.map(
                                                    (item, i) => (
                                                        <option
                                                            key={i}
                                                            value={item.categoryID}

                                                        >
                                                            {item.categoryName}
                                                        </option>
                                                    )
                                                )}

                                        </select>
                                    </div>

                                    <div className="col-md-4">
                                        <label className="details_lbl">Ticket Title</label>
                                        <input className="details_field" type="text" placeholder="Enter Ticket Title" value={TicketTitle} onChange={settingTicketTitle} />
                                    </div>

                                </div>

                                <div className="row cust_details">
                                    <div className="col-md-4">
                                        <label className="details_lbl">Sub Category</label>
                                        <select className="optn_select" onChange={handleSubCategoryChange}>
                                            <option className="handling_dropdown_tickets">
                                                {"Select"}
                                            </option>
                                            {subCategoryData !== null &&
                                                subCategoryData.map(
                                                    (item, i) => (
                                                        <option key={i} value={item.subCategoryID}>

                                                            {item.subCategoryName}
                                                        </option>
                                                    )
                                                )}
                                        </select>
                                    </div>

                                    <div className="col-md-4">
                                        <label className="details_lbl">Issue Type</label>
                                        <select className="optn_select" onChange={handleIssueTypeChange}>
                                            <option>
                                                {"Select"}
                                            </option>
                                            {issueTypeData !== null &&
                                                issueTypeData.map(
                                                    (item, i) => (
                                                        <option key={i} value={item.issueTypeID}>
                                                            {item.issueTypeName}
                                                        </option>
                                                    )
                                                )}
                                        </select>
                                    </div>


                                </div>

                                <div className="row cust_details">
                                    <div className="col-md-12">
                                        <label className="details_lbl">Ticket Details</label>
                                        <textarea ></textarea>
                                    </div>
                                </div>

                                <div className="col-md-12 btn_handle">
                                    <span className="cancel_btn" onClick={handleClose}>
                                        CANCEL
                                    </span>
                                    <button className="create_btn" onClick={handleCreateTicketButton}>
                                        CREATE TICKET
                                    </button>

                                </div>



                            </>

                        </Modal>

                        <Modal open={openAttachmentPopUp} onClose={handleCloseAttachment} modalId="attachment_pop_up">
                            <>
                                <div className="attachment_wrapper">
                                    <div className="attachment_title">
                                        <b>{AttachementFiles.length} {"Attachment"}</b>
                                        <div>
                                            <img src={CancelImg} alt="cancel_img" onClick={handleCloseAttachment} />
                                        </div>
                                    </div>
                                    <div className="file_attached">
                                        {AttachementFiles && AttachementFiles.length > 0 ? (
                                            Object.values(AttachementFiles).map((item, i) => (
                                                <div className="attached_file_details" key={i} >
                                                    <label className="img_attachedfile_title">{item.name}</label>
                                                    <div>
                                                        <img src={CancelImg} alt="cancel_img" className="Attachment_cancel" onClick={() => handleCloseAttachment(item)} />
                                                    </div>
                                                </div>
                                            ))
                                        ) : null}
                                    </div>

                                </div>
                            </>

                        </Modal>


                    </div>
                </div>
            </div>
        </div>



    )

}

export default CurrentChat