import React, { useState } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
import { DummyArray } from "../../dummy";

export default function Reports() {
  const [originalData, setOriginalData] = useState(DummyArray);
  const [copyOriginalData, setCopyOriginalData] = useState(DummyArray);

  return (
    <div className="overflow-hidden">
      <Row className="pt-3 m-3">
        <Col>
          {/* Replace the GridView with a React-based table */}
          {originalData.length !== 0 ? (
            <Table size="sm" responsive bordered>
              <thead>
                <tr>
                  {Object.keys(Object.assign({}, originalData[0])).map(
                    (obj, index) => (
                      <th key={index}>{obj}</th>
                      )
                      )}
                      <th>Assign</th>
                      <th>Modify</th>
                </tr>
              </thead>
              <tbody className="overflow-y-scroll">
                {(originalData || []).map((obj: any, index) => (
                  <tr key={index}>
                    <td>{obj?.TicketNo}</td>
                    <td>{obj?.MobileNo}</td>
                    <td>{obj?.BookingMobileNo}</td>
                    <td>{obj?.BookingDate}</td>
                    <td>{obj?.TicketHolderName}</td>
                    <td>{obj?.AdultCount}</td>
                    <td>{obj?.KidCount}</td>
                    <td>{obj?.Origin}</td>
                    <td>{obj?.PaymentStatus}</td>
                    <td>{obj?.PaymentDate}</td>
                    <td>{obj?.AppliedDate}</td>
                    <td>
                      <Button
                        variant="primary"
                        disabled
                        //   onClick={() => handleCLickRedemption(obj?.BookingId)}
                      >
                        Assign
                      </Button>
                    </td>
                    <td>
                      <Button
                        variant="success"
                        //   onClick={() => handleCLickRedemption(obj?.BookingId)}
                      >
                        Modify
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </div>
  );
}
