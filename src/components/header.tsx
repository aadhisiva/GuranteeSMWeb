import React from "react";
import { Col, Image, Row } from "react-bootstrap";

export default function Header() {
  return (
    <div className="bg-slate-600 sticky z-1 top-0 border-b-1">
      <Row className="h-14 flex flex-row w-full items-center">
        <Col md={2} xs={4} className="text-left">
          <Image
            className="ml-3"
            width={50}
            height={50}
            src={require("../assests/Images/karnataka.png")}
          />
        </Col>
        <Col md={9} xs={6} className="font-bold text-white text-center text-sm">
          Guarantee Scheme Survey
        </Col>
        <Col md={1} xs={2} className="justify-end">
          <Image
            // className="right-0"
            width={50}
            height={50}
            src={require("../assests/Images/palace.png")}
          />
        </Col>
      </Row>
    </div>
  );
}
