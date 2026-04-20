import { useEffect, useState } from "react";
import Filter from "./Components/Filter";
import PersonForm from "./Components/PersonForm";
import Persons from "./Components/Persons";
import personServices from "./Services/persons";
import Notification from "./Components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    personServices.getAll().then((data) => {
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
      const changeNumber = confirm("Do you want to change the phone number?");

      if (changeNumber) {
        const id = nameExists.id;
        const newPerson = {
          ...nameExists,
          number: newPhoneNumber,
        };
        personServices.update(id, newPerson).then((data) => {
          setPersons(
            persons.map((person) => (person.id === id ? data : person)),
          );
          setNewName("");
          setNewPhoneNumber("");
        });
      }
    } else {
      const person = {
        name: newName,
        number: newPhoneNumber,
      };

      personServices.create(person).then((data) => {
        setPersons(persons.concat(data));
        setNewName("");
        setNewPhoneNumber("");
      });

      setMessage(`Added ${person.name}`);
      setSuccess(true);
      setTimeout(() => {
        setMessage(null);
        setSuccess(null);
      }, 5000);
    }
  };

  const deletePerson = (id) => {
    return (e) => {
      e.preventDefault();

      const deletePerson = confirm(
        "Do you want to delete the person from the list?",
      );

      if (deletePerson) {
        const newPersons = persons.filter((person) => person.id != id);
        personServices
          .remove(id)
          .then((_) => {
            setPersons(newPersons);
          })
          .catch((error) => {
            setMessage(`Person has already been deleted`);
            setSuccess(false);
            setTimeout(() => {
              setMessage(null);
              setSuccess(null);
            }, 5000);
          });
      }
    };
  };
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} success={success} />
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
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
