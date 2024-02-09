import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Titlebar from "../../components/common/titlebar";
import { ANNABHAGYA_REPORTS, ASSIGNED_DATA, ASSIGN_TO_MASTER, GRUHAJYOTHI_REPORTS, GRUHALASHMI_REPORTS, SHAKTI_REPORTS, YUVANIDHI_REPORTS } from "../../utilities/routePaths";

export default function ReportsDashboard() {

  const navigate = useNavigate();

  return (
    <div>
      <Titlebar title={"Reports Dashboard"} />
      <Row className="flex justify-center mt-3">
        <Col xs={6} md={2} sm={5} className="m-2">
          <div onClick={() => navigate(GRUHALASHMI_REPORTS)} className="h-40 border rounded-xl bg-[#d6a03c]  flex items-center justify-center">
            <span className="text-center text-white text-xl">GruhaLakshmi</span>
          </div>
        </Col>
        <Col xs={6} md={2} sm={5} className="m-2">
          <div onClick={() => navigate(GRUHAJYOTHI_REPORTS)} className="h-40 border rounded-xl bg-[#41e9d2] flex items-center justify-center">
            <span className="text-center text-white text-xl">GruhaJyothi</span>
          </div>
        </Col>
        <Col xs={6} md={2} sm={5} className="m-2">
          <div onClick={() => navigate(ANNABHAGYA_REPORTS)} className="h-40 border rounded-xl bg-[#3a55c2] flex items-center justify-center">
            <span className="text-center text-white text-xl">AnnaBhagya</span>
          </div>
        </Col>
        <Col xs={6} md={2} sm={5} className="m-2">
          <div onClick={() => navigate(SHAKTI_REPORTS)} className="h-40 border rounded-xl bg-[#d653d4] flex items-center justify-center">
            <span className="text-center text-white text-xl">Shakthi</span>
          </div>
        </Col>
        <Col xs={6} md={2} sm={5} className="m-2">
          <div onClick={() => navigate(YUVANIDHI_REPORTS)} className="h-40 border rounded-xl bg-[#c63d4d] flex items-center justify-center">
            <span className="text-center text-white text-xl">YuvaNidhi</span>
          </div>
        </Col>
      </Row>
    </div>
  );
}
