import React from "react";

export default function StatusBadge(props) {
  switch (props.type) {
    case "Paid":
    case "Done":
    case "True":
      return (
        <span className="badge badge-pill badge-soft-success px-3">
          {props.type}
        </span>
      );
    case "PENDING":
      case "False":
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
    case "In-Progress":
      return (
        <span className="badge badge-pill badge-soft-warning px-3">
          {props.type}
        </span>
      );
  }
}
