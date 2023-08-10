import React from "react";

export const Persons = ({ newSearch, persons, filteredPerson }) => {
  return (
    <ul>
      {newSearch === ""
        ? persons.map((person) => (
            <li key={person.name}>
              {person.name} {person.phone}
            </li>
          ))
        : filteredPerson.map((person) => (
            <li key={person.id}>
              {person.name} {person.phone}
            </li>
          ))}
    </ul>
  );
};
