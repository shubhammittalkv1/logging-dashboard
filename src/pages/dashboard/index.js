import { useState } from "react";
import Head from "next/head";
import FlameGraph from "../../components/FlameGraph";
import MetricsTable from "../../components/MetricsTable";
import LogsList from "../../components/LogsList";
import PerformanceInsights from "../../components/PerformanceInsights";
import BreadCrumb from "../../components/design/BreadCrumb";
import DashboardButton from "../../components/design/DashboardButton";
import Accordion from "../../components/design/Accordion";
import SelectedSpanDetails from "../../components/SelectedSpanDetails";
import filterTypes from "../../core/dictionary/filter-types";
import { mapFilteredTraceData } from "../../core/utils/map-filter-trace-data";
const Dashboard = ({ data }) => {
  // Below are the states variable which we are using in the Dashboard Component
  const [dashboardData] = useState(data);
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [selectedTrace, setSelectedTrace] = useState(data.traces[0].traceId);
  const [selectedSpan, setSelectedSpan] = useState(null);
  const [durationFilter, setDurationFilter] = useState(null);
  const [filterType, setFilterType] = useState(filterTypes[0].value);
  const [filteredTraces, setFilteredTraces] = useState(
    mapFilteredTraceData(data.traces, 0)
  );
  // End of the above code
  // Below is the code for the current Trace
  let currentTrace = dashboardData.traces.find(
    (trace) => trace.traceId === selectedTrace
  ) || { spans: [] };
  // End of the above code
  // Below is the code for the handle Trace Change
  const handleTraceChange = (traceId) => {
    setSelectedTrace(traceId);
    setSelectedSpan(null);
  };
  // End of the above code
  // Below is the code for Handling the Filter Type Change
  const handleFilterTypeChange = (event) => {
    debugger;
    setFilterType(event.target.value);
  };
  // End of the above code
  // Below code is for the reset Filter
  const resetFilter = () => {
    setIsFilterApplied(false);
    setDurationFilter(null);
    setFilterType(filterTypes[0].value);
    let tempFilteredTraces = mapFilteredTraceData(dashboardData.traces, 0);
    setFilteredTraces(tempFilteredTraces);
    setSelectedTrace(tempFilteredTraces[0].traceId);
  };
  // End of the above code
  // Below code is for the filter handle
  const handleFilter = () => {
    // Validation for the duration filter
    if (durationFilter === null) {
      alert("Please enter a duration");
      return;
    }
    // End of the above validation
    currentTrace = dashboardData.traces.find(
      (trace) => trace.traceId === selectedTrace
    ) || { spans: [] };
    let tempFilteredTraces = dashboardData.traces.filter((trace) =>
      trace.spans.some((span) =>
        filterType === "min-duration"
          ? span.duration > durationFilter
          : span.duration < durationFilter
      )
    );
    // Validation for the filtered traces
    if (
      tempFilteredTraces.length > 0 &&
      tempFilteredTraces.length !== dashboardData.traces.length
    ) {
      setIsFilterApplied(true);
      setSelectedTrace(tempFilteredTraces[0].traceId);
      setFilteredTraces(tempFilteredTraces);
      setSelectedSpan(null);
    } else {
      alert("No traces found with the given duration");
    }
    // End of the above validation
  };
  // End of the above code
  // Below code is for the reset zoom
  const resetZoom = () => {
    setSelectedSpan(null);
  };
  // End of the above code
  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Trace Visualization Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pt-4 pb-8">
        {/* Below is the code for BreadCrumb */}
        <BreadCrumb
          data={[
            { name: "Dashboard", link: "/dashboard" },
            { name: "Trace Visualization", link: "/dashboard" },
          ]}
        />
        {/* End of BreadCrumb */}
        {/* Below code is for the Filter */}
        <div className="flex justify-start mb-4 flex-col">
          <label className="block md-mb-2">Filter Traces By:</label>
          <div className="flex justify-start items-start gap-2 md-gap-4 flex-col md:flex-row">
            <div className="flex justify-start items-center gap-4">
              <select
                onChange={(event) => handleFilterTypeChange(event)}
                value={filterType}
                className="p-2 border rounded w-full md:w-auto"
              >
                {filterTypes.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={durationFilter || ""}
                onChange={(event) =>
                  setDurationFilter(Number(event.target.value))
                }
                placeholder="Enter Duration"
                className="p-1.5 border rounded w-full md:w-auto"
              />
            </div>
            <div className="flex flex-col sm:flex-row justify-start items-center gap-2 md:gap-4 w-full sm:w-auto">
              {isFilterApplied && (
                <DashboardButton
                  btnName="Reset Filter"
                  onClick={() => resetFilter()}
                  btnType="secondary"
                  className="w-full sm:w-auto"
                />
              )}
              <DashboardButton
                btnName="Apply Filter"
                onClick={() => handleFilter()}
                btnType="primary"
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </div>
        {/* End of the above code */}
        {/* Below code is for the container */}
        <div className="w-full flex flex-col md:flex-row justify-start items-start gap-4 border border-gray-300 bg-white rounded-lg p-4">
          <div className="w-full md:w-4/6 lg:w-4/6 mb-4 md:mb-0">
            {filteredTraces.length > 0 ? (
              <div className="flex flex-col md:flex-row lg:flex-row gap-4 w-full border border-gray-300 rounded-lg p-4">
                {/* Below is the code which is used to display the trace selecting area */}
                <div className="flex flex-row gap-2 md:flex-col lg:flex-col md:w-1/6 lg:w-1/6 overflow-y-auto">
                  {filteredTraces.map((item, index) => (
                    <span
                      className={`text-sm font-semibold p-2 border border-gray-300 rounded-lg ${
                        selectedTrace === item.traceId
                          ? "bg-primaryBlue text-white"
                          : "bg-white text-gray-700"
                      } cursor-pointer`}
                      key={index}
                      onClick={() => handleTraceChange(item.traceId)}
                    >
                      Trace {item.traceId}
                    </span>
                  ))}
                </div>
                {/* End of the above code */}
                <div className="flex flex-col gap-4 w-full md:w-5/6 lg:w-5/6">
                  {/* Below is the code for header section of the graph */}
                  <div className="flex flex-row justify-between">
                    <h2 className="text-lg font-semibold">
                      Flame Graph - Trace {selectedTrace}
                    </h2>
                    {/* Below code is used for display the reset zoom button */}
                    {selectedSpan && (
                      <DashboardButton
                        btnName="Reset Selection"
                        onClick={() => resetZoom()}
                        btnType="secondary"
                      />
                    )}
                    {/* End of the above code */}
                  </div>
                  {/* End of the above code */}
                  {/* Below is the code to display the data in the flame graph */}
                  <FlameGraph
                    data={currentTrace}
                    onSpanClick={setSelectedSpan}
                  />
                  {/* End of the above code */}
                  {/* Below code is used for display the selected span details */}
                  <div className="flex flex-col md:flex-row lg:flex-row gap-2 md:gap-4 lg:gap-4">
                    <div className="w-full md:w-1/2 lg:w-1/2">
                      {/* Below is the code for the logs of the selected trace */}
                      <Accordion
                        title={"Logs for Trace " + selectedTrace}
                        defaultOpen={true}
                      >
                        <LogsList
                          logs={dashboardData.logs.filter(
                            (log) => log.traceId === selectedTrace
                          )}
                        />
                      </Accordion>
                      {/* End of the above code */}
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/2">
                      {/* Below code is for the selected trace span data */}
                      {selectedSpan && (
                        <SelectedSpanDetails span={selectedSpan} />
                      )}
                      {/* End of the above code */}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Displaying box when there is no data after applying filter
              <div className="flex justify-center items-center h-80 w-full border border-gray-300 rounded-lg p-4">
                <p className="text-gray-500">No data to display</p>
              </div>
              // End of the above code
            )}
          </div>
          {/* Below is the code for the right side pannel having perforance insights and Metrics Data */}
          <div className="w-full md:w-2/6 lg:w-2/6 flex flex-col gap-4">
            <Accordion title="Performance Insights" defaultOpen={true}>
              {/* Performance compoment */}
              <PerformanceInsights data={dashboardData} />
              {/* End of the above  code */}
            </Accordion>
            <Accordion title="Metrics" defaultOpen={false}>
              {/* Metrices Component */}
              <MetricsTable metrics={dashboardData.metrics} />
              {/* End of the above code */}
            </Accordion>
          </div>
          {/* End of the above code */}
        </div>
        {/* End of the above code */}
      </main>
    </div>
  );
};
// Below is the code to fetch the data from the API at the server level
export async function getServerSideProps() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const response = await fetch(`${apiUrl}/api/get-dashboard-data`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { props: { data } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { data: { traces: [], metrics: [], logs: [] } },
    };
  }
}
// End of the above code

export default Dashboard;
