import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  ADD_USER,
  ANNABHAGYA_REPORTS,
  ASSIGNED_DATA,
  ASSIGNMENT_DASHBOARD,
  ASSIGN_TO_MASTER,
  DASHBOARD,
  GRUHAJYOTHI_REPORTS,
  GRUHALASHMI_REPORTS,
  REPORTS_DASHBOARD,
  SHAKTI_REPORTS,
  YUVANIDHI_REPORTS,
} from "../utilities/routePaths";

const DashBoardComponent = React.lazy(() => import("../pages/dashboard"));
const AddUserComponent = React.lazy(() => import("../pages/addUser"));
const ReportComponent = React.lazy(() => import("../pages/reports/reports"));

const AssignMentDashBoardComponent = React.lazy(
  () => import("../pages/assignMent/assignMentDashBoard")
);
const AssignedDataComponent = React.lazy(
  () => import("../pages/assignMent/assignedData")
);
const AssignToMasterComponent = React.lazy(
  () => import("../pages/assignMent/assignMent")
);

const ReportsDashBoardComponent = React.lazy(
  () => import("../pages/reports/reportsDashboard")
);
const GruhaLaksmiComponent = React.lazy(
  () => import("../pages/reports/schems/gruhaLakshmi")
);
const GruhaJyothiComponent = React.lazy(
  () => import("../pages/reports/schems/gruhaJyothi")
);
const ShakthiComponent = React.lazy(
  () => import("../pages/reports/schems/shakthi")
);
const YuvaNidhiComponent = React.lazy(
  () => import("../pages/reports/schems/yuvanidhi")
);
const AnnaBhgyaComponent = React.lazy(
  () => import("../pages/reports/schems/annBhagya")
);

export const PageRoutes = () => {
  return (
    <Routes>
      <Route path={DASHBOARD} element={<DashBoardComponent />} />
      {/* Assignment routes */}
      <Route
        path={ASSIGNMENT_DASHBOARD}
        element={<AssignMentDashBoardComponent />}
      />
      <Route path={ASSIGN_TO_MASTER} element={<AssignToMasterComponent />} />
      <Route path={ASSIGNED_DATA} element={<AssignedDataComponent />} />

      {/* Reports routes */}
      <Route path={REPORTS_DASHBOARD} element={<ReportsDashBoardComponent />} />
      <Route path={GRUHALASHMI_REPORTS} element={<GruhaLaksmiComponent />} />
      <Route path={GRUHAJYOTHI_REPORTS} element={<GruhaJyothiComponent />} />
      <Route path={SHAKTI_REPORTS} element={<ShakthiComponent />} />
      <Route path={YUVANIDHI_REPORTS} element={<YuvaNidhiComponent />} />
      <Route path={ANNABHAGYA_REPORTS} element={<AnnaBhgyaComponent />} />

      <Route path={ADD_USER} element={<AddUserComponent />} />
      <Route index path="/*" element={<Navigate to={DASHBOARD} />} />
    </Routes>
  );
};
