import React, { useEffect, useState } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
import { postRequest } from "../../../Authentication/axiosrequest";
import { IMasterData } from "../../../utilities/interfacesOrtype";
import ModalFormEdit from "../../../components/common/modalFormEdit";
import Titlebar from "../../../components/common/titlebar";
import SelectInput from "../../../components/common/selectInput";
import { RURAL_URBAN_OPTIONS } from "../../../utilities/constants";
import CustomPagination from "../../../components/common/customPagination";
import Spinner from "../../../components/common/spinner";
import ReactDatePicker from "react-datepicker";

export default function Shathi() {
  const [originalData, setOriginalData] = useState<IMasterData[]>([]);
  const [copyOfiginalData, setCopyOriginalData] = useState<IMasterData[]>([]);
  const [isLoading, setLoading] = useState(false);

  const [editForm, setEditForm] = useState(false);
  const [formData, setFormData] = useState<IMasterData>();

  const [FromDate, setFromDate] = useState(null);
  const [ToDate, setToDate] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const totalPages = Math.ceil(originalData.length / itemsPerPage);

  const onPageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = copyOfiginalData.slice(startIndex, endIndex);

  const handleClick = async () => {
    if(!FromDate) return alert("Select FromDate");
    if(!ToDate) return alert("Select ToDate");
    setLoading(true);
    let res = await postRequest("getShakthiReports", { FromDate, ToDate });
    if (res.code === 200) {
      setOriginalData(res?.data);
      setCopyOriginalData(res?.data);
      setLoading(false);
    } else {
      setLoading(false);
      alert("Something went wrong. Please try again");
    }
  };

  const renderComponent = () => (
    <>
      <Titlebar title={"Shakthi Reports"} />
      <Row className="border p-3 rounded-xl m-4">
        <Col md={3} sm={6} className="m-2">
          <ReactDatePicker
            selected={FromDate}
            onChange={(date: any) => setFromDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="From Date"
            className="form-control"
          />
        </Col>
        <Col md={3} sm={6} className="m-2">
          <ReactDatePicker
            selected={ToDate}
            onChange={(date: any) => setToDate(date)}
            dateFormat="dd/MM/yyyy"
            placeholderText="To Date"
            className="form-control"
          />
        </Col>
        <Col md={3} sm={6} className="m-2">
          <Button variant="primary" onClick={handleClick}>
            Search
          </Button>
        </Col>
      </Row>
      <Row className="pt-3 m-3">
        <Col>
          {/* Replace the GridView with a React-based table */}
          {originalData.length !== 0 ? (
            <Table striped responsive bordered>
              <thead>
                <tr>
                  <th>RcNo</th>
                  <th>Name</th>
                  <th>Relationship</th>
                  <th>SS1</th>
                  <th>SS2</th>
                  <th>SS3</th>
                  <th>SS4</th>
                  <th>SS5</th>
                  <th>CreatedBy</th>
                  <th>CreatedMobile</th>
                  {/* <th>Assign</th> */}
                </tr>
              </thead>
              <tbody className="overflow-x-scroll">
                {(currentItems || []).map((obj: any, index) => (
                  <tr key={index}>
                    <td>{obj?.RcNo}</td>
                    <td>{obj?.Name}</td>
                    <td>{obj?.Relationship}</td>
                    <td>{obj?.SS1}</td>
                    <td>{obj?.SS2}</td>
                    <td>{obj?.SS3}</td>
                    <td>{obj?.SS4}</td>
                    <td>{obj?.SS5}</td>
                    <td>{obj?.CreatedBy}</td>
                    <td>{obj?.CreatedMobile}</td>
                    <td>
                      <Button
                        variant="primary"
                        // onClick={() => handleCLickAssign(obj)}
                      >
                        Modify
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <CustomPagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
              />
            </Table>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </>
  );

  return (
    <div>
      {isLoading && <Spinner />}
      {!isLoading && renderComponent()}
    </div>
  );
}
