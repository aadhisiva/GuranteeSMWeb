import React, { useEffect, useState } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
import Titlebar from "../../../components/common/titlebar";
import SelectInput from "../../../components/common/selectInput";
import { RURAL_URBAN_OPTIONS } from "../../../utilities/constants";
import CustomPagination from "../../../components/common/customPagination";
import Spinner from "../../../components/common/spinner";
import { IMasterData } from "../../../utilities/interfacesOrtype";
import { postRequest } from "../../../Authentication/axiosrequest";
import { IsAuthenticated } from "../../../Authentication/useAuth";
import PhcoModal from "../../../components/common/phcoModal";
import LoaderOverlay from "../../../components/common/LoadingOverlay";

export default function PhcoAssign() {
  const [originalData, setOriginalData] = useState<IMasterData[]>([]);
  const [copyOfiginalData, setCopyOriginalData] = useState<IMasterData[]>([]);
  const [isLoading, setLoading] = useState(false);

  // selected values
  const [ruralUrban, setRuralUrban] = useState("");
  const [district, setDistrict] = useState("");
  const [taluka, setTaluka] = useState("");
  const [phc, setPhc] = useState("");
  const [subCenter, setSubCenter] = useState("");

  // selectable values
  const [districtSelect, setDistrictSelect] = useState<IMasterData[]>();
  const [talukaSelect, setTalukaSelect] = useState<IMasterData[]>();
  const [phcSelect, setPhcSelect] = useState<IMasterData[]>();
  const [subCenterSelect, setSubCenterSelect] = useState<IMasterData[]>();

  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [editForm, setEditForm] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [formData, setFormData] = useState<IMasterData>();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  const totalPages = Math.ceil(copyOfiginalData.length / itemsPerPage);

  const [showAssignMent, setAssignMent] = useState(true);

  const [{ Role, Mobile, loginCode }] = IsAuthenticated();

  const onPageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = copyOfiginalData.slice(startIndex, endIndex);

  const getAllMaster = async () => {
    setLoading(true);
    let res = await postRequest("getDisAndTalukAssignedData", {
      allData: "PD",
      role: Role,
      code: loginCode,
      isAssignMent: showAssignMent ? "assign" : "",
      Mobile: Mobile
    });
    if (res?.code === 200) {
      setOriginalData(res?.data);
      setCopyOriginalData(res?.data);
      setLoading(false);
    } else {
      setLoading(false);
      setError(true);
      setErrorMessage("Something Went Wrong Please try again.");
    }
  };

  useEffect(() => {
    getAllMaster();
  }, [showAssignMent]);

  useEffect(() => {
    let filterData = originalData;

    // filter rural/urban and district
    if (district) {
      filterData = filterData.filter((obj) => obj.DistrictName === district);
    }
    // filter rural/urban and district and taluka
    if (district && taluka) {
      filterData = filterData.filter(
        (obj) => obj.DistrictName === district && obj.TalukOrTownName === taluka
      );
    }
    // filter rural/urban and district and taluka and phco(health facility)
    if (district && taluka && phc) {
      filterData = filterData.filter(
        (obj) =>
          obj.DistrictName === district &&
          obj.TalukOrTownName === taluka &&
          obj.PHCName === phc
      );
    }
    setCopyOriginalData(filterData);
  }, [district, taluka, phc]);

  const handleDistrict = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setDistrict(value);
    setTaluka("");
    setPhc("");
    let reset = (originalData || []).filter(
      (obj) => obj.DistrictName === value
    );
    setTalukaSelect(reset);
  };
  const handleTaluka = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setTaluka(value);
    setPhc("");
    setSubCenter("");
    let reset = (talukaSelect || []).filter(
      (obj) => obj.TalukOrTownName === value
    );
    setPhcSelect(reset);
  };

  const handlePhc = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setPhc(value);
  };

  const handleCLickAdd = async (obj: IMasterData) => {
    setFormData(obj);
    setEditForm(true);
    setModalTitle("Add");
  };

  const handleCLickModify = async (obj: IMasterData) => {
    setFormData(obj);
    setEditForm(true);
    setModalTitle("Modify");
  };

  const handleAssignSubCenter = async (values: IMasterData) => {
    let res = await postRequest("addDistrictAndTalukUser", values);
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
      <PhcoModal
        show={editForm}
        title={modalTitle}
        saveType={"PO"}
        formData={formData}
        handleSubmitForm={handleAssignSubCenter}
        handleModifyAssignedUser={handleAssignSubCenter}
        onHide={() => setEditForm(false)}
      />
    );
  };

  const handleClearFilters = () => {
    setRuralUrban("");
    setDistrict("");
    setTaluka("");
    setPhc("");
    setSubCenter("");
  };

  const renderComponent = () => (
    <>
      {editForm && rednerForm()}
      <Titlebar title={"PHCO Assignment"} />
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
        <Col>
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
        <Col>
          <SelectInput
            defaultSelect="Select Taluka"
            options={(
              Array.from(
                new Set((talukaSelect || []).map((obj) => obj.TalukOrTownName))
              ) || []
            ).map((obj) => obj)}
            onChange={(e) => handleTaluka(e)}
            value={taluka}
          />
        </Col>
        <Col>
          <SelectInput
            defaultSelect="Select Phc"
            options={(
              Array.from(
                new Set((phcSelect || []).map((obj) => obj.PHCName))
              ) || []
            ).map((obj) => obj)}
            onChange={(e) => handlePhc(e)}
            value={phc}
          />
        </Col>
        <Col>
          <Button onClick={handleClearFilters}>Clear Filters</Button>
        </Col>
      </Row>
      <Row className="pt-3 m-3">
        <Col>
          {/* Replace the GridView with a React-based table */}
          {originalData.length !== 0 ? (
            <React.Fragment>
              {showAssignMent ? (
                <Table responsive bordered>
                  <thead>
                    <tr>
                      <th>DistrictName</th>
                      <th>TalukOrTownName</th>
                      <th>PHCName</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(currentItems || []).map((obj: any, index) => (
                      <tr key={index}>
                        <td>{obj?.DistrictName ?? "N/A"}</td>
                        <td>{obj?.TalukOrTownName ?? "N/A"}</td>
                        <td>{obj?.PHCName ?? "N/A"}</td>
                        <td>
                          <Button
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
              ) : (
                <Table responsive bordered>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Mobile</th>
                      <th>Role</th>
                      <th>DistrictName</th>
                      <th>TalukOrTownName</th>
                      <th>PHCName</th>
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
                        <td>{obj?.DistrictName ?? "N/A"}</td>
                        <td>{obj?.TalukOrTownName ?? "N/A"}</td>
                        <td>{obj?.PHCName ?? "N/A"}</td>
                        <td>{obj?.CreatedBy ?? "N/A"}</td>
                        <td>{obj?.CreatedMobile ?? "N/A"}</td>
                        <td>
                          <Button
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
              )}
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
    </>
  );

  return (
    <div>
      <LoaderOverlay isLoading={isLoading} />
      {renderComponent()}
    </div>
  );
}
