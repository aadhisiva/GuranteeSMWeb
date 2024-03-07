import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  ANNABHAGYA_REPORTS,
  ASSIGNED_DATA,
  ASSIGNMENT_DASHBOARD,
  ASSIGN_TO_DISTRICT,
  ASSIGN_TO_MASTER,
  ASSIGN_TO_MISSING_PHC,
  ASSIGN_TO_PHCO,
  ASSIGN_TO_SUBCENTER,
  ASSIGN_TO_TALUK,
  DASHBOARD,
  DISTRICT_WISE_REPORTS,
  GRUHAJYOTHI_REPORTS,
  GRUHALASHMI_REPORTS,
  REPORTS_DASHBOARD,
  SHAKTI_REPORTS,
  TALUK_WISE_REPORTS,
  YUVANIDHI_REPORTS,
} from "../utilities/routePaths";


const DashBoardComponent = React.lazy(() => import("../pages/dashboard"));

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
const AssignToDistrictComponent = React.lazy(
  () => import("../pages/assignMent/assignToEach/district")
);
const AssignTOTalukComponent = React.lazy(
  () => import("../pages/assignMent/assignToEach/taluk")
);
const AssignTOPhcoComponent = React.lazy(
  () => import("../pages/assignMent/assignToEach/phco")
);
const AssignTOSubCenterComponent = React.lazy(
  () => import("../pages/assignMent/assignToEach/subCenter")
);
const TalukWiseReportsComponent = React.lazy(
  () => import("../pages/reports/talukWise")
);
const DistrictWiseReportsComponent = React.lazy(
  () => import("../pages/reports/districtWise")
);
const PhcoMissingComponent = React.lazy(
  () => import("../pages/assignMent/assignToEach/phcMissing")
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
      <Route path={ASSIGN_TO_DISTRICT} element={<AssignToDistrictComponent />} />
      <Route path={ASSIGN_TO_TALUK} element={<AssignTOTalukComponent />} />
      <Route path={ASSIGN_TO_PHCO} element={<AssignTOPhcoComponent />} />
      <Route path={ASSIGN_TO_SUBCENTER} element={<AssignTOSubCenterComponent />} />
      <Route path={ASSIGN_TO_MISSING_PHC} element={<PhcoMissingComponent />} />

      <Route path={DISTRICT_WISE_REPORTS} element={<DistrictWiseReportsComponent />} />
      <Route path={TALUK_WISE_REPORTS} element={<TalukWiseReportsComponent />} />

      <Route index path="/*" element={<Navigate to={DASHBOARD} />} />
    </Routes>
  );
};
