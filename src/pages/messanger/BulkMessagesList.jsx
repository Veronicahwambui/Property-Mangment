/* global $*/
import moment from "moment";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
import requestsServiceService from "../../services/requestsService.service";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

export default function BulkMessagesList() {
  useEffect(() => {
    getBulkMessages();
  },[]);

  const [messages, setmessages] = useState([]);
  const getBulkMessages = () => {
    requestsServiceService.getBulkMessages().then((res) => {
      console.log(res);
    });
  };
  return(
    <>
      <div className="page-content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                <h4 className="mb-sm-0 font-size-18 text-capitalize">
                  Bulk Messaging
                </h4>
              
                <div className="page-title-right">
                  <ol className="breadcrumb m-0">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/">Messages</a>
                    </li>
                    <li className="breadcrumb-item active">
                      Bulk Messages
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {messages.length > 0 ? <>
            
            </>:<>
            </>}
          </div>
        <footer className="footer ">
          <div className="container-fluid ">
            <div className="row ">
              <div className="col-sm-6 ">
                <script>document.write(new Date().getFullYear())</script>©
                RevenueSure
              </div>
              <div className="col-sm-6 ">
                <div className="text-sm-end d-sm-block ">
                  A product of Nouveta LTD
                </div>
              </div>
            </div>
          </div>
        </footer>
        </div>
      </div>
    </>
  )
}
