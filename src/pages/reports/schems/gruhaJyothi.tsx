import React, { useState } from "react";
import { Col, Row, Table, Button, FormCheck } from "react-bootstrap";
import { postRequest } from "../../../Authentication/axiosrequest";
import { IMasterData } from "../../../utilities/interfacesOrtype";
import Titlebar from "../../../components/common/titlebar";
import SelectInput from "../../../components/common/selectInput";
import {
  DISTRICT_OPTIONS,
  DISTRICT_OPTIONS_WITH_CODES,
  PHC,
  ROLES,
  SUBCENTER,
  TALUK,
} from "../../../utilities/constants";
import CustomPagination from "../../../components/common/customPagination";
import ReactDatePicker from "react-datepicker";
import { getDistinctOfEach } from "../../../utilities/resusedFunction";
import LoaderOverlay from "../../../components/common/LoadingOverlay";
import { SearchBox } from "../../../components/common/searchBox";
import * as XLSX from 'xlsx';
import { IsAuthenticated } from "../../../Authentication/useAuth";

export default function GruhaJyothi() {
  const [originalData, setOriginalData] = useState<IMasterData[]>([]);
  const [copyOfOriginalData, setCopyOriginalData] = useState<IMasterData[]>([]);
  const [isLoading, setLoading] = useState(false);

  // selected 
  const [district, setDistict] = useState("");
  const [taluk, setTaluk] = useState("");
  const [phc, setPhc] = useState("");
  const [subCenter, setSubCenter] = useState("");

  // to select dropdown option
  const [talukSelectOption, setTalukSelectOption] = useState([]);
  const [phcSelectOption, setPhcSelectOption] = useState([]);
  const [subCenterSelectOption, setSubCenterSelectOption] = useState([]);

  const [checkFilters, setCheckFilters] = useState("");

  const [FromDate, setFromDate] = useState(null);
  const [ToDate, setToDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const totalPages = Math.ceil(originalData.length / itemsPerPage);

  const [{ Role, loginCode }] = IsAuthenticated();

  const onPageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredData = (copyOfOriginalData || []).filter((item) => {
    return (
      item?.DistrictName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.SurveyedName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.SurveyedMobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.SurveyedRole?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.TalukOrTownName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.PHCName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.SubCenterName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handleClick = async () => {
    setLoading(true);
    let res = await postRequest("getReportsOfEachScheme", {
      Scheme : "GJ", 
      SearchType: checkFilters, 
      DistrictCode: Role === ROLES.DISTRICT_OFFICER ? getDistrictName :  district, 
      TalukCode: taluk, 
      PhcCode: phc, 
      SubCenterCode: subCenter, 
      FromDate: FromDate, 
      ToDate: ToDate
    });
    if (res.code === 200) {
      setOriginalData(res?.data);
      setCopyOriginalData(res?.data);
      setLoading(false);
    } else {
      setLoading(false);
      alert(res?.response?.data?.message || "Please try again");
    }
  };

  const handleCheckBox = (e: any) => {
    if (e.target.value === checkFilters) {
      setCheckFilters("");
      setDistict("");
      setTaluk("");
      setPhc("");
      setSubCenter("");
      setFromDate(null);
      setToDate(null);
    } else {
      setCheckFilters(e.target.value);
      setDistict("");
      setTaluk("");
      setPhc("");
      setSubCenter("");
      setFromDate(null);
      setToDate(null);
    }
  };

  const handleClearFilters = (e: any) => {
      setCheckFilters("");
    setDistict("");
    setTaluk("");
    setPhc("");
    setSubCenter("");
    setFromDate(null);
    setToDate(null);
  };

  const handleDistrict = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target;
    setDistict(value);
    setTaluk("");
    setPhc("");
    setSubCenter("");
    let talukList = await getDistinctOfEach(TALUK, value);
    setTalukSelectOption(talukList);
  }

  const handleTaluk = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target;
    setTaluk(value);
    setPhc("");
    setSubCenter("");
    let PhcList = await getDistinctOfEach(PHC, value);
    setPhcSelectOption(PhcList);
  }

  const handlePhc = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target;
    setPhc(value);
    setSubCenter("");
    let SubcenterList = await getDistinctOfEach(SUBCENTER, value);
    setSubCenterSelectOption(SubcenterList);
  }

  const handleSubCenter = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {value} = e.target;
    setSubCenter(value);
  };

  const handleDownloadExcel = async () => {
    // Add logic for downloading Excel on button click
    // await downloadRequest("downloadGetDataForRedemption", { Mobile, EndDate });
    let newDate = new Date().getTime();
    const worksheet = XLSX.utils.json_to_sheet(copyOfOriginalData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${newDate}.xlsx`);
  };

  const getDistrictName = (DISTRICT_OPTIONS_WITH_CODES || []).find((obj) => obj.code === loginCode)?.value;

  const renderComponent = () => (
    <React.Fragment>
      <Titlebar title={"GruhaJyothi Reports"} />
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
            {Role === "District Officer" ? (
              <SelectInput
                defaultSelect="Select District"
                options={[getDistrictName]}
                onChange={handleDistrict}
                value={district}
              />
              ): (  
                <SelectInput
                  defaultSelect="Select District"
                  options={(DISTRICT_OPTIONS || []).map((obj) => obj)}
                  onChange={handleDistrict}
                  value={district}
                />
            )}
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
            {Role === "District Officer" ? (
              <SelectInput
                defaultSelect="Select District"
                options={[getDistrictName]}
                onChange={handleDistrict}
                value={district}
              />
              ): ( 
              <SelectInput
                defaultSelect="Select District"
                options={(DISTRICT_OPTIONS || []).map((obj) => obj)}
                onChange={handleDistrict}
                value={district}
              />
              )}
            </Col>
            <Col md={3} sm={6} className="m-2">
              <SelectInput
                defaultSelect="Select Taluk"
                options={(talukSelectOption || [])}
                onChange={handleTaluk}
                value={taluk}
                isValueAdded={true}
              />
            </Col>
          </React.Fragment>
        )}
        {checkFilters === "SubCenter" && (
          <React.Fragment>
            <Col md={3} sm={6} className="m-2">
            {Role === "District Officer" ? (
              <SelectInput
                defaultSelect="Select District"
                options={[getDistrictName]}
                onChange={handleDistrict}
                value={district}
              />
              ): ( 
              <SelectInput
                defaultSelect="Select District"
                options={(DISTRICT_OPTIONS || []).map((obj) => obj)}
                onChange={handleDistrict}
                value={district}
              />
              )}
            </Col>
            <Col md={3} sm={6} className="m-2">
              <SelectInput
                defaultSelect="Select Taluk"
                options={(talukSelectOption || [])}
                onChange={handleTaluk}
                value={taluk}
                isValueAdded={true}
              />
            </Col>
            <Col md={3} sm={6} className="m-2">
              <SelectInput
                defaultSelect="Select Phc"
                options={(phcSelectOption || [])}
                onChange={handlePhc}
                value={phc}
                isValueAdded={true}
              />
            </Col>
            <Col md={3} sm={6} className="m-2">
              <SelectInput
                defaultSelect="Select SubCenter"
                options={(subCenterSelectOption || [])}
                onChange={handleSubCenter}
                value={subCenter}
                isValueAdded={true}
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
        <Col md={4}>
              <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Col>
        {originalData.length !== 0 && (
        <Col md={3} sm={6}>
          <Button variant="warning" onClick={handleDownloadExcel}>
            Download
          </Button>
        </Col>
        )}
    </Row>
      <Row className="pt-3 m-3">
        <Col>
          {/* Replace the GridView with a React-based table */}
          {originalData.length !== 0 ? (
            <Table striped responsive bordered>
              <thead>
                <tr>
                  <th>DistrictName</th>
                  <th>TalukOrTownName</th>
                  <th>PHCName</th>
                  <th>SubCenterName</th>
                  <th>SurveyedName</th>
                  <th>SurveyedMobile</th>
                  <th>SurveyedRole</th>
                  <th>TotalCount</th>
                </tr>
              </thead>
              <tbody className="overflow-x-scroll">
                {(currentItems || []).map((obj: any, index) => (
                  <tr key={index}>
                    <td>{obj?.DistrictName}</td>
                    <td>{obj?.TalukOrTownName}</td>
                    <td>{obj?.PHCName}</td>
                    <td>{obj?.SubCenterName}</td>
                    <td>{obj?.SurveyedName}</td>
                    <td>{obj?.SurveyedMobile}</td>
                    <td>{obj?.SurveyedRole}</td>
                    <td>{obj?.TotalCount?? '0'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            ""
            )}
        </Col>
             <CustomPagination
               currentCount={currentItems.length|| 0}
               totalCount={copyOfOriginalData.length || 0}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
              />
      </Row>
    </React.Fragment>
  );

  return (
    <div>
      {isLoading && <LoaderOverlay isLoading={isLoading} />}
      {renderComponent()}
    </div>
  );
}
