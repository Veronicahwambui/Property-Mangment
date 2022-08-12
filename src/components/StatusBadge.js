import React from "react";

export default function StatusBadge(props) {
  switch (props.type) {
    case "Paid":
      return (
        <span className="badge badge-pill badge-soft-success px-3">
          {props.type}
        </span>
      );
    case "PENDING":
      return (
        <span className="badge badge-pill badge-soft-danger px-3">
          {props.type}
        </span>
      );
    case "Over-Payment":
      return (
        <span className="badge badge-pill badge-soft-info px-3">
          {props.type}
        </span>
      );
    case "Partially-Paid":
      return (
        <span className="badge badge-pill badge-soft-warning px-3">
          {props.type}
        </span>
      );
  }
}
