import React from 'react'
import { useState } from "react";
import { Modal } from "react-bootstrap";
import StatusBadge from "./StatusBadge";
import moment from "moment";
import { useEffect } from 'react';



export default function ViewInvoice(props) {
  
    let formatCurrency = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KES",
      });
    
  const activeInvoice = props.activeInvoice

  return (
    <Modal show={props.show} onHide={props.closeInvoice} size="lg" centered>
    <Modal.Header closeButton>
      <h5 className="modal-title" id="myLargeModalLabel">
        Invoice Details
      </h5>
    </Modal.Header>
    <Modal.Body>
      <StatusBadge type={activeInvoice?.transaction?.paymentStatus} />
      <div className="col-12">
        <address>
          <strong>Billed To:</strong>
          <br />
          {activeInvoice?.transaction?.tenantName} <br />
          {activeInvoice?.transactionCustomerEmail}
          <br />
          {activeInvoice?.transaction?.premiseName + " , "}
          {activeInvoice?.transaction?.premiseUnitName}
          <br />
          <br />
          <p>
            Issue date:{" "}
            {moment(activeInvoice.dateTimeCreated).format("DD-MM-YYYY")}
          </p>
          <p>
            Due date:{" "}
            {moment(activeInvoice.invoiceDate).format("DD-MM-YYYY")}
          </p>
        </address>
        <p>Title: {activeInvoice?.transactionTitle}</p>
        <p>Description: {activeInvoice?.transactionDescription}</p>
      </div>
      <div className="col-12">
        <div className="py-2 mt-3">
          <h3 className="font-size-15 fw-bold">
            Invoice Details ({" "}
            <span className="text-primary fw-medium">
              {activeInvoice?.transactionItemId}
            </span>{" "}
            )
          </h3>
        </div>
      </div>
      <div className="col-12">
        <table className="table table-nowrap">
          <thead>
            <tr>
              <th style={{ width: "70px" }}>No.</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Cost</th>
              <th className="text-end">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>{activeInvoice?.applicableChargeName}</td>
              <td>{activeInvoice.quantity}</td>
              <td>{formatCurrency.format(activeInvoice?.unitCost)}</td>
              <td className="text-end">
                KES. {formatCurrency.format(activeInvoice?.billAmount)}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td colSpan="2" className="text-end">
                Total
              </td>
              <td className="text-end fw-bold">
                {formatCurrency.format(activeInvoice?.billAmount)}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td colSpan="2" className="text-end">
                Paid
              </td>
              <td className="text-end  fw-bold">
                {formatCurrency.format(activeInvoice?.billPaidAmount)}
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td colSpan="2" className="border-0 text-end">
                <strong>Balance</strong>
              </td>
              <td className="border-0 text-end">
                <h5 className="m-0 text-uppercase fw-bold">
                  {" "}
                  {formatCurrency.format(
                    activeInvoice?.billAmount -
                    activeInvoice?.billPaidAmount
                  )}
                </h5>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Modal.Body>
  </Modal>
  )
}
