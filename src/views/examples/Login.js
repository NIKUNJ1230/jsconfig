// otp working
import React, { useState } from "react";
import { Button, Card, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false); // Track login state
  const [otp, setOtp] = useState(""); // OTP input
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      Email: email,
      Password: password,
    };

    try {
      const response = await fetch("http://localhost:3000/Admin/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Login successful!");
        sessionStorage.setItem("loggedIn", "true");

        setLoggedIn(true);
        navigate("/admin/index");
      } else {
        // alert("Wrong Credentials!");
        toast.error('Failed to create pool. Please try again later.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // const handleVerify = () => {
  //   // Implement your OTP verification logic here
  //   // For example, you can send the OTP to the server and check if it's valid.
  //   console.log("OTP verified!");
  //   navigate("/admin/index");
  // };
  // const handleVerify = async (e) => {
  //   e.preventDefault();

  //   const formData = {
  //     user_otp: otp,
  //   };

  //   try {
  //     const response = await fetch("https://backend.alainstore.in/VerifyOtp", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       console.log("OTP verified!");
  //       navigate("/admin/index");
  //     } else {
  //       alert("Wrong OTP. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //   }
  // };
  // Conditional rendering based on login state
  return (
    <>
      {loggedIn ? ( // If logged in, show OTP form
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-4 pb-lg-2 pt-lg-4">
              <div className="text-center text-muted mb-4">
                <small>Enter OTP to verify</small>
              </div>
              {/* <Form role="form" onSubmit={handleVerify}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-key-25" /> 
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Enter OTP"
                      type="number"
                      autoComplete="off"
                      value={otp}
                      required
                      onChange={(e) => setOtp(e.target.value)}
                      maxlength="3"
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center pt-5">
                  <Button className="my-4 px-9" color="primary" type="submit">
                    Verify
                  </Button>
                </div>
              </Form> */}
            </CardBody>
          </Card>
        </Col>
      ) : ( // If not logged in, show login form
        <Col lg="5" md="7">
          <Card className="bg-secondary shadow border-0">
            <CardBody className="px-lg-4 pb-lg-2 pt-lg-4">
              <div className="text-center text-muted mb-4">
                <small>Please Enter Valid Credintial for Log In</small>
              </div>
              <Form role="form" onSubmit={handleSubmit}>
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Email"
                      type="email"
                      autoComplete="new-email"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      placeholder="Password"
                      type="password"
                      autoComplete="new-password"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </FormGroup>
                <div className="text-center pt-5">
                  <Button className="my-4 px-9" color="primary" type="submit">
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6"></Col>
            <Col className="text-right" xs="6">
              <a
                className="text-light"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
          </Row>
        </Col>
      )}
      <ToastContainer />
    </>
  );
};

export default Login;






// import React, { useState } from "react";
// import { Button, Card, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col } from "reactstrap";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = {
//       Email: email,
//       Password: password,
//     };

//     try {
//       const response = await fetch("https://backend.alainstore.in/Admin/Login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         console.log("Login successful!");
//         sessionStorage.setItem("loggedIn", "true");
//         navigate("/admin/index");
//       } else {
//         alert("Wrong Credentials!");
//       }
//     } catch (error) {
//       console.error("An error occurred:", error);
//     }
//   };

//   return (
//     <>
//       <Col lg="5" md="7">
//         <Card className="bg-secondary shadow border-0">
//           <CardBody className="px-lg-4 pb-lg-2 pt-lg-4">
//             <div className="text-center text-muted mb-4">
//               <small>Please Enter Valid Credintial for Log In</small>
//             </div>
//             <Form role="form" onSubmit={handleSubmit}>
//               <FormGroup className="mb-3">
//                 <InputGroup className="input-group-alternative">
//                   <InputGroupAddon addonType="prepend">
//                     <InputGroupText>
//                       <i className="ni ni-email-83" />
//                     </InputGroupText>
//                   </InputGroupAddon>
//                   <Input
//                     placeholder="Email"
//                     type="email"
//                     autoComplete="new-email"
//                     value={email}
//                     required
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </InputGroup>
//               </FormGroup>
//               <FormGroup>
//                 <InputGroup className="input-group-alternative">
//                   <InputGroupAddon addonType="prepend">
//                     <InputGroupText>
//                       <i className="ni ni-lock-circle-open" />
//                     </InputGroupText>
//                   </InputGroupAddon>
//                   <Input
//                     placeholder="Password"
//                     type="password"
//                     autoComplete="new-password"
//                     value={password}
//                     required
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </InputGroup>
//               </FormGroup>
//               <div className="custom-control custom-control-alternative custom-checkbox">
//                 <input
//                   className="custom-control-input"
//                   id="customCheckLogin"
//                   type="checkbox"
//                 />

//                 <label
//                   className="custom-control-label"
//                   htmlFor="customCheckLogin"
//                 >
//                   <span className="text-muted">Remember me</span>
//                 </label>
//               </div>
//               <div className="text-center pt-5">
//                 <Button className="my-4 px-9" color="primary" type="submit">
//                   Sign in
//                 </Button>
//               </div>
//             </Form>
//           </CardBody>
//         </Card>
//         <Row className="mt-3">
//           <Col xs="6"></Col>
//           <Col className="text-right" xs="6">
//             <a
//               className="text-light"
//               href="#pablo"
//               onClick={(e) => e.preventDefault()}
//             >
//               <small>Forgot password?</small>
//             </a>
//           </Col>
//         </Row>
//       </Col>
//     </>
//   );
// };

// export default Login;
