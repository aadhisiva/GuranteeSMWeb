import { Navigate, Route, Routes } from "react-router-dom";
import { SIGN_IN } from "../utilities/routePaths";
import React from "react";

const SignInComponent = React.lazy(() => import("../pages/signIn"));

export const PrivateRoutes = ({ auth }: any) => {
  return (
    <Routes>
      <Route path={SIGN_IN} element={<SignInComponent />} />
      <Route index path="/*" element={<Navigate to={SIGN_IN} />} />
    </Routes>
  );
};
