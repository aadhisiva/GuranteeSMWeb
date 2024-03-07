import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Titlebar from "../../components/common/titlebar";
import {
  ANNABHAGYA_REPORTS,
  DISTRICT_WISE_REPORTS,
  GRUHAJYOTHI_REPORTS,
  GRUHALASHMI_REPORTS,
  SHAKTI_REPORTS,
  TALUK_WISE_REPORTS,
  YUVANIDHI_REPORTS,
} from "../../utilities/routePaths";
import { IsAuthenticated } from "../../Authentication/useAuth";
import { postRequest } from "../../Authentication/axiosrequest";
import { IReportsDashBoard } from "../../utilities/interfacesOrtype";
import { numberWithCommas } from "../../utilities/resusedFunction";
import LoaderOverlay from "../../components/common/LoadingOverlay";

export default function ReportsDashboard() {
  const [originalData, setOriginalData] = useState<IReportsDashBoard[] | []>(
    []
  );
  const [copyOfOriginalData, setCopyOriginalData] = useState<
    IReportsDashBoard[] | []
  >([]);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [{ Role, loginCode }] = IsAuthenticated();

  const getAllMaster = async () => {
    setLoading(true);
    let res = await postRequest("getEachSchemeCounts", {
      Role: Role,
      Code: loginCode,
    });
    // let res = { code: 200, data: [], response: {} };
    if (res?.code === 200) {
      setOriginalData(res?.data || []);
      setCopyOriginalData(res?.data || []);
      setLoading(false);
    } else {
      setLoading(false);
      alert(res?.response?.data?.message || "Please try again.");
    }
  };

  useEffect(() => {
    getAllMaster();
  }, []);

  return (
    <div>
      <Titlebar title={"Reports Dashboard"} />
      <LoaderOverlay isLoading={isLoading} />
      <Row className="flex justify-center items-center mt-3">
        <Col xs={6} md={2} sm={5} className="m-2 flex flex-col justify-center">
          <div
            onClick={() => navigate(GRUHALASHMI_REPORTS)}
            className="h-40 border rounded-xl bg-[#d6a03c] flex flex-col justify-center items-center"
          >
            <div className="text-xl text-center">
              <span className="font-bold">Total Surveyed :</span>
              {numberWithCommas(originalData[0]?.Gl_Count || 0)}
            </div>
          </div>
          <span className="text-center text-xl">GruhaLakshmi</span>
        </Col>
        <Col xs={6} md={2} sm={5} className="m-2 flex flex-col justify-center">
          <div
            onClick={() => navigate(GRUHAJYOTHI_REPORTS)}
            className="h-40 border rounded-xl bg-[#41e9d2] flex items-center justify-center"
          >
            <div className="text-xl text-center">
              <span className="font-bold">Total Surveyed :</span>
              {numberWithCommas(originalData[0]?.Gj_Count || 0)}
            </div>
          </div>
          <span className="text-center text-xl">GruhaJyothi</span>
        </Col>
        <Col xs={6} md={2} sm={5} className="m-2 flex flex-col justify-center">
          <div
            onClick={() => navigate(ANNABHAGYA_REPORTS)}
            className="h-40 border rounded-xl bg-[#3a55c2] flex flex-col items-center justify-center"
          >
            <div className="text-xl text-center">
              <span className="font-bold">Total Surveyed :</span>
              {numberWithCommas(originalData[0]?.Ab_Count || 0)}
            </div>
          </div>
          <span className="text-center text-xl">AnnaBhagya</span>
        </Col>
        <Col xs={6} md={2} sm={5} className="m-2 flex flex-col justify-center">
          <div
            onClick={() => navigate(SHAKTI_REPORTS)}
            className="h-40 border rounded-xl bg-[#d653d4] flex flex-col items-center justify-center"
          >
            <div className="text-xl text-center">
              <span className="font-bold">Total Surveyed :</span>{"\n"}
              {numberWithCommas(originalData[0]?.Ss_Count || 0)}
            </div>
          </div>
          <span className="text-center text-xl">Shakthi</span>
        </Col>
        <Col xs={6} md={2} sm={5} className="m-2 flex flex-col justify-center">
          <div
            onClick={() => navigate(YUVANIDHI_REPORTS)}
            className="h-40 border rounded-xl bg-[#c63d4d] flex flex-col items-center justify-center"
          >
            <div className="text-xl text-center">
              <span className="font-bold">Total Surveyed :</span>
              {numberWithCommas(originalData[0]?.Yn_Count || 0)}
            </div>
          </div>
          <span className="text-center text-xl">YuvaNidhi</span>
        </Col>
      </Row>
      {/* ************ District Or Taluk Reports ***************  */}
      {Role === "Super Admin"? (
      <Row className="flex justify-center items-center border-black rounded-xl border m-3">
        <Col xs={6} md={2} sm={5} className="m-2 flex flex-col justify-center">
          <div
            onClick={() => navigate(DISTRICT_WISE_REPORTS)}
            className="h-40 border rounded-xl bg-[#9cd442] flex flex-col justify-center items-center"
          >
            <span className="text-center text-xl">District Wise Reports</span>
          </div>
        </Col>

        {/* <Col xs={6} md={2} sm={5} className="m-2 flex flex-col justify-center">
          <div
            onClick={() => navigate(TALUK_WISE_REPORTS)}
            className="h-40 border rounded-xl bg-[#ea41c3] flex flex-col justify-center items-center"
          >
            <span className="text-center text-xl">Taluk Wise Reports</span>
          </div>
        </Col> */}
      </Row>
      ): ("")}
    </div>
  );
}
