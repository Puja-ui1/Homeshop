import React, { Component, Suspense } from "react";
import { Route } from "react-router-dom";
import { NotificationContainer } from "react-notifications";
// import Loadable from "react-loadable";
// import Dashboard from "./Dashboard";
import Layout from "./../Component/layout";
import SMS from "./Settings/Ticketing/Sms";
import FacebookRedirect from "./Settings/Ticketing/FacebookRedirectPage";
import BulkClosure from "./Settings/Ticketing/BulkClosure";
//const Layout = React.lazy(() => import('./../Component/layout'));
// import MyTicket from "./MyTicket";
const Dashboard = React.lazy(() => import('./Dashboard'));
const MyTicket = React.lazy(() => import('./MyTicket'));
// import TicketSystem from "./TicketSystem";
const TicketSystem = React.lazy(() => import('./TicketSystem'));
// import Chatbot from "./Chatbot";
const Chatbot = React.lazy(() => import('./Chatbot'));
// import MyTicketList from "./MyTicketList";
const MyTicketList = React.lazy(() => import('./MyTicketList'));
// import Settings from "./Settings/Settings";
const Settings = React.lazy(() => import('./Settings/Settings'));
// import KnowledgeBase from "./KnowledgeBase";
const KnowledgeBase = React.lazy(() => import('./KnowledgeBase'));
// import FileUploadLogs from "./Settings/FileUploadLogs";
const FileUploadLogs = React.lazy(() => import('./Settings/FileUploadLogs'));
// import TicketHierarchy from "./Settings/Ticketing/TicketHierarchy";
const TicketHierarchy = React.lazy(() => import('./Settings/Ticketing/TicketHierarchy'));
// import Brands from "./Settings/Ticketing/Brands";
const Brands = React.lazy(() => import('./Settings/Ticketing/Brands'));
// import Users from "./Settings/Ticketing/Users";
const Users = React.lazy(() => import('./Settings/Ticketing/Users'));
// import CreatePriority from "./CreatePriority";
const CreatePriority = React.lazy(() => import('./CreatePriority'));
// import Alerts from "./Settings/Alerts";
const Alerts = React.lazy(() => import('./Settings/Alerts'));
// import Templates from "./Settings/Ticketing/Templates";
const Templates = React.lazy(() => import('./Settings/Ticketing/Templates'));
// import AddSearchMyTicket from "./AddSearchMyTicket";
const AddSearchMyTicket = React.lazy(() => import('./AddSearchMyTicket'));
// import TicketCRMRole from "./Settings/Ticketing/TicketCRMRole";
const TicketCRMRole = React.lazy(() => import('./Settings/Ticketing/TicketCRMRole'));
// import Reports from "./Settings/Ticketing/Reports";
const Reports = React.lazy(() => import('./Settings/Ticketing/Reports'));
// import Module from "./Settings/Ticketing/Module";
const Module = React.lazy(() => import('./Settings/Ticketing/Module'));
// import CreateSLA from "./Settings/Ticketing/CreateSLA";
const CreateSLA = React.lazy(() => import('./Settings/Ticketing/CreateSLA'));
// import StoreMaster from "./Settings/Ticketing/StoreMaster";
const StoreMaster = React.lazy(() => import('./Settings/Ticketing/StoreMaster'));
// import CategoryMaster from "./Settings/Ticketing/CategoryMaster";
const CategoryMaster = React.lazy(() => import('./Settings/Ticketing/CategoryMaster'));
// import UserProfile from "./UserProfile";
const UserProfile = React.lazy(() => import('./UserProfile'));
// import BlockedEmail from "./Settings/Ticketing/BlockedEmail";
const BlockedEmail = React.lazy(() => import('./Settings/Ticketing/BlockedEmail'));
// import JunkWords from "./Settings/Ticketing/JunkWords";
const JunkWords = React.lazy(() => import('./Settings/Ticketing/JunkWords'));
// import Teamcreation from "./Settings/Ticketing/Teamcreation";
const Teamcreation = React.lazy(() => import('./Settings/Ticketing/Teamcreation'));
// import ApplicationInfo from "./Settings/Ticketing/ApplicationInfo";
const ApplicationInfo = React.lazy(() => import('./Settings/Ticketing/ApplicationInfo'));
// import CallLogs from "./CallLogs/CallLogs";
const CallLogs = React.lazy(() => import('./CallLogs/CallLogs'));
// import DynamicReport from "./Settings/Ticketing/DynamicReport";
const DynamicReport = React.lazy(() => import('./Settings/Ticketing/DynamicReport'));
const Sms =React.lazy(()=>import('./Settings/Ticketing/Sms'));
const DepartmentCreation =React.lazy(()=>import('./Settings/Ticketing/DepartmentCreation'));
const EsclatedEmail =React.lazy(()=>import('./Settings/Ticketing/EsclatedEmail'));
const Socialchannel=React.lazy(()=>import('./Settings/Ticketing/SocialChannel'))
const Facebook=React.lazy(()=>import('./Settings/Ticketing/FacebookRedirectPage'));
const Instagram=React.lazy(()=>import('./Settings/Ticketing/InstagramRedirect'));
const BulkClosur =React.lazy(()=>import('./Settings/Ticketing/BulkClosure'));

export class App extends Component {
  render() {
    const { match } = this.props;
    return (
      <Layout>
        <Suspense fallback={ <div className="loader-icon"></div>}>
        <Route exact path={`${match.url}/dashboard`} component={Dashboard} />
        <Route exact path={`${match.url}/myticket`} component={MyTicket} />
        <Route
          exact
          path={`${match.url}/ticketSystem`}
          component={TicketSystem}
        />
        <Route exact path={`${match.url}/chatbot`} component={Chatbot} />
        <Route
          exact
          path={`${match.url}/myTicketList`}
          component={MyTicketList}
        />
        <Route
          exact
          path={`${match.url}/ticketHierarchy`}
          component={TicketHierarchy}
        />
        <Route exact path={`${match.url}/settings`} component={Settings} />

        <Route
          exact
          path={`${match.url}/knowledgebase`}
          component={KnowledgeBase}
        />

        <Route exact path={`${match.url}/users`} component={Users} />
        <Route
          exact
          path={`${match.url}/fileUploadLogs`}
          component={FileUploadLogs}
        />
        <Route exact path={`${match.url}/brands`} component={Brands} />
        <Route
          exact
          path={`${match.url}/priority`}
          component={CreatePriority}
        />
        <Route exact path={`${match.url}/alerts`} component={Alerts} />

        <Route exact path={`${match.url}/templates`} component={Templates} />
        <Route
          exact
          path={`${match.url}/addSearchMyTicket`}
          component={AddSearchMyTicket}
        />
        <Route
          exact
          path={`${match.url}/ticketCRMRole`}
          component={TicketCRMRole}
        />

        <Route exact path={`${match.url}/reports`} component={Reports} />

        <Route exact path={`${match.url}/module`} component={Module} />

        <Route exact path={`${match.url}/sLA`} component={CreateSLA} />
        <Route
          exact
          path={`${match.url}/teamcreation`}
          component={Teamcreation}
        />

        <Route
          exact
          path={`${match.url}/storeMaster`}
          component={StoreMaster}
        />

        <Route
          exact
          path={`${match.url}/categoryMaster`}
          component={CategoryMaster}
        />
        <Route
          exact
          path={`${match.url}/userProfile`}
          component={UserProfile}
        />
        <Route
          exact
          path={`${match.url}/blockedemail`}
          component={BlockedEmail}
        />
        <Route exact path={`${match.url}/junkwords`} component={JunkWords} />
        <Route
          exact
          path={`${match.url}/applicationinfo`}
          component={ApplicationInfo}
        />
        <Route exact path={`${match.url}/calllogs`} component={CallLogs} />
        <Route
          exact
          path={`${match.url}/dynamicreport`}
          component={DynamicReport}
        />
        <Route
          exact
          path={`${match.url}/sms`}
          component={Sms}
        />
        <Route
          exact
          path={`${match.url}/departmentcreation`}
          component={DepartmentCreation}
        />
        <Route
          exact
          path={`${match.url}/esclatedemail`}
          component={EsclatedEmail}
        />
        <Route
          exact
          path={`${match.url}/bulkclosure`}
          component={BulkClosur}
        />
        <Route
          exact
          path={`${match.url}/socialchannel`}
          component={Socialchannel}
        />
        <Route
          exact
          path={`${match.url}/facebookRedirect`}
          component={Facebook}
        />
        <Route
          exact
          path={`${match.url}/instagramRedirect`}
          component={Instagram}
        />

        <NotificationContainer />
      </Suspense>
      </Layout>
    );
  }
}

export default App;
