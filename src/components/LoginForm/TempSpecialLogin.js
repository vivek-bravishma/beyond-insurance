import React, { useEffect, useState, useRef } from "react";
import FaceRecognition from "../../assets/images/face-recognition.png";
import Voice from "../../assets/images/voice.png";
import App from "../../assets/images/mobile-app.png";
import Select from "react-select";
import "./Login.css";
import cryptoJs from "crypto-js";
import { TempSpecialLoginService } from "./TempSpecialLoginService";
import { v4 as uuidv4 } from "uuid";
import { Socket, io } from "socket.io-client";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { AiOutlineClose } from "react-icons/ai";
import { Form, Button } from "react-bootstrap";
import secureLocalStorage from "react-secure-storage";

function TempSpecialLogin() {
  // +919890945819;
  let websocket_Service;
  let message = new Subject();
  let secret = "8dfb66a9-d84b-40e9-a6b9-bac2a8f9765c";
  let agentName = "1234";
  let externalRef = "";
  let navigate = useNavigate();
  const wrapperRef = useRef(null);

  const [mobilenumber, setMobileNumber] = useState("");
  const [splitUniqueMobileNumber, setSplitUniqueMobileNumber] = useState("");
  const [value, setValue] = useState({});
  let mongoResponse = {};
  const [mongoDbRequest, setMongoDbRequest] = useState("");
  const [executionId, setExecutionId] = useState("");
  const [qrcode, setQrCode] = useState("");
  const [modal, setModal] = useState(false);
  const [authenticationChoice, setAuthenticationChoice] = useState("");
  const handleClose = () => setModal(false);

  let uuid1 = "";
  let jwttoken = "";
  useEffect(() => {}, []);

  //select option data object
  const data = [
    {
      value: "Facial",
      text: "Facial",
      icon: <img src={FaceRecognition} height="28px" />,
    },
    {
      value: "App",
      text: "App",
      icon: <img src={Voice} height="28px" />,
    },
  ];
  //custom styles for select
  const customStyles = {
    control: (base) => ({
      ...base,
      border: "1px solid #ccc",
      boxShadow: "none",
      "&:hover": {
        border: "1px solid #ccc",
        boxShadow: "0px 0px 6px #ccc",
      },
      height: "42px",
    }),
    valueContainer: (provided, state) => ({
      ...provided,
      height: "30px",
      padding: "0 6px",
    }),
    indicatorSeparator: (state) => ({
      display: "none",
    }),
  };

  async function getMongodbResponse(mobilenumber) {
    const body = JSON.stringify({
      dataSource: "mongodb-atlas",
      database: "avayaocf-qnamaker",
      collection: "JourneyID-Chats",
      filter: {
        _id: mobilenumber,
      },
    });
    console.log(mobilenumber);
    let startStr = mobilenumber?.includes("+");
    // send request payload to mongodb url
    if (startStr) {
      let responseData = await TempSpecialLoginService.postMongoDbRequest(body);
      mongoResponse = responseData.data.documents[0];
      setMongoDbRequest(responseData.data.documents[0]);
      console.log(responseData.data.documents);
    }
  }
  console.log(mongoDbRequest);
  async function handleApp() {
    let response = await TempSpecialLoginService.getLookupCustomerData(
      mobilenumber.split("+")[1]
    );
    let deviceObj = response?.data.devices[0];

    let payload = {
      delivery: {
        method: "push-notification",
        deviceId: deviceObj?.id,
      },
      customer: {
        uniqueId: mongoDbRequest?.journeyid_customer_uniqueid,
        id: mongoDbRequest?.journeyid_customerid,
        phoneNumber: mongoDbRequest?.mobilephone,
      },
      language: "en-US",
      pipelineKey: "6871934e-a546-4d9b-910b-2b566df42376",
    };

    let response1 =
      await TempSpecialLoginService.createJourneyExceutionAppRequest(payload);

    for (let i = 1; i <= 6; i++) {
      setTimeout(async () => {
        let resp1 =
          await TempSpecialLoginService.retrieveJourneyExecutionRequest(
            response1?.data?.id
          );
        console.log(resp1);
        if (resp1?.data?.completedAt) {
          localStorage.setItem("users", JSON.stringify(resp1?.data?.user));
          secureLocalStorage.setItem("user", JSON.stringify(resp1?.data?.user));

          navigate("/Home3", { state: resp1?.data });
        }
      }, 10000 * i);
    }
    console.log(deviceObj);
  }

  async function handleFacial() {
    let payload = {
      delivery: {
        method: "url",
        // phoneNumber: mongoDbRequest.mobilephone,
      },
      customer: {
        id: mongoDbRequest?.journeyid_customerid,
        uniqueId: mongoDbRequest?.journeyid_customer_uniqueid,
        phoneNumber: mongoDbRequest?.mobilephone,
      },
      language: "en-US",
      pipelineKey: "dc2db844-c4a9-45fe-9316-44edd90b68dd",
    };

    let response = await TempSpecialLoginService.createJourneyExceutionRequest(
      payload
    );
    setModal(true);
    setQrCode(response?.data?.url);
    for (let i = 1; i <= 6; i++) {
      setTimeout(async () => {
        let resp1 =
          await TempSpecialLoginService.retrieveJourneyExecutionRequest(
            response?.data?.id
          );
        console.log(resp1);
        if (resp1?.data?.completedAt) {
          localStorage.setItem("users", JSON.stringify(resp1?.data?.user));
          secureLocalStorage.setItem("user", JSON.stringify(resp1?.data?.user));

          navigate("/Home3", { state: resp1?.data });
        }
      }, 14000 * i);
    }

    setExecutionId(response?.data?.id);
    console.log(response);
  }
  console.log(mongoResponse);
  function handleChange(event) {
    console.log(event.target.value);
    setValue(event.target.value);
    setAuthenticationChoice(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(value);
    if (value === "App") {
      // sdkAuthentication();
      handleApp();
    } else {
      // sendFacialAuthRequest();
      setTimeout(() => {
        handleFacial();
      }, 1000);
    }
  }

  const handleClickOutside = (event) => {
    event.preventDefault();
    getMongodbResponse(mobilenumber);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Identifier
          </label>
          <input
            type="text"
            ref={wrapperRef}
            className="form-control shadow-none"
            id="mobilenumber"
            placeholder="Identifier"
            value={mobilenumber}
            onBlur={handleClickOutside}
            onChange={(e) => setMobileNumber(e.target.value)}
            required
          />
        </div>
        <div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Send Request
            </label>

            {/* <Select
              placeholder=" "
              // value={selectedOption}
              options={data}
              onChange={handleChange}
              styles={customStyles}
              getOptionLabel={(e) => (
                <div style={{ display: "flex", alignItems: "center" }}>
                  {e.icon} {e.text}
                </div>
              )}
              required
            /> */}

            {/* <Form.Group className="d-flex align-items-center ">
              <Form.Check
                value="Facial"
                type="radio"
                aria-label="radio 1"
                label={`${(
                  <img src={FaceRecognition} height="28px" />
                )} Facial`}
                onChange={handleChange}
                checked={authenticationChoice === "Facial"}
              />

              <Form.Check
                value="App"
                className="pl-5"
                type="radio"
                aria-label="radio 2"
                label="App"
                onChange={handleChange}
                checked={authenticationChoice === "App"}
              ></Form.Check>
            </Form.Group> */}
            <div>
              <label className="layersMenu">
                <input
                  type="radio"
                  name="Facial"
                  value="Facial"
                  onChange={(e) => handleChange(e)}
                  checked={authenticationChoice === "Facial"}
                />
                <img
                  src={FaceRecognition}
                  className="pl-1"
                  height="28px"
                  alt=""
                />{" "}
                Facial
              </label>

              <label className="layersMenu ml-5">
                <input
                  type="radio"
                  name="App"
                  value="App"
                  onChange={handleChange}
                  checked={authenticationChoice === "App"}
                />
                <img src={Voice} className="pl-1" height="28px" alt="" /> App
              </label>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <button type="submit" className="btn-blue btn-block">
            Submit
          </button>
        </div>
      </form>

      {modal && qrcode ? (
        <div>
          <Modal show={modal} style={{ marginTop: "150px" }}>
            {/* <Modal.Header> */}
            <Modal.Title>
              <div className="d-flex justify-content-between px-3 pt-4 pb-1">
                <div>QR Code</div>
                <div
                  onClick={handleClose}
                  style={{ cursor: "pointer", float: "right" }}
                >
                  <AiOutlineClose />
                </div>
              </div>
              <hr />
            </Modal.Title>
            {/* </Modal.Header> */}
            <Modal.Body>
              <div>
                <h4 className="text-center">Please scan the below Qr Code </h4>
              </div>
              <div className="text-center">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&margin=50&data=${qrcode}`}
                  alt=""
                />
                <h5>The Exceution is processing ...</h5>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default TempSpecialLogin;
