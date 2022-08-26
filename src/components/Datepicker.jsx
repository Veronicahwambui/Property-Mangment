import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";

export default function DatePicker(props) {
  const handleEvent = (event, picker) => {
    props.onCallback(picker.startDate, picker.endDate, event);
  };

  return (
    <DateRangePicker onApply={handleEvent}>
      {/* <input style={{display:'none'}} /> */}
      <span style={{ marginLeft: "6px" }}>
        <i
          className="mdi mdi-calendar text-nowrap"
          style={{ padding: "4px" }}
        ></i>
        {props.startDate + " - " + props.endDate}
      </span>
    </DateRangePicker>
  );
}
