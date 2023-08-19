import React from "react";

export const Persons = ({ newSearch, persons, filteredPerson, onDelete }) => {
  return (
    <ul>
      {newSearch === ""
        ? persons.map((person) => (
            <li key={person.id}>
              {person.name} {person.number + " "}
              <button onClick={() => onDelete(person.id, person.name)}>
                {" "}
                delete
              </button>
            </li>
          ))
        : filteredPerson.map((person) => (
            <li key={person.id}>
              {person.name} {person.number + " "}
              <button onClick={() => onDelete(person.id, person.name)}>
                {" "}
                delete
              </button>
            </li>
          ))}
    </ul>
  );
};
