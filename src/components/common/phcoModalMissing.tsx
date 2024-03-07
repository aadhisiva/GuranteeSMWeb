import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IMasterData, IModalFromEdit } from "../../utilities/interfacesOrtype";
import { Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import TextInputWithLabel from "./textInputWithLabel";
import SelectInputWithLabel from "./selectInputWithLabel";
import { IsAuthenticated } from "../../Authentication/useAuth";
import {
  DISTRICT_ROLES,
  PHC_ALL_ROLES,
  PHC_ROLES,
  TALUK_ROLES,
} from "../../utilities/roles";
import { postRequest } from "../../Authentication/axiosrequest";
import SelectInput from "./selectInput";
import LoaderOverlay from "./LoadingOverlay";

export default function PhcoModalMissing({
  show,
  title,
  onHide,
  handleSubmitForm,
  handleModifyAssignedUser,
  formData,
  saveType,
}: IModalFromEdit) {
  const [validated, setValidated] = useState(false);
  const [stateData, setStateData] = useState({
    Name: "",
    Role: "",
    Mobile: "",
    ...formData,
  });
  const [originalData, setOriginalData] = useState<IMasterData[]>([]);
  const [isLoading, setLoading] = useState(false);

  const [district, setDistrict] = useState("");
  const [taluka, setTaluka] = useState("");
  const [phc, setPhc] = useState("");

  const [talukaSelect, setTalukaSelect] = useState<IMasterData[]>();
  const [phcSelect, setPhcSelect] = useState<IMasterData[]>();

  const [{ Role, loginRole, loginCode, Mobile }] = IsAuthenticated();

  const getAllMaster = async () => {
    setLoading(true);
    let res = await postRequest("getDisAndTalukAssignedData", {
      allData: "PD",
      role: Role,
      code: loginCode,
      isAssignMent: "assign",
      Mobile: Mobile,
    });
    if (res?.code === 200) {
      setOriginalData(res?.data);
      setLoading(false);
    } else {
      setLoading(false);
      alert(res?.response?.data?.message || "Please try again.");
    }
  };

  useEffect(() => {
    getAllMaster();
  }, []);
  console.log("stateData",stateData)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let findCode = (originalData || []).find(obj => obj.DistrictName === district && obj.TalukOrTownName === taluka && obj.PHCName === phc);
    if (!findCode?.PHCCode) {
      alert(
        "Your role is not assigned correctly. Please contact technical team."
      );
    };

    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.stopPropagation();
      let forApiBody = {
        Name: stateData.Name,
        Mobile: stateData.Mobile,
        type: saveType,
        Role: stateData?.Role || Role,
        id: stateData?.id,
        PHCCode: findCode?.PHCCode,
        CreatedBy: loginRole,
        CreatedMobile: Mobile,
      };
      handleModifyAssignedUser(forApiBody);
    }
    setValidated(true);
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    if (name === "Name" && /^[a-zA-Z\s]*$/.test(value) === false) return;
    if (name === "Mobile" && value.length > 10) return;
    setStateData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderRoles = () => {
    if (loginRole === DISTRICT_ROLES.WCD || loginRole === TALUK_ROLES.CDPO) {
      return [PHC_ROLES.SuperVisor];
    } else if (
      loginRole === DISTRICT_ROLES.DHO ||
      loginRole === TALUK_ROLES.THO
    ) {
      return [PHC_ROLES.PHCO];
    } else if (
      loginRole === DISTRICT_ROLES.RDPR ||
      loginRole === TALUK_ROLES.EO
    ) {
      return [PHC_ROLES.PDO];
    } else if (
      loginRole === DISTRICT_ROLES.DUDC ||
      loginRole === TALUK_ROLES.CMC_TMC_TPC
    ) {
      return [PHC_ROLES.CAO_CO];
    } else if (
      loginRole === DISTRICT_ROLES.BBMP ||
      loginRole === TALUK_ROLES.ZON_IC
    ) {
      return [PHC_ROLES.DIVISON_IN];
    } else {
      return PHC_ALL_ROLES;
    }
  };

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
    let reset = (talukaSelect || []).filter(
      (obj) => obj.TalukOrTownName === value
    );
    setPhcSelect(reset);
  };

  const handlePhc = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setPhc(value);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {isLoading && <LoaderOverlay isLoading={isLoading} />}
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex flex-col">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
          <div className="mt-2">
              <SelectInputWithLabel
              name="District"

                defaultSelect="Select District"
                options={(
                  Array.from(
                    new Set((originalData || []).map((obj) => obj.DistrictName))
                  ) || []
                ).map((obj) => obj)}
                onChange={(e) => handleDistrict(e)}
                value={district}
              />
              </div>
              <div className="mt-2">
              <SelectInputWithLabel
              name="Taluk"
                defaultSelect="Select Taluka/Zone"
                options={(
                  Array.from(
                    new Set(
                      (talukaSelect || []).map((obj) => obj.TalukOrTownName)
                    )
                  ) || []
                ).map((obj) => obj)}
                onChange={(e) => handleTaluka(e)}
                value={taluka}
              />
              </div>
              <div className="mt-2">
              <SelectInputWithLabel
              name="Phc"
                defaultSelect="Select Phc/Division"
                options={(
                  Array.from(
                    new Set((phcSelect || []).map((obj) => obj.PHCName))
                  ) || []
                ).map((obj) => obj)}
                onChange={(e) => handlePhc(e)}
                value={phc}
              />
              </div>
            <TextInputWithLabel
              controlId={"validationCustom06"}
              placeholder={"Mobile"}
              name={"Mobile"}
              type={"number"}
              value={stateData.Mobile || ""}
              maxLength={10}
              disabled={true}
              onChange={handleInputChange}
            />
            <TextInputWithLabel
              controlId="validationCustom07"
              placeholder={"Name"}
              name={"Name"}
              value={stateData.Name}
              maxLength={50 || ""}
              onChange={handleInputChange}
            />
            <SelectInputWithLabel
              controlId={"validationCustom08"}
              required={true}
              defaultSelect="Select Roles"
              options={renderRoles()}
              name={"Role"}
              value={stateData.Role}
              onChange={handleInputChange}
            />
          </Row>
          <Modal.Footer>
            <Button type="submit">Submit</Button>
            <Button onClick={onHide}>Close</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
