import React, { useEffect, useState } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
import { IMasterData } from "../../../utilities/interfacesOrtype";
import { postRequest } from "../../../Authentication/axiosrequest";
import Titlebar from "../../../components/common/titlebar";
import SelectInput from "../../../components/common/selectInput";
import CustomPagination from "../../../components/common/customPagination";
import Spinner from "../../../components/common/spinner";
import DistrictModal from "../../../components/common/districtModal";
import { IsAuthenticated } from "../../../Authentication/useAuth";
import LoaderOverlay from "../../../components/common/LoadingOverlay";
import { SearchBox } from "../../../components/common/searchBox";

export default function AssignToDistrict() {
  const [originalData, setOriginalData] = useState<IMasterData[]>([]); // main data
  const [copyOfiginalData, setCopyOriginalData] = useState<IMasterData[]>([]); // main data
  const [isLoading, setLoading] = useState(false); // loader

  // selected values
  const [ruralUrban, setRuralUrban] = useState("");
  const [district, setDistrict] = useState("");

  // selectable values
  const [districtSelect, setDistrictSelect] = useState<IMasterData[]>();
  // form Data
  const [editForm, setEditForm] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [formData, setFormData] = useState<IMasterData>();

  // pagination details
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [searchTerm, setSearchTerm] = useState("");

  const totalPages = Math.ceil(copyOfiginalData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredData = (copyOfiginalData || []).filter((item) => {
    return (
      item?.DistrictName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Mobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.CreatedBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.CreatedMobile?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const currentItems: IMasterData[] = filteredData.slice(startIndex, endIndex);

  // show assignment
  const [showAssignMent, setAssignMent] = useState(true);

  const onPageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // assign initial data
  const getAllMaster = async () => {
    setLoading(true);
    let res = await postRequest("getDisAndTalukAssignedData", {
      allData: "DD",
      role: "",
      code: "",
      isAssignMent: showAssignMent ? "assign" : "",
    });
    if (res?.code === 200) {
      setOriginalData(res?.data);
      setCopyOriginalData(res?.data);
      setLoading(false);
    } else {
      setLoading(false);
      alert(res?.response?.data?.message || "Please try again.");
    }
  };

  useEffect(() => {
    getAllMaster();
  }, [showAssignMent]);

  useEffect(() => {
    let filterData = originalData;
    if (district) {
      filterData = filterData.filter((obj) => obj.DistrictName === district);
    }
    setCopyOriginalData(filterData);
  }, [district]);

  const handleDistrict = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setDistrict(value);
  };

  const handleCLickModify = async (obj: IMasterData) => {
    setFormData(obj);
    setEditForm(true);
    setModalTitle("Modify");
  };

  const handleCLickAdd = async (obj: IMasterData) => {
    setFormData(obj);
    setEditForm(true);
    setModalTitle("Add");
  };

  const handleAssignToRespectveiRoles = async (values: IMasterData) => {
    let res = await postRequest("addOrUpdateAllLogin", values);
    if (res.code === 200) {
      setEditForm(false);
      await getAllMaster();
    } else {
      setEditForm(false);
      alert(res?.response?.data?.message || "Please try again.");
    }
  };

  const rednerForm = () => {
    return (
      <DistrictModal
        show={editForm}
        title={modalTitle}
        saveType={"DO"}
        formData={formData}
        handleSubmitForm={handleAssignToRespectveiRoles}
        handleModifyAssignedUser={handleAssignToRespectveiRoles}
        onHide={() => setEditForm(false)}
      />
    );
  };

  const handleClearFilters = () => {
    setRuralUrban("");
    setDistrict("");
  };

  const renderComponent = () => (
    <>
      {editForm && rednerForm()}
      <Titlebar title={"District Assignment"} />
      <Row className="p-4">
        <Col md={6} className="text-right">
          <span
            onClick={() => setAssignMent(true)}
            className={`border p-3 rounded-xl ${
              showAssignMent ? "bg-yellow-600" : "bg-blue-500"
            } text-white`}
          >
            AssignMent
          </span>
        </Col>
        <Col md={6}>
          <span
            onClick={() => setAssignMent(false)}
            className={`border p-3 rounded-xl ${
              !showAssignMent ? "bg-yellow-600" : "bg-blue-500"
            } text-white`}
          >
            Assigned Data
          </span>
        </Col>
        <Col></Col>
      </Row>
      <Row className="border p-3 rounded-xl m-4">
        <Col m={2} sm={6}>
          <SelectInput
            defaultSelect="Select District"
            options={(
              Array.from(
                new Set((originalData || []).map((obj) => obj.DistrictName))
              ) || []
            ).map((obj) => obj)}
            onChange={(e) => handleDistrict(e)}
            value={district}
          />
        </Col>
        <Col md={3} sm={6}>
          <Button onClick={handleClearFilters}>Clear Filters</Button>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Col>
      </Row>
      {showAssignMent ? (
        <Row className="pt-3 m-3">
          <Col>
            {/* Replace the GridView with a React-based table */}
            {filteredData.length !== 0 ? (
              <React.Fragment>
                <Table responsive bordered>
                  <thead>
                    <tr>
                      <th>DistrictName</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(currentItems || []).map((obj: any, index) => (
                      <tr key={index}>
                        <td>{obj?.DistrictName}</td>
                        <td>
                          <Button
                            className="mr-1"
                            variant="primary"
                            onClick={() => handleCLickAdd(obj)}
                          >
                            Add
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <CustomPagination
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
      ) : (
        <Row className="pt-3 m-3">
          <Col>
            {/* Replace the GridView with a React-based table */}
            {originalData.length !== 0 ? (
              <React.Fragment>
                <Table responsive bordered>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Mobile</th>
                      <th>Role</th>
                      <th>DistrictName</th>
                      <th>CreatedBy</th>
                      <th>CreatedMobile</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(currentItems || []).map((obj: any, index) => (
                      <tr key={index}>
                        <td>{obj?.Name ?? "N/A"}</td>
                        <td>{obj?.Mobile ?? "N/A"}</td>
                        <td>{obj?.Role ?? "N/A"}</td>
                        <td>{obj?.DistrictName}</td>
                        <td>{obj?.CreatedBy ?? "N/A"}</td>
                        <td>{obj?.CreatedMobile ?? "N/A"}</td>
                        <td>
                          <Button
                            className="mr-1"
                            variant="primary"
                            onClick={() => handleCLickModify(obj)}
                          >
                            Modify
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <CustomPagination
                  currentCount={currentItems.length|| 0}
                  totalCount={copyOfiginalData.length || 0}
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
      )}
    </>
  );

  return (
    <div>
      <LoaderOverlay isLoading={isLoading} />
      {renderComponent()}
    </div>
  );
}
