import React, { useEffect, useState } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import Titlebar from "../components/common/titlebar";
import { useNavigate } from "react-router-dom";
import {
  ASSIGNED_DATA,
  ASSIGNMENT_DASHBOARD,
  ASSIGN_TO_DISTRICT,
  ASSIGN_TO_MASTER,
  ASSIGN_TO_PHCO,
  ASSIGN_TO_SUBCENTER,
  ASSIGN_TO_TALUK,
  REPORTS_DASHBOARD,
} from "../utilities/routePaths";
import "./dashboard.css";
import { ROLES } from "../utilities/constants";
import { IsAuthenticated } from "../Authentication/useAuth";
import { postRequest } from "../Authentication/axiosrequest";
import LoaderOverlay from "../components/common/LoadingOverlay";
import { IDashBoardCounts } from "../utilities/interfacesOrtype";
import { numberWithCommas } from "../utilities/resusedFunction";

export default function Dashboard() {
  const [originalData, setOriginalData] = useState<IDashBoardCounts[] | []>([]);
  const [copyOfOriginalData, setCopyOriginalData] = useState<IDashBoardCounts[] | []>([]);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [{ Role, loginCode }] = IsAuthenticated();

  const getAllMaster = async () => {
    setLoading(true);
    let res = await postRequest("getDashBoardCounts", {
      Role: Role,
      DistrictCode: loginCode,
    });
    if (res?.code === 200) {
      setOriginalData(res?.data || []);
      setCopyOriginalData(res?.data || []);
      setLoading(false);
    } else {
      setLoading(false);
      alert(res?.response?.data?.message || "Please try again.");
    }
  };

  useEffect(() => {
    getAllMaster();
  }, []);

  return (
    <div>
       <LoaderOverlay isLoading={isLoading} />
      <Titlebar title={"Dashboard"} />
      <Row className="boxTitle">
        <Col md={2} className="boxText">
          Summary
        </Col>
      </Row>
      <Row className="box">
        <Col xs={6} md={2} sm={5} className="m-2 cursor-pointer">
          <div
            // onClick={() => navigate(ASSIGNMENT_DASHBOARD)}
            className="h-40 border rounded-xl bg-[#3bb5d0]  flex items-center p-2"
          >
            <span className="text-center text-white text-xl">
              Total Surveyed Count : {numberWithCommas(originalData[0]?.Totalcount || 0)}
            </span>
          </div>
        </Col>
        <Col xs={6} md={2} sm={5} className="m-2 cursor-pointer">
          <div
            // onClick={() => navigate(ASSIGNMENT_DASHBOARD)}
            className="h-40 border rounded-xl bg-[#8b3737]  flex items-center p-2"
          >
            <span className="text-center text-white text-xl">
              Online Rc Count : {numberWithCommas(originalData[0]?.TotalOnline || 0)}
            </span>
          </div>
        </Col>
        <Col xs={6} md={2} sm={5} className="m-2 cursor-pointer">
          <div
            onClick={() => navigate(ASSIGNMENT_DASHBOARD)}
            className="h-40 border rounded-xl bg-[#2b6e22]  flex items-center p-2"
          >
            <span className="text-center text-white text-xl">
              Offline Rc Count : {numberWithCommas(originalData[0]?.TotalOffline || 0)}
            </span>
          </div>
        </Col>
        <Col xs={6} md={2} sm={5} className="m-2 cursor-pointer">
          <div
            // onClick={() => navigate(REPORTS_DASHBOARD)}
            className="h-40 border rounded-xl bg-[#183d52] flex items-center p-2"
          >
            <span className="text-center text-white text-xl">
              Offline Mobile Based Count : {numberWithCommas(originalData[0]?.TotalMobile || 0)}
            </span>
          </div>
        </Col>
      </Row>

      <Row className="boxTitle">
        <Col md={2} className="boxText">
          AssignMent
        </Col>
      </Row>
      <Row className="box">
        {/* ############################### Super Admin Login ####################################### */}

        {Role === ROLES.SUPER_ADMIN && (
          <React.Fragment>
            <Col xs={6} md={2} sm={5} className="m-2 cursor-pointer">
              <div
                onClick={() => navigate(ASSIGN_TO_DISTRICT)}
                className="h-40 border rounded-xl bg-[#cb6f3a] flex items-center justify-center"
              >
                <span className="text-center text-white text-xl">District</span>
              </div>
            </Col>
            <Col xs={6} md={2} sm={5} className="m-2 cursor-pointer">
              <div
                onClick={() => navigate(ASSIGN_TO_TALUK)}
                className="h-40 border rounded-xl bg-[#d653d4]  flex items-center justify-center"
              >
                <span className="text-center text-white text-xl">Taluk/Zone</span>
              </div>
            </Col>
            <Col xs={6} md={2} sm={5} className="m-2 cursor-pointer">
              <div
                onClick={() => navigate(ASSIGN_TO_PHCO)}
                className="h-40 border rounded-xl bg-[#ae3492]  flex items-center justify-center"
              >
                <span className="text-center text-white text-xl">PHCO/Division</span>
              </div>
            </Col>
            <Col xs={6} md={2} sm={5} className="m-2 cursor-pointer">
              <div
                onClick={() => navigate(ASSIGN_TO_SUBCENTER)}
                className="h-40 border rounded-xl bg-[#6ec93d]  flex items-center justify-center"
              >
                <span className="text-center justify-center text-white text-xl">
                  {"SubCenter/Ward"}
                </span>
              </div>
            </Col>
          </React.Fragment>
        )}
        {/* ############################### District Login ####################################### */}
        {Role === ROLES.DISTRICT_OFFICER && (
          <React.Fragment>
            <Col xs={6} md={2} sm={5} className="m-2 cursor-pointer">
              <div
                onClick={() => navigate(ASSIGN_TO_TALUK)}
                className="h-40 border rounded-xl bg-[#d653d4]  flex items-center justify-center"
              >
                <span className="text-center text-white text-xl">Taluk/Zone</span>
              </div>
            </Col>
            <Col xs={6} md={2} sm={5} className="m-2 cursor-pointer">
              <div
                onClick={() => navigate(ASSIGN_TO_PHCO)}
                className="h-40 border rounded-xl bg-[#ae3492]  flex items-center justify-center"
              >
                <span className="text-center text-white text-xl">PHCO/Division</span>
              </div>
            </Col>
            <Col xs={6} md={2} sm={5} className="m-2 cursor-pointer">
              <div
                onClick={() => navigate(ASSIGN_TO_SUBCENTER)}
                className="h-40 border rounded-xl bg-[#4ab8ef]  flex items-center justify-center"
              >
                <span className="text-center justify-center text-white text-xl">
                  {"SubCenter/Ward"}
                </span>
              </div>
            </Col>
          </React.Fragment>
        )}
        {/* ############################### Taluk Login ####################################### */}
        {Role === ROLES.TALUK_OFFICER && (
          <React.Fragment>
             <Col xs={6} md={3} sm={5} className="m-2 cursor-pointer">
              <div
                onClick={() => navigate(ASSIGN_TO_PHCO)}
                className="h-40 border rounded-xl bg-[#ae3492]  flex items-center justify-center"
              >
                <span className="text-center text-white text-xl">PHCO/Division</span>
              </div>
            </Col>
            <Col xs={6} md={3} sm={5} className="m-2 cursor-pointer">
              <div
                onClick={() => navigate(ASSIGN_TO_SUBCENTER)}
                className="h-40 border rounded-xl bg-[#4ab8ef]  flex items-center justify-center"
              >
                <span className="text-center justify-center text-white text-xl">
                  {"SubCenter/Ward"}
                </span>
              </div>
            </Col>
          </React.Fragment>
        )}
        {Role === ROLES.PHCO_OFFICER && (
          <React.Fragment>
            <Col xs={6} md={3} sm={5} className="m-2 cursor-pointer">
              <div
                onClick={() => navigate(ASSIGN_TO_SUBCENTER)}
                className="h-40 border rounded-xl bg-[#4ab8ef]  flex items-center justify-center"
              >
                <span className="text-center justify-center text-white text-xl">
                  {"SubCenter/Ward"}
                </span>
              </div>
            </Col>
          </React.Fragment>
        )}
      </Row>

      <Row className="boxTitle">
        <Col md={2} className="boxText">
          Reports
        </Col>
      </Row>
      <Row className="box">
        <Col xs={6} md={2} sm={5} className="m-2 cursor-pointer">
          <div
            onClick={() => navigate(REPORTS_DASHBOARD)}
            className="h-40 border rounded-xl bg-[#5230a8] flex items-center justify-center"
          >
            <span className="text-center text-white text-xl">Scheme Wise Reports</span>
          </div>
        </Col>
      </Row>
    </div>
  );
}
