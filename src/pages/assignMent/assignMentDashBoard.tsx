import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Titlebar from "../../components/common/titlebar";
import { ASSIGNED_DATA, ASSIGN_TO_MASTER } from "../../utilities/routePaths";

export default function AssignMentDashboard() {

  const navigate = useNavigate();

  return (
    <div>
      <Titlebar title={"AssignMent Dashboard"} />
      <Row className="flex justify-center mt-3">
        <Col xs={6} md={2} sm={5} className="m-2">
          <div onClick={() => navigate(ASSIGN_TO_MASTER)} className="h-40 border rounded-xl bg-[#4ab8ef]  flex items-center justify-center">
            <span className="text-center text-white text-xl">Assign Based On Master Data</span>
          </div>
        </Col>
        <Col xs={6} md={2} sm={5} className="m-2">
          <div onClick={() => navigate(ASSIGNED_DATA)} className="h-40 border rounded-xl bg-[#d653d4] flex items-center justify-center">
            <span className="text-center text-white text-xl">Assigned Data</span>
          </div>
        </Col>
      </Row>
    </div>
  );
}
