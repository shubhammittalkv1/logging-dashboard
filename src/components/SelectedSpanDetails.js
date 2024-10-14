// Below code is for the SelectedSpanDetails component
import moment from "moment";
import React from "react";
const SelectedSpanDetails = ({ span }) => (
  <div className="bg-green-100 border border-green-400 shadow rounded-lg p-4">
    <h2 className="text-md font-semibold mb-2">
      Selected Operation: {span.operation}
    </h2>
    <p className="text-sm mb-1">
      <strong>Operation:</strong> {span.operation}
    </p>
    <p className="text-sm mb-1">
      <strong>Duration:</strong> {span.duration}ms
    </p>
    <p className="text-sm mb-1">
      <strong>Start Time:</strong> {moment(span.startTime).format("DD MMM YYYY, h:mm:ss.SSS a")}
    </p>
    <p className="text-md font-semibold mb-1 mt-3">Tags Details:</p>
    {span.tags &&
      Object.keys(span.tags).map((key) => (
        <p key={key} className="text-sm mb-1">
          <strong>{key}:</strong> {span.tags[key]}
        </p>
      ))}
  </div>
);
export default SelectedSpanDetails;
// End of the above code
