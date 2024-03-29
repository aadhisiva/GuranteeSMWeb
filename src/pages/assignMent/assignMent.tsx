import React, { useEffect, useState } from "react";
import { Col, Row, Table, Button } from "react-bootstrap";
import SelectInput from "../../components/common/selectInput";
import { postRequest } from "../../Authentication/axiosrequest";
import Spinner from "../../components/common/spinner";
import { RURAL_URBAN_OPTIONS } from "../../utilities/constants";
import CustomPagination from "../../components/common/customPagination";
import { IMasterData } from "../../utilities/interfacesOrtype";
import ModalFormEdit from "../../components/common/modalFormEdit";
import Titlebar from "../../components/common/titlebar";
import { IsAuthenticated } from "../../Authentication/useAuth";
import LoaderOverlay from "../../components/common/LoadingOverlay";

export default function AssignMent() {
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
  const [ruralUrbanSelect, setRuralUrbanSelect] = useState<IMasterData[]>();
  const [districtSelect, setDistrictSelect] = useState<IMasterData[]>();
  const [talukaSelect, setTalukaSelect] = useState<IMasterData[]>();
  const [phcSelect, setPhcSelect] = useState<IMasterData[]>();
  const [subCenterSelect, setSubCenterSelect] = useState<IMasterData[]>();

  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [editForm, setEditForm] = useState(false);
  const [formData, setFormData] = useState<IMasterData>();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  const totalPages = Math.ceil(copyOfiginalData.length / itemsPerPage);

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
      allData: "SD",
      role: Role,
      code: loginCode
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
  }, []);

  useEffect(() => {
    let filterData = originalData;
    // filter rural/urban
    if (ruralUrban) {
      filterData = filterData.filter((obj) => obj.Type === ruralUrban);
    }
    // filter rural/urban and district
    if (ruralUrban && district) {
      filterData = filterData.filter(
        (obj) => obj.Type === ruralUrban && obj.DistrictName === district
      );
    }
    // filter rural/urban and district and taluka
    if (ruralUrban && district && taluka) {
      filterData = filterData.filter(
        (obj) =>
          obj.Type === ruralUrban &&
          obj.DistrictName === district &&
          obj.TalukOrTownName === taluka
      );
    }
    // filter rural/urban and district and taluka and phco(health facility)
    if (ruralUrban && district && taluka && phc) {
      filterData = filterData.filter(
        (obj) =>
          obj.Type === ruralUrban &&
          obj.DistrictName === district &&
          obj.TalukOrTownName === taluka &&
          obj.PHCName === phc
      );
    }
    // filter rural/urban and district and taluka and sub centre
    if (ruralUrban && district && taluka && subCenter) {
      filterData = filterData.filter(
        (obj) =>
          obj.Type === ruralUrban &&
          obj.DistrictName === district &&
          obj.TalukOrTownName === taluka &&
          obj.SubCenterName === subCenter
      );
    }
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
    setSubCenter("");
    let reset = (phcSelect || []).filter((obj) => obj.PHCName === value);
    setSubCenterSelect(reset);
  };
  const handleSubCentre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setSubCenter(value);
  };

  const handleCLickAssign = async (obj: IMasterData) => {
    // let res = await postRequest("", {SubCenterCode,});
    setFormData(obj);
    setEditForm(true);
  };

  const handleAssignSubCenter = async (values: IMasterData) => {
    let res = await postRequest("addRefractionist", values);
    if (res.code === 200) {
      setEditForm(false);
      await getAllMaster();
    } else {
      setEditForm(false);
      setError(true);
      setErrorMessage("Something Went Wrong Please try again.");
    }
  };

  const rednerForm = () => {
    return (
      <ModalFormEdit
        show={editForm}
        title={"Assign"}
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
      <Titlebar title={"Assigned To Master"} />
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
          <SelectInput
            defaultSelect="Select SubCenter"
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
      <Row className="pt-3 m-3">
        <Col>
          {/* Replace the GridView with a React-based table */}
          {originalData.length !== 0 ? (
            <React.Fragment>
              <Table responsive bordered>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>DistrictName</th>
                    <th>TalukOrTownName</th>
                    <th>HobliOrZoneName</th>
                    <th>PHCName</th>
                    <th>SubCenterName</th>
                    {/* <th>VillageOrWardName</th> */}
                    <th>Modify</th>
                    {/* <th>Assign</th> */}
                  </tr>
                </thead>
                <tbody>
                  {(currentItems || []).map((obj: any, index) => (
                    <tr key={index}>
                      <td>{obj?.Type}</td>
                      <td>{obj?.DistrictName}</td>
                      <td>{obj?.TalukOrTownName}</td>
                      <td>{obj?.HobliOrZoneName}</td>
                      <td>{obj?.PHCName}</td>
                      <td>{obj?.SubCenterName}</td>
                      {/* <td>{obj?.VillageOrWardName}</td> */}
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleCLickAssign(obj)}
                        >
                          Assign
                        </Button>
                      </td>
                      {/* <td>
                      <Button
                        variant="success"
                        //   onClick={() => handleCLickRedemption(obj?.BookingId)}
                      >
                        Modify
                      </Button>
                    </td> */}
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
    </>
  );

  return (
    <div>
      <LoaderOverlay isLoading={isLoading} />
      {renderComponent()}
    </div>
  );
}
