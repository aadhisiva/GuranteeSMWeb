import React from "react";
import { Col, Image, Row } from "react-bootstrap";

export default function Header() {
  return (
    <div className="bg-slate-600 sticky z-1 top-0 border-b-1">
      <Row className="h-14 flex items-center w-full">
        <Col className="text-left">
          <Image
            className="ml-3"
            width={50}
            height={50}
            src={require("../assests/Images/karnataka.png")}
          />
        </Col>
        <Col className="text-center font-bold text-white text-2xl">
          Guarantee Scheme Survey
        </Col>
        <Col className="flex justify-end text-right">
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
