import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Titlebar from "../../components/common/titlebar";
import {
  ASSIGNED_DATA,
  ASSIGN_TO_DISTRICT,
  ASSIGN_TO_MASTER,
  ASSIGN_TO_TALUK,
} from "../../utilities/routePaths";
import { IsAuthenticated } from "../../Authentication/useAuth";
import { ROLES } from "../../utilities/constants";

export default function AssignMentDashboard() {
  const navigate = useNavigate();

  const [{ Role }] = IsAuthenticated();

  return (
    <div>
      <Titlebar title={"AssignMent Dashboard"} />
      {/* <Row></Row> */}
      <Row className="flex border p-4 justify-around border-black rounded-xl m-3">
        {/* ############################### Super Admin Login ####################################### */}

        {Role === ROLES.SUPER_ADMIN && (
          <React.Fragment>
            <Col xs={6} md={2} sm={5} className="m-2">
              <div
                onClick={() => navigate(ASSIGN_TO_DISTRICT)}
                className="h-40 border rounded-xl bg-[#4ab8ef] flex items-center justify-center"
              >
                <span className="text-center text-white text-xl">District</span>
              </div>
            </Col>
            <Col xs={6} md={2} sm={5} className="m-2">
              <div
                onClick={() => navigate(ASSIGN_TO_TALUK)}
                className="h-40 border rounded-xl bg-[#d653d4]  flex items-center justify-center"
              >
                <span className="text-center text-white text-xl">Taluk</span>
              </div>
            </Col>
            <Col xs={6} md={2} sm={5} className="m-2">
              <div
                onClick={() => navigate(ASSIGN_TO_MASTER)}
                className="h-40 border rounded-xl bg-[#4ab8ef]  flex items-center justify-center"
              >
                <span className="text-center justify-center text-white text-xl">
                  {"Assign Based On Hns Data" + "\n" + "(Or) To SubCenter"}
                </span>
              </div>
            </Col>
            <Col xs={6} md={2} sm={5} className="m-2">
              <div
                onClick={() => navigate(ASSIGNED_DATA)}
                className="h-40 border rounded-xl bg-[#cbc639] flex items-center justify-center"
              >
                <span className="text-center text-white text-xl">
                  Assigned Data
                </span>
              </div>
            </Col>
          </React.Fragment>
        )}
        {/* ############################### District Login ####################################### */}
        {Role === ROLES.DISTRICT_OFFICER && (
          <React.Fragment>
            <Col xs={6} md={3} sm={5} className="m-2">
              <div
                onClick={() => navigate(ASSIGN_TO_TALUK)}
                className="h-40 border rounded-xl bg-[#d653d4]  flex items-center justify-center"
              >
                <span className="text-center text-white text-xl">Taluk</span>
              </div>
            </Col>
            <Col xs={6} md={3} sm={5} className="m-2">
              <div
                onClick={() => navigate(ASSIGN_TO_MASTER)}
                className="h-40 border rounded-xl bg-[#4ab8ef]  flex items-center justify-center"
              >
                <span className="text-center justify-center text-white text-xl">
                  {"Assign Based On Hns Data" + "\n" + "(Or) To SubCenter"}
                </span>
              </div>
            </Col>
            <Col xs={6} md={3} sm={5} className="m-2">
              <div
                onClick={() => navigate(ASSIGNED_DATA)}
                className="h-40 border rounded-xl bg-[#cbc639] flex items-center justify-center"
              >
                <span className="text-center text-white text-xl">
                  Assigned Data
                </span>
              </div>
            </Col>
          </React.Fragment>
        )}
        {/* ############################### Taluk Login ####################################### */}
        {Role === ROLES.TALUK_OFFICER && (
          <React.Fragment>
            <Col xs={6} md={3} sm={5} className="m-2">
              <div
                onClick={() => navigate(ASSIGN_TO_MASTER)}
                className="h-40 border rounded-xl bg-[#4ab8ef]  flex items-center justify-center"
              >
                <span className="text-center justify-center text-white text-xl">
                  {"Assign Based On Hns Data" + "\n" + "(Or) To SubCenter"}
                </span>
              </div>
            </Col>
            <Col xs={6} md={3} sm={5} className="m-2">
              <div
                onClick={() => navigate(ASSIGNED_DATA)}
                className="h-40 border rounded-xl bg-[#cbc639] flex items-center justify-center"
              >
                <span className="text-center text-white text-xl">
                  Assigned Data
                </span>
              </div>
            </Col>
          </React.Fragment>
        )}
      </Row>
    </div>
  );
}
