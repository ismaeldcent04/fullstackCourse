import React from "react";
import { Header } from "./Header";
import { Content } from "./Content";
import { Total } from "./Total";

export const Course = ({ course }) => {
  const { _, name, parts } = course;
  const total = parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    0
  );
  return (
    <div>
      <Header course={name} />
      <Content parts={parts} />
      <Total sum={total} />
    </div>
  );
};
