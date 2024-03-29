import React, { useEffect, useState } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
import { IMasterData } from "../../../utilities/interfacesOrtype";
import { postRequest } from "../../../Authentication/axiosrequest";
import { IsAuthenticated } from "../../../Authentication/useAuth";
import Titlebar from "../../../components/common/titlebar";
import SelectInput from "../../../components/common/selectInput";
import { RURAL_URBAN_OPTIONS } from "../../../utilities/constants";
import CustomPagination from "../../../components/common/customPagination";
import LoaderOverlay from "../../../components/common/LoadingOverlay";
import ModalFormEdit from "../../../components/common/modalFormEdit";
import { SearchBox } from "../../../components/common/searchBox";


export default function SubCenterAssign() {
  const [originalData, setOriginalData] = useState<IMasterData[]>([]);
  const [copyOfOriginalData, setCopyOriginalData] = useState<IMasterData[]>([]);
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

  const [editForm, setEditForm] = useState(false);
  const [formData, setFormData] = useState<IMasterData>();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [searchTerm, setSearchTerm] = useState('');

  const totalPages = Math.ceil(copyOfOriginalData.length / itemsPerPage);

  const [modalTitle, setModalTitle] = useState('');
  const [showAssignMent, setAssignMent] = useState(true);
  
  const [{ Role, Mobile, loginCode }] = IsAuthenticated();

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
      item?.Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Mobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.CreatedBy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.CreatedMobile?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.Type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.TalukOrTownName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.PHCName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.SubCenterName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const currentItems = filteredData.slice(startIndex, endIndex);

  const getAllMaster = async () => {
    setLoading(true);
    let res = await postRequest("getDisAndTalukAssignedData", {
      allData: "SD",
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
      alert(res?.response?.data?.message || "Please try again.");
    }
  };

  useEffect(() => {
    getAllMaster();
  }, [showAssignMent]);


  useEffect(() => {
    let filterData = originalData;
   // filter rural/urban
    if (ruralUrban) {
      filterData = filterData.filter((obj) => (obj.Type === ruralUrban || obj.Type == null));
    }

    // filter rural/urban and district
    if (ruralUrban && district) {
      filterData = filterData.filter(
        (obj) =>  (obj.Type === ruralUrban || obj.Type == null) && 
        obj?.DistrictName?.toLowerCase() === district.toLowerCase()
      );
    }
    // filter rural/urban and district and taluka
    if (ruralUrban && district && taluka) {
      filterData = filterData.filter(
        (obj) =>
        (obj.Type === ruralUrban || obj.Type == null) &&
          obj.DistrictName?.toLowerCase() === district.toLowerCase() &&
          obj?.TalukOrTownName?.toLowerCase() === taluka.toLowerCase()
      );
    }
    // filter rural/urban and district and taluka and phco(health facility)
    if (ruralUrban && district && taluka && phc) {
      filterData = filterData.filter(
        (obj) =>
          (obj.Type === ruralUrban || obj.Type == null) &&
          obj?.DistrictName?.toLowerCase() === district.toLowerCase() &&
          obj?.TalukOrTownName?.toLowerCase() === taluka.toLowerCase() &&
          obj?.PHCName?.toLowerCase() === phc.toLowerCase()
      );
    }
    // filter rural/urban and district and taluka and sub centre
    if (ruralUrban && district && taluka && subCenter) {
      filterData = filterData.filter(
        (obj) =>
          (obj.Type === ruralUrban || obj.Type == null) &&
          obj?.DistrictName?.toLowerCase() === district.toLowerCase() &&
          obj?.TalukOrTownName?.toLowerCase() === taluka.toLowerCase() &&
          obj?.SubCenterName?.toLowerCase() === subCenter.toLowerCase()
      );
    };
    setCopyOriginalData(filterData);
  }, [ruralUrban, district, taluka, subCenter, phc]);

  const handleType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value === ruralUrban) return;
    setRuralUrban(value);
    setDistrict("");
    setTaluka("");
    setPhc("");
    setSubCenter("");
    let reset = originalData.filter((obj) => obj.Type === value);
    setDistrictSelect(reset);
  };
  const handleDistrict = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setDistrict(value);
    setTaluka("");
    setPhc("");
    setSubCenter("");
    let reset = (districtSelect || []).filter(
      (obj) => (obj?.DistrictName === value || obj.Type == null)
    );
    setTalukaSelect(reset);
  };
  const handleTaluka = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setTaluka(value);
    setPhc("");
    setSubCenter("");
    let reset = (talukaSelect || []).filter(
      (obj) => obj?.TalukOrTownName === value || obj.Type == null
    );
    setPhcSelect(reset);
  };
  const handlePhc = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setPhc(value);
    setSubCenter("");
    let reset = (phcSelect || []).filter((obj) => obj?.PHCName === value || obj.Type == null);
    setSubCenterSelect(reset);
  };
  const handleSubCentre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSubCenter(value);
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
    let res = await postRequest(modalTitle === "Add"? "addRefractionist": "addDistrictAndTalukUser", values);
    if (res.code === 200) {
      setEditForm(false);
      await getAllMaster();
    } else {
      setEditForm(false);
      alert(res?.response?.data?.message || "Something Went Wrong Please try again.");
    }
  };

  const rednerForm = () => {
    return (
      <ModalFormEdit
        show={editForm}
        title={modalTitle}
        saveType={"SO"}
        formData={formData}
        handleSubmitForm={handleAssignSubCenter}
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
      <Titlebar title={"SubCenter AssignMent"} />
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
            defaultSelect="Select Type"
            options={RURAL_URBAN_OPTIONS}
            onChange={(e) => handleType(e)}
            value={ruralUrban}
          />
        </Col>
        <Col>
          <SelectInput
            defaultSelect="Select District"
            options={(
              Array.from(
                new Set((districtSelect || []).map((obj) => obj.DistrictName))
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
          <SelectInput
            defaultSelect="Select SubCenter/Ward"
            options={(
              Array.from(
                new Set((subCenterSelect || []).map((obj) => obj.SubCenterName))
              ) || []
            ).map((obj) => obj)}
            onChange={(e) => handleSubCentre(e)}
            value={subCenter}
          />
        </Col>
        <Col>
          <Button onClick={handleClearFilters}>Clear Filters</Button>
        </Col>
      </Row>
      <Row className="m-3">
        <Col md={4}>
              <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Col>
 </Row>

      <Row className="pt-3 m-3">
        <Col>
          {/* Replace the GridView with a React-based table */}
          {originalData.length !== 0 ? (
            <React.Fragment>
                {showAssignMent? (
                    <Table responsive bordered>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>DistrictName</th>
                        <th>TalukOrTownName/Zone</th>
                      <th>PHCName/Division</th>
                      <th>SubCenterName/Ward</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(currentItems || []).map((obj: any, index) => (
                        <tr key={index}>
                          <td>{obj?.Type}</td>
                          <td>{obj?.DistrictName}</td>
                          <td>{obj?.TalukOrTownName}</td>
                          <td>{obj?.PHCName}</td>
                          <td>{obj?.SubCenterName}</td>
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
                ): (
                    <Table responsive bordered>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Mobile</th>
                    <th>Role</th>
                    <th>Type</th>
                    <th>DistrictName</th>
                    <th>TalukOrTownName/Zone</th>
                    <th>PHCName/Division</th>
                    <th>SubCenterName/Ward</th>
                    <th>CreatedBy</th>
                    <th>CreatedMobile</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {(currentItems || []).map((obj: any, index) => (
                    <tr key={index}>
                      <td>{obj?.Name}</td>
                      <td>{obj?.Mobile}</td>
                      <td>{obj?.Role}</td>
                      <td>{obj?.Type}</td>
                      <td>{obj?.DistrictName}</td>
                      <td>{obj?.TalukOrTownName}</td>
                      <td>{obj?.PHCName}</td>
                      <td>{obj?.SubCenterName}</td>
                      <td>{obj?.CreatedBy}</td>
                      <td>{obj?.CreatedMobile}</td>
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
               currentCount={currentItems.length|| 0}
               totalCount={copyOfOriginalData.length || 0}
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
