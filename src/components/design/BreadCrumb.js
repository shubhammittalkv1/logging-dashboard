// This component is used for handling the breadcrumb of the application
import React from "react";
const BreadCrumb = ({ data }) => (
  <div className="flex items-center mb-2">
    {data.map((item, index) => (
      <span key={index}>
        {index !== 0 && <span className="text-md text-gray-500">&#62;</span>}
        {index !== data.length - 1 && (
          <a
            className="font-bold py-2 pl-0 pr-1 rounded text-xs"
            href={item.link}
          >
            {item.name}
          </a>
        )}
        {index === data.length - 1 && (
          <span className="text-md font-bold px-1 text-primaryBlue text-xs">
            {item.name}
          </span>
        )}
      </span>
    ))}
  </div>
);

export default BreadCrumb;
// End of the BreadCrumb component
