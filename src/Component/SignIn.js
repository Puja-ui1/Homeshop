import React, { Component } from "react";

import Logo from "./../assets/Images/logo-compressed.jpg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { encryption } from "../helpers/encryption";
import axios from "axios";
import { authHeader } from "../helpers/authHeader";
import config from "../helpers/config";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import SimpleReactValidator from "simple-react-validator";

class SingIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailID: "",
      password: "",
      loading: false,
      programCode: "",
    };
    this.hanleChange = this.hanleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCRMRole = this.handleCRMRole.bind(this);
    this.validator = new SimpleReactValidator();
  }
  hanleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  componentDidMount() {
    if (this.props.location.encProgramCode) {
      var finalEncProgramCode = this.props.location.encProgramCode;
      if (finalEncProgramCode) {
        this.setState({
          programCode: finalEncProgramCode,
        });
      } else {
        this.props.history.push("/");
      }
    } else {
      this.props.history.push("/");
    }
  }

  handleCRMRole() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/CRMRole/GetRolesByUserID",
      headers: authHeader(),
    })
      .then(function(res) {
        let msg = res.data.message;
        if (msg === "Success") {
          let data = res.data.responseData.modules;
          if (data !== null) {
            let AgentData = {
              tenantID: res.data.responseData.tenantID,
              agentID: res.data.responseData.userID,
              agentName: res.data.responseData.agentName,
              programCode: res.data.responseData.programCode,
              countryCode: res.data.responseData.countryCode,
              mobNumberLength: res.data.responseData.mobNumberLength,
            };
            window.localStorage.setItem("AgentData", JSON.stringify(AgentData));
            for (var i = 0; i <= data.length; i++) {
              if (i === data.length) {
                NotificationManager.error(
                  "You don't have any sufficient page access. Please contact administrator for access.",
                  "",
                  2000
                );
                self.setState({
                  loading: false,
                });
              } else if (
                data[i].moduleName === "Dashboard" &&
                data[i].modulestatus === true
              ) {
                setTimeout(function() {
                  self.props.history.push("/admin/dashboard");
                }, 400);
                return;
              } else if (
                data[i].moduleName === "Tickets" &&
                data[i].modulestatus === true
              ) {
                setTimeout(function() {
                  self.props.history.push("/admin/myTicketlist");
                }, 400);
                return;
              } else if (
                data[i].moduleName === "Knowledge Base" &&
                data[i].modulestatus === true
              ) {
                setTimeout(function() {
                  self.props.history.push("/admin/knowledgebase");
                }, 400);
                return;
              } else if (
                data[i].moduleName === "Chat" &&
                data[i].modulestatus === true
              ) {
                self.props.history.push({
                  pathname: "/admin/Chatbot",
                  state: {
                    programCode: res.data.responseData.programCode,
                    agentId: res.data.responseData.userID,
                    tenantID: res.data.responseData.tenantID,
                    UserName: res.data.responseData.agentName,
                  },
                });
                return;
              } else if (
                data[i].moduleName === "Settings" &&
                data[i].modulestatus === true
              ) {
                setTimeout(function() {
                  self.props.history.push("/admin/settings");
                }, 400);
                return;
              }
            }
          }
      
        }
     
        else{
          localStorage.clear();
          //window.location.href = "/";
          NotificationManager.error(msg)

        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleSubmit(event) {
    event.preventDefault();

    let self = this;
    if (this.validator.allValid()) {
      self.setState({
        loading: true,
      });
      const { emailID, password } = this.state;
      var X_Authorized_userId = encryption(emailID, "enc");

      let X_Authorized_password = encryption(password, "enc");
      let X_Authorized_Domainname = encryption(config.url, "enc");

      let X_Authorized_Programcode = this.state.programCode;
      if (X_Authorized_userId !== null && X_Authorized_password !== null) {
        axios({
          method: "post",
          url: config.apiUrl + "/Account/authenticateUser",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "X-Authorized-Programcode": X_Authorized_Programcode,
            "X-Authorized-userId": X_Authorized_userId,
            "X-Authorized-password": X_Authorized_password,
            "X-Authorized-Domainname": X_Authorized_Domainname,
          },
        }).then(function(res) {
          let resValid = res.data.message;
          self.setState({
            loading: true,
          });
          if (resValid === "Valid Login") {
            //NotificationManager.success("Login Successfull.");
            window.localStorage.setItem("token", res.data.responseData.token);
            window.localStorage.setItem("ERT", true);
            self.handleCRMRole();
            // setTimeout(function () {
            //   self.props.history.push("/admin/dashboard");
            // }, 400);
            self.setState({
              loading: false,
            });
          } else {
            NotificationManager.error(
              "Username or password is invalid.",
              "",
              1500
            );
            self.setState({
              loading: false,
            });
          }
        });
      }
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    return (
      <div className="auth-wrapper box-center">
        <div className="auth-content">
          <NotificationContainer />
          <div className="card">
            <div className="card-body text-center">
              <div>
                <img src={Logo} alt="logo" className="initial-logo" />
              </div>
              <form name="form" onSubmit={this.handleSubmit}>
                <label className="sign-in">SIGN IN</label>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="program-code-textbox"
                    placeholder="Email ID*"
                    name="emailID"
                    onChange={this.hanleChange}
                    value={this.state.emailId}
                    autoComplete="off"
                    maxLength={100}
                  />
                  {this.validator.message(
                    "Email Id",
                    this.state.emailID,
                    "required"
                  )}
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    className="program-code-textbox"
                    placeholder="Password*"
                    name="password"
                    onChange={this.hanleChange}
                    value={this.state.password}
                    autoComplete="off"
                    maxLength={25}
                  />
                  {this.validator.message(
                    "Password",
                    this.state.password,
                    "required"
                  )}
                </div>
                <button
                  type="submit"
                  className="program-code-button"
                  disabled={this.state.loading}
                >
                  {this.state.loading ? (
                    <FontAwesomeIcon
                      className="circular-loader"
                      icon={faCircleNotch}
                      spin
                    />
                  ) : (
                    ""
                  )}
                  {this.state.loading ? "Please Wait ..." : "LOGIN"}
                </button>
              </form>
              <div>
                <br />
                <p className="mb-0 text-muted">
                  <Link
                    // to="Forgotpassword"
                    to={{
                      pathname: "Forgotpassword",
                      state: {
                        programCode: this.state.programCode,
                      },
                    }}
                    style={{ color: "#246ec3", letterSpacing: "0.5px" }}
                  >
                    FORGOT PASSWORD
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingIn;
