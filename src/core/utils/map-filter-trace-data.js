// Below method is used to map the filtered Trace Data
export const mapFilteredTraceData = (data, value) => {
  return data.filter((trace) =>
    trace.spans.some((span) => span.duration > value)
  );
};
// End of the above code
