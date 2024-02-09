import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import Titlebar from "../components/common/titlebar";
import { useNavigate } from "react-router-dom";
import { ASSIGNMENT_DASHBOARD, REPORTS_DASHBOARD } from "../utilities/routePaths";

export default function Dashboard() {

  const navigate = useNavigate();
  return (
    <div>
      <Titlebar title={"Dashboard"} />
      <Row className="flex justify-center mt-3">
        <Col xs={6} md={2} sm={5} className="m-2">
          <div onClick={() => navigate(ASSIGNMENT_DASHBOARD)} className="h-40 border rounded-xl bg-[#8b3737]  flex items-center justify-center">
            <span className="text-center text-white text-xl">Assignment</span>
          </div>
        </Col>
        <Col xs={6} md={2} sm={5} className="m-2">
          <div onClick={() => navigate(REPORTS_DASHBOARD)} className="h-40 border rounded-xl bg-[#4F6978] flex items-center justify-center">
            <span className="text-center text-white text-xl">Reports</span>
          </div>
        </Col>
      </Row>
    </div>
  );
}
