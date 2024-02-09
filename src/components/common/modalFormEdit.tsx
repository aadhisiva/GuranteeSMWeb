import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IModalFromEdit } from "../../utilities/interfacesOrtype";
import { Form, Row } from "react-bootstrap";
import { useState } from "react";
import SelectInput from "./selectInput";
import TextInput from "./textInput";
import TextInputWithLabel from "./textInputWithLabel";
import SelectInputWithLabel from "./selectInputWithLabel";
import { IsAuthenticated } from "../../Authentication/useAuth";

export default function ModalFormEdit({
  show,
  title,
  onHide,
  handleSubmitForm,
  handleModifyAssignedUser,
  formData,
}: IModalFromEdit) {
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({
    Name: "",
    Role: "",
    Mobile: "",
    ...formData,
  });
  const [stateData, setStateData] = useState({
    Name: "",
    Role: "",
    Mobile: "",
    ...formData,
  });

  const [{ Role, Mobile }] = IsAuthenticated();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    // if (!Mobile) return alert("Enter UserName");
    // if (!Role) return alert("Enter UserName");
    // if (!Otp) return alert("Enter Password");
    // if (UserName !== "admin") return alert("UserName Wrong.");
    // if (Password !== "edcs@123") return alert("Password Wrong.");
    if (form.checkValidity() === true) {
      event.stopPropagation();
      if(title !== "Modify"){
        let forApiBody = {
          Name: stateData.Name,
          Mobile: stateData.Mobile,
          Role: stateData.Role,
          SubCenterCode: stateData.SubCenterCode,
          Type: stateData?.Type,
          CreatedBy: Role,
          CreatedMobile: Mobile
        };
        handleSubmitForm(forApiBody);
      } else {
        let forApiBody = {
          Name: stateData.Name,
          Mobile: stateData.Mobile,
          Role: stateData.Role,
          UserId: stateData.UserId,
          CreatedBy: Role,
          CreatedMobile: Mobile
        };
        handleModifyAssignedUser(forApiBody);
      }
    };
    setValidated(true);
  };

  const handleInputChange = (e: React.ChangeEvent<any>) =>{
    const { name, value } = e.target;
    setStateData((prev:any) => ({
        ...prev,
        [name]: value
    }))
  }

  const renderRoles = () => {
    let type = stateData?.Type;
    return type === "Rural"
      ? ["Asha Worker", "Anganwadi", "PDO"]
      : ["Chief Collector/Commissioner","SHI/JHI/FGRI", "Asha", "Anganwadi", "Bill Collector"];
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="flex flex-col">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row>
            <TextInputWithLabel
              controlId={"validationCustom01"}
              placeholder={"Type"}
              value={stateData?.Type}
              disabled={true}
              onChange={handleInputChange}
            />
            <TextInputWithLabel
              controlId={"validationCustom02"}
              placeholder={"DistrictName"}
              value={stateData?.DistrictName}
              disabled={true}
              onChange={handleInputChange}
            />
            <TextInputWithLabel
              controlId={"validationCustom03"}
              placeholder={"TalukOrTownName"}
              value={stateData?.TalukOrTownName}
              disabled={true}
              onChange={handleInputChange}
            />
            <TextInputWithLabel
              controlId={"validationCustom04"}
              placeholder={"PHCName"}
              value={stateData?.PHCName}
              disabled={true}
              onChange={handleInputChange}
            />
            <TextInputWithLabel
              controlId={"validationCustom05"}
              placeholder={"SubCenterName"}
              value={stateData?.SubCenterName}
              disabled={true}
              onChange={handleInputChange}
            />
            <TextInputWithLabel
              controlId={"validationCustom06"}
              placeholder={"Mobile"}
              name={"Mobile"}
              value={stateData.Mobile}
              maxLength={10}
              onChange={handleInputChange}
            />
            <TextInputWithLabel
              controlId="validationCustom07"
              placeholder={"Name"}
              name={"Name"}
              value={stateData.Name}
              maxLength={50}
              onChange={handleInputChange}
            />
            <SelectInputWithLabel
              controlId={"validationCustom08"}
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
