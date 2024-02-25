import React, { ReactNode } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { ADD_USER, DASHBOARD, OVERALL_REPORTS, REDEMPTION } from "../utilities/routePaths";
import { Link, NavLink, useLocation, useNavigate, useParams, useRoutes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../redux/actions/userAction";
import { Container, Image } from "react-bootstrap";

const SidebarComponent = ({ children }: any) => {

const { pathname } = useLocation();
const navigate = useNavigate();
const dispatch = useDispatch();

const handleClickLogout = () => {
  dispatch(userLoggedOut())
}
    return (
    <div className="flex flex-row">
       <div className="h-[calc(100vh-88px)] sticky top-12">
          <CDBSidebar
            textColor="#fff"
            backgroundColor="#475569"
            className={"bg-slate-600"}
            breakpoint={0}
            toggled={true}
            minWidth={"50px"}
            maxWidth={"200px"}
          >
            <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
              <a href={DASHBOARD} className="text-decoration-none text-white">
                Mysore
              </a>
            </CDBSidebarHeader>

            <CDBSidebarContent>
              <CDBSidebarMenu>
                <NavLink to={DASHBOARD}>
                  <CDBSidebarMenuItem className={pathname === DASHBOARD ? "text-purple-500" : ""} icon="columns">
                    Home
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink to={ADD_USER}>
                  <CDBSidebarMenuItem className={pathname === ADD_USER ? "text-purple-500" : ""} icon="columns">
                    Add User
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink to={OVERALL_REPORTS}>
                  <CDBSidebarMenuItem className={pathname === OVERALL_REPORTS ? "text-purple-500" : ""} icon="columns">
                    Over All Report
                  </CDBSidebarMenuItem>
                </NavLink>
                <NavLink to={REDEMPTION}>
                  <CDBSidebarMenuItem className={pathname === REDEMPTION ? "text-purple-500" : ""} icon="columns">
                  Redemption
                  </CDBSidebarMenuItem>
                </NavLink>
                <div onClick={handleClickLogout}>
                  <CDBSidebarMenuItem className={pathname === 'asd' ? "text-purple-500" : ""} icon="columns">
                    Logout
                  </CDBSidebarMenuItem>
                </div>
              </CDBSidebarMenu>
            </CDBSidebarContent>

            <CDBSidebarFooter className="text-center">
              <div
                style={{
                  padding: "20px 5px",
                }}
              >
                <Image src={require("../assests/Images/m1-T.png")} />
              </div>
            </CDBSidebarFooter>
          </CDBSidebar>
        </div>
        <Container fluid className="w-full mb-5">{children}</Container>
        </div>
  );
};

export default SidebarComponent;
