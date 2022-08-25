import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

export default function DatePicker(props) {
  const handleEvent = (event, picker) => {
    props.onCallback(picker.startDate, picker.endDate, event);
  };

  return (
    <DateRangePicker onApply={handleEvent}>
      {/* <input style={{display:'none'}} /> */}
      <i className="ti-calendar text-nowrap" style={{ padding: "4px" }}>
        <span style={{ marginLeft: "6px" }}>
          {props.startDate + " - " + props.endDate}
        </span>
      </i>
    </DateRangePicker>
  );
}
