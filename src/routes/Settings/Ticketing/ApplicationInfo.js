import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as translationHI from "./../../../translations/hindi";
import * as translationMA from "./../../../translations/marathi";
import Demo from "./../../../store/Hashtag.js";
import config from "../../../helpers/config";

class ApplicationInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      translateLanguage: {},
    };
  }
  componentDidMount() {
    if (window.localStorage.getItem("translateLanguage") === "hindi") {
      this.state.translateLanguage = translationHI;
    } else if (window.localStorage.getItem("translateLanguage") === "marathi") {
      this.state.translateLanguage = translationMA;
    } else {
      this.state.translateLanguage = {};
    }
  }
  render() {
    const TranslationContext = this.state.translateLanguage.default;
    return (
      <>
        <div className="container-fluid setting-title setting-breadcrumb">
          <Link to="settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.link.setting
              : "Settings"}
          </Link>
          <span>&gt;</span>
          <Link to="settings" className="header-path">
            {TranslationContext !== undefined
              ? TranslationContext.a.ticketing
              : "Ticketing"}
          </Link>
          <span>&gt;</span>
          <Link to={Demo.BLANK_LINK} className="header-path active">
            Application Info
          </Link>
        </div>

        <div className="paddmodule">
          <div className="module-tabs">
            <section>
              <div className="row">
                <div className="col-md-3">
                  <div className="setting-cntr">
                    <strong>Application Version</strong>
                    <p>{config.appVersion}</p>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="setting-cntr">
                    <strong>Last Updated Date</strong>
                    <p>{config.lastUpdatedDate}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }
}

export default ApplicationInfo;
