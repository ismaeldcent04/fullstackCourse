import React from "react";

export const Filter = ({ onChange, value }) => {
  return (
    <div>
      filter shown with <input onChange={onChange} value={value} />
    </div>
  );
};
