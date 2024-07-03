import React, { Component } from "react";
import axios from "axios";
import { authHeader } from "../../../helpers/authHeader";
import loaderGif from "../../../assets/Images/loader.gif";
import config from "../../../helpers/config";
class FacebookRedirect extends Component {

    constructor(props) {
        super(props);

    }
    componentDidMount = async () => {
        
        const params = new URLSearchParams(window.location.search);
        const val = params.get('code')
        const error = params.get('error')
        if (error !== null) {
            window.close()
        }
        else {
            await axios({
                method: "GET",
                url: config.apiUrlsocial + "/Facebook/LoginRedirect",
                headers: authHeader(),
                params: {
                    code: val,
                    source: config.url + "/admin/facebookRedirect"

                }


            }).then((res) => {
                if (res.data.response_Code === 200) {
                    window.localStorage.setItem("updatedkey", JSON.stringify(val))
                    // window.opener.postMessage('login_success',window.location.origin)
                    window.close();
                }
                else {
                    // window.opener.postMessage('login_failed',window.location.origin)

                }
            })
                .catch((e) => { console.log(e) })

        }





    }
    render() {
        return (
            <>
                <div className="d-flex justify-content-center">
                    <img src={loaderGif} style={{ width: "40px" }} />


                </div>
                <h3>Please Wait we are connecting your account......</h3>
            </>

        )
    }
}
export default FacebookRedirect;