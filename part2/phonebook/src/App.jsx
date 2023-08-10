import { useState } from "react";
import { Filter } from "./Filter";
import { PersonForm } from "./PersonForm";
import { Persons } from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [filteredPerson, setFilteredPerson] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      phone: newPhone,
      id: persons.length + 1,
    };

    const repeatedPhone = persons.filter((person) => person.phone === newPhone);

    if (repeatedPhone.length > 0)
      return alert(`${newPhone} is already added to phonebook`);

    setPersons(persons.concat(newPerson));

    setNewName("");
    setNewPhone("");
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setNewPhone(e.target.value);
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    setNewSearch(search);

    const searchResult = persons.filter((person) =>
      person.name.includes(search)
    );
    setFilteredPerson(searchResult);
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter onChange={handleSearch} value={newSearch} />

      <h2>Add new number</h2>

      <PersonForm
        onSubmit={handleSubmit}
        onChangeName={handleNameChange}
        onChangeNumber={handlePhoneChange}
        nameValue={newName}
        phoneValue={newPhone}
      />

      <h2>Numbers</h2>

      <Persons
        newSearch={newSearch}
        persons={persons}
        filteredPerson={filteredPerson}
      />
    </div>
  );
};

export default App;
