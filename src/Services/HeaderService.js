 import axios from "axios";
 import { authHeader } from "../helpers/authHeader";
import config from "../helpers/config";
import moment from "moment";
import { NotificationContainer, NotificationManager } from 'react-notifications';

 
 export const handleLoggedInUserDetails = (state,setState)=>{
    console.log(state,"Inisde hanflelogged")

    console.log("Line 1111")

    axios({
        method: "post",
        url: config.apiUrl + "/DashBoard/LoggedInAccountDetails",
        headers: authHeader(),
    })

        .then((res) => {
            console.log("-----------", res)
            let data = res.data.responseData
            let status = res.data.message
            if (res.status == 200 && status === 'Success') {
                if (data !== null) {
                    window.localStorage.setItem("UserProfile", JSON.stringify(data));
                    if (window.localStorage.getItem("ConvexIVR") !== null) {
                        const oldIvr = JSON.parse(
                            window.localStorage.getItem("ConvexIVR")
                        );
                        // console.log("old ivr" , oldIvr)
                        let ivr = {
                            ...oldIvr,
                            isIVRLogIn: data.isIVRLogIn,
                        };
                        // console.log("if ivr" , ivr)
                        window.localStorage.setItem("ConvexIVR", JSON.stringify(ivr));

                    }
                    var strTag = data.agentName.split(" ");
                    var nameTag = strTag[0].charAt(0).toUpperCase();
                    if (strTag.length > 0) {
                        nameTag += strTag[1].charAt(0).toUpperCase();
                    }
                    console.log("str-----", nameTag)

                    let num = data.loggedInDurationInHours * 60 + data.loggedInDurationInMinutes;
                    let deno = data.shiftDurationInHour * 60 + data.shiftDurationInMinutes;
                    let percentLog = ((num / deno) * 100).toFixed(2);

                    console.log("deno", deno)
                    var profile = data.profilePicture;
                    var finalPath = profile.substring(
                        profile.lastIndexOf("\\") + 1,
                        profile.length
                    );
                    console.log("finalpath", profile)
                    setState({
                        ...state,
                        Email: data.agentEmailId,
                        UserName: data.agentName,
                        LoginTime: data.loginTime,
                        LoggedInDuration: data.loggedInDuration,
                        SLAScore: data.slaScore,
                        CSatScore: data.csatScore,
                        AvgResponse: data.avgResponseTime,
                        LogoutTime: data.logoutTime,
                        NameTag: nameTag,
                        userProfile: finalPath,
                        percentLog,
                        workTime: data.workTimeInPercentage,
                        workTimeHours: data.totalWorkingTime,
                        isIVRLogIn: data.isIVRLogIn,
                        userCsatscore: data.userCSATScore
                    });

                } else {
                    localStorage.clear()
                    window.location.href = '/'
                }
            } else {
                localStorage.clear();
                window.location.href = '/'
            }



        }

        )
        .catch((error) => {
            console.log("data not found", error)

        });
}

 export const handleGetNotificationList = ( setNotifiMessages,setNotiCount) => {
    //const source = axios.CancelToken.source()
    axios({
        method: "post",
        url: config.apiUrl + "/Notification/GetNotifications",
        headers: authHeader(),
    })
        .then((res) => {
            let status = res.data.message;

            if (status === "Success") {
                console.log()
               
                let data = res.data.responseData.ticketNotification;
                let count = res.data.responseData.notiCount;
      

                //console.log("------", data);
                // console.log("000000", count);
                
                    
                setNotifiMessages(data);
                setNotiCount(count);
            }   
            else {
             
                   
                setNotifiMessages([]);
                setNotiCount(0);
               
            }
        })
        .catch((data) => {
            console.log(data);
        });
    // clean up function
   
};

 export const handleGetStatusDropDown = (state,setState) => {
    axios({
        method: "post",
        url: config.apiUrl + "/Master/getTicketStatusList",
        headers: authHeader(),
    })
        .then((res) =>{
            // //
            let status = res.data.message;
            let data = res.data.responseData;
            if (status === "Success") {
                //console.log(data);
                window.localStorage.setItem('ticketStatus', JSON.stringify(data))
            } else {
                window.localStorage.setItem('ticketStatus', [])

            }
        })
        .catch((data) => {
            console.log(data);
        });
};

 export const onViewTicket = (notiIds, isFollowUp) => {
    // setState({
    //   ...state,
    //   modalIsOpen: false
    // });
    
    if (notiIds !== "") {
      axios({
        method: "post",
        url: config.apiUrl + "/Notification/ReadNotification",
        headers: authHeader(),
        params: {
          TicketID: notiIds,
          IsFollowUp: isFollowUp,
        },
      })
        .then(function(res) {
          let status = res.data.message;
          if (status === "Success") {
            handleGetNotificationList();
          }
        })
        .catch((data) => {
          console.log(data);
        });
    }
  };


   export const handleTimeoutfunc =  async (state,setState,stopbreak)=>{
   
    var json ={
      BreakStart : moment(state.startbreak),
      BreakEnd : moment(state.stopbreak === "" ? stopbreak : state.stopbreak)
    }

    console.log("json ",json)
    console.log("state",state)

   await axios({
      method:'post',
      url: config.apiUrl+'/Module/InsertBreakTime',
      headers:authHeader(),
      data:json
    })

    .then(function(res){
      let statuscode = res.data.statusCode
      if(statuscode === 200){
       NotificationManager.success('Break time Added ');
       //handleLoggedInUserDetails();
       setState({
        ...state,
        stopbreak: '',
				startbreak: '',
        timerOn:true,
        IdleBreakSwitch:false
       });
      
      

      } else{
        NotificationManager.error('Break time was not added');
      }
      console.log("timerOn==",state.timerOn)
    })
    .catch((data) =>{

      console.log("data",data)
  })

  }
  

  export const handleLogoutMethod = () => {

      const userProfile = JSON.parse (window.localStorage.getItem('UserProfile'))
   
      axios({
               method: 'post',
               url: config.apiUrl + '/Account/Logout',
               headers: authHeader()
           })
   
       .then(function(res){
   
         var status = res.data.status;
   
         if(status === true){
           localStorage.clear();
           window.location.href = "/"
         }
         console.log(status ,"logoutstatus")
       })
       .catch((data) => {
         console.log(data)
       }
       )
     }

//   export const handleGetUserProfileData = () =>{
	
//     axios({
//         method: 'post',
//         url: config.apiUrl + '/User/GetUserProfileDetail',
//         headers: authHeader()
//     })
//         .then(function (res) {
//             var status = res.data.message;
//             if (status === 'Success') {
//                 var id = res.data.responseData[0].userId;
//                 var userdata = res.data.responseData[0].profilePicture;
//                 var image = userdata.split('/');
//                 if (image[image.length - 1] == '') {
//                     setState({
//                          ...state,
//                         selectedUserProfilePicture: ''
//                     });
//                 } else {
//                     setState({
//           ...state,
//                         selectedUserProfilePicture: userdata
//                     });
//                 }
//             } else {
//             setState({
//       ...state,
//                     selectedUserProfilePicture: ''
//                 });
//             }
//         })
//         .catch((data) => {
//             console.log(data);
//         });
// }