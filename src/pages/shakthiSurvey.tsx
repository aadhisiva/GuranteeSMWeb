import React, { useState } from "react";
import { Button, Form, Modal, Row } from "react-bootstrap";
import {
  postRequest,
  postRequestWithHeaders,
} from "../Authentication/axiosrequest";
import { Col } from "react-bootstrap";
import TextInputWithLabel from "../components/common/textInputWithLabel";
import i18n from "../components/common/Language";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function ShakthiSurvey() {
  const [validated, setValidated] = useState(false);
  const [validatedForm2, setValidatedForm2] = useState(false);

  const [OtpNo, setOtpNo] = useState("");
  const [Mobile, setMobile] = useState("");
  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");

  const [isOtpValidate, setIsOtpValidate] = useState(false);
  const [isbuttonActive, setButtonActive] = useState(false);
  const [isQuestionsActive, setQuestionsActive] = useState(false);
  const [isSubmitApplication, setSubmitApplication] = useState(false);

  const [isLanguage, setLanguage] = useState(true);

  const { t } = useTranslation();

  const [answer, setAnswers] = useState({
    SS1: "",
    SS2: "",
    SS3: "",
    SS4: "",
    SS5: "",
    SS6: "",
    SS7: "",
    SS8: "",
  });

  const sendOtpOrResend = async (Mobile: string) => {
    let res = await postRequest("sendOtpForWebQr", { Mobile });
    if (res.code == 200) {
      localStorage.setItem("Otp", res?.data?.Otp);
      setIsOtpValidate(true);
      setButtonActive(false);
    } else {
      setButtonActive(false);
      alert(res?.response?.data?.message || "Please try again.");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setButtonActive(true);
    event.preventDefault();
    const form = event.currentTarget;
    if (!Mobile) return alert("Enter Mobile");
    if (form.checkValidity() === true) {
      event.stopPropagation();
      sendOtpOrResend(Mobile);
      setValidated(true);
    }
  };
  const handleSubmitOtp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.stopPropagation();
      if (!OtpNo) return alert("Provide Otp.");
      let getOtp = localStorage.getItem("Otp");
      let check = OtpNo === getOtp;
      if (!check) return alert("Otp Verification Failed.");
      setQuestionsActive(true);
    }
    setValidatedForm2(true);
  };

  const handleLanguage = (language: string) => {
    localStorage.setItem("type", language);
    let lang: any = localStorage.getItem("type");
    i18n.changeLanguage(lang);
    setLanguage(false);
  };

  function generateUniqueId() {
    // generate time
    const [year, month, day] = new Date().toJSON().split("T")[0].split("-");
    return (
      "M" +
      year +
      month +
      day +
      new Date().getHours() +
      new Date().getMinutes() +
      new Date().getSeconds() +
      new Date().getMilliseconds()
    );
  }

  const handleSubmitApplication = async () => {
    if (!Name) return alert("Enter Name.");
    if (!Age) return alert("Enter Age.");
    if (!answer.SS1) return alert(`${t("SS1")}`);
    if (!answer.SS2) return alert(`${t("SS2")}`);
    if (!answer.SS3) return alert(`${t("SS3")}`);
    if (!answer.SS4) return alert(`${t("SS4")}`);
    if (!answer.SS5) return alert(`${t("SS5")}`);
    if (!answer.SS6) return alert(`${t("SS6")}`);
    if (!answer.SS7) return alert(`${t("SS7")}`);
    if (!answer.SS8) return alert(`${t("SS8")}`);

    let bodyData = {
      SurveyMode: "QrSurvey",
      Name: Name,
      Gender: "F",
      UserId: generateUniqueId(),
      Mobile: Mobile,
      Age: Age,
      ShakthiScheme: {
        ...answer,
      },
    };
    let res = await postRequestWithHeaders("saveSurveyData", bodyData, {
      version: "1.0.0",
      UserId: generateUniqueId(),
    });
    if (res.code == 200) {
      setSubmitApplication(true);
    } else {
      return alert(res?.response?.data?.message || "Please try again.")
    }
  };

  const navigate = useNavigate()
  const handleChangeAnswers = (name: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRedirect = () => {
   navigate('/')
  };

  const renderThankForm = () => {
    return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal size="sm" centered show={isSubmitApplication}>
        <Modal.Title className="text-center">Confirmation</Modal.Title>
        <Modal.Body className="flex justify-center flex-col">
          <span className="text-center">Thank you for Submission.</span>
          <Button onClick={handleRedirect} className="m-2" color="primary">Ok</Button>
        </Modal.Body>
      </Modal>
    </div>
    )
  };

  const renderForm = () => {
    return (
      <div>
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal show={isLanguage}>
            <Modal.Title className="text-center">Select Language</Modal.Title>
            <Modal.Body className="flex justify-center">
              <Button
                className="m-2"
                variant="info"
                onClick={() => handleLanguage("ka")}
              >
                ಕನ್ನಡ
              </Button>
              <Button
                className="m-2"
                variant="primary"
                onClick={() => handleLanguage("en")}
              >
                English
              </Button>
            </Modal.Body>
          </Modal>
        </div>

        <div className="pb-5">
          {!isQuestionsActive &&
            (!isOtpValidate ? (
              <Form
                noValidate
                className="flex flex-col p-10"
                validated={validated}
                onSubmit={handleSubmit}
              >
                <Row className="mb-4 flex-col justify-center flex">
                  <TextInputWithLabel
                    controlId="validationCustom03"
                    name={t("MOBILE")}
                    placeholder={t("MOBILE_NUMBER")}
                    value={Mobile}
                    maxLength={10}
                    type="number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setMobile(e.target.value)
                    }
                  />
                </Row>
                <Button disabled={isbuttonActive} type="submit">
                  {t("SEND_OTP")}
                </Button>
              </Form>
            ) : (
              <Form
                noValidate
                className="flex flex-col p-10"
                validated={validatedForm2}
                onSubmit={handleSubmitOtp}
              >
                <Row className="mb-4 flex flex-col">
                  <TextInputWithLabel
                    controlId="validationCustom03"
                    name={t("MOBILE")}
                    placeholder={t("MOBILE_NUMBER")}
                    value={Mobile}
                    maxLength={10}
                    type="number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setMobile(e.target.value)
                    }
                  />
                  <TextInputWithLabel
                    controlId="validationCustom03"
                    name={t("OTP")}
                    placeholder={t("OTP")}
                    value={OtpNo}
                    maxLength={4}
                    type="number"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setOtpNo(e.target.value)
                    }
                  />
                </Row>
                <a className="text-green-800 text-end text-xl m-1">
                  {t("RESEND_OTP")}
                </a>
                <Button disabled={isbuttonActive} type="submit">
                  {t("VALIDATE_OTP")}
                </Button>
              </Form>
            ))}

          {isQuestionsActive && (
            <Row className="m-2">
              <h6 className="text-center">{t("SHAKHTI_HEADER")}</h6>
              {/* *****************1******************** */}
              <Col xs={12} md={12}>
                <TextInputWithLabel
                  controlId="validationCustom03"
                  name={"Name"}
                  placeholder={t("NAME")}
                  value={Name}
                  maxLength={30}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                />
                <TextInputWithLabel
                  className={"mb-2"}
                  controlId="validationCustom03"
                  name={"Age"}
                  placeholder={t("AGE")}
                  value={Age}
                  type="number"
                  maxLength={2}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAge(e.target.value)
                  }
                />
                {/* *****************1 ******************** */}
                <h5 className="mt-3">1. {t("SS1")}</h5>
                <div className="flex flex-row">
                  <Form.Check
                    className="mr-3"
                    type={"radio"}
                    label={t("SS1_A")}
                    checked={answer.SS1 === t("SS1_A")}
                    id={`disabled-default-radio`}
                    name="SS1"
                    onChange={() => handleChangeAnswers("SS1", t("SS1_A"))}
                  />
                  <Form.Check
                    type={"radio"}
                    label={t("SS1_B")}
                    checked={answer.SS1 === t("SS1_B")}
                    name="SS1"
                    id={`disabled-default-radio`}
                    onChange={() => handleChangeAnswers("SS1", t("SS1_B"))}
                  />
                </div>
              </Col>
              {/* *****************2******************** */}
              {(answer.SS1 === 'Yes' || answer.SS1 === 'ಹೌದು') && (
                <>
              <Col xs={12} md={12}>
                <h5>2. {t("SS2")}</h5>
                <div className="flex flex-row">
                  <Form.Check
                    className="mr-3"
                    type={"radio"}
                    label={t("SS2_A")}
                    defaultChecked={answer.SS2 === t("SS2_A")}
                    id={`disabled-default-radio`}
                    name="SS2"
                    onChange={() => handleChangeAnswers("SS2", t("SS2_A"))}
                  />
                  <Form.Check
                    type={"radio"}
                    label={t("SS2_B")}
                    defaultChecked={answer.SS2 === t("SS2_B")}
                    id={`disabled-default-radio`}
                    name="SS2"
                    onChange={() => handleChangeAnswers("SS2", t("SS2_B"))}
                  />
                </div>
              </Col>
              {/* ***************** 3 ******************** */}
              <Col xs={12} md={12}>
                <h5>3. {t("SS3")}</h5>
                <div className="flex flex-row">
                  <Form.Check
                    className="mr-3"
                    type={"radio"}
                    label={t("SS3_A")}
                    defaultChecked={answer.SS3 === t("SS3_A")}
                    name="SS3"
                    onChange={() => handleChangeAnswers("SS3", t("SS3_A"))}
                    id={`disabled-default-radio`}
                  />
                  <Form.Check
                    type={"radio"}
                    label={t("SS3_B")}
                    defaultChecked={answer.SS3 === t("SS3_B")}
                    name="SS3"
                    onChange={() => handleChangeAnswers("SS3", t("SS3_B"))}
                    id={`disabled-default-radio`}
                  />
                </div>
              </Col>
              {/* ***************** 4 ******************** */}
              <Col xs={12} md={12}>
                <h5>4. {t("SS4")}</h5>
                <div className="flex flex-row flex-wrap">
                  <Form.Check
                    className="mr-3"
                    type={"radio"}
                    label={t("SS4_A")}
                    checked={answer.SS4 === t("SS4_A")}
                    onChange={() => handleChangeAnswers("SS4", t("SS4_A"))}
                    id={`disabled-default-radio`}
                  />
                  <Form.Check
                    className="mr-3"
                    type={"radio"}
                    label={t("SS4_B")}
                    checked={answer.SS4 === t("SS4_B")}
                    name="SS4"
                    onChange={() => handleChangeAnswers("SS4", t("SS4_B"))}
                    id={`disabled-default-radio`}
                  />
                  <Form.Check
                    className="mr-3"
                    type={"radio"}
                    label={t("SS4_C")}
                    checked={answer.SS4 === t("SS4_C")}
                    name="SS4"
                    onChange={() => handleChangeAnswers("SS4", t("SS4_C"))}
                    id={`disabled-default-radio`}
                  />
                  <Form.Check
                    type={"radio"}
                    label={t("SS4_D")}
                    checked={answer.SS4 === t("SS4_D")}
                    name="SS4"
                    onChange={() => handleChangeAnswers("SS4", t("SS4_D"))}
                    id={`disabled-default-radio`}
                  />
                </div>
              </Col>
              {/* ***************** 5 ******************** */}
              <Col xs={12} md={12}>
                <h5>5. {t("SS5")}</h5>
                <div className="flex flex-row flex-wrap">
                  <Form.Check
                    className="mr-3"
                    type={"radio"}
                    label={t("SS5_A")}
                    defaultChecked={answer.SS5 === t("SS5_A")}
                    name="SS5"
                    onChange={() => handleChangeAnswers("SS5", t("SS5_A"))}
                    id={`disabled-default-radio`}
                  />
                  <Form.Check
                    className="mr-3"
                    type={"radio"}
                    label={t("SS5_B")}
                    defaultChecked={answer.SS5 === t("SS5_B")}
                    onChange={() => handleChangeAnswers("SS5", t("SS5_B"))}
                    id={`disabled-default-radio`}
                  />
                  <Form.Check
                    className="mr-3"
                    type={"radio"}
                    label={t("SS5_C")}
                    defaultChecked={answer.SS5 === t("SS5_C")}
                    name="SS5"
                    onChange={() => handleChangeAnswers("SS5", t("SS5_C"))}
                    id={`disabled-default-radio`}
                  />
                  <Form.Check
                    className="mr-3"
                    type={"radio"}
                    label={t("SS5_D")}
                    defaultChecked={answer.SS5 === t("SS5_D")}
                    name="SS5"
                    onChange={() => handleChangeAnswers("SS5", t("SS5_D"))}
                    id={`disabled-default-radio`}
                  />
                  <Form.Check
                    className="mr-3"
                    type={"radio"}
                    label={t("SS5_E")}
                    defaultChecked={answer.SS5 === t("SS5_E")}
                    name="SS5"
                    onChange={() => handleChangeAnswers("SS5", t("SS5_E"))}
                    id={`disabled-default-radio`}
                  />
                </div>
              </Col>
               {/* *****************6 ******************** */}
              <Col xs={12} md={12}>
                <h5>6. {t("SS6")}</h5>
                <div className="flex flex-row flex-wrap">
                  <Form.Check
                    className="mr-3"
                    type={"radio"}
                    label={t("SS6_A")}
                    defaultChecked={answer.SS6 === t("SS6_A")}
                    name="SS6"
                    onChange={() => handleChangeAnswers("SS6", t("SS6_A"))}
                    id={`disabled-default-radio`}
                  />
                  <Form.Check
                    className="mr-3"
                    type={"radio"}
                    label={t("SS6_B")}
                    checked={answer.SS6 === t("SS6_B")}
                    name="SS6"
                    onChange={() => handleChangeAnswers("SS6", t("SS6_B"))}
                    id={`disabled-default-radio`}
                  />
                  <Form.Check
                    className="mr-3"
                    type={"radio"}
                    label={t("SS6_C")}
                    checked={answer.SS6 === t("SS6_C")}
                    name="SS6"
                    onChange={() => handleChangeAnswers("SS6", t("SS6_C"))}
                    id={`disabled-default-radio`}
                  />
                  <Form.Check
                    type={"radio"}
                    label={t("SS6_D")}
                    checked={answer.SS6 === t("SS6_D")}
                    name="SS6"
                    onChange={() => handleChangeAnswers("SS6", t("SS6_D"))}
                    id={`disabled-default-radio`}
                  />
                  <Form.Check
                    type={"radio"}
                    label={t("SS6_E")}
                    checked={answer.SS6 === t("SS6_E")}
                    name="SS6"
                    onChange={() => handleChangeAnswers("SS6", t("SS6_E"))}
                    id={`disabled-default-radio`}
                  />
                </div>
              </Col>
              {/* ***************** 7 ******************** */}
              <Col xs={12} md={12}>
                <h5>7. {t("SS7")}</h5>
                <div className="flex flex-row flex-wrap">
                  <Form.Check
                    className="mr-3"
                    type={"radio"}
                    label={t("SS7_A")}
                    checked={answer.SS7 === t("SS7_A")}
                    name="SS7"
                    onChange={() => handleChangeAnswers("SS7", t("SS7_A"))}
                    id={`disabled-default-radio`}
                  />
                  <Form.Check
                    className="mr-3"
                    type={"radio"}
                    label={t("SS7_B")}
                    checked={answer.SS7 === t("SS7_B")}
                    name="SS7"
                    onChange={() => handleChangeAnswers("SS7", t("SS7_B"))}
                    id={`disabled-default-radio`}
                  />
                  <Form.Check
                    className="mr-3"
                    type={"radio"}
                    label={t("SS7_C")}
                    checked={answer.SS7 === t("SS7_C")}
                    name="SS7"
                    onChange={() => handleChangeAnswers("SS7", t("SS7_C"))}
                    id={`disabled-default-radio`}
                  />
                </div>
              </Col>
              {/* ***************** 8 ******************** */}
              <Col xs={12} md={12}>
                <h5>8. {t("SS8")}</h5>
                <div className="flex flex-row flex-wrap">
                  <Form.Check
                    className="mr-3"
                    type={"radio"}
                    label={t("SS8_A")}
                    checked={answer.SS8 === t("SS8_A")}
                    name="SS8"
                    onChange={() => handleChangeAnswers("SS8", t("SS8_A"))}
                    id={`disabled-default-radio`}
                  />
                  <Form.Check
                    className="mr-3"
                    type={"radio"}
                    label={t("SS8_B")}
                    checked={answer.SS8 === t("SS8_B")}
                    name="SS8"
                    onChange={() => handleChangeAnswers("SS8", t("SS8_B"))}
                    id={`disabled-default-radio`}
                  />
                  <Form.Check
                    className="mr-3"
                    type={"radio"}
                    label={t("SS8_C")}
                    checked={answer.SS8 === t("SS8_C")}
                    name="SS8"
                    onChange={() => handleChangeAnswers("SS8", t("SS8_C"))}
                    id={`disabled-default-radio`}
                  />
                  <Form.Check
                    type={"radio"}
                    label={t("SS8_D")}
                    checked={answer.SS8 === t("SS8_D")}
                    name="SS8"
                    onChange={() => handleChangeAnswers("SS8", t("SS8_D"))}
                    id={`disabled-default-radio`}
                  />
                </div>
              </Col>
              </>
              )}
              <Col className="flex justify-center mt-3">
                <Button onClick={handleSubmitApplication}>{t("SUBMIT")}</Button>
              </Col>
            </Row>
          )}
        </div>
      </div>
    );
  };
  return (
    <React.Fragment>
      {!isSubmitApplication && renderForm()}
      {isSubmitApplication && renderThankForm()}
    </React.Fragment>
  );
}
