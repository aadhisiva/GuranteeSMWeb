import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Titlebar from "../../components/common/titlebar";
import {
  ANNABHAGYA_REPORTS,
  ASSIGNED_DATA,
  ASSIGN_TO_MASTER,
  GRUHAJYOTHI_REPORTS,
  GRUHALASHMI_REPORTS,
  SHAKTI_REPORTS,
  YUVANIDHI_REPORTS,
} from "../../utilities/routePaths";

export default function ReportsDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <Titlebar title={"Reports Dashboard"} />
      <Row className="flex justify-center items-center mt-3">
        <Col xs={6} md={2} sm={5} className="m-2 flex flex-col justify-center">
          <div
            onClick={() => navigate(GRUHALASHMI_REPORTS)}
            className="h-40 border rounded-xl bg-[#d6a03c] flex flex-col justify-center items-center"
          >
            <div className="text-xl text-center">
              <span className="font-bold">Total Surveyed :</span> 0
            </div>
            {/* <div className="text-xl">
              <span className="font-bold">Male :</span> 0
            </div>
            <div className="text-xl">
              <span className="font-bold">Female :</span> 0
            </div> */}
          </div>
          <span className="text-center text-xl">GruhaLakshmi</span>
        </Col>
        <Col xs={6} md={2} sm={5} className="m-2 flex flex-col justify-center">
          <div
            onClick={() => navigate(GRUHAJYOTHI_REPORTS)}
            className="h-40 border rounded-xl bg-[#41e9d2] flex items-center justify-center"
          >
            <div className="text-xl text-center">
              <span className="font-bold">Total Surveyed :</span> 0
            </div>
            {/* <div className="text-xl">
              <span className="font-bold">Male :</span> 0
            </div>
            <div className="text-xl">
              <span className="font-bold">Female :</span> 0
            </div> */}
          </div>
          <span className="text-center text-xl">GruhaJyothi</span>
        </Col>
        <Col xs={6} md={2} sm={5} className="m-2 flex flex-col justify-center">
          <div
            onClick={() => navigate(ANNABHAGYA_REPORTS)}
            className="h-40 border rounded-xl bg-[#3a55c2] flex flex-col items-center justify-center"
          >
            <div className="text-xl text-center">
              <span className="font-bold">Total Surveyed :</span> 0
            </div>
            {/* <div className="text-xl">
              <span className="font-bold">Male :</span> 0
            </div>
            <div className="text-xl">
              <span className="font-bold">Female :</span> 0
            </div> */}
          </div>
          <span className="text-center text-xl">AnnaBhagya</span>
        </Col>
        <Col xs={6} md={2} sm={5} className="m-2 flex flex-col justify-center">
          <div
            onClick={() => navigate(SHAKTI_REPORTS)}
            className="h-40 border rounded-xl bg-[#d653d4] flex flex-col items-center justify-center"
          >
            <div className="text-xl text-center">
              <span className="font-bold">Total Surveyed :</span> 0
            </div>
            {/* <div className="text-xl">
              <span className="font-bold">Male :</span> 0
            </div>
            <div className="text-xl">
              <span className="font-bold">Female :</span> 0
            </div> */}
          </div>
          <span className="text-cente text-xl">Shakthi</span>
        </Col>
        <Col xs={6} md={2} sm={5} className="m-2 flex flex-col justify-center">
          <div
            onClick={() => navigate(YUVANIDHI_REPORTS)}
            className="h-40 border rounded-xl bg-[#c63d4d] flex flex-col items-center justify-center"
          >
            <div className="text-xl text-center">
              <span className="font-bold">Total Surveyed :</span> 0
            </div>
            {/* <div className="text-xl">
              <span className="font-bold">Male :</span> 0
            </div>
            <div className="text-xl">
              <span className="font-bold">Female :</span> 0
            </div> */}
          </div>
          <span className="text-center text-xl">YuvaNidhi</span>
        </Col>
      </Row>
    </div>
  );
}
