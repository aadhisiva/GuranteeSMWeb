import { Navigate, Route, Routes } from "react-router-dom";
import { SHAKTHI_SCHEME_SURVEY, SIGN_IN } from "../utilities/routePaths";
import React from "react";

const SignInComponent = React.lazy(() => import("../pages/signIn"));

const ShakthiSurveyComponent = React.lazy(
  () => import("../pages/shakthiSurvey")
);

export const PrivateRoutes = ({ auth }: any) => {
  return (
    <Routes>
      <Route path={SIGN_IN} element={<SignInComponent />} />
      <Route path={SHAKTHI_SCHEME_SURVEY} element={<ShakthiSurveyComponent />} />
      <Route index path="/*" element={<Navigate to={SIGN_IN} />} />
    </Routes>
  );
};
