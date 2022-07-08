import React, { useState, useEffect } from 'react'
import {Link, useNavigate} from "react-router-dom";
import AuthService from '../../services/authLogin.service';

export default function  ResetPassword() {
  const [otp, setOtp] = useState([]);
  const [d1, setD1] = useState("")
  const [d2, setD2] = useState("")
  const [d3, setD3] = useState("")
  const [d4, setD4] = useState("")
  const [password, setPassword] = useState("");

  const [error, setError] = useState({
    message: "",
    color: ""
  });

  const navigate = useNavigate();
  const handleChange1 = (event) => {
    event.preventDefault();
    setD1(event.target.value);
  }
  const handleChange2 = (event) => {
    event.preventDefault();
    setD2(event.target.value);
  }
  const handleChange3 = (event) => {
    event.preventDefault();
    setD3(event.target.value);
  }
  const handleChange4 = (event) => {
    event.preventDefault();
    setD4(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
      setError({
        ...error,
        message: "Changed password",
        color: "success"
      });
      setTimeout(() => {
        navigate('/login', {replace: true});
      }, 1500)
    }

  return (
    <div>
      <div className="container-fluid p-0">
        <div className="row g-0">

          <div className="col-xl-8 col-md-8">
            <div className="auth-full-bg pt-lg-5 p-4">
              <div className="w-100">
                <div className="bg-overlay"/>
                <div className="d-flex h-100 flex-column">

                  <div className="p-4 mt-auto">
                    <div className="row justify-content-center">
                      <div className="col-lg-7">
                        <div className="text-center">

                          <h2 className="mb-1"><strong className="text-warning">Muigai Commercial Agencies</strong>
                          </h2>.
                          <h6 className="text-uppercase"><strong className="text-white">Revenue Collection and Property
                            Management</strong></h6>

                          <div dir="ltr">
                            <div className="owl-carousel owl-theme auth-review-carousel" id="auth-review-carousel">


                              <div className="item">
                                <div className="py-3">
                                  <p className="font-size-12 mb-4 d-none">Supporting revenue collection activities such
                                    as budgeting, collection, management and enforcement of toll collection.</p>

                                  <div className="d-flex justify-content-center align-items-center flex-column">
                                    <h4 className="font-size-12 text-white">RevenueSure A product of</h4>
                                    <img src="assets/images/nouveta-white.png" alt="Nouveta Logo" className="img "
                                         style={{width: "170px"}}/>
                                  </div>
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-4">
            <div className="auth-full-page-content p-md-5 p-4">
              <div className="w-100">

                <div className="d-flex flex-column h-100">
                  <div className="mb-4 mb-md-5">
                    <a href="index.html" className="d-block auth-logo">
                      <img src="assets/images/logo-dark.png" alt="" height="18" className="auth-logo-dark"/>
                        <img src="assets/images/logo-light.png" alt="" height="18" className="auth-logo-light" />
                    </a>
                  </div>
                  <div className="my-auto">
                    <div className="text-center">

                      <div className="avatar-md mx-auto">
                        <div className="avatar-title rounded-circle bg-light">
                          <i className="bx bxs-envelope h1 mb-0 text-primary"></i>
                        </div>
                      </div>
                      {error.color !== "" &&
                      <div className={"alert alert-" + error.color} role="alert">
                        {error.message}
                      </div>
                      }
                      <div className="p-2 mt-4">

                        <h4>Verify your email</h4>
                        <p className="mb-5">Please enter the 4 digit code sent to <span
                          className="fw-semibold">{}</span></p>

                        <form onSubmit={handleSubmit}>
                          <div className="row">
                            <div className="col-3">
                              <div className="mb-3">
                                <label htmlFor="digit1-input" className="visually-hidden">Dight 1</label>
                                <input type="text" onChange={handleChange1} className="form-control form-control-lg text-center two-step"
                                       maxLength="1" data-value="1" id="digit1-input" value={d1} required/>
                              </div>
                            </div>

                            <div className="col-3">
                              <div className="mb-3">
                                <label htmlFor="digit2-input" className="visually-hidden">Dight 2</label>
                                <input type="text" onChange={handleChange2} className="form-control form-control-lg text-center two-step"
                                       maxLength="1" data-value="2" id="digit2-input" value={d2} required/>
                              </div>
                            </div>

                            <div className="col-3">
                              <div className="mb-3">
                                <label htmlFor="digit3-input" className="visually-hidden">Dight 3</label>
                                <input type="text"  onChange={handleChange3} value={d3}  className="form-control form-control-lg text-center two-step"
                                       maxLength="1" data-value="3" id="digit3-input" required/>
                              </div>
                            </div>

                            <div className="col-3">
                              <div className="mb-3">
                                <label htmlFor="digit4-input" className="visually-hidden">Digit 4</label>
                                <input type="text"  onChange={handleChange4}  className="form-control form-control-lg text-center two-step"
                                       maxLength="1" data-value="4" id="digit4-input" value={d4} required/>
                              </div>
                            </div>
                            <div className=" mb-3 ">
                              <label htmlFor="password"  className="form-label float-start">New Password</label>
                              <input type="text" className="form-control "  value={password} onChange={handlePassword} name={"password"} id="useremail " placeholder="Enter new password " required/>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Link to="" onClick={handleSubmit} className="btn btn-success w-md" type="submit">Confirm</Link>
                          </div>
                        </form>
                      </div>

                    </div>
                  </div>

                  <div className="mt-4 mt-md-5 text-center">
                    <p className="mb-0">©
                      <script>
                        document.write(new Date().getFullYear())
                      </script> RevenueSure <strong>Revenue Collection & Property Management System</strong>
                    </p>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}