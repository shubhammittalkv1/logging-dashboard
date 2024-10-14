// Below code is for the LogsList component
import React from "react";
const LogsList = ({ logs }) => (
  <ul className="list-disc pl-5">
    {logs.map((log, index) => (
      <li key={index}>{log.log}</li>
    ))}
  </ul>
);
export default LogsList;
// End of the above code
