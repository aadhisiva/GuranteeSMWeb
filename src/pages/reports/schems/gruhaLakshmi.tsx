import React, { useEffect, useState } from "react";
import { Col, Row, Table, Button, FormCheck } from "react-bootstrap";
import { postRequest } from "../../../Authentication/axiosrequest";
import { IMasterData } from "../../../utilities/interfacesOrtype";
import ModalFormEdit from "../../../components/common/modalFormEdit";
import Titlebar from "../../../components/common/titlebar";
import SelectInput from "../../../components/common/selectInput";
import {
  DISTRICT_OPTIONS,
  RURAL_URBAN_OPTIONS,
} from "../../../utilities/constants";
import CustomPagination from "../../../components/common/customPagination";
import Spinner from "../../../components/common/spinner";
import ReactDatePicker from "react-datepicker";
import { getSubCentersFromApi, getTalukasFromApi } from "../../../utilities/resusedFunction";

export default function GruhaLakshmi() {
  const [originalData, setOriginalData] = useState<IMasterData[]>([]);
  const [copyOfiginalData, setCopyOriginalData] = useState<IMasterData[]>([]);
  const [isLoading, setLoading] = useState(false);

  const [editForm, setEditForm] = useState(false);
  const [formData, setFormData] = useState<IMasterData>();

  // selected 
  const [district, setDistict] = useState("");
  const [taluk, setTaluk] = useState("");
  const [sunCenter, setSubCenter] = useState("");

  // to select dropdown option
  const [talukSelectOption, setTalukSelectOption] = useState([]);
  const [sunCenterSelectOption, setSubCenterSelectOption] = useState([]);

  const [checkFilters, setCheckFilters] = useState("");

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
    if (!FromDate) return alert("Select FromDate");
    if (!ToDate) return alert("Select ToDate");
    setLoading(true);
    let res = await postRequest("getGruhaLlakshmiReports", {
      FromDate,
      ToDate,
    });
    if (res.code === 200) {
      setOriginalData(res?.data);
      setCopyOriginalData(res?.data);
      setLoading(false);
    } else {
      setLoading(false);
      alert("Something went wrong. Please try again");
    }
  };

  const handleCheckBox = (e: any) => {
    if (e.target.value === checkFilters) {
      setCheckFilters("");
    } else {
      setCheckFilters(e.target.value);
    }
  };

  const handleClearFilters = (e: any) => {
      setCheckFilters("");
  };

  const handleDistrict = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target;
    setDistict(value);
    let taluks = await getTalukasFromApi(value);
    setTalukSelectOption(taluks);
  }

  const handleTaluk = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target;
    let subcenters = await getSubCentersFromApi(value);
    setSubCenterSelectOption(subcenters);
  }

  const handleSubCenter = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target;
    setSubCenter(value);
  };

  const renderComponent = () => (
    <React.Fragment>
      <Titlebar title={"GruhaLakshmi Reports"} />
      <Row className="border bg-slate-200 p-3 rounded-xl m-4">
        <Col md={3} sm={6} className="m-2">
          <FormCheck
            inline
            label="District Wise Reports"
            value={"District"}
            checked={checkFilters === "District"}
            onChange={handleCheckBox}
          />
        </Col>
        <Col md={3} sm={6} className="m-2">
          <FormCheck
            inline
            label="Taluk Wise Reports"
            value={"Taluk"}
            checked={checkFilters === "Taluk"}
            onChange={handleCheckBox}
          />
        </Col>
        <Col md={3} sm={6} className="m-2">
          <FormCheck
            inline
            label="SubCenter Wise Reports"
            value={"SubCenter"}
            checked={checkFilters === "SubCenter"}
            onChange={handleCheckBox}
          />
        </Col>
        <Col md={2} sm={6} className="m-2">
          <FormCheck
            inline
            label="Date Wise Reports"
            value={"Date"}
            checked={checkFilters === "Date"}
            onChange={handleCheckBox}
          />
        </Col>
        {checkFilters === "District" && (
          <Col md={3} sm={6} className="m-2">
            <SelectInput
              defaultSelect="Select District"
              options={(DISTRICT_OPTIONS || []).map((obj) => obj)}
              onChange={handleDistrict}
              value={district}
            />
          </Col>
        )}
        {checkFilters === "Date" && (
          <React.Fragment>
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
          </React.Fragment>
        )}
        {checkFilters === "Taluk" && (
          <React.Fragment>
            <Col md={3} sm={6} className="m-2">
              <SelectInput
                defaultSelect="Select District"
                options={(DISTRICT_OPTIONS || []).map((obj) => obj)}
                onChange={handleDistrict}
                value={district}
              />
            </Col>
            <Col md={3} sm={6} className="m-2">
              <SelectInput
                defaultSelect="Select Taluk"
                options={(DISTRICT_OPTIONS || []).map((obj) => obj)}
                onChange={handleTaluk}
                value={district}
              />
            </Col>
          </React.Fragment>
        )}
        {checkFilters === "SubCenter" && (
          <React.Fragment>
            <Col md={3} sm={6} className="m-2">
              <SelectInput
                defaultSelect="Select District"
                options={(DISTRICT_OPTIONS || []).map((obj) => obj)}
                onChange={handleDistrict}
                value={district}
              />
            </Col>
            <Col md={3} sm={6} className="m-2">
              <SelectInput
                defaultSelect="Select Taluk"
                options={(DISTRICT_OPTIONS || []).map((obj) => obj)}
                onChange={handleTaluk}
                value={district}
              />
            </Col>
            <Col md={3} sm={6} className="m-2">
              <SelectInput
                defaultSelect="Select SubCenter"
                options={(DISTRICT_OPTIONS || []).map((obj) => obj)}
                onChange={handleSubCenter}
                value={district}
              />
            </Col>
          </React.Fragment>
        )}
        <Col md={2} sm={6} className="m-2">
          <Button variant="primary" onClick={handleClick}>
            Search
          </Button>
        </Col>
        <Col md={2} sm={6} className="m-2">
          <Button variant="primary" onClick={handleClearFilters}>
            ClearFilters
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
                  <th>GL1</th>
                  <th>GL2</th>
                  <th>GL3</th>
                  <th>GL4</th>
                  <th>GL5</th>
                  <th>GL6</th>
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
                    <td>{obj?.GL1}</td>
                    <td>{obj?.GL2}</td>
                    <td>{obj?.GL3}</td>
                    <td>{obj?.GL4}</td>
                    <td>{obj?.GL5}</td>
                    <td>{obj?.GL6}</td>
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
    </React.Fragment>
  );

  return (
    <div>
      {isLoading && <Spinner />}
      {!isLoading && renderComponent()}
    </div>
  );
}
