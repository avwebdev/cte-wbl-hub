import React, { useState } from "react";

export const Expandable = (props) => {
  const { fields } = props;

  // State to control whether the description is expanded or not
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div
        onClick={toggleExpand}
        className="cursor-pointer p-4 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100"
      >
        <h2 className="text-xl font-semibold">{fields.title || "Title"}</h2>
      </div>

      {isExpanded && (
        <div className="mt-4 p-4 border border-t-0 border-gray-300 rounded-b-lg shadow-inner">
          <p className="text-sm">{fields.description || "Description"}</p>
        </div>
      )}
    </div>
  );
};