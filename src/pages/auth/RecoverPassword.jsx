import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom";
import AuthService from '../../services/authLogin.service';

export default function  RecoverPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    message: "",
    color: ""
  });
  const [success, setSuccess] = useState(false)

  const handleChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value)
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    AuthService.recoverPassword(email).then((res) => {
      if (res.data.status === false) {
        setError({
          ...error,
          message: res.data.message,
          color: "danger"
        });
      } else {
        setError({
          ...error,
          message: res.data.message,
          color: "success"
        });
        setSuccess(true);
      }

    }).catch(err => {
      let errorCode = err.response.data.message;
      setError({
        ...error,
        message: errorCode,
        color: "danger"
      });
    })
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
                                    <img src="assets/images/nouveta-white.png" alt="Nouveta Logo" className="img" style={{width: "170px"}}/>
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
                      <img src="assets/images/logo-light.png" alt="" height="18" className="auth-logo-light"/>
                    </a>
                  </div>
                  { !success &&
                  <div className="my-auto">

                    <div>
                      <h5 className="text-primary"> Reset Password</h5>
                      <p className="text-muted">Reset Password with The <strong>Revenue Collection & Property Management
                        System</strong></p>
                    </div>
                    {error.color !== "" &&
                    <div className={"alert alert-" + error.color} role="alert">
                      {error.message}
                    </div>
                    }

                    <div className="mt-4">
                      {/*<div className="alert alert-warning text-center mb-4" role="alert">*/}
                      {/*  Enter your Email and instructions will be sent to you!*/}
                      {/*</div>*/}
                      <form onSubmit={handleSubmit}>

                        <div className=" mb-3 ">
                          <label htmlFor="useremail " className="form-label ">Email. <strong className="text-danger ">*</strong></label>
                          <input type="email" className="form-control "  onChange={handleChange} name={"email"} id="useremail " placeholder="Enter email " required={true}/>
                        </div>

                        <div className="text-end ">
                          <button className="btn btn-primary w-md waves-effect waves-light " type="submit">Reset
                          </button>
                        </div>

                      </form>
                      <div className="mt-5 text-center ">
                        <p>Remember It ? <Link to="/login" className={"fw-medium text-primary"}>
                          Sign in Here
                        </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  }
                  {success &&
                  <div className="my-auto">

                    <div className="text-center">

                      <div className="avatar-md mx-auto">
                        <div className="avatar-title rounded-circle bg-light">
                          <i className="bx bxs-envelope h1 mb-0 text-primary"></i>
                        </div>
                      </div>
                      <div className="p-2 mt-4">
                        {/*<h4>Verify your Account</h4>*/}
                        <p>We have sent a link to <span
                          className="fw-semibold">{email}</span>, Please check it and use it to reset your password so as to
                          recover your account.</p>
                        {/*<div className="mt-4">*/}
                        {/*  <Link to="/resetpassword"*/}
                        {/*     className="btn btn-success w-md d-flex align-items-center justify-content-center">Continue <i*/}
                        {/*    className="pl-3 dripicons-arrow-thin-right d-flex justify-content-center align-items-center"></i></Link>*/}
                        {/*</div>*/}
                      </div>
                    </div>
                  </div>
                  }
                  <div className="mt-4 mt-md-5 text-center ">
                    <p className="mb-0 ">©
                      <script>
                        document.write(new Date().getFullYear())
                      </script> RevenueSure <strong>Revenue Collection & Property Management System</strong></p>
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