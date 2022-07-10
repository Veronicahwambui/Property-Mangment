
import React from "react";

export default function StatusBadge(props) {

    switch (props.type) {
        case "Paid":
        case "True":
        case "Over Payment":
            return <span className="badge badge-pill badge-soft-success px-3">{props.type}</span>
        case "Unpaid":
        case "False":
            return <span className="badge badge-pill badge-soft-danger px-3">{props.type}</span>
        case "Partially Paid":
            return <span className="badge badge-pill badge-soft-warning px-3">{props.type}</span>
        default:
            return <span className="badge badge-pill badge-soft-warning px-3">{props.type}</span>

    }
}