// Below code is for the FlameGraph component
import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
// Below is code for the Flame Graph where i am using recharts to display the same
const FlameGraph = ({ data, onSpanClick }) => {
  const [hoveredBar, setHoveredBar] = useState(null);
  const flattenedData = useMemo(() => {
    if (!data?.spans?.length) {
      return [];
    }
    return data.spans.map((span, index) => ({
      ...span,
      index,
      startTimeRelative: span.startTime - data.spans[0].startTime,
    }));
  }, [data]);
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload?.[0]) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-2 border border-gray-300 rounded shadow">
          <p className="font-bold text-md">{data.operation}</p>
          <p className="text-sm">Duration: {data.duration}ms</p>
          <p className="text-sm">
            Start Time:{" "}
            {moment(data.startTime).format("DD MMM YYYY, h:mm:ss.SSS a")}
          </p>
          <p className="text-sm">Status: {data.status}</p>
        </div>
      );
    }
    return null;
  };
  if (flattenedData.length === 0) {
    return (
      <div className="text-center py-4">
        No span data available for this trace.
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={flattenedData}
        layout="vertical"
        barCategoryGap={1}
        barGap={0}
        margin={{ top: 2, right: 3, left: 10, bottom: 2 }}
      >
        <XAxis
          type="number"
          domain={[0, "dataMax"]}
          tickFormatter={(value) => `${value} ms`}
        />
        <YAxis
          type="category"
          dataKey="operation"
          width={70}
          tick={{ fontSize: 12 }}
          tickFormatter={(value) =>
            value.length > 15 ? `${value.substring(0, 15)}...` : value
          }
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="duration" fill="#8884d8">
          {flattenedData.map((entry, index) => (
            <Cell
              key={`cell-${entry.spanId}`}
              fill={
                entry.status === "error"
                  ? "#ff9999"
                  : hoveredBar === index
                  ? "#c9e8d5"
                  : "#7fcae6"
              }
              onMouseEnter={() => setHoveredBar(index)}
              onMouseLeave={() => setHoveredBar(null)}
              onClick={() => onSpanClick(entry)}
              className="cursor-pointer"
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
export default FlameGraph;
// End of the above code
