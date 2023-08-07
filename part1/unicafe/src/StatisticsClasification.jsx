import React from "react";

export const StatisticsClasification = ({
  feedbackType,
  feedbackQuantity,
  symbol,
}) => {
  return (
    <p>
      {feedbackType}: {feedbackQuantity}
      {symbol}
    </p>
  );
};
