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

export default function TalukModal({
  show,
  title,
  onHide,
  handleSubmitForm,
  handleModifyAssignedUser,
  formData,
  saveType
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

  const [{ Role,loginRole, Mobile }] = IsAuthenticated();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.stopPropagation();
        let forApiBody = {
          Name: stateData.Name,
          Mobile: stateData.Mobile,
          type: saveType,
          Role: stateData?.Role,
          DistrictCode: stateData?.DistrictCode,
          TalukOrTownCode: stateData?.TalukOrTownCode,
          CreatedBy: loginRole,
          CreatedMobile: Mobile
        };
        handleModifyAssignedUser(forApiBody);
    };
    setValidated(true);
  };

  const handleInputChange = (e: React.ChangeEvent<any>) =>{
    const { name, value } = e.target;
    if(name === "Name" && /^[a-zA-Z\s]*$/.test(value) === false) return;
    if(name === "Mobile" && value.length > 10) return;
    setStateData((prev:any) => ({
        ...prev,
        [name]: value
    }))
  }

  const renderRoles = () => {
    if(loginRole === "WCDD-DD"){
      return ["CDPO"];
    } else if(loginRole === "DHO"){
      return ["THO"];
    } if(loginRole === "RDPR-DSO"){
      return ["AEO"];
    } if(loginRole === "DUDC"){
      return ["PD"];
    }  else {
      return ["CDPO", "THO", "AEO","PD"];
    }
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
              controlId={"validationCustom06"}
              placeholder={"Mobile"}
              name={"Mobile"}
              type={"number"}
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
