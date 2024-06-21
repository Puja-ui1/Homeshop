import React, { Component, Suspense } from "react";
import { Route } from "react-router-dom";
// import Loadable from "react-loadable";
import { NotificationContainer } from "react-notifications";

import StoreLayout from "./../StoreManager/storelayout";
import StoreDashboard from "./StoreDashboard";
import StoreTask from "./StoreTask";
import EditStoreTask from "./EditStoreTask";
import StoreTaskByTicket from "./StoreTaskByTicket";
import RaiseClaim from "./RaiseClaim";
import Claim from "./Claim";
import ClaimApproveReject from "./ClaimApproveReject";
import StoreAddTask from "./StoreAddTask";
import Settings from "./../Settings/Settings";
import HierarchyMaster from "./../Settings/Store/HierarchyMaster";
// import StorePriority from "./../Settings/Store/StorePriority";
const StorePriority = React.lazy(() => import('./../Settings/Store/StorePriority'));
// import StoreCRMRole from "./../Settings/Store/StoreCRMRole";
const StoreCRMRole = React.lazy(() => import('./../Settings/Store/StoreCRMRole'));

// import StoreReports from "./../Settings/Store/StoreReports";
const StoreReports = React.lazy(() => import('./../Settings/Store/StoreReports'));

// import ItemMaster from "./../Settings/Store/ItemMaster";
const ItemMaster = React.lazy(() => import('./../Settings/Store/ItemMaster'));

// import SlaTemplateDepartment from "./../Settings/Store/SlaTemplateDepartment";
const SlaTemplateDepartment = React.lazy(() => import('./../Settings/Store/SlaTemplateDepartment'));

// import StoreUsers from "./../Settings/Store/StoreUsers";
const StoreUsers = React.lazy(() => import('./../Settings/Store/StoreUsers'));

// import StoreModule from "./../Settings/Store/StoreModule";
const StoreModule = React.lazy(() => import('./../Settings/Store/StoreModule'));

// import DepartmentMaster from "./../Settings/Store/DepartmentMaster";
const DepartmentMaster = React.lazy(() => import('./../Settings/Store/DepartmentMaster'));

// import ClaimCategoryMaster from "./../Settings/Store/ClaimCategoryMaster";
const ClaimCategoryMaster = React.lazy(() => import('./../Settings/Store/ClaimCategoryMaster'));

// import StoreAlerts from "./../Settings/Store/StoreAlerts";
const StoreAlerts = React.lazy(() => import('./../Settings/Store/StoreAlerts'));

// import StoreFileUploadLogs from "../Settings/Store/StoreFileUploadLogs";
const StoreFileUploadLogs = React.lazy(() => import('../Settings/Store/StoreFileUploadLogs'));
// import UserProfile from "./UserProfile";
const UserProfile = React.lazy(() => import('./UserProfile'));

// import Appointment from "./Appointment";
const Appointment = React.lazy(() => import('./Appointment'));

// import StoreCampaign from "../Campaign/StoreCampaign";
const StoreCampaign = React.lazy(() => import('../Campaign/StoreCampaign'));

// import HomeShopSetting from "./../Settings/Store/HomeShopSetting";
const HomeShopSetting = React.lazy(() => import('./../Settings/Store/HomeShopSetting'));

// import ChatSettings from "./../Settings/Store/ChatSettings";
const ChatSettings = React.lazy(() => import('./../Settings/Store/ChatSettings'));

// import CardAssets from "./../Settings/Store/CardAssets";
const CardAssets = React.lazy(() => import('./../Settings/Store/CardAssets'));

// import OrderSetting from "./../Settings/Store/OrderSetting";
const OrderSetting = React.lazy(() => import('./../Settings/Store/OrderSetting'));

// import storeMyTicket from "./storeMyTicket";
const storeMyTicket = React.lazy(() => import('./storeMyTicket'));

// import storeMyTicketList from "./storeMyTicketList";
const storeMyTicketList = React.lazy(() => import('./storeMyTicketList'));

// import Orders from "./Orders";
const Orders = React.lazy(() => import('./Orders'));

// import Notification from "./MobileChatNotification";
const Notification = React.lazy(() => import('./MobileChatNotification'));

// import WebBotLink from "./WebBotLink";
const WebBotLink = React.lazy(() => import('./WebBotLink'));

// import StoreTaskAddCampaign from "./StoreTaskAddCampaign";
const StoreTaskAddCampaign = React.lazy(() => import('./StoreTaskAddCampaign'));

// import UnassignCampaign from "./UnassignCampaign";
const UnassignCampaign = React.lazy(() => import('./UnassignCampaign'));

// import StoreTaskAssignTable from "./StoreTaskAssignTable";
const StoreTaskAssignTable = React.lazy(() => import('./StoreTaskAssignTable'));

export class StoreApp extends Component {
  render() {
    const { match } = this.props;
    return (
      <StoreLayout>
        <Suspense fallback={ <div className="loader-icon"></div>}>
        <Route
          exact
          path={`${match.url}/storeDashboard`}
          component={StoreDashboard}
        />
        <Route exact path={`${match.url}/storetask`} component={StoreTask} />
        <Route exact path={`${match.url}/myTicket`} component={storeMyTicket} />
        <Route
          exact
          path={`${match.url}/myTicketList`}
          component={storeMyTicketList}
        />

        <Route
          exact
          path={`${match.url}/editStoreTask`}
          component={EditStoreTask}
        />
        <Route
          exact
          path={`${match.url}/storeTaskByTicket`}
          component={StoreTaskByTicket}
        />
        <Route exact path={`${match.url}/raiseClaim`} component={RaiseClaim} />
        <Route exact path={`${match.url}/claim`} component={Claim} />
        <Route
          exact
          path={`${match.url}/claimApproveReject`}
          component={ClaimApproveReject}
        />
        <Route
          exact
          path={`${match.url}/storeAddTask`}
          component={StoreAddTask}
        />
        <Route
          exact
          path={`${match.url}/hierarchyMaster`}
          component={HierarchyMaster}
        />
        <Route
          exact
          path={`${match.url}/storePriority`}
          component={StorePriority}
        />
        <Route
          exact
          path={`${match.url}/storeCRMRole`}
          component={StoreCRMRole}
        />
        <Route exact path={`${match.url}/settings`} component={Settings} />
        <Route
          exact
          path={`${match.url}/storeReports`}
          component={StoreReports}
        />
        <Route exact path={`${match.url}/itemMaster`} component={ItemMaster} />
        <Route
          exact
          path={`${match.url}/slaTemplateDepartment`}
          component={SlaTemplateDepartment}
        />
        <Route exact path={`${match.url}/storeUsers`} component={StoreUsers} />
        <Route
          exact
          path={`${match.url}/storeModule`}
          component={StoreModule}
        />
        <Route
          exact
          path={`${match.url}/departmentMaster`}
          component={DepartmentMaster}
        />
        <Route
          exact
          path={`${match.url}/claimCategoryMaster`}
          component={ClaimCategoryMaster}
        />
        <Route
          exact
          path={`${match.url}/storeAlerts`}
          component={StoreAlerts}
        />
        <Route
          exact
          path={`${match.url}/storeFileUploadLogs`}
          component={StoreFileUploadLogs}
        />
        <Route
          exact
          path={`${match.url}/userProfile`}
          component={UserProfile}
        />
        <Route
          exact
          path={`${match.url}/appointment`}
          component={Appointment}
        />
        <Route exact path={`${match.url}/campaign`} component={StoreCampaign} />
        <Route
          exact
          path={`${match.url}/homeshopsetting`}
          component={HomeShopSetting}
        />
        <Route
          exact
          path={`${match.url}/chatsettings`}
          component={ChatSettings}
        />
        <Route exact path={`${match.url}/cardassets`} component={CardAssets} />
        <Route
          exact
          path={`${match.url}/ordersetting`}
          component={OrderSetting}
        />
        <Route exact path={`${match.url}/orders`} component={Orders} />
        <Route
          exact
          path={`${match.url}/notification`}
          component={Notification}
        />
        <Route exact path={`${match.url}/webBotLink`} component={WebBotLink} />

        <Route exact path={`${match.url}/taskAddCampaign`} component={StoreTaskAddCampaign} />
        <Route exact path={`${match.url}/unassignCampaign`} component={UnassignCampaign} />
        <Route exact path={`${match.url}/storeAssignCampaign`} component={StoreTaskAssignTable} />

        <NotificationContainer />
        </Suspense>
      </StoreLayout>
    );
  }
}
export default StoreApp;
