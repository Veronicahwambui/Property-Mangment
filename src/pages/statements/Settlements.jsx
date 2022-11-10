/* global $ */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import requestsServiceService from "../../services/requestsService.service";
import moment from "moment";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { Modal } from "react-bootstrap";
import Statement from "../../components/Statement";
function Settlements() {
  const [sDate, setsdate] = useState(new Date());
  const [eDate, setedate] = useState(new Date());
  const [chargeId, setchargeId] = useState(undefined);
  const [lids, setlids] = useState([]);

  useEffect(() => {
    getCharges();
  }, []);
  const [charges, setcharges] = useState([]);
  const getCharges = () => {
    requestsServiceService
      .allApplicableCharges("LANDLORD", true)
      .then((res) => {
        setcharges(res.data.data);
      });
  };

  //settlement modals
  function generateArrayOfYears() {
    var max = new Date().getFullYear();
    var min = max - 5;
    var years = [];

    for (var i = max; i >= min; i--) {
      years.push(i);
    }
    return years;
  }
  const yearArray = generateArrayOfYears();

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [settlement_show, setsettlementshow] = useState(true);
  const showSettlement = () => setsettlementshow(true);
  const hideSettlement = () => setsettlementshow(false);
  const [check, setCheck] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [landlords, setlandlords] = useState([]);
  useEffect(() => {
    let x = new Date(`01 ${month} ${year}`);
    setsdate(moment(x).startOf("month").format("YYYY-MM-DD"));
    setedate(moment(x).endOf("month").format("YYYY-MM-DD"));
  }, [year, month]);
  const [selectedItems, setselectedItems] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    getLandlords();
  };
  const selectItems = (e, x) => {
    if (e.target.checked) {
      setselectedItems((selectedItems) => [...selectedItems, x]);
    } else {
      removeItems(x.id);
    }
  };
  const removeItems = (x) => {
    setselectedItems([...selectedItems.filter((item) => item.id !== x)]);
  };

  // const removeItems = (x) => {
  //   setlids([...lids.filter((item) => item !== x)]);
  // };
  const getLandlords = () => {
    let page = 0,
      size = 100;
    let data = {
      dateCreatedEnd: new Date(),
      dateCreatedStart: moment(new Date()).startOf("year").format(),
      search: searchTerm?.trim(),
    };
    requestsServiceService.getLandLords(page, size, data).then((res) => {
      setlandlords(res.data.data);
    });
  };
  const [error, setError] = useState({
    message: "",
    color: "",
  });
  useEffect(() => {
    setlids(selectedItems?.map((a) => a.id));
  }, [selectedItems]);

  const submitSettlement = () => {
    let data = {
      chargeId: parseInt(chargeId),
      endDate: moment(eDate).format(),
      landlordId: lids,
      periodAlias: month + " " + year,
      startDate: moment(sDate).format(),
    };
    requestsServiceService
      .createSettlements(data)
      .then((response) => {
        if (response.data.status === true) {
          setError({
            ...error,
            message: response.data.message,
            color: "success",
          });
        } else {
          setError({
            ...error,
            message: response.data.message,
            color: "danger",
          });
        }
      })
      .catch((err) => {});
  };
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [palias, setpalias] = useState("");

  // SLEEPING PILLS CODE
  const [show, setshow] = useState(false);
  const showModal = () => setshow(true);
  const hideModal = () => setshow(false);
  const [recipient, setrecipient] = useState("");
  const [searchrecipient, setSearchRecipient] = useState("");
  const [foundRecipients, setfoundRecipients] = useState([]);
  const [recipientId, setRecipientId] = useState("");
  const [unpaidCharges, setunpaidCharges] = useState([]);
  const searchRecipient = (e) => {
    e.preventDefault();
    var size = 10;
    var page = 0;
    var dates = {
      dateCreatedEnd: new Date(),
      dateCreatedStart: moment(new Date()).startOf("year").format(),
    };
    if (recipient === "TENANT") {
      let s = {
        search: searchrecipient.trim(),
      };
      let data = Object.assign(dates, s);
      getTenants(searchTerm, page, size, data);
    } else if (recipient === "LANDLORD") {
      let s = {
        search: searchrecipient.trim(),
      };
      let data = Object.assign(dates, s);
      getLandlords2(page, size, data);
    } else if (recipient === "USER") {
      let s = {
        search: searchrecipient.trim(),
      };
      let data = Object.assign(dates, s);
    }
  };
  const getTenants = (w, x, y, z) => {
    requestsServiceService.getAllTenants(w, x, y, z).then((res) => {
      setfoundRecipients(res.data.data);
    });
  };
  const getLandlords2 = (x, y, z) => {
    requestsServiceService.getLandLords(x, y, z).then((res) => {
      setfoundRecipients(res.data.data);
    });
  };
  useEffect(() => {
    getUnpaidCharges();
    getEntityDetails();
  }, [recipientId]);

  const [receivedData, setRECEIVEDDATA] = useState([]);
  const getEntityDetails = () => {
    if (recipient === "TENANT") {
      requestsServiceService.viewTenant(recipientId).then((res) => {
        setRECEIVEDDATA(res.data.data);
      });
    }
    if (recipient === "USER") {
    }
    if (recipient === "LANDLORD") {
      requestsServiceService.getLandlord(recipientId).then((res) => {
        setRECEIVEDDATA(res.data.data);
      });
    }
  };

  const getUnpaidCharges = () => {
    if (recipientId !== "") {
      requestsServiceService
        .fetchEntityPendingTotals(recipient, recipientId)
        .then((res) => {
          console.log(res.data.data);
          setunpaidCharges(res.data.data);
        });
    }
  };

  const [datas, setdatas] = useState([]);
  function handleForm(e, index, transaction) {
    let newArr = [...datas];
    newArr[index] = {
      code: transaction.transactionItemId,
      name: transaction.applicableChargeName,
      value: parseInt(e.target.value),
    };
    setdatas(newArr);
  }
  const debitTotal = () => {
    let sum = 0;
    datas?.map((item) => {
      sum += parseInt(item.value);
    });
    return sum;
  };

  useEffect(() => {
    debitTotal();
  }, [datas]);
  const formatCurrency = (x) => {
    let formatCurrency = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "KES",
    });
    return formatCurrency.format(x);
  };

  const total = (x) => {
    if (x !== []) {
      let sum = 0;
      x?.map((item) => {
        sum += item.balance;
      });
      return sum;
    }
  };

  const createStatement = () => {
    let d = {
      allocations: [
        {
          code: "string",
          name: "string",
          value: "string",
        },
      ],
      billNo: "string",
      landLordFileNumber: "string",
      paidBy: "string",
      payReferenceNo: "string",
      paymentMode: "CASH",
      receiptAmount: "string",
      receiptNo: "string",
      tenancyFileNumber: "string",
      tenantNumber: "string",
      userName: "string",
    };
  };
  return (
   <>
   <Statement/>
   
   </>
  );
}

export default Settlements;
