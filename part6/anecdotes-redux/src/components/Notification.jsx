import React from "react";
import { useSelector } from "react-redux";

export const Notification = () => {
  const notification = useSelector((state) => state.notification);
  let style = {};
  notification === null
    ? (style = {
        border: "solid",
        padding: 10,
        borderWidth: 1,
        display: "none",
      })
    : (style = {
        border: "solid",
        padding: 10,
        borderWidth: 1,
      });

  return <div style={style}>{notification}</div>;
};
