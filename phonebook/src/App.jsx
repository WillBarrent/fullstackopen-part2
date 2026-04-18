import { useEffect, useState } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      const data = response.data;
      setPersons(data);
    });
  }, []);

  const personsToShow =
    filter.length === 0
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase()),
        );

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setNewPhoneNumber(e.target.value);
  };

  const handleFilterChange = (e) => [setFilter(e.target.value)];

  const addName = (e) => {
    e.preventDefault();

    const nameExists = persons.find((person) => person.name === newName);

    if (nameExists) {
      alert(`${newName} already exists`);
    } else {
      const person = {
        name: newName,
        number: newPhoneNumber,
        id: String(persons.length + 1),
      };

      setPersons(persons.concat(person));
      setNewName("");
      setNewPhoneNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add a new</h2>
      <PersonForm
        addName={addName}
        name={newName}
        onNameChange={handleNameChange}
        number={newPhoneNumber}
        onNumberChange={handlePhoneNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
};

export default App;
