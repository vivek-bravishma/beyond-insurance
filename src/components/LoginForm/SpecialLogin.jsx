import React, { useEffect, useState } from "react";
import FaceRecognition from "../../assets/images/face-recognition.png";
import Voice from "../../assets/images/voice.png";
import App from "../../assets/images/mobile-app.png";
import Select from "react-select";
import "./Login.css";
import cryptoJs from "crypto-js";
import { LoginService } from "./LoginServices";
import { v4 as uuidv4 } from "uuid";
import { Socket, io } from "socket.io-client";
import { BehaviorSubject, Observable, Subject } from "rxjs";

function SpecialLogin() {
  let websocket_Service;
  let message = new Subject();
  let secret = "8dfb66a9-d84b-40e9-a6b9-bac2a8f9765c";
  let agentName = "1234";
  let externalRef = "+919146129322";
  const [token, setToken] = useState();
  const [uuid, setUuid] = useState("");
  const [mobilenumber, setMobileNumber] = useState("+919146129322");
  const [splitUniqueMobileNumber, setSplitUniqueMobileNumber] = useState("");
  const [mongoDbRequest, setMongoDbRequest] = useState("");
  const [bootstrapSession, setBootstrapSession] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [lookupData, setLookUpCustomerData] = useState("");
  const [deviceObject, setDeviceObj] = useState({});
  const [authenticationExecution, setAuthenticationExecution] = useState([]);
  const [socketData, setSocketData] = useState({});
  const [facialData, setFacialData] = useState([]);
  let uuid1 = "";
  let jwttoken = "";
  // useEffect(() => {
  //   signToken();
  //   getMongodbResponse(externalRef);
  // }, []);

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

  // //creating token
  // function signToken(agentName) {
  //   // let uniqueId = Math.floor(100000 + Math.random() * 900000);
  //   const expiresIn = 24; // hours

  //   let claims = {
  //     sub: agentName,
  //     ifr: "c9a0c715-fac8-4c2f-992e-8e6ecf380244",
  //     exp: +new Date() + 3_600 * expiresIn,
  //   };

  //   let token = encodeToken(claims);
  //   let signature = cryptoJs.HmacSHA256(token, secret);
  //   signature = base64url(signature);

  //   let signedToken = token + "." + signature;
  //   // console.log("signToken", signedToken);
  //   localStorage.setItem("token", signedToken);
  //   console.log("uuid", uuidv4());
  //   setUuid(uuidv4());
  //   uuid1 = uuidv4();

  //   return signedToken;
  // }
  // function encodeToken(payload) {
  //   let header = {
  //     alg: "HS256",
  //     typ: "JWT",
  //   };

  //   let stringifiedHeader = cryptoJs.enc.Utf8.parse(JSON.stringify(header));
  //   let encodedHeader = base64url(stringifiedHeader);

  //   let stringifiedData = cryptoJs.enc.Utf8.parse(JSON.stringify(payload));
  //   let encodedData = base64url(stringifiedData);

  //   return encodedHeader + "." + encodedData;
  // }
  // function base64url(source) {
  //   let encodedSource = cryptoJs.enc.Base64.stringify(source);

  //   encodedSource = encodedSource.replace(/=+$/, "");

  //   encodedSource = encodedSource.replace(/\+/g, "-");
  //   encodedSource = encodedSource.replace(/\//g, "_");

  //   return encodedSource;
  // }

  // async function getMongodbResponse(externalRef) {
  //   const body = JSON.stringify({
  //     dataSource: "mongodb-atlas",
  //     database: "avayaocf-qnamaker",
  //     collection: "JourneyID-Chats",
  //     filter: {
  //       _id: externalRef,
  //     },
  //   });

  //   let startStr = externalRef?.includes("+");
  //   // send request payload to mongodb url
  //   if (startStr) {
  //     let responseData = await LoginService.postMongoDbRequest(body);
  //     setMongoDbRequest(responseData?.data);
  //     console.log(uuid1);
  //     let sessionvalue = uuid1 + "_" + mobilenumber.split("+")[1];
  //     console.log(sessionvalue);
  //     let splitnumber = mobilenumber.split("+")[1];
  //     setSplitUniqueMobileNumber(splitnumber);
  //     setSessionId(sessionvalue);
  //     createBootstrapSession(splitnumber);
  //     return responseData;
  //   }
  // }
  // console.log(sessionId);

  // async function createBootstrapSession(splitnumber) {
  //   let jwttoken = localStorage.getItem("token");
  //   let bootstrapPayload = {
  //     event: "start-session",
  //     session: {
  //       externalRef: splitnumber,
  //     },
  //     user: {
  //       phoneNumber: mobilenumber,
  //       uniqueId: mobilenumber.split("+")[1],
  //     },
  //   };

  //   let response = await LoginService.createBootstrapSession(
  //     bootstrapPayload,
  //     jwttoken
  //   );
  //   setBootstrapSession(response?.data);
  //   getLookupDataFromAPI(mobilenumber.split("+")[1]);
  // }
  // console.log(bootstrapSession);
  // async function getLookupDataFromAPI(number) {
  //   let response = await LoginService.getLookupCustomerData(number);
  //   setLookUpCustomerData(response?.data);
  //   let deviceObj = response?.data.devices[0];
  //   setDeviceObj(deviceObj);
  // }

  // console.log(jwttoken);

  // //--push notification code
  // // async function sdkAuthentication() {
  // //   let pipelineKey = "6871934e-a546-4d9b-910b-2b566df42376";
  // //   let reqPayload = createSDKPayload(pipelineKey);
  // //   let jwtToken = localStorage.getItem("token");
  // //   setTimeout(async () => {
  // //     await LoginService.sendAuthenticationExecutionRequest(
  // //       reqPayload,
  // //       jwtToken
  // //     ).then((data) => {
  // //       setAuthenticationExecution(data.data);
  // //       let url = `wss://app.journeyid.io/api/iframe/ws/users/${data.data.user.id}/sessions/${data.data.session.id}`;
  // //       const exampleSocket = new WebSocket(url);
  // //       exampleSocket.onopen = (e) => {
  // //         exampleSocket.send(`CONNECT ${jwtToken}`);
  // //       };
  // //       exampleSocket.onmessage = (e) => {
  // //         let SocketEvent = JSON.parse(e.data);
  // //         if (SocketEvent?.event === "session-authenticated") {
  // //         }
  // //         setSocketData(SocketEvent);
  // //         message.next(SocketEvent);
  // //       };

  // //       //   next: (value) => {
  // //       //     // console.log('comp events: ', value);

  // //       //     // execution-completed

  // //       //     setTimeout(() => {
  // //       //       const exampleSocket = new WebSocket(url);
  // //       //       exampleSocket.onopen = (e) => {
  // //       //         console.log("onopen: ", e);

  // //       //         exampleSocket.send(`CONNECT ${jwtToken}`);
  // //       //       };
  // //       //       exampleSocket.onmessage = (e) => {
  // //       //         let SocketEvent = JSON.parse(e.data);
  // //       //         console.warn("ws event: ", SocketEvent);
  // //       //         message.next(SocketEvent);
  // //       //       };
  // //       //     }, 3000);

  // //       // this.webSocketEvents = value;
  // //       // this.statusOfRequest(
  // //       //   this.webSocketEvents.event,
  // //       //   this.webSocketEvents
  // //       // );
  // //       //   },
  // //       // });
  // //       // exampleSocket.onerror = (event) => {
  // //       //  exampleSocket.error(event);
  // //       // };
  // //       // exampleSocket.onclose = (e) => {
  // //       //   exampleSocket.next(e);
  // //       // };
  // //       // var socket = io(url);

  // //       // // const socket = Socket.connect(url);
  // //       // // socket.on(`CONNECT ${jwtToken}`, (arg) => {
  // //       // //   console.log(arg); // world
  // //       // // });

  // //       // socket.on("connection", (socket) => {
  // //       //   socket.send(`${jwtToken}`);
  // //       //   console.log("hi");
  // //       // });

  // //       // console.log('Execution data: ', data);
  // //       // this.authRequestedData = data;

  // //       // this.websocket_Service.connectWebSocket(
  // //       //   this.authRequestedData.user.id,
  // //       //   this.authRequestedData.session.id,
  // //       //   `CONNECT ${this.jwtToken}`
  // //       // );

  // //       // this.websocket_Service.message.subscribe({
  // //       //   next: (value) => {
  // //       //     // console.log('comp events: ', value);

  // //       //     if (
  // //       //       (value.type === "close" || value.code === 1006) &&
  // //       //       this.webSocketEvents?.event !== "session-authenticated"
  // //       //     ) {
  // //       //       setTimeout(() => {
  // //       //         this.websocket_Service.connectWebSocket(
  // //       //           this.authRequestedData.user.id,
  // //       //           this.authRequestedData.session.id,
  // //       //           `CONNECT ${this.jwtToken}`
  // //       //         );
  // //       //       }, 3000);
  // //       //     }

  // //       //     this.webSocketEvents = value;

  // //       //     this.statusOfRequest(
  // //       //       this.webSocketEvents.event,
  // //       //       this.webSocketEvents
  // //       //     );
  // //       //   },
  // //       // });
  // //     });
  // //   }, 3000);
  // // }
  // // end of push notification code
  // function createSDKPayload(RequestPipelineKey) {
  //   let reqPayload = {
  //     pipelineKey: RequestPipelineKey,
  //     user: {
  //       id: bootstrapSession?.user?.id,
  //       uniqueId: bootstrapSession?.user?.uniqueId,
  //       email: bootstrapSession?.user?.email,
  //       phoneNumber: bootstrapSession?.user?.phoneNumber,
  //       firstName: bootstrapSession?.user?.firstName,
  //       middleName: bootstrapSession?.user?.middleName,
  //       lastName: bootstrapSession?.user?.lastName,
  //       devices: [],
  //       type: "customer",
  //     },
  //     session: {
  //       // id: null,
  //       id: sessionId,
  //       // externalRef: this.bootstrapData.session.externalRef,
  //       externalRef: mobilenumber,
  //       isAuthenticated: bootstrapSession?.session?.isAuthenticated,
  //     },
  //     // delivery: {
  //     //   // method: 'sms',
  //     //   method: "push-notification",
  //     //   deviceId: deviceObject?.id,
  //     // },
  //     delivery: {
  //       method: "sms",
  //       phoneNumber: bootstrapSession?.user?.phoneNumber,
  //     },
  //     configuration: {},
  //     language: "en-US",
  //   };

  //   return reqPayload;
  // }

  // async function sdkAuthentication() {
  //   let pipelineKey = "6871934e-a546-4d9b-910b-2b566df42376";
  //   let reqPayload = createSDKPayload(pipelineKey);
  //   let jwtToken = localStorage.getItem("token");
  //   setTimeout(async () => {
  //     await LoginService.sendAuthenticationExecutionRequest(
  //       reqPayload,
  //       jwtToken
  //     ).then((data) => {
  //       setAuthenticationExecution(data.data);
  //       console.log(data.data);
  //       let url = `wss://app.journeyid.io/api/iframe/ws/users/${data.data.user.id}/sessions/${data?.data?.session?.id}}`;
  //       const exampleSocket = new WebSocket(url);
  //       exampleSocket.onopen = (e) => {
  //         exampleSocket.send(`CONNECT ${jwtToken}`);
  //       };
  //       exampleSocket.onmessage = (e) => {
  //         let SocketEvent = JSON.parse(e.data);
  //         console.log(e.data);

  //         if (SocketEvent?.event === "session-authenticated") {
  //         }
  //         setSocketData(SocketEvent);
  //         message.next(SocketEvent);
  //       };
  //     });
  //   }, 3000);
  // }

  // async function sendFacialAuthRequest() {
  //   let requestNotificationName = "Facial authentication Request";

  //   // let pipelineKey = 'd73d7733-5450-46a3-a1c7-42bf06e09ea0';
  //   let pipelineKey = "dc2db844-c4a9-45fe-9316-44edd90b68dd";

  //   let reqPayload = createSDKPayload(pipelineKey);
  //   let jwtToken = localStorage.getItem("token");
  //   setTimeout(async () => {
  //     await LoginService.sendAuthenticationExecutionRequest(
  //       reqPayload,
  //       jwtToken
  //     ).then((data) => {
  //       console.log("execution", data.data);
  //       setAuthenticationExecution(data.data);

  //       let url = `wss://app.journeyid.io/api/iframe/ws/users/${data.data.user.id}/sessions/${data?.data?.session?.id}`;
  //       console.log(url);
  //       const exampleSocket = new WebSocket(url);
  //       let temparr = [];
  //       exampleSocket.onopen = (e) => {
  //         exampleSocket.send(`CONNECT ${jwtToken}`);
  //       };
  //       exampleSocket.onmessage = (e) => {
  //         let SocketEvent = JSON.parse(e.data);
  //         if (SocketEvent?.event === "session-authenticated") {
  //         }
  //         temparr.push(SocketEvent);
  //         console.log(temparr);
  //         message.next(SocketEvent);
  //       };
  //     });
  //   }, 3000);
  // }
  // console.log(facialData);

  function handleChange(value) {
    console.log(value);
    if (value.text === "App") {
      // sdkAuthentication();
    } else {
      // sendFacialAuthRequest();
    }
  }

  function handleSubmit(data) {
    console.log(mobilenumber);
  }
  console.log(socketData);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="exampleFormControlInput1" className="form-label">
            Identifier
          </label>
          <input
            type="text"
            className="form-control shadow-none"
            id="mobilenumber"
            placeholder="Identifier"
            value={mobilenumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
        </div>
        <div>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Send Request
            </label>

            <Select
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
            />
          </div>
        </div>
        <div className="mt-4">
          <button type="submit" className="btn-blue btn-block">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default SpecialLogin;
