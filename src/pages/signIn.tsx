import React, { useState } from "react";
import { Button, Card, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { otpVerification, userLoggedIn } from "../redux/actions/userAction";
import SelectInput from "../components/common/selectInput";
import TextInput from "../components/common/textInput";
import { postRequest } from "../Authentication/axiosrequest";
import { IsAuthenticated } from "../Authentication/useAuth";
import { CustomCaptch } from "../components/cutomCaptch";
import { LOGIN_ROLES } from "../utilities/constants";
import "./dashboard.css";
import { debounceFunction } from "../utilities/resusedFunction";

export default function SignIn({ auth }: any) {
  const [validated, setValidated] = useState(false);
  const [validatedForm2, setValidatedForm2] = useState(false);
  const [OtpNo, setOtpNo] = useState("");
  const [Role, setRole] = useState("");
  const [Mobile, setMobile] = useState("");
  const [isOtpValidate, setIsOtpValidate] = useState(false);
  const [isbuttonActive, setButtonActive] = useState(false);

  const [captch, setFreshCaptch] = useState("");
  const [captchValue, setCaptchaValue] = useState("");

  const dispatch = useDispatch();

  const [{ Otp }] = IsAuthenticated();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setButtonActive(true);
    event.preventDefault();
    const form = event.currentTarget;
    if (!Mobile) return alert("Enter Mobile");
    if (!Role) return alert("Select Role");
    // if (!Otp) return alert("Enter Password");
    if (form.checkValidity() === true) {
      event.stopPropagation();
      let res = await postRequest("webLogin", { Role, Mobile });

      if (res.code === 200) {
        setIsOtpValidate(true);
        setButtonActive(false);
        dispatch(userLoggedIn(res?.data));
      } else {
        setButtonActive(false);
        alert(res?.response?.data?.message || "Please try again.");
      }
    }
    setValidated(true);
  };
  const handleSubmitOtp = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.stopPropagation();
      if (!OtpNo) return alert("Provide Otp.");

      let originalCaptcha = captch.split(" ").join("");
      if (captchValue.length !== 6)
        return alert("Please Enter Correct Captcha.");
      // captch checking here
      if (originalCaptcha !== captchValue)
        return alert("Captcha Failed. Please Try Again");
      let check = OtpNo === Otp;
      if (!check) return alert("Otp Verification Failed.");

      dispatch(otpVerification());
    }
    setValidatedForm2(true);
  };
  return (
    <div className="flex mt-8 justify-center items-center">
      <a className="float">
        <i className="my-float">1.0.9</i>
      </a>
      <Card className="text-center pb-5">
        {!isOtpValidate ? (
          <Form
            noValidate
            className="flex flex-col p-10"
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Row className="mb-4 flex flex-col">
              <span className="pb-2 text-center font-bold">Login</span>
              <SelectInput
                defaultSelect={"Select Role"}
                options={LOGIN_ROLES}
                value={Role}
                isValueAdded={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRole(e.target.value)
                }
              />
              <TextInput
                controlId="validationCustom03"
                name={"Mobile"}
                placeholder={"Mobile"}
                value={Mobile}
                maxLength={10}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMobile(e.target.value)
                }
              />
            </Row>
            <Button disabled={isbuttonActive} type="submit">Submit</Button>
          </Form>
        ) : (
          <Form
            noValidate
            className="flex flex-col p-10"
            validated={validatedForm2}
            onSubmit={handleSubmitOtp}
          >
            <Row className="mb-4 flex flex-col">
              <span className="pb-2 text-center font-bold">Login</span>
              <SelectInput
                defaultSelect={"Select Role"}
                isValueAdded={true}
                options={LOGIN_ROLES}
                value={Role}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setRole(e.target.value)
                }
              />
              <TextInput
                controlId="validationCustom03"
                name={"Mobile"}
                placeholder={"Mobile"}
                value={Mobile}
                maxLength={10}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMobile(e.target.value)
                }
              />
              <TextInput
                controlId="validationCustom03"
                name={"Otp"}
                placeholder={"Otp"}
                value={OtpNo}
                maxLength={6}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setOtpNo(e.target.value)
                }
              />
              <CustomCaptch
                setFreshCaptch={setFreshCaptch}
                setCaptchaValue={setCaptchaValue}
                captch={captch}
                captchValue={captchValue}
              />
            </Row>
            <Button disabled={isbuttonActive} type="submit">Submit</Button>
          </Form>
        )}
      </Card>
    </div>
  );
}
