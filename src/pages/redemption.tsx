import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col, Button, Form, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { downloadRequest, postRequest } from "../Authentication/axiosrequest";
import * as XLSX from "xlsx";

const RedemptionReport = () => {
  const [Mobile, setMobile] = useState("");
  // const [BookingId, setBookingId] = useState("");
  const [EndDate, setEndDate] = useState(null);

  const [originalData, setOriginalData] = useState([]);
  const [copyOriginalData, setCopyOriginalData] = useState([]);

  const handleGetdata = async () => {
    // Add logic for fetching data on button click
    if (!EndDate) alert("Select Date");
    if (!Mobile) alert("Enter Mobile Number");
    let getData = await postRequest("getDataForRedemption", {
      Mobile,
      EndDate,
    });
    if (getData?.code === 200) {
      setOriginalData(getData?.data);
      setCopyOriginalData(getData?.data);
    } else {
      return alert("Something went wrong. Please try agian");
    }
  };

  const handleDownloadExcel = async () => {
    // Add logic for downloading Excel on button click
    if (!EndDate) alert("Enter Booking Id");
    if (!Mobile) alert("Enter Mobile Number");
    // await downloadRequest("downloadGetDataForRedemption", { Mobile, EndDate });
    let newDate = new Date().getTime();
    const worksheet = XLSX.utils.json_to_sheet(copyOriginalData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${newDate}.xlsx`);
  };

  const handleCLickRedemption = async (BookingId: string) => {
    let getData = await postRequest("redemptionComplete", { BookingId });
    if (getData?.code === 200) {
      setOriginalData(getData?.data);
      setCopyOriginalData(getData?.data);
    } else {
      return alert("Something went wrong. Please try agian");
    }
  };

  return (
    <div className="ml-10 mr-10 mb-10">
      <h3 className="text-center pt-3">Redemption</h3>
      <Row className="pt-3 border p-6 border-red-100 rounded-md">
        <Col md={3} sm={12} className="m-2">
          <Form.Control
            required
            type="text"
            name="Mobile"
            maxLength={10}
            value={Mobile}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMobile(e.target.value)
            }
            placeholder="Mobile Number"
          />
        </Col>
        <Col md={3} sm={12} className="m-2">
          <DatePicker
            selected={EndDate}
            onChange={(date: any) => setEndDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select Date"
            className="form-control"
          />
        </Col>
      </Row>
      <Row className="pt-3 flex justify-center">
        <Col md={3} sm={6} className="m-2">
          <Button variant="success" onClick={handleGetdata}>
            Get Data
          </Button>
        </Col>
        <Col md={3} sm={6} className="m-2">
          <Button variant="warning" onClick={handleDownloadExcel}>
            Download
          </Button>
        </Col>
      </Row>
      <Row className="pt-3">
        <Col>
          {/* Replace the GridView with a React-based table */}
          {originalData.length !== 0 ? (
            <Table responsive bordered>
              <thead>
                <tr>
                  {Object.keys(Object.assign({}, originalData[0])).map(
                    (obj, index) => (
                      <th key={index}>{obj}</th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
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
                    <td>{obj?.BookingId}</td>
                    <td>{obj?.VerifyStatus}</td>
                    <td>
                      {obj.VerifyStatus === "Y" ? (
                        <Button
                          variant="warning"
                          disabled
                          onClick={() => handleCLickRedemption(obj?.BookingId)}
                        >
                          Verified
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={() => handleCLickRedemption(obj?.BookingId)}
                        >
                          Redeem
                        </Button>
                      )}
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
};

export default RedemptionReport;
