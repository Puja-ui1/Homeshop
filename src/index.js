import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "react-app-polyfill/ie9";
import "react-app-polyfill/ie11";
// import Loadable from "react-loadable";

//Css
import "antd/dist/antd.css";
import "react-pagination-js/dist/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-rangeslider/lib/index.css";
import "react-pivottable/pivottable.css";
import "react-notifications/lib/notifications.css";
import "react-table/react-table.css";
import "./assets/css/style.css";
import "./assets/css/settings.css";
import "./assets/css/store.css";
import "./assets/css/store-chat.css";
import "./assets/css/orders.css";
import "./assets/css/chat.css";
import "./assets/css/custome.css";

//JS
import "./../node_modules/popper.js/dist/popper.js";
// import "./../node_modules/bootstrap/dist/js/bootstrap.js";
import "./../node_modules/jquery/dist/jquery.js";

// import "jquery";
// import "popper.js/dist/popper";
// import "bootstrap";
/////js
import "./../node_modules/bootstrap/dist/js/bootstrap.min.js";

///Component
// import SignIn from "./Component/SignIn";
const SignIn = React.lazy(() => import('./Component/SignIn'));

// import ForgotPassword from "./Component/ForgotPassword";
const ForgotPassword = React.lazy(() => import('./Component/ForgotPassword'));

// import ProgramCodeSignIn from "./Component/ProgramCodeSignIn";
const ProgramCodeSignIn = React.lazy(() => import('./Component/ProgramCodeSignIn'));

// import App from "./routes/index";
const App = React.lazy(() => import('./routes/index'));

// import PieChart from "./Component/PieChart/PieChart";
const PieChart = React.lazy(() => import('./Component/PieChart/PieChart'));

// import StoreApp from "./routes/StoreManager/index";
const StoreApp = React.lazy(() => import('./routes/StoreManager/index'));

// import ChangePassword from "./Component/ChangePassword";
const ChangePassword = React.lazy(() => import('./Component/ChangePassword'));

// import UserForgotPassword from "./Component/UserForgotPassword";
const UserForgotPassword = React.lazy(() => import('./Component/UserForgotPassword'));

// import StoreProgramCode from "./Component/Store/StoreProgramCode";
const StoreProgramCode = React.lazy(() => import('./Component/Store/StoreProgramCode'));

// import StoreSignIn from "./Component/Store/StoreSignIn";
const StoreSignIn = React.lazy(() => import('./Component/Store/StoreSignIn'));

// import StoreForgotPassword from "./Component/Store/StoreForgotPassword";
const StoreForgotPassword = React.lazy(() => import('./Component/Store/StoreForgotPassword'));

// import StoreUserForgotPassword from "./Component/Store/StoreUserForgotPassword";
const StoreUserForgotPassword = React.lazy(() => import('./Component/Store/StoreUserForgotPassword'));

// import ModuleSelect from "./Component/ModuleSelect";
const ModuleSelect = React.lazy(() => import('./Component/ModuleSelect'));

// import StoreChangePassword from "./Component/Store/ChangePassword";
const StoreChangePassword = React.lazy(() => import('./Component/Store/ChangePassword'));

// import LanguageSelection from "./Component/Store/LanguageSelection";
const LanguageSelection = React.lazy(() => import('./Component/Store/LanguageSelection'));

// import TicketingLanguageSelection from "./Component/TicketingLanguageSelection";
const TicketingLanguageSelection = React.lazy(() => import('./Component/TicketingLanguageSelection'));

// import ShipmentPrintHtml from "./routes/StoreManager/OrderTabs/ShipmentPrintHtml";
const ShipmentPrintHtml = React.lazy(() => import('./routes/StoreManager/OrderTabs/ShipmentPrintHtml'));

// import Logout from "./../src/routes/StoreManager/Logout"
const Logout = React.lazy(() => import('./../src/routes/StoreManager/Logout'));

ReactDOM.render(
  <Router>
    <Suspense fallback={ <div className="loader-icon"></div>}>
    {/* if required the only on uncomment this code and your system do not push this line*/}
    <Route exact path="/" component={ModuleSelect} />
    <Route path="/admin" component={App} />
    <Route path="/store" component={StoreApp} />
    <Route exact path="/programCodeSignIn" component={ProgramCodeSignIn} />
    <Route exact path="/SignIn" component={SignIn} />
    <Route
      exact
      path="/TicketingLanguageSelection"
      component={TicketingLanguageSelection}
    />
    <Route exact path="/Forgotpassword" component={ForgotPassword} />
    <Route exact path="/ChangePassword" component={ChangePassword} />
    <Route exact path="/storeChangePassword" component={StoreChangePassword} />
    <Route exact path="/languageSelection" component={LanguageSelection} />
    <Route exact path="/StoreProgramCode" component={StoreProgramCode} />
    <Route exact path="/storeSignIn" component={StoreSignIn} />
    <Route exact path="/storeForgotpassword" component={StoreForgotPassword} />
    <Route
      exact
      path="/storeUserForgotPassword"
      component={StoreUserForgotPassword}
    />
    <Route exact path="/UserForgotPassword" component={UserForgotPassword} />
    <Route exact path="/PieChart" component={PieChart} />
    <Route path="/ShipmentPrintHtml" component={ShipmentPrintHtml} />
    <Route path="/logout" component={Logout} />
    </Suspense>
  </Router>
  ,
  document.getElementById("root")
);

serviceWorker.unregister();
