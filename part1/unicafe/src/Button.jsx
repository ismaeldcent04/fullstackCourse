import React from "react";

export const Button = ({ content, onClick }) => {
  return <button onClick={onClick}>{content}</button>;
};
