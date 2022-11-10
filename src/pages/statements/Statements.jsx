/* global $ */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import { Modal } from "react-bootstrap";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import DatePicker from "react-datepicker";
import DatePickRange from "../../components/Datepicker";
import Statement from "../../components/Statement";

function Statements() {
  const [statements, setstatements] = useState([]);
  const [activeInvoice, setactiveInvoice] = useState({});
  
  const [date, setDate] = useState({
    startDate: moment(new Date()).startOf("year").format("MM/DD/YYYY"),
    endDate: moment(new Date()).format("MM/DD/YYYY"),
  });
  const handleCallback = (sD, eD) => {
    setDate({
      ...date,
      startDate: moment(sD).format("MM/DD/YYYY"),
      endDate: moment(eD).format("MM/DD/YYYY"),
    });
  };
  let formatCurrency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "KES",
  });

  const [show, setShow] = useState(false);
  // const [billNo, setBillNo] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getStatements();
  }, []);
  // PAGINATION
  const sortSize = (e) => {
    setSize(e.target.value);
  };
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [pageCount, setPageCount] = useState(1);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentStatements, setCurrentStatements] = useState([]);

  useEffect(() => {
    const endOffset = parseInt(itemOffset) + parseInt(size);
    setCurrentStatements(statements.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(statements.length / size));
  }, [itemOffset, size, statements]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * size) % statements.length;
    setItemOffset(newOffset);
    setPage(event.selected);
        // LOADER ANIMATION  
        $("#spinner").removeClass("d-none");
        setTimeout(() => {
            $("#spinner").addClass("d-none");
        }, 500);
  };

  const getStatement = (e) => {
    e.preventDefault();
    getStatements();
  }
  const getStatements = () => {
    let data = { startDate: date.startDate, endDate: date.endDate };
    requestsServiceService.getStatements(data).then((res) => {
      setstatements(res.data.data);
    });
  };
  const [invoice_show, setinvoice_show] = useState(false);
  const showInvoice = () => setinvoice_show(true);
  const closeInvoice = () => setinvoice_show(false);
  const getOneInvoice = (bill) => {
    let acc = statements.find((statement) => statement.billNo === bill);
    setactiveInvoice(acc);
    showInvoice();
  };
  const [error, setError] = useState({
    message: "",
    color: "",
  });

  const [utilData, setUtilData] = useState({
    newBillNo: "",
    statementId: "",
    tenantId: "",
  });

  const setUtilizeValues = (statementId, tenantId) => {
    setUtilData({
      ...utilData,
      newBillNo: "",
      statementId: statementId,
      tenantId: tenantId,
    });
  };

  const searchBillNo = async (e) => {
    e.preventDefault();
    handleClose();

    await requestsServiceService
      .viewTransactionItem(utilData.newBillNo)
      .then((res) => {
        console.log(res.data);
        if (res.data.paymentStatus !== "PAID" && res.data.status === true) {
          utilize();
        } else {
          setError({
            ...error,
            message: "ERROR: Bill is already paid",
            color: "danger",
          });
        }
        setTimeout(() => {
          setError({
            ...error,
            message: "",
            color: "",
          });
        }, 2000);
      });
  };

  const utilize = () => {
    requestsServiceService.utilize(utilData).then((res) => {
      if (res.data.status === true) {
        setError({
          ...error,
          message: res.data.message,
          color: "success",
        });
      } else {
        setError({
          ...error,
          message: res.data.message,
          color: "danger",
        });
      }
      setTimeout(() => {
        setError({
          ...error,
          message: "",
          color: "",
        });
      }, 2000);
    });
  };

   // LOADER ANIMATION
   useEffect(()=>{
    $("#spinner").removeClass("d-none");
    setTimeout(() => {
        $("#spinner").addClass("d-none");
    }, 1000);
   },[])
  return (
  

  <Statement/>
 

  );
}

export default Statements;
