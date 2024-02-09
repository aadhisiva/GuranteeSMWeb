import React, { useEffect, useState } from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import Header from "../components/header";
import { PrivateRoutes } from "./publicRoutes";
import SidebarComponent from "../components/sidebar";
import { PageRoutes } from "./privateRoutes";
import Footer from "../components/footer";
import { IsAuthenticated } from "./useAuth";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../redux/actions/userAction";

export default function WebRoutes() {
  const [{ isLoggedIn, timeoutId }] = IsAuthenticated();
const dispatch = useDispatch();

  return (
    <React.Suspense  fallback={<div>....Loading</div>}>
      <BrowserRouter basename="/GuaranteeSWeb">
        <Header />
        {!isLoggedIn ? (
          <PrivateRoutes />
        ) : (
          // <SidebarComponent>
            <PageRoutes />
          // </SidebarComponent>
        )}
        <Footer />
      </BrowserRouter>
    </React.Suspense>
  );
}
