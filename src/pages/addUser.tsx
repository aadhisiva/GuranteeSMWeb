import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import { postRequest } from "../Authentication/axiosrequest";

const AddUser = () => {
  const [Mobile, setMobile] = useState("");
  const [Name, setName] = useState("");
  const [Role, setRole] = useState("");

  const [originalData, setOriginalData] = useState([]);
  const [copyOriginalData, setCopyOriginalData] = useState([]);

  const getExistingUsersData = async () => {
    let getData = await postRequest("getAllUsers", "");
    if(getData?.code === 200){
      setOriginalData(getData?.data);
      setCopyOriginalData(getData?.data); 
    }else {
      return alert("Something went wrong. Please try agian")
    }
  };

  useEffect(() => {
    getExistingUsersData();
  }, []);

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobile(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };

  const handleSubmit = async () => {
    // Handle form submission logic here
    // You can update 'users' state with the submitted data
    if(!Mobile || !Name || !Role) return alert("Please fill details.");
    let addData = await postRequest("saveNewUser", {Mobile, Name, Role});
    if(addData?.code !== 200){
      alert(addData?.message)
    }
    await getExistingUsersData();
  };


  return (
    <div className="overflow-x-hidden ml-10 mr-10 mb-10">
      <h3 className="text-center">Add User</h3>
      <Row className="pt-3 flex justify-center">
        <Col md={3}>
          <Form.Control
            type="text"
            className="form-control"
            maxLength={10}
            name="Mobile"
            placeholder="Mobile Number"
            autoComplete="off"
            value={Mobile}
            onChange={handleMobileChange}
          />
        </Col>
      </Row>
      <Row className="pt-3 flex justify-center">
        <Col md={3}>
          <Form.Control
            type="text"
            className="form-control"
            maxLength={100}
            autoComplete="off"
            value={Name}
            placeholder="Name"
            name="Name"
            onChange={handleNameChange}
          />
        </Col>
      </Row>
      <Row className="pt-3 flex justify-center">
        <Col md={3}>
          <Form.Control
            type="text"
            className="form-control"
            maxLength={2}
            name="role"
            placeholder="Role"
            autoComplete="off"
            value={Role}
            onChange={handleRoleChange}
          />
          {/* Add your validation logic here */}
        </Col>
      </Row>
      <Row className="pt-3">
        <Col md={12} className="text-center">
          <Button variant="success" onClick={handleSubmit}>
            Submit
          </Button>
        </Col>
      </Row>

      <Row className="pt-5">
      <Col>
          {/* Replace the GridView with a React-based table */}
          {originalData.length !== 0 ? (
          <Table responsive bordered>
            <thead>
              <tr>
                {Object.keys(Object.assign({}, originalData[0])).map((obj, index) => (
                  <th key={index}>{obj}</th>
                ))}
              </tr>
            </thead>
            <tbody>
                {(originalData || []).map((obj: any, index) => (
              <tr key={index}>
                  <td>{obj?.Name}</td>
                  <td>{obj?.Mobile}</td>
                  <td>{obj?.Role}</td>
              </tr>
                ))}
            </tbody>
          </Table> ) :
          ("")
          }
        </Col>
      </Row>
    </div>
  );
};

export default AddUser;
