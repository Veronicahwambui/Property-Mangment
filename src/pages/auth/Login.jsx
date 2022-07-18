import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import AuthService from '../../services/authLogin.service';
import axios from 'axios';
import jwt_decode from "jwt-decode";

function Login() {
  const [userInfo, setuserInfo] = useState({
    username: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [mes, setMes] = useState(" ");
  const [token, setToken] = useState(null);

  const handleClose = () => {
    let message = "Approved"
    setTimeout(() => {
      window.location.reload()
      setMes(message)
    }, 1000);
  };
  const handleShow = () => setShow(true);


  const navigate = useNavigate();

  const [response, setResponse] = useState({
    results: [],
  });

  const [error, setError] = useState({
    message: "",
    color: ""
  });

  const handleChange = (event) => {
    setuserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = JSON.stringify({
      username: userInfo.username,
      password: userInfo.password
    });
    AuthService.login(data).then((res) => {
      console.log(res)
      setError({
        ...error,
        message: "Approved",
        color: "success"
      });
        let token = res.data.accessToken
        let decoded = jwt_decode(token);
        console.log(decoded.user)
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(decoded.user));
        localStorage.setItem('clientId', JSON.stringify(decoded.user.client.id));
        localStorage.setItem('expiry', Math.floor(decoded.exp));
        localStorage.setItem('App-Key', decoded.user.client.appKey);
        let permissions = [];
        for (let i = 0; i < decoded.user.userPermissions.length; i++) {
          permissions.push(decoded.user.userPermissions[i]);
        }
        localStorage.setItem('permissions', permissions);
        window.location.reload();
    }).catch(err => {
      let errorCode = err.response.data.message;
      setError({
        ...error,
        message: errorCode,
        color: "danger"
      });
    })
  };

  return (
    <div>
      <div className="container-fluid p-0">
        <div className="row g-0">

          <div className="col-xl-8 col-md-8">
            <div className="auth-full-bg pt-lg-5 p-4">
              <div className="w-100">
                <div className="bg-overlay"></div>
                <div className="d-flex h-100 flex-column">

                  <div className="p-4 mt-auto">
                    <div className="row justify-content-center">
                      <div className="col-lg-7">
                        <div className="text-center">

                          <h2 className="mb-1"><strong className="text-warning">Muigai Commercial Agencies</strong></h2>.
                          <h6 className="text-uppercase"><strong className="text-white">Revenue Collection and Property Management</strong></h6>

                          <div dir="ltr">
                            <div className="owl-carousel owl-theme auth-review-carousel" id="auth-review-carousel">


                              <div className="item">
                                <div className="py-3">
                                  <p className="font-size-12 mb-4 d-none">Supporting revenue collection activities such as budgeting, collection, management and enforcement of toll collection.</p>

                                  <div className="d-flex justify-content-center align-items-center flex-column">
                                    <h4 className="font-size-12 text-white">RevenueSure A product of</h4>
                                    <img src="assets/images/nouveta-white.png" alt="Nouveta Logo" className="img" style={{width: "170px"}}/></div>
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

          <div className="col-xl-4 col-md-4 ">
            <div className="auth-full-page-content p-md-5 p-4 ">
              <div className="w-100 ">

                <div className="d-flex flex-column h-100 ">
                  <div className="mb-4 mb-md-5 ">
                    <a href="index.html " className="d-block auth-logo ">
                      <img src="assets/images/logo-dark.png " alt=" " height="18 " className="auth-logo-dark "></img>
                        <img src="assets/images/logo-light.png " alt=" " height="18 " className="auth-logo-light "></img>
                        </a>
                      </div>
                      <div className="my-auto ">

                        <div>
                          <h5 className="text-primary ">Welcome Back !</h5>
                          <p className="text-muted ">Sign in to continue Using the <strong>Revenue Collection & Property Management System</strong></p>
                        </div>
                        {error.color !== "" &&
                        <div className={"alert alert-" + error.color} role="alert">
                          {error.message}
                        </div>
                        }

                        <div className="mt-4 ">
                          <form onSubmit={handleSubmit}>

                            <div className="mb-3 ">
                              <label for="username " className="form-label ">Username. <strong className="text-danger ">*</strong></label>
                              <input type="text" className="form-control " id="username " placeholder="Enter username " onChange={handleChange} name={"username"} required={true}></input>
                            </div>

                            <div className="mb-3 ">
                              <label className="form-label ">Password. <strong className="text-danger ">*</strong></label>
                              <div className="input-group auth-pass-inputgroup ">
                                <input type="password" className="form-control " placeholder="Enter password " aria-label="Password " name={"password"} onChange={handleChange} required={true}/>
                                  <button className="btn btn-light " type={"button"} id="password-addon "><i className="mdi mdi-eye-outline "/></button>
                              </div>
                              <div className="float-end">
                                <Link to="/recoverpassword" className={"text-muted"}>
                                  Forgot Password?
                                </Link>
                                {/*<a className="text-muted ">Forgot password?</a>*/}
                              </div>
                              <br/>
                            </div>

                            {/*<div className="form-check ">*/}
                            {/*  <input className="form-check-input " type="checkbox " id="remember-check "/>*/}
                            {/*    <label className="form-check-label " for="remember-check ">*/}
                            {/*      Remember me*/}
                            {/*    </label>*/}
                            {/*</div>*/}

                            <div className="mt-3 d-grid ">
                              <button className="btn btn-primary waves-effect waves-light " type="submit">Log In</button>
                            </div>
                          </form>
                        </div>
                      </div>

                      <div className="mt-4 mt-md-5 text-center ">
                        <p className="mb-0 ">©
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

export default Login;
