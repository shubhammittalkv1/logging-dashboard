// Below code is for the PerformanceInsights component
import React from "react";
const PerformanceInsights = ({ data }) => {
  // Below code is used to get the slowest requests, Placed in useMemo to optimize the performance
  const slowestRequests = React.useMemo(() => {
    return [...data.traces]
      .sort((a, b) => {
        const aDuration = a.spans.reduce((sum, span) => sum + span.duration, 0);
        const bDuration = b.spans.reduce((sum, span) => sum + span.duration, 0);
        return bDuration - aDuration;
      })
      .slice(0, 5);
  }, [data.traces]);
  // End of the above code
  // Below code is used to calculate the average error rate, Placed in useMemo to optimize the performance
  const avgErrorRate = React.useMemo(() => {
    return (
      data.metrics.reduce((sum, metric) => sum + metric.errorRate, 0) /
      data.metrics.length
    );
  }, [data.metrics]);
  // End of the above code
  return (
    <div className="">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Top 5 Slowest Traces:</h3>
        <table className="w-full border-collapse rounded-lg">
          <thead className="rounded-lg">
            <tr className="bg-gray-100 rounded-lg">
              <th className="border p-2 text-left text-md">Trace Name</th>
              <th className="border p-2 text-left text-md">Trace ID</th>
              <th className="border p-2 text-left text-md">Total Duration (ms)</th>
            </tr>
          </thead>
          <tbody>
            {slowestRequests.map((trace) => {
              const totalDuration = trace.spans.reduce(
                (sum, span) => sum + span.duration,
                0
              );
              return (
                <tr key={trace.traceId}>
                  <td className="border p-2">Trace {trace.traceId}</td>
                  <td className="border p-2">{trace.traceId}</td>
                  <td className="border p-2">{totalDuration.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-1 justify-center items-center bg-red-200 rounded-lg p-1 border border-red-400">
        <h3 className="text-md">Average Error Rate:</h3>
        <p className="text-lg font-semibold text-red-800">
          {(avgErrorRate * 100).toFixed(2)}%
        </p>
      </div>
    </div>
  );
};
export default PerformanceInsights;
// End of the above code