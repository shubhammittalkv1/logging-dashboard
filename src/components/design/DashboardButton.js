// Below code is for the DashboardButton component
import React from "react";
const DashboardButton = ({ btnName, onClick, btnType }) => {
  const btnClass =
    btnType === "secondary"
      ? "bg-white text-primaryBlue border border-primaryBlue"
      : "bg-primaryBlue text-white";
  return (
    <button
      className={`p-1.5 px-3 border rounded ${btnClass} font-bold w-full sm:w-auto`}
      onClick={onClick}
    >
      {btnName}
    </button>
  );
};
export default DashboardButton;
// End of the above code
