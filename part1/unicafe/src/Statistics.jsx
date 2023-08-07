import React from "react";
import { StatisticsClasification } from "./StatisticsClasification";

export const Statistics = ({
  title,
  goodFeedback,
  neutralFeedback,
  badFeedback,
  totalFeedbacks,
  feedbackAverage,
  goodFeedbackPrc,
}) => {
  if (totalFeedbacks === 0) {
    return <h3>No Feedback given</h3>;
  }

  return (
    <>
      <h2>{title}</h2>
      <StatisticsClasification
        feedbackType={"good"}
        feedbackQuantity={goodFeedback}
      />
      <StatisticsClasification
        feedbackType={"neutral"}
        feedbackQuantity={neutralFeedback}
      />
      <StatisticsClasification
        feedbackType={"bad"}
        feedbackQuantity={badFeedback}
      />
      <StatisticsClasification
        feedbackType={"all"}
        feedbackQuantity={totalFeedbacks}
      />
      <StatisticsClasification
        feedbackType={"average"}
        feedbackQuantity={feedbackAverage}
      />
      <StatisticsClasification
        feedbackType={"positive"}
        feedbackQuantity={goodFeedbackPrc}
        symbol={"%"}
      />
    </>
  );
};
