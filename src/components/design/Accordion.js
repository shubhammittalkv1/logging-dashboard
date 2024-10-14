// Below code is for the Accordion component
import React, { useState } from "react";
const Accordion = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  // Below code is for the handle the accordion
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  // End of the above code
  return (
    <div className="border border-gray-200 rounded-lg mb-4 w-full">
      <button
        className="flex justify-between items-center w-full p-4 text-left bg-gray-100 border border-gray-200 rounded hover:bg-gray-200 focus:outline-none"
        onClick={toggleAccordion}
      >
        <span className="text-lg font-medium">{title}</span>
        {isOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={24}
            width={24}
            viewBox="0 0 512 512"
          >
            <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height={24}
            width={24}
            viewBox="0 0 512 512"
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        )}
      </button>
      {isOpen && <div className="p-4 bg-white">{children}</div>}
    </div>
  );
};
export default Accordion;
// End of the above code
