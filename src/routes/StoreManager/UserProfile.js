import React, { Component, Fragment } from "react";
import ProfileImg from "./../../assets/Images/UserIcon.png";
import { authHeader } from "./../../helpers/authHeader";
import axios from "axios";
import config from "./../../helpers/config";
import { transferData } from "./../../helpers/transferData";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: [],
      selectedUserID: 0,
      selectedProfilePicture: "",
      selectedFirstName: "",
      selectedLastName: "",
      selectedMobile: "",
      selectedEmailID: "",
      selectedDesignation: "",
      DesignationData: [],
      ProfileData: [],
      fileNameCompulsion: "",
      FirstNameCompulsion: "",
      LastNameCompulsion: "",
      MobileCompulsion: "",
      EmailIDCompulsion: "",
      DesignationCompulsion: "",
      imgFlag: "",
      loading: true,
    };
    this.handleGetDesignationList = this.handleGetDesignationList.bind(this);
    this.handleEditUserProfile = this.handleEditUserProfile.bind(this);
    this.handleGetUserProfileData = this.handleGetUserProfileData.bind(this);
    this.handleDeleteProfilePic = this.handleDeleteProfilePic.bind(this);
  }
  componentDidMount() {
    this.handleGetUserProfileData();
    this.handleGetDesignationList();
  }

  fileUpload(e) {
    var allFiles = [];
    var selectedFiles = e.target.files;
    allFiles.push(selectedFiles[0]);
    this.setState({
      //fileName: e.target.files[0].name
      fileName: allFiles,
    });
  }
  fileDrop = (e) => {
    this.setState({ fileName: e.dataTransfer.files[0].name });
    e.preventDefault();
  };
  fileDragOver = (e) => {
    e.preventDefault();
  };
  fileDragEnter = (e) => {
    e.preventDefault();
  };
  setUserData = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleGetDesignationList() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreHierarchy/GetStoreDesignationList",
      headers: authHeader(),
    })
      .then(function(res) {
        let designationdata = res.data.responseData;
        let status = res.data.message;
        if (status === "Success") {
          self.setState({
            DesignationData: designationdata,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  setGetProfileData = (data) => {
    let self = this;
    var userData = data[0];
    this.state.selectedUserID = userData.userId;
    this.state.selectedFirstName = userData.firstName;
    this.state.selectedLastName = userData.lastName;
    this.state.selectedMobile = userData.mobileNo;
    this.state.selectedEmailID = userData.emailId;
    this.state.selectedDesignation = userData.designationID;
    this.state.selectedProfilePicture = userData.profilePicture;
    var image = this.state.selectedProfilePicture.split("/");
    var imgFlag = image[image.length - 1];
    // var array=[];
    // array.push({name:img})

    self.setState({
      selectedUserID: userData.userId,
      selectedFirstName: userData.firstName,
      selectedLastName: userData.lastName,
      selectedMobile: userData.mobileNo,
      selectedEmailID: userData.emailId,
      selectedDesignation: userData.designationID,
      imgFlag,
      loading: false,
      //fileName:array
    });
  };

  handleGetUserProfileData() {
    let self = this;
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/GetStoreUserProfileDetail",
      headers: authHeader(),
    })
      .then(function(res) {
        var status = res.data.message;
        var userdata = res.data.responseData;
        if (status === "Success") {
          self.setState({
            ProfileData: userdata,
          });
          self.setGetProfileData(userdata);
        } else {
          self.setState({
            ProfileData: [],
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleDeleteProfilePic() {
    let self = this;
    self.setState({
      loading: true,
    });
    axios({
      method: "post",
      url: config.apiUrl + "/StoreUser/DeleteStoreUserProfile",
      headers: authHeader(),
    })
      .then(function(res) {
        var status = res.data.message;
        if (status === "Success") {
          var image = self.state.selectedProfilePicture.split("/");
          image[image.length - 1] = "";
          var newImg = image.join("/");
          self.setState({
            selectedProfilePicture: newImg,
            imgFlag: "",
            loading: false,
          });
          transferData.sendProfilePic("");
        } else {
          self.setState({
            loading: false,
          });
        }
      })
      .catch((data) => {
        console.log(data);
      });
  }

  handleEditUserProfile() {
    if (
      // this.state.fileName.length > 0 &&
      // this.state.selectedFirstName.length > 0 &&
      // this.state.selectedLastName.length > 0 &&
      this.state.selectedMobile.length > 0
      // this.state.selectedEmailID.length > 0 &&
      // this.state.selectedDesignation > 0
    ) {
      let self = this;
      var json = {
        UserId: this.state.selectedUserID,
        FirstName: this.state.selectedFirstName,
        LastName: this.state.selectedLastName,
        MobileNo: this.state.selectedMobile,
        EmailId: this.state.selectedEmailID,
        DesignationID: this.state.selectedDesignation,
      };
      const formData = new FormData();

      formData.append("UpdateUserProfiledetailsModel", JSON.stringify(json));
      formData.append("file", this.state.fileName[0]);

      // update user profile
      axios({
        method: "post",
        url: config.apiUrl + "/StoreUser/UpdateStoreUserProfileDetails",
        headers: authHeader(),
        data: formData,
      })
        .then(function(res) {
          let msg = res.data.message;
          let data = res.data.responseData;
          if (msg === "Success") {
            NotificationManager.success("Profile updated successfully.");
            transferData.sendProfilePic(data.profilePath);
            setTimeout(function() {
              self.props.history.push("/store/campaign");
            }, 1000);
          }
        })
        .catch((data) => {
          console.log(data);
        });
    } else {
      this.setState({
        // fileNameCompulsion: "Please select profile picture.",
        // FirstNameCompulsion: "Please enter first name.",
        // LastNameCompulsion: "Please enter last name.",
        MobileCompulsion: "Please enter mobile number.",
        // EmailIDCompulsion: "Please enter emailID.",
        // DesignationCompulsion: "Please select designation."
      });
    }
  }

  render() {
    return (
      <Fragment>
        <div className="container-fluid">
          {this.state.loading && (
            <div className="loader-icon-cntr-ovrlay">
              <div className="loader-icon"></div>
            </div>
          )}
          <div className="profile-settings-cntr">
            <div className="row">
              <div className="col-md-12">
                <div className="profilemain">
                  <div className="half-circle">
                    <div className="imguserupload">
                      <img
                        src={
                          this.state.imgFlag === ""
                            ? ProfileImg
                            : this.state.selectedProfilePicture
                        }
                        alt=""
                        className="profimg"
                      />

                      <div className="uploadtextprofile">
                        <br></br>
                        <input
                          id="file-upload"
                          className="d-none file-uploadprofile"
                          type="file"
                          onChange={this.fileUpload.bind(this)}
                        />
                        <label
                          htmlFor="file-upload"
                          className="uploadtextprofile1"
                          onDrop={this.fileDrop}
                          onDragOver={this.fileDragOver}
                          onDragEnter={this.fileDragEnter}
                          onChange={this.fileUpload.bind(this)}
                        >
                          {this.state.imgFlag === "" ? "Upload" : "Change"}
                          Photo
                        </label>

                        {this.state.fileName[0] && (
                          <div className="file-info pb-0">
                            <div>
                              <div className="user-profile-file-dtls">
                                <p className="mb-0">
                                  {this.state.fileName[0].name}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      {this.state.imgFlag !== "" && (
                        <label
                          onClick={this.handleDeleteProfilePic}
                          className="uploadtextprofile1"
                          // onChange={this.fileUpload.bind(this)}
                        >
                          Delete Photo
                        </label>
                      )}
                      {this.state.fileName.length === 0 && (
                        <p style={{ color: "red", marginBottom: "0px" }}>
                          {this.state.fileNameCompulsion}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="centerprofile col-md-5">
                    <div className="divSpace">
                      <div>
                        <label className="designation-name">First Name</label>
                        <input
                          type="text"
                          className="txt-1 cursor-disabled"
                          placeholder="Enter Name"
                          name="selectedFirstName"
                          value={this.state.selectedFirstName}
                          onChange={this.setUserData.bind(this)}
                          disabled
                        />
                        {this.state.selectedFirstName.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.fileNameCompulsion}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="divSpace">
                      <div>
                        <label className="designation-name">Last Name</label>
                        <input
                          type="text"
                          className="txt-1 cursor-disabled"
                          placeholder="Enter Name"
                          name="selectedLastName"
                          value={this.state.selectedLastName}
                          onChange={this.setUserData.bind(this)}
                          disabled
                        />
                        {this.state.selectedLastName.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.LastNameCompulsion}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="divSpace">
                      <div>
                        <label className="reports-to">Mobile No.</label>
                        <input
                          type="text"
                          className="txt-1"
                          placeholder="Enter Mobile Number"
                          name="selectedMobile"
                          maxLength={12}
                          value={this.state.selectedMobile}
                          onChange={this.setUserData.bind(this)}
                        />
                        {this.state.selectedMobile.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.MobileCompulsion}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="divSpace">
                      <div>
                        <label className="reports-to">Email ID</label>
                        <input
                          type="text"
                          className="txt-1 cursor-disabled"
                          placeholder="Enter Email"
                          name="selectedEmailID"
                          value={this.state.selectedEmailID}
                          onChange={this.setUserData.bind(this)}
                          disabled
                        />
                        {this.state.selectedEmailID.length === 0 && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.EmailIDCompulsion}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="divSpace">
                      <div>
                        <label className="reports-to">Designation</label>
                        <select
                          className="add-select-category cursor-disabled"
                          name="selectedDesignation"
                          value={this.state.selectedDesignation}
                          onChange={this.setUserData.bind(this)}
                          disabled
                        >
                          <option value="">Select Designation</option>
                          {this.state.DesignationData !== null &&
                            this.state.DesignationData.map((item, i) => (
                              <option key={i} value={item.designationID}>
                                {item.designationName}
                              </option>
                            ))}
                        </select>
                        {this.state.selectedDesignation === "" && (
                          <p style={{ color: "red", marginBottom: "0px" }}>
                            {this.state.DesignationCompulsion}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="chatconfigbtn">
                      <button
                        className="CreateADDBtn"
                        onClick={this.handleEditUserProfile.bind(this)}
                      >
                        SAVE
                      </button>
                    </div>
                  </div>
                  <div className="userChangePW">
                    <Link to="/storeChangePassword">Change Password</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default UserProfile;
