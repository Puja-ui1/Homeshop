
import React, { Component, useEffect, useState } from "react";
import ReactTable from "react-table";
import { Link } from "react-router-dom";
import loaderGif from "../../../assets/Images/loader.gif";
import DelBigIcon from "../../../assets/Images/del-big.png";
import redDelBox from "../../../assets/Images/del-search.png";
import pencil from "../../../assets/Images/pencil.png";
import add from "../../../assets/Images/addplus.jpg";
import minus from "../../../assets/Images/minusblack.png";
import facebookblack from "../../../assets/Images/facebookblackw.png";
import instablack from "../../../assets/Images/instablack.png";
import fb from '../../../assets/Images/FB.png';
import instaa from '../../../assets/Images/instagram.png';
import gr from '../../../assets/Images/googleReview.png';
import twit from '../../../assets/Images/twitter.png';
import dropdwnimg from "../../../assets/Images/dropdown3.png";
import '../../../assets/css/settings.css'
import { authHeader } from "../../../helpers/authHeader";
import axios from "axios";
import config from "../../../helpers/config";
import { NotificationManager } from "react-notifications";
import PopupLink from "../Ticketing/Popup.js"

const SocialChannel = () => {

    const [opendropdown, setopendropdown] = useState(false);
    const [select, setselect] = useState("Select Social Channel");
    const [dropdwn, setdropdwn] = useState("");
    const [dropdownGetList, setdropdownGetList] = useState([]);
    const [radioGetlistdata, setradioGetlistdata] = useState([]);
    const [sourceIdDrp, setsourceIdDrp] = useState(0);
    const [intergrationIDDrp, setintergrationIDDrp] = useState(0);
    const [setLoader, setsetLoader] = useState(false);
    const [loader, setloader] = useState(false);
    const [listOfFacebookPage, setlistOfFacebookPage] = useState([]);
    const [listOfInstagramPage, setlistOfInstagramPage] = useState([]);
    const [deleteLoader, setdeleteLoader] = useState(false);
    const [selectedIndex, setselectedIndex] = useState(-1);
    const [urldata, seturldata] = useState("");
    const [localupdate, setlocalupdate] = useState(window.localStorage.getItem("updatedkey"))
    useEffect(() => {
        handleGetDropDownChannelList();
        handleListOfConnectedPage();
        handleListOfConnectedInstaPage();
    }, [window.localStorage.getItem("updatedkey")])
    const handledrop = () => {
        setopendropdown(!opendropdown);
    };
    const handleList = (e) => {
        debugger
        setselect(e.sourceName)
        setopendropdown(false)
        setdropdwn(e.sourceName)
        setsourceIdDrp(e.sourceID)
        setintergrationIDDrp(e.integrationTypeID)
        // setLoader(false)
        handleTypeOfIntergrationData();

        if (e.sourceName === "Facebook") {
            handleLoginFaceBookOthertab();
            handleListOfConnectedPage();
            // window.localStorage.setItem("updatedkey", JSON.stringify("updatedkeynew"))

        }
        if (e.sourceName === "Instagram") {
            handleLoginInstaGramOthertab()
            handleListOfConnectedInstaPage()

        }

    }
    const handleGetDropDownChannelList = () => {

        axios({
            method: "GET",
            url: config.apiUrl + "/SocialIntegration/GetSocialChannelList",
            headers: authHeader(),
        })
            .then(function (res) {
                if (res.data.statusCode === 200) {
                    setdropdownGetList(res.data.responseData)


                } else {
                    setdropdownGetList([])

                }
            })
            .catch((error) => console.log(error));


    }
    const handleTypeOfIntergrationData = () => {

        axios({
            method: "GET",
            url: config.apiUrl + "/SocialIntegration/GetSocialIntegrationTypeList",
            headers: authHeader(),
        })
            .then(function (res) {
                if (res.data.statusCode === 200) {
                    setradioGetlistdata(res.data.responseData)


                } else {
                    setradioGetlistdata([])

                }
            })
            .catch((error) => console.log(error));

    }
    const handleUpdateSocialChannelIntergration = () => {
        debugger
        setloader(true)
        const params = {
            channelSourceID: sourceIdDrp,
            integrationTypeID: intergrationIDDrp
        };
        axios({
            method: "POST",
            url: config.apiUrl + "/SocialIntegration/SetSocialChannelIntegrationType",
            headers: authHeader(),
            params: params
        }).then(function (res) {
            if (res.data.statusCode === 200) {
                setloader(false);
                NotificationManager.success("SetSocialChannel Successfully");
            }
            else {
                NotificationManager.error("SetSocialChannel Failed")
                setloader(false)
            }
        })
            .catch((error) => {
                setloader(false);

                console.log(error)
            });
    }
    const handleLoginFaceBookOthertab = () => {

        debugger
        axios({
            method: "GET",
            url: config.apiUrlsocial + "/Facebook/Login",
            headers: authHeader(),
            params: {
                source: config.url + "/admin/facebookRedirect"
            }

        })
            .then(function (res) {
                let statusCode = res.data.response_Code
                let opendata = res.data.data
                if (statusCode === 200) {
                    debugger
                    seturldata(opendata)
                }
                else {
                    NotificationManager.error("Network Error")
                    seturldata("")
                }
            })
            .catch((e) => { console.log(e) })

    }
    const handleLoginInstaGramOthertab = () => {

        axios({
            method: "GET",
            url: config.apiUrlsocial + "/Instagram/Login",
            headers: authHeader(),
            params: {
                source: config.url + "/admin/instagramRedirect"
            }

        })
            .then(function (res) {
                let statusCode = res.data.response_Code
                let opendata = res.data.data
                if (statusCode === 200) {
                    debugger
                    seturldata(opendata)

                }
                else {
                    NotificationManager.error("Network Error")
                    seturldata("")
                }
            })
            .catch((e) => { console.log(e) })

    }
    const handleListOfConnectedPage = () => {


        let programCode = window.localStorage.getItem("Programcode");

        axios({
            method: "POST",
            url: config.apiUrlsocial + "/Facebook/GetConnectedPages",
            // headers: authHeader(),
            data: {
                programCode: programCode
            }

        }).then(function (res) {
            if (res.data.response_Code === 200) {
                setlistOfFacebookPage(res.data.data);
                window.localStorage.removeItem("updatedkey");
            }
            else {
                //NotificationManager.error("SetSocialChannel Failed")
                setlistOfFacebookPage([])


            }



        })
            .catch((error) => {
                setLoader(false)

                console.log(error)
            });

    }
    const handleListOfConnectedInstaPage = () => {


        let programCode = window.localStorage.getItem("Programcode");

        axios({
            method: "POST",
            url: config.apiUrlsocial + "/Instagram/GetConnectedPages",
            // headers: authHeader(),
            data: {
                programCode: programCode
            }

        }).then(function (res) {
            if (res.data.response_Code === 200) {
                setlistOfInstagramPage(res.data.data)
            }
            else {
                //NotificationManager.error("SetSocialChannel Failed")
                setlistOfInstagramPage([])
            }
        })
            .catch((error) => {
                setLoader(false)

                console.log(error)
            });

    }
    const handleDeletePageFacebook = (e, index) => {
        debugger

        let iddelete = e.id
        setdeleteLoader(true)
        setselectedIndex(index)

        axios({
            method: "POST",
            url: config.apiUrlsocial + "/Facebook/UnsubscribePage",
            headers: authHeader(),
            data: {
                pageId: iddelete
            }

        }).then((res) => {
            if (res.data.response_Code === 200) {
                NotificationManager.success("UnsubscribePage Successfully ")
                setdeleteLoader(false);
                handleListOfConnectedPage();
            }
            else {
                NotificationManager.error("UnsubscribePage Failed")
            }
        })
            .catch((error) => {
                console.log(error)
            });

    }
    const handleDeletePageInstagram = (e, index) => {
        debugger

        let iddelete = e.id
        setdeleteLoader(true)
        setselectedIndex(index)

        axios({
            method: "POST",
            url: config.apiUrlsocial + "/Instagram/UnsubscribePage",
            headers: authHeader(),
            data: {
                pageId: iddelete
            }

        }).then((res) => {
            if (res.data.response_Code === 200) {
                NotificationManager.success("UnsubscribePage Successfully ")
                setdeleteLoader(false);
                handleListOfConnectedInstaPage();
            }
            else {
                NotificationManager.error("UnsubscribePage Failed")
            }
        })
            .catch((error) => {
                console.log(error)
            });

    }
    const handleButton = () => {

        setselect("Select")
        setdropdwn("Select")

    }

    return (
        <>
            <div className="container-fluid setting-title setting-breadcrumb">
                <Link to="settings" className="header-path">
                    Settings
                </Link>
                <span>&gt;</span>
                <Link to="settings" className="header-path">
                    Ticketing
                </Link>
                <span>&gt;</span>
                <Link className="active header-path">
                    Social
                    Channel
                </Link>

            </div>
            <div className="backgroundGradient">
                <div className="drp-animation">
                    <div className="col-md-3 ">
                        <div className="oneBoxCol">

                            <div className="drp-div d-flex" onClick={handledrop}  >

                                <span> {select}</span>
                                <span>
                                    <img className="arrow_head" src={dropdwnimg} alt="Down_arrow" />
                                </span>
                            </div>
                            {opendropdown &&
                                <ul className="drpdwnUL">
                                    <div className="list_collection">
                                        {
                                            dropdownGetList.map((e, i) => {
                                                return (
                                                    <li key={i} onClick={() => handleList(e)}>
                                                        {e.sourceName === "Facebook" && <img src={fb} style={{ marginRight: "5px", width: "20px" }} />}
                                                        {e.sourceName === "GoogleReview" && <img src={gr} style={{ marginRight: "5px", width: "20px" }} />}
                                                        {e.sourceName === "Instagram" && <img src={instaa} style={{ marginRight: "5px", width: "20px" }} />}
                                                        {e.sourceName === "Twitter" && <img src={twit} style={{ marginRight: "5px", width: "20px" }} />}

                                                        {e.sourceName}</li>

                                                )
                                            })
                                        }


                                    </div>
                                </ul>
                            }





                        </div>

                    </div>

                    <div class="image-container">
                        <img src={fb} class="spin" style={{ width: "20px" }} />
                        <img src={gr} class="spin" style={{ width: "20px" }} />
                        <img src={instaa} class="spin" style={{ width: "20px" }} />
                        <img src={twit} class="spin" style={{ width: "20px" }} />
                    </div>

                </div>

                <div className="container-fluid px-4">


                    {
                        dropdwn === "GoogleReview" &&
                        <div className="container-fluid store-settings-cntr settingtable">
                            <div className="googleReviewSC ">
                                <div className="headerGR">
                                    <h3>
                                        Google Review

                                    </h3>
                                    <div className="addsub">
                                        <img src={add} alt="add" />
                                        <img src={minus} alt="minus" />

                                    </div>

                                </div>
                                {/* <div className=" addsub">
                                    <img src={pencil} alt="" />
                                    <img src={DelBigIcon} alt="" className="" />

                                </div> */}


                            </div>
                            <div className="info-setting">
                                <div className="radiolablecontainer">
                                    <div className="radiolabel">
                                        <input type="radio" name="check" value="directapi" />
                                        <label for="directapi">Direct API</label>
                                    </div>
                                    <div className="radiolabel">
                                        <input type="radio" value="partnerapi" name="check" />
                                        <label for="partnerapi">Partner API</label>
                                    </div>
                                </div>
                            </div>
                            <div className="formgrp">
                                <div className="subfrm">
                                    <label>
                                        Account ID
                                    </label>
                                    <div>
                                        <input type="text" placeholder=" Account ID" />
                                    </div>
                                </div>
                                <div className="subfrm">
                                    <label>
                                        Access Token
                                    </label>
                                    <div>
                                        <input type="text" placeholder="Access Token" />
                                    </div>
                                </div>
                                <div className="subfrm">
                                    <label>
                                        Client ID
                                    </label>
                                    <div>
                                        <input type="text" placeholder="Client ID" />
                                    </div>
                                </div>
                                <div className="subfrm">
                                    <label>
                                        Client Secret
                                    </label>
                                    <div>
                                        <input type="text" placeholder="Client Secret" />
                                    </div>
                                </div>
                            </div>
                            <div className="frmBtn">
                                <div>
                                    <button>
                                        Save
                                    </button>
                                    <button>
                                        Add More

                                    </button>

                                </div>

                            </div>
                        </div>
                    }

                    {
                        dropdwn === "Facebook" &&
                        <div className="container-fluid store-settings-cntr ">

                            <div className="googleReviewSC ">
                                <div className="headerGR">
                                    <h3>
                                        Facebook Page

                                    </h3>
                                    {/* <div className="addsub">
                                            <img src={add} alt="add" onClick={this.handleplus} />
                                            <img src={minus} alt="minus" onClick={this.handleminus} />

                                        </div> */}

                                </div>
                                {/* <div className=" addsub">
                                    <img src={pencil} alt="" />
                                    <img src={DelBigIcon} alt="" className="" />

                                </div> */}


                            </div>

                            <div className="info-setting">
                                <div className="radiolablecontainer">
                                    {radioGetlistdata.map((e, i) => {
                                        return (
                                            <div className="radiolabel" key={i}>
                                                <input type="radio" name="check" value={e.integrationTypeID} checked={e.integrationTypeID} />
                                                <label for="directapi">{e.integrationTypeName}</label>
                                            </div>

                                        )
                                    })}
                                </div>
                            </div>
                            {
                                radioGetlistdata[0]?.integrationTypeName === "Partner"
                                &&
                                <div className="formgrp">
                                    <div className="subfrm">
                                        <label>
                                            Account ID
                                        </label>
                                        <div>
                                            <input type="text" placeholder=" Account ID" />
                                        </div>
                                    </div>
                                    <div className="subfrm">
                                        <label>
                                            Access Token
                                        </label>
                                        <div>
                                            <input type="text" placeholder="Access Token" />
                                        </div>
                                    </div>
                                    <div className="subfrm">
                                        <label>
                                            Client ID
                                        </label>
                                        <div>
                                            <input type="text" placeholder="Client ID" />
                                        </div>
                                    </div>
                                    <div className="subfrm">
                                        <label>
                                            Client Secret
                                        </label>
                                        <div>
                                            <input type="text" placeholder="Client Secret" />
                                        </div>
                                    </div>
                                </div>
                            }

                            {
                                radioGetlistdata[0]?.integrationTypeName === "Embeded Signup"
                                &&
                                // <div>

                                // </div>


                                <div className="embededapi">
                                    <button className="gradient-facebook" onClick={() => { handleButton() }}  >
                                        <PopupLink url={urldata} windowName="popUp" windowSize="width=600,height=100vh">

                                            <img src={facebookblack} className="imgfc" />
                                            Facebook
                                        </PopupLink>

                                    </button>

                                </div>



                            }
                            <div className="tableWidthPage">
                                <span className="mb-3">Connected Page Name:</span>

                                <ReactTable
                                    rowsText="No data found"
                                    pageSize={listOfFacebookPage?.length}
                                    data={listOfFacebookPage}
                                    columns={[

                                        {
                                            Header: (
                                                <span className="historyTable-header">

                                                    Name
                                                </span>
                                            ),
                                            accessor: "name",
                                        },
                                        {
                                            Header: (
                                                <span className="historyTable-header">
                                                    Action
                                                </span>
                                            ),
                                            accessor: "Action",
                                            Cell: (row) => {
                                                let originalrow = row.original
                                                let indexrow = row.index
                                                return (
                                                    <div>
                                                        {deleteLoader && selectedIndex === row.index ? <img src={loaderGif} alt="img" style={{ width: "20px" }} /> : <img src={redDelBox} onClick={() => { handleDeletePageFacebook(originalrow, indexrow) }} style={{ cursor: "pointer" }} />}

                                                    </div>
                                                )
                                            }

                                        },
                                    ]}
                                    showPagination={false}
                                />
                            </div>

                            <div className="frmBtn">
                                <div>
                                    <button onClick={() => { handleUpdateSocialChannelIntergration() }}>
                                        {
                                            loader ? <img src={loaderGif} alt="img" style={{ width: "20px" }} /> : "Save"
                                        }

                                    </button>
                                    {/* <button>
                                        Add More
                                    </button> */}

                                </div>

                            </div>





                        </div>
                    }

                    {dropdwn === "Instagram" && <div className="container-fluid store-settings-cntr settingtable">
                        <div className="googleReviewSC ">
                            <div className="headerGR">
                                <h3>
                                    Instagram

                                </h3>
                                {/* <div className="addsub">
                                        <img src={add} alt="add" onClick={this.handleplus} />
                                        <img src={minus} alt="minus" onClick={this.handleminus} />

                                    </div> */}

                            </div>
                            {/* <div className=" addsub">
                                <img src={pencil} alt="" />
                                <img src={DelBigIcon} alt="" className="" />

                            </div> */}


                        </div>

                        <div className="info-setting">
                            <div className="radiolablecontainer">
                                {radioGetlistdata.map((e, i) => {
                                    return (
                                        <div className="radiolabel" key={i}>
                                            <input type="radio" name="check" value={e.integrationTypeID} checked={e.integrationTypeID} />
                                            <label for="directapi">{e.integrationTypeName}</label>
                                        </div>

                                    )
                                })}
                            </div>

                        </div>
                        {radioGetlistdata[0]?.integrationTypeName === "Partner"
                            &&
                            <div className="formgrp">
                                <div className="subfrm">
                                    <label>
                                        Account ID
                                    </label>
                                    <div>
                                        <input type="text" placeholder=" Account ID" />
                                    </div>
                                </div>
                                <div className="subfrm">
                                    <label>
                                        Access Token
                                    </label>
                                    <div>
                                        <input type="text" placeholder="Access Token" />
                                    </div>
                                </div>
                                <div className="subfrm">
                                    <label>
                                        Client ID
                                    </label>
                                    <div>
                                        <input type="text" placeholder="Client ID" />
                                    </div>
                                </div>
                                <div className="subfrm">
                                    <label>
                                        Client Secret
                                    </label>
                                    <div>
                                        <input type="text" placeholder="Client Secret" />
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            radioGetlistdata[0]?.integrationTypeName === "Embeded Signup"
                            &&

                            <div className="embededapi">
                                <button className="gradientinsta" onClick={() => { handleButton() }}>
                                    <PopupLink url={urldata} windowName="popUp" windowSize="width=600,height=100vh" >

                                        <img src={instablack} className="imgfc" />
                                        Instagram
                                    </PopupLink>
                                </button>
                            </div>



                        }
                        <div className="tableWidthPage">
                            <span className="mb-3">Connected Page Name:</span>

                            <ReactTable
                                rowsText="No data found"
                                pageSize={listOfInstagramPage?.length}
                                data={listOfInstagramPage}
                                columns={[

                                    {
                                        Header: (
                                            <span className="historyTable-header">

                                                Page Name
                                            </span>
                                        ),
                                        accessor: "name",
                                    },
                                    {
                                        Header: (
                                            <span className="historyTable-header">
                                                Action
                                            </span>
                                        ),
                                        accessor: "Action",
                                        Cell: (row) => {
                                            let originalrow = row.original
                                            let indexrow = row.index
                                            return (
                                                <div>
                                                    {deleteLoader && selectedIndex === row.index ? <img src={loaderGif} alt="img" style={{ width: "20px" }} /> : <img src={redDelBox} onClick={() => { handleDeletePageInstagram(originalrow, indexrow) }} style={{ cursor: "pointer" }} />}

                                                </div>
                                            )
                                        }

                                    },

                                ]}
                                showPagination={false}
                            />
                        </div>

                        <div className="frmBtn">
                            <div>
                                <button onClick={() => { handleUpdateSocialChannelIntergration() }}>
                                    {
                                        loader ? <img src={loaderGif} alt="img" style={{ width: "20px" }} /> : "Save"
                                    }

                                </button>
                            </div>
                        </div>


                    </div>}

                </div>

            </div>


        </>
    )
}
// class SocialChannel extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             opendropdown: false,
//             select: "Select Social Channel",
//             dropdwn: "",
//             dropdownGetList: [],
//             radioGetlistdata: [],
//             sourceIdDrp: 0,
//             intergrationIDDrp: 0,
//             setLoader: false,
//             plusminus: false,
//             listOfFacebookPage: [],
//             listOfInstagramPage: [],
//             deleteLoader: false,
//             selectedIndex: -1,
//             urldata: "",
//             prevState: ""

//             // socialModal: false,



//         }

//     }
//     componentDidMount = () => {
//         window.localStorage.setItem("updatedkey", JSON.stringify(""))
//         this.handleGetDropDownChannelList();
//     }
//     // componentDidUpdate(prevProps, prevState) {
//     //     // Get the previous value of localStorage
//     //     const prevLocalStorageValue = JSON.parse(prevState.localStorageValue);

//     //     // Get the current value of localStorage
//     //     const currentLocalStorageValue = JSON.parse(localStorage.getItem('updatedkey'));
//     //     console.log("currentLocalStorageValue",currentLocalStorageValue)

//     //     // Compare the previous and current values of localStorage
//     //     // if (prevLocalStorageValue !== currentLocalStorageValue) {
//     //     //     // localStorage value has changed, perform some action
//     //     //     console.log('localStorage updated!');
//     //     // }
//     // }
//     handledrop = () => {
//         let self = this
//         self.setState({
//             opendropdown: !self.state.opendropdown
//         })
//     }
//     handleList = (e) => {
//         debugger
//         let self = this
//         self.setState({
//             dropdwn: e.sourceName,
//             select: e.sourceName,
//             opendropdown: false,
//             sourceIdDrp: e.sourceID,
//             intergrationIDDrp: e.integrationTypeID,
//             loader: false,
//             // plusminus: true


//         })
//         this.handleTypeOfIntergrationData();
//         if (e.sourceName === "Facebook") {
//             this.handleLoginFaceBookOthertab();
//             this.handleListOfConnectedPage()
//         }
//         if (e.sourceName === "Instagram") {
//             this.handleLoginInstaGramOthertab()
//             this.handleListOfConnectedInstaPage()
//         }

//     }
//     handleGetDropDownChannelList = () => {
//         let self = this;
//         axios({
//             method: "GET",
//             url: config.apiUrl + "/SocialIntegration/GetSocialChannelList",
//             headers: authHeader(),
//         })
//             .then(function (res) {
//                 if (res.data.statusCode === 200) {

//                     self.setState({
//                         dropdownGetList: res.data.responseData,

//                     })
//                 } else {
//                     self.setState({
//                         dropdownGetList: [],

//                     });
//                 }
//             })
//             .catch((error) => console.log(error));


//     }
//     handleTypeOfIntergrationData = () => {
//         let self = this;
//         axios({
//             method: "GET",
//             url: config.apiUrl + "/SocialIntegration/GetSocialIntegrationTypeList",
//             headers: authHeader(),
//         })
//             .then(function (res) {
//                 if (res.data.statusCode === 200) {

//                     self.setState({
//                         radioGetlistdata: res.data.responseData,

//                     })
//                 } else {
//                     self.setState({
//                         radioGetlistdata: [],

//                     });
//                 }
//             })
//             .catch((error) => console.log(error));

//     }
//     handleUpdateSocialChannelIntergration = () => {
//         let self = this
//         self.setState({
//             loader: true
//         })
//         axios({
//             method: "POST",
//             url: config.apiUrl + "/SocialIntegration/SetSocialChannelIntegrationType",
//             headers: authHeader(),
//             params: {
//                 channelSourceID: self.state.sourceIdDrp,
//                 integrationTypeID: self.state.intergrationIDDrp
//             }
//         }).then(function (res) {
//             if (res.data.statusCode === 200) {
//                 NotificationManager.success("SetSocialChannel Successfully")
//                 self.setState({
//                     loader: false
//                 })

//             }
//             else {
//                 NotificationManager.error("SetSocialChannel Failed")
//                 self.setState({
//                     loader: false
//                 })

//             }



//         })
//             .catch((error) => {
//                 self.setState({
//                     setLoader: false
//                 })
//                 console.log(error)
//             });
//     }
//     handleLoginFaceBookOthertab = () => {
//         let self = this
//         debugger
//         axios({
//             method: "GET",
//             url: "https://qa-api-socialconnector.ercx.co/api/Facebook/Login",
//             headers: authHeader(),
//             params: {
//                 source: "https://qa-ui-belltktqa.shopster.live/admin/facebookRedirect"
//             }

//         })
//             .then(function (res) {
//                 let statusCode = res.data.response_Code
//                 let opendata = res.data.data
//                 if (statusCode === 200) {
//                     debugger
//                     self.setState({
//                         urldata: opendata,
//                     })
//                 }
//                 else {
//                     NotificationManager.error("Network Error")
//                 }
//             })
//             .catch((e) => { console.log(e) })

//     }
//     handleLoginInstaGramOthertab = () => {
//         let self = this
//         debugger
//         axios({
//             method: "GET",
//             url: "https://qa-api-socialconnector.ercx.co/api/Instagram/Login",
//             headers: authHeader(),
//             params: {
//                 source: "https://qa-ui-belltktqa.shopster.live/admin/instagramRedirect"
//             }

//         })
//             .then(function (res) {
//                 let statusCode = res.data.response_Code
//                 let opendata = res.data.data
//                 if (statusCode === 200) {
//                     debugger
//                     self.setState({
//                         urldata: opendata

//                     })

//                 }
//                 else {
//                     NotificationManager.error("Network Error")
//                 }
//             })
//             .catch((e) => { console.log(e) })

//     }
//     handleListOfConnectedPage = () => {

//         let self = this
//         let programCode = window.localStorage.getItem("Programcode");

//         axios({
//             method: "POST",
//             url: "https://qa-api-socialconnector.ercx.co/api/Facebook/GetConnectedPages",
//             // headers: authHeader(),
//             data: {
//                 programCode: programCode
//             }

//         }).then(function (res) {
//             if (res.data.response_Code === 200) {
//                 self.setState({
//                     listOfFacebookPage: res.data.data
//                 })

//             }
//             else {
//                 //NotificationManager.error("SetSocialChannel Failed")
//                 self.setState({
//                     listOfFacebookPage: []
//                 })

//             }



//         })
//             .catch((error) => {
//                 self.setState({
//                     setLoader: false
//                 })
//                 console.log(error)
//             });

//     }
//     handleListOfConnectedInstaPage = () => {

//         let self = this
//         let programCode = window.localStorage.getItem("Programcode");

//         axios({
//             method: "POST",
//             url: "https://qa-api-socialconnector.ercx.co/api/Instagram/GetConnectedPages",
//             // headers: authHeader(),
//             data: {
//                 programCode: programCode
//             }

//         }).then(function (res) {
//             if (res.data.response_Code === 200) {
//                 self.setState({
//                     listOfInstagramPage: res.data.data
//                 })

//             }
//             else {
//                 //NotificationManager.error("SetSocialChannel Failed")
//                 self.setState({
//                     listOfInstagramPage: []
//                 })

//             }



//         })
//             .catch((error) => {
//                 self.setState({
//                     setLoader: false
//                 })
//                 console.log(error)
//             });

//     }
//     handleDeletePageFacebook = (e, index) => {
//         debugger
//         let self = this
//         let iddelete = e.id
//         self.setState({
//             deleteLoader: true,
//             selectedIndex: index,

//         })
//         axios({
//             method: "POST",
//             url: "https://qa-api-socialconnector.ercx.co/api/Facebook/UnsubscribePage",
//             headers: authHeader(),
//             data: {
//                 pageId: iddelete
//             }

//         }).then((res) => {
//             if (res.data.response_Code === 200) {

//                 NotificationManager.success("UnsubscribePage Successfully ")
//                 self.setState({
//                     deleteLoader: false
//                 })
//                 self.handleListOfConnectedPage()
//             }
//             else {
//                 NotificationManager.error("UnsubscribePage Failed")
//             }
//         })
//             .catch((error) => {
//                 console.log(error)
//             });

//     }


//     render() {
//         return (
//             <>
//                 <div className="container-fluid setting-title setting-breadcrumb">
//                     <Link to="settings" className="header-path">
//                         Settings
//                     </Link>
//                     <span>&gt;</span>
//                     <Link to="settings" className="header-path">
//                         Ticketing
//                     </Link>
//                     <span>&gt;</span>
//                     <Link className="active header-path">
//                         Social
//                         Channel
//                     </Link>

//                 </div>
//                 <div className="backgroundGradient">
//                     <div className="drp-animation">
//                         <div className="col-md-3 ">
//                             <div className="oneBoxCol">

//                                 <div className="drp-div d-flex" onClick={this.handledrop}  >

//                                     <span> {this.state.select}</span>
//                                     <span>
//                                         <img className="arrow_head" src={dropdwn} alt="Down_arrow" />
//                                     </span>
//                                 </div>
//                                 {this.state.opendropdown &&
//                                     <ul className="drpdwnUL">
//                                         <div className="list_collection">
//                                             {
//                                                 this.state.dropdownGetList.map((e, i) => {
//                                                     return (
//                                                         <li key={i} onClick={() => this.handleList(e)}>
//                                                             {e.sourceName === "Facebook" && <img src={fb} style={{ marginRight: "5px", width: "20px" }} />}
//                                                             {e.sourceName === "GoogleReview" && <img src={gr} style={{ marginRight: "5px", width: "20px" }} />}
//                                                             {e.sourceName === "Instagram" && <img src={instaa} style={{ marginRight: "5px", width: "20px" }} />}
//                                                             {e.sourceName === "Twitter" && <img src={twit} style={{ marginRight: "5px", width: "20px" }} />}

//                                                             {e.sourceName}</li>

//                                                     )
//                                                 })
//                                             }


//                                         </div>
//                                     </ul>
//                                 }





//                             </div>

//                         </div>

//                         <div class="image-container">
//                             <img src={fb} class="spin" style={{ width: "20px" }} />
//                             <img src={gr} class="spin" style={{ width: "20px" }} />
//                             <img src={instaa} class="spin" style={{ width: "20px" }} />
//                             <img src={twit} class="spin" style={{ width: "20px" }} />
//                         </div>

//                     </div>

//                     <div className="container-fluid px-4">


//                         {
//                             this.state.dropdwn === "GoogleReview" &&
//                             <div className="container-fluid store-settings-cntr settingtable">
//                                 <div className="googleReviewSC ">
//                                     <div className="headerGR">
//                                         <h3>
//                                             Google Review

//                                         </h3>
//                                         <div className="addsub">
//                                             <img src={add} alt="add" />
//                                             <img src={minus} alt="minus" />

//                                         </div>

//                                     </div>
//                                     {/* <div className=" addsub">
//                                     <img src={pencil} alt="" />
//                                     <img src={DelBigIcon} alt="" className="" />

//                                 </div> */}


//                                 </div>
//                                 <div className="info-setting">
//                                     <div className="radiolablecontainer">
//                                         <div className="radiolabel">
//                                             <input type="radio" name="check" value="directapi" />
//                                             <label for="directapi">Direct API</label>
//                                         </div>
//                                         <div className="radiolabel">
//                                             <input type="radio" value="partnerapi" name="check" />
//                                             <label for="partnerapi">Partner API</label>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="formgrp">
//                                     <div className="subfrm">
//                                         <label>
//                                             Account ID
//                                         </label>
//                                         <div>
//                                             <input type="text" placeholder=" Account ID" />
//                                         </div>
//                                     </div>
//                                     <div className="subfrm">
//                                         <label>
//                                             Access Token
//                                         </label>
//                                         <div>
//                                             <input type="text" placeholder="Access Token" />
//                                         </div>
//                                     </div>
//                                     <div className="subfrm">
//                                         <label>
//                                             Client ID
//                                         </label>
//                                         <div>
//                                             <input type="text" placeholder="Client ID" />
//                                         </div>
//                                     </div>
//                                     <div className="subfrm">
//                                         <label>
//                                             Client Secret
//                                         </label>
//                                         <div>
//                                             <input type="text" placeholder="Client Secret" />
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="frmBtn">
//                                     <div>
//                                         <button>
//                                             Save
//                                         </button>
//                                         <button>
//                                             Add More

//                                         </button>

//                                     </div>

//                                 </div>
//                             </div>
//                         }

//                         {
//                             this.state.dropdwn === "Facebook" &&
//                             <div className="container-fluid store-settings-cntr ">

//                                 <div className="googleReviewSC ">
//                                     <div className="headerGR">
//                                         <h3>
//                                             Facebook Page

//                                         </h3>
//                                         {/* <div className="addsub">
//                                             <img src={add} alt="add" onClick={this.handleplus} />
//                                             <img src={minus} alt="minus" onClick={this.handleminus} />

//                                         </div> */}

//                                     </div>
//                                     {/* <div className=" addsub">
//                                     <img src={pencil} alt="" />
//                                     <img src={DelBigIcon} alt="" className="" />

//                                 </div> */}


//                                 </div>

//                                 <div className="info-setting">
//                                     <div className="radiolablecontainer">
//                                         {this.state.radioGetlistdata.map((e, i) => {
//                                             return (
//                                                 <div className="radiolabel" key={i}>
//                                                     <input type="radio" name="check" value={e.integrationTypeID} checked={e.integrationTypeID} onClick={() => { this.handleRadioButton(e) }} />
//                                                     <label for="directapi">{e.integrationTypeName}</label>
//                                                 </div>

//                                             )
//                                         })}
//                                     </div>
//                                 </div>
//                                 {
//                                     this.state.radioGetlistdata[0]?.integrationTypeName === "Partner"
//                                     &&
//                                     <div className="formgrp">
//                                         <div className="subfrm">
//                                             <label>
//                                                 Account ID
//                                             </label>
//                                             <div>
//                                                 <input type="text" placeholder=" Account ID" />
//                                             </div>
//                                         </div>
//                                         <div className="subfrm">
//                                             <label>
//                                                 Access Token
//                                             </label>
//                                             <div>
//                                                 <input type="text" placeholder="Access Token" />
//                                             </div>
//                                         </div>
//                                         <div className="subfrm">
//                                             <label>
//                                                 Client ID
//                                             </label>
//                                             <div>
//                                                 <input type="text" placeholder="Client ID" />
//                                             </div>
//                                         </div>
//                                         <div className="subfrm">
//                                             <label>
//                                                 Client Secret
//                                             </label>
//                                             <div>
//                                                 <input type="text" placeholder="Client Secret" />
//                                             </div>
//                                         </div>
//                                     </div>
//                                 }

//                                 {
//                                     this.state.radioGetlistdata[0]?.integrationTypeName === "Embeded Signup"
//                                     &&

//                                     <PopupLink url={this.state.urldata} windowName="popUp" windowSize="width=600,height=100vh">
//                                         <div className="embededapi">
//                                             <button className="gradient-facebook"   >

//                                                 <img src={facebookblack} className="imgfc" />
//                                                 Facebook

//                                             </button>

//                                         </div>

//                                     </PopupLink>

//                                 }
//                                 <div className="tableWidthPage">
//                                     <span className="mb-3">Connected Page Name:</span>

//                                     <ReactTable
//                                         rowsText="No data found"
//                                         defaultPageSize={5}
//                                         data={this.state.listOfFacebookPage}
//                                         columns={[

//                                             {
//                                                 Header: (
//                                                     <span className="historyTable-header">

//                                                         Name
//                                                     </span>
//                                                 ),
//                                                 accessor: "name",
//                                             },
//                                             {
//                                                 Header: (
//                                                     <span className="historyTable-header">
//                                                         Action
//                                                     </span>
//                                                 ),
//                                                 accessor: "Action",
//                                                 Cell: (row) => {
//                                                     let originalrow = row.original
//                                                     let indexrow = row.index
//                                                     return (
//                                                         <div>
//                                                             {this.state.deleteLoader && this.state.selectedIndex === row.index ? <img src={loaderGif} alt="img" style={{ width: "20px" }} /> : <img src={redDelBox} onClick={() => { this.handleDeletePageFacebook(originalrow, indexrow) }} style={{ cursor: "pointer" }} />}

//                                                         </div>
//                                                     )
//                                                 }

//                                             },
//                                         ]}
//                                         showPagination={false}
//                                     />
//                                 </div>

//                                 <div className="frmBtn">
//                                     <div>
//                                         <button onClick={this.handleUpdateSocialChannelIntergration}>
//                                             {
//                                                 this.state.loader ? <img src={loaderGif} alt="img" style={{ width: "20px" }} /> : "Save"
//                                             }

//                                         </button>
//                                         {/* <button>
//                                         Add More
//                                     </button> */}

//                                     </div>

//                                 </div>





//                             </div>
//                         }

//                         {this.state.dropdwn === "Instagram" && <div className="container-fluid store-settings-cntr settingtable">
//                             <div className="googleReviewSC ">
//                                 <div className="headerGR">
//                                     <h3>
//                                         Instagram

//                                     </h3>
//                                     {/* <div className="addsub">
//                                         <img src={add} alt="add" onClick={this.handleplus} />
//                                         <img src={minus} alt="minus" onClick={this.handleminus} />

//                                     </div> */}

//                                 </div>
//                                 {/* <div className=" addsub">
//                                 <img src={pencil} alt="" />
//                                 <img src={DelBigIcon} alt="" className="" />

//                             </div> */}


//                             </div>

//                             <div className="info-setting">
//                                 <div className="radiolablecontainer">
//                                     {this.state.radioGetlistdata.map((e, i) => {
//                                         return (
//                                             <div className="radiolabel" key={i}>
//                                                 <input type="radio" name="check" value={e.integrationTypeID} checked={e.integrationTypeID} onClick={() => { this.handleRadioButton(e) }} />
//                                                 <label for="directapi">{e.integrationTypeName}</label>
//                                             </div>

//                                         )
//                                     })}
//                                 </div>

//                             </div>
//                             {this.state.radioGetlistdata[0]?.integrationTypeName === "Partner"
//                                 &&
//                                 <div className="formgrp">
//                                     <div className="subfrm">
//                                         <label>
//                                             Account ID
//                                         </label>
//                                         <div>
//                                             <input type="text" placeholder=" Account ID" />
//                                         </div>
//                                     </div>
//                                     <div className="subfrm">
//                                         <label>
//                                             Access Token
//                                         </label>
//                                         <div>
//                                             <input type="text" placeholder="Access Token" />
//                                         </div>
//                                     </div>
//                                     <div className="subfrm">
//                                         <label>
//                                             Client ID
//                                         </label>
//                                         <div>
//                                             <input type="text" placeholder="Client ID" />
//                                         </div>
//                                     </div>
//                                     <div className="subfrm">
//                                         <label>
//                                             Client Secret
//                                         </label>
//                                         <div>
//                                             <input type="text" placeholder="Client Secret" />
//                                         </div>
//                                     </div>
//                                 </div>
//                             }

//                             {
//                                 this.state.radioGetlistdata[0]?.integrationTypeName === "Embeded Signup"
//                                 &&
//                                 <PopupLink url={this.state.urldata} windowName="popUp" windowSize="width=600,height=100vh" >
//                                     <div className="embededapi">
//                                         <button className="gradientinsta">

//                                             <img src={instablack} className="imgfc" />
//                                             Instagram
//                                         </button>
//                                     </div>

//                                 </PopupLink>

//                             }
//                             <div className="tableWidthPage">
//                                 <span className="mb-3">Connected Page Name:</span>

//                                 <ReactTable
//                                     rowsText="No data found"
//                                     defaultPageSize={5}
//                                     data={this.state.listOfInstagramPage}
//                                     columns={[

//                                         {
//                                             Header: (
//                                                 <span className="historyTable-header">

//                                                     Page Name
//                                                 </span>
//                                             ),
//                                             accessor: "name",
//                                         },

//                                     ]}
//                                     showPagination={false}
//                                 />
//                             </div>

//                             <div className="frmBtn">
//                                 <div>
//                                     <button onClick={this.handleUpdateSocialChannelIntergration}>
//                                         {
//                                             this.state.loader ? <img src={loaderGif} alt="img" style={{ width: "20px" }} /> : "Save"
//                                         }

//                                     </button>
//                                 </div>
//                             </div>


//                         </div>}

//                     </div>

//                 </div>


//             </>
//         )
//     }
// }
export default SocialChannel;