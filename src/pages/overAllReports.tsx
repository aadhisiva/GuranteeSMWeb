import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Table } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { downloadRequest, getRequest, postRequest } from "../Authentication/axiosrequest";
import "react-datepicker/dist/react-datepicker.css";
import axios, { AxiosRequestConfig } from "axios";
import * as XLSX from "xlsx";

const ReportOverall = () => {
  const [StartDate, setStartDate] = useState(null);
  const [EndDate, setEndDate] = useState(null);
  const [Mobile, setMobile] = useState("");
  const [Type, setType] = useState("");

  const [isMobileRadio, setMobileRadio] = useState(false);

  const [originalData, setOriginalData] = useState([]);
  const [copyOriginalData, setCopyOriginalData] = useState([]);

  const handleGetdata = async () => {
    // Add logic for fetching data on button click
    // if (!startDate) alert("Select Start Date");
    // if (!endDate) alert("Select End Date");
    // if (!Mobile) alert("Enter Mobile Number");
    let getData = await postRequest("getAllReportsWithMobile", {
      Mobile,
      StartDate,
      EndDate,
      Type,
    });
    if (getData?.code === 200) {
      setOriginalData(getData?.data);
      setCopyOriginalData(getData?.data);
    } else {
      return alert("Something went wrong. Please try agian");
    }
  };

  const handleSetRadio = (e: React.ChangeEvent<any>) => {
    const { value } = e.target;
    setMobileRadio(!isMobileRadio);
    if (value === "on") {
      setType("Mobile");
    } else {
      setType("Date");
    }
  };

  const handleDownloadExcel = async () => {
    // Add logic for downloading Excel on button click
    let data = {
      Mobile,
      StartDate,
      EndDate,
      Type: Type,
    };
  // await downloadRequest("downloadAllReportsWithMobile", data);
    let newDate = new Date().getTime();
    const worksheet = XLSX.utils.json_to_sheet(copyOriginalData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${newDate}.xlsx`);
  };

  return (
    <div className="ml-10 mr-10 mb-10">
      <h3 className="text-center pt-3">Over All Reports</h3>
      <Row className="">
        <Col md={1} sm={6} className="m-2">
          <Form.Check // prettier-ignore
            type="switch"
            id="custom-switch"
            label="Mobile"
            onChange={handleSetRadio}
          />
        </Col>
      </Row>
      <Row className="pt-1 border p-6 border-red-100 rounded-md">
        {!isMobileRadio ? (
          <>
            <Col md={3} sm={6} className="m-2">
              <DatePicker
                selected={StartDate}
                onChange={(date: any) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="From Date"
                className="form-control"
              />
            </Col>
            <Col md={3} sm={6} className="m-2">
              <DatePicker
                selected={EndDate}
                onChange={(date: any) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="To Date"
                className="form-control"
              />
            </Col>
          </>
        ) : (
          <Col md={3} sm={6} className="m-2">
            <Form.Control
              className="form-control"
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
        )}
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
                    <td>{obj?.TotalAmount}</td>
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

export default ReportOverall;
