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
import { SearchBox } from "../../../components/common/searchBox";
import PhcoModalMissing from "../../../components/common/phcoModalMissing";

export default function PhcoM() {
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

  const [editForm, setEditForm] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [formData, setFormData] = useState<IMasterData>();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  const totalPages = Math.ceil(copyOfiginalData.length / itemsPerPage);
  const [searchTerm, setSearchTerm] = useState("");

  const [{ Role, Mobile, loginCode }] = IsAuthenticated();

  const onPageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const filteredData = (copyOfiginalData || []).filter((item) => {
    return (
      item?.DistrictName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Mobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.CreatedBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.CreatedMobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.TalukOrTownName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.PHCName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  const currentItems = filteredData.slice(startIndex, endIndex);

  const getAllMaster = async () => {
    setLoading(true);
    let res = await postRequest("phcMissingData", {
      Role: Role,
      CreatedMobile: Mobile,
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
  }, []);

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

  const handleUpdatePhcMissing = async (values: IMasterData) => {
    let res = await postRequest("updatePhcMissingData", values);
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
      <PhcoModalMissing
        show={editForm}
        title={modalTitle}
        saveType={"PO"}
        formData={formData}
        handleSubmitForm={handleUpdatePhcMissing}
        handleModifyAssignedUser={handleUpdatePhcMissing}
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
            defaultSelect="Select Taluka/Zone"
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
            defaultSelect="Select Phc/Division"
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
      <Row className="m-4">
        <Col md={4}>
          <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
                      <th>Name</th>
                      <th>Mobile</th>
                      <th>Role</th>
                      <th>DistrictName</th>
                      <th>TalukOrTownName/Zone</th>
                      <th>PHCName/Divison</th>
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
    </>
  );

  return (
    <div>
      <LoaderOverlay isLoading={isLoading} />
      {renderComponent()}
    </div>
  );
}
