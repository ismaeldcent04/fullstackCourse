import { useEffect, useState } from "react";
import axios from "axios";
import { Countries } from "./Countries";

function App() {
  const [countryInput, setCountryInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [isTooMany, setIsTooMany] = useState(true);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const searchCountries = response.data.filter((country) =>
          country.name.common.includes(countryInput)
        );
        searchCountries.length > 10 ? setIsTooMany(true) : setIsTooMany(false);
        setCountries(searchCountries);
      });
  }, [countryInput]);

  const handleOnSearch = (e) => {
    const search = e.target.value;
    setCountryInput(search);
  };

  return (
    <>
      <div>
        find countries <input value={countryInput} onChange={handleOnSearch} />
        {isTooMany ? (
          <p>Too many matches, specify another filter</p>
        ) : (
          <Countries countries={countries} />
        )}
      </div>
    </>
  );
}

export default App;
