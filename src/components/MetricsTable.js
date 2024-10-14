// Below code is for the MetricsTable component
import React from "react";
const MetricsTable = ({ metrics }) => (
  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-gray-100">
        <th className="border p-2 text-left">Route</th>
        <th className="border p-2 text-left">Duration (ms)</th>
        <th className="border p-2 text-left">Error Rate</th>
      </tr>
    </thead>
    <tbody>
      {metrics.map((metric) => (
        <tr key={metric.route}>
          <td className="border p-2">{metric.route}</td>
          <td className="border p-2">{metric.duration}</td>
          <td className="border p-2">{(metric.errorRate * 100).toFixed(2)}%</td>
        </tr>
      ))}
    </tbody>
  </table>
);
export default MetricsTable;
// End of the above code
