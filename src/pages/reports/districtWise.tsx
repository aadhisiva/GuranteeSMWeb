import React, { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import * as XLSX from 'xlsx';
import CustomPagination from "../../components/common/customPagination";
import { IsAuthenticated } from "../../Authentication/useAuth";
import LoaderOverlay from "../../components/common/LoadingOverlay";
import { SearchBox } from "../../components/common/searchBox";
import { postRequest } from "../../Authentication/axiosrequest";
import { IDistrictReports } from "../../utilities/interfacesOrtype";

export default function DistrictWiseReports() {
  const [originalData, setOriginalData] = useState<IDistrictReports[]>([]);
  const [copyOriginalData, setCopyOriginalData] = useState<IDistrictReports[]>([]);
  const [isLoading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  const [searchTerm, setSearchTerm] = useState("");

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil(copyOriginalData?.length / itemsPerPage);

  const filteredData = (copyOriginalData || []).filter((item) => {
    return item?.DistrictName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.Gruhalakshmi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.GruhaJyothi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.Yuvanidhi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.AnnaBhagya?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.Shakthi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.Asha?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.Anganvadi?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.UrbanSurveyor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item?.Total_Asha_AWW?.toLowerCase().includes(searchTerm.toLowerCase())
  });

  const currentItems = filteredData.slice(startIndex, endIndex);

  const [{ Role, loginCode }] = IsAuthenticated();

  const getAllMaster = async () => {
    setLoading(true);
    let res = await postRequest("getCountsOfDistrictAndTaluk", {
      Role: Role,
      DistrictCode: loginCode,
    });
    // let res = { code: 200, data: [], response: {} };
    if (res?.code === 200) {
      setOriginalData(res?.data || []);
      setCopyOriginalData(res?.data || []);
      setLoading(false);
    } else {
      setLoading(false);
      alert(res?.response?.data?.message || "Please try again.");
    }
  };

  useEffect(() => {
    getAllMaster();
  }, []);

  const onPageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDownloadExcel = async () => {
    // Add logic for downloading Excel on button click
    if (originalData.length === 0) alert("Please Load the content first.");
    // await downloadRequest("downloadGetDataForRedemption", { Mobile, EndDate });
    let newDate = new Date().getTime();
    const worksheet = XLSX.utils.json_to_sheet(copyOriginalData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${newDate}.xlsx`);
  };

  return (
    <div className="overflow-hidden">
      <LoaderOverlay isLoading={isLoading} />
      <Row className="m-4">
        <Col md={4}>
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Col>
        <Col md={4}>
          <Button type="button" onClick={handleDownloadExcel}>Download</Button>
        </Col>
      </Row>
      <Row className="pt-3 m-3">
        <Col>
          {/* Replace the GridView with a React-based table */}
          {originalData.length !== 0 ? (
            <React.Fragment>
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th>DistrictName</th>
                    <th>Gruhalakshmi</th>
                    <th>GruhaJyothi</th>
                    <th>Yuvanidhi</th>
                    <th>AnnaBhagya</th>
                    <th>Shakthi</th>
                    <th>Asha</th>
                    <th>Anganvadi</th>
                    <th>UrbanSurveyor</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {(currentItems || []).map((obj: any, index) => (
                    <tr key={index}>
                      <td>{obj?.DistrictName ?? "N/A"}</td>
                      <td>{obj?.Gruhalakshmi ?? "N/A"}</td>
                      <td>{obj?.GruhaJyothi ?? "N/A"}</td>
                      <td>{obj?.Yuvanidhi}</td>
                      <td>{obj?.AnnaBhagya ?? "N/A"}</td>
                      <td>{obj?.Shakthi ?? "N/A"}</td>
                      <td>{obj?.Asha ?? "N/A"}</td>
                      <td>{obj?.Anganvadi ?? "N/A"}</td>
                      <td>{obj.UrbanSurveyor ?? "N/A"}</td>
                      <td>{obj?.Total_Asha_AWW ?? "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <CustomPagination
                currentCount={currentItems.length || 0}
                totalCount={copyOriginalData.length || 0}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={onPageChange}
              />
            </React.Fragment>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </div>
  );
}
