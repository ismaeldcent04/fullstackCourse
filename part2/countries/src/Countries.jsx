import React from "react";

export const Countries = ({ countries }) => {
  return (
    <div>
      {countries.length > 1 ? (
        <ul>
          {countries.map((country) => {
            return <li key={country.name.common}>{country.name.common}</li>;
          })}
        </ul>
      ) : (
        countries.map((country) => {
          return (
            <div key={country.name.common}>
              <h1>{country.name.common}</h1>
              <p>{country.capital}</p>
              <img src={`${country.flags.png}`} alt={`${country.flags.alt}`} />
            </div>
          );
        })
      )}
    </div>
  );
};
