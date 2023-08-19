import { useEffect, useState } from "react";
import { Filter } from "./Filter";
import { PersonForm } from "./PersonForm";
import { Persons } from "./Persons";
import phones from "./services/phones";
import { Notification } from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [filteredPerson, setFilteredPerson] = useState([]);
  const [messageType, setMessageType] = useState("");
  const [message, setMessage] = useState(null);

  useEffect(() => {
    console.log("effect");
    phones.getAll().then((response) => {
      console.log("Promise fulfilled");
      setPersons(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newPhone,
    };

    const repeatedName = persons.filter((person) => person.name === newName);
    const [personRepeated] = repeatedName;

    if (repeatedName.length > 0) {
      window.confirm(
        `${newName} is already added to phonebook, do you want to replace the old number with a new one`
      )
        ? phones
            .update(personRepeated.id, { ...newPerson, newPhone })
            .then((response) => {
              setPersons(
                persons.map((person) =>
                  person.id !== personRepeated.id ? person : response.data
                )
              );
              setMessageType("success");
              setMessage(` ${personRepeated.name}'s number updated`);
              setTimeout(() => {
                setMessage(null);
              }, 5000);
            })
        : "";
    } else {
      phones
        .create(newPerson)
        .then((response) => setPersons(persons.concat(response.data)));
      setMessageType("success");
      setMessage(`Added ${newPerson.name}`);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
      setNewName("");
      setNewPhone("");
    }
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

  const handleDelete = (id, name) => {
    window.confirm(`Are you sure you want to delete ${name}?`)
      ? phones
          .remove(id)
          .then(() => {
            setPersons(persons.filter((person) => person.id !== id));
            console.log("Person succesfully deleted");
          })
          .catch((error) => {
            setMessageType("error");
            setMessage(`Person ${name} was already removed from server`);
            setTimeout(() => {
              setMessage(null);
            }, 5000);
            setPersons(persons.filter((person) => person.id !== id));
          })
      : alert("Good choice, everyone is important");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
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
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App;
